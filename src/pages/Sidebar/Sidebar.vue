<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@/components/icons";

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  navData: `// src/components/nav/data/navigation.ts
export type NavItem = {
  id: string;
  label: string;
  icon?: string;
  to?: string;
  children?: NavItem[];
  exact?: boolean;
};

export const NAV: NavItem[] = [
  { id: "dash", label: "Dashboard", icon: "dashboard", to: "/", exact: true },
  { id: "users", label: "Users", icon: "users", to: "/users" },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    children: [
      { id: "general", label: "General", to: "/settings/general" },
      { id: "security", label: "Security", to: "/settings/security" },
    ],
  },
];`,
  layout: `<!-- src/layouts/AdminLayout.vue -->
<` + `script setup>
import Sidebar from "@/components/nav/Sidebar.vue";
import Topbar from "@/components/nav/Topbar.vue";
</` + `script>

<template>
  <div class="flex h-screen overflow-hidden bg-base-200">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Main content area -->
    <div class="flex flex-1 flex-col min-h-0 overflow-hidden">
      <!-- Topbar -->
      <Topbar />

      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <RouterView />
      </main>
    </div>
  </div>
</template>`,
  sidebar: `<!-- src/components/nav/Sidebar.vue -->
<` + `script setup>
import { useUi } from "@/stores/ui";
import SidebarElegant from "@/components/nav/SidebarElegant.vue";

const ui = useUi();
</` + `script>

<template>
  <div class="contents md:h-full">
    <!-- Mobile drawer (overlay) -->
    <div class="md:hidden" v-if="ui.sidebarOpen">
      <div class="fixed inset-0 bg-black/30 z-40" @click="ui.sidebarOpen = false" />
      <aside class="fixed inset-y-0 left-0 z-50 w-72 bg-base-100 border-r border-base-300">
        <SidebarElegant />
      </aside>
    </div>

    <!-- Desktop sidebar -->
    <aside
      class="hidden md:flex flex-col h-full bg-base-100 border-r border-base-300"
      :class="ui.sidebarCollapsed ? 'w-20' : 'w-[264px]'"
    >
      <SidebarElegant :collapsed="ui.sidebarCollapsed" />
    </aside>
  </div>
</template>`,
  topbar: `<!-- src/components/nav/Topbar.vue -->
<` + `script setup>
import { useUi } from "@/stores/ui";
import { Icon } from "@/components/icons";

const ui = useUi();
</` + `script>

<template>
  <header class="h-14 flex items-center justify-between px-4 bg-primary text-white">
    <!-- Left: Menu toggle + Logo -->
    <div class="flex items-center gap-3">
      <button class="md:hidden btn btn-ghost btn-sm" @click="ui.sidebarOpen = !ui.sidebarOpen">
        <Icon name="menu" class="w-5 h-5" />
      </button>
      <RouterLink to="/">
        <img src="@/assets/logo.png" alt="Logo" class="h-7" />
      </RouterLink>
    </div>

    <!-- Right: Actions -->
    <div class="flex items-center gap-2">
      <button class="btn btn-ghost btn-sm" @click="ui.toggleTheme()">
        <Icon :name="ui.theme === 'mitrekalight' ? 'sun' : 'moon'" class="w-5 h-5" />
      </button>
      <button class="btn btn-ghost btn-sm">
        <Icon name="logout" class="w-5 h-5" />
      </button>
    </div>
  </header>
</template>`,
  uiStore: `// src/stores/ui.ts (relevant parts)
import { defineStore } from "pinia";

export const useUi = defineStore("ui", {
  state: () => ({
    sidebarOpen: false,      // Mobile drawer state
    sidebarCollapsed: false, // Desktop collapsed state
    theme: "mitrekalight",
  }),
  actions: {
    toggleSidebarCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    },
    toggleTheme() {
      this.theme = this.theme === "mitrekalight" ? "mitrekadark" : "mitrekalight";
      document.documentElement.setAttribute("data-theme", this.theme);
    },
  },
});`,
};

