<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@/composables/Icon";
import coreFlowImg from "@/assets/icon-product/CoreFlow.png";
import pmToolsImg from "@/assets/icon-product/PMTools.png";
import financeImg from "@/assets/icon-product/Finance.png";
import salesImg from "@/assets/icon-product/Sales.png";
import tenderImg from "@/assets/icon-product/Tender.png";

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const showPassword = ref(false);
const isLoading = ref(false);

const apps = [
  {
    id: "pm-tools",
    name: "PM Tools",
    tagline: "Project tracking, milestone, dan kolaborasi tim.",
    description:
      "PM Tools membantu tim menjalankan proyek dari tahap kickoff sampai handover dengan alur yang rapi, transparan, dan mudah dipantau semua stakeholder.",
    valueProps: [
      "Timeline proyek, milestone, dan dependency terlihat dalam satu dashboard.",
      "Progress real-time, blocker, dan risiko proyek bisa dipantau tanpa rapat panjang.",
      "Kolaborasi lintas divisi jadi lebih cepat dengan catatan kerja yang terpusat.",
    ],
    bestFor:
      "Cocok untuk PMO, tim delivery, engineering, dan unit bisnis yang mengelola banyak proyek berjalan sekaligus.",
    iconImage: pmToolsImg,
    icon: "clipboardClock",
    brandColor: "#166534",
  },
  {
    id: "task-flow",
    name: "Task Flow",
    tagline: "Workflow assignment dan monitoring task harian.",
    description:
      "Task Flow memastikan pekerjaan harian bergerak konsisten dari backlog ke done, lengkap dengan prioritas, SLA, dan status yang selalu up-to-date.",
    valueProps: [
      "Distribusi task lebih adil lewat visibilitas kapasitas kerja tiap anggota tim.",
      "Pengingat otomatis untuk due date membantu menekan keterlambatan pekerjaan.",
      "Setiap perubahan status terdokumentasi untuk kebutuhan audit aktivitas kerja.",
    ],
    bestFor:
      "Ideal untuk operasional harian, tim support, dan unit eksekusi yang membutuhkan kecepatan serta konsistensi.",
    iconImage: "",
    icon: "clipboardClock",
  },
  {
    id: "hris",
    name: "HRIS",
    tagline: "Employee lifecycle, attendance, dan leave management.",
    description:
      "HRIS menyatukan proses SDM dari onboarding sampai offboarding sehingga data karyawan, administrasi, dan approval selalu sinkron.",
    valueProps: [
      "Absensi, cuti, lembur, dan dokumen personal karyawan dikelola dalam satu portal.",
      "Workflow approval HR lebih cepat dengan notifikasi yang jelas dan jejak keputusan.",
      "Laporan SDM siap pakai untuk kebutuhan evaluasi dan pengambilan keputusan manajemen.",
    ],
    bestFor:
      "Dirancang untuk HR team, people manager, dan pimpinan yang butuh insight SDM secara akurat dan cepat.",
    iconImage: "",
    icon: "users",
  },
  {
    id: "finance",
    name: "Finance",
    tagline: "Cashflow, budgeting, dan financial control dashboard.",
    description:
      "Finance memberikan kontrol menyeluruh atas cashflow, budget, dan realisasi biaya agar setiap keputusan bisnis lebih presisi.",
    valueProps: [
      "Monitoring arus kas masuk-keluar secara real-time untuk menjaga kesehatan finansial.",
      "Kontrol budget per unit atau proyek dengan alert saat mendekati batas anggaran.",
      "Ringkasan performa keuangan yang mudah dibaca untuk laporan pimpinan.",
    ],
    bestFor:
      "Sangat tepat untuk tim finance, accounting, project controller, dan leader yang fokus pada efisiensi biaya.",
    iconImage: financeImg,
    icon: "credit-card",
    brandColor: "#025097",
  },
  {
    id: "sales",
    name: "Sales",
    tagline: "Pipeline, lead, dan performa revenue terintegrasi.",
    description:
      "Sales membantu tim komersial mengelola perjalanan pelanggan dari lead awal sampai deal closing dengan visibilitas pipeline yang kuat.",
    valueProps: [
      "Tracking lead dan opportunity lebih terstruktur agar tidak ada prospek yang terlewat.",
      "Forecast revenue lebih akurat lewat status pipeline dan probabilitas deal.",
      "Aktivitas follow-up terdokumentasi untuk meningkatkan rasio closing.",
    ],
    bestFor:
      "Cocok untuk sales team, account manager, dan business development yang menargetkan pertumbuhan revenue berkelanjutan.",
    iconImage: salesImg,
    icon: "trendingUp",
    brandColor: "#fa6407",
  },
  {
    id: "admin-tender",
    name: "Admin & Tender",
    tagline: "Tender process, compliance, dan approval governance.",
    description:
      "Admin & Tender menata proses tender dari persiapan dokumen hingga final approval agar lebih tertib, cepat, dan sesuai regulasi.",
    valueProps: [
      "Checklist dokumen tender dan compliance tersedia dalam alur yang jelas.",
      "Setiap tahapan approval tercatat untuk meminimalkan risiko administratif.",
      "Koordinasi antar tim legal, procurement, dan operasional jadi lebih sinkron.",
    ],
    bestFor:
      "Sangat relevan untuk procurement, legal, admin project, dan tim governance.",
    iconImage: tenderImg,
    icon: "settings",
    brandColor: "#8e2de2",
  },
  {
    id: "knowledge-doc",
    name: "Knowledge & Doc Center",
    tagline: "Pusat dokumen, SOP, dan knowledge base perusahaan.",
    description:
      "Knowledge & Doc Center menjadi rumah utama untuk dokumen resmi, SOP, dan referensi kerja agar pengetahuan perusahaan tidak tercecer.",
    valueProps: [
      "Versi dokumen terkontrol, sehingga tim selalu memakai referensi terbaru.",
      "Pencarian cepat memudahkan user menemukan SOP dan panduan yang dibutuhkan.",
      "Akses berbasis peran menjaga keamanan dokumen sensitif perusahaan.",
    ],
    bestFor:
      "Pas untuk seluruh unit kerja yang membutuhkan repositori pengetahuan terpusat dan aman.",
    iconImage: "",
    icon: "book",
  },
  {
    id: "kpi-okr",
    name: "KPI & OKR",
    tagline: "Objective tracking dan alignment target lintas unit.",
    description:
      "KPI & OKR memastikan strategi perusahaan turun menjadi target kerja yang terukur, transparan, dan selaras di semua level organisasi.",
    valueProps: [
      "Objective perusahaan dapat diturunkan ke tim dan individu dengan indikator jelas.",
      "Capaian target termonitor periodik untuk mendorong eksekusi yang disiplin.",
      "Evaluasi performa lebih objektif berbasis data dan kontribusi nyata.",
    ],
    bestFor:
      "Direkomendasikan untuk manajemen, PMO strategis, dan people leader yang mengawal performa lintas fungsi.",
    iconImage: "",
    icon: "trendingUp",
    brandColor: "#b42318",
  },
  {
    id: "helpdesk",
    name: "Helpdesk",
    tagline: "Service request dan support ticket terpusat.",
    description:
      "Helpdesk memusatkan seluruh request layanan internal agar penanganan isu lebih cepat, terukur, dan sesuai standar SLA perusahaan.",
    valueProps: [
      "Ticket otomatis terklasifikasi berdasarkan prioritas untuk respon yang lebih tepat.",
      "SLA dan eskalasi jelas, sehingga user tahu status penanganan setiap saat.",
      "Laporan performa support membantu tim meningkatkan kualitas layanan berkala.",
    ],
    bestFor:
      "Ideal untuk tim IT support, general service, dan unit layanan internal yang menangani banyak permintaan harian.",
    iconImage: "",
    icon: "message-circle",
  },
] as const;

