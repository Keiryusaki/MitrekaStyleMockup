<script setup lang="ts">
import { computed, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { GanttChart } from "@/components/gantt";
import type { GanttTask, ViewMode, GanttChangeEvent } from "@/components/gantt";
import { ganttTasks, ganttEmployees } from "@/components/gantt/demo/ganttData";

// Demo wiring: the page owns the data and feeds it to the reusable <GanttChart>.
const tasks = ref<GanttTask[]>(ganttTasks);
const activeView = ref<ViewMode>("day");
// Demo data is shifted onto the current date (see ganttData.ts), so the GanttChart
// uses its real-time default today marker — no fixed date needed.

const viewModes: Array<{ value: ViewMode; label: string }> = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const summaryStats = computed(() => {
  const taskCount = tasks.value.filter((task) => task.kind === "task").length;
  const milestoneCount = tasks.value.filter((task) => task.kind === "milestone").length;
  const atRiskCount = tasks.value.filter((task) => task.status === "at-risk").length;
  return { taskCount, milestoneCount, atRiskCount };
});

function onChange(event: GanttChangeEvent) {
  // Hook point for persistence (API call, store dispatch, etc.).
  // eslint-disable-next-line no-console
  console.debug("[gantt] change", event);
}
</script>

<template>
  <div class="space-y-4 min-w-0">
    <PageHeader category="Mockup Pages" title="Gantt WBS Planner" description="Mockup planner mirip Instagantt: hierarchy kiri dengan tabel task, timeline kanan dengan bar chart dan dependency lines." />

    <!-- View mode controls -->
    <div class="flex items-center justify-between">
      <div class="gantt-mode-switch">
        <button v-for="mode in viewModes" :key="mode.value" type="button" class="gantt-mode-button" :class="{ 'is-active': activeView === mode.value }" @click="activeView = mode.value">
          {{ mode.label }}
        </button>
      </div>
      <div class="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
        <span>Tasks: <strong class="text-slate-800 dark:text-slate-100">{{ summaryStats.taskCount }}</strong></span>
        <span>Milestones: <strong class="text-slate-800 dark:text-slate-100">{{ summaryStats.milestoneCount }}</strong></span>
        <span class="text-amber-700">At Risk: <strong>{{ summaryStats.atRiskCount }}</strong></span>
      </div>
    </div>

    <GanttChart
      v-model:tasks="tasks"
      :employees="ganttEmployees"
      :view="activeView"
      @change="onChange"
    />
  </div>
</template>

<style scoped>
.gantt-mode-switch {
  display: inline-grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.25rem;
  background: #f1f5f9;
  border-radius: 0.5rem;
  padding: 0.2rem;
}

.gantt-mode-button {
  border: none;
  border-radius: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: transparent;
  font-size: 0.74rem;
  font-weight: 600;
  color: #64748b;
  cursor: pointer;
}

.gantt-mode-button.is-active {
  color: #1e293b;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

:global(.dark) .gantt-mode-switch,
:global(:root[data-theme="mitrekadark"]) .gantt-mode-switch {
  background: #1e293b;
}

:global(.dark) .gantt-mode-button,
:global(:root[data-theme="mitrekadark"]) .gantt-mode-button {
  color: #94a3b8;
}

:global(.dark) .gantt-mode-button.is-active,
:global(:root[data-theme="mitrekadark"]) .gantt-mode-button.is-active {
  color: #e2e8f0;
  background: #334155;
  box-shadow: none;
}
</style>
