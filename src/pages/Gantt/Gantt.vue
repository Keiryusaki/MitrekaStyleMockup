<script setup lang="ts">
import { ref } from "vue";
import { GanttChart } from "@/components/gantt";
import type {
  GanttTask,
  GanttEmployee,
  ViewMode,
  GanttChangeEvent,
  GanttValidation,
} from "@/components/gantt";
import { ganttTasks, ganttEmployees } from "@/components/gantt/demo/ganttData";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const copiedId = ref<string | null>(null);

const tocItems: TOCItem[] = [
  { id: "import", label: "Import" },
  { id: "basic-usage", label: "Basic Usage" },
  { id: "view-modes", label: "View Modes" },
  { id: "binding-events", label: "Two-way Binding & Events" },
  { id: "labels", label: "Labels / i18n" },
  { id: "props", label: "Props Reference" },
  { id: "events", label: "Events" },
  { id: "types", label: "Types" },
  { id: "slots", label: "Slots" },
  { id: "advanced", label: "Advanced Exports" },
];

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Live demo state — clone the demo tasks so edits here don't leak into the
// shared array used by the Mockup page.
const tasks = ref<GanttTask[]>(ganttTasks.map((t) => ({ ...t })));
const employees = ref<GanttEmployee[]>(ganttEmployees);
const activeView = ref<ViewMode>("day");

const viewModes: Array<{ value: ViewMode; label: string }> = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
  { value: "year", label: "Year" },
];

// Live readout for the Events section.
const lastChange = ref<string>("—");
const lastValidation = ref<string>("—");

function onDemoChange(event: GanttChangeEvent) {
  lastChange.value = JSON.stringify(event);
}
function onDemoValidation(value: GanttValidation) {
  lastValidation.value = `hasIssues: ${value.hasIssues}, dependencyViolations: ${value.dependencyViolations.length}, overAllocations: ${value.overAllocations.length}`;
}

