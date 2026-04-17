<template>
  <section class="-mx-3 min-h-full bg-white pb-24">
    <template v-if="selectedNotificationDetail">
      <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
        <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="selectedNotificationDetail = null">
          <Icon name="arrow-left" class="h-5 w-5" />
        </button>
        <h2 class="flex-1 text-center text-[16px] font-black">Detail Notifikasi</h2>
        <span class="w-8"></span>
      </header>

      <div class="bg-white px-3 pb-5 pt-3">
        <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div class="px-4 py-4">
            <div class="flex items-center gap-3">
              <img :src="selectedNotificationDetail.avatar" :alt="selectedNotificationDetail.sender" class="h-12 w-12 rounded-full object-cover" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-[14px] font-black text-slate-800">{{ selectedNotificationDetail.sender }}</p>
                <p class="text-[11px] font-semibold text-slate-500">{{ selectedNotificationDetail.approvedAt }}</p>
              </div>
              <span class="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-black uppercase text-emerald-700">Approved</span>
            </div>
          </div>

          <div class="border-y border-slate-200 bg-slate-50 px-4 py-3">
            <p class="text-[11px] font-black uppercase tracking-wide text-slate-500">Ringkasan</p>
            <p class="mt-1 text-[14px] font-black text-slate-800">{{ selectedNotificationDetail.summary }}</p>
            <p class="mt-1 text-[12px] text-slate-600">{{ selectedNotificationDetail.message }}</p>
          </div>

          <div class="space-y-4 px-4 py-4">
            <div>
              <p class="text-[11px] font-semibold text-slate-500">Jenis Pengajuan</p>
              <p class="mt-0.5 text-[14px] font-black text-slate-800">{{ selectedNotificationDetail.requestType }}</p>
            </div>
            <div>
              <p class="text-[11px] font-semibold text-slate-500">Tanggal Pengajuan</p>
              <p class="mt-0.5 text-[14px] font-black text-slate-800">{{ selectedNotificationDetail.requestDate }}</p>
            </div>
            <div>
              <p class="text-[11px] font-semibold text-slate-500">Alasan</p>
              <p class="mt-0.5 text-[13px] font-semibold text-slate-700">{{ selectedNotificationDetail.reason }}</p>
            </div>

            <div>
              <p class="text-[11px] font-semibold text-slate-500">Status Persetujuan</p>
              <div class="mt-2 space-y-3">
                <div class="flex items-start gap-2">
                  <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-white">
                    <Icon name="check" class="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p class="text-[13px] font-black text-slate-800">Disetujui oleh {{ selectedNotificationDetail.approvedBy }}</p>
                    <p class="text-[12px] font-semibold text-slate-500">{{ selectedNotificationDetail.approvedAt }}</p>
                  </div>
                </div>
                <div class="ml-2 h-4 w-px bg-slate-200"></div>
                <div class="flex items-start gap-2">
                  <span class="inline-flex h-5 w-5 rounded-full bg-[#4f67d9]"></span>
                  <div>
                    <p class="text-[13px] font-black text-slate-800">Diajukan oleh {{ selectedNotificationDetail.requesterName }}</p>
                    <p class="text-[12px] font-semibold text-slate-500">{{ selectedNotificationDetail.requestDate }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </template>

    <template v-else-if="selectedApprovalRequest">
      <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
        <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="selectedApprovalRequest = null">
          <Icon name="arrow-left" class="h-5 w-5" />
        </button>
        <h2 class="flex-1 text-center text-[16px] font-black">{{ selectedApprovalRequest.title }}</h2>
        <span class="w-8"></span>
      </header>

      <div class="bg-white px-3 pb-5 pt-3">
        <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div class="px-4 py-4">
            <div class="flex items-center gap-3">
              <img :src="selectedApprovalRequest.avatar" :alt="selectedApprovalRequest.employeeName" class="h-14 w-14 rounded-full object-cover" />
              <div class="min-w-0 flex-1">
                <p class="truncate text-[14px] font-black text-slate-800">{{ selectedApprovalRequest.employeeName }}</p>
                <p class="text-[11px] font-semibold text-slate-500">{{ selectedApprovalRequest.requestedAt }}</p>
              </div>
              <Icon name="user" class="h-7 w-7 text-slate-400" />
            </div>

            <div class="mt-3 flex justify-center">
              <span
                class="rounded-full px-4 py-1 text-[11px] font-black text-white"
                :class="
                  selectedApprovalRequest.status === 'approved'
                    ? 'bg-emerald-600'
                    : selectedApprovalRequest.status === 'rejected'
                    ? 'bg-rose-600'
                    : 'bg-amber-500'
                "
              >
                {{ selectedApprovalRequest.status === "approved" ? "Approved" : selectedApprovalRequest.status === "rejected" ? "Rejected" : "Pending" }}
              </span>
            </div>
          </div>

          <div class="grid grid-cols-2 overflow-hidden border-y border-slate-200">
            <div class="h-52 border-r border-slate-200 bg-[linear-gradient(0deg,rgba(148,163,184,0.22)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.22)_1px,transparent_1px)] bg-[size:18px_18px]"></div>
            <img :src="selectedApprovalRequest.photo" :alt="selectedApprovalRequest.employeeName" class="h-52 w-full object-cover" />
          </div>

          <div class="space-y-4 px-4 py-4">
            <div>
              <p class="text-[11px] font-semibold text-slate-500">{{ selectedApprovalRequest.categoryLabel }} request</p>
              <p class="mt-0.5 text-[15px] font-black text-slate-800">{{ selectedApprovalRequest.requestDate }}</p>
              <p class="text-[13px] font-semibold text-slate-600">{{ selectedApprovalRequest.requestTimeLabel }}</p>
            </div>

            <div>
              <p class="text-[11px] font-semibold text-slate-500">Error notes</p>
              <p class="mt-0.5 text-[13px] font-semibold text-slate-700">{{ selectedApprovalRequest.errorNotes }}</p>
            </div>

            <div>
              <p class="text-[11px] font-semibold text-slate-500">Reason</p>
              <p class="mt-0.5 text-[14px] font-black text-slate-800">{{ selectedApprovalRequest.reason }}</p>
            </div>

            <div>
              <p class="text-[11px] font-semibold text-slate-500">Shift</p>
              <p class="mt-0.5 text-[14px] font-black text-slate-800">{{ selectedApprovalRequest.shift }}</p>
              <p class="text-[13px] font-semibold text-slate-600">{{ selectedApprovalRequest.shiftTime }}</p>
            </div>

            <div>
              <p class="text-[11px] font-semibold text-slate-500">Location</p>
              <button class="mt-0.5 text-[13px] font-black text-[#4f67d9] underline">View location</button>
            </div>

            <div>
              <p class="text-[11px] font-semibold text-slate-500">Request status</p>
              <div class="mt-2 space-y-3">
                <div v-if="selectedApprovalRequest.status !== 'pending'" class="flex items-start gap-2">
                  <span
                    class="inline-flex h-5 w-5 items-center justify-center rounded-full text-white"
                    :class="selectedApprovalRequest.status === 'approved' ? 'bg-emerald-500' : 'bg-rose-500'"
                  >
                    <Icon :name="selectedApprovalRequest.status === 'approved' ? 'check' : 'x'" class="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p class="text-[13px] font-black text-slate-800">
                      {{ selectedApprovalRequest.status === "approved" ? "Approved" : "Rejected" }} by {{ selectedApprovalRequest.approvedBy }}
                    </p>
                    <p class="text-[12px] font-semibold text-slate-500">{{ selectedApprovalRequest.approvedAt }}</p>
                  </div>
                </div>
                <div v-else class="flex items-start gap-2">
                  <span class="inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white">
                    <Icon name="clock" class="h-3.5 w-3.5" />
                  </span>
                  <div>
                    <p class="text-[13px] font-black text-slate-800">Menunggu persetujuan Anda</p>
                    <p class="text-[12px] font-semibold text-slate-500">Belum diproses</p>
                  </div>
                </div>
                <div class="ml-2 h-4 w-px bg-slate-200"></div>
                <div class="flex items-start gap-2">
                  <span class="inline-flex h-5 w-5 rounded-full bg-[#4f67d9]"></span>
                  <div>
                    <p class="text-[13px] font-black text-slate-800">Requested by {{ selectedApprovalRequest.employeeName }}</p>
                    <p class="text-[12px] font-semibold text-slate-500">{{ selectedApprovalRequest.requestedAt }}</p>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="selectedApprovalRequest.status === 'pending'" class="grid grid-cols-2 gap-2 pt-1">
              <button
                class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-black text-rose-700 transition hover:bg-rose-100"
                @click="rejectSelectedRequest"
              >
                Reject
              </button>
              <button
                class="rounded-xl bg-emerald-600 px-3 py-2 text-[12px] font-black text-white transition hover:bg-emerald-700"
                @click="approveSelectedRequest"
              >
                Approve
              </button>
            </div>
          </div>
        </article>
      </div>
    </template>

    <template v-else-if="selectedApprovalCategory">
      <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
        <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="selectedApprovalCategoryId = null">
          <Icon name="arrow-left" class="h-5 w-5" />
        </button>
        <h2 class="flex-1 text-center text-[16px] font-black">{{ selectedApprovalCategory.label }}</h2>
        <span class="w-8"></span>
      </header>

      <div class="bg-white px-4 pt-3">
        <label class="flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2.5">
          <Icon name="search" class="h-5 w-5 text-slate-400" />
          <input
            v-model="approvalSearch"
            type="text"
            class="w-full bg-transparent text-[13px] font-semibold text-slate-700 outline-none"
            placeholder="Search..."
          />
        </label>
      </div>

      <div class="bg-white px-4 py-4">
        <div v-if="filteredApprovalByDate.length === 0" class="py-10 text-center">
          <p class="text-[12px] font-semibold text-slate-500">Data approval tidak ditemukan.</p>
        </div>

        <div v-else class="space-y-4">
          <section v-for="group in filteredApprovalByDate" :key="group.date" class="space-y-2">
            <p class="text-[12px] font-semibold text-slate-500">{{ group.date }}</p>

            <button
              v-for="item in group.items"
              :key="item.id"
              class="w-full rounded-2xl border border-slate-200 bg-[#fafafa] px-3 py-3 text-left transition hover:bg-slate-50"
              @click="openApprovalDetail(item)"
            >
              <div class="flex items-start gap-3">
                <img :src="item.avatar" :alt="item.employeeName" class="h-10 w-10 rounded-full object-cover" />
                <div class="min-w-0 flex-1">
                  <p class="truncate text-[13px] font-black text-slate-800">{{ item.employeeName }}</p>
                  <p class="text-[11px] text-slate-600">{{ item.subtitle }}</p>
                  <ul class="mt-1 space-y-0.5 pl-4 text-[11px] text-slate-600">
                    <li class="list-disc">{{ item.rangeLabel }}</li>
                    <li class="list-disc">Reason: {{ item.reason }}</li>
                  </ul>
                  <span
                    class="mt-2 inline-flex rounded-full px-2.5 py-0.5 text-[11px] font-black"
                    :class="
                      item.status === 'approved'
                        ? 'bg-emerald-100 text-emerald-700'
                        : item.status === 'rejected'
                        ? 'bg-rose-100 text-rose-700'
                        : 'bg-amber-100 text-amber-700'
                    "
                  >
                    {{ item.status === "approved" ? "Approved" : item.status === "rejected" ? "Rejected" : "Pending" }}
                  </span>
                </div>
              </div>
            </button>
          </section>
        </div>
      </div>
    </template>

    <template v-else>
      <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
        <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="$emit('navigateHome')">
          <Icon name="arrow-left" class="h-5 w-5" />
        </button>
        <h2 class="flex-1 text-center text-[16px] font-black">Inbox</h2>
        <span class="w-8"></span>
      </header>

      <div class="border-b border-slate-200 bg-white">
        <div class="grid grid-cols-2">
          <button
            class="relative py-3 text-center text-[12px] font-semibold"
            :class="activeInboxTab === 'notifications' ? 'text-[#4f67d9]' : 'text-slate-500'"
            @click="activeInboxTab = 'notifications'"
          >
            Notifications
            <span v-if="activeInboxTab === 'notifications'" class="absolute inset-x-0 bottom-0 h-0.5 bg-[#4f67d9]"></span>
          </button>
          <button
            class="relative py-3 text-center text-[12px] font-semibold"
            :class="activeInboxTab === 'approval' ? 'text-[#4f67d9]' : 'text-slate-500'"
            @click="activeInboxTab = 'approval'"
          >
            Need My Approval
            <span v-if="activeInboxTab === 'approval'" class="absolute inset-x-0 bottom-0 h-0.5 bg-[#4f67d9]"></span>
          </button>
        </div>
      </div>

      <div v-if="activeInboxTab === 'notifications'" class="bg-white">
        <button
          v-for="item in personalNotifications"
          :key="item.id"
          class="flex w-full items-start gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50"
          @click="openNotificationDetail(item)"
        >
          <img :src="item.avatar" :alt="item.sender" class="h-11 w-11 rounded-full object-cover" />
          <div class="min-w-0 flex-1">
            <p class="text-[13px] font-black text-slate-800">{{ item.sender }}</p>
            <p class="truncate text-[12px] text-slate-600">{{ item.message }}</p>
            <p class="mt-0.5 text-[11px] text-slate-500">{{ item.summary }}</p>
          </div>
          <Icon name="chevron-right" class="mt-2 h-5 w-5 text-slate-400" />
        </button>
      </div>

      <div v-else class="bg-white">
        <button
          v-for="category in approvalCategories"
          :key="category.id"
          class="flex w-full items-center gap-3 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50"
          @click="openApprovalCategory(category.id)"
        >
          <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl" :class="category.bgClass">
            <Icon :name="category.icon" class="h-5 w-5" :class="category.iconClass" />
          </span>
          <span class="flex-1 text-[13px] font-semibold text-slate-800">{{ category.label }}</span>
          <Icon name="chevron-right" class="h-5 w-5 text-slate-400" />
        </button>
      </div>
    </template>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Icon } from "@/composables/Icon";

