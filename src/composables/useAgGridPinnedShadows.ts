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

    const pinnedLeftEl = rootEl.querySelector(
      ".ag-pinned-left-cols-container"
    ) as HTMLElement | null;
    const pinnedRightEl = rootEl.querySelector(
      ".ag-pinned-right-cols-container"
    ) as HTMLElement | null;
    const hasPinnedLeft = !!pinnedLeftEl;
    const hasPinnedRight = !!pinnedRightEl;

    const shadowHost =
      (rootEl.querySelector(".ag-body-viewport") as HTMLElement | null) ??
      rootWrapper ??
      host;
    const centerViewport = rootEl.querySelector(
      ".ag-center-cols-viewport"
    ) as HTMLElement | null;
    shadowHost.classList.add("agx-shadow-host");
    const leftShadow = document.createElement("div");
    leftShadow.className = "agx-pinned-shadow agx-pinned-shadow-left";
    const rightShadow = document.createElement("div");
    rightShadow.className = "agx-pinned-shadow agx-pinned-shadow-right";
    shadowHost.append(leftShadow, rightShadow);

    const setClasses = (left: number, maxScroll: number) => {
      const leftWidth = pinnedLeftEl?.getBoundingClientRect().width ?? 0;
      const rightWidth = pinnedRightEl?.getBoundingClientRect().width ?? 0;
      const centerLeft =
        (centerViewport?.getBoundingClientRect().left ?? 0) -
        (shadowHost.getBoundingClientRect().left ?? 0);
      const centerRight =
        (shadowHost.getBoundingClientRect().right ?? 0) -
        (centerViewport?.getBoundingClientRect().right ?? 0);
      shadowHost.style.setProperty(
        "--agx-pinned-left-width",
        `${centerLeft + leftWidth}px`
      );
      shadowHost.style.setProperty(
        "--agx-pinned-right-width",
        `${centerRight + rightWidth}px`
      );
      const showLeft = hasPinnedLeft && left > 0;
      const showRight = hasPinnedRight && left < maxScroll - 1;
      host.classList.toggle("agx-shadow-left", showLeft);
      host.classList.toggle("agx-shadow-right", showRight);
      shadowHost.classList.toggle("agx-shadow-left", showLeft);
      shadowHost.classList.toggle("agx-shadow-right", showRight);
      leftShadow.classList.toggle("is-visible", showLeft);
      rightShadow.classList.toggle("is-visible", showRight);
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

    update();

    return () => {
      viewport.removeEventListener("scroll", onScroll);
      ro.disconnect();
      host.classList.remove("agx-shadow-left", "agx-shadow-right");
      shadowHost.classList.remove("agx-shadow-left", "agx-shadow-right");
      shadowHost.classList.remove("agx-shadow-host");
      leftShadow.remove();
      rightShadow.remove();
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
