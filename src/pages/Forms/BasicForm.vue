<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import FloatingTOC, { type TOCItem } from "@/components/FloatingTOC.vue";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

const tocItems: TOCItem[] = [
  { id: "vertical", label: "Vertical Form" },
  { id: "horizontal", label: "Horizontal Form" },
  { id: "inline", label: "Inline Form" },
  { id: "sections", label: "Form Sections" },
  { id: "validation", label: "Validation States" },
  { id: "disabled", label: "Disabled State" },
];

const copiedId = ref<string | null>(null);

const copyCode = async (code: string, id: string) => {
  await navigator.clipboard.writeText(code);
  copiedId.value = id;
  setTimeout(() => (copiedId.value = null), 2000);
};

// Demo form data
const formData = ref({
  name: "",
  email: "",
  role: null as string | number | null,
  department: null as string | number | null,
  bio: "",
  notifications: true,
});

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "editor", label: "Editor" },
  { value: "viewer", label: "Viewer" },
];

const departmentOptions = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
];

const codes = {
  vertical: `<form class="space-y-4">
  <div>
    <label class="block text-sm font-medium mb-1">Nama</label>
    <input type="text" class="input w-full" placeholder="Masukkan nama" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input type="email" class="input w-full" placeholder="email@example.com" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Bio</label>
    <textarea class="input w-full" rows="3" placeholder="Ceritakan tentang diri Anda"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">Simpan</button>
</form>`,
  horizontal: `<form class="space-y-4">
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 items-start">
    <label class="text-sm font-medium md:text-right md:pt-2">Nama</label>
    <input type="text" class="input w-full" placeholder="Masukkan nama" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 items-start">
    <label class="text-sm font-medium md:text-right md:pt-2">Email</label>
    <input type="email" class="input w-full" placeholder="email@example.com" />
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4 items-start">
    <label class="text-sm font-medium md:text-right md:pt-2">Bio</label>
    <textarea class="input w-full" rows="3"></textarea>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-2 md:gap-4">
    <div></div>
    <button type="submit" class="btn btn-primary w-fit">Simpan</button>
  </div>
</form>`,
  inline: `<form class="flex flex-wrap items-end gap-3">
  <div>
    <label class="block text-sm font-medium mb-1">Nama</label>
    <input type="text" class="input" placeholder="Nama" />
  </div>
  <div>
    <label class="block text-sm font-medium mb-1">Email</label>
    <input type="email" class="input" placeholder="Email" />
  </div>
  <button type="submit" class="btn btn-info">Cari</button>
</form>`,
  sections: `<form class="space-y-6">
  <!-- Section: Personal Info -->
  <fieldset class="space-y-4">
    <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4">
      Informasi Pribadi
    </legend>
    <div class="grid md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium mb-1">Nama Depan</label>
        <input type="text" class="input w-full" />
      </div>
      <div>
        <label class="block text-sm font-medium mb-1">Nama Belakang</label>
        <input type="text" class="input w-full" />
      </div>
    </div>
  </fieldset>
  
  <!-- Section: Account -->
  <fieldset class="space-y-4">
    <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4">
      Akun
    </legend>
    <div>
      <label class="block text-sm font-medium mb-1">Email</label>
      <input type="email" class="input w-full" />
    </div>
  </fieldset>
</form>`,
  validation: `<!-- Success state -->
<div>
  <label class="block text-sm font-medium mb-1">Email</label>
  <input type="email" class="input input-success w-full" value="valid@email.com" />
  <p class="text-success text-xs mt-1">Email valid!</p>
</div>

<!-- Error state -->
<div>
  <label class="block text-sm font-medium mb-1">Password</label>
  <input type="password" class="input input-error w-full" />
  <p class="text-error text-xs mt-1">Password minimal 8 karakter</p>
</div>

<!-- Warning state -->
<div>
  <label class="block text-sm font-medium mb-1">Username</label>
  <input type="text" class="input input-warning w-full" value="admin" />
  <p class="text-warning text-xs mt-1">Username sudah digunakan</p>
</div>`,
};
</script>

