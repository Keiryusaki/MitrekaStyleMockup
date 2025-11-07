<script setup lang="ts">
defineProps({
  size: { type: [Number, String], default: 56 },
  showText: { type: Boolean, default: true },
  text: { type: String, default: "Memuat…" },
});
</script>

<template>
  <div class="flex items-center gap-3 rounded-lg bg-white px-4 py-3 shadow-lg">
    <!-- SVG LOGO kamu (asli, tanpa modif) -->
    <svg
      id="Layer_2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 158.25 105.5"
      class="logo"
      :style="{ width: size + 'px', height: 'auto' }"
      aria-hidden="true"
    >
      <defs>
        <style>
          .cls-1 {
            fill: #010101;
          }
          .cls-1,
          .cls-2,
          .cls-3 {
            stroke-width: 0px;
          }
          .cls-2 {
            fill: #ee3032;
          }
          .cls-3 {
            fill: #025097;
          }
        </style>
      </defs>
      <g id="Layer_1-2" data-name="Layer 1">
        <g>
          <polygon
            class="cls-3"
            points="46.55 58.99 72.93 85.37 52.75 105.5 0 105.5 0 0 52.75 0 72.93 20.18 46.55 46.55 40.31 52.75 46.55 58.99"
          />
          <polygon
            class="cls-2"
            points="158.25 0 158.25 105.5 105.5 105.5 85.37 85.37 111.7 58.99 117.94 52.75 111.7 46.55 85.32 20.18 105.5 0 158.25 0"
          />
          <rect
            class="cls-1"
            x="60.47"
            y="34.1"
            width="37.3"
            height="37.3"
            transform="translate(-14.12 71.4) rotate(-45)"
          />
        </g>
      </g>
    </svg>

    <span v-if="showText" class="text-sm font-medium text-gray-700">{{
      text
    }}</span>
  </div>
</template>

<style scoped>
/* base look */
.logo {
  display: block;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.12));
}
.logo :is(.cls-1, .cls-2, .cls-3) {
  vector-effect: non-scaling-stroke;
  paint-order: stroke fill;
  stroke: currentColor; /* pakai warna teks container utk shimmer */
  stroke-opacity: 0.35;
  stroke-width: 1.25;
  stroke-dasharray: 60 180;
  animation: shimmer 2.2s ease-in-out infinite;
}

/* beda tempo biar hidup */
.logo .cls-2 {
  animation-duration: 2s;
  animation-delay: 0.05s;
  filter: drop-shadow(0 0 6px rgba(238, 48, 50, 0.35));
}
.logo .cls-3 {
  animation-duration: 2.4s;
  animation-delay: 0.1s;
  filter: drop-shadow(0 0 6px rgba(2, 80, 151, 0.35));
}

/* diamond ping-pong halus */
.logo .cls-1 {
  transform-box: fill-box; /* penting agar origin di kotaknya sendiri */
  transform-origin: 50% 50%;
  animation: shimmer 2.2s ease-in-out infinite,
    wobble 1.6s ease-in-out infinite alternate;
}

/* keyframes */
@keyframes shimmer {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -240;
  }
}
@keyframes wobble {
  0% {
    transform: rotate(-6deg) scale(1);
  }
  100% {
    transform: rotate(6deg) scale(1.02);
  }
}

/* hormati prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .logo :is(.cls-1, .cls-2, .cls-3) {
    animation: none;
    filter: none;
  }
}
</style>
