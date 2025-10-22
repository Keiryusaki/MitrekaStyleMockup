// agTheme.ts (v2.4)
// Theming API helpers for AG Grid v33+
// Import and pass to <AgGridVue :theme="agxTheme"> (or agxThemeDark)
import { themeQuartz } from "ag-grid-community";

export const agxTheme = themeQuartz.withParams({
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans"',
  fontSize: 16,
  headerHeight: 56,
  rowHeight: 46,
  borderRadius: 12,

  backgroundColor: "#ffffff",
  foregroundColor: "#111827",
  borderColor: "#E5E7EB",
  headerBackgroundColor: "#F8FAFC",
  headerForegroundColor: "#0F172A",
  oddRowBackgroundColor: "#FCFCFD",
  rowHoverColor: "#F1F5F9",
  selectedRowBackgroundColor: "#EFF6FF",
  accentColor: "#2563eb",
});

export const agxThemeDark = themeQuartz.withParams({
  colorScheme: "dark",
  fontFamily:
    'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans"',
  fontSize: 16,
  headerHeight: 56,
  rowHeight: 46,
  borderRadius: 12,

  backgroundColor: "#0b1220", // dark surface
  foregroundColor: "#e5e7eb",
  borderColor: "#374151",
  headerBackgroundColor: "#111827",
  headerForegroundColor: "#f3f4f6",
  oddRowBackgroundColor: "#0f172a",
  rowHoverColor: "#1f2937",
  selectedRowBackgroundColor: "#0b2c5a",
  accentColor: "#60a5fa",
});
