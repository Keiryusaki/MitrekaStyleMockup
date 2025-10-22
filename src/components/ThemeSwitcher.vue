<script setup lang="ts">
import { useTheme } from "@/composables/useTheme";
const { currentTheme, toggleTheme, setTheme } = useTheme();
</script>

<template>
  <div class="inline-flex items-center gap-2">
    <button
      class="btn px-3 py-2 rounded-field border border-base-300 bg-base-100 text-base-content hover:bg-base-200"
      @click="toggleTheme"
    >
      Toggle: {{ currentTheme }}
    </button>

    <select
      class="select rounded-selector border border-base-300 bg-base-100 text-base-content"
      :value="currentTheme"
      @change="setTheme(($event.target as HTMLSelectElement).value as any)"
    >
      <option value="mitrekalight">mitrekalight</option>
      <option value="mitrekadark">mitrekadark</option>
    </select>
  </div>
</template>
