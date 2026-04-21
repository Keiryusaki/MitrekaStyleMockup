<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { Button, Card, PageHeader } from "@/lib/mitreka-ui-dist/vue";
import { employeeTimeOffRequests } from "@/data/hrisEmployee/timeOff";

const router = useRouter();

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

const sortedRequests = computed(() =>
  [...employeeTimeOffRequests].sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1)),
);

const openDetail = (requestId: string) => {
  router.push(`/mockup-hris-employee/time-off/detail/${requestId}`);
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Employee"
      title="Riwayat Pengajuan"
      description="Daftar seluruh request cuti/izin employee beserta status approval terbaru."
    />

    <Card padding="p-4">
      <div class="overflow-x-auto">
        <table class="table table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Jenis</th>
              <th>Durasi</th>
              <th>Submit</th>
              <th>Status</th>
              <th class="text-right">Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in sortedRequests" :key="item.id">
              <td class="font-medium">{{ item.id }}</td>
              <td>{{ item.requestType }}</td>
              <td>{{ item.durationLabel }}</td>
              <td>{{ item.submittedAt }}</td>
              <td>
                <span class="inline-flex rounded-full px-2 py-1 text-xs font-medium" :class="statusClassMap[item.status]">
                  {{ statusLabelMap[item.status] }}
                </span>
              </td>
              <td class="text-right">
                <Button size="xs" variant="ghost" color="default" @click="openDetail(item.id)">Lihat detail</Button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Card>
  </div>
</template>
