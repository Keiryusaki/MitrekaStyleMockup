<script setup lang="ts">
import { ref, computed } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import { Icon } from "@/composables/Icon";

interface Notification {
  id: number;
  type: "info" | "success" | "warning" | "error";
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
}

const notifications = ref<Notification[]>([
  { id: 1, type: "info", icon: "rocket", title: "Update Sistem", message: "Versi 2.1.0 telah dirilis dengan fitur baru.", time: "5 menit lalu", read: false },
  { id: 2, type: "success", icon: "credit-card", title: "Pembayaran Berhasil", message: "Invoice #INV-2024-001 telah dibayar.", time: "1 jam lalu", read: false, avatar: "https://i.pravatar.cc/40?img=3" },
  { id: 3, type: "warning", icon: "hard-drive", title: "Storage Hampir Penuh", message: "Penggunaan storage mencapai 85%. Pertimbangkan untuk upgrade.", time: "2 jam lalu", read: false },
  { id: 4, type: "error", icon: "cloud-off", title: "Gagal Backup", message: "Backup otomatis gagal. Silakan coba manual.", time: "3 jam lalu", read: true },
  { id: 5, type: "info", icon: "message-circle", title: "Komentar Baru", message: "John Doe mengomentari postingan Anda.", time: "5 jam lalu", read: true, avatar: "https://i.pravatar.cc/40?img=12" },
  { id: 6, type: "success", icon: "circle-check", title: "Task Selesai", message: "Project Alpha telah selesai dikerjakan.", time: "1 hari lalu", read: true },
  { id: 7, type: "info", icon: "calendar", title: "Undangan Meeting", message: "Anda diundang ke meeting 'Sprint Review' besok pukul 10:00.", time: "1 hari lalu", read: true },
]);

const activeFilter = ref<"all" | "unread">("all");

const filteredNotifications = computed(() => {
  if (activeFilter.value === "unread") {
    return notifications.value.filter(n => !n.read);
  }
  return notifications.value;
});

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

const markAsRead = (id: number) => {
  const notif = notifications.value.find(n => n.id === id);
  if (notif) notif.read = true;
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
};

const deleteNotification = (id: number) => {
  const index = notifications.value.findIndex(n => n.id === id);
  if (index > -1) notifications.value.splice(index, 1);
};

