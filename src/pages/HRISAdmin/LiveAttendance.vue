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

          <main
            class="content-scroll absolute inset-x-0 bottom-0 top-0 z-20 overflow-y-auto pb-2"
            :class="activeTab === 'home' ? '' : 'bg-white'"
          >
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
              :latest-announcements="latestAnnouncements"
              :format-date-short="formatDateShort"
              @open-map="showMapModal = true"
              @initiate-action="initiateAction"
              @start-new-session="startNewSession"
              @open-log="showLogPanel = true"
              @open-calendar="openCalendarScreen"
              @open-announcement-detail="openAnnouncementDetailById"
              @open-all-announcements="openAnnouncementListScreen"
              @open-request="openRequestSheet"
              @navigate-tab="activeTab = $event"
            />

            <div v-else class="px-3">
              <LiveAttendanceEmployeeTab
                v-if="activeTab === 'employee'"
                :off-today-employees="offTodayEmployees"
                :employee-search="employeeSearch"
                :employee-filter-label="employeeFilterLabel"
                :employee-role-filter-label="employeeRoleFilterLabel"
                :filtered-employees="filteredEmployees"
                @update:employee-search="employeeSearch = $event"
                @open-filter="openEmployeeFilterDrawer"
                @open-time-off-detail="openOffEmployeeDetailDrawer"
                @open-employee-detail="openEmployeeDetailDrawer"
                @navigate-home="activeTab = 'home'"
              />

              <LiveAttendanceInboxTab v-else-if="activeTab === 'inbox'" @navigate-home="activeTab = 'home'" />

              <LiveAttendanceAccountTab v-else-if="activeTab === 'account'" @navigate-home="activeTab = 'home'" />
            </div>
          </main>

          <nav class="absolute bottom-0 left-0 right-0 z-30 border-t border-slate-100 bg-white px-6 py-3 shadow-[0_-10px_22px_-16px_rgba(0,75,141,0.32)]">
            <button
              class="mobile-nav-fab"
              :class="showRequestSheet || showTimeOffForm ? 'is-active' : ''"
              @click="openRequestSheet"
              aria-label="Permohonan"
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

          <Transition name="request-overlay-fade">
            <div
              v-if="showRequestSheet"
              class="absolute inset-0 z-[58] flex items-end bg-slate-900/45 backdrop-blur-[1px]"
              @click="closeRequestSheet"
            >
              <div class="request-sheet-transition-target w-full" @click.stop>
                  <div
                    class="request-sheet-panel w-full rounded-t-[30px] bg-white shadow-2xl"
                    :style="requestSheetStyle"
                  >
                  <div
                    class="request-sheet-drag-zone cursor-grab active:cursor-grabbing"
                    @pointerdown="startRequestSheetDrag"
                    @pointermove="moveRequestSheetDrag"
                    @pointerup="endRequestSheetDrag"
                    @pointercancel="endRequestSheetDrag"
                  >
                    <div class="flex justify-center pt-2.5">
                      <span class="h-1.5 w-14 rounded-full bg-slate-300"></span>
                    </div>
                  </div>

                  <div class="mt-2 flex items-center justify-between border-b border-slate-200 px-6 pb-4">
                    <h3 class="text-[17px] font-black text-slate-800">Permohonan</h3>
                    <button class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100" @click.stop="closeRequestSheet">
                      <Icon name="x" class="h-5 w-5" />
                    </button>
                  </div>

                  <div class="px-4 py-2">
                    <button
                      disabled
                      aria-disabled="true"
                      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-800 opacity-45 transition disabled:cursor-not-allowed"
                    >
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon name="clipboard" class="h-5 w-5" />
                      </span>
                      <span class="flex-1 text-[15px] font-semibold">Reimbursement</span>
                      <span class="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Belum Ready
                      </span>
                    </button>
                    <button
                      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-800 transition hover:bg-slate-50"
                      @click="openTimeOffForm"
                    >
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#004b8d]">
                        <Icon name="clock" class="h-5 w-5" />
                      </span>
                      <span class="flex-1 text-[15px] font-semibold">Izin/Cuti (Time Off)</span>
                      <Icon name="chevron-right" class="h-5 w-5 text-slate-400" />
                    </button>
                    <button
                      disabled
                      aria-disabled="true"
                      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-800 opacity-45 transition disabled:cursor-not-allowed"
                    >
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon name="map-pin" class="h-5 w-5" />
                      </span>
                      <span class="flex-1 text-[15px] font-semibold">Attendance</span>
                      <span class="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Belum Ready
                      </span>
                    </button>
                    <button
                      disabled
                      aria-disabled="true"
                      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-800 opacity-45 transition disabled:cursor-not-allowed"
                    >
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon name="settings" class="h-5 w-5" />
                      </span>
                      <span class="flex-1 text-[15px] font-semibold">Change Shift</span>
                      <span class="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Belum Ready
                      </span>
                    </button>
                    <button
                      disabled
                      aria-disabled="true"
                      class="flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-800 opacity-45 transition disabled:cursor-not-allowed"
                    >
                      <span class="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                        <Icon name="user" class="h-5 w-5" />
                      </span>
                      <span class="flex-1 text-[15px] font-semibold">Change Data</span>
                      <span class="rounded-full border border-slate-300 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-slate-500">
                        Belum Ready
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <Transition name="request-form-slide">
            <div v-if="showTimeOffForm" class="absolute inset-0 z-[59] flex flex-col bg-white">
            <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
              <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="backToRequestSheet">
                <Icon name="arrow-left" class="h-5 w-5" />
              </button>
              <h3 class="flex-1 text-center text-[17px] font-black">Permohonan Izin/Cuti</h3>
              <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="closeTimeOffForm">
                <Icon name="x" class="h-5 w-5" />
              </button>
            </header>

            <div class="flex-1 overflow-y-auto px-5 pb-6 pt-4">
              <div class="space-y-5">
                <label class="block">
                  <div class="mb-2 flex items-center gap-3 text-slate-500">
                    <Icon name="clipboard" class="h-5 w-5" />
                    <span class="text-[14px] font-semibold">Tipe Izin/Cuti</span>
                  </div>
                  <div class="border-b border-slate-300 pb-3">
                    <MitrekaSelectDropdown
                      v-model="timeOffForm.type"
                      :options="timeOffTypeSelectOptions"
                      placeholder="Pilih tipe time off"
                      size="sm"
                      variant="outline"
                      color="default"
                    />
                  </div>
                </label>

                <label class="block">
                  <div class="mb-2 flex items-center gap-3 text-slate-500">
                    <Icon name="calendar" class="h-5 w-5" />
                    <span class="text-[14px] font-semibold">Tanggal (Range)</span>
                  </div>
                  <div class="space-y-2 border-b border-slate-300 pb-3">
                    <MitrekaDateTimePicker
                      v-model="timeOffForm.dateRange"
                      mode="range"
                      clearable
                      placeholder="Pilih rentang tanggal"
                      input-class="input input-sm w-full bg-white"
                    />
                    <p class="text-[12px] text-slate-500">
                      {{
                        timeOffForm.dateRange.length === 2
                          ? `${timeOffForm.dateRange[0]} s/d ${timeOffForm.dateRange[1]}`
                          : "Bisa pilih lebih dari 1 hari."
                      }}
                    </p>
                  </div>
                </label>

                <label class="block">
                  <div class="mb-2 flex items-center gap-3 text-slate-500">
                    <Icon name="layout-list" class="h-5 w-5" />
                    <span class="text-[14px] font-semibold">Alasan</span>
                  </div>
                  <div class="border-b border-slate-300 pb-2">
                    <textarea
                      v-model="timeOffForm.reason"
                      rows="3"
                      class="w-full resize-none bg-transparent text-[15px] text-slate-700 outline-none"
                      placeholder="Tuliskan alasan pengajuan..."
                    ></textarea>
                  </div>
                </label>

                <label class="block">
                  <div class="mb-2 flex items-center gap-3 text-slate-500">
                    <Icon name="user" class="h-5 w-5" />
                    <span class="text-[14px] font-semibold">Delegasikan ke (opsional)</span>
                  </div>
                  <div class="border-b border-slate-300 pb-2">
                    <input
                      v-model="timeOffForm.delegate"
                      type="text"
                      class="w-full bg-transparent text-[15px] text-slate-700 outline-none"
                      placeholder="Pilih rekan untuk approval"
                    />
                  </div>
                </label>

                <div class="border-b border-slate-300 pb-5">
                  <div class="mb-2 flex items-center gap-3 text-slate-500">
                    <Icon name="fileText" class="h-5 w-5" />
                    <span class="text-[14px] font-semibold">Upload file</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <label class="inline-flex h-14 w-14 cursor-pointer items-center justify-center rounded-xl border-2 border-slate-300 bg-white text-slate-500 transition hover:border-[#004b8d] hover:text-[#004b8d]">
                      <input type="file" class="hidden" @change="handleTimeOffFile" />
                      <Icon name="plus" class="h-6 w-6" />
                    </label>
                    <div class="text-[12px] text-slate-500">
                      <p class="font-semibold text-slate-700">{{ timeOffForm.fileName || "Belum ada file dipilih" }}</p>
                      <p>Maks. ukuran file 10 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="border-t border-slate-200 bg-white px-5 py-4">
              <button class="w-full rounded-2xl bg-[#005fb3] py-3 text-[18px] font-black text-white" @click="submitTimeOffRequest">
                Submit request
              </button>
            </div>
            </div>
          </Transition>

          <Transition name="calendar-screen-slide">
            <div v-if="showCalendarScreen" class="absolute inset-0 z-[61] flex flex-col bg-white">
              <header class="flex h-[56px] items-center px-4 text-slate-800">
                <button class="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100" @click="closeCalendarScreen">
                  <Icon name="arrow-left" class="h-5 w-5" />
                </button>
                <button class="ml-2 inline-flex items-center gap-1 rounded-full px-2 py-1 text-[20px] font-bold tracking-tight text-slate-800" @click="toggleCalendarMonthMenu">
                  {{ calendarMonthLabel }}
                  <Icon name="chevron-down" class="h-5 w-5 text-slate-500" />
                </button>
                <button class="ml-auto rounded-lg px-2 py-1 text-[14px] font-semibold text-[#4f67d9]" @click="jumpCalendarToToday">Today</button>
              </header>

              <div v-if="calendarMonthDropdownOpen" class="calendar-month-dropdown absolute left-8 top-[56px] z-[2] w-[228px] rounded-2xl border border-slate-200 bg-white p-2 shadow-lg">
                <button class="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50" @click="goToPreviousCalendarMonth">
                  <span>Bulan Sebelumnya</span>
                  <Icon name="chevron-left" class="h-4 w-4 text-slate-400" />
                </button>
                <button class="mt-1 flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm font-bold text-slate-700 transition hover:bg-slate-50" @click="goToNextCalendarMonth">
                  <span>Bulan Berikutnya</span>
                  <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
                </button>
              </div>

              <div class="px-5 pt-3">
                <div class="grid grid-cols-7 text-center text-[12px] font-semibold text-slate-500">
                  <span v-for="weekday in calendarWeekdayLabels" :key="weekday" class="py-1">{{ weekday }}</span>
                </div>

                <div class="mt-1 grid grid-cols-7 gap-y-2 text-center">
                  <button
                    v-for="day in calendarGridDays"
                    :key="day.key"
                    class="calendar-day-btn relative mx-auto flex h-12 w-12 items-center justify-center rounded-xl text-[15px] font-medium transition"
                    :class="dayCellClass(day)"
                    @click="selectCalendarDate(day.date)"
                  >
                    <span>{{ day.date.getDate() }}</span>
                    <span
                      v-if="day.hasAnyEvent && !day.isSelected"
                      class="absolute bottom-1.5 h-1.5 w-1.5 rounded-full"
                      :class="day.isToday ? 'bg-amber-600' : 'bg-[#4f67d9]'"
                    ></span>
                  </button>
                </div>
              </div>

              <div class="px-5 pb-3 pt-6">
                <button class="mx-auto inline-flex items-center gap-1 text-[15px] font-semibold text-[#4f67d9]" @click="openCalendarMonthDrawer">
                  <span>View all events this month</span>
                  <Icon name="arrow-right" class="h-5 w-5" />
                </button>
              </div>

              <div class="mt-2 flex min-h-0 flex-1 flex-col rounded-t-[30px] border-t border-slate-200 bg-slate-50 pb-4">
                <div class="rounded-t-[30px] bg-[#004b8d] px-5 py-3 text-white">
                  <h4 class="text-[16px] font-bold">{{ selectedCalendarDateLabel }}</h4>
                </div>

                <div class="flex-1 overflow-y-auto px-5 py-3">
                  <div class="space-y-2 pb-2">
                    <section v-for="section in calendarSections" :key="section.key" class="rounded-2xl bg-white px-3 py-3">
                      <button class="flex w-full items-center justify-between text-left" @click="toggleCalendarSection(section.key)">
                        <h5 class="text-[14px] font-bold text-slate-800">{{ section.label }} ({{ section.items.length }})</h5>
                        <Icon :name="calendarSectionExpanded[section.key] ? 'chevron-down' : 'chevron-right'" class="h-5 w-5 text-slate-400" />
                      </button>

                      <div v-if="calendarSectionExpanded[section.key] && section.items.length > 0" class="mt-3 space-y-2">
                        <article v-for="item in section.items" :key="item.id" class="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-2.5">
                          <img v-if="item.avatarUrl" :src="item.avatarUrl" :alt="item.title" class="h-10 w-10 rounded-full object-cover" />
                          <span v-else class="inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <Icon :name="categoryIconMap[item.category]" class="h-5 w-5" />
                          </span>
                          <div class="min-w-0 flex-1">
                            <p class="truncate text-[13px] font-semibold text-slate-800">{{ item.title }}</p>
                            <p class="truncate text-[12px] text-slate-500">{{ item.subtitle }}</p>
                          </div>
                          <Icon name="chevron-right" class="h-4 w-4 text-slate-300" />
                        </article>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </Transition>

          <Transition name="request-overlay-fade">
            <div v-if="showCalendarMonthDrawer" class="absolute inset-0 z-[62] flex items-end bg-slate-900/45 backdrop-blur-[1px]" @click="closeCalendarMonthDrawer">
              <div class="request-sheet-transition-target w-full" @click.stop>
                  <div
                    class="request-sheet-panel w-full rounded-t-[30px] bg-white shadow-2xl"
                    :style="calendarMonthDrawerStyle"
                  >
                  <div
                    class="request-sheet-drag-zone cursor-grab active:cursor-grabbing"
                    @pointerdown="startCalendarMonthDrawerDrag"
                    @pointermove="moveCalendarMonthDrawerDrag"
                    @pointerup="endCalendarMonthDrawerDrag"
                    @pointercancel="endCalendarMonthDrawerDrag"
                  >
                    <div class="flex justify-center pt-2.5">
                      <span class="h-1.5 w-14 rounded-full bg-slate-300"></span>
                    </div>
                  </div>

                  <div class="mt-2 flex items-center justify-between border-b border-slate-200 px-6 pb-4">
                    <button class="inline-flex items-center gap-1 text-[20px] font-bold tracking-tight text-slate-800" @click="toggleCalendarMonthMenu">
                      {{ calendarMonthLabel }}
                      <Icon name="chevron-down" class="h-5 w-5 text-slate-500" />
                    </button>
                    <button class="rounded-full p-2 text-slate-500 transition hover:bg-slate-100" @click="closeCalendarMonthDrawer">
                      <Icon name="x" class="h-6 w-6" />
                    </button>
                  </div>

                  <div class="border-b border-slate-200 px-3 pb-1 pt-3">
                    <div class="grid grid-cols-4 gap-1">
                      <button
                        v-for="tab in calendarMonthTabs"
                        :key="tab.key"
                        class="flex flex-col items-center gap-0.5 rounded-xl px-2 py-2 text-center transition"
                        :class="activeCalendarMonthTab === tab.key ? 'text-[#4f67d9]' : 'text-slate-500 hover:bg-slate-50'"
                        @click="activeCalendarMonthTab = tab.key"
                      >
                        <Icon :name="tab.icon" class="h-6 w-6" />
                        <span class="text-[11px] font-bold">{{ tab.label }} ({{ calendarMonthCountByCategory[tab.key] }})</span>
                        <span v-if="activeCalendarMonthTab === tab.key" class="mt-1 h-0.5 w-full rounded-full bg-[#4f67d9]"></span>
                      </button>
                    </div>
                  </div>

                  <div class="px-4 pt-4">
                    <label class="flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2.5">
                      <Icon name="search" class="h-5 w-5 text-slate-400" />
                      <input
                        v-model="calendarMonthSearch"
                        type="text"
                        class="w-full bg-transparent text-[14px] text-slate-700 outline-none"
                        placeholder="Search event"
                      />
                    </label>
                  </div>

                  <div class="mt-4 max-h-[54vh] overflow-y-auto px-6 pb-8">
                    <div v-if="calendarMonthFilteredGroups.length === 0" class="rounded-2xl border border-dashed border-slate-200 px-4 py-10 text-center">
                      <p class="text-[14px] font-semibold text-slate-500">Tidak ada event pada filter ini.</p>
                    </div>

                    <div v-else class="space-y-6">
                      <section v-for="group in calendarMonthFilteredGroups" :key="group.dateKey" class="space-y-3">
                        <h4 class="text-[15px] font-bold text-slate-600">{{ formatCalendarDateFromKey(group.dateKey) }}</h4>
                        <article v-for="item in group.items" :key="item.id" class="flex items-center gap-3">
                          <img v-if="item.avatarUrl" :src="item.avatarUrl" :alt="item.title" class="h-11 w-11 rounded-full object-cover" />
                          <span v-else class="inline-flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                            <Icon :name="categoryIconMap[item.category]" class="h-5 w-5" />
                          </span>
                          <div class="min-w-0 flex-1">
                            <p class="truncate text-[14px] font-semibold text-slate-800">{{ item.title }}</p>
                            <p class="truncate text-[12px] text-slate-500">{{ item.subtitle }}</p>
                          </div>
                        </article>
                      </section>
                    </div>
                  </div>
                  </div>
              </div>
            </div>
          </Transition>

          <Transition name="calendar-screen-slide">
            <div v-if="showAnnouncementListScreen" class="absolute inset-0 z-[61] flex flex-col bg-white">
              <header class="flex h-[56px] items-center bg-[#004b8d] px-4 text-white">
                <button class="rounded-full p-1.5 transition hover:bg-white/15" @click="closeAnnouncementListScreen">
                  <Icon name="arrow-left" class="h-5 w-5" />
                </button>
                <h3 class="flex-1 text-center text-[16px] font-bold">Semua Pengumuman</h3>
                <span class="w-8"></span>
              </header>

              <div class="border-b border-slate-200 px-4 py-3">
                <label class="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2">
                  <Icon name="search" class="h-4 w-4 text-slate-400" />
                  <input
                    v-model="announcementSearch"
                    type="text"
                    class="w-full bg-transparent text-[13px] text-slate-700 outline-none"
                    placeholder="Cari pengumuman"
                  />
                </label>
              </div>

              <div class="flex-1 overflow-y-auto px-4 py-2">
                <div v-if="filteredAnnouncements.length === 0" class="rounded-xl border border-dashed border-slate-200 px-4 py-10 text-center">
                  <p class="text-[13px] font-semibold text-slate-500">Pengumuman tidak ditemukan.</p>
                </div>
                <div v-else class="overflow-hidden rounded-xl border border-slate-200 bg-white divide-y divide-slate-200">
                  <button
                    v-for="item in filteredAnnouncements"
                    :key="item.id"
                    class="flex w-full items-center gap-3 px-3 py-3 text-left transition hover:bg-slate-50"
                    @click="openAnnouncementDetail(item)"
                  >
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-[12px] font-semibold text-slate-800">{{ item.title }}</p>
                      <div class="mt-1 flex items-center gap-1.5 text-[10px] font-medium text-slate-500">
                        <span>by</span>
                        <img :src="item.creatorAvatar" :alt="item.creatorName" class="h-4 w-4 rounded-full object-cover" />
                        <span class="truncate">{{ item.creatorName }}</span>
                      </div>
                    </div>
                    <Icon name="chevron-right" class="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>
          </Transition>

          <Transition name="request-overlay-fade">
            <div
              v-if="showAnnouncementDetailDrawer && selectedAnnouncement"
              class="absolute inset-0 z-[63] flex items-end bg-slate-900/45 backdrop-blur-[1px]"
              @click="closeAnnouncementDetailDrawer"
            >
              <div class="request-sheet-transition-target w-full" @click.stop>
                  <div
                    class="w-full rounded-t-[28px] bg-white shadow-2xl"
                    :style="announcementDetailDrawerStyle"
                  >
                    <div
                      class="request-sheet-drag-zone cursor-grab active:cursor-grabbing"
                      @pointerdown="startAnnouncementDrawerDrag"
                      @pointermove="moveAnnouncementDrawerDrag"
                      @pointerup="endAnnouncementDrawerDrag"
                      @pointercancel="endAnnouncementDrawerDrag"
                    >
                      <div class="flex justify-center pt-2.5">
                        <span class="h-1.5 w-14 rounded-full bg-slate-300"></span>
                      </div>
                    </div>
                    <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3">
                      <h3 class="truncate pr-3 text-[15px] font-bold text-slate-800">{{ selectedAnnouncement.title }}</h3>
                      <button class="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100" @click="closeAnnouncementDetailDrawer">
                        <Icon name="x" class="h-5 w-5" />
                      </button>
                    </div>
                    <div class="max-h-[62vh] overflow-y-auto px-5 py-4">
                      <p class="text-[11px] font-semibold uppercase tracking-wide text-[#004b8d]">{{ selectedAnnouncement.category }}</p>
                      <p class="mt-1 text-[11px] text-slate-500">{{ formatAnnouncementDate(selectedAnnouncement.publishedAt) }}</p>
                      <div class="mt-2 flex items-center gap-2 text-[12px] font-medium text-slate-600">
                        <span>by</span>
                        <img :src="selectedAnnouncement.creatorAvatar" :alt="selectedAnnouncement.creatorName" class="h-5 w-5 rounded-full object-cover" />
                        <span>{{ selectedAnnouncement.creatorName }}</span>
                      </div>
                      <p class="mt-3 whitespace-pre-line text-[13px] leading-relaxed text-slate-700">{{ selectedAnnouncement.content }}</p>
                    </div>
                  </div>
              </div>
            </div>
          </Transition>

          <Transition name="request-overlay-fade">
            <div
              v-if="showEmployeeFilterModal"
              class="absolute inset-0 z-[55] flex items-end bg-slate-900/45 p-4 backdrop-blur-[1px]"
              @click="closeEmployeeFilterDrawer"
            >
              <div class="request-sheet-transition-target w-full" @click.stop>
                  <div class="w-full rounded-3xl bg-white p-4 shadow-2xl" :style="employeeFilterDrawerStyle">
                    <div
                      class="request-sheet-drag-zone -mx-4 -mt-3 mb-2 cursor-grab px-4 pt-1 active:cursor-grabbing"
                      @pointerdown="startEmployeeFilterDrawerDrag"
                      @pointermove="moveEmployeeFilterDrawerDrag"
                      @pointerup="endEmployeeFilterDrawerDrag"
                      @pointercancel="endEmployeeFilterDrawerDrag"
                    >
                      <div class="flex justify-center py-2">
                        <span class="h-1.5 w-14 rounded-full bg-slate-300"></span>
                      </div>
                    </div>
                    <div class="mb-3 flex items-center justify-between">
                      <h3 class="text-[14px] font-black text-slate-800">Filter Karyawan</h3>
                      <button class="rounded-full bg-slate-100 p-2" @click="closeEmployeeFilterDrawer">
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
                        @click="closeEmployeeFilterDrawer"
                      >
                        Terapkan
                      </button>
                    </div>
                  </div>
              </div>
            </div>
          </Transition>

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

          <Transition name="request-overlay-fade">
            <div
              v-if="selectedOffEmployee"
              class="absolute inset-0 z-[60] flex items-end bg-slate-900/45 backdrop-blur-[1px]"
              @click="closeOffEmployeeDetailDrawer"
            >
              <div class="request-sheet-transition-target w-full" @click.stop>
                <div class="w-full rounded-t-[28px] bg-white shadow-2xl" :style="employeeDetailDrawerStyle">
                  <div
                    class="request-sheet-drag-zone cursor-grab active:cursor-grabbing"
                    @pointerdown="startEmployeeDetailDrawerDrag"
                    @pointermove="moveEmployeeDetailDrawerDrag"
                    @pointerup="endEmployeeDetailDrawerDrag"
                    @pointercancel="endEmployeeDetailDrawerDrag"
                  >
                    <div class="flex justify-center pt-2.5">
                      <span class="h-1.5 w-14 rounded-full bg-slate-300"></span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3">
                    <h3 class="text-[15px] font-black text-slate-800">Detail Time Off</h3>
                    <button class="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100" @click="closeOffEmployeeDetailDrawer">
                      <Icon name="x" class="h-5 w-5" />
                    </button>
                  </div>

                  <div class="max-h-[62vh] space-y-3 overflow-y-auto px-5 py-4">
                    <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#004b8d]/12 text-[11px] font-black text-[#004b8d]">
                        {{ selectedOffEmployee.initials }}
                      </div>
                      <div>
                        <p class="text-[12px] font-black text-slate-800">{{ selectedOffEmployee.name }}</p>
                        <p class="text-[11px] font-bold text-slate-500">{{ selectedOffEmployee.role }}</p>
                      </div>
                    </div>
                    <div class="space-y-2 text-[11px]">
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
            </div>
          </Transition>

          <Transition name="request-overlay-fade">
            <div
              v-if="selectedEmployee"
              class="absolute inset-0 z-[60] flex items-end bg-slate-900/45 backdrop-blur-[1px]"
              @click="closeEmployeeDetailDrawer"
            >
              <div class="request-sheet-transition-target w-full" @click.stop>
                <div class="w-full rounded-t-[28px] bg-white shadow-2xl" :style="employeeDetailDrawerStyle">
                  <div
                    class="request-sheet-drag-zone cursor-grab active:cursor-grabbing"
                    @pointerdown="startEmployeeDetailDrawerDrag"
                    @pointermove="moveEmployeeDetailDrawerDrag"
                    @pointerup="endEmployeeDetailDrawerDrag"
                    @pointercancel="endEmployeeDetailDrawerDrag"
                  >
                    <div class="flex justify-center pt-2.5">
                      <span class="h-1.5 w-14 rounded-full bg-slate-300"></span>
                    </div>
                  </div>

                  <div class="flex items-center justify-between border-b border-slate-200 px-5 py-3">
                    <h3 class="text-[15px] font-black text-slate-800">Detail Karyawan</h3>
                    <button class="rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100" @click="closeEmployeeDetailDrawer">
                      <Icon name="x" class="h-5 w-5" />
                    </button>
                  </div>

                  <div class="max-h-[62vh] overflow-y-auto px-5 py-4">
                    <div class="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5">
                      <div class="flex h-11 w-11 items-center justify-center rounded-full bg-[#004b8d]/12 text-[11px] font-black text-[#004b8d]">
                        {{ selectedEmployee.initials }}
                      </div>
                      <div>
                        <p class="text-[12px] font-black text-slate-800">{{ selectedEmployee.name }}</p>
                        <p class="text-[11px] font-bold text-slate-500">{{ selectedEmployee.role }}</p>
                      </div>
                    </div>

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
          </Transition>
        </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch } from "vue";
