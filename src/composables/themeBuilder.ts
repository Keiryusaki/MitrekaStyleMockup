export type ThemeMode = "mitrekalight" | "mitrekadark";

type ThemeScale = {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    info: string;
    success: string;
    warning: string;
    error: string;
    neutral: string;
  };
  base: {
    base100: string;
    base200: string;
    base300: string;
    baseContent: string;
  };
  layout: {
    usePrimaryForLayout: boolean;
    topbarBg: string;
    topbarText: string;
    sidebarBg: string;
    sidebarText: string;
  };
  sidebar: {
    hoverBg: string;
    activeBg: string;
    activeText: string;
    activeBorder: string;
    openBg: string;
    openText: string;
    activeMark: string;
  };
  link: {
    color: string;
    hover: string;
    visited: string;
  };
  radius: {
    field: string;
    box: string;
  };
};

export type ThemeBuilderDraft = {
  light: ThemeScale;
  dark: ThemeScale;
};

const STORAGE_KEY = "mitreka-theme-builder-v2";
const LEGACY_STORAGE_KEY = "mitreka-theme-builder-v1";
const STYLE_ID = "mitreka-theme-builder-override";

function clampColor(value: string, fallback: string): string {
  const v = (value || "").trim();
  if (!v) return fallback;
  if (/^#[0-9a-fA-F]{3,8}$/.test(v)) return v;
  if (/^rgba?\(\s*[\d.\s,/%+-]+\)$/i.test(v)) return v;
  if (/^oklch\(\s*[\d.\s/%+-]+\)$/i.test(v)) return v;
  return fallback;
}

function clampRem(value: string, fallback: string): string {
  const v = (value || "").trim();
  return /^\d+(?:\.\d+)?rem$/.test(v) ? v : fallback;
}

function esc(value: string): string {
  return value.replace(/[^#(),.%\-\sa-zA-Z0-9]/g, "");
}

function parseRem(value: string, fallback: number): number {
  const v = (value || "").trim();
  const parsed = Number.parseFloat(v.replace("rem", ""));
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toRem(value: number): string {
  return `${Math.max(0.125, value).toFixed(3).replace(/\.?0+$/, "")}rem`;
}

function deriveFieldRadiusScale(fieldRadius: string): {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
} {
  const md = parseRem(fieldRadius, 0.5);
  return {
    xs: toRem(md - 0.125),
    sm: toRem(md),
    md: toRem(md),
    lg: toRem(md + 0.125),
    xl: toRem(md + 0.25),
  };
}

function defaultLight(): ThemeScale {
  return {
    colors: {
      primary: "#025097",
      secondary: "#f2f2f2",
      accent: "#51e8fb",
      info: "#00a4f2",
      success: "#00ba7b",
      warning: "#ff6700",
      error: "#ee3032",
      neutral: "#09090b",
    },
    base: {
      base100: "#ffffff",
      base200: "#f3f4f6",
      base300: "#e5e7eb",
      baseContent: "#1f2937",
    },
    layout: {
      usePrimaryForLayout: false,
      topbarBg: "#025097",
      topbarText: "#ffffff",
      sidebarBg: "#ffffff",
      sidebarText: "#1f2937",
    },
    sidebar: {
      hoverBg: "#d1d5db",
      activeBg: "#e7f0fa",
      activeText: "#025097",
      activeBorder: "#025097",
      openBg: "#e7f0fa",
      openText: "#025097",
      activeMark: "#025097",
    },
    link: {
      color: "#025097",
      hover: "#013b6f",
      visited: "#6c3eb8",
    },
    radius: {
      field: "0.5rem",
      box: "0.5rem",
    },
  };
}

function defaultDark(): ThemeScale {
  return {
    colors: {
      primary: "#025097",
      secondary: "#f2f2f2",
      accent: "#51e8fb",
      info: "#00a4f2",
      success: "#00ba7b",
      warning: "#ff6700",
      error: "#ee3032",
      neutral: "#35363b",
    },
    base: {
      // Normalized toward production dark-base tokens (navy)
      base100: "#0f1d3d",
      base200: "#162a52",
      base300: "#2b446d",
      baseContent: "#f3f7ff",
    },
    layout: {
      usePrimaryForLayout: false,
      topbarBg: "#025097",
      topbarText: "#ffffff",
      sidebarBg: "#0f1d3d",
      sidebarText: "#f3f7ff",
    },
    sidebar: {
      hoverBg: "rgb(229 231 235 / 0.2)",
      activeBg: "color-mix(in oklch, var(--color-primary), transparent 90%)",
      activeText: "#4fc7db",
      activeBorder: "#4fc7db",
      openBg: "color-mix(in oklch, var(--color-accent), transparent 90%)",
      openText: "#4fc7db",
      activeMark: "#4fc7db",
    },
    link: {
      color: "#4fc7db",
      hover: "#85dded",
      visited: "#a78bfa",
    },
    radius: {
      field: "0.5rem",
      box: "0.5rem",
    },
  };
}

export function getDefaultThemeDraft(): ThemeBuilderDraft {
  return {
    light: defaultLight(),
    dark: defaultDark(),
  };
}

function normalizeScale(input: Partial<ThemeScale> | undefined, fallback: ThemeScale): ThemeScale {
  const i = input || {};
  return {
    colors: {
      primary: clampColor(i.colors?.primary || "", fallback.colors.primary),
      secondary: clampColor(i.colors?.secondary || "", fallback.colors.secondary),
      accent: clampColor(i.colors?.accent || "", fallback.colors.accent),
      info: clampColor(i.colors?.info || "", fallback.colors.info),
      success: clampColor(i.colors?.success || "", fallback.colors.success),
      warning: clampColor(i.colors?.warning || "", fallback.colors.warning),
      error: clampColor(i.colors?.error || "", fallback.colors.error),
      neutral: clampColor(i.colors?.neutral || "", fallback.colors.neutral),
    },
    base: {
      base100: clampColor(i.base?.base100 || "", fallback.base.base100),
      base200: clampColor(i.base?.base200 || "", fallback.base.base200),
      base300: clampColor(i.base?.base300 || "", fallback.base.base300),
      baseContent: clampColor(i.base?.baseContent || "", fallback.base.baseContent),
    },
    layout: {
      usePrimaryForLayout: i.layout?.usePrimaryForLayout ?? fallback.layout.usePrimaryForLayout,
      topbarBg: clampColor(i.layout?.topbarBg || "", fallback.layout.topbarBg),
      topbarText: clampColor(i.layout?.topbarText || "", fallback.layout.topbarText),
      sidebarBg: clampColor(i.layout?.sidebarBg || "", fallback.layout.sidebarBg),
      sidebarText: clampColor(i.layout?.sidebarText || "", fallback.layout.sidebarText),
    },
    sidebar: {
      hoverBg: clampColor(i.sidebar?.hoverBg || "", fallback.sidebar.hoverBg),
      activeBg: clampColor(i.sidebar?.activeBg || "", fallback.sidebar.activeBg),
      activeText: clampColor(i.sidebar?.activeText || "", fallback.sidebar.activeText),
      activeBorder: clampColor(i.sidebar?.activeBorder || "", fallback.sidebar.activeBorder),
      openBg: clampColor(i.sidebar?.openBg || "", fallback.sidebar.openBg),
      openText: clampColor(i.sidebar?.openText || "", fallback.sidebar.openText),
      activeMark: clampColor(i.sidebar?.activeMark || "", fallback.sidebar.activeMark),
    },
    link: {
      color: clampColor(i.link?.color || "", fallback.link.color),
      hover: clampColor(i.link?.hover || "", fallback.link.hover),
      visited: clampColor(i.link?.visited || "", fallback.link.visited),
    },
    radius: {
      field: clampRem(i.radius?.field || "", fallback.radius.field),
      box: clampRem(i.radius?.box || "", fallback.radius.box),
    },
  };
}

function readCssVar(style: CSSStyleDeclaration, key: string, fallback: string): string {
  const value = style.getPropertyValue(key).trim();
  return value || fallback;
}

function readThemeScaleFromRoot(mode: ThemeMode, fallback: ThemeScale): ThemeScale {
  const root = document.documentElement;
  root.setAttribute("data-theme", mode);
  root.classList.toggle("dark", mode === "mitrekadark");

  const style = getComputedStyle(root);

  return {
    colors: {
      primary: readCssVar(style, "--color-primary", fallback.colors.primary),
      secondary: readCssVar(style, "--color-secondary", fallback.colors.secondary),
      accent: readCssVar(style, "--color-accent", fallback.colors.accent),
      info: readCssVar(style, "--color-info", fallback.colors.info),
      success: readCssVar(style, "--color-success", fallback.colors.success),
      warning: readCssVar(style, "--color-warning", fallback.colors.warning),
      error: readCssVar(style, "--color-error", fallback.colors.error),
      neutral: readCssVar(style, "--color-neutral", fallback.colors.neutral),
    },
    base: {
      base100: readCssVar(style, "--color-base-100", fallback.base.base100),
      base200: readCssVar(style, "--color-base-200", fallback.base.base200),
      base300: readCssVar(style, "--color-base-300", fallback.base.base300),
      baseContent: readCssVar(style, "--color-base-content", fallback.base.baseContent),
    },
    layout: {
      usePrimaryForLayout: false,
      topbarBg: readCssVar(style, "--color-layout-topbar-bg", fallback.layout.topbarBg),
      topbarText: readCssVar(style, "--color-layout-topbar-text", fallback.layout.topbarText),
      sidebarBg: readCssVar(style, "--color-layout-sidebar-bg", fallback.layout.sidebarBg),
      sidebarText: readCssVar(style, "--color-layout-sidebar-text", fallback.layout.sidebarText),
    },
    sidebar: {
      hoverBg: readCssVar(style, "--color-sidebar-hover-bg", fallback.sidebar.hoverBg),
      activeBg: readCssVar(style, "--color-sidebar-active-bg", fallback.sidebar.activeBg),
      activeText: readCssVar(style, "--color-sidebar-active-text", fallback.sidebar.activeText),
      activeBorder: readCssVar(style, "--color-sidebar-active-border", fallback.sidebar.activeBorder),
      openBg: readCssVar(style, "--color-sidebar-open-bg", fallback.sidebar.openBg),
      openText: readCssVar(style, "--color-sidebar-open-text", fallback.sidebar.openText),
      activeMark: readCssVar(style, "--color-sidebar-active-mark", fallback.sidebar.activeMark),
    },
    link: {
      color: readCssVar(style, "--color-link", fallback.link.color),
      hover: readCssVar(style, "--color-link-hover", fallback.link.hover),
      visited: readCssVar(style, "--color-link-visited", fallback.link.visited),
    },
    radius: {
      field: readCssVar(style, "--radius-field-md", fallback.radius.field),
      box: readCssVar(style, "--radius-box", fallback.radius.box),
    },
  };
}

export function getRuntimeDefaultThemeDraft(): ThemeBuilderDraft {
  const fallback = getDefaultThemeDraft();
  if (typeof document === "undefined") return fallback;

  const root = document.documentElement;
  const previousTheme = root.getAttribute("data-theme");
  const hadDarkClass = root.classList.contains("dark");

  try {
    const light = readThemeScaleFromRoot("mitrekalight", fallback.light);
    const dark = readThemeScaleFromRoot("mitrekadark", fallback.dark);
    return normalizeThemeDraft({ light, dark });
  } finally {
    if (previousTheme) {
      root.setAttribute("data-theme", previousTheme);
    } else {
      root.removeAttribute("data-theme");
    }
    root.classList.toggle("dark", hadDarkClass);
  }
}

function normalizeLegacy(input: any): ThemeBuilderDraft {
  const fallback = getDefaultThemeDraft();
  const legacy = input || {};
  const mappedLight: ThemeScale = {
    colors: legacy.colors || fallback.light.colors,
    base: legacy.base || fallback.light.base,
    layout: legacy.layout || fallback.light.layout,
    sidebar: fallback.light.sidebar,
    link: legacy.link || fallback.light.link,
    radius: legacy.radius || fallback.light.radius,
  };
  const mappedDark: ThemeScale = {
    // Keep brand/state palette from legacy, but preserve dark foundations.
    colors: legacy.colors || fallback.dark.colors,
    base: fallback.dark.base,
    layout: {
      ...fallback.dark.layout,
      usePrimaryForLayout:
        typeof legacy.layout?.usePrimaryForLayout === "boolean"
          ? legacy.layout.usePrimaryForLayout
          : fallback.dark.layout.usePrimaryForLayout,
      topbarBg: legacy.layout?.topbarBg || fallback.dark.layout.topbarBg,
      topbarText: legacy.layout?.topbarText || fallback.dark.layout.topbarText,
    },
    sidebar: fallback.dark.sidebar,
    link: fallback.dark.link,
    radius: legacy.radius || fallback.dark.radius,
  };
  return {
    light: normalizeScale(mappedLight, fallback.light),
    dark: normalizeScale(mappedDark, fallback.dark),
  };
}

function looksLikeMirroredDark(draft: ThemeBuilderDraft): boolean {
  // Heuristic for buggy v2 data created by older migration (dark copied from light).
  return (
    draft.dark.base.base100 === draft.light.base.base100 &&
    draft.dark.base.base200 === draft.light.base.base200 &&
    draft.dark.base.base300 === draft.light.base.base300 &&
    draft.dark.base.baseContent === draft.light.base.baseContent &&
    draft.dark.layout.sidebarBg === draft.light.layout.sidebarBg &&
    draft.dark.layout.sidebarText === draft.light.layout.sidebarText
  );
}

function repairMirroredDarkDraft(draft: ThemeBuilderDraft): ThemeBuilderDraft {
  const fallback = getDefaultThemeDraft();
  return {
    light: draft.light,
    dark: normalizeScale(
      {
        colors: draft.dark.colors,
        radius: draft.dark.radius,
        layout: {
          ...fallback.dark.layout,
          usePrimaryForLayout: draft.dark.layout.usePrimaryForLayout,
          topbarBg: draft.dark.layout.topbarBg,
          topbarText: draft.dark.layout.topbarText,
        },
        base: fallback.dark.base,
        sidebar: fallback.dark.sidebar,
        link: fallback.dark.link,
      },
      fallback.dark
    ),
  };
}

function looksLikeLegacyPurpleDarkPreset(draft: ThemeBuilderDraft): boolean {
  // Legacy dark sample that accidentally became persisted as "real" dark theme.
  const dark = draft.dark;
  return (
    dark.base.base100.toLowerCase() === "#1e1b4b" &&
    dark.base.base200.toLowerCase() === "#312e81" &&
    dark.base.base300.toLowerCase() === "#4338ca" &&
    dark.base.baseContent.toLowerCase() === "#f5f5f5"
  );
}

function repairLegacyPurpleDarkPreset(draft: ThemeBuilderDraft): ThemeBuilderDraft {
  const fallback = getDefaultThemeDraft();
  return {
    light: draft.light,
    dark: normalizeScale(
      {
        colors: draft.dark.colors,
        radius: draft.dark.radius,
        layout: {
          ...fallback.dark.layout,
          usePrimaryForLayout: draft.dark.layout.usePrimaryForLayout,
          topbarBg: draft.dark.layout.topbarBg,
          topbarText: draft.dark.layout.topbarText,
        },
        base: fallback.dark.base,
        sidebar: fallback.dark.sidebar,
        link: fallback.dark.link,
      },
      fallback.dark
    ),
  };
}

export function normalizeThemeDraft(input?: Partial<ThemeBuilderDraft> | null): ThemeBuilderDraft {
  const d = getDefaultThemeDraft();
  if (!input) return d;

  if ((input as any).colors) {
    return normalizeLegacy(input);
  }

  return {
    light: normalizeScale(input.light, d.light),
    dark: normalizeScale(input.dark, d.dark),
  };
}

function buildModeCss(mode: ThemeMode, scale: ThemeScale): string {
  const topbarBg = scale.layout.usePrimaryForLayout ? scale.colors.primary : scale.layout.topbarBg;
  const topbarText = scale.layout.usePrimaryForLayout ? "#ffffff" : scale.layout.topbarText;
  const sidebarBg = scale.layout.usePrimaryForLayout ? scale.colors.primary : scale.layout.sidebarBg;
  const sidebarText = scale.layout.usePrimaryForLayout ? "#ffffff" : scale.layout.sidebarText;
  const fieldRadius = deriveFieldRadiusScale(scale.radius.field);

  return `:root[data-theme="${mode}"] {
  --color-primary: ${esc(scale.colors.primary)};
  --color-secondary: ${esc(scale.colors.secondary)};
  --color-accent: ${esc(scale.colors.accent)};
  --color-info: ${esc(scale.colors.info)};
  --color-success: ${esc(scale.colors.success)};
  --color-warning: ${esc(scale.colors.warning)};
  --color-error: ${esc(scale.colors.error)};
  --color-neutral: ${esc(scale.colors.neutral)};

  --color-base-100: ${esc(scale.base.base100)};
  --color-base-200: ${esc(scale.base.base200)};
  --color-base-300: ${esc(scale.base.base300)};
  --color-base-content: ${esc(scale.base.baseContent)};

  --color-layout-topbar-bg: ${esc(topbarBg)};
  --color-layout-topbar-text: ${esc(topbarText)};
  --color-layout-sidebar-bg: ${esc(sidebarBg)};
  --color-layout-sidebar-text: ${esc(sidebarText)};

  --color-sidebar-hover-bg: ${esc(scale.sidebar.hoverBg)};
  --color-sidebar-active-bg: ${esc(scale.sidebar.activeBg)};
  --color-sidebar-active-text: ${esc(scale.sidebar.activeText)};
  --color-sidebar-active-border: ${esc(scale.sidebar.activeBorder)};
  --color-sidebar-open-bg: ${esc(scale.sidebar.openBg)};
  --color-sidebar-open-text: ${esc(scale.sidebar.openText)};
  --color-sidebar-active-mark: ${esc(scale.sidebar.activeMark)};

  --color-link: ${esc(scale.link.color)};
  --color-link-hover: ${esc(scale.link.hover)};
  --color-link-visited: ${esc(scale.link.visited)};

  --radius-field-xs: ${esc(fieldRadius.xs)};
  --radius-field-sm: ${esc(fieldRadius.sm)};
  --radius-field-md: ${esc(fieldRadius.md)};
  --radius-field-lg: ${esc(fieldRadius.lg)};
  --radius-field-xl: ${esc(fieldRadius.xl)};
  --radius-box: ${esc(scale.radius.box)};
}`;
}

export function buildThemeOverrideCss(rawDraft: ThemeBuilderDraft): string {
  const draft = normalizeThemeDraft(rawDraft);
  return `${buildModeCss("mitrekalight", draft.light)}\n${buildModeCss("mitrekadark", draft.dark)}`;
}

export function applyThemeOverride(draft: ThemeBuilderDraft | null): void {
  const existing = document.getElementById(STYLE_ID);
  if (!draft) {
    existing?.remove();
    return;
  }

  const css = buildThemeOverrideCss(draft);
  const style = existing || document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = css;

  if (!existing) {
    document.head.appendChild(style);
  }
}

export function saveThemeOverride(draft: ThemeBuilderDraft): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(normalizeThemeDraft(draft)));
}

export function loadThemeOverride(): ThemeBuilderDraft | null {
  try {
    const current = localStorage.getItem(STORAGE_KEY);
    if (current) {
      const normalized = normalizeThemeDraft(
        JSON.parse(current) as Partial<ThemeBuilderDraft>
      );
      if (looksLikeMirroredDark(normalized)) {
        const repaired = repairMirroredDarkDraft(normalized);
        saveThemeOverride(repaired);
        return repaired;
      }
      if (looksLikeLegacyPurpleDarkPreset(normalized)) {
        const repaired = repairLegacyPurpleDarkPreset(normalized);
        saveThemeOverride(repaired);
        return repaired;
      }
      return normalized;
    }

    const legacy = localStorage.getItem(LEGACY_STORAGE_KEY);
    if (!legacy) return null;
    const migrated = normalizeLegacy(JSON.parse(legacy));
    saveThemeOverride(migrated);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    return migrated;
  } catch {
    return null;
  }
}

export function clearThemeOverride(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  applyThemeOverride(null);
}

export function initThemeOverrideFromStorage(): void {
  const saved = loadThemeOverride();
  if (saved) {
    applyThemeOverride(saved);
  }
}
