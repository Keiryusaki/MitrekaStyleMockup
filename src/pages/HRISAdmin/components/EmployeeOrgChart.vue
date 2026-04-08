<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import { Button, Icon, Input } from "@/lib/mitreka-ui-dist/vue";

import EmployeeOrgChartBranch from "./EmployeeOrgChart/EmployeeOrgChartBranch.vue";
import EmployeeOrgChartDialogs from "./EmployeeOrgChart/EmployeeOrgChartDialogs.vue";
import EmployeeOrgChartDrawer from "./EmployeeOrgChart/EmployeeOrgChartDrawer.vue";
import type { EmployeeOrgChartRow, OrgChartNode, OrgStructureNode } from "./EmployeeOrgChart/types";

const props = defineProps<{
  allRows: EmployeeOrgChartRow[];
  visibleRows: EmployeeOrgChartRow[];
  departmentCount: number;
}>();

const emit = defineEmits<{
  "open-detail": [row: EmployeeOrgChartRow];
}>();

const orgChartSearch = ref("");
const orgChartZoom = ref(0.85);
const highlightApprovalPath = ref(true);
const selectedOrgChartNodeId = ref<number | null>(null);
const detailDrawerOpen = ref(true);
const viewportRef = ref<HTMLElement | null>(null);
const isDraggingViewport = ref(false);
const addTopLevelModalOpen = ref(false);
const selectedTopLevelEmployeeId = ref("");
const addTopLevelReason = ref("");
const addSubordinateModalOpen = ref(false);
const selectedSubordinateEmployeeId = ref("");
const addSubordinateReason = ref("");
const changeManagerModalOpen = ref(false);
const selectedManagerNodeId = ref("");
const changeManagerReason = ref("");
const orgNodes = ref<OrgStructureNode[]>([]);

let dragStartX = 0;
let dragStartY = 0;
let dragScrollLeft = 0;
let dragScrollTop = 0;

const matchesOrgChartSearch = (row: EmployeeOrgChartRow, query: string) => {
  const needle = query.trim().toLowerCase();
  if (!needle) return true;
  return [row.name, row.employeeCode, row.title, row.department, row.manager, row.location]
    .join(" ")
    .toLowerCase()
    .includes(needle);
};

const filterOrgChartNodes = (nodes: OrgChartNode[], query: string): OrgChartNode[] =>
  nodes
    .map((node) => {
      const children = filterOrgChartNodes(node.children, query);
      if (!query.trim() || matchesOrgChartSearch(node.row, query) || children.length) {
        return { ...node, children };
      }
      return null;
    })
    .filter((node): node is OrgChartNode => !!node);

const flattenOrgChartNodes = (nodes: OrgChartNode[]): OrgChartNode[] =>
  nodes.flatMap((node) => [node, ...flattenOrgChartNodes(node.children)]);

const findFirstOrgChartNodeId = (nodes: OrgChartNode[]): number | null => flattenOrgChartNodes(nodes)[0]?.id ?? null;

const allRowsMap = computed(() => new Map(props.allRows.map((row) => [row.id, row])));
const visibleRowsMap = computed(() => new Map(props.visibleRows.map((row) => [row.id, row])));

const currentRootEmployeeIds = computed(() =>
  new Set(
    orgNodes.value
      .filter((node) => node.parentNodeId === null)
      .map((node) => node.employeeId),
  ),
);

const addTopLevelOptions = computed(() =>
  props.allRows
    .filter((row) => !currentRootEmployeeIds.value.has(row.id))
    .map((row) => ({
      value: String(row.id),
      label: `${row.name} · ${row.title}`,
    })),
);

const seedStructureNodes = (rows: EmployeeOrgChartRow[]) => {
  const nameToId = new Map(rows.map((row) => [row.name, row.id]));
  return rows.map((row, index) => {
    const parentEmployeeId = nameToId.get(row.manager) ?? null;
    return {
      id: `employee-${row.id}`,
      employeeId: row.id,
      parentNodeId: parentEmployeeId ? `employee-${parentEmployeeId}` : null,
      sortOrder: index + 1,
    };
  });
};