import {
  DateTimePicker as MitrekaDateTimePicker,
  SelectDropdown as MitrekaSelectDropdown,
} from "@/lib/mitreka-ui-dist/vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";
import mitrekaLogo from "@/assets/logo.png";
import LiveAttendanceHomeTab from "@/features/hris-admin/live-attendance/components/tabs/LiveAttendanceHomeTab.vue";
import LiveAttendanceEmployeeTab from "@/features/hris-admin/live-attendance/components/tabs/LiveAttendanceEmployeeTab.vue";
import LiveAttendanceInboxTab from "@/features/hris-admin/live-attendance/components/tabs/LiveAttendanceInboxTab.vue";
import LiveAttendanceAccountTab from "@/features/hris-admin/live-attendance/components/tabs/LiveAttendanceAccountTab.vue";
import LiveAttendanceLogPanel from "@/features/hris-admin/live-attendance/components/panels/LiveAttendanceLogPanel.vue";
import { useLiveAttendance } from "@/features/hris-admin/live-attendance/useLiveAttendance";

type EmployeeDetail = {
  id: number;
  name: string;
  role: string;
  initials: string;
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
const employeeDetailDrawerDragY = ref(0);
const employeeDetailDrawerDragging = ref(false);
const employeeDetailDrawerPointerId = ref<number | null>(null);
const employeeDetailDrawerStartY = ref(0);
const showRequestSheet = ref(false);
const showTimeOffForm = ref(false);
const requestSheetDragY = ref(0);
const requestSheetDragging = ref(false);
const requestSheetPointerId = ref<number | null>(null);
const requestSheetStartY = ref(0);
const timeOffTypeOptions = ["Cuti Tahunan", "Cuti Sakit", "Izin Pribadi", "Izin Khusus"];
const timeOffTypeSelectOptions = timeOffTypeOptions.map((label) => ({
  value: label,
  label,
}));
const timeOffForm = ref({
  type: null as string | null,
  dateRange: [] as string[],
  reason: "",
  delegate: "",
  fileName: "",
});
type CalendarCategory = "activities" | "timeOff" | "holiday" | "birthday";

type CalendarEventItem = {
  id: string;
  dateKey: string;
  category: CalendarCategory;
  title: string;
  subtitle: string;
  avatarUrl?: string;
};
type AnnouncementItem = {
  id: number;
  title: string;
  summary: string;
  content: string;
  category: string;
  creatorName: string;
  creatorAvatar: string;
  publishedAt: string;
};

const showCalendarScreen = ref(false);
const calendarMonthDropdownOpen = ref(false);
const showCalendarMonthDrawer = ref(false);
const calendarMonthDrawerDragY = ref(0);
const calendarMonthDrawerDragging = ref(false);
const calendarMonthDrawerPointerId = ref<number | null>(null);
const calendarMonthDrawerStartY = ref(0);
const calendarMonthRef = ref(getMonthStart(new Date()));
const selectedCalendarDate = ref(getDateOnly(new Date()));
const calendarMonthSearch = ref("");
const activeCalendarMonthTab = ref<CalendarCategory>("holiday");
const categoryIconMap: Record<CalendarCategory, string> = {
  activities: "landmark",
  timeOff: "clock",
  holiday: "calendar",
  birthday: "sparkles",
};
const calendarWeekdayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const calendarSectionLabels: Record<CalendarCategory, string> = {
  activities: "Activities",
  timeOff: "Time off",
  holiday: "Holiday",
  birthday: "Birthday",
};
const calendarSectionExpanded = ref<Record<CalendarCategory, boolean>>({
  activities: false,
  timeOff: true,
  holiday: true,
  birthday: false,
});
const calendarEvents = ref<CalendarEventItem[]>([
  {
    id: "holiday-2026-04-03",
    dateKey: "2026-04-03",
    category: "holiday",
    title: "Wafat Isa Al Masih",
    subtitle: "National holiday",
  },
  {
    id: "timeoff-2026-04-03-fahmi",
    dateKey: "2026-04-03",
    category: "timeOff",
    title: "Fahmi Setyawati",
    subtitle: "Cuti Melahirkan",
    avatarUrl: "https://i.pravatar.cc/120?img=25",
  },
  {
    id: "holiday-2026-04-05",
    dateKey: "2026-04-05",
    category: "holiday",
    title: "Hari Paskah",
    subtitle: "National holiday",
  },
  {
    id: "birthday-2026-04-17-eka",
    dateKey: "2026-04-17",
    category: "birthday",
    title: "Eka Dian",
    subtitle: "Birthday celebration",
    avatarUrl: "https://i.pravatar.cc/120?img=32",
  },
  {
    id: "activity-2026-04-17-townhall",
    dateKey: "2026-04-17",
    category: "activities",
    title: "All Hands Townhall",
    subtitle: "Internal event",
  },
]);
const announcements = ref<AnnouncementItem[]>([
  {
    id: 1,
    title: "Info Payroll April 2026",
    summary: "Slip gaji tersedia mulai 27 April 2026.",
    content:
      "Slip gaji periode April 2026 akan tersedia mulai 27 April 2026 pukul 10:00 WIB. Pastikan data rekening pada profil sudah valid sebelum proses transfer dilakukan.",
    category: "Payroll",
    creatorName: "Nadia Putri",
    creatorAvatar: "https://i.pravatar.cc/120?img=31",
    publishedAt: "2026-04-17",
  },
  {
    id: 2,
    title: "Kebijakan Presensi Hybrid",
    summary: "WFH wajib isi catatan aktivitas harian.",
    content:
      "Mulai minggu ini, karyawan dengan skema hybrid wajib mengisi catatan aktivitas harian pada akhir jam kerja. Catatan dipakai untuk sinkronisasi dengan laporan tim.",
    category: "HR Policy",
    creatorName: "Dewi Kurnia",
    creatorAvatar: "https://i.pravatar.cc/120?img=47",
    publishedAt: "2026-04-15",
  },
  {
    id: 3,
    title: "Jadwal Townhall Bulanan",
    summary: "Townhall dilaksanakan Jumat, 16:00 WIB.",
    content:
      "Townhall bulanan akan diadakan pada Jumat, 19 April 2026 pukul 16:00 WIB di ruang serbaguna lantai 8 dan via live stream untuk rekan remote.",
    category: "Company Event",
    creatorName: "Fikri Maulana",
    creatorAvatar: "https://i.pravatar.cc/120?img=12",
    publishedAt: "2026-04-14",
  },
  {
    id: 4,
    title: "Maintenance Sistem HRIS",
    summary: "Maintenance terjadwal Sabtu malam.",
    content:
      "Sistem HRIS akan menjalani maintenance pada Sabtu, 20 April 2026 pukul 22:00 - 23:30 WIB. Selama periode tersebut sebagian fitur dapat tidak dapat diakses sementara.",
    category: "System Notice",
    creatorName: "Rizky Pratama",
    creatorAvatar: "https://i.pravatar.cc/120?img=15",
    publishedAt: "2026-04-13",
  },
  {
    id: 5,
    title: "Reminder Pengajuan Cuti Lebaran",
    summary: "Pengajuan cuti maksimal H-7 sebelum tanggal mulai.",
    content:
      "Untuk kelancaran operasional, pengajuan cuti periode libur Lebaran wajib diajukan maksimal 7 hari sebelum tanggal mulai cuti melalui menu Permohonan.",
    category: "Reminder",
    creatorName: "Dewi Kurnia",
    creatorAvatar: "https://i.pravatar.cc/120?img=47",
    publishedAt: "2026-04-12",
  },
  {
    id: 6,
    title: "Program Medical Check-Up",
    summary: "Pendaftaran MCU dibuka hingga akhir bulan.",
    content:
      "Program MCU tahunan dibuka untuk seluruh karyawan tetap. Pendaftaran dilakukan melalui form internal dan ditutup pada 30 April 2026.",
    category: "Benefits",
    creatorName: "Mita Ayu",
    creatorAvatar: "https://i.pravatar.cc/120?img=21",
    publishedAt: "2026-04-10",
  },
  {
    id: 7,
    title: "Update Daftar Hari Libur Nasional",
    summary: "Kalender libur nasional 2026 diperbarui.",
    content:
      "Daftar hari libur nasional 2026 telah diperbarui mengikuti keputusan terbaru. Silakan cek menu Kalender untuk detail tanggal dan jenis liburnya.",
    category: "Calendar",
    creatorName: "Laras Wulandari",
    creatorAvatar: "https://i.pravatar.cc/120?img=36",
    publishedAt: "2026-04-08",
  },
]);
const showAnnouncementListScreen = ref(false);
const showAnnouncementDetailDrawer = ref(false);
const selectedAnnouncement = ref<AnnouncementItem | null>(null);
const announcementSearch = ref("");
const announcementDrawerDragY = ref(0);
const announcementDrawerDragging = ref(false);
const announcementDrawerPointerId = ref<number | null>(null);
const announcementDrawerStartY = ref(0);
const employeeFilterDrawerDragY = ref(0);
const employeeFilterDrawerDragging = ref(false);
const employeeFilterDrawerPointerId = ref<number | null>(null);
const employeeFilterDrawerStartY = ref(0);

const requestSheetStyle = computed(() => ({
  transform: `translateY(${requestSheetDragY.value}px)`,
  transition: requestSheetDragging.value ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
}));
const calendarMonthDrawerStyle = computed(() => ({
  transform: `translateY(${calendarMonthDrawerDragY.value}px)`,
  transition: calendarMonthDrawerDragging.value ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
}));
const announcementDetailDrawerStyle = computed(() => ({
  transform: `translateY(${announcementDrawerDragY.value}px)`,
  transition: announcementDrawerDragging.value ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
}));
const employeeFilterDrawerStyle = computed(() => ({
  transform: `translateY(${employeeFilterDrawerDragY.value}px)`,
  transition: employeeFilterDrawerDragging.value ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
}));
const employeeDetailDrawerStyle = computed(() => ({
  transform: `translateY(${employeeDetailDrawerDragY.value}px)`,
  transition: employeeDetailDrawerDragging.value ? "none" : "transform 220ms cubic-bezier(0.22, 1, 0.36, 1)",
}));
const calendarMonthLabel = computed(() =>
  calendarMonthRef.value.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  })
);
const selectedCalendarDateLabel = computed(() =>
  selectedCalendarDate.value.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
);
const calendarEventsByDate = computed(() => {
  const grouped: Record<string, CalendarEventItem[]> = {};
  for (const item of calendarEvents.value) {
    grouped[item.dateKey] ??= [];
    grouped[item.dateKey].push(item);
  }
  return grouped;
});
const calendarGridDays = computed(() => {
  const monthStart = getMonthStart(calendarMonthRef.value);
  const startOffset = monthStart.getDay();
  const startDate = new Date(monthStart);
  startDate.setDate(startDate.getDate() - startOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + index);
    const key = toDateKey(date);
    return {
      key,
      date,
      isCurrentMonth: date.getMonth() === monthStart.getMonth(),
      isToday: isSameDate(date, new Date()),
      isSelected: isSameDate(date, selectedCalendarDate.value),
      hasAnyEvent: (calendarEventsByDate.value[key]?.length ?? 0) > 0,
    };
  });
});
const selectedDateItemsByCategory = computed<Record<CalendarCategory, CalendarEventItem[]>>(() => {
  const dateKey = toDateKey(selectedCalendarDate.value);
  const grouped: Record<CalendarCategory, CalendarEventItem[]> = {
    activities: [],
    timeOff: [],
    holiday: [],
    birthday: [],
  };
  for (const item of calendarEventsByDate.value[dateKey] ?? []) {
    grouped[item.category].push(item);
  }
  return grouped;
});
const calendarSections = computed(() =>
  (["activities", "timeOff", "holiday", "birthday"] as CalendarCategory[]).map((key) => ({
    key,
    label: calendarSectionLabels[key],
    items: selectedDateItemsByCategory.value[key],
  }))
);
const calendarMonthEvents = computed(() => {
  const year = calendarMonthRef.value.getFullYear();
  const month = calendarMonthRef.value.getMonth();

  return calendarEvents.value.filter((item) => {
    const date = parseDateKey(item.dateKey);
    return date.getFullYear() === year && date.getMonth() === month;
  });
});
const calendarMonthCountByCategory = computed(() => {
  const grouped: Record<CalendarCategory, number> = {
    activities: 0,
    timeOff: 0,
    holiday: 0,
    birthday: 0,
  };
  for (const item of calendarMonthEvents.value) {
    grouped[item.category] += 1;
  }
  return grouped;
});
const calendarMonthTabs = computed(() =>
  (["activities", "timeOff", "holiday", "birthday"] as CalendarCategory[]).map((key) => ({
    key,
    label: calendarSectionLabels[key],
    icon: categoryIconMap[key],
  }))
);
const calendarMonthFilteredGroups = computed(() => {
  const query = calendarMonthSearch.value.trim().toLowerCase();
  const items = calendarMonthEvents.value.filter((item) => item.category === activeCalendarMonthTab.value);
  const searched = query
    ? items.filter((item) => `${item.title} ${item.subtitle}`.toLowerCase().includes(query))
    : items;
  const grouped = new Map<string, CalendarEventItem[]>();
  for (const item of searched) {
    if (!grouped.has(item.dateKey)) grouped.set(item.dateKey, []);
    grouped.get(item.dateKey)?.push(item);
  }
  return [...grouped.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([dateKey, groupItems]) => ({ dateKey, items: groupItems }));
});
const sortedAnnouncements = computed(() =>
  [...announcements.value].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
);
const latestAnnouncements = computed(() => sortedAnnouncements.value.slice(0, 5));
const filteredAnnouncements = computed(() => {
  const query = announcementSearch.value.trim().toLowerCase();
  if (!query) return sortedAnnouncements.value;
  return sortedAnnouncements.value.filter((item) => `${item.title} ${item.summary} ${item.content}`.toLowerCase().includes(query));
});

