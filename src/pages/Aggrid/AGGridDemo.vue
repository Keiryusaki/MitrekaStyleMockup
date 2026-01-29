<!-- AGGridDemo.vue (v2.6) — Fixed header height; density applies to body rows only -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import PageHeader from "@/components/PageHeader.vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/aggrid-soft.css";
import DevGuide from "./DevGuide.vue";
import { iconRegistry } from "@/composables/Icon";

/* -------------------------
   1) Dark/Light detector INLINE (khusus AG Grid)
--------------------------*/
const isDark = ref(false);
let htmlObs: MutationObserver | null = null;

const computeDark = () => {
  const html = document.documentElement;
  const byClass = html.classList.contains("dark");
  const byData =
    (html.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
  isDark.value = byClass || byData;
};

onMounted(() => {
  computeDark();
  htmlObs = new MutationObserver(computeDark);
  htmlObs.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });
});
onBeforeUnmount(() => htmlObs?.disconnect());

/* -------------------------
   2) Density & Striped controls (punyamu)
--------------------------*/
const density = ref<"compact" | "cozy" | "spacious">("cozy");
const striped = ref(true);
const search = ref("");
const densityClass = computed(() =>
  density.value === "compact"
    ? "agx-compact"
    : density.value === "spacious"
    ? "agx-spacious"
    : ""
);
const themeClass = computed(() =>
  isDark.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"
);
const minRows = 10;
const headerHeight = 44;
const paginationHeight = 56;
const rowHeightOf = (dens = density.value) =>
  dens === "compact" ? 25 : dens === "spacious" ? 48 : 40;
const minGridHeight = computed(
  () => headerHeight + rowHeightOf() * minRows + paginationHeight
);
// key untuk paksa re-mount saat dark/light ganti
const gridKey = computed(
  () => `${isDark.value ? "dark" : "light"}|${density.value}|${striped.value}`
);

/* -------------------------
   4) Data/columns/options (contoh ringkas)
--------------------------*/
type Row = {
  id: number;
  no: number;
  code: string;
  name: string;
  description: string;
};
const names = [
  "Alpha",
  "Bravo",
  "Charlie",
  "Delta",
  "Echo",
  "Foxtrot",
  "Golf",
  "Hotel",
  "India",
  "Juliet",
];
const rowData: Row[] = Array.from({ length: 100 }, (_, i) => {
  const n = i + 1,
    nm = names[i % names.length],
    ch = String.fromCharCode(65 + (i % 26));
  return {
    id: n,
    no: n,
    code: i % 2 === 0 ? ch : ch + ch,
    name: nm,
    description: `${nm} description #${n}`,
  };
});

const columnDefs = [
  // pakai rowSelection di gridOptions, jadi kolom select gak usah difilter
  {
    field: "no",
    headerName: "No",
    maxWidth: 90,
    filter: "agNumberColumnFilter",
    pinned: "left",
    lockPinned: true,
    lockPosition: true,
  },
  {
    field: "code",
    headerName: "Code",
    filter: "agTextColumnFilter",
    pinned: "left",
    lockPinned: true,
    lockPosition: true,
  },
  { field: "name", headerName: "Name", filter: "agTextColumnFilter" },
  {
    field: "description",
    headerName: "Description",
    filter: "agTextColumnFilter",
  },
  {
    headerName: "Actions",
    colId: "actions",
    pinned: "right",
    maxWidth: 160,
    suppressHeaderMenuButton: true,
    sortable: false,
    filter: false,
    cellRenderer: (params: any) => {
      const root = document.createElement("div");
      root.className = "flex items-center justify-end gap-2 h-full";

      const toSvg = (name: keyof typeof iconRegistry) =>
        (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

      const sizeClass =
        density.value === "compact"
          ? "icon-btn-xs"
          : density.value === "spacious"
          ? "icon-btn-md"
          : "icon-btn-sm";

      const mkBtn = (variant: string, title: string, iconName: keyof typeof iconRegistry) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = `icon-btn icon-btn-solid-${variant} ${sizeClass}`;
        b.title = title;
        b.innerHTML = toSvg(iconName);
        b.addEventListener("click", (e) => e.stopPropagation());
        return b;
      };

      root.append(
        mkBtn("warning", "Edit", "pencil"),
        mkBtn("error", "Hapus", "trash")
      );
      return root;
    },
  },
];

