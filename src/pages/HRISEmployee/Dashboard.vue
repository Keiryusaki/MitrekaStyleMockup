<script setup lang="ts">
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { Button, Card, PageHeader } from "@/lib/mitreka-ui-dist/vue";
import {
  employeeAnnouncements,
  employeeProfile,
  employeeTimeOffRequests,
  employeeWhoIsOff,
} from "@/data/hrisEmployee/timeOff";
import { timeOffRequests } from "@/data/hrisAdmin/timeOff";

type OffTab = "today" | "this_week";

const router = useRouter();
const activeOffTab = ref<OffTab>("today");

// Keep a fixed mockup date so UI remains stable during review/demo.
const dashboardDate = new Date("2026-04-21T00:00:00");

const greetingDate = computed(() =>
  new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dashboardDate),
);

const summaryCards = computed(() => [
  { label: "Sisa cuti tahunan", value: `${employeeProfile.annualLeaveBalance} hari`, tone: "text-primary" },
  { label: "Sisa izin sakit", value: `${employeeProfile.sickLeaveBalance} hari`, tone: "text-warning" },
  {
    label: "Request menunggu approval",
    value: employeeTimeOffRequests.filter((item) => item.status === "awaiting_approval").length,
    tone: "text-info",
  },
]);
const approvalPendingCount = computed(
  () => timeOffRequests.filter((item) => item.status === "awaiting_approval").length,
);

const statusLabelMap = {
  awaiting_approval: "Menunggu",
  approved: "Disetujui",
} as const;

const statusClassMap = {
  awaiting_approval: "bg-warning/15 text-warning",
  approved: "bg-success/15 text-success",
} as const;

const weekdayIndex = (date: Date) => {
  const day = date.getDay();
  return day === 0 ? 7 : day;
};

const startOfWeek = computed(() => {
  const value = new Date(dashboardDate);
  value.setDate(value.getDate() - (weekdayIndex(value) - 1));
  value.setHours(0, 0, 0, 0);
  return value;
});

const endOfWeek = computed(() => {
  const value = new Date(startOfWeek.value);
  value.setDate(value.getDate() + 6);
  value.setHours(23, 59, 59, 999);
  return value;
});

const toDate = (value: string) => new Date(`${value}T00:00:00`);

const isOffToday = (startDate: string, endDate: string) => {
  const start = toDate(startDate);
  const end = toDate(endDate);
  return dashboardDate >= start && dashboardDate <= end;
};

const isOffThisWeek = (startDate: string, endDate: string) => {
  const start = toDate(startDate);
  const end = toDate(endDate);
  return start <= endOfWeek.value && end >= startOfWeek.value;
};

const whoIsOffList = computed(() =>
  employeeWhoIsOff.filter((item) =>
    activeOffTab.value === "today"
      ? isOffToday(item.startDate, item.endDate)
      : isOffThisWeek(item.startDate, item.endDate),
  ),
);

const openRequestPage = () => router.push("/mockup-hris-employee/time-off/request");
const openApprovalRequestPage = () =>
  router.push({ path: "/mockup-hris-employee/time-off/request", query: { tab: "approval" } });

