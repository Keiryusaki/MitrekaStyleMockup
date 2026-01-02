<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@/composables/Icon";

const form = ref({
  password: "",
  confirmPassword: "",
});

const showPassword = ref(false);
const showConfirmPassword = ref(false);
const isLoading = ref(false);
const isSuccess = ref(false);

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

const handleSubmit = () => {
  if (!passwordMatch.value) return;
  
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isSuccess.value = true;
  }, 1500);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-base-200">
    <div class="w-full max-w-md">
      <div class="card bg-base-100 p-8 space-y-6">
        <!-- Success State -->
        <template v-if="isSuccess">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold">Password Berhasil Diubah!</h1>
            <p class="text-sm opacity-60">
              Password Anda telah berhasil direset. Silakan login dengan password baru.
            </p>
            <div class="pt-4">
              <router-link to="/auth/signin" class="btn btn-primary w-full">
                Kembali ke Login
              </router-link>
            </div>
          </div>
        </template>

        <!-- Form State -->
        <template v-else>
          <!-- Header -->
          <div class="text-center space-y-2">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold">Buat Password Baru</h1>
            <p class="text-sm opacity-60">
              Password baru harus berbeda dari password sebelumnya.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <!-- New Password -->
            <div>
              <label class="block text-sm font-medium mb-1.5">Password Baru</label>
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
                  <Icon name="eye" class="w-5 h-5" />
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

            <!-- Confirm Password -->
            <div>
              <label class="block text-sm font-medium mb-1.5">Konfirmasi Password</label>
              <div class="relative">
                <input
                  v-model="form.confirmPassword"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  class="input w-full pr-10"
                  :class="{ 'input-error': form.confirmPassword && !passwordMatch }"
                  placeholder="Ulangi password baru"
                  required
                />
                <button
                  type="button"
                  class="absolute right-3 top-1/2 -translate-y-1/2 opacity-50 hover:opacity-100"
                  @click="showConfirmPassword = !showConfirmPassword"
                >
                  <Icon name="eye" class="w-5 h-5" />
                </button>
              </div>
              <p v-if="form.confirmPassword && !passwordMatch" class="text-error text-xs mt-1">
                Password tidak cocok
              </p>
            </div>

            <!-- Requirements -->
            <div class="text-xs space-y-1 opacity-60">
              <p class="font-medium">Password harus memiliki:</p>
              <ul class="list-disc list-inside space-y-0.5">
                <li :class="{ 'text-success': form.password.length >= 8 }">Minimal 8 karakter</li>
                <li :class="{ 'text-success': /[A-Z]/.test(form.password) && /[a-z]/.test(form.password) }">Huruf besar dan kecil</li>
                <li :class="{ 'text-success': /\d/.test(form.password) }">Minimal 1 angka</li>
                <li :class="{ 'text-success': /[^a-zA-Z0-9]/.test(form.password) }">Minimal 1 karakter spesial</li>
              </ul>
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isLoading || !passwordMatch || form.password.length < 8"
            >
              <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
              <span v-else>Reset Password</span>
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>
