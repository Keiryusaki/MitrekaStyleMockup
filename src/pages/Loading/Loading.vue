<script setup lang="ts">
import { ref } from "vue";
import BrandedLoading from "@/components/BrandedLoading.vue";
import LogoLoader from "@/components/LogoLoader.vue";
import { useLoadingStore } from "@/stores/loading";

const loading = useLoadingStore();
const copiedId = ref<string | null>(null);
const showBrandedDemo = ref(false);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const triggerBrandedLoading = () => {
  showBrandedDemo.value = true;
  setTimeout(() => (showBrandedDemo.value = false), 3000);
};

const triggerGlobalLoading = () => {
  loading.start("Sedang memproses data...");
  setTimeout(() => loading.stop(), 3000);
};

// Code snippets
const codes = {
  brandedImport: `import BrandedLoading from "@/components/BrandedLoading.vue";`,
  brandedBasic: `<` + `script setup>
import { ref } from "vue";
import BrandedLoading from "@/components/BrandedLoading.vue";

const isLoading = ref(false);

const doSomething = async () => {
  isLoading.value = true;
  await fetchData();
  isLoading.value = false;
};
</` + `script>

<template>
  <BrandedLoading 
    :show="isLoading" 
    message="Memuat data..."
  />
</template>`,
  brandedProps: `<BrandedLoading 
  :show="true"
  message="Sedang memproses..."
  :size="240"
  :respect-reduced-motion="false"
/>`,
  logoLoaderImport: `import LogoLoader from "@/components/LogoLoader.vue";`,
  logoLoaderBasic: `<LogoLoader />

<!-- Dengan props -->
<LogoLoader 
  :size="80" 
  text="Loading..." 
  :show-text="true" 
/>`,
  loadingStore: `import { useLoadingStore } from "@/stores/loading";

const loading = useLoadingStore();

// Start loading
loading.start("Menyimpan data...");

// Stop loading
loading.stop();

// Untuk navigasi
loading.startNav("Memuat halaman...");
loading.stopNav();`,
  loadingOverlay: `<!-- Di App.vue atau layout utama -->
<` + `script setup>
import LoadingOverlay from "@/components/LoadingOverlay.vue";
</` + `script>

<template>
  <div>
    <router-view />
    <LoadingOverlay />
  </div>
</template>`,
  withAsync: `const loading = useLoadingStore();

async function saveData() {
  try {
    loading.start("Menyimpan...");
    await api.save(data);
    loading.setMessage("Hampir selesai...");
    await api.validate();
  } finally {
    loading.stop();
  }
}`,
};

