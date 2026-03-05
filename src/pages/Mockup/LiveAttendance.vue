<template>
  <div>
    <div v-show="!isFullscreen" class="space-y-6">
      <PageHeader
        category="Mockup"
        title="Simulasi Presensi Mobile"
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
          <span>Simulasi frame mobile</span>
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
          <header v-if="activeTab === 'home'" class="absolute inset-x-0 top-0 z-30">
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
              </div>
            </div>
          </header>

          <main class="content-scroll absolute inset-x-0 bottom-0 top-0 z-20 overflow-y-auto pb-2">
            <LiveAttendanceHomeTab
              v-if="activeTab === 'home'"
              :greeting="greeting"
              :is-in-area="isInArea"
              :display-time="displayTime"
              :display-seconds="displaySeconds"
              :current-time="currentTime"
              :status="status"
              :duration="duration"
              :action-button-class="actionButtonClass"
              :today-clock-note="todayClockNote"
              :format-date-short="formatDateShort"
              @open-map="showMapModal = true"
              @initiate-action="initiateAction"
              @start-new-session="startNewSession"
              @open-log="showLogPanel = true"
              @navigate-tab="activeTab = $event"
            />

            <div v-else class="px-6 pt-4">
              <LiveAttendanceEmployeeTab
                v-if="activeTab === 'employee'"
                :off-today-employees="offTodayEmployees"
                :employee-search="employeeSearch"
                :employee-filter-label="employeeFilterLabel"
                :employee-role-filter-label="employeeRoleFilterLabel"
                :filtered-employees="filteredEmployees"
                @update:employee-search="employeeSearch = $event"
                @open-filter="showEmployeeFilterModal = true"
                @open-time-off-detail="selectedOffEmployee = $event"
                @open-employee-detail="selectedEmployee = $event"
              />

              <LiveAttendanceInboxTab v-else-if="activeTab === 'inbox'" />

              <LiveAttendanceLeaveTab v-else-if="activeTab === 'leave'" />

              <LiveAttendanceAccountTab v-else-if="activeTab === 'account'" />
            </div>
          </main>

          <nav class="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-100 bg-white px-6 py-3 shadow-[0_-10px_22px_-16px_rgba(0,75,141,0.32)]">
            <button
              class="mobile-nav-fab"
              :class="activeTab === 'leave' ? 'is-active' : ''"
              @click="activeTab = 'leave'"
              aria-label="Izin/Cuti"
            >
              <Icon name="send" class="h-6 w-6" />
            </button>
            <div class="grid w-full grid-cols-4 items-center gap-1">
              <button class="mobile-nav-btn" :class="activeTab === 'home' ? 'is-active' : ''" @click="activeTab = 'home'">
                <Icon name="home" class="h-5 w-5" />
                <span>Beranda</span>
              </button>
              <button class="mobile-nav-btn" :class="activeTab === 'employee' ? 'is-active' : ''" @click="activeTab = 'employee'">
                <Icon name="users" class="h-5 w-5" />
                <span>Karyawan</span>
              </button>
              <button class="mobile-nav-btn" :class="activeTab === 'inbox' ? 'is-active' : ''" @click="activeTab = 'inbox'">
                <Icon name="bell" class="h-5 w-5" />
                <span>Inbox</span>
              </button>
              <button class="mobile-nav-btn" :class="activeTab === 'account' ? 'is-active' : ''" @click="activeTab = 'account'">
                <Icon name="user" class="h-5 w-5" />
                <span>Akun</span>
              </button>
            </div>
          </nav>

          <LiveAttendanceLogPanel
            :show="showLogPanel"
            :month-dropdown-ref="monthDropdownRef"
            :month-dropdown-open="monthDropdownOpen"
            :selected-month-label="selectedMonthLabel"
            :month-options="monthOptions"
            :selected-month="selectedMonth"
            :filtered-monthly-logs="filteredMonthlyLogs"
            :format-list-date="formatListDate"
            :session-meta-summary="sessionMetaSummary"
            @close="showLogPanel = false"
            @toggle-month-dropdown="toggleMonthDropdown"
            @select-month="selectMonth"
            @open-log-detail="openLogDetail"
          />

          <div
            v-if="showEmployeeFilterModal"
            class="absolute inset-0 z-[55] flex items-end bg-slate-900/45 p-4 backdrop-blur-[1px]"
            @click="showEmployeeFilterModal = false"
          >
            <div class="w-full rounded-3xl bg-white p-4 shadow-2xl" @click.stop>
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-[14px] font-black text-slate-800">Filter Karyawan</h3>
                <button class="rounded-full bg-slate-100 p-2" @click="showEmployeeFilterModal = false">
                  <Icon name="x" class="h-4 w-4 text-slate-600" />
                </button>
              </div>

              <div>
                <p class="text-[10px] font-black uppercase tracking-wide text-slate-400">Status</p>
                <div class="mt-2 grid grid-cols-2 gap-2">
                  <button
                    v-for="opt in employeeStatusOptions"
                    :key="`status-${opt.value}`"
                    class="rounded-xl border px-3 py-2 text-[11px] font-black"
                    :class="employeeFilter === opt.value ? 'border-[#004b8d] bg-[#004b8d] text-white' : 'border-slate-200 bg-slate-50 text-slate-600'"
                    @click="employeeFilter = opt.value"
                  >
                    {{ opt.label }}
                  </button>
                </div>
              </div>

              <div class="mt-4">
                <p class="text-[10px] font-black uppercase tracking-wide text-slate-400">Posisi / Jabatan</p>
                <div class="mt-2 max-h-40 space-y-1 overflow-y-auto rounded-xl border border-slate-200 bg-slate-50 p-2">
                  <button
                    v-for="opt in employeeRoleOptions"
                    :key="`role-${opt.value}`"
                    class="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-[11px] font-bold"
                    :class="employeeRoleFilter === opt.value ? 'bg-[#004b8d]/10 text-[#004b8d]' : 'text-slate-600 hover:bg-slate-100'"
                    @click="employeeRoleFilter = opt.value"
                  >
                    <span>{{ opt.label }}</span>
                    <Icon v-if="employeeRoleFilter === opt.value" name="chevron-right" class="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              <div class="mt-4 grid grid-cols-2 gap-2">
                <button
                  class="rounded-xl border border-slate-200 bg-white py-2 text-[12px] font-black text-slate-600"
                  @click="resetEmployeeFilter"
                >
                  Reset
                </button>
                <button
                  class="rounded-xl bg-[#004b8d] py-2 text-[12px] font-black text-white"
                  @click="showEmployeeFilterModal = false"
                >
                  Terapkan
                </button>
              </div>
            </div>
          </div>

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
                  <p class="text-[11px] font-black uppercase tracking-wider text-slate-400">Detail Kehadiran</p>
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

                  <div class="mt-2 space-y-2">
                    <div class="rounded-xl border border-slate-200 bg-white p-2">
                      <p class="mb-1 text-[10px] font-black uppercase tracking-wide text-emerald-700">Bukti Masuk</p>
                      <div class="grid grid-cols-2 gap-2">
                        <div class="relative h-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <div class="map-grid absolute inset-0"></div>
                          <div class="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#004b8d]/35 bg-[#004b8d]/10"></div>
                          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span class="block h-2 w-2 rounded-full bg-[#004b8d] shadow-[0_0_10px_rgba(0,75,141,0.4)]"></span>
                          </div>
                          <span class="absolute h-2.5 w-2.5 rounded-full border border-white bg-rose-500 shadow-sm" :class="mapMarkerClass(session.locationIn)"></span>
                          <p class="absolute bottom-1 left-1 rounded bg-white/85 px-1 py-0.5 text-[9px] font-black text-slate-600">
                            {{ shortLocation(session.locationIn) }}
                          </p>
                        </div>
                        <div class="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <img :src="session.faceShotIn" alt="Face check in" class="h-20 w-full object-cover" />
                        </div>
                      </div>
                    </div>

                    <div class="rounded-xl border border-slate-200 bg-white p-2">
                      <p class="mb-1 text-[10px] font-black uppercase tracking-wide text-rose-600">Bukti Pulang</p>
                      <div class="grid grid-cols-2 gap-2">
                        <div class="relative h-20 overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <div class="map-grid absolute inset-0"></div>
                          <div class="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#004b8d]/35 bg-[#004b8d]/10"></div>
                          <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                            <span class="block h-2 w-2 rounded-full bg-[#004b8d] shadow-[0_0_10px_rgba(0,75,141,0.4)]"></span>
                          </div>
                          <span class="absolute h-2.5 w-2.5 rounded-full border border-white bg-rose-500 shadow-sm" :class="mapMarkerClass(session.locationOut)"></span>
                          <p class="absolute bottom-1 left-1 rounded bg-white/85 px-1 py-0.5 text-[9px] font-black text-slate-600">
                            {{ shortLocation(session.locationOut) }}
                          </p>
                        </div>
                        <div class="overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <img :src="session.faceShotOut" alt="Face check out" class="h-20 w-full object-cover" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p v-if="session.note" class="mt-2 rounded-lg border border-amber-100 bg-amber-50 px-2 py-1 text-[11px] italic text-amber-700">
                    "{{ session.note }}"
                  </p>
                  <p v-else class="mt-2 text-[11px] text-slate-400">Tanpa catatan</p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="selectedOffEmployee"
            class="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-5 backdrop-blur-sm"
            @click="selectedOffEmployee = null"
          >
            <div class="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl" @click.stop>
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-lg font-black text-slate-800">Detail Time Off</h3>
                <button class="rounded-full bg-slate-100 p-2" @click="selectedOffEmployee = null">
                  <Icon name="x" class="h-4 w-4 text-slate-600" />
                </button>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-[12px] font-black text-slate-800">{{ selectedOffEmployee.name }}</p>
                <p class="text-[11px] font-bold text-slate-500">{{ selectedOffEmployee.role }}</p>

                <div class="mt-3 space-y-2 text-[11px]">
                  <div>
                    <p class="font-black uppercase tracking-wide text-slate-400">Alasan</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ selectedOffEmployee.timeOff?.reason || "-" }}</p>
                  </div>
                  <div>
                    <p class="font-black uppercase tracking-wide text-slate-400">Tanggal</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ selectedOffEmployee.timeOff?.dateLabel || "-" }}</p>
                  </div>
                  <div class="flex items-center justify-between">
                    <p class="font-black uppercase tracking-wide text-slate-400">Status</p>
                    <span
                      class="rounded-full px-2 py-0.5 text-[10px] font-black uppercase"
                      :class="selectedOffEmployee.timeOff?.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'"
                    >
                      {{ selectedOffEmployee.timeOff?.status === "approved" ? "Approved" : "Pending" }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="selectedEmployee"
            class="absolute inset-0 z-[60] flex items-center justify-center bg-slate-900/70 p-5 backdrop-blur-sm"
            @click="selectedEmployee = null"
          >
            <div class="w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl" @click.stop>
              <div class="mb-3 flex items-center justify-between">
                <h3 class="text-lg font-black text-slate-800">Detail Karyawan</h3>
                <button class="rounded-full bg-slate-100 p-2" @click="selectedEmployee = null">
                  <Icon name="x" class="h-4 w-4 text-slate-600" />
                </button>
              </div>

              <div class="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <p class="text-[12px] font-black text-slate-800">{{ selectedEmployee.name }}</p>
                <p class="text-[11px] font-bold text-slate-500">{{ selectedEmployee.role }}</p>

                <div class="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                  <div class="rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                    <p class="font-black uppercase tracking-wide text-slate-400">Skema Kerja</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ formatWorkArrangement(selectedEmployee.workArrangement) }}</p>
                  </div>
                  <div class="rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                    <p class="font-black uppercase tracking-wide text-slate-400">Kepegawaian</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ formatEmploymentType(selectedEmployee.employmentType) }}</p>
                  </div>
                  <div class="col-span-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                    <p class="font-black uppercase tracking-wide text-slate-400">No. Telp</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ selectedEmployee.phone }}</p>
                  </div>
                  <div class="col-span-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                    <p class="font-black uppercase tracking-wide text-slate-400">WhatsApp</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ selectedEmployee.whatsapp }}</p>
                  </div>
                  <div class="col-span-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5">
                    <p class="font-black uppercase tracking-wide text-slate-400">Email</p>
                    <p class="mt-0.5 font-bold text-slate-700">{{ selectedEmployee.email }}</p>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";
