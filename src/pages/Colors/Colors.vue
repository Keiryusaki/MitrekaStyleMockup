<script setup lang="ts">
import { onMounted, ref } from "vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const tocItems: TOCItem[] = [
  { id: 'state-colors', label: 'State Colors' },
  { id: 'base-colors', label: 'Base Colors' },
  { id: 'usage-css', label: 'CSS Variables' },
  { id: 'usage-tailwind', label: 'Tailwind Classes' },
  { id: 'soft-variants', label: 'Soft Variants' },
  { id: 'theme-definition', label: 'Theme Definition' },
];

const copiedId = ref<string | null>(null);

type BaseThemePreview = {
  base100: string;
  base200: string;
  base300: string;
  baseContent: string;
};

const lightPreview = ref<BaseThemePreview>({
  base100: "#ffffff",
  base200: "#f3f4f6",
  base300: "#e5e5e5",
  baseContent: "#1a1a1a",
});

const darkPreview = ref<BaseThemePreview>({
  base100: "#0f172a",
  base200: "#1e293b",
  base300: "#334155",
  baseContent: "#f8fafc",
});

function readThemeBasePreview(theme: "mitrekalight" | "mitrekadark"): BaseThemePreview {
  const root = document.documentElement;
  const previousTheme = root.getAttribute("data-theme");
  const hadDarkClass = root.classList.contains("dark");

  root.setAttribute("data-theme", theme);
  root.classList.toggle("dark", theme === "mitrekadark");

  const style = getComputedStyle(root);
  const preview: BaseThemePreview = {
    base100: style.getPropertyValue("--color-base-100").trim(),
    base200: style.getPropertyValue("--color-base-200").trim(),
    base300: style.getPropertyValue("--color-base-300").trim(),
    baseContent: style.getPropertyValue("--color-base-content").trim(),
  };

  if (previousTheme) {
    root.setAttribute("data-theme", previousTheme);
  } else {
    root.removeAttribute("data-theme");
  }
  root.classList.toggle("dark", hadDarkClass);

  return preview;
}

function refreshThemeBasePreviews() {
  lightPreview.value = readThemeBasePreview("mitrekalight");
  darkPreview.value = readThemeBasePreview("mitrekadark");
}

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// State colors
const stateColors = [
  { name: "primary", var: "--color-primary", desc: "Brand utama, CTA, links" },
  { name: "secondary", var: "--color-secondary", desc: "Secondary actions" },
  { name: "accent", var: "--color-accent", desc: "Highlight, decorative" },
  { name: "info", var: "--color-info", desc: "Informasi, tips" },
  { name: "success", var: "--color-success", desc: "Berhasil, valid, positive" },
  { name: "warning", var: "--color-warning", desc: "Peringatan, attention" },
  { name: "error", var: "--color-error", desc: "Error, invalid, destructive" },
  { name: "neutral", var: "--color-neutral", desc: "Netral, disabled" },
];

// Base colors
const baseColors = [
  { name: "base-100", var: "--color-base-100", desc: "Background utama" },
  { name: "base-200", var: "--color-base-200", desc: "Background secondary" },
  { name: "base-300", var: "--color-base-300", desc: "Border, divider" },
  { name: "base-content", var: "--color-base-content", desc: "Text utama" },
];

const codes = {
  cssVars: `/* Akses via CSS variable */
.my-element {
  background: var(--color-primary);
  color: var(--color-primary-content);
  border-color: var(--color-base-300);
}`,
  tailwindClasses: `<!-- Tailwind classes -->
<div class="bg-primary text-primary-content">Primary</div>
<div class="bg-success text-success-content">Success</div>
<div class="bg-error text-error-content">Error</div>
<div class="bg-warning text-warning-content">Warning</div>
<div class="bg-info text-info-content">Info</div>

<!-- Base colors -->
<div class="bg-base-100">Background</div>
<div class="bg-base-200">Card background</div>
<div class="border-base-300">Border</div>
<div class="text-base-content">Text</div>`,
  softVariants: `<!-- Soft variants (background dengan opacity) -->
<span class="badge badge-soft-primary">Primary</span>
<span class="badge badge-soft-success">Success</span>
<span class="badge badge-soft-error">Error</span>
<span class="badge badge-soft-warning">Warning</span>
<span class="badge badge-soft-info">Info</span>

<!-- Button soft -->
<button class="btn btn-soft-primary">Soft Primary</button>
<button class="btn btn-soft-error">Soft Error</button>`,
  colorMix: `/* Custom opacity dengan color-mix */
.soft-bg {
  background: color-mix(in oklch, var(--color-primary), transparent 88%);
}

.hover-bg:hover {
  background: color-mix(in oklch, var(--color-primary), white 85%);
}`,
  themeDefinition: `/* src/assets/tailwind.css */
:root[data-theme="mitrekalight"] {
  --color-primary: #025097;
  --color-primary-content: oklch(93% 0.034 272.788);

  --color-success: oklch(69% 0.17 162.48);
  --color-success-content: oklch(100% 0 0);

  --color-warning: oklch(70% 0.213 47.604);
  --color-warning-content: oklch(100% 0 0);

  --color-error: #ee3032;
  --color-error-content: oklch(100% 0 0);

  --color-info: oklch(68% 0.169 237.323);
  --color-info-content: oklch(100% 0 0);

  /* Base */
  --color-base-100: oklch(100% 0 0);
  --color-base-200: #f3f4f6;
  --color-base-300: oklch(95% 0 0);
  --color-base-content: oklch(21% 0.006 285.885);
}`,
};

