import { onMounted as O, onBeforeUnmount as R, ref as v, computed as N, watch as V, nextTick as W } from "vue";
function E() {
  let e;
  function t(n, s) {
    e && window.clearTimeout(e), e = window.setTimeout(n, s);
  }
  return R(() => e && window.clearTimeout(e)), t;
}
function G(e, t, n = []) {
  const s = (a) => {
    var r;
    const l = a.target, d = e.value;
    if (d && !d.contains(l)) {
      for (const c of n)
        if ((r = c.value) != null && r.contains(l)) return;
      t();
    }
  };
  O(() => document.addEventListener("click", s)), R(() => document.removeEventListener("click", s));
}
function U(e, t = {}) {
  const { options: n, fetchOptions: s, debounceMs: a = 250, filterFn: l } = t, d = v(null), r = v(null), c = v(null), f = v(null), u = v(!1), h = v(""), i = v(-1), b = v(!1), m = v(
    Array.isArray(n) ? n : (n == null ? void 0 : n.value) ?? []
  ), A = E(), T = N(
    () => (m.value || []).find((o) => o.value === e.value) ?? null
  ), S = N(() => {
    const o = h.value.trim().toLowerCase(), g = m.value || [];
    if (!o) return g;
    const F = l ?? ((y, H) => y.label.toLowerCase().includes(H));
    return g.filter((y) => F(y, o));
  });
  async function D() {
    if (s) {
      b.value = !0;
      try {
        const o = await s(h.value);
        m.value = Array.isArray(o) ? o : [];
      } finally {
        b.value = !1;
      }
    }
  }
  function p() {
    u.value = !0, i.value = -1, W(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.focus();
    });
  }
  function x() {
    u.value = !1, i.value = -1, h.value = "";
  }
  function w(o) {
    o.disabled || (e.value = o.value, x());
  }
  function q() {
    var o;
    e.value = null, h.value = "", (o = r.value) == null || o.focus();
  }
  function k() {
    W(() => {
      const o = c.value;
      if (!o) return;
      const g = o.querySelector(`[data-idx="${i.value}"]`);
      if (!g) return;
      const F = g.offsetTop, y = F + g.offsetHeight;
      F < o.scrollTop ? o.scrollTop = F : y > o.scrollTop + o.clientHeight && (o.scrollTop = y - o.clientHeight);
    });
  }
  function L(o) {
    if (!u.value) {
      ["ArrowDown", "Enter", " "].includes(o.key) && (o.preventDefault(), p());
      return;
    }
    if (o.key === "Escape") {
      o.preventDefault(), x();
      return;
    }
    if (o.key === "ArrowDown" && (o.preventDefault(), i.value = Math.min(i.value + 1, S.value.length - 1), k()), o.key === "ArrowUp" && (o.preventDefault(), i.value = Math.max(i.value - 1, 0), k()), o.key === "Home" && (o.preventDefault(), i.value = 0, k()), o.key === "End" && (o.preventDefault(), i.value = S.value.length - 1, k()), o.key === "Enter") {
      o.preventDefault();
      const g = S.value[i.value];
      g && w(g);
    }
  }
  return n && !Array.isArray(n) && V(n, (o) => m.value = o ?? [], { immediate: !0 }), V(h, () => s && A(D, a)), G(d, x, [c, f]), {
    root: d,
    inputEl: r,
    menu: c,
    floating: f,
    open: u,
    query: h,
    hoverIdx: i,
    loading: b,
    localOptions: m,
    filtered: S,
    selected: T,
    openMenu: p,
    closeMenu: x,
    choose: w,
    clear: q,
    onKey: L
  };
}
function Q(e, t = {}) {
  const n = U(v(null), t), { localOptions: s } = n, a = (c, f) => String(c) === String(f), l = N(
    () => (s.value || []).filter(
      (c) => (e.value || []).some((f) => a(f, c.value))
    )
  );
  function d(c) {
    const f = [...e.value || []], u = f.findIndex((h) => a(h, c));
    u > -1 ? f.splice(u, 1) : f.push(c), e.value = f;
  }
  function r() {
    e.value = [];
  }
  return { ...n, selectedList: l, toggle: d, clearAll: r };
}
function ee(e = "system") {
  const t = v(e), n = v(!1);
  let s = null;
  const a = () => {
    t.value === "system" ? n.value = (s == null ? void 0 : s.matches) ?? !1 : n.value = t.value === "dark";
    const r = document.documentElement;
    n.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, l = (r) => {
    t.value = r, localStorage.setItem("mitreka-theme", r), a();
  }, d = () => {
    t.value === "light" ? l("dark") : t.value === "dark" ? l("light") : l(n.value ? "light" : "dark");
  };
  return O(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (t.value = r), s = window.matchMedia("(prefers-color-scheme: dark)"), s.addEventListener("change", a), a();
  }), R(() => {
    s == null || s.removeEventListener("change", a);
  }), V(t, a), { mode: t, isDark: n, setTheme: l, toggleTheme: d };
}
const z = v([]), I = v("bottom-right");
let K = 0;
const M = /* @__PURE__ */ new Map(), X = (e, t) => {
  if (!t || t <= 0) return;
  const n = window.setTimeout(() => B(e), t);
  M.set(e, n);
}, B = (e) => {
  const t = M.get(e);
  t && (clearTimeout(t), M.delete(e)), z.value = z.value.filter((n) => n.id !== e);
}, j = (e) => {
  const t = ++K, n = {
    id: t,
    ...e,
    type: e.type ?? "info",
    variant: e.variant ?? "soft",
    timeout: e.timeout ?? 3e3
  };
  return z.value.push(n), X(t, n.timeout), t;
}, J = () => {
  M.forEach((e) => clearTimeout(e)), M.clear(), z.value = [];
}, Y = (e) => {
  I.value = e;
};
function te() {
  return {
    toasts: z,
    toastPosition: I,
    notify: j,
    dismiss: B,
    clearToasts: J,
    setToastPosition: Y
  };
}
const Z = (e) => {
  let t = null, n = null, s = !1, a = !1;
  const l = () => {
    const c = e.closest(".agx") ?? e, f = e.querySelector(".ag-root-wrapper") ?? c.querySelector(".ag-root-wrapper"), u = e.querySelector(
      ".ag-center-cols-viewport"
    ) || e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!u) return null;
    const i = e.querySelector(
      ".ag-body-viewport"
    ) ?? f ?? c, b = e.querySelector(
      ".ag-pinned-left-cols-container"
    ), m = e.querySelector(
      ".ag-pinned-right-cols-container"
    ), A = e.querySelector(
      ".ag-center-cols-viewport"
    ), T = e.querySelector(
      ".ag-center-cols-container"
    ), S = e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    ), D = (L, o) => {
      const g = (b == null ? void 0 : b.getBoundingClientRect().width) ?? 0, F = (m == null ? void 0 : m.getBoundingClientRect().width) ?? 0, y = (A == null ? void 0 : A.getBoundingClientRect().height) ?? i.getBoundingClientRect().height;
      i.style.setProperty("--agx-left-shadow-x", `${g}px`), i.style.setProperty("--agx-right-shadow-x", `${F}px`), i.style.setProperty("--agx-shadow-h", `${y}px`);
      const H = L > 0, $ = L < o - 1;
      i.classList.toggle("agx-shadow-left", H), i.classList.toggle("agx-shadow-right", $);
    }, p = () => {
      if (!u.isConnected || !i.isConnected) return;
      const L = Math.max(
        0,
        u.scrollWidth - u.clientWidth
      ), o = u.scrollLeft;
      D(o, L);
    }, x = () => p();
    u.addEventListener("scroll", x, { passive: !0 });
    const w = new ResizeObserver(p);
    w.observe(u), T && w.observe(T), S && w.observe(S), i && i !== u && w.observe(i);
    const q = new MutationObserver(() => {
      p();
    });
    T && q.observe(T, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), q.observe(u, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    });
    const k = () => p();
    return window.addEventListener("resize", k, { passive: !0 }), p(), () => {
      u.removeEventListener("scroll", x), window.removeEventListener("resize", k), q.disconnect(), w.disconnect(), i.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  }, d = () => {
    s || (t == null || t(), t = l());
  }, r = () => {
    s || a || (a = !0, requestAnimationFrame(() => {
      a = !1, d();
    }));
  };
  return d(), n = new MutationObserver(() => {
    if (s) return;
    const c = e.querySelector(".ag-center-cols-viewport") || e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!c || !c.isConnected) {
      r();
      return;
    }
    r();
  }), n.observe(e, {
    childList: !0,
    subtree: !0
  }), () => {
    s = !0, n == null || n.disconnect(), t == null || t();
  };
}, ne = (e) => {
  var s;
  const t = e == null ? void 0 : e.api, n = ((s = t == null ? void 0 : t.getGui) == null ? void 0 : s.call(t)) ?? null;
  return n ? Z(n) : () => {
  };
}, C = 13, P = (e, t) => {
  const n = e.trim();
  if (!n) return NaN;
  if (n.endsWith("px")) return parseFloat(n);
  if (n.endsWith("rem")) return parseFloat(n) * t;
  const s = parseFloat(n);
  return Number.isFinite(s) ? s : NaN;
}, oe = (e) => {
  if (typeof window > "u") return C;
  const t = e ?? document.documentElement;
  if (!t) return C;
  const n = getComputedStyle(t), s = parseFloat(n.fontSize);
  if (Number.isFinite(s)) return s;
  const a = getComputedStyle(document.documentElement), l = parseFloat(a.fontSize) || 16, d = P(
    n.getPropertyValue("--ag-font-size"),
    l
  );
  if (Number.isFinite(d)) return d;
  const r = P(
    n.getPropertyValue("--font-size-xs"),
    l
  );
  if (Number.isFinite(r)) return r;
  const c = P(
    a.getPropertyValue("--ag-font-size"),
    l
  );
  if (Number.isFinite(c)) return c;
  const f = P(
    a.getPropertyValue("--font-size-xs"),
    l
  );
  return Number.isFinite(f) ? f : C;
}, se = (e, t) => Number.isFinite(e) ? Math.max(20, Math.round(e * (t === "compact" ? 1.7 : t === "spacious" ? 2.8 : 2.2))) : C * 2.2, re = (e) => e === "compact" ? 30 : e === "spacious" ? 52 : 44, ie = (e) => e === "compact" ? 24 : e === "spacious" ? 48 : 40;
export {
  U as a,
  Q as b,
  ee as c,
  te as d,
  ne as e,
  Z as f,
  se as g,
  re as h,
  ie as i,
  oe as r,
  G as u
};
