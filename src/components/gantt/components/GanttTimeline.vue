<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from "vue";
import GanttTaskTooltip from "./GanttTaskTooltip.vue";
import { ganttPhaseCatalog } from "../types";
import type { BarColorMode, FlattenedTask, GanttEmployee, GanttSprint, GanttTask, PlanningMode, ResourceLabelMode, SprintScheduleValidation, TimeSlot } from "../types";
import { normalizeDependencies, rangeForTask, startOfDay, endOfDay } from "../utils";

const props = defineProps<{
  tasks: FlattenedTask[];
  slots: TimeSlot[];
  slotSize: number;
  leftPanelWidth: number;
  todayColumn: number | null;
  rowHeight: number;
  hoveredTaskId?: number | null;
  editableSummaryBars?: boolean;
  planningMode?: PlanningMode;
  barColorMode?: BarColorMode;
  sprints?: GanttSprint[];
  employees?: GanttEmployee[];
  baselineTasks?: GanttTask[];
  showBaseline?: boolean;
  resourceLabel?: ResourceLabelMode;
  sprintValidations?: Map<number, SprintScheduleValidation>;
}>();

const emit = defineEmits<{
  hover: [id: number];
  unhover: [];
  taskDateChange: [payload: { id: number; start: Date; end: Date }];
  taskDateCommit: [payload: { id: number; fromStart: Date; fromEnd: Date; toStart: Date; toEnd: Date }];
  timelineDropTask: [payload: { taskId: number; slotIndex: number }];
  unscheduleTask: [taskId: number];
  editTask: [taskId: number];
}>();

type DragMode = "move" | "resize-start" | "resize-end";
type DragState = {
  taskId: number;
  mode: DragMode;
  originX: number;
  startIndex: number;
  endIndex: number;
  span: number;
  originalStart: Date;
  originalEnd: Date;
};

let dragState: DragState | null = null;
const DRAG_THRESHOLD_PX = 6;
const dragTooltip = ref<{ x: number; y: number; text: string } | null>(null);
const tooltipState = ref<{ task: FlattenedTask; x: number; y: number } | null>(null);
const tooltipRef = ref<InstanceType<typeof GanttTaskTooltip> | null>(null);
const tooltipSize = ref({ width: 0, height: 0 });
const TOOLTIP_OFFSET = 12;
const TOOLTIP_VIEWPORT_MARGIN = 8;

const tooltipStyle = computed(() => {
  if (!tooltipState.value) return {};
  const { x, y } = tooltipState.value;
  const { width, height } = tooltipSize.value;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  let left = x + TOOLTIP_OFFSET;
  if (width && left + width > viewportWidth - TOOLTIP_VIEWPORT_MARGIN) {
    left = x - width - TOOLTIP_OFFSET;
  }
  left = Math.max(TOOLTIP_VIEWPORT_MARGIN, left);

  let top = y + TOOLTIP_OFFSET;
  if (height && top + height > viewportHeight - TOOLTIP_VIEWPORT_MARGIN) {
    top = y - height - TOOLTIP_OFFSET;
  }
  top = Math.max(TOOLTIP_VIEWPORT_MARGIN, top);

  return { left: `${left}px`, top: `${top}px` };
});

async function measureTooltip() {
  await nextTick();
  const el = tooltipRef.value?.$el as HTMLElement | undefined;
  if (el) tooltipSize.value = { width: el.offsetWidth, height: el.offsetHeight };
}
const sprintLookup = computed(() => new Map((props.sprints ?? []).map((sprint) => [sprint.id, sprint])));
const employeeLookup = computed(() => new Map((props.employees ?? []).map((employee) => [employee.id, employee])));
const baselineLookup = computed(() => new Map((props.baselineTasks ?? []).map((task) => [task.id, task])));
const phaseLookup = computed(() => new Map(ganttPhaseCatalog.map((phase) => [phase.id, phase])));
const visibleSprintBands = computed(() => {
  if (props.planningMode !== "sprint") return [];
  return (props.sprints ?? [])
    .map((sprint, index) => {
      const start = startOfDay(new Date(sprint.start));
      const end = endOfDay(new Date(sprint.end));
      const active = props.slots.map((slot, slotIndex) => ({ slot, slotIndex })).filter(({ slot }) => end >= slot.start && start <= slot.end);
      if (!active.length) return null;
      const first = active[0].slotIndex;
      const last = active[active.length - 1].slotIndex;
      return {
        id: sprint.id,
        left: first * props.slotSize,
        width: (last - first + 1) * props.slotSize,
        tone: index % 2 === 0 ? "a" : "b",
      };
    })
    .filter((item): item is { id: string; left: number; width: number; tone: "a" | "b" } => Boolean(item));
});

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function timelineColumns() {
  return `repeat(${props.slots.length}, ${props.slotSize}px)`;
}

