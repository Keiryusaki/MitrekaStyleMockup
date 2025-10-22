// --- src/stores/ui.ts ---
import { defineStore } from "pinia";

export type ToastType = "info" | "success" | "warning" | "error" | "primary";
export type ToastItem = {
  id: number;
  type: ToastType;
  title?: string;
  message: string;
  timeout?: number;
};

const KEY = "ui-pref-v1";
function loadPref<T>(fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "") as T;
  } catch {
    return fallback;
  }
}
function savePref(obj: any) {
  try {
    localStorage.setItem(KEY, JSON.stringify(obj));
  } catch {}
}

export const useUi = defineStore("ui", {
  state: () => ({
    theme: "mitrekalight" as "mitrekalight" | "mitrekadark",
    sidebarOpen: false,
    sidebarCollapsed: loadPref({ sidebarCollapsed: false })
      .sidebarCollapsed as boolean,
    openGroups: loadPref({ openGroups: {} as Record<string, boolean> })
      .openGroups as Record<string, boolean>,
    toasts: [] as ToastItem[],
    lastId: 0,
  }),
  actions: {
    /** Terapkan theme ke <html>: data-theme + kelas .dark */
    applyTheme() {
      const el = document.documentElement;
      el.dataset.theme = this.theme;
      el.classList.toggle("dark", this.theme === "mitrekadark");
    },

    toggleTheme() {
      this.theme =
        this.theme === "mitrekalight" ? "mitrekadark" : "mitrekalight";
      this.applyTheme();
    },
    setTheme(theme: "mitrekalight" | "mitrekadark") {
      this.theme = theme;
      this.applyTheme();
    },

    toggleSidebarCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      savePref({
        sidebarCollapsed: this.sidebarCollapsed,
        openGroups: this.openGroups,
      });
    },
    setGroupOpen(id: string, v: boolean) {
      this.openGroups[id] = v;
      savePref({
        sidebarCollapsed: this.sidebarCollapsed,
        openGroups: this.openGroups,
      });
    },
    toggleGroup(id: string) {
      this.setGroupOpen(id, !this.openGroups[id]);
    },

    notify(partial: Omit<ToastItem, "id">) {
      const id = ++this.lastId;
      const item: ToastItem = { id, timeout: 3000, type: "info", ...partial };
      this.toasts.push(item);
      if (item.timeout && item.timeout > 0)
        setTimeout(() => this.dismiss(id), item.timeout);
      return id;
    },
    dismiss(id: number) {
      this.toasts = this.toasts.filter((t) => t.id !== id);
    },
    clearToasts() {
      this.toasts = [];
    },
  },
});