const getTypeColor = (type: string) => {
  switch (type) {
    case "success": return "text-success bg-success/10";
    case "warning": return "text-warning bg-warning/10";
    case "error": return "text-error bg-error/10";
    default: return "text-info bg-info/10";
  }
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      title="Notifications"
      description="Kelola semua notifikasi Anda di satu tempat."
      category="Mockup"
    />

    <div class="grid lg:grid-cols-3 gap-6">
      <!-- Main Content -->
      <div class="lg:col-span-2 space-y-4">
        <!-- Header Bar -->
        <div class="card p-4">
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div class="flex items-center gap-2">
              <button 
                class="btn btn-sm"
                :class="activeFilter === 'all' ? 'btn-primary' : 'btn-ghost'"
                @click="activeFilter = 'all'"
              >
                Semua
              </button>
              <button 
                class="btn btn-sm"
                :class="activeFilter === 'unread' ? 'btn-primary' : 'btn-ghost'"
                @click="activeFilter = 'unread'"
              >
                Belum Dibaca
                <span v-if="unreadCount" class="badge badge-error badge-sm ml-1">{{ unreadCount }}</span>
              </button>
            </div>
            <button 
              v-if="unreadCount > 0"
              class="btn btn-ghost btn-sm"
              @click="markAllAsRead"
            >
              Tandai Semua Dibaca
            </button>
          </div>
        </div>

        <!-- Notification List -->
        <div class="card notif-list">
          <TransitionGroup name="list">
            <div
              v-for="notif in filteredNotifications"
              :key="notif.id"
              class="p-4 flex gap-4 hover:bg-base-200/50 transition-colors"
              :class="{ 'bg-primary/5': !notif.read }"
            >
              <!-- Icon/Avatar -->
              <div class="shrink-0">
                <img 
                  v-if="notif.avatar" 
                  :src="notif.avatar" 
                  class="w-10 h-10 rounded-full"
                />
                <div 
                  v-else
                  class="w-10 h-10 rounded-full flex items-center justify-center"
                  :class="getTypeColor(notif.type)"
                >
                  <Icon :name="notif.icon" class="w-5 h-5" />
                </div>
              </div>

              <!-- Content -->
              <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                  <div>
                    <p class="font-medium text-sm" :class="{ 'text-base-content': !notif.read, 'opacity-70': notif.read }">
                      {{ notif.title }}
                    </p>
                    <p class="text-sm opacity-60 line-clamp-2">{{ notif.message }}</p>
                  </div>
                  <!-- Unread indicator -->
                  <div v-if="!notif.read" class="w-2 h-2 rounded-full bg-primary shrink-0 mt-2"></div>
                </div>
                <div class="flex items-center gap-3 mt-2">
                  <span class="text-xs opacity-50">{{ notif.time }}</span>
                  <button 
                    v-if="!notif.read"
                    class="text-xs text-primary hover:underline"
                    @click="markAsRead(notif.id)"
                  >
                    Tandai dibaca
                  </button>
                  <button 
                    class="text-xs text-error hover:underline"
                    @click="deleteNotification(notif.id)"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          </TransitionGroup>

          <!-- Empty State -->
          <div v-if="filteredNotifications.length === 0" class="p-12 text-center">
            <div class="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mx-auto mb-4">
              <Icon name="bell" class="w-8 h-8 opacity-40" />
            </div>
            <p class="font-medium">Tidak ada notifikasi</p>
            <p class="text-sm opacity-60">{{ activeFilter === 'unread' ? 'Semua notifikasi sudah dibaca.' : 'Belum ada notifikasi untuk ditampilkan.' }}</p>
          </div>
        </div>
      </div>

      <!-- Sidebar - Dropdown Preview -->
      <div class="space-y-4">
        <div class="card p-4">
          <h3 class="font-semibold mb-3">Dropdown Preview</h3>
          <p class="text-sm opacity-60 mb-4">Contoh tampilan dropdown notifikasi di navbar.</p>
          
          <!-- Mock Dropdown -->
          <div class="border border-base-300 rounded-lg overflow-hidden shadow-lg">
            <div class="p-3 border-b border-base-300 bg-base-200/50 flex items-center justify-between">
              <span class="font-medium text-sm">Notifikasi</span>
              <span v-if="unreadCount" class="badge badge-primary badge-sm">{{ unreadCount }} baru</span>
            </div>
            <div class="max-h-64 overflow-y-auto notif-list">
              <div
                v-for="notif in notifications.slice(0, 4)"
                :key="'preview-' + notif.id"
                class="p-3 flex gap-3 hover:bg-base-200/50 cursor-pointer"
                :class="{ 'bg-primary/5': !notif.read }"
              >
                <div 
                  class="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                  :class="getTypeColor(notif.type)"
                >
                  <Icon :name="notif.icon" class="w-4 h-4" />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-medium truncate">{{ notif.title }}</p>
                  <p class="text-xs opacity-50">{{ notif.time }}</p>
                </div>
                <div v-if="!notif.read" class="w-2 h-2 rounded-full bg-primary shrink-0"></div>
              </div>
            </div>
            <div class="p-2 border-t border-base-300 bg-base-200/50">
              <button class="btn btn-ghost btn-sm w-full">Lihat Semua</button>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div class="card p-4">
          <h3 class="font-semibold mb-3">Statistik</h3>
          <div class="space-y-3">
            <div class="flex items-center justify-between">
              <span class="text-sm opacity-70">Total</span>
              <span class="font-medium">{{ notifications.length }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm opacity-70">Belum Dibaca</span>
              <span class="font-medium text-primary">{{ unreadCount }}</span>
            </div>
            <div class="flex items-center justify-between">
              <span class="text-sm opacity-70">Sudah Dibaca</span>
              <span class="font-medium">{{ notifications.length - unreadCount }}</span>
            </div>
          </div>
        </div>

        <!-- Code Example -->
        <div class="card p-4">
          <h3 class="font-semibold mb-3">Badge di Icon</h3>
          <p class="text-sm opacity-60 mb-4">Contoh badge notifikasi di icon bell.</p>
          <div class="flex items-center gap-4">
            <div class="relative">
              <button class="btn btn-ghost btn-circle">
                <Icon name="bell" class="w-6 h-6" />
              </button>
              <span class="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-content text-xs rounded-full flex items-center justify-center font-medium">
                {{ unreadCount > 9 ? '9+' : unreadCount }}
              </span>
            </div>
            <div class="relative">
              <button class="btn btn-ghost btn-circle">
                <Icon name="bell" class="w-6 h-6" />
              </button>
              <span class="absolute top-0 right-0 w-2.5 h-2.5 bg-error rounded-full border-2 border-base-100"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.notif-list > :not(:last-child) {
  border-bottom: 1px solid color-mix(in srgb, var(--color-base-300) 70%, transparent);
}
</style>
