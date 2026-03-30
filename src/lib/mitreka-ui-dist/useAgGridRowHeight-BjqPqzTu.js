import { onMounted as W, onBeforeUnmount as O, ref as v, computed as N, watch as I, nextTick as V } from "vue";
function E() {
  let e;
  function n(t, s) {
    e && window.clearTimeout(e), e = window.setTimeout(t, s);
  }
  return O(() => e && window.clearTimeout(e)), n;
}
function $(e, n, t = []) {
  const s = (a) => {
    var r;
    const i = a.target, f = e.value;
    if (f && !f.contains(i)) {
      for (const u of t)
        if ((r = u.value) != null && r.contains(i)) return;
      n();
    }
  };
  W(() => document.addEventListener("click", s)), O(() => document.removeEventListener("click", s));
}
function G(e, n = {}) {
  const { options: t, fetchOptions: s, debounceMs: a = 250, filterFn: i } = n, f = v(null), r = v(null), u = v(null), l = v(null), w = v(!1), c = v(""), d = v(-1), b = v(!1), m = v(
    Array.isArray(t) ? t : (t == null ? void 0 : t.value) ?? []
  ), k = E(), P = N(
    () => (m.value || []).find((o) => o.value === e.value) ?? null
  ), T = N(() => {
    const o = c.value.trim().toLowerCase(), g = m.value || [];
    if (!o) return g;
    const S = i ?? ((y, H) => y.label.toLowerCase().includes(H));
    return g.filter((y) => S(y, o));
  });
  async function x() {
    if (s) {
      b.value = !0;
      try {
        const o = await s(c.value);
        m.value = Array.isArray(o) ? o : [];
      } finally {
        b.value = !1;
      }
    }
  }
  function L() {
    w.value = !0, d.value = -1, V(() => {
      var o;
      return (o = r.value) == null ? void 0 : o.focus();
    });
  }
  function h() {
    w.value = !1, d.value = -1, c.value = "";
  }
  function F(o) {
    o.disabled || (e.value = o.value, h());
  }
  function q() {
    var o;
    e.value = null, c.value = "", (o = r.value) == null || o.focus();
  }
  function p() {
    V(() => {
      const o = u.value;
      if (!o) return;
      const g = o.querySelector(`[data-idx="${d.value}"]`);
      if (!g) return;
      const S = g.offsetTop, y = S + g.offsetHeight;
      S < o.scrollTop ? o.scrollTop = S : y > o.scrollTop + o.clientHeight && (o.scrollTop = y - o.clientHeight);
    });
  }
  function A(o) {
    if (!w.value) {
      ["ArrowDown", "Enter", " "].includes(o.key) && (o.preventDefault(), L());
      return;
    }
    if (o.key === "Escape") {
      o.preventDefault(), h();
      return;
    }
    if (o.key === "ArrowDown" && (o.preventDefault(), d.value = Math.min(d.value + 1, T.value.length - 1), p()), o.key === "ArrowUp" && (o.preventDefault(), d.value = Math.max(d.value - 1, 0), p()), o.key === "Home" && (o.preventDefault(), d.value = 0, p()), o.key === "End" && (o.preventDefault(), d.value = T.value.length - 1, p()), o.key === "Enter") {
      o.preventDefault();
      const g = T.value[d.value];
      g && F(g);
    }
  }
  return t && !Array.isArray(t) && I(t, (o) => m.value = o ?? [], { immediate: !0 }), I(c, () => s && k(x, a)), $(f, h, [u, l]), {
    root: f,
    inputEl: r,
    menu: u,
    floating: l,
    open: w,
    query: c,
    hoverIdx: d,
    loading: b,
    localOptions: m,
    filtered: T,
    selected: P,
    openMenu: L,
    closeMenu: h,
    choose: F,
    clear: q,
    onKey: A
  };
}
function _(e, n = {}) {
  const t = G(v(null), n), { localOptions: s } = t, a = (u, l) => String(u) === String(l), i = N(
    () => (s.value || []).filter(
      (u) => (e.value || []).some((l) => a(l, u.value))
    )
  );
  function f(u) {
    const l = [...e.value || []], w = l.findIndex((c) => a(c, u));
    w > -1 ? l.splice(w, 1) : l.push(u), e.value = l;
  }
  function r() {
    e.value = [];
  }
  return { ...t, selectedList: i, toggle: f, clearAll: r };
}
function Q(e = "system") {
  const n = v(e), t = v(!1);
  let s = null;
  const a = () => {
    n.value === "system" ? t.value = (s == null ? void 0 : s.matches) ?? !1 : t.value = n.value === "dark";
    const r = document.documentElement;
    t.value ? (r.classList.add("dark"), r.setAttribute("data-theme", "mitrekadark")) : (r.classList.remove("dark"), r.setAttribute("data-theme", "mitrekalight"));
  }, i = (r) => {
    n.value = r, localStorage.setItem("mitreka-theme", r), a();
  }, f = () => {
    n.value === "light" ? i("dark") : n.value === "dark" ? i("light") : i(t.value ? "light" : "dark");
  };
  return W(() => {
    const r = localStorage.getItem("mitreka-theme");
    r && (n.value = r), s = window.matchMedia("(prefers-color-scheme: dark)"), s.addEventListener("change", a), a();
  }), O(() => {
    s == null || s.removeEventListener("change", a);
  }), I(n, a), { mode: n, isDark: t, setTheme: i, toggleTheme: f };
}
const C = v([]), R = v("bottom-right");
let U = 0;
const M = /* @__PURE__ */ new Map(), K = (e, n) => {
  if (!n || n <= 0) return;
  const t = window.setTimeout(() => B(e), n);
  M.set(e, t);
}, B = (e) => {
  const n = M.get(e);
  n && (clearTimeout(n), M.delete(e)), C.value = C.value.filter((t) => t.id !== e);
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
  M.forEach((e) => clearTimeout(e)), M.clear(), C.value = [];
}, J = (e) => {
  R.value = e;
};
function ee() {
  return {
    toasts: C,
    toastPosition: R,
    notify: X,
    dismiss: B,
    clearToasts: j,
    setToastPosition: J
  };
}
const Y = (e) => {
  let n = null, t = null, s = !1;
  const a = () => {
    const r = e.closest(".agx") ?? e, u = e.querySelector(".ag-root-wrapper") ?? r.querySelector(".ag-root-wrapper"), l = e.querySelector(
      ".ag-center-cols-viewport"
    ) || e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!l) return null;
    const c = e.querySelector(
      ".ag-body-viewport"
    ) ?? u ?? r, d = e.querySelector(
      ".ag-pinned-left-cols-container"
    ), b = e.querySelector(
      ".ag-pinned-right-cols-container"
    ), m = e.querySelector(
      ".ag-center-cols-viewport"
    ), k = e.querySelector(
      ".ag-center-cols-container"
    ), P = e.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    ), T = (p, A) => {
      const o = (d == null ? void 0 : d.getBoundingClientRect().width) ?? 0, g = (b == null ? void 0 : b.getBoundingClientRect().width) ?? 0, S = (m == null ? void 0 : m.getBoundingClientRect().height) ?? c.getBoundingClientRect().height;
      c.style.setProperty("--agx-left-shadow-x", `${o}px`), c.style.setProperty("--agx-right-shadow-x", `${g}px`), c.style.setProperty("--agx-shadow-h", `${S}px`);
      const y = p > 0, H = p < A - 1;
      c.classList.toggle("agx-shadow-left", y), c.classList.toggle("agx-shadow-right", H);
    }, x = () => {
      const p = Math.max(
        0,
        l.scrollWidth - l.clientWidth
      ), A = l.scrollLeft;
      T(A, p);
    }, L = () => x();
    l.addEventListener("scroll", L, { passive: !0 });
    const h = new ResizeObserver(x);
    h.observe(l), k && h.observe(k), P && h.observe(P), c && c !== l && h.observe(c);
    const F = new MutationObserver(x);
    k && F.observe(k, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    }), F.observe(l, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeFilter: ["style", "class"]
    });
    const q = () => x();
    return window.addEventListener("resize", q, { passive: !0 }), x(), () => {
      l.removeEventListener("scroll", L), window.removeEventListener("resize", q), F.disconnect(), h.disconnect(), c.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  n = a();
  let i = null, f = 0;
  return n || (t = new MutationObserver(() => {
    s || (n = a(), n && t && (t.disconnect(), t = null));
  }), t.observe(e, { childList: !0, subtree: !0 }), i = window.setInterval(() => {
    s || (f += 1, !n && (n = a(), (n || f > 30) && (i && window.clearInterval(i), i = null, t == null || t.disconnect(), t = null)));
  }, 120)), () => {
    s = !0, t == null || t.disconnect(), i && window.clearInterval(i), n == null || n();
  };
}, te = (e) => {
  var s;
  const n = e == null ? void 0 : e.api, t = ((s = n == null ? void 0 : n.getGui) == null ? void 0 : s.call(n)) ?? null;
  return t ? Y(t) : () => {
  };
}, D = 13, z = (e, n) => {
  const t = e.trim();
  if (!t) return NaN;
  if (t.endsWith("px")) return parseFloat(t);
  if (t.endsWith("rem")) return parseFloat(t) * n;
  const s = parseFloat(t);
  return Number.isFinite(s) ? s : NaN;
}, ne = (e) => {
  if (typeof window > "u") return D;
  const n = e ?? document.documentElement;
  if (!n) return D;
  const t = getComputedStyle(n), s = parseFloat(t.fontSize);
  if (Number.isFinite(s)) return s;
  const a = getComputedStyle(document.documentElement), i = parseFloat(a.fontSize) || 16, f = z(
    t.getPropertyValue("--ag-font-size"),
    i
  );
  if (Number.isFinite(f)) return f;
  const r = z(
    t.getPropertyValue("--font-size-xs"),
    i
  );
  if (Number.isFinite(r)) return r;
  const u = z(
    a.getPropertyValue("--ag-font-size"),
    i
  );
  if (Number.isFinite(u)) return u;
  const l = z(
    a.getPropertyValue("--font-size-xs"),
    i
  );
  return Number.isFinite(l) ? l : D;
}, oe = (e, n) => Number.isFinite(e) ? Math.max(20, Math.round(e * (n === "compact" ? 1.7 : n === "spacious" ? 2.8 : 2.2))) : D * 2.2, se = (e) => e === "compact" ? 30 : e === "spacious" ? 52 : 44, re = (e) => e === "compact" ? 24 : e === "spacious" ? 48 : 40;
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
