<script setup lang="ts">
import { computed } from "vue";
import { iconRegistry, type IconName } from "./icons";

const props = withDefaults(
  defineProps<{
    name: IconName | string;
    class?: string;
  }>(),
  {
    class: "w-5 h-5",
  }
);

const svg = computed(() => {
  const raw = iconRegistry[props.name as IconName] ?? "";
  return raw ? raw.replace("<svg", `<svg class=\"${props.class}\"`) : "";
});
</script>

<template>
  <span class="inline-flex" v-html="svg" />
</template>
