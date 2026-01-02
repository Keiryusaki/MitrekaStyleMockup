<script setup lang="ts">
import { ref } from "vue";
import { Icon } from "@/composables/Icon";

const email = ref("");
const isLoading = ref(false);
const isSent = ref(false);

const handleSubmit = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    isSent.value = true;
  }, 1500);
};

const resendEmail = () => {
  isLoading.value = true;
  setTimeout(() => {
    isLoading.value = false;
    alert("Email terkirim ulang!");
  }, 1000);
};
</script>

<template>
  <div class="min-h-screen flex items-center justify-center p-6 bg-base-200">
    <div class="w-full max-w-md">
      <div class="card bg-base-100 p-8 space-y-6">
        <!-- Back Link -->
        <router-link to="/auth/signin" class="inline-flex items-center gap-1 text-sm opacity-60 hover:opacity-100">
          <Icon name="chevron-left" class="w-4 h-4" />
          Kembali ke login
        </router-link>

        <!-- Success State -->
        <template v-if="isSent">
          <div class="text-center space-y-4">
            <div class="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M22 10.5V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h12.5"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                <path d="m16 19 2 2 4-4"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold">Cek Email Anda</h1>
            <p class="text-sm opacity-60">
              Kami telah mengirim link reset password ke<br />
              <span class="font-medium text-base-content">{{ email }}</span>
            </p>
            <div class="pt-4 space-y-3">
              <button 
                class="btn btn-primary w-full"
                @click="resendEmail"
                :disabled="isLoading"
              >
                <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                <span v-else>Kirim Ulang Email</span>
              </button>
              <p class="text-xs opacity-50">
                Tidak menerima email? Cek folder spam atau
                <button class="text-primary hover:underline" @click="isSent = false">
                  coba email lain
                </button>
              </p>
            </div>
          </div>
        </template>

        <!-- Form State -->
        <template v-else>
          <div class="text-center space-y-2">
            <div class="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <h1 class="text-xl font-bold">Lupa Password?</h1>
            <p class="text-sm opacity-60">
              Masukkan email Anda dan kami akan mengirimkan link untuk reset password.
            </p>
          </div>

          <form @submit.prevent="handleSubmit" class="space-y-5">
            <div>
              <label class="block text-sm font-medium mb-1.5">Email</label>
              <input
                v-model="email"
                type="email"
                class="input w-full"
                placeholder="nama@email.com"
                required
              />
            </div>

            <button
              type="submit"
              class="btn btn-primary w-full"
              :disabled="isLoading"
            >
              <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
              <span v-else>Kirim Link Reset</span>
            </button>
          </form>
        </template>
      </div>
    </div>
  </div>
</template>
