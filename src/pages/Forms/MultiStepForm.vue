<script setup lang="ts">
import { ref, computed } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

const currentStep = ref(1);
const totalSteps = 3;

const steps = [
  { number: 1, title: "Informasi Pribadi", description: "Data diri dasar" },
  { number: 2, title: "Akun", description: "Email dan password" },
  { number: 3, title: "Konfirmasi", description: "Review data" },
];

const formData = ref({
  firstName: "",
  lastName: "",
  phone: "",
  address: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: null as string | number | null,
  agreeTerms: false,
});

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const canGoNext = computed(() => {
  if (currentStep.value === 1) {
    return formData.value.firstName && formData.value.lastName;
  }
  if (currentStep.value === 2) {
    return (
      formData.value.email &&
      formData.value.password &&
      formData.value.password === formData.value.confirmPassword
    );
  }
  return formData.value.agreeTerms;
});

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const goToStep = (step: number) => {
  if (step <= currentStep.value || step === currentStep.value + 1) {
    currentStep.value = step;
  }
};

const submitForm = () => {
  alert("Form submitted! Check console for data.");
  console.log("Form Data:", formData.value);
};

const resetForm = () => {
  currentStep.value = 1;
  formData.value = {
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: null,
    agreeTerms: false,
  };
};

const copiedId = ref<string | null>(null);
const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const stepIndicatorCode = `<div class="flex items-center justify-center gap-2">
  <template v-for="(step, index) in steps" :key="step.number">
    <!-- Step Circle -->
    <button
      @click="goToStep(step.number)"
      :class="[
        'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
        currentStep === step.number
          ? 'bg-primary text-primary-content'
          : currentStep > step.number
          ? 'bg-success text-success-content'
          : 'bg-base-300 text-base-content/50'
      ]"
    >
      <span v-if="currentStep > step.number">✓</span>
      <span v-else>{{ step.number }}</span>
    </button>
    
    <!-- Connector Line -->
    <div
      v-if="index < steps.length - 1"
      :class="[
        'h-1 w-16 rounded transition-all',
        currentStep > step.number ? 'bg-success' : 'bg-base-300'
      ]"
    />
  </template>
</div>`;
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Patterns"
      title="Multi-Step Form"
      description="Wizard form dengan step indicator, validasi per step, dan navigasi antar step."
    />

    <!-- Live Demo -->
    <section class="card p-6 space-y-6">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Live Demo</h2>

      <!-- Step Indicator -->
      <div class="flex flex-col items-center gap-4">
        <div class="flex items-center justify-center gap-2">
          <template v-for="(step, index) in steps" :key="step.number">
            <!-- Step Circle -->
            <button
              @click="goToStep(step.number)"
              :disabled="step.number > currentStep + 1"
              :class="[
                'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all',
                currentStep === step.number
                  ? 'bg-primary text-primary-content ring-4 ring-primary/20'
                  : currentStep > step.number
                  ? 'bg-success text-success-content cursor-pointer hover:ring-2 hover:ring-success/30'
                  : 'bg-base-300 text-base-content/50 cursor-not-allowed'
              ]"
            >
              <svg v-if="currentStep > step.number" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              <span v-else>{{ step.number }}</span>
            </button>
            
            <!-- Connector Line -->
            <div
              v-if="index < steps.length - 1"
              :class="[
                'h-1 w-12 md:w-20 rounded transition-all',
                currentStep > step.number ? 'bg-success' : 'bg-base-300'
              ]"
            />
          </template>
        </div>

        <!-- Step Title -->
        <div class="text-center">
          <div class="font-semibold">{{ steps[currentStep - 1].title }}</div>
          <div class="text-sm opacity-60">{{ steps[currentStep - 1].description }}</div>
        </div>
      </div>

      <!-- Form Content -->
      <div class="bg-base-200 rounded-box p-6">
        <form @submit.prevent class="max-w-lg mx-auto">
          <!-- Step 1: Personal Info -->
          <div v-if="currentStep === 1" class="space-y-4">
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">
                  Nama Depan <span class="text-error">*</span>
                </label>
                <input v-model="formData.firstName" type="text" class="input w-full" placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">
                  Nama Belakang <span class="text-error">*</span>
                </label>
                <input v-model="formData.lastName" type="text" class="input w-full" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">No. Telepon</label>
              <input v-model="formData.phone" type="tel" class="input w-full" placeholder="08123456789" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Alamat</label>
              <textarea v-model="formData.address" class="input w-full" rows="3" placeholder="Alamat lengkap"></textarea>
            </div>
          </div>

          <!-- Step 2: Account -->
          <div v-if="currentStep === 2" class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">
                Email <span class="text-error">*</span>
              </label>
              <input v-model="formData.email" type="email" class="input w-full" placeholder="email@example.com" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">
                Password <span class="text-error">*</span>
              </label>
              <input v-model="formData.password" type="password" class="input w-full" placeholder="Minimal 8 karakter" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">
                Konfirmasi Password <span class="text-error">*</span>
              </label>
              <input v-model="formData.confirmPassword" type="password" class="input w-full" placeholder="Ulangi password" />
              <p v-if="formData.confirmPassword && formData.password !== formData.confirmPassword" class="text-error text-xs mt-1">
                Password tidak cocok
              </p>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Role</label>
              <SelectDropdown v-model="formData.role" :options="roleOptions" placeholder="Pilih role" />
            </div>
          </div>

          <!-- Step 3: Confirmation -->
          <div v-if="currentStep === 3" class="space-y-4">
            <div class="card bg-base-100 p-4 space-y-3">
              <h3 class="font-semibold text-sm opacity-60 uppercase">Informasi Pribadi</h3>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="opacity-60">Nama</div>
                <div class="font-medium">{{ formData.firstName }} {{ formData.lastName }}</div>
                <div class="opacity-60">Telepon</div>
                <div class="font-medium">{{ formData.phone || '-' }}</div>
                <div class="opacity-60">Alamat</div>
                <div class="font-medium">{{ formData.address || '-' }}</div>
              </div>
            </div>

            <div class="card bg-base-100 p-4 space-y-3">
              <h3 class="font-semibold text-sm opacity-60 uppercase">Informasi Akun</h3>
              <div class="grid grid-cols-2 gap-2 text-sm">
                <div class="opacity-60">Email</div>
                <div class="font-medium">{{ formData.email }}</div>
                <div class="opacity-60">Password</div>
                <div class="font-medium">••••••••</div>
                <div class="opacity-60">Role</div>
                <div class="font-medium">{{ roleOptions.find(r => r.value === formData.role)?.label || '-' }}</div>
              </div>
            </div>

            <label class="flex items-start gap-3 cursor-pointer p-3 rounded-lg bg-base-100">
              <input v-model="formData.agreeTerms" type="checkbox" class="checkbox checkbox-primary mt-0.5" />
              <div class="text-sm">
                <span>Saya menyetujui </span>
                <a href="#" class="text-primary hover:underline">Syarat dan Ketentuan</a>
                <span> serta </span>
                <a href="#" class="text-primary hover:underline">Kebijakan Privasi</a>
              </div>
            </label>
          </div>

          <!-- Navigation Buttons -->
          <div class="flex items-center justify-between mt-6 pt-4 border-t border-base-300">
            <button
              v-if="currentStep > 1"
              type="button"
              class="btn btn-secondary"
              @click="prevStep"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m15 18-6-6 6-6"/>
              </svg>
              Kembali
            </button>
            <div v-else></div>

            <button
              v-if="currentStep < totalSteps"
              type="button"
              class="btn btn-primary"
              :disabled="!canGoNext"
              @click="nextStep"
            >
              Lanjut
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="m9 18 6-6-6-6"/>
              </svg>
            </button>
            <button
              v-else
              type="button"
              class="btn btn-primary"
              :disabled="!canGoNext"
              @click="submitForm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 6 9 17l-5-5"/>
              </svg>
              Submit
            </button>
          </div>
        </form>
      </div>

      <!-- Reset Button -->
      <div class="flex justify-center">
        <button class="btn btn-secondary btn-sm" @click="resetForm">
          Reset Demo
        </button>
      </div>
    </section>

    <!-- Step Indicator Code -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Step Indicator Code</h2>
      <p class="text-sm opacity-70">Komponen step indicator yang bisa di-klik untuk navigasi antar step.</p>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ stepIndicatorCode }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(stepIndicatorCode, 'step')">
          {{ copiedId === 'step' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Best Practices -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Best Practices</h2>
      
      <div class="grid md:grid-cols-2 gap-4">
        <div class="card bg-success/10 border border-success/20 p-4 space-y-2">
          <h3 class="font-semibold text-success flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
            Do
          </h3>
          <ul class="text-sm space-y-1 list-disc list-inside opacity-80">
            <li>Batasi 3-5 step maksimal</li>
            <li>Validasi setiap step sebelum lanjut</li>
            <li>Izinkan user kembali ke step sebelumnya</li>
            <li>Tampilkan progress yang jelas</li>
            <li>Sediakan review di step terakhir</li>
          </ul>
        </div>
        <div class="card bg-error/10 border border-error/20 p-4 space-y-2">
          <h3 class="font-semibold text-error flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            Don't
          </h3>
          <ul class="text-sm space-y-1 list-disc list-inside opacity-80">
            <li>Terlalu banyak step (> 5)</li>
            <li>Field terlalu banyak per step</li>
            <li>Hilangkan data saat back</li>
            <li>Skip validasi step</li>
            <li>Step tanpa judul/deskripsi</li>
          </ul>
        </div>
      </div>
    </section>
  </div>
</template>
