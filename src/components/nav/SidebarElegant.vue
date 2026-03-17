<script lang="ts">
import { Transition, defineComponent, h } from "vue";
import { Icon } from "@/composables/Icon"; // Import icon
import { useSidebar } from "@/composables/useSidebar"; // Import logic

export default defineComponent({
  name: "SidebarElegant",
  props: {
    collapsed: { type: Boolean, default: false },
  },
  setup(props) {
    // Ambil semua logic & state dari composable
    const { 
      isActive, isGroupOpen, toggleGroup, go, showTip, hideTip,
      searchQuery, filteredNav, setSearchQuery, clearSearch
    } = useSidebar();

    const collapsedFx = (extra = "") =>
      [
        "transition-all duration-200 ease-out overflow-hidden whitespace-nowrap",
        props.collapsed
          ? "max-w-0 opacity-0 -translate-x-1 pointer-events-none"
          : "max-w-[180px] opacity-100 translate-x-0",
        extra,
      ].join(" ");

    const runTransition = (
      target: HTMLElement,
      done: () => void,
      duration = 240
    ) => {
      let finished = false;
      const finish = () => {
        if (finished) return;
        finished = true;
        target.removeEventListener("transitionend", onEnd);
        done();
      };
      const onEnd = (e: Event) => {
        if (e.target === target) finish();
      };
      target.addEventListener("transitionend", onEnd);
      window.setTimeout(finish, duration + 60);
    };

    const submenuTransition = {
      onBeforeEnter(el: Element) {
        const target = el as HTMLElement;
        target.style.overflow = "hidden";
        target.style.height = "0";
        target.style.opacity = "0";
        target.style.transform = "translateY(-4px)";
      },
      onEnter(el: Element, done: () => void) {
        const target = el as HTMLElement;
        target.style.transition =
          "height 240ms ease-out, opacity 180ms ease-out, transform 220ms ease-out";
        requestAnimationFrame(() => {
          target.style.height = `${target.scrollHeight}px`;
          target.style.opacity = "1";
          target.style.transform = "translateY(0)";
        });
        runTransition(target, done, 240);
      },
      onAfterEnter(el: Element) {
        const target = el as HTMLElement;
        target.style.height = "auto";
        target.style.overflow = "";
        target.style.transition = "";
      },
      onBeforeLeave(el: Element) {
        const target = el as HTMLElement;
        target.style.overflow = "hidden";
        target.style.height = `${target.scrollHeight}px`;
        target.style.opacity = "1";
        target.style.transform = "translateY(0)";
      },
      onLeave(el: Element, done: () => void) {
        const target = el as HTMLElement;
        // Force reflow so browsers (especially mobile) always register start state.
        void target.offsetHeight;
        target.style.transition =
          "height 210ms ease-in, opacity 140ms ease-in, transform 200ms ease-in";
        requestAnimationFrame(() => {
          target.style.height = "0";
          target.style.opacity = "0";
          target.style.transform = "translateY(-4px)";
        });
        runTransition(target, done, 210);
      },
      onAfterLeave(el: Element) {
        const target = el as HTMLElement;
        target.style.overflow = "";
        target.style.transition = "";
      },
    };

    // Ini adalah 'return' dari setup() lo yang lama
    return () =>
      h("div", { class: "flex flex-col h-full min-h-0" }, [
        // Header user / brand area (sticky)
        h("div", { class: "px-3 pt-4 pb-3 border-b border-base-300 flex-shrink-0 theme-sidebar" }, [
          h(
            "div",
            {
              class: "flex items-center gap-3",
              onMouseenter: (e: MouseEvent) => showTip(e, "John Doe"),
              onMouseleave: hideTip,
            },
            [
              h("img", {
                class:
                  "w-10 h-10 rounded-full ring-2 ring-base-300 object-cover flex-shrink-0",
                src: "https://avatars.githubusercontent.com/u/9919?s=80&v=4",
                alt: "avatar",
              }),
              h("div", { class: collapsedFx("flex-1 min-w-0") }, [
                h("div", { class: "text-xs opacity-70" }, "Welcome,"),
                h("div", { class: "font-semibold truncate" }, "John Doe"),
              ]),
            ]
          ),
          h(
            "div",
            { class: collapsedFx("mt-4 text-[11px] uppercase tracking-wide opacity-60") },
            "General"
          ),
        ]),

        // Search Input
        h(
          "div",
          {
            class: [
              "border-b border-base-300 flex-shrink-0 transition-all duration-200 ease-out overflow-hidden",
              props.collapsed
                ? "max-h-0 opacity-0 py-0 px-0 -translate-y-1 pointer-events-none border-b-0"
                : "max-h-24 opacity-100 py-2 px-3 translate-y-0",
            ],
          },
          [
            h("div", { class: "relative" }, [
              h("input", {
                type: "text",
                placeholder: "Search menu...",
                value: searchQuery.value,
                class: "w-full h-9 pl-9 pr-8 text-sm rounded-lg border border-base-300 bg-base-100 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary",
                onInput: (e: Event) => setSearchQuery((e.target as HTMLInputElement).value),
                onKeydown: (e: KeyboardEvent) => {
                  if (e.key === "Escape") clearSearch();
                },
              }),
              h(Icon, {
                name: "search",
                class: "absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 opacity-50",
              }),
              searchQuery.value &&
                h(
                  "button",
                  {
                    class: "absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-base-200",
                    onClick: clearSearch,
                  },
                  [h(Icon, { name: "x", class: "w-3 h-3" })]
                ),
            ]),
          ]
        ),

        // NAV (scrollable)
        h(
          "nav",
          { class: "flex flex-col gap-1 p-3 pb-6 flex-1 overflow-y-auto min-h-0" },
          // Gunakan filteredNav dari composable
          filteredNav.value.map((item) => {
            // Item biasa (bukan group)
            if (!item.children) {
              const active = isActive(item);
              return h(
                "div",
                { key: item.id, class: "relative flex-shrink-0" },
                [
                  // Active indicator mark for items without children
                  active &&
                    h("div", {
                      class: "absolute -left-[13px] top-1/2 -translate-y-1/2 w-[4px] h-field rounded-r-full sidebar-active-mark",
                    }),
                  h(
                    "a",
                    {
                      class: [
                        "relative flex items-center h-field rounded-field cursor-pointer",
                        "px-3 border border-transparent",
                        props.collapsed ? "justify-center gap-0 px-2" : "gap-3",
                        active
                          ? "sidebar-item-active sidebar-item-active-border"
                          : "sidebar-hover",
                      ],
                      "aria-current": active ? "page" : undefined,
                      onClick: () => go(item),
                      onMouseenter: (e: MouseEvent) => showTip(e, item.label),
                      onMouseleave: hideTip,
                    },
                    [
                      h(Icon, {
                        name: item.icon || "dot",
                        class: "w-5 h-5",
                      }),
                      h("span", { class: collapsedFx("font-medium") }, item.label),
                    ]
                  ),
                ]
              );
            }

            // group
            const open = isGroupOpen(item);
            const hasActiveChild = item.children?.some((child) => isActive(child)) ?? false;
            return h("div", { key: item.id, class: "flex-shrink-0" }, [
              h(
                "button",
                {
                  class: [
                    "relative w-full flex items-center h-field rounded-field px-3 flex-shrink-0",
                    "border border-transparent",
                    "transition-colors duration-200 ease-out",
                    props.collapsed ? "justify-center gap-0 px-2" : "gap-3",
                    open
                      ? "sidebar-parent-open" // Style Grup Open (soft primary light, soft accent dark)
                      : "sidebar-hover", // Style Grup Closed (hover)
                  ],
                  "aria-expanded": open,
                  onClick: () => toggleGroup(item),
                  onMouseenter: (e: MouseEvent) => showTip(e, item.label),
                  onMouseleave: hideTip,
                },
                [
                  // Active child indicator mark (Discord-style pill) - inside button for correct positioning
                  hasActiveChild &&
                    h("div", {
                      class: "absolute -left-[13px] top-1/2 -translate-y-1/2 w-[4px] h-field rounded-r-full sidebar-active-mark",
                    }),
                  h(Icon, {
                    name: item.icon || "dot",
                    class: "w-5 h-5",
                  }),
                  h(
                    "span",
                    { class: collapsedFx("font-medium flex-1 text-left") },
                    item.label
                  ),
                  h(Icon, {
                    name: "chevron-right",
                    class: [
                      "w-4 h-4 transition-all duration-200",
                      open ? "rotate-90" : "",
                      props.collapsed ? "max-w-0 opacity-0 -translate-x-1" : "max-w-4 opacity-100 translate-x-0",
                    ],
                  }),
                ]
              ),

              // Dropdown children
              h(
                Transition,
                submenuTransition,
                {
                  default: () =>
                    open
                      ? h(
                          "div",
                          {
                            class: [
                              "relative mt-1 overflow-hidden",
                              props.collapsed ? "pl-2" : "pl-5",
                            ],
                          },
                          [
                            h("div", {
                              class: [
                                "absolute left-2 top-2 bottom-2 border-l-2 border-gray-200 transition-opacity duration-200",
                                props.collapsed ? "opacity-0" : "opacity-100",
                              ],
                            }),
                            h(
                              "div",
                              { class: "overflow-hidden flex flex-col gap-1" },
                              item.children!.map((child) => {
                                const active = isActive(child);
                                return h(
                                  "a",
                                  {
                                    key: child.id,
                                    class: [
                                      "relative flex items-center h-field rounded-field cursor-pointer flex-shrink-0",
                                      "border border-transparent",
                                      "pl-3 pr-[.75rem]",
                                      props.collapsed ? "justify-center gap-0 px-2" : "gap-3",
                                      active
                                        ? "sidebar-item-active sidebar-item-active-border" // Style Child Active
                                        : "sidebar-hover", // Style Child Inactive (hover)
                                    ],
                                    "aria-current": active ? "page" : undefined,
                                    onClick: () => go(child),
                                    onMouseenter: (e: MouseEvent) =>
                                      showTip(e, child.label),
                                    onMouseleave: hideTip,
                                  },
                                  [
                                    h(Icon, {
                                      name: "dot",
                                      class: "w-5 h-5",
                                    }),
                                    h("span", { class: collapsedFx("font-medium") }, child.label),
                                  ]
                                );
                              })
                            ),
                          ]
                        )
                      : null,
                }
              ),
            ]);
          })
        ),
      ]);
  },
});
</script>
