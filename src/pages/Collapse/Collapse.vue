<script setup lang="ts">
import { ref } from "vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";

const tocItems: TOCItem[] = [
  { id: 'basic-css', label: 'Basic Collapse (CSS)' },
  { id: 'variants', label: 'Variants' },
  { id: 'vue-component', label: 'Vue Component' },
  { id: 'controlled', label: 'Controlled (v-model)' },
  { id: 'props', label: 'Props Reference' },
  { id: 'css-classes', label: 'CSS Classes' },
  { id: 'events', label: 'Events' },
  { id: 'styling', label: 'Styling Guide' },
];

const copiedId = ref<string | null>(null);
const isOpen1 = ref(true);
const isOpen2 = ref(false);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  cssBasic: `<!-- Basic Collapse dengan CSS -->
<div class="collapse is-open">
  <div class="collapse-header">
    <div class="collapse-title">Collapse Title</div>
    <svg class="collapse-icon" viewBox="0 0 20 20" fill="currentColor">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="collapse-content">
    <div class="collapse-content-inner">
      <div class="collapse-body">
        Collapse content goes here...
      </div>
    </div>
  </div>
</div>`,
  cssVariants: `<!-- Default -->
<div class="collapse">...</div>

<!-- Borderless -->
<div class="collapse collapse-borderless">...</div>

<!-- Ghost (transparent background) -->
<div class="collapse collapse-ghost">...</div>`,
  componentImport: `import { Collapse } from "@keiryusaki/mitreka-ui/vue";`,
  componentBasic: `<Collapse default-open>
  <template #title>Collapse Title</template>
  Content yang bisa di-collapse...
</Collapse>`,
  componentVModel: `<script setup>
import { ref } from 'vue';
const isOpen = ref(false);
<\/script>

<template>
  <Collapse v-model="isOpen">
    <template #title>Controlled Collapse<\/template>
    Content with v-model binding...
  <\/Collapse>
  
  <button @click="isOpen = !isOpen">
    Toggle from outside
  <\/button>
<\/template>`,
  componentVariants: `<!-- Default variant -->
<Collapse variant="default">...</Collapse>

<!-- Borderless variant -->
<Collapse variant="borderless">...</Collapse>

<!-- Ghost variant -->
<Collapse variant="ghost">...</Collapse>`,
  jsToggle: `// Toggle collapse dengan JavaScript
const collapse = document.querySelector('.collapse');
collapse.classList.toggle('is-open');`,
};
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <header>
      <h1 class="text-2xl font-bold">Collapse</h1>
      <p class="text-sm opacity-80">
        Komponen untuk menyembunyikan/menampilkan konten dengan animasi expand/collapse.
      </p>
    </header>

    <!-- Basic CSS Collapse -->
    <section id="basic-css" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Basic Collapse (CSS)
      </h2>
      <p class="text-sm opacity-80">
        Gunakan class <code class="code-inline">.collapse</code> dengan 
        <code class="code-inline">.is-open</code> untuk mengontrol state.
      </p>

      <div class="max-w-md space-y-3">
        <!-- Open by default -->
        <div class="collapse is-open">
          <div class="collapse-header" onclick="this.parentElement.classList.toggle('is-open')">
            <div class="collapse-title font-medium">Click to Collapse</div>
            <svg class="collapse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="collapse-content">
            <div class="collapse-content-inner">
              <div class="collapse-body">
                <p class="text-sm opacity-80">
                  Ini adalah konten yang bisa di-collapse. Klik header untuk toggle.
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Closed by default -->
        <div class="collapse">
          <div class="collapse-header" onclick="this.parentElement.classList.toggle('is-open')">
            <div class="collapse-title font-medium">Click to Expand</div>
            <svg class="collapse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="collapse-content">
            <div class="collapse-content-inner">
              <div class="collapse-body">
                <p class="text-sm opacity-80">
                  Konten ini awalnya tersembunyi. Klik header untuk membukanya.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssBasic, 'cssBasic')">
          {{ copiedId === 'cssBasic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssBasic }}</code></pre>
      </div>
    </section>

    <!-- CSS Variants -->
    <section id="variants" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Variants (CSS)
      </h2>

      <div class="max-w-md space-y-4">
        <!-- Default -->
        <div>
          <span class="text-xs font-medium opacity-60 mb-2 block">Default</span>
          <div class="collapse is-open">
            <div class="collapse-header" onclick="this.parentElement.classList.toggle('is-open')">
              <div class="collapse-title font-medium">Default Variant</div>
              <svg class="collapse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="collapse-content">
              <div class="collapse-content-inner">
                <div class="collapse-body">
                  <p class="text-sm opacity-80">Default with border.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Borderless -->
        <div>
          <span class="text-xs font-medium opacity-60 mb-2 block">Borderless</span>
          <div class="collapse collapse-borderless is-open">
            <div class="collapse-header" onclick="this.parentElement.classList.toggle('is-open')">
              <div class="collapse-title font-medium">Borderless Variant</div>
              <svg class="collapse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="collapse-content">
              <div class="collapse-content-inner">
                <div class="collapse-body">
                  <p class="text-sm opacity-80">No border, clean look.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ghost -->
        <div>
          <span class="text-xs font-medium opacity-60 mb-2 block">Ghost</span>
          <div class="collapse collapse-ghost is-open">
            <div class="collapse-header" onclick="this.parentElement.classList.toggle('is-open')">
              <div class="collapse-title font-medium">Ghost Variant</div>
              <svg class="collapse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="collapse-content">
              <div class="collapse-content-inner">
                <div class="collapse-body">
                  <p class="text-sm opacity-80">Transparent background.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssVariants, 'cssVariants')">
          {{ copiedId === 'cssVariants' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssVariants }}</code></pre>
      </div>
    </section>

    <!-- Vue Component -->
    <section id="vue-component" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Vue Component
      </h2>
      <p class="text-sm opacity-80">
        Gunakan Vue component untuk reactive state management. 
        <span class="text-warning font-medium">Pastikan sudah update package ke versi terbaru.</span>
      </p>

      <div class="p-4 bg-info/10 border border-info/30 rounded-lg">
        <p class="text-sm">
          <strong>Note:</strong> Contoh di bawah menggunakan CSS-based collapse. 
          Untuk Vue component dengan v-model support, import dari <code class="code-inline">@keiryusaki/mitreka-ui/vue</code>.
        </p>
      </div>

      <div class="max-w-md space-y-3">
        <div :class="['collapse', { 'is-open': isOpen1 }]">
          <div class="collapse-header" @click="isOpen1 = !isOpen1">
            <div class="collapse-title font-medium">Vue Collapse (Open)</div>
            <svg :class="['collapse-icon', { 'is-open': isOpen1 }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="collapse-content">
            <div class="collapse-content-inner">
              <div class="collapse-body">
                <p class="text-sm opacity-80">
                  Ini menggunakan Vue reactive state dengan v-model binding.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div :class="['collapse', { 'is-open': isOpen2 }]">
          <div class="collapse-header" @click="isOpen2 = !isOpen2">
            <div class="collapse-title font-medium">Vue Collapse (Closed)</div>
            <svg :class="['collapse-icon', { 'is-open': isOpen2 }]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="collapse-content">
            <div class="collapse-content-inner">
              <div class="collapse-body">
                <p class="text-sm opacity-80">
                  Konten ini awalnya tertutup.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex gap-2 mt-4">
        <button class="btn btn-sm btn-soft-primary" @click="isOpen1 = !isOpen1">
          Toggle First
        </button>
        <button class="btn btn-sm btn-soft-primary" @click="isOpen2 = !isOpen2">
          Toggle Second
        </button>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.componentImport, 'componentImport')">
          {{ copiedId === 'componentImport' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.componentImport }}</code></pre>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.componentBasic, 'componentBasic')">
          {{ copiedId === 'componentBasic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.componentBasic }}</code></pre>
      </div>
    </section>

    <!-- v-model Control -->
    <section id="controlled" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        v-model Control
      </h2>
      <p class="text-sm opacity-80">
        Kontrol state collapse dari luar menggunakan v-model.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.componentVModel, 'componentVModel')">
          {{ copiedId === 'componentVModel' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.componentVModel }}</code></pre>
      </div>
    </section>

    <!-- Props Reference -->
    <section id="props" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Props Reference
      </h2>

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
              <td class="px-4 py-2"><code class="code-inline">modelValue</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">undefined</td>
              <td class="px-4 py-2">v-model binding untuk state open/close</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">defaultOpen</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">State awal (jika tidak pakai v-model)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">variant</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">'default'</td>
              <td class="px-4 py-2">'default' | 'borderless' | 'ghost'</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">disabled</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Disable toggle interaction</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Events -->
    <section id="events" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Events
      </h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Event</th>
              <th class="px-4 py-2 text-left">Payload</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">update:modelValue</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">Emitted saat state berubah</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">toggle</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">Emitted saat collapse di-toggle</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slots -->
    <section id="styling" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Slots
      </h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Slot</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">default</code></td>
              <td class="px-4 py-2">Konten yang akan di-collapse</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#title</code></td>
              <td class="px-4 py-2">Header/title collapse</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#header</code></td>
              <td class="px-4 py-2">Alias untuk #title</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CSS Classes Reference -->
    <section id="css-classes" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        CSS Classes Reference
      </h2>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Class</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse</code></td>
              <td class="px-4 py-2">Container utama</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse.is-open</code></td>
              <td class="px-4 py-2">State terbuka</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse-header</code></td>
              <td class="px-4 py-2">Clickable header area</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse-icon</code></td>
              <td class="px-4 py-2">Arrow icon (auto-rotate)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse-content</code></td>
              <td class="px-4 py-2">Animated content wrapper</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse-body</code></td>
              <td class="px-4 py-2">Content dengan padding</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse-borderless</code></td>
              <td class="px-4 py-2">Variant tanpa border</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.collapse-ghost</code></td>
              <td class="px-4 py-2">Variant transparent</td>
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

<style>
/* Collapse Component CSS - Non-scoped untuk override */
.collapse {
  visibility: visible !important;
  border-radius: 0.5rem;
  overflow: hidden;
}

.collapse-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 0.75rem 1rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  transition: background-color 0.15s ease;
}

.collapse-header:hover {
  background-color: #f3f4f6;
}

.collapse-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.collapse.is-open .collapse-icon {
  transform: rotate(180deg);
}

.collapse-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.collapse.is-open .collapse-content {
  grid-template-rows: 1fr;
}

.collapse-content-inner {
  overflow: hidden;
}

.collapse-body {
  padding: 1rem;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 0.5rem 0.5rem;
  background-color: #fff;
}

/* Borderless variant */
.collapse.collapse-borderless .collapse-header,
.collapse.collapse-borderless .collapse-body {
  border: none;
}

/* Ghost variant */
.collapse.collapse-ghost .collapse-header {
  background-color: transparent;
  border: none;
}

.collapse.collapse-ghost .collapse-header:hover {
  background-color: #f3f4f6;
}

.collapse.collapse-ghost .collapse-body {
  border: none;
  background-color: transparent;
}
</style>