const selectedApp = ref<(typeof apps)[number] | null>(null);

const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert("Login portal berhasil! (Demo)");
  }, 1500);
};

const handleSso = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert("Redirect ke SSO berhasil! (Demo)");
  }, 1200);
};

const openAppModal = (app: (typeof apps)[number]) => {
  selectedApp.value = app;
};

const closeAppModal = () => {
  selectedApp.value = null;
};

const hexToRgb = (hex: string) => {
  const raw = hex.replace("#", "");
  const normalized = raw.length === 3
    ? raw.split("").map((char) => char + char).join("")
    : raw;

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return null;

  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);

  return `${r} ${g} ${b}`;
};

const getAppBrandVars = (color?: string) => {
  if (!color) return undefined;
  const rgb = hexToRgb(color);
  if (!rgb) return undefined;

  return {
    "--app-brand-rgb": rgb,
  } as Record<string, string>;
};
</script>

<template>
  <div class="min-h-screen flex">
    <div class="w-full lg:basis-[42%] lg:max-w-[680px] flex items-center justify-center p-6 md:p-12">
      <div class="w-full max-w-md space-y-8">
        <div class="text-center">
          <img
            src="@/assets/full-vertical-layout-for-light-background.svg"
            alt="Mitreka Logo"
            class="h-16 mx-auto mb-4 logo-light"
          />
          <img
            src="@/assets/full-vertical-layout-for-dark-background.svg"
            alt="Mitreka Logo"
            class="h-16 mx-auto mb-4 logo-dark"
          />
          <h1 class="text-2xl font-bold">Selamat Datang</h1>
          <p class="text-sm opacity-60 mt-1">Masuk ke portal terpusat untuk melanjutkan</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div>
            <label class="block text-sm font-medium mb-1.5">Email</label>
            <input
              v-model="form.email"
              type="email"
              class="input w-full"
              placeholder="nama@email.com"
              required
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1.5">Password</label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="input w-full pr-10"
                placeholder="Masukkan password"
                required
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                @click="showPassword = !showPassword"
              >
                <Icon name="eye" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input v-model="form.remember" type="checkbox" class="checkbox checkbox-primary checkbox-sm" />
              <span class="text-sm">Ingat saya</span>
            </label>
            <router-link to="/auth/forgot" class="text-sm text-primary hover:underline">
              Lupa password?
            </router-link>
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <span v-else>Masuk</span>
          </button>
        </form>

        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-base-300"></div>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="px-2 bg-base-100 text-base-content/50">atau lanjutkan dengan</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button type="button" class="btn btn-outline">
            <svg class="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          <button type="button" class="btn btn-outline" @click="handleSso" :disabled="isLoading">
            <Icon name="shield" class="w-5 h-5" />
            SSO
          </button>
        </div>

        <p class="text-center text-sm">
          Belum punya akun?
          <router-link to="/auth/register" class="text-primary font-medium hover:underline">
            Daftar sekarang
          </router-link>
        </p>
      </div>
    </div>

    <div class="hidden lg:flex lg:basis-[58%] relative overflow-hidden">
      <img
        src="https://picsum.photos/1400/1100?random=33"
        alt="Portal Background"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 right-overlay"></div>

      <div class="relative z-10 w-full p-6 xl:p-8 text-white flex items-center justify-center">
        <div class="w-full max-w-2xl space-y-4">
          <div class="text-center">
            <div class="core-logo-shell mx-auto">
              <img :src="coreFlowImg" alt="Core Flow ERP" class="core-logo" />
            </div>
            <h2 class="text-3xl xl:text-[2rem] font-semibold tracking-tight">Core Flow ERP</h2>
            <p class="mt-1 text-sm text-white/90">A Collaborative Flow of Efficient Corporate ERP</p>
          </div>

          <div class="grid grid-cols-1 xl:grid-cols-2 gap-2.5 app-list">
            <article
              v-for="app in apps"
              :key="app.id"
              class="app-card rounded-xl p-3"
              :class="{ 'app-card--default': !app.brandColor }"
              :style="getAppBrandVars(app.brandColor)"
              role="button"
              tabindex="0"
              @click="openAppModal(app)"
              @keydown.enter.prevent="openAppModal(app)"
              @keydown.space.prevent="openAppModal(app)"
            >
              <span class="app-hover-chip">Detail</span>
              <div class="flex items-start gap-2.5">
                <div
                  class="app-icon-shell app-icon-shell--list"
                  :class="{ 'app-icon-shell--default': !app.brandColor }"
                  :style="getAppBrandVars(app.brandColor)"
                >
                  <img v-if="app.iconImage" :src="app.iconImage" :alt="app.name" class="app-icon-img app-icon-img--list" />
                  <Icon v-else :name="app.icon" class="w-5 h-5" />
                </div>
                <div class="min-w-0">
                  <p class="font-semibold leading-tight">{{ app.name }}</p>
                  <p class="text-sm text-white/85 mt-0.5 app-tagline">{{ app.tagline }}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="selectedApp" class="app-detail-overlay" role="dialog" aria-modal="true" @click.self="closeAppModal">
        <div class="app-detail-modal">
          <div class="app-detail-header">
            <div class="app-detail-title-wrap">
              <div class="app-detail-title-icon">
                <Icon name="sparkles" class="w-4 h-4" />
              </div>
              <p class="app-detail-eyebrow">Module Overview</p>
              <h3 class="app-detail-title">{{ selectedApp.name }}</h3>
            </div>
            <button type="button" class="btn btn-ghost btn-sm app-detail-close" @click="closeAppModal" aria-label="Close">
              <Icon name="x" class="w-4 h-4" />
            </button>
          </div>

          <div class="app-detail-body">
            <div class="app-detail-hero">
              <div
                class="app-icon-shell modal-icon"
                :class="{ 'app-icon-shell--default': selectedApp && !selectedApp.brandColor }"
                :style="selectedApp ? getAppBrandVars(selectedApp.brandColor) : undefined"
              >
                <img
                  v-if="selectedApp.iconImage"
                  :src="selectedApp.iconImage"
                  :alt="selectedApp.name"
                  class="app-icon-img modal-icon-image"
                />
                <Icon v-else :name="selectedApp.icon" class="w-7 h-7" />
              </div>
              <div class="app-detail-hero-copy">
                <p class="app-detail-tagline">{{ selectedApp.tagline }}</p>
                <p class="app-detail-description">{{ selectedApp.description }}</p>
              </div>
            </div>

            <div class="app-brochure-section">
              <p class="app-brochure-title">Keunggulan Utama</p>
              <ul class="app-brochure-list">
                <li v-for="point in selectedApp.valueProps" :key="point">{{ point }}</li>
              </ul>
            </div>

            <div class="app-brochure-spotlight">
              <p class="app-brochure-title">Paling Tepat Untuk</p>
              <p class="app-brochure-description">{{ selectedApp.bestFor }}</p>
            </div>
          </div>

          <div class="app-detail-actions">
            <button type="button" class="btn btn-primary btn-sm" @click="closeAppModal">Mengerti</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.logo-light {
  display: block;
}

