<script setup lang="ts">
 import { ref } from "vue";
 import PageHeader from "@/components/PageHeader.vue";
 import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
 import { Icon } from "@/composables/Icon";
 
 const tocItems: TOCItem[] = [
   { id: "dropzone", label: "Dropzone" },
   { id: "simple", label: "Simple Input" },
   { id: "preview", label: "Image Preview" },
   { id: "multiple", label: "Multiple Files" },
   { id: "progress", label: "Upload Progress" },
 ];
 
 const isDragOver = ref(false);
 const uploadProgress = ref(65);
 const previewImage = ref<string | null>(null);
 const selectedFiles = ref<string[]>([]);
 const multipleFiles = ref<string[]>([]);
 const multipleInputRef = ref<HTMLInputElement | null>(null);
 
 const handleDrop = (e: DragEvent) => {
   isDragOver.value = false;
   const files = e.dataTransfer?.files;
   if (files?.length) {
     selectedFiles.value = Array.from(files).map(f => f.name);
   }
 };
 
 const handleFileSelect = (e: Event) => {
   const input = e.target as HTMLInputElement;
   if (input.files?.length) {
     const file = input.files[0];
     if (file.type.startsWith('image/')) {
       const reader = new FileReader();
       reader.onload = (e) => { previewImage.value = e.target?.result as string; };
       reader.readAsDataURL(file);
     }
   }
 };
 
 const triggerMultipleUpload = () => {
   multipleInputRef.value?.click();
 };
 
 const handleMultipleSelect = (e: Event) => {
   const input = e.target as HTMLInputElement;
   if (input.files) {
     const files = Array.from(input.files);
     const remainingSlots = 4 - multipleFiles.value.length;
     files.slice(0, remainingSlots).forEach(file => {
       if (file.type.startsWith('image/')) {
         const reader = new FileReader();
         reader.onload = (e) => {
           if (e.target?.result) multipleFiles.value.push(e.target.result as string);
         };
         reader.readAsDataURL(file);
       }
     });
     // Reset input value to allow selecting same file again if needed
     input.value = '';
   }
 };
 
 const copiedId = ref<string | null>(null);
 const copyCode = async (code: string, id: string) => {
   await navigator.clipboard.writeText(code);
   copiedId.value = id;
   setTimeout(() => (copiedId.value = null), 2000);
 };
 
 const codes = {
   dropzone: `<div 
   class="dropzone" 
   :class="{ 'dropzone-active': isDragOver }"
   @dragover.prevent="isDragOver = true"
   @dragleave="isDragOver = false"
   @drop.prevent="handleDrop"
 >
   <Icon name="upload" />
   <p>Drag & drop files here</p>
 </div>`,
 };
 </script>
 
 <template>
   <div class="space-y-8">
     <PageHeader category="Components" title="File Upload" description="Komponen upload file dengan dropzone, preview, dan progress indicator." />
 
     <section id="dropzone" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Dropzone</h2>
       <p class="text-sm opacity-70">Area drag & drop untuk upload file.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div 
           class="dropzone" 
           :class="{ 'dropzone-active': isDragOver }"
           @dragover.prevent="isDragOver = true"
           @dragleave="isDragOver = false"
           @drop.prevent="handleDrop"
         >
           <Icon name="upload" class="w-10 h-10 opacity-50" />
           <p class="font-medium">Drag & drop files here</p>
           <p class="text-sm opacity-60">or click to browse</p>
           <input type="file" class="absolute inset-0 opacity-0 cursor-pointer" multiple />
         </div>
         <div v-if="selectedFiles.length" class="mt-4 space-y-2">
           <div v-for="file in selectedFiles" :key="file" class="flex items-center gap-2 p-2 bg-base-100 rounded">
             <Icon name="file" class="w-4 h-4" /><span class="text-sm">{{ file }}</span>
           </div>
         </div>
       </div>
       <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.dropzone }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.dropzone, 'dropzone')">{{ copiedId === 'dropzone' ? 'Copied!' : 'Copy' }}</button></div>
     </section>
 
     <section id="simple" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Simple Input</h2>
       <p class="text-sm opacity-70">Input file standar dengan styling.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-4">
         <div>
           <label class="block text-sm font-medium mb-2">Choose file</label>
           <input type="file" class="file-input file-input-bordered w-full max-w-xs" />
         </div>
         <div>
           <label class="block text-sm font-medium mb-2">With button style</label>
           <input type="file" class="file-input file-input-bordered file-input-primary w-full max-w-xs" />
         </div>
       </div>
     </section>
 
     <section id="preview" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Image Preview</h2>
       <p class="text-sm opacity-70">Upload gambar dengan preview sebelum submit.</p>
       <div class="bg-base-200 rounded-box p-6">
         <div class="flex flex-col items-center gap-4">
           <div class="w-32 h-32 rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center overflow-hidden bg-base-100">
             <img v-if="previewImage" :src="previewImage" class="w-full h-full object-cover" />
             <Icon v-else name="image" class="w-8 h-8 opacity-30" />
           </div>
           <input type="file" accept="image/*" class="file-input file-input-bordered file-input-sm" @change="handleFileSelect" />
         </div>
       </div>
     </section>
 
     <section id="multiple" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Multiple Files</h2>
       <p class="text-sm opacity-70">Upload multiple file dengan grid preview.</p>
       <div class="bg-base-200 rounded-box p-6">
         <input type="file" ref="multipleInputRef" multiple accept="image/*" class="hidden" @change="handleMultipleSelect" />
         <div class="grid grid-cols-4 gap-3">
           <div v-for="(img, i) in multipleFiles" :key="'img-'+i" class="aspect-square rounded-lg border border-base-300 relative overflow-hidden group bg-base-100">
             <img :src="img" class="w-full h-full object-cover" />
             <button class="absolute top-1 right-1 btn btn-circle btn-xs btn-error opacity-0 group-hover:opacity-100 transition-opacity" @click="multipleFiles.splice(i, 1)">
               <Icon name="x" class="w-3 h-3 text-white" />
             </button>
           </div>
           <div 
             v-for="i in (4 - multipleFiles.length)" 
             :key="'placeholder-'+i" 
             class="aspect-square rounded-lg border-2 border-dashed border-base-300 flex items-center justify-center bg-base-100 cursor-pointer hover:border-primary hover:text-primary transition-colors"
             @click="triggerMultipleUpload"
           >
             <Icon name="plus" class="w-6 h-6 opacity-30" />
           </div>
         </div>
         <p class="text-xs opacity-60 mt-3">Click boxes to add images (max 4)</p>
       </div>
     </section>
 
     <section id="progress" class="card p-6 space-y-4 scroll-mt-20">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Upload Progress</h2>
       <p class="text-sm opacity-70">Menampilkan progress saat upload.</p>
       <div class="bg-base-200 rounded-box p-6 space-y-4">
         <div class="p-3 bg-base-100 rounded-lg">
           <div class="flex items-center gap-3">
             <Icon name="file" class="w-8 h-8 text-primary" />
             <div class="flex-1">
               <div class="flex justify-between text-sm"><span class="font-medium">document.pdf</span><span class="opacity-70">{{ uploadProgress }}%</span></div>
               <div class="progress mt-1"><div class="progress-bar" :style="{ width: uploadProgress + '%' }"></div></div>
             </div>
             <button class="btn btn-ghost btn-sm btn-circle"><Icon name="x" class="w-4 h-4" /></button>
           </div>
         </div>
         <input type="range" v-model="uploadProgress" min="0" max="100" class="range range-sm range-primary" />
       </div>
     </section>
 
     <section class="card p-6 space-y-4">
       <h2 class="text-lg font-semibold border-b border-base-300 pb-2">CSS Classes</h2>
       <div class="overflow-x-auto">
         <table class="min-w-full text-sm"><thead class="bg-base-200"><tr><th class="px-4 py-2 text-left">Class</th><th class="px-4 py-2 text-left">Description</th></tr></thead>
           <tbody class="divide-y divide-base-200">
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.dropzone</code></td><td class="px-4 py-2">Drag & drop area</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.dropzone-active</code></td><td class="px-4 py-2">State saat drag over</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.file-input</code></td><td class="px-4 py-2">Styled file input</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.file-input-bordered</code></td><td class="px-4 py-2">With border</td></tr>
             <tr><td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">.file-input-primary</code></td><td class="px-4 py-2">Primary color variant</td></tr>
           </tbody>
         </table>
       </div>
     </section>
 
     <FloatingTOC :items="tocItems" />
   </div>
 </template>
 
 <style scoped>
 .dropzone { position: relative; border: 2px dashed var(--color-base-300); border-radius: var(--radius-box); padding: 2rem; text-align: center; display: flex; flex-direction: column; align-items: center; gap: 0.5rem; transition: all 0.2s ease; cursor: pointer; }
 .dropzone:hover { border-color: var(--color-primary); background: var(--color-primary-content); }
 .dropzone-active { border-color: var(--color-primary); background: var(--color-primary-content); transform: scale(1.02); }
 .progress { width: 100%; height: 6px; background: var(--color-base-300); border-radius: 9999px; overflow: hidden; }
 .progress-bar { height: 100%; background: var(--color-primary); transition: width 0.3s ease; border-radius: 9999px; }
.file-input { height: 3rem; padding: 0; padding-right: 1rem; font-size: 0.875rem; border-radius: var(--radius-box); background: var(--color-base-100); display: flex; align-items: center; }
 .file-input-bordered { border: 1px solid var(--color-base-300); }
.file-input::file-selector-button { border: none; background: var(--color-base-300); border-right: 1px solid var(--color-base-300); padding: 0 1rem; height: 100%; margin-right: 1rem; cursor: pointer; color: var(--color-base-content); font-weight: 500; }
.file-input-primary::file-selector-button { background: var(--color-primary); color: white; border: none; }
 </style>