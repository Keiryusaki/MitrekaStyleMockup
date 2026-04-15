<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref, render, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { AgGridSurface, Avatar, Button, Card, DateTimePicker, Icon, Input, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import type { EmployeeProfile, EmployeeStatus } from "@/data/hrisAdmin/employeeDirectory";
import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";
import { iconRegistry } from "@/composables/Icon";
import EmployeeFormPage from "@/pages/HRISAdmin/components/EmployeeFormPage.vue";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";

type WorkType = EmployeeProfile["workType"];
type AttendanceRisk = "Low" | "Medium" | "High";
type EmploymentType = "Permanent" | "Contract" | "Probation";
type AppAccessFilter = "all" | "active" | "pending";

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
  hasAttendanceAccess: boolean;
  invitationSentAt: string | null;
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
  emergencyContacts: Array<{
    name: string;
    relationship: string;
    phoneNumber: string;
    additionalPhoneNumber: string;
  }>;
  placeOfBirth: string;
  birthDate: string;
  gender: string;
  maritalStatus: string;
  bloodType: string;
  religion: string;
  nik: string;
  threeLetterCode: string;
  organizationStructure: string;
  grade: string;
  pendidikanRows: Array<{
    strata: string;
    tahunLulus: string;
    institusi: string;
    dokumenUrl: string;
  }>;
  sertifikasiRows: Array<{
    tanggalExpired: string;
    nama: string;
    dokumenUrl: string;
  }>;
  kelengkapanRows: Array<{
    dokumen: string;
    keterangan: string;
    dokumenUrl: string;
  }>;
  referensiRows: Array<{
    tanggalReferensi: string;
    posisiPenugasan: string;
    kerjaStart: string;
    kerjaEnd: string;
    pemberiReferensi: string;
    dokumenUrl: string;
  }>;
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
  inviteMethod: "email" | "whatsapp" | "manual";
  invitePhone: string;
  inviteMessage: string;
};

const router = useRouter();
const route = useRoute();
const isDark = ref(false);
const gridApi = ref<any>(null);
const search = ref("");
const selectedDepartment = ref("all");
const selectedStatus = ref<"all" | EmployeeStatus>("all");
const selectedWorkType = ref<"all" | WorkType>("all");
const selectedEmploymentType = ref<"all" | EmploymentType>("all");
const selectedRisk = ref<"all" | AttendanceRisk>("all");
const selectedAppAccess = ref<AppAccessFilter>("all");
const draftSearch = ref(search.value);
const draftDepartment = ref(selectedDepartment.value);
const draftStatus = ref(selectedStatus.value);
const draftWorkType = ref(selectedWorkType.value);
const draftEmploymentType = ref(selectedEmploymentType.value);
const draftRisk = ref(selectedRisk.value);
const draftAppAccess = ref(selectedAppAccess.value);
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
const inviteSuccessModalOpen = ref(false);
const invitationTargetEmail = ref("");
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
  emergencyContacts: [],
  placeOfBirth: "",
  birthDate: "",
  gender: "Male",
  maritalStatus: "",
  bloodType: "",
  religion: "",
  nik: "",
  threeLetterCode: "MHR",
  organizationStructure: "Human Resources",
  grade: "G3",
  pendidikanRows: [],
  sertifikasiRows: [],
  kelengkapanRows: [],
  referensiRows: [],
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
  inviteMethod: "email",
  invitePhone: "",
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
        hasAttendanceAccess: true,
        invitationSentAt: null,
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

const organizationStructureOptions = [
  { value: "Human Resources", label: "Human Resources" },
  { value: "People & Culture", label: "People & Culture" },
  { value: "Executive Office", label: "Executive Office" },
  { value: "Talent Acquisition", label: "Talent Acquisition" },
  { value: "Learning & Development", label: "Learning & Development" },
  { value: "HR Technology", label: "HR Technology" },
  { value: "Compensation & Benefit", label: "Compensation & Benefit" },
  { value: "General Affairs", label: "General Affairs" },
];

