<!-- src/pages/Aggrid/DevGuide.vue -->
<script setup lang="ts">
const downloadFile = async (filename: string) => {
  try {
    let fileUrl = "";

    // Cek file mana yang mau di-download
    if (filename === "aggrid.css") {
      fileUrl = (await import("@/lib/mitreka-ui/plugins/aggrid.css?raw")).default;
    } else if (filename === "agTheme.ts") {
      fileUrl = (await import("@/styles/agTheme.ts?raw")).default;
    } else {
      console.error("File not found");
      return;
    }

    // Buat blob lalu trigger download
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>

<template>
  <details class="card p-6 mt-10 min-w-0">
    <summary class="cursor-pointer text-sm font-medium">
      AG Grid - Dev Guide
    </summary>
    <div class="mt-3 rounded-xl border border-base-300 p-4 bg-base-200 min-w-0">
      <h3 class="text-lg font-semibold mb-2">AG Grid - Dev Guide (Standard)</h3>

      <div class="mb-4 p-3 bg-base-300 rounded-lg">
        <p class="text-sm font-medium mb-2">Downloads</p>
        <ul class="text-sm list-disc ml-5 space-y-1">
          <li>
            <a
              class="btn btn-accent btn-xs"
              href="javascript:;"
              rel="noopener"
              @click="downloadFile('aggrid.css')"
              >aggrid.css</a
            >
            -> simpan ke <code>src/lib/mitreka-ui/plugins/aggrid.css</code>
          </li>
          <li>
            <a
              class="btn btn-accent btn-xs"
              href="javascript:;"
              rel="noopener"
              @click="downloadFile('agTheme.ts')"
              >agTheme.ts</a
            >
            -> simpan ke <code>src/styles/agTheme.ts</code>
          </li>
        </ul>
        <p class="text-xs opacity-70 mt-2">
          Catatan: di produk, tautkan ke file di repositori project kalian.
        </p>
      </div>

      <ol class="space-y-6 list-decimal ml-5">
        <li>
          <h4 class="font-semibold">Install</h4>
          <pre v-pre class="code"><code>npm i ag-grid-community ag-grid-vue3 @keiryusaki/mitreka-ui
# atau: yarn add ag-grid-community ag-grid-vue3 @keiryusaki/mitreka-ui
# atau: pnpm add ag-grid-community ag-grid-vue3 @keiryusaki/mitreka-ui</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Legacy Quartz Theme</h4>
          <pre v-pre class="code"><code>// [OK] Import base + theme
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// [REMOVE] Hapus tema legacy lain kalau tidak dipakai:
// import 'ag-grid-community/styles/ag-theme-alpine.css'</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Struktur Modular</h4>
          <pre v-pre class="code"><code>src/
  lib/mitreka-ui/plugins/aggrid.css
  styles/agTheme.ts
  pages/Aggrid/
    AGGridDemo.vue
    DevGuide.vue</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Import di Halaman</h4>
          <pre
            v-pre
            class="code"
          ><code>import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community'
import { AgGridSurface } from '@keiryusaki/mitreka-ui/vue'
import '@keiryusaki/mitreka-ui/css/plugins/aggrid.css'

ModuleRegistry.registerModules([AllCommunityModule])

&lt;AgGridSurface
  :rowData="rowData"
  :columnDefs="columnDefs"
  :gridOptions="gridOptions"
  :autoRowHeight="false"
/&gt;</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Dark/Light &amp; Density</h4>
          <p class="text-sm opacity-80">
            Dark mendeteksi <code>&lt;html class="dark"&gt;</code> atau
            <code>data-theme="mitrekadark"</code>. Header fixed 44px, body row
            mengikuti density (25/40/48).
          </p>
        </li>

        <li>
          <h4 class="font-semibold">Parameter Height Otomatis</h4>
          <p class="text-sm opacity-80">
            Default behavior: jika row di bawah threshold maka
            <code>autoHeight</code>, jika sama/di atas threshold maka
            <code>normal</code> dengan tinggi container yang bisa diatur.
          </p>
          <pre v-pre class="code"><code>&lt;AgGridSurface
  :rowData="rows"
  :columnDefs="cols"
  :autoHeightWhenFewRows="true"
  :autoHeightThreshold="15"
  normalLayoutHeight="80vh"
/&gt;</code></pre>
          <ul class="text-sm list-disc ml-4">
            <li><code>autoHeightWhenFewRows</code>: aktif/nonaktif logika otomatis.</li>
            <li><code>autoHeightThreshold</code>: batas jumlah row (default 15).</li>
            <li><code>normalLayoutHeight</code>: tinggi mode normal (default <code>80vh</code>).</li>
          </ul>
        </li>

        <li>
          <h4 class="font-semibold">Pemisah Kolom Per Bulan</h4>
          <p class="text-sm opacity-80">
            Untuk tabel model bulanan (Rencana/Realisasi), gunakan flag page-level
            agar border pemisah bulan bisa on/off tanpa memengaruhi tabel lain.
          </p>
          <pre v-pre class="code"><code>const enableBudgetMonthSeparator = ref(true)

const columnDefs = computed(() => [
  {
    headerName: '2026',
    children: months.map((month, idx) => ({
      headerName: month,
      headerClass: enableBudgetMonthSeparator.value ? 'pcf-month-sep-group' : undefined,
      children: [
        { field: `plan${idx + 1}`, headerName: 'Rencana' },
        {
          field: `actual${idx + 1}`,
          headerName: 'Realisasi',
          headerClass: enableBudgetMonthSeparator.value ? 'pcf-month-sep' : undefined,
          cellClass: enableBudgetMonthSeparator.value
            ? 'ag-right-aligned-cell pcf-month-sep'
            : 'ag-right-aligned-cell',
        },
      ],
    })),
  },
])</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Compare Rows (Perbandingan)</h4>
          <p class="text-sm opacity-80">
            Tambahkan metadata <code>compareBlock</code> + <code>compareTheme</code>
            pada row, lalu pakai helper <code>createCompareRowClassRules</code>.
          </p>
          <pre v-pre class="code"><code>import { createCompareRowClassRules } from '@/composables/useCompareRows'

const rowClassRules = {
  ...baseRowClassRules,
  ...createCompareRowClassRules({ defaultTheme: 'success' }),
}

// Contoh row
{
  item: 'Realisasi/Bln',
  compareBlock: 'realized',
  compareRole: 'row',
  compareTheme: 'success',
}</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Quick Filter &amp; Export</h4>
          <pre
            v-pre
            class="code"
          ><code>api.value?.setGridOption('quickFilterText', searchValue)
api.value?.exportDataAsCsv({ fileName: 'data.csv' })</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Troubleshooting</h4>
          <ul class="text-sm list-disc ml-4">
            <li>Error #106/#239: masih ada CSS legacy - hapus import-nya.</li>
            <li>
              Selection column tidak di kiri: pakai
              <code>applyColumnState</code> + <code>pinned:'left'</code>.
            </li>
            <li>Dataset besar: pertimbangkan Server-Side Row Model.</li>
          </ul>
        </li>
      </ol>
    </div>
  </details>
</template>

<style scoped>
.code {
  display: block;
  max-width: 100%;
  overflow-x: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  word-break: break-word;
}
</style>

