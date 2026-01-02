<script setup lang="ts">
import { ref } from "vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const tocItems: TOCItem[] = [
  { id: 'basic-css', label: 'Basic Accordion (CSS)' },
  { id: 'variants', label: 'Variants' },
  { id: 'vue-component', label: 'Vue Component' },
  { id: 'multiple', label: 'Multiple Expand' },
  { id: 'props', label: 'Props Reference' },
  { id: 'css-classes', label: 'CSS Classes' },
  { id: 'events', label: 'Events' },
  { id: 'styling', label: 'Styling Guide' },
];

const copiedId = ref<string | null>(null);
const activeItem = ref<string | null>("item-1");
const activeItems = ref<string[]>(["multi-1"]);

function toggleMultiple(id: string) {
  const index = activeItems.value.indexOf(id);
  if (index > -1) {
    activeItems.value.splice(index, 1);
  } else {
    activeItems.value.push(id);
  }
}

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  cssBasic: `<!-- Accordion dengan CSS -->
<div class="accordion">
  <div class="accordion-item is-open">
    <div class="accordion-header" onclick="toggleAccordion(this)">
      <div class="accordion-title">Section 1</div>
      <svg class="accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="accordion-body">Content for section 1</div>
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <div class="accordion-header" onclick="toggleAccordion(this)">
      <div class="accordion-title">Section 2</div>
      <svg class="accordion-icon" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
      </svg>
    </div>
    <div class="accordion-content">
      <div class="accordion-content-inner">
        <div class="accordion-body">Content for section 2</div>
      </div>
    </div>
  </div>
</div>`,
  cssVariants: `<!-- Default (connected items) -->
<div class="accordion">...</div>

<!-- Bordered (separated items) -->
<div class="accordion accordion-bordered">...</div>

<!-- Ghost (minimal) -->
<div class="accordion accordion-ghost">...</div>`,
  componentImport: `import { Accordion, AccordionItem } from "@keiryusaki/mitreka-ui/vue";`,
  componentBasic: `<Accordion v-model="activeItem">
  <AccordionItem id="item-1">
    <template #title>Section 1</template>
    Content for section 1...
  </AccordionItem>
  <AccordionItem id="item-2">
    <template #title>Section 2</template>
    Content for section 2...
  </AccordionItem>
  <AccordionItem id="item-3">
    <template #title>Section 3</template>
    Content for section 3...
  </AccordionItem>
</Accordion>`,
  componentMultiple: `<script setup>
import { ref } from 'vue';
const activeItems = ref(['item-1']); // Array untuk multiple
<\/script>

<template>
  <Accordion v-model="activeItems" multiple>
    <AccordionItem id="item-1">
      <template #title>Section 1<\/template>
      Content 1...
    <\/AccordionItem>
    <AccordionItem id="item-2">
      <template #title>Section 2<\/template>
      Content 2...
    <\/AccordionItem>
  <\/Accordion>
<\/template>`,
  jsToggle: `// Toggle accordion dengan JavaScript
function toggleAccordion(header) {
  const item = header.parentElement;
  const accordion = item.parentElement;
  
  // Close all other items
  accordion.querySelectorAll('.accordion-item').forEach(i => {
    if (i !== item) i.classList.remove('is-open');
  });
  
  // Toggle current item
  item.classList.toggle('is-open');
}`,
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Accordion" 
      description="Komponen untuk menampilkan multiple collapsible sections dengan behavior buka satu tutup yang lain."
    />

    <!-- Basic CSS Accordion -->
    <section id="basic-css" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Basic Accordion (CSS)
      </h2>
      <p class="text-sm opacity-80">
        Accordion dengan CSS class. Gunakan JavaScript untuk toggle dan auto-close behavior.
      </p>

      <div class="max-w-md">
        <div class="accordion" id="demo-accordion">
          <div class="accordion-item is-open">
            <div class="accordion-header" @click="toggleCssAccordion($event)">
              <div class="accordion-title font-medium">What is Mitreka UI?</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">
                    Mitreka UI adalah CSS-first design system dengan optional Vue components untuk membangun aplikasi modern.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" @click="toggleCssAccordion($event)">
              <div class="accordion-title font-medium">How to install?</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">
                    Install via npm: <code class="code-inline">npm install @keiryusaki/mitreka-ui</code>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <div class="accordion-header" @click="toggleCssAccordion($event)">
              <div class="accordion-title font-medium">Is it free?</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">
                    Ya, Mitreka UI adalah open source dan gratis untuk digunakan.
                  </p>
                </div>
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

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.jsToggle, 'jsToggle')">
          {{ copiedId === 'jsToggle' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.jsToggle }}</code></pre>
      </div>
    </section>

    <!-- CSS Variants -->
    <section id="variants" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Variants (CSS)
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Default -->
        <div>
          <span class="text-xs font-medium opacity-60 mb-2 block">Default</span>
          <div class="accordion" id="variant-default">
            <div class="accordion-item is-open">
              <div class="accordion-header" @click="toggleCssAccordion($event)">
                <div class="accordion-title text-sm font-medium">Item 1</div>
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  <div class="accordion-body">
                    <p class="text-xs opacity-80">Content 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" @click="toggleCssAccordion($event)">
                <div class="accordion-title text-sm font-medium">Item 2</div>
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  <div class="accordion-body">
                    <p class="text-xs opacity-80">Content 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Bordered -->
        <div>
          <span class="text-xs font-medium opacity-60 mb-2 block">Bordered</span>
          <div class="accordion accordion-bordered" id="variant-bordered">
            <div class="accordion-item is-open">
              <div class="accordion-header" @click="toggleCssAccordion($event)">
                <div class="accordion-title text-sm font-medium">Item 1</div>
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  <div class="accordion-body">
                    <p class="text-xs opacity-80">Content 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" @click="toggleCssAccordion($event)">
                <div class="accordion-title text-sm font-medium">Item 2</div>
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  <div class="accordion-body">
                    <p class="text-xs opacity-80">Content 2</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Ghost -->
        <div>
          <span class="text-xs font-medium opacity-60 mb-2 block">Ghost</span>
          <div class="accordion accordion-ghost" id="variant-ghost">
            <div class="accordion-item is-open">
              <div class="accordion-header" @click="toggleCssAccordion($event)">
                <div class="accordion-title text-sm font-medium">Item 1</div>
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  <div class="accordion-body">
                    <p class="text-xs opacity-80">Content 1</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="accordion-item">
              <div class="accordion-header" @click="toggleCssAccordion($event)">
                <div class="accordion-title text-sm font-medium">Item 2</div>
                <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div class="accordion-content">
                <div class="accordion-content-inner">
                  <div class="accordion-body">
                    <p class="text-xs opacity-80">Content 2</p>
                  </div>
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
        Vue component dengan auto-close behavior built-in.
        <span class="text-warning font-medium">Pastikan sudah update package ke versi terbaru.</span>
      </p>

      <div class="p-4 bg-info/10 border border-info/30 rounded-lg">
        <p class="text-sm">
          <strong>Note:</strong> Contoh di bawah menggunakan CSS-based accordion dengan Vue reactive state. 
          Untuk Vue component dengan v-model support, import dari <code class="code-inline">@keiryusaki/mitreka-ui/vue</code>.
        </p>
      </div>

      <div class="max-w-md">
        <div class="accordion" id="vue-accordion">
          <div :class="['accordion-item', { 'is-open': activeItem === 'item-1' }]">
            <div class="accordion-header" @click="activeItem = activeItem === 'item-1' ? null : 'item-1'">
              <div class="accordion-title font-medium">What is Mitreka UI?</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">Mitreka UI adalah CSS-first design system dengan optional Vue components.</p>
                </div>
              </div>
            </div>
          </div>
          <div :class="['accordion-item', { 'is-open': activeItem === 'item-2' }]">
            <div class="accordion-header" @click="activeItem = activeItem === 'item-2' ? null : 'item-2'">
              <div class="accordion-title font-medium">How to install?</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">Install via npm: <code class="code-inline">npm install @keiryusaki/mitreka-ui</code></p>
                </div>
              </div>
            </div>
          </div>
          <div :class="['accordion-item', { 'is-open': activeItem === 'item-3' }]">
            <div class="accordion-header" @click="activeItem = activeItem === 'item-3' ? null : 'item-3'">
              <div class="accordion-title font-medium">Is it free?</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">Ya, Mitreka UI adalah open source dan gratis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs opacity-60">Active: {{ activeItem }}</p>

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

    <!-- Multiple Mode -->
    <section id="multiple" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Multiple Mode
      </h2>
      <p class="text-sm opacity-80">
        Dengan prop <code class="code-inline">multiple</code>, beberapa item bisa terbuka bersamaan.
      </p>

      <div class="max-w-md">
        <div class="accordion accordion-bordered">
          <div :class="['accordion-item', { 'is-open': activeItems.includes('multi-1') }]">
            <div class="accordion-header" @click="toggleMultiple('multi-1')">
              <div class="accordion-title font-medium">Section 1</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">Ini bisa terbuka bersamaan dengan section lain.</p>
                </div>
              </div>
            </div>
          </div>
          <div :class="['accordion-item', { 'is-open': activeItems.includes('multi-2') }]">
            <div class="accordion-header" @click="toggleMultiple('multi-2')">
              <div class="accordion-title font-medium">Section 2</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">Klik untuk membuka tanpa menutup yang lain.</p>
                </div>
              </div>
            </div>
          </div>
          <div :class="['accordion-item', { 'is-open': activeItems.includes('multi-3') }]">
            <div class="accordion-header" @click="toggleMultiple('multi-3')">
              <div class="accordion-title font-medium">Section 3</div>
              <svg class="accordion-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
              </svg>
            </div>
            <div class="accordion-content">
              <div class="accordion-content-inner">
                <div class="accordion-body">
                  <p class="text-sm opacity-80">Multiple sections dapat terbuka sekaligus.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <p class="text-xs opacity-60">Active: {{ activeItems }}</p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.componentMultiple, 'componentMultiple')">
          {{ copiedId === 'componentMultiple' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.componentMultiple }}</code></pre>
      </div>
    </section>

    <!-- Accordion Props -->
    <section id="props" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Accordion Props
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
              <td class="px-4 py-2">string | string[] | null</td>
              <td class="px-4 py-2">null</td>
              <td class="px-4 py-2">ID item yang aktif (single atau array untuk multiple)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">multiple</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Allow multiple items open</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">variant</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">'default'</td>
              <td class="px-4 py-2">'default' | 'bordered' | 'ghost'</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- AccordionItem Props -->
    <section id="css-classes" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        AccordionItem Props
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
              <td class="px-4 py-2"><code class="code-inline">id</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">required</td>
              <td class="px-4 py-2">Unique identifier untuk item</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">disabled</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Disable toggle untuk item ini</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Slots -->
    <section id="events" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        AccordionItem Slots
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
              <td class="px-4 py-2">Konten accordion item</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#title</code></td>
              <td class="px-4 py-2">Header/title item</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#header</code></td>
              <td class="px-4 py-2">Alias untuk #title</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- CSS Classes -->
    <section id="styling" class="card p-6 space-y-4 scroll-mt-20">
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
              <td class="px-4 py-2"><code class="code-inline">.accordion</code></td>
              <td class="px-4 py-2">Container utama</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-item</code></td>
              <td class="px-4 py-2">Individual item</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-item.is-open</code></td>
              <td class="px-4 py-2">Item dalam state terbuka</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-header</code></td>
              <td class="px-4 py-2">Clickable header</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-icon</code></td>
              <td class="px-4 py-2">Arrow icon (auto-rotate)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-content</code></td>
              <td class="px-4 py-2">Animated content wrapper</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-body</code></td>
              <td class="px-4 py-2">Content dengan padding</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-bordered</code></td>
              <td class="px-4 py-2">Variant dengan separated items</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.accordion-ghost</code></td>
              <td class="px-4 py-2">Variant minimal/transparent</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
  </div>
