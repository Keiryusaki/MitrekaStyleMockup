<script setup lang="ts">
import { Icon } from "@/composables/Icon";
import { Tooltip } from "@/lib/mitreka-ui-dist/vue";
import type { FlattenedTask, TimeSlot } from "../types";

defineProps<{
  task: FlattenedTask;
  rowIndex: number;
  slots: TimeSlot[];
  gridColumns: string;
  expandedIds: Set<number>;
  checked: boolean;
  isHovered?: boolean;
}>();

const emit = defineEmits<{
  toggleExpand: [id: number];
  toggleCheck: [id: number];
  openResource: [task: FlattenedTask];
}>();

function indentStyle(depth: number) {
  return { paddingLeft: `${depth * 16}px` };
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", { day: "2-digit", month: "short" });
}

function progressBarColor(task: FlattenedTask) {
  if (task.status === "done") return "#16a34a";
  if (task.status === "at-risk") return "#f59e0b";
  if (task.progress >= 80) return "#16a34a";
  return "#3b82f6";
}
</script>

<template>
  <div class="gantt-task-row" :class="{ 'is-summary-row': task.kind === 'summary', 'is-hovered': isHovered }">
    <!-- Left panel -->
    <div class="gantt-left-cell">
      <div class="gantt-left-grid">
        <!-- Row number -->
        <span class="gantt-row-num">{{ rowIndex }}</span>

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

        <!-- Resource button -->
        <button type="button" class="gantt-resource-btn" @click="emit('openResource', task)">
          <Icon name="user" class="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.gantt-task-row {
  height: 32px;
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
  grid-template-columns: 28px 24px 1fr 62px 62px 36px 28px;
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

.gantt-resource-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  border: 1px solid #e2e8f0;
  background: #fff;
  color: #64748b;
  border-radius: 50%;
  cursor: pointer;
}

.gantt-resource-btn:hover {
  background: #f1f5f9;
  color: #334155;
  border-color: #cbd5e1;
}

:global(.dark) .gantt-task-row,
:global(:root[data-theme="mitrekadark"]) .gantt-task-row {
  background: #0f172a;
  border-bottom-color: rgba(51, 65, 85, 0.9);
}

:global(.dark) .gantt-task-row:hover,
:global(:root[data-theme="mitrekadark"]) .gantt-task-row:hover {
  background: #132035;
}

:global(.dark) .gantt-task-row.is-summary-row,
:global(:root[data-theme="mitrekadark"]) .gantt-task-row.is-summary-row {
  background: #111827;
}

:global(.dark) .gantt-row-num,
:global(:root[data-theme="mitrekadark"]) .gantt-row-num {
  color: #64748b;
}

:global(.dark) .gantt-checkbox-empty,
:global(:root[data-theme="mitrekadark"]) .gantt-checkbox-empty {
  border-color: #475569;
}

:global(.dark) .gantt-toggle,
:global(:root[data-theme="mitrekadark"]) .gantt-toggle {
  color: #94a3b8;
}

:global(.dark) .gantt-toggle:hover,
:global(:root[data-theme="mitrekadark"]) .gantt-toggle:hover {
  background: #334155;
}

:global(.dark) .gantt-task-name,
:global(:root[data-theme="mitrekadark"]) .gantt-task-name {
  color: #e2e8f0;
}

:global(.dark) .gantt-task-name.is-summary,
:global(:root[data-theme="mitrekadark"]) .gantt-task-name.is-summary {
  color: #f1f5f9;
}

:global(.dark) .gantt-date,
:global(.dark) .gantt-progress-text,
:global(:root[data-theme="mitrekadark"]) .gantt-date,
:global(:root[data-theme="mitrekadark"]) .gantt-progress-text {
  color: #94a3b8;
}

:global(.dark) .gantt-progress-bar-bg,
:global(:root[data-theme="mitrekadark"]) .gantt-progress-bar-bg {
  background: #334155;
}

:global(.dark) .gantt-resource-btn,
:global(:root[data-theme="mitrekadark"]) .gantt-resource-btn {
  border-color: #475569;
  background: #111827;
  color: #94a3b8;
}

:global(.dark) .gantt-resource-btn:hover,
:global(:root[data-theme="mitrekadark"]) .gantt-resource-btn:hover {
  background: #1e293b;
  color: #e2e8f0;
  border-color: #64748b;
}

:global([data-theme="mitrekadark"] .gantt-task-row) {
  background: #0f172a;
  border-bottom-color: rgba(51, 65, 85, 0.9);
}
:global([data-theme="mitrekadark"] .gantt-task-row:hover) {
  background: #132035;
}
:global([data-theme="mitrekadark"] .gantt-task-row.is-summary-row) {
  background: #111827;
}
:global([data-theme="mitrekadark"] .gantt-row-num) {
  color: #64748b;
}
:global([data-theme="mitrekadark"] .gantt-checkbox-empty) {
  border-color: #475569;
}
:global([data-theme="mitrekadark"] .gantt-toggle) {
  color: #94a3b8;
}
:global([data-theme="mitrekadark"] .gantt-toggle:hover) {
  background: #334155;
}
:global([data-theme="mitrekadark"] .gantt-task-name) {
  color: #e2e8f0;
}
:global([data-theme="mitrekadark"] .gantt-task-name.is-summary) {
  color: #f1f5f9;
}
:global([data-theme="mitrekadark"] .gantt-date),
:global([data-theme="mitrekadark"] .gantt-progress-text) {
  color: #94a3b8;
}
:global([data-theme="mitrekadark"] .gantt-progress-bar-bg) {
  background: #334155;
}
:global([data-theme="mitrekadark"] .gantt-resource-btn) {
  border-color: #475569;
  background: #111827;
  color: #94a3b8;
}
:global([data-theme="mitrekadark"] .gantt-resource-btn:hover) {
  background: #1e293b;
  color: #e2e8f0;
  border-color: #64748b;
}
</style>
