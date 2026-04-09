<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { AgGridSurface, Button, Card, DateTimePicker, Modal, MultiSelect, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { calcAgRowHeight, resolveAgFontPx } from "@/composables/useAgGridRowHeight";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type DayStatus = "planned" | "cancel" | "realization";
type StatusKey = "planned" | "cancel" | "realization";
type SourceRow = {
  id: number;
  no: number;
  item: string;
  periode: string;
  schedule: string;
  pic: string;
  category: string;
  statuses: Partial<Record<number, DayStatus>>;
};

type GridRow = {
  id: string;
  rowKind: "section" | "item" | "total" | "spacer";
  totalKind?: "planned" | "cancel" | "realization";
  category?: string;
  no?: number | string;
  item: string;
  periode: string;
  schedule: string;
  pic: string;
  [key: string]: string | number | undefined;
};

const picOptions = [
  { value: "all", label: "Semua PIC" },
  { value: "fiqih", label: "Fiqih Dewi Lestari" },
  { value: "etin", label: "Etin Sutinah" },
  { value: "bambang", label: "Bambang Irawan" },
  { value: "ayu", label: "Ayu Wulandari" },
  { value: "alice", label: "Alice Norin Fitded" },
];
const picFilterOptions = picOptions.filter((option) => option.value !== "all");
const statusOptions = [
  { value: "planned", label: "Planned" },
  { value: "cancel", label: "Cancel / Reschedule" },
  { value: "realization", label: "Realization" },
];

const filterDraft = ref({
  month: "4",
  year: "2026",
  pic: [] as string[],
  planned: true,
  cancel: true,
  realization: true,
});
const filters = ref({ ...filterDraft.value });
const monthYearDraft = computed({
  get: () => `${filterDraft.value.year}-${String(filterDraft.value.month).padStart(2, "0")}`,
  set: (value: string) => {
    if (!value) return;
    const match = /^(\d{4})-(\d{1,2})$/.exec(value);
    if (!match) return;
    const month = Number(match[2]);
    if (month < 1 || month > 12) return;
    filterDraft.value.year = match[1];
    filterDraft.value.month = String(month);
  },
});
const statusModalOpen = ref(false);
const statusForm = ref({
  rowId: "",
  dateField: "",
  status: "",
  coPic: "all",
  notes: "",
});
const statusContext = ref<{
  item: string;
  periode: string;
  schedule: string;
  pic: string;
  dateLabel: string;
  createdBy: string;
} | null>(null);

const isDark = ref(false);
const gridApi = ref<any>(null);
const gridWrap = ref<HTMLElement | null>(null);
const agFontPx = ref(13);
const density = ref<"compact" | "cozy" | "spacious">("compact");
const rowHeightVal = computed(() => calcAgRowHeight(agFontPx.value, density.value));
const themeClass = computed(() => (isDark.value ? "ag-theme-quartz-dark" : "ag-theme-quartz"));
const gridKey = computed(() => `${isDark.value ? "dark" : "light"}|${filters.value.month}|${filters.value.year}`);
let htmlObs: MutationObserver | null = null;
let prevHtmlOverflow = "";
let prevBodyOverflow = "";

const statusPalette = computed(() => {
  const css = getComputedStyle(document.documentElement);
  return {
    planned: {
      background: css.getPropertyValue("--color-warning").trim() || "#f97316",
      color: css.getPropertyValue("--color-warning-content").trim() || "#ffffff",
    },
    cancel: {
      background: css.getPropertyValue("--color-error").trim() || "#ef4444",
      color: css.getPropertyValue("--color-error-content").trim() || "#ffffff",
    },
    realization: {
      background: css.getPropertyValue("--color-info").trim() || "#0ea5e9",
      color: css.getPropertyValue("--color-info-content").trim() || "#ffffff",
    },
  };
});
const todayDate = new Date(2026, 3, 9);

const computeDark = () => {
  const html = document.documentElement;
  isDark.value = html.classList.contains("dark") || (html.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
};

onMounted(() => {
  prevHtmlOverflow = document.documentElement.style.overflow;
  prevBodyOverflow = document.body.style.overflow;
  document.documentElement.style.overflow = "hidden";
  document.body.style.overflow = "hidden";
  computeDark();
  htmlObs = new MutationObserver(computeDark);
  htmlObs.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] });
  agFontPx.value = resolveAgFontPx(gridWrap.value);
});

onBeforeUnmount(() => {
  document.documentElement.style.overflow = prevHtmlOverflow;
  document.body.style.overflow = prevBodyOverflow;
  htmlObs?.disconnect();
});

const visibleDates = computed(() => {
  const year = Number(filters.value.year);
  const monthIndex = Number(filters.value.month) - 1;
  const dates: Date[] = [];
  const leading = 3;
  const semesterEndMonthIndex = 5;
  const startDate = new Date(year, monthIndex, 1 - leading);
  const endDate = new Date(year, Math.max(monthIndex, semesterEndMonthIndex) + 1, 0);

  for (let cursor = new Date(startDate); cursor <= endDate; cursor.setDate(cursor.getDate() + 1)) {
    dates.push(new Date(cursor));
  }

  return dates;
});
const monthGroups = computed(() => {
  const groups: Array<{ key: string; label: string; dates: Date[] }> = [];
  visibleDates.value.forEach((date) => {
    const key = `${date.getFullYear()}-${date.getMonth()}`;
    const label = date.toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();
    const last = groups[groups.length - 1];
    if (!last || last.key !== key) {
      groups.push({ key, label, dates: [date] });
      return;
    }
    last.dates.push(date);
  });
  return groups;
});

