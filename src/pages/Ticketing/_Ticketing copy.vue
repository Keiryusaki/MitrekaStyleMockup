<template>
  <div class="min-h-screen bg-base-200 text-base-content flex flex-col">
    <!-- NAVBAR SIMPLE -->
    <header class="border-b border-base-300 bg-base-100">
      <div
        class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4"
      >
        <!-- Logo + brand -->
        <div class="flex items-center gap-2">
          <div
            class="h-8 w-8 rounded-full bg-primary text-primary-content flex items-center justify-center text-sm font-bold"
          >
            TF
          </div>
          <span class="text-sm font-semibold">TaskFlow Support</span>
        </div>

        <!-- Menu dummy (optional) -->
        <nav class="hidden md:flex items-center gap-6 text-xs">
          <button class="hover:text-primary transition-colors">Masalah</button>
          <button class="hover:text-primary transition-colors">Fitur</button>
          <button class="hover:text-primary transition-colors">Harga</button>
          <button
            class="text-primary font-medium border-b border-transparent hover:border-primary transition-[border]"
          >
            Hubungi Kami
          </button>
        </nav>

        <!-- Auth button dummy -->
        <div class="hidden sm:flex items-center gap-3 text-xs">
          <button class="hover:text-primary transition-colors">Masuk</button>
          <button class="btn btn-primary btn-xs rounded-full px-4">
            Daftar Gratis
          </button>
        </div>
      </div>
    </header>

    <!-- MAIN CONTENT -->
    <main class="flex-1 flex items-start md:items-center">
      <div class="w-full max-w-6xl mx-auto px-4 py-8 md:py-12">
        <!-- CARD BESAR -->
        <div
          class="card p-0 overflow-hidden rounded-3xl border border-base-300 bg-base-100"
        >
          <div class="grid gap-0 md:grid-cols-2">
            <!-- KIRI: INFO -->
            <section
              class="relative bg-primary text-primary-content px-8 py-8 md:py-10 flex flex-col justify-between"
            >
              <!-- bubble dekorasi -->
              <div
                class="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/40 blur-3xl"
              ></div>
              <div
                class="pointer-events-none absolute bottom-0 -left-10 h-32 w-32 rounded-full bg-primary/30 blur-2xl"
              ></div>

              <div class="relative space-y-4">
                <h1 class="text-2xl md:text-3xl font-semibold">
                  Mari Mengobrol
                </h1>
                <p class="text-sm md:text-[13px] text-primary-content/90">
                  Punya pertanyaan soal aplikasi web yang kami sediakan? Atau
                  ada kendala teknis yang mengganggu pekerjaan tim kamu? Tim
                  support kami (asli manusia, bukan bot) siap bantu.
                </p>

                <div class="inline-flex items-center gap-2 rounded-full bg-primary/30 px-3 py-1 text-[11px] mt-2">
                  <span class="text-lg">🕒</span>
                  <span class="font-medium">
                    Layanan pengaduan 24/7 &mdash; respon sesuai SLA jam kerja
                  </span>
                </div>

                <!-- Info kontak -->
                <div class="mt-6 space-y-4 text-sm">
                  <!-- Kantor -->
                  <div>
                    <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-primary-content/80">
                      Kantor Pusat
                    </p>
                    <div class="mt-1 flex items-start gap-2">
                      <span class="mt-0.5">📍</span>
                      <p class="text-[13px] leading-relaxed">
                        PT. Mitreka Solusi Indonesia<br />
                        Jakarta Selatan, DKI Jakarta<br />
                        Indonesia
                      </p>
                    </div>
                  </div>

                  <!-- Email -->
                  <div>
                    <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-primary-content/80">
                      Email
                    </p>
                    <div class="mt-1 flex items-start gap-2">
                      <span class="mt-0.5">✉️</span>
                      <div class="space-y-0.5 text-[13px]">
                        <p>hello@taskflow.id</p>
                        <p>support@taskflow.id</p>
                      </div>
                    </div>
                  </div>

                  <!-- Telepon -->
                  <div>
                    <p class="text-[11px] uppercase tracking-[0.18em] font-semibold text-primary-content/80">
                      Telepon
                    </p>
                    <div class="mt-1 flex items-start gap-2">
                      <span class="mt-0.5">📞</span>
                      <div class="space-y-0.5 text-[13px]">
                        <p>+62 21 555 1234</p>
                        <p>Mon–Fri, 9am – 5pm WIB</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <!-- KANAN: FORM -->
            <section class="px-8 py-8 md:py-10 flex flex-col h-[600px]"> 
              
              <div v-if="!isChatActive" class="space-y-4 h-full overflow-y-auto pr-2">
                <div class="space-y-1">
                  <h2 class="text-lg md:text-xl font-semibold">
                    Kirim Tiket Pengaduan
                  </h2>
                  <p class="text-xs text-base-content/80">
                    Ceritakan keluhan kamu, sistem akan langsung menghubungkan ke Discord Support.
                  </p>
                </div>

                <form class="space-y-3" @submit.prevent="handleSubmit">
                  <div class="grid gap-3 md:grid-cols-2">
                      <div class="space-y-1">
                        <label class="text-xs font-medium">Nama Lengkap</label>
                        <input v-model="form.name" type="text" class="input input-sm w-full input-bordered" required />
                      </div>
                      <div class="space-y-1">
                        <label class="text-xs font-medium">Email</label>
                        <input v-model="form.contact" type="email" class="input input-sm w-full input-bordered" required />
                      </div>
                   </div>
                   
                   <div class="space-y-1">
                      <label class="text-xs font-medium">Pesan</label>
                      <textarea v-model="form.description" class="textarea textarea-bordered textarea-sm w-full" rows="3" required></textarea>
                   </div>

                   <button type="submit" class="btn btn-primary btn-sm w-full">Mulai Chat Support</button>
                </form>
              </div>

              <div v-else class="flex flex-col h-full relative">
                <div class="border-b pb-3 mb-3 flex justify-between items-center">
                   <div>
                     <h3 class="font-bold text-primary">Live Support</h3>
                     <p class="text-[10px] text-gray-500">Ticket ID: {{ sessionToken.slice(0,8) }}...</p>
                   </div>
                   <div class="badge badge-success badge-xs gap-1">Online</div>
                </div>

                <div id="chat-container" class="flex-1 overflow-y-auto space-y-3 pr-2 scroll-smooth">
                   <div v-for="(msg, idx) in chatMessages" :key="idx" 
                        :class="['chat', msg.isMe ? 'chat-end' : 'chat-start']">
                      <div class="chat-image avatar placeholder">
                        <div class="bg-neutral text-neutral-content rounded-full w-8">
                          <span class="text-xs">{{ msg.sender[0] }}</span>
                        </div>
                      </div>
                      <div :class="['chat-bubble text-sm', msg.isMe ? 'chat-bubble-primary' : 'bg-base-200 text-base-content']">
                        {{ msg.content }}
                      </div>
                   </div>
                </div>

                <div class="mt-4 pt-2 border-t flex gap-2">
                   <input 
                      v-model="currentMessage" 
                      @keyup.enter="sendReply"
                      type="text" 
                      placeholder="Ketik balasan..." 
                      class="input input-sm input-bordered w-full" 
                   />
                   <button @click="sendReply" class="btn btn-sm btn-square btn-primary">
                      ➤
                   </button>
                </div>
              </div>

            </section>
          </div>
        </div>
      </div>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-base-300 bg-base-100">
      <div
        class="max-w-6xl mx-auto px-4 py-3 text-[11px] flex flex-col sm:flex-row items-center justify-between gap-2 text-base-content/70"
      >
        <p>© 2025 PT. Mitreka Solusi Indonesia. All rights reserved.</p>
        <p>Privacy Policy • Terms &amp; Conditions</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { io, type Socket } from "socket.io-client"; // Import socket

