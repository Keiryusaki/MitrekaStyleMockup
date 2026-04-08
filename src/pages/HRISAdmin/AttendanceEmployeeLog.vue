<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AgGridSurface, Avatar, Button, Card, DateTimePicker, Icon, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";
import { iconRegistry } from "@/composables/Icon";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type MonthlyAttendanceRow = {
  id: string;
  employeeId: number;
  dateIso: string;
  shiftLabel: "Office 1" | "Office 2" | "Libur";
  workStart: string;
  workEnd: string;
  clockIn: string | null;
  clockOut: string | null;
  attendanceCode: "H" | "A" | "I" | "-";
  timeOffCode: string | null;
  overtimeDuration: string | null;
  attendanceState: "present" | "absent" | "dayOff" | "timeOff";
  clockInState: "onTime" | "late" | "missing";
  clockOutState: "onTime" | "early" | "missing";
};

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

const route = useRoute();
const router = useRouter();
const isDark = ref(false);
const selectedMonthPart = ref("09");
const selectedYearPart = ref("2025");
const selectedTimeFilter = ref("all");
const gridApi = ref<any>(null);
const recordsVersion = ref(0);
const deletedRowIds = ref<Set<string>>(new Set());
const rowOverrides = ref<Record<string, Partial<MonthlyAttendanceRow>>>({});
const auditLogStore = ref<Record<string, AuditLogEntry[]>>({});
const editModalOpen = ref(false);
const auditModalOpen = ref(false);
const deleteModalOpen = ref(false);
const selectedRow = ref<MonthlyAttendanceRow | null>(null);
const editForm = ref({
  dateIso: "",
  shiftLabel: "Office 1" as MonthlyAttendanceRow["shiftLabel"],
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

const selectedEmployeeId = computed<number>({
  get: () => Number(route.params.employeeId || employeeDirectory[0]?.id || 1),
  set: (value) => {
    router.push(`/mockup-hris-admin/attendance/${value}`);
  },
});

const selectedEmployee = computed(
  () => employeeDirectory.find((item) => item.id === selectedEmployeeId.value) ?? employeeDirectory[0],
);

const selectedMonth = computed(() => `${selectedYearPart.value}-${selectedMonthPart.value}`);

const employeeOptions = employeeDirectory.map((item) => ({
  value: item.id,
  label: item.name,
}));

const shiftOptions = [
  { value: "Office 1", label: "Office 1 (08:00 - 17:00)" },
  { value: "Office 2", label: "Office 2 (09:00 - 18:00)" },
  { value: "Libur", label: "Libur" },
];

const monthPickerOptions = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Feb" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Apr" },
  { value: "05", label: "Mei" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Agu" },
  { value: "09", label: "Sep" },
  { value: "10", label: "Okt" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Des" },
];

const timeOffOptions = [
  { value: "", label: "Tanpa time off" },
  { value: "I", label: "Izin" },
  { value: "CT", label: "Cuti tahunan" },
  { value: "SK", label: "Sakit" },
];

const timeFilterOptions = [
  { value: "all", label: "Semua waktu" },
  { value: "late", label: "Terlambat" },
  { value: "early", label: "Pulang awal" },
  { value: "missing", label: "Belum absen lengkap" },
  { value: "not-present", label: "Tidak hadir" },
];

const parseTime = (time: string | null) => {
  if (!time) return null;
  const [hours, minutes] = time.split(":").map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return null;
  return hours * 60 + minutes;
};

const formatHumanDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00`);
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const formatMonthLabel = (yearMonth: string) => {
  const [year, month] = yearMonth.split("-").map(Number);
  const date = new Date(year, (month || 1) - 1, 1);
  return new Intl.DateTimeFormat("id-ID", {
    month: "long",
    year: "numeric",
  }).format(date);
};

const buildMonthlyRows = (employeeId: number, yearMonth: string): MonthlyAttendanceRow[] => {
  const [year, month] = yearMonth.split("-").map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  return Array.from({ length: daysInMonth }, (_, index) => {
    const day = index + 1;
    const date = new Date(year, month - 1, day);
    const dayOfWeek = date.getDay();
    const dateIso = `${yearMonth}-${String(day).padStart(2, "0")}`;

    if (dayOfWeek === 0 || dayOfWeek === 6) {
      return {
        id: `${employeeId}-${dateIso}`,
        employeeId,
        dateIso,
        shiftLabel: "Libur",
        workStart: "00:00",
        workEnd: "00:00",
        clockIn: null,
        clockOut: null,
        attendanceCode: "-",
        timeOffCode: null,
        overtimeDuration: null,
        attendanceState: "dayOff",
        clockInState: "missing",
        clockOutState: "missing",
      };
    }

    const seed = employeeId * 17 + day * 13;
    const isOffice1 = seed % 2 === 0;
    const shiftLabel = isOffice1 ? "Office 1" : "Office 2";
    const workStart = isOffice1 ? "08:00" : "09:00";
    const workEnd = isOffice1 ? "17:00" : "18:00";

    if (seed % 11 === 0) {
      return {
        id: `${employeeId}-${dateIso}`,
        employeeId,
        dateIso,
        shiftLabel,
        workStart,
        workEnd,
        clockIn: null,
        clockOut: null,
        attendanceCode: "I",
        timeOffCode: "I",
        overtimeDuration: null,
        attendanceState: "timeOff",
        clockInState: "missing",
        clockOutState: "missing",
      };
    }

    if (seed % 7 === 0) {
      return {
        id: `${employeeId}-${dateIso}`,
        employeeId,
        dateIso,
        shiftLabel,
        workStart,
        workEnd,
        clockIn: null,
        clockOut: null,
        attendanceCode: "A",
        timeOffCode: null,
        overtimeDuration: null,
        attendanceState: "absent",
        clockInState: "missing",
        clockOutState: "missing",
      };
    }

    const baseStart = isOffice1 ? 8 * 60 : 9 * 60;
    const baseEnd = isOffice1 ? 17 * 60 : 18 * 60;
    const lateMinutes = seed % 5 === 0 ? 12 : seed % 4 === 0 ? 6 : -3;
    const earlyMinutes = seed % 6 === 0 ? -44 : seed % 8 === 0 ? -18 : 24;
    const clockInMinutes = baseStart + lateMinutes;
    const clockOutMinutes = baseEnd + earlyMinutes;

    const toTime = (minutes: number) =>
      `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;

    return {
      id: `${employeeId}-${dateIso}`,
      employeeId,
      dateIso,
      shiftLabel,
      workStart,
      workEnd,
      clockIn: toTime(clockInMinutes),
      clockOut: toTime(clockOutMinutes),
      attendanceCode: "H",
      timeOffCode: null,
      overtimeDuration: clockOutMinutes > baseEnd ? `00:${String(clockOutMinutes - baseEnd).padStart(2, "0")}` : null,
      attendanceState: "present",
      clockInState: clockInMinutes > baseStart ? "late" : "onTime",
      clockOutState: clockOutMinutes < baseEnd ? "early" : "onTime",
    };
  });
};

