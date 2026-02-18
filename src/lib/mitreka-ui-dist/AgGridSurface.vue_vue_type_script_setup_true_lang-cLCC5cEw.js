import { defineComponent as R, createElementBlock as k, openBlock as v, normalizeClass as $, createCommentVNode as N, renderSlot as W, createElementVNode as g, ref as X, watch as ce, withKeys as _e, withModifiers as Be, createBlock as Ge, Teleport as lt, createVNode as Ee, Transition as Re, withCtx as We, toDisplayString as I, provide as Zt, inject as Qt, computed as L, normalizeStyle as me, createTextVNode as bt, Fragment as ge, renderList as Se, unref as je, useSlots as Xt, resolveDynamicComponent as en, reactive as tn, withDirectives as nn, vModelText as on, onMounted as rt, onBeforeUnmount as it, useAttrs as an, mergeProps as rn } from "vue";
import { a as sn, u as ln, c as dn, e as cn, f as un, d as fn, r as hn } from "./useAgGridRowHeight-CWMSTfcf.js";
import { AgGridVue as gn } from "ag-grid-vue3";
const pn = ["disabled"], mn = {
  key: 0,
  class: "animate-spin"
}, na = /* @__PURE__ */ R({
  __name: "Button",
  props: {
    size: { default: "md" },
    variant: { default: "solid" },
    color: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(t, { emit: a }) {
    const e = t, u = a, d = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, c = () => {
      const { variant: s, color: f } = e;
      return f === "default" ? s === "outline" ? "btn-outline" : s === "ghost" ? "btn-ghost" : "" : s === "solid" ? `btn-${f}` : s === "outline" ? `btn-outline btn-outline-${f}` : s === "soft" ? `btn-soft-${f}` : s === "ghost" ? "btn-ghost" : "";
    }, h = (s) => {
      !e.disabled && !e.loading && u("click", s);
    };
    return (s, f) => (v(), k("button", {
      class: $(["btn", d[t.size], c()]),
      disabled: t.disabled || t.loading,
      onClick: h
    }, [
      t.loading ? (v(), k("span", mn, [...f[0] || (f[0] = [
        g("svg", {
          class: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24"
        }, [
          g("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }),
          g("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          })
        ], -1)
      ])])) : N("", !0),
      W(s.$slots, "default")
    ], 10, pn));
  }
}), oa = /* @__PURE__ */ R({
  __name: "Badge",
  props: {
    size: { default: "md" },
    variant: { default: "solid" },
    color: { default: "default" }
  },
  setup(t) {
    const a = t, e = {
      xxs: "badge-xxs",
      xs: "badge-xs",
      sm: "badge-sm",
      md: "",
      lg: "badge-lg",
      xl: "badge-xl"
    }, u = () => {
      const { variant: d, color: c } = a;
      return c === "default" ? d === "outline" ? "badge-outline" : "" : d === "solid" ? `badge-${c}` : d === "outline" ? `badge-outline badge-outline-${c}` : d === "soft" ? `badge-soft-${c}` : "";
    };
    return (d, c) => (v(), k("span", {
      class: $(["badge", e[t.size], u()])
    }, [
      W(d.$slots, "default")
    ], 2));
  }
}), vn = ["role", "aria-expanded", "tabindex"], wn = { class: "card-title" }, kn = { class: "card-body-inner" }, bn = {
  key: 3,
  class: "mt-4"
}, aa = /* @__PURE__ */ R({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const u = t, d = e, c = X(u.modelValue !== void 0 ? u.modelValue : u.defaultOpen);
    ce(() => u.modelValue, (s) => {
      s !== void 0 && (c.value = s);
    });
    function h() {
      if (!u.collapsible) return;
      const s = !c.value;
      c.value = s, d("update:modelValue", s), d("toggle", s);
    }
    return a({ isOpen: c, toggle: h }), (s, f) => (v(), k("section", {
      class: $(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      s.$slots.title ? (v(), k("header", {
        key: 0,
        class: $(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? c.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: h,
        onKeydown: [
          f[0] || (f[0] = _e((x) => t.collapsible && h(), ["enter"])),
          f[1] || (f[1] = _e(Be((x) => t.collapsible && h(), ["prevent"]), ["space"]))
        ]
      }, [
        g("div", wn, [
          W(s.$slots, "title")
        ]),
        t.collapsible ? (v(), k("svg", {
          key: 0,
          class: $(["card-collapse-icon", { "is-open": c.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...f[2] || (f[2] = [
          g("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : N("", !0)
      ], 42, vn)) : N("", !0),
      t.collapsible ? (v(), k("div", {
        key: 1,
        class: $(["card-body-wrapper", { "is-open": c.value }])
      }, [
        g("div", kn, [
          W(s.$slots, "default")
        ])
      ], 2)) : W(s.$slots, "default", { key: 2 }),
      s.$slots.footer ? (v(), k("footer", bn, [
        W(s.$slots, "footer")
      ])) : N("", !0)
    ], 2));
  }
}), yn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, xn = { class: "text-xl font-semibold" }, ra = /* @__PURE__ */ R({
  __name: "Modal",
  props: {
    open: { type: Boolean },
    title: { default: "Modal" },
    size: { default: "md" },
    hideFooter: { type: Boolean, default: !1 },
    hideHeader: { type: Boolean, default: !1 },
    confirmText: { default: "Simpan" },
    cancelText: { default: "Batal" },
    persistent: { type: Boolean, default: !1 }
  },
  emits: ["close", "confirm"],
  setup(t, { emit: a }) {
    const e = t, u = a, d = {
      sm: "max-w-md",
      // 448px
      md: "max-w-3xl",
      // 768px
      lg: "max-w-[70rem]",
      // 1120px
      xl: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
      // almost full
      full: "w-screen h-screen max-w-none rounded-none"
      // true fullscreen
    }, c = () => {
      e.persistent || u("close");
    };
    return ce(
      () => e.open,
      (h) => {
        h ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (h, s) => (v(), Ge(lt, { to: "body" }, [
      Ee(Re, { name: "fade" }, {
        default: We(() => [
          t.open ? (v(), k("div", {
            key: 0,
            class: "fixed inset-0 z-40 bg-black/40",
            onClick: c
          })) : N("", !0)
        ]),
        _: 1
      }),
      Ee(Re, { name: "zoom" }, {
        default: We(() => [
          t.open ? (v(), k("div", {
            key: 0,
            class: $([
              "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            g("div", {
              class: $([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                d[t.size]
              ])
            }, [
              t.hideHeader ? N("", !0) : (v(), k("div", yn, [
                W(h.$slots, "header", {}, () => [
                  g("h3", xn, I(t.title), 1)
                ]),
                g("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: s[0] || (s[0] = (f) => u("close"))
                }, [...s[3] || (s[3] = [
                  g("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    g("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])])
              ])),
              g("div", {
                class: $([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                W(h.$slots, "default")
              ], 2),
              t.hideFooter ? N("", !0) : (v(), k("div", {
                key: 1,
                class: $([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                W(h.$slots, "footer", {}, () => [
                  g("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: s[1] || (s[1] = (f) => u("close"))
                  }, I(t.cancelText), 1),
                  g("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: s[2] || (s[2] = (f) => u("confirm"))
                  }, I(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : N("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), Mn = ["aria-expanded", "aria-disabled", "onKeydown"], Cn = { class: "collapse-title" }, Dn = { class: "collapse-content" }, _n = { class: "collapse-content-inner" }, En = { class: "collapse-body" }, ia = /* @__PURE__ */ R({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const u = t, d = e, c = X(u.modelValue !== void 0 ? u.modelValue : u.defaultOpen);
    ce(() => u.modelValue, (s) => {
      s !== void 0 && (c.value = s);
    });
    function h() {
      if (u.disabled) return;
      const s = !c.value;
      c.value = s, d("update:modelValue", s), d("toggle", s);
    }
    return a({ isOpen: c, toggle: h }), (s, f) => (v(), k("div", {
      class: $([
        "collapse",
        `collapse-${t.variant}`,
        { "is-open": c.value }
      ])
    }, [
      g("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": c.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: h,
        onKeydown: [
          _e(h, ["enter"]),
          _e(Be(h, ["prevent"]), ["space"])
        ]
      }, [
        g("div", Cn, [
          W(s.$slots, "header", {}, () => [
            W(s.$slots, "title")
          ])
        ]),
        f[0] || (f[0] = g("svg", {
          class: "collapse-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          g("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, Mn),
      g("div", Dn, [
        g("div", _n, [
          g("div", En, [
            W(s.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), sa = /* @__PURE__ */ R({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const u = t, d = e, c = X(/* @__PURE__ */ new Set());
    ce(() => u.modelValue, (f) => {
      f === null ? c.value = /* @__PURE__ */ new Set() : Array.isArray(f) ? c.value = new Set(f) : c.value = /* @__PURE__ */ new Set([f]);
    }, { immediate: !0 });
    function h(f) {
      const x = new Set(c.value);
      x.has(f) ? x.delete(f) : (u.multiple || x.clear(), x.add(f)), c.value = x, u.multiple ? d("update:modelValue", Array.from(x)) : d("update:modelValue", x.size > 0 ? Array.from(x)[0] : null);
    }
    function s(f) {
      return c.value.has(f);
    }
    return Zt("accordion", {
      toggleItem: h,
      isItemOpen: s
    }), a({ openItems: c, toggleItem: h }), (f, x) => (v(), k("div", {
      class: $(["accordion", `accordion-${t.variant}`])
    }, [
      W(f.$slots, "default")
    ], 2));
  }
}), Sn = ["aria-expanded", "aria-disabled", "onKeydown"], jn = { class: "accordion-title" }, Hn = { class: "accordion-content" }, Tn = { class: "accordion-content-inner" }, An = { class: "accordion-body" }, la = /* @__PURE__ */ R({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = Qt("accordion"), u = L(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function d() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (c, h) => (v(), k("div", {
      class: $(["accordion-item", { "is-open": u.value }])
    }, [
      g("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": u.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: d,
        onKeydown: [
          _e(d, ["enter"]),
          _e(Be(d, ["prevent"]), ["space"])
        ]
      }, [
        g("div", jn, [
          W(c.$slots, "header", {}, () => [
            W(c.$slots, "title")
          ])
        ]),
        h[0] || (h[0] = g("svg", {
          class: "accordion-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          g("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, Sn),
      g("div", Hn, [
        g("div", Tn, [
          g("div", An, [
            W(c.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Bn = { class: "loading-logo-wrapper" }, Ln = { class: "dots-container" }, $n = ["width", "height"], Fn = {
  key: 0,
  class: "loading-text"
}, On = /* @__PURE__ */ R({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = L(() => Math.round(a.size * (8 / 60)));
    return (u, d) => (v(), k("div", Bn, [
      g("div", {
        class: "loading-logo-container",
        style: me({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        g("div", Ln, [
          g("span", {
            class: "loading-dot dot-1 dot-blue",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          g("span", {
            class: "loading-dot dot-2 dot-blue",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          g("span", {
            class: "loading-dot dot-3 dot-black",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          g("span", {
            class: "loading-dot dot-4 dot-black",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          g("span", {
            class: "loading-dot dot-5 dot-red",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          g("span", {
            class: "loading-dot dot-6 dot-red",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (v(), k("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...d[0] || (d[0] = [
          g("polygon", {
            class: "logo-shape shape-blue",
            points: "11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
          }, null, -1),
          g("rect", {
            class: "logo-shape shape-black",
            x: "15.48",
            y: "8.73",
            width: "9.55",
            height: "9.55",
            transform: "translate(-3.61 18.27) rotate(-45)"
          }, null, -1),
          g("polygon", {
            class: "logo-shape shape-red",
            points: "40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
          }, null, -1)
        ])], 8, $n))
      ], 4),
      t.text ? (v(), k("p", Fn, [
        bt(I(t.text), 1),
        d[1] || (d[1] = g("span", { class: "loading-dots" }, [
          g("span", null, "."),
          g("span", null, "."),
          g("span", null, ".")
        ], -1))
      ])) : N("", !0)
    ]));
  }
}), In = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, da = /* @__PURE__ */ R({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (v(), Ge(lt, { to: "body" }, [
      Ee(Re, { name: "fade" }, {
        default: We(() => [
          t.open ? (v(), k("div", In, [
            Ee(On, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : N("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Nn = { class: "toast-content" }, Yn = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Pn = ["d"], zn = { class: "toast-body" }, Vn = {
  key: 0,
  class: "toast-title"
}, Rn = { class: "toast-message" }, Wn = ["onClick"], ca = /* @__PURE__ */ R({
  __name: "Toasts",
  setup(t) {
    const a = sn(), e = L(() => {
      const f = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return f[a.toastPosition.value] || f["bottom-right"];
    }), u = {
      info: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a1.25 1.25 0 110 2.5A1.25 1.25 0 0112 6zm1.5 10h-3v-1.5h1.5V9.5h-1.5V8h3v6h1.5V16z",
      success: "M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-4-4 1.5-1.5L11 12.5l4.5-4.5L17 9l-6 7z",
      warning: "M12 3l9 16H3l9-16zm-1 6h2v4h-2V9zm0 6h2v2h-2v-2z",
      error: "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5L13.5 10.5 15.5 12.5 14 14l-2-2-2 2-1.5-1.5 2-2-2-2 1.5-1.5 2 2 2-2 1.5 1.5z",
      primary: "M12 2l2.5 6.2L21 9l-4.5 4.3L17.5 20 12 16.8 6.5 20l1-6.7L3 9l6.5-0.8L12 2z"
    }, d = {
      info: "toast-soft-info",
      success: "toast-soft-success",
      warning: "toast-soft-warning",
      error: "toast-soft-error",
      primary: "toast-soft-primary"
    }, c = {
      info: "toast-solid-info",
      success: "toast-solid-success",
      warning: "toast-solid-warning",
      error: "toast-solid-error",
      primary: "toast-solid-primary"
    }, h = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, s = (f, x = "soft") => {
      var m;
      return ((m = {
        soft: d,
        solid: c,
        outline: h
      }[x]) == null ? void 0 : m[f]) || d[f] || "toast-default";
    };
    return (f, x) => (v(), Ge(lt, { to: "body" }, [
      g("div", {
        class: $(["toast-container", e.value])
      }, [
        (v(!0), k(ge, null, Se(je(a).toasts.value, (i) => (v(), k("div", {
          key: i.id,
          class: $(["toast-item", s(i.type, i.variant)])
        }, [
          g("div", Nn, [
            (v(), k("svg", Yn, [
              g("path", {
                d: u[i.type],
                fill: "currentColor"
              }, null, 8, Pn)
            ])),
            g("div", zn, [
              i.title ? (v(), k("div", Vn, I(i.title), 1)) : N("", !0),
              g("div", Rn, I(i.message), 1)
            ]),
            g("button", {
              class: "toast-close-btn",
              onClick: (m) => je(a).dismiss(i.id)
            }, [...x[0] || (x[0] = [
              g("svg", {
                class: "toast-close-icon",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                g("path", {
                  d: "M6 18L18 6M6 6l12 12",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ])], 8, Wn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), ua = /* @__PURE__ */ R({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const a = t, e = X(!1);
    let u = null;
    const d = () => {
      u = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, c = () => {
      u && (clearTimeout(u), u = null), e.value = !1;
    }, h = L(() => `tooltip-pos-${a.position}`), s = L(() => `tooltip-arrow-${a.position}`), f = L(() => `tooltip-variant-${a.variant}`);
    return (x, i) => (v(), k("span", {
      class: "tooltip-root",
      onMouseenter: d,
      onMouseleave: c,
      onFocus: d,
      onBlur: c
    }, [
      W(x.$slots, "default"),
      Ee(Re, { name: "tooltip-fade" }, {
        default: We(() => [
          e.value && t.text ? (v(), k("span", {
            key: 0,
            class: $(["tooltip-content", [h.value, f.value]]),
            role: "tooltip"
          }, [
            bt(I(t.text) + " ", 1),
            g("span", {
              class: $(["tooltip-arrow", [s.value, f.value]])
            }, null, 2)
          ], 2)) : N("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Kn = { class: "mitreka-pagination" }, Gn = ["disabled"], qn = { class: "pagination-status" }, Un = ["disabled"], fa = /* @__PURE__ */ R({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, u = a, d = () => {
      e.page > 1 && u("change", e.page - 1);
    }, c = () => {
      e.page < e.pages && u("change", e.page + 1);
    };
    return (h, s) => (v(), k("div", Kn, [
      g("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: d
      }, [...s[0] || (s[0] = [
        g("span", { class: "hidden sm:inline" }, "Prev", -1),
        g("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Gn),
      g("span", qn, I(t.page) + " / " + I(t.pages), 1),
      g("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: c
      }, [...s[1] || (s[1] = [
        g("span", { class: "hidden sm:inline" }, "Next", -1),
        g("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, Un)
    ]));
  }
}), Jn = { class: "avatar-root" }, Zn = ["src", "alt"], ha = /* @__PURE__ */ R({
  __name: "Avatar",
  props: {
    src: {},
    alt: { default: "Avatar" },
    fallback: {},
    size: { default: "md" },
    status: {},
    color: { default: "primary" },
    square: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = X(!1), u = L(() => a.src && !e.value), d = L(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((m) => m[0]).slice(0, 2).join("").toUpperCase() : "?"), c = L(() => `avatar-size-${a.size}`), h = L(() => `avatar-color-${a.color}`), s = L(() => a.status ? `avatar-status-${a.status}` : ""), f = L(() => `avatar-status-size-${a.size}`), x = L(() => a.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (m, j) => (v(), k("span", Jn, [
      u.value ? (v(), k("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: $(["avatar-img", [c.value, x.value]]),
        onError: i
      }, null, 42, Zn)) : (v(), k("span", {
        key: 1,
        class: $(["avatar-fallback", [c.value, h.value, x.value]])
      }, I(d.value), 3)),
      t.status ? (v(), k("span", {
        key: 2,
        class: $(["avatar-status", [s.value, f.value]])
      }, null, 2)) : N("", !0)
    ]));
  }
}), ga = /* @__PURE__ */ R({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = Xt(), u = L(() => {
      var f;
      const s = (f = e.default) == null ? void 0 : f.call(e);
      return s ? s.length : 0;
    }), d = L(() => u.value <= a.max ? 0 : u.value - a.max), c = L(() => `avatar-size-${a.size}`), h = L(() => `avatar-group-space-${a.size}`);
    return (s, f) => (v(), k("div", {
      class: $(["avatar-group", h.value])
    }, [
      (v(!0), k(ge, null, Se(t.max, (x, i) => {
        var m, j;
        return v(), k(ge, { key: i }, [
          i < u.value ? (v(), Ge(en((j = (m = je(e)).default) == null ? void 0 : j.call(m)[i]), { key: 0 })) : N("", !0)
        ], 64);
      }), 128)),
      d.value > 0 ? (v(), k("span", {
        key: 0,
        class: $(["avatar-group-count", c.value])
      }, " +" + I(d.value), 3)) : N("", !0)
    ], 2));
  }
}), Qn = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, Xn = { class: "breadcrumbs-list" }, eo = {
  key: 0,
  class: "breadcrumbs-item"
}, to = ["href"], no = { key: 0 }, oo = ["href"], ao = {
  key: 1,
  class: "breadcrumbs-text"
}, ro = {
  key: 1,
  class: "breadcrumbs-current"
}, pa = /* @__PURE__ */ R({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (u) => u === a.items.length - 1;
    return (u, d) => t.items.length ? (v(), k("nav", Qn, [
      g("ol", Xn, [
        t.showHome ? (v(), k("li", eo, [
          g("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, I(t.homeLabel), 9, to)
        ])) : N("", !0),
        (v(!0), k(ge, null, Se(t.items, (c, h) => (v(), k("li", {
          key: h,
          class: "breadcrumbs-item"
        }, [
          d[0] || (d[0] = g("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(h) ? (v(), k("span", ro, I(c.label), 1)) : (v(), k("span", no, [
            c.href ? (v(), k("a", {
              key: 0,
              href: c.href,
              class: "breadcrumbs-link"
            }, I(c.label), 9, oo)) : (v(), k("span", ao, I(c.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : N("", !0);
  }
}), io = { class: "mitreka-stat-card" }, so = {
  key: 0,
  class: "stat-icon"
}, lo = { class: "stat-content" }, co = { class: "stat-label" }, uo = { class: "stat-value" }, ma = /* @__PURE__ */ R({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (v(), k("div", io, [
      t.icon ? (v(), k("div", so, I(t.icon), 1)) : N("", !0),
      g("div", lo, [
        g("div", co, I(t.label), 1),
        g("div", uo, I(t.value), 1)
      ])
    ]));
  }
}), fo = { class: "mitreka-page-header" }, ho = { class: "page-header-title-row" }, go = { class: "page-header-title" }, po = {
  key: 0,
  class: "page-header-desc"
}, va = /* @__PURE__ */ R({
  __name: "PageHeader",
  props: {
    title: {},
    description: {},
    category: {}
  },
  setup(t) {
    const a = t, e = {
      foundation: "badge-soft-info",
      components: "badge-soft-primary",
      patterns: "badge-soft-accent",
      guides: "badge-soft-success",
      mockup: "badge-soft-warning"
    }, u = L(() => {
      if (!a.category) return "";
      const d = a.category.toLowerCase();
      return e[d] || "badge-soft-primary";
    });
    return (d, c) => (v(), k("header", fo, [
      g("div", ho, [
        g("h1", go, I(t.title), 1),
        t.category ? (v(), k("span", {
          key: 0,
          class: $(["badge page-header-badge", u.value])
        }, I(t.category), 3)) : N("", !0)
      ]),
      t.description ? (v(), k("p", po, I(t.description), 1)) : N("", !0)
    ]));
  }
}), mo = { class: "mitreka-theme-switcher" }, vo = ["value"], wa = /* @__PURE__ */ R({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: u } = ln("light"), d = L(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), c = (h) => {
      e(h === "mitrekadark" ? "dark" : "light");
    };
    return (h, s) => (v(), k("div", mo, [
      g("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: s[0] || (s[0] = //@ts-ignore
        (...f) => je(u) && je(u)(...f))
      }, " Toggle: " + I(d.value), 1),
      g("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: d.value,
        onChange: s[1] || (s[1] = (f) => c(f.target.value))
      }, [...s[2] || (s[2] = [
        g("option", { value: "mitrekalight" }, "mitrekalight", -1),
        g("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, vo)
    ]));
  }
}), wo = { class: "sidebar-header" }, ko = {
  key: 0,
  class: "sidebar-search"
}, bo = ["placeholder"], yo = { class: "sidebar-nav" }, xo = ["href", "title", "onClick"], Mo = { class: "sidebar-icon" }, Co = { class: "sidebar-icon-text" }, Do = {
  key: 0,
  class: "sidebar-label"
}, _o = ["title", "onClick"], Eo = { class: "sidebar-icon" }, So = { class: "sidebar-icon-text" }, jo = {
  key: 0,
  class: "sidebar-label"
}, Ho = ["href", "title", "onClick"], To = { class: "sidebar-icon" }, Ao = { class: "sidebar-icon-text" }, Bo = {
  key: 0,
  class: "sidebar-label"
}, ka = /* @__PURE__ */ R({
  __name: "Sidebar",
  props: {
    items: {},
    collapsed: { type: Boolean, default: !1 },
    activeHref: {},
    showSearch: { type: Boolean, default: !0 },
    placeholder: { default: "Search menu..." },
    defaultOpenIds: { default: () => [] }
  },
  emits: ["navigate", "toggle"],
  setup(t, { emit: a }) {
    const e = t, u = a, d = X(""), c = tn({});
    e.defaultOpenIds.forEach((m) => {
      c[m] = !0;
    });
    const h = (m) => !e.activeHref || !m.href ? !1 : m.exact ? e.activeHref === m.href : e.activeHref.startsWith(m.href), s = (m) => {
      var S;
      if (!m.children) return !1;
      if (d.value.trim()) return !0;
      const j = c[m.id], D = ((S = m.children) == null ? void 0 : S.some(h)) ?? !1;
      return j === void 0 && D && (c[m.id] = !0), c[m.id] ?? D;
    }, f = (m) => {
      const j = !s(m);
      c[m.id] = j, u("toggle", m.id, j);
    }, x = L(() => {
      const m = d.value.toLowerCase().trim();
      return m ? e.items.map((j) => {
        if (j.children) {
          const D = j.children.filter(
            (S) => S.label.toLowerCase().includes(m)
          );
          return j.label.toLowerCase().includes(m) ? j : D.length > 0 ? { ...j, children: D } : null;
        }
        return j.label.toLowerCase().includes(m) ? j : null;
      }).filter(Boolean) : e.items;
    }), i = (m) => {
      u("navigate", m), d.value = "";
    };
    return (m, j) => (v(), k("aside", {
      class: $(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      g("div", wo, [
        W(m.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (v(), k("div", ko, [
        nn(g("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": j[0] || (j[0] = (D) => d.value = D)
        }, null, 8, bo), [
          [on, d.value]
        ]),
        d.value ? (v(), k("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: j[1] || (j[1] = (D) => d.value = "")
        }, " × ")) : N("", !0)
      ])) : N("", !0),
      g("nav", yo, [
        (v(!0), k(ge, null, Se(x.value, (D) => (v(), k(ge, {
          key: D.id
        }, [
          D.children ? (v(), k(ge, { key: 1 }, [
            g("button", {
              class: $(["sidebar-item sidebar-group", s(D) ? "is-open" : ""]),
              title: t.collapsed ? D.label : void 0,
              onClick: (S) => f(D)
            }, [
              g("span", Eo, [
                W(m.$slots, "icon", { item: D }, () => [
                  g("span", So, I(D.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? N("", !0) : (v(), k("span", jo, I(D.label), 1)),
              t.collapsed ? N("", !0) : (v(), k("span", {
                key: 1,
                class: $(["sidebar-caret", s(D) ? "rotate" : ""])
              }, "›", 2))
            ], 10, _o),
            s(D) ? (v(), k("div", {
              key: 0,
              class: $(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (v(!0), k(ge, null, Se(D.children, (S) => (v(), k("a", {
                key: S.id,
                class: $(["sidebar-item sidebar-child", h(S) ? "is-active" : ""]),
                href: S.href || "#",
                title: t.collapsed ? S.label : void 0,
                onClick: Be((_) => i(S), ["prevent"])
              }, [
                g("span", To, [
                  W(m.$slots, "icon", { item: S }, () => [
                    g("span", Ao, I(S.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? N("", !0) : (v(), k("span", Bo, I(S.label), 1))
              ], 10, Ho))), 128))
            ], 2)) : N("", !0)
          ], 64)) : (v(), k("a", {
            key: 0,
            class: $(["sidebar-item", h(D) ? "is-active" : ""]),
            href: D.href || "#",
            title: t.collapsed ? D.label : void 0,
            onClick: Be((S) => i(D), ["prevent"])
          }, [
            g("span", Mo, [
              W(m.$slots, "icon", { item: D }, () => [
                g("span", Co, I(D.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? N("", !0) : (v(), k("span", Do, I(D.label), 1))
          ], 10, xo))
        ], 64))), 128))
      ])
    ], 2));
  }
}), yt = {
  home: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 11 9-7 9 7v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3Z" />
    </svg>
  `,
  dashboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 14 4-4"/>
      <path d="M3.34 19a10 10 0 1 1 17.32 0"/>
    </svg>
  `,
  users: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  `,
  settings: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
  clipboard: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <rect x="8" y="2" width="8" height="4" rx="1"/>
      <rect x="4" y="4" width="16" height="18" rx="2"/>
      <path d="M8 10h8M8 14h8"/>
    </svg>
  `,
  dot: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="3" />
    </svg>
  `,
  logout: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 17 5-5-5-5"/>
      <path d="M21 12H9"/>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    </svg>
  `,
  pencil: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
      <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/>
    </svg>
  `,
  trash: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 11v6"/>
      <path d="M14 11v6"/>
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
      <path d="M3 6h18"/>
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
    </svg>
  `,
  info: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 16v-4"/>
      <path d="M12 8h.01"/>
    </svg>
  `,
  "alert-triangle": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>
      <path d="M12 9v4"/>
      <path d="M12 17h.01"/>
    </svg>
  `,
  layout: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1"/>
      <rect width="7" height="5" x="14" y="3" rx="1"/>
      <rect width="7" height="9" x="14" y="12" rx="1"/>
      <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  `,
  component: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/>
    </svg>
  `,
  icons: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11v1a10 10 0 1 1-9-10"/>
      <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
      <line x1="9" x2="9.01" y1="9" y2="9"/>
      <line x1="15" x2="15.01" y1="9" y2="9"/>
      <path d="M16 5h6"/><path d="M19 2v6"/>
    </svg>
  `,
  chat: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"/>
      <path d="M7 11h10"/>
      <path d="M7 15h6"/>
      <path d="M7 7h8"/>
    </svg>
  `,
  sun: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M12 2v2"/>
      <path d="M12 20v2"/>
      <path d="m4.93 4.93 1.41 1.41"/>
      <path d="m17.66 17.66 1.41 1.41"/>
      <path d="M2 12h2"/>
      <path d="M20 12h2"/>
      <path d="m6.34 17.66-1.41 1.41"/>
      <path d="m19.07 4.93-1.41 1.41"/>
    </svg>
  `,
  moon: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"/>
    </svg>
  `,
  clipboardClock: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 14v2.2l1.6 1"/>
      <path d="M16 4h2a2 2 0 0 1 2 2v.832"/>
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2"/>
      <circle cx="16" cy="16" r="6"/>
      <rect x="8" y="2" width="8" height="4" rx="1"/>
    </svg>
  `,
  search: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m21 21-4.34-4.34"/>
      <circle cx="11" cy="11" r="8"/>
    </svg>
  `,
  "chevron-down": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="m6 9 6 6 6-6"/>
    </svg>
  `,
  "chevron-left": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 18-6-6 6-6"/>
    </svg>
  `,
  "chevron-right": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m9 18 6-6-6-6"/>
    </svg>
  `,
  "chevron-up": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m18 15-6-6-6 6"/>
    </svg>
  `,
  plus: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="M12 5v14"/>
    </svg>
  `,
  x: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </svg>
  `,
  check: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  `,
  ticket: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z"/>
      <path d="M13 5v2"/>
      <path d="M13 17v2"/>
      <path d="M13 11v2"/>
    </svg>
  `,
  menu: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 5h16"/>
      <path d="M4 12h16"/>
      <path d="M4 19h16"/>
    </svg>
  `,
  formInput: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="2" y="6" width="20" height="12" rx="2"/>
      <path d="M6 10h.01"/>
      <path d="M10 10h8"/>
    </svg>
  `,
  lock: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
      <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
  `,
  puzzle: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/>
    </svg>
  `,
  sparkles: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/>
      <path d="M20 3v4"/>
      <path d="M22 5h-4"/>
      <path d="M4 17v2"/>
      <path d="M5 18H3"/>
    </svg>
  `,
  palette: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/>
      <circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/>
      <circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>
      <circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.555C21.965 6.012 17.461 2 12 2z"/>
    </svg>
  `,
  box: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/>
      <path d="m3.3 7 8.7 5 8.7-5"/>
      <path d="M12 22V12"/>
    </svg>
  `,
  rocket: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/>
      <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/>
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/>
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/>
    </svg>
  `,
  zap: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>
    </svg>
  `,
  book: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 7v14"/>
      <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
    </svg>
  `,
  arrowRight: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  `,
  externalLink: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 3h6v6"/>
      <path d="M10 14 21 3"/>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
    </svg>
  `,
  trendingUp: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>
  `,
  star: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>
    </svg>
  `,
  fileText: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
    </svg>
  `,
  eye: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  `,
  user: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/>
      <circle cx="12" cy="7" r="4"/>
    </svg>
  `,
  shield: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/>
    </svg>
  `,
  bell: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/>
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>
    </svg>
  `,
  "bell-dot": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
      <path d="M13.916 2.314A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.74 7.327A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673 9 9 0 0 1-.585-.665"/>
      <circle cx="18" cy="8" r="3"/>
    </svg>
  `,
  "bell-minus": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
      <path d="M15 8h6"/>
      <path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"/>
    </svg>
  `,
  "bell-off": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
      <path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742"/>
      <path d="m2 2 20 20"/>
      <path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05"/>
    </svg>
  `,
  "bell-plus": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
      <path d="M15 8h6"/>
      <path d="M18 5v6"/>
      <path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332"/>
    </svg>
  `,
  "bell-ring": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10.268 21a2 2 0 0 0 3.464 0"/>
      <path d="M22 8c0-2.3-.8-4.3-2-6"/>
      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326"/>
      <path d="M4 2C2.8 3.7 2 5.7 2 8"/>
    </svg>
  `,
  calendar: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/>
    </svg>
  `,
  "calendar-1": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 14h1v4"/>
      <path d="M16 2v4"/>
      <path d="M3 10h18"/>
      <path d="M8 2v4"/>
      <rect x="3" y="4" width="18" height="18" rx="2"/>
    </svg>
  `,
  "calendar-arrow-down": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 14v2.2l1.6 1"/>
      <path d="M16 2v4"/>
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>
      <path d="M3 10h5"/>
      <path d="M8 2v4"/>
      <circle cx="16" cy="16" r="6"/>
    </svg>
  `,
  "calendar-arrow-up": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 14v2.2l1.6 1"/>
      <path d="M16 2v4"/>
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>
      <path d="M3 10h5"/>
      <path d="M8 2v4"/>
      <circle cx="16" cy="16" r="6"/>
    </svg>
  `,
  "calendar-check": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/>
      <path d="m9 16 2 2 4-4"/>
    </svg>
  `,
  "calendar-check-2": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <path d="M21 14V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8"/>
      <path d="M3 10h18"/>
      <path d="m16 20 2 2 4-4"/>
    </svg>
  `,
  "calendar-clock": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 14v2.2l1.6 1"/>
      <path d="M16 2v4"/>
      <path d="M21 7.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h3.5"/>
      <path d="M3 10h5"/>
      <path d="M8 2v4"/>
      <circle cx="16" cy="16" r="6"/>
    </svg>
  `,
  "calendar-cog": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15.228 16.852-.923-.383"/>
      <path d="m15.228 19.148-.923.383"/>
      <path d="M16 2v4"/>
      <path d="m16.47 14.305.382.923"/>
      <path d="m16.852 20.772-.383.924"/>
      <path d="m19.148 15.228.383-.923"/>
      <path d="m19.53 21.696-.382-.924"/>
      <path d="m20.772 16.852.924-.383"/>
      <path d="m20.772 19.148.924.383"/>
      <path d="M21 10.592V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"/>
      <path d="M3 10h18"/>
      <path d="M8 2v4"/>
      <circle cx="18" cy="18" r="3"/>
    </svg>
  `,
  "calendar-days": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M8 2v4"/>
      <path d="M16 2v4"/>
      <rect width="18" height="18" x="3" y="4" rx="2"/>
      <path d="M3 10h18"/>
      <path d="M8 14h.01"/>
      <path d="M12 14h.01"/>
      <path d="M16 14h.01"/>
      <path d="M8 18h.01"/>
      <path d="M12 18h.01"/>
      <path d="M16 18h.01"/>
    </svg>
  `,
  "hard-drive": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" x2="2" y1="12" y2="12"/>
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
      <line x1="6" x2="6.01" y1="16" y2="16"/>
      <line x1="10" x2="10.01" y1="16" y2="16"/>
    </svg>
  `,
  "hard-drive-download": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v8"/>
      <path d="m16 6-4 4-4-4"/>
      <rect width="20" height="8" x="2" y="14" rx="2"/>
      <path d="M6 18h.01"/>
      <path d="M10 18h.01"/>
    </svg>
  `,
  "hard-drive-upload": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m16 6-4-4-4 4"/>
      <path d="M12 2v8"/>
      <rect width="20" height="8" x="2" y="14" rx="2"/>
      <path d="M6 18h.01"/>
      <path d="M10 18h.01"/>
    </svg>
  `,
  cloud: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
    </svg>
  `,
  cloudy: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17.5 21H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      <path d="M22 10a3 3 0 0 0-3-3h-2.207a5.502 5.502 0 0 0-10.702.5"/>
    </svg>
  `,
  "cloud-alert": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 12v4"/>
      <path d="M12 20h.01"/>
      <path d="M17 18h.5a1 1 0 0 0 0-9h-1.79A7 7 0 1 0 7 17.708"/>
    </svg>
  `,
  "cloud-backup": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 15.251A4.5 4.5 0 0 0 17.5 8h-1.79A7 7 0 1 0 3 13.607"/>
      <path d="M7 11v4h4"/>
      <path d="M8 19a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5 4.82 4.82 0 0 0-3.41 1.41L7 15"/>
    </svg>
  `,
  "cloud-check": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m17 15-5.5 5.5L9 18"/>
      <path d="M5 17.743A7 7 0 1 1 15.71 10h1.79a4.5 4.5 0 0 1 1.5 8.742"/>
    </svg>
  `,
  "cloud-cog": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m10.852 19.772-.383.924"/>
      <path d="m13.148 14.228.383-.923"/>
      <path d="M13.148 19.772a3 3 0 1 0-2.296-5.544l-.383-.923"/>
      <path d="m13.53 20.696-.382-.924a3 3 0 1 1-2.296-5.544"/>
      <path d="m14.772 15.852.923-.383"/>
      <path d="m14.772 18.148.923.383"/>
      <path d="M4.2 15.1a7 7 0 1 1 9.93-9.858A7 7 0 0 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.2"/>
      <path d="m9.228 15.852-.923-.383"/>
      <path d="m9.228 18.148-.923.383"/>
    </svg>
  `,
  "cloud-download": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 13v8l-4-4"/>
      <path d="m12 21 4-4"/>
      <path d="M4.393 15.269A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.436 8.284"/>
    </svg>
  `,
  "cloud-off": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 2 20 20"/>
      <path d="M5.782 5.782A7 7 0 0 0 9 19h8.5a4.5 4.5 0 0 0 1.307-.193"/>
      <path d="M21.532 16.5A4.5 4.5 0 0 0 17.5 10h-1.79A7.008 7.008 0 0 0 10 5.07"/>
    </svg>
  `,
  "circle-check": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="m9 12 2 2 4-4"/>
    </svg>
  `,
  "circle-check-big": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.801 10A10 10 0 1 1 17 3.335"/>
      <path d="m9 11 3 3L22 4"/>
    </svg>
  `,
  "check-check": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M18 6 7 17l-5-5"/>
      <path d="m22 10-7.5 7.5L13 16"/>
    </svg>
  `,
  "credit-card": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2"/>
      <line x1="2" x2="22" y1="10" y2="10"/>
    </svg>
  `,
  "at-sign": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"/>
    </svg>
  `,
  mail: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
    </svg>
  `,
  "mail-check": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="m16 19 2 2 4-4"/>
    </svg>
  `,
  "mail-minus": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="M16 19h6"/>
    </svg>
  `,
  "mail-open": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z"/>
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10"/>
    </svg>
  `,
  "mail-plus": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="M19 16v6"/>
      <path d="M16 19h6"/>
    </svg>
  `,
  "mail-question": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="M18 15.28c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/>
      <path d="M20 22v.01"/>
    </svg>
  `,
  "mail-search": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 12.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h7.5"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <circle cx="18" cy="18" r="3"/>
      <path d="m22 22-1.5-1.5"/>
    </svg>
  `,
  "mail-warning": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="M20 14v4"/>
      <path d="M20 22v.01"/>
    </svg>
  `,
  "mail-x": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h9"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
      <path d="m17 17 4 4"/>
      <path d="m21 17-4 4"/>
    </svg>
  `,
  send: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"/>
      <path d="m21.854 2.147-10.94 10.939"/>
    </svg>
  `,
  "message-circle": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
    </svg>
  `,
  "message-circle-more": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/>
      <path d="M8 12h.01"/>
      <path d="M12 12h.01"/>
      <path d="M16 12h.01"/>
    </svg>
  `,
  "message-circle-off": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 2 20 20"/>
      <path d="M4.93 4.929a10 10 0 0 0-1.938 11.412 2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 0 0 11.302-1.989"/>
      <path d="M8.35 2.69A10 10 0 0 1 21.3 15.65"/>
    </svg>
   `,
  truck: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>
     </svg>
   `,
  upload: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/>
     </svg>
   `,
  image: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
     </svg>
   `,
  file: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/>
     </svg>
   `,
  "x-circle": `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>
     </svg>
   `,
  megaphone: `
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
       <path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>
     </svg>
   `
}, ba = (t) => yt[t], Lo = ["innerHTML"], $o = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ya = /* @__PURE__ */ R({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = L(() => a.class || "w-5 h-5"), u = L(() => yt[a.name]), d = L(
      () => u.value ? u.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (c, h) => u.value ? (v(), k("span", {
      key: 0,
      innerHTML: d.value,
      class: $(e.value)
    }, null, 10, Lo)) : (v(), k("span", $o, "?"));
  }
});
var et = [
  "onChange",
  "onClose",
  "onDayCreate",
  "onDestroy",
  "onKeyDown",
  "onMonthChange",
  "onOpen",
  "onParseConfig",
  "onReady",
  "onValueUpdate",
  "onYearChange",
  "onPreCalendarPosition"
], Ce = {
  _disable: [],
  allowInput: !1,
  allowInvalidPreload: !1,
  altFormat: "F j, Y",
  altInput: !1,
  altInputClass: "form-control input",
  animate: typeof window == "object" && window.navigator.userAgent.indexOf("MSIE") === -1,
  ariaDateFormat: "F j, Y",
  autoFillDefaultTime: !0,
  clickOpens: !0,
  closeOnSelect: !0,
  conjunction: ", ",
  dateFormat: "Y-m-d",
  defaultHour: 12,
  defaultMinute: 0,
  defaultSeconds: 0,
  disable: [],
  disableMobile: !1,
  enableSeconds: !1,
  enableTime: !1,
  errorHandler: function(t) {
    return typeof console < "u" && console.warn(t);
  },
  getWeek: function(t) {
    var a = new Date(t.getTime());
    a.setHours(0, 0, 0, 0), a.setDate(a.getDate() + 3 - (a.getDay() + 6) % 7);
    var e = new Date(a.getFullYear(), 0, 4);
    return 1 + Math.round(((a.getTime() - e.getTime()) / 864e5 - 3 + (e.getDay() + 6) % 7) / 7);
  },
  hourIncrement: 1,
  ignoredFocusElements: [],
  inline: !1,
  locale: "default",
  minuteIncrement: 5,
  mode: "single",
  monthSelectorType: "dropdown",
  nextArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M13.207 8.472l-7.854 7.854-0.707-0.707 7.146-7.146-7.146-7.148 0.707-0.707 7.854 7.854z' /></svg>",
  noCalendar: !1,
  now: /* @__PURE__ */ new Date(),
  onChange: [],
  onClose: [],
  onDayCreate: [],
  onDestroy: [],
  onKeyDown: [],
  onMonthChange: [],
  onOpen: [],
  onParseConfig: [],
  onReady: [],
  onValueUpdate: [],
  onYearChange: [],
  onPreCalendarPosition: [],
  plugins: [],
  position: "auto",
  positionElement: void 0,
  prevArrow: "<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 17 17'><g></g><path d='M5.207 8.471l7.146 7.147-0.707 0.707-7.853-7.854 7.854-7.853 0.707 0.707-7.147 7.146z' /></svg>",
  shorthandCurrentMonth: !1,
  showMonths: 1,
  static: !1,
  time_24hr: !1,
  weekNumbers: !1,
  wrap: !1
}, Le = {
  weekdays: {
    shorthand: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    longhand: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
  },
  months: {
    shorthand: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    longhand: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  },
  daysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
  firstDayOfWeek: 0,
  ordinal: function(t) {
    var a = t % 100;
    if (a > 3 && a < 21)
      return "th";
    switch (a % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  },
  rangeSeparator: " to ",
  weekAbbreviation: "Wk",
  scrollTitle: "Scroll to increment",
  toggleTitle: "Click to toggle",
  amPM: ["AM", "PM"],
  yearAriaLabel: "Year",
  monthAriaLabel: "Month",
  hourAriaLabel: "Hour",
  minuteAriaLabel: "Minute",
  time_24hr: !1
}, Q = function(t, a) {
  return a === void 0 && (a = 2), ("000" + t).slice(a * -1);
}, ie = function(t) {
  return t === !0 ? 1 : 0;
};
function wt(t, a) {
  var e;
  return function() {
    var u = this, d = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(u, d);
    }, a);
  };
}
var tt = function(t) {
  return t instanceof Array ? t : [t];
};
function U(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function O(t, a, e) {
  var u = window.document.createElement(t);
  return a = a || "", e = e || "", u.className = a, e !== void 0 && (u.textContent = e), u;
}
function ze(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function xt(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return xt(t.parentNode, a);
}
function Ve(t, a) {
  var e = O("div", "numInputWrapper"), u = O("input", "numInput " + t), d = O("span", "arrowUp"), c = O("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? u.type = "number" : (u.type = "text", u.pattern = "\\d*"), a !== void 0)
    for (var h in a)
      u.setAttribute(h, a[h]);
  return e.appendChild(u), e.appendChild(d), e.appendChild(c), e;
}
function te(t) {
  try {
    if (typeof t.composedPath == "function") {
      var a = t.composedPath();
      return a[0];
    }
    return t.target;
  } catch {
    return t.target;
  }
}
var nt = function() {
}, Ke = function(t, a, e) {
  return e.months[a ? "shorthand" : "longhand"][t];
}, Fo = {
  D: nt,
  F: function(t, a, e) {
    t.setMonth(e.months.longhand.indexOf(a));
  },
  G: function(t, a) {
    t.setHours((t.getHours() >= 12 ? 12 : 0) + parseFloat(a));
  },
  H: function(t, a) {
    t.setHours(parseFloat(a));
  },
  J: function(t, a) {
    t.setDate(parseFloat(a));
  },
  K: function(t, a, e) {
    t.setHours(t.getHours() % 12 + 12 * ie(new RegExp(e.amPM[1], "i").test(a)));
  },
  M: function(t, a, e) {
    t.setMonth(e.months.shorthand.indexOf(a));
  },
  S: function(t, a) {
    t.setSeconds(parseFloat(a));
  },
  U: function(t, a) {
    return new Date(parseFloat(a) * 1e3);
  },
  W: function(t, a, e) {
    var u = parseInt(a), d = new Date(t.getFullYear(), 0, 2 + (u - 1) * 7, 0, 0, 0, 0);
    return d.setDate(d.getDate() - d.getDay() + e.firstDayOfWeek), d;
  },
  Y: function(t, a) {
    t.setFullYear(parseFloat(a));
  },
  Z: function(t, a) {
    return new Date(a);
  },
  d: function(t, a) {
    t.setDate(parseFloat(a));
  },
  h: function(t, a) {
    t.setHours((t.getHours() >= 12 ? 12 : 0) + parseFloat(a));
  },
  i: function(t, a) {
    t.setMinutes(parseFloat(a));
  },
  j: function(t, a) {
    t.setDate(parseFloat(a));
  },
  l: nt,
  m: function(t, a) {
    t.setMonth(parseFloat(a) - 1);
  },
  n: function(t, a) {
    t.setMonth(parseFloat(a) - 1);
  },
  s: function(t, a) {
    t.setSeconds(parseFloat(a));
  },
  u: function(t, a) {
    return new Date(parseFloat(a));
  },
  w: nt,
  y: function(t, a) {
    t.setFullYear(2e3 + parseFloat(a));
  }
}, be = {
  D: "",
  F: "",
  G: "(\\d\\d|\\d)",
  H: "(\\d\\d|\\d)",
  J: "(\\d\\d|\\d)\\w+",
  K: "",
  M: "",
  S: "(\\d\\d|\\d)",
  U: "(.+)",
  W: "(\\d\\d|\\d)",
  Y: "(\\d{4})",
  Z: "(.+)",
  d: "(\\d\\d|\\d)",
  h: "(\\d\\d|\\d)",
  i: "(\\d\\d|\\d)",
  j: "(\\d\\d|\\d)",
  l: "",
  m: "(\\d\\d|\\d)",
  n: "(\\d\\d|\\d)",
  s: "(\\d\\d|\\d)",
  u: "(.+)",
  w: "(\\d\\d|\\d)",
  y: "(\\d{2})"
}, Ae = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, a, e) {
    return a.weekdays.shorthand[Ae.w(t, a, e)];
  },
  F: function(t, a, e) {
    return Ke(Ae.n(t, a, e) - 1, !1, a);
  },
  G: function(t, a, e) {
    return Q(Ae.h(t, a, e));
  },
  H: function(t) {
    return Q(t.getHours());
  },
  J: function(t, a) {
    return a.ordinal !== void 0 ? t.getDate() + a.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, a) {
    return a.amPM[ie(t.getHours() > 11)];
  },
  M: function(t, a) {
    return Ke(t.getMonth(), !0, a);
  },
  S: function(t) {
    return Q(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, a, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return Q(t.getFullYear(), 4);
  },
  d: function(t) {
    return Q(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return Q(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, a) {
    return a.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return Q(t.getMonth() + 1);
  },
  n: function(t) {
    return t.getMonth() + 1;
  },
  s: function(t) {
    return t.getSeconds();
  },
  u: function(t) {
    return t.getTime();
  },
  w: function(t) {
    return t.getDay();
  },
  y: function(t) {
    return String(t.getFullYear()).substring(2);
  }
}, Mt = function(t) {
  var a = t.config, e = a === void 0 ? Ce : a, u = t.l10n, d = u === void 0 ? Le : u, c = t.isMobile, h = c === void 0 ? !1 : c;
  return function(s, f, x) {
    var i = x || d;
    return e.formatDate !== void 0 && !h ? e.formatDate(s, f, i) : f.split("").map(function(m, j, D) {
      return Ae[m] && D[j - 1] !== "\\" ? Ae[m](s, i, e) : m !== "\\" ? m : "";
    }).join("");
  };
}, st = function(t) {
  var a = t.config, e = a === void 0 ? Ce : a, u = t.l10n, d = u === void 0 ? Le : u;
  return function(c, h, s, f) {
    if (!(c !== 0 && !c)) {
      var x = f || d, i, m = c;
      if (c instanceof Date)
        i = new Date(c.getTime());
      else if (typeof c != "string" && c.toFixed !== void 0)
        i = new Date(c);
      else if (typeof c == "string") {
        var j = h || (e || Ce).dateFormat, D = String(c).trim();
        if (D === "today")
          i = /* @__PURE__ */ new Date(), s = !0;
        else if (e && e.parseDate)
          i = e.parseDate(c, j);
        else if (/Z$/.test(D) || /GMT$/.test(D))
          i = new Date(c);
        else {
          for (var S = void 0, _ = [], A = 0, J = 0, q = ""; A < j.length; A++) {
            var oe = j[A], se = oe === "\\", ve = j[A - 1] === "\\" || se;
            if (be[oe] && !ve) {
              q += be[oe];
              var ae = new RegExp(q).exec(c);
              ae && (S = !0) && _[oe !== "Y" ? "push" : "unshift"]({
                fn: Fo[oe],
                val: ae[++J]
              });
            } else se || (q += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), _.forEach(function(re) {
            var le = re.fn, pe = re.val;
            return i = le(i, pe, x) || i;
          }), i = S ? i : void 0;
        }
      }
      if (!(i instanceof Date && !isNaN(i.getTime()))) {
        e.errorHandler(new Error("Invalid date provided: " + m));
        return;
      }
      return s === !0 && i.setHours(0, 0, 0, 0), i;
    }
  };
};
function ne(t, a, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(a.getTime()).setHours(0, 0, 0, 0) : t.getTime() - a.getTime();
}
var Oo = function(t, a, e) {
  return t > Math.min(a, e) && t < Math.max(a, e);
}, ot = function(t, a, e) {
  return t * 3600 + a * 60 + e;
}, Io = function(t) {
  var a = Math.floor(t / 3600), e = (t - a * 3600) / 60;
  return [a, e, t - a * 3600 - e * 60];
}, No = {
  DAY: 864e5
};
function at(t) {
  var a = t.defaultHour, e = t.defaultMinute, u = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var d = t.minDate.getHours(), c = t.minDate.getMinutes(), h = t.minDate.getSeconds();
    a < d && (a = d), a === d && e < c && (e = c), a === d && e === c && u < h && (u = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var s = t.maxDate.getHours(), f = t.maxDate.getMinutes();
    a = Math.min(a, s), a === s && (e = Math.min(f, e)), a === s && e === f && (u = t.maxDate.getSeconds());
  }
  return { hours: a, minutes: e, seconds: u };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var a = [], e = 1; e < arguments.length; e++)
    a[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var u = function(s) {
    s && Object.keys(s).forEach(function(f) {
      return t[f] = s[f];
    });
  }, d = 0, c = a; d < c.length; d++) {
    var h = c[d];
    u(h);
  }
  return t;
});
var G = function() {
  return G = Object.assign || function(t) {
    for (var a, e = 1, u = arguments.length; e < u; e++) {
      a = arguments[e];
      for (var d in a) Object.prototype.hasOwnProperty.call(a, d) && (t[d] = a[d]);
    }
    return t;
  }, G.apply(this, arguments);
}, kt = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var u = Array(t), d = 0, a = 0; a < e; a++)
    for (var c = arguments[a], h = 0, s = c.length; h < s; h++, d++)
      u[d] = c[h];
  return u;
}, Yo = 300;
function Po(t, a) {
  var e = {
    config: G(G({}, Ce), K.defaultConfig),
    l10n: Le
  };
  e.parseDate = st({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = _, e._setHoursFromDate = j, e._positionCalendar = Ne, e.changeMonth = Z, e.changeYear = Fe, e.clear = xe, e.close = Dt, e.onMouseOver = Ie, e._createElement = O, e.createDay = ae, e.destroy = _t, e.isEnabled = ke, e.jumpToDate = q, e.updateValue = he, e.open = jt, e.redraw = ht, e.set = Bt, e.setDate = Lt, e.toggle = It;
  function u() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function d() {
    e.element = e.input = t, e.isOpen = !1, Ht(), ft(), Ft(), $t(), u(), e.isMobile || ve(), J(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && j(e.config.noCalendar ? e.latestSelectedDateObj : void 0), he(!1)), s();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && Ne(), V("onReady");
  }
  function c() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function h(n) {
    return n.bind(e);
  }
  function s() {
    var n = e.config;
    n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function() {
      if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
        var o = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = o + "px", e.calendarContainer.style.width = o + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function f(n) {
    if (e.selectedDates.length === 0) {
      var o = e.config.minDate === void 0 || ne(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = at(e.config);
      o.setHours(r.hours, r.minutes, r.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && Pt(n);
    var l = e._input.value;
    m(), he(), e._input.value !== l && e._debouncedChange();
  }
  function x(n, o) {
    return n % 12 + 12 * ie(o === e.l10n.amPM[1]);
  }
  function i(n) {
    switch (n % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return n % 12;
    }
  }
  function m() {
    if (!(e.hourElement === void 0 || e.minuteElement === void 0)) {
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, o = (parseInt(e.minuteElement.value, 10) || 0) % 60, r = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = x(n, e.amPM.textContent));
      var l = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && ne(e.latestSelectedDateObj, e.config.minDate, !0) === 0, p = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && ne(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var w = ot(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), H = ot(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), y = ot(n, o, r);
        if (y > H && y < w) {
          var T = Io(w);
          n = T[0], o = T[1], r = T[2];
        }
      } else {
        if (p) {
          var b = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, b.getHours()), n === b.getHours() && (o = Math.min(o, b.getMinutes())), o === b.getMinutes() && (r = Math.min(r, b.getSeconds()));
        }
        if (l) {
          var E = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, E.getHours()), n === E.getHours() && o < E.getMinutes() && (o = E.getMinutes()), o === E.getMinutes() && (r = Math.max(r, E.getSeconds()));
        }
      }
      D(n, o, r);
    }
  }
  function j(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && D(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function D(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Q(e.config.time_24hr ? n : (12 + n) % 12 + 12 * ie(n % 12 === 0)), e.minuteElement.value = Q(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[ie(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Q(r)));
  }
  function S(n) {
    var o = te(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && Fe(r);
  }
  function _(n, o, r, l) {
    if (o instanceof Array)
      return o.forEach(function(p) {
        return _(n, p, r, l);
      });
    if (n instanceof Array)
      return n.forEach(function(p) {
        return _(p, o, r, l);
      });
    n.addEventListener(o, r, l), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, l);
      }
    });
  }
  function A() {
    V("onChange");
  }
  function J() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(l) {
        return _(l, "click", e[r]);
      });
    }), e.isMobile) {
      Ot();
      return;
    }
    var n = wt(St, 50);
    if (e._debouncedChange = wt(A, Yo), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && _(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Ie(te(r));
    }), _(e._input, "keydown", dt), e.calendarContainer !== void 0 && _(e.calendarContainer, "keydown", dt), !e.config.inline && !e.config.static && _(window, "resize", n), window.ontouchstart !== void 0 ? _(window.document, "touchstart", qe) : _(window.document, "mousedown", qe), _(window.document, "focus", qe, { capture: !0 }), e.config.clickOpens === !0 && (_(e._input, "focus", e.open), _(e._input, "click", e.open)), e.daysContainer !== void 0 && (_(e.monthNav, "click", Yt), _(e.monthNav, ["keyup", "increment"], S), _(e.daysContainer, "click", gt)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return te(r).select();
      };
      _(e.timeContainer, ["increment"], f), _(e.timeContainer, "blur", f, { capture: !0 }), _(e.timeContainer, "click", oe), _([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && _(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && _(e.amPM, "click", function(r) {
        f(r);
      });
    }
    e.config.allowInput && _(e._input, "blur", Et);
  }
  function q(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), l = e.currentYear, p = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (w) {
      w.message = "Invalid date supplied: " + r, e.config.errorHandler(w);
    }
    o && e.currentYear !== l && (V("onYearChange"), z()), o && (e.currentYear !== l || e.currentMonth !== p) && V("onMonthChange"), e.redraw();
  }
  function oe(n) {
    var o = te(n);
    ~o.className.indexOf("arrow") && se(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function se(n, o, r) {
    var l = n && te(n), p = r || l && l.parentNode && l.parentNode.firstChild, w = Je("increment");
    w.delta = o, p && p.dispatchEvent(w);
  }
  function ve() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = O("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(fe()), e.innerContainer = O("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = P(), r = o.weekWrapper, l = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = l, e.weekWrapper = r;
      }
      e.rContainer = O("div", "flatpickr-rContainer"), e.rContainer.appendChild($e()), e.daysContainer || (e.daysContainer = O("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), F(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(we()), U(e.calendarContainer, "rangeMode", e.config.mode === "range"), U(e.calendarContainer, "animate", e.config.animate === !0), U(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var p = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!p && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var w = O("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(w, e.element), w.appendChild(e.element), e.altInput && w.appendChild(e.altInput), w.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function ae(n, o, r, l) {
    var p = ke(o, !0), w = O("span", n, o.getDate().toString());
    return w.dateObj = o, w.$i = l, w.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && ne(o, e.now) === 0 && (e.todayDateElem = w, w.classList.add("today"), w.setAttribute("aria-current", "date")), p ? (w.tabIndex = -1, Ze(o) && (w.classList.add("selected"), e.selectedDateElem = w, e.config.mode === "range" && (U(w, "startRange", e.selectedDates[0] && ne(o, e.selectedDates[0], !0) === 0), U(w, "endRange", e.selectedDates[1] && ne(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && w.classList.add("inRange")))) : w.classList.add("flatpickr-disabled"), e.config.mode === "range" && Nt(o) && !Ze(o) && w.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && l % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), V("onDayCreate", w), w;
  }
  function re(n) {
    n.focus(), e.config.mode === "range" && Ie(n);
  }
  function le(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, l = o; l != r; l += n)
      for (var p = e.daysContainer.children[l], w = n > 0 ? 0 : p.children.length - 1, H = n > 0 ? p.children.length : -1, y = w; y != H; y += n) {
        var T = p.children[y];
        if (T.className.indexOf("hidden") === -1 && ke(T.dateObj))
          return T;
      }
  }
  function pe(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, l = o > 0 ? e.config.showMonths : -1, p = o > 0 ? 1 : -1, w = r - e.currentMonth; w != l; w += p)
      for (var H = e.daysContainer.children[w], y = r - e.currentMonth === w ? n.$i + o : o < 0 ? H.children.length - 1 : 0, T = H.children.length, b = y; b >= 0 && b < T && b != (o > 0 ? T : -1); b += p) {
        var E = H.children[b];
        if (E.className.indexOf("hidden") === -1 && ke(E.dateObj) && Math.abs(n.$i - b) >= Math.abs(o))
          return re(E);
      }
    e.changeMonth(p), C(le(p), 0);
  }
  function C(n, o) {
    var r = c(), l = Oe(r || document.body), p = n !== void 0 ? n : l ? r : e.selectedDateElem !== void 0 && Oe(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Oe(e.todayDateElem) ? e.todayDateElem : le(o > 0 ? 1 : -1);
    p === void 0 ? e._input.focus() : l ? pe(p, o) : re(p);
  }
  function B(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, l = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), p = e.utils.getDaysInMonth(o, n), w = window.document.createDocumentFragment(), H = e.config.showMonths > 1, y = H ? "prevMonthDay hidden" : "prevMonthDay", T = H ? "nextMonthDay hidden" : "nextMonthDay", b = l + 1 - r, E = 0; b <= l; b++, E++)
      w.appendChild(ae("flatpickr-day " + y, new Date(n, o - 1, b), b, E));
    for (b = 1; b <= p; b++, E++)
      w.appendChild(ae("flatpickr-day", new Date(n, o, b), b, E));
    for (var Y = p + 1; Y <= 42 - r && (e.config.showMonths === 1 || E % 7 !== 0); Y++, E++)
      w.appendChild(ae("flatpickr-day " + T, new Date(n, o + 1, Y % p), Y, E));
    var de = O("div", "dayContainer");
    return de.appendChild(w), de;
  }
  function F() {
    if (e.daysContainer !== void 0) {
      ze(e.daysContainer), e.weekNumbers && ze(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(B(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Ie();
    }
  }
  function z() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(l) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && l < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && l > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = O("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = Ke(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function ue() {
    var n = O("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = O("span", "cur-month") : (e.monthsDropdownContainer = O("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), _(e.monthsDropdownContainer, "change", function(H) {
      var y = te(H), T = parseInt(y.value, 10);
      e.changeMonth(T - e.currentMonth), V("onMonthChange");
    }), z(), r = e.monthsDropdownContainer);
    var l = Ve("cur-year", { tabindex: "-1" }), p = l.getElementsByTagName("input")[0];
    p.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && p.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (p.setAttribute("max", e.config.maxDate.getFullYear().toString()), p.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var w = O("div", "flatpickr-current-month");
    return w.appendChild(r), w.appendChild(l), o.appendChild(w), n.appendChild(o), {
      container: n,
      yearElement: p,
      monthElement: r
    };
  }
  function ye() {
    ze(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = ue();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function fe() {
    return e.monthNav = O("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = O("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = O("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, ye(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (U(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (U(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], Pe(), e.monthNav;
  }
  function we() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = at(e.config);
    e.timeContainer = O("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = O("span", "flatpickr-time-separator", ":"), r = Ve("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var l = Ve("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = l.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Q(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = Q(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(l), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var p = Ve("flatpickr-second");
      e.secondElement = p.getElementsByTagName("input")[0], e.secondElement.value = Q(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(O("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(p);
    }
    return e.config.time_24hr || (e.amPM = O("span", "flatpickr-am-pm", e.l10n.amPM[ie((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function $e() {
    e.weekdayContainer ? ze(e.weekdayContainer) : e.weekdayContainer = O("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = O("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return M(), e.weekdayContainer;
  }
  function M() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = kt(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = kt(o.splice(n, o.length), o.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + o.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function P() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = O("div", "flatpickr-weekwrapper");
    n.appendChild(O("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = O("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function Z(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, V("onYearChange"), z()), F(), V("onMonthChange"), Pe());
  }
  function xe(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = at(e.config), l = r.hours, p = r.minutes, w = r.seconds;
      D(l, p, w);
    }
    e.redraw(), n && V("onChange");
  }
  function Dt() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), V("onClose");
  }
  function _t() {
    e.config !== void 0 && V("onDestroy");
    for (var n = e._handlers.length; n--; )
      e._handlers[n].remove();
    if (e._handlers = [], e.mobileInput)
      e.mobileInput.parentNode && e.mobileInput.parentNode.removeChild(e.mobileInput), e.mobileInput = void 0;
    else if (e.calendarContainer && e.calendarContainer.parentNode)
      if (e.config.static && e.calendarContainer.parentNode) {
        var o = e.calendarContainer.parentNode;
        if (o.lastChild && o.removeChild(o.lastChild), o.parentNode) {
          for (; o.firstChild; )
            o.parentNode.insertBefore(o.firstChild, o);
          o.parentNode.removeChild(o);
        }
      } else
        e.calendarContainer.parentNode.removeChild(e.calendarContainer);
    e.altInput && (e.input.type = "text", e.altInput.parentNode && e.altInput.parentNode.removeChild(e.altInput), delete e.altInput), e.input && (e.input.type = e.input._type, e.input.classList.remove("flatpickr-input"), e.input.removeAttribute("readonly")), [
      "_showTimeInput",
      "latestSelectedDateObj",
      "_hideNextMonthArrow",
      "_hidePrevMonthArrow",
      "__hideNextMonthArrow",
      "__hidePrevMonthArrow",
      "isMobile",
      "isOpen",
      "selectedDateElem",
      "minDateHasTime",
      "maxDateHasTime",
      "days",
      "daysContainer",
      "_input",
      "_positionElement",
      "innerContainer",
      "rContainer",
      "monthNav",
      "todayDateElem",
      "calendarContainer",
      "weekdayContainer",
      "prevMonthNav",
      "nextMonthNav",
      "monthsDropdownContainer",
      "currentMonthElement",
      "currentYearElement",
      "navigationCurrentMonth",
      "selectedDateElem",
      "config"
    ].forEach(function(r) {
      try {
        delete e[r];
      } catch {
      }
    });
  }
  function He(n) {
    return e.calendarContainer.contains(n);
  }
  function qe(n) {
    if (e.isOpen && !e.config.inline) {
      var o = te(n), r = He(o), l = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), p = !l && !r && !He(n.relatedTarget), w = !e.config.ignoredFocusElements.some(function(H) {
        return H.contains(o);
      });
      p && w && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && f(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function Fe(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), V("onYearChange"), z());
    }
  }
  function ke(n, o) {
    var r;
    o === void 0 && (o = !0);
    var l = e.parseDate(n, void 0, o);
    if (e.config.minDate && l && ne(l, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && l && ne(l, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (l === void 0)
      return !1;
    for (var p = !!e.config.enable, w = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, H = 0, y = void 0; H < w.length; H++) {
      if (y = w[H], typeof y == "function" && y(l))
        return p;
      if (y instanceof Date && l !== void 0 && y.getTime() === l.getTime())
        return p;
      if (typeof y == "string") {
        var T = e.parseDate(y, void 0, !0);
        return T && T.getTime() === l.getTime() ? p : !p;
      } else if (typeof y == "object" && l !== void 0 && y.from && y.to && l.getTime() >= y.from.getTime() && l.getTime() <= y.to.getTime())
        return p;
    }
    return !p;
  }
  function Oe(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Et(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== Qe();
    o && r && !(n.relatedTarget && He(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function dt(n) {
    var o = te(n), r = e.config.wrap ? t.contains(o) : o === e._input, l = e.config.allowInput, p = e.isOpen && (!l || !r), w = e.config.inline && r && !l;
    if (n.keyCode === 13 && r) {
      if (l)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (He(o) || p || w) {
      var H = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          H ? (n.preventDefault(), f(), Ue()) : gt(n);
          break;
        case 27:
          n.preventDefault(), Ue();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!H && !r) {
            n.preventDefault();
            var y = c();
            if (e.daysContainer !== void 0 && (l === !1 || y && Oe(y))) {
              var T = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), Z(T), C(le(1), 0)) : C(void 0, T);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var b = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), Fe(e.currentYear - b), C(le(1), 0)) : H || C(void 0, b * 7) : o === e.currentYearElement ? Fe(e.currentYear - b) : e.config.enableTime && (!H && e.hourElement && e.hourElement.focus(), f(n), e._debouncedChange());
          break;
        case 9:
          if (H) {
            var E = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(ee) {
              return ee;
            }), Y = E.indexOf(o);
            if (Y !== -1) {
              var de = E[Y + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (de || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(o) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && o === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], m(), he();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], m(), he();
          break;
      }
    (r || He(o)) && V("onKeyDown", n);
  }
  function Ie(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), l = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), p = Math.min(r, e.selectedDates[0].getTime()), w = Math.max(r, e.selectedDates[0].getTime()), H = !1, y = 0, T = 0, b = p; b < w; b += No.DAY)
        ke(new Date(b), !0) || (H = H || b > p && b < w, b < l && (!y || b > y) ? y = b : b > l && (!T || b < T) && (T = b));
      var E = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      E.forEach(function(Y) {
        var de = Y.dateObj, ee = de.getTime(), Te = y > 0 && ee < y || T > 0 && ee > T;
        if (Te) {
          Y.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(Me) {
            Y.classList.remove(Me);
          });
          return;
        } else if (H && !Te)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(Me) {
          Y.classList.remove(Me);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), l < r && ee === l ? Y.classList.add("startRange") : l > r && ee === l && Y.classList.add("endRange"), ee >= y && (T === 0 || ee <= T) && Oo(ee, l, r) && Y.classList.add("inRange"));
      });
    }
  }
  function St() {
    e.isOpen && !e.config.static && !e.config.inline && Ne();
  }
  function jt(n, o) {
    if (o === void 0 && (o = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = te(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), V("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var l = e.isOpen;
    e.isOpen = !0, l || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), V("onOpen"), Ne(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function ct(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), l = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(p) {
        return ke(p);
      }), !e.selectedDates.length && n === "min" && j(r), he()), e.daysContainer && (ht(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!l && r !== void 0 && l.getFullYear() === r.getFullYear());
    };
  }
  function Ht() {
    var n = [
      "wrap",
      "weekNumbers",
      "allowInput",
      "allowInvalidPreload",
      "clickOpens",
      "time_24hr",
      "enableTime",
      "noCalendar",
      "altInput",
      "shorthandCurrentMonth",
      "inline",
      "static",
      "enableSeconds",
      "disableMobile"
    ], o = G(G({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(E) {
        e.config._enable = mt(E);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(E) {
        e.config._disable = mt(E);
      }
    });
    var l = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || l)) {
      var p = K.defaultConfig.dateFormat || Ce.dateFormat;
      r.dateFormat = o.noCalendar || l ? "H:i" + (o.enableSeconds ? ":S" : "") : p + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || l) && !o.altFormat) {
      var w = K.defaultConfig.altFormat || Ce.altFormat;
      r.altFormat = o.noCalendar || l ? "h:i" + (o.enableSeconds ? ":S K" : " K") : w + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: ct("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: ct("max")
    });
    var H = function(E) {
      return function(Y) {
        e.config[E === "min" ? "_minTime" : "_maxTime"] = e.parseDate(Y, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: H("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: H("max")
    }), o.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, o);
    for (var y = 0; y < n.length; y++)
      e.config[n[y]] = e.config[n[y]] === !0 || e.config[n[y]] === "true";
    et.filter(function(E) {
      return e.config[E] !== void 0;
    }).forEach(function(E) {
      e.config[E] = tt(e.config[E] || []).map(h);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var y = 0; y < e.config.plugins.length; y++) {
      var T = e.config.plugins[y](e) || {};
      for (var b in T)
        et.indexOf(b) > -1 ? e.config[b] = tt(T[b]).map(h).concat(e.config[b]) : typeof o[b] > "u" && (e.config[b] = T[b]);
    }
    o.altInputClass || (e.config.altInputClass = ut().className + " " + e.config.altInputClass), V("onParseConfig");
  }
  function ut() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function ft() {
    typeof e.config.locale != "object" && typeof K.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = G(G({}, K.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? K.l10ns[e.config.locale] : void 0), be.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", be.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", be.M = "(" + e.l10n.months.shorthand.join("|") + ")", be.F = "(" + e.l10n.months.longhand.join("|") + ")", be.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = G(G({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && K.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Mt(e), e.parseDate = st({ config: e.config, l10n: e.l10n });
  }
  function Ne(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      V("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(Ut, Jt) {
        return Ut + Jt.offsetHeight;
      }, 0), l = e.calendarContainer.offsetWidth, p = e.config.position.split(" "), w = p[0], H = p.length > 1 ? p[1] : null, y = o.getBoundingClientRect(), T = window.innerHeight - y.bottom, b = w === "above" || w !== "below" && T < r && y.top > r, E = window.pageYOffset + y.top + (b ? -r - 2 : o.offsetHeight + 2);
      if (U(e.calendarContainer, "arrowTop", !b), U(e.calendarContainer, "arrowBottom", b), !e.config.inline) {
        var Y = window.pageXOffset + y.left, de = !1, ee = !1;
        H === "center" ? (Y -= (l - y.width) / 2, de = !0) : H === "right" && (Y -= l - y.width, ee = !0), U(e.calendarContainer, "arrowLeft", !de && !ee), U(e.calendarContainer, "arrowCenter", de), U(e.calendarContainer, "arrowRight", ee);
        var Te = window.document.body.offsetWidth - (window.pageXOffset + y.right), Me = Y + l > window.document.body.offsetWidth, zt = Te + l > window.document.body.offsetWidth;
        if (U(e.calendarContainer, "rightMost", Me), !e.config.static)
          if (e.calendarContainer.style.top = E + "px", !Me)
            e.calendarContainer.style.left = Y + "px", e.calendarContainer.style.right = "auto";
          else if (!zt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = Te + "px";
          else {
            var Xe = Tt();
            if (Xe === void 0)
              return;
            var Vt = window.document.body.offsetWidth, Rt = Math.max(0, Vt / 2 - l / 2), Wt = ".flatpickr-calendar.centerMost:before", Kt = ".flatpickr-calendar.centerMost:after", Gt = Xe.cssRules.length, qt = "{left:" + y.left + "px;right:auto;}";
            U(e.calendarContainer, "rightMost", !1), U(e.calendarContainer, "centerMost", !0), Xe.insertRule(Wt + "," + Kt + qt, Gt), e.calendarContainer.style.left = Rt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function Tt() {
    for (var n = null, o = 0; o < document.styleSheets.length; o++) {
      var r = document.styleSheets[o];
      if (r.cssRules) {
        try {
          r.cssRules;
        } catch {
          continue;
        }
        n = r;
        break;
      }
    }
    return n ?? At();
  }
  function At() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function ht() {
    e.config.noCalendar || e.isMobile || (z(), Pe(), F());
  }
  function Ue() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function gt(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(E) {
      return E.classList && E.classList.contains("flatpickr-day") && !E.classList.contains("flatpickr-disabled") && !E.classList.contains("notAllowed");
    }, r = xt(te(n), o);
    if (r !== void 0) {
      var l = r, p = e.latestSelectedDateObj = new Date(l.dateObj.getTime()), w = (p.getMonth() < e.currentMonth || p.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = l, e.config.mode === "single")
        e.selectedDates = [p];
      else if (e.config.mode === "multiple") {
        var H = Ze(p);
        H ? e.selectedDates.splice(parseInt(H), 1) : e.selectedDates.push(p);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = p, e.selectedDates.push(p), ne(p, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(E, Y) {
        return E.getTime() - Y.getTime();
      }));
      if (m(), w) {
        var y = e.currentYear !== p.getFullYear();
        e.currentYear = p.getFullYear(), e.currentMonth = p.getMonth(), y && (V("onYearChange"), z()), V("onMonthChange");
      }
      if (Pe(), F(), he(), !w && e.config.mode !== "range" && e.config.showMonths === 1 ? re(l) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var T = e.config.mode === "single" && !e.config.enableTime, b = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (T || b) && Ue();
      }
      A();
    }
  }
  var Ye = {
    locale: [ft, M],
    showMonths: [ye, s, $e],
    minDate: [q],
    maxDate: [q],
    positionElement: [vt],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (_(e._input, "focus", e.open), _(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function Bt(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        Ye[r] !== void 0 && Ye[r].forEach(function(l) {
          return l();
        });
    } else
      e.config[n] = o, Ye[n] !== void 0 ? Ye[n].forEach(function(l) {
        return l();
      }) : et.indexOf(n) > -1 && (e.config[n] = tt(o));
    e.redraw(), he(!0);
  }
  function pt(n, o) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(l) {
        return e.parseDate(l, o);
      });
    else if (n instanceof Date || typeof n == "number")
      r = [e.parseDate(n, o)];
    else if (typeof n == "string")
      switch (e.config.mode) {
        case "single":
        case "time":
          r = [e.parseDate(n, o)];
          break;
        case "multiple":
          r = n.split(e.config.conjunction).map(function(l) {
            return e.parseDate(l, o);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(l) {
            return e.parseDate(l, o);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(l) {
      return l instanceof Date && ke(l, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(l, p) {
      return l.getTime() - p.getTime();
    });
  }
  function Lt(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    pt(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), q(void 0, o), j(), e.selectedDates.length === 0 && e.clear(!1), he(o), o && V("onChange");
  }
  function mt(n) {
    return n.slice().map(function(o) {
      return typeof o == "string" || typeof o == "number" || o instanceof Date ? e.parseDate(o, void 0, !0) : o && typeof o == "object" && o.from && o.to ? {
        from: e.parseDate(o.from, void 0),
        to: e.parseDate(o.to, void 0)
      } : o;
    }).filter(function(o) {
      return o;
    });
  }
  function $t() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && pt(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function Ft() {
    if (e.input = ut(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = O(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), vt();
  }
  function vt() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function Ot() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = O("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    _(e.mobileInput, "change", function(o) {
      e.setDate(te(o).value, !1, e.mobileFormatStr), V("onChange"), V("onClose");
    });
  }
  function It(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function V(n, o) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var l = 0; r[l] && l < r.length; l++)
          r[l](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(Je("change")), e.input.dispatchEvent(Je("input")));
    }
  }
  function Je(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function Ze(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var r = e.selectedDates[o];
      if (r instanceof Date && ne(r, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function Nt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : ne(n, e.selectedDates[0]) >= 0 && ne(n, e.selectedDates[1]) <= 0;
  }
  function Pe() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = Ke(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function Qe(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, o);
    }).filter(function(r, l, p) {
      return e.config.mode !== "range" || e.config.enableTime || p.indexOf(r) === l;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function he(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = Qe(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = Qe(e.config.altFormat)), n !== !1 && V("onValueUpdate");
  }
  function Yt(n) {
    var o = te(n), r = e.prevMonthNav.contains(o), l = e.nextMonthNav.contains(o);
    r || l ? Z(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function Pt(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = te(n), l = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[ie(e.amPM.textContent === e.l10n.amPM[0])]);
    var p = parseFloat(l.getAttribute("min")), w = parseFloat(l.getAttribute("max")), H = parseFloat(l.getAttribute("step")), y = parseInt(l.value, 10), T = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), b = y + H * T;
    if (typeof l.value < "u" && l.value.length === 2) {
      var E = l === e.hourElement, Y = l === e.minuteElement;
      b < p ? (b = w + b + ie(!E) + (ie(E) && ie(!e.amPM)), Y && se(void 0, -1, e.hourElement)) : b > w && (b = l === e.hourElement ? b - w - ie(!e.amPM) : p, Y && se(void 0, 1, e.hourElement)), e.amPM && E && (H === 1 ? b + y === 23 : Math.abs(b - y) > H) && (e.amPM.textContent = e.l10n.amPM[ie(e.amPM.textContent === e.l10n.amPM[0])]), l.value = Q(b);
    }
  }
  return d(), e;
}
function De(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(h) {
    return h instanceof HTMLElement;
  }), u = [], d = 0; d < e.length; d++) {
    var c = e[d];
    try {
      if (c.getAttribute("data-fp-omit") !== null)
        continue;
      c._flatpickr !== void 0 && (c._flatpickr.destroy(), c._flatpickr = void 0), c._flatpickr = Po(c, a || {}), u.push(c._flatpickr);
    } catch (h) {
      console.error(h);
    }
  }
  return u.length === 1 ? u[0] : u;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return De(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return De([this], t);
});
var K = function(t, a) {
  return typeof t == "string" ? De(window.document.querySelectorAll(t), a) : t instanceof Node ? De([t], a) : De(t, a);
};
K.defaultConfig = {};
K.l10ns = {
  en: G({}, Le),
  default: G({}, Le)
};
K.localize = function(t) {
  K.l10ns.default = G(G({}, K.l10ns.default), t);
};
K.setDefaults = function(t) {
  K.defaultConfig = G(G({}, K.defaultConfig), t);
};
K.parseDate = st({});
K.formatDate = Mt({});
K.compareDates = ne;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return De(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = K);
var zo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Vo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Ct = { exports: {} };
(function(t, a) {
  (function(e, u) {
    t.exports = u();
  })(zo, function() {
    /*! *****************************************************************************
    	    Copyright (c) Microsoft Corporation.
    
    	    Permission to use, copy, modify, and/or distribute this software for any
    	    purpose with or without fee is hereby granted.
    
    	    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    	    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    	    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    	    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    	    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    	    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    	    PERFORMANCE OF THIS SOFTWARE.
    	    ***************************************************************************** */
    var e = function() {
      return e = Object.assign || function(x) {
        for (var i, m = 1, j = arguments.length; m < j; m++) {
          i = arguments[m];
          for (var D in i) Object.prototype.hasOwnProperty.call(i, D) && (x[D] = i[D]);
        }
        return x;
      }, e.apply(this, arguments);
    }, u = function(f, x, i) {
      return i.months[x ? "shorthand" : "longhand"][f];
    };
    function d(f) {
      for (; f.firstChild; )
        f.removeChild(f.firstChild);
    }
    function c(f) {
      try {
        if (typeof f.composedPath == "function") {
          var x = f.composedPath();
          return x[0];
        }
        return f.target;
      } catch {
        return f.target;
      }
    }
    var h = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function s(f) {
      var x = e(e({}, h), f);
      return function(i) {
        i.config.dateFormat = x.dateFormat, i.config.altFormat = x.altFormat;
        var m = { monthsContainer: null };
        function j() {
          if (i.rContainer) {
            d(i.rContainer);
            for (var C = 0; C < i.monthElements.length; C++) {
              var B = i.monthElements[C];
              B.parentNode && B.parentNode.removeChild(B);
            }
          }
        }
        function D() {
          i.rContainer && (m.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), m.monthsContainer.tabIndex = -1, S(), i.rContainer.appendChild(m.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + x.theme));
        }
        function S() {
          if (m.monthsContainer) {
            d(m.monthsContainer);
            for (var C = document.createDocumentFragment(), B = 0; B < 12; B++) {
              var F = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, B), 0, B);
              F.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && F.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && F.classList.add("today"), F.textContent = u(B, x.shorthand, i.l10n), F.addEventListener("click", q), C.appendChild(F);
            }
            m.monthsContainer.appendChild(C), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function _() {
          i._bind(i.prevMonthNav, "click", function(C) {
            C.preventDefault(), C.stopPropagation(), i.changeYear(i.currentYear - 1), J(), S();
          }), i._bind(i.nextMonthNav, "click", function(C) {
            C.preventDefault(), C.stopPropagation(), i.changeYear(i.currentYear + 1), J(), S();
          }), i._bind(m.monthsContainer, "mouseover", function(C) {
            i.config.mode === "range" && i.onMouseOver(c(C), "flatpickr-monthSelect-month");
          });
        }
        function A() {
          if (i.rContainer && i.selectedDates.length) {
            for (var C = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), B = 0; B < C.length; B++)
              C[B].classList.remove("selected");
            var F = i.selectedDates[0].getMonth(), z = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (F + 1) + ")");
            z && z.classList.add("selected");
          }
        }
        function J() {
          var C = i.selectedDates[0];
          if (C && (C = new Date(C), C.setFullYear(i.currentYear), i.config.minDate && C < i.config.minDate && (C = i.config.minDate), i.config.maxDate && C > i.config.maxDate && (C = i.config.maxDate), i.currentYear = C.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var B = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            B.forEach(function(F) {
              F.dateObj.setFullYear(i.currentYear), i.config.minDate && F.dateObj < i.config.minDate || i.config.maxDate && F.dateObj > i.config.maxDate ? F.classList.add("flatpickr-disabled") : F.classList.remove("flatpickr-disabled");
            });
          }
          A();
        }
        function q(C) {
          C.preventDefault(), C.stopPropagation();
          var B = c(C);
          if (B instanceof Element && !B.classList.contains("flatpickr-disabled") && !B.classList.contains("notAllowed") && (oe(B.dateObj), i.config.closeOnSelect)) {
            var F = i.config.mode === "single", z = i.config.mode === "range" && i.selectedDates.length === 2;
            (F || z) && i.close();
          }
        }
        function oe(C) {
          var B = new Date(i.currentYear, C.getMonth(), C.getDate()), F = [];
          switch (i.config.mode) {
            case "single":
              F = [B];
              break;
            case "multiple":
              F.push(B);
              break;
            case "range":
              i.selectedDates.length === 2 ? F = [B] : (F = i.selectedDates.concat([B]), F.sort(function(z, ue) {
                return z.getTime() - ue.getTime();
              }));
              break;
          }
          i.setDate(F, !0), A();
        }
        var se = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ve(C, B, F, z) {
          var ue = se[z.keyCode] !== void 0;
          if (!(!ue && z.keyCode !== 13) && !(!i.rContainer || !m.monthsContainer)) {
            var ye = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), fe = Array.prototype.indexOf.call(m.monthsContainer.children, document.activeElement);
            if (fe === -1) {
              var we = ye || m.monthsContainer.firstElementChild;
              we.focus(), fe = we.$i;
            }
            ue ? m.monthsContainer.children[(12 + fe + se[z.keyCode]) % 12].focus() : z.keyCode === 13 && m.monthsContainer.contains(document.activeElement) && oe(document.activeElement.dateObj);
          }
        }
        function ae() {
          var C;
          ((C = i.config) === null || C === void 0 ? void 0 : C.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || S();
        }
        function re() {
          x._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(x._stubbedCurrentMonth), i.currentMonth = x._stubbedCurrentMonth;
        }
        function le() {
          x._stubbedCurrentMonth && (i._initialDate.setMonth(x._stubbedCurrentMonth), i.currentMonth = x._stubbedCurrentMonth, delete x._stubbedCurrentMonth);
        }
        function pe() {
          if (m.monthsContainer !== null)
            for (var C = m.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), B = 0; B < C.length; B++)
              C[B].removeEventListener("click", q);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: A,
          onKeyDown: ve,
          onReady: [
            re,
            j,
            D,
            _,
            A,
            function() {
              i.config.onClose.push(ae), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            le,
            pe,
            function() {
              i.config.onClose = i.config.onClose.filter(function(C) {
                return C !== ae;
              });
            }
          ]
        };
      };
    }
    return s;
  });
})(Ct);
var Ro = Ct.exports;
const Wo = /* @__PURE__ */ Vo(Ro), Ko = { class: "relative" }, Go = ["placeholder", "disabled", "readonly"], qo = {
  key: 0,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, Uo = { class: "flex items-center justify-between mb-2" }, Jo = { class: "text-xs opacity-70" }, Zo = { class: "grid grid-cols-4 gap-2" }, Qo = ["onClick"], xa = /* @__PURE__ */ R({
  __name: "DateTimePicker",
  props: {
    modelValue: {},
    mode: { default: "single" },
    picker: { default: "date" },
    enableTime: { type: Boolean, default: !1 },
    noCalendar: { type: Boolean, default: !1 },
    dateFormat: {},
    placeholder: { default: "" },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    minDate: {},
    maxDate: {},
    time24hr: { type: Boolean, default: !0 },
    inputClass: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: a }) {
    const e = t, u = a, d = X(null), c = X(!1), h = X((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let s = null;
    const f = L(() => e.picker === "month" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), x = () => {
      var S, _;
      if (d.value) {
        if (e.picker === "year-grid") {
          (S = s == null ? void 0 : s.destroy) == null || S.call(s), s = null;
          return;
        }
        (_ = s == null ? void 0 : s.destroy) == null || _.call(s), s = K(d.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Wo({
              shorthand: !0,
              dateFormat: f.value,
              altFormat: "F Y"
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: f.value,
          time_24hr: e.time24hr,
          clickOpens: !0,
          allowInput: !1,
          appendTo: document.body,
          minDate: e.minDate || void 0,
          maxDate: e.maxDate || void 0,
          defaultDate: e.modelValue,
          onReady: () => {
            var A;
            e.picker === "year" && ((A = s == null ? void 0 : s.calendarContainer) == null || A.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var A;
            e.picker === "year" && ((A = s == null ? void 0 : s.calendarContainer) == null || A.classList.add("flatpickr-year-only"));
          },
          onChange: (A) => {
            if (e.mode === "range") {
              const J = A.map(
                (q) => s.formatDate(q, f.value)
              );
              u("update:modelValue", J);
            } else {
              const J = A[0] ? s.formatDate(A[0], f.value) : "";
              u("update:modelValue", J);
            }
          }
        });
      }
    }, i = () => {
      var S;
      if (e.picker === "year-grid") {
        c.value = !0;
        return;
      }
      (S = s == null ? void 0 : s.open) == null || S.call(s);
    };
    rt(x), it(() => {
      var S;
      return (S = s == null ? void 0 : s.destroy) == null ? void 0 : S.call(s);
    }), ce(
      () => [
        e.mode,
        e.picker,
        e.enableTime,
        e.noCalendar,
        e.dateFormat,
        e.time24hr,
        e.minDate,
        e.maxDate
      ],
      x
    ), ce(
      () => e.modelValue,
      (S) => {
        !s || e.picker === "year-grid" || s.setDate(S, !1);
      }
    );
    const m = L(
      () => Array.from({ length: 12 }, (S, _) => h.value + _)
    ), j = (S) => {
      u("update:modelValue", S.toString()), c.value = !1;
    }, D = (S) => {
      if (!c.value) return;
      const _ = S.target;
      if (d.value && _ && d.value.contains(_)) return;
      const A = document.querySelector(".mitreka-year-grid");
      A && _ && A.contains(_) || (c.value = !1);
    };
    return rt(() => document.addEventListener("click", D)), it(() => document.removeEventListener("click", D)), (S, _) => (v(), k("div", Ko, [
      g("input", {
        ref_key: "inputEl",
        ref: d,
        class: $(["input w-full", t.inputClass]),
        placeholder: t.placeholder,
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: i,
        onFocus: i
      }, null, 42, Go),
      t.picker === "year-grid" && c.value ? (v(), k("div", qo, [
        g("div", Uo, [
          g("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: _[0] || (_[0] = (A) => h.value -= 12)
          }, " Prev "),
          g("div", Jo, I(h.value) + " - " + I(h.value + 11), 1),
          g("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: _[1] || (_[1] = (A) => h.value += 12)
          }, " Next ")
        ]),
        g("div", Zo, [
          (v(!0), k(ge, null, Se(m.value, (A) => (v(), k("button", {
            key: A,
            class: $(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === A.toString() }]),
            type: "button",
            onClick: (J) => j(A)
          }, I(A), 11, Qo))), 128))
        ])
      ])) : N("", !0)
    ]));
  }
}), Ma = /* @__PURE__ */ R({
  inheritAttrs: !1,
  __name: "AgGridSurface",
  props: {
    density: { default: "cozy" },
    striped: { type: Boolean, default: !0 },
    themeMode: { default: "auto" },
    autoObserveTheme: { type: Boolean, default: !0 },
    autoRowHeight: { type: Boolean, default: !0 },
    autoHeaderHeight: { type: Boolean, default: !0 },
    autoHeightWhenFewRows: { type: Boolean, default: !0 },
    autoHeightThreshold: { default: 15 },
    normalLayoutHeight: { default: "80vh" },
    pinnedShadows: { type: Boolean, default: !0 }
  },
  emits: ["grid-ready"],
  setup(t, { emit: a }) {
    const e = t, u = a, d = an(), c = X(null), h = X(null), s = X(13), f = X(!1);
    let x = null, i = null;
    const m = ["modelUpdated", "paginationChanged", "filterChanged", "rowDataUpdated"], j = [], D = X("normal"), S = L(() => [
      "w-full",
      D.value === "autoHeight" ? "h-auto" : "h-full"
    ]), _ = L(() => D.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), A = () => {
      const M = document.documentElement, P = M.classList.contains("dark"), Z = (M.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      f.value = P || Z;
    }, J = L(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : f.value), q = L(() => J.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), oe = L(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), se = L(() => ["agx", q.value, oe.value, d.class]), ve = L(() => [{ "--ag-odd-row-background-color": e.striped ? J.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, d.style]), ae = L(() => {
      const { class: M, style: P, onGridReady: Z, ...xe } = d;
      return xe;
    }), re = (M) => typeof M == "number" && Number.isFinite(M) ? M : void 0, le = L(() => {
      const M = d.gridOptions;
      if (M && typeof M == "object") return M;
      const P = d["grid-options"];
      return P && typeof P == "object" ? P : {};
    }), pe = (M) => {
      const P = re(d[M]);
      if (typeof P == "number") return P;
      const xe = re(d[M === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof xe == "number" ? xe : re(le.value[M]);
    }, C = () => {
      const M = d.domLayout;
      if (typeof M == "string" && M.length > 0) return M;
      const P = d["dom-layout"];
      if (typeof P == "string" && P.length > 0) return P;
      const Z = le.value.domLayout;
      return typeof Z == "string" && Z.length > 0 ? Z : void 0;
    }, B = () => {
      if (!h.value) return 0;
      if (typeof h.value.paginationGetRowCount == "function") {
        const M = h.value.paginationGetRowCount();
        if (Number.isFinite(M)) return M;
      }
      if (typeof h.value.getDisplayedRowCount == "function") {
        const M = h.value.getDisplayedRowCount();
        if (Number.isFinite(M)) return M;
      }
      return 0;
    }, F = () => {
      const M = Number(e.autoHeightThreshold);
      return Number.isFinite(M) ? Math.max(1, Math.floor(M)) : 15;
    }, z = () => {
      if (!h.value) return;
      const M = C();
      if (M) {
        D.value = M, h.value.setGridOption("domLayout", M);
        return;
      }
      const P = e.autoHeightWhenFewRows && B() < F() ? "autoHeight" : "normal";
      D.value = P, h.value.setGridOption("domLayout", P);
    }, ue = () => {
      var M;
      for (; j.length > 0; )
        (M = j.pop()) == null || M();
    }, ye = () => {
      if (!h.value) return;
      ue();
      const M = () => z();
      m.forEach((P) => {
        h.value.addEventListener(P, M), j.push(() => {
          var Z;
          (Z = h.value) == null || Z.removeEventListener(P, M);
        });
      });
    }, fe = () => {
      if (!e.autoHeaderHeight || !h.value) return;
      const M = pe("headerHeight") ?? cn(e.density), P = pe("groupHeaderHeight") ?? un(e.density);
      h.value.setGridOption("headerHeight", M), h.value.setGridOption("groupHeaderHeight", P);
    }, we = () => {
      if (!e.autoRowHeight || !h.value) return;
      const M = fn(s.value, e.density);
      h.value.setGridOption("rowHeight", M), h.value.setGridOption("getRowHeight", () => M), h.value.resetRowHeights();
    }, $e = (M) => {
      h.value = M.api, s.value = hn(c.value), ye(), fe(), z(), we(), u("grid-ready", M);
    };
    return ce(
      () => e.density,
      () => {
        var M;
        fe(), we(), (M = h.value) == null || M.refreshCells({ force: !0 });
      }
    ), ce(
      () => [
        d.headerHeight,
        d["header-height"],
        d.groupHeaderHeight,
        d["group-header-height"],
        d.gridOptions,
        d["grid-options"]
      ],
      () => {
        fe();
      }
    ), ce(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        z();
      }
    ), ce(
      () => [d.domLayout, d["dom-layout"], d.gridOptions, d["grid-options"]],
      () => {
        z();
      }
    ), rt(() => {
      A(), e.autoObserveTheme && (x = new MutationObserver(A), x.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && c.value && (i = dn(c.value));
    }), it(() => {
      x == null || x.disconnect(), ue(), i == null || i();
    }), (M, P) => (v(), k("div", {
      ref_key: "hostRef",
      ref: c,
      class: $(S.value),
      style: me(_.value)
    }, [
      Ee(je(gn), rn(ae.value, {
        class: se.value,
        theme: "legacy",
        style: ve.value,
        onGridReady: $e
      }), null, 16, ["class", "style"])
    ], 6));
  }
});
export {
  na as _,
  oa as a,
  aa as b,
  ra as c,
  ia as d,
  sa as e,
  la as f,
  On as g,
  da as h,
  ca as i,
  ua as j,
  fa as k,
  ha as l,
  ga as m,
  pa as n,
  ma as o,
  va as p,
  wa as q,
  ka as r,
  ya as s,
  xa as t,
  Ma as u,
  yt as v,
  ba as w
};
