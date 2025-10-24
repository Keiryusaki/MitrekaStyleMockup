<template>
  <section class="card flex-row space-y-4 p-6">
    <header class="flex flex-wrap items-center gap-3">
      <h1 class="text-xl font-semibold">Icon Gallery</h1>

      <input
        v-model="q"
        type="text"
        placeholder="Search icon…"
        class="input w-64 max-w-full"
      />

      <label class="flex items-center gap-2 text-sm">
        Size
        <select v-model="sizeKey" class="select h-9">
          <option value="xs">XS (16)</option>
          <option value="sm">SM (20)</option>
          <option value="md">MD (24)</option>
          <option value="lg">LG (28)</option>
          <option value="xl">XL (32)</option>
        </select>
      </label>

      <label class="flex items-center gap-2 text-sm">
        Color class
        <input
          v-model="colorClass"
          type="text"
          class="input w-44"
          placeholder="text-slate-700"
        />
      </label>

      <span class="text-sm opacity-70"> {{ filtered.length }} icon </span>
    </header>

    <div
      class="grid gap-4"
      :class="{
        'grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8': true,
      }"
    >
      <div
        v-for="it in filtered"
        :key="it.name"
        class="group rounded-lg border border-slate-200/60 dark:border-slate-700/60 p-3 hover:border-slate-400/80 dark:hover:border-slate-500/80 transition"
      >
        <!-- preview -->
        <div
          class="mx-auto flex h-12 w-full items-center justify-center"
          v-html="injectClass(it.svg, sizeClass + ' ' + colorClass)"
        />

        <!-- name + actions -->
        <div class="mt-2 flex-row items-center text-center gap-2">
          <button
            class="truncate text-xs hover:underline mb-2"
            @click="copyName(it.name)"
            :title="`Click to copy: ${it.name}`"
          >
            {{ it.name }}
          </button>

          <div class="flex items-center justify-center gap-1 transition">
            <button
              class="btn btn-soft-primary btn-xs p-[3%]"
              :title="`Copy usage: <Icon name='${it.name}' />`"
              @click="copyUsage(it.name)"
            >
              &lt;Icon&gt;
            </button>
            <button
              class="btn btn-primary btn-xs p-[3%]"
              :title="'Copy SVG'"
              @click="copySvg(it.svg)"
            >
              &lt;svg&gt;
            </button>
          </div>
        </div>
      </div>
    </div>

    <details class="rounded-box border border-base-300 p-3">
      <summary class="cursor-pointer text-sm font-medium">
        Markup contoh (Icon di Button)
      </summary>
      <pre
        class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"
      ><code>&lt;!-- Icon only --&gt;
&lt;button class=&quot;btn btn-ghost&quot;&gt;
  &lt;Icon name=&quot;home&quot; class=&quot;w-5 h-5&quot; /&gt;
&lt;/button&gt;

&lt;!-- Icon + text (kiri) --&gt;
&lt;button class=&quot;btn btn-primary inline-flex items-center gap-2&quot;&gt;
  &lt;Icon name=&quot;users&quot; class=&quot;w-5 h-5&quot; /&gt;
  Users
&lt;/button&gt;

&lt;!-- Icon + text (kanan) --&gt;
&lt;button class=&quot;btn btn-outline inline-flex items-center gap-2&quot;&gt;
  Settings
  &lt;Icon name=&quot;settings&quot; class=&quot;w-5 h-5&quot; /&gt;
&lt;/button&gt;

&lt;!-- Varian warna --&gt;
&lt;button class=&quot;btn btn-warning inline-flex items-center gap-2&quot;&gt;
  &lt;Icon name=&quot;edit&quot; class=&quot;w-5 h-5&quot; /&gt;
  Edit
&lt;/button&gt;

&lt;button class=&quot;btn btn-error inline-flex items-center gap-2&quot;&gt;
  &lt;Icon name=&quot;delete&quot; class=&quot;w-5 h-5&quot; /&gt;
  Delete
