import { defineComponent as z, createElementBlock as k, openBlock as v, normalizeClass as $, createCommentVNode as L, renderSlot as V, createElementVNode as h, ref as te, watch as he, withKeys as we, withModifiers as Ee, createBlock as ze, Teleport as ot, createVNode as ke, Transition as Ye, withCtx as Pe, toDisplayString as H, provide as Zt, inject as Qt, computed as I, normalizeStyle as ue, createTextVNode as wt, Fragment as le, renderList as be, unref as ye, useSlots as Xt, resolveDynamicComponent as en, reactive as tn, withDirectives as nn, vModelText as an, onMounted as tt, onBeforeUnmount as nt, useAttrs as on, mergeProps as rn } from "vue";
import { a as sn, u as ln, c as dn, d as cn, r as un } from "./useAgGridRowHeight-DLGH3d8k.js";
import { AgGridVue as fn } from "ag-grid-vue3";
const hn = ["disabled"], gn = {
  key: 0,
  class: "animate-spin"
}, Xa = /* @__PURE__ */ z({
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
    const e = t, c = o, u = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: s, color: f } = e;
      return f === "default" ? s === "outline" ? "btn-outline" : s === "ghost" ? "btn-ghost" : "" : s === "solid" ? `btn-${f}` : s === "outline" ? `btn-outline btn-outline-${f}` : s === "soft" ? `btn-soft-${f}` : s === "ghost" ? "btn-ghost" : "";
    }, p = (s) => {
      !e.disabled && !e.loading && c("click", s);
    };
    return (s, f) => (v(), k("button", {
      class: $(["btn", u[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: p
    }, [
      t.loading ? (v(), k("span", gn, [...f[0] || (f[0] = [
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
      ])])) : L("", !0),
      V(s.$slots, "default")
    ], 10, hn));
  }
}), eo = /* @__PURE__ */ z({
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
    }, c = () => {
      const { variant: u, color: d } = o;
      return d === "default" ? u === "outline" ? "badge-outline" : "" : u === "solid" ? `badge-${d}` : u === "outline" ? `badge-outline badge-outline-${d}` : u === "soft" ? `badge-soft-${d}` : "";
    };
    return (u, d) => (v(), k("span", {
      class: $(["badge", e[t.size], c()])
    }, [
      V(u.$slots, "default")
    ], 2));
  }
}), pn = ["role", "aria-expanded", "tabindex"], mn = { class: "card-title" }, vn = { class: "card-body-inner" }, wn = {
  key: 3,
  class: "mt-4"
}, to = /* @__PURE__ */ z({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const c = t, u = e, d = te(c.modelValue !== void 0 ? c.modelValue : c.defaultOpen);
    he(() => c.modelValue, (s) => {
      s !== void 0 && (d.value = s);
    });
    function p() {
      if (!c.collapsible) return;
      const s = !d.value;
      d.value = s, u("update:modelValue", s), u("toggle", s);
    }
    return o({ isOpen: d, toggle: p }), (s, f) => (v(), k("section", {
      class: $(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      s.$slots.title ? (v(), k("header", {
        key: 0,
        class: $(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: p,
        onKeydown: [
          f[0] || (f[0] = we((x) => t.collapsible && p(), ["enter"])),
          f[1] || (f[1] = we(Ee((x) => t.collapsible && p(), ["prevent"]), ["space"]))
        ]
      }, [
        h("div", mn, [
          V(s.$slots, "title")
        ]),
        t.collapsible ? (v(), k("svg", {
          key: 0,
          class: $(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...f[2] || (f[2] = [
          h("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : L("", !0)
      ], 42, pn)) : L("", !0),
      t.collapsible ? (v(), k("div", {
        key: 1,
        class: $(["card-body-wrapper", { "is-open": d.value }])
      }, [
        h("div", vn, [
          V(s.$slots, "default")
        ])
      ], 2)) : V(s.$slots, "default", { key: 2 }),
      s.$slots.footer ? (v(), k("footer", wn, [
        V(s.$slots, "footer")
      ])) : L("", !0)
    ], 2));
  }
}), kn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, bn = { class: "text-xl font-semibold" }, no = /* @__PURE__ */ z({
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
    const e = t, c = o, u = {
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
    }, d = () => {
      e.persistent || c("close");
    };
    return he(
      () => e.open,
      (p) => {
        p ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (p, s) => (v(), ze(ot, { to: "body" }, [
      ke(Ye, { name: "fade" }, {
        default: Pe(() => [
          t.open ? (v(), k("div", {
            key: 0,
            class: "fixed inset-0 z-40 bg-black/40",
            onClick: d
          })) : L("", !0)
        ]),
        _: 1
      }),
      ke(Ye, { name: "zoom" }, {
        default: Pe(() => [
          t.open ? (v(), k("div", {
            key: 0,
            class: $([
              "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            h("div", {
              class: $([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                u[t.size]
              ])
            }, [
              t.hideHeader ? L("", !0) : (v(), k("div", kn, [
                V(p.$slots, "header", {}, () => [
                  h("h3", bn, H(t.title), 1)
                ]),
                h("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: s[0] || (s[0] = (f) => c("close"))
                }, [...s[3] || (s[3] = [
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
                V(p.$slots, "default")
              ], 2),
              t.hideFooter ? L("", !0) : (v(), k("div", {
                key: 1,
                class: $([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                V(p.$slots, "footer", {}, () => [
                  h("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: s[1] || (s[1] = (f) => c("close"))
                  }, H(t.cancelText), 1),
                  h("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: s[2] || (s[2] = (f) => c("confirm"))
                  }, H(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : L("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), yn = ["aria-expanded", "aria-disabled", "onKeydown"], xn = { class: "collapse-title" }, Mn = { class: "collapse-content" }, Cn = { class: "collapse-content-inner" }, Dn = { class: "collapse-body" }, ao = /* @__PURE__ */ z({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const c = t, u = e, d = te(c.modelValue !== void 0 ? c.modelValue : c.defaultOpen);
    he(() => c.modelValue, (s) => {
      s !== void 0 && (d.value = s);
    });
    function p() {
      if (c.disabled) return;
      const s = !d.value;
      d.value = s, u("update:modelValue", s), u("toggle", s);
    }
    return o({ isOpen: d, toggle: p }), (s, f) => (v(), k("div", {
      class: $([
        "collapse",
        `collapse-${t.variant}`,
        { "is-open": d.value }
      ])
    }, [
      h("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": d.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: p,
        onKeydown: [
          we(p, ["enter"]),
          we(Ee(p, ["prevent"]), ["space"])
        ]
      }, [
        h("div", xn, [
          V(s.$slots, "header", {}, () => [
            V(s.$slots, "title")
          ])
        ]),
        f[0] || (f[0] = h("svg", {
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
      ], 40, yn),
      h("div", Mn, [
        h("div", Cn, [
          h("div", Dn, [
            V(s.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), oo = /* @__PURE__ */ z({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: o, emit: e }) {
    const c = t, u = e, d = te(/* @__PURE__ */ new Set());
    he(() => c.modelValue, (f) => {
      f === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(f) ? d.value = new Set(f) : d.value = /* @__PURE__ */ new Set([f]);
    }, { immediate: !0 });
    function p(f) {
      const x = new Set(d.value);
      x.has(f) ? x.delete(f) : (c.multiple || x.clear(), x.add(f)), d.value = x, c.multiple ? u("update:modelValue", Array.from(x)) : u("update:modelValue", x.size > 0 ? Array.from(x)[0] : null);
    }
    function s(f) {
      return d.value.has(f);
    }
    return Zt("accordion", {
      toggleItem: p,
      isItemOpen: s
    }), o({ openItems: d, toggleItem: p }), (f, x) => (v(), k("div", {
      class: $(["accordion", `accordion-${t.variant}`])
    }, [
      V(f.$slots, "default")
    ], 2));
  }
}), _n = ["aria-expanded", "aria-disabled", "onKeydown"], En = { class: "accordion-title" }, Sn = { class: "accordion-content" }, jn = { class: "accordion-content-inner" }, Tn = { class: "accordion-body" }, ro = /* @__PURE__ */ z({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = t, e = Qt("accordion"), c = I(() => (e == null ? void 0 : e.isItemOpen(o.id)) ?? !1);
    function u() {
      o.disabled || e == null || e.toggleItem(o.id);
    }
    return (d, p) => (v(), k("div", {
      class: $(["accordion-item", { "is-open": c.value }])
    }, [
      h("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": c.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: u,
        onKeydown: [
          we(u, ["enter"]),
          we(Ee(u, ["prevent"]), ["space"])
        ]
      }, [
        h("div", En, [
          V(d.$slots, "header", {}, () => [
            V(d.$slots, "title")
          ])
        ]),
        p[0] || (p[0] = h("svg", {
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
      ], 40, _n),
      h("div", Sn, [
        h("div", jn, [
          h("div", Tn, [
            V(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), An = { class: "loading-logo-wrapper" }, Bn = { class: "dots-container" }, $n = ["width", "height"], Fn = {
  key: 0,
  class: "loading-text"
}, In = /* @__PURE__ */ z({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const o = t, e = I(() => Math.round(o.size * (8 / 60)));
    return (c, u) => (v(), k("div", An, [
      h("div", {
        class: "loading-logo-container",
        style: ue({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        h("div", Bn, [
          h("span", {
            class: "loading-dot dot-1 dot-blue",
            style: ue({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-2 dot-blue",
            style: ue({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-3 dot-black",
            style: ue({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-4 dot-black",
            style: ue({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-5 dot-red",
            style: ue({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-6 dot-red",
            style: ue({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (v(), k("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...u[0] || (u[0] = [
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
        ])], 8, $n))
      ], 4),
      t.text ? (v(), k("p", Fn, [
        wt(H(t.text), 1),
        u[1] || (u[1] = h("span", { class: "loading-dots" }, [
          h("span", null, "."),
          h("span", null, "."),
          h("span", null, ".")
        ], -1))
      ])) : L("", !0)
    ]));
  }
}), Hn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, io = /* @__PURE__ */ z({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (o, e) => (v(), ze(ot, { to: "body" }, [
      ke(Ye, { name: "fade" }, {
        default: Pe(() => [
          t.open ? (v(), k("div", Hn, [
            ke(In, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : L("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), On = { class: "toast-content" }, Ln = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Yn = ["d"], Pn = { class: "toast-body" }, Nn = {
  key: 0,
  class: "toast-title"
}, zn = { class: "toast-message" }, Vn = ["onClick"], so = /* @__PURE__ */ z({
  __name: "Toasts",
  setup(t) {
    const o = sn(), e = I(() => {
      const f = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return f[o.toastPosition.value] || f["bottom-right"];
    }), c = {
      info: "M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a1.25 1.25 0 110 2.5A1.25 1.25 0 0112 6zm1.5 10h-3v-1.5h1.5V9.5h-1.5V8h3v6h1.5V16z",
      success: "M12 2a10 10 0 100 20 10 10 0 000-20zm-1 14l-4-4 1.5-1.5L11 12.5l4.5-4.5L17 9l-6 7z",
      warning: "M12 3l9 16H3l9-16zm-1 6h2v4h-2V9zm0 6h2v2h-2v-2z",
      error: "M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5L13.5 10.5 15.5 12.5 14 14l-2-2-2 2-1.5-1.5 2-2-2-2 1.5-1.5 2 2 2-2 1.5 1.5z",
      primary: "M12 2l2.5 6.2L21 9l-4.5 4.3L17.5 20 12 16.8 6.5 20l1-6.7L3 9l6.5-0.8L12 2z"
    }, u = {
      info: "toast-soft-info",
      success: "toast-soft-success",
      warning: "toast-soft-warning",
      error: "toast-soft-error",
      primary: "toast-soft-primary"
    }, d = {
      info: "toast-solid-info",
      success: "toast-solid-success",
      warning: "toast-solid-warning",
      error: "toast-solid-error",
      primary: "toast-solid-primary"
    }, p = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, s = (f, x = "soft") => {
      var m;
      return ((m = {
        soft: u,
        solid: d,
        outline: p
      }[x]) == null ? void 0 : m[f]) || u[f] || "toast-default";
    };
    return (f, x) => (v(), ze(ot, { to: "body" }, [
      h("div", {
        class: $(["toast-container", e.value])
      }, [
        (v(!0), k(le, null, be(ye(o).toasts.value, (i) => (v(), k("div", {
          key: i.id,
          class: $(["toast-item", s(i.type, i.variant)])
        }, [
          h("div", On, [
            (v(), k("svg", Ln, [
              h("path", {
                d: c[i.type],
                fill: "currentColor"
              }, null, 8, Yn)
            ])),
            h("div", Pn, [
              i.title ? (v(), k("div", Nn, H(i.title), 1)) : L("", !0),
              h("div", zn, H(i.message), 1)
            ]),
            h("button", {
              class: "toast-close-btn",
              onClick: (m) => ye(o).dismiss(i.id)
            }, [...x[0] || (x[0] = [
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
            ])], 8, Vn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), lo = /* @__PURE__ */ z({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const o = t, e = te(!1);
    let c = null;
    const u = () => {
      c = setTimeout(() => {
        e.value = !0;
      }, o.delay);
    }, d = () => {
      c && (clearTimeout(c), c = null), e.value = !1;
    }, p = I(() => `tooltip-pos-${o.position}`), s = I(() => `tooltip-arrow-${o.position}`), f = I(() => `tooltip-variant-${o.variant}`);
    return (x, i) => (v(), k("span", {
      class: "tooltip-root",
      onMouseenter: u,
      onMouseleave: d,
      onFocus: u,
      onBlur: d
    }, [
      V(x.$slots, "default"),
      ke(Ye, { name: "tooltip-fade" }, {
        default: Pe(() => [
          e.value && t.text ? (v(), k("span", {
            key: 0,
            class: $(["tooltip-content", [p.value, f.value]]),
            role: "tooltip"
          }, [
            wt(H(t.text) + " ", 1),
            h("span", {
              class: $(["tooltip-arrow", [s.value, f.value]])
            }, null, 2)
          ], 2)) : L("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Rn = { class: "mitreka-pagination" }, Wn = ["disabled"], Kn = { class: "pagination-status" }, qn = ["disabled"], co = /* @__PURE__ */ z({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: o }) {
    const e = t, c = o, u = () => {
      e.page > 1 && c("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && c("change", e.page + 1);
    };
    return (p, s) => (v(), k("div", Rn, [
      h("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: u
      }, [...s[0] || (s[0] = [
        h("span", { class: "hidden sm:inline" }, "Prev", -1),
        h("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Wn),
      h("span", Kn, H(t.page) + " / " + H(t.pages), 1),
      h("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...s[1] || (s[1] = [
        h("span", { class: "hidden sm:inline" }, "Next", -1),
        h("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, qn)
    ]));
  }
}), Gn = { class: "avatar-root" }, Un = ["src", "alt"], uo = /* @__PURE__ */ z({
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
    const o = t, e = te(!1), c = I(() => o.src && !e.value), u = I(() => o.fallback ? o.fallback.slice(0, 2).toUpperCase() : o.alt && o.alt !== "Avatar" ? o.alt.split(" ").map((m) => m[0]).slice(0, 2).join("").toUpperCase() : "?"), d = I(() => `avatar-size-${o.size}`), p = I(() => `avatar-color-${o.color}`), s = I(() => o.status ? `avatar-status-${o.status}` : ""), f = I(() => `avatar-status-size-${o.size}`), x = I(() => o.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (m, S) => (v(), k("span", Gn, [
      c.value ? (v(), k("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: $(["avatar-img", [d.value, x.value]]),
        onError: i
      }, null, 42, Un)) : (v(), k("span", {
        key: 1,
        class: $(["avatar-fallback", [d.value, p.value, x.value]])
      }, H(u.value), 3)),
      t.status ? (v(), k("span", {
        key: 2,
        class: $(["avatar-status", [s.value, f.value]])
      }, null, 2)) : L("", !0)
    ]));
  }
}), fo = /* @__PURE__ */ z({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const o = t, e = Xt(), c = I(() => {
      var f;
      const s = (f = e.default) == null ? void 0 : f.call(e);
      return s ? s.length : 0;
    }), u = I(() => c.value <= o.max ? 0 : c.value - o.max), d = I(() => `avatar-size-${o.size}`), p = I(() => `avatar-group-space-${o.size}`);
    return (s, f) => (v(), k("div", {
      class: $(["avatar-group", p.value])
    }, [
      (v(!0), k(le, null, be(t.max, (x, i) => {
        var m, S;
        return v(), k(le, { key: i }, [
          i < c.value ? (v(), ze(en((S = (m = ye(e)).default) == null ? void 0 : S.call(m)[i]), { key: 0 })) : L("", !0)
        ], 64);
      }), 128)),
      u.value > 0 ? (v(), k("span", {
        key: 0,
        class: $(["avatar-group-count", d.value])
      }, " +" + H(u.value), 3)) : L("", !0)
    ], 2));
  }
}), Jn = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, Zn = { class: "breadcrumbs-list" }, Qn = {
  key: 0,
  class: "breadcrumbs-item"
}, Xn = ["href"], ea = { key: 0 }, ta = ["href"], na = {
  key: 1,
  class: "breadcrumbs-text"
}, aa = {
  key: 1,
  class: "breadcrumbs-current"
}, ho = /* @__PURE__ */ z({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const o = t, e = (c) => c === o.items.length - 1;
    return (c, u) => t.items.length ? (v(), k("nav", Jn, [
      h("ol", Zn, [
        t.showHome ? (v(), k("li", Qn, [
          h("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, H(t.homeLabel), 9, Xn)
        ])) : L("", !0),
        (v(!0), k(le, null, be(t.items, (d, p) => (v(), k("li", {
          key: p,
          class: "breadcrumbs-item"
        }, [
          u[0] || (u[0] = h("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(p) ? (v(), k("span", aa, H(d.label), 1)) : (v(), k("span", ea, [
            d.href ? (v(), k("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, H(d.label), 9, ta)) : (v(), k("span", na, H(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : L("", !0);
  }
}), oa = { class: "mitreka-stat-card" }, ra = {
  key: 0,
  class: "stat-icon"
}, ia = { class: "stat-content" }, sa = { class: "stat-label" }, la = { class: "stat-value" }, go = /* @__PURE__ */ z({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (o, e) => (v(), k("div", oa, [
      t.icon ? (v(), k("div", ra, H(t.icon), 1)) : L("", !0),
      h("div", ia, [
        h("div", sa, H(t.label), 1),
        h("div", la, H(t.value), 1)
      ])
    ]));
  }
}), da = { class: "mitreka-page-header" }, ca = { class: "page-header-title-row" }, ua = { class: "page-header-title" }, fa = {
  key: 0,
  class: "page-header-desc"
}, po = /* @__PURE__ */ z({
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
    }, c = I(() => {
      if (!o.category) return "";
      const u = o.category.toLowerCase();
      return e[u] || "badge-soft-primary";
    });
    return (u, d) => (v(), k("header", da, [
      h("div", ca, [
        h("h1", ua, H(t.title), 1),
        t.category ? (v(), k("span", {
          key: 0,
          class: $(["badge page-header-badge", c.value])
        }, H(t.category), 3)) : L("", !0)
      ]),
      t.description ? (v(), k("p", fa, H(t.description), 1)) : L("", !0)
    ]));
  }
}), ha = { class: "mitreka-theme-switcher" }, ga = ["value"], mo = /* @__PURE__ */ z({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: o, setTheme: e, toggleTheme: c } = ln("light"), u = I(
      () => o.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (p) => {
      e(p === "mitrekadark" ? "dark" : "light");
    };
    return (p, s) => (v(), k("div", ha, [
      h("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: s[0] || (s[0] = //@ts-ignore
        (...f) => ye(c) && ye(c)(...f))
      }, " Toggle: " + H(u.value), 1),
      h("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: u.value,
        onChange: s[1] || (s[1] = (f) => d(f.target.value))
      }, [...s[2] || (s[2] = [
        h("option", { value: "mitrekalight" }, "mitrekalight", -1),
        h("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, ga)
    ]));
  }
}), pa = { class: "sidebar-header" }, ma = {
  key: 0,
  class: "sidebar-search"
}, va = ["placeholder"], wa = { class: "sidebar-nav" }, ka = ["href", "title", "onClick"], ba = { class: "sidebar-icon" }, ya = { class: "sidebar-icon-text" }, xa = {
  key: 0,
  class: "sidebar-label"
}, Ma = ["title", "onClick"], Ca = { class: "sidebar-icon" }, Da = { class: "sidebar-icon-text" }, _a = {
  key: 0,
  class: "sidebar-label"
}, Ea = ["href", "title", "onClick"], Sa = { class: "sidebar-icon" }, ja = { class: "sidebar-icon-text" }, Ta = {
  key: 0,
  class: "sidebar-label"
}, vo = /* @__PURE__ */ z({
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
    const e = t, c = o, u = te(""), d = tn({});
    e.defaultOpenIds.forEach((m) => {
      d[m] = !0;
    });
    const p = (m) => !e.activeHref || !m.href ? !1 : m.exact ? e.activeHref === m.href : e.activeHref.startsWith(m.href), s = (m) => {
      var E;
      if (!m.children) return !1;
      if (u.value.trim()) return !0;
      const S = d[m.id], D = ((E = m.children) == null ? void 0 : E.some(p)) ?? !1;
      return S === void 0 && D && (d[m.id] = !0), d[m.id] ?? D;
    }, f = (m) => {
      const S = !s(m);
      d[m.id] = S, c("toggle", m.id, S);
    }, x = I(() => {
      const m = u.value.toLowerCase().trim();
      return m ? e.items.map((S) => {
        if (S.children) {
          const D = S.children.filter(
            (E) => E.label.toLowerCase().includes(m)
          );
          return S.label.toLowerCase().includes(m) ? S : D.length > 0 ? { ...S, children: D } : null;
        }
        return S.label.toLowerCase().includes(m) ? S : null;
      }).filter(Boolean) : e.items;
    }), i = (m) => {
      c("navigate", m), u.value = "";
    };
    return (m, S) => (v(), k("aside", {
      class: $(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      h("div", pa, [
        V(m.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (v(), k("div", ma, [
        nn(h("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": S[0] || (S[0] = (D) => u.value = D)
        }, null, 8, va), [
          [an, u.value]
        ]),
        u.value ? (v(), k("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: S[1] || (S[1] = (D) => u.value = "")
        }, " × ")) : L("", !0)
      ])) : L("", !0),
      h("nav", wa, [
        (v(!0), k(le, null, be(x.value, (D) => (v(), k(le, {
          key: D.id
        }, [
          D.children ? (v(), k(le, { key: 1 }, [
            h("button", {
              class: $(["sidebar-item sidebar-group", s(D) ? "is-open" : ""]),
              title: t.collapsed ? D.label : void 0,
              onClick: (E) => f(D)
            }, [
              h("span", Ca, [
                V(m.$slots, "icon", { item: D }, () => [
                  h("span", Da, H(D.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? L("", !0) : (v(), k("span", _a, H(D.label), 1)),
              t.collapsed ? L("", !0) : (v(), k("span", {
                key: 1,
                class: $(["sidebar-caret", s(D) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Ma),
            s(D) ? (v(), k("div", {
              key: 0,
              class: $(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (v(!0), k(le, null, be(D.children, (E) => (v(), k("a", {
                key: E.id,
                class: $(["sidebar-item sidebar-child", p(E) ? "is-active" : ""]),
                href: E.href || "#",
                title: t.collapsed ? E.label : void 0,
                onClick: Ee((M) => i(E), ["prevent"])
              }, [
                h("span", Sa, [
                  V(m.$slots, "icon", { item: E }, () => [
                    h("span", ja, H(E.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? L("", !0) : (v(), k("span", Ta, H(E.label), 1))
              ], 10, Ea))), 128))
            ], 2)) : L("", !0)
          ], 64)) : (v(), k("a", {
            key: 0,
            class: $(["sidebar-item", p(D) ? "is-active" : ""]),
            href: D.href || "#",
            title: t.collapsed ? D.label : void 0,
            onClick: Ee((E) => i(D), ["prevent"])
          }, [
            h("span", ba, [
              V(m.$slots, "icon", { item: D }, () => [
                h("span", ya, H(D.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? L("", !0) : (v(), k("span", xa, H(D.label), 1))
          ], 10, ka))
        ], 64))), 128))
      ])
    ], 2));
  }
}), kt = {
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
}, wo = (t) => kt[t], Aa = ["innerHTML"], Ba = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ko = /* @__PURE__ */ z({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const o = t, e = I(() => o.class || "w-5 h-5"), c = I(() => kt[o.name]), u = I(
      () => c.value ? c.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, p) => c.value ? (v(), k("span", {
      key: 0,
      innerHTML: u.value,
      class: $(e.value)
    }, null, 10, Aa)) : (v(), k("span", Ba, "?"));
  }
});
var Je = [
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
], me = {
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
}, Se = {
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
}, U = function(t, o) {
  return o === void 0 && (o = 2), ("000" + t).slice(o * -1);
}, ae = function(t) {
  return t === !0 ? 1 : 0;
};
function mt(t, o) {
  var e;
  return function() {
    var c = this, u = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(c, u);
    }, o);
  };
}
var Ze = function(t) {
  return t instanceof Array ? t : [t];
};
function G(t, o, e) {
  if (e === !0)
    return t.classList.add(o);
  t.classList.remove(o);
}
function F(t, o, e) {
  var c = window.document.createElement(t);
  return o = o || "", e = e || "", c.className = o, e !== void 0 && (c.textContent = e), c;
}
function Oe(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function bt(t, o) {
  if (o(t))
    return t;
  if (t.parentNode)
    return bt(t.parentNode, o);
}
function Le(t, o) {
  var e = F("div", "numInputWrapper"), c = F("input", "numInput " + t), u = F("span", "arrowUp"), d = F("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? c.type = "number" : (c.type = "text", c.pattern = "\\d*"), o !== void 0)
    for (var p in o)
      c.setAttribute(p, o[p]);
  return e.appendChild(c), e.appendChild(u), e.appendChild(d), e;
}
function X(t) {
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
var Qe = function() {
}, Ne = function(t, o, e) {
  return e.months[o ? "shorthand" : "longhand"][t];
}, $a = {
  D: Qe,
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
    t.setHours(t.getHours() % 12 + 12 * ae(new RegExp(e.amPM[1], "i").test(o)));
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
    var c = parseInt(o), u = new Date(t.getFullYear(), 0, 2 + (c - 1) * 7, 0, 0, 0, 0);
    return u.setDate(u.getDate() - u.getDay() + e.firstDayOfWeek), u;
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
  l: Qe,
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
  w: Qe,
  y: function(t, o) {
    t.setFullYear(2e3 + parseFloat(o));
  }
}, fe = {
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
}, _e = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, o, e) {
    return o.weekdays.shorthand[_e.w(t, o, e)];
  },
  F: function(t, o, e) {
    return Ne(_e.n(t, o, e) - 1, !1, o);
  },
  G: function(t, o, e) {
    return U(_e.h(t, o, e));
  },
  H: function(t) {
    return U(t.getHours());
  },
  J: function(t, o) {
    return o.ordinal !== void 0 ? t.getDate() + o.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, o) {
    return o.amPM[ae(t.getHours() > 11)];
  },
  M: function(t, o) {
    return Ne(t.getMonth(), !0, o);
  },
  S: function(t) {
    return U(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, o, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return U(t.getFullYear(), 4);
  },
  d: function(t) {
    return U(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return U(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, o) {
    return o.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return U(t.getMonth() + 1);
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
}, yt = function(t) {
  var o = t.config, e = o === void 0 ? me : o, c = t.l10n, u = c === void 0 ? Se : c, d = t.isMobile, p = d === void 0 ? !1 : d;
  return function(s, f, x) {
    var i = x || u;
    return e.formatDate !== void 0 && !p ? e.formatDate(s, f, i) : f.split("").map(function(m, S, D) {
      return _e[m] && D[S - 1] !== "\\" ? _e[m](s, i, e) : m !== "\\" ? m : "";
    }).join("");
  };
}, at = function(t) {
  var o = t.config, e = o === void 0 ? me : o, c = t.l10n, u = c === void 0 ? Se : c;
  return function(d, p, s, f) {
    if (!(d !== 0 && !d)) {
      var x = f || u, i, m = d;
      if (d instanceof Date)
        i = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        i = new Date(d);
      else if (typeof d == "string") {
        var S = p || (e || me).dateFormat, D = String(d).trim();
        if (D === "today")
          i = /* @__PURE__ */ new Date(), s = !0;
        else if (e && e.parseDate)
          i = e.parseDate(d, S);
        else if (/Z$/.test(D) || /GMT$/.test(D))
          i = new Date(d);
        else {
          for (var E = void 0, M = [], A = 0, J = 0, K = ""; A < S.length; A++) {
            var ne = S[A], P = ne === "\\", ie = S[A - 1] === "\\" || P;
            if (fe[ne] && !ie) {
              K += fe[ne];
              var Z = new RegExp(K).exec(d);
              Z && (E = !0) && M[ne !== "Y" ? "push" : "unshift"]({
                fn: $a[ne],
                val: Z[++J]
              });
            } else P || (K += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), M.forEach(function(oe) {
            var de = oe.fn, xe = oe.val;
            return i = de(i, xe, x) || i;
          }), i = E ? i : void 0;
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
function ee(t, o, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(o.getTime()).setHours(0, 0, 0, 0) : t.getTime() - o.getTime();
}
var Fa = function(t, o, e) {
  return t > Math.min(o, e) && t < Math.max(o, e);
}, Xe = function(t, o, e) {
  return t * 3600 + o * 60 + e;
}, Ia = function(t) {
  var o = Math.floor(t / 3600), e = (t - o * 3600) / 60;
  return [o, e, t - o * 3600 - e * 60];
}, Ha = {
  DAY: 864e5
};
function et(t) {
  var o = t.defaultHour, e = t.defaultMinute, c = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var u = t.minDate.getHours(), d = t.minDate.getMinutes(), p = t.minDate.getSeconds();
    o < u && (o = u), o === u && e < d && (e = d), o === u && e === d && c < p && (c = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var s = t.maxDate.getHours(), f = t.maxDate.getMinutes();
    o = Math.min(o, s), o === s && (e = Math.min(f, e)), o === s && e === f && (c = t.maxDate.getSeconds());
  }
  return { hours: o, minutes: e, seconds: c };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var o = [], e = 1; e < arguments.length; e++)
    o[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var c = function(s) {
    s && Object.keys(s).forEach(function(f) {
      return t[f] = s[f];
    });
  }, u = 0, d = o; u < d.length; u++) {
    var p = d[u];
    c(p);
  }
  return t;
});
var q = function() {
  return q = Object.assign || function(t) {
    for (var o, e = 1, c = arguments.length; e < c; e++) {
      o = arguments[e];
      for (var u in o) Object.prototype.hasOwnProperty.call(o, u) && (t[u] = o[u]);
    }
    return t;
  }, q.apply(this, arguments);
}, vt = function() {
  for (var t = 0, o = 0, e = arguments.length; o < e; o++) t += arguments[o].length;
  for (var c = Array(t), u = 0, o = 0; o < e; o++)
    for (var d = arguments[o], p = 0, s = d.length; p < s; p++, u++)
      c[u] = d[p];
  return c;
}, Oa = 300;
function La(t, o) {
  var e = {
    config: q(q({}, me), R.defaultConfig),
    l10n: Se
  };
  e.parseDate = at({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = M, e._setHoursFromDate = S, e._positionCalendar = Fe, e.changeMonth = Ve, e.changeYear = Ae, e.clear = Ct, e.close = Dt, e.onMouseOver = $e, e._createElement = F, e.createDay = Z, e.destroy = _t, e.isEnabled = ce, e.jumpToDate = K, e.updateValue = se, e.open = jt, e.redraw = ut, e.set = $t, e.setDate = Ft, e.toggle = Lt;
  function c() {
    e.utils = {
      getDaysInMonth: function(n, a) {
        return n === void 0 && (n = e.currentMonth), a === void 0 && (a = e.currentYear), n === 1 && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function u() {
    e.element = e.input = t, e.isOpen = !1, Tt(), ct(), Ht(), It(), c(), e.isMobile || ie(), J(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && S(e.config.noCalendar ? e.latestSelectedDateObj : void 0), se(!1)), s();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && Fe(), N("onReady");
  }
  function d() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function p(n) {
    return n.bind(e);
  }
  function s() {
    var n = e.config;
    n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function() {
      if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
        var a = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = a + "px", e.calendarContainer.style.width = a + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function f(n) {
    if (e.selectedDates.length === 0) {
      var a = e.config.minDate === void 0 || ee(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = et(e.config);
      a.setHours(r.hours, r.minutes, r.seconds, a.getMilliseconds()), e.selectedDates = [a], e.latestSelectedDateObj = a;
    }
    n !== void 0 && n.type !== "blur" && Nt(n);
    var l = e._input.value;
    m(), se(), e._input.value !== l && e._debouncedChange();
  }
  function x(n, a) {
    return n % 12 + 12 * ae(a === e.l10n.amPM[1]);
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
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, a = (parseInt(e.minuteElement.value, 10) || 0) % 60, r = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = x(n, e.amPM.textContent));
      var l = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && ee(e.latestSelectedDateObj, e.config.minDate, !0) === 0, g = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && ee(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var w = Xe(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), j = Xe(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), y = Xe(n, a, r);
        if (y > j && y < w) {
          var T = Ia(w);
          n = T[0], a = T[1], r = T[2];
        }
      } else {
        if (g) {
          var b = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, b.getHours()), n === b.getHours() && (a = Math.min(a, b.getMinutes())), a === b.getMinutes() && (r = Math.min(r, b.getSeconds()));
        }
        if (l) {
          var _ = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, _.getHours()), n === _.getHours() && a < _.getMinutes() && (a = _.getMinutes()), a === _.getMinutes() && (r = Math.max(r, _.getSeconds()));
        }
      }
      D(n, a, r);
    }
  }
  function S(n) {
    var a = n || e.latestSelectedDateObj;
    a && a instanceof Date && D(a.getHours(), a.getMinutes(), a.getSeconds());
  }
  function D(n, a, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, a, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = U(e.config.time_24hr ? n : (12 + n) % 12 + 12 * ae(n % 12 === 0)), e.minuteElement.value = U(a), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[ae(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = U(r)));
  }
  function E(n) {
    var a = X(n), r = parseInt(a.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && Ae(r);
  }
  function M(n, a, r, l) {
    if (a instanceof Array)
      return a.forEach(function(g) {
        return M(n, g, r, l);
      });
    if (n instanceof Array)
      return n.forEach(function(g) {
        return M(g, a, r, l);
      });
    n.addEventListener(a, r, l), e._handlers.push({
      remove: function() {
        return n.removeEventListener(a, r, l);
      }
    });
  }
  function A() {
    N("onChange");
  }
  function J() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(l) {
        return M(l, "click", e[r]);
      });
    }), e.isMobile) {
      Ot();
      return;
    }
    var n = mt(St, 50);
    if (e._debouncedChange = mt(A, Oa), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && M(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && $e(X(r));
    }), M(e._input, "keydown", st), e.calendarContainer !== void 0 && M(e.calendarContainer, "keydown", st), !e.config.inline && !e.config.static && M(window, "resize", n), window.ontouchstart !== void 0 ? M(window.document, "touchstart", Re) : M(window.document, "mousedown", Re), M(window.document, "focus", Re, { capture: !0 }), e.config.clickOpens === !0 && (M(e._input, "focus", e.open), M(e._input, "click", e.open)), e.daysContainer !== void 0 && (M(e.monthNav, "click", Pt), M(e.monthNav, ["keyup", "increment"], E), M(e.daysContainer, "click", ft)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var a = function(r) {
        return X(r).select();
      };
      M(e.timeContainer, ["increment"], f), M(e.timeContainer, "blur", f, { capture: !0 }), M(e.timeContainer, "click", ne), M([e.hourElement, e.minuteElement], ["focus", "click"], a), e.secondElement !== void 0 && M(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && M(e.amPM, "click", function(r) {
        f(r);
      });
    }
    e.config.allowInput && M(e._input, "blur", Et);
  }
  function K(n, a) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), l = e.currentYear, g = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (w) {
      w.message = "Invalid date supplied: " + r, e.config.errorHandler(w);
    }
    a && e.currentYear !== l && (N("onYearChange"), W()), a && (e.currentYear !== l || e.currentMonth !== g) && N("onMonthChange"), e.redraw();
  }
  function ne(n) {
    var a = X(n);
    ~a.className.indexOf("arrow") && P(n, a.classList.contains("arrowUp") ? 1 : -1);
  }
  function P(n, a, r) {
    var l = n && X(n), g = r || l && l.parentNode && l.parentNode.firstChild, w = Ke("increment");
    w.delta = a, g && g.dispatchEvent(w);
  }
  function ie() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = F("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(Me()), e.innerContainer = F("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var a = Mt(), r = a.weekWrapper, l = a.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = l, e.weekWrapper = r;
      }
      e.rContainer = F("div", "flatpickr-rContainer"), e.rContainer.appendChild(rt()), e.daysContainer || (e.daysContainer = F("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), O(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(Te()), G(e.calendarContainer, "rangeMode", e.config.mode === "range"), G(e.calendarContainer, "animate", e.config.animate === !0), G(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var g = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!g && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var w = F("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(w, e.element), w.appendChild(e.element), e.altInput && w.appendChild(e.altInput), w.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function Z(n, a, r, l) {
    var g = ce(a, !0), w = F("span", n, a.getDate().toString());
    return w.dateObj = a, w.$i = l, w.setAttribute("aria-label", e.formatDate(a, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && ee(a, e.now) === 0 && (e.todayDateElem = w, w.classList.add("today"), w.setAttribute("aria-current", "date")), g ? (w.tabIndex = -1, qe(a) && (w.classList.add("selected"), e.selectedDateElem = w, e.config.mode === "range" && (G(w, "startRange", e.selectedDates[0] && ee(a, e.selectedDates[0], !0) === 0), G(w, "endRange", e.selectedDates[1] && ee(a, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && w.classList.add("inRange")))) : w.classList.add("flatpickr-disabled"), e.config.mode === "range" && Yt(a) && !qe(a) && w.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && l % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(a) + "</span>"), N("onDayCreate", w), w;
  }
  function oe(n) {
    n.focus(), e.config.mode === "range" && $e(n);
  }
  function de(n) {
    for (var a = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, l = a; l != r; l += n)
      for (var g = e.daysContainer.children[l], w = n > 0 ? 0 : g.children.length - 1, j = n > 0 ? g.children.length : -1, y = w; y != j; y += n) {
        var T = g.children[y];
        if (T.className.indexOf("hidden") === -1 && ce(T.dateObj))
          return T;
      }
  }
  function xe(n, a) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, l = a > 0 ? e.config.showMonths : -1, g = a > 0 ? 1 : -1, w = r - e.currentMonth; w != l; w += g)
      for (var j = e.daysContainer.children[w], y = r - e.currentMonth === w ? n.$i + a : a < 0 ? j.children.length - 1 : 0, T = j.children.length, b = y; b >= 0 && b < T && b != (a > 0 ? T : -1); b += g) {
        var _ = j.children[b];
        if (_.className.indexOf("hidden") === -1 && ce(_.dateObj) && Math.abs(n.$i - b) >= Math.abs(a))
          return oe(_);
      }
    e.changeMonth(g), C(de(g), 0);
  }
  function C(n, a) {
    var r = d(), l = Be(r || document.body), g = n !== void 0 ? n : l ? r : e.selectedDateElem !== void 0 && Be(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Be(e.todayDateElem) ? e.todayDateElem : de(a > 0 ? 1 : -1);
    g === void 0 ? e._input.focus() : l ? xe(g, a) : oe(g);
  }
  function B(n, a) {
    for (var r = (new Date(n, a, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, l = e.utils.getDaysInMonth((a - 1 + 12) % 12, n), g = e.utils.getDaysInMonth(a, n), w = window.document.createDocumentFragment(), j = e.config.showMonths > 1, y = j ? "prevMonthDay hidden" : "prevMonthDay", T = j ? "nextMonthDay hidden" : "nextMonthDay", b = l + 1 - r, _ = 0; b <= l; b++, _++)
      w.appendChild(Z("flatpickr-day " + y, new Date(n, a - 1, b), b, _));
    for (b = 1; b <= g; b++, _++)
      w.appendChild(Z("flatpickr-day", new Date(n, a, b), b, _));
    for (var Y = g + 1; Y <= 42 - r && (e.config.showMonths === 1 || _ % 7 !== 0); Y++, _++)
      w.appendChild(Z("flatpickr-day " + T, new Date(n, a + 1, Y % g), Y, _));
    var re = F("div", "dayContainer");
    return re.appendChild(w), re;
  }
  function O() {
    if (e.daysContainer !== void 0) {
      Oe(e.daysContainer), e.weekNumbers && Oe(e.weekNumbers);
      for (var n = document.createDocumentFragment(), a = 0; a < e.config.showMonths; a++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + a), n.appendChild(B(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && $e();
    }
  }
  function W() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(l) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && l < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && l > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var a = 0; a < 12; a++)
        if (n(a)) {
          var r = F("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, a).getMonth().toString(), r.textContent = Ne(a, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === a && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function ge() {
    var n = F("div", "flatpickr-month"), a = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = F("span", "cur-month") : (e.monthsDropdownContainer = F("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), M(e.monthsDropdownContainer, "change", function(j) {
      var y = X(j), T = parseInt(y.value, 10);
      e.changeMonth(T - e.currentMonth), N("onMonthChange");
    }), W(), r = e.monthsDropdownContainer);
    var l = Le("cur-year", { tabindex: "-1" }), g = l.getElementsByTagName("input")[0];
    g.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && g.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (g.setAttribute("max", e.config.maxDate.getFullYear().toString()), g.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var w = F("div", "flatpickr-current-month");
    return w.appendChild(r), w.appendChild(l), a.appendChild(w), n.appendChild(a), {
      container: n,
      yearElement: g,
      monthElement: r
    };
  }
  function je() {
    Oe(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var a = ge();
      e.yearElements.push(a.yearElement), e.monthElements.push(a.monthElement), e.monthNav.appendChild(a.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function Me() {
    return e.monthNav = F("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = F("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = F("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, je(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (G(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (G(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], He(), e.monthNav;
  }
  function Te() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = et(e.config);
    e.timeContainer = F("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var a = F("span", "flatpickr-time-separator", ":"), r = Le("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var l = Le("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = l.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = U(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = U(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(a), e.timeContainer.appendChild(l), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var g = Le("flatpickr-second");
      e.secondElement = g.getElementsByTagName("input")[0], e.secondElement.value = U(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(F("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(g);
    }
    return e.config.time_24hr || (e.amPM = F("span", "flatpickr-am-pm", e.l10n.amPM[ae((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function rt() {
    e.weekdayContainer ? Oe(e.weekdayContainer) : e.weekdayContainer = F("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var a = F("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(a);
    }
    return it(), e.weekdayContainer;
  }
  function it() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, a = vt(e.l10n.weekdays.shorthand);
      n > 0 && n < a.length && (a = vt(a.splice(n, a.length), a.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + a.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function Mt() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = F("div", "flatpickr-weekwrapper");
    n.appendChild(F("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var a = F("div", "flatpickr-weeks");
    return n.appendChild(a), {
      weekWrapper: n,
      weekNumbers: a
    };
  }
  function Ve(n, a) {
    a === void 0 && (a = !0);
    var r = a ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, N("onYearChange"), W()), O(), N("onMonthChange"), He());
  }
  function Ct(n, a) {
    if (n === void 0 && (n = !0), a === void 0 && (a = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, a === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = et(e.config), l = r.hours, g = r.minutes, w = r.seconds;
      D(l, g, w);
    }
    e.redraw(), n && N("onChange");
  }
  function Dt() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), N("onClose");
  }
  function _t() {
    e.config !== void 0 && N("onDestroy");
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
  function Ce(n) {
    return e.calendarContainer.contains(n);
  }
  function Re(n) {
    if (e.isOpen && !e.config.inline) {
      var a = X(n), r = Ce(a), l = a === e.input || a === e.altInput || e.element.contains(a) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), g = !l && !r && !Ce(n.relatedTarget), w = !e.config.ignoredFocusElements.some(function(j) {
        return j.contains(a);
      });
      g && w && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && f(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function Ae(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var a = n, r = e.currentYear !== a;
      e.currentYear = a || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), N("onYearChange"), W());
    }
  }
  function ce(n, a) {
    var r;
    a === void 0 && (a = !0);
    var l = e.parseDate(n, void 0, a);
    if (e.config.minDate && l && ee(l, e.config.minDate, a !== void 0 ? a : !e.minDateHasTime) < 0 || e.config.maxDate && l && ee(l, e.config.maxDate, a !== void 0 ? a : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (l === void 0)
      return !1;
    for (var g = !!e.config.enable, w = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, j = 0, y = void 0; j < w.length; j++) {
      if (y = w[j], typeof y == "function" && y(l))
        return g;
      if (y instanceof Date && l !== void 0 && y.getTime() === l.getTime())
        return g;
      if (typeof y == "string") {
        var T = e.parseDate(y, void 0, !0);
        return T && T.getTime() === l.getTime() ? g : !g;
      } else if (typeof y == "object" && l !== void 0 && y.from && y.to && l.getTime() >= y.from.getTime() && l.getTime() <= y.to.getTime())
        return g;
    }
    return !g;
  }
  function Be(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Et(n) {
    var a = n.target === e._input, r = e._input.value.trimEnd() !== Ge();
    a && r && !(n.relatedTarget && Ce(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function st(n) {
    var a = X(n), r = e.config.wrap ? t.contains(a) : a === e._input, l = e.config.allowInput, g = e.isOpen && (!l || !r), w = e.config.inline && r && !l;
    if (n.keyCode === 13 && r) {
      if (l)
        return e.setDate(e._input.value, !0, a === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), a.blur();
      e.open();
    } else if (Ce(a) || g || w) {
      var j = !!e.timeContainer && e.timeContainer.contains(a);
      switch (n.keyCode) {
        case 13:
          j ? (n.preventDefault(), f(), We()) : ft(n);
          break;
        case 27:
          n.preventDefault(), We();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!j && !r) {
            n.preventDefault();
            var y = d();
            if (e.daysContainer !== void 0 && (l === !1 || y && Be(y))) {
              var T = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), Ve(T), C(de(1), 0)) : C(void 0, T);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var b = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && a.$i !== void 0 || a === e.input || a === e.altInput ? n.ctrlKey ? (n.stopPropagation(), Ae(e.currentYear - b), C(de(1), 0)) : j || C(void 0, b * 7) : a === e.currentYearElement ? Ae(e.currentYear - b) : e.config.enableTime && (!j && e.hourElement && e.hourElement.focus(), f(n), e._debouncedChange());
          break;
        case 9:
          if (j) {
            var _ = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Q) {
              return Q;
            }), Y = _.indexOf(a);
            if (Y !== -1) {
              var re = _[Y + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (re || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(a) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && a === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], m(), se();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], m(), se();
          break;
      }
    (r || Ce(a)) && N("onKeyDown", n);
  }
  function $e(n, a) {
    if (a === void 0 && (a = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(a) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), l = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), g = Math.min(r, e.selectedDates[0].getTime()), w = Math.max(r, e.selectedDates[0].getTime()), j = !1, y = 0, T = 0, b = g; b < w; b += Ha.DAY)
        ce(new Date(b), !0) || (j = j || b > g && b < w, b < l && (!y || b > y) ? y = b : b > l && (!T || b < T) && (T = b));
      var _ = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + a));
      _.forEach(function(Y) {
        var re = Y.dateObj, Q = re.getTime(), De = y > 0 && Q < y || T > 0 && Q > T;
        if (De) {
          Y.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(pe) {
            Y.classList.remove(pe);
          });
          return;
        } else if (j && !De)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(pe) {
          Y.classList.remove(pe);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), l < r && Q === l ? Y.classList.add("startRange") : l > r && Q === l && Y.classList.add("endRange"), Q >= y && (T === 0 || Q <= T) && Fa(Q, l, r) && Y.classList.add("inRange"));
      });
    }
  }
  function St() {
    e.isOpen && !e.config.static && !e.config.inline && Fe();
  }
  function jt(n, a) {
    if (a === void 0 && (a = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = X(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), N("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var l = e.isOpen;
    e.isOpen = !0, l || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), N("onOpen"), Fe(a)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function lt(n) {
    return function(a) {
      var r = e.config["_" + n + "Date"] = e.parseDate(a, e.config.dateFormat), l = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(g) {
        return ce(g);
      }), !e.selectedDates.length && n === "min" && S(r), se()), e.daysContainer && (ut(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!l && r !== void 0 && l.getFullYear() === r.getFullYear());
    };
  }
  function Tt() {
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
    ], a = q(q({}, JSON.parse(JSON.stringify(t.dataset || {}))), o), r = {};
    e.config.parseDate = a.parseDate, e.config.formatDate = a.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(_) {
        e.config._enable = gt(_);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(_) {
        e.config._disable = gt(_);
      }
    });
    var l = a.mode === "time";
    if (!a.dateFormat && (a.enableTime || l)) {
      var g = R.defaultConfig.dateFormat || me.dateFormat;
      r.dateFormat = a.noCalendar || l ? "H:i" + (a.enableSeconds ? ":S" : "") : g + " H:i" + (a.enableSeconds ? ":S" : "");
    }
    if (a.altInput && (a.enableTime || l) && !a.altFormat) {
      var w = R.defaultConfig.altFormat || me.altFormat;
      r.altFormat = a.noCalendar || l ? "h:i" + (a.enableSeconds ? ":S K" : " K") : w + (" h:i" + (a.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: lt("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: lt("max")
    });
    var j = function(_) {
      return function(Y) {
        e.config[_ === "min" ? "_minTime" : "_maxTime"] = e.parseDate(Y, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: j("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: j("max")
    }), a.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, a);
    for (var y = 0; y < n.length; y++)
      e.config[n[y]] = e.config[n[y]] === !0 || e.config[n[y]] === "true";
    Je.filter(function(_) {
      return e.config[_] !== void 0;
    }).forEach(function(_) {
      e.config[_] = Ze(e.config[_] || []).map(p);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var y = 0; y < e.config.plugins.length; y++) {
      var T = e.config.plugins[y](e) || {};
      for (var b in T)
        Je.indexOf(b) > -1 ? e.config[b] = Ze(T[b]).map(p).concat(e.config[b]) : typeof a[b] > "u" && (e.config[b] = T[b]);
    }
    a.altInputClass || (e.config.altInputClass = dt().className + " " + e.config.altInputClass), N("onParseConfig");
  }
  function dt() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function ct() {
    typeof e.config.locale != "object" && typeof R.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = q(q({}, R.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? R.l10ns[e.config.locale] : void 0), fe.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", fe.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", fe.M = "(" + e.l10n.months.shorthand.join("|") + ")", fe.F = "(" + e.l10n.months.longhand.join("|") + ")", fe.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = q(q({}, o), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && R.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = yt(e), e.parseDate = at({ config: e.config, l10n: e.l10n });
  }
  function Fe(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      N("onPreCalendarPosition");
      var a = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(Ut, Jt) {
        return Ut + Jt.offsetHeight;
      }, 0), l = e.calendarContainer.offsetWidth, g = e.config.position.split(" "), w = g[0], j = g.length > 1 ? g[1] : null, y = a.getBoundingClientRect(), T = window.innerHeight - y.bottom, b = w === "above" || w !== "below" && T < r && y.top > r, _ = window.pageYOffset + y.top + (b ? -r - 2 : a.offsetHeight + 2);
      if (G(e.calendarContainer, "arrowTop", !b), G(e.calendarContainer, "arrowBottom", b), !e.config.inline) {
        var Y = window.pageXOffset + y.left, re = !1, Q = !1;
        j === "center" ? (Y -= (l - y.width) / 2, re = !0) : j === "right" && (Y -= l - y.width, Q = !0), G(e.calendarContainer, "arrowLeft", !re && !Q), G(e.calendarContainer, "arrowCenter", re), G(e.calendarContainer, "arrowRight", Q);
        var De = window.document.body.offsetWidth - (window.pageXOffset + y.right), pe = Y + l > window.document.body.offsetWidth, zt = De + l > window.document.body.offsetWidth;
        if (G(e.calendarContainer, "rightMost", pe), !e.config.static)
          if (e.calendarContainer.style.top = _ + "px", !pe)
            e.calendarContainer.style.left = Y + "px", e.calendarContainer.style.right = "auto";
          else if (!zt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = De + "px";
          else {
            var Ue = At();
            if (Ue === void 0)
              return;
            var Vt = window.document.body.offsetWidth, Rt = Math.max(0, Vt / 2 - l / 2), Wt = ".flatpickr-calendar.centerMost:before", Kt = ".flatpickr-calendar.centerMost:after", qt = Ue.cssRules.length, Gt = "{left:" + y.left + "px;right:auto;}";
            G(e.calendarContainer, "rightMost", !1), G(e.calendarContainer, "centerMost", !0), Ue.insertRule(Wt + "," + Kt + Gt, qt), e.calendarContainer.style.left = Rt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function At() {
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
    return n ?? Bt();
  }
  function Bt() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function ut() {
    e.config.noCalendar || e.isMobile || (W(), He(), O());
  }
  function We() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function ft(n) {
    n.preventDefault(), n.stopPropagation();
    var a = function(_) {
      return _.classList && _.classList.contains("flatpickr-day") && !_.classList.contains("flatpickr-disabled") && !_.classList.contains("notAllowed");
    }, r = bt(X(n), a);
    if (r !== void 0) {
      var l = r, g = e.latestSelectedDateObj = new Date(l.dateObj.getTime()), w = (g.getMonth() < e.currentMonth || g.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = l, e.config.mode === "single")
        e.selectedDates = [g];
      else if (e.config.mode === "multiple") {
        var j = qe(g);
        j ? e.selectedDates.splice(parseInt(j), 1) : e.selectedDates.push(g);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = g, e.selectedDates.push(g), ee(g, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(_, Y) {
        return _.getTime() - Y.getTime();
      }));
      if (m(), w) {
        var y = e.currentYear !== g.getFullYear();
        e.currentYear = g.getFullYear(), e.currentMonth = g.getMonth(), y && (N("onYearChange"), W()), N("onMonthChange");
      }
      if (He(), O(), se(), !w && e.config.mode !== "range" && e.config.showMonths === 1 ? oe(l) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var T = e.config.mode === "single" && !e.config.enableTime, b = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (T || b) && We();
      }
      A();
    }
  }
  var Ie = {
    locale: [ct, it],
    showMonths: [je, s, rt],
    minDate: [K],
    maxDate: [K],
    positionElement: [pt],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (M(e._input, "focus", e.open), M(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function $t(n, a) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        Ie[r] !== void 0 && Ie[r].forEach(function(l) {
          return l();
        });
    } else
      e.config[n] = a, Ie[n] !== void 0 ? Ie[n].forEach(function(l) {
        return l();
      }) : Je.indexOf(n) > -1 && (e.config[n] = Ze(a));
    e.redraw(), se(!0);
  }
  function ht(n, a) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(l) {
        return e.parseDate(l, a);
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
          r = n.split(e.config.conjunction).map(function(l) {
            return e.parseDate(l, a);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(l) {
            return e.parseDate(l, a);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(l) {
      return l instanceof Date && ce(l, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(l, g) {
      return l.getTime() - g.getTime();
    });
  }
  function Ft(n, a, r) {
    if (a === void 0 && (a = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(a);
    ht(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), K(void 0, a), S(), e.selectedDates.length === 0 && e.clear(!1), se(a), a && N("onChange");
  }
  function gt(n) {
    return n.slice().map(function(a) {
      return typeof a == "string" || typeof a == "number" || a instanceof Date ? e.parseDate(a, void 0, !0) : a && typeof a == "object" && a.from && a.to ? {
        from: e.parseDate(a.from, void 0),
        to: e.parseDate(a.to, void 0)
      } : a;
    }).filter(function(a) {
      return a;
    });
  }
  function It() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && ht(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function Ht() {
    if (e.input = dt(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = F(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), pt();
  }
  function pt() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function Ot() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = F("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    M(e.mobileInput, "change", function(a) {
      e.setDate(X(a).value, !1, e.mobileFormatStr), N("onChange"), N("onClose");
    });
  }
  function Lt(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function N(n, a) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var l = 0; r[l] && l < r.length; l++)
          r[l](e.selectedDates, e.input.value, e, a);
      n === "onChange" && (e.input.dispatchEvent(Ke("change")), e.input.dispatchEvent(Ke("input")));
    }
  }
  function Ke(n) {
    var a = document.createEvent("Event");
    return a.initEvent(n, !0, !0), a;
  }
  function qe(n) {
    for (var a = 0; a < e.selectedDates.length; a++) {
      var r = e.selectedDates[a];
      if (r instanceof Date && ee(r, n) === 0)
        return "" + a;
    }
    return !1;
  }
  function Yt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : ee(n, e.selectedDates[0]) >= 0 && ee(n, e.selectedDates[1]) <= 0;
  }
  function He() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, a) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + a), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[a].textContent = Ne(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function Ge(n) {
    var a = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, a);
    }).filter(function(r, l, g) {
      return e.config.mode !== "range" || e.config.enableTime || g.indexOf(r) === l;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function se(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = Ge(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = Ge(e.config.altFormat)), n !== !1 && N("onValueUpdate");
  }
  function Pt(n) {
    var a = X(n), r = e.prevMonthNav.contains(a), l = e.nextMonthNav.contains(a);
    r || l ? Ve(r ? -1 : 1) : e.yearElements.indexOf(a) >= 0 ? a.select() : a.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : a.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function Nt(n) {
    n.preventDefault();
    var a = n.type === "keydown", r = X(n), l = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[ae(e.amPM.textContent === e.l10n.amPM[0])]);
    var g = parseFloat(l.getAttribute("min")), w = parseFloat(l.getAttribute("max")), j = parseFloat(l.getAttribute("step")), y = parseInt(l.value, 10), T = n.delta || (a ? n.which === 38 ? 1 : -1 : 0), b = y + j * T;
    if (typeof l.value < "u" && l.value.length === 2) {
      var _ = l === e.hourElement, Y = l === e.minuteElement;
      b < g ? (b = w + b + ae(!_) + (ae(_) && ae(!e.amPM)), Y && P(void 0, -1, e.hourElement)) : b > w && (b = l === e.hourElement ? b - w - ae(!e.amPM) : g, Y && P(void 0, 1, e.hourElement)), e.amPM && _ && (j === 1 ? b + y === 23 : Math.abs(b - y) > j) && (e.amPM.textContent = e.l10n.amPM[ae(e.amPM.textContent === e.l10n.amPM[0])]), l.value = U(b);
    }
  }
  return u(), e;
}
function ve(t, o) {
  for (var e = Array.prototype.slice.call(t).filter(function(p) {
    return p instanceof HTMLElement;
  }), c = [], u = 0; u < e.length; u++) {
    var d = e[u];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = La(d, o || {}), c.push(d._flatpickr);
    } catch (p) {
      console.error(p);
    }
  }
  return c.length === 1 ? c[0] : c;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return ve(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return ve([this], t);
});
var R = function(t, o) {
  return typeof t == "string" ? ve(window.document.querySelectorAll(t), o) : t instanceof Node ? ve([t], o) : ve(t, o);
};
R.defaultConfig = {};
R.l10ns = {
  en: q({}, Se),
  default: q({}, Se)
};
R.localize = function(t) {
  R.l10ns.default = q(q({}, R.l10ns.default), t);
};
R.setDefaults = function(t) {
  R.defaultConfig = q(q({}, R.defaultConfig), t);
};
R.parseDate = at({});
R.formatDate = yt({});
R.compareDates = ee;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return ve(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = R);
var Ya = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Pa(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var xt = { exports: {} };
(function(t, o) {
  (function(e, c) {
    t.exports = c();
  })(Ya, function() {
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
        for (var i, m = 1, S = arguments.length; m < S; m++) {
          i = arguments[m];
          for (var D in i) Object.prototype.hasOwnProperty.call(i, D) && (x[D] = i[D]);
        }
        return x;
      }, e.apply(this, arguments);
    }, c = function(f, x, i) {
      return i.months[x ? "shorthand" : "longhand"][f];
    };
    function u(f) {
      for (; f.firstChild; )
        f.removeChild(f.firstChild);
    }
    function d(f) {
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
    var p = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function s(f) {
      var x = e(e({}, p), f);
      return function(i) {
        i.config.dateFormat = x.dateFormat, i.config.altFormat = x.altFormat;
        var m = { monthsContainer: null };
        function S() {
          if (i.rContainer) {
            u(i.rContainer);
            for (var C = 0; C < i.monthElements.length; C++) {
              var B = i.monthElements[C];
              B.parentNode && B.parentNode.removeChild(B);
            }
          }
        }
        function D() {
          i.rContainer && (m.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), m.monthsContainer.tabIndex = -1, E(), i.rContainer.appendChild(m.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + x.theme));
        }
        function E() {
          if (m.monthsContainer) {
            u(m.monthsContainer);
            for (var C = document.createDocumentFragment(), B = 0; B < 12; B++) {
              var O = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, B), 0, B);
              O.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && O.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && O.classList.add("today"), O.textContent = c(B, x.shorthand, i.l10n), O.addEventListener("click", K), C.appendChild(O);
            }
            m.monthsContainer.appendChild(C), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function M() {
          i._bind(i.prevMonthNav, "click", function(C) {
            C.preventDefault(), C.stopPropagation(), i.changeYear(i.currentYear - 1), J(), E();
          }), i._bind(i.nextMonthNav, "click", function(C) {
            C.preventDefault(), C.stopPropagation(), i.changeYear(i.currentYear + 1), J(), E();
          }), i._bind(m.monthsContainer, "mouseover", function(C) {
            i.config.mode === "range" && i.onMouseOver(d(C), "flatpickr-monthSelect-month");
          });
        }
        function A() {
          if (i.rContainer && i.selectedDates.length) {
            for (var C = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), B = 0; B < C.length; B++)
              C[B].classList.remove("selected");
            var O = i.selectedDates[0].getMonth(), W = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (O + 1) + ")");
            W && W.classList.add("selected");
          }
        }
        function J() {
          var C = i.selectedDates[0];
          if (C && (C = new Date(C), C.setFullYear(i.currentYear), i.config.minDate && C < i.config.minDate && (C = i.config.minDate), i.config.maxDate && C > i.config.maxDate && (C = i.config.maxDate), i.currentYear = C.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var B = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            B.forEach(function(O) {
              O.dateObj.setFullYear(i.currentYear), i.config.minDate && O.dateObj < i.config.minDate || i.config.maxDate && O.dateObj > i.config.maxDate ? O.classList.add("flatpickr-disabled") : O.classList.remove("flatpickr-disabled");
            });
          }
          A();
        }
        function K(C) {
          C.preventDefault(), C.stopPropagation();
          var B = d(C);
          if (B instanceof Element && !B.classList.contains("flatpickr-disabled") && !B.classList.contains("notAllowed") && (ne(B.dateObj), i.config.closeOnSelect)) {
            var O = i.config.mode === "single", W = i.config.mode === "range" && i.selectedDates.length === 2;
            (O || W) && i.close();
          }
        }
        function ne(C) {
          var B = new Date(i.currentYear, C.getMonth(), C.getDate()), O = [];
          switch (i.config.mode) {
            case "single":
              O = [B];
              break;
            case "multiple":
              O.push(B);
              break;
            case "range":
              i.selectedDates.length === 2 ? O = [B] : (O = i.selectedDates.concat([B]), O.sort(function(W, ge) {
                return W.getTime() - ge.getTime();
              }));
              break;
          }
          i.setDate(O, !0), A();
        }
        var P = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ie(C, B, O, W) {
          var ge = P[W.keyCode] !== void 0;
          if (!(!ge && W.keyCode !== 13) && !(!i.rContainer || !m.monthsContainer)) {
            var je = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), Me = Array.prototype.indexOf.call(m.monthsContainer.children, document.activeElement);
            if (Me === -1) {
              var Te = je || m.monthsContainer.firstElementChild;
              Te.focus(), Me = Te.$i;
            }
            ge ? m.monthsContainer.children[(12 + Me + P[W.keyCode]) % 12].focus() : W.keyCode === 13 && m.monthsContainer.contains(document.activeElement) && ne(document.activeElement.dateObj);
          }
        }
        function Z() {
          var C;
          ((C = i.config) === null || C === void 0 ? void 0 : C.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || E();
        }
        function oe() {
          x._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(x._stubbedCurrentMonth), i.currentMonth = x._stubbedCurrentMonth;
        }
        function de() {
          x._stubbedCurrentMonth && (i._initialDate.setMonth(x._stubbedCurrentMonth), i.currentMonth = x._stubbedCurrentMonth, delete x._stubbedCurrentMonth);
        }
        function xe() {
          if (m.monthsContainer !== null)
            for (var C = m.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), B = 0; B < C.length; B++)
              C[B].removeEventListener("click", K);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: A,
          onKeyDown: ie,
          onReady: [
            oe,
            S,
            D,
            M,
            A,
            function() {
              i.config.onClose.push(Z), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            de,
            xe,
            function() {
              i.config.onClose = i.config.onClose.filter(function(C) {
                return C !== Z;
              });
            }
          ]
        };
      };
    }
    return s;
  });
})(xt);
var Na = xt.exports;
const za = /* @__PURE__ */ Pa(Na), Va = { class: "relative" }, Ra = ["placeholder", "disabled", "readonly"], Wa = {
  key: 0,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, Ka = { class: "flex items-center justify-between mb-2" }, qa = { class: "text-xs opacity-70" }, Ga = { class: "grid grid-cols-4 gap-2" }, Ua = ["onClick"], bo = /* @__PURE__ */ z({
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
  setup(t, { emit: o }) {
    const e = t, c = o, u = te(null), d = te(!1), p = te((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let s = null;
    const f = I(() => e.picker === "month" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), x = () => {
      var E, M;
      if (u.value) {
        if (e.picker === "year-grid") {
          (E = s == null ? void 0 : s.destroy) == null || E.call(s), s = null;
          return;
        }
        (M = s == null ? void 0 : s.destroy) == null || M.call(s), s = R(u.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            za({
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
                (K) => s.formatDate(K, f.value)
              );
              c("update:modelValue", J);
            } else {
              const J = A[0] ? s.formatDate(A[0], f.value) : "";
              c("update:modelValue", J);
            }
          }
        });
      }
    }, i = () => {
      var E;
      if (e.picker === "year-grid") {
        d.value = !0;
        return;
      }
      (E = s == null ? void 0 : s.open) == null || E.call(s);
    };
    tt(x), nt(() => {
      var E;
      return (E = s == null ? void 0 : s.destroy) == null ? void 0 : E.call(s);
    }), he(
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
    ), he(
      () => e.modelValue,
      (E) => {
        !s || e.picker === "year-grid" || s.setDate(E, !1);
      }
    );
    const m = I(
      () => Array.from({ length: 12 }, (E, M) => p.value + M)
    ), S = (E) => {
      c("update:modelValue", E.toString()), d.value = !1;
    }, D = (E) => {
      if (!d.value) return;
      const M = E.target;
      if (u.value && M && u.value.contains(M)) return;
      const A = document.querySelector(".mitreka-year-grid");
      A && M && A.contains(M) || (d.value = !1);
    };
    return tt(() => document.addEventListener("click", D)), nt(() => document.removeEventListener("click", D)), (E, M) => (v(), k("div", Va, [
      h("input", {
        ref_key: "inputEl",
        ref: u,
        class: $(["input w-full", t.inputClass]),
        placeholder: t.placeholder,
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: i,
        onFocus: i
      }, null, 42, Ra),
      t.picker === "year-grid" && d.value ? (v(), k("div", Wa, [
        h("div", Ka, [
          h("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: M[0] || (M[0] = (A) => p.value -= 12)
          }, " Prev "),
          h("div", qa, H(p.value) + " - " + H(p.value + 11), 1),
          h("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: M[1] || (M[1] = (A) => p.value += 12)
          }, " Next ")
        ]),
        h("div", Ga, [
          (v(!0), k(le, null, be(m.value, (A) => (v(), k("button", {
            key: A,
            class: $(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === A.toString() }]),
            type: "button",
            onClick: (J) => S(A)
          }, H(A), 11, Ua))), 128))
        ])
      ])) : L("", !0)
    ]));
  }
}), yo = /* @__PURE__ */ z({
  inheritAttrs: !1,
  __name: "AgGridSurface",
  props: {
    density: { default: "cozy" },
    striped: { type: Boolean, default: !0 },
    themeMode: { default: "auto" },
    autoObserveTheme: { type: Boolean, default: !0 },
    autoRowHeight: { type: Boolean, default: !0 },
    pinnedShadows: { type: Boolean, default: !0 }
  },
  emits: ["grid-ready"],
  setup(t, { emit: o }) {
    const e = t, c = o, u = on(), d = te(null), p = te(null), s = te(13), f = te(!1);
    let x = null, i = null;
    const m = () => {
      const P = document.documentElement, ie = P.classList.contains("dark"), Z = (P.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      f.value = ie || Z;
    }, S = I(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : f.value), D = I(() => S.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), E = I(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), M = I(() => ["agx", D.value, E.value, u.class]), A = I(() => [{ "--ag-odd-row-background-color": e.striped ? S.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, u.style]), J = I(() => {
      const { class: P, style: ie, onGridReady: Z, ...oe } = u;
      return oe;
    }), K = () => {
      if (!e.autoRowHeight || !p.value) return;
      const P = cn(s.value, e.density);
      p.value.setGridOption("rowHeight", P), p.value.setGridOption("getRowHeight", () => P), p.value.resetRowHeights();
    }, ne = (P) => {
      p.value = P.api, s.value = un(d.value), K(), c("grid-ready", P);
    };
    return he(
      () => e.density,
      () => {
        var P;
        K(), (P = p.value) == null || P.refreshCells({ force: !0 });
      }
    ), tt(() => {
      m(), e.autoObserveTheme && (x = new MutationObserver(m), x.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (i = dn(d.value));
    }), nt(() => {
      x == null || x.disconnect(), i == null || i();
    }), (P, ie) => (v(), k("div", {
      ref_key: "hostRef",
      ref: d,
      class: "w-full h-full"
    }, [
      ke(ye(fn), rn(J.value, {
        class: M.value,
        theme: "legacy",
        style: A.value,
        onGridReady: ne
      }), null, 16, ["class", "style"])
    ], 512));
  }
});
export {
  Xa as _,
  eo as a,
  to as b,
  no as c,
  ao as d,
  oo as e,
  ro as f,
  In as g,
  io as h,
  so as i,
  lo as j,
  co as k,
  uo as l,
  fo as m,
  ho as n,
  go as o,
  po as p,
  mo as q,
  vo as r,
  ko as s,
  bo as t,
  yo as u,
  kt as v,
  wo as w
};
