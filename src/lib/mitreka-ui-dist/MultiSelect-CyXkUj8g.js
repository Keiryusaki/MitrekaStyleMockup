import { defineComponent as ee, createElementBlock as v, openBlock as p, normalizeClass as $, createCommentVNode as G, renderSlot as le, createElementVNode as h, ref as B, watch as se, withKeys as lt, withModifiers as Te, createBlock as Ge, Teleport as ut, createVNode as ce, Transition as Xe, withCtx as Qe, toDisplayString as V, provide as nn, inject as an, computed as A, normalizeStyle as ge, createTextVNode as zt, Fragment as ye, renderList as ze, unref as H, useSlots as on, resolveDynamicComponent as rn, reactive as sn, withDirectives as jt, vModelText as Tt, onMounted as dt, onBeforeUnmount as ct, useAttrs as ln, mergeProps as dn, nextTick as Fe, isRef as It } from "vue";
import { d as cn, c as un, f as fn, h as hn, i as pn, g as gn, r as vn, a as mn, b as wn } from "./useAgGridRowHeight-CkXm93Od.js";
import { AgGridVue as bn } from "ag-grid-vue3";
const yn = ["disabled"], kn = {
  key: 0,
  class: "animate-spin"
}, zo = /* @__PURE__ */ ee({
  __name: "Button",
  props: {
    size: { default: "md" },
    variant: { default: "solid" },
    color: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(t, { emit: o }) {
    const e = t, f = o, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, u = () => {
      const { variant: i, color: d } = e;
      return d === "default" ? i === "outline" ? "btn-outline" : i === "ghost" ? "btn-ghost" : "" : i === "solid" ? `btn-${d}` : i === "outline" ? `btn-outline btn-outline-${d}` : i === "soft" ? `btn-soft-${d}` : i === "ghost" ? "btn-ghost" : "";
    }, g = (i) => {
      !e.disabled && !e.loading && f("click", i);
    };
    return (i, d) => (p(), v("button", {
      class: $(["btn", l[t.size], u()]),
      disabled: t.disabled || t.loading,
      onClick: g
    }, [
      t.loading ? (p(), v("span", kn, [...d[0] || (d[0] = [
        h("svg", {
          class: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24"
        }, [
          h("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }),
          h("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          })
        ], -1)
      ])])) : G("", !0),
      le(i.$slots, "default")
    ], 10, yn));
  }
}), Oo = /* @__PURE__ */ ee({
  __name: "Badge",
  props: {
    size: { default: "md" },
    variant: { default: "solid" },
    color: { default: "default" }
  },
  setup(t) {
    const o = t, e = {
      xxs: "badge-xxs",
      xs: "badge-xs",
      sm: "badge-sm",
      md: "",
      lg: "badge-lg",
      xl: "badge-xl"
    }, f = () => {
      const { variant: l, color: u } = o;
      return u === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${u}` : l === "outline" ? `badge-outline badge-outline-${u}` : l === "soft" ? `badge-soft-${u}` : "";
    };
    return (l, u) => (p(), v("span", {
      class: $(["badge", e[t.size], f()])
    }, [
      le(l.$slots, "default")
    ], 2));
  }
}), xn = ["role", "aria-expanded", "tabindex"], Mn = { class: "card-title" }, Cn = { class: "card-body-inner" }, Dn = {
  key: 3,
  class: "mt-4"
}, No = /* @__PURE__ */ ee({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const f = t, l = e, u = B(f.modelValue !== void 0 ? f.modelValue : f.defaultOpen);
    se(() => f.modelValue, (i) => {
      i !== void 0 && (u.value = i);
    });
    function g() {
      if (!f.collapsible) return;
      const i = !u.value;
      u.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return o({ isOpen: u, toggle: g }), (i, d) => (p(), v("section", {
      class: $(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      i.$slots.title ? (p(), v("header", {
        key: 0,
        class: $(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? u.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: g,
        onKeydown: [
          d[0] || (d[0] = lt((y) => t.collapsible && g(), ["enter"])),
          d[1] || (d[1] = lt(Te((y) => t.collapsible && g(), ["prevent"]), ["space"]))
        ]
      }, [
        h("div", Mn, [
          le(i.$slots, "title")
        ]),
        t.collapsible ? (p(), v("svg", {
          key: 0,
          class: $(["card-collapse-icon", { "is-open": u.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...d[2] || (d[2] = [
          h("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : G("", !0)
      ], 42, xn)) : G("", !0),
      t.collapsible ? (p(), v("div", {
        key: 1,
        class: $(["card-body-wrapper", { "is-open": u.value }])
      }, [
        h("div", Cn, [
          le(i.$slots, "default")
        ])
      ], 2)) : le(i.$slots, "default", { key: 2 }),
      i.$slots.footer ? (p(), v("footer", Dn, [
        le(i.$slots, "footer")
      ])) : G("", !0)
    ], 2));
  }
}), Sn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, En = { class: "text-xl font-semibold" }, Po = /* @__PURE__ */ ee({
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
  setup(t, { emit: o }) {
    const e = t, f = o, l = {
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
    }, u = () => {
      e.persistent || f("close");
    };
    return se(
      () => e.open,
      (g) => {
        g ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (g, i) => (p(), Ge(ut, { to: "body" }, [
      ce(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (p(), v("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: u
          })) : G("", !0)
        ]),
        _: 1
      }),
      ce(Xe, { name: "zoom" }, {
        default: Qe(() => [
          t.open ? (p(), v("div", {
            key: 0,
            class: $([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            h("div", {
              class: $([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? G("", !0) : (p(), v("div", Sn, [
                le(g.$slots, "header", {}, () => [
                  h("h3", En, V(t.title), 1)
                ]),
                h("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: i[0] || (i[0] = (d) => f("close"))
                }, [...i[3] || (i[3] = [
                  h("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    h("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])])
              ])),
              h("div", {
                class: $([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                le(g.$slots, "default")
              ], 2),
              t.hideFooter ? G("", !0) : (p(), v("div", {
                key: 1,
                class: $([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                le(g.$slots, "footer", {}, () => [
                  h("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: i[1] || (i[1] = (d) => f("close"))
                  }, V(t.cancelText), 1),
                  h("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: i[2] || (i[2] = (d) => f("confirm"))
                  }, V(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : G("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), _n = ["aria-expanded", "aria-disabled", "onKeydown"], Hn = { class: "collapse-title" }, $n = { class: "collapse-content" }, An = { class: "collapse-content-inner" }, jn = { class: "collapse-body" }, Yo = /* @__PURE__ */ ee({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const f = t, l = e, u = B(f.modelValue !== void 0 ? f.modelValue : f.defaultOpen);
    se(() => f.modelValue, (i) => {
      i !== void 0 && (u.value = i);
    });
    function g() {
      if (f.disabled) return;
      const i = !u.value;
      u.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return o({ isOpen: u, toggle: g }), (i, d) => (p(), v("div", {
      class: $([
        "collapse",
        `collapse-${t.variant}`,
        { "is-open": u.value }
      ])
    }, [
      h("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": u.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: g,
        onKeydown: [
          lt(g, ["enter"]),
          lt(Te(g, ["prevent"]), ["space"])
        ]
      }, [
        h("div", Hn, [
          le(i.$slots, "header", {}, () => [
            le(i.$slots, "title")
          ])
        ]),
        d[0] || (d[0] = h("svg", {
          class: "collapse-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          h("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, _n),
      h("div", $n, [
        h("div", An, [
          h("div", jn, [
            le(i.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Vo = /* @__PURE__ */ ee({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: o, emit: e }) {
    const f = t, l = e, u = B(/* @__PURE__ */ new Set());
    se(() => f.modelValue, (d) => {
      d === null ? u.value = /* @__PURE__ */ new Set() : Array.isArray(d) ? u.value = new Set(d) : u.value = /* @__PURE__ */ new Set([d]);
    }, { immediate: !0 });
    function g(d) {
      const y = new Set(u.value);
      y.has(d) ? y.delete(d) : (f.multiple || y.clear(), y.add(d)), u.value = y, f.multiple ? l("update:modelValue", Array.from(y)) : l("update:modelValue", y.size > 0 ? Array.from(y)[0] : null);
    }
    function i(d) {
      return u.value.has(d);
    }
    return nn("accordion", {
      toggleItem: g,
      isItemOpen: i
    }), o({ openItems: u, toggleItem: g }), (d, y) => (p(), v("div", {
      class: $(["accordion", `accordion-${t.variant}`])
    }, [
      le(d.$slots, "default")
    ], 2));
  }
}), Tn = ["aria-expanded", "aria-disabled", "onKeydown"], Bn = { class: "accordion-title" }, In = { class: "accordion-content" }, Ln = { class: "accordion-content-inner" }, Fn = { class: "accordion-body" }, Ro = /* @__PURE__ */ ee({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = t, e = an("accordion"), f = A(() => (e == null ? void 0 : e.isItemOpen(o.id)) ?? !1);
    function l() {
      o.disabled || e == null || e.toggleItem(o.id);
    }
    return (u, g) => (p(), v("div", {
      class: $(["accordion-item", { "is-open": f.value }])
    }, [
      h("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": f.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          lt(l, ["enter"]),
          lt(Te(l, ["prevent"]), ["space"])
        ]
      }, [
        h("div", Bn, [
          le(u.$slots, "header", {}, () => [
            le(u.$slots, "title")
          ])
        ]),
        g[0] || (g[0] = h("svg", {
          class: "accordion-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          h("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, Tn),
      h("div", In, [
        h("div", Ln, [
          h("div", Fn, [
            le(u.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), zn = { class: "loading-logo-wrapper" }, On = { class: "dots-container" }, Nn = ["width", "height"], Pn = {
  key: 0,
  class: "loading-text"
}, Yn = /* @__PURE__ */ ee({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const o = t, e = A(() => Math.round(o.size * (8 / 60)));
    return (f, l) => (p(), v("div", zn, [
      h("div", {
        class: "loading-logo-container",
        style: ge({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        h("div", On, [
          h("span", {
            class: "loading-dot dot-1 dot-blue",
            style: ge({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-2 dot-blue",
            style: ge({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-3 dot-black",
            style: ge({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-4 dot-black",
            style: ge({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-5 dot-red",
            style: ge({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-6 dot-red",
            style: ge({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (p(), v("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...l[0] || (l[0] = [
          h("polygon", {
            class: "logo-shape shape-blue",
            points: "11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
          }, null, -1),
          h("rect", {
            class: "logo-shape shape-black",
            x: "15.48",
            y: "8.73",
            width: "9.55",
            height: "9.55",
            transform: "translate(-3.61 18.27) rotate(-45)"
          }, null, -1),
          h("polygon", {
            class: "logo-shape shape-red",
            points: "40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
          }, null, -1)
        ])], 8, Nn))
      ], 4),
      t.text ? (p(), v("p", Pn, [
        zt(V(t.text), 1),
        l[1] || (l[1] = h("span", { class: "loading-dots" }, [
          h("span", null, "."),
          h("span", null, "."),
          h("span", null, ".")
        ], -1))
      ])) : G("", !0)
    ]));
  }
}), Vn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, Wo = /* @__PURE__ */ ee({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (o, e) => (p(), Ge(ut, { to: "body" }, [
      ce(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (p(), v("div", Vn, [
            ce(Yn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : G("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Rn = { class: "toast-content" }, Wn = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Gn = ["d"], Kn = { class: "toast-body" }, Un = {
  key: 0,
  class: "toast-title"
}, qn = { class: "toast-message" }, Zn = ["onClick"], Go = /* @__PURE__ */ ee({
  __name: "Toasts",
  setup(t) {
    const o = cn(), e = A(() => {
      const d = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return d[o.toastPosition.value] || d["bottom-right"];
    }), f = {
      info: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a1.25 1.25 0 110 2.5A1.25 1.25 0 0112 6zm1.5 10h-3v-1.5h1.5V9.5h-1.5V8h3v6h1.5V16z",
      success: "M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-4-4 1.5-1.5L11 12.5l4.5-4.5L17 9l-6 7z",
      warning: "M12 3l9 16H3l9-16zm-1 6h2v4h-2V9zm0 6h2v2h-2v-2z",
      error: "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5L13.5 10.5 15.5 12.5 14 14l-2-2-2 2-1.5-1.5 2-2-2-2 1.5-1.5 2 2 2-2 1.5 1.5z",
      primary: "M12 2l2.5 6.2L21 9l-4.5 4.3L17.5 20 12 16.8 6.5 20l1-6.7L3 9l6.5-0.8L12 2z"
    }, l = {
      info: "toast-soft-info",
      success: "toast-soft-success",
      warning: "toast-soft-warning",
      error: "toast-soft-error",
      primary: "toast-soft-primary"
    }, u = {
      info: "toast-solid-info",
      success: "toast-solid-success",
      warning: "toast-solid-warning",
      error: "toast-solid-error",
      primary: "toast-solid-primary"
    }, g = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, i = (d, y = "soft") => {
      var w;
      return ((w = {
        soft: l,
        solid: u,
        outline: g
      }[y]) == null ? void 0 : w[d]) || l[d] || "toast-default";
    };
    return (d, y) => (p(), Ge(ut, { to: "body" }, [
      h("div", {
        class: $(["toast-container", e.value])
      }, [
        (p(!0), v(ye, null, ze(H(o).toasts.value, (s) => (p(), v("div", {
          key: s.id,
          class: $(["toast-item", i(s.type, s.variant)])
        }, [
          h("div", Rn, [
            (p(), v("svg", Wn, [
              h("path", {
                d: f[s.type],
                fill: "currentColor"
              }, null, 8, Gn)
            ])),
            h("div", Kn, [
              s.title ? (p(), v("div", Un, V(s.title), 1)) : G("", !0),
              h("div", qn, V(s.message), 1)
            ]),
            h("button", {
              class: "toast-close-btn",
              onClick: (w) => H(o).dismiss(s.id)
            }, [...y[0] || (y[0] = [
              h("svg", {
                class: "toast-close-icon",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                h("path", {
                  d: "M6 18L18 6M6 6l12 12",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ])], 8, Zn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), Ko = /* @__PURE__ */ ee({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const o = t, e = B(!1);
    let f = null;
    const l = () => {
      f = setTimeout(() => {
        e.value = !0;
      }, o.delay);
    }, u = () => {
      f && (clearTimeout(f), f = null), e.value = !1;
    }, g = A(() => `tooltip-pos-${o.position}`), i = A(() => `tooltip-arrow-${o.position}`), d = A(() => `tooltip-variant-${o.variant}`);
    return (y, s) => (p(), v("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: u,
      onFocus: l,
      onBlur: u
    }, [
      le(y.$slots, "default"),
      ce(Xe, { name: "tooltip-fade" }, {
        default: Qe(() => [
          e.value && t.text ? (p(), v("span", {
            key: 0,
            class: $(["tooltip-content", [g.value, d.value]]),
            role: "tooltip"
          }, [
            zt(V(t.text) + " ", 1),
            h("span", {
              class: $(["tooltip-arrow", [i.value, d.value]])
            }, null, 2)
          ], 2)) : G("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Jn = { class: "mitreka-pagination" }, Xn = ["disabled"], Qn = { class: "pagination-status" }, ea = ["disabled"], Uo = /* @__PURE__ */ ee({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: o }) {
    const e = t, f = o, l = () => {
      e.page > 1 && f("change", e.page - 1);
    }, u = () => {
      e.page < e.pages && f("change", e.page + 1);
    };
    return (g, i) => (p(), v("div", Jn, [
      h("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...i[0] || (i[0] = [
        h("span", { class: "hidden sm:inline" }, "Prev", -1),
        h("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Xn),
      h("span", Qn, V(t.page) + " / " + V(t.pages), 1),
      h("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: u
      }, [...i[1] || (i[1] = [
        h("span", { class: "hidden sm:inline" }, "Next", -1),
        h("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, ea)
    ]));
  }
}), ta = { class: "avatar-root" }, na = ["src", "alt"], qo = /* @__PURE__ */ ee({
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
    const o = t, e = B(!1), f = A(() => o.src && !e.value), l = A(() => o.fallback ? o.fallback.slice(0, 2).toUpperCase() : o.alt && o.alt !== "Avatar" ? o.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), u = A(() => `avatar-size-${o.size}`), g = A(() => `avatar-color-${o.color}`), i = A(() => o.status ? `avatar-status-${o.status}` : ""), d = A(() => `avatar-status-size-${o.size}`), y = A(() => o.square ? "avatar-square" : "avatar-round"), s = () => {
      e.value = !0;
    };
    return (w, x) => (p(), v("span", ta, [
      f.value ? (p(), v("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: $(["avatar-img", [u.value, y.value]]),
        onError: s
      }, null, 42, na)) : (p(), v("span", {
        key: 1,
        class: $(["avatar-fallback", [u.value, g.value, y.value]])
      }, V(l.value), 3)),
      t.status ? (p(), v("span", {
        key: 2,
        class: $(["avatar-status", [i.value, d.value]])
      }, null, 2)) : G("", !0)
    ]));
  }
}), Zo = /* @__PURE__ */ ee({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const o = t, e = on(), f = A(() => {
      var d;
      const i = (d = e.default) == null ? void 0 : d.call(e);
      return i ? i.length : 0;
    }), l = A(() => f.value <= o.max ? 0 : f.value - o.max), u = A(() => `avatar-size-${o.size}`), g = A(() => `avatar-group-space-${o.size}`);
    return (i, d) => (p(), v("div", {
      class: $(["avatar-group", g.value])
    }, [
      (p(!0), v(ye, null, ze(t.max, (y, s) => {
        var w, x;
        return p(), v(ye, { key: s }, [
          s < f.value ? (p(), Ge(rn((x = (w = H(e)).default) == null ? void 0 : x.call(w)[s]), { key: 0 })) : G("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (p(), v("span", {
        key: 0,
        class: $(["avatar-group-count", u.value])
      }, " +" + V(l.value), 3)) : G("", !0)
    ], 2));
  }
}), aa = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, oa = { class: "breadcrumbs-list" }, ra = {
  key: 0,
  class: "breadcrumbs-item"
}, ia = ["href"], sa = { key: 0 }, la = ["href"], da = {
  key: 1,
  class: "breadcrumbs-text"
}, ca = {
  key: 1,
  class: "breadcrumbs-current"
}, Jo = /* @__PURE__ */ ee({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const o = t, e = (f) => f === o.items.length - 1;
    return (f, l) => t.items.length ? (p(), v("nav", aa, [
      h("ol", oa, [
        t.showHome ? (p(), v("li", ra, [
          h("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, V(t.homeLabel), 9, ia)
        ])) : G("", !0),
        (p(!0), v(ye, null, ze(t.items, (u, g) => (p(), v("li", {
          key: g,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = h("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(g) ? (p(), v("span", ca, V(u.label), 1)) : (p(), v("span", sa, [
            u.href ? (p(), v("a", {
              key: 0,
              href: u.href,
              class: "breadcrumbs-link"
            }, V(u.label), 9, la)) : (p(), v("span", da, V(u.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : G("", !0);
  }
}), ua = { class: "mitreka-stat-card" }, fa = {
  key: 0,
  class: "stat-icon"
}, ha = { class: "stat-content" }, pa = { class: "stat-label" }, ga = { class: "stat-value" }, Xo = /* @__PURE__ */ ee({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (o, e) => (p(), v("div", ua, [
      t.icon ? (p(), v("div", fa, V(t.icon), 1)) : G("", !0),
      h("div", ha, [
        h("div", pa, V(t.label), 1),
        h("div", ga, V(t.value), 1)
      ])
    ]));
  }
}), va = { class: "mitreka-page-header" }, ma = { class: "page-header-title-row" }, wa = { class: "page-header-title" }, ba = {
  key: 0,
  class: "page-header-desc"
}, Qo = /* @__PURE__ */ ee({
  __name: "PageHeader",
  props: {
    title: {},
    description: {},
    category: {}
  },
  setup(t) {
    const o = t, e = {
      foundation: "badge-soft-info",
      components: "badge-soft-primary",
      patterns: "badge-soft-accent",
      guides: "badge-soft-success",
      mockup: "badge-soft-warning"
    }, f = A(() => {
      if (!o.category) return "";
      const l = o.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, u) => (p(), v("header", va, [
      h("div", ma, [
        h("h1", wa, V(t.title), 1),
        t.category ? (p(), v("span", {
          key: 0,
          class: $(["badge page-header-badge", f.value])
        }, V(t.category), 3)) : G("", !0)
      ]),
      t.description ? (p(), v("p", ba, V(t.description), 1)) : G("", !0)
    ]));
  }
}), ya = { class: "mitreka-theme-switcher" }, ka = ["value"], er = /* @__PURE__ */ ee({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: o, setTheme: e, toggleTheme: f } = un("light"), l = A(
      () => o.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), u = (g) => {
      e(g === "mitrekadark" ? "dark" : "light");
    };
    return (g, i) => (p(), v("div", ya, [
      h("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: i[0] || (i[0] = //@ts-ignore
        (...d) => H(f) && H(f)(...d))
      }, " Toggle: " + V(l.value), 1),
      h("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: i[1] || (i[1] = (d) => u(d.target.value))
      }, [...i[2] || (i[2] = [
        h("option", { value: "mitrekalight" }, "mitrekalight", -1),
        h("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, ka)
    ]));
  }
}), xa = { class: "sidebar-header" }, Ma = {
  key: 0,
  class: "sidebar-search"
}, Ca = ["placeholder"], Da = { class: "sidebar-nav" }, Sa = ["href", "title", "onClick"], Ea = { class: "sidebar-icon" }, _a = { class: "sidebar-icon-text" }, Ha = {
  key: 0,
  class: "sidebar-label"
}, $a = ["title", "onClick"], Aa = { class: "sidebar-icon" }, ja = { class: "sidebar-icon-text" }, Ta = {
  key: 0,
  class: "sidebar-label"
}, Ba = ["href", "title", "onClick"], Ia = { class: "sidebar-icon" }, La = { class: "sidebar-icon-text" }, Fa = {
  key: 0,
  class: "sidebar-label"
}, tr = /* @__PURE__ */ ee({
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
  setup(t, { emit: o }) {
    const e = t, f = o, l = B(""), u = sn({});
    e.defaultOpenIds.forEach((w) => {
      u[w] = !0;
    });
    const g = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), i = (w) => {
      var z;
      if (!w.children) return !1;
      if (l.value.trim()) return !0;
      const x = u[w.id], C = ((z = w.children) == null ? void 0 : z.some(g)) ?? !1;
      return x === void 0 && C && (u[w.id] = !0), u[w.id] ?? C;
    }, d = (w) => {
      const x = !i(w);
      u[w.id] = x, f("toggle", w.id, x);
    }, y = A(() => {
      const w = l.value.toLowerCase().trim();
      return w ? e.items.map((x) => {
        if (x.children) {
          const C = x.children.filter(
            (z) => z.label.toLowerCase().includes(w)
          );
          return x.label.toLowerCase().includes(w) ? x : C.length > 0 ? { ...x, children: C } : null;
        }
        return x.label.toLowerCase().includes(w) ? x : null;
      }).filter(Boolean) : e.items;
    }), s = (w) => {
      f("navigate", w), l.value = "";
    };
    return (w, x) => (p(), v("aside", {
      class: $(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      h("div", xa, [
        le(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (p(), v("div", Ma, [
        jt(h("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": x[0] || (x[0] = (C) => l.value = C)
        }, null, 8, Ca), [
          [Tt, l.value]
        ]),
        l.value ? (p(), v("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: x[1] || (x[1] = (C) => l.value = "")
        }, " × ")) : G("", !0)
      ])) : G("", !0),
      h("nav", Da, [
        (p(!0), v(ye, null, ze(y.value, (C) => (p(), v(ye, {
          key: C.id
        }, [
          C.children ? (p(), v(ye, { key: 1 }, [
            h("button", {
              class: $(["sidebar-item sidebar-group", i(C) ? "is-open" : ""]),
              title: t.collapsed ? C.label : void 0,
              onClick: (z) => d(C)
            }, [
              h("span", Aa, [
                le(w.$slots, "icon", { item: C }, () => [
                  h("span", ja, V(C.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? G("", !0) : (p(), v("span", Ta, V(C.label), 1)),
              t.collapsed ? G("", !0) : (p(), v("span", {
                key: 1,
                class: $(["sidebar-caret", i(C) ? "rotate" : ""])
              }, "›", 2))
            ], 10, $a),
            i(C) ? (p(), v("div", {
              key: 0,
              class: $(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (p(!0), v(ye, null, ze(C.children, (z) => (p(), v("a", {
                key: z.id,
                class: $(["sidebar-item sidebar-child", g(z) ? "is-active" : ""]),
                href: z.href || "#",
                title: t.collapsed ? z.label : void 0,
                onClick: Te((j) => s(z), ["prevent"])
              }, [
                h("span", Ia, [
                  le(w.$slots, "icon", { item: z }, () => [
                    h("span", La, V(z.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? G("", !0) : (p(), v("span", Fa, V(z.label), 1))
              ], 10, Ba))), 128))
            ], 2)) : G("", !0)
          ], 64)) : (p(), v("a", {
            key: 0,
            class: $(["sidebar-item", g(C) ? "is-active" : ""]),
            href: C.href || "#",
            title: t.collapsed ? C.label : void 0,
            onClick: Te((z) => s(C), ["prevent"])
          }, [
            h("span", Ea, [
              le(w.$slots, "icon", { item: C }, () => [
                h("span", _a, V(C.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? G("", !0) : (p(), v("span", Ha, V(C.label), 1))
          ], 10, Sa))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Ot = {
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
  "sun-moon": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2v2"/>
      <path d="M14.837 16.385a6 6 0 1 1-7.223-7.222c.624-.147.97.66.715 1.248a4 4 0 0 0 5.26 5.259c.589-.255 1.396.09 1.248.715"/>
      <path d="M16 12a4 4 0 0 0-4-4"/>
      <path d="m19 5-1.256 1.256"/>
      <path d="M20 12h2"/>
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
       <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
       <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/>
       <path d="M8 6v8"/>
     </svg>
   `,
  "file-pdf": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <rect x="3.2" y="11.3" width="17.6" height="7.2" rx="1.6" fill="currentColor" stroke="none"/>
      <text x="12" y="16.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" stroke="none" letter-spacing="0.2" font-family="Arial, Helvetica, sans-serif">PDF</text>
    </svg>
  `,
  "file-xls": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <rect x="3.2" y="11.3" width="17.6" height="7.2" rx="1.6" fill="currentColor" stroke="none"/>
      <text x="12" y="16.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" stroke="none" letter-spacing="0.2" font-family="Arial, Helvetica, sans-serif">XLS</text>
    </svg>
  `,
  "file-csv": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <rect x="3.2" y="11.3" width="17.6" height="7.2" rx="1.6" fill="currentColor" stroke="none"/>
      <text x="12" y="16.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" stroke="none" letter-spacing="0.2" font-family="Arial, Helvetica, sans-serif">CSV</text>
    </svg>
  `
}, nr = (t) => Ot[t], za = ["innerHTML"], Oa = {
  key: 1,
  class: "mitreka-icon-fallback"
}, Be = /* @__PURE__ */ ee({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const o = t, e = A(() => o.class || "w-5 h-5"), f = A(() => Ot[o.name]), l = A(
      () => f.value ? f.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (u, g) => f.value ? (p(), v("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, za)) : (p(), v("span", Oa, "?"));
  }
});
var Et = [
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
], it = {
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
    var o = new Date(t.getTime());
    o.setHours(0, 0, 0, 0), o.setDate(o.getDate() + 3 - (o.getDay() + 6) % 7);
    var e = new Date(o.getFullYear(), 0, 4);
    return 1 + Math.round(((o.getTime() - e.getTime()) / 864e5 - 3 + (e.getDay() + 6) % 7) / 7);
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
}, pt = {
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
    var o = t % 100;
    if (o > 3 && o < 21)
      return "th";
    switch (o % 10) {
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
}, Se = function(t, o) {
  return o === void 0 && (o = 2), ("000" + t).slice(o * -1);
}, Le = function(t) {
  return t === !0 ? 1 : 0;
};
function Lt(t, o) {
  var e;
  return function() {
    var f = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(f, l);
    }, o);
  };
}
var _t = function(t) {
  return t instanceof Array ? t : [t];
};
function Ce(t, o, e) {
  if (e === !0)
    return t.classList.add(o);
  t.classList.remove(o);
}
function X(t, o, e) {
  var f = window.document.createElement(t);
  return o = o || "", e = e || "", f.className = o, e !== void 0 && (f.textContent = e), f;
}
function yt(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Nt(t, o) {
  if (o(t))
    return t;
  if (t.parentNode)
    return Nt(t.parentNode, o);
}
function kt(t, o) {
  var e = X("div", "numInputWrapper"), f = X("input", "numInput " + t), l = X("span", "arrowUp"), u = X("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? f.type = "number" : (f.type = "text", f.pattern = "\\d*"), o !== void 0)
    for (var g in o)
      f.setAttribute(g, o[g]);
  return e.appendChild(f), e.appendChild(l), e.appendChild(u), e;
}
function Ae(t) {
  try {
    if (typeof t.composedPath == "function") {
      var o = t.composedPath();
      return o[0];
    }
    return t.target;
  } catch {
    return t.target;
  }
}
var Ht = function() {
}, xt = function(t, o, e) {
  return e.months[o ? "shorthand" : "longhand"][t];
}, Na = {
  D: Ht,
  F: function(t, o, e) {
    t.setMonth(e.months.longhand.indexOf(o));
  },
  G: function(t, o) {
    t.setHours((t.getHours() >= 12 ? 12 : 0) + parseFloat(o));
  },
  H: function(t, o) {
    t.setHours(parseFloat(o));
  },
  J: function(t, o) {
    t.setDate(parseFloat(o));
  },
  K: function(t, o, e) {
    t.setHours(t.getHours() % 12 + 12 * Le(new RegExp(e.amPM[1], "i").test(o)));
  },
  M: function(t, o, e) {
    t.setMonth(e.months.shorthand.indexOf(o));
  },
  S: function(t, o) {
    t.setSeconds(parseFloat(o));
  },
  U: function(t, o) {
    return new Date(parseFloat(o) * 1e3);
  },
  W: function(t, o, e) {
    var f = parseInt(o), l = new Date(t.getFullYear(), 0, 2 + (f - 1) * 7, 0, 0, 0, 0);
    return l.setDate(l.getDate() - l.getDay() + e.firstDayOfWeek), l;
  },
  Y: function(t, o) {
    t.setFullYear(parseFloat(o));
  },
  Z: function(t, o) {
    return new Date(o);
  },
  d: function(t, o) {
    t.setDate(parseFloat(o));
  },
  h: function(t, o) {
    t.setHours((t.getHours() >= 12 ? 12 : 0) + parseFloat(o));
  },
  i: function(t, o) {
    t.setMinutes(parseFloat(o));
  },
  j: function(t, o) {
    t.setDate(parseFloat(o));
  },
  l: Ht,
  m: function(t, o) {
    t.setMonth(parseFloat(o) - 1);
  },
  n: function(t, o) {
    t.setMonth(parseFloat(o) - 1);
  },
  s: function(t, o) {
    t.setSeconds(parseFloat(o));
  },
  u: function(t, o) {
    return new Date(parseFloat(o));
  },
  w: Ht,
  y: function(t, o) {
    t.setFullYear(2e3 + parseFloat(o));
  }
}, Je = {
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
}, ht = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, o, e) {
    return o.weekdays.shorthand[ht.w(t, o, e)];
  },
  F: function(t, o, e) {
    return xt(ht.n(t, o, e) - 1, !1, o);
  },
  G: function(t, o, e) {
    return Se(ht.h(t, o, e));
  },
  H: function(t) {
    return Se(t.getHours());
  },
  J: function(t, o) {
    return o.ordinal !== void 0 ? t.getDate() + o.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, o) {
    return o.amPM[Le(t.getHours() > 11)];
  },
  M: function(t, o) {
    return xt(t.getMonth(), !0, o);
  },
  S: function(t) {
    return Se(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, o, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return Se(t.getFullYear(), 4);
  },
  d: function(t) {
    return Se(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return Se(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, o) {
    return o.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return Se(t.getMonth() + 1);
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
}, Pt = function(t) {
  var o = t.config, e = o === void 0 ? it : o, f = t.l10n, l = f === void 0 ? pt : f, u = t.isMobile, g = u === void 0 ? !1 : u;
  return function(i, d, y) {
    var s = y || l;
    return e.formatDate !== void 0 && !g ? e.formatDate(i, d, s) : d.split("").map(function(w, x, C) {
      return ht[w] && C[x - 1] !== "\\" ? ht[w](i, s, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, Bt = function(t) {
  var o = t.config, e = o === void 0 ? it : o, f = t.l10n, l = f === void 0 ? pt : f;
  return function(u, g, i, d) {
    if (!(u !== 0 && !u)) {
      var y = d || l, s, w = u;
      if (u instanceof Date)
        s = new Date(u.getTime());
      else if (typeof u != "string" && u.toFixed !== void 0)
        s = new Date(u);
      else if (typeof u == "string") {
        var x = g || (e || it).dateFormat, C = String(u).trim();
        if (C === "today")
          s = /* @__PURE__ */ new Date(), i = !0;
        else if (e && e.parseDate)
          s = e.parseDate(u, x);
        else if (/Z$/.test(C) || /GMT$/.test(C))
          s = new Date(u);
        else {
          for (var z = void 0, j = [], P = 0, q = 0, O = ""; P < x.length; P++) {
            var Z = x[P], oe = Z === "\\", ve = x[P - 1] === "\\" || oe;
            if (Je[Z] && !ve) {
              O += Je[Z];
              var re = new RegExp(O).exec(u);
              re && (z = !0) && j[Z !== "Y" ? "push" : "unshift"]({
                fn: Na[Z],
                val: re[++q]
              });
            } else oe || (O += ".");
          }
          s = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), j.forEach(function(ne) {
            var ie = ne.fn, me = ne.val;
            return s = ie(s, me, y) || s;
          }), s = z ? s : void 0;
        }
      }
      if (!(s instanceof Date && !isNaN(s.getTime()))) {
        e.errorHandler(new Error("Invalid date provided: " + w));
        return;
      }
      return i === !0 && s.setHours(0, 0, 0, 0), s;
    }
  };
};
function je(t, o, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(o.getTime()).setHours(0, 0, 0, 0) : t.getTime() - o.getTime();
}
var Pa = function(t, o, e) {
  return t > Math.min(o, e) && t < Math.max(o, e);
}, $t = function(t, o, e) {
  return t * 3600 + o * 60 + e;
}, Ya = function(t) {
  var o = Math.floor(t / 3600), e = (t - o * 3600) / 60;
  return [o, e, t - o * 3600 - e * 60];
}, Va = {
  DAY: 864e5
};
function At(t) {
  var o = t.defaultHour, e = t.defaultMinute, f = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), u = t.minDate.getMinutes(), g = t.minDate.getSeconds();
    o < l && (o = l), o === l && e < u && (e = u), o === l && e === u && f < g && (f = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var i = t.maxDate.getHours(), d = t.maxDate.getMinutes();
    o = Math.min(o, i), o === i && (e = Math.min(d, e)), o === i && e === d && (f = t.maxDate.getSeconds());
  }
  return { hours: o, minutes: e, seconds: f };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var o = [], e = 1; e < arguments.length; e++)
    o[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var f = function(i) {
    i && Object.keys(i).forEach(function(d) {
      return t[d] = i[d];
    });
  }, l = 0, u = o; l < u.length; l++) {
    var g = u[l];
    f(g);
  }
  return t;
});
var xe = function() {
  return xe = Object.assign || function(t) {
    for (var o, e = 1, f = arguments.length; e < f; e++) {
      o = arguments[e];
      for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l]);
    }
    return t;
  }, xe.apply(this, arguments);
}, Ft = function() {
  for (var t = 0, o = 0, e = arguments.length; o < e; o++) t += arguments[o].length;
  for (var f = Array(t), l = 0, o = 0; o < e; o++)
    for (var u = arguments[o], g = 0, i = u.length; g < i; g++, l++)
      f[l] = u[g];
  return f;
}, Ra = 300;
function Wa(t, o) {
  var e = {
    config: xe(xe({}, it), ue.defaultConfig),
    l10n: pt
  };
  e.parseDate = Bt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = j, e._setHoursFromDate = x, e._positionCalendar = qe, e.changeMonth = _, e.changeYear = ke, e.clear = I, e.close = te, e.onMouseOver = _e, e._createElement = X, e.createDay = re, e.destroy = Ee, e.isEnabled = be, e.jumpToDate = O, e.updateValue = We, e.open = gt, e.redraw = L, e.set = tt, e.setDate = Ze, e.toggle = Vt;
  function f() {
    e.utils = {
      getDaysInMonth: function(n, a) {
        return n === void 0 && (n = e.currentMonth), a === void 0 && (a = e.currentYear), n === 1 && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, mt(), Ue(), nt(), wt(), f(), e.isMobile || ve(), q(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && x(e.config.noCalendar ? e.latestSelectedDateObj : void 0), We(!1)), i();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && qe(), ae("onReady");
  }
  function u() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function g(n) {
    return n.bind(e);
  }
  function i() {
    var n = e.config;
    n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function() {
      if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
        var a = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = a + "px", e.calendarContainer.style.width = a + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function d(n) {
    if (e.selectedDates.length === 0) {
      var a = e.config.minDate === void 0 || je(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = At(e.config);
      a.setHours(r.hours, r.minutes, r.seconds, a.getMilliseconds()), e.selectedDates = [a], e.latestSelectedDateObj = a;
    }
    n !== void 0 && n.type !== "blur" && Gt(n);
    var c = e._input.value;
    w(), We(), e._input.value !== c && e._debouncedChange();
  }
  function y(n, a) {
    return n % 12 + 12 * Le(a === e.l10n.amPM[1]);
  }
  function s(n) {
    switch (n % 24) {
      case 0:
      case 12:
        return 12;
      default:
        return n % 12;
    }
  }
  function w() {
    if (!(e.hourElement === void 0 || e.minuteElement === void 0)) {
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, a = (parseInt(e.minuteElement.value, 10) || 0) % 60, r = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = y(n, e.amPM.textContent));
      var c = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && je(e.latestSelectedDateObj, e.config.minDate, !0) === 0, b = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && je(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var k = $t(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), Y = $t(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), E = $t(n, a, r);
        if (E > Y && E < k) {
          var K = Ya(k);
          n = K[0], a = K[1], r = K[2];
        }
      } else {
        if (b) {
          var D = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, D.getHours()), n === D.getHours() && (a = Math.min(a, D.getMinutes())), a === D.getMinutes() && (r = Math.min(r, D.getSeconds()));
        }
        if (c) {
          var T = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, T.getHours()), n === T.getHours() && a < T.getMinutes() && (a = T.getMinutes()), a === T.getMinutes() && (r = Math.max(r, T.getSeconds()));
        }
      }
      C(n, a, r);
    }
  }
  function x(n) {
    var a = n || e.latestSelectedDateObj;
    a && a instanceof Date && C(a.getHours(), a.getMinutes(), a.getSeconds());
  }
  function C(n, a, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, a, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Se(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Le(n % 12 === 0)), e.minuteElement.value = Se(a), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Le(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Se(r)));
  }
  function z(n) {
    var a = Ae(n), r = parseInt(a.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && ke(r);
  }
  function j(n, a, r, c) {
    if (a instanceof Array)
      return a.forEach(function(b) {
        return j(n, b, r, c);
      });
    if (n instanceof Array)
      return n.forEach(function(b) {
        return j(b, a, r, c);
      });
    n.addEventListener(a, r, c), e._handlers.push({
      remove: function() {
        return n.removeEventListener(a, r, c);
      }
    });
  }
  function P() {
    ae("onChange");
  }
  function q() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(c) {
        return j(c, "click", e[r]);
      });
    }), e.isMobile) {
      ot();
      return;
    }
    var n = Lt(Ne, 50);
    if (e._debouncedChange = Lt(P, Ra), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && j(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && _e(Ae(r));
    }), j(e._input, "keydown", Ke), e.calendarContainer !== void 0 && j(e.calendarContainer, "keydown", Ke), !e.config.inline && !e.config.static && j(window, "resize", n), window.ontouchstart !== void 0 ? j(window.document, "touchstart", Ie) : j(window.document, "mousedown", Ie), j(window.document, "focus", Ie, { capture: !0 }), e.config.clickOpens === !0 && (j(e._input, "focus", e.open), j(e._input, "click", e.open)), e.daysContainer !== void 0 && (j(e.monthNav, "click", Wt), j(e.monthNav, ["keyup", "increment"], z), j(e.daysContainer, "click", De)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var a = function(r) {
        return Ae(r).select();
      };
      j(e.timeContainer, ["increment"], d), j(e.timeContainer, "blur", d, { capture: !0 }), j(e.timeContainer, "click", Z), j([e.hourElement, e.minuteElement], ["focus", "click"], a), e.secondElement !== void 0 && j(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && j(e.amPM, "click", function(r) {
        d(r);
      });
    }
    e.config.allowInput && j(e._input, "blur", et);
  }
  function O(n, a) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), c = e.currentYear, b = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (k) {
      k.message = "Invalid date supplied: " + r, e.config.errorHandler(k);
    }
    a && e.currentYear !== c && (ae("onYearChange"), U()), a && (e.currentYear !== c || e.currentMonth !== b) && ae("onMonthChange"), e.redraw();
  }
  function Z(n) {
    var a = Ae(n);
    ~a.className.indexOf("arrow") && oe(n, a.classList.contains("arrowUp") ? 1 : -1);
  }
  function oe(n, a, r) {
    var c = n && Ae(n), b = r || c && c.parentNode && c.parentNode.firstChild, k = Mt("increment");
    k.delta = a, b && b.dispatchEvent(k);
  }
  function ve() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = X("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(de()), e.innerContainer = X("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var a = M(), r = a.weekWrapper, c = a.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = c, e.weekWrapper = r;
      }
      e.rContainer = X("div", "flatpickr-rContainer"), e.rContainer.appendChild(F()), e.daysContainer || (e.daysContainer = X("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), W(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(fe()), Ce(e.calendarContainer, "rangeMode", e.config.mode === "range"), Ce(e.calendarContainer, "animate", e.config.animate === !0), Ce(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var b = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!b && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var k = X("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(k, e.element), k.appendChild(e.element), e.altInput && k.appendChild(e.altInput), k.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function re(n, a, r, c) {
    var b = be(a, !0), k = X("span", n, a.getDate().toString());
    return k.dateObj = a, k.$i = c, k.setAttribute("aria-label", e.formatDate(a, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && je(a, e.now) === 0 && (e.todayDateElem = k, k.classList.add("today"), k.setAttribute("aria-current", "date")), b ? (k.tabIndex = -1, Ct(a) && (k.classList.add("selected"), e.selectedDateElem = k, e.config.mode === "range" && (Ce(k, "startRange", e.selectedDates[0] && je(a, e.selectedDates[0], !0) === 0), Ce(k, "endRange", e.selectedDates[1] && je(a, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && k.classList.add("inRange")))) : k.classList.add("flatpickr-disabled"), e.config.mode === "range" && Rt(a) && !Ct(a) && k.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && c % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(a) + "</span>"), ae("onDayCreate", k), k;
  }
  function ne(n) {
    n.focus(), e.config.mode === "range" && _e(n);
  }
  function ie(n) {
    for (var a = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, c = a; c != r; c += n)
      for (var b = e.daysContainer.children[c], k = n > 0 ? 0 : b.children.length - 1, Y = n > 0 ? b.children.length : -1, E = k; E != Y; E += n) {
        var K = b.children[E];
        if (K.className.indexOf("hidden") === -1 && be(K.dateObj))
          return K;
      }
  }
  function me(n, a) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, c = a > 0 ? e.config.showMonths : -1, b = a > 0 ? 1 : -1, k = r - e.currentMonth; k != c; k += b)
      for (var Y = e.daysContainer.children[k], E = r - e.currentMonth === k ? n.$i + a : a < 0 ? Y.children.length - 1 : 0, K = Y.children.length, D = E; D >= 0 && D < K && D != (a > 0 ? K : -1); D += b) {
        var T = Y.children[D];
        if (T.className.indexOf("hidden") === -1 && be(T.dateObj) && Math.abs(n.$i - D) >= Math.abs(a))
          return ne(T);
      }
    e.changeMonth(b), S(ie(b), 0);
  }
  function S(n, a) {
    var r = u(), c = Oe(r || document.body), b = n !== void 0 ? n : c ? r : e.selectedDateElem !== void 0 && Oe(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Oe(e.todayDateElem) ? e.todayDateElem : ie(a > 0 ? 1 : -1);
    b === void 0 ? e._input.focus() : c ? me(b, a) : ne(b);
  }
  function R(n, a) {
    for (var r = (new Date(n, a, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, c = e.utils.getDaysInMonth((a - 1 + 12) % 12, n), b = e.utils.getDaysInMonth(a, n), k = window.document.createDocumentFragment(), Y = e.config.showMonths > 1, E = Y ? "prevMonthDay hidden" : "prevMonthDay", K = Y ? "nextMonthDay hidden" : "nextMonthDay", D = c + 1 - r, T = 0; D <= c; D++, T++)
      k.appendChild(re("flatpickr-day " + E, new Date(n, a - 1, D), D, T));
    for (D = 1; D <= b; D++, T++)
      k.appendChild(re("flatpickr-day", new Date(n, a, D), D, T));
    for (var Q = b + 1; Q <= 42 - r && (e.config.showMonths === 1 || T % 7 !== 0); Q++, T++)
      k.appendChild(re("flatpickr-day " + K, new Date(n, a + 1, Q % b), Q, T));
    var Ye = X("div", "dayContainer");
    return Ye.appendChild(k), Ye;
  }
  function W() {
    if (e.daysContainer !== void 0) {
      yt(e.daysContainer), e.weekNumbers && yt(e.weekNumbers);
      for (var n = document.createDocumentFragment(), a = 0; a < e.config.showMonths; a++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + a), n.appendChild(R(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && _e();
    }
  }
  function U() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(c) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && c < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && c > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var a = 0; a < 12; a++)
        if (n(a)) {
          var r = X("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, a).getMonth().toString(), r.textContent = xt(a, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === a && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function he() {
    var n = X("div", "flatpickr-month"), a = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = X("span", "cur-month") : (e.monthsDropdownContainer = X("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), j(e.monthsDropdownContainer, "change", function(Y) {
      var E = Ae(Y), K = parseInt(E.value, 10);
      e.changeMonth(K - e.currentMonth), ae("onMonthChange");
    }), U(), r = e.monthsDropdownContainer);
    var c = kt("cur-year", { tabindex: "-1" }), b = c.getElementsByTagName("input")[0];
    b.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && b.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (b.setAttribute("max", e.config.maxDate.getFullYear().toString()), b.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var k = X("div", "flatpickr-current-month");
    return k.appendChild(r), k.appendChild(c), a.appendChild(k), n.appendChild(a), {
      container: n,
      yearElement: b,
      monthElement: r
    };
  }
  function Me() {
    yt(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var a = he();
      e.yearElements.push(a.yearElement), e.monthElements.push(a.monthElement), e.monthNav.appendChild(a.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function de() {
    return e.monthNav = X("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = X("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = X("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, Me(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (Ce(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (Ce(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], bt(), e.monthNav;
  }
  function fe() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = At(e.config);
    e.timeContainer = X("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var a = X("span", "flatpickr-time-separator", ":"), r = kt("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var c = kt("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = c.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Se(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : s(n.hours)), e.minuteElement.value = Se(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(a), e.timeContainer.appendChild(c), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var b = kt("flatpickr-second");
      e.secondElement = b.getElementsByTagName("input")[0], e.secondElement.value = Se(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(X("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(b);
    }
    return e.config.time_24hr || (e.amPM = X("span", "flatpickr-am-pm", e.l10n.amPM[Le((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function F() {
    e.weekdayContainer ? yt(e.weekdayContainer) : e.weekdayContainer = X("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var a = X("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(a);
    }
    return m(), e.weekdayContainer;
  }
  function m() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, a = Ft(e.l10n.weekdays.shorthand);
      n > 0 && n < a.length && (a = Ft(a.splice(n, a.length), a.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + a.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function M() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = X("div", "flatpickr-weekwrapper");
    n.appendChild(X("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var a = X("div", "flatpickr-weeks");
    return n.appendChild(a), {
      weekWrapper: n,
      weekNumbers: a
    };
  }
  function _(n, a) {
    a === void 0 && (a = !0);
    var r = a ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, ae("onYearChange"), U()), W(), ae("onMonthChange"), bt());
  }
  function I(n, a) {
    if (n === void 0 && (n = !0), a === void 0 && (a = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, a === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = At(e.config), c = r.hours, b = r.minutes, k = r.seconds;
      C(c, b, k);
    }
    e.redraw(), n && ae("onChange");
  }
  function te() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), ae("onClose");
  }
  function Ee() {
    e.config !== void 0 && ae("onDestroy");
    for (var n = e._handlers.length; n--; )
      e._handlers[n].remove();
    if (e._handlers = [], e.mobileInput)
      e.mobileInput.parentNode && e.mobileInput.parentNode.removeChild(e.mobileInput), e.mobileInput = void 0;
    else if (e.calendarContainer && e.calendarContainer.parentNode)
      if (e.config.static && e.calendarContainer.parentNode) {
        var a = e.calendarContainer.parentNode;
        if (a.lastChild && a.removeChild(a.lastChild), a.parentNode) {
          for (; a.firstChild; )
            a.parentNode.insertBefore(a.firstChild, a);
          a.parentNode.removeChild(a);
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
  function we(n) {
    return e.calendarContainer.contains(n);
  }
  function Ie(n) {
    if (e.isOpen && !e.config.inline) {
      var a = Ae(n), r = we(a), c = a === e.input || a === e.altInput || e.element.contains(a) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), b = !c && !r && !we(n.relatedTarget), k = !e.config.ignoredFocusElements.some(function(Y) {
        return Y.contains(a);
      });
      b && k && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && d(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function ke(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var a = n, r = e.currentYear !== a;
      e.currentYear = a || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), ae("onYearChange"), U());
    }
  }
  function be(n, a) {
    var r;
    a === void 0 && (a = !0);
    var c = e.parseDate(n, void 0, a);
    if (e.config.minDate && c && je(c, e.config.minDate, a !== void 0 ? a : !e.minDateHasTime) < 0 || e.config.maxDate && c && je(c, e.config.maxDate, a !== void 0 ? a : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (c === void 0)
      return !1;
    for (var b = !!e.config.enable, k = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, Y = 0, E = void 0; Y < k.length; Y++) {
      if (E = k[Y], typeof E == "function" && E(c))
        return b;
      if (E instanceof Date && c !== void 0 && E.getTime() === c.getTime())
        return b;
      if (typeof E == "string") {
        var K = e.parseDate(E, void 0, !0);
        return K && K.getTime() === c.getTime() ? b : !b;
      } else if (typeof E == "object" && c !== void 0 && E.from && E.to && c.getTime() >= E.from.getTime() && c.getTime() <= E.to.getTime())
        return b;
    }
    return !b;
  }
  function Oe(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function et(n) {
    var a = n.target === e._input, r = e._input.value.trimEnd() !== Dt();
    a && r && !(n.relatedTarget && we(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ke(n) {
    var a = Ae(n), r = e.config.wrap ? t.contains(a) : a === e._input, c = e.config.allowInput, b = e.isOpen && (!c || !r), k = e.config.inline && r && !c;
    if (n.keyCode === 13 && r) {
      if (c)
        return e.setDate(e._input.value, !0, a === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), a.blur();
      e.open();
    } else if (we(a) || b || k) {
      var Y = !!e.timeContainer && e.timeContainer.contains(a);
      switch (n.keyCode) {
        case 13:
          Y ? (n.preventDefault(), d(), pe()) : De(n);
          break;
        case 27:
          n.preventDefault(), pe();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!Y && !r) {
            n.preventDefault();
            var E = u();
            if (e.daysContainer !== void 0 && (c === !1 || E && Oe(E))) {
              var K = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), _(K), S(ie(1), 0)) : S(void 0, K);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var D = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && a.$i !== void 0 || a === e.input || a === e.altInput ? n.ctrlKey ? (n.stopPropagation(), ke(e.currentYear - D), S(ie(1), 0)) : Y || S(void 0, D * 7) : a === e.currentYearElement ? ke(e.currentYear - D) : e.config.enableTime && (!Y && e.hourElement && e.hourElement.focus(), d(n), e._debouncedChange());
          break;
        case 9:
          if (Y) {
            var T = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function($e) {
              return $e;
            }), Q = T.indexOf(a);
            if (Q !== -1) {
              var Ye = T[Q + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (Ye || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(a) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && a === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], w(), We();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], w(), We();
          break;
      }
    (r || we(a)) && ae("onKeyDown", n);
  }
  function _e(n, a) {
    if (a === void 0 && (a = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(a) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), c = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), b = Math.min(r, e.selectedDates[0].getTime()), k = Math.max(r, e.selectedDates[0].getTime()), Y = !1, E = 0, K = 0, D = b; D < k; D += Va.DAY)
        be(new Date(D), !0) || (Y = Y || D > b && D < k, D < c && (!E || D > E) ? E = D : D > c && (!K || D < K) && (K = D));
      var T = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + a));
      T.forEach(function(Q) {
        var Ye = Q.dateObj, $e = Ye.getTime(), ft = E > 0 && $e < E || K > 0 && $e > K;
        if (ft) {
          Q.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(rt) {
            Q.classList.remove(rt);
          });
          return;
        } else if (Y && !ft)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(rt) {
          Q.classList.remove(rt);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), c < r && $e === c ? Q.classList.add("startRange") : c > r && $e === c && Q.classList.add("endRange"), $e >= E && (K === 0 || $e <= K) && Pa($e, c, r) && Q.classList.add("inRange"));
      });
    }
  }
  function Ne() {
    e.isOpen && !e.config.static && !e.config.inline && qe();
  }
  function gt(n, a) {
    if (a === void 0 && (a = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = Ae(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), ae("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var c = e.isOpen;
    e.isOpen = !0, c || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), ae("onOpen"), qe(a)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function vt(n) {
    return function(a) {
      var r = e.config["_" + n + "Date"] = e.parseDate(a, e.config.dateFormat), c = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(b) {
        return be(b);
      }), !e.selectedDates.length && n === "min" && x(r), We()), e.daysContainer && (L(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!c && r !== void 0 && c.getFullYear() === r.getFullYear());
    };
  }
  function mt() {
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
    ], a = xe(xe({}, JSON.parse(JSON.stringify(t.dataset || {}))), o), r = {};
    e.config.parseDate = a.parseDate, e.config.formatDate = a.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(T) {
        e.config._enable = He(T);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(T) {
        e.config._disable = He(T);
      }
    });
    var c = a.mode === "time";
    if (!a.dateFormat && (a.enableTime || c)) {
      var b = ue.defaultConfig.dateFormat || it.dateFormat;
      r.dateFormat = a.noCalendar || c ? "H:i" + (a.enableSeconds ? ":S" : "") : b + " H:i" + (a.enableSeconds ? ":S" : "");
    }
    if (a.altInput && (a.enableTime || c) && !a.altFormat) {
      var k = ue.defaultConfig.altFormat || it.altFormat;
      r.altFormat = a.noCalendar || c ? "h:i" + (a.enableSeconds ? ":S K" : " K") : k + (" h:i" + (a.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: vt("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: vt("max")
    });
    var Y = function(T) {
      return function(Q) {
        e.config[T === "min" ? "_minTime" : "_maxTime"] = e.parseDate(Q, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: Y("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: Y("max")
    }), a.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, a);
    for (var E = 0; E < n.length; E++)
      e.config[n[E]] = e.config[n[E]] === !0 || e.config[n[E]] === "true";
    Et.filter(function(T) {
      return e.config[T] !== void 0;
    }).forEach(function(T) {
      e.config[T] = _t(e.config[T] || []).map(g);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var E = 0; E < e.config.plugins.length; E++) {
      var K = e.config.plugins[E](e) || {};
      for (var D in K)
        Et.indexOf(D) > -1 ? e.config[D] = _t(K[D]).map(g).concat(e.config[D]) : typeof a[D] > "u" && (e.config[D] = K[D]);
    }
    a.altInputClass || (e.config.altInputClass = Ve().className + " " + e.config.altInputClass), ae("onParseConfig");
  }
  function Ve() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Ue() {
    typeof e.config.locale != "object" && typeof ue.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = xe(xe({}, ue.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? ue.l10ns[e.config.locale] : void 0), Je.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Je.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Je.M = "(" + e.l10n.months.shorthand.join("|") + ")", Je.F = "(" + e.l10n.months.longhand.join("|") + ")", Je.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = xe(xe({}, o), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && ue.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Pt(e), e.parseDate = Bt({ config: e.config, l10n: e.l10n });
  }
  function qe(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      ae("onPreCalendarPosition");
      var a = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(en, tn) {
        return en + tn.offsetHeight;
      }, 0), c = e.calendarContainer.offsetWidth, b = e.config.position.split(" "), k = b[0], Y = b.length > 1 ? b[1] : null, E = a.getBoundingClientRect(), K = window.innerHeight - E.bottom, D = k === "above" || k !== "below" && K < r && E.top > r, T = window.pageYOffset + E.top + (D ? -r - 2 : a.offsetHeight + 2);
      if (Ce(e.calendarContainer, "arrowTop", !D), Ce(e.calendarContainer, "arrowBottom", D), !e.config.inline) {
        var Q = window.pageXOffset + E.left, Ye = !1, $e = !1;
        Y === "center" ? (Q -= (c - E.width) / 2, Ye = !0) : Y === "right" && (Q -= c - E.width, $e = !0), Ce(e.calendarContainer, "arrowLeft", !Ye && !$e), Ce(e.calendarContainer, "arrowCenter", Ye), Ce(e.calendarContainer, "arrowRight", $e);
        var ft = window.document.body.offsetWidth - (window.pageXOffset + E.right), rt = Q + c > window.document.body.offsetWidth, Kt = ft + c > window.document.body.offsetWidth;
        if (Ce(e.calendarContainer, "rightMost", rt), !e.config.static)
          if (e.calendarContainer.style.top = T + "px", !rt)
            e.calendarContainer.style.left = Q + "px", e.calendarContainer.style.right = "auto";
          else if (!Kt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = ft + "px";
          else {
            var St = J();
            if (St === void 0)
              return;
            var Ut = window.document.body.offsetWidth, qt = Math.max(0, Ut / 2 - c / 2), Zt = ".flatpickr-calendar.centerMost:before", Jt = ".flatpickr-calendar.centerMost:after", Xt = St.cssRules.length, Qt = "{left:" + E.left + "px;right:auto;}";
            Ce(e.calendarContainer, "rightMost", !1), Ce(e.calendarContainer, "centerMost", !0), St.insertRule(Zt + "," + Jt + Qt, Xt), e.calendarContainer.style.left = qt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function J() {
    for (var n = null, a = 0; a < document.styleSheets.length; a++) {
      var r = document.styleSheets[a];
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
    return n ?? N();
  }
  function N() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function L() {
    e.config.noCalendar || e.isMobile || (U(), bt(), W());
  }
  function pe() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function De(n) {
    n.preventDefault(), n.stopPropagation();
    var a = function(T) {
      return T.classList && T.classList.contains("flatpickr-day") && !T.classList.contains("flatpickr-disabled") && !T.classList.contains("notAllowed");
    }, r = Nt(Ae(n), a);
    if (r !== void 0) {
      var c = r, b = e.latestSelectedDateObj = new Date(c.dateObj.getTime()), k = (b.getMonth() < e.currentMonth || b.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = c, e.config.mode === "single")
        e.selectedDates = [b];
      else if (e.config.mode === "multiple") {
        var Y = Ct(b);
        Y ? e.selectedDates.splice(parseInt(Y), 1) : e.selectedDates.push(b);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = b, e.selectedDates.push(b), je(b, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(T, Q) {
        return T.getTime() - Q.getTime();
      }));
      if (w(), k) {
        var E = e.currentYear !== b.getFullYear();
        e.currentYear = b.getFullYear(), e.currentMonth = b.getMonth(), E && (ae("onYearChange"), U()), ae("onMonthChange");
      }
      if (bt(), W(), We(), !k && e.config.mode !== "range" && e.config.showMonths === 1 ? ne(c) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var K = e.config.mode === "single" && !e.config.enableTime, D = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (K || D) && pe();
      }
      P();
    }
  }
  var Pe = {
    locale: [Ue, m],
    showMonths: [Me, i, F],
    minDate: [O],
    maxDate: [O],
    positionElement: [at],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (j(e._input, "focus", e.open), j(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function tt(n, a) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        Pe[r] !== void 0 && Pe[r].forEach(function(c) {
          return c();
        });
    } else
      e.config[n] = a, Pe[n] !== void 0 ? Pe[n].forEach(function(c) {
        return c();
      }) : Et.indexOf(n) > -1 && (e.config[n] = _t(a));
    e.redraw(), We(!0);
  }
  function Re(n, a) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(c) {
        return e.parseDate(c, a);
      });
    else if (n instanceof Date || typeof n == "number")
      r = [e.parseDate(n, a)];
    else if (typeof n == "string")
      switch (e.config.mode) {
        case "single":
        case "time":
          r = [e.parseDate(n, a)];
          break;
        case "multiple":
          r = n.split(e.config.conjunction).map(function(c) {
            return e.parseDate(c, a);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(c) {
            return e.parseDate(c, a);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(c) {
      return c instanceof Date && be(c, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(c, b) {
      return c.getTime() - b.getTime();
    });
  }
  function Ze(n, a, r) {
    if (a === void 0 && (a = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(a);
    Re(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), O(void 0, a), x(), e.selectedDates.length === 0 && e.clear(!1), We(a), a && ae("onChange");
  }
  function He(n) {
    return n.slice().map(function(a) {
      return typeof a == "string" || typeof a == "number" || a instanceof Date ? e.parseDate(a, void 0, !0) : a && typeof a == "object" && a.from && a.to ? {
        from: e.parseDate(a.from, void 0),
        to: e.parseDate(a.to, void 0)
      } : a;
    }).filter(function(a) {
      return a;
    });
  }
  function wt() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && Re(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function nt() {
    if (e.input = Ve(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = X(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), at();
  }
  function at() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function ot() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = X("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    j(e.mobileInput, "change", function(a) {
      e.setDate(Ae(a).value, !1, e.mobileFormatStr), ae("onChange"), ae("onClose");
    });
  }
  function Vt(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function ae(n, a) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var c = 0; r[c] && c < r.length; c++)
          r[c](e.selectedDates, e.input.value, e, a);
      n === "onChange" && (e.input.dispatchEvent(Mt("change")), e.input.dispatchEvent(Mt("input")));
    }
  }
  function Mt(n) {
    var a = document.createEvent("Event");
    return a.initEvent(n, !0, !0), a;
  }
  function Ct(n) {
    for (var a = 0; a < e.selectedDates.length; a++) {
      var r = e.selectedDates[a];
      if (r instanceof Date && je(r, n) === 0)
        return "" + a;
    }
    return !1;
  }
  function Rt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : je(n, e.selectedDates[0]) >= 0 && je(n, e.selectedDates[1]) <= 0;
  }
  function bt() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, a) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + a), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[a].textContent = xt(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function Dt(n) {
    var a = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, a);
    }).filter(function(r, c, b) {
      return e.config.mode !== "range" || e.config.enableTime || b.indexOf(r) === c;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function We(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = Dt(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = Dt(e.config.altFormat)), n !== !1 && ae("onValueUpdate");
  }
  function Wt(n) {
    var a = Ae(n), r = e.prevMonthNav.contains(a), c = e.nextMonthNav.contains(a);
    r || c ? _(r ? -1 : 1) : e.yearElements.indexOf(a) >= 0 ? a.select() : a.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : a.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function Gt(n) {
    n.preventDefault();
    var a = n.type === "keydown", r = Ae(n), c = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[Le(e.amPM.textContent === e.l10n.amPM[0])]);
    var b = parseFloat(c.getAttribute("min")), k = parseFloat(c.getAttribute("max")), Y = parseFloat(c.getAttribute("step")), E = parseInt(c.value, 10), K = n.delta || (a ? n.which === 38 ? 1 : -1 : 0), D = E + Y * K;
    if (typeof c.value < "u" && c.value.length === 2) {
      var T = c === e.hourElement, Q = c === e.minuteElement;
      D < b ? (D = k + D + Le(!T) + (Le(T) && Le(!e.amPM)), Q && oe(void 0, -1, e.hourElement)) : D > k && (D = c === e.hourElement ? D - k - Le(!e.amPM) : b, Q && oe(void 0, 1, e.hourElement)), e.amPM && T && (Y === 1 ? D + E === 23 : Math.abs(D - E) > Y) && (e.amPM.textContent = e.l10n.amPM[Le(e.amPM.textContent === e.l10n.amPM[0])]), c.value = Se(D);
    }
  }
  return l(), e;
}
function st(t, o) {
  for (var e = Array.prototype.slice.call(t).filter(function(g) {
    return g instanceof HTMLElement;
  }), f = [], l = 0; l < e.length; l++) {
    var u = e[l];
    try {
      if (u.getAttribute("data-fp-omit") !== null)
        continue;
      u._flatpickr !== void 0 && (u._flatpickr.destroy(), u._flatpickr = void 0), u._flatpickr = Wa(u, o || {}), f.push(u._flatpickr);
    } catch (g) {
      console.error(g);
    }
  }
  return f.length === 1 ? f[0] : f;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return st(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return st([this], t);
});
var ue = function(t, o) {
  return typeof t == "string" ? st(window.document.querySelectorAll(t), o) : t instanceof Node ? st([t], o) : st(t, o);
};
ue.defaultConfig = {};
ue.l10ns = {
  en: xe({}, pt),
  default: xe({}, pt)
};
ue.localize = function(t) {
  ue.l10ns.default = xe(xe({}, ue.l10ns.default), t);
};
ue.setDefaults = function(t) {
  ue.defaultConfig = xe(xe({}, ue.defaultConfig), t);
};
ue.parseDate = Bt({});
ue.formatDate = Pt({});
ue.compareDates = je;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return st(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = ue);
var Ga = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ka(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Yt = { exports: {} };
(function(t, o) {
  (function(e, f) {
    t.exports = f();
  })(Ga, function() {
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
      return e = Object.assign || function(y) {
        for (var s, w = 1, x = arguments.length; w < x; w++) {
          s = arguments[w];
          for (var C in s) Object.prototype.hasOwnProperty.call(s, C) && (y[C] = s[C]);
        }
        return y;
      }, e.apply(this, arguments);
    }, f = function(d, y, s) {
      return s.months[y ? "shorthand" : "longhand"][d];
    };
    function l(d) {
      for (; d.firstChild; )
        d.removeChild(d.firstChild);
    }
    function u(d) {
      try {
        if (typeof d.composedPath == "function") {
          var y = d.composedPath();
          return y[0];
        }
        return d.target;
      } catch {
        return d.target;
      }
    }
    var g = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function i(d) {
      var y = e(e({}, g), d);
      return function(s) {
        s.config.dateFormat = y.dateFormat, s.config.altFormat = y.altFormat;
        var w = { monthsContainer: null };
        function x() {
          if (s.rContainer) {
            l(s.rContainer);
            for (var S = 0; S < s.monthElements.length; S++) {
              var R = s.monthElements[S];
              R.parentNode && R.parentNode.removeChild(R);
            }
          }
        }
        function C() {
          s.rContainer && (w.monthsContainer = s._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, z(), s.rContainer.appendChild(w.monthsContainer), s.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + y.theme));
        }
        function z() {
          if (w.monthsContainer) {
            l(w.monthsContainer);
            for (var S = document.createDocumentFragment(), R = 0; R < 12; R++) {
              var W = s.createDay("flatpickr-monthSelect-month", new Date(s.currentYear, R), 0, R);
              W.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && W.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && W.classList.add("today"), W.textContent = f(R, y.shorthand, s.l10n), W.addEventListener("click", O), S.appendChild(W);
            }
            w.monthsContainer.appendChild(S), s.config.minDate && s.currentYear === s.config.minDate.getFullYear() ? s.prevMonthNav.classList.add("flatpickr-disabled") : s.prevMonthNav.classList.remove("flatpickr-disabled"), s.config.maxDate && s.currentYear === s.config.maxDate.getFullYear() ? s.nextMonthNav.classList.add("flatpickr-disabled") : s.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function j() {
          s._bind(s.prevMonthNav, "click", function(S) {
            S.preventDefault(), S.stopPropagation(), s.changeYear(s.currentYear - 1), q(), z();
          }), s._bind(s.nextMonthNav, "click", function(S) {
            S.preventDefault(), S.stopPropagation(), s.changeYear(s.currentYear + 1), q(), z();
          }), s._bind(w.monthsContainer, "mouseover", function(S) {
            s.config.mode === "range" && s.onMouseOver(u(S), "flatpickr-monthSelect-month");
          });
        }
        function P() {
          if (s.rContainer && s.selectedDates.length) {
            for (var S = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), R = 0; R < S.length; R++)
              S[R].classList.remove("selected");
            var W = s.selectedDates[0].getMonth(), U = s.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (W + 1) + ")");
            U && U.classList.add("selected");
          }
        }
        function q() {
          var S = s.selectedDates[0];
          if (S && (S = new Date(S), S.setFullYear(s.currentYear), s.config.minDate && S < s.config.minDate && (S = s.config.minDate), s.config.maxDate && S > s.config.maxDate && (S = s.config.maxDate), s.currentYear = S.getFullYear()), s.currentYearElement.value = String(s.currentYear), s.rContainer) {
            var R = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            R.forEach(function(W) {
              W.dateObj.setFullYear(s.currentYear), s.config.minDate && W.dateObj < s.config.minDate || s.config.maxDate && W.dateObj > s.config.maxDate ? W.classList.add("flatpickr-disabled") : W.classList.remove("flatpickr-disabled");
            });
          }
          P();
        }
        function O(S) {
          S.preventDefault(), S.stopPropagation();
          var R = u(S);
          if (R instanceof Element && !R.classList.contains("flatpickr-disabled") && !R.classList.contains("notAllowed") && (Z(R.dateObj), s.config.closeOnSelect)) {
            var W = s.config.mode === "single", U = s.config.mode === "range" && s.selectedDates.length === 2;
            (W || U) && s.close();
          }
        }
        function Z(S) {
          var R = new Date(s.currentYear, S.getMonth(), S.getDate()), W = [];
          switch (s.config.mode) {
            case "single":
              W = [R];
              break;
            case "multiple":
              W.push(R);
              break;
            case "range":
              s.selectedDates.length === 2 ? W = [R] : (W = s.selectedDates.concat([R]), W.sort(function(U, he) {
                return U.getTime() - he.getTime();
              }));
              break;
          }
          s.setDate(W, !0), P();
        }
        var oe = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ve(S, R, W, U) {
          var he = oe[U.keyCode] !== void 0;
          if (!(!he && U.keyCode !== 13) && !(!s.rContainer || !w.monthsContainer)) {
            var Me = s.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), de = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (de === -1) {
              var fe = Me || w.monthsContainer.firstElementChild;
              fe.focus(), de = fe.$i;
            }
            he ? w.monthsContainer.children[(12 + de + oe[U.keyCode]) % 12].focus() : U.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && Z(document.activeElement.dateObj);
          }
        }
        function re() {
          var S;
          ((S = s.config) === null || S === void 0 ? void 0 : S.mode) === "range" && s.selectedDates.length === 1 && s.clear(!1), s.selectedDates.length || z();
        }
        function ne() {
          y._stubbedCurrentMonth = s._initialDate.getMonth(), s._initialDate.setMonth(y._stubbedCurrentMonth), s.currentMonth = y._stubbedCurrentMonth;
        }
        function ie() {
          y._stubbedCurrentMonth && (s._initialDate.setMonth(y._stubbedCurrentMonth), s.currentMonth = y._stubbedCurrentMonth, delete y._stubbedCurrentMonth);
        }
        function me() {
          if (w.monthsContainer !== null)
            for (var S = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), R = 0; R < S.length; R++)
              S[R].removeEventListener("click", O);
        }
        return {
          onParseConfig: function() {
            s.config.enableTime = !1;
          },
          onValueUpdate: P,
          onKeyDown: ve,
          onReady: [
            ne,
            x,
            C,
            j,
            P,
            function() {
              s.config.onClose.push(re), s.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            ie,
            me,
            function() {
              s.config.onClose = s.config.onClose.filter(function(S) {
                return S !== re;
              });
            }
          ]
        };
      };
    }
    return i;
  });
})(Yt);
var Ua = Yt.exports;
const qa = /* @__PURE__ */ Ka(Ua), Za = { class: "relative" }, Ja = ["placeholder", "value", "disabled", "readonly"], Xa = {
  key: 0,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, Qa = { class: "flex items-center justify-between mb-2" }, eo = { class: "text-xs opacity-70" }, to = { class: "grid grid-cols-4 gap-2" }, no = ["onClick"], ar = /* @__PURE__ */ ee({
  __name: "DateTimePicker",
  props: {
    modelValue: {},
    mode: { default: "single" },
    picker: { default: "date" },
    enableTime: { type: Boolean, default: !1 },
    noCalendar: { type: Boolean, default: !1 },
    dateFormat: {},
    displayFormat: {},
    placeholder: { default: "" },
    disabled: { type: Boolean },
    readonly: { type: Boolean },
    minDate: {},
    maxDate: {},
    time24hr: { type: Boolean, default: !0 },
    inputClass: { default: "" }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: o }) {
    const e = t, f = o, l = B(null), u = B(!1), g = B((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let i = null;
    const d = A(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), y = A(() => e.displayFormat ? e.displayFormat : e.picker === "month" ? "M" : d.value), s = A(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), w = () => {
      var P, q;
      if (l.value) {
        if (e.picker === "year-grid") {
          (P = i == null ? void 0 : i.destroy) == null || P.call(i), i = null;
          return;
        }
        (q = i == null ? void 0 : i.destroy) == null || q.call(i), i = ue(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            qa({
              shorthand: !0,
              dateFormat: d.value,
              altFormat: y.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: d.value,
          altInput: !!e.displayFormat || e.picker === "month",
          altFormat: y.value,
          time_24hr: e.time24hr,
          clickOpens: !0,
          allowInput: !1,
          appendTo: document.body,
          minDate: e.minDate || void 0,
          maxDate: e.maxDate || void 0,
          defaultDate: e.modelValue,
          onReady: () => {
            var O, Z;
            e.picker === "month" && ((O = i == null ? void 0 : i.calendarContainer) == null || O.classList.add("flatpickr-month-only")), e.picker === "year" && ((Z = i == null ? void 0 : i.calendarContainer) == null || Z.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var O, Z;
            e.picker === "month" && ((O = i == null ? void 0 : i.calendarContainer) == null || O.classList.add("flatpickr-month-only")), e.picker === "year" && ((Z = i == null ? void 0 : i.calendarContainer) == null || Z.classList.add("flatpickr-year-only"));
          },
          onChange: (O) => {
            if (e.mode === "range") {
              const Z = O.map(
                (oe) => i.formatDate(oe, d.value)
              );
              f("update:modelValue", Z);
            } else {
              const Z = O[0] ? i.formatDate(O[0], d.value) : "";
              f("update:modelValue", Z);
            }
          }
        });
      }
    }, x = () => {
      var P;
      if (e.picker === "year-grid") {
        u.value = !0;
        return;
      }
      (P = i == null ? void 0 : i.open) == null || P.call(i);
    };
    dt(w), ct(() => {
      var P;
      return (P = i == null ? void 0 : i.destroy) == null ? void 0 : P.call(i);
    }), se(
      () => [
        e.mode,
        e.picker,
        e.enableTime,
        e.noCalendar,
        e.dateFormat,
        e.displayFormat,
        e.time24hr,
        e.minDate,
        e.maxDate
      ],
      w
    ), se(
      () => e.modelValue,
      (P) => {
        !i || e.picker === "year-grid" || i.setDate(P, !1);
      }
    );
    const C = A(
      () => Array.from({ length: 12 }, (P, q) => g.value + q)
    ), z = (P) => {
      f("update:modelValue", P.toString()), u.value = !1;
    }, j = (P) => {
      if (!u.value) return;
      const q = P.target;
      if (l.value && q && l.value.contains(q)) return;
      const O = document.querySelector(".mitreka-year-grid");
      O && q && O.contains(q) || (u.value = !1);
    };
    return dt(() => document.addEventListener("click", j)), ct(() => document.removeEventListener("click", j)), (P, q) => (p(), v("div", Za, [
      h("input", {
        ref_key: "inputEl",
        ref: l,
        class: $(["input w-full", t.inputClass]),
        placeholder: t.placeholder,
        value: s.value,
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: x,
        onFocus: x
      }, null, 42, Ja),
      t.picker === "year-grid" && u.value ? (p(), v("div", Xa, [
        h("div", Qa, [
          h("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: q[0] || (q[0] = (O) => g.value -= 12)
          }, " Prev "),
          h("div", eo, V(g.value) + " - " + V(g.value + 11), 1),
          h("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: q[1] || (q[1] = (O) => g.value += 12)
          }, " Next ")
        ]),
        h("div", to, [
          (p(!0), v(ye, null, ze(C.value, (O) => (p(), v("button", {
            key: O,
            class: $(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === O.toString() }]),
            type: "button",
            onClick: (Z) => z(O)
          }, V(O), 11, no))), 128))
        ])
      ])) : G("", !0)
    ]));
  }
}), or = /* @__PURE__ */ ee({
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
  setup(t, { emit: o }) {
    const e = t, f = o, l = ln(), u = B(null), g = B(null), i = B(13), d = B(!1);
    let y = null, s = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], x = [], C = B("normal"), z = A(() => [
      "w-full",
      C.value === "autoHeight" ? "h-auto" : "h-full"
    ]), j = A(() => C.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), P = () => {
      const m = document.documentElement, M = m.classList.contains("dark"), _ = (m.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      d.value = M || _;
    }, q = A(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : d.value), O = A(() => q.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), Z = A(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), oe = A(() => ["agx", O.value, Z.value, l.class]), ve = A(() => [{ "--ag-odd-row-background-color": e.striped ? q.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), re = A(() => {
      const { class: m, style: M, onGridReady: _, ...I } = l;
      return I;
    }), ne = (m) => typeof m == "number" && Number.isFinite(m) ? m : void 0, ie = A(() => {
      const m = l.gridOptions;
      if (m && typeof m == "object") return m;
      const M = l["grid-options"];
      return M && typeof M == "object" ? M : {};
    }), me = (m) => {
      const M = ne(l[m]);
      if (typeof M == "number") return M;
      const I = ne(l[m === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof I == "number" ? I : ne(ie.value[m]);
    }, S = () => {
      const m = l.domLayout;
      if (typeof m == "string" && m.length > 0) return m;
      const M = l["dom-layout"];
      if (typeof M == "string" && M.length > 0) return M;
      const _ = ie.value.domLayout;
      return typeof _ == "string" && _.length > 0 ? _ : void 0;
    }, R = () => {
      var M, _;
      if (!g.value) return 0;
      const m = (I) => typeof I == "number" && Number.isFinite(I) && I >= 0;
      if (typeof g.value.getDisplayedRowCount == "function") {
        const I = g.value.getDisplayedRowCount();
        if (m(I)) return I;
      }
      if (typeof g.value.paginationGetRowCount == "function") {
        const I = g.value.paginationGetRowCount();
        if (m(I)) return I;
      }
      if (typeof g.value.getModel == "function") {
        const I = (_ = (M = g.value).getModel) == null ? void 0 : _.call(M), te = I && typeof I.getRowCount == "function" ? I.getRowCount() : void 0;
        if (m(te)) return te;
      }
      return 0;
    }, W = () => {
      const m = Number(e.autoHeightThreshold);
      return Number.isFinite(m) ? Math.max(1, Math.floor(m)) : 15;
    }, U = () => {
      if (!g.value) return;
      const m = S();
      if (m) {
        C.value = m, g.value.setGridOption("domLayout", m);
        return;
      }
      const M = e.autoHeightWhenFewRows && R() < W() ? "autoHeight" : "normal";
      C.value = M, g.value.setGridOption("domLayout", M);
    }, he = () => {
      var m;
      for (; x.length > 0; )
        (m = x.pop()) == null || m();
    }, Me = () => {
      if (!g.value) return;
      he();
      const m = () => U();
      w.forEach((M) => {
        g.value.addEventListener(M, m), x.push(() => {
          var _;
          (_ = g.value) == null || _.removeEventListener(M, m);
        });
      });
    }, de = () => {
      if (!e.autoHeaderHeight || !g.value) return;
      const m = me("headerHeight") ?? hn(e.density), M = me("groupHeaderHeight") ?? pn(e.density);
      g.value.setGridOption("headerHeight", m), g.value.setGridOption("groupHeaderHeight", M);
    }, fe = () => {
      if (!e.autoRowHeight || !g.value) return;
      const m = gn(i.value, e.density);
      g.value.setGridOption("rowHeight", m), g.value.setGridOption("getRowHeight", () => m), g.value.resetRowHeights();
    }, F = (m) => {
      g.value = m.api, i.value = vn(u.value), Me(), de(), U(), fe(), requestAnimationFrame(() => U()), f("grid-ready", m);
    };
    return se(
      () => e.density,
      () => {
        var m;
        de(), fe(), (m = g.value) == null || m.refreshCells({ force: !0 });
      }
    ), se(
      () => [
        l.headerHeight,
        l["header-height"],
        l.groupHeaderHeight,
        l["group-header-height"],
        l.gridOptions,
        l["grid-options"]
      ],
      () => {
        de();
      }
    ), se(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        U();
      }
    ), se(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        U();
      }
    ), se(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => U());
      }
    ), dt(() => {
      P(), e.autoObserveTheme && (y = new MutationObserver(P), y.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && u.value && (s = fn(u.value));
    }), ct(() => {
      y == null || y.disconnect(), he(), s == null || s();
    }), (m, M) => (p(), v("div", {
      ref_key: "hostRef",
      ref: u,
      class: $(z.value),
      style: ge(j.value)
    }, [
      ce(H(bn), dn(re.value, {
        class: oe.value,
        theme: "legacy",
        style: ve.value,
        onGridReady: F
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), ao = ["disabled"], oo = ["onMouseenter", "onClick", "aria-selected"], ro = 320, io = 12, rr = /* @__PURE__ */ ee({
  __name: "SelectDropdown",
  props: {
    modelValue: {},
    options: {},
    placeholder: { default: "Choose..." },
    disabled: { type: Boolean, default: !1 },
    size: { default: "md" },
    color: { default: "default" },
    variant: { default: "solid" }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: o }) {
    const e = t, f = o, l = B(null), u = B(null), g = B(null), i = B(!1), d = B(-1), y = B(0), s = B(0), w = B(0), x = B(240), C = B(null), z = B(!1), j = A(
      () => e.options.find((F) => F.value === e.modelValue) ?? null
    ), P = A(() => {
      var F;
      return ((F = j.value) == null ? void 0 : F.label) ?? e.placeholder;
    }), q = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, O = {
      default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
      primary: "bg-primary border-primary text-primary-content hover:brightness-95",
      secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
      accent: "bg-accent border-accent text-accent-content hover:brightness-95",
      info: "bg-info border-info text-info-content hover:brightness-95",
      success: "bg-success border-success text-success-content hover:brightness-95",
      warning: "bg-warning border-warning text-warning-content hover:brightness-95",
      error: "bg-error border-error text-error-content hover:brightness-95"
    }, Z = {
      default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
      primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
      secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
      accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
      info: "bg-transparent border-info text-info hover:bg-info/10",
      success: "bg-transparent border-success text-success hover:bg-success/10",
      warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
      error: "bg-transparent border-error text-error hover:bg-error/10"
    }, oe = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, ve = A(() => {
      const F = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", m = q[e.size], M = e.variant === "outline" ? Z[e.color] : O[e.color], _ = e.disabled ? "opacity-60 cursor-not-allowed" : "", I = i.value ? `ring-3 ${oe[e.color]}` : "";
      return [F, m, M, _, I].join(" ");
    }), re = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, ne = A(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), ie = (F) => {
      const m = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: m,
        backgroundColor: F ? "var(--color-base-200)" : "transparent"
      } : {
        color: m,
        backgroundColor: F ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, me = A(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), S = A(() => ({
      top: `${y.value}px`,
      left: `${s.value}px`,
      width: `${w.value}px`
    })), R = A(() => ({
      maxHeight: `${x.value}px`
    })), W = () => {
      if (!i.value || !u.value || !g.value) return;
      const F = u.value.getBoundingClientRect(), m = window.innerWidth, M = window.innerHeight, _ = 6, I = io, te = g.value.scrollHeight || g.value.offsetHeight || 240;
      C.value == null && (C.value = te);
      const Ee = C.value, we = M - F.bottom - _ - I, Ie = F.top - _ - I, ke = we < 180 && Ie > we;
      z.value = ke;
      const Oe = Math.min(ro, Ee, Math.max(0, ke ? Ie : we));
      x.value = Math.max(64, Oe), w.value = Math.max(160, F.width), s.value = Math.min(
        Math.max(F.left, I),
        m - w.value - I
      ), ke ? y.value = Math.max(I, F.top - _ - x.value) : y.value = Math.min(
        M - I - x.value,
        F.bottom + _
      );
    }, U = () => {
      e.disabled || (i.value = !i.value, i.value && (d.value = e.options.findIndex((F) => F.value === e.modelValue), Fe(W)));
    }, he = (F) => {
      F.disabled || (f("update:modelValue", F.value), f("change", F.value), i.value = !1);
    }, Me = (F) => {
      if (!e.disabled)
        switch (F.key) {
          case "Enter":
          case " ":
            if (F.preventDefault(), i.value && d.value >= 0) {
              const m = e.options[d.value];
              m && !m.disabled && he(m);
            } else
              U();
            break;
          case "Escape":
            i.value = !1;
            break;
          case "ArrowDown":
            F.preventDefault(), i.value ? d.value = Math.min(d.value + 1, e.options.length - 1) : (i.value = !0, d.value = 0, Fe(W));
            break;
          case "ArrowUp":
            F.preventDefault(), i.value && (d.value = Math.max(d.value - 1, 0));
            break;
        }
    }, de = (F) => {
      var I, te;
      const m = F.target, M = !!((I = l.value) != null && I.contains(m)), _ = !!((te = g.value) != null && te.contains(m));
      !M && !_ && (i.value = !1);
    }, fe = (F) => {
      var M;
      if (!i.value) return;
      const m = F == null ? void 0 : F.target;
      m && ((M = g.value) != null && M.contains(m)) || W();
    };
    return se(
      () => [i.value, e.options.length],
      async ([F]) => {
        if (!F) {
          C.value = null;
          return;
        }
        await Fe(), W();
      }
    ), dt(() => {
      document.addEventListener("click", de), window.addEventListener("resize", fe), window.addEventListener("scroll", fe, !0);
    }), ct(() => {
      document.removeEventListener("click", de), window.removeEventListener("resize", fe), window.removeEventListener("scroll", fe, !0);
    }), (F, m) => (p(), v("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      h("button", {
        ref_key: "triggerRef",
        ref: u,
        type: "button",
        class: $(ve.value),
        disabled: t.disabled,
        onClick: U,
        onKeydown: Me
      }, [
        h("span", {
          class: $([j.value ? "" : "opacity-60"])
        }, V(P.value), 3),
        ce(Be, {
          name: i.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, ao),
      (p(), Ge(ut, { to: "body" }, [
        ce(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": z.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": z.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            i.value ? (p(), v("div", {
              key: 0,
              ref_key: "menuRef",
              ref: g,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: ge([ne.value, S.value])
            }, [
              h("ul", {
                class: "overflow-auto",
                style: ge(R.value),
                role: "listbox"
              }, [
                (p(!0), v(ye, null, ze(t.options, (M, _) => {
                  var I, te, Ee;
                  return p(), v("li", {
                    key: M.value,
                    class: $([
                      re[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      M.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((I = j.value) == null ? void 0 : I.value) === M.value ? "font-medium" : ""
                    ]),
                    style: ge(ie(_ === d.value)),
                    onMouseenter: (we) => d.value = _,
                    onClick: (we) => M.disabled ? null : he(M),
                    role: "option",
                    "aria-selected": ((te = j.value) == null ? void 0 : te.value) === M.value
                  }, [
                    h("span", null, V(M.label), 1),
                    ((Ee = j.value) == null ? void 0 : Ee.value) === M.value ? (p(), Ge(Be, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: ge(me.value)
                    }, null, 8, ["style"])) : G("", !0)
                  ], 46, oo);
                }), 128))
              ], 4)
            ], 4)) : G("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), so = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, lo = ["disabled", "placeholder", "value", "readonly"], co = ["disabled"], uo = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, fo = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], ho = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, po = 320, go = 12, ir = /* @__PURE__ */ ee({
  __name: "SelectInput",
  props: {
    modelValue: {},
    options: {},
    fetchOptions: { type: Function },
    debounceMs: {},
    placeholder: {},
    clearable: { type: Boolean },
    disabled: { type: Boolean },
    size: {},
    color: {}
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: o }) {
    const e = t, f = o, l = B(e.modelValue ?? null);
    se(
      () => e.modelValue,
      (m) => l.value = m ?? null
    ), se(l, (m) => f("update:modelValue", m));
    const {
      root: u,
      inputEl: g,
      menu: i,
      open: d,
      query: y,
      hoverIdx: s,
      loading: w,
      filtered: x,
      selected: C,
      openMenu: z,
      closeMenu: j,
      choose: P,
      clear: q,
      onKey: O
    } = mn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), Z = B(null), oe = B(null), ve = B(0), re = B(0), ne = B(0), ie = B(240), me = B(null), S = B(!1), R = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, W = (m) => !m || m === "default" ? "input" : `input input-${m}`, U = A(
      () => {
        var m;
        return d.value ? y.value : ((m = C.value) == null ? void 0 : m.label) ?? "";
      }
    ), he = A(() => ({
      top: `${ve.value}px`,
      left: `${re.value}px`,
      width: `${ne.value}px`
    })), Me = A(() => ({
      maxHeight: `${ie.value}px`
    })), de = () => {
      var Ke, _e;
      if (!d.value || !Z.value) return;
      const m = Z.value.getBoundingClientRect(), M = window.innerWidth, _ = window.innerHeight, I = 6, te = go, Ee = (((Ke = oe.value) == null ? void 0 : Ke.scrollHeight) ?? 0) || (((_e = i.value) == null ? void 0 : _e.scrollHeight) ?? 0) || 240;
      me.value == null && (me.value = Ee);
      const we = me.value, Ie = _ - m.bottom - I - te, ke = m.top - I - te, be = Ie < 180 && ke > Ie;
      S.value = be;
      const et = Math.min(po, we, Math.max(0, be ? ke : Ie));
      ie.value = Math.max(64, et), ne.value = Math.max(220, m.width), re.value = Math.min(
        Math.max(m.left, te),
        M - ne.value - te
      ), be ? ve.value = Math.max(te, m.top - I - ie.value) : ve.value = Math.min(
        _ - te - ie.value,
        m.bottom + I
      );
    }, fe = (m) => {
      var _;
      if (!d.value) return;
      const M = m == null ? void 0 : m.target;
      M && ((_ = oe.value) != null && _.contains(M)) || de();
    };
    function F() {
      if (!e.disabled) {
        if (d.value) {
          j();
          return;
        }
        z(), Fe(de);
      }
    }
    return se(
      () => [d.value, w.value, x.value.length],
      async ([m]) => {
        m && (await Fe(), de());
      }
    ), se(d, (m) => {
      if (!m) {
        me.value = null;
        return;
      }
      Fe(de);
    }), dt(() => {
      window.addEventListener("resize", fe), window.addEventListener("scroll", fe, !0);
    }), ct(() => {
      window.removeEventListener("resize", fe), window.removeEventListener("scroll", fe, !0);
    }), (m, M) => (p(), v("div", {
      ref_key: "root",
      ref: u,
      class: "relative"
    }, [
      h("div", {
        ref_key: "triggerRef",
        ref: Z,
        class: "relative"
      }, [
        h("span", so, [
          ce(Be, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        h("input", {
          ref_key: "inputEl",
          ref: g,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: U.value,
          onFocus: M[0] || (M[0] = //@ts-ignore
          (..._) => H(z) && H(z)(..._)),
          onClick: M[1] || (M[1] = //@ts-ignore
          (..._) => H(z) && H(z)(..._)),
          onKeydown: M[2] || (M[2] = //@ts-ignore
          (..._) => H(O) && H(O)(..._)),
          readonly: !H(d),
          class: $([
            R[t.size || "md"],
            W(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: M[3] || (M[3] = (_) => H(d) ? y.value = _.target.value : null)
        }, null, 42, lo),
        t.clearable && H(C) && !t.disabled ? (p(), v("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onClick: M[4] || (M[4] = //@ts-ignore
          (..._) => H(q) && H(q)(..._))
        }, [
          ce(Be, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : G("", !0),
        h("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onClick: F,
          disabled: t.disabled
        }, [
          ce(Be, {
            name: H(d) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 8, co)
      ], 512),
      (p(), Ge(ut, { to: "body" }, [
        ce(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            H(d) ? (p(), v("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: oe,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: ge(he.value)
            }, [
              H(w) ? (p(), v("div", uo, "Loading...")) : (p(), v("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: ge(Me.value),
                role: "listbox"
              }, [
                (p(!0), v(ye, null, ze(H(x), (_, I) => {
                  var te, Ee;
                  return p(), v("li", {
                    key: _.value,
                    "data-idx": I,
                    class: $([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      I === H(s) ? "bg-base-200" : "",
                      _.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (we) => s.value = I,
                    onMousedown: Te((we) => _.disabled ? null : H(P)(_), ["prevent"]),
                    role: "option",
                    "aria-selected": ((te = H(C)) == null ? void 0 : te.value) === _.value
                  }, [
                    h("span", null, V(_.label), 1),
                    ((Ee = H(C)) == null ? void 0 : Ee.value) === _.value ? (p(), Ge(Be, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : G("", !0)
                  ], 42, fo);
                }), 128)),
                !H(x).length && !H(w) ? (p(), v("li", ho, " No results ")) : G("", !0)
              ], 4))
            ], 4)) : G("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), vo = { class: "truncate" }, mo = ["onClick"], wo = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, bo = {
  key: 1,
  class: "flex-1 min-w-0"
}, yo = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, ko = { class: "truncate" }, xo = ["onClick"], Mo = { class: "flex items-center gap-2 w-full" }, Co = { class: "flex-1 min-w-[8ch]" }, Do = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, So = { class: "truncate" }, Eo = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, _o = ["onMousedown"], Ho = ["checked"], $o = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Ao = 320, jo = 12, To = /* @__PURE__ */ ee({
  __name: "MultiSelect",
  props: {
    modelValue: {},
    options: {},
    fetchOptions: {},
    debounceMs: {},
    placeholder: {},
    disabled: { type: Boolean },
    size: {},
    displayMode: { default: "stacked" }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: o }) {
    const e = t, f = o, l = B(e.modelValue ?? []);
    se(
      () => e.modelValue,
      (J) => l.value = J ?? []
    ), se(l, (J) => f("update:modelValue", J));
    const {
      root: u,
      inputEl: g,
      menu: i,
      open: d,
      query: y,
      loading: s,
      filtered: w,
      selectedList: x,
      openMenu: C,
      toggle: z,
      clearAll: j,
      onKey: P
    } = wn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), q = B(null), O = B(null), Z = B(0), oe = B(0), ve = B(0), re = B(240), ne = B(null), ie = B(!1), me = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, S = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, R = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, W = {
      xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
      md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
      lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" }
    }, U = {
      xs: "badge-xs text-xs",
      sm: "badge-sm text-sm",
      md: "text-sm",
      lg: "badge-lg text-lg",
      xl: "badge-xl text-xl"
    }, he = {
      xs: "-mr-2 h-4 w-4",
      sm: "-mr-2.5 h-5 w-5",
      md: "-mr-3 h-6 w-6",
      lg: "-mr-3 h-7 w-7",
      xl: "-mr-3 h-8 w-8"
    }, Me = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, de = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, fe = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, F = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, m = A(() => e.displayMode ?? "stacked"), M = A(() => m.value === "inline-compact"), _ = A(
      () => S[e.size || "md"]
    ), I = A(
      () => R[_.value]
    ), te = A(
      () => W[_.value]
    ), Ee = A(() => ({
      top: `${Z.value}px`,
      left: `${oe.value}px`,
      width: `${ve.value}px`
    })), we = A(() => ({
      maxHeight: `${re.value}px`
    })), Ie = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), ke = (J) => l.value.some((N) => String(N) === String(J)), be = A(() => [...w.value].sort((J, N) => {
      const L = ke(J.value), pe = ke(N.value);
      return L !== pe ? L ? -1 : 1 : Ie.compare(J.label, N.label);
    })), Oe = B(null), et = B(null), Ke = B([]), _e = B(0);
    let Ne = null;
    const gt = A(
      () => Math.max(0, x.value.length - _e.value)
    );
    function vt(J, N) {
      J && (Ke.value[N] = J);
    }
    function mt() {
      var tt, Re, Ze;
      if (!M.value) {
        _e.value = x.value.length;
        return;
      }
      const J = ((tt = Oe.value) == null ? void 0 : tt.clientWidth) ?? 0, N = x.value.length;
      if (!J || N === 0) {
        _e.value = N;
        return;
      }
      const L = ((Re = et.value) == null ? void 0 : Re.offsetWidth) ?? 28, pe = 6;
      let De = 0, Pe = 0;
      for (let He = 0; He < N; He += 1) {
        const wt = ((Ze = Ke.value[He]) == null ? void 0 : Ze.offsetWidth) ?? 0, nt = De + (He > 0 ? pe : 0) + wt, ot = N - (He + 1) > 0 ? pe + L : 0;
        if (nt + ot <= J)
          De = nt, Pe = He + 1;
        else
          break;
      }
      Pe === 0 && N > 0 && (Pe = 1), _e.value = Pe;
    }
    const Ve = () => {
      var at, ot;
      if (!d.value || !q.value) return;
      const J = q.value.getBoundingClientRect(), N = window.innerWidth, L = window.innerHeight, pe = 6, De = jo, Pe = (((at = O.value) == null ? void 0 : at.scrollHeight) ?? 0) || (((ot = i.value) == null ? void 0 : ot.scrollHeight) ?? 0) || 240;
      ne.value == null && (ne.value = Pe);
      const tt = ne.value, Re = L - J.bottom - pe - De, Ze = J.top - pe - De, He = Re < 180 && Ze > Re;
      ie.value = He;
      const nt = Math.min(Ao, tt, Math.max(0, He ? Ze : Re));
      re.value = Math.max(64, nt), ve.value = Math.max(260, J.width), oe.value = Math.min(
        Math.max(J.left, De),
        N - ve.value - De
      ), He ? Z.value = Math.max(De, J.top - pe - re.value) : Z.value = Math.min(
        L - De - re.value,
        J.bottom + pe
      );
    }, Ue = (J) => {
      var L;
      if (!d.value) return;
      const N = J == null ? void 0 : J.target;
      N && ((L = O.value) != null && L.contains(N)) || Ve();
    };
    async function qe() {
      await Fe(), mt();
    }
    return se(
      () => [x.value.length, e.size, e.displayMode, y.value],
      () => {
        qe();
      },
      { immediate: !0 }
    ), se(be, () => {
      qe();
    }), se(
      () => [d.value, s.value, be.value.length],
      async ([J]) => {
        if (!J) {
          ne.value = null;
          return;
        }
        await Fe(), Ve();
      }
    ), se(Oe, (J) => {
      Ne == null || Ne.disconnect(), Ne = null, J && (Ne = new ResizeObserver(() => {
        mt();
      }), Ne.observe(J));
    }), dt(() => {
      window.addEventListener("resize", Ue), window.addEventListener("scroll", Ue, !0);
    }), ct(() => {
      Ne == null || Ne.disconnect(), window.removeEventListener("resize", Ue), window.removeEventListener("scroll", Ue, !0);
    }), (J, N) => (p(), v("div", {
      ref_key: "root",
      ref: u,
      class: "relative"
    }, [
      h("div", {
        ref_key: "triggerRef",
        ref: q,
        class: $([
          m.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          me[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: N[10] || (N[10] = //@ts-ignore
        (...L) => H(C) && H(C)(...L))
      }, [
        m.value === "inline-compact" ? (p(), v(ye, { key: 0 }, [
          h("span", {
            class: $(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", de[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3),
          H(x).length ? (p(), v("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Oe,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (p(!0), v(ye, null, ze(H(x).slice(0, _e.value), (L) => (p(), v("span", {
              key: L.value,
              class: $(["badge badge-soft-primary gap-1 max-w-[12rem]", U[t.size || "md"]])
            }, [
              h("span", vo, V(L.label), 1),
              h("button", {
                type: "button",
                class: $([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  he[t.size || "md"]
                ]),
                onClick: Te((pe) => H(z)(L.value), ["stop"])
              }, [
                ce(Be, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, mo)
            ], 2))), 128)),
            gt.value > 0 ? (p(), v("span", wo, " +" + V(gt.value), 1)) : G("", !0)
          ], 512)) : (p(), v("span", bo)),
          h("span", {
            class: $([
              H(x).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            jt(h("input", {
              ref_key: "inputEl",
              ref: g,
              "onUpdate:modelValue": N[0] || (N[0] = (L) => It(y) ? y.value = L : null),
              class: $([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: ge(I.value),
              placeholder: "Search...",
              onKeydown: N[1] || (N[1] = //@ts-ignore
              (...L) => H(P) && H(P)(...L)),
              onFocus: N[2] || (N[2] = (L) => {
                d.value = !0, Fe(Ve);
              })
            }, null, 36), [
              [Tt, H(y)]
            ])
          ], 2),
          h("button", {
            type: "button",
            class: $(["icon-btn icon-btn-outline shrink-0", Me[t.size || "md"]]),
            onClick: N[3] || (N[3] = Te((L) => {
              d.value = !H(d), Fe(Ve);
            }, ["stop"]))
          }, [
            ce(Be, {
              name: H(d) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 2),
          H(x).length ? (p(), v("button", {
            key: 2,
            type: "button",
            class: $(["icon-btn icon-btn-outline shrink-0", Me[t.size || "md"]]),
            onClick: N[4] || (N[4] = Te((L) => H(j)(), ["stop"]))
          }, [
            ce(Be, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 2)) : G("", !0)
        ], 64)) : (p(), v(ye, { key: 1 }, [
          H(x).length ? (p(), v("div", yo, [
            (p(!0), v(ye, null, ze(H(x), (L) => (p(), v("span", {
              key: L.value,
              class: $(["badge badge-soft-primary gap-1 max-w-full", U[t.size || "md"]])
            }, [
              h("span", ko, V(L.label), 1),
              h("button", {
                type: "button",
                class: $([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  he[t.size || "md"]
                ]),
                onClick: Te((pe) => H(z)(L.value), ["stop"])
              }, [
                ce(Be, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, xo)
            ], 2))), 128))
          ])) : (p(), v("span", {
            key: 1,
            class: $(["opacity-60 w-full", de[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3)),
          h("div", Mo, [
            h("span", Co, [
              jt(h("input", {
                ref_key: "inputEl",
                ref: g,
                "onUpdate:modelValue": N[5] || (N[5] = (L) => It(y) ? y.value = L : null),
                class: $([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: ge(te.value),
                placeholder: "Search...",
                onKeydown: N[6] || (N[6] = //@ts-ignore
                (...L) => H(P) && H(P)(...L)),
                onFocus: N[7] || (N[7] = (L) => {
                  d.value = !0, Fe(Ve);
                })
              }, null, 36), [
                [Tt, H(y)]
              ])
            ]),
            h("button", {
              type: "button",
              class: $(["icon-btn icon-btn-outline shrink-0", Me[t.size || "md"]]),
              onClick: N[8] || (N[8] = Te((L) => {
                d.value = !H(d), Fe(Ve);
              }, ["stop"]))
            }, [
              ce(Be, {
                name: H(d) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 2),
            H(x).length ? (p(), v("button", {
              key: 0,
              type: "button",
              class: $(["icon-btn icon-btn-outline shrink-0", Me[t.size || "md"]]),
              onClick: N[9] || (N[9] = Te((L) => H(j)(), ["stop"]))
            }, [
              ce(Be, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 2)) : G("", !0)
          ])
        ], 64)),
        M.value ? (p(), v("div", Do, [
          (p(!0), v(ye, null, ze(H(x), (L, pe) => (p(), v("span", {
            key: `measure-${L.value}`,
            ref_for: !0,
            ref: (De) => vt(De, pe),
            class: $(["badge badge-soft-primary gap-1 max-w-[12rem]", U[t.size || "md"]])
          }, [
            h("span", So, V(L.label), 1),
            h("span", {
              class: $([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                he[t.size || "md"]
              ])
            }, [
              ce(Be, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          h("span", {
            ref_key: "measureCounterEl",
            ref: et,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : G("", !0)
      ], 2),
      (p(), Ge(ut, { to: "body" }, [
        ce(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": ie.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": ie.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            H(d) ? (p(), v("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: O,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: ge(Ee.value)
            }, [
              H(s) ? (p(), v("div", Eo, "Loading...")) : (p(), v("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: ge(we.value)
              }, [
                (p(!0), v(ye, null, ze(be.value, (L) => (p(), v("li", {
                  key: L.value,
                  class: $([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    fe[t.size || "md"],
                    ke(L.value) ? "bg-primary/15" : ""
                  ]),
                  onMousedown: Te((pe) => H(z)(L.value), ["prevent"])
                }, [
                  h("input", {
                    type: "checkbox",
                    class: $([F[t.size || "md"], "pointer-events-none"]),
                    checked: ke(L.value)
                  }, null, 10, Ho),
                  h("span", null, V(L.label), 1)
                ], 42, _o))), 128)),
                !be.value.length && !H(s) ? (p(), v("li", $o, " No results ")) : G("", !0)
              ], 4))
            ], 4)) : G("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Bo = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [f, l] of o)
    e[f] = l;
  return e;
}, sr = /* @__PURE__ */ Bo(To, [["__scopeId", "data-v-66839298"]]);
export {
  sr as M,
  zo as _,
  Oo as a,
  No as b,
  Po as c,
  Yo as d,
  Vo as e,
  Ro as f,
  Yn as g,
  Wo as h,
  Go as i,
  Ko as j,
  Uo as k,
  qo as l,
  Zo as m,
  Jo as n,
  Xo as o,
  Qo as p,
  er as q,
  tr as r,
  Be as s,
  ar as t,
  or as u,
  rr as v,
  ir as w,
  Ot as x,
  nr as y
};
