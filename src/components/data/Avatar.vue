<script setup lang="ts">
import { computed, ref } from "vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "busy" | "away";
type Color = "primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info" | "neutral";

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: Size;
  status?: Status;
  color?: Color;
  square?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  alt: "Avatar",
  size: "md",
  color: "primary",
  square: false,
});

const imgError = ref(false);

const showImage = computed(() => props.src && !imgError.value);

const initials = computed(() => {
  if (props.fallback) return props.fallback.slice(0, 2).toUpperCase();
  if (props.alt && props.alt !== "Avatar") {
    return props.alt
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }
  return "?";
});

const sizeClasses = computed(() => {
  const sizes: Record<Size, string> = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-lg",
  };
  return sizes[props.size];
});

const colorClasses = computed(() => {
  const colors: Record<Color, string> = {
    primary: "bg-primary/20 text-primary",
    secondary: "bg-secondary/20 text-secondary",
    accent: "bg-accent/20 text-accent",
    success: "bg-success/20 text-success",
    warning: "bg-warning/20 text-warning",
    error: "bg-error/20 text-error",
    info: "bg-info/20 text-info",
    neutral: "bg-base-300 text-base-content",
  };
  return colors[props.color];
});

const statusClasses = computed(() => {
  if (!props.status) return "";
  const statuses: Record<Status, string> = {
    online: "bg-success",
    offline: "bg-base-300",
    busy: "bg-error",
    away: "bg-warning",
  };
  return statuses[props.status];
});

const statusSize = computed(() => {
  const sizes: Record<Size, string> = {
    xs: "w-1.5 h-1.5",
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
    xl: "w-4 h-4",
  };
  return sizes[props.size];
});

const shapeClass = computed(() => (props.square ? "rounded-lg" : "rounded-full"));

const handleError = () => {
  imgError.value = true;
};
</script>

<template>
  <div class="relative inline-flex shrink-0">
    <!-- Image Avatar -->
    <img
      v-if="showImage"
      :src="src"
      :alt="alt"
      :class="[sizeClasses, shapeClass, 'object-cover']"
      @error="handleError"
    />
    <!-- Fallback Initials -->
    <div
      v-else
      :class="[
        sizeClasses,
        colorClasses,
        shapeClass,
        'flex items-center justify-center font-bold select-none',
      ]"
    >
      {{ initials }}
    </div>
    <!-- Status Indicator -->
    <span
      v-if="status"
      :class="[
        statusClasses,
        statusSize,
        'absolute bottom-0 right-0 rounded-full ring-2 ring-base-100',
      ]"
    ></span>
  </div>
</template>
