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
    const a = e.value;
    a && (a.contains(s.target) || n());
  };
  W(() => document.addEventListener("click", t)), I(() => document.removeEventListener("click", t));
}
function G(e, n = {}) {
  const { options: t, fetchOptions: s, debounceMs: a = 250, filterFn: c } = n, f = u(null), r = u(null), v = u(null), l = u(!1), w = u(""), i = u(-1), y = u(!1), g = u(
    Array.isArray(t) ? t : (t == null ? void 0 : t.value) ?? []
  ), L = E(), T = H(
    () => (g.value || []).find((o) => o.value === e.value) ?? null
  ), b = H(() => {
    const o = w.value.trim().toLowerCase(), d = g.value || [];
    if (!o) return d;
    const k = c ?? ((p, D) => p.label.toLowerCase().includes(D));
    return d.filter((p) => k(p, o));
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
    l.value = !0, i.value = -1, O(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.focus();
    });
  }
  function S() {
    l.value = !1, i.value = -1, w.value = "";
  }
  function m(o) {
    o.disabled || (e.value = o.value, S());
  }
  function A() {
    var o;
    e.value = null, w.value = "", (o = r.value) == null || o.focus();
  }
  function x() {
    O(() => {
      const o = v.value;
      if (!o) return;
      const d = o.querySelector(`[data-idx="${i.value}"]`);
      if (!d) return;
      const k = d.offsetTop, p = k + d.offsetHeight;
      k < o.scrollTop ? o.scrollTop = k : p > o.scrollTop + o.clientHeight && (o.scrollTop = p - o.clientHeight);
    });
  }
  function F(o) {
    if (!l.value) {
      ["ArrowDown", "Enter", " "].includes(o.key) && (o.preventDefault(), h());
      return;
    }
    if (o.key === "Escape") {
      o.preventDefault(), S();
      return;
    }
    if (o.key === "ArrowDown" && (o.preventDefault(), i.value = Math.min(i.value + 1, b.value.length - 1), x()), o.key === "ArrowUp" && (o.preventDefault(), i.value = Math.max(i.value - 1, 0), x()), o.key === "Home" && (o.preventDefault(), i.value = 0, x()), o.key === "End" && (o.preventDefault(), i.value = b.value.length - 1, x()), o.key === "Enter") {
      o.preventDefault();
      const d = b.value[i.value];
      d && m(d);
    }
  }
  return t && !Array.isArray(t) && N(t, (o) => g.value = o ?? [], { immediate: !0 }), N(w, () => s && L(M, a)), $(f, S), {
    root: f,
    inputEl: r,
    menu: v,
    open: l,
    query: w,
    hoverIdx: i,
    loading: y,
    localOptions: g,
    filtered: b,
    selected: T,
    openMenu: h,
    closeMenu: S,
    choose: m,
    clear: A,
    onKey: F
  };
}
function _(e, n = {}) {
  const t = G(u(null), n), { localOptions: s } = t, a = H(
    () => (s.value || []).filter(
      (r) => e.value.some((v) => String(v) === String(r.value))
    )
  );
  function c(r) {
    if (e.value.some((l) => String(l) === String(r))) {
      e.value = e.value.filter((l) => String(l) !== String(r));
      return;
    }
    e.value = [...e.value, r];
  }
  function f() {
    e.value = [];
  }
  return { ...t, selectedList: a, toggle: c, clearAll: f };
}
function Q(e = "system") {
  const n = u(e), t = u(!1);
  let s = null;
  const a = () => {
    n.value === "system" ? t.value = (s == null ? void 0 : s.matches) ?? !1 : t.value = n.value === "dark";
    const r = document.documentElement;
    t.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, c = (r) => {
    n.value = r, localStorage.setItem("mitreka-theme", r), a();
  }, f = () => {
    n.value === "light" ? c("dark") : n.value === "dark" ? c("light") : c(t.value ? "light" : "dark");
  };
  return W(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (n.value = r), s = window.matchMedia("(prefers-color-scheme: dark)"), s.addEventListener("change", a), a();
  }), I(() => {
    s == null || s.removeEventListener("change", a);
  }), N(n, a), { mode: n, isDark: t, setTheme: c, toggleTheme: f };
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
  const a = () => {
    const r = e.closest(".agx") ?? e, v = e.querySelector(".ag-root-wrapper") ?? r.querySelector(".ag-root-wrapper"), l = e.querySelector(
      ".ag-center-cols-viewport"
    ) || e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!l) return null;
    const i = e.querySelector(
      ".ag-body-viewport"
    ) ?? v ?? r, y = e.querySelector(
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
      const d = (y == null ? void 0 : y.getBoundingClientRect().width) ?? 0, k = (g == null ? void 0 : g.getBoundingClientRect().width) ?? 0, p = (L == null ? void 0 : L.getBoundingClientRect().height) ?? i.getBoundingClientRect().height;
      i.style.setProperty("--agx-left-shadow-x", `${d}px`), i.style.setProperty("--agx-right-shadow-x", `${k}px`), i.style.setProperty("--agx-shadow-h", `${p}px`);
      const D = F > 0, B = F < o - 1;
      i.classList.toggle("agx-shadow-left", D), i.classList.toggle("agx-shadow-right", B);
    }, h = () => {
      const F = Math.max(
        0,
        l.scrollWidth - l.clientWidth
      ), o = l.scrollLeft;
      M(o, F);
    }, S = () => h();
    l.addEventListener("scroll", S, { passive: !0 });
    const m = new ResizeObserver(h);
    m.observe(l), T && m.observe(T), b && m.observe(b), i && i !== l && m.observe(i);
    const A = new MutationObserver(h);
    T && A.observe(T, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), A.observe(l, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    });
    const x = () => h();
    return window.addEventListener("resize", x, { passive: !0 }), h(), () => {
      l.removeEventListener("scroll", S), window.removeEventListener("resize", x), A.disconnect(), m.disconnect(), i.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  n = a();
  let c = null, f = 0;
  return n || (t = new MutationObserver(() => {
    s || (n = a(), n && t && (t.disconnect(), t = null));
  }), t.observe(e, { childList: !0, subtree: !0 }), c = window.setInterval(() => {
    s || (f += 1, !n && (n = a(), (n || f > 30) && (c && window.clearInterval(c), c = null, t == null || t.disconnect(), t = null)));
  }, 120)), () => {
    s = !0, t == null || t.disconnect(), c && window.clearInterval(c), n == null || n();
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
  const a = getComputedStyle(document.documentElement), c = parseFloat(a.fontSize) || 16, f = q(
    t.getPropertyValue("--ag-font-size"),
    c
  );
  if (Number.isFinite(f)) return f;
  const r = q(
    t.getPropertyValue("--font-size-xs"),
    c
  );
  if (Number.isFinite(r)) return r;
  const v = q(
    a.getPropertyValue("--ag-font-size"),
    c
  );
  if (Number.isFinite(v)) return v;
  const l = q(
    a.getPropertyValue("--font-size-xs"),
    c
  );
  return Number.isFinite(l) ? l : z;
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
