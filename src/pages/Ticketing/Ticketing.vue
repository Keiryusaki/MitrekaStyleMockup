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
            <section class="px-8 py-8 md:py-10 space-y-4">
              <div class="space-y-1">
                <h2 class="text-lg md:text-xl font-semibold">
                  Kirim Tiket Pengaduan
                </h2>
                <p class="text-xs text-base-content/80">
                  Ceritakan keluhan atau kebutuhan tim kamu. Kami akan kirim
                  nomor tiket dan update progres ke email yang kamu gunakan.
                </p>
              </div>

              <form class="space-y-3" @submit.prevent="handleSubmit">
                <!-- Nama & Email -->
                <div class="grid gap-3 md:grid-cols-2">
                  <div class="space-y-1">
                    <label class="text-xs font-medium">
                      Nama Lengkap <span class="text-error">*</span>
                    </label>
                    <input
                      v-model="form.name"
                      type="text"
                      class="input input-sm"
                      placeholder="Budi Santoso"
                      required
                    />
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-medium">
                      Email Bisnis <span class="text-error">*</span>
                    </label>
                    <input
                      v-model="form.contact"
                      type="email"
                      class="input input-sm"
                      placeholder="budi@company.com"
                      required
                    />
                  </div>
                </div>

                <!-- Aplikasi & Jenis Pengaduan -->
                <div class="grid gap-3 md:grid-cols-2">
                  <div class="space-y-1">
                    <label class="text-xs font-medium">
                      Aplikasi / Produk <span class="text-error">*</span>
                    </label>
                    <select
                      v-model="form.application"
                      class="select select-sm w-full"
                      required
                    >
                      <option value="" disabled>Pilih aplikasi</option>
                      <option
                        v-for="app in applicationOptions"
                        :key="app.value"
                        :value="app.value"
                      >
                        {{ app.label }}
                      </option>
                    </select>
                  </div>
                  <div class="space-y-1">
                    <label class="text-xs font-medium">
                      Jenis Pengaduan <span class="text-error">*</span>
                    </label>
                    <select
                      v-model="form.category"
                      class="select select-sm w-full"
                      required
                    >
                      <option value="" disabled>Pilih jenis pengaduan</option>
                      <option
                        v-for="cat in categoryOptions"
                        :key="cat.value"
                        :value="cat.value"
                      >
                        {{ cat.label }}
                      </option>
                    </select>
                  </div>
                </div>

                <!-- Dampak -->
                <div class="space-y-1">
                  <label class="text-xs font-medium">
                    Dampak ke Layanan <span class="text-error">*</span>
                  </label>
                  <select
                    v-model="form.impact"
                    class="select select-sm w-full"
                    required
                  >
                    <option value="" disabled>Pilih tingkat dampak</option>
                    <option
                      v-for="impact in impactOptions"
                      :key="impact.value"
                      :value="impact.value"
                    >
                      {{ impact.label }}
                    </option>
                  </select>
                </div>

                <!-- Pesan -->
                <div class="space-y-1">
                  <label class="text-xs font-medium">
                    Pesan <span class="text-error">*</span>
                  </label>
                  <textarea
                    v-model="form.description"
                    rows="4"
                    class="input input-sm !h-auto py-2 resize-y"
                    placeholder="Ceritain kebutuhan atau kendala tim kamu di sini…"
                    required
                  ></textarea>
                </div>

                <!-- Lampiran -->
                <div class="space-y-1">
                  <label class="text-xs font-medium">
                    Lampiran (opsional)
                  </label>
                  <input
                    type="file"
                    class="input input-sm w-full text-[11px]
         file:mr-3 file:rounded-md file:border-0
         file:bg-primary file:px-3 file:py-1.5
         file:text-[11px] file:font-medium file:text-primary-content
         hover:file:bg-primary/90"
  @change="handleFileChange"
                  />
                  <p class="form-hint text-[10px] text-base-content/70">
                    Boleh screenshot error atau dokumen pendukung (.jpg, .png, .pdf).
                  </p>
                </div>

                <!-- Tombol -->
                <div class="pt-2 space-y-2">
                  <button
                    type="submit"
                    class="btn btn-error btn-sm w-full md:w-auto px-10"
                    :disabled="submitting"
                  >
                    <span v-if="!submitting">Kirim Pesan</span>
                    <span
                      v-else
                      class="flex items-center justify-center gap-2"
                    >
                      <span
                        class="h-3 w-3 animate-spin rounded-full border-[2px] border-base-200 border-t-transparent"
                      ></span>
                      Mengirim...
                    </span>
                  </button>

                  <p class="text-[10px] text-base-content/70">
                    Dengan mengirimkan pesan ini, Anda setuju dengan SLA &amp;
                    kebijakan privasi layanan TaskFlow.
                  </p>
                </div>

                <!-- Alert sukses -->
                <div
                  v-if="lastTicketId"
                  class="alert alert-success mt-2"
                >
                  <div class="mt-0.5 text-lg">✅</div>
                  <div>
                    <p class="alert-title text-sm">
                      Tiket berhasil dikirim
                    </p>
                    <p class="alert-desc text-xs">
                      Nomor tiket Anda:
                      <span class="font-mono font-semibold">
                        {{ lastTicketId }}
                      </span>.
                      Simpan nomor ini untuk referensi saat follow up dengan
                      tim support.
                    </p>
                  </div>
                </div>
              </form>
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
import { reactive, ref } from "vue";

const form = reactive({
  name: "",
  contact: "",
  application: "",
  category: "",
  impact: "",
  description: "",
  attachment: null as File | null,
});

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
  {
    value: "kritikal",
    label: "Kritikal – layanan tidak bisa digunakan sama sekali",
  },
  {
    value: "tinggi",
    label: "Tinggi – mengganggu banyak pengguna",
  },
  {
    value: "sedang",
    label: "Sedang – mengganggu sebagian pengguna / fitur tertentu",
  },
  {
    value: "rendah",
    label: "Rendah – tidak menghambat operasional utama",
  },
]);

const submitting = ref(false);
const lastTicketId = ref<string | null>(null);

function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  form.attachment = target.files && target.files[0] ? target.files[0] : null;
}

function handleSubmit() {
  if (submitting.value) return;
  submitting.value = true;

  // TODO: ganti ke call API Express lo (FormData, dsb.)
  setTimeout(() => {
    const ticketCode =
      "TCK-" + new Date().getTime().toString(36).toUpperCase();
    lastTicketId.value = ticketCode;

    // reset ringan, nama & email dipertahankan biar user ga capek isi lagi
    form.application = "";
    form.category = "";
    form.impact = "";
    form.description = "";
    form.attachment = null;

    submitting.value = false;
  }, 800);
}
</script>
