<template>
  <button
    @click="togglePanel"
    class="fixed bottom-5 md:bottom-[70px] right-5 z-40 w-16 h-16 md:w-[72px] md:h-[72px] rounded-full backdrop-blur-xs bg-white/20 dark:bg-slate-900/20 border border-white/40 dark:border-white/10 shadow-xl shadow-black/20 hover:bg-white/25 dark:hover:bg-slate-900/25 hover:backdrop-blur-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60 transition flex items-center justify-center"
    aria-label="Bantuan"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" class="text-primary dark:text-accent">
      <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
    <span v-if="isConnected" class="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
  </button>

  <div v-if="open" @click.self="open = false" class="fixed inset-0 z-[360] bg-black/25"></div>

  <transition name="slide-up">
    <div
      v-if="open"
      class="fixed bottom-5 md:bottom-[70px] right-5 z-[400] w-[min(92vw,380px)] h-auto max-h-[calc(100dvh-7rem)] md:max-h-[calc(100dvh-11rem)] flex flex-col rounded-2xl border border-base-300 bg-base-100 text-base shadow-xl overflow-hidden"
    >
      <div class="flex-none px-4 py-3 glass-border border-b border-base-200">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2">
            <span class="inline-grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-content font-semibold">?</span>
            <div>
              <div class="text-sm font-bold">Pusat Bantuan</div>
              <div class="text-[10px] text-neutral/70">Tim kami siap membantu</div>
            </div>
          </div>
          <button class="btn btn-ghost btn-xs btn-circle" @click="open = false" aria-label="Tutup">
            <Icon name="x" class="w-4 h-4" />
          </button>
        </div>
        
      <div class="flex mt-3 p-1 bg-base-200 rounded-lg">
          <button 
            @click="activeTab = 'saran'"
            :class="['flex-1 py-1.5 text-xs font-medium rounded-md transition-all', activeTab === 'saran' ? 'bg-white shadow-sm text-primary' : 'text-neutral/60 hover:text-neutral']"
          >
            <span class="inline-flex items-center justify-center gap-1">
              <Icon name="mail" class="w-3.5 h-3.5" />
              Kotak Saran
            </span>
          </button>
          <button
            v-if="liveChatEnabled"
            @click="activeTab = 'chat'"
            :class="['flex-1 py-1.5 text-xs font-medium rounded-md transition-all', activeTab === 'chat' ? 'bg-white shadow-sm text-primary' : 'text-neutral/60 hover:text-neutral']"
          >
            <span class="inline-flex items-center justify-center gap-1">
              <Icon name="message-circle" class="w-3.5 h-3.5" />
              Live Chat
            </span>
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto relative bg-base-50/50 chat-panel-body">
        
        <div v-if="activeTab === 'saran'" class="px-4 py-4 space-y-3">
          <div>
            <label class="block text-xs font-medium mb-1">Nama <span class="text-error">*</span></label>
            <input v-model.trim="form.nama" class="input input-sm w-full input-bordered" placeholder="Nama kamu" />
          </div>

          <div>
            <label class="block text-xs font-medium mb-1">Jenis</label>
            <SelectDropdown
              v-model="form.jenis"
              :options="jenisOptions"
              size="sm"
              color="default"
              variant="outline"
              placeholder="Pilih jenis"
            />
          </div>

          <div>
            <label class="block text-xs font-medium mb-1">Pesan <span class="text-error">*</span></label>
            <TextareaInput
              v-model="form.deskripsi"
              size="sm"
              :maxlength="MAX"
              :rows="4"
              show-counter
              placeholder="Tulis pesanmu disini..."
            />
          </div>

          <div class="space-y-2">
             <label class="text-xs font-medium">Lampiran</label>
             <input type="file" accept="image/*" multiple @change="onPickFiles" class="file-input file-input-sm file-input-bordered w-full text-xs" />
             <div v-if="files.length" class="flex flex-wrap gap-1">
                <span v-for="(f, i) in files" :key="i" class="badge badge-neutral badge-xs gap-1">
                   {{ f.name.substring(0,10) }}...
                   <button @click="removeFile(i)" aria-label="Hapus file">
                     <Icon name="x" class="w-3 h-3" />
                   </button>
                </span>
             </div>
             <p v-if="fileErr" class="text-xs text-error">{{ fileErr }}</p>
          </div>

          <div class="pt-2">
             <div class="flex items-center justify-between mb-3 bg-base-200 p-2 rounded-md">
                <span class="text-xs font-mono">{{ cap.a }} + {{ cap.b }} = ?</span>
                <input v-model.number="cap.answer" type="number" class="input input-xs w-16 text-center" placeholder="?" />
             </div>
             
             <button class="btn btn-primary btn-sm w-full" :disabled="loading || !canSend" @click="submitSaran">
                <span v-if="loading" class="loading loading-spinner loading-xs"></span>
                {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
             </button>
             <p v-if="ok" class="text-center text-xs text-success mt-2">Terkirim! Terima kasih.</p>
          </div>
        </div>

        <div v-else-if="liveChatEnabled && activeTab === 'chat'" class="h-full flex flex-col">
          <div v-if="!isChatActive" class="p-5 flex flex-col justify-center h-full space-y-4">
            <div class="text-center space-y-2 mb-4">
              <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
                <Icon name="message-circle" class="w-7 h-7" />
              </div>
              <h3 class="font-bold">Mulai Percakapan</h3>
              <p class="text-xs text-gray-500">Admin kami akan membalas pesanmu secara langsung via Discord.</p>
            </div>
            <div class="join w-full">
              <button
                class="btn btn-sm join-item flex-1"
                :class="chatMode === 'start' ? 'btn-primary' : 'btn-outline'"
                @click="chatMode = 'start'"
              >
                Mulai Baru
              </button>
              <button
                class="btn btn-sm join-item flex-1"
                :class="chatMode === 'resume' ? 'btn-primary' : 'btn-outline'"
                @click="chatMode = 'resume'"
              >
                Lanjutkan Sesi
              </button>
            </div>

            <template v-if="chatMode === 'start'">
              <input v-model.trim="chatForm.name" class="input input-sm input-bordered w-full" placeholder="Nama Lengkap" />
              <input v-model.trim="chatForm.email" class="input input-sm input-bordered w-full" placeholder="Email (Opsional)" />
              <TextareaInput
                v-model="chatForm.message"
                size="sm"
                :rows="4"
                placeholder="Ceritakan kendalamu..."
              />
              <button class="btn btn-primary btn-sm w-full" @click="startChat" :disabled="chatBusy || !chatForm.name || !chatForm.message">
                {{ chatBusy ? "Memulai..." : "Mulai Chat Sekarang" }}
              </button>
            </template>
            <template v-else>
              <input v-model.trim="resumeTokenInput" class="input input-sm input-bordered w-full" placeholder="Masukkan session token" />
              <button class="btn btn-primary btn-sm w-full" @click="resumeChat" :disabled="chatBusy || !resumeTokenInput">
                {{ chatBusy ? "Memuat..." : "Lanjutkan Chat" }}
              </button>
            </template>
            <p v-if="chatError" class="text-xs text-error">{{ chatError }}</p>
          </div>

          <div v-else class="flex flex-col h-full">
            <div class="px-3 py-2 border-b border-base-200 bg-base-100/80 flex items-center justify-between gap-2">
              <span class="text-[11px] truncate">Token: <code class="font-mono">{{ sessionToken }}</code></span>
              <button class="btn btn-ghost btn-xs" @click="copyToken">Copy</button>
            </div>
            <div id="chat-box" class="flex-1 overflow-y-auto p-3 space-y-2 bg-base-50/60 chat-box-modern">
              <div
                v-for="(msg, idx) in chatMessages"
                :key="idx"
                class="chat-row"
                :class="{ 'chat-row-me': msg.isMe }"
              >
                <div class="chat-sender">{{ msg.sender }}</div>
                <div class="chat-bubble-modern" :class="{ 'chat-bubble-me': msg.isMe }">
                  {{ msg.content }}
                </div>
              </div>
            </div>
            
            <div class="p-3 bg-base-100 border-t border-base-200 flex gap-2">
               <input 
                  v-model="currentReply" 
                  @keyup.enter="sendReply"
                  type="text" 
                  class="input input-sm input-bordered w-full chat-composer-input" 
                  placeholder="Ketik pesan..." 
               />
               <button @click="sendReply" class="btn btn-sm btn-square btn-primary" aria-label="Kirim" :disabled="chatBusy">
                 <Icon name="chevron-right" class="w-4 h-4" />
               </button>
            </div>
            <p v-if="chatError" class="px-3 pb-2 text-xs text-error">{{ chatError }}</p>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, reactive, nextTick, onBeforeUnmount } from "vue";
