<!-- src/pages/SelectOption.vue -->
<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { Icon } from "@/composables/Icon";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const tocItems: TOCItem[] = [
  { id: 'controls', label: 'Controls' },
  { id: 'playground', label: 'Playground' },
  { id: 'solid', label: 'SOLID' },
  { id: 'outline', label: 'OUTLINE' },
  { id: 'select-search', label: 'Select dengan Search' },
  { id: 'multi-select', label: 'Multi Select' },
  { id: 'dev-guide', label: 'Developer Guide' },
];
import useSelectRaw from "@/composables/useSelect.ts?raw";

const _blobUrls: string[] = [];
function makeDownloadUrl(code: string, mime = "text/plain") {
  const url = URL.createObjectURL(new Blob([code], { type: mime }));
  _blobUrls.push(url);
  return url;
}

// URL + filename
const dlUseSelectUrl = makeDownloadUrl(useSelectRaw, "text/typescript");

onBeforeUnmount(() => _blobUrls.forEach((u) => URL.revokeObjectURL(u)));

/* ====== DEMO: data umum ====== */
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Color = "default" | "primary" | "secondary" | "accent" | "info" | "success" | "warning" | "error";
type Variant = "solid" | "outline";

const size = ref<Size>("md");
const variant = ref<Variant>("solid");
const disabled = ref(false);

const sizes: Size[] = ["xs", "sm", "md", "lg", "xl"];
const colors: Color[] = ["default", "primary", "secondary", "accent", "info", "success", "warning", "error"];

const options = [
  { value: "id", label: "Indonesia" },
  { value: "sg", label: "Singapore" },
  { value: "my", label: "Malaysia" },
  { value: "th", label: "Thailand" },
];

// State untuk setiap select demo
const selectedValues = ref<Record<string, string | number | null>>({});

/* ====== Import Components ====== */
import { SelectDropdown, SelectInput, MultiSelect } from "@keiryusaki/mitreka-ui/vue";

const country = ref<string | number | null>(null);
const countries = [
  { value: "id", label: "Indonesia" },
  { value: "sg", label: "Singapore" },
  { value: "my", label: "Malaysia" },
  { value: "th", label: "Thailand" },
];

const roles = ref<Array<string | number>>([]);
const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "pm", label: "Project Manager" },
  { value: "dev", label: "Developer" },
  { value: "qa", label: "QA" },
];

// contoh remote (mock)
async function fetchCountries(q: string) {
  await new Promise((r) => setTimeout(r, 250));
  const kw = q.toLowerCase();
  return countries.filter((c) => c.label.toLowerCase().includes(kw));
}

// Code examples
const exampleSolid = `<SelectDropdown
  v-model="selected"
  :options="options"
  placeholder="Choose..."
  size="md"
  color="primary"
  variant="solid"
/>`;

const exampleOutline = `<SelectDropdown
  v-model="selected"
  :options="options"
  placeholder="Choose..."
  size="md"
  color="primary"
  variant="outline"
/>`;
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Select Option" 
      description="Custom Select dengan smooth dropdown (Solid & Outline) + Search & Multi Select."
    />

    <div class="card p-4 md:p-6 space-y-5">
      <!-- Controls -->
      <section id="controls" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Variant</span>
            <div class="join">
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': variant === 'solid' }"
                @click="variant = 'solid'"
              >
                Solid
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': variant === 'outline' }"
                @click="variant = 'outline'"
              >
                Outline
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Size</span>
            <div class="join">
              <button
                v-for="s in sizes"
                :key="s"
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === s }"
                @click="size = s"
              >
                {{ s }}
              </button>
            </div>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input type="checkbox" class="toggle toggle-sm" v-model="disabled" />
            Disabled
          </label>
        </div>
      </section>

      <!-- Playground -->
      <section id="playground" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="font-semibold opacity-90">Playground</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-xs opacity-70 mb-1 block">Default</label>
            <SelectDropdown
              v-model="selectedValues['playground-default']"
              :options="options"
              placeholder="Choose..."
              :size="size"
              color="default"
              :variant="variant"
              :disabled="disabled"
            />
          </div>
          <div>
            <label class="text-xs opacity-70 mb-1 block">Primary</label>
            <SelectDropdown
              v-model="selectedValues['playground-primary']"
              :options="options"
              placeholder="Choose..."
              :size="size"
              color="primary"
              :variant="variant"
              :disabled="disabled"
            />
          </div>
        </div>
      </section>

      <!-- SOLID list -->
      <section id="solid" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="font-semibold opacity-90">SOLID</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="c in colors" :key="'solid-' + c" class="space-y-1">
            <div class="text-xs opacity-70 capitalize">{{ c }}</div>
            <SelectDropdown
              v-model="selectedValues['solid-' + c]"
              :options="options"
              placeholder="Choose..."
              :size="size"
              :color="c"
              variant="solid"
              :disabled="disabled"
            />
          </div>
        </div>

        <details class="mt-4">
          <summary class="cursor-pointer text-sm font-medium">Code Example</summary>
          <pre class="code mt-3"><code>{{ exampleSolid }}</code></pre>
        </details>
      </section>

      <!-- OUTLINE list -->
      <section id="outline" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="font-semibold opacity-90">OUTLINE</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="c in colors" :key="'outline-' + c" class="space-y-1">
            <div class="text-xs opacity-70 capitalize">{{ c }}</div>
            <SelectDropdown
              v-model="selectedValues['outline-' + c]"
              :options="options"
              placeholder="Choose..."
              :size="size"
              :color="c"
              variant="outline"
              :disabled="disabled"
            />
          </div>
        </div>

        <details class="mt-4">
          <summary class="cursor-pointer text-sm font-medium">Code Example</summary>
          <pre class="code mt-3"><code>{{ exampleOutline }}</code></pre>
        </details>
      </section>

      <!-- Select dengan Search (SelectInput) -->
      <section id="select-search" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="font-semibold opacity-90">Select dengan Search (SelectInput)</h3>
        <div class="grid md:grid-cols-2 gap-6 items-start">
          <div>
            <label class="text-xs opacity-70">Local options</label>
            <SelectInput
              v-model="country"
              :options="countries"
              placeholder="Choose country..."
              clearable
              size="md"
              color="primary"
            />
            <div class="text-xs opacity-70 mt-2">
              Value: <code>{{ country }}</code>
            </div>
          </div>

          <div>
            <label class="text-xs opacity-70">Remote/async</label>
            <SelectInput
              v-model="country"
              :fetch-options="fetchCountries"
              :debounce-ms="300"
              placeholder="Search countries..."
              clearable
            />
          </div>
        </div>

        <details class="mt-4">
          <summary class="cursor-pointer text-sm font-medium">
            Markup contoh (SelectInput)
          </summary>
          <pre v-pre class="code mt-3">
            <code>&lt;script setup lang="ts">
              import { SelectInput } from '@keiryusaki/mitreka-ui/vue'
              const country = ref&lt;string|number|null&gt;(null)
              const countries = [{ value:'id', label:'Indonesia' }, ...]
              &lt;/script>

              &lt;template>
                &lt;SelectInput
                  v-model="country"
                  :options="countries"
                  placeholder="Choose country..."
                  clearable
                  size="md"
                  color="primary"
                /&gt;
              &lt;/template>
            </code>
          </pre>
        </details>
      </section>

      <!-- Multi Select -->
      <section id="multi-select" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="font-semibold opacity-90">Multi Select (chips + search)</h3>
        <MultiSelect
          v-model="roles"
          :options="roleOptions"
          placeholder="Choose roles..."
        />
        <div class="text-xs opacity-70 mt-2">
          Values: <code>{{ roles }}</code>
        </div>

        <details class="mt-4">
          <summary class="cursor-pointer text-sm font-medium">
            Markup contoh (MultiSelect)
          </summary>
          <pre v-pre class="code mt-3"><code>&lt;script setup lang="ts">
