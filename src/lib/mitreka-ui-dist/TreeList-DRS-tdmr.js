import { defineComponent as de, createElementBlock as f, openBlock as d, normalizeClass as L, createCommentVNode as O, renderSlot as me, createElementVNode as c, ref as P, watch as ve, withKeys as ht, withModifiers as ee, createBlock as Ge, Teleport as gt, createVNode as ie, Transition as ot, withCtx as at, toDisplayString as V, provide as rn, inject as sn, computed as b, normalizeStyle as Me, createTextVNode as Pt, Fragment as xe, renderList as Se, unref as U, useSlots as ln, resolveDynamicComponent as dn, reactive as cn, withDirectives as It, vModelText as Lt, onMounted as pt, onBeforeUnmount as rt, mergeProps as Ft, useAttrs as Yt, nextTick as Ve, isRef as Ot } from "vue";
import { d as un, c as fn, h as hn, i as pn, g as gn, f as vn, r as mn, a as wn, b as kn } from "./useAgGridRowHeight-UHX5I8W2.js";
import { AgGridVue as xn } from "ag-grid-vue3";
const yn = ["disabled"], bn = {
  key: 0,
  class: "animate-spin"
}, xr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, l = () => {
      const { variant: u, color: m } = e;
      return m === "default" ? u === "outline" ? "btn-outline" : u === "ghost" ? "btn-ghost" : "" : u === "solid" ? `btn-${m}` : u === "outline" ? `btn-outline btn-outline-${m}` : u === "soft" ? `btn-soft-${m}` : u === "ghost" ? "btn-ghost" : "";
    }, v = (u) => {
      !e.disabled && !e.loading && h("click", u);
    };
    return (u, m) => (d(), f("button", {
      class: L(["btn", s[t.size], l()]),
      disabled: t.disabled || t.loading,
      onClick: v
    }, [
      t.loading ? (d(), f("span", bn, [...m[0] || (m[0] = [
        c("svg", {
          class: "w-4 h-4",
          fill: "none",
          viewBox: "0 0 24 24"
        }, [
          c("circle", {
            class: "opacity-25",
            cx: "12",
            cy: "12",
            r: "10",
            stroke: "currentColor",
            "stroke-width": "4"
          }),
          c("path", {
            class: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          })
        ], -1)
      ])])) : O("", !0),
      me(u.$slots, "default")
    ], 10, yn));
  }
}), yr = /* @__PURE__ */ de({
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
      const { variant: s, color: l } = a;
      return l === "default" ? s === "outline" ? "badge-outline" : "" : s === "solid" ? `badge-${l}` : s === "outline" ? `badge-outline badge-outline-${l}` : s === "soft" ? `badge-soft-${l}` : "";
    };
    return (s, l) => (d(), f("span", {
      class: L(["badge", e[t.size], h()])
    }, [
      me(s.$slots, "default")
    ], 2));
  }
}), Mn = ["role", "aria-expanded", "tabindex"], Cn = { class: "card-title" }, Dn = { class: "card-body-inner" }, $n = {
  key: 3,
  class: "mt-4"
}, br = /* @__PURE__ */ de({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const h = t, s = e, l = P(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    ve(() => h.modelValue, (u) => {
      u !== void 0 && (l.value = u);
    });
    function v() {
      if (!h.collapsible) return;
      const u = !l.value;
      l.value = u, s("update:modelValue", u), s("toggle", u);
    }
    return a({ isOpen: l, toggle: v }), (u, m) => (d(), f("section", {
      class: L(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      u.$slots.title ? (d(), f("header", {
        key: 0,
        class: L(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? l.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: v,
        onKeydown: [
          m[0] || (m[0] = ht((g) => t.collapsible && v(), ["enter"])),
          m[1] || (m[1] = ht(ee((g) => t.collapsible && v(), ["prevent"]), ["space"]))
        ]
      }, [
        c("div", Cn, [
          me(u.$slots, "title")
        ]),
        t.collapsible ? (d(), f("svg", {
          key: 0,
          class: L(["card-collapse-icon", { "is-open": l.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...m[2] || (m[2] = [
          c("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : O("", !0)
      ], 42, Mn)) : O("", !0),
      t.collapsible ? (d(), f("div", {
        key: 1,
        class: L(["card-body-wrapper", { "is-open": l.value }])
      }, [
        c("div", Dn, [
          me(u.$slots, "default")
        ])
      ], 2)) : me(u.$slots, "default", { key: 2 }),
      u.$slots.footer ? (d(), f("footer", $n, [
        me(u.$slots, "footer")
      ])) : O("", !0)
    ], 2));
  }
}), Sn = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, _n = { class: "text-xl font-semibold" }, Mr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = {
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
    }, l = () => {
      e.persistent || h("close");
    };
    return ve(
      () => e.open,
      (v) => {
        v ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (v, u) => (d(), Ge(gt, { to: "body" }, [
      ie(ot, { name: "fade" }, {
        default: at(() => [
          t.open ? (d(), f("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: l
          })) : O("", !0)
        ]),
        _: 1
      }),
      ie(ot, { name: "zoom" }, {
        default: at(() => [
          t.open ? (d(), f("div", {
            key: 0,
            class: L([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            c("div", {
              class: L([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                s[t.size]
              ])
            }, [
              t.hideHeader ? O("", !0) : (d(), f("div", Sn, [
                me(v.$slots, "header", {}, () => [
                  c("h3", _n, V(t.title), 1)
                ]),
                c("button", {
                  type: "button",
                  class: "p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200",
                  onClick: u[0] || (u[0] = (m) => h("close"))
                }, [...u[3] || (u[3] = [
                  c("svg", {
                    class: "w-5 h-5",
                    fill: "none",
                    stroke: "currentColor",
                    viewBox: "0 0 24 24"
                  }, [
                    c("path", {
                      "stroke-linecap": "round",
                      "stroke-linejoin": "round",
                      "stroke-width": "2",
                      d: "M6 18L18 6M6 6l12 12"
                    })
                  ], -1)
                ])])
              ])),
              c("div", {
                class: L([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                me(v.$slots, "default")
              ], 2),
              t.hideFooter ? O("", !0) : (d(), f("div", {
                key: 1,
                class: L([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                me(v.$slots, "footer", {}, () => [
                  c("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: u[1] || (u[1] = (m) => h("close"))
                  }, V(t.cancelText), 1),
                  c("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: u[2] || (u[2] = (m) => h("confirm"))
                  }, V(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : O("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), Hn = ["aria-expanded", "aria-disabled", "onKeydown"], jn = { class: "collapse-title" }, En = { class: "collapse-content" }, Bn = { class: "collapse-content-inner" }, Tn = { class: "collapse-body" }, Cr = /* @__PURE__ */ de({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const h = t, s = e, l = P(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    ve(() => h.modelValue, (u) => {
      u !== void 0 && (l.value = u);
    });
    function v() {
      if (h.disabled) return;
      const u = !l.value;
      l.value = u, s("update:modelValue", u), s("toggle", u);
    }
    return a({ isOpen: l, toggle: v }), (u, m) => (d(), f("div", {
      class: L([
        "collapse-card",
        `collapse-card-${t.variant}`,
        { "is-open": l.value }
      ])
    }, [
      c("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": l.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: v,
        onKeydown: [
          ht(v, ["enter"]),
          ht(ee(v, ["prevent"]), ["space"])
        ]
      }, [
        c("div", jn, [
          me(u.$slots, "header", {}, () => [
            me(u.$slots, "title")
          ])
        ]),
        m[0] || (m[0] = c("svg", {
          class: "collapse-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          c("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, Hn),
      c("div", En, [
        c("div", Bn, [
          c("div", Tn, [
            me(u.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Dr = /* @__PURE__ */ de({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const h = t, s = e, l = P(/* @__PURE__ */ new Set());
    ve(() => h.modelValue, (m) => {
      m === null ? l.value = /* @__PURE__ */ new Set() : Array.isArray(m) ? l.value = new Set(m) : l.value = /* @__PURE__ */ new Set([m]);
    }, { immediate: !0 });
    function v(m) {
      const g = new Set(l.value);
      g.has(m) ? g.delete(m) : (h.multiple || g.clear(), g.add(m)), l.value = g, h.multiple ? s("update:modelValue", Array.from(g)) : s("update:modelValue", g.size > 0 ? Array.from(g)[0] : null);
    }
    function u(m) {
      return l.value.has(m);
    }
    return rn("accordion", {
      toggleItem: v,
      isItemOpen: u
    }), a({ openItems: l, toggleItem: v }), (m, g) => (d(), f("div", {
      class: L(["accordion", `accordion-${t.variant}`])
    }, [
      me(m.$slots, "default")
    ], 2));
  }
}), An = ["aria-expanded", "aria-disabled", "onKeydown"], In = { class: "accordion-title" }, Ln = { class: "accordion-content" }, zn = { class: "accordion-content-inner" }, Fn = { class: "accordion-body" }, $r = /* @__PURE__ */ de({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = sn("accordion"), h = b(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function s() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (l, v) => (d(), f("div", {
      class: L(["accordion-item", { "is-open": h.value }])
    }, [
      c("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": h.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: s,
        onKeydown: [
          ht(s, ["enter"]),
          ht(ee(s, ["prevent"]), ["space"])
        ]
      }, [
        c("div", In, [
          me(l.$slots, "header", {}, () => [
            me(l.$slots, "title")
          ])
        ]),
        v[0] || (v[0] = c("svg", {
          class: "accordion-icon",
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [
          c("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          })
        ], -1))
      ], 40, An),
      c("div", Ln, [
        c("div", zn, [
          c("div", Fn, [
            me(l.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), On = { class: "loading-logo-wrapper" }, Nn = { class: "dots-container" }, Vn = ["width", "height"], Pn = {
  key: 0,
  class: "loading-text"
}, Yn = /* @__PURE__ */ de({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = b(() => Math.round(a.size * (8 / 60)));
    return (h, s) => (d(), f("div", On, [
      c("div", {
        class: "loading-logo-container",
        style: Me({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        c("div", Nn, [
          c("span", {
            class: "loading-dot dot-1 dot-blue",
            style: Me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-2 dot-blue",
            style: Me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-3 dot-black",
            style: Me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-4 dot-black",
            style: Me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-5 dot-red",
            style: Me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-6 dot-red",
            style: Me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (d(), f("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...s[0] || (s[0] = [
          c("polygon", {
            class: "logo-shape shape-blue",
            points: "11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
          }, null, -1),
          c("rect", {
            class: "logo-shape shape-black",
            x: "15.48",
            y: "8.73",
            width: "9.55",
            height: "9.55",
            transform: "translate(-3.61 18.27) rotate(-45)"
          }, null, -1),
          c("polygon", {
            class: "logo-shape shape-red",
            points: "40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
          }, null, -1)
        ])], 8, Vn))
      ], 4),
      t.text ? (d(), f("p", Pn, [
        Pt(V(t.text), 1),
        s[1] || (s[1] = c("span", { class: "loading-dots" }, [
          c("span", null, "."),
          c("span", null, "."),
          c("span", null, ".")
        ], -1))
      ])) : O("", !0)
    ]));
  }
}), Rn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, Sr = /* @__PURE__ */ de({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (d(), Ge(gt, { to: "body" }, [
      ie(ot, { name: "fade" }, {
        default: at(() => [
          t.open ? (d(), f("div", Rn, [
            ie(Yn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : O("", !0)
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
}, Zn = { class: "toast-message" }, Jn = ["onClick"], _r = /* @__PURE__ */ de({
  __name: "Toasts",
  setup(t) {
    const a = un(), e = b(() => {
      const m = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return m[a.toastPosition.value] || m["bottom-right"];
    }), h = {
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
    }, l = {
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
    }, u = (m, g = "soft") => {
      var k;
      return ((k = {
        soft: s,
        solid: l,
        outline: v
      }[g]) == null ? void 0 : k[m]) || s[m] || "toast-default";
    };
    return (m, g) => (d(), Ge(gt, { to: "body" }, [
      c("div", {
        class: L(["toast-container", e.value])
      }, [
        (d(!0), f(xe, null, Se(U(a).toasts.value, (i) => (d(), f("div", {
          key: i.id,
          class: L(["toast-item", u(i.type, i.variant)])
        }, [
          c("div", Wn, [
            (d(), f("svg", Un, [
              c("path", {
                d: h[i.type],
                fill: "currentColor"
              }, null, 8, Gn)
            ])),
            c("div", Kn, [
              i.title ? (d(), f("div", qn, V(i.title), 1)) : O("", !0),
              c("div", Zn, V(i.message), 1)
            ]),
            c("button", {
              class: "toast-close-btn",
              onClick: (k) => U(a).dismiss(i.id)
            }, [...g[0] || (g[0] = [
              c("svg", {
                class: "toast-close-icon",
                viewBox: "0 0 24 24",
                "aria-hidden": "true"
              }, [
                c("path", {
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
}), Hr = /* @__PURE__ */ de({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const a = t, e = P(!1);
    let h = null;
    const s = () => {
      h = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, l = () => {
      h && (clearTimeout(h), h = null), e.value = !1;
    }, v = b(() => `tooltip-pos-${a.position}`), u = b(() => `tooltip-arrow-${a.position}`), m = b(() => `tooltip-variant-${a.variant}`);
    return (g, i) => (d(), f("span", {
      class: "tooltip-root",
      onMouseenter: s,
      onMouseleave: l,
      onFocus: s,
      onBlur: l
    }, [
      me(g.$slots, "default"),
      ie(ot, { name: "tooltip-fade" }, {
        default: at(() => [
          e.value && t.text ? (d(), f("span", {
            key: 0,
            class: L(["tooltip-content", [v.value, m.value]]),
            role: "tooltip"
          }, [
            Pt(V(t.text) + " ", 1),
            c("span", {
              class: L(["tooltip-arrow", [u.value, m.value]])
            }, null, 2)
          ], 2)) : O("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Xn = { class: "mitreka-pagination" }, Qn = ["disabled"], eo = { class: "pagination-status" }, to = ["disabled"], jr = /* @__PURE__ */ de({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, h = a, s = () => {
      e.page > 1 && h("change", e.page - 1);
    }, l = () => {
      e.page < e.pages && h("change", e.page + 1);
    };
    return (v, u) => (d(), f("div", Xn, [
      c("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: s
      }, [...u[0] || (u[0] = [
        c("span", { class: "hidden sm:inline" }, "Prev", -1),
        c("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Qn),
      c("span", eo, V(t.page) + " / " + V(t.pages), 1),
      c("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: l
      }, [...u[1] || (u[1] = [
        c("span", { class: "hidden sm:inline" }, "Next", -1),
        c("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, to)
    ]));
  }
}), no = { class: "avatar-root" }, oo = ["src", "alt"], Er = /* @__PURE__ */ de({
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
    const a = t, e = P(!1), h = b(() => a.src && !e.value), s = b(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((k) => k[0]).slice(0, 2).join("").toUpperCase() : "?"), l = b(() => `avatar-size-${a.size}`), v = b(() => `avatar-color-${a.color}`), u = b(() => a.status ? `avatar-status-${a.status}` : ""), m = b(() => `avatar-status-size-${a.size}`), g = b(() => a.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (k, M) => (d(), f("span", no, [
      h.value ? (d(), f("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: L(["avatar-img", [l.value, g.value]]),
        onError: i
      }, null, 42, oo)) : (d(), f("span", {
        key: 1,
        class: L(["avatar-fallback", [l.value, v.value, g.value]])
      }, V(s.value), 3)),
      t.status ? (d(), f("span", {
        key: 2,
        class: L(["avatar-status", [u.value, m.value]])
      }, null, 2)) : O("", !0)
    ]));
  }
}), Br = /* @__PURE__ */ de({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = ln(), h = b(() => {
      var m;
      const u = (m = e.default) == null ? void 0 : m.call(e);
      return u ? u.length : 0;
    }), s = b(() => h.value <= a.max ? 0 : h.value - a.max), l = b(() => `avatar-size-${a.size}`), v = b(() => `avatar-group-space-${a.size}`);
    return (u, m) => (d(), f("div", {
      class: L(["avatar-group", v.value])
    }, [
      (d(!0), f(xe, null, Se(t.max, (g, i) => {
        var k, M;
        return d(), f(xe, { key: i }, [
          i < h.value ? (d(), Ge(dn((M = (k = U(e)).default) == null ? void 0 : M.call(k)[i]), { key: 0 })) : O("", !0)
        ], 64);
      }), 128)),
      s.value > 0 ? (d(), f("span", {
        key: 0,
        class: L(["avatar-group-count", l.value])
      }, " +" + V(s.value), 3)) : O("", !0)
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
}, Tr = /* @__PURE__ */ de({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (h) => h === a.items.length - 1;
    return (h, s) => t.items.length ? (d(), f("nav", ao, [
      c("ol", ro, [
        t.showHome ? (d(), f("li", io, [
          c("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, V(t.homeLabel), 9, so)
        ])) : O("", !0),
        (d(!0), f(xe, null, Se(t.items, (l, v) => (d(), f("li", {
          key: v,
          class: "breadcrumbs-item"
        }, [
          s[0] || (s[0] = c("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(v) ? (d(), f("span", fo, V(l.label), 1)) : (d(), f("span", lo, [
            l.href ? (d(), f("a", {
              key: 0,
              href: l.href,
              class: "breadcrumbs-link"
            }, V(l.label), 9, co)) : (d(), f("span", uo, V(l.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : O("", !0);
  }
}), ho = { class: "mitreka-stat-card" }, po = {
  key: 0,
  class: "stat-icon"
}, go = { class: "stat-content" }, vo = { class: "stat-label" }, mo = { class: "stat-value" }, Ar = /* @__PURE__ */ de({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (d(), f("div", ho, [
      t.icon ? (d(), f("div", po, V(t.icon), 1)) : O("", !0),
      c("div", go, [
        c("div", vo, V(t.label), 1),
        c("div", mo, V(t.value), 1)
      ])
    ]));
  }
}), wo = { class: "mitreka-page-header" }, ko = { class: "page-header-title-row" }, xo = { class: "page-header-title" }, yo = {
  key: 0,
  class: "page-header-desc"
}, Ir = /* @__PURE__ */ de({
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
      const s = a.category.toLowerCase();
      return e[s] || "badge-soft-primary";
    });
    return (s, l) => (d(), f("header", wo, [
      c("div", ko, [
        c("h1", xo, V(t.title), 1),
        t.category ? (d(), f("span", {
          key: 0,
          class: L(["badge page-header-badge", h.value])
        }, V(t.category), 3)) : O("", !0)
      ]),
      t.description ? (d(), f("p", yo, V(t.description), 1)) : O("", !0)
    ]));
  }
}), bo = { class: "mitreka-theme-switcher" }, Mo = ["value"], Lr = /* @__PURE__ */ de({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: h } = fn("light"), s = b(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), l = (v) => {
      e(v === "mitrekadark" ? "dark" : "light");
    };
    return (v, u) => (d(), f("div", bo, [
      c("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: u[0] || (u[0] = //@ts-ignore
        (...m) => U(h) && U(h)(...m))
      }, " Toggle: " + V(s.value), 1),
      c("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: s.value,
        onChange: u[1] || (u[1] = (m) => l(m.target.value))
      }, [...u[2] || (u[2] = [
        c("option", { value: "mitrekalight" }, "mitrekalight", -1),
        c("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, Mo)
    ]));
  }
}), Co = { class: "sidebar-header" }, Do = {
  key: 0,
  class: "sidebar-search"
}, $o = ["placeholder"], So = { class: "sidebar-nav" }, _o = ["href", "title", "onClick"], Ho = { class: "sidebar-icon" }, jo = { class: "sidebar-icon-text" }, Eo = {
  key: 0,
  class: "sidebar-label"
}, Bo = ["title", "onClick"], To = { class: "sidebar-icon" }, Ao = { class: "sidebar-icon-text" }, Io = {
  key: 0,
  class: "sidebar-label"
}, Lo = ["href", "title", "onClick"], zo = { class: "sidebar-icon" }, Fo = { class: "sidebar-icon-text" }, Oo = {
  key: 0,
  class: "sidebar-label"
}, zr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = P(""), l = cn({});
    e.defaultOpenIds.forEach((k) => {
      l[k] = !0;
    });
    const v = (k) => !e.activeHref || !k.href ? !1 : k.exact ? e.activeHref === k.href : e.activeHref.startsWith(k.href), u = (k) => {
      var S;
      if (!k.children) return !1;
      if (s.value.trim()) return !0;
      const M = l[k.id], w = ((S = k.children) == null ? void 0 : S.some(v)) ?? !1;
      return M === void 0 && w && (l[k.id] = !0), l[k.id] ?? w;
    }, m = (k) => {
      const M = !u(k);
      l[k.id] = M, h("toggle", k.id, M);
    }, g = b(() => {
      const k = s.value.toLowerCase().trim();
      return k ? e.items.map((M) => {
        if (M.children) {
          const w = M.children.filter(
            (S) => S.label.toLowerCase().includes(k)
          );
          return M.label.toLowerCase().includes(k) ? M : w.length > 0 ? { ...M, children: w } : null;
        }
        return M.label.toLowerCase().includes(k) ? M : null;
      }).filter(Boolean) : e.items;
    }), i = (k) => {
      h("navigate", k), s.value = "";
    };
    return (k, M) => (d(), f("aside", {
      class: L(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      c("div", Co, [
        me(k.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (d(), f("div", Do, [
        It(c("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": M[0] || (M[0] = (w) => s.value = w)
        }, null, 8, $o), [
          [Lt, s.value]
        ]),
        s.value ? (d(), f("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: M[1] || (M[1] = (w) => s.value = "")
        }, " × ")) : O("", !0)
      ])) : O("", !0),
      c("nav", So, [
        (d(!0), f(xe, null, Se(g.value, (w) => (d(), f(xe, {
          key: w.id
        }, [
          w.children ? (d(), f(xe, { key: 1 }, [
            c("button", {
              class: L(["sidebar-item sidebar-group", u(w) ? "is-open" : ""]),
              title: t.collapsed ? w.label : void 0,
              onClick: (S) => m(w)
            }, [
              c("span", To, [
                me(k.$slots, "icon", { item: w }, () => [
                  c("span", Ao, V(w.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? O("", !0) : (d(), f("span", Io, V(w.label), 1)),
              t.collapsed ? O("", !0) : (d(), f("span", {
                key: 1,
                class: L(["sidebar-caret", u(w) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Bo),
            u(w) ? (d(), f("div", {
              key: 0,
              class: L(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (d(!0), f(xe, null, Se(w.children, (S) => (d(), f("a", {
                key: S.id,
                class: L(["sidebar-item sidebar-child", v(S) ? "is-active" : ""]),
                href: S.href || "#",
                title: t.collapsed ? S.label : void 0,
                onClick: ee((T) => i(S), ["prevent"])
              }, [
                c("span", zo, [
                  me(k.$slots, "icon", { item: S }, () => [
                    c("span", Fo, V(S.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? O("", !0) : (d(), f("span", Oo, V(S.label), 1))
              ], 10, Lo))), 128))
            ], 2)) : O("", !0)
          ], 64)) : (d(), f("a", {
            key: 0,
            class: L(["sidebar-item", v(w) ? "is-active" : ""]),
            href: w.href || "#",
            title: t.collapsed ? w.label : void 0,
            onClick: ee((S) => i(w), ["prevent"])
          }, [
            c("span", Ho, [
              me(k.$slots, "icon", { item: w }, () => [
                c("span", jo, V(w.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? O("", !0) : (d(), f("span", Eo, V(w.label), 1))
          ], 10, _o))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Rt = {
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
}, Fr = (t) => Rt[t], No = ["innerHTML"], Vo = {
  key: 1,
  class: "mitreka-icon-fallback"
}, ke = /* @__PURE__ */ de({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = b(() => a.class || "w-5 h-5"), h = b(() => Rt[a.name]), s = b(
      () => h.value ? h.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (l, v) => h.value ? (d(), f("span", {
      key: 0,
      innerHTML: s.value,
      class: "inline-flex"
    }, null, 8, No)) : (d(), f("span", Vo, "?"));
  }
});
var jt = [
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
function Nt(t, a) {
  var e;
  return function() {
    var h = this, s = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(h, s);
    }, a);
  };
}
var Et = function(t) {
  return t instanceof Array ? t : [t];
};
function je(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function oe(t, a, e) {
  var h = window.document.createElement(t);
  return a = a || "", e = e || "", h.className = a, e !== void 0 && (h.textContent = e), h;
}
function $t(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Wt(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return Wt(t.parentNode, a);
}
function St(t, a) {
  var e = oe("div", "numInputWrapper"), h = oe("input", "numInput " + t), s = oe("span", "arrowUp"), l = oe("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? h.type = "number" : (h.type = "text", h.pattern = "\\d*"), a !== void 0)
    for (var v in a)
      h.setAttribute(v, a[v]);
  return e.appendChild(h), e.appendChild(s), e.appendChild(l), e;
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
}, Po = {
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
    var h = parseInt(a), s = new Date(t.getFullYear(), 0, 2 + (h - 1) * 7, 0, 0, 0, 0);
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
}, Ut = function(t) {
  var a = t.config, e = a === void 0 ? ut : a, h = t.l10n, s = h === void 0 ? yt : h, l = t.isMobile, v = l === void 0 ? !1 : l;
  return function(u, m, g) {
    var i = g || s;
    return e.formatDate !== void 0 && !v ? e.formatDate(u, m, i) : m.split("").map(function(k, M, w) {
      return xt[k] && w[M - 1] !== "\\" ? xt[k](u, i, e) : k !== "\\" ? k : "";
    }).join("");
  };
}, zt = function(t) {
  var a = t.config, e = a === void 0 ? ut : a, h = t.l10n, s = h === void 0 ? yt : h;
  return function(l, v, u, m) {
    if (!(l !== 0 && !l)) {
      var g = m || s, i, k = l;
      if (l instanceof Date)
        i = new Date(l.getTime());
      else if (typeof l != "string" && l.toFixed !== void 0)
        i = new Date(l);
      else if (typeof l == "string") {
        var M = v || (e || ut).dateFormat, w = String(l).trim();
        if (w === "today")
          i = /* @__PURE__ */ new Date(), u = !0;
        else if (e && e.parseDate)
          i = e.parseDate(l, M);
        else if (/Z$/.test(w) || /GMT$/.test(w))
          i = new Date(l);
        else {
          for (var S = void 0, T = [], Z = 0, te = 0, $ = ""; Z < M.length; Z++) {
            var j = M[Z], E = j === "\\", ae = M[Z - 1] === "\\" || E;
            if (nt[j] && !ae) {
              $ += nt[j];
              var ce = new RegExp($).exec(l);
              ce && (S = !0) && T[j !== "Y" ? "push" : "unshift"]({
                fn: Po[j],
                val: ce[++te]
              });
            } else E || ($ += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), T.forEach(function(pe) {
            var fe = pe.fn, ge = pe.val;
            return i = fe(i, ge, g) || i;
          }), i = S ? i : void 0;
        }
      }
      if (!(i instanceof Date && !isNaN(i.getTime()))) {
        e.errorHandler(new Error("Invalid date provided: " + k));
        return;
      }
      return u === !0 && i.setHours(0, 0, 0, 0), i;
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
function At(t) {
  var a = t.defaultHour, e = t.defaultMinute, h = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var s = t.minDate.getHours(), l = t.minDate.getMinutes(), v = t.minDate.getSeconds();
    a < s && (a = s), a === s && e < l && (e = l), a === s && e === l && h < v && (h = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var u = t.maxDate.getHours(), m = t.maxDate.getMinutes();
    a = Math.min(a, u), a === u && (e = Math.min(m, e)), a === u && e === m && (h = t.maxDate.getSeconds());
  }
  return { hours: a, minutes: e, seconds: h };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var a = [], e = 1; e < arguments.length; e++)
    a[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var h = function(u) {
    u && Object.keys(u).forEach(function(m) {
      return t[m] = u[m];
    });
  }, s = 0, l = a; s < l.length; s++) {
    var v = l[s];
    h(v);
  }
  return t;
});
var $e = function() {
  return $e = Object.assign || function(t) {
    for (var a, e = 1, h = arguments.length; e < h; e++) {
      a = arguments[e];
      for (var s in a) Object.prototype.hasOwnProperty.call(a, s) && (t[s] = a[s]);
    }
    return t;
  }, $e.apply(this, arguments);
}, Vt = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var h = Array(t), s = 0, a = 0; a < e; a++)
    for (var l = arguments[a], v = 0, u = l.length; v < u; v++, s++)
      h[s] = l[v];
  return h;
}, Uo = 300;
function Go(t, a) {
  var e = {
    config: $e($e({}, ut), be.defaultConfig),
    l10n: yt
  };
  e.parseDate = zt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = T, e._setHoursFromDate = M, e._positionCalendar = Je, e.changeMonth = R, e.changeYear = ye, e.clear = X, e.close = I, e.onMouseOver = Fe, e._createElement = oe, e.createDay = ce, e.destroy = re, e.isEnabled = _e, e.jumpToDate = $, e.updateValue = Ae, e.open = it, e.redraw = Mt, e.set = Ct, e.setDate = Dt, e.toggle = Ke;
  function h() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function s() {
    e.element = e.input = t, e.isOpen = !1, Ee(), bt(), K(), Q(), h(), e.isMobile || ae(), te(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && M(e.config.noCalendar ? e.latestSelectedDateObj : void 0), Ae(!1)), u();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && Je(), le("onReady");
  }
  function l() {
    var n;
    return ((n = e.calendarContainer) === null || n === void 0 ? void 0 : n.getRootNode()).activeElement || document.activeElement;
  }
  function v(n) {
    return n.bind(e);
  }
  function u() {
    var n = e.config;
    n.weekNumbers === !1 && n.showMonths === 1 || n.noCalendar !== !0 && window.requestAnimationFrame(function() {
      if (e.calendarContainer !== void 0 && (e.calendarContainer.style.visibility = "hidden", e.calendarContainer.style.display = "block"), e.daysContainer !== void 0) {
        var o = (e.days.offsetWidth + 1) * n.showMonths;
        e.daysContainer.style.width = o + "px", e.calendarContainer.style.width = o + (e.weekWrapper !== void 0 ? e.weekWrapper.offsetWidth : 0) + "px", e.calendarContainer.style.removeProperty("visibility"), e.calendarContainer.style.removeProperty("display");
      }
    });
  }
  function m(n) {
    if (e.selectedDates.length === 0) {
      var o = e.config.minDate === void 0 || ze(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = At(e.config);
      o.setHours(r.hours, r.minutes, r.seconds, o.getMilliseconds()), e.selectedDates = [o], e.latestSelectedDateObj = o;
    }
    n !== void 0 && n.type !== "blur" && qt(n);
    var p = e._input.value;
    k(), Ae(), e._input.value !== p && e._debouncedChange();
  }
  function g(n, o) {
    return n % 12 + 12 * Ne(o === e.l10n.amPM[1]);
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
  function k() {
    if (!(e.hourElement === void 0 || e.minuteElement === void 0)) {
      var n = (parseInt(e.hourElement.value.slice(-2), 10) || 0) % 24, o = (parseInt(e.minuteElement.value, 10) || 0) % 60, r = e.secondElement !== void 0 ? (parseInt(e.secondElement.value, 10) || 0) % 60 : 0;
      e.amPM !== void 0 && (n = g(n, e.amPM.textContent));
      var p = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && ze(e.latestSelectedDateObj, e.config.minDate, !0) === 0, y = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && ze(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var H = Tt(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), G = Tt(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), z = Tt(n, o, r);
        if (z > G && z < H) {
          var q = Ro(H);
          n = q[0], o = q[1], r = q[2];
        }
      } else {
        if (y) {
          var A = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, A.getHours()), n === A.getHours() && (o = Math.min(o, A.getMinutes())), o === A.getMinutes() && (r = Math.min(r, A.getSeconds()));
        }
        if (p) {
          var W = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, W.getHours()), n === W.getHours() && o < W.getMinutes() && (o = W.getMinutes()), o === W.getMinutes() && (r = Math.max(r, W.getSeconds()));
        }
      }
      w(n, o, r);
    }
  }
  function M(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && w(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function w(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Be(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Ne(n % 12 === 0)), e.minuteElement.value = Be(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Ne(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Be(r)));
  }
  function S(n) {
    var o = Le(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && ye(r);
  }
  function T(n, o, r, p) {
    if (o instanceof Array)
      return o.forEach(function(y) {
        return T(n, y, r, p);
      });
    if (n instanceof Array)
      return n.forEach(function(y) {
        return T(y, o, r, p);
      });
    n.addEventListener(o, r, p), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, p);
      }
    });
  }
  function Z() {
    le("onChange");
  }
  function te() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(p) {
        return T(p, "click", e[r]);
      });
    }), e.isMobile) {
      Te();
      return;
    }
    var n = Nt(vt, 50);
    if (e._debouncedChange = Nt(Z, Uo), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && T(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Fe(Le(r));
    }), T(e._input, "keydown", Ze), e.calendarContainer !== void 0 && T(e.calendarContainer, "keydown", Ze), !e.config.inline && !e.config.static && T(window, "resize", n), window.ontouchstart !== void 0 ? T(window.document, "touchstart", De) : T(window.document, "mousedown", De), T(window.document, "focus", De, { capture: !0 }), e.config.clickOpens === !0 && (T(e._input, "focus", e.open), T(e._input, "click", e.open)), e.daysContainer !== void 0 && (T(e.monthNav, "click", dt), T(e.monthNav, ["keyup", "increment"], S), T(e.daysContainer, "click", wt)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return Le(r).select();
      };
      T(e.timeContainer, ["increment"], m), T(e.timeContainer, "blur", m, { capture: !0 }), T(e.timeContainer, "click", j), T([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && T(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && T(e.amPM, "click", function(r) {
        m(r);
      });
    }
    e.config.allowInput && T(e._input, "blur", Ye);
  }
  function $(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), p = e.currentYear, y = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (H) {
      H.message = "Invalid date supplied: " + r, e.config.errorHandler(H);
    }
    o && e.currentYear !== p && (le("onYearChange"), x()), o && (e.currentYear !== p || e.currentMonth !== y) && le("onMonthChange"), e.redraw();
  }
  function j(n) {
    var o = Le(n);
    ~o.className.indexOf("arrow") && E(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function E(n, o, r) {
    var p = n && Le(n), y = r || p && p.parentNode && p.parentNode.firstChild, H = Re("increment");
    H.delta = o, y && y.dispatchEvent(H);
  }
  function ae() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = oe("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(we()), e.innerContainer = oe("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = D(), r = o.weekWrapper, p = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = p, e.weekWrapper = r;
      }
      e.rContainer = oe("div", "flatpickr-rContainer"), e.rContainer.appendChild(N()), e.daysContainer || (e.daysContainer = oe("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), C(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(se()), je(e.calendarContainer, "rangeMode", e.config.mode === "range"), je(e.calendarContainer, "animate", e.config.animate === !0), je(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var y = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!y && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var H = oe("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(H, e.element), H.appendChild(e.element), e.altInput && H.appendChild(e.altInput), H.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function ce(n, o, r, p) {
    var y = _e(o, !0), H = oe("span", n, o.getDate().toString());
    return H.dateObj = o, H.$i = p, H.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && ze(o, e.now) === 0 && (e.todayDateElem = H, H.classList.add("today"), H.setAttribute("aria-current", "date")), y ? (H.tabIndex = -1, Ue(o) && (H.classList.add("selected"), e.selectedDateElem = H, e.config.mode === "range" && (je(H, "startRange", e.selectedDates[0] && ze(o, e.selectedDates[0], !0) === 0), je(H, "endRange", e.selectedDates[1] && ze(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && H.classList.add("inRange")))) : H.classList.add("flatpickr-disabled"), e.config.mode === "range" && Oe(o) && !Ue(o) && H.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && p % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), le("onDayCreate", H), H;
  }
  function pe(n) {
    n.focus(), e.config.mode === "range" && Fe(n);
  }
  function fe(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, p = o; p != r; p += n)
      for (var y = e.daysContainer.children[p], H = n > 0 ? 0 : y.children.length - 1, G = n > 0 ? y.children.length : -1, z = H; z != G; z += n) {
        var q = y.children[z];
        if (q.className.indexOf("hidden") === -1 && _e(q.dateObj))
          return q;
      }
  }
  function ge(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, p = o > 0 ? e.config.showMonths : -1, y = o > 0 ? 1 : -1, H = r - e.currentMonth; H != p; H += y)
      for (var G = e.daysContainer.children[H], z = r - e.currentMonth === H ? n.$i + o : o < 0 ? G.children.length - 1 : 0, q = G.children.length, A = z; A >= 0 && A < q && A != (o > 0 ? q : -1); A += y) {
        var W = G.children[A];
        if (W.className.indexOf("hidden") === -1 && _e(W.dateObj) && Math.abs(n.$i - A) >= Math.abs(o))
          return pe(W);
      }
    e.changeMonth(y), B(fe(y), 0);
  }
  function B(n, o) {
    var r = l(), p = He(r || document.body), y = n !== void 0 ? n : p ? r : e.selectedDateElem !== void 0 && He(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && He(e.todayDateElem) ? e.todayDateElem : fe(o > 0 ? 1 : -1);
    y === void 0 ? e._input.focus() : p ? ge(y, o) : pe(y);
  }
  function _(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, p = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), y = e.utils.getDaysInMonth(o, n), H = window.document.createDocumentFragment(), G = e.config.showMonths > 1, z = G ? "prevMonthDay hidden" : "prevMonthDay", q = G ? "nextMonthDay hidden" : "nextMonthDay", A = p + 1 - r, W = 0; A <= p; A++, W++)
      H.appendChild(ce("flatpickr-day " + z, new Date(n, o - 1, A), A, W));
    for (A = 1; A <= y; A++, W++)
      H.appendChild(ce("flatpickr-day", new Date(n, o, A), A, W));
    for (var ue = y + 1; ue <= 42 - r && (e.config.showMonths === 1 || W % 7 !== 0); ue++, W++)
      H.appendChild(ce("flatpickr-day " + q, new Date(n, o + 1, ue % y), ue, W));
    var We = oe("div", "dayContainer");
    return We.appendChild(H), We;
  }
  function C() {
    if (e.daysContainer !== void 0) {
      $t(e.daysContainer), e.weekNumbers && $t(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(_(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Fe();
    }
  }
  function x() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(p) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && p < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && p > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = oe("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = _t(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function F() {
    var n = oe("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = oe("span", "cur-month") : (e.monthsDropdownContainer = oe("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), T(e.monthsDropdownContainer, "change", function(G) {
      var z = Le(G), q = parseInt(z.value, 10);
      e.changeMonth(q - e.currentMonth), le("onMonthChange");
    }), x(), r = e.monthsDropdownContainer);
    var p = St("cur-year", { tabindex: "-1" }), y = p.getElementsByTagName("input")[0];
    y.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && y.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (y.setAttribute("max", e.config.maxDate.getFullYear().toString()), y.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var H = oe("div", "flatpickr-current-month");
    return H.appendChild(r), H.appendChild(p), o.appendChild(H), n.appendChild(o), {
      container: n,
      yearElement: y,
      monthElement: r
    };
  }
  function Y() {
    $t(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var o = F();
      e.yearElements.push(o.yearElement), e.monthElements.push(o.monthElement), e.monthNav.appendChild(o.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function we() {
    return e.monthNav = oe("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = oe("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = oe("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, Y(), Object.defineProperty(e, "_hidePrevMonthArrow", {
      get: function() {
        return e.__hidePrevMonthArrow;
      },
      set: function(n) {
        e.__hidePrevMonthArrow !== n && (je(e.prevMonthNav, "flatpickr-disabled", n), e.__hidePrevMonthArrow = n);
      }
    }), Object.defineProperty(e, "_hideNextMonthArrow", {
      get: function() {
        return e.__hideNextMonthArrow;
      },
      set: function(n) {
        e.__hideNextMonthArrow !== n && (je(e.nextMonthNav, "flatpickr-disabled", n), e.__hideNextMonthArrow = n);
      }
    }), e.currentYearElement = e.yearElements[0], tt(), e.monthNav;
  }
  function se() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = At(e.config);
    e.timeContainer = oe("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = oe("span", "flatpickr-time-separator", ":"), r = St("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var p = St("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = p.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Be(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = Be(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(p), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var y = St("flatpickr-second");
      e.secondElement = y.getElementsByTagName("input")[0], e.secondElement.value = Be(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(oe("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(y);
    }
    return e.config.time_24hr || (e.amPM = oe("span", "flatpickr-am-pm", e.l10n.amPM[Ne((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function N() {
    e.weekdayContainer ? $t(e.weekdayContainer) : e.weekdayContainer = oe("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = oe("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return he(), e.weekdayContainer;
  }
  function he() {
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
  function D() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = oe("div", "flatpickr-weekwrapper");
    n.appendChild(oe("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = oe("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function R(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, le("onYearChange"), x()), C(), le("onMonthChange"), tt());
  }
  function X(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = At(e.config), p = r.hours, y = r.minutes, H = r.seconds;
      w(p, y, H);
    }
    e.redraw(), n && le("onChange");
  }
  function I() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), le("onClose");
  }
  function re() {
    e.config !== void 0 && le("onDestroy");
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
  function ne(n) {
    return e.calendarContainer.contains(n);
  }
  function De(n) {
    if (e.isOpen && !e.config.inline) {
      var o = Le(n), r = ne(o), p = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), y = !p && !r && !ne(n.relatedTarget), H = !e.config.ignoredFocusElements.some(function(G) {
        return G.contains(o);
      });
      y && H && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && m(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function ye(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), le("onYearChange"), x());
    }
  }
  function _e(n, o) {
    var r;
    o === void 0 && (o = !0);
    var p = e.parseDate(n, void 0, o);
    if (e.config.minDate && p && ze(p, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && p && ze(p, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (p === void 0)
      return !1;
    for (var y = !!e.config.enable, H = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, G = 0, z = void 0; G < H.length; G++) {
      if (z = H[G], typeof z == "function" && z(p))
        return y;
      if (z instanceof Date && p !== void 0 && z.getTime() === p.getTime())
        return y;
      if (typeof z == "string") {
        var q = e.parseDate(z, void 0, !0);
        return q && q.getTime() === p.getTime() ? y : !y;
      } else if (typeof z == "object" && p !== void 0 && z.from && z.to && p.getTime() >= z.from.getTime() && p.getTime() <= z.to.getTime())
        return y;
    }
    return !y;
  }
  function He(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Ye(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== qe();
    o && r && !(n.relatedTarget && ne(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ze(n) {
    var o = Le(n), r = e.config.wrap ? t.contains(o) : o === e._input, p = e.config.allowInput, y = e.isOpen && (!p || !r), H = e.config.inline && r && !p;
    if (n.keyCode === 13 && r) {
      if (p)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (ne(o) || y || H) {
      var G = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          G ? (n.preventDefault(), m(), lt()) : wt(n);
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
          if (!G && !r) {
            n.preventDefault();
            var z = l();
            if (e.daysContainer !== void 0 && (p === !1 || z && He(z))) {
              var q = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), R(q), B(fe(1), 0)) : B(void 0, q);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var A = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), ye(e.currentYear - A), B(fe(1), 0)) : G || B(void 0, A * 7) : o === e.currentYearElement ? ye(e.currentYear - A) : e.config.enableTime && (!G && e.hourElement && e.hourElement.focus(), m(n), e._debouncedChange());
          break;
        case 9:
          if (G) {
            var W = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Ie) {
              return Ie;
            }), ue = W.indexOf(o);
            if (ue !== -1) {
              var We = W[ue + (n.shiftKey ? -1 : 1)];
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
          e.amPM.textContent = e.l10n.amPM[0], k(), Ae();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], k(), Ae();
          break;
      }
    (r || ne(o)) && le("onKeyDown", n);
  }
  function Fe(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), p = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), y = Math.min(r, e.selectedDates[0].getTime()), H = Math.max(r, e.selectedDates[0].getTime()), G = !1, z = 0, q = 0, A = y; A < H; A += Wo.DAY)
        _e(new Date(A), !0) || (G = G || A > y && A < H, A < p && (!z || A > z) ? z = A : A > p && (!q || A < q) && (q = A));
      var W = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      W.forEach(function(ue) {
        var We = ue.dateObj, Ie = We.getTime(), kt = z > 0 && Ie < z || q > 0 && Ie > q;
        if (kt) {
          ue.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(ct) {
            ue.classList.remove(ct);
          });
          return;
        } else if (G && !kt)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(ct) {
          ue.classList.remove(ct);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), p < r && Ie === p ? ue.classList.add("startRange") : p > r && Ie === p && ue.classList.add("endRange"), Ie >= z && (q === 0 || Ie <= q) && Yo(Ie, p, r) && ue.classList.add("inRange"));
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
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), le("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var p = e.isOpen;
    e.isOpen = !0, p || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), le("onOpen"), Je(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function Pe(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), p = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(y) {
        return _e(y);
      }), !e.selectedDates.length && n === "min" && M(r), Ae()), e.daysContainer && (Mt(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!p && r !== void 0 && p.getFullYear() === r.getFullYear());
    };
  }
  function Ee() {
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
    ], o = $e($e({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(W) {
        e.config._enable = J(W);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(W) {
        e.config._disable = J(W);
      }
    });
    var p = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || p)) {
      var y = be.defaultConfig.dateFormat || ut.dateFormat;
      r.dateFormat = o.noCalendar || p ? "H:i" + (o.enableSeconds ? ":S" : "") : y + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || p) && !o.altFormat) {
      var H = be.defaultConfig.altFormat || ut.altFormat;
      r.altFormat = o.noCalendar || p ? "h:i" + (o.enableSeconds ? ":S K" : " K") : H + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
    }
    Object.defineProperty(e.config, "minDate", {
      get: function() {
        return e.config._minDate;
      },
      set: Pe("min")
    }), Object.defineProperty(e.config, "maxDate", {
      get: function() {
        return e.config._maxDate;
      },
      set: Pe("max")
    });
    var G = function(W) {
      return function(ue) {
        e.config[W === "min" ? "_minTime" : "_maxTime"] = e.parseDate(ue, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: G("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: G("max")
    }), o.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, o);
    for (var z = 0; z < n.length; z++)
      e.config[n[z]] = e.config[n[z]] === !0 || e.config[n[z]] === "true";
    jt.filter(function(W) {
      return e.config[W] !== void 0;
    }).forEach(function(W) {
      e.config[W] = Et(e.config[W] || []).map(v);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var z = 0; z < e.config.plugins.length; z++) {
      var q = e.config.plugins[z](e) || {};
      for (var A in q)
        jt.indexOf(A) > -1 ? e.config[A] = Et(q[A]).map(v).concat(e.config[A]) : typeof o[A] > "u" && (e.config[A] = q[A]);
    }
    o.altInputClass || (e.config.altInputClass = mt().className + " " + e.config.altInputClass), le("onParseConfig");
  }
  function mt() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function bt() {
    typeof e.config.locale != "object" && typeof be.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = $e($e({}, be.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? be.l10ns[e.config.locale] : void 0), nt.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", nt.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", nt.M = "(" + e.l10n.months.shorthand.join("|") + ")", nt.F = "(" + e.l10n.months.longhand.join("|") + ")", nt.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = $e($e({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && be.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Ut(e), e.parseDate = zt({ config: e.config, l10n: e.l10n });
  }
  function Je(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      le("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(on, an) {
        return on + an.offsetHeight;
      }, 0), p = e.calendarContainer.offsetWidth, y = e.config.position.split(" "), H = y[0], G = y.length > 1 ? y[1] : null, z = o.getBoundingClientRect(), q = window.innerHeight - z.bottom, A = H === "above" || H !== "below" && q < r && z.top > r, W = window.pageYOffset + z.top + (A ? -r - 2 : o.offsetHeight + 2);
      if (je(e.calendarContainer, "arrowTop", !A), je(e.calendarContainer, "arrowBottom", A), !e.config.inline) {
        var ue = window.pageXOffset + z.left, We = !1, Ie = !1;
        G === "center" ? (ue -= (p - z.width) / 2, We = !0) : G === "right" && (ue -= p - z.width, Ie = !0), je(e.calendarContainer, "arrowLeft", !We && !Ie), je(e.calendarContainer, "arrowCenter", We), je(e.calendarContainer, "arrowRight", Ie);
        var kt = window.document.body.offsetWidth - (window.pageXOffset + z.right), ct = ue + p > window.document.body.offsetWidth, Zt = kt + p > window.document.body.offsetWidth;
        if (je(e.calendarContainer, "rightMost", ct), !e.config.static)
          if (e.calendarContainer.style.top = W + "px", !ct)
            e.calendarContainer.style.left = ue + "px", e.calendarContainer.style.right = "auto";
          else if (!Zt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = kt + "px";
          else {
            var Ht = Xe();
            if (Ht === void 0)
              return;
            var Jt = window.document.body.offsetWidth, Xt = Math.max(0, Jt / 2 - p / 2), Qt = ".flatpickr-calendar.centerMost:before", en = ".flatpickr-calendar.centerMost:after", tn = Ht.cssRules.length, nn = "{left:" + z.left + "px;right:auto;}";
            je(e.calendarContainer, "rightMost", !1), je(e.calendarContainer, "centerMost", !0), Ht.insertRule(Qt + "," + en + nn, tn), e.calendarContainer.style.left = Xt + "px", e.calendarContainer.style.right = "auto";
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
    e.config.noCalendar || e.isMobile || (x(), tt(), C());
  }
  function lt() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function wt(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(W) {
      return W.classList && W.classList.contains("flatpickr-day") && !W.classList.contains("flatpickr-disabled") && !W.classList.contains("notAllowed");
    }, r = Wt(Le(n), o);
    if (r !== void 0) {
      var p = r, y = e.latestSelectedDateObj = new Date(p.dateObj.getTime()), H = (y.getMonth() < e.currentMonth || y.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = p, e.config.mode === "single")
        e.selectedDates = [y];
      else if (e.config.mode === "multiple") {
        var G = Ue(y);
        G ? e.selectedDates.splice(parseInt(G), 1) : e.selectedDates.push(y);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = y, e.selectedDates.push(y), ze(y, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(W, ue) {
        return W.getTime() - ue.getTime();
      }));
      if (k(), H) {
        var z = e.currentYear !== y.getFullYear();
        e.currentYear = y.getFullYear(), e.currentMonth = y.getMonth(), z && (le("onYearChange"), x()), le("onMonthChange");
      }
      if (tt(), C(), Ae(), !H && e.config.mode !== "range" && e.config.showMonths === 1 ? pe(p) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var q = e.config.mode === "single" && !e.config.enableTime, A = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (q || A) && lt();
      }
      Z();
    }
  }
  var Qe = {
    locale: [bt, he],
    showMonths: [Y, u, N],
    minDate: [$],
    maxDate: [$],
    positionElement: [Ce],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (T(e._input, "focus", e.open), T(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
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
      }) : jt.indexOf(n) > -1 && (e.config[n] = Et(o));
    e.redraw(), Ae(!0);
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
      return p instanceof Date && _e(p, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(p, y) {
      return p.getTime() - y.getTime();
    });
  }
  function Dt(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    et(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), $(void 0, o), M(), e.selectedDates.length === 0 && e.clear(!1), Ae(o), o && le("onChange");
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
  function Q() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && et(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function K() {
    if (e.input = mt(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = oe(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), Ce();
  }
  function Ce() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function Te() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = oe("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    T(e.mobileInput, "change", function(o) {
      e.setDate(Le(o).value, !1, e.mobileFormatStr), le("onChange"), le("onClose");
    });
  }
  function Ke(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function le(n, o) {
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
    }).filter(function(r, p, y) {
      return e.config.mode !== "range" || e.config.enableTime || y.indexOf(r) === p;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function Ae(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = qe(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = qe(e.config.altFormat)), n !== !1 && le("onValueUpdate");
  }
  function dt(n) {
    var o = Le(n), r = e.prevMonthNav.contains(o), p = e.nextMonthNav.contains(o);
    r || p ? R(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function qt(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = Le(n), p = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[Ne(e.amPM.textContent === e.l10n.amPM[0])]);
    var y = parseFloat(p.getAttribute("min")), H = parseFloat(p.getAttribute("max")), G = parseFloat(p.getAttribute("step")), z = parseInt(p.value, 10), q = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), A = z + G * q;
    if (typeof p.value < "u" && p.value.length === 2) {
      var W = p === e.hourElement, ue = p === e.minuteElement;
      A < y ? (A = H + A + Ne(!W) + (Ne(W) && Ne(!e.amPM)), ue && E(void 0, -1, e.hourElement)) : A > H && (A = p === e.hourElement ? A - H - Ne(!e.amPM) : y, ue && E(void 0, 1, e.hourElement)), e.amPM && W && (G === 1 ? A + z === 23 : Math.abs(A - z) > G) && (e.amPM.textContent = e.l10n.amPM[Ne(e.amPM.textContent === e.l10n.amPM[0])]), p.value = Be(A);
    }
  }
  return s(), e;
}
function ft(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(v) {
    return v instanceof HTMLElement;
  }), h = [], s = 0; s < e.length; s++) {
    var l = e[s];
    try {
      if (l.getAttribute("data-fp-omit") !== null)
        continue;
      l._flatpickr !== void 0 && (l._flatpickr.destroy(), l._flatpickr = void 0), l._flatpickr = Go(l, a || {}), h.push(l._flatpickr);
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
var be = function(t, a) {
  return typeof t == "string" ? ft(window.document.querySelectorAll(t), a) : t instanceof Node ? ft([t], a) : ft(t, a);
};
be.defaultConfig = {};
be.l10ns = {
  en: $e({}, yt),
  default: $e({}, yt)
};
be.localize = function(t) {
  be.l10ns.default = $e($e({}, be.l10ns.default), t);
};
be.setDefaults = function(t) {
  be.defaultConfig = $e($e({}, be.defaultConfig), t);
};
be.parseDate = zt({});
be.formatDate = Ut({});
be.compareDates = ze;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return ft(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = be);
var Ko = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qo(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Gt = { exports: {} };
(function(t, a) {
  (function(e, h) {
    t.exports = h();
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
      return e = Object.assign || function(g) {
        for (var i, k = 1, M = arguments.length; k < M; k++) {
          i = arguments[k];
          for (var w in i) Object.prototype.hasOwnProperty.call(i, w) && (g[w] = i[w]);
        }
        return g;
      }, e.apply(this, arguments);
    }, h = function(m, g, i) {
      return i.months[g ? "shorthand" : "longhand"][m];
    };
    function s(m) {
      for (; m.firstChild; )
        m.removeChild(m.firstChild);
    }
    function l(m) {
      try {
        if (typeof m.composedPath == "function") {
          var g = m.composedPath();
          return g[0];
        }
        return m.target;
      } catch {
        return m.target;
      }
    }
    var v = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function u(m) {
      var g = e(e({}, v), m);
      return function(i) {
        i.config.dateFormat = g.dateFormat, i.config.altFormat = g.altFormat;
        var k = { monthsContainer: null };
        function M() {
          if (i.rContainer) {
            s(i.rContainer);
            for (var B = 0; B < i.monthElements.length; B++) {
              var _ = i.monthElements[B];
              _.parentNode && _.parentNode.removeChild(_);
            }
          }
        }
        function w() {
          i.rContainer && (k.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), k.monthsContainer.tabIndex = -1, S(), i.rContainer.appendChild(k.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + g.theme));
        }
        function S() {
          if (k.monthsContainer) {
            s(k.monthsContainer);
            for (var B = document.createDocumentFragment(), _ = 0; _ < 12; _++) {
              var C = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, _), 0, _);
              C.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && C.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && C.classList.add("today"), C.textContent = h(_, g.shorthand, i.l10n), C.addEventListener("click", $), B.appendChild(C);
            }
            k.monthsContainer.appendChild(B), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function T() {
          i._bind(i.prevMonthNav, "click", function(B) {
            B.preventDefault(), B.stopPropagation(), i.changeYear(i.currentYear - 1), te(), S();
          }), i._bind(i.nextMonthNav, "click", function(B) {
            B.preventDefault(), B.stopPropagation(), i.changeYear(i.currentYear + 1), te(), S();
          }), i._bind(k.monthsContainer, "mouseover", function(B) {
            i.config.mode === "range" && i.onMouseOver(l(B), "flatpickr-monthSelect-month");
          });
        }
        function Z() {
          if (i.rContainer && i.selectedDates.length) {
            for (var B = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), _ = 0; _ < B.length; _++)
              B[_].classList.remove("selected");
            var C = i.selectedDates[0].getMonth(), x = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (C + 1) + ")");
            x && x.classList.add("selected");
          }
        }
        function te() {
          var B = i.selectedDates[0];
          if (B && (B = new Date(B), B.setFullYear(i.currentYear), i.config.minDate && B < i.config.minDate && (B = i.config.minDate), i.config.maxDate && B > i.config.maxDate && (B = i.config.maxDate), i.currentYear = B.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var _ = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            _.forEach(function(C) {
              C.dateObj.setFullYear(i.currentYear), i.config.minDate && C.dateObj < i.config.minDate || i.config.maxDate && C.dateObj > i.config.maxDate ? C.classList.add("flatpickr-disabled") : C.classList.remove("flatpickr-disabled");
            });
          }
          Z();
        }
        function $(B) {
          B.preventDefault(), B.stopPropagation();
          var _ = l(B);
          if (_ instanceof Element && !_.classList.contains("flatpickr-disabled") && !_.classList.contains("notAllowed") && (j(_.dateObj), i.config.closeOnSelect)) {
            var C = i.config.mode === "single", x = i.config.mode === "range" && i.selectedDates.length === 2;
            (C || x) && i.close();
          }
        }
        function j(B) {
          var _ = new Date(i.currentYear, B.getMonth(), B.getDate()), C = [];
          switch (i.config.mode) {
            case "single":
              C = [_];
              break;
            case "multiple":
              C.push(_);
              break;
            case "range":
              i.selectedDates.length === 2 ? C = [_] : (C = i.selectedDates.concat([_]), C.sort(function(x, F) {
                return x.getTime() - F.getTime();
              }));
              break;
          }
          i.setDate(C, !0), Z();
        }
        var E = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ae(B, _, C, x) {
          var F = E[x.keyCode] !== void 0;
          if (!(!F && x.keyCode !== 13) && !(!i.rContainer || !k.monthsContainer)) {
            var Y = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), we = Array.prototype.indexOf.call(k.monthsContainer.children, document.activeElement);
            if (we === -1) {
              var se = Y || k.monthsContainer.firstElementChild;
              se.focus(), we = se.$i;
            }
            F ? k.monthsContainer.children[(12 + we + E[x.keyCode]) % 12].focus() : x.keyCode === 13 && k.monthsContainer.contains(document.activeElement) && j(document.activeElement.dateObj);
          }
        }
        function ce() {
          var B;
          ((B = i.config) === null || B === void 0 ? void 0 : B.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || S();
        }
        function pe() {
          g._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(g._stubbedCurrentMonth), i.currentMonth = g._stubbedCurrentMonth;
        }
        function fe() {
          g._stubbedCurrentMonth && (i._initialDate.setMonth(g._stubbedCurrentMonth), i.currentMonth = g._stubbedCurrentMonth, delete g._stubbedCurrentMonth);
        }
        function ge() {
          if (k.monthsContainer !== null)
            for (var B = k.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), _ = 0; _ < B.length; _++)
              B[_].removeEventListener("click", $);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: Z,
          onKeyDown: ae,
          onReady: [
            pe,
            M,
            w,
            T,
            Z,
            function() {
              i.config.onClose.push(ce), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            fe,
            ge,
            function() {
              i.config.onClose = i.config.onClose.filter(function(B) {
                return B !== ce;
              });
            }
          ]
        };
      };
    }
    return u;
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
}, aa = { class: "flex items-center justify-between mb-2" }, ra = { class: "text-xs opacity-70" }, ia = { class: "grid grid-cols-4 gap-2" }, sa = ["onClick"], la = {
  key: 3,
  class: "mitreka-month-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, da = { class: "mb-3 flex items-center justify-between" }, ca = { class: "text-sm font-semibold" }, ua = { class: "grid grid-cols-3 gap-2" }, fa = ["onClick"], Or = /* @__PURE__ */ de({
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
    const e = t, h = a, s = P(null), l = P(!1), v = P((/* @__PURE__ */ new Date()).getFullYear() - 6), u = P(!1), m = P((/* @__PURE__ */ new Date()).getFullYear());
    let g = null;
    const i = [
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
    ], k = b(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "month-year-grid" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), M = b(() => e.displayFormat ? e.displayFormat : e.picker === "month-year-grid" ? "M Y" : e.picker === "month" ? "M" : k.value), w = b(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), S = b(() => {
      if (e.picker !== "month-year-grid") return "";
      const _ = Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || "";
      if (!_) return "";
      const [C, x] = String(_).split("-"), F = Number(x) - 1;
      return !C || Number.isNaN(F) || F < 0 || F > 11 ? String(_) : `${i[F]} ${C}`;
    }), T = b(() => e.picker === "year-grid" ? { value: w.value } : e.picker === "month-year-grid" ? { value: S.value } : {}), Z = b(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), te = b(
      () => e.clearable && Z.value && !e.disabled && !e.readonly
    ), $ = b(() => !e.disabled), j = b(() => te.value && $.value ? "pr-16" : te.value || $.value ? "pr-9" : ""), E = () => {
      var _;
      if (e.mode === "range" ? h("update:modelValue", []) : h("update:modelValue", ""), e.picker === "year-grid") {
        l.value = !1;
        return;
      }
      if (e.picker === "month-year-grid") {
        u.value = !1;
        return;
      }
      (_ = g == null ? void 0 : g.clear) == null || _.call(g, !1);
    }, ae = () => {
      var _, C;
      if (s.value) {
        if (e.picker === "year-grid" || e.picker === "month-year-grid") {
          (_ = g == null ? void 0 : g.destroy) == null || _.call(g), g = null;
          return;
        }
        (C = g == null ? void 0 : g.destroy) == null || C.call(g), g = be(s.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            Jo({
              shorthand: !0,
              dateFormat: k.value,
              altFormat: M.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: k.value,
          altInput: !!e.displayFormat || e.picker === "month",
          altFormat: M.value,
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
            var x, F;
            e.picker === "month" && ((x = g == null ? void 0 : g.calendarContainer) == null || x.classList.add("flatpickr-month-only")), e.picker === "year" && ((F = g == null ? void 0 : g.calendarContainer) == null || F.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var x, F;
            e.picker === "month" && ((x = g == null ? void 0 : g.calendarContainer) == null || x.classList.add("flatpickr-month-only")), e.picker === "year" && ((F = g == null ? void 0 : g.calendarContainer) == null || F.classList.add("flatpickr-year-only"));
          },
          onChange: (x) => {
            if (e.mode === "range") {
              const F = x.map(
                (Y) => g.formatDate(Y, k.value)
              );
              h("update:modelValue", F);
            } else {
              const F = x[0] ? g.formatDate(x[0], k.value) : "";
              h("update:modelValue", F);
            }
          }
        });
      }
    }, ce = () => {
      var _;
      if (!e.disabled) {
        if (e.picker === "year-grid") {
          l.value = !0;
          return;
        }
        if (e.picker === "month-year-grid") {
          u.value = !0;
          return;
        }
        (_ = g == null ? void 0 : g.open) == null || _.call(g);
      }
    };
    pt(ae), rt(() => {
      var _;
      return (_ = g == null ? void 0 : g.destroy) == null ? void 0 : _.call(g);
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
      ae
    ), ve(
      () => e.modelValue,
      (_) => {
        !g || e.picker === "year-grid" || e.picker === "month-year-grid" || g.setDate(_, !1);
      }
    );
    const pe = b(
      () => Array.from({ length: 12 }, (_, C) => v.value + C)
    ), fe = (_) => {
      h("update:modelValue", _.toString()), l.value = !1;
    }, ge = (_) => {
      const C = `${m.value}-${String(_ + 1).padStart(2, "0")}`;
      h("update:modelValue", C), u.value = !1;
    }, B = (_) => {
      if (!l.value && !u.value) return;
      const C = _.target;
      if (s.value && C && s.value.contains(C)) return;
      const x = document.querySelector(".mitreka-year-grid");
      if (x && C && x.contains(C)) return;
      const F = document.querySelector(".mitreka-month-year-grid");
      F && C && F.contains(C) || (l.value = !1, u.value = !1);
    };
    return pt(() => document.addEventListener("click", B)), rt(() => document.removeEventListener("click", B)), (_, C) => (d(), f("div", Xo, [
      c("input", Ft({
        ref_key: "inputEl",
        ref: s,
        class: ["input w-full", [t.inputClass, j.value]],
        placeholder: t.placeholder
      }, T.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: ce,
        onFocus: ce
      }), null, 16, Qo),
      $.value ? (d(), f("button", {
        key: 0,
        type: "button",
        class: L([
          "absolute top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
          te.value ? "right-8" : "right-2"
        ]),
        "aria-label": t.noCalendar ? "Open time picker" : "Open date picker",
        onMousedown: C[0] || (C[0] = ee(() => {
        }, ["prevent"])),
        onClick: ee(ce, ["stop"])
      }, [
        t.noCalendar ? (d(), f("svg", ta, [...C[6] || (C[6] = [
          c("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M12 6v6l4 2"
          }, null, -1),
          c("circle", {
            cx: "12",
            cy: "12",
            r: "9"
          }, null, -1)
        ])])) : (d(), f("svg", na, [...C[7] || (C[7] = [
          c("rect", {
            x: "3",
            y: "4",
            width: "18",
            height: "18",
            rx: "2",
            ry: "2"
          }, null, -1),
          c("line", {
            x1: "16",
            y1: "2",
            x2: "16",
            y2: "6"
          }, null, -1),
          c("line", {
            x1: "8",
            y1: "2",
            x2: "8",
            y2: "6"
          }, null, -1),
          c("line", {
            x1: "3",
            y1: "10",
            x2: "21",
            y2: "10"
          }, null, -1)
        ])]))
      ], 42, ea)) : O("", !0),
      te.value ? (d(), f("button", {
        key: 1,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: C[1] || (C[1] = ee(() => {
        }, ["prevent"])),
        onClick: ee(E, ["stop"])
      }, [...C[8] || (C[8] = [
        c("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 24 24",
          fill: "none",
          stroke: "currentColor",
          "stroke-width": "2",
          class: "h-4 w-4",
          "aria-hidden": "true"
        }, [
          c("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M6 6l12 12M18 6L6 18"
          })
        ], -1)
      ])], 32)) : O("", !0),
      t.picker === "year-grid" && l.value ? (d(), f("div", oa, [
        c("div", aa, [
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: C[2] || (C[2] = (x) => v.value -= 12)
          }, " Prev "),
          c("div", ra, V(v.value) + " - " + V(v.value + 11), 1),
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: C[3] || (C[3] = (x) => v.value += 12)
          }, " Next ")
        ]),
        c("div", ia, [
          (d(!0), f(xe, null, Se(pe.value, (x) => (d(), f("button", {
            key: x,
            class: L(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === x.toString() }]),
            type: "button",
            onClick: (F) => fe(x)
          }, V(x), 11, sa))), 128))
        ])
      ])) : O("", !0),
      t.picker === "month-year-grid" && u.value ? (d(), f("div", la, [
        c("div", da, [
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: C[4] || (C[4] = (x) => m.value -= 1)
          }, " Prev "),
          c("div", ca, V(m.value), 1),
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: C[5] || (C[5] = (x) => m.value += 1)
          }, " Next ")
        ]),
        c("div", ua, [
          (d(), f(xe, null, Se(i, (x, F) => c("button", {
            key: x,
            class: "btn btn-ghost btn-sm",
            type: "button",
            onClick: (Y) => ge(F)
          }, V(x), 9, fa)), 64))
        ])
      ])) : O("", !0)
    ]));
  }
}), Nr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = Yt(), l = P(null), v = P(null), u = P(13), m = P(!1);
    let g = null, i = null;
    const k = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], M = [], w = P("normal"), S = b(() => [
      "w-full",
      w.value === "autoHeight" ? "h-auto" : "h-full"
    ]), T = b(() => w.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), Z = () => {
      const D = document.documentElement, R = D.classList.contains("dark"), X = (D.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      m.value = R || X;
    }, te = b(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : m.value), $ = b(() => te.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), j = b(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), E = b(() => ["agx", $.value, j.value, s.class]), ae = b(() => [{ "--ag-odd-row-background-color": e.striped ? te.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, s.style]), ce = b(() => {
      const { class: D, style: R, onGridReady: X, ...I } = s;
      return I;
    }), pe = (D) => typeof D == "number" && Number.isFinite(D) ? D : void 0, fe = b(() => {
      const D = s.gridOptions;
      if (D && typeof D == "object") return D;
      const R = s["grid-options"];
      return R && typeof R == "object" ? R : {};
    }), ge = (D) => {
      const R = pe(s[D]);
      if (typeof R == "number") return R;
      const I = pe(s[D === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof I == "number" ? I : pe(fe.value[D]);
    }, B = () => {
      const D = s.domLayout;
      if (typeof D == "string" && D.length > 0) return D;
      const R = s["dom-layout"];
      if (typeof R == "string" && R.length > 0) return R;
      const X = fe.value.domLayout;
      return typeof X == "string" && X.length > 0 ? X : void 0;
    }, _ = () => {
      var R, X;
      if (!v.value) return 0;
      const D = (I) => typeof I == "number" && Number.isFinite(I) && I >= 0;
      if (typeof v.value.getDisplayedRowCount == "function") {
        const I = v.value.getDisplayedRowCount();
        if (D(I)) return I;
      }
      if (typeof v.value.paginationGetRowCount == "function") {
        const I = v.value.paginationGetRowCount();
        if (D(I)) return I;
      }
      if (typeof v.value.getModel == "function") {
        const I = (X = (R = v.value).getModel) == null ? void 0 : X.call(R), re = I && typeof I.getRowCount == "function" ? I.getRowCount() : void 0;
        if (D(re)) return re;
      }
      return 0;
    }, C = () => {
      const D = Number(e.autoHeightThreshold);
      return Number.isFinite(D) ? Math.max(1, Math.floor(D)) : 15;
    }, x = () => {
      if (!v.value) return;
      const D = B();
      if (D) {
        w.value = D, v.value.setGridOption("domLayout", D);
        return;
      }
      const R = e.autoHeightWhenFewRows && _() < C() ? "autoHeight" : "normal";
      w.value = R, v.value.setGridOption("domLayout", R);
    }, F = () => {
      var D;
      for (; M.length > 0; )
        (D = M.pop()) == null || D();
    }, Y = () => {
      if (!v.value) return;
      F();
      const D = () => x();
      k.forEach((R) => {
        v.value.addEventListener(R, D), M.push(() => {
          var X;
          (X = v.value) == null || X.removeEventListener(R, D);
        });
      });
    }, we = () => {
      if (!e.autoHeaderHeight || !v.value) return;
      const D = ge("headerHeight") ?? hn(e.density), R = ge("groupHeaderHeight") ?? pn(e.density);
      v.value.setGridOption("headerHeight", D), v.value.setGridOption("groupHeaderHeight", R);
    }, se = () => {
      if (!e.autoRowHeight || !v.value) return;
      const D = gn(u.value, e.density);
      v.value.setGridOption("rowHeight", D), v.value.setGridOption("getRowHeight", () => D), v.value.resetRowHeights();
    }, N = () => {
      i == null || i(), i = null, !(!e.pinnedShadows || !l.value) && (i = vn(l.value));
    }, he = (D) => {
      v.value = D.api, u.value = mn(l.value), Y(), we(), x(), se(), N(), requestAnimationFrame(() => x()), h("grid-ready", D);
    };
    return ve(
      () => e.density,
      () => {
        var D;
        we(), se(), (D = v.value) == null || D.refreshCells({ force: !0 });
      }
    ), ve(
      () => [
        s.headerHeight,
        s["header-height"],
        s.groupHeaderHeight,
        s["group-header-height"],
        s.gridOptions,
        s["grid-options"]
      ],
      () => {
        we();
      }
    ), ve(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        x();
      }
    ), ve(
      () => [s.domLayout, s["dom-layout"], s.gridOptions, s["grid-options"]],
      () => {
        x();
      }
    ), ve(
      () => [s.rowData, s["row-data"]],
      () => {
        requestAnimationFrame(() => x()), requestAnimationFrame(() => N());
      }
    ), ve(
      () => e.pinnedShadows,
      () => {
        requestAnimationFrame(() => N());
      }
    ), pt(() => {
      Z(), e.autoObserveTheme && (g = new MutationObserver(Z), g.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), N();
    }), rt(() => {
      g == null || g.disconnect(), F(), i == null || i();
    }), (D, R) => (d(), f("div", {
      ref_key: "hostRef",
      ref: l,
      class: L(S.value),
      style: Me(T.value)
    }, [
      ie(U(xn), Ft(ce.value, {
        class: E.value,
        theme: "legacy",
        style: ae.value,
        onGridReady: he
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), ha = ["disabled"], pa = ["onMouseenter", "onClick", "aria-selected"], ga = 320, va = 12, Vr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = P(null), l = P(null), v = P(null), u = P(!1), m = P(-1), g = P(0), i = P(0), k = P(0), M = P(240), w = P(null), S = P(!1), T = b(
      () => e.options.find((N) => N.value === e.modelValue) ?? null
    ), Z = b(() => {
      var N;
      return ((N = T.value) == null ? void 0 : N.label) ?? e.placeholder;
    }), te = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, $ = {
      default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
      primary: "bg-primary border-primary text-primary-content hover:brightness-95",
      secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
      accent: "bg-accent border-accent text-accent-content hover:brightness-95",
      info: "bg-info border-info text-info-content hover:brightness-95",
      success: "bg-success border-success text-success-content hover:brightness-95",
      warning: "bg-warning border-warning text-warning-content hover:brightness-95",
      error: "bg-error border-error text-error-content hover:brightness-95"
    }, j = {
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
    }, ae = b(() => {
      const N = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", he = te[e.size], D = e.variant === "outline" ? j[e.color] : $[e.color], R = e.disabled ? "opacity-60 cursor-not-allowed" : "", X = u.value ? `ring-3 ${E[e.color]}` : "";
      return [N, he, D, R, X].join(" ");
    }), ce = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, pe = b(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), fe = (N) => {
      const he = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: he,
        backgroundColor: N ? "var(--color-base-200)" : "transparent"
      } : {
        color: he,
        backgroundColor: N ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, ge = b(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), B = b(() => ({
      top: `${g.value}px`,
      left: `${i.value}px`,
      width: `${k.value}px`
    })), _ = b(() => ({
      maxHeight: `${M.value}px`
    })), C = () => {
      if (!u.value || !l.value || !v.value) return;
      const N = l.value.getBoundingClientRect(), he = window.innerWidth, D = window.innerHeight, R = 6, X = va, I = v.value.scrollHeight || v.value.offsetHeight || 240;
      w.value == null && (w.value = I);
      const re = w.value, ne = D - N.bottom - R - X, De = N.top - R - X, ye = ne < 180 && De > ne;
      S.value = ye;
      const He = Math.min(ga, re, Math.max(0, ye ? De : ne));
      M.value = Math.max(64, He), k.value = Math.max(160, N.width), i.value = Math.min(
        Math.max(N.left, X),
        he - k.value - X
      ), ye ? g.value = Math.max(X, N.top - R - M.value) : g.value = Math.min(
        D - X - M.value,
        N.bottom + R
      );
    }, x = () => {
      e.disabled || (u.value = !u.value, u.value && (m.value = e.options.findIndex((N) => N.value === e.modelValue), Ve(C)));
    }, F = (N) => {
      N.disabled || (h("update:modelValue", N.value), h("change", N.value), u.value = !1);
    }, Y = (N) => {
      if (!e.disabled)
        switch (N.key) {
          case "Enter":
          case " ":
            if (N.preventDefault(), u.value && m.value >= 0) {
              const he = e.options[m.value];
              he && !he.disabled && F(he);
            } else
              x();
            break;
          case "Escape":
            u.value = !1;
            break;
          case "ArrowDown":
            N.preventDefault(), u.value ? m.value = Math.min(m.value + 1, e.options.length - 1) : (u.value = !0, m.value = 0, Ve(C));
            break;
          case "ArrowUp":
            N.preventDefault(), u.value && (m.value = Math.max(m.value - 1, 0));
            break;
        }
    }, we = (N) => {
      var X, I;
      const he = N.target, D = !!((X = s.value) != null && X.contains(he)), R = !!((I = v.value) != null && I.contains(he));
      !D && !R && (u.value = !1);
    }, se = (N) => {
      var D;
      if (!u.value) return;
      const he = N == null ? void 0 : N.target;
      he && ((D = v.value) != null && D.contains(he)) || C();
    };
    return ve(
      () => [u.value, e.options.length],
      async ([N]) => {
        if (!N) {
          w.value = null;
          return;
        }
        await Ve(), C();
      }
    ), pt(() => {
      document.addEventListener("click", we), window.addEventListener("resize", se), window.addEventListener("scroll", se, !0);
    }), rt(() => {
      document.removeEventListener("click", we), window.removeEventListener("resize", se), window.removeEventListener("scroll", se, !0);
    }), (N, he) => (d(), f("div", {
      ref_key: "root",
      ref: s,
      class: "relative"
    }, [
      c("button", {
        ref_key: "triggerRef",
        ref: l,
        type: "button",
        class: L(ae.value),
        disabled: t.disabled,
        onClick: x,
        onKeydown: Y
      }, [
        c("span", {
          class: L([T.value ? "" : "opacity-60"])
        }, V(Z.value), 3),
        ie(ke, {
          name: u.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, ha),
      (d(), Ge(gt, { to: "body" }, [
        ie(ot, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: at(() => [
            u.value ? (d(), f("div", {
              key: 0,
              ref_key: "menuRef",
              ref: v,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: Me([pe.value, B.value])
            }, [
              c("ul", {
                class: "overflow-auto",
                style: Me(_.value),
                role: "listbox"
              }, [
                (d(!0), f(xe, null, Se(t.options, (D, R) => {
                  var X, I, re;
                  return d(), f("li", {
                    key: D.value,
                    class: L([
                      ce[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      D.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((X = T.value) == null ? void 0 : X.value) === D.value ? "font-medium" : ""
                    ]),
                    style: Me(fe(R === m.value)),
                    onMouseenter: (ne) => m.value = R,
                    onClick: (ne) => D.disabled ? null : F(D),
                    role: "option",
                    "aria-selected": ((I = T.value) == null ? void 0 : I.value) === D.value
                  }, [
                    c("span", null, V(D.label), 1),
                    ((re = T.value) == null ? void 0 : re.value) === D.value ? (d(), Ge(ke, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: Me(ge.value)
                    }, null, 8, ["style"])) : O("", !0)
                  ], 46, pa);
                }), 128))
              ], 4)
            ], 4)) : O("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), ma = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, wa = ["disabled", "placeholder", "value", "readonly"], ka = ["disabled"], xa = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, ya = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], ba = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Ma = 320, Ca = 12, Pr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = P(e.modelValue ?? null);
    ve(
      () => e.modelValue,
      (I) => s.value = I ?? null
    ), ve(s, (I) => h("update:modelValue", I));
    const {
      root: l,
      inputEl: v,
      menu: u,
      floating: m,
      open: g,
      query: i,
      hoverIdx: k,
      loading: M,
      filtered: w,
      selected: S,
      openMenu: T,
      closeMenu: Z,
      choose: te,
      clear: $,
      onKey: j
    } = wn(s, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), E = P(null), ae = P(null), ce = P(0), pe = P(0), fe = P(0), ge = P(240), B = P(null), _ = P(!1), C = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, x = (I) => !I || I === "default" ? "input" : `input input-${I}`, F = b(
      () => {
        var I;
        return g.value ? i.value : ((I = S.value) == null ? void 0 : I.label) ?? "";
      }
    ), Y = b(() => ({
      top: `${ce.value}px`,
      left: `${pe.value}px`,
      width: `${fe.value}px`
    })), we = b(() => ({
      maxHeight: `${ge.value}px`
    })), se = () => {
      var Pe, Ee;
      if (!g.value || !E.value) return;
      const I = E.value.getBoundingClientRect(), re = window.innerWidth, ne = window.innerHeight, De = 6, ye = Ca, _e = (((Pe = ae.value) == null ? void 0 : Pe.scrollHeight) ?? 0) || (((Ee = u.value) == null ? void 0 : Ee.scrollHeight) ?? 0) || 240;
      B.value == null && (B.value = _e);
      const He = B.value, Ye = ne - I.bottom - De - ye, Ze = I.top - De - ye, Fe = Ye < 180 && Ze > Ye;
      _.value = Fe;
      const it = Math.min(Ma, He, Math.max(0, Fe ? Ze : Ye));
      ge.value = Math.max(64, it), fe.value = Math.max(220, I.width), pe.value = Math.min(
        Math.max(I.left, ye),
        re - fe.value - ye
      ), Fe ? ce.value = Math.max(ye, I.top - De - ge.value) : ce.value = Math.min(
        ne - ye - ge.value,
        I.bottom + De
      );
    }, N = (I) => {
      var ne;
      if (!g.value) return;
      const re = I == null ? void 0 : I.target;
      re && ((ne = ae.value) != null && ne.contains(re)) || se();
    };
    function he(I) {
      const re = I instanceof HTMLElement ? I : null;
      ae.value = re, m.value = re;
    }
    function D() {
      e.disabled || (T(), Ve(se));
    }
    function R() {
      if (!e.disabled) {
        if (g.value) {
          Z();
          return;
        }
        T(), Ve(se);
      }
    }
    function X() {
    }
    return ve(
      () => [g.value, M.value, w.value.length],
      async ([I]) => {
        I && (await Ve(), se());
      }
    ), ve(g, (I) => {
      if (!I) {
        B.value = null;
        return;
      }
      Ve(se);
    }), pt(() => {
      window.addEventListener("resize", N), window.addEventListener("scroll", N, !0);
    }), rt(() => {
      window.removeEventListener("resize", N), window.removeEventListener("scroll", N, !0);
    }), (I, re) => (d(), f("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      c("div", {
        ref_key: "triggerRef",
        ref: E,
        class: "relative"
      }, [
        c("span", ma, [
          ie(ke, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        c("input", {
          ref_key: "inputEl",
          ref: v,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: F.value,
          onFocus: D,
          onClick: D,
          onKeydown: re[0] || (re[0] = //@ts-ignore
          (...ne) => U(j) && U(j)(...ne)),
          readonly: !U(g),
          class: L([
            C[t.size || "md"],
            x(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: re[1] || (re[1] = (ne) => U(g) ? i.value = ne.target.value : null)
        }, null, 42, wa),
        t.clearable && U(S) && !t.disabled ? (d(), f("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onMousedown: re[2] || (re[2] = ee(
            //@ts-ignore
            (...ne) => U($) && U($)(...ne),
            ["prevent", "stop"]
          )),
          onClick: ee(X, ["stop"])
        }, [
          ie(ke, {
            name: "x",
            class: "w-4 h-4"
          })
        ], 32)) : O("", !0),
        c("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onMousedown: ee(R, ["prevent", "stop"]),
          onClick: ee(X, ["stop"]),
          disabled: t.disabled
        }, [
          ie(ke, {
            name: U(g) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 40, ka)
      ], 512),
      (d(), Ge(gt, { to: "body" }, [
        ie(ot, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": _.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": _.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: at(() => [
            U(g) ? (d(), f("div", {
              key: 0,
              ref: he,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: Me(Y.value),
              onMousedown: re[3] || (re[3] = ee(() => {
              }, ["stop"])),
              onClick: re[4] || (re[4] = ee(() => {
              }, ["stop"]))
            }, [
              U(M) ? (d(), f("div", xa, "Loading...")) : (d(), f("ul", {
                key: 1,
                ref_key: "menu",
                ref: u,
                class: "overflow-auto",
                style: Me(we.value),
                role: "listbox"
              }, [
                (d(!0), f(xe, null, Se(U(w), (ne, De) => {
                  var ye, _e;
                  return d(), f("li", {
                    key: ne.value,
                    "data-idx": De,
                    class: L([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      De === U(k) ? "bg-base-200" : "",
                      ne.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (He) => k.value = De,
                    onMousedown: ee((He) => ne.disabled ? null : U(te)(ne), ["prevent"]),
                    role: "option",
                    "aria-selected": ((ye = U(S)) == null ? void 0 : ye.value) === ne.value
                  }, [
                    c("span", null, V(ne.label), 1),
                    ((_e = U(S)) == null ? void 0 : _e.value) === ne.value ? (d(), Ge(ke, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : O("", !0)
                  ], 42, ya);
                }), 128)),
                !U(w).length && !U(M) ? (d(), f("li", ba, " No results ")) : O("", !0)
              ], 4))
            ], 36)) : O("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Da = { class: "truncate" }, $a = ["onClick"], Sa = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, _a = {
  key: 1,
  class: "flex-1 min-w-0"
}, Ha = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, ja = { class: "truncate" }, Ea = ["onClick"], Ba = { class: "flex items-center gap-2 w-full" }, Ta = { class: "flex-1 min-w-[8ch]" }, Aa = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, Ia = { class: "truncate" }, La = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, za = ["onClick"], Fa = ["checked", "onClick"], Oa = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Na = 320, Va = 12, Pa = /* @__PURE__ */ de({
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
    const e = t, h = a, s = b({
      get: () => e.modelValue ?? [],
      set: (J) => h("update:modelValue", J ?? [])
    }), {
      root: l,
      inputEl: v,
      menu: u,
      floating: m,
      open: g,
      query: i,
      loading: k,
      filtered: M,
      selectedList: w,
      openMenu: S,
      closeMenu: T,
      toggle: Z,
      clearAll: te,
      onKey: $
    } = kn(s, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), j = P(null), E = P(null), ae = P(0), ce = P(0), pe = P(0), fe = P(240), ge = P(null), B = P(!1), _ = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, C = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, x = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, F = {
      xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
      md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
      lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" }
    }, Y = {
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
    }, se = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, N = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, he = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, D = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, R = b(() => e.displayMode ?? "stacked"), X = b(() => R.value === "inline-compact"), I = b(
      () => C[e.size || "md"]
    ), re = b(
      () => x[I.value]
    ), ne = b(
      () => F[I.value]
    ), De = b(() => ({
      top: `${ae.value}px`,
      left: `${ce.value}px`,
      width: `${pe.value}px`
    })), ye = b(() => ({
      maxHeight: `${fe.value}px`
    })), _e = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), He = (J) => s.value.some((Q) => String(Q) === String(J)), Ye = b(() => [...M.value].sort((J, Q) => {
      const K = He(J.value), Ce = He(Q.value);
      return K !== Ce ? K ? -1 : 1 : _e.compare(J.label, Q.label);
    })), Ze = b(
      () => s.value.map((J) => String(J)).sort().join("|")
    ), Fe = P(null), vt = P(null), it = P([]), Pe = P(0);
    let Ee = null;
    const mt = b(
      () => Math.max(0, w.value.length - Pe.value)
    );
    function bt(J, Q) {
      J && (it.value[Q] = J);
    }
    function Je() {
      var le, Re, Ue;
      if (!X.value) {
        Pe.value = w.value.length;
        return;
      }
      const J = ((le = Fe.value) == null ? void 0 : le.clientWidth) ?? 0, Q = w.value.length;
      if (!J || Q === 0) {
        Pe.value = Q;
        return;
      }
      const K = ((Re = vt.value) == null ? void 0 : Re.offsetWidth) ?? 28, Ce = 6;
      let Te = 0, Ke = 0;
      for (let Oe = 0; Oe < Q; Oe += 1) {
        const tt = ((Ue = it.value[Oe]) == null ? void 0 : Ue.offsetWidth) ?? 0, qe = Te + (Oe > 0 ? Ce : 0) + tt, dt = Q - (Oe + 1) > 0 ? Ce + K : 0;
        if (qe + dt <= J)
          Te = qe, Ke = Oe + 1;
        else
          break;
      }
      Ke === 0 && Q > 0 && (Ke = 1), Pe.value = Ke;
    }
    const Xe = () => {
      var Ae, dt;
      if (!g.value || !j.value) return;
      const J = j.value.getBoundingClientRect(), Q = window.innerWidth, K = window.innerHeight, Ce = 6, Te = Va, Ke = (((Ae = E.value) == null ? void 0 : Ae.scrollHeight) ?? 0) || (((dt = u.value) == null ? void 0 : dt.scrollHeight) ?? 0) || 240;
      ge.value == null && (ge.value = Ke);
      const le = ge.value, Re = K - J.bottom - Ce - Te, Ue = J.top - Ce - Te, Oe = Re < 180 && Ue > Re;
      B.value = Oe;
      const qe = Math.min(Na, le, Math.max(0, Oe ? Ue : Re));
      fe.value = Math.max(64, qe), pe.value = Math.max(260, J.width), ce.value = Math.min(
        Math.max(J.left, Te),
        Q - pe.value - Te
      ), Oe ? ae.value = Math.max(Te, J.top - Ce - fe.value) : ae.value = Math.min(
        K - Te - fe.value,
        J.bottom + Ce
      );
    }, st = (J) => {
      var K;
      if (!g.value) return;
      const Q = J == null ? void 0 : J.target;
      Q && ((K = E.value) != null && K.contains(Q)) || Xe();
    };
    function Mt(J) {
      const Q = J instanceof HTMLElement ? J : null;
      E.value = Q, m.value = Q;
    }
    function lt() {
      e.disabled || (S(), Ve(Xe));
    }
    function wt() {
      e.disabled || (g.value = !0, Ve(Xe));
    }
    function Qe() {
      if (!e.disabled) {
        if (g.value) {
          T();
          return;
        }
        S(), Ve(Xe);
      }
    }
    function Ct() {
      te(), lt();
    }
    function et() {
    }
    async function Dt() {
      await Ve(), Je();
    }
    return ve(
      () => [w.value.length, e.size, e.displayMode, i.value],
      () => {
        Dt();
      },
      { immediate: !0 }
    ), ve(Ye, () => {
      Dt();
    }), ve(
      () => [g.value, k.value, Ye.value.length],
      async ([J]) => {
        if (!J) {
          ge.value = null;
          return;
        }
        await Ve(), Xe();
      }
    ), ve(Fe, (J) => {
      Ee == null || Ee.disconnect(), Ee = null, J && (Ee = new ResizeObserver(() => {
        Je();
      }), Ee.observe(J));
    }), pt(() => {
      window.addEventListener("resize", st), window.addEventListener("scroll", st, !0);
    }), rt(() => {
      Ee == null || Ee.disconnect(), window.removeEventListener("resize", st), window.removeEventListener("scroll", st, !0);
    }), (J, Q) => (d(), f("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      c("div", {
        ref_key: "triggerRef",
        ref: j,
        class: L([
          R.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          _[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: lt
      }, [
        R.value === "inline-compact" ? (d(), f(xe, { key: 0 }, [
          c("span", {
            class: L(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", N[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3),
          U(w).length ? (d(), f("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Fe,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (d(!0), f(xe, null, Se(U(w).slice(0, Pe.value), (K) => (d(), f("span", {
              key: K.value,
              class: L(["badge badge-soft-primary gap-1 max-w-[12rem]", Y[t.size || "md"]])
            }, [
              c("span", Da, V(K.label), 1),
              c("button", {
                type: "button",
                class: L([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  we[t.size || "md"]
                ]),
                onClick: ee((Ce) => U(Z)(K.value), ["stop"])
              }, [
                ie(ke, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, $a)
            ], 2))), 128)),
            mt.value > 0 ? (d(), f("span", Sa, " +" + V(mt.value), 1)) : O("", !0)
          ], 512)) : (d(), f("span", _a)),
          c("span", {
            class: L([
              U(w).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            It(c("input", {
              ref_key: "inputEl",
              ref: v,
              "onUpdate:modelValue": Q[0] || (Q[0] = (K) => Ot(i) ? i.value = K : null),
              class: L([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: Me(re.value),
              placeholder: "Search...",
              onKeydown: Q[1] || (Q[1] = //@ts-ignore
              (...K) => U($) && U($)(...K)),
              onFocus: wt
            }, null, 36), [
              [Lt, U(i)]
            ])
          ], 2),
          c("button", {
            type: "button",
            class: L(["icon-btn icon-btn-outline shrink-0", se[t.size || "md"]]),
            onMousedown: ee(Qe, ["prevent", "stop"]),
            onClick: ee(et, ["stop"])
          }, [
            ie(ke, {
              name: U(g) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 34),
          U(w).length ? (d(), f("button", {
            key: 2,
            type: "button",
            class: L(["icon-btn icon-btn-outline shrink-0", se[t.size || "md"]]),
            onMousedown: ee(Ct, ["prevent", "stop"]),
            onClick: ee(et, ["stop"])
          }, [
            ie(ke, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 34)) : O("", !0)
        ], 64)) : (d(), f(xe, { key: 1 }, [
          U(w).length ? (d(), f("div", Ha, [
            (d(!0), f(xe, null, Se(U(w), (K) => (d(), f("span", {
              key: K.value,
              class: L(["badge badge-soft-primary gap-1 max-w-full", Y[t.size || "md"]])
            }, [
              c("span", ja, V(K.label), 1),
              c("button", {
                type: "button",
                class: L([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  we[t.size || "md"]
                ]),
                onClick: ee((Ce) => U(Z)(K.value), ["stop"])
              }, [
                ie(ke, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, Ea)
            ], 2))), 128))
          ])) : (d(), f("span", {
            key: 1,
            class: L(["opacity-60 w-full", N[t.size || "md"]])
          }, V(t.placeholder || "Select options..."), 3)),
          c("div", Ba, [
            c("span", Ta, [
              It(c("input", {
                ref_key: "inputEl",
                ref: v,
                "onUpdate:modelValue": Q[2] || (Q[2] = (K) => Ot(i) ? i.value = K : null),
                class: L([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: Me(ne.value),
                placeholder: "Search...",
                onKeydown: Q[3] || (Q[3] = //@ts-ignore
                (...K) => U($) && U($)(...K)),
                onFocus: wt
              }, null, 36), [
                [Lt, U(i)]
              ])
            ]),
            c("button", {
              type: "button",
              class: L(["icon-btn icon-btn-outline shrink-0", se[t.size || "md"]]),
              onMousedown: ee(Qe, ["prevent", "stop"]),
              onClick: ee(et, ["stop"])
            }, [
              ie(ke, {
                name: U(g) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 34),
            U(w).length ? (d(), f("button", {
              key: 0,
              type: "button",
              class: L(["icon-btn icon-btn-outline shrink-0", se[t.size || "md"]]),
              onMousedown: ee(Ct, ["prevent", "stop"]),
              onClick: ee(et, ["stop"])
            }, [
              ie(ke, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 34)) : O("", !0)
          ])
        ], 64)),
        X.value ? (d(), f("div", Aa, [
          (d(!0), f(xe, null, Se(U(w), (K, Ce) => (d(), f("span", {
            key: `measure-${K.value}`,
            ref_for: !0,
            ref: (Te) => bt(Te, Ce),
            class: L(["badge badge-soft-primary gap-1 max-w-[12rem]", Y[t.size || "md"]])
          }, [
            c("span", Ia, V(K.label), 1),
            c("span", {
              class: L([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                we[t.size || "md"]
              ])
            }, [
              ie(ke, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          c("span", {
            ref_key: "measureCounterEl",
            ref: vt,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : O("", !0)
      ], 2),
      (d(), Ge(gt, { to: "body" }, [
        ie(ot, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: at(() => [
            U(g) ? (d(), f("div", {
              key: 0,
              ref: Mt,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: Me(De.value),
              onMousedown: Q[4] || (Q[4] = ee(() => {
              }, ["stop"])),
              onClick: Q[5] || (Q[5] = ee(() => {
              }, ["stop"]))
            }, [
              U(k) ? (d(), f("div", La, "Loading...")) : (d(), f("ul", {
                key: 1,
                ref_key: "menu",
                ref: u,
                class: "overflow-auto",
                style: Me(ye.value)
              }, [
                (d(!0), f(xe, null, Se(Ye.value, (K) => (d(), f("li", {
                  key: `${Ze.value}:${String(K.value)}`,
                  class: L([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    he[t.size || "md"],
                    He(K.value) ? "bg-primary/15" : ""
                  ]),
                  onClick: ee((Ce) => U(Z)(K.value), ["stop", "prevent"])
                }, [
                  c("input", {
                    type: "checkbox",
                    class: L([D[t.size || "md"]]),
                    checked: He(K.value),
                    onClick: ee((Ce) => U(Z)(K.value), ["stop", "prevent"])
                  }, null, 10, Fa),
                  c("span", null, V(K.label), 1)
                ], 10, za))), 128)),
                !Ye.value.length && !U(k) ? (d(), f("li", Oa, " No results ")) : O("", !0)
              ], 4))
            ], 36)) : O("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Kt = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [h, s] of a)
    e[h] = s;
  return e;
}, Yr = /* @__PURE__ */ Kt(Pa, [["__scopeId", "data-v-6b39678f"]]), Ya = { class: "font-medium" }, Ra = { class: "text-sm opacity-60" }, Wa = {
  key: 0,
  class: "text-xs opacity-60 space-y-1"
}, Ua = { key: 0 }, Ga = { key: 1 }, Ka = ["multiple", "accept", "disabled"], qa = {
  key: 0,
  class: "space-y-2"
}, Za = { class: "flex items-center gap-2 min-w-0" }, Ja = { class: "text-sm truncate" }, Xa = ["onClick"], Qa = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-3"
}, er = ["src", "alt"], tr = ["onClick"], nr = {
  key: 2,
  class: "text-xs opacity-60"
}, Rr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = P(!1), l = P(e.modelValue ?? []), v = P([]), u = ($) => !e.maxFiles || e.maxFiles <= 0 ? $ : $.slice(0, e.maxFiles), m = ($) => {
      l.value = u($), h("update:modelValue", l.value), h("change", l.value);
    }, g = b(() => l.value.length > 0), i = b(
      () => l.value.map(($, j) => ({
        index: j,
        name: $.name,
        file: $,
        isImage: $.type.startsWith("image/")
      }))
    ), k = b(
      () => e.preview ? i.value.filter(($) => !$.isImage) : i.value
    ), M = b(() => !!(e.helperText || e.maxSizeText)), w = ($) => {
      var ae;
      const j = ((ae = $.name.split(".").pop()) == null ? void 0 : ae.toLowerCase()) ?? "", E = $.type.toLowerCase();
      return E.startsWith("image/") ? "image" : E === "application/pdf" || j === "pdf" ? "file-pdf" : j === "xls" || j === "xlsx" || E === "application/vnd.ms-excel" || E === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "file-xls" : j === "csv" || E === "text/csv" ? "file-csv" : j === "doc" || j === "docx" || E === "application/msword" || E === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "file-doc" : j === "ppt" || j === "pptx" || E === "application/vnd.ms-powerpoint" || E === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? "file-ppt" : j === "txt" || E === "text/plain" ? "file-txt" : j === "zip" || j === "rar" || j === "7z" || j === "tar" || j === "gz" || E === "application/zip" || E === "application/x-zip-compressed" || E === "application/x-rar-compressed" || E === "application/x-7z-compressed" || E === "application/gzip" || E === "application/x-tar" ? "file-archive" : "file";
    }, S = () => {
      v.value.forEach(($) => URL.revokeObjectURL($.url)), v.value = l.value.map(($, j) => ({ file: $, fileIndex: j })).filter(($) => $.file.type.startsWith("image/")).map(({ file: $, fileIndex: j }) => ({
        id: `${$.name}-${$.size}-${$.lastModified}-${j}`,
        name: $.name,
        url: URL.createObjectURL($),
        fileIndex: j
      }));
    }, T = ($) => {
      const j = $.target, E = Array.from(j.files ?? []);
      E.length && (e.multiple ? m([...l.value, ...E]) : m([E[0]]), j.value = "");
    }, Z = ($) => {
      var E;
      if (e.disabled) return;
      s.value = !1;
      const j = Array.from(((E = $.dataTransfer) == null ? void 0 : E.files) ?? []);
      j.length && (e.multiple ? m([...l.value, ...j]) : m([j[0]]));
    }, te = ($) => {
      const j = [...l.value];
      j.splice($, 1), m(j);
    };
    return ve(
      () => e.modelValue,
      ($) => {
        l.value = u($ ?? []);
      }
    ), ve(
      l,
      () => {
        S();
      },
      { immediate: !0 }
    ), rt(() => {
      v.value.forEach(($) => URL.revokeObjectURL($.url));
    }), ($, j) => (d(), f("div", {
      class: L(["space-y-3", e.class])
    }, [
      c("div", {
        class: L(["dropzone", [{ "dropzone-active": s.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: j[0] || (j[0] = ee((E) => s.value = !0, ["prevent"])),
        onDragleave: j[1] || (j[1] = (E) => s.value = !1),
        onDrop: ee(Z, ["prevent"])
      }, [
        ie(ke, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        c("p", Ya, V(t.dropzoneText), 1),
        c("p", Ra, V(t.browseText), 1),
        M.value ? (d(), f("div", Wa, [
          t.helperText ? (d(), f("p", Ua, V(t.helperText), 1)) : O("", !0),
          t.maxSizeText ? (d(), f("p", Ga, V(t.maxSizeText), 1)) : O("", !0)
        ])) : O("", !0),
        c("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: T
        }, null, 40, Ka)
      ], 34),
      k.value.length ? (d(), f("div", qa, [
        (d(!0), f(xe, null, Se(k.value, (E) => (d(), f("div", {
          key: `${E.name}-${E.index}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          c("span", Za, [
            ie(ke, {
              name: w(E.file),
              class: "w-4 h-4 shrink-0"
            }, null, 8, ["name"]),
            c("span", Ja, V(E.name), 1)
          ]),
          c("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ae) => te(E.index)
          }, [
            ie(ke, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, Xa)
        ]))), 128))
      ])) : O("", !0),
      t.preview && v.value.length ? (d(), f("div", Qa, [
        (d(!0), f(xe, null, Se(v.value, (E) => (d(), f("div", {
          key: E.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          c("img", {
            src: E.url,
            alt: E.name,
            class: "w-full h-full object-cover"
          }, null, 8, er),
          c("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ae) => te(E.fileIndex)
          }, [
            ie(ke, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, tr)
        ]))), 128))
      ])) : O("", !0),
      g.value ? O("", !0) : (d(), f("p", nr, V(t.emptyText), 1))
    ], 2));
  }
}), or = {
  key: 0,
  class: "mitreka-input-addon"
}, ar = { class: "mitreka-input-inner w-full" }, rr = {
  key: 0,
  class: "mitreka-input-icon mitreka-input-icon--left"
}, ir = ["type", "inputmode", "value", "placeholder", "disabled", "readonly"], sr = {
  key: 1,
  class: "mitreka-input-icon mitreka-input-icon--right"
}, lr = ["aria-label"], dr = {
  key: 1,
  class: "mitreka-input-addon"
}, Wr = /* @__PURE__ */ de({
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
  setup(t, { emit: a }) {
    const e = t, h = a, s = Yt(), l = P(!1), v = (x, F) => {
      const Y = x.replace(/\D/g, "");
      return typeof F == "number" ? Y.slice(0, F) : Y;
    }, u = (x, F) => {
      const Y = v(x, F ?? 15);
      return Y ? Y.startsWith("62") ? `+${Y}` : Y.startsWith("0") ? Y : `0${Y}` : "";
    }, m = (x, F, Y = " ") => {
      var we;
      return ((we = x.match(new RegExp(`.{1,${F}}`, "g"))) == null ? void 0 : we.join(Y)) ?? x;
    }, g = (x, F) => m(v(x, F ?? 16), 4), i = (x, F) => {
      const Y = v(x, F ?? 15);
      return [
        Y.slice(0, 2),
        Y.slice(2, 5),
        Y.slice(5, 8),
        Y.slice(8, 9),
        Y.slice(9, 12),
        Y.slice(12, 15)
      ].filter(Boolean).map((se, N) => N === 0 ? se : N === 3 ? `.${se}` : N === 4 ? `-${se}` : `.${se}`).join("");
    }, k = (x, F) => {
      const Y = v(x, F ?? 15);
      return Y ? new Intl.NumberFormat("id-ID").format(Number(Y)) : "";
    }, M = (x) => e.mask === "digits" ? v(x, e.maxDigits) : e.mask === "phone-id" ? u(x, e.maxDigits) : e.mask === "nik" ? g(x, e.maxDigits) : e.mask === "npwp" ? i(x, e.maxDigits) : e.mask === "currency-idr" ? k(x, e.maxDigits) : x, w = b(() => String(e.modelValue ?? "")), S = b(() => w.value.length > 0), T = b(() => !!e.prefixIcon), Z = b(() => !!e.suffixIcon), te = b(() => !!e.addonLeft || !!e.addonRight), $ = b(
      () => e.clearable && S.value && !e.disabled && !e.readonly
    ), j = b(
      () => e.passwordToggle && e.type === "password" && !e.disabled
    ), E = b(() => e.mask !== "none" && e.type !== "password" || j.value && l.value ? "text" : e.type), ae = b(() => {
      if (e.mask === "phone-id" || e.mask === "nik" || e.mask === "npwp" || e.mask === "digits") return "numeric";
      if (e.mask === "currency-idr") return "decimal";
    }), ce = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, pe = b(
      () => e.color === "default" ? "" : `input-${e.color}`
    ), fe = b(() => [
      "input",
      ce[e.size],
      pe.value,
      T.value ? "mitreka-input-has-prefix" : "",
      Z.value || $.value || j.value ? "mitreka-input-has-suffix" : ""
    ]), ge = (x) => {
      const F = x.target, Y = M(F.value);
      F.value !== Y && (F.value = Y), h("update:modelValue", Y);
    }, B = () => {
      h("update:modelValue", ""), h("clear");
    }, _ = () => {
      l.value = !l.value;
    }, C = (x) => {
      x.key === "Enter" && h("enter");
    };
    return (x, F) => (d(), f("div", {
      class: L(["mitreka-input-group w-full", te.value ? "mitreka-input-group--with-addon" : ""])
    }, [
      t.addonLeft ? (d(), f("span", or, V(t.addonLeft), 1)) : O("", !0),
      c("div", ar, [
        T.value ? (d(), f("span", rr, [
          ie(ke, {
            name: t.prefixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : O("", !0),
        c("input", Ft(U(s), {
          type: E.value,
          inputmode: ae.value,
          value: w.value,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: fe.value,
          onInput: ge,
          onFocus: F[0] || (F[0] = (Y) => h("focus", Y)),
          onBlur: F[1] || (F[1] = (Y) => h("blur", Y)),
          onKeydown: C
        }), null, 16, ir),
        Z.value ? (d(), f("span", sr, [
          ie(ke, {
            name: t.suffixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : O("", !0),
        $.value ? (d(), f("button", {
          key: 2,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": "Clear input",
          onClick: B
        }, [
          ie(ke, {
            name: "x",
            class: "w-4 h-4 opacity-70"
          })
        ])) : O("", !0),
        j.value ? (d(), f("button", {
          key: 3,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": l.value ? "Hide password" : "Show password",
          onClick: _
        }, [
          ie(ke, {
            name: l.value ? "eye-off" : "eye",
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ], 8, lr)) : O("", !0)
      ]),
      t.addonRight ? (d(), f("span", dr, V(t.addonRight), 1)) : O("", !0)
    ], 2));
  }
}), cr = { class: "tree-list" }, ur = {
  key: 0,
  class: "tree-list__empty"
}, fr = ["onClick"], hr = ["onClick"], pr = {
  key: 1,
  class: "tree-list__toggle-space"
}, gr = {
  key: 2,
  class: "tree-list__code"
}, vr = /* @__PURE__ */ de({
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
    const e = t, h = a, s = b(
      () => e.expandedIds instanceof Set ? e.expandedIds : new Set(e.expandedIds)
    ), l = b(() => {
      const M = [], w = (S, T, Z, te) => {
        S.forEach(($, j) => {
          var ae;
          const E = [...Z, j + 1];
          M.push({
            node: $,
            depth: T,
            numberLabel: E.join("."),
            ancestors: te
          }), (ae = $.children) != null && ae.length && w($.children, T + 1, E, [...te, $.id]);
        });
      };
      return w(e.nodes ?? [], 0, [], []), M;
    }), v = b(() => {
      const M = [], w = (S, T, Z) => {
        S.forEach((te, $) => {
          var E;
          const j = [...Z, $ + 1];
          M.push({
            node: te,
            depth: T,
            numberLabel: j.join("."),
            ancestors: []
          }), (E = te.children) != null && E.length && s.value.has(te.id) && w(te.children, T + 1, j);
        });
      };
      return w(e.nodes ?? [], 0, []), M;
    }), u = b(() => {
      const M = e.searchQuery.trim().toLowerCase();
      if (!M) return v.value;
      const w = /* @__PURE__ */ new Set();
      return l.value.forEach((S) => {
        `${k(S)} ${S.node.name}`.toLowerCase().includes(M) && (w.add(S.node.id), S.ancestors.forEach((Z) => w.add(Z)));
      }), l.value.filter((S) => w.has(S.node.id));
    }), m = (M) => {
      var w;
      return !!((w = M.children) != null && w.length);
    };
    function g(M) {
      h("toggle", M);
    }
    function i(M) {
      h("row-click", M);
    }
    function k(M) {
      if (e.codeMode === "none") return "";
      if (e.codeMode === "field") {
        const w = M.node[e.codeField];
        return w == null ? "" : String(w);
      }
      return `${M.numberLabel}.`;
    }
    return (M, w) => (d(), f("div", cr, [
      u.value.length ? O("", !0) : (d(), f("div", ur, V(t.emptyText), 1)),
      (d(!0), f(xe, null, Se(u.value, (S) => (d(), f("div", {
        key: S.node.id,
        class: "tree-list__row-wrap"
      }, [
        c("div", {
          class: L(["tree-list__row", { "tree-list__row--with-guides": S.depth > 0 }]),
          style: Me({
            paddingLeft: `${t.baseIndent + S.depth * t.indentStep}px`,
            "--guide-width": `${S.depth * t.indentStep}px`
          }),
          onClick: (T) => i(S.node)
        }, [
          m(S.node) ? (d(), f("button", {
            key: 0,
            class: "tree-list__toggle",
            type: "button",
            onClick: ee((T) => g(S.node.id), ["stop"])
          }, [
            ie(ke, {
              name: "chevron-right",
              class: L(["w-4 h-4 text-base-content/50 transition-transform duration-150", { "rotate-90": s.value.has(S.node.id) }])
            }, null, 8, ["class"])
          ], 8, hr)) : (d(), f("span", pr)),
          t.codeMode !== "none" ? (d(), f("span", gr, V(k(S)), 1)) : O("", !0),
          c("span", {
            class: L(["tree-list__name", S.depth === 0 ? "font-semibold" : ""])
          }, V(S.node.name), 3),
          me(M.$slots, "meta", {
            row: S,
            node: S.node
          }, void 0, !0),
          w[1] || (w[1] = c("span", { class: "flex-1" }, null, -1)),
          c("div", {
            class: "tree-list__actions",
            onClick: w[0] || (w[0] = ee(() => {
            }, ["stop"]))
          }, [
            me(M.$slots, "actions", {
              row: S,
              node: S.node
            }, void 0, !0)
          ])
        ], 14, fr)
      ]))), 128))
    ]));
  }
}), Ur = /* @__PURE__ */ Kt(vr, [["__scopeId", "data-v-3c1b8432"]]);
export {
  Fr as A,
  Yr as M,
  Ur as T,
  xr as _,
  yr as a,
  br as b,
  Mr as c,
  Cr as d,
  Dr as e,
  $r as f,
  Yn as g,
  Sr as h,
  _r as i,
  Hr as j,
  jr as k,
  Er as l,
  Br as m,
  Tr as n,
  Ar as o,
  Ir as p,
  Lr as q,
  zr as r,
  ke as s,
  Or as t,
  Nr as u,
  Vr as v,
  Pr as w,
  Rr as x,
  Wr as y,
  Rt as z
};
