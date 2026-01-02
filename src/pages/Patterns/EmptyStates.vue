<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";

const codes = {
  basic: `<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Tidak ada data</h3>
  <p class="text-sm opacity-60 mb-4">Belum ada item yang tersedia saat ini.</p>
  <button class="btn btn-primary btn-sm">Tambah Item</button>
</div>`,
  search: `<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="11" cy="11" r="8"/>
    <path d="m21 21-4.3-4.3"/>
    <path d="M8 11h6"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Tidak ditemukan</h3>
  <p class="text-sm opacity-60 mb-4">Pencarian "keyword" tidak menemukan hasil.</p>
  <button class="btn btn-secondary btn-sm">Reset Pencarian</button>
</div>`,
  noAccess: `<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-warning/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Akses Terbatas</h3>
  <p class="text-sm opacity-60 mb-4">Anda tidak memiliki izin untuk melihat konten ini.</p>
  <button class="btn btn-warning btn-sm">Minta Akses</button>
</div>`,
  error: `<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-error/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="m15 9-6 6M9 9l6 6"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Gagal Memuat</h3>
  <p class="text-sm opacity-60 mb-4">Terjadi kesalahan saat mengambil data.</p>
  <div class="flex gap-2">
    <button class="btn btn-error btn-sm">Coba Lagi</button>
    <button class="btn btn-secondary btn-sm">Kembali</button>
  </div>
</div>`,
  success: `<div class="flex flex-col items-center justify-center py-12 text-center">
  <svg class="w-16 h-16 text-success/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="m9 12 2 2 4-4"/>
  </svg>
  <h3 class="font-semibold text-lg mb-1">Selesai!</h3>
  <p class="text-sm opacity-60 mb-4">Semua tugas telah diselesaikan.</p>
  <button class="btn btn-success btn-sm">Lihat Riwayat</button>
</div>`,
  firstTime: `<div class="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
  <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
    <svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
    </svg>
  </div>
  <h3 class="font-semibold text-xl mb-2">Selamat Datang!</h3>
  <p class="text-sm opacity-60 mb-6">
    Ini adalah pertama kalinya Anda menggunakan fitur ini. 
    Mari mulai dengan membuat item pertama Anda.
  </p>
  <button class="btn btn-primary">Mulai Sekarang</button>
</div>`,
};

