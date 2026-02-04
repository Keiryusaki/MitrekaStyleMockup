import { defineComponent, h, computed, ref, watch } from "vue";
import type { PropType } from "vue";
import { useToast } from "@/composables/useToast";

const simpleWrapper = (name: string, className?: string) =>
  defineComponent({
    name,
    setup(_, { slots }) {
      return () => h("div", { class: className }, slots.default?.());
    },
  });

export const PageHeader = defineComponent({
  name: "PageHeader",
  props: {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    category: { type: String, default: "" },
  },
  setup(props) {
    return () =>
      h("div", { class: "page-header space-y-1" }, [
        props.category
          ? h("div", { class: "text-xs opacity-60" }, props.category)
          : null,
        h("h1", { class: "text-lg font-semibold" }, props.title),
        props.description
          ? h("p", { class: "text-sm opacity-70" }, props.description)
          : null,
      ]);
  },
});

export const Tooltip = defineComponent({
  name: "Tooltip",
  props: {
    text: { type: String, default: "" },
  },
  setup(props, { slots }) {
    return () =>
      h(
        "span",
        { class: "tooltip", title: props.text || undefined },
        slots.default?.()
      );
  },
});

export const ThemeSwitcher = defineComponent({
  name: "ThemeSwitcher",
  setup() {
    return () =>
      h(
        "button",
        { class: "btn btn-ghost btn-sm", type: "button" },
        "Theme"
      );
  },
});

export const Breadcrumbs = simpleWrapper("Breadcrumbs", "breadcrumbs");
export const StatCard = simpleWrapper("StatCard", "stat-card");
export const Card = simpleWrapper("Card", "card");
export const Accordion = simpleWrapper("Accordion", "accordion");
export const AccordionItem = simpleWrapper("AccordionItem", "accordion-item");
export const Collapse = simpleWrapper("Collapse", "collapse");
export const Modal = simpleWrapper("Modal", "modal");

export const Avatar = defineComponent({
  name: "Avatar",
  props: {
    src: { type: String, default: "" },
    alt: { type: String, default: "" },
    size: { type: String, default: "md" },
  },
  setup(props) {
    return () =>
      h("img", {
        class: `avatar avatar-${props.size}`,
        src: props.src || undefined,
        alt: props.alt || "avatar",
      });
  },
});

export const AvatarGroup = defineComponent({
  name: "AvatarGroup",
  setup(_, { slots }) {
    return () => h("div", { class: "avatar-group" }, slots.default?.());
  },
});

export const Pagination = defineComponent({
  name: "Pagination",
  props: {
    page: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
  },
  setup(props) {
    return () =>
      h(
        "div",
        { class: "pagination" },
        `Page ${props.page} of ${props.totalPages}`
      );
  },
});

export const LoadingLogo = defineComponent({
  name: "LoadingLogo",
  props: { text: { type: String, default: "" } },
  setup(props) {
    return () =>
      h("div", { class: "loading-logo" }, props.text || "Loading...");
  },
});

export const Toasts = defineComponent({
  name: "Toasts",
  setup() {
    const toast = useToast();
    return () =>
      h(
        "div",
        { class: `toast-stack ${toast.position.value}` },
        toast.toasts.value.map((t) =>
          h(
            "div",
            {
              key: t.id,
              class: `toast toast-${t.type} toast-${t.variant ?? "soft"}`,
            },
            [
              t.title ? h("div", { class: "font-semibold" }, t.title) : null,
              h("div", { class: "text-sm" }, t.message),
            ]
          )
        )
      );
  },
});

export const DateTimePicker = defineComponent({
  name: "DateTimePicker",
  props: {
    modelValue: {
      type: [String, Array] as PropType<string | string[]>,
      default: "",
    },
    placeholder: { type: String, default: "" },
    inputClass: { type: String, default: "" },
    mode: { type: String, default: "" },
    enableTime: { type: Boolean, default: false },
    noCalendar: { type: Boolean, default: false },
    dateFormat: { type: String, default: "" },
    picker: { type: String, default: "" },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const localValue = ref("");
    const isRange = computed(() => props.mode === "range");

    const formatDisplay = () => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.join(" -> ");
      }
      return props.modelValue ?? "";
    };

    watch(
      () => props.modelValue,
      () => {
        localValue.value = formatDisplay();
      },
      { immediate: true }
    );

    const onInput = (e: Event) => {
      const val = (e.target as HTMLInputElement).value;
      localValue.value = val;
      if (isRange.value) {
        const parts = val
          .split("->")
          .map((p) => p.trim())
          .filter(Boolean);
        emit("update:modelValue", parts);
      } else {
        emit("update:modelValue", val);
      }
    };

    return () =>
      h("input", {
        class: `input w-full ${props.inputClass}`.trim(),
        placeholder: props.placeholder || undefined,
        value: localValue.value,
        onInput,
        type: props.enableTime && props.noCalendar ? "time" : "text",
      });
  },
});