const sourceRows = ref<SourceRow[]>([
  { id: 1, no: 1, item: "Cek Stok ATK (ajuan pengadaan)", periode: "Daily", schedule: "Afternoon", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 1: "realization", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 2, no: 2, item: "Cek Stok Pantry (ajuan pengadaan)", periode: "Weekly", schedule: "Wednesday", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 8: "planned", 15: "planned", 22: "planned", 29: "planned" } },
  { id: 3, no: 3, item: "Cek Kelengkapan Ruang2 Meeting", periode: "Daily", schedule: "Morning", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 4, no: 4, item: "Cek P3K", periode: "Weekly", schedule: "Friday", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 3: "planned", 10: "planned", 17: "planned", 24: "planned" } },
  { id: 5, no: 5, item: "Cek Kerapihan kerja OB", periode: "Daily", schedule: "Morning, Evening", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 6, no: 6, item: "Rekap reimburse (bukti)", periode: "Daily", schedule: "Afternoon", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 7, no: 7, item: "Rekap Pengajuan Operasional kantor", periode: "Daily", schedule: "Morning", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 8, no: 8, item: "Pengadaan Barang dan Jasa untuk Operasional", periode: "Weekly", schedule: "Thursday", pic: "Fiqih Dewi Lestari", category: "RUMAH TANGGA", statuses: { 2: "planned", 9: "planned", 16: "planned", 23: "planned", 30: "planned" } },
  { id: 9, no: 1, item: "Cek pencairan ke Finance", periode: "Daily", schedule: "Morning, Evening", pic: "Etin Sutinah", category: "ADMIN UMUM", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 10, no: 2, item: "Cek Email Mitreka (+ Hapus Email Spam)", periode: "Daily", schedule: "Morning, Afternoon, Evening", pic: "Etin Sutinah / Bambang Irawan", category: "ADMIN UMUM", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 11, no: 3, item: "Cek Email CITS (+ Hapus Email Spam)", periode: "Daily", schedule: "Morning, Afternoon, Evening", pic: "Fiqih Dewi Lestari", category: "ADMIN UMUM", statuses: { 1: "planned", 2: "planned", 3: "planned", 6: "planned", 7: "planned", 8: "planned", 9: "planned", 10: "planned", 13: "planned", 14: "planned", 15: "planned", 16: "planned", 17: "planned", 20: "planned", 21: "planned", 22: "planned", 23: "planned", 24: "planned", 27: "planned", 28: "planned", 29: "planned", 30: "planned" } },
  { id: 12, no: 4, item: "Update LPSE", periode: "Monthly", schedule: "Date 3", pic: "Bambang Irawan", category: "ADMIN UMUM", statuses: { 3: "planned" } },
  { id: 13, no: 5, item: "Update data karyawan", periode: "Monthly", schedule: "Date 3", pic: "Ayu Wulandari", category: "ADMIN UMUM", statuses: { 3: "planned" } },
  { id: 14, no: 1, item: "contoh 1", periode: "Weekly", schedule: "Friday", pic: "Alice Norin Fitded", category: "ADMIN TENDER", statuses: { 4: "realization", 11: "planned", 18: "planned", 25: "planned" } },
  { id: 15, no: 2, item: "contoh 2", periode: "Daily", schedule: "Morning", pic: "Agus Susanto", category: "ADMIN TENDER", statuses: { 1: "planned", 2: "planned", 3: "planned", 8: "planned", 9: "planned", 10: "planned", 15: "planned", 16: "planned", 17: "planned", 22: "planned", 23: "planned", 24: "planned", 29: "planned", 30: "planned" } },
  { id: 16, no: 3, item: "contoh 4", periode: "Daily", schedule: "Morning", pic: "Alice Norin Fitded", category: "ADMIN TENDER", statuses: { 3: "planned", 10: "planned", 17: "planned", 24: "planned" } },
  { id: 17, no: 4, item: "contoh 3", periode: "Daily", schedule: "Morning", pic: "Ade Hary Setiawan", category: "ADMIN TENDER", statuses: { 3: "planned", 10: "planned", 17: "planned", 24: "planned" } },
  { id: 18, no: 1, item: "tes12", periode: "Daily", schedule: "Morning", pic: "Achmad Asrofi", category: "PROSES TENDER", statuses: { 1: "planned", 8: "planned", 15: "planned", 22: "planned", 29: "planned" } },
  { id: 19, no: 2, item: "tes3", periode: "Daily", schedule: "Morning", pic: "Ade Arman Wijaya", category: "PROSES TENDER", statuses: { 2: "planned", 9: "planned", 16: "planned", 23: "planned", 30: "planned" } },
  { id: 20, no: 3, item: "tes4", periode: "Daily", schedule: "Morning", pic: "Agus Susanto", category: "PROSES TENDER", statuses: { 3: "planned", 10: "planned", 17: "planned", 24: "planned" } },
  { id: 21, no: 4, item: "tes2", periode: "Daily", schedule: "Morning", pic: "Ade Hary Setiawan", category: "PROSES TENDER", statuses: { 4: "planned", 11: "planned", 18: "planned", 25: "planned" } },
  { id: 22, no: 5, item: "Follow up undangan tender", periode: "Daily", schedule: "Afternoon", pic: "Achmad Asrofi", category: "PROSES TENDER", statuses: { 5: "planned", 12: "planned", 19: "planned", 26: "planned" } },
  { id: 23, no: 6, item: "Review administrasi penawaran", periode: "Daily", schedule: "Morning", pic: "Ade Arman Wijaya", category: "PROSES TENDER", statuses: { 1: "planned", 2: "planned", 3: "planned", 15: "planned", 16: "planned", 17: "planned", 29: "planned", 30: "planned" } },
  { id: 24, no: 7, item: "Koordinasi dokumen legal", periode: "Weekly", schedule: "Tuesday", pic: "Agus Susanto", category: "PROSES TENDER", statuses: { 7: "planned", 14: "planned", 21: "planned", 28: "planned" } },
  { id: 25, no: 8, item: "Validasi dokumen teknis", periode: "Daily", schedule: "Morning", pic: "Ade Hary Setiawan", category: "PROSES TENDER", statuses: { 6: "planned", 7: "planned", 8: "planned", 20: "planned", 21: "planned", 22: "planned" } },
  { id: 26, no: 9, item: "QC final proposal", periode: "Weekly", schedule: "Thursday", pic: "Alice Norin Fitded", category: "PROSES TENDER", statuses: { 9: "planned", 16: "planned", 23: "planned", 30: "planned" } },
  { id: 27, no: 10, item: "Submit penawaran", periode: "Monthly", schedule: "Date 25", pic: "Achmad Asrofi", category: "PROSES TENDER", statuses: { 25: "realization" } },
  { id: 28, no: 1, item: "Checklist boardroom", periode: "Daily", schedule: "Morning", pic: "Fiqih Dewi Lestari", category: "FASILITAS KANTOR", statuses: { 1: "planned", 2: "planned", 3: "planned", 4: "planned", 5: "planned", 8: "planned", 9: "planned", 10: "planned", 11: "planned", 12: "planned", 15: "planned", 16: "planned", 17: "planned", 18: "planned", 19: "planned", 22: "planned", 23: "planned", 24: "planned", 25: "planned", 26: "planned", 29: "planned", 30: "planned" } },
  { id: 29, no: 2, item: "Inspeksi AC dan lampu", periode: "Weekly", schedule: "Monday", pic: "Bambang Irawan", category: "FASILITAS KANTOR", statuses: { 6: "planned", 13: "planned", 20: "planned", 27: "planned" } },
  { id: 30, no: 3, item: "Cek stok pantry meeting", periode: "Daily", schedule: "Morning", pic: "Etin Sutinah", category: "FASILITAS KANTOR", statuses: { 1: "planned", 2: "planned", 3: "planned", 15: "planned", 16: "planned", 17: "planned", 29: "planned", 30: "planned" } },
  { id: 31, no: 4, item: "Koordinasi cleaning service", periode: "Daily", schedule: "Afternoon", pic: "Ayu Wulandari", category: "FASILITAS KANTOR", statuses: { 6: "planned", 7: "planned", 8: "planned", 20: "planned", 21: "planned", 22: "planned" } },
  { id: 32, no: 5, item: "Cek perangkat meeting", periode: "Weekly", schedule: "Friday", pic: "Fiqih Dewi Lestari", category: "FASILITAS KANTOR", statuses: { 3: "planned", 10: "planned", 17: "planned", 24: "planned" } },
  { id: 33, no: 1, item: "Monitoring invoice vendor", periode: "Daily", schedule: "Morning", pic: "Etin Sutinah", category: "KEUANGAN OPERASIONAL", statuses: { 1: "planned", 2: "planned", 3: "planned", 8: "planned", 9: "planned", 10: "planned", 15: "planned", 16: "planned", 17: "planned", 22: "planned", 23: "planned", 24: "planned", 29: "planned", 30: "planned" } },
  { id: 34, no: 2, item: "Rekonsiliasi petty cash", periode: "Weekly", schedule: "Wednesday", pic: "Bambang Irawan", category: "KEUANGAN OPERASIONAL", statuses: { 8: "planned", 15: "planned", 22: "planned", 29: "planned" } },
  { id: 35, no: 3, item: "Approval reimbursement", periode: "Daily", schedule: "Afternoon", pic: "Ayu Wulandari", category: "KEUANGAN OPERASIONAL", statuses: { 4: "planned", 5: "planned", 11: "planned", 12: "planned", 18: "planned", 19: "planned", 25: "planned", 26: "planned" } },
  { id: 36, no: 4, item: "Review aging payable", periode: "Monthly", schedule: "Date 20", pic: "Etin Sutinah / Bambang Irawan", category: "KEUANGAN OPERASIONAL", statuses: { 20: "planned" } },
]);

