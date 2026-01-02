<script setup lang="ts">
import { ref, computed } from "vue";
import { useTheme } from "@/composables/useTheme";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import { Icon } from "@/components/icons";
import PageHeader from "@/components/PageHeader.vue";

const { currentTheme, toggleTheme, setTheme } = useTheme();

// Theme options for SelectDropdown
const themeOptions = [
  { value: "mitrekalight", label: "Light Mode" },
  { value: "mitrekadark", label: "Dark Mode" },
];

// Computed for v-model binding
const selectedTheme = computed({
  get: () => currentTheme.value,
  set: (val: string | number | null) => {
    if (val) setTheme(val as "mitrekalight" | "mitrekadark");
  },
});

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  composable: `import { useTheme } from "@/composables/useTheme";

const { currentTheme, toggleTheme, setTheme } = useTheme();

// Toggle antara light/dark
toggleTheme();

// Set theme spesifik
setTheme("mitrekadark");
setTheme("mitrekalight");

// Baca current theme
console.log(currentTheme.value); // "mitrekalight" | "mitrekadark"`,
  component: `<` + `script setup>
import ThemeSwitcher from "@/components/ThemeSwitcher.vue";
</` + `script>

<template>
  <ThemeSwitcher />
</template>`,
  selectDropdown: `<` + `script setup>
import { computed } from "vue";
import { useTheme } from "@/composables/useTheme";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

const { currentTheme, setTheme } = useTheme();

const themeOptions = [
  { value: "mitrekalight", label: "Light Mode" },
  { value: "mitrekadark", label: "Dark Mode" },
];

const selectedTheme = computed({
  get: () => currentTheme.value,
  set: (val) => setTheme(val),
});
</` + `script>

<template>
  <SelectDropdown v-model="selectedTheme" :options="themeOptions" size="sm" />
</template>`,
  iconButton: `<` + `script setup>
import { useTheme } from "@/composables/useTheme";
import { Icon } from "@/components/icons";

const { currentTheme, toggleTheme } = useTheme();
</` + `script>

<template>
  <!-- Icon only -->
  <button @click="toggleTheme" class="btn btn-ghost btn-sm">
    <Icon :name="currentTheme === 'mitrekalight' ? 'moon' : 'sun'" />
  </button>

  <!-- Icon + Text -->
  <button @click="toggleTheme" class="btn btn-outline btn-sm inline-flex items-center gap-2">
    <Icon :name="currentTheme === 'mitrekalight' ? 'moon' : 'sun'" :size="16" />
    {{ currentTheme === 'mitrekalight' ? 'Dark Mode' : 'Light Mode' }}
  </button>
</template>`,
  useThemeTs: `// src/composables/useTheme.ts
import { ref, onMounted } from 'vue'

type Theme = 'mitrekalight' | 'mitrekadark'

const currentTheme = ref<Theme>('mitrekalight')

export function useTheme() {
  const setTheme = (theme: Theme) => {
    currentTheme.value = theme
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }

  const toggleTheme = () => {
    setTheme(currentTheme.value === 'mitrekalight' ? 'mitrekadark' : 'mitrekalight')
  }

  onMounted(() => {
    const saved = (localStorage.getItem('theme') as Theme) || 'mitrekalight'
    setTheme(saved)
  })

  return { currentTheme, setTheme, toggleTheme }
}`,
};

