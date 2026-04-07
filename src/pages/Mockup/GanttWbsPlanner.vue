<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";

type ViewMode = "day" | "week" | "month" | "year";
type TaskKind = "summary" | "task" | "milestone";
type TaskStatus = "on-track" | "at-risk" | "done";
type ResourceTone = "slate" | "teal" | "amber" | "rose" | "indigo";

type Resource = { role: string; tone: ResourceTone };
type GanttTask = {
  id: number;
  parentId: number | null;
  code: string;
  name: string;
  owner: string;
  status: TaskStatus;
  progress: number;
  kind: TaskKind;
  start: string;
  end: string;
  resources: Resource[];
};
type FlattenedTask = GanttTask & { depth: number; childrenCount: number; startDate: Date; endDate: Date };
type TimeSlot = {
  key: string;
  label: string;
  shortLabel: string;
  groupLabel: string;
  start: Date;
  end: Date;
  isToday: boolean;
};

const LEFT_PANEL_WIDTH = 420;
const today = startOfDay(new Date("2026-05-14"));
const activeView = ref<ViewMode>("week");
const viewModes: Array<{ value: ViewMode; label: string }> = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

const ganttTasks: GanttTask[] = [
  { id: 1, parentId: null, code: "1.0", name: "Tender Delivery Program", owner: "PMO", status: "on-track", progress: 42, kind: "summary", start: "2026-04-07", end: "2026-06-26", resources: [{ role: "Governance", tone: "slate" }, { role: "Lead", tone: "indigo" }] },
  { id: 2, parentId: 1, code: "1.1", name: "Initiation & Alignment", owner: "Tender Office", status: "done", progress: 100, kind: "summary", start: "2026-04-07", end: "2026-04-24", resources: [{ role: "Lead", tone: "indigo" }, { role: "Sponsor", tone: "teal" }] },
  { id: 3, parentId: 2, code: "1.1.1", name: "Scope review and assumptions lock", owner: "Tender Analyst", status: "done", progress: 100, kind: "task", start: "2026-04-07", end: "2026-04-15", resources: [{ role: "Analyst", tone: "teal" }, { role: "Reviewer", tone: "amber" }] },
  { id: 4, parentId: 2, code: "1.1.2", name: "Kickoff with delivery and commercial teams", owner: "PM", status: "done", progress: 100, kind: "task", start: "2026-04-16", end: "2026-04-24", resources: [{ role: "PM", tone: "slate" }, { role: "Commercial", tone: "rose" }] },
  { id: 5, parentId: 1, code: "1.2", name: "Work Breakdown Structure", owner: "PMO", status: "on-track", progress: 68, kind: "summary", start: "2026-04-21", end: "2026-05-22", resources: [{ role: "Coordinator", tone: "slate" }, { role: "Owner", tone: "teal" }] },
  { id: 6, parentId: 5, code: "1.2.1", name: "Build level 1-3 WBS and deliverable map", owner: "Solution Architect", status: "on-track", progress: 90, kind: "task", start: "2026-04-21", end: "2026-05-06", resources: [{ role: "Architect", tone: "teal" }, { role: "Reviewer", tone: "amber" }] },
  { id: 7, parentId: 5, code: "1.2.2", name: "Resource assignment and effort balancing", owner: "PMO", status: "at-risk", progress: 55, kind: "task", start: "2026-05-01", end: "2026-05-22", resources: [{ role: "PMO", tone: "slate" }, { role: "Execution", tone: "indigo" }, { role: "Backend", tone: "rose" }] },
  { id: 8, parentId: 1, code: "1.3", name: "Proposal Production", owner: "Commercial Lead", status: "at-risk", progress: 34, kind: "summary", start: "2026-05-10", end: "2026-06-26", resources: [{ role: "Lead", tone: "rose" }, { role: "Support", tone: "indigo" }] },
  { id: 9, parentId: 8, code: "1.3.1", name: "Narrative writing and value proposition", owner: "Bid Writer", status: "on-track", progress: 65, kind: "task", start: "2026-05-18", end: "2026-06-03", resources: [{ role: "Writer", tone: "teal" }, { role: "Input", tone: "rose" }] },
  { id: 10, parentId: 8, code: "1.3.2", name: "Executive pricing review", owner: "Finance", status: "at-risk", progress: 20, kind: "task", start: "2026-06-01", end: "2026-06-12", resources: [{ role: "Approval", tone: "amber" }, { role: "Control", tone: "slate" }] },
  { id: 11, parentId: 8, code: "1.3.3", name: "Submit final package", owner: "Tender Office", status: "on-track", progress: 0, kind: "milestone", start: "2026-06-24", end: "2026-06-24", resources: [{ role: "Submitter", tone: "indigo" }] },
  { id: 12, parentId: 1, code: "1.4", name: "Post-Submission Readiness", owner: "PM", status: "on-track", progress: 12, kind: "summary", start: "2026-06-16", end: "2026-06-30", resources: [{ role: "Lead", tone: "slate" }, { role: "Support", tone: "teal" }] },
  { id: 13, parentId: 12, code: "1.4.1", name: "Presentation rehearsal", owner: "Presales", status: "on-track", progress: 10, kind: "task", start: "2026-06-17", end: "2026-06-23", resources: [{ role: "Presales", tone: "teal" }, { role: "Reviewer", tone: "amber" }] },
  { id: 14, parentId: 12, code: "1.4.2", name: "Clarification response standby", owner: "Tender Office", status: "on-track", progress: 0, kind: "task", start: "2026-06-24", end: "2026-06-30", resources: [{ role: "Owner", tone: "indigo" }, { role: "Legal", tone: "amber" }] },
];

