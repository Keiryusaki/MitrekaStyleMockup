// @/composables/useSidebar.ts

import { ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useUi } from "@/stores/ui";
import { NAV, type NavItem } from "@/components/nav/data/navigation";

// Bikin 'tip' jadi singleton state biar bisa di-share
const tip = ref<{ show: boolean; text: string; x: number; y: number }>({
  show: false,
  text: "",
  x: 0,
  y: 0,
});

// Search query singleton
const searchQuery = ref("");

export function useSidebar() {
  const ui = useUi();
  const router = useRouter();
  const route = useRoute();

  /* ====== UTIL STATE ====== */
  const match = (path: string, item: NavItem) =>
    item.exact ? route.path === path : route.path.startsWith(path);
  const isActive = (item: NavItem) => (item.to ? match(item.to, item) : false);
  const isGroupOpen = (item: NavItem) => {
    // Auto-expand all groups when searching
    if (searchQuery.value.trim()) return true;
    
    const current = ui.openGroups[item.id];
    const auto = item.children?.some(isActive) ?? false;
    if (current === undefined && auto) ui.setGroupOpen(item.id, true);
    return ui.openGroups[item.id] ?? auto;
  };
  const toggleGroup = (item: NavItem) => ui.toggleGroup(item.id);
  const go = (item: NavItem) => {
    if (item.to) router.push(item.to);
    // Clear search when navigating
    searchQuery.value = "";
  };

  /* ====== LOGIC SEARCH ====== */
  const filteredNav = computed(() => {
    const query = searchQuery.value.toLowerCase().trim();
    if (!query) return NAV;

    return NAV.map((item) => {
      // If item has children, filter children
      if (item.children) {
        const matchingChildren = item.children.filter((child) =>
          child.label.toLowerCase().includes(query)
        );
        // If parent matches or has matching children, include it
        if (item.label.toLowerCase().includes(query)) {
          return item; // Return with all children
        }
        if (matchingChildren.length > 0) {
          return { ...item, children: matchingChildren };
        }
        return null;
      }
      // Regular item - check if label matches
      if (item.label.toLowerCase().includes(query)) {
        return item;
      }
      return null;
    }).filter(Boolean) as NavItem[];
  });

  const setSearchQuery = (query: string) => {
    searchQuery.value = query;
  };

  const clearSearch = () => {
    searchQuery.value = "";
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
    // Search
    searchQuery,
    filteredNav,
    setSearchQuery,
    clearSearch,
    // Tooltip
    tip,
    showTip,
    hideTip,
  };
}
