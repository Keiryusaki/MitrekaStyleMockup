<script setup lang="ts">
import { ref } from "vue";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import Modal from "@/components/feedback/Modal.vue";

const copiedId = ref<string | null>(null);

// Demo select values
const selectDemo = ref<string | number | null>("opt1");
const selectDemoOptions = [
  { value: "opt1", label: "Option 1" },
  { value: "opt2", label: "Option 2" },
  { value: "opt3", label: "Option 3" },
];
const selectPrimaryDemo = ref<string | number | null>("primary");
const selectPrimaryOptions = [
  { value: "primary", label: "Primary select" },
];

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Code snippets
const codes = {
  install: `npm install @keiryusaki/mitreka-ui`,
  npmrc: `@keiryusaki:registry=https://npm.pkg.github.com`,
  importAll: `// main.ts atau main.js
import "@keiryusaki/mitreka-ui/css";`,
  importIndividual: `// Import individual components
import "@keiryusaki/mitreka-ui/css/base";
import "@keiryusaki/mitreka-ui/css/components/button.css";
import "@keiryusaki/mitreka-ui/css/components/input.css";
import "@keiryusaki/mitreka-ui/css/components/badge.css";`,
  buttonBasic: `<button class="btn">Default</button>
<button class="btn btn-primary">Primary</button>
<button class="btn btn-secondary">Secondary</button>
<button class="btn btn-accent">Accent</button>
<button class="btn btn-info">Info</button>
<button class="btn btn-success">Success</button>
<button class="btn btn-warning">Warning</button>
<button class="btn btn-error">Error</button>`,
  buttonOutline: `<button class="btn btn-outline">Default</button>
<button class="btn btn-outline btn-outline-primary">Primary</button>
<button class="btn btn-outline btn-outline-success">Success</button>
<button class="btn btn-outline btn-outline-error">Error</button>`,
  buttonSoft: `<button class="btn btn-soft-primary">Primary</button>
<button class="btn btn-soft-success">Success</button>
<button class="btn btn-soft-warning">Warning</button>
<button class="btn btn-soft-error">Error</button>`,
  buttonSize: `<button class="btn btn-primary btn-xs">Extra Small</button>
<button class="btn btn-primary btn-sm">Small</button>
<button class="btn btn-primary">Medium (default)</button>
<button class="btn btn-primary btn-lg">Large</button>
<button class="btn btn-primary btn-xl">Extra Large</button>`,
  buttonGhost: `<button class="btn btn-ghost">Ghost Button</button>`,
  inputBasic: `<input class="input" placeholder="Default input" />
<input class="input input-primary" placeholder="Primary focus" />
<input class="input input-error" placeholder="Error state" />
<input class="input input-success" placeholder="Success state" />`,
  inputSize: `<input class="input input-xs" placeholder="Extra small" />
<input class="input input-sm" placeholder="Small" />
<input class="input" placeholder="Medium (default)" />
<input class="input input-lg" placeholder="Large" />`,
  badgeBasic: `<span class="badge">Default</span>
<span class="badge badge-primary">Primary</span>
<span class="badge badge-secondary">Secondary</span>
<span class="badge badge-accent">Accent</span>
<span class="badge badge-info">Info</span>
<span class="badge badge-success">Success</span>
<span class="badge badge-warning">Warning</span>
<span class="badge badge-error">Error</span>`,
  badgeOutline: `<span class="badge badge-outline">Default</span>
<span class="badge badge-outline-primary">Primary</span>
<span class="badge badge-outline-success">Success</span>
<span class="badge badge-outline-error">Error</span>`,
  badgeSoft: `<span class="badge badge-soft-primary">Primary</span>
<span class="badge badge-soft-success">Success</span>
<span class="badge badge-soft-warning">Warning</span>
<span class="badge badge-soft-error">Error</span>`,
  alertBasic: `<div class="alert alert-info">Info alert message</div>
<div class="alert alert-success">Success alert message</div>
<div class="alert alert-warning">Warning alert message</div>
<div class="alert alert-error">Error alert message</div>`,
  cardBasic: `<div class="card p-4">
  <h3 class="font-semibold mb-2">Card Title</h3>
  <p class="text-sm opacity-80">Card content goes here.</p>
</div>`,
  switchBasic: `<!-- Switch -->
<label class="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="switch" />
  <span>Switch label</span>
</label>

<!-- Checkbox -->
<label class="flex items-center gap-2 cursor-pointer">
  <input type="checkbox" class="checkbox" />
  <span>Checkbox label</span>
</label>

<!-- Radio Group -->
<div class="flex items-center gap-4">
  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="group" class="radio" checked />
    <span>Option A</span>
  </label>
  <label class="flex items-center gap-2 cursor-pointer">
    <input type="radio" name="group" class="radio" />
    <span>Option B</span>
  </label>
</div>`,
  selectBasic: `<select class="select">
  <option>Option 1</option>
  <option>Option 2</option>
  <option>Option 3</option>
</select>

<select class="select select-primary">
  <option>Primary select</option>
</select>`,
  tableBasic: `<div data-als data-density="cozy">
  <div class="als-viewport">
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>John Doe</td>
          <td>john@example.com</td>
          <td><span class="badge badge-success">Active</span></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>`,
  modalVue: `<script setup>
import { ref } from "vue";
import Modal from "@/components/feedback/Modal.vue";

const showModal = ref(false);
<\/script>

<template>
  <button class="btn btn-primary" @click="showModal = true">
    Open Modal
  </button>
  
  <Modal 
    :open="showModal" 
    title="Confirm Action"
    size="md"
    @close="showModal = false"
    @confirm="handleConfirm"
  >
    <p>Are you sure you want to proceed?</p>
  </Modal>
</template>

<!-- Available sizes: sm (448px), md (768px), lg (1120px), xl (almost full), full (fullscreen) -->
<!-- Props: open, title, size, hideHeader, hideFooter, confirmText, cancelText, persistent -->`,
  vueComponents: `<script setup>
import { Button, Badge, Card, Modal } from "@keiryusaki/mitreka-ui/vue";
<\/script>

<template>
  <Button color="primary" size="md">Click me</Button>
  <Badge color="success" variant="soft">Active</Badge>
  <Card>
    <template #title>Card Title</template>
    Card content here
  </Card>
</template>`,
  composables: `<script setup>
import { useTheme } from "@keiryusaki/mitreka-ui/composables";

const { isDark, toggleTheme, setTheme } = useTheme();
<\/script>

<template>
  <button @click="toggleTheme">
    {{ isDark ? '🌙' : '☀️' }} Toggle Theme
  </button>
</template>`,
  themeHtml: `<!-- Light theme -->
<html data-theme="mitrekalight">

<!-- Dark theme -->
<html data-theme="mitrekadark">`,
  themeJs: `// Menggunakan composable
import { useTheme } from "@keiryusaki/mitreka-ui/composables";

const { setTheme } = useTheme();
setTheme("dark");  // "light" | "dark" | "system"`,
};

