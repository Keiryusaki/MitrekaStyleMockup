<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, nextTick } from "vue";
import { AgGridSurface } from "@keiryusaki/mitreka-ui/vue";
import PageHeader from "@/components/PageHeader.vue";
import { attachPinnedShadowsToElement } from "@/composables/useAgGridPinnedShadows";
import {
  createCompareRowClassRules,
  createSpacerRow,
  createSpacerRowClassRules,
} from "@/composables/useCompareRows";
import {
  calcAgRowHeight,
  resolveAgFontPx,
} from "@/composables/useAgGridRowHeight";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

const fmt = new Intl.NumberFormat("id-ID");
const formatValue = (value: number | null | undefined) =>
  value ? fmt.format(value) : "0";

const projectMeta = {
  instansi: "-",
  project: "JASA KONSULT...",
  nilaiKontrak: 778776000,
  netSales: 778776000,
  totalBudgetPlan: 619978400,
  estimasiProfit: 158797600,
  estimasiPct: 20,
};

const monthsFull = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];
const monthsBudget = ["Jan", "Feb", "Mar", "Apr", "Mei"];
const monthsCashflow = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
];

const revenuePlanRows = [
  {
    label: "Termin 1",
    values: [0, 194694000, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    label: "Termin 2",
    values: [0, 0, 0, 0, 194694000, 0, 0, 0, 0, 0, 0, 0],
  },
  {
    label: "Termin 3",
    values: [0, 0, 0, 0, 0, 0, 0, 194694000, 0, 0, 0, 0],
  },
  {
    label: "Termin 4",
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 194694000, 0],
  },
];
const revenueActualRows = [
  { label: "Termin 1", values: Array(12).fill(0) },
  { label: "Termin 2", values: Array(12).fill(0) },
  { label: "Termin 3", values: Array(12).fill(0) },
  { label: "Termin 4", values: Array(12).fill(0) },
];

const sumRows = (rows: { values: number[] }[]) =>
  rows[0].values.map((_, idx) =>
    rows.reduce((acc, row) => acc + (row.values[idx] ?? 0), 0)
  );

const revenuePlanTotal = computed(() => sumRows(revenuePlanRows));
const revenueActualTotal = computed(() => sumRows(revenueActualRows));
const revenueGapTotal = computed(() =>
  revenuePlanTotal.value.map(
    (val, idx) => val - (revenueActualTotal.value[idx] ?? 0)
  )
);

