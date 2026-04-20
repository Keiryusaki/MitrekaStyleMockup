<template>
  <main class="min-h-dvh bg-slate-100 px-3 py-6">
    <div class="mx-auto flex w-full max-w-[430px] items-center justify-center">
      <section class="relative h-[92dvh] min-h-[680px] w-full overflow-hidden rounded-[2.2rem] border border-slate-200 bg-[#004b8d] shadow-2xl">
        <div class="absolute inset-0 bg-[radial-gradient(120%_90%_at_20%_10%,rgba(255,255,255,0.22),transparent_52%),radial-gradient(90%_80%_at_80%_88%,rgba(255,255,255,0.18),transparent_60%)]"></div>
        <div class="relative z-10 flex h-full flex-col items-center justify-center px-8 text-center text-white">
          <img :src="mitrekaLogo" alt="Mitreka" class="splash-logo h-28 w-auto object-contain" />
          <h1 class="mt-7 text-[24px] font-black tracking-tight">Live Attendance</h1>
          <p class="mt-2 text-[13px] font-semibold text-white/80">Verifikasi presensi mobile dengan cepat dan rapi.</p>
          <div class="mt-8 h-1.5 w-32 overflow-hidden rounded-full bg-white/25">
            <span class="splash-progress block h-full rounded-full bg-white/80"></span>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useRouter } from "vue-router";
import mitrekaLogo from "@/assets/full-vertical-layout-for-dark-background.svg";
import { isLiveAttendanceAuthenticated } from "@/features/hris-admin/live-attendance/authSession";

const router = useRouter();
let redirectTimer: ReturnType<typeof setTimeout> | null = null;

onMounted(() => {
  redirectTimer = setTimeout(() => {
    const target = isLiveAttendanceAuthenticated()
      ? "/mockup-hris-admin/live-attendance"
      : "/mockup-hris-admin/live-attendance/login";
    router.replace(target);
  }, 2000);
});

onBeforeUnmount(() => {
  if (redirectTimer) clearTimeout(redirectTimer);
});
</script>

<style scoped>
.splash-logo {
  animation: splash-pop 0.55s ease forwards;
  filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.55));
}

.splash-progress {
  width: 0%;
  animation: splash-load 1.8s ease forwards;
}

@keyframes splash-pop {
  from {
    transform: translateY(12px) scale(0.94);
    opacity: 0.25;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}

@keyframes splash-load {
  from {
    width: 0%;
  }
  to {
    width: 100%;
  }
}
</style>
