<script setup lang="ts">
import { computed, ref, watch } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { GanttChart, ganttPhaseCatalog } from "@/components/gantt";
import type { BarColorMode, DependencyDisplayMode, GanttTask, PlanningMode, ResourceLabelMode, ViewMode, GanttChangeEvent } from "@/components/gantt";
import { addDays, formatDateYmd } from "@/components/gantt";
import { ganttTasks, ganttEmployees } from "@/components/gantt/demo/ganttData";
import { generateSprints } from "@/components/gantt/demo/sprintData";
import { buildTemplateTasks, ganttTemplates, type GanttTemplateId } from "@/components/gantt/demo/templates";

type ScenarioId = "schedule" | "sprint" | "baseline" | "locked";

const initialScheduleTasks = buildScheduleDemoTasks(cloneTasks(ganttTasks));
const scenario = ref<ScenarioId>("schedule");
const tasks = ref<GanttTask[]>(cloneTasks(initialScheduleTasks));
const baselineTasks = ref<GanttTask[]>([]);
const baselineSetAt = ref("");
const activeView = ref<ViewMode>("day");
const planningMode = ref<PlanningMode>("schedule");
const barColorMode = ref<BarColorMode>("phase");
const dependencyDisplay = ref<DependencyDisplayMode>("all");
const resourceLabel = ref<ResourceLabelMode>("nickname");
const showBaseline = ref(false);
const selectedTemplate = ref<GanttTemplateId>("software");
const sprintDuration = ref(2);
const sprintCount = ref(5);
type SprintBackgroundMode = "alternating" | "hidden";
const sprintBackground = ref<SprintBackgroundMode>("alternating");
const sprints = ref(generateSprints(tasks.value[0]?.start ?? formatDateYmd(new Date()), sprintDuration.value, sprintCount.value));
const hasGeneratedWbs = ref(false);
const hasSimulation = ref(false);

const scenarios: Array<{ id: ScenarioId; title: string; description: string }> = [
  { id: "schedule", title: "Schedule-Based", description: "Direct start and due date planning with phase colors." },
  { id: "sprint", title: "Sprint-Based", description: "Alternating sprint backgrounds with phase-colored task bars and carry-over warnings." },
  { id: "baseline", title: "Baseline Comparison", description: "Capture baseline, simulate delay, and compare variance." },
  { id: "locked", title: "Locked WBS Template", description: "Protected template summaries with editable user children." },
];

const viewModes: Array<{ value: ViewMode; label: string }> = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];
const barColorOptions: Array<{ value: BarColorMode; label: string }> = [
  { value: "phase", label: "Phase" },
  { value: "status", label: "Status" },
];
const dependencyOptions: Array<{ value: DependencyDisplayMode; label: string }> = [
  { value: "all", label: "All" },
  { value: "selected", label: "Selected" },
  { value: "hidden", label: "Hidden" },
];
const resourceLabelOptions: Array<{ value: ResourceLabelMode; label: string }> = [
  { value: "nickname", label: "Nickname" },
  { value: "name", label: "Name" },
  { value: "none", label: "None" },
];
const planningModeOptions: Array<{ value: PlanningMode; label: string }> = [
  { value: "schedule", label: "Schedule-Based" },
  { value: "sprint", label: "Sprint-Based" },
];
const templateOptions: Array<{ value: GanttTemplateId; label: string }> = ganttTemplates.map((template) => ({ value: template.id, label: template.name }));
const sprintDurationOptions: Array<{ value: number; label: string }> = [
  { value: 1, label: "1 week" },
  { value: 2, label: "2 weeks" },
  { value: 3, label: "3 weeks" },
  { value: 4, label: "4 weeks" },
];
const sprintBackgroundOptions: Array<{ value: SprintBackgroundMode; label: string }> = [
  { value: "alternating", label: "Alternating" },
  { value: "hidden", label: "Hidden" },
];
const baselineVisibilityOptions: Array<{ value: "show" | "hide"; label: string }> = [
  { value: "show", label: "Show" },
  { value: "hide", label: "Hide" },
];
const showBaselineOption = computed<"show" | "hide">({
  get: () => (showBaseline.value ? "show" : "hide"),
  set: (value) => {
    showBaseline.value = value === "show";
  },
});
const flowSteps = ["Planning Mode", "WBS Template", "Project Setup", "Build Schedule", "Set Baseline", "Track Changes"];

