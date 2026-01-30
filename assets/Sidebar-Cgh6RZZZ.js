import{d as m,r as g,c as y,j as f,a as t,b as p,e as v,y as d,f as r,o as x,z as h}from"./index-DiwQE97j.js";import{_ as k}from"./PageHeader.vue_vue_type_script_setup_true_lang-CzeWLLsV.js";const S={class:"space-y-8"},w={class:"card p-4"},_={class:"flex flex-wrap items-center justify-between gap-4"},C={class:"flex flex-wrap gap-2"},T={class:"card p-6 space-y-4"},I={class:"code-block"},E={class:"card p-6 space-y-4"},D={class:"code-block"},N={class:"card p-6 space-y-4"},L={class:"code-block"},R={class:"card p-6 space-y-4"},U={class:"code-block"},O={class:"card p-6 space-y-4"},A={class:"code-block"},P=m({__name:"Sidebar",setup(V){const i=g(null),l=async(o,a)=>{await navigator.clipboard.writeText(o),i.value=a,setTimeout(()=>i.value=null,2e3)},s={navData:`// src/components/nav/data/navigation.ts
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
];`,layout:`<!-- src/layouts/AdminLayout.vue -->
<script setup>
import Sidebar from "@/components/nav/Sidebar.vue";
import Topbar from "@/components/nav/Topbar.vue";
<\/script>

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
</template>`,sidebar:`<!-- src/components/nav/Sidebar.vue -->
<script setup>
import { useUi } from "@/stores/ui";
import SidebarElegant from "@/components/nav/SidebarElegant.vue";

const ui = useUi();
<\/script>

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
</template>`,topbar:`<!-- src/components/nav/Topbar.vue -->
<script setup>
import { useUi } from "@/stores/ui";
import { Icon } from "@/components/icons";

const ui = useUi();
<\/script>

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
</template>`,uiStore:`// src/stores/ui.ts (relevant parts)
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
});`},c=async(o,a)=>{try{let e="";o==="Sidebar.vue"?e=(await r(async()=>{const{default:n}=await import("./Sidebar-BVt_xQJX.js");return{default:n}},[])).default:o==="SidebarElegant.vue"?e=(await r(async()=>{const{default:n}=await import("./SidebarElegant-B_RZRXxl.js");return{default:n}},[])).default:o==="Topbar.vue"?e=(await r(async()=>{const{default:n}=await import("./Topbar-C3uJDZhV.js");return{default:n}},[])).default:o==="navigation.ts"&&(e=(await r(async()=>{const{default:n}=await import("./navigation-z9Q1-C0T.js");return{default:n}},[])).default);const u=new Blob([e],{type:"text/plain"}),b=document.createElement("a");b.href=URL.createObjectURL(u),b.download=o,b.click(),URL.revokeObjectURL(b.href)}catch(e){console.error("Gagal download file:",e)}};return(o,a)=>(x(),y("div",S,[f(k,{category:"Components",title:"Sidebar & Navigation",description:"Komponen navigasi untuk admin layout: Sidebar, Topbar, dan struktur data navigasi."}),t("section",w,[t("div",_,[a[9]||(a[9]=t("div",null,[t("h2",{class:"font-semibold"},"Download Components"),t("p",{class:"text-sm opacity-70"},"Copy ke project Anda")],-1)),t("div",C,[t("button",{class:"btn btn-accent btn-sm",onClick:a[0]||(a[0]=e=>c("Sidebar.vue"))}," Sidebar.vue "),t("button",{class:"btn btn-accent btn-sm",onClick:a[1]||(a[1]=e=>c("SidebarElegant.vue"))}," SidebarElegant.vue "),t("button",{class:"btn btn-accent btn-sm",onClick:a[2]||(a[2]=e=>c("Topbar.vue"))}," Topbar.vue "),t("button",{class:"btn btn-accent btn-sm",onClick:a[3]||(a[3]=e=>c("navigation.ts"))}," navigation.ts ")])])]),a[20]||(a[20]=p(`<section class="card p-6 space-y-4" data-v-1b1bdac4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-1b1bdac4>Preview</h2><p class="text-sm opacity-80" data-v-1b1bdac4> Layout yang sedang kamu lihat ini menggunakan komponen Sidebar dan Topbar. </p><div class="grid md:grid-cols-2 gap-4" data-v-1b1bdac4><div class="p-4 bg-base-200 rounded-box" data-v-1b1bdac4><h3 class="font-medium mb-2" data-v-1b1bdac4>Sidebar Features</h3><ul class="list-disc list-inside text-sm space-y-1 opacity-80" data-v-1b1bdac4><li data-v-1b1bdac4>Collapsible (desktop) - klik tombol panah di pinggir</li><li data-v-1b1bdac4>Responsive drawer (mobile) - hamburger menu</li><li data-v-1b1bdac4>Nested menu groups dengan expand/collapse</li><li data-v-1b1bdac4>Active state indicator</li><li data-v-1b1bdac4>Icon + label navigation</li><li data-v-1b1bdac4>Tooltip saat collapsed</li></ul></div><div class="p-4 bg-base-200 rounded-box" data-v-1b1bdac4><h3 class="font-medium mb-2" data-v-1b1bdac4>Topbar Features</h3><ul class="list-disc list-inside text-sm space-y-1 opacity-80" data-v-1b1bdac4><li data-v-1b1bdac4>Logo dengan link ke home</li><li data-v-1b1bdac4>Mobile menu toggle button</li><li data-v-1b1bdac4>Theme switcher (sun/moon icon)</li><li data-v-1b1bdac4>Search input (desktop only)</li><li data-v-1b1bdac4>Logout button</li><li data-v-1b1bdac4>Glass morphism effect</li></ul></div></div></section><section class="card p-6 space-y-4" data-v-1b1bdac4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-1b1bdac4>Structure Overview</h2><div class="code-block" data-v-1b1bdac4><pre data-v-1b1bdac4><code data-v-1b1bdac4>src/
├── components/nav/
│   ├── Sidebar.vue          # Wrapper (mobile drawer + desktop)
│   ├── SidebarElegant.vue   # Actual sidebar content
│   ├── Topbar.vue           # Top navigation bar
│   └── data/
│       └── navigation.ts    # Navigation data structure
├── composables/
│   └── useSidebar.ts        # Sidebar logic (active state, etc)
└── stores/
    └── ui.ts                # UI state (sidebarOpen, collapsed, theme)</code></pre></div></section>`,2)),t("section",T,[a[10]||(a[10]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Navigation Data Structure",-1)),a[11]||(a[11]=t("p",{class:"text-sm opacity-80"},[v(" Definisikan menu navigasi di "),t("code",{class:"code-inline"},"navigation.ts"),v(". Support nested children untuk submenu. ")],-1)),t("div",I,[t("button",{class:"copy-btn",onClick:a[4]||(a[4]=e=>l(s.navData,"navData"))},d(i.value==="navData"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,d(s.navData),1)])])]),t("section",E,[a[12]||(a[12]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Layout Usage",-1)),a[13]||(a[13]=t("p",{class:"text-sm opacity-80"}," Contoh penggunaan dalam admin layout. ",-1)),t("div",D,[t("button",{class:"copy-btn",onClick:a[5]||(a[5]=e=>l(s.layout,"layout"))},d(i.value==="layout"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,d(s.layout),1)])])]),t("section",N,[a[14]||(a[14]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Sidebar Component",-1)),a[15]||(a[15]=t("p",{class:"text-sm opacity-80"}," Wrapper yang handle responsive behavior: mobile drawer dan desktop collapsible. ",-1)),t("div",L,[t("button",{class:"copy-btn",onClick:a[6]||(a[6]=e=>l(s.sidebar,"sidebar"))},d(i.value==="sidebar"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,d(s.sidebar),1)])])]),t("section",R,[a[16]||(a[16]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"Topbar Component",-1)),a[17]||(a[17]=t("p",{class:"text-sm opacity-80"}," Top navigation bar dengan logo, theme toggle, dan actions. ",-1)),t("div",U,[t("button",{class:"copy-btn",onClick:a[7]||(a[7]=e=>l(s.topbar,"topbar"))},d(i.value==="topbar"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,d(s.topbar),1)])])]),t("section",O,[a[18]||(a[18]=t("h2",{class:"text-lg font-semibold border-b border-base-300 pb-2"},"UI Store (Pinia)",-1)),a[19]||(a[19]=t("p",{class:"text-sm opacity-80"}," State management untuk sidebar dan theme menggunakan Pinia. ",-1)),t("div",A,[t("button",{class:"copy-btn",onClick:a[8]||(a[8]=e=>l(s.uiStore,"uiStore"))},d(i.value==="uiStore"?"✓ Copied!":"Copy"),1),t("pre",null,[t("code",null,d(s.uiStore),1)])])]),a[21]||(a[21]=p('<section class="card p-6 space-y-4" data-v-1b1bdac4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-1b1bdac4>NavItem Properties</h2><div class="overflow-x-auto" data-v-1b1bdac4><table class="min-w-full text-sm" data-v-1b1bdac4><thead class="bg-base-200" data-v-1b1bdac4><tr data-v-1b1bdac4><th class="px-4 py-2 text-left" data-v-1b1bdac4>Property</th><th class="px-4 py-2 text-left" data-v-1b1bdac4>Type</th><th class="px-4 py-2 text-left" data-v-1b1bdac4>Required</th><th class="px-4 py-2 text-left" data-v-1b1bdac4>Description</th></tr></thead><tbody class="divide-y divide-base-200" data-v-1b1bdac4><tr data-v-1b1bdac4><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>id</code></td><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>string</code></td><td class="px-4 py-2" data-v-1b1bdac4>Yes</td><td class="px-4 py-2" data-v-1b1bdac4>Unique identifier untuk item</td></tr><tr data-v-1b1bdac4><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>label</code></td><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>string</code></td><td class="px-4 py-2" data-v-1b1bdac4>Yes</td><td class="px-4 py-2" data-v-1b1bdac4>Display text</td></tr><tr data-v-1b1bdac4><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>icon</code></td><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>string</code></td><td class="px-4 py-2" data-v-1b1bdac4>No</td><td class="px-4 py-2" data-v-1b1bdac4>Icon name dari icon registry</td></tr><tr data-v-1b1bdac4><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>to</code></td><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>string</code></td><td class="px-4 py-2" data-v-1b1bdac4>No*</td><td class="px-4 py-2" data-v-1b1bdac4>Route path (required jika bukan parent)</td></tr><tr data-v-1b1bdac4><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>children</code></td><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>NavItem[]</code></td><td class="px-4 py-2" data-v-1b1bdac4>No</td><td class="px-4 py-2" data-v-1b1bdac4>Nested submenu items</td></tr><tr data-v-1b1bdac4><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>exact</code></td><td class="px-4 py-2" data-v-1b1bdac4><code class="code-inline" data-v-1b1bdac4>boolean</code></td><td class="px-4 py-2" data-v-1b1bdac4>No</td><td class="px-4 py-2" data-v-1b1bdac4>Exact match untuk active state (default: false)</td></tr></tbody></table></div></section><section class="card p-6 space-y-4" data-v-1b1bdac4><h2 class="text-lg font-semibold border-b border-base-300 pb-2" data-v-1b1bdac4>Tips</h2><ul class="list-disc list-inside space-y-2 text-sm opacity-80" data-v-1b1bdac4><li data-v-1b1bdac4>Gunakan <code class="code-inline" data-v-1b1bdac4>exact: true</code> untuk Dashboard agar tidak selalu active</li><li data-v-1b1bdac4>Icon menggunakan registry dari <code class="code-inline" data-v-1b1bdac4>@/composables/Icon</code></li><li data-v-1b1bdac4>Sidebar collapsed state di-persist (opsional tambahkan localStorage)</li><li data-v-1b1bdac4>Mobile drawer otomatis tutup saat click overlay atau navigasi</li><li data-v-1b1bdac4>Topbar menggunakan glass morphism - pastikan ada background image atau gradient</li></ul></section>',2))]))}}),M=h(P,[["__scopeId","data-v-1b1bdac4"]]);export{M as default};
