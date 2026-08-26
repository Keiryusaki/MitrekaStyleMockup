<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import { Icon } from "@/composables/Icon";
import { Modal, Button, SelectDropdown, SelectInput, MultiSelect, DateTimePicker, Input, Avatar } from "@/lib/mitreka-ui-dist/vue";
import GanttHeader from "./components/GanttHeader.vue";
import GanttTaskRow from "./components/GanttTaskRow.vue";
import GanttTimeline from "./components/GanttTimeline.vue";
import GanttDependencyLines from "./components/GanttDependencyLines.vue";
import GanttSprintHeader from "./components/GanttSprintHeader.vue";
import { useGanttState } from "./composables/useGanttState";
import { defaultGanttLabels, ganttPhaseCatalog } from "./types";
import type {
  ViewMode,
  FlattenedTask,
  TaskKind,
  TaskStatus,
  Resource,
  GanttTask,
  GanttEmployee,
  GanttChangeEvent,
  GanttLabels,
  GanttValidation,
  PlanningMode,
  BarColorMode,
  DependencyDisplayMode,
  ResourceLabelMode,
  GanttSprint,
  GanttPhase,
  GanttTaskDependency,
  SprintScheduleValidation,
} from "./types";
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
  findSprintForDate,
  validateTaskSprintSchedule,
  normalizeDependencies,
} from "./utils";

const props = withDefaults(
  defineProps<{
    /** Source task list. Supports `v-model:tasks` for two-way binding. */
    tasks: GanttTask[];
    /** Employee master used to populate resource assignment selectors. */
    employees?: GanttEmployee[];
    /** Marker date for the "today" line. Defaults to the current date. */
    today?: Date;
    /** Active timeline granularity. */
    view?: ViewMode;
    /** Width (px) of the left task-list panel. */
    leftPanelWidth?: number;
    /** Height (px) of a single task row. */
    rowHeight?: number;
    /** Enable the global Ctrl/Cmd+Z undo shortcut for date changes. */
    enableUndoShortcut?: boolean;
    /** Task ids expanded on first render. Defaults to all summary tasks. */
    defaultExpandedIds?: number[];
    /** Task ids checked on first render. Defaults to all `done` tasks. */
    defaultCheckedIds?: number[];
    /** Override any subset of the user-facing strings. */
    labels?: Partial<GanttLabels>;
    /** Show the built-in validation banner (dependency + workload warnings). */
    showValidation?: boolean;
    planningMode?: PlanningMode;
    sprints?: GanttSprint[];
    showSprintBands?: boolean;
    barColorMode?: BarColorMode;
    dependencyDisplay?: DependencyDisplayMode;
    resourceLabel?: ResourceLabelMode;
    baselineTasks?: GanttTask[];
    showBaseline?: boolean;
  }>(),  {
    employees: () => [],
    today: () => new Date(),
    view: "day",
    leftPanelWidth: 480,
    rowHeight: 38,
    enableUndoShortcut: true,
    defaultExpandedIds: undefined,
    defaultCheckedIds: undefined,
    labels: undefined,
    showValidation: true,
    planningMode: "schedule",
    sprints: () => [],
    showSprintBands: false,
    barColorMode: undefined,
    dependencyDisplay: "all",
    resourceLabel: "nickname",
    baselineTasks: () => [],
    showBaseline: false,
  }
);

const emit = defineEmits<{
  (e: "update:tasks", tasks: GanttTask[]): void;
  (e: "change", event: GanttChangeEvent): void;
  (e: "validation", value: GanttValidation): void;
}>();

/** Merged labels: defaults overridden by any provided `labels`. */
const t = computed<GanttLabels>(() => ({ ...defaultGanttLabels, ...props.labels }));

// --- Task data engine (state + mutation primitives) ---
const {
  expandedIds,
  parsedTasks,
  flattenedTasks,
  validation,
  employeeLookup,
  employeeOptions,
  toggleExpand,
  isTaskChecked,
  toggleTaskCheck,
  nextTaskId,
  normalizePicResources,
  deriveOwnerFromResources,
  rechainDependenciesWithinParent,
  createTask,
  updateTask,
  removeTask,
  reorderTask,
  updateTaskDate,
  unscheduleTask,
  commitTaskDateChange,
  undoLastDateChange,
} = useGanttState({
  source: () => props.tasks,
  employees: () => props.employees,
  defaultExpandedIds: () => props.defaultExpandedIds,
  defaultCheckedIds: () => props.defaultCheckedIds,
  onUpdateTasks: (tasks) => emit("update:tasks", tasks),
  onChange: (event) => emit("change", event),
});

