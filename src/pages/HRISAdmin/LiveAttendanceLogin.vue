<template>
  <main class="min-h-dvh bg-slate-100 px-3 py-6">
    <div class="mx-auto flex w-full max-w-[430px] items-center justify-center">
      <section class="relative h-[92dvh] min-h-[680px] w-full overflow-hidden rounded-[2.2rem] border border-slate-200 bg-white shadow-2xl">
        <header class="relative overflow-hidden bg-[#004b8d] px-6 pb-9 pt-11 text-white">
          <div class="absolute inset-0 bg-[radial-gradient(100%_80%_at_0%_0%,rgba(255,255,255,0.2),transparent_50%),radial-gradient(80%_70%_at_95%_100%,rgba(255,255,255,0.16),transparent_65%)]"></div>
          <div class="relative z-10">
            <img :src="mitrekaLogo" alt="Mitreka" class="h-9 w-auto object-contain" />
            <h1 class="mt-6 text-[26px] font-black tracking-tight">Masuk</h1>
            <p class="mt-1 text-[13px] font-semibold text-white/80">Akses Live Attendance untuk mulai sesi presensi.</p>
          </div>
        </header>

        <div
          class="relative z-20 -mt-6 rounded-t-[28px] border-t border-slate-100 bg-white px-5 pb-6 pt-5 shadow-[0_-10px_24px_-20px_rgba(2,34,71,0.45)]"
        >
          <form class="space-y-4" @submit.prevent="submitLogin">
            <label class="block">
              <span class="mb-1.5 block text-[11px] font-black uppercase tracking-wide text-slate-500">Email / Employee ID</span>
              <input
                v-model.trim="identifier"
                type="text"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-[#004b8d]"
                placeholder="eka.dian@mitreka.id"
                autocomplete="username"
              />
            </label>

            <label class="block">
              <span class="mb-1.5 block text-[11px] font-black uppercase tracking-wide text-slate-500">Password</span>
              <input
                v-model="password"
                type="password"
                class="w-full rounded-xl border border-slate-300 px-3 py-2.5 text-[14px] font-semibold text-slate-700 outline-none transition focus:border-[#004b8d]"
                placeholder="Masukkan password"
                autocomplete="current-password"
              />
            </label>

            <p v-if="errorMessage" class="rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-[12px] font-semibold text-rose-600">
              {{ errorMessage }}
            </p>

            <div
              ref="sliderTrackRef"
              class="slide-track relative h-14 overflow-hidden rounded-2xl border border-[#005fb3]/20 bg-[#005fb3] px-1.5 py-1.5 text-white"
            >
              <div
                class="pointer-events-none absolute inset-y-1.5 left-1.5 rounded-xl bg-white/20 transition-[width] duration-150 ease-out"
                :style="{ width: `${sliderFillWidth}px` }"
              ></div>
              <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
                <span class="text-[15px] font-black tracking-wide text-white/95">{{ sliderLabel }}</span>
              </div>
              <button
                type="button"
                class="slide-knob absolute left-1.5 top-1.5 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/40 bg-white text-[#005fb3] shadow-md transition-transform"
                :class="[
                  isSubmitting ? 'cursor-wait opacity-80' : 'cursor-grab active:cursor-grabbing',
                  sliderDragging ? 'transition-none' : '',
                ]"
                :style="{ transform: `translate3d(${sliderDragX}px, 0, 0)` }"
                :disabled="isSubmitting"
                aria-label="Slide untuk login"
                @pointerdown="startSliderDrag"
                @pointermove="moveSliderDrag"
                @pointerup="endSliderDrag"
                @pointercancel="endSliderDrag"
              >
                <span class="text-xl leading-none">›</span>
              </button>
            </div>
            <button type="submit" class="sr-only">Masuk</button>
          </form>

          <div class="mt-5 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5">
            <p class="text-[10px] font-black uppercase tracking-wide text-slate-500">Mock Credential</p>
            <p class="mt-1 text-[12px] font-semibold text-slate-700">Email: <span class="font-black">eka.dian@mitreka.id</span></p>
            <p class="text-[12px] font-semibold text-slate-700">Password: <span class="font-black">123456</span></p>
          </div>
        </div>

        <button
          type="button"
          class="absolute bottom-4 right-4 z-30 inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-[#004b8d] shadow-lg transition hover:bg-slate-50"
          aria-label="Restart app"
          title="Restart app"
          @click="restartApp"
        >
          <Icon name="refresh-ccw" class="h-5 w-5" />
        </button>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@/composables/Icon";
import mitrekaLogo from "@/assets/logo.png";
import {
  clearLiveAttendanceAuthenticated,
  isLiveAttendanceAuthenticated,
  setLiveAttendanceAuthenticated,
} from "@/features/hris-admin/live-attendance/authSession";

