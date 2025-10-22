<script setup lang="ts">
import { ref, computed } from "vue";

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

const size = ref<Size>("md");
const tone = ref<Tone>("default");
const disabled = ref(false);
const readonly = ref(false);

const sizeClass = computed(() =>
  size.value === "md" ? "input-md" : `input-${size.value}`
);
const toneClass = computed(() =>
  tone.value === "default" ? "" : `input-${tone.value}`
);

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
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header>
      <h1 class="text-xl font-semibold">Component Variants · Input</h1>
      <p class="text-sm opacity-80">
        Base, 7 state warna, 5 ukuran. Border & focus ring mengikuti token
        warna.
      </p>
    </header>

    <div class="card p-4 md:p-6 space-y-5">
      <!-- Controls -->
      <section class="rounded-box border border-base-300 p-4">
        <div class="flex flex-wrap items-center gap-4">
          <!-- Tone -->
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">State</span>
            <div class="inline-flex overflow-hidden rounded-lg">
              <button
                v-for="t in tones"
                :key="t.tone"
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': tone === t.tone }"
                @click="tone = t.tone"
              >
                {{ t.label }}
              </button>
            </div>
          </div>

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
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" v-model="readonly" />
            <span class="text-sm">Read-only</span>
          </label>
        </div>
      </section>

      <!-- Playground -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h2 class="text-base font-semibold">Playground</h2>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <!-- base -->
          <label class="space-y-1">
            <span class="text-xs opacity-70">Label</span>
            <input
              :class="['input', sizeClass, toneClass]"
              :disabled="disabled"
              :readonly="readonly"
              placeholder="Type something…"
            />
            <span
              class="form-hint"
              :class="tone === 'default' ? '' : `form-hint-${tone}`"
            >
              Helper text goes here
            </span>
          </label>

          <!-- with leading icon -->
          <label class="space-y-1">
            <span class="text-xs opacity-70">With leading icon</span>
            <div class="relative">
              <svg
                class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path
                  d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
                />
              </svg>
              <input
                :class="['input pl-9', sizeClass, toneClass]"
                :disabled="disabled"
                :readonly="readonly"
                placeholder="Search…"
              />
            </div>
          </label>

          <!-- with trailing icon -->
          <label class="space-y-1">
            <span class="text-xs opacity-70">With trailing icon</span>
            <div class="relative">
              <input
                :class="['input pr-10', sizeClass, toneClass]"
                :disabled="disabled"
                :readonly="readonly"
                placeholder="Email"
              />
              <svg
                class="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 opacity-70"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 13.065 0 6V4l12 7 12-7v2z" />
              </svg>
            </div>
          </label>
        </div>
      </section>

      <!-- Reference: Sizes -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Sizes
        </h3>
        <div class="flex flex-wrap items-end gap-3">
          <input class="input input-xs" placeholder="input-xs" />
          <input class="input input-sm" placeholder="input-sm" />
          <input class="input" placeholder="input-md (default)" />
          <input class="input input-lg" placeholder="input-lg" />
          <input class="input input-xl" placeholder="input-xl" />
        </div>
        <p class="text-xs opacity-70">
          Ukuran mengikuti token tinggi & radius: <code>--size-field-*</code>,
          <code>--radius-field-*</code>. :contentReference[oaicite:2]{index=2}
        </p>
      </section>

      <!-- Reference: States -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          States
        </h3>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <input class="input" placeholder="Default" />
          <input class="input input-primary" placeholder="Primary" />
          <input class="input input-secondary" placeholder="Secondary" />
          <input class="input input-accent" placeholder="Accent" />
          <input class="input input-info" placeholder="Info" />
          <input class="input input-success" placeholder="Success" />
          <input class="input input-warning" placeholder="Warning" />
          <input class="input input-error" placeholder="Error" />
        </div>
        <p class="text-xs opacity-70">
          Warna state mengubah <em>border</em> & <em>focus ring</em> (mis.
          <code>.input-primary:focus</code> pakai ring campuran ke white 78%).
          :contentReference[oaicite:3]{index=3}
          :contentReference[oaicite:4]{index=4}
        </p>
      </section>

      <!-- Notes -->
      <section class="rounded-box border border-base-300 p-4 text-sm">
        <ul class="list-disc space-y-1 pl-5">
          <li>
            <strong>Base:</strong> <code>.input</code> mengatur tinggi, radius,
            padding, warna, hover, dan focus ring default.
            :contentReference[oaicite:5]{index=5}
          </li>
          <li>
            <strong>Ukuran:</strong>
            <code>.input-{xs|sm|md|lg|xl}</code> (default md).
            :contentReference[oaicite:6]{index=6}
          </li>
          <li>
            <strong>State:</strong>
            <code
              >.input-{primary|secondary|accent|info|success|warning|error}</code
            >
            + ring khusus saat focus. :contentReference[oaicite:7]{index=7}
          </li>
          <li>
            <strong>Helper:</strong> gunakan <code>.form-hint</code> +
            <code>.form-hint-{tone}</code> untuk teks bantuan di bawah field.
            :contentReference[oaicite:8]{index=8}
          </li>
          <li>
            <strong>Disabled/Read-only:</strong> atur via atribut
            <code>disabled</code>/<code>readonly</code> (CSS sudah handle
            tampilan). :contentReference[oaicite:9]{index=9}
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>