const expandedIds = reactive(new Set<number>([1, 2, 5, 8, 12]));

const parsedTasks = computed(() =>
  ganttTasks.map((task) => ({
    ...task,
    startDate: startOfDay(new Date(task.start)),
    endDate: endOfDay(new Date(task.end)),
  }))
);

const planBounds = computed(() => {
  const minStart = parsedTasks.value.reduce((acc, task) => (task.startDate < acc ? task.startDate : acc), parsedTasks.value[0]?.startDate ?? today);
  const maxEnd = parsedTasks.value.reduce((acc, task) => (task.endDate > acc ? task.endDate : acc), parsedTasks.value[0]?.endDate ?? today);

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
  const taskCount = ganttTasks.filter((task) => task.kind === "task").length;
  const milestoneCount = ganttTasks.filter((task) => task.kind === "milestone").length;
  const atRiskCount = ganttTasks.filter((task) => task.status === "at-risk").length;
  const assignedRoles = new Set(ganttTasks.flatMap((task) => task.resources.map((resource) => resource.role))).size;
  return { taskCount, milestoneCount, atRiskCount, assignedRoles };
});

const flattenedTasks = computed<FlattenedTask[]>(() => {
  const childrenMap = new Map<number | null, FlattenedTask[]>();
  parsedTasks.value.forEach((task) => {
    const list = childrenMap.get(task.parentId) ?? [];
    list.push({ ...task, depth: 0, childrenCount: 0 });
    childrenMap.set(task.parentId, list);
  });
  const output: FlattenedTask[] = [];
  const walk = (parentId: number | null, depth = 0) => {
    const children = childrenMap.get(parentId) ?? [];
    children.forEach((task) => {
      const taskChildren = childrenMap.get(task.id) ?? [];
      output.push({ ...task, depth, childrenCount: taskChildren.length });
      if (taskChildren.length && expandedIds.has(task.id)) walk(task.id, depth + 1);
    });
  };
  walk(null);
  return output;
});

const todayColumn = computed(() => {
  const index = slots.value.findIndex((slot) => slot.isToday);
  return index >= 0 ? index + 1 : null;
});

function toggleExpand(id: number) {
  if (expandedIds.has(id)) expandedIds.delete(id);
  else expandedIds.add(id);
}

function rowGridColumns() {
  return `${LEFT_PANEL_WIDTH}px repeat(${slots.value.length}, ${slotSize.value}px)`;
}

function timelineColumns() {
  return `repeat(${slots.value.length}, ${slotSize.value}px)`;
}

