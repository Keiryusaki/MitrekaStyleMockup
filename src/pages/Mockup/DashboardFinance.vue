<template>
  <div>
    <div class="relative overflow-hidden rounded-[2rem] bg-[#f4f7fa] p-4 md:p-6">
      <div class="pointer-events-none absolute -right-20 -top-20 h-[420px] w-[420px] rounded-full bg-sky-300/20 blur-3xl"></div>
      <div class="pointer-events-none absolute -bottom-24 -left-24 h-[420px] w-[420px] rounded-full bg-emerald-300/20 blur-3xl"></div>

      <div class="relative space-y-6">
        <div class="finance-top-row grid grid-cols-1 gap-6 xl:grid-cols-3 xl:items-start">
          <section class="finance-hero-card xl:col-span-2 overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-[#004A99] to-[#002B59] p-6 text-white shadow-2xl md:p-8 xl:h-[430px]">
            <div class="flex h-full flex-col justify-between gap-5">
              <div class="inline-flex self-start items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-black uppercase tracking-wide">
                <Icon name="trendingUp" class="h-4 w-4 text-emerald-300" />
                <span>Target Pendapatan Tahunan</span>
              </div>

              <h2 class="text-4xl font-black leading-none tracking-tight md:text-6xl">
                Rp {{ targetRevenue.actual }}
                <span class="ml-2 text-xl font-semibold text-white/45 md:text-2xl">/ {{ targetRevenue.target }}{{ targetRevenue.unit }}</span>
              </h2>

              <div class="space-y-2">
                <div class="flex items-end justify-between">
                  <p class="text-sm font-semibold text-blue-100/70">Pencapaian saat ini: {{ targetRevenue.percent }}%</p>
                  <span class="rounded-lg bg-emerald-500 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest">On Track</span>
                </div>
                <div class="h-3 w-full overflow-hidden rounded-full border border-white/10 bg-white/10 p-0.5">
                  <div class="h-full rounded-full bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-400" :style="{ width: `${targetRevenue.percent}%` }"></div>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <article class="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p class="text-[10px] font-black uppercase tracking-wide text-blue-100/70">Margin Laba</p>
                  <p class="mt-1 text-2xl font-black">24,2%</p>
                  <p class="mt-1 inline-flex items-center gap-1 text-[11px] font-black text-emerald-300">
                    <Icon name="trendingUp" class="h-3.5 w-3.5" /> +2,4%
                  </p>
                </article>
                <article class="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur">
                  <p class="text-[10px] font-black uppercase tracking-wide text-blue-100/70">Ketahanan Kas</p>
                  <p class="mt-1 text-2xl font-black">8,5 Bln</p>
                  <p class="mt-1 text-[11px] font-black text-emerald-300">Sehat</p>
                </article>
              </div>
            </div>
          </section>

          <article class="finance-glass-card finance-card-amber finance-late-card flex flex-col xl:h-[430px]">
            <div class="finance-card-head">
              <h3 class="finance-late-title">Bank Balance Late Check</h3>
            </div>
            <p class="mb-3 text-xs font-bold text-slate-500">Akun bank yang belum diperbarui</p>
            <p class="mb-3 text-sm text-slate-700">
              Terdapat <span class="font-black text-amber-500">{{ bankLateSummary.total }}</span> bank account yang belum diperbarui melewati
              <span class="font-black text-slate-800">{{ bankLateSummary.threshold }}</span> hari kerja
            </p>
            <div class="finance-scrollpane finance-late-list min-h-0 flex-1 space-y-3 overflow-y-auto pr-1">
              <div
                v-for="bank in bankData"
                :key="bank.id"
                class="finance-late-bank-item flex items-center justify-between rounded-2xl border border-white/70 bg-white/65 p-3"
              >
                <p class="text-sm font-semibold text-slate-700">
                  <span class="mr-2 inline-block h-2 w-2 rounded-full bg-amber-500 align-middle"></span>
                  {{ bank.name }}
                </p>
                <span
                  class="text-sm font-semibold"
                  :class="bank.days > 10 ? 'text-rose-500' : bank.days > 5 ? 'text-amber-500' : 'text-yellow-500'"
                >
                  {{ bank.days }} hari
                </span>
              </div>
            </div>
          </article>
        </div>

        <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article class="finance-glass-card finance-card-cyan">
            <div class="finance-card-head">
              <h3>Proyek Segera Berakhir Kontrak</h3>
            </div>
            <p class="finance-card-subtitle mb-4">Kontrak yang akan segera habis</p>
            <div class="finance-scrollpane max-h-[280px] space-y-4 overflow-y-auto pr-1">
              <button
                v-for="item in berakhirKontrak"
                :key="item.id"
                type="button"
                class="finance-lift-item block w-full text-left"
                @click="openContractDetail(item)"
              >
                <div class="mb-1.5 flex items-end justify-between gap-3">
                  <div>
                    <p class="truncate text-sm font-semibold text-slate-800">{{ item.name }}</p>
                    <p class="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                      <Icon name="fileText" class="h-3.5 w-3.5" /> {{ item.docs }} Dokumen
                    </p>
                  </div>
                  <span class="text-xs font-semibold text-[#00A3FF]">{{ item.days }} hari</span>
                </div>
                <div class="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div class="h-full rounded-full" :class="item.color" :style="{ width: `${item.progress}%` }"></div>
                </div>
              </button>
            </div>
          </article>

          <article class="finance-glass-card finance-card-rose">
            <div class="finance-card-head">
              <h3>Proyek Segera Berakhir Support</h3>
            </div>
            <p class="finance-card-subtitle mb-4">Support kontrak yang akan segera habis</p>
            <div class="finance-scrollpane max-h-[280px] space-y-3 overflow-y-auto pr-1">
              <div
                v-for="item in berakhirSupport"
                :key="item.id"
                class="finance-support-item flex items-center gap-3 rounded-2xl border border-rose-100 bg-rose-50/65 p-3"
              >
                <span class="finance-support-bullet"></span>
                <p class="min-w-0 flex-1 truncate text-left text-sm font-semibold text-slate-700">{{ item.name }}</p>
                <span class="ml-auto text-xs font-semibold text-rose-600">{{ item.days }} hari</span>
              </div>
            </div>
          </article>

          <article class="finance-glass-card finance-card-emerald">
            <div class="finance-card-head">
              <h3>Proyek Belum Berkontrak</h3>
            </div>
            <p class="finance-card-subtitle mb-4">Proyek aktif yang belum memiliki kontrak</p>
            <div class="finance-filter-row mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
              <label class="text-[10px] font-black uppercase tracking-wide text-slate-500">
                Status
                <div class="finance-filter-pill mt-1">
                  <SelectDropdown
                    v-model="filterStatus"
                    :options="statusOptions"
                    size="xs"
                    variant="outline"
                    color="primary"
                  />
                </div>
              </label>
              <label class="text-[10px] font-black uppercase tracking-wide text-slate-500">
                Tahun Mulai
                <div class="finance-filter-pill mt-1">
                  <SelectDropdown
                    v-model="filterTahun"
                    :options="tahunOptions"
                    size="xs"
                    variant="outline"
                    color="primary"
                  />
                </div>
              </label>
            </div>
            <div class="finance-scrollpane finance-contract-list max-h-[280px] space-y-3 overflow-y-auto pr-1">
              <div v-for="item in belumBerkontrak" :key="item.id" class="finance-contract-item rounded-3xl border border-emerald-100 bg-emerald-50/45 p-4">
                <div class="mb-2 flex items-start justify-between gap-3">
                  <p class="text-sm font-semibold text-slate-800">{{ item.name }}</p>
                  <span class="rounded-lg border border-emerald-100 bg-white/80 px-2 py-0.5 text-[10px] font-semibold text-emerald-600">{{ item.days }}h</span>
                </div>
                <div class="flex items-end justify-between">
                  <p class="text-[10px] font-semibold uppercase tracking-wide text-slate-400">Estimasi Nilai</p>
                  <p class="text-sm font-semibold text-emerald-700">Cost {{ item.cost }}</p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div class="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <article class="finance-glass-card finance-card-indigo">
            <div class="finance-card-head">
              <h3>Utilitas SDM</h3>
              <span>SDM</span>
            </div>
            <div class="flex items-center gap-6 pt-1">
              <div class="relative flex h-24 w-24 items-center justify-center">
                <svg class="h-full w-full -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#E2E8F0" stroke-width="10" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366F1" stroke-width="10" stroke-dasharray="251" stroke-dashoffset="37" stroke-linecap="round" />
                </svg>
                <span class="absolute text-xl font-black text-indigo-600">85%</span>
              </div>
              <div class="w-full space-y-3">
                <div>
                  <div class="mb-1 flex justify-between text-[10px] font-black uppercase"><span class="text-slate-400">Terpakai</span><span>68 Org</span></div>
                  <div class="h-1.5 w-full rounded-full bg-slate-100"><div class="h-full w-[85%] rounded-full bg-indigo-500"></div></div>
                </div>
                <div>
                  <div class="mb-1 flex justify-between text-[10px] font-black uppercase"><span class="text-slate-400">Tersedia</span><span>12 Org</span></div>
                  <div class="h-1.5 w-full rounded-full bg-slate-100"><div class="h-full w-[15%] rounded-full bg-slate-300"></div></div>
                </div>
              </div>
            </div>
          </article>

          <article class="finance-glass-card finance-card-pink">
            <div class="finance-card-head">
              <h3>Usia Piutang</h3>
              <span>Keuangan</span>
            </div>
            <div class="space-y-4 pt-2">
              <p class="text-3xl font-black tracking-tight text-slate-800">Rp 6,42 Miliar</p>
              <div class="flex h-6 overflow-hidden rounded-full border border-white shadow">
                <div class="w-[60%] bg-[#00D094]"></div>
                <div class="w-[25%] bg-[#00A3FF]"></div>
                <div class="w-[15%] bg-[#FF4D4D]"></div>
              </div>
              <div class="flex justify-between text-[9px] font-black uppercase tracking-wide text-slate-400">
                <span>Lancar</span><span>30-60h</span><span>&gt;90h</span>
              </div>
            </div>
          </article>

          <article class="finance-satisfaction-card overflow-hidden rounded-[2.2rem] bg-gradient-to-br from-indigo-500 to-purple-600 p-6 text-white shadow-2xl">
            <div class="flex h-full min-h-[150px] items-center gap-5">
              <div class="finance-smile-box flex h-16 w-16 items-center justify-center rounded-2xl border border-white/25 bg-white/20">
                <svg viewBox="0 0 24 24" class="h-8 w-8 text-white" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="9"></circle>
                  <path d="M8.2 14.2c1.2 1.6 2.6 2.4 3.8 2.4s2.6-.8 3.8-2.4"></path>
                  <circle cx="9.2" cy="10" r="0.8" fill="currentColor" stroke="none"></circle>
                  <circle cx="14.8" cy="10" r="0.8" fill="currentColor" stroke="none"></circle>
                </svg>
              </div>
              <div>
                <h4 class="text-lg font-black">Kepuasan Pelanggan</h4>
                <div class="mt-1 flex items-end gap-2">
                  <p class="text-4xl font-black leading-none">4,8</p>
                  <div class="mb-1 flex items-center gap-0.5">
                    <Icon v-for="n in 5" :key="n" name="star" class="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" />
                  </div>
                </div>
                <p class="mt-2 text-[10px] font-black uppercase tracking-wider text-indigo-100/80">Peringkat Layanan Mitreka</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>

    <div v-if="selectedContractDetail" class="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4" @click="closeContractDetail">
      <div class="w-full max-w-xl rounded-3xl bg-white p-5 shadow-2xl" @click.stop>
        <div class="mb-3 flex items-start justify-between gap-3">
          <div>
            <p class="text-[10px] font-black uppercase tracking-widest text-slate-400">Detail Dokumen Kontrak</p>
            <h3 class="text-xl font-black text-slate-800">{{ selectedContractDetail.name }}</h3>
            <p class="mt-1 text-xs font-bold text-slate-500">Tersisa {{ selectedContractDetail.days }} hari | {{ selectedContractDetail.docs }} dokumen</p>
          </div>
          <button class="rounded-full bg-slate-100 p-2 text-slate-500" @click="closeContractDetail">
            <Icon name="x" class="h-4 w-4" />
          </button>
        </div>

        <div class="space-y-2">
          <article
            v-for="doc in selectedContractDetail.documents"
            :key="doc.id"
            class="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5"
          >
            <div class="min-w-0">
              <p class="truncate text-sm font-black text-slate-700">{{ doc.name }}</p>
              <p class="text-[10px] font-bold uppercase tracking-wide text-slate-400">Update: {{ doc.updatedAt }}</p>
            </div>
            <span
              class="rounded-lg px-2 py-1 text-[10px] font-black uppercase"
              :class="doc.status === 'Lengkap' ? 'bg-emerald-100 text-emerald-700' : doc.status === 'Review' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'"
            >
              {{ doc.status }}
            </span>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@/composables/Icon";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

