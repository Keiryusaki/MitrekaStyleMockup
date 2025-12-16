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
      <main class="overflow-y-auto min-h-0 p-4 md:p-6 bg-base-200">
        <Breadcrumbs class="mb-4" />
        <router-view />
      </main>
    </div>

    <Toasts />
  </div>
</template>

<script setup lang="ts">
import Sidebar from "@/components/nav/Sidebar.vue";
import Topbar from "@/components/nav/Topbar.vue";
import Breadcrumbs from "@/components/nav/Breadcrumbs.vue";
import Toasts from "@/components/feedback/Toasts.vue";
import { useUi } from "@/stores/ui";
const ui = useUi();
</script>
