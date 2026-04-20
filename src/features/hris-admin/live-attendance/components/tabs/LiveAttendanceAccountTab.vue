<template>
  <section class="-mx-3 min-h-full bg-white pb-24">
    <header class="sticky top-0 z-20 flex h-[56px] items-center bg-[#004b8d] px-3 text-white shadow-[0_8px_16px_-12px_rgba(0,75,141,0.8)]">
      <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="$emit('navigateHome')">
        <Icon name="arrow-left" class="h-5 w-5" />
      </button>
      <h2 class="flex-1 text-center text-[16px] font-black">Pengaturan</h2>
      <span class="w-8"></span>
    </header>

    <div class="space-y-4 px-3 pt-3">
      <section>
        <p class="px-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Profile</p>
        <article class="mt-2 overflow-hidden rounded-2xl border border-[#004b8d]/10 bg-white shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <button class="account-row-btn">
            <span class="account-row-icon bg-[#004b8d]/10 text-[#004b8d]"><Icon name="user" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Profil Karyawan</span>
              <span class="account-row-subtitle">Data utama karyawan dan informasi jabatan</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
          <button class="account-row-btn">
            <span class="account-row-icon bg-slate-100 text-slate-500"><Icon name="users" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Kontak Darurat</span>
              <span class="account-row-subtitle">Pengaturan kontak keluarga atau kerabat</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
        </article>
      </section>

      <section>
        <p class="px-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Akun</p>
        <article class="mt-2 overflow-hidden rounded-2xl border border-[#004b8d]/10 bg-white shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <button class="account-row-btn">
            <span class="account-row-icon bg-emerald-50 text-emerald-600"><Icon name="settings" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Face Enrollment Ulang</span>
              <span class="account-row-subtitle">Perbarui data biometrik untuk verifikasi</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
          <button class="account-row-btn">
            <span class="account-row-icon bg-amber-50 text-amber-600"><Icon name="bell" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Preferensi Notifikasi</span>
              <span class="account-row-subtitle">Atur pengingat attendance dan approval</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
        </article>
      </section>

      <section>
        <p class="px-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Security</p>
        <article class="mt-2 overflow-hidden rounded-2xl border border-[#004b8d]/10 bg-white shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <button class="account-row-btn">
            <span class="account-row-icon bg-sky-50 text-sky-600"><Icon name="map-pin" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Izin Lokasi & Kamera</span>
              <span class="account-row-subtitle">Kelola permission yang dipakai presensi</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
          <button class="account-row-btn">
            <span class="account-row-icon bg-violet-50 text-violet-600"><Icon name="clock" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Aktivitas Login</span>
              <span class="account-row-subtitle">Riwayat akses akun dan sesi perangkat</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
        </article>
      </section>

      <section>
        <p class="px-1 text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">Support</p>
        <article class="mt-2 overflow-hidden rounded-2xl border border-[#004b8d]/10 bg-white shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <button class="account-row-btn">
            <span class="account-row-icon bg-slate-100 text-slate-500"><Icon name="fileText" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Pusat Bantuan</span>
              <span class="account-row-subtitle">Dokumentasi dan panduan penggunaan</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
          <button class="account-row-btn">
            <span class="account-row-icon bg-rose-50 text-rose-600"><Icon name="clipboard" class="h-4 w-4" /></span>
            <span class="account-row-copy">
              <span class="account-row-title">Privasi & Ketentuan</span>
              <span class="account-row-subtitle">Kebijakan data dan syarat layanan</span>
            </span>
            <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
          </button>
        </article>
      </section>

      <button
        class="mt-2 flex w-full items-center justify-center rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2.5 text-[12px] font-black text-rose-700 transition hover:bg-rose-100"
        @click="$emit('logout')"
      >
        Logout
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@/composables/Icon";

defineEmits<{
  navigateHome: [];
  logout: [];
}>();
</script>

<style scoped>
.account-row-btn {
  display: flex;
  width: 100%;
  align-items: center;
  gap: 0.7rem;
  border-bottom: 1px solid rgb(241 245 249);
  padding: 0.72rem 0.86rem;
  text-align: left;
  transition: background-color 0.15s ease;
}

.account-row-btn:last-child {
  border-bottom: 0;
}

.account-row-btn:hover {
  background: rgb(248 250 252);
}

.account-row-icon {
  display: inline-flex;
  height: 1.9rem;
  width: 1.9rem;
  flex: 0 0 auto;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;
}

.account-row-copy {
  display: flex;
  min-width: 0;
  flex: 1 1 auto;
  flex-direction: column;
}

.account-row-title {
  font-size: 12px;
  font-weight: 800;
  color: rgb(30 41 59);
}

.account-row-subtitle {
  margin-top: 1px;
  font-size: 10px;
  font-weight: 700;
  color: rgb(100 116 139);
}
</style>
