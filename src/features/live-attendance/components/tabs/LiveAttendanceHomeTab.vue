<template>
  <div>
    <section class="relative overflow-hidden rounded-b-[64px] bg-[#004b8d] px-6 pb-24 pt-[78px] text-white shadow-lg">
      <div class="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>
      <div class="relative z-10 space-y-1">
        <h1 class="text-2xl font-bold tracking-tight">{{ greeting }}, Eka Dian</h1>
        <p class="text-sm text-white/75">Absen tepat waktu, pulang tenang.</p>
      </div>
    </section>

    <div class="card-glass -mt-16 mb-6 mx-6 rounded-[34px] border border-white/65 bg-white/30 p-6 shadow-[0_16px_34px_rgba(0,75,141,0.14)] backdrop-blur-2xl">
      <div class="glass-highlight"></div>
      <div class="mb-3 flex items-center justify-between gap-2">
        <div
          class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase"
          :class="isInArea ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 'border-amber-100 bg-amber-50 text-amber-600'"
        >
          <Icon name="send" class="h-3 w-3" />
          <span>{{ isInArea ? "Office Sudirman" : "Di luar area" }}</span>
        </div>
        <button class="text-[10px] font-bold text-[#004b8d] underline" @click="$emit('openMap')">Lihat map</button>
      </div>

      <h2 class="mb-1 text-center text-[#004b8d]">
        <span class="text-6xl font-black tracking-tighter">{{ displayTime.time }}</span>
        <span class="ml-1 text-3xl font-black align-middle">{{ displayTime.meridiem }}</span>
        <span class="ml-1 text-4xl font-bold align-middle opacity-35">.{{ displaySeconds }}</span>
      </h2>
      <p class="text-center text-xs font-bold text-slate-500">{{ formatDateShort(currentTime) }}</p>

      <div v-if="status === 'in'" class="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-4">
        <div>
          <p class="text-[10px] font-black uppercase text-slate-400">Durasi Kerja</p>
          <p class="text-xl font-black text-[#004b8d]">{{ duration }}</p>
        </div>
        <Icon name="calendar-clock" class="h-6 w-6 text-[#004b8d]/30" />
      </div>
    </div>

    <div class="px-6">
      <div class="mb-8 flex flex-col items-center">
        <button
          class="relative flex h-44 w-44 items-center justify-center rounded-full text-white shadow-2xl transition active:scale-95"
          :class="actionButtonClass"
          :disabled="status === 'out'"
          @click="$emit('initiateAction', status === 'in' ? 'out' : 'in')"
        >
          <span
            v-if="status !== 'out'"
            class="pulse-ring pulse-ring-1 absolute inset-0 rounded-full"
            :class="status === 'idle' ? 'bg-emerald-400 shadow-[0_0_34px_rgba(16,185,129,0.78)]' : 'bg-rose-400 shadow-[0_0_34px_rgba(244,63,94,0.75)]'"
          ></span>
          <span
            v-if="status !== 'out'"
            class="pulse-ring pulse-ring-2 absolute inset-0 rounded-full"
            :class="status === 'idle' ? 'bg-emerald-300 shadow-[0_0_40px_rgba(52,211,153,0.72)]' : 'bg-rose-300 shadow-[0_0_40px_rgba(251,113,133,0.7)]'"
          ></span>

          <div v-if="status === 'idle'" class="relative z-10 text-center">
            <div class="mx-auto mb-2 inline-flex rounded-full bg-white/20 p-4">
              <Icon name="calendar-clock" class="h-10 w-10" />
            </div>
            <span class="text-lg font-black uppercase tracking-wider">Masuk</span>
          </div>

          <div v-else-if="status === 'in'" class="relative z-10 text-center">
            <div class="mx-auto mb-2 inline-flex rounded-full bg-white/20 p-4">
              <Icon name="logout" class="h-10 w-10" />
            </div>
            <span class="text-lg font-black uppercase tracking-wider">Pulang</span>
          </div>

          <div v-else class="relative z-10 text-center text-slate-400">
            <Icon name="circle-check-big" class="mx-auto mb-2 h-10 w-10" />
            <span class="text-lg font-black uppercase tracking-wider">Selesai</span>
          </div>
        </button>

        <button
          v-if="status === 'out'"
          class="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-[#004b8d]"
          @click="$emit('startNewSession')"
        >
          <Icon name="plus" class="h-5 w-5" />
          <span>Sesi Baru</span>
        </button>
      </div>

      <section class="space-y-4 pb-24">
        <article class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <div class="flex items-center justify-between">
            <h3 class="text-[13px] font-black text-slate-800">Catatan Presensi Hari Ini</h3>
            <span
              class="rounded-full px-2 py-0.5 text-[10px] font-black uppercase"
              :class="
                todayClockNote.status === 'Belum Check-in'
                  ? 'bg-slate-100 text-slate-500'
                  : todayClockNote.status === 'Sedang Bekerja'
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-[#004b8d]/10 text-[#004b8d]'
              "
            >
              {{ todayClockNote.status }}
            </span>
          </div>
          <div class="mt-3 grid grid-cols-2 gap-2">
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p class="text-[10px] font-black uppercase text-slate-400">Jam Masuk</p>
              <p class="mt-1 text-sm font-black text-slate-700">{{ todayClockNote.clockIn || "--:--" }}</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p class="text-[10px] font-black uppercase text-slate-400">Jam Pulang</p>
              <p class="mt-1 text-sm font-black text-slate-700">{{ todayClockNote.clockOut || "--:--" }}</p>
            </div>
          </div>
        </article>

        <article class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <h3 class="text-[13px] font-black text-slate-800">Menu Pintas</h3>
          <div class="mt-3 grid grid-cols-3 gap-2.5">
            <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="$emit('openLog')">
              <Icon name="clipboard" class="h-5 w-5" />
              <span class="text-[10px] font-black">Log</span>
            </button>
            <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="$emit('openLog')">
              <Icon name="calendar-clock" class="h-5 w-5" />
              <span class="text-[10px] font-black">Riwayat</span>
            </button>
            <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="$emit('navigateTab', 'inbox')">
              <Icon name="bell" class="h-5 w-5" />
              <span class="text-[10px] font-black">Inbox</span>
            </button>
            <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="$emit('navigateTab', 'employee')">
              <Icon name="users" class="h-5 w-5" />
              <span class="text-[10px] font-black">Karyawan</span>
            </button>
            <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="$emit('navigateTab', 'leave')">
              <Icon name="send" class="h-5 w-5" />
              <span class="text-[10px] font-black">Izin/Cuti</span>
            </button>
            <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="$emit('navigateTab', 'account')">
              <Icon name="user" class="h-5 w-5" />
              <span class="text-[10px] font-black">Akun</span>
            </button>
          </div>
        </article>

        <article class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
          <h3 class="text-[13px] font-black text-slate-800">Pengumuman</h3>
          <div class="mt-3 space-y-2">
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p class="text-[11px] font-black text-slate-700">Info Payroll Februari 2026</p>
              <p class="mt-0.5 text-[10px] font-bold text-slate-500">Slip gaji tersedia mulai 27 Februari 2026.</p>
            </div>
            <div class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
              <p class="text-[11px] font-black text-slate-700">Kebijakan Presensi Hybrid</p>
              <p class="mt-0.5 text-[10px] font-bold text-slate-500">WFH wajib isi catatan aktivitas harian.</p>
            </div>
          </div>
        </article>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from "@/composables/Icon";

type AttendanceStatus = "idle" | "in" | "out";
type AttendanceAction = "in" | "out";
type TabKey = "home" | "employee" | "inbox" | "leave" | "account";

defineProps<{
  greeting: string;
  isInArea: boolean;
  displayTime: { time: string; meridiem: string };
  displaySeconds: string;
  currentTime: Date;
  status: AttendanceStatus;
  duration: string;
  actionButtonClass: string;
  todayClockNote: { status: string; clockIn: string; clockOut: string };
  formatDateShort: (date: Date) => string;
}>();

defineEmits<{
  openMap: [];
  initiateAction: [type: AttendanceAction];
  startNewSession: [];
  openLog: [];
  navigateTab: [tab: TabKey];
}>();
</script>

<style scoped>
.pulse-ring {
  opacity: 0;
  transform: scale(1);
  filter: blur(0.6px);
}

.pulse-ring-1 {
  animation: pulseRing 1.3s ease-out infinite;
}

.pulse-ring-2 {
  animation: pulseRing 1.3s ease-out infinite;
  animation-delay: 0.35s;
}

@keyframes pulseRing {
  0% {
    opacity: 0.85;
    transform: scale(1);
  }
  75% {
    opacity: 0;
    transform: scale(1.56);
  }
  100% {
    opacity: 0;
    transform: scale(1.56);
  }
}
</style>