.logo-dark {
  display: none;
}

.right-overlay {
  background:
    radial-gradient(circle at 20% 16%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0) 35%),
    linear-gradient(145deg, rgba(6, 27, 47, 0.56), rgba(16, 46, 84, 0.62));
}

.core-logo-shell {
  position: relative;
  width: 168px;
  height: 106px;
  overflow: visible;
  border-radius: 30px 34px 26px 30px;
  background:
    radial-gradient(circle at 20% 16%, rgba(255, 255, 255, 0.64), rgba(255, 255, 255, 0.16) 46%, rgba(255, 255, 255, 0.06)),
    linear-gradient(150deg, rgba(246, 252, 255, 0.34), rgba(229, 244, 255, 0.1));
  border: 1px solid rgba(235, 246, 255, 0.58);
  box-shadow:
    0 10px 28px rgba(10, 23, 41, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.56);
  transform: perspective(920px) rotateX(11deg) rotateZ(-2.6deg);
  transform-origin: center;
  backdrop-filter: blur(12px) saturate(125%);
  display: grid;
  place-items: center;
}

.core-logo-shell::after {
  content: "";
  position: absolute;
  inset: 1px;
  border-radius: 29px 33px 25px 29px;
  pointer-events: none;
  background:
    linear-gradient(178deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0.08) 42%, rgba(255, 255, 255, 0) 66%),
    radial-gradient(circle at 66% 92%, rgba(140, 255, 182, 0.28), rgba(140, 255, 182, 0) 54%);
}

