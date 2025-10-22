<template>
  <div
    class="h-full bg-base-100 text-base-content grid"
    style="grid-template-rows: auto 1fr"
  >
    <Topbar class="sticky top-0 z-30 bg-base-100/90 glass" />

    <!-- Columns follow sidebar state -->
    <div
      class="grid overflow-hidden min-h-0"
      :style="{
        'grid-template-columns': ui.sidebarCollapsed ? '80px 1fr' : '260px 1fr',
      }"
    >
      <aside
        class="hidden md:block border-r border-base-300 overflow-y-auto min-h-0"
      >
        <Sidebar class="h-full p-3" />
      </aside>

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
