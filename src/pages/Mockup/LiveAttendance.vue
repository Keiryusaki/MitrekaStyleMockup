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
            <template v-if="activeTab === 'home'">
              <section class="relative overflow-hidden rounded-b-[44px] bg-[#004b8d] px-6 pb-10 pt-[78px] text-white shadow-lg">
                <div class="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-white/10 blur-xl"></div>
                <div class="relative z-10 space-y-1">
                  <h1 class="text-2xl font-bold tracking-tight">{{ greeting }}, Eka Dian</h1>
                  <p class="text-sm text-white/75">Absen tepat waktu, pulang tenang.</p>
                </div>
              </section>

              <div class="card-glass -mt-5 mb-6 mx-6 rounded-[34px] border border-white/65 bg-white/30 p-6 shadow-[0_16px_34px_rgba(0,75,141,0.14)] backdrop-blur-2xl">
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

            <div class="px-6" :class="activeTab === 'home' ? '' : 'pt-4'">
              <template v-if="activeTab === 'home'">
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
                    @click="startNewSession"
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
                      <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="showLogPanel = true">
                        <Icon name="clipboard" class="h-5 w-5" />
                        <span class="text-[10px] font-black">Log</span>
                      </button>
                      <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="activeTab = 'employee'">
                        <Icon name="calendar-clock" class="h-5 w-5" />
                        <span class="text-[10px] font-black">Kalender</span>
                      </button>
                      <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="activeTab = 'inbox'">
                        <Icon name="bell" class="h-5 w-5" />
                        <span class="text-[10px] font-black">Inbox</span>
                      </button>
                      <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="activeTab = 'employee'">
                        <Icon name="users" class="h-5 w-5" />
                        <span class="text-[10px] font-black">Karyawan</span>
                      </button>
                      <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="activeTab = 'leave'">
                        <Icon name="send" class="h-5 w-5" />
                        <span class="text-[10px] font-black">Izin/Cuti</span>
                      </button>
                      <button class="flex flex-col items-center gap-1.5 rounded-xl bg-slate-50 py-2 text-[#004b8d]" @click="activeTab = 'account'">
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
              </template>

              <template v-else-if="activeTab === 'employee'">
                <section class="space-y-4 pb-24">
                  <div>
                    <h3 class="text-[13px] font-black text-slate-800">Siapa yang Libur Hari Ini</h3>
                    <div class="mt-3 -mx-1 flex gap-3 overflow-x-auto px-1 pb-1">
                      <div
                        v-for="emp in offTodayEmployees"
                        :key="`off-${emp.id}`"
                        class="min-w-[92px] rounded-2xl border border-slate-200 bg-white p-2 text-center shadow-[0_8px_18px_-14px_rgba(0,75,141,0.28)]"
                      >
                        <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#004b8d]/12 text-xs font-black text-[#004b8d]">
                          {{ emp.initials }}
                        </div>
                        <p class="mt-2 truncate text-[10px] font-black text-slate-700">{{ emp.name }}</p>
                      </div>
                    </div>
                  </div>

                  <article class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
                    <div class="grid grid-cols-[1fr_auto] gap-2">
                      <label class="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <Icon name="search" class="h-4 w-4 text-slate-400" />
                        <input
                          v-model="employeeSearch"
                          type="text"
                          placeholder="Cari karyawan..."
                          class="w-full bg-transparent text-[12px] font-semibold text-slate-700 outline-none placeholder:text-slate-400"
                        />
                      </label>
                      <button
                        class="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-black text-slate-600"
                        @click="showEmployeeFilterModal = true"
                      >
                        <span>Filter</span>
                        <Icon name="chevron-down" class="h-4 w-4" />
                      </button>
                    </div>
                    <p class="mt-2 text-[10px] font-bold text-slate-500">
                      Status: {{ employeeFilterLabel }} | Jabatan: {{ employeeRoleFilterLabel }}
                    </p>
                  </article>

                  <section class="space-y-2">
                    <article
                      v-for="emp in filteredEmployees"
                      :key="emp.id"
                      class="rounded-2xl border border-[#004b8d]/12 bg-white px-3 py-2.5 shadow-[0_6px_18px_rgba(0,75,141,0.10)]"
                    >
                      <div class="flex items-center gap-3">
                        <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#004b8d]/12 text-xs font-black text-[#004b8d]">
                          {{ emp.initials }}
                        </div>
                        <div class="min-w-0">
                          <p class="truncate text-[12px] font-black text-slate-800">{{ emp.name }}</p>
                          <p class="mt-0.5 truncate text-[11px] font-bold text-slate-500">{{ emp.role }}</p>
                        </div>
                      </div>
                    </article>
                  </section>
                </section>
              </template>

              <template v-else-if="activeTab === 'inbox'">
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

              <template v-else-if="activeTab === 'leave'">
                <section class="space-y-4 pb-24">
                  <div class="rounded-3xl border border-[#004b8d]/10 bg-white p-4 shadow-[0_8px_20px_-14px_rgba(0,75,141,0.35)]">
                    <div class="mb-3 flex items-center justify-between">
                      <p class="text-[11px] font-black uppercase tracking-wider text-slate-400">Izin/Cuti</p>
                      <button class="rounded-lg bg-[#004b8d] px-2.5 py-1.5 text-[10px] font-black text-white">Ajukan</button>
                    </div>
                    <div class="space-y-2">
                      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <p class="text-[12px] font-black text-slate-700">Sisa Cuti Tahunan: 9 Hari</p>
                        <p class="mt-0.5 text-[10px] font-bold text-slate-500">Periode Jan - Des 2026</p>
                      </div>
                      <div class="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2">
                        <p class="text-[12px] font-black text-slate-700">Pengajuan Terakhir: Izin Pribadi</p>
                        <p class="mt-0.5 text-[10px] font-bold text-slate-500">Status: Menunggu Persetujuan</p>
                      </div>
                    </div>
                  </div>
                </section>
              </template>

              <template v-else-if="activeTab === 'account'">
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

          <transition name="employee-slide">
            <div v-if="showLogPanel" class="absolute inset-0 z-50 flex flex-col bg-slate-50">
              <div class="flex-1 overflow-y-auto px-6 pb-24 pt-5">
                <div class="mb-4 flex items-center justify-between gap-3">
                  <h3 class="text-lg font-bold text-slate-800">Log Kehadiran</h3>
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
                        <p class="mt-1 truncate text-[10px] font-bold uppercase tracking-wide text-slate-400">
                          {{ sessionMetaSummary(item) }}
                        </p>
                      </div>
                      <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
                    </button>
                  </article>
                </div>
              </div>

              <div class="border-t border-slate-200 bg-white px-4 py-3">
                <button
                  class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#004b8d] py-2.5 text-sm font-black text-white"
                  @click="showLogPanel = false"
                >
                  <Icon name="chevron-left" class="h-4 w-4" />
                  <span>Kembali</span>
                </button>
              </div>
            </div>
          </transition>

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
                        <div class="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <div class="map-grid h-20 w-full"></div>
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
                        <div class="relative overflow-hidden rounded-lg border border-slate-200 bg-slate-100">
                          <div class="map-grid h-20 w-full"></div>
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
  scanIn: string;
  scanOut: string;
  locationIn: string;
  locationOut: string;
  mapShotIn: string;
  faceShotIn: string;
  mapShotOut: string;
  faceShotOut: string;
};