// Surface validation changes to the host (e.g. for toasts / save gating).
watch(validation, (value) => emit("validation", value), { deep: true });

// --- Timeline layout (view concerns) ---
const today = computed(() => startOfDay(props.today));
const activeView = computed<ViewMode>(() => props.view);

const planBounds = computed(() => {
  const scheduled = parsedTasks.value.filter((task) => task.isScheduled);
  const minStart = scheduled.reduce((acc, task) => (task.startDate < acc ? task.startDate : acc), scheduled[0]?.startDate ?? today.value);
  const maxEnd = scheduled.reduce((acc, task) => (task.endDate > acc ? task.endDate : acc), scheduled[0]?.endDate ?? today.value);

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

const slots = computed(() => buildSlots(activeView.value, planBounds.value.start, planBounds.value.end, today.value));
const slotSize = computed(() => slotPixelWidth(activeView.value));
const timelineWidth = computed(() => slots.value.length * slotSize.value);

const monthGroups = computed(() => {
  const groups: Array<{ label: string; span: number }> = [];
  slots.value.forEach((slot) => {
    const last = groups[groups.length - 1];
    if (last?.label === slot.groupLabel) last.span += 1;
    else groups.push({ label: slot.groupLabel, span: 1 });
  });
  return groups;
});

const todayColumn = computed(() => {
  const index = slots.value.findIndex((slot) => slot.isToday);
  return index >= 0 ? index + 1 : null;
});
const sprintValidations = computed(() => {
  const map = new Map<number, SprintScheduleValidation>();
  parsedTasks.value.forEach((task) => {
    map.set(task.id, validateTaskSprintSchedule(task, props.sprints));
  });
  return map;
});

// --- Hover + summary edit lock (UI) ---
const hoveredTaskId = ref<number | null>(null);
const searchQuery = ref("");
const allowSummaryEdit = ref(false);
const filteredFlattenedTasks = computed(() => {
  const query = searchQuery.value.trim().toLowerCase();
  if (!query) return flattenedTasks.value;
  const source = parsedTasks.value;
  const matched = new Set<number>();
  source.forEach((task) => {
    if (!`${task.name} ${task.owner} ${task.status}`.toLowerCase().includes(query)) return;
    matched.add(task.id);
    let parentId = task.parentId;
    while (parentId !== null) {
      matched.add(parentId);
      expandedIds.add(parentId);
      parentId = source.find((item) => item.id === parentId)?.parentId ?? null;
    }
  });
  return flattenedTasks.value.filter((task) => matched.has(task.id));
});

// --- Quick resource modal (UI) ---
const resourceModalOpen = ref(false);
const selectedTaskForResource = ref<FlattenedTask | null>(null);
const resourceDraft = reactive<{ employeeId: string; allocation: number }>({ employeeId: "", allocation: 100 });
const resourceEditItems = ref<Resource[]>([]);

function openResourceModal(task: FlattenedTask) {
  selectedTaskForResource.value = task;
  resourceEditItems.value = task.resources.map((res) => ({ ...res }));
  resourceDraft.employeeId = "";
  resourceDraft.allocation = 100;
  resourceModalOpen.value = true;
}

function addQuickResource() {
  if (!resourceDraft.employeeId) return;
  if (resourceEditItems.value.some((res) => res.employeeId === resourceDraft.employeeId)) return;
  const employee = employeeLookup.value.get(resourceDraft.employeeId);
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
  updateTask(taskId, { owner, resources: normalized });
  emit("change", { type: "resources", id: taskId, resources: normalized });
  resourceModalOpen.value = false;
}

// --- Task form modal (UI) ---
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
  phaseId: GanttPhase;
  resources: Resource[];
  sprintId: string;
  effortValue: number | undefined;
  effortUnit: "hours" | "person-days" | "story-points";
  weight: number | undefined;
  dependencies: GanttTaskDependency[];
}>({
  name: "",
  status: "on-track",
  progress: 0,
  kind: "task",
  dateRange: [],
  phaseId: "general",
  resources: [],
  sprintId: "",
  effortValue: undefined,
  effortUnit: "story-points",
  weight: undefined,
  dependencies: [],
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
const sprintOptions = computed(() => [
  { value: "", label: "Unassigned" },
  ...props.sprints.map((sprint) => ({ value: sprint.id, label: sprint.name })),
]);
const effortUnitOptions = [
  { value: "hours", label: "Hours" },
  { value: "person-days", label: "Person-days" },
  { value: "story-points", label: "Story Points" },
];
const phaseOptions = ganttPhaseCatalog.map((phase) => ({ value: phase.id, label: phase.label }));
const taskFormDescendantIds = computed(() => {
  const editingId = taskModalEditingId.value;
  if (editingId === null) return new Set<number>();
  const ids = new Set<number>();
  const collect = (parentId: number) => {
    for (const task of parsedTasks.value) {
      if (task.parentId === parentId && !ids.has(task.id)) {
        ids.add(task.id);
        collect(task.id);
      }
    }
  };
  collect(editingId);
  return ids;
});
const predecessorOptions = computed(() =>
  parsedTasks.value
    .filter((task) => task.id !== taskModalEditingId.value && !taskFormDescendantIds.value.has(task.id))
    .map((task) => ({ value: task.id, label: task.code ? `${task.code} · ${task.name}` : task.name }))
);
const taskFormPredecessorIds = computed<Array<string | number>>({
  get: () => taskForm.dependencies.map((dep) => dep.predecessorId),
  set: (ids) => {
    taskForm.dependencies = ids.map((id) => ({ predecessorId: Number(id), type: "finish-to-start" }));
  },
});
const taskFormPreviewTask = computed<GanttTask>(() => ({
  id: taskModalEditingId.value ?? 0,
  parentId: taskModalTargetParentId.value,
  code: "",
  name: taskForm.name,
  owner: "Preview",
  status: taskForm.status,
  progress: taskForm.progress,
  kind: taskForm.kind,
  start: taskForm.dateRange[0] ?? "",
  end: taskForm.dateRange[1] ?? taskForm.dateRange[0] ?? "",
  resources: taskForm.resources,
  phaseId: taskForm.phaseId,
  sprintId: taskForm.sprintId || undefined,
}));
const taskFormSprintValidation = computed(() => validateTaskSprintSchedule(taskFormPreviewTask.value, props.sprints));
const taskFormSuggestedSprint = computed(() => {
  const start = taskForm.dateRange[0];
  return start && !taskForm.sprintId ? findSprintForDate(new Date(start), props.sprints) : undefined;
});

function resetTaskForm() {
  taskForm.name = "";
  taskForm.status = "on-track";
  taskForm.progress = 0;
  taskForm.kind = "task";
  taskForm.dateRange = [];
  taskForm.phaseId = "general";
  taskForm.resources = [];
  taskForm.sprintId = "";
  taskForm.effortValue = undefined;
  taskForm.effortUnit = "story-points";
  taskForm.weight = undefined;
  taskForm.dependencies = [];
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
  if (task.lock?.rename) return;
  taskModalMode.value = "edit";
  taskModalTargetParentId.value = task.parentId;
  taskModalEditingId.value = task.id;
  taskForm.name = task.name;
  taskForm.status = task.status;
  taskForm.progress = task.progress;
  taskForm.kind = task.kind;
  taskForm.dateRange = task.start && task.end ? [task.start, task.end] : [];
  taskForm.phaseId = task.phaseId ?? phaseFromLegacyColor(task.phaseColor);
  taskForm.resources = normalizePicResources(task.resources, task.owner);
  taskForm.sprintId = task.sprintId ?? "";
  taskForm.effortValue = task.effort?.value;
  taskForm.effortUnit = task.effort?.unit ?? "story-points";
  taskForm.weight = task.weight;
  taskForm.dependencies = normalizeDependencies(task.dependencies);
  taskModalOpen.value = true;
}

function phaseFromLegacyColor(color: GanttTask["phaseColor"]): GanttPhase {
  if (color === "green") return "research";
  if (color === "pink") return "design";
  if (color === "blue") return "development";
  if (color === "orange") return "release";
  if (color === "gray") return "analysis";
  return "general";
}

function onAddTask(anchorTask: FlattenedTask) {
  openAddChildModal(anchorTask);
}

function onEditTask(task: FlattenedTask) {
  openEditTaskModal(task);
}

function onEditTaskFromTimeline(taskId: number) {
  const task = filteredFlattenedTasks.value.find((item) => item.id === taskId);
  if (!task) return;
  openEditTaskModal(task);
}

function removeEditingTask() {
  if (taskModalMode.value !== "edit" || taskModalEditingId.value === null) return;
  const task = parsedTasks.value.find((item) => item.id === taskModalEditingId.value);
  if (task?.lock?.delete) return;
  taskDeleteConfirmOpen.value = true;
}

function requestDeleteTask(task: FlattenedTask) {
  if (task.lock?.delete) return;
  taskModalEditingId.value = task.id;
  taskDeleteConfirmOpen.value = true;
}

function requestRemoveFromTimeline(task: FlattenedTask) {
  if (task.lock?.move) return;
  unscheduleTask(task.id);
}

function confirmRemoveEditingTask() {
  if (taskModalEditingId.value === null) return;
  removeTask(taskModalEditingId.value);
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
  const progress = Math.max(0, Math.min(100, taskForm.progress));
  const effort = taskForm.effortValue !== undefined && taskForm.effortValue > 0 ? { value: taskForm.effortValue, unit: taskForm.effortUnit } : undefined;
  const sprintId = props.planningMode === "sprint" && taskForm.sprintId ? taskForm.sprintId : undefined;
  const phaseId = taskForm.phaseId;

  if (taskModalMode.value === "edit" && taskModalEditingId.value !== null) {
    updateTask(taskModalEditingId.value, {
      name,
      owner: derivedOwner,
      status: taskForm.status,
      progress,
      kind: taskForm.kind,
      start,
      end,
      resources: resourceList,
      phaseId,
      sprintId,
      dependencies: taskForm.dependencies,
      effort,
      weight: taskForm.weight ?? undefined,
    });
  } else {
    createTask({
      id: nextTaskId(),
      parentId: taskModalMode.value === "add-child" ? taskModalTargetParentId.value : null,
      code: "",
      name,
      owner: derivedOwner,
      status: taskForm.status,
      progress,
      kind: taskForm.kind,
      start,
      end,
      resources: resourceList,
      phaseId,
      sprintId,
      source: "user",
      dependencies: taskForm.dependencies,
      effort,
      weight: taskForm.weight ?? undefined,
    });
  }
  taskModalOpen.value = false;
}

function addTaskFormResource() {
  if (!resourceDraft.employeeId) return;
  if (taskForm.resources.some((res) => res.employeeId === resourceDraft.employeeId)) return;
  const employee = employeeLookup.value.get(resourceDraft.employeeId);
  if (!employee) return;
  taskForm.resources.push({
    employeeId: employee.id,
    role: employee.role,
    allocation: Math.max(1, Math.min(100, resourceDraft.allocation)),
    isPic: taskForm.resources.length === 0,
  });
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

// --- Drag wiring (UI → state primitives) ---
const draggedRowTaskId = ref<number | null>(null);

function onRowDragStart(taskId: number) {
  draggedRowTaskId.value = taskId;
}

function onRowDropOn(targetTaskId: number) {
  if (draggedRowTaskId.value === null) return;
  reorderTask(draggedRowTaskId.value, targetTaskId);
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

// --- Keyboard (undo) ---
function onGlobalKeydown(event: KeyboardEvent) {
  const isUndo = (event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "z";
  if (!isUndo) return;
  event.preventDefault();
  undoLastDateChange();
}

onMounted(() => {
  if (props.enableUndoShortcut) window.addEventListener("keydown", onGlobalKeydown);
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

// --- Scroll sync ---
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
  <div
    class="gantt-chart"
    :style="{
      '--gantt-left-width': `${leftPanelWidth}px`,
      '--gantt-row-height': `${rowHeight}px`,
      '--gantt-sprint-header-height': showSprintBands && planningMode === 'sprint' ? '30px' : '0px',
    }"
  >
    <section class="card p-0 overflow-hidden border border-slate-200 dark:border-slate-700 dark:bg-slate-900 gantt-wrapper">
      <!-- Toolbar fixed di atas, tidak ikut scroll -->
      <div class="gantt-toolbar-wrapper">
        <GanttHeader
          :month-groups="[]"
          :slots="[]"
          :grid-columns="''"
          :left-panel-width="leftPanelWidth"
          :show-toolbar-only="true"
          :allow-summary-edit="allowSummaryEdit"
          :labels="t"
          @add-root-task="openAddRootModal"
          @toggle-summary-edit="allowSummaryEdit = !allowSummaryEdit"
          @search="searchQuery = $event"
        />
      </div>

      <!-- Validation banner: dependency violations + resource over-allocation -->
      <div v-if="showValidation && validation.hasIssues" class="gantt-validation">
        <div class="gantt-validation-head">
          <Icon name="alert-triangle" class="w-4 h-4" />
          <span>{{ t.validationHeading }}</span>
        </div>
        <ul class="gantt-validation-list">
          <li v-for="v in validation.dependencyViolations" :key="`dep-${v.taskId}-${v.predecessorId}`">
            <strong>{{ v.taskName }}</strong> {{ t.depViolationText }} (<em>{{ v.predecessorName }}</em>)
          </li>
          <li v-for="o in validation.overAllocations" :key="`alloc-${o.employeeId}`">
            <strong>{{ o.employeeName }}</strong> — {{ t.overAllocationText }} ({{ o.totalAllocation }}% @ {{ o.date }})
          </li>
        </ul>
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
              <span class="gantt-col-hdr gantt-col-hdr-task">{{ t.colTask }}</span>
              <span class="gantt-col-hdr gantt-col-hdr-start">{{ t.colStart }}</span>
              <span class="gantt-col-hdr gantt-col-hdr-end">{{ t.colDue }}</span>
              <span class="gantt-col-hdr gantt-col-hdr-progress">%</span>
              <span class="gantt-col-hdr gantt-col-hdr-resource">👤</span>
            </div>
          </div>
          <!-- Task List Body -->
          <div class="gantt-tasklist-body" ref="tasklistBodyRef" @scroll="syncTasklistBodyScroll">
            <GanttTaskRow
              v-for="(task, index) in filteredFlattenedTasks"
              :key="task.id"
              :task="task"
              :row-index="index + 1"
              :slots="[]"
              :grid-columns="`${leftPanelWidth}px`"
              :expanded-ids="expandedIds"
              :checked="isTaskChecked(task.id)"
              :is-hovered="hoveredTaskId === task.id"
              :can-move="!task.lock?.move"
              :can-rename="!task.lock?.rename"
              :can-delete="!task.lock?.delete"
              @mouseenter="hoveredTaskId = task.id"
              @mouseleave="hoveredTaskId = null"
              @toggle-expand="toggleExpand"
              @toggle-check="toggleTaskCheck"
              @open-resource="openResourceModal"
              @add-task="onAddTask"
              @edit-task="onEditTask"
              @remove-from-timeline="requestRemoveFromTimeline"
              @delete-task="requestDeleteTask"
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
              <GanttSprintHeader v-if="showSprintBands && planningMode === 'sprint'" :sprints="sprints" :slots="slots" :slot-size="slotSize" />
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
            <div class="gantt-timeline-canvas" :style="{ width: `${timelineWidth}px`, height: `${filteredFlattenedTasks.length * rowHeight}px` }">
              <GanttTimeline
                :tasks="filteredFlattenedTasks"
                :slots="slots"
                :slot-size="slotSize"
                :left-panel-width="0"
                :today-column="todayColumn"
                :row-height="rowHeight"
                :hovered-task-id="hoveredTaskId"
                :editable-summary-bars="allowSummaryEdit"
                :planning-mode="planningMode"
                :bar-color-mode="barColorMode"
                :sprints="sprints"
                :employees="employees"
                :baseline-tasks="baselineTasks"
                :show-baseline="showBaseline"
                :resource-label="resourceLabel"
                :sprint-validations="sprintValidations"
                @hover="hoveredTaskId = $event"
                @unhover="hoveredTaskId = null"
                @task-date-change="updateTaskDate"
                @task-date-commit="commitTaskDateChange"
                @timeline-drop-task="onTimelineDropTask"
                @unschedule-task="unscheduleTask"
                @edit-task="onEditTaskFromTimeline"
              />
              <GanttDependencyLines :tasks="filteredFlattenedTasks" :slots="slots" :slot-size="slotSize" :left-panel-width="0" :row-height="rowHeight" :active-task-id="hoveredTaskId" :display-mode="dependencyDisplay" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Resource Modal -->
    <Modal :open="resourceModalOpen" @close="resourceModalOpen = false" @confirm="saveQuickResource" :confirmText="t.resourceModalSave" :cancelText="t.cancel" :title="t.resourceModalTitle" :description="t.resourceModalDescription" size="md">
      <div v-if="selectedTaskForResource" class="py-4 space-y-6">
        <!-- Info Task -->
        <div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider mb-1">{{ t.taskNameLabel }}</p>
          <p class="text-slate-800 dark:text-slate-200 font-semibold text-base">{{ selectedTaskForResource.name }}</p>
        </div>

        <!-- Add Assignee Mockup -->
        <div class="space-y-2">
          <label class="block text-sm font-medium">{{ t.addResourceLabel }}</label>
          <div class="grid grid-cols-[1fr_100px_auto] gap-2">
            <SelectInput v-model="resourceDraft.employeeId" :options="employeeOptions" size="sm" clearable :placeholder="t.employeePlaceholder" />
            <Input v-model.number="resourceDraft.allocation" size="sm" type="number" min="1" max="100" />
            <Button color="success" class="flex items-center gap-2" @click="addQuickResource">
              <Icon name="plus" class="w-4 h-4" />
              <span>{{ t.addButton }}</span>
            </Button>
          </div>
        </div>

        <!-- Assigned Resources List -->
        <div>
          <p class="block text-sm font-medium mb-3">{{ t.currentAssignees }}</p>
          <div v-if="resourceEditItems.length > 0" class="space-y-2">
            <div v-for="(res, idx) in resourceEditItems" :key="idx" class="group flex items-center justify-between p-3 bg-base-100 rounded-lg border border-base-300 transition-colors shadow-sm hover:border-base-content/30">
              <div class="flex items-center gap-3">
                <Avatar :fallback="(employeeLookup.get(res.employeeId ?? '')?.name ?? res.role).substring(0, 2).toUpperCase()" size="md" />
                <div>
                  <p class="text-sm font-semibold text-base-content">{{ employeeLookup.get(res.employeeId ?? "")?.name ?? t.unknownEmployee }} <span v-if="res.isPic" class="text-[10px] text-primary">({{ t.pic }})</span></p>
                  <p class="text-xs text-base-content/60">{{ res.role }} · {{ res.allocation ?? 100 }}%</p>
                </div>
              </div>

              <div class="flex items-center gap-2">
                <label class="text-xs inline-flex items-center gap-1">
                  <input type="radio" name="quick-pic" :checked="Boolean(res.isPic)" @change="setQuickPic(idx)" />
                  {{ t.pic }}
                </label>
                <button type="button" class="icon-btn icon-btn-soft-error icon-btn-sm opacity-0 group-hover:opacity-100 focus:opacity-100" :title="t.removeAssignee" @click="removeQuickResource(idx)">
                  <Icon name="trash" class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-col items-center justify-center p-6 border-2 border-dashed border-base-300 rounded-lg bg-base-200/50">
            <Icon name="users" class="w-8 h-8 text-base-content/40 mb-2" />
            <p class="text-sm text-base-content/70 font-medium">{{ t.noAssignees }}</p>
            <p class="text-xs text-base-content/50 mt-1">{{ t.noAssigneesHint }}</p>
          </div>
        </div>
      </div>
    </Modal>

    <Modal
      :open="taskModalOpen"
      @close="taskModalOpen = false"
      :title="taskModalMode === 'edit' ? t.editTaskTitle : t.addTaskTitle"
      :description="t.taskModalDescription"
      size="md"
    >
      <div class="py-3 space-y-3">
        <label class="task-form-field">
          <span>{{ t.taskNameLabel }}</span>
          <Input v-model="taskForm.name" size="sm" :placeholder="t.taskNamePlaceholder" />
        </label>
        <div class="task-form-grid">
          <label class="task-form-field">
            <span>{{ t.kindLabel }}</span>
            <SelectDropdown v-model="taskForm.kind" :options="kindOptions" size="sm" variant="outline" color="default" />
          </label>
          <label class="task-form-field">
            <span>{{ t.statusLabel }}</span>
            <SelectDropdown v-model="taskForm.status" :options="statusOptions" size="sm" variant="outline" color="default" />
          </label>
        </div>
        <div class="task-form-field">
          <span>Phase</span>
          <SelectDropdown v-model="taskForm.phaseId" :options="phaseOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="task-form-field">
          <span>{{ t.dateRangeLabel }}</span>
          <DateTimePicker
            v-model="taskForm.dateRange"
            mode="range"
            clearable
            :placeholder="t.dateRangePlaceholder"
            input-class="input input-sm w-full bg-white"
          />
        </div>
        <div class="task-form-field">
          <span>{{ t.progressLabel }}</span>
          <div class="task-progress-row">
            <input v-model.number="taskForm.progress" type="number" min="0" max="100" class="task-form-input task-progress-input" />
            <input v-model.number="taskForm.progress" type="range" min="0" max="100" class="range range-primary task-progress-slider" />
          </div>
        </div>
        <div v-if="planningMode === 'sprint'" class="task-form-field">
          <span>Committed Sprint</span>
          <SelectDropdown v-model="taskForm.sprintId" :options="sprintOptions" size="sm" variant="outline" color="default" />
          <small v-if="taskFormSprintValidation.hasIssue" class="task-form-warning">
            {{ taskFormSprintValidation.message }}
          </small>
          <small v-else-if="taskFormSuggestedSprint && !taskForm.sprintId" class="task-form-hint">
            Suggested Sprint: {{ taskFormSuggestedSprint.name }} based on task start date.
            <button type="button" @click="taskForm.sprintId = taskFormSuggestedSprint?.id ?? ''">Use suggestion</button>
          </small>
        </div>
        <div class="task-form-field">
          <span>Depends On (Predecessors)</span>
          <MultiSelect v-model="taskFormPredecessorIds" :options="predecessorOptions" size="sm" placeholder="Select predecessor task(s)" />
          <small class="task-form-hint">Finish-to-start: this task starts after every selected predecessor finishes.</small>
        </div>
        <div class="task-form-grid">
          <label class="task-form-field">
            <span>Effort</span>
            <Input v-model.number="taskForm.effortValue" size="sm" type="number" min="0" />
          </label>
          <label class="task-form-field">
            <span>Effort Unit</span>
            <SelectDropdown v-model="taskForm.effortUnit" :options="effortUnitOptions" size="sm" variant="outline" color="default" />
          </label>
        </div>
        <label class="task-form-field">
          <span>Weight</span>
          <Input v-model.number="taskForm.weight" size="sm" type="number" min="0" />
        </label>
        <div class="task-form-field">
          <span>{{ t.resourcesLabel }}</span>
          <div class="grid grid-cols-[1fr_100px_auto] gap-2">
            <SelectInput v-model="resourceDraft.employeeId" :options="employeeOptions" size="sm" clearable :placeholder="t.employeePlaceholder" />
            <Input v-model.number="resourceDraft.allocation" size="sm" type="number" min="1" max="100" />
            <Button color="success" @click="addTaskFormResource">{{ t.addButton }}</Button>
          </div>
          <div v-if="taskForm.resources.length" class="space-y-2 mt-2">
            <div v-for="(res, idx) in taskForm.resources" :key="`${res.role}-${idx}`" class="group flex items-center justify-between p-2 bg-base-100 rounded-lg border border-base-300 transition-colors hover:border-base-content/30">
              <div class="flex items-center gap-3">
                <Avatar :fallback="(employeeLookup.get(res.employeeId ?? '')?.name ?? res.role).substring(0, 2).toUpperCase()" size="sm" />
                <div>
                  <p class="text-xs font-semibold text-base-content">{{ employeeLookup.get(res.employeeId ?? "")?.name ?? t.unknownEmployee }} <span v-if="res.isPic" class="text-[10px] text-primary">({{ t.pic }})</span></p>
                  <p class="text-[11px] text-base-content/60">{{ res.role }} · {{ res.allocation ?? 100 }}%</p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-xs inline-flex items-center gap-1">
                  <input type="radio" name="taskform-pic" :checked="Boolean(res.isPic)" @change="setTaskFormPic(idx)" />
                  {{ t.pic }}
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
          <button v-if="taskModalMode === 'edit' && !parsedTasks.find((item) => item.id === taskModalEditingId)?.lock?.delete" type="button" class="btn btn-sm btn-soft-error" @click="removeEditingTask">{{ t.removeTaskList }}</button>
          <div class="ml-auto flex items-center gap-2">
            <Button variant="ghost" color="default" @click="taskModalOpen = false">{{ t.cancel }}</Button>
            <Button color="primary" @click="submitTaskModal">{{ taskModalMode === "edit" ? t.updateTaskButton : t.addTaskButton }}</Button>
          </div>
        </div>
      </template>
    </Modal>

    <Modal
      :open="taskDeleteConfirmOpen"
      @close="taskDeleteConfirmOpen = false"
      @confirm="confirmRemoveEditingTask"
      :confirmText="t.deleteConfirmYes"
      :cancelText="t.cancel"
      :title="t.deleteConfirmTitle"
      :description="t.deleteConfirmDescription"
      size="sm"
    >
      <p class="text-sm text-base-content/80">{{ t.deleteConfirmBody }}</p>
    </Modal>
  </div>
</template>

<style scoped>
.gantt-wrapper {
  --gantt-month-header-height: 36px;
  --gantt-slot-header-height: 32px;
  --gantt-total-header-height: calc(var(--gantt-month-header-height) + var(--gantt-sprint-header-height, 0px) + var(--gantt-slot-header-height));
  display: flex;
  flex-direction: column;
  max-height: 80vh;
}

.gantt-toolbar-wrapper {
  flex-shrink: 0;
  z-index: 30;
}

.gantt-validation {
  flex-shrink: 0;
  padding: 0.55rem 1rem;
  background: #fffbeb;
  border-bottom: 1px solid #fde68a;
  color: #92400e;
}

.gantt-validation-head {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.74rem;
  font-weight: 700;
}

.gantt-validation-list {
  margin: 0.3rem 0 0;
  padding-left: 1.4rem;
  list-style: disc;
  font-size: 0.7rem;
  line-height: 1.5;
}

.gantt-validation-list em {
  font-style: normal;
  font-weight: 600;
}

:global(.dark .gantt-validation),
:global([data-theme="mitrekadark"] .gantt-validation) {
  background: rgba(120, 53, 15, 0.28);
  border-bottom-color: rgba(180, 83, 9, 0.55);
  color: #fcd34d;
}

.gantt-main {
  display: flex;
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

/* Task List (kiri) */
.gantt-tasklist {
  width: var(--gantt-left-width, 480px);
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
  height: var(--gantt-total-header-height);
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
  border-bottom: none;
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
  min-height: var(--gantt-month-header-height);
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
  min-height: var(--gantt-slot-header-height);
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

.task-form-warning {
  color: #b45309;
  font-size: 0.68rem;
  font-weight: 700;
}

.task-form-hint {
  color: #2563eb;
  font-size: 0.68rem;
  font-weight: 700;
}

.task-form-hint button {
  margin-left: 0.35rem;
  text-decoration: underline;
  font-weight: 800;
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

:global(.dark .gantt-tasklist),
:global([data-theme="mitrekadark"] .gantt-tasklist) {
  background: #0f172a;
  border-right-color: #334155;
}

:global(.dark .gantt-tasklist-header),
:global([data-theme="mitrekadark"] .gantt-tasklist-header) {
  background: #111827;
  border-bottom-color: #334155;
}

:global(.dark .gantt-col-headers),
:global([data-theme="mitrekadark"] .gantt-col-headers) {
  color: #94a3b8;
}

:global(.dark .gantt-timeline-header),
:global([data-theme="mitrekadark"] .gantt-timeline-header) {
  border-bottom-color: #334155;
}

:global(.dark .gantt-month-row),
:global([data-theme="mitrekadark"] .gantt-month-row) {
  background: #111827;
  border-bottom-color: #334155;
}

:global(.dark .gantt-month-cell),
:global([data-theme="mitrekadark"] .gantt-month-cell) {
  color: #94a3b8;
  border-right-color: rgba(51, 65, 85, 0.85);
}

:global(.dark .gantt-day-row),
:global([data-theme="mitrekadark"] .gantt-day-row) {
  background: #0f172a;
}

:global(.dark .gantt-day-cell),
:global([data-theme="mitrekadark"] .gantt-day-cell) {
  color: #a8b4c6;
  border-right-color: rgba(51, 65, 85, 0.75);
}

:global(.dark .gantt-day-cell small),
:global([data-theme="mitrekadark"] .gantt-day-cell small) {
  color: #64748b;
}

:global(.dark .today-cell),
:global([data-theme="mitrekadark"] .today-cell) {
  background: rgba(239, 68, 68, 0.12);
  color: #f87171;
}
</style>
