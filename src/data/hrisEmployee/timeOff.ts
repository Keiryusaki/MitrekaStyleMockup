export type EmployeeTimeOffStatus = "awaiting_approval" | "approved" | "rejected";

export type EmployeeTimeOffRequest = {
  id: string;
  requestType: string;
  submittedAt: string;
  startDate: string;
  endDate: string;
  durationLabel: string;
  reason: string;
  approverName: string;
  status: EmployeeTimeOffStatus;
  approverNote?: string;
};

export type EmployeeTimeOffTimelineEntry = {
  key: string;
  label: string;
  at: string;
  actor: string;
  note: string;
};

export type EmployeeProfileRecord = {
  employeeId: string;
  name: string;
  title: string;
  department: string;
  location: string;
  managerName: string;
  workType: "Office" | "Hybrid" | "Remote";
  annualLeaveBalance: number;
  sickLeaveBalance: number;
};

export type EmployeeAnnouncementRecord = {
  id: string;
  author: string;
  channel: string;
  title: string;
  message: string;
  publishedAt: string;
  priority: "normal" | "important";
};

export type EmployeeWhoIsOffRecord = {
  id: string;
  name: string;
  title: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  status: "approved" | "awaiting_approval";
};

export const employeeProfile: EmployeeProfileRecord = {
  employeeId: "MTR-EMP-024",
  name: "Alfian Nugraha",
  title: "People Operations Specialist",
  department: "Human Resources",
  location: "Jakarta HQ",
  managerName: "Supriyatna",
  workType: "Hybrid",
  annualLeaveBalance: 8,
  sickLeaveBalance: 2,
};

export const employeeAnnouncements: EmployeeAnnouncementRecord[] = [
  {
    id: "ann-1",
    author: "Ferry Samsuhadi",
    channel: "People Update",
    title: "Reminder Hybrid Schedule Minggu Ini",
    message: "Tim product dan people ops tetap jalankan jadwal hybrid normal. Pastikan update planned office day di awal minggu.",
    publishedAt: "2026-04-20",
    priority: "important",
  },
  {
    id: "ann-2",
    author: "Kezia Valencia",
    channel: "Internal Info",
    title: "Open House Community Jumat Sore",
    message: "Jumat pukul 16:00 ada sesi open house komunitas internal di area pantry lantai 5. Semua tim welcome join.",
    publishedAt: "2026-04-18",
    priority: "normal",
  },
];

export const employeeTimeOffRequests: EmployeeTimeOffRequest[] = [
  {
    id: "REQ-20260415-0012",
    requestType: "Cuti Tahunan",
    submittedAt: "2026-04-15",
    startDate: "2026-04-22",
    endDate: "2026-04-23",
    durationLabel: "2 hari",
    reason: "Keperluan keluarga di luar kota.",
    approverName: "Supriyatna",
    status: "awaiting_approval",
  },
  {
    id: "REQ-20260410-0009",
    requestType: "Izin Setengah Hari",
    submittedAt: "2026-04-10",
    startDate: "2026-04-11",
    endDate: "2026-04-11",
    durationLabel: "0.5 hari",
    reason: "Urus dokumen administrasi.",
    approverName: "Supriyatna",
    status: "approved",
    approverNote: "Disetujui, pastikan handover task.",
  },
  {
    id: "REQ-20260402-0004",
    requestType: "Work From Home",
    submittedAt: "2026-04-02",
    startDate: "2026-04-03",
    endDate: "2026-04-03",
    durationLabel: "1 hari",
    reason: "Pendampingan keluarga di rumah.",
    approverName: "Supriyatna",
    status: "rejected",
    approverNote: "Ditolak karena ada agenda onboarding onsite.",
  },
];

export const employeeWhoIsOff: EmployeeWhoIsOffRecord[] = [
  {
    id: "off-1",
    name: "Dina Puspita",
    title: "Recruitment Coordinator",
    leaveType: "Cuti Tahunan",
    startDate: "2026-04-21",
    endDate: "2026-04-21",
    status: "approved",
  },
  {
    id: "off-2",
    name: "Rizky Fadilah",
    title: "HR Operations Analyst",
    leaveType: "Izin Setengah Hari",
    startDate: "2026-04-21",
    endDate: "2026-04-21",
    status: "approved",
  },
  {
    id: "off-3",
    name: "Nabila Khairunnisa",
    title: "People Analytics Specialist",
    leaveType: "Sakit",
    startDate: "2026-04-23",
    endDate: "2026-04-24",
    status: "approved",
  },
  {
    id: "off-4",
    name: "Bagas Pratama",
    title: "Compensation Officer",
    leaveType: "Work From Home",
    startDate: "2026-04-25",
    endDate: "2026-04-25",
    status: "awaiting_approval",
  },
];

const timelineDictionary: Record<string, EmployeeTimeOffTimelineEntry[]> = {
  "REQ-20260415-0012": [
    {
      key: "submitted",
      label: "Pengajuan dibuat",
      at: "2026-04-15 09:10",
      actor: "Alfian Nugraha",
      note: "Pengajuan cuti tahunan 2 hari.",
    },
    {
      key: "waiting",
      label: "Menunggu approval",
      at: "2026-04-15 09:12",
      actor: "System",
      note: "Request dikirim ke atasan langsung.",
    },
  ],
  "REQ-20260410-0009": [
    {
      key: "submitted",
      label: "Pengajuan dibuat",
      at: "2026-04-10 08:30",
      actor: "Alfian Nugraha",
      note: "Izin setengah hari untuk urusan administrasi.",
    },
    {
      key: "approved",
      label: "Disetujui atasan",
      at: "2026-04-10 10:15",
      actor: "Supriyatna",
      note: "Disetujui, pastikan handover task.",
    },
  ],
  "REQ-20260402-0004": [
    {
      key: "submitted",
      label: "Pengajuan dibuat",
      at: "2026-04-02 07:45",
      actor: "Alfian Nugraha",
      note: "WFH untuk pendampingan keluarga.",
    },
    {
      key: "rejected",
      label: "Ditolak atasan",
      at: "2026-04-02 09:02",
      actor: "Supriyatna",
      note: "Ditolak karena ada agenda onboarding onsite.",
    },
  ],
};

export const getEmployeeTimeOffTimeline = (requestId: string) => timelineDictionary[requestId] ?? [];
export const getEmployeeRequestById = (requestId: string) =>
  employeeTimeOffRequests.find((item) => item.id === requestId) ?? null;
