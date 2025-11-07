<!-- LoadingOverlay.vue kamu bisa diganti ke ini, atau langsung pakai di App.vue -->
<script setup lang="ts">
import { useLoadingStore } from "@/stores/loading";
import BrandedLoading from "@/components/BrandedLoading.vue";
const loading = useLoadingStore();
</script>

<template>
  <BrandedLoading
    :show="loading.isLoading"
    :message="loading.message"
    :size="240"
    :respect-reduced-motion="false"
  />
</template>
