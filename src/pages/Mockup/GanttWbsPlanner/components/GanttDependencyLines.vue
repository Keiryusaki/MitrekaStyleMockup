<script setup lang="ts">
import { computed, ref, onMounted, watch } from "vue";
import type { FlattenedTask, TimeSlot, TaskBarPosition, DependencyLine } from "../types";
import { rangeForTask } from "../utils";

const props = defineProps<{
  tasks: FlattenedTask[];
  slots: TimeSlot[];
  slotSize: number;
  leftPanelWidth: number;
  rowHeight: number;
}>();

const svgContainer = ref<SVGSVGElement | null>(null);
const taskPositions = ref<Map<number, TaskBarPosition>>(new Map());

function buildDependencyPath(from: TaskBarPosition, to: TaskBarPosition): string {
  // Dot di tengah kolom tanggal end source -> turun -> belok kanan ke kiri target
  const halfSlot = props.slotSize / 2;
  const fromX = from.left + from.width - halfSlot; // tengah kolom end date
  const fromY = from.top + from.height; // bottom bar (posisi dot)
  const toX = to.left; // kiri target = start date
  const toY = to.top + to.height / 2; // vertical center target

  if (fromY === toY) {
    return `M ${fromX} ${fromY} L ${toX} ${toY}`;
  }

  const padding = 12; // Jarak aman di sebelah kiri target

  if (fromX <= toX - padding) {
    // Normal: source dot di sebelah kiri target start, cukup turun lalu ke kanan
    return `M ${fromX} ${fromY} L ${fromX} ${toY} L ${toX} ${toY}`;
  } else {
    // Overlap (Weekly/Monthly view): source dot sejajar atau di kanan target start
    // Turun ke gap antar bar, belok kiri melewati start, turun ke target, lalu ke kanan
    const gapY = fromY + 8; // Turun 8px ke celah antar baris
    return `M ${fromX} ${fromY} L ${fromX} ${gapY} L ${toX - padding} ${gapY} L ${toX - padding} ${toY} L ${toX} ${toY}`;
  }
}

const dependencyLines = computed<DependencyLine[]>(() => {
  const lines: DependencyLine[] = [];

  props.tasks.forEach((task) => {
    if (!task.dependencies || task.dependencies.length === 0) return;

    const toPos = taskPositions.value.get(task.id);
    if (!toPos) return;

    task.dependencies.forEach((depId) => {
      const fromTask = props.tasks.find((t) => t.id === depId);
      if (!fromTask) return;

      const fromPos = taskPositions.value.get(depId);
      if (!fromPos) return;

      const path = buildDependencyPath(fromPos, toPos);
      lines.push({ from: fromPos, to: toPos, path });
    });
  });

  return lines;
});

const svgHeight = computed(() => props.tasks.length * props.rowHeight);

function calculateTaskPositions() {
  const positions = new Map<number, TaskBarPosition>();

  props.tasks.forEach((task, index) => {
    const range = rangeForTask(task, props.slots);
    if (!range) return;

    const left = (range.start - 1) * props.slotSize + 4;
    const width = range.span * props.slotSize - 8;
    const top = index * props.rowHeight + props.rowHeight / 2 - 7;
    const height = 14;

    positions.set(task.id, {
      task,
      gridColumn: `${range.start} / span ${range.span}`,
      left,
      width,
      top,
      height,
    });
  });

  taskPositions.value = positions;
}

onMounted(() => {
  calculateTaskPositions();
});

watch(
  () => [props.tasks, props.slots, props.slotSize],
  () => {
    calculateTaskPositions();
  },
  { deep: true }
);
</script>

<template>
  <svg
    ref="svgContainer"
    class="gantt-dependency-svg"
    :style="{
      left: `${leftPanelWidth}px`,
      width: `${slots.length * slotSize}px`,
      height: `${svgHeight}px`,
    }"
  >
    <defs>
      <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
        <polygon points="0 0, 6 3, 0 6" fill="#94a3b8" />
      </marker>
    </defs>

    <g v-for="(line, index) in dependencyLines" :key="`dep-${index}`">
      <path :d="line.path" class="dependency-line" marker-end="url(#arrowhead)" />
    </g>
  </svg>
</template>

<style scoped>
.gantt-dependency-svg {
  position: absolute;
  top: 0;
  pointer-events: none;
  z-index: 4;
  overflow: visible;
}

.dependency-line {
  fill: none;
  stroke: #94a3b8;
  stroke-width: 1.5;
  opacity: 0.8;
}

:global(.dark) .dependency-line,
:global(:root[data-theme="mitrekadark"]) .dependency-line {
  stroke: #64748b;
  opacity: 0.9;
}

:global([data-theme="mitrekadark"] .dependency-line) {
  stroke: #64748b;
  opacity: 0.9;
}
</style>
