import { defineComponent as ce, createElementBlock as f, openBlock as c, normalizeClass as B, createCommentVNode as I, renderSlot as pe, createElementVNode as u, ref as F, watch as ve, withKeys as ht, withModifiers as te, createBlock as Ke, Teleport as gt, createVNode as le, Transition as ot, withCtx as at, toDisplayString as A, provide as rn, inject as sn, computed as b, normalizeStyle as xe, createTextVNode as Yt, Fragment as ke, renderList as He, unref as V, useSlots as ln, resolveDynamicComponent as dn, reactive as cn, withDirectives as At, vModelText as Lt, onMounted as pt, onBeforeUnmount as rt, mergeProps as Ft, useAttrs as Rt, nextTick as Pe, isRef as Nt } from "vue";
import { d as un, c as fn, f as hn, h as pn, i as gn, g as vn, r as mn, a as wn, b as kn } from "./useAgGridRowHeight-BjqPqzTu.js";
import { AgGridVue as xn } from "ag-grid-vue3";
const yn = ["disabled"], bn = {
  key: 0,
  class: "animate-spin"
}, vr = /* @__PURE__ */ ce({
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
    const e = t, h = a, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: i, color: g } = e;
      return g === "default" ? i === "outline" ? "btn-outline" : i === "ghost" ? "btn-ghost" : "" : i === "solid" ? `btn-${g}` : i === "outline" ? `btn-outline btn-outline-${g}` : i === "soft" ? `btn-soft-${g}` : i === "ghost" ? "btn-ghost" : "";
    }, v = (i) => {
      !e.disabled && !e.loading && h("click", i);
    };
    return (i, g) => (c(), f("button", {
      class: B(["btn", l[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: v
    }, [
      t.loading ? (c(), f("span", bn, [...g[0] || (g[0] = [
        u("svg", {
          class: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24"
        }, [
          u("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }),
          u("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          })
        ], -1)
      ])])) : I("", !0),
      pe(i.$slots, "default")
    ], 10, yn));
  }
}), mr = /* @__PURE__ */ ce({
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
    }, h = () => {
      const { variant: l, color: d } = a;
      return d === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${d}` : l === "outline" ? `badge-outline badge-outline-${d}` : l === "soft" ? `badge-soft-${d}` : "";
    };
    return (l, d) => (c(), f("span", {
      class: B(["badge", e[t.size], h()])
    }, [
      pe(l.$slots, "default")
    ], 2));
  }
}), Mn = ["role", "aria-expanded", "tabindex"], Cn = { class: "card-title" }, Dn = { class: "card-body-inner" }, $n = {
  key: 3,
  class: "mt-4"
}, wr = /* @__PURE__ */ ce({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const h = t, l = e, d = F(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    ve(() => h.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function v() {
      if (!h.collapsible) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return a({ isOpen: d, toggle: v }), (i, g) => (c(), f("section", {
      class: B(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      i.$slots.title ? (c(), f("header", {
        key: 0,
        class: B(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: v,
        onKeydown: [
          g[0] || (g[0] = ht((k) => t.collapsible && v(), ["enter"])),
          g[1] || (g[1] = ht(te((k) => t.collapsible && v(), ["prevent"]), ["space"]))
        ]
      }, [
        u("div", Cn, [
          pe(i.$slots, "title")
        ]),
        t.collapsible ? (c(), f("svg", {
          key: 0,
          class: B(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...g[2] || (g[2] = [
          u("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : I("", !0)
      ], 42, Mn)) : I("", !0),
      t.collapsible ? (c(), f("div", {
        key: 1,
        class: B(["card-body-wrapper", { "is-open": d.value }])
      }, [
        u("div", Dn, [
          pe(i.$slots, "default")
        ])
      ], 2)) : pe(i.$slots, "default", { key: 2 }),
      i.$slots.footer ? (c(), f("footer", $n, [
        pe(i.$slots, "footer")
      ])) : I("", !0)
    ], 2));
  }
}), Sn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, _n = { class: "text-xl font-semibold" }, kr = /* @__PURE__ */ ce({
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
    const e = t, h = a, l = {
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
      e.persistent || h("close");
    };
    return ve(
      () => e.open,
      (v) => {
        v ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (v, i) => (c(), Ke(gt, { to: "body" }, [
      le(ot, { name: "fade" }, {
        default: at(() => [
          t.open ? (c(), f("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: d
          })) : I("", !0)
        ]),
        _: 1
      }),
      le(ot, { name: "zoom" }, {
        default: at(() => [
          t.open ? (c(), f("div", {
            key: 0,
            class: B([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            u("div", {
              class: B([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? I("", !0) : (c(), f("div", Sn, [
                pe(v.$slots, "header", {}, () => [
                  u("h3", _n, A(t.title), 1)
                ]),
                u("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: i[0] || (i[0] = (g) => h("close"))
                }, [...i[3] || (i[3] = [
                  u("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    u("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])])
              ])),
              u("div", {
                class: B([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                pe(v.$slots, "default")
              ], 2),
              t.hideFooter ? I("", !0) : (c(), f("div", {
                key: 1,
                class: B([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                pe(v.$slots, "footer", {}, () => [
                  u("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: i[1] || (i[1] = (g) => h("close"))
                  }, A(t.cancelText), 1),
                  u("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: i[2] || (i[2] = (g) => h("confirm"))
                  }, A(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : I("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), Hn = ["aria-expanded", "aria-disabled", "onKeydown"], En = { class: "collapse-title" }, jn = { class: "collapse-content" }, Bn = { class: "collapse-content-inner" }, Tn = { class: "collapse-body" }, xr = /* @__PURE__ */ ce({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const h = t, l = e, d = F(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    ve(() => h.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function v() {
      if (h.disabled) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return a({ isOpen: d, toggle: v }), (i, g) => (c(), f("div", {
      class: B([
        "collapse-card",
        `collapse-card-${t.variant}`,
        { "is-open": d.value }
      ])
    }, [
      u("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": d.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: v,
        onKeydown: [
          ht(v, ["enter"]),
          ht(te(v, ["prevent"]), ["space"])
        ]
      }, [
        u("div", En, [
          pe(i.$slots, "header", {}, () => [
            pe(i.$slots, "title")
          ])
        ]),
        g[0] || (g[0] = u("svg", {
          class: "collapse-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          u("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, Hn),
      u("div", jn, [
        u("div", Bn, [
          u("div", Tn, [
            pe(i.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), yr = /* @__PURE__ */ ce({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const h = t, l = e, d = F(/* @__PURE__ */ new Set());
    ve(() => h.modelValue, (g) => {
      g === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(g) ? d.value = new Set(g) : d.value = /* @__PURE__ */ new Set([g]);
    }, { immediate: !0 });
    function v(g) {
      const k = new Set(d.value);
      k.has(g) ? k.delete(g) : (h.multiple || k.clear(), k.add(g)), d.value = k, h.multiple ? l("update:modelValue", Array.from(k)) : l("update:modelValue", k.size > 0 ? Array.from(k)[0] : null);
    }
    function i(g) {
      return d.value.has(g);
    }
    return rn("accordion", {
      toggleItem: v,
      isItemOpen: i
    }), a({ openItems: d, toggleItem: v }), (g, k) => (c(), f("div", {
      class: B(["accordion", `accordion-${t.variant}`])
    }, [
      pe(g.$slots, "default")
    ], 2));
  }
}), In = ["aria-expanded", "aria-disabled", "onKeydown"], An = { class: "accordion-title" }, Ln = { class: "accordion-content" }, zn = { class: "accordion-content-inner" }, Fn = { class: "accordion-body" }, br = /* @__PURE__ */ ce({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = sn("accordion"), h = b(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function l() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (d, v) => (c(), f("div", {
      class: B(["accordion-item", { "is-open": h.value }])
    }, [
      u("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": h.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          ht(l, ["enter"]),
          ht(te(l, ["prevent"]), ["space"])
        ]
      }, [
        u("div", An, [
          pe(d.$slots, "header", {}, () => [
            pe(d.$slots, "title")
          ])
        ]),
        v[0] || (v[0] = u("svg", {
          class: "accordion-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          u("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, In),
      u("div", Ln, [
        u("div", zn, [
          u("div", Fn, [
            pe(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), On = { class: "loading-logo-wrapper" }, Nn = { class: "dots-container" }, Pn = ["width", "height"], Vn = {
  key: 0,
  class: "loading-text"
}, Yn = /* @__PURE__ */ ce({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = b(() => Math.round(a.size * (8 / 60)));
    return (h, l) => (c(), f("div", On, [
      u("div", {
        class: "loading-logo-container",
        style: xe({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        u("div", Nn, [
          u("span", {
            class: "loading-dot dot-1 dot-blue",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          u("span", {
            class: "loading-dot dot-2 dot-blue",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          u("span", {
            class: "loading-dot dot-3 dot-black",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          u("span", {
            class: "loading-dot dot-4 dot-black",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          u("span", {
            class: "loading-dot dot-5 dot-red",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          u("span", {
            class: "loading-dot dot-6 dot-red",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (c(), f("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...l[0] || (l[0] = [
          u("polygon", {
            class: "logo-shape shape-blue",
            points: "11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
          }, null, -1),
          u("rect", {
            class: "logo-shape shape-black",
            x: "15.48",
            y: "8.73",
            width: "9.55",
            height: "9.55",
            transform: "translate(-3.61 18.27) rotate(-45)"
          }, null, -1),
          u("polygon", {
            class: "logo-shape shape-red",
            points: "40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
          }, null, -1)
        ])], 8, Pn))
      ], 4),
      t.text ? (c(), f("p", Vn, [
        Yt(A(t.text), 1),
        l[1] || (l[1] = u("span", { class: "loading-dots" }, [
          u("span", null, "."),
          u("span", null, "."),
          u("span", null, ".")
        ], -1))
      ])) : I("", !0)
    ]));
  }
}), Rn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, Mr = /* @__PURE__ */ ce({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (c(), Ke(gt, { to: "body" }, [
      le(ot, { name: "fade" }, {
        default: at(() => [
          t.open ? (c(), f("div", Rn, [
            le(Yn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : I("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Wn = { class: "toast-content" }, Un = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Kn = ["d"], Gn = { class: "toast-body" }, qn = {
  key: 0,
  class: "toast-title"
}, Zn = { class: "toast-message" }, Jn = ["onClick"], Cr = /* @__PURE__ */ ce({
  __name: "Toasts",
  setup(t) {
    const a = un(), e = b(() => {
      const g = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return g[a.toastPosition.value] || g["bottom-right"];
    }), h = {
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
    }, d = {
      info: "toast-solid-info",
      success: "toast-solid-success",
      warning: "toast-solid-warning",
      error: "toast-solid-error",
      primary: "toast-solid-primary"
    }, v = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, i = (g, k = "soft") => {
      var w;
      return ((w = {
        soft: l,
        solid: d,
        outline: v
      }[k]) == null ? void 0 : w[g]) || l[g] || "toast-default";
    };
    return (g, k) => (c(), Ke(gt, { to: "body" }, [
      u("div", {
        class: B(["toast-container", e.value])
      }, [
        (c(!0), f(ke, null, He(V(a).toasts.value, (s) => (c(), f("div", {
          key: s.id,
          class: B(["toast-item", i(s.type, s.variant)])
        }, [
          u("div", Wn, [
            (c(), f("svg", Un, [
              u("path", {
                d: h[s.type],
                fill: "currentColor"
              }, null, 8, Kn)
            ])),
            u("div", Gn, [
              s.title ? (c(), f("div", qn, A(s.title), 1)) : I("", !0),
              u("div", Zn, A(s.message), 1)
            ]),
            u("button", {
              class: "toast-close-btn",
              onClick: (w) => V(a).dismiss(s.id)
            }, [...k[0] || (k[0] = [
              u("svg", {
                class: "toast-close-icon",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                u("path", {
                  d: "M6 18L18 6M6 6l12 12",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ])], 8, Jn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), Dr = /* @__PURE__ */ ce({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const a = t, e = F(!1);
    let h = null;
    const l = () => {
      h = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, d = () => {
      h && (clearTimeout(h), h = null), e.value = !1;
    }, v = b(() => `tooltip-pos-${a.position}`), i = b(() => `tooltip-arrow-${a.position}`), g = b(() => `tooltip-variant-${a.variant}`);
    return (k, s) => (c(), f("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: d,
      onFocus: l,
      onBlur: d
    }, [
      pe(k.$slots, "default"),
      le(ot, { name: "tooltip-fade" }, {
        default: at(() => [
          e.value && t.text ? (c(), f("span", {
            key: 0,
            class: B(["tooltip-content", [v.value, g.value]]),
            role: "tooltip"
          }, [
            Yt(A(t.text) + " ", 1),
            u("span", {
              class: B(["tooltip-arrow", [i.value, g.value]])
            }, null, 2)
          ], 2)) : I("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Xn = { class: "mitreka-pagination" }, Qn = ["disabled"], eo = { class: "pagination-status" }, to = ["disabled"], $r = /* @__PURE__ */ ce({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, h = a, l = () => {
      e.page > 1 && h("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && h("change", e.page + 1);
    };
    return (v, i) => (c(), f("div", Xn, [
      u("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...i[0] || (i[0] = [
        u("span", { class: "hidden sm:inline" }, "Prev", -1),
        u("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Qn),
      u("span", eo, A(t.page) + " / " + A(t.pages), 1),
      u("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...i[1] || (i[1] = [
        u("span", { class: "hidden sm:inline" }, "Next", -1),
        u("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, to)
    ]));
  }
}), no = { class: "avatar-root" }, oo = ["src", "alt"], Sr = /* @__PURE__ */ ce({
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
    const a = t, e = F(!1), h = b(() => a.src && !e.value), l = b(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), d = b(() => `avatar-size-${a.size}`), v = b(() => `avatar-color-${a.color}`), i = b(() => a.status ? `avatar-status-${a.status}` : ""), g = b(() => `avatar-status-size-${a.size}`), k = b(() => a.square ? "avatar-square" : "avatar-round"), s = () => {
      e.value = !0;
    };
    return (w, y) => (c(), f("span", no, [
      h.value ? (c(), f("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: B(["avatar-img", [d.value, k.value]]),
        onError: s
      }, null, 42, oo)) : (c(), f("span", {
        key: 1,
        class: B(["avatar-fallback", [d.value, v.value, k.value]])
      }, A(l.value), 3)),
      t.status ? (c(), f("span", {
        key: 2,
        class: B(["avatar-status", [i.value, g.value]])
      }, null, 2)) : I("", !0)
    ]));
  }
}), _r = /* @__PURE__ */ ce({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = ln(), h = b(() => {
      var g;
      const i = (g = e.default) == null ? void 0 : g.call(e);
      return i ? i.length : 0;
    }), l = b(() => h.value <= a.max ? 0 : h.value - a.max), d = b(() => `avatar-size-${a.size}`), v = b(() => `avatar-group-space-${a.size}`);
    return (i, g) => (c(), f("div", {
      class: B(["avatar-group", v.value])
    }, [
      (c(!0), f(ke, null, He(t.max, (k, s) => {
        var w, y;
        return c(), f(ke, { key: s }, [
          s < h.value ? (c(), Ke(dn((y = (w = V(e)).default) == null ? void 0 : y.call(w)[s]), { key: 0 })) : I("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (c(), f("span", {
        key: 0,
        class: B(["avatar-group-count", d.value])
      }, " +" + A(l.value), 3)) : I("", !0)
    ], 2));
  }
}), ao = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, ro = { class: "breadcrumbs-list" }, io = {
  key: 0,
  class: "breadcrumbs-item"
}, so = ["href"], lo = { key: 0 }, co = ["href"], uo = {
  key: 1,
  class: "breadcrumbs-text"
}, fo = {
  key: 1,
  class: "breadcrumbs-current"
}, Hr = /* @__PURE__ */ ce({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (h) => h === a.items.length - 1;
    return (h, l) => t.items.length ? (c(), f("nav", ao, [
      u("ol", ro, [
        t.showHome ? (c(), f("li", io, [
          u("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, A(t.homeLabel), 9, so)
        ])) : I("", !0),
        (c(!0), f(ke, null, He(t.items, (d, v) => (c(), f("li", {
          key: v,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = u("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(v) ? (c(), f("span", fo, A(d.label), 1)) : (c(), f("span", lo, [
            d.href ? (c(), f("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, A(d.label), 9, co)) : (c(), f("span", uo, A(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : I("", !0);
  }
}), ho = { class: "mitreka-stat-card" }, po = {
  key: 0,
  class: "stat-icon"
}, go = { class: "stat-content" }, vo = { class: "stat-label" }, mo = { class: "stat-value" }, Er = /* @__PURE__ */ ce({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (c(), f("div", ho, [
      t.icon ? (c(), f("div", po, A(t.icon), 1)) : I("", !0),
      u("div", go, [
        u("div", vo, A(t.label), 1),
        u("div", mo, A(t.value), 1)
      ])
    ]));
  }
}), wo = { class: "mitreka-page-header" }, ko = { class: "page-header-title-row" }, xo = { class: "page-header-title" }, yo = {
  key: 0,
  class: "page-header-desc"
}, jr = /* @__PURE__ */ ce({
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
    }, h = b(() => {
      if (!a.category) return "";
      const l = a.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, d) => (c(), f("header", wo, [
      u("div", ko, [
        u("h1", xo, A(t.title), 1),
        t.category ? (c(), f("span", {
          key: 0,
          class: B(["badge page-header-badge", h.value])
        }, A(t.category), 3)) : I("", !0)
      ]),
      t.description ? (c(), f("p", yo, A(t.description), 1)) : I("", !0)
    ]));
  }
}), bo = { class: "mitreka-theme-switcher" }, Mo = ["value"], Br = /* @__PURE__ */ ce({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: h } = fn("light"), l = b(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (v) => {
      e(v === "mitrekadark" ? "dark" : "light");
    };
    return (v, i) => (c(), f("div", bo, [
      u("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: i[0] || (i[0] = //@ts-ignore
        (...g) => V(h) && V(h)(...g))
      }, " Toggle: " + A(l.value), 1),
      u("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: i[1] || (i[1] = (g) => d(g.target.value))
      }, [...i[2] || (i[2] = [
        u("option", { value: "mitrekalight" }, "mitrekalight", -1),
        u("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, Mo)
    ]));
  }
}), Co = { class: "sidebar-header" }, Do = {
  key: 0,
  class: "sidebar-search"
}, $o = ["placeholder"], So = { class: "sidebar-nav" }, _o = ["href", "title", "onClick"], Ho = { class: "sidebar-icon" }, Eo = { class: "sidebar-icon-text" }, jo = {
  key: 0,
  class: "sidebar-label"
}, Bo = ["title", "onClick"], To = { class: "sidebar-icon" }, Io = { class: "sidebar-icon-text" }, Ao = {
  key: 0,
  class: "sidebar-label"
}, Lo = ["href", "title", "onClick"], zo = { class: "sidebar-icon" }, Fo = { class: "sidebar-icon-text" }, Oo = {
  key: 0,
  class: "sidebar-label"
}, Tr = /* @__PURE__ */ ce({
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
    const e = t, h = a, l = F(""), d = cn({});
    e.defaultOpenIds.forEach((w) => {
      d[w] = !0;
    });
    const v = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), i = (w) => {
      var M;
      if (!w.children) return !1;
      if (l.value.trim()) return !0;
      const y = d[w.id], m = ((M = w.children) == null ? void 0 : M.some(v)) ?? !1;
      return y === void 0 && m && (d[w.id] = !0), d[w.id] ?? m;
    }, g = (w) => {
      const y = !i(w);
      d[w.id] = y, h("toggle", w.id, y);
    }, k = b(() => {
      const w = l.value.toLowerCase().trim();
      return w ? e.items.map((y) => {
        if (y.children) {
          const m = y.children.filter(
            (M) => M.label.toLowerCase().includes(w)
          );
          return y.label.toLowerCase().includes(w) ? y : m.length > 0 ? { ...y, children: m } : null;
        }
        return y.label.toLowerCase().includes(w) ? y : null;
      }).filter(Boolean) : e.items;
    }), s = (w) => {
      h("navigate", w), l.value = "";
    };
    return (w, y) => (c(), f("aside", {
      class: B(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      u("div", Co, [
        pe(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (c(), f("div", Do, [
        At(u("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": y[0] || (y[0] = (m) => l.value = m)
        }, null, 8, $o), [
          [Lt, l.value]
        ]),
        l.value ? (c(), f("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: y[1] || (y[1] = (m) => l.value = "")
        }, " × ")) : I("", !0)
      ])) : I("", !0),
      u("nav", So, [
        (c(!0), f(ke, null, He(k.value, (m) => (c(), f(ke, {
          key: m.id
        }, [
          m.children ? (c(), f(ke, { key: 1 }, [
            u("button", {
              class: B(["sidebar-item sidebar-group", i(m) ? "is-open" : ""]),
              title: t.collapsed ? m.label : void 0,
              onClick: (M) => g(m)
            }, [
              u("span", To, [
                pe(w.$slots, "icon", { item: m }, () => [
                  u("span", Io, A(m.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? I("", !0) : (c(), f("span", Ao, A(m.label), 1)),
              t.collapsed ? I("", !0) : (c(), f("span", {
                key: 1,
                class: B(["sidebar-caret", i(m) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Bo),
            i(m) ? (c(), f("div", {
              key: 0,
              class: B(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (c(!0), f(ke, null, He(m.children, (M) => (c(), f("a", {
                key: M.id,
                class: B(["sidebar-item sidebar-child", v(M) ? "is-active" : ""]),
                href: M.href || "#",
                title: t.collapsed ? M.label : void 0,
                onClick: te((j) => s(M), ["prevent"])
              }, [
                u("span", zo, [
                  pe(w.$slots, "icon", { item: M }, () => [
                    u("span", Fo, A(M.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? I("", !0) : (c(), f("span", Oo, A(M.label), 1))
              ], 10, Lo))), 128))
            ], 2)) : I("", !0)
          ], 64)) : (c(), f("a", {
            key: 0,
            class: B(["sidebar-item", v(m) ? "is-active" : ""]),
            href: m.href || "#",
            title: t.collapsed ? m.label : void 0,
            onClick: te((M) => s(m), ["prevent"])
          }, [
            u("span", Ho, [
              pe(w.$slots, "icon", { item: m }, () => [
                u("span", Eo, A(m.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? I("", !0) : (c(), f("span", jo, A(m.label), 1))
          ], 10, _o))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Wt = {
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
  "eye-off": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 2 20 20"/>
      <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58"/>
      <path d="M6.71 6.72A10.75 10.75 0 0 0 2.06 12a1 1 0 0 0 0 .7 10.75 10.75 0 0 0 14.43 5.18"/>
      <path d="M9.9 4.24A10.75 10.75 0 0 1 21.94 12a1 1 0 0 1 0 .7 10.75 10.75 0 0 1-4.11 5.09"/>
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
  `,
  "file-doc": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <rect x="3.2" y="11.3" width="17.6" height="7.2" rx="1.6" fill="currentColor" stroke="none"/>
      <text x="12" y="16.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" stroke="none" letter-spacing="0.2" font-family="Arial, Helvetica, sans-serif">DOC</text>
    </svg>
  `,
  "file-ppt": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <rect x="3.2" y="11.3" width="17.6" height="7.2" rx="1.6" fill="currentColor" stroke="none"/>
      <text x="12" y="16.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" stroke="none" letter-spacing="0.2" font-family="Arial, Helvetica, sans-serif">PPT</text>
    </svg>
  `,
  "file-txt": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <rect x="3.2" y="11.3" width="17.6" height="7.2" rx="1.6" fill="currentColor" stroke="none"/>
      <text x="12" y="16.5" text-anchor="middle" font-size="6.2" font-weight="800" fill="#fff" stroke="none" letter-spacing="0.2" font-family="Arial, Helvetica, sans-serif">TXT</text>
    </svg>
  `,
  "file-archive": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13.659 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v11.5"/>
      <path d="M14 2v5a1 1 0 0 0 1 1h5"/>
      <path d="M8 12v-1"/>
      <path d="M8 18v-2"/>
      <path d="M8 7V6"/>
      <circle cx="8" cy="20" r="2"/>
    </svg>
  `,
  "folder-archive": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="15" cy="19" r="2"/>
      <path d="M20.9 19.8A2 2 0 0 0 22 18V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h5.1"/>
      <path d="M15 11v-1"/>
      <path d="M15 17v-2"/>
    </svg>
  `,
  "circle-arrow-down": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 8v8"/>
      <path d="m8 12 4 4 4-4"/>
    </svg>
  `,
  "circle-arrow-left": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="m12 8-4 4 4 4"/>
      <path d="M16 12H8"/>
    </svg>
  `,
  "circle-arrow-right": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="m12 16 4-4-4-4"/>
      <path d="M8 12h8"/>
    </svg>
  `,
  "circle-arrow-up": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="m16 12-4-4-4 4"/>
      <path d="M12 16V8"/>
    </svg>
  `,
  landmark: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M10 18v-7"/>
      <path d="M11.12 2.198a2 2 0 0 1 1.76.006l7.866 3.847c.476.233.31.949-.22.949H3.474c-.53 0-.695-.716-.22-.949z"/>
      <path d="M14 18v-7"/>
      <path d="M18 18v-7"/>
      <path d="M3 22h18"/>
      <path d="M6 18v-7"/>
    </svg>
  `,
  phone: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/>
    </svg>
  `,
  "map-pin": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/>
      <circle cx="12" cy="10" r="3"/>
    </svg>
  `,
  "arrow-down": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 5v14"/>
      <path d="m19 12-7 7-7-7"/>
    </svg>
  `,
  "arrow-down-left": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M17 7 7 17"/>
      <path d="M17 17H7V7"/>
    </svg>
  `,
  "arrow-down-right": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m7 7 10 10"/>
      <path d="M17 7v10H7"/>
    </svg>
  `,
  "arrow-left": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m12 19-7-7 7-7"/>
      <path d="M19 12H5"/>
    </svg>
  `,
  "arrow-right": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
      <path d="m12 5 7 7-7 7"/>
    </svg>
  `,
  "arrow-up": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m5 12 7-7 7 7"/>
      <path d="M12 19V5"/>
    </svg>
  `,
  "arrow-up-left": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 17V7h10"/>
      <path d="M17 17 7 7"/>
    </svg>
  `,
  "arrow-up-right": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M7 7h10v10"/>
      <path d="M7 17 17 7"/>
    </svg>
  `,
  "refresh-ccw": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
      <path d="M3 3v5h5"/>
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/>
      <path d="M16 16h5v5"/>
    </svg>
  `,
  repeat: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m17 2 4 4-4 4"/>
      <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
      <path d="m7 22-4-4 4-4"/>
      <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
    </svg>
  `,
  redo: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 7v6h-6"/>
      <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7"/>
    </svg>
  `,
  "redo-2": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m15 14 5-5-5-5"/>
      <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13"/>
    </svg>
  `,
  undo: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 7v6h6"/>
      <path d="M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13"/>
    </svg>
  `,
  "undo-2": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 14 4 9l5-5"/>
      <path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"/>
    </svg>
  `
}, Ir = (t) => Wt[t], No = ["innerHTML"], Po = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ge = /* @__PURE__ */ ce({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = b(() => a.class || "w-5 h-5"), h = b(() => Wt[a.name]), l = b(
      () => h.value ? h.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, v) => h.value ? (c(), f("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, No)) : (c(), f("span", Po, "?"));
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
], ut = {
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
}, yt = {
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
}, Be = function(t, a) {
  return a === void 0 && (a = 2), ("000" + t).slice(a * -1);
}, Ne = function(t) {
  return t === !0 ? 1 : 0;
};
function Pt(t, a) {
  var e;
  return function() {
    var h = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(h, l);
    }, a);
  };
}
var jt = function(t) {
  return t instanceof Array ? t : [t];
};
function _e(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function se(t, a, e) {
  var h = window.document.createElement(t);
  return a = a || "", e = e || "", h.className = a, e !== void 0 && (h.textContent = e), h;
}
function $t(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Ut(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return Ut(t.parentNode, a);
}
function St(t, a) {
  var e = se("div", "numInputWrapper"), h = se("input", "numInput " + t), l = se("span", "arrowUp"), d = se("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? h.type = "number" : (h.type = "text", h.pattern = "\\d*"), a !== void 0)
    for (var v in a)
      h.setAttribute(v, a[v]);
  return e.appendChild(h), e.appendChild(l), e.appendChild(d), e;
}
function Le(t) {
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
var Bt = function() {
}, _t = function(t, a, e) {
  return e.months[a ? "shorthand" : "longhand"][t];
}, Vo = {
  D: Bt,
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
    t.setHours(t.getHours() % 12 + 12 * Ne(new RegExp(e.amPM[1], "i").test(a)));
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
    var h = parseInt(a), l = new Date(t.getFullYear(), 0, 2 + (h - 1) * 7, 0, 0, 0, 0);
    return l.setDate(l.getDate() - l.getDay() + e.firstDayOfWeek), l;
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
  l: Bt,
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
  w: Bt,
  y: function(t, a) {
    t.setFullYear(2e3 + parseFloat(a));
  }
}, nt = {
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
}, xt = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, a, e) {
    return a.weekdays.shorthand[xt.w(t, a, e)];
  },
  F: function(t, a, e) {
    return _t(xt.n(t, a, e) - 1, !1, a);
  },
  G: function(t, a, e) {
    return Be(xt.h(t, a, e));
  },
  H: function(t) {
    return Be(t.getHours());
  },
  J: function(t, a) {
    return a.ordinal !== void 0 ? t.getDate() + a.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, a) {
    return a.amPM[Ne(t.getHours() > 11)];
  },
  M: function(t, a) {
    return _t(t.getMonth(), !0, a);
  },
  S: function(t) {
    return Be(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, a, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return Be(t.getFullYear(), 4);
  },
  d: function(t) {
    return Be(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return Be(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, a) {
    return a.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return Be(t.getMonth() + 1);
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
}, Kt = function(t) {
  var a = t.config, e = a === void 0 ? ut : a, h = t.l10n, l = h === void 0 ? yt : h, d = t.isMobile, v = d === void 0 ? !1 : d;
  return function(i, g, k) {
    var s = k || l;
    return e.formatDate !== void 0 && !v ? e.formatDate(i, g, s) : g.split("").map(function(w, y, m) {
      return xt[w] && m[y - 1] !== "\\" ? xt[w](i, s, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, zt = function(t) {
  var a = t.config, e = a === void 0 ? ut : a, h = t.l10n, l = h === void 0 ? yt : h;
  return function(d, v, i, g) {
    if (!(d !== 0 && !d)) {
      var k = g || l, s, w = d;
      if (d instanceof Date)
        s = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        s = new Date(d);
      else if (typeof d == "string") {
        var y = v || (e || ut).dateFormat, m = String(d).trim();
        if (m === "today")
          s = /* @__PURE__ */ new Date(), i = !0;
        else if (e && e.parseDate)
          s = e.parseDate(d, y);
        else if (/Z$/.test(m) || /GMT$/.test(m))
          s = new Date(d);
        else {
          for (var M = void 0, j = [], X = 0, re = 0, D = ""; X < y.length; X++) {
            var _ = y[X], S = _ === "\\", ne = y[X - 1] === "\\" || S;
            if (nt[_] && !ne) {
              D += nt[_];
              var N = new RegExp(D).exec(d);
              N && (M = !0) && j[_ !== "Y" ? "push" : "unshift"]({
                fn: Vo[_],
                val: N[++re]
              });
            } else S || (D += ".");
          }
          s = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), j.forEach(function(z) {
            var R = z.fn, ie = z.val;
            return s = R(s, ie, k) || s;
          }), s = M ? s : void 0;
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
function ze(t, a, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(a.getTime()).setHours(0, 0, 0, 0) : t.getTime() - a.getTime();
}
var Yo = function(t, a, e) {
  return t > Math.min(a, e) && t < Math.max(a, e);
}, Tt = function(t, a, e) {
  return t * 3600 + a * 60 + e;
}, Ro = function(t) {
  var a = Math.floor(t / 3600), e = (t - a * 3600) / 60;
  return [a, e, t - a * 3600 - e * 60];
}, Wo = {
  DAY: 864e5
};
function It(t) {
  var a = t.defaultHour, e = t.defaultMinute, h = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), d = t.minDate.getMinutes(), v = t.minDate.getSeconds();
    a < l && (a = l), a === l && e < d && (e = d), a === l && e === d && h < v && (h = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var i = t.maxDate.getHours(), g = t.maxDate.getMinutes();
    a = Math.min(a, i), a === i && (e = Math.min(g, e)), a === i && e === g && (h = t.maxDate.getSeconds());
  }
  return { hours: a, minutes: e, seconds: h };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var a = [], e = 1; e < arguments.length; e++)
    a[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var h = function(i) {
    i && Object.keys(i).forEach(function(g) {
      return t[g] = i[g];
    });
  }, l = 0, d = a; l < d.length; l++) {
    var v = d[l];
    h(v);
  }
  return t;
});
var De = function() {
  return De = Object.assign || function(t) {
    for (var a, e = 1, h = arguments.length; e < h; e++) {
      a = arguments[e];
      for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (t[l] = a[l]);
    }
    return t;
  }, De.apply(this, arguments);
}, Vt = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var h = Array(t), l = 0, a = 0; a < e; a++)
    for (var d = arguments[a], v = 0, i = d.length; v < i; v++, l++)
      h[l] = d[v];
  return h;
}, Uo = 300;
function Ko(t, a) {
  var e = {
    config: De(De({}, ut), we.defaultConfig),
    l10n: yt
  };
  e.parseDate = zt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = j, e._setHoursFromDate = y, e._positionCalendar = Je, e.changeMonth = Q, e.changeYear = me, e.clear = U, e.close = Y, e.onMouseOver = Fe, e._createElement = se, e.createDay = N, e.destroy = ue, e.isEnabled = $e, e.jumpToDate = D, e.updateValue = Ie, e.open = it, e.redraw = Mt, e.set = Ct, e.setDate = Dt, e.toggle = Ge;
  function h() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, je(), bt(), q(), ee(), h(), e.isMobile || ne(), re(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && y(e.config.noCalendar ? e.latestSelectedDateObj : void 0), Ie(!1)), i();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && Je(), de("onReady");
  }
  function d() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function v(n) {
    return n.bind(e);
  }
  function i() {
    var n = e.config;
    n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function() {
      if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
        var o = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = o + "px", e.calendarContainer.style.width = o + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function g(n) {
    if (e.selectedDates.length === 0) {
      var o = e.config.minDate === void 0 || ze(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = It(e.config);
      o.setHours(r.hours, r.minutes, r.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && qt(n);
    var p = e._input.value;
    w(), Ie(), e._input.value !== p && e._debouncedChange();
  }
  function k(n, o) {
    return n % 12 + 12 * Ne(o === e.l10n.amPM[1]);
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
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, o = (parseInt(e.minuteElement.value, 10) || 0) % 60, r = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = k(n, e.amPM.textContent));
      var p = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && ze(e.latestSelectedDateObj, e.config.minDate, !0) === 0, x = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && ze(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var $ = Tt(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), K = Tt(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), T = Tt(n, o, r);
        if (T > K && T < $) {
          var Z = Ro($);
          n = Z[0], o = Z[1], r = Z[2];
        }
      } else {
        if (x) {
          var E = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, E.getHours()), n === E.getHours() && (o = Math.min(o, E.getMinutes())), o === E.getMinutes() && (r = Math.min(r, E.getSeconds()));
        }
        if (p) {
          var P = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, P.getHours()), n === P.getHours() && o < P.getMinutes() && (o = P.getMinutes()), o === P.getMinutes() && (r = Math.max(r, P.getSeconds()));
        }
      }
      m(n, o, r);
    }
  }
  function y(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && m(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function m(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Be(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Ne(n % 12 === 0)), e.minuteElement.value = Be(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Ne(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Be(r)));
  }
  function M(n) {
    var o = Le(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && me(r);
  }
  function j(n, o, r, p) {
    if (o instanceof Array)
      return o.forEach(function(x) {
        return j(n, x, r, p);
      });
    if (n instanceof Array)
      return n.forEach(function(x) {
        return j(x, o, r, p);
      });
    n.addEventListener(o, r, p), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, p);
      }
    });
  }
  function X() {
    de("onChange");
  }
  function re() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(p) {
        return j(p, "click", e[r]);
      });
    }), e.isMobile) {
      Te();
      return;
    }
    var n = Pt(vt, 50);
    if (e._debouncedChange = Pt(X, Uo), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && j(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Fe(Le(r));
    }), j(e._input, "keydown", Ze), e.calendarContainer !== void 0 && j(e.calendarContainer, "keydown", Ze), !e.config.inline && !e.config.static && j(window, "resize", n), window.ontouchstart !== void 0 ? j(window.document, "touchstart", Me) : j(window.document, "mousedown", Me), j(window.document, "focus", Me, { capture: !0 }), e.config.clickOpens === !0 && (j(e._input, "focus", e.open), j(e._input, "click", e.open)), e.daysContainer !== void 0 && (j(e.monthNav, "click", dt), j(e.monthNav, ["keyup", "increment"], M), j(e.daysContainer, "click", wt)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return Le(r).select();
      };
      j(e.timeContainer, ["increment"], g), j(e.timeContainer, "blur", g, { capture: !0 }), j(e.timeContainer, "click", _), j([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && j(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && j(e.amPM, "click", function(r) {
        g(r);
      });
    }
    e.config.allowInput && j(e._input, "blur", Ye);
  }
  function D(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), p = e.currentYear, x = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch ($) {
      $.message = "Invalid date supplied: " + r, e.config.errorHandler($);
    }
    o && e.currentYear !== p && (de("onYearChange"), ae()), o && (e.currentYear !== p || e.currentMonth !== x) && de("onMonthChange"), e.redraw();
  }
  function _(n) {
    var o = Le(n);
    ~o.className.indexOf("arrow") && S(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function S(n, o, r) {
    var p = n && Le(n), x = r || p && p.parentNode && p.parentNode.firstChild, $ = Re("increment");
    $.delta = o, x && x.dispatchEvent($);
  }
  function ne() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = se("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(ye()), e.innerContainer = se("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = L(), r = o.weekWrapper, p = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = p, e.weekWrapper = r;
      }
      e.rContainer = se("div", "flatpickr-rContainer"), e.rContainer.appendChild(O()), e.daysContainer || (e.daysContainer = se("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), G(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(he()), _e(e.calendarContainer, "rangeMode", e.config.mode === "range"), _e(e.calendarContainer, "animate", e.config.animate === !0), _e(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var x = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!x && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var $ = se("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore($, e.element), $.appendChild(e.element), e.altInput && $.appendChild(e.altInput), $.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function N(n, o, r, p) {
    var x = $e(o, !0), $ = se("span", n, o.getDate().toString());
    return $.dateObj = o, $.$i = p, $.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && ze(o, e.now) === 0 && (e.todayDateElem = $, $.classList.add("today"), $.setAttribute("aria-current", "date")), x ? ($.tabIndex = -1, Ue(o) && ($.classList.add("selected"), e.selectedDateElem = $, e.config.mode === "range" && (_e($, "startRange", e.selectedDates[0] && ze(o, e.selectedDates[0], !0) === 0), _e($, "endRange", e.selectedDates[1] && ze(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && $.classList.add("inRange")))) : $.classList.add("flatpickr-disabled"), e.config.mode === "range" && Oe(o) && !Ue(o) && $.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && p % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), de("onDayCreate", $), $;
  }
  function z(n) {
    n.focus(), e.config.mode === "range" && Fe(n);
  }
  function R(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, p = o; p != r; p += n)
      for (var x = e.daysContainer.children[p], $ = n > 0 ? 0 : x.children.length - 1, K = n > 0 ? x.children.length : -1, T = $; T != K; T += n) {
        var Z = x.children[T];
        if (Z.className.indexOf("hidden") === -1 && $e(Z.dateObj))
          return Z;
      }
  }
  function ie(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, p = o > 0 ? e.config.showMonths : -1, x = o > 0 ? 1 : -1, $ = r - e.currentMonth; $ != p; $ += x)
      for (var K = e.daysContainer.children[$], T = r - e.currentMonth === $ ? n.$i + o : o < 0 ? K.children.length - 1 : 0, Z = K.children.length, E = T; E >= 0 && E < Z && E != (o > 0 ? Z : -1); E += x) {
        var P = K.children[E];
        if (P.className.indexOf("hidden") === -1 && $e(P.dateObj) && Math.abs(n.$i - E) >= Math.abs(o))
          return z(P);
      }
    e.changeMonth(x), H(R(x), 0);
  }
  function H(n, o) {
    var r = d(), p = Se(r || document.body), x = n !== void 0 ? n : p ? r : e.selectedDateElem !== void 0 && Se(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Se(e.todayDateElem) ? e.todayDateElem : R(o > 0 ? 1 : -1);
    x === void 0 ? e._input.focus() : p ? ie(x, o) : z(x);
  }
  function W(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, p = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), x = e.utils.getDaysInMonth(o, n), $ = window.document.createDocumentFragment(), K = e.config.showMonths > 1, T = K ? "prevMonthDay hidden" : "prevMonthDay", Z = K ? "nextMonthDay hidden" : "nextMonthDay", E = p + 1 - r, P = 0; E <= p; E++, P++)
      $.appendChild(N("flatpickr-day " + T, new Date(n, o - 1, E), E, P));
    for (E = 1; E <= x; E++, P++)
      $.appendChild(N("flatpickr-day", new Date(n, o, E), E, P));
    for (var fe = x + 1; fe <= 42 - r && (e.config.showMonths === 1 || P % 7 !== 0); fe++, P++)
      $.appendChild(N("flatpickr-day " + Z, new Date(n, o + 1, fe % x), fe, P));
    var We = se("div", "dayContainer");
    return We.appendChild($), We;
  }
  function G() {
    if (e.daysContainer !== void 0) {
      $t(e.daysContainer), e.weekNumbers && $t(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(W(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Fe();
    }
  }
  function ae() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(p) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && p < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && p > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = se("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = _t(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function Ce() {
    var n = se("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = se("span", "cur-month") : (e.monthsDropdownContainer = se("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), j(e.monthsDropdownContainer, "change", function(K) {
      var T = Le(K), Z = parseInt(T.value, 10);
      e.changeMonth(Z - e.currentMonth), de("onMonthChange");
    }), ae(), r = e.monthsDropdownContainer);
    var p = St("cur-year", { tabindex: "-1" }), x = p.getElementsByTagName("input")[0];
    x.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && x.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (x.setAttribute("max", e.config.maxDate.getFullYear().toString()), x.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var $ = se("div", "flatpickr-current-month");
    return $.appendChild(r), $.appendChild(p), o.appendChild($), n.appendChild(o), {
      container: n,
      yearElement: x,
      monthElement: r
    };
  }
  function Ee() {
    $t(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = Ce();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function ye() {
    return e.monthNav = se("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = se("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = se("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, Ee(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (_e(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (_e(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], tt(), e.monthNav;
  }
  function he() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = It(e.config);
    e.timeContainer = se("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = se("span", "flatpickr-time-separator", ":"), r = St("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var p = St("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = p.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Be(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : s(n.hours)), e.minuteElement.value = Be(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(p), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var x = St("flatpickr-second");
      e.secondElement = x.getElementsByTagName("input")[0], e.secondElement.value = Be(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(se("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(x);
    }
    return e.config.time_24hr || (e.amPM = se("span", "flatpickr-am-pm", e.l10n.amPM[Ne((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function O() {
    e.weekdayContainer ? $t(e.weekdayContainer) : e.weekdayContainer = se("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = se("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return C(), e.weekdayContainer;
  }
  function C() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = Vt(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = Vt(o.splice(n, o.length), o.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + o.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function L() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = se("div", "flatpickr-weekwrapper");
    n.appendChild(se("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = se("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function Q(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, de("onYearChange"), ae()), G(), de("onMonthChange"), tt());
  }
  function U(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = It(e.config), p = r.hours, x = r.minutes, $ = r.seconds;
      m(p, x, $);
    }
    e.redraw(), n && de("onChange");
  }
  function Y() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), de("onClose");
  }
  function ue() {
    e.config !== void 0 && de("onDestroy");
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
  function oe(n) {
    return e.calendarContainer.contains(n);
  }
  function Me(n) {
    if (e.isOpen && !e.config.inline) {
      var o = Le(n), r = oe(o), p = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), x = !p && !r && !oe(n.relatedTarget), $ = !e.config.ignoredFocusElements.some(function(K) {
        return K.contains(o);
      });
      x && $ && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && g(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function me(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), de("onYearChange"), ae());
    }
  }
  function $e(n, o) {
    var r;
    o === void 0 && (o = !0);
    var p = e.parseDate(n, void 0, o);
    if (e.config.minDate && p && ze(p, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && p && ze(p, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (p === void 0)
      return !1;
    for (var x = !!e.config.enable, $ = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, K = 0, T = void 0; K < $.length; K++) {
      if (T = $[K], typeof T == "function" && T(p))
        return x;
      if (T instanceof Date && p !== void 0 && T.getTime() === p.getTime())
        return x;
      if (typeof T == "string") {
        var Z = e.parseDate(T, void 0, !0);
        return Z && Z.getTime() === p.getTime() ? x : !x;
      } else if (typeof T == "object" && p !== void 0 && T.from && T.to && p.getTime() >= T.from.getTime() && p.getTime() <= T.to.getTime())
        return x;
    }
    return !x;
  }
  function Se(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Ye(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== qe();
    o && r && !(n.relatedTarget && oe(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ze(n) {
    var o = Le(n), r = e.config.wrap ? t.contains(o) : o === e._input, p = e.config.allowInput, x = e.isOpen && (!p || !r), $ = e.config.inline && r && !p;
    if (n.keyCode === 13 && r) {
      if (p)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (oe(o) || x || $) {
      var K = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          K ? (n.preventDefault(), g(), lt()) : wt(n);
          break;
        case 27:
          n.preventDefault(), lt();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!K && !r) {
            n.preventDefault();
            var T = d();
            if (e.daysContainer !== void 0 && (p === !1 || T && Se(T))) {
              var Z = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), Q(Z), H(R(1), 0)) : H(void 0, Z);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var E = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), me(e.currentYear - E), H(R(1), 0)) : K || H(void 0, E * 7) : o === e.currentYearElement ? me(e.currentYear - E) : e.config.enableTime && (!K && e.hourElement && e.hourElement.focus(), g(n), e._debouncedChange());
          break;
        case 9:
          if (K) {
            var P = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Ae) {
              return Ae;
            }), fe = P.indexOf(o);
            if (fe !== -1) {
              var We = P[fe + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (We || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(o) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && o === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], w(), Ie();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], w(), Ie();
          break;
      }
    (r || oe(o)) && de("onKeyDown", n);
  }
  function Fe(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), p = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), x = Math.min(r, e.selectedDates[0].getTime()), $ = Math.max(r, e.selectedDates[0].getTime()), K = !1, T = 0, Z = 0, E = x; E < $; E += Wo.DAY)
        $e(new Date(E), !0) || (K = K || E > x && E < $, E < p && (!T || E > T) ? T = E : E > p && (!Z || E < Z) && (Z = E));
      var P = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      P.forEach(function(fe) {
        var We = fe.dateObj, Ae = We.getTime(), kt = T > 0 && Ae < T || Z > 0 && Ae > Z;
        if (kt) {
          fe.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(ct) {
            fe.classList.remove(ct);
          });
          return;
        } else if (K && !kt)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(ct) {
          fe.classList.remove(ct);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), p < r && Ae === p ? fe.classList.add("startRange") : p > r && Ae === p && fe.classList.add("endRange"), Ae >= T && (Z === 0 || Ae <= Z) && Yo(Ae, p, r) && fe.classList.add("inRange"));
      });
    }
  }
  function vt() {
    e.isOpen && !e.config.static && !e.config.inline && Je();
  }
  function it(n, o) {
    if (o === void 0 && (o = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = Le(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), de("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var p = e.isOpen;
    e.isOpen = !0, p || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), de("onOpen"), Je(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function Ve(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), p = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(x) {
        return $e(x);
      }), !e.selectedDates.length && n === "min" && y(r), Ie()), e.daysContainer && (Mt(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!p && r !== void 0 && p.getFullYear() === r.getFullYear());
    };
  }
  function je() {
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
    ], o = De(De({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(P) {
        e.config._enable = J(P);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(P) {
        e.config._disable = J(P);
      }
    });
    var p = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || p)) {
      var x = we.defaultConfig.dateFormat || ut.dateFormat;
      r.dateFormat = o.noCalendar || p ? "H:i" + (o.enableSeconds ? ":S" : "") : x + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || p) && !o.altFormat) {
      var $ = we.defaultConfig.altFormat || ut.altFormat;
      r.altFormat = o.noCalendar || p ? "h:i" + (o.enableSeconds ? ":S K" : " K") : $ + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: Ve("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: Ve("max")
    });
    var K = function(P) {
      return function(fe) {
        e.config[P === "min" ? "_minTime" : "_maxTime"] = e.parseDate(fe, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: K("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: K("max")
    }), o.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, o);
    for (var T = 0; T < n.length; T++)
      e.config[n[T]] = e.config[n[T]] === !0 || e.config[n[T]] === "true";
    Et.filter(function(P) {
      return e.config[P] !== void 0;
    }).forEach(function(P) {
      e.config[P] = jt(e.config[P] || []).map(v);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var T = 0; T < e.config.plugins.length; T++) {
      var Z = e.config.plugins[T](e) || {};
      for (var E in Z)
        Et.indexOf(E) > -1 ? e.config[E] = jt(Z[E]).map(v).concat(e.config[E]) : typeof o[E] > "u" && (e.config[E] = Z[E]);
    }
    o.altInputClass || (e.config.altInputClass = mt().className + " " + e.config.altInputClass), de("onParseConfig");
  }
  function mt() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function bt() {
    typeof e.config.locale != "object" && typeof we.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = De(De({}, we.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? we.l10ns[e.config.locale] : void 0), nt.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", nt.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", nt.M = "(" + e.l10n.months.shorthand.join("|") + ")", nt.F = "(" + e.l10n.months.longhand.join("|") + ")", nt.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = De(De({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && we.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Kt(e), e.parseDate = zt({ config: e.config, l10n: e.l10n });
  }
  function Je(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      de("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(on, an) {
        return on + an.offsetHeight;
      }, 0), p = e.calendarContainer.offsetWidth, x = e.config.position.split(" "), $ = x[0], K = x.length > 1 ? x[1] : null, T = o.getBoundingClientRect(), Z = window.innerHeight - T.bottom, E = $ === "above" || $ !== "below" && Z < r && T.top > r, P = window.pageYOffset + T.top + (E ? -r - 2 : o.offsetHeight + 2);
      if (_e(e.calendarContainer, "arrowTop", !E), _e(e.calendarContainer, "arrowBottom", E), !e.config.inline) {
        var fe = window.pageXOffset + T.left, We = !1, Ae = !1;
        K === "center" ? (fe -= (p - T.width) / 2, We = !0) : K === "right" && (fe -= p - T.width, Ae = !0), _e(e.calendarContainer, "arrowLeft", !We && !Ae), _e(e.calendarContainer, "arrowCenter", We), _e(e.calendarContainer, "arrowRight", Ae);
        var kt = window.document.body.offsetWidth - (window.pageXOffset + T.right), ct = fe + p > window.document.body.offsetWidth, Zt = kt + p > window.document.body.offsetWidth;
        if (_e(e.calendarContainer, "rightMost", ct), !e.config.static)
          if (e.calendarContainer.style.top = P + "px", !ct)
            e.calendarContainer.style.left = fe + "px", e.calendarContainer.style.right = "auto";
          else if (!Zt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = kt + "px";
          else {
            var Ht = Xe();
            if (Ht === void 0)
              return;
            var Jt = window.document.body.offsetWidth, Xt = Math.max(0, Jt / 2 - p / 2), Qt = ".flatpickr-calendar.centerMost:before", en = ".flatpickr-calendar.centerMost:after", tn = Ht.cssRules.length, nn = "{left:" + T.left + "px;right:auto;}";
            _e(e.calendarContainer, "rightMost", !1), _e(e.calendarContainer, "centerMost", !0), Ht.insertRule(Qt + "," + en + nn, tn), e.calendarContainer.style.left = Xt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function Xe() {
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
    return n ?? st();
  }
  function st() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function Mt() {
    e.config.noCalendar || e.isMobile || (ae(), tt(), G());
  }
  function lt() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function wt(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(P) {
      return P.classList && P.classList.contains("flatpickr-day") && !P.classList.contains("flatpickr-disabled") && !P.classList.contains("notAllowed");
    }, r = Ut(Le(n), o);
    if (r !== void 0) {
      var p = r, x = e.latestSelectedDateObj = new Date(p.dateObj.getTime()), $ = (x.getMonth() < e.currentMonth || x.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = p, e.config.mode === "single")
        e.selectedDates = [x];
      else if (e.config.mode === "multiple") {
        var K = Ue(x);
        K ? e.selectedDates.splice(parseInt(K), 1) : e.selectedDates.push(x);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = x, e.selectedDates.push(x), ze(x, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(P, fe) {
        return P.getTime() - fe.getTime();
      }));
      if (w(), $) {
        var T = e.currentYear !== x.getFullYear();
        e.currentYear = x.getFullYear(), e.currentMonth = x.getMonth(), T && (de("onYearChange"), ae()), de("onMonthChange");
      }
      if (tt(), G(), Ie(), !$ && e.config.mode !== "range" && e.config.showMonths === 1 ? z(p) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var Z = e.config.mode === "single" && !e.config.enableTime, E = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (Z || E) && lt();
      }
      X();
    }
  }
  var Qe = {
    locale: [bt, C],
    showMonths: [Ee, i, O],
    minDate: [D],
    maxDate: [D],
    positionElement: [be],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (j(e._input, "focus", e.open), j(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function Ct(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        Qe[r] !== void 0 && Qe[r].forEach(function(p) {
          return p();
        });
    } else
      e.config[n] = o, Qe[n] !== void 0 ? Qe[n].forEach(function(p) {
        return p();
      }) : Et.indexOf(n) > -1 && (e.config[n] = jt(o));
    e.redraw(), Ie(!0);
  }
  function et(n, o) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(p) {
        return e.parseDate(p, o);
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
          r = n.split(e.config.conjunction).map(function(p) {
            return e.parseDate(p, o);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(p) {
            return e.parseDate(p, o);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(p) {
      return p instanceof Date && $e(p, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(p, x) {
      return p.getTime() - x.getTime();
    });
  }
  function Dt(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    et(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), D(void 0, o), y(), e.selectedDates.length === 0 && e.clear(!1), Ie(o), o && de("onChange");
  }
  function J(n) {
    return n.slice().map(function(o) {
      return typeof o == "string" || typeof o == "number" || o instanceof Date ? e.parseDate(o, void 0, !0) : o && typeof o == "object" && o.from && o.to ? {
        from: e.parseDate(o.from, void 0),
        to: e.parseDate(o.to, void 0)
      } : o;
    }).filter(function(o) {
      return o;
    });
  }
  function ee() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && et(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function q() {
    if (e.input = mt(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = se(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), be();
  }
  function be() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function Te() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = se("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    j(e.mobileInput, "change", function(o) {
      e.setDate(Le(o).value, !1, e.mobileFormatStr), de("onChange"), de("onClose");
    });
  }
  function Ge(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function de(n, o) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var p = 0; r[p] && p < r.length; p++)
          r[p](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(Re("change")), e.input.dispatchEvent(Re("input")));
    }
  }
  function Re(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function Ue(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var r = e.selectedDates[o];
      if (r instanceof Date && ze(r, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function Oe(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : ze(n, e.selectedDates[0]) >= 0 && ze(n, e.selectedDates[1]) <= 0;
  }
  function tt() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = _t(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function qe(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, o);
    }).filter(function(r, p, x) {
      return e.config.mode !== "range" || e.config.enableTime || x.indexOf(r) === p;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function Ie(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = qe(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = qe(e.config.altFormat)), n !== !1 && de("onValueUpdate");
  }
  function dt(n) {
    var o = Le(n), r = e.prevMonthNav.contains(o), p = e.nextMonthNav.contains(o);
    r || p ? Q(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function qt(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = Le(n), p = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[Ne(e.amPM.textContent === e.l10n.amPM[0])]);
    var x = parseFloat(p.getAttribute("min")), $ = parseFloat(p.getAttribute("max")), K = parseFloat(p.getAttribute("step")), T = parseInt(p.value, 10), Z = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), E = T + K * Z;
    if (typeof p.value < "u" && p.value.length === 2) {
      var P = p === e.hourElement, fe = p === e.minuteElement;
      E < x ? (E = $ + E + Ne(!P) + (Ne(P) && Ne(!e.amPM)), fe && S(void 0, -1, e.hourElement)) : E > $ && (E = p === e.hourElement ? E - $ - Ne(!e.amPM) : x, fe && S(void 0, 1, e.hourElement)), e.amPM && P && (K === 1 ? E + T === 23 : Math.abs(E - T) > K) && (e.amPM.textContent = e.l10n.amPM[Ne(e.amPM.textContent === e.l10n.amPM[0])]), p.value = Be(E);
    }
  }
  return l(), e;
}
function ft(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(v) {
    return v instanceof HTMLElement;
  }), h = [], l = 0; l < e.length; l++) {
    var d = e[l];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Ko(d, a || {}), h.push(d._flatpickr);
    } catch (v) {
      console.error(v);
    }
  }
  return h.length === 1 ? h[0] : h;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return ft(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return ft([this], t);
});
var we = function(t, a) {
  return typeof t == "string" ? ft(window.document.querySelectorAll(t), a) : t instanceof Node ? ft([t], a) : ft(t, a);
};
we.defaultConfig = {};
we.l10ns = {
  en: De({}, yt),
  default: De({}, yt)
};
we.localize = function(t) {
  we.l10ns.default = De(De({}, we.l10ns.default), t);
};
we.setDefaults = function(t) {
  we.defaultConfig = De(De({}, we.defaultConfig), t);
};
we.parseDate = zt({});
we.formatDate = Kt({});
we.compareDates = ze;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return ft(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = we);
var Go = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Gt = { exports: {} };
(function(t, a) {
  (function(e, h) {
    t.exports = h();
  })(Go, function() {
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
      return e = Object.assign || function(k) {
        for (var s, w = 1, y = arguments.length; w < y; w++) {
          s = arguments[w];
          for (var m in s) Object.prototype.hasOwnProperty.call(s, m) && (k[m] = s[m]);
        }
        return k;
      }, e.apply(this, arguments);
    }, h = function(g, k, s) {
      return s.months[k ? "shorthand" : "longhand"][g];
    };
    function l(g) {
      for (; g.firstChild; )
        g.removeChild(g.firstChild);
    }
    function d(g) {
      try {
        if (typeof g.composedPath == "function") {
          var k = g.composedPath();
          return k[0];
        }
        return g.target;
      } catch {
        return g.target;
      }
    }
    var v = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function i(g) {
      var k = e(e({}, v), g);
      return function(s) {
        s.config.dateFormat = k.dateFormat, s.config.altFormat = k.altFormat;
        var w = { monthsContainer: null };
        function y() {
          if (s.rContainer) {
            l(s.rContainer);
            for (var H = 0; H < s.monthElements.length; H++) {
              var W = s.monthElements[H];
              W.parentNode && W.parentNode.removeChild(W);
            }
          }
        }
        function m() {
          s.rContainer && (w.monthsContainer = s._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, M(), s.rContainer.appendChild(w.monthsContainer), s.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + k.theme));
        }
        function M() {
          if (w.monthsContainer) {
            l(w.monthsContainer);
            for (var H = document.createDocumentFragment(), W = 0; W < 12; W++) {
              var G = s.createDay("flatpickr-monthSelect-month", new Date(s.currentYear, W), 0, W);
              G.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && G.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && G.classList.add("today"), G.textContent = h(W, k.shorthand, s.l10n), G.addEventListener("click", D), H.appendChild(G);
            }
            w.monthsContainer.appendChild(H), s.config.minDate && s.currentYear === s.config.minDate.getFullYear() ? s.prevMonthNav.classList.add("flatpickr-disabled") : s.prevMonthNav.classList.remove("flatpickr-disabled"), s.config.maxDate && s.currentYear === s.config.maxDate.getFullYear() ? s.nextMonthNav.classList.add("flatpickr-disabled") : s.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function j() {
          s._bind(s.prevMonthNav, "click", function(H) {
            H.preventDefault(), H.stopPropagation(), s.changeYear(s.currentYear - 1), re(), M();
          }), s._bind(s.nextMonthNav, "click", function(H) {
            H.preventDefault(), H.stopPropagation(), s.changeYear(s.currentYear + 1), re(), M();
          }), s._bind(w.monthsContainer, "mouseover", function(H) {
            s.config.mode === "range" && s.onMouseOver(d(H), "flatpickr-monthSelect-month");
          });
        }
        function X() {
          if (s.rContainer && s.selectedDates.length) {
            for (var H = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), W = 0; W < H.length; W++)
              H[W].classList.remove("selected");
            var G = s.selectedDates[0].getMonth(), ae = s.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (G + 1) + ")");
            ae && ae.classList.add("selected");
          }
        }
        function re() {
          var H = s.selectedDates[0];
          if (H && (H = new Date(H), H.setFullYear(s.currentYear), s.config.minDate && H < s.config.minDate && (H = s.config.minDate), s.config.maxDate && H > s.config.maxDate && (H = s.config.maxDate), s.currentYear = H.getFullYear()), s.currentYearElement.value = String(s.currentYear), s.rContainer) {
            var W = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            W.forEach(function(G) {
              G.dateObj.setFullYear(s.currentYear), s.config.minDate && G.dateObj < s.config.minDate || s.config.maxDate && G.dateObj > s.config.maxDate ? G.classList.add("flatpickr-disabled") : G.classList.remove("flatpickr-disabled");
            });
          }
          X();
        }
        function D(H) {
          H.preventDefault(), H.stopPropagation();
          var W = d(H);
          if (W instanceof Element && !W.classList.contains("flatpickr-disabled") && !W.classList.contains("notAllowed") && (_(W.dateObj), s.config.closeOnSelect)) {
            var G = s.config.mode === "single", ae = s.config.mode === "range" && s.selectedDates.length === 2;
            (G || ae) && s.close();
          }
        }
        function _(H) {
          var W = new Date(s.currentYear, H.getMonth(), H.getDate()), G = [];
          switch (s.config.mode) {
            case "single":
              G = [W];
              break;
            case "multiple":
              G.push(W);
              break;
            case "range":
              s.selectedDates.length === 2 ? G = [W] : (G = s.selectedDates.concat([W]), G.sort(function(ae, Ce) {
                return ae.getTime() - Ce.getTime();
              }));
              break;
          }
          s.setDate(G, !0), X();
        }
        var S = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ne(H, W, G, ae) {
          var Ce = S[ae.keyCode] !== void 0;
          if (!(!Ce && ae.keyCode !== 13) && !(!s.rContainer || !w.monthsContainer)) {
            var Ee = s.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), ye = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (ye === -1) {
              var he = Ee || w.monthsContainer.firstElementChild;
              he.focus(), ye = he.$i;
            }
            Ce ? w.monthsContainer.children[(12 + ye + S[ae.keyCode]) % 12].focus() : ae.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && _(document.activeElement.dateObj);
          }
        }
        function N() {
          var H;
          ((H = s.config) === null || H === void 0 ? void 0 : H.mode) === "range" && s.selectedDates.length === 1 && s.clear(!1), s.selectedDates.length || M();
        }
        function z() {
          k._stubbedCurrentMonth = s._initialDate.getMonth(), s._initialDate.setMonth(k._stubbedCurrentMonth), s.currentMonth = k._stubbedCurrentMonth;
        }
        function R() {
          k._stubbedCurrentMonth && (s._initialDate.setMonth(k._stubbedCurrentMonth), s.currentMonth = k._stubbedCurrentMonth, delete k._stubbedCurrentMonth);
        }
        function ie() {
          if (w.monthsContainer !== null)
            for (var H = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), W = 0; W < H.length; W++)
              H[W].removeEventListener("click", D);
        }
        return {
          onParseConfig: function() {
            s.config.enableTime = !1;
          },
          onValueUpdate: X,
          onKeyDown: ne,
          onReady: [
            z,
            y,
            m,
            j,
            X,
            function() {
              s.config.onClose.push(N), s.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            R,
            ie,
            function() {
              s.config.onClose = s.config.onClose.filter(function(H) {
                return H !== N;
              });
            }
          ]
        };
      };
    }
    return i;
  });
})(Gt);
var Zo = Gt.exports;
const Jo = /* @__PURE__ */ qo(Zo), Xo = { class: "relative" }, Qo = ["placeholder", "disabled", "readonly"], ea = ["aria-label"], ta = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-4 w-4",
  "aria-hidden": "true"
}, na = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-4 w-4",
  "aria-hidden": "true"
}, oa = {
  key: 2,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, aa = { class: "flex items-center justify-between mb-2" }, ra = { class: "text-xs opacity-70" }, ia = { class: "grid grid-cols-4 gap-2" }, sa = ["onClick"], Ar = /* @__PURE__ */ ce({
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
    inputClass: { default: "" },
    clearable: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue"],
  setup(t, { emit: a }) {
    const e = t, h = a, l = F(null), d = F(!1), v = F((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let i = null;
    const g = b(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), k = b(() => e.displayFormat ? e.displayFormat : e.picker === "month" ? "M" : g.value), s = b(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), w = b(() => e.picker !== "year-grid" ? {} : { value: s.value }), y = b(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), m = b(
      () => e.clearable && y.value && !e.disabled && !e.readonly
    ), M = b(() => !e.disabled), j = b(() => m.value && M.value ? "pr-16" : m.value || M.value ? "pr-9" : ""), X = () => {
      var N;
      if (e.mode === "range" ? h("update:modelValue", []) : h("update:modelValue", ""), e.picker === "year-grid") {
        d.value = !1;
        return;
      }
      (N = i == null ? void 0 : i.clear) == null || N.call(i, !1);
    }, re = () => {
      var N, z;
      if (l.value) {
        if (e.picker === "year-grid") {
          (N = i == null ? void 0 : i.destroy) == null || N.call(i), i = null;
          return;
        }
        (z = i == null ? void 0 : i.destroy) == null || z.call(i), i = we(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Jo({
              shorthand: !0,
              dateFormat: g.value,
              altFormat: k.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: g.value,
          altInput: !!e.displayFormat || e.picker === "month",
          altFormat: k.value,
          time_24hr: e.time24hr,
          clickOpens: !0,
          allowInput: !1,
          appendTo: document.body,
          minDate: e.minDate || void 0,
          maxDate: e.maxDate || void 0,
          defaultDate: e.modelValue,
          onReady: () => {
            var R, ie;
            e.picker === "month" && ((R = i == null ? void 0 : i.calendarContainer) == null || R.classList.add("flatpickr-month-only")), e.picker === "year" && ((ie = i == null ? void 0 : i.calendarContainer) == null || ie.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var R, ie;
            e.picker === "month" && ((R = i == null ? void 0 : i.calendarContainer) == null || R.classList.add("flatpickr-month-only")), e.picker === "year" && ((ie = i == null ? void 0 : i.calendarContainer) == null || ie.classList.add("flatpickr-year-only"));
          },
          onChange: (R) => {
            if (e.mode === "range") {
              const ie = R.map(
                (H) => i.formatDate(H, g.value)
              );
              h("update:modelValue", ie);
            } else {
              const ie = R[0] ? i.formatDate(R[0], g.value) : "";
              h("update:modelValue", ie);
            }
          }
        });
      }
    }, D = () => {
      var N;
      if (!e.disabled) {
        if (e.picker === "year-grid") {
          d.value = !0;
          return;
        }
        (N = i == null ? void 0 : i.open) == null || N.call(i);
      }
    };
    pt(re), rt(() => {
      var N;
      return (N = i == null ? void 0 : i.destroy) == null ? void 0 : N.call(i);
    }), ve(
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
      re
    ), ve(
      () => e.modelValue,
      (N) => {
        !i || e.picker === "year-grid" || i.setDate(N, !1);
      }
    );
    const _ = b(
      () => Array.from({ length: 12 }, (N, z) => v.value + z)
    ), S = (N) => {
      h("update:modelValue", N.toString()), d.value = !1;
    }, ne = (N) => {
      if (!d.value) return;
      const z = N.target;
      if (l.value && z && l.value.contains(z)) return;
      const R = document.querySelector(".mitreka-year-grid");
      R && z && R.contains(z) || (d.value = !1);
    };
    return pt(() => document.addEventListener("click", ne)), rt(() => document.removeEventListener("click", ne)), (N, z) => (c(), f("div", Xo, [
      u("input", Ft({
        ref_key: "inputEl",
        ref: l,
        class: ["input w-full", [t.inputClass, j.value]],
        placeholder: t.placeholder
      }, w.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: D,
        onFocus: D
      }), null, 16, Qo),
      M.value ? (c(), f("button", {
        key: 0,
        type: "button",
        class: B([
          "absolute top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
          m.value ? "right-8" : "right-2"
        ]),
        "aria-label": t.noCalendar ? "Open time picker" : "Open date picker",
        onMousedown: z[0] || (z[0] = te(() => {
        }, ["prevent"])),
        onClick: te(D, ["stop"])
      }, [
        t.noCalendar ? (c(), f("svg", ta, [...z[4] || (z[4] = [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2"
          }, null, -1),
          u("circle", {
            cx: "12",
            cy: "12",
            r: "9"
          }, null, -1)
        ])])) : (c(), f("svg", na, [...z[5] || (z[5] = [
          u("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
          }, null, -1),
          u("line", {
            x1: "16",
            y1: "2",
            x2: "16",
            y2: "6"
          }, null, -1),
          u("line", {
            x1: "8",
            y1: "2",
            x2: "8",
            y2: "6"
          }, null, -1),
          u("line", {
            x1: "3",
            y1: "10",
            x2: "21",
            y2: "10"
          }, null, -1)
        ])]))
      ], 42, ea)) : I("", !0),
      m.value ? (c(), f("button", {
        key: 1,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: z[1] || (z[1] = te(() => {
        }, ["prevent"])),
        onClick: te(X, ["stop"])
      }, [...z[6] || (z[6] = [
        u("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "h-4 w-4",
          "aria-hidden": "true"
        }, [
          u("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 6l12 12M18 6L6 18"
          })
        ], -1)
      ])], 32)) : I("", !0),
      t.picker === "year-grid" && d.value ? (c(), f("div", oa, [
        u("div", aa, [
          u("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: z[2] || (z[2] = (R) => v.value -= 12)
          }, " Prev "),
          u("div", ra, A(v.value) + " - " + A(v.value + 11), 1),
          u("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: z[3] || (z[3] = (R) => v.value += 12)
          }, " Next ")
        ]),
        u("div", ia, [
          (c(!0), f(ke, null, He(_.value, (R) => (c(), f("button", {
            key: R,
            class: B(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === R.toString() }]),
            type: "button",
            onClick: (ie) => S(R)
          }, A(R), 11, sa))), 128))
        ])
      ])) : I("", !0)
    ]));
  }
}), Lr = /* @__PURE__ */ ce({
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
    const e = t, h = a, l = Rt(), d = F(null), v = F(null), i = F(13), g = F(!1);
    let k = null, s = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], y = [], m = F("normal"), M = b(() => [
      "w-full",
      m.value === "autoHeight" ? "h-auto" : "h-full"
    ]), j = b(() => m.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), X = () => {
      const C = document.documentElement, L = C.classList.contains("dark"), Q = (C.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      g.value = L || Q;
    }, re = b(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : g.value), D = b(() => re.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), _ = b(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), S = b(() => ["agx", D.value, _.value, l.class]), ne = b(() => [{ "--ag-odd-row-background-color": e.striped ? re.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), N = b(() => {
      const { class: C, style: L, onGridReady: Q, ...U } = l;
      return U;
    }), z = (C) => typeof C == "number" && Number.isFinite(C) ? C : void 0, R = b(() => {
      const C = l.gridOptions;
      if (C && typeof C == "object") return C;
      const L = l["grid-options"];
      return L && typeof L == "object" ? L : {};
    }), ie = (C) => {
      const L = z(l[C]);
      if (typeof L == "number") return L;
      const U = z(l[C === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof U == "number" ? U : z(R.value[C]);
    }, H = () => {
      const C = l.domLayout;
      if (typeof C == "string" && C.length > 0) return C;
      const L = l["dom-layout"];
      if (typeof L == "string" && L.length > 0) return L;
      const Q = R.value.domLayout;
      return typeof Q == "string" && Q.length > 0 ? Q : void 0;
    }, W = () => {
      var L, Q;
      if (!v.value) return 0;
      const C = (U) => typeof U == "number" && Number.isFinite(U) && U >= 0;
      if (typeof v.value.getDisplayedRowCount == "function") {
        const U = v.value.getDisplayedRowCount();
        if (C(U)) return U;
      }
      if (typeof v.value.paginationGetRowCount == "function") {
        const U = v.value.paginationGetRowCount();
        if (C(U)) return U;
      }
      if (typeof v.value.getModel == "function") {
        const U = (Q = (L = v.value).getModel) == null ? void 0 : Q.call(L), Y = U && typeof U.getRowCount == "function" ? U.getRowCount() : void 0;
        if (C(Y)) return Y;
      }
      return 0;
    }, G = () => {
      const C = Number(e.autoHeightThreshold);
      return Number.isFinite(C) ? Math.max(1, Math.floor(C)) : 15;
    }, ae = () => {
      if (!v.value) return;
      const C = H();
      if (C) {
        m.value = C, v.value.setGridOption("domLayout", C);
        return;
      }
      const L = e.autoHeightWhenFewRows && W() < G() ? "autoHeight" : "normal";
      m.value = L, v.value.setGridOption("domLayout", L);
    }, Ce = () => {
      var C;
      for (; y.length > 0; )
        (C = y.pop()) == null || C();
    }, Ee = () => {
      if (!v.value) return;
      Ce();
      const C = () => ae();
      w.forEach((L) => {
        v.value.addEventListener(L, C), y.push(() => {
          var Q;
          (Q = v.value) == null || Q.removeEventListener(L, C);
        });
      });
    }, ye = () => {
      if (!e.autoHeaderHeight || !v.value) return;
      const C = ie("headerHeight") ?? pn(e.density), L = ie("groupHeaderHeight") ?? gn(e.density);
      v.value.setGridOption("headerHeight", C), v.value.setGridOption("groupHeaderHeight", L);
    }, he = () => {
      if (!e.autoRowHeight || !v.value) return;
      const C = vn(i.value, e.density);
      v.value.setGridOption("rowHeight", C), v.value.setGridOption("getRowHeight", () => C), v.value.resetRowHeights();
    }, O = (C) => {
      v.value = C.api, i.value = mn(d.value), Ee(), ye(), ae(), he(), requestAnimationFrame(() => ae()), h("grid-ready", C);
    };
    return ve(
      () => e.density,
      () => {
        var C;
        ye(), he(), (C = v.value) == null || C.refreshCells({ force: !0 });
      }
    ), ve(
      () => [
        l.headerHeight,
        l["header-height"],
        l.groupHeaderHeight,
        l["group-header-height"],
        l.gridOptions,
        l["grid-options"]
      ],
      () => {
        ye();
      }
    ), ve(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        ae();
      }
    ), ve(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        ae();
      }
    ), ve(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => ae());
      }
    ), pt(() => {
      X(), e.autoObserveTheme && (k = new MutationObserver(X), k.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (s = hn(d.value));
    }), rt(() => {
      k == null || k.disconnect(), Ce(), s == null || s();
    }), (C, L) => (c(), f("div", {
      ref_key: "hostRef",
      ref: d,
      class: B(M.value),
      style: xe(j.value)
    }, [
      le(V(xn), Ft(N.value, {
        class: S.value,
        theme: "legacy",
        style: ne.value,
        onGridReady: O
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), la = ["disabled"], da = ["onMouseenter", "onClick", "aria-selected"], ca = 320, ua = 12, zr = /* @__PURE__ */ ce({
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
  setup(t, { emit: a }) {
    const e = t, h = a, l = F(null), d = F(null), v = F(null), i = F(!1), g = F(-1), k = F(0), s = F(0), w = F(0), y = F(240), m = F(null), M = F(!1), j = b(
      () => e.options.find((O) => O.value === e.modelValue) ?? null
    ), X = b(() => {
      var O;
      return ((O = j.value) == null ? void 0 : O.label) ?? e.placeholder;
    }), re = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, D = {
      default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
      primary: "bg-primary border-primary text-primary-content hover:brightness-95",
      secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
      accent: "bg-accent border-accent text-accent-content hover:brightness-95",
      info: "bg-info border-info text-info-content hover:brightness-95",
      success: "bg-success border-success text-success-content hover:brightness-95",
      warning: "bg-warning border-warning text-warning-content hover:brightness-95",
      error: "bg-error border-error text-error-content hover:brightness-95"
    }, _ = {
      default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
      primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
      secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
      accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
      info: "bg-transparent border-info text-info hover:bg-info/10",
      success: "bg-transparent border-success text-success hover:bg-success/10",
      warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
      error: "bg-transparent border-error text-error hover:bg-error/10"
    }, S = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, ne = b(() => {
      const O = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", C = re[e.size], L = e.variant === "outline" ? _[e.color] : D[e.color], Q = e.disabled ? "opacity-60 cursor-not-allowed" : "", U = i.value ? `ring-3 ${S[e.color]}` : "";
      return [O, C, L, Q, U].join(" ");
    }), N = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, z = b(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), R = (O) => {
      const C = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: C,
        backgroundColor: O ? "var(--color-base-200)" : "transparent"
      } : {
        color: C,
        backgroundColor: O ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, ie = b(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), H = b(() => ({
      top: `${k.value}px`,
      left: `${s.value}px`,
      width: `${w.value}px`
    })), W = b(() => ({
      maxHeight: `${y.value}px`
    })), G = () => {
      if (!i.value || !d.value || !v.value) return;
      const O = d.value.getBoundingClientRect(), C = window.innerWidth, L = window.innerHeight, Q = 6, U = ua, Y = v.value.scrollHeight || v.value.offsetHeight || 240;
      m.value == null && (m.value = Y);
      const ue = m.value, oe = L - O.bottom - Q - U, Me = O.top - Q - U, me = oe < 180 && Me > oe;
      M.value = me;
      const Se = Math.min(ca, ue, Math.max(0, me ? Me : oe));
      y.value = Math.max(64, Se), w.value = Math.max(160, O.width), s.value = Math.min(
        Math.max(O.left, U),
        C - w.value - U
      ), me ? k.value = Math.max(U, O.top - Q - y.value) : k.value = Math.min(
        L - U - y.value,
        O.bottom + Q
      );
    }, ae = () => {
      e.disabled || (i.value = !i.value, i.value && (g.value = e.options.findIndex((O) => O.value === e.modelValue), Pe(G)));
    }, Ce = (O) => {
      O.disabled || (h("update:modelValue", O.value), h("change", O.value), i.value = !1);
    }, Ee = (O) => {
      if (!e.disabled)
        switch (O.key) {
          case "Enter":
          case " ":
            if (O.preventDefault(), i.value && g.value >= 0) {
              const C = e.options[g.value];
              C && !C.disabled && Ce(C);
            } else
              ae();
            break;
          case "Escape":
            i.value = !1;
            break;
          case "ArrowDown":
            O.preventDefault(), i.value ? g.value = Math.min(g.value + 1, e.options.length - 1) : (i.value = !0, g.value = 0, Pe(G));
            break;
          case "ArrowUp":
            O.preventDefault(), i.value && (g.value = Math.max(g.value - 1, 0));
            break;
        }
    }, ye = (O) => {
      var U, Y;
      const C = O.target, L = !!((U = l.value) != null && U.contains(C)), Q = !!((Y = v.value) != null && Y.contains(C));
      !L && !Q && (i.value = !1);
    }, he = (O) => {
      var L;
      if (!i.value) return;
      const C = O == null ? void 0 : O.target;
      C && ((L = v.value) != null && L.contains(C)) || G();
    };
    return ve(
      () => [i.value, e.options.length],
      async ([O]) => {
        if (!O) {
          m.value = null;
          return;
        }
        await Pe(), G();
      }
    ), pt(() => {
      document.addEventListener("click", ye), window.addEventListener("resize", he), window.addEventListener("scroll", he, !0);
    }), rt(() => {
      document.removeEventListener("click", ye), window.removeEventListener("resize", he), window.removeEventListener("scroll", he, !0);
    }), (O, C) => (c(), f("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      u("button", {
        ref_key: "triggerRef",
        ref: d,
        type: "button",
        class: B(ne.value),
        disabled: t.disabled,
        onClick: ae,
        onKeydown: Ee
      }, [
        u("span", {
          class: B([j.value ? "" : "opacity-60"])
        }, A(X.value), 3),
        le(ge, {
          name: i.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, la),
      (c(), Ke(gt, { to: "body" }, [
        le(ot, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": M.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": M.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: at(() => [
            i.value ? (c(), f("div", {
              key: 0,
              ref_key: "menuRef",
              ref: v,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: xe([z.value, H.value])
            }, [
              u("ul", {
                class: "overflow-auto",
                style: xe(W.value),
                role: "listbox"
              }, [
                (c(!0), f(ke, null, He(t.options, (L, Q) => {
                  var U, Y, ue;
                  return c(), f("li", {
                    key: L.value,
                    class: B([
                      N[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      L.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((U = j.value) == null ? void 0 : U.value) === L.value ? "font-medium" : ""
                    ]),
                    style: xe(R(Q === g.value)),
                    onMouseenter: (oe) => g.value = Q,
                    onClick: (oe) => L.disabled ? null : Ce(L),
                    role: "option",
                    "aria-selected": ((Y = j.value) == null ? void 0 : Y.value) === L.value
                  }, [
                    u("span", null, A(L.label), 1),
                    ((ue = j.value) == null ? void 0 : ue.value) === L.value ? (c(), Ke(ge, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: xe(ie.value)
                    }, null, 8, ["style"])) : I("", !0)
                  ], 46, da);
                }), 128))
              ], 4)
            ], 4)) : I("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), fa = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, ha = ["disabled", "placeholder", "value", "readonly"], pa = ["disabled"], ga = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, va = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], ma = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, wa = 320, ka = 12, Fr = /* @__PURE__ */ ce({
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
  setup(t, { emit: a }) {
    const e = t, h = a, l = F(e.modelValue ?? null);
    ve(
      () => e.modelValue,
      (Y) => l.value = Y ?? null
    ), ve(l, (Y) => h("update:modelValue", Y));
    const {
      root: d,
      inputEl: v,
      menu: i,
      floating: g,
      open: k,
      query: s,
      hoverIdx: w,
      loading: y,
      filtered: m,
      selected: M,
      openMenu: j,
      closeMenu: X,
      choose: re,
      clear: D,
      onKey: _
    } = wn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), S = F(null), ne = F(null), N = F(0), z = F(0), R = F(0), ie = F(240), H = F(null), W = F(!1), G = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, ae = (Y) => !Y || Y === "default" ? "input" : `input input-${Y}`, Ce = b(
      () => {
        var Y;
        return k.value ? s.value : ((Y = M.value) == null ? void 0 : Y.label) ?? "";
      }
    ), Ee = b(() => ({
      top: `${N.value}px`,
      left: `${z.value}px`,
      width: `${R.value}px`
    })), ye = b(() => ({
      maxHeight: `${ie.value}px`
    })), he = () => {
      var Ve, je;
      if (!k.value || !S.value) return;
      const Y = S.value.getBoundingClientRect(), ue = window.innerWidth, oe = window.innerHeight, Me = 6, me = ka, $e = (((Ve = ne.value) == null ? void 0 : Ve.scrollHeight) ?? 0) || (((je = i.value) == null ? void 0 : je.scrollHeight) ?? 0) || 240;
      H.value == null && (H.value = $e);
      const Se = H.value, Ye = oe - Y.bottom - Me - me, Ze = Y.top - Me - me, Fe = Ye < 180 && Ze > Ye;
      W.value = Fe;
      const it = Math.min(wa, Se, Math.max(0, Fe ? Ze : Ye));
      ie.value = Math.max(64, it), R.value = Math.max(220, Y.width), z.value = Math.min(
        Math.max(Y.left, me),
        ue - R.value - me
      ), Fe ? N.value = Math.max(me, Y.top - Me - ie.value) : N.value = Math.min(
        oe - me - ie.value,
        Y.bottom + Me
      );
    }, O = (Y) => {
      var oe;
      if (!k.value) return;
      const ue = Y == null ? void 0 : Y.target;
      ue && ((oe = ne.value) != null && oe.contains(ue)) || he();
    };
    function C(Y) {
      const ue = Y instanceof HTMLElement ? Y : null;
      ne.value = ue, g.value = ue;
    }
    function L() {
      e.disabled || (j(), Pe(he));
    }
    function Q() {
      if (!e.disabled) {
        if (k.value) {
          X();
          return;
        }
        j(), Pe(he);
      }
    }
    function U() {
    }
    return ve(
      () => [k.value, y.value, m.value.length],
      async ([Y]) => {
        Y && (await Pe(), he());
      }
    ), ve(k, (Y) => {
      if (!Y) {
        H.value = null;
        return;
      }
      Pe(he);
    }), pt(() => {
      window.addEventListener("resize", O), window.addEventListener("scroll", O, !0);
    }), rt(() => {
      window.removeEventListener("resize", O), window.removeEventListener("scroll", O, !0);
    }), (Y, ue) => (c(), f("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      u("div", {
        ref_key: "triggerRef",
        ref: S,
        class: "relative"
      }, [
        u("span", fa, [
          le(ge, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        u("input", {
          ref_key: "inputEl",
          ref: v,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: Ce.value,
          onFocus: L,
          onClick: L,
          onKeydown: ue[0] || (ue[0] = //@ts-ignore
          (...oe) => V(_) && V(_)(...oe)),
          readonly: !V(k),
          class: B([
            G[t.size || "md"],
            ae(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: ue[1] || (ue[1] = (oe) => V(k) ? s.value = oe.target.value : null)
        }, null, 42, ha),
        t.clearable && V(M) && !t.disabled ? (c(), f("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onMousedown: ue[2] || (ue[2] = te(
            //@ts-ignore
            (...oe) => V(D) && V(D)(...oe),
            ["prevent", "stop"]
          )),
          onClick: te(U, ["stop"])
        }, [
          le(ge, {
            name: "x",
            class: "w-4 h-4"
          })
        ], 32)) : I("", !0),
        u("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onMousedown: te(Q, ["prevent", "stop"]),
          onClick: te(U, ["stop"]),
          disabled: t.disabled
        }, [
          le(ge, {
            name: V(k) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 40, pa)
      ], 512),
      (c(), Ke(gt, { to: "body" }, [
        le(ot, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": W.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": W.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: at(() => [
            V(k) ? (c(), f("div", {
              key: 0,
              ref: C,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: xe(Ee.value),
              onMousedown: ue[3] || (ue[3] = te(() => {
              }, ["stop"])),
              onClick: ue[4] || (ue[4] = te(() => {
              }, ["stop"]))
            }, [
              V(y) ? (c(), f("div", ga, "Loading...")) : (c(), f("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: xe(ye.value),
                role: "listbox"
              }, [
                (c(!0), f(ke, null, He(V(m), (oe, Me) => {
                  var me, $e;
                  return c(), f("li", {
                    key: oe.value,
                    "data-idx": Me,
                    class: B([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      Me === V(w) ? "bg-base-200" : "",
                      oe.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (Se) => w.value = Me,
                    onMousedown: te((Se) => oe.disabled ? null : V(re)(oe), ["prevent"]),
                    role: "option",
                    "aria-selected": ((me = V(M)) == null ? void 0 : me.value) === oe.value
                  }, [
                    u("span", null, A(oe.label), 1),
                    (($e = V(M)) == null ? void 0 : $e.value) === oe.value ? (c(), Ke(ge, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : I("", !0)
                  ], 42, va);
                }), 128)),
                !V(m).length && !V(y) ? (c(), f("li", ma, " No results ")) : I("", !0)
              ], 4))
            ], 36)) : I("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), xa = { class: "truncate" }, ya = ["onClick"], ba = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, Ma = {
  key: 1,
  class: "flex-1 min-w-0"
}, Ca = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, Da = { class: "truncate" }, $a = ["onClick"], Sa = { class: "flex items-center gap-2 w-full" }, _a = { class: "flex-1 min-w-[8ch]" }, Ha = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, Ea = { class: "truncate" }, ja = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Ba = ["onClick"], Ta = ["checked", "onClick"], Ia = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Aa = 320, La = 12, za = /* @__PURE__ */ ce({
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
  setup(t, { emit: a }) {
    const e = t, h = a, l = b({
      get: () => e.modelValue ?? [],
      set: (J) => h("update:modelValue", J ?? [])
    }), {
      root: d,
      inputEl: v,
      menu: i,
      floating: g,
      open: k,
      query: s,
      loading: w,
      filtered: y,
      selectedList: m,
      openMenu: M,
      closeMenu: j,
      toggle: X,
      clearAll: re,
      onKey: D
    } = kn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), _ = F(null), S = F(null), ne = F(0), N = F(0), z = F(0), R = F(240), ie = F(null), H = F(!1), W = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, G = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, ae = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, Ce = {
      xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
      md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
      lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" }
    }, Ee = {
      xs: "badge-xs text-xs",
      sm: "badge-sm text-sm",
      md: "text-sm",
      lg: "badge-lg text-lg",
      xl: "badge-xl text-xl"
    }, ye = {
      xs: "-mr-2 h-4 w-4",
      sm: "-mr-2.5 h-5 w-5",
      md: "-mr-3 h-6 w-6",
      lg: "-mr-3 h-7 w-7",
      xl: "-mr-3 h-8 w-8"
    }, he = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, O = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, C = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, L = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, Q = b(() => e.displayMode ?? "stacked"), U = b(() => Q.value === "inline-compact"), Y = b(
      () => G[e.size || "md"]
    ), ue = b(
      () => ae[Y.value]
    ), oe = b(
      () => Ce[Y.value]
    ), Me = b(() => ({
      top: `${ne.value}px`,
      left: `${N.value}px`,
      width: `${z.value}px`
    })), me = b(() => ({
      maxHeight: `${R.value}px`
    })), $e = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), Se = (J) => l.value.some((ee) => String(ee) === String(J)), Ye = b(() => [...y.value].sort((J, ee) => {
      const q = Se(J.value), be = Se(ee.value);
      return q !== be ? q ? -1 : 1 : $e.compare(J.label, ee.label);
    })), Ze = b(
      () => l.value.map((J) => String(J)).sort().join("|")
    ), Fe = F(null), vt = F(null), it = F([]), Ve = F(0);
    let je = null;
    const mt = b(
      () => Math.max(0, m.value.length - Ve.value)
    );
    function bt(J, ee) {
      J && (it.value[ee] = J);
    }
    function Je() {
      var de, Re, Ue;
      if (!U.value) {
        Ve.value = m.value.length;
        return;
      }
      const J = ((de = Fe.value) == null ? void 0 : de.clientWidth) ?? 0, ee = m.value.length;
      if (!J || ee === 0) {
        Ve.value = ee;
        return;
      }
      const q = ((Re = vt.value) == null ? void 0 : Re.offsetWidth) ?? 28, be = 6;
      let Te = 0, Ge = 0;
      for (let Oe = 0; Oe < ee; Oe += 1) {
        const tt = ((Ue = it.value[Oe]) == null ? void 0 : Ue.offsetWidth) ?? 0, qe = Te + (Oe > 0 ? be : 0) + tt, dt = ee - (Oe + 1) > 0 ? be + q : 0;
        if (qe + dt <= J)
          Te = qe, Ge = Oe + 1;
        else
          break;
      }
      Ge === 0 && ee > 0 && (Ge = 1), Ve.value = Ge;
    }
    const Xe = () => {
      var Ie, dt;
      if (!k.value || !_.value) return;
      const J = _.value.getBoundingClientRect(), ee = window.innerWidth, q = window.innerHeight, be = 6, Te = La, Ge = (((Ie = S.value) == null ? void 0 : Ie.scrollHeight) ?? 0) || (((dt = i.value) == null ? void 0 : dt.scrollHeight) ?? 0) || 240;
      ie.value == null && (ie.value = Ge);
      const de = ie.value, Re = q - J.bottom - be - Te, Ue = J.top - be - Te, Oe = Re < 180 && Ue > Re;
      H.value = Oe;
      const qe = Math.min(Aa, de, Math.max(0, Oe ? Ue : Re));
      R.value = Math.max(64, qe), z.value = Math.max(260, J.width), N.value = Math.min(
        Math.max(J.left, Te),
        ee - z.value - Te
      ), Oe ? ne.value = Math.max(Te, J.top - be - R.value) : ne.value = Math.min(
        q - Te - R.value,
        J.bottom + be
      );
    }, st = (J) => {
      var q;
      if (!k.value) return;
      const ee = J == null ? void 0 : J.target;
      ee && ((q = S.value) != null && q.contains(ee)) || Xe();
    };
    function Mt(J) {
      const ee = J instanceof HTMLElement ? J : null;
      S.value = ee, g.value = ee;
    }
    function lt() {
      e.disabled || (M(), Pe(Xe));
    }
    function wt() {
      e.disabled || (k.value = !0, Pe(Xe));
    }
    function Qe() {
      if (!e.disabled) {
        if (k.value) {
          j();
          return;
        }
        M(), Pe(Xe);
      }
    }
    function Ct() {
      re(), lt();
    }
    function et() {
    }
    async function Dt() {
      await Pe(), Je();
    }
    return ve(
      () => [m.value.length, e.size, e.displayMode, s.value],
      () => {
        Dt();
      },
      { immediate: !0 }
    ), ve(Ye, () => {
      Dt();
    }), ve(
      () => [k.value, w.value, Ye.value.length],
      async ([J]) => {
        if (!J) {
          ie.value = null;
          return;
        }
        await Pe(), Xe();
      }
    ), ve(Fe, (J) => {
      je == null || je.disconnect(), je = null, J && (je = new ResizeObserver(() => {
        Je();
      }), je.observe(J));
    }), pt(() => {
      window.addEventListener("resize", st), window.addEventListener("scroll", st, !0);
    }), rt(() => {
      je == null || je.disconnect(), window.removeEventListener("resize", st), window.removeEventListener("scroll", st, !0);
    }), (J, ee) => (c(), f("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      u("div", {
        ref_key: "triggerRef",
        ref: _,
        class: B([
          Q.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          W[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: lt
      }, [
        Q.value === "inline-compact" ? (c(), f(ke, { key: 0 }, [
          u("span", {
            class: B(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", O[t.size || "md"]])
          }, A(t.placeholder || "Select options..."), 3),
          V(m).length ? (c(), f("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Fe,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (c(!0), f(ke, null, He(V(m).slice(0, Ve.value), (q) => (c(), f("span", {
              key: q.value,
              class: B(["badge badge-soft-primary gap-1 max-w-[12rem]", Ee[t.size || "md"]])
            }, [
              u("span", xa, A(q.label), 1),
              u("button", {
                type: "button",
                class: B([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ye[t.size || "md"]
                ]),
                onClick: te((be) => V(X)(q.value), ["stop"])
              }, [
                le(ge, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, ya)
            ], 2))), 128)),
            mt.value > 0 ? (c(), f("span", ba, " +" + A(mt.value), 1)) : I("", !0)
          ], 512)) : (c(), f("span", Ma)),
          u("span", {
            class: B([
              V(m).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            At(u("input", {
              ref_key: "inputEl",
              ref: v,
              "onUpdate:modelValue": ee[0] || (ee[0] = (q) => Nt(s) ? s.value = q : null),
              class: B([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: xe(ue.value),
              placeholder: "Search...",
              onKeydown: ee[1] || (ee[1] = //@ts-ignore
              (...q) => V(D) && V(D)(...q)),
              onFocus: wt
            }, null, 36), [
              [Lt, V(s)]
            ])
          ], 2),
          u("button", {
            type: "button",
            class: B(["icon-btn icon-btn-outline shrink-0", he[t.size || "md"]]),
            onMousedown: te(Qe, ["prevent", "stop"]),
            onClick: te(et, ["stop"])
          }, [
            le(ge, {
              name: V(k) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 34),
          V(m).length ? (c(), f("button", {
            key: 2,
            type: "button",
            class: B(["icon-btn icon-btn-outline shrink-0", he[t.size || "md"]]),
            onMousedown: te(Ct, ["prevent", "stop"]),
            onClick: te(et, ["stop"])
          }, [
            le(ge, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 34)) : I("", !0)
        ], 64)) : (c(), f(ke, { key: 1 }, [
          V(m).length ? (c(), f("div", Ca, [
            (c(!0), f(ke, null, He(V(m), (q) => (c(), f("span", {
              key: q.value,
              class: B(["badge badge-soft-primary gap-1 max-w-full", Ee[t.size || "md"]])
            }, [
              u("span", Da, A(q.label), 1),
              u("button", {
                type: "button",
                class: B([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ye[t.size || "md"]
                ]),
                onClick: te((be) => V(X)(q.value), ["stop"])
              }, [
                le(ge, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, $a)
            ], 2))), 128))
          ])) : (c(), f("span", {
            key: 1,
            class: B(["opacity-60 w-full", O[t.size || "md"]])
          }, A(t.placeholder || "Select options..."), 3)),
          u("div", Sa, [
            u("span", _a, [
              At(u("input", {
                ref_key: "inputEl",
                ref: v,
                "onUpdate:modelValue": ee[2] || (ee[2] = (q) => Nt(s) ? s.value = q : null),
                class: B([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: xe(oe.value),
                placeholder: "Search...",
                onKeydown: ee[3] || (ee[3] = //@ts-ignore
                (...q) => V(D) && V(D)(...q)),
                onFocus: wt
              }, null, 36), [
                [Lt, V(s)]
              ])
            ]),
            u("button", {
              type: "button",
              class: B(["icon-btn icon-btn-outline shrink-0", he[t.size || "md"]]),
              onMousedown: te(Qe, ["prevent", "stop"]),
              onClick: te(et, ["stop"])
            }, [
              le(ge, {
                name: V(k) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 34),
            V(m).length ? (c(), f("button", {
              key: 0,
              type: "button",
              class: B(["icon-btn icon-btn-outline shrink-0", he[t.size || "md"]]),
              onMousedown: te(Ct, ["prevent", "stop"]),
              onClick: te(et, ["stop"])
            }, [
              le(ge, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 34)) : I("", !0)
          ])
        ], 64)),
        U.value ? (c(), f("div", Ha, [
          (c(!0), f(ke, null, He(V(m), (q, be) => (c(), f("span", {
            key: `measure-${q.value}`,
            ref_for: !0,
            ref: (Te) => bt(Te, be),
            class: B(["badge badge-soft-primary gap-1 max-w-[12rem]", Ee[t.size || "md"]])
          }, [
            u("span", Ea, A(q.label), 1),
            u("span", {
              class: B([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                ye[t.size || "md"]
              ])
            }, [
              le(ge, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          u("span", {
            ref_key: "measureCounterEl",
            ref: vt,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : I("", !0)
      ], 2),
      (c(), Ke(gt, { to: "body" }, [
        le(ot, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": H.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": H.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: at(() => [
            V(k) ? (c(), f("div", {
              key: 0,
              ref: Mt,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: xe(Me.value),
              onMousedown: ee[4] || (ee[4] = te(() => {
              }, ["stop"])),
              onClick: ee[5] || (ee[5] = te(() => {
              }, ["stop"]))
            }, [
              V(w) ? (c(), f("div", ja, "Loading...")) : (c(), f("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: xe(me.value)
              }, [
                (c(!0), f(ke, null, He(Ye.value, (q) => (c(), f("li", {
                  key: `${Ze.value}:${String(q.value)}`,
                  class: B([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    C[t.size || "md"],
                    Se(q.value) ? "bg-primary/15" : ""
                  ]),
                  onClick: te((be) => V(X)(q.value), ["stop", "prevent"])
                }, [
                  u("input", {
                    type: "checkbox",
                    class: B([L[t.size || "md"]]),
                    checked: Se(q.value),
                    onClick: te((be) => V(X)(q.value), ["stop", "prevent"])
                  }, null, 10, Ta),
                  u("span", null, A(q.label), 1)
                ], 10, Ba))), 128)),
                !Ye.value.length && !V(w) ? (c(), f("li", Ia, " No results ")) : I("", !0)
              ], 4))
            ], 36)) : I("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Ot = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [h, l] of a)
    e[h] = l;
  return e;
}, Or = /* @__PURE__ */ Ot(za, [["__scopeId", "data-v-6b39678f"]]), Fa = { class: "font-medium" }, Oa = { class: "text-sm opacity-60" }, Na = {
  key: 0,
  class: "text-xs opacity-60 space-y-1"
}, Pa = { key: 0 }, Va = { key: 1 }, Ya = ["multiple", "accept", "disabled"], Ra = {
  key: 0,
  class: "space-y-2"
}, Wa = { class: "flex items-center gap-2 min-w-0" }, Ua = { class: "text-sm truncate" }, Ka = ["onClick"], Ga = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-3"
}, qa = ["src", "alt"], Za = ["onClick"], Ja = {
  key: 2,
  class: "text-xs opacity-60"
}, Nr = /* @__PURE__ */ ce({
  __name: "FileUpload",
  props: {
    modelValue: { default: () => [] },
    multiple: { type: Boolean, default: !1 },
    accept: { default: "" },
    disabled: { type: Boolean, default: !1 },
    maxFiles: { default: void 0 },
    preview: { type: Boolean, default: !1 },
    class: { default: "" },
    dropzoneText: { default: "Drag & drop files here" },
    browseText: { default: "or click to browse" },
    helperText: { default: "" },
    maxSizeText: { default: "" },
    emptyText: { default: "No files selected" }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: a }) {
    const e = t, h = a, l = F(!1), d = F(e.modelValue ?? []), v = F([]), i = (D) => !e.maxFiles || e.maxFiles <= 0 ? D : D.slice(0, e.maxFiles), g = (D) => {
      d.value = i(D), h("update:modelValue", d.value), h("change", d.value);
    }, k = b(() => d.value.length > 0), s = b(
      () => d.value.map((D, _) => ({
        index: _,
        name: D.name,
        file: D,
        isImage: D.type.startsWith("image/")
      }))
    ), w = b(
      () => e.preview ? s.value.filter((D) => !D.isImage) : s.value
    ), y = b(() => !!(e.helperText || e.maxSizeText)), m = (D) => {
      var ne;
      const _ = ((ne = D.name.split(".").pop()) == null ? void 0 : ne.toLowerCase()) ?? "", S = D.type.toLowerCase();
      return S.startsWith("image/") ? "image" : S === "application/pdf" || _ === "pdf" ? "file-pdf" : _ === "xls" || _ === "xlsx" || S === "application/vnd.ms-excel" || S === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "file-xls" : _ === "csv" || S === "text/csv" ? "file-csv" : _ === "doc" || _ === "docx" || S === "application/msword" || S === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "file-doc" : _ === "ppt" || _ === "pptx" || S === "application/vnd.ms-powerpoint" || S === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? "file-ppt" : _ === "txt" || S === "text/plain" ? "file-txt" : _ === "zip" || _ === "rar" || _ === "7z" || _ === "tar" || _ === "gz" || S === "application/zip" || S === "application/x-zip-compressed" || S === "application/x-rar-compressed" || S === "application/x-7z-compressed" || S === "application/gzip" || S === "application/x-tar" ? "file-archive" : "file";
    }, M = () => {
      v.value.forEach((D) => URL.revokeObjectURL(D.url)), v.value = d.value.map((D, _) => ({ file: D, fileIndex: _ })).filter((D) => D.file.type.startsWith("image/")).map(({ file: D, fileIndex: _ }) => ({
        id: `${D.name}-${D.size}-${D.lastModified}-${_}`,
        name: D.name,
        url: URL.createObjectURL(D),
        fileIndex: _
      }));
    }, j = (D) => {
      const _ = D.target, S = Array.from(_.files ?? []);
      S.length && (e.multiple ? g([...d.value, ...S]) : g([S[0]]), _.value = "");
    }, X = (D) => {
      var S;
      if (e.disabled) return;
      l.value = !1;
      const _ = Array.from(((S = D.dataTransfer) == null ? void 0 : S.files) ?? []);
      _.length && (e.multiple ? g([...d.value, ..._]) : g([_[0]]));
    }, re = (D) => {
      const _ = [...d.value];
      _.splice(D, 1), g(_);
    };
    return ve(
      () => e.modelValue,
      (D) => {
        d.value = i(D ?? []);
      }
    ), ve(
      d,
      () => {
        M();
      },
      { immediate: !0 }
    ), rt(() => {
      v.value.forEach((D) => URL.revokeObjectURL(D.url));
    }), (D, _) => (c(), f("div", {
      class: B(["space-y-3", e.class])
    }, [
      u("div", {
        class: B(["dropzone", [{ "dropzone-active": l.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: _[0] || (_[0] = te((S) => l.value = !0, ["prevent"])),
        onDragleave: _[1] || (_[1] = (S) => l.value = !1),
        onDrop: te(X, ["prevent"])
      }, [
        le(ge, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        u("p", Fa, A(t.dropzoneText), 1),
        u("p", Oa, A(t.browseText), 1),
        y.value ? (c(), f("div", Na, [
          t.helperText ? (c(), f("p", Pa, A(t.helperText), 1)) : I("", !0),
          t.maxSizeText ? (c(), f("p", Va, A(t.maxSizeText), 1)) : I("", !0)
        ])) : I("", !0),
        u("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: j
        }, null, 40, Ya)
      ], 34),
      w.value.length ? (c(), f("div", Ra, [
        (c(!0), f(ke, null, He(w.value, (S) => (c(), f("div", {
          key: `${S.name}-${S.index}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          u("span", Wa, [
            le(ge, {
              name: m(S.file),
              class: "w-4 h-4 shrink-0"
            }, null, 8, ["name"]),
            u("span", Ua, A(S.name), 1)
          ]),
          u("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ne) => re(S.index)
          }, [
            le(ge, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, Ka)
        ]))), 128))
      ])) : I("", !0),
      t.preview && v.value.length ? (c(), f("div", Ga, [
        (c(!0), f(ke, null, He(v.value, (S) => (c(), f("div", {
          key: S.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          u("img", {
            src: S.url,
            alt: S.name,
            class: "w-full h-full object-cover"
          }, null, 8, qa),
          u("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ne) => re(S.fileIndex)
          }, [
            le(ge, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, Za)
        ]))), 128))
      ])) : I("", !0),
      k.value ? I("", !0) : (c(), f("p", Ja, A(t.emptyText), 1))
    ], 2));
  }
}), Xa = {
  key: 0,
  class: "mitreka-input-addon"
}, Qa = { class: "mitreka-input-inner w-full" }, er = {
  key: 0,
  class: "mitreka-input-icon mitreka-input-icon--left"
}, tr = ["type", "value", "placeholder", "disabled", "readonly"], nr = {
  key: 1,
  class: "mitreka-input-icon mitreka-input-icon--right"
}, or = ["aria-label"], ar = {
  key: 1,
  class: "mitreka-input-addon"
}, rr = /* @__PURE__ */ ce({
  __name: "Input",
  props: {
    modelValue: { default: "" },
    type: { default: "text" },
    placeholder: { default: "" },
    size: { default: "md" },
    color: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    clearable: { type: Boolean, default: !1 },
    passwordToggle: { type: Boolean, default: !1 },
    prefixIcon: { default: "" },
    suffixIcon: { default: "" },
    addonLeft: { default: "" },
    addonRight: { default: "" }
  },
  emits: ["update:modelValue", "clear", "enter", "focus", "blur"],
  setup(t, { emit: a }) {
    const e = t, h = a, l = Rt(), d = F(!1), v = b(() => String(e.modelValue ?? "")), i = b(() => v.value.length > 0), g = b(() => !!e.prefixIcon), k = b(() => !!e.suffixIcon), s = b(() => !!e.addonLeft || !!e.addonRight), w = b(
      () => e.clearable && i.value && !e.disabled && !e.readonly
    ), y = b(
      () => e.passwordToggle && e.type === "password" && !e.disabled
    ), m = b(() => y.value && d.value ? "text" : e.type), M = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, j = b(
      () => e.color === "default" ? "" : `input-${e.color}`
    ), X = b(() => [
      "input",
      M[e.size],
      j.value,
      g.value ? "mitreka-input-has-prefix" : "",
      k.value || w.value || y.value ? "mitreka-input-has-suffix" : ""
    ]), re = (ne) => {
      const N = ne.target;
      h("update:modelValue", N.value);
    }, D = () => {
      h("update:modelValue", ""), h("clear");
    }, _ = () => {
      d.value = !d.value;
    }, S = (ne) => {
      ne.key === "Enter" && h("enter");
    };
    return (ne, N) => (c(), f("div", {
      class: B(["mitreka-input-group w-full", s.value ? "mitreka-input-group--with-addon" : ""])
    }, [
      t.addonLeft ? (c(), f("span", Xa, A(t.addonLeft), 1)) : I("", !0),
      u("div", Qa, [
        g.value ? (c(), f("span", er, [
          le(ge, {
            name: t.prefixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : I("", !0),
        u("input", Ft(V(l), {
          type: m.value,
          value: v.value,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: X.value,
          onInput: re,
          onFocus: N[0] || (N[0] = (z) => h("focus", z)),
          onBlur: N[1] || (N[1] = (z) => h("blur", z)),
          onKeydown: S
        }), null, 16, tr),
        k.value ? (c(), f("span", nr, [
          le(ge, {
            name: t.suffixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : I("", !0),
        w.value ? (c(), f("button", {
          key: 2,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": "Clear input",
          onClick: D
        }, [
          le(ge, {
            name: "x",
            class: "w-4 h-4 opacity-70"
          })
        ])) : I("", !0),
        y.value ? (c(), f("button", {
          key: 3,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": d.value ? "Hide password" : "Show password",
          onClick: _
        }, [
          le(ge, {
            name: d.value ? "eye-off" : "eye",
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ], 8, or)) : I("", !0)
      ]),
      t.addonRight ? (c(), f("span", ar, A(t.addonRight), 1)) : I("", !0)
    ], 2));
  }
}), Pr = /* @__PURE__ */ Ot(rr, [["__scopeId", "data-v-4e5d8d4f"]]), ir = { class: "tree-list" }, sr = {
  key: 0,
  class: "tree-list__empty"
}, lr = ["onClick"], dr = ["onClick"], cr = {
  key: 1,
  class: "tree-list__toggle-space"
}, ur = {
  key: 2,
  class: "tree-list__code"
}, fr = /* @__PURE__ */ ce({
  __name: "TreeList",
  props: {
    nodes: {},
    expandedIds: {},
    searchQuery: { default: "" },
    emptyText: { default: "No data found." },
    baseIndent: { default: 12 },
    indentStep: { default: 24 },
    codeMode: { default: "order" },
    codeField: { default: "code" }
  },
  emits: ["toggle", "row-click"],
  setup(t, { emit: a }) {
    const e = t, h = a, l = b(
      () => e.expandedIds instanceof Set ? e.expandedIds : new Set(e.expandedIds)
    ), d = b(() => {
      const y = [], m = (M, j, X, re) => {
        M.forEach((D, _) => {
          var ne;
          const S = [...X, _ + 1];
          y.push({
            node: D,
            depth: j,
            numberLabel: S.join("."),
            ancestors: re
          }), (ne = D.children) != null && ne.length && m(D.children, j + 1, S, [...re, D.id]);
        });
      };
      return m(e.nodes ?? [], 0, [], []), y;
    }), v = b(() => {
      const y = [], m = (M, j, X) => {
        M.forEach((re, D) => {
          var S;
          const _ = [...X, D + 1];
          y.push({
            node: re,
            depth: j,
            numberLabel: _.join("."),
            ancestors: []
          }), (S = re.children) != null && S.length && l.value.has(re.id) && m(re.children, j + 1, _);
        });
      };
      return m(e.nodes ?? [], 0, []), y;
    }), i = b(() => {
      const y = e.searchQuery.trim().toLowerCase();
      if (!y) return v.value;
      const m = /* @__PURE__ */ new Set();
      return d.value.forEach((M) => {
        `${w(M)} ${M.node.name}`.toLowerCase().includes(y) && (m.add(M.node.id), M.ancestors.forEach((X) => m.add(X)));
      }), d.value.filter((M) => m.has(M.node.id));
    }), g = (y) => {
      var m;
      return !!((m = y.children) != null && m.length);
    };
    function k(y) {
      h("toggle", y);
    }
    function s(y) {
      h("row-click", y);
    }
    function w(y) {
      if (e.codeMode === "none") return "";
      if (e.codeMode === "field") {
        const m = y.node[e.codeField];
        return m == null ? "" : String(m);
      }
      return `${y.numberLabel}.`;
    }
    return (y, m) => (c(), f("div", ir, [
      i.value.length ? I("", !0) : (c(), f("div", sr, A(t.emptyText), 1)),
      (c(!0), f(ke, null, He(i.value, (M) => (c(), f("div", {
        key: M.node.id,
        class: "tree-list__row-wrap"
      }, [
        u("div", {
          class: B(["tree-list__row", { "tree-list__row--with-guides": M.depth > 0 }]),
          style: xe({
            paddingLeft: `${t.baseIndent + M.depth * t.indentStep}px`,
            "--guide-width": `${M.depth * t.indentStep}px`
          }),
          onClick: (j) => s(M.node)
        }, [
          g(M.node) ? (c(), f("button", {
            key: 0,
            class: "tree-list__toggle",
            type: "button",
            onClick: te((j) => k(M.node.id), ["stop"])
          }, [
            le(ge, {
              name: "chevron-right",
              class: B(["w-4 h-4 text-base-content/50 transition-transform duration-150", { "rotate-90": l.value.has(M.node.id) }])
            }, null, 8, ["class"])
          ], 8, dr)) : (c(), f("span", cr)),
          t.codeMode !== "none" ? (c(), f("span", ur, A(w(M)), 1)) : I("", !0),
          u("span", {
            class: B(["tree-list__name", M.depth === 0 ? "font-semibold" : ""])
          }, A(M.node.name), 3),
          pe(y.$slots, "meta", {
            row: M,
            node: M.node
          }, void 0, !0),
          m[1] || (m[1] = u("span", { class: "flex-1" }, null, -1)),
          u("div", {
            class: "tree-list__actions",
            onClick: m[0] || (m[0] = te(() => {
            }, ["stop"]))
          }, [
            pe(y.$slots, "actions", {
              row: M,
              node: M.node
            }, void 0, !0)
          ])
        ], 14, lr)
      ]))), 128))
    ]));
  }
}), Vr = /* @__PURE__ */ Ot(fr, [["__scopeId", "data-v-3c1b8432"]]);
export {
  Pr as I,
  Or as M,
  Vr as T,
  vr as _,
  mr as a,
  wr as b,
  kr as c,
  xr as d,
  yr as e,
  br as f,
  Yn as g,
  Mr as h,
  Cr as i,
  Dr as j,
  $r as k,
  Sr as l,
  _r as m,
  Hr as n,
  Er as o,
  jr as p,
  Br as q,
  Tr as r,
  ge as s,
  Ar as t,
  Lr as u,
  zr as v,
  Fr as w,
  Nr as x,
  Wt as y,
  Ir as z
};