defineEmits<{
  navigateHome: [];
}>();

type InboxRootTab = "notifications" | "approval";

type NotificationItem = {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  summary: string;
  requestType: string;
  requestDate: string;
  reason: string;
  requesterName: string;
  approvedBy: string;
  approvedAt: string;
};

type ApprovalCategory = {
  id: string;
  label: string;
  icon: string;
  bgClass: string;
  iconClass: string;
};

type ApprovalRequestItem = {
  id: number;
  categoryId: string;
  categoryLabel: string;
  title: string;
  employeeName: string;
  avatar: string;
  subtitle: string;
  rangeLabel: string;
  reason: string;
  dateGroup: string;
  requestDate: string;
  requestTimeLabel: string;
  requestedAt: string;
  approvedBy: string;
  approvedAt: string;
  status: "approved" | "pending" | "rejected";
  errorNotes: string;
  shift: string;
  shiftTime: string;
  photo: string;
};
type NotificationDetailItem = {
  id: number;
  sender: string;
  avatar: string;
  message: string;
  summary: string;
  requestType: string;
  requestDate: string;
  reason: string;
  requesterName: string;
  approvedBy: string;
  approvedAt: string;
};

const activeInboxTab = ref<InboxRootTab>("notifications");
const selectedApprovalCategoryId = ref<string | null>(null);
const selectedApprovalRequest = ref<ApprovalRequestItem | null>(null);
const selectedNotificationDetail = ref<NotificationDetailItem | null>(null);
const approvalSearch = ref("");

