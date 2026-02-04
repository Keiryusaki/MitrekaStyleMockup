import { themeQuartz as f } from "ag-grid-community";
function e(a = {}) {
  const { dark: o = !1, density: r = "cozy", striped: t = !0 } = a, d = r === "compact" ? 25 : r === "spacious" ? 48 : 40;
  return f.withParams({
    fontFamily: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans"',
    fontSize: 15,
    rowHeight: d,
    headerHeight: 44,
    borderRadius: 12,
    // Colors
    backgroundColor: o ? "#0b1220" : "#ffffff",
    foregroundColor: o ? "#e5e7eb" : "#111827",
    borderColor: o ? "#374151" : "#E5E7EB",
    headerBackgroundColor: o ? "#111827" : "#F8FAFC",
    headerForegroundColor: o ? "#f3f4f6" : "#0F172A",
    rowHoverColor: o ? "#1f2937" : "#F1F5F9",
    selectedRowBackgroundColor: o ? "#0b2c5a" : "#EFF6FF",
    accentColor: o ? "#60a5fa" : "#2563eb",
    inputBackgroundColor: o ? "#0f172a" : "#ffffff",
    inputForegroundColor: o ? "#e5e7eb" : "#111827",
    inputBorderColor: o ? "#64748b" : "#cbd5e1",
    inputFocusBorderColor: o ? "#93c5fd" : "#60a5fa",
    inputPlaceholderColor: o ? "#94a3b8" : "#9ca3af",
    // Striped rows
    oddRowBackgroundColor: t ? o ? "#0d1a33" : "#F3F4F6" : void 0
  });
}
const n = e({ dark: !1 }), c = e({ dark: !0 }), s = { agxTheme: n, agxThemeDark: c, buildAgxTheme: e };
export {
  n as agxTheme,
  c as agxThemeDark,
  e as buildAgxTheme,
  s as default
};