const orgChartGraph = computed(() => {
  const nodesById = new Map<number, OrgChartNode>();
  const structureNodeById = new Map<string, OrgStructureNode>();
  const visibleStructureNodes = orgNodes.value.filter((node) => visibleRowsMap.value.has(node.employeeId));
  const roots: OrgChartNode[] = [];

  visibleStructureNodes.forEach((structureNode) => {
    const row = visibleRowsMap.value.get(structureNode.employeeId);
    if (!row) return;
    structureNodeById.set(structureNode.id, structureNode);
    nodesById.set(structureNode.employeeId, {
      id: row.id,
      parentId: null,
      row,
      children: [],
    });
  });

  visibleStructureNodes.forEach((structureNode) => {
    const graphNode = nodesById.get(structureNode.employeeId);
    if (!graphNode) return;
    if (structureNode.parentNodeId && structureNodeById.has(structureNode.parentNodeId)) {
      const parentStructureNode = structureNodeById.get(structureNode.parentNodeId);
      const parentGraphNode = parentStructureNode ? nodesById.get(parentStructureNode.employeeId) : null;
      if (parentGraphNode && parentGraphNode.id !== graphNode.id) {
        graphNode.parentId = parentGraphNode.id;
        parentGraphNode.children.push(graphNode);
        return;
      }
    }
    roots.push(graphNode);
  });

  const structureNodeSortMap = new Map(visibleStructureNodes.map((node) => [node.employeeId, node.sortOrder]));
  const sortNodes = (nodes: OrgChartNode[]) => {
    nodes.sort((a, b) => (structureNodeSortMap.get(a.id) ?? 0) - (structureNodeSortMap.get(b.id) ?? 0));
    nodes.forEach((node) => sortNodes(node.children));
  };

  sortNodes(roots);
  return { roots, nodesById };
});

const orgChartVisibleRoots = computed(() => filterOrgChartNodes(orgChartGraph.value.roots, orgChartSearch.value));
const orgChartFlatVisibleNodes = computed(() => flattenOrgChartNodes(orgChartVisibleRoots.value));
const orgChartSelectedNode = computed(() =>
  selectedOrgChartNodeId.value ? orgChartGraph.value.nodesById.get(selectedOrgChartNodeId.value) ?? null : null,
);
const orgChartSelectedRow = computed(() => orgChartSelectedNode.value?.row ?? orgChartFlatVisibleNodes.value[0]?.row ?? null);

const selectedStructureNode = computed(() =>
  orgChartSelectedRow.value ? orgNodes.value.find((node) => node.employeeId === orgChartSelectedRow.value?.id) ?? null : null,
);

const orgChartSelectedChain = computed(() => {
  const chain: EmployeeOrgChartRow[] = [];
  let current = orgChartSelectedNode.value;
  while (current) {
    chain.unshift(current.row);
    current = current.parentId ? orgChartGraph.value.nodesById.get(current.parentId) ?? null : null;
  }
  return chain;
});

const orgChartSelectedDirectReports = computed(() => orgChartSelectedNode.value?.children.map((node) => node.row) ?? []);

const orgChartHighlightedIds = computed(() => {
  if (!highlightApprovalPath.value) return [];
  const ids: number[] = [];
  let current = orgChartSelectedNode.value;
  while (current) {
    ids.push(current.id);
    current = current.parentId ? orgChartGraph.value.nodesById.get(current.parentId) ?? null : null;
  }
  return ids;
});

const selectedDescendantIds = computed(() => {
  const collect = (node: OrgChartNode | null): number[] => {
    if (!node) return [];
    return node.children.flatMap((child) => [child.id, ...collect(child)]);
  };
  return new Set(collect(orgChartSelectedNode.value));
});

const subordinateOptions = computed(() => {
  const selectedEmployeeId = orgChartSelectedRow.value?.id ?? null;
  return props.allRows
    .filter((row) => row.id !== selectedEmployeeId && !selectedDescendantIds.value.has(row.id))
    .map((row) => ({
      value: String(row.id),
      label: `${row.name} · ${row.title}`,
    }));
});

const managerOptions = computed(() => {
  const currentNodeId = selectedStructureNode.value?.id;
  return orgNodes.value
    .filter((node) => node.id !== currentNodeId && !selectedDescendantIds.value.has(node.employeeId))
    .map((node) => {
      const employee = allRowsMap.value.get(node.employeeId);
      return employee
        ? {
            value: node.id,
            label: `${employee.name} · ${employee.title}`,
          }
        : null;
    })
    .filter((item): item is { value: string; label: string } => !!item);
});

const addTopLevelDisabled = computed(() => !selectedTopLevelEmployeeId.value);
const addSubordinateDisabled = computed(() => !selectedSubordinateEmployeeId.value || !selectedStructureNode.value);
const changeManagerDisabled = computed(() => !selectedManagerNodeId.value || !selectedStructureNode.value);

