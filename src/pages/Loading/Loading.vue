<script setup lang="ts">
import { ref } from 'vue';
import LoadingLogo from '@/components/feedback/LoadingLogo.vue';
import FloatingTOC, { type TOCItem } from '@/components/FloatingTOC.vue';
import PageHeader from "@/components/PageHeader.vue";

const tocItems: TOCItem[] = [
  { id: 'demo', label: 'Demo' },
  { id: 'with-text', label: 'With Text' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'overlay', label: 'Overlay Example' },
  { id: 'usage', label: 'Usage' },
];

const showOverlay = ref(false);

const triggerOverlay = () => {
  showOverlay.value = true;
  setTimeout(() => {
    showOverlay.value = false;
  }, 4000);
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Loading Animation" 
      description="Animasi loading dengan 6 dots yang morph menjadi logo Mitreka."
    />

    <!-- Demo -->
    <section id="demo" class="card p-6 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2 mb-6">Demo</h2>
      <div class="flex items-center justify-center p-12 bg-base-200 rounded-box">
        <LoadingLogo :size="120" />
      </div>
    </section>

    <!-- With Text -->
    <section id="with-text" class="card p-6 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2 mb-6">With Text</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-base-200 rounded-box">
        <div class="flex flex-col items-center">
          <LoadingLogo :size="80" text="Memuat" />
        </div>
        <div class="flex flex-col items-center">
          <LoadingLogo :size="80" text="Menyimpan" />
        </div>
        <div class="flex flex-col items-center">
          <LoadingLogo :size="80" text="Mohon tunggu" />
        </div>
      </div>
      <details class="rounded-box border border-base-300 p-3 mt-4">
        <summary class="cursor-pointer text-sm font-medium">Markup contoh</summary>
        <pre class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"><code>&lt;LoadingLogo :size="80" text="Memuat" /&gt;
&lt;LoadingLogo :size="80" text="Menyimpan" /&gt;
&lt;LoadingLogo :size="80" text="Mohon tunggu" /&gt;</code></pre>
      </details>
    </section>

    <!-- Sizes -->
    <section id="sizes" class="card p-6 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2 mb-6">Sizes</h2>
      <div class="flex items-end justify-center gap-12 p-8 bg-base-200 rounded-box">
        <div class="text-center">
          <LoadingLogo :size="40" />
          <p class="text-xs mt-4 opacity-60">40px</p>
        </div>
        <div class="text-center">
          <LoadingLogo :size="60" />
          <p class="text-xs mt-4 opacity-60">60px</p>
        </div>
        <div class="text-center">
          <LoadingLogo :size="80" />
          <p class="text-xs mt-4 opacity-60">80px (default)</p>
        </div>
        <div class="text-center">
          <LoadingLogo :size="120" />
          <p class="text-xs mt-4 opacity-60">120px</p>
        </div>
      </div>
    </section>

    <!-- Overlay Example -->
    <section id="overlay" class="card p-6 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2 mb-6">Overlay Example</h2>
      <p class="text-sm opacity-80 mb-4">
        Contoh penggunaan sebagai loading overlay full page.
      </p>
      <button class="btn btn-primary" @click="triggerOverlay">
        Show Loading Overlay (4s)
      </button>
    </section>

    <!-- Usage -->
    <section id="usage" class="card p-6 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2 mb-6">Usage</h2>
      <div class="code-block">
        <pre><code>&lt;script setup&gt;
import LoadingLogo from '@/components/feedback/LoadingLogo.vue';
&lt;/script&gt;

&lt;template&gt;
  &lt;!-- Basic --&gt;
  &lt;LoadingLogo /&gt;

  &lt;!-- Custom size --&gt;
  &lt;LoadingLogo :size="120" /&gt;

  &lt;!-- With text --&gt;
  &lt;LoadingLogo :size="80" text="Memuat" /&gt;

  &lt;!-- Full page overlay --&gt;
  &lt;div v-if="loading" class="loading-overlay"&gt;
    &lt;LoadingLogo :size="100" text="Mohon tunggu" /&gt;
  &lt;/div&gt;
&lt;/template&gt;</code></pre>
      </div>

      <h3 class="font-semibold mt-6 mb-3">Props</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Prop</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Default</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">size</code></td>
              <td class="px-4 py-2">number</td>
              <td class="px-4 py-2">80</td>
              <td class="px-4 py-2">Width in pixels (height auto-calculated)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">text</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">''</td>
              <td class="px-4 py-2">Loading text with animated dots</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Loading Overlay -->
    <Teleport to="body">
      <Transition name="fade">
        <div v-if="showOverlay" class="loading-overlay">
          <LoadingLogo :size="100" />
        </div>
      </Transition>
    </Teleport>

    <FloatingTOC :items="tocItems" />
  </div>
</template>

<style scoped>
.code-block {
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
.code-inline {
  background: var(--color-base-200);
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875em;
  font-family: ui-monospace, monospace;
}

.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(4px);
}

[data-theme="mitrekadark"] .loading-overlay {
  background: rgba(0, 0, 0, 0.85);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
