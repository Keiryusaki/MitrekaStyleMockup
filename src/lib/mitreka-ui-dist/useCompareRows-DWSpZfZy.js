import { onMounted as R, onBeforeUnmount as M, ref as s, computed as A, watch as B, nextTick as E } from "vue";
function q() {
  let a;
  function u(l, n) {
    a && window.clearTimeout(a), a = window.setTimeout(l, n);
  }
  return M(() => a && window.clearTimeout(a)), u;
}
function I(a, u) {
  const l = (n) => {
    const t = a.value;
    t && (t.contains(n.target) || u());
  };
  R(() => document.addEventListener("click", l)), M(() => document.removeEventListener("click", l));
}
function U(a, u = {}) {
  const { options: l, fetchOptions: n, debounceMs: t = 250, filterFn: g } = u, p = s(null), c = s(null), i = s(null), h = s(!1), f = s(""), o = s(-1), T = s(!1), m = s(
    Array.isArray(l) ? l : (l == null ? void 0 : l.value) ?? []
  ), C = q(), x = A(
    () => (m.value || []).find((e) => e.value === a.value) ?? null
  ), y = A(() => {
    const e = f.value.trim().toLowerCase(), r = m.value || [];
    if (!e) return r;
    const d = g ?? ((v, H) => v.label.toLowerCase().includes(H));
    return r.filter((v) => d(v, e));
  });
  async function L() {
    if (n) {
      T.value = !0;
      try {
        const e = await n(f.value);
        m.value = Array.isArray(e) ? e : [];
      } finally {
        T.value = !1;
      }
    }
  }
  function D() {
    h.value = !0, o.value = -1, E(() => {
      var e;
      return (e = c.value) == null ? void 0 : e.focus();
    });
  }
  function w() {
    h.value = !1, o.value = -1, f.value = "";
  }
  function b(e) {
    e.disabled || (a.value = e.value, w());
  }
  function O() {
    var e;
    a.value = null, f.value = "", (e = c.value) == null || e.focus();
  }
  function k() {
    E(() => {
      const e = i.value;
      if (!e) return;
      const r = e.querySelector(`[data-idx="${o.value}"]`);
      if (!r) return;
      const d = r.offsetTop, v = d + r.offsetHeight;
      d < e.scrollTop ? e.scrollTop = d : v > e.scrollTop + e.clientHeight && (e.scrollTop = v - e.clientHeight);
    });
  }
  function S(e) {
    if (!h.value) {
      ["ArrowDown", "Enter", " "].includes(e.key) && (e.preventDefault(), D());
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault(), w();
      return;
    }
    if (e.key === "ArrowDown" && (e.preventDefault(), o.value = Math.min(o.value + 1, y.value.length - 1), k()), e.key === "ArrowUp" && (e.preventDefault(), o.value = Math.max(o.value - 1, 0), k()), e.key === "Home" && (e.preventDefault(), o.value = 0, k()), e.key === "End" && (e.preventDefault(), o.value = y.value.length - 1, k()), e.key === "Enter") {
      e.preventDefault();
      const r = y.value[o.value];
      r && b(r);
    }
  }
  return l && !Array.isArray(l) && B(l, (e) => m.value = e ?? [], { immediate: !0 }), B(f, () => n && C(L, t)), I(p, w), {
    root: p,
    inputEl: c,
    menu: i,
    open: h,
    query: f,
    hoverIdx: o,
    loading: T,
    localOptions: m,
    filtered: y,
    selected: x,
    openMenu: D,
    closeMenu: w,
    choose: b,
    clear: O,
    onKey: S
  };
}
function K(a, u = {}) {
  const l = U(s(null), u), { localOptions: n } = l, t = A(
    () => (n.value || []).filter((c) => a.value.includes(c.value))
  );
  function g(c) {
    const i = new Set(a.value);
    i.has(c) ? i.delete(c) : i.add(c), a.value = Array.from(i);
  }
  function p() {
    a.value = [];
  }
  return { ...l, selectedList: t, toggle: g, clearAll: p };
}
const V = (a = {}) => {
  const u = a.defaultTheme ?? "success", l = (n) => {
    var t;
    return ((t = n.data) == null ? void 0 : t.compareTheme) ?? u;
  };
  return {
    "cmp-block": (n) => {
      var t;
      return !!((t = n.data) != null && t.compareBlock);
    },
    "cmp-role-header": (n) => {
      var t;
      return ((t = n.data) == null ? void 0 : t.compareRole) === "header";
    },
    "cmp-role-total": (n) => {
      var t;
      return ((t = n.data) == null ? void 0 : t.compareRole) === "total";
    },
    "cmp-theme-success": (n) => {
      var t;
      return !!((t = n.data) != null && t.compareBlock) && l(n) === "success";
    },
    "cmp-theme-info": (n) => {
      var t;
      return !!((t = n.data) != null && t.compareBlock) && l(n) === "info";
    },
    "cmp-theme-warning": (n) => {
      var t;
      return !!((t = n.data) != null && t.compareBlock) && l(n) === "warning";
    },
    "cmp-theme-primary": (n) => {
      var t;
      return !!((t = n.data) != null && t.compareBlock) && l(n) === "primary";
    },
    "cmp-theme-neutral": (n) => {
      var t;
      return !!((t = n.data) != null && t.compareBlock) && l(n) === "neutral";
    }
  };
};
export {
  U as a,
  K as b,
  V as c,
  I as u
};
