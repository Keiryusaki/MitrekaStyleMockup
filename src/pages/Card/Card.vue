<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/data/Card.vue";

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  cssBasic: `<!-- Basic card dengan CSS class -->
<div class="card p-4">
  <h3 class="font-semibold mb-2">Card Title</h3>
  <p class="text-sm opacity-80">Card content goes here.</p>
</div>`,
  cssWithHeader: `<div class="card">
  <div class="p-4 border-b border-base-300">
    <h3 class="font-semibold">Card Header</h3>
  </div>
  <div class="p-4">
    <p>Card body content</p>
  </div>
</div>`,
  cssWithFooter: `<div class="card">
  <div class="p-4">
    <h3 class="font-semibold mb-2">Card Title</h3>
    <p class="text-sm opacity-80">Card body content</p>
  </div>
  <div class="p-4 border-t border-base-300 flex justify-end gap-2">
    <button class="btn btn-ghost btn-sm">Cancel</button>
    <button class="btn btn-primary btn-sm">Save</button>
  </div>
</div>`,
  cssFull: `<div class="card">
  <!-- Header -->
  <div class="p-4 border-b border-base-300 flex items-center justify-between">
    <h3 class="font-semibold">Card Title</h3>
    <button class="btn btn-ghost btn-sm">Action</button>
  </div>
  
  <!-- Body -->
  <div class="p-4">
    <p>Card body content goes here.</p>
  </div>
  
  <!-- Footer -->
  <div class="p-4 border-t border-base-300 flex justify-end gap-2">
    <button class="btn btn-ghost btn-sm">Cancel</button>
    <button class="btn btn-primary btn-sm">Save</button>
  </div>
</div>`,
  componentImport: `import Card from "@/components/data/Card.vue";`,
  componentBasic: `<Card>
  <template #title>
    <h3 class="font-semibold">Card Title</h3>
  </template>
  <p>Card content goes here.</p>
</Card>`,
  padding: `<!-- No padding -->
<div class="card">Content</div>

<!-- Small padding -->
<div class="card p-2">Content</div>

<!-- Medium padding (recommended) -->
<div class="card p-4">Content</div>

<!-- Large padding -->
<div class="card p-6">Content</div>

<!-- Responsive padding -->
<div class="card p-4 md:p-6">Content</div>`,
  interactive: `/* Shadow + Lift */
.card-hover-shadow {
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-hover-shadow:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgb(0 0 0 / 0.15);
}

/* Ring effect */
.card-hover-ring {
  border: 2px solid var(--color-base-300);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.card-hover-ring:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

/* Soft background state */
.card-hover-soft-primary {
  transition: background-color 0.2s, border-color 0.2s;
}
.card-hover-soft-primary:hover {
  background-color: color-mix(in srgb, var(--color-primary) 12%, var(--color-base-100));
  border-color: var(--color-primary);
}

/* Scale dengan Tailwind */
<div class="card p-4 hover:scale-[1.02] transition-transform">
  Scale card
</div>`,
  grid: `<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="card p-4">Card 1</div>
  <div class="card p-4">Card 2</div>
  <div class="card p-4">Card 3</div>
</div>`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/data/Card.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Card.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>

