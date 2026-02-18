<template>
  <div class="contents md:h-full">
    <!-- Mobile drawer -->
    <div class="md:hidden" v-if="ui.sidebarOpen">
      <div
        class="fixed inset-0 bg-black/30 z-40"
        @click="ui.sidebarOpen = false"
      ></div>
      <aside
        class="fixed top-14 left-0 z-50 w-72 h-[calc(100dvh-56px)] theme-sidebar border-r border-base-300 overflow-y-auto overscroll-y-contain"
      >
        <SidebarElegant />
      </aside>
    </div>

    <!-- Desktop sidebar -->
    <aside
      class="hidden md:flex flex-col h-full min-h-0 theme-sidebar border-r border-base-300 relative overflow-hidden"
      :class="ui.sidebarCollapsed ? 'w-20' : 'w-[264px]'"
    >
      <SidebarElegant :collapsed="ui.sidebarCollapsed" />
    </aside>

    <!-- Floating collapse toggle button - elegant pill style -->
    <button
      class="hidden md:flex fixed z-20 w-5 h-10 items-center justify-center rounded-r-full bg-base-100 border border-l-0 border-base-300 shadow-md sidebar-collapse-btn transition-all duration-200"
      :class="ui.sidebarCollapsed ? 'left-[80px]' : 'left-[264px]'"
      style="top: 80px;"
      @click="ui.toggleSidebarCollapse()"
      @mouseenter="(e: MouseEvent) => showTip(e, ui.sidebarCollapsed ? 'Expand' : 'Collapse')"
      @mouseleave="hideTip"
    >
      <Icon
        :name="ui.sidebarCollapsed ? 'chevron-right' : 'chevron-left'"
        class="w-3.5 h-3.5 transition-transform duration-200"
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