import { MultiSelect } from '@keiryusaki/mitreka-ui/vue'
const roles = ref&lt;Array&lt;string|number&gt;&gt;([])
const roleOptions = [
  { value:'admin', label:'Admin' },
  { value:'pm', label:'Project Manager' },
]
&lt;/script>

&lt;template&gt;
  &lt;MultiSelect v-model="roles" :options="roleOptions" placeholder="Choose roles..." /&gt;
&lt;/template&gt;</code></pre>
        </details>
      </section>

      <!-- Developer Guide -->
      <section id="dev-guide" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="font-semibold">Developer Guide</h3>
        <!-- Download -->
        <details open>
          <summary class="font-medium">
            Install - Select Components
          </summary>
          <div class="mt-3 p-4 rounded bg-base-200 border border-base-300 space-y-2">
            <div class="text-sm font-medium">Package Install</div>
            <pre class="code mt-2"><code>npm i @keiryusaki/mitreka-ui@2.2.27</code></pre>
            <div class="text-sm font-medium mt-3">Vue Import</div>
            <pre class="code mt-2"><code>import { SelectDropdown, SelectInput, MultiSelect } from "@keiryusaki/mitreka-ui/vue"</code></pre>
            <div class="text-sm font-medium mt-3">Optional composable reference</div>
            <ul class="list-disc ml-5 space-y-2 opacity-90">
              <li>
                <a
                  :href="dlUseSelectUrl"
                  download="useSelect.ts"
                  class="btn btn-xs bg-accent text-white"
                >
                  useSelect.ts
                </a>
                <span class="ml-2 text-sm">-> <code>src/composables/useSelect.ts</code></span>
              </li>
            </ul>
          </div>
        </details>

        <!-- Props -->
        <details>
          <summary class="font-medium">Props Reference</summary>
          <div class="mt-3 space-y-4">
            <div>
              <h4 class="font-semibold text-sm mb-2">SelectDropdown</h4>
              <ul class="list-disc ml-5 text-sm space-y-1 opacity-80">
                <li><code>v-model</code> - Selected value (string | number | null)</li>
                <li><code>options</code> - Array of { value, label, disabled? }</li>
                <li><code>placeholder</code> - Placeholder text</li>
                <li><code>size</code> - xs | sm | md | lg | xl</li>
                <li><code>color</code> - default | primary | secondary | accent | info | success | warning | error</li>
                <li><code>variant</code> - solid | outline</li>
                <li><code>disabled</code> - Boolean</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-sm mb-2">SelectInput</h4>
              <ul class="list-disc ml-5 text-sm space-y-1 opacity-80">
                <li><code>v-model</code> - Selected value</li>
                <li><code>options</code> / <code>fetch-options</code> - Local or remote options</li>
                <li><code>debounce-ms</code> - Debounce for remote search</li>
                <li><code>clearable</code> - Show clear button</li>
                <li><code>size</code>, <code>color</code>, <code>disabled</code></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold text-sm mb-2">MultiSelect</h4>
              <ul class="list-disc ml-5 text-sm space-y-1 opacity-80">
                <li><code>v-model</code> - Array of selected values</li>
                <li><code>options</code> / <code>fetch-options</code></li>
                <li><code>placeholder</code>, <code>size</code>, <code>disabled</code></li>
              </ul>
            </div>
          </div>
        </details>
      </section>
    </div>

    <FloatingTOC :items="tocItems" />
  </div>
</template>

<style scoped>
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
