<script setup lang="ts">
 import { ref } from "vue";
 import PageHeader from "@/components/PageHeader.vue";
 import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
 
 const tocItems: TOCItem[] = [
   { id: "basic", label: "Basic Progress" },
   { id: "colors", label: "Colors" },
   { id: "sizes", label: "Sizes" },
   { id: "steps", label: "Steps Indicator" },
   { id: "vertical-steps", label: "Vertical Steps" },
 ];
 
 const progress = ref(65);
 
 const copiedId = ref<string | null>(null);
 const copyCode = async (code: string, id: string) => {
   await navigator.clipboard.writeText(code);
   copiedId.value = id;
   setTimeout(() => (copiedId.value = null), 2000);
 };
 
 const codes = {
   basic: `<div class="progress">
   <div class="progress-bar" :style="{ width: progress + '%' }"></div>
 </div>`,
   steps: `<ul class="steps">
   <li class="step step-primary">Register</li>
   <li class="step step-primary">Choose plan</li>
   <li class="step">Payment</li>
 </ul>`,
 };
 </script>
 
 <template>
   <div class="space-y-8">
     <PageHeader category="Components" title="Progress & Steps" description="Progress bar dan steps indicator untuk menunjukkan kemajuan dalam proses." />
 
     <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Progress</h2>
       <p class="text-sm opacity-70">Progress bar dasar dengan animasi. Atur nilai dengan slider.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-4">
         <div class="progress"><div class="progress-bar" :style="{ width: progress + '%' }"></div></div>
         <input type="range" v-model="progress" min="0" max="100" class="range range-primary w-full" />
         <p class="text-sm text-center opacity-70">{{ progress }}%</p>
       </div>
       <div class="relative">
         <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.basic }}</code></pre>
         <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.basic, 'basic')">{{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}</button>
       </div>
     </section>
 
     <section id="colors" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Colors</h2>
       <p class="text-sm opacity-70">Berbagai warna untuk menunjukkan status berbeda.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-3">
         <div><span class="text-xs opacity-70">Primary</span><div class="progress"><div class="progress-bar bg-primary" style="width: 70%"></div></div></div>
         <div><span class="text-xs opacity-70">Secondary</span><div class="progress"><div class="progress-bar bg-secondary" style="width: 60%"></div></div></div>
         <div><span class="text-xs opacity-70">Success</span><div class="progress"><div class="progress-bar bg-success" style="width: 85%"></div></div></div>
         <div><span class="text-xs opacity-70">Warning</span><div class="progress"><div class="progress-bar bg-warning" style="width: 45%"></div></div></div>
         <div><span class="text-xs opacity-70">Error</span><div class="progress"><div class="progress-bar bg-error" style="width: 30%"></div></div></div>
       </div>
     </section>
 
     <section id="sizes" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Sizes</h2>
       <p class="text-sm opacity-70">Tersedia dalam berbagai ukuran tinggi.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-4">
         <div><span class="text-xs opacity-70">Extra Small (2px)</span><div class="progress progress-xs"><div class="progress-bar" style="width: 70%"></div></div></div>
         <div><span class="text-xs opacity-70">Small (4px)</span><div class="progress progress-sm"><div class="progress-bar" style="width: 70%"></div></div></div>
         <div><span class="text-xs opacity-70">Medium (8px)</span><div class="progress"><div class="progress-bar" style="width: 70%"></div></div></div>
         <div><span class="text-xs opacity-70">Large (16px)</span><div class="progress progress-lg"><div class="progress-bar" style="width: 70%"></div></div></div>
       </div>
     </section>
 
     <section id="steps" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Steps Indicator</h2>
       <p class="text-sm opacity-70">Steps horizontal untuk wizard atau multi-step form.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="steps w-full">
           <li class="step step-primary">Register</li>
           <li class="step step-primary">Choose plan</li>
           <li class="step">Payment</li>
           <li class="step">Complete</li>
         </ul>
       </div>
       <div class="relative">
         <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.steps }}</code></pre>
         <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.steps, 'steps')">{{ copiedId === 'steps' ? 'Copied!' : 'Copy' }}</button>
       </div>
     </section>
 
     <section id="vertical-steps" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Vertical Steps</h2>
       <p class="text-sm opacity-70">Steps vertikal untuk proses dengan deskripsi lebih panjang.</p>
       <div class="bg-base-200 rounded-box p-6">
         <ul class="steps steps-vertical">
           <li class="step step-primary" :class="{'step-connected': true}">Register account</li>
           <li class="step step-primary" :class="{'step-connected': false}">Verify email</li>
           <li class="step">Complete profile</li>
           <li class="step">Start using</li>
         </ul>
       </div>
     </section>
 
     <section class="card p-6 space-y-4">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">CSS Classes</h2>
       <div class="overflow-x-auto">
         <table class="min-w-full text-sm">
           <thead class="bg-base-200"><tr><th class="px-4 py-2 text-left">Class</th><th class="px-4 py-2 text-left">Description</th></tr></thead>
           <tbody class="divide-y divide-base-200">
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.progress</code></td><td class="px-4 py-2">Container progress bar</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.progress-bar</code></td><td class="px-4 py-2">Bar yang bergerak</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.progress-xs/sm/lg</code></td><td class="px-4 py-2">Size variants</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.steps</code></td><td class="px-4 py-2">Container untuk steps</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.step</code></td><td class="px-4 py-2">Individual step item</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.step-primary</code></td><td class="px-4 py-2">Completed/active step</td></tr>
           </tbody>
         </table>
       </div>
     </section>
 
     <FloatingTOC :items="tocItems" />
   </div>
 </template>
 
 <style scoped>
 .progress { width: 100%; height: 8px; background: var(--color-base-300); border-radius: 9999px; overflow: hidden; }
 .progress-bar { height: 100%; background: var(--color-primary); transition: width 0.3s ease; border-radius: 9999px; }
 .progress-bar.bg-primary { background: var(--color-primary); }
 .progress-bar.bg-secondary { background: var(--color-secondary); }
 .progress-bar.bg-success { background: var(--color-success); }
 .progress-bar.bg-warning { background: var(--color-warning); }
 .progress-bar.bg-error { background: var(--color-error); }
 .progress-bar.bg-info { background: var(--color-info); }
 .progress-xs { height: 2px; }
 .progress-sm { height: 4px; }
 .progress-lg { height: 16px; }
 /* Horizontal Steps */
 .steps { display: flex; gap: 0; counter-reset: step; }
 .step { display: flex; flex-direction: column; align-items: center; flex: 1; position: relative; padding-top: 2.5rem; text-align: center; font-size: 0.875rem; }
 .step::before { content: counter(step); counter-increment: step; position: absolute; top: 0; width: 2rem; height: 2rem; border-radius: 9999px; background: var(--color-base-300); color: var(--color-base-content); display: flex; align-items: center; justify-content: center; font-weight: 600; z-index: 1; }
 .step::after { content: ''; position: absolute; top: 1rem; left: calc(-50% + 1rem); right: calc(50% + 1rem); height: 2px; background: var(--color-base-300); transform: translateY(-50%); }
 .step:first-child::after { display: none; }
 .step-primary::before { background: var(--color-primary); color: white; }
 .step-primary::after { background: var(--color-primary); }
 /* Vertical Steps */
 .steps-vertical { flex-direction: column; gap: 0; }
 .steps-vertical .step { flex-direction: row; align-items: flex-start; padding-top: 0; padding-left: 3rem; min-height: 4rem; text-align: left; }
 .steps-vertical .step::before { left: 0; top: 0; }
 .steps-vertical .step::after { 
   content: ''; 
   position: absolute; 
   left: 0.9375rem; /* 15px - slightly adjusted for visual center of 2rem bullet */
   top: 2rem; 
   width: 2px; 
   height: 100%;
   background: var(--color-base-300); 
   z-index: 0;
   display: block;
 }
 .steps-vertical .step:last-child::after { display: none; }
 .steps-vertical .step-connected::after { background: var(--color-primary); }
 </style>