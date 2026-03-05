<template>
  <section class="space-y-4 pb-24">
    <div class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
      <p class="text-[11px] font-black uppercase tracking-wider text-slate-400">Inbox</p>
      <div class="mt-2 divide-y divide-slate-100">
        <button class="flex w-full items-start justify-between py-2.5 text-left">
          <div>
            <p class="text-[12px] font-black text-slate-700">Approval Izin Menunggu</p>
            <p class="text-[10px] font-bold text-slate-500">Pengajuan izin 26 Feb 2026 perlu verifikasi atasan.</p>
          </div>
          <span class="mt-0.5 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-700">Baru</span>
        </button>
        <button class="flex w-full items-start justify-between py-2.5 text-left">
          <div>
            <p class="text-[12px] font-black text-slate-700">Pengumuman Office</p>
            <p class="text-[10px] font-bold text-slate-500">Townhall bulanan hari Jumat, 16:00 WIB.</p>
          </div>
          <Icon name="chevron-right" class="mt-0.5 h-4 w-4 text-slate-400" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@/composables/Icon";
</script>
