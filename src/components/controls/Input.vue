<script setup lang="ts">
import { computed, ref, useAttrs } from "vue";
import { Icon } from "@/composables/Icon";

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

const props = withDefaults(
  defineProps<{
    modelValue?: string | number;
    type?: string;
    placeholder?: string;
    size?: Size;
    color?: Color;
    disabled?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    passwordToggle?: boolean;
    prefixIcon?: string;
    suffixIcon?: string;
    addonLeft?: string;
    addonRight?: string;
  }>(),
  {
    modelValue: "",
    type: "text",
    placeholder: "",
    size: "md",
    color: "default",
    disabled: false,
    readonly: false,
    clearable: false,
    passwordToggle: false,
    prefixIcon: "",
    suffixIcon: "",
    addonLeft: "",
    addonRight: "",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string): void;
  (e: "clear"): void;
  (e: "enter"): void;
  (e: "focus", event: FocusEvent): void;
  (e: "blur", event: FocusEvent): void;
}>();

const attrs = useAttrs();
const showPassword = ref(false);

const model = computed(() => String(props.modelValue ?? ""));
const hasValue = computed(() => model.value.length > 0);
const hasPrefixIcon = computed(() => !!props.prefixIcon);
const hasSuffixIcon = computed(() => !!props.suffixIcon);
const hasAddon = computed(() => !!props.addonLeft || !!props.addonRight);

const canShowClear = computed(
  () => props.clearable && hasValue.value && !props.disabled && !props.readonly
);

const canShowPasswordToggle = computed(
  () => props.passwordToggle && props.type === "password" && !props.disabled
);

const resolvedType = computed(() => {
  if (canShowPasswordToggle.value && showPassword.value) return "text";
  return props.type;
});

const sizeClass = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const;

const colorClass = computed(() =>
  props.color === "default" ? "" : `input-${props.color}`
);

const inputClass = computed(() => [
  "input",
  sizeClass[props.size],
  colorClass.value,
  hasPrefixIcon.value ? "mitreka-input-has-prefix" : "",
  hasSuffixIcon.value || canShowClear.value || canShowPasswordToggle.value
    ? "mitreka-input-has-suffix"
    : "",
]);

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};

const clearValue = () => {
  emit("update:modelValue", "");
  emit("clear");
};

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const onKeydown = (event: KeyboardEvent) => {
  if (event.key === "Enter") emit("enter");
};
</script>

<template>
  <div class="mitreka-input-group w-full" :class="hasAddon ? 'mitreka-input-group--with-addon' : ''">
    <span v-if="addonLeft" class="mitreka-input-addon">{{ addonLeft }}</span>

    <div class="mitreka-input-inner w-full">
      <span v-if="hasPrefixIcon" class="mitreka-input-icon mitreka-input-icon--left">
        <Icon :name="prefixIcon" class="w-4 h-4 opacity-70" />
      </span>

      <input
        v-bind="attrs"
        :type="resolvedType"
        :value="model"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :class="inputClass"
        @input="onInput"
        @focus="emit('focus', $event)"
        @blur="emit('blur', $event)"
        @keydown="onKeydown"
      />

      <span v-if="hasSuffixIcon" class="mitreka-input-icon mitreka-input-icon--right">
        <Icon :name="suffixIcon" class="w-4 h-4 opacity-70" />
      </span>

      <button
        v-if="canShowClear"
        type="button"
        class="mitreka-input-action"
        aria-label="Clear input"
        @click="clearValue"
      >
        <Icon name="x" class="w-4 h-4 opacity-70" />
      </button>

      <button
        v-if="canShowPasswordToggle"
        type="button"
        class="mitreka-input-action"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        @click="togglePassword"
      >
        <Icon :name="showPassword ? 'eye-off' : 'eye'" class="w-4 h-4 opacity-70" />
      </button>
    </div>

    <span v-if="addonRight" class="mitreka-input-addon">{{ addonRight }}</span>
  </div>
</template>

<style scoped>
.mitreka-input-group {
  display: flex;
  align-items: stretch;
}

.mitreka-input-inner {
  position: relative;
}

.mitreka-input-group--with-addon :deep(.input) {
  border-radius: 0;
}

.mitreka-input-has-prefix {
  padding-left: 2rem;
}

.mitreka-input-has-suffix {
  padding-right: 2.25rem;
}

.mitreka-input-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: inline-flex;
}

.mitreka-input-icon--left {
  left: 0.625rem;
}

.mitreka-input-icon--right {
  right: 0.625rem;
}

.mitreka-input-action {
  position: absolute;
  right: 0.35rem;
  top: 50%;
  transform: translateY(-50%);
  width: 1.5rem;
  height: 1.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  transition: background-color 0.15s ease;
}

.mitreka-input-action:hover {
  background: color-mix(in oklch, var(--color-base-300), transparent 45%);
}

.mitreka-input-addon {
  display: inline-flex;
  align-items: center;
  padding-inline: 0.75rem;
  font-size: 0.875rem;
  color: color-mix(in oklch, var(--color-base-content), transparent 35%);
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  white-space: nowrap;
}

.mitreka-input-group > .mitreka-input-addon:first-child {
  border-top-left-radius: var(--radius-field-md);
  border-bottom-left-radius: var(--radius-field-md);
  border-right: none;
}

.mitreka-input-group > .mitreka-input-addon:last-child {
  border-top-right-radius: var(--radius-field-md);
  border-bottom-right-radius: var(--radius-field-md);
  border-left: none;
}
</style>
