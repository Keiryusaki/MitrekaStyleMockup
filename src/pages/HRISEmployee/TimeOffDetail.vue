<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { Button, Card, PageHeader } from "@/lib/mitreka-ui-dist/vue";
import {
  employeeTimeOffRequests,
  getEmployeeRequestById,
  getEmployeeTimeOffTimeline,
} from "@/data/hrisEmployee/timeOff";

const route = useRoute();
const router = useRouter();

const requestId = computed(() => {
  const idFromRoute = route.params.requestId;
  if (typeof idFromRoute === "string" && idFromRoute.trim()) return idFromRoute;
  return employeeTimeOffRequests[0]?.id ?? "";
});

const requestDetail = computed(() => getEmployeeRequestById(requestId.value));
const timeline = computed(() => getEmployeeTimeOffTimeline(requestId.value));

const statusLabelMap = {
  awaiting_approval: "Menunggu",
  approved: "Disetujui",
  rejected: "Ditolak",
} as const;

const statusClassMap = {
  awaiting_approval: "bg-warning/15 text-warning",
  approved: "bg-success/15 text-success",
  rejected: "bg-error/15 text-error",
} as const;

const goHistory = () => {
  router.push("/mockup-hris-employee/time-off/history");
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Employee"
      title="Detail Pengajuan"
      description="Detail request cuti/izin, termasuk timeline approval dan catatan dari atasan."
    />

    <Card v-if="requestDetail" padding="p-4" class="space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div class="text-lg font-semibold">{{ requestDetail.id }}</div>
          <div class="text-sm text-base-content/65">{{ requestDetail.requestType }}</div>
        </div>
        <span class="inline-flex rounded-full px-2 py-1 text-xs font-medium" :class="statusClassMap[requestDetail.status]">
          {{ statusLabelMap[requestDetail.status] }}
        </span>
      </div>

      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-xl border border-base-300 bg-base-50 p-3 text-sm">
          <div class="text-base-content/60">Periode</div>
          <div class="font-medium">{{ requestDetail.startDate }} - {{ requestDetail.endDate }}</div>
        </div>
        <div class="rounded-xl border border-base-300 bg-base-50 p-3 text-sm">
          <div class="text-base-content/60">Durasi</div>
          <div class="font-medium">{{ requestDetail.durationLabel }}</div>
        </div>
        <div class="rounded-xl border border-base-300 bg-base-50 p-3 text-sm md:col-span-2">
          <div class="text-base-content/60">Alasan</div>
          <div class="font-medium">{{ requestDetail.reason }}</div>
        </div>
        <div class="rounded-xl border border-base-300 bg-base-50 p-3 text-sm md:col-span-2">
          <div class="text-base-content/60">Catatan approver</div>
          <div class="font-medium">{{ requestDetail.approverNote || "Belum ada catatan." }}</div>
        </div>
      </div>
    </Card>

    <Card padding="p-4" class="space-y-3">
      <div class="text-base font-semibold">Timeline approval</div>
      <div class="space-y-3">
        <div v-for="item in timeline" :key="item.key" class="rounded-xl border border-base-300 bg-base-50 p-3 text-sm">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <div class="font-semibold">{{ item.label }}</div>
            <div class="text-xs text-base-content/60">{{ item.at }}</div>
          </div>
          <div class="mt-1 text-base-content/70">{{ item.actor }}</div>
          <div class="mt-2">{{ item.note }}</div>
        </div>
      </div>
      <div class="flex justify-end">
        <Button variant="ghost" color="default" @click="goHistory">Kembali ke riwayat</Button>
      </div>
    </Card>
  </div>
</template>