</template>

<script lang="ts">
export default {
  methods: {
    toggleCssAccordion(event: Event) {
      const header = event.currentTarget as HTMLElement;
      const item = header.parentElement;
      const accordion = item?.parentElement;
      
      if (!item || !accordion) return;
      
      accordion.querySelectorAll('.accordion-item').forEach(i => {
        if (i !== item) i.classList.remove('is-open');
      });
      
      item.classList.toggle('is-open');
    }
  }
}
</script>

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

/* Accordion Component CSS */
.accordion {
  display: flex;
  flex-direction: column;
  border: var(--border) solid var(--color-base-300);
  border-radius: var(--radius-box);
  overflow: hidden;
}

.accordion-item {
  background-color: var(--color-base-100);
}

.accordion-item:not(:last-child) {
  border-bottom: var(--border) solid var(--color-base-300);
}

.accordion-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  user-select: none;
  padding: 0.875rem 1rem;
  transition: background-color 0.15s ease;
}

.accordion-header:hover {
  background-color: var(--color-base-200);
}

.accordion-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.accordion-item.is-open .accordion-icon {
  transform: rotate(180deg);
}

.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.accordion-item.is-open .accordion-content {
  grid-template-rows: 1fr;
}

.accordion-content-inner {
  overflow: hidden;
}

.accordion-body {
  padding: 0 1rem 1rem 1rem;
}

/* Bordered variant */
.accordion.accordion-bordered {
  border: none;
  gap: 0.5rem;
}

.accordion.accordion-bordered .accordion-item {
  border: var(--border) solid var(--color-base-300);
  border-radius: var(--radius-box);
}

/* Ghost variant */
.accordion.accordion-ghost {
  border: none;
}

.accordion.accordion-ghost .accordion-item {
  border-bottom: none;
}

.accordion.accordion-ghost .accordion-header {
  border-radius: var(--radius-box);
}
</style>
