<script setup lang="ts">
import { ref, computed } from "vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";
import Input from "@/components/controls/Input.vue";
import TextareaInput from "@/components/controls/TextareaInput.vue";

const tocItems: TOCItem[] = [
  { id: "controls", label: "Controls" },
  { id: "playground", label: "Playground" },
  { id: "component-api", label: "Input API" },
  { id: "textarea", label: "Textarea" },
  { id: "sizes", label: "Sizes" },
  { id: "states", label: "States" },
];

type Size = "xs" | "sm" | "md" | "lg" | "xl";
type Tone =
  | "default"
  | "primary"
  | "secondary"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "error";

const size = ref<Size>("md");
const tone = ref<Tone>("default");
const disabled = ref(false);
const readonly = ref(false);

const basicValue = ref("");
const searchValue = ref("");
const emailValue = ref("");
const clearableValue = ref("Able to clear");
const passwordValue = ref("secret123");
const groupValue = ref("");

const textareaValue = ref("");
const textareaResizableValue = ref("");
const textareaVerticalValue = ref("");
const textareaHorizontalValue = ref("");
const textareaRowsLargeValue = ref("");

const sizeClass = computed(() =>
  size.value === "md" ? "input-md" : `input-${size.value}`
);
const toneClass = computed(() => (tone.value === "default" ? "" : `input-${tone.value}`));

const tones: { label: string; tone: Tone }[] = [
  { label: "Default", tone: "default" },
  { label: "Primary", tone: "primary" },
  { label: "Secondary", tone: "secondary" },
  { label: "Accent", tone: "accent" },
  { label: "Info", tone: "info" },
  { label: "Success", tone: "success" },
  { label: "Warning", tone: "warning" },
  { label: "Error", tone: "error" },
];
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Components"
      title="Input"
      description="Base input + icon, clearable, password toggle, dan input-group addon untuk form yang lebih konsisten."
    />

    <div class="card p-4 md:p-6 space-y-5">
      <section id="controls" class="rounded-box border border-base-300 p-4 scroll-mt-20">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">State</span>
            <div class="join">
              <button
                v-for="t in tones"
                :key="t.tone"
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': tone === t.tone }"
                @click="tone = t.tone"
              >
                {{ t.label }}
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Size</span>
            <div class="join">
              <button class="btn btn-sm join-item" :class="{ 'btn-primary': size === 'xs' }" @click="size = 'xs'">xs</button>
              <button class="btn btn-sm join-item" :class="{ 'btn-primary': size === 'sm' }" @click="size = 'sm'">sm</button>
              <button class="btn btn-sm join-item" :class="{ 'btn-primary': size === 'md' }" @click="size = 'md'">md</button>
              <button class="btn btn-sm join-item" :class="{ 'btn-primary': size === 'lg' }" @click="size = 'lg'">lg</button>
              <button class="btn btn-sm join-item" :class="{ 'btn-primary': size === 'xl' }" @click="size = 'xl'">xl</button>
            </div>
          </div>

          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" v-model="disabled" />
            <span class="text-sm">Disabled</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" v-model="readonly" />
            <span class="text-sm">Read-only</span>
          </label>
        </div>
      </section>

      <section id="playground" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h2 class="text-base font-semibold">Playground</h2>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <label class="space-y-1">
            <span class="text-xs opacity-70">Basic</span>
            <Input v-model="basicValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" placeholder="Type something..." />
          </label>

          <label class="space-y-1">
            <span class="text-xs opacity-70">With leading icon</span>
            <Input v-model="searchValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" prefix-icon="search" placeholder="Search..." />
          </label>

          <label class="space-y-1">
            <span class="text-xs opacity-70">With trailing icon</span>
            <Input v-model="emailValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" suffix-icon="mail" placeholder="Email" />
          </label>

          <label class="space-y-1">
            <span class="text-xs opacity-70">Clearable</span>
            <Input v-model="clearableValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" clearable placeholder="Type to show clear" />
          </label>

          <label class="space-y-1">
            <span class="text-xs opacity-70">Password toggle</span>
            <Input v-model="passwordValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" type="password" password-toggle placeholder="Password" />
          </label>

          <label class="space-y-1">
            <span class="text-xs opacity-70">Input group / addon</span>
            <Input v-model="groupValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" addon-left="https://" addon-right=".com" placeholder="your-domain" />
          </label>
        </div>
      </section>

      <section id="component-api" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h2 class="text-base font-semibold">Input API</h2>
        <pre class="bg-base-200 rounded-field p-3 overflow-x-auto text-xs"><code>{{ `<Input
  v-model="value"
  size="md"
  color="default"
  prefix-icon="search"
  suffix-icon="mail"
  clearable
  type="password"
  password-toggle
  addon-left="https://"
  addon-right=".com"
/>` }}</code></pre>
      </section>

      <section id="textarea" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h2 class="text-base font-semibold">Textarea</h2>
        <div class="space-y-3">
          <label class="space-y-1">
            <span class="text-xs opacity-70">Rows awal (rows = 6)</span>
            <TextareaInput v-model="textareaRowsLargeValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" :rows="6" resize="vertical" placeholder="Default tinggi mengikuti rows..." />
          </label>
          <label class="space-y-1">
            <span class="text-xs opacity-70">Default (non-resizable)</span>
            <TextareaInput v-model="textareaValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" :maxlength="200" :rows="4" resize="none" show-counter placeholder="Type a longer message..." />
          </label>
          <label class="space-y-1">
            <span class="text-xs opacity-70">Resizable (both)</span>
            <TextareaInput v-model="textareaResizableValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" :rows="4" resize="both" placeholder="Drag from corner..." />
          </label>
          <label class="space-y-1">
            <span class="text-xs opacity-70">Resize vertical only</span>
            <TextareaInput v-model="textareaVerticalValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" :rows="4" resize="vertical" placeholder="Resize up/down only..." />
          </label>
          <label class="space-y-1">
            <span class="text-xs opacity-70">Resize horizontal only</span>
            <TextareaInput v-model="textareaHorizontalValue" :size="size" :color="tone" :disabled="disabled" :readonly="readonly" :rows="4" resize="horizontal" placeholder="Resize left/right only..." />
          </label>
        </div>
      </section>

      <section id="sizes" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">Sizes</h3>
        <div class="flex flex-wrap items-end gap-3">
          <input class="input input-xs" placeholder="input-xs" />
          <input class="input input-sm" placeholder="input-sm" />
          <input class="input" placeholder="input-md (default)" />
          <input class="input input-lg" placeholder="input-lg" />
          <input class="input input-xl" placeholder="input-xl" />
        </div>
      </section>

      <section id="states" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">States</h3>
        <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <input class="input" placeholder="Default" />
          <input class="input input-primary" placeholder="Primary" />
          <input class="input input-secondary" placeholder="Secondary" />
          <input class="input input-accent" placeholder="Accent" />
          <input class="input input-info" placeholder="Info" />
          <input class="input input-success" placeholder="Success" />
          <input class="input input-warning" placeholder="Warning" />
          <input class="input input-error" placeholder="Error" />
        </div>
      </section>
    </div>

    <FloatingTOC :items="tocItems" />
  </div>
</template>
