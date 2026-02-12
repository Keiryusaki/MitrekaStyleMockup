import { ref as w, onMounted as W, onBeforeUnmount as I, watch as M } from "vue";
function G(o = "system") {
  const t = w(o), e = w(!1);
  let s = null;
  const i = () => {
    t.value === "system" ? e.value = (s == null ? void 0 : s.matches) ?? !1 : e.value = t.value === "dark";
    const r = document.documentElement;
    e.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, n = (r) => {
    t.value = r, localStorage.setItem("mitreka-theme", r), i();
  }, c = () => {
    t.value === "light" ? n("dark") : t.value === "dark" ? n("light") : n(e.value ? "light" : "dark");
  };
  return W(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (t.value = r), s = window.matchMedia("(prefers-color-scheme: dark)"), s.addEventListener("change", i), i();
  }), I(() => {
    s == null || s.removeEventListener("change", i);
  }), M(t, i), { mode: t, isDark: e, setTheme: n, toggleTheme: c };
}
const u = w([]), k = w("bottom-right");
let R = 0;
const d = /* @__PURE__ */ new Map(), A = (o, t) => {
  if (!t || t <= 0) return;
  const e = window.setTimeout(() => P(o), t);
  d.set(o, e);
}, P = (o) => {
  const t = d.get(o);
  t && (clearTimeout(t), d.delete(o)), u.value = u.value.filter((e) => e.id !== o);
}, B = (o) => {
  const t = ++R, e = {
    id: t,
    ...o,
    type: o.type ?? "info",
    variant: o.variant ?? "soft",
    timeout: o.timeout ?? 3e3
  };
  return u.value.push(e), A(t, e.timeout), t;
}, V = () => {
  d.forEach((o) => clearTimeout(o)), d.clear(), u.value = [];
}, H = (o) => {
  k.value = o;
};
function U() {
  return {
    toasts: u,
    toastPosition: k,
    notify: B,
    dismiss: P,
    clearToasts: V,
    setToastPosition: H
  };
}
const $ = (o) => {
  let t = null, e = null, s = !1;
  const i = () => {
    const r = o.closest(".agx") ?? o, g = o.querySelector(".ag-root-wrapper") ?? r.querySelector(".ag-root-wrapper"), a = o.querySelector(
      ".ag-center-cols-viewport"
    ) || o.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!a) return null;
    const l = o.querySelector(
      ".ag-body-viewport"
    ) ?? g ?? r, v = o.querySelector(
      ".ag-pinned-left-cols-container"
    ), p = o.querySelector(
      ".ag-pinned-right-cols-container"
    ), y = o.querySelector(
      ".ag-center-cols-viewport"
    ), T = (h, S) => {
      const L = (v == null ? void 0 : v.getBoundingClientRect().width) ?? 0, N = (p == null ? void 0 : p.getBoundingClientRect().width) ?? 0, z = (y == null ? void 0 : y.getBoundingClientRect().height) ?? l.getBoundingClientRect().height;
      l.style.setProperty("--agx-left-shadow-x", `${L}px`), l.style.setProperty("--agx-right-shadow-x", `${N}px`), l.style.setProperty("--agx-shadow-h", `${z}px`);
      const C = h > 0, q = h < S - 1;
      l.classList.toggle("agx-shadow-left", C), l.classList.toggle("agx-shadow-right", q);
    }, x = () => {
      const h = Math.max(
        0,
        a.scrollWidth - a.clientWidth
      ), S = a.scrollLeft;
      T(S, h);
    }, b = () => x();
    a.addEventListener("scroll", b, { passive: !0 });
    const F = new ResizeObserver(x);
    return F.observe(a), x(), () => {
      a.removeEventListener("scroll", b), F.disconnect(), l.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  t = i();
  let n = null, c = 0;
  return t || (e = new MutationObserver(() => {
    s || (t = i(), t && e && (e.disconnect(), e = null));
  }), e.observe(o, { childList: !0, subtree: !0 }), n = window.setInterval(() => {
    s || (c += 1, !t && (t = i(), (t || c > 30) && (n && window.clearInterval(n), n = null, e == null || e.disconnect(), e = null)));
  }, 120)), () => {
    s = !0, e == null || e.disconnect(), n && window.clearInterval(n), t == null || t();
  };
}, X = (o) => {
  var s;
  const t = o == null ? void 0 : o.api, e = ((s = t == null ? void 0 : t.getGui) == null ? void 0 : s.call(t)) ?? null;
  return e ? $(e) : () => {
  };
}, f = 13, m = (o, t) => {
  const e = o.trim();
  if (!e) return NaN;
  if (e.endsWith("px")) return parseFloat(e);
  if (e.endsWith("rem")) return parseFloat(e) * t;
  const s = parseFloat(e);
  return Number.isFinite(s) ? s : NaN;
}, j = (o) => {
  if (typeof window > "u") return f;
  const t = o ?? document.documentElement;
  if (!t) return f;
  const e = getComputedStyle(t), s = parseFloat(e.fontSize);
  if (Number.isFinite(s)) return s;
  const i = getComputedStyle(document.documentElement), n = parseFloat(i.fontSize) || 16, c = m(
    e.getPropertyValue("--ag-font-size"),
    n
  );
  if (Number.isFinite(c)) return c;
  const r = m(
    e.getPropertyValue("--font-size-xs"),
    n
  );
  if (Number.isFinite(r)) return r;
  const g = m(
    i.getPropertyValue("--ag-font-size"),
    n
  );
  if (Number.isFinite(g)) return g;
  const a = m(
    i.getPropertyValue("--font-size-xs"),
    n
  );
  return Number.isFinite(a) ? a : f;
}, J = (o, t) => Number.isFinite(o) ? Math.max(20, Math.round(o * (t === "compact" ? 1.7 : t === "spacious" ? 2.8 : 2.2))) : f * 2.2;
export {
  U as a,
  X as b,
  $ as c,
  J as d,
  j as r,
  G as u
};