function taskBarStyle(task: FlattenedTask) {
  const range = rangeForTask(task, slots.value);
  if (!range) return { display: "none" };
  return { gridColumn: `${range.start} / span ${task.kind === "milestone" ? 1 : Math.max(1, range.span)}` };
}

function progressStyle(task: FlattenedTask) {
  return { width: `${Math.max(6, Math.min(task.progress, 100))}%` };
}

function indentStyle(depth: number) {
  return { paddingLeft: `${depth * 18 + 8}px` };
}

function statusClass(status: TaskStatus) {
  if (status === "done") return "gantt-status gantt-status-done";
  if (status === "at-risk") return "gantt-status gantt-status-risk";
  return "gantt-status gantt-status-track";
}

function barClass(task: FlattenedTask) {
  if (task.kind === "summary") return "gantt-bar gantt-bar-summary";
  if (task.kind === "milestone") return "gantt-milestone";
  if (task.status === "done") return "gantt-bar gantt-bar-done";
  if (task.status === "at-risk") return "gantt-bar gantt-bar-risk";
  return "gantt-bar gantt-bar-task";
}

function resourceToneClass(tone: ResourceTone) {
  return `resource-chip-${tone}`;
}

function startOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}
function endOfDay(date: Date) {
  const next = new Date(date);
  next.setHours(23, 59, 59, 999);
  return next;
}
function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
function addMonths(date: Date, months: number) {
  return new Date(date.getFullYear(), date.getMonth() + months, 1);
}
function addYears(date: Date, years: number) {
  return new Date(date.getFullYear() + years, 0, 1);
}
function startOfWeek(date: Date) {
  const next = startOfDay(date);
  const day = next.getDay();
  return addDays(next, day === 0 ? -6 : 1 - day);
}
function endOfWeek(date: Date) {
  return endOfDay(addDays(startOfWeek(date), 6));
}
function startOfMonth(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date: Date) {
  return endOfDay(new Date(date.getFullYear(), date.getMonth() + 1, 0));
}
function startOfYear(date: Date) {
  return new Date(date.getFullYear(), 0, 1);
}
function endOfYear(date: Date) {
  return endOfDay(new Date(date.getFullYear(), 11, 31));
}
function weekOfMonth(date: Date) {
  return Math.ceil(date.getDate() / 7);
}
function slotPixelWidth(mode: ViewMode) {
  if (mode === "day") return 38;
  if (mode === "week") return 92;
  if (mode === "month") return 176;
  return 220;
}

function buildSlots(mode: ViewMode, start: Date, end: Date, marker: Date): TimeSlot[] {
  const output: TimeSlot[] = [];
  if (mode === "day") {
    let cursor = startOfDay(start);
    while (cursor <= endOfDay(end)) {
      output.push({ key: cursor.toISOString(), label: String(cursor.getDate()).padStart(2, "0"), shortLabel: cursor.toLocaleDateString("en-US", { weekday: "short" }), groupLabel: cursor.toLocaleDateString("en-US", { month: "short", year: "numeric" }), start: startOfDay(cursor), end: endOfDay(cursor), isToday: cursor.getTime() === startOfDay(marker).getTime() });
      cursor = addDays(cursor, 1);
    }
    return output;
  }
  if (mode === "week") {
    let cursor = startOfWeek(start);
    while (cursor <= endOfWeek(end)) {
      output.push({ key: cursor.toISOString(), label: `W${weekOfMonth(cursor)}`, shortLabel: cursor.toLocaleDateString("en-US", { month: "short", day: "numeric" }), groupLabel: cursor.toLocaleDateString("en-US", { month: "short", year: "numeric" }), start: startOfWeek(cursor), end: endOfWeek(cursor), isToday: marker >= startOfWeek(cursor) && marker <= endOfWeek(cursor) });
      cursor = addDays(cursor, 7);
    }
    return output;
  }
  if (mode === "month") {
    let cursor = startOfMonth(start);
    while (cursor <= endOfMonth(end)) {
      output.push({ key: cursor.toISOString(), label: cursor.toLocaleDateString("en-US", { month: "short" }), shortLabel: cursor.toLocaleDateString("en-US", { year: "numeric" }), groupLabel: cursor.getFullYear().toString(), start: startOfMonth(cursor), end: endOfMonth(cursor), isToday: marker >= startOfMonth(cursor) && marker <= endOfMonth(cursor) });
      cursor = addMonths(cursor, 1);
    }
    return output;
  }
  let cursor = startOfYear(addYears(start, -1));
  while (cursor <= endOfYear(addYears(end, 1))) {
    output.push({ key: cursor.toISOString(), label: cursor.getFullYear().toString(), shortLabel: "Year", groupLabel: "Planning Horizon", start: startOfYear(cursor), end: endOfYear(cursor), isToday: marker >= startOfYear(cursor) && marker <= endOfYear(cursor) });
    cursor = addYears(cursor, 1);
  }
  return output;
}

