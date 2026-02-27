<script setup lang="ts">
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
  !c || c === "default" ? "input" : `input input-${c}`;
const displayValue = computed(() =>
  open.value ? query.value : selected.value?.label ?? ""
);

function toggleMenu() {
  if (props.disabled) return;
  if (open.value) {
    closeMenu();
    return;
  }
  openMenu();
}
</script>

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
        @click="openMenu"
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
        @click="toggleMenu"
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
