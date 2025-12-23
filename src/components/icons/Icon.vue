<script setup lang="ts">
import { computed } from "vue";
import { icons, type IconName } from "./icons";

const props = withDefaults(
  defineProps<{
    name: IconName | string;
    size?: number | string;
    strokeWidth?: number | string;
  }>(),
  {
    size: 24,
    strokeWidth: 2,
  }
);

const iconDef = computed(() => icons[props.name]);
const sizeValue = computed(() =>
  typeof props.size === "number" ? `${props.size}px` : props.size
);
</script>

<template>
  <svg
    v-if="iconDef"
    :width="sizeValue"
    :height="sizeValue"
    :viewBox="iconDef.viewBox"
    fill="none"
    stroke="currentColor"
    :stroke-width="strokeWidth"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon"
  >
    <circle
      v-for="(circle, i) in iconDef.circles"
      :key="'c' + i"
      :cx="circle.cx"
      :cy="circle.cy"
      :r="circle.r"
    />
    <path v-for="(path, i) in iconDef.paths" :key="'p' + i" :d="path" />
  </svg>
  <span v-else class="icon-fallback">?</span>
</template>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
  flex-shrink: 0;
}
.icon-fallback {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1em;
  height: 1em;
  font-size: inherit;
  opacity: 0.5;
}
</style>
