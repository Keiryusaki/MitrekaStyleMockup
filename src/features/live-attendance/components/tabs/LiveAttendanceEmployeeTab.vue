<template>
  <section class="space-y-4 pb-24">
    <div>
      <h3 class="text-[13px] font-black text-slate-800">Siapa yang Libur Hari Ini</h3>
      <div class="mt-3 -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
        <div
          v-for="emp in offTodayEmployees"
          :key="`off-${emp.id}`"
          class="min-w-[96px] rounded-2xl border border-slate-200 bg-white p-2 text-center shadow-[0_8px_18px_-14px_rgba(0,75,141,0.28)]"
        >
          <button class="w-full" @click="openTimeOffDetail(emp)">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#004b8d]/12 text-xs font-black text-[#004b8d]">
              {{ emp.initials }}
            </div>
            <p class="mt-2 truncate text-[10px] font-black text-slate-700">{{ emp.name }}</p>
          </button>
        </div>
      </div>
    </div>

    <article class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
      <div class="grid grid-cols-[1fr_auto] gap-2">
        <label class="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
          <Icon name="search" class="h-4 w-4 text-slate-400" />
          <input
            :value="employeeSearch"
            type="text"
            placeholder="Cari karyawan..."
            class="w-full bg-transparent text-[12px] font-semibold text-slate-700 outline-none placeholder:text-slate-400"
            @input="onSearchInput"
          />
        </label>
        <button
          class="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-black text-slate-600"
          @click="$emit('openFilter')"
        >
          <span>Filter</span>
          <Icon name="chevron-down" class="h-4 w-4" />
        </button>
      </div>
      <p class="mt-2 text-[10px] font-bold text-slate-500">Status: {{ employeeFilterLabel }} | Jabatan: {{ employeeRoleFilterLabel }}</p>
    </article>

    <section class="space-y-2">
      <article
        v-for="emp in filteredEmployees"
        :key="emp.id"
        class="rounded-2xl border border-[#004b8d]/12 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(0,75,141,0.10)]"
      >
        <button class="flex w-full items-center justify-between gap-3 text-left" @click="openEmployeeDetail(emp)">
          <div class="flex min-w-0 items-center gap-3">
            <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#004b8d]/12 text-xs font-black text-[#004b8d]">
              {{ emp.initials }}
            </div>
            <div class="min-w-0">
              <p class="truncate text-[12px] font-black text-slate-800">{{ emp.name }}</p>
              <p class="mt-0.5 truncate text-[11px] font-bold text-slate-500">{{ emp.role }}</p>
            </div>
          </div>
          <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
        </button>
      </article>
    </section>

  </section>
</template>

<script setup lang="ts">
import { Icon } from "@/composables/Icon";

type EmployeeCard = {
  id: number;
  name: string;
  role: string;
  initials: string;
  phone: string;
  whatsapp: string;
  email: string;
  workArrangement: "onsite" | "remote" | "freelance";
  employmentType: "kontrak" | "tetap";
  timeOff?: {
    reason: string;
    dateLabel: string;
    status: "pending" | "approved";
  };
};

const props = defineProps<{
  offTodayEmployees: EmployeeCard[];
  employeeSearch: string;
  employeeFilterLabel: string;
  employeeRoleFilterLabel: string;
  filteredEmployees: EmployeeCard[];
}>();

const emit = defineEmits<{
  "update:employeeSearch": [value: string];
  openFilter: [];
  openTimeOffDetail: [employee: EmployeeCard];
  openEmployeeDetail: [employee: EmployeeCard];
}>();

function onSearchInput(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  emit("update:employeeSearch", target?.value ?? "");
}

function openTimeOffDetail(emp: EmployeeCard): void {
  emit("openTimeOffDetail", emp);
}

function openEmployeeDetail(emp: EmployeeCard): void {
  emit("openEmployeeDetail", emp);
}
</script>
