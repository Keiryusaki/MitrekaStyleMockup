<script setup lang="ts">
import { ref, computed } from "vue";
import Pagination from "@/components/misc/Pagination.vue";
import PageHeader from "@/components/PageHeader.vue";

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Demo states
const currentPage = ref(1);
const totalPages = ref(10);

// Demo data for table example
const allItems = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Item ${i + 1}`,
  status: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Inactive',
}));

const itemsPerPage = ref(5);
const tablePage = ref(1);

const paginatedItems = computed(() => {
  const start = (tablePage.value - 1) * itemsPerPage.value;
  return allItems.slice(start, start + itemsPerPage.value);
});

const tablePages = computed(() => Math.ceil(allItems.length / itemsPerPage.value));

// Code snippets
const codes = {
  import: `import Pagination from "@/components/misc/Pagination.vue";`,
  basic: `<template>
  <Pagination 
    :page="currentPage" 
    :pages="totalPages" 
    @change="currentPage = $event" 
  />
</template>

<` + `script setup>
import { ref } from "vue";
import Pagination from "@/components/misc/Pagination.vue";

const currentPage = ref(1);
const totalPages = ref(10);
</` + `script>`,
  withTable: `<template>
  <div class="space-y-4">
    <!-- Table -->
    <table class="table w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in paginatedItems" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
    
    <!-- Pagination -->
    <div class="flex justify-end">
      <Pagination 
        :page="currentPage" 
        :pages="totalPages" 
        @change="currentPage = $event" 
      />
    </div>
  </div>
</template>

<` + `script setup>
import { ref, computed } from "vue";

const allItems = [...]; // your data
const itemsPerPage = 10;
const currentPage = ref(1);

const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  return allItems.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => 
  Math.ceil(allItems.length / itemsPerPage)
);
</` + `script>`,
  props: `interface Props {
  page: number;   // Current page (1-based)
  pages: number;  // Total number of pages
}

// Events
@change(newPage: number) // Emitted when page changes`,
  customStyle: `<!-- Custom styled pagination -->
<div class="flex items-center gap-2">
  <button 
    class="btn btn-primary btn-sm"
    :disabled="page <= 1"
    @click="page--"
  >
    Previous
  </button>
  
  <div class="flex gap-1">
    <button 
      v-for="p in visiblePages" 
      :key="p"
      class="btn btn-sm"
      :class="p === page ? 'btn-primary' : 'btn-ghost'"
      @click="page = p"
    >
      {{ p }}
    </button>
  </div>
  
  <button 
    class="btn btn-primary btn-sm"
    :disabled="page >= pages"
    @click="page++"
  >
    Next
  </button>
</div>`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/misc/Pagination.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Pagination.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};

