<script setup lang="ts">
import { ref } from "vue";
import StatCard from "@/components/data/StatCard.vue";
import PageHeader from "@/components/PageHeader.vue";

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Code snippets
const codes = {
  import: `import StatCard from "@/components/data/StatCard.vue";`,
  basic: `<StatCard icon="👤" label="Total Users" value="1,234" />
<StatCard icon="📦" label="Products" value="567" />
<StatCard icon="💰" label="Revenue" value="Rp 45.6M" />
<StatCard icon="📈" label="Growth" value="+12.5%" />`,
  grid: `<div class="grid grid-cols-2 md:grid-cols-4 gap-4">
  <StatCard icon="👤" label="Users" value="1,234" />
  <StatCard icon="📦" label="Products" value="567" />
  <StatCard icon="💰" label="Revenue" value="Rp 45.6M" />
  <StatCard icon="📈" label="Growth" value="+12.5%" />
</div>`,
  customIcons: `<!-- Dengan emoji -->
<StatCard icon="🎯" label="Targets" value="8/10" />

<!-- Dengan SVG (inline) -->
<StatCard label="Settings" value="Active">
  <template #icon>
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  </template>
</StatCard>`,
  component: `<template>
  <div class="card p-4 flex items-center gap-4">
    <div class="text-2xl">{{ icon }}</div>
    <div>
      <div class="opacity-70 text-sm">{{ label }}</div>
      <div class="text-xl font-semibold">{{ value }}</div>
    </div>
  </div>
</template>

<` + `script setup lang="ts">
defineProps<{ 
  icon?: string; 
  label: string; 
  value: string | number;
}>();
</` + `script>`,
  withTrend: `<!-- Custom StatCard dengan trend indicator -->
<div class="card p-4 flex items-center gap-4">
  <div class="text-2xl">📈</div>
  <div class="flex-1">
    <div class="opacity-70 text-sm">Revenue</div>
    <div class="flex items-center gap-2">
      <span class="text-xl font-semibold">Rp 45.6M</span>
      <span class="text-xs text-success">+12.5%</span>
    </div>
  </div>
</div>`,
};

const downloadFile = async () => {
  try {
    const fileUrl = (await import("@/components/data/StatCard.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "StatCard.vue";
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
      title="StatCard" 
      description="Komponen card untuk menampilkan statistik atau metric di dashboard."
    />

    <!-- Download Component -->
    <section class="card p-4">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="font-semibold">Download Component</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <button class="btn btn-accent btn-sm" @click="downloadFile">
          Download StatCard.vue
        </button>
      </div>
    </section>

    <!-- Import -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Import</h2>
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.import, 'import')">
          {{ copiedId === 'import' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.import }}</code></pre>
      </div>
    </section>

    <!-- Basic Usage -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Basic Usage</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="👤" label="Total Users" value="1,234" />
        <StatCard icon="📦" label="Products" value="567" />
        <StatCard icon="💰" label="Revenue" value="Rp 45.6M" />
        <StatCard icon="📈" label="Growth" value="+12.5%" />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basic, 'basic')">
          {{ copiedId === 'basic' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basic }}</code></pre>
      </div>
    </section>

    <!-- Grid Layout -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Grid Layout</h2>
      <p class="text-sm opacity-80">
        Gunakan grid untuk layout yang responsif.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.grid, 'grid')">
          {{ copiedId === 'grid' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.grid }}</code></pre>
      </div>
    </section>

    <!-- Various Icons -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Various Icons</h2>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="🎯" label="Targets" value="8/10" />
        <StatCard icon="⭐" label="Rating" value="4.8" />
        <StatCard icon="🔔" label="Notifications" value="23" />
        <StatCard icon="✅" label="Completed" value="156" />
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        <StatCard icon="📊" label="Reports" value="42" />
        <StatCard icon="🛒" label="Orders" value="89" />
        <StatCard icon="💳" label="Transactions" value="1,456" />
        <StatCard icon="📅" label="Events" value="12" />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.customIcons, 'customIcons')">
          {{ copiedId === 'customIcons' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.customIcons }}</code></pre>
      </div>
    </section>

    <!-- With Trend -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">With Trend Indicator</h2>
      <p class="text-sm opacity-80">
        Untuk menampilkan trend, bisa extend komponen atau buat custom.
      </p>
      
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div class="card p-4 flex items-center gap-4">
          <div class="text-2xl">📈</div>
          <div class="flex-1">
            <div class="opacity-70 text-sm">Revenue</div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-semibold">Rp 45.6M</span>
              <span class="text-xs text-success">+12.5%</span>
            </div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-4">
          <div class="text-2xl">👤</div>
          <div class="flex-1">
            <div class="opacity-70 text-sm">Users</div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-semibold">1,234</span>
              <span class="text-xs text-success">+5.2%</span>
            </div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-4">
          <div class="text-2xl">📉</div>
          <div class="flex-1">
            <div class="opacity-70 text-sm">Bounce Rate</div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-semibold">32%</span>
              <span class="text-xs text-error">+8.1%</span>
            </div>
          </div>
        </div>
        <div class="card p-4 flex items-center gap-4">
          <div class="text-2xl">⏱️</div>
          <div class="flex-1">
            <div class="opacity-70 text-sm">Avg. Time</div>
            <div class="flex items-center gap-2">
              <span class="text-xl font-semibold">4m 32s</span>
              <span class="text-xs text-warning">-2.3%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.withTrend, 'withTrend')">
          {{ copiedId === 'withTrend' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.withTrend }}</code></pre>
      </div>
    </section>

    <!-- Component Source -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Component Source</h2>
      
      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.component, 'component')">
          {{ copiedId === 'component' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.component }}</code></pre>
      </div>
    </section>

    <!-- Props Reference -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Props Reference</h2>
      
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
              <td class="px-4 py-2"><code class="code-inline">icon</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Emoji atau karakter untuk icon (optional)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">label</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Label/nama metric (required)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">value</code></td>
              <td class="px-4 py-2">string | number</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Nilai metric (required)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Use Cases</h2>
      
      <ul class="list-disc ml-5 space-y-2 text-sm">
        <li><strong>Dashboard Overview:</strong> Menampilkan KPI utama</li>
        <li><strong>Analytics:</strong> Statistik visitor, pageview, dll</li>
        <li><strong>E-commerce:</strong> Total orders, revenue, products</li>
        <li><strong>User Management:</strong> Total users, active users, new signups</li>
        <li><strong>Project Management:</strong> Tasks completed, pending, overdue</li>
      </ul>
    </section>

    <!-- Styling Tips -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Styling Tips</h2>
      
      <ul class="list-disc ml-5 space-y-2 text-sm">
        <li>Gunakan <code class="code-inline">grid-cols-2 md:grid-cols-4</code> untuk responsive layout</li>
        <li>Emoji bekerja dengan baik untuk icon sederhana</li>
        <li>Untuk icon kompleks, gunakan SVG atau icon library</li>
        <li>Tambahkan <code class="code-inline">text-success</code> atau <code class="code-inline">text-error</code> untuk trend indicator</li>
        <li>Komponen sudah menggunakan <code class="code-inline">.card</code> class untuk styling konsisten</li>
      </ul>
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
