<script setup lang="ts">
import { computed, useSlots } from "vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
  max?: number;
  size?: Size;
}

const props = withDefaults(defineProps<Props>(), {
  max: 4,
  size: "md",
});

const slots = useSlots();

const totalAvatars = computed(() => {
  const defaultSlot = slots.default?.();
  if (!defaultSlot) return 0;
  return defaultSlot.length;
});

const remainingCount = computed(() => {
  if (totalAvatars.value <= props.max) return 0;
  return totalAvatars.value - props.max;
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

const spacingClass = computed(() => {
  const spacing: Record<Size, string> = {
    xs: "-space-x-2",
    sm: "-space-x-2.5",
    md: "-space-x-3",
    lg: "-space-x-4",
    xl: "-space-x-5",
  };
  return spacing[props.size];
});
</script>

<template>
  <div :class="['avatar-group flex items-center', spacingClass]">
    <template v-for="(_, index) in max" :key="index">
      <template v-if="index < totalAvatars">
        <component :is="slots.default?.()[index]" />
      </template>
    </template>
    <!-- Remaining count -->
    <div
      v-if="remainingCount > 0"
      :class="[
        sizeClasses,
        'flex items-center justify-center rounded-full bg-base-300 text-base-content font-bold ring-2 ring-base-100',
      ]"
    >
      +{{ remainingCount }}
    </div>
  </div>
</template>

<style scoped>
.avatar-group :deep(> *) {
  box-shadow: 0 0 0 2px var(--color-base-100);
  border-radius: 9999px;
}
</style>
