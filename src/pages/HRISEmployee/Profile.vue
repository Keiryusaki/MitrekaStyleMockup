<script setup lang="ts">
import { computed } from "vue";
import { Card, PageHeader } from "@/lib/mitreka-ui-dist/vue";
import { employeeProfile } from "@/data/hrisEmployee/timeOff";

const profileItems = computed(() => [
  { label: "Employee ID", value: employeeProfile.employeeId },
  { label: "Nama", value: employeeProfile.name },
  { label: "Posisi", value: employeeProfile.title },
  { label: "Departemen", value: employeeProfile.department },
  { label: "Lokasi", value: employeeProfile.location },
  { label: "Atasan langsung", value: employeeProfile.managerName },
  { label: "Work type", value: employeeProfile.workType },
]);
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Employee"
      title="Profil Karyawan"
      description="Informasi profil dasar employee dan ringkasan saldo cuti yang aktif."
    />

    <Card padding="p-4" class="space-y-4">
      <div class="grid gap-3 md:grid-cols-2">
        <div v-for="item in profileItems" :key="item.label" class="rounded-xl border border-base-300 bg-base-50 p-3">
          <div class="text-xs text-base-content/60">{{ item.label }}</div>
          <div class="mt-1 font-semibold">{{ item.value }}</div>
        </div>
      </div>
    </Card>

    <Card padding="p-4">
      <div class="grid gap-3 md:grid-cols-2">
        <div class="rounded-xl border border-primary/20 bg-primary/10 p-3">
          <div class="text-sm text-base-content/70">Sisa Cuti Tahunan</div>
          <div class="mt-1 text-2xl font-semibold text-primary">{{ employeeProfile.annualLeaveBalance }} hari</div>
        </div>
        <div class="rounded-xl border border-warning/30 bg-warning/10 p-3">
          <div class="text-sm text-base-content/70">Sisa Izin Sakit</div>
          <div class="mt-1 text-2xl font-semibold text-warning">{{ employeeProfile.sickLeaveBalance }} hari</div>
        </div>
      </div>
    </Card>
  </div>
</template>