<template>
  <div class="space-y-8">
    <PageHeader
      category="Patterns"
      title="Basic Form"
      description="Layout form yang umum digunakan: vertical, horizontal, inline, dan dengan sections."
    />

    <!-- Vertical Form -->
    <section id="vertical" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Vertical Form</h2>
      <p class="text-sm opacity-70">Layout default dengan label di atas input. Paling umum digunakan.</p>

      <div class="p-6 bg-base-200 rounded-box">
        <form class="space-y-4 max-w-md" @submit.prevent>
          <div>
            <label class="block text-sm font-medium mb-1">Nama</label>
            <input v-model="formData.name" type="text" class="input w-full" placeholder="Masukkan nama" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input v-model="formData.email" type="email" class="input w-full" placeholder="email@example.com" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Role</label>
            <SelectDropdown v-model="formData.role" :options="roleOptions" placeholder="Pilih role" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Bio</label>
            <textarea v-model="formData.bio" class="input w-full" rows="3" placeholder="Ceritakan tentang diri Anda"></textarea>
          </div>
          <div class="flex gap-2">
            <button type="submit" class="btn btn-primary">Simpan</button>
            <button type="button" class="btn btn-secondary">Batal</button>
          </div>
        </form>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.vertical }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.vertical, 'vertical')">
          {{ copiedId === 'vertical' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Horizontal Form -->
    <section id="horizontal" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Horizontal Form</h2>
      <p class="text-sm opacity-70">Label di sebelah kiri input. Cocok untuk form dengan banyak field.</p>

      <div class="p-6 bg-base-200 rounded-box">
        <form class="space-y-4" @submit.prevent>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start">
            <label class="text-sm font-medium md:text-right md:pt-2">Nama</label>
            <input type="text" class="input w-full max-w-md" placeholder="Masukkan nama" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start">
            <label class="text-sm font-medium md:text-right md:pt-2">Email</label>
            <input type="email" class="input w-full max-w-md" placeholder="email@example.com" />
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start">
            <label class="text-sm font-medium md:text-right md:pt-2">Department</label>
            <div class="max-w-md">
              <SelectDropdown v-model="formData.department" :options="departmentOptions" placeholder="Pilih department" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4 items-start">
            <label class="text-sm font-medium md:text-right md:pt-2">Bio</label>
            <textarea class="input w-full max-w-md" rows="3" placeholder="Ceritakan tentang diri Anda"></textarea>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-2 md:gap-4">
            <div></div>
            <div class="flex gap-2">
              <button type="submit" class="btn btn-primary">Simpan</button>
              <button type="button" class="btn btn-secondary">Batal</button>
            </div>
          </div>
        </form>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.horizontal }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.horizontal, 'horizontal')">
          {{ copiedId === 'horizontal' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Inline Form -->
    <section id="inline" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Inline Form</h2>
      <p class="text-sm opacity-70">Semua field dalam satu baris. Cocok untuk search/filter form.</p>

      <div class="p-6 bg-base-200 rounded-box">
        <form class="flex flex-wrap items-end gap-3" @submit.prevent>
          <div>
            <label class="block text-sm font-medium mb-1">Nama</label>
            <input type="text" class="input" placeholder="Nama" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input type="email" class="input" placeholder="Email" />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Status</label>
            <SelectDropdown
              :options="[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]"
              placeholder="Semua"
              size="md"
            />
          </div>
          <button type="submit" class="btn btn-info">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.3-4.3"/>
            </svg>
            Cari
          </button>
        </form>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.inline }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.inline, 'inline')">
          {{ copiedId === 'inline' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Form Sections -->
    <section id="sections" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Form Sections</h2>
      <p class="text-sm opacity-70">Form yang dikelompokkan dalam sections untuk form yang kompleks.</p>

      <div class="p-6 bg-base-200 rounded-box">
        <form class="space-y-6 max-w-2xl" @submit.prevent>
          <!-- Section: Personal Info -->
          <fieldset class="space-y-4">
            <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4 w-full">
              Informasi Pribadi
            </legend>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Nama Depan</label>
                <input type="text" class="input w-full" placeholder="John" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Nama Belakang</label>
                <input type="text" class="input w-full" placeholder="Doe" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1">Alamat</label>
              <textarea class="input w-full" rows="2" placeholder="Alamat lengkap"></textarea>
            </div>
          </fieldset>

          <!-- Section: Account -->
          <fieldset class="space-y-4">
            <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4 w-full">
              Informasi Akun
            </legend>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium mb-1">Email</label>
                <input type="email" class="input w-full" placeholder="email@example.com" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1">Username</label>
                <input type="text" class="input w-full" placeholder="johndoe" />
              </div>
            </div>
          </fieldset>

          <!-- Section: Preferences -->
          <fieldset class="space-y-4">
            <legend class="text-lg font-semibold border-b border-base-300 pb-2 mb-4 w-full">
              Preferensi
            </legend>
            <div class="space-y-3">
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" checked />
                <span class="text-sm">Terima email newsletter</span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" class="checkbox checkbox-primary" />
                <span class="text-sm">Terima notifikasi SMS</span>
              </label>
            </div>
          </fieldset>

          <div class="flex gap-2 pt-4 border-t border-base-300">
            <button type="submit" class="btn btn-primary">Simpan Perubahan</button>
            <button type="button" class="btn btn-secondary">Batal</button>
          </div>
        </form>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.sections }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.sections, 'sections')">
          {{ copiedId === 'sections' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Validation States -->
    <section id="validation" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Validation States</h2>
      <p class="text-sm opacity-70">Tampilan input dengan berbagai state validasi.</p>

      <div class="p-6 bg-base-200 rounded-box">
        <div class="space-y-4 max-w-md">
          <!-- Default -->
          <div>
            <label class="block text-sm font-medium mb-1">Default</label>
            <input type="text" class="input w-full" placeholder="Input normal" />
          </div>

          <!-- Success -->
          <div>
            <label class="block text-sm font-medium mb-1">Email (Success)</label>
            <input type="email" class="input input-success w-full" value="valid@email.com" />
            <p class="text-success text-xs mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6 9 17l-5-5"/></svg>
              Email valid!
            </p>
          </div>

          <!-- Error -->
          <div>
            <label class="block text-sm font-medium mb-1">Password (Error)</label>
            <input type="password" class="input input-error w-full" value="123" />
            <p class="text-error text-xs mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
              Password minimal 8 karakter
            </p>
          </div>

          <!-- Warning -->
          <div>
            <label class="block text-sm font-medium mb-1">Username (Warning)</label>
            <input type="text" class="input input-warning w-full" value="admin" />
            <p class="text-warning text-xs mt-1 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/><path d="M12 9v4"/><path d="M12 17h.01"/></svg>
              Username sudah digunakan
            </p>
          </div>
        </div>
      </div>

      <div class="relative">
        <pre class="overflow-x-auto rounded-box bg-base-200 p-4 text-xs"><code>{{ codes.validation }}</code></pre>
        <button class="absolute top-2 right-2 btn btn-ghost btn-xs" @click="copyCode(codes.validation, 'validation')">
          {{ copiedId === 'validation' ? 'Copied!' : 'Copy' }}
        </button>
      </div>
    </section>

    <!-- Disabled State -->
    <section id="disabled" class="card p-6 space-y-4 scroll-mt-20">
      <h2 class="text-lg font-semibold border-b border-base-300 pb-2">Disabled State</h2>
      <p class="text-sm opacity-70">Form dalam keadaan disabled, misalnya saat loading atau read-only.</p>

      <div class="p-6 bg-base-200 rounded-box">
        <form class="space-y-4 max-w-md opacity-60 pointer-events-none" @submit.prevent>
          <div>
            <label class="block text-sm font-medium mb-1">Nama</label>
            <input type="text" class="input w-full" value="John Doe" disabled />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input type="email" class="input w-full" value="john@example.com" disabled />
          </div>
          <div>
            <label class="block text-sm font-medium mb-1">Role</label>
            <input type="text" class="input w-full" value="Admin" disabled />
          </div>
          <button type="submit" class="btn btn-primary" disabled>Simpan</button>
        </form>
      </div>
    </section>

    <FloatingTOC :items="tocItems" />
  </div>
</template>
