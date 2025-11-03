<!-- src/pages/Changelog.vue -->
<script setup lang="ts">
// URL untuk download langsung (Vite handle dev & build)
import tailwindCssUrl from "@/assets/tailwind.css?url";
</script>

<template>
  <div class="card p-4 md:p-6 space-y-5">
    <!-- Header -->
    <header
      class="sticky top-0 z-10 backdrop-blur bg-base-100/80 border-b border-base-300 rounded-md"
    >
      <div
        class="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between gap-3"
      >
        <h1 class="text-xl font-semibold tracking-tight">Changelog</h1>
      </div>
    </header>

    <!-- ====== Dev Guide Collapsible (style seperti contoh kamu) ====== -->
    <details class="rounded-box border border-base-300 p-3">
      <summary class="cursor-pointer text-sm font-medium">
        Changelog
        <span
          class="inline-flex items-center justify-center rounded-selector border border-base-300 px-2 py-1 text-xs"
        >
          v1.0
        </span>
        - <time class="text-xs opacity-70"> 03 Nov 2025 </time>
      </summary>

      <div class="mt-3 rounded-xl border border-base-300 p-4 bg-base-200">
        <h3 class="text-lg font-semibold mb-2">
          Changelog – Dev Guide (Standard)
        </h3>

        <!-- Downloads box -->
        <div class="mb-4 p-3 bg-base-300 rounded-lg">
          <p class="text-sm font-medium mb-2">Downloads</p>
          <ul class="text-sm list-disc ml-5 space-y-1">
            <li>
              <a
                class="btn btn-accent btn-xs"
                :href="tailwindCssUrl"
                rel="noopener"
                download="tailwind.css"
                >tailwind.css</a
              >
              → simpan ke <code>src/assets/tailwind.css</code>
            </li>
          </ul>
          <p class="text-xs opacity-70 mt-2">
            Catatan: di produk, tautkan ke file di repositori project kalian.
          </p>
        </div>

        <ol class="space-y-6 list-decimal ml-5">
          <li>
            <h4 class="font-semibold">Struktur Halaman</h4>
            <pre v-pre class="code"><code>src/
pages/
Changelog.vue   ← halaman ini
assets/
tailwind.css    ← file yang bisa diunduh</code></pre>
          </li>

          <li>
            <h4 class="font-semibold">Tailwind Config (tailwind.config.js)</h4>
            <pre
              v-pre
              class="code"
            ><code>/** @type {import('tailwindcss').Config} */
export default {
darkMode: ["class", '[data-theme="mitrekadark"]'],
content: ["./index.html", "./src/**/*.{vue,js,ts}"],
theme: {
extend: {
    colors: {
    base: {
        100: "var(--color-base-100)",
        200: "var(--color-base-200)",
        300: "var(--color-base-300)",
        content: "var(--color-base-content)",
    },
    primary: "var(--color-primary)",
    "primary-content": "var(--color-primary-content)",
    secondary: "var(--color-secondary)",
    "secondary-content": "var(--color-secondary-content)",
    accent: "var(--color-accent)",
    "accent-content": "var(--color-accent-content)",
    neutral: "var(--color-neutral)",
    "neutral-content": "var(--color-neutral-content)",
    info: "var(--color-info)",
    "info-content": "var(--color-info-content)",
    success: "var(--color-success)",
    "success-content": "var(--color-success-content)",
    warning: "var(--color-warning)",
    "warning-content": "var(--color-warning-content)",
    error: "var(--color-error)",
    "error-content": "var(--color-error-content)",
    },
    borderRadius: {
    selector: "var(--radius-selector)",
    field: "var(--radius-field)",
    box: "var(--radius-box)",
    },
    spacing: {
    selector: "var(--size-selector)",
    field: "var(--size-field)",
    },
    borderWidth: {
    DEFAULT: "var(--border)",
    },
    fontFamily: {
    sans: ["var(--font-sans)", "sans-serif"],
    },
},
},
plugins: [],
};</code></pre>
          </li>
        </ol>
      </div>
    </details>
  </div>
</template>

<style scoped>
/* styling kecil biar block code rapi; sesuaikan kalau kamu punya util .code sendiri */
.code {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-box);
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.5;
}
</style>