const filterStatus = ref("Semua");
const filterTahun = ref("Semua");
const statusOptions = [
  { value: "Semua", label: "Semua" },
  { value: "Open", label: "Open" },
  { value: "Closed", label: "Closed" },
];
const tahunOptions = [
  { value: "Semua", label: "Semua" },
  { value: "2025", label: "2025" },
  { value: "2026", label: "2026" },
];

const targetRevenue = { actual: 24.8, target: 35.0, unit: "M", percent: 70.8 };
const bankLateSummary = { total: 9, threshold: 3 };

const bankData = [
  { id: 1, name: "Mandiri Mitreka", days: 6 },
  { id: 2, name: "BCA Mitreka", days: 6 },
  { id: 3, name: "BCA Owner", days: 41 },
  { id: 4, name: "BNI Mitreka", days: 12 },
  { id: 5, name: "CIMB Niaga", days: 8 },
  { id: 6, name: "Mandiri Giro", days: 4 },
  { id: 7, name: "BRI Mitreka", days: 5 },
  { id: 8, name: "Bank Jatim", days: 3 },
  { id: 9, name: "Danamon", days: 7 },
];

const berakhirKontrak = [
  {
    id: 1,
    name: "Marketing Imigrasi",
    days: 5,
    docs: 7,
    progress: 98,
    color: "bg-[#00D094]",
    documents: [
      { id: "MI-1", name: "Kontrak Kerja Sama", status: "Lengkap", updatedAt: "26 Feb 2026" },
      { id: "MI-2", name: "Berita Acara Serah Terima", status: "Review", updatedAt: "25 Feb 2026" },
      { id: "MI-3", name: "Faktur Termin 2", status: "Kurang", updatedAt: "24 Feb 2026" },
    ],
  },
  {
    id: 2,
    name: "Kejagung Statistik Kriminal",
    days: 15,
    docs: 10,
    progress: 80,
    color: "bg-[#00A3FF]",
    documents: [
      { id: "KS-1", name: "Amandemen SLA", status: "Review", updatedAt: "25 Feb 2026" },
      { id: "KS-2", name: "Lampiran Scope Phase 2", status: "Lengkap", updatedAt: "23 Feb 2026" },
      { id: "KS-3", name: "Invoice Progress", status: "Lengkap", updatedAt: "22 Feb 2026" },
    ],
  },
  {
    id: 3,
    name: "Asabri Mobile App",
    days: 25,
    docs: 12,
    progress: 60,
    color: "bg-[#FFA000]",
    documents: [
      { id: "AM-1", name: "Draft Renewal Kontrak", status: "Kurang", updatedAt: "21 Feb 2026" },
      { id: "AM-2", name: "Checklist Compliance", status: "Review", updatedAt: "20 Feb 2026" },
      { id: "AM-3", name: "Lampiran Resource Plan", status: "Lengkap", updatedAt: "19 Feb 2026" },
    ],
  },
  {
    id: 4,
    name: "Dashboard Kinerja PLN",
    days: 9,
    docs: 8,
    progress: 88,
    color: "bg-[#34D399]",
    documents: [
      { id: "PLN-1", name: "Perpanjangan Master Agreement", status: "Review", updatedAt: "26 Feb 2026" },
      { id: "PLN-2", name: "Lampiran Scope Integrasi", status: "Lengkap", updatedAt: "24 Feb 2026" },
      { id: "PLN-3", name: "Checklist Legal Final", status: "Kurang", updatedAt: "23 Feb 2026" },
    ],
  },
  {
    id: 5,
    name: "Monitoring Asset KAI",
    days: 12,
    docs: 6,
    progress: 76,
    color: "bg-[#38BDF8]",
    documents: [
      { id: "KAI-1", name: "Draft Addendum Tahap 2", status: "Review", updatedAt: "25 Feb 2026" },
      { id: "KAI-2", name: "Berita Acara Implementasi", status: "Lengkap", updatedAt: "24 Feb 2026" },
      { id: "KAI-3", name: "Rincian Deliverables", status: "Lengkap", updatedAt: "22 Feb 2026" },
    ],
  },
  {
    id: 6,
    name: "Portal Pajak Daerah",
    days: 19,
    docs: 5,
    progress: 62,
    color: "bg-[#F59E0B]",
    documents: [
      { id: "PJD-1", name: "Konfirmasi Jadwal Renewal", status: "Kurang", updatedAt: "22 Feb 2026" },
      { id: "PJD-2", name: "Lampiran Biaya Maintenance", status: "Review", updatedAt: "21 Feb 2026" },
      { id: "PJD-3", name: "Notulen Meeting Vendor", status: "Lengkap", updatedAt: "20 Feb 2026" },
    ],
  },
];
const selectedContractDetail = ref<(typeof berakhirKontrak)[number] | null>(null);

