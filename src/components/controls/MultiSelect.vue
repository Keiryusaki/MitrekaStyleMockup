<script setup lang="ts">
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
</script>

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
