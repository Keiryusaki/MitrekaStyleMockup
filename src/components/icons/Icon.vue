<script setup lang="ts">
import { Icon as BaseIcon } from "@keiryusaki/mitreka-ui/vue";
import type { IconName } from "@/composables/Icon";

const props = withDefaults(
  defineProps<{
    name: IconName | string;
    class?: string;
  }>(),
  {
    class: "w-5 h-5",
  }
);
</script>

<template>
  <BaseIcon :name="props.name" :class="props.class" />
</template>
