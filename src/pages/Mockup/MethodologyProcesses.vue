<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Input from "@/components/controls/Input.vue";
import SelectInput from "@/components/controls/SelectInput.vue";
import MultiSelect from "@/components/controls/MultiSelect.vue";
import Modal from "@/components/feedback/Modal.vue";
import { Icon } from "@/composables/Icon";
import "@/pages/Table/ag-like-skin.css";

type RaciType = "Responsible" | "Accountable" | "Consulted" | "Informed";
type DocumentKind = "input" | "output";
type RequirementType = "mandatory" | "optional";

type TodoItem = { id: number; order: number; text: string };
type RaciEntry = { type: RaciType; roles: string[] };
type DocumentItem = { id: number; kind: DocumentKind; name: string; requirement: RequirementType };

type ProcessNode = {
  id: number;
  name: string;
  parentId: number | null;
  order: number;
  description: string;
  locked?: boolean;
  todoItems: TodoItem[];
  raci: RaciEntry[];
  documents: DocumentItem[];
};

type ProcessTree = ProcessNode & { children: ProcessTree[] };
type FlatNode = { node: ProcessTree; depth: number; numberLabel: string };
type EditMode = "create" | "edit";

const RACI_TYPES: RaciType[] = ["Responsible", "Accountable", "Consulted", "Informed"];

const masterRoles = ["PM", "BA", "Delivery Head", "Tender Admin", "QA", "Transformation", "CEO", "Developer", "Finance", "Sales"].map((x) => ({
  value: x,
  label: x,
}));
const masterProjectDocuments = ["KAK", "Analisis Lingkup", "Proposal", "File Presentasi Tender", "RAB", "SPK", "Risalah Kickoff"].map((x) => ({
  value: x,
  label: x,
}));
const requirementOptions = [
  { value: "mandatory", label: "Mandatory" },
  { value: "optional", label: "Optional" },
];

const emptyRaci = (): RaciEntry[] => RACI_TYPES.map((type) => ({ type, roles: [] }));