const kelengkapanKeyOptions = [
  { value: "KTP", label: "KTP" },
  { value: "NPWP", label: "NPWP" },
  { value: "CV Asli", label: "CV Asli" },
  { value: "Ijazah", label: "Ijazah" },
];

const payrollScheduleOptions = [
  { value: "Monthly", label: "Monthly payroll" },
  { value: "Bi-weekly", label: "Bi-weekly payroll" },
];

const employmentFilterOptions = [
  { value: "all", label: "Semua tipe kontrak" },
  { value: "Permanent", label: "Permanent" },
  { value: "Contract", label: "Contract" },
  { value: "Probation", label: "Probation" },
];

const riskFilterOptions = [
  { value: "all", label: "Semua attendance risk" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];
const appAccessFilterOptions = [
  { value: "all", label: "Semua akses aplikasi" },
  { value: "active", label: "Aktif aplikasi" },
  { value: "pending", label: "Belum aktif aplikasi" },
];

const filteredRows = computed(() =>
  baseRows.value.filter((item) => {
    if (selectedDepartment.value !== "all" && item.department !== selectedDepartment.value) return false;
    if (selectedStatus.value !== "all" && item.status !== selectedStatus.value) return false;
    if (selectedWorkType.value !== "all" && item.workType !== selectedWorkType.value) return false;
    if (selectedEmploymentType.value !== "all" && item.employmentType !== selectedEmploymentType.value) return false;
    if (selectedRisk.value !== "all" && item.attendanceRisk !== selectedRisk.value) return false;
    if (selectedAppAccess.value === "active" && !item.hasAttendanceAccess) return false;
    if (selectedAppAccess.value === "pending" && item.hasAttendanceAccess) return false;
    return true;
  }),
);

const filteredTotalCount = computed(() => filteredRows.value.length);
const filteredActiveCount = computed(() => filteredRows.value.filter((item) => item.status === "Active").length);
const filteredProbationCount = computed(() => filteredRows.value.filter((item) => item.status === "Probation").length);
const filteredLeaveCount = computed(() => filteredRows.value.filter((item) => item.status === "Leave").length);

const statusSummary = computed(() => [
  { label: "Total karyawan", value: filteredTotalCount.value, icon: "users" },
  { label: "Active", value: filteredActiveCount.value, icon: "check" },
  { label: "Probation", value: filteredProbationCount.value, icon: "alert-triangle" },
  { label: "Leave", value: filteredLeaveCount.value, icon: "logout" },
]);

const workModelSummary = computed(() => [
  { label: "Office", value: filteredRows.value.filter((item) => item.workType === "Office").length, icon: "monitor" },
  { label: "Hybrid", value: filteredRows.value.filter((item) => item.workType === "Hybrid").length, icon: "repeat" },
  { label: "Remote", value: filteredRows.value.filter((item) => item.workType === "Remote").length, icon: "map-pin" },
]);

const quickHighlights = computed(() => {
  const rows = filteredRows.value;
  return [
    { label: "Departemen aktif", value: new Set(rows.map((item) => item.department)).size, icon: "layout" },
    { label: "Butuh perhatian", value: rows.filter((item) => item.attendanceRisk !== "Low").length, icon: "alert-triangle" },
    { label: "Team lead / manager", value: rows.filter((item) => item.directReports > 0).length, icon: "users" },
    { label: "Coverage hybrid/remote", value: rows.filter((item) => item.workType !== "Office").length, icon: "trendingUp" },
  ];
});

const hasPendingFilterChanges = computed(() =>
  draftDepartment.value !== selectedDepartment.value ||
  draftStatus.value !== selectedStatus.value ||
  draftWorkType.value !== selectedWorkType.value ||
  draftEmploymentType.value !== selectedEmploymentType.value ||
  draftRisk.value !== selectedRisk.value ||
  draftAppAccess.value !== selectedAppAccess.value ||
  draftSearch.value !== search.value,
);

const applyListFilters = () => {
  selectedDepartment.value = draftDepartment.value;
  selectedStatus.value = draftStatus.value;
  selectedWorkType.value = draftWorkType.value;
  selectedEmploymentType.value = draftEmploymentType.value;
  selectedRisk.value = draftRisk.value;
  selectedAppAccess.value = draftAppAccess.value;
  search.value = draftSearch.value;
  gridApi.value?.setGridOption("quickFilterText", search.value);
};

const resetListFilters = () => {
  draftDepartment.value = "all";
  draftStatus.value = "all";
  draftWorkType.value = "all";
  draftEmploymentType.value = "all";
  draftRisk.value = "all";
  draftAppAccess.value = "all";
  draftSearch.value = "";
  selectedDepartment.value = "all";
  selectedStatus.value = "all";
  selectedWorkType.value = "all";
  selectedEmploymentType.value = "all";
  selectedRisk.value = "all";
  selectedAppAccess.value = "all";
  search.value = "";
  gridApi.value?.setGridOption("quickFilterText", "");
};

const formMode = computed<"create" | "edit" | null>(() => {
  if (route.path === "/mockup-hris-admin/employee/add") return "create";
  if (route.path.startsWith("/mockup-hris-admin/employee/") && route.path.endsWith("/edit")) return "edit";
  return null;
});

const isCreatePage = computed(() => formMode.value === "create");
const isEditPage = computed(() => formMode.value === "edit");
const isFormPage = computed(() => formMode.value !== null);
const editingEmployeeId = computed(() => Number(route.params.employeeId || 0));
const pageForm = computed(() => (isCreatePage.value ? createForm.value : editForm.value));

const resolveRowById = (id: number) => baseRows.value.find((item) => item.id === id) ?? null;

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

const actionRenderer = (params: any) => {
  const row = params.data as EmployeeRow | undefined;
  const resignButton = row?.hasAttendanceAccess
    ? `<button type="button" class="icon-btn icon-btn-solid-secondary icon-btn-xs" data-action="resign" title="Resign">
      ${iconSvg("logout")}
    </button>`
    : "";
  return `<div class="flex h-full items-center justify-center gap-2">
    <button type="button" class="icon-btn icon-btn-solid-primary icon-btn-xs" data-action="detail" title="Detail">
      ${iconSvg("user")}
    </button>
    ${resignButton}
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="audit" title="Audit log">
      ${iconSvg("clipboardClock")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" data-action="delete" title="Hapus">
      ${iconSvg("trash")}
    </button>
  </div>`;
};

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
    cellRenderer: (params: any) => actionRenderer(params),
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

const openAttendanceLog = (row: EmployeeRow) => {
  detailModalOpen.value = false;
  router.push(`/mockup-hris-admin/attendance/${row.id}`);
};

const sendInvitation = (row: EmployeeRow) => {
  const sentAt = new Date().toISOString();
  employeeOverrides.value = {
    ...employeeOverrides.value,
    [row.id]: {
      ...(employeeOverrides.value[row.id] ?? {}),
      invitationSentAt: sentAt,
    },
  };
  selectedRow.value = { ...row, invitationSentAt: sentAt };
  invitationTargetEmail.value = row.email;
  inviteSuccessModalOpen.value = true;
};

const hydrateEditFormFromRow = (row: EmployeeRow) => {
  const { firstName, lastName } = splitEmployeeName(row.name);
  const codeParts = row.employeeCode.split("-");
  selectedRow.value = row;
  editStep.value = 1;
  editForm.value = {
    ...createEmptyEmployeeForm({
      firstName,
      lastName,
      email: row.email,
      phoneNumber: row.phone,
      emergencyContacts: [
        {
          name: "Keluarga Terdekat",
          relationship: "Family",
          phoneNumber: row.phone,
          additionalPhoneNumber: "",
        },
      ],
      placeOfBirth: "Jakarta",
      birthDate: "1995-01-01",
      maritalStatus: "Single",
      religion: "Islam",
      threeLetterCode: codeParts[0] || "MHR",
      employeeCode: row.employeeCode,
      department: row.department,
      organizationStructure: row.department,
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
      grade: row.grade,
      bankName: "BCA",
      bankAccountName: row.name,
      bankAccountNumber: `${1000000000 + row.id}`,
      baseSalary: "15000000",
      inviteEmail: row.email,
      inviteMethod: "manual",
    }),
    changeReason: "",
  };
};

const openEditModal = (row: EmployeeRow) => {
  returnToDetailOnEditClose.value = false;
  detailModalOpen.value = false;
  hydrateEditFormFromRow(row);
  router.push(`/mockup-hris-admin/employee/${row.id}/edit`);
};

const hydrateCreateForm = () => {
  selectedRow.value = null;
  createStep.value = 1;
  createForm.value = createEmptyEmployeeForm({
    employeeCode: `MHR-${String(baseRows.value.length + 1).padStart(3, "0")}`,
    threeLetterCode: "MHR",
    department: selectedDepartment.value !== "all" ? selectedDepartment.value : "Human Resources",
    organizationStructure: selectedDepartment.value !== "all" ? selectedDepartment.value : "Human Resources",
    branch: "Pusat",
    location: "Jakarta HQ",
    title: "",
    employmentType: "Permanent",
    workType: "Office",
    joinDate: "2026-04-06",
    signDate: "2026-03-16",
    status: "Active",
    inviteMethod: "email",
  });
};

const openCreateModal = () => {
  hydrateCreateForm();
  router.push("/mockup-hris-admin/employee/add");
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
  if (isCreatePage.value) router.push("/mockup-hris-admin/employee");
};

const closeEditModal = () => {
  editModalOpen.value = false;
  if (isEditPage.value) {
    router.push("/mockup-hris-admin/employee");
    return;
  }
  if (returnToDetailOnEditClose.value && selectedRow.value) {
    detailModalOpen.value = true;
  }
  returnToDetailOnEditClose.value = false;
};

watch(
  () => [formMode.value, editingEmployeeId.value, recordsVersion.value],
  ([mode, employeeId]) => {
    if (mode === "create") {
      hydrateCreateForm();
      return;
    }
    if (mode === "edit") {
      const row = resolveRowById(Number(employeeId));
      if (!row) {
        router.replace("/mockup-hris-admin/employee");
        return;
      }
      hydrateEditFormFromRow(row);
    }
  },
  { immediate: true },
);

const closeAuditModal = () => {
  auditModalOpen.value = false;
};

const closeResignModal = () => {
  resignModalOpen.value = false;
};

const closeDeleteModal = () => {
  deleteModalOpen.value = false;
};

const closeInviteSuccessModal = () => {
  inviteSuccessModalOpen.value = false;
};

const closeEditConfirmModal = () => {
  editConfirmModalOpen.value = false;
};

const saveEditDisabled = computed(() => !isEditPage.value && !editForm.value.changeReason.trim());

const createSteps = [
  { number: 1, icon: "user", title: "Personal data", description: "Basic identity and contact" },
  { number: 2, icon: "users", title: "Emergency contact", description: "Contact person in urgent case" },
  { number: 3, icon: "clipboardClock", title: "Employment", description: "Job and contract setup" },
  { number: 4, icon: "book", title: "Education & Experience", description: "Education, cert, and references" },
  { number: 5, icon: "hard-drive-download", title: "Payroll", description: "Salary and bank account" },
];
const inviteMethodOptions = [
  { value: "email", label: "Email invite" },
  { value: "whatsapp", label: "WhatsApp invite" },
  { value: "manual", label: "Buat akun, kirim manual nanti" },
];
const createPrimaryLabel = computed(() => (createStep.value === 4 ? "Send Invite" : "Next"));
const createBackDisabled = computed(() => createStep.value === 1);
const activeCreateStepMeta = computed(() => createSteps[createStep.value - 1]);
const editPrimaryLabel = computed(() => (editStep.value === 4 ? "Save Changes" : "Next"));
const editBackDisabled = computed(() => editStep.value === 1);
const activeEditStepMeta = computed(() => createSteps[editStep.value - 1]);
const formPageTitle = computed(() => (isCreatePage.value ? "Add Employee" : "Edit Employee"));
const formPageDescription = computed(() =>
  isCreatePage.value
    ? "Buat profile karyawan baru lewat halaman khusus, termasuk strategi invite akun."
    : "Ubah profile karyawan di halaman terpisah agar review perubahan lebih fokus.",
);

const pageStep = computed({
  get: () => (isCreatePage.value ? createStep.value : editStep.value),
  set: (value: number) => {
    if (isCreatePage.value) createStep.value = value;
    else editStep.value = value;
  },
});
const pageStepMeta = computed(() => createSteps[pageStep.value - 1]);
const pageStepValid = computed(() => (isCreatePage.value ? createStepValid.value : editStepValid.value));
const pageBackDisabled = computed(() => pageStep.value === 1);
const pagePrimaryLabel = computed(() => {
  if (pageStep.value < createSteps.length) return "Next";
  return isCreatePage.value ? "Simpan & Buat Karyawan" : "Simpan Perubahan";
});
const createStepValid = computed(() => {
  if (createStep.value === 1) {
    return !!(
      createForm.value.firstName.trim() &&
      createForm.value.email.trim() &&
      createForm.value.phoneNumber.trim() &&
      createForm.value.birthDate &&
      createForm.value.maritalStatus &&
      createForm.value.religion &&
      createForm.value.nik.trim() &&
      createForm.value.citizenIdAddress.trim() &&
      createForm.value.postalCode.trim()
    );
  }
  if (createStep.value === 2) {
    return createForm.value.emergencyContacts.some(
      (item) => item.name.trim() && item.relationship.trim() && item.phoneNumber.trim(),
    );
  }
  if (createStep.value === 3) {
    return !!(
      createForm.value.threeLetterCode.trim() &&
      createForm.value.organizationStructure.trim() &&
      createForm.value.title.trim() &&
      createForm.value.jobLevel.trim() &&
      createForm.value.branch.trim() &&
      createForm.value.joinDate
    );
  }
  if (createStep.value === 4) return true;
  return !!(
    createForm.value.bankName.trim() &&
    createForm.value.bankAccountName.trim() &&
    createForm.value.bankAccountNumber.trim() &&
    createForm.value.baseSalary.trim()
  );
});
const editStepValid = computed(() => {
  if (editStep.value === 1) {
    return !!(
      editForm.value.firstName.trim() &&
      editForm.value.email.trim() &&
      editForm.value.phoneNumber.trim() &&
      editForm.value.birthDate &&
      editForm.value.maritalStatus &&
      editForm.value.religion &&
      editForm.value.nik.trim() &&
      editForm.value.citizenIdAddress.trim() &&
      editForm.value.postalCode.trim()
    );
  }
  if (editStep.value === 2) {
    return editForm.value.emergencyContacts.some(
      (item) => item.name.trim() && item.relationship.trim() && item.phoneNumber.trim(),
    );
  }
  if (editStep.value === 3) {
    return !!(
      editForm.value.threeLetterCode.trim() &&
      editForm.value.organizationStructure.trim() &&
      editForm.value.title.trim() &&
      editForm.value.jobLevel.trim() &&
      editForm.value.branch.trim() &&
      editForm.value.joinDate
    );
  }
  if (editStep.value === 4) return true;
  return !!(
    editForm.value.bankName.trim() &&
    editForm.value.bankAccountName.trim() &&
    editForm.value.bankAccountNumber.trim() &&
    editForm.value.baseSalary.trim()
  );
});

const nextCreateStep = () => {
  if (!createStepValid.value) return;
  if (createStep.value < createSteps.length) createStep.value += 1;
  else submitCreateEmployee();
};

const prevCreateStep = () => {
  if (createStep.value > 1) createStep.value -= 1;
};

const nextEditStep = () => {
  if (!editStepValid.value) return;
  if (editStep.value < createSteps.length) editStep.value += 1;
  else {
    if (!editForm.value.changeReason.trim()) {
      editForm.value.changeReason = "Penyesuaian data profile karyawan dari halaman edit.";
    }
    if (isEditPage.value) saveEdit();
    else editConfirmModalOpen.value = true;
  }
};

const prevEditStep = () => {
  if (editStep.value > 1) editStep.value -= 1;
};

const inviteTarget = (form: EmployeeFormState) => {
  if (form.inviteMethod === "whatsapp") return form.invitePhone.trim() || form.phoneNumber.trim() || "-";
  if (form.inviteMethod === "manual") return "Manual handover";
  return form.inviteEmail.trim() || form.email.trim() || "-";
};

const nextPageStep = () => {
  if (isCreatePage.value) nextCreateStep();
  else nextEditStep();
};

const prevPageStep = () => {
  if (isCreatePage.value) prevCreateStep();
  else prevEditStep();
};

const submitCreateEmployee = () => {
  const nextId = Math.max(0, ...baseRows.value.map((item) => item.id)) + 1;
  const fullName = `${createForm.value.firstName} ${createForm.value.lastName}`.trim();
  const employmentType = createForm.value.employmentType;
  const codePrefix = createForm.value.threeLetterCode.trim().toUpperCase().slice(0, 3) || "MHR";
  const employeeCode = `${codePrefix}-${String(nextId).padStart(3, "0")}`;
  const organizationStructure = createForm.value.organizationStructure.trim() || "Human Resources";
  const created: EmployeeRow = {
    id: nextId,
    employeeCode,
    name: fullName || `Employee ${nextId}`,
    title: createForm.value.title.trim() || "Staff",
    department: organizationStructure,
    workType: createForm.value.workType,
    location: createForm.value.location.trim() || "Jakarta HQ",
    status: createForm.value.status,
    no: nextId,
    branch: createForm.value.branch,
    organization: organizationMap[organizationStructure] ?? organizationStructure,
    jobLevel: createForm.value.jobLevel,
    grade: createForm.value.grade.trim() || deriveGrade(employmentType, nextId),
    employeeClass: deriveEmployeeClass(createForm.value.workType, nextId),
    email: createForm.value.email.trim() || toEmail(fullName || `Employee ${nextId}`),
    phone: createForm.value.phoneNumber.trim() || toPhone(nextId),
    joinDate: createForm.value.joinDate,
    endDate: employmentType === "Permanent" ? null : (createForm.value.endDate || addDays(createForm.value.joinDate, 720)),
    signDate: createForm.value.signDate || addDays(createForm.value.joinDate, -21),
    resignDate: null,
    barcode: `MSI-${String(100 + nextId).padStart(3, "0")}`,
    manager: deriveManager(organizationStructure, nextId),
    employmentType,
    attendanceRisk: deriveAttendanceRisk(createForm.value.status, createForm.value.workType, nextId),
    leaveBalance: 12,
    directReports: deriveDirectReports(createForm.value.title.trim() || "Staff", nextId),
    hasAttendanceAccess: false,
    invitationSentAt: null,
  };

  createdEmployees.value = [...createdEmployees.value, created];
  auditLogStore.value = {
    ...auditLogStore.value,
    [nextId]: [
      {
        id: `${nextId}-${Date.now()}`,
        actor: "Admin HRIS",
        changedAt: new Date().toISOString(),
        reason: "Karyawan baru dibuat dari halaman add/edit.",
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
  if (isCreatePage.value) {
    router.push("/mockup-hris-admin/employee");
  }
};

const saveEdit = () => {
  const row = selectedRow.value;
  if (!row || saveEditDisabled.value) return;

  const fullName = `${editForm.value.firstName} ${editForm.value.lastName}`.trim() || row.name;
  const nextEmploymentType = editForm.value.employmentType;
  const nextAttendanceRisk = deriveAttendanceRisk(editForm.value.status, editForm.value.workType, row.id);
  const codePrefix = editForm.value.threeLetterCode.trim().toUpperCase().slice(0, 3) || row.employeeCode.split("-")[0] || "MHR";
  const nextEmployeeCode = `${codePrefix}-${String(row.id).padStart(3, "0")}`;
  const organizationStructure = editForm.value.organizationStructure.trim() || editForm.value.department || row.department;
  const changes = [
    { field: "Employee code", before: row.employeeCode, after: nextEmployeeCode },
    { field: "Nama", before: row.name, after: fullName },
    { field: "Email", before: row.email, after: editForm.value.email.trim() || row.email },
    { field: "Telepon", before: row.phone, after: editForm.value.phoneNumber.trim() || row.phone },
    { field: "Jabatan", before: row.title, after: editForm.value.title },
    { field: "Departemen", before: row.department, after: organizationStructure },
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
      employeeCode: nextEmployeeCode,
      name: fullName,
      title: editForm.value.title,
      department: organizationStructure,
      workType: editForm.value.workType,
      location: editForm.value.location,
      status: editForm.value.status,
      branch: editForm.value.branch || (branchMap[editForm.value.location] ?? "Pusat"),
      organization: organizationMap[organizationStructure] ?? organizationStructure,
      jobLevel: editForm.value.jobLevel || deriveJobLevel(editForm.value.title),
      grade: editForm.value.grade.trim() || deriveGrade(nextEmploymentType, row.id),
      employeeClass: deriveEmployeeClass(editForm.value.workType, row.id),
      joinDate: editForm.value.joinDate,
      signDate: editForm.value.signDate || null,
      endDate: nextEmploymentType === "Permanent" ? null : (editForm.value.endDate || addDays(editForm.value.joinDate, 720)),
      email: editForm.value.email.trim() || toEmail(fullName),
      phone: editForm.value.phoneNumber.trim() || row.phone,
      manager: deriveManager(organizationStructure, row.id),
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
  if (isEditPage.value) {
    router.push("/mockup-hris-admin/employee");
  }
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
  if (action === "resign" && row.hasAttendanceAccess) openResignModal(row);
  if (action === "audit") openAuditModal(row);
  if (action === "delete") openDeleteModal(row);
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <EmployeeFormPage
      v-if="isFormPage"
      :is-create-page="isCreatePage"
      :form-page-title="formPageTitle"
      :form-page-description="formPageDescription"
      :page-step="pageStep"
      :create-steps="createSteps"
      :page-step-meta="pageStepMeta"
      :page-step-valid="pageStepValid"
      :page-back-disabled="pageBackDisabled"
      :page-primary-label="pagePrimaryLabel"
      :page-form="pageForm"
      :edit-form="editForm"
      :gender-options="genderOptions"
      :marital-status-options="maritalStatusOptions"
      :blood-type-options="bloodTypeOptions"
      :religion-options="religionOptions"
      :job-position-options="jobPositionOptions"
      :organization-structure-options="organizationStructureOptions"
      :branch-options="branchOptions"
      :job-level-options="jobLevelOptions"
      :employment-type-options="employmentTypeOptions"
      :work-type-options="workTypeOptions"
      :status-options="statusOptions"
      :payroll-schedule-options="payrollScheduleOptions"
      :kelengkapan-key-options="kelengkapanKeyOptions"
      :invite-method-options="inviteMethodOptions"
      @go-list="router.push('/mockup-hris-admin/employee')"
      @step-change="pageStep = $event"
      @prev-step="prevPageStep"
      @next-step="nextPageStep"
    />

    <template v-else>
    <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
      <PageHeader
        category="Mockup"
        title="Employee List"
        description="Halaman daftar karyawan dulu sebagai entry point admin HRIS, baru lanjut ke detail, transfer, resign, atau edit data."
      />
    </div>

    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3">
        <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
          <div class="grid flex-1 gap-3 md:grid-cols-3">
            <div class="w-full">
              <SelectDropdown
                v-model="draftDepartment"
                :options="departmentOptions"
                size="sm"
                variant="outline"
                color="default"
              />
            </div>
            <div class="w-full">
              <SelectDropdown
                v-model="draftStatus"
                :options="statusOptions"
                size="sm"
                variant="outline"
                color="default"
              />
            </div>
            <div class="w-full">
              <SelectDropdown
                v-model="draftWorkType"
                :options="workTypeOptions"
                size="sm"
                variant="outline"
                color="default"
              />
            </div>
            <div class="w-full">
              <SelectDropdown
                v-model="draftEmploymentType"
                :options="employmentFilterOptions"
                size="sm"
                variant="outline"
                color="default"
              />
            </div>
            <div class="w-full">
              <SelectDropdown
                v-model="draftRisk"
                :options="riskFilterOptions"
                size="sm"
                variant="outline"
                color="default"
              />
            </div>
            <div class="w-full">
              <SelectDropdown
                v-model="draftAppAccess"
                :options="appAccessFilterOptions"
                size="sm"
                variant="outline"
                color="default"
              />
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-3 md:flex-row md:items-center">
          <div class="min-w-[260px] flex-1">
            <Input
              v-model="draftSearch"
              size="sm"
              placeholder="Search name/employee code..."
              class="w-full"
              prefix-icon="search"
              clearable
            />
          </div>
          <div class="ml-auto flex items-center gap-2">
            <Button variant="ghost" color="default" size="sm" @click="resetListFilters">Reset</Button>
            <Button color="primary" size="sm" :disabled="!hasPendingFilterChanges" @click="applyListFilters">Apply</Button>
            <Button color="primary" size="sm" @click="openCreateModal">
              <Icon name="plus" class="h-4 w-4" />
              Add Employee
            </Button>
          </div>
        </div>
      </div>
    </Card>

    <div class="space-y-4">
      <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 text-xs text-base-content/70">
        <div v-for="item in statusSummary" :key="`status-${item.label}`" class="summary-card">
          <div class="summary-icon">
            <Icon :name="item.icon" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">{{ item.label }}</div>
            <div class="summary-value-wrap">
              <span class="summary-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div v-for="item in workModelSummary" :key="`work-${item.label}`" class="summary-card">
          <div class="summary-icon">
            <Icon :name="item.icon" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">{{ item.label }}</div>
            <div class="summary-value-wrap">
              <span class="summary-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
        <div v-for="item in quickHighlights" :key="`highlight-${item.label}`" class="summary-card">
          <div class="summary-icon">
            <Icon :name="item.icon" class="h-4 w-4" />
          </div>
          <div class="summary-content">
            <div class="summary-label">{{ item.label }}</div>
            <div class="summary-value-wrap">
              <span class="summary-value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

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
            <Button
              v-if="selectedRow.hasAttendanceAccess"
              variant="outline"
              color="default"
              size="sm"
              @click="openAttendanceLog(selectedRow)"
            >
              <Icon name="clipboardClock" class="h-4 w-4" />
              Attendance Log
            </Button>
            <Button
              v-else
              variant="outline"
              color="default"
              size="sm"
              @click="sendInvitation(selectedRow)"
            >
              <Icon name="send" class="h-4 w-4" />
              {{ selectedRow.invitationSentAt ? "Resend Invitation" : "Send Invitation" }}
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

    <Modal :open="inviteSuccessModalOpen" title="Invitation Sent" size="sm" hide-footer @close="closeInviteSuccessModal">
      <div class="space-y-4">
        <p class="text-sm text-base-content/80">
          Undangan akses berhasil dikirim ke
          <span class="font-semibold">{{ invitationTargetEmail || "-" }}</span>.
        </p>
        <div class="rounded-xl border border-success/30 bg-success/10 p-3 text-sm text-base-content/80">
          Mohon pengguna cek email secara berkala untuk melanjutkan aktivasi akses aplikasi live attendance.
        </div>
        <div class="flex justify-end">
          <Button color="primary" size="sm" @click="closeInviteSuccessModal">Tutup</Button>
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
    </template>
  </div>
</template>

<style scoped>
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
</style>