const downloadBranded = async () => {
  try {
    const fileUrl = (await import("@/components/BrandedLoading.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "BrandedLoading.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};

const downloadLogoLoader = async () => {
  try {
    const fileUrl = (await import("@/components/LogoLoader.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "LogoLoader.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <header>
      <h1 class="text-2xl font-bold">Loading Components</h1>
      <p class="text-sm opacity-80">
        Komponen loading untuk menunjukkan proses yang sedang berjalan.
      </p>
    </header>

    <!-- Download Components -->
    <section class="card p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-semibold">Download Components</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-accent btn-sm" @click="downloadBranded">
            BrandedLoading.vue
          </button>
          <button class="btn btn-accent btn-sm" @click="downloadLogoLoader">
            LogoLoader.vue
          </button>
        </div>
      </div>
    </section>

    <!-- BrandedLoading Section -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        BrandedLoading (Fullscreen Overlay)
      </h2>
      <p class="text-sm opacity-80">
        Loading overlay fullscreen dengan logo Mitreka yang memiliki animasi shimmer.
        Cocok untuk loading state saat fetch data atau proses berat.
      </p>

      <div class="flex gap-2">
        <button class="btn btn-primary btn-sm" @click="triggerBrandedLoading">
          Demo BrandedLoading (3 detik)
        </button>
        <button class="btn btn-outline btn-sm" @click="triggerGlobalLoading">
          Demo via Loading Store
        </button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.brandedImport, 'brandedImport')">
          {{ copiedId === 'brandedImport' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.brandedImport }}</code></pre>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.brandedBasic, 'brandedBasic')">
          {{ copiedId === 'brandedBasic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.brandedBasic }}</code></pre>
      </div>

      <!-- BrandedLoading Demo (inline) -->
      <BrandedLoading 
        :show="showBrandedDemo" 
        message="Memuat data..."
      />
    </section>

    <!-- BrandedLoading Props -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        BrandedLoading Props
      </h2>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.brandedProps, 'brandedProps')">
          {{ copiedId === 'brandedProps' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.brandedProps }}</code></pre>
      </div>

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
              <td class="px-4 py-2"><code class="code-inline">show</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Mengontrol visibility overlay</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">message</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">"Memuat..."</td>
              <td class="px-4 py-2">Pesan yang ditampilkan</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">size</code></td>
              <td class="px-4 py-2">number | string</td>
              <td class="px-4 py-2">200</td>
              <td class="px-4 py-2">Ukuran logo dalam pixel</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">respectReducedMotion</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">true</td>
              <td class="px-4 py-2">Hormati prefers-reduced-motion</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- LogoLoader Section -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        LogoLoader (Inline)
      </h2>
      <p class="text-sm opacity-80">
        Loading indicator inline dengan logo Mitreka. Cocok untuk loading state 
        di dalam card atau section tertentu.
      </p>

      <div class="flex flex-wrap items-center gap-6 p-4 bg-base-200 rounded-lg">
        <LogoLoader :size="48" />
        <LogoLoader :size="64" text="Loading..." />
        <LogoLoader :size="80" text="Memproses data..." />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.logoLoaderImport, 'logoLoaderImport')">
          {{ copiedId === 'logoLoaderImport' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.logoLoaderImport }}</code></pre>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.logoLoaderBasic, 'logoLoaderBasic')">
          {{ copiedId === 'logoLoaderBasic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.logoLoaderBasic }}</code></pre>
      </div>
    </section>

    <!-- LogoLoader Props -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        LogoLoader Props
      </h2>

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
              <td class="px-4 py-2"><code class="code-inline">size</code></td>
              <td class="px-4 py-2">number | string</td>
              <td class="px-4 py-2">56</td>
              <td class="px-4 py-2">Ukuran logo dalam pixel</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">showText</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">true</td>
              <td class="px-4 py-2">Tampilkan teks di samping logo</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">text</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">"Memuat..."</td>
              <td class="px-4 py-2">Teks yang ditampilkan</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Loading Store -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Loading Store (Global State)
      </h2>
      <p class="text-sm opacity-80">
        Gunakan Pinia store untuk mengelola loading state secara global.
        <code class="code-inline">LoadingOverlay.vue</code> sudah terhubung ke store ini.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.loadingStore, 'loadingStore')">
          {{ copiedId === 'loadingStore' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.loadingStore }}</code></pre>
      </div>
    </section>

    <!-- LoadingOverlay Setup -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        LoadingOverlay Setup
      </h2>
      <p class="text-sm opacity-80">
        Tambahkan <code class="code-inline">LoadingOverlay</code> di root layout untuk 
        mengaktifkan loading global via store.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.loadingOverlay, 'loadingOverlay')">
          {{ copiedId === 'loadingOverlay' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.loadingOverlay }}</code></pre>
      </div>
    </section>

    <!-- Usage with Async -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Usage with Async Functions
      </h2>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.withAsync, 'withAsync')">
          {{ copiedId === 'withAsync' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.withAsync }}</code></pre>
      </div>
    </section>

    <!-- Store API -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Loading Store API
      </h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Method</th>
              <th class="px-4 py-2 text-left">Parameters</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">start()</code></td>
              <td class="px-4 py-2">msg?: string</td>
              <td class="px-4 py-2">Mulai loading dengan pesan opsional</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">stop()</code></td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Hentikan loading</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">setMessage()</code></td>
              <td class="px-4 py-2">msg: string</td>
              <td class="px-4 py-2">Update pesan loading</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">startNav()</code></td>
              <td class="px-4 py-2">msg?: string</td>
              <td class="px-4 py-2">Loading untuk navigasi router</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">stopNav()</code></td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Hentikan loading navigasi</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">reset()</code></td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Reset semua state loading</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Features -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Features</h2>
      
      <ul class="list-disc ml-5 space-y-2 text-sm">
        <li><strong>Animated Logo:</strong> Logo Mitreka dengan shimmer effect</li>
        <li><strong>Reduced Motion:</strong> Respect prefers-reduced-motion setting</li>
        <li><strong>Teleport:</strong> Overlay di-teleport ke body untuk z-index yang benar</li>
        <li><strong>Pending Count:</strong> Support multiple concurrent loading states</li>
        <li><strong>Grace Period:</strong> Configurable delay sebelum hide untuk smooth UX</li>
      </ul>
    </section>
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
