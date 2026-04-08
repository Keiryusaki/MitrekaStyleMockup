<script setup lang="ts">
import { computed, h, ref, render, watch } from "vue";
import { AgGridSurface, Avatar, Button, Card, Icon, Input, Modal, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import type { TimeOffBalanceRecord, TimeOffPolicyRecord } from "@/data/hrisAdmin/timeOff";
import { timeOffEmployeeMeta } from "@/data/hrisAdmin/timeOff";
import { iconRegistry } from "@/composables/Icon";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type BalanceGridRow = TimeOffBalanceRecord & {
  employeeName: string;
  employeeCode: string;
  employeeTitle: string;
};

type BalanceHistoryEntry = {
  id: string;
  label: string;
  actor: string;
  changedAt: string;
  note: string;
};

const props = defineProps<{
  balances: TimeOffBalanceRecord[];
  policies: TimeOffPolicyRecord[];
}>();

const emit = defineEmits<{
  (e: "update-balance", balance: TimeOffBalanceRecord): void;
  (e: "reset-balance", balanceId: string): void;
}>();

const policyFilter = ref("all");
const search = ref("");
const gridApi = ref<any>(null);
const detailModalOpen = ref(false);
const adjustModalOpen = ref(false);
const selectedRow = ref<BalanceGridRow | null>(null);
const adjustForm = ref({
  entitled: "",
  used: "",
  reason: "",
});

const policyOptions = computed(() => [
  { value: "all", label: "All policy" },
  ...props.policies.map((item) => ({ value: item.id, label: item.name })),
]);

const filteredBalances = computed<BalanceGridRow[]>(() =>
  props.balances
    .filter((item) => policyFilter.value === "all" || item.policyId === policyFilter.value)
    .map((item) => {
      const employee = timeOffEmployeeMeta(item.employeeId);
      return {
        ...item,
        employeeName: employee?.name ?? "-",
        employeeCode: employee?.employeeCode ?? "-",
        employeeTitle: employee?.title ?? "-",
      };
    }),
);

const historyEntries = computed<BalanceHistoryEntry[]>(() => {
  const row = selectedRow.value;
  if (!row) return [];
  const base = [
    {
      id: `${row.id}-1`,
      label: row.source === "manual_override" ? "Manual quota adjustment" : "Policy entitlement synced",
      actor: row.source === "manual_override" ? "HR Admin" : "System",
      changedAt: "08 Apr 2026 09:12",
      note:
        row.source === "manual_override"
          ? `Entitled quota disesuaikan menjadi ${row.entitled} berdasarkan kebutuhan employee tertentu.`
          : `Saldo mengikuti perhitungan policy ${row.policyName}.`,
    },
    {
      id: `${row.id}-2`,
      label: "Usage recalculated",
      actor: "System",
      changedAt: "07 Apr 2026 17:40",
      note: `Remaining balance dihitung ulang dari entitled ${row.entitled} dan used ${row.used}.`,
    },
  ];
  return base;
});

const adjustSaveDisabled = computed(() => {
  const entitled = Number(adjustForm.value.entitled);
  const used = Number(adjustForm.value.used);
  return !Number.isFinite(entitled) || entitled < 0 || !Number.isFinite(used) || used < 0 || !adjustForm.value.reason.trim();
});

const iconSvg = (name: string) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

const employeeRenderer = (params: any) => {
  const row = params.data as BalanceGridRow | undefined;
  if (!row) return "";
  const root = document.createElement("div");

  render(
    h(
      "div",
      { class: "flex min-h-9 w-full items-center gap-2" },
      [
        h(Avatar, {
          alt: row.employeeName,
          fallback: row.employeeName,
          size: "sm",
          color: "primary",
        }),
        h("div", { class: "flex min-w-0 flex-col justify-center" }, [
          h("div", { class: "inline-block text-[13px] leading-tight font-bold text-primary" }, row.employeeName),
          h("div", { class: "mt-0 text-[10px] leading-tight text-base-content/70" }, `${row.employeeCode} | ${row.employeeTitle}`),
        ]),
      ],
    ),
    root,
  );

  return root;
};

const sourceRenderer = (params: any) => {
  const row = params.data as BalanceGridRow | undefined;
  if (!row) return "";
  const tone = row.source === "manual_override" ? "badge-warning" : "badge-info";
  const label = row.source === "manual_override" ? "Manual override" : "Policy rule";
  return `<span class="badge badge-soft ${tone}">${label}</span>`;
};

const actionsRenderer = (params: any) => {
  const row = params.data as BalanceGridRow | undefined;
  if (!row) return "";
  const resetButton =
    row.source === "manual_override"
      ? `<button type="button" class="icon-btn icon-btn-solid-accent icon-btn-xs" data-action="reset" title="Reset to rule">
          ${iconSvg("refresh-ccw")}
        </button>`
      : "";
  return `<div class="flex h-full items-center justify-center gap-2">
    <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="adjust" title="Adjust quota">
      ${iconSvg("pencil")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="detail" title="View detail">
      ${iconSvg("eye")}
    </button>
    ${resetButton}
  </div>`;
};

const columnDefs = [
  {
    field: "employeeName",
    headerName: "Employee",
    minWidth: 280,
    pinned: "left",
    lockPinned: true,
    cellRenderer: employeeRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as BalanceGridRow | undefined;
      if (!row) return "";
      return `${row.employeeName} ${row.employeeCode} ${row.employeeTitle} ${row.policyName}`;
    },
  },
  {
    field: "policyName",
    headerName: "Policy",
    minWidth: 180,
  },
  {
    field: "entitled",
    headerName: "Entitled",
    minWidth: 120,
  },
  {
    field: "used",
    headerName: "Used",
    minWidth: 120,
  },
  {
    field: "remaining",
    headerName: "Remaining",
    minWidth: 130,
  },
  {
    field: "source",
    headerName: "Source",
    minWidth: 160,
    cellRenderer: sourceRenderer,
  },
  {
    headerName: "Aksi",
    colId: "actions",
    width: 140,
    pinned: "right",
    suppressHeaderMenuButton: true,
    sortable: false,
    filter: false,
    lockPinned: true,
    cellRenderer: actionsRenderer,
  },
];