const personalNotifications = ref<NotificationItem[]>([
  {
    id: 1,
    sender: "Agus Susanto",
    avatar: "https://i.pravatar.cc/120?img=12",
    message: "Your live attendance request on 17 Apr 2026 has been approved.",
    summary: "Live attendance request approved",
    requestType: "Live attendance",
    requestDate: "Fri, 17 Apr 2026",
    reason: "WFH",
    requesterName: "Eka Dian Purnama",
    approvedBy: "Agus Susanto",
    approvedAt: "Fri, 17 Apr 2026, 17:36",
  },
  {
    id: 2,
    sender: "Agus Susanto",
    avatar: "https://i.pravatar.cc/120?img=12",
    message: "Your time off request on 17 Apr 2026 has been approved.",
    summary: "Time Off Request approved",
    requestType: "Time off",
    requestDate: "Fri, 17 Apr 2026",
    reason: "Keperluan keluarga",
    requesterName: "Eka Dian Purnama",
    approvedBy: "Agus Susanto",
    approvedAt: "Fri, 17 Apr 2026, 10:12",
  },
  {
    id: 3,
    sender: "Talenta",
    avatar: "https://i.pravatar.cc/120?img=31",
    message: "Your clock in is submitted",
    summary: "Attendance status updated",
    requestType: "Attendance",
    requestDate: "Thu, 16 Apr 2026",
    reason: "Auto submit",
    requesterName: "Eka Dian Purnama",
    approvedBy: "System",
    approvedAt: "Thu, 16 Apr 2026, 08:01",
  },
  {
    id: 4,
    sender: "Agus Susanto",
    avatar: "https://i.pravatar.cc/120?img=12",
    message: "Your live attendance request on 30 Mar 2026 has been approved.",
    summary: "Live attendance request approved",
    requestType: "Live attendance",
    requestDate: "Mon, 30 Mar 2026",
    reason: "Work from home",
    requesterName: "Eka Dian Purnama",
    approvedBy: "Agus Susanto",
    approvedAt: "Mon, 30 Mar 2026, 17:20",
  },
]);