.core-logo {
  position: relative;
  z-index: 1;
  width: 146px;
  max-height: 102px;
  object-fit: contain;
  transform: translateY(-12px) scale(1.03);
  filter: drop-shadow(0 8px 12px rgba(0, 0, 0, 0.18));
}

.app-list {
  max-height: none;
  overflow: visible;
  padding-top: 0.3rem;
  padding-left: 0.2rem;
  padding-right: 0.2rem;
}

.app-card {
  position: relative;
  overflow: hidden;
  cursor: pointer;
  border: 1px solid rgba(var(--app-brand-rgb, 255 255 255) / 0.34);
  background: linear-gradient(
    145deg,
    rgba(var(--app-brand-rgb, 255 255 255) / 0.24),
    rgba(var(--app-brand-rgb, 255 255 255) / 0.09)
  );
  backdrop-filter: blur(14px) saturate(130%);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    0 10px 26px rgba(0, 0, 0, 0.18),
    0 0 0 1px rgba(var(--app-brand-rgb, 255 255 255) / 0.08);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.app-card--default {
  border: 1px solid rgba(255, 255, 255, 0.26);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.08));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.22), 0 10px 26px rgba(0, 0, 0, 0.18);
}

.app-card:hover {
  transform: translateY(-6px) scale(1.015);
  border-color: rgba(var(--app-brand-rgb, 255 255 255) / 0.58);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 18px 36px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(var(--app-brand-rgb, 255 255 255) / 0.26),
    0 0 28px rgba(var(--app-brand-rgb, 255 255 255) / 0.18);
}

