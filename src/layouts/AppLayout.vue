<template>
  <div
    class="h-full bg-base-100 text-base-content grid"
    style="grid-template-rows: auto 1fr"
  >
    <Topbar class="sticky top-0 z-30 bg-base-100/90 glass" />

    <!-- Grid: Sidebar + Main -->
    <div class="grid overflow-hidden min-h-0 grid-cols-1 md:grid-cols-[auto_1fr]">
      <!-- Sidebar (handles mobile drawer + desktop sidebar internally) -->
      <Sidebar />

      <!-- Main Content -->
      <main ref="mainContent" class="overflow-y-auto min-h-0 bg-base-200 flex flex-col">
        <div class="flex-1 p-4 md:p-6">
          <Breadcrumbs v-if="!route.meta.hideBreadcrumbs" class="mb-4" />
          <router-view />
        </div>
        <Footer />
      </main>
    </div>

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import Sidebar from "@/components/nav/Sidebar.vue";
import Topbar from "@/components/nav/Topbar.vue";
import Breadcrumbs from "@/components/nav/Breadcrumbs.vue";
import Toasts from "@/components/feedback/Toasts.vue";
import Footer from "@/components/nav/Footer.vue";
import { useUi } from "@/stores/ui";

const ui = useUi();
const route = useRoute();
const mainContent = ref<HTMLElement | null>(null);

// Scroll ke atas tiap pindah halaman
watch(() => route.path, () => {
  if (mainContent.value) {
    mainContent.value.scrollTo({ top: 0 });
  }
});
</script>
