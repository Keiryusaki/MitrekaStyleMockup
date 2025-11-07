<script setup lang="ts">
defineProps({
  show: { type: Boolean, default: false },
  message: { type: String, default: "Memuat…" },
  size: { type: [Number, String], default: 200 },
  respectReducedMotion: { type: Boolean, default: true },
});
</script>

<template>
  <teleport to="body">
    <div
      v-if="show"
      class="fixed inset-0 z-[9999] grid place-items-center bg-black/60"
      role="status"
      aria-live="polite"
      :class="{ 'force-motion': !respectReducedMotion }"
    >
      <div class="flex flex-col items-center gap-4">
        <svg
          class="logo"
          :style="{ width: size + 'px', height: 'auto' }"
          viewBox="0 0 158.25 105.5"
          aria-hidden="true"
        >
          <!-- Biru -->
          <polygon
            fill="#025097"
            class="shimmer"
            pathLength="100"
            points="46.55 58.99 72.93 85.37 52.75 105.5 0 105.5 0 0 52.75 0 72.93 20.18 46.55 46.55 40.31 52.75 46.55 58.99"
          />
          <!-- Merah -->
          <polygon
            fill="#ee3032"
            class="shimmer delay-a"
            pathLength="100"
            points="158.25 0 158.25 105.5 105.5 105.5 85.37 85.37 111.7 58.99 117.94 52.75 111.7 46.55 85.32 20.18 105.5 0 158.25 0"
          />
          <!-- Diamond hitam (rotasi 0↔90°) -->
          <rect
            fill="#010101"
            class="shimmer wobble90"
            pathLength="100"
            x="60.47"
            y="34.1"
            width="37.3"
            height="37.3"
            transform="translate(-14.12 71.4) rotate(-45)"
          />
        </svg>

        <p class="text-white text-sm/none font-medium">{{ message }}</p>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.logo {
  filter: drop-shadow(0 12px 24px rgba(0, 0, 0, 0.45));
}

/* ===== Shimmer lebih jelas ===== */
.shimmer {
  /* border putih yang kontras */
  stroke: rgba(255, 255, 255, 0.95);
  stroke-width: 2.5;
  stroke-linecap: round;
  /* pakai pathLength=100 → nilai di bawah pakai “persen” perimeter */
  stroke-dasharray: 14 26; /* segmen terang 14%, jeda 26% */
  stroke-dashoffset: 0;
  /* bikin makin pop di atas backdrop gelap */
  mix-blend-mode: screen;
  filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.45));

  vector-effect: non-scaling-stroke;
  paint-order: stroke fill;

  animation: shimmer 1.6s linear infinite; /* lebih cepat biar terlihat */
}
.delay-a {
  animation-duration: 1.8s;
  animation-delay: 0.08s;
}

/* ===== Kotak hitam rotate 90° ping-pong ===== */
.wobble90 {
  transform-box: fill-box;
  transform-origin: 50% 50%;
  /* shimmer + rotasi 0↔90 derajat */
  animation: shimmer 1.6s linear infinite,
    spin90 1.2s ease-in-out infinite alternate;
}

/* ===== Keyframes ===== */
@keyframes shimmer {
  /* karena pathLength=100 → geser 100 = satu keliling */
  to {
    stroke-dashoffset: -100;
  }
}
@keyframes spin90 {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(90deg);
  }
}

/* Hormati reduced motion (bisa dipaksa nyala via prop) */
@media (prefers-reduced-motion: reduce) {
  .shimmer,
  .wobble90 {
    animation: none;
  }
}
.force-motion .shimmer,
.force-motion .wobble90 {
  animation: shimmer 1.6s linear infinite !important;
}
.force-motion .wobble90 {
  animation: shimmer 1.6s linear infinite !important,
    spin90 1.2s ease-in-out infinite alternate !important;
}
</style>