function applyFilters() {
  filters.value = { ...filterDraft.value };
}

const mockupDownloadUrl = computed(() => `${import.meta.env.BASE_URL}downloads/daily-routine-checklist-consumer.vue`);

const statusFilterItems: Array<{ key: StatusKey; label: string; icon: string; colorClass: string; boxClass: string; boxTextClass: string }> = [
  { key: "planned", label: "Planned", icon: "✓", colorClass: "text-warning", boxClass: "bg-warning", boxTextClass: "text-warning-content" },
  { key: "cancel", label: "Cancel / Reschedule", icon: "✕", colorClass: "text-error", boxClass: "bg-error", boxTextClass: "text-error-content" },
  { key: "realization", label: "Realization", icon: "✓", colorClass: "text-info", boxClass: "bg-info", boxTextClass: "text-info-content" },
];

const activeStatusSet = computed(() => {
  const set = new Set<DayStatus>();
  if (filters.value.planned) set.add("planned");
  if (filters.value.cancel) set.add("cancel");
  if (filters.value.realization) set.add("realization");
  return set;
});

const filteredSourceRows = computed(() => {
  const selectedPicLabels = (filters.value.pic || [])
    .map((value) => picFilterOptions.find((option) => option.value === value)?.label.toLowerCase())
    .filter((label): label is string => !!label);

  return sourceRows.value.filter((row) => {
    const matchesPic =
      selectedPicLabels.length === 0 ||
      selectedPicLabels.some((label) => row.pic.toLowerCase().includes(label));
    const matchesStatus =
      activeStatusSet.value.size === 0 ||
      Object.values(row.statuses).some((status) => status && activeStatusSet.value.has(status));
    return matchesPic && matchesStatus;
  });
});

