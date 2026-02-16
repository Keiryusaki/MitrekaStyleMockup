<script setup lang="ts">
import PageHeader from "@/components/PageHeader.vue";

const tokenGroups = [
  {
    title: "State Colors",
    tokens: [
      "--color-primary",
      "--color-secondary",
      "--color-accent",
      "--color-info",
      "--color-success",
      "--color-warning",
      "--color-error",
      "--color-neutral",
    ],
  },
  {
    title: "Base Colors",
    tokens: [
      "--color-base-100",
      "--color-base-200",
      "--color-base-300",
      "--color-base-content",
    ],
  },
  {
    title: "Layout Colors",
    tokens: [
      "--color-layout-topbar-bg",
      "--color-layout-topbar-text",
      "--color-layout-sidebar-bg",
      "--color-layout-sidebar-text",
    ],
  },
  {
    title: "Sidebar Decoration",
    tokens: [
      "--color-sidebar-hover-bg",
      "--color-sidebar-active-bg",
      "--color-sidebar-active-text",
      "--color-sidebar-active-border",
      "--color-sidebar-open-bg",
      "--color-sidebar-open-text",
      "--color-sidebar-active-mark",
    ],
  },
  {
    title: "Link Colors",
    tokens: ["--color-link", "--color-link-hover", "--color-link-visited"],
  },
  {
    title: "Radius",
    tokens: [
      "--radius-field-xs",
      "--radius-field-sm",
      "--radius-field-md",
      "--radius-field-lg",
      "--radius-field-xl",
      "--radius-box",
    ],
  },
];

const cssExample = `:root[data-theme="mitrekalight"] {
  /* ...tokens... */
}

:root[data-theme="mitrekadark"] {
  /* ...tokens... */
}`;
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      category="Utility"
      title="Theme Builder Docs"
      description="Panduan penggunaan Theme Builder dan implementasi tema ke aplikasi consumer."
    />

    <section class="card p-5 space-y-3">
      <h3 class="text-lg font-semibold">Scope</h3>
      <p>
        Theme Builder adalah tool internal di Design System. Aplikasi consumer tidak perlu
        mengonsumsi komponen Theme Builder, cukup menerapkan CSS token hasil generate.
      </p>
      <div class="text-sm opacity-80">
        Referensi lengkap: <code>docs/THEME_BUILDER.md</code>
      </div>
    </section>

    <section class="card p-5 space-y-3">
      <h3 class="text-lg font-semibold">Workflow</h3>
      <ol class="list-decimal pl-5 space-y-1">
        <li>Atur token Light dan Dark di halaman Theme Builder.</li>
        <li>Simpan preset (opsional) untuk iterasi internal tim DS.</li>
        <li>Gunakan aksi <b>Copy Preset</b> untuk mengambil CSS final.</li>
        <li>Pasang CSS final di stylesheet global aplikasi consumer.</li>
        <li>Uji mode Light, Dark, dan System di aplikasi consumer.</li>
      </ol>
    </section>

    <section class="card p-5 space-y-4">
      <h3 class="text-lg font-semibold">Token Output</h3>
      <div class="grid gap-3 md:grid-cols-2">
        <article v-for="group in tokenGroups" :key="group.title" class="token-group">
          <h4 class="font-semibold">{{ group.title }}</h4>
          <ul class="mt-2 space-y-1 text-sm">
            <li v-for="token in group.tokens" :key="token">
              <code>{{ token }}</code>
            </li>
          </ul>
        </article>
      </div>
    </section>

    <section class="card p-5 space-y-3">
      <h3 class="text-lg font-semibold">CSS Format</h3>
      <pre class="code-block"><code>{{ cssExample }}</code></pre>
    </section>

    <section class="card p-5 space-y-3">
      <h3 class="text-lg font-semibold">Consumer Checklist</h3>
      <ol class="list-decimal pl-5 space-y-1">
        <li>Hindari hardcode warna/radius di komponen app.</li>
        <li>Pastikan app mengubah <code>data-theme</code> ke <code>mitrekalight</code> / <code>mitrekadark</code>.</li>
        <li>Validasi UI utama: Topbar, Sidebar, Button, Input, Card, Link states.</li>
      </ol>
    </section>
  </div>
</template>

<style scoped>
.token-group {
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  padding: 0.875rem 1rem;
  background: color-mix(in srgb, var(--color-base-200) 45%, transparent);
}

.code-block {
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  padding: 0.75rem;
  background: color-mix(in srgb, var(--color-base-200) 45%, transparent);
  overflow: auto;
}
</style>
