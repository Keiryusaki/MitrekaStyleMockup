<script setup lang="ts">
 import { ref } from "vue";
 import PageHeader from "@/components/PageHeader.vue";
 import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
 import { Icon } from "@/composables/Icon";
 
 const tocItems: TOCItem[] = [
   { id: "basic", label: "Basic Alert" },
   { id: "with-icons", label: "With Icons" },
   { id: "dismissible", label: "Dismissible" },
   { id: "with-actions", label: "With Actions" },
   { id: "bordered", label: "Bordered Variant" },
   { id: "banner", label: "Banner" },
 ];
 
 const showDismissible = ref(true);
 const showBanner = ref(true);
 
 const copiedId = ref<string | null>(null);
 const copyCode = async (code: string, id: string) => {
   await navigator.clipboard.writeText(code);
   copiedId.value = id;
   setTimeout(() => (copiedId.value = null), 2000);
 };
 
 const codes = {
   basic: `<div class="alert alert-info">
   <span>This is an info alert.</span>
 </div>
 <div class="alert alert-success">
   <span>This is a success alert.</span>
 </div>
 <div class="alert alert-warning">
   <span>This is a warning alert.</span>
 </div>
 <div class="alert alert-error">
   <span>This is an error alert.</span>
 </div>`,
   dismissible: `<div class="alert alert-info" v-if="show">
   <Icon name="info" />
   <span>Dismissible alert</span>
   <button @click="show = false">
     <Icon name="x" />
   </button>
 </div>`,
 };
 </script>
 
 <template>
   <div class="space-y-8">
     <PageHeader category="Components" title="Alert & Banner" description="Alert untuk menampilkan pesan penting kepada user dengan berbagai severity level." />
 
     <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Alert</h2>
       <p class="text-sm opacity-70">4 tipe alert: info, success, warning, dan error.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-3">
         <div class="alert alert-info"><span>This is an informational message.</span></div>
         <div class="alert alert-success"><span>Operation completed successfully!</span></div>
         <div class="alert alert-warning"><span>Please review before proceeding.</span></div>
         <div class="alert alert-error"><span>An error occurred. Please try again.</span></div>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.basic }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.basic, 'basic')">{{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="with-icons" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Icons</h2>
       <p class="text-sm opacity-70">Alert dengan icon untuk visual yang lebih jelas.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-3">
         <div class="alert alert-info"><Icon name="info" class="w-5 h-5" /><span>New features are available. Check them out!</span></div>
         <div class="alert alert-success"><Icon name="circle-check" class="w-5 h-5" /><span>Your profile has been updated.</span></div>
         <div class="alert alert-warning"><Icon name="alert-triangle" class="w-5 h-5" /><span>Your session will expire in 5 minutes.</span></div>
         <div class="alert alert-error"><Icon name="x-circle" class="w-5 h-5" /><span>Failed to save changes. Check your connection.</span></div>
       </div>
     </section>
 
     <section id="dismissible" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Dismissible</h2>
       <p class="text-sm opacity-70">Alert yang bisa ditutup oleh user.</p>
       <div class="bg-base-200 rounded-box p-6">
         <Transition name="fade">
           <div v-if="showDismissible" class="alert alert-info">
             <Icon name="info" class="w-5 h-5" />
             <span class="flex-1">This alert can be dismissed by clicking the X button.</span>
             <button class="btn btn-ghost btn-sm btn-circle" @click="showDismissible = false"><Icon name="x" class="w-4 h-4" /></button>
           </div>
         </Transition>
         <button v-if="!showDismissible" class="btn btn-sm btn-primary" @click="showDismissible = true">Show Alert</button>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.dismissible }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.dismissible, 'dismissible')">{{ copiedId === 'dismissible' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="with-actions" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Actions</h2>
       <p class="text-sm opacity-70">Alert dengan tombol aksi.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-3">
         <div class="alert alert-warning">
           <Icon name="alert-triangle" class="w-5 h-5" />
           <div class="flex-1"><h4 class="font-semibold">Update Available</h4><p class="text-sm opacity-80">A new version is available. Update now to get the latest features.</p></div>
           <div class="flex gap-2"><button class="btn btn-sm btn-ghost">Later</button><button class="btn btn-sm btn-warning">Update</button></div>
         </div>
         <div class="alert alert-error">
           <Icon name="x-circle" class="w-5 h-5" />
           <div class="flex-1"><h4 class="font-semibold">Payment Failed</h4><p class="text-sm opacity-80">Your payment could not be processed. Please update your payment method.</p></div>
           <button class="btn btn-sm btn-error">Update Payment</button>
         </div>
       </div>
     </section>
 
     <section id="bordered" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Bordered Variant</h2>
       <p class="text-sm opacity-70">Alert dengan border style yang lebih subtle.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-3">
         <div class="alert alert-bordered alert-info"><Icon name="info" class="w-5 h-5" /><span>Bordered info alert style.</span></div>
         <div class="alert alert-bordered alert-success"><Icon name="circle-check" class="w-5 h-5" /><span>Bordered success alert style.</span></div>
         <div class="alert alert-bordered alert-warning"><Icon name="alert-triangle" class="w-5 h-5" /><span>Bordered warning alert style.</span></div>
         <div class="alert alert-bordered alert-error"><Icon name="x-circle" class="w-5 h-5" /><span>Bordered error alert style.</span></div>
       </div>
     </section>
 
     <section id="banner" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Banner</h2>
       <p class="text-sm opacity-70">Full-width banner untuk announcements.</p>
       <div class="bg-base-200 rounded-box p-6">
         <Transition name="slide">
           <div v-if="showBanner" class="banner banner-info">
             <div class="flex items-center justify-center gap-3">
               <Icon name="megaphone" class="w-5 h-5" />
               <span>New feature released! Check out our latest update.</span>
               <a href="#" class="font-semibold underline">Learn more</a>
             </div>
             <button class="absolute right-4 top-1/2 -translate-y-1/2" @click="showBanner = false"><Icon name="x" class="w-4 h-4" /></button>
           </div>
         </Transition>
         <button v-if="!showBanner" class="btn btn-sm btn-primary" @click="showBanner = true">Show Banner</button>
       </div>
     </section>
 
     <section class="card p-6 space-y-4">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">CSS Classes</h2>
       <div class="overflow-x-auto">
         <table class="min-w-full text-sm"><thead class="bg-base-200"><tr><th class="px-4 py-2 text-left">Class</th><th class="px-4 py-2 text-left">Description</th></tr></thead>
           <tbody class="divide-y divide-base-200">
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.alert</code></td><td class="px-4 py-2">Base alert container</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.alert-info</code></td><td class="px-4 py-2">Info style (blue)</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.alert-success</code></td><td class="px-4 py-2">Success style (green)</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.alert-warning</code></td><td class="px-4 py-2">Warning style (yellow)</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.alert-error</code></td><td class="px-4 py-2">Error style (red)</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.alert-bordered</code></td><td class="px-4 py-2">Bordered variant</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.banner</code></td><td class="px-4 py-2">Full-width banner</td></tr>
           </tbody>
         </table>
       </div>
     </section>
 
     <FloatingTOC :items="tocItems" />
   </div>
 </template>
 
 <style scoped>
 .alert { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; border-radius: var(--radius-box); }
 .alert-info { background: color-mix(in oklch, var(--color-info), transparent 90%); color: var(--color-info); border: 1px solid color-mix(in oklch, var(--color-info), transparent 80%); }
 .alert-success { background: color-mix(in oklch, var(--color-success), transparent 90%); color: var(--color-success); border: 1px solid color-mix(in oklch, var(--color-success), transparent 80%); }
 .alert-warning { background: color-mix(in oklch, var(--color-warning), transparent 90%); color: var(--color-warning); border: 1px solid color-mix(in oklch, var(--color-warning), transparent 80%); }
 .alert-error { background: color-mix(in oklch, var(--color-error), transparent 90%); color: var(--color-error); border: 1px solid color-mix(in oklch, var(--color-error), transparent 80%); }
 .alert-bordered { background: transparent; border: 1px solid currentColor; border-left-width: 4px; }
 .banner { position: relative; padding: 0.75rem 3rem; text-align: center; }
 .banner-info { background: var(--color-primary); color: white; }
 .fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
 .fade-enter-from, .fade-leave-to { opacity: 0; }
 .slide-enter-active, .slide-leave-active { transition: all 0.3s ease; }
 .slide-enter-from, .slide-leave-to { transform: translateY(-100%); opacity: 0; }
 </style>