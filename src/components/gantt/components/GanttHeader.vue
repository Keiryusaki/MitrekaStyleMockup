<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@/composables/Icon";
import { defaultGanttLabels } from "../types";
import type { TimeSlot, GanttLabels } from "../types";

withDefaults(
  defineProps<{
    monthGroups: Array<{ label: string; span: number }>;
    slots: TimeSlot[];
    gridColumns: string;
    leftPanelWidth: number;
    showToolbarOnly?: boolean;
    allowSummaryEdit?: boolean;
    labels?: GanttLabels;
  }>(),
  {
    labels: () => defaultGanttLabels,
  }
);
const emit = defineEmits<{
  addRootTask: [];
  toggleSummaryEdit: [];
}>();

const searchQuery = ref("");
const activeTab = ref<"gantt" | "workload">("gantt");
</script>

<template>
  <div>
    <!-- Toolbar: Title + Tabs + Search (only show when showToolbarOnly=true or when not specified) -->
    <div v-if="showToolbarOnly !== false" class="gantt-toolbar">
      <div class="gantt-toolbar-left">
        <h3 class="gantt-toolbar-title">{{ labels.toolbarTitle }}</h3>
        <span class="gantt-toolbar-subtitle">{{ labels.toolbarSubtitle }}</span>
      </div>
      <div class="gantt-toolbar-center">
        <button type="button" class="gantt-tab" :class="{ 'is-active': activeTab === 'gantt' }" @click="activeTab = 'gantt'">
          <Icon name="bar-chart-2" class="w-3.5 h-3.5" />
          {{ labels.tabGantt }}
        </button>
        <button type="button" class="gantt-tab" :class="{ 'is-active': activeTab === 'workload' }" @click="activeTab = 'workload'">
          <Icon name="users" class="w-3.5 h-3.5" />
          {{ labels.tabWorkload }}
        </button>
      </div>
      <div class="gantt-toolbar-right">
        <button type="button" class="gantt-action-btn" @click="emit('addRootTask')">{{ labels.addRootTask }}</button>
        <button type="button" class="gantt-action-btn" :class="{ 'is-active': allowSummaryEdit }" @click="emit('toggleSummaryEdit')">
          {{ allowSummaryEdit ? labels.summaryEditOn : labels.summaryEditOff }}
        </button>
        <div class="gantt-search">
          <Icon name="search" class="w-3.5 h-3.5 text-slate-400" />
          <input v-model="searchQuery" type="text" :placeholder="labels.searchPlaceholder" class="gantt-search-input" />
        </div>
      </div>
    </div>

    <!-- Column headers + timeline slots (only when NOT toolbar-only mode) -->
    <template v-if="!showToolbarOnly">
      <!-- Column headers row with filters -->
      <div class="gantt-row gantt-header-month" :style="{ gridTemplateColumns: gridColumns }">
        <div class="gantt-left-header sticky-left month-header-left">
          <div class="gantt-col-headers">
            <span class="gantt-col-hdr gantt-col-hdr-num">#</span>
            <span class="gantt-col-hdr gantt-col-hdr-check"></span>
            <span class="gantt-col-hdr gantt-col-hdr-task">Task name</span>
            <button type="button" class="gantt-col-filter">START <Icon name="chevron-down" class="w-3 h-3" /></button>
            <button type="button" class="gantt-col-filter">END <Icon name="chevron-down" class="w-3 h-3" /></button>
            <span class="gantt-col-hdr gantt-col-hdr-progress">%</span>
            <span class="gantt-col-hdr gantt-col-hdr-actions"></span>
          </div>
        </div>
        <div v-for="group in monthGroups" :key="group.label" class="gantt-month-cell" :style="{ gridColumn: `span ${group.span}` }">
          {{ group.label }}
        </div>
      </div>

      <!-- Day/Week sub-header -->
      <div class="gantt-row gantt-header-week" :style="{ gridTemplateColumns: gridColumns }">
        <div class="gantt-left-header sticky-left week-header-left"></div>
        <div v-for="slot in slots" :key="slot.key" class="gantt-week-cell" :class="{ 'today-week': slot.isToday }">
          <span>{{ slot.label }}</span>
          <small>{{ slot.shortLabel }}</small>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.gantt-toolbar {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1rem;
  background: #1e293b;
  border-bottom: 1px solid #334155;
}

