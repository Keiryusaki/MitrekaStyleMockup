<template>
  <div class="contents md:h-full">
    <!-- Mobile drawer -->
    <div class="md:hidden" v-if="ui.sidebarOpen">
      <div
        class="fixed inset-0 bg-black/30 z-40"
        @click="ui.sidebarOpen = false"
      ></div>
      <aside
        class="fixed inset-y-0 left-0 z-50 w-72 bg-base-100 border-r border-base-300 overflow-y-auto"
      >
        <SidebarElegant />
      </aside>
    </div>

    <!-- Desktop sidebar -->
    <aside
      class="hidden md:flex flex-col h-full min-h-0 bg-base-100 border-r border-base-300 relative overflow-hidden"
      :class="ui.sidebarCollapsed ? 'w-20' : 'w-[264px]'"
    >
      <SidebarElegant :collapsed="ui.sidebarCollapsed" />
    </aside>

    <!-- Floating collapse toggle button -->
    <button
      class="hidden md:flex fixed z-20 w-6 h-6 items-center justify-center rounded-full bg-base-100 border border-base-300 shadow-md hover:bg-base-200 transition-colors"
      :class="ui.sidebarCollapsed ? 'left-[68px]' : 'left-[252px]'"
      style="top: 80px;"
      @click="ui.toggleSidebarCollapse()"
      @mouseenter="(e: MouseEvent) => showTip(e, ui.sidebarCollapsed ? 'Expand' : 'Collapse')"
      @mouseleave="hideTip"
    >
      <Icon
        :name="ui.sidebarCollapsed ? 'chevron-right' : 'chevron-left'"
        class="w-4 h-4"
      />
    </button>

    <Transition
      enter-active-class="transition-all duration-100 ease-out"
      enter-from-class="opacity-0 translate-x-[-4px]"
      enter-to-class="opacity-100 translate-x-0"
      leave-active-class="transition-all duration-75 ease-in"
      leave-from-class="opacity-0 translate-x-[-4px]"
    >
      <div
        v-if="tip.show"
        class="fixed z-[99] rounded-md bg-slate-900 px-3 py-1.5 text-sm font-medium text-white shadow-lg dark:bg-slate-800 -translate-y-1/2 pointer-events-none"
        :style="{ left: tip.x + 'px', top: tip.y + 'px' }"
      >
        {{ tip.text }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useUi } from "@/stores/ui";
import { useSidebar } from "@/composables/useSidebar"; // Import logic
import SidebarElegant from "@/components/nav/SidebarElegant.vue"; // Import renderer
import { Icon } from "@/composables/Icon";

const ui = useUi();
const { tip, showTip, hideTip } = useSidebar(); // Ambil 'tip' state dari composable
</script>