function rangeForTask(task: FlattenedTask, timeSlots: TimeSlot[]) {
  const active = timeSlots.map((slot, index) => ({ slot, index })).filter(({ slot }) => task.endDate >= slot.start && task.startDate <= slot.end);
  if (!active.length) return null;
  return { start: active[0].index + 1, span: active[active.length - 1].index - active[0].index + 1 };
}
</script>

<template>
  <div class="space-y-4 min-w-0">
    <PageHeader category="Mockup Pages" title="Gantt WBS Planner" description="Mockup planner dengan hierarchy kiri yang stabil, grid kanan penuh saat scroll, dan mode Day / Week / Month / Year." />

    <section class="grid grid-cols-1 xl:grid-cols-[1.4fr_0.9fr] gap-4">
      <div class="card p-5 gantt-hero">
        <div class="flex flex-wrap items-start justify-between gap-4">
          <div class="space-y-3 max-w-3xl">
            <span class="gantt-kicker">Tender Planning Workspace</span>
            <h2 class="m-0 text-2xl md:text-[2rem] font-semibold tracking-[-0.03em] text-slate-900">WBS hierarchy on the left, planning horizon on the right.</h2>
            <p class="m-0 text-sm leading-6 text-slate-600">Task dan owner di kiri dibuat lebih rapi, sementara timeline kanan dirender penuh sesuai mode waktu aktif supaya tidak ada area kosong saat scroll mentok.</p>
          </div>
          <div class="gantt-hero-panel">
            <div class="text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-slate-500">View Mode</div>
            <div class="mt-3 gantt-mode-switch">
              <button v-for="mode in viewModes" :key="mode.value" type="button" class="gantt-mode-button" :class="{ 'is-active': activeView === mode.value }" @click="activeView = mode.value">
                {{ mode.label }}
              </button>
            </div>
            <div class="mt-4 text-sm text-slate-600">Default `Week` paling cocok untuk WBS tender. `Day` untuk detail, `Month` untuk overview, `Year` untuk horizon planning.</div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <article class="card p-4 gantt-stat"><div class="text-[0.74rem] uppercase tracking-[0.14em] text-slate-500">Execution Tasks</div><div class="mt-2 text-3xl font-semibold text-slate-900">{{ summaryStats.taskCount }}</div><div class="mt-1 text-sm text-slate-600">Child execution rows.</div></article>
        <article class="card p-4 gantt-stat"><div class="text-[0.74rem] uppercase tracking-[0.14em] text-slate-500">Milestones</div><div class="mt-2 text-3xl font-semibold text-slate-900">{{ summaryStats.milestoneCount }}</div><div class="mt-1 text-sm text-slate-600">Submission checkpoint.</div></article>
        <article class="card p-4 gantt-stat"><div class="text-[0.74rem] uppercase tracking-[0.14em] text-slate-500">Assigned Roles</div><div class="mt-2 text-3xl font-semibold text-slate-900">{{ summaryStats.assignedRoles }}</div><div class="mt-1 text-sm text-slate-600">Compact resource chips.</div></article>
        <article class="card p-4 gantt-stat"><div class="text-[0.74rem] uppercase tracking-[0.14em] text-slate-500">Watchlist</div><div class="mt-2 text-3xl font-semibold text-amber-700">{{ summaryStats.atRiskCount }}</div><div class="mt-1 text-sm text-slate-600">Rows needing PM attention.</div></article>
      </div>
    </section>

    <section class="card p-0 overflow-hidden">
      <div class="overflow-auto gantt-scroll-shell">
        <div class="gantt-board" :style="{ width: `${boardWidth}px` }">
          <div class="gantt-row gantt-header-month" :style="{ gridTemplateColumns: rowGridColumns() }">
            <div class="gantt-left-header sticky-left month-header-left">
              <div class="text-[0.7rem] uppercase tracking-[0.16em] text-slate-500">Hierarchy</div>
              <div class="mt-1 text-sm font-semibold text-slate-900">Work Breakdown Structure</div>
            </div>
            <div v-for="group in monthGroups" :key="group.label" class="gantt-month-cell" :style="{ gridColumn: `span ${group.span}` }">{{ group.label }}</div>
          </div>

          <div class="gantt-row gantt-header-week" :style="{ gridTemplateColumns: rowGridColumns() }">
            <div class="gantt-left-header sticky-left week-header-left">
              <div class="grid grid-cols-[1fr_86px_120px] gap-3 text-[0.69rem] font-semibold uppercase tracking-[0.12em] text-slate-500">
                <span>Task</span><span>Status</span><span>Resources</span>
              </div>
            </div>
            <div v-for="slot in slots" :key="slot.key" class="gantt-week-cell" :class="{ 'today-week': slot.isToday }">
              <span>{{ slot.label }}</span>
              <small>{{ slot.shortLabel }}</small>
            </div>
          </div>

          <div v-for="task in flattenedTasks" :key="task.id" class="gantt-row gantt-task-row" :class="{ 'is-summary-row': task.kind === 'summary' }" :style="{ gridTemplateColumns: rowGridColumns() }">
            <div class="gantt-left-cell sticky-left">
              <div class="gantt-left-grid">
                <div class="gantt-task-main" :style="indentStyle(task.depth)">
                  <button v-if="task.childrenCount" type="button" class="gantt-toggle" @click="toggleExpand(task.id)">
                    <Icon :name="expandedIds.has(task.id) ? 'chevron-down' : 'chevron-right'" class="w-4 h-4" />
                  </button>
                  <span v-else class="gantt-toggle-placeholder"></span>
                  <span v-if="task.depth > 0" class="gantt-tree-rail"></span>
                  <div class="min-w-0">
                    <div class="flex items-center gap-2 min-w-0">
                      <span class="gantt-code">{{ task.code }}</span>
                      <span class="gantt-task-name truncate">{{ task.name }}</span>
                    </div>
                    <div class="mt-1 gantt-task-meta truncate">
                      <span class="gantt-owner-inline">{{ task.owner }}</span>
                      <span class="gantt-meta-dot"></span>
                      <span>{{ task.kind === "summary" ? "Summary task" : task.kind === "milestone" ? "Milestone" : "Execution task" }}</span>
                    </div>
                  </div>
                </div>

                <div><span :class="statusClass(task.status)">{{ task.status.replace("-", " ") }}</span></div>
                <div class="gantt-resource-list">
                  <span v-for="resource in task.resources.slice(0, 2)" :key="`${task.id}-${resource.role}`" class="resource-chip" :class="resourceToneClass(resource.tone)">{{ resource.role }}</span>
                  <span v-if="task.resources.length > 2" class="resource-chip resource-chip-more">+{{ task.resources.length - 2 }}</span>
                </div>
              </div>
            </div>

            <div v-for="slot in slots" :key="`${task.id}-${slot.key}`" class="gantt-grid-cell" :class="{ 'today-week': slot.isToday }"></div>

            <div class="gantt-track" :style="{ gridColumn: `2 / span ${slots.length}`, gridTemplateColumns: timelineColumns() }">
              <div v-if="task.kind === 'milestone'" :class="barClass(task)" :style="taskBarStyle(task)"><span class="gantt-milestone-diamond"></span></div>
              <div v-else :class="barClass(task)" :style="taskBarStyle(task)">
                <div v-if="task.kind !== 'summary'" class="gantt-progress-fill" :style="progressStyle(task)"></div>
                <span class="gantt-bar-label"><span class="truncate">{{ task.name }}</span><small v-if="task.kind !== 'summary'" class="gantt-bar-meta">{{ task.progress }}%</small></span>
              </div>
              <div v-if="todayColumn !== null" class="gantt-today-line" :style="{ gridColumn: `${todayColumn} / span 1` }"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.gantt-hero { position: relative; overflow: hidden; border: 1px solid rgba(148,163,184,.22); background: radial-gradient(circle at top right, rgba(59,130,246,.16), transparent 38%), linear-gradient(135deg, rgba(248,250,252,.98), rgba(241,245,249,.94)); }