onMounted(() => {
  refreshThemeBasePreviews();
});
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Foundation"
      title="Colors & Palette" 
      description="State colors dan base colors untuk design system Mitreka."
    />

    <!-- State Colors Preview -->
    <section id="state-colors" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">State Colors</h2>
      <p class="text-sm opacity-80">
        Warna semantik untuk feedback dan status. Setiap warna punya <code class="code-inline">-content</code> untuk text kontras.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="color in stateColors" :key="color.name" class="space-y-2">
          <div 
            class="h-20 rounded-box flex items-end p-2"
            :class="`bg-${color.name}`"
          >
            <span :class="`text-${color.name}-content text-xs font-medium`">
              {{ color.name }}
            </span>
          </div>
          <div class="text-xs">
            <code class="code-inline">{{ color.var }}</code>
            <p class="opacity-60 mt-1">{{ color.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Base Colors Preview -->
    <section id="base-colors" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Base Colors</h2>
      <p class="text-sm opacity-80">
        Warna dasar untuk background, border, dan text. Otomatis berubah sesuai theme.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="color in baseColors" :key="color.name" class="space-y-2">
          <div 
            class="h-20 rounded-box border border-base-300 flex items-end p-2"
            :class="`bg-${color.name}`"
          >
            <span class="text-base-content text-xs font-medium">
              {{ color.name }}
            </span>
          </div>
          <div class="text-xs">
            <code class="code-inline">{{ color.var }}</code>
            <p class="opacity-60 mt-1">{{ color.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Light vs Dark Theme -->
    <section id="usage-css" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Base Colors: Light vs Dark</h2>
      <p class="text-sm opacity-80">
        Perbandingan base colors antara light dan dark theme.
      </p>

      <div class="grid md:grid-cols-2 gap-4">
        <!-- Light Theme -->
        <div class="rounded-box overflow-hidden border border-base-300">
          <div class="px-4 py-2 bg-base-200 font-medium text-sm">Light Theme</div>
          <div class="p-4 space-y-2" :style="{ background: lightPreview.base100 }">
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded" :style="{ background: lightPreview.base100, border: `1px solid ${lightPreview.base300}` }"></div>
              <div class="text-xs" :style="{ color: lightPreview.baseContent }">
                <code>base-100</code> <span class="opacity-60">{{ lightPreview.base100 }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded" :style="{ background: lightPreview.base200 }"></div>
              <div class="text-xs" :style="{ color: lightPreview.baseContent }">
                <code>base-200</code> <span class="opacity-60">{{ lightPreview.base200 }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded" :style="{ background: lightPreview.base300 }"></div>
              <div class="text-xs" :style="{ color: lightPreview.baseContent }">
                <code>base-300</code> <span class="opacity-60">{{ lightPreview.base300 }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded flex items-center justify-center" :style="{ background: lightPreview.baseContent }">
                <span class="text-xs" :style="{ color: lightPreview.base100 }">Aa</span>
              </div>
              <div class="text-xs" :style="{ color: lightPreview.baseContent }">
                <code>base-content</code> <span class="opacity-60">{{ lightPreview.baseContent }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Dark Theme -->
        <div class="rounded-box overflow-hidden border border-base-300">
          <div class="px-4 py-2 bg-base-200 font-medium text-sm">Dark Theme</div>
          <div class="p-4 space-y-2" :style="{ background: darkPreview.base100 }">
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded" :style="{ background: darkPreview.base100, border: `1px solid ${darkPreview.base300}` }"></div>
              <div class="text-xs" :style="{ color: darkPreview.baseContent }">
                <code>base-100</code> <span class="opacity-60">{{ darkPreview.base100 }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded" :style="{ background: darkPreview.base200 }"></div>
              <div class="text-xs" :style="{ color: darkPreview.baseContent }">
                <code>base-200</code> <span class="opacity-60">{{ darkPreview.base200 }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded" :style="{ background: darkPreview.base300 }"></div>
              <div class="text-xs" :style="{ color: darkPreview.baseContent }">
                <code>base-300</code> <span class="opacity-60">{{ darkPreview.base300 }}</span>
              </div>
            </div>
            <div class="flex items-center gap-3">
              <div class="w-12 h-8 rounded flex items-center justify-center" :style="{ background: darkPreview.baseContent }">
                <span class="text-xs" :style="{ color: darkPreview.base100 }">Aa</span>
              </div>
              <div class="text-xs" :style="{ color: darkPreview.baseContent }">
                <code>base-content</code> <span class="opacity-60">{{ darkPreview.baseContent }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Soft Variants -->
    <section id="soft-variants" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Soft Variants</h2>
      <p class="text-sm opacity-80">
        Versi "soft" dengan background transparan - cocok untuk badge dan button subtle.
      </p>

      <div class="flex flex-wrap gap-2">
        <span class="badge badge-soft-primary">Primary</span>
        <span class="badge badge-soft-secondary">Secondary</span>
        <span class="badge badge-soft-accent">Accent</span>
        <span class="badge badge-soft-info">Info</span>
        <span class="badge badge-soft-success">Success</span>
        <span class="badge badge-soft-warning">Warning</span>
        <span class="badge badge-soft-error">Error</span>
      </div>

      <div class="flex flex-wrap gap-2 mt-4">
        <button class="btn btn-soft-primary btn-sm">Soft Primary</button>
        <button class="btn btn-soft-success btn-sm">Soft Success</button>
        <button class="btn btn-soft-warning btn-sm">Soft Warning</button>
        <button class="btn btn-soft-error btn-sm">Soft Error</button>
        <button class="btn btn-soft-info btn-sm">Soft Info</button>
      </div>

      <div class="code-block mt-4">
        <button class="copy-btn" @click="copyCode(codes.softVariants, 'softVariants')">
          {{ copiedId === 'softVariants' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.softVariants }}</code></pre>
      </div>
    </section>

    <!-- Usage with CSS Variables -->
    <section id="usage-tailwind" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Usage: CSS Variables</h2>
      <p class="text-sm opacity-80">
        Akses warna via CSS variables untuk custom styling.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssVars, 'cssVars')">
          {{ copiedId === 'cssVars' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssVars }}</code></pre>
      </div>
    </section>

    <!-- Usage with Tailwind -->
    <section class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Usage: Tailwind Classes</h2>
      <p class="text-sm opacity-80">
        Gunakan utility classes Tailwind untuk apply warna.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.tailwindClasses, 'tailwindClasses')">
          {{ copiedId === 'tailwindClasses' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.tailwindClasses }}</code></pre>
      </div>
    </section>

    <!-- Color Mix -->
    <section class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Custom Opacity dengan color-mix</h2>
      <p class="text-sm opacity-80">
        Gunakan <code class="code-inline">color-mix()</code> untuk custom opacity tanpa class baru.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.colorMix, 'colorMix')">
          {{ copiedId === 'colorMix' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.colorMix }}</code></pre>
      </div>
    </section>

    <!-- Theme Definition -->
    <section id="theme-definition" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Theme Definition</h2>
      <p class="text-sm opacity-80">
        Definisi warna di <code class="code-inline">tailwind.css</code> menggunakan CSS variables.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.themeDefinition, 'themeDefinition')">
          {{ copiedId === 'themeDefinition' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.themeDefinition }}</code></pre>
      </div>
    </section>

    <!-- Color Reference Table -->
    <section class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Quick Reference</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Color</th>
              <th class="px-4 py-2 text-left">Background</th>
              <th class="px-4 py-2 text-left">Text</th>
              <th class="px-4 py-2 text-left">Border</th>
              <th class="px-4 py-2 text-left">Soft BG</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr v-for="color in stateColors" :key="color.name">
              <td class="px-4 py-2 font-medium">{{ color.name }}</td>
              <td class="px-4 py-2"><code class="code-inline">bg-{{ color.name }}</code></td>
              <td class="px-4 py-2"><code class="code-inline">text-{{ color.name }}</code></td>
              <td class="px-4 py-2"><code class="code-inline">border-{{ color.name }}</code></td>
              <td class="px-4 py-2"><code class="code-inline">badge-soft-{{ color.name }}</code></td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  border-radius: var(--radius-box);
  overflow: hidden;
}
.code-block pre {
  padding: 1rem;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.5;
  margin: 0;
}
.code-block code {
  font-family: ui-monospace, monospace;
}
.copy-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  padding: 0.25rem 0.75rem;
  font-size: 12px;
  background: var(--color-base-300);
  border: none;
  border-radius: var(--radius-field-sm);
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.15s, background 0.15s;
}
.copy-btn:hover {
  opacity: 1;
  background: var(--color-primary);
  color: var(--color-primary-content);
}
.code-inline {
  background: var(--color-base-200);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, monospace;
}
</style>
