<script setup lang="ts">
import { ref } from "vue";
import { useToast } from "@keiryusaki/mitreka-ui/composables";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const tocItems: TOCItem[] = [
  { id: 'download', label: 'Download Component' },
  { id: 'setup', label: 'Setup' },
  { id: 'import', label: 'Import & Usage' },
  { id: 'types', label: 'Toast Types' },
  { id: 'variants', label: 'Variants' },
  { id: 'with-title', label: 'With Title' },
  { id: 'timeout', label: 'Custom Timeout' },
  { id: 'dismiss', label: 'Manual Dismiss' },
  { id: 'position', label: 'Position' },
  { id: 'ts-types', label: 'TypeScript Types' },
  { id: 'api-ref', label: 'API Reference' },
  { id: 'options', label: 'Toast Options' },
];

const toast = useToast();
const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Code snippets
const codes = {
  import: `import { useToast } from "@keiryusaki/mitreka-ui/composables";
const toast = useToast();`,
  basic: `// Info toast
toast.notify({ type: "info", message: "Ini adalah info toast" });

// Success toast
toast.notify({ type: "success", message: "Data berhasil disimpan!" });

// Warning toast
toast.notify({ type: "warning", message: "Perhatian: koneksi lambat" });

// Error toast
toast.notify({ type: "error", message: "Gagal menyimpan data" });

// Primary toast
toast.notify({ type: "primary", message: "Notifikasi primary" });`,
  withTitle: `toast.notify({
  type: "success",
  title: "Berhasil!",
  message: "Data pengguna telah diperbarui"
});`,
  customTimeout: `// Toast dengan timeout 5 detik
toast.notify({
  type: "info",
  message: "Toast ini bertahan 5 detik",
  timeout: 5000
});

// Toast tanpa auto-dismiss (timeout: 0)
toast.notify({
  type: "warning",
  title: "Perhatian",
  message: "Toast ini tidak akan hilang otomatis",
  timeout: 0
});`,
  dismiss: `// Simpan ID toast
const toastId = toast.notify({
  type: "info",
  message: "Loading...",
  timeout: 0
});

// Dismiss manual
toast.dismiss(toastId);

// Clear semua toast
toast.clearToasts();`,
  component: `<!-- Tambahkan Toasts di App.vue atau layout utama -->
<` + `script setup>
import { Toasts } from "@keiryusaki/mitreka-ui/vue";
</` + `script>

<template>
  <div>
    <router-view />
    <Toasts />
  </div>
</template>`,
  types: `type ToastType = "info" | "success" | "warning" | "error" | "primary";
type ToastVariant = "soft" | "solid" | "outline";

type ToastItem = {
  id: number;
  type: ToastType;
  variant?: ToastVariant; // default: "soft"
  title?: string;
  message: string;
  timeout?: number; // default: 3000ms
};`,
  variantSoft: `// Soft variant (default)
toast.notify({ type: "success", variant: "soft", message: "Soft toast" });`,
  variantSolid: `// Solid variant
toast.notify({ type: "success", variant: "solid", message: "Solid toast" });`,
  variantOutline: `// Outline variant
toast.notify({ type: "success", variant: "outline", message: "Outline toast" });`,
  position: `// Set toast position
toast.setToastPosition("top-right");

// Available positions:
// "top-left" | "top-center" | "top-right"
// "bottom-left" | "bottom-center" | "bottom-right" (default)`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/feedback/Toasts.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Toasts.vue";
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
      title="Toasts" 
      description="Komponen notifikasi toast untuk menampilkan pesan feedback ke user."
    />

    <!-- Download Component -->
    <section id="download" class="card p-4 scroll-mt-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download Toasts.vue
        </button>
      </div>
    </section>

    <!-- Setup -->
    <section id="setup" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Setup</h2>
      <p class="text-sm opacity-80">
        Toasts menggunakan <code class="code-inline">useToast()</code> composable. 
        Pastikan komponen <code class="code-inline">Toasts</code> ditambahkan di root layout.
      </p>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.component, 'component')">
          {{ copiedId === 'component' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.component }}</code></pre>
      </div>
    </section>

    <!-- Import -->
    <section id="import" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Import & Usage</h2>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.import, 'import')">
          {{ copiedId === 'import' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.import }}</code></pre>
      </div>
    </section>

    <!-- Basic Types -->
    <section id="types" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Toast Types</h2>
      
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-info btn-sm" 
          @click="toast.notify({ type: 'info', message: 'Ini adalah info toast' })"
        >
          Info
        </button>
        <button 
          class="btn btn-success btn-sm" 
          @click="toast.notify({ type: 'success', message: 'Data berhasil disimpan!' })"
        >
          Success
        </button>
        <button 
          class="btn btn-warning btn-sm" 
          @click="toast.notify({ type: 'warning', message: 'Perhatian: koneksi lambat' })"
        >
          Warning
        </button>
        <button 
          class="btn btn-error btn-sm" 
          @click="toast.notify({ type: 'error', message: 'Gagal menyimpan data' })"
        >
          Error
        </button>
        <button 
          class="btn btn-primary btn-sm" 
          @click="toast.notify({ type: 'primary', message: 'Notifikasi primary' })"
        >
          Primary
        </button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basic }}</code></pre>
      </div>
    </section>

    <!-- Variants -->
    <section id="variants" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Variants</h2>
      <p class="text-sm opacity-80">Toast mendukung 3 variant: soft (default), solid, dan outline.</p>
      
      <!-- Soft Variant -->
      <div class="space-y-2">
        <h3 class="font-medium">Soft (Default)</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-soft-info btn-sm" @click="toast.notify({ type: 'info', variant: 'soft', message: 'Soft info toast' })">Info</button>
          <button class="btn btn-soft-success btn-sm" @click="toast.notify({ type: 'success', variant: 'soft', message: 'Soft success toast' })">Success</button>
          <button class="btn btn-soft-warning btn-sm" @click="toast.notify({ type: 'warning', variant: 'soft', message: 'Soft warning toast' })">Warning</button>
          <button class="btn btn-soft-error btn-sm" @click="toast.notify({ type: 'error', variant: 'soft', message: 'Soft error toast' })">Error</button>
          <button class="btn btn-soft-primary btn-sm" @click="toast.notify({ type: 'primary', variant: 'soft', message: 'Soft primary toast' })">Primary</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.variantSoft, 'variantSoft')">
            {{ copiedId === 'variantSoft' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.variantSoft }}</code></pre>
        </div>
      </div>

      <!-- Solid Variant -->
      <div class="space-y-2">
        <h3 class="font-medium">Solid</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-info btn-sm" @click="toast.notify({ type: 'info', variant: 'solid', message: 'Solid info toast' })">Info</button>
          <button class="btn btn-success btn-sm" @click="toast.notify({ type: 'success', variant: 'solid', message: 'Solid success toast' })">Success</button>
          <button class="btn btn-warning btn-sm" @click="toast.notify({ type: 'warning', variant: 'solid', message: 'Solid warning toast' })">Warning</button>
          <button class="btn btn-error btn-sm" @click="toast.notify({ type: 'error', variant: 'solid', message: 'Solid error toast' })">Error</button>
          <button class="btn btn-primary btn-sm" @click="toast.notify({ type: 'primary', variant: 'solid', message: 'Solid primary toast' })">Primary</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.variantSolid, 'variantSolid')">
            {{ copiedId === 'variantSolid' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.variantSolid }}</code></pre>
        </div>
      </div>

      <!-- Outline Variant -->
      <div class="space-y-2">
        <h3 class="font-medium">Outline</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-outline btn-outline-info btn-sm" @click="toast.notify({ type: 'info', variant: 'outline', message: 'Outline info toast' })">Info</button>
          <button class="btn btn-outline btn-outline-success btn-sm" @click="toast.notify({ type: 'success', variant: 'outline', message: 'Outline success toast' })">Success</button>
          <button class="btn btn-outline btn-outline-warning btn-sm" @click="toast.notify({ type: 'warning', variant: 'outline', message: 'Outline warning toast' })">Warning</button>
          <button class="btn btn-outline btn-outline-error btn-sm" @click="toast.notify({ type: 'error', variant: 'outline', message: 'Outline error toast' })">Error</button>
          <button class="btn btn-outline btn-outline-primary btn-sm" @click="toast.notify({ type: 'primary', variant: 'outline', message: 'Outline primary toast' })">Primary</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.variantOutline, 'variantOutline')">
            {{ copiedId === 'variantOutline' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.variantOutline }}</code></pre>
        </div>
      </div>
    </section>

    <!-- With Title -->
    <section id="with-title" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Title</h2>
      
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-success btn-sm" 
          @click="toast.notify({ type: 'success', title: 'Berhasil!', message: 'Data pengguna telah diperbarui' })"
        >
          Success dengan Title
        </button>
        <button 
          class="btn btn-error btn-sm" 
          @click="toast.notify({ type: 'error', title: 'Error!', message: 'Terjadi kesalahan saat menyimpan' })"
        >
          Error dengan Title
        </button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.withTitle, 'withTitle')">
          {{ copiedId === 'withTitle' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.withTitle }}</code></pre>
      </div>
    </section>

    <!-- Custom Timeout -->
    <section id="timeout" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Custom Timeout</h2>
      <p class="text-sm opacity-80">Default timeout adalah 3000ms (3 detik). Set ke 0 untuk persistent toast.</p>
      
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-outline btn-sm" 
          @click="toast.notify({ type: 'info', message: 'Toast ini bertahan 5 detik', timeout: 5000 })"
        >
          5 Detik
        </button>
        <button 
          class="btn btn-outline btn-sm" 
          @click="toast.notify({ type: 'warning', title: 'Perhatian', message: 'Toast ini tidak akan hilang otomatis', timeout: 0 })"
        >
          Persistent (no auto-dismiss)
        </button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.customTimeout, 'customTimeout')">
          {{ copiedId === 'customTimeout' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.customTimeout }}</code></pre>
      </div>
    </section>

    <!-- Dismiss -->
    <section id="dismiss" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Manual Dismiss</h2>
      
      <div class="flex flex-wrap gap-2">
        <button 
          class="btn btn-outline btn-sm" 
          @click="toast.clearToasts()"
        >
          Clear All Toasts
        </button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.dismiss, 'dismiss')">
          {{ copiedId === 'dismiss' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.dismiss }}</code></pre>
      </div>
    </section>

    <!-- Position -->
    <section id="position" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Position</h2>
      <p class="text-sm opacity-80">Ubah posisi toast container. Default: bottom-right</p>
      
      <div class="grid grid-cols-3 gap-2 max-w-md">
        <button class="btn btn-outline btn-sm" @click="toast.setToastPosition('top-left'); toast.notify({ type: 'info', message: 'Top Left' })">Top Left</button>
        <button class="btn btn-outline btn-sm" @click="toast.setToastPosition('top-center'); toast.notify({ type: 'info', message: 'Top Center' })">Top Center</button>
        <button class="btn btn-outline btn-sm" @click="toast.setToastPosition('top-right'); toast.notify({ type: 'info', message: 'Top Right' })">Top Right</button>
        <button class="btn btn-outline btn-sm" @click="toast.setToastPosition('bottom-left'); toast.notify({ type: 'info', message: 'Bottom Left' })">Bottom Left</button>
        <button class="btn btn-outline btn-sm" @click="toast.setToastPosition('bottom-center'); toast.notify({ type: 'info', message: 'Bottom Center' })">Bottom Center</button>
        <button class="btn btn-outline btn-sm" @click="toast.setToastPosition('bottom-right'); toast.notify({ type: 'info', message: 'Bottom Right' })">Bottom Right</button>
      </div>

      <p class="text-xs opacity-60">Current position: <code class="code-inline">{{ toast.toastPosition }}</code></p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.position, 'position')">
          {{ copiedId === 'position' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.position }}</code></pre>
      </div>
    </section>

    <!-- Types Reference -->
    <section id="ts-types" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">TypeScript Types</h2>
      
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.types, 'types')">
          {{ copiedId === 'types' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.types }}</code></pre>
      </div>
    </section>

    <!-- API Reference -->
    <section id="api-ref" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">API Reference</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Method</th>
              <th class="px-4 py-2 text-left">Parameters</th>
              <th class="px-4 py-2 text-left">Return</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">notify()</code></td>
              <td class="px-4 py-2">ToastItem (tanpa id)</td>
              <td class="px-4 py-2">number (toast id)</td>
              <td class="px-4 py-2">Menampilkan toast baru</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">dismiss()</code></td>
              <td class="px-4 py-2">id: number</td>
              <td class="px-4 py-2">void</td>
              <td class="px-4 py-2">Menutup toast berdasarkan ID</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">clearToasts()</code></td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">void</td>
              <td class="px-4 py-2">Menutup semua toast</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Toast Options -->
    <section id="options" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Toast Options</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Option</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Default</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">type</code></td>
              <td class="px-4 py-2">"info" | "success" | "warning" | "error" | "primary"</td>
              <td class="px-4 py-2">"info"</td>
              <td class="px-4 py-2">Tipe toast (menentukan warna & icon)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">variant</code></td>
              <td class="px-4 py-2">"soft" | "solid" | "outline"</td>
              <td class="px-4 py-2">"soft"</td>
              <td class="px-4 py-2">Variant style toast</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">message</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Pesan utama toast (required)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">title</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Judul toast (optional)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">timeout</code></td>
              <td class="px-4 py-2">number</td>
              <td class="px-4 py-2">3000</td>
              <td class="px-4 py-2">Durasi tampil dalam ms (0 = persistent)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
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

