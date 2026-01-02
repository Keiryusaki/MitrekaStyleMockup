<script setup lang="ts">
import { ref, computed } from "vue";
import DataTable from "@/components/data/DataTable.vue";
import { Icon } from "@/components/icons";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";
import "@/pages/Table/ag-like-skin.css";

const tocItems: TOCItem[] = [
  { id: 'download', label: 'Download Component' },
  { id: 'features', label: 'Features' },
  { id: 'basic', label: 'Basic Usage' },
  { id: 'full', label: 'Full Example' },
  { id: 'custom-cell', label: 'Custom Cell' },
  { id: 'toolbar', label: 'With Toolbar' },
  { id: 'actions', label: 'With Actions Column' },
  { id: 'als-style', label: 'ALS Table Style' },
  { id: 'props', label: 'Props Reference' },
  { id: 'slots', label: 'Available Slots' },
  { id: 'styling', label: 'Styling Reference' },
];

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Demo data
const headers = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "role", label: "Role" },
  { key: "status", label: "Status" },
];

const rows = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Viewer", status: "Pending" },
  { id: 6, name: "Diana Miller", email: "diana@example.com", role: "Admin", status: "Active" },
  { id: 7, name: "Edward Lee", email: "edward@example.com", role: "Editor", status: "Inactive" },
  { id: 8, name: "Fiona Clark", email: "fiona@example.com", role: "Viewer", status: "Active" },
  { id: 9, name: "George Hall", email: "george@example.com", role: "Editor", status: "Active" },
  { id: 10, name: "Hannah King", email: "hannah@example.com", role: "Viewer", status: "Pending" },
  { id: 11, name: "Ivan Scott", email: "ivan@example.com", role: "Admin", status: "Active" },
  { id: 12, name: "Julia Adams", email: "julia@example.com", role: "Editor", status: "Active" },
];

// Minimal demo data
const minimalHeaders = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "status", label: "Status" },
];

const minimalRows = [
  { id: 1, name: "Item A", status: "Active" },
  { id: 2, name: "Item B", status: "Inactive" },
  { id: 3, name: "Item C", status: "Active" },
];

// ALS Table data
const alsHeaders = [
  { key: "id", label: "ID" },
  { key: "code", label: "Code" },
  { key: "name", label: "Name" },
  { key: "category", label: "Category" },
  { key: "status", label: "Status" },
  { key: "actions", label: "Actions" },
];

const alsRows = [
  { id: 1, code: "PRD-001", name: "Product Alpha", category: "Electronics", status: "Active" },
  { id: 2, code: "PRD-002", name: "Product Beta", category: "Furniture", status: "Inactive" },
  { id: 3, code: "PRD-003", name: "Product Gamma", category: "Electronics", status: "Active" },
  { id: 4, code: "PRD-004", name: "Product Delta", category: "Clothing", status: "Pending" },
  { id: 5, code: "PRD-005", name: "Product Epsilon", category: "Electronics", status: "Active" },
  { id: 6, code: "PRD-006", name: "Product Zeta", category: "Furniture", status: "Draft" },
  { id: 7, code: "PRD-007", name: "Product Eta", category: "Clothing", status: "Active" },
  { id: 8, code: "PRD-008", name: "Product Theta", category: "Electronics", status: "Inactive" },
];

// ALS Native Table state
const alsPage = ref(1);
const alsPageSize = ref(5);
const alsSearch = ref("");

const alsFilteredRows = computed(() => {
  if (!alsSearch.value) return alsRows;
  const q = alsSearch.value.toLowerCase();
  return alsRows.filter(r => 
    r.code.toLowerCase().includes(q) ||
    r.name.toLowerCase().includes(q) ||
    r.category.toLowerCase().includes(q) ||
    r.status.toLowerCase().includes(q)
  );
});