const downloadComposable = async () => {
  try {
    const fileUrl = (await import("@/composables/useTheme.ts?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "useTheme.ts";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};

const downloadComponent = async () => {
  try {
    const fileUrl = (await import("@/components/ThemeSwitcher.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "ThemeSwitcher.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Theme Switcher" 
      description="Komponen dan composable untuk toggle dark/light mode."
    />

    <!-- Download -->
    <section class="card p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-semibold">Download Files</h2>
          <p class="text-sm opacity-70">Copy ke project Anda</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-accent btn-sm" @click="downloadComposable">
            useTheme.ts
          </button>
          <button class="btn btn-accent btn-sm" @click="downloadComponent">
            ThemeSwitcher.vue
          </button>
        </div>
      </div>
    </section>

    <!-- Live Demo -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Live Demo</h2>
      <p class="text-sm opacity-80">
        Current theme: <code class="code-inline">{{ currentTheme }}</code>
      </p>

      <div class="flex flex-wrap items-end gap-4">
        <!-- SelectDropdown -->
        <div class="p-4 bg-base-200 rounded-box">
          <p class="text-xs opacity-60 mb-2">SelectDropdown</p>
          <SelectDropdown
            v-model="selectedTheme"
            :options="themeOptions"
            placeholder="Pilih Theme"
            size="sm"
          />
        </div>

        <!-- Icon Button -->
        <div class="p-4 bg-base-200 rounded-box">
          <p class="text-xs opacity-60 mb-2">Icon Button</p>
          <button @click="toggleTheme" class="btn btn-ghost btn-sm">
            <Icon :name="currentTheme === 'mitrekalight' ? 'moon' : 'sun'" :size="20" />
          </button>
        </div>

        <!-- Toggle Button with Icon -->
        <div class="p-4 bg-base-200 rounded-box">
          <p class="text-xs opacity-60 mb-2">Button + Icon</p>
          <button @click="toggleTheme" class="btn btn-outline btn-sm inline-flex items-center gap-2">
            <Icon :name="currentTheme === 'mitrekalight' ? 'moon' : 'sun'" :size="16" />
            {{ currentTheme === 'mitrekalight' ? 'Dark Mode' : 'Light Mode' }}
          </button>
        </div>
      </div>
    </section>

    <!-- Using Composable -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Using Composable</h2>
      <p class="text-sm opacity-80">
        Cara paling fleksibel - gunakan <code class="code-inline">useTheme()</code> composable.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.composable, 'composable')">
          {{ copiedId === 'composable' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.composable }}</code></pre>
      </div>
    </section>

    <!-- Using Component -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Using Component</h2>
      <p class="text-sm opacity-80">
        Komponen siap pakai dengan toggle button dan select dropdown.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.component, 'component')">
          {{ copiedId === 'component' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.component }}</code></pre>
      </div>
    </section>

    <!-- With SelectDropdown -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With SelectDropdown</h2>
      <p class="text-sm opacity-80">
        Gunakan <code class="code-inline">SelectDropdown</code> untuk pilihan tema yang lebih formal.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.selectDropdown, 'selectDropdown')">
          {{ copiedId === 'selectDropdown' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.selectDropdown }}</code></pre>
      </div>
    </section>

    <!-- With Icon Button -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Icon Button</h2>
      <p class="text-sm opacity-80">
        Gunakan <code class="code-inline">Icon</code> component dengan nama <code class="code-inline">sun</code> dan <code class="code-inline">moon</code>.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.iconButton, 'iconButton')">
          {{ copiedId === 'iconButton' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.iconButton }}</code></pre>
      </div>
    </section>

    <!-- API Reference -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">API Reference</h2>

      <h3 class="font-medium">useTheme() Returns</h3>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Property</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="code-inline">currentTheme</code></td>
              <td class="px-4 py-2"><code class="code-inline">Ref&lt;Theme&gt;</code></td>
              <td class="px-4 py-2">Reactive current theme value</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">toggleTheme</code></td>
              <td class="px-4 py-2"><code class="code-inline">() => void</code></td>
              <td class="px-4 py-2">Toggle antara light dan dark</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">setTheme</code></td>
              <td class="px-4 py-2"><code class="code-inline">(theme: Theme) => void</code></td>
              <td class="px-4 py-2">Set theme spesifik</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3 class="font-medium mt-4">Theme Type</h3>
      <div class="code-block">
        <pre><code>type Theme = "mitrekalight" | "mitrekadark"</code></pre>
      </div>
    </section>

    <!-- How It Works -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">How It Works</h2>
      
      <ul class="list-disc list-inside space-y-2 text-sm opacity-80">
        <li>Theme disimpan di <code class="code-inline">localStorage</code> dengan key "theme"</li>
        <li>Attribute <code class="code-inline">data-theme</code> di-set pada <code class="code-inline">&lt;html&gt;</code></li>
        <li>CSS variables berubah berdasarkan <code class="code-inline">[data-theme="mitrekadark"]</code></li>
        <li>Theme otomatis di-restore saat page load via <code class="code-inline">onMounted</code></li>
      </ul>
    </section>

    <!-- Source Code -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Source Code: useTheme.ts</h2>
      
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.useThemeTs, 'useThemeTs')">
          {{ copiedId === 'useThemeTs' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.useThemeTs }}</code></pre>
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
