const m = (r = {}) => {
  const t = r.defaultTheme ?? "success", c = (a) => {
    var e;
    return ((e = a.data) == null ? void 0 : e.compareTheme) ?? t;
  };
  return {
    "cmp-block": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock);
    },
    "cmp-role-header": (a) => {
      var e;
      return ((e = a.data) == null ? void 0 : e.compareRole) === "header";
    },
    "cmp-role-total": (a) => {
      var e;
      return ((e = a.data) == null ? void 0 : e.compareRole) === "total";
    },
    "cmp-theme-success": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "success";
    },
    "cmp-theme-info": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "info";
    },
    "cmp-theme-warning": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "warning";
    },
    "cmp-theme-primary": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "primary";
    },
    "cmp-theme-neutral": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "neutral";
    },
    "cmp-theme-accent": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "accent";
    },
    "cmp-theme-secondary": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "secondary";
    },
    "cmp-theme-error": (a) => {
      var e;
      return !!((e = a.data) != null && e.compareBlock) && c(a) === "error";
    }
  };
}, s = (r = {}) => ({
  rowType: r.rowType ?? "spacer",
  item: r.item ?? ""
}), p = (r = "spacer") => ({
  "cmp-row-spacer": (t) => {
    var c;
    return ((c = t.data) == null ? void 0 : c.rowType) === r;
  }
}), l = (r = {}) => (t) => {
  var o;
  const c = r.rowType ?? "spacer", a = r.defaultHeight ?? 26, e = r.spacerHeight ?? 24;
  return ((o = t == null ? void 0 : t.data) == null ? void 0 : o.rowType) === c ? e : a;
};
export {
  s as a,
  p as b,
  m as c,
  l as d
};
