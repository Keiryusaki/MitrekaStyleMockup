<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { AgGridSurface, Button, Card, DateTimePicker, FileUpload, Input, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { iconRegistry } from "@/composables/Icon";
import { employeeProfile, employeeTimeOffRequests, getEmployeeTimeOffTimeline, type EmployeeTimeOffRequest } from "@/data/hrisEmployee/timeOff";
import { timeOffEmployeeMeta, timeOffRequests, type TimeOffRequestStatus } from "@/data/hrisAdmin/timeOff";
import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";
import { calcAgRowHeight, resolveAgFontPx } from "@/composables/useAgGridRowHeight";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type RequestRow = {
  id: string;
  requestType: string;
  submittedAt: string;
  startDate: string;
  endDate: string;
  period: string;
  durationLabel: string;
  reason: string;
  approverName: string;
  approverNote?: string;
  status: "awaiting_approval" | "approved" | "rejected";
};
type StatusFilter = "all" | RequestRow["status"];
type RequestTab = "mine" | "approval";
type ApprovalFilter = "all" | TimeOffRequestStatus;
type ApprovalRow = {
  id: string;
  employeeName: string;
  employeeCode: string;
  employeeTitle: string;
  employeeLocation: string;
  requestDate: string;
  policyName: string;
  policyCode: string;
  startDate: string;
  endDate: string;
  durationLabel: string;
  reason: string;
  approverName: string;
  status: TimeOffRequestStatus;
  attachmentCount: number;
};

const statusToneMap = {
  awaiting_approval: "badge badge-inline badge-warning badge-xxs",
  approved: "badge badge-inline badge-success badge-xxs",
  rejected: "badge badge-inline badge-error badge-xxs",
} as const;

const statusLabelMap = {
  awaiting_approval: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
} as const;

const timeOffTypeOptions = ["Cuti Tahunan", "Cuti Sakit", "Izin Pribadi", "Izin Khusus"];
const requestTypeOptions = timeOffTypeOptions.map((label) => ({
  value: label,
  label,
}));

const requestType = ref<string | null>(null);
const dateRange = ref<string[]>([]);
const reason = ref("");
const activeTab = ref<RequestTab>("mine");
const route = useRoute();
const delegateEmployeeId = ref<string>("");
const uploadedFiles = ref<File[]>([]);
const requestModalOpen = ref(false);
const showSubmittedNotice = ref(false);
const search = ref("");
const statusFilter = ref<StatusFilter>("all");
const approvalSearch = ref("");
const approvalStatusFilter = ref<ApprovalFilter>("all");
const detailModalOpen = ref(false);
const deleteModalOpen = ref(false);
const approvalDetailOpen = ref(false);
const selectedDetailRow = ref<RequestRow | null>(null);
const selectedDeleteRow = ref<RequestRow | null>(null);
const selectedApprovalRequestId = ref<string | null>(null);
const selectedApprovalAttachmentIndex = ref(0);
const editingRequestId = ref<string | null>(null);
const requestRecords = ref<EmployeeTimeOffRequest[]>(employeeTimeOffRequests.map((item) => ({ ...item })));
const gridApi = ref<any>(null);
const approvalGridApi = ref<any>(null);
const approvalRecords = ref<ApprovalRow[]>(
  timeOffRequests.map((item) => {
    const employee = timeOffEmployeeMeta(item.employeeId);
    return {
      id: item.id,
      employeeName: employee?.name ?? "Unknown Employee",
      employeeCode: employee?.employeeCode ?? "-",
      employeeTitle: employee?.title ?? "-",
      employeeLocation: employee?.location ?? "-",
      requestDate: item.requestDate,
      policyName: item.policyName,
      policyCode: item.policyCode,
      startDate: item.startDate,
      endDate: item.endDate,
      durationLabel: item.durationLabel,
      reason: item.reason,
      approverName: item.approverName,
      status: item.status,
      attachmentCount: item.attachmentCount,
    };
  }),
);
const isDark = ref(false);
const compactRowHeight = ref(24);

let htmlObs: MutationObserver | null = null;

const computeDark = () => {
  const html = document.documentElement;
  isDark.value =
    html.classList.contains("dark") ||
    (html.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
};

onMounted(() => {
  computeDark();
  compactRowHeight.value = calcAgRowHeight(resolveAgFontPx(), "compact");
  resolveTabFromRoute();
  htmlObs = new MutationObserver(computeDark);
  htmlObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
});

onBeforeUnmount(() => {
  htmlObs?.disconnect();
});

const themeClass = computed(() => (isDark.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"));
const gridKey = computed(() => (isDark.value ? "dark" : "light"));

const rows = computed<RequestRow[]>(() =>
  [...requestRecords.value]
    .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1))
    .map((item) => ({
      id: item.id,
      requestType: item.requestType,
      submittedAt: item.submittedAt,
      startDate: item.startDate,
      endDate: item.endDate,
      period: `${item.startDate} - ${item.endDate}`,
      durationLabel: item.durationLabel,
      reason: item.reason,
      approverName: item.approverName,
      approverNote: item.approverNote,
      status: item.status,
    })),
);
const filteredRows = computed(() =>
  rows.value.filter((item) => (statusFilter.value === "all" ? true : item.status === statusFilter.value)),
);
const filteredApprovalRows = computed(() =>
  approvalRecords.value.filter((item) => (approvalStatusFilter.value === "all" ? true : item.status === approvalStatusFilter.value)),
);

const statusFilterOptions = [
  { value: "all", label: "Semua status" },
  { value: "awaiting_approval", label: "Menunggu" },
  { value: "approved", label: "Disetujui" },
  { value: "rejected", label: "Ditolak" },
];
const approvalStatusOptions = [
  { value: "all", label: "Semua status" },
  { value: "awaiting_approval", label: "Menunggu approval" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];
const tabItems = computed(() => [
  {
    key: "mine" as const,
    label: "Pengajuan Saya",
    count: rows.value.filter((item) => item.status === "awaiting_approval").length,
  },
  {
    key: "approval" as const,
    label: "Butuh Persetujuan Saya",
    count: approvalRecords.value.filter((item) => item.status === "awaiting_approval").length,
  },
]);
const resolveTabFromRoute = () => {
  activeTab.value = route.query.tab === "approval" ? "approval" : "mine";
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const statusRenderer = (params: any) => {
  const status = params.value as RequestRow["status"] | undefined;
  if (!status) return "-";
  const badgeClass =
    status === "approved"
      ? "badge badge-inline badge-success badge-xxs"
      : status === "awaiting_approval"
      ? "badge badge-inline badge-warning badge-xxs"
      : "badge badge-inline badge-error badge-xxs";
  return `<span class="${badgeClass}">${escapeHtml(statusLabelMap[status])}</span>`;
};

const iconSvg = (name: keyof typeof iconRegistry) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="h-4 w-4"');
const formatDisplayDate = (value: string) =>
  new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
const toInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "NA";
  return (parts[0][0] + (parts[1]?.[0] ?? "")).toUpperCase();
};
const approvalStatusLabel = (status: TimeOffRequestStatus) => {
  if (status === "approved") return "Approved";
  if (status === "rejected") return "Rejected";
  return "Awaiting approval";
};
const approvalStatusClass = (status: TimeOffRequestStatus) => {
  if (status === "approved") return "badge-success";
  if (status === "rejected") return "badge-error";
  return "badge-warning";
};

const actionRenderer = (params: any) => {
  const row = params.data as RequestRow | undefined;
  if (!row) return "-";
  if (row.status === "awaiting_approval") {
    return `<div class="flex h-full items-center justify-center gap-2">
      <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="edit" title="Ubah pengajuan">
        ${iconSvg("pencil")}
      </button>
      <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" data-action="delete" title="Hapus pengajuan">
        ${iconSvg("trash")}
      </button>
    </div>`;
  }
  return `<div class="flex h-full items-center justify-center">
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="detail" title="Lihat detail status">
      ${iconSvg("eye")}
    </button>
  </div>`;
};
const approvalEmployeeRenderer = (params: any) => {
  const row = params.data as ApprovalRow | undefined;
  if (!row) return "-";
  return `<div class="flex min-h-9 w-full items-center gap-2 py-1">
    <span class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/15 text-[11px] font-semibold text-primary">${escapeHtml(toInitials(row.employeeName))}</span>
    <div class="min-w-0">
      <div class="truncate text-[13px] font-semibold text-primary">${escapeHtml(row.employeeName)}</div>
      <div class="truncate text-[10px] text-base-content/70">${escapeHtml(row.employeeCode)} | ${escapeHtml(row.employeeTitle)}</div>
    </div>
  </div>`;
};
const approvalPolicyRenderer = (params: any) => {
  const row = params.data as ApprovalRow | undefined;
  if (!row) return "-";
  return `<div class="py-1">
    <div class="font-medium">${escapeHtml(row.policyName)}</div>
    <div class="text-xs text-base-content/60">${escapeHtml(row.policyCode)}</div>
  </div>`;
};
const approvalDateRenderer = (params: any) => {
  const row = params.data as ApprovalRow | undefined;
  if (!row) return "-";
  const range =
    row.startDate === row.endDate
      ? formatDisplayDate(row.startDate)
      : `${formatDisplayDate(row.startDate)} - ${formatDisplayDate(row.endDate)}`;
  const attachmentLine = row.attachmentCount ? `<div class="mt-1 text-xs text-primary">${row.attachmentCount} attachment</div>` : "";
  return `<div class="py-1 whitespace-normal leading-tight">
    <div>${escapeHtml(range)}</div>
    <div class="text-xs text-base-content/60">${escapeHtml(row.durationLabel)}</div>
    ${attachmentLine}
  </div>`;
};
const approvalStatusRenderer = (params: any) => {
  const status = params.value as TimeOffRequestStatus | undefined;
  if (!status) return "-";
  const badgeClass =
    status === "approved"
      ? "badge badge-inline badge-success badge-xxs"
      : status === "awaiting_approval"
      ? "badge badge-inline badge-warning badge-xxs"
      : "badge badge-inline badge-error badge-xxs";
  return `<span class="${badgeClass}">${escapeHtml(approvalStatusLabel(status))}</span>`;
};
const approvalActionRenderer = (params: any) => {
  return `<div class="flex h-full items-center justify-center">
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-approval-action="detail" title="Lihat detail">
      ${iconSvg("eye")}
    </button>
  </div>`;
};

const columnDefs = [
  { field: "requestType", headerName: "Jenis", minWidth: 170, pinned: "left", lockPinned: true },
  { field: "period", headerName: "Periode", minWidth: 220 },
  { field: "durationLabel", headerName: "Durasi", minWidth: 120 },
  { field: "submittedAt", headerName: "Submitted", minWidth: 130 },
  { field: "approverName", headerName: "Approver", minWidth: 180 },
  {
    field: "status",
    headerName: "Status",
    width: 116,
    minWidth: 108,
    maxWidth: 120,
    pinned: "right",
    lockPinned: true,
    cellClass: "agx-cell-badge",
    cellRenderer: statusRenderer,
  },
  {
    headerName: "Aksi",
    colId: "actions",
    width: 108,
    pinned: "right",
    lockPinned: true,
    sortable: false,
    filter: false,
    suppressHeaderMenuButton: true,
    cellRenderer: actionRenderer,
  },
];
const approvalColumnDefs = [
  {
    field: "employeeName",
    headerName: "Employee name",
    minWidth: 250,
    pinned: "left",
    lockPinned: true,
    cellRenderer: approvalEmployeeRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as ApprovalRow | undefined;
      if (!row) return "";
      return `${row.employeeName} ${row.employeeCode} ${row.employeeTitle} ${row.policyName} ${row.id}`;
    },
  },
  { field: "id", headerName: "Request ID", minWidth: 170 },
  {
    field: "requestDate",
    headerName: "Request date",
    minWidth: 150,
    valueFormatter: (params: any) => formatDisplayDate(String(params.value || "")),
  },
  { field: "policyName", headerName: "Policy name", minWidth: 180, cellRenderer: approvalPolicyRenderer },
  {
    field: "startDate",
    headerName: "Time off date",
    minWidth: 210,
    cellRenderer: approvalDateRenderer,
    autoHeight: true,
    wrapText: true,
  },
  {
    field: "status",
    headerName: "Status",
    width: 176,
    minWidth: 168,
    maxWidth: 190,
    cellClass: "agx-cell-badge",
    cellRenderer: approvalStatusRenderer,
  },
  {
    headerName: "Actions",
    colId: "approval-actions",
    width: 130,
    pinned: "right",
    lockPinned: true,
    sortable: false,
    filter: false,
    suppressHeaderMenuButton: true,
    cellRenderer: approvalActionRenderer,
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
  paginationPageSize: 5,
  paginationPageSizeSelector: [5, 10, 20],
};
const approvalGridOptions: any = {
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
const onApprovalGridReady = (params: any) => {
  approvalGridApi.value = params.api;
  params.api.setGridOption("quickFilterText", approvalSearch.value);
};

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});
watch(filteredRows, () => {
  gridApi.value?.setGridOption("quickFilterText", search.value);
});
watch(approvalSearch, (value) => {
  approvalGridApi.value?.setGridOption("quickFilterText", value);
});
watch(filteredApprovalRows, () => {
  approvalGridApi.value?.setGridOption("quickFilterText", approvalSearch.value);
});
watch(
  () => route.query.tab,
  () => resolveTabFromRoute(),
);

const dateRangeLabel = computed(() =>
  dateRange.value.length === 2 ? `${dateRange.value[0]} s/d ${dateRange.value[1]}` : "Bisa pilih lebih dari 1 hari.",
);

const delegateOptions = computed(() => [
  { value: "", label: "Pilih karyawan pengganti" },
  ...employeeDirectory
    .filter((item) => item.status !== "Leave")
    .map((item) => ({
      value: String(item.id),
      label: `${item.name} - ${item.title}`,
    })),
]);

const selectedDelegate = computed(() =>
  employeeDirectory.find((item) => String(item.id) === delegateEmployeeId.value) ?? null,
);

const canSubmit = computed(
  () => Boolean(requestType.value) && dateRange.value.length === 2 && Boolean(reason.value.trim()),
);

const uploadedImageSummary = computed(() =>
  uploadedFiles.value.length ? `${uploadedFiles.value.length} gambar dipilih` : "Belum ada gambar dipilih",
);
const rightSummaryCards = computed(() => [
  { label: "Sisa cuti tahunan", value: `${employeeProfile.annualLeaveBalance} hari`, tone: "text-primary" },
  { label: "Sisa cuti sakit", value: `${employeeProfile.sickLeaveBalance} hari`, tone: "text-warning" },
  {
    label: "Request menunggu approval",
    value: rows.value.filter((item) => item.status === "awaiting_approval").length,
    tone: "text-info",
  },
]);
const totalSubmitted = computed(() => rows.value.length);
const approvedCount = computed(() => rows.value.filter((item) => item.status === "approved").length);

const resetForm = () => {
  requestType.value = null;
  dateRange.value = [];
  reason.value = "";
  delegateEmployeeId.value = "";
  uploadedFiles.value = [];
  editingRequestId.value = null;
};
const openRequestModal = () => {
  resetForm();
  requestModalOpen.value = true;
};
const closeRequestModal = () => {
  requestModalOpen.value = false;
};

const openEditModal = (row: RequestRow) => {
  editingRequestId.value = row.id;
  requestType.value = row.requestType;
  dateRange.value = [row.startDate, row.endDate];
  reason.value = row.reason;
  delegateEmployeeId.value = "";
  uploadedFiles.value = [];
  requestModalOpen.value = true;
};

const openDetailModal = (row: RequestRow) => {
  selectedDetailRow.value = row;
  detailModalOpen.value = true;
};

const openDeleteModal = (row: RequestRow) => {
  selectedDeleteRow.value = row;
  deleteModalOpen.value = true;
};

const closeDetailModal = () => {
  detailModalOpen.value = false;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
};

const selectedTimeline = computed(() =>
  selectedDetailRow.value ? getEmployeeTimeOffTimeline(selectedDetailRow.value.id) : [],
);
const selectedApprovalRow = computed(() =>
  selectedApprovalRequestId.value
    ? approvalRecords.value.find((item) => item.id === selectedApprovalRequestId.value) ?? null
    : null,
);
const approvalAttachmentPreviewMap: Record<string, string[]> = {
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
const approvalAttachmentPreviewList = computed(() => {
  if (!selectedApprovalRow.value || !selectedApprovalRow.value.attachmentCount) return null;
  const gallery = approvalAttachmentPreviewMap[selectedApprovalRow.value.policyCode] ?? approvalAttachmentPreviewMap.WFH;
  return gallery.slice(0, selectedApprovalRow.value.attachmentCount);
});
const activeApprovalAttachmentPreviewSrc = computed(() => {
  if (!approvalAttachmentPreviewList.value?.length) return null;
  return approvalAttachmentPreviewList.value[selectedApprovalAttachmentIndex.value] ?? approvalAttachmentPreviewList.value[0];
});

const calculateDurationLabel = (startDate: string, endDate: string) => {
  const start = new Date(`${startDate}T00:00:00`);
  const end = new Date(`${endDate}T00:00:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) return "1 hari";
  const diffDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86400000) + 1);
  return `${diffDays} hari`;
};

const nextRequestId = () => {
  const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const serial = String(requestRecords.value.length + 1).padStart(4, "0");
  return `REQ-${stamp}-${serial}`;
};

const onCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]");
  if (!actionEl) return;
  const row = event.data as RequestRow | undefined;
  const action = actionEl.getAttribute("data-action");
  if (!row || !action) return;
  if (action === "detail" && row.status !== "awaiting_approval") openDetailModal(row);
  if (action === "edit" && row.status === "awaiting_approval") openEditModal(row);
  if (action === "delete" && row.status === "awaiting_approval") openDeleteModal(row);
};
const openApprovalDetail = (row: ApprovalRow) => {
  selectedApprovalRequestId.value = row.id;
  selectedApprovalAttachmentIndex.value = 0;
  approvalDetailOpen.value = true;
};
const closeApprovalDetail = () => {
  approvalDetailOpen.value = false;
  selectedApprovalRequestId.value = null;
};
const showPrevApprovalAttachment = () => {
  if (!approvalAttachmentPreviewList.value?.length) return;
  selectedApprovalAttachmentIndex.value =
    selectedApprovalAttachmentIndex.value === 0
      ? approvalAttachmentPreviewList.value.length - 1
      : selectedApprovalAttachmentIndex.value - 1;
};
const showNextApprovalAttachment = () => {
  if (!approvalAttachmentPreviewList.value?.length) return;
  selectedApprovalAttachmentIndex.value =
    selectedApprovalAttachmentIndex.value === approvalAttachmentPreviewList.value.length - 1
      ? 0
      : selectedApprovalAttachmentIndex.value + 1;
};
const updateApprovalStatus = (requestId: string, status: TimeOffRequestStatus) => {
  approvalRecords.value = approvalRecords.value.map((item) =>
    item.id === requestId ? { ...item, status } : item,
  );
};
const onApprovalCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-approval-action]");
  if (!actionEl) return;
  const row = event.data as ApprovalRow | undefined;
  const action = actionEl.getAttribute("data-approval-action");
  if (!row || !action) return;
  if (action === "detail") openApprovalDetail(row);
};

const confirmDelete = () => {
  if (!selectedDeleteRow.value) return;
  requestRecords.value = requestRecords.value.filter((item) => item.id !== selectedDeleteRow.value?.id);
  deleteModalOpen.value = false;
  selectedDeleteRow.value = null;
};

const submitRequest = () => {
  if (!canSubmit.value) return;
  const startDate = dateRange.value[0];
  const endDate = dateRange.value[1];
  if (!startDate || !endDate || !requestType.value) return;

  if (editingRequestId.value) {
    const target = requestRecords.value.find((item) => item.id === editingRequestId.value);
    if (target) {
      target.requestType = requestType.value;
      target.startDate = startDate;
      target.endDate = endDate;
      target.durationLabel = calculateDurationLabel(startDate, endDate);
      target.reason = reason.value.trim();
    }
  } else {
    requestRecords.value.unshift({
      id: nextRequestId(),
      requestType: requestType.value,
      submittedAt: new Date().toISOString().slice(0, 10),
      startDate,
      endDate,
      durationLabel: calculateDurationLabel(startDate, endDate),
      reason: reason.value.trim(),
      approverName: "Supriyatna",
      status: "awaiting_approval",
    });
  }

  requestModalOpen.value = false;
  showSubmittedNotice.value = true;
  resetForm();
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Employee"
      title="Permohonan Cuti/Izin"
      description="Halaman employee untuk melihat pengajuan, status approval, serta ajukan cuti/izin lewat modal form."
    />

    <Card v-if="showSubmittedNotice" padding="p-4">
      <div class="rounded-xl border border-info/30 bg-info/10 p-3 text-sm text-base-content/80">
        Pengajuan berhasil disubmit ke atasan. Lanjut pantau statusnya di daftar pengajuan terbaru di bawah ini.
      </div>
    </Card>

    <Card padding="p-0" class="overflow-hidden">
      <div class="border-b border-base-300 bg-base-50 px-4 pt-3">
        <div class="tabs tabs-bordered flex-wrap">
          <button
            v-for="item in tabItems"
            :key="item.key"
            type="button"
            class="tab tab-bordered h-auto min-h-[unset] justify-start px-4 py-2 text-left !border-b-2 !rounded-t-lg !rounded-b-none !transition-none"
            :class="[activeTab === item.key ? 'tab-active !border-primary !text-primary' : '!border-transparent']"
            @click="activeTab = item.key"
          >
            <span>{{ item.label }}</span>
            <span class="badge badge-soft badge-primary badge-xxs">{{ item.count }}</span>
          </button>
        </div>
      </div>
      <div class="p-4">
        <div v-if="activeTab === 'mine'" class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
          <Card padding="p-4" class="space-y-4">
            <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <div class="text-base font-semibold">Daftar Pengajuan</div>
                <div class="text-sm text-base-content/65">Riwayat request employee dalam format AG Grid.</div>
              </div>
              <div class="flex flex-col gap-2 md:flex-row md:items-center">
                <div class="w-full md:w-[220px]">
                  <SelectDropdown v-model="statusFilter" :options="statusFilterOptions" size="sm" variant="outline" color="default" />
                </div>
              </div>
            </div>

            <div class="w-full md:w-[320px]">
              <Input v-model="search" size="sm" placeholder="Cari request..." class="w-full" />
            </div>

            <div class="h-[420px]">
              <AgGridSurface
                :key="`mine-${gridKey}`"
                :class="['agx', 'agx-compact', themeClass, 'h-full', 'w-full']"
                theme="legacy"
                density="compact"
                :auto-height-when-few-rows="false"
                :auto-row-height="false"
                :rowHeight="compactRowHeight"
                normal-layout-height="100%"
                :rowData="filteredRows"
                :columnDefs="columnDefs"
                :defaultColDef="defaultColDef"
                :gridOptions="gridOptions"
                @grid-ready="onGridReady"
                @cell-clicked="onCellClicked"
              />
            </div>
          </Card>

          <Card padding="p-4" class="space-y-4">
            <div>
              <div class="text-base font-semibold">Time Off Balance</div>
              <div class="text-sm text-base-content/65">Ringkasan saldo dan progres pengajuan.</div>
            </div>
            <div class="space-y-3">
              <div
                v-for="item in rightSummaryCards"
                :key="item.label"
                class="rounded-xl border border-base-300 bg-base-50 p-3"
              >
                <div class="text-xs text-base-content/65">{{ item.label }}</div>
                <div class="mt-1 text-xl font-semibold" :class="item.tone">{{ item.value }}</div>
              </div>
            </div>
            <div class="grid gap-2 rounded-xl border border-base-300 bg-base-50 p-3 text-sm">
              <div class="flex items-center justify-between">
                <span class="text-base-content/70">Total pengajuan</span>
                <span class="font-semibold">{{ totalSubmitted }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-base-content/70">Disetujui</span>
                <span class="font-semibold text-success">{{ approvedCount }}</span>
              </div>
            </div>
            <Button color="primary" class="w-full" @click="openRequestModal">Ajukan Permohonan</Button>
          </Card>
        </div>

        <Card v-else padding="p-4" class="space-y-4">
          <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div class="text-base font-semibold">Request Butuh Persetujuan</div>
              <div class="text-sm text-base-content/65">Daftar permohonan tim yang perlu kamu approve/reject.</div>
            </div>
            <div class="flex w-full flex-col gap-2 md:w-auto md:flex-row md:items-center">
              <div class="w-full md:w-[220px]">
                <SelectDropdown v-model="approvalStatusFilter" :options="approvalStatusOptions" size="sm" variant="outline" color="default" />
              </div>
              <div class="w-full md:w-[320px]">
                <Input v-model="approvalSearch" size="sm" placeholder="Cari nama/ID/policy..." class="w-full" />
              </div>
            </div>
          </div>

          <div class="h-[520px]">
            <AgGridSurface
              :key="`approval-${gridKey}`"
              :class="['agx', 'agx-compact', themeClass, 'h-full', 'w-full']"
              theme="legacy"
              density="compact"
              :auto-height-when-few-rows="false"
              :auto-row-height="false"
              :rowHeight="compactRowHeight"
              normal-layout-height="100%"
              :rowData="filteredApprovalRows"
              :columnDefs="approvalColumnDefs"
              :defaultColDef="defaultColDef"
              :gridOptions="approvalGridOptions"
              @grid-ready="onApprovalGridReady"
              @cell-clicked="onApprovalCellClicked"
            />
          </div>
        </Card>
      </div>
    </Card>

    <Modal
      :open="requestModalOpen"
      title="Ajukan Cuti/Izin"
      size="lg"
      @close="closeRequestModal"
    >
      <div class="space-y-5">
        <div class="space-y-1">
          <label class="text-sm font-medium">Tipe Izin/Cuti</label>
          <SelectDropdown v-model="requestType" :options="requestTypeOptions" size="sm" variant="outline" color="default" />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Tanggal (Range)</label>
          <DateTimePicker
            v-model="dateRange"
            mode="range"
            clearable
            placeholder="Pilih rentang tanggal"
            input-class="input input-sm w-full bg-white"
          />
          <p class="text-xs text-base-content/65">{{ dateRangeLabel }}</p>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Alasan</label>
          <textarea v-model="reason" class="input min-h-28 w-full py-2" />
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Delegasikan ke (opsional)</label>
          <SelectDropdown
            v-model="delegateEmployeeId"
            :options="delegateOptions"
            size="sm"
            variant="outline"
            color="default"
          />
          <p v-if="selectedDelegate" class="text-xs text-base-content/65">
            Penanggung jawab saat off: {{ selectedDelegate.name }} ({{ selectedDelegate.title }})
          </p>
        </div>

        <div class="space-y-2">
          <label class="text-sm font-medium">Upload file</label>
          <div class="rounded-xl border border-base-300 bg-base-200 p-3">
            <FileUpload
              v-model="uploadedFiles"
              multiple
              accept="image/*"
              preview
              dropzone-text="Drop image here"
              browse-text="or click to add more images"
              helper-text="Bisa pilih banyak gambar sekaligus atau tambah bertahap."
              max-size-text="Maks. ukuran file 10 MB per gambar"
              empty-text="Belum ada gambar dipilih"
            />
          </div>
          <p class="text-xs text-base-content/65">{{ uploadedImageSummary }}</p>
        </div>

      </div>
      <template #footer>
        <div class="flex items-center justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeRequestModal">Batal</Button>
          <Button color="primary" :disabled="!canSubmit" @click="submitRequest">Submit request</Button>
        </div>
      </template>
    </Modal>

    <Modal :open="detailModalOpen" title="Detail Status Pengajuan" size="md" hide-footer @close="closeDetailModal">
      <div v-if="selectedDetailRow" class="space-y-4">
        <div class="rounded-xl border border-base-300 bg-base-50 p-3">
          <div class="flex items-center justify-between gap-2">
            <p class="text-sm font-semibold">{{ selectedDetailRow.requestType }}</p>
            <span :class="statusToneMap[selectedDetailRow.status]">
              {{ statusLabelMap[selectedDetailRow.status] }}
            </span>
          </div>
          <p class="mt-1 text-xs text-base-content/60">Submitted {{ selectedDetailRow.submittedAt }}</p>
          <p class="mt-2 text-sm">{{ selectedDetailRow.reason }}</p>
        </div>

        <div class="space-y-3 rounded-xl border border-base-300 bg-base-50 p-3">
          <p class="text-xs font-semibold uppercase tracking-wide text-base-content/60">Status Persetujuan</p>
          <div class="flex items-start gap-2">
            <span
              class="inline-flex h-5 w-5 items-center justify-center rounded-full text-white"
              :class="selectedDetailRow.status === 'approved' ? 'bg-success' : 'bg-error'"
            >
              {{ selectedDetailRow.status === "approved" ? "✓" : "✕" }}
            </span>
            <div>
              <p class="text-sm font-semibold">
                {{ selectedDetailRow.status === "approved" ? "Disetujui" : "Ditolak" }} oleh {{ selectedDetailRow.approverName }}
              </p>
              <p class="text-xs text-base-content/60">{{ selectedDetailRow.approverNote || "Belum ada catatan tambahan." }}</p>
            </div>
          </div>
          <div class="ml-2 h-4 w-px bg-base-300"></div>
          <div class="flex items-start gap-2">
            <span class="inline-flex h-5 w-5 rounded-full bg-primary"></span>
            <div>
              <p class="text-sm font-semibold">Diajukan oleh Employee</p>
              <p class="text-xs text-base-content/60">{{ selectedDetailRow.submittedAt }}</p>
            </div>
          </div>
        </div>

        <div v-if="selectedTimeline.length" class="space-y-2">
          <p class="text-sm font-semibold">Timeline</p>
          <div v-for="item in selectedTimeline" :key="item.key" class="rounded-xl border border-base-300 bg-base-50 p-3 text-sm">
            <div class="flex items-center justify-between gap-2">
              <span class="font-semibold">{{ item.label }}</span>
              <span class="text-xs text-base-content/60">{{ item.at }}</span>
            </div>
            <p class="text-xs text-base-content/65">{{ item.actor }}</p>
            <p class="mt-1">{{ item.note }}</p>
          </div>
        </div>
      </div>
    </Modal>

    <Modal :open="approvalDetailOpen" title="Request detail" size="md" @close="closeApprovalDetail">
      <div v-if="selectedApprovalRow" class="space-y-4">
        <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
          <div class="flex items-center justify-between gap-3">
            <div>
              <div class="text-sm font-semibold">Attachment preview</div>
              <div class="text-xs text-base-content/60">Dummy screenshot untuk gambaran area attachment saat request punya lampiran.</div>
            </div>
            <span class="badge badge-soft badge-primary">{{ selectedApprovalRow.attachmentCount }} attachment</span>
          </div>
          <div class="mt-4 overflow-hidden rounded-2xl border border-base-300 bg-base-100">
            <div
              v-if="activeApprovalAttachmentPreviewSrc"
              class="relative flex min-h-[240px] items-center justify-center bg-base-200/40 p-3"
            >
              <button
                v-if="approvalAttachmentPreviewList && approvalAttachmentPreviewList.length > 1"
                type="button"
                class="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-base-300 bg-base-100/95 shadow-sm transition hover:border-primary/30 hover:bg-base-100"
                @click="showPrevApprovalAttachment"
              >
                <span v-html="iconSvg('chevron-left')"></span>
              </button>
              <img
                :src="activeApprovalAttachmentPreviewSrc"
                alt="Attachment preview"
                class="max-h-[320px] w-full rounded-xl object-cover"
              />
              <button
                v-if="approvalAttachmentPreviewList && approvalAttachmentPreviewList.length > 1"
                type="button"
                class="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-base-300 bg-base-100/95 shadow-sm transition hover:border-primary/30 hover:bg-base-100"
                @click="showNextApprovalAttachment"
              >
                <span v-html="iconSvg('chevron-right')"></span>
              </button>
            </div>
            <div
              v-else
              class="flex min-h-[220px] items-center justify-center text-center text-sm text-base-content/60"
            >
              Request ini tidak memiliki attachment.
            </div>
          </div>
          <div v-if="approvalAttachmentPreviewList?.length" class="mt-3 flex gap-2 overflow-auto">
            <button
              v-for="(item, index) in approvalAttachmentPreviewList"
              :key="`${item}-${index}`"
              type="button"
              :class="[
                'h-16 w-24 shrink-0 overflow-hidden rounded-xl border bg-base-100 transition',
                selectedApprovalAttachmentIndex === index
                  ? 'border-primary ring-1 ring-primary/20'
                  : 'border-base-300 hover:border-primary/30',
              ]"
              @click="selectedApprovalAttachmentIndex = index"
            >
              <img :src="item" :alt="`Attachment thumbnail ${index + 1}`" class="h-full w-full object-cover" />
            </button>
          </div>
        </div>

        <div class="rounded-2xl border border-base-300 p-4">
          <div class="flex items-start gap-3">
            <span class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
              {{ toInitials(selectedApprovalRow.employeeName) }}
            </span>
            <div class="min-w-0">
              <div class="text-lg font-semibold">{{ selectedApprovalRow.employeeName }}</div>
              <div class="text-sm text-base-content/65">
                {{ selectedApprovalRow.employeeCode }} · {{ selectedApprovalRow.employeeTitle }}
              </div>
              <div class="mt-1 text-sm text-base-content/65">{{ selectedApprovalRow.employeeLocation }}</div>
            </div>
          </div>

          <div class="mt-4 space-y-3 text-sm">
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Request ID</span><span>{{ selectedApprovalRow.id }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Requested date</span><span>{{ formatDisplayDate(selectedApprovalRow.requestDate) }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Policy</span><span>{{ selectedApprovalRow.policyName }} ({{ selectedApprovalRow.policyCode }})</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Time off date</span><span>{{ formatDisplayDate(selectedApprovalRow.startDate) }}<span v-if="selectedApprovalRow.endDate !== selectedApprovalRow.startDate"> - {{ formatDisplayDate(selectedApprovalRow.endDate) }}</span></span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Duration</span><span>{{ selectedApprovalRow.durationLabel }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Approver</span><span>{{ selectedApprovalRow.approverName }}</span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Status</span><span><span class="badge badge-soft" :class="approvalStatusClass(selectedApprovalRow.status)">{{ approvalStatusLabel(selectedApprovalRow.status) }}</span></span></div>
            <div class="grid grid-cols-[120px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Reason</span><span>{{ selectedApprovalRow.reason }}</span></div>
          </div>
        </div>
      </div>
      <template #footer>
        <Button variant="ghost" color="default" @click="closeApprovalDetail">Close</Button>
        <Button
          variant="outline"
          color="error"
          :disabled="selectedApprovalRow?.status !== 'awaiting_approval'"
          @click="selectedApprovalRow && updateApprovalStatus(selectedApprovalRow.id, 'rejected')"
        >
          Reject
        </Button>
        <Button
          color="primary"
          :disabled="selectedApprovalRow?.status !== 'awaiting_approval'"
          @click="selectedApprovalRow && updateApprovalStatus(selectedApprovalRow.id, 'approved')"
        >
          Approve
        </Button>
      </template>
    </Modal>

    <Modal :open="deleteModalOpen" title="Hapus Pengajuan" size="sm" hide-footer @close="closeDeleteModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Pengajuan <span class="font-semibold">{{ selectedDeleteRow?.requestType }}</span> akan dihapus dari daftar.
        </p>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeDeleteModal">Batal</Button>
          <Button color="error" @click="confirmDelete">Hapus</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