.app-card--default:hover {
  border-color: rgba(255, 255, 255, 0.42);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 18px 36px rgba(0, 0, 0, 0.28),
    0 0 0 1px rgba(255, 255, 255, 0.08);
}

.app-hover-chip {
  position: absolute;
  top: 0.6rem;
  right: 0.65rem;
  font-size: 0.68rem;
  letter-spacing: 0.02em;
  line-height: 1;
  padding: 0.3rem 0.48rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.95);
  background: rgba(20, 35, 58, 0.45);
  border: 1px solid rgba(255, 255, 255, 0.28);
  backdrop-filter: blur(8px);
  opacity: 0;
  transform: translateY(6px) scale(0.96);
  transition: opacity 180ms ease, transform 220ms ease;
  pointer-events: none;
}

.app-card:hover .app-hover-chip {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.app-icon-shell {
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 0.8rem;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  border: 1px solid rgba(var(--app-brand-rgb, 255 255 255) / 0.72);
  background:
    radial-gradient(circle at 28% 24%, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.02) 52%),
    linear-gradient(165deg, rgba(var(--app-brand-rgb, 255 255 255) / 0.78), rgba(var(--app-brand-rgb, 255 255 255) / 0.62));
  box-shadow:
    0 8px 20px rgba(0, 0, 0, 0.24),
    0 0 14px rgba(var(--app-brand-rgb, 255 255 255) / 0.28);
}

.app-icon-shell--default {
  border: 1px solid rgba(255, 255, 255, 0.4);
  background:
    radial-gradient(circle at 30% 25%, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0.08));
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.24);
}

