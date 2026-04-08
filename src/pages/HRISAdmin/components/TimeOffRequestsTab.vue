<script setup lang="ts">
import { computed, h, ref, render, watch } from "vue";
import { AgGridSurface, Avatar, Button, Card, Icon, Input, Modal, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import type { TimeOffRequestRecord, TimeOffRequestStatus } from "@/data/hrisAdmin/timeOff";
import { timeOffEmployeeMeta } from "@/data/hrisAdmin/timeOff";
import { iconRegistry } from "@/composables/Icon";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

const props = defineProps<{
  requests: TimeOffRequestRecord[];
}>();

type RequestFilter = "all" | TimeOffRequestStatus;
type RequestGridRow = TimeOffRequestRecord & {
  employeeName: string;
  employeeCode: string;
  employeeTitle: string;
  employeeLocation: string;
  effectiveStatus: TimeOffRequestStatus;
};

const search = ref("");
const selectedYear = ref("2025");
const statusFilter = ref<RequestFilter>("all");
const selectedRequestId = ref<string | null>(null);
const detailOpen = ref(false);
const gridApi = ref<any>(null);
const overrides = ref<Record<string, TimeOffRequestStatus>>({});
const selectedAttachmentIndex = ref(0);

const yearOptions = [
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const effectiveRequests = computed<RequestGridRow[]>(() =>
  props.requests.map((item) => {
    const employee = timeOffEmployeeMeta(item.employeeId);
    return {
      ...item,
      employeeName: employee?.name ?? "-",
      employeeCode: employee?.employeeCode ?? "-",
      employeeTitle: employee?.title ?? "-",
      employeeLocation: employee?.location ?? "-",
      effectiveStatus: overrides.value[item.id] ?? item.status,
    };
  }),
);

const filteredRequests = computed(() =>
  effectiveRequests.value.filter((item) => {
    const matchesYear = item.requestDate.startsWith(selectedYear.value);
    const matchesStatus = statusFilter.value === "all" || item.effectiveStatus === statusFilter.value;
    return matchesYear && matchesStatus;
  }),
);

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});

const selectedRequest = computed(() =>
  selectedRequestId.value ? effectiveRequests.value.find((item) => item.id === selectedRequestId.value) ?? null : null,
);

const summary = computed(() => ({
  total: filteredRequests.value.length,
  awaiting: filteredRequests.value.filter((item) => item.effectiveStatus === "awaiting_approval").length,
  approved: filteredRequests.value.filter((item) => item.effectiveStatus === "approved").length,
  rejected: filteredRequests.value.filter((item) => item.effectiveStatus === "rejected").length,
}));

const requestOverviewCards = computed(() => [
  {
    key: "all" as RequestFilter,
    label: "Total requests",
    value: summary.value.total,
    tone: "text-primary",
  },
  {
    key: "awaiting_approval" as RequestFilter,
    label: "Awaiting approval",
    value: summary.value.awaiting,
    tone: "text-warning",
  },
  {
    key: "approved" as RequestFilter,
    label: "Approved",
    value: summary.value.approved,
    tone: "text-success",
  },
  {
    key: "rejected" as RequestFilter,
    label: "Rejected",
    value: summary.value.rejected,
    tone: "text-error",
  },
]);