const router = useRouter();

const identifier = ref("");
const password = ref("");
const isSubmitting = ref(false);
const errorMessage = ref("");
const sliderTrackRef = ref<HTMLElement | null>(null);
const sliderDragX = ref(0);
const sliderPointerId = ref<number | null>(null);
const sliderDragging = ref(false);
const sliderStartX = ref(0);
const sliderMaxDrag = ref(0);
const sliderReadyToSubmit = ref(false);

const MOCK_IDENTIFIER = "eka.dian@mitreka.id";
const MOCK_PASSWORD = "123456";
const SLIDER_KNOB_SIZE = 44;
const SLIDER_THRESHOLD_RATIO = 0.85;

const sliderProgress = computed(() => {
  if (sliderMaxDrag.value <= 0) return 0;
  return sliderDragX.value / sliderMaxDrag.value;
});

const sliderFillWidth = computed(() => sliderDragX.value + SLIDER_KNOB_SIZE);

const sliderLabel = computed(() => {
  if (isSubmitting.value) return "Memproses...";
  if (sliderReadyToSubmit.value) return "Lepas untuk masuk";
  return "Slide untuk masuk";
});

onMounted(() => {
  updateSliderBounds();
  window.addEventListener("resize", updateSliderBounds);
  if (isLiveAttendanceAuthenticated()) {
    router.replace("/mockup-hris-admin/live-attendance");
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSliderBounds);
});

function updateSliderBounds(): void {
  const trackWidth = sliderTrackRef.value?.clientWidth ?? 0;
  sliderMaxDrag.value = Math.max(0, trackWidth - SLIDER_KNOB_SIZE - 12);
  sliderDragX.value = Math.min(sliderDragX.value, sliderMaxDrag.value);
}

function startSliderDrag(event: PointerEvent): void {
  if (isSubmitting.value) return;
  if (event.pointerType === "mouse" && event.button !== 0) return;

  updateSliderBounds();
  sliderDragging.value = true;
  sliderPointerId.value = event.pointerId;
  sliderStartX.value = event.clientX - sliderDragX.value;
  sliderReadyToSubmit.value = sliderProgress.value >= SLIDER_THRESHOLD_RATIO;
  (event.currentTarget as HTMLElement | null)?.setPointerCapture(event.pointerId);
}

function moveSliderDrag(event: PointerEvent): void {
  if (!sliderDragging.value || sliderPointerId.value !== event.pointerId) return;

  const delta = event.clientX - sliderStartX.value;
  sliderDragX.value = Math.min(sliderMaxDrag.value, Math.max(0, delta));
  sliderReadyToSubmit.value = sliderProgress.value >= SLIDER_THRESHOLD_RATIO;
}

function endSliderDrag(event: PointerEvent): void {
  if (!sliderDragging.value || sliderPointerId.value !== event.pointerId) return;

  (event.currentTarget as HTMLElement | null)?.releasePointerCapture(event.pointerId);
  sliderDragging.value = false;
  sliderPointerId.value = null;

  if (sliderProgress.value >= SLIDER_THRESHOLD_RATIO) {
    sliderDragX.value = sliderMaxDrag.value;
    sliderReadyToSubmit.value = true;
    submitLogin();
    return;
  }

  resetSlider();
}

function resetSlider(): void {
  sliderDragX.value = 0;
  sliderReadyToSubmit.value = false;
}

function restartApp(): void {
  if (isSubmitting.value) return;
  clearLiveAttendanceAuthenticated();
  resetSlider();
  errorMessage.value = "";
  router.replace("/mockup-hris-admin/live-attendance/splash");
}

function submitLogin(): void {
  if (isSubmitting.value) return;

  const normalizedIdentifier = identifier.value.trim().toLowerCase();
  errorMessage.value = "";

  if (!normalizedIdentifier || !password.value.trim()) {
    errorMessage.value = "Email/Employee ID dan password wajib diisi.";
    resetSlider();
    return;
  }

  isSubmitting.value = true;
  setTimeout(() => {
    const credentialValid =
      normalizedIdentifier === MOCK_IDENTIFIER &&
      password.value === MOCK_PASSWORD;

    if (!credentialValid) {
      errorMessage.value = "Kredensial tidak valid. Coba gunakan akun mock.";
      isSubmitting.value = false;
      resetSlider();
      return;
    }

    setLiveAttendanceAuthenticated();
    isSubmitting.value = false;
    router.replace("/mockup-hris-admin/live-attendance");
  }, 800);
}
</script>

<style scoped>
.slide-track {
  touch-action: none;
  user-select: none;
}
</style>
