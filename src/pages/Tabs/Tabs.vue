<script setup lang="ts">
 import { ref } from "vue";
 import PageHeader from "@/components/PageHeader.vue";
 import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
 import { Icon } from "@/composables/Icon";
 
 const tocItems: TOCItem[] = [
   { id: "basic", label: "Basic Tabs" },
   { id: "with-icons", label: "With Icons" },
   { id: "pills", label: "Pills Variant" },
   { id: "bordered", label: "Bordered" },
   { id: "vertical", label: "Vertical Tabs" },
   { id: "sizes", label: "Sizes" },
   { id: "disabled", label: "Disabled State" },
 ];
 
 const activeBasic = ref(0);
 const activeIcon = ref(0);
 const activePill = ref(0);
 const activeBordered = ref(0);
 const activeVertical = ref(0);
 
 const basicTabs = [{ label: "Profile" }, { label: "Settings" }, { label: "Messages" }, { label: "Notifications" }];
 const iconTabs = [{ label: "Home", icon: "home" }, { label: "Profile", icon: "user" }, { label: "Settings", icon: "settings" }, { label: "Messages", icon: "mail" }];
 const pillTabs = [{ label: "All" }, { label: "Active" }, { label: "Completed" }, { label: "Archived" }];
 const verticalTabs = [{ label: "General", icon: "settings" }, { label: "Security", icon: "shield" }, { label: "Notifications", icon: "bell" }, { label: "Billing", icon: "creditCard" }];
 
 const copiedId = ref<string | null>(null);
 const copyCode = async (code: string, id: string) => {
   await navigator.clipboard.writeText(code);
   copiedId.value = id;
   setTimeout(() => (copiedId.value = null), 2000);
 };
 
 const codes = {
   basic: `<div class="tabs">
   <button class="tab" :class="{ 'tab-active': active === i }">{{ tab.label }}</button>
 </div>`,
   pills: `<div class="tabs tabs-pills">
   <button class="tab" :class="{ 'tab-active': active === i }">{{ tab.label }}</button>
 </div>`,
 };
 </script>
 
 <template>
   <div class="space-y-8">
     <PageHeader category="Components" title="Tabs" description="Navigasi tab dengan berbagai variant: basic, pills, bordered, vertical, dan dukungan icons." />
 
     <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Tabs</h2>
       <p class="text-sm opacity-70">Tabs dasar dengan underline indicator.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="tabs"><button v-for="(tab, i) in basicTabs" :key="i" class="tab" :class="{ 'tab-active': activeBasic === i }" @click="activeBasic = i">{{ tab.label }}</button></div>
         <div class="p-4 bg-base-100 rounded-lg mt-3"><p class="text-sm opacity-70">Content for: <strong>{{ basicTabs[activeBasic].label }}</strong></p></div>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.basic }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.basic, 'basic')">{{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="with-icons" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Icons</h2>
       <p class="text-sm opacity-70">Tabs dengan icon di samping label.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="tabs"><button v-for="(tab, i) in iconTabs" :key="i" class="tab" :class="{ 'tab-active': activeIcon === i }" @click="activeIcon = i"><Icon :name="tab.icon" class="w-4 h-4" />{{ tab.label }}</button></div>
         <div class="p-4 bg-base-100 rounded-lg mt-3"><p class="text-sm opacity-70">Content for: <strong>{{ iconTabs[activeIcon].label }}</strong></p></div>
       </div>
     </section>
 
     <section id="pills" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Pills Variant</h2>
       <p class="text-sm opacity-70">Tabs dengan background pill untuk active state.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="tabs tabs-pills"><button v-for="(tab, i) in pillTabs" :key="i" class="tab" :class="{ 'tab-active': activePill === i }" @click="activePill = i">{{ tab.label }}</button></div>
         <div class="p-4 bg-base-100 rounded-lg mt-3"><p class="text-sm opacity-70">Showing: <strong>{{ pillTabs[activePill].label }}</strong> items</p></div>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.pills }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.pills, 'pills')">{{ copiedId === 'pills' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="bordered" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Bordered</h2>
       <p class="text-sm opacity-70">Tabs dengan border style, cocok untuk content panel.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="tabs tabs-bordered"><button v-for="(tab, i) in basicTabs" :key="i" class="tab" :class="{ 'tab-active': activeBordered === i }" @click="activeBordered = i">{{ tab.label }}</button></div>
         <div class="p-4 bg-base-100 rounded-lg mt-0 border-t-0 rounded-t-none"><p class="text-sm opacity-70">Content for: <strong>{{ basicTabs[activeBordered].label }}</strong></p></div>
       </div>
     </section>
 
     <section id="vertical" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Vertical Tabs</h2>
       <p class="text-sm opacity-70">Layout vertikal untuk sidebar navigation style.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="flex gap-4">
           <div class="tabs tabs-vertical"><button v-for="(tab, i) in verticalTabs" :key="i" class="tab" :class="{ 'tab-active': activeVertical === i }" @click="activeVertical = i"><Icon :name="tab.icon" class="w-4 h-4" />{{ tab.label }}</button></div>
           <div class="flex-1 p-4 bg-base-100 rounded-lg"><h4 class="font-semibold mb-2">{{ verticalTabs[activeVertical].label }}</h4><p class="text-sm opacity-70">Content panel for {{ verticalTabs[activeVertical].label }} settings.</p></div>
         </div>
       </div>
     </section>
 
     <section id="sizes" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Sizes</h2>
       <p class="text-sm opacity-70">Tersedia dalam 3 ukuran: small, medium (default), dan large.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-4">
         <div><div class="text-xs opacity-70 mb-2">Small (tabs-sm)</div><div class="tabs tabs-sm"><button class="tab tab-active">Tab 1</button><button class="tab">Tab 2</button><button class="tab">Tab 3</button></div></div>
         <div><div class="text-xs opacity-70 mb-2">Medium (default)</div><div class="tabs"><button class="tab tab-active">Tab 1</button><button class="tab">Tab 2</button><button class="tab">Tab 3</button></div></div>
         <div><div class="text-xs opacity-70 mb-2">Large (tabs-lg)</div><div class="tabs tabs-lg"><button class="tab tab-active">Tab 1</button><button class="tab">Tab 2</button><button class="tab">Tab 3</button></div></div>
       </div>
     </section>
 
     <section id="disabled" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Disabled State</h2>
       <p class="text-sm opacity-70">Tab yang tidak bisa diklik dengan class tab-disabled.</p>
       <div class="bg-base-200 rounded-box p-6"><div class="tabs"><button class="tab tab-active">Active</button><button class="tab">Normal</button><button class="tab tab-disabled" disabled>Disabled</button><button class="tab">Normal</button></div></div>
     </section>
 
     <section class="card p-6 space-y-4">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">CSS Classes</h2>
       <div class="overflow-x-auto">
         <table class="min-w-full text-sm"><thead class="bg-base-200"><tr><th class="px-4 py-2 text-left">Class</th><th class="px-4 py-2 text-left">Description</th></tr></thead>
           <tbody class="divide-y divide-base-200">
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tabs</code></td><td class="px-4 py-2">Container untuk tabs</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tab</code></td><td class="px-4 py-2">Individual tab button</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tab-active</code></td><td class="px-4 py-2">Active state</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tabs-pills</code></td><td class="px-4 py-2">Pills variant</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tabs-bordered</code></td><td class="px-4 py-2">Bordered variant</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tabs-vertical</code></td><td class="px-4 py-2">Vertical layout</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.tabs-sm / .tabs-lg</code></td><td class="px-4 py-2">Size variants</td></tr>
           </tbody>
         </table>
       </div>
     </section>
 
     <FloatingTOC :items="tocItems" />
   </div>
 </template>
 
 <style scoped>
 .tabs { display: flex; gap: 0.25rem; border-bottom: 1px solid var(--color-base-300); }
 .tab { display: inline-flex; align-items: center; gap: 0.5rem; padding: 0.625rem 1rem; font-size: 0.875rem; font-weight: 500; color: var(--color-base-content); opacity: 0.7; background: transparent; border: none; border-bottom: 2px solid transparent; margin-bottom: -1px; cursor: pointer; transition: all 0.15s ease; white-space: nowrap; }
 .tab:hover:not(.tab-disabled) { opacity: 1; background: var(--color-base-200); }
 .tab-active { opacity: 1; color: var(--color-primary); border-bottom-color: var(--color-primary); }
 .tab-disabled { opacity: 0.4; cursor: not-allowed; }
 .tabs-pills { border-bottom: none; gap: 0.5rem; background: var(--color-base-300); padding: 0.25rem; border-radius: 0.5rem; width: fit-content; }
 .tabs-pills .tab { border-bottom: none; margin-bottom: 0; border-radius: 0.375rem; padding: 0.5rem 0.875rem; }
 .tabs-pills .tab-active { background: var(--color-base-100); color: var(--color-primary); box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
 .tabs-bordered { border: 1px solid var(--color-base-300); border-bottom: none; border-radius: 0.5rem 0.5rem 0 0; background: var(--color-base-200); }
 .tabs-bordered .tab { border-bottom: none; margin-bottom: 0; border-radius: 0.5rem 0.5rem 0 0; }
 .tabs-bordered .tab-active { background: var(--color-base-100); border: 1px solid var(--color-base-300); border-bottom: 1px solid var(--color-base-100); margin: -1px -1px 0 -1px; }
 .tabs-vertical { flex-direction: column; border-bottom: none; border-right: 1px solid var(--color-base-300); width: 200px; gap: 0.25rem; }
 .tabs-vertical .tab { justify-content: flex-start; border-bottom: none; border-right: 2px solid transparent; margin-bottom: 0; margin-right: -1px; }
 .tabs-vertical .tab-active { border-right-color: var(--color-primary); background: var(--color-base-200); }
 .tabs-sm .tab { padding: 0.375rem 0.75rem; font-size: 0.8125rem; }
 .tabs-lg .tab { padding: 0.875rem 1.25rem; font-size: 1rem; }
 </style>