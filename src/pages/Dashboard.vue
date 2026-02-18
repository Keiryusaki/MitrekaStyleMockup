<template>
  <div class="space-y-8 min-w-0">
    <!-- Hero Section -->
    <section class="relative overflow-hidden rounded-2xl hero-gradient p-8 md:p-12 text-white">
      <div class="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.08%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
      <div class="relative z-10">
        <div class="flex items-center gap-3 mb-4">
          <Icon name="sparkles" class="w-8 h-8" />
          <span class="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">v{{ appVersion }}</span>
        </div>
        <h1 class="text-3xl md:text-4xl font-bold mb-3">Mitreka Design System</h1>
        <p class="text-lg opacity-90 max-w-2xl mb-6">
          Koleksi komponen UI yang konsisten dan reusable untuk membangun aplikasi web modern dengan Vue 3 dan Tailwind CSS.
        </p>
        <div class="flex flex-wrap gap-3">
          <router-link to="/guide" class="inline-flex items-center gap-2 bg-white text-primary dark:text-accent font-semibold px-5 py-2.5 rounded-lg hover:bg-white/90 transition-colors">
            <Icon name="book" class="w-4 h-4" />
            Dokumentasi
          </router-link>
          <router-link to="/button" class="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 font-medium px-5 py-2.5 rounded-lg transition-colors">
            <Icon name="box" class="w-4 h-4" />
            Lihat Komponen
          </router-link>
        </div>
      </div>
    </section>

    <!-- Quick Stats -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="card p-5 hover:shadow-lg transition-shadow group">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-xl stat-icon-bg flex items-center justify-center text-primary dark:text-accent group-hover:scale-110 transition-transform">
            <Icon :name="stat.icon" class="w-6 h-6" />
          </div>
          <div>
            <div class="text-2xl font-bold">{{ stat.value }}</div>
            <div class="text-sm opacity-70">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Content Grid -->
    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Featured Components -->
      <section class="lg:col-span-2 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-semibold">Komponen Populer</h2>
          <router-link to="/button" class="text-sm text-primary dark:text-accent hover:underline inline-flex items-center gap-1">
            Lihat semua
            <Icon name="arrowRight" class="w-4 h-4" />
          </router-link>
        </div>
        <div class="grid sm:grid-cols-2 gap-4">
          <router-link 
            v-for="comp in featuredComponents" 
            :key="comp.name" 
            :to="comp.to"
            class="card p-5 hover:shadow-lg card-hover-border transition-all group"
          >
            <div class="flex items-start gap-4">
              <div class="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center comp-icon-hover transition-colors">
                <Icon :name="comp.icon" class="w-5 h-5 opacity-70 group-hover:opacity-100 group-hover:text-primary dark:group-hover:text-accent transition-all" />
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="font-semibold group-hover:text-primary dark:group-hover:text-accent transition-colors">{{ comp.name }}</h3>
                <p class="text-sm opacity-70 line-clamp-2">{{ comp.desc }}</p>
              </div>
            </div>
          </router-link>
        </div>
      </section>

      <!-- Quick Links & Updates -->
      <section class="space-y-6">
        <!-- Quick Links -->
        <div class="card p-5">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <Icon name="zap" class="w-5 h-5 text-primary dark:text-accent" />
            Quick Links
          </h3>
          <div class="space-y-2">
            <a 
              v-for="link in quickLinks" 
              :key="link.label"
              :href="link.href" 
              target="_blank"
              class="flex items-center gap-3 p-2.5 rounded-lg hover:bg-base-200 transition-colors group"
            >
              <Icon :name="link.icon" class="w-5 h-5 opacity-60 group-hover:opacity-100" />
              <span class="flex-1">{{ link.label }}</span>
              <Icon name="externalLink" class="w-4 h-4 opacity-40" />
            </a>
          </div>
        </div>

        <!-- Recent Updates -->
        <div class="card p-5">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <Icon name="trendingUp" class="w-5 h-5 text-primary dark:text-accent" />
            Update Terbaru
          </h3>
          <div class="space-y-3">
            <div v-for="update in recentUpdates" :key="update.title" class="flex gap-3">
              <div class="w-2 h-2 rounded-full mt-2 flex-shrink-0" :class="update.color"></div>
              <div>
                <div class="font-medium text-sm">{{ update.title }}</div>
                <div class="text-xs opacity-60">{{ update.date }}</div>
              </div>
            </div>
          </div>
          <router-link to="/ChangeLog" class="mt-4 text-sm text-primary dark:text-accent hover:underline inline-flex items-center gap-1">
            Lihat changelog
            <Icon name="arrowRight" class="w-4 h-4" />
          </router-link>
        </div>
      </section>
    </div>

    <!-- Getting Started -->
    <section class="card p-6 md:p-8 min-w-0">
      <div class="flex items-start gap-4 mb-6">
        <div class="w-12 h-12 rounded-xl rocket-icon-bg flex items-center justify-center text-white flex-shrink-0">
          <Icon name="rocket" class="w-6 h-6" />
        </div>
        <div>
          <h2 class="text-xl font-semibold">Getting Started</h2>
          <p class="text-sm opacity-70">Mulai gunakan Mitreka Design System di project kamu</p>
        </div>
      </div>
      <div class="grid md:grid-cols-3 gap-4 min-w-0">
        <div v-for="(step, idx) in gettingStartedSteps" :key="step.title" class="p-4 rounded-xl bg-base-200/50 border border-base-300 min-w-0">
          <div class="w-8 h-8 rounded-full step-number-bg text-primary dark:text-accent font-bold flex items-center justify-center mb-3">
            {{ idx + 1 }}
          </div>
          <h3 class="font-semibold mb-1">{{ step.title }}</h3>
          <p class="text-sm opacity-70">{{ step.desc }}</p>
          <code
            v-if="step.code"
            class="block mt-3 max-w-full overflow-x-auto whitespace-pre-wrap break-words text-xs bg-base-300 p-2 rounded"
          >{{ step.code }}</code>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { Icon, type IconName } from "@/composables/Icon";