const activeTab = ref("basic");
const tabs = [
  { id: "basic", label: "Basic" },
  { id: "search", label: "No Results" },
  { id: "noAccess", label: "No Access" },
  { id: "error", label: "Error" },
  { id: "success", label: "Complete" },
  { id: "firstTime", label: "First Time" },
];
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      title="Empty States"
      description="Pattern untuk menampilkan state kosong, error, atau kondisi khusus lainnya."
      category="Patterns"
    />

    <!-- Guidelines -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold mb-4">Guidelines</h2>
      <div class="grid md:grid-cols-2 gap-6">
        <div>
          <h3 class="font-medium text-success mb-2">✓ Do</h3>
          <ul class="text-sm space-y-1 opacity-80">
            <li>• Gunakan ilustrasi atau ikon yang relevan</li>
            <li>• Berikan pesan yang jelas dan actionable</li>
            <li>• Sediakan tombol aksi yang sesuai konteks</li>
            <li>• Gunakan warna yang sesuai dengan kondisi</li>
          </ul>
        </div>
        <div>
          <h3 class="font-medium text-error mb-2">✗ Don't</h3>
          <ul class="text-sm space-y-1 opacity-80">
            <li>• Jangan biarkan area kosong tanpa penjelasan</li>
            <li>• Jangan gunakan pesan teknis/error code</li>
            <li>• Jangan berikan terlalu banyak opsi</li>
            <li>• Jangan menyalahkan user</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Variants -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold mb-4">Variants</h2>
      
      <!-- Tabs -->
      <div class="tabs tabs-boxed mb-6 inline-flex">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="tab"
          :class="{ 'tab-active': activeTab === tab.id }"
          @click="activeTab = tab.id"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Preview -->
      <div class="border border-base-300 rounded-lg mb-4 bg-base-200/30">
        <!-- Basic -->
        <div v-if="activeTab === 'basic'" class="flex flex-col items-center justify-center py-12 text-center">
          <svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M20 13V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7m16 0v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5m16 0h-2.586a1 1 0 0 0-.707.293l-2.414 2.414a1 1 0 0 1-.707.293h-3.172a1 1 0 0 1-.707-.293l-2.414-2.414A1 1 0 0 0 6.586 13H4"/>
          </svg>
          <h3 class="font-semibold text-lg mb-1">Tidak ada data</h3>
          <p class="text-sm opacity-60 mb-4">Belum ada item yang tersedia saat ini.</p>
          <button class="btn btn-success btn-sm">Tambah Item</button>
        </div>

        <!-- Search No Results -->
        <div v-else-if="activeTab === 'search'" class="flex flex-col items-center justify-center py-12 text-center">
          <svg class="w-16 h-16 text-base-content/20 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
            <path d="M8 11h6"/>
          </svg>
          <h3 class="font-semibold text-lg mb-1">Tidak ditemukan</h3>
          <p class="text-sm opacity-60 mb-4">Pencarian "keyword" tidak menemukan hasil.</p>
          <button class="btn btn-secondary btn-sm">Reset Pencarian</button>
        </div>

        <!-- No Access -->
        <div v-else-if="activeTab === 'noAccess'" class="flex flex-col items-center justify-center py-12 text-center">
          <svg class="w-16 h-16 text-warning/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          <h3 class="font-semibold text-lg mb-1">Akses Terbatas</h3>
          <p class="text-sm opacity-60 mb-4">Anda tidak memiliki izin untuk melihat konten ini.</p>
          <button class="btn btn-warning btn-sm">Minta Akses</button>
        </div>

        <!-- Error -->
        <div v-else-if="activeTab === 'error'" class="flex flex-col items-center justify-center py-12 text-center">
          <svg class="w-16 h-16 text-error/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="m15 9-6 6M9 9l6 6"/>
          </svg>
          <h3 class="font-semibold text-lg mb-1">Gagal Memuat</h3>
          <p class="text-sm opacity-60 mb-4">Terjadi kesalahan saat mengambil data.</p>
          <div class="flex gap-2">
            <button class="btn btn-primary btn-sm">Coba Lagi</button>
            <button class="btn btn-secondary btn-sm">Kembali</button>
          </div>
        </div>

        <!-- Success/Complete -->
        <div v-else-if="activeTab === 'success'" class="flex flex-col items-center justify-center py-12 text-center">
          <svg class="w-16 h-16 text-success/60 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10"/>
            <path d="m9 12 2 2 4-4"/>
          </svg>
          <h3 class="font-semibold text-lg mb-1">Selesai!</h3>
          <p class="text-sm opacity-60 mb-4">Semua tugas telah diselesaikan.</p>
          <button class="btn btn-info btn-sm">Lihat Riwayat</button>
        </div>

        <!-- First Time -->
        <div v-else-if="activeTab === 'firstTime'" class="flex flex-col items-center justify-center py-12 text-center max-w-md mx-auto">
          <div class="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <svg class="w-10 h-10 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/>
            </svg>
          </div>
          <h3 class="font-semibold text-xl mb-2">Selamat Datang!</h3>
          <p class="text-sm opacity-60 mb-6">
            Ini adalah pertama kalinya Anda menggunakan fitur ini. 
            Mari mulai dengan membuat item pertama Anda.
          </p>
          <button class="btn btn-primary">Mulai Sekarang</button>
        </div>
      </div>

      <!-- Code -->
      <details class="rounded-box border border-base-300 p-3">
        <summary class="cursor-pointer text-sm font-medium">Lihat Kode</summary>
        <pre class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"><code>{{ codes[activeTab as keyof typeof codes] }}</code></pre>
      </details>
    </div>

    <!-- Use Cases -->
    <div class="card p-6">
      <h2 class="text-lg font-semibold mb-4">Kapan Menggunakan</h2>
      <div class="overflow-x-auto">
        <table class="table min-w-full">
          <thead class="bg-base-200">
            <tr>
              <th>Variant</th>
              <th>Gunakan Ketika</th>
              <th>Warna Icon</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="font-medium">Basic</td>
              <td>Data kosong, belum ada item</td>
              <td><span class="badge badge-ghost">Neutral</span></td>
            </tr>
            <tr>
              <td class="font-medium">No Results</td>
              <td>Pencarian/filter tidak menemukan hasil</td>
              <td><span class="badge badge-ghost">Neutral</span></td>
            </tr>
            <tr>
              <td class="font-medium">No Access</td>
              <td>User tidak punya permission</td>
              <td><span class="badge badge-warning">Warning</span></td>
            </tr>
            <tr>
              <td class="font-medium">Error</td>
              <td>Gagal load data, network error</td>
              <td><span class="badge badge-error">Error</span></td>
            </tr>
            <tr>
              <td class="font-medium">Complete</td>
              <td>Semua task selesai, inbox kosong</td>
              <td><span class="badge badge-success">Success</span></td>
            </tr>
            <tr>
              <td class="font-medium">First Time</td>
              <td>Onboarding, user baru pertama kali</td>
              <td><span class="badge badge-primary">Primary</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
