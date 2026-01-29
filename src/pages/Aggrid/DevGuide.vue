<!-- src/pages/Aggrid/DevGuide.vue -->
<script setup lang="ts">
const downloadFile = async (filename: string) => {
  try {
    let fileUrl = "";

    // Cek file mana yang mau di-download
    if (filename === "aggrid-soft.css") {
      fileUrl = (await import("@/styles/aggrid-soft.css?raw")).default;
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
  <details class="card p-6 mt-10">
    <summary class="cursor-pointer text-sm font-medium">
      AG Grid – Dev Guide
    </summary>
    <div class="mt-3 rounded-xl border border-base-300 p-4 bg-base-200">
      <h3 class="text-lg font-semibold mb-2">AG Grid – Dev Guide (Standard)</h3>

      <div class="mb-4 p-3 bg-base-300 rounded-lg">
        <p class="text-sm font-medium mb-2">Downloads</p>
        <ul class="text-sm list-disc ml-5 space-y-1">
          <li>
            <a
              class="btn btn-accent btn-xs"
              href="javascript:;"
              rel="noopener"
              @click="downloadFile('aggrid-soft.css')"
              >aggrid-soft.css</a
            >
            → simpan ke <code>src/styles/aggrid-soft.css</code>
          </li>
          <li>
            <a
              class="btn btn-accent btn-xs"
              href="javascript:;"
              rel="noopener"
              @click="downloadFile('agTheme.ts')"
              >agTheme.ts</a
            >
            → simpan ke <code>src/styles/agTheme.ts</code>
          </li>
        </ul>
        <p class="text-xs opacity-70 mt-2">
          Catatan: di produk, tautkan ke file di repositori project kalian.
        </p>
      </div>

      <ol class="space-y-6 list-decimal ml-5">
        <li>
          <h4 class="font-semibold">Install</h4>
          <pre v-pre class="code"><code>npm i ag-grid-community ag-grid-vue3
# atau: yarn add ag-grid-community ag-grid-vue3
# atau: pnpm add ag-grid-community ag-grid-vue3</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Legacy Quartz Theme</h4>
          <pre v-pre class="code"><code>// ✅ Import base + theme
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// ❌ Hapus tema legacy lain kalau tidak dipakai:
// import 'ag-grid-community/styles/ag-theme-alpine.css'</code></pre>
        </li>

        <li>
          <h4 class="font-semibold">Struktur Modular</h4>
          <pre v-pre class="code"><code>src/
  styles/
    aggrid-soft.css
    agTheme.ts
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
import { AgGridVue } from 'ag-grid-vue3'
import '@/styles/aggrid-soft.css'
import { useAgDarkDetector, buildAgTheme, densityClassOf } from '@/styles/agTheme'

ModuleRegistry.registerModules([AllCommunityModule])</code></pre>
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
            <li>Error #106/#239: masih ada CSS legacy—hapus import-nya.</li>
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