function dayField(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `day_${year}_${month}_${day}`;
}

function displayStatus(status: DayStatus | undefined) {
  if (status === "planned") return "✓";
  if (status === "cancel") return "✕";
  if (status === "realization") return "✓";
  return "";
}

function parseDayField(field: string) {
  const match = /^day_(\d{4})_(\d{2})_(\d{2})$/.exec(field);
  if (!match) return null;
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]));
}

function setCellStatus(rowId: string, field: string, nextStatus?: DayStatus) {
  const rowMatch = /^item-(\d+)$/.exec(rowId);
  if (!rowMatch) return;

  const date = parseDayField(field);
  if (!date) return;

  const selectedYear = Number(filters.value.year);
  const selectedMonth = Number(filters.value.month) - 1;
  if (date.getFullYear() !== selectedYear || date.getMonth() !== selectedMonth) return;

  const sourceRow = sourceRows.value.find((row) => row.id === Number(rowMatch[1]));
  if (!sourceRow) return;

  const day = date.getDate();
  if (nextStatus) {
    sourceRows.value = sourceRows.value.map((row) =>
      row.id === sourceRow.id
        ? { ...row, statuses: { ...row.statuses, [day]: nextStatus } }
        : row
    );
    return;
  }

  sourceRows.value = sourceRows.value.map((row) => {
    if (row.id !== sourceRow.id) return row;
    const nextStatuses = { ...row.statuses };
    delete nextStatuses[day];
    return { ...row, statuses: nextStatuses };
  });
}

function openStatusModal(rowId: string, field: string) {
  const rowMatch = /^item-(\d+)$/.exec(rowId);
  if (!rowMatch) return;

  const date = parseDayField(field);
  if (!date) return;

  const selectedYear = Number(filters.value.year);
  const selectedMonth = Number(filters.value.month) - 1;
  if (date.getFullYear() !== selectedYear || date.getMonth() !== selectedMonth) return;

  const sourceRow = sourceRows.value.find((row) => row.id === Number(rowMatch[1]));
  if (!sourceRow) return;

  const day = date.getDate();
  statusForm.value = {
    rowId,
    dateField: field,
    status: sourceRow.statuses[day] ?? "planned",
    coPic: "all",
    notes: "",
  };
  statusContext.value = {
    item: sourceRow.item,
    periode: sourceRow.periode,
    schedule: sourceRow.schedule,
    pic: sourceRow.pic,
    dateLabel: date.toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
    createdBy: "Toni Widodo",
  };
  statusModalOpen.value = true;
}

function closeStatusModal() {
  statusModalOpen.value = false;
  statusContext.value = null;
}

function saveStatusModal() {
  const nextStatus = statusForm.value.status ? statusForm.value.status as DayStatus : undefined;
  setCellStatus(statusForm.value.rowId, statusForm.value.dateField, nextStatus);
  closeStatusModal();
}

function countStatus(day: number, status: DayStatus) {
  return filteredSourceRows.value.reduce((total, row) => total + (row.statuses[day] === status ? 1 : 0), 0);
}

const rowData = computed<GridRow[]>(() => {
  const grouped = new Map<string, SourceRow[]>();
  filteredSourceRows.value.forEach((row) => {
    if (!grouped.has(row.category)) grouped.set(row.category, []);
    grouped.get(row.category)?.push(row);
  });

  const out: GridRow[] = [];
  grouped.forEach((items, category) => {
    const categoryRow: GridRow = {
      id: `cat-${category}`,
      rowKind: "section",
      category,
      item: category,
      periode: "",
      schedule: "",
      pic: "",
    };
    visibleDates.value.forEach((date) => {
      categoryRow[dayField(date)] = "";
    });
    out.push(categoryRow);

    items.forEach((item) => {
      const gridRow: GridRow = {
        id: `item-${item.id}`,
        rowKind: "item",
        category: item.category,
        no: item.no,
        item: item.item,
        periode: item.periode,
        schedule: item.schedule,
        pic: item.pic,
      };
      visibleDates.value.forEach((date) => {
        const day = date.getDate();
        const isSelectedMonth =
          date.getFullYear() === Number(filters.value.year) &&
          date.getMonth() === Number(filters.value.month) - 1;
        const status = isSelectedMonth ? item.statuses[day] : undefined;
        gridRow[dayField(date)] = activeStatusSet.value.has(status as DayStatus) ? status ?? "" : "";
      });
      out.push(gridRow);
    });

    out.push({
      id: `spacer-${category}`,
      rowKind: "spacer",
      item: "",
      periode: "",
      schedule: "",
      pic: "",
    });
  });

  return out;
});

const pinnedBottomRowData = computed<GridRow[]>(() => {
  const plannedRow: GridRow = {
    id: "total-planned",
    rowKind: "total",
    totalKind: "planned",
    item: "Total Planned",
    periode: "",
    schedule: "",
    pic: "",
  };
  const cancelRow: GridRow = {
    id: "total-cancel",
    rowKind: "total",
    totalKind: "cancel",
    item: "Total Cancel / Reschedule",
    periode: "",
    schedule: "",
    pic: "",
  };
  const realizationRow: GridRow = {
    id: "total-realization",
    rowKind: "total",
    totalKind: "realization",
    item: "Total Realization",
    periode: "",
    schedule: "",
    pic: "",
  };

  visibleDates.value.forEach((date) => {
    const day = date.getDate();
    const isSelectedMonth =
      date.getFullYear() === Number(filters.value.year) &&
      date.getMonth() === Number(filters.value.month) - 1;
    plannedRow[dayField(date)] = isSelectedMonth && filters.value.planned ? countStatus(day, "planned") || "" : "";
    cancelRow[dayField(date)] = isSelectedMonth && filters.value.cancel ? countStatus(day, "cancel") || "" : "";
    realizationRow[dayField(date)] = isSelectedMonth && filters.value.realization ? countStatus(day, "realization") || "" : "";
  });

  return [plannedRow, cancelRow, realizationRow];
});

