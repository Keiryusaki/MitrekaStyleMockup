<template>
  <div class="card p-4 flex items-center gap-4">
    <div class="text-2xl">{{ icon }}</div>
    <div>
      <div class="opacity-70 text-sm">{{ label }}</div>
      <div class="text-xl font-semibold">{{ value }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ icon?: string; label: string; value: string | number }>();
</script>