function formatWorkArrangement(value: EmployeeDetail["workArrangement"]): string {
  if (value === "remote") return "Remote";
  if (value === "freelance") return "Freelance";
  return "Onsite";
}

function formatEmploymentType(value: EmployeeDetail["employmentType"]): string {
  return value === "tetap" ? "Tetap" : "Kontrak";
}

function resetEmployeeDetailDrawerDragState(): void {
  employeeDetailDrawerDragY.value = 0;
  employeeDetailDrawerDragging.value = false;
  employeeDetailDrawerPointerId.value = null;
}

function openOffEmployeeDetailDrawer(employee: EmployeeDetail): void {
  resetEmployeeDetailDrawerDragState();
  selectedEmployee.value = null;
  selectedOffEmployee.value = employee;
}

function openEmployeeDetailDrawer(employee: EmployeeDetail): void {
  resetEmployeeDetailDrawerDragState();
  selectedOffEmployee.value = null;
  selectedEmployee.value = employee;
}

function closeOffEmployeeDetailDrawer(): void {
  resetEmployeeDetailDrawerDragState();
  selectedOffEmployee.value = null;
}

function closeEmployeeDetailDrawer(): void {
  resetEmployeeDetailDrawerDragState();
  selectedEmployee.value = null;
}

function openRequestSheet(): void {
  showAnnouncementListScreen.value = false;
  showAnnouncementDetailDrawer.value = false;
  selectedOffEmployee.value = null;
  selectedEmployee.value = null;
  requestSheetDragY.value = 0;
  requestSheetDragging.value = false;
  requestSheetPointerId.value = null;
  showRequestSheet.value = true;
}

