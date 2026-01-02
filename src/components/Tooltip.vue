<script setup lang="ts">
import { ref, computed } from "vue";

type Position = "top" | "bottom" | "left" | "right";
type Variant = "auto" | "light" | "dark";

const props = withDefaults(
  defineProps<{
    text: string;
    position?: Position;
    variant?: Variant;
    delay?: number;
  }>(),
  {
    position: "top",
    variant: "auto",
    delay: 200,
  }
);

const isVisible = ref(false);
let timeout: ReturnType<typeof setTimeout> | null = null;

const showTooltip = () => {
  timeout = setTimeout(() => {
    isVisible.value = true;
  }, props.delay);
};

const hideTooltip = () => {
  if (timeout) {
    clearTimeout(timeout);
    timeout = null;
  }
  isVisible.value = false;
};

const positionClasses = computed(() => {
  const base = "absolute z-50 px-2 py-1 text-xs font-medium rounded whitespace-nowrap transition-opacity duration-150";
  const positions: Record<Position, string> = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };
  return `${base} ${positions[props.position]}`;
});

const arrowClasses = computed(() => {
  const base = "absolute w-0 h-0";
  const positions: Record<Position, string> = {
    top: "top-full left-1/2 -translate-x-1/2 arrow-top",
    bottom: "bottom-full left-1/2 -translate-x-1/2 arrow-bottom",
    left: "left-full top-1/2 -translate-y-1/2 arrow-left",
    right: "right-full top-1/2 -translate-y-1/2 arrow-right",
  };
  return `${base} ${positions[props.position]}`;
});

const variantClasses = computed(() => {
  if (props.variant === "light") {
    return {
      tooltip: "bg-white text-gray-800 shadow-lg border border-gray-200 tooltip-light",
      arrow: "",
    };
  }
  if (props.variant === "dark") {
    return {
      tooltip: "bg-gray-900 text-white shadow-lg tooltip-dark",
      arrow: "",
    };
  }
  // auto: opposite of current theme for contrast
  return {
    tooltip: "tooltip-auto",
    arrow: "",
  };
});
</script>

<template>
  <div 
    class="relative inline-flex"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
  >
    <slot />
    
    <Transition name="tooltip">
      <div
        v-if="isVisible && text"
        :class="[positionClasses, variantClasses.tooltip]"
        role="tooltip"
      >
        {{ text }}
        <span :class="[arrowClasses, variantClasses.arrow]" />
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Auto variant */
.tooltip-auto {
  background-color: var(--color-neutral);
  color: var(--color-neutral-content);
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
}

.tooltip-auto .arrow-top {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid var(--color-neutral);
}
.tooltip-auto .arrow-bottom {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid var(--color-neutral);
}
.tooltip-auto .arrow-left {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid var(--color-neutral);
}
.tooltip-auto .arrow-right {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid var(--color-neutral);
}

:root[data-theme="mitrekadark"] .tooltip-auto {
  background-color: var(--color-base-100);
  color: var(--color-base-content);
  border: 1px solid var(--color-base-300);
}
:root[data-theme="mitrekadark"] .tooltip-auto .arrow-top {
  border-top-color: var(--color-base-100);
}
:root[data-theme="mitrekadark"] .tooltip-auto .arrow-bottom {
  border-bottom-color: var(--color-base-100);
}
:root[data-theme="mitrekadark"] .tooltip-auto .arrow-left {
  border-left-color: var(--color-base-100);
}
:root[data-theme="mitrekadark"] .tooltip-auto .arrow-right {
  border-right-color: var(--color-base-100);
}

/* Light variant */
.tooltip-light .arrow-top {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid white;
}
.tooltip-light .arrow-bottom {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid white;
}
.tooltip-light .arrow-left {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid white;
}
.tooltip-light .arrow-right {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid white;
}

/* Dark variant */
.tooltip-dark .arrow-top {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid rgb(17 24 39);
}
.tooltip-dark .arrow-bottom {
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 6px solid rgb(17 24 39);
}
.tooltip-dark .arrow-left {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid rgb(17 24 39);
}
.tooltip-dark .arrow-right {
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-right: 6px solid rgb(17 24 39);
}

/* Transition */
.tooltip-enter-active,
.tooltip-leave-active {
  transition: opacity 0.15s ease;
}

.tooltip-enter-from,
.tooltip-leave-to {
  opacity: 0;
}
</style>