import { Icon } from "@/components/icons";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import TextareaInput from "@/components/controls/TextareaInput.vue";

/* =========================================
   GLOBAL & UI STATE
========================================= */
const open = ref(false);
const activeTab = ref('saran'); // 'saran' | 'chat'
const liveChatEnabled = ref(import.meta.env.VITE_LIVE_CHAT_ENABLED === "true");
const LIVE_CHAT_API_BASE_URL = String(import.meta.env.VITE_LIVE_CHAT_API_BASE_URL || "").replace(/\/+$/, "");
const isConnected = computed(() => liveChatEnabled.value && Boolean(LIVE_CHAT_API_BASE_URL));

function togglePanel() {
  open.value = !open.value;
  if (open.value && activeTab.value === 'saran') {
    regenCaptcha();
    return;
  }
  if (!open.value) stopHistoryPolling();
}

/* =========================================
   LOGIC TAB 1: KOTAK SARAN (WEBHOOK)
   (Ini logic asli punya lo, gw rapihin dikit)
========================================= */
const WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL ?? "";
const MAX = 2000;
const loading = ref(false);
const ok = ref(false);
const form = ref({ nama: "", jenis: "saran", deskripsi: "" });
const files = ref([]);
const fileErr = ref("");
const cap = ref({ a: 0, b: 0, answer: null });
const jenisOptions = [
  { value: "saran", label: "Masukan / Saran" },
  { value: "bertanya", label: "Pertanyaan Umum" },
  { value: "bug", label: "Lapor Bug" },
];

