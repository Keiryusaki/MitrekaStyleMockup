<template>
  <!-- FAB -->
  <button
    @click="togglePanel"
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

          <div v-if="files.length" class="flex flex-wrap gap-2">
            <span
              v-for="(f, i) in files"
              :key="f.name + i"
              class="text-xs border rounded px-2 py-1 flex items-center gap-1"
              :title="f.name + ' • ' + Math.round(f.size / 1024) + 'KB'"
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
            Maks 5 file, total ≤ 20 MB. Hanya gambar.
          </p>
        </div>

        <!-- Honeypot -->
        <input
          v-model="form.website"
          class="hidden"
          tabindex="-1"
          autocomplete="off"
        />

        <!-- Captcha ringan -->
        <div class="flex items-end gap-2">
          <div class="flex-1">
            <label class="block text-sm mb-1">Captcha</label>
            <div class="flex items-center gap-2">
              <span class="text-sm select-none"
                >{{ cap.a }} + {{ cap.b }} =</span
              >
              <input
                v-model.number="cap.answer"
                type="number"
                class="input input-sm w-24"
                placeholder="?"
              />
              <button
                class="btn btn-ghost btn-xs"
                @click="regenCaptcha"
                :disabled="loading"
              >
                Ulang
              </button>
            </div>
            <p v-if="capErr" class="text-xs text-error mt-1">{{ capErr }}</p>
          </div>
          <div
            class="text-[11px] text-neutral-500 mb-1"
            v-if="minDelayLeft > 0"
          >
            Tunggu {{ Math.ceil(minDelayLeft / 1000) }}s sebelum kirim
          </div>
        </div>

        <div class="flex items-center gap-2">
          <button
            class="btn btn-primary"
            :disabled="loading || !canSend"
            @click="submit"
            :aria-busy="loading ? 'true' : 'false'"
            :title="
              remain > 0
                ? 'Tunggu ' + Math.ceil(remain / 1000) + ' detik'
                : 'Kirim'
            "
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
            <span>
              {{
                loading
                  ? "Mengirim…"
                  : remain > 0
                  ? "Tunggu " + Math.ceil(remain / 1000) + "s"
                  : "Kirim"
              }}
            </span>
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

/* =======================
   KONFIG: Webhook Discord
   (akan terlihat di FE — untuk internal saja)
======================= */
const WEBHOOK_URL =
  import.meta.env.VITE_DISCORD_WEBHOOK_URL ??
  "https://discord.com/api/webhooks/1433014030041092138/C2owERsKeDQ7RWweAyFPFOK95KoKDQSaRzB37bk8LNa-UY33Zw5km6PCs0k5638G2xaF"; // ← ganti punyamu

const MAX = 2000;
const open = ref(false);
const openedAt = ref(0);
function togglePanel() {
  open.value = !open.value;
  if (open.value) {
    openedAt.value = Date.now();
    regenCaptcha();
  }
}

const loading = ref(false);
const ok = ref(false);
const err = ref("");

// files
const files = ref([]);
const fileErr = ref("");
const FILES_MAX_COUNT = 5;
const FILES_MAX_TOTAL = 20 * 1024 * 1024; // 20 MB

