<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import LoadingLogo from "@/components/feedback/LoadingLogo.vue";

const loading = useLoadingStore();
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="loading.isLoading"
        class="loading-overlay"
        role="status"
        aria-live="polite"
      >
        <LoadingLogo :size="150" :text="loading.message || 'Memuat'" />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: grid;
  place-items: center;
  background: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