const selectOrgChartNode = (id: number) => {
  selectedOrgChartNodeId.value = id;
  detailDrawerOpen.value = true;
};

const openAddTopLevelModal = () => {
  selectedTopLevelEmployeeId.value = "";
  addTopLevelReason.value = "";
  addTopLevelModalOpen.value = true;
};

const closeAddTopLevelModal = () => {
  addTopLevelModalOpen.value = false;
};

const saveTopLevelNode = () => {
  const employeeId = Number(selectedTopLevelEmployeeId.value);
  if (!employeeId) return;
  orgNodes.value = orgNodes.value.map((node) =>
    node.employeeId === employeeId
      ? { ...node, parentNodeId: null }
      : node,
  );
  selectedOrgChartNodeId.value = employeeId;
  detailDrawerOpen.value = true;
  addTopLevelModalOpen.value = false;
};

const openAddSubordinateModal = () => {
  selectedSubordinateEmployeeId.value = "";
  addSubordinateReason.value = "";
  addSubordinateModalOpen.value = true;
};

const closeAddSubordinateModal = () => {
  addSubordinateModalOpen.value = false;
};

const saveSubordinateNode = () => {
  const employeeId = Number(selectedSubordinateEmployeeId.value);
  const parentNodeId = selectedStructureNode.value?.id;
  if (!employeeId || !parentNodeId) return;

  const maxSort = Math.max(0, ...orgNodes.value.map((node) => node.sortOrder));
  const existingNode = orgNodes.value.find((node) => node.employeeId === employeeId);
  orgNodes.value = existingNode
    ? orgNodes.value.map((node) =>
        node.employeeId === employeeId
          ? { ...node, parentNodeId, sortOrder: node.sortOrder ?? maxSort + 1 }
          : node,
      )
    : [
        ...orgNodes.value,
        {
          id: `employee-${employeeId}`,
          employeeId,
          parentNodeId,
          sortOrder: maxSort + 1,
        },
      ];
  selectedOrgChartNodeId.value = employeeId;
  detailDrawerOpen.value = true;
  addSubordinateModalOpen.value = false;
};

const openChangeManagerModal = () => {
  selectedManagerNodeId.value = "";
  changeManagerReason.value = "";
  changeManagerModalOpen.value = true;
};

const closeChangeManagerModal = () => {
  changeManagerModalOpen.value = false;
};

const saveChangeManager = () => {
  const currentNode = selectedStructureNode.value;
  if (!currentNode || !selectedManagerNodeId.value) return;
  orgNodes.value = orgNodes.value.map((node) =>
    node.id === currentNode.id
      ? { ...node, parentNodeId: selectedManagerNodeId.value }
      : node,
  );
  changeManagerModalOpen.value = false;
};

const zoomInOrgChart = () => {
  orgChartZoom.value = Math.min(1.25, Number((orgChartZoom.value + 0.05).toFixed(2)));
};

const zoomOutOrgChart = () => {
  orgChartZoom.value = Math.max(0.65, Number((orgChartZoom.value - 0.05).toFixed(2)));
};

const resetOrgChartView = () => {
  orgChartZoom.value = 0.85;
  orgChartSearch.value = "";
  highlightApprovalPath.value = true;
};

const closeDetailDrawer = () => {
  detailDrawerOpen.value = false;
};

const openDetailDrawer = () => {
  detailDrawerOpen.value = true;
};

const openOrgChartDetail = () => {
  if (!orgChartSelectedRow.value) return;
  emit("open-detail", orgChartSelectedRow.value);
};

const onViewportPointerDown = (event: PointerEvent) => {
  const target = event.target as HTMLElement | null;
  if (!viewportRef.value || !target) return;
  if (target.closest("button, a, input, textarea, select, label")) return;

  isDraggingViewport.value = true;
  dragStartX = event.clientX;
  dragStartY = event.clientY;
  dragScrollLeft = viewportRef.value.scrollLeft;
  dragScrollTop = viewportRef.value.scrollTop;
  viewportRef.value.setPointerCapture?.(event.pointerId);
};

const onViewportPointerMove = (event: PointerEvent) => {
  if (!isDraggingViewport.value || !viewportRef.value) return;
  const deltaX = event.clientX - dragStartX;
  const deltaY = event.clientY - dragStartY;
  viewportRef.value.scrollLeft = dragScrollLeft - deltaX;
  viewportRef.value.scrollTop = dragScrollTop - deltaY;
};