import mitrekaLogo from "@/assets/logo.png";
import LiveAttendanceHomeTab from "@/features/live-attendance/components/tabs/LiveAttendanceHomeTab.vue";
import LiveAttendanceEmployeeTab from "@/features/live-attendance/components/tabs/LiveAttendanceEmployeeTab.vue";
import LiveAttendanceInboxTab from "@/features/live-attendance/components/tabs/LiveAttendanceInboxTab.vue";
import LiveAttendanceLeaveTab from "@/features/live-attendance/components/tabs/LiveAttendanceLeaveTab.vue";
import LiveAttendanceAccountTab from "@/features/live-attendance/components/tabs/LiveAttendanceAccountTab.vue";
import LiveAttendanceLogPanel from "@/features/live-attendance/components/panels/LiveAttendanceLogPanel.vue";
import { useLiveAttendance } from "@/features/live-attendance/useLiveAttendance";

type EmployeeDetail = {
  id: number;
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
  email: string;
  workArrangement: "onsite" | "remote" | "freelance";
  employmentType: "kontrak" | "tetap";
  timeOff?: {
    reason: string;
    dateLabel: string;
    status: "pending" | "approved";
  };
};

const selectedOffEmployee = ref<EmployeeDetail | null>(null);
const selectedEmployee = ref<EmployeeDetail | null>(null);