const formatDate = (dateValue: string) =>
  new Date(`${dateValue}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const requestStatusClass = (status: TimeOffRequestStatus) => {
  switch (status) {
    case "approved":
      return "badge-success";
    case "rejected":
      return "badge-error";
    default:
      return "badge-warning";
  }
};

const requestStatusLabel = (status: TimeOffRequestStatus) => {
  switch (status) {
    case "approved":
      return "Approved";
    case "rejected":
      return "Rejected";
    default:
      return "Awaiting approval";
  }
};

const iconSvg = (name: string) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

const employeeRenderer = (params: any) => {
  const row = params.data as RequestGridRow | undefined;
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

const policyRenderer = (params: any) => {
  const row = params.data as RequestGridRow | undefined;
  if (!row) return "";
  return `<div class="py-1">
    <div class="font-medium">${row.policyName}</div>
    <div class="text-xs text-base-content/60">${row.policyCode}</div>
  </div>`;
};

const dateRangeRenderer = (params: any) => {
  const row = params.data as RequestGridRow | undefined;
  if (!row) return "";
  const range =
    row.startDate === row.endDate
      ? formatDate(row.startDate)
      : `${formatDate(row.startDate)} - ${formatDate(row.endDate)}`;
  const attachmentLine = row.attachmentCount ? `<div class="mt-1 text-xs text-primary">${row.attachmentCount} attachment</div>` : "";
  return `<div class="py-1 whitespace-normal leading-tight">
    <div>${range}</div>
    <div class="text-xs text-base-content/60">${row.durationLabel}</div>
    ${attachmentLine}
  </div>`;
};

const statusRenderer = (params: any) => {
  const row = params.data as RequestGridRow | undefined;
  if (!row) return "";
  return `<span class="badge badge-soft ${requestStatusClass(row.effectiveStatus)}">${requestStatusLabel(row.effectiveStatus)}</span>`;
};

const actionRenderer = () =>
  `<div class="flex h-full items-center justify-end gap-2">
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="view" title="View detail">
      ${iconSvg("eye")}
    </button>
  </div>`;

const columnDefs = [
  {
    field: "employeeName",
    headerName: "Employee name",
    minWidth: 260,
    pinned: "left",
    lockPinned: true,
    cellRenderer: employeeRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as RequestGridRow | undefined;
      if (!row) return "";
      return `${row.employeeName} ${row.employeeCode} ${row.employeeTitle} ${row.policyName} ${row.id}`;
    },
  },
  {
    field: "id",
    headerName: "Request ID",
    minWidth: 170,
  },
  {
    field: "requestDate",
    headerName: "Request date",
    minWidth: 150,
    valueFormatter: (params: any) => formatDate(String(params.value || "")),
  },
  {
    field: "policyName",
    headerName: "Policy name",
    minWidth: 180,
    cellRenderer: policyRenderer,
  },
  {
    field: "startDate",
    headerName: "Time off date",
    minWidth: 210,
    cellRenderer: dateRangeRenderer,
    autoHeight: true,
    wrapText: true,
  },
  {
    field: "effectiveStatus",
    headerName: "Status",
    minWidth: 170,
    cellRenderer: statusRenderer,
  },
  {
    headerName: "Actions",
    colId: "actions",
    width: 110,
    pinned: "right",
    lockPinned: true,
    sortable: false,
    filter: false,
    suppressHeaderMenuButton: true,
    cellRenderer: actionRenderer,
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
};

const onGridReady = (params: any) => {
  gridApi.value = params.api;
  params.api.setGridOption("quickFilterText", search.value);
};

const openDetail = (requestId: string) => {
  selectedRequestId.value = requestId;
  selectedAttachmentIndex.value = 0;
  detailOpen.value = true;
};

const closeDetail = () => {
  detailOpen.value = false;
};

const updateRequestStatus = (status: TimeOffRequestStatus) => {
  if (!selectedRequest.value) return;
  overrides.value = {
    ...overrides.value,
    [selectedRequest.value.id]: status,
  };
};

const onCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]");
  if (!actionEl) return;
  event.event?.stopPropagation?.();
  const row = event.data as RequestGridRow | undefined;
  const action = actionEl.getAttribute("data-action");
  if (!row || !action) return;
  if (action === "view") openDetail(row.id);
};

const setRequestFilter = (filter: RequestFilter) => {
  statusFilter.value = statusFilter.value === filter ? "all" : filter;
};

const attachmentPreviewMap: Record<string, string[]> = {
  WFH: [
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1200&q=80",
  ],
  CTU: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
  ],
  STS: [
    "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80",
  ],
  KSH: [
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1200&q=80",
  ],
  DDK: [
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
  ],
};

const attachmentPreviewList = computed(() => {
  if (!selectedRequest.value || !selectedRequest.value.attachmentCount) return null;
  const gallery = attachmentPreviewMap[selectedRequest.value.policyCode] ?? attachmentPreviewMap.WFH;
  return gallery.slice(0, selectedRequest.value.attachmentCount);
});

const activeAttachmentPreviewSrc = computed(() => {
  if (!attachmentPreviewList.value?.length) return null;
  return attachmentPreviewList.value[selectedAttachmentIndex.value] ?? attachmentPreviewList.value[0];
});

const showPrevAttachment = () => {
  if (!attachmentPreviewList.value?.length) return;
  selectedAttachmentIndex.value =
    selectedAttachmentIndex.value === 0
      ? attachmentPreviewList.value.length - 1
      : selectedAttachmentIndex.value - 1;
};

const showNextAttachment = () => {
  if (!attachmentPreviewList.value?.length) return;
  selectedAttachmentIndex.value =
    selectedAttachmentIndex.value === attachmentPreviewList.value.length - 1
      ? 0
      : selectedAttachmentIndex.value + 1;
};
</script>

<template>
  <div class="space-y-4">
    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <SelectDropdown v-model="selectedYear" :options="yearOptions" size="sm" variant="outline" color="default" />
          <Button variant="outline" color="primary" size="sm" class="w-full md:w-auto">
            <Icon name="settings" class="h-4 w-4" />
            All filters
          </Button>
        </div>
        <div class="w-full xl:w-[320px]">
          <Input v-model="search" size="sm" placeholder="Search employee name/ID" class="w-full" prefix-icon="search" clearable />
        </div>
      </div>

      <Card padding="p-0" class="overflow-hidden border border-warning/30 bg-warning/5">
        <div class="border-b border-base-300 bg-warning/10 px-5 py-4">
          <div class="flex items-center gap-2 text-base font-semibold">
            <span>Requests overview</span>
            <Icon name="clock" class="h-4 w-4 opacity-60" />
          </div>
        </div>
        <div class="grid gap-4 px-5 py-5 sm:grid-cols-2 xl:grid-cols-4">
          <div v-for="item in requestOverviewCards" :key="item.key" class="space-y-1">
            <button
              type="button"
              :class="[
                'w-full cursor-pointer rounded-xl border bg-base-100 px-3 py-3 text-left transition-all duration-150',
                statusFilter === item.key
                  ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                  : 'border-base-200 bg-base-100 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-base-50 hover:shadow-md',
              ]"
              @click="setRequestFilter(item.key)"
            >
              <div :class="['text-[1.85rem] font-semibold leading-none', item.tone]">{{ item.value }}</div>
              <div class="mt-2 text-xs font-medium tracking-[0.01em] text-base-content/70">{{ item.label }}</div>
            </button>
          </div>
        </div>
      </Card>
    </Card>

    <Card padding="p-3" class="overflow-hidden">
      <div class="h-[clamp(360px,58dvh,70dvh)] min-h-[420px] w-full">
        <AgGridSurface
          class="agx agx-compact ag-theme-quartz h-full min-h-0 w-full"
          theme="legacy"
          density="compact"
          :auto-height-when-few-rows="false"
          :auto-row-height="false"
          normal-layout-height="100%"
          :rowData="filteredRequests"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
          @cell-clicked="onCellClicked"
        />
      </div>
    </Card>

    <Modal :open="detailOpen" title="Request detail" size="md" @close="closeDetail">
      <div v-if="selectedRequest" class="space-y-4">
        <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold">Attachment preview</div>
              <div class="text-xs text-base-content/60">Dummy screenshot untuk gambaran area attachment saat request punya lampiran.</div>
            </div>
            <span class="badge badge-soft badge-primary">{{ selectedRequest.attachmentCount }} attachment</span>
          </div>
          <div class="mt-4 overflow-hidden rounded-2xl border border-base-300 bg-base-100">
            <div
              v-if="activeAttachmentPreviewSrc"
              class="relative flex min-h-[240px] items-center justify-center bg-base-200/40 p-3"
            >
              <button
                v-if="attachmentPreviewList && attachmentPreviewList.length > 1"
                type="button"
                class="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-base-300 bg-base-100/95 shadow-sm transition hover:border-primary/30 hover:bg-base-100"
                @click="showPrevAttachment"
              >
                <Icon name="chevron-left" class="h-5 w-5" />
              </button>
              <img
                :src="activeAttachmentPreviewSrc"
                alt="Attachment preview"
                class="max-h-[320px] w-full rounded-xl object-cover"
              />
              <button
                v-if="attachmentPreviewList && attachmentPreviewList.length > 1"
                type="button"
                class="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-base-300 bg-base-100/95 shadow-sm transition hover:border-primary/30 hover:bg-base-100"
                @click="showNextAttachment"
              >
                <Icon name="chevron-right" class="h-5 w-5" />
              </button>
            </div>
            <div
              v-else
              class="flex min-h-[220px] items-center justify-center text-center text-sm text-base-content/60"
            >
              Request ini tidak memiliki attachment.
            </div>
          </div>
          <div v-if="attachmentPreviewList?.length" class="mt-3 flex gap-2 overflow-auto">
            <button
              v-for="(item, index) in attachmentPreviewList"
              :key="`${item}-${index}`"
              type="button"
              :class="[
                'h-16 w-24 shrink-0 overflow-hidden rounded-xl border bg-base-100 transition',
                selectedAttachmentIndex === index
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-base-300 hover:border-primary/30',
              ]"
              @click="selectedAttachmentIndex = index"
            >
              <img :src="item" :alt="`Attachment thumbnail ${index + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <div class="rounded-2xl border border-base-300 p-4">
          <div class="flex items-start gap-3">
            <Avatar :alt="selectedRequest.employeeName" :fallback="selectedRequest.employeeName" size="md" color="primary" />
            <div class="min-w-0">
              <div class="text-lg font-semibold">{{ selectedRequest.employeeName }}</div>
              <div class="text-sm text-base-content/65">
                {{ selectedRequest.employeeCode }} · {{ selectedRequest.employeeTitle }}
              </div>
              <div class="mt-1 text-sm text-base-content/65">{{ selectedRequest.employeeLocation }}</div>
            </div>
          </div>

          <div class="mt-4 space-y-3 text-sm">
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Request ID</span><span>{{ selectedRequest.id }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Requested date</span><span>{{ formatDate(selectedRequest.requestDate) }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Policy</span><span>{{ selectedRequest.policyName }} ({{ selectedRequest.policyCode }})</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Time off date</span><span>{{ formatDate(selectedRequest.startDate) }}<span v-if="selectedRequest.endDate !== selectedRequest.startDate"> - {{ formatDate(selectedRequest.endDate) }}</span></span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Duration</span><span>{{ selectedRequest.durationLabel }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Approver</span><span>{{ selectedRequest.approverName }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Status</span><span><span class="badge badge-soft" :class="requestStatusClass(selectedRequest.effectiveStatus)">{{ requestStatusLabel(selectedRequest.effectiveStatus) }}</span></span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Reason</span><span>{{ selectedRequest.reason }}</span></div>
          </div>
        </div>

      </div>

      <template #footer>
        <Button variant="ghost" color="default" @click="closeDetail">Close</Button>
        <Button
          variant="outline"
          color="error"
          :disabled="selectedRequest?.effectiveStatus !== 'awaiting_approval'"
          @click="updateRequestStatus('rejected')"
        >
          Reject
        </Button>
        <Button
          color="primary"
          :disabled="selectedRequest?.effectiveStatus !== 'awaiting_approval'"
          @click="updateRequestStatus('approved')"
        >
          Approve
        </Button>
      </template>
    </Modal>
  </div>
</template>
