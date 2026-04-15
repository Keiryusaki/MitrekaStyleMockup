<script setup lang="ts">
import { computed, ref } from "vue";
import { Card, Input, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { employeeDirectory } from "@/data/hrisAdmin/employeeDirectory";
import EmployeeOrgChart from "@/pages/HRISAdmin/components/EmployeeOrgChart.vue";
import type { EmployeeOrgChartRow } from "@/pages/HRISAdmin/components/EmployeeOrgChart/types";

const search = ref("");
const selectedDepartment = ref("all");

const toEmail = (name: string) =>
  `${name.toLowerCase().replace(/[^a-z\\s]/g, "").trim().replace(/\\s+/g, ".")}@mitreka.id`;

const managers = ["Toni Widodo", "Supriyatna", "Raka Mahendra", "Kezia Valencia", "Yoga Kurniawan"];
const departmentManagers: Record<string, string> = {
  "Executive Office": "Toni Widodo",
  "Human Resources": "Supriyatna",
  "People & Culture": "Supriyatna",
  "HR Technology": "Raka Mahendra",
  "Compensation & Benefit": "Yoga Kurniawan",
  "Learning & Development": "Supriyatna",
  "Talent Acquisition": "Kezia Valencia",
  "General Affairs": "Supriyatna",
};

const deriveManager = (department: string, id: number) => departmentManagers[department] ?? managers[id % managers.length];

const allRows = computed<EmployeeOrgChartRow[]>(() =>
  employeeDirectory.map((item) => ({
    id: item.id,
    employeeCode: item.employeeCode,
    name: item.name,
    title: item.title,
    department: item.department,
    workType: item.workType,
    location: item.location,
    status: item.status,
    email: toEmail(item.name),
    manager: deriveManager(item.department, item.id),
  })),
);

const departmentOptions = computed(() => [
  { value: "all", label: "Semua departemen" },
  ...Array.from(new Set(allRows.value.map((item) => item.department)))
    .sort()
    .map((department) => ({ value: department, label: department })),
]);

const visibleRows = computed(() => {
  const keyword = search.value.trim().toLowerCase();
  return allRows.value.filter((row) => {
    const matchDepartment = selectedDepartment.value === "all" || row.department === selectedDepartment.value;
    if (!matchDepartment) return false;
    if (!keyword) return true;
    return [row.name, row.employeeCode, row.title, row.department, row.manager, row.location]
      .join(" ")
      .toLowerCase()
      .includes(keyword);
  });
});

const departmentCount = computed(() => new Set(allRows.value.map((item) => item.department)).size);

const handleOpenDetail = (_row: EmployeeOrgChartRow) => {};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup"
      title="Approval"
      description="Kelola dan tinjau jalur approval karyawan terpisah dari struktur data karyawan."
    />

    <Card padding="p-4" class="space-y-4">
      <div class="grid gap-3 md:grid-cols-[240px_minmax(0,1fr)]">
        <SelectDropdown
          v-model="selectedDepartment"
          :options="departmentOptions"
          size="sm"
          variant="outline"
          color="default"
        />
        <Input
          v-model="search"
          size="sm"
          placeholder="Search name/employee code..."
          class="w-full"
          prefix-icon="search"
          clearable
        />
      </div>
    </Card>

    <EmployeeOrgChart
      :all-rows="allRows"
      :visible-rows="visibleRows"
      :department-count="departmentCount"
      @open-detail="handleOpenDetail"
    />
  </div>
</template>