function baselineBarStyle(task: FlattenedTask) {
  const baseline = baselineLookup.value.get(task.id);
  if (!baseline?.start || !baseline.end) return { display: "none" };
  const baselineTask = {
    ...task,
    start: baseline.start,
    end: baseline.end,
    startDate: startOfDay(new Date(baseline.start)),
    endDate: endOfDay(new Date(baseline.end)),
    isScheduled: true,
  };
  return taskBarStyle(baselineTask);
}

function onBarEnter(task: FlattenedTask, event: MouseEvent) {
  emit("hover", task.id);
  tooltipState.value = { task, x: event.clientX, y: event.clientY };
  measureTooltip();
}

function onBarMove(event: MouseEvent) {
  if (!tooltipState.value) return;
  tooltipState.value = { ...tooltipState.value, x: event.clientX, y: event.clientY };
}

function onBarLeave() {
  emit("unhover");
  tooltipState.value = null;
}

function taskBarStyle(task: FlattenedTask) {
  const range = rangeForTask(task, props.slots);
  if (!range) return { display: "none" };
  return {
    gridColumn: `${range.start} / span ${task.kind === "milestone" ? 1 : Math.max(1, range.span)}`,
  };
}

function onTimelineDrop(event: DragEvent) {
  const taskIdRaw = event.dataTransfer?.getData("application/x-gantt-task-id");
  if (!taskIdRaw) return;
  const taskId = Number(taskIdRaw);
  if (!Number.isFinite(taskId)) return;
  const target = event.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const slotIndex = clamp(Math.floor(x / props.slotSize), 0, props.slots.length - 1);
  emit("timelineDropTask", { taskId, slotIndex });
}

function getTaskRange(task: FlattenedTask) {
  return rangeForTask(task, props.slots);
}

function barStyle(task: FlattenedTask) {
  const base = taskBarStyle(task);
  if (base.display === "none") return base;
  const mode = props.barColorMode ?? "phase";
  const color = resolveBarColor(task, mode);
  return color ? { ...base, background: `linear-gradient(90deg, ${color}, ${lightenHex(color)})`, "--gantt-bar-color": color } : base;
}

const STATUS_BAR_COLOR: Record<FlattenedTask["status"], string> = {
  "on-track": "#2563eb",
  "at-risk": "#f59e0b",
  done: "#16a34a",
};

function resolvePhaseColor(task: FlattenedTask) {
  if (task.phaseId) return phaseLookup.value.get(task.phaseId)?.color;
  if (task.phaseColor === "green") return "#16a34a";
  if (task.phaseColor === "pink") return "#db2777";
  if (task.phaseColor === "blue") return "#2563eb";
  if (task.phaseColor === "orange") return "#ea580c";
  if (task.phaseColor === "gray") return "#64748b";
  return phaseLookup.value.get("general")?.color;
}

function resolveBarColor(task: FlattenedTask, mode: BarColorMode) {
  if (mode === "custom" && task.color) return task.color;
  if (mode === "status") return STATUS_BAR_COLOR[task.status] ?? resolvePhaseColor(task);
  // "sprint" intentionally falls through to phase: sprint identity must not drive bar color
  // (see docs/GANTT_WBS_SPRINT_CARRYOVER_PATCH_FOR_AGENT.md #4 — sprint background already carries the sprint meaning).
  return resolvePhaseColor(task);
}

function lightenHex(color: string) {
  if (!color.startsWith("#") || color.length !== 7) return color;
  const n = Number.parseInt(color.slice(1), 16);
  const r = Math.min(255, ((n >> 16) & 255) + 48);
  const g = Math.min(255, ((n >> 8) & 255) + 48);
  const b = Math.min(255, (n & 255) + 48);
  return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}

function progressStyle(task: FlattenedTask) {
  return { width: `${Math.max(4, Math.min(task.progress, 100))}%` };
}

