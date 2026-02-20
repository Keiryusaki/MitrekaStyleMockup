<template>
  <header
    class="theme-topbar px-3 sm:px-4 md:px-6 h-14 sm:h-15 flex items-center justify-between glass glass-border sticky top-0 z-[var(--z-topbar)] isolate"
  >
    <div class="flex items-center gap-2 sm:gap-3 z-10">
      <button
        class="md:hidden! btn btn-ghost btn-sm p-2"
        @click="ui.sidebarOpen = !ui.sidebarOpen"
        aria-label="Toggle menu"
      >
        <Icon name="menu" class="w-5 h-5 text-layout-topbar" />
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
      <input class="input input-sm w-48 lg:w-64 hidden md:block" placeholder="Search..." />
      <NotificationDropdown v-model:open="notificationMenuOpen" />

      <button
        class="btn btn-ghost btn-sm text-layout-topbar relative"
        title="What's New"
        @click="whatsNewOpen = true"
      >
        <Icon name="megaphone" class="w-5 h-5" />
        <span
          v-if="showWhatsNewDot"
          class="absolute -top-0.5 -right-0.5 block h-2 w-2 rounded-full bg-warning"
        />
      </button>

      <div ref="themeMenuRef" class="relative">
        <button
          class="btn btn-ghost btn-sm text-layout-topbar"
          title="Theme mode"
          @click.stop="toggleThemeMenu"
        >
          <Icon :name="activeModeIcon" class="w-5 h-5" />
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="themeMenuOpen"
            class="absolute right-0 top-full mt-2 w-60 bg-base-100 text-base-content rounded-lg shadow-xl border border-base-300 p-3 z-[var(--z-topbar-dropdown)]"
            @click.stop
          >
            <div class="theme-mode-pills">
              <button
                class="theme-mode-pill"
                :class="{ 'theme-mode-pill-active': themeMode === 'light' }"
                title="Light"
                @click="setThemeMode('light')"
              >
                <Icon name="sun" class="w-4 h-4" />
              </button>
              <button
                class="theme-mode-pill"
                :class="{ 'theme-mode-pill-active': themeMode === 'system' }"
                title="System"
                @click="setThemeMode('system')"
              >
                <Icon name="sun-moon" class="w-4 h-4" />
              </button>
              <button
                class="theme-mode-pill"
                :class="{ 'theme-mode-pill-active': themeMode === 'dark' }"
                title="Dark"
                @click="setThemeMode('dark')"
              >
                <Icon name="moon" class="w-4 h-4" />
              </button>
            </div>

            <div class="divider my-2"></div>

            <p class="text-[11px] uppercase tracking-wide opacity-60 mb-1">Saved themes</p>
            <div
              v-if="codePresetThemes.length === 0"
              class="text-sm opacity-60 rounded-md border border-dashed border-base-300 px-3 py-2"
            >
              Belum ada preset dari code.
            </div>
            <div v-else class="space-y-1">
              <button
                class="theme-preset-item"
                :class="{ 'theme-preset-item-active': !selectedCodePresetId }"
                @click="clearCodePresetSelection"
              >
                Default Theme
              </button>
              <button
                v-for="preset in codePresetThemes"
                :key="preset.id"
                class="theme-preset-item"
                :class="{ 'theme-preset-item-active': selectedCodePresetId === preset.id }"
                @click="applyCodePreset(preset.id)"
              >
                {{ preset.name }}
              </button>
            </div>
          </div>
        </Transition>
      </div>

      <div ref="appsMenuRef" class="relative">
        <button
          class="btn btn-ghost btn-sm text-layout-topbar"
          title="Apps & account"
          @click.stop="toggleAppsMenu"
        >
          <Icon name="layout" class="w-5 h-5" />
          <Icon name="chevron-down" class="w-4 h-4 opacity-80" />
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 scale-95 -translate-y-1"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-1"
        >
          <div
            v-if="appsMenuOpen"
            class="absolute right-0 top-full mt-2 w-56 bg-base-100 text-base-content rounded-lg shadow-xl border border-base-300 p-2 z-[var(--z-topbar-dropdown)]"
            @click.stop
          >
            <button class="apps-menu-item" @click="openApp('finance')">
              <span class="apps-menu-icon apps-menu-icon-finance">
                <img :src="financeIconUrl" alt="" class="h-4 w-4 object-contain" />
              </span>
              <span>Finance App</span>
            </button>

            <button class="apps-menu-item" @click="openApp('sales')">
              <span class="apps-menu-icon apps-menu-icon-sales">
                <img :src="salesIconUrl" alt="" class="h-4 w-4 object-contain" />
              </span>
              <span>Sales App</span>
            </button>

            <div class="apps-menu-separator"></div>

            <button class="apps-menu-item apps-menu-item-logout mt-1" @click="logout">
              <Icon name="logout" class="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </Transition>
      </div>
    </div>
    <div
      class="absolute inset-0 bg-gradient-to-b from-black/30 via-black/30 via-40% to-black/50"
    ></div>
  </header>

  <WhatsNewGlassModal
    v-model="whatsNewOpen"
    :release-version="RELEASE_VERSION"
    :starter-pack-name="starterPackFilename"
    :starter-pack-version="starterPackVersion"
    :total-components="TOTAL_COMPONENTS"
    @dismissed="markWhatsNewSeen"
  />
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { useUi } from "@/stores/ui";
import logoUrl from "@/assets/logo.png";
import NotificationDropdown from "@/components/nav/NotificationDropdown.vue";
import WhatsNewGlassModal from "@/components/nav/WhatsNewGlassModal.vue";
import { useToast } from "@keiryusaki/mitreka-ui/composables";
import {
  applyThemeOverride,
  clearThemeOverride,
  saveThemeOverride,
} from "@/composables/themeBuilder";
import {
  codeThemePresets,
  getCodeThemePresetById,
} from "@/composables/codeThemePresets";

