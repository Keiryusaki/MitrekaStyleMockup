<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import { Icon } from "@/composables/Icon";
import Tooltip from "@/components/Tooltip.vue";

const tocItems: TOCItem[] = [
  { id: "overview", label: "Overview" },
  { id: "primary-actions", label: "Primary Actions" },
  { id: "secondary-actions", label: "Secondary Actions" },
  { id: "feedback-actions", label: "Feedback Actions" },
  { id: "destructive-actions", label: "Destructive Actions" },
  { id: "neutral-actions", label: "Neutral Actions" },
  { id: "button-hierarchy", label: "Button Hierarchy" },
  { id: "dont", label: "Yang Harus Dihindari" },
];

const usageRules = [
  {
    id: "primary-actions",
    title: "Primary Actions",
    description: "Aksi utama yang diharapkan user melakukan. Satu halaman idealnya hanya punya 1 primary action.",
    variant: "btn-primary",
    actions: ["Simpan", "Submit", "Buat Baru", "Kirim", "Login", "Daftar"],
    example: `<button class="btn btn-primary">Simpan</button>
<button class="btn btn-primary">Submit</button>
<button class="btn btn-primary">Buat Baru</button>`,
  },
  {
    id: "secondary-actions",
    title: "Secondary Actions", 
    description: "Aksi pendukung yang tidak sepenting primary action. Biasanya di samping primary button.",
    variant: "btn-secondary",
    actions: ["Export", "Download", "Import", "Cetak", "Bagikan"],
    example: `<button class="btn btn-secondary">Export</button>
<button class="btn btn-secondary">Download PDF</button>`,
  },
  {
    id: "accent-actions",
    title: "Highlight / CTA",
    description: "Untuk menarik perhatian user ke fitur premium atau promosi. Gunakan dengan hemat.",
    variant: "btn-accent",
    actions: ["Upgrade Pro", "Coba Gratis", "Promo Spesial", "Langganan"],
    example: `<button class="btn btn-accent">Upgrade Pro</button>
<button class="btn btn-accent">Coba 14 Hari Gratis</button>`,
  },
  {
    id: "feedback-actions",
    title: "Feedback Actions",
    description: "Aksi yang memberikan informasi atau feedback ke user.",
    items: [
      {
        variant: "btn-info",
        label: "Info / View",
        description: "Untuk melihat detail, preview, atau informasi tambahan.",
        actions: ["Lihat Detail", "Preview", "Info", "Selengkapnya"],
      },
      {
        variant: "btn-success", 
        label: "Success / Confirm",
        description: "Untuk konfirmasi positif, approval, atau aksi yang sudah berhasil.",
        actions: ["Setujui", "Approve", "Verifikasi", "Konfirmasi", "Selesai"],
      },
      {
        variant: "btn-warning",
        label: "Warning / Caution",
        description: "Untuk aksi yang perlu perhatian extra tapi tidak destructive.",
        actions: ["Arsipkan", "Suspend", "Nonaktifkan", "Pending"],
      },
    ],
  },
  {
    id: "destructive-actions",
    title: "Destructive Actions",
    description: "Aksi berbahaya yang tidak bisa di-undo. Selalu tampilkan konfirmasi sebelum eksekusi.",
    variant: "btn-error",
    actions: ["Hapus", "Delete", "Remove", "Tolak", "Reject", "Batalkan Pesanan"],
    example: `<button class="btn btn-error">Hapus</button>
<button class="btn btn-error">Tolak</button>`,
    warning: "Selalu tampilkan dialog konfirmasi sebelum aksi destructive dijalankan!",
  },
  {
    id: "neutral-actions",
    title: "Neutral Actions",
    description: "Aksi netral yang tidak memerlukan penekanan visual.",
    items: [
      {
        variant: "btn-ghost",
        label: "Ghost",
        description: "Untuk cancel, dismiss, atau aksi yang tidak perlu menonjol.",
        actions: ["Batal", "Tutup", "Lewati", "Nanti Saja"],
      },
      {
        variant: "btn-outline",
        label: "Outline",
        description: "Alternatif dari solid button, untuk aksi yang less prominent.",
        actions: ["Edit", "Reset", "Refresh", "Filter"],
      },
    ],
  },
];
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Guides"
      title="Button Usage Guide"
      description="Standarisasi semantic usage button untuk konsistensi UX di seluruh aplikasi."
    />

    <!-- Overview -->
    <section id="overview" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Overview</h2>
      <p class="text-sm opacity-80">
        Pemilihan warna button yang tepat membantu user memahami konteks aksi dengan cepat. 
        Dokumen ini menjadi panduan standar agar semua developer menggunakan button secara konsisten.
      </p>
      
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Action Type</th>
              <th class="px-4 py-2 text-left">Button Variant</th>
              <th class="px-4 py-2 text-left">Contoh Penggunaan</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2 font-medium">Submit / Save</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-primary</code></td>
              <td class="px-4 py-2 opacity-70">Simpan, Submit, Kirim, Login</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Cancel / Back / Secondary</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-secondary</code></td>
              <td class="px-4 py-2 opacity-70">Batal, Tutup, Kembali, Reset, Export</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Highlight / CTA</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-accent</code></td>
              <td class="px-4 py-2 opacity-70">Upgrade, Promo, Langganan</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">View / Detail</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-info</code></td>
              <td class="px-4 py-2 opacity-70">Lihat Detail, Preview, Info</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Create / Approve / Confirm</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-success</code></td>
              <td class="px-4 py-2 opacity-70">Buat Baru, Tambah, Setujui, Approve</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Edit / Caution / Archive</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-warning</code></td>
              <td class="px-4 py-2 opacity-70">Edit, Ubah, Arsipkan, Suspend</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Delete / Danger</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-error</code></td>
              <td class="px-4 py-2 opacity-70">Hapus, Remove, Tolak, Reject</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Dismiss / Skip</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-ghost</code></td>
              <td class="px-4 py-2 opacity-70">Lewati, Nanti Saja, Skip</td>
            </tr>
            <tr>
              <td class="px-4 py-2 font-medium">Alternative Action</td>
              <td class="px-4 py-2"><code class="text-xs bg-base-200 px-1.5 py-0.5 rounded">btn-outline-*</code></td>
              <td class="px-4 py-2 opacity-70">Edit, Filter, Refresh</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Primary Actions -->
    <section id="primary-actions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Primary Actions</h2>
      <p class="text-sm opacity-80">
        Aksi utama untuk <strong>menyimpan/submit data</strong>. Satu halaman idealnya hanya punya 1 primary action 
        untuk menghindari kebingungan.
      </p>
      
      <div class="bg-base-200 rounded-box p-6">
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-primary">Simpan</button>
          <button class="btn btn-primary">Submit</button>
          <button class="btn btn-primary">Kirim</button>
          <button class="btn btn-primary">Login</button>
          <button class="btn btn-primary">Daftar</button>
        </div>
      </div>

      <div class="flex items-start gap-2 p-3 bg-info/10 border border-info/20 rounded-lg text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-info shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>
        </svg>
        <span class="opacity-80">
          <strong>Note:</strong> "Buat Baru" tidak termasuk primary karena hanya membuka form, belum submit. 
          Gunakan <code class="bg-base-200 px-1 rounded">btn-success</code> untuk Create/Tambah.
        </span>
      </div>
    </section>

    <!-- Secondary Actions -->
    <section id="secondary-actions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Secondary Actions</h2>
      <p class="text-sm opacity-80">
        Aksi pendukung atau navigasi mundur. Tetap memiliki shape button yang jelas supaya user tahu ini adalah tombol.
      </p>
      
      <div class="bg-base-200 rounded-box p-6 space-y-4">
        <!-- Cancel/Back group -->
        <div>
          <p class="text-xs opacity-60 mb-2">Cancel / Back / Navigation:</p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-secondary">Batal</button>
            <button class="btn btn-secondary">Tutup</button>
            <button class="btn btn-secondary">Kembali</button>
            <button class="btn btn-secondary">Back</button>
            <button class="btn btn-secondary">Reset</button>
          </div>
        </div>

        <!-- Export/Download group -->
        <div class="border-t border-base-300 pt-4">
          <p class="text-xs opacity-60 mb-2">Export / Download:</p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-secondary">Export</button>
            <button class="btn btn-secondary">Download PDF</button>
            <button class="btn btn-secondary">Import Data</button>
            <button class="btn btn-secondary">Cetak</button>
          </div>
        </div>

        <!-- Accent/CTA group -->
        <div class="border-t border-base-300 pt-4">
          <p class="text-xs opacity-60 mb-2">Highlight / CTA (gunakan dengan hemat):</p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-accent">Upgrade Pro</button>
            <button class="btn btn-accent">Coba 14 Hari Gratis</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Feedback Actions -->
    <section id="feedback-actions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Feedback Actions</h2>
      <p class="text-sm opacity-80">
        Aksi yang memberikan feedback atau mengkomunikasikan status ke user.
      </p>
      
      <div class="bg-base-200 rounded-box p-6 space-y-6">
        <!-- Info -->
        <div>
          <p class="text-sm font-medium mb-2">Info / View <span class="opacity-50 font-normal">— untuk detail & informasi</span></p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-info">Lihat Detail</button>
            <button class="btn btn-info">Preview</button>
            <button class="btn btn-info">Info</button>
            <button class="btn btn-info">Selengkapnya</button>
          </div>
        </div>

        <!-- Success -->
        <div>
          <p class="text-sm font-medium mb-2">Create / Success / Confirm <span class="opacity-50 font-normal">— untuk membuat baru, approval & konfirmasi positif</span></p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-success">Buat Baru</button>
            <button class="btn btn-success">Tambah</button>
            <button class="btn btn-success">Setujui</button>
            <button class="btn btn-success">Approve</button>
            <button class="btn btn-success">Verifikasi</button>
          </div>
        </div>

        <!-- Warning -->
        <div>
          <p class="text-sm font-medium mb-2">Edit / Warning / Caution <span class="opacity-50 font-normal">— untuk edit data atau aksi yang perlu perhatian</span></p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-warning">Edit</button>
            <button class="btn btn-warning">Ubah</button>
            <button class="btn btn-warning">Arsipkan</button>
            <button class="btn btn-warning">Suspend</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Destructive Actions -->
    <section id="destructive-actions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Destructive Actions</h2>
      <p class="text-sm opacity-80">
        Aksi berbahaya yang biasanya tidak bisa di-undo. Warna merah memberi sinyal "hati-hati" ke user.
      </p>
      
      <div class="bg-base-200 rounded-box p-6">
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-error">Hapus</button>
          <button class="btn btn-error">Delete</button>
          <button class="btn btn-error">Remove</button>
          <button class="btn btn-error">Tolak</button>
          <button class="btn btn-error">Reject</button>
        </div>
      </div>

      <div class="flex items-start gap-2 p-3 bg-error/10 border border-error/20 rounded-lg text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-error shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/>
        </svg>
        <span class="opacity-80">
          <strong>Wajib:</strong> Selalu tampilkan dialog konfirmasi sebelum aksi destructive dijalankan! 
          User harus sadar konsekuensi dari aksinya.
        </span>
      </div>

      <div class="bg-base-200 rounded-box p-4">
        <p class="text-xs opacity-60 mb-3">Contoh konfirmasi sebelum delete:</p>
        <div class="card bg-base-100 p-4 max-w-sm">
          <p class="font-medium mb-1">Hapus Item?</p>
          <p class="text-sm opacity-70 mb-4">Aksi ini tidak dapat dibatalkan. Data akan dihapus permanen.</p>
          <div class="flex gap-2 justify-end">
            <button class="btn btn-secondary btn-sm">Batal</button>
            <button class="btn btn-error btn-sm">Ya, Hapus</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Neutral Actions -->
    <section id="neutral-actions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Neutral Actions</h2>
      <p class="text-sm opacity-80">
        Aksi netral yang tidak memerlukan penekanan visual khusus.
      </p>
      
      <div class="bg-base-200 rounded-box p-6 space-y-6">
        <!-- Ghost -->
        <div>
          <p class="text-sm font-medium mb-2">Ghost <span class="opacity-50 font-normal">— untuk dismiss, skip, aksi yang sangat minor</span></p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-ghost">Lewati</button>
            <button class="btn btn-ghost">Skip</button>
            <button class="btn btn-ghost">Nanti Saja</button>
            <button class="btn btn-ghost">Abaikan</button>
          </div>
          <p class="text-xs opacity-60 mt-2">
            Catatan: Untuk Cancel/Batal/Tutup, gunakan <code class="bg-base-300 px-1 rounded">btn-secondary</code> agar shape tombol tetap terlihat.
          </p>
        </div>

        <!-- Outline -->
        <div>
          <p class="text-sm font-medium mb-2">Outline <span class="opacity-50 font-normal">— alternatif less prominent</span></p>
          <div class="flex flex-wrap gap-3">
            <button class="btn btn-outline">Filter</button>
            <button class="btn btn-outline">Refresh</button>
            <button class="btn btn-outline">Selengkapnya</button>
            <button class="btn btn-outline-primary">Lihat Semua</button>
          </div>
        </div>
      </div>
    </section>

    <!-- Button Hierarchy -->
    <section id="button-hierarchy" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Button Hierarchy</h2>
      <p class="text-sm opacity-80">
        Dalam satu area/form, susun button berdasarkan hierarki kepentingan.
      </p>
      
      <div class="space-y-4">
        <div class="bg-base-200 rounded-box p-6">
          <p class="text-xs opacity-60 mb-3">Contoh: Form dengan Primary + Cancel</p>
          <div class="flex gap-2">
            <button class="btn btn-primary">Simpan</button>
            <button class="btn btn-secondary">Batal</button>
          </div>
        </div>

        <div class="bg-base-200 rounded-box p-6">
          <p class="text-xs opacity-60 mb-3">Contoh: Multiple actions dengan hierarki</p>
          <div class="flex gap-2">
            <button class="btn btn-primary">Submit</button>
            <button class="btn btn-outline">Simpan Draft</button>
            <button class="btn btn-secondary">Batal</button>
          </div>
        </div>

        <div class="bg-base-200 rounded-box p-6">
          <p class="text-xs opacity-60 mb-3">Contoh: Approval flow</p>
          <div class="flex gap-2">
            <button class="btn btn-success">Approve</button>
            <button class="btn btn-error">Reject</button>
            <button class="btn btn-secondary">Tunda</button>
          </div>
        </div>

        <div class="bg-base-200 rounded-box p-6">
          <p class="text-xs opacity-60 mb-3">Contoh: Table row actions (dengan Tooltip)</p>
          <div class="flex gap-1">
            <Tooltip text="Tambah User">
              <button class="btn btn-success btn-sm">
                <Icon name="plus" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Edit User">
              <button class="btn btn-warning btn-sm">
                <Icon name="pencil" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Lihat Detail">
              <button class="btn btn-info btn-sm">
                <Icon name="eye" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Hapus User">
              <button class="btn btn-error btn-sm">
                <Icon name="trash" class="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>
    </section>

    <!-- Don't -->
    <section id="dont" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Yang Harus Dihindari</h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div class="card bg-error/10 border border-error/20 p-4 space-y-3">
          <p class="font-medium text-error flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Jangan
          </p>
          <div class="flex gap-2">
            <button class="btn btn-primary">Simpan</button>
            <button class="btn btn-primary">Export</button>
            <button class="btn btn-primary">Reset</button>
          </div>
          <p class="text-xs opacity-70">Terlalu banyak primary button membingungkan user</p>
        </div>

        <div class="card bg-success/10 border border-success/20 p-4 space-y-3">
          <p class="font-medium text-success flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Lakukan
          </p>
          <div class="flex gap-2">
            <button class="btn btn-primary">Simpan</button>
            <button class="btn btn-secondary">Export</button>
            <button class="btn btn-secondary">Reset</button>
          </div>
          <p class="text-xs opacity-70">Hierarki jelas, satu primary action</p>
        </div>

        <div class="card bg-error/10 border border-error/20 p-4 space-y-3">
          <p class="font-medium text-error flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Jangan
          </p>
          <div class="flex gap-2">
            <button class="btn btn-success">Hapus</button>
          </div>
          <p class="text-xs opacity-70">Warna tidak sesuai konteks aksi</p>
        </div>

        <div class="card bg-success/10 border border-success/20 p-4 space-y-3">
          <p class="font-medium text-success flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Lakukan
          </p>
          <div class="flex gap-2">
            <button class="btn btn-error">Hapus</button>
          </div>
          <p class="text-xs opacity-70">Warna merah = aksi berbahaya</p>
        </div>

        <div class="card bg-error/10 border border-error/20 p-4 space-y-3">
          <p class="font-medium text-error flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Jangan
          </p>
          <div class="flex gap-2">
            <button class="btn btn-ghost">Simpan</button>
            <button class="btn btn-primary">Batal</button>
          </div>
          <p class="text-xs opacity-70">Primary action untuk cancel tidak masuk akal</p>
        </div>

        <div class="card bg-success/10 border border-success/20 p-4 space-y-3">
          <p class="font-medium text-success flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Lakukan
          </p>
          <div class="flex gap-2">
            <button class="btn btn-primary">Simpan</button>
            <button class="btn btn-secondary">Batal</button>
          </div>
          <p class="text-xs opacity-70">Primary untuk aksi utama, secondary untuk cancel</p>
        </div>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
  </div>
</template>