const selectedTemplateInfo = computed(() => ganttTemplates.find((template) => template.id === selectedTemplate.value) ?? ganttTemplates[0]);
const phaseLegendItems = ganttPhaseCatalog.map((phase) => ({ label: phase.label, color: phase.color }));
const visualGuideItems = [
  "Background: sprint period, alternating only",
  "Bar color: project phase",
  "Bar fill: actual progress",
  "Outline: risk / carry-over",
  "Ghost bar: baseline plan",
  "Red line: today",
];
const summaryStats = computed(() => {
  const baselineIds = new Set(baselineTasks.value.map((task) => task.id));
  const baselineById = new Map(baselineTasks.value.map((task) => [task.id, task]));
  const changedTasks = tasks.value.filter((task) => {
    const baseline = baselineById.get(task.id);
    return baseline && (baseline.start !== task.start || baseline.end !== task.end || baseline.progress !== task.progress || JSON.stringify(baseline.resources) !== JSON.stringify(task.resources));
  }).length;
  const delayedTasks = tasks.value.filter((task) => {
    const baseline = baselineById.get(task.id);
    return baseline?.end && task.end && new Date(task.end) > new Date(baseline.end);
  }).length;
  return {
    taskCount: tasks.value.filter((task) => task.kind === "task").length,
    milestoneCount: tasks.value.filter((task) => task.kind === "milestone").length,
    lockedCount: tasks.value.filter((task) => task.lock?.delete || task.lock?.rename || task.lock?.move).length,
    changedTasks,
    delayedTasks,
    addedTasks: tasks.value.filter((task) => !baselineIds.has(task.id)).length,
  };
});
const legendItems = computed(() => phaseLegendItems);

watch(scenario, loadScenario, { immediate: false });

function cloneTasks(list: GanttTask[]): GanttTask[] {
  return JSON.parse(JSON.stringify(list)) as GanttTask[];
}

function buildScheduleDemoTasks(source: GanttTask[]): GanttTask[] {
  const next = cloneTasks(source);
  const baseId = Math.max(...next.map((task) => task.id), 0) + 1;
  const branchStart = addDays(new Date(next.find((task) => task.name === "Code")?.start ?? new Date()), 2);
  const apiStart = formatDateYmd(branchStart);
  const apiEnd = formatDateYmd(addDays(branchStart, 4));
  const successorStart = formatDateYmd(addDays(branchStart, 5));
  const successorEnd = formatDateYmd(addDays(branchStart, 9));
  const testStart = formatDateYmd(addDays(branchStart, 10));
  const testEnd = formatDateYmd(addDays(branchStart, 13));

  next.push(
    {
      id: baseId,
      parentId: null,
      code: "B",
      name: "Integration Branching Demo",
      owner: "Tech Lead",
      status: "on-track",
      progress: 35,
      kind: "summary",
      start: apiStart,
      end: testEnd,
      resources: [{ employeeId: "emp-fe-01", role: "Tech Lead", allocation: 40, isPic: true }],
      phaseId: "development",
      phaseColor: "blue",
    },
    {
      id: baseId + 1,
      parentId: baseId,
      code: "B.1",
      name: "API Foundation",
      owner: "Backend",
      status: "on-track",
      progress: 60,
      kind: "task",
      start: apiStart,
      end: apiEnd,
      resources: [{ employeeId: "emp-be-01", role: "Backend Developer", allocation: 70, isPic: true }],
      phaseId: "development",
      phaseColor: "blue",
      effort: { value: 5, unit: "person-days" },
      weight: 2,
    },
    {
      id: baseId + 2,
      parentId: baseId,
      code: "B.2",
      name: "Frontend Integration",
      owner: "Frontend",
      status: "on-track",
      progress: 30,
      kind: "task",
      start: successorStart,
      end: successorEnd,
      resources: [{ employeeId: "emp-fe-01", role: "Frontend Developer", allocation: 70, isPic: true }],
      phaseId: "development",
      phaseColor: "blue",
      dependencies: [{ predecessorId: baseId + 1, type: "finish-to-start" }],
      effort: { value: 4, unit: "person-days" },
      weight: 1,
    },
    {
      id: baseId + 3,
      parentId: baseId,
      code: "B.3",
      name: "Mobile Integration",
      owner: "Mobile",
      status: "at-risk",
      progress: 20,
      kind: "task",
      start: successorStart,
      end: successorEnd,
      resources: [{ employeeId: "emp-ui-01", role: "Mobile Engineer", allocation: 60, isPic: true }],
      phaseId: "development",
      phaseColor: "blue",
      dependencies: [{ predecessorId: baseId + 1, type: "finish-to-start" }],
      effort: { value: 4, unit: "person-days" },
      weight: 1,
    },
    {
      id: baseId + 4,
      parentId: baseId,
      code: "B.4",
      name: "Integration Testing",
      owner: "QA",
      status: "on-track",
      progress: 0,
      kind: "task",
      start: testStart,
      end: testEnd,
      resources: [{ employeeId: "emp-qa-01", role: "QA Engineer", allocation: 80, isPic: true }],
      phaseId: "testing",
      phaseColor: "orange",
      dependencies: [
        { predecessorId: baseId + 2, type: "finish-to-start" },
        { predecessorId: baseId + 3, type: "finish-to-start" },
      ],
      effort: { value: 3, unit: "person-days" },
      weight: 1,
    }
  );
  return next;
}

