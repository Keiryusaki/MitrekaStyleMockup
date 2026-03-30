<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Icon } from "@/composables/Icon";
import { useSelectSingle, type SelectOption } from "@/composables/useSelect";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

const props = defineProps<{
  modelValue: string | number | null;
  options?: SelectOption[];
  fetchOptions?: (q: string) => Promise<SelectOption[]>;
  debounceMs?: number;
  placeholder?: string;
  clearable?: boolean;
  disabled?: boolean;
  size?: Size;
  color?: Color;
}>();
const emit = defineEmits(["update:modelValue", "change"]);

const model = ref<typeof props.modelValue>(props.modelValue ?? null);
watch(
  () => props.modelValue,
  (v) => (model.value = v ?? null)
);
watch(model, (v) => emit("update:modelValue", v));

const {
  root,
  inputEl,
  menu,
  floating,
  open,
  query,
  hoverIdx,
  loading,
  filtered,
  selected,
  openMenu,
  closeMenu,
  choose,
  clear,
  onKey,
} = useSelectSingle(model, {
  options: props.options,
  fetchOptions: props.fetchOptions,
  debounceMs: props.debounceMs,
});

const triggerRef = ref<HTMLDivElement | null>(null);
const dropdownRef = ref<HTMLDivElement | null>(null);
const menuTop = ref(0);
const menuLeft = ref(0);
const menuWidth = ref(0);
const menuMaxHeight = ref(240);
const menuNaturalCap = ref<number | null>(null);
const menuOpenUpward = ref(false);
const MAX_MENU_HEIGHT = 320;
const EDGE_PADDING = 12;

const sizeClass = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const;
const colorClass = (c: Color | undefined) =>
  !c || c === "default" ? "input" : `input input-${c}`;
const displayValue = computed(() =>
  open.value ? query.value : selected.value?.label ?? ""
);

const menuContainerStyle = computed(() => ({
  top: `${menuTop.value}px`,
  left: `${menuLeft.value}px`,
  width: `${menuWidth.value}px`,
}));

const menuListStyle = computed(() => ({
  maxHeight: `${menuMaxHeight.value}px`,
}));

const updateMenuPosition = () => {
  if (!open.value || !triggerRef.value) return;
  const trigger = triggerRef.value.getBoundingClientRect();
  const viewportW = window.innerWidth;
  const viewportH = window.innerHeight;
  const gap = 6;
  const edgePadding = EDGE_PADDING;

  const measuredNaturalHeight =
    (dropdownRef.value?.scrollHeight ?? 0) || (menu.value?.scrollHeight ?? 0) || 240;
  if (menuNaturalCap.value == null) {
    menuNaturalCap.value = measuredNaturalHeight;
  }
  const naturalHeight = menuNaturalCap.value;
  const spaceBelow = viewportH - trigger.bottom - gap - edgePadding;
  const spaceAbove = trigger.top - gap - edgePadding;
  const shouldOpenUpward = spaceBelow < 180 && spaceAbove > spaceBelow;
  menuOpenUpward.value = shouldOpenUpward;

  const allowedHeight = shouldOpenUpward ? spaceAbove : spaceBelow;
  const fittedHeight = Math.min(MAX_MENU_HEIGHT, naturalHeight, Math.max(0, allowedHeight));
  menuMaxHeight.value = Math.max(64, fittedHeight);

  menuWidth.value = Math.max(220, trigger.width);
  menuLeft.value = Math.min(
    Math.max(trigger.left, edgePadding),
    viewportW - menuWidth.value - edgePadding
  );

  if (shouldOpenUpward) {
    menuTop.value = Math.max(edgePadding, trigger.top - gap - menuMaxHeight.value);
  } else {
    menuTop.value = Math.min(
      viewportH - edgePadding - menuMaxHeight.value,
      trigger.bottom + gap
    );
  }
};

const onViewportChange = (evt?: Event) => {
  if (!open.value) return;
  const target = evt?.target as Node | null;
  if (target && dropdownRef.value?.contains(target)) return;
  updateMenuPosition();
};

