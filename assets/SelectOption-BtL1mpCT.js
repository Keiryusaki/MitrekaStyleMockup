import{r as x,i as F,w as B,h as N,g as Y,E as G,d as j,c as u,a as e,C as U,j as k,u as t,I as q,q as R,F as H,A as _,o as c,G as K,p as Z,y as D,k as J,v as ee,H as ne,e as I,m as oe,l as P,b as te,z as le}from"./index-CTK3vSMT.js";import{F as se}from"./FloatingTOC-ByoZ4jGa.js";import{_ as ae}from"./PageHeader.vue_vue_type_script_setup_true_lang-DqoOAbKh.js";const re=`import {
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  type Ref,
} from "vue";

export type SelectOption<V extends string | number = string | number> = {
  value: V;
  label: string;
  disabled?: boolean;
};

export type UseSelectCommon<V extends string | number> = {
  /** sumber opsi lokal (opsional bila pakai fetch) */
  options?: Ref<SelectOption<V>[]> | SelectOption<V>[];
  /** sumber opsi remote (opsional) */
  fetchOptions?: (query: string) => Promise<SelectOption<V>[]>;
  debounceMs?: number;
  /** custom filter lokal (default: label includes) */
  filterFn?: (opt: SelectOption<V>, query: string) => boolean;
};

/* ---------- utils ---------- */
function useDebounce() {
  let timer: number | undefined;
  function run(fn: () => void, ms: number) {
    if (timer) window.clearTimeout(timer);
    // @ts-ignore
    timer = window.setTimeout(fn, ms);
  }
  onBeforeUnmount(() => timer && window.clearTimeout(timer));
  return run;
}

export function useClickOutside(root: Ref<HTMLElement | null>, cb: () => void) {
  const onClick = (e: MouseEvent) => {
    const el = root.value;
    if (!el) return;
    if (!el.contains(e.target as Node)) cb();
  };
  onMounted(() => document.addEventListener("click", onClick));
  onBeforeUnmount(() => document.removeEventListener("click", onClick));
}

/* =========================================================
   Single select + search  (ala Select2 “single”)
   ========================================================= */
export function useSelectSingle<V extends string | number>(
  model: Ref<V | null>,
  common: UseSelectCommon<V> = {}
) {
  const { options, fetchOptions, debounceMs = 250, filterFn } = common;

  const root = ref<HTMLElement | null>(null);
  const inputEl = ref<HTMLInputElement | null>(null);
  const menu = ref<HTMLElement | null>(null);

  const open = ref(false);
  const query = ref("");
  const hoverIdx = ref(-1);
  const loading = ref(false);
  const localOptions = ref<SelectOption<V>[]>(
    Array.isArray(options) ? options : options?.value ?? []
  );
  const debounce = useDebounce();

  const selected = computed<SelectOption<V> | null>(
    () =>
      (localOptions.value || []).find((o) => o.value === model.value) ?? null
  );

  const filtered = computed<SelectOption<V>[]>(() => {
    const q = query.value.trim().toLowerCase();
    const src = localOptions.value || [];
    if (!q) return src;
    const fn =
      filterFn ??
      ((o: SelectOption<V>, q: string) => o.label.toLowerCase().includes(q));
    return src.filter((o) => fn(o, q));
  });

  async function loadOptions() {
    if (!fetchOptions) return;
    loading.value = true;
    try {
      const res = await fetchOptions(query.value);
      localOptions.value = Array.isArray(res) ? res : [];
    } finally {
      loading.value = false;
    }
  }

  function openMenu() {
    open.value = true;
    hoverIdx.value = -1;
    nextTick(() => inputEl.value?.focus());
  }
  function closeMenu() {
    open.value = false;
    hoverIdx.value = -1;
    query.value = "";
  }
  function choose(o: SelectOption<V>) {
    if (o.disabled) return;
    model.value = o.value;
    closeMenu();
  }
  function clear() {
    model.value = null;
    query.value = "";
    inputEl.value?.focus();
  }

  function scrollIntoView() {
    nextTick(() => {
      const m = menu.value;
      if (!m) return;
      const el = m.querySelector<HTMLElement>(\`[data-idx="\${hoverIdx.value}"]\`);
      if (!el) return;
      const top = el.offsetTop,
        bottom = top + el.offsetHeight;
      if (top < m.scrollTop) m.scrollTop = top;
      else if (bottom > m.scrollTop + m.clientHeight)
        m.scrollTop = bottom - m.clientHeight;
    });
  }

  function onKey(e: KeyboardEvent) {
    if (!open.value) {
      if (["ArrowDown", "Enter", " "].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      hoverIdx.value = Math.min(hoverIdx.value + 1, filtered.value.length - 1);
      scrollIntoView();
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      hoverIdx.value = Math.max(hoverIdx.value - 1, 0);
      scrollIntoView();
    }
    if (e.key === "Home") {
      e.preventDefault();
      hoverIdx.value = 0;
      scrollIntoView();
    }
    if (e.key === "End") {
      e.preventDefault();
      hoverIdx.value = filtered.value.length - 1;
      scrollIntoView();
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const o = filtered.value[hoverIdx.value];
      if (o) choose(o);
    }
  }

  // reactivity
  if (options && !Array.isArray(options)) {
    watch(options, (v) => (localOptions.value = v ?? []), { immediate: true });
  }
  watch(query, () => fetchOptions && debounce(loadOptions, debounceMs));

  // outside
  useClickOutside(root, closeMenu);

  return {
    // refs
    root,
    inputEl,
    menu,
    open,
    query,
    hoverIdx,
    loading,
    localOptions,
    filtered,
    selected,
    // handlers
    openMenu,
    closeMenu,
    choose,
    clear,
    onKey,
  };
}

/* =========================================================
   Multi select + search (chips)
   ========================================================= */
export function useSelectMulti<V extends string | number>(
  model: Ref<Array<V>>,
  common: UseSelectCommon<V> = {}
) {
  const single = useSelectSingle<V>(ref<V | null>(null), common);
  const { localOptions } = single;

  const selectedList = computed<SelectOption<V>[]>(() =>
    (localOptions.value || []).filter((o) => model.value.includes(o.value))
  );

  function toggle(v: V) {
    const set = new Set(model.value);
    set.has(v) ? set.delete(v) : set.add(v);
    model.value = Array.from(set);
  }
  function clearAll() {
    model.value = [];
  }

  return {
    ...single,
    selectedList,
    toggle,
    clearAll,
  };
}
`,ie=`<script setup lang="ts">
import { ref, computed, watch } from "vue";
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

const sizeClass = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const;
const colorClass = (c: Color | undefined) =>
  !c || c === "default" ? "input" : \`input input-\${c}\`;
const displayValue = computed(() =>
  open.value ? query.value : selected.value?.label ?? ""
);
<\/script>

<template>
  <div ref="root" class="relative">
    <div class="relative">
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
        @focus="openMenu"
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
        @click="clear"
      >
        <Icon name="x" class="w-4 h-4" />
      </button>

      <button
        type="button"
        class="absolute inset-y-0 right-0 pr-2 flex items-center opacity-70"
        @click="open = !open"
        :disabled="disabled"
      >
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" class="w-4 h-4" />
      </button>
    </div>

    <div v-if="open" class="absolute z-20 mt-1 w-full card p-1">
      <div v-if="loading" class="px-3 py-2 text-sm opacity-70">Loading…</div>
      <ul v-else ref="menu" class="max-h-60 overflow-auto" role="listbox">
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
  </div>
</template>
`,ce=`<script setup lang="ts">
import { ref, watch } from "vue";
import { Icon } from "@/composables/Icon";
import { useSelectMulti, type SelectOption } from "@/composables/useSelect";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

const props = defineProps<{
  modelValue: Array<string | number>;
  options?: SelectOption[];
  fetchOptions?: (q: string) => Promise<SelectOption[]>;
  debounceMs?: number;
  placeholder?: string;
  disabled?: boolean;
  size?: Size;
}>();
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
  hoverIdx,
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

const sizeClass = {
  xs: "input-xs",
  sm: "input-sm",
  md: "input-md",
  lg: "input-lg",
  xl: "input-xl",
} as const;
<\/script>

<template>
  <div ref="root" class="relative">
    <!-- shell -->
    <div
      class="relative flex items-center gap-2 flex-wrap min-h-[var(--size-field-md)] rounded-field border border-base-300 bg-base-100 px-2"
      :class="[
        sizeClass[size || 'md'],
        disabled ? 'opacity-60 pointer-events-none' : '',
      ]"
      @click="openMenu"
    >
      <!-- chips -->
      <template v-if="selectedList.length">
        <span
          v-for="o in selectedList"
          :key="o.value"
          class="badge badge-soft-primary gap-1"
        >
          {{ o.label }}
          <button
            type="button"
            class="icon-btn icon-btn-xs icon-btn-outline"
            @click.stop="toggle(o.value as any)"
          >
            <Icon name="x" class="w-3 h-3" />
          </button>
        </span>
      </template>
      <span v-else class="opacity-60 text-sm">{{
        placeholder || "Select options…"
      }}</span>

      <!-- search input -->
      <span class="flex-1 min-w-[8ch]">
        <input
          ref="inputEl"
          v-model="query"
          class="input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none"
          placeholder="Search..."
          @keydown="onKey"
          @focus="open = true"
        />
      </span>

      <button
        type="button"
        class="icon-btn icon-btn-xs icon-btn-outline ml-auto"
        @click.stop="open = !open"
      >
        <Icon :name="open ? 'chevron-up' : 'chevron-down'" class="w-4 h-4" />
      </button>
      <button
        v-if="selectedList.length"
        type="button"
        class="icon-btn icon-btn-xs icon-btn-outline"
        @click.stop="clearAll()"
      >
        <Icon name="x" class="w-4 h-4" />
      </button>
    </div>

    <!-- dropdown -->
    <div v-if="open" class="absolute z-20 mt-1 w-full card p-2">
      <div v-if="loading" class="px-3 py-2 text-sm opacity-70">Loading…</div>
      <ul v-else ref="menu" class="max-h-60 overflow-auto">
        <li
          v-for="(o, i) in filtered"
          :key="o.value"
          :data-idx="i"
          class="px-2 py-1.5 rounded-field text-sm flex items-center gap-2 cursor-pointer hover:bg-base-200"
          @mousedown.prevent="toggle(o.value as any)"
        >
          <input
            type="checkbox"
            class="checkbox checkbox-sm checkbox-primary"
            :checked="model.includes(o.value as any)"
          />
          <span>{{ o.label }}</span>
        </li>
        <li
          v-if="!filtered.length && !loading"
          class="px-2 py-2 text-sm opacity-70"
        >
          No results
        </li>
      </ul>
    </div>
  </div>
</template>
`,de=`<script setup lang="ts">
/**
 * SelectDropdown - Custom select dengan smooth dropdown animation
 * Pengganti native <select> untuk solid & outline style
 */
import { ref, computed, watch, onMounted, onBeforeUnmount } from "vue";
import { Icon } from "@/composables/Icon";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color = "default" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
type Variant = "solid" | "outline";

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

const props = withDefaults(
  defineProps<{
    modelValue: string | number | null;
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    size?: Size;
    color?: Color;
    variant?: Variant;
  }>(),
  {
    placeholder: "Choose...",
    disabled: false,
    size: "md",
    color: "default",
    variant: "solid",
  }
);

const emit = defineEmits<{
  (e: "update:modelValue", value: string | number | null): void;
  (e: "change", value: string | number | null): void;
}>();

const root = ref<HTMLElement | null>(null);
const open = ref(false);
const hoverIdx = ref(-1);

// Find selected option
const selected = computed(() =>
  props.options.find((o) => o.value === props.modelValue) ?? null
);

// Display text
const displayText = computed(() => selected.value?.label ?? props.placeholder);

// Size classes
const sizeClasses: Record<Size, string> = {
  xs: "h-[var(--size-field-xs)] text-xs px-2 rounded-[var(--radius-field-xs)]",
  sm: "h-[var(--size-field-sm)] text-sm px-2.5 rounded-[var(--radius-field-sm)]",
  md: "h-[var(--size-field-md)] text-base px-3 rounded-[var(--radius-field-md)]",
  lg: "h-[var(--size-field-lg)] text-lg px-3.5 rounded-[var(--radius-field-lg)]",
  xl: "h-[var(--size-field-xl)] text-xl px-4 rounded-[var(--radius-field-xl)]",
};

// Color classes for solid variant
const solidColorClasses: Record<Color, string> = {
  default: "bg-base-100 border-base-300 text-base-content hover:bg-base-200",
  primary: "bg-primary border-primary text-primary-content hover:brightness-95",
  secondary: "bg-secondary border-secondary text-secondary-content hover:brightness-95",
  accent: "bg-accent border-accent text-accent-content hover:brightness-95",
  info: "bg-info border-info text-info-content hover:brightness-95",
  success: "bg-success border-success text-success-content hover:brightness-95",
  warning: "bg-warning border-warning text-warning-content hover:brightness-95",
  error: "bg-error border-error text-error-content hover:brightness-95",
};

// Color classes for outline variant
const outlineColorClasses: Record<Color, string> = {
  default: "bg-transparent border-base-300 text-base-content hover:bg-base-200/40",
  primary: "bg-transparent border-primary text-primary hover:bg-primary/10",
  secondary: "bg-transparent border-secondary text-base-content hover:bg-secondary/10",
  accent: "bg-transparent border-accent text-accent hover:bg-accent/10",
  info: "bg-transparent border-info text-info hover:bg-info/10",
  success: "bg-transparent border-success text-success hover:bg-success/10",
  warning: "bg-transparent border-warning text-warning hover:bg-warning/10",
  error: "bg-transparent border-error text-error hover:bg-error/10",
};

// Focus ring colors based on color prop
const focusRingColors: Record<Color, string> = {
  default: "ring-primary/30 border-primary",
  primary: "ring-primary/30 border-primary",
  secondary: "ring-secondary/30 border-secondary",
  accent: "ring-accent/30 border-accent",
  info: "ring-info/30 border-info",
  success: "ring-success/30 border-success",
  warning: "ring-warning/30 border-warning",
  error: "ring-error/30 border-error",
};

// Combined trigger classes
const triggerClass = computed(() => {
  const base = "w-full flex items-center justify-between gap-2 border cursor-pointer transition-all duration-150";
  const sizeClass = sizeClasses[props.size];
  const colorClass = props.variant === "outline" 
    ? outlineColorClasses[props.color] 
    : solidColorClasses[props.color];
  const disabledClass = props.disabled ? "opacity-60 cursor-not-allowed" : "";
  const focusClass = open.value 
    ? \`ring-3 \${focusRingColors[props.color]}\` 
    : "";
  return [base, sizeClass, colorClass, disabledClass, focusClass].join(" ");
});

// Dropdown item size classes
const itemSizeClasses: Record<Size, string> = {
  xs: "text-xs py-1.5 px-2",
  sm: "text-sm py-1.5 px-2.5",
  md: "text-base py-2 px-3",
  lg: "text-lg py-2 px-3.5",
  xl: "text-xl py-2.5 px-4",
};

// Dropdown background (solid soft) based on color
const dropdownBgStyle = computed(() => {
  if (props.color === "default") {
    return { backgroundColor: "var(--color-base-100)" };
  }
  // Use white 85% for solid soft background (not transparent)
  return {
    backgroundColor: \`color-mix(in oklch, var(--color-\${props.color}), white 85%)\`,
  };
});

// Get CSS variable for color
const getColorVar = (color: Color) => {
  if (color === "default") return "var(--color-base-content)";
  return \`var(--color-\${color})\`;
};

// Item style (text color + hover background)
const getItemStyle = (isHovered: boolean) => {
  // Secondary uses secondary-content (dark) because dropdown bg is light
  const textColor = props.color === "default" 
    ? "var(--color-base-content)" 
    : props.color === "secondary"
      ? "var(--color-secondary-content)"
      : \`var(--color-\${props.color})\`;
  
  if (props.color === "default") {
    return {
      color: textColor,
      backgroundColor: isHovered ? "var(--color-base-200)" : "transparent",
    };
  }
  // Hover background sesuai state color - lebih pekat dari dropdown bg (70% white vs 85%)
  return {
    color: textColor,
    backgroundColor: isHovered 
      ? \`color-mix(in oklch, var(--color-\${props.color}), white 70%)\`
      : "transparent",
  };
};

const checkIconStyle = computed(() => {
  if (props.color === "default") return { color: "var(--color-primary)" };
  // Secondary uses secondary-content (dark) because dropdown bg is light
  if (props.color === "secondary") return { color: "var(--color-secondary-content)" };
  return { color: \`var(--color-\${props.color})\` };
});

// Methods
const toggle = () => {
  if (props.disabled) return;
  open.value = !open.value;
  if (open.value) {
    hoverIdx.value = props.options.findIndex((o) => o.value === props.modelValue);
  }
};

const choose = (option: SelectOption) => {
  if (option.disabled) return;
  emit("update:modelValue", option.value);
  emit("change", option.value);
  open.value = false;
};

const onKey = (e: KeyboardEvent) => {
  if (props.disabled) return;
  
  switch (e.key) {
    case "Enter":
    case " ":
      e.preventDefault();
      if (open.value && hoverIdx.value >= 0) {
        const opt = props.options[hoverIdx.value];
        if (opt && !opt.disabled) choose(opt);
      } else {
        toggle();
      }
      break;
    case "Escape":
      open.value = false;
      break;
    case "ArrowDown":
      e.preventDefault();
      if (!open.value) {
        open.value = true;
        hoverIdx.value = 0;
      } else {
        hoverIdx.value = Math.min(hoverIdx.value + 1, props.options.length - 1);
      }
      break;
    case "ArrowUp":
      e.preventDefault();
      if (open.value) {
        hoverIdx.value = Math.max(hoverIdx.value - 1, 0);
      }
      break;
  }
};

// Click outside handler
const onClickOutside = (e: MouseEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", onClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", onClickOutside);
});
<\/script>

<template>
  <div ref="root" class="relative">
    <!-- Trigger button -->
    <button
      type="button"
      :class="triggerClass"
      :disabled="disabled"
      @click="toggle"
      @keydown="onKey"
    >
      <span :class="[!selected ? 'opacity-60' : '']">
        {{ displayText }}
      </span>
      <Icon
        :name="open ? 'chevron-up' : 'chevron-down'"
        class="w-4 h-4 shrink-0 transition-transform duration-200 pointer-events-none"
      />
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1 scale-[0.98]"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 -translate-y-1 scale-[0.98]"
    >
      <div
        v-if="open"
        class="absolute z-50 mt-1 w-full rounded-box border border-base-300 shadow-lg p-1"
        :style="dropdownBgStyle"
      >
        <ul class="max-h-60 overflow-auto" role="listbox">
          <li
            v-for="(opt, i) in options"
            :key="opt.value"
            :class="[
              itemSizeClasses[size],
              'flex items-center justify-between cursor-pointer transition-colors duration-100 rounded-field',
              opt.disabled ? 'opacity-50 cursor-not-allowed' : '',
              selected?.value === opt.value ? 'font-medium' : '',
            ]"
            :style="getItemStyle(i === hoverIdx)"
            @mouseenter="hoverIdx = i"
            @click="opt.disabled ? null : choose(opt)"
            role="option"
            :aria-selected="selected?.value === opt.value"
          >
            <span>{{ opt.label }}</span>
            <Icon
              v-if="selected?.value === opt.value"
              name="check"
              class="w-4 h-4"
              :style="checkIconStyle"
            />
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>
`;function ue(){let s;function S(a,b){s&&window.clearTimeout(s),s=window.setTimeout(a,b)}return N(()=>s&&window.clearTimeout(s)),S}function pe(s,S){const a=b=>{const g=s.value;g&&(g.contains(b.target)||S())};Y(()=>document.addEventListener("click",a)),N(()=>document.removeEventListener("click",a))}function W(s,S={}){const{options:a,fetchOptions:b,debounceMs:g=250,filterFn:$}=S,E=x(null),w=x(null),i=x(null),f=x(!1),m=x(""),v=x(-1),C=x(!1),y=x(Array.isArray(a)?a:(a==null?void 0:a.value)??[]),h=ue(),O=F(()=>(y.value||[]).find(l=>l.value===s.value)??null),V=F(()=>{const l=m.value.trim().toLowerCase(),M=y.value||[];if(!l)return M;const T=$??((A,X)=>A.label.toLowerCase().includes(X));return M.filter(A=>T(A,l))});async function L(){if(b){C.value=!0;try{const l=await b(m.value);y.value=Array.isArray(l)?l:[]}finally{C.value=!1}}}function z(){f.value=!0,v.value=-1,G(()=>{var l;return(l=w.value)==null?void 0:l.focus()})}function p(){f.value=!1,v.value=-1,m.value=""}function r(l){l.disabled||(s.value=l.value,p())}function n(){var l;s.value=null,m.value="",(l=w.value)==null||l.focus()}function o(){G(()=>{const l=i.value;if(!l)return;const M=l.querySelector(`[data-idx="${v.value}"]`);if(!M)return;const T=M.offsetTop,A=T+M.offsetHeight;T<l.scrollTop?l.scrollTop=T:A>l.scrollTop+l.clientHeight&&(l.scrollTop=A-l.clientHeight)})}function d(l){if(!f.value){["ArrowDown","Enter"," "].includes(l.key)&&(l.preventDefault(),z());return}if(l.key==="Escape"){l.preventDefault(),p();return}if(l.key==="ArrowDown"&&(l.preventDefault(),v.value=Math.min(v.value+1,V.value.length-1),o()),l.key==="ArrowUp"&&(l.preventDefault(),v.value=Math.max(v.value-1,0),o()),l.key==="Home"&&(l.preventDefault(),v.value=0,o()),l.key==="End"&&(l.preventDefault(),v.value=V.value.length-1,o()),l.key==="Enter"){l.preventDefault();const M=V.value[v.value];M&&r(M)}}return a&&!Array.isArray(a)&&B(a,l=>y.value=l??[],{immediate:!0}),B(m,()=>b&&h(L,g)),pe(E,p),{root:E,inputEl:w,menu:i,open:f,query:m,hoverIdx:v,loading:C,localOptions:y,filtered:V,selected:O,openMenu:z,closeMenu:p,choose:r,clear:n,onKey:d}}function me(s,S={}){const a=W(x(null),S),{localOptions:b}=a,g=F(()=>(b.value||[]).filter(w=>s.value.includes(w.value)));function $(w){const i=new Set(s.value);i.has(w)?i.delete(w):i.add(w),s.value=Array.from(i)}function E(){s.value=[]}return{...a,selectedList:g,toggle:$,clearAll:E}}const ve={class:"relative"},be={class:"absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none"},fe=["disabled","placeholder","value","readonly"],ye=["disabled"],ge={key:0,class:"absolute z-20 mt-1 w-full card p-1"},xe={key:0,class:"px-3 py-2 text-sm opacity-70"},he=["data-idx","onMouseenter","onMousedown","aria-selected"],we={key:0,class:"px-3 py-2 text-sm opacity-70"},Q=j({__name:"SelectInput",props:{modelValue:{},options:{},fetchOptions:{type:Function},debounceMs:{},placeholder:{},clearable:{type:Boolean},disabled:{type:Boolean},size:{},color:{}},emits:["update:modelValue","change"],setup(s,{emit:S}){const a=s,b=S,g=x(a.modelValue??null);B(()=>a.modelValue,n=>g.value=n??null),B(g,n=>b("update:modelValue",n));const{root:$,inputEl:E,menu:w,open:i,query:f,hoverIdx:m,loading:v,filtered:C,selected:y,openMenu:h,choose:O,clear:V,onKey:L}=W(g,{options:a.options,fetchOptions:a.fetchOptions,debounceMs:a.debounceMs}),z={xs:"input-xs",sm:"input-sm",md:"input-md",lg:"input-lg",xl:"input-xl"},p=n=>!n||n==="default"?"input":`input input-${n}`,r=F(()=>{var n;return i.value?f.value:((n=y.value)==null?void 0:n.label)??""});return(n,o)=>(c(),u("div",{ref_key:"root",ref:$,class:"relative"},[e("div",ve,[e("span",be,[k(t(q),{name:"search",class:"w-4 h-4"})]),e("input",{ref_key:"inputEl",ref:E,disabled:s.disabled,placeholder:s.placeholder||"Search...",value:r.value,onFocus:o[0]||(o[0]=(...d)=>t(h)&&t(h)(...d)),onKeydown:o[1]||(o[1]=(...d)=>t(L)&&t(L)(...d)),readonly:!t(i),class:R([z[s.size||"md"],p(s.color),"w-full","input",s.disabled?"opacity-60 cursor-not-allowed":"cursor-pointer"]),style:{"padding-left":"2rem","padding-right":"4rem"},onInput:o[2]||(o[2]=d=>t(i)?f.value=d.target.value:null)},null,42,fe),s.clearable&&t(y)&&!s.disabled?(c(),u("button",{key:0,type:"button",class:"absolute inset-y-0 right-7 pr-2 flex items-center opacity-70 hover:opacity-100",onClick:o[3]||(o[3]=(...d)=>t(V)&&t(V)(...d))},[k(t(q),{name:"x",class:"w-4 h-4"})])):U("",!0),e("button",{type:"button",class:"absolute inset-y-0 right-0 pr-2 flex items-center opacity-70",onClick:o[4]||(o[4]=d=>i.value=!t(i)),disabled:s.disabled},[k(t(q),{name:t(i)?"chevron-up":"chevron-down",class:"w-4 h-4"},null,8,["name"])],8,ye)]),t(i)?(c(),u("div",ge,[t(v)?(c(),u("div",xe,"Loading…")):(c(),u("ul",{key:1,ref_key:"menu",ref:w,class:"max-h-60 overflow-auto",role:"listbox"},[(c(!0),u(H,null,_(t(C),(d,l)=>{var M,T;return c(),u("li",{key:d.value,"data-idx":l,class:R(["px-2 py-2 rounded-field text-sm flex items-center justify-between cursor-pointer",l===t(m)?"bg-base-200":"",d.disabled?"opacity-50 cursor-not-allowed":""]),onMouseenter:A=>m.value=l,onMousedown:K(A=>d.disabled?null:t(O)(d),["prevent"]),role:"option","aria-selected":((M=t(y))==null?void 0:M.value)===d.value},[e("span",null,D(d.label),1),((T=t(y))==null?void 0:T.value)===d.value?(c(),Z(t(q),{key:0,name:"check",class:"w-4 h-4 opacity-80"})):U("",!0)],42,he)}),128)),!t(C).length&&!t(v)?(c(),u("li",we," No results ")):U("",!0)],512))])):U("",!0)],512))}}),ke=["onClick"],Se={key:1,class:"opacity-60 text-sm"},Ce={class:"flex-1 min-w-[8ch]"},Ve={key:0,class:"absolute z-20 mt-1 w-full card p-2"},Me={key:0,class:"px-3 py-2 text-sm opacity-70"},Ie=["data-idx","onMousedown"],Oe=["checked"],ze={key:0,class:"px-2 py-2 text-sm opacity-70"},De=j({__name:"MultiSelect",props:{modelValue:{},options:{},fetchOptions:{type:Function},debounceMs:{},placeholder:{},disabled:{type:Boolean},size:{}},emits:["update:modelValue","change"],setup(s,{emit:S}){const a=s,b=S,g=x(a.modelValue??[]);B(()=>a.modelValue,z=>g.value=z??[]),B(g,z=>b("update:modelValue",z));const{root:$,inputEl:E,menu:w,open:i,query:f,loading:m,filtered:v,selectedList:C,openMenu:y,toggle:h,clearAll:O,onKey:V}=me(g,{options:a.options,fetchOptions:a.fetchOptions,debounceMs:a.debounceMs}),L={xs:"input-xs",sm:"input-sm",md:"input-md",lg:"input-lg",xl:"input-xl"};return(z,p)=>(c(),u("div",{ref_key:"root",ref:$,class:"relative"},[e("div",{class:R(["relative flex items-center gap-2 flex-wrap min-h-[var(--size-field-md)] rounded-field border border-base-300 bg-base-100 px-2",[L[s.size||"md"],s.disabled?"opacity-60 pointer-events-none":""]]),onClick:p[5]||(p[5]=(...r)=>t(y)&&t(y)(...r))},[t(C).length?(c(!0),u(H,{key:0},_(t(C),r=>(c(),u("span",{key:r.value,class:"badge badge-soft-primary gap-1"},[I(D(r.label)+" ",1),e("button",{type:"button",class:"icon-btn icon-btn-xs icon-btn-outline",onClick:K(n=>t(h)(r.value),["stop"])},[k(t(q),{name:"x",class:"w-3 h-3"})],8,ke)]))),128)):(c(),u("span",Se,D(s.placeholder||"Select options…"),1)),e("span",Ce,[J(e("input",{ref_key:"inputEl",ref:E,"onUpdate:modelValue":p[0]||(p[0]=r=>ne(f)?f.value=r:null),class:"input border-0 h-[unset] p-0 focus:shadow-none focus:outline-none",placeholder:"Search...",onKeydown:p[1]||(p[1]=(...r)=>t(V)&&t(V)(...r)),onFocus:p[2]||(p[2]=r=>i.value=!0)},null,544),[[ee,t(f)]])]),e("button",{type:"button",class:"icon-btn icon-btn-xs icon-btn-outline ml-auto",onClick:p[3]||(p[3]=K(r=>i.value=!t(i),["stop"]))},[k(t(q),{name:t(i)?"chevron-up":"chevron-down",class:"w-4 h-4"},null,8,["name"])]),t(C).length?(c(),u("button",{key:2,type:"button",class:"icon-btn icon-btn-xs icon-btn-outline",onClick:p[4]||(p[4]=K(r=>t(O)(),["stop"]))},[k(t(q),{name:"x",class:"w-4 h-4"})])):U("",!0)],2),t(i)?(c(),u("div",Ve,[t(m)?(c(),u("div",Me,"Loading…")):(c(),u("ul",{key:1,ref_key:"menu",ref:w,class:"max-h-60 overflow-auto"},[(c(!0),u(H,null,_(t(v),(r,n)=>(c(),u("li",{key:r.value,"data-idx":n,class:"px-2 py-1.5 rounded-field text-sm flex items-center gap-2 cursor-pointer hover:bg-base-200",onMousedown:K(o=>t(h)(r.value),["prevent"])},[e("input",{type:"checkbox",class:"checkbox checkbox-sm checkbox-primary",checked:g.value.includes(r.value)},null,8,Oe),e("span",null,D(r.label),1)],40,Ie))),128)),!t(v).length&&!t(m)?(c(),u("li",ze," No results ")):U("",!0)],512))])):U("",!0)],512))}}),Ee={class:"space-y-8"},Le={class:"card p-4 md:p-6 space-y-5"},$e={id:"controls",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},Te={class:"flex flex-wrap items-center gap-4"},Ae={class:"flex items-center gap-2"},Ue={class:"inline-flex overflow-hidden rounded-lg"},qe={class:"flex items-center gap-2"},Re={class:"inline-flex overflow-hidden rounded-lg"},He=["onClick"],_e={class:"flex items-center gap-2 text-sm"},Be={id:"playground",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},Ke={class:"grid grid-cols-1 md:grid-cols-2 gap-6"},Pe={id:"solid",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},Fe={class:"grid md:grid-cols-2 lg:grid-cols-4 gap-4"},Ne={class:"text-xs opacity-70 capitalize"},je={id:"outline",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},Ge={class:"grid md:grid-cols-2 lg:grid-cols-4 gap-4"},Qe={class:"text-xs opacity-70 capitalize"},Je={id:"select-search",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},We={class:"grid md:grid-cols-2 gap-6 items-start"},Xe={class:"text-xs opacity-70 mt-2"},Ye={id:"multi-select",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},Ze={class:"text-xs opacity-70 mt-2"},en={id:"dev-guide",class:"space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20"},nn={open:""},on={class:"mt-3 p-4 rounded bg-base-200 border border-base-300 space-y-2"},tn={class:"list-disc ml-5 space-y-2"},ln=["href"],sn=["href"],an=["href"],rn=["href"],cn=`<SelectDropdown
  v-model="selected"
  :options="options"
  placeholder="Choose..."
  size="md"
  color="primary"
  variant="solid"
/>`,dn=`<SelectDropdown
  v-model="selected"
  :options="options"
  placeholder="Choose..."
  size="md"
  color="primary"
  variant="outline"
/>`,un=j({__name:"SelectOption",setup(s){const S=[{id:"controls",label:"Controls"},{id:"playground",label:"Playground"},{id:"solid",label:"SOLID"},{id:"outline",label:"OUTLINE"},{id:"select-search",label:"Select dengan Search"},{id:"multi-select",label:"Multi Select"},{id:"dev-guide",label:"Developer Guide"}],a=[];function b(r,n="text/plain"){const o=URL.createObjectURL(new Blob([r],{type:n}));return a.push(o),o}const g=b(re,"text/typescript"),$=b(ie,"text/plain"),E=b(ce,"text/plain"),w=b(de,"text/plain");N(()=>a.forEach(r=>URL.revokeObjectURL(r)));const i=x("md"),f=x("solid"),m=x(!1),v=["xs","sm","md","lg","xl"],C=["default","primary","secondary","accent","info","success","warning","error"],y=[{value:"id",label:"Indonesia"},{value:"sg",label:"Singapore"},{value:"my",label:"Malaysia"},{value:"th",label:"Thailand"}],h=x({}),O=x(null),V=[{value:"id",label:"Indonesia"},{value:"sg",label:"Singapore"},{value:"my",label:"Malaysia"},{value:"th",label:"Thailand"}],L=x([]),z=[{value:"admin",label:"Admin"},{value:"pm",label:"Project Manager"},{value:"dev",label:"Developer"},{value:"qa",label:"QA"}];async function p(r){await new Promise(o=>setTimeout(o,250));const n=r.toLowerCase();return V.filter(o=>o.label.toLowerCase().includes(n))}return(r,n)=>(c(),u("div",Ee,[k(ae,{category:"Components",title:"Select Option",description:"Custom Select dengan smooth dropdown (Solid & Outline) + Search & Multi Select."}),e("div",Le,[e("section",$e,[e("div",Te,[e("div",Ae,[n[8]||(n[8]=e("span",{class:"text-sm opacity-80"},"Variant",-1)),e("div",Ue,[e("button",{class:R(["btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg",{"btn-primary":f.value==="solid"}]),onClick:n[0]||(n[0]=o=>f.value="solid")}," Solid ",2),e("button",{class:R(["btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg",{"btn-primary":f.value==="outline"}]),onClick:n[1]||(n[1]=o=>f.value="outline")}," Outline ",2)])]),e("div",qe,[n[9]||(n[9]=e("span",{class:"text-sm opacity-80"},"Size",-1)),e("div",Re,[(c(),u(H,null,_(v,o=>e("button",{key:o,class:R(["btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg",{"btn-primary":i.value===o}]),onClick:d=>i.value=o},D(o),11,He)),64))])]),e("label",_e,[J(e("input",{type:"checkbox",class:"toggle toggle-sm","onUpdate:modelValue":n[2]||(n[2]=o=>m.value=o)},null,512),[[oe,m.value]]),n[10]||(n[10]=I(" Disabled ",-1))])])]),e("section",Be,[n[13]||(n[13]=e("h3",{class:"font-semibold opacity-90"},"Playground",-1)),e("div",Ke,[e("div",null,[n[11]||(n[11]=e("label",{class:"text-xs opacity-70 mb-1 block"},"Default",-1)),k(P,{modelValue:h.value["playground-default"],"onUpdate:modelValue":n[3]||(n[3]=o=>h.value["playground-default"]=o),options:y,placeholder:"Choose...",size:i.value,color:"default",variant:f.value,disabled:m.value},null,8,["modelValue","size","variant","disabled"])]),e("div",null,[n[12]||(n[12]=e("label",{class:"text-xs opacity-70 mb-1 block"},"Primary",-1)),k(P,{modelValue:h.value["playground-primary"],"onUpdate:modelValue":n[4]||(n[4]=o=>h.value["playground-primary"]=o),options:y,placeholder:"Choose...",size:i.value,color:"primary",variant:f.value,disabled:m.value},null,8,["modelValue","size","variant","disabled"])])])]),e("section",Pe,[n[15]||(n[15]=e("h3",{class:"font-semibold opacity-90"},"SOLID",-1)),e("div",Fe,[(c(),u(H,null,_(C,o=>e("div",{key:"solid-"+o,class:"space-y-1"},[e("div",Ne,D(o),1),k(P,{modelValue:h.value["solid-"+o],"onUpdate:modelValue":d=>h.value["solid-"+o]=d,options:y,placeholder:"Choose...",size:i.value,color:o,variant:"solid",disabled:m.value},null,8,["modelValue","onUpdate:modelValue","size","color","disabled"])])),64))]),e("details",{class:"mt-4"},[n[14]||(n[14]=e("summary",{class:"cursor-pointer text-sm font-medium"},"Code Example",-1)),e("pre",{class:"code mt-3"},[e("code",null,D(cn))])])]),e("section",je,[n[17]||(n[17]=e("h3",{class:"font-semibold opacity-90"},"OUTLINE",-1)),e("div",Ge,[(c(),u(H,null,_(C,o=>e("div",{key:"outline-"+o,class:"space-y-1"},[e("div",Qe,D(o),1),k(P,{modelValue:h.value["outline-"+o],"onUpdate:modelValue":d=>h.value["outline-"+o]=d,options:y,placeholder:"Choose...",size:i.value,color:o,variant:"outline",disabled:m.value},null,8,["modelValue","onUpdate:modelValue","size","color","disabled"])])),64))]),e("details",{class:"mt-4"},[n[16]||(n[16]=e("summary",{class:"cursor-pointer text-sm font-medium"},"Code Example",-1)),e("pre",{class:"code mt-3"},[e("code",null,D(dn))])])]),e("section",Je,[n[21]||(n[21]=e("h3",{class:"font-semibold opacity-90"},"Select dengan Search (SelectInput)",-1)),e("div",We,[e("div",null,[n[19]||(n[19]=e("label",{class:"text-xs opacity-70"},"Local options",-1)),k(Q,{modelValue:O.value,"onUpdate:modelValue":n[5]||(n[5]=o=>O.value=o),options:V,placeholder:"Choose country...",clearable:"",size:"md",color:"primary"},null,8,["modelValue"]),e("div",Xe,[n[18]||(n[18]=I(" Value: ",-1)),e("code",null,D(O.value),1)])]),e("div",null,[n[20]||(n[20]=e("label",{class:"text-xs opacity-70"},"Remote/async",-1)),k(Q,{modelValue:O.value,"onUpdate:modelValue":n[6]||(n[6]=o=>O.value=o),"fetch-options":p,"debounce-ms":300,placeholder:"Search countries...",clearable:""},null,8,["modelValue"])])]),n[22]||(n[22]=e("details",{class:"mt-4"},[e("summary",{class:"cursor-pointer text-sm font-medium"}," Markup contoh (SelectInput) "),e("pre",{class:"code mt-3"},[I("            "),e("code",null,`<script setup lang="ts">
              import SelectInput from '@/components/controls/SelectInput.vue'
              const country = ref<string|number|null>(null)
              const countries = [{ value:'id', label:'Indonesia' }, ...]
              <\/script>

              <template>
                <SelectInput
                  v-model="country"
                  :options="countries"
                  placeholder="Choose country..."
                  clearable
                  size="md"
                  color="primary"
                />
              </template>
            `),I(`
          `)])],-1))]),e("section",Ye,[n[24]||(n[24]=e("h3",{class:"font-semibold opacity-90"},"Multi Select (chips + search)",-1)),k(De,{modelValue:L.value,"onUpdate:modelValue":n[7]||(n[7]=o=>L.value=o),options:z,placeholder:"Choose roles..."},null,8,["modelValue"]),e("div",Ze,[n[23]||(n[23]=I(" Values: ",-1)),e("code",null,D(L.value),1)]),n[25]||(n[25]=e("details",{class:"mt-4"},[e("summary",{class:"cursor-pointer text-sm font-medium"}," Markup contoh (MultiSelect) "),e("pre",{class:"code mt-3"},[e("code",null,`<script setup lang="ts">
import MultiSelect from '@/components/controls/MultiSelect.vue'
const roles = ref<Array<string|number>>([])
const roleOptions = [
  { value:'admin', label:'Admin' },
  { value:'pm', label:'Project Manager' },
]
<\/script>

<template>
  <MultiSelect v-model="roles" :options="roleOptions" placeholder="Choose roles..." />
</template>`)])],-1))]),e("section",en,[n[32]||(n[32]=e("h3",{class:"font-semibold"},"Developer Guide",-1)),e("details",nn,[n[31]||(n[31]=e("summary",{class:"font-medium"}," Install · Select Components ",-1)),e("div",on,[n[30]||(n[30]=e("div",{class:"text-sm font-medium"},"Download",-1)),e("ul",tn,[e("li",null,[e("a",{href:t(g),download:"useSelect.ts",class:"btn btn-xs bg-accent text-white"}," useSelect.ts ",8,ln),n[26]||(n[26]=e("span",{class:"ml-2 text-sm"},[I("→ "),e("code",null,"src/composables/useSelect.ts")],-1))]),e("li",null,[e("a",{href:t(w),download:"SelectDropdown.vue",class:"btn btn-xs bg-accent text-white"}," SelectDropdown.vue ",8,sn),n[27]||(n[27]=e("span",{class:"ml-2 text-sm"},[I("→ "),e("code",null,"src/components/controls/SelectDropdown.vue"),I(" (Solid/Outline)")],-1))]),e("li",null,[e("a",{href:t($),download:"SelectInput.vue",class:"btn btn-xs bg-accent text-white"}," SelectInput.vue ",8,an),n[28]||(n[28]=e("span",{class:"ml-2 text-sm"},[I("→ "),e("code",null,"src/components/controls/SelectInput.vue"),I(" (with Search)")],-1))]),e("li",null,[e("a",{href:t(E),download:"MultiSelect.vue",class:"btn btn-xs bg-accent text-white"}," MultiSelect.vue ",8,rn),n[29]||(n[29]=e("span",{class:"ml-2 text-sm"},[I("→ "),e("code",null,"src/components/controls/MultiSelect.vue")],-1))])])])]),n[33]||(n[33]=te('<details data-v-c3800157><summary class="font-medium" data-v-c3800157>Props Reference</summary><div class="mt-3 space-y-4" data-v-c3800157><div data-v-c3800157><h4 class="font-semibold text-sm mb-2" data-v-c3800157>SelectDropdown</h4><ul class="list-disc ml-5 text-sm space-y-1 opacity-80" data-v-c3800157><li data-v-c3800157><code data-v-c3800157>v-model</code> - Selected value (string | number | null)</li><li data-v-c3800157><code data-v-c3800157>options</code> - Array of { value, label, disabled? }</li><li data-v-c3800157><code data-v-c3800157>placeholder</code> - Placeholder text</li><li data-v-c3800157><code data-v-c3800157>size</code> - xs | sm | md | lg | xl</li><li data-v-c3800157><code data-v-c3800157>color</code> - default | primary | secondary | accent | info | success | warning | error</li><li data-v-c3800157><code data-v-c3800157>variant</code> - solid | outline</li><li data-v-c3800157><code data-v-c3800157>disabled</code> - Boolean</li></ul></div><div data-v-c3800157><h4 class="font-semibold text-sm mb-2" data-v-c3800157>SelectInput</h4><ul class="list-disc ml-5 text-sm space-y-1 opacity-80" data-v-c3800157><li data-v-c3800157><code data-v-c3800157>v-model</code> - Selected value</li><li data-v-c3800157><code data-v-c3800157>options</code> / <code data-v-c3800157>fetch-options</code> - Local or remote options</li><li data-v-c3800157><code data-v-c3800157>debounce-ms</code> - Debounce for remote search</li><li data-v-c3800157><code data-v-c3800157>clearable</code> - Show clear button</li><li data-v-c3800157><code data-v-c3800157>size</code>, <code data-v-c3800157>color</code>, <code data-v-c3800157>disabled</code></li></ul></div><div data-v-c3800157><h4 class="font-semibold text-sm mb-2" data-v-c3800157>MultiSelect</h4><ul class="list-disc ml-5 text-sm space-y-1 opacity-80" data-v-c3800157><li data-v-c3800157><code data-v-c3800157>v-model</code> - Array of selected values</li><li data-v-c3800157><code data-v-c3800157>options</code> / <code data-v-c3800157>fetch-options</code></li><li data-v-c3800157><code data-v-c3800157>placeholder</code>, <code data-v-c3800157>size</code>, <code data-v-c3800157>disabled</code></li></ul></div></div></details>',1))])]),k(se,{items:S})]))}}),bn=le(un,[["__scopeId","data-v-c3800157"]]);export{bn as default};
