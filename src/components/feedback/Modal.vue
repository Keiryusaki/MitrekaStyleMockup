<script setup lang="ts">
import { watch } from "vue";

interface Props {
  open: boolean;
  title?: string;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  hideFooter?: boolean;
  hideHeader?: boolean;
  confirmText?: string;
  cancelText?: string;
  persistent?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "Modal",
  size: "md",
  hideFooter: false,
  hideHeader: false,
  confirmText: "Simpan",
  cancelText: "Batal",
  persistent: false,
});

const emit = defineEmits<{
  close: [];
  confirm: [];
}>();

const sizeClasses: Record<string, string> = {
  sm: "max-w-md",          // 448px
  md: "max-w-3xl",         // 768px
  lg: "max-w-[70rem]",     // 1120px
  xl: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]", // almost full
  full: "w-screen h-screen max-w-none rounded-none", // true fullscreen
};

const handleBackdropClick = () => {
  if (!props.persistent) {
    emit("close");
  }
};

watch(
  () => props.open,
  (isOpen) => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }
);
</script>

<template>
  <Teleport to="body">
    <!-- Backdrop -->
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/40"
        @click="handleBackdropClick"
      ></div>
    </Transition>

    <!-- Modal Content -->
    <Transition name="zoom">
      <div
        v-if="open"
        :class="[
          'fixed inset-0 z-[var(--z-modal)] flex items-center justify-center pointer-events-none',
          size === 'full' ? 'p-0' : 'p-4'
        ]"
      >
        <div
          :class="[
            'relative w-full bg-base-100 shadow-2xl pointer-events-auto flex flex-col',
            size === 'full' ? '' : 'rounded-2xl',
            sizeClasses[size]
          ]"
        >
            <!-- Header -->
            <div v-if="!hideHeader" class="flex items-center justify-between p-5 border-b border-base-300">
              <slot name="header">
                <h3 class="text-xl font-semibold">
                  {{ title }}
                </h3>
              </slot>
              <button
                type="button"
                class="p-2 opacity-60 hover:opacity-100 rounded-lg hover:bg-base-200 transition-all duration-200"
                @click="emit('close')"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <!-- Body -->
            <div :class="[
              'p-5 overflow-y-auto',
              size === 'full' ? 'flex-1' : 'max-h-[60vh]'
            ]">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="!hideFooter" :class="[
              'flex justify-end gap-3 p-5 border-t border-base-300 bg-base-200/50',
              size === 'full' ? '' : 'rounded-b-2xl'
            ]">
              <slot name="footer">
                <button
                  type="button"
                  class="btn btn-ghost"
                  @click="emit('close')"
                >
                  {{ cancelText }}
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  @click="emit('confirm')"
                >
                  {{ confirmText }}
                </button>
              </slot>
            </div>
          </div>
        </div>
      </Transition>
  </Teleport>
</template>

<style>
/* Backdrop fade */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal zoom-in / zoom-out */
.zoom-enter-active {
  animation: zoom-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.zoom-leave-active {
  animation: zoom-out 0.2s ease-in;
}

@keyframes zoom-in {
  from {
    opacity: 0;
    transform: scale(0.7);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes zoom-out {
  from {
    opacity: 1;
    transform: scale(1);
  }
  to {
    opacity: 0;
    transform: scale(0.7);
  }
}
</style>
