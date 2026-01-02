<!-- AGGridDemo.vue (v2.6) — Fixed header height; density applies to body rows only -->
<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import PageHeader from "@/components/PageHeader.vue";
import {
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import "@/styles/aggrid-soft.css";
import DevGuide from "./DevGuide.vue";
import { iconRegistry } from "@/composables/Icon";
ModuleRegistry.registerModules([AllCommunityModule]);

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
const densityClass = computed(() =>
  density.value === "compact"
    ? "agx-compact"
    : density.value === "spacious"
    ? "agx-spacious"
    : ""
);

/* -------------------------
   3) Theme builder (ikut isDark)
--------------------------*/
function buildTheme(
  dark: boolean,
  dens: typeof density.value,
  stripe: boolean
) {
  // header fixed, body row tinggi by density (step rapi)
  const rowH = dens === "compact" ? 25 : dens === "spacious" ? 48 : 40;
  const headH = 44;

  return themeQuartz.withParams({
    colorScheme: dark ? "dark" : "light",
    fontFamily:
      'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial, "Noto Sans"',
    fontSize: 15,
    rowHeight: rowH,
    headerHeight: headH,
    borderRadius: 12,

    // warna utama
    backgroundColor: dark ? "#0b1220" : "#ffffff",
    foregroundColor: dark ? "#e5e7eb" : "#111827",
    borderColor: dark ? "#374151" : "#E5E7EB",
    headerBackgroundColor: dark ? "#111827" : "#F8FAFC",
    headerForegroundColor: dark ? "#f3f4f6" : "#0F172A",
    rowHoverColor: dark ? "#1f2937" : "#F1F5F9",
    selectedRowBackgroundColor: dark ? "#0b2c5a" : "#EFF6FF",
    accentColor: dark ? "#60a5fa" : "#2563eb",
    inputBackgroundColor: dark ? "#0f172a" : "#ffffff",
    inputForegroundColor: dark ? "#e5e7eb" : "#111827",
    inputBorderColor: dark ? "#64748b" : "#cbd5e1",
    inputFocusBorderColor: dark ? "#93c5fd" : "#60a5fa",
    inputPlaceholderColor: dark ? "#94a3b8" : "#9ca3af",

    // striped lebih kontras
    oddRowBackgroundColor: stripe ? (dark ? "#0d1a33" : "#F3F4F6") : undefined,
  });
}
const gridTheme = computed(() =>
  buildTheme(isDark.value, density.value, striped.value)
);

// key untuk paksa re-mount saat dark/light ganti → theme apply bersih
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
const rowData = ref<Row[]>(
  Array.from({ length: 100 }, (_, i) => {
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
  })
);

const columnDefs = ref([
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

      watch(density, () =>
        api.value?.refreshCells({ columns: ["actions"], force: true })
      );

      root.append(
        mkBtn("warning", "Edit", "pencil"),
        mkBtn("error", "Hapus", "trash")
      );
      return root;
    },
  },
]);

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
  const rowH =
    density.value === "compact" ? 25 : density.value === "spacious" ? 48 : 40;
  api.value.setGridOption("rowHeight", rowH);
  api.value.resetRowHeights();
}
function onGridReady(params: any) {
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
}
watch(density, applyDensityToApi);
</script>

<template>
  <div class="space-y-6 flex-1 flex flex-col">
    <PageHeader 
      category="Mockup"
      title="AG Grid" 
      description="Contoh implementasi AG Grid dengan theme dan density controls."
    />

    <div class="flex flex-wrap items-center gap-3">
      <input type="text" placeholder="Search…" class="input w-64 max-w-full" />
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

    <AgGridVue
      :key="gridKey"
      :class="['agx', densityClass, 'w-full', 'flex-1', 'min-h-0']"
      :theme="gridTheme"
      :rowData="rowData"
      :columnDefs="columnDefs"
      :defaultColDef="defaultColDef"
      :gridOptions="gridOptions"
      @grid-ready="onGridReady"
    />
  </div>
  <DevGuide />
</template>
