import {
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
      const el = m.querySelector<HTMLElement>(`[data-idx="${hoverIdx.value}"]`);
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
