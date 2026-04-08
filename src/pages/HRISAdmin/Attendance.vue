<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref, render, watch } from "vue";
import { AgGridSurface, Avatar, Button, Card, DateTimePicker, Icon, Input, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import type { AttendanceRecord, ClockState } from "@/data/hrisAdmin/employeeDirectory";
import { attendanceRecords } from "@/data/hrisAdmin/employeeDirectory";
import { iconRegistry } from "@/composables/Icon";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type ShiftType = "Office 1" | "Office 2";

type AttendanceRow = AttendanceRecord & {
  no: number;
  shiftLabel: ShiftType;
  workStart: string;
  workEnd: string;
  normalizedAttendanceCode: "A" | "H" | "I" | "-";
  derivedClockInState: ClockState;
  derivedClockOutState: ClockState;
};
type AttendanceFilterKey =
  | "all"
  | "on-time"
  | "late-clock-in"
  | "early-clock-out"
  | "no-clock-out"
  | "no-clock-in"
  | "invalid"
  | "absent"
  | "day-off"
  | "time-off";

type AuditLogEntry = {
  id: string;
  actor: string;
  changedAt: string;
  reason: string;
  changes: Array<{
    field: string;
    before: string;
    after: string;
  }>;
};

type AttendanceHistoryEntry = {
  id: string;
  type: "clockIn" | "clockOut";
  time: string;
  source: "Mobile App" | "Web Kiosk" | "Face Terminal" | "Admin Correction";
  note?: string;
};

const selectedDate = ref("2025-09-09");
const search = ref("");
const activeStatusFilter = ref<AttendanceFilterKey>("all");
const gridApi = ref<any>(null);
const isDark = ref(false);
const recordsVersion = ref(0);
const deletedRecordKeys = ref<Set<string>>(new Set());
const auditLogStore = ref<Record<string, AuditLogEntry[]>>({});
const editModalOpen = ref(false);
const historyModalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedRow = ref<AttendanceRow | null>(null);
const editForm = ref({
  attendanceDate: "",
  shiftLabel: "Office 1" as ShiftType,
  clockIn: "",
  clockOut: "",
  timeOffCode: "",
  changeReason: "",
});

let htmlObs: MutationObserver | null = null;

const computeDark = () => {
  const html = document.documentElement;
  isDark.value =
    html.classList.contains("dark") ||
    (html.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
};

onMounted(() => {
  computeDark();
  htmlObs = new MutationObserver(computeDark);
  htmlObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
});

onBeforeUnmount(() => {
  htmlObs?.disconnect();
});

const themeClass = computed(() => (isDark.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"));
const gridKey = computed(() => (isDark.value ? "dark" : "light"));

const parseTimeToMinutes = (time: string | null | undefined) => {
  if (!time || !/^\d{2}:\d{2}$/.test(time)) return null;
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes) || hours > 23 || minutes > 59) return null;
  return hours * 60 + minutes;
};

const OFFICE_1_IN = 8 * 60;
const OFFICE_1_OUT = 17 * 60;
const OFFICE_2_IN = 9 * 60;
const OFFICE_2_OUT = 18 * 60;

const resolveShift = (item: AttendanceRecord): ShiftType => {
  const clockInMinutes = parseTimeToMinutes(item.clockIn);
  if (clockInMinutes !== null) {
    return clockInMinutes <= OFFICE_1_IN ? "Office 1" : "Office 2";
  }

  return item.scheduleIn === "08:00" ? "Office 1" : "Office 2";
};

const resolveSchedule = (shiftLabel: ShiftType) =>
  shiftLabel === "Office 1"
    ? { workStart: "08:00", workEnd: "17:00" }
    : { workStart: "09:00", workEnd: "18:00" };

const recordKeyOf = (item: Pick<AttendanceRecord, "id" | "attendanceDate">) =>
  `${item.id}-${item.attendanceDate}`;

const normalizeAttendanceCode = (item: AttendanceRecord): AttendanceRow["normalizedAttendanceCode"] => {
  if (item.attendanceState === "absent") return "A";
  if (item.attendanceState === "timeOff") return "I";
  if (item.attendanceState === "present") return "H";
  return "-";
};

const deriveClockInState = (item: AttendanceRecord): ClockState => {
  const clockInMinutes = parseTimeToMinutes(item.clockIn);
  if (clockInMinutes === null) return item.clockIn ? "invalid" : "missing";
  return clockInMinutes > OFFICE_2_IN ? "late" : "onTime";
};

const deriveClockOutState = (item: AttendanceRecord, shiftLabel: ShiftType): ClockState => {
  const clockOutMinutes = parseTimeToMinutes(item.clockOut);
  if (clockOutMinutes === null) return item.clockOut ? "invalid" : "missing";
  const minimumClockOut = shiftLabel === "Office 1" ? OFFICE_1_OUT : OFFICE_2_OUT;
  return clockOutMinutes < minimumClockOut ? "early" : "onTime";
};

const toAttendanceRow = (item: AttendanceRecord, no: number): AttendanceRow => {
  const shiftLabel = resolveShift(item);
  const { workStart, workEnd } = resolveSchedule(shiftLabel);

  return {
    ...item,
    no,
    shiftLabel,
    workStart,
    workEnd,
    normalizedAttendanceCode: normalizeAttendanceCode(item),
    derivedClockInState: item.attendanceState === "present" ? deriveClockInState(item) : item.clockIn ? "invalid" : "missing",
    derivedClockOutState: item.attendanceState === "present" ? deriveClockOutState(item, shiftLabel) : item.clockOut ? "invalid" : "missing",
  };
};

const rowsByDate = computed(() => {
  recordsVersion.value;
  return attendanceRecords.filter(
    (item) => item.attendanceDate === selectedDate.value && !deletedRecordKeys.value.has(recordKeyOf(item)),
  );
});

const timeOffOptions = [
  { value: "", label: "Tanpa time off" },
  { value: "I", label: "Izin" },
  { value: "CT", label: "Cuti tahunan" },
  { value: "SK", label: "Sakit" },
];

const shiftOptions = [
  { value: "Office 1", label: "Office 1 (08:00 - 17:00)" },
  { value: "Office 2", label: "Office 2 (09:00 - 18:00)" },
];

const attendanceHistoryOverrides: Record<string, AttendanceHistoryEntry[]> = {
  "2-2025-09-09": [
    { id: "2-2025-09-09-in-1", type: "clockIn", time: "08:14", source: "Face Terminal" },
    { id: "2-2025-09-09-out-1", type: "clockOut", time: "12:02", source: "Face Terminal", note: "Keluar saat istirahat siang." },
    { id: "2-2025-09-09-in-2", type: "clockIn", time: "13:01", source: "Face Terminal", note: "Kembali dari istirahat." },
    { id: "2-2025-09-09-out-2", type: "clockOut", time: "17:18", source: "Face Terminal" },
  ],
  "4-2025-09-09": [
    { id: "4-2025-09-09-in-1", type: "clockIn", time: "08:29", source: "Mobile App", note: "Clock in saat tiba di lokasi client." },
    { id: "4-2025-09-09-out-1", type: "clockOut", time: "12:14", source: "Mobile App" },
    { id: "4-2025-09-09-in-2", type: "clockIn", time: "13:08", source: "Mobile App" },
    { id: "4-2025-09-09-out-2", type: "clockOut", time: "17:02", source: "Mobile App", note: "Clock out terakhir tercatat lebih awal." },
  ],
  "7-2025-09-09": [
    { id: "7-2025-09-09-in-1", type: "clockIn", time: "09:22", source: "Web Kiosk", note: "Percobaan clock in pertama hari ini." },
    { id: "7-2025-09-09-out-1", type: "clockOut", time: "12:06", source: "Web Kiosk" },
    { id: "7-2025-09-09-in-2", type: "clockIn", time: "13:10", source: "Web Kiosk" },
    { id: "7-2025-09-09-out-2", type: "clockOut", time: "18:09", source: "Web Kiosk" },
  ],
  "16-2025-09-09": [
    { id: "16-2025-09-09-in-1", type: "clockIn", time: "08:05", source: "Face Terminal" },
    { id: "16-2025-09-09-out-1", type: "clockOut", time: "12:10", source: "Face Terminal" },
    { id: "16-2025-09-09-in-2", type: "clockIn", time: "13:02", source: "Face Terminal" },
  ],
};

const matchesStatusFilter = (item: AttendanceRecord, filterKey: AttendanceFilterKey) => {
  const row = toAttendanceRow(item, 0);
  if (filterKey === "all") return true;
  if (filterKey === "on-time") return item.attendanceState === "present" && row.derivedClockInState === "onTime";
  if (filterKey === "late-clock-in") return item.attendanceState === "present" && row.derivedClockInState === "late";
  if (filterKey === "early-clock-out") return item.attendanceState === "present" && row.derivedClockOutState === "early";
  if (filterKey === "no-clock-out") return item.attendanceState === "present" && row.derivedClockOutState === "missing";
  if (filterKey === "no-clock-in") return item.attendanceState === "present" && row.derivedClockInState === "missing";
  if (filterKey === "invalid") return item.attendanceState === "present" && (row.derivedClockInState === "invalid" || row.derivedClockOutState === "invalid");
  if (filterKey === "absent") return item.attendanceState === "absent";
  if (filterKey === "day-off") return item.attendanceState === "dayOff";
  if (filterKey === "time-off") return item.attendanceState === "timeOff";
  return true;
};

const filteredRows = computed<AttendanceRow[]>(() =>
  rowsByDate.value
    .filter((item) => matchesStatusFilter(item, activeStatusFilter.value))
    .map((item, idx) => toAttendanceRow(item, idx + 1)),
);

const presentSummary = computed(() => {
  const rows = rowsByDate.value
    .filter((item) => item.attendanceState === "present")
    .map((item) => toAttendanceRow(item, 0));
  return [
    { key: "on-time" as const, label: "On Time", value: rows.filter((item) => item.derivedClockInState === "onTime").length, tone: "text-success" },
    { key: "late-clock-in" as const, label: "Terlambat", value: rows.filter((item) => item.derivedClockInState === "late").length, tone: "text-warning" },
    { key: "early-clock-out" as const, label: "Pulang awal", value: rows.filter((item) => item.derivedClockOutState === "early").length, tone: "text-warning" },
    { key: "no-clock-in" as const, label: "Belum clock in", value: rows.filter((item) => item.derivedClockInState === "missing").length, tone: "text-error" },
    { key: "no-clock-out" as const, label: "Belum clock out", value: rows.filter((item) => item.derivedClockOutState === "missing").length, tone: "text-error" },
    { key: "invalid" as const, label: "Invalid", value: rows.filter((item) => item.derivedClockInState === "invalid" || item.derivedClockOutState === "invalid").length, tone: "text-error" },
  ];
});

const awaySummary = computed(() => [
  { key: "absent" as const, label: "Absen", value: rowsByDate.value.filter((item) => item.attendanceState === "absent").length, tone: "text-error" },
  { key: "day-off" as const, label: "Libur", value: rowsByDate.value.filter((item) => item.attendanceState === "dayOff").length, tone: "text-info" },
  { key: "time-off" as const, label: "Time off", value: rowsByDate.value.filter((item) => item.attendanceState === "timeOff").length, tone: "text-warning" },
]);

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});

