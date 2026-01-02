<script setup lang="ts">
import { ref } from "vue";
import Avatar from "@/components/data/Avatar.vue";
import AvatarGroup from "@/components/data/AvatarGroup.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import PageHeader from "@/components/PageHeader.vue";

const copiedId = ref<string | null>(null);

const tocItems: TOCItem[] = [
  { id: 'import', label: 'Import' },
  { id: 'photo', label: 'Photo Avatar' },
  { id: 'initials', label: 'Initials Avatar' },
  { id: 'sizes', label: 'Sizes' },
  { id: 'colors', label: 'Colors' },
  { id: 'status', label: 'Status Indicator' },
  { id: 'shapes', label: 'Shapes' },
  { id: 'fallback', label: 'Automatic Fallback' },
  { id: 'group', label: 'Avatar Group' },
  { id: 'group-sizes', label: 'Group Sizes' },
  { id: 'css-only', label: 'CSS Only' },
  { id: 'props-avatar', label: 'Avatar Props' },
  { id: 'props-group', label: 'AvatarGroup Props' },
];

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

const codes = {
  import: `import Avatar from "@/components/data/Avatar.vue";
import AvatarGroup from "@/components/data/AvatarGroup.vue";`,
  basicPhoto: `<!-- Avatar dengan foto -->
<Avatar 
  src="https://i.pravatar.cc/100?img=12" 
  alt="John Doe" 
/>`,
  basicInitials: `<!-- Avatar dengan initials (fallback otomatis dari alt) -->
<Avatar alt="John Doe" />

<!-- Atau set fallback manual -->
<Avatar fallback="JD" />`,
  sizes: `<Avatar src="..." size="xs" />  <!-- 24px -->
<Avatar src="..." size="sm" />  <!-- 32px -->
<Avatar src="..." size="md" />  <!-- 40px (default) -->
<Avatar src="..." size="lg" />  <!-- 48px -->
<Avatar src="..." size="xl" />  <!-- 64px -->`,
  colors: `<!-- Warna initials avatar -->
<Avatar alt="Primary" color="primary" />
<Avatar alt="Secondary" color="secondary" />
<Avatar alt="Accent" color="accent" />
<Avatar alt="Success" color="success" />
<Avatar alt="Warning" color="warning" />
<Avatar alt="Error" color="error" />
<Avatar alt="Info" color="info" />
<Avatar alt="Neutral" color="neutral" />`,
  status: `<!-- Status indicator -->
<Avatar src="..." status="online" />   <!-- Hijau -->
<Avatar src="..." status="offline" />  <!-- Abu-abu -->
<Avatar src="..." status="busy" />     <!-- Merah -->
<Avatar src="..." status="away" />     <!-- Kuning -->`,
  shapes: `<!-- Circle (default) -->
<Avatar src="..." />

<!-- Rounded square -->
<Avatar src="..." square />`,
  fallback: `<!-- Fallback otomatis jika gambar error -->
<Avatar 
  src="/broken-image.jpg" 
  alt="John Doe"
  color="primary"
/>
<!-- Akan tampilkan "JD" dengan background primary -->`,
  group: `<AvatarGroup :max="3">
  <Avatar src="https://i.pravatar.cc/100?img=1" alt="User 1" />
  <Avatar src="https://i.pravatar.cc/100?img=2" alt="User 2" />
  <Avatar src="https://i.pravatar.cc/100?img=3" alt="User 3" />
  <Avatar src="https://i.pravatar.cc/100?img=4" alt="User 4" />
  <Avatar src="https://i.pravatar.cc/100?img=5" alt="User 5" />
</AvatarGroup>
<!-- Tampilkan 3 avatar + "+2" -->`,
  groupSizes: `<AvatarGroup :max="4" size="sm">...</AvatarGroup>
<AvatarGroup :max="4" size="md">...</AvatarGroup>
<AvatarGroup :max="4" size="lg">...</AvatarGroup>`,
  cssOnly: `<!-- Avatar dengan CSS class saja (tanpa component) -->

<!-- Photo avatar -->
<img 
  src="https://i.pravatar.cc/100" 
  alt="User" 
  class="w-10 h-10 rounded-full object-cover"
/>

<!-- Initials avatar -->
<div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
  JD
</div>

<!-- Dengan status -->
<div class="relative inline-flex">
  <img src="..." class="w-10 h-10 rounded-full object-cover" />
  <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-base-100"></span>
</div>`,
};