const ui = useUi();
const toast = useToast();

const THEME_MODE_KEY = "ui-theme-mode-v1";
const CODE_PRESET_KEY = "ui-code-theme-preset-v1";
const RELEASE_VERSION = "2.2.23";
const DEFAULT_STARTER_PACK_FILENAME = "mitreka-design-system-starter-pack-v2.2.22.zip";
const TOTAL_COMPONENTS = 36;
const WHATS_NEW_SEEN_KEY = `ui-whats-new-seen-${RELEASE_VERSION}`;
type ThemeMode = "light" | "system" | "dark";
type StarterPackManifest = {
  latest?: string;
  version?: string;
};

const themeMenuOpen = ref(false);
const themeMenuRef = ref<HTMLElement | null>(null);
const appsMenuOpen = ref(false);
const appsMenuRef = ref<HTMLElement | null>(null);
const notificationMenuOpen = ref(false);
const themeMode = ref<ThemeMode>("system");
const selectedCodePresetId = ref("");
const whatsNewOpen = ref(false);
const showWhatsNewDot = ref(false);
const starterPackFilename = ref(DEFAULT_STARTER_PACK_FILENAME);
const financeIconUrl = `${import.meta.env.BASE_URL}images/finance.png`;
const salesIconUrl = `${import.meta.env.BASE_URL}images/sales.png`;

const codePresetThemes = computed(() => codeThemePresets);
const starterPackVersion = computed(
  () =>
    starterPackFilename.value.match(/-v(\d+\.\d+\.\d+)\.zip$/)?.[1] ?? RELEASE_VERSION
);

const activeModeIcon = computed(() => {
  if (themeMode.value === "light") return "sun";
  if (themeMode.value === "dark") return "moon";
  return "sun-moon";
});