function isWeekend(date: Date) {
  const weekday = date.getDay();
  return weekday === 0 || weekday === 6;
}

function isToday(date: Date) {
  return (
    date.getFullYear() === todayDate.getFullYear() &&
    date.getMonth() === todayDate.getMonth() &&
    date.getDate() === todayDate.getDate()
  );
}

const monthSeparatorStyle = () => ({
  borderRight: "2px solid color-mix(in oklch, var(--color-base-content), transparent 60%)",
});

const todayColumnShadow =
  "inset 2px 0 0 color-mix(in oklch, var(--color-primary), transparent 10%), inset -2px 0 0 color-mix(in oklch, var(--color-primary), transparent 10%), inset 10px 0 10px -8px color-mix(in oklch, var(--color-primary), transparent 14%), inset -10px 0 10px -8px color-mix(in oklch, var(--color-primary), transparent 14%)";

const todayColumnTint = () =>
  `color-mix(in oklch, var(--color-primary), ${isDark.value ? "transparent 84%" : "white 78%"})`;
const holidayColumnTint = () =>
  `color-mix(in oklch, var(--color-error), ${isDark.value ? "transparent 90%" : "white 86%"})`;
const totalRowTint = (kind?: GridRow["totalKind"]) => {
  if (kind === "planned") return `color-mix(in oklch, var(--color-warning), ${isDark.value ? "transparent 84%" : "white 84%"})`;
  if (kind === "cancel") return `color-mix(in oklch, var(--color-error), ${isDark.value ? "transparent 84%" : "white 84%"})`;
  if (kind === "realization") return `color-mix(in oklch, var(--color-info), ${isDark.value ? "transparent 84%" : "white 84%"})`;
  return isDark.value ? "#0f172a" : "#ffffff";
};
const totalRowTextColor = (kind?: GridRow["totalKind"]) => {
  if (kind === "planned") return "color-mix(in oklch, var(--color-warning), var(--color-base-content) 35%)";
  if (kind === "cancel") return "color-mix(in oklch, var(--color-error), var(--color-base-content) 35%)";
  if (kind === "realization") return "color-mix(in oklch, var(--color-info), var(--color-base-content) 35%)";
  return "var(--color-base-content)";
};

const basePinnedStyle = (params: any) => {
  const row: GridRow = params.data;
  if (!row) return undefined;
  if (row.rowKind === "section") {
    return {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      backgroundColor: isDark.value ? "#0f172a" : "#ffffff",
    };
  }
  if (row.rowKind === "spacer") {
    return {
      backgroundColor: isDark.value ? "#0f172a" : "#ffffff",
      borderTopColor: "transparent",
      borderBottomColor: "transparent",
    };
  }
  if (row.rowKind === "total") {
    return {
      display: "flex",
      alignItems: "center",
      fontWeight: "600",
      backgroundColor: totalRowTint(row.totalKind),
      color: totalRowTextColor(row.totalKind),
      borderTop: `2px solid ${isDark.value ? "#475569" : "#94a3b8"}`,
    };
  }
  return { display: "flex", alignItems: "center" };
};

const dayCellStyle = (date: Date, isMonthEnd: boolean) => (params: any) => {
  const row: GridRow = params.data;
  const holiday = isWeekend(date);
  const style: Record<string, string> = {
    paddingLeft: "2px",
    paddingRight: "2px",
    textAlign: "center",
    justifyContent: "center",
  };

  if (date.getMonth() !== Number(filters.value.month) - 1) {
    style.opacity = "0.52";
  }

  if (holiday) {
    style.backgroundColor = holidayColumnTint();
  }

  if (isToday(date) && row?.rowKind !== "item") {
    style.boxShadow = todayColumnShadow;
    style.backgroundColor = todayColumnTint();
    style.fontWeight = "700";
  }

  if (row?.rowKind === "item") {
    style.cursor = date.getMonth() === Number(filters.value.month) - 1 ? "pointer" : "default";
    style.fontWeight = "700";
    style.paddingLeft = "0";
    style.paddingRight = "0";
  }

  if (row?.rowKind === "section") {
    style.backgroundColor = isDark.value ? "#0f172a" : "#ffffff";
  } else if (row?.rowKind === "spacer") {
    style.backgroundColor = isDark.value ? "#0f172a" : "#ffffff";
    style.borderTopColor = "transparent";
    style.borderBottomColor = "transparent";
  } else if (row?.rowKind === "total") {
    style.fontWeight = "600";
    style.backgroundColor = totalRowTint(row.totalKind);
    style.color = totalRowTextColor(row.totalKind);
    style.borderTop = `2px solid ${isDark.value ? "#475569" : "#94a3b8"}`;
  }

  if (isMonthEnd) {
    Object.assign(style, monthSeparatorStyle());
  }

  return style;
};

const dayHeaderStyle = (date: Date, isMonthEnd: boolean) => {
  const holiday = isWeekend(date);
  const style: Record<string, string> = {
    paddingLeft: "5px",
    paddingRight: "5px",
  };

  if (date.getMonth() !== Number(filters.value.month) - 1) {
    style.color = "#94a3b8";
  }

  if (holiday) {
    style.backgroundColor = holidayColumnTint();
    style.color = "color-mix(in oklch, var(--color-error), var(--color-base-content) 42%)";
  }

  if (isToday(date)) {
    style.boxShadow = todayColumnShadow;
    style.backgroundColor = todayColumnTint();
    style.fontWeight = "800";
    style.color = "color-mix(in oklch, var(--color-primary), var(--color-base-content) 45%)";
  }

  if (isMonthEnd) {
    Object.assign(style, monthSeparatorStyle());
  }

  return style;
};

