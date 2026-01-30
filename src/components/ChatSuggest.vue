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

  <div v-if="open" @click.self="open = false" class="fixed inset-0 z-30 bg-black/25"></div>

  <transition name="slide-up">
    <div
      v-if="open"
      class="fixed bottom-24 md:bottom-[150px] right-5 z-40 w-[min(92vw,380px)] h-[550px] flex flex-col rounded-2xl border border-base-300 bg-base-100 text-base shadow-xl overflow-hidden"
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
          <button class="btn btn-ghost btn-xs btn-circle" @click="open = false">âœ•</button>
        </div>
        
      <div class="flex mt-3 p-1 bg-base-200 rounded-lg">
          <button 
            @click="activeTab = 'saran'"
            :class="['flex-1 py-1.5 text-xs font-medium rounded-md transition-all', activeTab === 'saran' ? 'bg-white shadow-sm text-primary' : 'text-neutral/60 hover:text-neutral']"
          >
            âœ‰ï¸ Kotak Saran
          </button>
          <button
            v-if="liveChatEnabled"
            @click="activeTab = 'chat'"
            :class="['flex-1 py-1.5 text-xs font-medium rounded-md transition-all', activeTab === 'chat' ? 'bg-white shadow-sm text-primary' : 'text-neutral/60 hover:text-neutral']"
          >
            ðŸ’¬ Live Chat
          </button>
        </div>
      </div>

      <div class="flex-1 overflow-y-auto relative bg-base-50/50">
        
        <div v-if="activeTab === 'saran'" class="px-4 py-4 space-y-3">
          <div>
            <label class="block text-xs font-medium mb-1">Nama <span class="text-error">*</span></label>
            <input v-model.trim="form.nama" class="input input-sm w-full input-bordered" placeholder="Nama kamu" />
          </div>

          <div>
            <label class="block text-xs font-medium mb-1">Jenis</label>
            <select v-model="form.jenis" class="select select-sm w-full select-bordered">
              <option value="saran">Masukan / Saran</option>
              <option value="bertanya">Pertanyaan Umum</option>
              <option value="bug">Lapor Bug</option>
            </select>
          </div>

          <div class="relative">
            <label class="block text-xs font-medium mb-1">Pesan <span class="text-error">*</span></label>
            <textarea v-model="form.deskripsi" :maxlength="MAX" rows="4" class="textarea textarea-bordered w-full text-sm resize-none" placeholder="Tulis pesanmu disini..."></textarea>
            <span class="absolute bottom-2 right-3 text-[10px] text-neutral/50">{{ form.deskripsi.length }}/{{ MAX }}</span>
          </div>

          <div class="space-y-2">
             <label class="text-xs font-medium">Lampiran</label>
             <input type="file" accept="image/*" multiple @change="onPickFiles" class="file-input file-input-sm file-input-bordered w-full text-xs" />
             <div v-if="files.length" class="flex flex-wrap gap-1">
                <span v-for="(f, i) in files" :key="i" class="badge badge-neutral badge-xs gap-1">
                   {{ f.name.substring(0,10) }}... <button @click="removeFile(i)">Ã—</button>
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
              <div class="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto text-3xl">ðŸ‘‹</div>
              <h3 class="font-bold">Mulai Percakapan</h3>
              <p class="text-xs text-gray-500">Admin kami akan membalas pesanmu secara langsung via Discord.</p>
            </div>

            <input v-model="chatForm.name" class="input input-sm input-bordered w-full" placeholder="Nama Lengkap" />
            <input v-model="chatForm.email" class="input input-sm input-bordered w-full" placeholder="Email (Opsional)" />
            <textarea v-model="chatForm.message" class="textarea textarea-bordered h-24 resize-none" placeholder="Ceritakan kendalamu..."></textarea>
            
            <button class="btn btn-primary btn-sm w-full" @click="startChat" :disabled="!chatForm.name || !chatForm.message">
               Mulai Chat Sekarang
            </button>
          </div>

          <div v-else class="flex flex-col h-full">
            <div id="chat-box" class="flex-1 overflow-y-auto p-4 space-y-3">
               <div v-for="(msg, idx) in chatMessages" :key="idx" :class="['chat', msg.isMe ? 'chat-end' : 'chat-start']">
                  <div class="chat-header text-[10px] opacity-50 mb-1" :class="['chat', msg.isMe ? '' : 'text-right']">{{ msg.sender }}</div>
                  <div :class="['chat-bubble text-sm', msg.isMe ? 'chat-bubble-primary' : 'bg-base-200 text-base-content text-right']">
                    {{ msg.content }}
                  </div>
               </div>
            </div>
            
            <div class="p-3 bg-base-100 border-t border-base-200 flex gap-2">
               <input 
                  v-model="currentReply" 
                  @keyup.enter="sendReply"
                  type="text" 
                  class="input input-sm input-bordered w-full" 
                  placeholder="Ketik pesan..." 
               />
               <button @click="sendReply" class="btn btn-sm btn-square btn-primary">âž¤</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, computed, reactive, nextTick } from "vue";

/* =========================================
   GLOBAL & UI STATE
========================================= */
const open = ref(false);
const activeTab = ref('saran'); // 'saran' | 'chat'
const liveChatEnabled = ref(false);
const isConnected = ref(false); // Status koneksi socket

function togglePanel() {
  open.value = !open.value;
  if (open.value && activeTab.value === 'saran') {
    regenCaptcha();
  }
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
            title: "ðŸ’¬ Masukan / Pertanyaan Baru",
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
   LOGIC TAB 2: LIVE CHAT (SOCKET.IO)
   (Ini logic baru yang kita build bareng)
========================================= */
const socket = ref(null);
const isChatActive = ref(false);
const chatMessages = ref([]);
const currentReply = ref("");
const chatForm = reactive({ name: "", email: "", message: "" });
const sessionToken = ref(localStorage.getItem('chat_token') || "");

// 1. Setup Socket saat Component Load
// Live chat dimatikan sementara (testing)

// 2. Mulai Chat Baru
function startChat() {
   if (!socket.value) return;
   
   // Generate Token Baru
   const newToken = "user-" + Date.now().toString(36);
   localStorage.setItem("chat_token", newToken);
   sessionToken.value = newToken;
   
   // Join Room
   socket.value.emit("join_session", newToken);

   // Kirim Pesan Pertama (Data Form)
   const initialMsg = `**USER BARU**\nðŸ‘¤ ${chatForm.name} (${chatForm.email})\nðŸ“ ${chatForm.message}`;
   socket.value.emit("send_message", { token: newToken, message: initialMsg });

   // Update UI
   chatMessages.value.push({ sender: "Me", content: chatForm.message, isMe: true });
   isChatActive.value = true;
   scrollToBottom();
}

// 3. Kirim Balasan Chat
function sendReply() {
   if (!currentReply.value.trim() || !socket.value) return;
   
   socket.value.emit("send_message", { 
      token: sessionToken.value, 
      message: currentReply.value 
   });

   chatMessages.value.push({ sender: "Me", content: currentReply.value, isMe: true });
   currentReply.value = "";
   scrollToBottom();
}

// Helper Scroll Mentok Bawah
function scrollToBottom() {
   nextTick(() => {
      const box = document.getElementById("chat-box");
      if (box) box.scrollTop = box.scrollHeight;
   });
}

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
</style>
