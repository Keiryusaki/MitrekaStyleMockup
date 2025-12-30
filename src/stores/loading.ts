import { defineStore } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    pendingCount: 0,
    navPending: false,
    message: "Sedang memproses…",

    // === baru ===
    visible: false, // dipakai untuk menampilkan overlay
    hideTimer: null as number | null,
    extraDelayMs: 0, // grace period (ubah sesuka kamu)
  }),
  getters: {
    // ada pekerjaan berlangsung?
    isLoading: (s) => s.pendingCount > 0 || s.navPending,
  },
  actions: {
    /** Batalkan timer hide jika ada */
    cancelHide() {
      if (this.hideTimer != null) {
        clearTimeout(this.hideTimer);
        this.hideTimer = null;
      }
    },
    /** Jadwalkan hide setelah extraDelayMs */
    scheduleHide() {
      this.cancelHide();
      this.hideTimer = window.setTimeout(() => {
        this.visible = false;
        this.hideTimer = null;
      }, this.extraDelayMs);
    },

    /** dipanggil saat proses mulai */
    start(msg?: string) {
      if (msg) this.message = msg;
      this.cancelHide();
      this.pendingCount++;
      this.visible = true;
    },

    /** dipanggil saat proses selesai */
    stop() {
      this.pendingCount = Math.max(0, this.pendingCount - 1);
      if (!this.isLoading) this.scheduleHide();
    },

    setMessage(msg: string) {
      this.message = msg;
    },

    /** loading saat navigasi router */
    startNav(msg = "Memuat halaman") {
      this.cancelHide();
      this.navPending = true;
      this.message = msg;
      this.visible = true;
    },
    stopNav() {
      this.navPending = false;
      if (!this.isLoading) this.scheduleHide();
    },

    /** opsional: ubah durasi grace period runtime */
    setExtraDelay(ms: number) {
      this.extraDelayMs = Math.max(0, ms);
    },

    reset() {
      this.cancelHide();
      this.pendingCount = 0;
      this.navPending = false;
      this.visible = false;
    },
  },
});
