<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";

const tocItems: TOCItem[] = [
  { id: 'usage', label: 'Basic Usage' },
  { id: 'with-category', label: 'With Category' },
  { id: 'variants', label: 'Variants' },
  { id: 'props', label: 'Props Reference' },
  { id: 'categories', label: 'Category Guidelines' },
];

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  import: `import PageHeader from "@/components/PageHeader.vue";`,
  basic: `<PageHeader 
  title="Button" 
  description="Berbagai varian button dengan state dan ukuran."
/>`,
  withCategory: `<PageHeader 
  category="Components"
  title="Button" 
  description="Berbagai varian button dengan state dan ukuran."
/>`,
  titleOnly: `<PageHeader title="Settings" />`,
  foundation: `<PageHeader 
  category="Foundation"
  title="Colors & Palette" 
  description="State colors dan base colors untuk design system."
/>`,
};

const categories = [
  { name: "Foundation", badge: "badge-soft-info", desc: "Elemen dasar design system", examples: "Colors, Typography, Icons" },
  { name: "Components", badge: "badge-soft-primary", desc: "Komponen UI yang reusable", examples: "Button, Input, Modal, Card" },
  { name: "Patterns", badge: "badge-soft-accent", desc: "Pola UI yang sering dipakai", examples: "Form Layout, Empty State" },
  { name: "Guides", badge: "badge-soft-success", desc: "Panduan dan dokumentasi", examples: "Developer Guide, Changelog" },
  { name: "Mockup", badge: "badge-soft-warning", desc: "Halaman mockup/demo", examples: "AG Grid, OKR, Ticketing" },
];
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="PageHeader" 
      description="Komponen untuk menampilkan judul halaman dengan category badge dan deskripsi yang konsisten."
    />

    <!-- Basic Usage -->
    <section id="usage" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      <p class="text-sm opacity-80">
        Import dan gunakan PageHeader di setiap halaman untuk tampilan judul yang konsisten.
      </p>
      
      <div class="p-6 bg-base-200 rounded-box">
        <PageHeader 
          title="Page Title" 
          description="Deskripsi singkat tentang halaman ini."
        />
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-sm"><code>{{ codes.import }}

