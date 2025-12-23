<template>
  <teleport to="body">
    <div
      class="fixed z-50 flex flex-col gap-2 w-[min(92vw,360px)]"
      :class="positionClasses"
    >
      <div
        v-for="t in ui.toasts"
        :key="t.id"
        class="toast-item p-3 rounded-lg shadow-lg border-l-4"
        :class="getStyles(t.type, t.variant)"
      >
        <div class="flex items-start gap-2">
          <Icon :name="getIconName(t.type)" :size="20" class="mt-0.5 flex-shrink-0" />
          <div class="flex-1">
            <div v-if="t.title" class="toast-title font-semibold mb-0.5">{{ t.title }}</div>
            <div class="text-sm opacity-90">{{ t.message }}</div>
          </div>
          <button class="close-btn" @click="ui.dismiss(t.id)">
            <Icon name="x" :size="16" />
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useUi } from "@/stores/ui";
import type { ToastVariant } from "@/stores/ui";
import { Icon } from "@/components/icons";

const ui = useUi();

const positionClasses = computed(() => {
  const positions: Record<string, string> = {
    "top-left": "top-4 left-4",
    "top-center": "top-4 left-1/2 -translate-x-1/2",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
    "bottom-right": "bottom-4 right-4",
  };
  return positions[ui.toastPosition] || positions["bottom-right"];
});

const getIconName = (type: string) => {
  const iconMap: Record<string, string> = {
    info: "info",
    success: "circle-check-big",
    warning: "triangle-alert",
    error: "circle-x",
    primary: "star",
  };
  return iconMap[type] || "info";
};

const softStyles: Record<string, string> = {
  info: "toast-soft-info",
  success: "toast-soft-success",
  warning: "toast-soft-warning",
  error: "toast-soft-error",
  primary: "toast-soft-primary",
};

const solidStyles: Record<string, string> = {
  info: "toast-solid-info",
  success: "toast-solid-success",
  warning: "toast-solid-warning",
  error: "toast-solid-error",
  primary: "toast-solid-primary",
};

const outlineStyles: Record<string, string> = {
  info: "toast-outline-info",
  success: "toast-outline-success",
  warning: "toast-outline-warning",
  error: "toast-outline-error",
  primary: "toast-outline-primary",
};

const getStyles = (type: string, variant: ToastVariant = "soft") => {
  const styles = {
    soft: softStyles,
    solid: solidStyles,
    outline: outlineStyles,
  };
  return styles[variant]?.[type] || softStyles[type] || "toast-default";
};
</script>

<style scoped>
.toast-item {
  transition: all 0.2s ease;
}

.close-btn {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  opacity: 0.7;
  cursor: pointer;
  background: transparent;
  border: none;
  font-size: 0.875rem;
}
.close-btn:hover {
  opacity: 1;
  background: rgba(0, 0, 0, 0.1);
}

/* Soft variants */
.toast-soft-info {
  background: color-mix(in srgb, var(--color-info) 15%, var(--color-base-100));
  border-color: var(--color-info);
}
.toast-soft-info .icon,
.toast-soft-info .toast-title { color: var(--color-info); }

.toast-soft-success {
  background: color-mix(in srgb, var(--color-success) 15%, var(--color-base-100));
  border-color: var(--color-success);
}
.toast-soft-success .icon,
.toast-soft-success .toast-title { color: var(--color-success); }

.toast-soft-warning {
  background: color-mix(in srgb, var(--color-warning) 15%, var(--color-base-100));
  border-color: var(--color-warning);
}
.toast-soft-warning .icon,
.toast-soft-warning .toast-title { color: var(--color-warning); }

.toast-soft-error {
  background: color-mix(in srgb, var(--color-error) 15%, var(--color-base-100));
  border-color: var(--color-error);
}
.toast-soft-error .icon,
.toast-soft-error .toast-title { color: var(--color-error); }

.toast-soft-primary {
  background: color-mix(in srgb, var(--color-primary) 15%, var(--color-base-100));
  border-color: var(--color-primary);
}
.toast-soft-primary .icon,
.toast-soft-primary .toast-title { color: var(--color-primary); }

/* Solid variants */
.toast-solid-info {
  background: var(--color-info);
  border-color: var(--color-info);
  color: white;
}
.toast-solid-success {
  background: var(--color-success);
  border-color: var(--color-success);
  color: white;
}
.toast-solid-warning {
  background: var(--color-warning);
  border-color: var(--color-warning);
  color: white;
}
.toast-solid-error {
  background: var(--color-error);
  border-color: var(--color-error);
  color: white;
}
.toast-solid-primary {
  background: var(--color-primary);
  border-color: var(--color-primary);
  color: white;
}
.toast-solid-info .close-btn:hover,
.toast-solid-success .close-btn:hover,
.toast-solid-warning .close-btn:hover,
.toast-solid-error .close-btn:hover,
.toast-solid-primary .close-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Outline variants */
.toast-outline-info {
  background: var(--color-base-100);
  border-color: var(--color-info);
  border-width: 2px;
}
.toast-outline-info .icon,
.toast-outline-info .toast-title { color: var(--color-info); }

.toast-outline-success {
  background: var(--color-base-100);
  border-color: var(--color-success);
  border-width: 2px;
}
.toast-outline-success .icon,
.toast-outline-success .toast-title { color: var(--color-success); }

.toast-outline-warning {
  background: var(--color-base-100);
  border-color: var(--color-warning);
  border-width: 2px;
}
.toast-outline-warning .icon,
.toast-outline-warning .toast-title { color: var(--color-warning); }

.toast-outline-error {
  background: var(--color-base-100);
  border-color: var(--color-error);
  border-width: 2px;
}
.toast-outline-error .icon,
.toast-outline-error .toast-title { color: var(--color-error); }

.toast-outline-primary {
  background: var(--color-base-100);
  border-color: var(--color-primary);
  border-width: 2px;
}
.toast-outline-primary .icon,
.toast-outline-primary .toast-title { color: var(--color-primary); }

/* Default */
.toast-default {
  background: var(--color-base-100);
  border-color: var(--color-base-300);
}
</style>
