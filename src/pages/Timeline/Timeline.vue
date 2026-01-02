<script setup lang="ts">
 import { ref } from "vue";
 import PageHeader from "@/components/PageHeader.vue";
 import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
 import { Icon } from "@/composables/Icon";
 
 const tocItems: TOCItem[] = [
   { id: "basic", label: "Basic Timeline" },
   { id: "with-icons", label: "With Icons" },
   { id: "alternating", label: "Alternating" },
   { id: "compact", label: "Compact" },
   { id: "activity", label: "Activity Feed" },
 ];
 
 const copiedId = ref<string | null>(null);
 const copyCode = async (code: string, id: string) => {
   await navigator.clipboard.writeText(code);
   copiedId.value = id;
   setTimeout(() => (copiedId.value = null), 2000);
 };
 
 const codes = {
   basic: `<ul class="timeline">
   <li class="timeline-item">
     <div class="timeline-marker"></div>
     <div class="timeline-content">
       <h4>Event Title</h4>
       <p>Event description</p>
     </div>
   </li>
 </ul>`,
 };
 
 const activities = [
   { user: "John Doe", action: "created a new task", time: "2 hours ago", icon: "plus", color: "text-primary" },
   { user: "Jane Smith", action: "commented on issue #123", time: "4 hours ago", icon: "chat", color: "text-info" },
   { user: "Bob Wilson", action: "completed task", time: "6 hours ago", icon: "check", color: "text-success" },
   { user: "Alice Brown", action: "uploaded 3 files", time: "1 day ago", icon: "upload", color: "text-warning" },
 ];
 </script>
 
 <template>
   <div class="space-y-8">
     <PageHeader category="Components" title="Timeline" description="Timeline untuk menampilkan urutan event atau history secara kronologis." />
 
     <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Timeline</h2>
       <p class="text-sm opacity-70">Timeline dasar dengan marker dan content.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="timeline">
           <li class="timeline-item">
             <div class="timeline-marker"></div>
             <div class="timeline-content"><h4 class="font-semibold">Project Started</h4><p class="text-sm opacity-70">January 1, 2026</p><p class="text-sm mt-1">Initial project setup and planning phase completed.</p></div>
           </li>
           <li class="timeline-item">
             <div class="timeline-marker"></div>
             <div class="timeline-content"><h4 class="font-semibold">Design Phase</h4><p class="text-sm opacity-70">January 15, 2026</p><p class="text-sm mt-1">UI/UX design mockups approved by stakeholders.</p></div>
           </li>
           <li class="timeline-item">
             <div class="timeline-marker"></div>
             <div class="timeline-content"><h4 class="font-semibold">Development</h4><p class="text-sm opacity-70">February 1, 2026</p><p class="text-sm mt-1">Core features implementation in progress.</p></div>
           </li>
         </ul>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.basic }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.basic, 'basic')">{{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="with-icons" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Icons</h2>
       <p class="text-sm opacity-70">Timeline dengan icon berwarna untuk membedakan tipe event.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="timeline">
           <li class="timeline-item">
             <div class="timeline-marker bg-success text-white"><Icon name="check" class="w-3 h-3" /></div>
             <div class="timeline-content"><h4 class="font-semibold text-success">Order Confirmed</h4><p class="text-sm opacity-70">Dec 28, 10:30 AM</p></div>
           </li>
           <li class="timeline-item">
             <div class="timeline-marker bg-info text-white"><Icon name="box" class="w-3 h-3" /></div>
             <div class="timeline-content"><h4 class="font-semibold text-info">Shipped</h4><p class="text-sm opacity-70">Dec 29, 2:00 PM</p></div>
           </li>
           <li class="timeline-item">
             <div class="timeline-marker bg-warning text-white"><Icon name="truck" class="w-3 h-3" /></div>
             <div class="timeline-content"><h4 class="font-semibold text-warning">Out for Delivery</h4><p class="text-sm opacity-70">Dec 30, 9:00 AM</p></div>
           </li>
           <li class="timeline-item">
             <div class="timeline-marker bg-base-300 text-white"><Icon name="home" class="w-3 h-3" /></div>
             <div class="timeline-content"><h4 class="font-semibold opacity-50">Delivered</h4><p class="text-sm opacity-50">Pending</p></div>
           </li>
         </ul>
       </div>
     </section>
 
     <section id="alternating" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Alternating Layout</h2>
       <p class="text-sm opacity-70">Timeline dengan content bergantian kiri-kanan.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="timeline timeline-alternating">
           <li class="timeline-item timeline-left">
             <div class="timeline-marker bg-primary"></div>
             <div class="timeline-content"><h4 class="font-semibold">2020</h4><p class="text-sm">Company founded</p></div>
           </li>
           <li class="timeline-item timeline-right">
             <div class="timeline-marker bg-primary"></div>
             <div class="timeline-content"><h4 class="font-semibold">2021</h4><p class="text-sm">First product launch</p></div>
           </li>
           <li class="timeline-item timeline-left">
             <div class="timeline-marker bg-primary"></div>
             <div class="timeline-content"><h4 class="font-semibold">2022</h4><p class="text-sm">Expanded to 10 countries</p></div>
           </li>
           <li class="timeline-item timeline-right">
             <div class="timeline-marker bg-primary"></div>
             <div class="timeline-content"><h4 class="font-semibold">2023</h4><p class="text-sm">1 million users reached</p></div>
           </li>
         </ul>
       </div>
     </section>
 
     <section id="compact" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Compact Timeline</h2>
       <p class="text-sm opacity-70">Timeline ringkas untuk daftar aktivitas singkat.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="timeline timeline-compact">
           <li class="timeline-item"><div class="timeline-marker"></div><div class="timeline-content"><span>User registered</span><span class="text-xs opacity-50 ml-2">2 min ago</span></div></li>
           <li class="timeline-item"><div class="timeline-marker"></div><div class="timeline-content"><span>Email verified</span><span class="text-xs opacity-50 ml-2">5 min ago</span></div></li>
           <li class="timeline-item"><div class="timeline-marker"></div><div class="timeline-content"><span>Profile updated</span><span class="text-xs opacity-50 ml-2">10 min ago</span></div></li>
           <li class="timeline-item"><div class="timeline-marker"></div><div class="timeline-content"><span>First login</span><span class="text-xs opacity-50 ml-2">15 min ago</span></div></li>
         </ul>
       </div>
     </section>
 
     <section id="activity" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Activity Feed</h2>
       <p class="text-sm opacity-70">Timeline sebagai activity feed dengan avatar dan aksi.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="timeline">
           <li v-for="(activity, i) in activities" :key="i" class="timeline-item">
             <div class="timeline-marker bg-base-100 border border-base-300">
               <Icon :name="activity.icon" class="w-3 h-3" :class="activity.color" />
             </div>
             <div class="timeline-content flex items-center gap-2 flex-wrap">
               <span class="font-medium">{{ activity.user }}</span>
               <span class="opacity-70">{{ activity.action }}</span>
               <span class="text-xs opacity-50">{{ activity.time }}</span>
             </div>
           </li>
         </ul>
       </div>
     </section>
 
     <section class="card p-6 space-y-4">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">CSS Classes</h2>
       <div class="overflow-x-auto">
         <table class="min-w-full text-sm"><thead class="bg-base-200"><tr><th class="px-4 py-2 text-left">Class</th><th class="px-4 py-2 text-left">Description</th></tr></thead>
           <tbody class="divide-y divide-base-200">
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.timeline</code></td><td class="px-4 py-2">Container timeline</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.timeline-item</code></td><td class="px-4 py-2">Individual item</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.timeline-marker</code></td><td class="px-4 py-2">Dot/icon marker</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.timeline-content</code></td><td class="px-4 py-2">Content area</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.timeline-alternating</code></td><td class="px-4 py-2">Alternating layout</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.timeline-compact</code></td><td class="px-4 py-2">Compact spacing</td></tr>
           </tbody>
         </table>
       </div>
     </section>
 
     <FloatingTOC :items="tocItems" />
   </div>
 </template>
 
 <style scoped>
 .timeline { list-style: none; padding: 0; margin: 0; position: relative; }
 .timeline-item { display: flex; gap: 1rem; position: relative; padding-bottom: 1.5rem; }
 .timeline-item:last-child { padding-bottom: 0; }
 .timeline-item::before { content: ''; position: absolute; left: 0.6875rem; top: 1.5rem; bottom: 0; width: 2px; background: var(--color-base-300); }
 .timeline-item:last-child::before { display: none; }
 .timeline-marker { width: 1.5rem; height: 1.5rem; border-radius: 9999px; background: var(--color-primary); flex-shrink: 0; display: flex; align-items: center; justify-content: center; z-index: 1; }
 .timeline-content { flex: 1; padding-top: 0.125rem; }
 .timeline-compact .timeline-item { padding-bottom: 0.75rem; }
 .timeline-compact .timeline-marker { width: 1.5rem; height: 1.5rem; }
 .timeline-compact .timeline-item::before { left: 0.6875rem; top: 1.5rem; }
 .timeline-alternating { padding-left: 50%; }
 .timeline-alternating .timeline-item::before { left: 50%; transform: translateX(-50%); }
 .timeline-alternating .timeline-marker { position: absolute; left: 50%; transform: translateX(-50%); }
 .timeline-left { padding-right: calc(50% + 2rem); padding-left: 0; justify-content: flex-end; text-align: right; }
 .timeline-right { padding-left: calc(50% + 2rem); }
 </style>