// Helpers File & Captcha
function onPickFiles(e) { /* Logic file upload lo... (sama persis) */ 
   const list = e?.target?.files || [];
   files.value = [...list].slice(0, 5); // Limit 5 file simple
}
function removeFile(i) { files.value.splice(i, 1); }
function regenCaptcha() {
   cap.value.a = Math.floor(Math.random() * 10);
   cap.value.b = Math.floor(Math.random() * 10);
   cap.value.answer = null;
}
const canSend = computed(() => form.value.nama && form.value.deskripsi && cap.value.answer == (cap.value.a + cap.value.b));

// Submit ke Webhook
async function submitSaran() {
   loading.value = true;
   try {
      if (!WEBHOOK_URL) {
         alert("Webhook Kotak Saran belum diset. Hubungi admin.");
         return;
      }
      const pageUrl = window.location.href;
      const fd = new FormData();
      const payload = {
         username: "Kotak Saran",
         embeds: [{
            title: "📩 Masukan / Pertanyaan Baru",
            description: form.value.deskripsi,
            color: 0x00ff00,
            fields: [
               { name: "Nama", value: form.value.nama || "-", inline: true },
               { name: "Jenis", value: form.value.jenis || "-", inline: true },
               { name: "Halaman", value: pageUrl, inline: false }
            ],
            footer: { text: "Kotak Saran | MitrekaStyleMockup" },
            timestamp: new Date().toISOString()
         }]
      };
      fd.append("payload_json", JSON.stringify(payload));
      files.value.forEach((f, i) => fd.append(`files[${i}]`, f));

      await fetch(WEBHOOK_URL, { method: "POST", body: fd });
      
      ok.value = true;
      form.value.deskripsi = "";
      files.value = [];
      setTimeout(() => ok.value = false, 3000);
   } catch (e) {
      alert("Gagal kirim, cek koneksi.");
   } finally {
      loading.value = false;
      regenCaptcha();
   }
}

/* =========================================
   LOGIC TAB 2: LIVE CHAT (HTTP API)
========================================= */
const isChatActive = ref(false);
const chatMessages = ref([]);
const currentReply = ref("");
const chatMode = ref("start"); // start | resume
const chatBusy = ref(false);
const chatError = ref("");
const chatForm = reactive({ name: "", email: "", message: "" });
const resumeTokenInput = ref("");
const sessionToken = ref(localStorage.getItem("chat_token") || "");
let historyTimer = null;

const apiUrl = (path) => `${LIVE_CHAT_API_BASE_URL}${path}`;

function setSessionToken(token) {
  sessionToken.value = token;
  localStorage.setItem("chat_token", token);
}

async function requestJson(path, options = {}) {
  if (!LIVE_CHAT_API_BASE_URL) {
    throw new Error("Live chat API belum diset.");
  }
  const res = await fetch(apiUrl(path), options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.error || "Request gagal.");
  }
  return data;
}

