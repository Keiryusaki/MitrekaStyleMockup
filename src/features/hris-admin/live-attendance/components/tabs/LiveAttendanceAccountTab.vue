<template>
  <section class="-mx-3 min-h-full bg-white pb-24">
    <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
      <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="$emit('navigateHome')">
        <Icon name="arrow-left" class="h-5 w-5" />
      </button>
      <h2 class="flex-1 text-center text-[16px] font-black">Akun</h2>
      <span class="w-8"></span>
    </header>

    <div class="px-3 pt-3">
      <article class="rounded-2xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
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
    </div>
  </section>
</template>

<script setup lang="ts">
import { Icon } from "@/composables/Icon";

defineEmits<{
  navigateHome: [];
}>();
</script>