function buildSprintCarryOverDemoTasks(): GanttTask[] {
  const sprintList = sprints.value.length >= 2 ? sprints.value : generateSprints(formatDateYmd(new Date()), sprintDuration.value, Math.max(2, sprintCount.value));
  sprints.value = sprintList;
  const sprint1 = sprintList[0];
  const sprint2 = sprintList[1];
  const start1 = new Date(sprint1.start);
  const end1 = new Date(sprint1.end);
  const start2 = new Date(sprint2.start);

  return [
    {
      id: 100,
      parentId: null,
      code: "S",
      name: "Sprint Delivery Demo",
      owner: "Product Team",
      status: "on-track",
      progress: 35,
      kind: "summary",
      start: sprint1.start,
      end: sprint2.end,
      resources: [{ employeeId: "emp-pm-01", role: "Product Manager", allocation: 40, isPic: true }],
      phaseId: "development",
      phaseColor: "blue",
      sprintId: sprint1.id,
    },
    {
      id: 101,
      parentId: 100,
      code: "S.1",
      name: "Sprint Planning",
      owner: "PM",
      status: "done",
      progress: 100,
      kind: "milestone",
      start: sprint1.start,
      end: sprint1.start,
      resources: [{ employeeId: "emp-pm-01", role: "Product Manager", allocation: 30, isPic: true }],
      phaseId: "discovery",
      phaseColor: "green",
      sprintId: sprint1.id,
    },
    {
      id: 102,
      parentId: 100,
      code: "S.2",
      name: "API Contract",
      owner: "Backend",
      status: "on-track",
      progress: 65,
      kind: "task",
      start: formatDateYmd(addDays(start1, 1)),
      end: formatDateYmd(addDays(start1, 5)),
      resources: [{ employeeId: "emp-be-01", role: "Backend Developer", allocation: 70, isPic: true }],
      phaseId: "development",
      phaseColor: "blue",
      sprintId: sprint1.id,
      effort: { value: 5, unit: "story-points" },
      weight: 2,
    },
    {
      id: 103,
      parentId: 100,
      code: "S.3",
      name: "UI Revision",
      owner: "Designer",
      status: "at-risk",
      progress: 40,
      kind: "task",
      start: formatDateYmd(addDays(end1, -3)),
      end: formatDateYmd(addDays(start2, 3)),
      resources: [
        { employeeId: "emp-ui-01", role: "UI/UX Designer", allocation: 60, isPic: true },
        { employeeId: "emp-fe-01", role: "Frontend Developer", allocation: 30 },
      ],
      phaseId: "design",
      phaseColor: "pink",
      sprintId: sprint1.id,
      dependencies: [{ predecessorId: 102, type: "finish-to-start" }],
      effort: { value: 8, unit: "story-points" },
      weight: 3,
    },
    {
      id: 104,
      parentId: 100,
      code: "S.4",
      name: "QA Signoff Milestone",
      owner: "QA",
      status: "on-track",
      progress: 0,
      kind: "milestone",
      start: formatDateYmd(addDays(start2, 5)),
      end: formatDateYmd(addDays(start2, 5)),
      resources: [{ employeeId: "emp-qa-01", role: "QA Engineer", allocation: 50, isPic: true }],
      phaseId: "testing",
      phaseColor: "orange",
      sprintId: sprint1.id,
      dependencies: [{ predecessorId: 103, type: "finish-to-start" }],
      effort: { value: 1, unit: "story-points" },
    },
  ];
}

