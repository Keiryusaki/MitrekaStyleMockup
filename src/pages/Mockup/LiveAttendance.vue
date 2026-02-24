<template>
  <div>
    <div v-show="!isFullscreen" class="space-y-6">
      <PageHeader
        category="Mockup"
        title="Live Attendance Mobile"
        description="Simulasi halaman presensi mobile dengan flow clock in/out, verifikasi, dan riwayat sesi."
      />
    </div>

    <div
      :class="
        isFullscreen
          ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/65 p-3 backdrop-blur-sm md:p-6'
          : 'mx-auto w-full'
      "
    >
      <button
        v-if="isFullscreen"
        class="absolute right-4 top-4 z-[140] rounded-xl bg-white/90 px-3 py-2 text-xs font-black text-slate-700 shadow-lg"
        @click="isFullscreen = false"
      >
        Keluar Fullscreen
      </button>

      <div class="w-full" :class="isFullscreen ? 'max-w-[430px]' : 'card p-4 md:p-6'">
        <div v-if="!isFullscreen" class="mb-4 flex items-center justify-between text-xs text-base-content/70">
          <span>Mobile frame simulation</span>
          <button class="rounded-lg bg-[#004b8d] px-3 py-1.5 text-[11px] font-bold text-white" @click="isFullscreen = true">
            Fullscreen
          </button>
        </div>

        <div :class="isFullscreen ? '' : 'flex justify-center'">
          <div class="w-full" :class="isFullscreen ? 'max-w-[430px]' : 'max-w-[390px]'">
            <div
              class="relative overflow-hidden bg-slate-50 shadow-2xl"
              :class="isFullscreen ? 'h-[94vh] max-h-[900px] rounded-[2.35rem]' : 'h-[780px] rounded-[2.2rem] border border-slate-200'"
            >
          <header class="absolute inset-x-0 top-0 z-30">
            <div class="topbar-glass flex h-[58px] items-center justify-between px-4">
              <img :src="mitrekaLogo" alt="Mitreka" class="relative z-[1] h-9 w-auto max-w-[188px] object-contain" />

              <div class="flex shrink-0 items-center gap-2">
                <button
                  class="rounded-lg border px-2 py-1 text-[10px] font-bold transition"
                  :class="isInArea ? 'border-emerald-400 bg-emerald-500 text-white' : 'border-amber-400 bg-amber-500 text-white'"
                  @click="isInArea = !isInArea"
                >
                  Simulasi: {{ isInArea ? "DALAM" : "LUAR" }}
                </button>
                <div class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-[#ffffff26] text-white backdrop-blur-sm">
                  <Icon name="bell" class="h-5 w-5" />
                  <span class="absolute right-2 top-2 h-2 w-2 rounded-full border border-[#004b8d] bg-rose-500"></span>
                </div>
              </div>
            </div>
          </header>

          <main class="content-scroll absolute inset-x-0 bottom-0 top-0 z-20 overflow-y-auto pb-2">
            <template v-if="activeTab === 'absen'">
              <section class="relative overflow-hidden rounded-b-[44px] bg-[#004b8d] px-6 pb-10 pt-[88px] text-white shadow-lg">
                <div class="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>
                <div class="relative z-10 space-y-1">
                  <h1 class="text-2xl font-bold tracking-tight">{{ greeting }}, Eka Dian</h1>
                  <p class="text-sm text-white/75">Absen tepat waktu, pulang tenang.</p>
                </div>
              </section>

              <div class="card-glass -mt-8 mb-6 mx-6 rounded-[34px] border border-white/65 bg-white/30 p-6 shadow-[0_16px_34px_rgba(0,75,141,0.14)] backdrop-blur-2xl">
                <div class="glass-highlight"></div>
                <div class="mb-3 flex items-center justify-between gap-2">
                  <div
                    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase"
                    :class="isInArea ? 'border-emerald-100 bg-emerald-50 text-emerald-600' : 'border-amber-100 bg-amber-50 text-amber-600'"
                  >
                    <Icon name="send" class="h-3 w-3" />
                    <span>{{ isInArea ? "Office Sudirman" : "Di luar area" }}</span>
                  </div>
                  <button class="text-[10px] font-bold text-[#004b8d] underline" @click="showMapModal = true">Lihat map</button>
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
            </template>

            <div class="px-6" :class="activeTab === 'absen' ? '' : 'pt-[78px]'">
              <template v-if="activeTab === 'absen'">
                <div class="mb-8 flex flex-col items-center">
                  <button
                    class="relative flex h-44 w-44 items-center justify-center rounded-full text-white shadow-2xl transition active:scale-95"
                    :class="actionButtonClass"
                    :disabled="status === 'out'"
                    @click="initiateAction(status === 'in' ? 'out' : 'in')"
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
                      <span class="text-lg font-black uppercase tracking-wider">Clock In</span>
                    </div>

                    <div v-else-if="status === 'in'" class="relative z-10 text-center">
                      <div class="mx-auto mb-2 inline-flex rounded-full bg-white/20 p-4">
                        <Icon name="logout" class="h-10 w-10" />
                      </div>
                      <span class="text-lg font-black uppercase tracking-wider">Clock Out</span>
                    </div>

                    <div v-else class="relative z-10 text-center text-slate-400">
                      <Icon name="circle-check-big" class="mx-auto mb-2 h-10 w-10" />
                      <span class="text-lg font-black uppercase tracking-wider">Selesai</span>
                    </div>
                  </button>

                  <button
                    v-if="status === 'out'"
                    class="mt-5 inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-6 py-3 font-bold text-[#004b8d]"
                    @click="startNewSession"
                  >
                    <Icon name="plus" class="h-5 w-5" />
                    <span>Sesi Baru</span>
                  </button>
                </div>

                <section class="space-y-3 pb-24">
                  <div class="flex items-center justify-between px-1">
                    <h3 class="text-lg font-bold text-slate-800">Riwayat Absen</h3>
                    <button class="text-xs font-bold uppercase text-[#004b8d]" @click="activeTab = 'log'">Lihat semua</button>
                  </div>

                  <div class="space-y-3">
                    <article
                      v-for="item in recentAttendancePreview"
                      :key="item.id"
                      class="overflow-hidden rounded-[24px] border border-[#004b8d]/10 bg-white shadow-[0_6px_18px_rgba(0,75,141,0.10)]"
                    >
                      <button class="flex w-full items-center justify-between p-4 text-left" @click="toggleExpand(item.id)">
                        <div class="flex items-center gap-3">
                          <div class="flex h-12 w-12 flex-col items-center justify-center rounded-2xl bg-slate-50 text-[#004b8d]">
                            <span class="text-[10px] uppercase opacity-60">{{ item.day.slice(0, 3) }}</span>
                            <span class="text-lg font-bold leading-none">{{ item.dayOfMonth }}</span>
                          </div>
                          <div>
                            <div class="flex items-center gap-2 text-sm font-bold text-slate-700">
                              <span>{{ item.firstIn || "--:--" }}</span>
                              <span class="text-slate-300">-</span>
                              <span>{{ item.lastOut || "--:--" }}</span>
                            </div>
                            <p class="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {{ attendanceHistorySummary(item) }}
                            </p>
                          </div>
                        </div>
                        <Icon :name="expandedId === item.id ? 'chevron-up' : 'chevron-down'" class="h-5 w-5 text-slate-400" />
                      </button>

                      <div v-if="expandedId === item.id" class="space-y-3 border-t border-slate-100 bg-slate-50 px-4 py-3">
                        <div
                          v-for="(session, idx) in item.sessions"
                          :key="`${item.id}-${idx}`"
                          class="space-y-1 border-b border-slate-200/70 pb-2 last:border-b-0 last:pb-0"
                        >
                          <div class="flex items-center justify-between">
                            <span class="text-[10px] font-bold uppercase text-slate-400">Sesi {{ idx + 1 }}</span>
                            <div class="flex items-center gap-3 text-xs font-black uppercase">
                              <span class="text-emerald-600">In {{ session.in }}</span>
                              <span class="text-rose-500">Out {{ session.out }}</span>
                            </div>
                          </div>
                          <p v-if="session.note" class="rounded-lg border border-amber-100 bg-amber-50 px-2 py-1 text-[11px] italic text-amber-700">
                            "{{ session.note }}"
                          </p>
                        </div>
                      </div>
                    </article>
                  </div>
                </section>
              </template>

              <template v-else-if="activeTab === 'log'">
                <section class="space-y-4 pb-24">
                  <div class="flex items-center justify-between gap-3">
                    <h3 class="text-lg font-bold text-slate-800">Attendance Log</h3>
                    <div ref="monthDropdownRef" class="relative">
                      <button
                        class="inline-flex min-w-[142px] items-center justify-between gap-2 rounded-xl border border-[#004b8d]/18 bg-white/95 px-3 py-2 text-[12px] font-black text-[#004b8d] shadow-[0_8px_20px_-14px_rgba(0,75,141,0.45)] transition hover:border-[#004b8d]/30 hover:bg-white"
                        @click="toggleMonthDropdown"
                      >
                        <span>{{ selectedMonthLabel }}</span>
                        <Icon name="chevron-down" class="h-4 w-4 text-[#004b8d]/70 transition" :class="monthDropdownOpen ? 'rotate-180' : ''" />
                      </button>

                      <div
                        v-if="monthDropdownOpen"
                        class="absolute right-0 top-[calc(100%+8px)] z-40 min-w-[190px] overflow-hidden rounded-2xl border border-[#004b8d]/15 bg-white/95 p-1.5 shadow-[0_20px_36px_-20px_rgba(0,75,141,0.5)] backdrop-blur-sm"
                      >
                        <button
                          v-for="opt in monthOptions"
                          :key="opt.value"
                          class="flex w-full items-center rounded-xl px-3 py-2 text-left text-[12px] font-bold transition"
                          :class="selectedMonth === opt.value ? 'bg-[#004b8d] text-white shadow-[0_8px_18px_-12px_rgba(0,75,141,0.7)]' : 'text-slate-600 hover:bg-[#004b8d]/7 hover:text-[#004b8d]'"
                          @click="selectMonth(opt.value)"
                        >
                          {{ opt.label }}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div v-for="month in filteredMonthlyLogs" :key="month.monthKey" class="space-y-2">
                    <h4 class="px-1 text-xs font-black uppercase tracking-wider text-slate-500">{{ month.monthLabel }}</h4>
                    <article
                      v-for="item in month.items"
                      :key="item.id"
                      class="rounded-xl border border-[#004b8d]/12 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(0,75,141,0.10)]"
                    >
                      <button class="flex w-full items-center justify-between gap-3 text-left" @click="openLogDetail(item)">
                        <div class="min-w-0 flex-1">
                          <p class="truncate text-[12px] font-black text-[#004b8d]">{{ formatListDate(item.dateKey) }}</p>
                          <p class="mt-0.5 truncate text-[11px] font-bold text-slate-700">
                            {{ item.firstIn }} - {{ item.lastOut }} <span class="text-slate-400">| {{ item.totalWork }}</span>
                          </p>
                        </div>
                        <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
                      </button>
                    </article>
                  </div>
                </section>
              </template>

              <template v-else>
                <section class="rounded-3xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                  <p class="text-sm font-bold text-slate-700">Halaman {{ activeTab }} masih simulasi.</p>
                </section>
              </template>
            </div>
          </main>

          <nav class="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-100 bg-white px-8 py-3 shadow-[0_-10px_22px_-16px_rgba(0,75,141,0.32)]">
            <div class="flex items-center justify-between">
              <button class="mobile-nav-btn" :class="activeTab === 'absen' ? 'is-active' : ''" @click="activeTab = 'absen'">
                <Icon name="calendar-clock" class="h-5 w-5" />
                <span>Absen</span>
              </button>
              <button class="mobile-nav-btn" :class="activeTab === 'log' ? 'is-active' : ''" @click="activeTab = 'log'">
                <Icon name="clipboard" class="h-5 w-5" />
                <span>Log</span>
              </button>
              <button class="mobile-nav-btn" :class="activeTab === 'profil' ? 'is-active' : ''" @click="activeTab = 'profil'">
                <Icon name="user" class="h-5 w-5" />
                <span>Profil</span>
              </button>
              <button class="mobile-nav-btn" :class="activeTab === 'menu' ? 'is-active' : ''" @click="activeTab = 'menu'">
                <Icon name="menu" class="h-5 w-5" />
                <span>Menu</span>
              </button>
            </div>
          </nav>

          <div v-if="showMapModal" class="absolute inset-0 z-40 flex flex-col bg-white">
            <header class="flex items-center justify-between bg-[#004b8d] px-6 py-4 text-white">
              <div class="flex items-center gap-2">
                <Icon name="send" class="h-5 w-5" />
                <h3 class="font-bold">Lokasi Presensi</h3>
              </div>
              <button class="rounded-full bg-white/20 p-2" @click="showMapModal = false">
                <Icon name="x" class="h-5 w-5" />
              </button>
            </header>

            <div class="relative flex-1 bg-slate-100">
              <div class="map-grid absolute inset-0"></div>

              <div class="absolute left-1/2 top-1/3 -translate-x-1/2">
                <div class="h-40 w-40 rounded-full border border-dashed border-[#004b8d]/40 bg-[#004b8d]/10"></div>
              </div>

              <div class="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2">
                <span class="inline-flex h-3 w-3 rounded-full bg-[#004b8d]"></span>
                <p class="mt-1 text-center text-[10px] font-bold text-[#004b8d]">MITREKA HQ</p>
              </div>

              <div class="absolute" :class="isInArea ? 'left-[58%] top-[30%]' : 'left-[30%] top-[72%]'">
                <span class="block h-4 w-4 rounded-full border-2 border-white bg-emerald-500 shadow-lg" :class="isRefreshing ? 'opacity-40' : ''"></span>
                <p class="mt-1 -ml-4 text-[10px] font-bold text-slate-600">LOKASI ANDA</p>
              </div>

              <div class="absolute inset-x-4 bottom-6 space-y-3">
                <div class="rounded-3xl border border-white bg-white/90 p-4 shadow-xl">
                  <p class="text-sm font-black text-slate-800">Status GPS</p>
                  <p class="text-xs text-slate-500">
                    {{ isRefreshing ? "Mengambil koordinat baru..." : isInArea ? "Akurasi tinggi - di dalam area" : "Akurasi tinggi - di luar area" }}
                  </p>
                  <button
                    class="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#004b8d] py-3 text-sm font-black text-white disabled:opacity-60"
                    :disabled="isRefreshing"
                    @click="handleRefreshLocation"
                  >
                    <Icon name="calendar-clock" class="h-4 w-4" :class="isRefreshing ? 'animate-spin' : ''" />
                    {{ isRefreshing ? "Refreshing GPS..." : "Refresh Lokasi" }}
                  </button>
                </div>
                <p class="text-center text-[10px] font-bold uppercase tracking-wide text-slate-400">
                  Pastikan GPS aktif dan browser dapat izin lokasi.
                </p>
              </div>
            </div>
          </div>

          <div v-if="showNoteModal" class="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-6 backdrop-blur-sm">
            <div class="w-full max-w-xs rounded-[32px] bg-white p-6 shadow-2xl">
              <h3 class="text-lg font-black text-slate-800">Luar Area</h3>
              <p class="mt-1 text-[11px] font-bold uppercase text-slate-400">Wajib isi alasan</p>
              <p class="mt-4 text-xs text-slate-600">Anda terdeteksi di luar radius kantor. Masukkan catatan untuk verifikasi:</p>
              <textarea
                v-model="note"
                class="mt-3 h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-xs"
                placeholder="Contoh: WFH / Meeting luar kantor"
              />
              <div class="mt-4 flex gap-2">
                <button class="flex-1 rounded-xl py-2 text-xs font-bold text-slate-500" @click="closeNoteModal">Batal</button>
                <button
                  class="flex-1 rounded-xl bg-[#004b8d] py-2 text-xs font-black text-white disabled:opacity-50"
                  :disabled="note.trim().length === 0"
                  @click="submitNote"
                >
                  Lanjut Scan
                </button>
              </div>
            </div>
          </div>

          <div v-if="showFaceModal" class="absolute inset-0 z-50 flex items-center justify-center bg-slate-900/80 p-6">
            <div class="w-full max-w-xs rounded-[32px] bg-white p-8 text-center shadow-2xl">
              <div class="relative mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                <Icon name="user" class="h-16 w-16 text-[#004b8d]/20" />
                <span class="scan-line"></span>
              </div>
              <h3 class="text-lg font-black uppercase tracking-tight text-slate-800">
                Verifikasi {{ pendingAction === 'in' ? 'Masuk' : 'Keluar' }}
              </h3>
              <p class="mt-1 text-[10px] font-black uppercase tracking-widest text-slate-400">Biometrik autentikasi...</p>
            </div>
          </div>

          <div
            v-if="showLogDetail && selectedLogEntry"
            class="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-5 backdrop-blur-sm"
            @click="closeLogDetail"
          >
            <div class="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl" @click.stop>
              <div class="mb-4 flex items-center justify-between">
                <div>
                  <p class="text-[11px] font-black uppercase tracking-wider text-slate-400">Detail Attendance</p>
                  <h3 class="text-lg font-black text-slate-800">{{ formatListDate(selectedLogEntry.dateKey) }}</h3>
                </div>
                <button class="rounded-full bg-slate-100 p-2" @click="closeLogDetail">
                  <Icon name="x" class="h-4 w-4 text-slate-600" />
                </button>
              </div>

              <div class="space-y-3">
                <div
                  v-for="(session, idx) in selectedLogEntry.sessions"
                  :key="`${selectedLogEntry.id}-${idx}`"
                  class="rounded-2xl border border-slate-200 bg-slate-50 p-3"
                >
                  <div class="flex items-center justify-between text-xs font-black uppercase">
                    <span class="text-slate-500">Sesi {{ idx + 1 }}</span>
                    <span class="text-emerald-600">In {{ session.in }}</span>
                    <span class="text-rose-500">Out {{ session.out }}</span>
                  </div>
                  <p v-if="session.note" class="mt-2 rounded-lg border border-amber-100 bg-amber-50 px-2 py-1 text-[11px] italic text-amber-700">
                    "{{ session.note }}"
                  </p>
                  <p v-else class="mt-2 text-[11px] text-slate-400">Tanpa catatan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";
import mitrekaLogo from "@/assets/logo.png";

type AttendanceStatus = "idle" | "in" | "out";
type AttendanceAction = "in" | "out";

type SessionLog = {
  in: string;
  out: string;
  note: string;
};

type AttendanceEntry = {
  id: number;
  day: string;
  dateKey: string;
  dayOfMonth: string;
  firstIn: string;
  lastOut: string;
  totalWork: string;
  sessions: SessionLog[];
};

const isFullscreen = ref(false);
const status = ref<AttendanceStatus>("idle");
const currentTime = ref(new Date());
const clockInTime = ref<Date | null>(null);
const duration = ref("00:00:00");
const expandedId = ref<number | null>(null);
const showFaceModal = ref(false);
const showNoteModal = ref(false);
const showMapModal = ref(false);
const showLogDetail = ref(false);
const selectedLogEntry = ref<AttendanceEntry | null>(null);
const isRefreshing = ref(false);
const pendingAction = ref<AttendanceAction | null>(null);
const isInArea = ref(true);
const note = ref("");
const activeTab = ref<"absen" | "log" | "profil" | "menu">("absen");
const selectedMonth = ref("all");
const monthDropdownOpen = ref(false);
const monthDropdownRef = ref<HTMLElement | null>(null);

const attendanceData = ref<AttendanceEntry[]>(createSeedAttendance());

function createSeedAttendance(): AttendanceEntry[] {
  const dayNames = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const mockNotes = [
    "",
    "Review sprint backlog",
    "Meeting client di Sudirman",
    "Koordinasi vendor",
    "On-site support",
    "Pairing bugfix",
    "",
  ];

  const entries: AttendanceEntry[] = [];
  let idCounter = 1;
  const startDate = new Date("2026-02-28T08:00:00");

  for (let i = 0; i < 58; i += 1) {
    const d = new Date(startDate);
    d.setDate(startDate.getDate() - i);

    const dayIndex = d.getDay();
    if (dayIndex === 0 || dayIndex === 6) continue;

    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateKey = `${yyyy}-${mm}-${dd}`;

    const inMinuteOffset = (i * 3) % 18;
    const outMinuteOffset = (i * 5) % 26;
    const firstIn = `08:${String(2 + inMinuteOffset).padStart(2, "0")}`;
    const noonOut = `12:${String((i * 2) % 7).padStart(2, "0")}`;
    const noonIn = `13:${String((i * 4) % 12).padStart(2, "0")}`;
    const lastOutHour = i % 9 === 0 ? 18 : 17;
    const lastOut = `${String(lastOutHour).padStart(2, "0")}:${String(4 + outMinuteOffset).padStart(2, "0")}`;

    const sessions: SessionLog[] = [
      { in: firstIn, out: noonOut, note: "" },
      { in: noonIn, out: lastOut, note: mockNotes[i % mockNotes.length] ?? "" },
    ];

    entries.push({
      id: idCounter,
      day: dayNames[dayIndex] ?? "Senin",
      dateKey,
      dayOfMonth: dd,
      firstIn,
      lastOut,
      totalWork: totalWorkText(sessions),
      sessions,
    });

    idCounter += 1;
  }

  return entries;
}

const greeting = computed(() => {
  const hour = currentTime.value.getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
});

const displayTime = computed(() => {
  const raw = currentTime.value.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  const [time, meridiem] = raw.split(" ");
  return { time, meridiem: meridiem ?? "" };
});

const displaySeconds = computed(() => String(currentTime.value.getSeconds()).padStart(2, "0"));

const actionButtonClass = computed(() => {
  if (status.value === "idle") return "bg-emerald-500 hover:bg-emerald-600";
  if (status.value === "in") return "bg-rose-500 hover:bg-rose-600";
  return "cursor-not-allowed bg-slate-200 text-slate-400 shadow-none";
});

const monthlyLogs = computed(() => {
  const grouped = new Map<string, AttendanceEntry[]>();

  const sorted = [...attendanceData.value].sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  for (const item of sorted) {
    const monthKey = item.dateKey.slice(0, 7);
    if (!grouped.has(monthKey)) grouped.set(monthKey, []);
    grouped.get(monthKey)?.push(item);
  }

  return [...grouped.entries()].map(([monthKey, items]) => {
    const date = new Date(`${monthKey}-01T00:00:00`);
    return {
      monthKey,
      monthLabel: date.toLocaleDateString("id-ID", { month: "long", year: "numeric" }),
      items,
    };
  });
});

const monthOptions = computed(() => [
  { value: "all", label: "Semua Bulan" },
  ...monthlyLogs.value.map((m) => ({ value: m.monthKey, label: m.monthLabel })),
]);
const selectedMonthLabel = computed(() => monthOptions.value.find((opt) => opt.value === selectedMonth.value)?.label ?? "Semua Bulan");

const filteredMonthlyLogs = computed(() => {
  if (selectedMonth.value === "all") return monthlyLogs.value;
  return monthlyLogs.value.filter((m) => m.monthKey === selectedMonth.value);
});
const recentAttendancePreview = computed(() => {
  const today = new Date(currentTime.value);
  const todayKey = toDateKey(today);
  const sorted = [...attendanceData.value].sort((a, b) => b.dateKey.localeCompare(a.dateKey));
  const todayEntry = sorted.find((item) => item.dateKey === todayKey);
  const previousTwoDays = sorted.filter((item) => item.dateKey < todayKey).slice(0, 2);

  let todayPreview: AttendanceEntry;
  if (status.value === "in") {
    const liveClockIn = clockInTime.value ? toTime(clockInTime.value) : todayEntry?.firstIn ?? "";
    todayPreview = {
      id: -1,
      day: getDayName(today),
      dateKey: todayKey,
      dayOfMonth: String(today.getDate()).padStart(2, "0"),
      firstIn: liveClockIn,
      lastOut: "",
      totalWork: todayEntry?.totalWork ?? "",
      sessions: todayEntry?.sessions ?? [],
    };
  } else if (todayEntry) {
    todayPreview = todayEntry;
  } else {
    todayPreview = {
      id: -1,
      day: getDayName(today),
      dateKey: todayKey,
      dayOfMonth: String(today.getDate()).padStart(2, "0"),
      firstIn: "",
      lastOut: "",
      totalWork: "",
      sessions: [],
    };
  }

  return [todayPreview, ...previousTwoDays];
});

const clockTimer = setInterval(() => {
  const now = new Date();
  currentTime.value = now;

  if (status.value === "in" && clockInTime.value) {
    duration.value = formatDuration(now.getTime() - clockInTime.value.getTime());
  }
}, 1000);

let actionTimeout: ReturnType<typeof setTimeout> | null = null;
let refreshTimeout: ReturnType<typeof setTimeout> | null = null;

onBeforeUnmount(() => {
  clearInterval(clockTimer);
  if (actionTimeout) clearTimeout(actionTimeout);
  if (refreshTimeout) clearTimeout(refreshTimeout);
  document.removeEventListener("click", handleDocumentClick);
});

onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

function formatDateShort(date: Date): string {
  return date.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long" });
}

function formatListDate(dateKey: string): string {
  const date = new Date(`${dateKey}T00:00:00`);
  return date.toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
}

function attendanceHistorySummary(item: AttendanceEntry): string {
  if (!item.firstIn && !item.lastOut) return "Belum check in";
  if (item.firstIn && !item.lastOut) return "Check in tercatat | menunggu check out";
  return `${item.sessions.length} sesi | ${item.totalWork}`;
}

function toTime(date: Date): string {
  return date.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", hour12: false });
}

function formatDuration(milliseconds: number): string {
  const seconds = Math.floor(milliseconds / 1000);
  const hh = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

function minutesBetween(startTime: string, endTime: string): number {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);
  return endH * 60 + endM - (startH * 60 + startM);
}

function totalWorkText(sessions: SessionLog[]): string {
  const totalMinutes = sessions.reduce((sum, s) => sum + Math.max(0, minutesBetween(s.in, s.out)), 0);
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, "0");
  const mins = String(totalMinutes % 60).padStart(2, "0");
  return `${hours}j ${mins}m`;
}

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function getDayName(date: Date): string {
  const raw = date.toLocaleDateString("id-ID", { weekday: "long" });
  return raw.charAt(0).toUpperCase() + raw.slice(1);
}

function initiateAction(type: AttendanceAction): void {
  if (status.value === "out") return;

  pendingAction.value = type;

  if (!isInArea.value) {
    showNoteModal.value = true;
    return;
  }

  showFaceAndProcess(type);
}

function showFaceAndProcess(type: AttendanceAction): void {
  showFaceModal.value = true;
  if (actionTimeout) clearTimeout(actionTimeout);

  actionTimeout = setTimeout(() => {
    processAttendance(type);
  }, 1200);
}

function submitNote(): void {
  if (!note.value.trim() || !pendingAction.value) return;
  showNoteModal.value = false;
  showFaceAndProcess(pendingAction.value);
}

function closeNoteModal(): void {
  showNoteModal.value = false;
  note.value = "";
  pendingAction.value = null;
}

function processAttendance(type: AttendanceAction): void {
  showFaceModal.value = false;

  if (type === "in") {
    status.value = "in";
    clockInTime.value = new Date();
    duration.value = "00:00:00";
  } else {
    const clockOut = new Date();
    const start = clockInTime.value;

    if (start) {
      upsertAttendance(start, clockOut, note.value.trim());
    }

    status.value = "out";
    clockInTime.value = null;
    duration.value = "00:00:00";
  }

  note.value = "";
  pendingAction.value = null;
}

function upsertAttendance(start: Date, end: Date, noteText: string): void {
  const dateKey = toDateKey(start);
  const day = getDayName(start);
  const dayOfMonth = String(start.getDate());

  const newSession: SessionLog = {
    in: toTime(start),
    out: toTime(end),
    note: noteText,
  };

  const foundIndex = attendanceData.value.findIndex((item) => item.dateKey === dateKey);

  if (foundIndex >= 0) {
    const entry = attendanceData.value[foundIndex];
    entry.sessions.push(newSession);
    entry.firstIn = entry.sessions[0].in;
    entry.lastOut = newSession.out;
    entry.totalWork = totalWorkText(entry.sessions);
    attendanceData.value = [entry, ...attendanceData.value.filter((_, idx) => idx !== foundIndex)];
    return;
  }

  const newEntry: AttendanceEntry = {
    id: Date.now(),
    day,
    dateKey,
    dayOfMonth,
    firstIn: newSession.in,
    lastOut: newSession.out,
    totalWork: totalWorkText([newSession]),
    sessions: [newSession],
  };

  attendanceData.value = [newEntry, ...attendanceData.value];
}

function startNewSession(): void {
  status.value = "idle";
  duration.value = "00:00:00";
}

function toggleExpand(id: number): void {
  expandedId.value = expandedId.value === id ? null : id;
}

function openLogDetail(item: AttendanceEntry): void {
  selectedLogEntry.value = item;
  showLogDetail.value = true;
}

function closeLogDetail(): void {
  showLogDetail.value = false;
  selectedLogEntry.value = null;
}

function handleRefreshLocation(): void {
  isRefreshing.value = true;
  if (refreshTimeout) clearTimeout(refreshTimeout);

  refreshTimeout = setTimeout(() => {
    isRefreshing.value = false;
  }, 1200);
}

function toggleMonthDropdown(): void {
  monthDropdownOpen.value = !monthDropdownOpen.value;
}

function selectMonth(value: string): void {
  selectedMonth.value = value;
  monthDropdownOpen.value = false;
}

function handleDocumentClick(event: MouseEvent): void {
  const target = event.target as Node | null;
  if (!monthDropdownRef.value || !target) return;
  if (!monthDropdownRef.value.contains(target)) {
    monthDropdownOpen.value = false;
  }
}
</script>

<style scoped>
.mobile-nav-btn {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  color: rgb(148 163 184);
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.mobile-nav-btn.is-active {
  color: #004b8d;
}

.topbar-glass {
  position: relative;
  overflow: hidden;
  background: linear-gradient(180deg, #0c5ea7 0%, #08508f 36%, #073f76 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  box-shadow: 0 8px 18px rgba(2, 34, 71, 0.28);
  backdrop-filter: blur(8px);
}

.topbar-glass::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(120% 130% at 0% 0%, rgba(255, 255, 255, 0.12) 0%, transparent 45%),
    linear-gradient(90deg, rgba(255, 255, 255, 0.07) 0%, rgba(255, 255, 255, 0.02) 22%, transparent 46%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.02) 0%, rgba(0, 0, 0, 0.22) 100%);
}

.content-scroll {
  box-shadow:
    inset 10px 0 12px -12px rgba(2, 34, 71, 0.2),
    inset -10px 0 12px -12px rgba(2, 34, 71, 0.2),
    inset 0 -18px 20px -24px rgba(2, 34, 71, 0.28);
}

.scan-line {
  position: absolute;
  left: 10%;
  right: 10%;
  height: 2px;
  border-radius: 999px;
  background: #004b8d;
  box-shadow: 0 0 18px #004b8d;
  animation: scan 2s ease-in-out infinite;
}

.map-grid {
  background-image: linear-gradient(to right, rgba(148, 163, 184, 0.25) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(148, 163, 184, 0.25) 1px, transparent 1px);
  background-size: 38px 38px;
}

.card-glass {
  position: relative;
  overflow: hidden;
}

.glass-highlight {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background:
    radial-gradient(140% 85% at 8% 0%, rgba(255, 255, 255, 0.55) 0%, rgba(255, 255, 255, 0) 50%),
    linear-gradient(165deg, rgba(255, 255, 255, 0.36) 0%, rgba(255, 255, 255, 0.1) 48%, rgba(148, 163, 184, 0.16) 100%);
}

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

@keyframes scan {
  0% {
    top: 20%;
  }
  100% {
    top: 80%;
  }
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
