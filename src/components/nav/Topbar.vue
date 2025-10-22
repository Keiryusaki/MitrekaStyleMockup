<template>
  <header
    class="px-4 md:px-6 h-15 flex items-center justify-between bg-transparent glass glass-border sticky top-0 z-30 isolate"
  >
    <div class="flex items-center gap-3">
      <button
        class="md:hidden btn btn-ghost"
        @click="ui.sidebarOpen = !ui.sidebarOpen"
      >
        ☰
      </button>
      <strong>Admin Starter</strong>
    </div>
    <div class="flex items-center gap-2">
      <input class="input w-64 hidden md:block" placeholder="Search…" />
      <!-- Toggle theme: icon only -->
      <button
        class="btn btn-ghost"
        :title="`Switch to ${
          ui.theme === 'mitrekalight' ? 'dark' : 'light'
        } mode`"
        @click="ui.toggleTheme()"
      >
        <svg
          v-if="ui.theme === 'mitrekalight'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <path
            fill="currentColor"
            d="M12 18a6 6 0 1 0 0-12a6 6 0 0 0 0 12m0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1m0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1m10 7a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1M4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1m13.657 6.657a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.415 1.414l-.708.707a1 1 0 0 1-1.414 0M4.222 6.343A1 1 0 0 1 5.636 4.93l.707.707A1 1 0 0 1 4.93 7.05zM17 6.343l.707-.707A1 1 0 0 1 19.12 6.05l-.707.707A1 1 0 1 1 17 6.343M5.636 19.07l-.707-.707A1 1 0 0 1 6.05 16.95l.707.707A1 1 0 0 1 5.636 19.07"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-5 h-5"
        >
          <path
            fill="currentColor"
            d="M21 12.79A9 9 0 1 1 11.21 3c.03 0 .06 0 .09.01a1 1 0 0 1 .29 1.93A7 7 0 1 0 19.06 12a1 1 0 0 1 1.94.29Z"
          />
        </svg>
      </button>
      <!-- Logout button -->
      <button class="btn btn-ghost" @click="logout">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          class="w-5 h-5 mr-1"
        >
          <path
            fill="currentColor"
            d="M16 17v-2H9v-2h7V9l5 4zM14 7V5H5v14h9v-2h2v3a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h11a1 1 0 0 1 1 1v3z"
          />
        </svg>
        <span class="hidden sm:inline">Logout</span>
      </button>
    </div>
  </header>
</template>
<script setup lang="ts">
import { useUi } from "@/stores/ui";
const ui = useUi();

function logout() {
  // Stub logout; ganti dengan logic auth kamu
  ui.notify({ type: "info", message: "Logging out…" });
}
</script>