const monthHeaderStyle = (isMonthEnd: boolean) => {
  if (!isMonthEnd) return undefined;
  return monthSeparatorStyle();
};

const leftPinnedCellClass = (params: any) => {
  const classes = ["drc-left-cell"];
  if (params.data?.rowKind === "total") {
    classes.push("drc-total-left-cell");
    if (params.data?.totalKind === "planned") classes.push("drc-total-left-planned");
    if (params.data?.totalKind === "cancel") classes.push("drc-total-left-cancel");
    if (params.data?.totalKind === "realization") classes.push("drc-total-left-realization");
  }
  return classes.join(" ");
};

const cellClassForDay = (date: Date) => {
  const classes = ["text-center"];
  if (isWeekend(date)) classes.push("font-medium");
  return classes.join(" ");
};

const statusCellClass = (params: any) => {
  const classes = [cellClassForDay(parseDayField(params.colDef?.field || "") ?? new Date())];
  if (params.data?.rowKind === "item") {
    classes.push("drc-status-cell");
    if (params.value === "planned") classes.push("drc-status-planned");
    if (params.value === "cancel") classes.push("drc-status-cancel");
    if (params.value === "realization") classes.push("drc-status-realization");
  }
  return classes.join(" ");
};

const statusCellRenderer = (params: any) => {
  if (params.data?.rowKind === "total") {
    const tint = totalRowTint(params.data?.totalKind);
    const text = totalRowTextColor(params.data?.totalKind);
    if (params.eGridCell) {
      params.eGridCell.style.setProperty("background", tint, "important");
      params.eGridCell.style.setProperty("color", text, "important");
      params.eGridCell.style.setProperty(
        "box-shadow",
        "inset -1px 0 0 var(--ag-col-border-color), inset 0 1px 0 0 color-mix(in oklch, var(--color-base-content), transparent 55%)",
        "important"
      );
    }
    return `${params.value ?? ""}`;
  }
  if (params.data?.rowKind !== "item") return `${params.value ?? ""}`;
  const date = parseDayField(params.colDef?.field || "");
  const isTodayCell = !!date && isToday(date);
  const isHolidayCell = !!date && isWeekend(date);
  if (params.eGridCell) {
    params.eGridCell.style.setProperty("padding-left", "0px", "important");
    params.eGridCell.style.setProperty("padding-right", "0px", "important");
    params.eGridCell.style.setProperty(
      "box-shadow",
      isTodayCell
        ? `inset -1px 0 0 var(--ag-col-border-color), ${todayColumnShadow}`
        : "inset -1px 0 0 var(--ag-col-border-color)",
      "important"
    );
    params.eGridCell.style.removeProperty("background-image");
    params.eGridCell.removeAttribute("data-today-cell");
  }

  if (!params.value) {
    if (params.eGridCell) {
      params.eGridCell.style.removeProperty("background");
      params.eGridCell.style.removeProperty("color");
      if (isHolidayCell && !isTodayCell) {
        params.eGridCell.style.setProperty("background", holidayColumnTint(), "important");
      }
    }
    return "";
  }

  const icon = params.value === "cancel" ? "✕" : "✓";
  const palette =
    params.value === "planned" ? statusPalette.value.planned :
    params.value === "cancel" ? statusPalette.value.cancel :
    statusPalette.value.realization;

  if (params.eGridCell) {
    params.eGridCell.style.setProperty("background", palette.background, "important");
    params.eGridCell.style.setProperty("color", palette.color, "important");
  }

  return `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-weight:800;line-height:1;">${icon}</div>`;
};

const pinnedLeftCellRenderer = (params: any) => {
  if (params.data?.rowKind === "total" && params.eGridCell) {
    const tint = totalRowTint(params.data?.totalKind);
    const text = totalRowTextColor(params.data?.totalKind);
    params.eGridCell.style.setProperty("background", tint, "important");
    params.eGridCell.style.setProperty("color", text, "important");
  }
  return `${params.valueFormatted ?? params.value ?? ""}`;
};