function loadScenario(next: ScenarioId) {
  baselineTasks.value = [];
  baselineSetAt.value = "";
  showBaseline.value = false;
  hasSimulation.value = false;
  hasGeneratedWbs.value = false;
  sprintBackground.value = "alternating";

  if (next === "sprint") {
    planningMode.value = "sprint";
    barColorMode.value = "phase";
    selectedTemplate.value = "product-sprint";
    generateSprintPeriods();
    tasks.value = buildSprintCarryOverDemoTasks();
    return;
  }

  if (next === "baseline") {
    planningMode.value = "schedule";
    barColorMode.value = "phase";
    selectedTemplate.value = "software";
    tasks.value = cloneTasks(initialScheduleTasks);
    setBaseline();
    return;
  }

  if (next === "locked") {
    planningMode.value = "schedule";
    barColorMode.value = "phase";
    selectedTemplate.value = "software";
    tasks.value = buildTemplateTasks("software");
    hasGeneratedWbs.value = true;
    return;
  }

  planningMode.value = "schedule";
  barColorMode.value = "phase";
  selectedTemplate.value = "software";
  tasks.value = cloneTasks(initialScheduleTasks);
}

function assignSprints(list: GanttTask[]) {
  return list.map((task, index) => ({ ...task, sprintId: task.sprintId ?? sprints.value[index % Math.max(1, sprints.value.length)]?.id }));
}

function generateSprintPeriods() {
  sprints.value = generateSprints(tasks.value.find((task) => task.start)?.start ?? formatDateYmd(new Date()), sprintDuration.value, sprintCount.value);
  if (planningMode.value === "sprint") tasks.value = assignSprints(tasks.value);
}

function generateWbs(force = false) {
  if (tasks.value.length && hasGeneratedWbs.value && !force) return;
  const generated = buildTemplateTasks(selectedTemplate.value);
  tasks.value = planningMode.value === "sprint" ? assignSprints(generated) : generated;
  hasGeneratedWbs.value = true;
  baselineTasks.value = [];
  showBaseline.value = false;
}

function setBaseline() {
  baselineTasks.value = cloneTasks(tasks.value);
  baselineSetAt.value = new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });
}

function simulateProjectChanges() {
  if (!baselineTasks.value.length) setBaseline();
  const next = cloneTasks(tasks.value);
  const firstTask = next.find((task) => task.kind === "task" && task.start && task.end);
  if (firstTask) {
    firstTask.start = formatDateYmd(addDays(new Date(firstTask.start), 4));
    firstTask.end = formatDateYmd(addDays(new Date(firstTask.end), 4));
    firstTask.progress = Math.min(95, firstTask.progress + 25);
  }
  const secondTask = next.find((task) => task.kind === "task" && task.id !== firstTask?.id && task.end);
  if (secondTask) {
    secondTask.end = formatDateYmd(addDays(new Date(secondTask.end), 3));
    secondTask.resources = secondTask.resources.map((resource, index) => (index === 0 ? { ...resource, allocation: 90 } : resource));
  }
  const parent = next.find((task) => task.kind === "summary")?.id ?? null;
  next.push({
    id: Math.max(...next.map((task) => task.id), 0) + 1,
    parentId: parent,
    code: "NEW",
    name: "Change request review",
    owner: "PMO",
    status: "at-risk",
    progress: 10,
    kind: "task",
    start: formatDateYmd(addDays(new Date(), 2)),
    end: formatDateYmd(addDays(new Date(), 5)),
    resources: [{ employeeId: "emp-pm-01", role: "PM", allocation: 50, isPic: true }],
    phaseColor: "orange",
    phaseId: "release",
    source: "user",
    sprintId: planningMode.value === "sprint" ? sprints.value[0]?.id : undefined,
    effort: { value: 5, unit: "person-days" },
    weight: 2,
  });
  tasks.value = next;
  hasSimulation.value = true;
}

