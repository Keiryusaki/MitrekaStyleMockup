<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import Tooltip from "@/components/Tooltip.vue";
import { Icon } from "@/composables/Icon";

const tocItems: TOCItem[] = [
  { id: "basic", label: "Basic Usage" },
  { id: "positions", label: "Positions" },
  { id: "variants", label: "Variants" },
  { id: "delay", label: "Delay" },
  { id: "icon-buttons", label: "Icon Buttons" },
];

const copiedId = ref<string | null>(null);
const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  basic: `<Tooltip text="Ini adalah tooltip">
  <button class="btn btn-primary">Hover me</button>
</Tooltip>`,
  positions: `<Tooltip text="Top" position="top">...</Tooltip>
<Tooltip text="Bottom" position="bottom">...</Tooltip>
<Tooltip text="Left" position="left">...</Tooltip>
<Tooltip text="Right" position="right">...</Tooltip>`,
  variants: `<!-- Auto: sesuai tema (default) -->
<Tooltip text="Auto variant" variant="auto">...</Tooltip>

<!-- Light: selalu terang -->
<Tooltip text="Light variant" variant="light">...</Tooltip>

<!-- Dark: selalu gelap -->
<Tooltip text="Dark variant" variant="dark">...</Tooltip>`,
  delay: `<!-- Default 200ms -->
<Tooltip text="Default delay">...</Tooltip>

<!-- Custom delay 500ms -->
<Tooltip text="Slower" :delay="500">...</Tooltip>

<!-- No delay -->
<Tooltip text="Instant" :delay="0">...</Tooltip>`,
  iconButtons: `<Tooltip text="Tambah User">
  <button class="btn btn-success btn-sm">
    <Icon name="plus" class="w-4 h-4" />
  </button>
</Tooltip>

<Tooltip text="Edit User">
  <button class="btn btn-warning btn-sm">
    <Icon name="pencil" class="w-4 h-4" />
  </button>
</Tooltip>`,
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Components"
      title="Tooltip"
      description="Menampilkan informasi tambahan saat hover. Berguna untuk icon button atau elemen yang butuh penjelasan."
    />

    <!-- Basic Usage -->
    <section id="basic" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      <p class="text-sm opacity-70">Wrap elemen dengan Tooltip dan berikan prop `text`.</p>

      <div class="bg-base-200 rounded-box p-6 flex justify-center">
        <Tooltip text="Ini adalah tooltip">
          <button class="btn btn-primary">Hover me</button>
        </Tooltip>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.basic }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Positions -->
    <section id="positions" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Positions</h2>
      <p class="text-sm opacity-70">Tooltip bisa muncul di 4 posisi: top (default), bottom, left, right.</p>

      <div class="bg-base-200 rounded-box p-8 flex flex-wrap justify-center gap-4">
        <Tooltip text="Tooltip di atas" position="top">
          <button class="btn btn-secondary">Top</button>
        </Tooltip>
        <Tooltip text="Tooltip di bawah" position="bottom">
          <button class="btn btn-secondary">Bottom</button>
        </Tooltip>
        <Tooltip text="Tooltip di kiri" position="left">
          <button class="btn btn-secondary">Left</button>
        </Tooltip>
        <Tooltip text="Tooltip di kanan" position="right">
          <button class="btn btn-secondary">Right</button>
        </Tooltip>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.positions }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.positions, 'positions')">
          {{ copiedId === 'positions' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Variants -->
    <section id="variants" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Variants</h2>
      <p class="text-sm opacity-70">
        3 variant tersedia: <code class="bg-base-200 px-1 rounded">auto</code> (default, sesuai tema), 
        <code class="bg-base-200 px-1 rounded">light</code>, dan <code class="bg-base-200 px-1 rounded">dark</code>.
      </p>

      <div class="bg-base-200 rounded-box p-8 flex flex-wrap justify-center gap-4">
        <Tooltip text="Auto (sesuai tema)" variant="auto">
          <button class="btn btn-outline">Auto</button>
        </Tooltip>
        <Tooltip text="Selalu terang" variant="light">
          <button class="btn btn-outline">Light</button>
        </Tooltip>
        <Tooltip text="Selalu gelap" variant="dark">
          <button class="btn btn-outline">Dark</button>
        </Tooltip>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.variants }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.variants, 'variants')">
          {{ copiedId === 'variants' ? 'Copied!' : 'Copy' }}
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Variant</th>
              <th class="px-4 py-2 text-left">Deskripsi</th>
              <th class="px-4 py-2 text-left">Use Case</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">auto</code></td>
              <td class="px-4 py-2">Kontras dengan tema aktif</td>
              <td class="px-4 py-2">Default, cocok untuk kebanyakan kasus</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">light</code></td>
              <td class="px-4 py-2">Selalu terang (putih)</td>
              <td class="px-4 py-2">Di atas background gelap yang fixed</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">dark</code></td>
              <td class="px-4 py-2">Selalu gelap (hitam)</td>
              <td class="px-4 py-2">Di atas background terang yang fixed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Delay -->
    <section id="delay" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Delay</h2>
      <p class="text-sm opacity-70">Atur delay sebelum tooltip muncul (dalam ms). Default 200ms.</p>

      <div class="bg-base-200 rounded-box p-8 flex flex-wrap justify-center gap-4">
        <Tooltip text="Instant (0ms)" :delay="0">
          <button class="btn btn-accent">No Delay</button>
        </Tooltip>
        <Tooltip text="Default (200ms)">
          <button class="btn btn-accent">Default</button>
        </Tooltip>
        <Tooltip text="Slow (500ms)" :delay="500">
          <button class="btn btn-accent">500ms</button>
        </Tooltip>
        <Tooltip text="Very Slow (1000ms)" :delay="1000">
          <button class="btn btn-accent">1000ms</button>
        </Tooltip>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.delay }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.delay, 'delay')">
          {{ copiedId === 'delay' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Icon Buttons -->
    <section id="icon-buttons" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Icon Buttons dengan Tooltip</h2>
      <p class="text-sm opacity-70">
        Use case utama: icon button yang butuh penjelasan fungsinya. Sangat berguna saat ada beberapa 
        button serupa dengan fungsi berbeda.
      </p>

      <div class="bg-base-200 rounded-box p-6 space-y-6">
        <!-- Table 1 -->
        <div>
          <p class="text-xs opacity-60 mb-3">Tabel: Daftar User</p>
          <div class="flex gap-1">
            <Tooltip text="Tambah User">
              <button class="btn btn-success btn-sm">
                <Icon name="plus" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Edit User">
              <button class="btn btn-warning btn-sm">
                <Icon name="pencil" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Lihat Detail User">
              <button class="btn btn-info btn-sm">
                <Icon name="eye" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Hapus User">
              <button class="btn btn-error btn-sm">
                <Icon name="trash" class="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>

        <!-- Table 2 -->
        <div>
          <p class="text-xs opacity-60 mb-3">Tabel: Daftar Role</p>
          <div class="flex gap-1">
            <Tooltip text="Tambah Role">
              <button class="btn btn-success btn-sm">
                <Icon name="plus" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Edit Role">
              <button class="btn btn-warning btn-sm">
                <Icon name="pencil" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Lihat Detail Role">
              <button class="btn btn-info btn-sm">
                <Icon name="eye" class="w-4 h-4" />
              </button>
            </Tooltip>
            <Tooltip text="Hapus Role">
              <button class="btn btn-error btn-sm">
                <Icon name="trash" class="w-4 h-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.iconButtons }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.iconButtons, 'iconButtons')">
          {{ copiedId === 'iconButtons' ? 'Copied!' : 'Copy' }}
        </button>
      </div>

      <div class="flex items-start gap-2 p-3 bg-success/10 border border-success/20 rounded-lg text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-success shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M20 6 9 17l-5-5"/>
        </svg>
        <span class="opacity-80">
          <strong>Best Practice:</strong> Selalu gunakan Tooltip pada icon-only button untuk aksesibilitas. 
          User harus tahu fungsi tombol tanpa harus mengkliknya.
        </span>
      </div>
    </section>

    <!-- Props Table -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props</h2>
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-base-200">
            <tr>
              <th class="px-4 py-2 text-left">Prop</th>
              <th class="px-4 py-2 text-left">Type</th>
              <th class="px-4 py-2 text-left">Default</th>
              <th class="px-4 py-2 text-left">Deskripsi</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-200">
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">text</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Teks yang ditampilkan di tooltip (required)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">position</code></td>
              <td class="px-4 py-2">"top" | "bottom" | "left" | "right"</td>
              <td class="px-4 py-2">"top"</td>
              <td class="px-4 py-2">Posisi tooltip relatif terhadap elemen</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">variant</code></td>
              <td class="px-4 py-2">"auto" | "light" | "dark"</td>
              <td class="px-4 py-2">"auto"</td>
              <td class="px-4 py-2">Variant warna tooltip</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="bg-base-200 px-1 rounded">delay</code></td>
              <td class="px-4 py-2">number</td>
              <td class="px-4 py-2">200</td>
              <td class="px-4 py-2">Delay sebelum tooltip muncul (ms)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
  </div>
</template>
