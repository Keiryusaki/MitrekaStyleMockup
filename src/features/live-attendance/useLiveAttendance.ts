import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

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
type TimeOffStatus = "pending" | "approved";
type WorkArrangement = "onsite" | "remote" | "freelance";
type EmploymentType = "kontrak" | "tetap";

type TimeOffInfo = {
  reason: string;
  dateLabel: string;
  status: TimeOffStatus;
};

type EmployeeItem = {
  id: number;
  name: string;
  role: string;
  status: EmployeeStatus;
  initials: string;
  phone: string;
  whatsapp: string;
  email: string;
  workArrangement: WorkArrangement;
  employmentType: EmploymentType;
  timeOff?: TimeOffInfo;
};

export function useLiveAttendance() {
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
    {
      id: 1,
      name: "Eka Dian",
      role: "UI Engineer",
      status: "off",
      initials: "ED",
      phone: "0812-1001-2001",
      whatsapp: "0812-1001-2001",
      email: "eka.dian@mitreka.id",
      workArrangement: "remote",
      employmentType: "tetap",
      timeOff: {
        reason: "Cuti tahunan keluarga",
        dateLabel: "4 - 5 Maret 2026",
        status: "approved",
      },
    },
    {
      id: 2,
      name: "Rizky Pratama",
      role: "Frontend Engineer",
      status: "off",
      initials: "RP",
      phone: "0812-1001-2002",
      whatsapp: "0812-1001-2002",
      email: "rizky.pratama@mitreka.id",
      workArrangement: "onsite",
      employmentType: "kontrak",
      timeOff: {
        reason: "Izin keperluan keluarga",
        dateLabel: "4 Maret 2026",
        status: "pending",
      },
    },
    {
      id: 3,
      name: "Nadia Putri",
      role: "QA Analyst",
      status: "off",
      initials: "NP",
      phone: "0812-1001-2003",
      whatsapp: "0812-1001-2003",
      email: "nadia.putri@mitreka.id",
      workArrangement: "remote",
      employmentType: "tetap",
      timeOff: {
        reason: "Sakit (rawat jalan)",
        dateLabel: "3 - 4 Maret 2026",
        status: "approved",
      },
    },
    {
      id: 4,
      name: "Budi Santoso",
      role: "Backend Engineer",
      status: "off",
      initials: "BS",
      phone: "0812-1001-2004",
      whatsapp: "0812-1001-2004",
      email: "budi.santoso@mitreka.id",
      workArrangement: "onsite",
      employmentType: "tetap",
      timeOff: {
        reason: "Cuti pribadi",
        dateLabel: "4 Maret 2026",
        status: "pending",
      },
    },
    {
      id: 5,
      name: "Laras Wulandari",
      role: "Product Designer",
      status: "off",
      initials: "LW",
      phone: "0812-1001-2005",
      whatsapp: "0812-1001-2005",
      email: "laras.wulandari@mitreka.id",
      workArrangement: "freelance",
      employmentType: "kontrak",
      timeOff: {
        reason: "Libur jadwal freelance",
        dateLabel: "4 Maret 2026",
        status: "approved",
      },
    },
    {
      id: 6,
      name: "Fikri Maulana",
      role: "Project Manager",
      status: "wfh",
      initials: "FM",
      phone: "0812-1001-2006",
      whatsapp: "0812-1001-2006",
      email: "fikri.maulana@mitreka.id",
      workArrangement: "remote",
      employmentType: "tetap",
    },
    {
      id: 7,
      name: "Dewi Kurnia",
      role: "HR Business Partner",
      status: "off",
      initials: "DK",
      phone: "0812-1001-2007",
      whatsapp: "0812-1001-2007",
      email: "dewi.kurnia@mitreka.id",
      workArrangement: "onsite",
      employmentType: "tetap",
      timeOff: {
        reason: "Izin mendampingi keluarga",
        dateLabel: "4 Maret 2026",
        status: "approved",
      },
    },
    {
      id: 8,
      name: "Galih Saputra",
      role: "DevOps Engineer",
      status: "onsite",
      initials: "GS",
      phone: "0812-1001-2008",
      whatsapp: "0812-1001-2008",
      email: "galih.saputra@mitreka.id",
      workArrangement: "onsite",
      employmentType: "tetap",
    },
    {
      id: 9,
      name: "Mita Ayu",
      role: "Finance Officer",
      status: "wfh",
      initials: "MA",
      phone: "0812-1001-2009",
      whatsapp: "0812-1001-2009",
      email: "mita.ayu@mitreka.id",
      workArrangement: "remote",
      employmentType: "kontrak",
    },
  ]);

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
    if (status.value === "idle") {
      return "bg-gradient-to-b from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 shadow-[0_18px_30px_-14px_rgba(5,150,105,0.72)]";
    }
    if (status.value === "in") {
      return "bg-gradient-to-b from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 shadow-[0_18px_30px_-14px_rgba(225,29,72,0.68)]";
    }
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
    document.removeEventListener("keydown", handleEscapeKey);
    document.body.classList.remove("overflow-hidden");
  });

  onMounted(() => {
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleEscapeKey);
  });

  watch(
    [isFullscreen, showLogPanel, showMapModal, showNoteModal, showFaceModal, showEmployeeFilterModal, showLogDetail],
    (states) => {
      const shouldLockBody = states.some(Boolean);
      document.body.classList.toggle("overflow-hidden", shouldLockBody);
    },
  );

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

  function resetEmployeeFilter(): void {
    employeeFilter.value = "all";
    employeeRoleFilter.value = "all";
  }

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

  function handleEscapeKey(event: KeyboardEvent): void {
    if (event.key !== "Escape") return;

    if (showFaceModal.value) {
      showFaceModal.value = false;
      pendingAction.value = null;
      return;
    }
    if (showNoteModal.value) {
      closeNoteModal();
      return;
    }
    if (showLogDetail.value) {
      closeLogDetail();
      return;
    }
    if (showEmployeeFilterModal.value) {
      showEmployeeFilterModal.value = false;
      return;
    }
    if (showMapModal.value) {
      showMapModal.value = false;
      return;
    }
    if (showLogPanel.value) {
      showLogPanel.value = false;
      return;
    }
    if (isFullscreen.value) {
      isFullscreen.value = false;
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

  return {
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
  };
}