const downloadAvatar = async () => {
  try {
    const fileUrl = (await import("@/components/data/Avatar.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "Avatar.vue";
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};

const downloadAvatarGroup = async () => {
  try {
    const fileUrl = (await import("@/components/data/AvatarGroup.vue?raw")).default;
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "AvatarGroup.vue";
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
      title="Avatar" 
      description="Komponen untuk menampilkan foto profil user dengan fallback ke initials."
    />

    <!-- Download Components -->
    <section class="card p-4">
      <div class="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 class="font-semibold">Download Components</h2>
          <p class="text-sm opacity-70">Copy file ke project Anda</p>
        </div>
        <div class="flex gap-2">
          <button class="btn btn-accent btn-sm" @click="downloadAvatar">
            Avatar.vue
          </button>
          <button class="btn btn-accent btn-sm" @click="downloadAvatarGroup">
            AvatarGroup.vue
          </button>
        </div>
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

    <!-- Basic Photo Avatar -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Photo Avatar
      </h2>
      <p class="text-sm opacity-80">
        Avatar dengan gambar. Jika gambar gagal load, otomatis fallback ke initials.
      </p>

      <div class="flex items-center gap-4">
        <Avatar src="https://i.pravatar.cc/100?img=12" alt="John Doe" />
        <Avatar src="https://i.pravatar.cc/100?img=5" alt="Alice Smith" />
        <Avatar src="https://i.pravatar.cc/100?img=8" alt="Bob Wilson" />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basicPhoto, 'basicPhoto')">
          {{ copiedId === 'basicPhoto' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basicPhoto }}</code></pre>
      </div>
    </section>

    <!-- Initials Avatar -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Initials Avatar
      </h2>
      <p class="text-sm opacity-80">
        Avatar tanpa foto - menampilkan initials dari nama atau fallback prop.
      </p>

      <div class="flex items-center gap-4">
        <Avatar alt="John Doe" />
        <Avatar alt="Alice Smith" color="success" />
        <Avatar fallback="BW" color="warning" />
        <Avatar fallback="?" color="neutral" />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.basicInitials, 'basicInitials')">
          {{ copiedId === 'basicInitials' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.basicInitials }}</code></pre>
      </div>
    </section>

    <!-- Sizes -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Sizes
      </h2>

      <div class="flex items-end gap-4">
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=1" size="xs" />
          <p class="text-xs opacity-60 mt-1">xs (24px)</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=2" size="sm" />
          <p class="text-xs opacity-60 mt-1">sm (32px)</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=3" size="md" />
          <p class="text-xs opacity-60 mt-1">md (40px)</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=4" size="lg" />
          <p class="text-xs opacity-60 mt-1">lg (48px)</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=5" size="xl" />
          <p class="text-xs opacity-60 mt-1">xl (64px)</p>
        </div>
      </div>

      <h3 class="font-medium text-sm mt-4">Initials Sizes</h3>
      <div class="flex items-end gap-4">
        <div class="text-center">
          <Avatar alt="John Doe" size="xs" />
          <p class="text-xs opacity-60 mt-1">xs</p>
        </div>
        <div class="text-center">
          <Avatar alt="Alice Smith" size="sm" color="success" />
          <p class="text-xs opacity-60 mt-1">sm</p>
        </div>
        <div class="text-center">
          <Avatar alt="Bob Wilson" size="md" color="warning" />
          <p class="text-xs opacity-60 mt-1">md</p>
        </div>
        <div class="text-center">
          <Avatar alt="Mary Kate" size="lg" color="error" />
          <p class="text-xs opacity-60 mt-1">lg</p>
        </div>
        <div class="text-center">
          <Avatar alt="Editorial Team" size="xl" color="info" />
          <p class="text-xs opacity-60 mt-1">xl</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.sizes, 'sizes')">
          {{ copiedId === 'sizes' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.sizes }}</code></pre>
      </div>
    </section>

    <!-- Colors -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Colors (Initials Background)
      </h2>
      <p class="text-sm opacity-80">
        Warna background untuk avatar initials. Default: primary.
      </p>

      <div class="flex flex-wrap items-center gap-4">
        <div class="text-center">
          <Avatar alt="Primary" color="primary" />
          <p class="text-xs opacity-60 mt-1">primary</p>
        </div>
        <div class="text-center">
          <Avatar alt="Secondary" color="secondary" />
          <p class="text-xs opacity-60 mt-1">secondary</p>
        </div>
        <div class="text-center">
          <Avatar alt="Accent" color="accent" />
          <p class="text-xs opacity-60 mt-1">accent</p>
        </div>
        <div class="text-center">
          <Avatar alt="Success" color="success" />
          <p class="text-xs opacity-60 mt-1">success</p>
        </div>
        <div class="text-center">
          <Avatar alt="Warning" color="warning" />
          <p class="text-xs opacity-60 mt-1">warning</p>
        </div>
        <div class="text-center">
          <Avatar alt="Error" color="error" />
          <p class="text-xs opacity-60 mt-1">error</p>
        </div>
        <div class="text-center">
          <Avatar alt="Info" color="info" />
          <p class="text-xs opacity-60 mt-1">info</p>
        </div>
        <div class="text-center">
          <Avatar alt="Neutral" color="neutral" />
          <p class="text-xs opacity-60 mt-1">neutral</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.colors, 'colors')">
          {{ copiedId === 'colors' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.colors }}</code></pre>
      </div>
    </section>

    <!-- Status -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Status Indicator
      </h2>
      <p class="text-sm opacity-80">
        Tambahkan indicator online/offline status.
      </p>

      <div class="flex items-center gap-6">
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=10" status="online" size="lg" />
          <p class="text-xs opacity-60 mt-2">online</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=11" status="offline" size="lg" />
          <p class="text-xs opacity-60 mt-2">offline</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=13" status="busy" size="lg" />
          <p class="text-xs opacity-60 mt-2">busy</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=14" status="away" size="lg" />
          <p class="text-xs opacity-60 mt-2">away</p>
        </div>
      </div>

      <h3 class="font-medium text-sm mt-4">Status dengan berbagai ukuran</h3>
      <div class="flex items-end gap-4">
        <Avatar src="https://i.pravatar.cc/100?img=15" status="online" size="xs" />
        <Avatar src="https://i.pravatar.cc/100?img=16" status="online" size="sm" />
        <Avatar src="https://i.pravatar.cc/100?img=17" status="online" size="md" />
        <Avatar src="https://i.pravatar.cc/100?img=18" status="online" size="lg" />
        <Avatar src="https://i.pravatar.cc/100?img=19" status="online" size="xl" />
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.status, 'status')">
          {{ copiedId === 'status' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.status }}</code></pre>
      </div>
    </section>

    <!-- Shapes -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Shapes
      </h2>
      <p class="text-sm opacity-80">
        Circle (default) atau rounded square.
      </p>

      <div class="flex items-center gap-6">
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=20" size="lg" />
          <p class="text-xs opacity-60 mt-2">Circle (default)</p>
        </div>
        <div class="text-center">
          <Avatar src="https://i.pravatar.cc/100?img=21" size="lg" square />
          <p class="text-xs opacity-60 mt-2">Square</p>
        </div>
        <div class="text-center">
          <Avatar alt="John Doe" size="lg" color="primary" />
          <p class="text-xs opacity-60 mt-2">Circle initials</p>
        </div>
        <div class="text-center">
          <Avatar alt="Alice Smith" size="lg" color="success" square />
          <p class="text-xs opacity-60 mt-2">Square initials</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.shapes, 'shapes')">
          {{ copiedId === 'shapes' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.shapes }}</code></pre>
      </div>
    </section>

    <!-- Fallback -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Automatic Fallback
      </h2>
      <p class="text-sm opacity-80">
        Jika gambar gagal load (error/broken), otomatis tampilkan initials.
      </p>

      <div class="flex items-center gap-4">
        <div class="text-center">
          <Avatar src="/broken-image.jpg" alt="John Doe" color="primary" size="lg" />
          <p class="text-xs opacity-60 mt-2">Broken image → JD</p>
        </div>
        <div class="text-center">
          <Avatar src="https://invalid-url.test/img.jpg" alt="Alice Smith" color="success" size="lg" />
          <p class="text-xs opacity-60 mt-2">Invalid URL → AS</p>
        </div>
        <div class="text-center">
          <Avatar alt="No Image User" color="warning" size="lg" />
          <p class="text-xs opacity-60 mt-2">No src → NI</p>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.fallback, 'fallback')">
          {{ copiedId === 'fallback' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.fallback }}</code></pre>
      </div>
    </section>

    <!-- Avatar Group -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Avatar Group
      </h2>
      <p class="text-sm opacity-80">
        Tampilkan multiple avatars dengan stacking effect. Gunakan <code class="code-inline">max</code> prop untuk limit.
      </p>

      <div class="space-y-4">
        <div>
          <p class="text-xs opacity-60 mb-2">max="3" (dari 5 avatar)</p>
          <AvatarGroup :max="3">
            <Avatar src="https://i.pravatar.cc/100?img=30" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/100?img=31" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/100?img=32" alt="User 3" />
            <Avatar src="https://i.pravatar.cc/100?img=33" alt="User 4" />
            <Avatar src="https://i.pravatar.cc/100?img=34" alt="User 5" />
          </AvatarGroup>
        </div>

        <div>
          <p class="text-xs opacity-60 mb-2">max="4" (dari 6 avatar)</p>
          <AvatarGroup :max="4">
            <Avatar src="https://i.pravatar.cc/100?img=35" alt="User 1" />
            <Avatar src="https://i.pravatar.cc/100?img=36" alt="User 2" />
            <Avatar src="https://i.pravatar.cc/100?img=37" alt="User 3" />
            <Avatar src="https://i.pravatar.cc/100?img=38" alt="User 4" />
            <Avatar src="https://i.pravatar.cc/100?img=39" alt="User 5" />
            <Avatar src="https://i.pravatar.cc/100?img=40" alt="User 6" />
          </AvatarGroup>
        </div>

        <div>
          <p class="text-xs opacity-60 mb-2">Dengan initials mixed</p>
          <AvatarGroup :max="4">
            <Avatar src="https://i.pravatar.cc/100?img=41" alt="User 1" />
            <Avatar alt="John Doe" color="primary" />
            <Avatar src="https://i.pravatar.cc/100?img=42" alt="User 3" />
            <Avatar alt="Alice Smith" color="success" />
            <Avatar alt="Bob Wilson" color="warning" />
          </AvatarGroup>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.group, 'group')">
          {{ copiedId === 'group' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.group }}</code></pre>
      </div>
    </section>

    <!-- Group Sizes -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Avatar Group Sizes
      </h2>

      <div class="space-y-4">
        <div>
          <p class="text-xs opacity-60 mb-2">size="sm"</p>
          <AvatarGroup :max="4" size="sm">
            <Avatar src="https://i.pravatar.cc/100?img=50" size="sm" />
            <Avatar src="https://i.pravatar.cc/100?img=51" size="sm" />
            <Avatar src="https://i.pravatar.cc/100?img=52" size="sm" />
            <Avatar src="https://i.pravatar.cc/100?img=53" size="sm" />
            <Avatar src="https://i.pravatar.cc/100?img=54" size="sm" />
          </AvatarGroup>
        </div>
        <div>
          <p class="text-xs opacity-60 mb-2">size="md" (default)</p>
          <AvatarGroup :max="4" size="md">
            <Avatar src="https://i.pravatar.cc/100?img=55" size="md" />
            <Avatar src="https://i.pravatar.cc/100?img=56" size="md" />
            <Avatar src="https://i.pravatar.cc/100?img=57" size="md" />
            <Avatar src="https://i.pravatar.cc/100?img=58" size="md" />
            <Avatar src="https://i.pravatar.cc/100?img=59" size="md" />
          </AvatarGroup>
        </div>
        <div>
          <p class="text-xs opacity-60 mb-2">size="lg"</p>
          <AvatarGroup :max="4" size="lg">
            <Avatar src="https://i.pravatar.cc/100?img=60" size="lg" />
            <Avatar src="https://i.pravatar.cc/100?img=61" size="lg" />
            <Avatar src="https://i.pravatar.cc/100?img=62" size="lg" />
            <Avatar src="https://i.pravatar.cc/100?img=63" size="lg" />
            <Avatar src="https://i.pravatar.cc/100?img=64" size="lg" />
          </AvatarGroup>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.groupSizes, 'groupSizes')">
          {{ copiedId === 'groupSizes' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.groupSizes }}</code></pre>
      </div>
    </section>

    <!-- Use Cases -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Use Cases
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- User Profile -->
        <div class="card p-4">
          <div class="flex items-center gap-3">
            <Avatar src="https://i.pravatar.cc/100?img=12" alt="John Doe" size="lg" status="online" />
            <div>
              <h4 class="font-semibold">John Doe</h4>
              <p class="text-sm opacity-60">Software Engineer</p>
            </div>
          </div>
        </div>

        <!-- Comment -->
        <div class="card p-4">
          <div class="flex gap-3">
            <Avatar src="https://i.pravatar.cc/100?img=5" alt="Alice" size="sm" />
            <div class="flex-1">
              <p class="text-sm font-medium">Alice Smith</p>
              <p class="text-sm opacity-70">Great work on this project!</p>
              <p class="text-xs opacity-50 mt-1">2 hours ago</p>
            </div>
          </div>
        </div>

        <!-- Team Members -->
        <div class="card p-4">
          <p class="text-sm font-medium mb-2">Team Members</p>
          <div class="flex items-center justify-between">
            <AvatarGroup :max="4">
              <Avatar src="https://i.pravatar.cc/100?img=70" />
              <Avatar src="https://i.pravatar.cc/100?img=71" />
              <Avatar src="https://i.pravatar.cc/100?img=72" />
              <Avatar src="https://i.pravatar.cc/100?img=73" />
              <Avatar src="https://i.pravatar.cc/100?img=74" />
            </AvatarGroup>
            <button class="btn btn-info btn-sm">View All</button>
          </div>
        </div>

        <!-- Activity -->
        <div class="card p-4">
          <p class="text-sm font-medium mb-2">Recent Activity</p>
          <div class="space-y-2">
            <div class="flex items-center gap-2 text-sm">
              <Avatar alt="JD" size="xs" color="primary" />
              <span class="opacity-80">John updated the document</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Avatar alt="AS" size="xs" color="success" />
              <span class="opacity-80">Alice added a comment</span>
            </div>
            <div class="flex items-center gap-2 text-sm">
              <Avatar alt="BW" size="xs" color="warning" />
              <span class="opacity-80">Bob joined the team</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CSS Only -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        CSS Only (Tanpa Component)
      </h2>
      <p class="text-sm opacity-80">
        Jika tidak ingin pakai component, bisa gunakan CSS class langsung.
      </p>

      <div class="flex items-center gap-4">
        <img 
          src="https://i.pravatar.cc/100?img=80" 
          alt="User" 
          class="w-10 h-10 rounded-full object-cover"
        />
        <div class="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold">
          JD
        </div>
        <div class="relative inline-flex">
          <img src="https://i.pravatar.cc/100?img=81" class="w-10 h-10 rounded-full object-cover" />
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success rounded-full ring-2 ring-base-100"></span>
        </div>
      </div>

      <div class="code-block">
        <button class="copy-btn" @click="copyCode(codes.cssOnly, 'cssOnly')">
          {{ copiedId === 'cssOnly' ? '✓ Copied!' : 'Copy' }}
        </button>
        <pre><code>{{ codes.cssOnly }}</code></pre>
      </div>
    </section>

    <!-- Props Reference: Avatar -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        Avatar Props
      </h2>

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
              <td class="px-4 py-2"><code class="code-inline">src</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">URL gambar avatar</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">alt</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">"Avatar"</td>
              <td class="px-4 py-2">Alt text, juga digunakan untuk generate initials</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">fallback</code></td>
              <td class="px-4 py-2">string</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Custom initials (override dari alt)</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">size</code></td>
              <td class="px-4 py-2">"xs" | "sm" | "md" | "lg" | "xl"</td>
              <td class="px-4 py-2">"md"</td>
              <td class="px-4 py-2">Ukuran avatar</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">status</code></td>
              <td class="px-4 py-2">"online" | "offline" | "busy" | "away"</td>
              <td class="px-4 py-2">-</td>
              <td class="px-4 py-2">Status indicator</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">color</code></td>
              <td class="px-4 py-2">"primary" | "secondary" | "accent" | "success" | "warning" | "error" | "info" | "neutral"</td>
              <td class="px-4 py-2">"primary"</td>
              <td class="px-4 py-2">Warna background initials</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">square</code></td>
              <td class="px-4 py-2">boolean</td>
              <td class="px-4 py-2">false</td>
              <td class="px-4 py-2">Rounded square shape</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Props Reference: AvatarGroup -->
    <section class="card p-6 space-y-4">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">
        AvatarGroup Props
      </h2>

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
              <td class="px-4 py-2"><code class="code-inline">max</code></td>
              <td class="px-4 py-2">number</td>
              <td class="px-4 py-2">4</td>
              <td class="px-4 py-2">Maksimum avatar yang ditampilkan</td>
            </tr>
            <tr>
              <td class="px-4 py-2"><code class="code-inline">size</code></td>
              <td class="px-4 py-2">"xs" | "sm" | "md" | "lg" | "xl"</td>
              <td class="px-4 py-2">"md"</td>
              <td class="px-4 py-2">Ukuran untuk +N counter</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <!-- Floating TOC -->
    <FloatingTOC :items="tocItems" title="Avatar" />
  </div>
</template>

<style scoped>
/* Scroll margin for TOC navigation */
section[id] {
  scroll-margin-top: 5rem;
}

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
