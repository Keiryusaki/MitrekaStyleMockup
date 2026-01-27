<script setup lang="ts">
import { AvatarGroup as BaseAvatarGroup } from "@keiryusaki/mitreka-ui/vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface Props {
  max?: number;
  size?: Size;
}

withDefaults(defineProps<Props>(), {
  max: 4,
  size: "md",
});
</script>

<template>
  <BaseAvatarGroup :max="max" :size="size">
    <slot />
  </BaseAvatarGroup>
</template>
