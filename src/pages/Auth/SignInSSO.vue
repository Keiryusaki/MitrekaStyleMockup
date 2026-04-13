<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@/composables/Icon";
import AuthPortalRightPanel from "@/components/auth/AuthPortalRightPanel.vue";

const form = ref({
  email: "",
  password: "",
  remember: false,
});

const showPassword = ref(false);
const isLoading = ref(false);
const usageGuideOpen = ref(false);

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

const openUsageGuide = () => {
  usageGuideOpen.value = true;
};

const closeUsageGuide = () => {
  usageGuideOpen.value = false;
};
</script>

<template>
  <div class="min-h-screen w-full flex">
    <div class="w-full lg:w-[42%] lg:max-w-[680px] lg:flex-none flex items-center justify-center p-6 md:p-12">
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

    <AuthPortalRightPanel />

    <button
      type="button"
      class="floating-guide-btn"
      @click="openUsageGuide"
    >
      <Icon name="book" class="h-4 w-4" />
      Dokumentasi
    </button>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="usageGuideOpen" class="guide-overlay" role="dialog" aria-modal="true" @click.self="closeUsageGuide">
        <div class="guide-modal">
          <div class="flex items-start justify-between gap-3">
            <div>
              <div class="text-xs font-semibold tracking-wide text-primary">Panduan Implementasi</div>
              <h3 class="mt-1 text-lg font-semibold">Shared Right Panel Login</h3>
            </div>
            <button type="button" class="btn btn-ghost btn-sm" @click="closeUsageGuide" aria-label="Close">
              <Icon name="x" class="h-4 w-4" />
            </button>
          </div>

          <div class="mt-4 space-y-3 text-sm text-base-content/80">
            <p class="font-semibold text-base-content">Install package</p>
            <pre class="guide-code"><code>npm i @keiryusaki/mitreka-ui
npm i @keiryusaki/auth-shell

import { Icon } from \"@keiryusaki/mitreka-ui/vue\";
import { AuthPortalRightPanel } from \"@keiryusaki/auth-shell\";
import \"@keiryusaki/auth-shell/style.css\";</code></pre>
            <p>Untuk test pre-release, bisa pakai:</p>
            <pre class="guide-code"><code>npm i @keiryusaki/auth-shell@beta</code></pre>
            <pre class="guide-code"><code>&lt;template&gt;
  &lt;div class=\"min-h-screen w-full flex\"&gt;
    &lt;!-- panel kiri: form login produk masing-masing --&gt;
    &lt;section class=\"w-full lg:w-[42%] lg:max-w-[680px] lg:flex-none\"&gt;
      ...
    &lt;/section&gt;

    &lt;!-- panel kanan: shared component (configurable) --&gt;
    &lt;AuthPortalRightPanel
      :hero-title=\"'Core Flow ERP'\"
      :hero-subtitle=\"'A Collaborative Flow of Efficient Corporate ERP'\"
      :background-image=\"'https://picsum.photos/1400/1100?random=33'\"
      :apps=\"portalApps\"
    /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
            <p>Panel kiri (form login) tetap milik masing-masing produk. Jadi update visual sisi kanan cukup sinkron dari komponen ini.</p>
          </div>

          <div class="mt-5 flex justify-end">
            <button type="button" class="btn btn-primary btn-sm" @click="closeUsageGuide">Mengerti</button>
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

:root[data-theme="mitrekadark"] .logo-light {
  display: none;
}

:root[data-theme="mitrekadark"] .logo-dark {
  display: block;
}

.floating-guide-btn {
  position: fixed;
  right: 1rem;
  bottom: 1rem;
  z-index: 55;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  border-radius: 999px;
  padding: 0.6rem 0.9rem;
  border: 1px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
  background: color-mix(in srgb, var(--color-primary) 14%, var(--color-base-100) 86%);
  color: var(--color-base-content);
  font-size: 0.8rem;
  font-weight: 600;
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
}

.floating-guide-btn:hover {
  background: color-mix(in srgb, var(--color-primary) 22%, var(--color-base-100) 78%);
}

.guide-overlay {
  position: fixed;
  inset: 0;
  z-index: 60;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: rgba(17, 24, 39, 0.38);
  backdrop-filter: blur(4px);
}

.guide-modal {
  width: min(680px, 96vw);
  border-radius: 0.85rem;
  border: 1px solid var(--color-base-300);
  background: var(--color-base-100);
  color: var(--color-base-content);
  padding: 1rem;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.24);
}

.guide-code {
  border-radius: 0.6rem;
  border: 1px solid var(--color-base-300);
  background: var(--color-base-200);
  padding: 0.65rem 0.75rem;
  overflow-x: auto;
}
</style>
