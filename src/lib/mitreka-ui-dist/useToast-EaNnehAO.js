import { ref as c, onMounted as d, onBeforeUnmount as v, watch as f } from "vue";
function L(t = "system") {
  const e = c(t), s = c(!1);
  let a = null;
  const n = () => {
    e.value === "system" ? s.value = (a == null ? void 0 : a.matches) ?? !1 : s.value = e.value === "dark";
    const o = document.documentElement;
    s.value ? (o.classList.add("dark"), o.setAttribute("data-theme", "mitrekadark")) : (o.classList.remove("dark"), o.setAttribute("data-theme", "mitrekalight"));
  }, r = (o) => {
    e.value = o, localStorage.setItem("mitreka-theme", o), n();
  }, h = () => {
    e.value === "light" ? r("dark") : e.value === "dark" ? r("light") : r(s.value ? "light" : "dark");
  };
  return d(() => {
    const o = localStorage.getItem("mitreka-theme");
    o && (e.value = o), a = window.matchMedia("(prefers-color-scheme: dark)"), a.addEventListener("change", n), n();
  }), v(() => {
    a == null || a.removeEventListener("change", n);
  }), f(e, n), { mode: e, isDark: s, setTheme: r, toggleTheme: h };
}
const l = c([]), m = c("bottom-right");
let g = 0;
const i = /* @__PURE__ */ new Map(), k = (t, e) => {
  if (!e || e <= 0) return;
  const s = window.setTimeout(() => u(t), e);
  i.set(t, s);
}, u = (t) => {
  const e = i.get(t);
  e && (clearTimeout(e), i.delete(t)), l.value = l.value.filter((s) => s.id !== t);
}, T = (t) => {
  const e = ++g, s = {
    id: e,
    ...t,
    type: t.type ?? "info",
    variant: t.variant ?? "soft",
    timeout: t.timeout ?? 3e3
  };
  return l.value.push(s), k(e, s.timeout), e;
}, p = () => {
  i.forEach((t) => clearTimeout(t)), i.clear(), l.value = [];
}, w = (t) => {
  m.value = t;
};
function b() {
  return {
    toasts: l,
    toastPosition: m,
    notify: T,
    dismiss: u,
    clearToasts: p,
    setToastPosition: w
  };
}
export {
  b as a,
  L as u
};
