<script setup lang="ts">
import { computed } from "vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";
type Resize = "none" | "both" | "vertical" | "horizontal";

const props = withDefaults(
  defineProps<{
    modelValue?: string;
    placeholder?: string;
    rows?: number;
    size?: Size;
    color?: Color;
    disabled?: boolean;
    readonly?: boolean;
    maxlength?: number;
    showCounter?: boolean;
    resize?: Resize;
  }>(),
  {
    modelValue: "",
    placeholder: "",
    rows: 4,
    size: "md",
    color: "default",
    disabled: false,
    readonly: false,
    showCounter: false,
    resize: "none",
  }
);

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

const model = computed({
  get: () => props.modelValue ?? "",
  set: (value: string) => emit("update:modelValue", value),
});

const currentLength = computed(() => model.value.length);

const sizeClass = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const;

const colorClass = computed(() =>
  props.color === "default" ? "input" : `input input-${props.color}`
);
const resizeClass = computed(() => {
  if (props.resize === "vertical") return "resize-y";
  if (props.resize === "horizontal") return "resize-x";
  if (props.resize === "both") return "resize";
  return "resize-none";
});
const textareaStyle = computed(() => ({
  minHeight: `calc(${Math.max(props.rows, 1)} * 1.5em + 1.25rem)`,
}));
</script>

<template>
  <div class="relative w-full">
    <textarea
      v-model="model"
      :rows="rows"
      :disabled="disabled"
      :readonly="readonly"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :style="textareaStyle"
      :class="[
        'w-full textarea-input',
        sizeClass[size],
        colorClass,
        resizeClass,
        showCounter && maxlength ? 'pr-12' : '',
      ]"
    />

    <span
      v-if="showCounter && maxlength"
      class="pointer-events-none absolute bottom-2 right-3 text-[10px] text-neutral/50"
    >
      {{ currentLength }}/{{ maxlength }}
    </span>
  </div>
</template>

<style scoped>
.textarea-input {
  height: auto;
}
</style>
