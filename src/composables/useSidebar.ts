// @/composables/useSidebar.ts

import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUi } from "@/stores/ui";
import type { NavItem } from "@/components/nav/data/navigation";

// Bikin 'tip' jadi singleton state biar bisa di-share
const tip = ref<{ show: boolean; text: string; x: number; y: number }>({
  show: false,
  text: "",
  x: 0,
  y: 0,
});

export function useSidebar() {
  const ui = useUi();
  const router = useRouter();
  const route = useRoute();

  /* ====== UTIL STATE ====== */
  const match = (path: string, item: NavItem) =>
    item.exact ? route.path === path : route.path.startsWith(path);
  const isActive = (item: NavItem) => (item.to ? match(item.to, item) : false);
  const isGroupOpen = (item: NavItem) => {
    const current = ui.openGroups[item.id];
    const auto = item.children?.some(isActive) ?? false;
    if (current === undefined && auto) ui.setGroupOpen(item.id, true);
    return ui.openGroups[item.id] ?? auto;
  };
  const toggleGroup = (item: NavItem) => ui.toggleGroup(item.id);
  const go = (item: NavItem) => {
    if (item.to) router.push(item.to);
  };

  /* ====== LOGIC TOOLTIP ====== */
  function showTip(e: MouseEvent, text: string) {
    // Cuma jalanin kalo lagi collapsed
    // Ambil state 'ui' dari hook di atas
    if (!ui.sidebarCollapsed) return;

    const el = e.currentTarget as HTMLElement;
    const r = el.getBoundingClientRect();
    tip.value = {
      show: true,
      text,
      x: r.right + 10, // 10px di sebelah kanan icon
      y: r.top + r.height / 2, // Posisinya di tengah icon (vertikal)
    };
  }

  function hideTip() {
    tip.value.show = false;
  }

  return {
    // State & Utils
    ui,
    isActive,
    isGroupOpen,
    toggleGroup,
    go,
    // Tooltip
    tip, // <-- state 'tip' di-export
    showTip,
    hideTip,
  };
}