const approvalCategories = ref<ApprovalCategory[]>([
  { id: "reimbursement", label: "Reimbursement", icon: "clipboard", bgClass: "bg-cyan-50", iconClass: "text-cyan-600" },
  { id: "time-off", label: "Time off", icon: "clock", bgClass: "bg-blue-50", iconClass: "text-blue-600" },
  { id: "attendance", label: "Attendance", icon: "map-pin", bgClass: "bg-amber-50", iconClass: "text-amber-500" },
  { id: "overtime", label: "Overtime", icon: "clock", bgClass: "bg-orange-50", iconClass: "text-orange-500" },
  { id: "shift-change", label: "Shift change", icon: "calendar-days", bgClass: "bg-sky-50", iconClass: "text-sky-500" },
  { id: "change-data", label: "Change data", icon: "user", bgClass: "bg-violet-50", iconClass: "text-violet-500" },
  { id: "forms", label: "Forms", icon: "fileText", bgClass: "bg-purple-50", iconClass: "text-purple-500" },
  { id: "goals", label: "Goals", icon: "target", bgClass: "bg-rose-50", iconClass: "text-rose-500" },
  { id: "timesheet", label: "Timesheet", icon: "clipboardClock", bgClass: "bg-indigo-50", iconClass: "text-indigo-500" },
  { id: "task", label: "Task", icon: "check", bgClass: "bg-emerald-50", iconClass: "text-emerald-600" },
  { id: "add-employee", label: "Add employee", icon: "users", bgClass: "bg-yellow-50", iconClass: "text-yellow-500" },
  { id: "employee-transfer", label: "Employee transfer", icon: "send", bgClass: "bg-orange-50", iconClass: "text-orange-500" },
]);

