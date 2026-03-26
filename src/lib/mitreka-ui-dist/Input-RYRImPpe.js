import { defineComponent as ie, createElementBlock as g, openBlock as u, normalizeClass as B, createCommentVNode as I, renderSlot as fe, createElementVNode as f, ref as F, watch as de, withKeys as dt, withModifiers as ve, createBlock as Ue, Teleport as ut, createVNode as ae, Transition as Xe, withCtx as Qe, toDisplayString as V, provide as rn, inject as sn, computed as y, normalizeStyle as xe, createTextVNode as Ot, Fragment as me, renderList as Ee, unref as A, useSlots as ln, resolveDynamicComponent as dn, reactive as cn, withDirectives as Bt, vModelText as Tt, onMounted as ct, onBeforeUnmount as et, mergeProps as It, useAttrs as Nt, nextTick as Fe, isRef as Lt } from "vue";
import { d as un, c as fn, f as hn, h as pn, i as gn, g as vn, r as mn, a as wn, b as kn } from "./useAgGridRowHeight-CkXm93Od.js";
import { AgGridVue as xn } from "ag-grid-vue3";
const yn = ["disabled"], bn = {
  key: 0,
  class: "animate-spin"
}, dr = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: i, color: c } = e;
      return c === "default" ? i === "outline" ? "btn-outline" : i === "ghost" ? "btn-ghost" : "" : i === "solid" ? `btn-${c}` : i === "outline" ? `btn-outline btn-outline-${c}` : i === "soft" ? `btn-soft-${c}` : i === "ghost" ? "btn-ghost" : "";
    }, v = (i) => {
      !e.disabled && !e.loading && p("click", i);
    };
    return (i, c) => (u(), g("button", {
      class: B(["btn", l[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: v
    }, [
      t.loading ? (u(), g("span", bn, [...c[0] || (c[0] = [
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
      ])])) : I("", !0),
      fe(i.$slots, "default")
    ], 10, yn));
  }
}), cr = /* @__PURE__ */ ie({
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
    }, p = () => {
      const { variant: l, color: d } = a;
      return d === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${d}` : l === "outline" ? `badge-outline badge-outline-${d}` : l === "soft" ? `badge-soft-${d}` : "";
    };
    return (l, d) => (u(), g("span", {
      class: B(["badge", e[t.size], p()])
    }, [
      fe(l.$slots, "default")
    ], 2));
  }
}), Mn = ["role", "aria-expanded", "tabindex"], Cn = { class: "card-title" }, Dn = { class: "card-body-inner" }, $n = {
  key: 3,
  class: "mt-4"
}, ur = /* @__PURE__ */ ie({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const p = t, l = e, d = F(p.modelValue !== void 0 ? p.modelValue : p.defaultOpen);
    de(() => p.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function v() {
      if (!p.collapsible) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return a({ isOpen: d, toggle: v }), (i, c) => (u(), g("section", {
      class: B(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      i.$slots.title ? (u(), g("header", {
        key: 0,
        class: B(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: v,
        onKeydown: [
          c[0] || (c[0] = dt((x) => t.collapsible && v(), ["enter"])),
          c[1] || (c[1] = dt(ve((x) => t.collapsible && v(), ["prevent"]), ["space"]))
        ]
      }, [
        f("div", Cn, [
          fe(i.$slots, "title")
        ]),
        t.collapsible ? (u(), g("svg", {
          key: 0,
          class: B(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...c[2] || (c[2] = [
          f("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : I("", !0)
      ], 42, Mn)) : I("", !0),
      t.collapsible ? (u(), g("div", {
        key: 1,
        class: B(["card-body-wrapper", { "is-open": d.value }])
      }, [
        f("div", Dn, [
          fe(i.$slots, "default")
        ])
      ], 2)) : fe(i.$slots, "default", { key: 2 }),
      i.$slots.footer ? (u(), g("footer", $n, [
        fe(i.$slots, "footer")
      ])) : I("", !0)
    ], 2));
  }
}), Sn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, Hn = { class: "text-xl font-semibold" }, fr = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = {
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
      e.persistent || p("close");
    };
    return de(
      () => e.open,
      (v) => {
        v ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (v, i) => (u(), Ue(ut, { to: "body" }, [
      ae(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (u(), g("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: d
          })) : I("", !0)
        ]),
        _: 1
      }),
      ae(Xe, { name: "zoom" }, {
        default: Qe(() => [
          t.open ? (u(), g("div", {
            key: 0,
            class: B([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            f("div", {
              class: B([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? I("", !0) : (u(), g("div", Sn, [
                fe(v.$slots, "header", {}, () => [
                  f("h3", Hn, V(t.title), 1)
                ]),
                f("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: i[0] || (i[0] = (c) => p("close"))
                }, [...i[3] || (i[3] = [
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
                class: B([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                fe(v.$slots, "default")
              ], 2),
              t.hideFooter ? I("", !0) : (u(), g("div", {
                key: 1,
                class: B([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                fe(v.$slots, "footer", {}, () => [
                  f("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: i[1] || (i[1] = (c) => p("close"))
                  }, V(t.cancelText), 1),
                  f("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: i[2] || (i[2] = (c) => p("confirm"))
                  }, V(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : I("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), En = ["aria-expanded", "aria-disabled", "onKeydown"], _n = { class: "collapse-title" }, jn = { class: "collapse-content" }, Bn = { class: "collapse-content-inner" }, Tn = { class: "collapse-body" }, hr = /* @__PURE__ */ ie({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const p = t, l = e, d = F(p.modelValue !== void 0 ? p.modelValue : p.defaultOpen);
    de(() => p.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function v() {
      if (p.disabled) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return a({ isOpen: d, toggle: v }), (i, c) => (u(), g("div", {
      class: B([
        "collapse-card",
        `collapse-card-${t.variant}`,
        { "is-open": d.value }
      ])
    }, [
      f("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": d.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: v,
        onKeydown: [
          dt(v, ["enter"]),
          dt(ve(v, ["prevent"]), ["space"])
        ]
      }, [
        f("div", _n, [
          fe(i.$slots, "header", {}, () => [
            fe(i.$slots, "title")
          ])
        ]),
        c[0] || (c[0] = f("svg", {
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
      ], 40, En),
      f("div", jn, [
        f("div", Bn, [
          f("div", Tn, [
            fe(i.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), pr = /* @__PURE__ */ ie({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const p = t, l = e, d = F(/* @__PURE__ */ new Set());
    de(() => p.modelValue, (c) => {
      c === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(c) ? d.value = new Set(c) : d.value = /* @__PURE__ */ new Set([c]);
    }, { immediate: !0 });
    function v(c) {
      const x = new Set(d.value);
      x.has(c) ? x.delete(c) : (p.multiple || x.clear(), x.add(c)), d.value = x, p.multiple ? l("update:modelValue", Array.from(x)) : l("update:modelValue", x.size > 0 ? Array.from(x)[0] : null);
    }
    function i(c) {
      return d.value.has(c);
    }
    return rn("accordion", {
      toggleItem: v,
      isItemOpen: i
    }), a({ openItems: d, toggleItem: v }), (c, x) => (u(), g("div", {
      class: B(["accordion", `accordion-${t.variant}`])
    }, [
      fe(c.$slots, "default")
    ], 2));
  }
}), An = ["aria-expanded", "aria-disabled", "onKeydown"], In = { class: "accordion-title" }, Ln = { class: "accordion-content" }, zn = { class: "accordion-content-inner" }, Fn = { class: "accordion-body" }, gr = /* @__PURE__ */ ie({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = sn("accordion"), p = y(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function l() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (d, v) => (u(), g("div", {
      class: B(["accordion-item", { "is-open": p.value }])
    }, [
      f("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": p.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          dt(l, ["enter"]),
          dt(ve(l, ["prevent"]), ["space"])
        ]
      }, [
        f("div", In, [
          fe(d.$slots, "header", {}, () => [
            fe(d.$slots, "title")
          ])
        ]),
        v[0] || (v[0] = f("svg", {
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
      ], 40, An),
      f("div", Ln, [
        f("div", zn, [
          f("div", Fn, [
            fe(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), On = { class: "loading-logo-wrapper" }, Nn = { class: "dots-container" }, Vn = ["width", "height"], Pn = {
  key: 0,
  class: "loading-text"
}, Yn = /* @__PURE__ */ ie({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = y(() => Math.round(a.size * (8 / 60)));
    return (p, l) => (u(), g("div", On, [
      f("div", {
        class: "loading-logo-container",
        style: xe({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        f("div", Nn, [
          f("span", {
            class: "loading-dot dot-1 dot-blue",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-2 dot-blue",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-3 dot-black",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-4 dot-black",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-5 dot-red",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-6 dot-red",
            style: xe({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (u(), g("svg", {
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
        ])], 8, Vn))
      ], 4),
      t.text ? (u(), g("p", Pn, [
        Ot(V(t.text), 1),
        l[1] || (l[1] = f("span", { class: "loading-dots" }, [
          f("span", null, "."),
          f("span", null, "."),
          f("span", null, ".")
        ], -1))
      ])) : I("", !0)
    ]));
  }
}), Rn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, vr = /* @__PURE__ */ ie({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (u(), Ue(ut, { to: "body" }, [
      ae(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (u(), g("div", Rn, [
            ae(Yn, {
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
}, Gn = ["d"], Kn = { class: "toast-body" }, qn = {
  key: 0,
  class: "toast-title"
}, Zn = { class: "toast-message" }, Jn = ["onClick"], mr = /* @__PURE__ */ ie({
  __name: "Toasts",
  setup(t) {
    const a = un(), e = y(() => {
      const c = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return c[a.toastPosition.value] || c["bottom-right"];
    }), p = {
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
    }, i = (c, x = "soft") => {
      var w;
      return ((w = {
        soft: l,
        solid: d,
        outline: v
      }[x]) == null ? void 0 : w[c]) || l[c] || "toast-default";
    };
    return (c, x) => (u(), Ue(ut, { to: "body" }, [
      f("div", {
        class: B(["toast-container", e.value])
      }, [
        (u(!0), g(me, null, Ee(A(a).toasts.value, (s) => (u(), g("div", {
          key: s.id,
          class: B(["toast-item", i(s.type, s.variant)])
        }, [
          f("div", Wn, [
            (u(), g("svg", Un, [
              f("path", {
                d: p[s.type],
                fill: "currentColor"
              }, null, 8, Gn)
            ])),
            f("div", Kn, [
              s.title ? (u(), g("div", qn, V(s.title), 1)) : I("", !0),
              f("div", Zn, V(s.message), 1)
            ]),
            f("button", {
              class: "toast-close-btn",
              onClick: (w) => A(a).dismiss(s.id)
            }, [...x[0] || (x[0] = [
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
            ])], 8, Jn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), wr = /* @__PURE__ */ ie({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const a = t, e = F(!1);
    let p = null;
    const l = () => {
      p = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, d = () => {
      p && (clearTimeout(p), p = null), e.value = !1;
    }, v = y(() => `tooltip-pos-${a.position}`), i = y(() => `tooltip-arrow-${a.position}`), c = y(() => `tooltip-variant-${a.variant}`);
    return (x, s) => (u(), g("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: d,
      onFocus: l,
      onBlur: d
    }, [
      fe(x.$slots, "default"),
      ae(Xe, { name: "tooltip-fade" }, {
        default: Qe(() => [
          e.value && t.text ? (u(), g("span", {
            key: 0,
            class: B(["tooltip-content", [v.value, c.value]]),
            role: "tooltip"
          }, [
            Ot(V(t.text) + " ", 1),
            f("span", {
              class: B(["tooltip-arrow", [i.value, c.value]])
            }, null, 2)
          ], 2)) : I("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Xn = { class: "mitreka-pagination" }, Qn = ["disabled"], eo = { class: "pagination-status" }, to = ["disabled"], kr = /* @__PURE__ */ ie({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, p = a, l = () => {
      e.page > 1 && p("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && p("change", e.page + 1);
    };
    return (v, i) => (u(), g("div", Xn, [
      f("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...i[0] || (i[0] = [
        f("span", { class: "hidden sm:inline" }, "Prev", -1),
        f("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Qn),
      f("span", eo, V(t.page) + " / " + V(t.pages), 1),
      f("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...i[1] || (i[1] = [
        f("span", { class: "hidden sm:inline" }, "Next", -1),
        f("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, to)
    ]));
  }
}), no = { class: "avatar-root" }, oo = ["src", "alt"], xr = /* @__PURE__ */ ie({
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
    const a = t, e = F(!1), p = y(() => a.src && !e.value), l = y(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), d = y(() => `avatar-size-${a.size}`), v = y(() => `avatar-color-${a.color}`), i = y(() => a.status ? `avatar-status-${a.status}` : ""), c = y(() => `avatar-status-size-${a.size}`), x = y(() => a.square ? "avatar-square" : "avatar-round"), s = () => {
      e.value = !0;
    };
    return (w, b) => (u(), g("span", no, [
      p.value ? (u(), g("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: B(["avatar-img", [d.value, x.value]]),
        onError: s
      }, null, 42, oo)) : (u(), g("span", {
        key: 1,
        class: B(["avatar-fallback", [d.value, v.value, x.value]])
      }, V(l.value), 3)),
      t.status ? (u(), g("span", {
        key: 2,
        class: B(["avatar-status", [i.value, c.value]])
      }, null, 2)) : I("", !0)
    ]));
  }
}), yr = /* @__PURE__ */ ie({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = ln(), p = y(() => {
      var c;
      const i = (c = e.default) == null ? void 0 : c.call(e);
      return i ? i.length : 0;
    }), l = y(() => p.value <= a.max ? 0 : p.value - a.max), d = y(() => `avatar-size-${a.size}`), v = y(() => `avatar-group-space-${a.size}`);
    return (i, c) => (u(), g("div", {
      class: B(["avatar-group", v.value])
    }, [
      (u(!0), g(me, null, Ee(t.max, (x, s) => {
        var w, b;
        return u(), g(me, { key: s }, [
          s < p.value ? (u(), Ue(dn((b = (w = A(e)).default) == null ? void 0 : b.call(w)[s]), { key: 0 })) : I("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (u(), g("span", {
        key: 0,
        class: B(["avatar-group-count", d.value])
      }, " +" + V(l.value), 3)) : I("", !0)
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
}, br = /* @__PURE__ */ ie({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (p) => p === a.items.length - 1;
    return (p, l) => t.items.length ? (u(), g("nav", ao, [
      f("ol", ro, [
        t.showHome ? (u(), g("li", io, [
          f("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, V(t.homeLabel), 9, so)
        ])) : I("", !0),
        (u(!0), g(me, null, Ee(t.items, (d, v) => (u(), g("li", {
          key: v,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = f("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(v) ? (u(), g("span", fo, V(d.label), 1)) : (u(), g("span", lo, [
            d.href ? (u(), g("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, V(d.label), 9, co)) : (u(), g("span", uo, V(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : I("", !0);
  }
}), ho = { class: "mitreka-stat-card" }, po = {
  key: 0,
  class: "stat-icon"
}, go = { class: "stat-content" }, vo = { class: "stat-label" }, mo = { class: "stat-value" }, Mr = /* @__PURE__ */ ie({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (u(), g("div", ho, [
      t.icon ? (u(), g("div", po, V(t.icon), 1)) : I("", !0),
      f("div", go, [
        f("div", vo, V(t.label), 1),
        f("div", mo, V(t.value), 1)
      ])
    ]));
  }
}), wo = { class: "mitreka-page-header" }, ko = { class: "page-header-title-row" }, xo = { class: "page-header-title" }, yo = {
  key: 0,
  class: "page-header-desc"
}, Cr = /* @__PURE__ */ ie({
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
    }, p = y(() => {
      if (!a.category) return "";
      const l = a.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, d) => (u(), g("header", wo, [
      f("div", ko, [
        f("h1", xo, V(t.title), 1),
        t.category ? (u(), g("span", {
          key: 0,
          class: B(["badge page-header-badge", p.value])
        }, V(t.category), 3)) : I("", !0)
      ]),
      t.description ? (u(), g("p", yo, V(t.description), 1)) : I("", !0)
    ]));
  }
}), bo = { class: "mitreka-theme-switcher" }, Mo = ["value"], Dr = /* @__PURE__ */ ie({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: p } = fn("light"), l = y(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (v) => {
      e(v === "mitrekadark" ? "dark" : "light");
    };
    return (v, i) => (u(), g("div", bo, [
      f("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: i[0] || (i[0] = //@ts-ignore
        (...c) => A(p) && A(p)(...c))
      }, " Toggle: " + V(l.value), 1),
      f("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: i[1] || (i[1] = (c) => d(c.target.value))
      }, [...i[2] || (i[2] = [
        f("option", { value: "mitrekalight" }, "mitrekalight", -1),
        f("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, Mo)
    ]));
  }
}), Co = { class: "sidebar-header" }, Do = {
  key: 0,
  class: "sidebar-search"
}, $o = ["placeholder"], So = { class: "sidebar-nav" }, Ho = ["href", "title", "onClick"], Eo = { class: "sidebar-icon" }, _o = { class: "sidebar-icon-text" }, jo = {
  key: 0,
  class: "sidebar-label"
}, Bo = ["title", "onClick"], To = { class: "sidebar-icon" }, Ao = { class: "sidebar-icon-text" }, Io = {
  key: 0,
  class: "sidebar-label"
}, Lo = ["href", "title", "onClick"], zo = { class: "sidebar-icon" }, Fo = { class: "sidebar-icon-text" }, Oo = {
  key: 0,
  class: "sidebar-label"
}, $r = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = F(""), d = cn({});
    e.defaultOpenIds.forEach((w) => {
      d[w] = !0;
    });
    const v = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), i = (w) => {
      var O;
      if (!w.children) return !1;
      if (l.value.trim()) return !0;
      const b = d[w.id], M = ((O = w.children) == null ? void 0 : O.some(v)) ?? !1;
      return b === void 0 && M && (d[w.id] = !0), d[w.id] ?? M;
    }, c = (w) => {
      const b = !i(w);
      d[w.id] = b, p("toggle", w.id, b);
    }, x = y(() => {
      const w = l.value.toLowerCase().trim();
      return w ? e.items.map((b) => {
        if (b.children) {
          const M = b.children.filter(
            (O) => O.label.toLowerCase().includes(w)
          );
          return b.label.toLowerCase().includes(w) ? b : M.length > 0 ? { ...b, children: M } : null;
        }
        return b.label.toLowerCase().includes(w) ? b : null;
      }).filter(Boolean) : e.items;
    }), s = (w) => {
      p("navigate", w), l.value = "";
    };
    return (w, b) => (u(), g("aside", {
      class: B(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      f("div", Co, [
        fe(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (u(), g("div", Do, [
        Bt(f("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": b[0] || (b[0] = (M) => l.value = M)
        }, null, 8, $o), [
          [Tt, l.value]
        ]),
        l.value ? (u(), g("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: b[1] || (b[1] = (M) => l.value = "")
        }, " × ")) : I("", !0)
      ])) : I("", !0),
      f("nav", So, [
        (u(!0), g(me, null, Ee(x.value, (M) => (u(), g(me, {
          key: M.id
        }, [
          M.children ? (u(), g(me, { key: 1 }, [
            f("button", {
              class: B(["sidebar-item sidebar-group", i(M) ? "is-open" : ""]),
              title: t.collapsed ? M.label : void 0,
              onClick: (O) => c(M)
            }, [
              f("span", To, [
                fe(w.$slots, "icon", { item: M }, () => [
                  f("span", Ao, V(M.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? I("", !0) : (u(), g("span", Io, V(M.label), 1)),
              t.collapsed ? I("", !0) : (u(), g("span", {
                key: 1,
                class: B(["sidebar-caret", i(M) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Bo),
            i(M) ? (u(), g("div", {
              key: 0,
              class: B(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (u(!0), g(me, null, Ee(M.children, (O) => (u(), g("a", {
                key: O.id,
                class: B(["sidebar-item sidebar-child", v(O) ? "is-active" : ""]),
                href: O.href || "#",
                title: t.collapsed ? O.label : void 0,
                onClick: ve((L) => s(O), ["prevent"])
              }, [
                f("span", zo, [
                  fe(w.$slots, "icon", { item: O }, () => [
                    f("span", Fo, V(O.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? I("", !0) : (u(), g("span", Oo, V(O.label), 1))
              ], 10, Lo))), 128))
            ], 2)) : I("", !0)
          ], 64)) : (u(), g("a", {
            key: 0,
            class: B(["sidebar-item", v(M) ? "is-active" : ""]),
            href: M.href || "#",
            title: t.collapsed ? M.label : void 0,
            onClick: ve((O) => s(M), ["prevent"])
          }, [
            f("span", Eo, [
              fe(w.$slots, "icon", { item: M }, () => [
                f("span", _o, V(M.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? I("", !0) : (u(), g("span", jo, V(M.label), 1))
          ], 10, Ho))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Vt = {
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
}, Sr = (t) => Vt[t], No = ["innerHTML"], Vo = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ue = /* @__PURE__ */ ie({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = y(() => a.class || "w-5 h-5"), p = y(() => Vt[a.name]), l = y(
      () => p.value ? p.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, v) => p.value ? (u(), g("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, No)) : (u(), g("span", Vo, "?"));
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
}, He = function(t, a) {
  return a === void 0 && (a = 2), ("000" + t).slice(a * -1);
}, ze = function(t) {
  return t === !0 ? 1 : 0;
};
function zt(t, a) {
  var e;
  return function() {
    var p = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(p, l);
    }, a);
  };
}
var Ht = function(t) {
  return t instanceof Array ? t : [t];
};
function $e(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function ee(t, a, e) {
  var p = window.document.createElement(t);
  return a = a || "", e = e || "", p.className = a, e !== void 0 && (p.textContent = e), p;
}
function xt(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Pt(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return Pt(t.parentNode, a);
}
function yt(t, a) {
  var e = ee("div", "numInputWrapper"), p = ee("input", "numInput " + t), l = ee("span", "arrowUp"), d = ee("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? p.type = "number" : (p.type = "text", p.pattern = "\\d*"), a !== void 0)
    for (var v in a)
      p.setAttribute(v, a[v]);
  return e.appendChild(p), e.appendChild(l), e.appendChild(d), e;
}
function Ae(t) {
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
var Et = function() {
}, bt = function(t, a, e) {
  return e.months[a ? "shorthand" : "longhand"][t];
}, Po = {
  D: Et,
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
    t.setHours(t.getHours() % 12 + 12 * ze(new RegExp(e.amPM[1], "i").test(a)));
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
    var p = parseInt(a), l = new Date(t.getFullYear(), 0, 2 + (p - 1) * 7, 0, 0, 0, 0);
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
  l: Et,
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
  w: Et,
  y: function(t, a) {
    t.setFullYear(2e3 + parseFloat(a));
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
  D: function(t, a, e) {
    return a.weekdays.shorthand[ht.w(t, a, e)];
  },
  F: function(t, a, e) {
    return bt(ht.n(t, a, e) - 1, !1, a);
  },
  G: function(t, a, e) {
    return He(ht.h(t, a, e));
  },
  H: function(t) {
    return He(t.getHours());
  },
  J: function(t, a) {
    return a.ordinal !== void 0 ? t.getDate() + a.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, a) {
    return a.amPM[ze(t.getHours() > 11)];
  },
  M: function(t, a) {
    return bt(t.getMonth(), !0, a);
  },
  S: function(t) {
    return He(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, a, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return He(t.getFullYear(), 4);
  },
  d: function(t) {
    return He(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return He(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, a) {
    return a.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return He(t.getMonth() + 1);
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
  var a = t.config, e = a === void 0 ? st : a, p = t.l10n, l = p === void 0 ? pt : p, d = t.isMobile, v = d === void 0 ? !1 : d;
  return function(i, c, x) {
    var s = x || l;
    return e.formatDate !== void 0 && !v ? e.formatDate(i, c, s) : c.split("").map(function(w, b, M) {
      return ht[w] && M[b - 1] !== "\\" ? ht[w](i, s, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, At = function(t) {
  var a = t.config, e = a === void 0 ? st : a, p = t.l10n, l = p === void 0 ? pt : p;
  return function(d, v, i, c) {
    if (!(d !== 0 && !d)) {
      var x = c || l, s, w = d;
      if (d instanceof Date)
        s = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        s = new Date(d);
      else if (typeof d == "string") {
        var b = v || (e || st).dateFormat, M = String(d).trim();
        if (M === "today")
          s = /* @__PURE__ */ new Date(), i = !0;
        else if (e && e.parseDate)
          s = e.parseDate(d, b);
        else if (/Z$/.test(M) || /GMT$/.test(M))
          s = new Date(d);
        else {
          for (var O = void 0, L = [], te = 0, se = 0, D = ""; te < b.length; te++) {
            var S = b[te], _ = S === "\\", ne = b[te - 1] === "\\" || _;
            if (Je[S] && !ne) {
              D += Je[S];
              var N = new RegExp(D).exec(d);
              N && (O = !0) && L[S !== "Y" ? "push" : "unshift"]({
                fn: Po[S],
                val: N[++se]
              });
            } else _ || (D += ".");
          }
          s = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), L.forEach(function(z) {
            var U = z.fn, oe = z.val;
            return s = U(s, oe, x) || s;
          }), s = O ? s : void 0;
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
function Ie(t, a, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(a.getTime()).setHours(0, 0, 0, 0) : t.getTime() - a.getTime();
}
var Yo = function(t, a, e) {
  return t > Math.min(a, e) && t < Math.max(a, e);
}, _t = function(t, a, e) {
  return t * 3600 + a * 60 + e;
}, Ro = function(t) {
  var a = Math.floor(t / 3600), e = (t - a * 3600) / 60;
  return [a, e, t - a * 3600 - e * 60];
}, Wo = {
  DAY: 864e5
};
function jt(t) {
  var a = t.defaultHour, e = t.defaultMinute, p = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), d = t.minDate.getMinutes(), v = t.minDate.getSeconds();
    a < l && (a = l), a === l && e < d && (e = d), a === l && e === d && p < v && (p = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var i = t.maxDate.getHours(), c = t.maxDate.getMinutes();
    a = Math.min(a, i), a === i && (e = Math.min(c, e)), a === i && e === c && (p = t.maxDate.getSeconds());
  }
  return { hours: a, minutes: e, seconds: p };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var a = [], e = 1; e < arguments.length; e++)
    a[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var p = function(i) {
    i && Object.keys(i).forEach(function(c) {
      return t[c] = i[c];
    });
  }, l = 0, d = a; l < d.length; l++) {
    var v = d[l];
    p(v);
  }
  return t;
});
var Ce = function() {
  return Ce = Object.assign || function(t) {
    for (var a, e = 1, p = arguments.length; e < p; e++) {
      a = arguments[e];
      for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (t[l] = a[l]);
    }
    return t;
  }, Ce.apply(this, arguments);
}, Ft = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var p = Array(t), l = 0, a = 0; a < e; a++)
    for (var d = arguments[a], v = 0, i = d.length; v < i; v++, l++)
      p[l] = d[v];
  return p;
}, Uo = 300;
function Go(t, a) {
  var e = {
    config: Ce(Ce({}, st), pe.defaultConfig),
    l10n: pt
  };
  e.parseDate = At({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = L, e._setHoursFromDate = b, e._positionCalendar = qe, e.changeMonth = T, e.changeYear = Me, e.clear = Y, e.close = le, e.onMouseOver = je, e._createElement = ee, e.createDay = N, e.destroy = _e, e.isEnabled = be, e.jumpToDate = D, e.updateValue = We, e.open = gt, e.redraw = R, e.set = nt, e.setDate = Ze, e.toggle = Ut;
  function p() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, mt(), Ke(), ot(), wt(), p(), e.isMobile || ne(), se(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && b(e.config.noCalendar ? e.latestSelectedDateObj : void 0), We(!1)), i();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && qe(), ce("onReady");
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
  function c(n) {
    if (e.selectedDates.length === 0) {
      var o = e.config.minDate === void 0 || Ie(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = jt(e.config);
      o.setHours(r.hours, r.minutes, r.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && qt(n);
    var h = e._input.value;
    w(), We(), e._input.value !== h && e._debouncedChange();
  }
  function x(n, o) {
    return n % 12 + 12 * ze(o === e.l10n.amPM[1]);
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
      e.amPM !== void 0 && (n = x(n, e.amPM.textContent));
      var h = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && Ie(e.latestSelectedDateObj, e.config.minDate, !0) === 0, k = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && Ie(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var C = _t(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), K = _t(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), j = _t(n, o, r);
        if (j > K && j < C) {
          var J = Ro(C);
          n = J[0], o = J[1], r = J[2];
        }
      } else {
        if (k) {
          var E = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, E.getHours()), n === E.getHours() && (o = Math.min(o, E.getMinutes())), o === E.getMinutes() && (r = Math.min(r, E.getSeconds()));
        }
        if (h) {
          var P = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, P.getHours()), n === P.getHours() && o < P.getMinutes() && (o = P.getMinutes()), o === P.getMinutes() && (r = Math.max(r, P.getSeconds()));
        }
      }
      M(n, o, r);
    }
  }
  function b(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && M(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function M(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = He(e.config.time_24hr ? n : (12 + n) % 12 + 12 * ze(n % 12 === 0)), e.minuteElement.value = He(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[ze(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = He(r)));
  }
  function O(n) {
    var o = Ae(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && Me(r);
  }
  function L(n, o, r, h) {
    if (o instanceof Array)
      return o.forEach(function(k) {
        return L(n, k, r, h);
      });
    if (n instanceof Array)
      return n.forEach(function(k) {
        return L(k, o, r, h);
      });
    n.addEventListener(o, r, h), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, h);
      }
    });
  }
  function te() {
    ce("onChange");
  }
  function se() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(h) {
        return L(h, "click", e[r]);
      });
    }), e.isMobile) {
      rt();
      return;
    }
    var n = zt(Ne, 50);
    if (e._debouncedChange = zt(te, Uo), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && L(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && je(Ae(r));
    }), L(e._input, "keydown", Ge), e.calendarContainer !== void 0 && L(e.calendarContainer, "keydown", Ge), !e.config.inline && !e.config.static && L(window, "resize", n), window.ontouchstart !== void 0 ? L(window.document, "touchstart", Le) : L(window.document, "mousedown", Le), L(window.document, "focus", Le, { capture: !0 }), e.config.clickOpens === !0 && (L(e._input, "focus", e.open), L(e._input, "click", e.open)), e.daysContainer !== void 0 && (L(e.monthNav, "click", Kt), L(e.monthNav, ["keyup", "increment"], O), L(e.daysContainer, "click", Se)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return Ae(r).select();
      };
      L(e.timeContainer, ["increment"], c), L(e.timeContainer, "blur", c, { capture: !0 }), L(e.timeContainer, "click", S), L([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && L(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && L(e.amPM, "click", function(r) {
        c(r);
      });
    }
    e.config.allowInput && L(e._input, "blur", tt);
  }
  function D(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), h = e.currentYear, k = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (C) {
      C.message = "Invalid date supplied: " + r, e.config.errorHandler(C);
    }
    o && e.currentYear !== h && (ce("onYearChange"), X()), o && (e.currentYear !== h || e.currentMonth !== k) && ce("onMonthChange"), e.redraw();
  }
  function S(n) {
    var o = Ae(n);
    ~o.className.indexOf("arrow") && _(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function _(n, o, r) {
    var h = n && Ae(n), k = r || h && h.parentNode && h.parentNode.firstChild, C = Mt("increment");
    C.delta = o, k && k.dispatchEvent(C);
  }
  function ne() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = ee("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(he()), e.innerContainer = ee("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = $(), r = o.weekWrapper, h = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = h, e.weekWrapper = r;
      }
      e.rContainer = ee("div", "flatpickr-rContainer"), e.rContainer.appendChild(W()), e.daysContainer || (e.daysContainer = ee("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), Z(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(ge()), $e(e.calendarContainer, "rangeMode", e.config.mode === "range"), $e(e.calendarContainer, "animate", e.config.animate === !0), $e(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var k = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!k && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var C = ee("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(C, e.element), C.appendChild(e.element), e.altInput && C.appendChild(e.altInput), C.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function N(n, o, r, h) {
    var k = be(o, !0), C = ee("span", n, o.getDate().toString());
    return C.dateObj = o, C.$i = h, C.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && Ie(o, e.now) === 0 && (e.todayDateElem = C, C.classList.add("today"), C.setAttribute("aria-current", "date")), k ? (C.tabIndex = -1, Ct(o) && (C.classList.add("selected"), e.selectedDateElem = C, e.config.mode === "range" && ($e(C, "startRange", e.selectedDates[0] && Ie(o, e.selectedDates[0], !0) === 0), $e(C, "endRange", e.selectedDates[1] && Ie(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && C.classList.add("inRange")))) : C.classList.add("flatpickr-disabled"), e.config.mode === "range" && Gt(o) && !Ct(o) && C.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && h % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), ce("onDayCreate", C), C;
  }
  function z(n) {
    n.focus(), e.config.mode === "range" && je(n);
  }
  function U(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, h = o; h != r; h += n)
      for (var k = e.daysContainer.children[h], C = n > 0 ? 0 : k.children.length - 1, K = n > 0 ? k.children.length : -1, j = C; j != K; j += n) {
        var J = k.children[j];
        if (J.className.indexOf("hidden") === -1 && be(J.dateObj))
          return J;
      }
  }
  function oe(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, h = o > 0 ? e.config.showMonths : -1, k = o > 0 ? 1 : -1, C = r - e.currentMonth; C != h; C += k)
      for (var K = e.daysContainer.children[C], j = r - e.currentMonth === C ? n.$i + o : o < 0 ? K.children.length - 1 : 0, J = K.children.length, E = j; E >= 0 && E < J && E != (o > 0 ? J : -1); E += k) {
        var P = K.children[E];
        if (P.className.indexOf("hidden") === -1 && be(P.dateObj) && Math.abs(n.$i - E) >= Math.abs(o))
          return z(P);
      }
    e.changeMonth(k), H(U(k), 0);
  }
  function H(n, o) {
    var r = d(), h = Oe(r || document.body), k = n !== void 0 ? n : h ? r : e.selectedDateElem !== void 0 && Oe(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Oe(e.todayDateElem) ? e.todayDateElem : U(o > 0 ? 1 : -1);
    k === void 0 ? e._input.focus() : h ? oe(k, o) : z(k);
  }
  function q(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, h = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), k = e.utils.getDaysInMonth(o, n), C = window.document.createDocumentFragment(), K = e.config.showMonths > 1, j = K ? "prevMonthDay hidden" : "prevMonthDay", J = K ? "nextMonthDay hidden" : "nextMonthDay", E = h + 1 - r, P = 0; E <= h; E++, P++)
      C.appendChild(N("flatpickr-day " + j, new Date(n, o - 1, E), E, P));
    for (E = 1; E <= k; E++, P++)
      C.appendChild(N("flatpickr-day", new Date(n, o, E), E, P));
    for (var re = k + 1; re <= 42 - r && (e.config.showMonths === 1 || P % 7 !== 0); re++, P++)
      C.appendChild(N("flatpickr-day " + J, new Date(n, o + 1, re % k), re, P));
    var Pe = ee("div", "dayContainer");
    return Pe.appendChild(C), Pe;
  }
  function Z() {
    if (e.daysContainer !== void 0) {
      xt(e.daysContainer), e.weekNumbers && xt(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(q(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && je();
    }
  }
  function X() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(h) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && h < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && h > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = ee("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = bt(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function we() {
    var n = ee("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = ee("span", "cur-month") : (e.monthsDropdownContainer = ee("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), L(e.monthsDropdownContainer, "change", function(K) {
      var j = Ae(K), J = parseInt(j.value, 10);
      e.changeMonth(J - e.currentMonth), ce("onMonthChange");
    }), X(), r = e.monthsDropdownContainer);
    var h = yt("cur-year", { tabindex: "-1" }), k = h.getElementsByTagName("input")[0];
    k.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && k.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (k.setAttribute("max", e.config.maxDate.getFullYear().toString()), k.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var C = ee("div", "flatpickr-current-month");
    return C.appendChild(r), C.appendChild(h), o.appendChild(C), n.appendChild(o), {
      container: n,
      yearElement: k,
      monthElement: r
    };
  }
  function De() {
    xt(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = we();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function he() {
    return e.monthNav = ee("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = ee("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = ee("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, De(), Object.defineProperty(e, "_hidePrevMonthArrow", {
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
    }), e.currentYearElement = e.yearElements[0], kt(), e.monthNav;
  }
  function ge() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = jt(e.config);
    e.timeContainer = ee("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = ee("span", "flatpickr-time-separator", ":"), r = yt("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var h = yt("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = h.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = He(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : s(n.hours)), e.minuteElement.value = He(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(h), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var k = yt("flatpickr-second");
      e.secondElement = k.getElementsByTagName("input")[0], e.secondElement.value = He(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(ee("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(k);
    }
    return e.config.time_24hr || (e.amPM = ee("span", "flatpickr-am-pm", e.l10n.amPM[ze((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function W() {
    e.weekdayContainer ? xt(e.weekdayContainer) : e.weekdayContainer = ee("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = ee("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return m(), e.weekdayContainer;
  }
  function m() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = Ft(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = Ft(o.splice(n, o.length), o.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + o.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function $() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = ee("div", "flatpickr-weekwrapper");
    n.appendChild(ee("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = ee("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function T(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, ce("onYearChange"), X()), Z(), ce("onMonthChange"), kt());
  }
  function Y(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = jt(e.config), h = r.hours, k = r.minutes, C = r.seconds;
      M(h, k, C);
    }
    e.redraw(), n && ce("onChange");
  }
  function le() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), ce("onClose");
  }
  function _e() {
    e.config !== void 0 && ce("onDestroy");
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
  function ye(n) {
    return e.calendarContainer.contains(n);
  }
  function Le(n) {
    if (e.isOpen && !e.config.inline) {
      var o = Ae(n), r = ye(o), h = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), k = !h && !r && !ye(n.relatedTarget), C = !e.config.ignoredFocusElements.some(function(K) {
        return K.contains(o);
      });
      k && C && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && c(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function Me(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), ce("onYearChange"), X());
    }
  }
  function be(n, o) {
    var r;
    o === void 0 && (o = !0);
    var h = e.parseDate(n, void 0, o);
    if (e.config.minDate && h && Ie(h, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && h && Ie(h, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (h === void 0)
      return !1;
    for (var k = !!e.config.enable, C = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, K = 0, j = void 0; K < C.length; K++) {
      if (j = C[K], typeof j == "function" && j(h))
        return k;
      if (j instanceof Date && h !== void 0 && j.getTime() === h.getTime())
        return k;
      if (typeof j == "string") {
        var J = e.parseDate(j, void 0, !0);
        return J && J.getTime() === h.getTime() ? k : !k;
      } else if (typeof j == "object" && h !== void 0 && j.from && j.to && h.getTime() >= j.from.getTime() && h.getTime() <= j.to.getTime())
        return k;
    }
    return !k;
  }
  function Oe(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function tt(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== Dt();
    o && r && !(n.relatedTarget && ye(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ge(n) {
    var o = Ae(n), r = e.config.wrap ? t.contains(o) : o === e._input, h = e.config.allowInput, k = e.isOpen && (!h || !r), C = e.config.inline && r && !h;
    if (n.keyCode === 13 && r) {
      if (h)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (ye(o) || k || C) {
      var K = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          K ? (n.preventDefault(), c(), ke()) : Se(n);
          break;
        case 27:
          n.preventDefault(), ke();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!K && !r) {
            n.preventDefault();
            var j = d();
            if (e.daysContainer !== void 0 && (h === !1 || j && Oe(j))) {
              var J = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), T(J), H(U(1), 0)) : H(void 0, J);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var E = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), Me(e.currentYear - E), H(U(1), 0)) : K || H(void 0, E * 7) : o === e.currentYearElement ? Me(e.currentYear - E) : e.config.enableTime && (!K && e.hourElement && e.hourElement.focus(), c(n), e._debouncedChange());
          break;
        case 9:
          if (K) {
            var P = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Te) {
              return Te;
            }), re = P.indexOf(o);
            if (re !== -1) {
              var Pe = P[re + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (Pe || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(o) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && o === e.amPM)
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
    (r || ye(o)) && ce("onKeyDown", n);
  }
  function je(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), h = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), k = Math.min(r, e.selectedDates[0].getTime()), C = Math.max(r, e.selectedDates[0].getTime()), K = !1, j = 0, J = 0, E = k; E < C; E += Wo.DAY)
        be(new Date(E), !0) || (K = K || E > k && E < C, E < h && (!j || E > j) ? j = E : E > h && (!J || E < J) && (J = E));
      var P = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      P.forEach(function(re) {
        var Pe = re.dateObj, Te = Pe.getTime(), ft = j > 0 && Te < j || J > 0 && Te > J;
        if (ft) {
          re.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(it) {
            re.classList.remove(it);
          });
          return;
        } else if (K && !ft)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(it) {
          re.classList.remove(it);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), h < r && Te === h ? re.classList.add("startRange") : h > r && Te === h && re.classList.add("endRange"), Te >= j && (J === 0 || Te <= J) && Yo(Te, h, r) && re.classList.add("inRange"));
      });
    }
  }
  function Ne() {
    e.isOpen && !e.config.static && !e.config.inline && qe();
  }
  function gt(n, o) {
    if (o === void 0 && (o = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = Ae(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), ce("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var h = e.isOpen;
    e.isOpen = !0, h || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), ce("onOpen"), qe(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function vt(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), h = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(k) {
        return be(k);
      }), !e.selectedDates.length && n === "min" && b(r), We()), e.daysContainer && (R(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!h && r !== void 0 && h.getFullYear() === r.getFullYear());
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
    ], o = Ce(Ce({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(P) {
        e.config._enable = Be(P);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(P) {
        e.config._disable = Be(P);
      }
    });
    var h = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || h)) {
      var k = pe.defaultConfig.dateFormat || st.dateFormat;
      r.dateFormat = o.noCalendar || h ? "H:i" + (o.enableSeconds ? ":S" : "") : k + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || h) && !o.altFormat) {
      var C = pe.defaultConfig.altFormat || st.altFormat;
      r.altFormat = o.noCalendar || h ? "h:i" + (o.enableSeconds ? ":S K" : " K") : C + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
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
    var K = function(P) {
      return function(re) {
        e.config[P === "min" ? "_minTime" : "_maxTime"] = e.parseDate(re, "H:i:S");
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
    for (var j = 0; j < n.length; j++)
      e.config[n[j]] = e.config[n[j]] === !0 || e.config[n[j]] === "true";
    St.filter(function(P) {
      return e.config[P] !== void 0;
    }).forEach(function(P) {
      e.config[P] = Ht(e.config[P] || []).map(v);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var j = 0; j < e.config.plugins.length; j++) {
      var J = e.config.plugins[j](e) || {};
      for (var E in J)
        St.indexOf(E) > -1 ? e.config[E] = Ht(J[E]).map(v).concat(e.config[E]) : typeof o[E] > "u" && (e.config[E] = J[E]);
    }
    o.altInputClass || (e.config.altInputClass = Ye().className + " " + e.config.altInputClass), ce("onParseConfig");
  }
  function Ye() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Ke() {
    typeof e.config.locale != "object" && typeof pe.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = Ce(Ce({}, pe.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? pe.l10ns[e.config.locale] : void 0), Je.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Je.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Je.M = "(" + e.l10n.months.shorthand.join("|") + ")", Je.F = "(" + e.l10n.months.longhand.join("|") + ")", Je.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = Ce(Ce({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && pe.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Yt(e), e.parseDate = At({ config: e.config, l10n: e.l10n });
  }
  function qe(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      ce("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(on, an) {
        return on + an.offsetHeight;
      }, 0), h = e.calendarContainer.offsetWidth, k = e.config.position.split(" "), C = k[0], K = k.length > 1 ? k[1] : null, j = o.getBoundingClientRect(), J = window.innerHeight - j.bottom, E = C === "above" || C !== "below" && J < r && j.top > r, P = window.pageYOffset + j.top + (E ? -r - 2 : o.offsetHeight + 2);
      if ($e(e.calendarContainer, "arrowTop", !E), $e(e.calendarContainer, "arrowBottom", E), !e.config.inline) {
        var re = window.pageXOffset + j.left, Pe = !1, Te = !1;
        K === "center" ? (re -= (h - j.width) / 2, Pe = !0) : K === "right" && (re -= h - j.width, Te = !0), $e(e.calendarContainer, "arrowLeft", !Pe && !Te), $e(e.calendarContainer, "arrowCenter", Pe), $e(e.calendarContainer, "arrowRight", Te);
        var ft = window.document.body.offsetWidth - (window.pageXOffset + j.right), it = re + h > window.document.body.offsetWidth, Zt = ft + h > window.document.body.offsetWidth;
        if ($e(e.calendarContainer, "rightMost", it), !e.config.static)
          if (e.calendarContainer.style.top = P + "px", !it)
            e.calendarContainer.style.left = re + "px", e.calendarContainer.style.right = "auto";
          else if (!Zt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = ft + "px";
          else {
            var $t = Q();
            if ($t === void 0)
              return;
            var Jt = window.document.body.offsetWidth, Xt = Math.max(0, Jt / 2 - h / 2), Qt = ".flatpickr-calendar.centerMost:before", en = ".flatpickr-calendar.centerMost:after", tn = $t.cssRules.length, nn = "{left:" + j.left + "px;right:auto;}";
            $e(e.calendarContainer, "rightMost", !1), $e(e.calendarContainer, "centerMost", !0), $t.insertRule(Qt + "," + en + nn, tn), e.calendarContainer.style.left = Xt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function Q() {
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
    return n ?? G();
  }
  function G() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function R() {
    e.config.noCalendar || e.isMobile || (X(), kt(), Z());
  }
  function ke() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function Se(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(P) {
      return P.classList && P.classList.contains("flatpickr-day") && !P.classList.contains("flatpickr-disabled") && !P.classList.contains("notAllowed");
    }, r = Pt(Ae(n), o);
    if (r !== void 0) {
      var h = r, k = e.latestSelectedDateObj = new Date(h.dateObj.getTime()), C = (k.getMonth() < e.currentMonth || k.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = h, e.config.mode === "single")
        e.selectedDates = [k];
      else if (e.config.mode === "multiple") {
        var K = Ct(k);
        K ? e.selectedDates.splice(parseInt(K), 1) : e.selectedDates.push(k);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = k, e.selectedDates.push(k), Ie(k, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(P, re) {
        return P.getTime() - re.getTime();
      }));
      if (w(), C) {
        var j = e.currentYear !== k.getFullYear();
        e.currentYear = k.getFullYear(), e.currentMonth = k.getMonth(), j && (ce("onYearChange"), X()), ce("onMonthChange");
      }
      if (kt(), Z(), We(), !C && e.config.mode !== "range" && e.config.showMonths === 1 ? z(h) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var J = e.config.mode === "single" && !e.config.enableTime, E = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (J || E) && ke();
      }
      te();
    }
  }
  var Ve = {
    locale: [Ke, m],
    showMonths: [De, i, W],
    minDate: [D],
    maxDate: [D],
    positionElement: [at],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (L(e._input, "focus", e.open), L(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function nt(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        Ve[r] !== void 0 && Ve[r].forEach(function(h) {
          return h();
        });
    } else
      e.config[n] = o, Ve[n] !== void 0 ? Ve[n].forEach(function(h) {
        return h();
      }) : St.indexOf(n) > -1 && (e.config[n] = Ht(o));
    e.redraw(), We(!0);
  }
  function Re(n, o) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(h) {
        return e.parseDate(h, o);
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
          r = n.split(e.config.conjunction).map(function(h) {
            return e.parseDate(h, o);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(h) {
            return e.parseDate(h, o);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(h) {
      return h instanceof Date && be(h, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(h, k) {
      return h.getTime() - k.getTime();
    });
  }
  function Ze(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    Re(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), D(void 0, o), b(), e.selectedDates.length === 0 && e.clear(!1), We(o), o && ce("onChange");
  }
  function Be(n) {
    return n.slice().map(function(o) {
      return typeof o == "string" || typeof o == "number" || o instanceof Date ? e.parseDate(o, void 0, !0) : o && typeof o == "object" && o.from && o.to ? {
        from: e.parseDate(o.from, void 0),
        to: e.parseDate(o.to, void 0)
      } : o;
    }).filter(function(o) {
      return o;
    });
  }
  function wt() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && Re(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function ot() {
    if (e.input = Ye(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = ee(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), at();
  }
  function at() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function rt() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = ee("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    L(e.mobileInput, "change", function(o) {
      e.setDate(Ae(o).value, !1, e.mobileFormatStr), ce("onChange"), ce("onClose");
    });
  }
  function Ut(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function ce(n, o) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var h = 0; r[h] && h < r.length; h++)
          r[h](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(Mt("change")), e.input.dispatchEvent(Mt("input")));
    }
  }
  function Mt(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function Ct(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var r = e.selectedDates[o];
      if (r instanceof Date && Ie(r, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function Gt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : Ie(n, e.selectedDates[0]) >= 0 && Ie(n, e.selectedDates[1]) <= 0;
  }
  function kt() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = bt(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function Dt(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, o);
    }).filter(function(r, h, k) {
      return e.config.mode !== "range" || e.config.enableTime || k.indexOf(r) === h;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function We(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = Dt(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = Dt(e.config.altFormat)), n !== !1 && ce("onValueUpdate");
  }
  function Kt(n) {
    var o = Ae(n), r = e.prevMonthNav.contains(o), h = e.nextMonthNav.contains(o);
    r || h ? T(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function qt(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = Ae(n), h = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[ze(e.amPM.textContent === e.l10n.amPM[0])]);
    var k = parseFloat(h.getAttribute("min")), C = parseFloat(h.getAttribute("max")), K = parseFloat(h.getAttribute("step")), j = parseInt(h.value, 10), J = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), E = j + K * J;
    if (typeof h.value < "u" && h.value.length === 2) {
      var P = h === e.hourElement, re = h === e.minuteElement;
      E < k ? (E = C + E + ze(!P) + (ze(P) && ze(!e.amPM)), re && _(void 0, -1, e.hourElement)) : E > C && (E = h === e.hourElement ? E - C - ze(!e.amPM) : k, re && _(void 0, 1, e.hourElement)), e.amPM && P && (K === 1 ? E + j === 23 : Math.abs(E - j) > K) && (e.amPM.textContent = e.l10n.amPM[ze(e.amPM.textContent === e.l10n.amPM[0])]), h.value = He(E);
    }
  }
  return l(), e;
}
function lt(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(v) {
    return v instanceof HTMLElement;
  }), p = [], l = 0; l < e.length; l++) {
    var d = e[l];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Go(d, a || {}), p.push(d._flatpickr);
    } catch (v) {
      console.error(v);
    }
  }
  return p.length === 1 ? p[0] : p;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return lt(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return lt([this], t);
});
var pe = function(t, a) {
  return typeof t == "string" ? lt(window.document.querySelectorAll(t), a) : t instanceof Node ? lt([t], a) : lt(t, a);
};
pe.defaultConfig = {};
pe.l10ns = {
  en: Ce({}, pt),
  default: Ce({}, pt)
};
pe.localize = function(t) {
  pe.l10ns.default = Ce(Ce({}, pe.l10ns.default), t);
};
pe.setDefaults = function(t) {
  pe.defaultConfig = Ce(Ce({}, pe.defaultConfig), t);
};
pe.parseDate = At({});
pe.formatDate = Yt({});
pe.compareDates = Ie;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return lt(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = pe);
var Ko = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Rt = { exports: {} };
(function(t, a) {
  (function(e, p) {
    t.exports = p();
  })(Ko, function() {
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
        for (var s, w = 1, b = arguments.length; w < b; w++) {
          s = arguments[w];
          for (var M in s) Object.prototype.hasOwnProperty.call(s, M) && (x[M] = s[M]);
        }
        return x;
      }, e.apply(this, arguments);
    }, p = function(c, x, s) {
      return s.months[x ? "shorthand" : "longhand"][c];
    };
    function l(c) {
      for (; c.firstChild; )
        c.removeChild(c.firstChild);
    }
    function d(c) {
      try {
        if (typeof c.composedPath == "function") {
          var x = c.composedPath();
          return x[0];
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
      var x = e(e({}, v), c);
      return function(s) {
        s.config.dateFormat = x.dateFormat, s.config.altFormat = x.altFormat;
        var w = { monthsContainer: null };
        function b() {
          if (s.rContainer) {
            l(s.rContainer);
            for (var H = 0; H < s.monthElements.length; H++) {
              var q = s.monthElements[H];
              q.parentNode && q.parentNode.removeChild(q);
            }
          }
        }
        function M() {
          s.rContainer && (w.monthsContainer = s._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, O(), s.rContainer.appendChild(w.monthsContainer), s.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + x.theme));
        }
        function O() {
          if (w.monthsContainer) {
            l(w.monthsContainer);
            for (var H = document.createDocumentFragment(), q = 0; q < 12; q++) {
              var Z = s.createDay("flatpickr-monthSelect-month", new Date(s.currentYear, q), 0, q);
              Z.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && Z.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && Z.classList.add("today"), Z.textContent = p(q, x.shorthand, s.l10n), Z.addEventListener("click", D), H.appendChild(Z);
            }
            w.monthsContainer.appendChild(H), s.config.minDate && s.currentYear === s.config.minDate.getFullYear() ? s.prevMonthNav.classList.add("flatpickr-disabled") : s.prevMonthNav.classList.remove("flatpickr-disabled"), s.config.maxDate && s.currentYear === s.config.maxDate.getFullYear() ? s.nextMonthNav.classList.add("flatpickr-disabled") : s.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function L() {
          s._bind(s.prevMonthNav, "click", function(H) {
            H.preventDefault(), H.stopPropagation(), s.changeYear(s.currentYear - 1), se(), O();
          }), s._bind(s.nextMonthNav, "click", function(H) {
            H.preventDefault(), H.stopPropagation(), s.changeYear(s.currentYear + 1), se(), O();
          }), s._bind(w.monthsContainer, "mouseover", function(H) {
            s.config.mode === "range" && s.onMouseOver(d(H), "flatpickr-monthSelect-month");
          });
        }
        function te() {
          if (s.rContainer && s.selectedDates.length) {
            for (var H = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), q = 0; q < H.length; q++)
              H[q].classList.remove("selected");
            var Z = s.selectedDates[0].getMonth(), X = s.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (Z + 1) + ")");
            X && X.classList.add("selected");
          }
        }
        function se() {
          var H = s.selectedDates[0];
          if (H && (H = new Date(H), H.setFullYear(s.currentYear), s.config.minDate && H < s.config.minDate && (H = s.config.minDate), s.config.maxDate && H > s.config.maxDate && (H = s.config.maxDate), s.currentYear = H.getFullYear()), s.currentYearElement.value = String(s.currentYear), s.rContainer) {
            var q = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            q.forEach(function(Z) {
              Z.dateObj.setFullYear(s.currentYear), s.config.minDate && Z.dateObj < s.config.minDate || s.config.maxDate && Z.dateObj > s.config.maxDate ? Z.classList.add("flatpickr-disabled") : Z.classList.remove("flatpickr-disabled");
            });
          }
          te();
        }
        function D(H) {
          H.preventDefault(), H.stopPropagation();
          var q = d(H);
          if (q instanceof Element && !q.classList.contains("flatpickr-disabled") && !q.classList.contains("notAllowed") && (S(q.dateObj), s.config.closeOnSelect)) {
            var Z = s.config.mode === "single", X = s.config.mode === "range" && s.selectedDates.length === 2;
            (Z || X) && s.close();
          }
        }
        function S(H) {
          var q = new Date(s.currentYear, H.getMonth(), H.getDate()), Z = [];
          switch (s.config.mode) {
            case "single":
              Z = [q];
              break;
            case "multiple":
              Z.push(q);
              break;
            case "range":
              s.selectedDates.length === 2 ? Z = [q] : (Z = s.selectedDates.concat([q]), Z.sort(function(X, we) {
                return X.getTime() - we.getTime();
              }));
              break;
          }
          s.setDate(Z, !0), te();
        }
        var _ = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ne(H, q, Z, X) {
          var we = _[X.keyCode] !== void 0;
          if (!(!we && X.keyCode !== 13) && !(!s.rContainer || !w.monthsContainer)) {
            var De = s.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), he = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (he === -1) {
              var ge = De || w.monthsContainer.firstElementChild;
              ge.focus(), he = ge.$i;
            }
            we ? w.monthsContainer.children[(12 + he + _[X.keyCode]) % 12].focus() : X.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && S(document.activeElement.dateObj);
          }
        }
        function N() {
          var H;
          ((H = s.config) === null || H === void 0 ? void 0 : H.mode) === "range" && s.selectedDates.length === 1 && s.clear(!1), s.selectedDates.length || O();
        }
        function z() {
          x._stubbedCurrentMonth = s._initialDate.getMonth(), s._initialDate.setMonth(x._stubbedCurrentMonth), s.currentMonth = x._stubbedCurrentMonth;
        }
        function U() {
          x._stubbedCurrentMonth && (s._initialDate.setMonth(x._stubbedCurrentMonth), s.currentMonth = x._stubbedCurrentMonth, delete x._stubbedCurrentMonth);
        }
        function oe() {
          if (w.monthsContainer !== null)
            for (var H = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), q = 0; q < H.length; q++)
              H[q].removeEventListener("click", D);
        }
        return {
          onParseConfig: function() {
            s.config.enableTime = !1;
          },
          onValueUpdate: te,
          onKeyDown: ne,
          onReady: [
            z,
            b,
            M,
            L,
            te,
            function() {
              s.config.onClose.push(N), s.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            U,
            oe,
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
})(Rt);
var Zo = Rt.exports;
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
}, aa = { class: "flex items-center justify-between mb-2" }, ra = { class: "text-xs opacity-70" }, ia = { class: "grid grid-cols-4 gap-2" }, sa = ["onClick"], Hr = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = F(null), d = F(!1), v = F((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let i = null;
    const c = y(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), x = y(() => e.displayFormat ? e.displayFormat : e.picker === "month" ? "M" : c.value), s = y(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), w = y(() => e.picker !== "year-grid" ? {} : { value: s.value }), b = y(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), M = y(
      () => e.clearable && b.value && !e.disabled && !e.readonly
    ), O = y(() => !e.disabled), L = y(() => M.value && O.value ? "pr-16" : M.value || O.value ? "pr-9" : ""), te = () => {
      var N;
      if (e.mode === "range" ? p("update:modelValue", []) : p("update:modelValue", ""), e.picker === "year-grid") {
        d.value = !1;
        return;
      }
      (N = i == null ? void 0 : i.clear) == null || N.call(i, !1);
    }, se = () => {
      var N, z;
      if (l.value) {
        if (e.picker === "year-grid") {
          (N = i == null ? void 0 : i.destroy) == null || N.call(i), i = null;
          return;
        }
        (z = i == null ? void 0 : i.destroy) == null || z.call(i), i = pe(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Jo({
              shorthand: !0,
              dateFormat: c.value,
              altFormat: x.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: c.value,
          altInput: !!e.displayFormat || e.picker === "month",
          altFormat: x.value,
          time_24hr: e.time24hr,
          clickOpens: !0,
          allowInput: !1,
          appendTo: document.body,
          minDate: e.minDate || void 0,
          maxDate: e.maxDate || void 0,
          defaultDate: e.modelValue,
          onReady: () => {
            var U, oe;
            e.picker === "month" && ((U = i == null ? void 0 : i.calendarContainer) == null || U.classList.add("flatpickr-month-only")), e.picker === "year" && ((oe = i == null ? void 0 : i.calendarContainer) == null || oe.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var U, oe;
            e.picker === "month" && ((U = i == null ? void 0 : i.calendarContainer) == null || U.classList.add("flatpickr-month-only")), e.picker === "year" && ((oe = i == null ? void 0 : i.calendarContainer) == null || oe.classList.add("flatpickr-year-only"));
          },
          onChange: (U) => {
            if (e.mode === "range") {
              const oe = U.map(
                (H) => i.formatDate(H, c.value)
              );
              p("update:modelValue", oe);
            } else {
              const oe = U[0] ? i.formatDate(U[0], c.value) : "";
              p("update:modelValue", oe);
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
    ct(se), et(() => {
      var N;
      return (N = i == null ? void 0 : i.destroy) == null ? void 0 : N.call(i);
    }), de(
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
      se
    ), de(
      () => e.modelValue,
      (N) => {
        !i || e.picker === "year-grid" || i.setDate(N, !1);
      }
    );
    const S = y(
      () => Array.from({ length: 12 }, (N, z) => v.value + z)
    ), _ = (N) => {
      p("update:modelValue", N.toString()), d.value = !1;
    }, ne = (N) => {
      if (!d.value) return;
      const z = N.target;
      if (l.value && z && l.value.contains(z)) return;
      const U = document.querySelector(".mitreka-year-grid");
      U && z && U.contains(z) || (d.value = !1);
    };
    return ct(() => document.addEventListener("click", ne)), et(() => document.removeEventListener("click", ne)), (N, z) => (u(), g("div", Xo, [
      f("input", It({
        ref_key: "inputEl",
        ref: l,
        class: ["input w-full", [t.inputClass, L.value]],
        placeholder: t.placeholder
      }, w.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: D,
        onFocus: D
      }), null, 16, Qo),
      O.value ? (u(), g("button", {
        key: 0,
        type: "button",
        class: B([
          "absolute top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
          M.value ? "right-8" : "right-2"
        ]),
        "aria-label": t.noCalendar ? "Open time picker" : "Open date picker",
        onMousedown: z[0] || (z[0] = ve(() => {
        }, ["prevent"])),
        onClick: ve(D, ["stop"])
      }, [
        t.noCalendar ? (u(), g("svg", ta, [...z[4] || (z[4] = [
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
        ])])) : (u(), g("svg", na, [...z[5] || (z[5] = [
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
      ], 42, ea)) : I("", !0),
      M.value ? (u(), g("button", {
        key: 1,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: z[1] || (z[1] = ve(() => {
        }, ["prevent"])),
        onClick: ve(te, ["stop"])
      }, [...z[6] || (z[6] = [
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
      ])], 32)) : I("", !0),
      t.picker === "year-grid" && d.value ? (u(), g("div", oa, [
        f("div", aa, [
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: z[2] || (z[2] = (U) => v.value -= 12)
          }, " Prev "),
          f("div", ra, V(v.value) + " - " + V(v.value + 11), 1),
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: z[3] || (z[3] = (U) => v.value += 12)
          }, " Next ")
        ]),
        f("div", ia, [
          (u(!0), g(me, null, Ee(S.value, (U) => (u(), g("button", {
            key: U,
            class: B(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === U.toString() }]),
            type: "button",
            onClick: (oe) => _(U)
          }, V(U), 11, sa))), 128))
        ])
      ])) : I("", !0)
    ]));
  }
}), Er = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = Nt(), d = F(null), v = F(null), i = F(13), c = F(!1);
    let x = null, s = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], b = [], M = F("normal"), O = y(() => [
      "w-full",
      M.value === "autoHeight" ? "h-auto" : "h-full"
    ]), L = y(() => M.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), te = () => {
      const m = document.documentElement, $ = m.classList.contains("dark"), T = (m.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      c.value = $ || T;
    }, se = y(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : c.value), D = y(() => se.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), S = y(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), _ = y(() => ["agx", D.value, S.value, l.class]), ne = y(() => [{ "--ag-odd-row-background-color": e.striped ? se.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), N = y(() => {
      const { class: m, style: $, onGridReady: T, ...Y } = l;
      return Y;
    }), z = (m) => typeof m == "number" && Number.isFinite(m) ? m : void 0, U = y(() => {
      const m = l.gridOptions;
      if (m && typeof m == "object") return m;
      const $ = l["grid-options"];
      return $ && typeof $ == "object" ? $ : {};
    }), oe = (m) => {
      const $ = z(l[m]);
      if (typeof $ == "number") return $;
      const Y = z(l[m === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof Y == "number" ? Y : z(U.value[m]);
    }, H = () => {
      const m = l.domLayout;
      if (typeof m == "string" && m.length > 0) return m;
      const $ = l["dom-layout"];
      if (typeof $ == "string" && $.length > 0) return $;
      const T = U.value.domLayout;
      return typeof T == "string" && T.length > 0 ? T : void 0;
    }, q = () => {
      var $, T;
      if (!v.value) return 0;
      const m = (Y) => typeof Y == "number" && Number.isFinite(Y) && Y >= 0;
      if (typeof v.value.getDisplayedRowCount == "function") {
        const Y = v.value.getDisplayedRowCount();
        if (m(Y)) return Y;
      }
      if (typeof v.value.paginationGetRowCount == "function") {
        const Y = v.value.paginationGetRowCount();
        if (m(Y)) return Y;
      }
      if (typeof v.value.getModel == "function") {
        const Y = (T = ($ = v.value).getModel) == null ? void 0 : T.call($), le = Y && typeof Y.getRowCount == "function" ? Y.getRowCount() : void 0;
        if (m(le)) return le;
      }
      return 0;
    }, Z = () => {
      const m = Number(e.autoHeightThreshold);
      return Number.isFinite(m) ? Math.max(1, Math.floor(m)) : 15;
    }, X = () => {
      if (!v.value) return;
      const m = H();
      if (m) {
        M.value = m, v.value.setGridOption("domLayout", m);
        return;
      }
      const $ = e.autoHeightWhenFewRows && q() < Z() ? "autoHeight" : "normal";
      M.value = $, v.value.setGridOption("domLayout", $);
    }, we = () => {
      var m;
      for (; b.length > 0; )
        (m = b.pop()) == null || m();
    }, De = () => {
      if (!v.value) return;
      we();
      const m = () => X();
      w.forEach(($) => {
        v.value.addEventListener($, m), b.push(() => {
          var T;
          (T = v.value) == null || T.removeEventListener($, m);
        });
      });
    }, he = () => {
      if (!e.autoHeaderHeight || !v.value) return;
      const m = oe("headerHeight") ?? pn(e.density), $ = oe("groupHeaderHeight") ?? gn(e.density);
      v.value.setGridOption("headerHeight", m), v.value.setGridOption("groupHeaderHeight", $);
    }, ge = () => {
      if (!e.autoRowHeight || !v.value) return;
      const m = vn(i.value, e.density);
      v.value.setGridOption("rowHeight", m), v.value.setGridOption("getRowHeight", () => m), v.value.resetRowHeights();
    }, W = (m) => {
      v.value = m.api, i.value = mn(d.value), De(), he(), X(), ge(), requestAnimationFrame(() => X()), p("grid-ready", m);
    };
    return de(
      () => e.density,
      () => {
        var m;
        he(), ge(), (m = v.value) == null || m.refreshCells({ force: !0 });
      }
    ), de(
      () => [
        l.headerHeight,
        l["header-height"],
        l.groupHeaderHeight,
        l["group-header-height"],
        l.gridOptions,
        l["grid-options"]
      ],
      () => {
        he();
      }
    ), de(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        X();
      }
    ), de(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        X();
      }
    ), de(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => X());
      }
    ), ct(() => {
      te(), e.autoObserveTheme && (x = new MutationObserver(te), x.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (s = hn(d.value));
    }), et(() => {
      x == null || x.disconnect(), we(), s == null || s();
    }), (m, $) => (u(), g("div", {
      ref_key: "hostRef",
      ref: d,
      class: B(O.value),
      style: xe(L.value)
    }, [
      ae(A(xn), It(N.value, {
        class: _.value,
        theme: "legacy",
        style: ne.value,
        onGridReady: W
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), la = ["disabled"], da = ["onMouseenter", "onClick", "aria-selected"], ca = 320, ua = 12, _r = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = F(null), d = F(null), v = F(null), i = F(!1), c = F(-1), x = F(0), s = F(0), w = F(0), b = F(240), M = F(null), O = F(!1), L = y(
      () => e.options.find((W) => W.value === e.modelValue) ?? null
    ), te = y(() => {
      var W;
      return ((W = L.value) == null ? void 0 : W.label) ?? e.placeholder;
    }), se = {
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
    }, S = {
      default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
      primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
      secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
      accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
      info: "bg-transparent border-info text-info hover:bg-info/10",
      success: "bg-transparent border-success text-success hover:bg-success/10",
      warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
      error: "bg-transparent border-error text-error hover:bg-error/10"
    }, _ = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, ne = y(() => {
      const W = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", m = se[e.size], $ = e.variant === "outline" ? S[e.color] : D[e.color], T = e.disabled ? "opacity-60 cursor-not-allowed" : "", Y = i.value ? `ring-3 ${_[e.color]}` : "";
      return [W, m, $, T, Y].join(" ");
    }), N = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, z = y(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), U = (W) => {
      const m = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: m,
        backgroundColor: W ? "var(--color-base-200)" : "transparent"
      } : {
        color: m,
        backgroundColor: W ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, oe = y(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), H = y(() => ({
      top: `${x.value}px`,
      left: `${s.value}px`,
      width: `${w.value}px`
    })), q = y(() => ({
      maxHeight: `${b.value}px`
    })), Z = () => {
      if (!i.value || !d.value || !v.value) return;
      const W = d.value.getBoundingClientRect(), m = window.innerWidth, $ = window.innerHeight, T = 6, Y = ua, le = v.value.scrollHeight || v.value.offsetHeight || 240;
      M.value == null && (M.value = le);
      const _e = M.value, ye = $ - W.bottom - T - Y, Le = W.top - T - Y, Me = ye < 180 && Le > ye;
      O.value = Me;
      const Oe = Math.min(ca, _e, Math.max(0, Me ? Le : ye));
      b.value = Math.max(64, Oe), w.value = Math.max(160, W.width), s.value = Math.min(
        Math.max(W.left, Y),
        m - w.value - Y
      ), Me ? x.value = Math.max(Y, W.top - T - b.value) : x.value = Math.min(
        $ - Y - b.value,
        W.bottom + T
      );
    }, X = () => {
      e.disabled || (i.value = !i.value, i.value && (c.value = e.options.findIndex((W) => W.value === e.modelValue), Fe(Z)));
    }, we = (W) => {
      W.disabled || (p("update:modelValue", W.value), p("change", W.value), i.value = !1);
    }, De = (W) => {
      if (!e.disabled)
        switch (W.key) {
          case "Enter":
          case " ":
            if (W.preventDefault(), i.value && c.value >= 0) {
              const m = e.options[c.value];
              m && !m.disabled && we(m);
            } else
              X();
            break;
          case "Escape":
            i.value = !1;
            break;
          case "ArrowDown":
            W.preventDefault(), i.value ? c.value = Math.min(c.value + 1, e.options.length - 1) : (i.value = !0, c.value = 0, Fe(Z));
            break;
          case "ArrowUp":
            W.preventDefault(), i.value && (c.value = Math.max(c.value - 1, 0));
            break;
        }
    }, he = (W) => {
      var Y, le;
      const m = W.target, $ = !!((Y = l.value) != null && Y.contains(m)), T = !!((le = v.value) != null && le.contains(m));
      !$ && !T && (i.value = !1);
    }, ge = (W) => {
      var $;
      if (!i.value) return;
      const m = W == null ? void 0 : W.target;
      m && (($ = v.value) != null && $.contains(m)) || Z();
    };
    return de(
      () => [i.value, e.options.length],
      async ([W]) => {
        if (!W) {
          M.value = null;
          return;
        }
        await Fe(), Z();
      }
    ), ct(() => {
      document.addEventListener("click", he), window.addEventListener("resize", ge), window.addEventListener("scroll", ge, !0);
    }), et(() => {
      document.removeEventListener("click", he), window.removeEventListener("resize", ge), window.removeEventListener("scroll", ge, !0);
    }), (W, m) => (u(), g("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      f("button", {
        ref_key: "triggerRef",
        ref: d,
        type: "button",
        class: B(ne.value),
        disabled: t.disabled,
        onClick: X,
        onKeydown: De
      }, [
        f("span", {
          class: B([L.value ? "" : "opacity-60"])
        }, V(te.value), 3),
        ae(ue, {
          name: i.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, la),
      (u(), Ue(ut, { to: "body" }, [
        ae(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": O.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": O.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            i.value ? (u(), g("div", {
              key: 0,
              ref_key: "menuRef",
              ref: v,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: xe([z.value, H.value])
            }, [
              f("ul", {
                class: "overflow-auto",
                style: xe(q.value),
                role: "listbox"
              }, [
                (u(!0), g(me, null, Ee(t.options, ($, T) => {
                  var Y, le, _e;
                  return u(), g("li", {
                    key: $.value,
                    class: B([
                      N[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      $.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((Y = L.value) == null ? void 0 : Y.value) === $.value ? "font-medium" : ""
                    ]),
                    style: xe(U(T === c.value)),
                    onMouseenter: (ye) => c.value = T,
                    onClick: (ye) => $.disabled ? null : we($),
                    role: "option",
                    "aria-selected": ((le = L.value) == null ? void 0 : le.value) === $.value
                  }, [
                    f("span", null, V($.label), 1),
                    ((_e = L.value) == null ? void 0 : _e.value) === $.value ? (u(), Ue(ue, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: xe(oe.value)
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
}, wa = 320, ka = 12, jr = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = F(e.modelValue ?? null);
    de(
      () => e.modelValue,
      (m) => l.value = m ?? null
    ), de(l, (m) => p("update:modelValue", m));
    const {
      root: d,
      inputEl: v,
      menu: i,
      open: c,
      query: x,
      hoverIdx: s,
      loading: w,
      filtered: b,
      selected: M,
      openMenu: O,
      closeMenu: L,
      choose: te,
      clear: se,
      onKey: D
    } = wn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), S = F(null), _ = F(null), ne = F(0), N = F(0), z = F(0), U = F(240), oe = F(null), H = F(!1), q = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, Z = (m) => !m || m === "default" ? "input" : `input input-${m}`, X = y(
      () => {
        var m;
        return c.value ? x.value : ((m = M.value) == null ? void 0 : m.label) ?? "";
      }
    ), we = y(() => ({
      top: `${ne.value}px`,
      left: `${N.value}px`,
      width: `${z.value}px`
    })), De = y(() => ({
      maxHeight: `${U.value}px`
    })), he = () => {
      var Ge, je;
      if (!c.value || !S.value) return;
      const m = S.value.getBoundingClientRect(), $ = window.innerWidth, T = window.innerHeight, Y = 6, le = ka, _e = (((Ge = _.value) == null ? void 0 : Ge.scrollHeight) ?? 0) || (((je = i.value) == null ? void 0 : je.scrollHeight) ?? 0) || 240;
      oe.value == null && (oe.value = _e);
      const ye = oe.value, Le = T - m.bottom - Y - le, Me = m.top - Y - le, be = Le < 180 && Me > Le;
      H.value = be;
      const tt = Math.min(wa, ye, Math.max(0, be ? Me : Le));
      U.value = Math.max(64, tt), z.value = Math.max(220, m.width), N.value = Math.min(
        Math.max(m.left, le),
        $ - z.value - le
      ), be ? ne.value = Math.max(le, m.top - Y - U.value) : ne.value = Math.min(
        T - le - U.value,
        m.bottom + Y
      );
    }, ge = (m) => {
      var T;
      if (!c.value) return;
      const $ = m == null ? void 0 : m.target;
      $ && ((T = _.value) != null && T.contains($)) || he();
    };
    function W() {
      if (!e.disabled) {
        if (c.value) {
          L();
          return;
        }
        O(), Fe(he);
      }
    }
    return de(
      () => [c.value, w.value, b.value.length],
      async ([m]) => {
        m && (await Fe(), he());
      }
    ), de(c, (m) => {
      if (!m) {
        oe.value = null;
        return;
      }
      Fe(he);
    }), ct(() => {
      window.addEventListener("resize", ge), window.addEventListener("scroll", ge, !0);
    }), et(() => {
      window.removeEventListener("resize", ge), window.removeEventListener("scroll", ge, !0);
    }), (m, $) => (u(), g("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      f("div", {
        ref_key: "triggerRef",
        ref: S,
        class: "relative"
      }, [
        f("span", fa, [
          ae(ue, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        f("input", {
          ref_key: "inputEl",
          ref: v,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: X.value,
          onFocus: $[0] || ($[0] = //@ts-ignore
          (...T) => A(O) && A(O)(...T)),
          onClick: $[1] || ($[1] = //@ts-ignore
          (...T) => A(O) && A(O)(...T)),
          onKeydown: $[2] || ($[2] = //@ts-ignore
          (...T) => A(D) && A(D)(...T)),
          readonly: !A(c),
          class: B([
            q[t.size || "md"],
            Z(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: $[3] || ($[3] = (T) => A(c) ? x.value = T.target.value : null)
        }, null, 42, ha),
        t.clearable && A(M) && !t.disabled ? (u(), g("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onClick: $[4] || ($[4] = //@ts-ignore
          (...T) => A(se) && A(se)(...T))
        }, [
          ae(ue, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : I("", !0),
        f("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onClick: W,
          disabled: t.disabled
        }, [
          ae(ue, {
            name: A(c) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 8, pa)
      ], 512),
      (u(), Ue(ut, { to: "body" }, [
        ae(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": H.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": H.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            A(c) ? (u(), g("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: _,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: xe(we.value)
            }, [
              A(w) ? (u(), g("div", ga, "Loading...")) : (u(), g("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: xe(De.value),
                role: "listbox"
              }, [
                (u(!0), g(me, null, Ee(A(b), (T, Y) => {
                  var le, _e;
                  return u(), g("li", {
                    key: T.value,
                    "data-idx": Y,
                    class: B([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      Y === A(s) ? "bg-base-200" : "",
                      T.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (ye) => s.value = Y,
                    onMousedown: ve((ye) => T.disabled ? null : A(te)(T), ["prevent"]),
                    role: "option",
                    "aria-selected": ((le = A(M)) == null ? void 0 : le.value) === T.value
                  }, [
                    f("span", null, V(T.label), 1),
                    ((_e = A(M)) == null ? void 0 : _e.value) === T.value ? (u(), Ue(ue, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : I("", !0)
                  ], 42, va);
                }), 128)),
                !A(b).length && !A(w) ? (u(), g("li", ma, " No results ")) : I("", !0)
              ], 4))
            ], 4)) : I("", !0)
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
}, Da = { class: "truncate" }, $a = ["onClick"], Sa = { class: "flex items-center gap-2 w-full" }, Ha = { class: "flex-1 min-w-[8ch]" }, Ea = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, _a = { class: "truncate" }, ja = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Ba = ["onMousedown"], Ta = ["checked"], Aa = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Ia = 320, La = 12, za = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = F(e.modelValue ?? []);
    de(
      () => e.modelValue,
      (Q) => l.value = Q ?? []
    ), de(l, (Q) => p("update:modelValue", Q));
    const {
      root: d,
      inputEl: v,
      menu: i,
      open: c,
      query: x,
      loading: s,
      filtered: w,
      selectedList: b,
      openMenu: M,
      toggle: O,
      clearAll: L,
      onKey: te
    } = kn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), se = F(null), D = F(null), S = F(0), _ = F(0), ne = F(0), N = F(240), z = F(null), U = F(!1), oe = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, H = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, q = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, Z = {
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
    }, we = {
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
    }, he = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, ge = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, W = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, m = y(() => e.displayMode ?? "stacked"), $ = y(() => m.value === "inline-compact"), T = y(
      () => H[e.size || "md"]
    ), Y = y(
      () => q[T.value]
    ), le = y(
      () => Z[T.value]
    ), _e = y(() => ({
      top: `${S.value}px`,
      left: `${_.value}px`,
      width: `${ne.value}px`
    })), ye = y(() => ({
      maxHeight: `${N.value}px`
    })), Le = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), Me = (Q) => l.value.some((G) => String(G) === String(Q)), be = y(() => [...w.value].sort((Q, G) => {
      const R = Me(Q.value), ke = Me(G.value);
      return R !== ke ? R ? -1 : 1 : Le.compare(Q.label, G.label);
    })), Oe = F(null), tt = F(null), Ge = F([]), je = F(0);
    let Ne = null;
    const gt = y(
      () => Math.max(0, b.value.length - je.value)
    );
    function vt(Q, G) {
      Q && (Ge.value[G] = Q);
    }
    function mt() {
      var nt, Re, Ze;
      if (!$.value) {
        je.value = b.value.length;
        return;
      }
      const Q = ((nt = Oe.value) == null ? void 0 : nt.clientWidth) ?? 0, G = b.value.length;
      if (!Q || G === 0) {
        je.value = G;
        return;
      }
      const R = ((Re = tt.value) == null ? void 0 : Re.offsetWidth) ?? 28, ke = 6;
      let Se = 0, Ve = 0;
      for (let Be = 0; Be < G; Be += 1) {
        const wt = ((Ze = Ge.value[Be]) == null ? void 0 : Ze.offsetWidth) ?? 0, ot = Se + (Be > 0 ? ke : 0) + wt, rt = G - (Be + 1) > 0 ? ke + R : 0;
        if (ot + rt <= Q)
          Se = ot, Ve = Be + 1;
        else
          break;
      }
      Ve === 0 && G > 0 && (Ve = 1), je.value = Ve;
    }
    const Ye = () => {
      var at, rt;
      if (!c.value || !se.value) return;
      const Q = se.value.getBoundingClientRect(), G = window.innerWidth, R = window.innerHeight, ke = 6, Se = La, Ve = (((at = D.value) == null ? void 0 : at.scrollHeight) ?? 0) || (((rt = i.value) == null ? void 0 : rt.scrollHeight) ?? 0) || 240;
      z.value == null && (z.value = Ve);
      const nt = z.value, Re = R - Q.bottom - ke - Se, Ze = Q.top - ke - Se, Be = Re < 180 && Ze > Re;
      U.value = Be;
      const ot = Math.min(Ia, nt, Math.max(0, Be ? Ze : Re));
      N.value = Math.max(64, ot), ne.value = Math.max(260, Q.width), _.value = Math.min(
        Math.max(Q.left, Se),
        G - ne.value - Se
      ), Be ? S.value = Math.max(Se, Q.top - ke - N.value) : S.value = Math.min(
        R - Se - N.value,
        Q.bottom + ke
      );
    }, Ke = (Q) => {
      var R;
      if (!c.value) return;
      const G = Q == null ? void 0 : Q.target;
      G && ((R = D.value) != null && R.contains(G)) || Ye();
    };
    async function qe() {
      await Fe(), mt();
    }
    return de(
      () => [b.value.length, e.size, e.displayMode, x.value],
      () => {
        qe();
      },
      { immediate: !0 }
    ), de(be, () => {
      qe();
    }), de(
      () => [c.value, s.value, be.value.length],
      async ([Q]) => {
        if (!Q) {
          z.value = null;
          return;
        }
        await Fe(), Ye();
      }
    ), de(Oe, (Q) => {
      Ne == null || Ne.disconnect(), Ne = null, Q && (Ne = new ResizeObserver(() => {
        mt();
      }), Ne.observe(Q));
    }), ct(() => {
      window.addEventListener("resize", Ke), window.addEventListener("scroll", Ke, !0);
    }), et(() => {
      Ne == null || Ne.disconnect(), window.removeEventListener("resize", Ke), window.removeEventListener("scroll", Ke, !0);
    }), (Q, G) => (u(), g("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      f("div", {
        ref_key: "triggerRef",
        ref: se,
        class: B([
          m.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          oe[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: G[10] || (G[10] = //@ts-ignore
        (...R) => A(M) && A(M)(...R))
      }, [
        m.value === "inline-compact" ? (u(), g(me, { key: 0 }, [
          f("span", {
            class: B(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", he[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3),
          A(b).length ? (u(), g("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Oe,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (u(!0), g(me, null, Ee(A(b).slice(0, je.value), (R) => (u(), g("span", {
              key: R.value,
              class: B(["badge badge-soft-primary gap-1 max-w-[12rem]", X[t.size || "md"]])
            }, [
              f("span", xa, V(R.label), 1),
              f("button", {
                type: "button",
                class: B([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  we[t.size || "md"]
                ]),
                onClick: ve((ke) => A(O)(R.value), ["stop"])
              }, [
                ae(ue, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, ya)
            ], 2))), 128)),
            gt.value > 0 ? (u(), g("span", ba, " +" + V(gt.value), 1)) : I("", !0)
          ], 512)) : (u(), g("span", Ma)),
          f("span", {
            class: B([
              A(b).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            Bt(f("input", {
              ref_key: "inputEl",
              ref: v,
              "onUpdate:modelValue": G[0] || (G[0] = (R) => Lt(x) ? x.value = R : null),
              class: B([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: xe(Y.value),
              placeholder: "Search...",
              onKeydown: G[1] || (G[1] = //@ts-ignore
              (...R) => A(te) && A(te)(...R)),
              onFocus: G[2] || (G[2] = (R) => {
                c.value = !0, Fe(Ye);
              })
            }, null, 36), [
              [Tt, A(x)]
            ])
          ], 2),
          f("button", {
            type: "button",
            class: B(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
            onClick: G[3] || (G[3] = ve((R) => {
              c.value = !A(c), Fe(Ye);
            }, ["stop"]))
          }, [
            ae(ue, {
              name: A(c) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 2),
          A(b).length ? (u(), g("button", {
            key: 2,
            type: "button",
            class: B(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
            onClick: G[4] || (G[4] = ve((R) => A(L)(), ["stop"]))
          }, [
            ae(ue, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 2)) : I("", !0)
        ], 64)) : (u(), g(me, { key: 1 }, [
          A(b).length ? (u(), g("div", Ca, [
            (u(!0), g(me, null, Ee(A(b), (R) => (u(), g("span", {
              key: R.value,
              class: B(["badge badge-soft-primary gap-1 max-w-full", X[t.size || "md"]])
            }, [
              f("span", Da, V(R.label), 1),
              f("button", {
                type: "button",
                class: B([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  we[t.size || "md"]
                ]),
                onClick: ve((ke) => A(O)(R.value), ["stop"])
              }, [
                ae(ue, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, $a)
            ], 2))), 128))
          ])) : (u(), g("span", {
            key: 1,
            class: B(["opacity-60 w-full", he[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3)),
          f("div", Sa, [
            f("span", Ha, [
              Bt(f("input", {
                ref_key: "inputEl",
                ref: v,
                "onUpdate:modelValue": G[5] || (G[5] = (R) => Lt(x) ? x.value = R : null),
                class: B([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: xe(le.value),
                placeholder: "Search...",
                onKeydown: G[6] || (G[6] = //@ts-ignore
                (...R) => A(te) && A(te)(...R)),
                onFocus: G[7] || (G[7] = (R) => {
                  c.value = !0, Fe(Ye);
                })
              }, null, 36), [
                [Tt, A(x)]
              ])
            ]),
            f("button", {
              type: "button",
              class: B(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
              onClick: G[8] || (G[8] = ve((R) => {
                c.value = !A(c), Fe(Ye);
              }, ["stop"]))
            }, [
              ae(ue, {
                name: A(c) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 2),
            A(b).length ? (u(), g("button", {
              key: 0,
              type: "button",
              class: B(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
              onClick: G[9] || (G[9] = ve((R) => A(L)(), ["stop"]))
            }, [
              ae(ue, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 2)) : I("", !0)
          ])
        ], 64)),
        $.value ? (u(), g("div", Ea, [
          (u(!0), g(me, null, Ee(A(b), (R, ke) => (u(), g("span", {
            key: `measure-${R.value}`,
            ref_for: !0,
            ref: (Se) => vt(Se, ke),
            class: B(["badge badge-soft-primary gap-1 max-w-[12rem]", X[t.size || "md"]])
          }, [
            f("span", _a, V(R.label), 1),
            f("span", {
              class: B([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                we[t.size || "md"]
              ])
            }, [
              ae(ue, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          f("span", {
            ref_key: "measureCounterEl",
            ref: tt,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : I("", !0)
      ], 2),
      (u(), Ue(ut, { to: "body" }, [
        ae(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": U.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": U.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            A(c) ? (u(), g("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: D,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: xe(_e.value)
            }, [
              A(s) ? (u(), g("div", ja, "Loading...")) : (u(), g("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: xe(ye.value)
              }, [
                (u(!0), g(me, null, Ee(be.value, (R) => (u(), g("li", {
                  key: R.value,
                  class: B([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    ge[t.size || "md"],
                    Me(R.value) ? "bg-primary/15" : ""
                  ]),
                  onMousedown: ve((ke) => A(O)(R.value), ["prevent"])
                }, [
                  f("input", {
                    type: "checkbox",
                    class: B([W[t.size || "md"], "pointer-events-none"]),
                    checked: Me(R.value)
                  }, null, 10, Ta),
                  f("span", null, V(R.label), 1)
                ], 42, Ba))), 128)),
                !be.value.length && !A(s) ? (u(), g("li", Aa, " No results ")) : I("", !0)
              ], 4))
            ], 4)) : I("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Wt = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [p, l] of a)
    e[p] = l;
  return e;
}, Br = /* @__PURE__ */ Wt(za, [["__scopeId", "data-v-66839298"]]), Fa = { class: "font-medium" }, Oa = { class: "text-sm opacity-60" }, Na = {
  key: 0,
  class: "text-xs opacity-60 space-y-1"
}, Va = { key: 0 }, Pa = { key: 1 }, Ya = ["multiple", "accept", "disabled"], Ra = {
  key: 0,
  class: "space-y-2"
}, Wa = { class: "flex items-center gap-2 min-w-0" }, Ua = { class: "text-sm truncate" }, Ga = ["onClick"], Ka = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-3"
}, qa = ["src", "alt"], Za = ["onClick"], Ja = {
  key: 2,
  class: "text-xs opacity-60"
}, Tr = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = F(!1), d = F(e.modelValue ?? []), v = F([]), i = (D) => !e.maxFiles || e.maxFiles <= 0 ? D : D.slice(0, e.maxFiles), c = (D) => {
      d.value = i(D), p("update:modelValue", d.value), p("change", d.value);
    }, x = y(() => d.value.length > 0), s = y(
      () => d.value.map((D, S) => ({
        index: S,
        name: D.name,
        file: D,
        isImage: D.type.startsWith("image/")
      }))
    ), w = y(
      () => e.preview ? s.value.filter((D) => !D.isImage) : s.value
    ), b = y(() => !!(e.helperText || e.maxSizeText)), M = (D) => {
      var ne;
      const S = ((ne = D.name.split(".").pop()) == null ? void 0 : ne.toLowerCase()) ?? "", _ = D.type.toLowerCase();
      return _.startsWith("image/") ? "image" : _ === "application/pdf" || S === "pdf" ? "file-pdf" : S === "xls" || S === "xlsx" || _ === "application/vnd.ms-excel" || _ === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "file-xls" : S === "csv" || _ === "text/csv" ? "file-csv" : S === "doc" || S === "docx" || _ === "application/msword" || _ === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "file-doc" : S === "ppt" || S === "pptx" || _ === "application/vnd.ms-powerpoint" || _ === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? "file-ppt" : S === "txt" || _ === "text/plain" ? "file-txt" : S === "zip" || S === "rar" || S === "7z" || S === "tar" || S === "gz" || _ === "application/zip" || _ === "application/x-zip-compressed" || _ === "application/x-rar-compressed" || _ === "application/x-7z-compressed" || _ === "application/gzip" || _ === "application/x-tar" ? "file-archive" : "file";
    }, O = () => {
      v.value.forEach((D) => URL.revokeObjectURL(D.url)), v.value = d.value.map((D, S) => ({ file: D, fileIndex: S })).filter((D) => D.file.type.startsWith("image/")).map(({ file: D, fileIndex: S }) => ({
        id: `${D.name}-${D.size}-${D.lastModified}-${S}`,
        name: D.name,
        url: URL.createObjectURL(D),
        fileIndex: S
      }));
    }, L = (D) => {
      const S = D.target, _ = Array.from(S.files ?? []);
      _.length && (e.multiple ? c([...d.value, ..._]) : c([_[0]]), S.value = "");
    }, te = (D) => {
      var _;
      if (e.disabled) return;
      l.value = !1;
      const S = Array.from(((_ = D.dataTransfer) == null ? void 0 : _.files) ?? []);
      S.length && (e.multiple ? c([...d.value, ...S]) : c([S[0]]));
    }, se = (D) => {
      const S = [...d.value];
      S.splice(D, 1), c(S);
    };
    return de(
      () => e.modelValue,
      (D) => {
        d.value = i(D ?? []);
      }
    ), de(
      d,
      () => {
        O();
      },
      { immediate: !0 }
    ), et(() => {
      v.value.forEach((D) => URL.revokeObjectURL(D.url));
    }), (D, S) => (u(), g("div", {
      class: B(["space-y-3", e.class])
    }, [
      f("div", {
        class: B(["dropzone", [{ "dropzone-active": l.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: S[0] || (S[0] = ve((_) => l.value = !0, ["prevent"])),
        onDragleave: S[1] || (S[1] = (_) => l.value = !1),
        onDrop: ve(te, ["prevent"])
      }, [
        ae(ue, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        f("p", Fa, V(t.dropzoneText), 1),
        f("p", Oa, V(t.browseText), 1),
        b.value ? (u(), g("div", Na, [
          t.helperText ? (u(), g("p", Va, V(t.helperText), 1)) : I("", !0),
          t.maxSizeText ? (u(), g("p", Pa, V(t.maxSizeText), 1)) : I("", !0)
        ])) : I("", !0),
        f("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: L
        }, null, 40, Ya)
      ], 34),
      w.value.length ? (u(), g("div", Ra, [
        (u(!0), g(me, null, Ee(w.value, (_) => (u(), g("div", {
          key: `${_.name}-${_.index}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          f("span", Wa, [
            ae(ue, {
              name: M(_.file),
              class: "w-4 h-4 shrink-0"
            }, null, 8, ["name"]),
            f("span", Ua, V(_.name), 1)
          ]),
          f("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ne) => se(_.index)
          }, [
            ae(ue, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, Ga)
        ]))), 128))
      ])) : I("", !0),
      t.preview && v.value.length ? (u(), g("div", Ka, [
        (u(!0), g(me, null, Ee(v.value, (_) => (u(), g("div", {
          key: _.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          f("img", {
            src: _.url,
            alt: _.name,
            class: "w-full h-full object-cover"
          }, null, 8, qa),
          f("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ne) => se(_.fileIndex)
          }, [
            ae(ue, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, Za)
        ]))), 128))
      ])) : I("", !0),
      x.value ? I("", !0) : (u(), g("p", Ja, V(t.emptyText), 1))
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
}, rr = /* @__PURE__ */ ie({
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
    const e = t, p = a, l = Nt(), d = F(!1), v = y(() => String(e.modelValue ?? "")), i = y(() => v.value.length > 0), c = y(() => !!e.prefixIcon), x = y(() => !!e.suffixIcon), s = y(() => !!e.addonLeft || !!e.addonRight), w = y(
      () => e.clearable && i.value && !e.disabled && !e.readonly
    ), b = y(
      () => e.passwordToggle && e.type === "password" && !e.disabled
    ), M = y(() => b.value && d.value ? "text" : e.type), O = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, L = y(
      () => e.color === "default" ? "" : `input-${e.color}`
    ), te = y(() => [
      "input",
      O[e.size],
      L.value,
      c.value ? "mitreka-input-has-prefix" : "",
      x.value || w.value || b.value ? "mitreka-input-has-suffix" : ""
    ]), se = (ne) => {
      const N = ne.target;
      p("update:modelValue", N.value);
    }, D = () => {
      p("update:modelValue", ""), p("clear");
    }, S = () => {
      d.value = !d.value;
    }, _ = (ne) => {
      ne.key === "Enter" && p("enter");
    };
    return (ne, N) => (u(), g("div", {
      class: B(["mitreka-input-group w-full", s.value ? "mitreka-input-group--with-addon" : ""])
    }, [
      t.addonLeft ? (u(), g("span", Xa, V(t.addonLeft), 1)) : I("", !0),
      f("div", Qa, [
        c.value ? (u(), g("span", er, [
          ae(ue, {
            name: t.prefixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : I("", !0),
        f("input", It(A(l), {
          type: M.value,
          value: v.value,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: te.value,
          onInput: se,
          onFocus: N[0] || (N[0] = (z) => p("focus", z)),
          onBlur: N[1] || (N[1] = (z) => p("blur", z)),
          onKeydown: _
        }), null, 16, tr),
        x.value ? (u(), g("span", nr, [
          ae(ue, {
            name: t.suffixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : I("", !0),
        w.value ? (u(), g("button", {
          key: 2,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": "Clear input",
          onClick: D
        }, [
          ae(ue, {
            name: "x",
            class: "w-4 h-4 opacity-70"
          })
        ])) : I("", !0),
        b.value ? (u(), g("button", {
          key: 3,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": d.value ? "Hide password" : "Show password",
          onClick: S
        }, [
          ae(ue, {
            name: d.value ? "eye-off" : "eye",
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ], 8, or)) : I("", !0)
      ]),
      t.addonRight ? (u(), g("span", ar, V(t.addonRight), 1)) : I("", !0)
    ], 2));
  }
}), Ar = /* @__PURE__ */ Wt(rr, [["__scopeId", "data-v-4e5d8d4f"]]);
export {
  Ar as I,
  Br as M,
  dr as _,
  cr as a,
  ur as b,
  fr as c,
  hr as d,
  pr as e,
  gr as f,
  Yn as g,
  vr as h,
  mr as i,
  wr as j,
  kr as k,
  xr as l,
  yr as m,
  br as n,
  Mr as o,
  Cr as p,
  Dr as q,
  $r as r,
  ue as s,
  Hr as t,
  Er as u,
  _r as v,
  jr as w,
  Tr as x,
  Vt as y,
  Sr as z
};
