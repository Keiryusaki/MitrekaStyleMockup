<!-- ProjectBudgeting.vue -->
<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, nextTick } from "vue";
import { AgGridVue } from "ag-grid-vue3";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import PageHeader from "@/components/PageHeader.vue";
import Tooltip from "@/components/Tooltip.vue";
import { attachPinnedShadowsToElement } from "@/composables/useAgGridPinnedShadows";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/styles/aggrid-soft.css";

type BudgetRow = {
  id: number;
  no: number;
  customer: string;
  project: string;
  nilai: number;
  ppn: number;
  pph: number;
  netSales: number;
  budgetPlan: number;
  estProfit: number;
  estPct: number;
};
type TimelineRow = {
  id: number;
  no: number;
  customer: string;
  project: string;
  nilai: number;
  budgetPlan: number;
  budgetByTime: number;
  selisih: number;
};

const isDark = ref(false);
let htmlObs: MutationObserver | null = null;
const pinnedShadowCleanups: Array<() => void> = [];
const valueGridWrap = ref<HTMLElement | null>(null);
const timelineGridWrap = ref<HTMLElement | null>(null);

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
onBeforeUnmount(() => {
  htmlObs?.disconnect();
  pinnedShadowCleanups.splice(0).forEach((cleanup) => cleanup());
});

const density = ref<"compact" | "cozy" | "spacious">("compact");
const striped = ref(true);
const activeTab = ref<"value" | "timeline">("value");

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

const headerHeight = 44;
const paginationHeight = 56;
const minRows = 8;
const rowHeightOf = (dens = density.value) =>
  dens === "compact" ? 26 : dens === "spacious" ? 48 : 40;
const minGridHeight = computed(
  () => headerHeight + rowHeightOf() * minRows + paginationHeight
);

