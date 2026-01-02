<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/data/Card.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const copiedId = ref<string | null>(null);

const tocItems: TOCItem[] = [
  { id: 'basic-card', label: 'Basic Card (CSS Class)' },
  { id: 'card-header', label: 'Card with Header' },
  { id: 'card-footer', label: 'Card with Footer' },
  { id: 'full-card', label: 'Full Card' },
  { id: 'vue-component', label: 'Vue Component' },
  { id: 'padding-options', label: 'Padding Options' },
  { id: 'interactive-cards', label: 'Interactive Cards' },
  { id: 'card-grid', label: 'Card Grid Layout' },
  { id: 'cover-image', label: 'Card with Cover Image' },
  { id: 'horizontal-card', label: 'Horizontal Card' },
  { id: 'featured-card', label: 'Featured Article Card' },
  { id: 'compact-news', label: 'Compact News Card' },
  { id: 'avatar-variants', label: 'Avatar Variants' },
  { id: 'card-use-cases', label: 'Card Use Cases' },
  { id: 'styling-reference', label: 'Styling Reference' },
  { id: 'collapsible-card', label: 'Collapsible Card' },
  { id: 'vue-slots', label: 'Vue Component Slots' },
];

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
  cardCoverImage: `<!-- Card dengan cover image -->
<div class="card overflow-hidden">
  <img 
    src="/images/sample.jpg" 
    alt="Cover" 
    class="w-full h-48 object-cover"
  />
  <div class="p-4">
    <span class="badge badge-primary badge-sm mb-2">Technology</span>
    <h3 class="font-semibold mb-2">Article Title Goes Here</h3>
    <p class="text-sm opacity-70 line-clamp-2">
      Lorem ipsum dolor sit amet consectetur adipisicing elit.
    </p>
    <div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300">
      <!-- Avatar dengan foto -->
      <img src="/avatar.jpg" alt="Author" class="w-8 h-8 rounded-full object-cover" />
      
      <!-- Atau avatar dengan initials -->
      <!-- <div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">JD</div> -->
      
      <div class="text-xs">
        <p class="font-medium">John Doe</p>
        <p class="opacity-60">Dec 24, 2024</p>
      </div>
    </div>
  </div>
</div>`,
  avatarVariants: `<!-- Avatar dengan foto -->
<img 
  src="https://i.pravatar.cc/32?img=12" 
  alt="User" 
  class="w-8 h-8 rounded-full object-cover"
/>

<!-- Avatar dengan initials (fallback) -->
<div class="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xs font-bold">
  JD
</div>

<!-- Avatar dengan warna berbeda -->
<div class="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success text-xs font-bold">AS</div>
<div class="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-warning text-xs font-bold">BW</div>
<div class="w-8 h-8 rounded-full bg-error/20 flex items-center justify-center text-error text-xs font-bold">MK</div>

<!-- Avatar sizes -->
<img src="..." class="w-6 h-6 rounded-full" />   <!-- Small -->
<img src="..." class="w-8 h-8 rounded-full" />   <!-- Default -->
<img src="..." class="w-10 h-10 rounded-full" /> <!-- Medium -->
<img src="..." class="w-12 h-12 rounded-full" /> <!-- Large -->`,
  cardHorizontal: `<!-- Card horizontal dengan image di kiri -->
<div class="card flex flex-col sm:flex-row overflow-hidden">
  <img 
    src="/images/sample.jpg" 
    alt="Thumbnail" 
    class="w-full sm:w-40 h-32 sm:h-auto object-cover"
  />
  <div class="p-4 flex-1">
    <span class="badge badge-soft-info badge-sm mb-2">News</span>
    <h4 class="font-semibold mb-1">Horizontal Card Title</h4>
    <p class="text-sm opacity-70 line-clamp-2">
      Short description for the horizontal card layout.
    </p>
    <p class="text-xs opacity-50 mt-2">2 hours ago</p>
  </div>
</div>`,
  cardFeatured: `<!-- Featured article card (large) -->
<div class="card overflow-hidden">
  <div class="relative">
    <img 
      src="/images/featured.jpg" 
      alt="Featured" 
      class="w-full h-64 object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
      <span class="badge badge-primary badge-sm mb-2">Featured</span>
      <h2 class="text-xl font-bold mb-2">Featured Article Title</h2>
      <p class="text-sm opacity-90 line-clamp-2">
        Featured article description goes here with more details.
      </p>
    </div>
  </div>
</div>`,
  cardCompact: `<!-- Compact news card -->
<div class="card p-3 flex gap-3">
  <img 
    src="/images/thumb.jpg" 
    alt="Thumbnail" 
    class="w-20 h-20 rounded-lg object-cover shrink-0"
  />
  <div class="flex-1 min-w-0">
    <h4 class="font-medium text-sm line-clamp-2 mb-1">
      Compact Card Title Here
    </h4>
    <p class="text-xs opacity-60">3 min read</p>
  </div>
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
    <button class="btn btn-secondary btn-sm">Cancel</button>
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
    <button class="btn btn-secondary btn-sm">Cancel</button>
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
  collapsibleCss: `<!-- Collapsible Card dengan CSS -->
