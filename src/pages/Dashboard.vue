<template>
  <div class="grid gap-4 md:gap-6">
    <div class="grid md:grid-cols-4 gap-4">
      <StatCard icon="📈" label="Revenue" :value="'$12,340'" />
      <StatCard icon="🛒" label="Orders" :value="321" />
      <StatCard icon="👥" label="Users" :value="1280" />
      <StatCard icon="⚠️" label="Alerts" :value="3" />
    </div>

    <Card>
      <template #title>
        <div class="flex items-center justify-between">
          <div class="font-semibold">Recent Activity</div>
          <div class="flex gap-2">
            <button class="btn btn-outline btn-sm">Export</button>
            <button class="btn btn-success btn-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.25"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide lucide-circle-plus-icon lucide-circle-plus"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 12h8" />
                <path d="M12 8v8" />
              </svg>
              Add
            </button>
          </div>
        </div>
      </template>
      <ul class="divide-y divide-base-300">
        <li class="py-3">✅ Deployed build 1.0.2</li>
        <li class="py-3">👤 New user registered</li>
        <li class="py-3">✉️ Email service configured</li>
      </ul>
    </Card>
  </div>
</template>
<script setup lang="ts">
import Card from "@/components/data/Card.vue";
import StatCard from "@/components/data/StatCard.vue";
</script>
