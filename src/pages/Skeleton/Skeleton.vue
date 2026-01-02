<script setup lang="ts">
 import { ref } from "vue";
 import PageHeader from "@/components/PageHeader.vue";
 import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
 
 const tocItems: TOCItem[] = [
   { id: "basic", label: "Basic Skeleton" },
   { id: "shapes", label: "Shapes" },
   { id: "card", label: "Card Skeleton" },
   { id: "list", label: "List Skeleton" },
   { id: "table", label: "Table Skeleton" },
   { id: "toggle", label: "Toggle Demo" },
 ];
 
 const isLoading = ref(true);
 
 const copiedId = ref<string | null>(null);
 const copyCode = async (code: string, id: string) => {
   await navigator.clipboard.writeText(code);
   copiedId.value = id;
   setTimeout(() => (copiedId.value = null), 2000);
 };
 
 const codes = {
   basic: `<div class="skeleton h-4 w-full"></div>
 <div class="skeleton h-4 w-3/4"></div>
 <div class="skeleton h-4 w-1/2"></div>`,
 };
 </script>
 
 <template>
   <div class="space-y-8">
     <PageHeader category="Components" title="Skeleton" description="Placeholder loading yang menunjukkan bentuk konten yang akan datang." />
 
     <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Skeleton</h2>
       <p class="text-sm opacity-70">Skeleton dasar untuk text placeholder.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-3">
         <div class="skeleton h-4 w-full"></div>
         <div class="skeleton h-4 w-3/4"></div>
         <div class="skeleton h-4 w-1/2"></div>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.basic }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.basic, 'basic')">{{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="shapes" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Shapes</h2>
       <p class="text-sm opacity-70">Berbagai bentuk skeleton untuk avatar, thumbnail, dll.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="flex items-center gap-6">
           <div class="text-center"><div class="skeleton w-16 h-16 rounded-full"></div><p class="text-xs opacity-60 mt-2">Circle</p></div>
           <div class="text-center"><div class="skeleton w-16 h-16 rounded"></div><p class="text-xs opacity-60 mt-2">Square</p></div>
           <div class="text-center"><div class="skeleton w-16 h-16 rounded-lg"></div><p class="text-xs opacity-60 mt-2">Rounded</p></div>
           <div class="text-center"><div class="skeleton w-24 h-16 rounded-lg"></div><p class="text-xs opacity-60 mt-2">Rectangle</p></div>
         </div>
       </div>
     </section>
 
     <section id="card" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Card Skeleton</h2>
       <p class="text-sm opacity-70">Skeleton untuk card dengan image, title, dan description.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="grid grid-cols-3 gap-4">
           <div v-for="i in 3" :key="i" class="card bg-base-100 p-4 space-y-3">
             <div class="skeleton h-32 w-full rounded-lg"></div>
             <div class="skeleton h-4 w-3/4"></div>
             <div class="skeleton h-3 w-full"></div>
             <div class="skeleton h-3 w-2/3"></div>
           </div>
         </div>
       </div>
     </section>
 
     <section id="list" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">List Skeleton</h2>
       <p class="text-sm opacity-70">Skeleton untuk list item dengan avatar.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="space-y-4">
           <div v-for="i in 4" :key="i" class="flex items-center gap-4 p-3 bg-base-100 rounded-lg">
             <div class="skeleton w-12 h-12 rounded-full"></div>
             <div class="flex-1 space-y-2">
               <div class="skeleton h-4 w-1/3"></div>
               <div class="skeleton h-3 w-2/3"></div>
             </div>
             <div class="skeleton h-8 w-20 rounded"></div>
           </div>
         </div>
       </div>
     </section>
 
     <section id="table" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Table Skeleton</h2>
       <p class="text-sm opacity-70">Skeleton untuk data table.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="space-y-3">
           <div class="flex gap-4 p-3 bg-base-300 rounded">
             <div class="skeleton h-4 w-1/4"></div>
             <div class="skeleton h-4 w-1/4"></div>
             <div class="skeleton h-4 w-1/4"></div>
             <div class="skeleton h-4 w-1/4"></div>
           </div>
           <div v-for="i in 5" :key="i" class="flex gap-4 p-3 bg-base-100 rounded">
             <div class="skeleton h-4 w-1/4"></div>
             <div class="skeleton h-4 w-1/4"></div>
             <div class="skeleton h-4 w-1/4"></div>
             <div class="skeleton h-4 w-1/4"></div>
           </div>
         </div>
       </div>
     </section>
 
     <section id="toggle" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Toggle Demo</h2>
       <p class="text-sm opacity-70">Toggle antara loading state dan loaded content.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="flex items-center gap-3 mb-4">
           <input type="checkbox" class="toggle toggle-primary" v-model="isLoading" />
           <span class="text-sm">{{ isLoading ? 'Loading...' : 'Loaded' }}</span>
         </div>
         <div class="p-4 bg-base-100 rounded-lg">
           <template v-if="isLoading">
             <div class="flex items-center gap-4">
               <div class="skeleton w-16 h-16 rounded-full"></div>
               <div class="flex-1 space-y-2"><div class="skeleton h-5 w-1/3"></div><div class="skeleton h-4 w-2/3"></div></div>
             </div>
           </template>
           <template v-else>
             <div class="flex items-center gap-4">
               <div class="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-xl font-bold">JD</div>
               <div><h3 class="font-semibold text-lg">John Doe</h3><p class="text-sm opacity-70">john.doe@example.com</p></div>
             </div>
           </template>
         </div>
       </div>
     </section>
 
     <section class="card p-6 space-y-4">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">CSS Classes</h2>
       <div class="overflow-x-auto">
         <table class="min-w-full text-sm"><thead class="bg-base-200"><tr><th class="px-4 py-2 text-left">Class</th><th class="px-4 py-2 text-left">Description</th></tr></thead>
           <tbody class="divide-y divide-base-200">
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.skeleton</code></td><td class="px-4 py-2">Base skeleton dengan animasi</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.rounded-full</code></td><td class="px-4 py-2">Circle shape</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.rounded-lg</code></td><td class="px-4 py-2">Rounded rectangle</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.h-* .w-*</code></td><td class="px-4 py-2">Height dan width utilities</td></tr>
           </tbody>
         </table>
       </div>
     </section>
 
     <FloatingTOC :items="tocItems" />
   </div>
 </template>
 
 <style scoped>
 .skeleton { background: linear-gradient(90deg, var(--color-base-300) 25%, var(--color-base-200) 50%, var(--color-base-300) 75%); background-size: 200% 100%; animation: skeleton-loading 1.5s infinite; }
 @keyframes skeleton-loading { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
 .toggle { appearance: none; width: 3rem; height: 1.5rem; background: var(--color-base-300); border-radius: 9999px; position: relative; cursor: pointer; transition: background 0.2s; }
 .toggle::before { content: ''; position: absolute; top: 2px; left: 2px; width: 1.25rem; height: 1.25rem; background: white; border-radius: 9999px; transition: transform 0.2s; }
 .toggle:checked { background: var(--color-primary); }
 .toggle:checked::before { transform: translateX(1.5rem); }
 </style>