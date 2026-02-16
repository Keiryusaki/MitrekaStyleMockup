<template>
  <div v-if="item.children">
    <button
      class="relative w-full flex items-center gap-3 h-field rounded-field px-3 border border-transparent"
      :class="
        open ? 'bg-primary/10 text-primary' : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/20'
      "
      :aria-expanded="open"
      @click="toggleGroup(item)"
      @mouseenter="(e) => showTip(e, item.label)"
      @mouseleave="hideTip"
    >
      <Icon :name="item.icon || 'dot'" class="w-5 h-5" />
      <span v-if="!collapsed" class="font-medium flex-1 text-left">
        {{ item.label }}
      </span>
      <Icon
        v-if="!collapsed"
        name="chevron-right"
        class="w-4 h-4 transition-transform"
        :class="open ? 'rotate-90' : ''"
      />
    </button>

    <div v-if="open" class="relative mt-1" :class="collapsed ? 'pl-2' : 'pl-5'">
      <div
        v-if="!collapsed"
        class="absolute left-2 top-2 bottom-2 border-l-2 border-gray-200"
      ></div>
      <div class="flex flex-col gap-1">
        <SidebarItem
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :collapsed="collapsed"
          :show-tip="showTip"
          :hide-tip="hideTip"
        />
      </div>
    </div>
  </div>

  <router-link
    v-else-if="item.to"
    :to="item.to"
    class="relative flex items-center gap-3 h-field rounded-field cursor-pointer px-3 border border-transparent"
    :class="
      active
        ? 'bg-primary/10 text-primary border-l-[5px] border-primary pl-[10px]'
        : 'hover:bg-gray-300/50 dark:hover:bg-gray-200/20'
    "
    :aria-current="active ? 'page' : undefined"
    @mouseenter="(e) => showTip(e, item.label)"
    @mouseleave="hideTip"
  >
    <Icon :name="item.icon || 'dot'" class="w-5 h-5" />
    <span v-if="!collapsed" class="font-medium">{{ item.label }}</span>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useUi } from "@/stores/ui";
import Icon from "../misc/Icon.vue"; // Import Icon yang baru
// Import Tipe NavItem. Sesuaikan path jika beda.
import type { NavItem } from "./Sidebar.vue";

// Props
const props = defineProps<{
  item: NavItem;
  collapsed: boolean;
  showTip: (e: MouseEvent, text: string) => void;
  hideTip: () => void;
}>();

// Logic (kita pindahin dari Sidebar.vue)
const ui = useUi();
const route = useRoute();

const normalizePath = (value: string): string => {
  if (!value) return "/";
  const trimmed = value.replace(/\/+$/, "");
  return trimmed || "/";
};

const match = (path: string, item: NavItem) => {
  const current = normalizePath(route.path);
  const target = normalizePath(path);
  if (item.exact) return current === target;
  return current === target || current.startsWith(`${target}/`);
};

const active = computed(() =>
  props.item.to ? match(props.item.to, props.item) : false
);

const isGroupOpen = (item: NavItem) => {
  const current = ui.openGroups[item.id];
  const auto = item.children?.some(
    (child) => child.to && match(child.to, child)
  );
  if (current === undefined && auto) ui.setGroupOpen(item.id, true);
  return ui.openGroups[item.id] ?? auto;
};

const open = computed(() => isGroupOpen(props.item));

const toggleGroup = (item: NavItem) => ui.toggleGroup(item.id);
</script>
