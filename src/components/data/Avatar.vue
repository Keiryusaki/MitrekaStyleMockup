<script setup lang="ts">
import { Avatar as BaseAvatar } from "@keiryusaki/mitreka-ui/vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Status = "online" | "offline" | "busy" | "away";
type Color =
  | "primary"
  | "secondary"
  | "accent"
  | "success"
  | "warning"
  | "error"
  | "info"
  | "neutral";

interface Props {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: Size;
  status?: Status;
  color?: Color;
  square?: boolean;
}

withDefaults(defineProps<Props>(), {
  alt: "Avatar",
  size: "md",
  color: "primary",
  square: false,
});
</script>

<template>
  <BaseAvatar
    :src="src"
    :alt="alt"
    :fallback="fallback"
    :size="size"
    :status="status"
    :color="color"
    :square="square"
  />
</template>
