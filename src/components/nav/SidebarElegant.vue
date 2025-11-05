<script lang="ts">
import { defineComponent, h } from "vue";
import { NAV } from "@/components/nav/data/navigation"; // Import data
import { Icon } from "@/composables/Icon"; // Import icon
import { useSidebar } from "@/composables/useSidebar"; // Import logic

export default defineComponent({
  name: "SidebarElegant",
  props: {
    collapsed: { type: Boolean, default: false },
  },
  setup(props) {
    // Ambil semua logic & state dari composable
    const { isActive, isGroupOpen, toggleGroup, go, showTip, hideTip } =
      useSidebar();

    // Ini adalah 'return' dari setup() lo yang lama
    return () =>
      h("div", { class: "pb-3" }, [
        // Header user / brand area
        h("div", { class: "px-3 pt-4 pb-3 border-b border-base-300" }, [
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
                  "w-10 h-10 rounded-full ring-2 ring-base-300 object-cover",
                src: "https://avatars.githubusercontent.com/u/9919?s=80&v=4",
                alt: "avatar",
              }),
              !props.collapsed &&
                h("div", [
                  h("div", { class: "text-xs opacity-70" }, "Welcome,"),
                  h("div", { class: "font-semibold" }, "John Doe"),
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

        // NAV
        h(
          "nav",
          { class: "flex flex-col gap-1 p-3" },
          // Gunakan NAV yg udah di-import
          NAV.map((item) => {
            // Item biasa (bukan group)
            if (!item.children) {
              const active = isActive(item);
              return h(
                "a",
                {
                  key: item.id,
                  class: [
                    "relative flex items-center gap-3 h-field rounded-field cursor-pointer",
                    "px-3 border border-transparent",
                    active
                      ? "bg-primary/10 text-primary dark:text-accent border-l-[5px] border-primary dark:border-accent pl-[10px]"
                      : "hover:bg-gray-200/30",
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
              );
            }

            // group
            const open = isGroupOpen(item);
            return h("div", { key: item.id }, [
              h(
                "button",
                {
                  class: [
                    "relative w-full flex items-center gap-3 h-field rounded-field px-3",
                    "border border-transparent",
                    open
                      ? "bg-base-200" // Style Grup Open
                      : "hover:bg-gray-200/50 dark:hover:bg-gray-200/20", // Style Grup Closed (hover)
                  ],
                  "aria-expanded": open,
                  onClick: () => toggleGroup(item),
                  onMouseenter: (e: MouseEvent) => showTip(e, item.label),
                  onMouseleave: hideTip,
                },
                [
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
                              "relative flex items-center gap-3 h-field rounded-field cursor-pointer",
                              "border border-transparent",
                              "pl-3 pr-[.75rem]",
                              active
                                ? "bg-primary/10 text-primary dark:text-accent border-l-[5px] border-primary" // Style Child Active
                                : "hover:bg-gray-200/50 dark:hover:bg-gray-200/20", // Style Child Inactive (hover)
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
