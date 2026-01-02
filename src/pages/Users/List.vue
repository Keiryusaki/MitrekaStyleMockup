<template>
  <div class="grid gap-4">
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h1 class="text-lg sm:text-xl font-semibold">Users</h1>
      <div class="flex gap-2">
        <button class="btn btn-outline btn-sm sm:btn-md">Export</button>
        <router-link to="/users/new" class="btn btn-success btn-sm sm:btn-md"
          >Add user</router-link
        >
      </div>
    </div>

    <DataTable :headers="headers" :rows="rows" :page-size="8">
      <template #cell:name="{ row }">
        <div class="flex items-center gap-2">
          <span
            class="inline-flex items-center justify-center rounded-full bg-primary text-primary-content w-8 h-8 text-sm"
            >{{ row.name[0] }}</span
          >
          <div>
            <div class="font-medium">{{ row.name }}</div>
            <div class="opacity-70">{{ row.email }}</div>
          </div>
        </div>
      </template>
      <template #cell:role="{ row }"
        ><span class="badge badge-soft-primary">{{ row.role }}</span></template
      >
      <template #cell:actions="{ row }">
        <router-link :to="`/users/${row.id}`" class="btn btn-warning btn-sm"
          >Edit</router-link
        >
      </template>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import DataTable from "@/components/data/DataTable.vue";

type H = { key: string; label: string };
const headers: H[] = [
  { key: "name", label: "Name" },
  { key: "role", label: "Role" },
  { key: "createdAt", label: "Created" },
  { key: "actions", label: "" },
];
const rows = ref(
  Array.from({ length: 22 }).map((_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 3 === 1 ? "Editor" : "Viewer",
    createdAt: new Date(Date.now() - i * 86400000).toLocaleDateString(),
  }))
);
</script>