function compareBaseline() {
  if (!baselineTasks.value.length) setBaseline();
  showBaseline.value = true;
}

function resetDemo() {
  loadScenario(scenario.value);
}

function onChange(event: GanttChangeEvent) {
  console.debug("[gantt] change", event);
}
</script>

<template>
  <div class="space-y-4 min-w-0 gantt-docs-page">
    <PageHeader category="Mockup Pages" title="WBS Gantt Planner" description="Reusable planning component for schedule-based and sprint-based projects." />

    <div class="docs-hero card border border-slate-200 dark:border-slate-700">
      <div>
        <div class="docs-title-row">
          <h2>WBS Gantt Planner</h2>
          <span class="badge-beta">Beta</span>
          <span class="version-pill">vNext Demo</span>
        </div>
        <p>Use this page to select a planning mode, generate a WBS template, edit the schedule, capture a baseline, simulate changes, and compare current plan variance.</p>
      </div>
      <div class="stats-row">
        <span>Tasks <b>{{ summaryStats.taskCount }}</b></span>
        <span>Milestones <b>{{ summaryStats.milestoneCount }}</b></span>
        <span>Locked <b>{{ summaryStats.lockedCount }}</b></span>
      </div>
    </div>

    <div class="scenario-grid">
      <button v-for="item in scenarios" :key="item.id" type="button" class="scenario-card" :class="{ 'is-active': scenario === item.id }" @click="scenario = item.id">
        <strong>{{ item.title }}</strong>
        <span>{{ item.description }}</span>
      </button>
    </div>

    <div class="flow-stepper">
      <span v-for="(step, index) in flowSteps" :key="step" :class="{ 'is-current': index === (showBaseline ? 5 : baselineTasks.length ? 4 : hasGeneratedWbs ? 3 : 1) }">
        {{ index + 1 }}. {{ step }}
      </span>
    </div>

    <section class="config-card card border border-slate-200 dark:border-slate-700">
      <div class="config-grid">
        <label><span>Planning Mode</span><SelectDropdown v-model="planningMode" :options="planningModeOptions" size="sm" variant="outline" color="default" /></label>
        <label><span>Template</span><SelectDropdown v-model="selectedTemplate" :options="templateOptions" size="sm" variant="outline" color="default" /></label>
        <label><span>Timeline View</span><SelectDropdown v-model="activeView" :options="viewModes" size="sm" variant="outline" color="default" /></label>
        <label><span>Bar Meaning</span><SelectDropdown v-model="barColorMode" :options="barColorOptions" size="sm" variant="outline" color="default" /></label>
        <label><span>Dependencies</span><SelectDropdown v-model="dependencyDisplay" :options="dependencyOptions" size="sm" variant="outline" color="default" /></label>
        <label><span>Resource Label</span><SelectDropdown v-model="resourceLabel" :options="resourceLabelOptions" size="sm" variant="outline" color="default" /></label>
        <label><span>Baseline</span><SelectDropdown v-model="showBaselineOption" :options="baselineVisibilityOptions" size="sm" variant="outline" color="default" /></label>
        <template v-if="planningMode === 'sprint'">
          <label><span>Sprint Duration</span><SelectDropdown v-model="sprintDuration" :options="sprintDurationOptions" size="sm" variant="outline" color="default" /></label>
          <label><span>Sprint Count</span><input v-model.number="sprintCount" min="1" max="12" type="number" /></label>
          <label><span>Sprint Background</span><SelectDropdown v-model="sprintBackground" :options="sprintBackgroundOptions" size="sm" variant="outline" color="default" /></label>
        </template>
      </div>
      <div class="config-actions">
        <div class="template-preview">
          <strong>{{ selectedTemplateInfo.name }}</strong>
          <span>{{ selectedTemplateInfo.description }}</span>
          <small v-if="selectedTemplateInfo.phases.length">Preview: {{ selectedTemplateInfo.phases.join(' · ') }}</small>
        </div>
        <button type="button" class="docs-button" @click="generateWbs(hasGeneratedWbs)">{{ hasGeneratedWbs ? 'Replace WBS' : 'Generate WBS' }}</button>
        <button v-if="planningMode === 'sprint'" type="button" class="docs-button" @click="generateSprintPeriods">Generate Sprint Periods</button>
      </div>
    </section>

    <section class="baseline-card card border border-slate-200 dark:border-slate-700">
      <div class="baseline-actions">
        <button type="button" class="docs-button" @click="setBaseline">Set Baseline V1</button>
        <button type="button" class="docs-button" @click="simulateProjectChanges">Simulate Project Changes</button>
        <button type="button" class="docs-button" @click="compareBaseline">Compare with Baseline</button>
        <button type="button" class="docs-button is-ghost" @click="resetDemo">Reset Demo</button>
      </div>
      <div class="baseline-summary">
        <span>Baseline: <b>{{ baselineSetAt || 'Not set' }}</b></span>
        <span>Changed: <b>{{ summaryStats.changedTasks }}</b></span>
        <span>Delayed: <b>{{ summaryStats.delayedTasks }}</b></span>
        <span>Added: <b>{{ baselineTasks.length ? summaryStats.addedTasks : 0 }}</b></span>
        <span v-if="hasSimulation" class="text-amber-600">Simulation active</span>
      </div>
    </section>

    <div class="visual-guide card border border-slate-200 dark:border-slate-700">
      <strong>Sprint visual guide</strong>
      <span>Sprint bands use alternating backgrounds only. Task bars retain phase colors.</span>
      <ul>
        <li v-for="item in visualGuideItems" :key="item">{{ item }}</li>
      </ul>
    </div>

    <div class="legend-row card border border-slate-200 dark:border-slate-700">
      <strong>Color Legend</strong>
      <span v-for="item in legendItems" :key="item.label" class="legend-item"><i :style="{ background: item.color }"></i>{{ item.label }}</span>
    </div>

    <GanttChart
      v-model:tasks="tasks"
      :employees="ganttEmployees"
      :view="activeView"
      :planning-mode="planningMode"
      :sprints="sprints"
      :show-sprint-bands="planningMode === 'sprint' && sprintBackground === 'alternating'"
      :bar-color-mode="barColorMode"
      :dependency-display="dependencyDisplay"
      :resource-label="resourceLabel"
      :baseline-tasks="baselineTasks"
      :show-baseline="showBaseline"
      :show-validation="true"
      @change="onChange"
    />
  </div>
