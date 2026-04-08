import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";

export type TimeOffRequestStatus = "awaiting_approval" | "approved" | "rejected";

export type TimeOffRequestRecord = {
  id: string;
  employeeId: number;
  policyName: string;
  policyCode: string;
  requestDate: string;
  startDate: string;
  endDate: string;
  durationLabel: string;
  reason: string;
  status: TimeOffRequestStatus;
  attachmentCount: number;
  approverName: string;
};

export type TimeOffPolicyRecord = {
  id: string;
  name: string;
  code: string;
  balanceType: "Fixed balance" | "Unlimited";
  balanceUnit: "Annually" | "Monthly" | "Unlimited";
  effectiveDateLabel: string;
  assignedEmployeeCount: number;
  baseQuota: number | null;
  status: "active" | "draft";
};

export type TimeOffBalanceRecord = {
  id: string;
  employeeId: number;
  policyId: string;
  policyName: string;
  entitled: number;
  used: number;
  remaining: number;
  source: "rule" | "manual_override";
};

const employeeById = new Map(employeeDirectory.map((item) => [item.id, item]));

export const timeOffRequests: TimeOffRequestRecord[] = [
  {
    id: "REQ-20250909-0003",
    employeeId: 18,
    policyName: "Working From Home",
    policyCode: "WFH",
    requestDate: "2025-09-09",
    startDate: "2025-09-09",
    endDate: "2025-09-09",
    durationLabel: "1 day",
    reason: "WFH untuk pendampingan keluarga di rumah.",
    status: "awaiting_approval",
    attachmentCount: 2,
    approverName: "Supriyatna",
  },
  {
    id: "REQ-20250909-0002",
    employeeId: 23,
    policyName: "Working From Home",
    policyCode: "WFH",
    requestDate: "2025-09-09",
    startDate: "2025-09-09",
    endDate: "2025-09-09",
    durationLabel: "1 day",
    reason: "WFH karena fokus penyelesaian deck organisasi.",
    status: "awaiting_approval",
    attachmentCount: 0,
    approverName: "Kezia Valencia",
  },
  {
    id: "REQ-20250908-0010",
    employeeId: 11,
    policyName: "Cuti Tahunan",
    policyCode: "CTU",
    requestDate: "2025-09-08",
    startDate: "2025-09-25",
    endDate: "2025-09-27",
    durationLabel: "3 days",
    reason: "Mengambil jatah cuti tahunan untuk keperluan keluarga.",
    status: "approved",
    attachmentCount: 0,
    approverName: "Toni Widodo",
  },
  {
    id: "REQ-20250908-0009",
    employeeId: 10,
    policyName: "Sakit Tanpa Surat Dokter",
    policyCode: "STS",
    requestDate: "2025-09-08",
    startDate: "2025-09-08",
    endDate: "2025-09-08",
    durationLabel: "1 day",
    reason: "Kurang sehat dan perlu istirahat mandiri di rumah.",
    status: "approved",
    attachmentCount: 2,
    approverName: "Yoga Kurniawan",
  },
  {
    id: "REQ-20250908-0008",
    employeeId: 8,
    policyName: "Izin Masuk Kerja Setengah Hari",
    policyCode: "KSH",
    requestDate: "2025-09-08",
    startDate: "2025-09-10",
    endDate: "2025-09-10",
    durationLabel: "0.5 day",
    reason: "Keperluan administrasi pribadi pada pagi hari.",
    status: "rejected",
    attachmentCount: 0,
    approverName: "Ferry Samsuhadi",
  },
  {
    id: "REQ-20250907-0007",
    employeeId: 16,
    policyName: "Dinas Dalam Kota",
    policyCode: "DDK",
    requestDate: "2025-09-07",
    startDate: "2025-09-12",
    endDate: "2025-09-12",
    durationLabel: "1 day",
    reason: "Perjalanan dinas lokal untuk campus hiring event.",
    status: "awaiting_approval",
    attachmentCount: 2,
    approverName: "Ferry Samsuhadi",
  },
];

export const timeOffPolicies: TimeOffPolicyRecord[] = [
  {
    id: "policy-ctu",
    name: "Cuti Tahunan",
    code: "CTU",
    balanceType: "Fixed balance",
    balanceUnit: "Annually",
    effectiveDateLabel: "1 Jan 2026",
    assignedEmployeeCount: 19,
    baseQuota: 12,
    status: "active",
  },
  {
    id: "policy-wfh",
    name: "Working From Home",
    code: "WFH",
    balanceType: "Unlimited",
    balanceUnit: "Unlimited",
    effectiveDateLabel: "1 Jan 2026",
    assignedEmployeeCount: 24,
    baseQuota: null,
    status: "active",
  },
  {
    id: "policy-sts",
    name: "Sakit Tanpa Surat Dokter",
    code: "STS",
    balanceType: "Fixed balance",
    balanceUnit: "Monthly",
    effectiveDateLabel: "1 Jan 2026",
    assignedEmployeeCount: 24,
    baseQuota: 2,
    status: "active",
  },
  {
    id: "policy-ksh",
    name: "Izin Masuk Kerja Setengah Hari",
    code: "KSH",
    balanceType: "Fixed balance",
    balanceUnit: "Annually",
    effectiveDateLabel: "1 Feb 2026",
    assignedEmployeeCount: 12,
    baseQuota: 6,
    status: "draft",
  },
];

export const timeOffBalances: TimeOffBalanceRecord[] = [
  { id: "bal-1", employeeId: 1, policyId: "policy-ctu", policyName: "Cuti Tahunan", entitled: 15, used: 4, remaining: 11, source: "manual_override" },
  { id: "bal-2", employeeId: 2, policyId: "policy-ctu", policyName: "Cuti Tahunan", entitled: 12, used: 3, remaining: 9, source: "rule" },
  { id: "bal-3", employeeId: 4, policyId: "policy-ctu", policyName: "Cuti Tahunan", entitled: 18, used: 5, remaining: 13, source: "manual_override" },
  { id: "bal-4", employeeId: 10, policyId: "policy-sts", policyName: "Sakit Tanpa Surat Dokter", entitled: 2, used: 1, remaining: 1, source: "rule" },
  { id: "bal-5", employeeId: 18, policyId: "policy-wfh", policyName: "Working From Home", entitled: 0, used: 7, remaining: 0, source: "rule" },
];

export const timeOffEmployeeMeta = (employeeId: number) => employeeById.get(employeeId) ?? null;