const berakhirSupport = [
  { id: 1, name: "Sistem Informasi D3TLH", days: 5 },
  { id: 2, name: "Marketing Kemenkes", days: 15 },
  { id: 3, name: "Internal Finance System", days: 25 },
  { id: 4, name: "Support Integrasi Dukcapil", days: 7 },
  { id: 5, name: "Layanan Helpdesk Pemprov Jatim", days: 11 },
  { id: 6, name: "Support Infrastruktur BPKAD", days: 13 },
  { id: 7, name: "Support API e-Procurement", days: 18 },
  { id: 8, name: "Managed Service SOC", days: 22 },
];

const belumBerkontrak = [
  { id: 1, name: "BIG Integrated MPC", days: 50, cost: "60.000.000" },
  { id: 2, name: "Marketing Sulut Command Center", days: 35, cost: "120.000.000" },
  { id: 3, name: "Internal Taskflow RDD", days: 15, cost: "10.000.000" },
];

function openContractDetail(item: (typeof berakhirKontrak)[number]): void {
  selectedContractDetail.value = item;
}

function closeContractDetail(): void {
  selectedContractDetail.value = null;
}
</script>

<style scoped>
.finance-glass-card {
  position: relative;
  overflow: hidden;
  --finance-accent: #00a3ff;
  border: 1px solid rgba(255, 255, 255, 0.72);
  background:
    linear-gradient(165deg, rgb(255 255 255 / 0%), rgba(255, 255, 255, 0.38) 62%, rgba(255, 255, 255, 0.28)),
    rgba(255, 255, 255, 0.42);
  backdrop-filter: blur(28px) saturate(1.15);
  border-radius: 2.2rem;
  padding: 1.5rem;
  box-shadow:
    0 12px 24px -18px rgba(96, 165, 250, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.72),
    inset 0 -14px 30px -26px rgba(147, 197, 253, 0.45);
}