const stopViewportDragging = (event?: PointerEvent) => {
  if (!isDraggingViewport.value) return;
  if (viewportRef.value && event) {
    try {
      viewportRef.value.releasePointerCapture?.(event.pointerId);
    } catch {
      // ignore release failures
    }
  }
  isDraggingViewport.value = false;
};

watch(
  () => props.allRows,
  (rows) => {
    const existingNodes = new Map(orgNodes.value.map((node) => [node.employeeId, node]));
    const seededNodes = seedStructureNodes(rows);
    orgNodes.value = seededNodes.map((seededNode, index) => {
      const existingNode = existingNodes.get(seededNode.employeeId);
      if (!existingNode) return seededNode;
      return {
        ...existingNode,
        sortOrder: existingNode.sortOrder ?? index + 1,
      };
    });
  },
  { immediate: true, deep: true },
);

watch(
  orgChartVisibleRoots,
  (nodes) => {
    const visibleIds = new Set(flattenOrgChartNodes(nodes).map((node) => node.id));
    if (selectedOrgChartNodeId.value && visibleIds.has(selectedOrgChartNodeId.value)) return;
    selectedOrgChartNodeId.value = findFirstOrgChartNodeId(nodes);
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  isDraggingViewport.value = false;
});
</script>

<template>
  <div class="overflow-hidden rounded-2xl border border-base-300 bg-base-100">
    <div class="border-b border-base-300 bg-base-50 px-4 py-4">
      <div class="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div class="min-w-0 flex-1">
          <div class="text-lg font-semibold">Approval Hierarchy Viewer</div>
          <p class="mt-1 text-sm text-base-content/65">
            Fokus ke hubungan atasan-bawahan, jalur approval, dan detail employee. Belum masuk mode edit struktur.
          </p>
        </div>

        <div class="flex w-full flex-col gap-2 xl:w-auto xl:min-w-[24rem]">
          <div class="flex justify-start xl:justify-end">
            <Button color="primary" size="sm" @click="openAddTopLevelModal">
              <Icon name="plus" class="h-4 w-4" />
              Add top-level node
            </Button>
          </div>
          <Input
            v-model="orgChartSearch"
            size="sm"
            placeholder="Search node..."
            class="w-full xl:w-[24rem]"
            prefix-icon="search"
            clearable
          />
        </div>
      </div>
    </div>

    <div class="flex flex-wrap items-center gap-3 border-b border-base-300 px-4 py-3 text-sm">
      <div class="rounded-full border border-base-300 bg-base-100 px-3 py-1.5">
        Nodes: <span class="font-semibold">{{ orgChartFlatVisibleNodes.length }}</span>
      </div>
      <div class="rounded-full border border-base-300 bg-base-100 px-3 py-1.5">
        Departments: <span class="font-semibold">{{ departmentCount }}</span>
      </div>
      <div class="rounded-full border border-base-300 bg-base-100 px-3 py-1.5">
        Zoom: <span class="font-semibold">{{ Math.round(orgChartZoom * 100) }}%</span>
      </div>
      <button
        type="button"
        :class="[
          'rounded-full border px-3 py-1.5 text-xs font-medium transition',
          highlightApprovalPath
            ? 'border-primary bg-primary/10 text-primary'
            : 'border-base-300 bg-base-100 text-base-content/70',
        ]"
        @click="highlightApprovalPath = !highlightApprovalPath"
      >
        Highlight approval line
      </button>
      <div class="ml-auto flex items-center gap-2">
        <Button
          v-if="!detailDrawerOpen && orgChartSelectedRow"
          variant="outline"
          color="default"
          size="sm"
          @click="openDetailDrawer"
        >
          <Icon name="layout" class="h-4 w-4" />
          Show details
        </Button>
        <Button variant="outline" color="default" size="sm" @click="zoomOutOrgChart">
          <Icon name="minus" class="h-4 w-4" />
        </Button>
        <Button variant="outline" color="default" size="sm" @click="zoomInOrgChart">
          <Icon name="plus" class="h-4 w-4" />
        </Button>
        <Button variant="outline" color="default" size="sm" @click="resetOrgChartView">
          Reset
        </Button>
      </div>
    </div>

    <div class="org-chart-shell">
      <div class="org-chart-surface">
        <div
          ref="viewportRef"
          class="org-chart-viewport"
          :class="{ 'org-chart-viewport-dragging': isDraggingViewport }"
          @pointerdown="onViewportPointerDown"
          @pointermove="onViewportPointerMove"
          @pointerup="stopViewportDragging"
          @pointercancel="stopViewportDragging"
          @pointerleave="stopViewportDragging"
        >
          <div class="org-chart-canvas" :style="{ transform: `scale(${orgChartZoom})` }">
            <div v-if="orgChartVisibleRoots.length" class="org-chart-tree-wrap">
              <ul class="org-chart-root-list">
                <EmployeeOrgChartBranch
                  v-for="node in orgChartVisibleRoots"
                  :key="node.id"
                  :node="node"
                  :selected-id="selectedOrgChartNodeId ?? undefined"
                  :highlighted-ids="orgChartHighlightedIds"
                  @select="selectOrgChartNode"
                />
              </ul>
            </div>
            <div v-else class="org-chart-empty-state">
              <div class="text-lg font-semibold">No matching nodes</div>
              <p class="mt-2 max-w-md text-sm text-base-content/65">
                Coba ubah department filter atau kata kunci pencarian untuk menampilkan struktur organisasi yang relevan.
              </p>
            </div>
          </div>
        </div>
      </div>

      <EmployeeOrgChartDrawer
        :open="detailDrawerOpen"
        :selected-row="orgChartSelectedRow"
        :selected-chain="orgChartSelectedChain"
        :selected-direct-reports="orgChartSelectedDirectReports"
        @close="closeDetailDrawer"
        @open-detail="openOrgChartDetail"
        @add-subordinate="openAddSubordinateModal"
        @change-manager="openChangeManagerModal"
        @select-node="selectOrgChartNode"
      />
    </div>
  </div>

  <EmployeeOrgChartDialogs
    :add-top-level-modal-open="addTopLevelModalOpen"
    :selected-top-level-employee-id="selectedTopLevelEmployeeId"
    :add-top-level-reason="addTopLevelReason"
    :add-top-level-options="addTopLevelOptions"
    :add-top-level-disabled="addTopLevelDisabled"
    :add-subordinate-modal-open="addSubordinateModalOpen"
    :selected-subordinate-employee-id="selectedSubordinateEmployeeId"
    :add-subordinate-reason="addSubordinateReason"
    :subordinate-options="subordinateOptions"
    :add-subordinate-disabled="addSubordinateDisabled"
    :change-manager-modal-open="changeManagerModalOpen"
    :selected-manager-node-id="selectedManagerNodeId"
    :change-manager-reason="changeManagerReason"
    :manager-options="managerOptions"
    :change-manager-disabled="changeManagerDisabled"
    :selected-row="orgChartSelectedRow"
    @update:selected-top-level-employee-id="selectedTopLevelEmployeeId = $event"
    @update:add-top-level-reason="addTopLevelReason = $event"
    @update:selected-subordinate-employee-id="selectedSubordinateEmployeeId = $event"
    @update:add-subordinate-reason="addSubordinateReason = $event"
    @update:selected-manager-node-id="selectedManagerNodeId = $event"
    @update:change-manager-reason="changeManagerReason = $event"
    @close:add-top-level="closeAddTopLevelModal"
    @save:add-top-level="saveTopLevelNode"
    @close:add-subordinate="closeAddSubordinateModal"
    @save:add-subordinate="saveSubordinateNode"
    @close:change-manager="closeChangeManagerModal"
    @save:change-manager="saveChangeManager"
  />