// For custom pagination demo
const customPage = ref(1);
const customPages = 10;
const visiblePages = computed(() => {
  const pages: number[] = [];
  const start = Math.max(1, customPage.value - 2);
  const end = Math.min(customPages, customPage.value + 2);
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Pagination" 
      description="Komponen navigasi halaman untuk data yang dipaginasi."
    />

    <!-- Download Component -->
    <section class="card p-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download Pagination.vue
        </button>
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      
      <div class="flex flex-col items-center gap-4">
        <Pagination 
          :page="currentPage" 
          :pages="totalPages" 
          @change="currentPage = $event" 
        />
        <p class="text-sm opacity-70">
          Current: <code class="code-inline">{{ currentPage }}</code> / {{ totalPages }}
        </p>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basic }}</code></pre>
      </div>
    </section>

    <!-- States Demo -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">States</h2>
      <p class="text-sm opacity-80">
        Pagination otomatis disable tombol Prev/Next sesuai posisi halaman.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="p-4 bg-base-200 rounded-box text-center">
          <p class="text-xs opacity-60 mb-2">First Page (Prev disabled)</p>
          <Pagination :page="1" :pages="10" @change="() => {}" />
        </div>
        <div class="p-4 bg-base-200 rounded-box text-center">
          <p class="text-xs opacity-60 mb-2">Middle Page</p>
          <Pagination :page="5" :pages="10" @change="() => {}" />
        </div>
        <div class="p-4 bg-base-200 rounded-box text-center">
          <p class="text-xs opacity-60 mb-2">Last Page (Next disabled)</p>
          <Pagination :page="10" :pages="10" @change="() => {}" />
        </div>
      </div>
    </section>

    <!-- With Table -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Table</h2>
      <p class="text-sm opacity-80">
        Contoh penggunaan dengan tabel data.
      </p>

      <div class="space-y-4">
        <!-- Items per page selector -->
        <div class="flex items-center gap-2">
          <span class="text-sm">Items per page:</span>
          <select 
            v-model="itemsPerPage" 
            class="select select-sm select-bordered w-20"
            @change="tablePage = 1"
          >
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="20">20</option>
          </select>
        </div>

        <!-- Table -->
        <div class="overflow-x-auto">
          <table class="table table-sm w-full">
            <thead class="bg-base-200">
              <tr>
                <th class="w-16">ID</th>
                <th>Name</th>
                <th class="w-24">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in paginatedItems" :key="item.id" class="hover:bg-base-200/50">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>
                  <span 
                    class="badge badge-sm"
                    :class="{
                      'badge-success': item.status === 'Active',
                      'badge-warning': item.status === 'Pending',
                      'badge-ghost': item.status === 'Inactive',
                    }"
                  >
                    {{ item.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-between">
          <span class="text-sm opacity-60">
            Showing {{ (tablePage - 1) * itemsPerPage + 1 }} - {{ Math.min(tablePage * itemsPerPage, allItems.length) }} of {{ allItems.length }}
          </span>
          <Pagination 
            :page="tablePage" 
            :pages="tablePages" 
            @change="tablePage = $event" 
          />
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.withTable, 'withTable')">
          {{ copiedId === 'withTable' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.withTable }}</code></pre>
      </div>
    </section>

    <!-- Custom Style -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Custom Pagination Style</h2>
      <p class="text-sm opacity-80">
        Contoh pagination dengan tombol nomor halaman.
      </p>

      <div class="flex justify-center">
        <div class="flex items-center gap-2">
          <button 
            class="btn btn-primary btn-sm"
            :disabled="customPage <= 1"
            @click="customPage--"
          >
            Prev
          </button>
          
          <button
            v-if="visiblePages[0] > 1"
            class="btn btn-ghost btn-sm"
            @click="customPage = 1"
          >
            1
          </button>
          <span v-if="visiblePages[0] > 2" class="px-1 opacity-50">...</span>
          
          <button 
            v-for="p in visiblePages" 
            :key="p"
            class="btn btn-sm"
            :class="p === customPage ? 'btn-primary' : 'btn-ghost'"
            @click="customPage = p"
          >
            {{ p }}
          </button>
          
          <span v-if="visiblePages[visiblePages.length - 1] < customPages - 1" class="px-1 opacity-50">...</span>
          <button
            v-if="visiblePages[visiblePages.length - 1] < customPages"
            class="btn btn-ghost btn-sm"
            @click="customPage = customPages"
          >
            {{ customPages }}
          </button>
          
          <button 
            class="btn btn-primary btn-sm"
            :disabled="customPage >= customPages"
            @click="customPage++"
          >
            Next
          </button>
        </div>
      </div>

      <p class="text-center text-sm opacity-60">Page {{ customPage }} of {{ customPages }}</p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.customStyle, 'customStyle')">
          {{ copiedId === 'customStyle' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.customStyle }}</code></pre>
      </div>
    </section>

    <!-- Props Reference -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props & Events</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Prop</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">page</code></td>
              <td class="px-4 py-2"><code class="code-inline">number</code></td>
              <td class="px-4 py-2">Current page number (1-based)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">pages</code></td>
              <td class="px-4 py-2"><code class="code-inline">number</code></td>
              <td class="px-4 py-2">Total number of pages</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="font-medium mt-4">Events</h3>
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
            <tr>
              <td class="px-4 py-2"><code class="code-inline">@change</code></td>
              <td class="px-4 py-2"><code class="code-inline">number</code></td>
              <td class="px-4 py-2">Emitted when page changes with new page number</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block mt-4">
        <button class="copy-btn" @click="copyCode(codes.props, 'props')">
          {{ copiedId === 'props' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.props }}</code></pre>
      </div>
    </section>

    <!-- Tips -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Tips</h2>
      
      <ul class="list-disc list-inside space-y-2 text-sm opacity-80">
        <li>Pagination menggunakan 1-based index (halaman pertama = 1)</li>
        <li>Responsive: menampilkan "<" / ">" di mobile, "Prev" / "Next" di desktop</li>
        <li>Tombol otomatis disabled saat di halaman pertama/terakhir</li>
        <li>Gunakan <code class="code-inline">computed</code> untuk menghitung total pages dari data</li>
        <li>Reset ke halaman 1 saat items per page berubah</li>
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
