import { onMounted as W, onBeforeUnmount as I, ref as u, computed as H, watch as N, nextTick as O } from "vue";
function E() {
  let e;
  function n(t, s) {
    e && window.clearTimeout(e), e = window.setTimeout(t, s);
  }
  return I(() => e && window.clearTimeout(e)), n;
}
function $(e, n) {
  const t = (s) => {
    const i = e.value;
    i && (i.contains(s.target) || n());
  };
  W(() => document.addEventListener("click", t)), I(() => document.removeEventListener("click", t));
}
function G(e, n = {}) {
  const { options: t, fetchOptions: s, debounceMs: i = 250, filterFn: a } = n, f = u(null), r = u(null), d = u(null), c = u(!1), w = u(""), l = u(-1), y = u(!1), g = u(
    Array.isArray(t) ? t : (t == null ? void 0 : t.value) ?? []
  ), L = E(), T = H(
    () => (g.value || []).find((o) => o.value === e.value) ?? null
  ), b = H(() => {
    const o = w.value.trim().toLowerCase(), v = g.value || [];
    if (!o) return v;
    const k = a ?? ((p, D) => p.label.toLowerCase().includes(D));
    return v.filter((p) => k(p, o));
  });
  async function M() {
    if (s) {
      y.value = !0;
      try {
        const o = await s(w.value);
        g.value = Array.isArray(o) ? o : [];
      } finally {
        y.value = !1;
      }
    }
  }
  function h() {
    c.value = !0, l.value = -1, O(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.focus();
    });
  }
  function x() {
    c.value = !1, l.value = -1, w.value = "";
  }
  function m(o) {
    o.disabled || (e.value = o.value, x());
  }
  function A() {
    var o;
    e.value = null, w.value = "", (o = r.value) == null || o.focus();
  }
  function S() {
    O(() => {
      const o = d.value;
      if (!o) return;
      const v = o.querySelector(`[data-idx="${l.value}"]`);
      if (!v) return;
      const k = v.offsetTop, p = k + v.offsetHeight;
      k < o.scrollTop ? o.scrollTop = k : p > o.scrollTop + o.clientHeight && (o.scrollTop = p - o.clientHeight);
    });
  }
  function F(o) {
    if (!c.value) {
      ["ArrowDown", "Enter", " "].includes(o.key) && (o.preventDefault(), h());
      return;
    }
    if (o.key === "Escape") {
      o.preventDefault(), x();
      return;
    }
    if (o.key === "ArrowDown" && (o.preventDefault(), l.value = Math.min(l.value + 1, b.value.length - 1), S()), o.key === "ArrowUp" && (o.preventDefault(), l.value = Math.max(l.value - 1, 0), S()), o.key === "Home" && (o.preventDefault(), l.value = 0, S()), o.key === "End" && (o.preventDefault(), l.value = b.value.length - 1, S()), o.key === "Enter") {
      o.preventDefault();
      const v = b.value[l.value];
      v && m(v);
    }
  }
  return t && !Array.isArray(t) && N(t, (o) => g.value = o ?? [], { immediate: !0 }), N(w, () => s && L(M, i)), $(f, x), {
    root: f,
    inputEl: r,
    menu: d,
    open: c,
    query: w,
    hoverIdx: l,
    loading: y,
    localOptions: g,
    filtered: b,
    selected: T,
    openMenu: h,
    closeMenu: x,
    choose: m,
    clear: A,
    onKey: F
  };
}
function _(e, n = {}) {
  const t = G(u(null), n), { localOptions: s } = t, i = H(
    () => (s.value || []).filter((r) => e.value.includes(r.value))
  );
  function a(r) {
    const d = new Set(e.value);
    d.has(r) ? d.delete(r) : d.add(r), e.value = Array.from(d);
  }
  function f() {
    e.value = [];
  }
  return { ...t, selectedList: i, toggle: a, clearAll: f };
}
function Q(e = "system") {
  const n = u(e), t = u(!1);
  let s = null;
  const i = () => {
    n.value === "system" ? t.value = (s == null ? void 0 : s.matches) ?? !1 : t.value = n.value === "dark";
    const r = document.documentElement;
    t.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, a = (r) => {
    n.value = r, localStorage.setItem("mitreka-theme", r), i();
  }, f = () => {
    n.value === "light" ? a("dark") : n.value === "dark" ? a("light") : a(t.value ? "light" : "dark");
  };
  return W(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (n.value = r), s = window.matchMedia("(prefers-color-scheme: dark)"), s.addEventListener("change", i), i();
  }), I(() => {
    s == null || s.removeEventListener("change", i);
  }), N(n, i), { mode: n, isDark: t, setTheme: a, toggleTheme: f };
}
const C = u([]), R = u("bottom-right");
let U = 0;
const P = /* @__PURE__ */ new Map(), K = (e, n) => {
  if (!n || n <= 0) return;
  const t = window.setTimeout(() => V(e), n);
  P.set(e, t);
}, V = (e) => {
  const n = P.get(e);
  n && (clearTimeout(n), P.delete(e)), C.value = C.value.filter((t) => t.id !== e);
}, X = (e) => {
  const n = ++U, t = {
    id: n,
    ...e,
    type: e.type ?? "info",
    variant: e.variant ?? "soft",
    timeout: e.timeout ?? 3e3
  };
  return C.value.push(t), K(n, t.timeout), n;
}, j = () => {
  P.forEach((e) => clearTimeout(e)), P.clear(), C.value = [];
}, J = (e) => {
  R.value = e;
};
function ee() {
  return {
    toasts: C,
    toastPosition: R,
    notify: X,
    dismiss: V,
    clearToasts: j,
    setToastPosition: J
  };
}
const Y = (e) => {
  let n = null, t = null, s = !1;
  const i = () => {
    const r = e.closest(".agx") ?? e, d = e.querySelector(".ag-root-wrapper") ?? r.querySelector(".ag-root-wrapper"), c = e.querySelector(
      ".ag-center-cols-viewport"
    ) || e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!c) return null;
    const l = e.querySelector(
      ".ag-body-viewport"
    ) ?? d ?? r, y = e.querySelector(
      ".ag-pinned-left-cols-container"
    ), g = e.querySelector(
      ".ag-pinned-right-cols-container"
    ), L = e.querySelector(
      ".ag-center-cols-viewport"
    ), T = e.querySelector(
      ".ag-center-cols-container"
    ), b = e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    ), M = (F, o) => {
      const v = (y == null ? void 0 : y.getBoundingClientRect().width) ?? 0, k = (g == null ? void 0 : g.getBoundingClientRect().width) ?? 0, p = (L == null ? void 0 : L.getBoundingClientRect().height) ?? l.getBoundingClientRect().height;
      l.style.setProperty("--agx-left-shadow-x", `${v}px`), l.style.setProperty("--agx-right-shadow-x", `${k}px`), l.style.setProperty("--agx-shadow-h", `${p}px`);
      const D = F > 0, B = F < o - 1;
      l.classList.toggle("agx-shadow-left", D), l.classList.toggle("agx-shadow-right", B);
    }, h = () => {
      const F = Math.max(
        0,
        c.scrollWidth - c.clientWidth
      ), o = c.scrollLeft;
      M(o, F);
    }, x = () => h();
    c.addEventListener("scroll", x, { passive: !0 });
    const m = new ResizeObserver(h);
    m.observe(c), T && m.observe(T), b && m.observe(b), l && l !== c && m.observe(l);
    const A = new MutationObserver(h);
    T && A.observe(T, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), A.observe(c, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    });
    const S = () => h();
    return window.addEventListener("resize", S, { passive: !0 }), h(), () => {
      c.removeEventListener("scroll", x), window.removeEventListener("resize", S), A.disconnect(), m.disconnect(), l.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  n = i();
  let a = null, f = 0;
  return n || (t = new MutationObserver(() => {
    s || (n = i(), n && t && (t.disconnect(), t = null));
  }), t.observe(e, { childList: !0, subtree: !0 }), a = window.setInterval(() => {
    s || (f += 1, !n && (n = i(), (n || f > 30) && (a && window.clearInterval(a), a = null, t == null || t.disconnect(), t = null)));
  }, 120)), () => {
    s = !0, t == null || t.disconnect(), a && window.clearInterval(a), n == null || n();
  };
}, te = (e) => {
  var s;
  const n = e == null ? void 0 : e.api, t = ((s = n == null ? void 0 : n.getGui) == null ? void 0 : s.call(n)) ?? null;
  return t ? Y(t) : () => {
  };
}, z = 13, q = (e, n) => {
  const t = e.trim();
  if (!t) return NaN;
  if (t.endsWith("px")) return parseFloat(t);
  if (t.endsWith("rem")) return parseFloat(t) * n;
  const s = parseFloat(t);
  return Number.isFinite(s) ? s : NaN;
}, ne = (e) => {
  if (typeof window > "u") return z;
  const n = e ?? document.documentElement;
  if (!n) return z;
  const t = getComputedStyle(n), s = parseFloat(t.fontSize);
  if (Number.isFinite(s)) return s;
  const i = getComputedStyle(document.documentElement), a = parseFloat(i.fontSize) || 16, f = q(
    t.getPropertyValue("--ag-font-size"),
    a
  );
  if (Number.isFinite(f)) return f;
  const r = q(
    t.getPropertyValue("--font-size-xs"),
    a
  );
  if (Number.isFinite(r)) return r;
  const d = q(
    i.getPropertyValue("--ag-font-size"),
    a
  );
  if (Number.isFinite(d)) return d;
  const c = q(
    i.getPropertyValue("--font-size-xs"),
    a
  );
  return Number.isFinite(c) ? c : z;
}, oe = (e, n) => Number.isFinite(e) ? Math.max(20, Math.round(e * (n === "compact" ? 1.7 : n === "spacious" ? 2.8 : 2.2))) : z * 2.2, se = (e) => e === "compact" ? 30 : e === "spacious" ? 52 : 44, re = (e) => e === "compact" ? 24 : e === "spacious" ? 48 : 40;
export {
  G as a,
  _ as b,
  Q as c,
  ee as d,
  te as e,
  Y as f,
  oe as g,
  se as h,
  re as i,
  ne as r,
  $ as u
};
