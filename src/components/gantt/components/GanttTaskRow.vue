<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { Icon } from "@/composables/Icon";
import { Tooltip } from "@/lib/mitreka-ui-dist/vue";
import type { FlattenedTask, TimeSlot } from "../types";

const props = defineProps<{
  task: FlattenedTask;
  rowIndex: number;
  slots: TimeSlot[];
  gridColumns: string;
  expandedIds: Set<number>;
  checked: boolean;
  isHovered?: boolean;
  canDelete?: boolean;
  canMove?: boolean;
  canRename?: boolean;
}>();

const emit = defineEmits<{
  toggleExpand: [id: number];
  toggleCheck: [id: number];
  openResource: [task: FlattenedTask];
  addTask: [task: FlattenedTask];
  editTask: [task: FlattenedTask];
  removeFromTimeline: [task: FlattenedTask];
  deleteTask: [task: FlattenedTask];
  rowDragStart: [taskId: number];
  rowDropOn: [taskId: number];
}>();

const menuOpen = ref(false);
const menuRootRef = ref<HTMLElement | null>(null);

function toggleMenu() {
  menuOpen.value = !menuOpen.value;
}

function closeMenu() {
  menuOpen.value = false;
}

function onDocumentPointerDown(event: PointerEvent) {
  if (!menuOpen.value) return;
  if (menuRootRef.value && !menuRootRef.value.contains(event.target as Node)) closeMenu();
}

onMounted(() => document.addEventListener("pointerdown", onDocumentPointerDown));
onBeforeUnmount(() => document.removeEventListener("pointerdown", onDocumentPointerDown));

function runMenuAction(action: () => void) {
  closeMenu();
  action();
}

function indentStyle(depth: number) {
  return { paddingLeft: `${depth * 16}px` };
}

function formatDate(dateStr: string) {
  if (!dateStr) return "-";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
}

function progressBarColor(task: FlattenedTask) {
  if (task.status === "done") return "#16a34a";
  if (task.status === "at-risk") return "#f59e0b";
  if (task.progress >= 80) return "#16a34a";
  return "#3b82f6";
}

function onDragStart(event: DragEvent) {
  if (props.canMove === false || props.task.lock?.move) {
    event.preventDefault();
    return;
  }
  event.dataTransfer?.setData("application/x-gantt-task-id", String(props.task.id));
  if (event.dataTransfer) event.dataTransfer.effectAllowed = "move";
  emit("rowDragStart", props.task.id);
}
</script>