.app-icon-img {
  width: 1.25rem;
  height: 1.25rem;
  object-fit: contain;
}

.app-icon-shell--list {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.9rem;
}

.app-icon-img--list {
  width: 1.45rem;
  height: 1.45rem;
}

.app-tagline {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 1.2;
  overflow: hidden;
}

.app-detail-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.app-detail-modal {
  width: min(860px, 96vw);
  max-height: min(88vh, 860px);
  overflow: auto;
  border-radius: 1.1rem;
  border: 1px solid rgba(255, 255, 255, 0.28);
  background:
    radial-gradient(circle at 12% 14%, rgba(28, 133, 255, 0.18), transparent 34%),
    radial-gradient(circle at 86% 88%, rgba(255, 142, 62, 0.16), transparent 36%),
    linear-gradient(152deg, rgba(17, 25, 40, 0.74), rgba(10, 14, 24, 0.66));
  color: #f8fafc;
  box-shadow:
    0 24px 60px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  padding: 1.15rem;
  backdrop-filter: blur(10px) saturate(85%);
  -webkit-backdrop-filter: blur(10px) saturate(85%);
}

.app-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.75rem;
}

.app-detail-title-wrap {
  min-width: 0;
}

.app-detail-title-icon {
  width: 1.75rem;
  height: 1.75rem;
  border-radius: 0.55rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.35rem;
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 16%, white 84%);
  border: 1px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
}

.app-detail-eyebrow {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  opacity: 0.76;
}

.app-detail-title {
  margin-top: 0.15rem;
  font-size: 1.1rem;
  font-weight: 700;
}

.app-detail-close {
  color: #ffffff !important;
}

.app-detail-body {
  margin-top: 0.8rem;
  display: grid;
  gap: 0.75rem;
  padding: 0.9rem;
  border-radius: 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04)),
    rgba(255, 255, 255, 0.02);
}

.app-detail-hero {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.app-detail-hero-copy {
  min-width: 0;
}

.app-detail-tagline {
  font-size: 0.92rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.96);
}

.app-detail-description {
  margin-top: 0.35rem;
  font-size: 0.9rem;
  line-height: 1.58;
  color: rgba(255, 255, 255, 0.84);
}

.app-brochure-section,
.app-brochure-spotlight {
  border-radius: 0.75rem;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(7, 16, 30, 0.3);
  padding: 0.75rem 0.85rem;
}

.app-brochure-title {
  font-size: 0.8rem;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.app-brochure-list {
  margin-top: 0.45rem;
  display: grid;
  gap: 0.5rem;
  padding-left: 1rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.9rem;
  line-height: 1.45;
}

.app-brochure-description {
  margin-top: 0.45rem;
  color: rgba(255, 255, 255, 0.92);
  font-size: 0.9rem;
  line-height: 1.52;
}

.app-detail-actions {
  margin-top: 0.75rem;
  display: flex;
  justify-content: flex-end;
}

.modal-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 1.1rem;
  border-color: rgba(255, 255, 255, 0.48);
  background:
    radial-gradient(circle at 34% 24%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.14) 46%, rgba(255, 255, 255, 0.06)),
    linear-gradient(145deg, rgba(255, 255, 255, 0.26), rgba(255, 255, 255, 0.09));
  box-shadow:
    0 14px 26px rgba(0, 0, 0, 0.34),
    0 0 28px rgba(106, 181, 255, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.46);
}

.modal-icon-image {
  width: 2.5rem;
  height: 2.5rem;
  filter: drop-shadow(0 5px 10px rgba(0, 0, 0, 0.3));
}

@media (max-width: 640px) {
  .app-detail-hero {
    flex-direction: column;
    align-items: flex-start;
  }
}

:root[data-theme="mitrekadark"] .logo-light {
  display: none;
}

:root[data-theme="mitrekadark"] .logo-dark {
  display: block;
}
</style>