</template>

<style scoped>
.docs-hero,
.config-card,
.baseline-card,
.visual-guide,
.legend-row {
  padding: 1rem;
  background: #fff;
}

.docs-hero {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: center;
}

.docs-title-row,
.stats-row,
.baseline-actions,
.baseline-summary,
.visual-guide,
.legend-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.6rem;
}

.docs-title-row h2 {
  margin: 0;
  font-size: 1.1rem;
  font-weight: 800;
  color: #0f172a;
}

.docs-hero p,
.template-preview span,
.template-preview small,
.scenario-card span {
  color: #64748b;
  font-size: 0.78rem;
}

.badge-beta,
.version-pill {
  border-radius: 999px;
  padding: 0.18rem 0.5rem;
  font-size: 0.68rem;
  font-weight: 800;
}

.badge-beta { background: #dbeafe; color: #1d4ed8; }
.version-pill { background: #f1f5f9; color: #475569; }

.stats-row span,
.baseline-summary span {
  font-size: 0.78rem;
  color: #64748b;
}

.stats-row b,
.baseline-summary b {
  color: #0f172a;
}

.scenario-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.scenario-card {
  text-align: left;
  border: 1px solid #e2e8f0;
  background: #fff;
  border-radius: 0.75rem;
  padding: 0.9rem;
  cursor: pointer;
}

.scenario-card strong {
  display: block;
  margin-bottom: 0.25rem;
  color: #0f172a;
}

.scenario-card.is-active {
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.12);
}

.flow-stepper {
  display: flex;
  flex-wrap: wrap;
  gap: 0.35rem;
}

.flow-stepper span {
  border-radius: 999px;
  background: #f1f5f9;
  color: #64748b;
  padding: 0.35rem 0.65rem;
  font-size: 0.72rem;
  font-weight: 800;
}

.flow-stepper .is-current {
  background: #2563eb;
  color: #fff;
}

.config-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.75rem;
}

