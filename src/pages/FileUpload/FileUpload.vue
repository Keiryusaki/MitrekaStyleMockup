<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import FileUpload from "@/components/controls/FileUpload.vue";
import { Icon } from "@/composables/Icon";

const tocItems: TOCItem[] = [
  { id: "usage", label: "Vue Usage" },
  { id: "api", label: "Props & Events" },
  { id: "dropzone", label: "Dropzone" },
  { id: "simple", label: "Simple Input" },
  { id: "preview", label: "Image Preview" },
  { id: "multiple", label: "Multiple Files" },
  { id: "progress", label: "Upload Progress" },
];

const uploadProgress = ref(65);
const dropzoneFiles = ref<File[]>([]);
const previewFiles = ref<File[]>([]);
const multipleFiles = ref<File[]>([]);

const copiedId = ref<string | null>(null);
const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  usage: `import { ref } from "vue";
import { FileUpload } from "@keiryusaki/mitreka-ui/vue";

const files = ref<File[]>([]);

<FileUpload
  v-model="files"
  multiple
  accept="image/*"
  :max-files="4"
  preview
  helper-text="Maximum 4 images"
  max-size-text="Max size: 5MB per file"
/>`,
  dropzone: `<FileUpload v-model="files" />`,
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader category="Components" title="File Upload" description="Komponen upload file dengan dropzone, preview, dan progress indicator." />

    <section id="usage" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Vue Component Usage</h2>
      <p class="text-sm opacity-70">Gunakan `v-model` bertipe <code>File[]</code> untuk menerima file terpilih dari komponen.</p>
      <div class="relative"><pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.usage }}</code></pre><button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.usage, 'usage')">{{ copiedId === 'usage' ? 'Copied!' : 'Copy' }}</button></div>
    </section>

    <section id="api" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props & Events API</h2>
      <div class="space-y-4">
        <h3 class="font-medium">Props</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-base-200">
              <tr>
                <th class="px-4 py-2 text-left">Prop</th>
                <th class="px-4 py-2 text-left">Type</th>
                <th class="px-4 py-2 text-left">Default</th>
                <th class="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-base-200">
              <tr><td class="px-4 py-2"><code>modelValue</code></td><td class="px-4 py-2"><code>File[]</code></td><td class="px-4 py-2"><code>[]</code></td><td class="px-4 py-2">Daftar file terpilih untuk <code>v-model</code>.</td></tr>
              <tr><td class="px-4 py-2"><code>multiple</code></td><td class="px-4 py-2"><code>boolean</code></td><td class="px-4 py-2"><code>false</code></td><td class="px-4 py-2">Aktifkan multi file upload.</td></tr>
              <tr><td class="px-4 py-2"><code>accept</code></td><td class="px-4 py-2"><code>string</code></td><td class="px-4 py-2"><code>""</code></td><td class="px-4 py-2">Filter tipe file, contoh <code>image/*</code>.</td></tr>
              <tr><td class="px-4 py-2"><code>disabled</code></td><td class="px-4 py-2"><code>boolean</code></td><td class="px-4 py-2"><code>false</code></td><td class="px-4 py-2">Nonaktifkan interaksi dropzone dan input.</td></tr>
              <tr><td class="px-4 py-2"><code>maxFiles</code></td><td class="px-4 py-2"><code>number</code></td><td class="px-4 py-2"><code>undefined</code></td><td class="px-4 py-2">Batas jumlah file yang disimpan.</td></tr>
              <tr><td class="px-4 py-2"><code>preview</code></td><td class="px-4 py-2"><code>boolean</code></td><td class="px-4 py-2"><code>false</code></td><td class="px-4 py-2">Tampilkan grid preview untuk file image.</td></tr>
              <tr><td class="px-4 py-2"><code>dropzoneText</code></td><td class="px-4 py-2"><code>string</code></td><td class="px-4 py-2"><code>"Drag &amp; drop files here"</code></td><td class="px-4 py-2">Teks utama pada dropzone.</td></tr>
              <tr><td class="px-4 py-2"><code>browseText</code></td><td class="px-4 py-2"><code>string</code></td><td class="px-4 py-2"><code>"or click to browse"</code></td><td class="px-4 py-2">Teks bantuan di bawah judul.</td></tr>
              <tr><td class="px-4 py-2"><code>helperText</code></td><td class="px-4 py-2"><code>string</code></td><td class="px-4 py-2"><code>""</code></td><td class="px-4 py-2">Catatan tambahan di area dropzone.</td></tr>
              <tr><td class="px-4 py-2"><code>maxSizeText</code></td><td class="px-4 py-2"><code>string</code></td><td class="px-4 py-2"><code>""</code></td><td class="px-4 py-2">Info batas ukuran file yang ditampilkan di dropzone.</td></tr>
              <tr><td class="px-4 py-2"><code>emptyText</code></td><td class="px-4 py-2"><code>string</code></td><td class="px-4 py-2"><code>"No files selected"</code></td><td class="px-4 py-2">Teks saat belum ada file dipilih.</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="space-y-4">
        <h3 class="font-medium">Events</h3>
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-base-200">
              <tr>
                <th class="px-4 py-2 text-left">Event</th>
                <th class="px-4 py-2 text-left">Payload</th>
                <th class="px-4 py-2 text-left">Description</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-base-200">
              <tr><td class="px-4 py-2"><code>update:modelValue</code></td><td class="px-4 py-2"><code>File[]</code></td><td class="px-4 py-2">Terpicu saat daftar file berubah (untuk <code>v-model</code>).</td></tr>
              <tr><td class="px-4 py-2"><code>change</code></td><td class="px-4 py-2"><code>File[]</code></td><td class="px-4 py-2">Terpicu setelah file dipilih/drop/hapus.</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section id="dropzone" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Dropzone</h2>
      <p class="text-sm opacity-70">Area drag & drop untuk upload file.</p>
      <div class="bg-base-200 rounded-box p-6">
        <FileUpload
          v-model="dropzoneFiles"
          multiple
          helper-text="Accepted: all file types"
          max-size-text="Max size: 10MB per file"
          empty-text="No files selected yet"
        />
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
        <FileUpload
          v-model="previewFiles"
          accept="image/*"
          preview
          dropzone-text="Drop image here"
          browse-text="or click to pick image"
          empty-text="No image selected"
        />
      </div>
    </section>

    <section id="multiple" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Multiple Files</h2>
      <p class="text-sm opacity-70">Upload multiple file dengan grid preview.</p>
      <div class="bg-base-200 rounded-box p-6">
        <FileUpload
          v-model="multipleFiles"
          multiple
          accept="image/*"
          :max-files="4"
          :preview="false"
          helper-text="Maximum 4 images"
          max-size-text="Max size: 5MB per file"
          empty-text="No images selected"
        />
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
.progress { width: 100%; height: 6px; background: var(--color-base-300); border-radius: 9999px; overflow: hidden; }
.progress-bar { height: 100%; background: var(--color-primary); transition: width 0.3s ease; border-radius: 9999px; }
</style>