const defaultColDef = {
  flex: 1,
  minWidth: 140,
  resizable: true,
  sortable: true,
  filter: true,
  floatingFilter: true,
};

const gridOptions: any = {
  animateRows: true,
  // v34: selection column + matikan filter di sana
  rowSelection: {
    mode: "multiRow",
    checkboxes: true,
    headerCheckbox: true,
    selectionColumn: {
      pinned: "left",
      width: 56,
      resizable: false,
      suppressHeaderFilterButton: true,
      filter: false,
      floatingFilter: false,
    },
  },
  pagination: true,
  paginationPageSize: 50,
  paginationPageSizeSelector: [50, 100],
};

/* Apply density → hanya rowHeight; header fixed */
const api = ref<any>(null);
function applyDensityToApi() {
  if (!api.value) return;
  const rowH = rowHeightOf();
  api.value.setGridOption("rowHeight", rowH);
  api.value.resetRowHeights();
}
const exportCsv = () => {
  api.value?.exportDataAsCsv({ fileName: "aggrid-export.csv" });
};

function onGridReady(params: any) {
  api.value = params.api;
  // pastikan urutan kolom
  params.api.applyColumnState({
    state: [
      { colId: "ag-Grid-SelectionColumn", pinned: "left" },
      { colId: "no", pinned: "left" },
      { colId: "code", pinned: "left" },
      // lainnya biarkan default
    ],
    applyOrder: true,
  });
  applyDensityToApi();
  params.api.setGridOption("quickFilterText", search.value);
}
watch(density, () => {
  applyDensityToApi();
  api.value?.refreshCells({ columns: ["actions"], force: true });
});
watch(search, (value) => {
  api.value?.setGridOption("quickFilterText", value);
});
</script>

<template>
  <div class="space-y-6 flex-1 flex flex-col">
    <PageHeader 
      category="Mockup"
      title="AG Grid" 
      description="Contoh implementasi AG Grid dengan theme dan density controls."
    />

    <div class="flex flex-wrap items-center gap-3">
      <div class="flex items-center gap-2 w-full sm:w-auto">
        <input
          v-model="search"
          type="text"
          placeholder="Search..."
          class="input w-64 max-w-full"
        />
        <button
          class="btn btn-ghost btn-sm"
          type="button"
          :disabled="!search"
          @click="search = ''"
        >
          Clear
        </button>
      </div>
      <button class="btn btn-outline btn-sm" type="button" @click="exportCsv">
        Export CSV
      </button>
      <div class="flex items-center gap-2">
        <span class="text-sm opacity-70">Density</span>
        <SelectDropdown
          v-model="density"
          :options="[
            { value: 'compact', label: 'Compact' },
            { value: 'cozy', label: 'Cozy' },
            { value: 'spacious', label: 'Spacious' },
          ]"
          size="sm"
          variant="outline"
        />
      </div>
      <label class="flex items-center gap-2 text-sm cursor-pointer">
        <input type="checkbox" v-model="striped" />
        <span>Striped</span>
      </label>
    </div>

    <div
      class="w-full"
      :style="{ minHeight: `${minGridHeight}px`, height: '80vh' }"
    >
      <AgGridVue
        :key="gridKey"
        :class="['agx', themeClass, densityClass, 'w-full', 'h-full', 'min-h-0']"
        theme="legacy"
        :style="{
          '--ag-odd-row-background-color': striped
            ? isDark
              ? '#0d1a33'
              : '#F3F4F6'
            : 'transparent',
        }"
        :rowData="rowData"
        :columnDefs="columnDefs"
        :defaultColDef="defaultColDef"
        :gridOptions="gridOptions"
        @grid-ready="onGridReady"
      />
    </div>
  </div>
  <DevGuide />
</template>
