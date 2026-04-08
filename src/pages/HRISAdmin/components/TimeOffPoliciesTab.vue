<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { AgGridSurface, Button, Card, DateTimePicker, Icon, Input, Modal, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";
import type { TimeOffPolicyRecord } from "@/data/hrisAdmin/timeOff";
import { iconRegistry } from "@/composables/Icon";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type PolicyStatusFilter = "all" | "active" | "draft";
type PolicyEditorMode = "create" | "edit";
type CreatePolicyForm = {
  name: string;
  code: string;
  effectiveDate: string;
  description: string;
  balanceType: "Fixed balance" | "Unlimited";
  balanceUnit: "Annually" | "Monthly" | "Unlimited";
  baseQuota: string;
  carryOverEnabled: boolean;
  allowNegativeBalance: boolean;
  allowFullDay: boolean;
  allowHalfDay: boolean;
  allowHourly: boolean;
  requireAttachment: boolean;
  status: "active" | "draft";
  assignmentMode: "all_active" | "manual";
  selectedEmployeeIds: number[];
};

const props = defineProps<{
  policies: TimeOffPolicyRecord[];
}>();

const emit = defineEmits<{
  (e: "create-policy", policy: TimeOffPolicyRecord): void;
  (e: "update-policy", policy: TimeOffPolicyRecord): void;
  (e: "delete-policy", policyId: string): void;
  (e: "activate-policy", policyId: string): void;
}>();

const createEmptyPolicyForm = (): CreatePolicyForm => ({
  name: "",
  code: "",
  effectiveDate: "2026-04-07",
  description: "",
  balanceType: "Fixed balance",
  balanceUnit: "Annually",
  baseQuota: "12",
  carryOverEnabled: false,
  allowNegativeBalance: false,
  allowFullDay: true,
  allowHalfDay: false,
  allowHourly: false,
  requireAttachment: false,
  status: "draft",
  assignmentMode: "all_active",
  selectedEmployeeIds: [],
});

const parseEffectiveDateLabel = (value: string) => {
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "2026-04-07";
  return parsed.toISOString().slice(0, 10);
};

const createFormFromPolicy = (policy: TimeOffPolicyRecord): CreatePolicyForm => {
  const manualCount = Math.min(policy.assignedEmployeeCount, employeeDirectory.length);
  return {
    name: policy.name,
    code: policy.code,
    effectiveDate: parseEffectiveDateLabel(policy.effectiveDateLabel),
    description: "",
    balanceType: policy.balanceType,
    balanceUnit: policy.balanceUnit,
    baseQuota: policy.baseQuota === null ? "" : String(policy.baseQuota),
    carryOverEnabled: false,
    allowNegativeBalance: false,
    allowFullDay: true,
    allowHalfDay: false,
    allowHourly: false,
    requireAttachment: false,
    status: policy.status,
    assignmentMode: policy.assignedEmployeeCount >= employeeDirectory.length ? "all_active" : "manual",
    selectedEmployeeIds: employeeDirectory.slice(0, manualCount).map((item) => item.id),
  };
};

const statusFilter = ref<PolicyStatusFilter>("all");
const search = ref("");
const gridApi = ref<any>(null);
const editorModalOpen = ref(false);
const deleteModalOpen = ref(false);
const editorMode = ref<PolicyEditorMode>("create");
const editorStep = ref(1);
const employeeSearch = ref("");
const editorPolicyId = ref<string | null>(null);
const selectedPolicy = ref<TimeOffPolicyRecord | null>(null);
const createForm = ref<CreatePolicyForm>(createEmptyPolicyForm());

const editorSteps = [
  { number: 1, title: "Policy information", description: "Nama policy, kode, tanggal efektif, dan deskripsi." },
  { number: 2, title: "Balance settings", description: "Tentukan quota, periodisasi, dan carry over." },
  { number: 3, title: "Request rules", description: "Atur tipe request dan dokumen pendukung." },
  { number: 4, title: "Assignment", description: "Pilih policy berlaku ke semua employee aktif atau subset tertentu." },
];

const statusOptions = [
  { value: "all", label: "All status" },
  { value: "active", label: "Active" },
  { value: "draft", label: "Draft" },
];

const balanceTypeOptions = [
  { value: "Fixed balance", label: "Fixed balance" },
  { value: "Unlimited", label: "Unlimited" },
];

const balanceUnitOptions = computed(() =>
  createForm.value.balanceType === "Unlimited"
    ? [{ value: "Unlimited", label: "Unlimited" }]
    : [
        { value: "Annually", label: "Annually" },
        { value: "Monthly", label: "Monthly" },
      ],
);

const policyStatusOptions = [
  { value: "draft", label: "Draft" },
  { value: "active", label: "Active" },
];

const assignmentModeOptions = [
  { value: "all_active", label: "All active employee" },
  { value: "manual", label: "Choose employee manually" },
];

const filteredPolicies = computed(() =>
  props.policies.filter((item) => statusFilter.value === "all" || item.status === statusFilter.value),
);

const activeEditorStepMeta = computed(() => editorSteps.find((step) => step.number === editorStep.value) ?? editorSteps[0]);
const editorTitle = computed(() => (editorMode.value === "create" ? "Create Policy" : "Edit Policy"));
const editorPrimaryLabel = computed(() => {
  if (editorStep.value !== editorSteps.length) return "Next";
  return editorMode.value === "create" ? "Create policy" : "Save changes";
});

const manualEmployeeOptions = computed(() =>
  employeeDirectory
    .filter((employee) => {
      const keyword = employeeSearch.value.trim().toLowerCase();
      if (!keyword) return true;
      return `${employee.name} ${employee.title} ${employee.department}`.toLowerCase().includes(keyword);
    })
    .sort((a, b) => a.name.localeCompare(b.name)),
);

const assignedEmployeeCount = computed(() =>
  createForm.value.assignmentMode === "all_active" ? employeeDirectory.length : createForm.value.selectedEmployeeIds.length,
);

const editorStepValid = computed(() => {
  if (editorStep.value === 1) {
    return Boolean(createForm.value.name.trim() && createForm.value.code.trim() && createForm.value.effectiveDate);
  }
  if (editorStep.value === 2) {
    if (createForm.value.balanceType === "Unlimited") return true;
    const quota = Number(createForm.value.baseQuota);
    return Number.isFinite(quota) && quota > 0;
  }
  if (editorStep.value === 3) {
    return createForm.value.allowFullDay || createForm.value.allowHalfDay || createForm.value.allowHourly;
  }
  return createForm.value.assignmentMode === "all_active" || createForm.value.selectedEmployeeIds.length > 0;
});

const iconSvg = (name: string) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

const policyNameRenderer = (params: any) => {
  const row = params.data as TimeOffPolicyRecord | undefined;
  if (!row) return "";
  return `<div class="py-1">
    <div class="font-medium">${row.name}</div>
    <div class="text-xs text-base-content/60">${row.baseQuota === null ? "No quota limit" : `${row.baseQuota} days base quota`}</div>
  </div>`;
};

const balanceTypeRenderer = (params: any) => {
  const row = params.data as TimeOffPolicyRecord | undefined;
  if (!row) return "";
  return `<div class="py-1">
    <div>${row.balanceType}</div>
    <div class="text-xs text-base-content/60">${row.balanceUnit}</div>
  </div>`;
};

const assignedRenderer = (params: any) => {
  const row = params.data as TimeOffPolicyRecord | undefined;
  if (!row) return "";
  return `<span class="font-medium">${row.assignedEmployeeCount} employees</span>`;
};

const statusRenderer = (params: any) => {
  const row = params.data as TimeOffPolicyRecord | undefined;
  if (!row) return "";
  const tone = row.status === "active" ? "badge-success" : "badge-warning";
  const label = row.status === "active" ? "Active" : "Draft";
  return `<span class="badge badge-soft ${tone}">${label}</span>`;
};

const actionsRenderer = (params: any) => {
  const row = params.data as TimeOffPolicyRecord | undefined;
  if (!row) return "";
  const activateButton =
    row.status === "draft"
      ? `<button type="button" class="icon-btn icon-btn-solid-success icon-btn-xs" data-action="activate" title="Activate">
          ${iconSvg("check")}
        </button>`
      : "";
  return `<div class="flex h-full items-center justify-end gap-2">
    <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="edit" title="Edit">
      ${iconSvg("pencil")}
    </button>
    ${activateButton}
    <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" data-action="delete" title="Delete">
      ${iconSvg("trash")}
    </button>
  </div>`;
};

const columnDefs = [
  {
    field: "name",
    headerName: "Policy name",
    minWidth: 240,
    pinned: "left",
    lockPinned: true,
    cellRenderer: policyNameRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as TimeOffPolicyRecord | undefined;
      if (!row) return "";
      return `${row.name} ${row.code}`;
    },
  },
  {
    field: "code",
    headerName: "Policy code",
    minWidth: 140,
  },
  {
    field: "balanceType",
    headerName: "Balance type",
    minWidth: 180,
    cellRenderer: balanceTypeRenderer,
  },
  {
    field: "effectiveDateLabel",
    headerName: "Effective date",
    minWidth: 170,
  },
  {
    field: "assignedEmployeeCount",
    headerName: "Assigned to",
    minWidth: 170,
    cellRenderer: assignedRenderer,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    cellRenderer: statusRenderer,
  },
  {
    field: "actions",
    headerName: "",
    minWidth: 160,
    maxWidth: 160,
    pinned: "right",
    lockPinned: true,
    sortable: false,
    resizable: false,
    cellRenderer: actionsRenderer,
    suppressMovable: true,
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

const onCellClicked = (params: any) => {
  const action = params.event?.target?.closest?.("[data-action]")?.getAttribute?.("data-action");
  if (!action) return;
  const policy = params.data as TimeOffPolicyRecord | undefined;
  if (!policy) return;

  if (action === "edit") {
    openEditModal(policy);
    return;
  }

  if (action === "activate") {
    emit("activate-policy", policy.id);
    return;
  }

  if (action === "delete") {
    selectedPolicy.value = policy;
    deleteModalOpen.value = true;
  }
};

const formatDateLabel = (dateValue: string) =>
  new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const syncBalanceUnit = () => {
  if (createForm.value.balanceType === "Unlimited") {
    createForm.value.balanceUnit = "Unlimited";
    createForm.value.baseQuota = "";
    return;
  }

  if (createForm.value.balanceUnit === "Unlimited") {
    createForm.value.balanceUnit = "Annually";
  }

  if (!createForm.value.baseQuota) {
    createForm.value.baseQuota = "12";
  }
};

const openCreateModal = () => {
  createForm.value = createEmptyPolicyForm();
  editorPolicyId.value = null;
  editorMode.value = "create";
  editorStep.value = 1;
  employeeSearch.value = "";
  editorModalOpen.value = true;
};

const openEditModal = (policy: TimeOffPolicyRecord) => {
  createForm.value = createFormFromPolicy(policy);
  editorPolicyId.value = policy.id;
  editorMode.value = "edit";
  editorStep.value = 1;
  employeeSearch.value = "";
  editorModalOpen.value = true;
};

const closeEditorModal = () => {
  editorModalOpen.value = false;
  editorStep.value = 1;
  employeeSearch.value = "";
  editorPolicyId.value = null;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
  selectedPolicy.value = null;
};

const submitEditor = () => {
  if (!editorStepValid.value) return;
  if (editorStep.value < editorSteps.length) {
    editorStep.value += 1;
    return;
  }

  const normalizedCode = createForm.value.code.trim().toUpperCase();
  const normalizedId = normalizedCode.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const policy: TimeOffPolicyRecord = {
    id: editorPolicyId.value ?? `policy-${normalizedId || Date.now()}`,
    name: createForm.value.name.trim(),
    code: normalizedCode,
    balanceType: createForm.value.balanceType,
    balanceUnit: createForm.value.balanceType === "Unlimited" ? "Unlimited" : createForm.value.balanceUnit,
    effectiveDateLabel: formatDateLabel(createForm.value.effectiveDate),
    assignedEmployeeCount: assignedEmployeeCount.value,
    baseQuota: createForm.value.balanceType === "Unlimited" ? null : Number(createForm.value.baseQuota),
    status: createForm.value.status,
  };

  if (editorMode.value === "create") {
    emit("create-policy", policy);
  } else {
    emit("update-policy", policy);
  }
  closeEditorModal();
};

const prevEditorStep = () => {
  if (editorStep.value > 1) editorStep.value -= 1;
};

const toggleEmployeeSelection = (employeeId: number) => {
  const selected = new Set(createForm.value.selectedEmployeeIds);
  if (selected.has(employeeId)) {
    selected.delete(employeeId);
  } else {
    selected.add(employeeId);
  }
  createForm.value.selectedEmployeeIds = Array.from(selected);
};

const confirmDelete = () => {
  if (!selectedPolicy.value) return;
  emit("delete-policy", selectedPolicy.value.id);
  closeDeleteModal();
};

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});

