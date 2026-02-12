import { onMounted as O, onBeforeUnmount as R, ref as s, computed as A, watch as H, nextTick as b } from "vue";
function q() {
  let o;
  function c(n, t) {
    o && window.clearTimeout(o), o = window.setTimeout(n, t);
  }
  return R(() => o && window.clearTimeout(o)), c;
}
function I(o, c) {
  const n = (t) => {
    const e = o.value;
    e && (e.contains(t.target) || c());
  };
  O(() => document.addEventListener("click", n)), R(() => document.removeEventListener("click", n));
}
function U(o, c = {}) {
  const { options: n, fetchOptions: t, debounceMs: e = 250, filterFn: f } = c, h = s(null), l = s(null), i = s(null), w = s(!1), m = s(""), r = s(-1), g = s(!1), p = s(
    Array.isArray(n) ? n : (n == null ? void 0 : n.value) ?? []
  ), S = q(), C = A(
    () => (p.value || []).find((a) => a.value === o.value) ?? null
  ), y = A(() => {
    const a = m.value.trim().toLowerCase(), u = p.value || [];
    if (!a) return u;
    const d = f ?? ((v, L) => v.label.toLowerCase().includes(L));
    return u.filter((v) => d(v, a));
  });
  async function E() {
    if (t) {
      g.value = !0;
      try {
        const a = await t(m.value);
        p.value = Array.isArray(a) ? a : [];
      } finally {
        g.value = !1;
      }
    }
  }
  function B() {
    w.value = !0, r.value = -1, b(() => {
      var a;
      return (a = l.value) == null ? void 0 : a.focus();
    });
  }
  function k() {
    w.value = !1, r.value = -1, m.value = "";
  }
  function D(a) {
    a.disabled || (o.value = a.value, k());
  }
  function M() {
    var a;
    o.value = null, m.value = "", (a = l.value) == null || a.focus();
  }
  function T() {
    b(() => {
      const a = i.value;
      if (!a) return;
      const u = a.querySelector(`[data-idx="${r.value}"]`);
      if (!u) return;
      const d = u.offsetTop, v = d + u.offsetHeight;
      d < a.scrollTop ? a.scrollTop = d : v > a.scrollTop + a.clientHeight && (a.scrollTop = v - a.clientHeight);
    });
  }
  function x(a) {
    if (!w.value) {
      ["ArrowDown", "Enter", " "].includes(a.key) && (a.preventDefault(), B());
      return;
    }
    if (a.key === "Escape") {
      a.preventDefault(), k();
      return;
    }
    if (a.key === "ArrowDown" && (a.preventDefault(), r.value = Math.min(r.value + 1, y.value.length - 1), T()), a.key === "ArrowUp" && (a.preventDefault(), r.value = Math.max(r.value - 1, 0), T()), a.key === "Home" && (a.preventDefault(), r.value = 0, T()), a.key === "End" && (a.preventDefault(), r.value = y.value.length - 1, T()), a.key === "Enter") {
      a.preventDefault();
      const u = y.value[r.value];
      u && D(u);
    }
  }
  return n && !Array.isArray(n) && H(n, (a) => p.value = a ?? [], { immediate: !0 }), H(m, () => t && S(E, e)), I(h, k), {
    root: h,
    inputEl: l,
    menu: i,
    open: w,
    query: m,
    hoverIdx: r,
    loading: g,
    localOptions: p,
    filtered: y,
    selected: C,
    openMenu: B,
    closeMenu: k,
    choose: D,
    clear: M,
    onKey: x
  };
}
function K(o, c = {}) {
  const n = U(s(null), c), { localOptions: t } = n, e = A(
    () => (t.value || []).filter((l) => o.value.includes(l.value))
  );
  function f(l) {
    const i = new Set(o.value);
    i.has(l) ? i.delete(l) : i.add(l), o.value = Array.from(i);
  }
  function h() {
    o.value = [];
  }
  return { ...n, selectedList: e, toggle: f, clearAll: h };
}
const V = (o = {}) => {
  const c = o.defaultTheme ?? "success", n = (t) => {
    var e;
    return ((e = t.data) == null ? void 0 : e.compareTheme) ?? c;
  };
  return {
    "cmp-block": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock);
    },
    "cmp-role-header": (t) => {
      var e;
      return ((e = t.data) == null ? void 0 : e.compareRole) === "header";
    },
    "cmp-role-total": (t) => {
      var e;
      return ((e = t.data) == null ? void 0 : e.compareRole) === "total";
    },
    "cmp-theme-success": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "success";
    },
    "cmp-theme-info": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "info";
    },
    "cmp-theme-warning": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "warning";
    },
    "cmp-theme-primary": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "primary";
    },
    "cmp-theme-neutral": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "neutral";
    },
    "cmp-theme-accent": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "accent";
    },
    "cmp-theme-secondary": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "secondary";
    },
    "cmp-theme-error": (t) => {
      var e;
      return !!((e = t.data) != null && e.compareBlock) && n(t) === "error";
    }
  };
}, $ = (o = {}) => ({
  rowType: o.rowType ?? "spacer",
  item: o.item ?? ""
}), j = (o = "spacer") => ({
  "cmp-row-spacer": (c) => {
    var n;
    return ((n = c.data) == null ? void 0 : n.rowType) === o;
  }
}), z = (o = {}) => (c) => {
  var f;
  const n = o.rowType ?? "spacer", t = o.defaultHeight ?? 26, e = o.spacerHeight ?? 24;
  return ((f = c == null ? void 0 : c.data) == null ? void 0 : f.rowType) === n ? e : t;
};
export {
  U as a,
  K as b,
  V as c,
  $ as d,
  j as e,
  z as f,
  I as u
};
