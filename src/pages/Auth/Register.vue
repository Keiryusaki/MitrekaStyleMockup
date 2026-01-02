<script setup lang="ts">
import { ref, computed } from "vue";

const form = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  agreeTerms: false,
});

const showPassword = ref(false);
const isLoading = ref(false);

const passwordMatch = computed(() => {
  return form.value.password === form.value.confirmPassword;
});

const passwordStrength = computed(() => {
  const pwd = form.value.password;
  if (!pwd) return { level: 0, label: "", color: "" };
  
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) score++;
  if (/\d/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;
  
  if (score <= 2) return { level: score, label: "Lemah", color: "bg-error" };
  if (score <= 3) return { level: score, label: "Sedang", color: "bg-warning" };
  return { level: score, label: "Kuat", color: "bg-success" };
});

const canSubmit = computed(() => {
  return (
    form.value.name &&
    form.value.email &&
    form.value.password.length >= 8 &&
    passwordMatch.value &&
    form.value.agreeTerms
  );
});

const handleSubmit = () => {
  if (!canSubmit.value) return;
  
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert("Registrasi berhasil! (Demo)");
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left: Decorative (hidden on mobile) -->
    <div class="hidden lg:flex flex-1 relative overflow-hidden">
      <img 
        src="https://picsum.photos/1200/900?random=2" 
        alt="Background" 
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-br from-accent/90 to-primary/90 backdrop-blur-sm"></div>
      
      <div class="relative z-10 flex items-center justify-center p-12 w-full">
        <div class="max-w-md text-white">
          <img 
            src="@/assets/full-vertical-layout-for-dark-background.svg" 
            alt="Mitreka Logo" 
            class="h-20 mb-6"
          />
          <p class="opacity-90 mb-8 text-lg">
            Bergabung dengan ribuan developer yang sudah menggunakan Mitreka Design System.
          </p>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              <span class="text-sm opacity-90">Komponen siap pakai</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              <span class="text-sm opacity-90">Dokumentasi lengkap</span>
            </div>
            <div class="flex items-center gap-3">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              <span class="text-sm opacity-90">Support komunitas aktif</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Form -->
    <div class="flex-1 flex items-center justify-center p-6 md:p-12">
      <div class="w-full max-w-md space-y-6">
        <!-- Logo & Title -->
        <div class="text-center">
          <img 
            src="@/assets/full-vertical-layout-for-light-background.svg" 
            alt="Mitreka Logo" 
            class="h-14 mx-auto mb-4 logo-light"
          />
          <img 
            src="@/assets/full-vertical-layout-for-dark-background.svg" 
            alt="Mitreka Logo" 
            class="h-14 mx-auto mb-4 logo-dark"
          />
          <h1 class="text-2xl font-bold">Buat Akun Baru</h1>
          <p class="text-sm opacity-60 mt-1">Daftar untuk memulai</p>
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1.5">Nama Lengkap</label>
            <input
              v-model="form.name"
              type="text"
              class="input w-full"
              placeholder="Masukkan nama lengkap"
              required
            />
          </div>

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
                placeholder="Minimal 8 karakter"
                required
                minlength="8"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                @click="showPassword = !showPassword"
              >
                <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </button>
            </div>
            
            <!-- Password Strength -->
            <div v-if="form.password" class="mt-2 space-y-1">
              <div class="flex gap-1">
                <div 
                  v-for="i in 5" 
                  :key="i"
                  class="h-1 flex-1 rounded-full transition-colors"
                  :class="i <= passwordStrength.level ? passwordStrength.color : 'bg-base-300'"
                />
              </div>
              <p class="text-xs" :class="passwordStrength.color.replace('bg-', 'text-')">
                Kekuatan: {{ passwordStrength.label }}
              </p>
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1.5">Konfirmasi Password</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              class="input w-full"
              :class="{ 'input-error': form.confirmPassword && !passwordMatch }"
              placeholder="Ulangi password"
              required
            />
            <p v-if="form.confirmPassword && !passwordMatch" class="text-error text-xs mt-1">
              Password tidak cocok
            </p>
          </div>

          <label class="flex items-start gap-2 cursor-pointer">
            <input 
              v-model="form.agreeTerms" 
              type="checkbox" 
              class="checkbox checkbox-primary checkbox-sm mt-0.5" 
            />
            <span class="text-sm opacity-80">
              Saya setuju dengan 
              <a href="#" class="text-primary hover:underline">Syarat & Ketentuan</a>
              dan
              <a href="#" class="text-primary hover:underline">Kebijakan Privasi</a>
            </span>
          </label>

          <button
            type="submit"
            class="btn btn-primary w-full"
            :disabled="isLoading || !canSubmit"
          >
            <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
            <span v-else>Daftar</span>
          </button>
        </form>

        <!-- Divider -->
        <div class="relative">
          <div class="absolute inset-0 flex items-center">
            <div class="w-full border-t border-base-300"></div>
          </div>
          <div class="relative flex justify-center text-xs">
            <span class="px-2 bg-base-100 text-base-content/50">atau daftar dengan</span>
          </div>
        </div>

        <!-- Social Login -->
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
          <button type="button" class="btn btn-outline">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </button>
        </div>

        <!-- Login Link -->
        <p class="text-center text-sm">
          Sudah punya akun?
          <router-link to="/auth/signin" class="text-primary font-medium hover:underline">
            Masuk di sini
          </router-link>
        </p>
      </div>
    </div>
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
</style>
