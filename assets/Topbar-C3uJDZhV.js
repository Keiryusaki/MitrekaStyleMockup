const n=`<template>
  <header
    class="bg-primary text-white px-3 sm:px-4 md:px-6 h-14 sm:h-15 flex items-center justify-between bg-transparent glass glass-border sticky top-0 z-30 isolate"
  >
    <div class="flex items-center gap-2 sm:gap-3 z-10">
      <button
        class="md:hidden! btn btn-ghost btn-sm p-2"
        @click="ui.sidebarOpen = !ui.sidebarOpen"
        aria-label="Toggle menu"
      >
        <Icon name="menu" class="w-5 h-5 text-white" />
      </button>
      <RouterLink to="/" class="flex items-center gap-2">
        <img
          :src="logoUrl"
          alt="Admin Starter"
          class="h-6 sm:h-7 w-auto select-none"
          draggable="false"
        />
        <span class="sr-only">Admin Starter</span>
      </RouterLink>
    </div>
    <div class="flex items-center gap-1 sm:gap-2 z-10">
      <input class="input input-sm w-48 lg:w-64 hidden md:block" placeholder="Search…" />
      <!-- Notification Dropdown -->
      <NotificationDropdown />
      <!-- Toggle theme: icon only -->
      <button
        class="btn btn-ghost btn-sm text-white!"
        :title="\`Switch to \${
          ui.theme === 'mitrekalight' ? 'dark' : 'light'
        } mode\`"
        @click="ui.toggleTheme()"
      >
        <Icon v-if="ui.theme === 'mitrekalight'" name="sun" class="w-5 h-5" />
        <Icon v-else name="moon" class="w-5 h-5" />
      </button>
      <!-- Logout button -->
      <button class="btn btn-ghost btn-sm text-white" @click="logout">
        <Icon name="logout" class="w-5 h-5 text-white!" />
        <span class="hidden sm:inline text-white!">Logout</span>
      </button>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 via-40% to-black/50"
    ></div>
  </header>
</template>
<script setup lang="ts">
import { useUi } from "@/stores/ui";
import logoUrl from "@/assets/logo.png";
import NotificationDropdown from "@/components/nav/NotificationDropdown.vue";
import { useToast } from "@keiryusaki/mitreka-ui/composables";

const ui = useUi();
const toast = useToast();

function logout() {
  // Stub logout; ganti dengan logic auth kamu
  toast.notify({ type: "info", message: "Logging out…" });
}
<\/script>
`;export{n as default};
