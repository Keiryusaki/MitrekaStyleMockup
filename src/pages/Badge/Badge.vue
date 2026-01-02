<script setup lang="ts">
import { ref, computed } from "vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const tocItems: TOCItem[] = [
  { id: 'controls', label: 'Controls' },
  { id: 'playground', label: 'Playground' },
  { id: 'solid', label: 'Solid' },
  { id: 'outline', label: 'Outline' },
  { id: 'soft', label: 'Soft' },
  { id: 'notes', label: 'Notes' },
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
const styleType = ref<"solid" | "outline" | "soft">("solid");

const sizeClass = computed(() =>
  size.value === "md" ? "badge-md" : `badge-${size.value}`
);

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

const solidClass = (t: Tone) =>
  t === "default" ? "badge" : `badge badge-${t}`;
const outlineClass = (t: Tone) =>
  t === "default"
    ? "badge badge-outline"
    : `badge badge-outline badge-outline-${t}`;
const softClass = (t: Tone) =>
  t === "default" ? "badge" : `badge badge-soft-${t}`;

const classes = (t: Tone) =>
  styleType.value === "solid"
    ? solidClass(t)
    : styleType.value === "outline"
    ? outlineClass(t)
    : softClass(t);
</script>

<template>
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Badge" 
      description="Solid, Outline, Soft. 7 warna, 5 ukuran (xs-xl). Kelas diambil dari theme CSS."
    />

    <div class="card p-4 md:p-6 space-y-5">
      <!-- Controls -->
      <section id="controls" class="rounded-box border border-base-300 p-4 scroll-mt-20">
        <div class="flex flex-wrap items-center gap-4">
          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Style</span>
            <div class="join">
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': styleType === 'solid' }"
                @click="styleType = 'solid'"
              >
                Solid
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': styleType === 'outline' }"
                @click="styleType = 'outline'"
              >
                Outline
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': styleType === 'soft' }"
                @click="styleType = 'soft'"
              >
                Soft
              </button>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="text-sm opacity-80">Size</span>
            <div class="join">
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'xs' }"
                @click="size = 'xs'"
              >
                xs
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'sm' }"
                @click="size = 'sm'"
              >
                sm
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'md' }"
                @click="size = 'md'"
              >
                md
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'lg' }"
                @click="size = 'lg'"
              >
                lg
              </button>
              <button
                class="btn btn-sm join-item"
                :class="{ 'btn-primary': size === 'xl' }"
                @click="size = 'xl'"
              >
                xl
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- Playground -->
      <section id="playground" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h2 class="text-base font-semibold">Playground</h2>
        <div
          class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        >
          <span
            v-for="t in tones"
            :key="t.tone + styleType + size"
            :class="[classes(t.tone), sizeClass]"
          >
            {{ t.label }}
            <span v-if="styleType !== 'solid'">· {{ styleType }}</span>
          </span>
        </div>
      </section>

      <!-- Reference: Solid -->
      <section id="solid" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Solid
        </h3>
        <div class="flex flex-wrap gap-3">
          <span class="badge" :class="sizeClass">Default</span>
          <span class="badge badge-primary" :class="sizeClass">Primary</span>
          <span class="badge badge-secondary" :class="sizeClass"
            >Secondary</span
          >
          <span class="badge badge-accent" :class="sizeClass">Accent</span>
          <span class="badge badge-info" :class="sizeClass">Info</span>
          <span class="badge badge-success" :class="sizeClass">Success</span>
          <span class="badge badge-warning" :class="sizeClass">Warning</span>
          <span class="badge badge-error" :class="sizeClass">Error</span>
        </div>
      </section>

      <!-- Reference: Outline -->
      <section id="outline" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Outline
        </h3>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-outline" :class="sizeClass">Outline</span>
          <span
            class="badge badge-outline badge-outline-primary"
            :class="sizeClass"
            >Primary</span
          >
          <span
            class="badge badge-outline badge-outline-secondary"
            :class="sizeClass"
            >Secondary</span
          >
          <span
            class="badge badge-outline badge-outline-accent"
            :class="sizeClass"
            >Accent</span
          >
          <span
            class="badge badge-outline badge-outline-info"
            :class="sizeClass"
            >Info</span
          >
          <span
            class="badge badge-outline badge-outline-success"
            :class="sizeClass"
            >Success</span
          >
          <span
            class="badge badge-outline badge-outline-warning"
            :class="sizeClass"
            >Warning</span
          >
          <span
            class="badge badge-outline badge-outline-error"
            :class="sizeClass"
            >Error</span
          >
        </div>
      </section>

      <!-- Reference: Soft -->
      <section id="soft" class="space-y-3 rounded-box border border-base-300 p-4 scroll-mt-20">
        <h3 class="text-sm font-semibold uppercase tracking-wide opacity-70">
          Soft
        </h3>
        <div class="flex flex-wrap gap-3">
          <span class="badge badge-soft-primary" :class="sizeClass"
            >Primary</span
          >
          <span class="badge badge-soft-secondary" :class="sizeClass"
            >Secondary</span
          >
          <span class="badge badge-soft-accent" :class="sizeClass">Accent</span>
          <span class="badge badge-soft-info" :class="sizeClass">Info</span>
          <span class="badge badge-soft-success" :class="sizeClass"
            >Success</span
          >
          <span class="badge badge-soft-warning" :class="sizeClass"
            >Warning</span
          >
          <span class="badge badge-soft-error" :class="sizeClass">Error</span>
        </div>
      </section>

      <!-- Notes -->
      <section id="notes" class="rounded-box border border-base-300 p-4 text-sm scroll-mt-20">
        <ul class="list-disc space-y-1 pl-5">
          <li>
            <code>.badge</code> adalah base; default warna pakai
            <code>--color-base-200</code> & content
            <code>--color-base-content</code>.
            :contentReference[oaicite:2]{index=2}
          </li>
          <li>
            Ukuran: <code>.badge-{xs|sm|md|lg|xl}</code> (default md).
            :contentReference[oaicite:3]{index=3}
          </li>
          <li>
            Solid:
            <code
              >.badge-{primary|secondary|accent|info|success|warning|error}</code
            >. :contentReference[oaicite:4]{index=4}
          </li>
          <li>
            Outline: <code>.badge badge-outline</code> +
            <code>.badge-outline-{color}</code>.
            :contentReference[oaicite:5]{index=5}
          </li>
          <li>
            Soft: <code>.badge-soft-{color}</code> (background pastel, teks
            berwarna). :contentReference[oaicite:6]{index=6}
          </li>
        </ul>
      </section>
    </div>

    <FloatingTOC :items="tocItems" />
  </div>
</template>

<style scoped>
/* helper for the “join” segmented control (optional, feel free to remove if you already have one) */
.join {
  display: inline-flex;
  border-radius: 0.5rem;
  overflow: hidden;
}
.join .join-item {
  border-radius: 0;
}
.join .join-item:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
}
.join .join-item:last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}
</style>
