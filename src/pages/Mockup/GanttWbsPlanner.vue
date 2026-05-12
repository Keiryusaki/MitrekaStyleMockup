<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";
import { Modal, Button, SelectDropdown, Avatar } from "@/lib/mitreka-ui-dist/vue";
import GanttHeader from "./GanttWbsPlanner/components/GanttHeader.vue";
import GanttTaskRow from "./GanttWbsPlanner/components/GanttTaskRow.vue";
import GanttTimeline from "./GanttWbsPlanner/components/GanttTimeline.vue";
import GanttDependencyLines from "./GanttWbsPlanner/components/GanttDependencyLines.vue";
import { ganttTasks } from "./GanttWbsPlanner/data/ganttData";
import type { ViewMode, FlattenedTask } from "./GanttWbsPlanner/types";
import {
  startOfDay,
  endOfDay,
  addDays,
  addMonths,
  addYears,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  slotPixelWidth,
  buildSlots,
  flattenTasks,
} from "./GanttWbsPlanner/utils";

const LEFT_PANEL_WIDTH = 480;
const ROW_HEIGHT = 32;
const today = startOfDay(new Date("2026-08-09"));
const activeView = ref<ViewMode>("day");
const viewModes: Array<{ value: ViewMode; label: string }> = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const expandedIds = reactive(new Set<number>([1, 4, 11, 15, 20, 25, 28]));
const checkedTaskIds = reactive(
  new Set<number>(ganttTasks.filter((task) => task.status === "done").map((task) => task.id))
);

const hoveredTaskId = ref<number | null>(null);
const resourceModalOpen = ref(false);
const selectedTaskForResource = ref<FlattenedTask | null>(null);

const selectedAssignee = ref("");
const assigneeOptions = [
  { value: "pm", label: "Product Manager" },
  { value: "uiux", label: "UI/UX Designer" },
  { value: "fe", label: "Frontend Developer" },
  { value: "be", label: "Backend Developer" },
  { value: "qa", label: "QA Engineer" },
];

const tasksState = ref(ganttTasks.map((task) => ({ ...task, resources: task.resources.map((resource) => ({ ...resource })), dependencies: task.dependencies ? [...task.dependencies] : undefined })));

function openResourceModal(task: FlattenedTask) {
  selectedTaskForResource.value = task;
  resourceModalOpen.value = true;
}

const parsedTasks = computed(() =>
  tasksState.value.map((task) => ({
    ...task,
    startDate: startOfDay(new Date(task.start)),
    endDate: endOfDay(new Date(task.end)),
  }))
);

const planBounds = computed(() => {
  const minStart = parsedTasks.value.reduce((acc, task) => (task.startDate < acc ? task.startDate : acc), parsedTasks.value[0]?.startDate ?? today);
  const maxEnd = parsedTasks.value.reduce((acc, task) => (task.endDate > acc ? task.endDate : acc), parsedTasks.value[0]?.endDate ?? today);

  if (activeView.value === "day") {
    return { start: addDays(startOfDay(minStart), -5), end: addDays(endOfDay(maxEnd), 12) };
  }
  if (activeView.value === "week") {
    return { start: addDays(startOfWeek(minStart), -7), end: addDays(endOfWeek(maxEnd), 21) };
  }
  if (activeView.value === "month") {
    return { start: startOfMonth(addMonths(minStart, -2)), end: endOfMonth(addMonths(maxEnd, 4)) };
  }
  return { start: startOfYear(addYears(minStart, -1)), end: endOfYear(addYears(maxEnd, 2)) };
});

const slots = computed(() => buildSlots(activeView.value, planBounds.value.start, planBounds.value.end, today));
const slotSize = computed(() => slotPixelWidth(activeView.value));
const timelineWidth = computed(() => slots.value.length * slotSize.value);
const boardWidth = computed(() => LEFT_PANEL_WIDTH + timelineWidth.value);

const monthGroups = computed(() => {
  const groups: Array<{ label: string; span: number }> = [];
  slots.value.forEach((slot) => {
    const last = groups[groups.length - 1];
    if (last?.label === slot.groupLabel) last.span += 1;
    else groups.push({ label: slot.groupLabel, span: 1 });
  });
  return groups;
});

const summaryStats = computed(() => {
  const taskCount = tasksState.value.filter((task) => task.kind === "task").length;
  const milestoneCount = tasksState.value.filter((task) => task.kind === "milestone").length;
  const atRiskCount = tasksState.value.filter((task) => task.status === "at-risk").length;
  const assignedRoles = new Set(tasksState.value.flatMap((task) => task.resources.map((resource) => resource.role))).size;
  return { taskCount, milestoneCount, atRiskCount, assignedRoles };
});