<template>
  <div
    class="gantt-task-row"
    :class="{ 'is-summary-row': task.kind === 'summary', 'is-hovered': isHovered }"
    :draggable="canMove !== false && !task.lock?.move"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop.prevent="emit('rowDropOn', task.id)"
    @dblclick="emit('editTask', task)"
  >
    <!-- Left panel -->
    <div class="gantt-left-cell">
      <div class="gantt-left-grid">
        <!-- Row number -->
        <span class="gantt-row-num" :title="task.lock?.move ? 'Movement locked' : 'Drag to reorder siblings'">{{ rowIndex }}</span>

        <!-- Checkbox -->
        <button type="button" class="gantt-checkbox-button" :class="{ 'is-checked': checked }" @click="emit('toggleCheck', task.id)">
          <span v-if="checked" class="gantt-checkbox-checked">
            <Icon name="check" class="w-2.5 h-2.5" />
          </span>
          <span v-else class="gantt-checkbox-empty"></span>
        </button>

        <!-- Task name with indent & expand -->
        <div class="gantt-task-main" :style="indentStyle(task.depth)">
          <button v-if="task.childrenCount" type="button" class="gantt-toggle" @click="emit('toggleExpand', task.id)">
            <Icon :name="expandedIds.has(task.id) ? 'chevron-down' : 'chevron-right'" class="w-3.5 h-3.5" />
          </button>

          <span v-if="task.kind === 'milestone'" class="gantt-milestone-icon"></span>
          <Icon v-if="task.lock?.delete || task.lock?.rename || task.lock?.move" name="lock" class="w-3 h-3 text-slate-400" />

          <Tooltip :text="task.name" position="top" class="flex-1 min-w-0">
            <div class="gantt-task-name" :class="{ 'is-summary': task.kind === 'summary' }">
              {{ task.name }}
            </div>
          </Tooltip>
        </div>

        <!-- Start date -->
        <span class="gantt-date">{{ formatDate(task.start) }}</span>

        <!-- End date -->
        <span class="gantt-date">{{ formatDate(task.end) }}</span>

        <!-- Progress -->
        <div class="gantt-progress-cell">
          <div class="gantt-progress-bar-bg">
            <div class="gantt-progress-bar-fill" :style="{ width: `${task.progress}%`, background: progressBarColor(task) }"></div>
          </div>
          <span class="gantt-progress-text">{{ task.progress }}%</span>
        </div>

        <!-- Row action menu -->
        <div class="gantt-row-actions" ref="menuRootRef">
          <button
            type="button"
            class="icon-btn icon-btn-ghost icon-btn-xs gantt-row-action-btn gantt-row-menu-trigger"
            :class="{ 'is-open': menuOpen }"
            title="Task actions"
            @click="toggleMenu"
          >
            <Icon name="ellipsis" class="w-3.5 h-3.5" />
          </button>
          <div v-if="menuOpen" class="gantt-row-menu">
            <button v-if="!task.lock?.rename" type="button" class="gantt-row-menu-item" @click="runMenuAction(() => emit('editTask', task))">
              <Icon name="edit" class="w-3.5 h-3.5" /> Edit task
            </button>
            <button type="button" class="gantt-row-menu-item" @click="runMenuAction(() => emit('addTask', task))">
              <Icon name="plus" class="w-3.5 h-3.5" /> Add child
            </button>
            <button type="button" class="gantt-row-menu-item" @click="runMenuAction(() => emit('openResource', task))">
              <Icon name="user" class="w-3.5 h-3.5" /> Manage resources
            </button>
            <button
              v-if="task.isScheduled && canMove !== false && !task.lock?.move"
              type="button"
              class="gantt-row-menu-item"
              @click="runMenuAction(() => emit('removeFromTimeline', task))"
            >
              <Icon name="x-circle" class="w-3.5 h-3.5" /> Remove from timeline
            </button>
            <button
              v-if="canDelete !== false && !task.lock?.delete"
              type="button"
              class="gantt-row-menu-item is-danger"
              @click="runMenuAction(() => emit('deleteTask', task))"
            >
              <Icon name="trash" class="w-3.5 h-3.5" /> Delete task
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gantt-task-row {
  height: var(--gantt-row-height, 32px);
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(226, 232, 240, 0.85);
  background: #fff;
  box-sizing: border-box;
}

.gantt-task-row:hover, .gantt-task-row.is-hovered {
  background: #c3dfff47;
}

.gantt-task-row.is-summary-row {
  background: #b4c7d947;
}

.gantt-task-row.is-summary-row .gantt-task-name {
  font-weight: 700;
}

.gantt-left-cell {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 0.2rem 0.45rem;
  background: inherit;
  box-sizing: border-box;
}

.gantt-left-grid {
  width: 100%;
  display: grid;
  grid-template-columns: 28px 24px 1fr 62px 62px 36px 54px;
  gap: 0.3rem;
  align-items: center;
}

.gantt-row-num {
  text-align: center;
  font-size: 0.65rem;
  font-weight: 600;
  color: #94a3b8;
}

.gantt-checkbox {
  display: flex;
  align-items: center;
  justify-content: center;
}

.gantt-checkbox-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  border: none;
  padding: 0;
  background: transparent;
  cursor: pointer;
  border-radius: 999px;
}

.gantt-checkbox-button:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 1px;
}

.gantt-checkbox-checked {
  width: 14px;
  height: 14px;
  border-radius: 999px;
  background: #22c55e;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.gantt-checkbox-empty {
  width: 14px;
  height: 14px;
  border-radius: 3px;
  border: 1.5px solid #cbd5e1;
}

.gantt-task-main {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  min-width: 0;
}

.gantt-toggle {
  width: 1rem;
  height: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  background: transparent;
  border: none;
  color: #64748b;
  cursor: pointer;
  border-radius: 3px;
}

.gantt-toggle:hover {
  background: #e2e8f0;
}

.gantt-milestone-icon {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  transform: rotate(45deg);
  background: #f59e0b;
  border-radius: 1.5px;
}