const columnDefs = computed(() => {
  const labelSpan = (params: any) => {
    const rowKind = params.data?.rowKind;
    if (rowKind === "section" || rowKind === "total") return 5;
    return 1;
  };
  const calendarSpan = (params: any) => {
    if (params.data?.rowKind === "section") return visibleDates.value.length;
    return 1;
  };
  const firstDayField = visibleDates.value[0] ? dayField(visibleDates.value[0]) : "";

  const pinned = [
    {
      field: "no",
      headerName: "No",
      width: 44,
      minWidth: 44,
      maxWidth: 44,
      pinned: "left",
      lockPinned: true,
      cellClass: (params: any) => `${leftPinnedCellClass(params)} text-center`,
      cellStyle: basePinnedStyle,
      cellRenderer: pinnedLeftCellRenderer,
      colSpan: labelSpan,
      valueFormatter: (p: any) => (p.data?.rowKind === "item" ? p.value ?? "" : p.data?.item ?? ""),
    },
    {
      field: "item",
      headerName: "Item Daily Routine",
      minWidth: 240,
      width: 240,
      pinned: "left",
      lockPinned: true,
      cellClass: leftPinnedCellClass,
      cellStyle: basePinnedStyle,
      cellRenderer: pinnedLeftCellRenderer,
      valueFormatter: (p: any) => (p.data?.rowKind === "item" ? p.value ?? "" : ""),
    },
    {
      field: "periode",
      headerName: "Periode",
      width: 96,
      minWidth: 96,
      pinned: "left",
      lockPinned: true,
      cellClass: leftPinnedCellClass,
      cellStyle: basePinnedStyle,
      cellRenderer: pinnedLeftCellRenderer,
      valueFormatter: (p: any) => (p.data?.rowKind === "item" ? p.value ?? "" : ""),
    },
    {
      field: "schedule",
      headerName: "Schedule",
      width: 210,
      pinned: "left",
      lockPinned: true,
      cellClass: leftPinnedCellClass,
      cellStyle: basePinnedStyle,
      cellRenderer: pinnedLeftCellRenderer,
      valueFormatter: (p: any) => (p.data?.rowKind === "item" ? p.value ?? "" : ""),
    },
    {
      field: "pic",
      headerName: "PIC / Co. PIC",
      width: 170,
      minWidth: 170,
      pinned: "left",
      lockPinned: true,
      cellClass: leftPinnedCellClass,
      cellStyle: basePinnedStyle,
      cellRenderer: pinnedLeftCellRenderer,
      valueFormatter: (p: any) => (p.data?.rowKind === "item" ? p.value ?? "" : ""),
    },
  ];

  return [
    ...pinned,
    ...monthGroups.value.map((group, groupIdx) => ({
      headerName: group.label,
      marryChildren: true,
      headerStyle: monthHeaderStyle(groupIdx < monthGroups.value.length - 1),
      children: group.dates.map((date, dateIdx) => ({
        field: dayField(date),
        headerName: String(date.getDate()),
        width: 27,
        minWidth: 27,
        maxWidth: 27,
        sortable: false,
        filter: false,
        suppressMovable: true,
        colSpan: dateIdx === 0 && groupIdx === 0 ? calendarSpan : undefined,
        cellRenderer: statusCellRenderer,
        valueFormatter: (params: any) => {
          if (params.data?.rowKind === "item") return "";
          return `${params.value ?? ""}`;
        },
        headerStyle: dayHeaderStyle(date, dateIdx === group.dates.length - 1 && groupIdx < monthGroups.value.length - 1),
        cellStyle: dayCellStyle(date, dateIdx === group.dates.length - 1 && groupIdx < monthGroups.value.length - 1),
        cellClass: statusCellClass,
        valueGetter: (params: any) => {
          if (params.data?.rowKind === "section") {
            return params.colDef.field === firstDayField ? "" : null;
          }
          return params.data?.[params.colDef.field];
        },
      })),
    })),
  ];
});

const defaultColDef = {
  resizable: true,
  sortable: false,
  filter: false,
  floatingFilter: false,
  suppressHeaderMenuButton: true,
  suppressHeaderFilterButton: true,
};

const gridOptions: any = {
  animateRows: false,
  suppressCellFocus: true,
  suppressMovableColumns: true,
  getRowClass: (params: any) => {
    if (params.data?.rowKind !== "total") return "";
    return `drc-total-row drc-total-${params.data.totalKind || "default"}`;
  },
  onCellClicked: (params: any) => {
    if (params.data?.rowKind !== "item" || typeof params.colDef?.field !== "string") return;
    if (!params.colDef.field.startsWith("day_")) return;
    openStatusModal(params.data.id, params.colDef.field);
  },
  getRowId: (params: any) => params.data.id,
  getRowHeight: (params: any) => {
    if (params.data?.rowKind === "section") return 28;
    if (params.data?.rowKind === "spacer") return 12;
    if (params.data?.rowKind === "total") return 28;
    return rowHeightVal.value;
  },
};

const gridStyle = computed<Record<string, string>>(() => ({
  "--ag-font-size": "13px",
  "--ag-font-family": "inherit",
  "--ag-background-color": isDark.value ? "#0f172a" : "#ffffff",
  "--ag-foreground-color": isDark.value ? "#e2e8f0" : "#243244",
  "--ag-border-color": isDark.value ? "#334155" : "#d6deeb",
  "--ag-col-border-color": isDark.value ? "#334155" : "#d6deeb",
  "--ag-col-border-width": "1px",
  "--ag-row-border-color": isDark.value ? "#334155" : "#d6deeb",
  "--ag-odd-row-background-color": isDark.value ? "#132033" : "#f8fafc",
}));

function onGridReady(params: any) {
  gridApi.value = params.api;
  params.api.setGridOption("rowHeight", rowHeightVal.value);
}

watch(rowHeightVal, (value) => {
  gridApi.value?.setGridOption("rowHeight", value);
});
</script>

