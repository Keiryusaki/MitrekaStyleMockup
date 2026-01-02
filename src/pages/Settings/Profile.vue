<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";

const activeSection = ref("photo");

const sections = [
  { 
    id: "basic", 
    label: "Basic Settings", 
    icon: "user",
    children: [
      { id: "photo", label: "Foto Profil" },
      { id: "details", label: "Detail Profil" },
    ]
  },
  { 
    id: "auth", 
    label: "Authentication", 
    icon: "lock",
    children: [
      { id: "signin", label: "Metode Sign-in" },
      { id: "password", label: "Password" },
      { id: "2fa", label: "Two-Factor Auth" },
    ]
  },
  { 
    id: "security", 
    label: "Security", 
    icon: "shield",
    children: [
      { id: "sessions", label: "Sesi Aktif" },
      { id: "notifications", label: "Notifikasi" },
      { id: "email-prefs", label: "Email Preferences" },
    ]
  },
  { 
    id: "danger-section", 
    label: "Danger Zone", 
    icon: "alert-triangle",
    isDanger: true,
    children: [
      { id: "danger", label: "Hapus Akun", isDanger: true },
    ]
  },
];

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    activeSection.value = id;
  }
};

const allChildren = sections.flatMap(s => s.children || []);

const handleScroll = () => {
  // Get scroll position from the main scroll container
  const scrollContainer = document.querySelector('.overflow-y-auto');
  if (!scrollContainer) return;
  
  const scrollY = scrollContainer.scrollTop + 150;
  let currentId = '';
  
  for (const item of allChildren) {
    const el = document.getElementById(item.id);
    if (el && el.offsetTop <= scrollY) {
      currentId = item.id;
    }
  }
  
  if (currentId) {
    activeSection.value = currentId;
  }
};

onMounted(() => {
  const scrollContainer = document.querySelector('.overflow-y-auto');
  if (scrollContainer) {
    scrollContainer.addEventListener("scroll", handleScroll, { passive: true });
  }
  handleScroll();
});

onUnmounted(() => {
  const scrollContainer = document.querySelector('.overflow-y-auto');
  if (scrollContainer) {
    scrollContainer.removeEventListener("scroll", handleScroll);
  }
});

const profile = ref({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "+62 812 3456 7890",
  company: "Mitreka Technology",
  country: "Indonesia",
  language: "Bahasa Indonesia",
  timezone: "Asia/Jakarta (GMT+7)",
  avatar: "https://i.pravatar.cc/150?img=12",
});

const password = ref({
  current: "",
  new: "",
  confirm: "",
});

const notifications = ref({
  email: true,
  push: true,
  sms: false,
});

const emailPrefs = ref({
  newsletter: true,
  updates: true,
  marketing: false,
});

const isSaving = ref<string | null>(null);

