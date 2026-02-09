import { onMounted as D, onBeforeUnmount as M, ref as h, computed as L, watch as P, nextTick as q } from "vue";
function z() {
  let o;
  function c(e, t) {
    o && window.clearTimeout(o), o = window.setTimeout(e, t);
  }
  return M(() => o && window.clearTimeout(o)), c;
}
function O(o, c) {
  const e = (t) => {
    const n = o.value;
    n && (n.contains(t.target) || c());
  };
  D(() => document.addEventListener("click", e)), M(() => document.removeEventListener("click", e));
}
function W(o, c = {}) {
  const { options: e, fetchOptions: t, debounceMs: n = 250, filterFn: s } = c, d = h(null), l = h(null), u = h(null), i = h(!1), v = h(""), a = h(-1), w = h(!1), p = h(
    Array.isArray(e) ? e : (e == null ? void 0 : e.value) ?? []
  ), k = z(), B = L(
    () => (p.value || []).find((r) => r.value === o.value) ?? null
  ), g = L(() => {
    const r = v.value.trim().toLowerCase(), f = p.value || [];
    if (!r) return f;
    const T = s ?? ((S, N) => S.label.toLowerCase().includes(N));
    return f.filter((S) => T(S, r));
  });
  async function F() {
    if (t) {
      w.value = !0;
      try {
        const r = await t(v.value);
        p.value = Array.isArray(r) ? r : [];
      } finally {
        w.value = !1;
      }
    }
  }
  function b() {
    i.value = !0, a.value = -1, q(() => {
      var r;
      return (r = l.value) == null ? void 0 : r.focus();
    });
  }
  function m() {
    i.value = !1, a.value = -1, v.value = "";
  }
  function y(r) {
    r.disabled || (o.value = r.value, m());
  }
  function R() {
    var r;
    o.value = null, v.value = "", (r = l.value) == null || r.focus();
  }
  function x() {
    q(() => {
      const r = u.value;
      if (!r) return;
      const f = r.querySelector(`[data-idx="${a.value}"]`);
      if (!f) return;
      const T = f.offsetTop, S = T + f.offsetHeight;
      T < r.scrollTop ? r.scrollTop = T : S > r.scrollTop + r.clientHeight && (r.scrollTop = S - r.clientHeight);
    });
  }
  function H(r) {
    if (!i.value) {
      ["ArrowDown", "Enter", " "].includes(r.key) && (r.preventDefault(), b());
      return;
    }
    if (r.key === "Escape") {
      r.preventDefault(), m();
      return;
    }
    if (r.key === "ArrowDown" && (r.preventDefault(), a.value = Math.min(a.value + 1, g.value.length - 1), x()), r.key === "ArrowUp" && (r.preventDefault(), a.value = Math.max(a.value - 1, 0), x()), r.key === "Home" && (r.preventDefault(), a.value = 0, x()), r.key === "End" && (r.preventDefault(), a.value = g.value.length - 1, x()), r.key === "Enter") {
      r.preventDefault();
      const f = g.value[a.value];
      f && y(f);
    }
  }
  return e && !Array.isArray(e) && P(e, (r) => p.value = r ?? [], { immediate: !0 }), P(v, () => t && k(F, n)), O(d, m), {
    root: d,
    inputEl: l,
    menu: u,
    open: i,
    query: v,
    hoverIdx: a,
    loading: w,
    localOptions: p,
    filtered: g,
    selected: B,
    openMenu: b,
    closeMenu: m,
    choose: y,
    clear: R,
    onKey: H
  };
}
function $(o, c = {}) {
  const e = W(h(null), c), { localOptions: t } = e, n = L(
    () => (t.value || []).filter((l) => o.value.includes(l.value))
  );
  function s(l) {
    const u = new Set(o.value);
    u.has(l) ? u.delete(l) : u.add(l), o.value = Array.from(u);
  }
  function d() {
    o.value = [];
  }
  return { ...e, selectedList: n, toggle: s, clearAll: d };
}
const U = (o = {}) => {
  const c = o.defaultTheme ?? "success", e = (t) => {
    var n;
    return ((n = t.data) == null ? void 0 : n.compareTheme) ?? c;
  };
  return {
    "cmp-block": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock);
    },
    "cmp-role-header": (t) => {
      var n;
      return ((n = t.data) == null ? void 0 : n.compareRole) === "header";
    },
    "cmp-role-total": (t) => {
      var n;
      return ((n = t.data) == null ? void 0 : n.compareRole) === "total";
    },
    "cmp-theme-success": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "success";
    },
    "cmp-theme-info": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "info";
    },
    "cmp-theme-warning": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "warning";
    },
    "cmp-theme-primary": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "primary";
    },
    "cmp-theme-neutral": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "neutral";
    },
    "cmp-theme-accent": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "accent";
    },
    "cmp-theme-secondary": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "secondary";
    },
    "cmp-theme-error": (t) => {
      var n;
      return !!((n = t.data) != null && n.compareBlock) && e(t) === "error";
    }
  };
}, E = (o = {}) => ({
  rowType: o.rowType ?? "spacer",
  item: o.item ?? ""
}), G = (o = "spacer") => ({
  "cmp-row-spacer": (c) => {
    var e;
    return ((e = c.data) == null ? void 0 : e.rowType) === o;
  }
}), K = (o = {}) => (c) => {
  var s;
  const e = o.rowType ?? "spacer", t = o.defaultHeight ?? 26, n = o.spacerHeight ?? 24;
  return ((s = c == null ? void 0 : c.data) == null ? void 0 : s.rowType) === e ? n : t;
}, V = (o) => {
  let c = null, e = null, t = !1;
  const n = () => {
    const l = o.closest(".agx") ?? o, u = o.querySelector(".ag-root-wrapper") ?? l.querySelector(".ag-root-wrapper"), i = o.querySelector(
      ".ag-center-cols-viewport"
    ) || o.querySelector(
      ".ag-body-horizontal-scroll-viewport"
    );
    if (!i) return null;
    const a = o.querySelector(
      ".ag-body-viewport"
    ) ?? u ?? l, w = o.querySelector(
      ".ag-pinned-left-cols-container"
    ), p = o.querySelector(
      ".ag-pinned-right-cols-container"
    ), k = o.querySelector(
      ".ag-center-cols-viewport"
    ), B = (m, y) => {
      const R = (w == null ? void 0 : w.getBoundingClientRect().width) ?? 0, x = (p == null ? void 0 : p.getBoundingClientRect().width) ?? 0, H = (k == null ? void 0 : k.getBoundingClientRect().height) ?? a.getBoundingClientRect().height;
      a.style.setProperty("--agx-left-shadow-x", `${R}px`), a.style.setProperty("--agx-right-shadow-x", `${x}px`), a.style.setProperty("--agx-shadow-h", `${H}px`);
      const r = m > 0, f = m < y - 1;
      a.classList.toggle("agx-shadow-left", r), a.classList.toggle("agx-shadow-right", f);
    }, g = () => {
      const m = Math.max(
        0,
        i.scrollWidth - i.clientWidth
      ), y = i.scrollLeft;
      B(y, m);
    }, F = () => g();
    i.addEventListener("scroll", F, { passive: !0 });
    const b = new ResizeObserver(g);
    return b.observe(i), g(), () => {
      i.removeEventListener("scroll", F), b.disconnect(), a.classList.remove("agx-shadow-left", "agx-shadow-right");
    };
  };
  c = n();
  let s = null, d = 0;
  return c || (e = new MutationObserver(() => {
    t || (c = n(), c && e && (e.disconnect(), e = null));
  }), e.observe(o, { childList: !0, subtree: !0 }), s = window.setInterval(() => {
    t || (d += 1, !c && (c = n(), (c || d > 30) && (s && window.clearInterval(s), s = null, e == null || e.disconnect(), e = null)));
  }, 120)), () => {
    t = !0, e == null || e.disconnect(), s && window.clearInterval(s), c == null || c();
  };
}, X = (o) => {
  var t;
  const c = o == null ? void 0 : o.api, e = ((t = c == null ? void 0 : c.getGui) == null ? void 0 : t.call(c)) ?? null;
  return e ? V(e) : () => {
  };
}, A = 13, C = (o, c) => {
  const e = o.trim();
  if (!e) return NaN;
  if (e.endsWith("px")) return parseFloat(e);
  if (e.endsWith("rem")) return parseFloat(e) * c;
  const t = parseFloat(e);
  return Number.isFinite(t) ? t : NaN;
}, j = (o) => {
  if (typeof window > "u") return A;
  const c = o ?? document.documentElement;
  if (!c) return A;
  const e = getComputedStyle(c), t = parseFloat(e.fontSize);
  if (Number.isFinite(t)) return t;
  const n = getComputedStyle(document.documentElement), s = parseFloat(n.fontSize) || 16, d = C(
    e.getPropertyValue("--ag-font-size"),
    s
  );
  if (Number.isFinite(d)) return d;
  const l = C(
    e.getPropertyValue("--font-size-xs"),
    s
  );
  if (Number.isFinite(l)) return l;
  const u = C(
    n.getPropertyValue("--ag-font-size"),
    s
  );
  if (Number.isFinite(u)) return u;
  const i = C(
    n.getPropertyValue("--font-size-xs"),
    s
  );
  return Number.isFinite(i) ? i : A;
}, J = (o, c) => Number.isFinite(o) ? Math.max(20, Math.round(o * (c === "compact" ? 1.7 : c === "spacious" ? 2.8 : 2.2))) : A * 2.2;
export {
  W as a,
  $ as b,
  U as c,
  E as d,
  G as e,
  K as f,
  X as g,
  V as h,
  J as i,
  j as r,
  O as u
};
