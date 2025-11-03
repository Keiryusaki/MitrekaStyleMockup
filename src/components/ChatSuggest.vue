<template>
  <!-- FAB -->
  <button
    @click="open = !open"
    class="fixed bottom-5 right-5 z-40 w-16 h-16 md:w-[72px] md:h-[72px] rounded-full backdrop-blur-xs bg-white/20 dark:bg-slate-900/20 border border-white/40 dark:border-white/10 shadow-xl shadow-black/20 hover:bg-white/25 dark:hover:bg-slate-900/25 hover:backdrop-blur-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition"
    aria-label="Kotak Saran"
    title="Kotak Saran / Tanya"
    style="
      right: max(1.25rem, env(safe-area-inset-right));
      bottom: max(1.25rem, env(safe-area-inset-bottom));
    "
  >
    <Icon
      name="chat"
      class="mx-auto h-7 w-7 md:h-8 md:w-8 text-primary dark:text-accent"
    />
  </button>

  <!-- Overlay -->
  <div
    v-if="open"
    @click.self="open = false"
    class="fixed inset-0 z-30 bg-black/25"
  ></div>

  <!-- Panel -->
  <transition name="slide-up">
    <div
      v-if="open"
      class="fixed bottom-16 right-5 z-40 w-[min(92vw,380px)] rounded-2xl border border-base-300 bg-base-100 text-base shadow-xl"
    >
      <div class="flex items-center justify-between px-4 py-3 glass-border">
        <div class="flex items-center gap-2">
          <span
            class="inline-grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-content font-semibold"
            >?</span
          >
          <div>
            <div class="text-sm font-semibold">Kotak Saran / Tanya</div>
            <div class="text-xs text-neutral/80">Maks 2000 karakter</div>
          </div>
        </div>
        <button
          class="icon-btn icon-btn-round"
          @click="open = false"
          aria-label="Tutup"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M6 6l12 12M18 6L6 18"
              stroke="currentColor"
              stroke-width="2"
              fill="none"
            />
          </svg>
        </button>
      </div>

      <div class="px-4 py-3 space-y-3">
        <div>
          <label class="block text-sm mb-1"
            >Nama <span class="text-error">*</span></label
          >
          <input
            v-model.trim="form.nama"
            class="input w-full"
            placeholder="Nama panggilan"
          />
        </div>

        <div>
          <label class="block text-sm mb-1">Jenis</label>
          <select v-model="form.jenis" class="select select-md">
            <option value="saran">Masukan</option>
            <option value="bertanya">Tanya Bang</option>
          </select>
        </div>

        <div class="relative">
          <label class="block text-sm mb-1"
            >Deskripsi <span class="text-error">*</span></label
          >
          <textarea
            v-model="form.deskripsi"
            :maxlength="MAX"
            rows="4"
            class="input w-full min-h-[110px] !h-auto resize-y pr-14"
            placeholder="Tulis singkat & jelas…"
          ></textarea>
          <span
            class="pointer-events-none absolute bottom-2 right-3 text-xs text-neutral/80"
          >
            {{ form.deskripsi.length }}/{{ MAX }}
          </span>
        </div>

        <!-- Honeypot -->
        <input
          v-model="form.website"
          class="hidden"
          tabindex="-1"
          autocomplete="off"
        />

        <div class="flex items-center gap-2">
          <button
            class="btn btn-primary"
            :disabled="loading || !canSend"
            @click="submit"
          >
            <svg
              v-if="!loading"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
            <svg v-else class="h-4 w-4 animate-spin" viewBox="0 0 24 24">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                opacity=".25"
              />
              <path
                d="M22 12a10 10 0 0 1-10 10"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
              />
            </svg>
            <span>{{ loading ? "Mengirim…" : "Kirim" }}</span>
          </button>

          <span v-if="ok" class="text-success text-sm"
            >Terkirim. Makasih! 🎉</span
          >
          <span v-if="err" class="text-error text-sm">{{ err }}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed } from "vue";

// GANTI ke URL Worker kamu:
const WORKER_URL = "https://royal-unit-882c.hatsukei0001.workers.dev";

const MAX = 2000;
const open = ref(false);
const loading = ref(false);
const ok = ref(false);
const err = ref("");

const form = ref({
  nama: "",
  jenis: "saran",
  deskripsi: "",
  website: "", // honeypot
});

const canSend = computed(
  () =>
    form.value.nama.trim().length > 0 && form.value.deskripsi.trim().length > 0
);

async function submit() {
  if (!canSend.value) return;
  loading.value = true;
  ok.value = false;
  err.value = "";
  try {
    const res = await fetch(WORKER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nama: form.value.nama.trim(),
        jenis: form.value.jenis,
        deskripsi: form.value.deskripsi.trim(),
        fromPage: location.pathname,
        website: form.value.website,
      }),
    });
    if (!res.ok) throw new Error(await res.text());
    ok.value = true;
    form.value.deskripsi = "";
    setTimeout(() => {
      ok.value = false;
    }, 2500);
  } catch (e) {
    err.value = "Gagal kirim. Coba lagi ya.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.18s ease, opacity 0.18s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(6px);
  opacity: 0;
}
</style>
