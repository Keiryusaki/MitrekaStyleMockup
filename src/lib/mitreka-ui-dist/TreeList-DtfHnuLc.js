import { defineComponent as de, createElementBlock as p, openBlock as c, normalizeClass as A, createCommentVNode as F, renderSlot as ke, createElementVNode as f, ref as N, watch as we, withKeys as ut, withModifiers as oe, createBlock as Ze, Teleport as ht, createVNode as le, Transition as et, withCtx as tt, toDisplayString as V, provide as pn, inject as gn, computed as M, normalizeStyle as $e, createTextVNode as Jt, Fragment as be, renderList as He, unref as G, useSlots as vn, resolveDynamicComponent as mn, reactive as wn, withDirectives as Ot, vModelText as Vt, onMounted as ft, onBeforeUnmount as nt, mergeProps as Pt, useAttrs as Xt, nextTick as Ve, isRef as Yt } from "vue";
import { d as kn, c as xn, h as yn, i as bn, g as Cn, f as Mn, r as Dn, a as $n, b as Sn } from "./useAgGridRowHeight-UHX5I8W2.js";
import { AgGridVue as _n } from "ag-grid-vue3";
const En = ["disabled"], Hn = {
  key: 0,
  class: "animate-spin"
}, Da = /* @__PURE__ */ de({
  __name: "Button",
  props: {
    size: { default: "md" },
    variant: { default: "solid" },
    color: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    loading: { type: Boolean, default: !1 }
  },
  emits: ["click"],
  setup(t, { emit: r }) {
    const e = t, g = r, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, s = () => {
      const { variant: h, color: w } = e;
      return w === "default" ? h === "outline" ? "btn-outline" : h === "ghost" ? "btn-ghost" : "" : h === "solid" ? `btn-${w}` : h === "outline" ? `btn-outline btn-outline-${w}` : h === "soft" ? `btn-soft-${w}` : h === "ghost" ? "btn-ghost" : "";
    }, m = (h) => {
      !e.disabled && !e.loading && g("click", h);
    };
    return (h, w) => (c(), p("button", {
      class: A(["btn", l[t.size], s()]),
      disabled: t.disabled || t.loading,
      onClick: m
    }, [
      t.loading ? (c(), p("span", Hn, [...w[0] || (w[0] = [
        f("svg", {
          class: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24"
        }, [
          f("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }),
          f("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          })
        ], -1)
      ])])) : F("", !0),
      ke(h.$slots, "default")
    ], 10, En));
  }
}), $a = /* @__PURE__ */ de({
  __name: "Badge",
  props: {
    size: { default: "md" },
    variant: { default: "solid" },
    color: { default: "default" }
  },
  setup(t) {
    const r = t, e = {
      xxs: "badge-xxs",
      xs: "badge-xs",
      sm: "badge-sm",
      md: "",
      lg: "badge-lg",
      xl: "badge-xl"
    }, g = () => {
      const { variant: l, color: s } = r;
      return s === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${s}` : l === "outline" ? `badge-outline badge-outline-${s}` : l === "soft" ? `badge-soft-${s}` : "";
    };
    return (l, s) => (c(), p("span", {
      class: A(["badge", e[t.size], g()])
    }, [
      ke(l.$slots, "default")
    ], 2));
  }
}), Bn = ["role", "aria-expanded", "tabindex"], jn = { class: "card-title" }, In = { class: "card-body-inner" }, Tn = {
  key: 3,
  class: "mt-4"
}, Sa = /* @__PURE__ */ de({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: r, emit: e }) {
    const g = t, l = e, s = N(g.modelValue !== void 0 ? g.modelValue : g.defaultOpen);
    we(() => g.modelValue, (h) => {
      h !== void 0 && (s.value = h);
    });
    function m() {
      if (!g.collapsible) return;
      const h = !s.value;
      s.value = h, l("update:modelValue", h), l("toggle", h);
    }
    return r({ isOpen: s, toggle: m }), (h, w) => (c(), p("section", {
      class: A(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      h.$slots.title ? (c(), p("header", {
        key: 0,
        class: A(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? s.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: m,
        onKeydown: [
          w[0] || (w[0] = ut((d) => t.collapsible && m(), ["enter"])),
          w[1] || (w[1] = ut(oe((d) => t.collapsible && m(), ["prevent"]), ["space"]))
        ]
      }, [
        f("div", jn, [
          ke(h.$slots, "title")
        ]),
        t.collapsible ? (c(), p("svg", {
          key: 0,
          class: A(["card-collapse-icon", { "is-open": s.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...w[2] || (w[2] = [
          f("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : F("", !0)
      ], 42, Bn)) : F("", !0),
      t.collapsible ? (c(), p("div", {
        key: 1,
        class: A(["card-body-wrapper", { "is-open": s.value }])
      }, [
        f("div", In, [
          ke(h.$slots, "default")
        ])
      ], 2)) : ke(h.$slots, "default", { key: 2 }),
      h.$slots.footer ? (c(), p("footer", Tn, [
        ke(h.$slots, "footer")
      ])) : F("", !0)
    ], 2));
  }
}), An = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, Ln = { class: "text-xl font-semibold" }, _a = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = {
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
    }, s = () => {
      e.persistent || g("close");
    };
    return we(
      () => e.open,
      (m) => {
        m ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (m, h) => (c(), Ze(ht, { to: "body" }, [
      le(et, { name: "fade" }, {
        default: tt(() => [
          t.open ? (c(), p("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: s
          })) : F("", !0)
        ]),
        _: 1
      }),
      le(et, { name: "zoom" }, {
        default: tt(() => [
          t.open ? (c(), p("div", {
            key: 0,
            class: A([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            f("div", {
              class: A([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? F("", !0) : (c(), p("div", An, [
                ke(m.$slots, "header", {}, () => [
                  f("h3", Ln, V(t.title), 1)
                ]),
                f("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: h[0] || (h[0] = (w) => g("close"))
                }, [...h[3] || (h[3] = [
                  f("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    f("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])])
              ])),
              f("div", {
                class: A([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                ke(m.$slots, "default")
              ], 2),
              t.hideFooter ? F("", !0) : (c(), p("div", {
                key: 1,
                class: A([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                ke(m.$slots, "footer", {}, () => [
                  f("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: h[1] || (h[1] = (w) => g("close"))
                  }, V(t.cancelText), 1),
                  f("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: h[2] || (h[2] = (w) => g("confirm"))
                  }, V(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : F("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), zn = ["aria-expanded", "aria-disabled", "onKeydown"], Fn = { class: "collapse-title" }, On = { class: "collapse-content" }, Vn = { class: "collapse-content-inner" }, Nn = { class: "collapse-body" }, Ea = /* @__PURE__ */ de({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: r, emit: e }) {
    const g = t, l = e, s = N(g.modelValue !== void 0 ? g.modelValue : g.defaultOpen);
    we(() => g.modelValue, (h) => {
      h !== void 0 && (s.value = h);
    });
    function m() {
      if (g.disabled) return;
      const h = !s.value;
      s.value = h, l("update:modelValue", h), l("toggle", h);
    }
    return r({ isOpen: s, toggle: m }), (h, w) => (c(), p("div", {
      class: A([
        "collapse-card",
        `collapse-card-${t.variant}`,
        { "is-open": s.value }
      ])
    }, [
      f("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": s.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: m,
        onKeydown: [
          ut(m, ["enter"]),
          ut(oe(m, ["prevent"]), ["space"])
        ]
      }, [
        f("div", Fn, [
          ke(h.$slots, "header", {}, () => [
            ke(h.$slots, "title")
          ])
        ]),
        w[0] || (w[0] = f("svg", {
          class: "collapse-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          f("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, zn),
      f("div", On, [
        f("div", Vn, [
          f("div", Nn, [
            ke(h.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Ha = /* @__PURE__ */ de({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: r, emit: e }) {
    const g = t, l = e, s = N(/* @__PURE__ */ new Set());
    we(() => g.modelValue, (w) => {
      w === null ? s.value = /* @__PURE__ */ new Set() : Array.isArray(w) ? s.value = new Set(w) : s.value = /* @__PURE__ */ new Set([w]);
    }, { immediate: !0 });
    function m(w) {
      const d = new Set(s.value);
      d.has(w) ? d.delete(w) : (g.multiple || d.clear(), d.add(w)), s.value = d, g.multiple ? l("update:modelValue", Array.from(d)) : l("update:modelValue", d.size > 0 ? Array.from(d)[0] : null);
    }
    function h(w) {
      return s.value.has(w);
    }
    return pn("accordion", {
      toggleItem: m,
      isItemOpen: h
    }), r({ openItems: s, toggleItem: m }), (w, d) => (c(), p("div", {
      class: A(["accordion", `accordion-${t.variant}`])
    }, [
      ke(w.$slots, "default")
    ], 2));
  }
}), Pn = ["aria-expanded", "aria-disabled", "onKeydown"], Yn = { class: "accordion-title" }, Rn = { class: "accordion-content" }, Wn = { class: "accordion-content-inner" }, Gn = { class: "accordion-body" }, Ba = /* @__PURE__ */ de({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const r = t, e = gn("accordion"), g = M(() => (e == null ? void 0 : e.isItemOpen(r.id)) ?? !1);
    function l() {
      r.disabled || e == null || e.toggleItem(r.id);
    }
    return (s, m) => (c(), p("div", {
      class: A(["accordion-item", { "is-open": g.value }])
    }, [
      f("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": g.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          ut(l, ["enter"]),
          ut(oe(l, ["prevent"]), ["space"])
        ]
      }, [
        f("div", Yn, [
          ke(s.$slots, "header", {}, () => [
            ke(s.$slots, "title")
          ])
        ]),
        m[0] || (m[0] = f("svg", {
          class: "accordion-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          f("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, Pn),
      f("div", Rn, [
        f("div", Wn, [
          f("div", Gn, [
            ke(s.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Un = { class: "loading-logo-wrapper" }, Kn = { class: "dots-container" }, qn = ["width", "height"], Zn = {
  key: 0,
  class: "loading-text"
}, Jn = /* @__PURE__ */ de({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const r = t, e = M(() => Math.round(r.size * (8 / 60)));
    return (g, l) => (c(), p("div", Un, [
      f("div", {
        class: "loading-logo-container",
        style: $e({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        f("div", Kn, [
          f("span", {
            class: "loading-dot dot-1 dot-blue",
            style: $e({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-2 dot-blue",
            style: $e({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-3 dot-black",
            style: $e({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-4 dot-black",
            style: $e({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-5 dot-red",
            style: $e({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-6 dot-red",
            style: $e({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (c(), p("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...l[0] || (l[0] = [
          f("polygon", {
            class: "logo-shape shape-blue",
            points: "11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
          }, null, -1),
          f("rect", {
            class: "logo-shape shape-black",
            x: "15.48",
            y: "8.73",
            width: "9.55",
            height: "9.55",
            transform: "translate(-3.61 18.27) rotate(-45)"
          }, null, -1),
          f("polygon", {
            class: "logo-shape shape-red",
            points: "40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
          }, null, -1)
        ])], 8, qn))
      ], 4),
      t.text ? (c(), p("p", Zn, [
        Jt(V(t.text), 1),
        l[1] || (l[1] = f("span", { class: "loading-dots" }, [
          f("span", null, "."),
          f("span", null, "."),
          f("span", null, ".")
        ], -1))
      ])) : F("", !0)
    ]));
  }
}), Xn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, ja = /* @__PURE__ */ de({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (r, e) => (c(), Ze(ht, { to: "body" }, [
      le(et, { name: "fade" }, {
        default: tt(() => [
          t.open ? (c(), p("div", Xn, [
            le(Jn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : F("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Qn = { class: "toast-content" }, eo = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, to = ["d"], no = { class: "toast-body" }, oo = {
  key: 0,
  class: "toast-title"
}, ro = { class: "toast-message" }, ao = ["onClick"], Ia = /* @__PURE__ */ de({
  __name: "Toasts",
  setup(t) {
    const r = kn(), e = M(() => {
      const w = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return w[r.toastPosition.value] || w["bottom-right"];
    }), g = {
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
    }, s = {
      info: "toast-solid-info",
      success: "toast-solid-success",
      warning: "toast-solid-warning",
      error: "toast-solid-error",
      primary: "toast-solid-primary"
    }, m = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, h = (w, d = "soft") => {
      var y;
      return ((y = {
        soft: l,
        solid: s,
        outline: m
      }[d]) == null ? void 0 : y[w]) || l[w] || "toast-default";
    };
    return (w, d) => (c(), Ze(ht, { to: "body" }, [
      f("div", {
        class: A(["toast-container", e.value])
      }, [
        (c(!0), p(be, null, He(G(r).toasts.value, (i) => (c(), p("div", {
          key: i.id,
          class: A(["toast-item", h(i.type, i.variant)])
        }, [
          f("div", Qn, [
            (c(), p("svg", eo, [
              f("path", {
                d: g[i.type],
                fill: "currentColor"
              }, null, 8, to)
            ])),
            f("div", no, [
              i.title ? (c(), p("div", oo, V(i.title), 1)) : F("", !0),
              f("div", ro, V(i.message), 1)
            ]),
            f("button", {
              class: "toast-close-btn",
              onClick: (y) => G(r).dismiss(i.id)
            }, [...d[0] || (d[0] = [
              f("svg", {
                class: "toast-close-icon",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                f("path", {
                  d: "M6 18L18 6M6 6l12 12",
                  fill: "none",
                  stroke: "currentColor",
                  "stroke-width": "2",
                  "stroke-linecap": "round",
                  "stroke-linejoin": "round"
                })
              ], -1)
            ])], 8, ao)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), Ta = /* @__PURE__ */ de({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const r = t, e = N(!1);
    let g = null;
    const l = () => {
      g = setTimeout(() => {
        e.value = !0;
      }, r.delay);
    }, s = () => {
      g && (clearTimeout(g), g = null), e.value = !1;
    }, m = M(() => `tooltip-pos-${r.position}`), h = M(() => `tooltip-arrow-${r.position}`), w = M(() => `tooltip-variant-${r.variant}`);
    return (d, i) => (c(), p("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: s,
      onFocus: l,
      onBlur: s
    }, [
      ke(d.$slots, "default"),
      le(et, { name: "tooltip-fade" }, {
        default: tt(() => [
          e.value && t.text ? (c(), p("span", {
            key: 0,
            class: A(["tooltip-content", [m.value, w.value]]),
            role: "tooltip"
          }, [
            Jt(V(t.text) + " ", 1),
            f("span", {
              class: A(["tooltip-arrow", [h.value, w.value]])
            }, null, 2)
          ], 2)) : F("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), io = { class: "mitreka-pagination" }, so = ["disabled"], lo = { class: "pagination-status" }, co = ["disabled"], Aa = /* @__PURE__ */ de({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: r }) {
    const e = t, g = r, l = () => {
      e.page > 1 && g("change", e.page - 1);
    }, s = () => {
      e.page < e.pages && g("change", e.page + 1);
    };
    return (m, h) => (c(), p("div", io, [
      f("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...h[0] || (h[0] = [
        f("span", { class: "hidden sm:inline" }, "Prev", -1),
        f("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, so),
      f("span", lo, V(t.page) + " / " + V(t.pages), 1),
      f("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: s
      }, [...h[1] || (h[1] = [
        f("span", { class: "hidden sm:inline" }, "Next", -1),
        f("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, co)
    ]));
  }
}), uo = { class: "avatar-root" }, fo = ["src", "alt"], La = /* @__PURE__ */ de({
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
    const r = t, e = N(!1), g = M(() => r.src && !e.value), l = M(() => r.fallback ? r.fallback.slice(0, 2).toUpperCase() : r.alt && r.alt !== "Avatar" ? r.alt.split(" ").map((y) => y[0]).slice(0, 2).join("").toUpperCase() : "?"), s = M(() => `avatar-size-${r.size}`), m = M(() => `avatar-color-${r.color}`), h = M(() => r.status ? `avatar-status-${r.status}` : ""), w = M(() => `avatar-status-size-${r.size}`), d = M(() => r.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (y, $) => (c(), p("span", uo, [
      g.value ? (c(), p("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: A(["avatar-img", [s.value, d.value]]),
        onError: i
      }, null, 42, fo)) : (c(), p("span", {
        key: 1,
        class: A(["avatar-fallback", [s.value, m.value, d.value]])
      }, V(l.value), 3)),
      t.status ? (c(), p("span", {
        key: 2,
        class: A(["avatar-status", [h.value, w.value]])
      }, null, 2)) : F("", !0)
    ]));
  }
}), za = /* @__PURE__ */ de({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const r = t, e = vn(), g = M(() => {
      var w;
      const h = (w = e.default) == null ? void 0 : w.call(e);
      return h ? h.length : 0;
    }), l = M(() => g.value <= r.max ? 0 : g.value - r.max), s = M(() => `avatar-size-${r.size}`), m = M(() => `avatar-group-space-${r.size}`);
    return (h, w) => (c(), p("div", {
      class: A(["avatar-group", m.value])
    }, [
      (c(!0), p(be, null, He(t.max, (d, i) => {
        var y, $;
        return c(), p(be, { key: i }, [
          i < g.value ? (c(), Ze(mn(($ = (y = G(e)).default) == null ? void 0 : $.call(y)[i]), { key: 0 })) : F("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (c(), p("span", {
        key: 0,
        class: A(["avatar-group-count", s.value])
      }, " +" + V(l.value), 3)) : F("", !0)
    ], 2));
  }
}), ho = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, po = { class: "breadcrumbs-list" }, go = {
  key: 0,
  class: "breadcrumbs-item"
}, vo = ["href"], mo = { key: 0 }, wo = ["href"], ko = {
  key: 1,
  class: "breadcrumbs-text"
}, xo = {
  key: 1,
  class: "breadcrumbs-current"
}, Fa = /* @__PURE__ */ de({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const r = t, e = (g) => g === r.items.length - 1;
    return (g, l) => t.items.length ? (c(), p("nav", ho, [
      f("ol", po, [
        t.showHome ? (c(), p("li", go, [
          f("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, V(t.homeLabel), 9, vo)
        ])) : F("", !0),
        (c(!0), p(be, null, He(t.items, (s, m) => (c(), p("li", {
          key: m,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = f("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(m) ? (c(), p("span", xo, V(s.label), 1)) : (c(), p("span", mo, [
            s.href ? (c(), p("a", {
              key: 0,
              href: s.href,
              class: "breadcrumbs-link"
            }, V(s.label), 9, wo)) : (c(), p("span", ko, V(s.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : F("", !0);
  }
}), yo = { class: "mitreka-stat-card" }, bo = {
  key: 0,
  class: "stat-icon"
}, Co = { class: "stat-content" }, Mo = { class: "stat-label" }, Do = { class: "stat-value" }, Oa = /* @__PURE__ */ de({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (r, e) => (c(), p("div", yo, [
      t.icon ? (c(), p("div", bo, V(t.icon), 1)) : F("", !0),
      f("div", Co, [
        f("div", Mo, V(t.label), 1),
        f("div", Do, V(t.value), 1)
      ])
    ]));
  }
}), $o = { class: "mitreka-page-header" }, So = { class: "page-header-title-row" }, _o = { class: "page-header-title" }, Eo = {
  key: 0,
  class: "page-header-desc"
}, Va = /* @__PURE__ */ de({
  __name: "PageHeader",
  props: {
    title: {},
    description: {},
    category: {}
  },
  setup(t) {
    const r = t, e = {
      foundation: "badge-soft-info",
      components: "badge-soft-primary",
      patterns: "badge-soft-accent",
      guides: "badge-soft-success",
      mockup: "badge-soft-warning"
    }, g = M(() => {
      if (!r.category) return "";
      const l = r.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, s) => (c(), p("header", $o, [
      f("div", So, [
        f("h1", _o, V(t.title), 1),
        t.category ? (c(), p("span", {
          key: 0,
          class: A(["badge page-header-badge", g.value])
        }, V(t.category), 3)) : F("", !0)
      ]),
      t.description ? (c(), p("p", Eo, V(t.description), 1)) : F("", !0)
    ]));
  }
}), Ho = { class: "mitreka-theme-switcher" }, Bo = ["value"], Na = /* @__PURE__ */ de({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: r, setTheme: e, toggleTheme: g } = xn("light"), l = M(
      () => r.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), s = (m) => {
      e(m === "mitrekadark" ? "dark" : "light");
    };
    return (m, h) => (c(), p("div", Ho, [
      f("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: h[0] || (h[0] = //@ts-ignore
        (...w) => G(g) && G(g)(...w))
      }, " Toggle: " + V(l.value), 1),
      f("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: h[1] || (h[1] = (w) => s(w.target.value))
      }, [...h[2] || (h[2] = [
        f("option", { value: "mitrekalight" }, "mitrekalight", -1),
        f("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, Bo)
    ]));
  }
}), jo = { class: "sidebar-header" }, Io = {
  key: 0,
  class: "sidebar-search"
}, To = ["placeholder"], Ao = { class: "sidebar-nav" }, Lo = ["href", "title", "onClick"], zo = { class: "sidebar-icon" }, Fo = { class: "sidebar-icon-text" }, Oo = {
  key: 0,
  class: "sidebar-label"
}, Vo = ["title", "onClick"], No = { class: "sidebar-icon" }, Po = { class: "sidebar-icon-text" }, Yo = {
  key: 0,
  class: "sidebar-label"
}, Ro = ["href", "title", "onClick"], Wo = { class: "sidebar-icon" }, Go = { class: "sidebar-icon-text" }, Uo = {
  key: 0,
  class: "sidebar-label"
}, Pa = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = N(""), s = wn({});
    e.defaultOpenIds.forEach((y) => {
      s[y] = !0;
    });
    const m = (y) => !e.activeHref || !y.href ? !1 : y.exact ? e.activeHref === y.href : e.activeHref.startsWith(y.href), h = (y) => {
      var H;
      if (!y.children) return !1;
      if (l.value.trim()) return !0;
      const $ = s[y.id], x = ((H = y.children) == null ? void 0 : H.some(m)) ?? !1;
      return $ === void 0 && x && (s[y.id] = !0), s[y.id] ?? x;
    }, w = (y) => {
      const $ = !h(y);
      s[y.id] = $, g("toggle", y.id, $);
    }, d = M(() => {
      const y = l.value.toLowerCase().trim();
      return y ? e.items.map(($) => {
        if ($.children) {
          const x = $.children.filter(
            (H) => H.label.toLowerCase().includes(y)
          );
          return $.label.toLowerCase().includes(y) ? $ : x.length > 0 ? { ...$, children: x } : null;
        }
        return $.label.toLowerCase().includes(y) ? $ : null;
      }).filter(Boolean) : e.items;
    }), i = (y) => {
      g("navigate", y), l.value = "";
    };
    return (y, $) => (c(), p("aside", {
      class: A(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      f("div", jo, [
        ke(y.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (c(), p("div", Io, [
        Ot(f("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": $[0] || ($[0] = (x) => l.value = x)
        }, null, 8, To), [
          [Vt, l.value]
        ]),
        l.value ? (c(), p("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: $[1] || ($[1] = (x) => l.value = "")
        }, " × ")) : F("", !0)
      ])) : F("", !0),
      f("nav", Ao, [
        (c(!0), p(be, null, He(d.value, (x) => (c(), p(be, {
          key: x.id
        }, [
          x.children ? (c(), p(be, { key: 1 }, [
            f("button", {
              class: A(["sidebar-item sidebar-group", h(x) ? "is-open" : ""]),
              title: t.collapsed ? x.label : void 0,
              onClick: (H) => w(x)
            }, [
              f("span", No, [
                ke(y.$slots, "icon", { item: x }, () => [
                  f("span", Po, V(x.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? F("", !0) : (c(), p("span", Yo, V(x.label), 1)),
              t.collapsed ? F("", !0) : (c(), p("span", {
                key: 1,
                class: A(["sidebar-caret", h(x) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Vo),
            h(x) ? (c(), p("div", {
              key: 0,
              class: A(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (c(!0), p(be, null, He(x.children, (H) => (c(), p("a", {
                key: H.id,
                class: A(["sidebar-item sidebar-child", m(H) ? "is-active" : ""]),
                href: H.href || "#",
                title: t.collapsed ? H.label : void 0,
                onClick: oe((I) => i(H), ["prevent"])
              }, [
                f("span", Wo, [
                  ke(y.$slots, "icon", { item: H }, () => [
                    f("span", Go, V(H.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? F("", !0) : (c(), p("span", Uo, V(H.label), 1))
              ], 10, Ro))), 128))
            ], 2)) : F("", !0)
          ], 64)) : (c(), p("a", {
            key: 0,
            class: A(["sidebar-item", m(x) ? "is-active" : ""]),
            href: x.href || "#",
            title: t.collapsed ? x.label : void 0,
            onClick: oe((H) => i(x), ["prevent"])
          }, [
            f("span", zo, [
              ke(y.$slots, "icon", { item: x }, () => [
                f("span", Fo, V(x.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? F("", !0) : (c(), p("span", Oo, V(x.label), 1))
          ], 10, Lo))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Qt = {
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
  "log-out": `
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
  table: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3v18"/>
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M3 9h18"/>
      <path d="M3 15h18"/>
    </svg>
  `,
  "table-2": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
    </svg>
  `,
  monitor: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="20" height="14" x="2" y="3" rx="2"/>
      <line x1="8" x2="16" y1="21" y2="21"/>
      <line x1="12" x2="12" y1="17" y2="21"/>
    </svg>
  `,
  eraser: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 21H8a2 2 0 0 1-1.42-.587l-3.994-3.999a2 2 0 0 1 0-2.828l10-10a2 2 0 0 1 2.829 0l5.999 6a2 2 0 0 1 0 2.828L12.834 21"/>
      <path d="m5.082 11.09 8.828 8.828"/>
    </svg>
  `,
  clock: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  `,
  "layout-dashboard": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="7" height="9" x="3" y="3" rx="1"/>
      <rect width="7" height="5" x="14" y="3" rx="1"/>
      <rect width="7" height="9" x="14" y="12" rx="1"/>
      <rect width="7" height="5" x="3" y="16" rx="1"/>
    </svg>
  `,
  "layout-grid": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="14" rx="1"/>
      <rect width="7" height="7" x="3" y="14" rx="1"/>
    </svg>
  `,
  "layout-list": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="7" height="7" x="3" y="3" rx="1"/>
      <rect width="7" height="7" x="3" y="14" rx="1"/>
      <path d="M14 4h7"/>
      <path d="M14 9h7"/>
      <path d="M14 15h7"/>
      <path d="M14 20h7"/>
    </svg>
  `,
  "layout-panel-left": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="7" height="18" x="3" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="3" rx="1"/>
      <rect width="7" height="7" x="14" y="14" rx="1"/>
    </svg>
  `,
  "layout-panel-top": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="7" x="3" y="3" rx="1"/>
      <rect width="7" height="7" x="3" y="14" rx="1"/>
      <rect width="7" height="7" x="14" y="14" rx="1"/>
    </svg>
  `,
  "layout-template": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="7" x="3" y="3" rx="1"/>
      <rect width="9" height="7" x="3" y="14" rx="1"/>
      <rect width="5" height="7" x="16" y="14" rx="1"/>
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
  minus: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M5 12h14"/>
    </svg>
  `,
  ellipsis: `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="1"/>
      <circle cx="19" cy="12" r="1"/>
      <circle cx="5" cy="12" r="1"/>
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
  "circle-minus": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8"/>
    </svg>
  `,
  "circle-plus": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M8 12h8"/>
      <path d="M12 8v8"/>
    </svg>
  `,
  "circle-slash-2": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M22 2 2 22"/>
    </svg>
  `,
  "circle-ellipsis": `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <path d="M17 12h.01"/>
      <path d="M12 12h.01"/>
      <path d="M7 12h.01"/>
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
}, Ya = (t) => Qt[t], Ko = ["innerHTML"], qo = {
  key: 1,
  class: "mitreka-icon-fallback"
}, xe = /* @__PURE__ */ de({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const r = t, e = M(() => r.class || "w-5 h-5"), g = M(() => Qt[r.name]), l = M(
      () => g.value ? g.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (s, m) => g.value ? (c(), p("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, Ko)) : (c(), p("span", qo, "?"));
  }
});
var Bt = [
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
], dt = {
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
    var r = new Date(t.getTime());
    r.setHours(0, 0, 0, 0), r.setDate(r.getDate() + 3 - (r.getDay() + 6) % 7);
    var e = new Date(r.getFullYear(), 0, 4);
    return 1 + Math.round(((r.getTime() - e.getTime()) / 864e5 - 3 + (e.getDay() + 6) % 7) / 7);
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
}, xt = {
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
    var r = t % 100;
    if (r > 3 && r < 21)
      return "th";
    switch (r % 10) {
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
}, Ae = function(t, r) {
  return r === void 0 && (r = 2), ("000" + t).slice(r * -1);
}, Oe = function(t) {
  return t === !0 ? 1 : 0;
};
function Rt(t, r) {
  var e;
  return function() {
    var g = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(g, l);
    }, r);
  };
}
var jt = function(t) {
  return t instanceof Array ? t : [t];
};
function Ie(t, r, e) {
  if (e === !0)
    return t.classList.add(r);
  t.classList.remove(r);
}
function re(t, r, e) {
  var g = window.document.createElement(t);
  return r = r || "", e = e || "", g.className = r, e !== void 0 && (g.textContent = e), g;
}
function $t(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function en(t, r) {
  if (r(t))
    return t;
  if (t.parentNode)
    return en(t.parentNode, r);
}
function St(t, r) {
  var e = re("div", "numInputWrapper"), g = re("input", "numInput " + t), l = re("span", "arrowUp"), s = re("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? g.type = "number" : (g.type = "text", g.pattern = "\\d*"), r !== void 0)
    for (var m in r)
      g.setAttribute(m, r[m]);
  return e.appendChild(g), e.appendChild(l), e.appendChild(s), e;
}
function ze(t) {
  try {
    if (typeof t.composedPath == "function") {
      var r = t.composedPath();
      return r[0];
    }
    return t.target;
  } catch {
    return t.target;
  }
}
var It = function() {
}, _t = function(t, r, e) {
  return e.months[r ? "shorthand" : "longhand"][t];
}, Zo = {
  D: It,
  F: function(t, r, e) {
    t.setMonth(e.months.longhand.indexOf(r));
  },
  G: function(t, r) {
    t.setHours((t.getHours() >= 12 ? 12 : 0) + parseFloat(r));
  },
  H: function(t, r) {
    t.setHours(parseFloat(r));
  },
  J: function(t, r) {
    t.setDate(parseFloat(r));
  },
  K: function(t, r, e) {
    t.setHours(t.getHours() % 12 + 12 * Oe(new RegExp(e.amPM[1], "i").test(r)));
  },
  M: function(t, r, e) {
    t.setMonth(e.months.shorthand.indexOf(r));
  },
  S: function(t, r) {
    t.setSeconds(parseFloat(r));
  },
  U: function(t, r) {
    return new Date(parseFloat(r) * 1e3);
  },
  W: function(t, r, e) {
    var g = parseInt(r), l = new Date(t.getFullYear(), 0, 2 + (g - 1) * 7, 0, 0, 0, 0);
    return l.setDate(l.getDate() - l.getDay() + e.firstDayOfWeek), l;
  },
  Y: function(t, r) {
    t.setFullYear(parseFloat(r));
  },
  Z: function(t, r) {
    return new Date(r);
  },
  d: function(t, r) {
    t.setDate(parseFloat(r));
  },
  h: function(t, r) {
    t.setHours((t.getHours() >= 12 ? 12 : 0) + parseFloat(r));
  },
  i: function(t, r) {
    t.setMinutes(parseFloat(r));
  },
  j: function(t, r) {
    t.setDate(parseFloat(r));
  },
  l: It,
  m: function(t, r) {
    t.setMonth(parseFloat(r) - 1);
  },
  n: function(t, r) {
    t.setMonth(parseFloat(r) - 1);
  },
  s: function(t, r) {
    t.setSeconds(parseFloat(r));
  },
  u: function(t, r) {
    return new Date(parseFloat(r));
  },
  w: It,
  y: function(t, r) {
    t.setFullYear(2e3 + parseFloat(r));
  }
}, Qe = {
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
}, kt = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, r, e) {
    return r.weekdays.shorthand[kt.w(t, r, e)];
  },
  F: function(t, r, e) {
    return _t(kt.n(t, r, e) - 1, !1, r);
  },
  G: function(t, r, e) {
    return Ae(kt.h(t, r, e));
  },
  H: function(t) {
    return Ae(t.getHours());
  },
  J: function(t, r) {
    return r.ordinal !== void 0 ? t.getDate() + r.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, r) {
    return r.amPM[Oe(t.getHours() > 11)];
  },
  M: function(t, r) {
    return _t(t.getMonth(), !0, r);
  },
  S: function(t) {
    return Ae(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, r, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return Ae(t.getFullYear(), 4);
  },
  d: function(t) {
    return Ae(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return Ae(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, r) {
    return r.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return Ae(t.getMonth() + 1);
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
}, tn = function(t) {
  var r = t.config, e = r === void 0 ? dt : r, g = t.l10n, l = g === void 0 ? xt : g, s = t.isMobile, m = s === void 0 ? !1 : s;
  return function(h, w, d) {
    var i = d || l;
    return e.formatDate !== void 0 && !m ? e.formatDate(h, w, i) : w.split("").map(function(y, $, x) {
      return kt[y] && x[$ - 1] !== "\\" ? kt[y](h, i, e) : y !== "\\" ? y : "";
    }).join("");
  };
}, Nt = function(t) {
  var r = t.config, e = r === void 0 ? dt : r, g = t.l10n, l = g === void 0 ? xt : g;
  return function(s, m, h, w) {
    if (!(s !== 0 && !s)) {
      var d = w || l, i, y = s;
      if (s instanceof Date)
        i = new Date(s.getTime());
      else if (typeof s != "string" && s.toFixed !== void 0)
        i = new Date(s);
      else if (typeof s == "string") {
        var $ = m || (e || dt).dateFormat, x = String(s).trim();
        if (x === "today")
          i = /* @__PURE__ */ new Date(), h = !0;
        else if (e && e.parseDate)
          i = e.parseDate(s, $);
        else if (/Z$/.test(x) || /GMT$/.test(x))
          i = new Date(s);
        else {
          for (var H = void 0, I = [], Z = 0, ae = 0, _ = ""; Z < $.length; Z++) {
            var E = $[Z], S = E === "\\", ie = $[Z - 1] === "\\" || S;
            if (Qe[E] && !ie) {
              _ += Qe[E];
              var fe = new RegExp(_).exec(s);
              fe && (H = !0) && I[E !== "Y" ? "push" : "unshift"]({
                fn: Zo[E],
                val: fe[++ae]
              });
            } else S || (_ += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), I.forEach(function(he) {
            var ue = he.fn, ge = he.val;
            return i = ue(i, ge, d) || i;
          }), i = H ? i : void 0;
        }
      }
      if (!(i instanceof Date && !isNaN(i.getTime()))) {
        e.errorHandler(new Error("Invalid date provided: " + y));
        return;
      }
      return h === !0 && i.setHours(0, 0, 0, 0), i;
    }
  };
};
function Fe(t, r, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(r.getTime()).setHours(0, 0, 0, 0) : t.getTime() - r.getTime();
}
var Jo = function(t, r, e) {
  return t > Math.min(r, e) && t < Math.max(r, e);
}, Tt = function(t, r, e) {
  return t * 3600 + r * 60 + e;
}, Xo = function(t) {
  var r = Math.floor(t / 3600), e = (t - r * 3600) / 60;
  return [r, e, t - r * 3600 - e * 60];
}, Qo = {
  DAY: 864e5
};
function At(t) {
  var r = t.defaultHour, e = t.defaultMinute, g = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), s = t.minDate.getMinutes(), m = t.minDate.getSeconds();
    r < l && (r = l), r === l && e < s && (e = s), r === l && e === s && g < m && (g = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var h = t.maxDate.getHours(), w = t.maxDate.getMinutes();
    r = Math.min(r, h), r === h && (e = Math.min(w, e)), r === h && e === w && (g = t.maxDate.getSeconds());
  }
  return { hours: r, minutes: e, seconds: g };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var r = [], e = 1; e < arguments.length; e++)
    r[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var g = function(h) {
    h && Object.keys(h).forEach(function(w) {
      return t[w] = h[w];
    });
  }, l = 0, s = r; l < s.length; l++) {
    var m = s[l];
    g(m);
  }
  return t;
});
var Ee = function() {
  return Ee = Object.assign || function(t) {
    for (var r, e = 1, g = arguments.length; e < g; e++) {
      r = arguments[e];
      for (var l in r) Object.prototype.hasOwnProperty.call(r, l) && (t[l] = r[l]);
    }
    return t;
  }, Ee.apply(this, arguments);
}, Wt = function() {
  for (var t = 0, r = 0, e = arguments.length; r < e; r++) t += arguments[r].length;
  for (var g = Array(t), l = 0, r = 0; r < e; r++)
    for (var s = arguments[r], m = 0, h = s.length; m < h; m++, l++)
      g[l] = s[m];
  return g;
}, er = 300;
function tr(t, r) {
  var e = {
    config: Ee(Ee({}, dt), De.defaultConfig),
    l10n: xt
  };
  e.parseDate = Nt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = I, e._setHoursFromDate = $, e._positionCalendar = _e, e.changeMonth = u, e.changeYear = te, e.clear = b, e.close = D, e.onMouseOver = Be, e._createElement = re, e.createDay = fe, e.destroy = se, e.isEnabled = ee, e.jumpToDate = _, e.updateValue = Me, e.open = ot, e.redraw = gt, e.set = bt, e.setDate = Ct, e.toggle = K;
  function g() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, pt(), Ne(), Mt(), at(), g(), e.isMobile || ie(), ae(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && $(e.config.noCalendar ? e.latestSelectedDateObj : void 0), Me(!1)), h();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && _e(), q("onReady");
  }
  function s() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function m(n) {
    return n.bind(e);
  }
  function h() {
    var n = e.config;
    n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function() {
      if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
        var o = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = o + "px", e.calendarContainer.style.width = o + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function w(n) {
    if (e.selectedDates.length === 0) {
      var o = e.config.minDate === void 0 || Fe(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), a = At(e.config);
      o.setHours(a.hours, a.minutes, a.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && st(n);
    var v = e._input.value;
    y(), Me(), e._input.value !== v && e._debouncedChange();
  }
  function d(n, o) {
    return n % 12 + 12 * Oe(o === e.l10n.amPM[1]);
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
  function y() {
    if (!(e.hourElement === void 0 || e.minuteElement === void 0)) {
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, o = (parseInt(e.minuteElement.value, 10) || 0) % 60, a = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = d(n, e.amPM.textContent));
      var v = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && Fe(e.latestSelectedDateObj, e.config.minDate, !0) === 0, C = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && Fe(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var j = Tt(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), X = Tt(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), L = Tt(n, o, a);
        if (L > X && L < j) {
          var ne = Xo(j);
          n = ne[0], o = ne[1], a = ne[2];
        }
      } else {
        if (C) {
          var T = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, T.getHours()), n === T.getHours() && (o = Math.min(o, T.getMinutes())), o === T.getMinutes() && (a = Math.min(a, T.getSeconds()));
        }
        if (v) {
          var W = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, W.getHours()), n === W.getHours() && o < W.getMinutes() && (o = W.getMinutes()), o === W.getMinutes() && (a = Math.max(a, W.getSeconds()));
        }
      }
      x(n, o, a);
    }
  }
  function $(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && x(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function x(n, o, a) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, a || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Ae(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Oe(n % 12 === 0)), e.minuteElement.value = Ae(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Oe(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Ae(a)));
  }
  function H(n) {
    var o = ze(n), a = parseInt(o.value) + (n.delta || 0);
    (a / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(a.toString())) && te(a);
  }
  function I(n, o, a, v) {
    if (o instanceof Array)
      return o.forEach(function(C) {
        return I(n, C, a, v);
      });
    if (n instanceof Array)
      return n.forEach(function(C) {
        return I(C, o, a, v);
      });
    n.addEventListener(o, a, v), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, a, v);
      }
    });
  }
  function Z() {
    q("onChange");
  }
  function ae() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(a) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + a + "]"), function(v) {
        return I(v, "click", e[a]);
      });
    }), e.isMobile) {
      U();
      return;
    }
    var n = Rt(Re, 50);
    if (e._debouncedChange = Rt(Z, er), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && I(e.daysContainer, "mouseover", function(a) {
      e.config.mode === "range" && Be(ze(a));
    }), I(e._input, "keydown", Ye), e.calendarContainer !== void 0 && I(e.calendarContainer, "keydown", Ye), !e.config.inline && !e.config.static && I(window, "resize", n), window.ontouchstart !== void 0 ? I(window.document, "touchstart", O) : I(window.document, "mousedown", O), I(window.document, "focus", O, { capture: !0 }), e.config.clickOpens === !0 && (I(e._input, "focus", e.open), I(e._input, "click", e.open)), e.daysContainer !== void 0 && (I(e.monthNav, "click", Dt), I(e.monthNav, ["keyup", "increment"], H), I(e.daysContainer, "click", Xe)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(a) {
        return ze(a).select();
      };
      I(e.timeContainer, ["increment"], w), I(e.timeContainer, "blur", w, { capture: !0 }), I(e.timeContainer, "click", E), I([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && I(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && I(e.amPM, "click", function(a) {
        w(a);
      });
    }
    e.config.allowInput && I(e._input, "blur", Se);
  }
  function _(n, o) {
    var a = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), v = e.currentYear, C = e.currentMonth;
    try {
      a !== void 0 && (e.currentYear = a.getFullYear(), e.currentMonth = a.getMonth());
    } catch (j) {
      j.message = "Invalid date supplied: " + a, e.config.errorHandler(j);
    }
    o && e.currentYear !== v && (q("onYearChange"), z()), o && (e.currentYear !== v || e.currentMonth !== C) && q("onMonthChange"), e.redraw();
  }
  function E(n) {
    var o = ze(n);
    ~o.className.indexOf("arrow") && S(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function S(n, o, a) {
    var v = n && ze(n), C = a || v && v.parentNode && v.parentNode.firstChild, j = je("increment");
    j.delta = o, C && C.dispatchEvent(j);
  }
  function ie() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = re("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(ve()), e.innerContainer = re("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = k(), a = o.weekWrapper, v = o.weekNumbers;
        e.innerContainer.appendChild(a), e.weekNumbers = v, e.weekWrapper = a;
      }
      e.rContainer = re("div", "flatpickr-rContainer"), e.rContainer.appendChild(Ce()), e.daysContainer || (e.daysContainer = re("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), J(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(me()), Ie(e.calendarContainer, "rangeMode", e.config.mode === "range"), Ie(e.calendarContainer, "animate", e.config.animate === !0), Ie(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var C = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!C && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var j = re("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(j, e.element), j.appendChild(e.element), e.altInput && j.appendChild(e.altInput), j.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function fe(n, o, a, v) {
    var C = ee(o, !0), j = re("span", n, o.getDate().toString());
    return j.dateObj = o, j.$i = v, j.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && Fe(o, e.now) === 0 && (e.todayDateElem = j, j.classList.add("today"), j.setAttribute("aria-current", "date")), C ? (j.tabIndex = -1, Ge(o) && (j.classList.add("selected"), e.selectedDateElem = j, e.config.mode === "range" && (Ie(j, "startRange", e.selectedDates[0] && Fe(o, e.selectedDates[0], !0) === 0), Ie(j, "endRange", e.selectedDates[1] && Fe(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && j.classList.add("inRange")))) : j.classList.add("flatpickr-disabled"), e.config.mode === "range" && it(o) && !Ge(o) && j.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && v % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), q("onDayCreate", j), j;
  }
  function he(n) {
    n.focus(), e.config.mode === "range" && Be(n);
  }
  function ue(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, a = n > 0 ? e.config.showMonths : -1, v = o; v != a; v += n)
      for (var C = e.daysContainer.children[v], j = n > 0 ? 0 : C.children.length - 1, X = n > 0 ? C.children.length : -1, L = j; L != X; L += n) {
        var ne = C.children[L];
        if (ne.className.indexOf("hidden") === -1 && ee(ne.dateObj))
          return ne;
      }
  }
  function ge(n, o) {
    for (var a = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, v = o > 0 ? e.config.showMonths : -1, C = o > 0 ? 1 : -1, j = a - e.currentMonth; j != v; j += C)
      for (var X = e.daysContainer.children[j], L = a - e.currentMonth === j ? n.$i + o : o < 0 ? X.children.length - 1 : 0, ne = X.children.length, T = L; T >= 0 && T < ne && T != (o > 0 ? ne : -1); T += C) {
        var W = X.children[T];
        if (W.className.indexOf("hidden") === -1 && ee(W.dateObj) && Math.abs(n.$i - T) >= Math.abs(o))
          return he(W);
      }
    e.changeMonth(C), B(ue(C), 0);
  }
  function B(n, o) {
    var a = s(), v = ye(a || document.body), C = n !== void 0 ? n : v ? a : e.selectedDateElem !== void 0 && ye(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && ye(e.todayDateElem) ? e.todayDateElem : ue(o > 0 ? 1 : -1);
    C === void 0 ? e._input.focus() : v ? ge(C, o) : he(C);
  }
  function R(n, o) {
    for (var a = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, v = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), C = e.utils.getDaysInMonth(o, n), j = window.document.createDocumentFragment(), X = e.config.showMonths > 1, L = X ? "prevMonthDay hidden" : "prevMonthDay", ne = X ? "nextMonthDay hidden" : "nextMonthDay", T = v + 1 - a, W = 0; T <= v; T++, W++)
      j.appendChild(fe("flatpickr-day " + L, new Date(n, o - 1, T), T, W));
    for (T = 1; T <= C; T++, W++)
      j.appendChild(fe("flatpickr-day", new Date(n, o, T), T, W));
    for (var ce = C + 1; ce <= 42 - a && (e.config.showMonths === 1 || W % 7 !== 0); ce++, W++)
      j.appendChild(fe("flatpickr-day " + ne, new Date(n, o + 1, ce % C), ce, W));
    var Ue = re("div", "dayContainer");
    return Ue.appendChild(j), Ue;
  }
  function J() {
    if (e.daysContainer !== void 0) {
      $t(e.daysContainer), e.weekNumbers && $t(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var a = new Date(e.currentYear, e.currentMonth, 1);
        a.setMonth(e.currentMonth + o), n.appendChild(R(a.getFullYear(), a.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Be();
    }
  }
  function z() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(v) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && v < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && v > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var a = re("option", "flatpickr-monthDropdown-month");
          a.value = new Date(e.currentYear, o).getMonth().toString(), a.textContent = _t(o, e.config.shorthandCurrentMonth, e.l10n), a.tabIndex = -1, e.currentMonth === o && (a.selected = !0), e.monthsDropdownContainer.appendChild(a);
        }
    }
  }
  function Q() {
    var n = re("div", "flatpickr-month"), o = window.document.createDocumentFragment(), a;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? a = re("span", "cur-month") : (e.monthsDropdownContainer = re("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), I(e.monthsDropdownContainer, "change", function(X) {
      var L = ze(X), ne = parseInt(L.value, 10);
      e.changeMonth(ne - e.currentMonth), q("onMonthChange");
    }), z(), a = e.monthsDropdownContainer);
    var v = St("cur-year", { tabindex: "-1" }), C = v.getElementsByTagName("input")[0];
    C.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && C.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (C.setAttribute("max", e.config.maxDate.getFullYear().toString()), C.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var j = re("div", "flatpickr-current-month");
    return j.appendChild(a), j.appendChild(v), o.appendChild(j), n.appendChild(o), {
      container: n,
      yearElement: C,
      monthElement: a
    };
  }
  function P() {
    $t(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = Q();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function ve() {
    return e.monthNav = re("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = re("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = re("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, P(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (Ie(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (Ie(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], Pe(), e.monthNav;
  }
  function me() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = At(e.config);
    e.timeContainer = re("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = re("span", "flatpickr-time-separator", ":"), a = St("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = a.getElementsByTagName("input")[0];
    var v = St("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = v.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Ae(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = Ae(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(a), e.timeContainer.appendChild(o), e.timeContainer.appendChild(v), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var C = St("flatpickr-second");
      e.secondElement = C.getElementsByTagName("input")[0], e.secondElement.value = Ae(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(re("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(C);
    }
    return e.config.time_24hr || (e.amPM = re("span", "flatpickr-am-pm", e.l10n.amPM[Oe((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function Ce() {
    e.weekdayContainer ? $t(e.weekdayContainer) : e.weekdayContainer = re("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = re("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return Te(), e.weekdayContainer;
  }
  function Te() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = Wt(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = Wt(o.splice(n, o.length), o.splice(0, n)));
      for (var a = e.config.showMonths; a--; )
        e.weekdayContainer.children[a].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + o.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function k() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = re("div", "flatpickr-weekwrapper");
    n.appendChild(re("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = re("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function u(n, o) {
    o === void 0 && (o = !0);
    var a = o ? n : n - e.currentMonth;
    a < 0 && e._hidePrevMonthArrow === !0 || a > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += a, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, q("onYearChange"), z()), J(), q("onMonthChange"), Pe());
  }
  function b(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var a = At(e.config), v = a.hours, C = a.minutes, j = a.seconds;
      x(v, C, j);
    }
    e.redraw(), n && q("onChange");
  }
  function D() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), q("onClose");
  }
  function se() {
    e.config !== void 0 && q("onDestroy");
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
    ].forEach(function(a) {
      try {
        delete e[a];
      } catch {
      }
    });
  }
  function pe(n) {
    return e.calendarContainer.contains(n);
  }
  function O(n) {
    if (e.isOpen && !e.config.inline) {
      var o = ze(n), a = pe(o), v = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), C = !v && !a && !pe(n.relatedTarget), j = !e.config.ignoredFocusElements.some(function(X) {
        return X.contains(o);
      });
      C && j && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && w(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function te(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, a = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), a && (e.redraw(), q("onYearChange"), z());
    }
  }
  function ee(n, o) {
    var a;
    o === void 0 && (o = !0);
    var v = e.parseDate(n, void 0, o);
    if (e.config.minDate && v && Fe(v, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && v && Fe(v, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (v === void 0)
      return !1;
    for (var C = !!e.config.enable, j = (a = e.config.enable) !== null && a !== void 0 ? a : e.config.disable, X = 0, L = void 0; X < j.length; X++) {
      if (L = j[X], typeof L == "function" && L(v))
        return C;
      if (L instanceof Date && v !== void 0 && L.getTime() === v.getTime())
        return C;
      if (typeof L == "string") {
        var ne = e.parseDate(L, void 0, !0);
        return ne && ne.getTime() === v.getTime() ? C : !C;
      } else if (typeof L == "object" && v !== void 0 && L.from && L.to && v.getTime() >= L.from.getTime() && v.getTime() <= L.to.getTime())
        return C;
    }
    return !C;
  }
  function ye(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Se(n) {
    var o = n.target === e._input, a = e._input.value.trimEnd() !== qe();
    o && a && !(n.relatedTarget && pe(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ye(n) {
    var o = ze(n), a = e.config.wrap ? t.contains(o) : o === e._input, v = e.config.allowInput, C = e.isOpen && (!v || !a), j = e.config.inline && a && !v;
    if (n.keyCode === 13 && a) {
      if (v)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (pe(o) || C || j) {
      var X = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          X ? (n.preventDefault(), w(), Ke()) : Xe(n);
          break;
        case 27:
          n.preventDefault(), Ke();
          break;
        case 8:
        case 46:
          a && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!X && !a) {
            n.preventDefault();
            var L = s();
            if (e.daysContainer !== void 0 && (v === !1 || L && ye(L))) {
              var ne = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), u(ne), B(ue(1), 0)) : B(void 0, ne);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var T = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), te(e.currentYear - T), B(ue(1), 0)) : X || B(void 0, T * 7) : o === e.currentYearElement ? te(e.currentYear - T) : e.config.enableTime && (!X && e.hourElement && e.hourElement.focus(), w(n), e._debouncedChange());
          break;
        case 9:
          if (X) {
            var W = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Le) {
              return Le;
            }), ce = W.indexOf(o);
            if (ce !== -1) {
              var Ue = W[ce + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (Ue || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(o) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && o === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], y(), Me();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], y(), Me();
          break;
      }
    (a || pe(o)) && q("onKeyDown", n);
  }
  function Be(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var a = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), v = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), C = Math.min(a, e.selectedDates[0].getTime()), j = Math.max(a, e.selectedDates[0].getTime()), X = !1, L = 0, ne = 0, T = C; T < j; T += Qo.DAY)
        ee(new Date(T), !0) || (X = X || T > C && T < j, T < v && (!L || T > L) ? L = T : T > v && (!ne || T < ne) && (ne = T));
      var W = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      W.forEach(function(ce) {
        var Ue = ce.dateObj, Le = Ue.getTime(), wt = L > 0 && Le < L || ne > 0 && Le > ne;
        if (wt) {
          ce.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(lt) {
            ce.classList.remove(lt);
          });
          return;
        } else if (X && !wt)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(lt) {
          ce.classList.remove(lt);
        }), n !== void 0 && (n.classList.add(a <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), v < a && Le === v ? ce.classList.add("startRange") : v > a && Le === v && ce.classList.add("endRange"), Le >= L && (ne === 0 || Le <= ne) && Jo(Le, v, a) && ce.classList.add("inRange"));
      });
    }
  }
  function Re() {
    e.isOpen && !e.config.static && !e.config.inline && _e();
  }
  function ot(n, o) {
    if (o === void 0 && (o = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var a = ze(n);
        a && a.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), q("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var v = e.isOpen;
    e.isOpen = !0, v || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), q("onOpen"), _e(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function We(n) {
    return function(o) {
      var a = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), v = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      a !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = a.getHours() > 0 || a.getMinutes() > 0 || a.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(C) {
        return ee(C);
      }), !e.selectedDates.length && n === "min" && $(a), Me()), e.daysContainer && (gt(), a !== void 0 ? e.currentYearElement[n] = a.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!v && a !== void 0 && v.getFullYear() === a.getFullYear());
    };
  }
  function pt() {
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
    ], o = Ee(Ee({}, JSON.parse(JSON.stringify(t.dataset || {}))), r), a = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(W) {
        e.config._enable = mt(W);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(W) {
        e.config._disable = mt(W);
      }
    });
    var v = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || v)) {
      var C = De.defaultConfig.dateFormat || dt.dateFormat;
      a.dateFormat = o.noCalendar || v ? "H:i" + (o.enableSeconds ? ":S" : "") : C + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || v) && !o.altFormat) {
      var j = De.defaultConfig.altFormat || dt.altFormat;
      a.altFormat = o.noCalendar || v ? "h:i" + (o.enableSeconds ? ":S K" : " K") : j + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: We("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: We("max")
    });
    var X = function(W) {
      return function(ce) {
        e.config[W === "min" ? "_minTime" : "_maxTime"] = e.parseDate(ce, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: X("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: X("max")
    }), o.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, a, o);
    for (var L = 0; L < n.length; L++)
      e.config[n[L]] = e.config[n[L]] === !0 || e.config[n[L]] === "true";
    Bt.filter(function(W) {
      return e.config[W] !== void 0;
    }).forEach(function(W) {
      e.config[W] = jt(e.config[W] || []).map(m);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var L = 0; L < e.config.plugins.length; L++) {
      var ne = e.config.plugins[L](e) || {};
      for (var T in ne)
        Bt.indexOf(T) > -1 ? e.config[T] = jt(ne[T]).map(m).concat(e.config[T]) : typeof o[T] > "u" && (e.config[T] = ne[T]);
    }
    o.altInputClass || (e.config.altInputClass = Je().className + " " + e.config.altInputClass), q("onParseConfig");
  }
  function Je() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Ne() {
    typeof e.config.locale != "object" && typeof De.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = Ee(Ee({}, De.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? De.l10ns[e.config.locale] : void 0), Qe.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Qe.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Qe.M = "(" + e.l10n.months.shorthand.join("|") + ")", Qe.F = "(" + e.l10n.months.longhand.join("|") + ")", Qe.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = Ee(Ee({}, r), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && De.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = tn(e), e.parseDate = Nt({ config: e.config, l10n: e.l10n });
  }
  function _e(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      q("onPreCalendarPosition");
      var o = n || e._positionElement, a = Array.prototype.reduce.call(e.calendarContainer.children, function(fn, hn) {
        return fn + hn.offsetHeight;
      }, 0), v = e.calendarContainer.offsetWidth, C = e.config.position.split(" "), j = C[0], X = C.length > 1 ? C[1] : null, L = o.getBoundingClientRect(), ne = window.innerHeight - L.bottom, T = j === "above" || j !== "below" && ne < a && L.top > a, W = window.pageYOffset + L.top + (T ? -a - 2 : o.offsetHeight + 2);
      if (Ie(e.calendarContainer, "arrowTop", !T), Ie(e.calendarContainer, "arrowBottom", T), !e.config.inline) {
        var ce = window.pageXOffset + L.left, Ue = !1, Le = !1;
        X === "center" ? (ce -= (v - L.width) / 2, Ue = !0) : X === "right" && (ce -= v - L.width, Le = !0), Ie(e.calendarContainer, "arrowLeft", !Ue && !Le), Ie(e.calendarContainer, "arrowCenter", Ue), Ie(e.calendarContainer, "arrowRight", Le);
        var wt = window.document.body.offsetWidth - (window.pageXOffset + L.right), lt = ce + v > window.document.body.offsetWidth, rn = wt + v > window.document.body.offsetWidth;
        if (Ie(e.calendarContainer, "rightMost", lt), !e.config.static)
          if (e.calendarContainer.style.top = W + "px", !lt)
            e.calendarContainer.style.left = ce + "px", e.calendarContainer.style.right = "auto";
          else if (!rn)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = wt + "px";
          else {
            var Ht = yt();
            if (Ht === void 0)
              return;
            var an = window.document.body.offsetWidth, sn = Math.max(0, an / 2 - v / 2), ln = ".flatpickr-calendar.centerMost:before", dn = ".flatpickr-calendar.centerMost:after", cn = Ht.cssRules.length, un = "{left:" + L.left + "px;right:auto;}";
            Ie(e.calendarContainer, "rightMost", !1), Ie(e.calendarContainer, "centerMost", !0), Ht.insertRule(ln + "," + dn + un, cn), e.calendarContainer.style.left = sn + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function yt() {
    for (var n = null, o = 0; o < document.styleSheets.length; o++) {
      var a = document.styleSheets[o];
      if (a.cssRules) {
        try {
          a.cssRules;
        } catch {
          continue;
        }
        n = a;
        break;
      }
    }
    return n ?? Et();
  }
  function Et() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function gt() {
    e.config.noCalendar || e.isMobile || (z(), Pe(), J());
  }
  function Ke() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function Xe(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(W) {
      return W.classList && W.classList.contains("flatpickr-day") && !W.classList.contains("flatpickr-disabled") && !W.classList.contains("notAllowed");
    }, a = en(ze(n), o);
    if (a !== void 0) {
      var v = a, C = e.latestSelectedDateObj = new Date(v.dateObj.getTime()), j = (C.getMonth() < e.currentMonth || C.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = v, e.config.mode === "single")
        e.selectedDates = [C];
      else if (e.config.mode === "multiple") {
        var X = Ge(C);
        X ? e.selectedDates.splice(parseInt(X), 1) : e.selectedDates.push(C);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = C, e.selectedDates.push(C), Fe(C, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(W, ce) {
        return W.getTime() - ce.getTime();
      }));
      if (y(), j) {
        var L = e.currentYear !== C.getFullYear();
        e.currentYear = C.getFullYear(), e.currentMonth = C.getMonth(), L && (q("onYearChange"), z()), q("onMonthChange");
      }
      if (Pe(), J(), Me(), !j && e.config.mode !== "range" && e.config.showMonths === 1 ? he(v) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var ne = e.config.mode === "single" && !e.config.enableTime, T = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (ne || T) && Ke();
      }
      Z();
    }
  }
  var rt = {
    locale: [Ne, Te],
    showMonths: [P, h, Ce],
    minDate: [_],
    maxDate: [_],
    positionElement: [Y],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (I(e._input, "focus", e.open), I(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function bt(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var a in n)
        rt[a] !== void 0 && rt[a].forEach(function(v) {
          return v();
        });
    } else
      e.config[n] = o, rt[n] !== void 0 ? rt[n].forEach(function(v) {
        return v();
      }) : Bt.indexOf(n) > -1 && (e.config[n] = jt(o));
    e.redraw(), Me(!0);
  }
  function vt(n, o) {
    var a = [];
    if (n instanceof Array)
      a = n.map(function(v) {
        return e.parseDate(v, o);
      });
    else if (n instanceof Date || typeof n == "number")
      a = [e.parseDate(n, o)];
    else if (typeof n == "string")
      switch (e.config.mode) {
        case "single":
        case "time":
          a = [e.parseDate(n, o)];
          break;
        case "multiple":
          a = n.split(e.config.conjunction).map(function(v) {
            return e.parseDate(v, o);
          });
          break;
        case "range":
          a = n.split(e.l10n.rangeSeparator).map(function(v) {
            return e.parseDate(v, o);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? a : a.filter(function(v) {
      return v instanceof Date && ee(v, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(v, C) {
      return v.getTime() - C.getTime();
    });
  }
  function Ct(n, o, a) {
    if (o === void 0 && (o = !1), a === void 0 && (a = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    vt(n, a), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), _(void 0, o), $(), e.selectedDates.length === 0 && e.clear(!1), Me(o), o && q("onChange");
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
  function at() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && vt(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function Mt() {
    if (e.input = Je(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = re(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), Y();
  }
  function Y() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function U() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = re("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    I(e.mobileInput, "change", function(o) {
      e.setDate(ze(o).value, !1, e.mobileFormatStr), q("onChange"), q("onClose");
    });
  }
  function K(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function q(n, o) {
    if (e.config !== void 0) {
      var a = e.config[n];
      if (a !== void 0 && a.length > 0)
        for (var v = 0; a[v] && v < a.length; v++)
          a[v](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(je("change")), e.input.dispatchEvent(je("input")));
    }
  }
  function je(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function Ge(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var a = e.selectedDates[o];
      if (a instanceof Date && Fe(a, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function it(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : Fe(n, e.selectedDates[0]) >= 0 && Fe(n, e.selectedDates[1]) <= 0;
  }
  function Pe() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var a = new Date(e.currentYear, e.currentMonth, 1);
      a.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = _t(a.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = a.getMonth().toString(), n.value = a.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function qe(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(a) {
      return e.formatDate(a, o);
    }).filter(function(a, v, C) {
      return e.config.mode !== "range" || e.config.enableTime || C.indexOf(a) === v;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function Me(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = qe(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = qe(e.config.altFormat)), n !== !1 && q("onValueUpdate");
  }
  function Dt(n) {
    var o = ze(n), a = e.prevMonthNav.contains(o), v = e.nextMonthNav.contains(o);
    a || v ? u(a ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function st(n) {
    n.preventDefault();
    var o = n.type === "keydown", a = ze(n), v = a;
    e.amPM !== void 0 && a === e.amPM && (e.amPM.textContent = e.l10n.amPM[Oe(e.amPM.textContent === e.l10n.amPM[0])]);
    var C = parseFloat(v.getAttribute("min")), j = parseFloat(v.getAttribute("max")), X = parseFloat(v.getAttribute("step")), L = parseInt(v.value, 10), ne = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), T = L + X * ne;
    if (typeof v.value < "u" && v.value.length === 2) {
      var W = v === e.hourElement, ce = v === e.minuteElement;
      T < C ? (T = j + T + Oe(!W) + (Oe(W) && Oe(!e.amPM)), ce && S(void 0, -1, e.hourElement)) : T > j && (T = v === e.hourElement ? T - j - Oe(!e.amPM) : C, ce && S(void 0, 1, e.hourElement)), e.amPM && W && (X === 1 ? T + L === 23 : Math.abs(T - L) > X) && (e.amPM.textContent = e.l10n.amPM[Oe(e.amPM.textContent === e.l10n.amPM[0])]), v.value = Ae(T);
    }
  }
  return l(), e;
}
function ct(t, r) {
  for (var e = Array.prototype.slice.call(t).filter(function(m) {
    return m instanceof HTMLElement;
  }), g = [], l = 0; l < e.length; l++) {
    var s = e[l];
    try {
      if (s.getAttribute("data-fp-omit") !== null)
        continue;
      s._flatpickr !== void 0 && (s._flatpickr.destroy(), s._flatpickr = void 0), s._flatpickr = tr(s, r || {}), g.push(s._flatpickr);
    } catch (m) {
      console.error(m);
    }
  }
  return g.length === 1 ? g[0] : g;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return ct(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return ct([this], t);
});
var De = function(t, r) {
  return typeof t == "string" ? ct(window.document.querySelectorAll(t), r) : t instanceof Node ? ct([t], r) : ct(t, r);
};
De.defaultConfig = {};
De.l10ns = {
  en: Ee({}, xt),
  default: Ee({}, xt)
};
De.localize = function(t) {
  De.l10ns.default = Ee(Ee({}, De.l10ns.default), t);
};
De.setDefaults = function(t) {
  De.defaultConfig = Ee(Ee({}, De.defaultConfig), t);
};
De.parseDate = Nt({});
De.formatDate = tn({});
De.compareDates = Fe;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return ct(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = De);
var nr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function or(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var nn = { exports: {} };
(function(t, r) {
  (function(e, g) {
    t.exports = g();
  })(nr, function() {
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
      return e = Object.assign || function(d) {
        for (var i, y = 1, $ = arguments.length; y < $; y++) {
          i = arguments[y];
          for (var x in i) Object.prototype.hasOwnProperty.call(i, x) && (d[x] = i[x]);
        }
        return d;
      }, e.apply(this, arguments);
    }, g = function(w, d, i) {
      return i.months[d ? "shorthand" : "longhand"][w];
    };
    function l(w) {
      for (; w.firstChild; )
        w.removeChild(w.firstChild);
    }
    function s(w) {
      try {
        if (typeof w.composedPath == "function") {
          var d = w.composedPath();
          return d[0];
        }
        return w.target;
      } catch {
        return w.target;
      }
    }
    var m = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function h(w) {
      var d = e(e({}, m), w);
      return function(i) {
        i.config.dateFormat = d.dateFormat, i.config.altFormat = d.altFormat;
        var y = { monthsContainer: null };
        function $() {
          if (i.rContainer) {
            l(i.rContainer);
            for (var B = 0; B < i.monthElements.length; B++) {
              var R = i.monthElements[B];
              R.parentNode && R.parentNode.removeChild(R);
            }
          }
        }
        function x() {
          i.rContainer && (y.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), y.monthsContainer.tabIndex = -1, H(), i.rContainer.appendChild(y.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + d.theme));
        }
        function H() {
          if (y.monthsContainer) {
            l(y.monthsContainer);
            for (var B = document.createDocumentFragment(), R = 0; R < 12; R++) {
              var J = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, R), 0, R);
              J.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && J.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && J.classList.add("today"), J.textContent = g(R, d.shorthand, i.l10n), J.addEventListener("click", _), B.appendChild(J);
            }
            y.monthsContainer.appendChild(B), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function I() {
          i._bind(i.prevMonthNav, "click", function(B) {
            B.preventDefault(), B.stopPropagation(), i.changeYear(i.currentYear - 1), ae(), H();
          }), i._bind(i.nextMonthNav, "click", function(B) {
            B.preventDefault(), B.stopPropagation(), i.changeYear(i.currentYear + 1), ae(), H();
          }), i._bind(y.monthsContainer, "mouseover", function(B) {
            i.config.mode === "range" && i.onMouseOver(s(B), "flatpickr-monthSelect-month");
          });
        }
        function Z() {
          if (i.rContainer && i.selectedDates.length) {
            for (var B = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), R = 0; R < B.length; R++)
              B[R].classList.remove("selected");
            var J = i.selectedDates[0].getMonth(), z = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (J + 1) + ")");
            z && z.classList.add("selected");
          }
        }
        function ae() {
          var B = i.selectedDates[0];
          if (B && (B = new Date(B), B.setFullYear(i.currentYear), i.config.minDate && B < i.config.minDate && (B = i.config.minDate), i.config.maxDate && B > i.config.maxDate && (B = i.config.maxDate), i.currentYear = B.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var R = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            R.forEach(function(J) {
              J.dateObj.setFullYear(i.currentYear), i.config.minDate && J.dateObj < i.config.minDate || i.config.maxDate && J.dateObj > i.config.maxDate ? J.classList.add("flatpickr-disabled") : J.classList.remove("flatpickr-disabled");
            });
          }
          Z();
        }
        function _(B) {
          B.preventDefault(), B.stopPropagation();
          var R = s(B);
          if (R instanceof Element && !R.classList.contains("flatpickr-disabled") && !R.classList.contains("notAllowed") && (E(R.dateObj), i.config.closeOnSelect)) {
            var J = i.config.mode === "single", z = i.config.mode === "range" && i.selectedDates.length === 2;
            (J || z) && i.close();
          }
        }
        function E(B) {
          var R = new Date(i.currentYear, B.getMonth(), B.getDate()), J = [];
          switch (i.config.mode) {
            case "single":
              J = [R];
              break;
            case "multiple":
              J.push(R);
              break;
            case "range":
              i.selectedDates.length === 2 ? J = [R] : (J = i.selectedDates.concat([R]), J.sort(function(z, Q) {
                return z.getTime() - Q.getTime();
              }));
              break;
          }
          i.setDate(J, !0), Z();
        }
        var S = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ie(B, R, J, z) {
          var Q = S[z.keyCode] !== void 0;
          if (!(!Q && z.keyCode !== 13) && !(!i.rContainer || !y.monthsContainer)) {
            var P = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), ve = Array.prototype.indexOf.call(y.monthsContainer.children, document.activeElement);
            if (ve === -1) {
              var me = P || y.monthsContainer.firstElementChild;
              me.focus(), ve = me.$i;
            }
            Q ? y.monthsContainer.children[(12 + ve + S[z.keyCode]) % 12].focus() : z.keyCode === 13 && y.monthsContainer.contains(document.activeElement) && E(document.activeElement.dateObj);
          }
        }
        function fe() {
          var B;
          ((B = i.config) === null || B === void 0 ? void 0 : B.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || H();
        }
        function he() {
          d._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(d._stubbedCurrentMonth), i.currentMonth = d._stubbedCurrentMonth;
        }
        function ue() {
          d._stubbedCurrentMonth && (i._initialDate.setMonth(d._stubbedCurrentMonth), i.currentMonth = d._stubbedCurrentMonth, delete d._stubbedCurrentMonth);
        }
        function ge() {
          if (y.monthsContainer !== null)
            for (var B = y.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), R = 0; R < B.length; R++)
              B[R].removeEventListener("click", _);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: Z,
          onKeyDown: ie,
          onReady: [
            he,
            $,
            x,
            I,
            Z,
            function() {
              i.config.onClose.push(fe), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            ue,
            ge,
            function() {
              i.config.onClose = i.config.onClose.filter(function(B) {
                return B !== fe;
              });
            }
          ]
        };
      };
    }
    return h;
  });
})(nn);
var rr = nn.exports;
const ar = /* @__PURE__ */ or(rr), ir = { class: "relative" }, sr = ["placeholder", "disabled", "readonly"], lr = ["aria-label"], dr = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-4 w-4",
  "aria-hidden": "true"
}, cr = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-4 w-4",
  "aria-hidden": "true"
}, ur = {
  key: 2,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, fr = { class: "flex items-center justify-between mb-2" }, hr = { class: "text-xs opacity-70" }, pr = { class: "grid grid-cols-4 gap-2" }, gr = ["onClick"], vr = {
  key: 3,
  class: "mitreka-month-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, mr = { class: "mb-3 flex items-center justify-between" }, wr = { class: "text-sm font-semibold" }, kr = { class: "grid grid-cols-3 gap-2" }, xr = ["onClick"], Gt = 12, Ut = 8, Ra = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = N(null), s = N(!1), m = N((/* @__PURE__ */ new Date()).getFullYear() - 6), h = N(!1), w = N((/* @__PURE__ */ new Date()).getFullYear());
    let d = null, i = !1;
    const y = (k) => k === "auto" || k === "scroll" || k === "overlay", $ = (k) => {
      let u = (k == null ? void 0 : k.parentElement) ?? null;
      for (; u; ) {
        const b = window.getComputedStyle(u);
        if (y(b.overflowY) && u.scrollHeight > u.clientHeight)
          return u;
        u = u.parentElement;
      }
      return null;
    }, x = () => {
      const k = (d == null ? void 0 : d._positionElement) ?? null;
      return k || l.value;
    }, H = () => {
      const k = x();
      if (!k) return !1;
      const u = k.getBoundingClientRect();
      if (!(u.bottom > Gt && u.top < window.innerHeight - Gt)) return !1;
      const D = $(k);
      if (!D) return !0;
      const se = D.getBoundingClientRect();
      return u.bottom > se.top + Ut && u.top < se.bottom - Ut;
    }, I = () => {
      var u, b, D;
      if (!(d != null && d.isOpen)) return;
      if (!H()) {
        (u = d.close) == null || u.call(d);
        return;
      }
      const k = x();
      k ? (b = d._positionCalendar) == null || b.call(d, k) : (D = d._positionCalendar) == null || D.call(d);
    }, Z = (k) => {
      var b, D;
      if (!(d != null && d.isOpen)) return;
      const u = k == null ? void 0 : k.target;
      u && ((D = (b = d == null ? void 0 : d.calendarContainer) == null ? void 0 : b.contains) != null && D.call(b, u)) || I();
    }, ae = () => {
      i || (i = !0, window.addEventListener("resize", Z), window.addEventListener("scroll", Z, !0));
    }, _ = () => {
      i && (i = !1, window.removeEventListener("resize", Z), window.removeEventListener("scroll", Z, !0));
    }, E = [
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
    ], S = M(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "month-year-grid" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), ie = M(() => e.displayFormat ? e.displayFormat : e.picker === "month-year-grid" ? "M Y" : e.picker === "month" ? "M" : S.value), fe = M(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), he = M(() => {
      if (e.picker !== "month-year-grid") return "";
      const k = Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || "";
      if (!k) return "";
      const [u, b] = String(k).split("-"), D = Number(b) - 1;
      return !u || Number.isNaN(D) || D < 0 || D > 11 ? String(k) : `${E[D]} ${u}`;
    }), ue = M(() => e.picker === "year-grid" ? { value: fe.value } : e.picker === "month-year-grid" ? { value: he.value } : {}), ge = M(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), B = M(
      () => e.clearable && ge.value && !e.disabled && !e.readonly
    ), R = M(() => !e.disabled), J = M(() => B.value && R.value ? "pr-16" : B.value || R.value ? "pr-9" : ""), z = () => {
      var k;
      if (e.mode === "range" ? g("update:modelValue", []) : g("update:modelValue", ""), e.picker === "year-grid") {
        s.value = !1;
        return;
      }
      if (e.picker === "month-year-grid") {
        h.value = !1;
        return;
      }
      (k = d == null ? void 0 : d.clear) == null || k.call(d, !1);
    }, Q = () => {
      var k, u;
      if (l.value) {
        if (e.picker === "year-grid" || e.picker === "month-year-grid") {
          (k = d == null ? void 0 : d.destroy) == null || k.call(d), d = null;
          return;
        }
        (u = d == null ? void 0 : d.destroy) == null || u.call(d), d = De(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            ar({
              shorthand: !0,
              dateFormat: S.value,
              altFormat: ie.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: S.value,
          altInput: !!e.displayFormat || e.picker === "month",
          altFormat: ie.value,
          time_24hr: e.time24hr,
          monthSelectorType: e.picker === "date" ? "static" : void 0,
          shorthandCurrentMonth: !0,
          clickOpens: !0,
          allowInput: !1,
          appendTo: document.body,
          minDate: e.minDate || void 0,
          maxDate: e.maxDate || void 0,
          defaultDate: e.modelValue,
          onReady: () => {
            var b, D;
            e.picker === "month" && ((b = d == null ? void 0 : d.calendarContainer) == null || b.classList.add("flatpickr-month-only")), e.picker === "year" && ((D = d == null ? void 0 : d.calendarContainer) == null || D.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var b, D;
            ae(), e.picker === "month" && ((b = d == null ? void 0 : d.calendarContainer) == null || b.classList.add("flatpickr-month-only")), e.picker === "year" && ((D = d == null ? void 0 : d.calendarContainer) == null || D.classList.add("flatpickr-year-only")), I();
          },
          onClose: () => {
            _();
          },
          onChange: (b) => {
            if (e.mode === "range") {
              const D = b.map(
                (se) => d.formatDate(se, S.value)
              );
              g("update:modelValue", D);
            } else {
              const D = b[0] ? d.formatDate(b[0], S.value) : "";
              g("update:modelValue", D);
            }
          }
        });
      }
    }, P = () => {
      var k;
      if (!e.disabled) {
        if (e.picker === "year-grid") {
          s.value = !0;
          return;
        }
        if (e.picker === "month-year-grid") {
          h.value = !0;
          return;
        }
        (k = d == null ? void 0 : d.open) == null || k.call(d);
      }
    };
    ft(Q), nt(() => {
      var k;
      _(), (k = d == null ? void 0 : d.destroy) == null || k.call(d);
    }), we(
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
      Q
    ), we(
      () => e.modelValue,
      (k) => {
        !d || e.picker === "year-grid" || e.picker === "month-year-grid" || d.setDate(k, !1);
      }
    );
    const ve = M(
      () => Array.from({ length: 12 }, (k, u) => m.value + u)
    ), me = (k) => {
      g("update:modelValue", k.toString()), s.value = !1;
    }, Ce = (k) => {
      const u = `${w.value}-${String(k + 1).padStart(2, "0")}`;
      g("update:modelValue", u), h.value = !1;
    }, Te = (k) => {
      if (!s.value && !h.value) return;
      const u = k.target;
      if (l.value && u && l.value.contains(u)) return;
      const b = document.querySelector(".mitreka-year-grid");
      if (b && u && b.contains(u)) return;
      const D = document.querySelector(".mitreka-month-year-grid");
      D && u && D.contains(u) || (s.value = !1, h.value = !1);
    };
    return ft(() => document.addEventListener("click", Te)), nt(() => document.removeEventListener("click", Te)), (k, u) => (c(), p("div", ir, [
      f("input", Pt({
        ref_key: "inputEl",
        ref: l,
        class: ["input w-full", [t.inputClass, J.value]],
        placeholder: t.placeholder
      }, ue.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: P,
        onFocus: P
      }), null, 16, sr),
      R.value ? (c(), p("button", {
        key: 0,
        type: "button",
        class: A([
          "absolute top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
          B.value ? "right-8" : "right-2"
        ]),
        "aria-label": t.noCalendar ? "Open time picker" : "Open date picker",
        onMousedown: u[0] || (u[0] = oe(() => {
        }, ["prevent"])),
        onClick: oe(P, ["stop"])
      }, [
        t.noCalendar ? (c(), p("svg", dr, [...u[6] || (u[6] = [
          f("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2"
          }, null, -1),
          f("circle", {
            cx: "12",
            cy: "12",
            r: "9"
          }, null, -1)
        ])])) : (c(), p("svg", cr, [...u[7] || (u[7] = [
          f("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
          }, null, -1),
          f("line", {
            x1: "16",
            y1: "2",
            x2: "16",
            y2: "6"
          }, null, -1),
          f("line", {
            x1: "8",
            y1: "2",
            x2: "8",
            y2: "6"
          }, null, -1),
          f("line", {
            x1: "3",
            y1: "10",
            x2: "21",
            y2: "10"
          }, null, -1)
        ])]))
      ], 42, lr)) : F("", !0),
      B.value ? (c(), p("button", {
        key: 1,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: u[1] || (u[1] = oe(() => {
        }, ["prevent"])),
        onClick: oe(z, ["stop"])
      }, [...u[8] || (u[8] = [
        f("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "h-4 w-4",
          "aria-hidden": "true"
        }, [
          f("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 6l12 12M18 6L6 18"
          })
        ], -1)
      ])], 32)) : F("", !0),
      t.picker === "year-grid" && s.value ? (c(), p("div", ur, [
        f("div", fr, [
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: u[2] || (u[2] = (b) => m.value -= 12)
          }, " Prev "),
          f("div", hr, V(m.value) + " - " + V(m.value + 11), 1),
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: u[3] || (u[3] = (b) => m.value += 12)
          }, " Next ")
        ]),
        f("div", pr, [
          (c(!0), p(be, null, He(ve.value, (b) => (c(), p("button", {
            key: b,
            class: A(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === b.toString() }]),
            type: "button",
            onClick: (D) => me(b)
          }, V(b), 11, gr))), 128))
        ])
      ])) : F("", !0),
      t.picker === "month-year-grid" && h.value ? (c(), p("div", vr, [
        f("div", mr, [
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: u[4] || (u[4] = (b) => w.value -= 1)
          }, " Prev "),
          f("div", wr, V(w.value), 1),
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: u[5] || (u[5] = (b) => w.value += 1)
          }, " Next ")
        ]),
        f("div", kr, [
          (c(), p(be, null, He(E, (b, D) => f("button", {
            key: b,
            class: "btn btn-ghost btn-sm",
            type: "button",
            onClick: (se) => Ce(D)
          }, V(b), 9, xr)), 64))
        ])
      ])) : F("", !0)
    ]));
  }
}), Wa = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = Xt(), s = N(null), m = N(null), h = N(13), w = N(!1);
    let d = null, i = null;
    const y = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], $ = [], x = N("normal"), H = M(() => [
      "w-full",
      x.value === "autoHeight" ? "h-auto" : "h-full"
    ]), I = M(() => x.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), Z = () => {
      const k = document.documentElement, u = k.classList.contains("dark"), b = (k.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      w.value = u || b;
    }, ae = M(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : w.value), _ = M(() => ae.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), E = M(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), S = M(() => ["agx", _.value, E.value, l.class]), ie = M(() => [{ "--ag-odd-row-background-color": e.striped ? ae.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), fe = M(() => {
      const { class: k, style: u, onGridReady: b, ...D } = l;
      return D;
    }), he = (k) => typeof k == "number" && Number.isFinite(k) ? k : void 0, ue = M(() => {
      const k = l.gridOptions;
      if (k && typeof k == "object") return k;
      const u = l["grid-options"];
      return u && typeof u == "object" ? u : {};
    }), ge = (k) => {
      const u = he(l[k]);
      if (typeof u == "number") return u;
      const D = he(l[k === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof D == "number" ? D : he(ue.value[k]);
    }, B = () => {
      const k = l.domLayout;
      if (typeof k == "string" && k.length > 0) return k;
      const u = l["dom-layout"];
      if (typeof u == "string" && u.length > 0) return u;
      const b = ue.value.domLayout;
      return typeof b == "string" && b.length > 0 ? b : void 0;
    }, R = () => {
      var u, b;
      if (!m.value) return 0;
      const k = (D) => typeof D == "number" && Number.isFinite(D) && D >= 0;
      if (typeof m.value.getDisplayedRowCount == "function") {
        const D = m.value.getDisplayedRowCount();
        if (k(D)) return D;
      }
      if (typeof m.value.paginationGetRowCount == "function") {
        const D = m.value.paginationGetRowCount();
        if (k(D)) return D;
      }
      if (typeof m.value.getModel == "function") {
        const D = (b = (u = m.value).getModel) == null ? void 0 : b.call(u), se = D && typeof D.getRowCount == "function" ? D.getRowCount() : void 0;
        if (k(se)) return se;
      }
      return 0;
    }, J = () => {
      const k = Number(e.autoHeightThreshold);
      return Number.isFinite(k) ? Math.max(1, Math.floor(k)) : 15;
    }, z = () => {
      if (!m.value) return;
      const k = B();
      if (k) {
        x.value = k, m.value.setGridOption("domLayout", k);
        return;
      }
      const u = e.autoHeightWhenFewRows && R() < J() ? "autoHeight" : "normal";
      x.value = u, m.value.setGridOption("domLayout", u);
    }, Q = () => {
      var k;
      for (; $.length > 0; )
        (k = $.pop()) == null || k();
    }, P = () => {
      if (!m.value) return;
      Q();
      const k = () => z();
      y.forEach((u) => {
        m.value.addEventListener(u, k), $.push(() => {
          var b;
          (b = m.value) == null || b.removeEventListener(u, k);
        });
      });
    }, ve = () => {
      if (!e.autoHeaderHeight || !m.value) return;
      const k = ge("headerHeight") ?? yn(e.density), u = ge("groupHeaderHeight") ?? bn(e.density);
      m.value.setGridOption("headerHeight", k), m.value.setGridOption("groupHeaderHeight", u);
    }, me = () => {
      if (!e.autoRowHeight || !m.value) return;
      const k = Cn(h.value, e.density);
      m.value.setGridOption("rowHeight", k), m.value.setGridOption("getRowHeight", () => k), m.value.resetRowHeights();
    }, Ce = () => {
      i == null || i(), i = null, !(!e.pinnedShadows || !s.value) && (i = Mn(s.value));
    }, Te = (k) => {
      m.value = k.api, h.value = Dn(s.value), P(), ve(), z(), me(), Ce(), requestAnimationFrame(() => z()), g("grid-ready", k);
    };
    return we(
      () => e.density,
      () => {
        var k;
        ve(), me(), (k = m.value) == null || k.refreshCells({ force: !0 });
      }
    ), we(
      () => [
        l.headerHeight,
        l["header-height"],
        l.groupHeaderHeight,
        l["group-header-height"],
        l.gridOptions,
        l["grid-options"]
      ],
      () => {
        ve();
      }
    ), we(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        z();
      }
    ), we(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        z();
      }
    ), we(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => z()), requestAnimationFrame(() => Ce());
      }
    ), we(
      () => e.pinnedShadows,
      () => {
        requestAnimationFrame(() => Ce());
      }
    ), ft(() => {
      Z(), e.autoObserveTheme && (d = new MutationObserver(Z), d.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), Ce();
    }), nt(() => {
      d == null || d.disconnect(), Q(), i == null || i();
    }), (k, u) => (c(), p("div", {
      ref_key: "hostRef",
      ref: s,
      class: A(H.value),
      style: $e(I.value)
    }, [
      le(G(_n), Pt(fe.value, {
        class: S.value,
        theme: "legacy",
        style: ie.value,
        onGridReady: Te
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), yr = ["disabled"], br = ["onMouseenter", "onClick", "aria-selected"], Cr = 320, Lt = 12, Kt = 8, Ga = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = N(null), s = N(null), m = N(null), h = N(!1), w = N(-1), d = N(0), i = N(0), y = N(0), $ = N(240), x = N(null), H = N(!1), I = M(
      () => e.options.find((u) => u.value === e.modelValue) ?? null
    ), Z = M(() => {
      var u;
      return ((u = I.value) == null ? void 0 : u.label) ?? e.placeholder;
    }), ae = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, _ = {
      default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
      primary: "bg-primary border-primary text-primary-content hover:brightness-95",
      secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
      accent: "bg-accent border-accent text-accent-content hover:brightness-95",
      info: "bg-info border-info text-info-content hover:brightness-95",
      success: "bg-success border-success text-success-content hover:brightness-95",
      warning: "bg-warning border-warning text-warning-content hover:brightness-95",
      error: "bg-error border-error text-error-content hover:brightness-95"
    }, E = {
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
    }, ie = M(() => {
      const u = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", b = ae[e.size], D = e.variant === "outline" ? E[e.color] : _[e.color], se = e.disabled ? "opacity-60 cursor-not-allowed" : "", pe = h.value ? `ring-3 ${S[e.color]}` : "";
      return [u, b, D, se, pe].join(" ");
    }), fe = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, he = M(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), ue = (u) => {
      const b = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: b,
        backgroundColor: u ? "var(--color-base-200)" : "transparent"
      } : {
        color: b,
        backgroundColor: u ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, ge = M(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), B = M(() => ({
      top: `${d.value}px`,
      left: `${i.value}px`,
      width: `${y.value}px`
    })), R = M(() => ({
      maxHeight: `${$.value}px`
    })), J = (u) => u === "auto" || u === "scroll" || u === "overlay", z = (u) => {
      let b = (u == null ? void 0 : u.parentElement) ?? null;
      for (; b; ) {
        const D = window.getComputedStyle(b);
        if (J(D.overflowY) && b.scrollHeight > b.clientHeight)
          return b;
        b = b.parentElement;
      }
      return null;
    }, Q = () => {
      if (!s.value) return !1;
      const u = s.value.getBoundingClientRect();
      if (!(u.bottom > Lt && u.top < window.innerHeight - Lt)) return !1;
      const D = z(s.value);
      if (!D) return !0;
      const se = D.getBoundingClientRect();
      return u.bottom > se.top + Kt && u.top < se.bottom - Kt;
    }, P = () => {
      if (!h.value || !s.value || !m.value) return;
      const u = s.value.getBoundingClientRect(), b = window.innerWidth, D = window.innerHeight, se = 6, pe = Lt, O = m.value.scrollHeight || m.value.offsetHeight || 240;
      x.value == null && (x.value = O);
      const te = x.value, ee = D - u.bottom - se - pe, ye = u.top - se - pe, Se = ee < 180 && ye > ee;
      H.value = Se;
      const Be = Math.min(Cr, te, Math.max(0, Se ? ye : ee));
      $.value = Math.max(64, Be), y.value = Math.max(160, u.width), i.value = Math.min(
        Math.max(u.left, pe),
        b - y.value - pe
      ), Se ? d.value = Math.max(pe, u.top - se - $.value) : d.value = Math.min(
        D - pe - $.value,
        u.bottom + se
      );
    }, ve = () => {
      e.disabled || (h.value = !h.value, h.value && (w.value = e.options.findIndex((u) => u.value === e.modelValue), Ve(P)));
    }, me = (u) => {
      u.disabled || (g("update:modelValue", u.value), g("change", u.value), h.value = !1);
    }, Ce = (u) => {
      if (!e.disabled)
        switch (u.key) {
          case "Enter":
          case " ":
            if (u.preventDefault(), h.value && w.value >= 0) {
              const b = e.options[w.value];
              b && !b.disabled && me(b);
            } else
              ve();
            break;
          case "Escape":
            h.value = !1;
            break;
          case "ArrowDown":
            u.preventDefault(), h.value ? w.value = Math.min(w.value + 1, e.options.length - 1) : (h.value = !0, w.value = 0, Ve(P));
            break;
          case "ArrowUp":
            u.preventDefault(), h.value && (w.value = Math.max(w.value - 1, 0));
            break;
        }
    }, Te = (u) => {
      var pe, O;
      const b = u.target, D = !!((pe = l.value) != null && pe.contains(b)), se = !!((O = m.value) != null && O.contains(b));
      !D && !se && (h.value = !1);
    }, k = (u) => {
      var D;
      if (!h.value) return;
      const b = u == null ? void 0 : u.target;
      if (!(b && ((D = m.value) != null && D.contains(b)))) {
        if (!Q()) {
          h.value = !1;
          return;
        }
        P();
      }
    };
    return we(
      () => [h.value, e.options.length],
      async ([u]) => {
        if (!u) {
          x.value = null;
          return;
        }
        await Ve(), P();
      }
    ), ft(() => {
      document.addEventListener("click", Te), window.addEventListener("resize", k), window.addEventListener("scroll", k, !0);
    }), nt(() => {
      document.removeEventListener("click", Te), window.removeEventListener("resize", k), window.removeEventListener("scroll", k, !0);
    }), (u, b) => (c(), p("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      f("button", {
        ref_key: "triggerRef",
        ref: s,
        type: "button",
        class: A(ie.value),
        disabled: t.disabled,
        onClick: ve,
        onKeydown: Ce
      }, [
        f("span", {
          class: A([I.value ? "" : "opacity-60"])
        }, V(Z.value), 3),
        le(xe, {
          name: h.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, yr),
      (c(), Ze(ht, { to: "body" }, [
        le(et, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": H.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": H.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: tt(() => [
            h.value ? (c(), p("div", {
              key: 0,
              ref_key: "menuRef",
              ref: m,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: $e([he.value, B.value])
            }, [
              f("ul", {
                class: "overflow-auto",
                style: $e(R.value),
                role: "listbox"
              }, [
                (c(!0), p(be, null, He(t.options, (D, se) => {
                  var pe, O, te;
                  return c(), p("li", {
                    key: D.value,
                    class: A([
                      fe[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      D.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((pe = I.value) == null ? void 0 : pe.value) === D.value ? "font-medium" : ""
                    ]),
                    style: $e(ue(se === w.value)),
                    onMouseenter: (ee) => w.value = se,
                    onClick: (ee) => D.disabled ? null : me(D),
                    role: "option",
                    "aria-selected": ((O = I.value) == null ? void 0 : O.value) === D.value
                  }, [
                    f("span", null, V(D.label), 1),
                    ((te = I.value) == null ? void 0 : te.value) === D.value ? (c(), Ze(xe, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: $e(ge.value)
                    }, null, 8, ["style"])) : F("", !0)
                  ], 46, br);
                }), 128))
              ], 4)
            ], 4)) : F("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Mr = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, Dr = ["disabled", "placeholder", "value", "readonly"], $r = ["disabled"], Sr = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, _r = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], Er = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Hr = 320, zt = 12, qt = 8, Ua = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = N(e.modelValue ?? null);
    we(
      () => e.modelValue,
      (O) => l.value = O ?? null
    ), we(l, (O) => g("update:modelValue", O));
    const {
      root: s,
      inputEl: m,
      menu: h,
      floating: w,
      open: d,
      query: i,
      hoverIdx: y,
      loading: $,
      filtered: x,
      selected: H,
      openMenu: I,
      closeMenu: Z,
      choose: ae,
      clear: _,
      onKey: E
    } = $n(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), S = N(null), ie = N(null), fe = N(0), he = N(0), ue = N(0), ge = N(240), B = N(null), R = N(!1), J = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, z = (O) => !O || O === "default" ? "input" : `input input-${O}`, Q = M(
      () => {
        var O;
        return d.value ? i.value : ((O = H.value) == null ? void 0 : O.label) ?? "";
      }
    ), P = M(() => ({
      top: `${fe.value}px`,
      left: `${he.value}px`,
      width: `${ue.value}px`
    })), ve = M(() => ({
      maxHeight: `${ge.value}px`
    })), me = (O) => O === "auto" || O === "scroll" || O === "overlay", Ce = (O) => {
      let te = (O == null ? void 0 : O.parentElement) ?? null;
      for (; te; ) {
        const ee = window.getComputedStyle(te);
        if (me(ee.overflowY) && te.scrollHeight > te.clientHeight)
          return te;
        te = te.parentElement;
      }
      return null;
    }, Te = () => {
      if (!S.value) return !1;
      const O = S.value.getBoundingClientRect();
      if (!(O.bottom > zt && O.top < window.innerHeight - zt)) return !1;
      const ee = Ce(S.value);
      if (!ee) return !0;
      const ye = ee.getBoundingClientRect();
      return O.bottom > ye.top + qt && O.top < ye.bottom - qt;
    }, k = () => {
      var Ne, _e;
      if (!d.value || !S.value) return;
      const O = S.value.getBoundingClientRect(), te = window.innerWidth, ee = window.innerHeight, ye = 6, Se = zt, Ye = (((Ne = ie.value) == null ? void 0 : Ne.scrollHeight) ?? 0) || (((_e = h.value) == null ? void 0 : _e.scrollHeight) ?? 0) || 240;
      B.value == null && (B.value = Ye);
      const Be = B.value, Re = ee - O.bottom - ye - Se, ot = O.top - ye - Se, We = Re < 180 && ot > Re;
      R.value = We;
      const Je = Math.min(Hr, Be, Math.max(0, We ? ot : Re));
      ge.value = Math.max(64, Je), ue.value = Math.max(220, O.width), he.value = Math.min(
        Math.max(O.left, Se),
        te - ue.value - Se
      ), We ? fe.value = Math.max(Se, O.top - ye - ge.value) : fe.value = Math.min(
        ee - Se - ge.value,
        O.bottom + ye
      );
    }, u = (O) => {
      var ee;
      if (!d.value) return;
      const te = O == null ? void 0 : O.target;
      if (!(te && ((ee = ie.value) != null && ee.contains(te)))) {
        if (!Te()) {
          Z();
          return;
        }
        k();
      }
    };
    function b(O) {
      const te = O instanceof HTMLElement ? O : null;
      ie.value = te, w.value = te;
    }
    function D() {
      e.disabled || (I(), Ve(k));
    }
    function se() {
      if (!e.disabled) {
        if (d.value) {
          Z();
          return;
        }
        I(), Ve(k);
      }
    }
    function pe() {
    }
    return we(
      () => [d.value, $.value, x.value.length],
      async ([O]) => {
        O && (await Ve(), k());
      }
    ), we(d, (O) => {
      if (!O) {
        B.value = null;
        return;
      }
      Ve(k);
    }), ft(() => {
      window.addEventListener("resize", u), window.addEventListener("scroll", u, !0);
    }), nt(() => {
      window.removeEventListener("resize", u), window.removeEventListener("scroll", u, !0);
    }), (O, te) => (c(), p("div", {
      ref_key: "root",
      ref: s,
      class: "relative"
    }, [
      f("div", {
        ref_key: "triggerRef",
        ref: S,
        class: "relative"
      }, [
        f("span", Mr, [
          le(xe, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        f("input", {
          ref_key: "inputEl",
          ref: m,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: Q.value,
          onFocus: D,
          onClick: D,
          onKeydown: te[0] || (te[0] = //@ts-ignore
          (...ee) => G(E) && G(E)(...ee)),
          readonly: !G(d),
          class: A([
            J[t.size || "md"],
            z(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: te[1] || (te[1] = (ee) => G(d) ? i.value = ee.target.value : null)
        }, null, 42, Dr),
        t.clearable && G(H) && !t.disabled ? (c(), p("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onMousedown: te[2] || (te[2] = oe(
            //@ts-ignore
            (...ee) => G(_) && G(_)(...ee),
            ["prevent", "stop"]
          )),
          onClick: oe(pe, ["stop"])
        }, [
          le(xe, {
            name: "x",
            class: "w-4 h-4"
          })
        ], 32)) : F("", !0),
        f("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onMousedown: oe(se, ["prevent", "stop"]),
          onClick: oe(pe, ["stop"]),
          disabled: t.disabled
        }, [
          le(xe, {
            name: G(d) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 40, $r)
      ], 512),
      (c(), Ze(ht, { to: "body" }, [
        le(et, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": R.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": R.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: tt(() => [
            G(d) ? (c(), p("div", {
              key: 0,
              ref: b,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: $e(P.value),
              onMousedown: te[3] || (te[3] = oe(() => {
              }, ["stop"])),
              onClick: te[4] || (te[4] = oe(() => {
              }, ["stop"]))
            }, [
              G($) ? (c(), p("div", Sr, "Loading...")) : (c(), p("ul", {
                key: 1,
                ref_key: "menu",
                ref: h,
                class: "overflow-auto",
                style: $e(ve.value),
                role: "listbox"
              }, [
                (c(!0), p(be, null, He(G(x), (ee, ye) => {
                  var Se, Ye;
                  return c(), p("li", {
                    key: ee.value,
                    "data-idx": ye,
                    class: A([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      ye === G(y) ? "bg-base-200" : "",
                      ee.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (Be) => y.value = ye,
                    onMousedown: oe((Be) => ee.disabled ? null : G(ae)(ee), ["prevent"]),
                    role: "option",
                    "aria-selected": ((Se = G(H)) == null ? void 0 : Se.value) === ee.value
                  }, [
                    f("span", null, V(ee.label), 1),
                    ((Ye = G(H)) == null ? void 0 : Ye.value) === ee.value ? (c(), Ze(xe, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : F("", !0)
                  ], 42, _r);
                }), 128)),
                !G(x).length && !G($) ? (c(), p("li", Er, " No results ")) : F("", !0)
              ], 4))
            ], 36)) : F("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Br = { class: "truncate" }, jr = ["onClick"], Ir = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, Tr = {
  key: 1,
  class: "flex-1 min-w-0"
}, Ar = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, Lr = { class: "truncate" }, zr = ["onClick"], Fr = { class: "flex items-center gap-2 w-full" }, Or = { class: "flex-1 min-w-[8ch]" }, Vr = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, Nr = { class: "truncate" }, Pr = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Yr = ["onClick"], Rr = ["checked", "onClick"], Wr = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Gr = 320, Ft = 12, Zt = 8, Ur = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = M({
      get: () => e.modelValue ?? [],
      set: (Y) => g("update:modelValue", Y ?? [])
    }), {
      root: s,
      inputEl: m,
      menu: h,
      floating: w,
      open: d,
      query: i,
      loading: y,
      filtered: $,
      selectedList: x,
      openMenu: H,
      closeMenu: I,
      toggle: Z,
      clearAll: ae,
      onKey: _
    } = Sn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), E = N(null), S = N(null), ie = N(0), fe = N(0), he = N(0), ue = N(240), ge = N(null), B = N(!1), R = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, J = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, z = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, Q = {
      xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
      md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
      lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" }
    }, P = {
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
    }, me = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, Ce = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, Te = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, k = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, u = M(() => e.displayMode ?? "stacked"), b = M(() => u.value === "inline-compact"), D = M(
      () => J[e.size || "md"]
    ), se = M(
      () => z[D.value]
    ), pe = M(
      () => Q[D.value]
    ), O = M(() => ({
      top: `${ie.value}px`,
      left: `${fe.value}px`,
      width: `${he.value}px`
    })), te = M(() => ({
      maxHeight: `${ue.value}px`
    })), ee = (Y) => Y === "auto" || Y === "scroll" || Y === "overlay", ye = (Y) => {
      let U = (Y == null ? void 0 : Y.parentElement) ?? null;
      for (; U; ) {
        const K = window.getComputedStyle(U);
        if (ee(K.overflowY) && U.scrollHeight > U.clientHeight)
          return U;
        U = U.parentElement;
      }
      return null;
    }, Se = () => {
      if (!E.value) return !1;
      const Y = E.value.getBoundingClientRect();
      if (!(Y.bottom > Ft && Y.top < window.innerHeight - Ft)) return !1;
      const K = ye(E.value);
      if (!K) return !0;
      const q = K.getBoundingClientRect();
      return Y.bottom > q.top + Zt && Y.top < q.bottom - Zt;
    }, Ye = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), Be = (Y) => l.value.some((U) => String(U) === String(Y)), Re = M(() => [...$.value].sort((Y, U) => {
      const K = Be(Y.value), q = Be(U.value);
      return K !== q ? K ? -1 : 1 : Ye.compare(Y.label, U.label);
    })), ot = M(
      () => l.value.map((Y) => String(Y)).sort().join("|")
    ), We = N(null), pt = N(null), Je = N([]), Ne = N(0);
    let _e = null;
    const yt = M(
      () => Math.max(0, x.value.length - Ne.value)
    );
    function Et(Y, U) {
      Y && (Je.value[U] = Y);
    }
    function gt() {
      var it, Pe, qe;
      if (!b.value) {
        Ne.value = x.value.length;
        return;
      }
      const Y = ((it = We.value) == null ? void 0 : it.clientWidth) ?? 0, U = x.value.length;
      if (!Y || U === 0) {
        Ne.value = U;
        return;
      }
      const K = ((Pe = pt.value) == null ? void 0 : Pe.offsetWidth) ?? 28, q = 6;
      let je = 0, Ge = 0;
      for (let Me = 0; Me < U; Me += 1) {
        const Dt = ((qe = Je.value[Me]) == null ? void 0 : qe.offsetWidth) ?? 0, st = je + (Me > 0 ? q : 0) + Dt, o = U - (Me + 1) > 0 ? q + K : 0;
        if (st + o <= Y)
          je = st, Ge = Me + 1;
        else
          break;
      }
      Ge === 0 && U > 0 && (Ge = 1), Ne.value = Ge;
    }
    const Ke = () => {
      var n, o;
      if (!d.value || !E.value) return;
      const Y = E.value.getBoundingClientRect(), U = window.innerWidth, K = window.innerHeight, q = 6, je = Ft, Ge = (((n = S.value) == null ? void 0 : n.scrollHeight) ?? 0) || (((o = h.value) == null ? void 0 : o.scrollHeight) ?? 0) || 240;
      ge.value == null && (ge.value = Ge);
      const it = ge.value, Pe = K - Y.bottom - q - je, qe = Y.top - q - je, Me = Pe < 180 && qe > Pe;
      B.value = Me;
      const st = Math.min(Gr, it, Math.max(0, Me ? qe : Pe));
      ue.value = Math.max(64, st), he.value = Math.max(260, Y.width), fe.value = Math.min(
        Math.max(Y.left, je),
        U - he.value - je
      ), Me ? ie.value = Math.max(je, Y.top - q - ue.value) : ie.value = Math.min(
        K - je - ue.value,
        Y.bottom + q
      );
    }, Xe = (Y) => {
      var K;
      if (!d.value) return;
      const U = Y == null ? void 0 : Y.target;
      if (!(U && ((K = S.value) != null && K.contains(U)))) {
        if (!Se()) {
          I();
          return;
        }
        Ke();
      }
    };
    function rt(Y) {
      const U = Y instanceof HTMLElement ? Y : null;
      S.value = U, w.value = U;
    }
    function bt() {
      e.disabled || (H(), Ve(Ke));
    }
    function vt() {
      e.disabled || (d.value = !0, Ve(Ke));
    }
    function Ct() {
      if (!e.disabled) {
        if (d.value) {
          I();
          return;
        }
        H(), Ve(Ke);
      }
    }
    function mt() {
      ae(), bt();
    }
    function at() {
    }
    async function Mt() {
      await Ve(), gt();
    }
    return we(
      () => [x.value.length, e.size, e.displayMode, i.value],
      () => {
        Mt();
      },
      { immediate: !0 }
    ), we(Re, () => {
      Mt();
    }), we(
      () => [d.value, y.value, Re.value.length],
      async ([Y]) => {
        if (!Y) {
          ge.value = null;
          return;
        }
        await Ve(), Ke();
      }
    ), we(We, (Y) => {
      _e == null || _e.disconnect(), _e = null, Y && (_e = new ResizeObserver(() => {
        gt();
      }), _e.observe(Y));
    }), ft(() => {
      window.addEventListener("resize", Xe), window.addEventListener("scroll", Xe, !0);
    }), nt(() => {
      _e == null || _e.disconnect(), window.removeEventListener("resize", Xe), window.removeEventListener("scroll", Xe, !0);
    }), (Y, U) => (c(), p("div", {
      ref_key: "root",
      ref: s,
      class: "relative"
    }, [
      f("div", {
        ref_key: "triggerRef",
        ref: E,
        class: A([
          u.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          R[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: bt
      }, [
        u.value === "inline-compact" ? (c(), p(be, { key: 0 }, [
          f("span", {
            class: A(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", Ce[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3),
          G(x).length ? (c(), p("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: We,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (c(!0), p(be, null, He(G(x).slice(0, Ne.value), (K) => (c(), p("span", {
              key: K.value,
              class: A(["badge badge-soft-primary gap-1 max-w-[12rem]", P[t.size || "md"]])
            }, [
              f("span", Br, V(K.label), 1),
              f("button", {
                type: "button",
                class: A([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ve[t.size || "md"]
                ]),
                onClick: oe((q) => G(Z)(K.value), ["stop"])
              }, [
                le(xe, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, jr)
            ], 2))), 128)),
            yt.value > 0 ? (c(), p("span", Ir, " +" + V(yt.value), 1)) : F("", !0)
          ], 512)) : (c(), p("span", Tr)),
          f("span", {
            class: A([
              G(x).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            Ot(f("input", {
              ref_key: "inputEl",
              ref: m,
              "onUpdate:modelValue": U[0] || (U[0] = (K) => Yt(i) ? i.value = K : null),
              class: A([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: $e(se.value),
              placeholder: "Search...",
              onKeydown: U[1] || (U[1] = //@ts-ignore
              (...K) => G(_) && G(_)(...K)),
              onFocus: vt
            }, null, 36), [
              [Vt, G(i)]
            ])
          ], 2),
          f("button", {
            type: "button",
            class: A(["icon-btn icon-btn-outline shrink-0", me[t.size || "md"]]),
            onMousedown: oe(Ct, ["prevent", "stop"]),
            onClick: oe(at, ["stop"])
          }, [
            le(xe, {
              name: G(d) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 34),
          G(x).length ? (c(), p("button", {
            key: 2,
            type: "button",
            class: A(["icon-btn icon-btn-outline shrink-0", me[t.size || "md"]]),
            onMousedown: oe(mt, ["prevent", "stop"]),
            onClick: oe(at, ["stop"])
          }, [
            le(xe, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 34)) : F("", !0)
        ], 64)) : (c(), p(be, { key: 1 }, [
          G(x).length ? (c(), p("div", Ar, [
            (c(!0), p(be, null, He(G(x), (K) => (c(), p("span", {
              key: K.value,
              class: A(["badge badge-soft-primary gap-1 max-w-full", P[t.size || "md"]])
            }, [
              f("span", Lr, V(K.label), 1),
              f("button", {
                type: "button",
                class: A([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ve[t.size || "md"]
                ]),
                onClick: oe((q) => G(Z)(K.value), ["stop"])
              }, [
                le(xe, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, zr)
            ], 2))), 128))
          ])) : (c(), p("span", {
            key: 1,
            class: A(["opacity-60 w-full", Ce[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3)),
          f("div", Fr, [
            f("span", Or, [
              Ot(f("input", {
                ref_key: "inputEl",
                ref: m,
                "onUpdate:modelValue": U[2] || (U[2] = (K) => Yt(i) ? i.value = K : null),
                class: A([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: $e(pe.value),
                placeholder: "Search...",
                onKeydown: U[3] || (U[3] = //@ts-ignore
                (...K) => G(_) && G(_)(...K)),
                onFocus: vt
              }, null, 36), [
                [Vt, G(i)]
              ])
            ]),
            f("button", {
              type: "button",
              class: A(["icon-btn icon-btn-outline shrink-0", me[t.size || "md"]]),
              onMousedown: oe(Ct, ["prevent", "stop"]),
              onClick: oe(at, ["stop"])
            }, [
              le(xe, {
                name: G(d) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 34),
            G(x).length ? (c(), p("button", {
              key: 0,
              type: "button",
              class: A(["icon-btn icon-btn-outline shrink-0", me[t.size || "md"]]),
              onMousedown: oe(mt, ["prevent", "stop"]),
              onClick: oe(at, ["stop"])
            }, [
              le(xe, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 34)) : F("", !0)
          ])
        ], 64)),
        b.value ? (c(), p("div", Vr, [
          (c(!0), p(be, null, He(G(x), (K, q) => (c(), p("span", {
            key: `measure-${K.value}`,
            ref_for: !0,
            ref: (je) => Et(je, q),
            class: A(["badge badge-soft-primary gap-1 max-w-[12rem]", P[t.size || "md"]])
          }, [
            f("span", Nr, V(K.label), 1),
            f("span", {
              class: A([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                ve[t.size || "md"]
              ])
            }, [
              le(xe, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          f("span", {
            ref_key: "measureCounterEl",
            ref: pt,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : F("", !0)
      ], 2),
      (c(), Ze(ht, { to: "body" }, [
        le(et, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: tt(() => [
            G(d) ? (c(), p("div", {
              key: 0,
              ref: rt,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: $e(O.value),
              onMousedown: U[4] || (U[4] = oe(() => {
              }, ["stop"])),
              onClick: U[5] || (U[5] = oe(() => {
              }, ["stop"]))
            }, [
              G(y) ? (c(), p("div", Pr, "Loading...")) : (c(), p("ul", {
                key: 1,
                ref_key: "menu",
                ref: h,
                class: "overflow-auto",
                style: $e(te.value)
              }, [
                (c(!0), p(be, null, He(Re.value, (K) => (c(), p("li", {
                  key: `${ot.value}:${String(K.value)}`,
                  class: A([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    Te[t.size || "md"],
                    Be(K.value) ? "bg-primary/15" : ""
                  ]),
                  onClick: oe((q) => G(Z)(K.value), ["stop", "prevent"])
                }, [
                  f("input", {
                    type: "checkbox",
                    class: A([k[t.size || "md"]]),
                    checked: Be(K.value),
                    onClick: oe((q) => G(Z)(K.value), ["stop", "prevent"])
                  }, null, 10, Rr),
                  f("span", null, V(K.label), 1)
                ], 10, Yr))), 128)),
                !Re.value.length && !G(y) ? (c(), p("li", Wr, " No results ")) : F("", !0)
              ], 4))
            ], 36)) : F("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), on = (t, r) => {
  const e = t.__vccOpts || t;
  for (const [g, l] of r)
    e[g] = l;
  return e;
}, Ka = /* @__PURE__ */ on(Ur, [["__scopeId", "data-v-d4c42ded"]]), Kr = { class: "font-medium" }, qr = { class: "text-sm opacity-60" }, Zr = {
  key: 0,
  class: "text-xs opacity-60 space-y-1"
}, Jr = { key: 0 }, Xr = { key: 1 }, Qr = ["multiple", "accept", "disabled"], ea = {
  key: 0,
  class: "space-y-2"
}, ta = { class: "flex items-center gap-2 min-w-0" }, na = { class: "text-sm truncate" }, oa = ["onClick"], ra = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-3"
}, aa = ["src", "alt"], ia = ["onClick"], sa = {
  key: 2,
  class: "text-xs opacity-60"
}, qa = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = N(!1), s = N(e.modelValue ?? []), m = N([]), h = (_) => !e.maxFiles || e.maxFiles <= 0 ? _ : _.slice(0, e.maxFiles), w = (_) => {
      s.value = h(_), g("update:modelValue", s.value), g("change", s.value);
    }, d = M(() => s.value.length > 0), i = M(
      () => s.value.map((_, E) => ({
        index: E,
        name: _.name,
        file: _,
        isImage: _.type.startsWith("image/")
      }))
    ), y = M(
      () => e.preview ? i.value.filter((_) => !_.isImage) : i.value
    ), $ = M(() => !!(e.helperText || e.maxSizeText)), x = (_) => {
      var ie;
      const E = ((ie = _.name.split(".").pop()) == null ? void 0 : ie.toLowerCase()) ?? "", S = _.type.toLowerCase();
      return S.startsWith("image/") ? "image" : S === "application/pdf" || E === "pdf" ? "file-pdf" : E === "xls" || E === "xlsx" || S === "application/vnd.ms-excel" || S === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "file-xls" : E === "csv" || S === "text/csv" ? "file-csv" : E === "doc" || E === "docx" || S === "application/msword" || S === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "file-doc" : E === "ppt" || E === "pptx" || S === "application/vnd.ms-powerpoint" || S === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? "file-ppt" : E === "txt" || S === "text/plain" ? "file-txt" : E === "zip" || E === "rar" || E === "7z" || E === "tar" || E === "gz" || S === "application/zip" || S === "application/x-zip-compressed" || S === "application/x-rar-compressed" || S === "application/x-7z-compressed" || S === "application/gzip" || S === "application/x-tar" ? "file-archive" : "file";
    }, H = () => {
      m.value.forEach((_) => URL.revokeObjectURL(_.url)), m.value = s.value.map((_, E) => ({ file: _, fileIndex: E })).filter((_) => _.file.type.startsWith("image/")).map(({ file: _, fileIndex: E }) => ({
        id: `${_.name}-${_.size}-${_.lastModified}-${E}`,
        name: _.name,
        url: URL.createObjectURL(_),
        fileIndex: E
      }));
    }, I = (_) => {
      const E = _.target, S = Array.from(E.files ?? []);
      S.length && (e.multiple ? w([...s.value, ...S]) : w([S[0]]), E.value = "");
    }, Z = (_) => {
      var S;
      if (e.disabled) return;
      l.value = !1;
      const E = Array.from(((S = _.dataTransfer) == null ? void 0 : S.files) ?? []);
      E.length && (e.multiple ? w([...s.value, ...E]) : w([E[0]]));
    }, ae = (_) => {
      const E = [...s.value];
      E.splice(_, 1), w(E);
    };
    return we(
      () => e.modelValue,
      (_) => {
        s.value = h(_ ?? []);
      }
    ), we(
      s,
      () => {
        H();
      },
      { immediate: !0 }
    ), nt(() => {
      m.value.forEach((_) => URL.revokeObjectURL(_.url));
    }), (_, E) => (c(), p("div", {
      class: A(["space-y-3", e.class])
    }, [
      f("div", {
        class: A(["dropzone", [{ "dropzone-active": l.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: E[0] || (E[0] = oe((S) => l.value = !0, ["prevent"])),
        onDragleave: E[1] || (E[1] = (S) => l.value = !1),
        onDrop: oe(Z, ["prevent"])
      }, [
        le(xe, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        f("p", Kr, V(t.dropzoneText), 1),
        f("p", qr, V(t.browseText), 1),
        $.value ? (c(), p("div", Zr, [
          t.helperText ? (c(), p("p", Jr, V(t.helperText), 1)) : F("", !0),
          t.maxSizeText ? (c(), p("p", Xr, V(t.maxSizeText), 1)) : F("", !0)
        ])) : F("", !0),
        f("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: I
        }, null, 40, Qr)
      ], 34),
      y.value.length ? (c(), p("div", ea, [
        (c(!0), p(be, null, He(y.value, (S) => (c(), p("div", {
          key: `${S.name}-${S.index}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          f("span", ta, [
            le(xe, {
              name: x(S.file),
              class: "w-4 h-4 shrink-0"
            }, null, 8, ["name"]),
            f("span", na, V(S.name), 1)
          ]),
          f("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ie) => ae(S.index)
          }, [
            le(xe, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, oa)
        ]))), 128))
      ])) : F("", !0),
      t.preview && m.value.length ? (c(), p("div", ra, [
        (c(!0), p(be, null, He(m.value, (S) => (c(), p("div", {
          key: S.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          f("img", {
            src: S.url,
            alt: S.name,
            class: "w-full h-full object-cover"
          }, null, 8, aa),
          f("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ie) => ae(S.fileIndex)
          }, [
            le(xe, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, ia)
        ]))), 128))
      ])) : F("", !0),
      d.value ? F("", !0) : (c(), p("p", sa, V(t.emptyText), 1))
    ], 2));
  }
}), la = {
  key: 0,
  class: "mitreka-input-addon"
}, da = { class: "mitreka-input-inner w-full" }, ca = {
  key: 0,
  class: "mitreka-input-icon mitreka-input-icon--left"
}, ua = ["type", "inputmode", "value", "placeholder", "disabled", "readonly"], fa = {
  key: 1,
  class: "mitreka-input-icon mitreka-input-icon--right"
}, ha = ["aria-label"], pa = {
  key: 1,
  class: "mitreka-input-addon"
}, Za = /* @__PURE__ */ de({
  __name: "Input",
  props: {
    modelValue: { default: "" },
    type: { default: "text" },
    placeholder: { default: "" },
    size: { default: "md" },
    color: { default: "default" },
    disabled: { type: Boolean, default: !1 },
    readonly: { type: Boolean, default: !1 },
    mask: { default: "none" },
    maxDigits: { default: void 0 },
    clearable: { type: Boolean, default: !1 },
    passwordToggle: { type: Boolean, default: !1 },
    prefixIcon: { default: "" },
    suffixIcon: { default: "" },
    addonLeft: { default: "" },
    addonRight: { default: "" }
  },
  emits: ["update:modelValue", "clear", "enter", "focus", "blur"],
  setup(t, { emit: r }) {
    const e = t, g = r, l = Xt(), s = N(!1), m = (z, Q) => {
      const P = z.replace(/\D/g, "");
      return typeof Q == "number" ? P.slice(0, Q) : P;
    }, h = (z, Q) => {
      const P = m(z, Q ?? 15);
      return P ? P.startsWith("62") ? `+${P}` : P.startsWith("0") ? P : `0${P}` : "";
    }, w = (z, Q, P = " ") => {
      var ve;
      return ((ve = z.match(new RegExp(`.{1,${Q}}`, "g"))) == null ? void 0 : ve.join(P)) ?? z;
    }, d = (z, Q) => w(m(z, Q ?? 16), 4), i = (z, Q) => {
      const P = m(z, Q ?? 15);
      return [
        P.slice(0, 2),
        P.slice(2, 5),
        P.slice(5, 8),
        P.slice(8, 9),
        P.slice(9, 12),
        P.slice(12, 15)
      ].filter(Boolean).map((me, Ce) => Ce === 0 ? me : Ce === 3 ? `.${me}` : Ce === 4 ? `-${me}` : `.${me}`).join("");
    }, y = (z, Q) => {
      const P = m(z, Q ?? 15);
      return P ? new Intl.NumberFormat("id-ID").format(Number(P)) : "";
    }, $ = (z) => e.mask === "digits" ? m(z, e.maxDigits) : e.mask === "phone-id" ? h(z, e.maxDigits) : e.mask === "nik" ? d(z, e.maxDigits) : e.mask === "npwp" ? i(z, e.maxDigits) : e.mask === "currency-idr" ? y(z, e.maxDigits) : z, x = M(() => String(e.modelValue ?? "")), H = M(() => x.value.length > 0), I = M(() => !!e.prefixIcon), Z = M(() => !!e.suffixIcon), ae = M(() => !!e.addonLeft || !!e.addonRight), _ = M(
      () => e.clearable && H.value && !e.disabled && !e.readonly
    ), E = M(
      () => e.passwordToggle && e.type === "password" && !e.disabled
    ), S = M(() => e.mask !== "none" && e.type !== "password" || E.value && s.value ? "text" : e.type), ie = M(() => {
      if (e.mask === "phone-id" || e.mask === "nik" || e.mask === "npwp" || e.mask === "digits") return "numeric";
      if (e.mask === "currency-idr") return "decimal";
    }), fe = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, he = M(
      () => e.color === "default" ? "" : `input-${e.color}`
    ), ue = M(() => [
      "input",
      fe[e.size],
      he.value,
      I.value ? "mitreka-input-has-prefix" : "",
      Z.value || _.value || E.value ? "mitreka-input-has-suffix" : ""
    ]), ge = (z) => {
      const Q = z.target, P = $(Q.value);
      Q.value !== P && (Q.value = P), g("update:modelValue", P);
    }, B = () => {
      g("update:modelValue", ""), g("clear");
    }, R = () => {
      s.value = !s.value;
    }, J = (z) => {
      z.key === "Enter" && g("enter");
    };
    return (z, Q) => (c(), p("div", {
      class: A(["mitreka-input-group w-full", ae.value ? "mitreka-input-group--with-addon" : ""])
    }, [
      t.addonLeft ? (c(), p("span", la, V(t.addonLeft), 1)) : F("", !0),
      f("div", da, [
        I.value ? (c(), p("span", ca, [
          le(xe, {
            name: t.prefixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : F("", !0),
        f("input", Pt(G(l), {
          type: S.value,
          inputmode: ie.value,
          value: x.value,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: ue.value,
          onInput: ge,
          onFocus: Q[0] || (Q[0] = (P) => g("focus", P)),
          onBlur: Q[1] || (Q[1] = (P) => g("blur", P)),
          onKeydown: J
        }), null, 16, ua),
        Z.value ? (c(), p("span", fa, [
          le(xe, {
            name: t.suffixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : F("", !0),
        _.value ? (c(), p("button", {
          key: 2,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": "Clear input",
          onClick: B
        }, [
          le(xe, {
            name: "x",
            class: "w-4 h-4 opacity-70"
          })
        ])) : F("", !0),
        E.value ? (c(), p("button", {
          key: 3,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": s.value ? "Hide password" : "Show password",
          onClick: R
        }, [
          le(xe, {
            name: s.value ? "eye-off" : "eye",
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ], 8, ha)) : F("", !0)
      ]),
      t.addonRight ? (c(), p("span", pa, V(t.addonRight), 1)) : F("", !0)
    ], 2));
  }
}), ga = { class: "tree-list" }, va = {
  key: 0,
  class: "tree-list__empty"
}, ma = ["onClick"], wa = ["onClick"], ka = {
  key: 1,
  class: "tree-list__toggle-space"
}, xa = {
  key: 2,
  class: "tree-list__code"
}, ya = /* @__PURE__ */ de({
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
  setup(t, { emit: r }) {
    const e = t, g = r, l = M(
      () => e.expandedIds instanceof Set ? e.expandedIds : new Set(e.expandedIds)
    ), s = M(() => {
      const $ = [], x = (H, I, Z, ae) => {
        H.forEach((_, E) => {
          var ie;
          const S = [...Z, E + 1];
          $.push({
            node: _,
            depth: I,
            numberLabel: S.join("."),
            ancestors: ae
          }), (ie = _.children) != null && ie.length && x(_.children, I + 1, S, [...ae, _.id]);
        });
      };
      return x(e.nodes ?? [], 0, [], []), $;
    }), m = M(() => {
      const $ = [], x = (H, I, Z) => {
        H.forEach((ae, _) => {
          var S;
          const E = [...Z, _ + 1];
          $.push({
            node: ae,
            depth: I,
            numberLabel: E.join("."),
            ancestors: []
          }), (S = ae.children) != null && S.length && l.value.has(ae.id) && x(ae.children, I + 1, E);
        });
      };
      return x(e.nodes ?? [], 0, []), $;
    }), h = M(() => {
      const $ = e.searchQuery.trim().toLowerCase();
      if (!$) return m.value;
      const x = /* @__PURE__ */ new Set();
      return s.value.forEach((H) => {
        `${y(H)} ${H.node.name}`.toLowerCase().includes($) && (x.add(H.node.id), H.ancestors.forEach((Z) => x.add(Z)));
      }), s.value.filter((H) => x.has(H.node.id));
    }), w = ($) => {
      var x;
      return !!((x = $.children) != null && x.length);
    };
    function d($) {
      g("toggle", $);
    }
    function i($) {
      g("row-click", $);
    }
    function y($) {
      if (e.codeMode === "none") return "";
      if (e.codeMode === "field") {
        const x = $.node[e.codeField];
        return x == null ? "" : String(x);
      }
      return `${$.numberLabel}.`;
    }
    return ($, x) => (c(), p("div", ga, [
      h.value.length ? F("", !0) : (c(), p("div", va, V(t.emptyText), 1)),
      (c(!0), p(be, null, He(h.value, (H) => (c(), p("div", {
        key: H.node.id,
        class: "tree-list__row-wrap"
      }, [
        f("div", {
          class: A(["tree-list__row", { "tree-list__row--with-guides": H.depth > 0 }]),
          style: $e({
            paddingLeft: `${t.baseIndent + H.depth * t.indentStep}px`,
            "--guide-width": `${H.depth * t.indentStep}px`
          }),
          onClick: (I) => i(H.node)
        }, [
          w(H.node) ? (c(), p("button", {
            key: 0,
            class: "tree-list__toggle",
            type: "button",
            onClick: oe((I) => d(H.node.id), ["stop"])
          }, [
            le(xe, {
              name: "chevron-right",
              class: A(["w-4 h-4 text-base-content/50 transition-transform duration-150", { "rotate-90": l.value.has(H.node.id) }])
            }, null, 8, ["class"])
          ], 8, wa)) : (c(), p("span", ka)),
          t.codeMode !== "none" ? (c(), p("span", xa, V(y(H)), 1)) : F("", !0),
          f("span", {
            class: A(["tree-list__name", H.depth === 0 ? "font-semibold" : ""])
          }, V(H.node.name), 3),
          ke($.$slots, "meta", {
            row: H,
            node: H.node
          }, void 0, !0),
          x[1] || (x[1] = f("span", { class: "flex-1" }, null, -1)),
          f("div", {
            class: "tree-list__actions",
            onClick: x[0] || (x[0] = oe(() => {
            }, ["stop"]))
          }, [
            ke($.$slots, "actions", {
              row: H,
              node: H.node
            }, void 0, !0)
          ])
        ], 14, ma)
      ]))), 128))
    ]));
  }
}), Ja = /* @__PURE__ */ on(ya, [["__scopeId", "data-v-3c1b8432"]]);
export {
  Ya as A,
  Ka as M,
  Ja as T,
  Da as _,
  $a as a,
  Sa as b,
  _a as c,
  Ea as d,
  Ha as e,
  Ba as f,
  Jn as g,
  ja as h,
  Ia as i,
  Ta as j,
  Aa as k,
  La as l,
  za as m,
  Fa as n,
  Oa as o,
  Va as p,
  Na as q,
  Pa as r,
  xe as s,
  Ra as t,
  Wa as u,
  Ga as v,
  Ua as w,
  qa as x,
  Za as y,
  Qt as z
};