function openEmployeeFilterDrawer(): void {
  employeeFilterDrawerDragY.value = 0;
  employeeFilterDrawerDragging.value = false;
  employeeFilterDrawerPointerId.value = null;
  showEmployeeFilterModal.value = true;
}

function closeEmployeeFilterDrawer(): void {
  employeeFilterDrawerDragY.value = 0;
  employeeFilterDrawerDragging.value = false;
  employeeFilterDrawerPointerId.value = null;
  showEmployeeFilterModal.value = false;
}

function closeRequestSheet(): void {
  requestSheetDragY.value = 0;
  requestSheetDragging.value = false;
  requestSheetPointerId.value = null;
  showRequestSheet.value = false;
}

function openTimeOffForm(): void {
  requestSheetDragY.value = 0;
  requestSheetDragging.value = false;
  requestSheetPointerId.value = null;
  showRequestSheet.value = false;
  showTimeOffForm.value = true;
}

function backToRequestSheet(): void {
  showTimeOffForm.value = false;
  showRequestSheet.value = true;
}

function closeTimeOffForm(): void {
  showTimeOffForm.value = false;
}

function openCalendarScreen(): void {
  activeTab.value = "home";
  showLogPanel.value = false;
  showRequestSheet.value = false;
  showTimeOffForm.value = false;
  showAnnouncementListScreen.value = false;
  showAnnouncementDetailDrawer.value = false;
  selectedOffEmployee.value = null;
  selectedEmployee.value = null;
  showCalendarScreen.value = true;
}