const seedFlat: ProcessNode[] = [
  { id: 100, name: "Pre Project", parentId: null, order: 1, locked: true, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 101, name: "Pemahaman Ruang Lingkup Awal", parentId: 100, order: 1, description: "", todoItems: [{ id: 1, order: 1, text: "Review KAK awal" }], raci: emptyRaci(), documents: [] },
  { id: 102, name: "Aanwijzing", parentId: 100, order: 2, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 103, name: "Feasibility Study", parentId: 100, order: 3, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 200, name: "Initiation", parentId: null, order: 2, locked: true, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 201, name: "Project Handover", parentId: 200, order: 1, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 202, name: "Pemahaman Ruang Lingkup Pekerjaan", parentId: 200, order: 2, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 203, name: "Kickoff Internal", parentId: 200, order: 3, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 204, name: "Kickoff External", parentId: 200, order: 4, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 205, name: "Finalisasi Tim Pelaksana", parentId: 200, order: 5, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 206, name: "Budget Update", parentId: 200, order: 6, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 300, name: "Execution", parentId: null, order: 3, locked: true, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 301, name: "SPRINT Iteration", parentId: 300, order: 1, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 3011, name: "Desain Fungsional - Detail", parentId: 301, order: 1, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 3012, name: "CLIENT SIGN-OFF: Desain Fungsional", parentId: 301, order: 2, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 3013, name: "Desain Teknis", parentId: 301, order: 3, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 302, name: "Data Migration", parentId: 300, order: 2, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
  { id: 3021, name: "Data Migration Strategy", parentId: 302, order: 1, description: "", todoItems: [], raci: emptyRaci(), documents: [] },
];

const rows = ref<ProcessNode[]>(JSON.parse(JSON.stringify(seedFlat)));
let nextId = 10000;
let nextTodoId = 100;
let nextDocId = 100;

const expandedIds = reactive(new Set<number>([100, 200, 300, 301, 302]));
const editorOpen = ref(false);
const editMode = ref<EditMode>("create");
const treeSearch = ref("");
const mockupDownloadUrl = computed(() => `${import.meta.env.BASE_URL}downloads/methodology-processes-consumer.vue`);

const todoDraft = ref<{ order: number; text: string }>({ order: 1, text: "" });
const editingTodoId = ref<number | null>(null);
const docDraft = ref<{ kind: DocumentKind; name: string | null; requirement: RequirementType }>({
  kind: "input",
  name: null,
  requirement: "mandatory",
});

const formData = ref<{
  id: number | null;
  deliveryPhaseId: number;
  parentId: number | null;
  order: number;
  name: string;
  description: string;
  todoItems: TodoItem[];
  raci: RaciEntry[];
  documents: DocumentItem[];
}>({
  id: null,
  deliveryPhaseId: 100,
  parentId: null,
  order: 1,
  name: "",
  description: "",
  todoItems: [],
  raci: emptyRaci(),
  documents: [],
});

const modalTitle = computed(() => (editMode.value === "edit" ? "Edit Methodology Process" : "Add Methodology Process"));

const treeItems = computed<ProcessTree[]>(() => {
  const map = new Map<number, ProcessTree>();
  const roots: ProcessTree[] = [];
  rows.value.forEach((row) => map.set(row.id, { ...row, children: [] }));
  rows.value.forEach((row) => {
    const node = map.get(row.id);
    if (!node) return;
    if (row.parentId === null) roots.push(node);
    else map.get(row.parentId)?.children.push(node);
  });
  const sortNodes = (nodes: ProcessTree[]) => {
    nodes.sort((a, b) => a.order - b.order);
    nodes.forEach((x) => sortNodes(x.children));
  };
  sortNodes(roots);
  return roots;
});

const rootPhaseOptions = computed(() => treeItems.value.filter((x) => x.parentId === null).map((x) => ({ value: x.id, label: `${x.order}. ${x.name}` })));
const parentSelectOptions = computed(() => {
  const out: { value: number; label: string }[] = [];
  const walk = (nodes: ProcessTree[], depth = 0) => {
    nodes.forEach((node) => {
      out.push({ value: node.id, label: `${"- ".repeat(depth)}${node.name}` });
      walk(node.children, depth + 1);
    });
  };
  walk(treeItems.value);
  return out.filter((x) => x.value !== formData.value.id);
});

const flatVisibleNodes = computed<FlatNode[]>(() => {
  const out: FlatNode[] = [];
  const walk = (nodes: ProcessTree[], depth: number, path: number[]) => {
    nodes.forEach((node, idx) => {
      const p = [...path, idx + 1];
      out.push({ node, depth, numberLabel: p.join(".") });
      if (node.children.length && expandedIds.has(node.id)) walk(node.children, depth + 1, p);
    });
  };
  walk(treeItems.value, 0, []);
  return out;
});

const flatAllNodes = computed<FlatNode[]>(() => {
  const out: FlatNode[] = [];
  const walk = (nodes: ProcessTree[], depth: number, path: number[]) => {
    nodes.forEach((node, idx) => {
      const p = [...path, idx + 1];
      out.push({ node, depth, numberLabel: p.join(".") });
      if (node.children.length) walk(node.children, depth + 1, p);
    });
  };
  walk(treeItems.value, 0, []);
  return out;
});

const filteredFlatNodes = computed<FlatNode[]>(() => {
  const keyword = treeSearch.value.trim().toLowerCase();
  if (!keyword) return flatVisibleNodes.value;

  const byId = new Map<number, ProcessNode>(rows.value.map((x) => [x.id, x]));
  const matchedIds = new Set<number>();

  flatAllNodes.value.forEach((x) => {
    const text = `${x.numberLabel} ${x.node.name}`.toLowerCase();
    if (text.includes(keyword)) matchedIds.add(x.node.id);
  });

  const includeIds = new Set<number>(matchedIds);
  matchedIds.forEach((id) => {
    let cursor = byId.get(id);
    while (cursor?.parentId !== null) {
      includeIds.add(cursor.parentId);
      cursor = byId.get(cursor.parentId);
    }
  });

  return flatAllNodes.value.filter((x) => includeIds.has(x.node.id));
});

const docInputRows = computed(() => formData.value.documents.filter((x) => x.kind === "input"));
const docOutputRows = computed(() => formData.value.documents.filter((x) => x.kind === "output"));

const deepClone = <T>(v: T): T => JSON.parse(JSON.stringify(v));
const findNode = (id: number | null) => (id === null ? null : rows.value.find((x) => x.id === id) ?? null);
const siblingCount = (parentId: number | null) => rows.value.filter((x) => x.parentId === parentId).length;

function getRootPhaseId(nodeId: number | null): number {
  let current = findNode(nodeId);
  while (current?.parentId !== null) current = findNode(current.parentId);
  return current?.id ?? 100;
}

function toggleExpand(id: number) {
  if (expandedIds.has(id)) expandedIds.delete(id);
  else expandedIds.add(id);
}
function onRowClick(node: ProcessTree) {
  if (node.children.length) toggleExpand(node.id);
}
function expandAll() {
  expandedIds.clear();
  rows.value.forEach((x) => {
    if (rows.value.some((c) => c.parentId === x.id)) expandedIds.add(x.id);
  });
}
function collapseAll() {
  expandedIds.clear();
}

function resetForm(parentId: number | null = null, deliveryPhaseId = 100) {
  formData.value = {
    id: null,
    deliveryPhaseId,
    parentId,
    order: siblingCount(parentId ?? deliveryPhaseId) + 1,
    name: "",
    description: "",
    todoItems: [],
    raci: emptyRaci(),
    documents: [],
  };
  editingTodoId.value = null;
  todoDraft.value = { order: 1, text: "" };
  docDraft.value = { kind: "input", name: null, requirement: "mandatory" };
}

function openCreate() {
  editMode.value = "create";
  resetForm();
  editorOpen.value = true;
}
function openCreateChild(parentId: number) {
  editMode.value = "create";
  resetForm(parentId, getRootPhaseId(parentId));
  expandedIds.add(parentId);
  editorOpen.value = true;
}
function openEdit(node: ProcessTree) {
  if (node.locked) return;
  editMode.value = "edit";
  formData.value = {
    id: node.id,
    deliveryPhaseId: getRootPhaseId(node.id),
    parentId: node.parentId,
    order: node.order,
    name: node.name,
    description: node.description,
    todoItems: deepClone(node.todoItems),
    raci: deepClone(node.raci),
    documents: deepClone(node.documents),
  };
  editorOpen.value = true;
}
function saveMainForm() {
  if (!formData.value.name.trim()) return;
  const parentId = formData.value.parentId ?? formData.value.deliveryPhaseId;
  const payload = {
    parentId,
    order: Math.max(1, Number(formData.value.order) || 1),
    name: formData.value.name.trim(),
    description: formData.value.description.trim(),
    todoItems: deepClone(formData.value.todoItems),
    raci: deepClone(formData.value.raci),
    documents: deepClone(formData.value.documents),
  };
  if (editMode.value === "edit" && formData.value.id !== null) {
    const idx = rows.value.findIndex((x) => x.id === formData.value.id);
    if (idx >= 0) rows.value[idx] = { ...rows.value[idx], ...payload };
  } else {
    rows.value.push({ id: nextId++, locked: false, ...payload });
  }
  expandedIds.add(parentId);
  editorOpen.value = false;
}
function deleteItem(id: number) {
  const target = findNode(id);
  if (!target || target.locked) return;
  const ids = new Set<number>([id]);
  let changed = true;
  while (changed) {
    changed = false;
    rows.value.forEach((x) => {
      if (x.parentId !== null && ids.has(x.parentId) && !ids.has(x.id)) {
        ids.add(x.id);
        changed = true;
      }
    });
  }
  rows.value = rows.value.filter((x) => !ids.has(x.id));
  ids.forEach((x) => expandedIds.delete(x));
}

function addTodoDraft() {
  if (!todoDraft.value.text.trim()) return;
  if (editingTodoId.value !== null) {
    const idx = formData.value.todoItems.findIndex((x) => x.id === editingTodoId.value);
    if (idx >= 0) {
      formData.value.todoItems[idx] = {
        ...formData.value.todoItems[idx],
        order: Math.max(1, Number(todoDraft.value.order) || 1),
        text: todoDraft.value.text.trim(),
      };
    }
  } else {
    formData.value.todoItems.push({ id: nextTodoId++, order: Math.max(1, Number(todoDraft.value.order) || 1), text: todoDraft.value.text.trim() });
  }
  formData.value.todoItems.sort((a, b) => a.order - b.order);
  editingTodoId.value = null;
  todoDraft.value = { order: formData.value.todoItems.length + 1, text: "" };
}
function deleteTodo(id: number) {
  formData.value.todoItems = formData.value.todoItems.filter((x) => x.id !== id);
  if (editingTodoId.value === id) {
    editingTodoId.value = null;
    todoDraft.value = { order: formData.value.todoItems.length + 1, text: "" };
  }
}

function editTodo(id: number) {
  const target = formData.value.todoItems.find((x) => x.id === id);
  if (!target) return;
  editingTodoId.value = id;
  todoDraft.value = { order: target.order, text: target.text };
}

function cancelTodoEdit() {
  editingTodoId.value = null;
  todoDraft.value = { order: formData.value.todoItems.length + 1, text: "" };
}

function setRaciRoles(type: RaciType, roles: Array<string | number>) {
  const mapped = roles.map(String);
  formData.value.raci = formData.value.raci.map((entry) =>
    entry.type === type ? { ...entry, roles: mapped } : entry
  );
}
function getRaciRoles(type: RaciType): string[] {
  return formData.value.raci.find((x) => x.type === type)?.roles ?? [];
}

function addDocDraft() {
  if (!docDraft.value.name) return;
  formData.value.documents.push({
    id: nextDocId++,
    kind: docDraft.value.kind,
    name: docDraft.value.name,
    requirement: docDraft.value.requirement,
  });
  docDraft.value = { kind: docDraft.value.kind, name: null, requirement: "mandatory" };
}
function deleteDoc(id: number) {
  formData.value.documents = formData.value.documents.filter((x) => x.id !== id);
}

function requirementLabel(type: RequirementType): string {
  return type === "mandatory" ? "Mandatory" : "Optional";
}

function requirementBadgeClass(type: RequirementType): string {
  return type === "mandatory" ? "badge badge-error badge-xs" : "badge badge-info badge-xs";
}
</script>

<template>
  <div class="space-y-4 min-w-0">
    <PageHeader category="Mockup Pages" title="Methodology Processes" description="Tree expand/collapse + modal add/edit yang mengikuti blueprint proses atasan." />
    <section class="card p-4 details-card">
      <div class="details-head">
        <h3>Developer Details</h3>
        <a class="btn btn-accent btn-sm" :href="mockupDownloadUrl" download="MethodologyProcesses.consumer.vue">
          <Icon name="hard-drive-download" class="w-4 h-4" />
          Download Mockup (Consumer)
        </a>
      </div>
      <p class="details-note">
        Contoh implementasi versi consumer (`mitreka-consumer-test-ds/MockupTender/MethodologyProcesses.vue`) disediakan untuk referensi integrasi komponen dari package UI.
      </p>
    </section>

    <section class="card p-0 layout-shell">
      <div class="layout-tree">
        <div class="panel-head">
          <h2 class="panel-title">Methodology Processes</h2>
          <div class="panel-tools">
            <Input v-model="treeSearch" size="sm" placeholder="Search process..." class="panel-search" />
            <div class="panel-buttons">
              <button class="btn btn-primary btn-xs" type="button" @click="openCreate"><Icon name="plus" class="w-3.5 h-3.5" />Add Process</button>
              <button class="btn btn-outline btn-xs" type="button" @click="expandAll">Expand All</button>
              <button class="btn btn-outline btn-xs" type="button" @click="collapseAll">Collapse All</button>
            </div>
          </div>
        </div>

        <div class="tree-scroll">
          <div v-if="!filteredFlatNodes.length" class="py-8 text-center text-base-content/60 text-sm">No process found.</div>
          <div v-for="row in filteredFlatNodes" :key="row.node.id" class="tree-row-wrap">
            <div
              class="tree-row"
              :class="{ 'tree-row--with-guides': row.depth > 0 }"
              :style="{ paddingLeft: `${12 + row.depth * 24}px`, '--guide-width': `${row.depth * 24}px` }"
              @click="onRowClick(row.node)"
            >
              <button v-if="row.node.children.length" class="tree-toggle" type="button" @click.stop="toggleExpand(row.node.id)">
                <Icon name="chevron-right" class="w-4 h-4 text-base-content/50 transition-transform duration-150" :class="{ 'rotate-90': expandedIds.has(row.node.id) }" />
              </button>
              <span v-else class="tree-toggle-space"></span>
              <span class="tree-code">{{ row.numberLabel }}.</span>
              <span class="tree-name" :class="row.depth === 0 ? 'font-semibold' : ''">{{ row.node.name }}</span>
              <span v-if="row.node.locked" class="badge badge-xs badge-soft-info">Phase</span>
              <span class="flex-1"></span>
              <div class="tree-actions" @click.stop>
                <button class="icon-btn icon-btn-soft-success icon-btn-xs" type="button" title="Tambah child" @click="openCreateChild(row.node.id)"><Icon name="plus" class="w-3.5 h-3.5" /></button>
                <button v-if="!row.node.locked" class="icon-btn icon-btn-soft-warning icon-btn-xs" type="button" title="Edit" @click="openEdit(row.node)"><Icon name="pencil" class="w-3.5 h-3.5" /></button>
                <button v-if="!row.node.locked" class="icon-btn icon-btn-soft-error icon-btn-xs" type="button" title="Hapus" @click="deleteItem(row.node.id)"><Icon name="trash" class="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Modal :open="editorOpen" :title="modalTitle" size="xl" @close="editorOpen = false" @confirm="saveMainForm">
      <div class="space-y-5">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div class="form-field">
            <label class="form-label">Delivery Phase</label>
            <SelectInput v-model="formData.deliveryPhaseId" :options="rootPhaseOptions" size="sm" />
          </div>
          <div class="form-field">
            <label class="form-label">Parent</label>
            <SelectInput v-model="formData.parentId" :options="parentSelectOptions" placeholder="[root]" size="sm" clearable />
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-[120px_1fr] gap-3">
          <div class="form-field">
            <label class="form-label">Urutan</label>
            <Input v-model="formData.order" type="number" size="sm" />
            <p class="form-note">Cukup angka (tanpa titik).</p>
          </div>
          <div class="form-field">
            <label class="form-label">Nama</label>
            <Input v-model="formData.name" size="sm" />
          </div>
        </div>

        <div class="form-field">
          <label class="form-label">Description</label>
          <textarea v-model="formData.description" rows="3" class="input w-full min-h-24 py-2 resize-y" placeholder="Detail process" />
        </div>

        <section class="section-card">
          <div class="section-head">
            <h3>To do List</h3>
          </div>
          <div class="grid grid-cols-[110px_1fr_auto] gap-2 mb-2">
            <Input v-model="todoDraft.order" type="number" size="sm" placeholder="Urutan" />
            <Input v-model="todoDraft.text" size="sm" placeholder="Things to do" />
            <div class="flex items-center gap-2">
              <button class="btn btn-success btn-sm" type="button" @click="addTodoDraft">{{ editingTodoId !== null ? "Update" : "Tambah" }}</button>
              <button v-if="editingTodoId !== null" class="btn btn-outline btn-sm" type="button" @click="cancelTodoEdit">Batal</button>
            </div>
          </div>
          <div class="als-card als-compact-header" data-als data-density="compact">
            <div class="als-viewport" style="max-height: 170px;">
              <table>
                <thead>
                  <tr>
                    <th data-col="index">Urutan</th>
                    <th>Things to do</th>
                    <th data-col="actions">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-if="!formData.todoItems.length">
                    <td colspan="3" class="text-center py-3 text-base-content/60">Belum ada item.</td>
                  </tr>
                  <tr v-for="item in formData.todoItems" :key="item.id">
                    <td data-col="index">{{ item.order }}</td>
                    <td>{{ item.text }}</td>
                    <td data-col="actions">
                      <div class="flex items-center justify-end gap-1">
                        <button class="icon-btn icon-btn-soft-warning icon-btn-xs" type="button" title="Edit" @click="editTodo(item.id)">
                          <Icon name="pencil" class="w-3.5 h-3.5" />
                        </button>
                        <button class="icon-btn icon-btn-soft-error icon-btn-xs" type="button" title="Delete" @click="deleteTodo(item.id)">
                          <Icon name="trash" class="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section class="section-card">
          <div class="section-head"><h3>RACI Matrix</h3><span class="form-note">Kolom RACI fixed.</span></div>
          <div class="space-y-2">
            <div v-for="type in RACI_TYPES" :key="type" class="raci-row">
              <div class="raci-label">{{ type }}</div>
              <div class="raci-control"><MultiSelect :model-value="getRaciRoles(type)" :options="masterRoles" size="sm" display-mode="inline-compact" @update:model-value="setRaciRoles(type, $event)" /></div>
            </div>
          </div>
        </section>

        <section class="section-card">
          <div class="section-head"><h3>Project Documents</h3><span class="form-note">Master document + mandatory/optional.</span></div>
          <div class="grid grid-cols-1 sm:grid-cols-[170px_1fr_220px_auto] gap-2 mb-2">
            <SelectInput v-model="docDraft.kind" :options="[{ value: 'input', label: 'Input' }, { value: 'output', label: 'Output' }]" size="sm" />
            <SelectInput v-model="docDraft.name" :options="masterProjectDocuments" size="sm" placeholder="Document" />
            <SelectInput v-model="docDraft.requirement" :options="requirementOptions" size="sm" />
            <button class="btn btn-success btn-sm" type="button" @click="addDocDraft">Tambah</button>
          </div>
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
            <div class="table-shell">
              <div class="subhead"><span>Input</span></div>
              <div class="als-card als-compact-header" data-als data-density="compact">
                <div class="als-viewport" style="max-height: 170px;">
                  <table>
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th data-col="index">Type</th>
                        <th data-col="actions">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!docInputRows.length">
                        <td colspan="3" class="text-center py-3 text-base-content/60">Belum ada input.</td>
                      </tr>
                      <tr v-for="doc in docInputRows" :key="doc.id">
                        <td>{{ doc.name }}</td>
                        <td data-col="index">
                          <span :class="requirementBadgeClass(doc.requirement)">{{ requirementLabel(doc.requirement) }}</span>
                        </td>
                        <td data-col="actions">
                          <button class="icon-btn icon-btn-soft-error icon-btn-xs" type="button" title="Delete" @click="deleteDoc(doc.id)">
                            <Icon name="trash" class="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="table-shell">
              <div class="subhead"><span>Output</span></div>
              <div class="als-card als-compact-header" data-als data-density="compact">
                <div class="als-viewport" style="max-height: 170px;">
                  <table>
                    <thead>
                      <tr>
                        <th>Document</th>
                        <th data-col="index">Type</th>
                        <th data-col="actions">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-if="!docOutputRows.length">
                        <td colspan="3" class="text-center py-3 text-base-content/60">Belum ada output.</td>
                      </tr>
                      <tr v-for="doc in docOutputRows" :key="doc.id">
                        <td>{{ doc.name }}</td>
                        <td data-col="index">
                          <span :class="requirementBadgeClass(doc.requirement)">{{ requirementLabel(doc.requirement) }}</span>
                        </td>
                        <td data-col="actions">
                          <button class="icon-btn icon-btn-soft-error icon-btn-xs" type="button" title="Delete" @click="deleteDoc(doc.id)">
                            <Icon name="trash" class="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <template #footer>
        <button class="btn btn-ghost" type="button" @click="editorOpen = false">Cancel</button>
        <button class="btn btn-primary" type="button" @click="saveMainForm">{{ editMode === "edit" ? "Update" : "Create" }}</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.layout-shell { display: grid; grid-template-columns: 1fr; overflow: hidden; }
.layout-tree { overflow: hidden; max-height: calc(100dvh - 220px); display: flex; flex-direction: column; }
.details-card h3 { margin: 0; font-size: 0.9rem; font-weight: 700; }
.details-head { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; margin-bottom: 0.45rem; }
.details-note { margin: 0; font-size: 0.8rem; color: color-mix(in oklch, var(--color-base-content), transparent 30%); }
.panel-title { font-size: 0.875rem; font-weight: 600; color: var(--color-base-content); margin: 0; }
.panel-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin: 0; padding: 1rem; border-bottom: 1px solid var(--color-base-300); position: sticky; top: 0; z-index: 2; background: var(--color-base-100); }
.panel-tools { display: inline-flex; align-items: center; gap: 0.5rem; flex-wrap: nowrap; justify-content: flex-end; }
.panel-search { width: 21rem; min-width: 16rem; }
.panel-buttons { display: inline-flex; align-items: center; gap: 0.25rem; flex-wrap: nowrap; }
.tree-scroll { padding: 0.75rem 1rem 1rem; overflow-y: auto; flex: 1; min-height: 0; }
.tree-row { position: relative; display: flex; align-items: center; gap: 0.5rem; padding: 0.15rem 0.75rem; border-radius: 0.5rem; cursor: pointer; transition: background 0.12s ease; user-select: none; }
.tree-row > * { position: relative; z-index: 1; }
.tree-row--with-guides::before { content: ""; position: absolute; left: 12px; top: 6px; bottom: 6px; width: var(--guide-width); background-image: repeating-linear-gradient(to right, transparent 0, transparent 23px, color-mix(in oklch, var(--color-base-content), transparent 84%) 23px, color-mix(in oklch, var(--color-base-content), transparent 84%) 24px); pointer-events: none; }
.tree-row:hover { background: var(--color-base-200); }
.tree-toggle { display: inline-flex; align-items: center; justify-content: center; width: 20px; height: 20px; border-radius: 4px; }
.tree-toggle:hover { background: var(--color-base-300); }
.tree-toggle-space { width: 20px; flex-shrink: 0; }
.tree-code { font-size: 0.78rem; font-weight: 700; opacity: 0.7; min-width: 44px; flex-shrink: 0; }
.tree-name { font-size: 0.875rem; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tree-actions { display: flex; gap: 0.25rem; opacity: 0; transition: opacity 0.15s; }
.tree-row:hover .tree-actions { opacity: 1; }
.form-label { display: block; font-size: 0.8rem; font-weight: 600; margin-bottom: 0.25rem; }
.form-note { margin-top: 0.25rem; font-size: 0.72rem; color: color-mix(in oklch, var(--color-base-content), transparent 38%); }
.section-card { border: 1px solid var(--color-base-300); border-radius: 0.75rem; padding: 0.75rem; background: var(--color-base-100); }
.section-head { display: flex; align-items: center; justify-content: space-between; gap: 0.5rem; margin-bottom: 0.5rem; }
.section-head h3 { margin: 0; font-size: 0.86rem; font-weight: 700; }
.subhead { display: flex; align-items: center; justify-content: space-between; padding: 0.4rem 0.4rem 0.1rem; font-size: 0.78rem; font-weight: 700; }
.table-shell { border: 1px solid var(--color-base-300); border-radius: 0.6rem; overflow: hidden; background: var(--color-base-100); }
.raci-row { display: grid; grid-template-columns: 130px 1fr; align-items: center; gap: 0.5rem; }
.raci-label { font-size: 0.8rem; font-weight: 600; }

.als-compact-header :deep(thead th) {
  padding-top: 0.4rem !important;
  padding-bottom: 0.4rem !important;
}

.als-compact-header :deep(tbody td) {
  padding-top: 0.2rem !important;
  padding-bottom: 0.2rem !important;
}
</style>