type LiveClockInMeta = {
  scanIn: string;
  locationIn: string;
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

type EmployeeStatus = "onsite" | "wfh" | "off";

type EmployeeItem = {
  id: number;
  name: string;
  role: string;
  status: EmployeeStatus;
  initials: string;
};

const isFullscreen = ref(false);
const status = ref<AttendanceStatus>("idle");
const currentTime = ref(new Date());
const clockInTime = ref<Date | null>(null);
const duration = ref("00:00:00");
const showFaceModal = ref(false);
const showNoteModal = ref(false);
const showMapModal = ref(false);
const showLogDetail = ref(false);
const selectedLogEntry = ref<AttendanceEntry | null>(null);
const isRefreshing = ref(false);
const pendingAction = ref<AttendanceAction | null>(null);
const isInArea = ref(true);
const note = ref("");
const activeTab = ref<"home" | "employee" | "inbox" | "leave" | "account">("home");
const showLogPanel = ref(false);
const selectedMonth = ref("all");
const monthDropdownOpen = ref(false);
const monthDropdownRef = ref<HTMLElement | null>(null);
const liveClockInMeta = ref<LiveClockInMeta | null>(null);
const employeeSearch = ref("");
const showEmployeeFilterModal = ref(false);
const employeeFilter = ref<"all" | EmployeeStatus>("all");
const employeeRoleFilter = ref("all");

const attendanceData = ref<AttendanceEntry[]>(createSeedAttendance());
const employeeData = ref<EmployeeItem[]>([
  { id: 1, name: "Eka Dian", role: "UI Engineer", status: "off", initials: "ED" },
  { id: 2, name: "Rizky Pratama", role: "Frontend Engineer", status: "off", initials: "RP" },
  { id: 3, name: "Nadia Putri", role: "QA Analyst", status: "off", initials: "NP" },
  { id: 4, name: "Budi Santoso", role: "Backend Engineer", status: "off", initials: "BS" },
  { id: 5, name: "Laras Wulandari", role: "Product Designer", status: "off", initials: "LW" },
  { id: 6, name: "Fikri Maulana", role: "Project Manager", status: "wfh", initials: "FM" },
  { id: 7, name: "Dewi Kurnia", role: "HR Business Partner", status: "off", initials: "DK" },
  { id: 8, name: "Galih Saputra", role: "DevOps Engineer", status: "onsite", initials: "GS" },
  { id: 9, name: "Mita Ayu", role: "Finance Officer", status: "wfh", initials: "MA" },
]);

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
  const mockScanResults = ["Face Match 99%", "Face Match 98%", "Face Match 97%", "Face Match 96%"];
  const workLocations = ["Office Sudirman", "Onsite Client - Astra Tower", "WFH - Rumah"];

  const entries: AttendanceEntry[] = [];
  let idCounter = 1;
  const startDate = new Date();
  startDate.setHours(8, 0, 0, 0);
  startDate.setDate(startDate.getDate() - 1);

  for (let i = 0; i < 70; i += 1) {
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
    const location = workLocations[i % workLocations.length] ?? "Office Sudirman";
    const isOutsideOffice = location !== "Office Sudirman";
    const sessionNote = isOutsideOffice ? mockNotes[i % mockNotes.length] ?? "" : "";

    // 2 dari 3 hari dibuat 1 sesi supaya list log lebih realistis.
    const isOneSessionDay = i % 3 !== 0;
    const faceSeed = 12 + (i % 40);
    const inMapShot = mapSnapshotByLocation(location, i);
    const outMapShot = mapSnapshotByLocation(location, i + 1);
    const inFaceShot = faceSnapshotBySeed(faceSeed);
    const outFaceShot = faceSnapshotBySeed(faceSeed + 1);
    const sessions: SessionLog[] = isOneSessionDay
      ? [
          {
            in: firstIn,
            out: lastOut,
            note: sessionNote,
            scanIn: mockScanResults[i % mockScanResults.length] ?? "Face Match 98%",
            scanOut: mockScanResults[(i + 1) % mockScanResults.length] ?? "Face Match 98%",
            locationIn: location,
            locationOut: location,
            mapShotIn: inMapShot,
            faceShotIn: inFaceShot,
            mapShotOut: outMapShot,
            faceShotOut: outFaceShot,
          },
        ]
      : [
          {
            in: firstIn,
            out: noonOut,
            note: "",
            scanIn: mockScanResults[i % mockScanResults.length] ?? "Face Match 98%",
            scanOut: mockScanResults[(i + 1) % mockScanResults.length] ?? "Face Match 98%",
            locationIn: location,
            locationOut: location,
            mapShotIn: inMapShot,
            faceShotIn: inFaceShot,
            mapShotOut: outMapShot,
            faceShotOut: outFaceShot,
          },
          {
            in: noonIn,
            out: lastOut,
            note: sessionNote,
            scanIn: mockScanResults[(i + 2) % mockScanResults.length] ?? "Face Match 97%",
            scanOut: mockScanResults[(i + 3) % mockScanResults.length] ?? "Face Match 97%",
            locationIn: location,
            locationOut: location,
            mapShotIn: mapSnapshotByLocation(location, i + 2),
            faceShotIn: faceSnapshotBySeed(faceSeed + 2),
            mapShotOut: mapSnapshotByLocation(location, i + 3),
            faceShotOut: faceSnapshotBySeed(faceSeed + 3),
          },
        ];

    entries.push({
      id: idCounter,
      day: dayNames[dayIndex] ?? "Senin",
      dateKey,
      dayOfMonth: dd,
      firstIn: sessions[0]?.in ?? firstIn,
      lastOut: sessions[sessions.length - 1]?.out ?? lastOut,
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

const employeeStatusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "onsite", label: "On Site" },
  { value: "wfh", label: "WFH" },
  { value: "off", label: "Libur" },
] as const;

const employeeRoleOptions = computed(() => {
  const roles = [...new Set(employeeData.value.map((item) => item.role))];
  return [{ value: "all", label: "Semua Jabatan" }, ...roles.map((role) => ({ value: role, label: role }))];
});

const employeeFilterLabel = computed(
  () => employeeStatusOptions.find((opt) => opt.value === employeeFilter.value)?.label ?? "Semua Status",
);
const employeeRoleFilterLabel = computed(
  () => employeeRoleOptions.value.find((opt) => opt.value === employeeRoleFilter.value)?.label ?? "Semua Jabatan",
);

const offTodayEmployees = computed(() => employeeData.value.filter((item) => item.status === "off"));
const filteredEmployees = computed(() => {
  const query = employeeSearch.value.trim().toLowerCase();

  return employeeData.value.filter((item) => {
    const passStatus = employeeFilter.value === "all" || item.status === employeeFilter.value;
    const passRole = employeeRoleFilter.value === "all" || item.role === employeeRoleFilter.value;
    if (!passStatus) return false;
    if (!passRole) return false;
    if (!query) return true;
    return item.name.toLowerCase().includes(query) || item.role.toLowerCase().includes(query);
  });
});

function resetEmployeeFilter(): void {
  employeeFilter.value = "all";
  employeeRoleFilter.value = "all";
}

const todayClockNote = computed(() => {
  const today = new Date(currentTime.value);
  const todayKey = toDateKey(today);
  const todayEntry = attendanceData.value.find((item) => item.dateKey === todayKey);

  if (status.value === "in") {
    return {
      status: "Sedang Bekerja",
      clockIn: clockInTime.value ? toTime(clockInTime.value) : todayEntry?.firstIn ?? "",
      clockOut: "",
    };
  }

  if (!todayEntry) {
    return {
      status: "Belum Check-in",
      clockIn: "",
      clockOut: "",
    };
  }

  return {
    status: todayEntry.lastOut ? "Selesai" : "Sudah Check-in",
    clockIn: todayEntry.firstIn,
    clockOut: todayEntry.lastOut,
  };
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

function sessionMetaSummary(item: AttendanceEntry): string {
  const sessionCount = item.sessions.length;
  return `${sessionCount} sesi`;
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

function mapSnapshotByLocation(location: string, seed: number): string {
  const centerByLocation: Record<string, string> = {
    "Office Sudirman": "-6.2088,106.8456",
    "Onsite Client - Astra Tower": "-6.1928,106.8217",
    "WFH - Rumah": "-6.2297,106.8294",
  };
  const center = centerByLocation[location] ?? "-6.2088,106.8456";
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${center}&zoom=15&size=320x220&markers=${center},red-pushpin&maptype=mapnik&seed=${seed}`;
}

function faceSnapshotBySeed(seed: number): string {
  return `https://i.pravatar.cc/320?img=${seed}`;
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
    const inMeta: LiveClockInMeta = {
      scanIn: buildScanResult(),
      locationIn: currentLocationLabel(),
    };
    status.value = "in";
    clockInTime.value = new Date();
    liveClockInMeta.value = inMeta;
    duration.value = "00:00:00";
  } else {
    const clockOut = new Date();
    const start = clockInTime.value;

    if (start) {
      upsertAttendance(start, clockOut, note.value.trim(), liveClockInMeta.value);
    }

    status.value = "out";
    clockInTime.value = null;
    liveClockInMeta.value = null;
    duration.value = "00:00:00";
  }

  note.value = "";
  pendingAction.value = null;
}

function upsertAttendance(start: Date, end: Date, noteText: string, clockInMeta: LiveClockInMeta | null): void {
  const dateKey = toDateKey(start);
  const day = getDayName(start);
  const dayOfMonth = String(start.getDate());

  const newSession: SessionLog = {
    in: toTime(start),
    out: toTime(end),
    note: noteText,
    scanIn: clockInMeta?.scanIn ?? buildScanResult(),
    scanOut: buildScanResult(),
    locationIn: clockInMeta?.locationIn ?? currentLocationLabel(),
    locationOut: currentLocationLabel(),
    mapShotIn: mapSnapshotByLocation(clockInMeta?.locationIn ?? currentLocationLabel(), Date.now()),
    faceShotIn: faceSnapshotBySeed(20 + Math.floor(Math.random() * 40)),
    mapShotOut: mapSnapshotByLocation(currentLocationLabel(), Date.now() + 1),
    faceShotOut: faceSnapshotBySeed(20 + Math.floor(Math.random() * 40)),
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

function buildScanResult(): string {
  const score = 96 + Math.floor(Math.random() * 4);
  return `Face Match ${score}%`;
}

function currentLocationLabel(): string {
  return isInArea.value ? "Office Sudirman" : "Luar Area (dengan catatan)";
}

function mapMarkerClass(location: string): string {
  if (location.includes("Client")) return "left-[68%] top-[42%]";
  if (location.includes("WFH") || location.includes("Rumah")) return "left-[30%] top-[62%]";
  return "left-[52%] top-[38%]";
}

function shortLocation(location: string): string {
  if (location.includes("Client")) return "Onsite Client";
  if (location.includes("WFH") || location.includes("Rumah")) return "WFH";
  if (location.includes("Sudirman")) return "Office";
  return "Lokasi";
}
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
