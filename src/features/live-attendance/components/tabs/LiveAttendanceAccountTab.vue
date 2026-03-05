<template>
  <section class="space-y-4 pb-24">
    <article class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
      <p class="text-[11px] font-black uppercase tracking-wider text-slate-400">Akun</p>
      <div class="mt-2 divide-y divide-slate-100">
        <button class="flex w-full items-center justify-between py-2.5 text-left text-[12px] font-bold text-slate-700">
          <span>Profil Karyawan</span>
          <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
        </button>
        <button class="flex w-full items-center justify-between py-2.5 text-left text-[12px] font-bold text-slate-700">
          <span>Face Enrollment Ulang</span>
          <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
        </button>
        <button class="flex w-full items-center justify-between py-2.5 text-left text-[12px] font-bold text-slate-700">
          <span>Izin Lokasi & Kamera</span>
          <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
        </button>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@/composables/Icon";
</script>
