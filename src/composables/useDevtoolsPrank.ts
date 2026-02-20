import { onBeforeUnmount, onMounted } from "vue";

const DEVTOOLS_THRESHOLD = 160;
const DETECT_INTERVAL_MS = 700;
const SPAWN_INTERVAL_MS = 160;
const CHURN_INTERVAL_MS = 260;
const MAX_CARDS = 60;
const ROOT_COUNT = 3;

type CleanupFn = (() => void) | null;

export function useDevtoolsPrank(): void {
  let detectTimer: number | null = null;
  let spawnTimer: number | null = null;
  let churnTimer: number | null = null;
  let rootsToken = "";
  let rootEls: HTMLDivElement[] = [];
  let observer: MutationObserver | null = null;
  let isPrankActive = false;

  const enabledByEnv = import.meta.env.VITE_DEVTOOLS_PRANK === "true";
  const allowLocal = import.meta.env.VITE_DEVTOOLS_PRANK_ALLOW_LOCAL === "true";
  const host = window.location.hostname.toLowerCase();
  const isLocalHost =
    host === "localhost" || host === "127.0.0.1" || host === "::1";
  const isEnabled = enabledByEnv && (!isLocalHost || allowLocal);

  const stopSpawn = () => {
    if (spawnTimer !== null) {
      window.clearInterval(spawnTimer);
      spawnTimer = null;
    }
  };

  const stopChurn = () => {
    if (churnTimer !== null) {
      window.clearInterval(churnTimer);
      churnTimer = null;
    }
  };

  const disconnectObserver = () => {
    observer?.disconnect();
    observer = null;
  };

  const teardownRoots = () => {
    for (const rootEl of rootEls) {
      if (rootEl.parentNode) {
        rootEl.parentNode.removeChild(rootEl);
      }
    }
    rootEls = [];
    rootsToken = "";
  };

  const randomToken = () =>
    `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

  const randomInt = (min: number, max: number) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const totalCardCount = () =>
    rootEls.reduce((total, rootEl) => total + rootEl.children.length, 0);

  const trimCards = () => {
    while (totalCardCount() > MAX_CARDS) {
      const rootByCount = [...rootEls].sort(
        (a, b) => b.children.length - a.children.length
      )[0];
      if (!rootByCount || rootByCount.children.length === 0) break;
      rootByCount.removeChild(rootByCount.firstChild as ChildNode);
    }
  };

  const ensureRootsPresent = () => {
    if (!isPrankActive) return;
    if (!document.body) return;

    if (!rootsToken) {
      rootsToken = randomToken();
    }

    for (let i = 0; i < ROOT_COUNT; i += 1) {
      const expectedId = `devtools-prank-overlay-${rootsToken}-${i + 1}`;
      const existing = document.getElementById(expectedId);
      if (existing && existing instanceof HTMLDivElement) {
        if (!rootEls.includes(existing)) {
          rootEls.push(existing);
        }
        continue;
      }

      const rootEl = document.createElement("div");
      rootEl.id = expectedId;
      rootEl.setAttribute("data-devtools-prank-root", rootsToken);
      rootEl.style.position = "fixed";
      rootEl.style.inset = "0";
      rootEl.style.zIndex = "9999";
      rootEl.style.pointerEvents = "none";
      rootEl.style.overflow = "hidden";
      rootEl.style.background =
        "radial-gradient(circle at 25% 15%, rgba(255, 0, 0, 0.08), transparent 45%), radial-gradient(circle at 78% 70%, rgba(255, 0, 0, 0.08), transparent 50%)";
      document.body.appendChild(rootEl);
      rootEls.push(rootEl);
    }

    rootEls = rootEls.filter(
      (rootEl) =>
        rootEl.isConnected &&
        rootEl.getAttribute("data-devtools-prank-root") === rootsToken
    );

    trimCards();
  };

  const startObserver = () => {
    disconnectObserver();
    observer = new MutationObserver(() => {
      ensureRootsPresent();
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
    });
  };

  const spawnCard = () => {
    ensureRootsPresent();
    if (rootEls.length === 0) return;

    const card = document.createElement("div");
    const targetRoot = rootEls[randomInt(0, rootEls.length - 1)];
    const left = randomInt(7, 93);
    const top = randomInt(8, 90);
    const rotate = (Math.random() * 16 - 8).toFixed(2);
    const refId = `${randomInt(1000, 9999)}-${randomInt(100000, 999999)}`;
    const alerts = [
      "AKSES TIDAK SAH TERDETEKSI",
      "SESI INSPECTOR DISUSUPI",
      "KONEKSI DEBUG BERBAHAYA",
      "INTRUSI PADA RUNTIME",
    ];
    const details = [
      "Jejak sesi Anda sedang disalin oleh pihak eksternal",
      "Objek window terindikasi disisipi hook tidak dikenal",
      "DOM watcher berpindah ke mode darurat",
      "Fingerprint browser terpublikasi ke kanal asing",
    ];
    const alert = alerts[randomInt(0, alerts.length - 1)];
    const detail = details[randomInt(0, details.length - 1)];

    card.setAttribute("role", "presentation");
    card.style.position = "absolute";
    card.style.left = `${left}%`;
    card.style.top = `${top}%`;
    card.style.width = "280px";
    card.style.padding = "12px";
    card.style.borderRadius = "14px";
    card.style.border = "1px solid rgba(255, 99, 99, 0.55)";
    card.style.background =
      "linear-gradient(180deg, rgba(35, 0, 0, 0.96), rgba(72, 0, 0, 0.95))";
    card.style.color = "#ffecec";
    card.style.fontSize = "12px";
    card.style.fontWeight = "600";
    card.style.transform = `translate(-50%, -50%) rotate(${rotate}deg)`;
    card.style.userSelect = "none";
    card.style.pointerEvents = "none";
    card.style.boxShadow =
      "0 16px 42px rgba(0,0,0,0.55), 0 0 0 1px rgba(255, 0, 0, 0.16) inset";
    card.style.backdropFilter = "blur(4px)";
    card.innerHTML = `
      <div style="display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:8px;">
        <span style="display:inline-flex; align-items:center; gap:6px; font-weight:800; letter-spacing:0.07em; color:#ff6b6b;">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" aria-hidden="true">
            <path d="M12 3L22 21H2L12 3Z" stroke="#ff6b6b" stroke-width="1.7" />
            <path d="M12 9V14" stroke="#ffb3b3" stroke-width="1.9" stroke-linecap="round" />
            <circle cx="12" cy="17.2" r="1.05" fill="#ffb3b3" />
          </svg>
          SYSTEM BREACH WARNING
        </span>
        <span style="font-size:10px; color:#ff9e9e; border:1px solid rgba(255,120,120,0.45); border-radius:999px; padding:2px 8px;">
          HIGH
        </span>
      </div>
      <div style="font-size:12px; font-weight:700; margin-bottom:6px; color:#fff;">
        ${alert}
      </div>
      <div style="font-size:11px; color:#ffd8d8; line-height:1.35; margin-bottom:8px;">
        ${detail}
      </div>
      <div style="display:flex; justify-content:space-between; font-size:10px; color:#ffb0b0; border-top:1px solid rgba(255,130,130,0.28); padding-top:7px;">
        <span>ID ${refId}</span>
        <span>RISIKO ${randomInt(61, 99)}%</span>
      </div>
    `;

    targetRoot.appendChild(card);
    trimCards();
  };

  const churnDom = () => {
    ensureRootsPresent();
    if (rootEls.length === 0) return;

    for (let i = 0; i < rootEls.length; i += 1) {
      const rootEl = rootEls[i];
      const cards = Array.from(rootEl.children) as HTMLElement[];
      if (cards.length < 2) continue;

      const idxA = randomInt(0, cards.length - 1);
      const idxB = randomInt(0, cards.length - 1);
      if (idxA !== idxB) {
        rootEl.insertBefore(cards[idxA], cards[idxB]);
      }
    }

    const source = rootEls[randomInt(0, rootEls.length - 1)];
    const target = rootEls[randomInt(0, rootEls.length - 1)];
    if (source.children.length > 0 && source !== target) {
      const randomCard = source.children[
        randomInt(0, source.children.length - 1)
      ] as HTMLElement;
      randomCard.style.left = `${randomInt(7, 93)}%`;
      randomCard.style.top = `${randomInt(8, 90)}%`;
      randomCard.style.transform = `translate(-50%, -50%) rotate(${(
        Math.random() * 16 - 8
      ).toFixed(2)}deg)`;
      randomCard.dataset.tick = `${Date.now()}-${randomInt(10, 99)}`;
      target.appendChild(randomCard);
    }
  };

  const startPrank = () => {
    if (isPrankActive) return;
    isPrankActive = true;
    rootsToken = randomToken();
    ensureRootsPresent();
    startObserver();

    for (let i = 0; i < 16; i += 1) {
      spawnCard();
    }
    spawnTimer = window.setInterval(spawnCard, SPAWN_INTERVAL_MS);
    churnTimer = window.setInterval(churnDom, CHURN_INTERVAL_MS);
  };

  const stopPrank = () => {
    if (!isPrankActive) return;
    isPrankActive = false;
    stopSpawn();
    stopChurn();
    disconnectObserver();
    teardownRoots();
  };

  const isDevToolsOpen = () => {
    const widthGap = Math.abs(window.outerWidth - window.innerWidth);
    const heightGap = Math.abs(window.outerHeight - window.innerHeight);
    return widthGap > DEVTOOLS_THRESHOLD || heightGap > DEVTOOLS_THRESHOLD;
  };

  const setup = (): CleanupFn => {
    if (!isEnabled) return null;

    const evaluate = () => {
      if (isDevToolsOpen()) startPrank();
      else stopPrank();
    };

    evaluate();
    detectTimer = window.setInterval(evaluate, DETECT_INTERVAL_MS);

    return () => {
      if (detectTimer !== null) {
        window.clearInterval(detectTimer);
        detectTimer = null;
      }
      stopPrank();
    };
  };

  let cleanup: CleanupFn = null;

  onMounted(() => {
    cleanup = setup();
  });

  onBeforeUnmount(() => {
    cleanup?.();
    cleanup = null;
  });
}