const yearOptions = [
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];
const monthOptions = [
  { value: "all", label: "Bulan" },
  { value: "01", label: "Januari" },
  { value: "02", label: "Februari" },
  { value: "03", label: "Maret" },
  { value: "04", label: "April" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Juni" },
  { value: "07", label: "Juli" },
  { value: "08", label: "Agustus" },
  { value: "09", label: "September" },
  { value: "10", label: "Oktober" },
  { value: "11", label: "November" },
  { value: "12", label: "Desember" },
];
const statusOptions = [
  { value: "all", label: "Status" },
  { value: "active", label: "Active" },
  { value: "pending", label: "Pending" },
  { value: "closed", label: "Closed" },
];
const customerOptions = [
  { value: "all", label: "Customer" },
  { value: "jasa-marga", label: "Jasa Marga" },
  { value: "kemenkumham", label: "Kemenkumham" },
  { value: "aceh", label: "ACEH" },
  { value: "kemenlu", label: "Kemenlu" },
];
const contractorOptions = [
  { value: "all", label: "Contractor" },
  { value: "mitreka", label: "Mitreka" },
  { value: "partner-a", label: "Partner A" },
  { value: "partner-b", label: "Partner B" },
];

const selectedYear = ref("2026");
const selectedMonth = ref("all");
const selectedStatus = ref("all");
const selectedCustomer = ref("all");
const selectedContractor = ref("all");

const fmt = new Intl.NumberFormat("id-ID");
const fmtPct = (v: number) =>
  `${new Intl.NumberFormat("id-ID", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(v)}%`;

const makeRows = (count = 12): BudgetRow[] => {
  const customers = ["Jasa Marga", "Kemenkumham", "ACEH", "Kemenlu", "Telkom"];
  const projects = [
    "2025-Jasamarga - Konsultan TI",
    "2025-ASABRI - ASABRI Mobile",
    "2026-TES utk cek fitur",
    "2026-KEMENLU - Paket Pekerjaan Integrasi Data dan Layanan Publik Digital",
    "2026-TELKOM - Revamp Platform Customer Experience untuk Multi Channel Support",
  ];

  return Array.from({ length: count }, (_, i) => {
    const base = 550000000 + Math.round(Math.random() * 1600000000);
    const ppn = Math.round(base * 0.1);
    const pph = Math.round(base * 0.018);
    const netSales = base - ppn - pph;
    const budgetPlan = Math.round(base * (0.22 + Math.random() * 0.18));
    const estProfit = netSales - budgetPlan;
    const estPct = netSales > 0 ? (estProfit / netSales) * 100 : 0;
    return {
      id: i + 1,
      no: i + 1,
      customer: customers[i % customers.length],
      project: projects[i % projects.length],
      nilai: base,
      ppn,
      pph,
      netSales,
      budgetPlan,
      estProfit,
      estPct,
    };
  });
};

const rowData = ref<BudgetRow[]>(makeRows(16));

const totals = computed(() => {
  return rowData.value.reduce(
    (acc, row) => {
      acc.nilai += row.nilai;
      acc.ppn += row.ppn;
      acc.pph += row.pph;
      acc.netSales += row.netSales;
      acc.budgetPlan += row.budgetPlan;
      acc.estProfit += row.estProfit;
      return acc;
    },
    {
      nilai: 0,
      ppn: 0,
      pph: 0,
      netSales: 0,
      budgetPlan: 0,
      estProfit: 0,
      estPct: 0,
    }
  );
});
const estPctTotal = computed(() =>
  totals.value.netSales > 0
    ? (totals.value.estProfit / totals.value.netSales) * 100
    : 0
);

const timelineRowData = computed<TimelineRow[]>(() =>
  rowData.value.map((row) => {
    const budgetByTime = Math.max(
      0,
      Math.round(row.budgetPlan * (0.4 + Math.random() * 0.4))
    );
    return {
      id: row.id,
      no: row.no,
      customer: row.customer,
      project: row.project,
      nilai: row.nilai,
      budgetPlan: row.budgetPlan,
      budgetByTime,
      selisih: row.budgetPlan - budgetByTime,
    };
  })
);

const timelineTotals = computed(() => {
  return timelineRowData.value.reduce(
    (acc, row) => {
      acc.nilai += row.nilai;
      acc.budgetPlan += row.budgetPlan;
      acc.budgetByTime += row.budgetByTime;
      acc.selisih += row.selisih;
      return acc;
    },
    { nilai: 0, budgetPlan: 0, budgetByTime: 0, selisih: 0 }
  );
});

const columnDefs = [
  {
    field: "no",
    headerName: "No",
    maxWidth: 90,
    pinned: "left",
    lockPinned: true,
    filter: "agNumberColumnFilter",
  },
  { field: "customer", headerName: "Customer", filter: "agTextColumnFilter" },
  {
    field: "project",
    headerName: "Project",
    filter: "agTextColumnFilter",
    wrapText: true,
    autoHeight: true,
    cellStyle: { whiteSpace: "normal", lineHeight: "1.3" },
  },
  {
    field: "nilai",
    headerName: "Nilai",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "ppn",
    headerName: "PPN",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "pph",
    headerName: "PPh",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "netSales",
    headerName: "Net Sales",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "budgetPlan",
    headerName: "Budget Plan",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "estProfit",
    headerName: "Est. Profit",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "estPct",
    headerName: "% Est.",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmtPct(p.value ?? 0),
  },
];

const timelineColumnDefs = [
  {
    field: "no",
    headerName: "No",
    maxWidth: 90,
    pinned: "left",
    lockPinned: true,
    filter: "agNumberColumnFilter",
  },
  { field: "customer", headerName: "Customer", filter: "agTextColumnFilter" },
  {
    field: "project",
    headerName: "Project",
    filter: "agTextColumnFilter",
    wrapText: true,
    autoHeight: true,
    cellStyle: { whiteSpace: "normal", lineHeight: "1.3" },
  },
  {
    field: "nilai",
    headerName: "Nilai",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "budgetPlan",
    headerName: "Budget Plan",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "budgetByTime",
    headerName: "Budget By Time",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
  {
    field: "selisih",
    headerName: "Selisih",
    filter: "agNumberColumnFilter",
    cellClass: "ag-right-aligned-cell",
    valueFormatter: (p: any) => fmt.format(p.value ?? 0),
  },
];

const defaultColDef = {
  flex: 1,
  minWidth: 160,
  resizable: true,
  sortable: true,
  filter: true,
  floatingFilter: true,
};

const gridOptions: any = {
  animateRows: true,
  pagination: true,
  paginationPageSize: 25,
  paginationPageSizeSelector: [25, 50, 100],
};

const api = ref<any>(null);
const gridKey = computed(
  () => `${isDark.value ? "dark" : "light"}|${density.value}|${striped.value}`
);

function onGridReady(params: any) {
  api.value = params.api;
  api.value.setGridOption("rowHeight", rowHeightOf());
  api.value.resetRowHeights();
}

onMounted(async () => {
  await nextTick();
  if (valueGridWrap.value) {
    pinnedShadowCleanups.push(
      attachPinnedShadowsToElement(valueGridWrap.value)
    );
  }
  if (timelineGridWrap.value) {
    pinnedShadowCleanups.push(
      attachPinnedShadowsToElement(timelineGridWrap.value)
    );
  }
});

const reloadData = () => {
  rowData.value = makeRows(16);
};
</script>

<template>
  <div class="flex-1 flex flex-col">
    <nav class="mitreka-breadcrumbs mb-4" aria-label="Breadcrumb">
      <ol class="breadcrumbs-list">
        <li class="breadcrumbs-item">
          <a href="/" class="breadcrumbs-link">Home</a>
        </li>
        <li class="breadcrumbs-item">
          <span class="breadcrumbs-sep">/</span>
          <span class="breadcrumbs-current">Mockup Pages</span>
        </li>
        <li class="breadcrumbs-item">
          <span class="breadcrumbs-sep">/</span>
          <span class="breadcrumbs-current">Project Budgeting</span>
        </li>
      </ol>
    </nav>

    <div class="space-y-4">
      <PageHeader
        category="Mockup"
        title="Project Budgeting"
        description="Ringkasan budget per proyek & per waktu"
      />

      <div class="card p-2">
        <div class="flex flex-wrap items-center gap-3 justify-end w-full">
          <SelectDropdown
            v-model="selectedYear"
            :options="yearOptions"
          size="sm"
          variant="outline"
        />
        <SelectDropdown
          v-model="selectedMonth"
          :options="monthOptions"
          size="sm"
          variant="outline"
        />
        <SelectDropdown
          v-model="selectedStatus"
          :options="statusOptions"
          size="sm"
          variant="outline"
        />
        <SelectDropdown
          v-model="selectedCustomer"
          :options="customerOptions"
          size="sm"
          variant="outline"
        />
        <SelectDropdown
          v-model="selectedContractor"
          :options="contractorOptions"
          size="sm"
          variant="outline"
        />
          <button class="btn btn-success btn-sm" type="button" @click="reloadData">
            Reload
          </button>
        </div>
      </div>

      <div class="tabs">
        <button
          class="tab"
          :class="{ 'tab-active': activeTab === 'value' }"
          @click="activeTab = 'value'"
          type="button"
        >
          <Icon name="clipboard" class="h-4 w-4" />
          Budget Value
        </button>
        <button
          class="tab"
          :class="{ 'tab-active': activeTab === 'timeline' }"
          @click="activeTab = 'timeline'"
          type="button"
        >
          <Icon name="calendar-days" class="h-4 w-4" />
          Budget Timeline
        </button>
      </div>

      <div v-if="activeTab === 'value'" class="space-y-3">
        <div class="grid gap-3 md:grid-cols-3 lg:grid-cols-7 text-xs text-base-content/70">
          <div class="summary-card">
            <div class="summary-icon">
              <Icon name="clipboard" class="h-4 w-4" />
            </div>
            <div class="summary-content">
              <div class="summary-label">Nilai Kontrak</div>
              <div class="summary-value-wrap">
                <Tooltip class="summary-tooltip" :text="fmt.format(totals.nilai)">
                  <span class="summary-value">{{ fmt.format(totals.nilai) }}</span>
                </Tooltip>
              </div>
            </div>
          </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="info" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">PPN</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(totals.ppn)">
                <span class="summary-value">{{ fmt.format(totals.ppn) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="alert-triangle" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">PPh</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(totals.pph)">
                <span class="summary-value">{{ fmt.format(totals.pph) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="trendingUp" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Net Sales</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(totals.netSales)">
                <span class="summary-value">{{ fmt.format(totals.netSales) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="calendar-days" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Budget Plan</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(totals.budgetPlan)">
                <span class="summary-value">{{ fmt.format(totals.budgetPlan) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="sparkles" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Est. Profit</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(totals.estProfit)">
                <span class="summary-value">{{ fmt.format(totals.estProfit) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="zap" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">% Est.</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmtPct(estPctTotal)">
                <span class="summary-value">{{ fmtPct(estPctTotal) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div
        ref="valueGridWrap"
        class="w-full"
        :style="{ minHeight: `${minGridHeight}px`, height: '70vh' }"
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

      <div v-else class="space-y-3">
        <div class="grid gap-3 md:grid-cols-4 text-xs text-base-content/70">
          <div class="summary-card">
            <div class="summary-icon">
              <Icon name="clipboard" class="h-4 w-4" />
            </div>
            <div class="summary-content">
              <div class="summary-label">Nilai Kontrak</div>
              <div class="summary-value-wrap">
                <Tooltip class="summary-tooltip" :text="fmt.format(timelineTotals.nilai)">
                  <span class="summary-value">{{ fmt.format(timelineTotals.nilai) }}</span>
                </Tooltip>
              </div>
            </div>
          </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="calendar-days" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Budget Plan</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(timelineTotals.budgetPlan)">
                <span class="summary-value">{{ fmt.format(timelineTotals.budgetPlan) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="trendingUp" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Budget By Time</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(timelineTotals.budgetByTime)">
                <span class="summary-value">
                  {{ fmt.format(timelineTotals.budgetByTime) }}
                </span>
              </Tooltip>
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="alert-triangle" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Selisih</div>
            <div class="summary-value-wrap">
              <Tooltip class="summary-tooltip" :text="fmt.format(timelineTotals.selisih)">
                <span class="summary-value">{{ fmt.format(timelineTotals.selisih) }}</span>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>

      <div
        ref="timelineGridWrap"
        class="w-full"
        :style="{ minHeight: `${minGridHeight}px`, height: '70vh' }"
      >
        <AgGridVue
          :key="gridKey + '-timeline'"
          :class="['agx', themeClass, densityClass, 'w-full', 'h-full', 'min-h-0']"
          theme="legacy"
          :style="{
            '--ag-odd-row-background-color': striped
              ? isDark
                ? '#0d1a33'
                : '#F3F4F6'
              : 'transparent',
          }"
          :rowData="timelineRowData"
          :columnDefs="timelineColumnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
        />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tabs {
  display: flex;
  gap: 0.25rem;
  border-bottom: 2px solid color-mix(in oklch, var(--color-base-300), var(--color-base-content) 18%);
}
.tab {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-base-content);
  opacity: 0.7;
  background: transparent;
  border: none;
  border-bottom: 2px solid transparent;
  margin-bottom: -1px;
  cursor: pointer;
  transition: all 0.15s ease;
  white-space: nowrap;
}
.tab:hover {
  opacity: 1;
  background: var(--color-base-200);
}
.tab-active {
  opacity: 1;
  color: var(--color-primary);
  border-bottom-color: var(--color-primary);
}
.summary-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.5rem;
  background: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  min-width: 0;
}
.summary-content {
  min-width: 0;
  flex: 1 1 auto;
}
.summary-icon {
  height: 28px;
  width: 28px;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: color-mix(in oklch, var(--color-primary), transparent 88%);
  color: var(--color-primary);
  flex: 0 0 auto;
}
.summary-label {
  font-size: 0.75rem;
  opacity: 0.6;
}
.summary-value {
  display: block;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-base-content);
}
.summary-value-wrap {
  min-width: 0;
  width: 100%;
}
.summary-value-wrap :deep(.summary-tooltip) {
  display: block;
  max-width: 100%;
}
</style>
