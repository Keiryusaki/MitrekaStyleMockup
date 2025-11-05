<!-- src/pages/SelectOption.vue -->
<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from "vue";
import { Icon } from "@/composables/Icon";
import useSelectRaw from "@/composables/useSelect.ts?raw";
import selectInputRaw from "@/components/controls/SelectInput.vue?raw";
import multiSelectRaw from "@/components/controls/MultiSelect.vue?raw";

const _blobUrls: string[] = [];
function makeDownloadUrl(code: string, mime = "text/plain") {
  const url = URL.createObjectURL(new Blob([code], { type: mime }));
  _blobUrls.push(url);
  return url;
}

// URL + filename
const dlUseSelectUrl = makeDownloadUrl(useSelectRaw, "text/typescript");
const dlSelectInputUrl = makeDownloadUrl(selectInputRaw, "text/plain"); // .vue
const dlMultiSelectUrl = makeDownloadUrl(multiSelectRaw, "text/plain"); // .vue

onBeforeUnmount(() => _blobUrls.forEach((u) => URL.revokeObjectURL(u)));

/* ====== DEMO: data umum untuk <select> native (solid/outline) ====== */
type Size = "xs" | "sm" | "md" | "lg" | "xl";
type StyleKind = "solid" | "outline";
const size = ref<Size>("md");
const styleKind = ref<StyleKind>("solid");
const disabled = ref(false);
const withIconLeading = ref(false);
const withIconTrailing = ref(false);

const sizes: Size[] = ["xs", "sm", "md", "lg", "xl"];
const colors = [
  "default",
  "primary",
  "secondary",
  "accent",
  "info",
  "success",
  "warning",
  "error",
] as const;

const options = [
  { value: "", label: "Choose…" },
  { value: "id", label: "Indonesia" },
  { value: "sg", label: "Singapore" },
  { value: "my", label: "Malaysia" },
  { value: "th", label: "Thailand" },
];
const sizeClass: Record<Size, string> = {
  xs: "select-xs",
  sm: "select-sm",
  md: "select-md",
  lg: "select-lg",
  xl: "select-xl",
};
const styleClass = (color: string) =>
  styleKind.value === "outline"
    ? `select select-outline ${color === "default" ? "" : "select-" + color}`
    : color === "default"
    ? "select"
    : `select select-${color}`;
const exampleMarkup = computed(() => {
  const color = "primary";
  const cls =
    styleKind.value === "outline"
      ? `select select-outline select-${color}`
      : `select select-${color}`;
  const sz = sizeClass[size.value];
  const lead = withIconLeading.value
    ? `\n  <span class="absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none">
    <Icon name="search" class="w-4 h-4" />
  </span>`
    : "";
  const trail = withIconTrailing.value
    ? `\n  <span class="absolute inset-y-0 right-0 pr-2 flex items-center opacity-70 pointer-events-none">
    <Icon name="chevron-down" class="w-4 h-4" />
  </span>`
    : "";
  const select = `<select class="${cls} ${sz} w-full" ${
    disabled.value ? "disabled" : ""
  }>
  <option value="">Choose…</option>
  <option value="id">Indonesia</option>
  <option value="sg">Singapore</option>
  <option value="my">Malaysia</option>
  <option value="th">Thailand</option>
</select>`;
  return withIconLeading.value || withIconTrailing.value
    ? `<div class="relative">\n${lead}\n  ${select}\n${trail}\n</div>`
    : select;
});

