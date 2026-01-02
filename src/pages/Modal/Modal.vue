<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/feedback/Modal.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const copiedId = ref<string | null>(null);

const tocItems: TOCItem[] = [
  { id: 'import', label: 'Import' },
  { id: 'basic-usage', label: 'Basic Usage' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'hide-header-footer', label: 'Hide Header/Footer' },
  { id: 'custom-footer', label: 'Custom Footer Slot' },
  { id: 'persistent', label: 'Persistent Mode' },
  { id: 'modal-form', label: 'Modal with Form' },
  { id: 'props', label: 'Props Reference' },
  { id: 'events', label: 'Events' },
  { id: 'slots', label: 'Slots' },
];

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Modal states
const showBasic = ref(false);
const showSm = ref(false);
const showMd = ref(false);
const showLg = ref(false);
const showXl = ref(false);
const showFull = ref(false);
const showNoHeader = ref(false);
const showNoFooter = ref(false);
const showCustomFooter = ref(false);
const showPersistent = ref(false);
const showForm = ref(false);

// Form demo
const formData = ref({ name: "", email: "" });

// Code snippets
const codes = {
  import: `import Modal from "@/components/feedback/Modal.vue";`,
  basic: `<script setup>
import { ref } from "vue";
import Modal from "@/components/feedback/Modal.vue";

const showModal = ref(false);
<\/script>

<template>
  <button class="btn btn-primary" @click="showModal = true">
    Open Modal
  </button>
  
  <Modal 
    :open="showModal" 
    title="Modal Title"
    @close="showModal = false"
    @confirm="showModal = false"
  >
    <p>Modal content goes here.</p>
  </Modal>
</template>`,
  sizes: `<!-- Small (448px) -->
<Modal :open="show" size="sm" title="Small Modal">...</Modal>

<!-- Medium (768px) - default -->
<Modal :open="show" size="md" title="Medium Modal">...</Modal>

<!-- Large (1120px) -->
<Modal :open="show" size="lg" title="Large Modal">...</Modal>

<!-- Extra Large (almost fullscreen) -->
<Modal :open="show" size="xl" title="XL Modal">...</Modal>

<!-- Fullscreen (true fullscreen) -->
<Modal :open="show" size="full" title="Full Modal">...</Modal>`,
  noHeader: `<Modal 
  :open="show" 
  :hide-header="true"
  @close="show = false"
>
  <p>Modal without header. Click outside to close.</p>
</Modal>`,
  noFooter: `<Modal 
  :open="show" 
  title="No Footer"
  :hide-footer="true"
  @close="show = false"
>
  <p>Modal without footer buttons.</p>
</Modal>`,
  customFooter: `<Modal 
  :open="show" 
  title="Custom Footer"
  @close="show = false"
>
  <p>Modal with custom footer slot.</p>
  
  <template #footer>
    <button class="btn btn-ghost" @click="show = false">
      Nanti Saja
    </button>
    <button class="btn btn-warning" @click="handleDraft">
      Simpan Draft
    </button>
    <button class="btn btn-primary" @click="handleSubmit">
      Submit
    </button>
  </template>
</Modal>`,
  persistent: `<Modal 
  :open="show" 
  title="Persistent Modal"
  :persistent="true"
  @close="show = false"
>
  <p>This modal won't close when clicking backdrop.</p>
  <p>User must click a button to close.</p>
</Modal>`,
  customText: `<Modal 
  :open="show" 
  title="Konfirmasi"
  confirm-text="Ya, Hapus"
  cancel-text="Tidak"
  @close="show = false"
  @confirm="handleDelete"
>
  <p>Apakah Anda yakin ingin menghapus data ini?</p>
</Modal>`,
  withForm: `<Modal 
  :open="show" 
  title="Form Modal"
  size="lg"
  confirm-text="Submit"
  @close="show = false"
  @confirm="handleSubmit"
>
  <div class="space-y-4">
    <div>
      <label class="block text-sm font-medium mb-1">Nama</label>
      <input v-model="form.name" class="input w-full" placeholder="Masukkan nama" />
    </div>
    <div>
      <label class="block text-sm font-medium mb-1">Email</label>
      <input v-model="form.email" class="input w-full" type="email" placeholder="email@example.com" />
    </div>
  </div>
</Modal>`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/feedback/Modal.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Modal.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Modal" 
      description="Komponen dialog overlay untuk konfirmasi, form, atau menampilkan konten tambahan."
    />

    <!-- Download Component -->
    <section class="card p-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download Modal.vue
        </button>
      </div>
    </section>

    <!-- Import -->
    <section id="import" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Import</h2>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.import, 'import')">
          {{ copiedId === 'import' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.import }}</code></pre>
      </div>
    </section>

    <!-- Basic Usage -->
    <section id="basic-usage" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      
      <div class="space-y-3">
        <button class="btn btn-primary" @click="showBasic = true">
          Open Basic Modal
        </button>
        
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
            {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.basic }}</code></pre>
        </div>
      </div>

      <Modal 
        :open="showBasic" 
        title="Basic Modal"
        @close="showBasic = false"
        @confirm="showBasic = false"
      >
        <p>Ini adalah contoh modal sederhana dengan title, content, dan footer buttons.</p>
      </Modal>
    </section>

    <!-- Sizes -->
    <section id="sizes" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Sizes</h2>
      
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-outline btn-sm" @click="showSm = true">Small (sm)</button>
        <button class="btn btn-outline btn-sm" @click="showMd = true">Medium (md)</button>
        <button class="btn btn-outline btn-sm" @click="showLg = true">Large (lg)</button>
        <button class="btn btn-outline btn-sm" @click="showXl = true">Extra Large (xl)</button>
        <button class="btn btn-outline btn-sm" @click="showFull = true">Full</button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.sizes, 'sizes')">
          {{ copiedId === 'sizes' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.sizes }}</code></pre>
      </div>

      <!-- Size Modals -->
      <Modal :open="showSm" size="sm" title="Small Modal" @close="showSm = false" @confirm="showSm = false">
        <p>Ini modal ukuran small (448px). Cocok untuk konfirmasi singkat.</p>
      </Modal>
      <Modal :open="showMd" size="md" title="Medium Modal" @close="showMd = false" @confirm="showMd = false">
        <p>Ini modal ukuran medium/default (768px). Cocok untuk form sederhana.</p>
      </Modal>
      <Modal :open="showLg" size="lg" title="Large Modal" @close="showLg = false" @confirm="showLg = false">
        <p>Ini modal ukuran large (1120px). Cocok untuk form kompleks atau tabel.</p>
      </Modal>
      <Modal :open="showXl" size="xl" title="Extra Large Modal" @close="showXl = false" @confirm="showXl = false">
        <p>Ini modal ukuran extra large (almost fullscreen). Ada margin kecil di sekelilingnya.</p>
      </Modal>
      <Modal :open="showFull" size="full" title="Fullscreen Modal" @close="showFull = false" @confirm="showFull = false">
        <p>Ini modal fullscreen. Mengisi seluruh layar tanpa margin.</p>
      </Modal>
    </section>

    <!-- Hide Header/Footer -->
    <section id="hide-header-footer" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Hide Header / Footer</h2>
      
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-outline btn-sm" @click="showNoHeader = true">No Header</button>
        <button class="btn btn-outline btn-sm" @click="showNoFooter = true">No Footer</button>
      </div>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.noHeader, 'noHeader')">
            {{ copiedId === 'noHeader' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.noHeader }}</code></pre>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.noFooter, 'noFooter')">
            {{ copiedId === 'noFooter' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.noFooter }}</code></pre>
        </div>
      </div>

      <Modal :open="showNoHeader" :hide-header="true" @close="showNoHeader = false" @confirm="showNoHeader = false">
        <p class="text-lg font-semibold mb-2">Modal tanpa header</p>
        <p>Klik backdrop atau tombol di bawah untuk menutup.</p>
      </Modal>
      <Modal :open="showNoFooter" title="No Footer" :hide-footer="true" @close="showNoFooter = false">
        <p>Modal ini tidak memiliki footer buttons.</p>
        <p class="mt-2 text-sm opacity-70">Klik backdrop atau tombol X untuk menutup.</p>
      </Modal>
    </section>

    <!-- Custom Footer -->
    <section id="custom-footer" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Custom Footer Slot</h2>
      
      <button class="btn btn-outline btn-sm" @click="showCustomFooter = true">
        Open Custom Footer Modal
      </button>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.customFooter, 'customFooter')">
          {{ copiedId === 'customFooter' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.customFooter }}</code></pre>
      </div>

      <Modal :open="showCustomFooter" title="Custom Footer" @close="showCustomFooter = false">
        <p>Modal dengan custom footer menggunakan slot.</p>
        
        <template #footer>
          <button class="btn btn-ghost" @click="showCustomFooter = false">Nanti Saja</button>
          <button class="btn btn-warning" @click="showCustomFooter = false">Simpan Draft</button>
          <button class="btn btn-primary" @click="showCustomFooter = false">Submit</button>
        </template>
      </Modal>
    </section>

    <!-- Persistent -->
    <section id="persistent" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Persistent Mode</h2>
      <p class="text-sm opacity-80">Modal tidak akan tertutup saat klik backdrop.</p>
      
      <button class="btn btn-outline btn-sm" @click="showPersistent = true">
        Open Persistent Modal
      </button>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.persistent, 'persistent')">
          {{ copiedId === 'persistent' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.persistent }}</code></pre>
      </div>

      <Modal 
        :open="showPersistent" 
        title="Persistent Modal" 
        :persistent="true"
        @close="showPersistent = false" 
        @confirm="showPersistent = false"
      >
        <p>Coba klik area gelap di luar modal.</p>
        <p class="mt-2 text-sm opacity-70">Modal ini hanya bisa ditutup dengan tombol.</p>
      </Modal>
    </section>

    <!-- With Form -->
    <section id="modal-form" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Modal with Form</h2>
      
      <button class="btn btn-primary" @click="showForm = true">
        Open Form Modal
      </button>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.withForm, 'withForm')">
          {{ copiedId === 'withForm' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.withForm }}</code></pre>
      </div>

      <Modal 
        :open="showForm" 
        title="Form Example"
        size="lg"
        confirm-text="Submit"
        @close="showForm = false; formData = { name: '', email: '' }"
        @confirm="showForm = false"
      >
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Nama</label>
            <input v-model="formData.name" class="input w-full" placeholder="Masukkan nama" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input v-model="formData.email" class="input w-full" type="email" placeholder="email@example.com" />
          </div>
        </div>
      </Modal>
    </section>

    <!-- Props Reference -->
    <section id="props" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props Reference</h2>
      
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
            <tr>
              <td class="px-4 py-2"><code class="code-inline">open</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Mengontrol visibility modal (required)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">title</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">"Modal"</td>
              <td class="px-4 py-2">Judul modal di header</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">size</code></td>
              <td class="px-4 py-2">"sm" | "md" | "lg" | "xl" | "full"</td>
              <td class="px-4 py-2">"md"</td>
              <td class="px-4 py-2">Ukuran modal (sm=448px, md=768px, lg=1120px, xl=almost full, full=fullscreen)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">hideHeader</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Sembunyikan header</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">hideFooter</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Sembunyikan footer</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">confirmText</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">"Simpan"</td>
              <td class="px-4 py-2">Teks tombol confirm</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">cancelText</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">"Batal"</td>
              <td class="px-4 py-2">Teks tombol cancel</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">persistent</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Jika true, klik backdrop tidak menutup modal</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events Reference -->
    <section id="events" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Events</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Event</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">@close</code></td>
              <td class="px-4 py-2">Dipanggil saat modal ditutup (backdrop click, tombol X, atau cancel)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">@confirm</code></td>
              <td class="px-4 py-2">Dipanggil saat tombol confirm diklik</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slots Reference -->
    <section id="slots" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Slots</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Slot</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">default</code></td>
              <td class="px-4 py-2">Konten utama modal (body)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#header</code></td>
              <td class="px-4 py-2">Custom header (mengganti title)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#footer</code></td>
              <td class="px-4 py-2">Custom footer (mengganti tombol default)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Floating TOC -->
    <FloatingTOC :items="tocItems" title="Modal" />
  </div>
</template>

<style scoped>
/* Scroll margin for TOC navigation */
section[id] {
  scroll-margin-top: 5rem;
}
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