<template>
  <div ref="gridWrap" class="space-y-5">
    <PageHeader
      category="Mockup Pages"
      title="Daily Routine Checklist"
      description="Mockup checklist bulanan berbasis AG Grid dengan pinned columns, matrix harian, dan filter panel yang mengikuti template consumer."
    />

    <Card padding="p-4 sm:p-5" class="border border-base-200/80 shadow-sm">
      <div class="flex items-center justify-between gap-3">
        <h3 class="text-sm font-semibold">Developer Details</h3>
        <a class="btn btn-accent btn-sm" :href="mockupDownloadUrl" download="DailyRoutineChecklist.consumer.vue">
          Download Mockup (Consumer)
        </a>
      </div>
      <p class="mt-2 text-sm text-base-content/70">
        File download memakai versi consumer package (`mitreka-consumer-test-ds/MockupTender/DailyRoutineChecklist.vue`).
      </p>
    </Card>

    <Card padding="p-4 sm:p-5" class="border border-base-200/80 shadow-sm">
      <div class="grid gap-4 xl:grid-cols-[280px_minmax(0,1fr)_160px] xl:items-end">
        <div class="space-y-1.5">
          <label class="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/55">Month + Year</label>
          <DateTimePicker
            v-model="monthYearDraft"
            picker="month-year-grid"
            dateFormat="Y-m"
            displayFormat="F Y"
            placeholder="Select month and year"
          />
        </div>
        <div class="space-y-3">
          <label class="text-xs font-semibold uppercase tracking-[0.16em] text-base-content/55">PIC</label>
          <MultiSelect
            v-model="filterDraft.pic"
            :options="picFilterOptions"
            size="sm"
            display-mode="inline-compact"
            placeholder="Choose PIC..."
          />
        </div>
        <div>
          <Button class="w-full" color="primary" @click="applyFilters">Apply Filters</Button>
        </div>
      </div>

      <div class="mt-4 flex flex-wrap gap-4 border-t border-base-200/70 pt-4">
        <div
          v-for="status in statusFilterItems"
          :key="status.key"
          class="inline-flex items-center gap-2 px-1 py-0.5 text-sm font-semibold select-none"
          :class="[status.colorClass, filterDraft[status.key] ? 'opacity-100' : 'opacity-45']"
        >
          <span
            class="inline-flex h-[18px] min-w-[18px] items-center justify-center text-[0.75rem] font-extrabold"
            :class="[status.boxClass, status.boxTextClass]"
          >
            {{ status.icon }}
          </span>
          {{ status.label }}
        </div>
      </div>
    </Card>

    <Card padding="p-0" class="overflow-hidden border border-base-200/80 shadow-sm">
      <div class="h-[75vh]">
        <AgGridSurface
          :key="gridKey"
          :class="['agx', 'agx-compact', themeClass, 'drc-grid', 'w-full', 'h-full']"
          theme="legacy"
          density="compact"
          :pinned-shadows="true"
          :auto-row-height="false"
          normal-layout-height="100%"
          :style="gridStyle"
          :rowData="rowData"
          :pinnedBottomRowData="pinnedBottomRowData"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
        />
      </div>
    </Card>

    <Modal :open="statusModalOpen" title="Daily Routine Checklist" size="lg" @close="closeStatusModal">
      <div class="space-y-5">
        <div class="grid gap-4 md:grid-cols-2 text-sm">
          <div class="space-y-2">
            <div class="flex gap-2"><span class="w-28 font-semibold text-base-content/75">Daily Routine</span><span>: {{ statusContext?.item }}</span></div>
            <div class="flex gap-2"><span class="w-28 font-semibold text-base-content/75">Period</span><span>: {{ statusContext?.periode }}</span></div>
            <div class="flex gap-2"><span class="w-28 font-semibold text-base-content/75">Schedule</span><span>: {{ statusContext?.schedule }}</span></div>
          </div>
          <div class="space-y-2">
            <div class="flex gap-2"><span class="w-28 font-semibold text-base-content/75">Schedule Date</span><span>: {{ statusContext?.dateLabel }}</span></div>
            <div class="flex gap-2"><span class="w-28 font-semibold text-base-content/75">Created By</span><span>: {{ statusContext?.createdBy }}</span></div>
            <div class="flex gap-2"><span class="w-28 font-semibold text-base-content/75">PIC</span><span>: {{ statusContext?.pic }}</span></div>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-base-content/75">Status</label>
            <SelectDropdown v-model="statusForm.status" size="sm" :options="statusOptions" />
          </div>
          <div class="space-y-1.5">
            <label class="text-sm font-medium text-base-content/75">Co PIC</label>
            <SelectDropdown v-model="statusForm.coPic" size="sm" :options="picOptions" />
          </div>
        </div>

        <div class="space-y-1.5">
          <label class="text-sm font-medium text-base-content/75">Notes</label>
          <textarea
            v-model="statusForm.notes"
            rows="7"
            class="input w-full resize-y py-2"
            style="height: auto; min-height: 10.5rem;"
            placeholder="Notes..."
          />
        </div>
      </div>
      <template #footer>
        <Button variant="ghost" color="default" @click="closeStatusModal">Cancel</Button>
        <Button color="primary" @click="saveStatusModal">Save</Button>
      </template>
    </Modal>
  </div>
</template>

<style>
.drc-grid .ag-floating-bottom .ag-pinned-left-cols-container .ag-row.drc-total-planned .ag-cell,
.drc-grid .ag-pinned-left-cols-container .ag-row.drc-total-planned .ag-cell,
.drc-grid .ag-pinned-left-cols-container .ag-cell.drc-total-left-planned {
  background: color-mix(in oklch, var(--color-warning), white 84%) !important;
  color: color-mix(in oklch, var(--color-warning), var(--color-base-content) 35%) !important;
}

.drc-grid .ag-floating-bottom .ag-pinned-left-cols-container .ag-row.drc-total-cancel .ag-cell,
.drc-grid .ag-pinned-left-cols-container .ag-row.drc-total-cancel .ag-cell,
.drc-grid .ag-pinned-left-cols-container .ag-cell.drc-total-left-cancel {
  background: color-mix(in oklch, var(--color-error), white 84%) !important;
  color: color-mix(in oklch, var(--color-error), var(--color-base-content) 35%) !important;
}

.drc-grid .ag-floating-bottom .ag-pinned-left-cols-container .ag-row.drc-total-realization .ag-cell,
.drc-grid .ag-pinned-left-cols-container .ag-row.drc-total-realization .ag-cell,
.drc-grid .ag-pinned-left-cols-container .ag-cell.drc-total-left-realization {
  background: color-mix(in oklch, var(--color-info), white 84%) !important;
  color: color-mix(in oklch, var(--color-info), var(--color-base-content) 35%) !important;
}
</style>