// --- STATE ---
const form = reactive({
  name: "",
  contact: "",
  application: "",
  category: "",
  impact: "",
  description: "",
  attachment: null as File | null,
});

// State buat UI Chat
const isChatActive = ref(false);
const chatMessages = ref<{ sender: string; content: string; isMe: boolean }[]>([]);
const currentMessage = ref("");
const sessionToken = ref("");
const socket = ref<Socket | null>(null);
const isTyping = ref(false); // Opsional: visual loading

// --- OPTIONS (Sama kayak punya lo) ---
const applicationOptions = ref([
  { value: "portal-layanan", label: "Portal Layanan" },
  { value: "dashboard-monitoring", label: "Dashboard Monitoring" },
  { value: "modul-ticketing", label: "Modul Ticketing" },
  { value: "lainnya", label: "Lainnya / Custom" },
]);

const categoryOptions = ref([
  { value: "bug", label: "Bug / Error Sistem" },
  { value: "gangguan", label: "Gangguan Layanan" },
  { value: "akses", label: "Permasalahan Akses / Login" },
  { value: "perubahan", label: "Permintaan Perubahan (Change Request)" },
  { value: "lainnya", label: "Lainnya" },
]);

const impactOptions = ref([
  { value: "kritikal", label: "Kritikal – Layanan mati total" },
  { value: "tinggi", label: "Tinggi – Gangguan luas" },
  { value: "sedang", label: "Sedang – Gangguan parsial" },
  { value: "rendah", label: "Rendah – Minor" },
]);