</template>

<style>
.org-chart-shell {
  position: relative;
  min-height: 720px;
}

.org-chart-surface {
  width: 100%;
  min-height: 720px;
}

.org-chart-viewport {
  overflow: auto;
  min-height: 720px;
  max-height: 78vh;
  cursor: grab;
  user-select: none;
  background:
    radial-gradient(circle at top, color-mix(in srgb, var(--color-primary) 6%, transparent), transparent 30%),
    linear-gradient(180deg, var(--color-base-50) 0%, var(--color-base-100) 100%);
}

.org-chart-viewport-dragging {
  cursor: grabbing;
}

.org-chart-canvas {
  transform-origin: top left;
  transition: transform 0.18s ease;
  min-width: 1800px;
  width: max-content;
  padding: 2rem 2.5rem 4rem;
}

.org-chart-tree-wrap {
  display: flex;
  justify-content: flex-start;
  min-width: max-content;
}

.org-chart-root-list,
.org-chart-children {
  display: flex;
  justify-content: center;
  gap: 2rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.org-chart-root-list {
  align-items: flex-start;
  padding-left: 3rem;
}

.org-chart-branch {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.org-chart-branch-has-children > .org-chart-node::after {
  content: "";
  position: absolute;
  left: 50%;
  bottom: -0.85rem;
  width: 1px;
  height: 0.85rem;
  transform: translateX(-50%);
  background: color-mix(in srgb, var(--color-primary) 22%, var(--color-base-300));
}

.org-chart-children {
  position: relative;
  padding-top: 2.1rem;
}

.org-chart-branch > .org-chart-children::after {
  content: "";
  position: absolute;
  top: 0.8rem;
  left: 2.4rem;
  right: 2.4rem;
  height: 1px;
  background: color-mix(in srgb, var(--color-primary) 22%, var(--color-base-300));
}

.org-chart-children > .org-chart-branch::before {
  content: "";
  position: absolute;
  top: -1.15rem;
  left: 50%;
  width: 1px;
  height: 1.15rem;
  background: color-mix(in srgb, var(--color-primary) 22%, var(--color-base-300));
}

.org-chart-node {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 11rem;
  min-height: 7.5rem;
  padding: 0.95rem 0.8rem 0.7rem;
  border: 1px solid color-mix(in srgb, var(--color-base-content) 12%, transparent);
  border-radius: 1rem;
  background: color-mix(in srgb, var(--color-base-100) 97%, white);
  box-shadow: 0 10px 28px rgba(15, 23, 42, 0.08);
  text-align: center;
  transition: transform 0.16s ease, box-shadow 0.16s ease, border-color 0.16s ease, background-color 0.16s ease;
}

.org-chart-node:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--color-primary) 28%, transparent);
  box-shadow: 0 15px 36px rgba(15, 23, 42, 0.12);
}

