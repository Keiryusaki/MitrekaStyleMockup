<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, reactive, ref, watch } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Modal from "@/components/feedback/Modal.vue";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";
import {
  applyThemeOverride,
  buildThemeOverrideCss,
  getRuntimeDefaultThemeDraft,
  loadThemeOverride,
  normalizeThemeDraft,
  type ThemeBuilderDraft,
  type ThemeMode,
} from "@/composables/themeBuilder";

type ThemePreset = {
  id: string;
  name: string;
  draft: ThemeBuilderDraft;
  createdAt: string;
  updatedAt: string;
};

const PRESET_STORAGE_KEY = "mitreka-theme-builder-presets-v1";

const defaultDraft = getRuntimeDefaultThemeDraft();
const savedDraft = loadThemeOverride();
const draft = reactive<ThemeBuilderDraft>(
  normalizeThemeDraft(savedDraft || defaultDraft)
);

const currentMode = ref<ThemeMode>("mitrekalight");
const livePreview = ref(false);
const applyState = ref(savedDraft ? "Saved custom theme is active." : "Using default theme.");

const presetNameInput = ref("");
const presetList = ref<ThemePreset[]>(loadPresetsFromStorage());
const selectedPresetId = ref("");

const showSaveConfirm = ref(false);
const showDeleteConfirm = ref(false);
const showCopyModal = ref(false);
const copySuccess = ref(false);
const suppressDraftPreview = ref(false);

const modeLabel = computed(() =>
  currentMode.value === "mitrekalight" ? "Light" : "Dark"
);

const activeScale = computed(() =>
  currentMode.value === "mitrekalight" ? draft.light : draft.dark
);

const isDarkMode = computed({
  get: () => currentMode.value === "mitrekadark",
  set: (value: boolean) => {
    currentMode.value = value ? "mitrekadark" : "mitrekalight";
  },
});

const selectedPreset = computed(() =>
  presetList.value.find((item) => item.id === selectedPresetId.value) || null
);

const canAddPreset = computed(() => presetNameInput.value.trim().length > 0);
const canUpdatePreset = computed(() => !!selectedPreset.value);
const canDeletePreset = computed(() => !!selectedPreset.value);
const canCopyPreset = computed(() => !!selectedPreset.value);

const presetOptions = computed(() => [
  { value: "", label: "Default (No Preset)" },
  ...presetList.value.map((item) => ({ value: item.id, label: item.name })),
]);

const selectedPresetCss = computed(() => {
  if (!selectedPreset.value) return "";
  return `/* Preset: ${selectedPreset.value.name} */\n${buildThemeOverrideCss(
    selectedPreset.value.draft
  )}`;
});

function restorePrimaryTheme(): void {
  const saved = loadThemeOverride();
  applyThemeOverride(saved ? cloneDraft(saved) : null);
}

let colorProbeEl: HTMLDivElement | null = null;

function ensureColorProbe(): HTMLDivElement | null {
  if (typeof document === "undefined") return null;
  if (colorProbeEl) return colorProbeEl;
  const el = document.createElement("div");
  el.style.position = "fixed";
  el.style.left = "-9999px";
  el.style.top = "-9999px";
  el.style.width = "0";
  el.style.height = "0";
  el.style.pointerEvents = "none";
  document.body.appendChild(el);
  colorProbeEl = el;
  return colorProbeEl;
}