async function loadHistory(token) {
  const data = await requestJson(`/chat/history?token=${encodeURIComponent(token)}`);
  const messages = Array.isArray(data.messages) ? data.messages : [];
  chatMessages.value = messages.map((msg) => ({
    sender: msg.sender || "Unknown",
    content: msg.content || "",
    isMe: msg.role === "user",
  }));
  if (data.user?.name && !chatForm.name) chatForm.name = data.user.name;
  if (data.user?.email && !chatForm.email) chatForm.email = data.user.email;
  isChatActive.value = true;
  scrollToBottom();
}

function startHistoryPolling() {
  stopHistoryPolling();
  historyTimer = window.setInterval(async () => {
    if (!isChatActive.value || !sessionToken.value || chatBusy.value) return;
    try {
      await loadHistory(sessionToken.value);
      chatError.value = "";
    } catch (err) {
      chatError.value = err.message || "Gagal memuat history.";
    }
  }, 3500);
}

function stopHistoryPolling() {
  if (historyTimer !== null) {
    window.clearInterval(historyTimer);
    historyTimer = null;
  }
}

// 2. Mulai Chat Baru
async function startChat() {
  chatError.value = "";
  chatBusy.value = true;
  try {
    const payload = {
      name: chatForm.name,
      email: chatForm.email,
      message: chatForm.message,
    };
    const data = await requestJson("/chat/start", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    setSessionToken(data.token);
    await loadHistory(data.token);
    startHistoryPolling();
    chatForm.message = "";
  } catch (err) {
    chatError.value = err.message || "Gagal memulai chat.";
  } finally {
    chatBusy.value = false;
  }
}

async function resumeChat() {
  chatError.value = "";
  chatBusy.value = true;
  try {
    const token = resumeTokenInput.value.trim();
    if (!token) throw new Error("Token wajib diisi.");
    setSessionToken(token);
    await loadHistory(token);
    startHistoryPolling();
  } catch (err) {
    chatError.value = err.message || "Gagal lanjutkan sesi.";
  } finally {
    chatBusy.value = false;
  }
}

// 3. Kirim Balasan Chat
async function sendReply() {
  if (!currentReply.value.trim() || !sessionToken.value || chatBusy.value) return;
  chatError.value = "";
  chatBusy.value = true;
  try {
    const message = currentReply.value.trim();
    await requestJson("/chat/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: sessionToken.value,
        message,
        name: chatForm.name || "User",
      }),
    });
    currentReply.value = "";
    await loadHistory(sessionToken.value);
  } catch (err) {
    chatError.value = err.message || "Gagal kirim pesan.";
  } finally {
    chatBusy.value = false;
  }
}

async function copyToken() {
  if (!sessionToken.value) return;
  await navigator.clipboard.writeText(sessionToken.value);
}

// Helper Scroll Mentok Bawah
function scrollToBottom() {
   nextTick(() => {
      const box = document.getElementById("chat-box");
      if (box) box.scrollTop = box.scrollHeight;
   });
}

onBeforeUnmount(() => {
  stopHistoryPolling();
});

// Init Captcha pertama kali
regenCaptcha();
</script>

<style scoped>
.slide-up-enter-active, .slide-up-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(20px); opacity: 0; }
.glass-border { 
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background-color: rgb(255 255 255 / 0.7);
}
:root[data-theme="mitrekadark"] .glass-border,
.dark .glass-border {
  background-color: rgb(15 23 42 / 0.7);
}

.chat-box-modern {
  background-image:
    radial-gradient(circle at 20% 0%, rgb(59 130 246 / 0.06), transparent 38%),
    radial-gradient(circle at 80% 100%, rgb(16 185 129 / 0.05), transparent 35%);
}

.chat-row {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.2rem;
}

.chat-row-me {
  align-items: flex-end;
}

.chat-sender {
  font-size: 10px;
  line-height: 1;
  color: rgb(100 116 139);
  padding: 0 0.35rem;
}

.chat-bubble-modern {
  max-width: 86%;
  font-size: 13px;
  line-height: 1.35;
  padding: 0.55rem 0.7rem;
  border-radius: 0.85rem;
  border-top-left-radius: 0.25rem;
  background: rgb(255 255 255 / 0.95);
  color: rgb(30 41 59);
  border: 1px solid rgb(226 232 240);
  box-shadow: 0 3px 12px rgb(2 6 23 / 0.06);
  word-break: break-word;
}

.chat-bubble-me {
  border-top-left-radius: 0.85rem;
  border-top-right-radius: 0.25rem;
  background: linear-gradient(145deg, rgb(37 99 235), rgb(30 64 175));
  color: white;
  border-color: rgb(29 78 216);
}

.chat-composer-input {
  border-radius: 0.75rem;
}
</style>
