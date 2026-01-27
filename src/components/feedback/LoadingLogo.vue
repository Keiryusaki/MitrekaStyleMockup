<script setup lang="ts">
import { LoadingLogo as BaseLoadingLogo } from "@keiryusaki/mitreka-ui/vue";

interface Props {
  size?: number;
  text?: string;
}

withDefaults(defineProps<Props>(), {
  size: 80,
  text: "",
});
</script>

<template>
  <BaseLoadingLogo :size="size" :text="text" />
</template>
