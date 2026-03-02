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
];

export function getCodeThemePresetById(id: string): CodeThemePreset | null {
  return codeThemePresets.find((item) => item.id === id) || null;
}