.config-grid label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.72rem;
  font-weight: 800;
  color: #475569;
}

.config-grid input {
  border: 1px solid #cbd5e1;
  border-radius: 0.5rem;
  padding: 0.45rem 0.55rem;
  background: #fff;
  color: #0f172a;
  font-size: 0.78rem;
}

.config-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.9rem;
}

.template-preview {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.docs-button {
  border: none;
  border-radius: 0.55rem;
  background: #2563eb;
  color: #fff;
  padding: 0.5rem 0.75rem;
  font-size: 0.74rem;
  font-weight: 800;
  cursor: pointer;
}

.docs-button.is-ghost {
  background: #f1f5f9;
  color: #334155;
}

.visual-guide strong,
.legend-row strong {
  color: #0f172a;
  font-size: 0.82rem;
  font-weight: 800;
}

.visual-guide span,
.visual-guide li {
  font-size: 0.74rem;
  color: #475569;
}

.legend-item {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.74rem;
  color: #475569;
}

.legend-item i {
  width: 0.8rem;
  height: 0.8rem;
  border-radius: 999px;
}

/*
 * NOTE: Vue's scoped-CSS ":global(x) y" form (unwrap only the ancestor part)
 * gets mangled by this project's build pipeline — the trailing "y" is silently
 * dropped, so the rule ends up only matching <html> itself. Wrapping the WHOLE
 * selector inside :global(...) is the form that survives the pipeline intact,
 * so every dark-mode override below uses that fully-wrapped shape.
 */
:global(.dark .visual-guide strong),
:global(.dark .legend-row strong),
:global([data-theme="mitrekadark"] .visual-guide strong),
:global([data-theme="mitrekadark"] .legend-row strong) {
  color: #f8fafc;
}

:global(.dark .visual-guide span),
:global(.dark .visual-guide li),
:global(.dark .legend-item),
:global([data-theme="mitrekadark"] .visual-guide span),
:global([data-theme="mitrekadark"] .visual-guide li),
:global([data-theme="mitrekadark"] .legend-item) {
  color: #cbd5e1;
}

:global(.dark .docs-hero),
:global(.dark .config-card),
:global(.dark .baseline-card),
:global(.dark .visual-guide),
:global(.dark .legend-row),
:global(.dark .scenario-card),
:global([data-theme="mitrekadark"] .docs-hero),
:global([data-theme="mitrekadark"] .config-card),
:global([data-theme="mitrekadark"] .baseline-card),
:global([data-theme="mitrekadark"] .visual-guide),
:global([data-theme="mitrekadark"] .legend-row),
:global([data-theme="mitrekadark"] .scenario-card) {
  background: #0f172a;
  border-color: #334155;
}

:global(.dark .docs-title-row h2),
:global(.dark .scenario-card strong),
:global(.dark .stats-row b),
:global(.dark .baseline-summary b),
:global([data-theme="mitrekadark"] .docs-title-row h2),
:global([data-theme="mitrekadark"] .scenario-card strong),
:global([data-theme="mitrekadark"] .stats-row b),
:global([data-theme="mitrekadark"] .baseline-summary b) {
  color: #f8fafc;
}

:global(.dark .config-grid input),
:global([data-theme="mitrekadark"] .config-grid input) {
  background: #111827;
  color: #e2e8f0;
  border-color: #334155;
}

@media (max-width: 1100px) {
  .scenario-grid,
  .config-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
