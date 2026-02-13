import { ref as p, onMounted as A, onBeforeUnmount as H, watch as W } from "vue";
function O(t = "system") {
  const e = p(t), o = p(!1);
  let s = null;
  const a = () => {
    e.value === "system" ? o.value = (s == null ? void 0 : s.matches) ?? !1 : o.value = e.value === "dark";
    const r = document.documentElement;
    o.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, n = (r) => {
    e.value = r, localStorage.setItem("mitreka-theme", r), a();
  }, i = () => {
    e.value === "light" ? n("dark") : e.value === "dark" ? n("light") : n(o.value ? "light" : "dark");
  };
  return A(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (e.value = r), s = window.matchMedia("(prefers-color-scheme: dark)"), s.addEventListener("change", a), a();
  }), H(() => {
    s == null || s.removeEventListener("change", a);
  }), W(e, a), { mode: e, isDark: o, setTheme: n, toggleTheme: i };
}
const u = p([]), k = p("bottom-right");
let I = 0;
const d = /* @__PURE__ */ new Map(), M = (t, e) => {
  if (!e || e <= 0) return;
  const o = window.setTimeout(() => P(t), e);
  d.set(t, o);
}, P = (t) => {
  const e = d.get(t);
  e && (clearTimeout(e), d.delete(t)), u.value = u.value.filter((o) => o.id !== t);
}, R = (t) => {
  const e = ++I, o = {
    id: e,
    ...t,
    type: t.type ?? "info",
    variant: t.variant ?? "soft",
    timeout: t.timeout ?? 3e3
  };
  return u.value.push(o), M(e, o.timeout), e;
}, B = () => {
  d.forEach((t) => clearTimeout(t)), d.clear(), u.value = [];
}, V = (t) => {
  k.value = t;
};
function U() {
  return {
    toasts: u,
    toastPosition: k,
    notify: R,
    dismiss: P,
    clearToasts: B,
    setToastPosition: V
  };
}
const $ = (t) => {
  let e = null, o = null, s = !1;
  const a = () => {
    const r = t.closest(".agx") ?? t, g = t.querySelector(".ag-root-wrapper") ?? r.querySelector(".ag-root-wrapper"), c = t.querySelector(
      ".ag-center-cols-viewport"
    ) || t.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!c) return null;
    const l = t.querySelector(
      ".ag-body-viewport"
    ) ?? g ?? r, w = t.querySelector(
      ".ag-pinned-left-cols-container"
    ), v = t.querySelector(
      ".ag-pinned-right-cols-container"
    ), y = t.querySelector(
      ".ag-center-cols-viewport"
    ), T = (h, S) => {
      const L = (w == null ? void 0 : w.getBoundingClientRect().width) ?? 0, N = (v == null ? void 0 : v.getBoundingClientRect().width) ?? 0, z = (y == null ? void 0 : y.getBoundingClientRect().height) ?? l.getBoundingClientRect().height;
      l.style.setProperty("--agx-left-shadow-x", `${L}px`), l.style.setProperty("--agx-right-shadow-x", `${N}px`), l.style.setProperty("--agx-shadow-h", `${z}px`);
      const C = h > 0, q = h < S - 1;
      l.classList.toggle("agx-shadow-left", C), l.classList.toggle("agx-shadow-right", q);
    }, x = () => {
      const h = Math.max(
        0,
        c.scrollWidth - c.clientWidth
      ), S = c.scrollLeft;
      T(S, h);
    }, b = () => x();
    c.addEventListener("scroll", b, { passive: !0 });
    const F = new ResizeObserver(x);
    return F.observe(c), x(), () => {
      c.removeEventListener("scroll", b), F.disconnect(), l.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  e = a();
  let n = null, i = 0;
  return e || (o = new MutationObserver(() => {
    s || (e = a(), e && o && (o.disconnect(), o = null));
  }), o.observe(t, { childList: !0, subtree: !0 }), n = window.setInterval(() => {
    s || (i += 1, !e && (e = a(), (e || i > 30) && (n && window.clearInterval(n), n = null, o == null || o.disconnect(), o = null)));
  }, 120)), () => {
    s = !0, o == null || o.disconnect(), n && window.clearInterval(n), e == null || e();
  };
}, X = (t) => {
  var s;
  const e = t == null ? void 0 : t.api, o = ((s = e == null ? void 0 : e.getGui) == null ? void 0 : s.call(e)) ?? null;
  return o ? $(o) : () => {
  };
}, f = 13, m = (t, e) => {
  const o = t.trim();
  if (!o) return NaN;
  if (o.endsWith("px")) return parseFloat(o);
  if (o.endsWith("rem")) return parseFloat(o) * e;
  const s = parseFloat(o);
  return Number.isFinite(s) ? s : NaN;
}, j = (t) => {
  if (typeof window > "u") return f;
  const e = t ?? document.documentElement;
  if (!e) return f;
  const o = getComputedStyle(e), s = parseFloat(o.fontSize);
  if (Number.isFinite(s)) return s;
  const a = getComputedStyle(document.documentElement), n = parseFloat(a.fontSize) || 16, i = m(
    o.getPropertyValue("--ag-font-size"),
    n
  );
  if (Number.isFinite(i)) return i;
  const r = m(
    o.getPropertyValue("--font-size-xs"),
    n
  );
  if (Number.isFinite(r)) return r;
  const g = m(
    a.getPropertyValue("--ag-font-size"),
    n
  );
  if (Number.isFinite(g)) return g;
  const c = m(
    a.getPropertyValue("--font-size-xs"),
    n
  );
  return Number.isFinite(c) ? c : f;
}, J = (t, e) => Number.isFinite(t) ? Math.max(20, Math.round(t * (e === "compact" ? 1.7 : e === "spacious" ? 2.8 : 2.2))) : f * 2.2, K = (t) => t === "compact" ? 30 : t === "spacious" ? 52 : 44, Y = (t) => t === "compact" ? 24 : t === "spacious" ? 48 : 40;
export {
  U as a,
  X as b,
  $ as c,
  J as d,
  K as e,
  Y as f,
  j as r,
  O as u
};
