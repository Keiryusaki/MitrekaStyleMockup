<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(defineProps<{
  size?: number;
  text?: string;
}>(), {
  size: 80,
  text: '',
});

// Dot size proportional to logo (8px at 60px logo = 13.33% ratio)
const dotSize = computed(() => Math.round(props.size * (8 / 60)));
</script>

<template>
  <div class="loading-logo-wrapper">
    <!-- Logo area -->
    <div 
      class="loading-logo-container"
      :style="{ width: `${size}px`, height: `${size * 0.67}px` }"
    >
      <!-- 6 Dots: 2 blue, 2 black, 2 red -->
      <div class="dots-container">
        <span class="loading-dot dot-1 dot-blue" :style="{ width: `${dotSize}px`, height: `${dotSize}px` }"></span>
        <span class="loading-dot dot-2 dot-blue" :style="{ width: `${dotSize}px`, height: `${dotSize}px` }"></span>
        <span class="loading-dot dot-3 dot-black" :style="{ width: `${dotSize}px`, height: `${dotSize}px` }"></span>
        <span class="loading-dot dot-4 dot-black" :style="{ width: `${dotSize}px`, height: `${dotSize}px` }"></span>
        <span class="loading-dot dot-5 dot-red" :style="{ width: `${dotSize}px`, height: `${dotSize}px` }"></span>
        <span class="loading-dot dot-6 dot-red" :style="{ width: `${dotSize}px`, height: `${dotSize}px` }"></span>
      </div>

      <!-- Logo shapes -->
      <svg 
        class="logo-svg" 
        viewBox="0 0 40.5 27" 
        :width="size" 
        :height="size * 0.67"
      >
        <polygon 
          class="logo-shape shape-blue" 
          points="11.91 15.1 18.66 21.85 13.5 27 0 27 0 0 13.5 0 18.66 5.16 11.91 11.91 10.32 13.5 11.91 15.1"
        />
        <rect 
          class="logo-shape shape-black" 
          x="15.48" y="8.73" 
          width="9.55" height="9.55" 
          transform="translate(-3.61 18.27) rotate(-45)"
        />
        <polygon 
          class="logo-shape shape-red" 
          points="40.5 0 40.5 27 27 27 21.85 21.85 28.59 15.1 30.18 13.5 28.59 11.91 21.84 5.16 27 0 40.5 0"
        />
      </svg>
    </div>

    <!-- Text with animated dots -->
    <p v-if="text" class="loading-text">
      {{ text }}<span class="loading-dots"><span>.</span><span>.</span><span>.</span></span>
    </p>
  </div>
</template>

<style scoped>
.loading-logo-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.loading-logo-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dots-container {
  position: absolute;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0 4%;
}

.loading-dot {
  border-radius: 50%;
  animation: dot-dance 2.4s ease-in-out infinite;
}

.dot-1 { animation-delay: 0s; }
.dot-2 { animation-delay: 0.1s; }
.dot-3 { animation-delay: 0.2s; }
.dot-4 { animation-delay: 0.3s; }
.dot-5 { animation-delay: 0.4s; }
.dot-6 { animation-delay: 0.5s; }

.dot-blue { background-color: #015095; }
.dot-black { background-color: #231f20; }
.dot-red { background-color: #ed3536; }

.logo-svg {
  position: absolute;
}

.logo-shape {
  animation: shape-reveal 2.4s ease-in-out infinite;
}

.shape-blue { 
  fill: #015095; 
  transform-origin: center;
  transform-box: fill-box;
  animation-delay: 0s;
}
.shape-black { 
  fill: #231f20; 
  animation-delay: 0.1s;
  animation-name: shape-reveal-diamond;
}
.shape-red { 
  fill: #ed3536; 
  transform-origin: center;
  transform-box: fill-box;
  animation-delay: 0.2s;
}

@keyframes dot-dance {
  0% {
    opacity: 0;
    transform: scale(0.5) translateY(0);
  }
  10% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  20% {
    transform: scale(0.8) translateY(-8px);
  }
  30% {
    transform: scale(1) translateY(4px);
  }
  40% {
    transform: scale(0.9) translateY(-4px);
  }
  50% {
    opacity: 1;
    transform: scale(0.6) translateY(0);
  }
  55% {
    opacity: 0;
    transform: scale(0) translateY(0);
  }
  100% {
    opacity: 0;
    transform: scale(0) translateY(0);
  }
}

@keyframes shape-reveal {
  0%, 50% {
    opacity: 0;
    transform: scale(0.5);
  }
  60% {
    opacity: 1;
    transform: scale(1.1);
  }
  70% {
    transform: scale(1);
  }
  85% {
    opacity: 1;
    transform: scale(1.05);
  }
  95% {
    opacity: 0;
    transform: scale(0.9);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

@keyframes shape-reveal-diamond {
  0%, 50% {
    opacity: 0;
  }
  60% {
    opacity: 1;
  }
  85% {
    opacity: 1;
  }
  95%, 100% {
    opacity: 0;
  }
}

/* Loading text styles */
.loading-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-base-content, #333);
}

.loading-dots span {
  animation: dot-blink 1.4s infinite;
  opacity: 0;
}

.loading-dots span:nth-child(1) {
  animation-delay: 0s;
}

.loading-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.loading-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes dot-blink {
  0%, 20% {
    opacity: 0;
  }
  40% {
    opacity: 1;
  }
  60%, 100% {
    opacity: 0;
  }
}
</style>
