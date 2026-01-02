<template>
  <footer class="border-t border-base-300 bg-base-100 px-4 md:px-6 py-2">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <!-- Left: Branding -->
      <div class="flex items-center gap-3">
        <img 
          src="@/assets/full-vertical-layout-for-light-background.svg" 
          alt="Mitreka" 
          class="h-8 logo-light"
        />
        <img 
          src="@/assets/full-vertical-layout-for-dark-background.svg" 
          alt="Mitreka" 
          class="h-8 logo-dark"
        />
        <div>
          <div class="font-semibold text-sm">Mitreka Design System</div>
          <div class="text-xs opacity-60">by Eka D. Purnama</div>
        </div>
      </div>

      <!-- Right: Info & Links -->
      <div class="flex flex-col sm:items-end gap-1">
        <div class="flex items-center gap-3 text-xs">
          <span class="badge badge-soft-primary badge-sm">v{{ appVersion }}</span>
          <span class="opacity-60">© {{ currentYear }} Mitreka</span>
        </div>
        <div class="flex items-center gap-3 text-xs">
          <a 
            href="https://github.com/Keiryusaki/MitrekaStyleMockup" 
            target="_blank"
            class="opacity-60 hover:opacity-100 hover:text-primary dark:hover:text-accent transition-colors"
          >
            GitHub
          </a>
          <span class="opacity-30">·</span>
          <router-link 
            to="/ChangeLog"
            class="opacity-60 hover:opacity-100 hover:text-primary dark:hover:text-accent transition-colors"
          >
            Changelog
          </router-link>
          <span class="opacity-30">·</span>
          <router-link 
            to="/guide"
            class="opacity-60 hover:opacity-100 hover:text-primary dark:hover:text-accent transition-colors"
          >
            Docs
          </router-link>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { version } from "../../../package.json";

const currentYear = new Date().getFullYear();
const appVersion = version;
</script>

<style scoped>
.logo-light {
  display: block;
}
.logo-dark {
  display: none;
}

:root[data-theme="mitrekadark"] .logo-light {
  display: none;
}
:root[data-theme="mitrekadark"] .logo-dark {
  display: block;
}
</style>
