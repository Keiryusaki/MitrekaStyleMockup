<template>
  <!-- kunci tinggi viewport & matikan scroll di body -->
  <div class="h-dvh overflow-hidden">
    <AppLayout />
    <ChatSuggest />
    <LoadingOverlay :show="loading.isLoading" :message="loading.message" />
    <BrandedLoading
      :show="loading.visible"
      :message="loading.message"
      :size="240"
    />
  </div>
</template>

<script setup lang="ts">
import AppLayout from "./layouts/AppLayout.vue";
import ChatSuggest from "@/components/ChatSuggest.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import { useLoadingStore } from "@/stores/loading";
const loading = useLoadingStore();
import BrandedLoading from "@/components/BrandedLoading.vue";
</script>