{{ codes.basic }}</code></pre>
        <button 
          class="absolute top-2 right-2 btn btn-ghost btn-xs"
          @click="copyCode(codes.import + '\n\n' + codes.basic, 'basic')"
        >
          {{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- With Category -->
    <section id="with-category" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Category</h2>
      <p class="text-sm opacity-80">
        Tambahkan <code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">category</code> untuk menampilkan badge kategori di atas judul.
      </p>
      
      <div class="p-6 bg-base-200 rounded-box">
        <PageHeader 
          category="Components"
          title="Button" 
          description="Berbagai varian button dengan state dan ukuran."
        />
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-sm"><code>{{ codes.withCategory }}</code></pre>
        <button 
          class="absolute top-2 right-2 btn btn-ghost btn-xs"
          @click="copyCode(codes.withCategory, 'withCategory')"
        >
          {{ copiedId === 'withCategory' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Variants -->
    <section id="variants" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Variants</h2>
      <p class="text-sm opacity-80">
        Beberapa contoh penggunaan PageHeader dengan kombinasi props yang berbeda.
      </p>
      
      <div class="space-y-6">
        <!-- Title Only -->
        <div>
          <p class="text-sm font-medium mb-2 opacity-70">Title Only</p>
          <div class="p-6 bg-base-200 rounded-box">
            <PageHeader title="Settings" />
          </div>
          <pre class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"><code>{{ codes.titleOnly }}</code></pre>
        </div>

        <!-- Foundation Category -->
        <div>
          <p class="text-sm font-medium mb-2 opacity-70">Foundation Category</p>
          <div class="p-6 bg-base-200 rounded-box">
            <PageHeader 
              category="Foundation"
              title="Colors & Palette" 
              description="State colors dan base colors untuk design system."
            />
          </div>
          <pre class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"><code>{{ codes.foundation }}</code></pre>
        </div>

        <!-- Components Category -->
        <div>
          <p class="text-sm font-medium mb-2 opacity-70">Components Category</p>
          <div class="p-6 bg-base-200 rounded-box">
            <PageHeader 
              category="Components"
              title="Modal" 
              description="Dialog overlay untuk konfirmasi, form, atau konten tambahan."
            />
          </div>
        </div>

        <!-- Guides Category -->
        <div>
          <p class="text-sm font-medium mb-2 opacity-70">Guides Category</p>
          <div class="p-6 bg-base-200 rounded-box">
            <PageHeader 
              category="Guides"
              title="Developer Guide" 
              description="Panduan untuk developer yang ingin menggunakan design system ini."
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Props Reference -->
    <section id="props" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props Reference</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-base-300">
              <th class="text-left py-3 px-4 font-semibold">Prop</th>
              <th class="text-left py-3 px-4 font-semibold">Type</th>
              <th class="text-left py-3 px-4 font-semibold">Default</th>
              <th class="text-left py-3 px-4 font-semibold">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr class="border-b border-base-300">
              <td class="py-3 px-4"><code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">title</code></td>
              <td class="py-3 px-4 opacity-70">string</td>
              <td class="py-3 px-4 opacity-70">required</td>
              <td class="py-3 px-4 opacity-80">Judul halaman (required)</td>
            </tr>
            <tr class="border-b border-base-300">
              <td class="py-3 px-4"><code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">description</code></td>
              <td class="py-3 px-4 opacity-70">string</td>
              <td class="py-3 px-4 opacity-70">undefined</td>
              <td class="py-3 px-4 opacity-80">Deskripsi singkat halaman</td>
            </tr>
            <tr class="border-b border-base-300">
              <td class="py-3 px-4"><code class="bg-base-200 px-1.5 py-0.5 rounded text-xs">category</code></td>
              <td class="py-3 px-4 opacity-70">string</td>
              <td class="py-3 px-4 opacity-70">undefined</td>
              <td class="py-3 px-4 opacity-80">Kategori halaman (ditampilkan sebagai badge)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Category Guidelines -->
    <section id="categories" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Category Guidelines</h2>
      <p class="text-sm opacity-80">
        Gunakan kategori berikut untuk konsistensi across semua halaman:
      </p>
      
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-base-300">
              <th class="text-left py-3 px-4 font-semibold">Category</th>
              <th class="text-left py-3 px-4 font-semibold">Badge</th>
              <th class="text-left py-3 px-4 font-semibold">Description</th>
              <th class="text-left py-3 px-4 font-semibold">Examples</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="cat in categories" :key="cat.name" class="border-b border-base-300">
              <td class="py-3 px-4">
                <span class="badge text-xs uppercase tracking-wide" :class="cat.badge">{{ cat.name }}</span>
              </td>
              <td class="py-3 px-4">
                <code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">{{ cat.badge }}</code>
              </td>
              <td class="py-3 px-4 opacity-80">{{ cat.desc }}</td>
              <td class="py-3 px-4 opacity-70 text-xs">{{ cat.examples }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="bg-base-200 rounded-box p-4 text-sm">
        <p class="font-medium mb-2">Tips:</p>
        <ul class="list-disc list-inside space-y-1 opacity-80">
          <li>Category bersifat opsional - bisa dikosongkan untuk halaman umum</li>
          <li>Gunakan kategori yang sudah ada untuk konsistensi</li>
          <li>Warna badge otomatis berdasarkan nama kategori (case-insensitive)</li>
          <li>Kategori yang tidak dikenali akan menggunakan <code class="bg-base-300 px-1 rounded text-xs">badge-soft-primary</code></li>
        </ul>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
  </div>
</template>