watch(selectedDate, () => {
  activeStatusFilter.value = "all";
});

const setStatusFilter = (filterKey: AttendanceFilterKey) => {
  activeStatusFilter.value = activeStatusFilter.value === filterKey ? "all" : filterKey;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatHumanDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const employeeRenderer = (params: any) => {
  const row = params.data as AttendanceRow | undefined;
  if (!row) return "";
  const root = document.createElement("div");

  render(
    h(
      "div",
      {
        class: "flex min-h-9 w-full items-center gap-2",
      },
      [
        h(Avatar, {
          alt: row.name,
          fallback: row.name,
          size: "sm",
          color: "primary",
        }),
        h(
          "div",
          {
            class: "flex min-w-0 flex-col justify-center",
          },
          [
            h(
              "a",
              {
                href: `/mockup-hris-admin/attendance/${row.id}`,
                class: "inline-block text-[13px] leading-tight font-bold text-primary no-underline hover:underline",
              },
              row.name,
            ),
            h(
              "div",
              {
                class: "mt-0 text-[10px] leading-tight text-base-content/70",
              },
              `${row.employeeCode} | ${row.title}`,
            ),
          ],
        ),
      ],
    ),
    root,
  );

  return root;
};

const timeCellRenderer = (params: any) => {
  const row = params.data as AttendanceRow | undefined;
  const colId = params.column?.getColId?.() || "";
  const value = params.value as string | null;
  if (!row || !value) return "-";

  let tone = "";
  if (colId === "clockIn") {
    tone =
      row.derivedClockInState === "onTime" ? "text-success font-semibold" : row.derivedClockInState === "late" ? "text-error font-semibold" : row.derivedClockInState === "invalid" ? "text-error font-semibold" : "";
  }
  if (colId === "clockOut") {
    tone =
      row.derivedClockOutState === "onTime" ? "text-success font-semibold" : row.derivedClockOutState === "early" ? "text-error font-semibold" : row.derivedClockOutState === "invalid" ? "text-error font-semibold" : "";
  }

  return `<span class="${tone}">${escapeHtml(value)}</span>`;
};

const iconSvg = (name: keyof typeof iconRegistry) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

const actionRenderer = () =>
  `<div class="flex h-full items-center justify-center gap-2">
    <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="edit" title="Ubah">
      ${iconSvg("pencil")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="history" title="History log">
      ${iconSvg("clock")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" data-action="delete" title="Hapus">
      ${iconSvg("trash")}
    </button>
  </div>`;

const columnDefs = [
  {
    field: "employeeCode",
    headerName: "Nama karyawan",
    minWidth: 260,
    pinned: "left",
    lockPinned: true,
    cellRenderer: employeeRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as AttendanceRow | undefined;
      if (!row) return "";
      return `${row.name} ${row.employeeCode} ${row.title}`;
    },
  },
  {
    field: "attendanceDate",
    headerName: "Tanggal",
    minWidth: 165,
    valueFormatter: (params: any) => formatHumanDate(String(params.value || "")),
  },
  { field: "shiftLabel", headerName: "Shift", minWidth: 130 },
  { field: "workStart", headerName: "Jam masuk", minWidth: 120 },
  { field: "workEnd", headerName: "Jam pulang", minWidth: 120 },
  { field: "clockIn", headerName: "Clock in", minWidth: 120, cellRenderer: timeCellRenderer },
  { field: "clockOut", headerName: "Clock out", minWidth: 120, cellRenderer: timeCellRenderer },
  {
    field: "normalizedAttendanceCode",
    headerName: "Kode kehadiran",
    minWidth: 140,
    valueFormatter: (params: any) => params.value || "-",
  },
  {
    field: "timeOffCode",
    headerName: "Kode cuti/izin",
    minWidth: 140,
    valueFormatter: (params: any) => params.value || "-",
  },
  {
    field: "overtimeDuration",
    headerName: "Total durasi lembur",
    minWidth: 190,
    valueFormatter: (params: any) => params.value || "-",
  },
  {
    headerName: "Aksi",
    colId: "actions",
    width: 132,
    pinned: "right",
    suppressHeaderMenuButton: true,
    sortable: false,
    filter: false,
    lockPinned: true,
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
  getRowHeight: () => 48,
};

const onGridReady = (params: any) => {
  gridApi.value = params.api;
  params.api.setGridOption("quickFilterText", search.value);
};

const buildDefaultHistory = (row: AttendanceRow): AttendanceHistoryEntry[] => {
  const entries: AttendanceHistoryEntry[] = [];
  if (row.clockIn) {
    entries.push({
      id: `${recordKeyOf(row)}-in-default`,
      type: "clockIn",
      time: row.clockIn,
      source: "Face Terminal",
    });
  }
  if (row.clockOut) {
    entries.push({
      id: `${recordKeyOf(row)}-out-default`,
      type: "clockOut",
      time: row.clockOut,
      source: "Face Terminal",
    });
  }
  return entries;
};

const getAttendanceHistory = (row: AttendanceRow | null) => {
  if (!row) return [];
  return attendanceHistoryOverrides[recordKeyOf(row)] ?? buildDefaultHistory(row);
};

const attendanceHistoryForSelectedRow = computed(() => getAttendanceHistory(selectedRow.value));
const historyClockInCount = computed(
  () => attendanceHistoryForSelectedRow.value.filter((entry) => entry.type === "clockIn").length,
);
const historyClockOutCount = computed(
  () => attendanceHistoryForSelectedRow.value.filter((entry) => entry.type === "clockOut").length,
);
const firstClockInFromHistory = computed(
  () => attendanceHistoryForSelectedRow.value.find((entry) => entry.type === "clockIn")?.time ?? "-",
);
const lastClockOutFromHistory = computed(() => {
  const clockOutEntries = attendanceHistoryForSelectedRow.value.filter((entry) => entry.type === "clockOut");
  return clockOutEntries.length ? clockOutEntries[clockOutEntries.length - 1].time : "-";
});

const openEditModal = (row: AttendanceRow) => {
  selectedRow.value = row;
  editForm.value = {
    attendanceDate: row.attendanceDate,
    shiftLabel: row.shiftLabel,
    clockIn: row.clockIn ?? "",
    clockOut: row.clockOut ?? "",
    timeOffCode: row.timeOffCode ?? "",
    changeReason: "",
  };
  editModalOpen.value = true;
};

const openHistoryModal = (row: AttendanceRow) => {
  selectedRow.value = row;
  historyModalOpen.value = true;
};

const openDeleteModal = (row: AttendanceRow) => {
  selectedRow.value = row;
  deleteModalOpen.value = true;
};

const closeEditModal = () => {
  editModalOpen.value = false;
};

const closeHistoryModal = () => {
  historyModalOpen.value = false;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
};

const saveEditDisabled = computed(() => !editForm.value.changeReason.trim());

const saveEdit = () => {
  const row = selectedRow.value;
  if (!row || saveEditDisabled.value) return;

  const sourceRecord = attendanceRecords.find((item) => recordKeyOf(item) === recordKeyOf(row));
  if (!sourceRecord) return;

  const nextShift = editForm.value.shiftLabel;
  const schedule = resolveSchedule(nextShift);
  const previousValues = {
    attendanceDate: row.attendanceDate,
    shiftLabel: row.shiftLabel,
    workStart: row.workStart,
    workEnd: row.workEnd,
    clockIn: row.clockIn ?? "-",
    clockOut: row.clockOut ?? "-",
    timeOffCode: row.timeOffCode ?? "-",
  };
  const nextValues = {
    attendanceDate: editForm.value.attendanceDate,
    shiftLabel: nextShift,
    workStart: schedule.workStart,
    workEnd: schedule.workEnd,
    clockIn: editForm.value.clockIn || "-",
    clockOut: editForm.value.clockOut || "-",
    timeOffCode: editForm.value.timeOffCode || "-",
  };

  const changes = [
    { field: "Tanggal", before: previousValues.attendanceDate, after: nextValues.attendanceDate },
    { field: "Shift", before: previousValues.shiftLabel, after: nextValues.shiftLabel },
    { field: "Jam masuk", before: previousValues.workStart, after: nextValues.workStart },
    { field: "Jam pulang", before: previousValues.workEnd, after: nextValues.workEnd },
    { field: "Clock in", before: previousValues.clockIn, after: nextValues.clockIn },
    { field: "Clock out", before: previousValues.clockOut, after: nextValues.clockOut },
    { field: "Time off", before: previousValues.timeOffCode, after: nextValues.timeOffCode },
  ].filter((item) => item.before !== item.after);

  sourceRecord.attendanceDate = editForm.value.attendanceDate;
  sourceRecord.shift = nextShift;
  sourceRecord.scheduleIn = schedule.workStart;
  sourceRecord.scheduleOut = schedule.workEnd;
  sourceRecord.clockIn = editForm.value.clockIn || null;
  sourceRecord.clockOut = editForm.value.clockOut || null;
  sourceRecord.timeOffCode = editForm.value.timeOffCode || null;

  if (editForm.value.timeOffCode) {
    sourceRecord.attendanceState = "timeOff";
    sourceRecord.attendanceCode = "I";
  } else if (editForm.value.clockIn || editForm.value.clockOut) {
    sourceRecord.attendanceState = "present";
    sourceRecord.attendanceCode = "H";
  } else {
    sourceRecord.attendanceState = "absent";
    sourceRecord.attendanceCode = "A";
  }

  const key = recordKeyOf(sourceRecord);
  auditLogStore.value[key] = [
    {
      id: `${key}-${Date.now()}`,
      actor: "Admin HRIS",
      changedAt: new Date().toISOString(),
      reason: editForm.value.changeReason.trim(),
      changes: changes.length
        ? changes
        : [{ field: "Record", before: "Tanpa perubahan nilai", after: "Disimpan ulang dengan catatan admin" }],
    },
    ...(auditLogStore.value[key] ?? []),
  ];

  recordsVersion.value += 1;
  editModalOpen.value = false;
};

const confirmDelete = () => {
  const row = selectedRow.value;
  if (!row) return;

  const nextDeleted = new Set(deletedRecordKeys.value);
  nextDeleted.add(recordKeyOf(row));
  deletedRecordKeys.value = nextDeleted;

  const key = recordKeyOf(row);
  auditLogStore.value[key] = [
    {
      id: `${key}-delete-${Date.now()}`,
      actor: "Admin HRIS",
      changedAt: new Date().toISOString(),
      reason: "Record dihapus dari tampilan attendance harian.",
      changes: [{ field: "Status record", before: "Aktif", after: "Dihapus dari daftar" }],
    },
    ...(auditLogStore.value[key] ?? []),
  ];

  recordsVersion.value += 1;
  deleteModalOpen.value = false;
};

const onCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]");
  if (actionEl) {
    event.event?.stopPropagation?.();
    const row = event.data as AttendanceRow | undefined;
    const action = actionEl.getAttribute("data-action");
    if (!row || !action) return;
    if (action === "edit") openEditModal(row);
    if (action === "history") openHistoryModal(row);
    if (action === "delete") openDeleteModal(row);
  }
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <PageHeader
        category="Mockup"
        title="Data Kehadiran"
        description="Mockup admin kehadiran dengan struktur data dan tabel AG Grid berbasis package mitreka-ui."
      />
      <Button color="primary" size="sm" class="w-full lg:w-auto">
        <Icon name="clipboardClock" class="h-4 w-4" />
        Laporan Kehadiran
      </Button>
    </div>

    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <DateTimePicker
            v-model="selectedDate"
            picker="date"
            size="sm"
            class="w-full md:w-[180px]"
          />
          <Button variant="outline" color="primary" size="sm" class="w-full md:w-auto">
            <Icon name="settings" class="h-4 w-4" />
            Semua Filter
          </Button>
        </div>
        <div class="w-full xl:w-[320px]">
          <Input
            v-model="search"
            size="sm"
            placeholder="Cari karyawan"
            class="w-full"
          />
        </div>
      </div>

      <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card padding="p-0" class="overflow-hidden border border-success/30 bg-success/5">
          <div class="border-b border-base-300 bg-success/10 px-5 py-4">
            <div class="flex items-center gap-2 text-base font-semibold">
              <span>Hadir</span>
              <Icon name="info" class="h-4 w-4 opacity-60" />
            </div>
          </div>
          <div class="grid gap-4 px-5 py-5 sm:grid-cols-2 xl:grid-cols-6">
            <div v-for="item in presentSummary" :key="item.label" class="space-y-1">
              <button
                type="button"
                :class="[
                  'w-full cursor-pointer rounded-xl border bg-base-100 px-3 py-3 text-left transition-all duration-150',
                  activeStatusFilter === item.key
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                    : 'border-base-200 bg-base-100 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-base-50 hover:shadow-md',
                ]"
                @click="setStatusFilter(item.key)"
              >
                <div :class="['text-[1.85rem] font-semibold leading-none', item.tone]">
                  {{ item.value }}
                </div>
                <div class="mt-2 text-xs font-medium tracking-[0.01em] text-base-content/70">
                  {{ item.label }}
                </div>
              </button>
            </div>
          </div>
        </Card>

        <Card padding="p-0" class="overflow-hidden border border-error/25 bg-error/5">
          <div class="border-b border-base-300 bg-error/10 px-5 py-4">
            <div class="flex items-center gap-2 text-base font-semibold">
              <span>Tidak Hadir</span>
              <Icon name="info" class="h-4 w-4 opacity-60" />
            </div>
          </div>
          <div class="grid gap-4 px-5 py-5 sm:grid-cols-3">
            <div v-for="item in awaySummary" :key="item.label" class="space-y-1">
              <button
                type="button"
                :class="[
                  'w-full cursor-pointer rounded-xl border bg-base-100 px-3 py-3 text-left transition-all duration-150',
                  activeStatusFilter === item.key
                    ? 'border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20'
                    : 'border-base-200 bg-base-100 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-base-50 hover:shadow-md',
                ]"
                @click="setStatusFilter(item.key)"
              >
                <div :class="['text-[1.85rem] font-semibold leading-none', item.tone]">
                  {{ item.value }}
                </div>
                <div class="mt-2 text-xs font-medium tracking-[0.01em] text-base-content/70">
                  {{ item.label }}
                </div>
              </button>
            </div>
          </div>
        </Card>
      </div>
    </Card>

    <Card padding="p-3" class="overflow-hidden">
      <div class="h-[clamp(360px,58dvh,70dvh)] min-h-[420px] w-full">
        <AgGridSurface
          :key="gridKey"
          :class="['agx', 'agx-compact', themeClass, 'h-full', 'min-h-0', 'w-full']"
          theme="legacy"
          density="compact"
          :auto-height-when-few-rows="false"
          :auto-row-height="false"
          normal-layout-height="100%"
          :style="{ '--ag-odd-row-background-color': isDark ? '#0d1a33' : '#F8FAFC' }"
          :rowData="filteredRows"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
          @cell-clicked="onCellClicked"
        />
      </div>
    </Card>

    <Modal :open="editModalOpen" title="Ubah Kehadiran" size="md" hide-footer @close="closeEditModal">
      <div class="space-y-4">
        <div class="grid gap-3 md:grid-cols-2">
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Tanggal</label>
            <DateTimePicker v-model="editForm.attendanceDate" picker="date" size="sm" class="w-full" />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Shift</label>
            <SelectDropdown v-model="editForm.shiftLabel" :options="shiftOptions" size="sm" variant="outline" color="default" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Clock in</label>
            <input v-model="editForm.clockIn" type="time" class="input w-full" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Clock out</label>
            <input v-model="editForm.clockOut" type="time" class="input w-full" />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Time off</label>
            <SelectDropdown v-model="editForm.timeOffCode" :options="timeOffOptions" size="sm" variant="outline" color="default" />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Alasan perubahan</label>
            <textarea
              v-model="editForm.changeReason"
              class="input min-h-28 w-full py-2"
              placeholder="Jelaskan kenapa data attendance ini diubah."
            />
            <p class="text-xs text-base-content/60">Wajib diisi agar jejak perubahan muncul di audit log.</p>
          </div>
        </div>

        <div class="flex justify-end gap-2 pt-2">
          <Button variant="ghost" color="default" @click="closeEditModal">Batal</Button>
          <Button color="primary" :disabled="saveEditDisabled" @click="saveEdit">Simpan</Button>
        </div>
      </div>
    </Modal>

    <Modal :open="historyModalOpen" title="History Log Kehadiran" size="md" hide-footer @close="closeHistoryModal">
      <div class="space-y-4">
        <div v-if="selectedRow" class="rounded-xl border border-base-200 bg-base-50 p-4 text-sm">
          <div class="grid gap-2 md:grid-cols-2">
            <div><span class="text-base-content/60">Karyawan</span><div class="font-medium">{{ selectedRow.name }}</div></div>
            <div><span class="text-base-content/60">Tanggal</span><div class="font-medium">{{ formatHumanDate(selectedRow.attendanceDate) }}</div></div>
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-4">
          <div class="rounded-xl border border-base-200 p-3 text-sm">
            <div class="text-base-content/60">Total clock in</div>
            <div class="mt-1 text-xl font-semibold text-primary">{{ historyClockInCount }}</div>
          </div>
          <div class="rounded-xl border border-base-200 p-3 text-sm">
            <div class="text-base-content/60">Total clock out</div>
            <div class="mt-1 text-xl font-semibold text-primary">{{ historyClockOutCount }}</div>
          </div>
          <div class="rounded-xl border border-base-200 p-3 text-sm">
            <div class="text-base-content/60">First clock in</div>
            <div class="mt-1 font-semibold">{{ firstClockInFromHistory }}</div>
          </div>
          <div class="rounded-xl border border-base-200 p-3 text-sm">
            <div class="text-base-content/60">Last clock out</div>
            <div class="mt-1 font-semibold">{{ lastClockOutFromHistory }}</div>
          </div>
        </div>

        <div class="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm text-base-content/80">
          Kolom `Clock in` di tabel mengambil catatan pertama, sedangkan kolom `Clock out` mengambil catatan terakhir pada hari tersebut.
        </div>

        <div v-if="attendanceHistoryForSelectedRow.length" class="space-y-3">
          <div
            v-for="entry in attendanceHistoryForSelectedRow"
            :key="entry.id"
            class="rounded-xl border border-base-200 p-4"
          >
            <div class="flex items-start justify-between gap-3">
              <div>
                <div class="font-semibold">{{ entry.type === "clockIn" ? "Clock in" : "Clock out" }}</div>
                <div class="text-xs text-base-content/60">{{ entry.source }}</div>
              </div>
              <div class="rounded-full bg-base-200 px-3 py-1 text-sm font-semibold">{{ entry.time }}</div>
            </div>
            <div v-if="entry.note" class="mt-3 rounded-lg bg-base-50 p-3 text-sm text-base-content/80">
              {{ entry.note }}
            </div>
          </div>
        </div>
        <div v-else class="rounded-xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/60">
          Belum ada history swipe untuk record ini.
        </div>
      </div>
    </Modal>

    <Modal :open="deleteModalOpen" title="Konfirmasi Hapus" size="sm" hide-footer @close="closeDeleteModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Record attendance untuk <span class="font-semibold">{{ selectedRow?.name }}</span> pada
          <span class="font-semibold">{{ selectedRow ? formatHumanDate(selectedRow.attendanceDate) : "-" }}</span>
          akan dihapus dari tampilan.
        </p>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeDeleteModal">Batal</Button>
          <Button color="error" @click="confirmDelete">Hapus</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