.finance-glass-card::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(255, 255, 255, 0.55);
  background:
    radial-gradient(420px 420px at 108% -8%, rgba(255, 255, 255, 0.42), rgba(255, 255, 255, 0) 72%),
    radial-gradient(420px 420px at -8% 108%, rgba(147, 197, 253, 0.34), rgba(147, 197, 253, 0) 74%);
  box-shadow:
    inset 0 0 22px rgba(255, 255, 255, 0.24),
    inset 0 -18px 34px -26px rgba(147, 197, 253, 0.52);
  pointer-events: none;
}

.finance-glass-card::after {
  content: "";
  position: absolute;
  left: 0.1rem;
  right: 0.1rem;
  top: 0;
  height: 1.95rem;
  border-top: 2px solid color-mix(in oklch, var(--finance-accent), white 52%);
  border-top-left-radius: 2rem;
  border-top-right-radius: 2rem;
  background: linear-gradient(
    180deg,
    color-mix(in oklch, var(--finance-accent), white 66%) 0%,
    color-mix(in oklch, var(--finance-accent), white 82%) 36%,
    rgba(255, 255, 255, 0.11) 60%,
    rgba(255, 255, 255, 0) 100%
  );
  opacity: 0.95;
  filter: saturate(1.1);
  pointer-events: none;
}