const budgetPlanRows = [
  {
    code: "51101",
    name: "HPP PRJ - Gaji Produksi Tim Internal",
    plan: [325000000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51102",
    name: "HPP PRJ - Fee Tenaga Ahli",
    plan: [210000000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51201",
    name: "HPP PRJ - Pra project - Biaya Marketing",
    plan: [40000000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51302",
    name: "HPP PRJ - Fee / Komisi Tim Sales",
    plan: [3000000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51501",
    name: "HPP PRJ - Transport, komunikasi dan lainnya",
    plan: [2400000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51503",
    name: "HPP PRJ - SPPD Perjalanan Dinas (Estimasi)",
    plan: [2000000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51701",
    name: "HPP PRJ - ATK",
    plan: [1200000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "51702",
    name: "HPP PRJ - Percetakan dan jilid",
    plan: [2000000, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
  {
    code: "52901",
    name: "HPP PRJ - Biaya Operasional Project",
    plan: [34378400, 0, 0, 0, 0],
    actual: [0, 0, 0, 0, 0],
  },
];

const budgetPlanTotals = computed(() => {
  const planTotals = monthsBudget.map((_, idx) =>
    budgetPlanRows.reduce((acc, row) => acc + (row.plan[idx] ?? 0), 0)
  );
  const actualTotals = monthsBudget.map((_, idx) =>
    budgetPlanRows.reduce((acc, row) => acc + (row.actual[idx] ?? 0), 0)
  );
  return { planTotals, actualTotals };
});

const cashflowRows = [
  {
    label: "Plan/Bln",
    values: [-619978400, 194694000, 0, 0, 194694000, 0, 0, 194694000, 0, 0],
  },
  {
    label: "Acc.Plan",
    values: [
      -619978400,
      -425284400,
      -425284400,
      -425284400,
      -230590400,
      -230590400,
      -230590400,
      -35896400,
      -35896400,
      -35896400,
    ],
  },
  { label: "Realisasi/Bln", values: Array(10).fill(0) },
  { label: "Acc.Realisasi", values: Array(10).fill(0) },
];

const buildMonthFields = (prefix: string, values: number[]) =>
  values.reduce<Record<string, number>>((acc, val, idx) => {
    acc[`${prefix}${idx + 1}`] = val;
    return acc;
  }, {});

const revenueRowData = computed(() => [
  { rowType: "group", item: "Rencana" },
  ...revenuePlanRows.map((row) => ({
    rowType: "plan",
    block: "plan",
    item: row.label,
    ...buildMonthFields("m", row.values),
  })),
  {
    rowType: "total",
    block: "plan",
    item: "Total",
    ...buildMonthFields("m", revenuePlanTotal.value),
  },
  createSpacerRow(),
  {
    rowType: "group",
    block: "realized",
    compareBlock: "realized",
    compareRole: "header",
    compareTheme: "success",
    item: "Realisasi",
  },
  ...revenueActualRows.map((row) => ({
    rowType: "realized",
    block: "realized",
    compareBlock: "realized",
    compareRole: "row",
    compareTheme: "success",
    item: row.label,
    ...buildMonthFields("m", row.values),
  })),
  {
    rowType: "total",
    block: "realized",
    compareBlock: "realized",
    compareRole: "total",
    compareTheme: "success",
    item: "Total",
    ...buildMonthFields("m", revenueActualTotal.value),
  },
  createSpacerRow(),
  {
    rowType: "gap",
    item: "Gap Revenue",
    ...buildMonthFields("m", revenueGapTotal.value),
  },
]);

const budgetRowData = computed(() => [
  ...budgetPlanRows.map((row) => {
    const data: Record<string, number | string> = {
      rowType: "data",
      item: `${row.code} - ${row.name}`,
    };
    monthsBudget.forEach((_, idx) => {
      data[`plan${idx + 1}`] = row.plan[idx] ?? 0;
      data[`actual${idx + 1}`] = row.actual[idx] ?? 0;
    });
    return data;
  }),
  (() => {
    const total: Record<string, number | string> = {
      rowType: "total",
      item: "Total",
    };
    monthsBudget.forEach((_, idx) => {
      total[`plan${idx + 1}`] = budgetPlanTotals.value.planTotals[idx] ?? 0;
      total[`actual${idx + 1}`] = budgetPlanTotals.value.actualTotals[idx] ?? 0;
    });
    return total;
  })(),
]);

const cashflowRowData = computed(() => {
  const rows = cashflowRows.map((row) => {
    const isRealized =
      row.label === "Realisasi/Bln" || row.label === "Acc.Realisasi";
    return {
      rowType: "data",
      compareBlock: isRealized ? "realized" : undefined,
      compareRole: isRealized ? "row" : undefined,
      compareTheme: isRealized ? "success" : undefined,
      item: row.label,
      ...buildMonthFields("m", row.values),
    };
  });
  rows.splice(2, 0, createSpacerRow());
  return rows;
});

const numberFormatter = (p: any) => formatValue(p.value ?? 0);
const negativeCellRules = {
  "pcf-negative": (p: any) => typeof p.value === "number" && p.value < 0,
};

const revenueColumnDefs = computed(() => [
  {
    field: "item",
    headerName: "Item",
    pinned: "left",
    lockPinned: true,
    width: 220,
    cellClass: (p: any) =>
      p.data?.rowType === "plan" || p.data?.rowType === "realized"
        ? "pcf-indent"
        : undefined,
  },
  {
    headerName: "2026",
    children: monthsFull.map((month, idx) => ({
      field: `m${idx + 1}`,
      headerName: month,
      type: "numericColumn",
      valueFormatter: numberFormatter,
      cellClass: "ag-right-aligned-cell",
      cellClassRules: negativeCellRules,
      width: 120,
    })),
  },
]);

const budgetColumnDefs = computed(() => [
  {
    field: "item",
    headerName: "Item COA",
    pinned: "left",
    lockPinned: true,
    width: 320,
  },
  {
    headerName: "2026",
    children: monthsBudget.map((month, idx) => ({
      headerName: month,
      children: [
        {
          field: `plan${idx + 1}`,
          headerName: "Rencana",
          type: "numericColumn",
          valueFormatter: numberFormatter,
          cellClass: "ag-right-aligned-cell",
          cellClassRules: negativeCellRules,
          width: 120,
        },
        {
          field: `actual${idx + 1}`,
          headerName: "Realisasi",
          type: "numericColumn",
          valueFormatter: numberFormatter,
          cellClass: "ag-right-aligned-cell",
          cellClassRules: negativeCellRules,
          width: 120,
        },
      ],
    })),
  },
]);

const cashflowColumnDefs = computed(() => [
  {
    field: "item",
    headerName: "Item",
    pinned: "left",
    lockPinned: true,
    width: 220,
    cellClass: "pcf-item-strong",
  },
  {
    headerName: "2026",
    children: monthsCashflow.map((month, idx) => ({
      field: `m${idx + 1}`,
      headerName: month,
      type: "numericColumn",
      valueFormatter: numberFormatter,
      cellClass: "ag-right-aligned-cell",
      cellClassRules: negativeCellRules,
      width: 120,
    })),
  },
]);

const defaultColDef = {
  resizable: true,
  sortable: true,
  filter: false,
  floatingFilter: false,
  suppressHeaderMenuButton: true,
};

const agFontPx = ref(13);
const baseRowHeight = computed(() => calcAgRowHeight(agFontPx.value, "compact"));

const gridOptions = {
  suppressMenuHide: true,
  suppressHeaderMenuButton: true,
  animateRows: false,
  headerHeight: 44,
  getRowHeight: (params: any) =>
    params?.data?.rowType === "spacer" ? 24 : baseRowHeight.value,
};
const cashflowGridOptions = {
  ...gridOptions,
  domLayout: "autoHeight",
};

const isDark = ref(false);
let htmlObs: MutationObserver | null = null;
const pinnedShadowCleanups: Array<() => void> = [];
const revenueGridWrap = ref<HTMLElement | null>(null);
const budgetGridWrap = ref<HTMLElement | null>(null);
const cashflowGridWrap = ref<HTMLElement | null>(null);

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

onMounted(async () => {
  await nextTick();
  agFontPx.value = resolveAgFontPx(
    revenueGridWrap.value || budgetGridWrap.value || cashflowGridWrap.value
  );
  if (revenueGridWrap.value) {
    pinnedShadowCleanups.push(
      attachPinnedShadowsToElement(revenueGridWrap.value)
    );
  }
  if (budgetGridWrap.value) {
    pinnedShadowCleanups.push(
      attachPinnedShadowsToElement(budgetGridWrap.value)
    );
  }
  if (cashflowGridWrap.value) {
    pinnedShadowCleanups.push(
      attachPinnedShadowsToElement(cashflowGridWrap.value)
    );
  }
});

onBeforeUnmount(() => {
  htmlObs?.disconnect();
  pinnedShadowCleanups.splice(0).forEach((cleanup) => cleanup());
});

const themeClass = computed(() =>
  isDark.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"
);

const baseRowClassRules = {
  "pcf-row-group": (p: any) => p.data?.rowType === "group",
  "pcf-row-total": (p: any) => p.data?.rowType === "total",
  "pcf-row-gap": (p: any) => p.data?.rowType === "gap",
  ...createSpacerRowClassRules(),
};
const compareRowClassRules = createCompareRowClassRules({
  defaultTheme: "success",
});
const revenueRowClassRules = {
  ...baseRowClassRules,
  ...compareRowClassRules,
};
const cashflowRowClassRules = {
  ...baseRowClassRules,
  ...compareRowClassRules,
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
          <span class="breadcrumbs-current">Project Cashflow</span>
        </li>
      </ol>
    </nav>

    <div class="space-y-4">
      <div class="flex flex-wrap items-start gap-4 justify-between">
        <PageHeader
          category="Mockup"
          title="Project Cashflow - Detail"
          description="Revenue, budget plan, and cashflow by month"
        />
        <div class="flex items-center gap-2">
          <button class="btn btn-outline btn-secondary btn-sm" type="button">Kembali</button>
          <button class="btn btn-success btn-sm" type="button">Reload</button>
        </div>
      </div>

      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="clipboard" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Instansi</div>
            <div class="summary-value">{{ projectMeta.instansi }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="info" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Nama Proyek</div>
            <div class="summary-value">{{ projectMeta.project }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="trendingUp" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Nilai Kontrak</div>
            <div class="summary-value">{{ formatValue(projectMeta.nilaiKontrak) }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="calendar-days" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Net Sales</div>
            <div class="summary-value">{{ formatValue(projectMeta.netSales) }}</div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="sparkles" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Total Budget Plan</div>
            <div class="summary-value">
              {{ formatValue(projectMeta.totalBudgetPlan) }}
            </div>
          </div>
        </div>
        <div class="summary-card">
          <div class="summary-icon">
            <Icon name="zap" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">Estimasi Profit</div>
            <div class="summary-value">
              {{ formatValue(projectMeta.estimasiProfit) }}
              <span class="summary-meta">({{ projectMeta.estimasiPct }}%)</span>
            </div>
          </div>
        </div>
      </div>

      <section class="card p-4 space-y-3">
        <div class="pcf-section-title">Revenue</div>
        <div class="pcf-grid" ref="revenueGridWrap">
          <AgGridSurface :auto-row-height="false" :pinned-shadows="false"
            :class="['agx', 'agx-compact', themeClass, 'w-full', 'h-full']"
            theme="legacy"
            :style="{
              '--ag-odd-row-background-color': isDark ? '#0d1a33' : '#F3F4F6',
            }"
            :rowData="revenueRowData"
          :columnDefs="revenueColumnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          :rowClassRules="revenueRowClassRules"
        />
      </div>
    </section>

      <section class="card p-4 space-y-3">
        <div class="pcf-section-title">Budget Plan</div>
        <div class="pcf-grid" ref="budgetGridWrap">
          <AgGridSurface :auto-row-height="false" :pinned-shadows="false"
            :class="['agx', 'agx-compact', themeClass, 'w-full', 'h-full']"
            theme="legacy"
            :style="{
              '--ag-odd-row-background-color': isDark ? '#0d1a33' : '#F3F4F6',
            }"
            :rowData="budgetRowData"
          :columnDefs="budgetColumnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          :rowClassRules="baseRowClassRules"
        />
      </div>
    </section>

      <section class="card p-4 space-y-3">
        <div class="pcf-section-title">Cashflow</div>
        <div class="pcf-grid pcf-grid-auto" ref="cashflowGridWrap">
          <AgGridSurface :auto-row-height="false" :pinned-shadows="false"
            :class="['agx', 'agx-compact', themeClass, 'w-full', 'h-full']"
            theme="legacy"
            :style="{
              '--ag-odd-row-background-color': isDark ? '#0d1a33' : '#F3F4F6',
            }"
            :rowData="cashflowRowData"
          :columnDefs="cashflowColumnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="cashflowGridOptions"
          :rowClassRules="cashflowRowClassRules"
        />
      </div>
    </section>
    </div>
  </div>
</template>

<style scoped>
.pcf-section-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--color-base-content);
}
.pcf-grid {
  height: 420px;
}
.pcf-grid-auto {
  height: auto;
}
.pcf-grid :deep(.ag-row.pcf-row-group .ag-cell) {
  font-weight: 600;
  background-color: color-mix(
    in oklch,
    var(--color-base-200),
    transparent 40%
  ) !important;
}
.pcf-grid :deep(.ag-row.pcf-row-total .ag-cell) {
  font-weight: 600;
  background-color: color-mix(
    in oklch,
    var(--color-base-200),
    transparent 20%
  ) !important;
}
.pcf-grid :deep(.ag-row.pcf-row-gap .ag-cell) {
  font-weight: 600;
  color: var(--color-primary) !important;
  background-color: color-mix(
    in oklch,
    var(--color-primary),
    transparent 92%
  ) !important;
}
.pcf-grid :deep(.pcf-indent) {
  padding-left: 1.5rem;
}
.pcf-grid :deep(.pcf-negative) {
  color: var(--color-error) !important;
}
.pcf-grid :deep(.ag-cell.pcf-negative) {
  color: var(--color-error) !important;
}
.pcf-grid :deep(.ag-cell.pcf-negative .ag-cell-value) {
  color: var(--color-error) !important;
}
.pcf-grid :deep(.ag-right-aligned-cell) {
  justify-content: flex-end;
  text-align: right;
}
.pcf-grid :deep(.ag-right-aligned-cell .ag-cell-value) {
  text-align: right;
  width: 100%;
}
.pcf-grid :deep(.pcf-item-strong) {
  font-weight: 600;
}
.summary-card {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.9rem;
  border-radius: 0.75rem;
  background: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  min-width: 0;
}
.summary-content {
  min-width: 0;
}
.summary-icon {
  height: 36px;
  width: 36px;
  border-radius: 0.75rem;
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
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--color-base-content);
}
.summary-meta {
  font-size: 0.75rem;
  opacity: 0.6;
  margin-left: 0.25rem;
}
</style>

