export type PinnedShadowCleanup = () => void;

const attachPinnedShadowsToElement = (
  rootEl: HTMLElement
): PinnedShadowCleanup => {
  let cleanup: PinnedShadowCleanup | null = null;
  let observer: MutationObserver | null = null;
  let cancelled = false;

  const attach = (): PinnedShadowCleanup | null => {
    const host =
      (rootEl.closest(".agx") as HTMLElement | null) ?? (rootEl as HTMLElement);
    const rootWrapper =
      (rootEl.querySelector(".ag-root-wrapper") as HTMLElement | null) ??
      (host.querySelector(".ag-root-wrapper") as HTMLElement | null);
    const viewport = (rootEl.querySelector(
      ".ag-center-cols-viewport"
    ) ||
      rootEl.querySelector(
        ".ag-body-horizontal-scroll-viewport"
      )) as HTMLElement | null;
    if (!viewport) return null;

    const bodyViewport = rootEl.querySelector(
      ".ag-body-viewport"
    ) as HTMLElement | null;
    const shadowHost = bodyViewport ?? rootWrapper ?? host;
    const pinnedLeftEl = rootEl.querySelector(
      ".ag-pinned-left-cols-container"
    ) as HTMLElement | null;
    const pinnedRightEl = rootEl.querySelector(
      ".ag-pinned-right-cols-container"
    ) as HTMLElement | null;
    const centerViewport = rootEl.querySelector(
      ".ag-center-cols-viewport"
    ) as HTMLElement | null;
    const centerContainer = rootEl.querySelector(
      ".ag-center-cols-container"
    ) as HTMLElement | null;
    const hScrollViewport = rootEl.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    ) as HTMLElement | null;

    const setClasses = (left: number, maxScroll: number) => {
      const leftWidth = pinnedLeftEl?.getBoundingClientRect().width ?? 0;
      const rightWidth = pinnedRightEl?.getBoundingClientRect().width ?? 0;
      const shadowHeight =
        centerViewport?.getBoundingClientRect().height ??
        shadowHost.getBoundingClientRect().height;
      shadowHost.style.setProperty("--agx-left-shadow-x", `${leftWidth}px`);
      shadowHost.style.setProperty("--agx-right-shadow-x", `${rightWidth}px`);
      shadowHost.style.setProperty("--agx-shadow-h", `${shadowHeight}px`);
      const showLeft = left > 0;
      const showRight = left < maxScroll - 1;
      shadowHost.classList.toggle("agx-shadow-left", showLeft);
      shadowHost.classList.toggle("agx-shadow-right", showRight);
    };

    const update = () => {
      const maxScroll = Math.max(
        0,
        viewport.scrollWidth - viewport.clientWidth
      );
      const left = viewport.scrollLeft;
      setClasses(left, maxScroll);
    };

    const onScroll = () => update();
    viewport.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(update);
    ro.observe(viewport);
    if (centerContainer) ro.observe(centerContainer);
    if (hScrollViewport) ro.observe(hScrollViewport);
    if (shadowHost && shadowHost !== viewport) ro.observe(shadowHost);

    const mo = new MutationObserver(update);
    if (centerContainer) {
      mo.observe(centerContainer, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }
    mo.observe(viewport, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["style", "class"],
    });

    const onWindowResize = () => update();
    window.addEventListener("resize", onWindowResize, { passive: true });

    update();

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onWindowResize);
      mo.disconnect();
      ro.disconnect();
      shadowHost.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };

  cleanup = attach();
  let pollTimer: number | null = null;
  let pollCount = 0;
  if (!cleanup) {
    observer = new MutationObserver(() => {
      if (cancelled) return;
      cleanup = attach();
      if (cleanup && observer) {
        observer.disconnect();
        observer = null;
      }
    });
    observer.observe(rootEl, { childList: true, subtree: true });

    pollTimer = window.setInterval(() => {
      if (cancelled) return;
      pollCount += 1;
      if (cleanup) return;
      cleanup = attach();
      if (cleanup || pollCount > 30) {
        if (pollTimer) window.clearInterval(pollTimer);
        pollTimer = null;
        observer?.disconnect();
        observer = null;
      }
    }, 120);
  }

  return () => {
    cancelled = true;
    observer?.disconnect();
    if (pollTimer) window.clearInterval(pollTimer);
    cleanup?.();
  };
};

export const attachPinnedShadows = (params: any): PinnedShadowCleanup => {
  const api = params?.api;
  const gui: HTMLElement | null = api?.getGui?.() ?? null;
  if (!gui) return () => {};
  return attachPinnedShadowsToElement(gui);
};

export { attachPinnedShadowsToElement };
