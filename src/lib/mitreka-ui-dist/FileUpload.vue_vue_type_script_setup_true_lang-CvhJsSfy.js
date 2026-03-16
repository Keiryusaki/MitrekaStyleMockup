import { defineComponent as oe, createElementBlock as v, openBlock as h, normalizeClass as T, createCommentVNode as N, renderSlot as ce, createElementVNode as f, ref as A, watch as le, withKeys as dt, withModifiers as ke, createBlock as Ue, Teleport as ut, createVNode as se, Transition as Xe, withCtx as Qe, toDisplayString as z, provide as an, inject as on, computed as _, normalizeStyle as me, createTextVNode as zt, Fragment as pe, renderList as _e, unref as j, useSlots as rn, resolveDynamicComponent as sn, reactive as ln, withDirectives as jt, vModelText as At, onMounted as ct, onBeforeUnmount as et, mergeProps as Ot, useAttrs as dn, nextTick as ze, isRef as Bt } from "vue";
import { d as cn, c as un, f as fn, h as hn, i as pn, g as gn, r as vn, a as mn, b as wn } from "./useAgGridRowHeight-CkXm93Od.js";
import { AgGridVue as bn } from "ag-grid-vue3";
const yn = ["disabled"], kn = {
  key: 0,
  class: "animate-spin"
}, Zo = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "",
      lg: "btn-lg",
      xl: "btn-xl"
    }, d = () => {
      const { variant: i, color: c } = e;
      return c === "default" ? i === "outline" ? "btn-outline" : i === "ghost" ? "btn-ghost" : "" : i === "solid" ? `btn-${c}` : i === "outline" ? `btn-outline btn-outline-${c}` : i === "soft" ? `btn-soft-${c}` : i === "ghost" ? "btn-ghost" : "";
    }, g = (i) => {
      !e.disabled && !e.loading && p("click", i);
    };
    return (i, c) => (h(), v("button", {
      class: T(["btn", l[t.size], d()]),
      disabled: t.disabled || t.loading,
      onClick: g
    }, [
      t.loading ? (h(), v("span", kn, [...c[0] || (c[0] = [
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
      ])])) : N("", !0),
      ce(i.$slots, "default")
    ], 10, yn));
  }
}), Jo = /* @__PURE__ */ oe({
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
    }, p = () => {
      const { variant: l, color: d } = o;
      return d === "default" ? l === "outline" ? "badge-outline" : "" : l === "solid" ? `badge-${d}` : l === "outline" ? `badge-outline badge-outline-${d}` : l === "soft" ? `badge-soft-${d}` : "";
    };
    return (l, d) => (h(), v("span", {
      class: T(["badge", e[t.size], p()])
    }, [
      ce(l.$slots, "default")
    ], 2));
  }
}), xn = ["role", "aria-expanded", "tabindex"], Mn = { class: "card-title" }, Cn = { class: "card-body-inner" }, Dn = {
  key: 3,
  class: "mt-4"
}, Xo = /* @__PURE__ */ oe({
  __name: "Card",
  props: {
    padding: { default: "p-4 md:p-6" },
    collapsible: { type: Boolean, default: !1 },
    defaultOpen: { type: Boolean, default: !0 },
    modelValue: { type: Boolean, default: void 0 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const p = t, l = e, d = A(p.modelValue !== void 0 ? p.modelValue : p.defaultOpen);
    le(() => p.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function g() {
      if (!p.collapsible) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return o({ isOpen: d, toggle: g }), (i, c) => (h(), v("section", {
      class: T(["card", t.padding, { "card-collapsible": t.collapsible }])
    }, [
      i.$slots.title ? (h(), v("header", {
        key: 0,
        class: T(["card-header", "mb-3", { "card-header-collapsible": t.collapsible }]),
        role: t.collapsible ? "button" : void 0,
        "aria-expanded": t.collapsible ? d.value : void 0,
        tabindex: t.collapsible ? 0 : void 0,
        onClick: g,
        onKeydown: [
          c[0] || (c[0] = dt((k) => t.collapsible && g(), ["enter"])),
          c[1] || (c[1] = dt(ke((k) => t.collapsible && g(), ["prevent"]), ["space"]))
        ]
      }, [
        f("div", Mn, [
          ce(i.$slots, "title")
        ]),
        t.collapsible ? (h(), v("svg", {
          key: 0,
          class: T(["card-collapse-icon", { "is-open": d.value }]),
          xmlns: "http://www.w3.org/2000/svg",
          viewBox: "0 0 20 20",
          fill: "currentColor"
        }, [...c[2] || (c[2] = [
          f("path", {
            "fill-rule": "evenodd",
            d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
            "clip-rule": "evenodd"
          }, null, -1)
        ])], 2)) : N("", !0)
      ], 42, xn)) : N("", !0),
      t.collapsible ? (h(), v("div", {
        key: 1,
        class: T(["card-body-wrapper", { "is-open": d.value }])
      }, [
        f("div", Cn, [
          ce(i.$slots, "default")
        ])
      ], 2)) : ce(i.$slots, "default", { key: 2 }),
      i.$slots.footer ? (h(), v("footer", Dn, [
        ce(i.$slots, "footer")
      ])) : N("", !0)
    ], 2));
  }
}), $n = {
  key: 0,
  class: "flex items-center justify-between p-5 border-b border-base-300"
}, Sn = { class: "text-xl font-semibold" }, Qo = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = {
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
    return le(
      () => e.open,
      (g) => {
        g ? document.body.style.overflow = "hidden" : document.body.style.overflow = "";
      }
    ), (g, i) => (h(), Ue(ut, { to: "body" }, [
      se(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (h(), v("div", {
            key: 0,
            class: "fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40",
            onClick: d
          })) : N("", !0)
        ]),
        _: 1
      }),
      se(Xe, { name: "zoom" }, {
        default: Qe(() => [
          t.open ? (h(), v("div", {
            key: 0,
            class: T([
              "fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none",
              t.size === "full" ? "p-0" : "p-4"
            ])
          }, [
            f("div", {
              class: T([
                "relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col",
                t.size === "full" ? "" : "rounded-2xl",
                l[t.size]
              ])
            }, [
              t.hideHeader ? N("", !0) : (h(), v("div", $n, [
                ce(g.$slots, "header", {}, () => [
                  f("h3", Sn, z(t.title), 1)
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
                class: T([
                  "p-5 overflow-y-auto",
                  t.size === "full" ? "flex-1" : "max-h-[60vh]"
                ])
              }, [
                ce(g.$slots, "default")
              ], 2),
              t.hideFooter ? N("", !0) : (h(), v("div", {
                key: 1,
                class: T([
                  "flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50",
                  t.size === "full" ? "" : "rounded-b-2xl"
                ])
              }, [
                ce(g.$slots, "footer", {}, () => [
                  f("button", {
                    type: "button",
                    class: "btn btn-ghost",
                    onClick: i[1] || (i[1] = (c) => p("close"))
                  }, z(t.cancelText), 1),
                  f("button", {
                    type: "button",
                    class: "btn btn-primary",
                    onClick: i[2] || (i[2] = (c) => p("confirm"))
                  }, z(t.confirmText), 1)
                ])
              ], 2))
            ], 2)
          ], 2)) : N("", !0)
        ]),
        _: 3
      })
    ]));
  }
}), En = ["aria-expanded", "aria-disabled", "onKeydown"], _n = { class: "collapse-title" }, Hn = { class: "collapse-content" }, Tn = { class: "collapse-content-inner" }, jn = { class: "collapse-body" }, er = /* @__PURE__ */ oe({
  __name: "Collapse",
  props: {
    modelValue: { type: Boolean, default: void 0 },
    defaultOpen: { type: Boolean, default: !1 },
    variant: { default: "default" },
    disabled: { type: Boolean, default: !1 }
  },
  emits: ["update:modelValue", "toggle"],
  setup(t, { expose: o, emit: e }) {
    const p = t, l = e, d = A(p.modelValue !== void 0 ? p.modelValue : p.defaultOpen);
    le(() => p.modelValue, (i) => {
      i !== void 0 && (d.value = i);
    });
    function g() {
      if (p.disabled) return;
      const i = !d.value;
      d.value = i, l("update:modelValue", i), l("toggle", i);
    }
    return o({ isOpen: d, toggle: g }), (i, c) => (h(), v("div", {
      class: T([
        "collapse",
        `collapse-${t.variant}`,
        { "is-open": d.value }
      ])
    }, [
      f("div", {
        class: "collapse-header",
        role: "button",
        "aria-expanded": d.value,
        "aria-disabled": t.disabled,
        tabindex: "0",
        onClick: g,
        onKeydown: [
          dt(g, ["enter"]),
          dt(ke(g, ["prevent"]), ["space"])
        ]
      }, [
        f("div", _n, [
          ce(i.$slots, "header", {}, () => [
            ce(i.$slots, "title")
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
      f("div", Hn, [
        f("div", Tn, [
          f("div", jn, [
            ce(i.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), tr = /* @__PURE__ */ oe({
  __name: "Accordion",
  props: {
    modelValue: { default: null },
    multiple: { type: Boolean, default: !1 },
    variant: { default: "default" }
  },
  emits: ["update:modelValue"],
  setup(t, { expose: o, emit: e }) {
    const p = t, l = e, d = A(/* @__PURE__ */ new Set());
    le(() => p.modelValue, (c) => {
      c === null ? d.value = /* @__PURE__ */ new Set() : Array.isArray(c) ? d.value = new Set(c) : d.value = /* @__PURE__ */ new Set([c]);
    }, { immediate: !0 });
    function g(c) {
      const k = new Set(d.value);
      k.has(c) ? k.delete(c) : (p.multiple || k.clear(), k.add(c)), d.value = k, p.multiple ? l("update:modelValue", Array.from(k)) : l("update:modelValue", k.size > 0 ? Array.from(k)[0] : null);
    }
    function i(c) {
      return d.value.has(c);
    }
    return an("accordion", {
      toggleItem: g,
      isItemOpen: i
    }), o({ openItems: d, toggleItem: g }), (c, k) => (h(), v("div", {
      class: T(["accordion", `accordion-${t.variant}`])
    }, [
      ce(c.$slots, "default")
    ], 2));
  }
}), An = ["aria-expanded", "aria-disabled", "onKeydown"], Ln = { class: "accordion-title" }, Bn = { class: "accordion-content" }, In = { class: "accordion-content-inner" }, Fn = { class: "accordion-body" }, nr = /* @__PURE__ */ oe({
  __name: "AccordionItem",
  props: {
    id: {},
    disabled: { type: Boolean, default: !1 }
  },
  setup(t) {
    const o = t, e = on("accordion"), p = _(() => (e == null ? void 0 : e.isItemOpen(o.id)) ?? !1);
    function l() {
      o.disabled || e == null || e.toggleItem(o.id);
    }
    return (d, g) => (h(), v("div", {
      class: T(["accordion-item", { "is-open": p.value }])
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
          dt(ke(l, ["prevent"]), ["space"])
        ]
      }, [
        f("div", Ln, [
          ce(d.$slots, "header", {}, () => [
            ce(d.$slots, "title")
          ])
        ]),
        g[0] || (g[0] = f("svg", {
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
      f("div", Bn, [
        f("div", In, [
          f("div", Fn, [
            ce(d.$slots, "default")
          ])
        ])
      ])
    ], 2));
  }
}), zn = { class: "loading-logo-wrapper" }, On = { class: "dots-container" }, Nn = ["width", "height"], Pn = {
  key: 0,
  class: "loading-text"
}, Vn = /* @__PURE__ */ oe({
  __name: "LoadingLogo",
  props: {
    size: { default: 80 },
    text: { default: "" }
  },
  setup(t) {
    const o = t, e = _(() => Math.round(o.size * (8 / 60)));
    return (p, l) => (h(), v("div", zn, [
      f("div", {
        class: "loading-logo-container",
        style: me({ width: `${t.size}px`, height: `${t.size * 0.67}px` })
      }, [
        f("div", On, [
          f("span", {
            class: "loading-dot dot-1 dot-blue",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-2 dot-blue",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-3 dot-black",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-4 dot-black",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-5 dot-red",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4),
          f("span", {
            class: "loading-dot dot-6 dot-red",
            style: me({ width: `${e.value}px`, height: `${e.value}px` })
          }, null, 4)
        ]),
        (h(), v("svg", {
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
        ])], 8, Nn))
      ], 4),
      t.text ? (h(), v("p", Pn, [
        zt(z(t.text), 1),
        l[1] || (l[1] = f("span", { class: "loading-dots" }, [
          f("span", null, "."),
          f("span", null, "."),
          f("span", null, ".")
        ], -1))
      ])) : N("", !0)
    ]));
  }
}), Yn = {
  key: 0,
  class: "loading-overlay",
  role: "status",
  "aria-live": "polite"
}, ar = /* @__PURE__ */ oe({
  __name: "LoadingOverlay",
  props: {
    open: { type: Boolean, default: !1 },
    size: { default: 150 },
    text: { default: "Memuat" }
  },
  setup(t) {
    return (o, e) => (h(), Ue(ut, { to: "body" }, [
      se(Xe, { name: "fade" }, {
        default: Qe(() => [
          t.open ? (h(), v("div", Yn, [
            se(Vn, {
              size: t.size,
              text: t.text
            }, null, 8, ["size", "text"])
          ])) : N("", !0)
        ]),
        _: 1
      })
    ]));
  }
}), Rn = { class: "toast-content" }, Wn = {
  class: "toast-icon",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, Un = ["d"], Gn = { class: "toast-body" }, Kn = {
  key: 0,
  class: "toast-title"
}, qn = { class: "toast-message" }, Zn = ["onClick"], or = /* @__PURE__ */ oe({
  __name: "Toasts",
  setup(t) {
    const o = cn(), e = _(() => {
      const c = {
        "top-left": "toast-pos-top-left",
        "top-center": "toast-pos-top-center",
        "top-right": "toast-pos-top-right",
        "bottom-left": "toast-pos-bottom-left",
        "bottom-center": "toast-pos-bottom-center",
        "bottom-right": "toast-pos-bottom-right"
      };
      return c[o.toastPosition.value] || c["bottom-right"];
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
    }, g = {
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
        outline: g
      }[k]) == null ? void 0 : w[c]) || l[c] || "toast-default";
    };
    return (c, k) => (h(), Ue(ut, { to: "body" }, [
      f("div", {
        class: T(["toast-container", e.value])
      }, [
        (h(!0), v(pe, null, _e(j(o).toasts.value, (s) => (h(), v("div", {
          key: s.id,
          class: T(["toast-item", i(s.type, s.variant)])
        }, [
          f("div", Rn, [
            (h(), v("svg", Wn, [
              f("path", {
                d: p[s.type],
                fill: "currentColor"
              }, null, 8, Un)
            ])),
            f("div", Gn, [
              s.title ? (h(), v("div", Kn, z(s.title), 1)) : N("", !0),
              f("div", qn, z(s.message), 1)
            ]),
            f("button", {
              class: "toast-close-btn",
              onClick: (w) => j(o).dismiss(s.id)
            }, [...k[0] || (k[0] = [
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
            ])], 8, Zn)
          ])
        ], 2))), 128))
      ], 2)
    ]));
  }
}), rr = /* @__PURE__ */ oe({
  __name: "Tooltip",
  props: {
    text: {},
    position: { default: "top" },
    variant: { default: "auto" },
    delay: { default: 200 }
  },
  setup(t) {
    const o = t, e = A(!1);
    let p = null;
    const l = () => {
      p = setTimeout(() => {
        e.value = !0;
      }, o.delay);
    }, d = () => {
      p && (clearTimeout(p), p = null), e.value = !1;
    }, g = _(() => `tooltip-pos-${o.position}`), i = _(() => `tooltip-arrow-${o.position}`), c = _(() => `tooltip-variant-${o.variant}`);
    return (k, s) => (h(), v("span", {
      class: "tooltip-root",
      onMouseenter: l,
      onMouseleave: d,
      onFocus: l,
      onBlur: d
    }, [
      ce(k.$slots, "default"),
      se(Xe, { name: "tooltip-fade" }, {
        default: Qe(() => [
          e.value && t.text ? (h(), v("span", {
            key: 0,
            class: T(["tooltip-content", [g.value, c.value]]),
            role: "tooltip"
          }, [
            zt(z(t.text) + " ", 1),
            f("span", {
              class: T(["tooltip-arrow", [i.value, c.value]])
            }, null, 2)
          ], 2)) : N("", !0)
        ]),
        _: 1
      })
    ], 32));
  }
}), Jn = { class: "mitreka-pagination" }, Xn = ["disabled"], Qn = { class: "pagination-status" }, ea = ["disabled"], ir = /* @__PURE__ */ oe({
  __name: "Pagination",
  props: {
    page: {},
    pages: {}
  },
  emits: ["change"],
  setup(t, { emit: o }) {
    const e = t, p = o, l = () => {
      e.page > 1 && p("change", e.page - 1);
    }, d = () => {
      e.page < e.pages && p("change", e.page + 1);
    };
    return (g, i) => (h(), v("div", Jn, [
      f("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page <= 1,
        onClick: l
      }, [...i[0] || (i[0] = [
        f("span", { class: "hidden sm:inline" }, "Prev", -1),
        f("span", { class: "sm:hidden" }, "<", -1)
      ])], 8, Xn),
      f("span", Qn, z(t.page) + " / " + z(t.pages), 1),
      f("button", {
        class: "btn btn-ghost btn-sm",
        disabled: t.page >= t.pages,
        onClick: d
      }, [...i[1] || (i[1] = [
        f("span", { class: "hidden sm:inline" }, "Next", -1),
        f("span", { class: "sm:hidden" }, ">", -1)
      ])], 8, ea)
    ]));
  }
}), ta = { class: "avatar-root" }, na = ["src", "alt"], sr = /* @__PURE__ */ oe({
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
    const o = t, e = A(!1), p = _(() => o.src && !e.value), l = _(() => o.fallback ? o.fallback.slice(0, 2).toUpperCase() : o.alt && o.alt !== "Avatar" ? o.alt.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() : "?"), d = _(() => `avatar-size-${o.size}`), g = _(() => `avatar-color-${o.color}`), i = _(() => o.status ? `avatar-status-${o.status}` : ""), c = _(() => `avatar-status-size-${o.size}`), k = _(() => o.square ? "avatar-square" : "avatar-round"), s = () => {
      e.value = !0;
    };
    return (w, M) => (h(), v("span", ta, [
      p.value ? (h(), v("img", {
        key: 0,
        src: t.src,
        alt: t.alt,
        class: T(["avatar-img", [d.value, k.value]]),
        onError: s
      }, null, 42, na)) : (h(), v("span", {
        key: 1,
        class: T(["avatar-fallback", [d.value, g.value, k.value]])
      }, z(l.value), 3)),
      t.status ? (h(), v("span", {
        key: 2,
        class: T(["avatar-status", [i.value, c.value]])
      }, null, 2)) : N("", !0)
    ]));
  }
}), lr = /* @__PURE__ */ oe({
  __name: "AvatarGroup",
  props: {
    max: { default: 4 },
    size: { default: "md" }
  },
  setup(t) {
    const o = t, e = rn(), p = _(() => {
      var c;
      const i = (c = e.default) == null ? void 0 : c.call(e);
      return i ? i.length : 0;
    }), l = _(() => p.value <= o.max ? 0 : p.value - o.max), d = _(() => `avatar-size-${o.size}`), g = _(() => `avatar-group-space-${o.size}`);
    return (i, c) => (h(), v("div", {
      class: T(["avatar-group", g.value])
    }, [
      (h(!0), v(pe, null, _e(t.max, (k, s) => {
        var w, M;
        return h(), v(pe, { key: s }, [
          s < p.value ? (h(), Ue(sn((M = (w = j(e)).default) == null ? void 0 : M.call(w)[s]), { key: 0 })) : N("", !0)
        ], 64);
      }), 128)),
      l.value > 0 ? (h(), v("span", {
        key: 0,
        class: T(["avatar-group-count", d.value])
      }, " +" + z(l.value), 3)) : N("", !0)
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
}, dr = /* @__PURE__ */ oe({
  __name: "Breadcrumbs",
  props: {
    items: {},
    showHome: { type: Boolean, default: !0 },
    homeLabel: { default: "Home" },
    homeHref: { default: "/" }
  },
  setup(t) {
    const o = t, e = (p) => p === o.items.length - 1;
    return (p, l) => t.items.length ? (h(), v("nav", aa, [
      f("ol", oa, [
        t.showHome ? (h(), v("li", ra, [
          f("a", {
            href: t.homeHref,
            class: "breadcrumbs-link"
          }, z(t.homeLabel), 9, ia)
        ])) : N("", !0),
        (h(!0), v(pe, null, _e(t.items, (d, g) => (h(), v("li", {
          key: g,
          class: "breadcrumbs-item"
        }, [
          l[0] || (l[0] = f("span", { class: "breadcrumbs-sep" }, "/", -1)),
          e(g) ? (h(), v("span", ca, z(d.label), 1)) : (h(), v("span", sa, [
            d.href ? (h(), v("a", {
              key: 0,
              href: d.href,
              class: "breadcrumbs-link"
            }, z(d.label), 9, la)) : (h(), v("span", da, z(d.label), 1))
          ]))
        ]))), 128))
      ])
    ])) : N("", !0);
  }
}), ua = { class: "mitreka-stat-card" }, fa = {
  key: 0,
  class: "stat-icon"
}, ha = { class: "stat-content" }, pa = { class: "stat-label" }, ga = { class: "stat-value" }, cr = /* @__PURE__ */ oe({
  __name: "StatCard",
  props: {
    icon: {},
    label: {},
    value: {}
  },
  setup(t) {
    return (o, e) => (h(), v("div", ua, [
      t.icon ? (h(), v("div", fa, z(t.icon), 1)) : N("", !0),
      f("div", ha, [
        f("div", pa, z(t.label), 1),
        f("div", ga, z(t.value), 1)
      ])
    ]));
  }
}), va = { class: "mitreka-page-header" }, ma = { class: "page-header-title-row" }, wa = { class: "page-header-title" }, ba = {
  key: 0,
  class: "page-header-desc"
}, ur = /* @__PURE__ */ oe({
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
    }, p = _(() => {
      if (!o.category) return "";
      const l = o.category.toLowerCase();
      return e[l] || "badge-soft-primary";
    });
    return (l, d) => (h(), v("header", va, [
      f("div", ma, [
        f("h1", wa, z(t.title), 1),
        t.category ? (h(), v("span", {
          key: 0,
          class: T(["badge page-header-badge", p.value])
        }, z(t.category), 3)) : N("", !0)
      ]),
      t.description ? (h(), v("p", ba, z(t.description), 1)) : N("", !0)
    ]));
  }
}), ya = { class: "mitreka-theme-switcher" }, ka = ["value"], fr = /* @__PURE__ */ oe({
  __name: "ThemeSwitcher",
  setup(t) {
    const { mode: o, setTheme: e, toggleTheme: p } = un("light"), l = _(
      () => o.value === "dark" ? "mitrekadark" : "mitrekalight"
    ), d = (g) => {
      e(g === "mitrekadark" ? "dark" : "light");
    };
    return (g, i) => (h(), v("div", ya, [
      f("button", {
        class: "btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200",
        onClick: i[0] || (i[0] = //@ts-ignore
        (...c) => j(p) && j(p)(...c))
      }, " Toggle: " + z(l.value), 1),
      f("select", {
        class: "select rounded-selector border border-base-300 bg-base-100 text-base-content",
        value: l.value,
        onChange: i[1] || (i[1] = (c) => d(c.target.value))
      }, [...i[2] || (i[2] = [
        f("option", { value: "mitrekalight" }, "mitrekalight", -1),
        f("option", { value: "mitrekadark" }, "mitrekadark", -1)
      ])], 40, ka)
    ]));
  }
}), xa = { class: "sidebar-header" }, Ma = {
  key: 0,
  class: "sidebar-search"
}, Ca = ["placeholder"], Da = { class: "sidebar-nav" }, $a = ["href", "title", "onClick"], Sa = { class: "sidebar-icon" }, Ea = { class: "sidebar-icon-text" }, _a = {
  key: 0,
  class: "sidebar-label"
}, Ha = ["title", "onClick"], Ta = { class: "sidebar-icon" }, ja = { class: "sidebar-icon-text" }, Aa = {
  key: 0,
  class: "sidebar-label"
}, La = ["href", "title", "onClick"], Ba = { class: "sidebar-icon" }, Ia = { class: "sidebar-icon-text" }, Fa = {
  key: 0,
  class: "sidebar-label"
}, hr = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = A(""), d = ln({});
    e.defaultOpenIds.forEach((w) => {
      d[w] = !0;
    });
    const g = (w) => !e.activeHref || !w.href ? !1 : w.exact ? e.activeHref === w.href : e.activeHref.startsWith(w.href), i = (w) => {
      var B;
      if (!w.children) return !1;
      if (l.value.trim()) return !0;
      const M = d[w.id], C = ((B = w.children) == null ? void 0 : B.some(g)) ?? !1;
      return M === void 0 && C && (d[w.id] = !0), d[w.id] ?? C;
    }, c = (w) => {
      const M = !i(w);
      d[w.id] = M, p("toggle", w.id, M);
    }, k = _(() => {
      const w = l.value.toLowerCase().trim();
      return w ? e.items.map((M) => {
        if (M.children) {
          const C = M.children.filter(
            (B) => B.label.toLowerCase().includes(w)
          );
          return M.label.toLowerCase().includes(w) ? M : C.length > 0 ? { ...M, children: C } : null;
        }
        return M.label.toLowerCase().includes(w) ? M : null;
      }).filter(Boolean) : e.items;
    }), s = (w) => {
      p("navigate", w), l.value = "";
    };
    return (w, M) => (h(), v("aside", {
      class: T(["mitreka-sidebar", t.collapsed ? "is-collapsed" : ""])
    }, [
      f("div", xa, [
        ce(w.$slots, "header")
      ]),
      t.showSearch && !t.collapsed ? (h(), v("div", Ma, [
        jt(f("input", {
          class: "sidebar-search-input",
          type: "text",
          placeholder: t.placeholder,
          "onUpdate:modelValue": M[0] || (M[0] = (C) => l.value = C)
        }, null, 8, Ca), [
          [At, l.value]
        ]),
        l.value ? (h(), v("button", {
          key: 0,
          class: "sidebar-search-clear",
          onClick: M[1] || (M[1] = (C) => l.value = "")
        }, " × ")) : N("", !0)
      ])) : N("", !0),
      f("nav", Da, [
        (h(!0), v(pe, null, _e(k.value, (C) => (h(), v(pe, {
          key: C.id
        }, [
          C.children ? (h(), v(pe, { key: 1 }, [
            f("button", {
              class: T(["sidebar-item sidebar-group", i(C) ? "is-open" : ""]),
              title: t.collapsed ? C.label : void 0,
              onClick: (B) => c(C)
            }, [
              f("span", Ta, [
                ce(w.$slots, "icon", { item: C }, () => [
                  f("span", ja, z(C.icon || "•"), 1)
                ])
              ]),
              t.collapsed ? N("", !0) : (h(), v("span", Aa, z(C.label), 1)),
              t.collapsed ? N("", !0) : (h(), v("span", {
                key: 1,
                class: T(["sidebar-caret", i(C) ? "rotate" : ""])
              }, "›", 2))
            ], 10, Ha),
            i(C) ? (h(), v("div", {
              key: 0,
              class: T(["sidebar-children", t.collapsed ? "is-collapsed" : ""])
            }, [
              (h(!0), v(pe, null, _e(C.children, (B) => (h(), v("a", {
                key: B.id,
                class: T(["sidebar-item sidebar-child", g(B) ? "is-active" : ""]),
                href: B.href || "#",
                title: t.collapsed ? B.label : void 0,
                onClick: ke((y) => s(B), ["prevent"])
              }, [
                f("span", Ba, [
                  ce(w.$slots, "icon", { item: B }, () => [
                    f("span", Ia, z(B.icon || "•"), 1)
                  ])
                ]),
                t.collapsed ? N("", !0) : (h(), v("span", Fa, z(B.label), 1))
              ], 10, La))), 128))
            ], 2)) : N("", !0)
          ], 64)) : (h(), v("a", {
            key: 0,
            class: T(["sidebar-item", g(C) ? "is-active" : ""]),
            href: C.href || "#",
            title: t.collapsed ? C.label : void 0,
            onClick: ke((B) => s(C), ["prevent"])
          }, [
            f("span", Sa, [
              ce(w.$slots, "icon", { item: C }, () => [
                f("span", Ea, z(C.icon || "•"), 1)
              ])
            ]),
            t.collapsed ? N("", !0) : (h(), v("span", _a, z(C.label), 1))
          ], 10, $a))
        ], 64))), 128))
      ])
    ], 2));
  }
}), Nt = {
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
}, pr = (t) => Nt[t], za = ["innerHTML"], Oa = {
  key: 1,
  class: "mitreka-icon-fallback"
}, xe = /* @__PURE__ */ oe({
  __name: "Icon",
  props: {
    name: {},
    class: { default: "w-5 h-5" }
  },
  setup(t) {
    const o = t, e = _(() => o.class || "w-5 h-5"), p = _(() => Nt[o.name]), l = _(
      () => p.value ? p.value.replace("<svg", `<svg class='${e.value}'`) : ""
    );
    return (d, g) => p.value ? (h(), v("span", {
      key: 0,
      innerHTML: l.value,
      class: "inline-flex"
    }, null, 8, za)) : (h(), v("span", Oa, "?"));
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
function It(t, o) {
  var e;
  return function() {
    var p = this, l = arguments;
    clearTimeout(e), e = setTimeout(function() {
      return t.apply(p, l);
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
function ee(t, o, e) {
  var p = window.document.createElement(t);
  return o = o || "", e = e || "", p.className = o, e !== void 0 && (p.textContent = e), p;
}
function yt(t) {
  for (; t.firstChild; )
    t.removeChild(t.firstChild);
}
function Pt(t, o) {
  if (o(t))
    return t;
  if (t.parentNode)
    return Pt(t.parentNode, o);
}
function kt(t, o) {
  var e = ee("div", "numInputWrapper"), p = ee("input", "numInput " + t), l = ee("span", "arrowUp"), d = ee("span", "arrowDown");
  if (navigator.userAgent.indexOf("MSIE 9.0") === -1 ? p.type = "number" : (p.type = "text", p.pattern = "\\d*"), o !== void 0)
    for (var g in o)
      p.setAttribute(g, o[g]);
  return e.appendChild(p), e.appendChild(l), e.appendChild(d), e;
}
function Le(t) {
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
}, Na = {
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
    var p = parseInt(o), l = new Date(t.getFullYear(), 0, 2 + (p - 1) * 7, 0, 0, 0, 0);
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
}, Vt = function(t) {
  var o = t.config, e = o === void 0 ? st : o, p = t.l10n, l = p === void 0 ? pt : p, d = t.isMobile, g = d === void 0 ? !1 : d;
  return function(i, c, k) {
    var s = k || l;
    return e.formatDate !== void 0 && !g ? e.formatDate(i, c, s) : c.split("").map(function(w, M, C) {
      return ht[w] && C[M - 1] !== "\\" ? ht[w](i, s, e) : w !== "\\" ? w : "";
    }).join("");
  };
}, Lt = function(t) {
  var o = t.config, e = o === void 0 ? st : o, p = t.l10n, l = p === void 0 ? pt : p;
  return function(d, g, i, c) {
    if (!(d !== 0 && !d)) {
      var k = c || l, s, w = d;
      if (d instanceof Date)
        s = new Date(d.getTime());
      else if (typeof d != "string" && d.toFixed !== void 0)
        s = new Date(d);
      else if (typeof d == "string") {
        var M = g || (e || st).dateFormat, C = String(d).trim();
        if (C === "today")
          s = /* @__PURE__ */ new Date(), i = !0;
        else if (e && e.parseDate)
          s = e.parseDate(d, M);
        else if (/Z$/.test(C) || /GMT$/.test(C))
          s = new Date(d);
        else {
          for (var B = void 0, y = [], P = 0, q = 0, te = ""; P < M.length; P++) {
            var ne = M[P], W = ne === "\\", Z = M[P - 1] === "\\" || W;
            if (Je[ne] && !Z) {
              te += Je[ne];
              var V = new RegExp(te).exec(d);
              V && (B = !0) && y[ne !== "Y" ? "push" : "unshift"]({
                fn: Na[ne],
                val: V[++q]
              });
            } else W || (te += ".");
          }
          s = !e || !e.noCalendar ? new Date((/* @__PURE__ */ new Date()).getFullYear(), 0, 1, 0, 0, 0, 0) : new Date((/* @__PURE__ */ new Date()).setHours(0, 0, 0, 0)), y.forEach(function(J) {
            var re = J.fn, we = J.val;
            return s = re(s, we, k) || s;
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
function Be(t, o, e) {
  return e === void 0 && (e = !0), e !== !1 ? new Date(t.getTime()).setHours(0, 0, 0, 0) - new Date(o.getTime()).setHours(0, 0, 0, 0) : t.getTime() - o.getTime();
}
var Pa = function(t, o, e) {
  return t > Math.min(o, e) && t < Math.max(o, e);
}, Ht = function(t, o, e) {
  return t * 3600 + o * 60 + e;
}, Va = function(t) {
  var o = Math.floor(t / 3600), e = (t - o * 3600) / 60;
  return [o, e, t - o * 3600 - e * 60];
}, Ya = {
  DAY: 864e5
};
function Tt(t) {
  var o = t.defaultHour, e = t.defaultMinute, p = t.defaultSeconds;
  if (t.minDate !== void 0) {
    var l = t.minDate.getHours(), d = t.minDate.getMinutes(), g = t.minDate.getSeconds();
    o < l && (o = l), o === l && e < d && (e = d), o === l && e === d && p < g && (p = t.minDate.getSeconds());
  }
  if (t.maxDate !== void 0) {
    var i = t.maxDate.getHours(), c = t.maxDate.getMinutes();
    o = Math.min(o, i), o === i && (e = Math.min(c, e)), o === i && e === c && (p = t.maxDate.getSeconds());
  }
  return { hours: o, minutes: e, seconds: p };
}
typeof Object.assign != "function" && (Object.assign = function(t) {
  for (var o = [], e = 1; e < arguments.length; e++)
    o[e - 1] = arguments[e];
  if (!t)
    throw TypeError("Cannot convert undefined or null to object");
  for (var p = function(i) {
    i && Object.keys(i).forEach(function(c) {
      return t[c] = i[c];
    });
  }, l = 0, d = o; l < d.length; l++) {
    var g = d[l];
    p(g);
  }
  return t;
});
var Ce = function() {
  return Ce = Object.assign || function(t) {
    for (var o, e = 1, p = arguments.length; e < p; e++) {
      o = arguments[e];
      for (var l in o) Object.prototype.hasOwnProperty.call(o, l) && (t[l] = o[l]);
    }
    return t;
  }, Ce.apply(this, arguments);
}, Ft = function() {
  for (var t = 0, o = 0, e = arguments.length; o < e; o++) t += arguments[o].length;
  for (var p = Array(t), l = 0, o = 0; o < e; o++)
    for (var d = arguments[o], g = 0, i = d.length; g < i; g++, l++)
      p[l] = d[g];
  return p;
}, Ra = 300;
function Wa(t, o) {
  var e = {
    config: Ce(Ce({}, st), fe.defaultConfig),
    l10n: pt
  };
  e.parseDate = Lt({ config: e.config, l10n: e.l10n }), e._handlers = [], e.pluginElements = [], e.loadedPlugins = [], e._bind = y, e._setHoursFromDate = M, e._positionCalendar = qe, e.changeMonth = H, e.changeYear = Me, e.clear = I, e.close = ie, e.onMouseOver = Te, e._createElement = ee, e.createDay = V, e.destroy = He, e.isEnabled = ye, e.jumpToDate = te, e.updateValue = We, e.open = gt, e.redraw = F, e.set = nt, e.setDate = Ze, e.toggle = Rt;
  function p() {
    e.utils = {
      getDaysInMonth: function(n, a) {
        return n === void 0 && (n = e.currentMonth), a === void 0 && (a = e.currentYear), n === 1 && (a % 4 === 0 && a % 100 !== 0 || a % 400 === 0) ? 29 : e.l10n.daysInMonth[n];
      }
    };
  }
  function l() {
    e.element = e.input = t, e.isOpen = !1, mt(), Ke(), at(), wt(), p(), e.isMobile || Z(), q(), (e.selectedDates.length || e.config.noCalendar) && (e.config.enableTime && M(e.config.noCalendar ? e.latestSelectedDateObj : void 0), We(!1)), i();
    var n = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    !e.isMobile && n && qe(), de("onReady");
  }
  function d() {
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
  function c(n) {
    if (e.selectedDates.length === 0) {
      var a = e.config.minDate === void 0 || Be(/* @__PURE__ */ new Date(), e.config.minDate) >= 0 ? /* @__PURE__ */ new Date() : new Date(e.config.minDate.getTime()), r = Tt(e.config);
      a.setHours(r.hours, r.minutes, r.seconds, a.getMilliseconds()), e.selectedDates = [a], e.latestSelectedDateObj = a;
    }
    n !== void 0 && n.type !== "blur" && Gt(n);
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
      var u = e.config.minTime !== void 0 || e.config.minDate && e.minDateHasTime && e.latestSelectedDateObj && Be(e.latestSelectedDateObj, e.config.minDate, !0) === 0, b = e.config.maxTime !== void 0 || e.config.maxDate && e.maxDateHasTime && e.latestSelectedDateObj && Be(e.latestSelectedDateObj, e.config.maxDate, !0) === 0;
      if (e.config.maxTime !== void 0 && e.config.minTime !== void 0 && e.config.minTime > e.config.maxTime) {
        var x = Ht(e.config.minTime.getHours(), e.config.minTime.getMinutes(), e.config.minTime.getSeconds()), R = Ht(e.config.maxTime.getHours(), e.config.maxTime.getMinutes(), e.config.maxTime.getSeconds()), E = Ht(n, a, r);
        if (E > R && E < x) {
          var K = Va(x);
          n = K[0], a = K[1], r = K[2];
        }
      } else {
        if (b) {
          var $ = e.config.maxTime !== void 0 ? e.config.maxTime : e.config.maxDate;
          n = Math.min(n, $.getHours()), n === $.getHours() && (a = Math.min(a, $.getMinutes())), a === $.getMinutes() && (r = Math.min(r, $.getSeconds()));
        }
        if (u) {
          var L = e.config.minTime !== void 0 ? e.config.minTime : e.config.minDate;
          n = Math.max(n, L.getHours()), n === L.getHours() && a < L.getMinutes() && (a = L.getMinutes()), a === L.getMinutes() && (r = Math.max(r, L.getSeconds()));
        }
      }
      C(n, a, r);
    }
  }
  function M(n) {
    var a = n || e.latestSelectedDateObj;
    a && a instanceof Date && C(a.getHours(), a.getMinutes(), a.getSeconds());
  }
  function C(n, a, r) {
    e.latestSelectedDateObj !== void 0 && e.latestSelectedDateObj.setHours(n % 24, a, r || 0, 0), !(!e.hourElement || !e.minuteElement || e.isMobile) && (e.hourElement.value = Ee(e.config.time_24hr ? n : (12 + n) % 12 + 12 * Fe(n % 12 === 0)), e.minuteElement.value = Ee(a), e.amPM !== void 0 && (e.amPM.textContent = e.l10n.amPM[Fe(n >= 12)]), e.secondElement !== void 0 && (e.secondElement.value = Ee(r)));
  }
  function B(n) {
    var a = Le(n), r = parseInt(a.value) + (n.delta || 0);
    (r / 1e3 > 1 || n.key === "Enter" && !/[^\d]/.test(r.toString())) && Me(r);
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
  function P() {
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
    var n = It(Ne, 50);
    if (e._debouncedChange = It(P, Ra), e.daysContainer && !/iPhone|iPad|iPod/i.test(navigator.userAgent) && y(e.daysContainer, "mouseover", function(r) {
      e.config.mode === "range" && Te(Le(r));
    }), y(e._input, "keydown", Ge), e.calendarContainer !== void 0 && y(e.calendarContainer, "keydown", Ge), !e.config.inline && !e.config.static && y(window, "resize", n), window.ontouchstart !== void 0 ? y(window.document, "touchstart", Ie) : y(window.document, "mousedown", Ie), y(window.document, "focus", Ie, { capture: !0 }), e.config.clickOpens === !0 && (y(e._input, "focus", e.open), y(e._input, "click", e.open)), e.daysContainer !== void 0 && (y(e.monthNav, "click", Ut), y(e.monthNav, ["keyup", "increment"], B), y(e.daysContainer, "click", Se)), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0) {
      var a = function(r) {
        return Le(r).select();
      };
      y(e.timeContainer, ["increment"], c), y(e.timeContainer, "blur", c, { capture: !0 }), y(e.timeContainer, "click", ne), y([e.hourElement, e.minuteElement], ["focus", "click"], a), e.secondElement !== void 0 && y(e.secondElement, "focus", function() {
        return e.secondElement && e.secondElement.select();
      }), e.amPM !== void 0 && y(e.amPM, "click", function(r) {
        c(r);
      });
    }
    e.config.allowInput && y(e._input, "blur", tt);
  }
  function te(n, a) {
    var r = n !== void 0 ? e.parseDate(n) : e.latestSelectedDateObj || (e.config.minDate && e.config.minDate > e.now ? e.config.minDate : e.config.maxDate && e.config.maxDate < e.now ? e.config.maxDate : e.now), u = e.currentYear, b = e.currentMonth;
    try {
      r !== void 0 && (e.currentYear = r.getFullYear(), e.currentMonth = r.getMonth());
    } catch (x) {
      x.message = "Invalid date supplied: " + r, e.config.errorHandler(x);
    }
    a && e.currentYear !== u && (de("onYearChange"), X()), a && (e.currentYear !== u || e.currentMonth !== b) && de("onMonthChange"), e.redraw();
  }
  function ne(n) {
    var a = Le(n);
    ~a.className.indexOf("arrow") && W(n, a.classList.contains("arrowUp") ? 1 : -1);
  }
  function W(n, a, r) {
    var u = n && Le(n), b = r || u && u.parentNode && u.parentNode.firstChild, x = Mt("increment");
    x.delta = a, b && b.dispatchEvent(x);
  }
  function Z() {
    var n = window.document.createDocumentFragment();
    if (e.calendarContainer = ee("div", "flatpickr-calendar"), e.calendarContainer.tabIndex = -1, !e.config.noCalendar) {
      if (n.appendChild(ue()), e.innerContainer = ee("div", "flatpickr-innerContainer"), e.config.weekNumbers) {
        var a = D(), r = a.weekWrapper, u = a.weekNumbers;
        e.innerContainer.appendChild(r), e.weekNumbers = u, e.weekWrapper = r;
      }
      e.rContainer = ee("div", "flatpickr-rContainer"), e.rContainer.appendChild(O()), e.daysContainer || (e.daysContainer = ee("div", "flatpickr-days"), e.daysContainer.tabIndex = -1), G(), e.rContainer.appendChild(e.daysContainer), e.innerContainer.appendChild(e.rContainer), n.appendChild(e.innerContainer);
    }
    e.config.enableTime && n.appendChild(he()), $e(e.calendarContainer, "rangeMode", e.config.mode === "range"), $e(e.calendarContainer, "animate", e.config.animate === !0), $e(e.calendarContainer, "multiMonth", e.config.showMonths > 1), e.calendarContainer.appendChild(n);
    var b = e.config.appendTo !== void 0 && e.config.appendTo.nodeType !== void 0;
    if ((e.config.inline || e.config.static) && (e.calendarContainer.classList.add(e.config.inline ? "inline" : "static"), e.config.inline && (!b && e.element.parentNode ? e.element.parentNode.insertBefore(e.calendarContainer, e._input.nextSibling) : e.config.appendTo !== void 0 && e.config.appendTo.appendChild(e.calendarContainer)), e.config.static)) {
      var x = ee("div", "flatpickr-wrapper");
      e.element.parentNode && e.element.parentNode.insertBefore(x, e.element), x.appendChild(e.element), e.altInput && x.appendChild(e.altInput), x.appendChild(e.calendarContainer);
    }
    !e.config.static && !e.config.inline && (e.config.appendTo !== void 0 ? e.config.appendTo : window.document.body).appendChild(e.calendarContainer);
  }
  function V(n, a, r, u) {
    var b = ye(a, !0), x = ee("span", n, a.getDate().toString());
    return x.dateObj = a, x.$i = u, x.setAttribute("aria-label", e.formatDate(a, e.config.ariaDateFormat)), n.indexOf("hidden") === -1 && Be(a, e.now) === 0 && (e.todayDateElem = x, x.classList.add("today"), x.setAttribute("aria-current", "date")), b ? (x.tabIndex = -1, Ct(a) && (x.classList.add("selected"), e.selectedDateElem = x, e.config.mode === "range" && ($e(x, "startRange", e.selectedDates[0] && Be(a, e.selectedDates[0], !0) === 0), $e(x, "endRange", e.selectedDates[1] && Be(a, e.selectedDates[1], !0) === 0), n === "nextMonthDay" && x.classList.add("inRange")))) : x.classList.add("flatpickr-disabled"), e.config.mode === "range" && Wt(a) && !Ct(a) && x.classList.add("inRange"), e.weekNumbers && e.config.showMonths === 1 && n !== "prevMonthDay" && u % 7 === 6 && e.weekNumbers.insertAdjacentHTML("beforeend", "<span class='flatpickr-day'>" + e.config.getWeek(a) + "</span>"), de("onDayCreate", x), x;
  }
  function J(n) {
    n.focus(), e.config.mode === "range" && Te(n);
  }
  function re(n) {
    for (var a = n > 0 ? 0 : e.config.showMonths - 1, r = n > 0 ? e.config.showMonths : -1, u = a; u != r; u += n)
      for (var b = e.daysContainer.children[u], x = n > 0 ? 0 : b.children.length - 1, R = n > 0 ? b.children.length : -1, E = x; E != R; E += n) {
        var K = b.children[E];
        if (K.className.indexOf("hidden") === -1 && ye(K.dateObj))
          return K;
      }
  }
  function we(n, a) {
    for (var r = n.className.indexOf("Month") === -1 ? n.dateObj.getMonth() : e.currentMonth, u = a > 0 ? e.config.showMonths : -1, b = a > 0 ? 1 : -1, x = r - e.currentMonth; x != u; x += b)
      for (var R = e.daysContainer.children[x], E = r - e.currentMonth === x ? n.$i + a : a < 0 ? R.children.length - 1 : 0, K = R.children.length, $ = E; $ >= 0 && $ < K && $ != (a > 0 ? K : -1); $ += b) {
        var L = R.children[$];
        if (L.className.indexOf("hidden") === -1 && ye(L.dateObj) && Math.abs(n.$i - $) >= Math.abs(a))
          return J(L);
      }
    e.changeMonth(b), S(re(b), 0);
  }
  function S(n, a) {
    var r = d(), u = Oe(r || document.body), b = n !== void 0 ? n : u ? r : e.selectedDateElem !== void 0 && Oe(e.selectedDateElem) ? e.selectedDateElem : e.todayDateElem !== void 0 && Oe(e.todayDateElem) ? e.todayDateElem : re(a > 0 ? 1 : -1);
    b === void 0 ? e._input.focus() : u ? we(b, a) : J(b);
  }
  function U(n, a) {
    for (var r = (new Date(n, a, 1).getDay() - e.l10n.firstDayOfWeek + 7) % 7, u = e.utils.getDaysInMonth((a - 1 + 12) % 12, n), b = e.utils.getDaysInMonth(a, n), x = window.document.createDocumentFragment(), R = e.config.showMonths > 1, E = R ? "prevMonthDay hidden" : "prevMonthDay", K = R ? "nextMonthDay hidden" : "nextMonthDay", $ = u + 1 - r, L = 0; $ <= u; $++, L++)
      x.appendChild(V("flatpickr-day " + E, new Date(n, a - 1, $), $, L));
    for ($ = 1; $ <= b; $++, L++)
      x.appendChild(V("flatpickr-day", new Date(n, a, $), $, L));
    for (var ae = b + 1; ae <= 42 - r && (e.config.showMonths === 1 || L % 7 !== 0); ae++, L++)
      x.appendChild(V("flatpickr-day " + K, new Date(n, a + 1, ae % b), ae, L));
    var Ve = ee("div", "dayContainer");
    return Ve.appendChild(x), Ve;
  }
  function G() {
    if (e.daysContainer !== void 0) {
      yt(e.daysContainer), e.weekNumbers && yt(e.weekNumbers);
      for (var n = document.createDocumentFragment(), a = 0; a < e.config.showMonths; a++) {
        var r = new Date(e.currentYear, e.currentMonth, 1);
        r.setMonth(e.currentMonth + a), n.appendChild(U(r.getFullYear(), r.getMonth()));
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
          var r = ee("option", "flatpickr-monthDropdown-month");
          r.value = new Date(e.currentYear, a).getMonth().toString(), r.textContent = xt(a, e.config.shorthandCurrentMonth, e.l10n), r.tabIndex = -1, e.currentMonth === a && (r.selected = !0), e.monthsDropdownContainer.appendChild(r);
        }
    }
  }
  function ge() {
    var n = ee("div", "flatpickr-month"), a = window.document.createDocumentFragment(), r;
    e.config.showMonths > 1 || e.config.monthSelectorType === "static" ? r = ee("span", "cur-month") : (e.monthsDropdownContainer = ee("select", "flatpickr-monthDropdown-months"), e.monthsDropdownContainer.setAttribute("aria-label", e.l10n.monthAriaLabel), y(e.monthsDropdownContainer, "change", function(R) {
      var E = Le(R), K = parseInt(E.value, 10);
      e.changeMonth(K - e.currentMonth), de("onMonthChange");
    }), X(), r = e.monthsDropdownContainer);
    var u = kt("cur-year", { tabindex: "-1" }), b = u.getElementsByTagName("input")[0];
    b.setAttribute("aria-label", e.l10n.yearAriaLabel), e.config.minDate && b.setAttribute("min", e.config.minDate.getFullYear().toString()), e.config.maxDate && (b.setAttribute("max", e.config.maxDate.getFullYear().toString()), b.disabled = !!e.config.minDate && e.config.minDate.getFullYear() === e.config.maxDate.getFullYear());
    var x = ee("div", "flatpickr-current-month");
    return x.appendChild(r), x.appendChild(u), a.appendChild(x), n.appendChild(a), {
      container: n,
      yearElement: b,
      monthElement: r
    };
  }
  function De() {
    yt(e.monthNav), e.monthNav.appendChild(e.prevMonthNav), e.config.showMonths && (e.yearElements = [], e.monthElements = []);
    for (var n = e.config.showMonths; n--; ) {
      var a = ge();
      e.yearElements.push(a.yearElement), e.monthElements.push(a.monthElement), e.monthNav.appendChild(a.container);
    }
    e.monthNav.appendChild(e.nextMonthNav);
  }
  function ue() {
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
    }), e.currentYearElement = e.yearElements[0], bt(), e.monthNav;
  }
  function he() {
    e.calendarContainer.classList.add("hasTime"), e.config.noCalendar && e.calendarContainer.classList.add("noCalendar");
    var n = Tt(e.config);
    e.timeContainer = ee("div", "flatpickr-time"), e.timeContainer.tabIndex = -1;
    var a = ee("span", "flatpickr-time-separator", ":"), r = kt("flatpickr-hour", {
      "aria-label": e.l10n.hourAriaLabel
    });
    e.hourElement = r.getElementsByTagName("input")[0];
    var u = kt("flatpickr-minute", {
      "aria-label": e.l10n.minuteAriaLabel
    });
    if (e.minuteElement = u.getElementsByTagName("input")[0], e.hourElement.tabIndex = e.minuteElement.tabIndex = -1, e.hourElement.value = Ee(e.latestSelectedDateObj ? e.latestSelectedDateObj.getHours() : e.config.time_24hr ? n.hours : s(n.hours)), e.minuteElement.value = Ee(e.latestSelectedDateObj ? e.latestSelectedDateObj.getMinutes() : n.minutes), e.hourElement.setAttribute("step", e.config.hourIncrement.toString()), e.minuteElement.setAttribute("step", e.config.minuteIncrement.toString()), e.hourElement.setAttribute("min", e.config.time_24hr ? "0" : "1"), e.hourElement.setAttribute("max", e.config.time_24hr ? "23" : "12"), e.hourElement.setAttribute("maxlength", "2"), e.minuteElement.setAttribute("min", "0"), e.minuteElement.setAttribute("max", "59"), e.minuteElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(r), e.timeContainer.appendChild(a), e.timeContainer.appendChild(u), e.config.time_24hr && e.timeContainer.classList.add("time24hr"), e.config.enableSeconds) {
      e.timeContainer.classList.add("hasSeconds");
      var b = kt("flatpickr-second");
      e.secondElement = b.getElementsByTagName("input")[0], e.secondElement.value = Ee(e.latestSelectedDateObj ? e.latestSelectedDateObj.getSeconds() : n.seconds), e.secondElement.setAttribute("step", e.minuteElement.getAttribute("step")), e.secondElement.setAttribute("min", "0"), e.secondElement.setAttribute("max", "59"), e.secondElement.setAttribute("maxlength", "2"), e.timeContainer.appendChild(ee("span", "flatpickr-time-separator", ":")), e.timeContainer.appendChild(b);
    }
    return e.config.time_24hr || (e.amPM = ee("span", "flatpickr-am-pm", e.l10n.amPM[Fe((e.latestSelectedDateObj ? e.hourElement.value : e.config.defaultHour) > 11)]), e.amPM.title = e.l10n.toggleTitle, e.amPM.tabIndex = -1, e.timeContainer.appendChild(e.amPM)), e.timeContainer;
  }
  function O() {
    e.weekdayContainer ? yt(e.weekdayContainer) : e.weekdayContainer = ee("div", "flatpickr-weekdays");
    for (var n = e.config.showMonths; n--; ) {
      var a = ee("div", "flatpickr-weekdaycontainer");
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
  function D() {
    e.calendarContainer.classList.add("hasWeeks");
    var n = ee("div", "flatpickr-weekwrapper");
    n.appendChild(ee("span", "flatpickr-weekday", e.l10n.weekAbbreviation));
    var a = ee("div", "flatpickr-weeks");
    return n.appendChild(a), {
      weekWrapper: n,
      weekNumbers: a
    };
  }
  function H(n, a) {
    a === void 0 && (a = !0);
    var r = a ? n : n - e.currentMonth;
    r < 0 && e._hidePrevMonthArrow === !0 || r > 0 && e._hideNextMonthArrow === !0 || (e.currentMonth += r, (e.currentMonth < 0 || e.currentMonth > 11) && (e.currentYear += e.currentMonth > 11 ? 1 : -1, e.currentMonth = (e.currentMonth + 12) % 12, de("onYearChange"), X()), G(), de("onMonthChange"), bt());
  }
  function I(n, a) {
    if (n === void 0 && (n = !0), a === void 0 && (a = !0), e.input.value = "", e.altInput !== void 0 && (e.altInput.value = ""), e.mobileInput !== void 0 && (e.mobileInput.value = ""), e.selectedDates = [], e.latestSelectedDateObj = void 0, a === !0 && (e.currentYear = e._initialDate.getFullYear(), e.currentMonth = e._initialDate.getMonth()), e.config.enableTime === !0) {
      var r = Tt(e.config), u = r.hours, b = r.minutes, x = r.seconds;
      C(u, b, x);
    }
    e.redraw(), n && de("onChange");
  }
  function ie() {
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
  function be(n) {
    return e.calendarContainer.contains(n);
  }
  function Ie(n) {
    if (e.isOpen && !e.config.inline) {
      var a = Le(n), r = be(a), u = a === e.input || a === e.altInput || e.element.contains(a) || n.path && n.path.indexOf && (~n.path.indexOf(e.input) || ~n.path.indexOf(e.altInput)), b = !u && !r && !be(n.relatedTarget), x = !e.config.ignoredFocusElements.some(function(R) {
        return R.contains(a);
      });
      b && x && (e.config.allowInput && e.setDate(e._input.value, !1, e.config.altInput ? e.config.altFormat : e.config.dateFormat), e.timeContainer !== void 0 && e.minuteElement !== void 0 && e.hourElement !== void 0 && e.input.value !== "" && e.input.value !== void 0 && c(), e.close(), e.config && e.config.mode === "range" && e.selectedDates.length === 1 && e.clear(!1));
    }
  }
  function Me(n) {
    if (!(!n || e.config.minDate && n < e.config.minDate.getFullYear() || e.config.maxDate && n > e.config.maxDate.getFullYear())) {
      var a = n, r = e.currentYear !== a;
      e.currentYear = a || e.currentYear, e.config.maxDate && e.currentYear === e.config.maxDate.getFullYear() ? e.currentMonth = Math.min(e.config.maxDate.getMonth(), e.currentMonth) : e.config.minDate && e.currentYear === e.config.minDate.getFullYear() && (e.currentMonth = Math.max(e.config.minDate.getMonth(), e.currentMonth)), r && (e.redraw(), de("onYearChange"), X());
    }
  }
  function ye(n, a) {
    var r;
    a === void 0 && (a = !0);
    var u = e.parseDate(n, void 0, a);
    if (e.config.minDate && u && Be(u, e.config.minDate, a !== void 0 ? a : !e.minDateHasTime) < 0 || e.config.maxDate && u && Be(u, e.config.maxDate, a !== void 0 ? a : !e.maxDateHasTime) > 0)
      return !1;
    if (!e.config.enable && e.config.disable.length === 0)
      return !0;
    if (u === void 0)
      return !1;
    for (var b = !!e.config.enable, x = (r = e.config.enable) !== null && r !== void 0 ? r : e.config.disable, R = 0, E = void 0; R < x.length; R++) {
      if (E = x[R], typeof E == "function" && E(u))
        return b;
      if (E instanceof Date && u !== void 0 && E.getTime() === u.getTime())
        return b;
      if (typeof E == "string") {
        var K = e.parseDate(E, void 0, !0);
        return K && K.getTime() === u.getTime() ? b : !b;
      } else if (typeof E == "object" && u !== void 0 && E.from && E.to && u.getTime() >= E.from.getTime() && u.getTime() <= E.to.getTime())
        return b;
    }
    return !b;
  }
  function Oe(n) {
    return e.daysContainer !== void 0 ? n.className.indexOf("hidden") === -1 && n.className.indexOf("flatpickr-disabled") === -1 && e.daysContainer.contains(n) : !1;
  }
  function tt(n) {
    var a = n.target === e._input, r = e._input.value.trimEnd() !== Dt();
    a && r && !(n.relatedTarget && be(n.relatedTarget)) && e.setDate(e._input.value, !0, n.target === e.altInput ? e.config.altFormat : e.config.dateFormat);
  }
  function Ge(n) {
    var a = Le(n), r = e.config.wrap ? t.contains(a) : a === e._input, u = e.config.allowInput, b = e.isOpen && (!u || !r), x = e.config.inline && r && !u;
    if (n.keyCode === 13 && r) {
      if (u)
        return e.setDate(e._input.value, !0, a === e.altInput ? e.config.altFormat : e.config.dateFormat), e.close(), a.blur();
      e.open();
    } else if (be(a) || b || x) {
      var R = !!e.timeContainer && e.timeContainer.contains(a);
      switch (n.keyCode) {
        case 13:
          R ? (n.preventDefault(), c(), ve()) : Se(n);
          break;
        case 27:
          n.preventDefault(), ve();
          break;
        case 8:
        case 46:
          r && !e.config.allowInput && (n.preventDefault(), e.clear());
          break;
        case 37:
        case 39:
          if (!R && !r) {
            n.preventDefault();
            var E = d();
            if (e.daysContainer !== void 0 && (u === !1 || E && Oe(E))) {
              var K = n.keyCode === 39 ? 1 : -1;
              n.ctrlKey ? (n.stopPropagation(), H(K), S(re(1), 0)) : S(void 0, K);
            }
          } else e.hourElement && e.hourElement.focus();
          break;
        case 38:
        case 40:
          n.preventDefault();
          var $ = n.keyCode === 40 ? 1 : -1;
          e.daysContainer && a.$i !== void 0 || a === e.input || a === e.altInput ? n.ctrlKey ? (n.stopPropagation(), Me(e.currentYear - $), S(re(1), 0)) : R || S(void 0, $ * 7) : a === e.currentYearElement ? Me(e.currentYear - $) : e.config.enableTime && (!R && e.hourElement && e.hourElement.focus(), c(n), e._debouncedChange());
          break;
        case 9:
          if (R) {
            var L = [
              e.hourElement,
              e.minuteElement,
              e.secondElement,
              e.amPM
            ].concat(e.pluginElements).filter(function(Ae) {
              return Ae;
            }), ae = L.indexOf(a);
            if (ae !== -1) {
              var Ve = L[ae + (n.shiftKey ? -1 : 1)];
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
    (r || be(a)) && de("onKeyDown", n);
  }
  function Te(n, a) {
    if (a === void 0 && (a = "flatpickr-day"), !(e.selectedDates.length !== 1 || n && (!n.classList.contains(a) || n.classList.contains("flatpickr-disabled")))) {
      for (var r = n ? n.dateObj.getTime() : e.days.firstElementChild.dateObj.getTime(), u = e.parseDate(e.selectedDates[0], void 0, !0).getTime(), b = Math.min(r, e.selectedDates[0].getTime()), x = Math.max(r, e.selectedDates[0].getTime()), R = !1, E = 0, K = 0, $ = b; $ < x; $ += Ya.DAY)
        ye(new Date($), !0) || (R = R || $ > b && $ < x, $ < u && (!E || $ > E) ? E = $ : $ > u && (!K || $ < K) && (K = $));
      var L = Array.from(e.rContainer.querySelectorAll("*:nth-child(-n+" + e.config.showMonths + ") > ." + a));
      L.forEach(function(ae) {
        var Ve = ae.dateObj, Ae = Ve.getTime(), ft = E > 0 && Ae < E || K > 0 && Ae > K;
        if (ft) {
          ae.classList.add("notAllowed"), ["inRange", "startRange", "endRange"].forEach(function(it) {
            ae.classList.remove(it);
          });
          return;
        } else if (R && !ft)
          return;
        ["startRange", "inRange", "endRange", "notAllowed"].forEach(function(it) {
          ae.classList.remove(it);
        }), n !== void 0 && (n.classList.add(r <= e.selectedDates[0].getTime() ? "startRange" : "endRange"), u < r && Ae === u ? ae.classList.add("startRange") : u > r && Ae === u && ae.classList.add("endRange"), Ae >= E && (K === 0 || Ae <= K) && Pa(Ae, u, r) && ae.classList.add("inRange"));
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
        var r = Le(n);
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
        return ye(b);
      }), !e.selectedDates.length && n === "min" && M(r), We()), e.daysContainer && (F(), r !== void 0 ? e.currentYearElement[n] = r.getFullYear().toString() : e.currentYearElement.removeAttribute(n), e.currentYearElement.disabled = !!u && r !== void 0 && u.getFullYear() === r.getFullYear());
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
    ], a = Ce(Ce({}, JSON.parse(JSON.stringify(t.dataset || {}))), o), r = {};
    e.config.parseDate = a.parseDate, e.config.formatDate = a.formatDate, Object.defineProperty(e.config, "enable", {
      get: function() {
        return e.config._enable;
      },
      set: function(L) {
        e.config._enable = je(L);
      }
    }), Object.defineProperty(e.config, "disable", {
      get: function() {
        return e.config._disable;
      },
      set: function(L) {
        e.config._disable = je(L);
      }
    });
    var u = a.mode === "time";
    if (!a.dateFormat && (a.enableTime || u)) {
      var b = fe.defaultConfig.dateFormat || st.dateFormat;
      r.dateFormat = a.noCalendar || u ? "H:i" + (a.enableSeconds ? ":S" : "") : b + " H:i" + (a.enableSeconds ? ":S" : "");
    }
    if (a.altInput && (a.enableTime || u) && !a.altFormat) {
      var x = fe.defaultConfig.altFormat || st.altFormat;
      r.altFormat = a.noCalendar || u ? "h:i" + (a.enableSeconds ? ":S K" : " K") : x + (" h:i" + (a.enableSeconds ? ":S" : "") + " K");
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
    var R = function(L) {
      return function(ae) {
        e.config[L === "min" ? "_minTime" : "_maxTime"] = e.parseDate(ae, "H:i:S");
      };
    };
    Object.defineProperty(e.config, "minTime", {
      get: function() {
        return e.config._minTime;
      },
      set: R("min")
    }), Object.defineProperty(e.config, "maxTime", {
      get: function() {
        return e.config._maxTime;
      },
      set: R("max")
    }), a.mode === "time" && (e.config.noCalendar = !0, e.config.enableTime = !0), Object.assign(e.config, r, a);
    for (var E = 0; E < n.length; E++)
      e.config[n[E]] = e.config[n[E]] === !0 || e.config[n[E]] === "true";
    St.filter(function(L) {
      return e.config[L] !== void 0;
    }).forEach(function(L) {
      e.config[L] = Et(e.config[L] || []).map(g);
    }), e.isMobile = !e.config.disableMobile && !e.config.inline && e.config.mode === "single" && !e.config.disable.length && !e.config.enable && !e.config.weekNumbers && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    for (var E = 0; E < e.config.plugins.length; E++) {
      var K = e.config.plugins[E](e) || {};
      for (var $ in K)
        St.indexOf($) > -1 ? e.config[$] = Et(K[$]).map(g).concat(e.config[$]) : typeof a[$] > "u" && (e.config[$] = K[$]);
    }
    a.altInputClass || (e.config.altInputClass = Ye().className + " " + e.config.altInputClass), de("onParseConfig");
  }
  function Ye() {
    return e.config.wrap ? t.querySelector("[data-input]") : t;
  }
  function Ke() {
    typeof e.config.locale != "object" && typeof fe.l10ns[e.config.locale] > "u" && e.config.errorHandler(new Error("flatpickr: invalid locale " + e.config.locale)), e.l10n = Ce(Ce({}, fe.l10ns.default), typeof e.config.locale == "object" ? e.config.locale : e.config.locale !== "default" ? fe.l10ns[e.config.locale] : void 0), Je.D = "(" + e.l10n.weekdays.shorthand.join("|") + ")", Je.l = "(" + e.l10n.weekdays.longhand.join("|") + ")", Je.M = "(" + e.l10n.months.shorthand.join("|") + ")", Je.F = "(" + e.l10n.months.longhand.join("|") + ")", Je.K = "(" + e.l10n.amPM[0] + "|" + e.l10n.amPM[1] + "|" + e.l10n.amPM[0].toLowerCase() + "|" + e.l10n.amPM[1].toLowerCase() + ")";
    var n = Ce(Ce({}, o), JSON.parse(JSON.stringify(t.dataset || {})));
    n.time_24hr === void 0 && fe.defaultConfig.time_24hr === void 0 && (e.config.time_24hr = e.l10n.time_24hr), e.formatDate = Vt(e), e.parseDate = Lt({ config: e.config, l10n: e.l10n });
  }
  function qe(n) {
    if (typeof e.config.position == "function")
      return void e.config.position(e, n);
    if (e.calendarContainer !== void 0) {
      de("onPreCalendarPosition");
      var a = n || e._positionElement, r = Array.prototype.reduce.call(e.calendarContainer.children, function(tn, nn) {
        return tn + nn.offsetHeight;
      }, 0), u = e.calendarContainer.offsetWidth, b = e.config.position.split(" "), x = b[0], R = b.length > 1 ? b[1] : null, E = a.getBoundingClientRect(), K = window.innerHeight - E.bottom, $ = x === "above" || x !== "below" && K < r && E.top > r, L = window.pageYOffset + E.top + ($ ? -r - 2 : a.offsetHeight + 2);
      if ($e(e.calendarContainer, "arrowTop", !$), $e(e.calendarContainer, "arrowBottom", $), !e.config.inline) {
        var ae = window.pageXOffset + E.left, Ve = !1, Ae = !1;
        R === "center" ? (ae -= (u - E.width) / 2, Ve = !0) : R === "right" && (ae -= u - E.width, Ae = !0), $e(e.calendarContainer, "arrowLeft", !Ve && !Ae), $e(e.calendarContainer, "arrowCenter", Ve), $e(e.calendarContainer, "arrowRight", Ae);
        var ft = window.document.body.offsetWidth - (window.pageXOffset + E.right), it = ae + u > window.document.body.offsetWidth, Kt = ft + u > window.document.body.offsetWidth;
        if ($e(e.calendarContainer, "rightMost", it), !e.config.static)
          if (e.calendarContainer.style.top = L + "px", !it)
            e.calendarContainer.style.left = ae + "px", e.calendarContainer.style.right = "auto";
          else if (!Kt)
            e.calendarContainer.style.left = "auto", e.calendarContainer.style.right = ft + "px";
          else {
            var $t = Q();
            if ($t === void 0)
              return;
            var qt = window.document.body.offsetWidth, Zt = Math.max(0, qt / 2 - u / 2), Jt = ".flatpickr-calendar.centerMost:before", Xt = ".flatpickr-calendar.centerMost:after", Qt = $t.cssRules.length, en = "{left:" + E.left + "px;right:auto;}";
            $e(e.calendarContainer, "rightMost", !1), $e(e.calendarContainer, "centerMost", !0), $t.insertRule(Jt + "," + Xt + en, Qt), e.calendarContainer.style.left = Zt + "px", e.calendarContainer.style.right = "auto";
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
    return n ?? Y();
  }
  function Y() {
    var n = document.createElement("style");
    return document.head.appendChild(n), n.sheet;
  }
  function F() {
    e.config.noCalendar || e.isMobile || (X(), bt(), G());
  }
  function ve() {
    e._input.focus(), window.navigator.userAgent.indexOf("MSIE") !== -1 || navigator.msMaxTouchPoints !== void 0 ? setTimeout(e.close, 0) : e.close();
  }
  function Se(n) {
    n.preventDefault(), n.stopPropagation();
    var a = function(L) {
      return L.classList && L.classList.contains("flatpickr-day") && !L.classList.contains("flatpickr-disabled") && !L.classList.contains("notAllowed");
    }, r = Pt(Le(n), a);
    if (r !== void 0) {
      var u = r, b = e.latestSelectedDateObj = new Date(u.dateObj.getTime()), x = (b.getMonth() < e.currentMonth || b.getMonth() > e.currentMonth + e.config.showMonths - 1) && e.config.mode !== "range";
      if (e.selectedDateElem = u, e.config.mode === "single")
        e.selectedDates = [b];
      else if (e.config.mode === "multiple") {
        var R = Ct(b);
        R ? e.selectedDates.splice(parseInt(R), 1) : e.selectedDates.push(b);
      } else e.config.mode === "range" && (e.selectedDates.length === 2 && e.clear(!1, !1), e.latestSelectedDateObj = b, e.selectedDates.push(b), Be(b, e.selectedDates[0], !0) !== 0 && e.selectedDates.sort(function(L, ae) {
        return L.getTime() - ae.getTime();
      }));
      if (w(), x) {
        var E = e.currentYear !== b.getFullYear();
        e.currentYear = b.getFullYear(), e.currentMonth = b.getMonth(), E && (de("onYearChange"), X()), de("onMonthChange");
      }
      if (bt(), G(), We(), !x && e.config.mode !== "range" && e.config.showMonths === 1 ? J(u) : e.selectedDateElem !== void 0 && e.hourElement === void 0 && e.selectedDateElem && e.selectedDateElem.focus(), e.hourElement !== void 0 && e.hourElement !== void 0 && e.hourElement.focus(), e.config.closeOnSelect) {
        var K = e.config.mode === "single" && !e.config.enableTime, $ = e.config.mode === "range" && e.selectedDates.length === 2 && !e.config.enableTime;
        (K || $) && ve();
      }
      P();
    }
  }
  var Pe = {
    locale: [Ke, m],
    showMonths: [De, i, O],
    minDate: [te],
    maxDate: [te],
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
      return u instanceof Date && ye(u, !1);
    }), e.config.mode === "range" && e.selectedDates.sort(function(u, b) {
      return u.getTime() - b.getTime();
    });
  }
  function Ze(n, a, r) {
    if (a === void 0 && (a = !1), r === void 0 && (r = e.config.dateFormat), n !== 0 && !n || n instanceof Array && n.length === 0)
      return e.clear(a);
    Re(n, r), e.latestSelectedDateObj = e.selectedDates[e.selectedDates.length - 1], e.redraw(), te(void 0, a), M(), e.selectedDates.length === 0 && e.clear(!1), We(a), a && de("onChange");
  }
  function je(n) {
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
    e.input._type = e.input.type, e.input.type = "text", e.input.classList.add("flatpickr-input"), e._input = e.input, e.config.altInput && (e.altInput = ee(e.input.nodeName, e.config.altInputClass), e._input = e.altInput, e.altInput.placeholder = e.input.placeholder, e.altInput.disabled = e.input.disabled, e.altInput.required = e.input.required, e.altInput.tabIndex = e.input.tabIndex, e.altInput.type = "text", e.input.setAttribute("type", "hidden"), !e.config.static && e.input.parentNode && e.input.parentNode.insertBefore(e.altInput, e.input.nextSibling)), e.config.allowInput || e._input.setAttribute("readonly", "readonly"), ot();
  }
  function ot() {
    e._positionElement = e.config.positionElement || e._input;
  }
  function rt() {
    var n = e.config.enableTime ? e.config.noCalendar ? "time" : "datetime-local" : "date";
    e.mobileInput = ee("input", e.input.className + " flatpickr-mobile"), e.mobileInput.tabIndex = 1, e.mobileInput.type = n, e.mobileInput.disabled = e.input.disabled, e.mobileInput.required = e.input.required, e.mobileInput.placeholder = e.input.placeholder, e.mobileFormatStr = n === "datetime-local" ? "Y-m-d\\TH:i:S" : n === "date" ? "Y-m-d" : "H:i:S", e.selectedDates.length > 0 && (e.mobileInput.defaultValue = e.mobileInput.value = e.formatDate(e.selectedDates[0], e.mobileFormatStr)), e.config.minDate && (e.mobileInput.min = e.formatDate(e.config.minDate, "Y-m-d")), e.config.maxDate && (e.mobileInput.max = e.formatDate(e.config.maxDate, "Y-m-d")), e.input.getAttribute("step") && (e.mobileInput.step = String(e.input.getAttribute("step"))), e.input.type = "hidden", e.altInput !== void 0 && (e.altInput.type = "hidden");
    try {
      e.input.parentNode && e.input.parentNode.insertBefore(e.mobileInput, e.input.nextSibling);
    } catch {
    }
    y(e.mobileInput, "change", function(a) {
      e.setDate(Le(a).value, !1, e.mobileFormatStr), de("onChange"), de("onClose");
    });
  }
  function Rt(n) {
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
      if (r instanceof Date && Be(r, n) === 0)
        return "" + a;
    }
    return !1;
  }
  function Wt(n) {
    return e.config.mode !== "range" || e.selectedDates.length < 2 ? !1 : Be(n, e.selectedDates[0]) >= 0 && Be(n, e.selectedDates[1]) <= 0;
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
  function Ut(n) {
    var a = Le(n), r = e.prevMonthNav.contains(a), u = e.nextMonthNav.contains(a);
    r || u ? H(r ? -1 : 1) : e.yearElements.indexOf(a) >= 0 ? a.select() : a.classList.contains("arrowUp") ? e.changeYear(e.currentYear + 1) : a.classList.contains("arrowDown") && e.changeYear(e.currentYear - 1);
  }
  function Gt(n) {
    n.preventDefault();
    var a = n.type === "keydown", r = Le(n), u = r;
    e.amPM !== void 0 && r === e.amPM && (e.amPM.textContent = e.l10n.amPM[Fe(e.amPM.textContent === e.l10n.amPM[0])]);
    var b = parseFloat(u.getAttribute("min")), x = parseFloat(u.getAttribute("max")), R = parseFloat(u.getAttribute("step")), E = parseInt(u.value, 10), K = n.delta || (a ? n.which === 38 ? 1 : -1 : 0), $ = E + R * K;
    if (typeof u.value < "u" && u.value.length === 2) {
      var L = u === e.hourElement, ae = u === e.minuteElement;
      $ < b ? ($ = x + $ + Fe(!L) + (Fe(L) && Fe(!e.amPM)), ae && W(void 0, -1, e.hourElement)) : $ > x && ($ = u === e.hourElement ? $ - x - Fe(!e.amPM) : b, ae && W(void 0, 1, e.hourElement)), e.amPM && L && (R === 1 ? $ + E === 23 : Math.abs($ - E) > R) && (e.amPM.textContent = e.l10n.amPM[Fe(e.amPM.textContent === e.l10n.amPM[0])]), u.value = Ee($);
    }
  }
  return l(), e;
}
function lt(t, o) {
  for (var e = Array.prototype.slice.call(t).filter(function(g) {
    return g instanceof HTMLElement;
  }), p = [], l = 0; l < e.length; l++) {
    var d = e[l];
    try {
      if (d.getAttribute("data-fp-omit") !== null)
        continue;
      d._flatpickr !== void 0 && (d._flatpickr.destroy(), d._flatpickr = void 0), d._flatpickr = Wa(d, o || {}), p.push(d._flatpickr);
    } catch (g) {
      console.error(g);
    }
  }
  return p.length === 1 ? p[0] : p;
}
typeof HTMLElement < "u" && typeof HTMLCollection < "u" && typeof NodeList < "u" && (HTMLCollection.prototype.flatpickr = NodeList.prototype.flatpickr = function(t) {
  return lt(this, t);
}, HTMLElement.prototype.flatpickr = function(t) {
  return lt([this], t);
});
var fe = function(t, o) {
  return typeof t == "string" ? lt(window.document.querySelectorAll(t), o) : t instanceof Node ? lt([t], o) : lt(t, o);
};
fe.defaultConfig = {};
fe.l10ns = {
  en: Ce({}, pt),
  default: Ce({}, pt)
};
fe.localize = function(t) {
  fe.l10ns.default = Ce(Ce({}, fe.l10ns.default), t);
};
fe.setDefaults = function(t) {
  fe.defaultConfig = Ce(Ce({}, fe.defaultConfig), t);
};
fe.parseDate = Lt({});
fe.formatDate = Vt({});
fe.compareDates = Be;
typeof jQuery < "u" && typeof jQuery.fn < "u" && (jQuery.fn.flatpickr = function(t) {
  return lt(this, t);
});
Date.prototype.fp_incr = function(t) {
  return new Date(this.getFullYear(), this.getMonth(), this.getDate() + (typeof t == "string" ? parseInt(t, 10) : t));
};
typeof window < "u" && (window.flatpickr = fe);
var Ua = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Ga(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var Yt = { exports: {} };
(function(t, o) {
  (function(e, p) {
    t.exports = p();
  })(Ua, function() {
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
        for (var s, w = 1, M = arguments.length; w < M; w++) {
          s = arguments[w];
          for (var C in s) Object.prototype.hasOwnProperty.call(s, C) && (k[C] = s[C]);
        }
        return k;
      }, e.apply(this, arguments);
    }, p = function(c, k, s) {
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
    var g = {
      shorthand: !1,
      dateFormat: "F Y",
      altFormat: "F Y",
      theme: "light"
    };
    function i(c) {
      var k = e(e({}, g), c);
      return function(s) {
        s.config.dateFormat = k.dateFormat, s.config.altFormat = k.altFormat;
        var w = { monthsContainer: null };
        function M() {
          if (s.rContainer) {
            l(s.rContainer);
            for (var S = 0; S < s.monthElements.length; S++) {
              var U = s.monthElements[S];
              U.parentNode && U.parentNode.removeChild(U);
            }
          }
        }
        function C() {
          s.rContainer && (w.monthsContainer = s._createElement("div", "flatpickr-monthSelect-months"), w.monthsContainer.tabIndex = -1, B(), s.rContainer.appendChild(w.monthsContainer), s.calendarContainer.classList.add("flatpickr-monthSelect-theme-" + k.theme));
        }
        function B() {
          if (w.monthsContainer) {
            l(w.monthsContainer);
            for (var S = document.createDocumentFragment(), U = 0; U < 12; U++) {
              var G = s.createDay("flatpickr-monthSelect-month", new Date(s.currentYear, U), 0, U);
              G.dateObj.getMonth() === (/* @__PURE__ */ new Date()).getMonth() && G.dateObj.getFullYear() === (/* @__PURE__ */ new Date()).getFullYear() && G.classList.add("today"), G.textContent = p(U, k.shorthand, s.l10n), G.addEventListener("click", te), S.appendChild(G);
            }
            w.monthsContainer.appendChild(S), s.config.minDate && s.currentYear === s.config.minDate.getFullYear() ? s.prevMonthNav.classList.add("flatpickr-disabled") : s.prevMonthNav.classList.remove("flatpickr-disabled"), s.config.maxDate && s.currentYear === s.config.maxDate.getFullYear() ? s.nextMonthNav.classList.add("flatpickr-disabled") : s.nextMonthNav.classList.remove("flatpickr-disabled");
          }
        }
        function y() {
          s._bind(s.prevMonthNav, "click", function(S) {
            S.preventDefault(), S.stopPropagation(), s.changeYear(s.currentYear - 1), q(), B();
          }), s._bind(s.nextMonthNav, "click", function(S) {
            S.preventDefault(), S.stopPropagation(), s.changeYear(s.currentYear + 1), q(), B();
          }), s._bind(w.monthsContainer, "mouseover", function(S) {
            s.config.mode === "range" && s.onMouseOver(d(S), "flatpickr-monthSelect-month");
          });
        }
        function P() {
          if (s.rContainer && s.selectedDates.length) {
            for (var S = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month.selected"), U = 0; U < S.length; U++)
              S[U].classList.remove("selected");
            var G = s.selectedDates[0].getMonth(), X = s.rContainer.querySelector(".flatpickr-monthSelect-month:nth-child(" + (G + 1) + ")");
            X && X.classList.add("selected");
          }
        }
        function q() {
          var S = s.selectedDates[0];
          if (S && (S = new Date(S), S.setFullYear(s.currentYear), s.config.minDate && S < s.config.minDate && (S = s.config.minDate), s.config.maxDate && S > s.config.maxDate && (S = s.config.maxDate), s.currentYear = S.getFullYear()), s.currentYearElement.value = String(s.currentYear), s.rContainer) {
            var U = s.rContainer.querySelectorAll(".flatpickr-monthSelect-month");
            U.forEach(function(G) {
              G.dateObj.setFullYear(s.currentYear), s.config.minDate && G.dateObj < s.config.minDate || s.config.maxDate && G.dateObj > s.config.maxDate ? G.classList.add("flatpickr-disabled") : G.classList.remove("flatpickr-disabled");
            });
          }
          P();
        }
        function te(S) {
          S.preventDefault(), S.stopPropagation();
          var U = d(S);
          if (U instanceof Element && !U.classList.contains("flatpickr-disabled") && !U.classList.contains("notAllowed") && (ne(U.dateObj), s.config.closeOnSelect)) {
            var G = s.config.mode === "single", X = s.config.mode === "range" && s.selectedDates.length === 2;
            (G || X) && s.close();
          }
        }
        function ne(S) {
          var U = new Date(s.currentYear, S.getMonth(), S.getDate()), G = [];
          switch (s.config.mode) {
            case "single":
              G = [U];
              break;
            case "multiple":
              G.push(U);
              break;
            case "range":
              s.selectedDates.length === 2 ? G = [U] : (G = s.selectedDates.concat([U]), G.sort(function(X, ge) {
                return X.getTime() - ge.getTime();
              }));
              break;
          }
          s.setDate(G, !0), P();
        }
        var W = {
          37: -1,
          39: 1,
          40: 3,
          38: -3
        };
        function Z(S, U, G, X) {
          var ge = W[X.keyCode] !== void 0;
          if (!(!ge && X.keyCode !== 13) && !(!s.rContainer || !w.monthsContainer)) {
            var De = s.rContainer.querySelector(".flatpickr-monthSelect-month.selected"), ue = Array.prototype.indexOf.call(w.monthsContainer.children, document.activeElement);
            if (ue === -1) {
              var he = De || w.monthsContainer.firstElementChild;
              he.focus(), ue = he.$i;
            }
            ge ? w.monthsContainer.children[(12 + ue + W[X.keyCode]) % 12].focus() : X.keyCode === 13 && w.monthsContainer.contains(document.activeElement) && ne(document.activeElement.dateObj);
          }
        }
        function V() {
          var S;
          ((S = s.config) === null || S === void 0 ? void 0 : S.mode) === "range" && s.selectedDates.length === 1 && s.clear(!1), s.selectedDates.length || B();
        }
        function J() {
          k._stubbedCurrentMonth = s._initialDate.getMonth(), s._initialDate.setMonth(k._stubbedCurrentMonth), s.currentMonth = k._stubbedCurrentMonth;
        }
        function re() {
          k._stubbedCurrentMonth && (s._initialDate.setMonth(k._stubbedCurrentMonth), s.currentMonth = k._stubbedCurrentMonth, delete k._stubbedCurrentMonth);
        }
        function we() {
          if (w.monthsContainer !== null)
            for (var S = w.monthsContainer.querySelectorAll(".flatpickr-monthSelect-month"), U = 0; U < S.length; U++)
              S[U].removeEventListener("click", te);
        }
        return {
          onParseConfig: function() {
            s.config.enableTime = !1;
          },
          onValueUpdate: P,
          onKeyDown: Z,
          onReady: [
            J,
            M,
            C,
            y,
            P,
            function() {
              s.config.onClose.push(V), s.loadedPlugins.push("monthSelect");
            }
          ],
          onDestroy: [
            re,
            we,
            function() {
              s.config.onClose = s.config.onClose.filter(function(S) {
                return S !== V;
              });
            }
          ]
        };
      };
    }
    return i;
  });
})(Yt);
var Ka = Yt.exports;
const qa = /* @__PURE__ */ Ga(Ka), Za = { class: "relative" }, Ja = ["placeholder", "disabled", "readonly"], Xa = {
  key: 1,
  class: "mitreka-year-grid absolute z-20 mt-2 w-full rounded-box border border-base-300 bg-base-100 p-3 shadow"
}, Qa = { class: "flex items-center justify-between mb-2" }, eo = { class: "text-xs opacity-70" }, to = { class: "grid grid-cols-4 gap-2" }, no = ["onClick"], gr = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = A(null), d = A(!1), g = A((/* @__PURE__ */ new Date()).getFullYear() - 6);
    let i = null;
    const c = _(() => e.picker === "month" ? e.dateFormat || "m" : e.picker === "year" ? e.dateFormat || "Y" : e.dateFormat ? e.dateFormat : e.noCalendar ? "H:i" : e.enableTime ? "Y-m-d H:i" : "Y-m-d"), k = _(() => e.displayFormat ? e.displayFormat : e.picker === "month" ? "M" : c.value), s = _(() => e.picker !== "year-grid" ? "" : Array.isArray(e.modelValue) ? e.modelValue[0] || "" : e.modelValue || ""), w = _(() => e.picker !== "year-grid" ? {} : { value: s.value }), M = _(() => Array.isArray(e.modelValue) ? e.modelValue.length > 0 : !!e.modelValue), C = _(
      () => e.clearable && M.value && !e.disabled && !e.readonly
    ), B = () => {
      var W;
      if (e.mode === "range" ? p("update:modelValue", []) : p("update:modelValue", ""), e.picker === "year-grid") {
        d.value = !1;
        return;
      }
      (W = i == null ? void 0 : i.clear) == null || W.call(i, !1);
    }, y = () => {
      var W, Z;
      if (l.value) {
        if (e.picker === "year-grid") {
          (W = i == null ? void 0 : i.destroy) == null || W.call(i), i = null;
          return;
        }
        (Z = i == null ? void 0 : i.destroy) == null || Z.call(i), i = fe(l.value, {
          mode: e.mode,
          plugins: e.picker === "month" ? [
            qa({
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
            var V, J;
            e.picker === "month" && ((V = i == null ? void 0 : i.calendarContainer) == null || V.classList.add("flatpickr-month-only")), e.picker === "year" && ((J = i == null ? void 0 : i.calendarContainer) == null || J.classList.add("flatpickr-year-only"));
          },
          onOpen: () => {
            var V, J;
            e.picker === "month" && ((V = i == null ? void 0 : i.calendarContainer) == null || V.classList.add("flatpickr-month-only")), e.picker === "year" && ((J = i == null ? void 0 : i.calendarContainer) == null || J.classList.add("flatpickr-year-only"));
          },
          onChange: (V) => {
            if (e.mode === "range") {
              const J = V.map(
                (re) => i.formatDate(re, c.value)
              );
              p("update:modelValue", J);
            } else {
              const J = V[0] ? i.formatDate(V[0], c.value) : "";
              p("update:modelValue", J);
            }
          }
        });
      }
    }, P = () => {
      var W;
      if (e.picker === "year-grid") {
        d.value = !0;
        return;
      }
      (W = i == null ? void 0 : i.open) == null || W.call(i);
    };
    ct(y), et(() => {
      var W;
      return (W = i == null ? void 0 : i.destroy) == null ? void 0 : W.call(i);
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
      (W) => {
        !i || e.picker === "year-grid" || i.setDate(W, !1);
      }
    );
    const q = _(
      () => Array.from({ length: 12 }, (W, Z) => g.value + Z)
    ), te = (W) => {
      p("update:modelValue", W.toString()), d.value = !1;
    }, ne = (W) => {
      if (!d.value) return;
      const Z = W.target;
      if (l.value && Z && l.value.contains(Z)) return;
      const V = document.querySelector(".mitreka-year-grid");
      V && Z && V.contains(Z) || (d.value = !1);
    };
    return ct(() => document.addEventListener("click", ne)), et(() => document.removeEventListener("click", ne)), (W, Z) => (h(), v("div", Za, [
      f("input", Ot({
        ref_key: "inputEl",
        ref: l,
        class: ["input w-full", [t.inputClass, C.value ? "pr-9" : ""]],
        placeholder: t.placeholder
      }, w.value, {
        disabled: t.disabled,
        readonly: t.readonly,
        onClick: P,
        onFocus: P
      }), null, 16, Ja),
      C.value ? (h(), v("button", {
        key: 0,
        type: "button",
        class: "absolute right-2 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100",
        "aria-label": "Clear value",
        onMousedown: Z[0] || (Z[0] = ke(() => {
        }, ["prevent"])),
        onClick: ke(B, ["stop"])
      }, [...Z[3] || (Z[3] = [
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
      ])], 32)) : N("", !0),
      t.picker === "year-grid" && d.value ? (h(), v("div", Xa, [
        f("div", Qa, [
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: Z[1] || (Z[1] = (V) => g.value -= 12)
          }, " Prev "),
          f("div", eo, z(g.value) + " - " + z(g.value + 11), 1),
          f("button", {
            class: "btn btn-ghost btn-xs",
            type: "button",
            onClick: Z[2] || (Z[2] = (V) => g.value += 12)
          }, " Next ")
        ]),
        f("div", to, [
          (h(!0), v(pe, null, _e(q.value, (V) => (h(), v("button", {
            key: V,
            class: T(["btn btn-ghost btn-xs", { "btn-primary": t.modelValue === V.toString() }]),
            type: "button",
            onClick: (J) => te(V)
          }, z(V), 11, no))), 128))
        ])
      ])) : N("", !0)
    ]));
  }
}), vr = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = dn(), d = A(null), g = A(null), i = A(13), c = A(!1);
    let k = null, s = null;
    const w = [
      "modelUpdated",
      "paginationChanged",
      "filterChanged",
      "rowDataUpdated",
      "firstDataRendered"
    ], M = [], C = A("normal"), B = _(() => [
      "w-full",
      C.value === "autoHeight" ? "h-auto" : "h-full"
    ]), y = _(() => C.value === "autoHeight" ? { height: "auto" } : { height: e.normalLayoutHeight }), P = () => {
      const m = document.documentElement, D = m.classList.contains("dark"), H = (m.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
      c.value = D || H;
    }, q = _(() => e.themeMode === "dark" ? !0 : e.themeMode === "light" ? !1 : c.value), te = _(() => q.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"), ne = _(() => e.density === "compact" ? "agx-compact" : e.density === "spacious" ? "agx-spacious" : ""), W = _(() => ["agx", te.value, ne.value, l.class]), Z = _(() => [{ "--ag-odd-row-background-color": e.striped ? q.value ? "#0d1a33" : "#F3F4F6" : "transparent" }, l.style]), V = _(() => {
      const { class: m, style: D, onGridReady: H, ...I } = l;
      return I;
    }), J = (m) => typeof m == "number" && Number.isFinite(m) ? m : void 0, re = _(() => {
      const m = l.gridOptions;
      if (m && typeof m == "object") return m;
      const D = l["grid-options"];
      return D && typeof D == "object" ? D : {};
    }), we = (m) => {
      const D = J(l[m]);
      if (typeof D == "number") return D;
      const I = J(l[m === "headerHeight" ? "header-height" : "group-header-height"]);
      return typeof I == "number" ? I : J(re.value[m]);
    }, S = () => {
      const m = l.domLayout;
      if (typeof m == "string" && m.length > 0) return m;
      const D = l["dom-layout"];
      if (typeof D == "string" && D.length > 0) return D;
      const H = re.value.domLayout;
      return typeof H == "string" && H.length > 0 ? H : void 0;
    }, U = () => {
      var D, H;
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
        const I = (H = (D = g.value).getModel) == null ? void 0 : H.call(D), ie = I && typeof I.getRowCount == "function" ? I.getRowCount() : void 0;
        if (m(ie)) return ie;
      }
      return 0;
    }, G = () => {
      const m = Number(e.autoHeightThreshold);
      return Number.isFinite(m) ? Math.max(1, Math.floor(m)) : 15;
    }, X = () => {
      if (!g.value) return;
      const m = S();
      if (m) {
        C.value = m, g.value.setGridOption("domLayout", m);
        return;
      }
      const D = e.autoHeightWhenFewRows && U() < G() ? "autoHeight" : "normal";
      C.value = D, g.value.setGridOption("domLayout", D);
    }, ge = () => {
      var m;
      for (; M.length > 0; )
        (m = M.pop()) == null || m();
    }, De = () => {
      if (!g.value) return;
      ge();
      const m = () => X();
      w.forEach((D) => {
        g.value.addEventListener(D, m), M.push(() => {
          var H;
          (H = g.value) == null || H.removeEventListener(D, m);
        });
      });
    }, ue = () => {
      if (!e.autoHeaderHeight || !g.value) return;
      const m = we("headerHeight") ?? hn(e.density), D = we("groupHeaderHeight") ?? pn(e.density);
      g.value.setGridOption("headerHeight", m), g.value.setGridOption("groupHeaderHeight", D);
    }, he = () => {
      if (!e.autoRowHeight || !g.value) return;
      const m = gn(i.value, e.density);
      g.value.setGridOption("rowHeight", m), g.value.setGridOption("getRowHeight", () => m), g.value.resetRowHeights();
    }, O = (m) => {
      g.value = m.api, i.value = vn(d.value), De(), ue(), X(), he(), requestAnimationFrame(() => X()), p("grid-ready", m);
    };
    return le(
      () => e.density,
      () => {
        var m;
        ue(), he(), (m = g.value) == null || m.refreshCells({ force: !0 });
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
        ue();
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
      P(), e.autoObserveTheme && (k = new MutationObserver(P), k.observe(document.documentElement, {
        attributes: !0,
        attributeFilter: ["class", "data-theme"]
      })), e.pinnedShadows && d.value && (s = fn(d.value));
    }), et(() => {
      k == null || k.disconnect(), ge(), s == null || s();
    }), (m, D) => (h(), v("div", {
      ref_key: "hostRef",
      ref: d,
      class: T(B.value),
      style: me(y.value)
    }, [
      se(j(bn), Ot(V.value, {
        class: W.value,
        theme: "legacy",
        style: Z.value,
        onGridReady: O
      }), null, 16, ["class", "style"])
    ], 6));
  }
}), ao = ["disabled"], oo = ["onMouseenter", "onClick", "aria-selected"], ro = 320, io = 12, mr = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = A(null), d = A(null), g = A(null), i = A(!1), c = A(-1), k = A(0), s = A(0), w = A(0), M = A(240), C = A(null), B = A(!1), y = _(
      () => e.options.find((O) => O.value === e.modelValue) ?? null
    ), P = _(() => {
      var O;
      return ((O = y.value) == null ? void 0 : O.label) ?? e.placeholder;
    }), q = {
      xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
      sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
      md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
      lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
      xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]"
    }, te = {
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
    }, W = {
      default: "ring-primary/30 border-primary",
      primary: "ring-primary/30 border-primary",
      secondary: "ring-secondary/30 border-secondary",
      accent: "ring-accent/30 border-accent",
      info: "ring-info/30 border-info",
      success: "ring-success/30 border-success",
      warning: "ring-warning/30 border-warning",
      error: "ring-error/30 border-error"
    }, Z = _(() => {
      const O = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150", m = q[e.size], D = e.variant === "outline" ? ne[e.color] : te[e.color], H = e.disabled ? "opacity-60 cursor-not-allowed" : "", I = i.value ? `ring-3 ${W[e.color]}` : "";
      return [O, m, D, H, I].join(" ");
    }), V = {
      xs: "text-xs py-1.5 px-2",
      sm: "text-sm py-1.5 px-2.5",
      md: "text-base py-2 px-3",
      lg: "text-lg py-2 px-3.5",
      xl: "text-xl py-2.5 px-4"
    }, J = _(() => e.color === "default" ? { backgroundColor: "var(--color-base-100)" } : {
      backgroundColor: `color-mix(in oklch, var(--color-${e.color}), white 85%)`
    }), re = (O) => {
      const m = e.color === "default" ? "var(--color-base-content)" : e.color === "secondary" ? "var(--color-secondary-content)" : `var(--color-${e.color})`;
      return e.color === "default" ? {
        color: m,
        backgroundColor: O ? "var(--color-base-200)" : "transparent"
      } : {
        color: m,
        backgroundColor: O ? `color-mix(in oklch, var(--color-${e.color}), white 70%)` : "transparent"
      };
    }, we = _(() => e.color === "default" ? { color: "var(--color-primary)" } : e.color === "secondary" ? { color: "var(--color-secondary-content)" } : { color: `var(--color-${e.color})` }), S = _(() => ({
      top: `${k.value}px`,
      left: `${s.value}px`,
      width: `${w.value}px`
    })), U = _(() => ({
      maxHeight: `${M.value}px`
    })), G = () => {
      if (!i.value || !d.value || !g.value) return;
      const O = d.value.getBoundingClientRect(), m = window.innerWidth, D = window.innerHeight, H = 6, I = io, ie = g.value.scrollHeight || g.value.offsetHeight || 240;
      C.value == null && (C.value = ie);
      const He = C.value, be = D - O.bottom - H - I, Ie = O.top - H - I, Me = be < 180 && Ie > be;
      B.value = Me;
      const Oe = Math.min(ro, He, Math.max(0, Me ? Ie : be));
      M.value = Math.max(64, Oe), w.value = Math.max(160, O.width), s.value = Math.min(
        Math.max(O.left, I),
        m - w.value - I
      ), Me ? k.value = Math.max(I, O.top - H - M.value) : k.value = Math.min(
        D - I - M.value,
        O.bottom + H
      );
    }, X = () => {
      e.disabled || (i.value = !i.value, i.value && (c.value = e.options.findIndex((O) => O.value === e.modelValue), ze(G)));
    }, ge = (O) => {
      O.disabled || (p("update:modelValue", O.value), p("change", O.value), i.value = !1);
    }, De = (O) => {
      if (!e.disabled)
        switch (O.key) {
          case "Enter":
          case " ":
            if (O.preventDefault(), i.value && c.value >= 0) {
              const m = e.options[c.value];
              m && !m.disabled && ge(m);
            } else
              X();
            break;
          case "Escape":
            i.value = !1;
            break;
          case "ArrowDown":
            O.preventDefault(), i.value ? c.value = Math.min(c.value + 1, e.options.length - 1) : (i.value = !0, c.value = 0, ze(G));
            break;
          case "ArrowUp":
            O.preventDefault(), i.value && (c.value = Math.max(c.value - 1, 0));
            break;
        }
    }, ue = (O) => {
      var I, ie;
      const m = O.target, D = !!((I = l.value) != null && I.contains(m)), H = !!((ie = g.value) != null && ie.contains(m));
      !D && !H && (i.value = !1);
    }, he = (O) => {
      var D;
      if (!i.value) return;
      const m = O == null ? void 0 : O.target;
      m && ((D = g.value) != null && D.contains(m)) || G();
    };
    return le(
      () => [i.value, e.options.length],
      async ([O]) => {
        if (!O) {
          C.value = null;
          return;
        }
        await ze(), G();
      }
    ), ct(() => {
      document.addEventListener("click", ue), window.addEventListener("resize", he), window.addEventListener("scroll", he, !0);
    }), et(() => {
      document.removeEventListener("click", ue), window.removeEventListener("resize", he), window.removeEventListener("scroll", he, !0);
    }), (O, m) => (h(), v("div", {
      ref_key: "root",
      ref: l,
      class: "relative"
    }, [
      f("button", {
        ref_key: "triggerRef",
        ref: d,
        type: "button",
        class: T(Z.value),
        disabled: t.disabled,
        onClick: X,
        onKeydown: De
      }, [
        f("span", {
          class: T([y.value ? "" : "opacity-60"])
        }, z(P.value), 3),
        se(xe, {
          name: i.value ? "chevron-up" : "chevron-down",
          class: "w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
        }, null, 8, ["name"])
      ], 42, ao),
      (h(), Ue(ut, { to: "body" }, [
        se(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": B.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            i.value ? (h(), v("div", {
              key: 0,
              ref_key: "menuRef",
              ref: g,
              class: "fixed z-[var(--z-modal)] rounded-box border border-base-300 shadow-lg p-1",
              style: me([J.value, S.value])
            }, [
              f("ul", {
                class: "overflow-auto",
                style: me(U.value),
                role: "listbox"
              }, [
                (h(!0), v(pe, null, _e(t.options, (D, H) => {
                  var I, ie, He;
                  return h(), v("li", {
                    key: D.value,
                    class: T([
                      V[t.size],
                      "flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field",
                      D.disabled ? "opacity-50 cursor-not-allowed" : "",
                      ((I = y.value) == null ? void 0 : I.value) === D.value ? "font-medium" : ""
                    ]),
                    style: me(re(H === c.value)),
                    onMouseenter: (be) => c.value = H,
                    onClick: (be) => D.disabled ? null : ge(D),
                    role: "option",
                    "aria-selected": ((ie = y.value) == null ? void 0 : ie.value) === D.value
                  }, [
                    f("span", null, z(D.label), 1),
                    ((He = y.value) == null ? void 0 : He.value) === D.value ? (h(), Ue(xe, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4",
                      style: me(we.value)
                    }, null, 8, ["style"])) : N("", !0)
                  ], 46, oo);
                }), 128))
              ], 4)
            ], 4)) : N("", !0)
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
}, po = 320, go = 12, wr = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = A(e.modelValue ?? null);
    le(
      () => e.modelValue,
      (m) => l.value = m ?? null
    ), le(l, (m) => p("update:modelValue", m));
    const {
      root: d,
      inputEl: g,
      menu: i,
      open: c,
      query: k,
      hoverIdx: s,
      loading: w,
      filtered: M,
      selected: C,
      openMenu: B,
      closeMenu: y,
      choose: P,
      clear: q,
      onKey: te
    } = mn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), ne = A(null), W = A(null), Z = A(0), V = A(0), J = A(0), re = A(240), we = A(null), S = A(!1), U = {
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
      xl: "input-xl"
    }, G = (m) => !m || m === "default" ? "input" : `input input-${m}`, X = _(
      () => {
        var m;
        return c.value ? k.value : ((m = C.value) == null ? void 0 : m.label) ?? "";
      }
    ), ge = _(() => ({
      top: `${Z.value}px`,
      left: `${V.value}px`,
      width: `${J.value}px`
    })), De = _(() => ({
      maxHeight: `${re.value}px`
    })), ue = () => {
      var Ge, Te;
      if (!c.value || !ne.value) return;
      const m = ne.value.getBoundingClientRect(), D = window.innerWidth, H = window.innerHeight, I = 6, ie = go, He = (((Ge = W.value) == null ? void 0 : Ge.scrollHeight) ?? 0) || (((Te = i.value) == null ? void 0 : Te.scrollHeight) ?? 0) || 240;
      we.value == null && (we.value = He);
      const be = we.value, Ie = H - m.bottom - I - ie, Me = m.top - I - ie, ye = Ie < 180 && Me > Ie;
      S.value = ye;
      const tt = Math.min(po, be, Math.max(0, ye ? Me : Ie));
      re.value = Math.max(64, tt), J.value = Math.max(220, m.width), V.value = Math.min(
        Math.max(m.left, ie),
        D - J.value - ie
      ), ye ? Z.value = Math.max(ie, m.top - I - re.value) : Z.value = Math.min(
        H - ie - re.value,
        m.bottom + I
      );
    }, he = (m) => {
      var H;
      if (!c.value) return;
      const D = m == null ? void 0 : m.target;
      D && ((H = W.value) != null && H.contains(D)) || ue();
    };
    function O() {
      if (!e.disabled) {
        if (c.value) {
          y();
          return;
        }
        B(), ze(ue);
      }
    }
    return le(
      () => [c.value, w.value, M.value.length],
      async ([m]) => {
        m && (await ze(), ue());
      }
    ), le(c, (m) => {
      if (!m) {
        we.value = null;
        return;
      }
      ze(ue);
    }), ct(() => {
      window.addEventListener("resize", he), window.addEventListener("scroll", he, !0);
    }), et(() => {
      window.removeEventListener("resize", he), window.removeEventListener("scroll", he, !0);
    }), (m, D) => (h(), v("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      f("div", {
        ref_key: "triggerRef",
        ref: ne,
        class: "relative"
      }, [
        f("span", so, [
          se(xe, {
            name: "search",
            class: "w-4 h-4"
          })
        ]),
        f("input", {
          ref_key: "inputEl",
          ref: g,
          disabled: t.disabled,
          placeholder: t.placeholder || "Search...",
          value: X.value,
          onFocus: D[0] || (D[0] = //@ts-ignore
          (...H) => j(B) && j(B)(...H)),
          onClick: D[1] || (D[1] = //@ts-ignore
          (...H) => j(B) && j(B)(...H)),
          onKeydown: D[2] || (D[2] = //@ts-ignore
          (...H) => j(te) && j(te)(...H)),
          readonly: !j(c),
          class: T([
            U[t.size || "md"],
            G(t.color),
            "w-full",
            "input",
            t.disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"
          ]),
          style: { "padding-left": "2rem", "padding-right": "4rem" },
          onInput: D[3] || (D[3] = (H) => j(c) ? k.value = H.target.value : null)
        }, null, 42, lo),
        t.clearable && j(C) && !t.disabled ? (h(), v("button", {
          key: 0,
          type: "button",
          class: "absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",
          onClick: D[4] || (D[4] = //@ts-ignore
          (...H) => j(q) && j(q)(...H))
        }, [
          se(xe, {
            name: "x",
            class: "w-4 h-4"
          })
        ])) : N("", !0),
        f("button", {
          type: "button",
          class: "absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",
          onClick: O,
          disabled: t.disabled
        }, [
          se(xe, {
            name: j(c) ? "chevron-up" : "chevron-down",
            class: "w-4 h-4"
          }, null, 8, ["name"])
        ], 8, co)
      ], 512),
      (h(), Ue(ut, { to: "body" }, [
        se(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": S.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            j(c) ? (h(), v("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: W,
              class: "fixed z-[var(--z-modal)] card p-1",
              style: me(ge.value)
            }, [
              j(w) ? (h(), v("div", uo, "Loading...")) : (h(), v("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: me(De.value),
                role: "listbox"
              }, [
                (h(!0), v(pe, null, _e(j(M), (H, I) => {
                  var ie, He;
                  return h(), v("li", {
                    key: H.value,
                    "data-idx": I,
                    class: T([
                      "px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",
                      I === j(s) ? "bg-base-200" : "",
                      H.disabled ? "opacity-50 cursor-not-allowed" : ""
                    ]),
                    onMouseenter: (be) => s.value = I,
                    onMousedown: ke((be) => H.disabled ? null : j(P)(H), ["prevent"]),
                    role: "option",
                    "aria-selected": ((ie = j(C)) == null ? void 0 : ie.value) === H.value
                  }, [
                    f("span", null, z(H.label), 1),
                    ((He = j(C)) == null ? void 0 : He.value) === H.value ? (h(), Ue(xe, {
                      key: 0,
                      name: "check",
                      class: "w-4 h-4 opacity-80"
                    })) : N("", !0)
                  ], 42, fo);
                }), 128)),
                !j(M).length && !j(w) ? (h(), v("li", ho, " No results ")) : N("", !0)
              ], 4))
            ], 4)) : N("", !0)
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
}, $o = { class: "truncate" }, So = {
  key: 0,
  class: "px-3 py-2 text-sm opacity-70"
}, Eo = ["onMousedown"], _o = ["checked"], Ho = {
  key: 0,
  class: "px-2 py-2 text-sm opacity-70"
}, To = 320, jo = 12, Ao = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = A(e.modelValue ?? []);
    le(
      () => e.modelValue,
      (Q) => l.value = Q ?? []
    ), le(l, (Q) => p("update:modelValue", Q));
    const {
      root: d,
      inputEl: g,
      menu: i,
      open: c,
      query: k,
      loading: s,
      filtered: w,
      selectedList: M,
      openMenu: C,
      toggle: B,
      clearAll: y,
      onKey: P
    } = wn(l, {
      options: e.options,
      fetchOptions: e.fetchOptions,
      debounceMs: e.debounceMs
    }), q = A(null), te = A(null), ne = A(0), W = A(0), Z = A(0), V = A(240), J = A(null), re = A(!1), we = {
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
    }, U = {
      xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
      xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
      sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
      md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
      lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" }
    }, G = {
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
    }, ge = {
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
    }, ue = {
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
    }, O = {
      xs: "checkbox checkbox-xs checkbox-primary",
      sm: "checkbox checkbox-sm checkbox-primary",
      md: "checkbox checkbox-sm checkbox-primary",
      lg: "checkbox checkbox-md checkbox-primary",
      xl: "checkbox checkbox-lg checkbox-primary"
    }, m = _(() => e.displayMode ?? "stacked"), D = _(() => m.value === "inline-compact"), H = _(
      () => S[e.size || "md"]
    ), I = _(
      () => U[H.value]
    ), ie = _(
      () => G[H.value]
    ), He = _(() => ({
      top: `${ne.value}px`,
      left: `${W.value}px`,
      width: `${Z.value}px`
    })), be = _(() => ({
      maxHeight: `${V.value}px`
    })), Ie = new Intl.Collator(void 0, { sensitivity: "base", numeric: !0 }), Me = (Q) => l.value.some((Y) => String(Y) === String(Q)), ye = _(() => [...w.value].sort((Q, Y) => {
      const F = Me(Q.value), ve = Me(Y.value);
      return F !== ve ? F ? -1 : 1 : Ie.compare(Q.label, Y.label);
    })), Oe = A(null), tt = A(null), Ge = A([]), Te = A(0);
    let Ne = null;
    const gt = _(
      () => Math.max(0, M.value.length - Te.value)
    );
    function vt(Q, Y) {
      Q && (Ge.value[Y] = Q);
    }
    function mt() {
      var nt, Re, Ze;
      if (!D.value) {
        Te.value = M.value.length;
        return;
      }
      const Q = ((nt = Oe.value) == null ? void 0 : nt.clientWidth) ?? 0, Y = M.value.length;
      if (!Q || Y === 0) {
        Te.value = Y;
        return;
      }
      const F = ((Re = tt.value) == null ? void 0 : Re.offsetWidth) ?? 28, ve = 6;
      let Se = 0, Pe = 0;
      for (let je = 0; je < Y; je += 1) {
        const wt = ((Ze = Ge.value[je]) == null ? void 0 : Ze.offsetWidth) ?? 0, at = Se + (je > 0 ? ve : 0) + wt, rt = Y - (je + 1) > 0 ? ve + F : 0;
        if (at + rt <= Q)
          Se = at, Pe = je + 1;
        else
          break;
      }
      Pe === 0 && Y > 0 && (Pe = 1), Te.value = Pe;
    }
    const Ye = () => {
      var ot, rt;
      if (!c.value || !q.value) return;
      const Q = q.value.getBoundingClientRect(), Y = window.innerWidth, F = window.innerHeight, ve = 6, Se = jo, Pe = (((ot = te.value) == null ? void 0 : ot.scrollHeight) ?? 0) || (((rt = i.value) == null ? void 0 : rt.scrollHeight) ?? 0) || 240;
      J.value == null && (J.value = Pe);
      const nt = J.value, Re = F - Q.bottom - ve - Se, Ze = Q.top - ve - Se, je = Re < 180 && Ze > Re;
      re.value = je;
      const at = Math.min(To, nt, Math.max(0, je ? Ze : Re));
      V.value = Math.max(64, at), Z.value = Math.max(260, Q.width), W.value = Math.min(
        Math.max(Q.left, Se),
        Y - Z.value - Se
      ), je ? ne.value = Math.max(Se, Q.top - ve - V.value) : ne.value = Math.min(
        F - Se - V.value,
        Q.bottom + ve
      );
    }, Ke = (Q) => {
      var F;
      if (!c.value) return;
      const Y = Q == null ? void 0 : Q.target;
      Y && ((F = te.value) != null && F.contains(Y)) || Ye();
    };
    async function qe() {
      await ze(), mt();
    }
    return le(
      () => [M.value.length, e.size, e.displayMode, k.value],
      () => {
        qe();
      },
      { immediate: !0 }
    ), le(ye, () => {
      qe();
    }), le(
      () => [c.value, s.value, ye.value.length],
      async ([Q]) => {
        if (!Q) {
          J.value = null;
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
    }), (Q, Y) => (h(), v("div", {
      ref_key: "root",
      ref: d,
      class: "relative"
    }, [
      f("div", {
        ref_key: "triggerRef",
        ref: q,
        class: T([
          m.value === "inline-compact" ? "relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2" : "relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5",
          we[t.size || "md"],
          t.disabled ? "opacity-60 pointer-events-none" : ""
        ]),
        onClick: Y[10] || (Y[10] = //@ts-ignore
        (...F) => j(C) && j(C)(...F))
      }, [
        m.value === "inline-compact" ? (h(), v(pe, { key: 0 }, [
          f("span", {
            class: T(["opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate", ue[t.size || "md"]])
          }, z(t.placeholder || "Select options..."), 3),
          j(M).length ? (h(), v("div", {
            key: 0,
            ref_key: "chipViewport",
            ref: Oe,
            class: "flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap"
          }, [
            (h(!0), v(pe, null, _e(j(M).slice(0, Te.value), (F) => (h(), v("span", {
              key: F.value,
              class: T(["badge badge-soft-primary gap-1 max-w-[12rem]", X[t.size || "md"]])
            }, [
              f("span", vo, z(F.label), 1),
              f("button", {
                type: "button",
                class: T([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ge[t.size || "md"]
                ]),
                onClick: ke((ve) => j(B)(F.value), ["stop"])
              }, [
                se(xe, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, mo)
            ], 2))), 128)),
            gt.value > 0 ? (h(), v("span", wo, " +" + z(gt.value), 1)) : N("", !0)
          ], 512)) : (h(), v("span", bo)),
          f("span", {
            class: T([
              j(M).length ? "w-[9ch] sm:w-[11ch] shrink-0" : "flex-1 min-w-[8ch]"
            ])
          }, [
            jt(f("input", {
              ref_key: "inputEl",
              ref: g,
              "onUpdate:modelValue": Y[0] || (Y[0] = (F) => Bt(k) ? k.value = F : null),
              class: T([
                "input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none"
              ]),
              style: me(I.value),
              placeholder: "Search...",
              onKeydown: Y[1] || (Y[1] = //@ts-ignore
              (...F) => j(P) && j(P)(...F)),
              onFocus: Y[2] || (Y[2] = (F) => {
                c.value = !0, ze(Ye);
              })
            }, null, 36), [
              [At, j(k)]
            ])
          ], 2),
          f("button", {
            type: "button",
            class: T(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
            onClick: Y[3] || (Y[3] = ke((F) => {
              c.value = !j(c), ze(Ye);
            }, ["stop"]))
          }, [
            se(xe, {
              name: j(c) ? "chevron-up" : "chevron-down",
              class: "w-4 h-4"
            }, null, 8, ["name"])
          ], 2),
          j(M).length ? (h(), v("button", {
            key: 2,
            type: "button",
            class: T(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
            onClick: Y[4] || (Y[4] = ke((F) => j(y)(), ["stop"]))
          }, [
            se(xe, {
              name: "x",
              class: "w-4 h-4"
            })
          ], 2)) : N("", !0)
        ], 64)) : (h(), v(pe, { key: 1 }, [
          j(M).length ? (h(), v("div", yo, [
            (h(!0), v(pe, null, _e(j(M), (F) => (h(), v("span", {
              key: F.value,
              class: T(["badge badge-soft-primary gap-1 max-w-full", X[t.size || "md"]])
            }, [
              f("span", ko, z(F.label), 1),
              f("button", {
                type: "button",
                class: T([
                  "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                  ge[t.size || "md"]
                ]),
                onClick: ke((ve) => j(B)(F.value), ["stop"])
              }, [
                se(xe, {
                  name: "x",
                  class: "w-3 h-3"
                })
              ], 10, xo)
            ], 2))), 128))
          ])) : (h(), v("span", {
            key: 1,
            class: T(["opacity-60 w-full", ue[t.size || "md"]])
          }, z(t.placeholder || "Select options..."), 3)),
          f("div", Mo, [
            f("span", Co, [
              jt(f("input", {
                ref_key: "inputEl",
                ref: g,
                "onUpdate:modelValue": Y[5] || (Y[5] = (F) => Bt(k) ? k.value = F : null),
                class: T([
                  "input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
                ]),
                style: me(ie.value),
                placeholder: "Search...",
                onKeydown: Y[6] || (Y[6] = //@ts-ignore
                (...F) => j(P) && j(P)(...F)),
                onFocus: Y[7] || (Y[7] = (F) => {
                  c.value = !0, ze(Ye);
                })
              }, null, 36), [
                [At, j(k)]
              ])
            ]),
            f("button", {
              type: "button",
              class: T(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
              onClick: Y[8] || (Y[8] = ke((F) => {
                c.value = !j(c), ze(Ye);
              }, ["stop"]))
            }, [
              se(xe, {
                name: j(c) ? "chevron-up" : "chevron-down",
                class: "w-4 h-4"
              }, null, 8, ["name"])
            ], 2),
            j(M).length ? (h(), v("button", {
              key: 0,
              type: "button",
              class: T(["icon-btn icon-btn-outline shrink-0", De[t.size || "md"]]),
              onClick: Y[9] || (Y[9] = ke((F) => j(y)(), ["stop"]))
            }, [
              se(xe, {
                name: "x",
                class: "w-4 h-4"
              })
            ], 2)) : N("", !0)
          ])
        ], 64)),
        D.value ? (h(), v("div", Do, [
          (h(!0), v(pe, null, _e(j(M), (F, ve) => (h(), v("span", {
            key: `measure-${F.value}`,
            ref_for: !0,
            ref: (Se) => vt(Se, ve),
            class: T(["badge badge-soft-primary gap-1 max-w-[12rem]", X[t.size || "md"]])
          }, [
            f("span", $o, z(F.label), 1),
            f("span", {
              class: T([
                "grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent",
                ge[t.size || "md"]
              ])
            }, [
              se(xe, {
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
        ])) : N("", !0)
      ], 2),
      (h(), Ue(ut, { to: "body" }, [
        se(Xe, {
          "enter-active-class": "transition duration-150 ease-out",
          "enter-from-class": re.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]",
          "enter-to-class": "opacity-100 translate-y-0 scale-100",
          "leave-active-class": "transition duration-100 ease-in",
          "leave-from-class": "opacity-100 translate-y-0 scale-100",
          "leave-to-class": re.value ? "opacity-0 translate-y-1 scale-[0.98]" : "opacity-0 -translate-y-1 scale-[0.98]"
        }, {
          default: Qe(() => [
            j(c) ? (h(), v("div", {
              key: 0,
              ref_key: "dropdownRef",
              ref: te,
              class: "fixed z-[var(--z-modal)] card p-2",
              style: me(He.value)
            }, [
              j(s) ? (h(), v("div", So, "Loading...")) : (h(), v("ul", {
                key: 1,
                ref_key: "menu",
                ref: i,
                class: "overflow-auto",
                style: me(be.value)
              }, [
                (h(!0), v(pe, null, _e(ye.value, (F) => (h(), v("li", {
                  key: F.value,
                  class: T([
                    "rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10",
                    he[t.size || "md"],
                    Me(F.value) ? "bg-primary/15" : ""
                  ]),
                  onMousedown: ke((ve) => j(B)(F.value), ["prevent"])
                }, [
                  f("input", {
                    type: "checkbox",
                    class: T([O[t.size || "md"], "pointer-events-none"]),
                    checked: Me(F.value)
                  }, null, 10, _o),
                  f("span", null, z(F.label), 1)
                ], 42, Eo))), 128)),
                !ye.value.length && !j(s) ? (h(), v("li", Ho, " No results ")) : N("", !0)
              ], 4))
            ], 4)) : N("", !0)
          ]),
          _: 1
        }, 8, ["enter-from-class", "leave-to-class"])
      ]))
    ], 512));
  }
}), Lo = (t, o) => {
  const e = t.__vccOpts || t;
  for (const [p, l] of o)
    e[p] = l;
  return e;
}, br = /* @__PURE__ */ Lo(Ao, [["__scopeId", "data-v-66839298"]]), Bo = { class: "font-medium" }, Io = { class: "text-sm opacity-60" }, Fo = {
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
}, yr = /* @__PURE__ */ oe({
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
    const e = t, p = o, l = A(!1), d = A(e.modelValue ?? []), g = A([]), i = (y) => !e.maxFiles || e.maxFiles <= 0 ? y : y.slice(0, e.maxFiles), c = (y) => {
      d.value = i(y), p("update:modelValue", d.value), p("change", d.value);
    }, k = _(() => d.value.map((y) => y.name)), s = _(() => d.value.length > 0), w = () => {
      g.value.forEach((y) => URL.revokeObjectURL(y.url)), g.value = d.value.filter((y) => y.type.startsWith("image/")).map((y, P) => ({
        id: `${y.name}-${y.size}-${y.lastModified}-${P}`,
        name: y.name,
        url: URL.createObjectURL(y)
      }));
    }, M = (y) => {
      const P = y.target, q = Array.from(P.files ?? []);
      q.length && (e.multiple ? c([...d.value, ...q]) : c([q[0]]), P.value = "");
    }, C = (y) => {
      var q;
      if (e.disabled) return;
      l.value = !1;
      const P = Array.from(((q = y.dataTransfer) == null ? void 0 : q.files) ?? []);
      P.length && (e.multiple ? c([...d.value, ...P]) : c([P[0]]));
    }, B = (y) => {
      const P = [...d.value];
      P.splice(y, 1), c(P);
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
      g.value.forEach((y) => URL.revokeObjectURL(y.url));
    }), (y, P) => (h(), v("div", {
      class: T(["space-y-3", e.class])
    }, [
      f("div", {
        class: T(["dropzone", [{ "dropzone-active": l.value }, t.disabled ? "opacity-60 pointer-events-none" : ""]]),
        onDragover: P[0] || (P[0] = ke((q) => l.value = !0, ["prevent"])),
        onDragleave: P[1] || (P[1] = (q) => l.value = !1),
        onDrop: ke(C, ["prevent"])
      }, [
        se(xe, {
          name: "upload",
          class: "w-10 h-10 opacity-50"
        }),
        f("p", Bo, z(t.dropzoneText), 1),
        f("p", Io, z(t.browseText), 1),
        t.helperText ? (h(), v("p", Fo, z(t.helperText), 1)) : N("", !0),
        f("input", {
          type: "file",
          class: "absolute inset-0 opacity-0 cursor-pointer",
          multiple: t.multiple,
          accept: t.accept,
          disabled: t.disabled,
          onChange: M
        }, null, 40, zo)
      ], 34),
      s.value && !g.value.length ? (h(), v("div", Oo, [
        (h(!0), v(pe, null, _e(k.value, (q, te) => (h(), v("div", {
          key: `${q}-${te}`,
          class: "flex items-center justify-between gap-2 p-2 bg-base-100 rounded"
        }, [
          f("span", No, [
            se(xe, {
              name: "file",
              class: "w-4 h-4 shrink-0"
            }),
            f("span", Po, z(q), 1)
          ]),
          f("button", {
            type: "button",
            class: "btn btn-ghost btn-xs btn-circle",
            onClick: (ne) => B(te)
          }, [
            se(xe, {
              name: "x",
              class: "w-3 h-3"
            })
          ], 8, Vo)
        ]))), 128))
      ])) : N("", !0),
      t.preview && g.value.length ? (h(), v("div", Yo, [
        (h(!0), v(pe, null, _e(g.value, (q, te) => (h(), v("div", {
          key: q.id,
          class: "relative aspect-square rounded-lg border border-base-300 overflow-hidden bg-base-100 group"
        }, [
          f("img", {
            src: q.url,
            alt: q.name,
            class: "w-full h-full object-cover"
          }, null, 8, Ro),
          f("button", {
            type: "button",
            class: "absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity",
            onClick: (ne) => B(te)
          }, [
            se(xe, {
              name: "x",
              class: "w-3 h-3 text-white"
            })
          ], 8, Wo)
        ]))), 128))
      ])) : N("", !0),
      s.value ? N("", !0) : (h(), v("p", Uo, z(t.emptyText), 1))
    ], 2));
  }
});
export {
  br as M,
  Zo as _,
  Jo as a,
  Xo as b,
  Qo as c,
  er as d,
  tr as e,
  nr as f,
  Vn as g,
  ar as h,
  or as i,
  rr as j,
  ir as k,
  sr as l,
  lr as m,
  dr as n,
  cr as o,
  ur as p,
  fr as q,
  hr as r,
  xe as s,
  gr as t,
  vr as u,
  mr as v,
  wr as w,
  yr as x,
  Nt as y,
  pr as z
};
