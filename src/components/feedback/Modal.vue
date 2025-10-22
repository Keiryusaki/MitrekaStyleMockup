<template>
  <teleport to="body">
    <div v-if="open" class="fixed inset-0 z-50 grid place-items-center p-4">
      <div class="absolute inset-0 bg-black/40" @click="$emit('close')"></div>
      <div class="relative card p-6 max-w-lg w-full">
        <header class="text-lg font-semibold mb-2">
          <slot name="title">Modal</slot>
        </header>
        <div class="mb-4"><slot /></div>
        <footer class="flex justify-end gap-2">
          <button class="btn btn-ghost" @click="$emit('close')">Cancel</button>
          <button class="btn btn-primary" @click="$emit('confirm')">
            Confirm
          </button>
        </footer>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
defineProps<{ open: boolean }>();
</script>