function barClass(task: FlattenedTask) {
  if (task.kind === "summary") return "gantt-bar gantt-bar-summary";
  if (task.kind === "milestone") return "gantt-milestone";
  if (task.phaseColor) return `gantt-bar gantt-bar-phase-${task.phaseColor}`;
  if (task.status === "done") return "gantt-bar gantt-bar-done";
  if (task.status === "at-risk") return "gantt-bar gantt-bar-risk";
  return "gantt-bar gantt-bar-task";
}

function hasDependents(taskId: number) {
  return props.tasks.some((t) => normalizeDependencies(t.dependencies).some((dep) => dep.predecessorId === taskId));
}

function resourceLabelText(task: FlattenedTask) {
  if ((props.resourceLabel ?? "nickname") === "none" || !(props.employees ?? []).length) return "";
  const resources = task.resources.filter((resource) => resource.employeeId);
  if (!resources.length) return "";
  const pic = resources.find((resource) => resource.isPic) ?? resources[0];
  const employee = employeeLookup.value.get(pic.employeeId ?? "");
  if (!employee) return "";
  const label = props.resourceLabel === "name" ? employee.name : employee.nickname ?? initials(employee.name);
  return resources.length > 1 ? `${label} +${resources.length - 1}` : label;
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]?.toUpperCase()).join("") || "?";
}

function carryOverValidation(task: FlattenedTask) {
  return props.sprintValidations?.get(task.id);
}

function carryOverLabel(task: FlattenedTask) {
  const validation = carryOverValidation(task);
  if (!validation?.hasIssue || task.kind === "summary") return "";
  if (validation.entirelyOutsideAssignedSprint) return "!";
  const targetId = validation.crossedSprintIds[0];
  const target = targetId ? sprintLookup.value.get(targetId) : undefined;
  return target ? `↪ ${target.name.replace(/Sprint\s*/i, "S")}` : "↪";
}

function canEditTimeline(task: FlattenedTask) {
  return !(task.lock?.move || (task.kind === "summary" && props.editableSummaryBars === false));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function startDrag(task: FlattenedTask, mode: DragMode, event: PointerEvent) {
  if (!canEditTimeline(task)) return;
  const range = getTaskRange(task);
  if (!range || !props.slots.length) return;
  event.preventDefault();
  (event.currentTarget as HTMLElement | null)?.setPointerCapture?.(event.pointerId);

  const startIndex = range.start - 1;
  const endIndex = startIndex + range.span - 1;
  dragState = {
    taskId: task.id,
    mode,
    originX: event.clientX,
    startIndex,
    endIndex,
    span: range.span,
    originalStart: new Date(task.startDate),
    originalEnd: new Date(task.endDate),
  };

  window.addEventListener("pointermove", onPointerMove);
  window.addEventListener("pointerup", stopDrag);
  window.addEventListener("pointercancel", stopDrag);
  window.addEventListener("keydown", onKeyDown);
  window.addEventListener("blur", stopDrag);
}

function onPointerMove(event: PointerEvent) {
  if (!dragState || !props.slots.length) return;

  const dx = event.clientX - dragState.originX;
  if (Math.abs(dx) < DRAG_THRESHOLD_PX) return;
  const deltaSlots = Math.round(dx / props.slotSize);
  if (deltaSlots === 0) return;

  let nextStart = dragState.startIndex;
  let nextEnd = dragState.endIndex;

  if (dragState.mode === "move") {
    const maxStart = props.slots.length - dragState.span;
    nextStart = clamp(dragState.startIndex + deltaSlots, 0, maxStart);
    nextEnd = nextStart + dragState.span - 1;
  } else if (dragState.mode === "resize-start") {
    nextStart = clamp(dragState.startIndex + deltaSlots, 0, dragState.endIndex);
  } else {
    nextEnd = clamp(dragState.endIndex + deltaSlots, dragState.startIndex, props.slots.length - 1);
  }

  const task = props.tasks.find((item) => item.id === dragState?.taskId);
  const startSlot = props.slots[nextStart];
  const endSlot = props.slots[nextEnd];
  if (!task || !startSlot || !endSlot) return;
  dragTooltip.value = {
    x: event.clientX,
    y: event.clientY,
    text: `${formatDateLabel(startSlot.start)} - ${formatDateLabel(endSlot.end)}`,
  };

  emit("taskDateChange", {
    id: task.id,
    start: new Date(startSlot.start),
    end: new Date(endSlot.end),
  });
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key !== "Escape" || !dragState) return;
  emit("taskDateChange", {
    id: dragState.taskId,
    start: new Date(dragState.originalStart),
    end: new Date(dragState.originalEnd),
  });
  stopDrag();
}

