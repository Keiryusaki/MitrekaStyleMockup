import { defineComponent as Z, createElementBlock as v, openBlock as g, normalizeClass as L, createCommentVNode as N, renderSlot as ee, createElementVNode as p, ref as oe, watch as le, withKeys as Te, withModifiers as we, createBlock as He, Teleport as ct, createVNode as ce, Transition as Le, withCtx as Fe, toDisplayString as Y, provide as en, inject as tn, computed as B, normalizeStyle as ve, createTextVNode as ut, Fragment as pe, renderList as be, unref as j, useSlots as nn, resolveDynamicComponent as on, reactive as an, withDirectives as Ct, vModelText as Mt, onMounted as Ue, onBeforeUnmount as Je, useAttrs as rn, mergeProps as sn, isRef as ln } from "vue";
import { d as dn, c as cn, f as un, h as fn, i as hn, g as pn, r as gn, a as vn, b as mn } from "./useAgGridRowHeight-ByGQBhyS.js";
import { AgGridVue as wn } from "ag-grid-vue3";
const bn = ["disabled"], kn = {
  key: 0,
  class: "animate-spin"
}, Da = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: s, color: h } = e;
      return h === "default" ? s === "outline" ? "btn-outline" : s === "ghost" ? "btn-ghost" : "" : s === "solid" ? `btn-${h}` : s === "outline" ? `btn-outline btn-outline-${h}` : s === "soft" ? `btn-soft-${h}` : s === "ghost" ? "btn-ghost" : "";
    }, f = (s) => {
      !e.disabled && !e.loading && u("click", s);
    };
    return (s, h) => (g(), v("button", {
      class: L(["btn", l[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: f
    }, [
      t.loading ? (g(), v("span", kn, [...h[0] || (h[0] = [
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
      ])])) : N("", !0),
      ee(s.$slots, "default")
    ], 10, bn));
  }
}), _a = /* @__PURE__ */ Z({
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
      const { variant: l, color: d } = a;
      return d === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${d}` : l === "outline" ? `badge-outline badge-outline-${d}` : l === "soft" ? `badge-soft-${d}` : "";
    };
    return (l, d) => (g(), v("span", {
      class: L(["badge", e[t.size], u()])
    }, [
      ee(l.$slots, "default")
    ], 2));
  }
}), yn = ["role", "aria-expanded", "tabindex"], xn = { class: "card-title" }, Cn = { class: "card-body-inner" }, Mn = {
  key: 3,
  class: "mt-4"
}, Ea = /* @__PURE__ */ Z({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const u = t, l = e, d = oe(u.modelValue !== void 0 ? u.modelValue : u.defaultOpen);
    le(() => u.modelValue, (s) => {
      s !== void 0 && (d.value = s);
    });
    function f() {
      if (!u.collapsible) return;
      const s = !d.value;
      d.value = s, l("update:modelValue", s), l("toggle", s);
    }
    return a({ isOpen: d, toggle: f }), (s, h) => (g(), v("section", {
      class: L(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      s.$slots.title ? (g(), v("header", {
        key: 0,
        class: L(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: f,
        onKeydown: [
          h[0] || (h[0] = Te((k) => t.collapsible && f(), ["enter"])),
          h[1] || (h[1] = Te(we((k) => t.collapsible && f(), ["prevent"]), ["space"]))
        ]
      }, [
        p("div", xn, [
          ee(s.$slots, "title")
        ]),
        t.collapsible ? (g(), v("svg", {
          key: 0,
          class: L(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...h[2] || (h[2] = [
          p("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : N("", !0)
      ], 42, yn)) : N("", !0),
      t.collapsible ? (g(), v("div", {
        key: 1,
        class: L(["card-body-wrapper", { "is-open": d.value }])
      }, [
        p("div", Cn, [
          ee(s.$slots, "default")
        ])
      ], 2)) : ee(s.$slots, "default", { key: 2 }),
      s.$slots.footer ? (g(), v("footer", Mn, [
        ee(s.$slots, "footer")
      ])) : N("", !0)
    ], 2));
  }
}), Dn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, _n = { class: "text-xl font-semibold" }, Sa = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = {
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
      e.persistent || u("close");
    };
    return le(
      () => e.open,
      (f) => {
        f ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (f, s) => (g(), He(ct, { to: "body" }, [
      ce(Le, { name: "fade" }, {
        default: Fe(() => [
          t.open ? (g(), v("div", {
            key: 0,
            class: "fixed inset-0 z-40 bg-black/40",
            onClick: d
          })) : N("", !0)
        ]),
        _: 1
      }),
      ce(Le, { name: "zoom" }, {
        default: Fe(() => [
          t.open ? (g(), v("div", {
            key: 0,
            class: L([
              "fixed inset-0 z-50 flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            p("div", {
              class: L([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? N("", !0) : (g(), v("div", Dn, [
                ee(f.$slots, "header", {}, () => [
                  p("h3", _n, Y(t.title), 1)
                ]),
                p("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: s[0] || (s[0] = (h) => u("close"))
                }, [...s[3] || (s[3] = [
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
                class: L([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                ee(f.$slots, "default")
              ], 2),
              t.hideFooter ? N("", !0) : (g(), v("div", {
                key: 1,
                class: L([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                ee(f.$slots, "footer", {}, () => [
                  p("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: s[1] || (s[1] = (h) => u("close"))
                  }, Y(t.cancelText), 1),
                  p("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: s[2] || (s[2] = (h) => u("confirm"))
                  }, Y(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : N("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), En = ["aria-expanded", "aria-disabled", "onKeydown"], Sn = { class: "collapse-title" }, $n = { class: "collapse-content" }, jn = { class: "collapse-content-inner" }, Tn = { class: "collapse-body" }, $a = /* @__PURE__ */ Z({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const u = t, l = e, d = oe(u.modelValue !== void 0 ? u.modelValue : u.defaultOpen);
    le(() => u.modelValue, (s) => {
      s !== void 0 && (d.value = s);
    });
    function f() {
      if (u.disabled) return;
      const s = !d.value;
      d.value = s, l("update:modelValue", s), l("toggle", s);
    }
    return a({ isOpen: d, toggle: f }), (s, h) => (g(), v("div", {
      class: L([
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
        onClick: f,
        onKeydown: [
          Te(f, ["enter"]),
          Te(we(f, ["prevent"]), ["space"])
        ]
      }, [
        p("div", Sn, [
          ee(s.$slots, "header", {}, () => [
            ee(s.$slots, "title")
          ])
        ]),
        h[0] || (h[0] = p("svg", {
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
      ], 40, En),
      p("div", $n, [
        p("div", jn, [
          p("div", Tn, [
            ee(s.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), ja = /* @__PURE__ */ Z({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const u = t, l = e, d = oe(/* @__PURE__ */ new Set());
    le(() => u.modelValue, (h) => {
      h === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(h) ? d.value = new Set(h) : d.value = /* @__PURE__ */ new Set([h]);
    }, { immediate: !0 });
    function f(h) {
      const k = new Set(d.value);
      k.has(h) ? k.delete(h) : (u.multiple || k.clear(), k.add(h)), d.value = k, u.multiple ? l("update:modelValue", Array.from(k)) : l("update:modelValue", k.size > 0 ? Array.from(k)[0] : null);
    }
    function s(h) {
      return d.value.has(h);
    }
    return en("accordion", {
      toggleItem: f,
      isItemOpen: s
    }), a({ openItems: d, toggleItem: f }), (h, k) => (g(), v("div", {
      class: L(["accordion", `accordion-${t.variant}`])
    }, [
      ee(h.$slots, "default")
    ], 2));
  }
}), Hn = ["aria-expanded", "aria-disabled", "onKeydown"], An = { class: "accordion-title" }, Bn = { class: "accordion-content" }, On = { class: "accordion-content-inner" }, Ln = { class: "accordion-body" }, Ta = /* @__PURE__ */ Z({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = tn("accordion"), u = B(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function l() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (d, f) => (g(), v("div", {
      class: L(["accordion-item", { "is-open": u.value }])
    }, [
      p("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": u.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          Te(l, ["enter"]),
          Te(we(l, ["prevent"]), ["space"])
        ]
      }, [
        p("div", An, [
          ee(d.$slots, "header", {}, () => [
            ee(d.$slots, "title")
          ])
        ]),
        f[0] || (f[0] = p("svg", {
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
      ], 40, Hn),
      p("div", Bn, [
        p("div", On, [
          p("div", Ln, [
            ee(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Fn = { class: "loading-logo-wrapper" }, In = { class: "dots-container" }, Nn = ["width", "height"], Yn = {
  key: 0,
  class: "loading-text"
}, Pn = /* @__PURE__ */ Z({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = B(() => Math.round(a.size * (8 / 60)));
    return (u, l) => (g(), v("div", Fn, [
      p("div", {
        class: "loading-logo-container",
        style: ve({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        p("div", In, [
          p("span", {
            class: "loading-dot dot-1 dot-blue",
            style: ve({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-2 dot-blue",
            style: ve({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-3 dot-black",
            style: ve({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-4 dot-black",
            style: ve({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-5 dot-red",
            style: ve({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          p("span", {
            class: "loading-dot dot-6 dot-red",
            style: ve({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (g(), v("svg", {
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
        ])], 8, Nn))
      ], 4),
      t.text ? (g(), v("p", Yn, [
        ut(Y(t.text), 1),
        l[1] || (l[1] = p("span", { class: "loading-dots" }, [
          p("span", null, "."),
          p("span", null, "."),
          p("span", null, ".")
        ], -1))
      ])) : N("", !0)
    ]));
  }
}), zn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, Ha = /* @__PURE__ */ Z({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (g(), He(ct, { to: "body" }, [
      ce(Le, { name: "fade" }, {
        default: Fe(() => [
          t.open ? (g(), v("div", zn, [
            ce(Pn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : N("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Vn = { class: "toast-content" }, Rn = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Wn = ["d"], Kn = { class: "toast-body" }, qn = {
  key: 0,
  class: "toast-title"
}, Gn = { class: "toast-message" }, Un = ["onClick"], Aa = /* @__PURE__ */ Z({
  __name: "Toasts",
  setup(t) {
    const a = dn(), e = B(() => {
      const h = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return h[a.toastPosition.value] || h["bottom-right"];
    }), u = {
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
    }, f = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, s = (h, k = "soft") => {
      var w;
      return ((w = {
        soft: l,
        solid: d,
        outline: f
      }[k]) == null ? void 0 : w[h]) || l[h] || "toast-default";
    };
    return (h, k) => (g(), He(ct, { to: "body" }, [
      p("div", {
        class: L(["toast-container", e.value])
      }, [
        (g(!0), v(pe, null, be(j(a).toasts.value, (i) => (g(), v("div", {
          key: i.id,
          class: L(["toast-item", s(i.type, i.variant)])
        }, [
          p("div", Vn, [
            (g(), v("svg", Rn, [
              p("path", {
                d: u[i.type],
                fill: "currentColor"
              }, null, 8, Wn)
            ])),
            p("div", Kn, [
              i.title ? (g(), v("div", qn, Y(i.title), 1)) : N("", !0),
              p("div", Gn, Y(i.message), 1)
            ]),
            p("button", {
              class: "toast-close-btn",
              onClick: (w) => j(a).dismiss(i.id)
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
            ])], 8, Un)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), Ba = /* @__PURE__ */ Z({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const a = t, e = oe(!1);
    let u = null;
    const l = () => {
      u = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, d = () => {
      u && (clearTimeout(u), u = null), e.value = !1;
    }, f = B(() => `tooltip-pos-${a.position}`), s = B(() => `tooltip-arrow-${a.position}`), h = B(() => `tooltip-variant-${a.variant}`);
    return (k, i) => (g(), v("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: d,
      onFocus: l,
      onBlur: d
    }, [
      ee(k.$slots, "default"),
      ce(Le, { name: "tooltip-fade" }, {
        default: Fe(() => [
          e.value && t.text ? (g(), v("span", {
            key: 0,
            class: L(["tooltip-content", [f.value, h.value]]),
            role: "tooltip"
          }, [
            ut(Y(t.text) + " ", 1),
            p("span", {
              class: L(["tooltip-arrow", [s.value, h.value]])
            }, null, 2)
          ], 2)) : N("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Jn = { class: "mitreka-pagination" }, Zn = ["disabled"], Qn = { class: "pagination-status" }, Xn = ["disabled"], Oa = /* @__PURE__ */ Z({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, u = a, l = () => {
      e.page > 1 && u("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && u("change", e.page + 1);
    };
    return (f, s) => (g(), v("div", Jn, [
      p("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...s[0] || (s[0] = [
        p("span", { class: "hidden sm:inline" }, "Prev", -1),
        p("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Zn),
      p("span", Qn, Y(t.page) + " / " + Y(t.pages), 1),
      p("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...s[1] || (s[1] = [
        p("span", { class: "hidden sm:inline" }, "Next", -1),
        p("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, Xn)
    ]));
  }
}), eo = { class: "avatar-root" }, to = ["src", "alt"], La = /* @__PURE__ */ Z({
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
    const a = t, e = oe(!1), u = B(() => a.src && !e.value), l = B(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), d = B(() => `avatar-size-${a.size}`), f = B(() => `avatar-color-${a.color}`), s = B(() => a.status ? `avatar-status-${a.status}` : ""), h = B(() => `avatar-status-size-${a.size}`), k = B(() => a.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (w, E) => (g(), v("span", eo, [
      u.value ? (g(), v("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: L(["avatar-img", [d.value, k.value]]),
        onError: i
      }, null, 42, to)) : (g(), v("span", {
        key: 1,
        class: L(["avatar-fallback", [d.value, f.value, k.value]])
      }, Y(l.value), 3)),
      t.status ? (g(), v("span", {
        key: 2,
        class: L(["avatar-status", [s.value, h.value]])
      }, null, 2)) : N("", !0)
    ]));
  }
}), Fa = /* @__PURE__ */ Z({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = nn(), u = B(() => {
      var h;
      const s = (h = e.default) == null ? void 0 : h.call(e);
      return s ? s.length : 0;
    }), l = B(() => u.value <= a.max ? 0 : u.value - a.max), d = B(() => `avatar-size-${a.size}`), f = B(() => `avatar-group-space-${a.size}`);
    return (s, h) => (g(), v("div", {
      class: L(["avatar-group", f.value])
    }, [
      (g(!0), v(pe, null, be(t.max, (k, i) => {
        var w, E;
        return g(), v(pe, { key: i }, [
          i < u.value ? (g(), He(on((E = (w = j(e)).default) == null ? void 0 : E.call(w)[i]), { key: 0 })) : N("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (g(), v("span", {
        key: 0,
        class: L(["avatar-group-count", d.value])
      }, " +" + Y(l.value), 3)) : N("", !0)
    ], 2));
  }
}), no = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, oo = { class: "breadcrumbs-list" }, ao = {
  key: 0,
  class: "breadcrumbs-item"
}, ro = ["href"], io = { key: 0 }, so = ["href"], lo = {
  key: 1,
  class: "breadcrumbs-text"
}, co = {
  key: 1,
  class: "breadcrumbs-current"
}, Ia = /* @__PURE__ */ Z({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (u) => u === a.items.length - 1;
    return (u, l) => t.items.length ? (g(), v("nav", no, [
      p("ol", oo, [
        t.showHome ? (g(), v("li", ao, [
          p("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, Y(t.homeLabel), 9, ro)
        ])) : N("", !0),
        (g(!0), v(pe, null, be(t.items, (d, f) => (g(), v("li", {
          key: f,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = p("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(f) ? (g(), v("span", co, Y(d.label), 1)) : (g(), v("span", io, [
            d.href ? (g(), v("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, Y(d.label), 9, so)) : (g(), v("span", lo, Y(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : N("", !0);
  }
}), uo = { class: "mitreka-stat-card" }, fo = {
  key: 0,
  class: "stat-icon"
}, ho = { class: "stat-content" }, po = { class: "stat-label" }, go = { class: "stat-value" }, Na = /* @__PURE__ */ Z({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (g(), v("div", uo, [
      t.icon ? (g(), v("div", fo, Y(t.icon), 1)) : N("", !0),
      p("div", ho, [
        p("div", po, Y(t.label), 1),
        p("div", go, Y(t.value), 1)
      ])
    ]));
  }
}), vo = { class: "mitreka-page-header" }, mo = { class: "page-header-title-row" }, wo = { class: "page-header-title" }, bo = {
  key: 0,
  class: "page-header-desc"
}, Ya = /* @__PURE__ */ Z({
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
    }, u = B(() => {
      if (!a.category) return "";
      const l = a.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, d) => (g(), v("header", vo, [
      p("div", mo, [
        p("h1", wo, Y(t.title), 1),
        t.category ? (g(), v("span", {
          key: 0,
          class: L(["badge page-header-badge", u.value])
        }, Y(t.category), 3)) : N("", !0)
      ]),
      t.description ? (g(), v("p", bo, Y(t.description), 1)) : N("", !0)
    ]));
  }
}), ko = { class: "mitreka-theme-switcher" }, yo = ["value"], Pa = /* @__PURE__ */ Z({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: u } = cn("light"), l = B(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (f) => {
      e(f === "mitrekadark" ? "dark" : "light");
    };
    return (f, s) => (g(), v("div", ko, [
      p("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: s[0] || (s[0] = //@ts-ignore
        (...h) => j(u) && j(u)(...h))
      }, " Toggle: " + Y(l.value), 1),
      p("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: s[1] || (s[1] = (h) => d(h.target.value))
      }, [...s[2] || (s[2] = [
        p("option", { value: "mitrekalight" }, "mitrekalight", -1),
        p("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, yo)
    ]));
  }
}), xo = { class: "sidebar-header" }, Co = {
  key: 0,
  class: "sidebar-search"
}, Mo = ["placeholder"], Do = { class: "sidebar-nav" }, _o = ["href", "title", "onClick"], Eo = { class: "sidebar-icon" }, So = { class: "sidebar-icon-text" }, $o = {
  key: 0,
  class: "sidebar-label"
}, jo = ["title", "onClick"], To = { class: "sidebar-icon" }, Ho = { class: "sidebar-icon-text" }, Ao = {
  key: 0,
  class: "sidebar-label"
}, Bo = ["href", "title", "onClick"], Oo = { class: "sidebar-icon" }, Lo = { class: "sidebar-icon-text" }, Fo = {
  key: 0,
  class: "sidebar-label"
}, za = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = oe(""), d = an({});
    e.defaultOpenIds.forEach((w) => {
      d[w] = !0;
    });
    const f = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), s = (w) => {
      var _;
      if (!w.children) return !1;
      if (l.value.trim()) return !0;
      const E = d[w.id], x = ((_ = w.children) == null ? void 0 : _.some(f)) ?? !1;
      return E === void 0 && x && (d[w.id] = !0), d[w.id] ?? x;
    }, h = (w) => {
      const E = !s(w);
      d[w.id] = E, u("toggle", w.id, E);
    }, k = B(() => {
      const w = l.value.toLowerCase().trim();
      return w ? e.items.map((E) => {
        if (E.children) {
          const x = E.children.filter(
            (_) => _.label.toLowerCase().includes(w)
          );
          return E.label.toLowerCase().includes(w) ? E : x.length > 0 ? { ...E, children: x } : null;
        }
        return E.label.toLowerCase().includes(w) ? E : null;
      }).filter(Boolean) : e.items;
    }), i = (w) => {
      u("navigate", w), l.value = "";
    };
    return (w, E) => (g(), v("aside", {
      class: L(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      p("div", xo, [
        ee(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (g(), v("div", Co, [
        Ct(p("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": E[0] || (E[0] = (x) => l.value = x)
        }, null, 8, Mo), [
          [Mt, l.value]
        ]),
        l.value ? (g(), v("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: E[1] || (E[1] = (x) => l.value = "")
        }, " × ")) : N("", !0)
      ])) : N("", !0),
      p("nav", Do, [
        (g(!0), v(pe, null, be(k.value, (x) => (g(), v(pe, {
          key: x.id
        }, [
          x.children ? (g(), v(pe, { key: 1 }, [
            p("button", {
              class: L(["sidebar-item sidebar-group", s(x) ? "is-open" : ""]),
              title: t.collapsed ? x.label : void 0,
              onClick: (_) => h(x)
            }, [
              p("span", To, [
                ee(w.$slots, "icon", { item: x }, () => [
                  p("span", Ho, Y(x.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? N("", !0) : (g(), v("span", Ao, Y(x.label), 1)),
              t.collapsed ? N("", !0) : (g(), v("span", {
                key: 1,
                class: L(["sidebar-caret", s(x) ? "rotate" : ""])
              }, "›", 2))
            ], 10, jo),
            s(x) ? (g(), v("div", {
              key: 0,
              class: L(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (g(!0), v(pe, null, be(x.children, (_) => (g(), v("a", {
                key: _.id,
                class: L(["sidebar-item sidebar-child", f(_) ? "is-active" : ""]),
                href: _.href || "#",
                title: t.collapsed ? _.label : void 0,
                onClick: we((D) => i(_), ["prevent"])
              }, [
                p("span", Oo, [
                  ee(w.$slots, "icon", { item: _ }, () => [
                    p("span", Lo, Y(_.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? N("", !0) : (g(), v("span", Fo, Y(_.label), 1))
              ], 10, Bo))), 128))
            ], 2)) : N("", !0)
          ], 64)) : (g(), v("a", {
            key: 0,
            class: L(["sidebar-item", f(x) ? "is-active" : ""]),
            href: x.href || "#",
            title: t.collapsed ? x.label : void 0,
            onClick: we((_) => i(x), ["prevent"])
          }, [
            p("span", Eo, [
              ee(w.$slots, "icon", { item: x }, () => [
                p("span", So, Y(x.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? N("", !0) : (g(), v("span", $o, Y(x.label), 1))
          ], 10, _o))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Dt = {
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
       <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z"/>
       <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14"/>
       <path d="M8 6v8"/>
     </svg>
   `
}, Va = (t) => Dt[t], Io = ["innerHTML"], No = {
  key: 1,
  class: "mitreka-icon-fallback"
}, Ce = /* @__PURE__ */ Z({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = B(() => a.class || "w-5 h-5"), u = B(() => Dt[a.name]), l = B(
      () => u.value ? u.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, f) => u.value ? (g(), v("span", {
      key: 0,
      innerHTML: l.value,
      class: L(e.value)
    }, null, 10, Io)) : (g(), v("span", No, "?"));
  }
});
var at = [
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
], $e = {
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
}, Ie = {
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
}, de = function(t, a) {
  return a === void 0 && (a = 2), ("000" + t).slice(a * -1);
}, ge = function(t) {
  return t === !0 ? 1 : 0;
};
function yt(t, a) {
  var e;
  return function() {
    var u = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(u, l);
    }, a);
  };
}
var rt = function(t) {
  return t instanceof Array ? t : [t];
};
function se(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function W(t, a, e) {
  var u = window.document.createElement(t);
  return a = a || "", e = e || "", u.className = a, e !== void 0 && (u.textContent = e), u;
}
function qe(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function _t(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return _t(t.parentNode, a);
}
function Ge(t, a) {
  var e = W("div", "numInputWrapper"), u = W("input", "numInput " + t), l = W("span", "arrowUp"), d = W("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? u.type = "number" : (u.type = "text", u.pattern = "\\d*"), a !== void 0)
    for (var f in a)
      u.setAttribute(f, a[f]);
  return e.appendChild(u), e.appendChild(l), e.appendChild(d), e;
}
function fe(t) {
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
var it = function() {
}, Ze = function(t, a, e) {
  return e.months[a ? "shorthand" : "longhand"][t];
}, Yo = {
  D: it,
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
    t.setHours(t.getHours() % 12 + 12 * ge(new RegExp(e.amPM[1], "i").test(a)));
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
    var u = parseInt(a), l = new Date(t.getFullYear(), 0, 2 + (u - 1) * 7, 0, 0, 0, 0);
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
  l: it,
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
  w: it,
  y: function(t, a) {
    t.setFullYear(2e3 + parseFloat(a));
  }
}, _e = {
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
}, Oe = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, a, e) {
    return a.weekdays.shorthand[Oe.w(t, a, e)];
  },
  F: function(t, a, e) {
    return Ze(Oe.n(t, a, e) - 1, !1, a);
  },
  G: function(t, a, e) {
    return de(Oe.h(t, a, e));
  },
  H: function(t) {
    return de(t.getHours());
  },
  J: function(t, a) {
    return a.ordinal !== void 0 ? t.getDate() + a.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, a) {
    return a.amPM[ge(t.getHours() > 11)];
  },
  M: function(t, a) {
    return Ze(t.getMonth(), !0, a);
  },
  S: function(t) {
    return de(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, a, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return de(t.getFullYear(), 4);
  },
  d: function(t) {
    return de(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return de(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, a) {
    return a.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return de(t.getMonth() + 1);
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
}, Et = function(t) {
  var a = t.config, e = a === void 0 ? $e : a, u = t.l10n, l = u === void 0 ? Ie : u, d = t.isMobile, f = d === void 0 ? !1 : d;
  return function(s, h, k) {
    var i = k || l;
    return e.formatDate !== void 0 && !f ? e.formatDate(s, h, i) : h.split("").map(function(w, E, x) {
      return Oe[w] && x[E - 1] !== "\\" ? Oe[w](s, i, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, dt = function(t) {
  var a = t.config, e = a === void 0 ? $e : a, u = t.l10n, l = u === void 0 ? Ie : u;
  return function(d, f, s, h) {
    if (!(d !== 0 && !d)) {
      var k = h || l, i, w = d;
      if (d instanceof Date)
        i = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        i = new Date(d);
      else if (typeof d == "string") {
        var E = f || (e || $e).dateFormat, x = String(d).trim();
        if (x === "today")
          i = /* @__PURE__ */ new Date(), s = !0;
        else if (e && e.parseDate)
          i = e.parseDate(d, E);
        else if (/Z$/.test(x) || /GMT$/.test(x))
          i = new Date(d);
        else {
          for (var _ = void 0, D = [], T = 0, X = 0, J = ""; T < E.length; T++) {
            var K = E[T], z = K === "\\", ie = E[T - 1] === "\\" || z;
            if (_e[K] && !ie) {
              J += _e[K];
              var O = new RegExp(J).exec(d);
              O && (_ = !0) && D[K !== "Y" ? "push" : "unshift"]({
                fn: Yo[K],
                val: O[++X]
              });
            } else z || (J += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), D.forEach(function(P) {
            var V = P.fn, R = P.val;
            return i = V(i, R, k) || i;
          }), i = _ ? i : void 0;
        }
      }
      if (!(i instanceof Date && !isNaN(i.getTime()))) {
        e.errorHandler(new Error("Invalid date provided: " + w));
        return;
      }
      return s === !0 && i.setHours(0, 0, 0, 0), i;
    }
  };
};
function he(t, a, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(a.getTime()).setHours(0, 0, 0, 0) : t.getTime() - a.getTime();
}
var Po = function(t, a, e) {
  return t > Math.min(a, e) && t < Math.max(a, e);
}, st = function(t, a, e) {
  return t * 3600 + a * 60 + e;
}, zo = function(t) {
  var a = Math.floor(t / 3600), e = (t - a * 3600) / 60;
  return [a, e, t - a * 3600 - e * 60];
}, Vo = {
  DAY: 864e5
};
function lt(t) {
  var a = t.defaultHour, e = t.defaultMinute, u = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), d = t.minDate.getMinutes(), f = t.minDate.getSeconds();
    a < l && (a = l), a === l && e < d && (e = d), a === l && e === d && u < f && (u = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var s = t.maxDate.getHours(), h = t.maxDate.getMinutes();
    a = Math.min(a, s), a === s && (e = Math.min(h, e)), a === s && e === h && (u = t.maxDate.getSeconds());
  }
  return { hours: a, minutes: e, seconds: u };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var a = [], e = 1; e < arguments.length; e++)
    a[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var u = function(s) {
    s && Object.keys(s).forEach(function(h) {
      return t[h] = s[h];
    });
  }, l = 0, d = a; l < d.length; l++) {
    var f = d[l];
    u(f);
  }
  return t;
});
var re = function() {
  return re = Object.assign || function(t) {
    for (var a, e = 1, u = arguments.length; e < u; e++) {
      a = arguments[e];
      for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (t[l] = a[l]);
    }
    return t;
  }, re.apply(this, arguments);
}, xt = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var u = Array(t), l = 0, a = 0; a < e; a++)
    for (var d = arguments[a], f = 0, s = d.length; f < s; f++, l++)
      u[l] = d[f];
  return u;
}, Ro = 300;
function Wo(t, a) {
  var e = {
    config: re(re({}, $e), ne.defaultConfig),
    l10n: Ie
  };
  e.parseDate = dt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = D, e._setHoursFromDate = E, e._positionCalendar = Re, e.changeMonth = ae, e.changeYear = Pe, e.clear = te, e.close = Ye, e.onMouseOver = Ve, e._createElement = W, e.createDay = O, e.destroy = $t, e.isEnabled = De, e.jumpToDate = J, e.updateValue = xe, e.open = Ht, e.redraw = vt, e.set = Lt, e.setDate = Ft, e.toggle = Pt;
  function u() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, At(), gt(), Nt(), It(), u(), e.isMobile || ie(), X(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && E(e.config.noCalendar ? e.latestSelectedDateObj : void 0), xe(!1)), s();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && Re(), Q("onReady");
  }
  function d() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function f(n) {
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
  function h(n) {
    if (e.selectedDates.length === 0) {
      var o = e.config.minDate === void 0 || he(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = lt(e.config);
      o.setHours(r.hours, r.minutes, r.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && Rt(n);
    var c = e._input.value;
    w(), xe(), e._input.value !== c && e._debouncedChange();
  }
  function k(n, o) {
    return n % 12 + 12 * ge(o === e.l10n.amPM[1]);
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
  function w() {
    if (!(e.hourElement === void 0 || e.minuteElement === void 0)) {
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, o = (parseInt(e.minuteElement.value, 10) || 0) % 60, r = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = k(n, e.amPM.textContent));
      var c = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && he(e.latestSelectedDateObj, e.config.minDate, !0) === 0, m = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && he(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var b = st(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), H = st(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), M = st(n, o, r);
        if (M > H && M < b) {
          var F = zo(b);
          n = F[0], o = F[1], r = F[2];
        }
      } else {
        if (m) {
          var y = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, y.getHours()), n === y.getHours() && (o = Math.min(o, y.getMinutes())), o === y.getMinutes() && (r = Math.min(r, y.getSeconds()));
        }
        if (c) {
          var $ = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, $.getHours()), n === $.getHours() && o < $.getMinutes() && (o = $.getMinutes()), o === $.getMinutes() && (r = Math.max(r, $.getSeconds()));
        }
      }
      x(n, o, r);
    }
  }
  function E(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && x(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function x(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = de(e.config.time_24hr ? n : (12 + n) % 12 + 12 * ge(n % 12 === 0)), e.minuteElement.value = de(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[ge(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = de(r)));
  }
  function _(n) {
    var o = fe(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && Pe(r);
  }
  function D(n, o, r, c) {
    if (o instanceof Array)
      return o.forEach(function(m) {
        return D(n, m, r, c);
      });
    if (n instanceof Array)
      return n.forEach(function(m) {
        return D(m, o, r, c);
      });
    n.addEventListener(o, r, c), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, c);
      }
    });
  }
  function T() {
    Q("onChange");
  }
  function X() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(c) {
        return D(c, "click", e[r]);
      });
    }), e.isMobile) {
      Yt();
      return;
    }
    var n = yt(Tt, 50);
    if (e._debouncedChange = yt(T, Ro), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && D(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Ve(fe(r));
    }), D(e._input, "keydown", ft), e.calendarContainer !== void 0 && D(e.calendarContainer, "keydown", ft), !e.config.inline && !e.config.static && D(window, "resize", n), window.ontouchstart !== void 0 ? D(window.document, "touchstart", Qe) : D(window.document, "mousedown", Qe), D(window.document, "focus", Qe, { capture: !0 }), e.config.clickOpens === !0 && (D(e._input, "focus", e.open), D(e._input, "click", e.open)), e.daysContainer !== void 0 && (D(e.monthNav, "click", Vt), D(e.monthNav, ["keyup", "increment"], _), D(e.daysContainer, "click", mt)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return fe(r).select();
      };
      D(e.timeContainer, ["increment"], h), D(e.timeContainer, "blur", h, { capture: !0 }), D(e.timeContainer, "click", K), D([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && D(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && D(e.amPM, "click", function(r) {
        h(r);
      });
    }
    e.config.allowInput && D(e._input, "blur", jt);
  }
  function J(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), c = e.currentYear, m = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (b) {
      b.message = "Invalid date supplied: " + r, e.config.errorHandler(b);
    }
    o && e.currentYear !== c && (Q("onYearChange"), q()), o && (e.currentYear !== c || e.currentMonth !== m) && Q("onMonthChange"), e.redraw();
  }
  function K(n) {
    var o = fe(n);
    ~o.className.indexOf("arrow") && z(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function z(n, o, r) {
    var c = n && fe(n), m = r || c && c.parentNode && c.parentNode.firstChild, b = et("increment");
    b.delta = o, m && m.dispatchEvent(b);
  }
  function ie() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = W("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(ye()), e.innerContainer = W("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = G(), r = o.weekWrapper, c = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = c, e.weekWrapper = r;
      }
      e.rContainer = W("div", "flatpickr-rContainer"), e.rContainer.appendChild(Ne()), e.daysContainer || (e.daysContainer = W("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), I(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(Me()), se(e.calendarContainer, "rangeMode", e.config.mode === "range"), se(e.calendarContainer, "animate", e.config.animate === !0), se(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var m = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!m && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var b = W("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(b, e.element), b.appendChild(e.element), e.altInput && b.appendChild(e.altInput), b.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function O(n, o, r, c) {
    var m = De(o, !0), b = W("span", n, o.getDate().toString());
    return b.dateObj = o, b.$i = c, b.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && he(o, e.now) === 0 && (e.todayDateElem = b, b.classList.add("today"), b.setAttribute("aria-current", "date")), m ? (b.tabIndex = -1, tt(o) && (b.classList.add("selected"), e.selectedDateElem = b, e.config.mode === "range" && (se(b, "startRange", e.selectedDates[0] && he(o, e.selectedDates[0], !0) === 0), se(b, "endRange", e.selectedDates[1] && he(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && b.classList.add("inRange")))) : b.classList.add("flatpickr-disabled"), e.config.mode === "range" && zt(o) && !tt(o) && b.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && c % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), Q("onDayCreate", b), b;
  }
  function P(n) {
    n.focus(), e.config.mode === "range" && Ve(n);
  }
  function V(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, c = o; c != r; c += n)
      for (var m = e.daysContainer.children[c], b = n > 0 ? 0 : m.children.length - 1, H = n > 0 ? m.children.length : -1, M = b; M != H; M += n) {
        var F = m.children[M];
        if (F.className.indexOf("hidden") === -1 && De(F.dateObj))
          return F;
      }
  }
  function R(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, c = o > 0 ? e.config.showMonths : -1, m = o > 0 ? 1 : -1, b = r - e.currentMonth; b != c; b += m)
      for (var H = e.daysContainer.children[b], M = r - e.currentMonth === b ? n.$i + o : o < 0 ? H.children.length - 1 : 0, F = H.children.length, y = M; y >= 0 && y < F && y != (o > 0 ? F : -1); y += m) {
        var $ = H.children[y];
        if ($.className.indexOf("hidden") === -1 && De($.dateObj) && Math.abs(n.$i - y) >= Math.abs(o))
          return P($);
      }
    e.changeMonth(m), C(V(m), 0);
  }
  function C(n, o) {
    var r = d(), c = ze(r || document.body), m = n !== void 0 ? n : c ? r : e.selectedDateElem !== void 0 && ze(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && ze(e.todayDateElem) ? e.todayDateElem : V(o > 0 ? 1 : -1);
    m === void 0 ? e._input.focus() : c ? R(m, o) : P(m);
  }
  function A(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, c = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), m = e.utils.getDaysInMonth(o, n), b = window.document.createDocumentFragment(), H = e.config.showMonths > 1, M = H ? "prevMonthDay hidden" : "prevMonthDay", F = H ? "nextMonthDay hidden" : "nextMonthDay", y = c + 1 - r, $ = 0; y <= c; y++, $++)
      b.appendChild(O("flatpickr-day " + M, new Date(n, o - 1, y), y, $));
    for (y = 1; y <= m; y++, $++)
      b.appendChild(O("flatpickr-day", new Date(n, o, y), y, $));
    for (var U = m + 1; U <= 42 - r && (e.config.showMonths === 1 || $ % 7 !== 0); U++, $++)
      b.appendChild(O("flatpickr-day " + F, new Date(n, o + 1, U % m), U, $));
    var me = W("div", "dayContainer");
    return me.appendChild(b), me;
  }
  function I() {
    if (e.daysContainer !== void 0) {
      qe(e.daysContainer), e.weekNumbers && qe(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(A(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Ve();
    }
  }
  function q() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(c) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && c < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && c > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = W("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = Ze(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function ke() {
    var n = W("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = W("span", "cur-month") : (e.monthsDropdownContainer = W("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), D(e.monthsDropdownContainer, "change", function(H) {
      var M = fe(H), F = parseInt(M.value, 10);
      e.changeMonth(F - e.currentMonth), Q("onMonthChange");
    }), q(), r = e.monthsDropdownContainer);
    var c = Ge("cur-year", { tabindex: "-1" }), m = c.getElementsByTagName("input")[0];
    m.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && m.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (m.setAttribute("max", e.config.maxDate.getFullYear().toString()), m.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var b = W("div", "flatpickr-current-month");
    return b.appendChild(r), b.appendChild(c), o.appendChild(b), n.appendChild(o), {
      container: n,
      yearElement: m,
      monthElement: r
    };
  }
  function Ee() {
    qe(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = ke();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function ye() {
    return e.monthNav = W("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = W("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = W("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, Ee(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (se(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (se(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], Ke(), e.monthNav;
  }
  function Me() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = lt(e.config);
    e.timeContainer = W("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = W("span", "flatpickr-time-separator", ":"), r = Ge("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var c = Ge("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = c.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = de(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = de(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(c), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var m = Ge("flatpickr-second");
      e.secondElement = m.getElementsByTagName("input")[0], e.secondElement.value = de(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(W("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(m);
    }
    return e.config.time_24hr || (e.amPM = W("span", "flatpickr-am-pm", e.l10n.amPM[ge((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function Ne() {
    e.weekdayContainer ? qe(e.weekdayContainer) : e.weekdayContainer = W("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = W("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return S(), e.weekdayContainer;
  }
  function S() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = xt(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = xt(o.splice(n, o.length), o.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + o.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function G() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = W("div", "flatpickr-weekwrapper");
    n.appendChild(W("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = W("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function ae(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, Q("onYearChange"), q()), I(), Q("onMonthChange"), Ke());
  }
  function te(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = lt(e.config), c = r.hours, m = r.minutes, b = r.seconds;
      x(c, m, b);
    }
    e.redraw(), n && Q("onChange");
  }
  function Ye() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), Q("onClose");
  }
  function $t() {
    e.config !== void 0 && Q("onDestroy");
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
  function Ae(n) {
    return e.calendarContainer.contains(n);
  }
  function Qe(n) {
    if (e.isOpen && !e.config.inline) {
      var o = fe(n), r = Ae(o), c = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), m = !c && !r && !Ae(n.relatedTarget), b = !e.config.ignoredFocusElements.some(function(H) {
        return H.contains(o);
      });
      m && b && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && h(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function Pe(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), Q("onYearChange"), q());
    }
  }
  function De(n, o) {
    var r;
    o === void 0 && (o = !0);
    var c = e.parseDate(n, void 0, o);
    if (e.config.minDate && c && he(c, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && c && he(c, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (c === void 0)
      return !1;
    for (var m = !!e.config.enable, b = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, H = 0, M = void 0; H < b.length; H++) {
      if (M = b[H], typeof M == "function" && M(c))
        return m;
      if (M instanceof Date && c !== void 0 && M.getTime() === c.getTime())
        return m;
      if (typeof M == "string") {
        var F = e.parseDate(M, void 0, !0);
        return F && F.getTime() === c.getTime() ? m : !m;
      } else if (typeof M == "object" && c !== void 0 && M.from && M.to && c.getTime() >= M.from.getTime() && c.getTime() <= M.to.getTime())
        return m;
    }
    return !m;
  }
  function ze(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function jt(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== nt();
    o && r && !(n.relatedTarget && Ae(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function ft(n) {
    var o = fe(n), r = e.config.wrap ? t.contains(o) : o === e._input, c = e.config.allowInput, m = e.isOpen && (!c || !r), b = e.config.inline && r && !c;
    if (n.keyCode === 13 && r) {
      if (c)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (Ae(o) || m || b) {
      var H = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          H ? (n.preventDefault(), h(), Xe()) : mt(n);
          break;
        case 27:
          n.preventDefault(), Xe();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!H && !r) {
            n.preventDefault();
            var M = d();
            if (e.daysContainer !== void 0 && (c === !1 || M && ze(M))) {
              var F = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), ae(F), C(V(1), 0)) : C(void 0, F);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var y = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), Pe(e.currentYear - y), C(V(1), 0)) : H || C(void 0, y * 7) : o === e.currentYearElement ? Pe(e.currentYear - y) : e.config.enableTime && (!H && e.hourElement && e.hourElement.focus(), h(n), e._debouncedChange());
          break;
        case 9:
          if (H) {
            var $ = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(ue) {
              return ue;
            }), U = $.indexOf(o);
            if (U !== -1) {
              var me = $[U + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (me || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(o) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && o === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], w(), xe();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], w(), xe();
          break;
      }
    (r || Ae(o)) && Q("onKeyDown", n);
  }
  function Ve(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), c = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), m = Math.min(r, e.selectedDates[0].getTime()), b = Math.max(r, e.selectedDates[0].getTime()), H = !1, M = 0, F = 0, y = m; y < b; y += Vo.DAY)
        De(new Date(y), !0) || (H = H || y > m && y < b, y < c && (!M || y > M) ? M = y : y > c && (!F || y < F) && (F = y));
      var $ = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      $.forEach(function(U) {
        var me = U.dateObj, ue = me.getTime(), Be = M > 0 && ue < M || F > 0 && ue > F;
        if (Be) {
          U.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(Se) {
            U.classList.remove(Se);
          });
          return;
        } else if (H && !Be)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(Se) {
          U.classList.remove(Se);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), c < r && ue === c ? U.classList.add("startRange") : c > r && ue === c && U.classList.add("endRange"), ue >= M && (F === 0 || ue <= F) && Po(ue, c, r) && U.classList.add("inRange"));
      });
    }
  }
  function Tt() {
    e.isOpen && !e.config.static && !e.config.inline && Re();
  }
  function Ht(n, o) {
    if (o === void 0 && (o = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = fe(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), Q("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var c = e.isOpen;
    e.isOpen = !0, c || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), Q("onOpen"), Re(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function ht(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), c = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(m) {
        return De(m);
      }), !e.selectedDates.length && n === "min" && E(r), xe()), e.daysContainer && (vt(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!c && r !== void 0 && c.getFullYear() === r.getFullYear());
    };
  }
  function At() {
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
    ], o = re(re({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function($) {
        e.config._enable = bt($);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function($) {
        e.config._disable = bt($);
      }
    });
    var c = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || c)) {
      var m = ne.defaultConfig.dateFormat || $e.dateFormat;
      r.dateFormat = o.noCalendar || c ? "H:i" + (o.enableSeconds ? ":S" : "") : m + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || c) && !o.altFormat) {
      var b = ne.defaultConfig.altFormat || $e.altFormat;
      r.altFormat = o.noCalendar || c ? "h:i" + (o.enableSeconds ? ":S K" : " K") : b + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: ht("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: ht("max")
    });
    var H = function($) {
      return function(U) {
        e.config[$ === "min" ? "_minTime" : "_maxTime"] = e.parseDate(U, "H:i:S");
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
    for (var M = 0; M < n.length; M++)
      e.config[n[M]] = e.config[n[M]] === !0 || e.config[n[M]] === "true";
    at.filter(function($) {
      return e.config[$] !== void 0;
    }).forEach(function($) {
      e.config[$] = rt(e.config[$] || []).map(f);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var M = 0; M < e.config.plugins.length; M++) {
      var F = e.config.plugins[M](e) || {};
      for (var y in F)
        at.indexOf(y) > -1 ? e.config[y] = rt(F[y]).map(f).concat(e.config[y]) : typeof o[y] > "u" && (e.config[y] = F[y]);
    }
    o.altInputClass || (e.config.altInputClass = pt().className + " " + e.config.altInputClass), Q("onParseConfig");
  }
  function pt() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function gt() {
    typeof e.config.locale != "object" && typeof ne.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = re(re({}, ne.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? ne.l10ns[e.config.locale] : void 0), _e.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", _e.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", _e.M = "(" + e.l10n.months.shorthand.join("|") + ")", _e.F = "(" + e.l10n.months.longhand.join("|") + ")", _e.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = re(re({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && ne.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Et(e), e.parseDate = dt({ config: e.config, l10n: e.l10n });
  }
  function Re(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      Q("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(Qt, Xt) {
        return Qt + Xt.offsetHeight;
      }, 0), c = e.calendarContainer.offsetWidth, m = e.config.position.split(" "), b = m[0], H = m.length > 1 ? m[1] : null, M = o.getBoundingClientRect(), F = window.innerHeight - M.bottom, y = b === "above" || b !== "below" && F < r && M.top > r, $ = window.pageYOffset + M.top + (y ? -r - 2 : o.offsetHeight + 2);
      if (se(e.calendarContainer, "arrowTop", !y), se(e.calendarContainer, "arrowBottom", y), !e.config.inline) {
        var U = window.pageXOffset + M.left, me = !1, ue = !1;
        H === "center" ? (U -= (c - M.width) / 2, me = !0) : H === "right" && (U -= c - M.width, ue = !0), se(e.calendarContainer, "arrowLeft", !me && !ue), se(e.calendarContainer, "arrowCenter", me), se(e.calendarContainer, "arrowRight", ue);
        var Be = window.document.body.offsetWidth - (window.pageXOffset + M.right), Se = U + c > window.document.body.offsetWidth, Wt = Be + c > window.document.body.offsetWidth;
        if (se(e.calendarContainer, "rightMost", Se), !e.config.static)
          if (e.calendarContainer.style.top = $ + "px", !Se)
            e.calendarContainer.style.left = U + "px", e.calendarContainer.style.right = "auto";
          else if (!Wt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = Be + "px";
          else {
            var ot = Bt();
            if (ot === void 0)
              return;
            var Kt = window.document.body.offsetWidth, qt = Math.max(0, Kt / 2 - c / 2), Gt = ".flatpickr-calendar.centerMost:before", Ut = ".flatpickr-calendar.centerMost:after", Jt = ot.cssRules.length, Zt = "{left:" + M.left + "px;right:auto;}";
            se(e.calendarContainer, "rightMost", !1), se(e.calendarContainer, "centerMost", !0), ot.insertRule(Gt + "," + Ut + Zt, Jt), e.calendarContainer.style.left = qt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function Bt() {
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
    return n ?? Ot();
  }
  function Ot() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function vt() {
    e.config.noCalendar || e.isMobile || (q(), Ke(), I());
  }
  function Xe() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function mt(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function($) {
      return $.classList && $.classList.contains("flatpickr-day") && !$.classList.contains("flatpickr-disabled") && !$.classList.contains("notAllowed");
    }, r = _t(fe(n), o);
    if (r !== void 0) {
      var c = r, m = e.latestSelectedDateObj = new Date(c.dateObj.getTime()), b = (m.getMonth() < e.currentMonth || m.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = c, e.config.mode === "single")
        e.selectedDates = [m];
      else if (e.config.mode === "multiple") {
        var H = tt(m);
        H ? e.selectedDates.splice(parseInt(H), 1) : e.selectedDates.push(m);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = m, e.selectedDates.push(m), he(m, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function($, U) {
        return $.getTime() - U.getTime();
      }));
      if (w(), b) {
        var M = e.currentYear !== m.getFullYear();
        e.currentYear = m.getFullYear(), e.currentMonth = m.getMonth(), M && (Q("onYearChange"), q()), Q("onMonthChange");
      }
      if (Ke(), I(), xe(), !b && e.config.mode !== "range" && e.config.showMonths === 1 ? P(c) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var F = e.config.mode === "single" && !e.config.enableTime, y = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (F || y) && Xe();
      }
      T();
    }
  }
  var We = {
    locale: [gt, S],
    showMonths: [Ee, s, Ne],
    minDate: [J],
    maxDate: [J],
    positionElement: [kt],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (D(e._input, "focus", e.open), D(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function Lt(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        We[r] !== void 0 && We[r].forEach(function(c) {
          return c();
        });
    } else
      e.config[n] = o, We[n] !== void 0 ? We[n].forEach(function(c) {
        return c();
      }) : at.indexOf(n) > -1 && (e.config[n] = rt(o));
    e.redraw(), xe(!0);
  }
  function wt(n, o) {
    var r = [];
    if (n instanceof Array)
      r = n.map(function(c) {
        return e.parseDate(c, o);
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
          r = n.split(e.config.conjunction).map(function(c) {
            return e.parseDate(c, o);
          });
          break;
        case "range":
          r = n.split(e.l10n.rangeSeparator).map(function(c) {
            return e.parseDate(c, o);
          });
          break;
      }
    else
      e.config.errorHandler(new Error("Invalid date supplied: " + JSON.stringify(n)));
    e.selectedDates = e.config.allowInvalidPreload ? r : r.filter(function(c) {
      return c instanceof Date && De(c, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(c, m) {
      return c.getTime() - m.getTime();
    });
  }
  function Ft(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    wt(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), J(void 0, o), E(), e.selectedDates.length === 0 && e.clear(!1), xe(o), o && Q("onChange");
  }
  function bt(n) {
    return n.slice().map(function(o) {
      return typeof o == "string" || typeof o == "number" || o instanceof Date ? e.parseDate(o, void 0, !0) : o && typeof o == "object" && o.from && o.to ? {
        from: e.parseDate(o.from, void 0),
        to: e.parseDate(o.to, void 0)
      } : o;
    }).filter(function(o) {
      return o;
    });
  }
  function It() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && wt(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function Nt() {
    if (e.input = pt(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = W(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), kt();
  }
  function kt() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function Yt() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = W("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    D(e.mobileInput, "change", function(o) {
      e.setDate(fe(o).value, !1, e.mobileFormatStr), Q("onChange"), Q("onClose");
    });
  }
  function Pt(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function Q(n, o) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var c = 0; r[c] && c < r.length; c++)
          r[c](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(et("change")), e.input.dispatchEvent(et("input")));
    }
  }
  function et(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function tt(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var r = e.selectedDates[o];
      if (r instanceof Date && he(r, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function zt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : he(n, e.selectedDates[0]) >= 0 && he(n, e.selectedDates[1]) <= 0;
  }
  function Ke() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = Ze(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function nt(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, o);
    }).filter(function(r, c, m) {
      return e.config.mode !== "range" || e.config.enableTime || m.indexOf(r) === c;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function xe(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = nt(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = nt(e.config.altFormat)), n !== !1 && Q("onValueUpdate");
  }
  function Vt(n) {
    var o = fe(n), r = e.prevMonthNav.contains(o), c = e.nextMonthNav.contains(o);
    r || c ? ae(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function Rt(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = fe(n), c = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[ge(e.amPM.textContent === e.l10n.amPM[0])]);
    var m = parseFloat(c.getAttribute("min")), b = parseFloat(c.getAttribute("max")), H = parseFloat(c.getAttribute("step")), M = parseInt(c.value, 10), F = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), y = M + H * F;
    if (typeof c.value < "u" && c.value.length === 2) {
      var $ = c === e.hourElement, U = c === e.minuteElement;
      y < m ? (y = b + y + ge(!$) + (ge($) && ge(!e.amPM)), U && z(void 0, -1, e.hourElement)) : y > b && (y = c === e.hourElement ? y - b - ge(!e.amPM) : m, U && z(void 0, 1, e.hourElement)), e.amPM && $ && (H === 1 ? y + M === 23 : Math.abs(y - M) > H) && (e.amPM.textContent = e.l10n.amPM[ge(e.amPM.textContent === e.l10n.amPM[0])]), c.value = de(y);
    }
  }
  return l(), e;
}
function je(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(f) {
    return f instanceof HTMLElement;
  }), u = [], l = 0; l < e.length; l++) {
    var d = e[l];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Wo(d, a || {}), u.push(d._flatpickr);
    } catch (f) {
      console.error(f);
    }
  }
  return u.length === 1 ? u[0] : u;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return je(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return je([this], t);
});
var ne = function(t, a) {
  return typeof t == "string" ? je(window.document.querySelectorAll(t), a) : t instanceof Node ? je([t], a) : je(t, a);
};
ne.defaultConfig = {};
ne.l10ns = {
  en: re({}, Ie),
  default: re({}, Ie)
};
ne.localize = function(t) {
  ne.l10ns.default = re(re({}, ne.l10ns.default), t);
};
ne.setDefaults = function(t) {
  ne.defaultConfig = re(re({}, ne.defaultConfig), t);
};
ne.parseDate = dt({});
ne.formatDate = Et({});
ne.compareDates = he;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return je(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = ne);
var Ko = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var St = { exports: {} };
(function(t, a) {
  (function(e, u) {
    t.exports = u();
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
      return e = Object.assign || function(k) {
        for (var i, w = 1, E = arguments.length; w < E; w++) {
          i = arguments[w];
          for (var x in i) Object.prototype.hasOwnProperty.call(i, x) && (k[x] = i[x]);
        }
        return k;
      }, e.apply(this, arguments);
    }, u = function(h, k, i) {
      return i.months[k ? "shorthand" : "longhand"][h];
    };
    function l(h) {
      for (; h.firstChild; )
        h.removeChild(h.firstChild);
    }
    function d(h) {
      try {
        if (typeof h.composedPath == "function") {
          var k = h.composedPath();
          return k[0];
        }
        return h.target;
      } catch {
        return h.target;
      }
    }
    var f = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function s(h) {
      var k = e(e({}, f), h);
      return function(i) {
        i.config.dateFormat = k.dateFormat, i.config.altFormat = k.altFormat;
        var w = { monthsContainer: null };
        function E() {
          if (i.rContainer) {
            l(i.rContainer);
            for (var C = 0; C < i.monthElements.length; C++) {
              var A = i.monthElements[C];
              A.parentNode && A.parentNode.removeChild(A);
            }
          }
        }
        function x() {
          i.rContainer && (w.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, _(), i.rContainer.appendChild(w.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + k.theme));
        }
        function _() {
          if (w.monthsContainer) {
            l(w.monthsContainer);
            for (var C = document.createDocumentFragment(), A = 0; A < 12; A++) {
              var I = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, A), 0, A);
              I.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && I.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && I.classList.add("today"), I.textContent = u(A, k.shorthand, i.l10n), I.addEventListener("click", J), C.appendChild(I);
            }
            w.monthsContainer.appendChild(C), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function D() {
          i._bind(i.prevMonthNav, "click", function(C) {
            C.preventDefault(), C.stopPropagation(), i.changeYear(i.currentYear - 1), X(), _();
          }), i._bind(i.nextMonthNav, "click", function(C) {
            C.preventDefault(), C.stopPropagation(), i.changeYear(i.currentYear + 1), X(), _();
          }), i._bind(w.monthsContainer, "mouseover", function(C) {
            i.config.mode === "range" && i.onMouseOver(d(C), "flatpickr-monthSelect-month");
          });
        }
        function T() {
          if (i.rContainer && i.selectedDates.length) {
            for (var C = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), A = 0; A < C.length; A++)
              C[A].classList.remove("selected");
            var I = i.selectedDates[0].getMonth(), q = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (I + 1) + ")");
            q && q.classList.add("selected");
          }
        }
        function X() {
          var C = i.selectedDates[0];
          if (C && (C = new Date(C), C.setFullYear(i.currentYear), i.config.minDate && C < i.config.minDate && (C = i.config.minDate), i.config.maxDate && C > i.config.maxDate && (C = i.config.maxDate), i.currentYear = C.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var A = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            A.forEach(function(I) {
              I.dateObj.setFullYear(i.currentYear), i.config.minDate && I.dateObj < i.config.minDate || i.config.maxDate && I.dateObj > i.config.maxDate ? I.classList.add("flatpickr-disabled") : I.classList.remove("flatpickr-disabled");
            });
          }
          T();
        }
        function J(C) {
          C.preventDefault(), C.stopPropagation();
          var A = d(C);
          if (A instanceof Element && !A.classList.contains("flatpickr-disabled") && !A.classList.contains("notAllowed") && (K(A.dateObj), i.config.closeOnSelect)) {
            var I = i.config.mode === "single", q = i.config.mode === "range" && i.selectedDates.length === 2;
            (I || q) && i.close();
          }
        }
        function K(C) {
          var A = new Date(i.currentYear, C.getMonth(), C.getDate()), I = [];
          switch (i.config.mode) {
            case "single":
              I = [A];
              break;
            case "multiple":
              I.push(A);
              break;
            case "range":
              i.selectedDates.length === 2 ? I = [A] : (I = i.selectedDates.concat([A]), I.sort(function(q, ke) {
                return q.getTime() - ke.getTime();
              }));
              break;
          }
          i.setDate(I, !0), T();
        }
        var z = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ie(C, A, I, q) {
          var ke = z[q.keyCode] !== void 0;
          if (!(!ke && q.keyCode !== 13) && !(!i.rContainer || !w.monthsContainer)) {
            var Ee = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), ye = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (ye === -1) {
              var Me = Ee || w.monthsContainer.firstElementChild;
              Me.focus(), ye = Me.$i;
            }
            ke ? w.monthsContainer.children[(12 + ye + z[q.keyCode]) % 12].focus() : q.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && K(document.activeElement.dateObj);
          }
        }
        function O() {
          var C;
          ((C = i.config) === null || C === void 0 ? void 0 : C.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || _();
        }
        function P() {
          k._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(k._stubbedCurrentMonth), i.currentMonth = k._stubbedCurrentMonth;
        }
        function V() {
          k._stubbedCurrentMonth && (i._initialDate.setMonth(k._stubbedCurrentMonth), i.currentMonth = k._stubbedCurrentMonth, delete k._stubbedCurrentMonth);
        }
        function R() {
          if (w.monthsContainer !== null)
            for (var C = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), A = 0; A < C.length; A++)
              C[A].removeEventListener("click", J);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: T,
          onKeyDown: ie,
          onReady: [
            P,
            E,
            x,
            D,
            T,
            function() {
              i.config.onClose.push(O), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            V,
            R,
            function() {
              i.config.onClose = i.config.onClose.filter(function(C) {
                return C !== O;
              });
            }
          ]
        };
      };
    }
    return s;
  });
})(St);
var Go = St.exports;
const Uo = /* @__PURE__ */ qo(Go), Jo = { class: "relative" }, Zo = ["placeholder", "disabled", "readonly"], Qo = {
  key: 0,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, Xo = { class: "flex items-center justify-between mb-2" }, ea = { class: "text-xs opacity-70" }, ta = { class: "grid grid-cols-4 gap-2" }, na = ["onClick"], Ra = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = oe(null), d = oe(!1), f = oe((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let s = null;
    const h = B(() => e.picker === "month" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), k = () => {
      var _, D;
      if (l.value) {
        if (e.picker === "year-grid") {
          (_ = s == null ? void 0 : s.destroy) == null || _.call(s), s = null;
          return;
        }
        (D = s == null ? void 0 : s.destroy) == null || D.call(s), s = ne(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Uo({
              shorthand: !0,
              dateFormat: h.value,
              altFormat: "F Y"
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: h.value,
          time_24hr: e.time24hr,
          clickOpens: !0,
          allowInput: !1,
          appendTo: document.body,
          minDate: e.minDate || void 0,
          maxDate: e.maxDate || void 0,
          defaultDate: e.modelValue,
          onReady: () => {
            var T;
            e.picker === "year" && ((T = s == null ? void 0 : s.calendarContainer) == null || T.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var T;
            e.picker === "year" && ((T = s == null ? void 0 : s.calendarContainer) == null || T.classList.add("flatpickr-year-only"));
          },
          onChange: (T) => {
            if (e.mode === "range") {
              const X = T.map(
                (J) => s.formatDate(J, h.value)
              );
              u("update:modelValue", X);
            } else {
              const X = T[0] ? s.formatDate(T[0], h.value) : "";
              u("update:modelValue", X);
            }
          }
        });
      }
    }, i = () => {
      var _;
      if (e.picker === "year-grid") {
        d.value = !0;
        return;
      }
      (_ = s == null ? void 0 : s.open) == null || _.call(s);
    };
    Ue(k), Je(() => {
      var _;
      return (_ = s == null ? void 0 : s.destroy) == null ? void 0 : _.call(s);
    }), le(
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
      k
    ), le(
      () => e.modelValue,
      (_) => {
        !s || e.picker === "year-grid" || s.setDate(_, !1);
      }
    );
    const w = B(
      () => Array.from({ length: 12 }, (_, D) => f.value + D)
    ), E = (_) => {
      u("update:modelValue", _.toString()), d.value = !1;
    }, x = (_) => {
      if (!d.value) return;
      const D = _.target;
      if (l.value && D && l.value.contains(D)) return;
      const T = document.querySelector(".mitreka-year-grid");
      T && D && T.contains(D) || (d.value = !1);
    };
    return Ue(() => document.addEventListener("click", x)), Je(() => document.removeEventListener("click", x)), (_, D) => (g(), v("div", Jo, [
      p("input", {
        ref_key: "inputEl",
        ref: l,
        class: L(["input w-full", t.inputClass]),
        placeholder: t.placeholder,
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: i,
        onFocus: i
      }, null, 42, Zo),
      t.picker === "year-grid" && d.value ? (g(), v("div", Qo, [
        p("div", Xo, [
          p("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: D[0] || (D[0] = (T) => f.value -= 12)
          }, " Prev "),
          p("div", ea, Y(f.value) + " - " + Y(f.value + 11), 1),
          p("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: D[1] || (D[1] = (T) => f.value += 12)
          }, " Next ")
        ]),
        p("div", ta, [
          (g(!0), v(pe, null, be(w.value, (T) => (g(), v("button", {
            key: T,
            class: L(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === T.toString() }]),
            type: "button",
            onClick: (X) => E(T)
          }, Y(T), 11, na))), 128))
        ])
      ])) : N("", !0)
    ]));
  }
}), Wa = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = rn(), d = oe(null), f = oe(null), s = oe(13), h = oe(!1);
    let k = null, i = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], E = [], x = oe("normal"), _ = B(() => [
      "w-full",
      x.value === "autoHeight" ? "h-auto" : "h-full"
    ]), D = B(() => x.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), T = () => {
      const S = document.documentElement, G = S.classList.contains("dark"), ae = (S.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      h.value = G || ae;
    }, X = B(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : h.value), J = B(() => X.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), K = B(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), z = B(() => ["agx", J.value, K.value, l.class]), ie = B(() => [{ "--ag-odd-row-background-color": e.striped ? X.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), O = B(() => {
      const { class: S, style: G, onGridReady: ae, ...te } = l;
      return te;
    }), P = (S) => typeof S == "number" && Number.isFinite(S) ? S : void 0, V = B(() => {
      const S = l.gridOptions;
      if (S && typeof S == "object") return S;
      const G = l["grid-options"];
      return G && typeof G == "object" ? G : {};
    }), R = (S) => {
      const G = P(l[S]);
      if (typeof G == "number") return G;
      const te = P(l[S === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof te == "number" ? te : P(V.value[S]);
    }, C = () => {
      const S = l.domLayout;
      if (typeof S == "string" && S.length > 0) return S;
      const G = l["dom-layout"];
      if (typeof G == "string" && G.length > 0) return G;
      const ae = V.value.domLayout;
      return typeof ae == "string" && ae.length > 0 ? ae : void 0;
    }, A = () => {
      var G, ae;
      if (!f.value) return 0;
      const S = (te) => typeof te == "number" && Number.isFinite(te) && te >= 0;
      if (typeof f.value.getDisplayedRowCount == "function") {
        const te = f.value.getDisplayedRowCount();
        if (S(te)) return te;
      }
      if (typeof f.value.paginationGetRowCount == "function") {
        const te = f.value.paginationGetRowCount();
        if (S(te)) return te;
      }
      if (typeof f.value.getModel == "function") {
        const te = (ae = (G = f.value).getModel) == null ? void 0 : ae.call(G), Ye = te && typeof te.getRowCount == "function" ? te.getRowCount() : void 0;
        if (S(Ye)) return Ye;
      }
      return 0;
    }, I = () => {
      const S = Number(e.autoHeightThreshold);
      return Number.isFinite(S) ? Math.max(1, Math.floor(S)) : 15;
    }, q = () => {
      if (!f.value) return;
      const S = C();
      if (S) {
        x.value = S, f.value.setGridOption("domLayout", S);
        return;
      }
      const G = e.autoHeightWhenFewRows && A() < I() ? "autoHeight" : "normal";
      x.value = G, f.value.setGridOption("domLayout", G);
    }, ke = () => {
      var S;
      for (; E.length > 0; )
        (S = E.pop()) == null || S();
    }, Ee = () => {
      if (!f.value) return;
      ke();
      const S = () => q();
      w.forEach((G) => {
        f.value.addEventListener(G, S), E.push(() => {
          var ae;
          (ae = f.value) == null || ae.removeEventListener(G, S);
        });
      });
    }, ye = () => {
      if (!e.autoHeaderHeight || !f.value) return;
      const S = R("headerHeight") ?? fn(e.density), G = R("groupHeaderHeight") ?? hn(e.density);
      f.value.setGridOption("headerHeight", S), f.value.setGridOption("groupHeaderHeight", G);
    }, Me = () => {
      if (!e.autoRowHeight || !f.value) return;
      const S = pn(s.value, e.density);
      f.value.setGridOption("rowHeight", S), f.value.setGridOption("getRowHeight", () => S), f.value.resetRowHeights();
    }, Ne = (S) => {
      f.value = S.api, s.value = gn(d.value), Ee(), ye(), q(), Me(), requestAnimationFrame(() => q()), u("grid-ready", S);
    };
    return le(
      () => e.density,
      () => {
        var S;
        ye(), Me(), (S = f.value) == null || S.refreshCells({ force: !0 });
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
        ye();
      }
    ), le(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        q();
      }
    ), le(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        q();
      }
    ), le(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => q());
      }
    ), Ue(() => {
      T(), e.autoObserveTheme && (k = new MutationObserver(T), k.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (i = un(d.value));
    }), Je(() => {
      k == null || k.disconnect(), ke(), i == null || i();
    }), (S, G) => (g(), v("div", {
      ref_key: "hostRef",
      ref: d,
      class: L(_.value),
      style: ve(D.value)
    }, [
      ce(j(wn), sn(O.value, {
        class: z.value,
        theme: "legacy",
        style: ie.value,
        onGridReady: Ne
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), oa = ["disabled"], aa = {
  class: "max-h-60 overflow-auto",
  role: "listbox"
}, ra = ["onMouseenter", "onClick", "aria-selected"], Ka = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = oe(null), d = oe(!1), f = oe(-1), s = B(
      () => e.options.find((O) => O.value === e.modelValue) ?? null
    ), h = B(() => {
      var O;
      return ((O = s.value) == null ? void 0 : O.label) ?? e.placeholder;
    }), k = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, i = {
      default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
      primary: "bg-primary border-primary text-primary-content hover:brightness-95",
      secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
      accent: "bg-accent border-accent text-accent-content hover:brightness-95",
      info: "bg-info border-info text-info-content hover:brightness-95",
      success: "bg-success border-success text-success-content hover:brightness-95",
      warning: "bg-warning border-warning text-warning-content hover:brightness-95",
      error: "bg-error border-error text-error-content hover:brightness-95"
    }, w = {
      default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
      primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
      secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
      accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
      info: "bg-transparent border-info text-info hover:bg-info/10",
      success: "bg-transparent border-success text-success hover:bg-success/10",
      warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
      error: "bg-transparent border-error text-error hover:bg-error/10"
    }, E = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, x = B(() => {
      const O = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", P = k[e.size], V = e.variant === "outline" ? w[e.color] : i[e.color], R = e.disabled ? "opacity-60 cursor-not-allowed" : "", C = d.value ? `ring-3 ${E[e.color]}` : "";
      return [O, P, V, R, C].join(" ");
    }), _ = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, D = B(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), T = (O) => {
      const P = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: P,
        backgroundColor: O ? "var(--color-base-200)" : "transparent"
      } : {
        color: P,
        backgroundColor: O ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, X = B(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), J = () => {
      e.disabled || (d.value = !d.value, d.value && (f.value = e.options.findIndex((O) => O.value === e.modelValue)));
    }, K = (O) => {
      O.disabled || (u("update:modelValue", O.value), u("change", O.value), d.value = !1);
    }, z = (O) => {
      if (!e.disabled)
        switch (O.key) {
          case "Enter":
          case " ":
            if (O.preventDefault(), d.value && f.value >= 0) {
              const P = e.options[f.value];
              P && !P.disabled && K(P);
            } else
              J();
            break;
          case "Escape":
            d.value = !1;
            break;
          case "ArrowDown":
            O.preventDefault(), d.value ? f.value = Math.min(f.value + 1, e.options.length - 1) : (d.value = !0, f.value = 0);
            break;
          case "ArrowUp":
            O.preventDefault(), d.value && (f.value = Math.max(f.value - 1, 0));
            break;
        }
    }, ie = (O) => {
      l.value && !l.value.contains(O.target) && (d.value = !1);
    };
    return Ue(() => {
      document.addEventListener("click", ie);
    }), Je(() => {
      document.removeEventListener("click", ie);
    }), (O, P) => (g(), v("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      p("button", {
        type: "button",
        class: L(x.value),
        disabled: t.disabled,
        onClick: J,
        onKeydown: z
      }, [
        p("span", {
          class: L([s.value ? "" : "opacity-60"])
        }, Y(h.value), 3),
        ce(Ce, {
          name: d.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, oa),
      ce(Le, {
        "enter-active-class": "transition duration-150 ease-out",
        "enter-from-class": "opacity-0 -translate-y-1 scale-[0.98]",
        "enter-to-class": "opacity-100 translate-y-0 scale-100",
        "leave-active-class": "transition duration-100 ease-in",
        "leave-from-class": "opacity-100 translate-y-0 scale-100",
        "leave-to-class": "opacity-0 -translate-y-1 scale-[0.98]"
      }, {
        default: Fe(() => [
          d.value ? (g(), v("div", {
            key: 0,
            class: "absolute z-50 mt-1 w-full rounded-box border border-base-300 shadow-lg p-1",
            style: ve(D.value)
          }, [
            p("ul", aa, [
              (g(!0), v(pe, null, be(t.options, (V, R) => {
                var C, A, I;
                return g(), v("li", {
                  key: V.value,
                  class: L([
                    _[t.size],
                    "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                    V.disabled ? "opacity-50 cursor-not-allowed" : "",
                    ((C = s.value) == null ? void 0 : C.value) === V.value ? "font-medium" : ""
                  ]),
                  style: ve(T(R === f.value)),
                  onMouseenter: (q) => f.value = R,
                  onClick: (q) => V.disabled ? null : K(V),
                  role: "option",
                  "aria-selected": ((A = s.value) == null ? void 0 : A.value) === V.value
                }, [
                  p("span", null, Y(V.label), 1),
                  ((I = s.value) == null ? void 0 : I.value) === V.value ? (g(), He(Ce, {
                    key: 0,
                    name: "check",
                    class: "w-4 h-4",
                    style: ve(X.value)
                  }, null, 8, ["style"])) : N("", !0)
                ], 46, ra);
              }), 128))
            ])
          ], 4)) : N("", !0)
        ]),
        _: 1
      })
    ], 512));
  }
}), ia = { class: "relative" }, sa = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, la = ["disabled", "placeholder", "value", "readonly"], da = ["disabled"], ca = {
  key: 0,
  class: "absolute z-20 mt-1 w-full card p-1"
}, ua = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, fa = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], ha = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, qa = /* @__PURE__ */ Z({
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
    const e = t, u = a, l = oe(e.modelValue ?? null);
    le(
      () => e.modelValue,
      (P) => l.value = P ?? null
    ), le(l, (P) => u("update:modelValue", P));
    const {
      root: d,
      inputEl: f,
      menu: s,
      open: h,
      query: k,
      hoverIdx: i,
      loading: w,
      filtered: E,
      selected: x,
      openMenu: _,
      closeMenu: D,
      choose: T,
      clear: X,
      onKey: J
    } = vn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), K = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, z = (P) => !P || P === "default" ? "input" : `input input-${P}`, ie = B(
      () => {
        var P;
        return h.value ? k.value : ((P = x.value) == null ? void 0 : P.label) ?? "";
      }
    );
    function O() {
      if (!e.disabled) {
        if (h.value) {
          D();
          return;
        }
        _();
      }
    }
    return (P, V) => (g(), v("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      p("div", ia, [
        p("span", sa, [
          ce(Ce, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        p("input", {
          ref_key: "inputEl",
          ref: f,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: ie.value,
          onFocus: V[0] || (V[0] = //@ts-ignore
          (...R) => j(_) && j(_)(...R)),
          onClick: V[1] || (V[1] = //@ts-ignore
          (...R) => j(_) && j(_)(...R)),
          onKeydown: V[2] || (V[2] = //@ts-ignore
          (...R) => j(J) && j(J)(...R)),
          readonly: !j(h),
          class: L([
            K[t.size || "md"],
            z(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: V[3] || (V[3] = (R) => j(h) ? k.value = R.target.value : null)
        }, null, 42, la),
        t.clearable && j(x) && !t.disabled ? (g(), v("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onClick: V[4] || (V[4] = //@ts-ignore
          (...R) => j(X) && j(X)(...R))
        }, [
          ce(Ce, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : N("", !0),
        p("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onClick: O,
          disabled: t.disabled
        }, [
          ce(Ce, {
            name: j(h) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 8, da)
      ]),
      j(h) ? (g(), v("div", ca, [
        j(w) ? (g(), v("div", ua, "Loading…")) : (g(), v("ul", {
          key: 1,
          ref_key: "menu",
          ref: s,
          class: "max-h-60 overflow-auto",
          role: "listbox"
        }, [
          (g(!0), v(pe, null, be(j(E), (R, C) => {
            var A, I;
            return g(), v("li", {
              key: R.value,
              "data-idx": C,
              class: L([
                "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                C === j(i) ? "bg-base-200" : "",
                R.disabled ? "opacity-50 cursor-not-allowed" : ""
              ]),
              onMouseenter: (q) => i.value = C,
              onMousedown: we((q) => R.disabled ? null : j(T)(R), ["prevent"]),
              role: "option",
              "aria-selected": ((A = j(x)) == null ? void 0 : A.value) === R.value
            }, [
              p("span", null, Y(R.label), 1),
              ((I = j(x)) == null ? void 0 : I.value) === R.value ? (g(), He(Ce, {
                key: 0,
                name: "check",
                class: "w-4 h-4 opacity-80"
              })) : N("", !0)
            ], 42, fa);
          }), 128)),
          !j(E).length && !j(w) ? (g(), v("li", ha, " No results ")) : N("", !0)
        ], 512))
      ])) : N("", !0)
    ], 512));
  }
}), pa = ["onClick"], ga = {
  key: 1,
  class: "opacity-60 text-sm"
}, va = { class: "flex-1 min-w-[8ch]" }, ma = {
  key: 0,
  class: "absolute z-20 mt-1 w-full card p-2"
}, wa = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, ba = ["data-idx", "onMousedown"], ka = ["checked"], ya = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Ga = /* @__PURE__ */ Z({
  __name: "MultiSelect",
  props: {
    modelValue: {},
    options: {},
    fetchOptions: { type: Function },
    debounceMs: {},
    placeholder: {},
    disabled: { type: Boolean },
    size: {}
  },
  emits: ["update:modelValue", "change"],
  setup(t, { emit: a }) {
    const e = t, u = a, l = oe(e.modelValue ?? []);
    le(
      () => e.modelValue,
      (J) => l.value = J ?? []
    ), le(l, (J) => u("update:modelValue", J));
    const {
      root: d,
      inputEl: f,
      menu: s,
      open: h,
      query: k,
      loading: i,
      filtered: w,
      selectedList: E,
      openMenu: x,
      toggle: _,
      clearAll: D,
      onKey: T
    } = mn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), X = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    };
    return (J, K) => (g(), v("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      p("div", {
        class: L(["relative flex items-center gap-2 flex-wrap min-h-[var(--size-field-md)] rounded-field border border-base-300 bg-base-100 px-2", [
          X[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]]),
        onClick: K[5] || (K[5] = //@ts-ignore
        (...z) => j(x) && j(x)(...z))
      }, [
        j(E).length ? (g(!0), v(pe, { key: 0 }, be(j(E), (z) => (g(), v("span", {
          key: z.value,
          class: "badge badge-soft-primary gap-1"
        }, [
          ut(Y(z.label) + " ", 1),
          p("button", {
            type: "button",
            class: "icon-btn icon-btn-xs icon-btn-outline",
            onClick: we((ie) => j(_)(z.value), ["stop"])
          }, [
            ce(Ce, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, pa)
        ]))), 128)) : (g(), v("span", ga, Y(t.placeholder || "Select options…"), 1)),
        p("span", va, [
          Ct(p("input", {
            ref_key: "inputEl",
            ref: f,
            "onUpdate:modelValue": K[0] || (K[0] = (z) => ln(k) ? k.value = z : null),
            class: "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none",
            placeholder: "Search...",
            onKeydown: K[1] || (K[1] = //@ts-ignore
            (...z) => j(T) && j(T)(...z)),
            onFocus: K[2] || (K[2] = (z) => h.value = !0)
          }, null, 544), [
            [Mt, j(k)]
          ])
        ]),
        p("button", {
          type: "button",
          class: "icon-btn icon-btn-xs icon-btn-outline ml-auto",
          onClick: K[3] || (K[3] = we((z) => h.value = !j(h), ["stop"]))
        }, [
          ce(Ce, {
            name: j(h) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ]),
        j(E).length ? (g(), v("button", {
          key: 2,
          type: "button",
          class: "icon-btn icon-btn-xs icon-btn-outline",
          onClick: K[4] || (K[4] = we((z) => j(D)(), ["stop"]))
        }, [
          ce(Ce, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : N("", !0)
      ], 2),
      j(h) ? (g(), v("div", ma, [
        j(i) ? (g(), v("div", wa, "Loading…")) : (g(), v("ul", {
          key: 1,
          ref_key: "menu",
          ref: s,
          class: "max-h-60 overflow-auto"
        }, [
          (g(!0), v(pe, null, be(j(w), (z, ie) => (g(), v("li", {
            key: z.value,
            "data-idx": ie,
            class: "px-2 py-1.5 rounded-field text-sm flex items-center gap-2 cursor-pointer hover:bg-base-200",
            onMousedown: we((O) => j(_)(z.value), ["prevent"])
          }, [
            p("input", {
              type: "checkbox",
              class: "checkbox checkbox-sm checkbox-primary",
              checked: l.value.includes(z.value)
            }, null, 8, ka),
            p("span", null, Y(z.label), 1)
          ], 40, ba))), 128)),
          !j(w).length && !j(i) ? (g(), v("li", ya, " No results ")) : N("", !0)
        ], 512))
      ])) : N("", !0)
    ], 512));
  }
});
export {
  Da as _,
  _a as a,
  Ea as b,
  Sa as c,
  $a as d,
  ja as e,
  Ta as f,
  Pn as g,
  Ha as h,
  Aa as i,
  Ba as j,
  Oa as k,
  La as l,
  Fa as m,
  Ia as n,
  Na as o,
  Ya as p,
  Pa as q,
  za as r,
  Ce as s,
  Ra as t,
  Wa as u,
  Ka as v,
  qa as w,
  Ga as x,
  Dt as y,
  Va as z
};