const approvalRequests = ref<ApprovalRequestItem[]>([
  {
    id: 101,
    categoryId: "attendance",
    categoryLabel: "Live attendance",
    title: "Live attendance request",
    employeeName: "Mukhamad Eko Arifudin",
    avatar: "https://i.pravatar.cc/120?img=25",
    subtitle: "Live attendance request for Clock out",
    rangeLabel: "Fri, 17 Apr 2026 (clock out)",
    reason: "WFH",
    dateGroup: "17 Apr 2026",
    requestDate: "Fri, 17 Apr 2026",
    requestTimeLabel: "Clock out: 17:16",
    requestedAt: "17 Apr 2026 at 05:16 PM",
    approvedBy: "Eka Dian Purnama",
    approvedAt: "Fri, 17 Apr 2026, 17:36",
    status: "approved",
    errorNotes: "The location does not match the location setting",
    shift: "Office",
    shiftTime: "08:00 - 17:00",
    photo: "https://i.pravatar.cc/420?img=60",
  },
  {
    id: 102,
    categoryId: "time-off",
    categoryLabel: "Time off",
    title: "Time off",
    employeeName: "Mukhamad Eko Arifudin",
    avatar: "https://i.pravatar.cc/120?img=25",
    subtitle: "Time off request for Working From Home",
    rangeLabel: "Wed, 01 Apr 2026 to Thu, 02 Apr 2026 (2 days)",
    reason: "WFH",
    dateGroup: "01 Apr 2026",
    requestDate: "Wed, 01 Apr 2026",
    requestTimeLabel: "Duration: 2 days",
    requestedAt: "01 Apr 2026 at 09:20 AM",
    approvedBy: "Eka Dian Purnama",
    approvedAt: "Wed, 01 Apr 2026, 10:12",
    status: "approved",
    errorNotes: "No error",
    shift: "Flexible",
    shiftTime: "09:00 - 17:00",
    photo: "https://i.pravatar.cc/420?img=61",
  },
  {
    id: 103,
    categoryId: "time-off",
    categoryLabel: "Time off",
    title: "Time off",
    employeeName: "Mukhamad Eko Arifudin",
    avatar: "https://i.pravatar.cc/120?img=25",
    subtitle: "Time off request for Izin Masuk Kerja Setengah Hari",
    rangeLabel: "Fri, 30 Jan 2026 (0.5 day)",
    reason: "Acara Keluarga",
    dateGroup: "30 Jan 2026",
    requestDate: "Fri, 30 Jan 2026",
    requestTimeLabel: "Duration: 0.5 day",
    requestedAt: "30 Jan 2026 at 08:10 AM",
    approvedBy: "Eka Dian Purnama",
    approvedAt: "Fri, 30 Jan 2026, 08:45",
    status: "approved",
    errorNotes: "No error",
    shift: "Office",
    shiftTime: "08:00 - 17:00",
    photo: "https://i.pravatar.cc/420?img=62",
  },
  {
    id: 104,
    categoryId: "attendance",
    categoryLabel: "Attendance",
    title: "Attendance request",
    employeeName: "Mukhamad Eko Arifudin",
    avatar: "https://i.pravatar.cc/120?img=25",
    subtitle: "Live attendance request for Clock in",
    rangeLabel: "Thu, 16 Apr 2026 (clock in)",
    reason: "Terlambat scan device kantor",
    dateGroup: "16 Apr 2026",
    requestDate: "Thu, 16 Apr 2026",
    requestTimeLabel: "Clock in: 08:24",
    requestedAt: "16 Apr 2026 at 08:24 AM",
    approvedBy: "Eka Dian Purnama",
    approvedAt: "-",
    status: "pending",
    errorNotes: "Waiting for manager decision",
    shift: "Office",
    shiftTime: "08:00 - 17:00",
    photo: "https://i.pravatar.cc/420?img=63",
  },
]);

