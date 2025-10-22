<template>
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

  <aside
    class="hidden md:flex h-full flex-col bg-base-100 border-r border-base-300"
    :class="ui.sidebarCollapsed ? 'w-20' : 'w-[264px]'"
  >
    <div class="flex-1 overflow-y-auto">
      <SidebarElegant :collapsed="ui.sidebarCollapsed" />
    </div>

    <div class="p-3 border-t border-base-300">
      <button
        class="btn btn-ghost w-full justify-start"
        @click="ui.toggleSidebarCollapse()"
      >
        <Icon
          :name="ui.sidebarCollapsed ? 'chevron-right' : 'chevron-left'"
          class="w-5 h-5"
        />
        <span v-if="!ui.sidebarCollapsed" class="ml-2">Collapse</span>
      </button>
    </div>
  </aside>

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
</template>

<script setup lang="ts">
import { useUi } from "@/stores/ui";
import { useSidebar } from "@/composables/useSidebar"; // Import logic
import SidebarElegant from "@/components/nav/SidebarElegant.vue"; // Import renderer
import { Icon } from "@/composables/Icon"; // Import Icon untuk tombol collapse

const ui = useUi();
const { tip } = useSidebar(); // Ambil 'tip' state dari composable
</script>