<template>
  <div class="space-y-8 pb-12">
    <!-- Header -->
    <header>
      <h1 class="text-2xl font-bold">Card</h1>
      <p class="text-sm opacity-80">
        Komponen container untuk mengelompokkan konten dengan visual yang konsisten.
      </p>
    </header>

    <!-- Download Component -->
    <section class="card p-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download Card.vue
        </button>
      </div>
    </section>

    <!-- CSS Class Basic -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Basic Card (CSS Class)
      </h2>
      <p class="text-sm opacity-80">
        Cara paling simple - gunakan class <code class="code-inline">.card</code> langsung.
      </p>

      <div class="max-w-sm">
        <div class="card p-4">
          <h3 class="font-semibold mb-2">Card Title</h3>
          <p class="text-sm opacity-80">Card content goes here. This is a basic card example.</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssBasic, 'cssBasic')">
          {{ copiedId === 'cssBasic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssBasic }}</code></pre>
      </div>
    </section>

    <!-- Card with Header -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Card with Header
      </h2>

      <div class="max-w-sm">
        <div class="card">
          <div class="p-4 border-b border-base-300">
            <h3 class="font-semibold">Card Header</h3>
          </div>
          <div class="p-4">
            <p class="text-sm opacity-80">Card body content goes here.</p>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssWithHeader, 'cssWithHeader')">
          {{ copiedId === 'cssWithHeader' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssWithHeader }}</code></pre>
      </div>
    </section>

    <!-- Card with Footer -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Card with Footer
      </h2>

      <div class="max-w-sm">
        <div class="card">
          <div class="p-4">
            <h3 class="font-semibold mb-2">Card Title</h3>
            <p class="text-sm opacity-80">Card body content with action buttons below.</p>
          </div>
          <div class="p-4 border-t border-base-300 flex justify-end gap-2">
            <button class="btn btn-ghost btn-sm">Cancel</button>
            <button class="btn btn-primary btn-sm">Save</button>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssWithFooter, 'cssWithFooter')">
          {{ copiedId === 'cssWithFooter' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssWithFooter }}</code></pre>
      </div>
    </section>

    <!-- Full Card -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Full Card (Header + Body + Footer)
      </h2>

      <div class="max-w-md">
        <div class="card">
          <div class="p-4 border-b border-base-300 flex items-center justify-between">
            <h3 class="font-semibold">Settings</h3>
            <button class="btn btn-ghost btn-sm">Edit</button>
          </div>
          <div class="p-4">
            <p class="text-sm opacity-80">Configure your application settings here. Changes will be saved automatically.</p>
          </div>
          <div class="p-4 border-t border-base-300 flex justify-end gap-2">
            <button class="btn btn-ghost btn-sm">Reset</button>
            <button class="btn btn-primary btn-sm">Save Changes</button>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssFull, 'cssFull')">
          {{ copiedId === 'cssFull' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssFull }}</code></pre>
      </div>
    </section>

    <!-- Vue Component -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Vue Component
      </h2>
      <p class="text-sm opacity-80">
        Alternatif menggunakan Vue component dengan slot.
      </p>

      <div class="max-w-sm">
        <Card>
          <template #title>
            <h3 class="font-semibold">Card via Component</h3>
          </template>
          <p class="text-sm opacity-80">Content using Card.vue component with slots.</p>
        </Card>
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

    <!-- Padding Options -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Padding Options
      </h2>

      <div class="flex flex-wrap gap-4">
        <div class="card p-2">
          <span class="text-xs">p-2</span>
        </div>
        <div class="card p-4">
          <span class="text-sm">p-4</span>
        </div>
        <div class="card p-6">
          <span class="text-base">p-6</span>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.padding, 'padding')">
          {{ copiedId === 'padding' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.padding }}</code></pre>
      </div>
    </section>

    <!-- Interactive Cards -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Interactive Cards
      </h2>
      <p class="text-sm opacity-80">
        Tambahkan hover effect untuk card yang clickable.
      </p>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card-interactive-shadow p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Shadow + Lift</h4>
          <p class="text-sm opacity-70">Hover untuk lihat effect</p>
        </div>
        <div class="card-interactive-ring p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Hover Ring</h4>
          <p class="text-sm opacity-70">Hover untuk lihat effect</p>
        </div>
        <div class="card p-4 hover:scale-[1.02] transition-transform cursor-pointer">
          <h4 class="font-semibold mb-1">Scale</h4>
          <p class="text-sm opacity-70">Hover untuk lihat effect</p>
        </div>
        <div class="card-interactive-soft-primary p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Soft Primary</h4>
          <p class="text-sm opacity-70">Hover untuk lihat effect</p>
        </div>
      </div>

      <h3 class="font-medium mt-6 mb-2">Soft Background States</h3>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div class="card-interactive-soft-primary p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Primary</h4>
          <p class="text-xs opacity-70">Soft primary bg</p>
        </div>
        <div class="card-interactive-soft-success p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Success</h4>
          <p class="text-xs opacity-70">Soft success bg</p>
        </div>
        <div class="card-interactive-soft-warning p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Warning</h4>
          <p class="text-xs opacity-70">Soft warning bg</p>
        </div>
        <div class="card-interactive-soft-error p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Error</h4>
          <p class="text-xs opacity-70">Soft error bg</p>
        </div>
        <div class="card-interactive-soft-info p-4 cursor-pointer">
          <h4 class="font-semibold mb-1">Info</h4>
          <p class="text-xs opacity-70">Soft info bg</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.interactive, 'interactive')">
          {{ copiedId === 'interactive' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.interactive }}</code></pre>
      </div>
    </section>

    <!-- Card Grid -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Card Grid Layout
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div class="card p-4">
          <h4 class="font-semibold mb-2">Card 1</h4>
          <p class="text-sm opacity-70">First card in grid</p>
        </div>
        <div class="card p-4">
          <h4 class="font-semibold mb-2">Card 2</h4>
          <p class="text-sm opacity-70">Second card in grid</p>
        </div>
        <div class="card p-4">
          <h4 class="font-semibold mb-2">Card 3</h4>
          <p class="text-sm opacity-70">Third card in grid</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.grid, 'grid')">
          {{ copiedId === 'grid' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.grid }}</code></pre>
      </div>
    </section>

    <!-- Card Variants Preview -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Card Use Cases
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Profile Card -->
        <div class="card p-4">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              JD
            </div>
            <div>
              <h4 class="font-semibold">John Doe</h4>
              <p class="text-sm opacity-60">Software Engineer</p>
            </div>
          </div>
          <p class="text-sm opacity-80">Building awesome things with Vue.js and TypeScript.</p>
        </div>

        <!-- Stats Card -->
        <div class="card p-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm opacity-60">Total Revenue</span>
            <span class="badge badge-success badge-sm">+12%</span>
          </div>
          <p class="text-2xl font-bold">Rp 45.6M</p>
          <p class="text-xs opacity-50 mt-1">Compared to last month</p>
        </div>

        <!-- Action Card -->
        <div class="card p-4">
          <h4 class="font-semibold mb-2">Quick Actions</h4>
          <div class="flex flex-wrap gap-2">
            <button class="btn btn-soft-primary btn-sm">New Project</button>
            <button class="btn btn-soft-success btn-sm">Add User</button>
            <button class="btn btn-soft-info btn-sm">Reports</button>
          </div>
        </div>

        <!-- Info Card -->
        <div class="card p-4 border-l-4 border-info">
          <h4 class="font-semibold text-info mb-1">Information</h4>
          <p class="text-sm opacity-80">This is an informational card with accent border.</p>
        </div>
      </div>
    </section>

    <!-- Styling Reference -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Styling Reference
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
              <td class="px-4 py-2"><code class="code-inline">.card</code></td>
              <td class="px-4 py-2">Base card styling (background, border-radius, shadow)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.p-4</code></td>
              <td class="px-4 py-2">Standard padding (16px)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.border-b</code></td>
              <td class="px-4 py-2">Bottom border untuk header</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.border-t</code></td>
              <td class="px-4 py-2">Top border untuk footer</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.border-base-300</code></td>
              <td class="px-4 py-2">Border color yang sesuai theme</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">.hover:shadow-lg</code></td>
              <td class="px-4 py-2">Shadow on hover untuk interactive card</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Component Props -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Vue Component Slots
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
              <td class="px-4 py-2">Konten utama card</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">#title</code></td>
              <td class="px-4 py-2">Header/title card (dengan margin bottom)</td>
            </tr>
          </tbody>
        </table>
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