const alsTotalPages = computed(() => Math.max(1, Math.ceil(alsFilteredRows.value.length / alsPageSize.value)));
const alsStart = computed(() => (alsPage.value - 1) * alsPageSize.value);
const alsEnd = computed(() => Math.min(alsFilteredRows.value.length, alsStart.value + alsPageSize.value));
const alsPagedRows = computed(() => alsFilteredRows.value.slice(alsStart.value, alsEnd.value));

const getStatusClass = (status: string) => {
  const map: Record<string, string> = {
    'Active': 'badge-success',
    'Inactive': 'badge-ghost',
    'Pending': 'badge-warning',
    'Draft': 'badge-info',
  };
  return map[status] || 'badge-ghost';
};

// Code snippets
const codes = {
  import: `import DataTable from "@/components/data/DataTable.vue";`,
  basic: `<DataTable :headers="headers" :rows="rows" />

<` + `script setup>
const headers = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
];

const rows = [
  { id: 1, name: "John", email: "john@example.com" },
  { id: 2, name: "Jane", email: "jane@example.com" },
];
</` + `script>`,
  pageSize: `<!-- Custom page size -->
<DataTable :headers="headers" :rows="rows" :page-size="5" />`,
  customCell: `<DataTable :headers="headers" :rows="rows">
  <!-- Custom cell untuk kolom 'status' -->
  <template #cell:status="{ row }">
    <span 
      class="badge badge-sm"
      :class="{
        'badge-success': row.status === 'Active',
        'badge-warning': row.status === 'Pending',
        'badge-ghost': row.status === 'Inactive',
      }"
    >
      {{ row.status }}
    </span>
  </template>
  
  <!-- Custom cell untuk kolom 'actions' -->
  <template #cell:actions="{ row }">
    <div class="flex gap-1">
      <button class="btn btn-warning btn-xs">Edit</button>
      <button class="btn btn-error btn-xs">Delete</button>
    </div>
  </template>
</DataTable>`,
  toolbar: `<DataTable :headers="headers" :rows="rows">
  <!-- Toolbar slot (di samping search) -->
  <template #toolbar>
    <button class="btn btn-success btn-sm">
      + Add New
    </button>
    <button class="btn btn-outline btn-sm">
      Export
    </button>
  </template>
</DataTable>`,
  props: `interface Header {
  key: string;   // Property key dari row object
  label: string; // Display label di header
}

interface Props {
  headers: Header[];  // Array definisi kolom
  rows: any[];        // Array data
  pageSize?: number;  // Items per page (default: 10)
}`,
  slots: `<!-- Named slots -->

<!-- Toolbar (sejajar dengan search input) -->
<template #toolbar>...</template>

<!-- Custom cell render (key = header.key) -->
<template #cell:columnKey="{ row }">...</template>`,
  alsTable: `<!-- Import ALS CSS -->
import "@/pages/Table/ag-like-skin.css";

<!-- Toolbar -->
<div class="als-toolbar">
  <input v-model="search" type="search" placeholder="Search..." class="input input-sm w-64" />
  <div class="als-toolbar__spacer"></div>
  <button class="btn btn-success btn-sm">+ Add</button>
</div>

<!-- ALS Table Card -->
<div class="als-card" data-als data-density="cozy">
  <div class="als-viewport" style="max-height: 400px;">
    <table>
      <thead>
        <tr>
          <th>No</th>
          <th>Code</th>
          <th>Name</th>
          <th>Status</th>
          <th data-col="actions">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in pagedRows" :key="row.id">
          <td>{{ row.id }}</td>
          <td><code>{{ row.code }}</code></td>
          <td>{{ row.name }}</td>
          <td><span class="badge badge-sm" :class="statusClass">{{ row.status }}</span></td>
          <td data-col="actions">
            <div class="flex items-center justify-end gap-1">
              <button class="icon-btn icon-btn-soft-info icon-btn-sm"><Icon name="eye" class="w-4 h-4" /></button>
              <button class="icon-btn icon-btn-soft-warning icon-btn-sm"><Icon name="pencil" class="w-4 h-4" /></button>
              <button class="icon-btn icon-btn-soft-error icon-btn-sm"><Icon name="trash" class="w-4 h-4" /></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Footer -->
  <div class="als-footer">
    <div class="als-footer__left">Page Size: <select>...</select></div>
    <div class="als-footer__center">1 - 10 of 50</div>
    <div class="als-footer__right als-pagination">
      <button class="als-btn">« First</button>
      <button class="als-btn">‹ Prev</button>
      <button class="als-btn">Next ›</button>
      <button class="als-btn">Last »</button>
    </div>
  </div>
</div>`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/data/DataTable.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "DataTable.vue";
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
      title="DataTable" 
      description="Komponen tabel lengkap dengan search, pagination, dan custom cell rendering."
    />

    <!-- Download Component -->
    <section id="download" class="card p-4 scroll-mt-20">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download DataTable.vue
        </button>
      </div>
    </section>

    <!-- Features -->
    <section id="features" class="card p-6 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2 mb-4">Features</h2>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="text-center p-3 bg-base-200 rounded-box">
          <div class="text-2xl mb-1">🔍</div>
          <div class="text-sm font-medium">Search</div>
          <div class="text-xs opacity-60">Filter semua kolom</div>
        </div>
        <div class="text-center p-3 bg-base-200 rounded-box">
          <div class="text-2xl mb-1">📄</div>
          <div class="text-sm font-medium">Pagination</div>
          <div class="text-xs opacity-60">Built-in navigation</div>
        </div>
        <div class="text-center p-3 bg-base-200 rounded-box">
          <div class="text-2xl mb-1">🎨</div>
          <div class="text-sm font-medium">Custom Cells</div>
          <div class="text-xs opacity-60">Slot per kolom</div>
        </div>
        <div class="text-center p-3 bg-base-200 rounded-box">
          <div class="text-2xl mb-1">📱</div>
          <div class="text-sm font-medium">Responsive</div>
          <div class="text-xs opacity-60">Scroll horizontal</div>
        </div>
      </div>
    </section>

    <!-- Basic Usage -->
    <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      <p class="text-sm opacity-80">
        Cukup pass <code class="code-inline">headers</code> dan <code class="code-inline">rows</code>.
        Search dan pagination otomatis.
      </p>

      <DataTable :headers="minimalHeaders" :rows="minimalRows" />

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basic }}</code></pre>
      </div>
    </section>

    <!-- Full Example -->
    <section id="full" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Full Example</h2>
      <p class="text-sm opacity-80">
        Dengan 12 rows, page size 5, dan custom cell rendering untuk status.
      </p>

      <DataTable :headers="headers" :rows="rows" :page-size="5">
        <template #cell:status="{ row }">
          <span 
            class="badge badge-sm"
            :class="{
              'badge-success': row.status === 'Active',
              'badge-warning': row.status === 'Pending',
              'badge-ghost': row.status === 'Inactive',
            }"
          >
            {{ row.status }}
          </span>
        </template>
        <template #cell:role="{ row }">
          <span class="badge badge-soft-primary badge-sm">{{ row.role }}</span>
        </template>
      </DataTable>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.pageSize, 'pageSize')">
          {{ copiedId === 'pageSize' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.pageSize }}</code></pre>
      </div>
    </section>

    <!-- Custom Cell -->
    <section id="custom-cell" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Custom Cell Rendering</h2>
      <p class="text-sm opacity-80">
        Gunakan slot <code class="code-inline">#cell:columnKey</code> untuk custom render.
        Slot menerima <code class="code-inline">{ row }</code> sebagai prop.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.customCell, 'customCell')">
          {{ copiedId === 'customCell' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.customCell }}</code></pre>
      </div>
    </section>

    <!-- With Toolbar -->
    <section id="toolbar" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Toolbar</h2>
      <p class="text-sm opacity-80">
        Tambahkan action buttons di toolbar menggunakan slot <code class="code-inline">#toolbar</code>.
      </p>

      <DataTable :headers="minimalHeaders" :rows="minimalRows">
        <template #toolbar>
          <button class="btn btn-success btn-sm">+ Add New</button>
          <button class="btn btn-outline btn-sm">Export</button>
        </template>
        <template #cell:status="{ row }">
          <span class="badge badge-sm" :class="row.status === 'Active' ? 'badge-success' : 'badge-ghost'">
            {{ row.status }}
          </span>
        </template>
      </DataTable>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.toolbar, 'toolbar')">
          {{ copiedId === 'toolbar' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.toolbar }}</code></pre>
      </div>
    </section>

    <!-- With Actions Column -->
    <section id="actions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Actions Column</h2>
      <p class="text-sm opacity-80">
        Tambahkan kolom actions untuk edit/delete buttons.
      </p>

      <DataTable 
        :headers="[...minimalHeaders, { key: 'actions', label: 'Actions' }]" 
        :rows="minimalRows"
      >
        <template #cell:status="{ row }">
          <span 
            class="badge badge-sm"
            :class="row.status === 'Active' ? 'badge-success' : 'badge-ghost'"
          >
            {{ row.status }}
          </span>
        </template>
        <template #cell:actions>
          <div class="flex items-center justify-end gap-1">
            <button class="icon-btn icon-btn-soft-warning icon-btn-sm" title="Edit">
              <Icon name="pencil" class="w-4 h-4" />
            </button>
            <button class="icon-btn icon-btn-soft-error icon-btn-sm" title="Delete">
              <Icon name="trash" class="w-4 h-4" />
            </button>
          </div>
        </template>
      </DataTable>
    </section>

    <!-- ALS Table Style -->
    <section id="als-style" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">ALS Table Style (Recommended)</h2>
      <p class="text-sm opacity-80">
        Standard table styling yang konsisten dengan AG-Grid. Gunakan skin ALS untuk tampilan yang sama.
      </p>

      <!-- ALS Native Table -->
      <div>
        <!-- Toolbar -->
        <div class="als-toolbar">
          <input 
            v-model="alsSearch" 
            type="search" 
            placeholder="Search..." 
            class="input input-sm w-64"
            @input="alsPage = 1"
          />
          <div class="als-toolbar__spacer"></div>
          <button class="btn btn-success btn-sm">+ Add Product</button>
          <button class="btn btn-outline btn-sm">Export</button>
        </div>

        <!-- Table Card -->
        <div class="als-card" data-als data-density="cozy">
          <div class="als-viewport" style="max-height: 320px;">
            <table>
              <thead>
                <tr>
                  <th style="width: 60px;">No</th>
                  <th style="width: 100px;">Code</th>
                  <th>Name</th>
                  <th style="width: 120px;">Category</th>
                  <th style="width: 100px;">Status</th>
                  <th data-col="actions">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in alsPagedRows" :key="row.id">
                  <td>{{ alsStart + idx + 1 }}</td>
                  <td><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">{{ row.code }}</code></td>
                  <td>{{ row.name }}</td>
                  <td><span class="badge badge-soft-primary badge-sm">{{ row.category }}</span></td>
                  <td><span class="badge badge-sm" :class="getStatusClass(row.status)">{{ row.status }}</span></td>
                  <td data-col="actions">
                    <div class="flex items-center justify-end gap-1">
                      <button class="icon-btn icon-btn-soft-info icon-btn-sm" title="View">
                        <Icon name="eye" class="w-4 h-4" />
                      </button>
                      <button class="icon-btn icon-btn-soft-warning icon-btn-sm" title="Edit">
                        <Icon name="pencil" class="w-4 h-4" />
                      </button>
                      <button class="icon-btn icon-btn-soft-error icon-btn-sm" title="Delete">
                        <Icon name="trash" class="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
                <tr v-if="!alsPagedRows.length">
                  <td colspan="6" class="text-center py-8 opacity-60">No data found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Footer -->
          <div class="als-footer">
            <div class="als-footer__left">
              <span>Page Size:</span>
              <select v-model="alsPageSize" class="select select-sm select-bordered w-16" @change="alsPage = 1">
                <option :value="5">5</option>
                <option :value="10">10</option>
                <option :value="25">25</option>
              </select>
            </div>
            <div class="als-footer__center">
              <span>{{ alsStart + 1 }} - {{ alsEnd }} of {{ alsFilteredRows.length }}</span>
            </div>
            <div class="als-footer__right als-pagination">
              <button class="als-btn" :disabled="alsPage === 1" @click="alsPage = 1">« First</button>
              <button class="als-btn" :disabled="alsPage === 1" @click="alsPage--">‹ Prev</button>
              <button class="als-btn" :disabled="alsPage >= alsTotalPages" @click="alsPage++">Next ›</button>
              <button class="als-btn" :disabled="alsPage >= alsTotalPages" @click="alsPage = alsTotalPages">Last »</button>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.alsTable, 'alsTable')">
          {{ copiedId === 'alsTable' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.alsTable }}</code></pre>
      </div>
    </section>

    <!-- Props Reference -->
    <section id="props" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props</h2>

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
              <td class="px-4 py-2"><code class="code-inline">headers</code></td>
              <td class="px-4 py-2"><code class="code-inline">Header[]</code></td>
              <td class="px-4 py-2">required</td>
              <td class="px-4 py-2">Array definisi kolom ({ key, label })</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">rows</code></td>
              <td class="px-4 py-2"><code class="code-inline">any[]</code></td>
              <td class="px-4 py-2">required</td>
              <td class="px-4 py-2">Array data untuk ditampilkan</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">pageSize</code></td>
              <td class="px-4 py-2"><code class="code-inline">number</code></td>
              <td class="px-4 py-2">10</td>
              <td class="px-4 py-2">Jumlah rows per halaman</td>
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

    <!-- Slots Reference -->
    <section id="slots" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Slots</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Slot</th>
              <th class="px-4 py-2 text-left">Props</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#toolbar</code></td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Area toolbar di samping search input</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#cell:key</code></td>
              <td class="px-4 py-2"><code class="code-inline">{ row }</code></td>
              <td class="px-4 py-2">Custom render untuk kolom dengan key tertentu</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="code-block mt-4">
        <button class="copy-btn" @click="copyCode(codes.slots, 'slots')">
          {{ copiedId === 'slots' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.slots }}</code></pre>
      </div>
    </section>

    <!-- Comparison -->
    <section id="styling" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">DataTable vs Table vs AG-Grid</h2>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Feature</th>
              <th class="px-4 py-2 text-center">DataTable</th>
              <th class="px-4 py-2 text-center">CSS Table</th>
              <th class="px-4 py-2 text-center">AG-Grid</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2">Built-in Search</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
              <td class="px-4 py-2 text-center opacity-50">-</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
            </tr>
            <tr>
              <td class="px-4 py-2">Built-in Pagination</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
              <td class="px-4 py-2 text-center opacity-50">-</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
            </tr>
            <tr>
              <td class="px-4 py-2">Custom Cell Slots</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
            </tr>
            <tr>
              <td class="px-4 py-2">Sorting</td>
              <td class="px-4 py-2 text-center opacity-50">-</td>
              <td class="px-4 py-2 text-center opacity-50">-</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
            </tr>
            <tr>
              <td class="px-4 py-2">Column Resize</td>
              <td class="px-4 py-2 text-center opacity-50">-</td>
              <td class="px-4 py-2 text-center opacity-50">-</td>
              <td class="px-4 py-2 text-center text-success">✓</td>
            </tr>
            <tr>
              <td class="px-4 py-2">Bundle Size</td>
              <td class="px-4 py-2 text-center">~2KB</td>
              <td class="px-4 py-2 text-center">0KB</td>
              <td class="px-4 py-2 text-center">~300KB</td>
            </tr>
            <tr>
              <td class="px-4 py-2">Best For</td>
              <td class="px-4 py-2 text-center text-xs">Simple tables</td>
              <td class="px-4 py-2 text-center text-xs">Static data</td>
              <td class="px-4 py-2 text-center text-xs">Complex data</td>
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