const flattenedTasks = computed<FlattenedTask[]>(() => {
  return flattenTasks(tasksState.value, expandedIds);
});

const todayColumn = computed(() => {
  const index = slots.value.findIndex((slot) => slot.isToday);
  return index >= 0 ? index + 1 : null;
});

function toggleExpand(id: number) {
  if (expandedIds.has(id)) expandedIds.delete(id);
  else expandedIds.add(id);
}

function isTaskChecked(id: number) {
  return checkedTaskIds.has(id);
}

function toggleTaskCheck(id: number) {
  if (checkedTaskIds.has(id)) checkedTaskIds.delete(id);
  else checkedTaskIds.add(id);
}

function formatDateYmd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateTaskDate(payload: { id: number; start: Date; end: Date }) {
  tasksState.value = tasksState.value.map((task) => {
    if (task.id !== payload.id) return task;
    return {
      ...task,
      start: formatDateYmd(payload.start),
      end: formatDateYmd(payload.end),
    };
  });
}

const headerScrollRef = ref<HTMLElement | null>(null);
const bodyScrollRef = ref<HTMLElement | null>(null);
const tasklistBodyRef = ref<HTMLElement | null>(null);
const timelineHeaderRef = ref<HTMLElement | null>(null);
const timelineBodyRef = ref<HTMLElement | null>(null);
let isSyncing = false;

function syncHorizontalScroll(source: "header" | "body", event: Event) {
  if (isSyncing) return;
  isSyncing = true;
  const scrollLeft = (event.target as HTMLElement).scrollLeft;
  if (source === "header" && timelineBodyRef.value) {
    timelineBodyRef.value.scrollLeft = scrollLeft;
  } else if (source === "body" && timelineHeaderRef.value) {
    timelineHeaderRef.value.scrollLeft = scrollLeft;
  }
  requestAnimationFrame(() => { isSyncing = false; });
}

function syncTimelineBodyScroll(event: Event) {
  if (isSyncing) return;
  isSyncing = true;
  const el = event.target as HTMLElement;
  if (tasklistBodyRef.value) {
    tasklistBodyRef.value.scrollTop = el.scrollTop;
  }
  if (timelineHeaderRef.value) {
    timelineHeaderRef.value.scrollLeft = el.scrollLeft;
  }
  requestAnimationFrame(() => { isSyncing = false; });
}