function formatWorkArrangement(value: EmployeeDetail["workArrangement"]): string {
  if (value === "remote") return "Remote";
  if (value === "freelance") return "Freelance";
  return "Onsite";
}

function formatEmploymentType(value: EmployeeDetail["employmentType"]): string {
  return value === "tetap" ? "Tetap" : "Kontrak";
}

const {
  isFullscreen,
  status,
  currentTime,
  duration,
  showFaceModal,
  showNoteModal,
  showMapModal,
  showLogDetail,
  selectedLogEntry,
  isRefreshing,
  pendingAction,
  isInArea,
  note,
  activeTab,
  showLogPanel,
  selectedMonth,
  monthDropdownOpen,
  monthDropdownRef,
  employeeSearch,
  showEmployeeFilterModal,
  employeeFilter,
  employeeRoleFilter,
  greeting,
  displayTime,
  displaySeconds,
  actionButtonClass,
  filteredMonthlyLogs,
  monthOptions,
  selectedMonthLabel,
  employeeStatusOptions,
  employeeRoleOptions,
  employeeFilterLabel,
  employeeRoleFilterLabel,
  offTodayEmployees,
  filteredEmployees,
  todayClockNote,
  resetEmployeeFilter,
  formatDateShort,
  formatListDate,
  sessionMetaSummary,
  initiateAction,
  submitNote,
  closeNoteModal,
  startNewSession,
  openLogDetail,
  closeLogDetail,
  handleRefreshLocation,
  toggleMonthDropdown,
  selectMonth,
  mapMarkerClass,
  shortLocation,
} = useLiveAttendance();
</script>

<style scoped>
.mobile-nav-fab {
  position: absolute;
  left: 50%;
  top: -22px;
  z-index: 2;
  display: inline-flex;
  height: 48px;
  width: 48px;
  transform: translateX(-50%);
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  border: 4px solid #f8fafc;
  background: linear-gradient(180deg, #1f7cd0 0%, #0057a3 100%);
  color: #ffffff;
  box-shadow: 0 10px 22px -12px rgba(0, 75, 141, 0.95);
}

.mobile-nav-fab.is-active {
  background: linear-gradient(180deg, #1e89e7 0%, #005fb3 100%);
  box-shadow: 0 12px 24px -10px rgba(0, 75, 141, 0.98);
}

.mobile-nav-btn {
  display: inline-flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  color: rgb(148 163 184);
  font-size: 9px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.02em;
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


.employee-slide-enter-active,
.employee-slide-leave-active {
  transition: transform 0.28s ease, opacity 0.28s ease;
}

.employee-slide-enter-from,
.employee-slide-leave-to {
  transform: translateX(100%);
  opacity: 0.85;
}

@keyframes scan {
  0% {
    top: 20%;
  }
  100% {
    top: 80%;
  }
}

</style>
