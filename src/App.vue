<template>
  <!-- kunci tinggi viewport & matikan scroll di body -->
  <div class="h-dvh overflow-hidden">
    <!-- Kalau route sekarang adalah halaman ticketing public -->
    <Ticketing v-if="isPublicTicket" />

    <!-- Selain itu pakai layout utama -->
    <template v-else>
      <AppLayout />
      <ChatSuggest />
      <LoadingOverlay
        :show="loading.isLoading"
        :message="loading.message"
      />
      <BrandedLoading
        :show="loading.visible"
        :message="loading.message"
        :size="240"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

import AppLayout from "./layouts/AppLayout.vue";
import ChatSuggest from "@/components/ChatSuggest.vue";
import LoadingOverlay from "@/components/LoadingOverlay.vue";
import BrandedLoading from "@/components/BrandedLoading.vue";
import Ticketing from "@/pages/Ticketing/Ticketing.vue";

import { useLoadingStore } from "@/stores/loading";
const loading = useLoadingStore();

// --- detect route ---
const route = useRoute();

// flag buat cek apakah halaman ini ticketing public
const isPublicTicket = computed(() => {
  // opsi 1: pake meta
  if (route.meta.publicTicket) return true;

  // opsi 2: backup via path / name
  if (route.name === "public-ticketing") return true;
  if (route.path === "/ticketing") return true;

  return false;
});
</script>
