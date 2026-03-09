<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { Icon } from "@/composables/Icon";
import { useSelectMulti, type SelectOption } from "@/composables/useSelect";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type DisplayMode = "stacked" | "inline-compact";

const props = withDefaults(
  defineProps<{
    modelValue: Array<string | number>;
    options?: SelectOption[];
    fetchOptions?: (q: string) => Promise<SelectOption[]>;
    debounceMs?: number;
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    displayMode?: DisplayMode;
  }>(),
  {
    displayMode: "stacked",
  }
);
const emit = defineEmits(["update:modelValue", "change"]);

const model = ref<Array<string | number>>(props.modelValue ?? []);
watch(
  () => props.modelValue,
  (v) => (model.value = v ?? [])
);
watch(model, (v) => emit("update:modelValue", v));

const {
  root,
  inputEl,
  menu,
  open,
  query,
  loading,
  filtered,
  selectedList,
  openMenu,
  toggle,
  clearAll,
  onKey,
} = useSelectMulti(model, {
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

const shellMinHeightClass = {
  xs: "min-h-[var(--size-field-xs)]",
  sm: "min-h-[var(--size-field-sm)]",
  md: "min-h-[var(--size-field-md)]",
  lg: "min-h-[var(--size-field-lg)]",
  xl: "min-h-[var(--size-field-xl)]",
} as const;
const searchInputSizeByControl = {
  xs: "xxs",
  sm: "xs",
  md: "sm",
  lg: "md",
  xl: "lg",
} as const;
const inlineSearchInputStyleBySize = {
  xxs: { height: "calc(var(--size-field-xs) - 12px)", paddingInline: "0.25rem", fontSize: "11px" },
  xs: { height: "calc(var(--size-field-xs) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-xs)" },
  sm: { height: "calc(var(--size-field-sm) - 8px)", paddingInline: "0.375rem", fontSize: "var(--font-size-sm)" },
  md: { height: "calc(var(--size-field-md) - 8px)", paddingInline: "0.5rem", fontSize: "var(--font-size-md)" },
  lg: { height: "calc(var(--size-field-lg) - 8px)", paddingInline: "0.625rem", fontSize: "var(--font-size-lg)" },
} as const;
const stackedSearchInputStyleBySize = {
  xxs: { height: "1.75rem", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
  xs: { height: "var(--size-field-xs)", paddingInline: "0.5rem", fontSize: "var(--font-size-xs)" },
  sm: { height: "var(--size-field-sm)", paddingInline: "0.625rem", fontSize: "var(--font-size-sm)" },
  md: { height: "var(--size-field-md)", paddingInline: "0.75rem", fontSize: "var(--font-size-md)" },
  lg: { height: "var(--size-field-lg)", paddingInline: "0.875rem", fontSize: "var(--font-size-lg)" },
} as const;
const chipSizeClass = {
  xs: "badge-xs text-xs",
  sm: "badge-sm text-sm",
  md: "text-sm",
  lg: "badge-lg text-lg",
  xl: "badge-xl text-xl",
} as const;
const chipCloseBtnClass = {
  xs: "-mr-2 h-4 w-4",
  sm: "-mr-2.5 h-5 w-5",
  md: "-mr-3 h-6 w-6",
  lg: "-mr-3 h-7 w-7",
  xl: "-mr-3 h-8 w-8",
} as const;
const iconBtnSizeClass = {
  xs: "icon-btn-xs",
  sm: "icon-btn-sm",
  md: "icon-btn-sm",
  lg: "icon-btn-lg",
  xl: "icon-btn-xl",
} as const;
const placeholderTextClass = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
} as const;
const dropdownItemClass = {
  xs: "text-xs py-1 px-1.5",
  sm: "text-sm py-1.5 px-2",
  md: "text-base py-1.5 px-2",
  lg: "text-lg py-2 px-2.5",
  xl: "text-xl py-2.5 px-3",
} as const;
const dropdownCheckboxClass = {
  xs: "checkbox checkbox-xs checkbox-primary",
  sm: "checkbox checkbox-sm checkbox-primary",
  md: "checkbox checkbox-sm checkbox-primary",
  lg: "checkbox checkbox-md checkbox-primary",
  xl: "checkbox checkbox-lg checkbox-primary",
} as const;

const displayModeClass = computed(() => props.displayMode ?? "stacked");
const isInlineCompact = computed(() => displayModeClass.value === "inline-compact");
const effectiveSearchSize = computed(
  () => searchInputSizeByControl[props.size || "md"]
);
const inlineSearchStyle = computed(
  () => inlineSearchInputStyleBySize[effectiveSearchSize.value]
);
const stackedSearchStyle = computed(
  () => stackedSearchInputStyleBySize[effectiveSearchSize.value]
);

const menuContainerStyle = computed(() => ({
  top: `${menuTop.value}px`,
  left: `${menuLeft.value}px`,
  width: `${menuWidth.value}px`,
}));

const menuListStyle = computed(() => ({
  maxHeight: `${menuMaxHeight.value}px`,
}));

const collator = new Intl.Collator(undefined, { sensitivity: "base", numeric: true });
const isSelectedValue = (value: string | number) =>
  model.value.some((v) => String(v) === String(value));

const sortedFiltered = computed(() => {
  return [...filtered.value].sort((a, b) => {
    const aSelected = isSelectedValue(a.value as string | number);
    const bSelected = isSelectedValue(b.value as string | number);
    if (aSelected !== bSelected) return aSelected ? -1 : 1;
    return collator.compare(a.label, b.label);
  });
});

const chipViewport = ref<HTMLElement | null>(null);
const measureCounterEl = ref<HTMLElement | null>(null);
const measureChipEls = ref<HTMLElement[]>([]);
const visibleChipCount = ref(0);
let chipResizeObserver: ResizeObserver | null = null;

const hiddenChipCount = computed(() =>
  Math.max(0, selectedList.value.length - visibleChipCount.value)
);

function setMeasureChipRef(el: unknown, idx: number) {
  if (!el) return;
  measureChipEls.value[idx] = el as HTMLElement;
}

function recalcInlineVisibleChips() {
  if (!isInlineCompact.value) {
    visibleChipCount.value = selectedList.value.length;
    return;
  }

  const viewportWidth = chipViewport.value?.clientWidth ?? 0;
  const total = selectedList.value.length;
  if (!viewportWidth || total === 0) {
    visibleChipCount.value = total;
    return;
  }

  const counterWidth = measureCounterEl.value?.offsetWidth ?? 28;
  const gapPx = 6;

  let used = 0;
  let visible = 0;

  for (let i = 0; i < total; i += 1) {
    const chipWidth = measureChipEls.value[i]?.offsetWidth ?? 0;
    const chipUsed = used + (i > 0 ? gapPx : 0) + chipWidth;
    const hiddenAfter = total - (i + 1);
    const reserveForCounter = hiddenAfter > 0 ? gapPx + counterWidth : 0;

    if (chipUsed + reserveForCounter <= viewportWidth) {
      used = chipUsed;
      visible = i + 1;
    } else {
      break;
    }
  }

  if (visible === 0 && total > 0) {
    visible = 1;
  }

  visibleChipCount.value = visible;
}

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

  menuWidth.value = Math.max(260, trigger.width);
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

async function scheduleInlineRecalc() {
  await nextTick();
  recalcInlineVisibleChips();
}

watch(
  () => [selectedList.value.length, props.size, props.displayMode, query.value],
  () => {
    scheduleInlineRecalc();
  },
  { immediate: true }
);

watch(sortedFiltered, () => {
  scheduleInlineRecalc();
});

watch(
  () => [open.value, loading.value, sortedFiltered.value.length],
  async ([isOpen]) => {
    if (!isOpen) {
      menuNaturalCap.value = null;
      return;
    }
    await nextTick();
    updateMenuPosition();
  }
);

watch(chipViewport, (el) => {
  chipResizeObserver?.disconnect();
  chipResizeObserver = null;
  if (!el) return;

  chipResizeObserver = new ResizeObserver(() => {
    recalcInlineVisibleChips();
  });
  chipResizeObserver.observe(el);
});

onMounted(() => {
  window.addEventListener("resize", onViewportChange);
  window.addEventListener("scroll", onViewportChange, true);
});

onBeforeUnmount(() => {
  chipResizeObserver?.disconnect();
  window.removeEventListener("resize", onViewportChange);
  window.removeEventListener("scroll", onViewportChange, true);
});
</script>

<template>
  <div ref="root" class="relative">
    <!-- shell -->
    <div
      ref="triggerRef"
      :class="[
        displayModeClass === 'inline-compact'
          ? 'relative flex items-center gap-2 rounded-field border border-base-300 bg-base-100 px-2'
          : 'relative flex flex-wrap items-start gap-2 rounded-field border border-base-300 bg-base-100 px-2 py-1.5',
        shellMinHeightClass[size || 'md'],
        disabled ? 'opacity-60 pointer-events-none' : '',
      ]"
      @click="openMenu"
    >
      <template v-if="displayModeClass === 'inline-compact'">
        <span :class="['opacity-60 min-w-0 shrink-0 max-w-[12ch] truncate', placeholderTextClass[size || 'md']]">{{
          placeholder || "Select options..."
        }}</span>

        <div v-if="selectedList.length" ref="chipViewport" class="flex min-w-0 flex-1 items-center gap-1.5 overflow-hidden whitespace-nowrap">
          <span
            v-for="o in selectedList.slice(0, visibleChipCount)"
            :key="o.value"
            :class="['badge badge-soft-primary gap-1 max-w-[12rem]', chipSizeClass[size || 'md']]"
          >
            <span class="truncate">{{ o.label }}</span>
            <button
              type="button"
              :class="[
                'grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent',
                chipCloseBtnClass[size || 'md'],
              ]"
              @click.stop="toggle(o.value as any)"
            >
              <Icon name="x" class="w-3 h-3" />
            </button>
          </span>
          <span
            v-if="hiddenChipCount > 0"
            class="badge badge-soft-primary" style="padding-inline: 1px"
          >
            +{{ hiddenChipCount }}
          </span>
        </div>

        <span v-else class="flex-1 min-w-0"></span>

        <span
          :class="[
            selectedList.length ? 'w-[9ch] sm:w-[11ch] shrink-0' : 'flex-1 min-w-[8ch]',
          ]"
        >
          <input
            ref="inputEl"
            v-model="query"
            :class="[
              'input multi-select-inline-search py-0 border-base-300 focus:!shadow-none focus:!outline-none',
            ]"
            :style="inlineSearchStyle"
            placeholder="Search..."
            @keydown="onKey"
            @focus="open = true; nextTick(updateMenuPosition)"
          />
        </span>

        <button
          type="button"
          :class="['icon-btn icon-btn-outline shrink-0', iconBtnSizeClass[size || 'md']]"
          @click.stop="open = !open; nextTick(updateMenuPosition)"
        >
          <Icon :name="open ? 'chevron-up' : 'chevron-down'" class="w-4 h-4" />
        </button>
        <button
          v-if="selectedList.length"
          type="button"
          :class="['icon-btn icon-btn-outline shrink-0', iconBtnSizeClass[size || 'md']]"
          @click.stop="clearAll()"
        >
          <Icon name="x" class="w-4 h-4" />
        </button>
      </template>

      <template v-else>
        <!-- chips -->
        <div v-if="selectedList.length" class="flex w-full flex-wrap items-center gap-1.5">
          <span
            v-for="o in selectedList"
            :key="o.value"
            :class="['badge badge-soft-primary gap-1 max-w-full', chipSizeClass[size || 'md']]"
          >
            <span class="truncate">{{ o.label }}</span>
            <button
              type="button"
              :class="[
                'grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent',
                chipCloseBtnClass[size || 'md'],
              ]"
              @click.stop="toggle(o.value as any)"
            >
              <Icon name="x" class="w-3 h-3" />
            </button>
          </span>
        </div>
        <span v-else :class="['opacity-60 w-full', placeholderTextClass[size || 'md']]">{{
          placeholder || "Select options..."
        }}</span>

        <!-- search input -->
        <div class="flex items-center gap-2 w-full">
          <span class="flex-1 min-w-[8ch]">
            <input
              ref="inputEl"
              v-model="query"
              :class="[
                'input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none',
              ]"
              :style="stackedSearchStyle"
              placeholder="Search..."
              @keydown="onKey"
              @focus="open = true; nextTick(updateMenuPosition)"
            />
          </span>

          <button
            type="button"
            :class="['icon-btn icon-btn-outline shrink-0', iconBtnSizeClass[size || 'md']]"
            @click.stop="open = !open; nextTick(updateMenuPosition)"
          >
            <Icon :name="open ? 'chevron-up' : 'chevron-down'" class="w-4 h-4" />
          </button>
          <button
            v-if="selectedList.length"
            type="button"
            :class="['icon-btn icon-btn-outline shrink-0', iconBtnSizeClass[size || 'md']]"
            @click.stop="clearAll()"
          >
            <Icon name="x" class="w-4 h-4" />
          </button>
        </div>
      </template>

      <!-- hidden measurement helpers for inline compact overflow count -->
      <div
        v-if="isInlineCompact"
        class="pointer-events-none absolute -left-[9999px] top-0 invisible flex items-center gap-1.5"
      >
        <span
          v-for="(o, idx) in selectedList"
          :key="`measure-${o.value}`"
          :ref="(el) => setMeasureChipRef(el, idx)"
          :class="['badge badge-soft-primary gap-1 max-w-[12rem]', chipSizeClass[size || 'md']]"
        >
          <span class="truncate">{{ o.label }}</span>
          <span
            :class="[
              'grid place-items-center rounded-full bg-transparent p-0 text-current hover:bg-transparent',
              chipCloseBtnClass[size || 'md'],
            ]"
          >
            <Icon name="x" class="w-3 h-3" />
          </span>
        </span>
        <span ref="measureCounterEl" class="badge badge-soft-primary" style="padding-inline: 1px">+99</span>
      </div>
    </div>

    <!-- dropdown -->
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
          ref="dropdownRef"
          class="fixed z-[var(--z-modal)] card p-2"
          :style="menuContainerStyle"
        >
          <div v-if="loading" class="px-3 py-2 text-sm opacity-70">Loading...</div>
          <ul v-else ref="menu" class="overflow-auto" :style="menuListStyle">
            <li
              v-for="o in sortedFiltered"
              :key="o.value"
              :class="[
                'rounded-field flex items-center gap-2 cursor-pointer transition-colors duration-100 hover:bg-primary/10',
                dropdownItemClass[size || 'md'],
                isSelectedValue(o.value as string | number) ? 'bg-primary/15' : '',
              ]"
              @mousedown.prevent="toggle(o.value as any)"
            >
              <input
                type="checkbox"
                :class="[dropdownCheckboxClass[size || 'md'], 'pointer-events-none']"
                :checked="isSelectedValue(o.value as string | number)"
              />
              <span>{{ o.label }}</span>
            </li>
            <li
              v-if="!sortedFiltered.length && !loading"
              class="px-2 py-2 text-sm opacity-70"
            >
              No results
            </li>
          </ul>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.multi-select-inline-search:focus {
  box-shadow: none !important;
}
</style>
