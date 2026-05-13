<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";
import { Modal, Button, SelectDropdown, SelectInput, DateTimePicker, Input, Avatar } from "@/lib/mitreka-ui-dist/vue";
import GanttHeader from "./GanttWbsPlanner/components/GanttHeader.vue";
import GanttTaskRow from "./GanttWbsPlanner/components/GanttTaskRow.vue";
import GanttTimeline from "./GanttWbsPlanner/components/GanttTimeline.vue";
import GanttDependencyLines from "./GanttWbsPlanner/components/GanttDependencyLines.vue";
import { ganttTasks } from "./GanttWbsPlanner/data/ganttData";
import type { ViewMode, FlattenedTask, TaskKind, TaskStatus, Resource } from "./GanttWbsPlanner/types";
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
const allowSummaryEdit = ref(false);
const resourceModalOpen = ref(false);
const selectedTaskForResource = ref<FlattenedTask | null>(null);
const employeeDirectory = [
  { id: "emp-pm-01", name: "Rina Putri", role: "Product Manager" },
  { id: "emp-ui-01", name: "Aditya Pratama", role: "UI/UX Designer" },
  { id: "emp-fe-01", name: "Kevin Saputra", role: "Frontend Developer" },
  { id: "emp-be-01", name: "Nabila Sari", role: "Backend Developer" },
  { id: "emp-qa-01", name: "Hendra Wijaya", role: "QA Engineer" },
  { id: "emp-ba-01", name: "Salsa Maharani", role: "Business Analyst" },
];
const employeeLookup = new Map(employeeDirectory.map((item) => [item.id, item]));
const employeeOptions = employeeDirectory.map((item) => ({
  value: item.id,
  label: `${item.name} - ${item.role}`,
}));
const resourceDraft = reactive<{ employeeId: string; allocation: number }>({ employeeId: "", allocation: 100 });
const resourceEditItems = ref<Resource[]>([]);

const tasksState = ref(ganttTasks.map((task) => ({ ...task, resources: task.resources.map((resource) => ({ ...resource })), dependencies: task.dependencies ? [...task.dependencies] : undefined })));
const taskHistory = ref<Array<{ id: number; fromStart: string; fromEnd: string; toStart: string; toEnd: string }>>([]);
const draggedRowTaskId = ref<number | null>(null);
const taskModalOpen = ref(false);
const taskDeleteConfirmOpen = ref(false);
const taskModalMode = ref<"add-root" | "add-child" | "edit">("add-root");
const taskModalTargetParentId = ref<number | null>(null);
const taskModalEditingId = ref<number | null>(null);
const taskForm = reactive<{
  name: string;
  status: TaskStatus;
  progress: number;
  kind: TaskKind;
  dateRange: string[];
  resources: Resource[];
}>({
  name: "",
  status: "on-track",
  progress: 0,
  kind: "task",
  dateRange: [],
  resources: [],
});
const kindOptions = [
  { value: "task", label: "Task" },
  { value: "summary", label: "Summary" },
  { value: "milestone", label: "Milestone" },
];
const statusOptions = [
  { value: "on-track", label: "On Track" },
  { value: "at-risk", label: "At Risk" },
  { value: "done", label: "Done" },
];
function openResourceModal(task: FlattenedTask) {
  selectedTaskForResource.value = task;
  resourceEditItems.value = task.resources.map((res) => ({ ...res }));
  resourceDraft.employeeId = "";
  resourceDraft.allocation = 100;
  resourceModalOpen.value = true;
}

const parsedTasks = computed(() =>
  tasksState.value.map((task) => ({
    ...task,
    startDate: startOfDay(new Date(task.start || "1970-01-01")),
    endDate: endOfDay(new Date(task.end || "1970-01-01")),
    isScheduled: Boolean(task.start && task.end),
  }))
);