// --- LOGIC SOCKET ---
onMounted(() => {
  // 1. Cek apakah user udah punya sesi sebelumnya?
  const existingToken = localStorage.getItem("chat_token");
  
  // Connect ke Backend Lokal
  socket.value = io("http://localhost:3000");

  if (existingToken) {
    // Resume Session
    sessionToken.value = existingToken;
    isChatActive.value = true;
    socket.value.emit("join_session", existingToken);
    
    // Tambahin history dummy (karena backend simple kita blm simpen history chat detail)
    chatMessages.value.push({
      sender: "System",
      content: "Melanjutkan sesi chat sebelumnya...",
      isMe: false
    });
  }

  // Dengerin balesan dari Admin Discord
  socket.value.on("receive_message", (data: any) => {
    chatMessages.value.push({
      sender: "Support Agent",
      content: data.content,
      isMe: false
    });
    scrollToBottom();
  });
});

// --- ACTIONS ---
function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.attachment = target.files && target.files[0] ? target.files[0] : null;
}

function handleSubmit() {
  if (!socket.value) return;

  // 1. Generate Token
  const newToken = "user-" + new Date().getTime().toString(36);
  localStorage.setItem("chat_token", newToken);
  sessionToken.value = newToken;

  // 🔥 2. WAJIB JOIN ROOM DULU (Ini yang kurang!) 🔥
  socket.value.emit("join_session", newToken); 
  // ^^^ Tambahin baris ini bang!

  // 3. Format Pesan Awal
  const initialMessage = `
**TIKET BARU DARI WEB**
👤 **Nama:** ${form.name}
📧 **Kontak:** ${form.contact}
app: ${form.application} | isu: ${form.category} | impact: ${form.impact}

📝 **Pesan User:**
${form.description}
  `;

  // 4. Kirim Pesan
  socket.value.emit("send_message", {
    token: newToken,
    message: initialMessage
  });

  // 5. Update UI
  chatMessages.value.push({
    sender: "Me",
    content: form.description,
    isMe: true
  });

  isChatActive.value = true;
}
// Kirim Chat Lanjutan (Reply)
function sendReply() {
  if (!currentMessage.value.trim() || !socket.value) return;

  socket.value.emit("send_message", {
    token: sessionToken.value,
    message: currentMessage.value
  });

  chatMessages.value.push({
    sender: "Me",
    content: currentMessage.value,
    isMe: true
  });

  currentMessage.value = "";
  scrollToBottom();
}

// Auto scroll ke bawah kalo ada chat baru
function scrollToBottom() {
  setTimeout(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  }, 100);
}
</script>