const defaultColDef = {
  flex: 1,
  minWidth: 120,
  resizable: true,
  sortable: true,
  filter: false,
  floatingFilter: false,
  suppressHeaderMenuButton: true,
};

const gridOptions: any = {
  animateRows: true,
  domLayout: "normal",
  suppressCellFocus: true,
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [10, 25, 50],
  getRowHeight: () => 48,
};

const onGridReady = (params: any) => {
  gridApi.value = params.api;
  params.api.setGridOption("quickFilterText", search.value);
};

const openDetailModal = (row: BalanceGridRow) => {
  selectedRow.value = row;
  detailModalOpen.value = true;
};

const openAdjustModal = (row: BalanceGridRow) => {
  selectedRow.value = row;
  adjustForm.value = {
    entitled: String(row.entitled),
    used: String(row.used),
    reason: row.source === "manual_override" ? "Penyesuaian quota existing employee." : "",
  };
  adjustModalOpen.value = true;
};

const closeDetailModal = () => {
  detailModalOpen.value = false;
};

const closeAdjustModal = () => {
  adjustModalOpen.value = false;
};

const saveAdjustment = () => {
  const row = selectedRow.value;
  if (!row || adjustSaveDisabled.value) return;
  const entitled = Number(adjustForm.value.entitled);
  const used = Number(adjustForm.value.used);
  emit("update-balance", {
    ...row,
    entitled,
    used,
    remaining: Math.max(entitled - used, 0),
    source: "manual_override",
  });
  selectedRow.value = {
    ...row,
    entitled,
    used,
    remaining: Math.max(entitled - used, 0),
    source: "manual_override",
  };
  closeAdjustModal();
};

const onCellClicked = (params: any) => {
  const action = params.event?.target?.closest?.("[data-action]")?.getAttribute?.("data-action");
  if (!action) return;
  const row = params.data as BalanceGridRow | undefined;
  if (!row) return;

  if (action === "detail") {
    openDetailModal(row);
    return;
  }

  if (action === "adjust") {
    openAdjustModal(row);
    return;
  }

  if (action === "reset") {
    emit("reset-balance", row.id);
  }
};

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});
</script>

