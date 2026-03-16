import { defineComponent as re, createElementBlock as g, openBlock as f, normalizeClass as H, createCommentVNode as j, renderSlot as ue, createElementVNode as p, ref as I, watch as le, withKeys as dt, withModifiers as xe, createBlock as Ue, Teleport as ut, createVNode as ae, Transition as Xe, withCtx as Qe, toDisplayString as F, provide as rn, inject as sn, computed as M, normalizeStyle as we, createTextVNode as Ot, Fragment as ge, renderList as _e, unref as A, useSlots as ln, resolveDynamicComponent as dn, reactive as cn, withDirectives as At, vModelText as It, onMounted as ct, onBeforeUnmount as et, mergeProps as Lt, useAttrs as Nt, nextTick as ze, isRef as Bt } from "vue";
import { d as un, c as fn, f as hn, h as pn, i as gn, g as vn, r as mn, a as wn, b as bn } from "./useAgGridRowHeight-CkXm93Od.js";
import { AgGridVue as yn } from "ag-grid-vue3";
const kn = ["disabled"], xn = {
  key: 0,
  class: "animate-spin"
}, or = /* @__PURE__ */ re({
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
    const e = t, h = o, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: i, color: c } = e;
      return c === "default" ? i === "outline" ? "btn-outline" : i === "ghost" ? "btn-ghost" : "" : i === "solid" ? `btn-${c}` : i === "outline" ? `btn-outline btn-outline-${c}` : i === "soft" ? `btn-soft-${c}` : i === "ghost" ? "btn-ghost" : "";
    }, v = (i) => {
      !e.disabled && !e.loading && h("click", i);
    };
    return (i, c) => (f(), g("button", {
      class: H(["btn", l[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: v
    }, [
      t.loading ? (f(), g("span", xn, [...c[0] || (c[0] = [
        p("svg", {
          class: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24"
        }, [
          p("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }),
          p("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          })
        ], -1)
      ])])) : j("", !0),
      ue(i.$slots, "default")
    ], 10, kn));
  }
}), rr = /* @__PURE__ */ re({
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
    }, h = () => {
      const { variant: l, color: d } = o;
      return d === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${d}` : l === "outline" ? `badge-outline badge-outline-${d}` : l === "soft" ? `badge-soft-${d}` : "";
    };
    return (l, d) => (f(), g("span", {
      class: H(["badge", e[t.size], h()])
    }, [
      ue(l.$slots, "default")
    ], 2));
  }
}), Cn = ["role", "aria-expanded", "tabindex"], Mn = { class: "card-title" }, Dn = { class: "card-body-inner" }, $n = {
  key: 3,
  class: "mt-4"
}, ir = /* @__PURE__ */ re({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const h = t, l = e, d = I(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    le(() => h.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function v() {
      if (!h.collapsible) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return o({ isOpen: d, toggle: v }), (i, c) => (f(), g("section", {
      class: H(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      i.$slots.title ? (f(), g("header", {
        key: 0,
        class: H(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: v,
        onKeydown: [
          c[0] || (c[0] = dt((k) => t.collapsible && v(), ["enter"])),
          c[1] || (c[1] = dt(xe((k) => t.collapsible && v(), ["prevent"]), ["space"]))
        ]
      }, [
        p("div", Mn, [
          ue(i.$slots, "title")
        ]),
        t.collapsible ? (f(), g("svg", {
          key: 0,
          class: H(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...c[2] || (c[2] = [
          p("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : j("", !0)
      ], 42, Cn)) : j("", !0),
      t.collapsible ? (f(), g("div", {
        key: 1,
        class: H(["card-body-wrapper", { "is-open": d.value }])
      }, [
        p("div", Dn, [
          ue(i.$slots, "default")
        ])
      ], 2)) : ue(i.$slots, "default", { key: 2 }),
      i.$slots.footer ? (f(), g("footer", $n, [
        ue(i.$slots, "footer")
      ])) : j("", !0)
    ], 2));
  }
}), Sn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, En = { class: "text-xl font-semibold" }, sr = /* @__PURE__ */ re({
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
    const e = t, h = o, l = {
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
    return le(
      () => e.open,
      (v) => {
        v ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (v, i) => (f(), Ue(ut, { to: "body" }, [
      ae(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (f(), g("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: d
          })) : j("", !0)
        ]),
        _: 1
      }),
      ae(Xe, { name: "zoom" }, {
        default: Qe(() => [
          t.open ? (f(), g("div", {
            key: 0,
            class: H([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            p("div", {
              class: H([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? j("", !0) : (f(), g("div", Sn, [
                ue(v.$slots, "header", {}, () => [
                  p("h3", En, F(t.title), 1)
                ]),
                p("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: i[0] || (i[0] = (c) => h("close"))
                }, [...i[3] || (i[3] = [
                  p("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    p("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])])
              ])),
              p("div", {
                class: H([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                ue(v.$slots, "default")
              ], 2),
              t.hideFooter ? j("", !0) : (f(), g("div", {
                key: 1,
                class: H([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                ue(v.$slots, "footer", {}, () => [
                  p("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: i[1] || (i[1] = (c) => h("close"))
                  }, F(t.cancelText), 1),
                  p("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: i[2] || (i[2] = (c) => h("confirm"))
                  }, F(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : j("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), _n = ["aria-expanded", "aria-disabled", "onKeydown"], Hn = { class: "collapse-title" }, Tn = { class: "collapse-content" }, An = { class: "collapse-content-inner" }, In = { class: "collapse-body" }, lr = /* @__PURE__ */ re({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const h = t, l = e, d = I(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    le(() => h.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function v() {
      if (h.disabled) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return o({ isOpen: d, toggle: v }), (i, c) => (f(), g("div", {
      class: H([
        "collapse",
        `collapse-${t.variant}`,
        { "is-open": d.value }
      ])
    }, [
      p("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": d.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: v,
        onKeydown: [
          dt(v, ["enter"]),
          dt(xe(v, ["prevent"]), ["space"])
        ]
      }, [
        p("div", Hn, [
          ue(i.$slots, "header", {}, () => [
            ue(i.$slots, "title")
          ])
        ]),
        c[0] || (c[0] = p("svg", {
          class: "collapse-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          p("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, _n),
      p("div", Tn, [
        p("div", An, [
          p("div", In, [
            ue(i.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), dr = /* @__PURE__ */ re({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: o, emit: e }) {
    const h = t, l = e, d = I(/* @__PURE__ */ new Set());
    le(() => h.modelValue, (c) => {
      c === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(c) ? d.value = new Set(c) : d.value = /* @__PURE__ */ new Set([c]);
    }, { immediate: !0 });
    function v(c) {
      const k = new Set(d.value);
      k.has(c) ? k.delete(c) : (h.multiple || k.clear(), k.add(c)), d.value = k, h.multiple ? l("update:modelValue", Array.from(k)) : l("update:modelValue", k.size > 0 ? Array.from(k)[0] : null);
    }
    function i(c) {
      return d.value.has(c);
    }
    return rn("accordion", {
      toggleItem: v,
      isItemOpen: i
    }), o({ openItems: d, toggleItem: v }), (c, k) => (f(), g("div", {
      class: H(["accordion", `accordion-${t.variant}`])
    }, [
      ue(c.$slots, "default")
    ], 2));
  }
}), jn = ["aria-expanded", "aria-disabled", "onKeydown"], Ln = { class: "accordion-title" }, Bn = { class: "accordion-content" }, Fn = { class: "accordion-content-inner" }, zn = { class: "accordion-body" }, cr = /* @__PURE__ */ re({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = t, e = sn("accordion"), h = M(() => (e == null ? void 0 : e.isItemOpen(o.id)) ?? !1);
    function l() {
      o.disabled || e == null || e.toggleItem(o.id);
    }
    return (d, v) => (f(), g("div", {
      class: H(["accordion-item", { "is-open": h.value }])
    }, [
      p("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": h.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          dt(l, ["enter"]),
          dt(xe(l, ["prevent"]), ["space"])
        ]
      }, [
        p("div", Ln, [
          ue(d.$slots, "header", {}, () => [
            ue(d.$slots, "title")
          ])
        ]),
        v[0] || (v[0] = p("svg", {
          class: "accordion-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          p("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, jn),
      p("div", Bn, [
        p("div", Fn, [
          p("div", zn, [
            ue(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), On = { class: "loading-logo-wrapper" }, Nn = { class: "dots-container" }, Pn = ["width", "height"], Vn = {
  key: 0,
  class: "loading-text"
}, Yn = /* @__PURE__ */ re({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const o = t, e = M(() => Math.round(o.size * (8 / 60)));
    return (h, l) => (f(), g("div", On, [
      p("div", {
        class: "loading-logo-container",
        style: we({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        p("div", Nn, [
          p("span", {
            class: "loading-dot dot-1 dot-blue",
            style: we({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-2 dot-blue",
            style: we({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-3 dot-black",
            style: we({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-4 dot-black",
            style: we({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-5 dot-red",
            style: we({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-6 dot-red",
            style: we({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (f(), g("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...l[0] || (l[0] = [
          p("polygon", {
            class: "logo-shape shape-blue",
            points: "11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
          }, null, -1),
          p("rect", {
            class: "logo-shape shape-black",
            x: "15.48",
            y: "8.73",
            width: "9.55",
            height: "9.55",
            transform: "translate(-3.61 18.27) rotate(-45)"
          }, null, -1),
          p("polygon", {
            class: "logo-shape shape-red",
            points: "40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
          }, null, -1)
        ])], 8, Pn))
      ], 4),
      t.text ? (f(), g("p", Vn, [
        Ot(F(t.text), 1),
        l[1] || (l[1] = p("span", { class: "loading-dots" }, [
          p("span", null, "."),
          p("span", null, "."),
          p("span", null, ".")
        ], -1))
      ])) : j("", !0)
    ]));
  }
}), Rn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, ur = /* @__PURE__ */ re({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (o, e) => (f(), Ue(ut, { to: "body" }, [
      ae(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (f(), g("div", Rn, [
            ae(Yn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : j("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Wn = { class: "toast-content" }, Un = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Gn = ["d"], Kn = { class: "toast-body" }, qn = {
  key: 0,
  class: "toast-title"
}, Zn = { class: "toast-message" }, Jn = ["onClick"], fr = /* @__PURE__ */ re({
  __name: "Toasts",
  setup(t) {
    const o = un(), e = M(() => {
      const c = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return c[o.toastPosition.value] || c["bottom-right"];
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
    }, i = (c, k = "soft") => {
      var w;
      return ((w = {
        soft: l,
        solid: d,
        outline: v
      }[k]) == null ? void 0 : w[c]) || l[c] || "toast-default";
    };
    return (c, k) => (f(), Ue(ut, { to: "body" }, [
      p("div", {
        class: H(["toast-container", e.value])
      }, [
        (f(!0), g(ge, null, _e(A(o).toasts.value, (s) => (f(), g("div", {
          key: s.id,
          class: H(["toast-item", i(s.type, s.variant)])
        }, [
          p("div", Wn, [
            (f(), g("svg", Un, [
              p("path", {
                d: h[s.type],
                fill: "currentColor"
              }, null, 8, Gn)
            ])),
            p("div", Kn, [
              s.title ? (f(), g("div", qn, F(s.title), 1)) : j("", !0),
              p("div", Zn, F(s.message), 1)
            ]),
            p("button", {
              class: "toast-close-btn",
              onClick: (w) => A(o).dismiss(s.id)
            }, [...k[0] || (k[0] = [
              p("svg", {
                class: "toast-close-icon",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                p("path", {
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
}), hr = /* @__PURE__ */ re({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const o = t, e = I(!1);
    let h = null;
    const l = () => {
      h = setTimeout(() => {
        e.value = !0;
      }, o.delay);
    }, d = () => {
      h && (clearTimeout(h), h = null), e.value = !1;
    }, v = M(() => `tooltip-pos-${o.position}`), i = M(() => `tooltip-arrow-${o.position}`), c = M(() => `tooltip-variant-${o.variant}`);
    return (k, s) => (f(), g("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: d,
      onFocus: l,
      onBlur: d
    }, [
      ue(k.$slots, "default"),
      ae(Xe, { name: "tooltip-fade" }, {
        default: Qe(() => [
          e.value && t.text ? (f(), g("span", {
            key: 0,
            class: H(["tooltip-content", [v.value, c.value]]),
            role: "tooltip"
          }, [
            Ot(F(t.text) + " ", 1),
            p("span", {
              class: H(["tooltip-arrow", [i.value, c.value]])
            }, null, 2)
          ], 2)) : j("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Xn = { class: "mitreka-pagination" }, Qn = ["disabled"], ea = { class: "pagination-status" }, ta = ["disabled"], pr = /* @__PURE__ */ re({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: o }) {
    const e = t, h = o, l = () => {
      e.page > 1 && h("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && h("change", e.page + 1);
    };
    return (v, i) => (f(), g("div", Xn, [
      p("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...i[0] || (i[0] = [
        p("span", { class: "hidden sm:inline" }, "Prev", -1),
        p("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Qn),
      p("span", ea, F(t.page) + " / " + F(t.pages), 1),
      p("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...i[1] || (i[1] = [
        p("span", { class: "hidden sm:inline" }, "Next", -1),
        p("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, ta)
    ]));
  }
}), na = { class: "avatar-root" }, aa = ["src", "alt"], gr = /* @__PURE__ */ re({
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
    const o = t, e = I(!1), h = M(() => o.src && !e.value), l = M(() => o.fallback ? o.fallback.slice(0, 2).toUpperCase() : o.alt && o.alt !== "Avatar" ? o.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), d = M(() => `avatar-size-${o.size}`), v = M(() => `avatar-color-${o.color}`), i = M(() => o.status ? `avatar-status-${o.status}` : ""), c = M(() => `avatar-status-size-${o.size}`), k = M(() => o.square ? "avatar-square" : "avatar-round"), s = () => {
      e.value = !0;
    };
    return (w, x) => (f(), g("span", na, [
      h.value ? (f(), g("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: H(["avatar-img", [d.value, k.value]]),
        onError: s
      }, null, 42, aa)) : (f(), g("span", {
        key: 1,
        class: H(["avatar-fallback", [d.value, v.value, k.value]])
      }, F(l.value), 3)),
      t.status ? (f(), g("span", {
        key: 2,
        class: H(["avatar-status", [i.value, c.value]])
      }, null, 2)) : j("", !0)
    ]));
  }
}), vr = /* @__PURE__ */ re({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const o = t, e = ln(), h = M(() => {
      var c;
      const i = (c = e.default) == null ? void 0 : c.call(e);
      return i ? i.length : 0;
    }), l = M(() => h.value <= o.max ? 0 : h.value - o.max), d = M(() => `avatar-size-${o.size}`), v = M(() => `avatar-group-space-${o.size}`);
    return (i, c) => (f(), g("div", {
      class: H(["avatar-group", v.value])
    }, [
      (f(!0), g(ge, null, _e(t.max, (k, s) => {
        var w, x;
        return f(), g(ge, { key: s }, [
          s < h.value ? (f(), Ue(dn((x = (w = A(e)).default) == null ? void 0 : x.call(w)[s]), { key: 0 })) : j("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (f(), g("span", {
        key: 0,
        class: H(["avatar-group-count", d.value])
      }, " +" + F(l.value), 3)) : j("", !0)
    ], 2));
  }
}), oa = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, ra = { class: "breadcrumbs-list" }, ia = {
  key: 0,
  class: "breadcrumbs-item"
}, sa = ["href"], la = { key: 0 }, da = ["href"], ca = {
  key: 1,
  class: "breadcrumbs-text"
}, ua = {
  key: 1,
  class: "breadcrumbs-current"
}, mr = /* @__PURE__ */ re({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const o = t, e = (h) => h === o.items.length - 1;
    return (h, l) => t.items.length ? (f(), g("nav", oa, [
      p("ol", ra, [
        t.showHome ? (f(), g("li", ia, [
          p("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, F(t.homeLabel), 9, sa)
        ])) : j("", !0),
        (f(!0), g(ge, null, _e(t.items, (d, v) => (f(), g("li", {
          key: v,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = p("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(v) ? (f(), g("span", ua, F(d.label), 1)) : (f(), g("span", la, [
            d.href ? (f(), g("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, F(d.label), 9, da)) : (f(), g("span", ca, F(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : j("", !0);
  }
}), fa = { class: "mitreka-stat-card" }, ha = {
  key: 0,
  class: "stat-icon"
}, pa = { class: "stat-content" }, ga = { class: "stat-label" }, va = { class: "stat-value" }, wr = /* @__PURE__ */ re({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (o, e) => (f(), g("div", fa, [
      t.icon ? (f(), g("div", ha, F(t.icon), 1)) : j("", !0),
      p("div", pa, [
        p("div", ga, F(t.label), 1),
        p("div", va, F(t.value), 1)
      ])
    ]));
  }
}), ma = { class: "mitreka-page-header" }, wa = { class: "page-header-title-row" }, ba = { class: "page-header-title" }, ya = {
  key: 0,
  class: "page-header-desc"
}, br = /* @__PURE__ */ re({
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
    }, h = M(() => {
      if (!o.category) return "";
      const l = o.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, d) => (f(), g("header", ma, [
      p("div", wa, [
        p("h1", ba, F(t.title), 1),
        t.category ? (f(), g("span", {
          key: 0,
          class: H(["badge page-header-badge", h.value])
        }, F(t.category), 3)) : j("", !0)
      ]),
      t.description ? (f(), g("p", ya, F(t.description), 1)) : j("", !0)
    ]));
  }
}), ka = { class: "mitreka-theme-switcher" }, xa = ["value"], yr = /* @__PURE__ */ re({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: o, setTheme: e, toggleTheme: h } = fn("light"), l = M(
      () => o.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (v) => {
      e(v === "mitrekadark" ? "dark" : "light");
    };
    return (v, i) => (f(), g("div", ka, [
      p("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: i[0] || (i[0] = //@ts-ignore
        (...c) => A(h) && A(h)(...c))
      }, " Toggle: " + F(l.value), 1),
      p("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: i[1] || (i[1] = (c) => d(c.target.value))
      }, [...i[2] || (i[2] = [
        p("option", { value: "mitrekalight" }, "mitrekalight", -1),
        p("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, xa)
    ]));
  }
}), Ca = { class: "sidebar-header" }, Ma = {
  key: 0,
  class: "sidebar-search"
}, Da = ["placeholder"], $a = { class: "sidebar-nav" }, Sa = ["href", "title", "onClick"], Ea = { class: "sidebar-icon" }, _a = { class: "sidebar-icon-text" }, Ha = {
  key: 0,
  class: "sidebar-label"
}, Ta = ["title", "onClick"], Aa = { class: "sidebar-icon" }, Ia = { class: "sidebar-icon-text" }, ja = {
  key: 0,
  class: "sidebar-label"
}, La = ["href", "title", "onClick"], Ba = { class: "sidebar-icon" }, Fa = { class: "sidebar-icon-text" }, za = {
  key: 0,
  class: "sidebar-label"
}, kr = /* @__PURE__ */ re({
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
    const e = t, h = o, l = I(""), d = cn({});
    e.defaultOpenIds.forEach((w) => {
      d[w] = !0;
    });
    const v = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), i = (w) => {
      var B;
      if (!w.children) return !1;
      if (l.value.trim()) return !0;
      const x = d[w.id], D = ((B = w.children) == null ? void 0 : B.some(v)) ?? !1;
      return x === void 0 && D && (d[w.id] = !0), d[w.id] ?? D;
    }, c = (w) => {
      const x = !i(w);
      d[w.id] = x, h("toggle", w.id, x);
    }, k = M(() => {
      const w = l.value.toLowerCase().trim();
      return w ? e.items.map((x) => {
        if (x.children) {
          const D = x.children.filter(
            (B) => B.label.toLowerCase().includes(w)
          );
          return x.label.toLowerCase().includes(w) ? x : D.length > 0 ? { ...x, children: D } : null;
        }
        return x.label.toLowerCase().includes(w) ? x : null;
      }).filter(Boolean) : e.items;
    }), s = (w) => {
      h("navigate", w), l.value = "";
    };
    return (w, x) => (f(), g("aside", {
      class: H(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      p("div", Ca, [
        ue(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (f(), g("div", Ma, [
        At(p("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": x[0] || (x[0] = (D) => l.value = D)
        }, null, 8, Da), [
          [It, l.value]
        ]),
        l.value ? (f(), g("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: x[1] || (x[1] = (D) => l.value = "")
        }, " × ")) : j("", !0)
      ])) : j("", !0),
      p("nav", $a, [
        (f(!0), g(ge, null, _e(k.value, (D) => (f(), g(ge, {
          key: D.id
        }, [
          D.children ? (f(), g(ge, { key: 1 }, [
            p("button", {
              class: H(["sidebar-item sidebar-group", i(D) ? "is-open" : ""]),
              title: t.collapsed ? D.label : void 0,
              onClick: (B) => c(D)
            }, [
              p("span", Aa, [
                ue(w.$slots, "icon", { item: D }, () => [
                  p("span", Ia, F(D.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? j("", !0) : (f(), g("span", ja, F(D.label), 1)),
              t.collapsed ? j("", !0) : (f(), g("span", {
                key: 1,
                class: H(["sidebar-caret", i(D) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Ta),
            i(D) ? (f(), g("div", {
              key: 0,
              class: H(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (f(!0), g(ge, null, _e(D.children, (B) => (f(), g("a", {
                key: B.id,
                class: H(["sidebar-item sidebar-child", v(B) ? "is-active" : ""]),
                href: B.href || "#",
                title: t.collapsed ? B.label : void 0,
                onClick: xe((y) => s(B), ["prevent"])
              }, [
                p("span", Ba, [
                  ue(w.$slots, "icon", { item: B }, () => [
                    p("span", Fa, F(B.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? j("", !0) : (f(), g("span", za, F(B.label), 1))
              ], 10, La))), 128))
            ], 2)) : j("", !0)
          ], 64)) : (f(), g("a", {
            key: 0,
            class: H(["sidebar-item", v(D) ? "is-active" : ""]),
            href: D.href || "#",
            title: t.collapsed ? D.label : void 0,
            onClick: xe((B) => s(D), ["prevent"])
          }, [
            p("span", Ea, [
              ue(w.$slots, "icon", { item: D }, () => [
                p("span", _a, F(D.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? j("", !0) : (f(), g("span", Ha, F(D.label), 1))
          ], 10, Sa))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Pt = {
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
  `
}, xr = (t) => Pt[t], Oa = ["innerHTML"], Na = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ce = /* @__PURE__ */ re({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const o = t, e = M(() => o.class || "w-5 h-5"), h = M(() => Pt[o.name]), l = M(
      () => h.value ? h.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, v) => h.value ? (f(), g("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, Oa)) : (f(), g("span", Na, "?"));
  }
});
var St = [
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
], st = {
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
}, Ee = function(t, o) {
  return o === void 0 && (o = 2), ("000" + t).slice(o * -1);
}, Fe = function(t) {
  return t === !0 ? 1 : 0;
};
function Ft(t, o) {
  var e;
  return function() {
    var h = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(h, l);
    }, o);
  };
}
var Et = function(t) {
  return t instanceof Array ? t : [t];
};
function $e(t, o, e) {
  if (e === !0)
    return t.classList.add(o);
  t.classList.remove(o);
}
function te(t, o, e) {
  var h = window.document.createElement(t);
  return o = o || "", e = e || "", h.className = o, e !== void 0 && (h.textContent = e), h;
}
function yt(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Vt(t, o) {
  if (o(t))
    return t;
  if (t.parentNode)
    return Vt(t.parentNode, o);
}
function kt(t, o) {
  var e = te("div", "numInputWrapper"), h = te("input", "numInput " + t), l = te("span", "arrowUp"), d = te("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? h.type = "number" : (h.type = "text", h.pattern = "\\d*"), o !== void 0)
    for (var v in o)
      h.setAttribute(v, o[v]);
  return e.appendChild(h), e.appendChild(l), e.appendChild(d), e;
}
function je(t) {
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
var _t = function() {
}, xt = function(t, o, e) {
  return e.months[o ? "shorthand" : "longhand"][t];
}, Pa = {
  D: _t,
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
    t.setHours(t.getHours() % 12 + 12 * Fe(new RegExp(e.amPM[1], "i").test(o)));
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
    var h = parseInt(o), l = new Date(t.getFullYear(), 0, 2 + (h - 1) * 7, 0, 0, 0, 0);
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
  l: _t,
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
  w: _t,
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
    return Ee(ht.h(t, o, e));
  },
  H: function(t) {
    return Ee(t.getHours());
  },
  J: function(t, o) {
    return o.ordinal !== void 0 ? t.getDate() + o.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, o) {
    return o.amPM[Fe(t.getHours() > 11)];
  },
  M: function(t, o) {
    return xt(t.getMonth(), !0, o);
  },
  S: function(t) {
    return Ee(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, o, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return Ee(t.getFullYear(), 4);
  },
  d: function(t) {
    return Ee(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return Ee(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, o) {
    return o.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return Ee(t.getMonth() + 1);
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
}, Yt = function(t) {
  var o = t.config, e = o === void 0 ? st : o, h = t.l10n, l = h === void 0 ? pt : h, d = t.isMobile, v = d === void 0 ? !1 : d;
  return function(i, c, k) {
    var s = k || l;
    return e.formatDate !== void 0 && !v ? e.formatDate(i, c, s) : c.split("").map(function(w, x, D) {
      return ht[w] && D[x - 1] !== "\\" ? ht[w](i, s, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, jt = function(t) {
  var o = t.config, e = o === void 0 ? st : o, h = t.l10n, l = h === void 0 ? pt : h;
  return function(d, v, i, c) {
    if (!(d !== 0 && !d)) {
      var k = c || l, s, w = d;
      if (d instanceof Date)
        s = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        s = new Date(d);
      else if (typeof d == "string") {
        var x = v || (e || st).dateFormat, D = String(d).trim();
        if (D === "today")
          s = /* @__PURE__ */ new Date(), i = !0;
        else if (e && e.parseDate)
          s = e.parseDate(d, x);
        else if (/Z$/.test(D) || /GMT$/.test(D))
          s = new Date(d);
        else {
          for (var B = void 0, y = [], O = 0, q = 0, ee = ""; O < x.length; O++) {
            var ne = x[O], Y = ne === "\\", W = x[O - 1] === "\\" || Y;
            if (Je[ne] && !W) {
              ee += Je[ne];
              var L = new RegExp(ee).exec(d);
              L && (B = !0) && y[ne !== "Y" ? "push" : "unshift"]({
                fn: Pa[ne],
                val: L[++q]
              });
            } else Y || (ee += ".");
          }
          s = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), y.forEach(function(Z) {
            var ie = Z.fn, be = Z.val;
            return s = ie(s, be, k) || s;
          }), s = B ? s : void 0;
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
function Le(t, o, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(o.getTime()).setHours(0, 0, 0, 0) : t.getTime() - o.getTime();
}
var Va = function(t, o, e) {
  return t > Math.min(o, e) && t < Math.max(o, e);
}, Ht = function(t, o, e) {
  return t * 3600 + o * 60 + e;
}, Ya = function(t) {
  var o = Math.floor(t / 3600), e = (t - o * 3600) / 60;
  return [o, e, t - o * 3600 - e * 60];
}, Ra = {
  DAY: 864e5
};
function Tt(t) {
  var o = t.defaultHour, e = t.defaultMinute, h = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), d = t.minDate.getMinutes(), v = t.minDate.getSeconds();
    o < l && (o = l), o === l && e < d && (e = d), o === l && e === d && h < v && (h = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var i = t.maxDate.getHours(), c = t.maxDate.getMinutes();
    o = Math.min(o, i), o === i && (e = Math.min(c, e)), o === i && e === c && (h = t.maxDate.getSeconds());
  }
  return { hours: o, minutes: e, seconds: h };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var o = [], e = 1; e < arguments.length; e++)
    o[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var h = function(i) {
    i && Object.keys(i).forEach(function(c) {
      return t[c] = i[c];
    });
  }, l = 0, d = o; l < d.length; l++) {
    var v = d[l];
    h(v);
  }
  return t;
});
var Me = function() {
  return Me = Object.assign || function(t) {
    for (var o, e = 1, h = arguments.length; e < h; e++) {
      o = arguments[e];
      for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l]);
    }
    return t;
  }, Me.apply(this, arguments);
}, zt = function() {
  for (var t = 0, o = 0, e = arguments.length; o < e; o++) t += arguments[o].length;
  for (var h = Array(t), l = 0, o = 0; o < e; o++)
    for (var d = arguments[o], v = 0, i = d.length; v < i; v++, l++)
      h[l] = d[v];
  return h;
}, Wa = 300;
function Ua(t, o) {
  var e = {
    config: Me(Me({}, st), he.defaultConfig),
    l10n: pt
  };
  e.parseDate = jt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = y, e._setHoursFromDate = x, e._positionCalendar = qe, e.changeMonth = T, e.changeYear = Ce, e.clear = N, e.close = se, e.onMouseOver = Te, e._createElement = te, e.createDay = L, e.destroy = He, e.isEnabled = ke, e.jumpToDate = ee, e.updateValue = We, e.open = gt, e.redraw = P, e.set = nt, e.setDate = Ze, e.toggle = Ut;
  function h() {
    e.utils = {
      getDaysInMonth: function(n, a) {
        return n === void 0 && (n = e.currentMonth), a === void 0 && (a = e.currentYear), n === 1 && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, mt(), Ke(), at(), wt(), h(), e.isMobile || W(), q(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && x(e.config.noCalendar ? e.latestSelectedDateObj : void 0), We(!1)), i();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && qe(), de("onReady");
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
        var a = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = a + "px", e.calendarContainer.style.width = a + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function c(n) {
    if (e.selectedDates.length === 0) {
      var a = e.config.minDate === void 0 || Le(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = Tt(e.config);
      a.setHours(r.hours, r.minutes, r.seconds, a.getMilliseconds()), e.selectedDates = [a], e.latestSelectedDateObj = a;
    }
    n !== void 0 && n.type !== "blur" && qt(n);
    var u = e._input.value;
    w(), We(), e._input.value !== u && e._debouncedChange();
  }
  function k(n, a) {
    return n % 12 + 12 * Fe(a === e.l10n.amPM[1]);
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
      e.amPM !== void 0 && (n = k(n, e.amPM.textContent));
      var u = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && Le(e.latestSelectedDateObj, e.config.minDate, !0) === 0, b = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && Le(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var C = Ht(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), U = Ht(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), _ = Ht(n, a, r);
        if (_ > U && _ < C) {
          var J = Ya(C);
          n = J[0], a = J[1], r = J[2];
        }
      } else {
        if (b) {
          var S = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, S.getHours()), n === S.getHours() && (a = Math.min(a, S.getMinutes())), a === S.getMinutes() && (r = Math.min(r, S.getSeconds()));
        }
        if (u) {
          var z = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, z.getHours()), n === z.getHours() && a < z.getMinutes() && (a = z.getMinutes()), a === z.getMinutes() && (r = Math.max(r, z.getSeconds()));
        }
      }
      D(n, a, r);
    }
  }
  function x(n) {
    var a = n || e.latestSelectedDateObj;
    a && a instanceof Date && D(a.getHours(), a.getMinutes(), a.getSeconds());
  }
  function D(n, a, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, a, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Ee(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Fe(n % 12 === 0)), e.minuteElement.value = Ee(a), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Fe(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Ee(r)));
  }
  function B(n) {
    var a = je(n), r = parseInt(a.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && Ce(r);
  }
  function y(n, a, r, u) {
    if (a instanceof Array)
      return a.forEach(function(b) {
        return y(n, b, r, u);
      });
    if (n instanceof Array)
      return n.forEach(function(b) {
        return y(b, a, r, u);
      });
    n.addEventListener(a, r, u), e._handlers.push({
      remove: function() {
        return n.removeEventListener(a, r, u);
      }
    });
  }
  function O() {
    de("onChange");
  }
  function q() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(u) {
        return y(u, "click", e[r]);
      });
    }), e.isMobile) {
      rt();
      return;
    }
    var n = Ft(Ne, 50);
    if (e._debouncedChange = Ft(O, Wa), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && y(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Te(je(r));
    }), y(e._input, "keydown", Ge), e.calendarContainer !== void 0 && y(e.calendarContainer, "keydown", Ge), !e.config.inline && !e.config.static && y(window, "resize", n), window.ontouchstart !== void 0 ? y(window.document, "touchstart", Be) : y(window.document, "mousedown", Be), y(window.document, "focus", Be, { capture: !0 }), e.config.clickOpens === !0 && (y(e._input, "focus", e.open), y(e._input, "click", e.open)), e.daysContainer !== void 0 && (y(e.monthNav, "click", Kt), y(e.monthNav, ["keyup", "increment"], B), y(e.daysContainer, "click", Se)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var a = function(r) {
        return je(r).select();
      };
      y(e.timeContainer, ["increment"], c), y(e.timeContainer, "blur", c, { capture: !0 }), y(e.timeContainer, "click", ne), y([e.hourElement, e.minuteElement], ["focus", "click"], a), e.secondElement !== void 0 && y(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && y(e.amPM, "click", function(r) {
        c(r);
      });
    }
    e.config.allowInput && y(e._input, "blur", tt);
  }
  function ee(n, a) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), u = e.currentYear, b = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (C) {
      C.message = "Invalid date supplied: " + r, e.config.errorHandler(C);
    }
    a && e.currentYear !== u && (de("onYearChange"), X()), a && (e.currentYear !== u || e.currentMonth !== b) && de("onMonthChange"), e.redraw();
  }
  function ne(n) {
    var a = je(n);
    ~a.className.indexOf("arrow") && Y(n, a.classList.contains("arrowUp") ? 1 : -1);
  }
  function Y(n, a, r) {
    var u = n && je(n), b = r || u && u.parentNode && u.parentNode.firstChild, C = Ct("increment");
    C.delta = a, b && b.dispatchEvent(C);
  }
  function W() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = te("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(fe()), e.innerContainer = te("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var a = $(), r = a.weekWrapper, u = a.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = u, e.weekWrapper = r;
      }
      e.rContainer = te("div", "flatpickr-rContainer"), e.rContainer.appendChild(V()), e.daysContainer || (e.daysContainer = te("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), K(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(pe()), $e(e.calendarContainer, "rangeMode", e.config.mode === "range"), $e(e.calendarContainer, "animate", e.config.animate === !0), $e(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var b = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!b && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var C = te("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(C, e.element), C.appendChild(e.element), e.altInput && C.appendChild(e.altInput), C.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function L(n, a, r, u) {
    var b = ke(a, !0), C = te("span", n, a.getDate().toString());
    return C.dateObj = a, C.$i = u, C.setAttribute("aria-label", e.formatDate(a, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && Le(a, e.now) === 0 && (e.todayDateElem = C, C.classList.add("today"), C.setAttribute("aria-current", "date")), b ? (C.tabIndex = -1, Mt(a) && (C.classList.add("selected"), e.selectedDateElem = C, e.config.mode === "range" && ($e(C, "startRange", e.selectedDates[0] && Le(a, e.selectedDates[0], !0) === 0), $e(C, "endRange", e.selectedDates[1] && Le(a, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && C.classList.add("inRange")))) : C.classList.add("flatpickr-disabled"), e.config.mode === "range" && Gt(a) && !Mt(a) && C.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && u % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(a) + "</span>"), de("onDayCreate", C), C;
  }
  function Z(n) {
    n.focus(), e.config.mode === "range" && Te(n);
  }
  function ie(n) {
    for (var a = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, u = a; u != r; u += n)
      for (var b = e.daysContainer.children[u], C = n > 0 ? 0 : b.children.length - 1, U = n > 0 ? b.children.length : -1, _ = C; _ != U; _ += n) {
        var J = b.children[_];
        if (J.className.indexOf("hidden") === -1 && ke(J.dateObj))
          return J;
      }
  }
  function be(n, a) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, u = a > 0 ? e.config.showMonths : -1, b = a > 0 ? 1 : -1, C = r - e.currentMonth; C != u; C += b)
      for (var U = e.daysContainer.children[C], _ = r - e.currentMonth === C ? n.$i + a : a < 0 ? U.children.length - 1 : 0, J = U.children.length, S = _; S >= 0 && S < J && S != (a > 0 ? J : -1); S += b) {
        var z = U.children[S];
        if (z.className.indexOf("hidden") === -1 && ke(z.dateObj) && Math.abs(n.$i - S) >= Math.abs(a))
          return Z(z);
      }
    e.changeMonth(b), E(ie(b), 0);
  }
  function E(n, a) {
    var r = d(), u = Oe(r || document.body), b = n !== void 0 ? n : u ? r : e.selectedDateElem !== void 0 && Oe(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Oe(e.todayDateElem) ? e.todayDateElem : ie(a > 0 ? 1 : -1);
    b === void 0 ? e._input.focus() : u ? be(b, a) : Z(b);
  }
  function G(n, a) {
    for (var r = (new Date(n, a, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, u = e.utils.getDaysInMonth((a - 1 + 12) % 12, n), b = e.utils.getDaysInMonth(a, n), C = window.document.createDocumentFragment(), U = e.config.showMonths > 1, _ = U ? "prevMonthDay hidden" : "prevMonthDay", J = U ? "nextMonthDay hidden" : "nextMonthDay", S = u + 1 - r, z = 0; S <= u; S++, z++)
      C.appendChild(L("flatpickr-day " + _, new Date(n, a - 1, S), S, z));
    for (S = 1; S <= b; S++, z++)
      C.appendChild(L("flatpickr-day", new Date(n, a, S), S, z));
    for (var oe = b + 1; oe <= 42 - r && (e.config.showMonths === 1 || z % 7 !== 0); oe++, z++)
      C.appendChild(L("flatpickr-day " + J, new Date(n, a + 1, oe % b), oe, z));
    var Ve = te("div", "dayContainer");
    return Ve.appendChild(C), Ve;
  }
  function K() {
    if (e.daysContainer !== void 0) {
      yt(e.daysContainer), e.weekNumbers && yt(e.weekNumbers);
      for (var n = document.createDocumentFragment(), a = 0; a < e.config.showMonths; a++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + a), n.appendChild(G(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Te();
    }
  }
  function X() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(u) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && u < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && u > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var a = 0; a < 12; a++)
        if (n(a)) {
          var r = te("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, a).getMonth().toString(), r.textContent = xt(a, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === a && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function ve() {
    var n = te("div", "flatpickr-month"), a = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = te("span", "cur-month") : (e.monthsDropdownContainer = te("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), y(e.monthsDropdownContainer, "change", function(U) {
      var _ = je(U), J = parseInt(_.value, 10);
      e.changeMonth(J - e.currentMonth), de("onMonthChange");
    }), X(), r = e.monthsDropdownContainer);
    var u = kt("cur-year", { tabindex: "-1" }), b = u.getElementsByTagName("input")[0];
    b.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && b.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (b.setAttribute("max", e.config.maxDate.getFullYear().toString()), b.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var C = te("div", "flatpickr-current-month");
    return C.appendChild(r), C.appendChild(u), a.appendChild(C), n.appendChild(a), {
      container: n,
      yearElement: b,
      monthElement: r
    };
  }
  function De() {
    yt(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var a = ve();
      e.yearElements.push(a.yearElement), e.monthElements.push(a.monthElement), e.monthNav.appendChild(a.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function fe() {
    return e.monthNav = te("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = te("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = te("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, De(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && ($e(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && ($e(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], bt(), e.monthNav;
  }
  function pe() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = Tt(e.config);
    e.timeContainer = te("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var a = te("span", "flatpickr-time-separator", ":"), r = kt("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var u = kt("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = u.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Ee(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : s(n.hours)), e.minuteElement.value = Ee(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(a), e.timeContainer.appendChild(u), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var b = kt("flatpickr-second");
      e.secondElement = b.getElementsByTagName("input")[0], e.secondElement.value = Ee(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(te("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(b);
    }
    return e.config.time_24hr || (e.amPM = te("span", "flatpickr-am-pm", e.l10n.amPM[Fe((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function V() {
    e.weekdayContainer ? yt(e.weekdayContainer) : e.weekdayContainer = te("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var a = te("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(a);
    }
    return m(), e.weekdayContainer;
  }
  function m() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, a = zt(e.l10n.weekdays.shorthand);
      n > 0 && n < a.length && (a = zt(a.splice(n, a.length), a.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + a.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function $() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = te("div", "flatpickr-weekwrapper");
    n.appendChild(te("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var a = te("div", "flatpickr-weeks");
    return n.appendChild(a), {
      weekWrapper: n,
      weekNumbers: a
    };
  }
  function T(n, a) {
    a === void 0 && (a = !0);
    var r = a ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, de("onYearChange"), X()), K(), de("onMonthChange"), bt());
  }
  function N(n, a) {
    if (n === void 0 && (n = !0), a === void 0 && (a = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, a === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = Tt(e.config), u = r.hours, b = r.minutes, C = r.seconds;
      D(u, b, C);
    }
    e.redraw(), n && de("onChange");
  }
  function se() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), de("onClose");
  }
  function He() {
    e.config !== void 0 && de("onDestroy");
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
  function ye(n) {
    return e.calendarContainer.contains(n);
  }
  function Be(n) {
    if (e.isOpen && !e.config.inline) {
      var a = je(n), r = ye(a), u = a === e.input || a === e.altInput || e.element.contains(a) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), b = !u && !r && !ye(n.relatedTarget), C = !e.config.ignoredFocusElements.some(function(U) {
        return U.contains(a);
      });
      b && C && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && c(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function Ce(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var a = n, r = e.currentYear !== a;
      e.currentYear = a || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), de("onYearChange"), X());
    }
  }
  function ke(n, a) {
    var r;
    a === void 0 && (a = !0);
    var u = e.parseDate(n, void 0, a);
    if (e.config.minDate && u && Le(u, e.config.minDate, a !== void 0 ? a : !e.minDateHasTime) < 0 || e.config.maxDate && u && Le(u, e.config.maxDate, a !== void 0 ? a : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (u === void 0)
      return !1;
    for (var b = !!e.config.enable, C = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, U = 0, _ = void 0; U < C.length; U++) {
      if (_ = C[U], typeof _ == "function" && _(u))
        return b;
      if (_ instanceof Date && u !== void 0 && _.getTime() === u.getTime())
        return b;
      if (typeof _ == "string") {
        var J = e.parseDate(_, void 0, !0);
        return J && J.getTime() === u.getTime() ? b : !b;
      } else if (typeof _ == "object" && u !== void 0 && _.from && _.to && u.getTime() >= _.from.getTime() && u.getTime() <= _.to.getTime())
        return b;
    }
    return !b;
  }
  function Oe(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function tt(n) {
    var a = n.target === e._input, r = e._input.value.trimEnd() !== Dt();
    a && r && !(n.relatedTarget && ye(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ge(n) {
    var a = je(n), r = e.config.wrap ? t.contains(a) : a === e._input, u = e.config.allowInput, b = e.isOpen && (!u || !r), C = e.config.inline && r && !u;
    if (n.keyCode === 13 && r) {
      if (u)
        return e.setDate(e._input.value, !0, a === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), a.blur();
      e.open();
    } else if (ye(a) || b || C) {
      var U = !!e.timeContainer && e.timeContainer.contains(a);
      switch (n.keyCode) {
        case 13:
          U ? (n.preventDefault(), c(), me()) : Se(n);
          break;
        case 27:
          n.preventDefault(), me();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!U && !r) {
            n.preventDefault();
            var _ = d();
            if (e.daysContainer !== void 0 && (u === !1 || _ && Oe(_))) {
              var J = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), T(J), E(ie(1), 0)) : E(void 0, J);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var S = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && a.$i !== void 0 || a === e.input || a === e.altInput ? n.ctrlKey ? (n.stopPropagation(), Ce(e.currentYear - S), E(ie(1), 0)) : U || E(void 0, S * 7) : a === e.currentYearElement ? Ce(e.currentYear - S) : e.config.enableTime && (!U && e.hourElement && e.hourElement.focus(), c(n), e._debouncedChange());
          break;
        case 9:
          if (U) {
            var z = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Ie) {
              return Ie;
            }), oe = z.indexOf(a);
            if (oe !== -1) {
              var Ve = z[oe + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (Ve || e._input).focus();
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
    (r || ye(a)) && de("onKeyDown", n);
  }
  function Te(n, a) {
    if (a === void 0 && (a = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(a) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), u = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), b = Math.min(r, e.selectedDates[0].getTime()), C = Math.max(r, e.selectedDates[0].getTime()), U = !1, _ = 0, J = 0, S = b; S < C; S += Ra.DAY)
        ke(new Date(S), !0) || (U = U || S > b && S < C, S < u && (!_ || S > _) ? _ = S : S > u && (!J || S < J) && (J = S));
      var z = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + a));
      z.forEach(function(oe) {
        var Ve = oe.dateObj, Ie = Ve.getTime(), ft = _ > 0 && Ie < _ || J > 0 && Ie > J;
        if (ft) {
          oe.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(it) {
            oe.classList.remove(it);
          });
          return;
        } else if (U && !ft)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(it) {
          oe.classList.remove(it);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), u < r && Ie === u ? oe.classList.add("startRange") : u > r && Ie === u && oe.classList.add("endRange"), Ie >= _ && (J === 0 || Ie <= J) && Va(Ie, u, r) && oe.classList.add("inRange"));
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
        var r = je(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), de("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var u = e.isOpen;
    e.isOpen = !0, u || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), de("onOpen"), qe(a)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function vt(n) {
    return function(a) {
      var r = e.config["_" + n + "Date"] = e.parseDate(a, e.config.dateFormat), u = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(b) {
        return ke(b);
      }), !e.selectedDates.length && n === "min" && x(r), We()), e.daysContainer && (P(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!u && r !== void 0 && u.getFullYear() === r.getFullYear());
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
    ], a = Me(Me({}, JSON.parse(JSON.stringify(t.dataset || {}))), o), r = {};
    e.config.parseDate = a.parseDate, e.config.formatDate = a.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(z) {
        e.config._enable = Ae(z);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(z) {
        e.config._disable = Ae(z);
      }
    });
    var u = a.mode === "time";
    if (!a.dateFormat && (a.enableTime || u)) {
      var b = he.defaultConfig.dateFormat || st.dateFormat;
      r.dateFormat = a.noCalendar || u ? "H:i" + (a.enableSeconds ? ":S" : "") : b + " H:i" + (a.enableSeconds ? ":S" : "");
    }
    if (a.altInput && (a.enableTime || u) && !a.altFormat) {
      var C = he.defaultConfig.altFormat || st.altFormat;
      r.altFormat = a.noCalendar || u ? "h:i" + (a.enableSeconds ? ":S K" : " K") : C + (" h:i" + (a.enableSeconds ? ":S" : "") + " K");
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
    var U = function(z) {
      return function(oe) {
        e.config[z === "min" ? "_minTime" : "_maxTime"] = e.parseDate(oe, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: U("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: U("max")
    }), a.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, a);
    for (var _ = 0; _ < n.length; _++)
      e.config[n[_]] = e.config[n[_]] === !0 || e.config[n[_]] === "true";
    St.filter(function(z) {
      return e.config[z] !== void 0;
    }).forEach(function(z) {
      e.config[z] = Et(e.config[z] || []).map(v);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var _ = 0; _ < e.config.plugins.length; _++) {
      var J = e.config.plugins[_](e) || {};
      for (var S in J)
        St.indexOf(S) > -1 ? e.config[S] = Et(J[S]).map(v).concat(e.config[S]) : typeof a[S] > "u" && (e.config[S] = J[S]);
    }
    a.altInputClass || (e.config.altInputClass = Ye().className + " " + e.config.altInputClass), de("onParseConfig");
  }
  function Ye() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Ke() {
    typeof e.config.locale != "object" && typeof he.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = Me(Me({}, he.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? he.l10ns[e.config.locale] : void 0), Je.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Je.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Je.M = "(" + e.l10n.months.shorthand.join("|") + ")", Je.F = "(" + e.l10n.months.longhand.join("|") + ")", Je.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = Me(Me({}, o), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && he.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Yt(e), e.parseDate = jt({ config: e.config, l10n: e.l10n });
  }
  function qe(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      de("onPreCalendarPosition");
      var a = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(an, on) {
        return an + on.offsetHeight;
      }, 0), u = e.calendarContainer.offsetWidth, b = e.config.position.split(" "), C = b[0], U = b.length > 1 ? b[1] : null, _ = a.getBoundingClientRect(), J = window.innerHeight - _.bottom, S = C === "above" || C !== "below" && J < r && _.top > r, z = window.pageYOffset + _.top + (S ? -r - 2 : a.offsetHeight + 2);
      if ($e(e.calendarContainer, "arrowTop", !S), $e(e.calendarContainer, "arrowBottom", S), !e.config.inline) {
        var oe = window.pageXOffset + _.left, Ve = !1, Ie = !1;
        U === "center" ? (oe -= (u - _.width) / 2, Ve = !0) : U === "right" && (oe -= u - _.width, Ie = !0), $e(e.calendarContainer, "arrowLeft", !Ve && !Ie), $e(e.calendarContainer, "arrowCenter", Ve), $e(e.calendarContainer, "arrowRight", Ie);
        var ft = window.document.body.offsetWidth - (window.pageXOffset + _.right), it = oe + u > window.document.body.offsetWidth, Zt = ft + u > window.document.body.offsetWidth;
        if ($e(e.calendarContainer, "rightMost", it), !e.config.static)
          if (e.calendarContainer.style.top = z + "px", !it)
            e.calendarContainer.style.left = oe + "px", e.calendarContainer.style.right = "auto";
          else if (!Zt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = ft + "px";
          else {
            var $t = Q();
            if ($t === void 0)
              return;
            var Jt = window.document.body.offsetWidth, Xt = Math.max(0, Jt / 2 - u / 2), Qt = ".flatpickr-calendar.centerMost:before", en = ".flatpickr-calendar.centerMost:after", tn = $t.cssRules.length, nn = "{left:" + _.left + "px;right:auto;}";
            $e(e.calendarContainer, "rightMost", !1), $e(e.calendarContainer, "centerMost", !0), $t.insertRule(Qt + "," + en + nn, tn), e.calendarContainer.style.left = Xt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function Q() {
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
    return n ?? R();
  }
  function R() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function P() {
    e.config.noCalendar || e.isMobile || (X(), bt(), K());
  }
  function me() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function Se(n) {
    n.preventDefault(), n.stopPropagation();
    var a = function(z) {
      return z.classList && z.classList.contains("flatpickr-day") && !z.classList.contains("flatpickr-disabled") && !z.classList.contains("notAllowed");
    }, r = Vt(je(n), a);
    if (r !== void 0) {
      var u = r, b = e.latestSelectedDateObj = new Date(u.dateObj.getTime()), C = (b.getMonth() < e.currentMonth || b.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = u, e.config.mode === "single")
        e.selectedDates = [b];
      else if (e.config.mode === "multiple") {
        var U = Mt(b);
        U ? e.selectedDates.splice(parseInt(U), 1) : e.selectedDates.push(b);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = b, e.selectedDates.push(b), Le(b, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(z, oe) {
        return z.getTime() - oe.getTime();
      }));
      if (w(), C) {
        var _ = e.currentYear !== b.getFullYear();
        e.currentYear = b.getFullYear(), e.currentMonth = b.getMonth(), _ && (de("onYearChange"), X()), de("onMonthChange");
      }
      if (bt(), K(), We(), !C && e.config.mode !== "range" && e.config.showMonths === 1 ? Z(u) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var J = e.config.mode === "single" && !e.config.enableTime, S = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (J || S) && me();
      }
      O();
    }
  }
  var Pe = {
    locale: [Ke, m],
    showMonths: [De, i, V],
    minDate: [ee],
    maxDate: [ee],
    positionElement: [ot],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (y(e._input, "focus", e.open), y(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function nt(n, a) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        Pe[r] !== void 0 && Pe[r].forEach(function(u) {
          return u();
        });
    } else
      e.config[n] = a, Pe[n] !== void 0 ? Pe[n].forEach(function(u) {
        return u();
      }) : St.indexOf(n) > -1 && (e.config[n] = Et(a));
    e.redraw(), We(!0);
  }
  function Re(n, a) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(u) {
        return e.parseDate(u, a);
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
          r = n.split(e.config.conjunction).map(function(u) {
            return e.parseDate(u, a);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(u) {
            return e.parseDate(u, a);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(u) {
      return u instanceof Date && ke(u, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(u, b) {
      return u.getTime() - b.getTime();
    });
  }
  function Ze(n, a, r) {
    if (a === void 0 && (a = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(a);
    Re(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), ee(void 0, a), x(), e.selectedDates.length === 0 && e.clear(!1), We(a), a && de("onChange");
  }
  function Ae(n) {
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
  function at() {
    if (e.input = Ye(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = te(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), ot();
  }
  function ot() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function rt() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = te("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    y(e.mobileInput, "change", function(a) {
      e.setDate(je(a).value, !1, e.mobileFormatStr), de("onChange"), de("onClose");
    });
  }
  function Ut(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function de(n, a) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var u = 0; r[u] && u < r.length; u++)
          r[u](e.selectedDates, e.input.value, e, a);
      n === "onChange" && (e.input.dispatchEvent(Ct("change")), e.input.dispatchEvent(Ct("input")));
    }
  }
  function Ct(n) {
    var a = document.createEvent("Event");
    return a.initEvent(n, !0, !0), a;
  }
  function Mt(n) {
    for (var a = 0; a < e.selectedDates.length; a++) {
      var r = e.selectedDates[a];
      if (r instanceof Date && Le(r, n) === 0)
        return "" + a;
    }
    return !1;
  }
  function Gt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : Le(n, e.selectedDates[0]) >= 0 && Le(n, e.selectedDates[1]) <= 0;
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
    }).filter(function(r, u, b) {
      return e.config.mode !== "range" || e.config.enableTime || b.indexOf(r) === u;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function We(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = Dt(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = Dt(e.config.altFormat)), n !== !1 && de("onValueUpdate");
  }
  function Kt(n) {
    var a = je(n), r = e.prevMonthNav.contains(a), u = e.nextMonthNav.contains(a);
    r || u ? T(r ? -1 : 1) : e.yearElements.indexOf(a) >= 0 ? a.select() : a.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : a.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function qt(n) {
    n.preventDefault();
    var a = n.type === "keydown", r = je(n), u = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[Fe(e.amPM.textContent === e.l10n.amPM[0])]);
    var b = parseFloat(u.getAttribute("min")), C = parseFloat(u.getAttribute("max")), U = parseFloat(u.getAttribute("step")), _ = parseInt(u.value, 10), J = n.delta || (a ? n.which === 38 ? 1 : -1 : 0), S = _ + U * J;
    if (typeof u.value < "u" && u.value.length === 2) {
      var z = u === e.hourElement, oe = u === e.minuteElement;
      S < b ? (S = C + S + Fe(!z) + (Fe(z) && Fe(!e.amPM)), oe && Y(void 0, -1, e.hourElement)) : S > C && (S = u === e.hourElement ? S - C - Fe(!e.amPM) : b, oe && Y(void 0, 1, e.hourElement)), e.amPM && z && (U === 1 ? S + _ === 23 : Math.abs(S - _) > U) && (e.amPM.textContent = e.l10n.amPM[Fe(e.amPM.textContent === e.l10n.amPM[0])]), u.value = Ee(S);
    }
  }
  return l(), e;
}
function lt(t, o) {
  for (var e = Array.prototype.slice.call(t).filter(function(v) {
    return v instanceof HTMLElement;
  }), h = [], l = 0; l < e.length; l++) {
    var d = e[l];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Ua(d, o || {}), h.push(d._flatpickr);
    } catch (v) {
      console.error(v);
    }
  }
  return h.length === 1 ? h[0] : h;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return lt(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return lt([this], t);
});
var he = function(t, o) {
  return typeof t == "string" ? lt(window.document.querySelectorAll(t), o) : t instanceof Node ? lt([t], o) : lt(t, o);
};
he.defaultConfig = {};
he.l10ns = {
  en: Me({}, pt),
  default: Me({}, pt)
};
he.localize = function(t) {
  he.l10ns.default = Me(Me({}, he.l10ns.default), t);
};
he.setDefaults = function(t) {
  he.defaultConfig = Me(Me({}, he.defaultConfig), t);
};
he.parseDate = jt({});
he.formatDate = Yt({});
he.compareDates = Le;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return lt(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = he);
var Ga = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ka(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Rt = { exports: {} };
(function(t, o) {
  (function(e, h) {
    t.exports = h();
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
      return e = Object.assign || function(k) {
        for (var s, w = 1, x = arguments.length; w < x; w++) {
          s = arguments[w];
          for (var D in s) Object.prototype.hasOwnProperty.call(s, D) && (k[D] = s[D]);
        }
        return k;
      }, e.apply(this, arguments);
    }, h = function(c, k, s) {
      return s.months[k ? "shorthand" : "longhand"][c];
    };
    function l(c) {
      for (; c.firstChild; )
        c.removeChild(c.firstChild);
    }
    function d(c) {
      try {
        if (typeof c.composedPath == "function") {
          var k = c.composedPath();
          return k[0];
        }
        return c.target;
      } catch {
        return c.target;
      }
    }
    var v = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function i(c) {
      var k = e(e({}, v), c);
      return function(s) {
        s.config.dateFormat = k.dateFormat, s.config.altFormat = k.altFormat;
        var w = { monthsContainer: null };
        function x() {
          if (s.rContainer) {
            l(s.rContainer);
            for (var E = 0; E < s.monthElements.length; E++) {
              var G = s.monthElements[E];
              G.parentNode && G.parentNode.removeChild(G);
            }
          }
        }
        function D() {
          s.rContainer && (w.monthsContainer = s._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, B(), s.rContainer.appendChild(w.monthsContainer), s.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + k.theme));
        }
        function B() {
          if (w.monthsContainer) {
            l(w.monthsContainer);
            for (var E = document.createDocumentFragment(), G = 0; G < 12; G++) {
              var K = s.createDay("flatpickr-monthSelect-month", new Date(s.currentYear, G), 0, G);
              K.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && K.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && K.classList.add("today"), K.textContent = h(G, k.shorthand, s.l10n), K.addEventListener("click", ee), E.appendChild(K);
            }
            w.monthsContainer.appendChild(E), s.config.minDate && s.currentYear === s.config.minDate.getFullYear() ? s.prevMonthNav.classList.add("flatpickr-disabled") : s.prevMonthNav.classList.remove("flatpickr-disabled"), s.config.maxDate && s.currentYear === s.config.maxDate.getFullYear() ? s.nextMonthNav.classList.add("flatpickr-disabled") : s.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function y() {
          s._bind(s.prevMonthNav, "click", function(E) {
            E.preventDefault(), E.stopPropagation(), s.changeYear(s.currentYear - 1), q(), B();
          }), s._bind(s.nextMonthNav, "click", function(E) {
            E.preventDefault(), E.stopPropagation(), s.changeYear(s.currentYear + 1), q(), B();
          }), s._bind(w.monthsContainer, "mouseover", function(E) {
            s.config.mode === "range" && s.onMouseOver(d(E), "flatpickr-monthSelect-month");
          });
        }
        function O() {
          if (s.rContainer && s.selectedDates.length) {
            for (var E = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), G = 0; G < E.length; G++)
              E[G].classList.remove("selected");
            var K = s.selectedDates[0].getMonth(), X = s.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (K + 1) + ")");
            X && X.classList.add("selected");
          }
        }
        function q() {
          var E = s.selectedDates[0];
          if (E && (E = new Date(E), E.setFullYear(s.currentYear), s.config.minDate && E < s.config.minDate && (E = s.config.minDate), s.config.maxDate && E > s.config.maxDate && (E = s.config.maxDate), s.currentYear = E.getFullYear()), s.currentYearElement.value = String(s.currentYear), s.rContainer) {
            var G = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            G.forEach(function(K) {
              K.dateObj.setFullYear(s.currentYear), s.config.minDate && K.dateObj < s.config.minDate || s.config.maxDate && K.dateObj > s.config.maxDate ? K.classList.add("flatpickr-disabled") : K.classList.remove("flatpickr-disabled");
            });
          }
          O();
        }
        function ee(E) {
          E.preventDefault(), E.stopPropagation();
          var G = d(E);
          if (G instanceof Element && !G.classList.contains("flatpickr-disabled") && !G.classList.contains("notAllowed") && (ne(G.dateObj), s.config.closeOnSelect)) {
            var K = s.config.mode === "single", X = s.config.mode === "range" && s.selectedDates.length === 2;
            (K || X) && s.close();
          }
        }
        function ne(E) {
          var G = new Date(s.currentYear, E.getMonth(), E.getDate()), K = [];
          switch (s.config.mode) {
            case "single":
              K = [G];
              break;
            case "multiple":
              K.push(G);
              break;
            case "range":
              s.selectedDates.length === 2 ? K = [G] : (K = s.selectedDates.concat([G]), K.sort(function(X, ve) {
                return X.getTime() - ve.getTime();
              }));
              break;
          }
          s.setDate(K, !0), O();
        }
        var Y = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function W(E, G, K, X) {
          var ve = Y[X.keyCode] !== void 0;
          if (!(!ve && X.keyCode !== 13) && !(!s.rContainer || !w.monthsContainer)) {
            var De = s.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), fe = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (fe === -1) {
              var pe = De || w.monthsContainer.firstElementChild;
              pe.focus(), fe = pe.$i;
            }
            ve ? w.monthsContainer.children[(12 + fe + Y[X.keyCode]) % 12].focus() : X.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && ne(document.activeElement.dateObj);
          }
        }
        function L() {
          var E;
          ((E = s.config) === null || E === void 0 ? void 0 : E.mode) === "range" && s.selectedDates.length === 1 && s.clear(!1), s.selectedDates.length || B();
        }
        function Z() {
          k._stubbedCurrentMonth = s._initialDate.getMonth(), s._initialDate.setMonth(k._stubbedCurrentMonth), s.currentMonth = k._stubbedCurrentMonth;
        }
        function ie() {
          k._stubbedCurrentMonth && (s._initialDate.setMonth(k._stubbedCurrentMonth), s.currentMonth = k._stubbedCurrentMonth, delete k._stubbedCurrentMonth);
        }
        function be() {
          if (w.monthsContainer !== null)
            for (var E = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), G = 0; G < E.length; G++)
              E[G].removeEventListener("click", ee);
        }
        return {
          onParseConfig: function() {
            s.config.enableTime = !1;
          },
          onValueUpdate: O,
          onKeyDown: W,
          onReady: [
            Z,
            x,
            D,
            y,
            O,
            function() {
              s.config.onClose.push(L), s.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            ie,
            be,
            function() {
              s.config.onClose = s.config.onClose.filter(function(E) {
                return E !== L;
              });
            }
          ]
        };
      };
    }
    return i;
  });
})(Rt);
var qa = Rt.exports;
const Za = /* @__PURE__ */ Ka(qa), Ja = { class: "relative" }, Xa = ["placeholder", "disabled", "readonly"], Qa = {
  key: 1,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, eo = { class: "flex items-center justify-between mb-2" }, to = { class: "text-xs opacity-70" }, no = { class: "grid grid-cols-4 gap-2" }, ao = ["onClick"], Cr = /* @__PURE__ */ re({
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
  setup(t, { emit: o }) {
    const e = t, h = o, l = I(null), d = I(!1), v = I((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let i = null;
    const c = M(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), k = M(() => e.displayFormat ? e.displayFormat : e.picker === "month" ? "M" : c.value), s = M(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), w = M(() => e.picker !== "year-grid" ? {} : { value: s.value }), x = M(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), D = M(
      () => e.clearable && x.value && !e.disabled && !e.readonly
    ), B = () => {
      var Y;
      if (e.mode === "range" ? h("update:modelValue", []) : h("update:modelValue", ""), e.picker === "year-grid") {
        d.value = !1;
        return;
      }
      (Y = i == null ? void 0 : i.clear) == null || Y.call(i, !1);
    }, y = () => {
      var Y, W;
      if (l.value) {
        if (e.picker === "year-grid") {
          (Y = i == null ? void 0 : i.destroy) == null || Y.call(i), i = null;
          return;
        }
        (W = i == null ? void 0 : i.destroy) == null || W.call(i), i = he(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Za({
              shorthand: !0,
              dateFormat: c.value,
              altFormat: k.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: c.value,
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
            var L, Z;
            e.picker === "month" && ((L = i == null ? void 0 : i.calendarContainer) == null || L.classList.add("flatpickr-month-only")), e.picker === "year" && ((Z = i == null ? void 0 : i.calendarContainer) == null || Z.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var L, Z;
            e.picker === "month" && ((L = i == null ? void 0 : i.calendarContainer) == null || L.classList.add("flatpickr-month-only")), e.picker === "year" && ((Z = i == null ? void 0 : i.calendarContainer) == null || Z.classList.add("flatpickr-year-only"));
          },
          onChange: (L) => {
            if (e.mode === "range") {
              const Z = L.map(
                (ie) => i.formatDate(ie, c.value)
              );
              h("update:modelValue", Z);
            } else {
              const Z = L[0] ? i.formatDate(L[0], c.value) : "";
              h("update:modelValue", Z);
            }
          }
        });
      }
    }, O = () => {
      var Y;
      if (e.picker === "year-grid") {
        d.value = !0;
        return;
      }
      (Y = i == null ? void 0 : i.open) == null || Y.call(i);
    };
    ct(y), et(() => {
      var Y;
      return (Y = i == null ? void 0 : i.destroy) == null ? void 0 : Y.call(i);
    }), le(
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
      y
    ), le(
      () => e.modelValue,
      (Y) => {
        !i || e.picker === "year-grid" || i.setDate(Y, !1);
      }
    );
    const q = M(
      () => Array.from({ length: 12 }, (Y, W) => v.value + W)
    ), ee = (Y) => {
      h("update:modelValue", Y.toString()), d.value = !1;
    }, ne = (Y) => {
      if (!d.value) return;
      const W = Y.target;
      if (l.value && W && l.value.contains(W)) return;
      const L = document.querySelector(".mitreka-year-grid");
      L && W && L.contains(W) || (d.value = !1);
    };
    return ct(() => document.addEventListener("click", ne)), et(() => document.removeEventListener("click", ne)), (Y, W) => (f(), g("div", Ja, [
      p("input", Lt({
        ref_key: "inputEl",
        ref: l,
        class: ["input w-full", [t.inputClass, D.value ? "pr-9" : ""]],
        placeholder: t.placeholder
      }, w.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: O,
        onFocus: O
      }), null, 16, Xa),
      D.value ? (f(), g("button", {
        key: 0,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: W[0] || (W[0] = xe(() => {
        }, ["prevent"])),
        onClick: xe(B, ["stop"])
      }, [...W[3] || (W[3] = [
        p("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "h-4 w-4",
          "aria-hidden": "true"
        }, [
          p("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 6l12 12M18 6L6 18"
          })
        ], -1)
      ])], 32)) : j("", !0),
      t.picker === "year-grid" && d.value ? (f(), g("div", Qa, [
        p("div", eo, [
          p("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: W[1] || (W[1] = (L) => v.value -= 12)
          }, " Prev "),
          p("div", to, F(v.value) + " - " + F(v.value + 11), 1),
          p("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: W[2] || (W[2] = (L) => v.value += 12)
          }, " Next ")
        ]),
        p("div", no, [
          (f(!0), g(ge, null, _e(q.value, (L) => (f(), g("button", {
            key: L,
            class: H(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === L.toString() }]),
            type: "button",
            onClick: (Z) => ee(L)
          }, F(L), 11, ao))), 128))
        ])
      ])) : j("", !0)
    ]));
  }
}), Mr = /* @__PURE__ */ re({
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
    const e = t, h = o, l = Nt(), d = I(null), v = I(null), i = I(13), c = I(!1);
    let k = null, s = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], x = [], D = I("normal"), B = M(() => [
      "w-full",
      D.value === "autoHeight" ? "h-auto" : "h-full"
    ]), y = M(() => D.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), O = () => {
      const m = document.documentElement, $ = m.classList.contains("dark"), T = (m.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      c.value = $ || T;
    }, q = M(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : c.value), ee = M(() => q.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), ne = M(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), Y = M(() => ["agx", ee.value, ne.value, l.class]), W = M(() => [{ "--ag-odd-row-background-color": e.striped ? q.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), L = M(() => {
      const { class: m, style: $, onGridReady: T, ...N } = l;
      return N;
    }), Z = (m) => typeof m == "number" && Number.isFinite(m) ? m : void 0, ie = M(() => {
      const m = l.gridOptions;
      if (m && typeof m == "object") return m;
      const $ = l["grid-options"];
      return $ && typeof $ == "object" ? $ : {};
    }), be = (m) => {
      const $ = Z(l[m]);
      if (typeof $ == "number") return $;
      const N = Z(l[m === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof N == "number" ? N : Z(ie.value[m]);
    }, E = () => {
      const m = l.domLayout;
      if (typeof m == "string" && m.length > 0) return m;
      const $ = l["dom-layout"];
      if (typeof $ == "string" && $.length > 0) return $;
      const T = ie.value.domLayout;
      return typeof T == "string" && T.length > 0 ? T : void 0;
    }, G = () => {
      var $, T;
      if (!v.value) return 0;
      const m = (N) => typeof N == "number" && Number.isFinite(N) && N >= 0;
      if (typeof v.value.getDisplayedRowCount == "function") {
        const N = v.value.getDisplayedRowCount();
        if (m(N)) return N;
      }
      if (typeof v.value.paginationGetRowCount == "function") {
        const N = v.value.paginationGetRowCount();
        if (m(N)) return N;
      }
      if (typeof v.value.getModel == "function") {
        const N = (T = ($ = v.value).getModel) == null ? void 0 : T.call($), se = N && typeof N.getRowCount == "function" ? N.getRowCount() : void 0;
        if (m(se)) return se;
      }
      return 0;
    }, K = () => {
      const m = Number(e.autoHeightThreshold);
      return Number.isFinite(m) ? Math.max(1, Math.floor(m)) : 15;
    }, X = () => {
      if (!v.value) return;
      const m = E();
      if (m) {
        D.value = m, v.value.setGridOption("domLayout", m);
        return;
      }
      const $ = e.autoHeightWhenFewRows && G() < K() ? "autoHeight" : "normal";
      D.value = $, v.value.setGridOption("domLayout", $);
    }, ve = () => {
      var m;
      for (; x.length > 0; )
        (m = x.pop()) == null || m();
    }, De = () => {
      if (!v.value) return;
      ve();
      const m = () => X();
      w.forEach(($) => {
        v.value.addEventListener($, m), x.push(() => {
          var T;
          (T = v.value) == null || T.removeEventListener($, m);
        });
      });
    }, fe = () => {
      if (!e.autoHeaderHeight || !v.value) return;
      const m = be("headerHeight") ?? pn(e.density), $ = be("groupHeaderHeight") ?? gn(e.density);
      v.value.setGridOption("headerHeight", m), v.value.setGridOption("groupHeaderHeight", $);
    }, pe = () => {
      if (!e.autoRowHeight || !v.value) return;
      const m = vn(i.value, e.density);
      v.value.setGridOption("rowHeight", m), v.value.setGridOption("getRowHeight", () => m), v.value.resetRowHeights();
    }, V = (m) => {
      v.value = m.api, i.value = mn(d.value), De(), fe(), X(), pe(), requestAnimationFrame(() => X()), h("grid-ready", m);
    };
    return le(
      () => e.density,
      () => {
        var m;
        fe(), pe(), (m = v.value) == null || m.refreshCells({ force: !0 });
      }
    ), le(
      () => [
        l.headerHeight,
        l["header-height"],
        l.groupHeaderHeight,
        l["group-header-height"],
        l.gridOptions,
        l["grid-options"]
      ],
      () => {
        fe();
      }
    ), le(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        X();
      }
    ), le(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        X();
      }
    ), le(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => X());
      }
    ), ct(() => {
      O(), e.autoObserveTheme && (k = new MutationObserver(O), k.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (s = hn(d.value));
    }), et(() => {
      k == null || k.disconnect(), ve(), s == null || s();
    }), (m, $) => (f(), g("div", {
      ref_key: "hostRef",
      ref: d,
      class: H(B.value),
      style: we(y.value)
    }, [
      ae(A(yn), Lt(L.value, {
        class: Y.value,
        theme: "legacy",
        style: W.value,
        onGridReady: V
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), oo = ["disabled"], ro = ["onMouseenter", "onClick", "aria-selected"], io = 320, so = 12, Dr = /* @__PURE__ */ re({
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
    const e = t, h = o, l = I(null), d = I(null), v = I(null), i = I(!1), c = I(-1), k = I(0), s = I(0), w = I(0), x = I(240), D = I(null), B = I(!1), y = M(
      () => e.options.find((V) => V.value === e.modelValue) ?? null
    ), O = M(() => {
      var V;
      return ((V = y.value) == null ? void 0 : V.label) ?? e.placeholder;
    }), q = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, ee = {
      default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
      primary: "bg-primary border-primary text-primary-content hover:brightness-95",
      secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
      accent: "bg-accent border-accent text-accent-content hover:brightness-95",
      info: "bg-info border-info text-info-content hover:brightness-95",
      success: "bg-success border-success text-success-content hover:brightness-95",
      warning: "bg-warning border-warning text-warning-content hover:brightness-95",
      error: "bg-error border-error text-error-content hover:brightness-95"
    }, ne = {
      default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
      primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
      secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
      accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
      info: "bg-transparent border-info text-info hover:bg-info/10",
      success: "bg-transparent border-success text-success hover:bg-success/10",
      warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
      error: "bg-transparent border-error text-error hover:bg-error/10"
    }, Y = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, W = M(() => {
      const V = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", m = q[e.size], $ = e.variant === "outline" ? ne[e.color] : ee[e.color], T = e.disabled ? "opacity-60 cursor-not-allowed" : "", N = i.value ? `ring-3 ${Y[e.color]}` : "";
      return [V, m, $, T, N].join(" ");
    }), L = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, Z = M(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), ie = (V) => {
      const m = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: m,
        backgroundColor: V ? "var(--color-base-200)" : "transparent"
      } : {
        color: m,
        backgroundColor: V ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, be = M(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), E = M(() => ({
      top: `${k.value}px`,
      left: `${s.value}px`,
      width: `${w.value}px`
    })), G = M(() => ({
      maxHeight: `${x.value}px`
    })), K = () => {
      if (!i.value || !d.value || !v.value) return;
      const V = d.value.getBoundingClientRect(), m = window.innerWidth, $ = window.innerHeight, T = 6, N = so, se = v.value.scrollHeight || v.value.offsetHeight || 240;
      D.value == null && (D.value = se);
      const He = D.value, ye = $ - V.bottom - T - N, Be = V.top - T - N, Ce = ye < 180 && Be > ye;
      B.value = Ce;
      const Oe = Math.min(io, He, Math.max(0, Ce ? Be : ye));
      x.value = Math.max(64, Oe), w.value = Math.max(160, V.width), s.value = Math.min(
        Math.max(V.left, N),
        m - w.value - N
      ), Ce ? k.value = Math.max(N, V.top - T - x.value) : k.value = Math.min(
        $ - N - x.value,
        V.bottom + T
      );
    }, X = () => {
      e.disabled || (i.value = !i.value, i.value && (c.value = e.options.findIndex((V) => V.value === e.modelValue), ze(K)));
    }, ve = (V) => {
      V.disabled || (h("update:modelValue", V.value), h("change", V.value), i.value = !1);
    }, De = (V) => {
      if (!e.disabled)
        switch (V.key) {
          case "Enter":
          case " ":
            if (V.preventDefault(), i.value && c.value >= 0) {
              const m = e.options[c.value];
              m && !m.disabled && ve(m);
            } else
              X();
            break;
          case "Escape":
            i.value = !1;
            break;
          case "ArrowDown":
            V.preventDefault(), i.value ? c.value = Math.min(c.value + 1, e.options.length - 1) : (i.value = !0, c.value = 0, ze(K));
            break;
          case "ArrowUp":
            V.preventDefault(), i.value && (c.value = Math.max(c.value - 1, 0));
            break;
        }
    }, fe = (V) => {
      var N, se;
      const m = V.target, $ = !!((N = l.value) != null && N.contains(m)), T = !!((se = v.value) != null && se.contains(m));
      !$ && !T && (i.value = !1);
    }, pe = (V) => {
      var $;
      if (!i.value) return;
      const m = V == null ? void 0 : V.target;
      m && (($ = v.value) != null && $.contains(m)) || K();
    };
    return le(
      () => [i.value, e.options.length],
      async ([V]) => {
        if (!V) {
          D.value = null;
          return;
        }
        await ze(), K();
      }
    ), ct(() => {
      document.addEventListener("click", fe), window.addEventListener("resize", pe), window.addEventListener("scroll", pe, !0);
    }), et(() => {
      document.removeEventListener("click", fe), window.removeEventListener("resize", pe), window.removeEventListener("scroll", pe, !0);
    }), (V, m) => (f(), g("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      p("button", {
        ref_key: "triggerRef",
        ref: d,
        type: "button",
        class: H(W.value),
        disabled: t.disabled,
        onClick: X,
        onKeydown: De
      }, [
        p("span", {
          class: H([y.value ? "" : "opacity-60"])
        }, F(O.value), 3),
        ae(ce, {
          name: i.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, oo),
      (f(), Ue(ut, { to: "body" }, [
        ae(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            i.value ? (f(), g("div", {
              key: 0,
              ref_key: "menuRef",
              ref: v,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: we([Z.value, E.value])
            }, [
              p("ul", {
                class: "overflow-auto",
                style: we(G.value),
                role: "listbox"
              }, [
                (f(!0), g(ge, null, _e(t.options, ($, T) => {
                  var N, se, He;
                  return f(), g("li", {
                    key: $.value,
                    class: H([
                      L[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      $.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((N = y.value) == null ? void 0 : N.value) === $.value ? "font-medium" : ""
                    ]),
                    style: we(ie(T === c.value)),
                    onMouseenter: (ye) => c.value = T,
                    onClick: (ye) => $.disabled ? null : ve($),
                    role: "option",
                    "aria-selected": ((se = y.value) == null ? void 0 : se.value) === $.value
                  }, [
                    p("span", null, F($.label), 1),
                    ((He = y.value) == null ? void 0 : He.value) === $.value ? (f(), Ue(ce, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: we(be.value)
                    }, null, 8, ["style"])) : j("", !0)
                  ], 46, ro);
                }), 128))
              ], 4)
            ], 4)) : j("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), lo = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, co = ["disabled", "placeholder", "value", "readonly"], uo = ["disabled"], fo = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, ho = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], po = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, go = 320, vo = 12, $r = /* @__PURE__ */ re({
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
    const e = t, h = o, l = I(e.modelValue ?? null);
    le(
      () => e.modelValue,
      (m) => l.value = m ?? null
    ), le(l, (m) => h("update:modelValue", m));
    const {
      root: d,
      inputEl: v,
      menu: i,
      open: c,
      query: k,
      hoverIdx: s,
      loading: w,
      filtered: x,
      selected: D,
      openMenu: B,
      closeMenu: y,
      choose: O,
      clear: q,
      onKey: ee
    } = wn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), ne = I(null), Y = I(null), W = I(0), L = I(0), Z = I(0), ie = I(240), be = I(null), E = I(!1), G = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, K = (m) => !m || m === "default" ? "input" : `input input-${m}`, X = M(
      () => {
        var m;
        return c.value ? k.value : ((m = D.value) == null ? void 0 : m.label) ?? "";
      }
    ), ve = M(() => ({
      top: `${W.value}px`,
      left: `${L.value}px`,
      width: `${Z.value}px`
    })), De = M(() => ({
      maxHeight: `${ie.value}px`
    })), fe = () => {
      var Ge, Te;
      if (!c.value || !ne.value) return;
      const m = ne.value.getBoundingClientRect(), $ = window.innerWidth, T = window.innerHeight, N = 6, se = vo, He = (((Ge = Y.value) == null ? void 0 : Ge.scrollHeight) ?? 0) || (((Te = i.value) == null ? void 0 : Te.scrollHeight) ?? 0) || 240;
      be.value == null && (be.value = He);
      const ye = be.value, Be = T - m.bottom - N - se, Ce = m.top - N - se, ke = Be < 180 && Ce > Be;
      E.value = ke;
      const tt = Math.min(go, ye, Math.max(0, ke ? Ce : Be));
      ie.value = Math.max(64, tt), Z.value = Math.max(220, m.width), L.value = Math.min(
        Math.max(m.left, se),
        $ - Z.value - se
      ), ke ? W.value = Math.max(se, m.top - N - ie.value) : W.value = Math.min(
        T - se - ie.value,
        m.bottom + N
      );
    }, pe = (m) => {
      var T;
      if (!c.value) return;
      const $ = m == null ? void 0 : m.target;
      $ && ((T = Y.value) != null && T.contains($)) || fe();
    };
    function V() {
      if (!e.disabled) {
        if (c.value) {
          y();
          return;
        }
        B(), ze(fe);
      }
    }
    return le(
      () => [c.value, w.value, x.value.length],
      async ([m]) => {
        m && (await ze(), fe());
      }
    ), le(c, (m) => {
      if (!m) {
        be.value = null;
        return;
      }
      ze(fe);
    }), ct(() => {
      window.addEventListener("resize", pe), window.addEventListener("scroll", pe, !0);
    }), et(() => {
      window.removeEventListener("resize", pe), window.removeEventListener("scroll", pe, !0);
    }), (m, $) => (f(), g("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      p("div", {
        ref_key: "triggerRef",
        ref: ne,
        class: "relative"
      }, [
        p("span", lo, [
          ae(ce, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        p("input", {
          ref_key: "inputEl",
          ref: v,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: X.value,
          onFocus: $[0] || ($[0] = //@ts-ignore
          (...T) => A(B) && A(B)(...T)),
          onClick: $[1] || ($[1] = //@ts-ignore
          (...T) => A(B) && A(B)(...T)),
          onKeydown: $[2] || ($[2] = //@ts-ignore
          (...T) => A(ee) && A(ee)(...T)),
          readonly: !A(c),
          class: H([
            G[t.size || "md"],
            K(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: $[3] || ($[3] = (T) => A(c) ? k.value = T.target.value : null)
        }, null, 42, co),
        t.clearable && A(D) && !t.disabled ? (f(), g("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onClick: $[4] || ($[4] = //@ts-ignore
          (...T) => A(q) && A(q)(...T))
        }, [
          ae(ce, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : j("", !0),
        p("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onClick: V,
          disabled: t.disabled
        }, [
          ae(ce, {
            name: A(c) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 8, uo)
      ], 512),
      (f(), Ue(ut, { to: "body" }, [
        ae(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": E.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": E.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            A(c) ? (f(), g("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: Y,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: we(ve.value)
            }, [
              A(w) ? (f(), g("div", fo, "Loading...")) : (f(), g("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: we(De.value),
                role: "listbox"
              }, [
                (f(!0), g(ge, null, _e(A(x), (T, N) => {
                  var se, He;
                  return f(), g("li", {
                    key: T.value,
                    "data-idx": N,
                    class: H([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      N === A(s) ? "bg-base-200" : "",
                      T.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (ye) => s.value = N,
                    onMousedown: xe((ye) => T.disabled ? null : A(O)(T), ["prevent"]),
                    role: "option",
                    "aria-selected": ((se = A(D)) == null ? void 0 : se.value) === T.value
                  }, [
                    p("span", null, F(T.label), 1),
                    ((He = A(D)) == null ? void 0 : He.value) === T.value ? (f(), Ue(ce, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : j("", !0)
                  ], 42, ho);
                }), 128)),
                !A(x).length && !A(w) ? (f(), g("li", po, " No results ")) : j("", !0)
              ], 4))
            ], 4)) : j("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), mo = { class: "truncate" }, wo = ["onClick"], bo = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, yo = {
  key: 1,
  class: "flex-1 min-w-0"
}, ko = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, xo = { class: "truncate" }, Co = ["onClick"], Mo = { class: "flex items-center gap-2 w-full" }, Do = { class: "flex-1 min-w-[8ch]" }, $o = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, So = { class: "truncate" }, Eo = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, _o = ["onMousedown"], Ho = ["checked"], To = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Ao = 320, Io = 12, jo = /* @__PURE__ */ re({
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
    const e = t, h = o, l = I(e.modelValue ?? []);
    le(
      () => e.modelValue,
      (Q) => l.value = Q ?? []
    ), le(l, (Q) => h("update:modelValue", Q));
    const {
      root: d,
      inputEl: v,
      menu: i,
      open: c,
      query: k,
      loading: s,
      filtered: w,
      selectedList: x,
      openMenu: D,
      toggle: B,
      clearAll: y,
      onKey: O
    } = bn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), q = I(null), ee = I(null), ne = I(0), Y = I(0), W = I(0), L = I(240), Z = I(null), ie = I(!1), be = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, E = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, G = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, K = {
      xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
      md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
      lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" }
    }, X = {
      xs: "badge-xs text-xs",
      sm: "badge-sm text-sm",
      md: "text-sm",
      lg: "badge-lg text-lg",
      xl: "badge-xl text-xl"
    }, ve = {
      xs: "-mr-2 h-4 w-4",
      sm: "-mr-2.5 h-5 w-5",
      md: "-mr-3 h-6 w-6",
      lg: "-mr-3 h-7 w-7",
      xl: "-mr-3 h-8 w-8"
    }, De = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, fe = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, pe = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, V = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, m = M(() => e.displayMode ?? "stacked"), $ = M(() => m.value === "inline-compact"), T = M(
      () => E[e.size || "md"]
    ), N = M(
      () => G[T.value]
    ), se = M(
      () => K[T.value]
    ), He = M(() => ({
      top: `${ne.value}px`,
      left: `${Y.value}px`,
      width: `${W.value}px`
    })), ye = M(() => ({
      maxHeight: `${L.value}px`
    })), Be = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), Ce = (Q) => l.value.some((R) => String(R) === String(Q)), ke = M(() => [...w.value].sort((Q, R) => {
      const P = Ce(Q.value), me = Ce(R.value);
      return P !== me ? P ? -1 : 1 : Be.compare(Q.label, R.label);
    })), Oe = I(null), tt = I(null), Ge = I([]), Te = I(0);
    let Ne = null;
    const gt = M(
      () => Math.max(0, x.value.length - Te.value)
    );
    function vt(Q, R) {
      Q && (Ge.value[R] = Q);
    }
    function mt() {
      var nt, Re, Ze;
      if (!$.value) {
        Te.value = x.value.length;
        return;
      }
      const Q = ((nt = Oe.value) == null ? void 0 : nt.clientWidth) ?? 0, R = x.value.length;
      if (!Q || R === 0) {
        Te.value = R;
        return;
      }
      const P = ((Re = tt.value) == null ? void 0 : Re.offsetWidth) ?? 28, me = 6;
      let Se = 0, Pe = 0;
      for (let Ae = 0; Ae < R; Ae += 1) {
        const wt = ((Ze = Ge.value[Ae]) == null ? void 0 : Ze.offsetWidth) ?? 0, at = Se + (Ae > 0 ? me : 0) + wt, rt = R - (Ae + 1) > 0 ? me + P : 0;
        if (at + rt <= Q)
          Se = at, Pe = Ae + 1;
        else
          break;
      }
      Pe === 0 && R > 0 && (Pe = 1), Te.value = Pe;
    }
    const Ye = () => {
      var ot, rt;
      if (!c.value || !q.value) return;
      const Q = q.value.getBoundingClientRect(), R = window.innerWidth, P = window.innerHeight, me = 6, Se = Io, Pe = (((ot = ee.value) == null ? void 0 : ot.scrollHeight) ?? 0) || (((rt = i.value) == null ? void 0 : rt.scrollHeight) ?? 0) || 240;
      Z.value == null && (Z.value = Pe);
      const nt = Z.value, Re = P - Q.bottom - me - Se, Ze = Q.top - me - Se, Ae = Re < 180 && Ze > Re;
      ie.value = Ae;
      const at = Math.min(Ao, nt, Math.max(0, Ae ? Ze : Re));
      L.value = Math.max(64, at), W.value = Math.max(260, Q.width), Y.value = Math.min(
        Math.max(Q.left, Se),
        R - W.value - Se
      ), Ae ? ne.value = Math.max(Se, Q.top - me - L.value) : ne.value = Math.min(
        P - Se - L.value,
        Q.bottom + me
      );
    }, Ke = (Q) => {
      var P;
      if (!c.value) return;
      const R = Q == null ? void 0 : Q.target;
      R && ((P = ee.value) != null && P.contains(R)) || Ye();
    };
    async function qe() {
      await ze(), mt();
    }
    return le(
      () => [x.value.length, e.size, e.displayMode, k.value],
      () => {
        qe();
      },
      { immediate: !0 }
    ), le(ke, () => {
      qe();
    }), le(
      () => [c.value, s.value, ke.value.length],
      async ([Q]) => {
        if (!Q) {
          Z.value = null;
          return;
        }
        await ze(), Ye();
      }
    ), le(Oe, (Q) => {
      Ne == null || Ne.disconnect(), Ne = null, Q && (Ne = new ResizeObserver(() => {
        mt();
      }), Ne.observe(Q));
    }), ct(() => {
      window.addEventListener("resize", Ke), window.addEventListener("scroll", Ke, !0);
    }), et(() => {
      Ne == null || Ne.disconnect(), window.removeEventListener("resize", Ke), window.removeEventListener("scroll", Ke, !0);
    }), (Q, R) => (f(), g("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      p("div", {
        ref_key: "triggerRef",
        ref: q,
        class: H([
          m.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          be[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: R[10] || (R[10] = //@ts-ignore
        (...P) => A(D) && A(D)(...P))
      }, [
        m.value === "inline-compact" ? (f(), g(ge, { key: 0 }, [
          p("span", {
            class: H(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", fe[t.size || "md"]])
          }, F(t.placeholder || "Select options..."), 3),
          A(x).length ? (f(), g("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Oe,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (f(!0), g(ge, null, _e(A(x).slice(0, Te.value), (P) => (f(), g("span", {
              key: P.value,
              class: H(["badge badge-soft-primary gap-1 max-w-[12rem]", X[t.size || "md"]])
            }, [
              p("span", mo, F(P.label), 1),
              p("button", {
                type: "button",
                class: H([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ve[t.size || "md"]
                ]),
                onClick: xe((me) => A(B)(P.value), ["stop"])
              }, [
                ae(ce, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, wo)
            ], 2))), 128)),
            gt.value > 0 ? (f(), g("span", bo, " +" + F(gt.value), 1)) : j("", !0)
          ], 512)) : (f(), g("span", yo)),
          p("span", {
            class: H([
              A(x).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            At(p("input", {
              ref_key: "inputEl",
              ref: v,
              "onUpdate:modelValue": R[0] || (R[0] = (P) => Bt(k) ? k.value = P : null),
              class: H([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: we(N.value),
              placeholder: "Search...",
              onKeydown: R[1] || (R[1] = //@ts-ignore
              (...P) => A(O) && A(O)(...P)),
              onFocus: R[2] || (R[2] = (P) => {
                c.value = !0, ze(Ye);
              })
            }, null, 36), [
              [It, A(k)]
            ])
          ], 2),
          p("button", {
            type: "button",
            class: H(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
            onClick: R[3] || (R[3] = xe((P) => {
              c.value = !A(c), ze(Ye);
            }, ["stop"]))
          }, [
            ae(ce, {
              name: A(c) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 2),
          A(x).length ? (f(), g("button", {
            key: 2,
            type: "button",
            class: H(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
            onClick: R[4] || (R[4] = xe((P) => A(y)(), ["stop"]))
          }, [
            ae(ce, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 2)) : j("", !0)
        ], 64)) : (f(), g(ge, { key: 1 }, [
          A(x).length ? (f(), g("div", ko, [
            (f(!0), g(ge, null, _e(A(x), (P) => (f(), g("span", {
              key: P.value,
              class: H(["badge badge-soft-primary gap-1 max-w-full", X[t.size || "md"]])
            }, [
              p("span", xo, F(P.label), 1),
              p("button", {
                type: "button",
                class: H([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ve[t.size || "md"]
                ]),
                onClick: xe((me) => A(B)(P.value), ["stop"])
              }, [
                ae(ce, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, Co)
            ], 2))), 128))
          ])) : (f(), g("span", {
            key: 1,
            class: H(["opacity-60 w-full", fe[t.size || "md"]])
          }, F(t.placeholder || "Select options..."), 3)),
          p("div", Mo, [
            p("span", Do, [
              At(p("input", {
                ref_key: "inputEl",
                ref: v,
                "onUpdate:modelValue": R[5] || (R[5] = (P) => Bt(k) ? k.value = P : null),
                class: H([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: we(se.value),
                placeholder: "Search...",
                onKeydown: R[6] || (R[6] = //@ts-ignore
                (...P) => A(O) && A(O)(...P)),
                onFocus: R[7] || (R[7] = (P) => {
                  c.value = !0, ze(Ye);
                })
              }, null, 36), [
                [It, A(k)]
              ])
            ]),
            p("button", {
              type: "button",
              class: H(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
              onClick: R[8] || (R[8] = xe((P) => {
                c.value = !A(c), ze(Ye);
              }, ["stop"]))
            }, [
              ae(ce, {
                name: A(c) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 2),
            A(x).length ? (f(), g("button", {
              key: 0,
              type: "button",
              class: H(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
              onClick: R[9] || (R[9] = xe((P) => A(y)(), ["stop"]))
            }, [
              ae(ce, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 2)) : j("", !0)
          ])
        ], 64)),
        $.value ? (f(), g("div", $o, [
          (f(!0), g(ge, null, _e(A(x), (P, me) => (f(), g("span", {
            key: `measure-${P.value}`,
            ref_for: !0,
            ref: (Se) => vt(Se, me),
            class: H(["badge badge-soft-primary gap-1 max-w-[12rem]", X[t.size || "md"]])
          }, [
            p("span", So, F(P.label), 1),
            p("span", {
              class: H([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                ve[t.size || "md"]
              ])
            }, [
              ae(ce, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          p("span", {
            ref_key: "measureCounterEl",
            ref: tt,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : j("", !0)
      ], 2),
      (f(), Ue(ut, { to: "body" }, [
        ae(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": ie.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": ie.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            A(c) ? (f(), g("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: ee,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: we(He.value)
            }, [
              A(s) ? (f(), g("div", Eo, "Loading...")) : (f(), g("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: we(ye.value)
              }, [
                (f(!0), g(ge, null, _e(ke.value, (P) => (f(), g("li", {
                  key: P.value,
                  class: H([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    pe[t.size || "md"],
                    Ce(P.value) ? "bg-primary/15" : ""
                  ]),
                  onMousedown: xe((me) => A(B)(P.value), ["prevent"])
                }, [
                  p("input", {
                    type: "checkbox",
                    class: H([V[t.size || "md"], "pointer-events-none"]),
                    checked: Ce(P.value)
                  }, null, 10, Ho),
                  p("span", null, F(P.label), 1)
                ], 42, _o))), 128)),
                !ke.value.length && !A(s) ? (f(), g("li", To, " No results ")) : j("", !0)
              ], 4))
            ], 4)) : j("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Wt = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [h, l] of o)
    e[h] = l;
  return e;
}, Sr = /* @__PURE__ */ Wt(jo, [["__scopeId", "data-v-66839298"]]), Lo = { class: "font-medium" }, Bo = { class: "text-sm opacity-60" }, Fo = {
  key: 0,
  class: "text-xs opacity-60"
}, zo = ["multiple", "accept", "disabled"], Oo = {
  key: 0,
  class: "space-y-2"
}, No = { class: "flex items-center gap-2 min-w-0" }, Po = { class: "text-sm truncate" }, Vo = ["onClick"], Yo = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-3"
}, Ro = ["src", "alt"], Wo = ["onClick"], Uo = {
  key: 2,
  class: "text-xs opacity-60"
}, Er = /* @__PURE__ */ re({
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
    emptyText: { default: "No files selected" }
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: o }) {
    const e = t, h = o, l = I(!1), d = I(e.modelValue ?? []), v = I([]), i = (y) => !e.maxFiles || e.maxFiles <= 0 ? y : y.slice(0, e.maxFiles), c = (y) => {
      d.value = i(y), h("update:modelValue", d.value), h("change", d.value);
    }, k = M(() => d.value.map((y) => y.name)), s = M(() => d.value.length > 0), w = () => {
      v.value.forEach((y) => URL.revokeObjectURL(y.url)), v.value = d.value.filter((y) => y.type.startsWith("image/")).map((y, O) => ({
        id: `${y.name}-${y.size}-${y.lastModified}-${O}`,
        name: y.name,
        url: URL.createObjectURL(y)
      }));
    }, x = (y) => {
      const O = y.target, q = Array.from(O.files ?? []);
      q.length && (e.multiple ? c([...d.value, ...q]) : c([q[0]]), O.value = "");
    }, D = (y) => {
      var q;
      if (e.disabled) return;
      l.value = !1;
      const O = Array.from(((q = y.dataTransfer) == null ? void 0 : q.files) ?? []);
      O.length && (e.multiple ? c([...d.value, ...O]) : c([O[0]]));
    }, B = (y) => {
      const O = [...d.value];
      O.splice(y, 1), c(O);
    };
    return le(
      () => e.modelValue,
      (y) => {
        d.value = i(y ?? []);
      }
    ), le(
      d,
      () => {
        w();
      },
      { immediate: !0 }
    ), et(() => {
      v.value.forEach((y) => URL.revokeObjectURL(y.url));
    }), (y, O) => (f(), g("div", {
      class: H(["space-y-3", e.class])
    }, [
      p("div", {
        class: H(["dropzone", [{ "dropzone-active": l.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: O[0] || (O[0] = xe((q) => l.value = !0, ["prevent"])),
        onDragleave: O[1] || (O[1] = (q) => l.value = !1),
        onDrop: xe(D, ["prevent"])
      }, [
        ae(ce, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        p("p", Lo, F(t.dropzoneText), 1),
        p("p", Bo, F(t.browseText), 1),
        t.helperText ? (f(), g("p", Fo, F(t.helperText), 1)) : j("", !0),
        p("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: x
        }, null, 40, zo)
      ], 34),
      s.value && !v.value.length ? (f(), g("div", Oo, [
        (f(!0), g(ge, null, _e(k.value, (q, ee) => (f(), g("div", {
          key: `${q}-${ee}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          p("span", No, [
            ae(ce, {
              name: "file",
              class: "w-4 h-4 shrink-0"
            }),
            p("span", Po, F(q), 1)
          ]),
          p("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ne) => B(ee)
          }, [
            ae(ce, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, Vo)
        ]))), 128))
      ])) : j("", !0),
      t.preview && v.value.length ? (f(), g("div", Yo, [
        (f(!0), g(ge, null, _e(v.value, (q, ee) => (f(), g("div", {
          key: q.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          p("img", {
            src: q.url,
            alt: q.name,
            class: "w-full h-full object-cover"
          }, null, 8, Ro),
          p("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ne) => B(ee)
          }, [
            ae(ce, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, Wo)
        ]))), 128))
      ])) : j("", !0),
      s.value ? j("", !0) : (f(), g("p", Uo, F(t.emptyText), 1))
    ], 2));
  }
}), Go = {
  key: 0,
  class: "mitreka-input-addon"
}, Ko = { class: "mitreka-input-inner w-full" }, qo = {
  key: 0,
  class: "mitreka-input-icon mitreka-input-icon--left"
}, Zo = ["type", "value", "placeholder", "disabled", "readonly"], Jo = {
  key: 1,
  class: "mitreka-input-icon mitreka-input-icon--right"
}, Xo = ["aria-label"], Qo = {
  key: 1,
  class: "mitreka-input-addon"
}, er = /* @__PURE__ */ re({
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
  setup(t, { emit: o }) {
    const e = t, h = o, l = Nt(), d = I(!1), v = M(() => String(e.modelValue ?? "")), i = M(() => v.value.length > 0), c = M(() => !!e.prefixIcon), k = M(() => !!e.suffixIcon), s = M(() => !!e.addonLeft || !!e.addonRight), w = M(
      () => e.clearable && i.value && !e.disabled && !e.readonly
    ), x = M(
      () => e.passwordToggle && e.type === "password" && !e.disabled
    ), D = M(() => x.value && d.value ? "text" : e.type), B = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, y = M(
      () => e.color === "default" ? "" : `input-${e.color}`
    ), O = M(() => [
      "input",
      B[e.size],
      y.value,
      c.value ? "mitreka-input-has-prefix" : "",
      k.value || w.value || x.value ? "mitreka-input-has-suffix" : ""
    ]), q = (W) => {
      const L = W.target;
      h("update:modelValue", L.value);
    }, ee = () => {
      h("update:modelValue", ""), h("clear");
    }, ne = () => {
      d.value = !d.value;
    }, Y = (W) => {
      W.key === "Enter" && h("enter");
    };
    return (W, L) => (f(), g("div", {
      class: H(["mitreka-input-group w-full", s.value ? "mitreka-input-group--with-addon" : ""])
    }, [
      t.addonLeft ? (f(), g("span", Go, F(t.addonLeft), 1)) : j("", !0),
      p("div", Ko, [
        c.value ? (f(), g("span", qo, [
          ae(ce, {
            name: t.prefixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : j("", !0),
        p("input", Lt(A(l), {
          type: D.value,
          value: v.value,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: O.value,
          onInput: q,
          onFocus: L[0] || (L[0] = (Z) => h("focus", Z)),
          onBlur: L[1] || (L[1] = (Z) => h("blur", Z)),
          onKeydown: Y
        }), null, 16, Zo),
        k.value ? (f(), g("span", Jo, [
          ae(ce, {
            name: t.suffixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : j("", !0),
        w.value ? (f(), g("button", {
          key: 2,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": "Clear input",
          onClick: ee
        }, [
          ae(ce, {
            name: "x",
            class: "w-4 h-4 opacity-70"
          })
        ])) : j("", !0),
        x.value ? (f(), g("button", {
          key: 3,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": d.value ? "Hide password" : "Show password",
          onClick: ne
        }, [
          ae(ce, {
            name: d.value ? "eye-off" : "eye",
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ], 8, Xo)) : j("", !0)
      ]),
      t.addonRight ? (f(), g("span", Qo, F(t.addonRight), 1)) : j("", !0)
    ], 2));
  }
}), _r = /* @__PURE__ */ Wt(er, [["__scopeId", "data-v-4e5d8d4f"]]);
export {
  _r as I,
  Sr as M,
  or as _,
  rr as a,
  ir as b,
  sr as c,
  lr as d,
  dr as e,
  cr as f,
  Yn as g,
  ur as h,
  fr as i,
  hr as j,
  pr as k,
  gr as l,
  vr as m,
  mr as n,
  wr as o,
  br as p,
  yr as q,
  kr as r,
  ce as s,
  Cr as t,
  Mr as u,
  Dr as v,
  $r as w,
  Er as x,
  Pt as y,
  xr as z
};
