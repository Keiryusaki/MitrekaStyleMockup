<template>
  <transition name="employee-slide">
    <div v-if="show" class="absolute inset-0 z-50 flex flex-col bg-slate-50">
      <div class="flex-1 overflow-y-auto px-6 pb-24 pt-5">
        <div class="mb-4 flex items-center justify-between gap-3">
          <h3 class="text-lg font-bold text-slate-800">Log Kehadiran</h3>
          <div :ref="monthDropdownRef" class="relative">
            <button
              class="inline-flex min-w-[142px] items-center justify-between gap-2 rounded-xl border border-[#004b8d]/18 bg-white/95 px-3 py-2 text-[12px] font-black text-[#004b8d] shadow-[0_8px_20px_-14px_rgba(0,75,141,0.45)] transition hover:border-[#004b8d]/30 hover:bg-white"
              @click="$emit('toggleMonthDropdown')"
            >
              <span>{{ selectedMonthLabel }}</span>
              <Icon name="chevron-down" class="h-4 w-4 text-[#004b8d]/70 transition" :class="monthDropdownOpen ? 'rotate-180' : ''" />
            </button>

            <div
              v-if="monthDropdownOpen"
              class="absolute right-0 top-[calc(100%+8px)] z-40 min-w-[190px] overflow-hidden rounded-2xl border border-[#004b8d]/15 bg-white/95 p-1.5 shadow-[0_20px_36px_-20px_rgba(0,75,141,0.5)] backdrop-blur-sm"
            >
              <button
                v-for="opt in monthOptions"
                :key="opt.value"
                class="flex w-full items-center rounded-xl px-3 py-2 text-left text-[12px] font-bold transition"
                :class="selectedMonth === opt.value ? 'bg-[#004b8d] text-white shadow-[0_8px_18px_-12px_rgba(0,75,141,0.7)]' : 'text-slate-600 hover:bg-[#004b8d]/7 hover:text-[#004b8d]'"
                @click="$emit('selectMonth', opt.value)"
              >
                {{ opt.label }}
              </button>
            </div>
          </div>
        </div>

        <div v-for="month in filteredMonthlyLogs" :key="month.monthKey" class="space-y-2">
          <h4 class="px-1 text-xs font-black uppercase tracking-wider text-slate-500">{{ month.monthLabel }}</h4>
          <article
            v-for="item in month.items"
            :key="item.id"
            class="rounded-xl border border-[#004b8d]/12 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(0,75,141,0.10)]"
          >
            <button class="flex w-full items-center justify-between gap-3 text-left" @click="$emit('openLogDetail', item)">
              <div class="min-w-0 flex-1">
                <p class="truncate text-[12px] font-black text-[#004b8d]">{{ formatListDate(item.dateKey) }}</p>
                <p class="mt-0.5 truncate text-[11px] font-bold text-slate-700">
                  {{ item.firstIn }} - {{ item.lastOut }} <span class="text-slate-400">| {{ item.totalWork }}</span>
                </p>
                <p class="mt-1 truncate text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  {{ sessionMetaSummary(item) }}
                </p>
              </div>
              <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
            </button>
          </article>
        </div>
      </div>

      <div class="border-t border-slate-200 bg-white px-4 py-3">
        <button class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004b8d] py-2.5 text-sm font-black text-white" @click="$emit('close')">
          <Icon name="chevron-left" class="h-4 w-4" />
          <span>Kembali</span>
        </button>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import type { Ref } from "vue";
import { Icon } from "@/composables/Icon";

type LogItem = {
  id: number;
  dateKey: string;
  firstIn: string;
  lastOut: string;
  totalWork: string;
};

type LogMonth = {
  monthKey: string;
  monthLabel: string;
  items: LogItem[];
};

defineProps<{
  show: boolean;
  monthDropdownRef: Ref<HTMLElement | null>;
  monthDropdownOpen: boolean;
  selectedMonthLabel: string;
  monthOptions: { value: string; label: string }[];
  selectedMonth: string;
  filteredMonthlyLogs: LogMonth[];
  formatListDate: (dateKey: string) => string;
  sessionMetaSummary: (item: LogItem) => string;
}>();

defineEmits<{
  close: [];
  toggleMonthDropdown: [];
  selectMonth: [value: string];
  openLogDetail: [item: LogItem];
}>();
</script>
