<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Tone =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

const tab = ref<"switch" | "checkbox" | "radio">("switch");

const size = ref<Size>("md");
const disabled = ref(false);
const readonly = ref(false);
const tones: { label: string; tone: Tone }[] = [
  { label: "Default", tone: "default" },
  { label: "Primary", tone: "primary" },
  { label: "Secondary", tone: "secondary" },
  { label: "Accent", tone: "accent" },
  { label: "Info", tone: "info" },
  { label: "Success", tone: "success" },
  { label: "Warning", tone: "warning" },
  { label: "Error", tone: "error" },
];

// utilities
const sizeClass = computed(() => (size.value === "md" ? "" : `-${size.value}`));
const toneClass = (base: string, t: Tone) =>
  t === "default" ? base : `${base} ${base}-${t}`;

// checkbox indeterminate demo
const indeterminate = ref(true);
const indRef = ref<HTMLInputElement | null>(null);
onMounted(() => {
  if (indRef.value) indRef.value.indeterminate = indeterminate.value;
});
watch(indeterminate, (v) => {
  if (indRef.value) indRef.value.indeterminate = v;
});
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="space-y-1">
      <h1 class="text-xl font-semibold">
        Component Variants · Selection Controls
      </h1>
      <p class="text-sm opacity-80">
        Toggle, Checkbox, Radio — 7 warna · 5 ukuran (xs–xl). Disusun sebagai
        satu halaman.
      </p>
    </header>

    <!-- Tabs -->
    <nav
      class="card inline-flex overflow-hidden rounded-lg border border-base-300 rounded-box border border-base-300 p-4"
    >
      <button
        class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
        :class="tab === 'switch' && 'btn-primary'"
        @click="tab = 'switch'"
      >
        Toggle
      </button>
      <button
        class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
        :class="tab === 'checkbox' && 'btn-primary'"
        @click="tab = 'checkbox'"
      >
        Checkbox
      </button>
      <button
        class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
        :class="tab === 'radio' && 'btn-primary'"
        @click="tab = 'radio'"
      >
        Radio
      </button>
    </nav>

    <div class="card p-4 md:p-6 space-y-5">
      <!-- Controls -->
      <section class="rounded-box border border-base-300 p-4">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Size -->
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Size</span>
            <div class="inline-flex overflow-hidden rounded-lg">
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': size === 'xs' }"
                @click="size = 'xs'"
              >
                xs
              </button>
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': size === 'sm' }"
                @click="size = 'sm'"
              >
                sm
              </button>
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': size === 'md' }"
                @click="size = 'md'"
              >
                md
              </button>
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': size === 'lg' }"
                @click="size = 'lg'"
              >
                lg
              </button>
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': size === 'xl' }"
                @click="size = 'xl'"
              >
                xl
              </button>
            </div>
          </div>

          <!-- Flags -->
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" v-model="disabled" />
            <span class="text-sm">Disabled</span>
          </label>
          <label class="flex items-center gap-2" v-if="tab !== 'radio'">
            <input type="checkbox" class="switch" v-model="readonly" />
            <span class="text-sm">Read-only</span>
          </label>
          <label class="flex items-center gap-2" v-if="tab === 'checkbox'">
            <input type="checkbox" class="switch" v-model="indeterminate" />
            <span class="text-sm">Show indeterminate</span>
          </label>
        </div>
      </section>

      <!-- Playground -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h2 class="text-base font-semibold">Playground</h2>

        <!-- TOGGLE -->
        <div
          v-if="tab === 'switch'"
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <label
            v-for="t in tones"
            :key="'tog' + t.tone"
            class="flex items-center gap-2"
          >
            <input
              type="checkbox"
              :class="toneClass(`switch switch${sizeClass}`, t.tone)"
              :disabled="disabled"
              :readonly="readonly"
              checked
            />
            <span class="text-sm opacity-80">{{ t.label }}</span>
          </label>
        </div>

        <!-- CHECKBOX -->
        <div
          v-else-if="tab === 'checkbox'"
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <label
            v-for="(t, idx) in tones"
            :key="'chk' + t.tone"
            class="flex items-center gap-2"
          >
            <input
              ref="indRef"
              type="checkbox"
              :class="toneClass(`checkbox checkbox${sizeClass}`, t.tone)"
              :disabled="disabled || (t.tone === 'default' && readonly)"
              :readonly="readonly"
              :checked="idx % 2 === 0"
            />
            <span class="text-sm opacity-80">{{ t.label }}</span>
          </label>
        </div>

        <!-- RADIO -->
        <div
          v-else
          class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <label
            v-for="(t, idx) in tones"
            :key="'rad' + t.tone"
            class="flex items-center gap-2"
          >
            <input
              type="radio"
              name="demo-radio"
              :class="toneClass(`radio radio${sizeClass}`, t.tone)"
              :disabled="disabled"
              :checked="idx === 1"
            />
            <span class="text-sm opacity-80">{{ t.label }}</span>
          </label>
        </div>
      </section>

      <!-- Reference -->
      <section class="space-y-6 rounded-box border border-base-300 p-4">
        <!-- Toggle -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
            Toggle
          </h3>
          <div class="flex flex-wrap items-center gap-3">
            <input type="checkbox" class="switch" checked />
            <input type="checkbox" class="switch switch-primary" checked />
            <input type="checkbox" class="switch switch-secondary" checked />
            <input type="checkbox" class="switch switch-accent" checked />
            <input type="checkbox" class="switch switch-info" checked />
            <input type="checkbox" class="switch switch-success" checked />
            <input type="checkbox" class="switch switch-warning" checked />
            <input type="checkbox" class="switch switch-error" checked />
          </div>
          <div class="mt-2 flex flex-wrap items-end gap-3">
            <input type="checkbox" class="switch switch-xs" checked />
            <input type="checkbox" class="switch switch-sm" checked />
            <input type="checkbox" class="switch" checked />
            <input type="checkbox" class="switch switch-lg" checked />
            <input type="checkbox" class="switch switch-xl" checked />
          </div>
        </div>

        <!-- Checkbox -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
            Checkbox
          </h3>
          <div class="flex flex-wrap items-center gap-3">
            <input type="checkbox" class="checkbox" checked />
            <input type="checkbox" class="checkbox checkbox-primary" checked />
            <input
              type="checkbox"
              class="checkbox checkbox-secondary"
              checked
            />
            <input type="checkbox" class="checkbox checkbox-accent" checked />
            <input type="checkbox" class="checkbox checkbox-info" checked />
            <input type="checkbox" class="checkbox checkbox-success" checked />
            <input type="checkbox" class="checkbox checkbox-warning" checked />
            <input type="checkbox" class="checkbox checkbox-error" checked />
            <input
              type="checkbox"
              class="checkbox"
              ref="indRef"
              :checked="true"
            />
          </div>
          <div class="mt-2 flex flex-wrap items-end gap-3">
            <input type="checkbox" class="checkbox checkbox-xs" checked />
            <input type="checkbox" class="checkbox checkbox-sm" checked />
            <input type="checkbox" class="checkbox" checked />
            <input type="checkbox" class="checkbox checkbox-lg" checked />
            <input type="checkbox" class="checkbox checkbox-xl" checked />
          </div>
        </div>

        <!-- Radio -->
        <div>
          <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
            Radio
          </h3>
          <div class="flex flex-wrap items-center gap-3">
            <input type="radio" name="r" class="radio" checked />
            <input type="radio" name="r" class="radio radio-primary" />
            <input type="radio" name="r" class="radio radio-secondary" />
            <input type="radio" name="r" class="radio radio-accent" />
            <input type="radio" name="r" class="radio radio-info" />
            <input type="radio" name="r" class="radio radio-success" />
            <input type="radio" name="r" class="radio radio-warning" />
            <input type="radio" name="r" class="radio radio-error" />
          </div>
          <div class="mt-2 flex flex-wrap items-end gap-3">
            <input type="radio" name="r2" class="radio radio-xs" checked />
            <input type="radio" name="r2" class="radio radio-sm" />
            <input type="radio" name="r2" class="radio" />
            <input type="radio" name="r2" class="radio radio-lg" />
            <input type="radio" name="r2" class="radio radio-xl" />
          </div>
        </div>
      </section>

      <!-- Notes -->
      <section class="rounded-box border border-base-300 p-4 text-sm">
        <ul class="list-disc space-y-1 pl-5">
          <li>
            <strong>Toggle:</strong> base <code>.toggle</code> + warna
            <code>.toggle-{tone}</code> + ukuran
            <code>.toggle-{xs|sm|md|lg|xl}</code>.
          </li>
          <li>
            <strong>Checkbox:</strong> base <code>.checkbox</code> + warna
            <code>.checkbox-{tone}</code> + ukuran
            <code>.checkbox-{xs|sm|md|lg|xl}</code>. State
            <em>indeterminate</em> diatur via JS:
            <code>el.indeterminate = true</code>.
          </li>
          <li>
            <strong>Radio:</strong> base <code>.radio</code> + warna
            <code>.radio-{tone}</code> + ukuran
            <code>.radio-{xs|sm|md|lg|xl}</code>.
          </li>
          <li>
            <strong>Accessibility:</strong> selalu pasangkan dengan label yang
            bisa diklik (di contoh ini pakai
            <code>&lt;label&gt;</code> wrapper).
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