/* ====== DEMO: komponen SelectInput & MultiSelect ====== */
/* NOTE: pastikan file2 di bawah ada. Lihat "Developer Guide" di akhir. */
import SelectInput from "@/components/controls/SelectInput.vue";
import MultiSelect from "@/components/controls/MultiSelect.vue";

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
</script>

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header class="space-y-1">
      <h1 class="text-xl font-semibold">Selection Controls · Select</h1>
      <p class="text-sm opacity-80">
        Native select (Solid & Outline) + komponen Select dengan Search & Multi
        Select.
      </p>
    </header>

    <div class="card p-4 md:p-6 space-y-5">
      <!-- Controls untuk DEMO native select -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Style</span>
            <div class="inline-flex overflow-hidden rounded-lg">
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': styleKind === 'solid' }"
                @click="styleKind = 'solid'"
              >
                Solid
              </button>
              <button
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': styleKind === 'outline' }"
                @click="styleKind = 'outline'"
              >
                Outline
              </button>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Size</span>
            <div class="inline-flex overflow-hidden rounded-lg">
              <button
                v-for="s in sizes"
                :key="s"
                class="btn btn-sm rounded-none first:rounded-l-lg last:rounded-r-lg"
                :class="{ 'btn-primary': size === s }"
                @click="size = s"
              >
                {{ s }}
              </button>
            </div>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              class="toggle toggle-sm"
              v-model="withIconLeading"
            />
            Leading icon
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              class="toggle toggle-sm"
              v-model="withIconTrailing"
            />
            Trailing icon
          </label>
          <label class="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              class="toggle toggle-sm"
              v-model="disabled"
            />
            Disabled
          </label>
        </div>
      </section>

      <!-- Playground -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="font-semibold opacity-90">Playground</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label class="text-xs opacity-70">Default</label>
            <div
              class="mt-1"
              :class="{ relative: withIconLeading || withIconTrailing }"
            >
              <span
                v-if="withIconLeading"
                class="absolute inset-y-0 left-0 pl-2 flex items-center opacity-70 pointer-events-none"
              >
                <Icon name="search" class="w-4 h-4" />
              </span>
              <select
                :disabled="disabled"
                :class="[
                  sizeClass[size],
                  styleClass('default'),
                  'w-full',
                  withIconLeading ? 'pl-7' : '',
                  withIconTrailing ? 'pr-7' : '',
                ]"
              >
                <option
                  v-for="opt in options"
                  :key="opt.value"
                  :value="opt.value"
                >
                  {{ opt.label }}
                </option>
              </select>
              <span
                v-if="withIconTrailing"
                class="absolute inset-y-0 right-0 pr-2 flex items-center opacity-70 pointer-events-none"
              >
                <Icon name="chevron-down" class="w-4 h-4" />
              </span>
            </div>
          </div>

          <div>
            <label class="text-xs opacity-70">Primary</label>
            <select
              :disabled="disabled"
              class="w-full"
              :class="[sizeClass[size], styleClass('primary')]"
            >
              <option
                v-for="opt in options"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- SOLID list -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="font-semibold opacity-90">SOLID</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="c in colors" :key="'solid-' + c" class="space-y-1">
            <div class="text-xs opacity-70 capitalize">{{ c }}</div>
            <select
              :class="[
                'w-full',
                sizeClass[size],
                c === 'default' ? 'select' : 'select select-' + c,
              ]"
            >
              <option
                v-for="opt in options"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- OUTLINE list -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="font-semibold opacity-90">OUTLINE</h3>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div v-for="c in colors" :key="'outline-' + c" class="space-y-1">
            <div class="text-xs opacity-70 capitalize">{{ c }}</div>
            <select
              :class="[
                'w-full',
                sizeClass[size],
                'select select-outline',
                c === 'default' ? '' : 'select-' + c,
              ]"
            >
              <option
                v-for="opt in options"
                :key="opt.value"
                :value="opt.value"
              >
                {{ opt.label }}
              </option>
            </select>
          </div>
        </div>
      </section>

      <!-- Select dengan Search (SelectInput) -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="font-semibold opacity-90">
          Select dengan Search (SelectInput)
        </h3>
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
          <pre v-pre class="code mt-3"><code>&lt;script setup lang="ts">
import SelectInput from '@/components/controls/SelectInput.vue'
const country = ref&lt;string|number|null&gt;(null)
const countries = [{ value:'id', label:'Indonesia' }, ...]
// optional remote:
// async function fetchCountries(q:string){ return countries.filter(c =&gt; c.label.toLowerCase().includes(q.toLowerCase())) }
&lt;/script>

&lt;template>
  &lt;SelectInput
    v-model="country"
    :options="countries"            // atau pakai :fetch-options="fetchCountries"
    placeholder="Choose country..."
    clearable
    size="md"
    color="primary"
  /&gt;
&lt;/template></code></pre>
        </details>
      </section>

      <!-- Multi Select -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
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
import MultiSelect from '@/components/controls/MultiSelect.vue'
const roles = ref&lt;Array&lt;string|number&gt;&gt;([])
const roleOptions = [
  { value:'admin', label:'Admin' },
  { value:'pm', label:'Project Manager' },
  { value:'dev', label:'Developer' },
  { value:'qa', label:'QA' },
]
&lt;/script>

