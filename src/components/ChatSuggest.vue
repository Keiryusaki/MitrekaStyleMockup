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

        <!-- Lampiran (opsional) -->
        <div class="space-y-2">
          <label class="text-sm">Lampiran (gambar)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            @change="onPickFiles"
            :disabled="loading"
          />

          <!-- preview nama file -->
          <div v-if="files.length" class="flex flex-wrap gap-2">
            <span
              v-for="(f, i) in files"
              :key="f.name + i"
              class="text-xs border rounded px-2 py-1 flex items-center gap-1"
              :title="`${f.name} • ${Math.round(f.size / 1024)}KB`"
            >
              {{ f.name }}
              <button
                type="button"
                @click="removeFile(i)"
                aria-label="Hapus lampiran"
              >
                ×
              </button>
            </span>
          </div>

          <p v-if="fileErr" class="text-xs text-red-600">{{ fileErr }}</p>
          <p class="text-[11px] text-neutral-500">
            Maks 5 file, total ≤ 20&nbsp;MB. Hanya gambar.
          </p>
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
const WORKER_URL =
  import.meta.env.VITE_CHAT_SUGGEST_URL ??
  "https://royal-unit-882c.hatsukei0001.workers.dev";

const MAX = 2000;
const open = ref(false);
const loading = ref(false);
const ok = ref(false);
const err = ref("");

// files state (JS)
const files = ref([]);
const fileErr = ref("");

const FILES_MAX_COUNT = 5;
const FILES_MAX_TOTAL = 20 * 1024 * 1024; // 20 MB

function onPickFiles(e) {
  fileErr.value = "";
  const input = e && e.target ? e.target : null;
  const list = input && input.files ? input.files : null;
  if (!list) return;

  // gabungkan file baru dengan yang sudah ada
  const next = [...files.value];
  for (let i = 0; i < list.length; i++) next.push(list[i]);

  // hanya image/*
  const imgs = next.filter((f) => f && f.type && f.type.startsWith("image/"));

  // batas jumlah
  if (imgs.length > FILES_MAX_COUNT) {
    fileErr.value = `Maksimal ${FILES_MAX_COUNT} file.`;
    imgs.length = FILES_MAX_COUNT;
  }

  // batas total size
  const total = imgs.reduce((a, f) => a + (f.size || 0), 0);
  if (total > FILES_MAX_TOTAL) {
    fileErr.value = `Total ukuran melebihi ${Math.round(
      FILES_MAX_TOTAL / 1024 / 1024
    )}MB.`;
    // keep sampai batas
    let sum = 0;
    const kept = [];
    for (const f of imgs) {
      if (sum + f.size > FILES_MAX_TOTAL) break;
      kept.push(f);
      sum += f.size;
    }
    files.value = kept;
    return;
  }

  files.value = imgs;
}

function removeFile(i) {
  files.value.splice(i, 1);
}

const form = ref({
  nama: "",
  jenis: "saran",
  deskripsi: "",
  website: "", // honeypot
});

const canSend = computed(
  () =>
    form.value.website === "" && // honeypot harus kosong
    form.value.nama.trim().length > 0 &&
    form.value.deskripsi.trim().length > 0 &&
    form.value.deskripsi.length <= MAX
);

async function submit() {
  if (!canSend.value || loading.value) return;
  loading.value = true;
  ok.value = false;
  err.value = "";

  const ac = new AbortController();
  const t = setTimeout(() => ac.abort("timeout"), 15000);

  try {
    const payload = {
      nama: form.value.nama.trim(),
      jenis: form.value.jenis,
      deskripsi: form.value.deskripsi.trim(),
      meta: {
        url: typeof location !== "undefined" ? location.href : "",
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ua: navigator.userAgent,
      },
    };

    let res;

    if (!files.value.length) {
      // Tanpa lampiran: JSON
      res = await fetch(WORKER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: ac.signal,
      });
    } else {
      // Dengan lampiran: multipart/form-data
      const fd = new FormData();
      fd.append("payload_json", JSON.stringify(payload));
      files.value.forEach((f, i) => fd.append(`files[${i}]`, f, f.name));
      res = await fetch(WORKER_URL, {
        method: "POST",
        body: fd,
        signal: ac.signal,
      });
    }

    if (!res.ok) {
      let msg = "";
      try {
        msg = (await res.json()).error ?? (await res.text());
      } catch {}
      throw new Error(msg || `HTTP ${res.status}`);
    }

    ok.value = true;
    form.value.deskripsi = "";
    files.value = [];
    setTimeout(() => {
      ok.value = false;
    }, 2500);
  } catch (e) {
    err.value =
      e && e.name === "AbortError"
        ? "Timeout. Coba lagi ya."
        : (e && e.message) || "Gagal kirim. Coba lagi ya.";
  } finally {
    clearTimeout(t);
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