.finance-glass-card > * {
  position: relative;
  z-index: 1;
}

.finance-card-head {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.finance-card-head h3 {
  font-size: 1.125rem;
  font-weight: 900;
  font-style: italic;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  color: rgb(15 23 42);
  position: relative;
  padding-bottom: 0.42rem;
}

.finance-card-head h3::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 2.1rem;
  height: 0.2rem;
  border-radius: 9999px;
  background: var(--finance-accent);
}

.finance-card-head span {
  border: 1px solid rgba(226, 232, 240, 0.9);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 0.75rem;
  padding: 0.35rem 0.55rem;
  color: rgb(100 116 139);
  font-size: 0.6rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.finance-lift-item {
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.finance-lift-item:hover {
  transform: translateY(-4px) scale(1.015);
  box-shadow: 0 12px 18px -14px rgba(96, 165, 250, 0.42);
  border-color: rgba(147, 197, 253, 0.8);
}

.finance-card-amber {
  --finance-accent: #f59e0b;
}

.finance-card-cyan {
  --finance-accent: #14b8a6;
}

.finance-card-rose {
  --finance-accent: #f43f5e;
}

.finance-card-emerald {
  --finance-accent: #10b981;
}

.finance-card-indigo {
  --finance-accent: #6366f1;
}

.finance-card-pink {
  --finance-accent: #f43f5e;
}

.finance-card-subtitle {
  margin-top: -0.5rem;
  color: rgb(100 116 139);
  font-size: 0.78rem;
  font-weight: 700;
}

.finance-filter-pill :deep(button) {
  border-radius: 9999px;
  min-height: 1.75rem;
  padding-left: 0.7rem;
  padding-right: 0.7rem;
  font-size: 0.72rem;
  font-weight: 800;
  line-height: 1;
}

.finance-filter-pill :deep(.rounded-box) {
  position: absolute !important;
  border-radius: 0.95rem;
  background: #f7fbff !important;
  background-image: none !important;
  border-color: rgba(148, 163, 184, 0.35) !important;
  box-shadow: 0 12px 24px -14px rgba(15, 23, 42, 0.3);
  backdrop-filter: none !important;
  opacity: 1 !important;
  z-index: 60 !important;
}

.finance-filter-pill :deep(.rounded-box ul) {
  background: #f7fbff !important;
}

.finance-filter-pill :deep(.rounded-box li) {
  background: #f7fbff;
  text-shadow: none;
}

.finance-filter-row {
  position: relative;
  z-index: 40;
}

.finance-filter-pill {
  position: relative;
  z-index: 50;
}

.finance-contract-list {
  position: relative;
  z-index: 1;
}

.finance-support-item {
  gap: 0.7rem;
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.finance-support-bullet {
  width: 0.62rem;
  height: 0.62rem;
  flex: none;
  border-radius: 9999px;
  background: #f43f5e;
  box-shadow: 0 0 0 3px rgba(244, 63, 94, 0.12);
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease;
}

.finance-support-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 228, 233, 0.92);
  border-color: rgba(251, 113, 133, 0.5);
  box-shadow: 0 10px 16px -14px rgba(96, 165, 250, 0.38);
}

.finance-support-item:hover .finance-support-bullet {
  transform: scale(1.35);
  box-shadow: 0 0 0 5px rgba(244, 63, 94, 0.2);
}

.finance-late-bank-item {
  transition: transform 180ms ease, background-color 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}

.finance-late-bank-item:hover {
  transform: translateY(-2px);
  background: rgba(255, 251, 235, 0.95);
  border-color: rgba(251, 191, 36, 0.45);
  box-shadow: 0 14px 22px -18px rgba(217, 119, 6, 0.45);
}

.finance-contract-item {
  transition: transform 180ms ease, box-shadow 180ms ease, background-color 180ms ease, border-color 180ms ease;
}

.finance-contract-item:hover {
  transform: translateY(-2px);
  background: rgba(236, 253, 245, 0.96);
  border-color: rgba(52, 211, 153, 0.55);
  box-shadow: 0 10px 16px -14px rgba(96, 165, 250, 0.38);
}

.finance-satisfaction-card {
  display: flex;
  align-items: center;
  transition: transform 220ms ease, box-shadow 220ms ease;
}

.finance-satisfaction-card:hover {
  transform: translateY(-4px) scale(1.015);
  box-shadow:
    0 16px 26px -18px rgba(96, 165, 250, 0.45),
    0 8px 14px -10px rgba(147, 197, 253, 0.35);
}

.finance-smile-box {
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.42),
    0 10px 16px -12px rgba(96, 165, 250, 0.42);
}

.finance-scrollpane {
  scrollbar-width: thin;
  scrollbar-color: rgba(96, 165, 250, 0.7) rgba(219, 234, 254, 0.6);
}

.finance-scrollpane::-webkit-scrollbar {
  width: 8px;
}

.finance-scrollpane::-webkit-scrollbar-track {
  background: rgba(219, 234, 254, 0.6);
  border-radius: 999px;
}

.finance-scrollpane::-webkit-scrollbar-thumb {
  background: rgba(96, 165, 250, 0.7);
  border-radius: 999px;
}

.finance-late-title {
  white-space: nowrap;
  font-size: 1.04rem !important;
  letter-spacing: -0.025em;
}
</style>
