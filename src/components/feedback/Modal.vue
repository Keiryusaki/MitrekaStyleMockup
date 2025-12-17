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
  sm: "max-w-sm",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-2rem)]",
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
        class="fixed inset-0 z-40 bg-black/40"
        @click="handleBackdropClick"
      ></div>
    </Transition>

    <!-- Modal Content -->
    <Transition name="zoom">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
      >
        <div
          :class="['relative w-full bg-white rounded-2xl shadow-2xl pointer-events-auto', sizeClasses[size]]"
        >
            <!-- Header -->
            <div v-if="!hideHeader" class="flex items-center justify-between p-5 border-b border-gray-100">
              <slot name="header">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ title }}
                </h3>
              </slot>
              <button
                type="button"
                class="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-all duration-200"
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
            <div class="p-5 max-h-[60vh] overflow-y-auto">
              <slot />
            </div>

            <!-- Footer -->
            <div v-if="!hideFooter" class="flex justify-end gap-3 p-5 border-t border-gray-100 bg-gray-50/50 rounded-b-2xl">
              <slot name="footer">
                <button
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 transition-all duration-200"
                  @click="emit('close')"
                >
                  {{ cancelText }}
                </button>
                <button
                  type="button"
                  class="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
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
