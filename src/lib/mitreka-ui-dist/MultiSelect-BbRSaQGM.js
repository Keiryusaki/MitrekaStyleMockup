import { defineComponent as Z, createElementBlock as m, openBlock as g, normalizeClass as j, createCommentVNode as P, renderSlot as ae, createElementVNode as h, ref as te, watch as le, withKeys as Pe, withModifiers as we, createBlock as Ye, Teleport as xt, createVNode as se, Transition as Ge, withCtx as Ue, toDisplayString as z, provide as tn, inject as nn, computed as H, normalizeStyle as be, createTextVNode as Tt, Fragment as ce, renderList as xe, unref as $, useSlots as on, resolveDynamicComponent as an, reactive as rn, withDirectives as bt, vModelText as kt, onMounted as rt, onBeforeUnmount as Je, useAttrs as sn, mergeProps as ln, isRef as Et, nextTick as dn } from "vue";
import { d as cn, c as un, f as fn, h as hn, i as pn, g as gn, r as mn, a as vn, b as wn } from "./useAgGridRowHeight-ByGQBhyS.js";
import { AgGridVue as bn } from "ag-grid-vue3";
const kn = ["disabled"], yn = {
  key: 0,
  class: "animate-spin"
}, Fa = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: l, color: f } = e;
      return f === "default" ? l === "outline" ? "btn-outline" : l === "ghost" ? "btn-ghost" : "" : l === "solid" ? `btn-${f}` : l === "outline" ? `btn-outline btn-outline-${f}` : l === "soft" ? `btn-soft-${f}` : l === "ghost" ? "btn-ghost" : "";
    }, p = (l) => {
      !e.disabled && !e.loading && u("click", l);
    };
    return (l, f) => (g(), m("button", {
      class: j(["btn", s[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: p
    }, [
      t.loading ? (g(), m("span", yn, [...f[0] || (f[0] = [
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
      ])])) : P("", !0),
      ae(l.$slots, "default")
    ], 10, kn));
  }
}), La = /* @__PURE__ */ Z({
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
      const { variant: s, color: d } = a;
      return d === "default" ? s === "outline" ? "badge-outline" : "" : s === "solid" ? `badge-${d}` : s === "outline" ? `badge-outline badge-outline-${d}` : s === "soft" ? `badge-soft-${d}` : "";
    };
    return (s, d) => (g(), m("span", {
      class: j(["badge", e[t.size], u()])
    }, [
      ae(s.$slots, "default")
    ], 2));
  }
}), xn = ["role", "aria-expanded", "tabindex"], Cn = { class: "card-title" }, Mn = { class: "card-body-inner" }, Dn = {
  key: 3,
  class: "mt-4"
}, Oa = /* @__PURE__ */ Z({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const u = t, s = e, d = te(u.modelValue !== void 0 ? u.modelValue : u.defaultOpen);
    le(() => u.modelValue, (l) => {
      l !== void 0 && (d.value = l);
    });
    function p() {
      if (!u.collapsible) return;
      const l = !d.value;
      d.value = l, s("update:modelValue", l), s("toggle", l);
    }
    return a({ isOpen: d, toggle: p }), (l, f) => (g(), m("section", {
      class: j(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      l.$slots.title ? (g(), m("header", {
        key: 0,
        class: j(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: p,
        onKeydown: [
          f[0] || (f[0] = Pe((b) => t.collapsible && p(), ["enter"])),
          f[1] || (f[1] = Pe(we((b) => t.collapsible && p(), ["prevent"]), ["space"]))
        ]
      }, [
        h("div", Cn, [
          ae(l.$slots, "title")
        ]),
        t.collapsible ? (g(), m("svg", {
          key: 0,
          class: j(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...f[2] || (f[2] = [
          h("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : P("", !0)
      ], 42, xn)) : P("", !0),
      t.collapsible ? (g(), m("div", {
        key: 1,
        class: j(["card-body-wrapper", { "is-open": d.value }])
      }, [
        h("div", Mn, [
          ae(l.$slots, "default")
        ])
      ], 2)) : ae(l.$slots, "default", { key: 2 }),
      l.$slots.footer ? (g(), m("footer", Dn, [
        ae(l.$slots, "footer")
      ])) : P("", !0)
    ], 2));
  }
}), Sn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, _n = { class: "text-xl font-semibold" }, za = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = {
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
      (p) => {
        p ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (p, l) => (g(), Ye(xt, { to: "body" }, [
      se(Ge, { name: "fade" }, {
        default: Ue(() => [
          t.open ? (g(), m("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: d
          })) : P("", !0)
        ]),
        _: 1
      }),
      se(Ge, { name: "zoom" }, {
        default: Ue(() => [
          t.open ? (g(), m("div", {
            key: 0,
            class: j([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            h("div", {
              class: j([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                s[t.size]
              ])
            }, [
              t.hideHeader ? P("", !0) : (g(), m("div", Sn, [
                ae(p.$slots, "header", {}, () => [
                  h("h3", _n, z(t.title), 1)
                ]),
                h("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: l[0] || (l[0] = (f) => u("close"))
                }, [...l[3] || (l[3] = [
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
                class: j([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                ae(p.$slots, "default")
              ], 2),
              t.hideFooter ? P("", !0) : (g(), m("div", {
                key: 1,
                class: j([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                ae(p.$slots, "footer", {}, () => [
                  h("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: l[1] || (l[1] = (f) => u("close"))
                  }, z(t.cancelText), 1),
                  h("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: l[2] || (l[2] = (f) => u("confirm"))
                  }, z(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : P("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), En = ["aria-expanded", "aria-disabled", "onKeydown"], $n = { class: "collapse-title" }, jn = { class: "collapse-content" }, Tn = { class: "collapse-content-inner" }, Hn = { class: "collapse-body" }, Na = /* @__PURE__ */ Z({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const u = t, s = e, d = te(u.modelValue !== void 0 ? u.modelValue : u.defaultOpen);
    le(() => u.modelValue, (l) => {
      l !== void 0 && (d.value = l);
    });
    function p() {
      if (u.disabled) return;
      const l = !d.value;
      d.value = l, s("update:modelValue", l), s("toggle", l);
    }
    return a({ isOpen: d, toggle: p }), (l, f) => (g(), m("div", {
      class: j([
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
          Pe(p, ["enter"]),
          Pe(we(p, ["prevent"]), ["space"])
        ]
      }, [
        h("div", $n, [
          ae(l.$slots, "header", {}, () => [
            ae(l.$slots, "title")
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
      ], 40, En),
      h("div", jn, [
        h("div", Tn, [
          h("div", Hn, [
            ae(l.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Pa = /* @__PURE__ */ Z({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const u = t, s = e, d = te(/* @__PURE__ */ new Set());
    le(() => u.modelValue, (f) => {
      f === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(f) ? d.value = new Set(f) : d.value = /* @__PURE__ */ new Set([f]);
    }, { immediate: !0 });
    function p(f) {
      const b = new Set(d.value);
      b.has(f) ? b.delete(f) : (u.multiple || b.clear(), b.add(f)), d.value = b, u.multiple ? s("update:modelValue", Array.from(b)) : s("update:modelValue", b.size > 0 ? Array.from(b)[0] : null);
    }
    function l(f) {
      return d.value.has(f);
    }
    return tn("accordion", {
      toggleItem: p,
      isItemOpen: l
    }), a({ openItems: d, toggleItem: p }), (f, b) => (g(), m("div", {
      class: j(["accordion", `accordion-${t.variant}`])
    }, [
      ae(f.$slots, "default")
    ], 2));
  }
}), An = ["aria-expanded", "aria-disabled", "onKeydown"], Bn = { class: "accordion-title" }, In = { class: "accordion-content" }, Fn = { class: "accordion-content-inner" }, Ln = { class: "accordion-body" }, Ya = /* @__PURE__ */ Z({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = nn("accordion"), u = H(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function s() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (d, p) => (g(), m("div", {
      class: j(["accordion-item", { "is-open": u.value }])
    }, [
      h("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": u.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: s,
        onKeydown: [
          Pe(s, ["enter"]),
          Pe(we(s, ["prevent"]), ["space"])
        ]
      }, [
        h("div", Bn, [
          ae(d.$slots, "header", {}, () => [
            ae(d.$slots, "title")
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
      ], 40, An),
      h("div", In, [
        h("div", Fn, [
          h("div", Ln, [
            ae(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), On = { class: "loading-logo-wrapper" }, zn = { class: "dots-container" }, Nn = ["width", "height"], Pn = {
  key: 0,
  class: "loading-text"
}, Yn = /* @__PURE__ */ Z({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = H(() => Math.round(a.size * (8 / 60)));
    return (u, s) => (g(), m("div", On, [
      h("div", {
        class: "loading-logo-container",
        style: be({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        h("div", zn, [
          h("span", {
            class: "loading-dot dot-1 dot-blue",
            style: be({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-2 dot-blue",
            style: be({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-3 dot-black",
            style: be({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-4 dot-black",
            style: be({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-5 dot-red",
            style: be({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          h("span", {
            class: "loading-dot dot-6 dot-red",
            style: be({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (g(), m("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...s[0] || (s[0] = [
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
      t.text ? (g(), m("p", Pn, [
        Tt(z(t.text), 1),
        s[1] || (s[1] = h("span", { class: "loading-dots" }, [
          h("span", null, "."),
          h("span", null, "."),
          h("span", null, ".")
        ], -1))
      ])) : P("", !0)
    ]));
  }
}), Vn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, Va = /* @__PURE__ */ Z({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (g(), Ye(xt, { to: "body" }, [
      se(Ge, { name: "fade" }, {
        default: Ue(() => [
          t.open ? (g(), m("div", Vn, [
            se(Yn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : P("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Rn = { class: "toast-content" }, Wn = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Kn = ["d"], qn = { class: "toast-body" }, Gn = {
  key: 0,
  class: "toast-title"
}, Un = { class: "toast-message" }, Jn = ["onClick"], Ra = /* @__PURE__ */ Z({
  __name: "Toasts",
  setup(t) {
    const a = cn(), e = H(() => {
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
    }, s = {
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
    }, l = (f, b = "soft") => {
      var w;
      return ((w = {
        soft: s,
        solid: d,
        outline: p
      }[b]) == null ? void 0 : w[f]) || s[f] || "toast-default";
    };
    return (f, b) => (g(), Ye(xt, { to: "body" }, [
      h("div", {
        class: j(["toast-container", e.value])
      }, [
        (g(!0), m(ce, null, xe($(a).toasts.value, (i) => (g(), m("div", {
          key: i.id,
          class: j(["toast-item", l(i.type, i.variant)])
        }, [
          h("div", Rn, [
            (g(), m("svg", Wn, [
              h("path", {
                d: u[i.type],
                fill: "currentColor"
              }, null, 8, Kn)
            ])),
            h("div", qn, [
              i.title ? (g(), m("div", Gn, z(i.title), 1)) : P("", !0),
              h("div", Un, z(i.message), 1)
            ]),
            h("button", {
              class: "toast-close-btn",
              onClick: (w) => $(a).dismiss(i.id)
            }, [...b[0] || (b[0] = [
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
            ])], 8, Jn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), Wa = /* @__PURE__ */ Z({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const a = t, e = te(!1);
    let u = null;
    const s = () => {
      u = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, d = () => {
      u && (clearTimeout(u), u = null), e.value = !1;
    }, p = H(() => `tooltip-pos-${a.position}`), l = H(() => `tooltip-arrow-${a.position}`), f = H(() => `tooltip-variant-${a.variant}`);
    return (b, i) => (g(), m("span", {
      class: "tooltip-root",
      onMouseenter: s,
      onMouseleave: d,
      onFocus: s,
      onBlur: d
    }, [
      ae(b.$slots, "default"),
      se(Ge, { name: "tooltip-fade" }, {
        default: Ue(() => [
          e.value && t.text ? (g(), m("span", {
            key: 0,
            class: j(["tooltip-content", [p.value, f.value]]),
            role: "tooltip"
          }, [
            Tt(z(t.text) + " ", 1),
            h("span", {
              class: j(["tooltip-arrow", [l.value, f.value]])
            }, null, 2)
          ], 2)) : P("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Zn = { class: "mitreka-pagination" }, Qn = ["disabled"], Xn = { class: "pagination-status" }, eo = ["disabled"], Ka = /* @__PURE__ */ Z({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, u = a, s = () => {
      e.page > 1 && u("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && u("change", e.page + 1);
    };
    return (p, l) => (g(), m("div", Zn, [
      h("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: s
      }, [...l[0] || (l[0] = [
        h("span", { class: "hidden sm:inline" }, "Prev", -1),
        h("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Qn),
      h("span", Xn, z(t.page) + " / " + z(t.pages), 1),
      h("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...l[1] || (l[1] = [
        h("span", { class: "hidden sm:inline" }, "Next", -1),
        h("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, eo)
    ]));
  }
}), to = { class: "avatar-root" }, no = ["src", "alt"], qa = /* @__PURE__ */ Z({
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
    const a = t, e = te(!1), u = H(() => a.src && !e.value), s = H(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), d = H(() => `avatar-size-${a.size}`), p = H(() => `avatar-color-${a.color}`), l = H(() => a.status ? `avatar-status-${a.status}` : ""), f = H(() => `avatar-status-size-${a.size}`), b = H(() => a.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (w, C) => (g(), m("span", to, [
      u.value ? (g(), m("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: j(["avatar-img", [d.value, b.value]]),
        onError: i
      }, null, 42, no)) : (g(), m("span", {
        key: 1,
        class: j(["avatar-fallback", [d.value, p.value, b.value]])
      }, z(s.value), 3)),
      t.status ? (g(), m("span", {
        key: 2,
        class: j(["avatar-status", [l.value, f.value]])
      }, null, 2)) : P("", !0)
    ]));
  }
}), Ga = /* @__PURE__ */ Z({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = on(), u = H(() => {
      var f;
      const l = (f = e.default) == null ? void 0 : f.call(e);
      return l ? l.length : 0;
    }), s = H(() => u.value <= a.max ? 0 : u.value - a.max), d = H(() => `avatar-size-${a.size}`), p = H(() => `avatar-group-space-${a.size}`);
    return (l, f) => (g(), m("div", {
      class: j(["avatar-group", p.value])
    }, [
      (g(!0), m(ce, null, xe(t.max, (b, i) => {
        var w, C;
        return g(), m(ce, { key: i }, [
          i < u.value ? (g(), Ye(an((C = (w = $(e)).default) == null ? void 0 : C.call(w)[i]), { key: 0 })) : P("", !0)
        ], 64);
      }), 128)),
      s.value > 0 ? (g(), m("span", {
        key: 0,
        class: j(["avatar-group-count", d.value])
      }, " +" + z(s.value), 3)) : P("", !0)
    ], 2));
  }
}), oo = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, ao = { class: "breadcrumbs-list" }, ro = {
  key: 0,
  class: "breadcrumbs-item"
}, io = ["href"], so = { key: 0 }, lo = ["href"], co = {
  key: 1,
  class: "breadcrumbs-text"
}, uo = {
  key: 1,
  class: "breadcrumbs-current"
}, Ua = /* @__PURE__ */ Z({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (u) => u === a.items.length - 1;
    return (u, s) => t.items.length ? (g(), m("nav", oo, [
      h("ol", ao, [
        t.showHome ? (g(), m("li", ro, [
          h("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, z(t.homeLabel), 9, io)
        ])) : P("", !0),
        (g(!0), m(ce, null, xe(t.items, (d, p) => (g(), m("li", {
          key: p,
          class: "breadcrumbs-item"
        }, [
          s[0] || (s[0] = h("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(p) ? (g(), m("span", uo, z(d.label), 1)) : (g(), m("span", so, [
            d.href ? (g(), m("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, z(d.label), 9, lo)) : (g(), m("span", co, z(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : P("", !0);
  }
}), fo = { class: "mitreka-stat-card" }, ho = {
  key: 0,
  class: "stat-icon"
}, po = { class: "stat-content" }, go = { class: "stat-label" }, mo = { class: "stat-value" }, Ja = /* @__PURE__ */ Z({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (g(), m("div", fo, [
      t.icon ? (g(), m("div", ho, z(t.icon), 1)) : P("", !0),
      h("div", po, [
        h("div", go, z(t.label), 1),
        h("div", mo, z(t.value), 1)
      ])
    ]));
  }
}), vo = { class: "mitreka-page-header" }, wo = { class: "page-header-title-row" }, bo = { class: "page-header-title" }, ko = {
  key: 0,
  class: "page-header-desc"
}, Za = /* @__PURE__ */ Z({
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
    }, u = H(() => {
      if (!a.category) return "";
      const s = a.category.toLowerCase();
      return e[s] || "badge-soft-primary";
    });
    return (s, d) => (g(), m("header", vo, [
      h("div", wo, [
        h("h1", bo, z(t.title), 1),
        t.category ? (g(), m("span", {
          key: 0,
          class: j(["badge page-header-badge", u.value])
        }, z(t.category), 3)) : P("", !0)
      ]),
      t.description ? (g(), m("p", ko, z(t.description), 1)) : P("", !0)
    ]));
  }
}), yo = { class: "mitreka-theme-switcher" }, xo = ["value"], Qa = /* @__PURE__ */ Z({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: u } = un("light"), s = H(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (p) => {
      e(p === "mitrekadark" ? "dark" : "light");
    };
    return (p, l) => (g(), m("div", yo, [
      h("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: l[0] || (l[0] = //@ts-ignore
        (...f) => $(u) && $(u)(...f))
      }, " Toggle: " + z(s.value), 1),
      h("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: s.value,
        onChange: l[1] || (l[1] = (f) => d(f.target.value))
      }, [...l[2] || (l[2] = [
        h("option", { value: "mitrekalight" }, "mitrekalight", -1),
        h("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, xo)
    ]));
  }
}), Co = { class: "sidebar-header" }, Mo = {
  key: 0,
  class: "sidebar-search"
}, Do = ["placeholder"], So = { class: "sidebar-nav" }, _o = ["href", "title", "onClick"], Eo = { class: "sidebar-icon" }, $o = { class: "sidebar-icon-text" }, jo = {
  key: 0,
  class: "sidebar-label"
}, To = ["title", "onClick"], Ho = { class: "sidebar-icon" }, Ao = { class: "sidebar-icon-text" }, Bo = {
  key: 0,
  class: "sidebar-label"
}, Io = ["href", "title", "onClick"], Fo = { class: "sidebar-icon" }, Lo = { class: "sidebar-icon-text" }, Oo = {
  key: 0,
  class: "sidebar-label"
}, Xa = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = te(""), d = rn({});
    e.defaultOpenIds.forEach((w) => {
      d[w] = !0;
    });
    const p = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), l = (w) => {
      var _;
      if (!w.children) return !1;
      if (s.value.trim()) return !0;
      const C = d[w.id], M = ((_ = w.children) == null ? void 0 : _.some(p)) ?? !1;
      return C === void 0 && M && (d[w.id] = !0), d[w.id] ?? M;
    }, f = (w) => {
      const C = !l(w);
      d[w.id] = C, u("toggle", w.id, C);
    }, b = H(() => {
      const w = s.value.toLowerCase().trim();
      return w ? e.items.map((C) => {
        if (C.children) {
          const M = C.children.filter(
            (_) => _.label.toLowerCase().includes(w)
          );
          return C.label.toLowerCase().includes(w) ? C : M.length > 0 ? { ...C, children: M } : null;
        }
        return C.label.toLowerCase().includes(w) ? C : null;
      }).filter(Boolean) : e.items;
    }), i = (w) => {
      u("navigate", w), s.value = "";
    };
    return (w, C) => (g(), m("aside", {
      class: j(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      h("div", Co, [
        ae(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (g(), m("div", Mo, [
        bt(h("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": C[0] || (C[0] = (M) => s.value = M)
        }, null, 8, Do), [
          [kt, s.value]
        ]),
        s.value ? (g(), m("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: C[1] || (C[1] = (M) => s.value = "")
        }, " × ")) : P("", !0)
      ])) : P("", !0),
      h("nav", So, [
        (g(!0), m(ce, null, xe(b.value, (M) => (g(), m(ce, {
          key: M.id
        }, [
          M.children ? (g(), m(ce, { key: 1 }, [
            h("button", {
              class: j(["sidebar-item sidebar-group", l(M) ? "is-open" : ""]),
              title: t.collapsed ? M.label : void 0,
              onClick: (_) => f(M)
            }, [
              h("span", Ho, [
                ae(w.$slots, "icon", { item: M }, () => [
                  h("span", Ao, z(M.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? P("", !0) : (g(), m("span", Bo, z(M.label), 1)),
              t.collapsed ? P("", !0) : (g(), m("span", {
                key: 1,
                class: j(["sidebar-caret", l(M) ? "rotate" : ""])
              }, "›", 2))
            ], 10, To),
            l(M) ? (g(), m("div", {
              key: 0,
              class: j(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (g(!0), m(ce, null, xe(M.children, (_) => (g(), m("a", {
                key: _.id,
                class: j(["sidebar-item sidebar-child", p(_) ? "is-active" : ""]),
                href: _.href || "#",
                title: t.collapsed ? _.label : void 0,
                onClick: we((S) => i(_), ["prevent"])
              }, [
                h("span", Fo, [
                  ae(w.$slots, "icon", { item: _ }, () => [
                    h("span", Lo, z(_.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? P("", !0) : (g(), m("span", Oo, z(_.label), 1))
              ], 10, Io))), 128))
            ], 2)) : P("", !0)
          ], 64)) : (g(), m("a", {
            key: 0,
            class: j(["sidebar-item", p(M) ? "is-active" : ""]),
            href: M.href || "#",
            title: t.collapsed ? M.label : void 0,
            onClick: we((_) => i(M), ["prevent"])
          }, [
            h("span", Eo, [
              ae(w.$slots, "icon", { item: M }, () => [
                h("span", $o, z(M.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? P("", !0) : (g(), m("span", jo, z(M.label), 1))
          ], 10, _o))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Ht = {
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
}, er = (t) => Ht[t], zo = ["innerHTML"], No = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ke = /* @__PURE__ */ Z({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = H(() => a.class || "w-5 h-5"), u = H(() => Ht[a.name]), s = H(
      () => u.value ? u.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, p) => u.value ? (g(), m("span", {
      key: 0,
      innerHTML: s.value,
      class: "inline-flex"
    }, null, 8, zo)) : (g(), m("span", No, "?"));
  }
});
var pt = [
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
], ze = {
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
}, Ze = {
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
}, pe = function(t, a) {
  return a === void 0 && (a = 2), ("000" + t).slice(a * -1);
}, ye = function(t) {
  return t === !0 ? 1 : 0;
};
function $t(t, a) {
  var e;
  return function() {
    var u = this, s = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(u, s);
    }, a);
  };
}
var gt = function(t) {
  return t instanceof Array ? t : [t];
};
function he(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function q(t, a, e) {
  var u = window.document.createElement(t);
  return a = a || "", e = e || "", u.className = a, e !== void 0 && (u.textContent = e), u;
}
function ot(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function At(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return At(t.parentNode, a);
}
function at(t, a) {
  var e = q("div", "numInputWrapper"), u = q("input", "numInput " + t), s = q("span", "arrowUp"), d = q("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? u.type = "number" : (u.type = "text", u.pattern = "\\d*"), a !== void 0)
    for (var p in a)
      u.setAttribute(p, a[p]);
  return e.appendChild(u), e.appendChild(s), e.appendChild(d), e;
}
function me(t) {
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
var mt = function() {
}, it = function(t, a, e) {
  return e.months[a ? "shorthand" : "longhand"][t];
}, Po = {
  D: mt,
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
    t.setHours(t.getHours() % 12 + 12 * ye(new RegExp(e.amPM[1], "i").test(a)));
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
    var u = parseInt(a), s = new Date(t.getFullYear(), 0, 2 + (u - 1) * 7, 0, 0, 0, 0);
    return s.setDate(s.getDate() - s.getDay() + e.firstDayOfWeek), s;
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
  l: mt,
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
  w: mt,
  y: function(t, a) {
    t.setFullYear(2e3 + parseFloat(a));
  }
}, Fe = {
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
}, qe = {
  Z: function(t) {
    return t.toISOString();
  },
  D: function(t, a, e) {
    return a.weekdays.shorthand[qe.w(t, a, e)];
  },
  F: function(t, a, e) {
    return it(qe.n(t, a, e) - 1, !1, a);
  },
  G: function(t, a, e) {
    return pe(qe.h(t, a, e));
  },
  H: function(t) {
    return pe(t.getHours());
  },
  J: function(t, a) {
    return a.ordinal !== void 0 ? t.getDate() + a.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, a) {
    return a.amPM[ye(t.getHours() > 11)];
  },
  M: function(t, a) {
    return it(t.getMonth(), !0, a);
  },
  S: function(t) {
    return pe(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, a, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return pe(t.getFullYear(), 4);
  },
  d: function(t) {
    return pe(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return pe(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, a) {
    return a.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return pe(t.getMonth() + 1);
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
}, Bt = function(t) {
  var a = t.config, e = a === void 0 ? ze : a, u = t.l10n, s = u === void 0 ? Ze : u, d = t.isMobile, p = d === void 0 ? !1 : d;
  return function(l, f, b) {
    var i = b || s;
    return e.formatDate !== void 0 && !p ? e.formatDate(l, f, i) : f.split("").map(function(w, C, M) {
      return qe[w] && M[C - 1] !== "\\" ? qe[w](l, i, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, yt = function(t) {
  var a = t.config, e = a === void 0 ? ze : a, u = t.l10n, s = u === void 0 ? Ze : u;
  return function(d, p, l, f) {
    if (!(d !== 0 && !d)) {
      var b = f || s, i, w = d;
      if (d instanceof Date)
        i = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        i = new Date(d);
      else if (typeof d == "string") {
        var C = p || (e || ze).dateFormat, M = String(d).trim();
        if (M === "today")
          i = /* @__PURE__ */ new Date(), l = !0;
        else if (e && e.parseDate)
          i = e.parseDate(d, C);
        else if (/Z$/.test(M) || /GMT$/.test(M))
          i = new Date(d);
        else {
          for (var _ = void 0, S = [], A = 0, ne = 0, Q = ""; A < C.length; A++) {
            var ie = C[A], de = ie === "\\", ue = C[A - 1] === "\\" || de;
            if (Fe[ie] && !ue) {
              Q += Fe[ie];
              var I = new RegExp(Q).exec(d);
              I && (_ = !0) && S[ie !== "Y" ? "push" : "unshift"]({
                fn: Po[ie],
                val: I[++ne]
              });
            } else de || (Q += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), S.forEach(function(Y) {
            var R = Y.fn, W = Y.val;
            return i = R(i, W, b) || i;
          }), i = _ ? i : void 0;
        }
      }
      if (!(i instanceof Date && !isNaN(i.getTime()))) {
        e.errorHandler(new Error("Invalid date provided: " + w));
        return;
      }
      return l === !0 && i.setHours(0, 0, 0, 0), i;
    }
  };
};
function ve(t, a, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(a.getTime()).setHours(0, 0, 0, 0) : t.getTime() - a.getTime();
}
var Yo = function(t, a, e) {
  return t > Math.min(a, e) && t < Math.max(a, e);
}, vt = function(t, a, e) {
  return t * 3600 + a * 60 + e;
}, Vo = function(t) {
  var a = Math.floor(t / 3600), e = (t - a * 3600) / 60;
  return [a, e, t - a * 3600 - e * 60];
}, Ro = {
  DAY: 864e5
};
function wt(t) {
  var a = t.defaultHour, e = t.defaultMinute, u = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var s = t.minDate.getHours(), d = t.minDate.getMinutes(), p = t.minDate.getSeconds();
    a < s && (a = s), a === s && e < d && (e = d), a === s && e === d && u < p && (u = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var l = t.maxDate.getHours(), f = t.maxDate.getMinutes();
    a = Math.min(a, l), a === l && (e = Math.min(f, e)), a === l && e === f && (u = t.maxDate.getSeconds());
  }
  return { hours: a, minutes: e, seconds: u };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var a = [], e = 1; e < arguments.length; e++)
    a[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var u = function(l) {
    l && Object.keys(l).forEach(function(f) {
      return t[f] = l[f];
    });
  }, s = 0, d = a; s < d.length; s++) {
    var p = d[s];
    u(p);
  }
  return t;
});
var fe = function() {
  return fe = Object.assign || function(t) {
    for (var a, e = 1, u = arguments.length; e < u; e++) {
      a = arguments[e];
      for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
  }, fe.apply(this, arguments);
}, jt = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var u = Array(t), s = 0, a = 0; a < e; a++)
    for (var d = arguments[a], p = 0, l = d.length; p < l; p++, s++)
      u[s] = d[p];
  return u;
}, Wo = 300;
function Ko(t, a) {
  var e = {
    config: fe(fe({}, ze), re.defaultConfig),
    l10n: Ze
  };
  e.parseDate = yt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = S, e._setHoursFromDate = C, e._positionCalendar = We, e.changeMonth = X, e.changeYear = oe, e.clear = U, e.close = Be, e.onMouseOver = Ee, e._createElement = q, e.createDay = I, e.destroy = st, e.isEnabled = L, e.jumpToDate = Q, e.updateValue = $e, e.open = Xe, e.redraw = Ct, e.set = Lt, e.setDate = Ot, e.toggle = Yt;
  function u() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function s() {
    e.element = e.input = t, e.isOpen = !1, Ae(), Re(), Nt(), zt(), u(), e.isMobile || ue(), ne(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && C(e.config.noCalendar ? e.latestSelectedDateObj : void 0), $e(!1)), l();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && We(), ee("onReady");
  }
  function d() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function p(n) {
    return n.bind(e);
  }
  function l() {
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
      var o = e.config.minDate === void 0 || ve(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = wt(e.config);
      o.setHours(r.hours, r.minutes, r.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && Wt(n);
    var c = e._input.value;
    w(), $e(), e._input.value !== c && e._debouncedChange();
  }
  function b(n, o) {
    return n % 12 + 12 * ye(o === e.l10n.amPM[1]);
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
      e.amPM !== void 0 && (n = b(n, e.amPM.textContent));
      var c = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && ve(e.latestSelectedDateObj, e.config.minDate, !0) === 0, v = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && ve(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var k = vt(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), O = vt(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), D = vt(n, o, r);
        if (D > O && D < k) {
          var V = Vo(k);
          n = V[0], o = V[1], r = V[2];
        }
      } else {
        if (v) {
          var x = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, x.getHours()), n === x.getHours() && (o = Math.min(o, x.getMinutes())), o === x.getMinutes() && (r = Math.min(r, x.getSeconds()));
        }
        if (c) {
          var T = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, T.getHours()), n === T.getHours() && o < T.getMinutes() && (o = T.getMinutes()), o === T.getMinutes() && (r = Math.max(r, T.getSeconds()));
        }
      }
      M(n, o, r);
    }
  }
  function C(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && M(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function M(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = pe(e.config.time_24hr ? n : (12 + n) % 12 + 12 * ye(n % 12 === 0)), e.minuteElement.value = pe(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[ye(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = pe(r)));
  }
  function _(n) {
    var o = me(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && oe(r);
  }
  function S(n, o, r, c) {
    if (o instanceof Array)
      return o.forEach(function(v) {
        return S(n, v, r, c);
      });
    if (n instanceof Array)
      return n.forEach(function(v) {
        return S(v, o, r, c);
      });
    n.addEventListener(o, r, c), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, c);
      }
    });
  }
  function A() {
    ee("onChange");
  }
  function ne() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(c) {
        return S(c, "click", e[r]);
      });
    }), e.isMobile) {
      Pt();
      return;
    }
    var n = $t(Qe, 50);
    if (e._debouncedChange = $t(A, Wo), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && S(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Ee(me(r));
    }), S(e._input, "keydown", Ie), e.calendarContainer !== void 0 && S(e.calendarContainer, "keydown", Ie), !e.config.inline && !e.config.static && S(window, "resize", n), window.ontouchstart !== void 0 ? S(window.document, "touchstart", Le) : S(window.document, "mousedown", Le), S(window.document, "focus", Le, { capture: !0 }), e.config.clickOpens === !0 && (S(e._input, "focus", e.open), S(e._input, "click", e.open)), e.daysContainer !== void 0 && (S(e.monthNav, "click", Rt), S(e.monthNav, ["keyup", "increment"], _), S(e.daysContainer, "click", Mt)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return me(r).select();
      };
      S(e.timeContainer, ["increment"], f), S(e.timeContainer, "blur", f, { capture: !0 }), S(e.timeContainer, "click", ie), S([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && S(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && S(e.amPM, "click", function(r) {
        f(r);
      });
    }
    e.config.allowInput && S(e._input, "blur", Se);
  }
  function Q(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), c = e.currentYear, v = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (k) {
      k.message = "Invalid date supplied: " + r, e.config.errorHandler(k);
    }
    o && e.currentYear !== c && (ee("onYearChange"), K()), o && (e.currentYear !== c || e.currentMonth !== v) && ee("onMonthChange"), e.redraw();
  }
  function ie(n) {
    var o = me(n);
    ~o.className.indexOf("arrow") && de(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function de(n, o, r) {
    var c = n && me(n), v = r || c && c.parentNode && c.parentNode.firstChild, k = ct("increment");
    k.delta = o, v && v.dispatchEvent(k);
  }
  function ue() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = q("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(Me()), e.innerContainer = q("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = G(), r = o.weekWrapper, c = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = c, e.weekWrapper = r;
      }
      e.rContainer = q("div", "flatpickr-rContainer"), e.rContainer.appendChild(Te()), e.daysContainer || (e.daysContainer = q("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), N(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(De()), he(e.calendarContainer, "rangeMode", e.config.mode === "range"), he(e.calendarContainer, "animate", e.config.animate === !0), he(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var v = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!v && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var k = q("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(k, e.element), k.appendChild(e.element), e.altInput && k.appendChild(e.altInput), k.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function I(n, o, r, c) {
    var v = L(o, !0), k = q("span", n, o.getDate().toString());
    return k.dateObj = o, k.$i = c, k.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && ve(o, e.now) === 0 && (e.todayDateElem = k, k.classList.add("today"), k.setAttribute("aria-current", "date")), v ? (k.tabIndex = -1, ut(o) && (k.classList.add("selected"), e.selectedDateElem = k, e.config.mode === "range" && (he(k, "startRange", e.selectedDates[0] && ve(o, e.selectedDates[0], !0) === 0), he(k, "endRange", e.selectedDates[1] && ve(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && k.classList.add("inRange")))) : k.classList.add("flatpickr-disabled"), e.config.mode === "range" && Vt(o) && !ut(o) && k.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && c % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), ee("onDayCreate", k), k;
  }
  function Y(n) {
    n.focus(), e.config.mode === "range" && Ee(n);
  }
  function R(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, c = o; c != r; c += n)
      for (var v = e.daysContainer.children[c], k = n > 0 ? 0 : v.children.length - 1, O = n > 0 ? v.children.length : -1, D = k; D != O; D += n) {
        var V = v.children[D];
        if (V.className.indexOf("hidden") === -1 && L(V.dateObj))
          return V;
      }
  }
  function W(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, c = o > 0 ? e.config.showMonths : -1, v = o > 0 ? 1 : -1, k = r - e.currentMonth; k != c; k += v)
      for (var O = e.daysContainer.children[k], D = r - e.currentMonth === k ? n.$i + o : o < 0 ? O.children.length - 1 : 0, V = O.children.length, x = D; x >= 0 && x < V && x != (o > 0 ? V : -1); x += v) {
        var T = O.children[x];
        if (T.className.indexOf("hidden") === -1 && L(T.dateObj) && Math.abs(n.$i - x) >= Math.abs(o))
          return Y(T);
      }
    e.changeMonth(v), y(R(v), 0);
  }
  function y(n, o) {
    var r = d(), c = F(r || document.body), v = n !== void 0 ? n : c ? r : e.selectedDateElem !== void 0 && F(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && F(e.todayDateElem) ? e.todayDateElem : R(o > 0 ? 1 : -1);
    v === void 0 ? e._input.focus() : c ? W(v, o) : Y(v);
  }
  function B(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, c = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), v = e.utils.getDaysInMonth(o, n), k = window.document.createDocumentFragment(), O = e.config.showMonths > 1, D = O ? "prevMonthDay hidden" : "prevMonthDay", V = O ? "nextMonthDay hidden" : "nextMonthDay", x = c + 1 - r, T = 0; x <= c; x++, T++)
      k.appendChild(I("flatpickr-day " + D, new Date(n, o - 1, x), x, T));
    for (x = 1; x <= v; x++, T++)
      k.appendChild(I("flatpickr-day", new Date(n, o, x), x, T));
    for (var J = v + 1; J <= 42 - r && (e.config.showMonths === 1 || T % 7 !== 0); J++, T++)
      k.appendChild(I("flatpickr-day " + V, new Date(n, o + 1, J % v), J, T));
    var _e = q("div", "dayContainer");
    return _e.appendChild(k), _e;
  }
  function N() {
    if (e.daysContainer !== void 0) {
      ot(e.daysContainer), e.weekNumbers && ot(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(B(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Ee();
    }
  }
  function K() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(c) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && c < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && c > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = q("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = it(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function Ce() {
    var n = q("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = q("span", "cur-month") : (e.monthsDropdownContainer = q("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), S(e.monthsDropdownContainer, "change", function(O) {
      var D = me(O), V = parseInt(D.value, 10);
      e.changeMonth(V - e.currentMonth), ee("onMonthChange");
    }), K(), r = e.monthsDropdownContainer);
    var c = at("cur-year", { tabindex: "-1" }), v = c.getElementsByTagName("input")[0];
    v.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && v.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (v.setAttribute("max", e.config.maxDate.getFullYear().toString()), v.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var k = q("div", "flatpickr-current-month");
    return k.appendChild(r), k.appendChild(c), o.appendChild(k), n.appendChild(o), {
      container: n,
      yearElement: v,
      monthElement: r
    };
  }
  function je() {
    ot(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = Ce();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function Me() {
    return e.monthNav = q("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = q("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = q("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, je(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (he(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (he(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], nt(), e.monthNav;
  }
  function De() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = wt(e.config);
    e.timeContainer = q("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = q("span", "flatpickr-time-separator", ":"), r = at("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var c = at("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = c.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = pe(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = pe(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(c), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var v = at("flatpickr-second");
      e.secondElement = v.getElementsByTagName("input")[0], e.secondElement.value = pe(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(q("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(v);
    }
    return e.config.time_24hr || (e.amPM = q("span", "flatpickr-am-pm", e.l10n.amPM[ye((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function Te() {
    e.weekdayContainer ? ot(e.weekdayContainer) : e.weekdayContainer = q("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = q("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return E(), e.weekdayContainer;
  }
  function E() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = jt(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = jt(o.splice(n, o.length), o.splice(0, n)));
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
    var n = q("div", "flatpickr-weekwrapper");
    n.appendChild(q("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = q("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function X(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, ee("onYearChange"), K()), N(), ee("onMonthChange"), nt());
  }
  function U(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = wt(e.config), c = r.hours, v = r.minutes, k = r.seconds;
      M(c, v, k);
    }
    e.redraw(), n && ee("onChange");
  }
  function Be() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), ee("onClose");
  }
  function st() {
    e.config !== void 0 && ee("onDestroy");
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
  function Le(n) {
    if (e.isOpen && !e.config.inline) {
      var o = me(n), r = He(o), c = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), v = !c && !r && !He(n.relatedTarget), k = !e.config.ignoredFocusElements.some(function(O) {
        return O.contains(o);
      });
      v && k && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && f(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function oe(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), ee("onYearChange"), K());
    }
  }
  function L(n, o) {
    var r;
    o === void 0 && (o = !0);
    var c = e.parseDate(n, void 0, o);
    if (e.config.minDate && c && ve(c, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && c && ve(c, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (c === void 0)
      return !1;
    for (var v = !!e.config.enable, k = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, O = 0, D = void 0; O < k.length; O++) {
      if (D = k[O], typeof D == "function" && D(c))
        return v;
      if (D instanceof Date && c !== void 0 && D.getTime() === c.getTime())
        return v;
      if (typeof D == "string") {
        var V = e.parseDate(D, void 0, !0);
        return V && V.getTime() === c.getTime() ? v : !v;
      } else if (typeof D == "object" && c !== void 0 && D.from && D.to && c.getTime() >= D.from.getTime() && c.getTime() <= D.to.getTime())
        return v;
    }
    return !v;
  }
  function F(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Se(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== ft();
    o && r && !(n.relatedTarget && He(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ie(n) {
    var o = me(n), r = e.config.wrap ? t.contains(o) : o === e._input, c = e.config.allowInput, v = e.isOpen && (!c || !r), k = e.config.inline && r && !c;
    if (n.keyCode === 13 && r) {
      if (c)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (He(o) || v || k) {
      var O = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          O ? (n.preventDefault(), f(), dt()) : Mt(n);
          break;
        case 27:
          n.preventDefault(), dt();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!O && !r) {
            n.preventDefault();
            var D = d();
            if (e.daysContainer !== void 0 && (c === !1 || D && F(D))) {
              var V = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), X(V), y(R(1), 0)) : y(void 0, V);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var x = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), oe(e.currentYear - x), y(R(1), 0)) : O || y(void 0, x * 7) : o === e.currentYearElement ? oe(e.currentYear - x) : e.config.enableTime && (!O && e.hourElement && e.hourElement.focus(), f(n), e._debouncedChange());
          break;
        case 9:
          if (O) {
            var T = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(ge) {
              return ge;
            }), J = T.indexOf(o);
            if (J !== -1) {
              var _e = T[J + (n.shiftKey ? -1 : 1)];
              n.preventDefault(), (_e || e._input).focus();
            }
          } else !e.config.noCalendar && e.daysContainer && e.daysContainer.contains(o) && n.shiftKey && (n.preventDefault(), e._input.focus());
          break;
      }
    }
    if (e.amPM !== void 0 && o === e.amPM)
      switch (n.key) {
        case e.l10n.amPM[0].charAt(0):
        case e.l10n.amPM[0].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[0], w(), $e();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], w(), $e();
          break;
      }
    (r || He(o)) && ee("onKeyDown", n);
  }
  function Ee(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), c = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), v = Math.min(r, e.selectedDates[0].getTime()), k = Math.max(r, e.selectedDates[0].getTime()), O = !1, D = 0, V = 0, x = v; x < k; x += Ro.DAY)
        L(new Date(x), !0) || (O = O || x > v && x < k, x < c && (!D || x > D) ? D = x : x > c && (!V || x < V) && (V = x));
      var T = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      T.forEach(function(J) {
        var _e = J.dateObj, ge = _e.getTime(), Ke = D > 0 && ge < D || V > 0 && ge > V;
        if (Ke) {
          J.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(Oe) {
            J.classList.remove(Oe);
          });
          return;
        } else if (O && !Ke)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(Oe) {
          J.classList.remove(Oe);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), c < r && ge === c ? J.classList.add("startRange") : c > r && ge === c && J.classList.add("endRange"), ge >= D && (V === 0 || ge <= V) && Yo(ge, c, r) && J.classList.add("inRange"));
      });
    }
  }
  function Qe() {
    e.isOpen && !e.config.static && !e.config.inline && We();
  }
  function Xe(n, o) {
    if (o === void 0 && (o = e._positionElement), e.isMobile === !0) {
      if (n) {
        n.preventDefault();
        var r = me(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), ee("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var c = e.isOpen;
    e.isOpen = !0, c || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), ee("onOpen"), We(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function Ve(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), c = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(v) {
        return L(v);
      }), !e.selectedDates.length && n === "min" && C(r), $e()), e.daysContainer && (Ct(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!c && r !== void 0 && c.getFullYear() === r.getFullYear());
    };
  }
  function Ae() {
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
    ], o = fe(fe({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(T) {
        e.config._enable = St(T);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(T) {
        e.config._disable = St(T);
      }
    });
    var c = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || c)) {
      var v = re.defaultConfig.dateFormat || ze.dateFormat;
      r.dateFormat = o.noCalendar || c ? "H:i" + (o.enableSeconds ? ":S" : "") : v + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || c) && !o.altFormat) {
      var k = re.defaultConfig.altFormat || ze.altFormat;
      r.altFormat = o.noCalendar || c ? "h:i" + (o.enableSeconds ? ":S K" : " K") : k + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
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
    var O = function(T) {
      return function(J) {
        e.config[T === "min" ? "_minTime" : "_maxTime"] = e.parseDate(J, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: O("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: O("max")
    }), o.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, o);
    for (var D = 0; D < n.length; D++)
      e.config[n[D]] = e.config[n[D]] === !0 || e.config[n[D]] === "true";
    pt.filter(function(T) {
      return e.config[T] !== void 0;
    }).forEach(function(T) {
      e.config[T] = gt(e.config[T] || []).map(p);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var D = 0; D < e.config.plugins.length; D++) {
      var V = e.config.plugins[D](e) || {};
      for (var x in V)
        pt.indexOf(x) > -1 ? e.config[x] = gt(V[x]).map(p).concat(e.config[x]) : typeof o[x] > "u" && (e.config[x] = V[x]);
    }
    o.altInputClass || (e.config.altInputClass = et().className + " " + e.config.altInputClass), ee("onParseConfig");
  }
  function et() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Re() {
    typeof e.config.locale != "object" && typeof re.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = fe(fe({}, re.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? re.l10ns[e.config.locale] : void 0), Fe.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Fe.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Fe.M = "(" + e.l10n.months.shorthand.join("|") + ")", Fe.F = "(" + e.l10n.months.longhand.join("|") + ")", Fe.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = fe(fe({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && re.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Bt(e), e.parseDate = yt({ config: e.config, l10n: e.l10n });
  }
  function We(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      ee("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(Xt, en) {
        return Xt + en.offsetHeight;
      }, 0), c = e.calendarContainer.offsetWidth, v = e.config.position.split(" "), k = v[0], O = v.length > 1 ? v[1] : null, D = o.getBoundingClientRect(), V = window.innerHeight - D.bottom, x = k === "above" || k !== "below" && V < r && D.top > r, T = window.pageYOffset + D.top + (x ? -r - 2 : o.offsetHeight + 2);
      if (he(e.calendarContainer, "arrowTop", !x), he(e.calendarContainer, "arrowBottom", x), !e.config.inline) {
        var J = window.pageXOffset + D.left, _e = !1, ge = !1;
        O === "center" ? (J -= (c - D.width) / 2, _e = !0) : O === "right" && (J -= c - D.width, ge = !0), he(e.calendarContainer, "arrowLeft", !_e && !ge), he(e.calendarContainer, "arrowCenter", _e), he(e.calendarContainer, "arrowRight", ge);
        var Ke = window.document.body.offsetWidth - (window.pageXOffset + D.right), Oe = J + c > window.document.body.offsetWidth, Kt = Ke + c > window.document.body.offsetWidth;
        if (he(e.calendarContainer, "rightMost", Oe), !e.config.static)
          if (e.calendarContainer.style.top = T + "px", !Oe)
            e.calendarContainer.style.left = J + "px", e.calendarContainer.style.right = "auto";
          else if (!Kt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = Ke + "px";
          else {
            var ht = lt();
            if (ht === void 0)
              return;
            var qt = window.document.body.offsetWidth, Gt = Math.max(0, qt / 2 - c / 2), Ut = ".flatpickr-calendar.centerMost:before", Jt = ".flatpickr-calendar.centerMost:after", Zt = ht.cssRules.length, Qt = "{left:" + D.left + "px;right:auto;}";
            he(e.calendarContainer, "rightMost", !1), he(e.calendarContainer, "centerMost", !0), ht.insertRule(Ut + "," + Jt + Qt, Zt), e.calendarContainer.style.left = Gt + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function lt() {
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
    return n ?? Ft();
  }
  function Ft() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function Ct() {
    e.config.noCalendar || e.isMobile || (K(), nt(), N());
  }
  function dt() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function Mt(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(T) {
      return T.classList && T.classList.contains("flatpickr-day") && !T.classList.contains("flatpickr-disabled") && !T.classList.contains("notAllowed");
    }, r = At(me(n), o);
    if (r !== void 0) {
      var c = r, v = e.latestSelectedDateObj = new Date(c.dateObj.getTime()), k = (v.getMonth() < e.currentMonth || v.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = c, e.config.mode === "single")
        e.selectedDates = [v];
      else if (e.config.mode === "multiple") {
        var O = ut(v);
        O ? e.selectedDates.splice(parseInt(O), 1) : e.selectedDates.push(v);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = v, e.selectedDates.push(v), ve(v, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(T, J) {
        return T.getTime() - J.getTime();
      }));
      if (w(), k) {
        var D = e.currentYear !== v.getFullYear();
        e.currentYear = v.getFullYear(), e.currentMonth = v.getMonth(), D && (ee("onYearChange"), K()), ee("onMonthChange");
      }
      if (nt(), N(), $e(), !k && e.config.mode !== "range" && e.config.showMonths === 1 ? Y(c) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var V = e.config.mode === "single" && !e.config.enableTime, x = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (V || x) && dt();
      }
      A();
    }
  }
  var tt = {
    locale: [Re, E],
    showMonths: [je, l, Te],
    minDate: [Q],
    maxDate: [Q],
    positionElement: [_t],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (S(e._input, "focus", e.open), S(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function Lt(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        tt[r] !== void 0 && tt[r].forEach(function(c) {
          return c();
        });
    } else
      e.config[n] = o, tt[n] !== void 0 ? tt[n].forEach(function(c) {
        return c();
      }) : pt.indexOf(n) > -1 && (e.config[n] = gt(o));
    e.redraw(), $e(!0);
  }
  function Dt(n, o) {
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
      return c instanceof Date && L(c, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(c, v) {
      return c.getTime() - v.getTime();
    });
  }
  function Ot(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    Dt(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), Q(void 0, o), C(), e.selectedDates.length === 0 && e.clear(!1), $e(o), o && ee("onChange");
  }
  function St(n) {
    return n.slice().map(function(o) {
      return typeof o == "string" || typeof o == "number" || o instanceof Date ? e.parseDate(o, void 0, !0) : o && typeof o == "object" && o.from && o.to ? {
        from: e.parseDate(o.from, void 0),
        to: e.parseDate(o.to, void 0)
      } : o;
    }).filter(function(o) {
      return o;
    });
  }
  function zt() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && Dt(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function Nt() {
    if (e.input = et(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = q(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), _t();
  }
  function _t() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function Pt() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = q("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    S(e.mobileInput, "change", function(o) {
      e.setDate(me(o).value, !1, e.mobileFormatStr), ee("onChange"), ee("onClose");
    });
  }
  function Yt(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function ee(n, o) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var c = 0; r[c] && c < r.length; c++)
          r[c](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(ct("change")), e.input.dispatchEvent(ct("input")));
    }
  }
  function ct(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function ut(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var r = e.selectedDates[o];
      if (r instanceof Date && ve(r, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function Vt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : ve(n, e.selectedDates[0]) >= 0 && ve(n, e.selectedDates[1]) <= 0;
  }
  function nt() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = it(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function ft(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, o);
    }).filter(function(r, c, v) {
      return e.config.mode !== "range" || e.config.enableTime || v.indexOf(r) === c;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function $e(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = ft(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = ft(e.config.altFormat)), n !== !1 && ee("onValueUpdate");
  }
  function Rt(n) {
    var o = me(n), r = e.prevMonthNav.contains(o), c = e.nextMonthNav.contains(o);
    r || c ? X(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function Wt(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = me(n), c = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[ye(e.amPM.textContent === e.l10n.amPM[0])]);
    var v = parseFloat(c.getAttribute("min")), k = parseFloat(c.getAttribute("max")), O = parseFloat(c.getAttribute("step")), D = parseInt(c.value, 10), V = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), x = D + O * V;
    if (typeof c.value < "u" && c.value.length === 2) {
      var T = c === e.hourElement, J = c === e.minuteElement;
      x < v ? (x = k + x + ye(!T) + (ye(T) && ye(!e.amPM)), J && de(void 0, -1, e.hourElement)) : x > k && (x = c === e.hourElement ? x - k - ye(!e.amPM) : v, J && de(void 0, 1, e.hourElement)), e.amPM && T && (O === 1 ? x + D === 23 : Math.abs(x - D) > O) && (e.amPM.textContent = e.l10n.amPM[ye(e.amPM.textContent === e.l10n.amPM[0])]), c.value = pe(x);
    }
  }
  return s(), e;
}
function Ne(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(p) {
    return p instanceof HTMLElement;
  }), u = [], s = 0; s < e.length; s++) {
    var d = e[s];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Ko(d, a || {}), u.push(d._flatpickr);
    } catch (p) {
      console.error(p);
    }
  }
  return u.length === 1 ? u[0] : u;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return Ne(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return Ne([this], t);
});
var re = function(t, a) {
  return typeof t == "string" ? Ne(window.document.querySelectorAll(t), a) : t instanceof Node ? Ne([t], a) : Ne(t, a);
};
re.defaultConfig = {};
re.l10ns = {
  en: fe({}, Ze),
  default: fe({}, Ze)
};
re.localize = function(t) {
  re.l10ns.default = fe(fe({}, re.l10ns.default), t);
};
re.setDefaults = function(t) {
  re.defaultConfig = fe(fe({}, re.defaultConfig), t);
};
re.parseDate = yt({});
re.formatDate = Bt({});
re.compareDates = ve;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return Ne(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = re);
var qo = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Go(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var It = { exports: {} };
(function(t, a) {
  (function(e, u) {
    t.exports = u();
  })(qo, function() {
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
      return e = Object.assign || function(b) {
        for (var i, w = 1, C = arguments.length; w < C; w++) {
          i = arguments[w];
          for (var M in i) Object.prototype.hasOwnProperty.call(i, M) && (b[M] = i[M]);
        }
        return b;
      }, e.apply(this, arguments);
    }, u = function(f, b, i) {
      return i.months[b ? "shorthand" : "longhand"][f];
    };
    function s(f) {
      for (; f.firstChild; )
        f.removeChild(f.firstChild);
    }
    function d(f) {
      try {
        if (typeof f.composedPath == "function") {
          var b = f.composedPath();
          return b[0];
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
    function l(f) {
      var b = e(e({}, p), f);
      return function(i) {
        i.config.dateFormat = b.dateFormat, i.config.altFormat = b.altFormat;
        var w = { monthsContainer: null };
        function C() {
          if (i.rContainer) {
            s(i.rContainer);
            for (var y = 0; y < i.monthElements.length; y++) {
              var B = i.monthElements[y];
              B.parentNode && B.parentNode.removeChild(B);
            }
          }
        }
        function M() {
          i.rContainer && (w.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, _(), i.rContainer.appendChild(w.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + b.theme));
        }
        function _() {
          if (w.monthsContainer) {
            s(w.monthsContainer);
            for (var y = document.createDocumentFragment(), B = 0; B < 12; B++) {
              var N = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, B), 0, B);
              N.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && N.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && N.classList.add("today"), N.textContent = u(B, b.shorthand, i.l10n), N.addEventListener("click", Q), y.appendChild(N);
            }
            w.monthsContainer.appendChild(y), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function S() {
          i._bind(i.prevMonthNav, "click", function(y) {
            y.preventDefault(), y.stopPropagation(), i.changeYear(i.currentYear - 1), ne(), _();
          }), i._bind(i.nextMonthNav, "click", function(y) {
            y.preventDefault(), y.stopPropagation(), i.changeYear(i.currentYear + 1), ne(), _();
          }), i._bind(w.monthsContainer, "mouseover", function(y) {
            i.config.mode === "range" && i.onMouseOver(d(y), "flatpickr-monthSelect-month");
          });
        }
        function A() {
          if (i.rContainer && i.selectedDates.length) {
            for (var y = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), B = 0; B < y.length; B++)
              y[B].classList.remove("selected");
            var N = i.selectedDates[0].getMonth(), K = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (N + 1) + ")");
            K && K.classList.add("selected");
          }
        }
        function ne() {
          var y = i.selectedDates[0];
          if (y && (y = new Date(y), y.setFullYear(i.currentYear), i.config.minDate && y < i.config.minDate && (y = i.config.minDate), i.config.maxDate && y > i.config.maxDate && (y = i.config.maxDate), i.currentYear = y.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var B = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            B.forEach(function(N) {
              N.dateObj.setFullYear(i.currentYear), i.config.minDate && N.dateObj < i.config.minDate || i.config.maxDate && N.dateObj > i.config.maxDate ? N.classList.add("flatpickr-disabled") : N.classList.remove("flatpickr-disabled");
            });
          }
          A();
        }
        function Q(y) {
          y.preventDefault(), y.stopPropagation();
          var B = d(y);
          if (B instanceof Element && !B.classList.contains("flatpickr-disabled") && !B.classList.contains("notAllowed") && (ie(B.dateObj), i.config.closeOnSelect)) {
            var N = i.config.mode === "single", K = i.config.mode === "range" && i.selectedDates.length === 2;
            (N || K) && i.close();
          }
        }
        function ie(y) {
          var B = new Date(i.currentYear, y.getMonth(), y.getDate()), N = [];
          switch (i.config.mode) {
            case "single":
              N = [B];
              break;
            case "multiple":
              N.push(B);
              break;
            case "range":
              i.selectedDates.length === 2 ? N = [B] : (N = i.selectedDates.concat([B]), N.sort(function(K, Ce) {
                return K.getTime() - Ce.getTime();
              }));
              break;
          }
          i.setDate(N, !0), A();
        }
        var de = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ue(y, B, N, K) {
          var Ce = de[K.keyCode] !== void 0;
          if (!(!Ce && K.keyCode !== 13) && !(!i.rContainer || !w.monthsContainer)) {
            var je = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), Me = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (Me === -1) {
              var De = je || w.monthsContainer.firstElementChild;
              De.focus(), Me = De.$i;
            }
            Ce ? w.monthsContainer.children[(12 + Me + de[K.keyCode]) % 12].focus() : K.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && ie(document.activeElement.dateObj);
          }
        }
        function I() {
          var y;
          ((y = i.config) === null || y === void 0 ? void 0 : y.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || _();
        }
        function Y() {
          b._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(b._stubbedCurrentMonth), i.currentMonth = b._stubbedCurrentMonth;
        }
        function R() {
          b._stubbedCurrentMonth && (i._initialDate.setMonth(b._stubbedCurrentMonth), i.currentMonth = b._stubbedCurrentMonth, delete b._stubbedCurrentMonth);
        }
        function W() {
          if (w.monthsContainer !== null)
            for (var y = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), B = 0; B < y.length; B++)
              y[B].removeEventListener("click", Q);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: A,
          onKeyDown: ue,
          onReady: [
            Y,
            C,
            M,
            S,
            A,
            function() {
              i.config.onClose.push(I), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            R,
            W,
            function() {
              i.config.onClose = i.config.onClose.filter(function(y) {
                return y !== I;
              });
            }
          ]
        };
      };
    }
    return l;
  });
})(It);
var Uo = It.exports;
const Jo = /* @__PURE__ */ Go(Uo), Zo = { class: "relative" }, Qo = ["placeholder", "disabled", "readonly"], Xo = {
  key: 0,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, ea = { class: "flex items-center justify-between mb-2" }, ta = { class: "text-xs opacity-70" }, na = { class: "grid grid-cols-4 gap-2" }, oa = ["onClick"], tr = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = te(null), d = te(!1), p = te((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let l = null;
    const f = H(() => e.picker === "month" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), b = () => {
      var _, S;
      if (s.value) {
        if (e.picker === "year-grid") {
          (_ = l == null ? void 0 : l.destroy) == null || _.call(l), l = null;
          return;
        }
        (S = l == null ? void 0 : l.destroy) == null || S.call(l), l = re(s.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Jo({
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
            e.picker === "year" && ((A = l == null ? void 0 : l.calendarContainer) == null || A.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var A;
            e.picker === "year" && ((A = l == null ? void 0 : l.calendarContainer) == null || A.classList.add("flatpickr-year-only"));
          },
          onChange: (A) => {
            if (e.mode === "range") {
              const ne = A.map(
                (Q) => l.formatDate(Q, f.value)
              );
              u("update:modelValue", ne);
            } else {
              const ne = A[0] ? l.formatDate(A[0], f.value) : "";
              u("update:modelValue", ne);
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
      (_ = l == null ? void 0 : l.open) == null || _.call(l);
    };
    rt(b), Je(() => {
      var _;
      return (_ = l == null ? void 0 : l.destroy) == null ? void 0 : _.call(l);
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
      b
    ), le(
      () => e.modelValue,
      (_) => {
        !l || e.picker === "year-grid" || l.setDate(_, !1);
      }
    );
    const w = H(
      () => Array.from({ length: 12 }, (_, S) => p.value + S)
    ), C = (_) => {
      u("update:modelValue", _.toString()), d.value = !1;
    }, M = (_) => {
      if (!d.value) return;
      const S = _.target;
      if (s.value && S && s.value.contains(S)) return;
      const A = document.querySelector(".mitreka-year-grid");
      A && S && A.contains(S) || (d.value = !1);
    };
    return rt(() => document.addEventListener("click", M)), Je(() => document.removeEventListener("click", M)), (_, S) => (g(), m("div", Zo, [
      h("input", {
        ref_key: "inputEl",
        ref: s,
        class: j(["input w-full", t.inputClass]),
        placeholder: t.placeholder,
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: i,
        onFocus: i
      }, null, 42, Qo),
      t.picker === "year-grid" && d.value ? (g(), m("div", Xo, [
        h("div", ea, [
          h("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: S[0] || (S[0] = (A) => p.value -= 12)
          }, " Prev "),
          h("div", ta, z(p.value) + " - " + z(p.value + 11), 1),
          h("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: S[1] || (S[1] = (A) => p.value += 12)
          }, " Next ")
        ]),
        h("div", na, [
          (g(!0), m(ce, null, xe(w.value, (A) => (g(), m("button", {
            key: A,
            class: j(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === A.toString() }]),
            type: "button",
            onClick: (ne) => C(A)
          }, z(A), 11, oa))), 128))
        ])
      ])) : P("", !0)
    ]));
  }
}), nr = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = sn(), d = te(null), p = te(null), l = te(13), f = te(!1);
    let b = null, i = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], C = [], M = te("normal"), _ = H(() => [
      "w-full",
      M.value === "autoHeight" ? "h-auto" : "h-full"
    ]), S = H(() => M.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), A = () => {
      const E = document.documentElement, G = E.classList.contains("dark"), X = (E.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      f.value = G || X;
    }, ne = H(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : f.value), Q = H(() => ne.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), ie = H(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), de = H(() => ["agx", Q.value, ie.value, s.class]), ue = H(() => [{ "--ag-odd-row-background-color": e.striped ? ne.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, s.style]), I = H(() => {
      const { class: E, style: G, onGridReady: X, ...U } = s;
      return U;
    }), Y = (E) => typeof E == "number" && Number.isFinite(E) ? E : void 0, R = H(() => {
      const E = s.gridOptions;
      if (E && typeof E == "object") return E;
      const G = s["grid-options"];
      return G && typeof G == "object" ? G : {};
    }), W = (E) => {
      const G = Y(s[E]);
      if (typeof G == "number") return G;
      const U = Y(s[E === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof U == "number" ? U : Y(R.value[E]);
    }, y = () => {
      const E = s.domLayout;
      if (typeof E == "string" && E.length > 0) return E;
      const G = s["dom-layout"];
      if (typeof G == "string" && G.length > 0) return G;
      const X = R.value.domLayout;
      return typeof X == "string" && X.length > 0 ? X : void 0;
    }, B = () => {
      var G, X;
      if (!p.value) return 0;
      const E = (U) => typeof U == "number" && Number.isFinite(U) && U >= 0;
      if (typeof p.value.getDisplayedRowCount == "function") {
        const U = p.value.getDisplayedRowCount();
        if (E(U)) return U;
      }
      if (typeof p.value.paginationGetRowCount == "function") {
        const U = p.value.paginationGetRowCount();
        if (E(U)) return U;
      }
      if (typeof p.value.getModel == "function") {
        const U = (X = (G = p.value).getModel) == null ? void 0 : X.call(G), Be = U && typeof U.getRowCount == "function" ? U.getRowCount() : void 0;
        if (E(Be)) return Be;
      }
      return 0;
    }, N = () => {
      const E = Number(e.autoHeightThreshold);
      return Number.isFinite(E) ? Math.max(1, Math.floor(E)) : 15;
    }, K = () => {
      if (!p.value) return;
      const E = y();
      if (E) {
        M.value = E, p.value.setGridOption("domLayout", E);
        return;
      }
      const G = e.autoHeightWhenFewRows && B() < N() ? "autoHeight" : "normal";
      M.value = G, p.value.setGridOption("domLayout", G);
    }, Ce = () => {
      var E;
      for (; C.length > 0; )
        (E = C.pop()) == null || E();
    }, je = () => {
      if (!p.value) return;
      Ce();
      const E = () => K();
      w.forEach((G) => {
        p.value.addEventListener(G, E), C.push(() => {
          var X;
          (X = p.value) == null || X.removeEventListener(G, E);
        });
      });
    }, Me = () => {
      if (!e.autoHeaderHeight || !p.value) return;
      const E = W("headerHeight") ?? hn(e.density), G = W("groupHeaderHeight") ?? pn(e.density);
      p.value.setGridOption("headerHeight", E), p.value.setGridOption("groupHeaderHeight", G);
    }, De = () => {
      if (!e.autoRowHeight || !p.value) return;
      const E = gn(l.value, e.density);
      p.value.setGridOption("rowHeight", E), p.value.setGridOption("getRowHeight", () => E), p.value.resetRowHeights();
    }, Te = (E) => {
      p.value = E.api, l.value = mn(d.value), je(), Me(), K(), De(), requestAnimationFrame(() => K()), u("grid-ready", E);
    };
    return le(
      () => e.density,
      () => {
        var E;
        Me(), De(), (E = p.value) == null || E.refreshCells({ force: !0 });
      }
    ), le(
      () => [
        s.headerHeight,
        s["header-height"],
        s.groupHeaderHeight,
        s["group-header-height"],
        s.gridOptions,
        s["grid-options"]
      ],
      () => {
        Me();
      }
    ), le(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        K();
      }
    ), le(
      () => [s.domLayout, s["dom-layout"], s.gridOptions, s["grid-options"]],
      () => {
        K();
      }
    ), le(
      () => [s.rowData, s["row-data"]],
      () => {
        requestAnimationFrame(() => K());
      }
    ), rt(() => {
      A(), e.autoObserveTheme && (b = new MutationObserver(A), b.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (i = fn(d.value));
    }), Je(() => {
      b == null || b.disconnect(), Ce(), i == null || i();
    }), (E, G) => (g(), m("div", {
      ref_key: "hostRef",
      ref: d,
      class: j(_.value),
      style: be(S.value)
    }, [
      se($(bn), ln(I.value, {
        class: de.value,
        theme: "legacy",
        style: ue.value,
        onGridReady: Te
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), aa = ["disabled"], ra = {
  class: "max-h-60 overflow-auto",
  role: "listbox"
}, ia = ["onMouseenter", "onClick", "aria-selected"], or = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = te(null), d = te(!1), p = te(-1), l = H(
      () => e.options.find((I) => I.value === e.modelValue) ?? null
    ), f = H(() => {
      var I;
      return ((I = l.value) == null ? void 0 : I.label) ?? e.placeholder;
    }), b = {
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
    }, C = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, M = H(() => {
      const I = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", Y = b[e.size], R = e.variant === "outline" ? w[e.color] : i[e.color], W = e.disabled ? "opacity-60 cursor-not-allowed" : "", y = d.value ? `ring-3 ${C[e.color]}` : "";
      return [I, Y, R, W, y].join(" ");
    }), _ = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, S = H(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), A = (I) => {
      const Y = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: Y,
        backgroundColor: I ? "var(--color-base-200)" : "transparent"
      } : {
        color: Y,
        backgroundColor: I ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, ne = H(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), Q = () => {
      e.disabled || (d.value = !d.value, d.value && (p.value = e.options.findIndex((I) => I.value === e.modelValue)));
    }, ie = (I) => {
      I.disabled || (u("update:modelValue", I.value), u("change", I.value), d.value = !1);
    }, de = (I) => {
      if (!e.disabled)
        switch (I.key) {
          case "Enter":
          case " ":
            if (I.preventDefault(), d.value && p.value >= 0) {
              const Y = e.options[p.value];
              Y && !Y.disabled && ie(Y);
            } else
              Q();
            break;
          case "Escape":
            d.value = !1;
            break;
          case "ArrowDown":
            I.preventDefault(), d.value ? p.value = Math.min(p.value + 1, e.options.length - 1) : (d.value = !0, p.value = 0);
            break;
          case "ArrowUp":
            I.preventDefault(), d.value && (p.value = Math.max(p.value - 1, 0));
            break;
        }
    }, ue = (I) => {
      s.value && !s.value.contains(I.target) && (d.value = !1);
    };
    return rt(() => {
      document.addEventListener("click", ue);
    }), Je(() => {
      document.removeEventListener("click", ue);
    }), (I, Y) => (g(), m("div", {
      ref_key: "root",
      ref: s,
      class: "relative"
    }, [
      h("button", {
        type: "button",
        class: j(M.value),
        disabled: t.disabled,
        onClick: Q,
        onKeydown: de
      }, [
        h("span", {
          class: j([l.value ? "" : "opacity-60"])
        }, z(f.value), 3),
        se(ke, {
          name: d.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, aa),
      se(Ge, {
        "enter-active-class": "transition duration-150 ease-out",
        "enter-from-class": "opacity-0 -translate-y-1 scale-[0.98]",
        "enter-to-class": "opacity-100 translate-y-0 scale-100",
        "leave-active-class": "transition duration-100 ease-in",
        "leave-from-class": "opacity-100 translate-y-0 scale-100",
        "leave-to-class": "opacity-0 -translate-y-1 scale-[0.98]"
      }, {
        default: Ue(() => [
          d.value ? (g(), m("div", {
            key: 0,
            class: "absolute z-50 mt-1 w-full rounded-box border border-base-300 shadow-lg p-1",
            style: be(S.value)
          }, [
            h("ul", ra, [
              (g(!0), m(ce, null, xe(t.options, (R, W) => {
                var y, B, N;
                return g(), m("li", {
                  key: R.value,
                  class: j([
                    _[t.size],
                    "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                    R.disabled ? "opacity-50 cursor-not-allowed" : "",
                    ((y = l.value) == null ? void 0 : y.value) === R.value ? "font-medium" : ""
                  ]),
                  style: be(A(W === p.value)),
                  onMouseenter: (K) => p.value = W,
                  onClick: (K) => R.disabled ? null : ie(R),
                  role: "option",
                  "aria-selected": ((B = l.value) == null ? void 0 : B.value) === R.value
                }, [
                  h("span", null, z(R.label), 1),
                  ((N = l.value) == null ? void 0 : N.value) === R.value ? (g(), Ye(ke, {
                    key: 0,
                    name: "check",
                    class: "w-4 h-4",
                    style: be(ne.value)
                  }, null, 8, ["style"])) : P("", !0)
                ], 46, ia);
              }), 128))
            ])
          ], 4)) : P("", !0)
        ]),
        _: 1
      })
    ], 512));
  }
}), sa = { class: "relative" }, la = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, da = ["disabled", "placeholder", "value", "readonly"], ca = ["disabled"], ua = {
  key: 0,
  class: "absolute z-20 mt-1 w-full card p-1"
}, fa = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, ha = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], pa = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, ar = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = te(e.modelValue ?? null);
    le(
      () => e.modelValue,
      (Y) => s.value = Y ?? null
    ), le(s, (Y) => u("update:modelValue", Y));
    const {
      root: d,
      inputEl: p,
      menu: l,
      open: f,
      query: b,
      hoverIdx: i,
      loading: w,
      filtered: C,
      selected: M,
      openMenu: _,
      closeMenu: S,
      choose: A,
      clear: ne,
      onKey: Q
    } = vn(s, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), ie = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, de = (Y) => !Y || Y === "default" ? "input" : `input input-${Y}`, ue = H(
      () => {
        var Y;
        return f.value ? b.value : ((Y = M.value) == null ? void 0 : Y.label) ?? "";
      }
    );
    function I() {
      if (!e.disabled) {
        if (f.value) {
          S();
          return;
        }
        _();
      }
    }
    return (Y, R) => (g(), m("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      h("div", sa, [
        h("span", la, [
          se(ke, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        h("input", {
          ref_key: "inputEl",
          ref: p,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: ue.value,
          onFocus: R[0] || (R[0] = //@ts-ignore
          (...W) => $(_) && $(_)(...W)),
          onClick: R[1] || (R[1] = //@ts-ignore
          (...W) => $(_) && $(_)(...W)),
          onKeydown: R[2] || (R[2] = //@ts-ignore
          (...W) => $(Q) && $(Q)(...W)),
          readonly: !$(f),
          class: j([
            ie[t.size || "md"],
            de(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: R[3] || (R[3] = (W) => $(f) ? b.value = W.target.value : null)
        }, null, 42, da),
        t.clearable && $(M) && !t.disabled ? (g(), m("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onClick: R[4] || (R[4] = //@ts-ignore
          (...W) => $(ne) && $(ne)(...W))
        }, [
          se(ke, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : P("", !0),
        h("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onClick: I,
          disabled: t.disabled
        }, [
          se(ke, {
            name: $(f) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 8, ca)
      ]),
      $(f) ? (g(), m("div", ua, [
        $(w) ? (g(), m("div", fa, "Loading…")) : (g(), m("ul", {
          key: 1,
          ref_key: "menu",
          ref: l,
          class: "max-h-60 overflow-auto",
          role: "listbox"
        }, [
          (g(!0), m(ce, null, xe($(C), (W, y) => {
            var B, N;
            return g(), m("li", {
              key: W.value,
              "data-idx": y,
              class: j([
                "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                y === $(i) ? "bg-base-200" : "",
                W.disabled ? "opacity-50 cursor-not-allowed" : ""
              ]),
              onMouseenter: (K) => i.value = y,
              onMousedown: we((K) => W.disabled ? null : $(A)(W), ["prevent"]),
              role: "option",
              "aria-selected": ((B = $(M)) == null ? void 0 : B.value) === W.value
            }, [
              h("span", null, z(W.label), 1),
              ((N = $(M)) == null ? void 0 : N.value) === W.value ? (g(), Ye(ke, {
                key: 0,
                name: "check",
                class: "w-4 h-4 opacity-80"
              })) : P("", !0)
            ], 42, ha);
          }), 128)),
          !$(C).length && !$(w) ? (g(), m("li", pa, " No results ")) : P("", !0)
        ], 512))
      ])) : P("", !0)
    ], 512));
  }
}), ga = { class: "truncate" }, ma = ["onClick"], va = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, wa = {
  key: 1,
  class: "flex-1 min-w-0"
}, ba = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, ka = { class: "truncate" }, ya = ["onClick"], xa = { class: "flex items-center gap-2 w-full" }, Ca = { class: "flex-1 min-w-[8ch]" }, Ma = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, Da = { class: "truncate" }, Sa = {
  key: 0,
  class: "absolute z-20 mt-1 w-full card p-2"
}, _a = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Ea = ["onMousedown"], $a = ["checked"], ja = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Ta = /* @__PURE__ */ Z({
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
    const e = t, u = a, s = te(e.modelValue ?? []);
    le(
      () => e.modelValue,
      (oe) => s.value = oe ?? []
    ), le(s, (oe) => u("update:modelValue", oe));
    const {
      root: d,
      inputEl: p,
      menu: l,
      open: f,
      query: b,
      loading: i,
      filtered: w,
      selectedList: C,
      openMenu: M,
      toggle: _,
      clearAll: S,
      onKey: A
    } = wn(s, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), ne = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, Q = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, ie = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, de = {
      xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
      md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
      lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" }
    }, ue = {
      xs: "badge-xs text-xs",
      sm: "badge-sm text-sm",
      md: "text-sm",
      lg: "badge-lg text-lg",
      xl: "badge-xl text-xl"
    }, I = {
      xs: "-mr-2 h-4 w-4",
      sm: "-mr-2.5 h-5 w-5",
      md: "-mr-3 h-6 w-6",
      lg: "-mr-3 h-7 w-7",
      xl: "-mr-3 h-8 w-8"
    }, Y = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, R = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, W = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, y = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, B = H(() => e.displayMode ?? "stacked"), N = H(() => B.value === "inline-compact"), K = H(
      () => Q[e.size || "md"]
    ), Ce = H(
      () => ie[K.value]
    ), je = H(
      () => de[K.value]
    ), Me = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), De = H(() => [...w.value].sort((oe, L) => {
      const F = s.value.includes(oe.value), Se = s.value.includes(L.value);
      return F !== Se ? F ? -1 : 1 : Me.compare(oe.label, L.label);
    })), Te = te(null), E = te(null), G = te([]), X = te(0);
    let U = null;
    const Be = H(
      () => Math.max(0, C.value.length - X.value)
    );
    function st(oe, L) {
      oe && (G.value[L] = oe);
    }
    function He() {
      var Qe, Xe, Ve;
      if (!N.value) {
        X.value = C.value.length;
        return;
      }
      const oe = ((Qe = Te.value) == null ? void 0 : Qe.clientWidth) ?? 0, L = C.value.length;
      if (!oe || L === 0) {
        X.value = L;
        return;
      }
      const F = ((Xe = E.value) == null ? void 0 : Xe.offsetWidth) ?? 28, Se = 6;
      let Ie = 0, Ee = 0;
      for (let Ae = 0; Ae < L; Ae += 1) {
        const et = ((Ve = G.value[Ae]) == null ? void 0 : Ve.offsetWidth) ?? 0, Re = Ie + (Ae > 0 ? Se : 0) + et, lt = L - (Ae + 1) > 0 ? Se + F : 0;
        if (Re + lt <= oe)
          Ie = Re, Ee = Ae + 1;
        else
          break;
      }
      Ee === 0 && L > 0 && (Ee = 1), X.value = Ee;
    }
    async function Le() {
      await dn(), He();
    }
    return le(
      () => [C.value.length, e.size, e.displayMode, b.value],
      () => {
        Le();
      },
      { immediate: !0 }
    ), le(De, () => {
      Le();
    }), le(Te, (oe) => {
      U == null || U.disconnect(), U = null, oe && (U = new ResizeObserver(() => {
        He();
      }), U.observe(oe));
    }), Je(() => {
      U == null || U.disconnect();
    }), (oe, L) => (g(), m("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      h("div", {
        class: j([
          B.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          ne[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: L[10] || (L[10] = //@ts-ignore
        (...F) => $(M) && $(M)(...F))
      }, [
        B.value === "inline-compact" ? (g(), m(ce, { key: 0 }, [
          h("span", {
            class: j(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", R[t.size || "md"]])
          }, z(t.placeholder || "Select options..."), 3),
          $(C).length ? (g(), m("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Te,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (g(!0), m(ce, null, xe($(C).slice(0, X.value), (F) => (g(), m("span", {
              key: F.value,
              class: j(["badge badge-soft-primary gap-1 max-w-[12rem]", ue[t.size || "md"]])
            }, [
              h("span", ga, z(F.label), 1),
              h("button", {
                type: "button",
                class: j([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  I[t.size || "md"]
                ]),
                onClick: we((Se) => $(_)(F.value), ["stop"])
              }, [
                se(ke, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, ma)
            ], 2))), 128)),
            Be.value > 0 ? (g(), m("span", va, " +" + z(Be.value), 1)) : P("", !0)
          ], 512)) : (g(), m("span", wa)),
          h("span", {
            class: j([
              $(C).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            bt(h("input", {
              ref_key: "inputEl",
              ref: p,
              "onUpdate:modelValue": L[0] || (L[0] = (F) => Et(b) ? b.value = F : null),
              class: j([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: be(Ce.value),
              placeholder: "Search...",
              onKeydown: L[1] || (L[1] = //@ts-ignore
              (...F) => $(A) && $(A)(...F)),
              onFocus: L[2] || (L[2] = (F) => f.value = !0)
            }, null, 36), [
              [kt, $(b)]
            ])
          ], 2),
          h("button", {
            type: "button",
            class: j(["icon-btn icon-btn-outline shrink-0", Y[t.size || "md"]]),
            onClick: L[3] || (L[3] = we((F) => f.value = !$(f), ["stop"]))
          }, [
            se(ke, {
              name: $(f) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 2),
          $(C).length ? (g(), m("button", {
            key: 2,
            type: "button",
            class: j(["icon-btn icon-btn-outline shrink-0", Y[t.size || "md"]]),
            onClick: L[4] || (L[4] = we((F) => $(S)(), ["stop"]))
          }, [
            se(ke, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 2)) : P("", !0)
        ], 64)) : (g(), m(ce, { key: 1 }, [
          $(C).length ? (g(), m("div", ba, [
            (g(!0), m(ce, null, xe($(C), (F) => (g(), m("span", {
              key: F.value,
              class: j(["badge badge-soft-primary gap-1 max-w-full", ue[t.size || "md"]])
            }, [
              h("span", ka, z(F.label), 1),
              h("button", {
                type: "button",
                class: j([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  I[t.size || "md"]
                ]),
                onClick: we((Se) => $(_)(F.value), ["stop"])
              }, [
                se(ke, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, ya)
            ], 2))), 128))
          ])) : (g(), m("span", {
            key: 1,
            class: j(["opacity-60 w-full", R[t.size || "md"]])
          }, z(t.placeholder || "Select options..."), 3)),
          h("div", xa, [
            h("span", Ca, [
              bt(h("input", {
                ref_key: "inputEl",
                ref: p,
                "onUpdate:modelValue": L[5] || (L[5] = (F) => Et(b) ? b.value = F : null),
                class: j([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: be(je.value),
                placeholder: "Search...",
                onKeydown: L[6] || (L[6] = //@ts-ignore
                (...F) => $(A) && $(A)(...F)),
                onFocus: L[7] || (L[7] = (F) => f.value = !0)
              }, null, 36), [
                [kt, $(b)]
              ])
            ]),
            h("button", {
              type: "button",
              class: j(["icon-btn icon-btn-outline shrink-0", Y[t.size || "md"]]),
              onClick: L[8] || (L[8] = we((F) => f.value = !$(f), ["stop"]))
            }, [
              se(ke, {
                name: $(f) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 2),
            $(C).length ? (g(), m("button", {
              key: 0,
              type: "button",
              class: j(["icon-btn icon-btn-outline shrink-0", Y[t.size || "md"]]),
              onClick: L[9] || (L[9] = we((F) => $(S)(), ["stop"]))
            }, [
              se(ke, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 2)) : P("", !0)
          ])
        ], 64)),
        N.value ? (g(), m("div", Ma, [
          (g(!0), m(ce, null, xe($(C), (F, Se) => (g(), m("span", {
            key: `measure-${F.value}`,
            ref_for: !0,
            ref: (Ie) => st(Ie, Se),
            class: j(["badge badge-soft-primary gap-1 max-w-[12rem]", ue[t.size || "md"]])
          }, [
            h("span", Da, z(F.label), 1),
            h("span", {
              class: j([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                I[t.size || "md"]
              ])
            }, [
              se(ke, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          h("span", {
            ref_key: "measureCounterEl",
            ref: E,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : P("", !0)
      ], 2),
      $(f) ? (g(), m("div", Sa, [
        $(i) ? (g(), m("div", _a, "Loading...")) : (g(), m("ul", {
          key: 1,
          ref_key: "menu",
          ref: l,
          class: "max-h-60 overflow-auto"
        }, [
          (g(!0), m(ce, null, xe(De.value, (F) => (g(), m("li", {
            key: F.value,
            class: j([
              "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
              W[t.size || "md"],
              s.value.includes(F.value) ? "bg-primary/15" : ""
            ]),
            onMousedown: we((Se) => $(_)(F.value), ["prevent"])
          }, [
            h("input", {
              type: "checkbox",
              class: j(y[t.size || "md"]),
              checked: s.value.includes(F.value)
            }, null, 10, $a),
            h("span", null, z(F.label), 1)
          ], 42, Ea))), 128)),
          !De.value.length && !$(i) ? (g(), m("li", ja, " No results ")) : P("", !0)
        ], 512))
      ])) : P("", !0)
    ], 512));
  }
}), Ha = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [u, s] of a)
    e[u] = s;
  return e;
}, rr = /* @__PURE__ */ Ha(Ta, [["__scopeId", "data-v-2ec126be"]]);
export {
  rr as M,
  Fa as _,
  La as a,
  Oa as b,
  za as c,
  Na as d,
  Pa as e,
  Ya as f,
  Yn as g,
  Va as h,
  Ra as i,
  Wa as j,
  Ka as k,
  qa as l,
  Ga as m,
  Ua as n,
  Ja as o,
  Za as p,
  Qa as q,
  Xa as r,
  ke as s,
  tr as t,
  nr as u,
  or as v,
  ar as w,
  Ht as x,
  er as y
};