// Modal demo
const showModal = ref(false);
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <header>
      <h1 class="text-2xl font-bold">Developer Guide</h1>
      <p class="text-sm opacity-80">
        Panduan lengkap penggunaan @keiryusaki/mitreka-ui
      </p>
    </header>

    <!-- Table of Contents -->
    <nav class="card p-4">
      <h2 class="font-semibold mb-3">Daftar Isi</h2>
      <ul class="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
        <li><a href="#installation" class="hover:text-primary">1. Installation</a></li>
        <li><a href="#import" class="hover:text-primary">2. Import CSS</a></li>
        <li><a href="#buttons" class="hover:text-primary">3. Buttons</a></li>
        <li><a href="#inputs" class="hover:text-primary">4. Inputs</a></li>
        <li><a href="#badges" class="hover:text-primary">5. Badges</a></li>
        <li><a href="#alerts" class="hover:text-primary">6. Alerts</a></li>
        <li><a href="#cards" class="hover:text-primary">7. Cards</a></li>
        <li><a href="#switches" class="hover:text-primary">8. Switch/Checkbox</a></li>
        <li><a href="#selects" class="hover:text-primary">9. Select</a></li>
        <li><a href="#tables" class="hover:text-primary">10. Tables</a></li>
        <li><a href="#modal" class="hover:text-primary">11. Modal</a></li>
        <li><a href="#vue" class="hover:text-primary">12. Vue Components</a></li>
        <li><a href="#composables" class="hover:text-primary">13. Composables</a></li>
        <li><a href="#theming" class="hover:text-primary">14. Theming</a></li>
      </ul>
    </nav>

    <!-- 1. Installation -->
    <section id="installation" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        1. Installation
      </h2>

      <div class="space-y-3">
        <h3 class="font-medium">Step 1: Setup .npmrc</h3>
        <p class="text-sm opacity-80">
          Buat file <code class="code-inline">.npmrc</code> di root project:
        </p>
        <div class="code-block">
          <button
            class="copy-btn"
            @click="copyCode(codes.npmrc, 'npmrc')"
          >
            {{ copiedId === 'npmrc' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.npmrc }}</code></pre>
        </div>
        <p class="text-xs opacity-70">
          💡 Package sudah public, tidak perlu token untuk install.
        </p>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Step 2: Install package</h3>
        <div class="code-block">
          <button
            class="copy-btn"
            @click="copyCode(codes.install, 'install')"
          >
            {{ copiedId === 'install' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.install }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 2. Import CSS -->
    <section id="import" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        2. Import CSS
      </h2>

      <div class="space-y-3">
        <h3 class="font-medium">Import semua komponen (Recommended)</h3>
        <div class="code-block">
          <button
            class="copy-btn"
            @click="copyCode(codes.importAll, 'importAll')"
          >
            {{ copiedId === 'importAll' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.importAll }}</code></pre>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Import individual (untuk optimize bundle)</h3>
        <div class="code-block">
          <button
            class="copy-btn"
            @click="copyCode(codes.importIndividual, 'importIndividual')"
          >
            {{ copiedId === 'importIndividual' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.importIndividual }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 3. Buttons -->
    <section id="buttons" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        3. Buttons
      </h2>

      <!-- Solid -->
      <div class="space-y-3">
        <h3 class="font-medium">Solid (Default)</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn">Default</button>
          <button class="btn btn-primary">Primary</button>
          <button class="btn btn-secondary">Secondary</button>
          <button class="btn btn-accent">Accent</button>
          <button class="btn btn-info">Info</button>
          <button class="btn btn-success">Success</button>
          <button class="btn btn-warning">Warning</button>
          <button class="btn btn-error">Error</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.buttonBasic, 'buttonBasic')">
            {{ copiedId === 'buttonBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.buttonBasic }}</code></pre>
        </div>
      </div>

      <!-- Outline -->
      <div class="space-y-3">
        <h3 class="font-medium">Outline</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-outline">Default</button>
          <button class="btn btn-outline btn-outline-primary">Primary</button>
          <button class="btn btn-outline btn-outline-success">Success</button>
          <button class="btn btn-outline btn-outline-error">Error</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.buttonOutline, 'buttonOutline')">
            {{ copiedId === 'buttonOutline' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.buttonOutline }}</code></pre>
        </div>
      </div>

      <!-- Soft -->
      <div class="space-y-3">
        <h3 class="font-medium">Soft</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-soft-primary">Primary</button>
          <button class="btn btn-soft-success">Success</button>
          <button class="btn btn-soft-warning">Warning</button>
          <button class="btn btn-soft-error">Error</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.buttonSoft, 'buttonSoft')">
            {{ copiedId === 'buttonSoft' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.buttonSoft }}</code></pre>
        </div>
      </div>

      <!-- Ghost -->
      <div class="space-y-3">
        <h3 class="font-medium">Ghost</h3>
        <div class="flex flex-wrap gap-2">
          <button class="btn btn-ghost">Ghost Button</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.buttonGhost, 'buttonGhost')">
            {{ copiedId === 'buttonGhost' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.buttonGhost }}</code></pre>
        </div>
      </div>

      <!-- Sizes -->
      <div class="space-y-3">
        <h3 class="font-medium">Sizes</h3>
        <div class="flex flex-wrap items-center gap-2">
          <button class="btn btn-primary btn-xs">Extra Small</button>
          <button class="btn btn-primary btn-sm">Small</button>
          <button class="btn btn-primary">Medium</button>
          <button class="btn btn-primary btn-lg">Large</button>
          <button class="btn btn-primary btn-xl">Extra Large</button>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.buttonSize, 'buttonSize')">
            {{ copiedId === 'buttonSize' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.buttonSize }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 4. Inputs -->
    <section id="inputs" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        4. Inputs
      </h2>

      <div class="space-y-3">
        <h3 class="font-medium">Basic & Colors</h3>
        <div class="grid gap-2 max-w-md">
          <input class="input" placeholder="Default input" />
          <input class="input input-primary" placeholder="Primary focus" />
          <input class="input input-error" placeholder="Error state" />
          <input class="input input-success" placeholder="Success state" />
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.inputBasic, 'inputBasic')">
            {{ copiedId === 'inputBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.inputBasic }}</code></pre>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Sizes</h3>
        <div class="grid gap-2 max-w-md">
          <input class="input input-xs" placeholder="Extra small" />
          <input class="input input-sm" placeholder="Small" />
          <input class="input" placeholder="Medium (default)" />
          <input class="input input-lg" placeholder="Large" />
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.inputSize, 'inputSize')">
            {{ copiedId === 'inputSize' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.inputSize }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 5. Badges -->
    <section id="badges" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        5. Badges
      </h2>

      <div class="space-y-3">
        <h3 class="font-medium">Solid</h3>
        <div class="flex flex-wrap gap-2">
          <span class="badge">Default</span>
          <span class="badge badge-primary">Primary</span>
          <span class="badge badge-secondary">Secondary</span>
          <span class="badge badge-accent">Accent</span>
          <span class="badge badge-info">Info</span>
          <span class="badge badge-success">Success</span>
          <span class="badge badge-warning">Warning</span>
          <span class="badge badge-error">Error</span>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.badgeBasic, 'badgeBasic')">
            {{ copiedId === 'badgeBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.badgeBasic }}</code></pre>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Outline</h3>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-outline">Default</span>
          <span class="badge badge-outline-primary">Primary</span>
          <span class="badge badge-outline-success">Success</span>
          <span class="badge badge-outline-error">Error</span>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.badgeOutline, 'badgeOutline')">
            {{ copiedId === 'badgeOutline' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.badgeOutline }}</code></pre>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Soft</h3>
        <div class="flex flex-wrap gap-2">
          <span class="badge badge-soft-primary">Primary</span>
          <span class="badge badge-soft-success">Success</span>
          <span class="badge badge-soft-warning">Warning</span>
          <span class="badge badge-soft-error">Error</span>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.badgeSoft, 'badgeSoft')">
            {{ copiedId === 'badgeSoft' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.badgeSoft }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 6. Alerts -->
    <section id="alerts" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        6. Alerts
      </h2>

      <div class="space-y-3">
        <div class="space-y-2">
          <div class="alert alert-info">Info alert message</div>
          <div class="alert alert-success">Success alert message</div>
          <div class="alert alert-warning">Warning alert message</div>
          <div class="alert alert-error">Error alert message</div>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.alertBasic, 'alertBasic')">
            {{ copiedId === 'alertBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.alertBasic }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 7. Cards -->
    <section id="cards" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        7. Cards
      </h2>

      <div class="space-y-3">
        <div class="card p-4 max-w-sm">
          <h3 class="font-semibold mb-2">Card Title</h3>
          <p class="text-sm opacity-80">Card content goes here.</p>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.cardBasic, 'cardBasic')">
            {{ copiedId === 'cardBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.cardBasic }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 8. Switch/Checkbox/Radio -->
    <section id="switches" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        8. Switch / Checkbox / Radio
      </h2>

      <div class="space-y-3">
        <div class="flex flex-wrap items-center gap-8">
          <!-- Switch -->
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="switch" checked />
            <span class="text-sm">Switch</span>
          </label>

          <!-- Checkbox -->
          <label class="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" class="checkbox" checked />
            <span class="text-sm">Checkbox</span>
          </label>

          <!-- Radio group -->
          <div class="flex items-center gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="demoRadio" class="radio" checked />
              <span class="text-sm">Option A</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="demoRadio" class="radio" />
              <span class="text-sm">Option B</span>
            </label>
          </div>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.switchBasic, 'switchBasic')">
            {{ copiedId === 'switchBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.switchBasic }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 9. Select -->
    <section id="selects" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        9. Select
      </h2>

      <div class="space-y-3">
        <div class="flex flex-wrap gap-4 max-w-md">
          <SelectDropdown
            v-model="selectDemo"
            :options="selectDemoOptions"
            variant="outline"
          />
          <SelectDropdown
            v-model="selectPrimaryDemo"
            :options="selectPrimaryOptions"
            color="primary"
            variant="outline"
          />
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.selectBasic, 'selectBasic')">
            {{ copiedId === 'selectBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.selectBasic }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 10. Tables -->
    <section id="tables" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        10. Tables (ALS Table)
      </h2>

      <div class="space-y-3">
        <div data-als data-density="cozy">
          <div class="als-viewport">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>John Doe</td>
                  <td>john@example.com</td>
                  <td><span class="badge badge-soft-success badge-sm">Active</span></td>
                </tr>
                <tr>
                  <td>Jane Smith</td>
                  <td>jane@example.com</td>
                  <td><span class="badge badge-soft-warning badge-sm">Pending</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.tableBasic, 'tableBasic')">
            {{ copiedId === 'tableBasic' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.tableBasic }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 11. Modal -->
    <section id="modal" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        11. Modal (Vue Component)
      </h2>

      <p class="text-sm opacity-80">
        Lihat dokumentasi lengkap di halaman 
        <router-link to="/modal" class="text-primary underline hover:no-underline">Modal Component</router-link>.
      </p>

      <div class="space-y-3">
        <button class="btn btn-primary" @click="showModal = true">
          Open Modal Demo
        </button>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.modalVue, 'modalVue')">
            {{ copiedId === 'modalVue' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.modalVue }}</code></pre>
        </div>
      </div>

      <!-- Modal Demo -->
      <Modal
        :open="showModal"
        title="Confirm Action"
        size="sm"
        @close="showModal = false"
        @confirm="showModal = false"
      >
        <p>Are you sure you want to proceed with this action?</p>
      </Modal>
    </section>

    <!-- 12. Vue Components -->
    <section id="vue" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        12. Vue Components (Optional)
      </h2>

      <p class="text-sm opacity-80">
        Selain CSS classes, tersedia juga Vue components dengan props yang lebih mudah digunakan.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.vueComponents, 'vueComponents')">
          {{ copiedId === 'vueComponents' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.vueComponents }}</code></pre>
      </div>

      <div class="text-sm">
        <p class="font-medium mb-2">Available Vue Components:</p>
        <ul class="list-disc ml-5 space-y-1 opacity-80">
          <li><code class="code-inline">Button</code> - props: color, size, variant, loading, disabled</li>
          <li><code class="code-inline">Badge</code> - props: color, size, variant</li>
          <li><code class="code-inline">Card</code> - slots: default, title, footer</li>
          <li><code class="code-inline">Modal</code> - props: open, title, maxWidth; events: close, confirm</li>
        </ul>
      </div>
    </section>

    <!-- 13. Composables -->
    <section id="composables" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        13. Composables
      </h2>

      <div class="space-y-3">
        <h3 class="font-medium">useTheme</h3>
        <p class="text-sm opacity-80">Composable untuk manage dark/light mode.</p>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.composables, 'composables')">
            {{ copiedId === 'composables' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.composables }}</code></pre>
        </div>
      </div>
    </section>

    <!-- 14. Theming -->
    <section id="theming" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        14. Theming
      </h2>

      <div class="space-y-3">
        <h3 class="font-medium">Via HTML attribute</h3>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.themeHtml, 'themeHtml')">
            {{ copiedId === 'themeHtml' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.themeHtml }}</code></pre>
        </div>
      </div>

      <div class="space-y-3">
        <h3 class="font-medium">Via JavaScript</h3>
        <div class="code-block">
          <button class="copy-btn" @click="copyCode(codes.themeJs, 'themeJs')">
            {{ copiedId === 'themeJs' ? '✓ Copied!' : 'Copy' }}
          </button>
          <pre><code>{{ codes.themeJs }}</code></pre>
        </div>
      </div>

      <div class="p-4 bg-base-200 rounded-lg">
        <p class="text-sm font-medium mb-2">Available Themes:</p>
        <ul class="text-sm list-disc ml-5 space-y-1 opacity-80">
          <li><code class="code-inline">mitrekalight</code> - Light theme (default)</li>
          <li><code class="code-inline">mitrekadark</code> - Dark theme</li>
        </ul>
      </div>
    </section>

    <!-- Footer -->
    <footer class="text-center text-sm opacity-60 pt-8">
      <p>@keiryusaki/mitreka-ui v1.0.0</p>
      <p>
        <a
          href="https://github.com/Keiryusaki/mitreka-ui"
          target="_blank"
          class="hover:text-primary"
          >GitHub Repository</a
        >
      </p>
    </footer>
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