function stopDrag() {
  if (dragState) {
    const task = props.tasks.find((item) => item.id === dragState?.taskId);
    if (task) {
      const changed = task.startDate.getTime() !== dragState.originalStart.getTime() || task.endDate.getTime() !== dragState.originalEnd.getTime();
      if (changed) {
        emit("taskDateCommit", {
          id: task.id,
          fromStart: new Date(dragState.originalStart),
          fromEnd: new Date(dragState.originalEnd),
          toStart: new Date(task.startDate),
          toEnd: new Date(task.endDate),
        });
      }
    }
  }
  dragTooltip.value = null;
  dragState = null;
  window.removeEventListener("pointermove", onPointerMove);
  window.removeEventListener("pointerup", stopDrag);
  window.removeEventListener("pointercancel", stopDrag);
  window.removeEventListener("keydown", onKeyDown);
  window.removeEventListener("blur", stopDrag);
}

onBeforeUnmount(() => {
  stopDrag();
});
</script>

<template>
  <div class="gantt-timeline-container" :style="{ left: `${leftPanelWidth}px`, width: `${slots.length * slotSize}px` }" @dragover.prevent @drop.prevent="onTimelineDrop">
    <div v-if="dragTooltip" class="gantt-drag-tooltip" :style="{ left: `${dragTooltip.x + 12}px`, top: `${dragTooltip.y - 30}px` }">
      {{ dragTooltip.text }}
    </div>
    <!-- Grid lines (vertical per slot + horizontal per row) -->
    <div class="gantt-grid-lines">
      <div
        v-for="band in visibleSprintBands"
        :key="`sprint-bg-${band.id}`"
        class="gantt-sprint-body-band"
        :class="`tone-${band.tone}`"
        :style="{ left: `${band.left}px`, width: `${band.width}px` }"
      ></div>
      <!-- Vertical lines per day/slot -->
      <div v-for="(slot, si) in slots" :key="`vline-${slot.key}`" class="gantt-vline" :class="{ 'is-today': slot.isToday }" :style="{ left: `${si * slotSize}px`, width: `${slotSize}px` }"></div>
      <!-- Horizontal lines per row -->
      <div v-for="(task, ti) in tasks" :key="`hline-${task.id}`" class="gantt-hline" :style="{ top: `${(ti + 1) * rowHeight}px` }"></div>
    </div>

    <!-- Today line - rendered once spanning full height -->
    <div v-if="todayColumn !== null" class="gantt-today-line-global" :style="{ left: `${(todayColumn - 1) * slotSize + slotSize / 2}px` }">
      <span class="gantt-today-dot"></span>
    </div>

    <div
      v-for="(task, index) in tasks"
      :key="`timeline-${task.id}`"
      class="gantt-track"
      :class="{
        'is-hovered': hoveredTaskId === task.id,
        'is-summary-track': task.kind === 'summary'
      }"
      :style="{
        gridTemplateColumns: timelineColumns(),
        top: `${index * rowHeight}px`,
      }"
      @mouseenter="emit('hover', task.id)"
      @mouseleave="emit('unhover')"
    >
      <div v-if="showBaseline" class="gantt-baseline-bar" :style="baselineBarStyle(task)"></div>

      <!-- Milestone -->
      <div
        v-if="task.kind === 'milestone'"
        :class="[barClass(task), { 'is-risk': task.status === 'at-risk', 'is-done': task.status === 'done', 'has-carry-over': Boolean(carryOverLabel(task)) }]"
        :style="barStyle(task)"
        @mouseenter="onBarEnter(task, $event)"
        @mousemove="onBarMove"
        @mouseleave="onBarLeave"
        @pointerdown="startDrag(task, 'move', $event)"
        @dblclick.stop="emit('editTask', task.id)"
      >
        <button v-if="!task.lock?.move" type="button" class="gantt-bar-remove" title="Remove from timeline" @pointerdown.stop @click.stop="emit('unscheduleTask', task.id)">x</button>
        <span class="gantt-milestone-diamond"></span>
        <span v-if="carryOverLabel(task)" class="gantt-carryover-marker" :title="carryOverValidation(task)?.message">{{ carryOverLabel(task) }}</span>
        <span class="gantt-bar-label-outside">{{ task.name }}</span>
      </div>

      <!-- Summary bar -->
      <div
        v-else-if="task.kind === 'summary'"
        :class="[barClass(task), { 'is-risk': task.status === 'at-risk', 'is-done': task.status === 'done' }]"
        :style="barStyle(task)"
        @mouseenter="onBarEnter(task, $event)"
        @mousemove="onBarMove"
        @mouseleave="onBarLeave"
        @pointerdown="startDrag(task, 'move', $event)"
        @dblclick.stop="emit('editTask', task.id)"
      >
        <button v-if="!task.lock?.move" type="button" class="gantt-bar-remove" title="Remove from timeline" @pointerdown.stop @click.stop="emit('unscheduleTask', task.id)">x</button>
        <span v-if="canEditTimeline(task)" class="gantt-handle gantt-handle-start" @pointerdown.stop="startDrag(task, 'resize-start', $event)"></span>
        <span v-if="canEditTimeline(task)" class="gantt-handle gantt-handle-end" @pointerdown.stop="startDrag(task, 'resize-end', $event)"></span>
        <span class="gantt-bar-label-outside gantt-label-summary">{{ task.name }}</span>
      </div>

      <!-- Task bar -->
      <div
        v-else
        :class="[barClass(task), { 'is-risk': task.status === 'at-risk', 'is-done': task.status === 'done', 'has-carry-over': Boolean(carryOverLabel(task)) }]"
        :style="barStyle(task)"
        @mouseenter="onBarEnter(task, $event)"
        @mousemove="onBarMove"
        @mouseleave="onBarLeave"
        @pointerdown="startDrag(task, 'move', $event)"
        @dblclick.stop="emit('editTask', task.id)"
      >
        <button v-if="!task.lock?.move" type="button" class="gantt-bar-remove" title="Remove from timeline" @pointerdown.stop @click.stop="emit('unscheduleTask', task.id)">x</button>
        <span v-if="canEditTimeline(task)" class="gantt-handle gantt-handle-start" @pointerdown.stop="startDrag(task, 'resize-start', $event)"></span>
        <span v-if="canEditTimeline(task)" class="gantt-handle gantt-handle-end" @pointerdown.stop="startDrag(task, 'resize-end', $event)"></span>
        <div class="gantt-progress-fill" :style="progressStyle(task)"></div>
        <span v-if="hasDependents(task.id)" class="gantt-bar-end-dot-bottom" :style="{ right: `${slotSize / 2 - 4}px` }"></span>
        <span v-if="carryOverLabel(task)" class="gantt-carryover-marker" :title="carryOverValidation(task)?.message">{{ carryOverLabel(task) }}</span>
        <span v-if="resourceLabelText(task)" class="gantt-resource-label">{{ resourceLabelText(task) }}</span>
        <span class="gantt-bar-label-outside">{{ task.name }}</span>
      </div>
    </div>

    <GanttTaskTooltip
      v-if="tooltipState"
      ref="tooltipRef"
      class="gantt-floating-tooltip"
      :style="tooltipStyle"
      :task="tooltipState.task"
      :employees="employees ?? []"
      :sprint="tooltipState.task.sprintId ? sprintLookup.get(tooltipState.task.sprintId) : null"
      :baseline-task="baselineLookup.get(tooltipState.task.id) ?? null"
      :sprint-validation="sprintValidations?.get(tooltipState.task.id) ?? null"
    />
  </div>
