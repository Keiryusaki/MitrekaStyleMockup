<script setup lang="ts">
import { Tooltip as BaseTooltip } from "@/lib/mitreka-ui-dist/vue";

type Position = "top" | "bottom" | "left" | "right";
type Variant = "auto" | "light" | "dark";

withDefaults(
  defineProps<{
    text: string;
    position?: Position;
    variant?: Variant;
    delay?: number;
  }>(),
  {
    position: "top",
    variant: "auto",
    delay: 200,
  }
);
</script>

<template>
  <BaseTooltip :text="text" :position="position" :variant="variant" :delay="delay">
    <slot />
  </BaseTooltip>
</template>

