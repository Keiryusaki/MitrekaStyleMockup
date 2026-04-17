<template>
  <section class="-mx-3 min-h-full bg-white pb-24">
    <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
      <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="$emit('navigateHome')">
        <Icon name="arrow-left" class="h-5 w-5" />
      </button>
      <h2 class="flex-1 text-center text-[16px] font-black">Karyawan</h2>
      <span class="w-8"></span>
    </header>

    <div class="space-y-3 px-3 pt-3">
      <article class="rounded-2xl border border-[#004b8d]/10 bg-white p-3 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
      <h3 class="text-[13px] font-black text-slate-800">Siapa yang Libur Hari Ini</h3>
      <div class="employee-off-scroll mt-2 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
        <button
          v-for="emp in offTodayEmployees"
          :key="`off-${emp.id}`"
          class="min-w-[88px] rounded-2xl border border-slate-200 bg-white px-2 py-2 text-center"
          @click="openTimeOffDetail(emp)"
        >
          <div class="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#004b8d]/12 text-[11px] font-black text-[#004b8d]">
            {{ emp.initials }}
          </div>
          <p class="mt-1.5 truncate text-[10px] font-black text-slate-700">{{ emp.name }}</p>
        </button>
      </div>
      </article>

      <article class="rounded-2xl border border-[#004b8d]/10 bg-white p-3 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
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

      <div class="mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div v-if="filteredEmployees.length === 0" class="px-3 py-10 text-center">
          <p class="text-[12px] font-semibold text-slate-500">Karyawan tidak ditemukan.</p>
        </div>
        <div v-else class="divide-y divide-slate-200">
          <button
            v-for="emp in filteredEmployees"
            :key="emp.id"
            class="flex w-full items-center justify-between gap-3 px-3 py-2.5 text-left transition hover:bg-slate-50"
            @click="openEmployeeDetail(emp)"
          >
            <div class="flex min-w-0 items-center gap-3">
              <div class="flex h-10 w-10 items-center justify-center rounded-full bg-[#004b8d]/12 text-[11px] font-black text-[#004b8d]">
                {{ emp.initials }}
              </div>
              <div class="min-w-0">
                <p class="truncate text-[12px] font-black text-slate-800">{{ emp.name }}</p>
                <p class="mt-0.5 truncate text-[11px] font-bold text-slate-500">{{ emp.role }}</p>
              </div>
            </div>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
      </article>
    </div>
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
  navigateHome: [];
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

<style scoped>
.employee-off-scroll {
  scrollbar-width: none;
}

.employee-off-scroll::-webkit-scrollbar {
  display: none;
}
</style>