const initialsOf = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Employee"
      title="Home Employee"
      description="Ringkasan cepat employee self service untuk greeting, post update, saldo cuti, dan daftar who's off."
    />

    <Card padding="p-4" class="space-y-4">
      <div class="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div class="text-sm text-base-content/70">Halo, {{ employeeProfile.name }}</div>
          <div class="text-xl font-semibold">{{ employeeProfile.title }} - {{ employeeProfile.department }}</div>
          <div class="text-sm text-base-content/65">{{ greetingDate }}</div>
        </div>
        <div class="flex flex-wrap gap-2">
          <Button size="sm" color="primary" @click="openRequestPage">Ajukan Cuti/Izin</Button>
        </div>
      </div>
      <div class="grid gap-3 md:grid-cols-3">
        <div
          v-for="item in summaryCards"
          :key="item.label"
          class="rounded-xl border border-base-300 bg-base-50 p-4"
        >
          <div class="text-sm text-base-content/65">{{ item.label }}</div>
          <div class="mt-2 text-2xl font-semibold" :class="item.tone">{{ item.value }}</div>
        </div>
      </div>

      <div
        v-if="approvalPendingCount > 0"
        class="rounded-xl border border-warning/30 bg-warning/10 p-3"
      >
        <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div class="text-sm text-base-content/85">
            Ada
            <span class="font-semibold text-warning">{{ approvalPendingCount }}</span>
            permohonan yang butuh persetujuan kamu.
          </div>
          <Button size="sm" variant="outline" color="warning" @click="openApprovalRequestPage">
            Cek Permohonan
          </Button>
        </div>
      </div>
    </Card>

    <div class="grid gap-4 xl:grid-cols-[minmax(0,1fr)_420px]">
      <Card padding="p-4" class="space-y-3">
        <div>
          <div class="text-base font-semibold">Pengumuman</div>
          <div class="text-sm text-base-content/65">Update internal gaya post, tanpa perlu buka halaman detail.</div>
        </div>
        <div class="space-y-3">
          <article
            v-for="item in employeeAnnouncements"
            :key="item.id"
            class="rounded-2xl border border-base-300 bg-base-50 p-4"
          >
            <div class="flex items-start gap-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {{ initialsOf(item.author) }}
              </div>
              <div class="min-w-0 flex-1">
                <div class="flex flex-wrap items-center justify-between gap-2">
                  <div class="min-w-0">
                    <div class="truncate text-sm font-semibold">{{ item.author }}</div>
                    <div class="text-xs text-base-content/60">{{ item.channel }}</div>
                  </div>
                  <span class="text-xs text-base-content/60">{{ item.publishedAt }}</span>
                </div>
                <div class="mt-3 text-sm font-semibold">{{ item.title }}</div>
                <p class="mt-1 text-sm text-base-content/80">{{ item.message }}</p>
              </div>
            </div>
          </article>
        </div>
      </Card>

      <Card padding="p-4" class="space-y-3">
        <div>
          <div class="text-base font-semibold">Who&apos;s Off</div>
          <div class="text-sm text-base-content/65">List karyawan yang sedang off.</div>
        </div>

        <div class="tabs tabs-pills flex-wrap">
          <button
            type="button"
            class="tab h-auto min-h-[unset] min-w-[140px] justify-start px-4 py-2"
            :class="{ 'tab-active': activeOffTab === 'today' }"
            @click="activeOffTab = 'today'"
          >
            <div class="text-left">
              <div class="font-semibold">Today</div>
            </div>
          </button>
          <button
            type="button"
            class="tab h-auto min-h-[unset] min-w-[140px] justify-start px-4 py-2"
            :class="{ 'tab-active': activeOffTab === 'this_week' }"
            @click="activeOffTab = 'this_week'"
          >
            <div class="text-left">
              <div class="font-semibold">This Week</div>
            </div>
          </button>
        </div>

        <div v-if="whoIsOffList.length" class="space-y-2">
          <div
            v-for="item in whoIsOffList"
            :key="item.id"
            class="rounded-xl border border-base-300 bg-base-50 p-3"
          >
            <div class="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div class="font-semibold">{{ item.name }}</div>
                <div class="text-xs text-base-content/65">{{ item.title }}</div>
              </div>
              <span class="inline-flex rounded-full px-2 py-1 text-xs font-medium" :class="statusClassMap[item.status]">
                {{ statusLabelMap[item.status] }}
              </span>
            </div>
            <div class="mt-2 text-sm text-base-content/75">
              {{ item.leaveType }} - {{ item.startDate }} s/d {{ item.endDate }}
            </div>
          </div>
        </div>
        <div
          v-else
          class="rounded-xl border border-dashed border-base-300 p-6 text-center text-sm text-base-content/60"
        >
          Tidak ada karyawan off untuk periode ini.
        </div>
      </Card>
    </div>
  </div>
</template>