const codes = {
  import: `import { GanttChart } from "@/components/gantt";
import type { GanttTask, GanttEmployee } from "@/components/gantt";`,
  basic: `<script setup lang="ts">
import { ref } from "vue";
import { GanttChart } from "@/components/gantt";
import type { GanttTask, GanttEmployee } from "@/components/gantt";

const tasks = ref<GanttTask[]>([
  { id: 1, parentId: null, code: "", name: "Planning", owner: "PM",
    status: "on-track", progress: 40, kind: "summary",
    start: "2026-06-01", end: "2026-06-14", resources: [] },
  { id: 2, parentId: 1, code: "", name: "Kickoff", owner: "PM",
    status: "done", progress: 100, kind: "milestone",
    start: "2026-06-01", end: "2026-06-01", resources: [] },
]);

const employees = ref<GanttEmployee[]>([
  { id: "emp-01", name: "Rina Putri", role: "Product Manager" },
]);
<\/script>

<template>
  <GanttChart v-model:tasks="tasks" :employees="employees" />
</template>`,
  viewModes: `<!-- view: "day" | "week" | "month" | "year" (default: "day") -->
<GanttChart v-model:tasks="tasks" :view="activeView" />`,
  events: `<GanttChart
  v-model:tasks="tasks"
  :employees="employees"
  @change="onChange"
  @validation="onValidation"
/>

<script setup lang="ts">
import type { GanttChangeEvent, GanttValidation } from "@/components/gantt";

function onChange(e: GanttChangeEvent) {
  // e.type: "create" | "update" | "delete" | "reschedule" | "resources"
  console.log("changed", e);
}
function onValidation(v: GanttValidation) {
  // v.hasIssues, v.dependencyViolations, v.overAllocations
  console.log("validation", v);
}
<\/script>`,
  labels: `<!-- Override sebagian string UI (i18n). Lihat tipe GanttLabels. -->
<GanttChart
  v-model:tasks="tasks"
  :labels="{
    toolbarTitle: 'Project Timeline',
    addRootTask: '+ Add Task',
    searchPlaceholder: 'Search...',
  }"
/>`,
  types: `type ViewMode = "day" | "week" | "month" | "year";
type TaskStatus = "on-track" | "at-risk" | "done";
type TaskKind = "summary" | "task" | "milestone";

type GanttTask = {
  id: number;
  parentId: number | null;
  code: string;
  name: string;
  owner: string;
  status: TaskStatus;
  progress: number;        // 0..100
  kind: TaskKind;
  start: string;           // YYYY-MM-DD
  end: string;             // YYYY-MM-DD
  resources: Resource[];
  phaseColor?: "green" | "gray" | "pink" | "orange" | "blue";
  dependencies?: number[]; // predecessor task ids
};

type GanttEmployee = { id: string; name: string; role: string };

type GanttChangeEvent =
  | { type: "create"; task: GanttTask }
  | { type: "update"; task: GanttTask }
  | { type: "delete"; id: number }
  | { type: "reschedule"; id: number; start: string; end: string }
  | { type: "resources"; id: number; resources: Resource[] };

type GanttValidation = {
  dependencyViolations: DependencyViolation[];
  overAllocations: ResourceOverAllocation[];
  hasIssues: boolean;
};`,
  advanced: `// Selain komponen, barrel juga mengekspor composable & util:
import {
  useGanttState,
  buildSlots,
  flattenTasks,
  findDependencyViolations,
  findResourceOverAllocations,
  formatDateYmd,
} from "@/components/gantt";`,
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Components"
      title="Gantt Chart"
      description="Komponen perencana WBS + timeline: hierarki task di kiri, bar chart & dependency di kanan, dengan drag-resize, validasi jadwal/beban, dan marker today real-time."
    />

    <!-- Import -->
    <section id="import" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Import</h2>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.import, 'import')">
          {{ copiedId === 'import' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.import }}</code></pre>
      </div>
      <p class="text-sm opacity-80">
        Di project consumer (setelah komponen ini di-publish), import dari package:
        <code class="code-inline">import &#123; GanttChart &#125; from "@/lib/mitreka-ui-dist/vue";</code>
      </p>
    </section>

    <!-- Basic Usage -->
    <section id="basic-usage" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      <p class="text-sm opacity-80">
        Cukup ikat <code class="code-inline">v-model:tasks</code> dan (opsional)
        <code class="code-inline">:employees</code>. Coba ganti mode tampilan, drag/resize bar, atau edit task di demo bawah ini.
      </p>

      <div class="gantt-mode-switch">
        <button
          v-for="mode in viewModes"
          :key="mode.value"
          type="button"
          class="gantt-mode-button"
          :class="activeView === mode.value ? 'is-active' : ''"
          @click="activeView = mode.value"
        >
          {{ mode.label }}
        </button>
      </div>

      <div class="gantt-demo-frame">
        <GanttChart
          v-model:tasks="tasks"
          :employees="employees"
          :view="activeView"
          @change="onDemoChange"
          @validation="onDemoValidation"
        />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basic }}</code></pre>
      </div>
    </section>

    <!-- View Modes -->
    <section id="view-modes" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">View Modes</h2>
      <p class="text-sm opacity-80">
        Prop <code class="code-inline">view</code> mengatur granularitas timeline:
        <code class="code-inline">day</code>, <code class="code-inline">week</code>,
        <code class="code-inline">month</code>, atau <code class="code-inline">year</code>
        (default <code class="code-inline">day</code>). Gunakan toggle di section Basic Usage untuk melihat efeknya secara langsung.
      </p>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.viewModes, 'viewModes')">
          {{ copiedId === 'viewModes' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.viewModes }}</code></pre>
      </div>
    </section>

    <!-- Two-way Binding & Events -->
    <section id="binding-events" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Two-way Binding & Events</h2>
      <p class="text-sm opacity-80">
        <code class="code-inline">v-model:tasks</code> menjaga data tetap sinkron.
        <code class="code-inline">@change</code> memberi payload granular per mutasi (cocok untuk persistensi/API),
        sedangkan <code class="code-inline">@validation</code> melaporkan pelanggaran dependency & over-allocation.
      </p>

      <div class="grid sm:grid-cols-2 gap-3">
        <div class="rounded-lg border border-base-300 bg-base-200 p-3 text-xs">
          <div class="font-semibold mb-1 opacity-70">Last @change</div>
          <code class="break-all">{{ lastChange }}</code>
        </div>
        <div class="rounded-lg border border-base-300 bg-base-200 p-3 text-xs">
          <div class="font-semibold mb-1 opacity-70">Last @validation</div>
          <code class="break-all">{{ lastValidation }}</code>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.events, 'eventsCode')">
          {{ copiedId === 'eventsCode' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.events }}</code></pre>
      </div>
    </section>

    <!-- Labels / i18n -->
    <section id="labels" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Labels / i18n</h2>
      <p class="text-sm opacity-80">
        Semua teks UI bisa di-override sebagian lewat prop <code class="code-inline">labels</code>
        (tipe <code class="code-inline">Partial&lt;GanttLabels&gt;</code>). Default-nya campuran Indonesia/Inggris.
      </p>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.labels, 'labels')">
          {{ copiedId === 'labels' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.labels }}</code></pre>
      </div>
    </section>

    <!-- Props Reference -->
    <section id="props" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props Reference</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Prop</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Default</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">tasks</code></td>
              <td class="px-4 py-2">GanttTask[]</td>
              <td class="px-4 py-2">— (required)</td>
              <td class="px-4 py-2">Sumber data task. Mendukung <code class="code-inline">v-model:tasks</code>.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">employees</code></td>
              <td class="px-4 py-2">GanttEmployee[]</td>
              <td class="px-4 py-2">[]</td>
              <td class="px-4 py-2">Master karyawan untuk selector assignment resource.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">today</code></td>
              <td class="px-4 py-2">Date</td>
              <td class="px-4 py-2">new Date()</td>
              <td class="px-4 py-2">Tanggal marker garis "today".</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">view</code></td>
              <td class="px-4 py-2">"day" | "week" | "month" | "year"</td>
              <td class="px-4 py-2">"day"</td>
              <td class="px-4 py-2">Granularitas timeline.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">leftPanelWidth</code></td>
              <td class="px-4 py-2">number</td>
              <td class="px-4 py-2">480</td>
              <td class="px-4 py-2">Lebar (px) panel daftar task di kiri.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">rowHeight</code></td>
              <td class="px-4 py-2">number</td>
              <td class="px-4 py-2">32</td>
              <td class="px-4 py-2">Tinggi (px) satu baris task.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">enableUndoShortcut</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">true</td>
              <td class="px-4 py-2">Aktifkan shortcut global Ctrl/Cmd+Z untuk undo perubahan tanggal.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">defaultExpandedIds</code></td>
              <td class="px-4 py-2">number[]</td>
              <td class="px-4 py-2">semua summary</td>
              <td class="px-4 py-2">Id task yang ter-expand saat render awal.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">defaultCheckedIds</code></td>
              <td class="px-4 py-2">number[]</td>
              <td class="px-4 py-2">semua task done</td>
              <td class="px-4 py-2">Id task yang ter-check saat render awal.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">labels</code></td>
              <td class="px-4 py-2">Partial&lt;GanttLabels&gt;</td>
              <td class="px-4 py-2">—</td>
              <td class="px-4 py-2">Override sebagian string UI (i18n).</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">showValidation</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">true</td>
              <td class="px-4 py-2">Tampilkan banner validasi (dependency + workload).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events -->
    <section id="events" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Events</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Event</th>
              <th class="px-4 py-2 text-left">Payload</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">update:tasks</code></td>
              <td class="px-4 py-2">GanttTask[]</td>
              <td class="px-4 py-2">Sinkronisasi <code class="code-inline">v-model:tasks</code> setiap data berubah.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">change</code></td>
              <td class="px-4 py-2">GanttChangeEvent</td>
              <td class="px-4 py-2">Mutasi granular: create / update / delete / reschedule / resources.</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">validation</code></td>
              <td class="px-4 py-2">GanttValidation</td>
              <td class="px-4 py-2">Hasil validasi terkini (untuk toast / gating tombol simpan).</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Types -->
    <section id="types" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Types</h2>
      <p class="text-sm opacity-80">Tipe publik inti yang diekspor dari <code class="code-inline">@/components/gantt</code>.</p>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.types, 'types')">
          {{ copiedId === 'types' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.types }}</code></pre>
      </div>
    </section>

    <!-- Slots -->
    <section id="slots" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Slots</h2>
      <p class="text-sm opacity-80">
        Komponen ini <strong>self-contained</strong> dan tidak mengekspos slot. Untuk kustomisasi teks/label,
        gunakan prop <code class="code-inline">labels</code>; untuk data, gunakan <code class="code-inline">v-model:tasks</code> dan <code class="code-inline">employees</code>.
      </p>
    </section>

    <!-- Advanced Exports -->
    <section id="advanced" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Advanced Exports</h2>
      <p class="text-sm opacity-80">
        Untuk kebutuhan lanjutan (mis. membangun UI Gantt sendiri), barrel juga mengekspor composable
        <code class="code-inline">useGanttState</code> dan util murni.
      </p>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.advanced, 'advanced')">
          {{ copiedId === 'advanced' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.advanced }}</code></pre>
      </div>
    </section>

    <!-- Floating TOC -->
    <FloatingTOC :items="tocItems" title="Gantt Chart" />
  </div>
</template>

<style scoped>
/* Scroll margin for TOC navigation */
section[id] {
  scroll-margin-top: 5rem;
}

.gantt-demo-frame {
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  overflow: hidden;
}

.gantt-mode-switch {
  display: inline-grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.25rem;
  background: var(--color-base-200);
  border-radius: 0.5rem;
  padding: 0.2rem;
}

.gantt-mode-button {
  border: none;
  border-radius: 0.4rem;
  padding: 0.4rem 0.75rem;
  background: transparent;
  font-size: 0.74rem;
  font-weight: 600;
  color: var(--color-base-content);
  opacity: 0.7;
  cursor: pointer;
}

.gantt-mode-button.is-active {
  opacity: 1;
  background: var(--color-base-100);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
}

.code-block {
  position: relative;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  overflow: hidden;
}
.code-block pre {
  padding: 1rem;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}
.code-block code {
  font-family: ui-monospace, monospace;
}
.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 12px;
  background: var(--color-base-300);
  border: none;
  border-radius: var(--radius-field-sm);
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.15s, background 0.15s;
}
.copy-btn:hover {
  opacity: 1;
  background: var(--color-primary);
  color: var(--color-primary-content);
}
.code-inline {
  background: var(--color-base-200);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, monospace;
}
</style>
