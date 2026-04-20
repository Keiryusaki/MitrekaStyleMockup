<template>
  <transition name="employee-slide">
    <div v-if="show" class="absolute inset-0 z-50 flex flex-col bg-slate-50">
      <div class="flex-1 overflow-y-auto px-3 pb-24 pt-5">
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

        <div v-if="!filteredMonthlyLogs.some((month) => month.items.length > 0)" class="rounded-2xl border border-dashed border-slate-300 bg-white px-4 py-8 text-center">
          <p class="text-[12px] font-semibold text-slate-500">Belum ada riwayat untuk filter bulan ini.</p>
        </div>

        <div
          v-for="(month, monthIndex) in filteredMonthlyLogs"
          :key="month.monthKey"
          :class="monthIndex === 0 ? 'space-y-2' : 'mt-4 space-y-2'"
        >
          <template v-if="month.items.length > 0">
            <h4 class="px-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">{{ month.monthLabel }}</h4>
            <article class="overflow-hidden rounded-2xl border border-[#004b8d]/10 bg-white shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
              <button
                v-for="item in month.items"
                :key="item.id"
                class="log-row-btn"
                @click="$emit('openLogDetail', item)"
              >
                <span class="log-row-icon">
                  <Icon name="calendar-days" class="h-4 w-4" />
                </span>

                <span class="min-w-0 flex-1">
                  <span class="block truncate text-[12px] font-black text-[#004b8d]">{{ formatListDate(item.dateKey) }}</span>
                  <span class="mt-1 flex flex-wrap items-center gap-1.5">
                    <span class="log-meta-chip">{{ item.firstIn }} - {{ item.lastOut }}</span>
                    <span class="log-meta-chip">{{ item.totalWork }}</span>
                    <span class="log-meta-chip">{{ sessionMetaSummary(item) }}</span>
                  </span>
                </span>

                <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
              </button>
            </article>
          </template>
        </div>
      </div>

      <div class="border-t border-slate-200 bg-white px-3 py-3">
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

<style scoped>
.log-row-btn {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.7rem;
  border-bottom: 1px solid rgb(241 245 249);
  padding: 0.72rem 0.86rem;
  text-align: left;
  transition: background-color 0.15s ease;
}

.log-row-btn:last-child {
  border-bottom: 0;
}

.log-row-btn:hover {
  background: rgb(248 250 252);
}

.log-row-icon {
  display: inline-flex;
  height: 1.9rem;
  width: 1.9rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
  background: rgb(59 130 246 / 0.12);
  color: rgb(0 75 141);
}

.log-meta-chip {
  border-radius: 999px;
  background: rgb(241 245 249);
  padding: 0.12rem 0.48rem;
  font-size: 10px;
  font-weight: 800;
  color: rgb(71 85 105);
}
</style>