const saveSection = (section: string) => {
  isSaving.value = section;
  setTimeout(() => {
    isSaving.value = null;
  }, 1000);
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Pengaturan Akun"
      description="Kelola informasi profil dan pengaturan akun Anda."
      category="Mockup"
    />

    <div class="flex gap-6">
      <!-- Sidebar Navigation -->
      <aside class="hidden lg:block w-60 shrink-0">
        <div class="sticky top-4 card bg-base-100 p-4 space-y-5">
          <div v-for="group in sections" :key="group.id">
            <!-- Group Header with Icon -->
            <div 
              class="flex items-center gap-2 mb-2"
              :class="group.isDanger ? 'text-error' : 'text-base-content'"
            >
              <Icon :name="group.icon" class="w-4 h-4 opacity-60" />
              <span class="text-xs font-semibold uppercase tracking-wider opacity-70">
                {{ group.label }}
              </span>
            </div>
            <!-- Children with left border -->
            <div class="border-l-2 border-base-300 ml-2 space-y-1">
              <button
                v-for="child in group.children"
                :key="child.id"
                class="w-full text-left pl-3 pr-2 py-2 text-sm rounded-r-lg transition-all -ml-[2px] border-l-2"
                :class="[
                  activeSection === child.id 
                    ? 'border-primary text-primary font-medium bg-primary/10' 
                    : 'border-transparent hover:border-base-content/30 hover:bg-base-200',
                  child.isDanger ? 'text-error hover:bg-error/10 hover:border-error/50' : '',
                  activeSection === child.id && child.isDanger ? 'border-error bg-error/10' : ''
                ]"
                @click="scrollToSection(child.id)"
              >
                {{ child.label }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <div class="flex-1 space-y-6">
        <!-- Profile Photo -->
        <div id="photo" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300">
            <h3 class="font-semibold">Foto Profil</h3>
            <p class="text-sm opacity-60 mt-0.5">Update foto profil Anda</p>
          </div>
          <div class="p-5">
            <div class="flex items-center gap-5">
              <img :src="profile.avatar" class="w-24 h-24 rounded-full object-cover" />
              <div class="space-y-2">
                <div class="flex gap-2">
                  <button class="btn btn-primary btn-sm">Upload Foto</button>
                  <button class="btn btn-secondary btn-sm">Hapus</button>
                </div>
                <p class="text-xs opacity-60">Format: JPG, PNG. Maksimal 2MB.</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Profile Details -->
        <div id="details" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300 flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Detail Profil</h3>
              <p class="text-sm opacity-60 mt-0.5">Informasi dasar akun Anda</p>
            </div>
            <button 
              class="btn btn-primary btn-sm"
              :disabled="isSaving === 'profile'"
              @click="saveSection('profile')"
            >
              <span v-if="isSaving === 'profile'" class="loading loading-spinner loading-xs"></span>
              <span v-else>Simpan</span>
            </button>
          </div>
          <div class="p-5">
            <div class="grid gap-5">
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium mb-1.5">Nama Lengkap</label>
                  <input v-model="profile.name" type="text" class="input w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1.5">Perusahaan</label>
                  <input v-model="profile.company" type="text" class="input w-full" />
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium mb-1.5">No. Telepon</label>
                  <input v-model="profile.phone" type="tel" class="input w-full" />
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1.5">Negara</label>
                  <select v-model="profile.country" class="select w-full">
                    <option>Indonesia</option>
                    <option>Malaysia</option>
                    <option>Singapore</option>
                  </select>
                </div>
              </div>
              <div class="grid md:grid-cols-2 gap-5">
                <div>
                  <label class="block text-sm font-medium mb-1.5">Bahasa</label>
                  <select v-model="profile.language" class="select w-full">
                    <option>Bahasa Indonesia</option>
                    <option>English</option>
                  </select>
                </div>
                <div>
                  <label class="block text-sm font-medium mb-1.5">Timezone</label>
                  <select v-model="profile.timezone" class="select w-full">
                    <option>Asia/Jakarta (GMT+7)</option>
                    <option>Asia/Singapore (GMT+8)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Sign-in Method -->
        <div id="signin" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300">
            <h3 class="font-semibold">Metode Sign-in</h3>
            <p class="text-sm opacity-60 mt-0.5">Kelola email dan metode autentikasi</p>
          </div>
          <div class="p-5 space-y-4">
            <div class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <svg class="w-5 h-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect width="20" height="16" x="2" y="4" rx="2"/>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm">Email Address</p>
                  <p class="text-sm opacity-60">{{ profile.email }}</p>
                </div>
              </div>
              <button class="btn btn-ghost btn-sm">Ubah Email</button>
            </div>

            <div class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center">
                  <svg class="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm">Google</p>
                  <p class="text-sm opacity-60">Belum terhubung</p>
                </div>
              </div>
              <button class="btn btn-success btn-sm">Hubungkan</button>
            </div>

            <div class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm">GitHub</p>
                  <p class="text-sm opacity-60">Belum terhubung</p>
                </div>
              </div>
              <button class="btn btn-success btn-sm">Hubungkan</button>
            </div>
          </div>
        </div>

        <!-- Password -->
        <div id="password" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300 flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Password</h3>
              <p class="text-sm opacity-60 mt-0.5">Ubah password akun Anda</p>
            </div>
            <button 
              class="btn btn-primary btn-sm"
              :disabled="isSaving === 'password'"
              @click="saveSection('password')"
            >
              <span v-if="isSaving === 'password'" class="loading loading-spinner loading-xs"></span>
              <span v-else>Ubah Password</span>
            </button>
          </div>
          <div class="p-5">
            <div class="grid gap-5 max-w-lg">
              <div>
                <label class="block text-sm font-medium mb-1.5">Password Saat Ini</label>
                <input v-model="password.current" type="password" class="input w-full" placeholder="••••••••" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5">Password Baru</label>
                <input v-model="password.new" type="password" class="input w-full" placeholder="Minimal 8 karakter" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5">Konfirmasi Password</label>
                <input v-model="password.confirm" type="password" class="input w-full" placeholder="Ulangi password baru" />
              </div>
            </div>
          </div>
        </div>

        <!-- Two Factor -->
        <div id="2fa" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300">
            <h3 class="font-semibold">Two-Factor Authentication</h3>
            <p class="text-sm opacity-60 mt-0.5">Tambahkan lapisan keamanan ekstra untuk akun Anda</p>
          </div>
          <div class="p-5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                  <svg class="w-6 h-6 text-warning" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium">Authenticator App</p>
                  <p class="text-sm opacity-60">Gunakan app seperti Google Authenticator</p>
                </div>
              </div>
              <button class="btn btn-success btn-sm">Aktifkan</button>
            </div>
          </div>
        </div>

        <!-- Active Sessions -->
        <div id="sessions" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300">
            <h3 class="font-semibold">Sesi Aktif</h3>
            <p class="text-sm opacity-60 mt-0.5">Perangkat yang sedang login ke akun Anda</p>
          </div>
          <div class="p-5 space-y-3">
            <div class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <svg class="w-5 h-5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                    <line x1="8" y1="21" x2="16" y2="21"/>
                    <line x1="12" y1="17" x2="12" y2="21"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm">Windows · Chrome</p>
                  <p class="text-xs opacity-60">Jakarta, Indonesia · Saat ini</p>
                </div>
              </div>
              <span class="badge badge-success badge-sm">Perangkat ini</span>
            </div>
            <div class="flex items-center justify-between p-4 bg-base-200/50 rounded-lg">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-lg bg-base-300 flex items-center justify-center">
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12.01" y2="18"/>
                  </svg>
                </div>
                <div>
                  <p class="font-medium text-sm">iPhone · Safari</p>
                  <p class="text-xs opacity-60">Jakarta, Indonesia · 2 jam lalu</p>
                </div>
              </div>
              <button class="btn btn-error btn-sm btn-outline">Logout</button>
            </div>
          </div>
        </div>

        <!-- Notifications -->
        <div id="notifications" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300 flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Notifikasi</h3>
              <p class="text-sm opacity-60 mt-0.5">Pilih bagaimana Anda ingin menerima notifikasi</p>
            </div>
            <button 
              class="btn btn-primary btn-sm"
              :disabled="isSaving === 'notifications'"
              @click="saveSection('notifications')"
            >
              <span v-if="isSaving === 'notifications'" class="loading loading-spinner loading-xs"></span>
              <span v-else>Simpan</span>
            </button>
          </div>
          <div class="p-5 space-y-4">
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <p class="font-medium">Email</p>
                <p class="text-sm opacity-60">Terima notifikasi via email</p>
              </div>
              <input v-model="notifications.email" type="checkbox" class="toggle toggle-primary" />
            </label>
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <p class="font-medium">Push Notification</p>
                <p class="text-sm opacity-60">Notifikasi di browser atau device</p>
              </div>
              <input v-model="notifications.push" type="checkbox" class="toggle toggle-primary" />
            </label>
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <p class="font-medium">SMS</p>
                <p class="text-sm opacity-60">Terima notifikasi via SMS</p>
              </div>
              <input v-model="notifications.sms" type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
        </div>

        <!-- Email Preferences -->
        <div id="email-prefs" class="card scroll-mt-4">
          <div class="p-5 border-b border-base-300 flex items-center justify-between">
            <div>
              <h3 class="font-semibold">Email Preferences</h3>
              <p class="text-sm opacity-60 mt-0.5">Pilih jenis email yang ingin Anda terima</p>
            </div>
            <button 
              class="btn btn-primary btn-sm"
              :disabled="isSaving === 'email'"
              @click="saveSection('email')"
            >
              <span v-if="isSaving === 'email'" class="loading loading-spinner loading-xs"></span>
              <span v-else>Simpan</span>
            </button>
          </div>
          <div class="p-5 space-y-4">
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <p class="font-medium">Newsletter</p>
                <p class="text-sm opacity-60">Update mingguan tentang fitur dan tips</p>
              </div>
              <input v-model="emailPrefs.newsletter" type="checkbox" class="toggle toggle-primary" />
            </label>
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <p class="font-medium">Product Updates</p>
                <p class="text-sm opacity-60">Informasi update dan maintenance sistem</p>
              </div>
              <input v-model="emailPrefs.updates" type="checkbox" class="toggle toggle-primary" />
            </label>
            <label class="flex items-center justify-between cursor-pointer">
              <div>
                <p class="font-medium">Marketing</p>
                <p class="text-sm opacity-60">Promo dan penawaran khusus</p>
              </div>
              <input v-model="emailPrefs.marketing" type="checkbox" class="toggle toggle-primary" />
            </label>
          </div>
        </div>

        <!-- Danger Zone -->
        <div id="danger" class="card border-error/20 scroll-mt-4">
          <div class="p-5 border-b border-error/20">
            <h3 class="font-semibold text-error">Zona Bahaya</h3>
            <p class="text-sm opacity-60 mt-0.5">Aksi permanen yang tidak dapat dibatalkan</p>
          </div>
          <div class="p-5 space-y-4">
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium">Nonaktifkan Akun</p>
                <p class="text-sm opacity-60">Akun akan dinonaktifkan sementara</p>
              </div>
              <button class="btn btn-warning btn-sm btn-outline">Nonaktifkan</button>
            </div>
            <div class="border-t border-base-300 pt-4 flex items-center justify-between">
              <div>
                <p class="font-medium text-error">Hapus Akun</p>
                <p class="text-sm opacity-60">Hapus akun secara permanen. Tidak dapat dikembalikan!</p>
              </div>
              <button class="btn btn-error btn-sm">Hapus Akun</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
