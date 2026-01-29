<script setup lang="ts">
import { computed, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import { DateTimePicker as MitrekaDateTimePicker } from "@keiryusaki/mitreka-ui/vue";

const tocItems: TOCItem[] = [
  { id: "date", label: "Date Picker" },
  { id: "date-range", label: "Date Range" },
  { id: "time", label: "Time Picker" },
  { id: "datetime-range", label: "DateTime Range" },
  { id: "month-year", label: "Month / Year" },
  { id: "notes", label: "Notes" },
];

const dateValue = ref("");
const dateRange = ref<string[]>([]);

const timeValue = ref("09:00");

const dateTimeRange = ref<string[]>([]);

const monthValue = ref("");
const yearValue = ref(new Date().getFullYear().toString());

const dateRangeDisplay = computed(() =>
  dateRange.value.length === 2 ? `${dateRange.value[0]} -> ${dateRange.value[1]}` : ""
);
const dateTimeRangeDisplay = computed(() =>
  dateTimeRange.value.length === 2
    ? `${dateTimeRange.value[0]} -> ${dateTimeRange.value[1]}`
    : "-"
);

</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Components"
      title="Date & Time Picker"
      description="Native date/time inputs dengan contoh single, range, dan kombinasi date+time."
    />

    <div class="card p-4 md:p-6 space-y-6">
      <!-- Date Picker -->
      <section id="date" class="rounded-box border border-base-300 p-4 space-y-3 scroll-mt-20">
        <h2 class="text-base font-semibold">Date Picker</h2>
        <div class="grid gap-4 md:grid-cols-[240px_1fr] items-start">
          <label class="space-y-1">
            <span class="text-xs opacity-70">Select date</span>
            <div class="relative">
              <Icon
                name="calendar-days"
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <MitrekaDateTimePicker
                v-model="dateValue"
                placeholder="Select date"
                inputClass="pl-9"
              />
            </div>
          </label>
          <div class="text-sm opacity-80">
            <div class="font-medium">Value</div>
            <div>{{ dateValue || "-" }}</div>
          </div>
        </div>
      </section>

      <!-- Date Range -->
      <section id="date-range" class="rounded-box border border-base-300 p-4 space-y-3 scroll-mt-20">
        <h2 class="text-base font-semibold">Date Range</h2>
        <div class="grid gap-4 md:grid-cols-[1fr_1fr] items-start">
          <div class="space-y-1">
            <span class="text-xs opacity-70">Range</span>
            <div class="relative">
              <Icon
                name="calendar-days"
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <MitrekaDateTimePicker
                v-model="dateRange"
                mode="range"
                placeholder="Start -> End"
                inputClass="pl-9"
              />
            </div>
          </div>
          <div class="text-sm opacity-80">
            <div class="font-medium">Value</div>
            <div>{{ dateRangeDisplay || "-" }}</div>
          </div>
        </div>
      </section>

      <!-- Time Picker -->
      <section id="time" class="rounded-box border border-base-300 p-4 space-y-3 scroll-mt-20">
        <h2 class="text-base font-semibold">Time Picker</h2>
        <div class="grid gap-4 md:grid-cols-[240px_1fr] items-start">
          <label class="space-y-1">
            <span class="text-xs opacity-70">Select time</span>
            <MitrekaDateTimePicker
              v-model="timeValue"
              noCalendar
              enableTime
              dateFormat="H:i"
              placeholder="Select time"
            />
          </label>
          <div class="text-sm opacity-80">
            <div class="font-medium">Value</div>
            <div>{{ timeValue || "-" }}</div>
          </div>
        </div>
      </section>

      <!-- DateTime Range -->
      <section id="datetime-range" class="rounded-box border border-base-300 p-4 space-y-3 scroll-mt-20">
        <h2 class="text-base font-semibold">DateTime Range</h2>
        <div class="grid gap-4 md:grid-cols-[1fr_1fr] items-start">
          <label class="space-y-1">
            <span class="text-xs opacity-70">Range</span>
            <div class="relative">
              <Icon
                name="calendar-days"
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <MitrekaDateTimePicker
                v-model="dateTimeRange"
                mode="range"
                enableTime
                dateFormat="Y-m-d H:i"
                placeholder="Start -> End"
                inputClass="pl-9"
              />
            </div>
          </label>
          <div class="text-sm opacity-80">
            <div class="font-medium">Value</div>
            <div>{{ dateTimeRangeDisplay }}</div>
          </div>
        </div>
      </section>

      <!-- Month / Year -->
      <section id="month-year" class="rounded-box border border-base-300 p-4 space-y-3 scroll-mt-20">
        <h2 class="text-base font-semibold">Month / Year Picker</h2>
        <div class="grid gap-4 md:grid-cols-[1fr_1fr_1fr] items-start">
          <label class="space-y-1">
            <span class="text-xs opacity-70">Month</span>
            <div class="relative">
              <Icon
                name="calendar-days"
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <MitrekaDateTimePicker
                v-model="monthValue"
                picker="month"
                placeholder="Select month"
                inputClass="pl-9"
              />
            </div>
          </label>
          <div class="space-y-1">
            <span class="text-xs opacity-70">Year</span>
            <div class="relative">
              <Icon
                name="calendar-days"
                class="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 opacity-60"
              />
              <MitrekaDateTimePicker
                v-model="yearValue"
                picker="year-grid"
                placeholder="Select year"
                inputClass="pl-9"
              />
            </div>
          </div>
          <div class="text-sm opacity-80">
            <div class="font-medium">Value</div>
            <div>{{ monthValue || "-" }} / {{ yearValue }}</div>
          </div>
        </div>
      </section>

      <!-- Notes -->
      <section id="notes" class="rounded-box border border-base-300 p-4 text-sm scroll-mt-20">
        <ul class="list-disc space-y-1 pl-5">
          <li>
            Flatpickr memberi UI konsisten di semua browser.
          </li>
          <li>
            Untuk batasan tanggal, gunakan <code>minDate</code>/<code>maxDate</code> di komponen.
          </li>
          <li>
            Format value default: <code>YYYY-MM-DD</code>, <code>HH:mm</code>,
            <code>YYYY-MM-DD HH:mm</code>.
          </li>
          <li>
            Date Range pakai 1 input + popover berisi start/end (lebih umum di UI modern).
          </li>
        </ul>
      </section>
    </div>

    <FloatingTOC :items="tocItems" />
  </div>
</template>
