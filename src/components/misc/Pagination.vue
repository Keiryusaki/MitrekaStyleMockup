<template>
  <div class="flex items-center gap-2">
    <button
      class="btn btn-ghost"
      :disabled="page <= 1"
      @click="$emit('change', page - 1)"
    >
      Prev
    </button>
    <span class="px-2">{{ page }} / {{ pages }}</span>
    <button
      class="btn btn-ghost"
      :disabled="page >= pages"
      @click="$emit('change', page + 1)"
    >
      Next
    </button>
  </div>
</template>
<script setup lang="ts">
defineProps<{ page: number; pages: number }>();
</script>