const selectedApprovalCategory = computed(() =>
  approvalCategories.value.find((item) => item.id === selectedApprovalCategoryId.value) ?? null
);

const filteredApprovalByDate = computed(() => {
  if (!selectedApprovalCategoryId.value) return [];

  const query = approvalSearch.value.trim().toLowerCase();
  const rows = approvalRequests.value.filter((item) => {
    if (item.categoryId !== selectedApprovalCategoryId.value) return false;
    if (!query) return true;
    return `${item.employeeName} ${item.subtitle} ${item.reason}`.toLowerCase().includes(query);
  });

  const grouped = new Map<string, ApprovalRequestItem[]>();
  for (const row of rows) {
    if (!grouped.has(row.dateGroup)) grouped.set(row.dateGroup, []);
    grouped.get(row.dateGroup)?.push(row);
  }

  return [...grouped.entries()].map(([date, items]) => ({ date, items }));
});

function openApprovalCategory(categoryId: string): void {
  selectedNotificationDetail.value = null;
  selectedApprovalCategoryId.value = categoryId;
  approvalSearch.value = "";
}

function openApprovalDetail(item: ApprovalRequestItem): void {
  selectedNotificationDetail.value = null;
  selectedApprovalRequest.value = item;
}

function openNotificationDetail(item: NotificationItem): void {
  selectedNotificationDetail.value = {
    id: item.id,
    sender: item.sender,
    avatar: item.avatar,
    message: item.message,
    summary: item.summary,
    requestType: item.requestType,
    requestDate: item.requestDate,
    reason: item.reason,
    requesterName: item.requesterName,
    approvedBy: item.approvedBy,
    approvedAt: item.approvedAt,
  };
}

function approveSelectedRequest(): void {
  if (!selectedApprovalRequest.value || selectedApprovalRequest.value.status !== "pending") return;
  selectedApprovalRequest.value.status = "approved";
  selectedApprovalRequest.value.approvedAt = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function rejectSelectedRequest(): void {
  if (!selectedApprovalRequest.value || selectedApprovalRequest.value.status !== "pending") return;
  selectedApprovalRequest.value.status = "rejected";
  selectedApprovalRequest.value.approvedAt = new Date().toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
</script>