const allMonthlyRows = computed(() => {
  recordsVersion.value;
  return buildMonthlyRows(selectedEmployeeId.value, selectedMonth.value)
    .map((item) => ({ ...item, ...(rowOverrides.value[item.id] ?? {}) }))
    .filter((item) => !deletedRowIds.value.has(item.id));
});

const filteredRows = computed(() => {
  if (selectedTimeFilter.value === "all") return allMonthlyRows.value;
  if (selectedTimeFilter.value === "late") return allMonthlyRows.value.filter((item) => item.clockInState === "late");
  if (selectedTimeFilter.value === "early") return allMonthlyRows.value.filter((item) => item.clockOutState === "early");
  if (selectedTimeFilter.value === "missing") {
    return allMonthlyRows.value.filter((item) => item.clockInState === "missing" || item.clockOutState === "missing");
  }
  if (selectedTimeFilter.value === "not-present") {
    return allMonthlyRows.value.filter((item) => item.attendanceState !== "present");
  }
  return allMonthlyRows.value;
});

const summaryCards = computed(() => {
  const rows = allMonthlyRows.value;
  return {
    present: [
      { label: "On time", value: rows.filter((item) => item.attendanceState === "present" && item.clockInState === "onTime").length },
      { label: "Late clock in", value: rows.filter((item) => item.attendanceState === "present" && item.clockInState === "late").length },
      { label: "Early clock out", value: rows.filter((item) => item.attendanceState === "present" && item.clockOutState === "early").length },
    ],
    notPresent: [
      { label: "No clock in", value: rows.filter((item) => item.attendanceState === "present" && item.clockInState === "missing").length },
      { label: "No clock out", value: rows.filter((item) => item.attendanceState === "present" && item.clockOutState === "missing").length },
      { label: "Invalid", value: 0 },
      { label: "Absent", value: rows.filter((item) => item.attendanceState === "absent").length },
    ],
    away: [
      { label: "Time off", value: rows.filter((item) => item.attendanceState === "timeOff").length },
      { label: "Day off", value: rows.filter((item) => item.attendanceState === "dayOff").length },
    ],
  };
});

