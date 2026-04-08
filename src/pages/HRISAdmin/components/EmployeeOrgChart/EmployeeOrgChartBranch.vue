<script setup lang="ts">
import { Avatar } from "@/lib/mitreka-ui-dist/vue";

import type { OrgChartNode } from "./types";

defineOptions({
  name: "EmployeeOrgChartBranch",
});

defineProps<{
  node: OrgChartNode;
  selectedId?: number | null;
  highlightedIds: number[];
}>();

const emit = defineEmits<{
  select: [id: number];
}>();
</script>

<template>
  <li class="org-chart-branch" :class="{ 'org-chart-branch-has-children': node.children.length }">
    <button
      type="button"
      :class="[
        'org-chart-node',
        selectedId === node.id ? 'org-chart-node-active' : '',
        highlightedIds.includes(node.id) ? 'org-chart-node-highlight' : '',
      ]"
      @click="emit('select', node.id)"
    >
      <div class="org-chart-node-topline" />
      <div class="org-chart-node-avatar">
        <Avatar :alt="node.row.name" :fallback="node.row.name" size="sm" color="primary" />
      </div>
      <div class="org-chart-node-code">{{ node.row.employeeCode }}</div>
      <div class="org-chart-node-name" :title="node.row.name">{{ node.row.name }}</div>
      <div class="org-chart-node-title" :title="node.row.title">{{ node.row.title }}</div>
      <div class="org-chart-node-footer">
        <span class="org-chart-node-count">{{ node.children.length }}</span>
      </div>
    </button>

    <ul v-if="node.children.length" class="org-chart-children">
      <EmployeeOrgChartBranch
        v-for="child in node.children"
        :key="child.id"
        :node="child"
        :selected-id="selectedId"
        :highlighted-ids="highlightedIds"
        @select="emit('select', $event)"
      />
    </ul>
  </li>
</template>