&lt;template&gt;
  &lt;MultiSelect v-model="roles" :options="roleOptions" placeholder="Choose roles..." /&gt;
&lt;/template&gt;</code></pre>
        </details>
      </section>

      <!-- Developer Guide -->
      <section class="space-y-3 rounded-box border border-base-300 p-4">
        <h3 class="font-semibold">Developer Guide</h3>

        <!-- Download -->
        <details open>
          <summary class="font-medium">
            Install · Select (composable & components)
          </summary>
          <div
            class="mt-3 p-4 rounded bg-base-200 border border-base-300 space-y-2"
          >
            <div class="text-sm font-medium">Download</div>
            <ul class="list-disc ml-5 space-y-2">
              <li>
                <a
                  :href="dlUseSelectUrl"
                  download="useSelect.ts"
                  class="btn btn-xs bg-accent text-white"
                >
                  useSelect.ts
                </a>
                <span class="ml-2 text-sm"
                  >→ simpan ke <code>src/composables/useSelect.ts</code></span
                >
              </li>
              <li>
                <a
                  :href="dlSelectInputUrl"
                  download="SelectInput.vue"
                  class="btn btn-xs bg-accent text-white"
                >
                  SelectInput.vue
                </a>
                <span class="ml-2 text-sm"
                  >→ simpan ke
                  <code>src/components/controls/SelectInput.vue</code></span
                >
              </li>
              <li>
                <a
                  :href="dlMultiSelectUrl"
                  download="MultiSelect.vue"
                  class="btn btn-xs bg-accent text-white"
                >
                  MultiSelect.vue
                </a>
                <span class="ml-2 text-sm"
                  >→ simpan ke
                  <code>src/components/controls/MultiSelect.vue</code></span
                >
              </li>
            </ul>
            <p class="text-xs opacity-70 mt-2">
              Catatan: di produk, sebaiknya file-file ini disimpan di repo
              kalian dan tombol download diarahkan ke URL raw file git.
            </p>
          </div>
        </details>

        <!-- Langkah-langkah (tetap sama seperti sebelumnya) -->
        <ol
          class="list-decimal ml-6 space-y-6 marker:font-medium marker:opacity-70"
        >
          <li>
            <h4 class="font-semibold mb-2">Struktur folder</h4>
            <pre v-pre class="code"><code>src/
├─ composables/
│  └─ useSelect.ts
└─ components/
   └─ controls/
      ├─ SelectInput.vue
      └─ MultiSelect.vue</code></pre>
          </li>
          <li>
            <h4 class="font-semibold mb-2">Pakai di halaman</h4>
            <pre v-pre class="code"><code>&lt;script setup lang="ts">
import SelectInput from '@/components/controls/SelectInput.vue'
import MultiSelect from '@/components/controls/MultiSelect.vue'

const country = ref&lt;string|number|null&gt;(null)
const countries = [{ value:'id', label:'Indonesia' }, { value:'sg', label:'Singapore' }]
const roles = ref&lt;Array&lt;string|number&gt;&gt;([])
const roleOptions = [{ value:'admin', label:'Admin' }, { value:'dev', label:'Developer' }]
&lt;/script>

&lt;template&gt;
  &lt;SelectInput v-model="country" :options="countries" clearable color="primary" /&gt;
  &lt;MultiSelect v-model="roles" :options="roleOptions" class="mt-4" /&gt;
&lt;/template&gt;</code></pre>
          </li>
          <li>
            <h4 class="font-semibold mb-2">Props ringkas</h4>
            <ul class="list-disc ml-5 text-sm space-y-1">
              <li>
                <code>SelectInput</code>: <code>v-model</code>,
                <code>options</code> / <code>fetch-options(query)</code>,
                <code>debounce-ms</code>, <code>placeholder</code>,
                <code>clearable</code>, <code>disabled</code>,
                <code>size</code>, <code>color</code>.
              </li>
              <li>
                <code>MultiSelect</code>: <code>v-model:Array</code>,
                <code>options</code>/<code>fetch-options</code>,
                <code>placeholder</code>, <code>disabled</code>,
                <code>size</code>.
              </li>
            </ul>
          </li>
        </ol>
      </section>
    </div>
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
