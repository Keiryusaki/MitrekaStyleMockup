<template>
  <div class="flex items-center gap-1 sm:gap-2">
    <button
      class="btn btn-ghost btn-sm"
      :disabled="page <= 1"
      @click="$emit('change', page - 1)"
    >
      <span class="hidden sm:inline">Prev</span>
      <span class="sm:hidden">&lt;</span>
    </button>
    <span class="px-2 text-xs sm:text-sm">{{ page }} / {{ pages }}</span>
    <button
      class="btn btn-ghost btn-sm"
      :disabled="page >= pages"
      @click="$emit('change', page + 1)"
    >
      <span class="hidden sm:inline">Next</span>
      <span class="sm:hidden">&gt;</span>
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps<{ page: number; pages: number }>();
</script>
