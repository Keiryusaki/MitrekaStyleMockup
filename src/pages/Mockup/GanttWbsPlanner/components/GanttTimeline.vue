<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from "vue";
import type { FlattenedTask, TimeSlot, PhaseColor } from "../types";
import { rangeForTask } from "../utils";

const props = defineProps<{
  tasks: FlattenedTask[];
  slots: TimeSlot[];
  slotSize: number;
  leftPanelWidth: number;
  todayColumn: number | null;
  rowHeight: number;
  hoveredTaskId?: number | null;
  editableSummaryBars?: boolean;
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

function formatDateLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
}

function timelineColumns() {
  return `repeat(${props.slots.length}, ${props.slotSize}px)`;
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
  return props.tasks.some(t => t.dependencies && t.dependencies.includes(taskId));
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function startDrag(task: FlattenedTask, mode: DragMode, event: PointerEvent) {
  if (task.kind === "summary" && props.editableSummaryBars === false) return;
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
      <!-- Milestone -->
      <div v-if="task.kind === 'milestone'" :class="barClass(task)" :style="taskBarStyle(task)" @pointerdown="startDrag(task, 'move', $event)" @dblclick.stop="emit('editTask', task.id)">
        <button type="button" class="gantt-bar-remove" title="Remove from timeline" @pointerdown.stop @click.stop="emit('unscheduleTask', task.id)">x</button>
        <span class="gantt-milestone-diamond"></span>
        <span class="gantt-bar-label-outside">{{ task.name }}</span>
      </div>

      <!-- Summary bar -->
      <div v-else-if="task.kind === 'summary'" :class="barClass(task)" :style="taskBarStyle(task)" @pointerdown="startDrag(task, 'move', $event)" @dblclick.stop="emit('editTask', task.id)">
        <button type="button" class="gantt-bar-remove" title="Remove from timeline" @pointerdown.stop @click.stop="emit('unscheduleTask', task.id)">x</button>
        <span class="gantt-handle gantt-handle-start" @pointerdown.stop="startDrag(task, 'resize-start', $event)"></span>
        <span class="gantt-handle gantt-handle-end" @pointerdown.stop="startDrag(task, 'resize-end', $event)"></span>
        <span class="gantt-bar-label-outside gantt-label-summary">{{ task.name }}</span>
      </div>

      <!-- Task bar -->
      <div v-else :class="barClass(task)" :style="taskBarStyle(task)" @pointerdown="startDrag(task, 'move', $event)" @dblclick.stop="emit('editTask', task.id)">
        <button type="button" class="gantt-bar-remove" title="Remove from timeline" @pointerdown.stop @click.stop="emit('unscheduleTask', task.id)">x</button>
        <span class="gantt-handle gantt-handle-start" @pointerdown.stop="startDrag(task, 'resize-start', $event)"></span>
        <span class="gantt-handle gantt-handle-end" @pointerdown.stop="startDrag(task, 'resize-end', $event)"></span>
        <div class="gantt-progress-fill" :style="progressStyle(task)"></div>
        <span v-if="hasDependents(task.id)" class="gantt-bar-end-dot-bottom" :style="{ right: `${slotSize / 2 - 4}px` }"></span>
        <span class="gantt-bar-label-outside">{{ task.name }}</span>
      </div>
    </div>
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

.gantt-grid-lines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
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
  height: 32px;
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
  border-top: 6px solid #334155;
  border-right: 8px solid transparent;
}

.gantt-bar-summary::after {
  right: 0;
  border-top: 6px solid #334155;
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

:global(.dark) .gantt-vline,
:global(:root[data-theme="mitrekadark"]) .gantt-vline {
  border-right-color: rgba(71, 85, 105, 0.55);
}

:global(.dark) .gantt-vline.is-today,
:global(:root[data-theme="mitrekadark"]) .gantt-vline.is-today {
  background: rgba(239, 68, 68, 0.14);
}

:global(.dark) .gantt-hline,
:global(:root[data-theme="mitrekadark"]) .gantt-hline {
  border-bottom-color: rgba(71, 85, 105, 0.55);
}

:global(.dark) .gantt-bar-label-outside,
:global(:root[data-theme="mitrekadark"]) .gantt-bar-label-outside {
  color: #cbd5e1;
}

:global(.dark) .gantt-label-summary,
:global(:root[data-theme="mitrekadark"]) .gantt-label-summary {
  color: #e2e8f0;
}

:global(.dark) .gantt-track.is-summary-track,
:global(:root[data-theme="mitrekadark"]) .gantt-track.is-summary-track {
  background: #111827;
}

:global(.dark) .gantt-track.is-hovered,
:global(:root[data-theme="mitrekadark"]) .gantt-track.is-hovered {
  background: #132035;
}

:global(.dark) .gantt-drag-tooltip,
:global(:root[data-theme="mitrekadark"]) .gantt-drag-tooltip {
  background: rgba(30, 41, 59, 0.97);
  color: #f1f5f9;
}

:global([data-theme="mitrekadark"] .gantt-vline) {
  border-right-color: rgba(71, 85, 105, 0.55);
}
:global([data-theme="mitrekadark"] .gantt-vline.is-today) {
  background: rgba(239, 68, 68, 0.14);
}
:global([data-theme="mitrekadark"] .gantt-hline) {
  border-bottom-color: rgba(71, 85, 105, 0.55);
}
:global([data-theme="mitrekadark"] .gantt-bar-label-outside) {
  color: #cbd5e1;
}
:global([data-theme="mitrekadark"] .gantt-label-summary) {
  color: #e2e8f0;
}
:global([data-theme="mitrekadark"] .gantt-track.is-summary-track) {
  background: #111827;
}
:global([data-theme="mitrekadark"] .gantt-track.is-hovered) {
  background: #132035;
}
:global([data-theme="mitrekadark"] .gantt-drag-tooltip) {
  background: rgba(30, 41, 59, 0.97);
  color: #f1f5f9;
}
</style>