</template>

<style scoped>
.gantt-timeline-container {
  position: absolute;
  top: 0;
  height: 100%;
}

.gantt-drag-tooltip {
  position: fixed;
  z-index: 60;
  pointer-events: none;
  background: rgba(15, 23, 42, 0.95);
  color: #f8fafc;
  font-size: 0.65rem;
  font-weight: 600;
  padding: 4px 8px;
  border-radius: 6px;
  box-shadow: 0 6px 18px rgba(2, 6, 23, 0.35);
  white-space: nowrap;
}

.gantt-floating-tooltip {
  position: fixed;
  z-index: 80;
  pointer-events: none;
}

.gantt-baseline-bar {
  position: relative;
  align-self: center;
  height: 8px;
  margin: 21px 4px 0;
  border-radius: 999px;
  background: repeating-linear-gradient(90deg, rgba(100, 116, 139, 0.45), rgba(100, 116, 139, 0.45) 6px, rgba(148, 163, 184, 0.25) 6px, rgba(148, 163, 184, 0.25) 12px);
  border: 1px solid rgba(100, 116, 139, 0.45);
  pointer-events: none;
  z-index: 1;
}

.gantt-resource-label {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  max-width: calc(100% - 18px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #fff;
  font-size: 0.58rem;
  font-weight: 800;
  text-shadow: 0 1px 2px rgba(15, 23, 42, 0.35);
  pointer-events: none;
  z-index: 3;
}

.gantt-grid-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
}

