<script lang="ts">
import { defineComponent, h, computed, type PropType } from "vue";

// Definisikan semua icon name di sini
type IconName =
  | "home"
  | "users"
  | "settings"
  | "clipboard"
  | "chevron-right"
  | "chevron-left"
  | "dot";

export default defineComponent({
  name: "Icon",
  props: {
    name: { type: String as PropType<IconName>, required: true },
    class: { type: String, default: "w-5 h-5" },
  },
  setup(props) {
    const cls = computed(() => props.class || "w-5 h-5");
    return () => {
      switch (props.name as IconName) {
        case "home":
          return h(
            "svg",
            {
              class: cls.value,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
            },
            [
              h("path", {
                "stroke-width": 1.8,
                d: "m3 11 9-7 9 7v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H3Z",
              }),
            ]
          );
        case "users":
          return h(
            "svg",
            {
              class: cls.value,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
            },
            [
              h("path", {
                "stroke-width": 1.8,
                d: "M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2",
              }),
              h("circle", { cx: 9, cy: 7, r: 4, "stroke-width": 1.8 }),
              h("path", {
                "stroke-width": 1.8,
                d: "M22 21v-2a4 4 0 0 0-3-3.87",
              }),
              h("path", {
                "stroke-width": 1.8,
                d: "M16 3.13a4 4 0 0 1 0 7.75",
              }),
            ]
          );
        case "settings":
          return h(
            "svg",
            {
              class: cls.value,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
            },
            [
              h("path", {
                "stroke-width": 1.8,
                d: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
              }),
              h("path", {
                "stroke-width": 1.8,
                d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V22a2 2 0 1 1-4 0v-.12a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H2a2 2 0 1 1 0-4h.12a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06A2 2 0 1 1 6.07 3.4l.06.06a1.65 1.65 0 0 0 1.82.33h.05A1.65 1.65 0 0 0 9.5 2.3V2a2 2 0 1 1 4 0v.12c0 .66.39 1.26 1 1.51h.05a1.65 1.65 0 0 0 1.82-.33l.06.06A2 2 0 1 1 20.6 6.07l-.06.06a1.65 1.65 0 0 0-.33 1.82v.05c.25.61.85 1 1.51 1H22a2 2 0 1 1 0 4h-.12c-.66 0-1.26.39-1.51 1Z",
              }),
            ]
          );
        case "clipboard":
          return h(
            "svg",
            {
              class: cls.value,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
            },
            [
              h("rect", {
                x: 8,
                y: 2,
                width: 8,
                height: 4,
                rx: 1,
                "stroke-width": 1.8,
              }),
              h("rect", {
                x: 4,
                y: 4,
                width: 16,
                height: 18,
                rx: 2,
                "stroke-width": 1.8,
              }),
              h("path", { "stroke-width": 1.8, d: "M8 10h8M8 14h8" }),
            ]
          );
        case "chevron-right":
          return h(
            "svg",
            {
              class: cls.value,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
            },
            [h("path", { "stroke-width": 2, d: "m9 6 6 6-6 6" })]
          );
        case "chevron-left":
          return h(
            "svg",
            {
              class: cls.value,
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
            },
            [h("path", { "stroke-width": 2, d: "m15 6-6 6 6 6" })]
          );
        case "dot":
        default:
          return h(
            "svg",
            { class: cls.value, viewBox: "0 0 24 24", fill: "currentColor" },
            [h("circle", { cx: 12, cy: 12, r: 3 })]
          );
      }
    };
  },
});
</script>
