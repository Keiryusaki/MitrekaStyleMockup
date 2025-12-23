<script setup lang="ts">
/**
 * SelectDropdown - Custom select dengan smooth dropdown animation
 * Pengganti native <select> untuk solid & outline style
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@/composables/Icon";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color = "default" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
type Variant = "solid" | "outline";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    color?: Color;
    variant?: Variant;
  }>(),
  {
    placeholder: "Choose...",
    disabled: false,
    size: "md",
    color: "default",
    variant: "solid",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
  (e: "change", value: string | number | null): void;
}>();

const root = ref<HTMLElement | null>(null);
const open = ref(false);
const hoverIdx = ref(-1);

// Find selected option
const selected = computed(() =>
  props.options.find((o) => o.value === props.modelValue) ?? null
);

// Display text
const displayText = computed(() => selected.value?.label ?? props.placeholder);

// Size classes
const sizeClasses: Record<Size, string> = {
  xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
  sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
  md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
  lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
  xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]",
};

// Color classes for solid variant
const solidColorClasses: Record<Color, string> = {
  default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
  primary: "bg-primary border-primary text-primary-content hover:brightness-95",
  secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
  accent: "bg-accent border-accent text-accent-content hover:brightness-95",
  info: "bg-info border-info text-info-content hover:brightness-95",
  success: "bg-success border-success text-success-content hover:brightness-95",
  warning: "bg-warning border-warning text-warning-content hover:brightness-95",
  error: "bg-error border-error text-error-content hover:brightness-95",
};

// Color classes for outline variant
const outlineColorClasses: Record<Color, string> = {
  default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
  primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
  secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
  accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
  info: "bg-transparent border-info text-info hover:bg-info/10",
  success: "bg-transparent border-success text-success hover:bg-success/10",
  warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
  error: "bg-transparent border-error text-error hover:bg-error/10",
};

// Focus ring colors based on color prop
const focusRingColors: Record<Color, string> = {
  default: "ring-primary/30 border-primary",
  primary: "ring-primary/30 border-primary",
  secondary: "ring-secondary/30 border-secondary",
  accent: "ring-accent/30 border-accent",
  info: "ring-info/30 border-info",
  success: "ring-success/30 border-success",
  warning: "ring-warning/30 border-warning",
  error: "ring-error/30 border-error",
};

// Combined trigger classes
const triggerClass = computed(() => {
  const base = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150";
  const sizeClass = sizeClasses[props.size];
  const colorClass = props.variant === "outline" 
    ? outlineColorClasses[props.color] 
    : solidColorClasses[props.color];
  const disabledClass = props.disabled ? "opacity-60 cursor-not-allowed" : "";
  const focusClass = open.value 
    ? `ring-3 ${focusRingColors[props.color]}` 
    : "";
  return [base, sizeClass, colorClass, disabledClass, focusClass].join(" ");
});

// Dropdown item size classes
const itemSizeClasses: Record<Size, string> = {
  xs: "text-xs py-1.5 px-2",
  sm: "text-sm py-1.5 px-2.5",
  md: "text-base py-2 px-3",
  lg: "text-lg py-2 px-3.5",
  xl: "text-xl py-2.5 px-4",
};

// Dropdown background (solid soft) based on color
const dropdownBgStyle = computed(() => {
  if (props.color === "default") {
    return { backgroundColor: "var(--color-base-100)" };
  }
  // Use white 85% for solid soft background (not transparent)
  return {
    backgroundColor: `color-mix(in oklch, var(--color-${props.color}), white 85%)`,
  };
});

// Get CSS variable for color
const getColorVar = (color: Color) => {
  if (color === "default") return "var(--color-base-content)";
  return `var(--color-${color})`;
};

// Item style (text color + hover background)
const getItemStyle = (isHovered: boolean) => {
  // Secondary uses secondary-content (dark) because dropdown bg is light
  const textColor = props.color === "default" 
    ? "var(--color-base-content)" 
    : props.color === "secondary"
      ? "var(--color-secondary-content)"
      : `var(--color-${props.color})`;
  
  if (props.color === "default") {
    return {
      color: textColor,
      backgroundColor: isHovered ? "var(--color-base-200)" : "transparent",
    };
  }
  // Hover background sesuai state color - lebih pekat dari dropdown bg (70% white vs 85%)
  return {
    color: textColor,
    backgroundColor: isHovered 
      ? `color-mix(in oklch, var(--color-${props.color}), white 70%)`
      : "transparent",
  };
};

const checkIconStyle = computed(() => {
  if (props.color === "default") return { color: "var(--color-primary)" };
  // Secondary uses secondary-content (dark) because dropdown bg is light
  if (props.color === "secondary") return { color: "var(--color-secondary-content)" };
  return { color: `var(--color-${props.color})` };
});

// Methods
const toggle = () => {
  if (props.disabled) return;
  open.value = !open.value;
  if (open.value) {
    hoverIdx.value = props.options.findIndex((o) => o.value === props.modelValue);
  }
};

const choose = (option: SelectOption) => {
  if (option.disabled) return;
  emit("update:modelValue", option.value);
  emit("change", option.value);
  open.value = false;
};

const onKey = (e: KeyboardEvent) => {
  if (props.disabled) return;
  
  switch (e.key) {
    case "Enter":
    case " ":
      e.preventDefault();
      if (open.value && hoverIdx.value >= 0) {
        const opt = props.options[hoverIdx.value];
        if (opt && !opt.disabled) choose(opt);
      } else {
        toggle();
      }
      break;
    case "Escape":
      open.value = false;
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!open.value) {
        open.value = true;
        hoverIdx.value = 0;
      } else {
        hoverIdx.value = Math.min(hoverIdx.value + 1, props.options.length - 1);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (open.value) {
        hoverIdx.value = Math.max(hoverIdx.value - 1, 0);
      }
      break;
  }
};

// Click outside handler
const onClickOutside = (e: MouseEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
</script>

<template>
  <div ref="root" class="relative">
    <!-- Trigger button -->
    <button
      type="button"
      :class="triggerClass"
      :disabled="disabled"
      @click="toggle"
      @keydown="onKey"
    >
      <span :class="[!selected ? 'opacity-60' : '']">
        {{ displayText }}
      </span>
      <Icon
        :name="open ? 'chevron-up' : 'chevron-down'"
        class="w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1 scale-[0.98]"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
    >
      <div
        v-if="open"
        class="absolute z-50 mt-1 w-full rounded-box border border-base-300 shadow-lg p-1"
        :style="dropdownBgStyle"
      >
        <ul class="max-h-60 overflow-auto" role="listbox">
          <li
            v-for="(opt, i) in options"
            :key="opt.value"
            :class="[
              itemSizeClasses[size],
              'flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field',
              opt.disabled ? 'opacity-50 cursor-not-allowed' : '',
              selected?.value === opt.value ? 'font-medium' : '',
            ]"
            :style="getItemStyle(i === hoverIdx)"
            @mouseenter="hoverIdx = i"
            @click="opt.disabled ? null : choose(opt)"
            role="option"
            :aria-selected="selected?.value === opt.value"
          >
            <span>{{ opt.label }}</span>
            <Icon
              v-if="selected?.value === opt.value"
              name="check"
              class="w-4 h-4"
              :style="checkIconStyle"
            />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
