<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Input from "@/components/controls/Input.vue";
import TreeList from "@/components/data/TreeList.vue";
import { Icon } from "@/composables/Icon";

type TreeNode = {
  id: number;
  name: string;
  locked?: boolean;
  children?: TreeNode[];
};

const searchQuery = ref("");
const expandedIds = reactive(new Set<number>([1, 2, 3, 31, 32]));

const treeData = ref<TreeNode[]>([
  {
    id: 1,
    name: "Pre Project",
    locked: true,
    children: [
      { id: 11, name: "Pemahaman Ruang Lingkup Awal" },
      { id: 12, name: "Aanwijzing" },
      { id: 13, name: "Feasibility Study" },
    ],
  },
  {
    id: 2,
    name: "Initiation",
    locked: true,
    children: [
      { id: 21, name: "Project Handover" },
      { id: 22, name: "Kickoff Internal" },
      { id: 23, name: "Kickoff External" },
    ],
  },
  {
    id: 3,
    name: "Execution",
    locked: true,
    children: [
      {
        id: 31,
        name: "Sprint Iteration",
        children: [
          { id: 311, name: "Desain Fungsional - Detail" },
          { id: 312, name: "Client Sign-Off" },
          { id: 313, name: "Desain Teknis" },
        ],
      },
      {
        id: 32,
        name: "Data Migration",
        children: [{ id: 321, name: "Data Migration Strategy" }],
      },
    ],
  },
]);

const allExpandableIds = computed(() => {
  const out: number[] = [];
  const walk = (nodes: TreeNode[]) => {
    nodes.forEach((node) => {
      if (node.children?.length) out.push(node.id);
      if (node.children?.length) walk(node.children);
    });
  };
  walk(treeData.value);
  return out;
});

const usageCode = `import TreeList from "@/components/data/TreeList.vue";

const expandedIds = reactive(new Set<number>([1]));
const searchQuery = ref("");

<TreeList
  :nodes="treeItems"
  :expanded-ids="expandedIds"
  :search-query="searchQuery"
  @toggle="onToggle"
  @row-click="onRowClick"
>
  <template #meta="{ node }">
    <span v-if="node.locked" class="badge badge-xs badge-soft-info">Phase</span>
  </template>
  <template #actions="{ node }">
    <button class="icon-btn icon-btn-soft-warning icon-btn-xs">
      <Icon name="pencil" class="w-3.5 h-3.5" />
    </button>
  </template>
</TreeList>`;

function toggleExpand(id: number | string) {
  const key = Number(id);
  if (expandedIds.has(key)) expandedIds.delete(key);
  else expandedIds.add(key);
}

function onRowClick(node: TreeNode) {
  if (!node.children?.length) return;
  toggleExpand(node.id);
}

function expandAll() {
  expandedIds.clear();
  allExpandableIds.value.forEach((id) => expandedIds.add(id));
}

function collapseAll() {
  expandedIds.clear();
}
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      category="Components"
      title="TreeList"
      description="Komponen tree list reusable untuk struktur berjenjang, expand/collapse, search, dan slot actions."
    />

    <section class="card p-4 md:p-6 space-y-4">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <Input v-model="searchQuery" size="sm" placeholder="Search node..." class="w-full sm:w-80" />
        <div class="flex items-center gap-2">
          <button class="btn btn-outline btn-xs" type="button" @click="expandAll">Expand All</button>
          <button class="btn btn-outline btn-xs" type="button" @click="collapseAll">Collapse All</button>
        </div>
      </div>

      <div class="rounded-box border border-base-300 p-3">
        <TreeList
          :nodes="treeData"
          :expanded-ids="expandedIds"
          :search-query="searchQuery"
          empty-text="No process found."
          @toggle="toggleExpand"
          @row-click="onRowClick"
        >
          <template #meta="{ node }">
            <span v-if="node.locked" class="badge badge-xs badge-soft-info">Phase</span>
          </template>
          <template #actions>
            <button class="icon-btn icon-btn-soft-warning icon-btn-xs" type="button" title="Edit">
              <Icon name="pencil" class="w-3.5 h-3.5" />
            </button>
            <button class="icon-btn icon-btn-soft-success icon-btn-xs" type="button" title="Add Child">
              <Icon name="plus" class="w-3.5 h-3.5" />
            </button>
          </template>
        </TreeList>
      </div>
    </section>

    <section class="card p-4 md:p-6 space-y-2">
      <h3 class="font-semibold">Usage</h3>
      <pre class="code-block"><code>{{ usageCode }}</code></pre>
    </section>
  </div>
</template>

<style scoped>
.code-block {
  margin: 0;
  padding: 0.85rem 1rem;
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  background: var(--color-base-200);
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.5;
}
</style>