.gantt-toolbar-left {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.gantt-toolbar-title {
  margin: 0;
  font-size: 0.92rem;
  font-weight: 700;
  color: #fff;
}

.gantt-toolbar-subtitle {
  font-size: 0.62rem;
  color: #94a3b8;
}

.gantt-toolbar-center {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-left: 1.5rem;
}

.gantt-tab {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.4rem 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.74rem;
  font-weight: 600;
  color: #94a3b8;
  background: transparent;
  border: none;
  cursor: pointer;
}

.gantt-tab:hover {
  color: #e2e8f0;
  background: rgba(255, 255, 255, 0.06);
}

.gantt-tab.is-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.12);
}

.gantt-toolbar-right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.gantt-action-btn {
  border: 1px solid rgba(148, 163, 184, 0.45);
  background: rgba(15, 23, 42, 0.35);
  color: #e2e8f0;
  border-radius: 0.45rem;
  padding: 0.34rem 0.6rem;
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
}

.gantt-action-btn.is-active {
  background: rgba(14, 165, 233, 0.22);
  border-color: rgba(56, 189, 248, 0.75);
  color: #e0f2fe;
}

.gantt-search {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.65rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.gantt-search-input {
  background: transparent;
  border: none;
  outline: none;
  font-size: 0.72rem;
  color: #e2e8f0;
  width: 140px;
}

.gantt-search-input::placeholder {
  color: #64748b;
}

.gantt-row {
  display: grid;
  position: relative;
}

.gantt-header-month,
.gantt-header-week {
  position: sticky;
  z-index: 30;
}

.gantt-header-month {
  top: 0;
  background: #f8fafc;
  border-bottom: 1px solid rgba(226, 232, 240, 1);
}

.gantt-header-week {
  top: 44px;
  background: #fff;
  border-bottom: 1px solid rgba(226, 232, 240, 1);
}

.gantt-left-header {
  border-right: 1px solid rgba(226, 232, 240, 1);
  background: #fff;
}

.sticky-left {
  position: sticky;
  left: 0;
  z-index: 35;
}

.month-header-left {
  padding: 0.55rem 0.6rem;
  background: #f8fafc;
  z-index: 35;
}

.week-header-left {
  padding: 0.5rem 0.6rem;
  background: #fff;
  z-index: 35;
  min-height: 36px;
}

.gantt-col-headers {
  display: grid;
  grid-template-columns: 28px 24px 1fr 62px 62px 36px 54px;
  gap: 0.3rem;
  align-items: center;
  font-size: 0.64rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #64748b;
}

.gantt-col-hdr {
  white-space: nowrap;
}

.gantt-col-hdr-num {
  text-align: center;
}

.gantt-col-filter {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  padding: 0.2rem 0.35rem;
  border-radius: 0.35rem;
  border: 1px solid rgba(203, 213, 225, 0.7);
  background: #fff;
  font-size: 0.6rem;
  font-weight: 700;
  color: #64748b;
  cursor: pointer;
}

.gantt-col-filter:hover {
  background: #f1f5f9;
}

.gantt-month-cell,
.gantt-week-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #64748b;
  border-left: 1px solid rgba(226, 232, 240, 0.8);
}

.gantt-week-cell {
  flex-direction: column;
  gap: 0.16rem;
  min-height: 36px;
  letter-spacing: 0.04em;
}

.gantt-week-cell small {
  font-size: 0.6rem;
  color: #94a3b8;
}

.today-week {
  background: linear-gradient(180deg, rgba(254, 242, 242, 0.82), rgba(255, 255, 255, 0.92));
}
</style>