const timeCellRenderer = (params: any) => {
  const row = params.data as MonthlyAttendanceRow | undefined;
  const colId = params.column?.getColId?.() || "";
  const value = params.value as string | null;
  if (!row || !value) return "-";

  let tone = "";
  if (colId === "clockIn") tone = row.clockInState === "late" ? "text-error font-semibold" : "text-success font-semibold";
  if (colId === "clockOut") tone = row.clockOutState === "early" ? "text-error font-semibold" : "text-success font-semibold";
  return `<span class="${tone}">${value}</span>`;
};

const shiftRenderer = (params: any) => {
  const row = params.data as MonthlyAttendanceRow | undefined;
  if (!row) return "-";
  const tone =
    row.shiftLabel === "Libur"
      ? "badge badge-soft badge-error"
      : "badge badge-soft badge-primary";
  return `<span class="${tone}">${row.shiftLabel}</span>`;
};

const iconSvg = (name: keyof typeof iconRegistry) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

const actionRenderer = () =>
  `<div class="flex h-full items-center justify-center gap-2">
    <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="edit" title="Ubah">
      ${iconSvg("pencil")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="audit" title="Audit log">
      ${iconSvg("clipboardClock")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" data-action="delete" title="Hapus">
      ${iconSvg("trash")}
    </button>
  </div>`;