watch(
  () => createForm.value.balanceType,
  () => {
    syncBalanceUnit();
  },
);
</script>

<template>
  <div class="space-y-4">
    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="max-w-3xl">
          <div class="flex items-center gap-2 text-base font-semibold">
            <Icon name="layout-list" class="h-4 w-4 opacity-70" />
            <span>Time-off policies</span>
          </div>
          <p class="mt-1 text-sm text-base-content/65">
            Master jenis cuti dan izin, termasuk base quota, effective date, dan jumlah employee yang ter-assign.
          </p>
        </div>
        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <SelectDropdown v-model="statusFilter" :options="statusOptions" size="sm" variant="outline" color="default" />
          <div class="w-full md:w-[280px]">
            <Input v-model="search" size="sm" placeholder="Search policy name/code" class="w-full" prefix-icon="search" clearable />
          </div>
          <Button color="primary" size="sm" @click="openCreateModal">
            <Icon name="circle-plus" class="h-4 w-4" />
            Create policy
          </Button>
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
          :rowData="filteredPolicies"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
          @cell-clicked="onCellClicked"
        />
      </div>
    </Card>

    <Modal :open="editorModalOpen" :title="editorTitle" size="lg" @close="closeEditorModal">
      <div class="space-y-5">
        <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center justify-center gap-2 overflow-x-auto pb-1">
              <template v-for="(step, index) in editorSteps" :key="step.number">
                <button
                  type="button"
                  :disabled="step.number > editorStep + 1"
                  @click="step.number <= editorStep + 1 ? (editorStep = step.number) : null"
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all',
                    editorStep === step.number
                      ? 'bg-primary text-primary-content ring-4 ring-primary/20'
                      : editorStep > step.number
                        ? 'bg-success text-success-content cursor-pointer hover:ring-2 hover:ring-success/30'
                        : 'bg-base-300 text-base-content/50 cursor-not-allowed',
                  ]"
                >
                  <Icon v-if="editorStep > step.number" name="check" class="h-4 w-4" />
                  <span v-else>{{ step.number }}</span>
                </button>
                <div
                  v-if="index < editorSteps.length - 1"
                  :class="[
                    'h-1 w-10 rounded transition-all md:w-16',
                    editorStep > step.number ? 'bg-success' : 'bg-base-300',
                  ]"
                />
              </template>
            </div>
            <div class="text-center">
              <div class="font-semibold">{{ activeEditorStepMeta.title }}</div>
              <div class="text-sm text-base-content/60">{{ activeEditorStepMeta.description }}</div>
            </div>
          </div>
        </div>

        <div v-if="editorStep === 1" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Policy information</div>
            <p class="mt-1 text-sm text-base-content/60">Tetapkan identitas policy dan kapan policy mulai berlaku.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Policy name*</label>
              <Input v-model="createForm.name" size="sm" placeholder="Contoh: Cuti Tahunan" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Policy code*</label>
              <Input v-model="createForm.code" size="sm" placeholder="CTU" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Effective date*</label>
              <DateTimePicker v-model="createForm.effectiveDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Description</label>
              <textarea
                v-model="createForm.description"
                class="input min-h-28 w-full py-2"
                placeholder="Ringkas tujuan policy, pengecualian, atau konteks bisnisnya."
              />
            </div>
          </div>
        </div>

        <div v-else-if="editorStep === 2" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Balance settings</div>
            <p class="mt-1 text-sm text-base-content/60">Atur periodisasi quota dasar dan apakah policy ini bisa carry over.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Balance type*</label>
              <SelectDropdown v-model="createForm.balanceType" :options="balanceTypeOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Balance period*</label>
              <SelectDropdown v-model="createForm.balanceUnit" :options="balanceUnitOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Base quota</label>
              <Input
                v-model="createForm.baseQuota"
                size="sm"
                type="number"
                min="0"
                :disabled="createForm.balanceType === 'Unlimited'"
                :placeholder="createForm.balanceType === 'Unlimited' ? 'Unlimited policy' : '12'"
                class="w-full"
              />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Publishing status</label>
              <SelectDropdown v-model="createForm.status" :options="policyStatusOptions" size="sm" variant="outline" color="default" />
            </div>
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <label class="flex items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
              <input v-model="createForm.carryOverEnabled" type="checkbox" class="checkbox checkbox-sm mt-0.5" />
              <span>
                <span class="block font-medium">Carry over enabled</span>
                <span class="mt-1 block text-base-content/60">Sisa saldo bisa dibawa ke period berikutnya.</span>
              </span>
            </label>
            <label class="flex items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
              <input v-model="createForm.allowNegativeBalance" type="checkbox" class="checkbox checkbox-sm mt-0.5" />
              <span>
                <span class="block font-medium">Allow negative balance</span>
                <span class="mt-1 block text-base-content/60">Employee boleh request melebihi saldo yang tersedia.</span>
              </span>
            </label>
          </div>
        </div>

        <div v-else-if="editorStep === 3" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Request rules</div>
            <p class="mt-1 text-sm text-base-content/60">Pilih tipe request yang diizinkan dan apakah lampiran wajib.</p>
          </div>
          <div class="grid gap-3 md:grid-cols-2">
            <label class="flex items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
              <input v-model="createForm.allowFullDay" type="checkbox" class="checkbox checkbox-sm mt-0.5" />
              <span>
                <span class="block font-medium">Allow full day request</span>
                <span class="mt-1 block text-base-content/60">Employee bisa request untuk 1 hari penuh atau lebih.</span>
              </span>
            </label>
            <label class="flex items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
              <input v-model="createForm.allowHalfDay" type="checkbox" class="checkbox checkbox-sm mt-0.5" />
              <span>
                <span class="block font-medium">Allow half day request</span>
                <span class="mt-1 block text-base-content/60">Digunakan untuk izin setengah hari atau kompensasi pendek.</span>
              </span>
            </label>
            <label class="flex items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
              <input v-model="createForm.allowHourly" type="checkbox" class="checkbox checkbox-sm mt-0.5" />
              <span>
                <span class="block font-medium">Allow hourly request</span>
                <span class="mt-1 block text-base-content/60">Cocok untuk izin pendek berbasis jam.</span>
              </span>
            </label>
            <label class="flex items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-4 text-sm">
              <input v-model="createForm.requireAttachment" type="checkbox" class="checkbox checkbox-sm mt-0.5" />
              <span>
                <span class="block font-medium">Require attachment</span>
                <span class="mt-1 block text-base-content/60">Employee wajib mengunggah dokumen pendukung saat request.</span>
              </span>
            </label>
          </div>
        </div>

        <div v-else class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Assignment</div>
            <p class="mt-1 text-sm text-base-content/60">Tentukan policy berlaku ke semua employee aktif atau subset tertentu.</p>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Assignment mode*</label>
              <SelectDropdown v-model="createForm.assignmentMode" :options="assignmentModeOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="rounded-xl border border-base-300 bg-base-50 p-4">
              <div class="text-sm text-base-content/60">Assigned employee</div>
              <div class="mt-1 text-2xl font-semibold text-primary">{{ assignedEmployeeCount }}</div>
            </div>
          </div>

          <div v-if="createForm.assignmentMode === 'all_active'" class="rounded-2xl border border-info/30 bg-info/8 p-4 text-sm">
            Policy ini akan langsung dihitung untuk seluruh employee aktif di directory HRIS.
          </div>

          <div v-else class="space-y-4">
            <div class="w-full md:w-[320px]">
              <Input v-model="employeeSearch" size="sm" placeholder="Search employee" class="w-full" prefix-icon="search" clearable />
            </div>
            <div class="max-h-[280px] space-y-2 overflow-y-auto pr-1">
              <label
                v-for="employee in manualEmployeeOptions"
                :key="employee.id"
                class="flex cursor-pointer items-start gap-3 rounded-xl border border-base-300 bg-base-50 p-3 text-sm transition hover:border-primary/30 hover:bg-base-100"
              >
                <input
                  :checked="createForm.selectedEmployeeIds.includes(employee.id)"
                  type="checkbox"
                  class="checkbox checkbox-sm mt-0.5"
                  @change="toggleEmployeeSelection(employee.id)"
                />
                <span class="min-w-0">
                  <span class="block font-medium">{{ employee.name }}</span>
                  <span class="mt-0.5 block text-base-content/60">{{ employee.title }} | {{ employee.department }}</span>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <template #footer>
        <div class="flex w-full items-center justify-between">
          <Button variant="ghost" color="default" :disabled="editorStep === 1" @click="prevEditorStep">Back</Button>
          <div class="flex gap-2">
            <Button variant="ghost" color="default" @click="closeEditorModal">Cancel</Button>
            <Button color="primary" :disabled="!editorStepValid" @click="submitEditor">{{ editorPrimaryLabel }}</Button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal :open="deleteModalOpen" title="Delete Policy" size="sm" hide-footer @close="closeDeleteModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/70">
          Policy <span class="font-semibold">{{ selectedPolicy?.name ?? "-" }}</span> akan dihapus dari daftar policy.
        </p>
        <div class="rounded-xl border border-warning/30 bg-warning/8 p-3 text-sm">
          Gunakan aksi ini untuk draft atau policy sandbox yang memang tidak dipakai lagi.
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeDeleteModal">Cancel</Button>
          <Button color="danger" @click="confirmDelete">Delete</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