.org-chart-node-active {
  border-color: color-mix(in srgb, var(--color-primary) 60%, transparent);
  box-shadow: 0 0 0 4px color-mix(in srgb, var(--color-primary) 14%, transparent), 0 16px 38px rgba(15, 23, 42, 0.12);
}

.org-chart-node-highlight {
  background: color-mix(in srgb, var(--color-primary) 8%, var(--color-base-100));
}

.org-chart-node-topline {
  position: absolute;
  top: 0;
  left: 0.8rem;
  right: 0.8rem;
  height: 3px;
  border-radius: 999px;
  background: linear-gradient(90deg, color-mix(in srgb, var(--color-primary) 82%, white), var(--color-primary));
}

.org-chart-node-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 0.45rem;
}

.org-chart-node-code {
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--color-base-content) 45%, transparent);
}

.org-chart-node-name {
  margin-top: 0.3rem;
  max-width: 100%;
  font-size: 0.88rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--color-primary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.org-chart-node-title {
  margin-top: 0.25rem;
  max-width: 100%;
  font-size: 0.72rem;
  line-height: 1.25;
  color: color-mix(in srgb, var(--color-base-content) 72%, transparent);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.org-chart-node-footer {
  display: flex;
  justify-content: center;
  margin-top: auto;
  padding-top: 0.7rem;
}

.org-chart-node-count {
  display: inline-flex;
  min-width: 1.45rem;
  height: 1.45rem;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--color-primary);
  color: var(--color-primary-content);
  font-size: 0.7rem;
  font-weight: 700;
}

.org-chart-drawer-layer {
  position: absolute;
  inset: 0;
  z-index: 20;
}

.org-chart-drawer {
  position: absolute;
  top: 1rem;
  right: 1rem;
  bottom: 1rem;
  display: flex;
  width: 21rem;
  flex-direction: column;
  border: 1px solid color-mix(in srgb, var(--color-base-content) 10%, transparent);
  border-radius: 1.25rem;
  background: color-mix(in srgb, var(--color-base-100) 94%, white);
  box-shadow: 0 18px 48px rgba(15, 23, 42, 0.12);
  backdrop-filter: blur(12px);
  overflow: hidden;
}

.org-chart-drawer-head {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 1rem 1rem 0.9rem;
  border-bottom: 1px solid color-mix(in srgb, var(--color-base-content) 8%, transparent);
  background: color-mix(in srgb, var(--color-base-100) 97%, white);
}

.org-chart-drawer-body {
  flex: 1;
  overflow: auto;
  padding: 1rem;
}

.org-chart-empty-state {
  display: flex;
  min-height: 420px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

@media (max-width: 1023px) {
  .org-chart-canvas {
    min-width: 1400px;
  }

  .org-chart-drawer-layer {
    position: fixed;
    inset: 0;
    background: rgba(15, 23, 42, 0.14);
  }

  .org-chart-drawer {
    left: 1rem;
    width: auto;
  }
}
</style>
