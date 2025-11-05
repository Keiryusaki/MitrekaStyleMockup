<!-- src/pages/Changelog.vue -->
<script setup lang="ts">
// URL untuk download langsung (Vite handle dev & build)
import tailwindCssUrl from "@/assets/tailwind.css?url";
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header>
      <h1 class="text-xl font-semibold">
        Developer Guide · Style implementation
      </h1>
      <p class="text-sm opacity-80">custom tailwind.css</p>
    </header>

    <div class="card p-4 md:p-6 space-y-5">
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