/* Interactive card variants */
.card-interactive-shadow {
  background-color: var(--color-base-100);
  color: var(--color-base-content);
  border: var(--border) solid var(--color-base-300);
  border-radius: var(--radius-box);
  box-shadow: 0 1px 2px rgb(0 0 0 / 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
}
.card-interactive-shadow:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgb(0 0 0 / 0.15);
}

.card-interactive-ring {
  background-color: var(--color-base-100);
  color: var(--color-base-content);
  border: 2px solid var(--color-base-300);
  border-radius: var(--radius-box);
  transition: border-color 0.2s, box-shadow 0.2s;
}
.card-interactive-ring:hover {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 30%, transparent);
}

/* Soft background states */
.card-interactive-soft-primary,
.card-interactive-soft-success,
.card-interactive-soft-warning,
.card-interactive-soft-error,
.card-interactive-soft-info {
  background-color: var(--color-base-100);
  color: var(--color-base-content);
  border: var(--border) solid var(--color-base-300);
  border-radius: var(--radius-box);
  transition: background-color 0.2s, border-color 0.2s;
}

.card-interactive-soft-primary:hover {
  background-color: color-mix(in srgb, var(--color-primary) 12%, var(--color-base-100));
  border-color: var(--color-primary);
}
.card-interactive-soft-success:hover {
  background-color: color-mix(in srgb, var(--color-success) 12%, var(--color-base-100));
  border-color: var(--color-success);
}
.card-interactive-soft-warning:hover {
  background-color: color-mix(in srgb, var(--color-warning) 12%, var(--color-base-100));
  border-color: var(--color-warning);
}
.card-interactive-soft-error:hover {
  background-color: color-mix(in srgb, var(--color-error) 12%, var(--color-base-100));
  border-color: var(--color-error);
}
.card-interactive-soft-info:hover {
  background-color: color-mix(in srgb, var(--color-info) 12%, var(--color-base-100));
  border-color: var(--color-info);
}
</style>