.gantt-sprint-body-band {
  position: absolute;
  top: 0;
  bottom: 0;
  border-left: 1px solid rgba(100, 116, 139, 0.22);
  z-index: 0;
}

.gantt-sprint-body-band.tone-a {
  background: rgba(37, 99, 235, 0.055);
}

.gantt-sprint-body-band.tone-b {
  background: rgba(20, 184, 166, 0.05);
}

.gantt-vline {
  position: absolute;
  top: 0;
  bottom: 0;
  border-right: 1px solid rgba(226, 232, 240, 0.7);
}

.gantt-vline.is-today {
  background: rgba(239, 68, 68, 0.04);
}

.gantt-hline {
  position: absolute;
  left: 0;
  right: 0;
  height: 0;
  border-bottom: 1px solid rgba(226, 232, 240, 0.7);
}

.gantt-track {
  position: absolute;
  left: 0;
  right: 0;
  height: var(--gantt-row-height, 32px);
  display: grid;
  overflow: visible;
  transition: background-color 0.1s ease;
}

.gantt-track.is-summary-track {
  background: #b4c7d947;
}

.gantt-track.is-hovered {
  background: #c3dfff47;
}

.gantt-bar,
.gantt-milestone {
  position: relative;
  align-self: center;
  height: 14px;
  margin: 0 4px;
  border-radius: 3px;
  overflow: visible;
}

.gantt-bar {
  display: flex;
  align-items: center;
  min-width: 16px;
  cursor: grab;
  user-select: none;
  touch-action: none;
}

.gantt-bar:active {
  cursor: grabbing;
}

.gantt-bar-remove {
  position: absolute;
  top: -8px;
  right: -8px;
  width: 14px;
  height: 14px;
  border: none;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 0.62rem;
  line-height: 14px;
  text-align: center;
  cursor: pointer;
  opacity: 0;
  transition: opacity 120ms ease;
  z-index: 3;
}

.gantt-bar:hover .gantt-bar-remove,
.gantt-milestone:hover .gantt-bar-remove {
  opacity: 1;
}

.gantt-bar-summary {
  height: 12px;
  border-radius: 0;
  background: #334155;
  margin-top: 2px;
}

.gantt-bar-summary::before,
.gantt-bar-summary::after {
  content: "";
  position: absolute;
  top: 100%;
  width: 0;
  height: 0;
  background: transparent;
  border-radius: 0;
}

