<script setup lang="ts">
import { computed } from "vue";
import { ganttPhaseCatalog } from "../types";
import type { FlattenedTask, GanttEmployee, GanttSprint, GanttTask, SprintScheduleValidation } from "../types";

const props = defineProps<{
  task: FlattenedTask;
  employees: GanttEmployee[];
  sprint?: GanttSprint | null;
  baselineTask?: GanttTask | null;
  sprintValidation?: SprintScheduleValidation | null;
}>();

const employeeLookup = computed(() => new Map(props.employees.map((employee) => [employee.id, employee])));
const resources = computed(() => props.task.resources.map((resource) => ({ resource, employee: employeeLookup.value.get(resource.employeeId ?? "") })));
const phase = computed(() => ganttPhaseCatalog.find((item) => item.id === props.task.phaseId));
const pic = computed(() => resources.value.find((item) => item.resource.isPic) ?? resources.value[0]);
const duration = computed(() => {
  if (!props.task.isScheduled) return "Unscheduled";
  const days = Math.max(1, Math.round((props.task.endDate.getTime() - props.task.startDate.getTime()) / 86400000) + 1);
  return `${days} day${days === 1 ? "" : "s"}`;
});
const variance = computed(() => {
  if (!props.baselineTask?.start || !props.baselineTask.end || !props.task.start || !props.task.end) return null;
  const baselineEnd = new Date(props.baselineTask.end).getTime();
  const currentEnd = new Date(props.task.end).getTime();
  const days = Math.round((currentEnd - baselineEnd) / 86400000);
  return `${days >= 0 ? "+" : ""}${days} days`;
});

function formatDate(value: string) {
  if (!value) return "-";
  return new Date(value).toLocaleDateString("en-US", { day: "2-digit", month: "short" });
}

function formatEffort() {
  if (!props.task.effort) return "-";
  return `${props.task.effort.value} ${props.task.effort.unit.replace("-", " ")}`;
}
</script>

<template>
  <div class="gantt-task-tooltip">
    <strong>{{ task.name }}</strong>
    <span>{{ task.kind }} · Phase: {{ phase?.label ?? task.phaseColor ?? "General" }}</span>
    <span>Committed Sprint: {{ sprint?.name ?? "No Sprint" }}</span>
    <span>{{ formatDate(task.start) }} - {{ formatDate(task.end) }} · {{ duration }}</span>
    <div class="gantt-tooltip-grid">
      <span>Progress</span><b>{{ task.progress }}%</b>
      <span>Status</span><b>{{ task.status }}</b>
      <span>PIC</span><b>{{ pic?.employee?.nickname ? `${pic.employee.nickname} - ${pic.employee.name}` : pic?.employee?.name ?? task.owner }}</b>
      <span>Effort</span><b>{{ formatEffort() }}</b>
      <span v-if="task.weight">Weight</span><b v-if="task.weight">{{ task.weight }}</b>
    </div>
    <div v-if="resources.length" class="gantt-tooltip-resources">
      <span v-for="item in resources" :key="item.resource.employeeId ?? item.resource.role">
        {{ item.employee?.name ?? item.resource.role }} · {{ item.resource.allocation ?? 100 }}%
      </span>
    </div>
    <div v-if="sprintValidation?.hasIssue" class="gantt-tooltip-baseline is-warning">
      {{ sprintValidation.message }}<br />
      <template v-if="sprintValidation.carryOverDays">Carry-over: {{ sprintValidation.carryOverDays }} days</template>
    </div>
    <div v-if="baselineTask" class="gantt-tooltip-baseline">
      Baseline: {{ formatDate(baselineTask.start) }} - {{ formatDate(baselineTask.end) }}<br />
      Current: {{ formatDate(task.start) }} - {{ formatDate(task.end) }}<br />
      Variance: {{ variance }}
    </div>
  </div>
</template>

<style scoped>
.gantt-task-tooltip {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: 220px;
  max-width: 280px;
  padding: 0.65rem;
  border-radius: 0.65rem;
  background: rgba(15, 23, 42, 0.97);
  color: #e2e8f0;
  box-shadow: 0 14px 35px rgba(15, 23, 42, 0.35);
  font-size: 0.68rem;
  line-height: 1.35;
}

.gantt-task-tooltip strong {
  color: #fff;
  font-size: 0.78rem;
}

.gantt-task-tooltip span {
  color: #cbd5e1;
}

.gantt-tooltip-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.15rem 0.55rem;
}

.gantt-tooltip-grid b {
  color: #f8fafc;
  font-weight: 700;
}

.gantt-tooltip-resources,
.gantt-tooltip-baseline {
  border-top: 1px solid rgba(148, 163, 184, 0.28);
  padding-top: 0.35rem;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.gantt-tooltip-baseline.is-warning {
  color: #fcd34d;
}
</style>