function onPickFiles(e) {
  fileErr.value = "";
  const list = e?.target?.files || null;
  if (!list) return;

  const next = [...files.value];
  for (let i = 0; i < list.length; i++) next.push(list[i]);

  const imgs = next.filter((f) => f?.type?.startsWith("image/"));
  if (imgs.length > FILES_MAX_COUNT) {
    fileErr.value = `Maksimal ${FILES_MAX_COUNT} file.`;
    imgs.length = FILES_MAX_COUNT;
  }
  const total = imgs.reduce((a, f) => a + (f.size || 0), 0);
  if (total > FILES_MAX_TOTAL) {
    fileErr.value = `Total ukuran melebihi ${Math.round(
      FILES_MAX_TOTAL / 1024 / 1024
    )}MB.`;
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

// form
const form = ref({ nama: "", jenis: "saran", deskripsi: "", website: "" });

// captcha ringan
const cap = ref({ a: 0, b: 0, answer: null });
const capErr = ref("");
function regenCaptcha() {
  cap.value.a = Math.floor(3 + Math.random() * 7); // 3..9
  cap.value.b = Math.floor(3 + Math.random() * 7);
  cap.value.answer = null;
  capErr.value = "";
}
function isCaptchaOk() {
  return Number(cap.value.answer) === cap.value.a + cap.value.b;
}

// min delay setelah buka panel (mis. 2s)
const MIN_DELAY_MS = 2000;
const minDelayLeft = ref(0);
setInterval(() => {
  if (!open.value) return;
  const left = openedAt.value + MIN_DELAY_MS - Date.now();
  minDelayLeft.value = Math.max(0, left);
}, 200);

// cooldown antar submit
const COOLDOWN_MS = 10_000;
const STORAGE_KEY = "feedback:lastSent";
const remain = ref(0);
let raf = null;
function startCooldown(ms = COOLDOWN_MS) {
  const until = Date.now() + ms;
  localStorage.setItem(STORAGE_KEY, String(until));
  if (raf) cancelAnimationFrame(raf);
  const loop = () => {
    const left = Number(localStorage.getItem(STORAGE_KEY) || 0) - Date.now();
    remain.value = Math.max(0, left);
    if (remain.value > 0) raf = requestAnimationFrame(loop);
  };
  loop();
}
// init dari localStorage
(() => {
  const left = Number(localStorage.getItem(STORAGE_KEY) || 0) - Date.now();
  if (left > 0) startCooldown(left);
})();

const canSend = computed(
  () =>
    remain.value === 0 &&
    minDelayLeft.value === 0 &&
    isCaptchaOk() &&
    form.value.website === "" &&
    form.value.nama.trim().length > 0 &&
    form.value.deskripsi.trim().length > 0 &&
    form.value.deskripsi.length <= MAX
);

// retry helper (patuh rate-limit Discord)
async function fetchWithRetry(url, init, tries = 3) {
  const doReq = () => fetch(url, init);
  let res = await doReq();
  if (res.status === 429 || res.status === 1015) {
    // hitung tunggu: header atau body JSON retry_after
    let waitMs = 2000;
    const xra = res.headers.get("x-ratelimit-reset-after");
    const ra = res.headers.get("retry-after");
    if (xra && isFinite(Number(xra)))
      waitMs = Math.max(waitMs, Number(xra) * 1000);
    if (ra && isFinite(Number(ra)))
      waitMs = Math.max(waitMs, Number(ra) * 1000);
    try {
      const clone = res.clone();
      const txt = await clone.text();
      if (txt && txt[0] === "{") {
        const j = JSON.parse(txt);
        if (isFinite(Number(j?.retry_after)))
          waitMs = Math.max(waitMs, Number(j.retry_after)); // ms
      }
    } catch {}
    // jitter + clamp
    waitMs = Math.max(
      1500,
      Math.min(waitMs + Math.floor(Math.random() * 400), 60000)
    );
    if (tries > 1) {
      await new Promise((r) => setTimeout(r, waitMs));
      return fetchWithRetry(url, init, tries - 1);
    }
  }
  return res;
}

async function submit() {
  if (!canSend.value || loading.value) return;

  // cek captcha
  if (!isCaptchaOk()) {
    capErr.value = "Jawaban captcha salah.";
    return;
  }
  capErr.value = "";

  loading.value = true;
  ok.value = false;
  err.value = "";

  try {
    // siapkan payload untuk Discord (webhook)
    const embed = {
      title: "💬 Masukan / Pertanyaan Baru",
      description: form.value.deskripsi.trim(),
      color: 0x2563eb,
      fields: [
        { name: "Nama", value: form.value.nama.trim(), inline: true },
        { name: "Jenis", value: form.value.jenis, inline: true },
        {
          name: "Halaman",
          value: (typeof location !== "undefined" ? location.href : "-").slice(
            0,
            100
          ),
          inline: true,
        },
      ],
      timestamp: new Date().toISOString(),
      footer: { text: "MitrekaStyle • FE webhook" },
    };

    let res;
    if (!files.value.length) {
      // JSON (tanpa lampiran)
      const payload = { username: "Kotak Saran", embeds: [embed] };
      res = await fetchWithRetry(
        WEBHOOK_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
        3
      );
    } else {
      // multipart (dengan lampiran)
      const fd = new FormData();
      const attachments = files.value.map((f, i) => ({
        id: i,
        filename: f.name,
      }));
      fd.append(
        "payload_json",
        JSON.stringify({
          username: "Kotak Saran",
          embeds: [embed],
          attachments,
        })
      );
      files.value.forEach((f, i) => fd.append(`files[${i}]`, f, f.name));
      res = await fetchWithRetry(WEBHOOK_URL, { method: "POST", body: fd }, 3);
    }

    if (res.status === 429 || res.status === 1015) {
      // set cooldown sesuai saran server
      const ra = res.headers.get("retry-after");
      const xra = res.headers.get("x-ratelimit-reset-after");
      let ms = 5000;
      if (xra && isFinite(Number(xra))) ms = Number(xra) * 1000;
      else if (ra && isFinite(Number(ra))) ms = Number(ra) * 1000;
      startCooldown(Math.max(ms + 1000, 5000));
      throw new Error("Server lagi sibuk. Coba lagi nanti.");
    }

    if (!res.ok) {
      let msg = "";
      try {
        msg = (await res.json())?.message ?? (await res.text());
      } catch {}
      throw new Error(msg || `HTTP ${res.status}`);
    }

    ok.value = true;
    form.value.deskripsi = "";
    files.value = [];
    regenCaptcha();
    startCooldown(); // cooldown default 10s
    setTimeout(() => (ok.value = false), 2500);
  } catch (e) {
    err.value = e?.message || "Gagal kirim. Coba lagi ya.";
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
