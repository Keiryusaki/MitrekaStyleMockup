<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@/composables/Icon";

export type TreeListNode = {
  id: string | number;
  name: string;
  children?: TreeListNode[];
  [key: string]: unknown;
};

type FlatRow = {
  node: TreeListNode;
  depth: number;
  numberLabel: string;
  ancestors: Array<string | number>;
};

const props = withDefaults(
  defineProps<{
    nodes: TreeListNode[];
    expandedIds: Array<string | number> | Set<string | number>;
    searchQuery?: string;
    emptyText?: string;
    baseIndent?: number;
    indentStep?: number;
  }>(),
  {
    searchQuery: "",
    emptyText: "No data found.",
    baseIndent: 12,
    indentStep: 24,
  }
);

const emit = defineEmits<{
  (e: "toggle", id: string | number): void;
  (e: "row-click", node: TreeListNode): void;
}>();

const expandedSet = computed(() =>
  props.expandedIds instanceof Set ? props.expandedIds : new Set(props.expandedIds)
);

const flatAllRows = computed<FlatRow[]>(() => {
  const out: FlatRow[] = [];
  const walk = (
    nodes: TreeListNode[],
    depth: number,
    path: number[],
    ancestors: Array<string | number>
  ) => {
    nodes.forEach((node, idx) => {
      const currentPath = [...path, idx + 1];
      out.push({
        node,
        depth,
        numberLabel: currentPath.join("."),
        ancestors,
      });
      if (node.children?.length) {
        walk(node.children, depth + 1, currentPath, [...ancestors, node.id]);
      }
    });
  };
  walk(props.nodes ?? [], 0, [], []);
  return out;
});

const flatVisibleRows = computed<FlatRow[]>(() => {
  const out: FlatRow[] = [];
  const walk = (nodes: TreeListNode[], depth: number, path: number[]) => {
    nodes.forEach((node, idx) => {
      const currentPath = [...path, idx + 1];
      out.push({
        node,
        depth,
        numberLabel: currentPath.join("."),
        ancestors: [],
      });
      if (node.children?.length && expandedSet.value.has(node.id)) {
        walk(node.children, depth + 1, currentPath);
      }
    });
  };
  walk(props.nodes ?? [], 0, []);
  return out;
});

const rows = computed<FlatRow[]>(() => {
  const keyword = props.searchQuery.trim().toLowerCase();
  if (!keyword) return flatVisibleRows.value;

  const includeIds = new Set<string | number>();
  flatAllRows.value.forEach((row) => {
    const text = `${row.numberLabel} ${row.node.name}`.toLowerCase();
    if (!text.includes(keyword)) return;
    includeIds.add(row.node.id);
    row.ancestors.forEach((ancestor) => includeIds.add(ancestor));
  });
  return flatAllRows.value.filter((row) => includeIds.has(row.node.id));
});

const hasChildren = (node: TreeListNode) => Boolean(node.children?.length);

function onToggle(id: string | number) {
  emit("toggle", id);
}

function onRowClick(node: TreeListNode) {
  emit("row-click", node);
}
</script>

<template>
  <div class="tree-list">
    <div v-if="!rows.length" class="tree-list__empty">{{ emptyText }}</div>
    <div v-for="row in rows" :key="row.node.id" class="tree-list__row-wrap">
      <div
        class="tree-list__row"
        :class="{ 'tree-list__row--with-guides': row.depth > 0 }"
        :style="{
          paddingLeft: `${baseIndent + row.depth * indentStep}px`,
          '--guide-width': `${row.depth * indentStep}px`,
        }"
        @click="onRowClick(row.node)"
      >
        <button
          v-if="hasChildren(row.node)"
          class="tree-list__toggle"
          type="button"
          @click.stop="onToggle(row.node.id)"
        >
          <Icon
            name="chevron-right"
            class="w-4 h-4 text-base-content/50 transition-transform duration-150"
            :class="{ 'rotate-90': expandedSet.has(row.node.id) }"
          />
        </button>
        <span v-else class="tree-list__toggle-space"></span>
        <span class="tree-list__code">{{ row.numberLabel }}.</span>
        <span class="tree-list__name" :class="row.depth === 0 ? 'font-semibold' : ''">
          {{ row.node.name }}
        </span>
        <slot name="meta" :row="row" :node="row.node" />
        <span class="flex-1"></span>
        <div class="tree-list__actions" @click.stop>
          <slot name="actions" :row="row" :node="row.node" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.tree-list__empty {
  padding: 2rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: color-mix(in oklch, var(--color-base-content), transparent 40%);
}
.tree-list__row {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.1rem 0.75rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.12s ease;
  user-select: none;
}
.tree-list__row > * {
  position: relative;
  z-index: 1;
}
.tree-list__row--with-guides::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: var(--guide-width);
  background-image: repeating-linear-gradient(
    to right,
    transparent 0,
    transparent 23px,
    color-mix(in oklch, var(--color-base-content), transparent 84%) 23px,
    color-mix(in oklch, var(--color-base-content), transparent 84%) 24px
  );
  pointer-events: none;
}
.tree-list__row:hover {
  background: var(--color-base-200);
}
.tree-list__toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
}
.tree-list__toggle:hover {
  background: var(--color-base-300);
}
.tree-list__toggle-space {
  width: 20px;
  flex-shrink: 0;
}
.tree-list__code {
  font-size: 0.78rem;
  font-weight: 700;
  opacity: 0.7;
  flex-shrink: 0;
}
.tree-list__name {
  font-size: 0.875rem;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tree-list__actions {
  display: flex;
  gap: 0.25rem;
  opacity: 0;
  transition: opacity 0.15s;
}
.tree-list__row:hover .tree-list__actions {
  opacity: 1;
}
</style>