function clampByte(value: number): number {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function toHexByte(value: number): string {
  return clampByte(value).toString(16).padStart(2, "0");
}

function normalizeHexAlpha(input: string): string | null {
  const v = input.trim().toLowerCase();
  if (/^#[0-9a-f]{8}$/.test(v)) return v;
  if (/^#[0-9a-f]{6}$/.test(v)) return `${v}ff`;

  const short4 = v.match(/^#([0-9a-f]{4})$/);
  if (short4) {
    const [r, g, b, a] = short4[1].split("");
    return `#${r}${r}${g}${g}${b}${b}${a}${a}`;
  }

  const short3 = v.match(/^#([0-9a-f]{3})$/);
  if (short3) {
    const [r, g, b] = short3[1].split("");
    return `#${r}${r}${g}${g}${b}${b}ff`;
  }
  return null;
}

function oklchToHex(lightnessPct: number, chroma: number, hueDeg: number): string {
  const l = lightnessPct / 100;
  const hRad = (hueDeg * Math.PI) / 180;
  const a = chroma * Math.cos(hRad);
  const b = chroma * Math.sin(hRad);

  const l1 = l + 0.3963377774 * a + 0.2158037573 * b;
  const m1 = l - 0.1055613458 * a - 0.0638541728 * b;
  const s1 = l - 0.0894841775 * a - 1.291485548 * b;

  const l3 = l1 ** 3;
  const m3 = m1 ** 3;
  const s3 = s1 ** 3;

  const rLin = +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const gLin = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bLin = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;

  const compand = (v: number): number =>
    v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;

  const r = compand(Math.max(0, Math.min(1, rLin))) * 255;
  const g = compand(Math.max(0, Math.min(1, gLin))) * 255;
  const bOut = compand(Math.max(0, Math.min(1, bLin))) * 255;

  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(bOut)}`;
}

function parseRgbToHex(input: string): string | null {
  const rgbMatch = input
    .trim()
    .match(/^rgba?\(\s*([0-9]{1,3})[\s,]+([0-9]{1,3})[\s,]+([0-9]{1,3})(?:[\s,\/]+[\d.]+)?\s*\)$/i);
  if (!rgbMatch) return null;
  const r = Number(rgbMatch[1]);
  const g = Number(rgbMatch[2]);
  const b = Number(rgbMatch[3]);
  if ([r, g, b].some((n) => Number.isNaN(n))) return null;
  return `#${toHexByte(r)}${toHexByte(g)}${toHexByte(b)}`;
}

function parseOklchToHex(input: string): string | null {
  const match = input.trim().match(
    /^oklch\(\s*([0-9]*\.?[0-9]+)%\s+([0-9]*\.?[0-9]+)\s+([0-9]*\.?[0-9]+)(?:\s*\/\s*[0-9]*\.?[0-9]+)?\s*\)$/i
  );
  if (!match) return null;
  const lightness = Number(match[1]);
  const chroma = Number(match[2]);
  const hue = Number(match[3]);
  if ([lightness, chroma, hue].some((n) => Number.isNaN(n))) return null;
  return oklchToHex(lightness, chroma, hue);
}

function parseCssColorToHex(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  const shortHex = raw.match(/^#([0-9a-fA-F]{3})$/);
  if (shortHex) {
    const [r, g, b] = shortHex[1].split("");
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }

  const longHex = raw.match(/^#([0-9a-fA-F]{6})$/);
  if (longHex) return `#${longHex[1].toLowerCase()}`;

  const rgbHex = parseRgbToHex(raw);
  if (rgbHex) return rgbHex.toLowerCase();

  const oklchHex = parseOklchToHex(raw);
  if (oklchHex) return oklchHex.toLowerCase();

  const probe = ensureColorProbe();
  if (!probe) return null;
  probe.style.color = "";
  probe.style.color = raw;
  if (!probe.style.color) return null;
  const computed = getComputedStyle(probe).color;
  const computedHex = parseRgbToHex(computed);
  return computedHex ? computedHex.toLowerCase() : null;
}

const activeColorPicker = ref<string | null>(null);

function clampAlpha(value: number): number {
  if (!Number.isFinite(value)) return 1;
  return Math.max(0, Math.min(1, value));
}

function extractAlpha(value: string): number {
  const v = (value || "").trim();
  const rgbaMatch = v.match(
    /^rgba\(\s*[0-9]{1,3}[\s,]+[0-9]{1,3}[\s,]+[0-9]{1,3}[\s,\/]+([0-9]*\.?[0-9]+)\s*\)$/i
  );
  if (rgbaMatch) return clampAlpha(Number(rgbaMatch[1]));

  const hex8Match = v.match(/^#([0-9a-fA-F]{8})$/);
  if (hex8Match) {
    const alphaHex = hex8Match[1].slice(6, 8);
    return clampAlpha(parseInt(alphaHex, 16) / 255);
  }
  return 1;
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const parsed = parseCssColorToHex(hex);
  if (!parsed) return null;
  const value = parsed.slice(1);
  return {
    r: parseInt(value.slice(0, 2), 16),
    g: parseInt(value.slice(2, 4), 16),
    b: parseInt(value.slice(4, 6), 16),
  };
}

function applyAlphaToHex(hex: string, alpha: number): string {
  const rgb = hexToRgb(hex);
  if (!rgb) return hex;
  const nextAlpha = clampAlpha(alpha);
  if (nextAlpha >= 0.999) return `#${toHexByte(rgb.r)}${toHexByte(rgb.g)}${toHexByte(rgb.b)}`;
  const normalized = Number(nextAlpha.toFixed(2));
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${normalized})`;
}

function getPickerColor(value: string): string {
  return parseCssColorToHex(value) || "#000000";
}

function getPickerHexAlpha(value: string): string {
  const rgbHex = getPickerColor(value);
  const alpha = clampAlpha(extractAlpha(value));
  return `${rgbHex}${toHexByte(alpha * 255)}`;
}

function setColorFromHexAlpha(
  value: string,
  nextHexAlpha: string,
  apply: (next: string) => void
): void {
  const normalized = normalizeHexAlpha(nextHexAlpha);
  if (!normalized) return;
  const hex = `#${normalized.slice(1, 7)}`;
  const alpha = parseInt(normalized.slice(7, 9), 16) / 255;
  const currentAlpha = clampAlpha(extractAlpha(value));
  const nextAlpha = Number.isFinite(alpha) ? alpha : currentAlpha;
  apply(applyAlphaToHex(hex, nextAlpha));
}

function openColorPicker(key: string): void {
  activeColorPicker.value = key;
}

function closeColorPicker(): void {
  activeColorPicker.value = null;
}

function handleDocumentPointerDown(event: PointerEvent): void {
  const target = event.target as HTMLElement | null;
  if (!target) return;
  if (target.closest(".picker-host")) return;
  closeColorPicker();
}

function handleColorTextCommit(
  event: Event,
  apply: (value: string) => void,
  fallback: string
): void {
  const target = event.target as HTMLInputElement;
  const parsed = parseCssColorToHex(target.value);
  if (!parsed) {
    target.value = fallback;
    return;
  }
  const alpha = clampAlpha(extractAlpha(fallback));
  const nextValue = applyAlphaToHex(parsed, alpha);
  apply(nextValue);
  target.value = nextValue;
}

function cloneDraft(value: ThemeBuilderDraft): ThemeBuilderDraft {
  return JSON.parse(JSON.stringify(value)) as ThemeBuilderDraft;
}

function applyDraftToEditor(nextDraft: ThemeBuilderDraft): void {
  Object.assign(draft.light, nextDraft.light);
  Object.assign(draft.dark, nextDraft.dark);
}

function loadPresetsFromStorage(): ThemePreset[] {
  try {
    const raw = localStorage.getItem(PRESET_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as ThemePreset[];
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map((item) => ({
        id: String(item.id || ""),
        name: String(item.name || "").trim(),
        draft: normalizeThemeDraft(item.draft),
        createdAt: String(item.createdAt || new Date().toISOString()),
        updatedAt: String(item.updatedAt || new Date().toISOString()),
      }))
      .filter((item) => item.id && item.name);
  } catch {
    return [];
  }
}

function persistPresetList(): void {
  localStorage.setItem(PRESET_STORAGE_KEY, JSON.stringify(presetList.value));
}

function makePresetId(): string {
  return `preset-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function addPreset(): void {
  const name = presetNameInput.value.trim();
  if (!name) return;

  const existing = presetList.value.find(
    (item) => item.name.toLowerCase() === name.toLowerCase()
  );
  if (existing) {
    selectedPresetId.value = existing.id;
    applyState.value = `Preset "${existing.name}" already exists and was selected.`;
    return;
  }

  const now = new Date().toISOString();
  const preset: ThemePreset = {
    id: makePresetId(),
    name,
    draft: normalizeThemeDraft(cloneDraft(draft)),
    createdAt: now,
    updatedAt: now,
  };

  presetList.value = [preset, ...presetList.value];
  persistPresetList();
  selectedPresetId.value = preset.id;
  presetNameInput.value = "";
  applyState.value = `Preset "${preset.name}" created.`;
}

function onPresetSelected(): void {
  const preset = selectedPreset.value;
  if (!preset) return;

  applyDraftToEditor(normalizeThemeDraft(preset.draft));
  applyState.value = `Preset "${preset.name}" loaded to editor.`;
}

function openSaveConfirm(): void {
  if (!selectedPreset.value) return;
  showSaveConfirm.value = true;
}

function confirmSavePreset(): void {
  const selected = selectedPreset.value;
  if (!selected) return;

  const now = new Date().toISOString();
  presetList.value = presetList.value.map((item) =>
    item.id === selected.id
      ? {
          ...item,
          draft: normalizeThemeDraft(cloneDraft(draft)),
          updatedAt: now,
        }
      : item
  );
  persistPresetList();
  showSaveConfirm.value = false;
  applyState.value = `Preset "${selected.name}" updated.`;
}

function openDeleteConfirm(): void {
  if (!selectedPreset.value) return;
  showDeleteConfirm.value = true;
}

function confirmDeletePreset(): void {
  const selected = selectedPreset.value;
  if (!selected) return;

  presetList.value = presetList.value.filter((item) => item.id !== selected.id);
  persistPresetList();
  selectedPresetId.value = "";
  showDeleteConfirm.value = false;
  applyState.value = `Preset "${selected.name}" deleted.`;
}

function openCopyPresetModal(): void {
  if (!selectedPreset.value) return;
  copySuccess.value = false;
  showCopyModal.value = true;
}

async function copyPresetCss(): Promise<void> {
  if (!selectedPresetCss.value) return;
  await navigator.clipboard.writeText(selectedPresetCss.value);
  copySuccess.value = true;
}

watch(
  draft,
  () => {
    if (suppressDraftPreview.value) return;
    if (!livePreview.value) return;
    applyThemeOverride(cloneDraft(draft));
  },
  { deep: true }
);

watch(livePreview, (enabled) => {
  if (!enabled) {
    restorePrimaryTheme();
    applyState.value = "Live preview disabled. Back to active topbar theme.";
    return;
  }
  applyThemeOverride(cloneDraft(draft));
  applyState.value = "Live preview enabled.";
});

watch(
  selectedPresetId,
  () => {
    if (!selectedPreset.value) {
      suppressDraftPreview.value = true;
      applyDraftToEditor(cloneDraft(defaultDraft));
      applyState.value = "Default preset loaded.";
      if (livePreview.value) {
        applyThemeOverride(null);
      }
      queueMicrotask(() => {
        suppressDraftPreview.value = false;
      });
      return;
    }
    suppressDraftPreview.value = true;
    onPresetSelected();
    if (livePreview.value) {
      applyThemeOverride(cloneDraft(draft));
    }
    queueMicrotask(() => {
      suppressDraftPreview.value = false;
    });
  },
  { immediate: true }
);

onMounted(() => {
  if (!livePreview.value) {
    restorePrimaryTheme();
  }
  document.addEventListener("pointerdown", handleDocumentPointerDown, true);
});

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", handleDocumentPointerDown, true);
});

const fieldRadius = computed({
  get: () => Number.parseFloat(activeScale.value.radius.field),
  set: (value: number) => {
    activeScale.value.radius.field = `${value.toFixed(2)}rem`;
  },
});

const boxRadius = computed({
  get: () => Number.parseFloat(activeScale.value.radius.box),
  set: (value: number) => {
    activeScale.value.radius.box = `${value.toFixed(2)}rem`;
  },
});
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      category="Utility"
      title="Theme Builder"
      description="Per-mode theme builder: Light and Dark have independent token controls."
    />

    <section class="card p-4 md:p-6 space-y-4 builder-toolbar">
      <div class="toolbar-row">
        <label class="mode-toggle">
          <span class="mode-label">Light</span>
          <input v-model="isDarkMode" type="checkbox" class="switch switch-primary" />
          <span class="mode-label">Dark</span>
        </label>

        <label class="mode-toggle">
          <span class="mode-label">Preview Off</span>
          <input v-model="livePreview" type="checkbox" class="switch switch-primary" />
          <span class="mode-label">Preview On</span>
        </label>
      </div>

      <div class="toolbar-row toolbar-row-presets">
        <div class="preset-input-wrap">
          <input
            v-model="presetNameInput"
            type="text"
            class="input input-sm input-bordered w-full"
            placeholder="Preset name"
          />
          <button class="btn btn-sm btn-primary" :disabled="!canAddPreset" @click="addPreset">
            Add Preset
          </button>
        </div>

        <div class="preset-actions-wrap">
          <SelectDropdown
            v-model="selectedPresetId"
            :options="presetOptions"
            size="sm"
            class="preset-select"
            placeholder="Select preset"
          />

          <button class="btn btn-sm btn-outline btn-outline-primary" :disabled="!canUpdatePreset" @click="openSaveConfirm">
            Save Preset
          </button>
          <button class="btn btn-sm btn-soft-error" :disabled="!canDeletePreset" @click="openDeleteConfirm">
            Delete Preset
          </button>
          <button class="btn btn-sm btn-outline" :disabled="!canCopyPreset" @click="openCopyPresetModal">
            Copy Preset
          </button>
        </div>
      </div>

      <div class="text-sm opacity-80">{{ applyState }}</div>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <h3 class="text-lg font-semibold">Editing {{ modeLabel }} Tokens</h3>
      <p class="text-sm opacity-75">Semua setting di bawah ini berlaku khusus untuk mode {{ modeLabel.toLowerCase() }}.</p>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <div class="section-head">
        <h3 class="text-lg font-semibold">State Colors</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <label class="field">
          <span class="field-label">Primary</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.primary) }" @click.stop="openColorPicker('state-primary')"></button>
            <div v-if="activeColorPicker === 'state-primary'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.primary)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.primary, $event as string, (next) => (activeScale.colors.primary = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.primary" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.primary = v), activeScale.colors.primary)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Secondary</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.secondary) }" @click.stop="openColorPicker('state-secondary')"></button>
            <div v-if="activeColorPicker === 'state-secondary'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.secondary)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.secondary, $event as string, (next) => (activeScale.colors.secondary = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.secondary" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.secondary = v), activeScale.colors.secondary)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Accent</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.accent) }" @click.stop="openColorPicker('state-accent')"></button>
            <div v-if="activeColorPicker === 'state-accent'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.accent)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.accent, $event as string, (next) => (activeScale.colors.accent = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.accent" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.accent = v), activeScale.colors.accent)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Info</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.info) }" @click.stop="openColorPicker('state-info')"></button>
            <div v-if="activeColorPicker === 'state-info'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.info)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.info, $event as string, (next) => (activeScale.colors.info = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.info" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.info = v), activeScale.colors.info)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Success</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.success) }" @click.stop="openColorPicker('state-success')"></button>
            <div v-if="activeColorPicker === 'state-success'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.success)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.success, $event as string, (next) => (activeScale.colors.success = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.success" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.success = v), activeScale.colors.success)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Warning</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.warning) }" @click.stop="openColorPicker('state-warning')"></button>
            <div v-if="activeColorPicker === 'state-warning'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.warning)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.warning, $event as string, (next) => (activeScale.colors.warning = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.warning" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.warning = v), activeScale.colors.warning)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Error</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.error) }" @click.stop="openColorPicker('state-error')"></button>
            <div v-if="activeColorPicker === 'state-error'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.error)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.error, $event as string, (next) => (activeScale.colors.error = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.error" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.error = v), activeScale.colors.error)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Neutral</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.colors.neutral) }" @click.stop="openColorPicker('state-neutral')"></button>
            <div v-if="activeColorPicker === 'state-neutral'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.colors.neutral)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.colors.neutral, $event as string, (next) => (activeScale.colors.neutral = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.colors.neutral" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.colors.neutral = v), activeScale.colors.neutral)" />
          </div>
        </label>
      </div>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <div class="section-head">
        <h3 class="text-lg font-semibold">Base Colors</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <label class="field">
          <span class="field-label">Base 100</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.base.base100) }" @click.stop="openColorPicker('base-100')"></button>
            <div v-if="activeColorPicker === 'base-100'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.base.base100)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.base.base100, $event as string, (next) => (activeScale.base.base100 = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.base.base100" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.base.base100 = v), activeScale.base.base100)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Base 200</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.base.base200) }" @click.stop="openColorPicker('base-200')"></button>
            <div v-if="activeColorPicker === 'base-200'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.base.base200)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.base.base200, $event as string, (next) => (activeScale.base.base200 = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.base.base200" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.base.base200 = v), activeScale.base.base200)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Base 300</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.base.base300) }" @click.stop="openColorPicker('base-300')"></button>
            <div v-if="activeColorPicker === 'base-300'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.base.base300)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.base.base300, $event as string, (next) => (activeScale.base.base300 = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.base.base300" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.base.base300 = v), activeScale.base.base300)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Base Content</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.base.baseContent) }" @click.stop="openColorPicker('base-content')"></button>
            <div v-if="activeColorPicker === 'base-content'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.base.baseContent)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.base.baseContent, $event as string, (next) => (activeScale.base.baseContent = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.base.baseContent" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.base.baseContent = v), activeScale.base.baseContent)" />
          </div>
        </label>
      </div>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <div class="flex items-center justify-between gap-2 flex-wrap">
        <div class="section-head-left">
          <h3 class="text-lg font-semibold">Layout Colors</h3>
        </div>
        <label class="inline-flex items-center gap-2 text-sm">
          <input v-model="activeScale.layout.usePrimaryForLayout" type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
          Use primary for topbar + sidebar
        </label>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <label class="field">
          <span class="field-label">Topbar BG</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.layout.topbarBg) }" :disabled="activeScale.layout.usePrimaryForLayout" @click.stop="openColorPicker('layout-topbar-bg')"></button>
            <div v-if="activeColorPicker === 'layout-topbar-bg' && !activeScale.layout.usePrimaryForLayout" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.layout.topbarBg)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.layout.topbarBg, $event as string, (next) => (activeScale.layout.topbarBg = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.layout.topbarBg" type="text" :disabled="activeScale.layout.usePrimaryForLayout" @change="handleColorTextCommit($event, (v) => (activeScale.layout.topbarBg = v), activeScale.layout.topbarBg)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Topbar Text</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.layout.topbarText) }" :disabled="activeScale.layout.usePrimaryForLayout" @click.stop="openColorPicker('layout-topbar-text')"></button>
            <div v-if="activeColorPicker === 'layout-topbar-text' && !activeScale.layout.usePrimaryForLayout" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.layout.topbarText)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.layout.topbarText, $event as string, (next) => (activeScale.layout.topbarText = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.layout.topbarText" type="text" :disabled="activeScale.layout.usePrimaryForLayout" @change="handleColorTextCommit($event, (v) => (activeScale.layout.topbarText = v), activeScale.layout.topbarText)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Sidebar BG</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.layout.sidebarBg) }" :disabled="activeScale.layout.usePrimaryForLayout" @click.stop="openColorPicker('layout-sidebar-bg')"></button>
            <div v-if="activeColorPicker === 'layout-sidebar-bg' && !activeScale.layout.usePrimaryForLayout" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.layout.sidebarBg)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.layout.sidebarBg, $event as string, (next) => (activeScale.layout.sidebarBg = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.layout.sidebarBg" type="text" :disabled="activeScale.layout.usePrimaryForLayout" @change="handleColorTextCommit($event, (v) => (activeScale.layout.sidebarBg = v), activeScale.layout.sidebarBg)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Sidebar Text</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.layout.sidebarText) }" :disabled="activeScale.layout.usePrimaryForLayout" @click.stop="openColorPicker('layout-sidebar-text')"></button>
            <div v-if="activeColorPicker === 'layout-sidebar-text' && !activeScale.layout.usePrimaryForLayout" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.layout.sidebarText)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.layout.sidebarText, $event as string, (next) => (activeScale.layout.sidebarText = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.layout.sidebarText" type="text" :disabled="activeScale.layout.usePrimaryForLayout" @change="handleColorTextCommit($event, (v) => (activeScale.layout.sidebarText = v), activeScale.layout.sidebarText)" />
          </div>
        </label>
      </div>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <div class="section-head">
        <h3 class="text-lg font-semibold">Sidebar Decoration</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        <label class="field">
          <span class="field-label">Hover BG</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.hoverBg) }" @click.stop="openColorPicker('sidebar-hover-bg')"></button>
            <div v-if="activeColorPicker === 'sidebar-hover-bg'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.hoverBg)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.hoverBg, $event as string, (next) => (activeScale.sidebar.hoverBg = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.hoverBg" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.hoverBg = v), activeScale.sidebar.hoverBg)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Active BG</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.activeBg) }" @click.stop="openColorPicker('sidebar-active-bg')"></button>
            <div v-if="activeColorPicker === 'sidebar-active-bg'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.activeBg)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.activeBg, $event as string, (next) => (activeScale.sidebar.activeBg = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.activeBg" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.activeBg = v), activeScale.sidebar.activeBg)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Active Text</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.activeText) }" @click.stop="openColorPicker('sidebar-active-text')"></button>
            <div v-if="activeColorPicker === 'sidebar-active-text'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.activeText)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.activeText, $event as string, (next) => (activeScale.sidebar.activeText = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.activeText" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.activeText = v), activeScale.sidebar.activeText)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Active Border</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.activeBorder) }" @click.stop="openColorPicker('sidebar-active-border')"></button>
            <div v-if="activeColorPicker === 'sidebar-active-border'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.activeBorder)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.activeBorder, $event as string, (next) => (activeScale.sidebar.activeBorder = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.activeBorder" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.activeBorder = v), activeScale.sidebar.activeBorder)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Open BG</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.openBg) }" @click.stop="openColorPicker('sidebar-open-bg')"></button>
            <div v-if="activeColorPicker === 'sidebar-open-bg'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.openBg)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.openBg, $event as string, (next) => (activeScale.sidebar.openBg = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.openBg" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.openBg = v), activeScale.sidebar.openBg)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Open Text</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.openText) }" @click.stop="openColorPicker('sidebar-open-text')"></button>
            <div v-if="activeColorPicker === 'sidebar-open-text'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.openText)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.openText, $event as string, (next) => (activeScale.sidebar.openText = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.openText" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.openText = v), activeScale.sidebar.openText)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Active Mark</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.sidebar.activeMark) }" @click.stop="openColorPicker('sidebar-active-mark')"></button>
            <div v-if="activeColorPicker === 'sidebar-active-mark'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.sidebar.activeMark)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.sidebar.activeMark, $event as string, (next) => (activeScale.sidebar.activeMark = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.sidebar.activeMark" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.sidebar.activeMark = v), activeScale.sidebar.activeMark)" />
          </div>
        </label>
      </div>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <div class="section-head">
        <h3 class="text-lg font-semibold">Link Colors</h3>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
        <label class="field">
          <span class="field-label">Link</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.link.color) }" @click.stop="openColorPicker('link-color')"></button>
            <div v-if="activeColorPicker === 'link-color'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.link.color)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.link.color, $event as string, (next) => (activeScale.link.color = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.link.color" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.link.color = v), activeScale.link.color)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Link Hover</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.link.hover) }" @click.stop="openColorPicker('link-hover')"></button>
            <div v-if="activeColorPicker === 'link-hover'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.link.hover)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.link.hover, $event as string, (next) => (activeScale.link.hover = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.link.hover" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.link.hover = v), activeScale.link.hover)" />
          </div>
        </label>
        <label class="field">
          <span class="field-label">Link Visited</span>
          <div class="color-controls picker-host">
            <button type="button" class="picker-trigger" :style="{ background: getPickerColor(activeScale.link.visited) }" @click.stop="openColorPicker('link-visited')"></button>
            <div v-if="activeColorPicker === 'link-visited'" class="picker-popover">
              <ColorPicker :pure-color="getPickerHexAlpha(activeScale.link.visited)" format="hex8" picker-type="chrome" :is-widget="true" :disable-history="true" :blur-close="false" @update:pureColor="setColorFromHexAlpha(activeScale.link.visited, $event as string, (next) => (activeScale.link.visited = next))" /></div>
            <input class="input input-xs input-bordered color-text-input" :value="activeScale.link.visited" type="text" @change="handleColorTextCommit($event, (v) => (activeScale.link.visited = v), activeScale.link.visited)" />
          </div>
        </label>
      </div>
    </section>

    <section class="card p-4 md:p-6 space-y-4">
      <h3 class="text-lg font-semibold">Radius</h3>
      <div class="space-y-3">
        <label class="radius-control">
          <span>Field Radius: {{ activeScale.radius.field }}</span>
          <input v-model.number="fieldRadius" type="range" min="0.25" max="1.25" step="0.01" />
        </label>
        <label class="radius-control">
          <span>Box Radius: {{ activeScale.radius.box }}</span>
          <input v-model.number="boxRadius" type="range" min="0.25" max="1.50" step="0.01" />
        </label>
      </div>
    </section>

    <Modal
      :open="showSaveConfirm"
      title="Update Preset"
      confirm-text="Update"
      cancel-text="Cancel"
      @close="showSaveConfirm = false"
      @confirm="confirmSavePreset"
    >
      <p class="text-sm">
        Update preset
        <strong>{{ selectedPreset?.name }}</strong>
        dengan konfigurasi theme saat ini?
      </p>
    </Modal>

    <Modal
      :open="showDeleteConfirm"
      title="Delete Preset"
      confirm-text="Delete"
      cancel-text="Cancel"
      @close="showDeleteConfirm = false"
      @confirm="confirmDeletePreset"
    >
      <p class="text-sm">
        Hapus preset
        <strong>{{ selectedPreset?.name }}</strong>
        ? Aksi ini tidak bisa dibatalkan.
      </p>
    </Modal>

    <Modal
      :open="showCopyModal"
      title="Preset CSS"
      size="lg"
      @close="showCopyModal = false"
      @confirm="showCopyModal = false"
    >
      <div class="space-y-3">
        <p class="text-sm">
          CSS untuk preset
          <strong>{{ selectedPreset?.name }}</strong>
          .
        </p>
        <pre class="css-preview"><code>{{ selectedPresetCss }}</code></pre>
        <p v-if="copySuccess" class="text-sm text-success">CSS copied to clipboard.</p>
      </div>
      <template #footer>
        <button class="btn btn-sm btn-outline" @click="showCopyModal = false">Close</button>
        <button class="btn btn-sm btn-primary" @click="copyPresetCss">Copy CSS</button>
      </template>
    </Modal>
  </div>
</template>

<style scoped>
.builder-toolbar {
  position: sticky;
  top: 0.75rem;
  z-index: 30;
  border: 1px solid var(--color-base-300);
  box-shadow: 0 10px 24px rgb(0 0 0 / 0.08);
}

.toolbar-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.toolbar-row-presets {
  align-items: stretch;
}

.preset-input-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  min-width: 18rem;
}

.preset-actions-wrap {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.preset-select {
  min-width: 13rem;
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.section-head-left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.mode-toggle {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.mode-label {
  font-size: 0.75rem;
  opacity: 0.75;
}

.field {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.75rem;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  padding: 0.625rem 0.75rem;
  font-size: 0.875rem;
  overflow: visible;
}

.field-label {
  width: 100%;
  font-weight: 700;
}

.color-controls {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  flex-wrap: nowrap;
  justify-content: flex-start;
  width: 100%;
  min-width: 0;
}

.color-text-input {
  flex: 1;
  width: auto;
  min-width: 0;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  text-transform: lowercase;
}

.picker-host {
  position: relative;
}

.picker-trigger {
  width: 2.25rem;
  height: 2.25rem;
  border: 1px solid var(--color-base-300);
  border-radius: 0.5rem;
  flex: 0 0 auto;
  cursor: pointer;
}

.picker-trigger:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.picker-popover {
  position: absolute;
  top: calc(100% + 0.4rem);
  left: 0;
  z-index: 120;
  width: min(18rem, calc(100vw - 2.5rem));
  padding: 0.6rem;
  border-radius: 0.6rem;
  border: 1px solid var(--color-base-300);
  background: var(--color-base-100);
  box-shadow: 0 12px 26px rgb(0 0 0 / 0.24);
}

.picker-popover :deep(.vc-color-wrap) {
  width: 100%;
}

.card {
  overflow: visible;
}

@media (min-width: 768px) {
  .picker-popover {
    left: auto;
    right: 0;
  }
}

.radius-control {
  display: grid;
  gap: 0.5rem;
  font-size: 0.875rem;
}

.radius-control input[type="range"] {
  width: 100%;
}

.css-preview {
  overflow-x: auto;
  overflow-y: visible;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: 0.5rem;
  padding: 0.75rem;
  font-size: 0.8125rem;
  line-height: 1.5;
}
</style>