function closeCalendarScreen(): void {
  showCalendarScreen.value = false;
  showCalendarMonthDrawer.value = false;
  calendarMonthDropdownOpen.value = false;
}

function openAnnouncementListScreen(): void {
  activeTab.value = "home";
  showCalendarScreen.value = false;
  showAnnouncementListScreen.value = true;
}

function closeAnnouncementListScreen(): void {
  showAnnouncementListScreen.value = false;
}

function openAnnouncementDetailById(id: number): void {
  const target = announcements.value.find((item) => item.id === id);
  if (!target) return;
  openAnnouncementDetail(target);
}

function openAnnouncementDetail(item: AnnouncementItem): void {
  announcementDrawerDragY.value = 0;
  announcementDrawerDragging.value = false;
  announcementDrawerPointerId.value = null;
  selectedAnnouncement.value = item;
  showAnnouncementDetailDrawer.value = true;
}

function closeAnnouncementDetailDrawer(): void {
  announcementDrawerDragY.value = 0;
  announcementDrawerDragging.value = false;
  announcementDrawerPointerId.value = null;
  showAnnouncementDetailDrawer.value = false;
  selectedAnnouncement.value = null;
}

function startAnnouncementDrawerDrag(event: PointerEvent): void {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  announcementDrawerDragging.value = true;
  announcementDrawerPointerId.value = event.pointerId;
  announcementDrawerStartY.value = event.clientY - announcementDrawerDragY.value;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

function moveAnnouncementDrawerDrag(event: PointerEvent): void {
  if (!announcementDrawerDragging.value || announcementDrawerPointerId.value !== event.pointerId) return;

  const delta = event.clientY - announcementDrawerStartY.value;
  announcementDrawerDragY.value = Math.max(0, delta);
}

function endAnnouncementDrawerDrag(event: PointerEvent): void {
  if (!announcementDrawerDragging.value || announcementDrawerPointerId.value !== event.pointerId) return;

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);
  announcementDrawerDragging.value = false;
  announcementDrawerPointerId.value = null;

  if (announcementDrawerDragY.value > 120) {
    closeAnnouncementDetailDrawer();
    return;
  }

  announcementDrawerDragY.value = 0;
}