.gantt-hero-panel { min-width: 260px; max-width: 320px; border: 1px solid rgba(148,163,184,.24); border-radius: 16px; padding: .95rem 1rem; background: rgba(255,255,255,.78); backdrop-filter: blur(10px); }
.gantt-kicker { display: inline-flex; align-items: center; border-radius: 999px; padding: .35rem .7rem; font-size: .7rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; color: #0f766e; background: rgba(20,184,166,.1); }
.gantt-mode-switch { display: inline-grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: .35rem; }
.gantt-mode-button { border: 1px solid rgba(203,213,225,1); border-radius: .75rem; padding: .5rem .65rem; background: #fff; font-size: .74rem; font-weight: 700; color: #475569; }
.gantt-mode-button.is-active { border-color: rgba(15,118,110,.26); color: #0f766e; background: rgba(20,184,166,.1); }
.gantt-stat { border: 1px solid rgba(148,163,184,.18); background: linear-gradient(180deg, rgba(255,255,255,1), rgba(248,250,252,1)); }

.gantt-scroll-shell { max-width: 100%; }
.gantt-board { position: relative; min-width: 100%; color: #0f172a; }
.gantt-row { display: grid; position: relative; }
.gantt-header-month, .gantt-header-week { position: sticky; top: 0; z-index: 20; }
.gantt-header-month { background: #f8fafc; border-bottom: 1px solid rgba(226,232,240,1); }
.gantt-header-week { top: 50px; background: rgba(255,255,255,.98); border-bottom: 1px solid rgba(226,232,240,1); }
.gantt-left-header, .gantt-left-cell { border-right: 1px solid rgba(226,232,240,1); background: #fff; }
.sticky-left { position: sticky; left: 0; z-index: 15; }
.month-header-left, .week-header-left { z-index: 25; }
.month-header-left { padding: .8rem .9rem; background: #f8fafc; }
.week-header-left { padding: .7rem .9rem; background: rgba(255,255,255,.98); }

.gantt-month-cell, .gantt-week-cell { display: flex; align-items: center; justify-content: center; min-height: 50px; font-size: .72rem; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: #64748b; border-left: 1px solid rgba(226,232,240,.8); }
.gantt-week-cell { flex-direction: column; gap: .16rem; min-height: 44px; letter-spacing: .04em; }
.gantt-week-cell small { font-size: .6rem; color: #94a3b8; }

.gantt-task-row { min-height: 66px; border-bottom: 1px solid rgba(226,232,240,.92); background: #fff; }
.gantt-task-row:hover .gantt-left-cell, .gantt-task-row:hover .gantt-grid-cell { background: #f8fbff; }
.gantt-task-row.is-summary-row .gantt-left-cell, .gantt-task-row.is-summary-row .gantt-grid-cell { background: linear-gradient(180deg, rgba(248,250,252,.98), rgba(241,245,249,.98)); }
.gantt-left-cell { display: flex; align-items: center; padding: .55rem .9rem; z-index: 10; }
.gantt-left-grid { width: 100%; display: grid; grid-template-columns: minmax(0, 1fr) 86px 120px; gap: .7rem; align-items: center; }
.gantt-task-main { display: flex; align-items: center; gap: .42rem; min-width: 0; }
.gantt-toggle { width: 1.5rem; height: 1.5rem; border: 1px solid rgba(203,213,225,.95); border-radius: .55rem; display: inline-flex; align-items: center; justify-content: center; flex-shrink: 0; background: #fff; color: #475569; }
.gantt-toggle-placeholder { width: 1.5rem; flex-shrink: 0; }
.gantt-tree-rail { width: .75rem; height: 1px; flex-shrink: 0; background: rgba(148,163,184,.8); }
.gantt-code { flex-shrink: 0; border-radius: 999px; padding: .14rem .42rem; font-size: .62rem; font-weight: 700; color: #0f766e; background: rgba(20,184,166,.1); }
.gantt-task-name { font-size: .84rem; font-weight: 600; color: #0f172a; }
.gantt-task-meta { display: flex; align-items: center; gap: .38rem; min-width: 0; font-size: .68rem; color: #64748b; }
.gantt-owner-inline { color: #475569; font-weight: 600; }
.gantt-meta-dot { width: 4px; height: 4px; flex-shrink: 0; border-radius: 999px; background: rgba(148,163,184,.8); }
.gantt-resource-list { display: flex; align-items: center; gap: .28rem; flex-wrap: wrap; }

.resource-chip { display: inline-flex; align-items: center; justify-content: center; border-radius: 999px; padding: .14rem .42rem; font-size: .62rem; font-weight: 700; }
.resource-chip-slate { color: #334155; background: rgba(148,163,184,.16); }
.resource-chip-teal { color: #0f766e; background: rgba(20,184,166,.12); }
.resource-chip-amber { color: #b45309; background: rgba(245,158,11,.14); }
.resource-chip-rose { color: #be123c; background: rgba(244,63,94,.12); }
.resource-chip-indigo { color: #4338ca; background: rgba(99,102,241,.12); }
.resource-chip-more { color: #475569; background: rgba(226,232,240,1); }

.gantt-status { display: inline-flex; align-items: center; border-radius: 999px; padding: .18rem .48rem; font-size: .63rem; font-weight: 700; text-transform: capitalize; }
.gantt-status-track { color: #0f766e; background: rgba(20,184,166,.12); }
.gantt-status-risk { color: #b45309; background: rgba(245,158,11,.16); }
.gantt-status-done { color: #334155; background: rgba(148,163,184,.18); }

.gantt-grid-cell { min-height: 66px; border-left: 1px solid rgba(226,232,240,.76); background: #fff; }
.gantt-track { position: absolute; inset: 0 -8px 0 420px; display: grid; pointer-events: none; overflow: hidden; }
.gantt-bar, .gantt-milestone { position: relative; align-self: center; height: 18px; margin: 0 6px; border-radius: 999px; overflow: hidden; box-shadow: inset 0 0 0 1px rgba(255,255,255,.22); }
.gantt-bar { display: flex; align-items: center; min-width: 26px; }
.gantt-bar-summary { height: 20px; border-radius: 9px; background: linear-gradient(90deg, #0f172a, #1e293b); }
.gantt-bar-task { background: linear-gradient(90deg, #0f766e, #14b8a6); }
.gantt-bar-risk { background: linear-gradient(90deg, #b45309, #f59e0b); }
.gantt-bar-done { background: linear-gradient(90deg, #64748b, #94a3b8); }
.gantt-progress-fill { position: absolute; inset: 0 auto 0 0; background: rgba(255,255,255,.22); }
.gantt-bar-label { position: relative; z-index: 1; display: inline-flex; align-items: center; gap: .38rem; min-width: 0; padding: 0 .55rem; font-size: .64rem; font-weight: 700; color: #fff; }
.gantt-bar-label .truncate { display: block; min-width: 0; }
.gantt-bar-meta { flex-shrink: 0; font-size: .58rem; opacity: .82; }
.gantt-milestone { display: flex; align-items: center; justify-content: center; height: auto; margin: 0; overflow: visible; }
.gantt-milestone-diamond { width: 14px; height: 14px; display: block; transform: rotate(45deg); border-radius: 3px; background: linear-gradient(135deg, #0f172a, #334155); box-shadow: 0 0 0 3px rgba(15,23,42,.08); }
.gantt-today-line { align-self: stretch; justify-self: center; width: 1px; background: linear-gradient(180deg, rgba(239,68,68,.08), rgba(239,68,68,.72), rgba(239,68,68,.08)); }
.today-week { background: linear-gradient(180deg, rgba(254,242,242,.82), rgba(255,255,255,.92)); }

@media (max-width: 1024px) {
  .gantt-left-grid { grid-template-columns: minmax(0, 1fr) 78px 104px; gap: .55rem; }
}
</style>