function setDropdownRef(el: unknown) {
  const htmlEl = el instanceof HTMLElement ? (el as HTMLDivElement) : null;
  dropdownRef.value = htmlEl;
  floating.value = htmlEl;
}

function openDropdown() {
  if (props.disabled) return;
  openMenu();
  nextTick(updateMenuPosition);
}

function toggleMenu() {
  if (props.disabled) return;
  if (open.value) {
    closeMenu();
    return;
  }
  openMenu();
  nextTick(updateMenuPosition);
}

function swallowClick() {
  // prevent click bubbling side-effects after mousedown toggle
}

watch(
  () => [open.value, loading.value, filtered.value.length],
  async ([isOpen]) => {
    if (!isOpen) return;
    await nextTick();
    updateMenuPosition();
  }
);

watch(open, (isOpen) => {
  if (!isOpen) {
    menuNaturalCap.value = null;
    return;
  }
  nextTick(updateMenuPosition);
});

onMounted(() => {
  window.addEventListener("resize", onViewportChange);
  window.addEventListener("scroll", onViewportChange, true);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", onViewportChange);
  window.removeEventListener("scroll", onViewportChange, true);
});
</script>

<template>
  <div ref="root" class="relative">
    <div ref="triggerRef" class="relative">
      <span
        class="absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none"
      >
        <Icon name="search" class="w-4 h-4" />
      </span>

      <input
        ref="inputEl"
        :disabled="disabled"
        :placeholder="placeholder || 'Search...'"
        :value="displayValue"
        @focus="openDropdown"
        @click="openDropdown"
        @keydown="onKey"
        :readonly="!open"
        :class="[
          sizeClass[size || 'md'],
          colorClass(color),
          'w-full',
          'input',
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer',
        ]"
        style="padding-left: 2rem; padding-right: 4rem;"
        @input="
          open ? (query = ($event.target as HTMLInputElement).value) : null
        "
      />

      <button
        v-if="clearable && selected && !disabled"
        type="button"
        class="absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100"
        @mousedown.prevent.stop="clear"
        @click.stop="swallowClick"
      >
        <Icon name="x" class="w-4 h-4" />
      </button>

      <button
        type="button"
        class="absolute inset-y-0 right-0 pr-2 flex items-center opacity-70"
        @mousedown.prevent.stop="toggleMenu"
        @click.stop="swallowClick"
        :disabled="disabled"
      >
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" class="w-4 h-4" />
      </button>
    </div>

    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-150 ease-out"
        :enter-from-class="menuOpenUpward ? 'opacity-0 translate-y-1 scale-[0.98]' : 'opacity-0 -translate-y-1 scale-[0.98]'"
        enter-to-class="opacity-100 translate-y-0 scale-100"
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100 translate-y-0 scale-100"
        :leave-to-class="menuOpenUpward ? 'opacity-0 translate-y-1 scale-[0.98]' : 'opacity-0 -translate-y-1 scale-[0.98]'"
      >
        <div
          v-if="open"
          :ref="setDropdownRef"
          class="fixed z-[var(--z-modal)] card p-1"
          :style="menuContainerStyle"
          @mousedown.stop
          @click.stop
        >
          <div v-if="loading" class="px-3 py-2 text-sm opacity-70">Loading...</div>
          <ul v-else ref="menu" class="overflow-auto" :style="menuListStyle" role="listbox">
            <li
              v-for="(o, i) in filtered"
              :key="o.value"
              :data-idx="i"
              :class="[
                'px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer',
                i === hoverIdx ? 'bg-base-200' : '',
                o.disabled ? 'opacity-50 cursor-not-allowed' : '',
              ]"
              @mouseenter="hoverIdx = i"
              @mousedown.prevent="o.disabled ? null : choose(o)"
              role="option"
              :aria-selected="selected?.value === o.value"
            >
              <span>{{ o.label }}</span>
              <Icon
                v-if="selected?.value === o.value"
                name="check"
                class="w-4 h-4 opacity-80"
              />
            </li>
            <li
              v-if="!filtered.length && !loading"
              class="px-3 py-2 text-sm opacity-70"
            >
              No results
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>