function startEmployeeFilterDrawerDrag(event: PointerEvent): void {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  employeeFilterDrawerDragging.value = true;
  employeeFilterDrawerPointerId.value = event.pointerId;
  employeeFilterDrawerStartY.value = event.clientY - employeeFilterDrawerDragY.value;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

function moveEmployeeFilterDrawerDrag(event: PointerEvent): void {
  if (!employeeFilterDrawerDragging.value || employeeFilterDrawerPointerId.value !== event.pointerId) return;

  const delta = event.clientY - employeeFilterDrawerStartY.value;
  employeeFilterDrawerDragY.value = Math.max(0, delta);
}

function endEmployeeFilterDrawerDrag(event: PointerEvent): void {
  if (!employeeFilterDrawerDragging.value || employeeFilterDrawerPointerId.value !== event.pointerId) return;

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);
  employeeFilterDrawerDragging.value = false;
  employeeFilterDrawerPointerId.value = null;

  if (employeeFilterDrawerDragY.value > 120) {
    closeEmployeeFilterDrawer();
    return;
  }

  employeeFilterDrawerDragY.value = 0;
}

function startEmployeeDetailDrawerDrag(event: PointerEvent): void {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  employeeDetailDrawerDragging.value = true;
  employeeDetailDrawerPointerId.value = event.pointerId;
  employeeDetailDrawerStartY.value = event.clientY - employeeDetailDrawerDragY.value;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

function moveEmployeeDetailDrawerDrag(event: PointerEvent): void {
  if (!employeeDetailDrawerDragging.value || employeeDetailDrawerPointerId.value !== event.pointerId) return;

  const delta = event.clientY - employeeDetailDrawerStartY.value;
  employeeDetailDrawerDragY.value = Math.max(0, delta);
}

function endEmployeeDetailDrawerDrag(event: PointerEvent): void {
  if (!employeeDetailDrawerDragging.value || employeeDetailDrawerPointerId.value !== event.pointerId) return;

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);
  employeeDetailDrawerDragging.value = false;
  employeeDetailDrawerPointerId.value = null;

  if (employeeDetailDrawerDragY.value > 120) {
    if (selectedOffEmployee.value) {
      closeOffEmployeeDetailDrawer();
      return;
    }
    if (selectedEmployee.value) {
      closeEmployeeDetailDrawer();
      return;
    }
  }

  employeeDetailDrawerDragY.value = 0;
}