const downloadFiles = async (filename: string, path: string) => {
  try {
    let fileContent = "";
    if (filename === "Sidebar.vue") {
      fileContent = (await import("@/components/nav/Sidebar.vue?raw")).default;
    } else if (filename === "SidebarElegant.vue") {
      fileContent = (await import("@/components/nav/SidebarElegant.vue?raw")).default;
    } else if (filename === "Topbar.vue") {
      fileContent = (await import("@/components/nav/Topbar.vue?raw")).default;
    } else if (filename === "navigation.ts") {
      fileContent = (await import("@/components/nav/data/navigation.ts?raw")).default;
    }
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <header>
      <h1 class="text-2xl font-bold">Sidebar & Navigation</h1>
      <p class="text-sm opacity-80">
        Komponen navigasi untuk admin layout: Sidebar, Topbar, dan struktur data navigasi.
      </p>
    </header>

    <!-- Download Files -->
    <section class="card p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-semibold">Download Components</h2>
          <p class="text-sm opacity-70">Copy ke project Anda</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-accent btn-sm" @click="downloadFiles('Sidebar.vue', '')">
            Sidebar.vue
          </button>
          <button class="btn btn-accent btn-sm" @click="downloadFiles('SidebarElegant.vue', '')">
            SidebarElegant.vue
          </button>
          <button class="btn btn-accent btn-sm" @click="downloadFiles('Topbar.vue', '')">
            Topbar.vue
          </button>
          <button class="btn btn-accent btn-sm" @click="downloadFiles('navigation.ts', '')">
            navigation.ts
          </button>
        </div>
      </div>
    </section>

    <!-- Preview -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Preview</h2>
      <p class="text-sm opacity-80">
        Layout yang sedang kamu lihat ini menggunakan komponen Sidebar dan Topbar.
      </p>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 bg-base-200 rounded-box">
          <h3 class="font-medium mb-2">Sidebar Features</h3>
          <ul class="list-disc list-inside text-sm space-y-1 opacity-80">
            <li>Collapsible (desktop) - klik tombol panah di pinggir</li>
            <li>Responsive drawer (mobile) - hamburger menu</li>
            <li>Nested menu groups dengan expand/collapse</li>
            <li>Active state indicator</li>
            <li>Icon + label navigation</li>
            <li>Tooltip saat collapsed</li>
          </ul>
        </div>
        <div class="p-4 bg-base-200 rounded-box">
          <h3 class="font-medium mb-2">Topbar Features</h3>
          <ul class="list-disc list-inside text-sm space-y-1 opacity-80">
            <li>Logo dengan link ke home</li>
            <li>Mobile menu toggle button</li>
            <li>Theme switcher (sun/moon icon)</li>
            <li>Search input (desktop only)</li>
            <li>Logout button</li>
            <li>Glass morphism effect</li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Structure Overview -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Structure Overview</h2>

      <div class="code-block">
        <pre><code>src/
├── components/nav/
│   ├── Sidebar.vue          # Wrapper (mobile drawer + desktop)
│   ├── SidebarElegant.vue   # Actual sidebar content
│   ├── Topbar.vue           # Top navigation bar
│   └── data/
│       └── navigation.ts    # Navigation data structure
├── composables/
│   └── useSidebar.ts        # Sidebar logic (active state, etc)
└── stores/
    └── ui.ts                # UI state (sidebarOpen, collapsed, theme)</code></pre>
      </div>
    </section>

    <!-- Navigation Data -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Navigation Data Structure</h2>
      <p class="text-sm opacity-80">
        Definisikan menu navigasi di <code class="code-inline">navigation.ts</code>.
        Support nested children untuk submenu.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.navData, 'navData')">
          {{ copiedId === 'navData' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.navData }}</code></pre>
      </div>
    </section>

    <!-- Layout Usage -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Layout Usage</h2>
      <p class="text-sm opacity-80">
        Contoh penggunaan dalam admin layout.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.layout, 'layout')">
          {{ copiedId === 'layout' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.layout }}</code></pre>
      </div>
    </section>

    <!-- Sidebar Component -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Sidebar Component</h2>
      <p class="text-sm opacity-80">
        Wrapper yang handle responsive behavior: mobile drawer dan desktop collapsible.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.sidebar, 'sidebar')">
          {{ copiedId === 'sidebar' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.sidebar }}</code></pre>
      </div>
    </section>

    <!-- Topbar Component -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Topbar Component</h2>
      <p class="text-sm opacity-80">
        Top navigation bar dengan logo, theme toggle, dan actions.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.topbar, 'topbar')">
          {{ copiedId === 'topbar' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.topbar }}</code></pre>
      </div>
    </section>

    <!-- UI Store -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">UI Store (Pinia)</h2>
      <p class="text-sm opacity-80">
        State management untuk sidebar dan theme menggunakan Pinia.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.uiStore, 'uiStore')">
          {{ copiedId === 'uiStore' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.uiStore }}</code></pre>
      </div>
    </section>

    <!-- NavItem Props -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">NavItem Properties</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Property</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Required</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">id</code></td>
              <td class="px-4 py-2"><code class="code-inline">string</code></td>
              <td class="px-4 py-2">Yes</td>
              <td class="px-4 py-2">Unique identifier untuk item</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">label</code></td>
              <td class="px-4 py-2"><code class="code-inline">string</code></td>
              <td class="px-4 py-2">Yes</td>
              <td class="px-4 py-2">Display text</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">icon</code></td>
              <td class="px-4 py-2"><code class="code-inline">string</code></td>
              <td class="px-4 py-2">No</td>
              <td class="px-4 py-2">Icon name dari icon registry</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">to</code></td>
              <td class="px-4 py-2"><code class="code-inline">string</code></td>
              <td class="px-4 py-2">No*</td>
              <td class="px-4 py-2">Route path (required jika bukan parent)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">children</code></td>
              <td class="px-4 py-2"><code class="code-inline">NavItem[]</code></td>
              <td class="px-4 py-2">No</td>
              <td class="px-4 py-2">Nested submenu items</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">exact</code></td>
              <td class="px-4 py-2"><code class="code-inline">boolean</code></td>
              <td class="px-4 py-2">No</td>
              <td class="px-4 py-2">Exact match untuk active state (default: false)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Tips -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Tips</h2>

      <ul class="list-disc list-inside space-y-2 text-sm opacity-80">
        <li>Gunakan <code class="code-inline">exact: true</code> untuk Dashboard agar tidak selalu active</li>
        <li>Icon menggunakan registry dari <code class="code-inline">@/composables/Icon</code></li>
        <li>Sidebar collapsed state di-persist (opsional tambahkan localStorage)</li>
        <li>Mobile drawer otomatis tutup saat click overlay atau navigasi</li>
        <li>Topbar menggunakan glass morphism - pastikan ada background image atau gradient</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  overflow: hidden;
}
.code-block pre {
  padding: 1rem;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}
.code-block code {
  font-family: ui-monospace, monospace;
}
.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 12px;
  background: var(--color-base-300);
  border: none;
  border-radius: var(--radius-field-sm);
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.15s, background 0.15s;
}
.copy-btn:hover {
  opacity: 1;
  background: var(--color-primary);
  color: var(--color-primary-content);
}
.code-inline {
  background: var(--color-base-200);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, monospace;
}
</style>
