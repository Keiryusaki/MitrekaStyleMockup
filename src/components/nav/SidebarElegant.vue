<script lang="ts">
import { defineComponent, h } from "vue";
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

    // Ini adalah 'return' dari setup() lo yang lama
    return () =>
      h("div", { class: "flex flex-col h-full min-h-0" }, [
        // Header user / brand area (sticky)
        h("div", { class: "px-3 pt-4 pb-3 border-b border-base-300 flex-shrink-0 bg-base-100" }, [
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
              !props.collapsed &&
                h("div", { class: "flex-1 min-w-0" }, [
                  h("div", { class: "text-xs opacity-70" }, "Welcome,"),
                  h("div", { class: "font-semibold truncate" }, "John Doe"),
                ]),
            ]
          ),
          !props.collapsed &&
            h(
              "div",
              { class: "mt-4 text-[11px] uppercase tracking-wide opacity-60" },
              "General"
            ),
        ]),

        // Search Input
        !props.collapsed &&
          h("div", { class: "px-3 py-2 border-b border-base-300 flex-shrink-0" }, [
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
          ]),

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
                        "relative flex items-center gap-3 h-field rounded-field cursor-pointer",
                        "px-3 border border-transparent",
                        active
                          ? "bg-primary/10 text-primary dark:text-accent border-l-[5px] border-primary dark:border-accent pl-[10px]"
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
                      !props.collapsed &&
                        h("span", { class: "font-medium" }, item.label),
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
                    "relative w-full flex items-center gap-3 h-field rounded-field px-3 flex-shrink-0",
                    "border border-transparent",
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
                  !props.collapsed &&
                    h(
                      "span",
                      { class: "font-medium flex-1 text-left" },
                      item.label
                    ),
                  !props.collapsed &&
                    h(Icon, {
                      name: "chevron-right",
                      class:
                        "w-4 h-4 transition-transform " +
                        (open ? "rotate-90" : ""),
                    }),
                ]
              ),

              // Dropdown children
              open &&
                h(
                  "div",
                  {
                    class:
                      "relative mt-1 " + (props.collapsed ? "pl-2" : "pl-5"),
                  },
                  [
                    !props.collapsed &&
                      h("div", {
                        class:
                          "absolute left-2 top-2 bottom-2 border-l-2 border-gray-200",
                      }),
                    h(
                      "div",
                      { class: "flex flex-col gap-1" },
                      item.children!.map((child) => {
                        const active = isActive(child);
                        return h(
                          "a",
                          {
                            key: child.id,
                            class: [
                              "relative flex items-center gap-3 h-field rounded-field cursor-pointer flex-shrink-0",
                              "border border-transparent",
                              "pl-3 pr-[.75rem]",
                              active
                                ? "bg-primary/10 text-primary dark:text-accent border-l-[5px] border-primary dark:border-accent pl-[10px]" // Style Child Active
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
                            !props.collapsed &&
                              h("span", { class: "font-medium" }, child.label),
                          ]
                        );
                      })
                    ),
                  ]
                ),
            ]);
          })
        ),
      ]);
  },
});
</script>