.gantt-bar-summary::before {
  left: 0;
  border-top: 6px solid var(--gantt-bar-color, #334155);
  border-right: 8px solid transparent;
}

.gantt-bar-summary::after {
  right: 0;
  border-top: 6px solid var(--gantt-bar-color, #334155);
  border-left: 8px solid transparent;
}

.gantt-bar-task {
  background: linear-gradient(90deg, #0ea5e9, #38bdf8);
}

.gantt-bar-risk {
  background: linear-gradient(90deg, #f59e0b, #fbbf24);
}

.gantt-bar-done {
  background: linear-gradient(90deg, #64748b, #94a3b8);
}

.gantt-bar-phase-green {
  background: linear-gradient(90deg, #16a34a, #4ade80);
}

.gantt-bar-phase-gray {
  background: linear-gradient(90deg, #64748b, #94a3b8);
}

.gantt-bar-phase-pink {
  background: linear-gradient(90deg, #db2777, #f472b6);
}

.gantt-bar-phase-orange {
  background: linear-gradient(90deg, #ea580c, #fb923c);
}

.gantt-bar-phase-blue {
  background: linear-gradient(90deg, #2563eb, #60a5fa);
}

.gantt-progress-fill {
  position: absolute;
  inset: 0 auto 0 0;
  background: rgba(0, 0, 0, 0.18);
  border-radius: 3px 0 0 3px;
  pointer-events: none;
}

.gantt-handle {
  position: absolute;
  top: -1px;
  width: 8px;
  height: 16px;
  border-radius: 9999px;
  background: rgba(255, 255, 255, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.7);
  opacity: 0;
  transition: opacity 120ms ease;
  z-index: 2;
}

.gantt-handle-start {
  left: -4px;
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
}

.gantt-handle-end {
  right: -4px;
  cursor: ew-resize;
  user-select: none;
  touch-action: none;
}

.gantt-bar:hover .gantt-handle {
  opacity: 1;
}

.gantt-bar-start-dot {
  display: none;
}

.gantt-bar-end-dot-bottom {
  position: absolute;
  bottom: -4px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #16a34a;
  border: 1.5px solid #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15);
  z-index: 8;
}

.gantt-carryover-marker {
  position: absolute;
  right: -28px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 6;
  border-radius: 999px;
  background: #f59e0b;
  color: #fff;
  padding: 0.08rem 0.28rem;
  font-size: 0.54rem;
  font-weight: 900;
  line-height: 1.2;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(15, 23, 42, 0.25);
}

.gantt-bar.has-carry-over .gantt-resource-label {
  right: 26px;
}

.gantt-bar.is-risk,
.gantt-milestone.is-risk {
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.75);
}

.gantt-bar.is-done:not(.gantt-bar-summary)::after {
  content: "✓";
  position: absolute;
  left: 4px;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  font-size: 0.58rem;
  font-weight: 900;
  z-index: 4;
}

.gantt-bar-label-outside {
  position: absolute;
  left: calc(100% + 10px);
  top: 50%;
  transform: translateY(-50%);
  white-space: nowrap;
  font-size: 0.65rem;
  font-weight: 500;
  color: #334155;
  pointer-events: none;
}

.gantt-label-summary {
  font-weight: 600;
  color: #475569;
  font-size: 0.66rem;
}

.gantt-milestone {
  display: flex;
  align-items: center;
  height: auto;
  margin: 0;
  overflow: visible;
  gap: 0.4rem;
}

.gantt-milestone-diamond {
  width: 12px;
  height: 12px;
  display: block;
  transform: rotate(45deg);
  border-radius: 2px;
  background: #f59e0b;
  box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.2);
  flex-shrink: 0;
}

.gantt-today-line-global {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background: #ef4444;
  z-index: 10;
}

.gantt-today-dot {
  position: absolute;
  top: -5px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ef4444;
}

:global(.dark .gantt-sprint-body-band.tone-a),
:global([data-theme="mitrekadark"] .gantt-sprint-body-band.tone-a) {
  background: rgba(59, 130, 246, 0.075);
}

:global(.dark .gantt-sprint-body-band.tone-b),
:global([data-theme="mitrekadark"] .gantt-sprint-body-band.tone-b) {
  background: rgba(45, 212, 191, 0.065);
}

:global(.dark .gantt-sprint-body-band),
:global([data-theme="mitrekadark"] .gantt-sprint-body-band) {
  border-left-color: rgba(148, 163, 184, 0.22);
}

:global(.dark .gantt-vline),
:global([data-theme="mitrekadark"] .gantt-vline) {
  border-right-color: rgba(71, 85, 105, 0.55);
}

:global(.dark .gantt-vline.is-today),
:global([data-theme="mitrekadark"] .gantt-vline.is-today) {
  background: rgba(239, 68, 68, 0.14);
}

:global(.dark .gantt-hline),
:global([data-theme="mitrekadark"] .gantt-hline) {
  border-bottom-color: rgba(71, 85, 105, 0.55);
}

:global(.dark .gantt-bar-label-outside),
:global([data-theme="mitrekadark"] .gantt-bar-label-outside) {
  color: #cbd5e1;
}

:global(.dark .gantt-label-summary),
:global([data-theme="mitrekadark"] .gantt-label-summary) {
  color: #e2e8f0;
}

:global(.dark .gantt-track.is-summary-track),
:global([data-theme="mitrekadark"] .gantt-track.is-summary-track) {
  background: #111827;
}

:global(.dark .gantt-track.is-hovered),
:global([data-theme="mitrekadark"] .gantt-track.is-hovered) {
  background: #132035;
}

:global(.dark .gantt-drag-tooltip),
:global([data-theme="mitrekadark"] .gantt-drag-tooltip) {
  background: rgba(30, 41, 59, 0.97);
  color: #f1f5f9;
}
</style>