&lt;/button&gt;</code></pre>
    </details>

    <!-- Demo ukuran & warna -->
    <div class="flex flex-wrap items-center gap-4">
      <div class="flex items-center gap-3">
        <Icon name="home" class="w-4 h-4 text-slate-600" />
        <Icon name="home" class="w-5 h-5 text-slate-700" />
        <Icon name="home" class="w-6 h-6 text-slate-800" />
        <Icon name="home" class="w-8 h-8 text-primary" />
      </div>
    </div>

    <!-- Markup contoh ukuran & warna -->
    <details class="rounded-box border border-base-300 p-3">
      <summary class="cursor-pointer text-sm font-medium">
        Markup contoh (Ukuran &amp; Warna)
      </summary>
      <pre
        class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"
      ><code>&lt;Icon name=&quot;home&quot; class=&quot;w-4 h-4 text-slate-600&quot; /&gt;
&lt;Icon name=&quot;home&quot; class=&quot;w-5 h-5 text-slate-700&quot; /&gt;
&lt;Icon name=&quot;home&quot; class=&quot;w-6 h-6 text-slate-800&quot; /&gt;
&lt;Icon name=&quot;home&quot; class=&quot;w-8 h-8 text-primary&quot; /&gt;</code></pre>
    </details>

    <!-- Markup contoh imperatif (AG Grid / DOM manual) -->
    <details class="rounded-box border border-base-300 p-3">
      <summary class="cursor-pointer text-sm font-medium">
        Markup contoh (Imperatif / AG Grid)
      </summary>
      <pre
        class="mt-2 overflow-x-auto rounded-box bg-base-200 p-3 text-xs"
      ><code>// gunakan iconRegistry untuk sisipkan SVG ke innerHTML
import { iconRegistry } from &quot;@/composables/Icon&quot;;

const toSvg = (name, cls = &quot;w-5 h-5 text-white&quot;) =&gt;
  iconRegistry[name]?.replace(&quot;&lt;svg&quot;, `&lt;svg class=&quot;${cls}&quot;` ) ?? &quot;&quot;;

const mkBtn = (cls, title, action /* &quot;edit&quot; | &quot;delete&quot; */) =&gt; {
  const b = document.createElement(&quot;button&quot;);
  b.type = &quot;button&quot;;
  b.className = `btn ${cls} btn-sm inline-flex items-center justify-center`;
  b.title = title;
  b.innerHTML = action === &quot;edit&quot; ? toSvg(&quot;edit&quot;) : toSvg(&quot;delete&quot;);
  b.addEventListener(&quot;click&quot;, (e) =&gt; e.stopPropagation());
  return b;
};</code></pre>
    </details>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { iconRegistry } from "@/composables/Icon";

const q = ref("");
const sizeKey = ref<"xs" | "sm" | "md" | "lg" | "xl">("md");
const colorClass = ref("text-error");

// map ukuran ke utility
const sizeClass = computed(() => {
  switch (sizeKey.value) {
    case "xs":
      return "w-4 h-4";
    case "sm":
      return "w-5 h-5";
    case "md":
      return "w-6 h-6";
    case "lg":
      return "w-7 h-7";
    case "xl":
      return "w-8 h-8";
  }
});

// list icon dari registry
type IconName = keyof typeof iconRegistry;
type Item = { name: IconName; svg: string };

const items = computed<Item[]>(() =>
  (Object.keys(iconRegistry) as IconName[]).map((k) => ({
    name: k,
    svg: iconRegistry[k],
  }))
);

// filter by search
const filtered = computed(() => {
  const s = q.value.trim().toLowerCase();
  if (!s) return items.value;
  return items.value.filter((i) => i.name.toLowerCase().includes(s));
});

// inject class ke tag <svg ...> supaya warna/ukuran nempel
function injectClass(svg: string, cls: string) {
  if (!svg) return "";
  // kalau sudah ada class di <svg>, tetap merge — simple approach
  return svg.replace("<svg", `<svg class="${cls}"`);
}

// clipboard helpers
async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    // fallback: prompt (jarang perlu)
    window.prompt("Copy to clipboard:", text);
  }
}
function copyName(name: string) {
  copy(name);
}
function copyUsage(name: string) {
  copy(`<Icon name="${name}" />`);
}
function copySvg(svg: string) {
  // ikutkan class aktif sekarang agar konsisten saat di-paste
  copy(injectClass(svg, `${sizeClass.value} ${colorClass.value}`));
}
</script>