function applyThemeMode(mode: ThemeMode) {
  if (mode === "light") {
    ui.setTheme("mitrekalight");
    return;
  }
  if (mode === "dark") {
    ui.setTheme("mitrekadark");
    return;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  ui.setTheme(prefersDark ? "mitrekadark" : "mitrekalight");
}

function setThemeMode(mode: ThemeMode) {
  themeMode.value = mode;
  localStorage.setItem(THEME_MODE_KEY, mode);
  applyThemeMode(mode);
}

function applyCodePreset(id: string) {
  const preset = getCodeThemePresetById(id);
  if (!preset) return;
  selectedCodePresetId.value = id;
  localStorage.setItem(CODE_PRESET_KEY, id);
  applyThemeOverride(preset.draft);
  saveThemeOverride(preset.draft);
}

function clearCodePresetSelection() {
  selectedCodePresetId.value = "";
  localStorage.removeItem(CODE_PRESET_KEY);
  clearThemeOverride();
}

function handleSystemThemeChange(e: MediaQueryListEvent) {
  if (themeMode.value !== "system") return;
  ui.setTheme(e.matches ? "mitrekadark" : "mitrekalight");
}

function handleClickOutside(e: MouseEvent) {
  if (themeMenuRef.value && !themeMenuRef.value.contains(e.target as Node)) {
    themeMenuOpen.value = false;
  }
  if (appsMenuRef.value && !appsMenuRef.value.contains(e.target as Node)) {
    appsMenuOpen.value = false;
  }
}

function toggleThemeMenu() {
  const nextOpen = !themeMenuOpen.value;
  if (nextOpen) {
    appsMenuOpen.value = false;
    notificationMenuOpen.value = false;
  }
  themeMenuOpen.value = nextOpen;
}

function toggleAppsMenu() {
  const nextOpen = !appsMenuOpen.value;
  if (nextOpen) {
    themeMenuOpen.value = false;
    notificationMenuOpen.value = false;
  }
  appsMenuOpen.value = nextOpen;
}

async function loadStarterPackManifest() {
  try {
    const url = `${import.meta.env.BASE_URL}downloads/starter-pack.json`;
    const response = await fetch(url, { cache: "no-store" });
    if (!response.ok) return;

    const manifest = (await response.json()) as StarterPackManifest;
    const file = manifest.latest?.trim();
    if (!file) return;
    if (!/^mitreka-design-system-starter-pack-v\d+\.\d+\.\d+\.zip$/.test(file)) return;

    starterPackFilename.value = file;
  } catch {
    // Fallback to default starter pack filename.
  }
}

function logout() {
  appsMenuOpen.value = false;
  toast.setToastPosition("top-center");
  toast.notify({ type: "error", message: "Logging out..." });
}

function openApp(target: "finance" | "sales") {
  appsMenuOpen.value = false;
  const appLabel = target === "finance" ? "Finance App" : "Sales App";
  toast.setToastPosition("top-center");
  toast.notify({ type: "info", message: `Opening ${appLabel}...` });
}

watch(notificationMenuOpen, (isOpen) => {
  if (!isOpen) return;
  themeMenuOpen.value = false;
  appsMenuOpen.value = false;
});

function markWhatsNewSeen() {
  showWhatsNewDot.value = false;
  localStorage.setItem(WHATS_NEW_SEEN_KEY, "1");
}

let mediaQuery: MediaQueryList | null = null;

onMounted(() => {
  void loadStarterPackManifest();

  const savedMode = localStorage.getItem(THEME_MODE_KEY) as ThemeMode | null;
  if (savedMode === "light" || savedMode === "system" || savedMode === "dark") {
    themeMode.value = savedMode;
  }
  const savedCodePreset = localStorage.getItem(CODE_PRESET_KEY) || "";
  if (savedCodePreset && getCodeThemePresetById(savedCodePreset)) {
    applyCodePreset(savedCodePreset);
  }

  applyThemeMode(themeMode.value);
  if (!localStorage.getItem(WHATS_NEW_SEEN_KEY)) {
    showWhatsNewDot.value = true;
    setTimeout(() => {
      whatsNewOpen.value = true;
    }, 320);
  }
  mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", handleSystemThemeChange);
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  mediaQuery?.removeEventListener("change", handleSystemThemeChange);
  document.removeEventListener("click", handleClickOutside);
});
</script>

<style scoped>
.theme-mode-pills {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;
  gap: 0.375rem;
  width: 100%;
  padding: 0.25rem;
  border-radius: 0.625rem;
  background: var(--color-base-200);
}

.theme-mode-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 2.25rem;
  border-radius: 0.5rem;
  background: transparent;
  border: none;
  color: color-mix(in srgb, var(--color-base-content) 70%, transparent);
  cursor: pointer;
  transition: background-color 0.15s ease, box-shadow 0.15s ease, color 0.15s ease;
}

.theme-mode-pill:hover {
  background: color-mix(in srgb, var(--color-base-100) 55%, transparent);
  color: var(--color-base-content);
}

.theme-mode-pill-active {
  background: var(--color-base-100);
  color: var(--color-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.theme-preset-item {
  display: inline-flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 2rem;
  padding: 0.375rem 0.625rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  background: transparent;
  color: color-mix(in srgb, var(--color-base-content) 80%, transparent);
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.theme-preset-item:hover {
  background: color-mix(in srgb, var(--color-base-200) 75%, transparent);
  color: var(--color-base-content);
}

.theme-preset-item-active {
  background: var(--color-base-100);
  border-color: color-mix(in srgb, var(--color-primary) 45%, transparent);
  color: var(--color-primary);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);
}

.apps-menu-item {
  display: inline-flex;
  width: 100%;
  align-items: center;
  gap: 0.625rem;
  border: 1px solid transparent;
  border-radius: 0.5rem;
  padding: 0.45rem 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  text-align: left;
  transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
}

.apps-menu-item:hover {
  background: color-mix(in srgb, var(--color-base-200) 75%, transparent);
  border-color: color-mix(in srgb, var(--color-base-300) 65%, transparent);
}

.apps-menu-separator {
  height: 1px;
  margin: 0.5rem 0 0.25rem;
  background: color-mix(in srgb, var(--color-base-content) 14%, transparent);
}

.apps-menu-item-logout:hover {
  color: var(--color-error);
  border-color: color-mix(in srgb, var(--color-error) 28%, transparent);
  background: color-mix(in srgb, var(--color-error) 8%, transparent);
}

.apps-menu-icon {
  display: inline-flex;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.375rem;
  align-items: center;
  justify-content: center;
  color: #fff;
  flex-shrink: 0;
}

.apps-menu-icon img {
  filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.35));
}

.apps-menu-icon-finance {
  background: linear-gradient(180deg, #0b68be 0%, #025097 55%, #013d73 100%);
  border: 1px solid rgba(255, 255, 255, 0.32);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 1px 2px rgba(0, 0, 0, 0.2);
}

.apps-menu-icon-sales {
  background: linear-gradient(180deg, #ff8a2a 0%, #ff6b00 55%, #d95500 100%);
  border: 1px solid rgba(255, 255, 255, 0.32);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.28),
    0 1px 2px rgba(0, 0, 0, 0.2);
}
</style>