.gantt-task-name {
  font-size: 0.72rem;
  font-weight: 500;
  color: #1e293b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gantt-task-name.is-summary {
  font-weight: 700;
  color: #0f172a;
}

.gantt-date {
  font-size: 0.6rem;
  color: #64748b;
  white-space: nowrap;
}

.gantt-progress-cell {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.gantt-progress-bar-bg {
  flex: 1;
  height: 4px;
  border-radius: 2px;
  background: #e2e8f0;
  overflow: hidden;
}

.gantt-progress-bar-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.3s;
}

.gantt-progress-text {
  font-size: 0.55rem;
  font-weight: 700;
  color: #64748b;
  min-width: 22px;
}

.gantt-row-actions {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
}

.gantt-row-actions .gantt-row-action-btn {
  opacity: 0;
  width: 20px;
  height: 20px;
}

.gantt-task-row:hover .gantt-row-actions .gantt-row-action-btn,
.gantt-row-actions .gantt-row-menu-trigger.is-open {
  opacity: 1;
}

.gantt-row-menu {
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  z-index: 20;
  min-width: 172px;
  padding: 0.25rem;
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 0.5rem;
  box-shadow: 0 8px 20px rgba(15, 23, 42, 0.14);
  display: flex;
  flex-direction: column;
}

.gantt-row-menu-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.32rem 0.5rem;
  border: none;
  background: transparent;
  border-radius: 0.35rem;
  font-size: 0.7rem;
  font-weight: 500;
  color: #334155;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
}

.gantt-row-menu-item:hover {
  background: #f1f5f9;
}

.gantt-row-menu-item.is-danger {
  color: #dc2626;
}

.gantt-row-menu-item.is-danger:hover {
  background: #fee2e2;
}

:global(.dark .gantt-row-menu),
:global([data-theme="mitrekadark"] .gantt-row-menu) {
  background: #1e293b;
  border-color: #334155;
}

:global(.dark .gantt-row-menu-item),
:global([data-theme="mitrekadark"] .gantt-row-menu-item) {
  color: #e2e8f0;
}

:global(.dark .gantt-row-menu-item:hover),
:global([data-theme="mitrekadark"] .gantt-row-menu-item:hover) {
  background: #334155;
}

:global(.dark .gantt-row-menu-item.is-danger:hover),
:global([data-theme="mitrekadark"] .gantt-row-menu-item.is-danger:hover) {
  background: rgba(220, 38, 38, 0.2);
}

:global(.dark .gantt-task-row),
:global([data-theme="mitrekadark"] .gantt-task-row) {
  background: #0f172a;
  border-bottom-color: rgba(51, 65, 85, 0.9);
}

:global(.dark .gantt-task-row:hover),
:global([data-theme="mitrekadark"] .gantt-task-row:hover) {
  background: #132035;
}

:global(.dark .gantt-task-row.is-summary-row),
:global([data-theme="mitrekadark"] .gantt-task-row.is-summary-row) {
  background: #111827;
}

:global(.dark .gantt-row-num),
:global([data-theme="mitrekadark"] .gantt-row-num) {
  color: #64748b;
}

:global(.dark .gantt-checkbox-empty),
:global([data-theme="mitrekadark"] .gantt-checkbox-empty) {
  border-color: #475569;
}

:global(.dark .gantt-toggle),
:global([data-theme="mitrekadark"] .gantt-toggle) {
  color: #94a3b8;
}

:global(.dark .gantt-toggle:hover),
:global([data-theme="mitrekadark"] .gantt-toggle:hover) {
  background: #334155;
}

:global(.dark .gantt-task-name),
:global([data-theme="mitrekadark"] .gantt-task-name) {
  color: #e2e8f0;
}

:global(.dark .gantt-task-name.is-summary),
:global([data-theme="mitrekadark"] .gantt-task-name.is-summary) {
  color: #f1f5f9;
}

:global(.dark .gantt-date),
:global(.dark .gantt-progress-text),
:global([data-theme="mitrekadark"] .gantt-date),
:global([data-theme="mitrekadark"] .gantt-progress-text) {
  color: #94a3b8;
}

:global(.dark .gantt-progress-bar-bg),
:global([data-theme="mitrekadark"] .gantt-progress-bar-bg) {
  background: #334155;
}
</style>

