import { ref as b, onMounted as R, onBeforeUnmount as I, watch as V } from "vue";
function J(e = "system") {
  const t = b(e), s = b(!1);
  let o = null;
  const i = () => {
    t.value === "system" ? s.value = (o == null ? void 0 : o.matches) ?? !1 : s.value = t.value === "dark";
    const r = document.documentElement;
    s.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, n = (r) => {
    t.value = r, localStorage.setItem("mitreka-theme", r), i();
  }, l = () => {
    t.value === "light" ? n("dark") : t.value === "dark" ? n("light") : n(s.value ? "light" : "dark");
  };
  return R(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (t.value = r), o = window.matchMedia("(prefers-color-scheme: dark)"), o.addEventListener("change", i), i();
  }), I(() => {
    o == null || o.removeEventListener("change", i);
  }), V(t, i), { mode: t, isDark: s, setTheme: n, toggleTheme: l };
}
const g = b([]), T = b("bottom-right");
let B = 0;
const h = /* @__PURE__ */ new Map(), O = (e, t) => {
  if (!t || t <= 0) return;
  const s = window.setTimeout(() => N(e), t);
  h.set(e, s);
}, N = (e) => {
  const t = h.get(e);
  t && (clearTimeout(t), h.delete(e)), g.value = g.value.filter((s) => s.id !== e);
}, $ = (e) => {
  const t = ++B, s = {
    id: t,
    ...e,
    type: e.type ?? "info",
    variant: e.variant ?? "soft",
    timeout: e.timeout ?? 3e3
  };
  return g.value.push(s), O(t, s.timeout), t;
}, D = () => {
  h.forEach((e) => clearTimeout(e)), h.clear(), g.value = [];
}, G = (e) => {
  T.value = e;
};
function K() {
  return {
    toasts: g,
    toastPosition: T,
    notify: $,
    dismiss: N,
    clearToasts: D,
    setToastPosition: G
  };
}
const U = (e) => {
  let t = null, s = null, o = !1;
  const i = () => {
    const r = e.closest(".agx") ?? e, m = e.querySelector(".ag-root-wrapper") ?? r.querySelector(".ag-root-wrapper"), c = e.querySelector(
      ".ag-center-cols-viewport"
    ) || e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!c) return null;
    const a = e.querySelector(
      ".ag-body-viewport"
    ) ?? m ?? r, y = e.querySelector(
      ".ag-pinned-left-cols-container"
    ), x = e.querySelector(
      ".ag-pinned-right-cols-container"
    ), S = e.querySelector(
      ".ag-center-cols-viewport"
    ), f = e.querySelector(
      ".ag-center-cols-container"
    ), k = e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    ), q = (v, L) => {
      const C = (y == null ? void 0 : y.getBoundingClientRect().width) ?? 0, W = (x == null ? void 0 : x.getBoundingClientRect().width) ?? 0, A = (S == null ? void 0 : S.getBoundingClientRect().height) ?? a.getBoundingClientRect().height;
      a.style.setProperty("--agx-left-shadow-x", `${C}px`), a.style.setProperty("--agx-right-shadow-x", `${W}px`), a.style.setProperty("--agx-shadow-h", `${A}px`);
      const H = v > 0, M = v < L - 1;
      a.classList.toggle("agx-shadow-left", H), a.classList.toggle("agx-shadow-right", M);
    }, u = () => {
      const v = Math.max(
        0,
        c.scrollWidth - c.clientWidth
      ), L = c.scrollLeft;
      q(L, v);
    }, P = () => u();
    c.addEventListener("scroll", P, { passive: !0 });
    const d = new ResizeObserver(u);
    d.observe(c), f && d.observe(f), k && d.observe(k), a && a !== c && d.observe(a);
    const F = new MutationObserver(u);
    f && F.observe(f, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), F.observe(c, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    });
    const z = () => u();
    return window.addEventListener("resize", z, { passive: !0 }), u(), () => {
      c.removeEventListener("scroll", P), window.removeEventListener("resize", z), F.disconnect(), d.disconnect(), a.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  t = i();
  let n = null, l = 0;
  return t || (s = new MutationObserver(() => {
    o || (t = i(), t && s && (s.disconnect(), s = null));
  }), s.observe(e, { childList: !0, subtree: !0 }), n = window.setInterval(() => {
    o || (l += 1, !t && (t = i(), (t || l > 30) && (n && window.clearInterval(n), n = null, s == null || s.disconnect(), s = null)));
  }, 120)), () => {
    o = !0, s == null || s.disconnect(), n && window.clearInterval(n), t == null || t();
  };
}, Y = (e) => {
  var o;
  const t = e == null ? void 0 : e.api, s = ((o = t == null ? void 0 : t.getGui) == null ? void 0 : o.call(t)) ?? null;
  return s ? U(s) : () => {
  };
}, p = 13, w = (e, t) => {
  const s = e.trim();
  if (!s) return NaN;
  if (s.endsWith("px")) return parseFloat(s);
  if (s.endsWith("rem")) return parseFloat(s) * t;
  const o = parseFloat(s);
  return Number.isFinite(o) ? o : NaN;
}, Z = (e) => {
  if (typeof window > "u") return p;
  const t = e ?? document.documentElement;
  if (!t) return p;
  const s = getComputedStyle(t), o = parseFloat(s.fontSize);
  if (Number.isFinite(o)) return o;
  const i = getComputedStyle(document.documentElement), n = parseFloat(i.fontSize) || 16, l = w(
    s.getPropertyValue("--ag-font-size"),
    n
  );
  if (Number.isFinite(l)) return l;
  const r = w(
    s.getPropertyValue("--font-size-xs"),
    n
  );
  if (Number.isFinite(r)) return r;
  const m = w(
    i.getPropertyValue("--ag-font-size"),
    n
  );
  if (Number.isFinite(m)) return m;
  const c = w(
    i.getPropertyValue("--font-size-xs"),
    n
  );
  return Number.isFinite(c) ? c : p;
}, _ = (e, t) => Number.isFinite(e) ? Math.max(20, Math.round(e * (t === "compact" ? 1.7 : t === "spacious" ? 2.8 : 2.2))) : p * 2.2, E = (e) => e === "compact" ? 30 : e === "spacious" ? 52 : 44, Q = (e) => e === "compact" ? 24 : e === "spacious" ? 48 : 40;
export {
  K as a,
  Y as b,
  U as c,
  _ as d,
  E as e,
  Q as f,
  Z as r,
  J as u
};
