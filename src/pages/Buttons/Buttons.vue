<script setup lang="ts">
import { ref, computed } from "vue";

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Kind =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error"
  | "ghost";

const size = ref<Size>("md");
const isOutline = ref(false);

const sizeClass = computed(() =>
  size.value === "md" ? "btn-md" : `btn-${size.value}`
);
const variants: { label: string; kind: Kind; cls: string }[] = [
  { label: "Default", kind: "default", cls: "btn" },
  { label: "Primary", kind: "primary", cls: "btn btn-primary" },
  { label: "Secondary", kind: "secondary", cls: "btn btn-secondary" },
  { label: "Accent", kind: "accent", cls: "btn btn-accent" },
  { label: "Info", kind: "info", cls: "btn btn-info" },
  { label: "Success", kind: "success", cls: "btn btn-success" },
  { label: "Warning", kind: "warning", cls: "btn btn-warning" },
  { label: "Error", kind: "error", cls: "btn btn-error" },
  { label: "Ghost", kind: "ghost", cls: "btn btn-ghost" },
];

const outlineClass = (k: Kind) => {
  if (k === "default") return "btn btn-outline";
  if (k === "ghost") return "btn btn-ghost"; // ghost = spesial, bukan outline warna
  return `btn btn-outline btn-outline-${k}`;
};
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="flex items-center justify-between">
      <div>
        <h1 class="text-xl font-semibold">Component Variants · Button</h1>
        <p class="text-sm opacity-80">
          Solid & Outline, 9 warna, 5 ukuran. Class disediakan via theme css.
        </p>
      </div>
    </header>

    <div class="card p-4 md:p-6 space-y-5">
      <!-- Controls -->
      <section class="rounded-box border border-base-300 p-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Size</span>
            <div class="join">
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'xs' }"
                @click="size = 'xs'"
              >
                xs
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'sm' }"
                @click="size = 'sm'"
              >
                sm
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'md' }"
                @click="size = 'md'"
              >
                md
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'lg' }"
                @click="size = 'lg'"
              >
                lg
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'xl' }"
                @click="size = 'xl'"
              >
                xl
              </button>
            </div>
          </div>

          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" v-model="isOutline" />
            <span class="text-sm">Outline</span>
          </label>
        </div>
      </section>

      <!-- Playground grid -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h2 class="text-base font-semibold">Playground</h2>
        <div
          class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          <button
            v-for="v in variants"
            :key="v.kind + String(isOutline)"
            :class="[isOutline ? outlineClass(v.kind) : v.cls, sizeClass]"
          >
            {{ isOutline ? v.label + " · Outline" : v.label }}
          </button>
        </div>
      </section>

      <!-- Solid reference -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Solid
        </h3>
        <div class="flex flex-wrap gap-3">
          <button class="btn" :class="sizeClass">Button</button>
          <button class="btn btn-primary" :class="sizeClass">Primary</button>
          <button class="btn btn-secondary" :class="sizeClass">
            Secondary
          </button>
          <button class="btn btn-accent" :class="sizeClass">Accent</button>
          <button class="btn btn-info" :class="sizeClass">Info</button>
          <button class="btn btn-success" :class="sizeClass">Success</button>
          <button class="btn btn-warning" :class="sizeClass">Warning</button>
          <button class="btn btn-error" :class="sizeClass">Error</button>
          <button class="btn btn-ghost" :class="sizeClass">Ghost</button>
        </div>
        <details class="rounded-box border border-base-300 p-3">
          <summary class="cursor-pointer text-sm font-medium">
            Markup contoh
          </summary>
          <pre
            class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"
          ><code>&lt;button class="btn"&gt;Button&lt;/button&gt;
    &lt;button class="btn btn-primary"&gt;Primary&lt;/button&gt;
    &lt;button class="btn btn-secondary"&gt;Secondary&lt;/button&gt;
    &lt;button class="btn btn-accent"&gt;Accent&lt;/button&gt;
    &lt;button class="btn btn-info"&gt;Info&lt;/button&gt;
    &lt;button class="btn btn-success"&gt;Success&lt;/button&gt;
    &lt;button class="btn btn-warning"&gt;Warning&lt;/button&gt;
    &lt;button class="btn btn-error"&gt;Error&lt;/button&gt;
    &lt;button class="btn btn-ghost"&gt;Ghost&lt;/button&gt;</code></pre>
        </details>
      </section>

      <!-- Outline reference -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Outline
        </h3>
        <div class="flex flex-wrap gap-3">
          <button class="btn btn-outline" :class="sizeClass">Outline</button>
          <button
            class="btn btn-outline btn-outline-primary"
            :class="sizeClass"
          >
            Primary
          </button>
          <button
            class="btn btn-outline btn-outline-secondary"
            :class="sizeClass"
          >
            Secondary
          </button>
          <button class="btn btn-outline btn-outline-accent" :class="sizeClass">
            Accent
          </button>
          <button class="btn btn-outline btn-outline-info" :class="sizeClass">
            Info
          </button>
          <button
            class="btn btn-outline btn-outline-success"
            :class="sizeClass"
          >
            Success
          </button>
          <button
            class="btn btn-outline btn-outline-warning"
            :class="sizeClass"
          >
            Warning
          </button>
          <button class="btn btn-outline btn-outline-error" :class="sizeClass">
            Error
          </button>
        </div>
        <details class="rounded-box border border-base-300 p-3">
          <summary class="cursor-pointer text-sm font-medium">
            Markup contoh
          </summary>
          <pre
            class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"
          ><code>&lt;button class="btn btn-outline"&gt;Outline&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-primary"&gt;Primary&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-secondary"&gt;Secondary&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-accent"&gt;Accent&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-info"&gt;Info&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-success"&gt;Success&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-warning"&gt;Warning&lt;/button&gt;
    &lt;button class="btn btn-outline btn-outline-error"&gt;Error&lt;/button&gt;</code></pre>
        </details>
      </section>

      <!-- Size reference -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Sizes
        </h3>
        <div class="flex flex-wrap items-end gap-3">
          <button class="btn btn-primary btn-xs">btn-xs</button>
          <button class="btn btn-primary btn-sm">btn-sm</button>
          <button class="btn btn-primary">btn-md</button>
          <button class="btn btn-primary btn-lg">btn-lg</button>
          <button class="btn btn-primary btn-xl">btn-xl</button>
        </div>
        <p class="text-xs opacity-70">
          Ukuran memanfaatkan token tinggi & radius:
          <code>--size-field-*</code>, <code>--radius-field-*</code> yang sudah
          didefinisikan di theme CSS. :contentReference[oaicite:3]{index=3}
        </p>
      </section>

      <!-- Notes -->
      <section class="rounded-box border border-base-300 p-4 text-sm">
        <ul class="list-disc space-y-1 pl-5">
          <li>
            <strong>Base class:</strong> <code>btn</code> (sudah handle padding,
            radius, focus-ring, disabled). :contentReference[oaicite:4]{index=4}
          </li>
          <li>
            <strong>Solid:</strong>
            <code
              >btn-{primary|secondary|accent|info|success|warning|error}</code
            >. :contentReference[oaicite:5]{index=5}
          </li>
          <li>
            <strong>Outline:</strong> <code>btn btn-outline</code> +
            <code>btn-outline-{color}</code> untuk warna border/teks.
            :contentReference[oaicite:6]{index=6}
          </li>
          <li>
            <strong>Ghost:</strong> <code>btn btn-ghost</code> (transparan,
            hover subtle). :contentReference[oaicite:7]{index=7}
          </li>
          <li>
            <strong>Size:</strong> <code>btn-xs</code> …
            <code>btn-xl</code> (default <code>btn-md</code>).
            :contentReference[oaicite:8]{index=8}
          </li>
          <li>
            <strong>A11y:</strong> gunakan <code>aria-busy="true"</code> untuk
            loading & tambahkan teks tersembunyi.
          </li>
        </ul>
      </section>
    </div>
  </div>
</template>

<style scoped>
/* helper for the “join” segmented control (optional, feel free to remove if you already have one) */
.join {
  display: inline-flex;
  border-radius: 0.5rem;
  overflow: hidden;
}
.join .join-item {
  border-radius: 0;
}
.join .join-item:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.join .join-item:last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>
