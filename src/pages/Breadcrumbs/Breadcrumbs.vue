<script setup lang="ts">
import { ref } from "vue";
import Breadcrumbs from "@/components/nav/Breadcrumbs.vue";

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Code snippets
const codes = {
  import: `import Breadcrumbs from "@/components/nav/Breadcrumbs.vue";`,
  basic: `<template>
  <Breadcrumbs />
</template>`,
  component: `<template>
  <nav class="text-xs sm:text-sm mb-2 overflow-x-auto">
    <ol class="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
      <li><router-link to="/" class="text-primary">Home</router-link></li>
      <li v-for="(m, i) in tail" :key="i" class="flex items-center gap-1 sm:gap-2">
        <span>/</span>
        <span v-if="i < tail.length - 1">
          <router-link :to="m.path" class="text-primary">{{ m.title }}</router-link>
        </span>
        <span v-else class="opacity-70">{{ m.title }}</span>
      </li>
    </ol>
  </nav>
</template>

<` + `script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const tail = computed(() => {
  const segs = route.path.split("/").filter(Boolean);
  const acc: { title: string; path: string }[] = [];
  let cur = "";
  segs.forEach((s) => {
    cur += \`/\${s}\`;
    acc.push({ 
      title: s.charAt(0).toUpperCase() + s.slice(1), 
      path: cur 
    });
  });
  return acc;
});
</` + `script>`,
  customBreadcrumb: `<template>
  <nav class="text-sm mb-4">
    <ol class="flex items-center gap-2">
      <li>
        <router-link to="/" class="text-primary hover:underline">
          Home
        </router-link>
      </li>
      <li class="flex items-center gap-2">
        <span class="opacity-50">/</span>
        <router-link to="/users" class="text-primary hover:underline">
          Users
        </router-link>
      </li>
      <li class="flex items-center gap-2">
        <span class="opacity-50">/</span>
        <span class="opacity-70">Edit User</span>
      </li>
    </ol>
  </nav>
</template>`,
  withIcons: `<nav class="text-sm mb-4">
  <ol class="flex items-center gap-2">
    <li>
      <router-link to="/" class="text-primary hover:underline flex items-center gap-1">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </router-link>
    </li>
    <li class="flex items-center gap-2">
      <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
      </svg>
      <span class="opacity-70">Current Page</span>
    </li>
  </ol>
</nav>`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/nav/Breadcrumbs.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Breadcrumbs.vue";
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
      <h1 class="text-2xl font-bold">Breadcrumbs</h1>
      <p class="text-sm opacity-80">
        Komponen navigasi untuk menunjukkan lokasi halaman dalam hierarki situs.
      </p>
    </header>

    <!-- Download Component -->
    <section class="card p-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download Breadcrumbs.vue
        </button>
      </div>
    </section>

    <!-- Import -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Import</h2>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.import, 'import')">
          {{ copiedId === 'import' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.import }}</code></pre>
      </div>
    </section>

    <!-- Live Demo -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Live Demo</h2>
      <p class="text-sm opacity-80">
        Breadcrumbs otomatis membaca path dari router dan menampilkan navigasi.
      </p>
      
      <div class="p-4 bg-base-200 rounded-lg">
        <p class="text-xs opacity-60 mb-2">Current path: /breadcrumbs</p>
        <Breadcrumbs />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basic }}</code></pre>
      </div>
    </section>

    <!-- Component Source -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Component Source</h2>
      <p class="text-sm opacity-80">
        Komponen ini secara otomatis mengambil path dari <code class="code-inline">useRoute()</code> 
        dan memecahnya menjadi breadcrumb items.
      </p>
      
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.component, 'component')">
          {{ copiedId === 'component' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.component }}</code></pre>
      </div>
    </section>

    <!-- Custom Breadcrumb -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Custom Breadcrumb</h2>
      <p class="text-sm opacity-80">
        Jika perlu kontrol lebih, buat breadcrumb manual dengan struktur HTML yang sama.
      </p>
      
      <div class="p-4 bg-base-200 rounded-lg">
        <nav class="text-sm mb-4">
          <ol class="flex items-center gap-2">
            <li>
              <router-link to="/" class="text-primary hover:underline">
                Home
              </router-link>
            </li>
            <li class="flex items-center gap-2">
              <span class="opacity-50">/</span>
              <router-link to="/users" class="text-primary hover:underline">
                Users
              </router-link>
            </li>
            <li class="flex items-center gap-2">
              <span class="opacity-50">/</span>
              <span class="opacity-70">Edit User</span>
            </li>
          </ol>
        </nav>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.customBreadcrumb, 'customBreadcrumb')">
          {{ copiedId === 'customBreadcrumb' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.customBreadcrumb }}</code></pre>
      </div>
    </section>

    <!-- With Icons -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Icons</h2>
      <p class="text-sm opacity-80">
        Tambahkan icon untuk memperjelas navigasi.
      </p>
      
      <div class="p-4 bg-base-200 rounded-lg">
        <nav class="text-sm mb-4">
          <ol class="flex items-center gap-2">
            <li>
              <router-link to="/" class="text-primary hover:underline flex items-center gap-1">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </router-link>
            </li>
            <li class="flex items-center gap-2">
              <svg class="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
              <span class="opacity-70">Breadcrumbs</span>
            </li>
          </ol>
        </nav>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.withIcons, 'withIcons')">
          {{ copiedId === 'withIcons' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.withIcons }}</code></pre>
      </div>
    </section>

    <!-- Features -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Features</h2>
      
      <ul class="list-disc ml-5 space-y-2 text-sm">
        <li><strong>Auto-generate:</strong> Otomatis membuat breadcrumb dari URL path</li>
        <li><strong>Responsive:</strong> Ukuran teks menyesuaikan (text-xs di mobile, text-sm di desktop)</li>
        <li><strong>Scrollable:</strong> Horizontal scroll jika breadcrumb terlalu panjang</li>
        <li><strong>Last item disabled:</strong> Item terakhir tidak clickable (current page)</li>
        <li><strong>Capitalize:</strong> Otomatis capitalize huruf pertama setiap segment</li>
      </ul>
    </section>

    <!-- Styling -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Styling Classes</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Class</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">text-primary</code></td>
              <td class="px-4 py-2">Warna link breadcrumb</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">opacity-70</code></td>
              <td class="px-4 py-2">Item terakhir (current page) lebih redup</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">overflow-x-auto</code></td>
              <td class="px-4 py-2">Horizontal scroll pada mobile</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">whitespace-nowrap</code></td>
              <td class="px-4 py-2">Mencegah wrapping</td>
            </tr>
          </tbody>
        </table>
      </div>
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
