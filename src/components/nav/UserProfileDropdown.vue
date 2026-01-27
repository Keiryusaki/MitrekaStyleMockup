<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@/composables/Icon";
import { useToast } from "@keiryusaki/mitreka-ui/composables";

const router = useRouter();
const toast = useToast();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

// Mock user data
const user = ref({
  name: "John Doe",
  email: "john.doe@mitreka.com",
  role: "Administrator",
  avatar: null as string | null,
});

const menuItems = [
  { icon: "user", label: "Profil Saya", path: "/settings/profile" },
  { icon: "settings", label: "Pengaturan", path: "/settings/profile" },
  { icon: "help-circle", label: "Bantuan", path: "/guide" },
];

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map(n => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

const navigate = (path: string) => {
  isOpen.value = false;
  router.push(path);
};

const logout = () => {
  isOpen.value = false;
  toast.notify({ type: "info", message: "Logging out…" });
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
    <!-- Avatar Button -->
    <button
      class="btn btn-ghost btn-sm px-1.5 text-white! flex items-center gap-2"
      title="Profile"
      @click.stop="isOpen = !isOpen"
    >
      <!-- Avatar -->
      <div class="w-8 h-8 rounded-full bg-primary-content/20 flex items-center justify-center overflow-hidden ring-2 ring-white/30">
        <img
          v-if="user.avatar"
          :src="user.avatar"
          :alt="user.name"
          class="w-full h-full object-cover"
        />
        <span v-else class="text-xs font-semibold text-white">{{ getInitials(user.name) }}</span>
      </div>
      <!-- Name (hidden on mobile) -->
      <span class="hidden lg:block text-sm font-medium max-w-24 truncate">{{ user.name }}</span>
      <Icon name="chevron-down" class="w-4 h-4 hidden lg:block" />
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
        class="absolute right-0 top-full mt-2 w-64 bg-base-100 text-base-content rounded-lg shadow-xl border border-base-300 overflow-hidden z-50"
      >
        <!-- User Info Header -->
        <div class="p-4 border-b border-base-300 bg-base-200/50">
          <div class="flex items-center gap-3">
            <!-- Avatar -->
            <div class="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
              <img
                v-if="user.avatar"
                :src="user.avatar"
                :alt="user.name"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-sm font-semibold text-primary">{{ getInitials(user.name) }}</span>
            </div>
            <!-- Info -->
            <div class="flex-1 min-w-0">
              <p class="font-semibold text-sm truncate">{{ user.name }}</p>
              <p class="text-xs opacity-60 truncate">{{ user.email }}</p>
              <span class="inline-block mt-1 text-[10px] px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">
                {{ user.role }}
              </span>
            </div>
          </div>
        </div>

        <!-- Menu Items -->
        <div class="py-1">
          <button
            v-for="item in menuItems"
            :key="item.path"
            class="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-base-200/70 transition-colors text-left"
            @click="navigate(item.path)"
          >
            <Icon :name="item.icon" class="w-4 h-4 opacity-60" />
            <span class="text-sm">{{ item.label }}</span>
          </button>
        </div>

        <!-- Logout -->
        <div class="border-t border-base-300 py-1">
          <button
            class="w-full px-4 py-2.5 flex items-center gap-3 hover:bg-error/10 transition-colors text-left text-error"
            @click="logout"
          >
            <Icon name="log-out" class="w-4 h-4" />
            <span class="text-sm font-medium">Keluar</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>
