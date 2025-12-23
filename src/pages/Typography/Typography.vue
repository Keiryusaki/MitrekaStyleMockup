<script setup lang="ts">
import { ref } from "vue";

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const fontSizes = [
  { name: "xs", var: "--font-size-xs", size: "13px / 0.8125rem", class: "text-xs" },
  { name: "sm", var: "--font-size-sm", size: "14px / 0.875rem", class: "text-sm" },
  { name: "base", var: "--font-size-md", size: "15px / 0.9375rem", class: "text-base" },
  { name: "lg", var: "--font-size-lg", size: "16px / 1rem", class: "text-lg" },
  { name: "xl", var: "--font-size-xl", size: "17px / 1.0625rem", class: "text-xl" },
  { name: "2xl", var: "-", size: "24px / 1.5rem", class: "text-2xl" },
  { name: "3xl", var: "-", size: "30px / 1.875rem", class: "text-3xl" },
];

const codes = {
  headings: `<h1 class="text-3xl font-bold">Heading 1</h1>
<h2 class="text-2xl font-bold">Heading 2</h2>
<h3 class="text-xl font-semibold">Heading 3</h3>
<h4 class="text-lg font-semibold">Heading 4</h4>
<h5 class="text-base font-medium">Heading 5</h5>
<h6 class="text-sm font-medium">Heading 6</h6>`,
  bodyText: `<!-- Paragraph -->
<p class="text-base">Regular body text for content.</p>

<!-- Small text -->
<p class="text-sm">Smaller text for descriptions.</p>

<!-- Extra small -->
<p class="text-xs">Extra small for labels, captions.</p>

<!-- Lead paragraph -->
<p class="text-lg opacity-80">Lead paragraph with larger size.</p>`,
  fontWeight: `<span class="font-light">Light (300)</span>
<span class="font-normal">Normal (400)</span>
<span class="font-medium">Medium (500)</span>
<span class="font-semibold">Semibold (600)</span>
<span class="font-bold">Bold (700)</span>`,
  textColors: `<!-- Base content (default) -->
<p class="text-base-content">Default text color</p>

<!-- Muted/Secondary -->
<p class="text-base-content opacity-60">Muted text</p>
<p class="text-base-content opacity-40">Very muted</p>

<!-- State colors -->
<p class="text-primary">Primary color text</p>
<p class="text-success">Success color text</p>
<p class="text-error">Error color text</p>
<p class="text-warning">Warning color text</p>`,
  utilities: `<!-- Alignment -->
<p class="text-left">Left aligned</p>
<p class="text-center">Center aligned</p>
<p class="text-right">Right aligned</p>

<!-- Truncate -->
<p class="truncate">This text will be truncated with ellipsis...</p>

<!-- Line clamp -->
<p class="line-clamp-2">Multi-line text clamped to 2 lines...</p>

<!-- Uppercase / Lowercase -->
<p class="uppercase">uppercase text</p>
<p class="lowercase">LOWERCASE TEXT</p>
<p class="capitalize">capitalize each word</p>`,
  fontFamily: `/* Font family dari CSS variable */
:root {
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, 
    Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, 
    Helvetica Neue, Arial, sans-serif;
}

/* Usage */
body {
  font-family: var(--font-sans);
}`,
};
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <header>
      <h1 class="text-2xl font-bold">Typography</h1>
      <p class="text-sm opacity-80">
        Font sizes, weights, dan text utilities untuk design system.
      </p>
    </header>

    <!-- Font Family -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Font Family</h2>
      <p class="text-sm opacity-80">
        Default font adalah <strong>Inter</strong> dengan fallback ke system fonts.
      </p>

      <div class="p-4 bg-base-200 rounded-box">
        <p class="text-2xl">The quick brown fox jumps over the lazy dog.</p>
        <p class="text-sm opacity-60 mt-2">Inter, system-ui, sans-serif</p>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.fontFamily, 'fontFamily')">
          {{ copiedId === 'fontFamily' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.fontFamily }}</code></pre>
      </div>
    </section>

    <!-- Font Sizes -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Font Sizes</h2>
      <p class="text-sm opacity-80">
        Scale font size yang digunakan dalam design system.
      </p>

      <div class="space-y-4">
        <div v-for="fs in fontSizes" :key="fs.name" class="flex items-baseline gap-4 py-2 border-b border-base-200">
          <code class="code-inline w-20">{{ fs.class }}</code>
          <span :class="fs.class" class="flex-1">The quick brown fox</span>
          <span class="text-xs opacity-60 w-32 text-right">{{ fs.size }}</span>
        </div>
      </div>
    </section>

    <!-- Headings -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Headings</h2>
      <p class="text-sm opacity-80">
        Heading styles dengan kombinasi size dan font-weight.
      </p>

      <div class="space-y-3 p-4 bg-base-200 rounded-box">
        <h1 class="text-3xl font-bold">Heading 1 - text-3xl font-bold</h1>
        <h2 class="text-2xl font-bold">Heading 2 - text-2xl font-bold</h2>
        <h3 class="text-xl font-semibold">Heading 3 - text-xl font-semibold</h3>
        <h4 class="text-lg font-semibold">Heading 4 - text-lg font-semibold</h4>
        <h5 class="text-base font-medium">Heading 5 - text-base font-medium</h5>
        <h6 class="text-sm font-medium">Heading 6 - text-sm font-medium</h6>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.headings, 'headings')">
          {{ copiedId === 'headings' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.headings }}</code></pre>
      </div>
    </section>

    <!-- Font Weights -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Font Weights</h2>

      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="p-3 bg-base-200 rounded-box text-center">
          <p class="font-light text-lg">Aa</p>
          <p class="text-xs opacity-60">font-light</p>
          <p class="text-xs opacity-40">300</p>
        </div>
        <div class="p-3 bg-base-200 rounded-box text-center">
          <p class="font-normal text-lg">Aa</p>
          <p class="text-xs opacity-60">font-normal</p>
          <p class="text-xs opacity-40">400</p>
        </div>
        <div class="p-3 bg-base-200 rounded-box text-center">
          <p class="font-medium text-lg">Aa</p>
          <p class="text-xs opacity-60">font-medium</p>
          <p class="text-xs opacity-40">500</p>
        </div>
        <div class="p-3 bg-base-200 rounded-box text-center">
          <p class="font-semibold text-lg">Aa</p>
          <p class="text-xs opacity-60">font-semibold</p>
          <p class="text-xs opacity-40">600</p>
        </div>
        <div class="p-3 bg-base-200 rounded-box text-center">
          <p class="font-bold text-lg">Aa</p>
          <p class="text-xs opacity-60">font-bold</p>
          <p class="text-xs opacity-40">700</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.fontWeight, 'fontWeight')">
          {{ copiedId === 'fontWeight' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.fontWeight }}</code></pre>
      </div>
    </section>

    <!-- Body Text -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Body Text</h2>

      <div class="space-y-3 p-4 bg-base-200 rounded-box">
        <p class="text-lg opacity-80">Lead paragraph - text-lg opacity-80</p>
        <p class="text-base">Regular body text - text-base</p>
        <p class="text-sm">Smaller text for descriptions - text-sm</p>
        <p class="text-xs">Extra small for labels - text-xs</p>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.bodyText, 'bodyText')">
          {{ copiedId === 'bodyText' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.bodyText }}</code></pre>
      </div>
    </section>

    <!-- Text Colors -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Text Colors</h2>

      <div class="space-y-2 p-4 bg-base-200 rounded-box">
        <p class="text-base-content">Default text (text-base-content)</p>
        <p class="text-base-content opacity-60">Muted text (opacity-60)</p>
        <p class="text-base-content opacity-40">Very muted (opacity-40)</p>
        <div class="border-t border-base-300 pt-2 mt-2 space-y-1">
          <p class="text-primary">Primary text</p>
          <p class="text-success">Success text</p>
          <p class="text-warning">Warning text</p>
          <p class="text-error">Error text</p>
          <p class="text-info">Info text</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.textColors, 'textColors')">
          {{ copiedId === 'textColors' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.textColors }}</code></pre>
      </div>
    </section>

    <!-- Text Utilities -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Text Utilities</h2>

      <div class="grid md:grid-cols-2 gap-4">
        <div class="p-4 bg-base-200 rounded-box space-y-2">
          <h4 class="font-medium text-sm">Alignment</h4>
          <p class="text-left border-b border-base-300 pb-1">Left aligned</p>
          <p class="text-center border-b border-base-300 pb-1">Center aligned</p>
          <p class="text-right">Right aligned</p>
        </div>
        <div class="p-4 bg-base-200 rounded-box space-y-2">
          <h4 class="font-medium text-sm">Transform</h4>
          <p class="uppercase">uppercase text</p>
          <p class="lowercase">LOWERCASE TEXT</p>
          <p class="capitalize">capitalize each word</p>
        </div>
      </div>

      <div class="p-4 bg-base-200 rounded-box">
        <h4 class="font-medium text-sm mb-2">Truncate</h4>
        <p class="truncate">This is a very long text that will be truncated with an ellipsis when it overflows the container width.</p>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.utilities, 'utilities')">
          {{ copiedId === 'utilities' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.utilities }}</code></pre>
      </div>
    </section>

    <!-- Quick Reference -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Quick Reference</h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Use Case</th>
              <th class="px-4 py-2 text-left">Classes</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2">Page title</td>
              <td class="px-4 py-2"><code class="code-inline">text-2xl font-bold</code></td>
            </tr>
            <tr>
              <td class="px-4 py-2">Section heading</td>
              <td class="px-4 py-2"><code class="code-inline">text-lg font-semibold</code></td>
            </tr>
            <tr>
              <td class="px-4 py-2">Body text</td>
              <td class="px-4 py-2"><code class="code-inline">text-base</code> atau <code class="code-inline">text-sm</code></td>
            </tr>
            <tr>
              <td class="px-4 py-2">Muted/secondary</td>
              <td class="px-4 py-2"><code class="code-inline">text-sm opacity-80</code></td>
            </tr>
            <tr>
              <td class="px-4 py-2">Label/caption</td>
              <td class="px-4 py-2"><code class="code-inline">text-xs font-medium</code></td>
            </tr>
            <tr>
              <td class="px-4 py-2">Code inline</td>
              <td class="px-4 py-2"><code class="code-inline">code-inline</code> (custom class)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
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
