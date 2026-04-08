<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref, render, watch } from "vue";
import { useRouter } from "vue-router";
import { AgGridSurface, Avatar, Button, Card, DateTimePicker, Icon, Input, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import type { EmployeeProfile, EmployeeStatus } from "@/data/hrisAdmin/employeeDirectory";
import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";
import { iconRegistry } from "@/composables/Icon";
import EmployeeOrgChart from "@/pages/HRISAdmin/components/EmployeeOrgChart.vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type WorkType = EmployeeProfile["workType"];
type AttendanceRisk = "Low" | "Medium" | "High";
type EmploymentType = "Permanent" | "Contract" | "Probation";

type EmployeeRow = EmployeeProfile & {
  no: number;
  branch: string;
  organization: string;
  jobLevel: string;
  grade: string;
  employeeClass: string;
  email: string;
  phone: string;
  joinDate: string;
  endDate: string | null;
  signDate: string | null;
  resignDate: string | null;
  barcode: string;
  manager: string;
  employmentType: EmploymentType;
  attendanceRisk: AttendanceRisk;
  leaveBalance: number;
  directReports: number;
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

type EmployeeFormState = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  additionalPhoneNumber: string;
  placeOfBirth: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  bloodType: string;
  religion: string;
  nik: string;
  passportNumber: string;
  passportExpiryDate: string;
  postalCode: string;
  citizenIdAddress: string;
  useAsResidentialAddress: boolean;
  residentialAddress: string;
  employeeCode: string;
  department: string;
  branch: string;
  location: string;
  title: string;
  jobLevel: string;
  employmentType: EmploymentType;
  workType: WorkType;
  joinDate: string;
  signDate: string;
  endDate: string;
  status: EmployeeStatus;
  bankName: string;
  bankAccountName: string;
  bankAccountNumber: string;
  npwpNumber: string;
  bpjsKesehatan: string;
  bpjsKetenagakerjaan: string;
  baseSalary: string;
  payrollSchedule: string;
  inviteEmail: string;
  inviteMessage: string;
};

const router = useRouter();
const isDark = ref(false);
const gridApi = ref<any>(null);
const search = ref("");
const activeDirectoryView = ref<"directory" | "org-chart">("directory");
const selectedDepartment = ref("all");
const selectedStatus = ref<"all" | EmployeeStatus>("all");
const selectedWorkType = ref<"all" | WorkType>("all");
const recordsVersion = ref(0);
const deletedEmployeeIds = ref<Set<number>>(new Set());
const createdEmployees = ref<EmployeeRow[]>([]);
const employeeOverrides = ref<Record<number, Partial<EmployeeRow>>>({});
const auditLogStore = ref<Record<number, AuditLogEntry[]>>({});
const detailModalOpen = ref(false);
const createModalOpen = ref(false);
const editModalOpen = ref(false);
const auditModalOpen = ref(false);
const resignModalOpen = ref(false);
const deleteModalOpen = ref(false);
const editConfirmModalOpen = ref(false);
const selectedRow = ref<EmployeeRow | null>(null);
const createStep = ref(1);
const editStep = ref(1);
const returnToDetailOnEditClose = ref(false);

const createEmptyEmployeeForm = (overrides: Partial<EmployeeFormState> = {}): EmployeeFormState => ({
  firstName: "",
  lastName: "",
  email: "",
  phoneNumber: "",
  additionalPhoneNumber: "",
  placeOfBirth: "",
  birthDate: "",
  gender: "Male",
  maritalStatus: "",
  bloodType: "",
  religion: "",
  nik: "",
  passportNumber: "",
  passportExpiryDate: "",
  postalCode: "",
  citizenIdAddress: "",
  useAsResidentialAddress: false,
  residentialAddress: "",
  employeeCode: "",
  department: "Human Resources",
  branch: "Pusat",
  location: "Jakarta HQ",
  title: "",
  jobLevel: "Staff",
  employmentType: "Permanent" as EmploymentType,
  workType: "Office" as WorkType,
  joinDate: "2026-04-06",
  signDate: "2026-03-16",
  endDate: "",
  status: "Active" as EmployeeStatus,
  bankName: "",
  bankAccountName: "",
  bankAccountNumber: "",
  npwpNumber: "",
  bpjsKesehatan: "",
  bpjsKetenagakerjaan: "",
  baseSalary: "",
  payrollSchedule: "Monthly",
  inviteEmail: "",
  inviteMessage: "",
  ...overrides,
});

const createForm = ref<EmployeeFormState>(createEmptyEmployeeForm({
  joinDate: "2026-04-06",
  signDate: "2026-03-16",
}));
const editForm = ref<EmployeeFormState & { changeReason: string }>({
  ...createEmptyEmployeeForm(),
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

const toEmail = (name: string) =>
  `${name.toLowerCase().replace(/[^a-z\s]/g, "").trim().replace(/\s+/g, ".")}@mitreka.id`;

const toPhone = (id: number) => `+62 812 ${String(6100 + id * 13).padStart(4, "0")} ${String(2200 + id * 19).padStart(4, "0")}`;

const formatHumanDate = (isoDate: string) => {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
};

const deriveEmploymentType = (status: EmployeeStatus, workType: WorkType, id: number): EmploymentType => {
  if (status === "Probation") return "Probation";
  if (workType === "Remote" && id % 3 === 0) return "Contract";
  return "Permanent";
};

const deriveAttendanceRisk = (status: EmployeeStatus, workType: WorkType, id: number): AttendanceRisk => {
  if (status === "Leave") return "High";
  if (status === "Probation" || workType === "Remote") return id % 2 === 0 ? "Medium" : "High";
  return id % 5 === 0 ? "Medium" : "Low";
};

const deriveJoinDate = (id: number) => {
  const year = 2019 + (id % 6);
  const month = ((id * 3) % 12) + 1;
  const day = ((id * 7) % 27) + 1;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
};

const addDays = (isoDate: string, days: number) => {
  const date = new Date(`${isoDate}T00:00:00`);
  if (Number.isNaN(date.getTime())) return isoDate;
  date.setDate(date.getDate() + days);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const managers = ["Toni Widodo", "Supriyatna", "Raka Mahendra", "Kezia Valencia", "Yoga Kurniawan"];
const organizationMap: Record<string, string> = {
  "Human Resources": "People Operations",
  "People & Culture": "People & Culture",
  "Executive Office": "Executive Office",
  "Talent Acquisition": "Talent Acquisition",
  "Learning & Development": "Learning & Development",
  "HR Technology": "HR Technology",
  "Compensation & Benefit": "Compensation & Benefit",
  "General Affairs": "General Affairs",
};
const branchMap: Record<string, string> = {
  "Jakarta HQ": "Pusat",
  "Bandung Office": "Bandung",
  "Surabaya Office": "Surabaya",
  "Yogyakarta Hub": "Yogyakarta",
  "Semarang Office": "Semarang",
  Remote: "Remote",
  "Bali Remote": "Remote",
};

const deriveManager = (department: string, id: number) => {
  if (department === "Executive Office") return "Board of Directors";
  return managers[id % managers.length];
};

const deriveDirectReports = (title: string, id: number) => {
  if (/chief|lead|supervisor/i.test(title)) return 4 + (id % 6);
  if (/specialist|analyst/i.test(title)) return id % 2;
  return 0;
};

const deriveJobLevel = (title: string) => {
  if (/chief/i.test(title)) return "C-Level";
  if (/head|lead/i.test(title)) return "Division Head";
  if (/supervisor/i.test(title)) return "Supervisor";
  return "Staff";
};

const deriveGrade = (employmentType: EmploymentType, id: number) => {
  if (employmentType === "Probation") return "-";
  return `G${2 + (id % 6)}`;
};

const deriveEmployeeClass = (workType: WorkType, id: number) => {
  if (workType === "Remote") return "RMT";
  if (workType === "Hybrid") return `H${1 + (id % 2)}`;
  return `O${1 + (id % 3)}`;
};

const splitEmployeeName = (name: string) => {
  const [firstName = "", ...rest] = name.trim().split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
  };
};

const baseRows = computed<EmployeeRow[]>(() =>
  [...employeeDirectory, ...createdEmployees.value]
    .filter((item) => !deletedEmployeeIds.value.has(item.id))
    .map((item, idx) => {
      const joinDate = deriveJoinDate(item.id);
      const employmentType = deriveEmploymentType(item.status, item.workType, item.id);
      const row: EmployeeRow = {
        ...item,
        no: idx + 1,
        branch: branchMap[item.location] ?? "Pusat",
        organization: organizationMap[item.department] ?? item.department,
        jobLevel: deriveJobLevel(item.title),
        grade: deriveGrade(employmentType, item.id),
        employeeClass: deriveEmployeeClass(item.workType, item.id),
        email: toEmail(item.name),
        phone: toPhone(item.id),
        joinDate,
        endDate: employmentType === "Permanent" ? null : addDays(joinDate, 720),
        signDate: addDays(joinDate, -21),
        resignDate: item.status === "Leave" ? addDays(joinDate, 880) : null,
        barcode: `MSI-${String(100 + item.id).padStart(3, "0")}`,
        manager: deriveManager(item.department, item.id),
        employmentType,
        attendanceRisk: deriveAttendanceRisk(item.status, item.workType, item.id),
        leaveBalance: 8 + (item.id % 9),
        directReports: deriveDirectReports(item.title, item.id),
      };
      return { ...row, ...(employeeOverrides.value[item.id] ?? {}) };
    }),
);

const departmentOptions = computed(() => [
  { value: "all", label: "Semua departemen" },
  ...Array.from(new Set(baseRows.value.map((item) => item.department)))
    .sort((a, b) => a.localeCompare(b))
    .map((department) => ({ value: department, label: department })),
]);

const statusOptions = [
  { value: "all", label: "Semua status" },
  { value: "Active", label: "Active" },
  { value: "Remote", label: "Remote" },
  { value: "Probation", label: "Probation" },
  { value: "Leave", label: "Leave" },
];

const workTypeOptions = [
  { value: "all", label: "Semua model kerja" },
  { value: "Office", label: "Office" },
  { value: "Hybrid", label: "Hybrid" },
  { value: "Remote", label: "Remote" },
];

const genderOptions = [
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
];

const maritalStatusOptions = [
  { value: "", label: "Select status" },
  { value: "Single", label: "Single" },
  { value: "Married", label: "Married" },
  { value: "Divorced", label: "Divorced" },
];

const bloodTypeOptions = [
  { value: "", label: "Select blood type" },
  { value: "A", label: "A" },
  { value: "B", label: "B" },
  { value: "AB", label: "AB" },
  { value: "O", label: "O" },
];

const religionOptions = [
  { value: "", label: "Select religion" },
  { value: "Islam", label: "Islam" },
  { value: "Christian", label: "Christian" },
  { value: "Catholic", label: "Catholic" },
  { value: "Hindu", label: "Hindu" },
  { value: "Buddhist", label: "Buddhist" },
  { value: "Confucian", label: "Confucian" },
];

const branchOptions = [
  { value: "Pusat", label: "Pusat" },
  { value: "Bandung", label: "Bandung" },
  { value: "Surabaya", label: "Surabaya" },
  { value: "Yogyakarta", label: "Yogyakarta" },
  { value: "Semarang", label: "Semarang" },
  { value: "Remote", label: "Remote" },
];

const employmentTypeOptions = [
  { value: "Permanent", label: "Permanent" },
  { value: "Contract", label: "Contract" },
  { value: "Probation", label: "Probation" },
];

const jobLevelOptions = [
  { value: "Staff", label: "Staff" },
  { value: "Supervisor", label: "Supervisor" },
  { value: "Division Head", label: "Division Head" },
  { value: "C-Level", label: "C-Level" },
];

const jobPositionOptions = [
  { value: "HR Officer", label: "HR Officer" },
  { value: "HR Generalist", label: "HR Generalist" },
  { value: "HR Operations Lead", label: "HR Operations Lead" },
  { value: "People Operations Specialist", label: "People Operations Specialist" },
  { value: "Recruitment Coordinator", label: "Recruitment Coordinator" },
  { value: "Talent Acquisition Partner", label: "Talent Acquisition Partner" },
  { value: "Payroll Specialist", label: "Payroll Specialist" },
  { value: "Payroll Officer", label: "Payroll Officer" },
  { value: "HRIS Analyst", label: "HRIS Analyst" },
  { value: "People Analytics Specialist", label: "People Analytics Specialist" },
  { value: "Chief People Officer", label: "Chief People Officer" },
];

const payrollScheduleOptions = [
  { value: "Monthly", label: "Monthly payroll" },
  { value: "Bi-weekly", label: "Bi-weekly payroll" },
];

const filteredRows = computed(() =>
  baseRows.value.filter((item) => {
    if (selectedDepartment.value !== "all" && item.department !== selectedDepartment.value) return false;
    if (selectedStatus.value !== "all" && item.status !== selectedStatus.value) return false;
    if (selectedWorkType.value !== "all" && item.workType !== selectedWorkType.value) return false;
    return true;
  }),
);

const totalEmployeeCount = computed(() => baseRows.value.length);
const activeEmployeeCount = computed(() => baseRows.value.filter((item) => item.status === "Active").length);
const departmentCount = computed(() => new Set(baseRows.value.map((item) => item.department)).size);
const remoteCoverageCount = computed(() => baseRows.value.filter((item) => item.workType !== "Office").length);
const currentMonthLabel = computed(() =>
  new Intl.DateTimeFormat("id-ID", { month: "long", year: "numeric" }).format(new Date("2026-04-01T00:00:00")),
);
const newHireCount = computed(() => baseRows.value.filter((item) => item.joinDate.startsWith("2026-04")).length);
const leavingCount = computed(() => baseRows.value.filter((item) => item.status === "Leave").length);

const statusSummary = computed(() => [
  { key: "all" as const, label: "Total karyawan", value: totalEmployeeCount.value, tone: "text-primary" },
  { key: "Active" as const, label: "Active", value: activeEmployeeCount.value, tone: "text-success" },
  { key: "Probation" as const, label: "Probation", value: baseRows.value.filter((item) => item.status === "Probation").length, tone: "text-warning" },
  { key: "Leave" as const, label: "Leave", value: baseRows.value.filter((item) => item.status === "Leave").length, tone: "text-error" },
]);

const workModelSummary = computed(() => [
  { key: "Office" as const, label: "Office", value: baseRows.value.filter((item) => item.workType === "Office").length, tone: "text-info" },
  { key: "Hybrid" as const, label: "Hybrid", value: baseRows.value.filter((item) => item.workType === "Hybrid").length, tone: "text-primary" },
  { key: "Remote" as const, label: "Remote", value: baseRows.value.filter((item) => item.workType === "Remote").length, tone: "text-secondary" },
]);

const quickHighlights = computed(() => {
  const rows = filteredRows.value;
  return [
    { label: "Departemen aktif", value: new Set(rows.map((item) => item.department)).size },
    { label: "Butuh perhatian", value: rows.filter((item) => item.attendanceRisk !== "Low").length },
    { label: "Team lead / manager", value: rows.filter((item) => item.directReports > 0).length },
    { label: "Coverage hybrid/remote", value: rows.filter((item) => item.workType !== "Office").length },
  ];
});

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});

const setStatusFilter = (status: "all" | EmployeeStatus) => {
  selectedStatus.value = selectedStatus.value === status ? "all" : status;
};

const setWorkTypeFilter = (workType: "all" | WorkType) => {
  selectedWorkType.value = selectedWorkType.value === workType ? "all" : workType;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const employeeRenderer = (params: any) => {
  const row = params.data as EmployeeRow | undefined;
  if (!row) return "";
  const root = document.createElement("div");

  render(
    h("div", { class: "flex min-h-9 w-full items-center gap-2" }, [
      h(Avatar, {
        alt: row.name,
        fallback: row.name,
        size: "sm",
        color: "primary",
      }),
      h("div", { class: "flex min-w-0 flex-col justify-center" }, [
        h("div", { class: "truncate text-[13px] font-bold leading-tight text-primary" }, row.name),
        h("div", { class: "mt-0 text-[10px] leading-tight text-base-content/70" }, `${row.employeeCode} | ${row.title}`),
      ]),
    ]),
    root,
  );

  return root;
};

const badgeRenderer = (params: any) => {
  const value = String(params.value || "-");
  const colId = params.column?.getColId?.() || "";
  const tone =
    colId === "status"
      ? value === "Active"
        ? "badge badge-soft badge-success"
        : value === "Probation"
          ? "badge badge-soft badge-warning"
          : value === "Leave"
            ? "badge badge-soft badge-error"
            : "badge badge-soft badge-info"
      : colId === "workType"
        ? value === "Office"
          ? "badge badge-soft badge-info"
          : value === "Hybrid"
            ? "badge badge-soft badge-primary"
            : "badge badge-soft badge-secondary"
        : value === "Low"
          ? "badge badge-soft badge-success"
          : value === "Medium"
            ? "badge badge-soft badge-warning"
            : "badge badge-soft badge-error";
  return `<span class="${tone}">${escapeHtml(value)}</span>`;
};

const attendanceLinkRenderer = (params: any) => {
  const row = params.data as EmployeeRow | undefined;
  if (!row) return "-";
  return `<a href="/mockup-hris-admin/attendance/${row.id}" class="font-semibold text-primary hover:underline">Buka log</a>`;
};

const checkboxRenderer = () =>
  `<div class="flex h-full items-center justify-center">
    <input type="checkbox" class="checkbox checkbox-sm pointer-events-none" />
  </div>`;

const plainValueRenderer = (params: any) => {
  const value = params.value as string | null | undefined;
  return value ? escapeHtml(String(value)) : "-";
};

const iconSvg = (name: keyof typeof iconRegistry) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="h-4 w-4"');

const actionRenderer = () =>
  `<div class="flex h-full items-center justify-center gap-2">
    <button type="button" class="icon-btn icon-btn-solid-primary icon-btn-xs" data-action="detail" title="Detail">
      ${iconSvg("user")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-secondary icon-btn-xs" data-action="resign" title="Resign">
      ${iconSvg("logout")}
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
    headerName: "",
    colId: "select",
    width: 54,
    pinned: "left",
    lockPinned: true,
    sortable: false,
    filter: false,
    suppressHeaderMenuButton: true,
    cellRenderer: checkboxRenderer,
  },
  {
    field: "name",
    headerName: "Karyawan",
    minWidth: 280,
    pinned: "left",
    lockPinned: true,
    cellRenderer: employeeRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as EmployeeRow | undefined;
      if (!row) return "";
      return `${row.name} ${row.employeeCode} ${row.title} ${row.department} ${row.location} ${row.email}`;
    },
  },
  { field: "employeeCode", headerName: "Employee ID", minWidth: 120 },
  { field: "branch", headerName: "Branch", minWidth: 110 },
  { field: "organization", headerName: "Organization", minWidth: 170 },
  { field: "title", headerName: "Job position", minWidth: 190 },
  { field: "jobLevel", headerName: "Job level", minWidth: 130 },
  { field: "employmentType", headerName: "Employment status", minWidth: 150 },
  { field: "grade", headerName: "Grade", minWidth: 90 },
  { field: "employeeClass", headerName: "Class", minWidth: 90 },
  { field: "joinDate", headerName: "Join date", minWidth: 140, valueFormatter: (params: any) => formatHumanDate(String(params.value || "")) },
  { field: "endDate", headerName: "End date", minWidth: 140, valueFormatter: (params: any) => params.value ? formatHumanDate(String(params.value)) : "-" },
  { field: "signDate", headerName: "Sign date", minWidth: 140, valueFormatter: (params: any) => params.value ? formatHumanDate(String(params.value)) : "-" },
  { field: "resignDate", headerName: "Resign date", minWidth: 150, valueFormatter: (params: any) => params.value ? formatHumanDate(String(params.value)) : "-" },
  { field: "barcode", headerName: "Barcode", minWidth: 120, cellRenderer: plainValueRenderer },
  { field: "email", headerName: "Email", minWidth: 220 },
  {
    headerName: "Aksi",
    colId: "actions",
    width: 214,
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
  suppressHeaderMenuButton: true,
};

const gridOptions: any = {
  animateRows: true,
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

const openDetailModal = (row: EmployeeRow) => {
  selectedRow.value = row;
  detailModalOpen.value = true;
};

const openEditModal = (row: EmployeeRow) => {
  const { firstName, lastName } = splitEmployeeName(row.name);
  selectedRow.value = row;
  editStep.value = 1;
  returnToDetailOnEditClose.value = true;
  detailModalOpen.value = false;
  editForm.value = {
    ...createEmptyEmployeeForm({
      firstName,
      lastName,
      email: row.email,
      phoneNumber: row.phone,
      placeOfBirth: "Jakarta",
      birthDate: "1995-01-01",
      maritalStatus: "Single",
      religion: "Islam",
      employeeCode: row.employeeCode,
      department: row.department,
      branch: row.branch,
      location: row.location,
      title: row.title,
      jobLevel: row.jobLevel,
      employmentType: row.employmentType,
      workType: row.workType,
      joinDate: row.joinDate,
      signDate: row.signDate ?? "",
      endDate: row.endDate ?? "",
      status: row.status,
      bankName: "BCA",
      bankAccountName: row.name,
      bankAccountNumber: `${1000000000 + row.id}`,
      baseSalary: "15000000",
      inviteEmail: row.email,
    }),
    changeReason: "",
  };
  editModalOpen.value = true;
};

const openCreateModal = () => {
  selectedRow.value = null;
  createStep.value = 1;
  createForm.value = createEmptyEmployeeForm({
    employeeCode: `MHR-${String(baseRows.value.length + 1).padStart(3, "0")}`,
    department: selectedDepartment.value !== "all" ? selectedDepartment.value : "Human Resources",
    branch: "Pusat",
    location: "Jakarta HQ",
    title: "",
    employmentType: "Permanent",
    workType: "Office",
    joinDate: "2026-04-06",
    signDate: "2026-03-16",
    status: "Active",
  });
  createModalOpen.value = true;
};

const openAuditModal = (row: EmployeeRow) => {
  selectedRow.value = row;
  auditModalOpen.value = true;
};

const openResignModal = (row: EmployeeRow) => {
  selectedRow.value = row;
  resignModalOpen.value = true;
};

const openDeleteModal = (row: EmployeeRow) => {
  selectedRow.value = row;
  deleteModalOpen.value = true;
};

const closeDetailModal = () => {
  detailModalOpen.value = false;
};

const closeCreateModal = () => {
  createModalOpen.value = false;
};

const closeEditModal = () => {
  editModalOpen.value = false;
  if (returnToDetailOnEditClose.value && selectedRow.value) {
    detailModalOpen.value = true;
  }
  returnToDetailOnEditClose.value = false;
};

const closeAuditModal = () => {
  auditModalOpen.value = false;
};

const closeResignModal = () => {
  resignModalOpen.value = false;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
};

const closeEditConfirmModal = () => {
  editConfirmModalOpen.value = false;
};

const saveEditDisabled = computed(() => !editForm.value.changeReason.trim());

const createSteps = [
  { number: 1, title: "Personal data", description: "Basic identity and contact" },
  { number: 2, title: "Employment data", description: "Job and contract setup" },
  { number: 3, title: "Payroll", description: "Salary and bank account" },
  { number: 4, title: "Invite employee", description: "Send account activation" },
];
const createPrimaryLabel = computed(() => (createStep.value === 4 ? "Send Invite" : "Next"));
const createBackDisabled = computed(() => createStep.value === 1);
const activeCreateStepMeta = computed(() => createSteps[createStep.value - 1]);
const editPrimaryLabel = computed(() => (editStep.value === 4 ? "Save Changes" : "Next"));
const editBackDisabled = computed(() => editStep.value === 1);
const activeEditStepMeta = computed(() => createSteps[editStep.value - 1]);
const createStepValid = computed(() => {
  if (createStep.value === 1) {
    return !!(
      createForm.value.firstName.trim() &&
      createForm.value.email.trim() &&
      createForm.value.birthDate &&
      createForm.value.maritalStatus &&
      createForm.value.religion
    );
  }
  if (createStep.value === 2) {
    return !!(
      createForm.value.employeeCode.trim() &&
      createForm.value.title.trim() &&
      createForm.value.department.trim() &&
      createForm.value.joinDate
    );
  }
  if (createStep.value === 3) {
    return !!(
      createForm.value.bankName.trim() &&
      createForm.value.bankAccountName.trim() &&
      createForm.value.bankAccountNumber.trim() &&
      createForm.value.baseSalary.trim()
    );
  }
  return !!(createForm.value.inviteEmail.trim() || createForm.value.email.trim());
});
const editStepValid = computed(() => {
  if (editStep.value === 1) {
    return !!(
      editForm.value.firstName.trim() &&
      editForm.value.email.trim() &&
      editForm.value.birthDate &&
      editForm.value.maritalStatus &&
      editForm.value.religion
    );
  }
  if (editStep.value === 2) {
    return !!(
      editForm.value.employeeCode.trim() &&
      editForm.value.title.trim() &&
      editForm.value.department.trim() &&
      editForm.value.joinDate
    );
  }
  if (editStep.value === 3) {
    return !!(
      editForm.value.bankName.trim() &&
      editForm.value.bankAccountName.trim() &&
      editForm.value.bankAccountNumber.trim() &&
      editForm.value.baseSalary.trim()
    );
  }
  return !!editForm.value.changeReason.trim();
});

const nextCreateStep = () => {
  if (!createStepValid.value) return;
  if (createStep.value < 4) createStep.value += 1;
  else submitCreateEmployee();
};

const prevCreateStep = () => {
  if (createStep.value > 1) createStep.value -= 1;
};

const nextEditStep = () => {
  if (!editStepValid.value) return;
  if (editStep.value < 4) editStep.value += 1;
  else editConfirmModalOpen.value = true;
};

const prevEditStep = () => {
  if (editStep.value > 1) editStep.value -= 1;
};

const submitCreateEmployee = () => {
  const nextId = Math.max(0, ...baseRows.value.map((item) => item.id)) + 1;
  const fullName = `${createForm.value.firstName} ${createForm.value.lastName}`.trim();
  const employmentType = createForm.value.employmentType;
  const created: EmployeeRow = {
    id: nextId,
    employeeCode: createForm.value.employeeCode,
    name: fullName || `Employee ${nextId}`,
    title: createForm.value.title.trim() || "Staff",
    department: createForm.value.department.trim() || "Human Resources",
    workType: createForm.value.workType,
    location: createForm.value.location.trim() || "Jakarta HQ",
    status: createForm.value.status,
    no: nextId,
    branch: createForm.value.branch,
    organization: organizationMap[createForm.value.department.trim() || "Human Resources"] ?? (createForm.value.department.trim() || "Human Resources"),
    jobLevel: createForm.value.jobLevel,
    grade: deriveGrade(employmentType, nextId),
    employeeClass: deriveEmployeeClass(createForm.value.workType, nextId),
    email: createForm.value.email.trim() || toEmail(fullName || `Employee ${nextId}`),
    phone: createForm.value.phoneNumber.trim() || toPhone(nextId),
    joinDate: createForm.value.joinDate,
    endDate: employmentType === "Permanent" ? null : (createForm.value.endDate || addDays(createForm.value.joinDate, 720)),
    signDate: createForm.value.signDate || addDays(createForm.value.joinDate, -21),
    resignDate: null,
    barcode: `MSI-${String(100 + nextId).padStart(3, "0")}`,
    manager: deriveManager(createForm.value.department.trim() || "Human Resources", nextId),
    employmentType,
    attendanceRisk: deriveAttendanceRisk(createForm.value.status, createForm.value.workType, nextId),
    leaveBalance: 12,
    directReports: deriveDirectReports(createForm.value.title.trim() || "Staff", nextId),
  };

  createdEmployees.value = [...createdEmployees.value, created];
  auditLogStore.value = {
    ...auditLogStore.value,
    [nextId]: [
      {
        id: `${nextId}-${Date.now()}`,
        actor: "Admin HRIS",
        changedAt: new Date().toISOString(),
        reason: `Karyawan baru dibuat dan invite dikirim ke ${createForm.value.inviteEmail.trim() || createForm.value.email.trim()}.`,
        changes: [
          { field: "Status record", before: "Belum ada", after: "Karyawan baru dibuat" },
          { field: "Nama", before: "-", after: created.name },
          { field: "Employment status", before: "-", after: created.employmentType },
        ],
      },
    ],
  };

  recordsVersion.value += 1;
  createModalOpen.value = false;
};

const saveEdit = () => {
  const row = selectedRow.value;
  if (!row || saveEditDisabled.value) return;

  const fullName = `${editForm.value.firstName} ${editForm.value.lastName}`.trim() || row.name;
  const nextEmploymentType = editForm.value.employmentType;
  const nextAttendanceRisk = deriveAttendanceRisk(editForm.value.status, editForm.value.workType, row.id);
  const changes = [
    { field: "Employee code", before: row.employeeCode, after: editForm.value.employeeCode },
    { field: "Nama", before: row.name, after: fullName },
    { field: "Email", before: row.email, after: editForm.value.email.trim() || row.email },
    { field: "Telepon", before: row.phone, after: editForm.value.phoneNumber.trim() || row.phone },
    { field: "Jabatan", before: row.title, after: editForm.value.title },
    { field: "Departemen", before: row.department, after: editForm.value.department },
    { field: "Branch", before: row.branch, after: editForm.value.branch },
    { field: "Job level", before: row.jobLevel, after: editForm.value.jobLevel },
    { field: "Model kerja", before: row.workType, after: editForm.value.workType },
    { field: "Lokasi", before: row.location, after: editForm.value.location },
    { field: "Join date", before: row.joinDate, after: editForm.value.joinDate },
    { field: "Sign date", before: row.signDate || "-", after: editForm.value.signDate || "-" },
    { field: "End date", before: row.endDate || "-", after: editForm.value.endDate || "-" },
    { field: "Status", before: row.status, after: editForm.value.status },
    { field: "Tipe kontrak", before: row.employmentType, after: nextEmploymentType },
    { field: "Attendance risk", before: row.attendanceRisk, after: nextAttendanceRisk },
  ].filter((item) => item.before !== item.after);

  employeeOverrides.value = {
    ...employeeOverrides.value,
    [row.id]: {
      employeeCode: editForm.value.employeeCode,
      name: fullName,
      title: editForm.value.title,
      department: editForm.value.department,
      workType: editForm.value.workType,
      location: editForm.value.location,
      status: editForm.value.status,
      branch: editForm.value.branch || (branchMap[editForm.value.location] ?? "Pusat"),
      organization: organizationMap[editForm.value.department] ?? editForm.value.department,
      jobLevel: editForm.value.jobLevel || deriveJobLevel(editForm.value.title),
      grade: deriveGrade(nextEmploymentType, row.id),
      employeeClass: deriveEmployeeClass(editForm.value.workType, row.id),
      joinDate: editForm.value.joinDate,
      signDate: editForm.value.signDate || null,
      endDate: nextEmploymentType === "Permanent" ? null : (editForm.value.endDate || addDays(editForm.value.joinDate, 720)),
      email: editForm.value.email.trim() || toEmail(fullName),
      phone: editForm.value.phoneNumber.trim() || row.phone,
      manager: deriveManager(editForm.value.department, row.id),
      employmentType: nextEmploymentType,
      attendanceRisk: nextAttendanceRisk,
      directReports: deriveDirectReports(editForm.value.title, row.id),
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
          : [{ field: "Record", before: "Tanpa perubahan nilai", after: "Disimpan ulang dengan catatan admin" }],
      },
      ...(auditLogStore.value[row.id] ?? []),
    ],
  };

  recordsVersion.value += 1;
  editModalOpen.value = false;
  editConfirmModalOpen.value = false;
  returnToDetailOnEditClose.value = false;
  selectedRow.value = {
    ...row,
    ...(employeeOverrides.value[row.id] ?? {}),
  };
};

const confirmResign = () => {
  const row = selectedRow.value;
  if (!row) return;

  employeeOverrides.value = {
    ...employeeOverrides.value,
    [row.id]: {
      status: "Leave",
      resignDate: "2026-04-06",
    },
  };

  auditLogStore.value = {
    ...auditLogStore.value,
    [row.id]: [
      {
        id: `${row.id}-resign-${Date.now()}`,
        actor: "Admin HRIS",
        changedAt: new Date().toISOString(),
        reason: "Karyawan ditandai resign dari employee directory.",
        changes: [
          { field: "Status", before: row.status, after: "Leave" },
          { field: "Resign date", before: row.resignDate || "-", after: "2026-04-06" },
        ],
      },
      ...(auditLogStore.value[row.id] ?? []),
    ],
  };

  recordsVersion.value += 1;
  resignModalOpen.value = false;
};

const confirmDelete = () => {
  const row = selectedRow.value;
  if (!row) return;

  const nextDeleted = new Set(deletedEmployeeIds.value);
  nextDeleted.add(row.id);
  deletedEmployeeIds.value = nextDeleted;

  auditLogStore.value = {
    ...auditLogStore.value,
    [row.id]: [
      {
        id: `${row.id}-delete-${Date.now()}`,
        actor: "Admin HRIS",
        changedAt: new Date().toISOString(),
        reason: "Record karyawan diarsipkan dari daftar aktif mockup.",
        changes: [{ field: "Status record", before: "Aktif di daftar", after: "Dihapus dari daftar" }],
      },
      ...(auditLogStore.value[row.id] ?? []),
    ],
  };

  recordsVersion.value += 1;
  deleteModalOpen.value = false;
};

const auditLogsForSelectedRow = computed(() => (selectedRow.value ? auditLogStore.value[selectedRow.value.id] ?? [] : []));

const formatAuditDateTime = (iso: string) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));

const onCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]");
  if (!actionEl) return;

  event.event?.stopPropagation?.();
  const action = actionEl.getAttribute("data-action");
  const row = event.data as EmployeeRow | undefined;
  if (!row || !action) return;
  if (action === "detail") openDetailModal(row);
  if (action === "resign") openResignModal(row);
  if (action === "audit") openAuditModal(row);
  if (action === "delete") openDeleteModal(row);
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <PageHeader
        category="Mockup"
        title="Employee List"
        description="Halaman daftar karyawan dulu sebagai entry point admin HRIS, baru lanjut ke detail, transfer, resign, atau edit data."
      />
      <div class="flex flex-col gap-2 sm:flex-row">
        <Button variant="outline" color="default" size="sm">
          <Icon name="hard-drive-download" class="h-4 w-4" />
          Bulk Update Data
        </Button>
        <Button color="primary" size="sm" @click="openCreateModal">
          <Icon name="plus" class="h-4 w-4" />
          Add Employee
        </Button>
      </div>
    </div>

    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
        <div class="flex flex-wrap items-center gap-3">
          <div class="tabs tabs-pills">
            <button
              type="button"
              class="tab gap-2"
              :class="{ 'tab-active': activeDirectoryView === 'directory' }"
              @click="activeDirectoryView = 'directory'"
            >
              <Icon name="layout" class="h-4 w-4" />
              Directory
            </button>
            <button
              type="button"
              class="tab gap-2"
              :class="{ 'tab-active': activeDirectoryView === 'org-chart' }"
              @click="activeDirectoryView = 'org-chart'"
            >
              <Icon name="users" class="h-4 w-4" />
              Org Chart
            </button>
          </div>
          <div class="min-w-[210px]">
            <SelectDropdown
              v-model="selectedDepartment"
              :options="departmentOptions"
              size="sm"
              variant="outline"
              color="default"
            />
          </div>
        </div>
        <div class="grid gap-3 md:grid-cols-[220px_220px_minmax(0,280px)]">
          <SelectDropdown
            v-model="selectedStatus"
            :options="statusOptions"
            size="sm"
            variant="outline"
            color="default"
          />
          <SelectDropdown
            v-model="selectedWorkType"
            :options="workTypeOptions"
            size="sm"
            variant="outline"
            color="default"
          />
          <Input
            v-model="search"
            size="sm"
            placeholder="Search..."
            class="w-full"
            prefix-icon="search"
            clearable
          />
        </div>
      </div>

      <div class="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
        <div class="border-b border-base-300 bg-base-50 px-5 py-3 text-sm font-semibold">
          Employee data in {{ currentMonthLabel }}
        </div>
        <div class="grid gap-4 px-5 py-5 md:grid-cols-[minmax(0,1.35fr)_1fr_1fr_1fr]">
          <div>
            <div class="text-xs uppercase tracking-[0.18em] text-base-content/45">View company</div>
            <div class="mt-2 text-xl font-semibold">PT Mitreka Solusi Indonesia</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-[0.18em] text-base-content/45">Total employees</div>
            <div class="mt-2 text-3xl font-semibold">{{ totalEmployeeCount }}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-[0.18em] text-base-content/45">New hires</div>
            <div class="mt-2 text-3xl font-semibold">{{ newHireCount }}</div>
          </div>
          <div>
            <div class="text-xs uppercase tracking-[0.18em] text-base-content/45">Leaving</div>
            <div class="mt-2 text-3xl font-semibold">{{ leavingCount }}</div>
          </div>
        </div>
      </div>
    </Card>

    <template v-if="activeDirectoryView === 'directory'">
    <Card padding="p-4" class="space-y-4">
      <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <div v-for="item in quickHighlights" :key="item.label" class="rounded-xl border border-base-300 bg-base-50 px-4 py-3">
          <div class="text-2xl font-semibold">{{ item.value }}</div>
          <div class="mt-1 text-xs text-base-content/65">{{ item.label }}</div>
        </div>
      </div>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="item in statusSummary"
          :key="item.label"
          type="button"
          :class="[
            'rounded-full border px-3 py-1.5 text-xs font-medium transition',
            selectedStatus === item.key
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-base-300 bg-base-100 text-base-content/70 hover:border-primary/30',
          ]"
          @click="setStatusFilter(item.key)"
        >
          {{ item.label }} · {{ item.value }}
        </button>
        <button
          v-for="item in workModelSummary"
          :key="item.label"
          type="button"
          :class="[
            'rounded-full border px-3 py-1.5 text-xs font-medium transition',
            selectedWorkType === item.key
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-base-300 bg-base-100 text-base-content/70 hover:border-primary/30',
          ]"
          @click="setWorkTypeFilter(item.key)"
        >
          {{ item.label }} · {{ item.value }}
        </button>
      </div>
    </Card>

    <Card padding="p-3" class="overflow-hidden">
      <div class="h-[clamp(380px,60dvh,72dvh)] min-h-[440px] w-full">
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
    </template>

    <EmployeeOrgChart
      v-else
      :all-rows="baseRows"
      :visible-rows="filteredRows"
      :department-count="departmentCount"
      @open-detail="openDetailModal"
    />

    <Modal :open="detailModalOpen" title="Detail Karyawan" size="lg" hide-footer @close="closeDetailModal">
      <div v-if="selectedRow" class="space-y-5">
        <div class="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-50 p-5 md:flex-row md:items-start md:justify-between">
          <div class="flex items-start gap-4">
            <Avatar :alt="selectedRow.name" :fallback="selectedRow.name" size="lg" color="primary" />
            <div>
              <div class="text-xl font-semibold">{{ selectedRow.name }}</div>
              <div class="mt-1 text-sm text-base-content/70">{{ selectedRow.employeeCode }} | {{ selectedRow.title }}</div>
              <div class="mt-3 flex flex-wrap gap-2">
                <span class="badge badge-soft badge-primary">{{ selectedRow.department }}</span>
                <span class="badge badge-soft badge-info">{{ selectedRow.workType }}</span>
                <span class="badge badge-soft badge-success">{{ selectedRow.status }}</span>
                <span class="badge badge-soft badge-warning">{{ selectedRow.employmentType }}</span>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <Button variant="outline" color="default" size="sm" @click="router.push(`/mockup-hris-admin/attendance/${selectedRow.id}`)">
              <Icon name="clipboardClock" class="h-4 w-4" />
              Attendance Log
            </Button>
            <Button color="warning" size="sm" @click="openEditModal(selectedRow)">
              <Icon name="pencil" class="h-4 w-4" />
              Edit
            </Button>
          </div>
        </div>

        <div class="grid gap-4 md:grid-cols-2">
          <div class="rounded-xl border border-base-300 p-4">
            <div class="text-sm font-semibold">Informasi dasar</div>
            <div class="mt-4 grid gap-3 text-sm">
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Email</span><span>{{ selectedRow.email }}</span></div>
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Telepon</span><span>{{ selectedRow.phone }}</span></div>
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Lokasi</span><span>{{ selectedRow.location }}</span></div>
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Join date</span><span>{{ formatHumanDate(selectedRow.joinDate) }}</span></div>
            </div>
          </div>
          <div class="rounded-xl border border-base-300 p-4">
            <div class="text-sm font-semibold">Konteks operasional</div>
            <div class="mt-4 grid gap-3 text-sm">
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Manager</span><span>{{ selectedRow.manager }}</span></div>
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Attendance risk</span><span>{{ selectedRow.attendanceRisk }}</span></div>
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Saldo cuti</span><span>{{ selectedRow.leaveBalance }} hari</span></div>
              <div class="grid grid-cols-[140px_minmax(0,1fr)] gap-3"><span class="text-base-content/60">Direct report</span><span>{{ selectedRow.directReports }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <Modal :open="createModalOpen" title="Add Employee" size="lg" @close="closeCreateModal">
      <div class="space-y-5">
        <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center justify-center gap-2 overflow-x-auto pb-1">
              <template v-for="(step, index) in createSteps" :key="step.number">
                <button
                  type="button"
                  :disabled="step.number > createStep + 1"
                  @click="step.number <= createStep + 1 ? (createStep = step.number) : null"
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all',
                    createStep === step.number
                      ? 'bg-primary text-primary-content ring-4 ring-primary/20'
                      : createStep > step.number
                        ? 'bg-success text-success-content cursor-pointer hover:ring-2 hover:ring-success/30'
                        : 'bg-base-300 text-base-content/50 cursor-not-allowed',
                  ]"
                >
                  <Icon v-if="createStep > step.number" name="check" class="h-4 w-4" />
                  <span v-else>{{ step.number }}</span>
                </button>
                <div
                  v-if="index < createSteps.length - 1"
                  :class="[
                    'h-1 w-10 rounded transition-all md:w-16',
                    createStep > step.number ? 'bg-success' : 'bg-base-300',
                  ]"
                />
              </template>
            </div>
            <div class="text-center">
              <div class="font-semibold">{{ activeCreateStepMeta.title }}</div>
              <div class="text-sm text-base-content/60">{{ activeCreateStepMeta.description }}</div>
            </div>
          </div>
        </div>

        <div v-if="createStep === 1" class="space-y-6">
          <div>
            <div class="text-2xl font-semibold">Personal data</div>
            <p class="mt-1 text-sm text-base-content/60">Fill all employee personal basic information data.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Name*</label>
              <Input v-model="createForm.firstName" size="sm" placeholder="First name" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium opacity-0 select-none">Last name</label>
              <Input v-model="createForm.lastName" size="sm" placeholder="Last name" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Email*</label>
              <Input v-model="createForm.email" type="email" size="sm" placeholder="name@company.com" class="w-full" />
              <p class="text-xs text-base-content/60">This email is use for log in</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Phone number</label>
              <Input v-model="createForm.phoneNumber" size="sm" mask="phone-id" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Additional phone number</label>
              <Input v-model="createForm.additionalPhoneNumber" size="sm" mask="phone-id" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Place of birth</label>
              <Input v-model="createForm.placeOfBirth" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Birthdate*</label>
              <DateTimePicker v-model="createForm.birthDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Gender</label>
              <div class="flex gap-4 pt-1">
                <label v-for="item in genderOptions" :key="item.value" class="inline-flex items-center gap-2 text-sm">
                  <input v-model="createForm.gender" type="radio" :value="item.value" class="radio radio-primary radio-sm" />
                  {{ item.label }}
                </label>
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Marital status*</label>
              <SelectDropdown v-model="createForm.maritalStatus" :options="maritalStatusOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Blood type</label>
              <SelectDropdown v-model="createForm.bloodType" :options="bloodTypeOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Religion*</label>
              <SelectDropdown v-model="createForm.religion" :options="religionOptions" size="sm" variant="outline" color="default" />
            </div>
          </div>

          <div class="border-t border-base-300 pt-5">
            <div class="text-2xl font-semibold">Address and identity</div>
            <p class="mt-1 text-sm text-base-content/60">Employee identity address information</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">NIK (NPWP 16 digit)</label>
              <Input v-model="createForm.nik" size="sm" mask="nik" :max-digits="16" placeholder="0000 0000 0000 0000" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Passport number</label>
              <Input v-model="createForm.passportNumber" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Passport expiry date</label>
              <DateTimePicker v-model="createForm.passportExpiryDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Postal code</label>
              <Input v-model="createForm.postalCode" size="sm" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Citizen ID address</label>
              <textarea v-model="createForm.citizenIdAddress" class="input min-h-28 w-full py-2" />
            </div>
            <label class="inline-flex items-center gap-2 text-sm md:col-span-2">
              <input v-model="createForm.useAsResidentialAddress" type="checkbox" class="checkbox checkbox-sm" />
              Use as residential address
            </label>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Residential address</label>
              <textarea v-model="createForm.residentialAddress" class="input min-h-28 w-full py-2" />
            </div>
          </div>
        </div>

        <div v-else-if="createStep === 2" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Employment data</div>
            <p class="mt-1 text-sm text-base-content/60">Define job information, work arrangement, and employment contract.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Employee code*</label>
              <Input v-model="createForm.employeeCode" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Job position*</label>
              <SelectDropdown v-model="createForm.title" :options="jobPositionOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Department*</label>
              <Input v-model="createForm.department" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Branch</label>
              <SelectDropdown v-model="createForm.branch" :options="branchOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Location</label>
              <Input v-model="createForm.location" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Job level</label>
              <SelectDropdown v-model="createForm.jobLevel" :options="jobLevelOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Employment status</label>
              <SelectDropdown v-model="createForm.employmentType" :options="employmentTypeOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Work model</label>
              <SelectDropdown v-model="createForm.workType" :options="workTypeOptions.slice(1)" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Join date*</label>
              <DateTimePicker v-model="createForm.joinDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Sign date</label>
              <DateTimePicker v-model="createForm.signDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">End date</label>
              <DateTimePicker v-model="createForm.endDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Current status</label>
              <SelectDropdown v-model="createForm.status" :options="statusOptions.slice(1)" size="sm" variant="outline" color="default" />
            </div>
          </div>
        </div>

        <div v-else-if="createStep === 3" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Payroll</div>
            <p class="mt-1 text-sm text-base-content/60">Set payroll account, tax identity, and salary baseline for the employee.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Bank name*</label>
              <Input v-model="createForm.bankName" size="sm" placeholder="BCA / Mandiri / BNI" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Bank account name*</label>
              <Input v-model="createForm.bankAccountName" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Bank account number*</label>
              <Input v-model="createForm.bankAccountNumber" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">NPWP number</label>
              <Input v-model="createForm.npwpNumber" size="sm" mask="npwp" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">BPJS Kesehatan</label>
              <Input v-model="createForm.bpjsKesehatan" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">BPJS Ketenagakerjaan</label>
              <Input v-model="createForm.bpjsKetenagakerjaan" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Base salary*</label>
              <Input v-model="createForm.baseSalary" size="sm" mask="currency-idr" placeholder="15.000.000" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Payroll schedule</label>
              <SelectDropdown v-model="createForm.payrollSchedule" :options="payrollScheduleOptions" size="sm" variant="outline" color="default" />
            </div>
          </div>
        </div>

        <div v-else class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Change summary</div>
            <p class="mt-1 text-sm text-base-content/60">Employee already has an HRIS account. Final step is documenting why this profile was updated.</p>
          </div>
          <div class="grid gap-4">
            <div class="rounded-2xl border border-base-300 bg-base-50 p-4 text-sm">
              <div class="font-medium">Employee summary</div>
              <div class="mt-3 grid gap-2 md:grid-cols-2">
                <div><span class="text-base-content/60">Name:</span> {{ `${createForm.firstName} ${createForm.lastName}`.trim() || "-" }}</div>
                <div><span class="text-base-content/60">Job position:</span> {{ createForm.title || "-" }}</div>
                <div><span class="text-base-content/60">Department:</span> {{ createForm.department || "-" }}</div>
                <div><span class="text-base-content/60">Join date:</span> {{ createForm.joinDate || "-" }}</div>
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Invite email*</label>
              <Input v-model="createForm.inviteEmail" type="email" size="sm" :placeholder="createForm.email || 'employee@company.com'" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Invitation message</label>
              <textarea
                v-model="createForm.inviteMessage"
                class="input min-h-32 w-full py-2"
                placeholder="Welcome to Mitreka. Your account has been prepared and you can activate it via the invite email."
              />
            </div>
          </div>
        </div>

      </div>
      <template #footer>
        <div class="flex w-full items-center justify-between">
          <Button variant="ghost" color="default" :disabled="createBackDisabled" @click="prevCreateStep">Back</Button>
          <div class="flex gap-2">
            <Button variant="ghost" color="default" @click="closeCreateModal">Cancel</Button>
            <Button color="primary" :disabled="!createStepValid" @click="nextCreateStep">{{ createPrimaryLabel }}</Button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal :open="editModalOpen" title="Edit Employee" size="lg" @close="closeEditModal">
      <div class="space-y-5">
        <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
          <div class="flex flex-col items-center gap-4">
            <div class="flex items-center justify-center gap-2 overflow-x-auto pb-1">
              <template v-for="(step, index) in createSteps" :key="`edit-${step.number}`">
                <button
                  type="button"
                  :disabled="step.number > editStep + 1"
                  @click="step.number <= editStep + 1 ? (editStep = step.number) : null"
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-full font-semibold transition-all',
                    editStep === step.number
                      ? 'bg-warning text-warning-content ring-4 ring-warning/20'
                      : editStep > step.number
                        ? 'bg-success text-success-content cursor-pointer hover:ring-2 hover:ring-success/30'
                        : 'bg-base-300 text-base-content/50 cursor-not-allowed',
                  ]"
                >
                  <Icon v-if="editStep > step.number" name="check" class="h-4 w-4" />
                  <span v-else>{{ step.number }}</span>
                </button>
                <div
                  v-if="index < createSteps.length - 1"
                  :class="[
                    'h-1 w-10 rounded transition-all md:w-16',
                    editStep > step.number ? 'bg-success' : 'bg-base-300',
                  ]"
                />
              </template>
            </div>
            <div class="text-center">
              <div class="font-semibold">{{ activeEditStepMeta.title }}</div>
              <div class="text-sm text-base-content/60">{{ activeEditStepMeta.description }}</div>
            </div>
          </div>
        </div>

        <div v-if="editStep === 1" class="space-y-6">
          <div>
            <div class="text-2xl font-semibold">Personal data</div>
            <p class="mt-1 text-sm text-base-content/60">Review and adjust employee personal basic information data.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Name*</label>
              <Input v-model="editForm.firstName" size="sm" placeholder="First name" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium opacity-0 select-none">Last name</label>
              <Input v-model="editForm.lastName" size="sm" placeholder="Last name" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Email*</label>
              <Input v-model="editForm.email" type="email" size="sm" placeholder="name@company.com" class="w-full" />
              <p class="text-xs text-base-content/60">This email is use for log in</p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Phone number</label>
              <Input v-model="editForm.phoneNumber" size="sm" mask="phone-id" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Additional phone number</label>
              <Input v-model="editForm.additionalPhoneNumber" size="sm" mask="phone-id" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Place of birth</label>
              <Input v-model="editForm.placeOfBirth" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Birthdate*</label>
              <DateTimePicker v-model="editForm.birthDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium">Gender</label>
              <div class="flex gap-4 pt-1">
                <label v-for="item in genderOptions" :key="`edit-gender-${item.value}`" class="inline-flex items-center gap-2 text-sm">
                  <input v-model="editForm.gender" type="radio" :value="item.value" class="radio radio-primary radio-sm" />
                  {{ item.label }}
                </label>
              </div>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Marital status*</label>
              <SelectDropdown v-model="editForm.maritalStatus" :options="maritalStatusOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Blood type</label>
              <SelectDropdown v-model="editForm.bloodType" :options="bloodTypeOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Religion*</label>
              <SelectDropdown v-model="editForm.religion" :options="religionOptions" size="sm" variant="outline" color="default" />
            </div>
          </div>

          <div class="border-t border-base-300 pt-5">
            <div class="text-2xl font-semibold">Address and identity</div>
            <p class="mt-1 text-sm text-base-content/60">Employee identity address information</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">NIK (NPWP 16 digit)</label>
              <Input v-model="editForm.nik" size="sm" mask="nik" :max-digits="16" placeholder="0000 0000 0000 0000" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Passport number</label>
              <Input v-model="editForm.passportNumber" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Passport expiry date</label>
              <DateTimePicker v-model="editForm.passportExpiryDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Postal code</label>
              <Input v-model="editForm.postalCode" size="sm" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Citizen ID address</label>
              <textarea v-model="editForm.citizenIdAddress" class="input min-h-28 w-full py-2" />
            </div>
            <label class="inline-flex items-center gap-2 text-sm md:col-span-2">
              <input v-model="editForm.useAsResidentialAddress" type="checkbox" class="checkbox checkbox-sm" />
              Use as residential address
            </label>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Residential address</label>
              <textarea v-model="editForm.residentialAddress" class="input min-h-28 w-full py-2" />
            </div>
          </div>
        </div>

        <div v-else-if="editStep === 2" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Employment data</div>
            <p class="mt-1 text-sm text-base-content/60">Define job information, work arrangement, and employment contract.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Employee code*</label>
              <Input v-model="editForm.employeeCode" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Job position*</label>
              <SelectDropdown v-model="editForm.title" :options="jobPositionOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Department*</label>
              <Input v-model="editForm.department" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Branch</label>
              <SelectDropdown v-model="editForm.branch" :options="branchOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Location</label>
              <Input v-model="editForm.location" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Job level</label>
              <SelectDropdown v-model="editForm.jobLevel" :options="jobLevelOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Employment status</label>
              <SelectDropdown v-model="editForm.employmentType" :options="employmentTypeOptions" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Work model</label>
              <SelectDropdown v-model="editForm.workType" :options="workTypeOptions.slice(1)" size="sm" variant="outline" color="default" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Join date*</label>
              <DateTimePicker v-model="editForm.joinDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Sign date</label>
              <DateTimePicker v-model="editForm.signDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">End date</label>
              <DateTimePicker v-model="editForm.endDate" picker="date" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Current status</label>
              <SelectDropdown v-model="editForm.status" :options="statusOptions.slice(1)" size="sm" variant="outline" color="default" />
            </div>
          </div>
        </div>

        <div v-else-if="editStep === 3" class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Payroll</div>
            <p class="mt-1 text-sm text-base-content/60">Set payroll account, tax identity, and salary baseline for the employee.</p>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Bank name*</label>
              <Input v-model="editForm.bankName" size="sm" placeholder="BCA / Mandiri / BNI" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Bank account name*</label>
              <Input v-model="editForm.bankAccountName" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Bank account number*</label>
              <Input v-model="editForm.bankAccountNumber" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">NPWP number</label>
              <Input v-model="editForm.npwpNumber" size="sm" mask="npwp" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">BPJS Kesehatan</label>
              <Input v-model="editForm.bpjsKesehatan" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">BPJS Ketenagakerjaan</label>
              <Input v-model="editForm.bpjsKetenagakerjaan" size="sm" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Base salary*</label>
              <Input v-model="editForm.baseSalary" size="sm" mask="currency-idr" placeholder="15.000.000" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Payroll schedule</label>
              <SelectDropdown v-model="editForm.payrollSchedule" :options="payrollScheduleOptions" size="sm" variant="outline" color="default" />
            </div>
          </div>
        </div>

        <div v-else class="space-y-5">
          <div>
            <div class="text-2xl font-semibold">Invite employee</div>
            <p class="mt-1 text-sm text-base-content/60">Invite the employee by email so they can activate their HRIS account.</p>
          </div>
          <div class="grid gap-4">
            <div class="rounded-2xl border border-base-300 bg-base-50 p-4 text-sm">
              <div class="font-medium">Employee summary</div>
              <div class="mt-3 grid gap-2 md:grid-cols-2">
                <div><span class="text-base-content/60">Name:</span> {{ `${editForm.firstName} ${editForm.lastName}`.trim() || "-" }}</div>
                <div><span class="text-base-content/60">Job position:</span> {{ editForm.title || "-" }}</div>
                <div><span class="text-base-content/60">Department:</span> {{ editForm.department || "-" }}</div>
                <div><span class="text-base-content/60">Join date:</span> {{ editForm.joinDate || "-" }}</div>
              </div>
            </div>
            <div class="rounded-2xl border border-warning/30 bg-warning/10 p-4 text-sm text-base-content/80">
              <div class="font-medium text-warning">No new invite needed</div>
              <p class="mt-1">
                Karyawan ini sudah terdaftar di sistem. Perubahan profil cukup disimpan dan dicatat alasannya untuk audit trail.
              </p>
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium">Change reason*</label>
              <textarea
                v-model="editForm.changeReason"
                class="input min-h-28 w-full py-2"
                placeholder="Contoh: reposisi tim payroll ke compensation, update model kerja, atau penyesuaian status."
              />
              <p class="text-xs text-base-content/60">Wajib diisi agar audit trail perubahan profil tetap jelas.</p>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="flex w-full items-center justify-between">
          <Button variant="ghost" color="default" :disabled="editBackDisabled" @click="prevEditStep">Back</Button>
          <div class="flex gap-2">
            <Button variant="ghost" color="default" @click="closeEditModal">Cancel</Button>
            <Button color="primary" :disabled="!editStepValid" @click="nextEditStep">{{ editPrimaryLabel }}</Button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal :open="auditModalOpen" title="Audit Log Karyawan" size="md" hide-footer @close="closeAuditModal">
      <div class="space-y-4">
        <div v-if="selectedRow" class="rounded-xl border border-base-200 bg-base-50 p-4 text-sm">
          <div class="grid gap-2 md:grid-cols-2">
            <div><span class="text-base-content/60">Karyawan</span><div class="font-medium">{{ selectedRow.name }}</div></div>
            <div><span class="text-base-content/60">Departemen</span><div class="font-medium">{{ selectedRow.department }}</div></div>
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
          Belum ada audit log untuk profil karyawan ini.
        </div>
      </div>
    </Modal>

    <Modal :open="resignModalOpen" title="Konfirmasi Resign" size="sm" hide-footer @close="closeResignModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Karyawan
          <span class="font-semibold">{{ selectedRow?.name }}</span>
          akan ditandai resign dari employee directory.
        </p>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeResignModal">Batal</Button>
          <Button color="warning" @click="confirmResign">Resign</Button>
        </div>
      </div>
    </Modal>

    <Modal :open="editConfirmModalOpen" title="Konfirmasi Perubahan" size="sm" hide-footer @close="closeEditConfirmModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Perubahan profil untuk
          <span class="font-semibold">{{ `${editForm.firstName} ${editForm.lastName}`.trim() || selectedRow?.name }}</span>
          akan disimpan.
        </p>
        <div class="rounded-xl border border-base-200 bg-base-50 p-4 text-sm">
          <div class="font-medium">Alasan perubahan</div>
          <p class="mt-1 text-base-content/80">{{ editForm.changeReason || "-" }}</p>
        </div>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeEditConfirmModal">Kembali</Button>
          <Button color="primary" @click="saveEdit">Ya, Simpan</Button>
        </div>
      </div>
    </Modal>

    <Modal :open="deleteModalOpen" title="Konfirmasi Hapus" size="sm" hide-footer @close="closeDeleteModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Profil
          <span class="font-semibold">{{ selectedRow?.name }}</span>
          akan dihapus dari daftar mockup karyawan.
        </p>
        <div class="flex justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeDeleteModal">Batal</Button>
          <Button color="error" @click="confirmDelete">Hapus</Button>
        </div>
      </div>
    </Modal>
  </div>
</template>
