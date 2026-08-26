<script setup lang="ts">
import { computed } from "vue";
import type { GanttSprint, TimeSlot } from "../types";
import { endOfDay, startOfDay } from "../utils";

const today = startOfDay(new Date());

const props = defineProps<{
  sprints: GanttSprint[];
  slots: TimeSlot[];
  slotSize: number;
}>();

const visibleSprints = computed(() =>
  props.sprints
    .map((sprint) => {
      const start = startOfDay(new Date(sprint.start));
      const end = endOfDay(new Date(sprint.end));
      const active = props.slots.map((slot, index) => ({ slot, index })).filter(({ slot }) => end >= slot.start && start <= slot.end);
      if (!active.length) return null;
      const first = active[0].index;
      const last = active[active.length - 1].index;
      return {
        ...sprint,
        left: first * props.slotSize,
        width: (last - first + 1) * props.slotSize,
        tone: props.sprints.indexOf(sprint) % 2 === 0 ? "a" : "b",
        isCurrent: today >= start && today <= end,
      };
    })
    .filter((item): item is GanttSprint & { left: number; width: number; tone: "a" | "b"; isCurrent: boolean } => Boolean(item))
);
</script>

<template>
  <div class="gantt-sprint-row">
    <div
      v-for="sprint in visibleSprints"
      :key="sprint.id"
      class="gantt-sprint-band"
      :class="[`tone-${sprint.tone}`, { 'is-current': sprint.isCurrent }]"
      :style="{
        left: `${sprint.left}px`,
        width: `${sprint.width}px`,
      }"
    >
      <span>{{ sprint.name }}</span>
      <small v-if="sprint.isCurrent">Current</small>
    </div>
  </div>
</template>

<style scoped>
.gantt-sprint-row {
  position: relative;
  height: var(--gantt-sprint-header-height, 30px);
  box-sizing: border-box;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.gantt-sprint-band {
  position: absolute;
  top: 4px;
  bottom: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  border-left: 1px solid rgba(30, 41, 59, 0.18);
  border-radius: 0;
  color: #334155;
  font-size: 0.66rem;
  font-weight: 800;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.gantt-sprint-band.tone-a {
  background: rgba(37, 99, 235, 0.12);
}

.gantt-sprint-band.tone-b {
  background: rgba(20, 184, 166, 0.12);
}

.gantt-sprint-band.is-current {
  outline: 1px solid rgba(37, 99, 235, 0.45);
  outline-offset: -1px;
}

.gantt-sprint-band small {
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  padding: 0.05rem 0.35rem;
  color: #1d4ed8;
  font-size: 0.56rem;
  font-weight: 900;
}

:global(.dark .gantt-sprint-row),
:global([data-theme="mitrekadark"] .gantt-sprint-row) {
  background: #111827;
  border-bottom-color: #334155;
}

:global(.dark .gantt-sprint-band.tone-a),
:global([data-theme="mitrekadark"] .gantt-sprint-band.tone-a) {
  background: rgba(59, 130, 246, 0.14);
}

:global(.dark .gantt-sprint-band.tone-b),
:global([data-theme="mitrekadark"] .gantt-sprint-band.tone-b) {
  background: rgba(45, 212, 191, 0.12);
}

:global(.dark .gantt-sprint-band),
:global([data-theme="mitrekadark"] .gantt-sprint-band) {
  color: #e2e8f0;
  border-left-color: rgba(148, 163, 184, 0.24);
}

:global(.dark .gantt-sprint-band small),
:global([data-theme="mitrekadark"] .gantt-sprint-band small) {
  background: rgba(15, 23, 42, 0.76);
  color: #93c5fd;
}
</style>