function syncTasklistBodyScroll(event: Event) {
  if (isSyncing) return;
  isSyncing = true;
  const el = event.target as HTMLElement;
  if (timelineBodyRef.value) {
    timelineBodyRef.value.scrollTop = el.scrollTop;
  }
  requestAnimationFrame(() => { isSyncing = false; });
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

    <section class="card p-0 overflow-hidden border border-slate-200 dark:border-slate-700 dark:bg-slate-900 gantt-wrapper">
      <!-- Toolbar fixed di atas, tidak ikut scroll -->
      <div class="gantt-toolbar-wrapper">
        <GanttHeader :month-groups="[]" :slots="[]" :grid-columns="''" :left-panel-width="LEFT_PANEL_WIDTH" :show-toolbar-only="true" />
      </div>

      <!-- Main area: Task List (fixed) + Timeline (scroll-x) -->
      <div class="gantt-main">
        <!-- Task List (kiri) - fixed -->
        <div class="gantt-tasklist">
          <!-- Task List Header -->
          <div class="gantt-tasklist-header">
            <div class="gantt-col-headers">
              <span class="gantt-col-hdr gantt-col-hdr-num">#</span>
              <span class="gantt-col-hdr gantt-col-hdr-check"></span>
              <span class="gantt-col-hdr gantt-col-hdr-task">Task name</span>
              <span class="gantt-col-hdr gantt-col-hdr-start">Start</span>
              <span class="gantt-col-hdr gantt-col-hdr-end">Due</span>
              <span class="gantt-col-hdr gantt-col-hdr-progress">%</span>
              <span class="gantt-col-hdr gantt-col-hdr-resource">👤</span>
            </div>
          </div>
          <!-- Task List Body -->
          <div class="gantt-tasklist-body" ref="tasklistBodyRef" @scroll="syncTasklistBodyScroll">
            <GanttTaskRow 
              v-for="(task, index) in flattenedTasks" 
              :key="task.id" 
              :task="task" 
              :row-index="index + 1" 
              :slots="[]" 
              :grid-columns="`${LEFT_PANEL_WIDTH}px`" 
              :expanded-ids="expandedIds" 
              :checked="isTaskChecked(task.id)" 
              :is-hovered="hoveredTaskId === task.id"
              @mouseenter="hoveredTaskId = task.id"
              @mouseleave="hoveredTaskId = null"
              @toggle-expand="toggleExpand" 
              @toggle-check="toggleTaskCheck" 
              @open-resource="openResourceModal"
            />
            <div class="gantt-tasklist-scrollbar-spacer"></div>
          </div>
        </div>

        <!-- Timeline (kanan) -->
        <div class="gantt-timeline-panel">
          <!-- Timeline Header -->
          <div class="gantt-timeline-header" ref="timelineHeaderRef" @scroll="syncHorizontalScroll('header', $event)">
            <div :style="{ width: `${timelineWidth}px` }">
              <div class="gantt-month-row">
                <div v-for="group in monthGroups" :key="group.label" class="gantt-month-cell" :style="{ width: `${group.span * slotSize}px` }">
                  {{ group.label }}
                </div>
              </div>
              <div class="gantt-day-row">
                <div v-for="slot in slots" :key="slot.key" class="gantt-day-cell" :class="{ 'today-cell': slot.isToday }" :style="{ width: `${slotSize}px` }">
                  <span>{{ slot.label }}</span>
                  <small>{{ slot.shortLabel }}</small>
                </div>
              </div>
            </div>
          </div>
          <!-- Timeline Body -->
          <div class="gantt-timeline-body" ref="timelineBodyRef" @scroll="syncTimelineBodyScroll">
            <div class="gantt-timeline-canvas" :style="{ width: `${timelineWidth}px`, height: `${flattenedTasks.length * ROW_HEIGHT}px` }">
              <GanttTimeline 
                :tasks="flattenedTasks" 
                :slots="slots" 
                :slot-size="slotSize" 
                :left-panel-width="0" 
                :today-column="todayColumn" 
                :row-height="ROW_HEIGHT" 
                :hovered-task-id="hoveredTaskId"
                @hover="hoveredTaskId = $event"
                @unhover="hoveredTaskId = null"
                @task-date-change="updateTaskDate"
              />
              <GanttDependencyLines :tasks="flattenedTasks" :slots="slots" :slot-size="slotSize" :left-panel-width="0" :row-height="ROW_HEIGHT" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resource Modal -->
    <Modal :open="resourceModalOpen" @close="resourceModalOpen = false" @confirm="resourceModalOpen = false" confirmText="Simpan Perubahan" cancelText="Batal" title="Kelola Assignee" description="Tugaskan orang atau role ke task ini." size="md">
      <div v-if="selectedTaskForResource" class="py-4 space-y-6">
        <!-- Info Task -->
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Task Name</p>
          <p class="text-slate-800 dark:text-slate-200 font-semibold text-base">{{ selectedTaskForResource.name }}</p>
        </div>

        <!-- Add Assignee Mockup -->
        <div>
          <label class="block text-sm font-medium mb-1">Tambah Assignee Baru</label>
          <div class="flex gap-2">
            <div class="flex-1">
              <SelectDropdown
                v-model="selectedAssignee"
                :options="assigneeOptions"
                placeholder="Pilih Role / Orang..."
              />
            </div>
            <Button color="success" class="flex items-center gap-2">
              <Icon name="plus" class="w-4 h-4" />
              <span>Tambah</span>
            </Button>
          </div>
        </div>

        <!-- Assigned Resources List -->
        <div>
          <p class="block text-sm font-medium mb-3">Assignee Saat Ini</p>
          <div v-if="selectedTaskForResource.resources && selectedTaskForResource.resources.length > 0" class="space-y-2">
            <div v-for="(res, idx) in selectedTaskForResource.resources" :key="idx" class="group flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300 transition-colors shadow-sm hover:border-base-content/30">
              <div class="flex items-center gap-3">
                <Avatar :fallback="res.role.substring(0, 2).toUpperCase()" :color="res.tone" size="md" />
                <div>
                  <p class="text-sm font-semibold text-base-content">{{ res.role }}</p>
                  <p class="text-xs text-base-content/60">Assignee</p>
                </div>
              </div>
              
              <!-- Delete Button -->
              <button type="button" class="icon-btn icon-btn-soft-error icon-btn-sm opacity-0 group-hover:opacity-100 focus:opacity-100" title="Hapus Assignee">
                <Icon name="trash" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-base-300 rounded-lg bg-base-200/50">
            <Icon name="users" class="w-8 h-8 text-base-content/40 mb-2" />
            <p class="text-sm text-base-content/70 font-medium">Belum ada assignee</p>
            <p class="text-xs text-base-content/50 mt-1">Silakan tambah assignee dari menu di atas.</p>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<style scoped>
.gantt-wrapper {
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

.gantt-toolbar-wrapper {
  flex-shrink: 0;
  z-index: 30;
}

.gantt-main {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Task List (kiri) */
.gantt-tasklist {
  width: 480px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border-right: 2px solid #e2e8f0;
  background: #fff;
  z-index: 10;
}

.gantt-tasklist-header {
  flex-shrink: 0;
  padding: 0 0.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  height: 71px;
}

.gantt-col-headers {
  width: 100%;
  display: grid;
  grid-template-columns: 28px 24px 1fr 62px 62px 36px 28px;
  gap: 0.3rem;
  align-items: center;
  font-size: 0.64rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

.gantt-tasklist-body {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.gantt-tasklist-scrollbar-spacer {
  height: 17px;
}

/* Timeline (kanan) */
.gantt-timeline-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
}

.gantt-timeline-header {
  flex-shrink: 0;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: none;
  border-bottom: 1px solid #e2e8f0;
}

.gantt-timeline-header::-webkit-scrollbar {
  display: none;
}

.gantt-month-row {
  display: flex;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.gantt-month-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 36px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  border-right: 1px solid rgba(226, 232, 240, 0.6);
}

.gantt-day-row {
  display: flex;
  background: #fff;
}

.gantt-day-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.1rem;
  min-height: 32px;
  font-size: 0.68rem;
  font-weight: 600;
  color: #64748b;
  border-right: 1px solid rgba(226, 232, 240, 0.6);
}

.gantt-day-cell small {
  font-size: 0.58rem;
  color: #94a3b8;
  font-weight: 500;
}

.today-cell {
  background: rgba(239, 68, 68, 0.06);
  color: #ef4444;
}

.gantt-timeline-body {
  flex: 1;
  overflow: auto;
  min-height: 0;
}

.gantt-timeline-canvas {
  position: relative;
}

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

:global(.dark) .gantt-tasklist,
:global(:root[data-theme="mitrekadark"]) .gantt-tasklist {
  background: #0f172a;
  border-right-color: #334155;
}

:global(.dark) .gantt-tasklist-header,
:global(:root[data-theme="mitrekadark"]) .gantt-tasklist-header {
  background: #111827;
  border-bottom-color: #334155;
}

:global(.dark) .gantt-col-headers,
:global(:root[data-theme="mitrekadark"]) .gantt-col-headers {
  color: #94a3b8;
}

:global(.dark) .gantt-timeline-header,
:global(:root[data-theme="mitrekadark"]) .gantt-timeline-header {
  border-bottom-color: #334155;
}

:global(.dark) .gantt-month-row,
:global(:root[data-theme="mitrekadark"]) .gantt-month-row {
  background: #111827;
  border-bottom-color: #334155;
}

:global(.dark) .gantt-month-cell,
:global(:root[data-theme="mitrekadark"]) .gantt-month-cell {
  color: #94a3b8;
  border-right-color: rgba(51, 65, 85, 0.85);
}

:global(.dark) .gantt-day-row,
:global(:root[data-theme="mitrekadark"]) .gantt-day-row {
  background: #0f172a;
}

:global(.dark) .gantt-day-cell,
:global(:root[data-theme="mitrekadark"]) .gantt-day-cell {
  color: #a8b4c6;
  border-right-color: rgba(51, 65, 85, 0.75);
}

:global(.dark) .gantt-day-cell small,
:global(:root[data-theme="mitrekadark"]) .gantt-day-cell small {
  color: #64748b;
}

:global(.dark) .today-cell,
:global(:root[data-theme="mitrekadark"]) .today-cell {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
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

/* Fallback when theme attribute is applied on a wrapper (not :root) */
:global([data-theme="mitrekadark"] .gantt-tasklist) {
  background: #0f172a;
  border-right-color: #334155;
}
:global([data-theme="mitrekadark"] .gantt-tasklist-header) {
  background: #111827;
  border-bottom-color: #334155;
}
:global([data-theme="mitrekadark"] .gantt-col-headers) {
  color: #94a3b8;
}
:global([data-theme="mitrekadark"] .gantt-timeline-header) {
  border-bottom-color: #334155;
}
:global([data-theme="mitrekadark"] .gantt-month-row) {
  background: #111827;
  border-bottom-color: #334155;
}
:global([data-theme="mitrekadark"] .gantt-month-cell) {
  color: #94a3b8;
  border-right-color: rgba(51, 65, 85, 0.85);
}
:global([data-theme="mitrekadark"] .gantt-day-row) {
  background: #0f172a;
}
:global([data-theme="mitrekadark"] .gantt-day-cell) {
  color: #a8b4c6;
  border-right-color: rgba(51, 65, 85, 0.75);
}
:global([data-theme="mitrekadark"] .gantt-day-cell small) {
  color: #64748b;
}
:global([data-theme="mitrekadark"] .today-cell) {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
}
</style>