<template>
  <div class="space-y-4">
    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="max-w-3xl">
          <div class="flex items-center gap-2 text-base font-semibold">
            <Icon name="table-2" class="h-4 w-4 opacity-70" />
            <span>Employee balance</span>
          </div>
          <p class="mt-1 text-sm text-base-content/65">
            Tampilan saldo quota per employee. Di sini nanti paling cocok untuk handle override manual jika quota tidak sama antar jabatan atau masa kerja.
          </p>
        </div>
        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <SelectDropdown v-model="policyFilter" :options="policyOptions" size="sm" variant="outline" color="default" />
          <div class="w-full md:w-[280px]">
            <Input v-model="search" size="sm" placeholder="Search employee" class="w-full" prefix-icon="search" clearable />
          </div>
        </div>
      </div>
    </Card>

    <Card padding="p-3" class="overflow-hidden">
      <div class="h-[clamp(320px,54dvh,68dvh)] min-h-[380px] w-full">
        <AgGridSurface
          class="agx agx-compact ag-theme-quartz h-full min-h-0 w-full"
          theme="legacy"
          density="compact"
          :auto-height-when-few-rows="false"
          :auto-row-height="false"
          normal-layout-height="100%"
          :rowData="filteredBalances"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
          @cell-clicked="onCellClicked"
        />
      </div>
    </Card>

    <Modal :open="detailModalOpen" title="Balance Detail" size="md" hide-footer @close="closeDetailModal">
      <div v-if="selectedRow" class="space-y-4">
        <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
          <div class="flex items-start gap-3">
            <Avatar :alt="selectedRow.employeeName" :fallback="selectedRow.employeeName" size="md" color="primary" />
            <div class="min-w-0">
              <div class="font-semibold">{{ selectedRow.employeeName }}</div>
              <div class="text-sm text-base-content/65">{{ selectedRow.employeeCode }} | {{ selectedRow.employeeTitle }}</div>
              <div class="mt-2 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">{{ selectedRow.policyName }}</span>
                <span class="badge badge-soft" :class="selectedRow.source === 'manual_override' ? 'badge-warning' : 'badge-info'">
                  {{ selectedRow.source === "manual_override" ? "Manual override" : "Policy rule" }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-3">
          <div class="rounded-xl border border-base-300 bg-base-50 p-4">
            <div class="text-xs text-base-content/60">Entitled</div>
            <div class="mt-1 text-2xl font-semibold text-primary">{{ selectedRow.entitled }}</div>
          </div>
          <div class="rounded-xl border border-base-300 bg-base-50 p-4">
            <div class="text-xs text-base-content/60">Used</div>
            <div class="mt-1 text-2xl font-semibold text-warning">{{ selectedRow.used }}</div>
          </div>
          <div class="rounded-xl border border-base-300 bg-base-50 p-4">
            <div class="text-xs text-base-content/60">Remaining</div>
            <div class="mt-1 text-2xl font-semibold text-success">{{ selectedRow.remaining }}</div>
          </div>
        </div>

        <div class="space-y-3">
          <div class="font-semibold">Balance history</div>
          <div class="space-y-2">
            <div v-for="entry in historyEntries" :key="entry.id" class="rounded-xl border border-base-300 bg-base-50 p-4">
              <div class="flex items-start justify-between gap-3">
                <div>
                  <div class="font-medium">{{ entry.label }}</div>
                  <div class="mt-1 text-xs text-base-content/60">{{ entry.actor }}</div>
                </div>
                <div class="text-xs text-base-content/60">{{ entry.changedAt }}</div>
              </div>
              <div class="mt-2 text-sm text-base-content/75">{{ entry.note }}</div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <Modal :open="adjustModalOpen" title="Adjust Balance" size="sm" hide-footer @close="closeAdjustModal">
      <div v-if="selectedRow" class="space-y-4">
        <div class="rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
          <div class="font-medium">{{ selectedRow.employeeName }}</div>
          <div class="mt-1 text-base-content/65">{{ selectedRow.policyName }}</div>
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Entitled quota</label>
          <Input v-model="adjustForm.entitled" type="number" min="0" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Used quota</label>
          <Input v-model="adjustForm.used" type="number" min="0" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Reason*</label>
          <textarea v-model="adjustForm.reason" class="input min-h-24 w-full py-2" placeholder="Jelaskan alasan override quota employee." />
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeAdjustModal">Cancel</Button>
          <Button color="primary" :disabled="adjustSaveDisabled" @click="saveAdjustment">Save changes</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