function selectCalendarDate(date: Date): void {
  selectedCalendarDate.value = getDateOnly(date);
  calendarMonthRef.value = getMonthStart(date);
}

function dayCellClass(day: {
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
}): string {
  if (day.isSelected) return "bg-[#4f67d9] text-white shadow-sm";
  if (day.isToday) return "bg-[#f4d24f] text-slate-800";
  if (!day.isCurrentMonth) return "text-slate-300";
  return "text-slate-800 hover:bg-slate-100";
}

function jumpCalendarToToday(): void {
  const today = new Date();
  calendarMonthRef.value = getMonthStart(today);
  selectedCalendarDate.value = getDateOnly(today);
}

function goToPreviousCalendarMonth(): void {
  const current = calendarMonthRef.value;
  calendarMonthRef.value = new Date(current.getFullYear(), current.getMonth() - 1, 1);
  calendarMonthDropdownOpen.value = false;
}

function goToNextCalendarMonth(): void {
  const current = calendarMonthRef.value;
  calendarMonthRef.value = new Date(current.getFullYear(), current.getMonth() + 1, 1);
  calendarMonthDropdownOpen.value = false;
}

function toggleCalendarMonthMenu(): void {
  calendarMonthDropdownOpen.value = !calendarMonthDropdownOpen.value;
}

