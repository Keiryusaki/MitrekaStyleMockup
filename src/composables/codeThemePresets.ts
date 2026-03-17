import { type ThemeBuilderDraft, normalizeThemeDraft } from "@/composables/themeBuilder";

export type CodeThemePreset = {
  id: string;
  name: string;
  draft: ThemeBuilderDraft;
};

export const codeThemePresets: CodeThemePreset[] = [
  {
    id: "salesflow",
    name: "SalesFlow-1",
    draft: normalizeThemeDraft({
      light: {
        colors: {
          primary: "#fa6407",
          secondary: "oklch(96% 0.001 286.375)",
          accent: "oklch(86% 0.127 207.078)",
          info: "oklch(68% 0.169 237.323)",
          success: "oklch(69% 0.17 162.48)",
          warning: "#ff8c00",
          error: "#ee3032",
          neutral: "oklch(14% 0.005 285.823)",
        },
        base: {
          base100: "oklch(100% 0 0)",
          base200: "#f3f4f6",
          base300: "oklch(95% 0 0)",
          baseContent: "oklch(21% 0.006 285.885)",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#ff7700",
          topbarText: "#ffffff",
          sidebarBg: "oklch(100% 0 0)",
          sidebarText: "#6b401f",
        },
        sidebar: {
          hoverBg: "rgba(255, 107, 0, 0.1)",
          activeBg: "rgba(255, 107, 0, 0.1)",
          activeText: "#ff6b00",
          activeBorder: "#ff6b00",
          openBg: "rgba(255, 107, 0, 0.1)",
          openText: "#ff6b00",
          activeMark: "#ff6b00",
        },
        link: {
          color: "#025097",
          hover: "#013b6f",
          visited: "#6c3eb8",
        },
        radius: {
          field: "1.25rem",
          box: "1.15rem",
        },
      },
      dark: {
        colors: {
          primary: "#fa6407",
          secondary: "oklch(96% 0.001 286.375)",
          accent: "oklch(86% 0.127 207.078)",
          info: "oklch(68% 0.169 237.323)",
          success: "oklch(69% 0.17 162.48)",
          warning: "#ff8c00",
          error: "#ee3032",
          neutral: "oklch(0.335 0.008 275)",
        },
        base: {
          base100: "oklch(0.2 0.037 266.1)",
          base200: "oklch(0.26 0.068 264.7)",
          base300: "oklch(0.345 0.063 256.8)",
          baseContent: "oklch(96% 0.003 264.542)",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#ff7700",
          topbarText: "#ffffff",
          sidebarBg: "oklch(0.2 0.037 266.1)",
          sidebarText: "#ffdbbf",
        },
        sidebar: {
          hoverBg: "rgba(255, 107, 0, 0.1)",
          activeBg: "color-mix(in oklch, var(--color-primary), transparent 90%)",
          activeText: "#ff6b00",
          activeBorder: "#ff6b00",
          openBg: "rgba(255, 107, 0, 0.1)",
          openText: "#ff6b00",
          activeMark: "#ff6b00",
        },
        link: {
          color: "#ff6b00",
          hover: "#db5f00",
          visited: "#008cff",
        },
        radius: {
          field: "1.25rem",
          box: "1.15rem",
        },
      },
    }),
  },
  {
    id: "salesflow-2",
    name: "SalesFlow-2",
    draft: normalizeThemeDraft({
      light: {
        colors: {
          primary: "#fa6407",
          secondary: "oklch(96% 0.001 286.375)",
          accent: "oklch(86% 0.127 207.078)",
          info: "oklch(68% 0.169 237.323)",
          success: "oklch(69% 0.17 162.48)",
          warning: "#ff8c00",
          error: "#ee3032",
          neutral: "oklch(14% 0.005 285.823)",
        },
        base: {
          base100: "oklch(100% 0 0)",
          base200: "#f3f4f6",
          base300: "oklch(95% 0 0)",
          baseContent: "oklch(21% 0.006 285.885)",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#ff7700",
          topbarText: "#ffffff",
          sidebarBg: "oklch(100% 0 0)",
          sidebarText: "#005b6d",
        },
        sidebar: {
          hoverBg: "rgba(0, 194, 129, 0.1)",
          activeBg: "#005b6d",
          activeText: "#ffffff",
          activeBorder: "#ff6b00",
          openBg: "rgba(0, 194, 129, 0.1)",
          openText: "#005b6d",
          activeMark: "#ff6b00",
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
      },
      dark: {
        colors: {
          primary: "#fa6407",
          secondary: "oklch(96% 0.001 286.375)",
          accent: "oklch(86% 0.127 207.078)",
          info: "oklch(68% 0.169 237.323)",
          success: "oklch(69% 0.17 162.48)",
          warning: "#ff8c00",
          error: "#ee3032",
          neutral: "oklch(0.335 0.008 275)",
        },
        base: {
          base100: "oklch(0.2 0.037 266.1)",
          base200: "oklch(0.26 0.068 264.7)",
          base300: "oklch(0.345 0.063 256.8)",
          baseContent: "oklch(96% 0.003 264.542)",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#ff7700",
          topbarText: "#ffffff",
          sidebarBg: "oklch(0.2 0.037 266.1)",
          sidebarText: "#02a0bf",
        },
        sidebar: {
          hoverBg: "rgba(2, 160, 191, 0.2)",
          activeBg: "#005b6d",
          activeText: "#fffefc",
          activeBorder: "#944000",
          openBg: "rgba(2, 160, 191, 0.2)",
          openText: "#02a0bf",
          activeMark: "#c95700",
        },
        link: {
          color: "#ff6b00",
          hover: "#db5f00",
          visited: "#008cff",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
    }),
  },
  {
    id: "pmtools-1",
    name: "PMTools-1",
    draft: normalizeThemeDraft({
      light: {
        colors: {
          primary: "#166534",
          secondary: "#f3f4f6",
          accent: "#4fd1c5",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
          neutral: "#111827",
        },
        base: {
          base100: "#ffffff",
          base200: "#f8fafc",
          base300: "#e5e7eb",
          baseContent: "#111827",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#166534",
          topbarText: "#ffffff",
          sidebarBg: "#ffffff",
          sidebarText: "#1f2937",
        },
        sidebar: {
          hoverBg: "#a9f3d0",
          activeBg: "#14532d",
          activeText: "#ffffff",
          activeBorder: "#068c68",
          openBg: "#182645",
          openText: "#ffffff",
          activeMark: "#068c68",
        },
        link: {
          color: "#166534",
          hover: "#14532d",
          visited: "#0f766e",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
      dark: {
        colors: {
          primary: "#22c55e",
          secondary: "#334155",
          accent: "#2dd4bf",
          info: "#38bdf8",
          success: "#34d399",
          warning: "#fbbf24",
          error: "#f87171",
          neutral: "#f8fafc",
        },
        base: {
          base100: "#0f172a",
          base200: "#1e293b",
          base300: "#334155",
          baseContent: "#f1f5f9",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#020617",
          topbarText: "#ffffff",
          sidebarBg: "#0f172a",
          sidebarText: "#94a3b8",
        },
        sidebar: {
          hoverBg: "#1e293b",
          activeBg: "#166534",
          activeText: "#ffffff",
          activeBorder: "#22c55e",
          openBg: "#1e293b",
          openText: "#ffffff",
          activeMark: "#4ade80",
        },
        link: {
          color: "#4ade80",
          hover: "#86efac",
          visited: "#2dd4bf",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
    }),
  },
  {
    id: "tenderapps-1",
    name: "TenderApps-1",
    draft: normalizeThemeDraft({
      light: {
        colors: {
          primary: "#8e2de2",
          secondary: "oklch(96% 0.01 270)",
          accent: "#ffb800",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316",
          error: "#ef4444",
          neutral: "#1f2937",
        },
        base: {
          base100: "#ffffff",
          base200: "#f8fafc",
          base300: "#f1f5f9",
          baseContent: "#1e293b",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#9d2eda",
          topbarText: "#ffffff",
          sidebarBg: "#ffffff",
          sidebarText: "#4a244f",
        },
        sidebar: {
          hoverBg: "rgba(155, 5, 255, 0.16)",
          activeBg: "#4a1a6a",
          activeText: "#f0e1fa",
          activeBorder: "#9d2eda",
          openBg: "rgba(249, 115, 22, 0.14)",
          openText: "#4a1a6a",
          activeMark: "#fe5318",
        },
        link: {
          color: "#ea580c",
          hover: "#c2410c",
          visited: "#9a3412",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
      dark: {
        colors: {
          primary: "#a78bfa",
          secondary: "oklch(96% 0.001 286.375)",
          accent: "#fbbf24",
          info: "oklch(68% 0.169 237.323)",
          success: "oklch(69% 0.17 162.48)",
          warning: "#fb923c",
          error: "#ee3032",
          neutral: "oklch(0.335 0.008 275)",
        },
        base: {
          base100: "#0f172a",
          base200: "#1e293b",
          base300: "oklch(0.345 0.063 256.8)",
          baseContent: "#f8fafc",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#621ddb",
          topbarText: "#ffffff",
          sidebarBg: "#0f172a",
          sidebarText: "oklch(96% 0.003 264.542)",
        },
        sidebar: {
          hoverBg: "rgba(167, 139, 250, 0.32)",
          activeBg: "rgba(118, 32, 176, 0.15)",
          activeText: "#fb923c",
          activeBorder: "#9d2eda",
          openBg: "color-mix(in oklch, var(--color-accent), transparent 90%)",
          openText: "#a78bfa",
          activeMark: "#fb923c",
        },
        link: {
          color: "#fb923c",
          hover: "#fdba74",
          visited: "#a78bfa",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
    }),
  },
  {
    id: "tenderapps-2",
    name: "TenderApps-2",
    draft: normalizeThemeDraft({
      light: {
        colors: {
          primary: "#8e2de2",
          secondary: "oklch(96% 0.01 270)",
          accent: "#ffb800",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f97316",
          error: "#ef4444",
          neutral: "#1f2937",
        },
        base: {
          base100: "#ffffff",
          base200: "#f8fafc",
          base300: "#f1f5f9",
          baseContent: "#1e293b",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#9d2eda",
          topbarText: "#ffffff",
          sidebarBg: "#ffffff",
          sidebarText: "#4a244f",
        },
        sidebar: {
          hoverBg: "rgba(155, 5, 255, 0.16)",
          activeBg: "#4a1a6a",
          activeText: "#f0e1fa",
          activeBorder: "#9d2eda",
          openBg: "#8e2de2",
          openText: "#f0e1fa",
          activeMark: "#8e2de2",
        },
        link: {
          color: "#ea580c",
          hover: "#c2410c",
          visited: "#9a3412",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
      dark: {
        colors: {
          primary: "#8e2de2",
          secondary: "oklch(96% 0.001 286.375)",
          accent: "#fbbf24",
          info: "oklch(68% 0.169 237.323)",
          success: "oklch(69% 0.17 162.48)",
          warning: "#fb923c",
          error: "#ee3032",
          neutral: "oklch(0.335 0.008 275)",
        },
        base: {
          base100: "#0f172a",
          base200: "#1e293b",
          base300: "oklch(0.345 0.063 256.8)",
          baseContent: "#f8fafc",
        },
        layout: {
          usePrimaryForLayout: false,
          topbarBg: "#9d2eda",
          topbarText: "#ffffff",
          sidebarBg: "#0f172a",
          sidebarText: "oklch(96% 0.003 264.542)",
        },
        sidebar: {
          hoverBg: "rgba(155, 5, 255, 0.32)",
          activeBg: "rgba(74, 26, 106, 0.15)",
          activeText: "#f0e1fa",
          activeBorder: "#9d2eda",
          openBg: "rgba(142, 45, 226, 0.32)",
          openText: "#f0e1fa",
          activeMark: "#8e2de2",
        },
        link: {
          color: "#fb923c",
          hover: "#fdba74",
          visited: "#a78bfa",
        },
        radius: {
          field: "0.5rem",
          box: "0.5rem",
        },
      },
    }),
  },
];

export function getCodeThemePresetById(id: string): CodeThemePreset | null {
  return codeThemePresets.find((item) => item.id === id) || null;
}