const planBounds = computed(() => {
  const scheduled = parsedTasks.value.filter((task) => task.isScheduled);
  const minStart = scheduled.reduce((acc, task) => (task.startDate < acc ? task.startDate : acc), scheduled[0]?.startDate ?? today);
  const maxEnd = scheduled.reduce((acc, task) => (task.endDate > acc ? task.endDate : acc), scheduled[0]?.endDate ?? today);

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

function nextTaskId() {
  return Math.max(...tasksState.value.map((task) => task.id), 0) + 1;
}

function resetTaskForm() {
  taskForm.name = "";
  taskForm.status = "on-track";
  taskForm.progress = 0;
  taskForm.kind = "task";
  taskForm.dateRange = [];
  taskForm.resources = [];
  resourceDraft.employeeId = "";
  resourceDraft.allocation = 100;
}

function openAddRootModal() {
  resetTaskForm();
  taskModalMode.value = "add-root";
  taskModalTargetParentId.value = null;
  taskModalEditingId.value = null;
  taskModalOpen.value = true;
}

function openAddChildModal(anchorTask: FlattenedTask) {
  resetTaskForm();
  taskModalMode.value = "add-child";
  taskModalTargetParentId.value = anchorTask.id;
  taskModalEditingId.value = null;
  taskModalOpen.value = true;
}

function openEditTaskModal(task: FlattenedTask) {
  taskModalMode.value = "edit";
  taskModalTargetParentId.value = task.parentId;
  taskModalEditingId.value = task.id;
  taskForm.name = task.name;
  taskForm.status = task.status;
  taskForm.progress = task.progress;
  taskForm.kind = task.kind;
  taskForm.dateRange = task.start && task.end ? [task.start, task.end] : [];
  taskForm.resources = normalizePicResources(task.resources, task.owner);
  taskModalOpen.value = true;
}

function normalizePicResources(resources: Resource[], ownerName?: string): Resource[] {
  const cloned = resources.map((res) => ({ ...res }));
  if (!cloned.length) return cloned;
  if (cloned.some((res) => res.isPic)) return cloned;
  const ownerMatchIndex = ownerName
    ? cloned.findIndex((res) => (employeeLookup.get(res.employeeId ?? "")?.name ?? "").toLowerCase() === ownerName.toLowerCase())
    : -1;
  const picIndex = ownerMatchIndex >= 0 ? ownerMatchIndex : 0;
  return cloned.map((res, idx) => ({ ...res, isPic: idx === picIndex }));
}

function deriveOwnerFromResources(resources: Resource[]): string {
  const pic = resources.find((res) => res.isPic) ?? resources[0];
  if (!pic) return "Unassigned";
  return employeeLookup.get(pic.employeeId ?? "")?.name ?? pic.role ?? "Unassigned";
}

function onAddTask(anchorTask: FlattenedTask) {
  openAddChildModal(anchorTask);
}

function onEditTask(task: FlattenedTask) {
  openEditTaskModal(task);
}

function onRemoveTask(taskId: number) {
  const idsToRemove = new Set<number>([taskId]);
  let changed = true;
  while (changed) {
    changed = false;
    tasksState.value.forEach((item) => {
      if (item.parentId !== null && idsToRemove.has(item.parentId) && !idsToRemove.has(item.id)) {
        idsToRemove.add(item.id);
        changed = true;
      }
    });
  }
  tasksState.value = tasksState.value
    .filter((item) => !idsToRemove.has(item.id))
    .map((item) => ({
      ...item,
      dependencies: (item.dependencies ?? []).filter((dep) => !idsToRemove.has(dep)),
    }));
}

function removeEditingTask() {
  if (taskModalMode.value !== "edit") return;
  taskDeleteConfirmOpen.value = true;
}

function confirmRemoveEditingTask() {
  if (taskModalEditingId.value === null) return;
  onRemoveTask(taskModalEditingId.value);
  taskDeleteConfirmOpen.value = false;
  taskModalOpen.value = false;
}

function submitTaskModal() {
  const name = taskForm.name.trim();
  if (!name) return;
  const start = taskForm.dateRange[0] ?? "";
  const end = taskForm.dateRange[1] ?? taskForm.dateRange[0] ?? "";
  const resourceList = normalizePicResources(
    taskForm.resources.map((res) => ({ ...res, allocation: Math.max(1, Math.min(100, res.allocation ?? 100)) }))
  );
  const derivedOwner = deriveOwnerFromResources(resourceList);

  if (taskModalMode.value === "edit" && taskModalEditingId.value !== null) {
    tasksState.value = tasksState.value.map((task) => {
      if (task.id !== taskModalEditingId.value) return task;
      return {
        ...task,
        name,
        owner: derivedOwner,
        status: taskForm.status,
        progress: Math.max(0, Math.min(100, taskForm.progress)),
        kind: taskForm.kind,
        start,
        end,
        resources: resourceList,
      };
    });
  } else {
    const id = nextTaskId();
    const newTask = {
      id,
      parentId: taskModalMode.value === "add-child" ? taskModalTargetParentId.value : null,
      code: "",
      name,
      owner: derivedOwner,
      status: taskForm.status,
      progress: Math.max(0, Math.min(100, taskForm.progress)),
      kind: taskForm.kind,
      start,
      end,
      resources: resourceList,
      dependencies: [],
    };
    tasksState.value.push(newTask);
    if (newTask.parentId) expandedIds.add(newTask.parentId);
    rechainDependenciesWithinParent(newTask.parentId);
  }
  taskModalOpen.value = false;
}

function addTaskFormResource() {
  if (!resourceDraft.employeeId) return;
  if (taskForm.resources.some((res) => res.employeeId === resourceDraft.employeeId)) return;
  const employee = employeeLookup.get(resourceDraft.employeeId);
  if (!employee) return;
  const next = {
    employeeId: employee.id,
    role: employee.role,
    allocation: Math.max(1, Math.min(100, resourceDraft.allocation)),
    isPic: taskForm.resources.length === 0,
  };
  taskForm.resources.push(next);
  resourceDraft.employeeId = "";
  resourceDraft.allocation = 100;
}

function removeTaskFormResource(index: number) {
  const wasPic = taskForm.resources[index]?.isPic;
  taskForm.resources.splice(index, 1);
  if (wasPic && taskForm.resources.length) {
    taskForm.resources[0].isPic = true;
  }
}

function setTaskFormPic(index: number) {
  taskForm.resources = taskForm.resources.map((res, idx) => ({ ...res, isPic: idx === index }));
}

function addQuickResource() {
  if (!resourceDraft.employeeId) return;
  if (resourceEditItems.value.some((res) => res.employeeId === resourceDraft.employeeId)) return;
  const employee = employeeLookup.get(resourceDraft.employeeId);
  if (!employee) return;
  resourceEditItems.value.push({
    employeeId: employee.id,
    role: employee.role,
    allocation: Math.max(1, Math.min(100, resourceDraft.allocation)),
    isPic: resourceEditItems.value.length === 0,
  });
  resourceDraft.employeeId = "";
  resourceDraft.allocation = 100;
}

function removeQuickResource(index: number) {
  const wasPic = resourceEditItems.value[index]?.isPic;
  resourceEditItems.value.splice(index, 1);
  if (wasPic && resourceEditItems.value.length) {
    resourceEditItems.value[0].isPic = true;
  }
}

function setQuickPic(index: number) {
  resourceEditItems.value = resourceEditItems.value.map((res, idx) => ({ ...res, isPic: idx === index }));
}

function saveQuickResource() {
  if (!selectedTaskForResource.value) return;
  const taskId = selectedTaskForResource.value.id;
  const normalized = normalizePicResources(resourceEditItems.value.map((res) => ({ ...res })));
  const owner = deriveOwnerFromResources(normalized);
  tasksState.value = tasksState.value.map((task) => (task.id === taskId ? { ...task, owner, resources: normalized } : task));
  resourceModalOpen.value = false;
}

function onRowDragStart(taskId: number) {
  draggedRowTaskId.value = taskId;
}

function rechainDependenciesWithinParent(parentId: number | null) {
  const siblingIds = tasksState.value
    .filter((task) => task.parentId === parentId && task.kind !== "summary")
    .map((task) => task.id);
  if (!siblingIds.length) return;

  tasksState.value = tasksState.value.map((task) => {
    if (!siblingIds.includes(task.id)) return task;
    const preservedExternalDeps = (task.dependencies ?? []).filter((dep) => !siblingIds.includes(dep));
    const currentIndex = siblingIds.indexOf(task.id);
    if (currentIndex <= 0) {
      return {
        ...task,
        dependencies: preservedExternalDeps,
      };
    }
    return {
      ...task,
      dependencies: [...preservedExternalDeps, siblingIds[currentIndex - 1]],
    };
  });
}

function onRowDropOn(targetTaskId: number) {
  const sourceTaskId = draggedRowTaskId.value;
  if (!sourceTaskId || sourceTaskId === targetTaskId) return;
  const sourceIndex = tasksState.value.findIndex((task) => task.id === sourceTaskId);
  const targetIndex = tasksState.value.findIndex((task) => task.id === targetTaskId);
  if (sourceIndex < 0 || targetIndex < 0) return;
  const next = [...tasksState.value];
  const [moved] = next.splice(sourceIndex, 1);
  const insertAt = sourceIndex < targetIndex ? targetIndex : targetIndex;
  next.splice(insertAt, 0, moved);
  tasksState.value = next;
  rechainDependenciesWithinParent(moved.parentId);
  draggedRowTaskId.value = null;
}

function onTimelineDropTask(payload: { taskId: number; slotIndex: number }) {
  const task = parsedTasks.value.find((item) => item.id === payload.taskId);
  const slot = slots.value[payload.slotIndex];
  if (!task || !slot) return;
  const defaultSpan = task.kind === "milestone" ? 1 : 3;
  const currentSpanDays = task.isScheduled ? Math.max(1, Math.round((task.endDate.getTime() - task.startDate.getTime()) / 86400000) + 1) : defaultSpan;
  const start = startOfDay(slot.start);
  const end = endOfDay(addDays(start, currentSpanDays - 1));
  updateTaskDate({ id: task.id, start, end });
  rechainDependenciesWithinParent(task.parentId);
}

function onUnscheduleTask(taskId: number) {
  tasksState.value = tasksState.value.map((task) => (task.id === taskId ? { ...task, start: "", end: "" } : task));
}

function onEditTaskFromTimeline(taskId: number) {
  const task = flattenedTasks.value.find((item) => item.id === taskId);
  if (!task) return;
  openEditTaskModal(task);
}

function commitTaskDateChange(payload: { id: number; fromStart: Date; fromEnd: Date; toStart: Date; toEnd: Date }) {
  const fromStart = formatDateYmd(payload.fromStart);
  const fromEnd = formatDateYmd(payload.fromEnd);
  const toStart = formatDateYmd(payload.toStart);
  const toEnd = formatDateYmd(payload.toEnd);
  if (fromStart === toStart && fromEnd === toEnd) return;
  taskHistory.value.push({ id: payload.id, fromStart, fromEnd, toStart, toEnd });
}

function undoLastDateChange() {
  const latest = taskHistory.value.pop();
  if (!latest) return;
  tasksState.value = tasksState.value.map((task) => {
    if (task.id !== latest.id) return task;
    return {
      ...task,
      start: latest.fromStart,
      end: latest.fromEnd,
    };
  });
}

function onGlobalKeydown(event: KeyboardEvent) {
  const isUndo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z";
  if (!isUndo) return;
  event.preventDefault();
  undoLastDateChange();
}

onMounted(() => {
  window.addEventListener("keydown", onGlobalKeydown);
  updateTimelineScrollbarGutter();
  if (typeof ResizeObserver !== "undefined") {
    timelineBodyResizeObserver = new ResizeObserver(() => {
      updateTimelineScrollbarGutter();
    });
    if (timelineBodyRef.value) timelineBodyResizeObserver.observe(timelineBodyRef.value);
  }
  window.addEventListener("resize", updateTimelineScrollbarGutter);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onGlobalKeydown);
  timelineBodyResizeObserver?.disconnect();
  timelineBodyResizeObserver = null;
  window.removeEventListener("resize", updateTimelineScrollbarGutter);
});

const headerScrollRef = ref<HTMLElement | null>(null);
const bodyScrollRef = ref<HTMLElement | null>(null);
const tasklistBodyRef = ref<HTMLElement | null>(null);
const timelineHeaderRef = ref<HTMLElement | null>(null);
const timelineBodyRef = ref<HTMLElement | null>(null);
const timelineScrollbarGutter = ref(0);
let isSyncing = false;
let timelineBodyResizeObserver: ResizeObserver | null = null;

function updateTimelineScrollbarGutter() {
  const el = timelineBodyRef.value;
  if (!el) return;
  timelineScrollbarGutter.value = Math.max(0, el.offsetWidth - el.clientWidth);
}

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
        <GanttHeader
          :month-groups="[]"
          :slots="[]"
          :grid-columns="''"
          :left-panel-width="LEFT_PANEL_WIDTH"
          :show-toolbar-only="true"
          :allow-summary-edit="allowSummaryEdit"
          @add-root-task="openAddRootModal"
          @toggle-summary-edit="allowSummaryEdit = !allowSummaryEdit"
        />
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
              @add-task="onAddTask"
              @edit-task="onEditTask"
              @row-drag-start="onRowDragStart"
              @row-drop-on="onRowDropOn"
            />
            <div class="gantt-tasklist-scrollbar-spacer"></div>
          </div>
        </div>

        <!-- Timeline (kanan) -->
        <div class="gantt-timeline-panel">
          <!-- Timeline Header -->
          <div class="gantt-timeline-header" ref="timelineHeaderRef" :style="{ '--timeline-gutter': `${timelineScrollbarGutter}px` }" @scroll="syncHorizontalScroll('header', $event)">
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
                :editable-summary-bars="allowSummaryEdit"
                @hover="hoveredTaskId = $event"
                @unhover="hoveredTaskId = null"
                @task-date-change="updateTaskDate"
                @task-date-commit="commitTaskDateChange"
                @timeline-drop-task="onTimelineDropTask"
                @unschedule-task="onUnscheduleTask"
                @edit-task="onEditTaskFromTimeline"
              />
              <GanttDependencyLines :tasks="flattenedTasks" :slots="slots" :slot-size="slotSize" :left-panel-width="0" :row-height="ROW_HEIGHT" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resource Modal -->
    <Modal :open="resourceModalOpen" @close="resourceModalOpen = false" @confirm="saveQuickResource" confirmText="Simpan Perubahan" cancelText="Batal" title="Kelola Assignee" description="Quick edit resource untuk task ini." size="md">
      <div v-if="selectedTaskForResource" class="py-4 space-y-6">
        <!-- Info Task -->
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">Task Name</p>
          <p class="text-slate-800 dark:text-slate-200 font-semibold text-base">{{ selectedTaskForResource.name }}</p>
        </div>

        <!-- Add Assignee Mockup -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">Tambah Resource</label>
          <div class="grid grid-cols-[1fr_100px_auto] gap-2">
            <SelectInput v-model="resourceDraft.employeeId" :options="employeeOptions" size="sm" clearable placeholder="Cari karyawan..." />
            <Input v-model.number="resourceDraft.allocation" size="sm" type="number" min="1" max="100" />
            <Button color="success" class="flex items-center gap-2" @click="addQuickResource">
              <Icon name="plus" class="w-4 h-4" />
              <span>Tambah</span>
            </Button>
          </div>
        </div>

        <!-- Assigned Resources List -->
        <div>
          <p class="block text-sm font-medium mb-3">Assignee Saat Ini</p>
          <div v-if="resourceEditItems.length > 0" class="space-y-2">
            <div v-for="(res, idx) in resourceEditItems" :key="idx" class="group flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300 transition-colors shadow-sm hover:border-base-content/30">
              <div class="flex items-center gap-3">
                <Avatar :fallback="(employeeLookup.get(res.employeeId ?? '')?.name ?? res.role).substring(0, 2).toUpperCase()" size="md" />
                <div>
                  <p class="text-sm font-semibold text-base-content">{{ employeeLookup.get(res.employeeId ?? "")?.name ?? "Unknown Employee" }} <span v-if="res.isPic" class="text-[10px] text-primary">(PIC)</span></p>
                  <p class="text-xs text-base-content/60">{{ res.role }} · {{ res.allocation ?? 100 }}%</p>
                </div>
              </div>
              
              <div class="flex items-center gap-2">
                <label class="text-xs inline-flex items-center gap-1">
                  <input type="radio" name="quick-pic" :checked="Boolean(res.isPic)" @change="setQuickPic(idx)" />
                  PIC
                </label>
                <button type="button" class="icon-btn icon-btn-soft-error icon-btn-sm opacity-0 group-hover:opacity-100 focus:opacity-100" title="Hapus Assignee" @click="removeQuickResource(idx)">
                  <Icon name="trash" class="w-4 h-4" />
                </button>
              </div>
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

    <Modal
      :open="taskModalOpen"
      @close="taskModalOpen = false"
      :title="taskModalMode === 'edit' ? 'Edit Task' : 'Tambah Task'"
      description="Form task untuk WBS dan timeline scheduling."
      size="md"
    >
      <div class="py-3 space-y-3">
        <label class="task-form-field">
          <span>Task Name</span>
          <Input v-model="taskForm.name" size="sm" placeholder="Masukkan nama task" />
        </label>
        <div class="task-form-grid">
          <label class="task-form-field">
            <span>Kind</span>
            <SelectDropdown v-model="taskForm.kind" :options="kindOptions" size="sm" variant="outline" color="default" />
          </label>
          <label class="task-form-field">
            <span>Status</span>
            <SelectDropdown v-model="taskForm.status" :options="statusOptions" size="sm" variant="outline" color="default" />
          </label>
        </div>
        <div class="task-form-field">
          <span>Date Range</span>
          <DateTimePicker
            v-model="taskForm.dateRange"
            mode="range"
            clearable
            placeholder="Pilih rentang tanggal"
            input-class="input input-sm w-full bg-white"
          />
        </div>
        <div class="task-form-field">
          <span>Progress (%)</span>
          <div class="task-progress-row">
            <input v-model.number="taskForm.progress" type="number" min="0" max="100" class="task-form-input task-progress-input" />
            <input v-model.number="taskForm.progress" type="range" min="0" max="100" class="range range-primary task-progress-slider" />
          </div>
        </div>
        <div class="task-form-field">
          <span>Resources</span>
          <div class="grid grid-cols-[1fr_100px_auto] gap-2">
            <SelectInput v-model="resourceDraft.employeeId" :options="employeeOptions" size="sm" clearable placeholder="Cari karyawan..." />
            <Input v-model.number="resourceDraft.allocation" size="sm" type="number" min="1" max="100" />
            <Button color="success" @click="addTaskFormResource">Add</Button>
          </div>
          <div v-if="taskForm.resources.length" class="space-y-2 mt-2">
            <div v-for="(res, idx) in taskForm.resources" :key="`${res.role}-${idx}`" class="group flex items-center justify-between p-2 bg-base-100 rounded-lg border border-base-300 transition-colors hover:border-base-content/30">
              <div class="flex items-center gap-3">
                <Avatar :fallback="(employeeLookup.get(res.employeeId ?? '')?.name ?? res.role).substring(0, 2).toUpperCase()" size="sm" />
                <div>
                  <p class="text-xs font-semibold text-base-content">{{ employeeLookup.get(res.employeeId ?? "")?.name ?? "Unknown Employee" }} <span v-if="res.isPic" class="text-[10px] text-primary">(PIC)</span></p>
                  <p class="text-[11px] text-base-content/60">{{ res.role }} · {{ res.allocation ?? 100 }}%</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-xs inline-flex items-center gap-1">
                  <input type="radio" name="taskform-pic" :checked="Boolean(res.isPic)" @change="setTaskFormPic(idx)" />
                  PIC
                </label>
                <button type="button" class="icon-btn icon-btn-soft-error icon-btn-xs opacity-0 group-hover:opacity-100 focus:opacity-100" @click="removeTaskFormResource(idx)">
                  <Icon name="trash" class="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="w-full flex items-center justify-between gap-2">
          <button v-if="taskModalMode === 'edit'" type="button" class="btn btn-sm btn-soft-error" @click="removeEditingTask">Remove Task List</button>
          <div class="ml-auto flex items-center gap-2">
            <Button variant="ghost" color="default" @click="taskModalOpen = false">Batal</Button>
            <Button color="primary" @click="submitTaskModal">{{ taskModalMode === "edit" ? "Update Task" : "Add Task" }}</Button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal
      :open="taskDeleteConfirmOpen"
      @close="taskDeleteConfirmOpen = false"
      @confirm="confirmRemoveEditingTask"
      confirmText="Ya, Hapus"
      cancelText="Batal"
      title="Konfirmasi Hapus Task"
      description="Task dan seluruh child task akan dihapus permanen dari list."
      size="sm"
    >
      <p class="text-sm text-base-content/80">Lanjutkan hapus task ini?</p>
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
  grid-template-columns: 28px 24px 1fr 62px 62px 36px 54px;
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
  padding-right: var(--timeline-gutter, 0px);
  box-sizing: border-box;
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

.task-form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.task-form-field {
  display: flex;
  flex-direction: column;
  gap: 0.28rem;
  font-size: 0.72rem;
  font-weight: 600;
  color: #475569;
}

.task-form-input {
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.45rem 0.6rem;
  font-size: 0.75rem;
  background: #fff;
  color: #0f172a;
}

.task-progress-row {
  display: grid;
  grid-template-columns: 84px 1fr;
  gap: 0.5rem;
  align-items: center;
}

.task-progress-input {
  text-align: right;
}

.task-progress-slider {
  width: 100%;
}

.task-resource-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
  margin-top: 0.5rem;
}

.task-resource-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  border: 1px solid #bfdbfe;
  background: #eff6ff;
  color: #1e3a8a;
  border-radius: 999px;
  padding: 0.2rem 0.5rem;
  font-size: 0.68rem;
  font-weight: 600;
}

.task-resource-chip-remove {
  border: none;
  background: transparent;
  color: #1d4ed8;
  font-size: 0.72rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
}

.task-remove-btn {
  border: 1px solid #fecaca;
  background: #fff1f2;
  color: #be123c;
  border-radius: 0.5rem;
  padding: 0.44rem 0.7rem;
  font-size: 0.73rem;
  font-weight: 700;
  cursor: pointer;
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