const columnDefs = [
  {
    field: "dateIso",
    headerName: "Tanggal",
    minWidth: 180,
    pinned: "left",
    lockPinned: true,
    valueFormatter: (params: any) => formatHumanDate(params.value),
  },
  { field: "shiftLabel", headerName: "Shift", minWidth: 120, cellRenderer: shiftRenderer },
  { field: "workStart", headerName: "Jam masuk", minWidth: 120 },
  { field: "workEnd", headerName: "Jam pulang", minWidth: 120 },
  { field: "clockIn", headerName: "Clock in", minWidth: 120, cellRenderer: timeCellRenderer },
  { field: "clockOut", headerName: "Clock out", minWidth: 120, cellRenderer: timeCellRenderer },
  { field: "attendanceCode", headerName: "Kode kehadiran", minWidth: 140 },
  {
    field: "timeOffCode",
    headerName: "Kode time off",
    minWidth: 140,
    valueFormatter: (params: any) => params.value || "-",
  },
  {
    field: "overtimeDuration",
    headerName: "Lembur",
    minWidth: 120,
    valueFormatter: (params: any) => params.value || "-",
  },
  {
    headerName: "Aksi",
    colId: "actions",
    width: 132,
    pinned: "right",
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
  suppressHeaderMenuButton: true,
};

const gridOptions: any = {
  animateRows: true,
  suppressCellFocus: true,
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [10, 25, 50],
  getRowHeight: () => 56,
};

const onGridReady = (params: any) => {
  gridApi.value = params.api;
};

const formatAuditDateTime = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const openEditModal = (row: MonthlyAttendanceRow) => {
  selectedRow.value = row;
  editForm.value = {
    dateIso: row.dateIso,
    shiftLabel: row.shiftLabel,
    clockIn: row.clockIn ?? "",
    clockOut: row.clockOut ?? "",
    timeOffCode: row.timeOffCode ?? "",
    changeReason: "",
  };
  editModalOpen.value = true;
};

const openAuditModal = (row: MonthlyAttendanceRow) => {
  selectedRow.value = row;
  auditModalOpen.value = true;
};

const openDeleteModal = (row: MonthlyAttendanceRow) => {
  selectedRow.value = row;
  deleteModalOpen.value = true;
};

const closeEditModal = () => {
  editModalOpen.value = false;
};

const closeAuditModal = () => {
  auditModalOpen.value = false;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
};

const saveEditDisabled = computed(() => !editForm.value.changeReason.trim());

const recalcDerivedFields = (draft: MonthlyAttendanceRow) => {
  const workStartMinutes = parseTime(draft.workStart);
  const workEndMinutes = parseTime(draft.workEnd);
  const clockInMinutes = parseTime(draft.clockIn);
  const clockOutMinutes = parseTime(draft.clockOut);

  draft.clockInState = clockInMinutes === null ? "missing" : workStartMinutes !== null && clockInMinutes > workStartMinutes ? "late" : "onTime";
  draft.clockOutState = clockOutMinutes === null ? "missing" : workEndMinutes !== null && clockOutMinutes < workEndMinutes ? "early" : "onTime";

  if (draft.timeOffCode) {
    draft.attendanceState = "timeOff";
    draft.attendanceCode = "I";
  } else if (!draft.clockIn && !draft.clockOut) {
    draft.attendanceState = draft.shiftLabel === "Libur" ? "dayOff" : "absent";
    draft.attendanceCode = draft.shiftLabel === "Libur" ? "-" : "A";
  } else {
    draft.attendanceState = "present";
    draft.attendanceCode = "H";
  }

  if (draft.clockOut && workEndMinutes !== null && clockOutMinutes !== null && clockOutMinutes > workEndMinutes) {
    draft.overtimeDuration = `00:${String(clockOutMinutes - workEndMinutes).padStart(2, "0")}`;
  } else {
    draft.overtimeDuration = null;
  }
};

const saveEdit = () => {
  const row = selectedRow.value;
  if (!row || saveEditDisabled.value) return;

  const nextWorkStart = editForm.value.shiftLabel === "Office 1" ? "08:00" : editForm.value.shiftLabel === "Office 2" ? "09:00" : "00:00";
  const nextWorkEnd = editForm.value.shiftLabel === "Office 1" ? "17:00" : editForm.value.shiftLabel === "Office 2" ? "18:00" : "00:00";

  const nextRow: MonthlyAttendanceRow = {
    ...row,
    dateIso: editForm.value.dateIso,
    shiftLabel: editForm.value.shiftLabel,
    workStart: nextWorkStart,
    workEnd: nextWorkEnd,
    clockIn: editForm.value.clockIn || null,
    clockOut: editForm.value.clockOut || null,
    timeOffCode: editForm.value.timeOffCode || null,
  };

  recalcDerivedFields(nextRow);

  const changes = [
    { field: "Tanggal", before: row.dateIso, after: nextRow.dateIso },
    { field: "Shift", before: row.shiftLabel, after: nextRow.shiftLabel },
    { field: "Jam masuk", before: row.workStart, after: nextRow.workStart },
    { field: "Jam pulang", before: row.workEnd, after: nextRow.workEnd },
    { field: "Clock in", before: row.clockIn ?? "-", after: nextRow.clockIn ?? "-" },
    { field: "Clock out", before: row.clockOut ?? "-", after: nextRow.clockOut ?? "-" },
    { field: "Time off", before: row.timeOffCode ?? "-", after: nextRow.timeOffCode ?? "-" },
    { field: "Kode kehadiran", before: row.attendanceCode, after: nextRow.attendanceCode },
  ].filter((item) => item.before !== item.after);

  rowOverrides.value = {
    ...rowOverrides.value,
    [row.id]: {
      ...nextRow,
    },
  };

  auditLogStore.value = {
    ...auditLogStore.value,
    [row.id]: [
      {
        id: `${row.id}-${Date.now()}`,
        actor: "Admin HRIS",
        changedAt: new Date().toISOString(),
        reason: editForm.value.changeReason.trim(),
        changes: changes.length
          ? changes
          : [{ field: "Record", before: "Tidak ada perubahan nilai", after: "Disimpan ulang dengan catatan admin" }],
      },
      ...(auditLogStore.value[row.id] ?? []),
    ],
  };

  recordsVersion.value += 1;
  editModalOpen.value = false;
};

const confirmDelete = () => {
  const row = selectedRow.value;
  if (!row) return;

  const nextDeleted = new Set(deletedRowIds.value);
  nextDeleted.add(row.id);
  deletedRowIds.value = nextDeleted;

  auditLogStore.value = {
    ...auditLogStore.value,
    [row.id]: [
      {
        id: `${row.id}-delete-${Date.now()}`,
        actor: "Admin HRIS",
        changedAt: new Date().toISOString(),
        reason: "Record bulanan dihapus dari daftar attendance karyawan.",
        changes: [{ field: "Status record", before: "Aktif", after: "Dihapus dari daftar" }],
      },
      ...(auditLogStore.value[row.id] ?? []),
    ],
  };

  recordsVersion.value += 1;
  deleteModalOpen.value = false;
};

const auditLogsForSelectedRow = computed(() => (selectedRow.value ? auditLogStore.value[selectedRow.value.id] ?? [] : []));

const onCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]");
  if (!actionEl) return;

  event.event?.stopPropagation?.();
  const action = actionEl.getAttribute("data-action");
  const row = event.data as MonthlyAttendanceRow | undefined;
  if (!row || !action) return;
  if (action === "edit") openEditModal(row);
  if (action === "audit") openAuditModal(row);
  if (action === "delete") openDeleteModal(row);
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <PageHeader
        category="Attendance"
        title="Kehadiran Karyawan"
        :description="selectedEmployee ? `${selectedEmployee.name} · ${formatMonthLabel(selectedMonth)}` : 'Log bulanan attendance karyawan.'"
      />
      <div class="flex gap-2">
        <Button variant="outline" color="default" size="sm">Import</Button>
        <Button color="primary" size="sm">Export</Button>
      </div>
    </div>

    <Card padding="p-4" class="space-y-4">
      <div class="grid gap-3 xl:grid-cols-[auto_minmax(0,320px)_160px_220px_220px] xl:items-center">
        <Button
          variant="outline"
          color="default"
          size="sm"
          class="w-auto"
          @click="router.push('/mockup-hris-admin/attendance')"
        >
          <Icon name="chevron-left" class="h-4 w-4" />
          Kembali
        </Button>
        <div class="flex items-center gap-3 rounded-xl border border-base-300 bg-base-100 px-3 py-2">
          <Avatar
            v-if="selectedEmployee"
            :alt="selectedEmployee.name"
            :fallback="selectedEmployee.name"
            size="sm"
            color="primary"
          />
          <div class="min-w-0 flex-1">
            <SelectDropdown
              v-model="selectedEmployeeId"
              :options="employeeOptions"
              size="sm"
              variant="ghost"
              color="default"
            />
          </div>
        </div>
        <DateTimePicker
          v-model="selectedMonthPart"
          picker="month"
          date-format="m"
          display-format="M"
          class="w-full min-w-[160px]"
        />
        <DateTimePicker
          v-model="selectedYearPart"
          picker="year-grid"
          class="w-full min-w-[220px]"
        />
        <SelectDropdown
          v-model="selectedTimeFilter"
          :options="timeFilterOptions"
          size="sm"
          variant="outline"
          color="default"
        />
      </div>

      <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)_320px]">
        <Card padding="p-0" class="overflow-hidden border border-base-300">
          <div class="border-b border-base-300 bg-base-200/60 px-4 py-3 text-base font-semibold">Present</div>
          <div class="grid gap-4 px-4 py-4 sm:grid-cols-3">
            <div v-for="item in summaryCards.present" :key="item.label">
              <div class="text-3xl font-semibold text-primary">{{ item.value }}</div>
              <div class="mt-1 text-sm text-base-content/70">{{ item.label }}</div>
            </div>
          </div>
        </Card>

        <Card padding="p-0" class="overflow-hidden border border-base-300">
          <div class="border-b border-base-300 bg-base-200/60 px-4 py-3 text-base font-semibold">Not present</div>
          <div class="grid gap-4 px-4 py-4 sm:grid-cols-4">
            <div v-for="item in summaryCards.notPresent" :key="item.label">
              <div class="text-3xl font-semibold text-primary">{{ item.value }}</div>
              <div class="mt-1 text-sm text-base-content/70">{{ item.label }}</div>
            </div>
          </div>
        </Card>

        <Card padding="p-0" class="overflow-hidden border border-base-300">
          <div class="border-b border-base-300 bg-base-200/60 px-4 py-3 text-base font-semibold">Away</div>
          <div class="grid gap-4 px-4 py-4 sm:grid-cols-2">
            <div v-for="item in summaryCards.away" :key="item.label">
              <div class="text-3xl font-semibold text-primary">{{ item.value }}</div>
              <div class="mt-1 text-sm text-base-content/70">{{ item.label }}</div>
            </div>
          </div>
        </Card>
      </div>
    </Card>

    <Card padding="p-3" class="overflow-hidden">
      <div class="h-[clamp(360px,58dvh,70dvh)] min-h-[420px] w-full">
        <AgGridSurface
          :class="['agx', 'agx-compact', themeClass, 'h-full', 'min-h-0', 'w-full']"
          theme="legacy"
          density="compact"
          :auto-height-when-few-rows="false"
          :pinned-shadows="false"
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

    <Modal :open="editModalOpen" title="Ubah Kehadiran Bulanan" size="md" hide-footer @close="closeEditModal">
      <div class="space-y-4">
        <div class="grid gap-3 md:grid-cols-2">
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Tanggal</label>
            <input v-model="editForm.dateIso" type="date" class="input w-full" />
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

    <Modal :open="auditModalOpen" title="Audit Log Record" size="md" hide-footer @close="closeAuditModal">
      <div class="space-y-4">
        <div v-if="selectedRow" class="rounded-xl border border-base-200 bg-base-50 p-4 text-sm">
          <div class="grid gap-2 md:grid-cols-2">
            <div><span class="text-base-content/60">Karyawan</span><div class="font-medium">{{ selectedEmployee?.name }}</div></div>
            <div><span class="text-base-content/60">Tanggal</span><div class="font-medium">{{ selectedRow ? formatHumanDate(selectedRow.dateIso) : "-" }}</div></div>
          </div>
        </div>

        <div v-if="auditLogsForSelectedRow.length" class="space-y-3">
          <div
            v-for="entry in auditLogsForSelectedRow"
            :key="entry.id"
            class="rounded-xl border border-base-200 p-4"
          >
            <div>
              <div class="font-semibold">{{ entry.actor }}</div>
              <div class="text-xs text-base-content/60">{{ formatAuditDateTime(entry.changedAt) }}</div>
            </div>
            <div class="mt-3 rounded-lg bg-base-50 p-3 text-sm">
              <div class="font-medium">Alasan perubahan</div>
              <p class="mt-1 text-base-content/80">{{ entry.reason }}</p>
            </div>
            <div class="mt-3 space-y-2">
              <div
                v-for="change in entry.changes"
                :key="`${entry.id}-${change.field}`"
                class="grid gap-2 rounded-lg border border-base-200 p-3 text-sm md:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)]"
              >
                <div class="font-medium">{{ change.field }}</div>
                <div><span class="text-base-content/60">Sebelum:</span> {{ change.before }}</div>
                <div><span class="text-base-content/60">Sesudah:</span> {{ change.after }}</div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="rounded-xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/60">
          Belum ada audit log untuk record ini.
        </div>
      </div>
    </Modal>

    <Modal :open="deleteModalOpen" title="Konfirmasi Hapus" size="sm" hide-footer @close="closeDeleteModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Record attendance bulanan untuk
          <span class="font-semibold">{{ selectedEmployee?.name }}</span>
          pada
          <span class="font-semibold">{{ selectedRow ? formatHumanDate(selectedRow.dateIso) : "-" }}</span>
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
