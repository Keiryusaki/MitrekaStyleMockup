<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@/composables/Icon";

interface Notification {
  id: number;
  type: "info" | "success" | "warning" | "error";
  icon: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const router = useRouter();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const notifications = ref<Notification[]>([
  { id: 1, type: "info", icon: "rocket", title: "Update Sistem", message: "Versi 2.1.0 telah dirilis dengan fitur baru.", time: "5 menit lalu", read: false },
  { id: 2, type: "success", icon: "credit-card", title: "Pembayaran Berhasil", message: "Invoice #INV-2024-001 telah dibayar.", time: "1 jam lalu", read: false },
  { id: 3, type: "warning", icon: "hard-drive", title: "Storage Hampir Penuh", message: "Penggunaan storage mencapai 85%.", time: "2 jam lalu", read: false },
  { id: 4, type: "error", icon: "cloud-off", title: "Gagal Backup", message: "Backup otomatis gagal.", time: "3 jam lalu", read: true },
  { id: 5, type: "info", icon: "message-circle", title: "Komentar Baru", message: "John Doe mengomentari postingan Anda.", time: "5 jam lalu", read: true },
]);

const unreadCount = computed(() => notifications.value.filter(n => !n.read).length);

const getTypeColor = (type: string) => {
  switch (type) {
    case "success": return "text-success bg-success/10";
    case "warning": return "text-warning bg-warning/10";
    case "error": return "text-error bg-error/10";
    default: return "text-info bg-info/10";
  }
};

const markAsRead = (id: number) => {
  const notif = notifications.value.find(n => n.id === id);
  if (notif) notif.read = true;
};

const markAllAsRead = () => {
  notifications.value.forEach(n => n.read = true);
};

const viewAll = () => {
  isOpen.value = false;
  router.push("/notifications");
};

const handleClickOutside = (e: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(e.target as Node)) {
    isOpen.value = false;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onUnmounted(() => document.removeEventListener("click", handleClickOutside));
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <!-- Bell Button -->
    <button
      class="btn btn-ghost btn-sm text-white! relative"
      title="Notifikasi"
      @click.stop="isOpen = !isOpen"
    >
      <Icon :name="unreadCount > 0 ? 'bell-dot' : 'bell'" class="w-5 h-5" />
      <!-- Badge -->
      <span
        v-if="unreadCount > 0"
        class="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-error text-error-content text-[10px] rounded-full flex items-center justify-center font-semibold px-1"
      >
        {{ unreadCount > 9 ? '9+' : unreadCount }}
      </span>
    </button>

    <!-- Dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95 -translate-y-1"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 -translate-y-1"
    >
      <div
        v-if="isOpen"
        class="fixed left-2 right-2 top-16 sm:absolute sm:left-auto sm:right-0 sm:top-full sm:mt-2 sm:w-80 bg-base-100 text-base-content rounded-lg shadow-xl border border-base-300 overflow-hidden z-[120]"
      >
        <!-- Header -->
        <div class="p-3 border-b border-base-300 flex items-center justify-between bg-base-200/50">
          <span class="font-semibold text-sm">Notifikasi</span>
          <button
            v-if="unreadCount > 0"
            class="text-xs text-primary hover:underline"
            @click="markAllAsRead"
          >
            Tandai semua dibaca
          </button>
        </div>

        <!-- List -->
        <div class="max-h-80 overflow-y-auto notif-list">
          <div
            v-for="notif in notifications.slice(0, 5)"
            :key="notif.id"
            class="p-3 flex gap-3 hover:bg-base-200/50 cursor-pointer transition-colors"
            :class="{ 'bg-primary/5': !notif.read }"
            @click="markAsRead(notif.id)"
          >
            <!-- Icon -->
            <div
              class="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
              :class="getTypeColor(notif.type)"
            >
              <Icon :name="notif.icon" class="w-4 h-4" />
            </div>

            <!-- Content -->
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <p class="text-sm font-medium truncate" :class="{ 'opacity-70': notif.read }">
                  {{ notif.title }}
                </p>
                <span v-if="!notif.read" class="w-2 h-2 rounded-full bg-primary shrink-0 mt-1.5"></span>
              </div>
              <p class="text-xs opacity-60 line-clamp-1">{{ notif.message }}</p>
              <p class="text-xs opacity-40 mt-0.5">{{ notif.time }}</p>
            </div>
          </div>

          <!-- Empty State -->
          <div v-if="notifications.length === 0" class="p-8 text-center">
            <Icon name="bell" class="w-10 h-10 mx-auto opacity-30 mb-2" />
            <p class="text-sm opacity-60">Tidak ada notifikasi</p>
          </div>
        </div>

        <!-- Footer -->
        <div class="p-2 border-t border-base-300 bg-base-200/50">
          <button
            class="btn btn-ghost btn-sm w-full text-primary"
            @click="viewAll"
          >
            Lihat Semua Notifikasi
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.notif-list > :not(:last-child) {
  border-bottom: 1px solid color-mix(in srgb, var(--color-base-300) 70%, transparent);
}
</style>