<div class="card card-collapsible p-4">
  <div class="card-header card-header-collapsible" onclick="this.nextElementSibling.classList.toggle('is-open'); this.querySelector('.card-collapse-icon').classList.toggle('is-open')">
    <div class="card-title">
      <h3 class="font-semibold">Collapsible Card</h3>
    </div>
    <svg class="card-collapse-icon is-open" viewBox="0 0 20 20" fill="currentColor" style="width:1.25rem;height:1.25rem">
      <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
    </svg>
  </div>
  <div class="card-body-wrapper is-open">
    <div class="card-body-inner">
      <p class="text-sm opacity-80">
        Content yang bisa di-collapse. Klik header untuk toggle.
      </p>
    </div>
  </div>
</div>`,
  collapsibleVue: `<!-- Vue Component -->
import { Card } from "@keiryusaki/mitreka-ui/vue";

<Card collapsible :default-open="true">
  <template #title>
    <h3 class="font-semibold">Collapsible Card</h3>
  </template>
  <p>Content yang bisa di-collapse...</p>
</Card>

<!-- With v-model -->
<Card collapsible v-model="isOpen">
  <template #title>Card Title</template>
  Content...
</Card>`,
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
  <div class="space-y-8">
    <PageHeader 
      category="Components"
      title="Card" 
      description="Komponen container untuk mengelompokkan konten dengan visual yang konsisten."
    />

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
    <section id="basic-card" class="card p-6 space-y-4">
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
    <section id="card-header" class="card p-6 space-y-4">
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
    <section id="card-footer" class="card p-6 space-y-4">
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
    <section id="full-card" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Full Card (Header + Body + Footer)
      </h2>

      <div class="max-w-md">
        <div class="card">
          <div class="p-4 border-b border-base-300 flex items-center justify-between">
            <h3 class="font-semibold">Settings</h3>
            <button class="btn btn-warning btn-sm">Edit</button>
          </div>
          <div class="p-4">
            <p class="text-sm opacity-80">Configure your application settings here. Changes will be saved automatically.</p>
          </div>
          <div class="p-4 border-t border-base-300 flex justify-end gap-2">
            <button class="btn btn-secondary btn-sm">Reset</button>
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
    <section id="vue-component" class="card p-6 space-y-4">
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
    <section id="padding-options" class="card p-6 space-y-4">
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
    <section id="interactive-cards" class="card p-6 space-y-4">
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
    <section id="card-grid" class="card p-6 space-y-4">
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

    <!-- Card with Cover Image -->
    <section id="cover-image" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Card with Cover Image (Article/News)
      </h2>
      <p class="text-sm opacity-80">
        Card dengan gambar cover di bagian atas - cocok untuk artikel, berita, atau blog post.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Article Card 1 -->
        <div class="card overflow-hidden">
          <img 
            src="https://picsum.photos/seed/article1/400/300" 
            alt="Cover" 
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <span class="badge badge-primary badge-sm mb-2">Technology</span>
            <h3 class="font-semibold mb-2">Getting Started with Vue 3 Composition API</h3>
            <p class="text-sm opacity-70 line-clamp-2">
              Learn how to build modern web applications using Vue 3 and the Composition API.
            </p>
            <div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300">
              <img
                src="https://i.pravatar.cc/32?img=12"
                alt="John Doe"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div class="text-xs">
                <p class="font-medium">John Doe</p>
                <p class="opacity-60">Dec 24, 2024</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Article Card 2 -->
        <div class="card overflow-hidden">
          <img 
            src="https://picsum.photos/seed/article2/400/300" 
            alt="Cover" 
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <span class="badge badge-soft-success badge-sm mb-2">Design</span>
            <h3 class="font-semibold mb-2">UI Design Principles for Modern Apps</h3>
            <p class="text-sm opacity-70 line-clamp-2">
              Essential design principles every developer should know when building user interfaces.
            </p>
            <div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300">
              <img
                src="https://i.pravatar.cc/32?img=5"
                alt="Alice Smith"
                class="w-8 h-8 rounded-full object-cover"
              />
              <div class="text-xs">
                <p class="font-medium">Alice Smith</p>
                <p class="opacity-60">Dec 22, 2024</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Article Card 3 -->
        <div class="card overflow-hidden">
          <img 
            src="https://picsum.photos/seed/article3/400/300" 
            alt="Cover" 
            class="w-full h-48 object-cover"
          />
          <div class="p-4">
            <span class="badge badge-soft-warning badge-sm mb-2">Tutorial</span>
            <h3 class="font-semibold mb-2">Building Responsive Layouts with Tailwind</h3>
            <p class="text-sm opacity-70 line-clamp-2">
              Step-by-step guide to create beautiful responsive layouts using Tailwind CSS.
            </p>
            <div class="flex items-center gap-2 mt-3 pt-3 border-t border-base-300">
              <div class="w-8 h-8 rounded-full bg-warning/20 flex items-center justify-center text-warning text-xs font-bold">BW</div>
              <div class="text-xs">
                <p class="font-medium">Bob Wilson</p>
                <p class="opacity-60">Dec 20, 2024</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cardCoverImage, 'cardCoverImage')">
          {{ copiedId === 'cardCoverImage' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cardCoverImage }}</code></pre>
      </div>
    </section>

    <!-- Card Horizontal -->
    <section id="horizontal-card" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Horizontal Card (Side Image)
      </h2>
      <p class="text-sm opacity-80">
        Card dengan gambar di samping - cocok untuk list berita atau artikel terkait.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Horizontal Card 1 -->
        <div class="card flex flex-col sm:flex-row overflow-hidden">
          <img 
            src="https://picsum.photos/seed/horiz1/300/200" 
            alt="Thumbnail" 
            class="w-full sm:w-40 h-32 sm:h-auto object-cover"
          />
          <div class="p-4 flex-1">
            <span class="badge badge-soft-info badge-sm mb-2">News</span>
            <h4 class="font-semibold mb-1">Breaking: New Framework Released</h4>
            <p class="text-sm opacity-70 line-clamp-2">
              The latest JavaScript framework promises faster performance.
            </p>
            <p class="text-xs opacity-50 mt-2">2 hours ago</p>
          </div>
        </div>

        <!-- Horizontal Card 2 -->
        <div class="card flex flex-col sm:flex-row overflow-hidden">
          <img 
            src="https://picsum.photos/seed/horiz2/300/200" 
            alt="Thumbnail" 
            class="w-full sm:w-40 h-32 sm:h-auto object-cover"
          />
          <div class="p-4 flex-1">
            <span class="badge badge-soft-error badge-sm mb-2">Update</span>
            <h4 class="font-semibold mb-1">Security Patch Available Now</h4>
            <p class="text-sm opacity-70 line-clamp-2">
              Critical security update for all users. Update immediately.
            </p>
            <p class="text-xs opacity-50 mt-2">5 hours ago</p>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cardHorizontal, 'cardHorizontal')">
          {{ copiedId === 'cardHorizontal' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cardHorizontal }}</code></pre>
      </div>
    </section>

    <!-- Featured Card -->
    <section id="featured-card" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Featured Article Card
      </h2>
      <p class="text-sm opacity-80">
        Card besar dengan overlay gradient - cocok untuk featured/highlight article.
      </p>

      <div class="max-w-2xl">
        <div class="card overflow-hidden">
          <div class="relative">
            <img 
              src="https://picsum.photos/seed/featured/800/400" 
              alt="Featured" 
              class="w-full h-64 object-cover"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span class="badge badge-primary badge-sm mb-2">Featured</span>
              <h2 class="text-xl font-bold mb-2">The Future of Web Development in 2025</h2>
              <p class="text-sm opacity-90 line-clamp-2">
                Explore the upcoming trends and technologies that will shape the web development landscape in the coming year.
              </p>
              <div class="flex items-center gap-2 mt-3">
                <div class="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold">ED</div>
                <div class="text-xs">
                  <p class="font-medium">Editorial Team</p>
                  <p class="opacity-70">Dec 24, 2024 · 8 min read</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cardFeatured, 'cardFeatured')">
          {{ copiedId === 'cardFeatured' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cardFeatured }}</code></pre>
      </div>
    </section>

    <!-- Compact News Card -->
    <section id="compact-news" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Compact News Card
      </h2>
      <p class="text-sm opacity-80">
        Card compact dengan thumbnail kecil - cocok untuk sidebar atau list berita singkat.
      </p>

      <div class="max-w-md space-y-3">
        <div class="card p-3 flex gap-3">
          <img 
            src="https://picsum.photos/seed/compact1/100/100" 
            alt="Thumbnail" 
            class="w-20 h-20 rounded-lg object-cover shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">
              New Update: Performance Improvements Across the Platform
            </h4>
            <p class="text-xs opacity-60">3 min read · Today</p>
          </div>
        </div>
        <div class="card p-3 flex gap-3">
          <img 
            src="https://picsum.photos/seed/compact2/100/100" 
            alt="Thumbnail" 
            class="w-20 h-20 rounded-lg object-cover shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">
              Tips for Better Code Organization in Large Projects
            </h4>
            <p class="text-xs opacity-60">5 min read · Yesterday</p>
          </div>
        </div>
        <div class="card p-3 flex gap-3">
          <img 
            src="https://picsum.photos/seed/compact3/100/100" 
            alt="Thumbnail" 
            class="w-20 h-20 rounded-lg object-cover shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h4 class="font-medium text-sm line-clamp-2 mb-1">
              Understanding Modern CSS Layout Techniques
            </h4>
            <p class="text-xs opacity-60">4 min read · 2 days ago</p>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cardCompact, 'cardCompact')">
          {{ copiedId === 'cardCompact' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cardCompact }}</code></pre>
      </div>
    </section>

    <!-- Avatar Variants -->
    <section id="avatar-variants" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Avatar Variants
      </h2>
      <p class="text-sm opacity-80">
        Dua tipe avatar untuk card: foto dan initials (fallback jika tidak ada foto).
      </p>

      <div class="space-y-4">
        <!-- Photo Avatars -->
        <div>
          <h3 class="font-medium text-sm mb-3">Photo Avatars</h3>
          <div class="flex items-end gap-4">
            <div class="text-center">
              <img src="https://i.pravatar.cc/24?img=1" alt="User" class="w-6 h-6 rounded-full object-cover mx-auto" />
              <span class="text-xs opacity-60 mt-1 block">w-6</span>
            </div>
            <div class="text-center">
              <img src="https://i.pravatar.cc/32?img=5" alt="User" class="w-8 h-8 rounded-full object-cover mx-auto" />
              <span class="text-xs opacity-60 mt-1 block">w-8</span>
            </div>
            <div class="text-center">
              <img src="https://i.pravatar.cc/40?img=12" alt="User" class="w-10 h-10 rounded-full object-cover mx-auto" />
              <span class="text-xs opacity-60 mt-1 block">w-10</span>
            </div>
            <div class="text-center">
              <img src="https://i.pravatar.cc/48?img=15" alt="User" class="w-12 h-12 rounded-full object-cover mx-auto" />
              <span class="text-xs opacity-60 mt-1 block">w-12</span>
            </div>
            <div class="text-center">
              <img src="https://i.pravatar.cc/64?img=20" alt="User" class="w-16 h-16 rounded-full object-cover mx-auto" />
              <span class="text-xs opacity-60 mt-1 block">w-16</span>
            </div>
          </div>
        </div>

        <!-- Initials Avatars -->
        <div>
          <h3 class="font-medium text-sm mb-3">Initials Avatars (Fallback)</h3>
          <div class="flex items-end gap-4">
            <div class="text-center">
              <div class="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-[10px] font-bold mx-auto">JD</div>
              <span class="text-xs opacity-60 mt-1 block">w-6</span>
            </div>
            <div class="text-center">
              <div class="w-8 h-8 rounded-full bg-success/20 flex items-center justify-center text-success text-xs font-bold mx-auto">AS</div>
              <span class="text-xs opacity-60 mt-1 block">w-8</span>
            </div>
            <div class="text-center">
              <div class="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning text-sm font-bold mx-auto">BW</div>
              <span class="text-xs opacity-60 mt-1 block">w-10</span>
            </div>
            <div class="text-center">
              <div class="w-12 h-12 rounded-full bg-error/20 flex items-center justify-center text-error text-sm font-bold mx-auto">MK</div>
              <span class="text-xs opacity-60 mt-1 block">w-12</span>
            </div>
            <div class="text-center">
              <div class="w-16 h-16 rounded-full bg-info/20 flex items-center justify-center text-info text-base font-bold mx-auto">ED</div>
              <span class="text-xs opacity-60 mt-1 block">w-16</span>
            </div>
          </div>
        </div>

        <!-- Avatar Colors -->
        <div>
          <h3 class="font-medium text-sm mb-3">Avatar Color Variants</h3>
          <div class="flex flex-wrap gap-3">
            <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">PR</div>
            <div class="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary text-sm font-bold">SC</div>
            <div class="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center text-accent text-sm font-bold">AC</div>
            <div class="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center text-success text-sm font-bold">SU</div>
            <div class="w-10 h-10 rounded-full bg-warning/20 flex items-center justify-center text-warning text-sm font-bold">WA</div>
            <div class="w-10 h-10 rounded-full bg-error/20 flex items-center justify-center text-error text-sm font-bold">ER</div>
            <div class="w-10 h-10 rounded-full bg-info/20 flex items-center justify-center text-info text-sm font-bold">IN</div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.avatarVariants, 'avatarVariants')">
          {{ copiedId === 'avatarVariants' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.avatarVariants }}</code></pre>
      </div>
    </section>

    <!-- Card Variants Preview -->
    <section id="card-use-cases" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Card Use Cases
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Profile Card -->
        <div class="card p-4">
          <div class="flex items-center gap-3 mb-3">
            <img
              src="https://i.pravatar.cc/48?img=12"
              alt="John Doe"
              class="w-12 h-12 rounded-full object-cover"
            />
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
    <section id="styling-reference" class="card p-6 space-y-4">
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

    <!-- Collapsible Card -->
    <section id="collapsible-card" class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Collapsible Card
      </h2>
      <p class="text-sm opacity-80">
        Card dengan konten yang bisa di-expand/collapse. Cocok untuk informasi panjang yang tidak perlu ditampilkan sekaligus.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Open by default -->
        <div class="card card-collapsible p-4">
          <div class="card-header card-header-collapsible mb-3" onclick="const wrapper = this.nextElementSibling; const icon = this.querySelector('.card-collapse-icon'); wrapper.classList.toggle('is-open'); icon.classList.toggle('is-open');">
            <div class="card-title">
              <h3 class="font-semibold">Open by Default</h3>
            </div>
            <svg class="card-collapse-icon is-open" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="card-body-wrapper is-open">
            <div class="card-body-inner">
              <p class="text-sm opacity-80">
                Ini adalah konten yang bisa di-collapse. Klik header untuk menutup.
              </p>
              <p class="text-sm opacity-80 mt-2">
                Konten tambahan yang panjang bisa disembunyikan untuk menghemat ruang.
              </p>
            </div>
          </div>
        </div>

        <!-- Closed by default -->
        <div class="card card-collapsible p-4">
          <div class="card-header card-header-collapsible mb-3" onclick="const wrapper = this.nextElementSibling; const icon = this.querySelector('.card-collapse-icon'); wrapper.classList.toggle('is-open'); icon.classList.toggle('is-open');">
            <div class="card-title">
              <h3 class="font-semibold">Closed by Default</h3>
            </div>
            <svg class="card-collapse-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div class="card-body-wrapper">
            <div class="card-body-inner">
              <p class="text-sm opacity-80">
                Konten ini awalnya tersembunyi. Klik header untuk membukanya.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.collapsibleCss, 'collapsibleCss')">
          {{ copiedId === 'collapsibleCss' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.collapsibleCss }}</code></pre>
      </div>

      <h3 class="font-medium mt-6">Vue Component</h3>
      <p class="text-sm opacity-80">
        Gunakan prop <code class="code-inline">collapsible</code> dan <code class="code-inline">default-open</code> pada Card component.
      </p>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.collapsibleVue, 'collapsibleVue')">
          {{ copiedId === 'collapsibleVue' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.collapsibleVue }}</code></pre>
      </div>

      <div class="mt-4 p-3 bg-info/10 border border-info/30 rounded-lg">
        <p class="text-sm">
          <strong>Tip:</strong> Untuk fitur Collapse yang lebih lengkap atau Accordion (multiple collapse dengan auto-close), 
          lihat halaman <a href="/collapse" class="text-primary underline">Collapse</a> dan 
          <a href="/accordion" class="text-primary underline">Accordion</a>.
        </p>
      </div>
    </section>

    <!-- Component Props -->
    <section id="vue-slots" class="card p-6 space-y-4">
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

    <!-- Floating TOC -->
    <FloatingTOC :items="tocItems" title="Card Sections" />
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

/* Scroll margin for TOC navigation */
section[id] {
  scroll-margin-top: 5rem;
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

/* Collapsible Card */
.card-collapsible .card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-header-collapsible {
  cursor: pointer;
  user-select: none;
  margin: -1rem -1rem 0 -1rem;
  padding: 1rem;
  border-radius: var(--radius-box) var(--radius-box) 0 0;
  transition: background-color 0.15s ease;
}

.card-header-collapsible:hover {
  background-color: var(--color-base-200);
}

.card-collapse-icon {
  width: 1.25rem;
  height: 1.25rem;
  transition: transform 0.2s ease;
  flex-shrink: 0;
}

.card-collapse-icon.is-open {
  transform: rotate(180deg);
}

.card-body-wrapper {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.2s ease;
}

.card-body-wrapper.is-open {
  grid-template-rows: 1fr;
}

.card-body-inner {
  overflow: hidden;
}
</style>
