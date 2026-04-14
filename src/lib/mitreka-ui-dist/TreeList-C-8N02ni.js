import { defineComponent as le, createElementBlock as f, openBlock as d, normalizeClass as L, createCommentVNode as O, renderSlot as me, createElementVNode as c, ref as P, watch as ve, withKeys as ut, withModifiers as oe, createBlock as Ze, Teleport as ht, createVNode as se, Transition as et, withCtx as tt, toDisplayString as N, provide as fn, inject as hn, computed as M, normalizeStyle as De, createTextVNode as qt, Fragment as be, renderList as Ee, unref as K, useSlots as pn, resolveDynamicComponent as gn, reactive as vn, withDirectives as Ot, vModelText as Vt, onMounted as ft, onBeforeUnmount as nt, mergeProps as Pt, useAttrs as Zt, nextTick as Oe, isRef as Yt } from "vue";
import { d as mn, c as wn, h as kn, i as xn, g as yn, f as bn, r as Mn, a as Cn, b as Dn } from "./useAgGridRowHeight-UHX5I8W2.js";
import { AgGridVue as $n } from "ag-grid-vue3";
const Sn = ["disabled"], _n = {
  key: 0,
  class: "animate-spin"
}, Mr = /* @__PURE__ */ le({
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
    }, s = () => {
      const { variant: u, color: m } = e;
      return m === "default" ? u === "outline" ? "btn-outline" : u === "ghost" ? "btn-ghost" : "" : u === "solid" ? `btn-${m}` : u === "outline" ? `btn-outline btn-outline-${m}` : u === "soft" ? `btn-soft-${m}` : u === "ghost" ? "btn-ghost" : "";
    }, v = (u) => {
      !e.disabled && !e.loading && h("click", u);
    };
    return (u, m) => (d(), f("button", {
      class: L(["btn", l[t.size], s()]),
      disabled: t.disabled || t.loading,
      onClick: v
    }, [
      t.loading ? (d(), f("span", _n, [...m[0] || (m[0] = [
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
    ], 10, Sn));
  }
}), Cr = /* @__PURE__ */ le({
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
      const { variant: l, color: s } = a;
      return s === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${s}` : l === "outline" ? `badge-outline badge-outline-${s}` : l === "soft" ? `badge-soft-${s}` : "";
    };
    return (l, s) => (d(), f("span", {
      class: L(["badge", e[t.size], h()])
    }, [
      me(l.$slots, "default")
    ], 2));
  }
}), Hn = ["role", "aria-expanded", "tabindex"], En = { class: "card-title" }, Bn = { class: "card-body-inner" }, jn = {
  key: 3,
  class: "mt-4"
}, Dr = /* @__PURE__ */ le({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const h = t, l = e, s = P(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    ve(() => h.modelValue, (u) => {
      u !== void 0 && (s.value = u);
    });
    function v() {
      if (!h.collapsible) return;
      const u = !s.value;
      s.value = u, l("update:modelValue", u), l("toggle", u);
    }
    return a({ isOpen: s, toggle: v }), (u, m) => (d(), f("section", {
      class: L(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      u.$slots.title ? (d(), f("header", {
        key: 0,
        class: L(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? s.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: v,
        onKeydown: [
          m[0] || (m[0] = ut((g) => t.collapsible && v(), ["enter"])),
          m[1] || (m[1] = ut(oe((g) => t.collapsible && v(), ["prevent"]), ["space"]))
        ]
      }, [
        c("div", En, [
          me(u.$slots, "title")
        ]),
        t.collapsible ? (d(), f("svg", {
          key: 0,
          class: L(["card-collapse-icon", { "is-open": s.value }]),
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
      ], 42, Hn)) : O("", !0),
      t.collapsible ? (d(), f("div", {
        key: 1,
        class: L(["card-body-wrapper", { "is-open": s.value }])
      }, [
        c("div", Bn, [
          me(u.$slots, "default")
        ])
      ], 2)) : me(u.$slots, "default", { key: 2 }),
      u.$slots.footer ? (d(), f("footer", jn, [
        me(u.$slots, "footer")
      ])) : O("", !0)
    ], 2));
  }
}), In = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, Tn = { class: "text-xl font-semibold" }, $r = /* @__PURE__ */ le({
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
    }, s = () => {
      e.persistent || h("close");
    };
    return ve(
      () => e.open,
      (v) => {
        v ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (v, u) => (d(), Ze(ht, { to: "body" }, [
      se(et, { name: "fade" }, {
        default: tt(() => [
          t.open ? (d(), f("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: s
          })) : O("", !0)
        ]),
        _: 1
      }),
      se(et, { name: "zoom" }, {
        default: tt(() => [
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
                l[t.size]
              ])
            }, [
              t.hideHeader ? O("", !0) : (d(), f("div", In, [
                me(v.$slots, "header", {}, () => [
                  c("h3", Tn, N(t.title), 1)
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
                  }, N(t.cancelText), 1),
                  c("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: u[2] || (u[2] = (m) => h("confirm"))
                  }, N(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : O("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), An = ["aria-expanded", "aria-disabled", "onKeydown"], Ln = { class: "collapse-title" }, zn = { class: "collapse-content" }, Fn = { class: "collapse-content-inner" }, On = { class: "collapse-body" }, Sr = /* @__PURE__ */ le({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: a, emit: e }) {
    const h = t, l = e, s = P(h.modelValue !== void 0 ? h.modelValue : h.defaultOpen);
    ve(() => h.modelValue, (u) => {
      u !== void 0 && (s.value = u);
    });
    function v() {
      if (h.disabled) return;
      const u = !s.value;
      s.value = u, l("update:modelValue", u), l("toggle", u);
    }
    return a({ isOpen: s, toggle: v }), (u, m) => (d(), f("div", {
      class: L([
        "collapse-card",
        `collapse-card-${t.variant}`,
        { "is-open": s.value }
      ])
    }, [
      c("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": s.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: v,
        onKeydown: [
          ut(v, ["enter"]),
          ut(oe(v, ["prevent"]), ["space"])
        ]
      }, [
        c("div", Ln, [
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
      ], 40, An),
      c("div", zn, [
        c("div", Fn, [
          c("div", On, [
            me(u.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), _r = /* @__PURE__ */ le({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: a, emit: e }) {
    const h = t, l = e, s = P(/* @__PURE__ */ new Set());
    ve(() => h.modelValue, (m) => {
      m === null ? s.value = /* @__PURE__ */ new Set() : Array.isArray(m) ? s.value = new Set(m) : s.value = /* @__PURE__ */ new Set([m]);
    }, { immediate: !0 });
    function v(m) {
      const g = new Set(s.value);
      g.has(m) ? g.delete(m) : (h.multiple || g.clear(), g.add(m)), s.value = g, h.multiple ? l("update:modelValue", Array.from(g)) : l("update:modelValue", g.size > 0 ? Array.from(g)[0] : null);
    }
    function u(m) {
      return s.value.has(m);
    }
    return fn("accordion", {
      toggleItem: v,
      isItemOpen: u
    }), a({ openItems: s, toggleItem: v }), (m, g) => (d(), f("div", {
      class: L(["accordion", `accordion-${t.variant}`])
    }, [
      me(m.$slots, "default")
    ], 2));
  }
}), Vn = ["aria-expanded", "aria-disabled", "onKeydown"], Nn = { class: "accordion-title" }, Pn = { class: "accordion-content" }, Yn = { class: "accordion-content-inner" }, Rn = { class: "accordion-body" }, Hr = /* @__PURE__ */ le({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const a = t, e = hn("accordion"), h = M(() => (e == null ? void 0 : e.isItemOpen(a.id)) ?? !1);
    function l() {
      a.disabled || e == null || e.toggleItem(a.id);
    }
    return (s, v) => (d(), f("div", {
      class: L(["accordion-item", { "is-open": h.value }])
    }, [
      c("div", {
        class: "accordion-header",
        role: "button",
        "aria-expanded": h.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: l,
        onKeydown: [
          ut(l, ["enter"]),
          ut(oe(l, ["prevent"]), ["space"])
        ]
      }, [
        c("div", Nn, [
          me(s.$slots, "header", {}, () => [
            me(s.$slots, "title")
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
      ], 40, Vn),
      c("div", Pn, [
        c("div", Yn, [
          c("div", Rn, [
            me(s.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), Wn = { class: "loading-logo-wrapper" }, Gn = { class: "dots-container" }, Un = ["width", "height"], Kn = {
  key: 0,
  class: "loading-text"
}, qn = /* @__PURE__ */ le({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const a = t, e = M(() => Math.round(a.size * (8 / 60)));
    return (h, l) => (d(), f("div", Wn, [
      c("div", {
        class: "loading-logo-container",
        style: De({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        c("div", Gn, [
          c("span", {
            class: "loading-dot dot-1 dot-blue",
            style: De({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-2 dot-blue",
            style: De({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-3 dot-black",
            style: De({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-4 dot-black",
            style: De({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-5 dot-red",
            style: De({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          c("span", {
            class: "loading-dot dot-6 dot-red",
            style: De({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (d(), f("svg", {
          class: "logo-svg",
          viewBox: "0 0 40.5 27",
          width: t.size,
          height: t.size * 0.67
        }, [...l[0] || (l[0] = [
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
        ])], 8, Un))
      ], 4),
      t.text ? (d(), f("p", Kn, [
        qt(N(t.text), 1),
        l[1] || (l[1] = c("span", { class: "loading-dots" }, [
          c("span", null, "."),
          c("span", null, "."),
          c("span", null, ".")
        ], -1))
      ])) : O("", !0)
    ]));
  }
}), Zn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, Er = /* @__PURE__ */ le({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (a, e) => (d(), Ze(ht, { to: "body" }, [
      se(et, { name: "fade" }, {
        default: tt(() => [
          t.open ? (d(), f("div", Zn, [
            se(qn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : O("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Jn = { class: "toast-content" }, Xn = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Qn = ["d"], eo = { class: "toast-body" }, to = {
  key: 0,
  class: "toast-title"
}, no = { class: "toast-message" }, oo = ["onClick"], Br = /* @__PURE__ */ le({
  __name: "Toasts",
  setup(t) {
    const a = mn(), e = M(() => {
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
    }, v = {
      info: "toast-outline-info",
      success: "toast-outline-success",
      warning: "toast-outline-warning",
      error: "toast-outline-error",
      primary: "toast-outline-primary"
    }, u = (m, g = "soft") => {
      var k;
      return ((k = {
        soft: l,
        solid: s,
        outline: v
      }[g]) == null ? void 0 : k[m]) || l[m] || "toast-default";
    };
    return (m, g) => (d(), Ze(ht, { to: "body" }, [
      c("div", {
        class: L(["toast-container", e.value])
      }, [
        (d(!0), f(be, null, Ee(K(a).toasts.value, (i) => (d(), f("div", {
          key: i.id,
          class: L(["toast-item", u(i.type, i.variant)])
        }, [
          c("div", Jn, [
            (d(), f("svg", Xn, [
              c("path", {
                d: h[i.type],
                fill: "currentColor"
              }, null, 8, Qn)
            ])),
            c("div", eo, [
              i.title ? (d(), f("div", to, N(i.title), 1)) : O("", !0),
              c("div", no, N(i.message), 1)
            ]),
            c("button", {
              class: "toast-close-btn",
              onClick: (k) => K(a).dismiss(i.id)
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
            ])], 8, oo)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), jr = /* @__PURE__ */ le({
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
    const l = () => {
      h = setTimeout(() => {
        e.value = !0;
      }, a.delay);
    }, s = () => {
      h && (clearTimeout(h), h = null), e.value = !1;
    }, v = M(() => `tooltip-pos-${a.position}`), u = M(() => `tooltip-arrow-${a.position}`), m = M(() => `tooltip-variant-${a.variant}`);
    return (g, i) => (d(), f("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: s,
      onFocus: l,
      onBlur: s
    }, [
      me(g.$slots, "default"),
      se(et, { name: "tooltip-fade" }, {
        default: tt(() => [
          e.value && t.text ? (d(), f("span", {
            key: 0,
            class: L(["tooltip-content", [v.value, m.value]]),
            role: "tooltip"
          }, [
            qt(N(t.text) + " ", 1),
            c("span", {
              class: L(["tooltip-arrow", [u.value, m.value]])
            }, null, 2)
          ], 2)) : O("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), ao = { class: "mitreka-pagination" }, ro = ["disabled"], io = { class: "pagination-status" }, so = ["disabled"], Ir = /* @__PURE__ */ le({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: a }) {
    const e = t, h = a, l = () => {
      e.page > 1 && h("change", e.page - 1);
    }, s = () => {
      e.page < e.pages && h("change", e.page + 1);
    };
    return (v, u) => (d(), f("div", ao, [
      c("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...u[0] || (u[0] = [
        c("span", { class: "hidden sm:inline" }, "Prev", -1),
        c("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, ro),
      c("span", io, N(t.page) + " / " + N(t.pages), 1),
      c("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: s
      }, [...u[1] || (u[1] = [
        c("span", { class: "hidden sm:inline" }, "Next", -1),
        c("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, so)
    ]));
  }
}), lo = { class: "avatar-root" }, co = ["src", "alt"], Tr = /* @__PURE__ */ le({
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
    const a = t, e = P(!1), h = M(() => a.src && !e.value), l = M(() => a.fallback ? a.fallback.slice(0, 2).toUpperCase() : a.alt && a.alt !== "Avatar" ? a.alt.split(" ").map((k) => k[0]).slice(0, 2).join("").toUpperCase() : "?"), s = M(() => `avatar-size-${a.size}`), v = M(() => `avatar-color-${a.color}`), u = M(() => a.status ? `avatar-status-${a.status}` : ""), m = M(() => `avatar-status-size-${a.size}`), g = M(() => a.square ? "avatar-square" : "avatar-round"), i = () => {
      e.value = !0;
    };
    return (k, C) => (d(), f("span", lo, [
      h.value ? (d(), f("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: L(["avatar-img", [s.value, g.value]]),
        onError: i
      }, null, 42, co)) : (d(), f("span", {
        key: 1,
        class: L(["avatar-fallback", [s.value, v.value, g.value]])
      }, N(l.value), 3)),
      t.status ? (d(), f("span", {
        key: 2,
        class: L(["avatar-status", [u.value, m.value]])
      }, null, 2)) : O("", !0)
    ]));
  }
}), Ar = /* @__PURE__ */ le({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const a = t, e = pn(), h = M(() => {
      var m;
      const u = (m = e.default) == null ? void 0 : m.call(e);
      return u ? u.length : 0;
    }), l = M(() => h.value <= a.max ? 0 : h.value - a.max), s = M(() => `avatar-size-${a.size}`), v = M(() => `avatar-group-space-${a.size}`);
    return (u, m) => (d(), f("div", {
      class: L(["avatar-group", v.value])
    }, [
      (d(!0), f(be, null, Ee(t.max, (g, i) => {
        var k, C;
        return d(), f(be, { key: i }, [
          i < h.value ? (d(), Ze(gn((C = (k = K(e)).default) == null ? void 0 : C.call(k)[i]), { key: 0 })) : O("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (d(), f("span", {
        key: 0,
        class: L(["avatar-group-count", s.value])
      }, " +" + N(l.value), 3)) : O("", !0)
    ], 2));
  }
}), uo = {
  key: 0,
  class: "mitreka-breadcrumbs",
  "aria-label": "Breadcrumb"
}, fo = { class: "breadcrumbs-list" }, ho = {
  key: 0,
  class: "breadcrumbs-item"
}, po = ["href"], go = { key: 0 }, vo = ["href"], mo = {
  key: 1,
  class: "breadcrumbs-text"
}, wo = {
  key: 1,
  class: "breadcrumbs-current"
}, Lr = /* @__PURE__ */ le({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const a = t, e = (h) => h === a.items.length - 1;
    return (h, l) => t.items.length ? (d(), f("nav", uo, [
      c("ol", fo, [
        t.showHome ? (d(), f("li", ho, [
          c("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, N(t.homeLabel), 9, po)
        ])) : O("", !0),
        (d(!0), f(be, null, Ee(t.items, (s, v) => (d(), f("li", {
          key: v,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = c("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(v) ? (d(), f("span", wo, N(s.label), 1)) : (d(), f("span", go, [
            s.href ? (d(), f("a", {
              key: 0,
              href: s.href,
              class: "breadcrumbs-link"
            }, N(s.label), 9, vo)) : (d(), f("span", mo, N(s.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : O("", !0);
  }
}), ko = { class: "mitreka-stat-card" }, xo = {
  key: 0,
  class: "stat-icon"
}, yo = { class: "stat-content" }, bo = { class: "stat-label" }, Mo = { class: "stat-value" }, zr = /* @__PURE__ */ le({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (a, e) => (d(), f("div", ko, [
      t.icon ? (d(), f("div", xo, N(t.icon), 1)) : O("", !0),
      c("div", yo, [
        c("div", bo, N(t.label), 1),
        c("div", Mo, N(t.value), 1)
      ])
    ]));
  }
}), Co = { class: "mitreka-page-header" }, Do = { class: "page-header-title-row" }, $o = { class: "page-header-title" }, So = {
  key: 0,
  class: "page-header-desc"
}, Fr = /* @__PURE__ */ le({
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
    }, h = M(() => {
      if (!a.category) return "";
      const l = a.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, s) => (d(), f("header", Co, [
      c("div", Do, [
        c("h1", $o, N(t.title), 1),
        t.category ? (d(), f("span", {
          key: 0,
          class: L(["badge page-header-badge", h.value])
        }, N(t.category), 3)) : O("", !0)
      ]),
      t.description ? (d(), f("p", So, N(t.description), 1)) : O("", !0)
    ]));
  }
}), _o = { class: "mitreka-theme-switcher" }, Ho = ["value"], Or = /* @__PURE__ */ le({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: a, setTheme: e, toggleTheme: h } = wn("light"), l = M(
      () => a.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), s = (v) => {
      e(v === "mitrekadark" ? "dark" : "light");
    };
    return (v, u) => (d(), f("div", _o, [
      c("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: u[0] || (u[0] = //@ts-ignore
        (...m) => K(h) && K(h)(...m))
      }, " Toggle: " + N(l.value), 1),
      c("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: u[1] || (u[1] = (m) => s(m.target.value))
      }, [...u[2] || (u[2] = [
        c("option", { value: "mitrekalight" }, "mitrekalight", -1),
        c("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, Ho)
    ]));
  }
}), Eo = { class: "sidebar-header" }, Bo = {
  key: 0,
  class: "sidebar-search"
}, jo = ["placeholder"], Io = { class: "sidebar-nav" }, To = ["href", "title", "onClick"], Ao = { class: "sidebar-icon" }, Lo = { class: "sidebar-icon-text" }, zo = {
  key: 0,
  class: "sidebar-label"
}, Fo = ["title", "onClick"], Oo = { class: "sidebar-icon" }, Vo = { class: "sidebar-icon-text" }, No = {
  key: 0,
  class: "sidebar-label"
}, Po = ["href", "title", "onClick"], Yo = { class: "sidebar-icon" }, Ro = { class: "sidebar-icon-text" }, Wo = {
  key: 0,
  class: "sidebar-label"
}, Vr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = P(""), s = vn({});
    e.defaultOpenIds.forEach((k) => {
      s[k] = !0;
    });
    const v = (k) => !e.activeHref || !k.href ? !1 : k.exact ? e.activeHref === k.href : e.activeHref.startsWith(k.href), u = (k) => {
      var S;
      if (!k.children) return !1;
      if (l.value.trim()) return !0;
      const C = s[k.id], w = ((S = k.children) == null ? void 0 : S.some(v)) ?? !1;
      return C === void 0 && w && (s[k.id] = !0), s[k.id] ?? w;
    }, m = (k) => {
      const C = !u(k);
      s[k.id] = C, h("toggle", k.id, C);
    }, g = M(() => {
      const k = l.value.toLowerCase().trim();
      return k ? e.items.map((C) => {
        if (C.children) {
          const w = C.children.filter(
            (S) => S.label.toLowerCase().includes(k)
          );
          return C.label.toLowerCase().includes(k) ? C : w.length > 0 ? { ...C, children: w } : null;
        }
        return C.label.toLowerCase().includes(k) ? C : null;
      }).filter(Boolean) : e.items;
    }), i = (k) => {
      h("navigate", k), l.value = "";
    };
    return (k, C) => (d(), f("aside", {
      class: L(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      c("div", Eo, [
        me(k.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (d(), f("div", Bo, [
        Ot(c("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": C[0] || (C[0] = (w) => l.value = w)
        }, null, 8, jo), [
          [Vt, l.value]
        ]),
        l.value ? (d(), f("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: C[1] || (C[1] = (w) => l.value = "")
        }, " × ")) : O("", !0)
      ])) : O("", !0),
      c("nav", Io, [
        (d(!0), f(be, null, Ee(g.value, (w) => (d(), f(be, {
          key: w.id
        }, [
          w.children ? (d(), f(be, { key: 1 }, [
            c("button", {
              class: L(["sidebar-item sidebar-group", u(w) ? "is-open" : ""]),
              title: t.collapsed ? w.label : void 0,
              onClick: (S) => m(w)
            }, [
              c("span", Oo, [
                me(k.$slots, "icon", { item: w }, () => [
                  c("span", Vo, N(w.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? O("", !0) : (d(), f("span", No, N(w.label), 1)),
              t.collapsed ? O("", !0) : (d(), f("span", {
                key: 1,
                class: L(["sidebar-caret", u(w) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Fo),
            u(w) ? (d(), f("div", {
              key: 0,
              class: L(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (d(!0), f(be, null, Ee(w.children, (S) => (d(), f("a", {
                key: S.id,
                class: L(["sidebar-item sidebar-child", v(S) ? "is-active" : ""]),
                href: S.href || "#",
                title: t.collapsed ? S.label : void 0,
                onClick: oe((T) => i(S), ["prevent"])
              }, [
                c("span", Yo, [
                  me(k.$slots, "icon", { item: S }, () => [
                    c("span", Ro, N(S.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? O("", !0) : (d(), f("span", Wo, N(S.label), 1))
              ], 10, Po))), 128))
            ], 2)) : O("", !0)
          ], 64)) : (d(), f("a", {
            key: 0,
            class: L(["sidebar-item", v(w) ? "is-active" : ""]),
            href: w.href || "#",
            title: t.collapsed ? w.label : void 0,
            onClick: oe((S) => i(w), ["prevent"])
          }, [
            c("span", Ao, [
              me(k.$slots, "icon", { item: w }, () => [
                c("span", Lo, N(w.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? O("", !0) : (d(), f("span", zo, N(w.label), 1))
          ], 10, To))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Jt = {
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
}, Nr = (t) => Jt[t], Go = ["innerHTML"], Uo = {
  key: 1,
  class: "mitreka-icon-fallback"
}, xe = /* @__PURE__ */ le({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const a = t, e = M(() => a.class || "w-5 h-5"), h = M(() => Jt[a.name]), l = M(
      () => h.value ? h.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (s, v) => h.value ? (d(), f("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, Go)) : (d(), f("span", Uo, "?"));
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
}, Te = function(t, a) {
  return a === void 0 && (a = 2), ("000" + t).slice(a * -1);
}, Fe = function(t) {
  return t === !0 ? 1 : 0;
};
function Rt(t, a) {
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
function Ie(t, a, e) {
  if (e === !0)
    return t.classList.add(a);
  t.classList.remove(a);
}
function re(t, a, e) {
  var h = window.document.createElement(t);
  return a = a || "", e = e || "", h.className = a, e !== void 0 && (h.textContent = e), h;
}
function $t(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Xt(t, a) {
  if (a(t))
    return t;
  if (t.parentNode)
    return Xt(t.parentNode, a);
}
function St(t, a) {
  var e = re("div", "numInputWrapper"), h = re("input", "numInput " + t), l = re("span", "arrowUp"), s = re("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? h.type = "number" : (h.type = "text", h.pattern = "\\d*"), a !== void 0)
    for (var v in a)
      h.setAttribute(v, a[v]);
  return e.appendChild(h), e.appendChild(l), e.appendChild(s), e;
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
var It = function() {
}, _t = function(t, a, e) {
  return e.months[a ? "shorthand" : "longhand"][t];
}, Ko = {
  D: It,
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
    t.setHours(t.getHours() % 12 + 12 * Fe(new RegExp(e.amPM[1], "i").test(a)));
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
  l: It,
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
  w: It,
  y: function(t, a) {
    t.setFullYear(2e3 + parseFloat(a));
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
  D: function(t, a, e) {
    return a.weekdays.shorthand[kt.w(t, a, e)];
  },
  F: function(t, a, e) {
    return _t(kt.n(t, a, e) - 1, !1, a);
  },
  G: function(t, a, e) {
    return Te(kt.h(t, a, e));
  },
  H: function(t) {
    return Te(t.getHours());
  },
  J: function(t, a) {
    return a.ordinal !== void 0 ? t.getDate() + a.ordinal(t.getDate()) : t.getDate();
  },
  K: function(t, a) {
    return a.amPM[Fe(t.getHours() > 11)];
  },
  M: function(t, a) {
    return _t(t.getMonth(), !0, a);
  },
  S: function(t) {
    return Te(t.getSeconds());
  },
  U: function(t) {
    return t.getTime() / 1e3;
  },
  W: function(t, a, e) {
    return e.getWeek(t);
  },
  Y: function(t) {
    return Te(t.getFullYear(), 4);
  },
  d: function(t) {
    return Te(t.getDate());
  },
  h: function(t) {
    return t.getHours() % 12 ? t.getHours() % 12 : 12;
  },
  i: function(t) {
    return Te(t.getMinutes());
  },
  j: function(t) {
    return t.getDate();
  },
  l: function(t, a) {
    return a.weekdays.longhand[t.getDay()];
  },
  m: function(t) {
    return Te(t.getMonth() + 1);
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
}, Qt = function(t) {
  var a = t.config, e = a === void 0 ? dt : a, h = t.l10n, l = h === void 0 ? xt : h, s = t.isMobile, v = s === void 0 ? !1 : s;
  return function(u, m, g) {
    var i = g || l;
    return e.formatDate !== void 0 && !v ? e.formatDate(u, m, i) : m.split("").map(function(k, C, w) {
      return kt[k] && w[C - 1] !== "\\" ? kt[k](u, i, e) : k !== "\\" ? k : "";
    }).join("");
  };
}, Nt = function(t) {
  var a = t.config, e = a === void 0 ? dt : a, h = t.l10n, l = h === void 0 ? xt : h;
  return function(s, v, u, m) {
    if (!(s !== 0 && !s)) {
      var g = m || l, i, k = s;
      if (s instanceof Date)
        i = new Date(s.getTime());
      else if (typeof s != "string" && s.toFixed !== void 0)
        i = new Date(s);
      else if (typeof s == "string") {
        var C = v || (e || dt).dateFormat, w = String(s).trim();
        if (w === "today")
          i = /* @__PURE__ */ new Date(), u = !0;
        else if (e && e.parseDate)
          i = e.parseDate(s, C);
        else if (/Z$/.test(w) || /GMT$/.test(w))
          i = new Date(s);
        else {
          for (var S = void 0, T = [], te = 0, ae = 0, $ = ""; te < C.length; te++) {
            var _ = C[te], H = _ === "\\", ie = C[te - 1] === "\\" || H;
            if (Qe[_] && !ie) {
              $ += Qe[_];
              var de = new RegExp($).exec(s);
              de && (S = !0) && T[_ !== "Y" ? "push" : "unshift"]({
                fn: Ko[_],
                val: de[++ae]
              });
            } else H || ($ += ".");
          }
          i = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), T.forEach(function(fe) {
            var ue = fe.fn, pe = fe.val;
            return i = ue(i, pe, g) || i;
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
var qo = function(t, a, e) {
  return t > Math.min(a, e) && t < Math.max(a, e);
}, Tt = function(t, a, e) {
  return t * 3600 + a * 60 + e;
}, Zo = function(t) {
  var a = Math.floor(t / 3600), e = (t - a * 3600) / 60;
  return [a, e, t - a * 3600 - e * 60];
}, Jo = {
  DAY: 864e5
};
function At(t) {
  var a = t.defaultHour, e = t.defaultMinute, h = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), s = t.minDate.getMinutes(), v = t.minDate.getSeconds();
    a < l && (a = l), a === l && e < s && (e = s), a === l && e === s && h < v && (h = t.minDate.getSeconds());
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
  }, l = 0, s = a; l < s.length; l++) {
    var v = s[l];
    h(v);
  }
  return t;
});
var He = function() {
  return He = Object.assign || function(t) {
    for (var a, e = 1, h = arguments.length; e < h; e++) {
      a = arguments[e];
      for (var l in a) Object.prototype.hasOwnProperty.call(a, l) && (t[l] = a[l]);
    }
    return t;
  }, He.apply(this, arguments);
}, Wt = function() {
  for (var t = 0, a = 0, e = arguments.length; a < e; a++) t += arguments[a].length;
  for (var h = Array(t), l = 0, a = 0; a < e; a++)
    for (var s = arguments[a], v = 0, u = s.length; v < u; v++, l++)
      h[l] = s[v];
  return h;
}, Xo = 300;
function Qo(t, a) {
  var e = {
    config: He(He({}, dt), Ce.defaultConfig),
    l10n: xt
  };
  e.parseDate = Nt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = T, e._setHoursFromDate = C, e._positionCalendar = _e, e.changeMonth = x, e.changeYear = ee, e.clear = G, e.close = R, e.onMouseOver = Be, e._createElement = re, e.createDay = de, e.destroy = ge, e.isEnabled = Q, e.jumpToDate = $, e.updateValue = Me, e.open = ot, e.redraw = gt, e.set = bt, e.setDate = Mt, e.toggle = Z;
  function h() {
    e.utils = {
      getDaysInMonth: function(n, o) {
        return n === void 0 && (n = e.currentMonth), o === void 0 && (o = e.currentYear), n === 1 && (o % 4 === 0 && o % 100 !== 0 || o % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, pt(), Ne(), Ct(), rt(), h(), e.isMobile || ie(), ae(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && C(e.config.noCalendar ? e.latestSelectedDateObj : void 0), Me(!1)), u();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && _e(), J("onReady");
  }
  function s() {
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
    n !== void 0 && n.type !== "blur" && st(n);
    var p = e._input.value;
    k(), Me(), e._input.value !== p && e._debouncedChange();
  }
  function g(n, o) {
    return n % 12 + 12 * Fe(o === e.l10n.amPM[1]);
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
      var p = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && ze(e.latestSelectedDateObj, e.config.minDate, !0) === 0, b = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && ze(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var B = Tt(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), X = Tt(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), z = Tt(n, o, r);
        if (z > X && z < B) {
          var ne = Zo(B);
          n = ne[0], o = ne[1], r = ne[2];
        }
      } else {
        if (b) {
          var A = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, A.getHours()), n === A.getHours() && (o = Math.min(o, A.getMinutes())), o === A.getMinutes() && (r = Math.min(r, A.getSeconds()));
        }
        if (p) {
          var U = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, U.getHours()), n === U.getHours() && o < U.getMinutes() && (o = U.getMinutes()), o === U.getMinutes() && (r = Math.max(r, U.getSeconds()));
        }
      }
      w(n, o, r);
    }
  }
  function C(n) {
    var o = n || e.latestSelectedDateObj;
    o && o instanceof Date && w(o.getHours(), o.getMinutes(), o.getSeconds());
  }
  function w(n, o, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, o, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Te(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Fe(n % 12 === 0)), e.minuteElement.value = Te(o), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Fe(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Te(r)));
  }
  function S(n) {
    var o = Le(n), r = parseInt(o.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && ee(r);
  }
  function T(n, o, r, p) {
    if (o instanceof Array)
      return o.forEach(function(b) {
        return T(n, b, r, p);
      });
    if (n instanceof Array)
      return n.forEach(function(b) {
        return T(b, o, r, p);
      });
    n.addEventListener(o, r, p), e._handlers.push({
      remove: function() {
        return n.removeEventListener(o, r, p);
      }
    });
  }
  function te() {
    J("onChange");
  }
  function ae() {
    if (e.config.wrap && ["open", "close", "toggle", "clear"].forEach(function(r) {
      Array.prototype.forEach.call(e.element.querySelectorAll("[data-" + r + "]"), function(p) {
        return T(p, "click", e[r]);
      });
    }), e.isMobile) {
      q();
      return;
    }
    var n = Rt(Re, 50);
    if (e._debouncedChange = Rt(te, Xo), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && T(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Be(Le(r));
    }), T(e._input, "keydown", Ye), e.calendarContainer !== void 0 && T(e.calendarContainer, "keydown", Ye), !e.config.inline && !e.config.static && T(window, "resize", n), window.ontouchstart !== void 0 ? T(window.document, "touchstart", V) : T(window.document, "mousedown", V), T(window.document, "focus", V, { capture: !0 }), e.config.clickOpens === !0 && (T(e._input, "focus", e.open), T(e._input, "click", e.open)), e.daysContainer !== void 0 && (T(e.monthNav, "click", Dt), T(e.monthNav, ["keyup", "increment"], S), T(e.daysContainer, "click", Xe)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var o = function(r) {
        return Le(r).select();
      };
      T(e.timeContainer, ["increment"], m), T(e.timeContainer, "blur", m, { capture: !0 }), T(e.timeContainer, "click", _), T([e.hourElement, e.minuteElement], ["focus", "click"], o), e.secondElement !== void 0 && T(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && T(e.amPM, "click", function(r) {
        m(r);
      });
    }
    e.config.allowInput && T(e._input, "blur", Se);
  }
  function $(n, o) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), p = e.currentYear, b = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (B) {
      B.message = "Invalid date supplied: " + r, e.config.errorHandler(B);
    }
    o && e.currentYear !== p && (J("onYearChange"), y()), o && (e.currentYear !== p || e.currentMonth !== b) && J("onMonthChange"), e.redraw();
  }
  function _(n) {
    var o = Le(n);
    ~o.className.indexOf("arrow") && H(n, o.classList.contains("arrowUp") ? 1 : -1);
  }
  function H(n, o, r) {
    var p = n && Le(n), b = r || p && p.parentNode && p.parentNode.firstChild, B = je("increment");
    B.delta = o, b && b.dispatchEvent(B);
  }
  function ie() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = re("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(we()), e.innerContainer = re("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var o = I(), r = o.weekWrapper, p = o.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = p, e.weekWrapper = r;
      }
      e.rContainer = re("div", "flatpickr-rContainer"), e.rContainer.appendChild($e()), e.daysContainer || (e.daysContainer = re("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), D(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(ke()), Ie(e.calendarContainer, "rangeMode", e.config.mode === "range"), Ie(e.calendarContainer, "animate", e.config.animate === !0), Ie(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var b = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!b && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var B = re("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(B, e.element), B.appendChild(e.element), e.altInput && B.appendChild(e.altInput), B.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function de(n, o, r, p) {
    var b = Q(o, !0), B = re("span", n, o.getDate().toString());
    return B.dateObj = o, B.$i = p, B.setAttribute("aria-label", e.formatDate(o, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && ze(o, e.now) === 0 && (e.todayDateElem = B, B.classList.add("today"), B.setAttribute("aria-current", "date")), b ? (B.tabIndex = -1, Ge(o) && (B.classList.add("selected"), e.selectedDateElem = B, e.config.mode === "range" && (Ie(B, "startRange", e.selectedDates[0] && ze(o, e.selectedDates[0], !0) === 0), Ie(B, "endRange", e.selectedDates[1] && ze(o, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && B.classList.add("inRange")))) : B.classList.add("flatpickr-disabled"), e.config.mode === "range" && it(o) && !Ge(o) && B.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && p % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(o) + "</span>"), J("onDayCreate", B), B;
  }
  function fe(n) {
    n.focus(), e.config.mode === "range" && Be(n);
  }
  function ue(n) {
    for (var o = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, p = o; p != r; p += n)
      for (var b = e.daysContainer.children[p], B = n > 0 ? 0 : b.children.length - 1, X = n > 0 ? b.children.length : -1, z = B; z != X; z += n) {
        var ne = b.children[z];
        if (ne.className.indexOf("hidden") === -1 && Q(ne.dateObj))
          return ne;
      }
  }
  function pe(n, o) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, p = o > 0 ? e.config.showMonths : -1, b = o > 0 ? 1 : -1, B = r - e.currentMonth; B != p; B += b)
      for (var X = e.daysContainer.children[B], z = r - e.currentMonth === B ? n.$i + o : o < 0 ? X.children.length - 1 : 0, ne = X.children.length, A = z; A >= 0 && A < ne && A != (o > 0 ? ne : -1); A += b) {
        var U = X.children[A];
        if (U.className.indexOf("hidden") === -1 && Q(U.dateObj) && Math.abs(n.$i - A) >= Math.abs(o))
          return fe(U);
      }
    e.changeMonth(b), j(ue(b), 0);
  }
  function j(n, o) {
    var r = s(), p = ye(r || document.body), b = n !== void 0 ? n : p ? r : e.selectedDateElem !== void 0 && ye(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && ye(e.todayDateElem) ? e.todayDateElem : ue(o > 0 ? 1 : -1);
    b === void 0 ? e._input.focus() : p ? pe(b, o) : fe(b);
  }
  function E(n, o) {
    for (var r = (new Date(n, o, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, p = e.utils.getDaysInMonth((o - 1 + 12) % 12, n), b = e.utils.getDaysInMonth(o, n), B = window.document.createDocumentFragment(), X = e.config.showMonths > 1, z = X ? "prevMonthDay hidden" : "prevMonthDay", ne = X ? "nextMonthDay hidden" : "nextMonthDay", A = p + 1 - r, U = 0; A <= p; A++, U++)
      B.appendChild(de("flatpickr-day " + z, new Date(n, o - 1, A), A, U));
    for (A = 1; A <= b; A++, U++)
      B.appendChild(de("flatpickr-day", new Date(n, o, A), A, U));
    for (var ce = b + 1; ce <= 42 - r && (e.config.showMonths === 1 || U % 7 !== 0); ce++, U++)
      B.appendChild(de("flatpickr-day " + ne, new Date(n, o + 1, ce % b), ce, U));
    var Ue = re("div", "dayContainer");
    return Ue.appendChild(B), Ue;
  }
  function D() {
    if (e.daysContainer !== void 0) {
      $t(e.daysContainer), e.weekNumbers && $t(e.weekNumbers);
      for (var n = document.createDocumentFragment(), o = 0; o < e.config.showMonths; o++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + o), n.appendChild(E(r.getFullYear(), r.getMonth()));
      }
      e.daysContainer.appendChild(n), e.days = e.daysContainer.firstChild, e.config.mode === "range" && e.selectedDates.length === 1 && Be();
    }
  }
  function y() {
    if (!(e.config.showMonths > 1 || e.config.monthSelectorType !== "dropdown")) {
      var n = function(p) {
        return e.config.minDate !== void 0 && e.currentYear === e.config.minDate.getFullYear() && p < e.config.minDate.getMonth() ? !1 : !(e.config.maxDate !== void 0 && e.currentYear === e.config.maxDate.getFullYear() && p > e.config.maxDate.getMonth());
      };
      e.monthsDropdownContainer.tabIndex = -1, e.monthsDropdownContainer.innerHTML = "";
      for (var o = 0; o < 12; o++)
        if (n(o)) {
          var r = re("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, o).getMonth().toString(), r.textContent = _t(o, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === o && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function F() {
    var n = re("div", "flatpickr-month"), o = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = re("span", "cur-month") : (e.monthsDropdownContainer = re("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), T(e.monthsDropdownContainer, "change", function(X) {
      var z = Le(X), ne = parseInt(z.value, 10);
      e.changeMonth(ne - e.currentMonth), J("onMonthChange");
    }), y(), r = e.monthsDropdownContainer);
    var p = St("cur-year", { tabindex: "-1" }), b = p.getElementsByTagName("input")[0];
    b.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && b.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (b.setAttribute("max", e.config.maxDate.getFullYear().toString()), b.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var B = re("div", "flatpickr-current-month");
    return B.appendChild(r), B.appendChild(p), o.appendChild(B), n.appendChild(o), {
      container: n,
      yearElement: b,
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
    return e.monthNav = re("div", "flatpickr-months"), e.yearElements = [], e.monthElements = [], e.prevMonthNav = re("span", "flatpickr-prev-month"), e.prevMonthNav.innerHTML = e.config.prevArrow, e.nextMonthNav = re("span", "flatpickr-next-month"), e.nextMonthNav.innerHTML = e.config.nextArrow, Y(), Object.defineProperty(e, "_hidePrevMonthArrow", {
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
  function ke() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = At(e.config);
    e.timeContainer = re("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var o = re("span", "flatpickr-time-separator", ":"), r = St("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var p = St("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = p.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Te(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : i(n.hours)), e.minuteElement.value = Te(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(o), e.timeContainer.appendChild(p), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var b = St("flatpickr-second");
      e.secondElement = b.getElementsByTagName("input")[0], e.secondElement.value = Te(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(re("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(b);
    }
    return e.config.time_24hr || (e.amPM = re("span", "flatpickr-am-pm", e.l10n.amPM[Fe((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function $e() {
    e.weekdayContainer ? $t(e.weekdayContainer) : e.weekdayContainer = re("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var o = re("div", "flatpickr-weekdaycontainer");
      e.weekdayContainer.appendChild(o);
    }
    return Ve(), e.weekdayContainer;
  }
  function Ve() {
    if (e.weekdayContainer) {
      var n = e.l10n.firstDayOfWeek, o = Wt(e.l10n.weekdays.shorthand);
      n > 0 && n < o.length && (o = Wt(o.splice(n, o.length), o.splice(0, n)));
      for (var r = e.config.showMonths; r--; )
        e.weekdayContainer.children[r].innerHTML = `
      <span class='flatpickr-weekday'>
        ` + o.join("</span><span class='flatpickr-weekday'>") + `
      </span>
      `;
    }
  }
  function I() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = re("div", "flatpickr-weekwrapper");
    n.appendChild(re("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var o = re("div", "flatpickr-weeks");
    return n.appendChild(o), {
      weekWrapper: n,
      weekNumbers: o
    };
  }
  function x(n, o) {
    o === void 0 && (o = !0);
    var r = o ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, J("onYearChange"), y()), D(), J("onMonthChange"), Pe());
  }
  function G(n, o) {
    if (n === void 0 && (n = !0), o === void 0 && (o = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, o === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = At(e.config), p = r.hours, b = r.minutes, B = r.seconds;
      w(p, b, B);
    }
    e.redraw(), n && J("onChange");
  }
  function R() {
    e.isOpen = !1, e.isMobile || (e.calendarContainer !== void 0 && e.calendarContainer.classList.remove("open"), e._input !== void 0 && e._input.classList.remove("active")), J("onClose");
  }
  function ge() {
    e.config !== void 0 && J("onDestroy");
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
  function he(n) {
    return e.calendarContainer.contains(n);
  }
  function V(n) {
    if (e.isOpen && !e.config.inline) {
      var o = Le(n), r = he(o), p = o === e.input || o === e.altInput || e.element.contains(o) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), b = !p && !r && !he(n.relatedTarget), B = !e.config.ignoredFocusElements.some(function(X) {
        return X.contains(o);
      });
      b && B && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && m(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function ee(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var o = n, r = e.currentYear !== o;
      e.currentYear = o || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), J("onYearChange"), y());
    }
  }
  function Q(n, o) {
    var r;
    o === void 0 && (o = !0);
    var p = e.parseDate(n, void 0, o);
    if (e.config.minDate && p && ze(p, e.config.minDate, o !== void 0 ? o : !e.minDateHasTime) < 0 || e.config.maxDate && p && ze(p, e.config.maxDate, o !== void 0 ? o : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (p === void 0)
      return !1;
    for (var b = !!e.config.enable, B = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, X = 0, z = void 0; X < B.length; X++) {
      if (z = B[X], typeof z == "function" && z(p))
        return b;
      if (z instanceof Date && p !== void 0 && z.getTime() === p.getTime())
        return b;
      if (typeof z == "string") {
        var ne = e.parseDate(z, void 0, !0);
        return ne && ne.getTime() === p.getTime() ? b : !b;
      } else if (typeof z == "object" && p !== void 0 && z.from && z.to && p.getTime() >= z.from.getTime() && p.getTime() <= z.to.getTime())
        return b;
    }
    return !b;
  }
  function ye(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function Se(n) {
    var o = n.target === e._input, r = e._input.value.trimEnd() !== qe();
    o && r && !(n.relatedTarget && he(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ye(n) {
    var o = Le(n), r = e.config.wrap ? t.contains(o) : o === e._input, p = e.config.allowInput, b = e.isOpen && (!p || !r), B = e.config.inline && r && !p;
    if (n.keyCode === 13 && r) {
      if (p)
        return e.setDate(e._input.value, !0, o === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), o.blur();
      e.open();
    } else if (he(o) || b || B) {
      var X = !!e.timeContainer && e.timeContainer.contains(o);
      switch (n.keyCode) {
        case 13:
          X ? (n.preventDefault(), m(), Ke()) : Xe(n);
          break;
        case 27:
          n.preventDefault(), Ke();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!X && !r) {
            n.preventDefault();
            var z = s();
            if (e.daysContainer !== void 0 && (p === !1 || z && ye(z))) {
              var ne = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), x(ne), j(ue(1), 0)) : j(void 0, ne);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var A = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && o.$i !== void 0 || o === e.input || o === e.altInput ? n.ctrlKey ? (n.stopPropagation(), ee(e.currentYear - A), j(ue(1), 0)) : X || j(void 0, A * 7) : o === e.currentYearElement ? ee(e.currentYear - A) : e.config.enableTime && (!X && e.hourElement && e.hourElement.focus(), m(n), e._debouncedChange());
          break;
        case 9:
          if (X) {
            var U = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Ae) {
              return Ae;
            }), ce = U.indexOf(o);
            if (ce !== -1) {
              var Ue = U[ce + (n.shiftKey ? -1 : 1)];
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
          e.amPM.textContent = e.l10n.amPM[0], k(), Me();
          break;
        case e.l10n.amPM[1].charAt(0):
        case e.l10n.amPM[1].charAt(0).toLowerCase():
          e.amPM.textContent = e.l10n.amPM[1], k(), Me();
          break;
      }
    (r || he(o)) && J("onKeyDown", n);
  }
  function Be(n, o) {
    if (o === void 0 && (o = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(o) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), p = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), b = Math.min(r, e.selectedDates[0].getTime()), B = Math.max(r, e.selectedDates[0].getTime()), X = !1, z = 0, ne = 0, A = b; A < B; A += Jo.DAY)
        Q(new Date(A), !0) || (X = X || A > b && A < B, A < p && (!z || A > z) ? z = A : A > p && (!ne || A < ne) && (ne = A));
      var U = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + o));
      U.forEach(function(ce) {
        var Ue = ce.dateObj, Ae = Ue.getTime(), wt = z > 0 && Ae < z || ne > 0 && Ae > ne;
        if (wt) {
          ce.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(lt) {
            ce.classList.remove(lt);
          });
          return;
        } else if (X && !wt)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(lt) {
          ce.classList.remove(lt);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), p < r && Ae === p ? ce.classList.add("startRange") : p > r && Ae === p && ce.classList.add("endRange"), Ae >= z && (ne === 0 || Ae <= ne) && qo(Ae, p, r) && ce.classList.add("inRange"));
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
        var r = Le(n);
        r && r.blur();
      }
      e.mobileInput !== void 0 && (e.mobileInput.focus(), e.mobileInput.click()), J("onOpen");
      return;
    } else if (e._input.disabled || e.config.inline)
      return;
    var p = e.isOpen;
    e.isOpen = !0, p || (e.calendarContainer.classList.add("open"), e._input.classList.add("active"), J("onOpen"), _e(o)), e.config.enableTime === !0 && e.config.noCalendar === !0 && e.config.allowInput === !1 && (n === void 0 || !e.timeContainer.contains(n.relatedTarget)) && setTimeout(function() {
      return e.hourElement.select();
    }, 50);
  }
  function We(n) {
    return function(o) {
      var r = e.config["_" + n + "Date"] = e.parseDate(o, e.config.dateFormat), p = e.config["_" + (n === "min" ? "max" : "min") + "Date"];
      r !== void 0 && (e[n === "min" ? "minDateHasTime" : "maxDateHasTime"] = r.getHours() > 0 || r.getMinutes() > 0 || r.getSeconds() > 0), e.selectedDates && (e.selectedDates = e.selectedDates.filter(function(b) {
        return Q(b);
      }), !e.selectedDates.length && n === "min" && C(r), Me()), e.daysContainer && (gt(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!p && r !== void 0 && p.getFullYear() === r.getFullYear());
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
    ], o = He(He({}, JSON.parse(JSON.stringify(t.dataset || {}))), a), r = {};
    e.config.parseDate = o.parseDate, e.config.formatDate = o.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(U) {
        e.config._enable = mt(U);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(U) {
        e.config._disable = mt(U);
      }
    });
    var p = o.mode === "time";
    if (!o.dateFormat && (o.enableTime || p)) {
      var b = Ce.defaultConfig.dateFormat || dt.dateFormat;
      r.dateFormat = o.noCalendar || p ? "H:i" + (o.enableSeconds ? ":S" : "") : b + " H:i" + (o.enableSeconds ? ":S" : "");
    }
    if (o.altInput && (o.enableTime || p) && !o.altFormat) {
      var B = Ce.defaultConfig.altFormat || dt.altFormat;
      r.altFormat = o.noCalendar || p ? "h:i" + (o.enableSeconds ? ":S K" : " K") : B + (" h:i" + (o.enableSeconds ? ":S" : "") + " K");
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
    var X = function(U) {
      return function(ce) {
        e.config[U === "min" ? "_minTime" : "_maxTime"] = e.parseDate(ce, "H:i:S");
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
    }), o.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, o);
    for (var z = 0; z < n.length; z++)
      e.config[n[z]] = e.config[n[z]] === !0 || e.config[n[z]] === "true";
    Bt.filter(function(U) {
      return e.config[U] !== void 0;
    }).forEach(function(U) {
      e.config[U] = jt(e.config[U] || []).map(v);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var z = 0; z < e.config.plugins.length; z++) {
      var ne = e.config.plugins[z](e) || {};
      for (var A in ne)
        Bt.indexOf(A) > -1 ? e.config[A] = jt(ne[A]).map(v).concat(e.config[A]) : typeof o[A] > "u" && (e.config[A] = ne[A]);
    }
    o.altInputClass || (e.config.altInputClass = Je().className + " " + e.config.altInputClass), J("onParseConfig");
  }
  function Je() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Ne() {
    typeof e.config.locale != "object" && typeof Ce.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = He(He({}, Ce.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? Ce.l10ns[e.config.locale] : void 0), Qe.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Qe.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Qe.M = "(" + e.l10n.months.shorthand.join("|") + ")", Qe.F = "(" + e.l10n.months.longhand.join("|") + ")", Qe.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = He(He({}, a), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && Ce.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Qt(e), e.parseDate = Nt({ config: e.config, l10n: e.l10n });
  }
  function _e(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      J("onPreCalendarPosition");
      var o = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(cn, un) {
        return cn + un.offsetHeight;
      }, 0), p = e.calendarContainer.offsetWidth, b = e.config.position.split(" "), B = b[0], X = b.length > 1 ? b[1] : null, z = o.getBoundingClientRect(), ne = window.innerHeight - z.bottom, A = B === "above" || B !== "below" && ne < r && z.top > r, U = window.pageYOffset + z.top + (A ? -r - 2 : o.offsetHeight + 2);
      if (Ie(e.calendarContainer, "arrowTop", !A), Ie(e.calendarContainer, "arrowBottom", A), !e.config.inline) {
        var ce = window.pageXOffset + z.left, Ue = !1, Ae = !1;
        X === "center" ? (ce -= (p - z.width) / 2, Ue = !0) : X === "right" && (ce -= p - z.width, Ae = !0), Ie(e.calendarContainer, "arrowLeft", !Ue && !Ae), Ie(e.calendarContainer, "arrowCenter", Ue), Ie(e.calendarContainer, "arrowRight", Ae);
        var wt = window.document.body.offsetWidth - (window.pageXOffset + z.right), lt = ce + p > window.document.body.offsetWidth, nn = wt + p > window.document.body.offsetWidth;
        if (Ie(e.calendarContainer, "rightMost", lt), !e.config.static)
          if (e.calendarContainer.style.top = U + "px", !lt)
            e.calendarContainer.style.left = ce + "px", e.calendarContainer.style.right = "auto";
          else if (!nn)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = wt + "px";
          else {
            var Et = yt();
            if (Et === void 0)
              return;
            var on = window.document.body.offsetWidth, an = Math.max(0, on / 2 - p / 2), rn = ".flatpickr-calendar.centerMost:before", sn = ".flatpickr-calendar.centerMost:after", ln = Et.cssRules.length, dn = "{left:" + z.left + "px;right:auto;}";
            Ie(e.calendarContainer, "rightMost", !1), Ie(e.calendarContainer, "centerMost", !0), Et.insertRule(rn + "," + sn + dn, ln), e.calendarContainer.style.left = an + "px", e.calendarContainer.style.right = "auto";
          }
      }
    }
  }
  function yt() {
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
    return n ?? Ht();
  }
  function Ht() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function gt() {
    e.config.noCalendar || e.isMobile || (y(), Pe(), D());
  }
  function Ke() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function Xe(n) {
    n.preventDefault(), n.stopPropagation();
    var o = function(U) {
      return U.classList && U.classList.contains("flatpickr-day") && !U.classList.contains("flatpickr-disabled") && !U.classList.contains("notAllowed");
    }, r = Xt(Le(n), o);
    if (r !== void 0) {
      var p = r, b = e.latestSelectedDateObj = new Date(p.dateObj.getTime()), B = (b.getMonth() < e.currentMonth || b.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = p, e.config.mode === "single")
        e.selectedDates = [b];
      else if (e.config.mode === "multiple") {
        var X = Ge(b);
        X ? e.selectedDates.splice(parseInt(X), 1) : e.selectedDates.push(b);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = b, e.selectedDates.push(b), ze(b, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(U, ce) {
        return U.getTime() - ce.getTime();
      }));
      if (k(), B) {
        var z = e.currentYear !== b.getFullYear();
        e.currentYear = b.getFullYear(), e.currentMonth = b.getMonth(), z && (J("onYearChange"), y()), J("onMonthChange");
      }
      if (Pe(), D(), Me(), !B && e.config.mode !== "range" && e.config.showMonths === 1 ? fe(p) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var ne = e.config.mode === "single" && !e.config.enableTime, A = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (ne || A) && Ke();
      }
      te();
    }
  }
  var at = {
    locale: [Ne, Ve],
    showMonths: [Y, u, $e],
    minDate: [$],
    maxDate: [$],
    positionElement: [W],
    clickOpens: [
      function() {
        e.config.clickOpens === !0 ? (T(e._input, "focus", e.open), T(e._input, "click", e.open)) : (e._input.removeEventListener("focus", e.open), e._input.removeEventListener("click", e.open));
      }
    ]
  };
  function bt(n, o) {
    if (n !== null && typeof n == "object") {
      Object.assign(e.config, n);
      for (var r in n)
        at[r] !== void 0 && at[r].forEach(function(p) {
          return p();
        });
    } else
      e.config[n] = o, at[n] !== void 0 ? at[n].forEach(function(p) {
        return p();
      }) : Bt.indexOf(n) > -1 && (e.config[n] = jt(o));
    e.redraw(), Me(!0);
  }
  function vt(n, o) {
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
      return p instanceof Date && Q(p, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(p, b) {
      return p.getTime() - b.getTime();
    });
  }
  function Mt(n, o, r) {
    if (o === void 0 && (o = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(o);
    vt(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), $(void 0, o), C(), e.selectedDates.length === 0 && e.clear(!1), Me(o), o && J("onChange");
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
  function rt() {
    e.selectedDates = [], e.now = e.parseDate(e.config.now) || /* @__PURE__ */ new Date();
    var n = e.config.defaultDate || ((e.input.nodeName === "INPUT" || e.input.nodeName === "TEXTAREA") && e.input.placeholder && e.input.value === e.input.placeholder ? null : e.input.value);
    n && vt(n, e.config.dateFormat), e._initialDate = e.selectedDates.length > 0 ? e.selectedDates[0] : e.config.minDate && e.config.minDate.getTime() > e.now.getTime() ? e.config.minDate : e.config.maxDate && e.config.maxDate.getTime() < e.now.getTime() ? e.config.maxDate : e.now, e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth(), e.selectedDates.length > 0 && (e.latestSelectedDateObj = e.selectedDates[0]), e.config.minTime !== void 0 && (e.config.minTime = e.parseDate(e.config.minTime, "H:i")), e.config.maxTime !== void 0 && (e.config.maxTime = e.parseDate(e.config.maxTime, "H:i")), e.minDateHasTime = !!e.config.minDate && (e.config.minDate.getHours() > 0 || e.config.minDate.getMinutes() > 0 || e.config.minDate.getSeconds() > 0), e.maxDateHasTime = !!e.config.maxDate && (e.config.maxDate.getHours() > 0 || e.config.maxDate.getMinutes() > 0 || e.config.maxDate.getSeconds() > 0);
  }
  function Ct() {
    if (e.input = Je(), !e.input) {
      e.config.errorHandler(new Error("Invalid input element specified"));
      return;
    }
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = re(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), W();
  }
  function W() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function q() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = re("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    T(e.mobileInput, "change", function(o) {
      e.setDate(Le(o).value, !1, e.mobileFormatStr), J("onChange"), J("onClose");
    });
  }
  function Z(n) {
    if (e.isOpen === !0)
      return e.close();
    e.open(n);
  }
  function J(n, o) {
    if (e.config !== void 0) {
      var r = e.config[n];
      if (r !== void 0 && r.length > 0)
        for (var p = 0; r[p] && p < r.length; p++)
          r[p](e.selectedDates, e.input.value, e, o);
      n === "onChange" && (e.input.dispatchEvent(je("change")), e.input.dispatchEvent(je("input")));
    }
  }
  function je(n) {
    var o = document.createEvent("Event");
    return o.initEvent(n, !0, !0), o;
  }
  function Ge(n) {
    for (var o = 0; o < e.selectedDates.length; o++) {
      var r = e.selectedDates[o];
      if (r instanceof Date && ze(r, n) === 0)
        return "" + o;
    }
    return !1;
  }
  function it(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : ze(n, e.selectedDates[0]) >= 0 && ze(n, e.selectedDates[1]) <= 0;
  }
  function Pe() {
    e.config.noCalendar || e.isMobile || !e.monthNav || (e.yearElements.forEach(function(n, o) {
      var r = new Date(e.currentYear, e.currentMonth, 1);
      r.setMonth(e.currentMonth + o), e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? e.monthElements[o].textContent = _t(r.getMonth(), e.config.shorthandCurrentMonth, e.l10n) + " " : e.monthsDropdownContainer.value = r.getMonth().toString(), n.value = r.getFullYear().toString();
    }), e._hidePrevMonthArrow = e.config.minDate !== void 0 && (e.currentYear === e.config.minDate.getFullYear() ? e.currentMonth <= e.config.minDate.getMonth() : e.currentYear < e.config.minDate.getFullYear()), e._hideNextMonthArrow = e.config.maxDate !== void 0 && (e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth + 1 > e.config.maxDate.getMonth() : e.currentYear > e.config.maxDate.getFullYear()));
  }
  function qe(n) {
    var o = n || (e.config.altInput ? e.config.altFormat : e.config.dateFormat);
    return e.selectedDates.map(function(r) {
      return e.formatDate(r, o);
    }).filter(function(r, p, b) {
      return e.config.mode !== "range" || e.config.enableTime || b.indexOf(r) === p;
    }).join(e.config.mode !== "range" ? e.config.conjunction : e.l10n.rangeSeparator);
  }
  function Me(n) {
    n === void 0 && (n = !0), e.mobileInput !== void 0 && e.mobileFormatStr && (e.mobileInput.value = e.latestSelectedDateObj !== void 0 ? e.formatDate(e.latestSelectedDateObj, e.mobileFormatStr) : ""), e.input.value = qe(e.config.dateFormat), e.altInput !== void 0 && (e.altInput.value = qe(e.config.altFormat)), n !== !1 && J("onValueUpdate");
  }
  function Dt(n) {
    var o = Le(n), r = e.prevMonthNav.contains(o), p = e.nextMonthNav.contains(o);
    r || p ? x(r ? -1 : 1) : e.yearElements.indexOf(o) >= 0 ? o.select() : o.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : o.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function st(n) {
    n.preventDefault();
    var o = n.type === "keydown", r = Le(n), p = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[Fe(e.amPM.textContent === e.l10n.amPM[0])]);
    var b = parseFloat(p.getAttribute("min")), B = parseFloat(p.getAttribute("max")), X = parseFloat(p.getAttribute("step")), z = parseInt(p.value, 10), ne = n.delta || (o ? n.which === 38 ? 1 : -1 : 0), A = z + X * ne;
    if (typeof p.value < "u" && p.value.length === 2) {
      var U = p === e.hourElement, ce = p === e.minuteElement;
      A < b ? (A = B + A + Fe(!U) + (Fe(U) && Fe(!e.amPM)), ce && H(void 0, -1, e.hourElement)) : A > B && (A = p === e.hourElement ? A - B - Fe(!e.amPM) : b, ce && H(void 0, 1, e.hourElement)), e.amPM && U && (X === 1 ? A + z === 23 : Math.abs(A - z) > X) && (e.amPM.textContent = e.l10n.amPM[Fe(e.amPM.textContent === e.l10n.amPM[0])]), p.value = Te(A);
    }
  }
  return l(), e;
}
function ct(t, a) {
  for (var e = Array.prototype.slice.call(t).filter(function(v) {
    return v instanceof HTMLElement;
  }), h = [], l = 0; l < e.length; l++) {
    var s = e[l];
    try {
      if (s.getAttribute("data-fp-omit") !== null)
        continue;
      s._flatpickr !== void 0 && (s._flatpickr.destroy(), s._flatpickr = void 0), s._flatpickr = Qo(s, a || {}), h.push(s._flatpickr);
    } catch (v) {
      console.error(v);
    }
  }
  return h.length === 1 ? h[0] : h;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return ct(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return ct([this], t);
});
var Ce = function(t, a) {
  return typeof t == "string" ? ct(window.document.querySelectorAll(t), a) : t instanceof Node ? ct([t], a) : ct(t, a);
};
Ce.defaultConfig = {};
Ce.l10ns = {
  en: He({}, xt),
  default: He({}, xt)
};
Ce.localize = function(t) {
  Ce.l10ns.default = He(He({}, Ce.l10ns.default), t);
};
Ce.setDefaults = function(t) {
  Ce.defaultConfig = He(He({}, Ce.defaultConfig), t);
};
Ce.parseDate = Nt({});
Ce.formatDate = Qt({});
Ce.compareDates = ze;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return ct(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = Ce);
var ea = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ta(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var en = { exports: {} };
(function(t, a) {
  (function(e, h) {
    t.exports = h();
  })(ea, function() {
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
        for (var i, k = 1, C = arguments.length; k < C; k++) {
          i = arguments[k];
          for (var w in i) Object.prototype.hasOwnProperty.call(i, w) && (g[w] = i[w]);
        }
        return g;
      }, e.apply(this, arguments);
    }, h = function(m, g, i) {
      return i.months[g ? "shorthand" : "longhand"][m];
    };
    function l(m) {
      for (; m.firstChild; )
        m.removeChild(m.firstChild);
    }
    function s(m) {
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
        function C() {
          if (i.rContainer) {
            l(i.rContainer);
            for (var j = 0; j < i.monthElements.length; j++) {
              var E = i.monthElements[j];
              E.parentNode && E.parentNode.removeChild(E);
            }
          }
        }
        function w() {
          i.rContainer && (k.monthsContainer = i._createElement("div", "flatpickr-monthSelect-months"), k.monthsContainer.tabIndex = -1, S(), i.rContainer.appendChild(k.monthsContainer), i.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + g.theme));
        }
        function S() {
          if (k.monthsContainer) {
            l(k.monthsContainer);
            for (var j = document.createDocumentFragment(), E = 0; E < 12; E++) {
              var D = i.createDay("flatpickr-monthSelect-month", new Date(i.currentYear, E), 0, E);
              D.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && D.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && D.classList.add("today"), D.textContent = h(E, g.shorthand, i.l10n), D.addEventListener("click", $), j.appendChild(D);
            }
            k.monthsContainer.appendChild(j), i.config.minDate && i.currentYear === i.config.minDate.getFullYear() ? i.prevMonthNav.classList.add("flatpickr-disabled") : i.prevMonthNav.classList.remove("flatpickr-disabled"), i.config.maxDate && i.currentYear === i.config.maxDate.getFullYear() ? i.nextMonthNav.classList.add("flatpickr-disabled") : i.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function T() {
          i._bind(i.prevMonthNav, "click", function(j) {
            j.preventDefault(), j.stopPropagation(), i.changeYear(i.currentYear - 1), ae(), S();
          }), i._bind(i.nextMonthNav, "click", function(j) {
            j.preventDefault(), j.stopPropagation(), i.changeYear(i.currentYear + 1), ae(), S();
          }), i._bind(k.monthsContainer, "mouseover", function(j) {
            i.config.mode === "range" && i.onMouseOver(s(j), "flatpickr-monthSelect-month");
          });
        }
        function te() {
          if (i.rContainer && i.selectedDates.length) {
            for (var j = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), E = 0; E < j.length; E++)
              j[E].classList.remove("selected");
            var D = i.selectedDates[0].getMonth(), y = i.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (D + 1) + ")");
            y && y.classList.add("selected");
          }
        }
        function ae() {
          var j = i.selectedDates[0];
          if (j && (j = new Date(j), j.setFullYear(i.currentYear), i.config.minDate && j < i.config.minDate && (j = i.config.minDate), i.config.maxDate && j > i.config.maxDate && (j = i.config.maxDate), i.currentYear = j.getFullYear()), i.currentYearElement.value = String(i.currentYear), i.rContainer) {
            var E = i.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            E.forEach(function(D) {
              D.dateObj.setFullYear(i.currentYear), i.config.minDate && D.dateObj < i.config.minDate || i.config.maxDate && D.dateObj > i.config.maxDate ? D.classList.add("flatpickr-disabled") : D.classList.remove("flatpickr-disabled");
            });
          }
          te();
        }
        function $(j) {
          j.preventDefault(), j.stopPropagation();
          var E = s(j);
          if (E instanceof Element && !E.classList.contains("flatpickr-disabled") && !E.classList.contains("notAllowed") && (_(E.dateObj), i.config.closeOnSelect)) {
            var D = i.config.mode === "single", y = i.config.mode === "range" && i.selectedDates.length === 2;
            (D || y) && i.close();
          }
        }
        function _(j) {
          var E = new Date(i.currentYear, j.getMonth(), j.getDate()), D = [];
          switch (i.config.mode) {
            case "single":
              D = [E];
              break;
            case "multiple":
              D.push(E);
              break;
            case "range":
              i.selectedDates.length === 2 ? D = [E] : (D = i.selectedDates.concat([E]), D.sort(function(y, F) {
                return y.getTime() - F.getTime();
              }));
              break;
          }
          i.setDate(D, !0), te();
        }
        var H = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function ie(j, E, D, y) {
          var F = H[y.keyCode] !== void 0;
          if (!(!F && y.keyCode !== 13) && !(!i.rContainer || !k.monthsContainer)) {
            var Y = i.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), we = Array.prototype.indexOf.call(k.monthsContainer.children, document.activeElement);
            if (we === -1) {
              var ke = Y || k.monthsContainer.firstElementChild;
              ke.focus(), we = ke.$i;
            }
            F ? k.monthsContainer.children[(12 + we + H[y.keyCode]) % 12].focus() : y.keyCode === 13 && k.monthsContainer.contains(document.activeElement) && _(document.activeElement.dateObj);
          }
        }
        function de() {
          var j;
          ((j = i.config) === null || j === void 0 ? void 0 : j.mode) === "range" && i.selectedDates.length === 1 && i.clear(!1), i.selectedDates.length || S();
        }
        function fe() {
          g._stubbedCurrentMonth = i._initialDate.getMonth(), i._initialDate.setMonth(g._stubbedCurrentMonth), i.currentMonth = g._stubbedCurrentMonth;
        }
        function ue() {
          g._stubbedCurrentMonth && (i._initialDate.setMonth(g._stubbedCurrentMonth), i.currentMonth = g._stubbedCurrentMonth, delete g._stubbedCurrentMonth);
        }
        function pe() {
          if (k.monthsContainer !== null)
            for (var j = k.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), E = 0; E < j.length; E++)
              j[E].removeEventListener("click", $);
        }
        return {
          onParseConfig: function() {
            i.config.enableTime = !1;
          },
          onValueUpdate: te,
          onKeyDown: ie,
          onReady: [
            fe,
            C,
            w,
            T,
            te,
            function() {
              i.config.onClose.push(de), i.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            ue,
            pe,
            function() {
              i.config.onClose = i.config.onClose.filter(function(j) {
                return j !== de;
              });
            }
          ]
        };
      };
    }
    return u;
  });
})(en);
var na = en.exports;
const oa = /* @__PURE__ */ ta(na), aa = { class: "relative" }, ra = ["placeholder", "disabled", "readonly"], ia = ["aria-label"], sa = {
  key: 0,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-4 w-4",
  "aria-hidden": "true"
}, la = {
  key: 1,
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  class: "h-4 w-4",
  "aria-hidden": "true"
}, da = {
  key: 2,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, ca = { class: "flex items-center justify-between mb-2" }, ua = { class: "text-xs opacity-70" }, fa = { class: "grid grid-cols-4 gap-2" }, ha = ["onClick"], pa = {
  key: 3,
  class: "mitreka-month-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, ga = { class: "mb-3 flex items-center justify-between" }, va = { class: "text-sm font-semibold" }, ma = { class: "grid grid-cols-3 gap-2" }, wa = ["onClick"], Pr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = P(null), s = P(!1), v = P((/* @__PURE__ */ new Date()).getFullYear() - 6), u = P(!1), m = P((/* @__PURE__ */ new Date()).getFullYear());
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
    ], k = M(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "month-year-grid" ? e.dateFormat || "Y-m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), C = M(() => e.displayFormat ? e.displayFormat : e.picker === "month-year-grid" ? "M Y" : e.picker === "month" ? "M" : k.value), w = M(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), S = M(() => {
      if (e.picker !== "month-year-grid") return "";
      const E = Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || "";
      if (!E) return "";
      const [D, y] = String(E).split("-"), F = Number(y) - 1;
      return !D || Number.isNaN(F) || F < 0 || F > 11 ? String(E) : `${i[F]} ${D}`;
    }), T = M(() => e.picker === "year-grid" ? { value: w.value } : e.picker === "month-year-grid" ? { value: S.value } : {}), te = M(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), ae = M(
      () => e.clearable && te.value && !e.disabled && !e.readonly
    ), $ = M(() => !e.disabled), _ = M(() => ae.value && $.value ? "pr-16" : ae.value || $.value ? "pr-9" : ""), H = () => {
      var E;
      if (e.mode === "range" ? h("update:modelValue", []) : h("update:modelValue", ""), e.picker === "year-grid") {
        s.value = !1;
        return;
      }
      if (e.picker === "month-year-grid") {
        u.value = !1;
        return;
      }
      (E = g == null ? void 0 : g.clear) == null || E.call(g, !1);
    }, ie = () => {
      var E, D;
      if (l.value) {
        if (e.picker === "year-grid" || e.picker === "month-year-grid") {
          (E = g == null ? void 0 : g.destroy) == null || E.call(g), g = null;
          return;
        }
        (D = g == null ? void 0 : g.destroy) == null || D.call(g), g = Ce(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            oa({
              shorthand: !0,
              dateFormat: k.value,
              altFormat: C.value
            })
          ] : [],
          enableTime: e.enableTime,
          noCalendar: e.noCalendar,
          dateFormat: k.value,
          altInput: !!e.displayFormat || e.picker === "month",
          altFormat: C.value,
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
            var y, F;
            e.picker === "month" && ((y = g == null ? void 0 : g.calendarContainer) == null || y.classList.add("flatpickr-month-only")), e.picker === "year" && ((F = g == null ? void 0 : g.calendarContainer) == null || F.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var y, F;
            e.picker === "month" && ((y = g == null ? void 0 : g.calendarContainer) == null || y.classList.add("flatpickr-month-only")), e.picker === "year" && ((F = g == null ? void 0 : g.calendarContainer) == null || F.classList.add("flatpickr-year-only"));
          },
          onChange: (y) => {
            if (e.mode === "range") {
              const F = y.map(
                (Y) => g.formatDate(Y, k.value)
              );
              h("update:modelValue", F);
            } else {
              const F = y[0] ? g.formatDate(y[0], k.value) : "";
              h("update:modelValue", F);
            }
          }
        });
      }
    }, de = () => {
      var E;
      if (!e.disabled) {
        if (e.picker === "year-grid") {
          s.value = !0;
          return;
        }
        if (e.picker === "month-year-grid") {
          u.value = !0;
          return;
        }
        (E = g == null ? void 0 : g.open) == null || E.call(g);
      }
    };
    ft(ie), nt(() => {
      var E;
      return (E = g == null ? void 0 : g.destroy) == null ? void 0 : E.call(g);
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
      ie
    ), ve(
      () => e.modelValue,
      (E) => {
        !g || e.picker === "year-grid" || e.picker === "month-year-grid" || g.setDate(E, !1);
      }
    );
    const fe = M(
      () => Array.from({ length: 12 }, (E, D) => v.value + D)
    ), ue = (E) => {
      h("update:modelValue", E.toString()), s.value = !1;
    }, pe = (E) => {
      const D = `${m.value}-${String(E + 1).padStart(2, "0")}`;
      h("update:modelValue", D), u.value = !1;
    }, j = (E) => {
      if (!s.value && !u.value) return;
      const D = E.target;
      if (l.value && D && l.value.contains(D)) return;
      const y = document.querySelector(".mitreka-year-grid");
      if (y && D && y.contains(D)) return;
      const F = document.querySelector(".mitreka-month-year-grid");
      F && D && F.contains(D) || (s.value = !1, u.value = !1);
    };
    return ft(() => document.addEventListener("click", j)), nt(() => document.removeEventListener("click", j)), (E, D) => (d(), f("div", aa, [
      c("input", Pt({
        ref_key: "inputEl",
        ref: l,
        class: ["input w-full", [t.inputClass, _.value]],
        placeholder: t.placeholder
      }, T.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: de,
        onFocus: de
      }), null, 16, ra),
      $.value ? (d(), f("button", {
        key: 0,
        type: "button",
        class: L([
          "absolute top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
          ae.value ? "right-8" : "right-2"
        ]),
        "aria-label": t.noCalendar ? "Open time picker" : "Open date picker",
        onMousedown: D[0] || (D[0] = oe(() => {
        }, ["prevent"])),
        onClick: oe(de, ["stop"])
      }, [
        t.noCalendar ? (d(), f("svg", sa, [...D[6] || (D[6] = [
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
        ])])) : (d(), f("svg", la, [...D[7] || (D[7] = [
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
      ], 42, ia)) : O("", !0),
      ae.value ? (d(), f("button", {
        key: 1,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: D[1] || (D[1] = oe(() => {
        }, ["prevent"])),
        onClick: oe(H, ["stop"])
      }, [...D[8] || (D[8] = [
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
      t.picker === "year-grid" && s.value ? (d(), f("div", da, [
        c("div", ca, [
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: D[2] || (D[2] = (y) => v.value -= 12)
          }, " Prev "),
          c("div", ua, N(v.value) + " - " + N(v.value + 11), 1),
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: D[3] || (D[3] = (y) => v.value += 12)
          }, " Next ")
        ]),
        c("div", fa, [
          (d(!0), f(be, null, Ee(fe.value, (y) => (d(), f("button", {
            key: y,
            class: L(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === y.toString() }]),
            type: "button",
            onClick: (F) => ue(y)
          }, N(y), 11, ha))), 128))
        ])
      ])) : O("", !0),
      t.picker === "month-year-grid" && u.value ? (d(), f("div", pa, [
        c("div", ga, [
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: D[4] || (D[4] = (y) => m.value -= 1)
          }, " Prev "),
          c("div", va, N(m.value), 1),
          c("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: D[5] || (D[5] = (y) => m.value += 1)
          }, " Next ")
        ]),
        c("div", ma, [
          (d(), f(be, null, Ee(i, (y, F) => c("button", {
            key: y,
            class: "btn btn-ghost btn-sm",
            type: "button",
            onClick: (Y) => pe(F)
          }, N(y), 9, wa)), 64))
        ])
      ])) : O("", !0)
    ]));
  }
}), Yr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = Zt(), s = P(null), v = P(null), u = P(13), m = P(!1);
    let g = null, i = null;
    const k = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], C = [], w = P("normal"), S = M(() => [
      "w-full",
      w.value === "autoHeight" ? "h-auto" : "h-full"
    ]), T = M(() => w.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), te = () => {
      const I = document.documentElement, x = I.classList.contains("dark"), G = (I.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      m.value = x || G;
    }, ae = M(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : m.value), $ = M(() => ae.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), _ = M(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), H = M(() => ["agx", $.value, _.value, l.class]), ie = M(() => [{ "--ag-odd-row-background-color": e.striped ? ae.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), de = M(() => {
      const { class: I, style: x, onGridReady: G, ...R } = l;
      return R;
    }), fe = (I) => typeof I == "number" && Number.isFinite(I) ? I : void 0, ue = M(() => {
      const I = l.gridOptions;
      if (I && typeof I == "object") return I;
      const x = l["grid-options"];
      return x && typeof x == "object" ? x : {};
    }), pe = (I) => {
      const x = fe(l[I]);
      if (typeof x == "number") return x;
      const R = fe(l[I === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof R == "number" ? R : fe(ue.value[I]);
    }, j = () => {
      const I = l.domLayout;
      if (typeof I == "string" && I.length > 0) return I;
      const x = l["dom-layout"];
      if (typeof x == "string" && x.length > 0) return x;
      const G = ue.value.domLayout;
      return typeof G == "string" && G.length > 0 ? G : void 0;
    }, E = () => {
      var x, G;
      if (!v.value) return 0;
      const I = (R) => typeof R == "number" && Number.isFinite(R) && R >= 0;
      if (typeof v.value.getDisplayedRowCount == "function") {
        const R = v.value.getDisplayedRowCount();
        if (I(R)) return R;
      }
      if (typeof v.value.paginationGetRowCount == "function") {
        const R = v.value.paginationGetRowCount();
        if (I(R)) return R;
      }
      if (typeof v.value.getModel == "function") {
        const R = (G = (x = v.value).getModel) == null ? void 0 : G.call(x), ge = R && typeof R.getRowCount == "function" ? R.getRowCount() : void 0;
        if (I(ge)) return ge;
      }
      return 0;
    }, D = () => {
      const I = Number(e.autoHeightThreshold);
      return Number.isFinite(I) ? Math.max(1, Math.floor(I)) : 15;
    }, y = () => {
      if (!v.value) return;
      const I = j();
      if (I) {
        w.value = I, v.value.setGridOption("domLayout", I);
        return;
      }
      const x = e.autoHeightWhenFewRows && E() < D() ? "autoHeight" : "normal";
      w.value = x, v.value.setGridOption("domLayout", x);
    }, F = () => {
      var I;
      for (; C.length > 0; )
        (I = C.pop()) == null || I();
    }, Y = () => {
      if (!v.value) return;
      F();
      const I = () => y();
      k.forEach((x) => {
        v.value.addEventListener(x, I), C.push(() => {
          var G;
          (G = v.value) == null || G.removeEventListener(x, I);
        });
      });
    }, we = () => {
      if (!e.autoHeaderHeight || !v.value) return;
      const I = pe("headerHeight") ?? kn(e.density), x = pe("groupHeaderHeight") ?? xn(e.density);
      v.value.setGridOption("headerHeight", I), v.value.setGridOption("groupHeaderHeight", x);
    }, ke = () => {
      if (!e.autoRowHeight || !v.value) return;
      const I = yn(u.value, e.density);
      v.value.setGridOption("rowHeight", I), v.value.setGridOption("getRowHeight", () => I), v.value.resetRowHeights();
    }, $e = () => {
      i == null || i(), i = null, !(!e.pinnedShadows || !s.value) && (i = bn(s.value));
    }, Ve = (I) => {
      v.value = I.api, u.value = Mn(s.value), Y(), we(), y(), ke(), $e(), requestAnimationFrame(() => y()), h("grid-ready", I);
    };
    return ve(
      () => e.density,
      () => {
        var I;
        we(), ke(), (I = v.value) == null || I.refreshCells({ force: !0 });
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
        we();
      }
    ), ve(
      () => [e.autoHeightWhenFewRows, e.autoHeightThreshold],
      () => {
        y();
      }
    ), ve(
      () => [l.domLayout, l["dom-layout"], l.gridOptions, l["grid-options"]],
      () => {
        y();
      }
    ), ve(
      () => [l.rowData, l["row-data"]],
      () => {
        requestAnimationFrame(() => y()), requestAnimationFrame(() => $e());
      }
    ), ve(
      () => e.pinnedShadows,
      () => {
        requestAnimationFrame(() => $e());
      }
    ), ft(() => {
      te(), e.autoObserveTheme && (g = new MutationObserver(te), g.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), $e();
    }), nt(() => {
      g == null || g.disconnect(), F(), i == null || i();
    }), (I, x) => (d(), f("div", {
      ref_key: "hostRef",
      ref: s,
      class: L(S.value),
      style: De(T.value)
    }, [
      se(K($n), Pt(de.value, {
        class: H.value,
        theme: "legacy",
        style: ie.value,
        onGridReady: Ve
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), ka = ["disabled"], xa = ["onMouseenter", "onClick", "aria-selected"], ya = 320, Lt = 12, Gt = 8, Rr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = P(null), s = P(null), v = P(null), u = P(!1), m = P(-1), g = P(0), i = P(0), k = P(0), C = P(240), w = P(null), S = P(!1), T = M(
      () => e.options.find((x) => x.value === e.modelValue) ?? null
    ), te = M(() => {
      var x;
      return ((x = T.value) == null ? void 0 : x.label) ?? e.placeholder;
    }), ae = {
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
    }, _ = {
      default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
      primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
      secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
      accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
      info: "bg-transparent border-info text-info hover:bg-info/10",
      success: "bg-transparent border-success text-success hover:bg-success/10",
      warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
      error: "bg-transparent border-error text-error hover:bg-error/10"
    }, H = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, ie = M(() => {
      const x = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", G = ae[e.size], R = e.variant === "outline" ? _[e.color] : $[e.color], ge = e.disabled ? "opacity-60 cursor-not-allowed" : "", he = u.value ? `ring-3 ${H[e.color]}` : "";
      return [x, G, R, ge, he].join(" ");
    }), de = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, fe = M(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), ue = (x) => {
      const G = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: G,
        backgroundColor: x ? "var(--color-base-200)" : "transparent"
      } : {
        color: G,
        backgroundColor: x ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, pe = M(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), j = M(() => ({
      top: `${g.value}px`,
      left: `${i.value}px`,
      width: `${k.value}px`
    })), E = M(() => ({
      maxHeight: `${C.value}px`
    })), D = (x) => x === "auto" || x === "scroll" || x === "overlay", y = (x) => {
      let G = (x == null ? void 0 : x.parentElement) ?? null;
      for (; G; ) {
        const R = window.getComputedStyle(G);
        if (D(R.overflowY) && G.scrollHeight > G.clientHeight)
          return G;
        G = G.parentElement;
      }
      return null;
    }, F = () => {
      if (!s.value) return !1;
      const x = s.value.getBoundingClientRect();
      if (!(x.bottom > Lt && x.top < window.innerHeight - Lt)) return !1;
      const R = y(s.value);
      if (!R) return !0;
      const ge = R.getBoundingClientRect();
      return x.bottom > ge.top + Gt && x.top < ge.bottom - Gt;
    }, Y = () => {
      if (!u.value || !s.value || !v.value) return;
      const x = s.value.getBoundingClientRect(), G = window.innerWidth, R = window.innerHeight, ge = 6, he = Lt, V = v.value.scrollHeight || v.value.offsetHeight || 240;
      w.value == null && (w.value = V);
      const ee = w.value, Q = R - x.bottom - ge - he, ye = x.top - ge - he, Se = Q < 180 && ye > Q;
      S.value = Se;
      const Be = Math.min(ya, ee, Math.max(0, Se ? ye : Q));
      C.value = Math.max(64, Be), k.value = Math.max(160, x.width), i.value = Math.min(
        Math.max(x.left, he),
        G - k.value - he
      ), Se ? g.value = Math.max(he, x.top - ge - C.value) : g.value = Math.min(
        R - he - C.value,
        x.bottom + ge
      );
    }, we = () => {
      e.disabled || (u.value = !u.value, u.value && (m.value = e.options.findIndex((x) => x.value === e.modelValue), Oe(Y)));
    }, ke = (x) => {
      x.disabled || (h("update:modelValue", x.value), h("change", x.value), u.value = !1);
    }, $e = (x) => {
      if (!e.disabled)
        switch (x.key) {
          case "Enter":
          case " ":
            if (x.preventDefault(), u.value && m.value >= 0) {
              const G = e.options[m.value];
              G && !G.disabled && ke(G);
            } else
              we();
            break;
          case "Escape":
            u.value = !1;
            break;
          case "ArrowDown":
            x.preventDefault(), u.value ? m.value = Math.min(m.value + 1, e.options.length - 1) : (u.value = !0, m.value = 0, Oe(Y));
            break;
          case "ArrowUp":
            x.preventDefault(), u.value && (m.value = Math.max(m.value - 1, 0));
            break;
        }
    }, Ve = (x) => {
      var he, V;
      const G = x.target, R = !!((he = l.value) != null && he.contains(G)), ge = !!((V = v.value) != null && V.contains(G));
      !R && !ge && (u.value = !1);
    }, I = (x) => {
      var R;
      if (!u.value) return;
      const G = x == null ? void 0 : x.target;
      if (!(G && ((R = v.value) != null && R.contains(G)))) {
        if (!F()) {
          u.value = !1;
          return;
        }
        Y();
      }
    };
    return ve(
      () => [u.value, e.options.length],
      async ([x]) => {
        if (!x) {
          w.value = null;
          return;
        }
        await Oe(), Y();
      }
    ), ft(() => {
      document.addEventListener("click", Ve), window.addEventListener("resize", I), window.addEventListener("scroll", I, !0);
    }), nt(() => {
      document.removeEventListener("click", Ve), window.removeEventListener("resize", I), window.removeEventListener("scroll", I, !0);
    }), (x, G) => (d(), f("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      c("button", {
        ref_key: "triggerRef",
        ref: s,
        type: "button",
        class: L(ie.value),
        disabled: t.disabled,
        onClick: we,
        onKeydown: $e
      }, [
        c("span", {
          class: L([T.value ? "" : "opacity-60"])
        }, N(te.value), 3),
        se(xe, {
          name: u.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, ka),
      (d(), Ze(ht, { to: "body" }, [
        se(et, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: tt(() => [
            u.value ? (d(), f("div", {
              key: 0,
              ref_key: "menuRef",
              ref: v,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: De([fe.value, j.value])
            }, [
              c("ul", {
                class: "overflow-auto",
                style: De(E.value),
                role: "listbox"
              }, [
                (d(!0), f(be, null, Ee(t.options, (R, ge) => {
                  var he, V, ee;
                  return d(), f("li", {
                    key: R.value,
                    class: L([
                      de[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      R.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((he = T.value) == null ? void 0 : he.value) === R.value ? "font-medium" : ""
                    ]),
                    style: De(ue(ge === m.value)),
                    onMouseenter: (Q) => m.value = ge,
                    onClick: (Q) => R.disabled ? null : ke(R),
                    role: "option",
                    "aria-selected": ((V = T.value) == null ? void 0 : V.value) === R.value
                  }, [
                    c("span", null, N(R.label), 1),
                    ((ee = T.value) == null ? void 0 : ee.value) === R.value ? (d(), Ze(xe, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: De(pe.value)
                    }, null, 8, ["style"])) : O("", !0)
                  ], 46, xa);
                }), 128))
              ], 4)
            ], 4)) : O("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), ba = { class: "absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none" }, Ma = ["disabled", "placeholder", "value", "readonly"], Ca = ["disabled"], Da = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, $a = ["data-idx", "onMouseenter", "onMousedown", "aria-selected"], Sa = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, _a = 320, zt = 12, Ut = 8, Wr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = P(e.modelValue ?? null);
    ve(
      () => e.modelValue,
      (V) => l.value = V ?? null
    ), ve(l, (V) => h("update:modelValue", V));
    const {
      root: s,
      inputEl: v,
      menu: u,
      floating: m,
      open: g,
      query: i,
      hoverIdx: k,
      loading: C,
      filtered: w,
      selected: S,
      openMenu: T,
      closeMenu: te,
      choose: ae,
      clear: $,
      onKey: _
    } = Cn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), H = P(null), ie = P(null), de = P(0), fe = P(0), ue = P(0), pe = P(240), j = P(null), E = P(!1), D = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, y = (V) => !V || V === "default" ? "input" : `input input-${V}`, F = M(
      () => {
        var V;
        return g.value ? i.value : ((V = S.value) == null ? void 0 : V.label) ?? "";
      }
    ), Y = M(() => ({
      top: `${de.value}px`,
      left: `${fe.value}px`,
      width: `${ue.value}px`
    })), we = M(() => ({
      maxHeight: `${pe.value}px`
    })), ke = (V) => V === "auto" || V === "scroll" || V === "overlay", $e = (V) => {
      let ee = (V == null ? void 0 : V.parentElement) ?? null;
      for (; ee; ) {
        const Q = window.getComputedStyle(ee);
        if (ke(Q.overflowY) && ee.scrollHeight > ee.clientHeight)
          return ee;
        ee = ee.parentElement;
      }
      return null;
    }, Ve = () => {
      if (!H.value) return !1;
      const V = H.value.getBoundingClientRect();
      if (!(V.bottom > zt && V.top < window.innerHeight - zt)) return !1;
      const Q = $e(H.value);
      if (!Q) return !0;
      const ye = Q.getBoundingClientRect();
      return V.bottom > ye.top + Ut && V.top < ye.bottom - Ut;
    }, I = () => {
      var Ne, _e;
      if (!g.value || !H.value) return;
      const V = H.value.getBoundingClientRect(), ee = window.innerWidth, Q = window.innerHeight, ye = 6, Se = zt, Ye = (((Ne = ie.value) == null ? void 0 : Ne.scrollHeight) ?? 0) || (((_e = u.value) == null ? void 0 : _e.scrollHeight) ?? 0) || 240;
      j.value == null && (j.value = Ye);
      const Be = j.value, Re = Q - V.bottom - ye - Se, ot = V.top - ye - Se, We = Re < 180 && ot > Re;
      E.value = We;
      const Je = Math.min(_a, Be, Math.max(0, We ? ot : Re));
      pe.value = Math.max(64, Je), ue.value = Math.max(220, V.width), fe.value = Math.min(
        Math.max(V.left, Se),
        ee - ue.value - Se
      ), We ? de.value = Math.max(Se, V.top - ye - pe.value) : de.value = Math.min(
        Q - Se - pe.value,
        V.bottom + ye
      );
    }, x = (V) => {
      var Q;
      if (!g.value) return;
      const ee = V == null ? void 0 : V.target;
      if (!(ee && ((Q = ie.value) != null && Q.contains(ee)))) {
        if (!Ve()) {
          te();
          return;
        }
        I();
      }
    };
    function G(V) {
      const ee = V instanceof HTMLElement ? V : null;
      ie.value = ee, m.value = ee;
    }
    function R() {
      e.disabled || (T(), Oe(I));
    }
    function ge() {
      if (!e.disabled) {
        if (g.value) {
          te();
          return;
        }
        T(), Oe(I);
      }
    }
    function he() {
    }
    return ve(
      () => [g.value, C.value, w.value.length],
      async ([V]) => {
        V && (await Oe(), I());
      }
    ), ve(g, (V) => {
      if (!V) {
        j.value = null;
        return;
      }
      Oe(I);
    }), ft(() => {
      window.addEventListener("resize", x), window.addEventListener("scroll", x, !0);
    }), nt(() => {
      window.removeEventListener("resize", x), window.removeEventListener("scroll", x, !0);
    }), (V, ee) => (d(), f("div", {
      ref_key: "root",
      ref: s,
      class: "relative"
    }, [
      c("div", {
        ref_key: "triggerRef",
        ref: H,
        class: "relative"
      }, [
        c("span", ba, [
          se(xe, {
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
          onFocus: R,
          onClick: R,
          onKeydown: ee[0] || (ee[0] = //@ts-ignore
          (...Q) => K(_) && K(_)(...Q)),
          readonly: !K(g),
          class: L([
            D[t.size || "md"],
            y(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: ee[1] || (ee[1] = (Q) => K(g) ? i.value = Q.target.value : null)
        }, null, 42, Ma),
        t.clearable && K(S) && !t.disabled ? (d(), f("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onMousedown: ee[2] || (ee[2] = oe(
            //@ts-ignore
            (...Q) => K($) && K($)(...Q),
            ["prevent", "stop"]
          )),
          onClick: oe(he, ["stop"])
        }, [
          se(xe, {
            name: "x",
            class: "w-4 h-4"
          })
        ], 32)) : O("", !0),
        c("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onMousedown: oe(ge, ["prevent", "stop"]),
          onClick: oe(he, ["stop"]),
          disabled: t.disabled
        }, [
          se(xe, {
            name: K(g) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 40, Ca)
      ], 512),
      (d(), Ze(ht, { to: "body" }, [
        se(et, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": E.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": E.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: tt(() => [
            K(g) ? (d(), f("div", {
              key: 0,
              ref: G,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: De(Y.value),
              onMousedown: ee[3] || (ee[3] = oe(() => {
              }, ["stop"])),
              onClick: ee[4] || (ee[4] = oe(() => {
              }, ["stop"]))
            }, [
              K(C) ? (d(), f("div", Da, "Loading...")) : (d(), f("ul", {
                key: 1,
                ref_key: "menu",
                ref: u,
                class: "overflow-auto",
                style: De(we.value),
                role: "listbox"
              }, [
                (d(!0), f(be, null, Ee(K(w), (Q, ye) => {
                  var Se, Ye;
                  return d(), f("li", {
                    key: Q.value,
                    "data-idx": ye,
                    class: L([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      ye === K(k) ? "bg-base-200" : "",
                      Q.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (Be) => k.value = ye,
                    onMousedown: oe((Be) => Q.disabled ? null : K(ae)(Q), ["prevent"]),
                    role: "option",
                    "aria-selected": ((Se = K(S)) == null ? void 0 : Se.value) === Q.value
                  }, [
                    c("span", null, N(Q.label), 1),
                    ((Ye = K(S)) == null ? void 0 : Ye.value) === Q.value ? (d(), Ze(xe, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : O("", !0)
                  ], 42, $a);
                }), 128)),
                !K(w).length && !K(C) ? (d(), f("li", Sa, " No results ")) : O("", !0)
              ], 4))
            ], 36)) : O("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Ha = { class: "truncate" }, Ea = ["onClick"], Ba = {
  key: 0,
  class: "badge badge-soft-primary",
  style: { "padding-inline": "1px" }
}, ja = {
  key: 1,
  class: "flex-1 min-w-0"
}, Ia = {
  key: 0,
  class: "flex w-full flex-wrap items-center gap-1.5"
}, Ta = { class: "truncate" }, Aa = ["onClick"], La = { class: "flex items-center gap-2 w-full" }, za = { class: "flex-1 min-w-[8ch]" }, Fa = {
  key: 2,
  class: "pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
}, Oa = { class: "truncate" }, Va = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Na = ["onClick"], Pa = ["checked", "onClick"], Ya = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, Ra = 320, Ft = 12, Kt = 8, Wa = /* @__PURE__ */ le({
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
    const e = t, h = a, l = M({
      get: () => e.modelValue ?? [],
      set: (W) => h("update:modelValue", W ?? [])
    }), {
      root: s,
      inputEl: v,
      menu: u,
      floating: m,
      open: g,
      query: i,
      loading: k,
      filtered: C,
      selectedList: w,
      openMenu: S,
      closeMenu: T,
      toggle: te,
      clearAll: ae,
      onKey: $
    } = Dn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), _ = P(null), H = P(null), ie = P(0), de = P(0), fe = P(0), ue = P(240), pe = P(null), j = P(!1), E = {
      xs: "min-h-[var(--size-field-xs)]",
      sm: "min-h-[var(--size-field-sm)]",
      md: "min-h-[var(--size-field-md)]",
      lg: "min-h-[var(--size-field-lg)]",
      xl: "min-h-[var(--size-field-xl)]"
    }, D = {
      xs: "xxs",
      sm: "xs",
      md: "sm",
      lg: "md",
      xl: "lg"
    }, y = {
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
    }, ke = {
      xs: "icon-btn-xs",
      sm: "icon-btn-sm",
      md: "icon-btn-sm",
      lg: "icon-btn-lg",
      xl: "icon-btn-xl"
    }, $e = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg",
      xl: "text-xl"
    }, Ve = {
      xs: "text-xs py-1 px-1.5",
      sm: "text-sm py-1.5 px-2",
      md: "text-base py-1.5 px-2",
      lg: "text-lg py-2 px-2.5",
      xl: "text-xl py-2.5 px-3"
    }, I = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, x = M(() => e.displayMode ?? "stacked"), G = M(() => x.value === "inline-compact"), R = M(
      () => D[e.size || "md"]
    ), ge = M(
      () => y[R.value]
    ), he = M(
      () => F[R.value]
    ), V = M(() => ({
      top: `${ie.value}px`,
      left: `${de.value}px`,
      width: `${fe.value}px`
    })), ee = M(() => ({
      maxHeight: `${ue.value}px`
    })), Q = (W) => W === "auto" || W === "scroll" || W === "overlay", ye = (W) => {
      let q = (W == null ? void 0 : W.parentElement) ?? null;
      for (; q; ) {
        const Z = window.getComputedStyle(q);
        if (Q(Z.overflowY) && q.scrollHeight > q.clientHeight)
          return q;
        q = q.parentElement;
      }
      return null;
    }, Se = () => {
      if (!_.value) return !1;
      const W = _.value.getBoundingClientRect();
      if (!(W.bottom > Ft && W.top < window.innerHeight - Ft)) return !1;
      const Z = ye(_.value);
      if (!Z) return !0;
      const J = Z.getBoundingClientRect();
      return W.bottom > J.top + Kt && W.top < J.bottom - Kt;
    }, Ye = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), Be = (W) => l.value.some((q) => String(q) === String(W)), Re = M(() => [...C.value].sort((W, q) => {
      const Z = Be(W.value), J = Be(q.value);
      return Z !== J ? Z ? -1 : 1 : Ye.compare(W.label, q.label);
    })), ot = M(
      () => l.value.map((W) => String(W)).sort().join("|")
    ), We = P(null), pt = P(null), Je = P([]), Ne = P(0);
    let _e = null;
    const yt = M(
      () => Math.max(0, w.value.length - Ne.value)
    );
    function Ht(W, q) {
      W && (Je.value[q] = W);
    }
    function gt() {
      var it, Pe, qe;
      if (!G.value) {
        Ne.value = w.value.length;
        return;
      }
      const W = ((it = We.value) == null ? void 0 : it.clientWidth) ?? 0, q = w.value.length;
      if (!W || q === 0) {
        Ne.value = q;
        return;
      }
      const Z = ((Pe = pt.value) == null ? void 0 : Pe.offsetWidth) ?? 28, J = 6;
      let je = 0, Ge = 0;
      for (let Me = 0; Me < q; Me += 1) {
        const Dt = ((qe = Je.value[Me]) == null ? void 0 : qe.offsetWidth) ?? 0, st = je + (Me > 0 ? J : 0) + Dt, o = q - (Me + 1) > 0 ? J + Z : 0;
        if (st + o <= W)
          je = st, Ge = Me + 1;
        else
          break;
      }
      Ge === 0 && q > 0 && (Ge = 1), Ne.value = Ge;
    }
    const Ke = () => {
      var n, o;
      if (!g.value || !_.value) return;
      const W = _.value.getBoundingClientRect(), q = window.innerWidth, Z = window.innerHeight, J = 6, je = Ft, Ge = (((n = H.value) == null ? void 0 : n.scrollHeight) ?? 0) || (((o = u.value) == null ? void 0 : o.scrollHeight) ?? 0) || 240;
      pe.value == null && (pe.value = Ge);
      const it = pe.value, Pe = Z - W.bottom - J - je, qe = W.top - J - je, Me = Pe < 180 && qe > Pe;
      j.value = Me;
      const st = Math.min(Ra, it, Math.max(0, Me ? qe : Pe));
      ue.value = Math.max(64, st), fe.value = Math.max(260, W.width), de.value = Math.min(
        Math.max(W.left, je),
        q - fe.value - je
      ), Me ? ie.value = Math.max(je, W.top - J - ue.value) : ie.value = Math.min(
        Z - je - ue.value,
        W.bottom + J
      );
    }, Xe = (W) => {
      var Z;
      if (!g.value) return;
      const q = W == null ? void 0 : W.target;
      if (!(q && ((Z = H.value) != null && Z.contains(q)))) {
        if (!Se()) {
          T();
          return;
        }
        Ke();
      }
    };
    function at(W) {
      const q = W instanceof HTMLElement ? W : null;
      H.value = q, m.value = q;
    }
    function bt() {
      e.disabled || (S(), Oe(Ke));
    }
    function vt() {
      e.disabled || (g.value = !0, Oe(Ke));
    }
    function Mt() {
      if (!e.disabled) {
        if (g.value) {
          T();
          return;
        }
        S(), Oe(Ke);
      }
    }
    function mt() {
      ae(), bt();
    }
    function rt() {
    }
    async function Ct() {
      await Oe(), gt();
    }
    return ve(
      () => [w.value.length, e.size, e.displayMode, i.value],
      () => {
        Ct();
      },
      { immediate: !0 }
    ), ve(Re, () => {
      Ct();
    }), ve(
      () => [g.value, k.value, Re.value.length],
      async ([W]) => {
        if (!W) {
          pe.value = null;
          return;
        }
        await Oe(), Ke();
      }
    ), ve(We, (W) => {
      _e == null || _e.disconnect(), _e = null, W && (_e = new ResizeObserver(() => {
        gt();
      }), _e.observe(W));
    }), ft(() => {
      window.addEventListener("resize", Xe), window.addEventListener("scroll", Xe, !0);
    }), nt(() => {
      _e == null || _e.disconnect(), window.removeEventListener("resize", Xe), window.removeEventListener("scroll", Xe, !0);
    }), (W, q) => (d(), f("div", {
      ref_key: "root",
      ref: s,
      class: "relative"
    }, [
      c("div", {
        ref_key: "triggerRef",
        ref: _,
        class: L([
          x.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          E[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: bt
      }, [
        x.value === "inline-compact" ? (d(), f(be, { key: 0 }, [
          c("span", {
            class: L(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", $e[t.size || "md"]])
          }, N(t.placeholder || "Select options..."), 3),
          K(w).length ? (d(), f("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: We,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (d(!0), f(be, null, Ee(K(w).slice(0, Ne.value), (Z) => (d(), f("span", {
              key: Z.value,
              class: L(["badge badge-soft-primary gap-1 max-w-[12rem]", Y[t.size || "md"]])
            }, [
              c("span", Ha, N(Z.label), 1),
              c("button", {
                type: "button",
                class: L([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  we[t.size || "md"]
                ]),
                onClick: oe((J) => K(te)(Z.value), ["stop"])
              }, [
                se(xe, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, Ea)
            ], 2))), 128)),
            yt.value > 0 ? (d(), f("span", Ba, " +" + N(yt.value), 1)) : O("", !0)
          ], 512)) : (d(), f("span", ja)),
          c("span", {
            class: L([
              K(w).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            Ot(c("input", {
              ref_key: "inputEl",
              ref: v,
              "onUpdate:modelValue": q[0] || (q[0] = (Z) => Yt(i) ? i.value = Z : null),
              class: L([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: De(ge.value),
              placeholder: "Search...",
              onKeydown: q[1] || (q[1] = //@ts-ignore
              (...Z) => K($) && K($)(...Z)),
              onFocus: vt
            }, null, 36), [
              [Vt, K(i)]
            ])
          ], 2),
          c("button", {
            type: "button",
            class: L(["icon-btn icon-btn-outline shrink-0", ke[t.size || "md"]]),
            onMousedown: oe(Mt, ["prevent", "stop"]),
            onClick: oe(rt, ["stop"])
          }, [
            se(xe, {
              name: K(g) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 34),
          K(w).length ? (d(), f("button", {
            key: 2,
            type: "button",
            class: L(["icon-btn icon-btn-outline shrink-0", ke[t.size || "md"]]),
            onMousedown: oe(mt, ["prevent", "stop"]),
            onClick: oe(rt, ["stop"])
          }, [
            se(xe, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 34)) : O("", !0)
        ], 64)) : (d(), f(be, { key: 1 }, [
          K(w).length ? (d(), f("div", Ia, [
            (d(!0), f(be, null, Ee(K(w), (Z) => (d(), f("span", {
              key: Z.value,
              class: L(["badge badge-soft-primary gap-1 max-w-full", Y[t.size || "md"]])
            }, [
              c("span", Ta, N(Z.label), 1),
              c("button", {
                type: "button",
                class: L([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  we[t.size || "md"]
                ]),
                onClick: oe((J) => K(te)(Z.value), ["stop"])
              }, [
                se(xe, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, Aa)
            ], 2))), 128))
          ])) : (d(), f("span", {
            key: 1,
            class: L(["opacity-60 w-full", $e[t.size || "md"]])
          }, N(t.placeholder || "Select options..."), 3)),
          c("div", La, [
            c("span", za, [
              Ot(c("input", {
                ref_key: "inputEl",
                ref: v,
                "onUpdate:modelValue": q[2] || (q[2] = (Z) => Yt(i) ? i.value = Z : null),
                class: L([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: De(he.value),
                placeholder: "Search...",
                onKeydown: q[3] || (q[3] = //@ts-ignore
                (...Z) => K($) && K($)(...Z)),
                onFocus: vt
              }, null, 36), [
                [Vt, K(i)]
              ])
            ]),
            c("button", {
              type: "button",
              class: L(["icon-btn icon-btn-outline shrink-0", ke[t.size || "md"]]),
              onMousedown: oe(Mt, ["prevent", "stop"]),
              onClick: oe(rt, ["stop"])
            }, [
              se(xe, {
                name: K(g) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 34),
            K(w).length ? (d(), f("button", {
              key: 0,
              type: "button",
              class: L(["icon-btn icon-btn-outline shrink-0", ke[t.size || "md"]]),
              onMousedown: oe(mt, ["prevent", "stop"]),
              onClick: oe(rt, ["stop"])
            }, [
              se(xe, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 34)) : O("", !0)
          ])
        ], 64)),
        G.value ? (d(), f("div", Fa, [
          (d(!0), f(be, null, Ee(K(w), (Z, J) => (d(), f("span", {
            key: `measure-${Z.value}`,
            ref_for: !0,
            ref: (je) => Ht(je, J),
            class: L(["badge badge-soft-primary gap-1 max-w-[12rem]", Y[t.size || "md"]])
          }, [
            c("span", Oa, N(Z.label), 1),
            c("span", {
              class: L([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                we[t.size || "md"]
              ])
            }, [
              se(xe, {
                name: "x",
                class: "w-3 h-3"
              })
            ], 2)
          ], 2))), 128)),
          c("span", {
            ref_key: "measureCounterEl",
            ref: pt,
            class: "badge badge-soft-primary",
            style: { "padding-inline": "1px" }
          }, "+99", 512)
        ])) : O("", !0)
      ], 2),
      (d(), Ze(ht, { to: "body" }, [
        se(et, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": j.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": j.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: tt(() => [
            K(g) ? (d(), f("div", {
              key: 0,
              ref: at,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: De(V.value),
              onMousedown: q[4] || (q[4] = oe(() => {
              }, ["stop"])),
              onClick: q[5] || (q[5] = oe(() => {
              }, ["stop"]))
            }, [
              K(k) ? (d(), f("div", Va, "Loading...")) : (d(), f("ul", {
                key: 1,
                ref_key: "menu",
                ref: u,
                class: "overflow-auto",
                style: De(ee.value)
              }, [
                (d(!0), f(be, null, Ee(Re.value, (Z) => (d(), f("li", {
                  key: `${ot.value}:${String(Z.value)}`,
                  class: L([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    Ve[t.size || "md"],
                    Be(Z.value) ? "bg-primary/15" : ""
                  ]),
                  onClick: oe((J) => K(te)(Z.value), ["stop", "prevent"])
                }, [
                  c("input", {
                    type: "checkbox",
                    class: L([I[t.size || "md"]]),
                    checked: Be(Z.value),
                    onClick: oe((J) => K(te)(Z.value), ["stop", "prevent"])
                  }, null, 10, Pa),
                  c("span", null, N(Z.label), 1)
                ], 10, Na))), 128)),
                !Re.value.length && !K(k) ? (d(), f("li", Ya, " No results ")) : O("", !0)
              ], 4))
            ], 36)) : O("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), tn = (t, a) => {
  const e = t.__vccOpts || t;
  for (const [h, l] of a)
    e[h] = l;
  return e;
}, Gr = /* @__PURE__ */ tn(Wa, [["__scopeId", "data-v-d4c42ded"]]), Ga = { class: "font-medium" }, Ua = { class: "text-sm opacity-60" }, Ka = {
  key: 0,
  class: "text-xs opacity-60 space-y-1"
}, qa = { key: 0 }, Za = { key: 1 }, Ja = ["multiple", "accept", "disabled"], Xa = {
  key: 0,
  class: "space-y-2"
}, Qa = { class: "flex items-center gap-2 min-w-0" }, er = { class: "text-sm truncate" }, tr = ["onClick"], nr = {
  key: 1,
  class: "grid grid-cols-2 sm:grid-cols-4 gap-3"
}, or = ["src", "alt"], ar = ["onClick"], rr = {
  key: 2,
  class: "text-xs opacity-60"
}, Ur = /* @__PURE__ */ le({
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
    const e = t, h = a, l = P(!1), s = P(e.modelValue ?? []), v = P([]), u = ($) => !e.maxFiles || e.maxFiles <= 0 ? $ : $.slice(0, e.maxFiles), m = ($) => {
      s.value = u($), h("update:modelValue", s.value), h("change", s.value);
    }, g = M(() => s.value.length > 0), i = M(
      () => s.value.map(($, _) => ({
        index: _,
        name: $.name,
        file: $,
        isImage: $.type.startsWith("image/")
      }))
    ), k = M(
      () => e.preview ? i.value.filter(($) => !$.isImage) : i.value
    ), C = M(() => !!(e.helperText || e.maxSizeText)), w = ($) => {
      var ie;
      const _ = ((ie = $.name.split(".").pop()) == null ? void 0 : ie.toLowerCase()) ?? "", H = $.type.toLowerCase();
      return H.startsWith("image/") ? "image" : H === "application/pdf" || _ === "pdf" ? "file-pdf" : _ === "xls" || _ === "xlsx" || H === "application/vnd.ms-excel" || H === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ? "file-xls" : _ === "csv" || H === "text/csv" ? "file-csv" : _ === "doc" || _ === "docx" || H === "application/msword" || H === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? "file-doc" : _ === "ppt" || _ === "pptx" || H === "application/vnd.ms-powerpoint" || H === "application/vnd.openxmlformats-officedocument.presentationml.presentation" ? "file-ppt" : _ === "txt" || H === "text/plain" ? "file-txt" : _ === "zip" || _ === "rar" || _ === "7z" || _ === "tar" || _ === "gz" || H === "application/zip" || H === "application/x-zip-compressed" || H === "application/x-rar-compressed" || H === "application/x-7z-compressed" || H === "application/gzip" || H === "application/x-tar" ? "file-archive" : "file";
    }, S = () => {
      v.value.forEach(($) => URL.revokeObjectURL($.url)), v.value = s.value.map(($, _) => ({ file: $, fileIndex: _ })).filter(($) => $.file.type.startsWith("image/")).map(({ file: $, fileIndex: _ }) => ({
        id: `${$.name}-${$.size}-${$.lastModified}-${_}`,
        name: $.name,
        url: URL.createObjectURL($),
        fileIndex: _
      }));
    }, T = ($) => {
      const _ = $.target, H = Array.from(_.files ?? []);
      H.length && (e.multiple ? m([...s.value, ...H]) : m([H[0]]), _.value = "");
    }, te = ($) => {
      var H;
      if (e.disabled) return;
      l.value = !1;
      const _ = Array.from(((H = $.dataTransfer) == null ? void 0 : H.files) ?? []);
      _.length && (e.multiple ? m([...s.value, ..._]) : m([_[0]]));
    }, ae = ($) => {
      const _ = [...s.value];
      _.splice($, 1), m(_);
    };
    return ve(
      () => e.modelValue,
      ($) => {
        s.value = u($ ?? []);
      }
    ), ve(
      s,
      () => {
        S();
      },
      { immediate: !0 }
    ), nt(() => {
      v.value.forEach(($) => URL.revokeObjectURL($.url));
    }), ($, _) => (d(), f("div", {
      class: L(["space-y-3", e.class])
    }, [
      c("div", {
        class: L(["dropzone", [{ "dropzone-active": l.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: _[0] || (_[0] = oe((H) => l.value = !0, ["prevent"])),
        onDragleave: _[1] || (_[1] = (H) => l.value = !1),
        onDrop: oe(te, ["prevent"])
      }, [
        se(xe, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        c("p", Ga, N(t.dropzoneText), 1),
        c("p", Ua, N(t.browseText), 1),
        C.value ? (d(), f("div", Ka, [
          t.helperText ? (d(), f("p", qa, N(t.helperText), 1)) : O("", !0),
          t.maxSizeText ? (d(), f("p", Za, N(t.maxSizeText), 1)) : O("", !0)
        ])) : O("", !0),
        c("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: T
        }, null, 40, Ja)
      ], 34),
      k.value.length ? (d(), f("div", Xa, [
        (d(!0), f(be, null, Ee(k.value, (H) => (d(), f("div", {
          key: `${H.name}-${H.index}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          c("span", Qa, [
            se(xe, {
              name: w(H.file),
              class: "w-4 h-4 shrink-0"
            }, null, 8, ["name"]),
            c("span", er, N(H.name), 1)
          ]),
          c("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ie) => ae(H.index)
          }, [
            se(xe, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, tr)
        ]))), 128))
      ])) : O("", !0),
      t.preview && v.value.length ? (d(), f("div", nr, [
        (d(!0), f(be, null, Ee(v.value, (H) => (d(), f("div", {
          key: H.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          c("img", {
            src: H.url,
            alt: H.name,
            class: "w-full h-full object-cover"
          }, null, 8, or),
          c("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ie) => ae(H.fileIndex)
          }, [
            se(xe, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, ar)
        ]))), 128))
      ])) : O("", !0),
      g.value ? O("", !0) : (d(), f("p", rr, N(t.emptyText), 1))
    ], 2));
  }
}), ir = {
  key: 0,
  class: "mitreka-input-addon"
}, sr = { class: "mitreka-input-inner w-full" }, lr = {
  key: 0,
  class: "mitreka-input-icon mitreka-input-icon--left"
}, dr = ["type", "inputmode", "value", "placeholder", "disabled", "readonly"], cr = {
  key: 1,
  class: "mitreka-input-icon mitreka-input-icon--right"
}, ur = ["aria-label"], fr = {
  key: 1,
  class: "mitreka-input-addon"
}, Kr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = Zt(), s = P(!1), v = (y, F) => {
      const Y = y.replace(/\D/g, "");
      return typeof F == "number" ? Y.slice(0, F) : Y;
    }, u = (y, F) => {
      const Y = v(y, F ?? 15);
      return Y ? Y.startsWith("62") ? `+${Y}` : Y.startsWith("0") ? Y : `0${Y}` : "";
    }, m = (y, F, Y = " ") => {
      var we;
      return ((we = y.match(new RegExp(`.{1,${F}}`, "g"))) == null ? void 0 : we.join(Y)) ?? y;
    }, g = (y, F) => m(v(y, F ?? 16), 4), i = (y, F) => {
      const Y = v(y, F ?? 15);
      return [
        Y.slice(0, 2),
        Y.slice(2, 5),
        Y.slice(5, 8),
        Y.slice(8, 9),
        Y.slice(9, 12),
        Y.slice(12, 15)
      ].filter(Boolean).map((ke, $e) => $e === 0 ? ke : $e === 3 ? `.${ke}` : $e === 4 ? `-${ke}` : `.${ke}`).join("");
    }, k = (y, F) => {
      const Y = v(y, F ?? 15);
      return Y ? new Intl.NumberFormat("id-ID").format(Number(Y)) : "";
    }, C = (y) => e.mask === "digits" ? v(y, e.maxDigits) : e.mask === "phone-id" ? u(y, e.maxDigits) : e.mask === "nik" ? g(y, e.maxDigits) : e.mask === "npwp" ? i(y, e.maxDigits) : e.mask === "currency-idr" ? k(y, e.maxDigits) : y, w = M(() => String(e.modelValue ?? "")), S = M(() => w.value.length > 0), T = M(() => !!e.prefixIcon), te = M(() => !!e.suffixIcon), ae = M(() => !!e.addonLeft || !!e.addonRight), $ = M(
      () => e.clearable && S.value && !e.disabled && !e.readonly
    ), _ = M(
      () => e.passwordToggle && e.type === "password" && !e.disabled
    ), H = M(() => e.mask !== "none" && e.type !== "password" || _.value && s.value ? "text" : e.type), ie = M(() => {
      if (e.mask === "phone-id" || e.mask === "nik" || e.mask === "npwp" || e.mask === "digits") return "numeric";
      if (e.mask === "currency-idr") return "decimal";
    }), de = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, fe = M(
      () => e.color === "default" ? "" : `input-${e.color}`
    ), ue = M(() => [
      "input",
      de[e.size],
      fe.value,
      T.value ? "mitreka-input-has-prefix" : "",
      te.value || $.value || _.value ? "mitreka-input-has-suffix" : ""
    ]), pe = (y) => {
      const F = y.target, Y = C(F.value);
      F.value !== Y && (F.value = Y), h("update:modelValue", Y);
    }, j = () => {
      h("update:modelValue", ""), h("clear");
    }, E = () => {
      s.value = !s.value;
    }, D = (y) => {
      y.key === "Enter" && h("enter");
    };
    return (y, F) => (d(), f("div", {
      class: L(["mitreka-input-group w-full", ae.value ? "mitreka-input-group--with-addon" : ""])
    }, [
      t.addonLeft ? (d(), f("span", ir, N(t.addonLeft), 1)) : O("", !0),
      c("div", sr, [
        T.value ? (d(), f("span", lr, [
          se(xe, {
            name: t.prefixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : O("", !0),
        c("input", Pt(K(l), {
          type: H.value,
          inputmode: ie.value,
          value: w.value,
          placeholder: t.placeholder,
          disabled: t.disabled,
          readonly: t.readonly,
          class: ue.value,
          onInput: pe,
          onFocus: F[0] || (F[0] = (Y) => h("focus", Y)),
          onBlur: F[1] || (F[1] = (Y) => h("blur", Y)),
          onKeydown: D
        }), null, 16, dr),
        te.value ? (d(), f("span", cr, [
          se(xe, {
            name: t.suffixIcon,
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ])) : O("", !0),
        $.value ? (d(), f("button", {
          key: 2,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": "Clear input",
          onClick: j
        }, [
          se(xe, {
            name: "x",
            class: "w-4 h-4 opacity-70"
          })
        ])) : O("", !0),
        _.value ? (d(), f("button", {
          key: 3,
          type: "button",
          class: "mitreka-input-action",
          "aria-label": s.value ? "Hide password" : "Show password",
          onClick: E
        }, [
          se(xe, {
            name: s.value ? "eye-off" : "eye",
            class: "w-4 h-4 opacity-70"
          }, null, 8, ["name"])
        ], 8, ur)) : O("", !0)
      ]),
      t.addonRight ? (d(), f("span", fr, N(t.addonRight), 1)) : O("", !0)
    ], 2));
  }
}), hr = { class: "tree-list" }, pr = {
  key: 0,
  class: "tree-list__empty"
}, gr = ["onClick"], vr = ["onClick"], mr = {
  key: 1,
  class: "tree-list__toggle-space"
}, wr = {
  key: 2,
  class: "tree-list__code"
}, kr = /* @__PURE__ */ le({
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
    const e = t, h = a, l = M(
      () => e.expandedIds instanceof Set ? e.expandedIds : new Set(e.expandedIds)
    ), s = M(() => {
      const C = [], w = (S, T, te, ae) => {
        S.forEach(($, _) => {
          var ie;
          const H = [...te, _ + 1];
          C.push({
            node: $,
            depth: T,
            numberLabel: H.join("."),
            ancestors: ae
          }), (ie = $.children) != null && ie.length && w($.children, T + 1, H, [...ae, $.id]);
        });
      };
      return w(e.nodes ?? [], 0, [], []), C;
    }), v = M(() => {
      const C = [], w = (S, T, te) => {
        S.forEach((ae, $) => {
          var H;
          const _ = [...te, $ + 1];
          C.push({
            node: ae,
            depth: T,
            numberLabel: _.join("."),
            ancestors: []
          }), (H = ae.children) != null && H.length && l.value.has(ae.id) && w(ae.children, T + 1, _);
        });
      };
      return w(e.nodes ?? [], 0, []), C;
    }), u = M(() => {
      const C = e.searchQuery.trim().toLowerCase();
      if (!C) return v.value;
      const w = /* @__PURE__ */ new Set();
      return s.value.forEach((S) => {
        `${k(S)} ${S.node.name}`.toLowerCase().includes(C) && (w.add(S.node.id), S.ancestors.forEach((te) => w.add(te)));
      }), s.value.filter((S) => w.has(S.node.id));
    }), m = (C) => {
      var w;
      return !!((w = C.children) != null && w.length);
    };
    function g(C) {
      h("toggle", C);
    }
    function i(C) {
      h("row-click", C);
    }
    function k(C) {
      if (e.codeMode === "none") return "";
      if (e.codeMode === "field") {
        const w = C.node[e.codeField];
        return w == null ? "" : String(w);
      }
      return `${C.numberLabel}.`;
    }
    return (C, w) => (d(), f("div", hr, [
      u.value.length ? O("", !0) : (d(), f("div", pr, N(t.emptyText), 1)),
      (d(!0), f(be, null, Ee(u.value, (S) => (d(), f("div", {
        key: S.node.id,
        class: "tree-list__row-wrap"
      }, [
        c("div", {
          class: L(["tree-list__row", { "tree-list__row--with-guides": S.depth > 0 }]),
          style: De({
            paddingLeft: `${t.baseIndent + S.depth * t.indentStep}px`,
            "--guide-width": `${S.depth * t.indentStep}px`
          }),
          onClick: (T) => i(S.node)
        }, [
          m(S.node) ? (d(), f("button", {
            key: 0,
            class: "tree-list__toggle",
            type: "button",
            onClick: oe((T) => g(S.node.id), ["stop"])
          }, [
            se(xe, {
              name: "chevron-right",
              class: L(["w-4 h-4 text-base-content/50 transition-transform duration-150", { "rotate-90": l.value.has(S.node.id) }])
            }, null, 8, ["class"])
          ], 8, vr)) : (d(), f("span", mr)),
          t.codeMode !== "none" ? (d(), f("span", wr, N(k(S)), 1)) : O("", !0),
          c("span", {
            class: L(["tree-list__name", S.depth === 0 ? "font-semibold" : ""])
          }, N(S.node.name), 3),
          me(C.$slots, "meta", {
            row: S,
            node: S.node
          }, void 0, !0),
          w[1] || (w[1] = c("span", { class: "flex-1" }, null, -1)),
          c("div", {
            class: "tree-list__actions",
            onClick: w[0] || (w[0] = oe(() => {
            }, ["stop"]))
          }, [
            me(C.$slots, "actions", {
              row: S,
              node: S.node
            }, void 0, !0)
          ])
        ], 14, gr)
      ]))), 128))
    ]));
  }
}), qr = /* @__PURE__ */ tn(kr, [["__scopeId", "data-v-3c1b8432"]]);
export {
  Nr as A,
  Gr as M,
  qr as T,
  Mr as _,
  Cr as a,
  Dr as b,
  $r as c,
  Sr as d,
  _r as e,
  Hr as f,
  qn as g,
  Er as h,
  Br as i,
  jr as j,
  Ir as k,
  Tr as l,
  Ar as m,
  Lr as n,
  zr as o,
  Fr as p,
  Or as q,
  Vr as r,
  xe as s,
  Pr as t,
  Yr as u,
  Rr as v,
  Wr as w,
  Ur as x,
  Kr as y,
  Jt as z
};