function toggleCalendarSection(category: CalendarCategory): void {
  calendarSectionExpanded.value[category] = !calendarSectionExpanded.value[category];
}

function openCalendarMonthDrawer(): void {
  calendarMonthDrawerDragY.value = 0;
  calendarMonthDrawerDragging.value = false;
  calendarMonthDrawerPointerId.value = null;
  showCalendarMonthDrawer.value = true;
}

function closeCalendarMonthDrawer(): void {
  calendarMonthDrawerDragY.value = 0;
  calendarMonthDrawerDragging.value = false;
  calendarMonthDrawerPointerId.value = null;
  showCalendarMonthDrawer.value = false;
}

function startCalendarMonthDrawerDrag(event: PointerEvent): void {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  calendarMonthDrawerDragging.value = true;
  calendarMonthDrawerPointerId.value = event.pointerId;
  calendarMonthDrawerStartY.value = event.clientY - calendarMonthDrawerDragY.value;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

function moveCalendarMonthDrawerDrag(event: PointerEvent): void {
  if (!calendarMonthDrawerDragging.value || calendarMonthDrawerPointerId.value !== event.pointerId) return;

  const delta = event.clientY - calendarMonthDrawerStartY.value;
  calendarMonthDrawerDragY.value = Math.max(0, delta);
}

function endCalendarMonthDrawerDrag(event: PointerEvent): void {
  if (!calendarMonthDrawerDragging.value || calendarMonthDrawerPointerId.value !== event.pointerId) return;

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);
  calendarMonthDrawerDragging.value = false;
  calendarMonthDrawerPointerId.value = null;

  if (calendarMonthDrawerDragY.value > 120) {
    closeCalendarMonthDrawer();
    return;
  }

  calendarMonthDrawerDragY.value = 0;
}

function startRequestSheetDrag(event: PointerEvent): void {
  if (event.pointerType === "mouse" && event.button !== 0) return;

  requestSheetDragging.value = true;
  requestSheetPointerId.value = event.pointerId;
  requestSheetStartY.value = event.clientY - requestSheetDragY.value;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

function moveRequestSheetDrag(event: PointerEvent): void {
  if (!requestSheetDragging.value || requestSheetPointerId.value !== event.pointerId) return;

  const delta = event.clientY - requestSheetStartY.value;
  requestSheetDragY.value = Math.max(0, delta);
}

function endRequestSheetDrag(event: PointerEvent): void {
  if (!requestSheetDragging.value || requestSheetPointerId.value !== event.pointerId) return;

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);
  requestSheetDragging.value = false;
  requestSheetPointerId.value = null;

  if (requestSheetDragY.value > 120) {
    closeRequestSheet();
    return;
  }

  requestSheetDragY.value = 0;
}

function handleTimeOffFile(event: Event): void {
  const target = event.target as HTMLInputElement | null;
  const file = target?.files?.[0] ?? null;
  timeOffForm.value.fileName = file ? file.name : "";
}

function submitTimeOffRequest(): void {
  showTimeOffForm.value = false;
  activeTab.value = "home";
}

function toDateKey(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function parseDateKey(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
}

function getDateOnly(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function isSameDate(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

function formatCalendarDateFromKey(value: string): string {
  return parseDateKey(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function formatAnnouncementDate(value: string): string {
  return parseDateKey(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
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

const fullscreenTimeOffSelectClass = "la-fullscreen-timeoff-open";

watch(
  [isFullscreen, showTimeOffForm],
  ([fullscreen, timeOffOpen]) => {
    const shouldElevateSelect = fullscreen && timeOffOpen;
    document.body.classList.toggle(fullscreenTimeOffSelectClass, shouldElevateSelect);
  },
  { immediate: true }
);

watch(
  selectedDateItemsByCategory,
  (items) => {
    for (const key of ["activities", "timeOff", "holiday", "birthday"] as CalendarCategory[]) {
      if (items[key].length === 0) {
        calendarSectionExpanded.value[key] = false;
      }
      if (items[key].length > 0 && key !== "activities" && key !== "birthday") {
        calendarSectionExpanded.value[key] = true;
      }
    }
  },
  { immediate: true }
);

watch(showCalendarScreen, (opened) => {
  if (!opened) {
    closeCalendarMonthDrawer();
    calendarMonthDropdownOpen.value = false;
  }
});

onBeforeUnmount(() => {
  document.body.classList.remove(fullscreenTimeOffSelectClass);
});
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
  box-shadow: none;
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

.request-sheet-panel {
  will-change: transform;
}

.request-sheet-drag-zone {
  touch-action: none;
}

.request-overlay-fade-enter-active,
.request-overlay-fade-leave-active {
  transition: opacity 0.2s ease;
}

.request-overlay-fade-enter-active .request-sheet-transition-target,
.request-overlay-fade-leave-active .request-sheet-transition-target {
  will-change: transform;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1);
}

.request-overlay-fade-enter-from .request-sheet-transition-target,
.request-overlay-fade-leave-to .request-sheet-transition-target {
  transform: translate3d(0, 100%, 0);
}

.request-overlay-fade-enter-to .request-sheet-transition-target,
.request-overlay-fade-leave-from .request-sheet-transition-target {
  transform: translate3d(0, 0, 0);
}

.request-overlay-fade-enter-from,
.request-overlay-fade-leave-to {
  opacity: 0;
}

.request-sheet-slide-enter-active,
.request-sheet-slide-leave-active {
  will-change: transform, opacity;
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.16s linear;
}

.request-sheet-slide-enter-from,
.request-sheet-slide-leave-to {
  transform: translate3d(0, 100%, 0) !important;
  opacity: 0.98;
}

.request-sheet-slide-enter-to,
.request-sheet-slide-leave-from {
  transform: translate3d(0, 0, 0) !important;
  opacity: 1;
}

.request-form-slide-enter-active,
.request-form-slide-leave-active {
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

.request-form-slide-enter-from,
.request-form-slide-leave-to {
  transform: translateY(100%);
  opacity: 0.98;
}

.calendar-screen-slide-enter-active,
.calendar-screen-slide-leave-active {
  transition: transform 0.24s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease;
}

.calendar-screen-slide-enter-from,
.calendar-screen-slide-leave-to {
  transform: translateY(100%);
  opacity: 0.98;
}

.calendar-month-dropdown {
  backdrop-filter: blur(6px);
}

.calendar-day-btn {
  line-height: 1;
}

:global(body.la-fullscreen-timeoff-open .fixed.z-\[var\(--z-modal\)\]) {
  z-index: 10080 !important;
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