import { version } from "../../package.json";

const appVersion = version;

const stats = [
  { icon: "box" as IconName, value: "40+", label: "Komponen" },
  { icon: "palette" as IconName, value: "2", label: "Tema" },
  { icon: "component" as IconName, value: "Vue 3", label: "Framework" },
  { icon: "star" as IconName, value: "TS", label: "TypeScript" },
];

const featuredComponents = [
  { name: "Button", icon: "box" as IconName, desc: "Berbagai varian button dengan state dan ukuran", to: "/button" },
  { name: "Modal", icon: "layout" as IconName, desc: "Dialog modal dengan animasi smooth", to: "/modal" },
  { name: "DataTable", icon: "clipboard" as IconName, desc: "Tabel data dengan sorting dan pagination", to: "/datatable" },
  { name: "Toast", icon: "chat" as IconName, desc: "Notifikasi dengan berbagai tipe", to: "/toasts" },
  { name: "Input", icon: "formInput" as IconName, desc: "Form input dengan validasi", to: "/input" },
  { name: "Card", icon: "fileText" as IconName, desc: "Container card yang fleksibel", to: "/card" },
];

const quickLinks = [
  { icon: "externalLink" as IconName, label: "GitHub Repository", href: "https://github.com/Keiryusaki/MitrekaStyleMockup" },
  { icon: "externalLink" as IconName, label: "Tailwind CSS Docs", href: "https://tailwindcss.com/docs" },
  { icon: "externalLink" as IconName, label: "Lucide Icons", href: "https://lucide.dev" },
];

const recentUpdates = [
  { title: "Accordion & Collapse components", date: "30 Dec 2024", color: "bg-green-500" },
  { title: "Avatar & AvatarGroup", date: "24 Dec 2024", color: "bg-blue-500" },
  { title: "Modal dengan backdrop blur", date: "22 Dec 2024", color: "bg-purple-500" },
  { title: "Toast notification system", date: "23 Dec 2024", color: "bg-amber-500" },
];

const gettingStartedSteps = [
  { 
    title: "Setup GitHub Packages", 
    desc: "Tambahkan .npmrc dan set GITHUB_TOKEN (jangan taruh token di file)",
    code: "@keiryusaki:registry=https://npm.pkg.github.com\n//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}"
  },
  { 
    title: "Install Package", 
    desc: "Install @keiryusaki/mitreka-ui via npm",
    code: "npm i @keiryusaki/mitreka-ui"
  },
  { 
    title: "Import Styles", 
    desc: "Import CSS di main entry file",
    code: "import '@keiryusaki/mitreka-ui/css'"
  },
];
</script>

<style scoped>
.hero-gradient {
  background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 85%, black) 100%);
}

:root[data-theme="mitrekadark"] .hero-gradient {
  background: linear-gradient(135deg, var(--color-accent) 0%, color-mix(in srgb, var(--color-accent) 80%, black) 100%);
}

.stat-icon-bg {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

:root[data-theme="mitrekadark"] .stat-icon-bg {
  background: color-mix(in srgb, var(--color-accent) 15%, transparent);
}

.card-hover-border:hover {
  border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
}

:root[data-theme="mitrekadark"] .card-hover-border:hover {
  border-color: color-mix(in srgb, var(--color-accent) 30%, transparent);
}

.group:hover .comp-icon-hover {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

:root[data-theme="mitrekadark"] .group:hover .comp-icon-hover {
  background: color-mix(in srgb, var(--color-accent) 15%, transparent);
}

.rocket-icon-bg {
  background: linear-gradient(135deg, var(--color-primary) 0%, color-mix(in srgb, var(--color-primary) 70%, black) 100%);
}

:root[data-theme="mitrekadark"] .rocket-icon-bg {
  background: linear-gradient(135deg, var(--color-accent) 0%, color-mix(in srgb, var(--color-accent) 70%, black) 100%);
}

.step-number-bg {
  background: color-mix(in srgb, var(--color-primary) 10%, transparent);
}

:root[data-theme="mitrekadark"] .step-number-bg {
  background: color-mix(in srgb, var(--color-accent) 15%, transparent);
}
</style>
