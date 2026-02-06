type AgxDensity = "compact" | "cozy" | "spacious";

const fallbackFontPx = 13;

const parseCssSizeToPx = (raw: string, rootPx: number) => {
  const value = raw.trim();
  if (!value) return NaN;
  if (value.endsWith("px")) return parseFloat(value);
  if (value.endsWith("rem")) return parseFloat(value) * rootPx;
  const num = parseFloat(value);
  return Number.isFinite(num) ? num : NaN;
};

export const resolveAgFontPx = (el?: HTMLElement | null) => {
  if (typeof window === "undefined") return fallbackFontPx;
  const target = el ?? document.documentElement;
  if (!target) return fallbackFontPx;
  const styles = getComputedStyle(target);
  const computedFont = parseFloat(styles.fontSize);
  if (Number.isFinite(computedFont)) return computedFont;

  const rootStyles = getComputedStyle(document.documentElement);
  const rootPx = parseFloat(rootStyles.fontSize) || 16;
  const agFont = parseCssSizeToPx(
    styles.getPropertyValue("--ag-font-size"),
    rootPx
  );
  if (Number.isFinite(agFont)) return agFont;
  const xs = parseCssSizeToPx(
    styles.getPropertyValue("--font-size-xs"),
    rootPx
  );
  if (Number.isFinite(xs)) return xs;
  const rootAgFont = parseCssSizeToPx(
    rootStyles.getPropertyValue("--ag-font-size"),
    rootPx
  );
  if (Number.isFinite(rootAgFont)) return rootAgFont;
  const rootXs = parseCssSizeToPx(
    rootStyles.getPropertyValue("--font-size-xs"),
    rootPx
  );
  return Number.isFinite(rootXs) ? rootXs : fallbackFontPx;
};

export const calcAgRowHeight = (fontPx: number, density: AgxDensity) => {
  if (!Number.isFinite(fontPx)) return fallbackFontPx * 2.2;
  const factor = density === "compact" ? 1.7 : density === "spacious" ? 2.8 : 2.2;
  return Math.max(20, Math.round(fontPx * factor));
};
