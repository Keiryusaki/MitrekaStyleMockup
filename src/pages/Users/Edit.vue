<template>
  <div class="grid gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Edit User</h1>
      <div class="flex gap-2">
        <button class="btn btn-ghost">Cancel</button>
        <button class="btn btn-primary">Save</button>
      </div>
    </div>

    <div class="grid md:grid-cols-3 gap-4">
      <Card class="md:col-span-2">
        <template #title><div class="font-semibold">Profile</div></template>
        <div class="grid md:grid-cols-2 gap-3">
          <div>
            <label class="text-sm">Full name</label>
            <input class="input mt-1" placeholder="Jane Doe" />
          </div>
          <div>
            <label class="text-sm">Email</label>
            <input class="input mt-1" placeholder="jane@example.com" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm">Role</label>
            <select class="select mt-1">
              <option>Admin</option>
              <option>Editor</option>
              <option>Viewer</option>
            </select>
          </div>
        </div>
      </Card>

      <Card>
        <template #title><div class="font-semibold">Security</div></template>
        <div class="space-y-3">
          <label class="flex items-center gap-2">
            <input type="checkbox" class="switch" checked />
            <span>Require 2FA</span>
          </label>
          <label class="flex items-center gap-2">
            <input type="checkbox" class="checkbox checkbox-success" />
            <span>Active</span>
          </label>
        </div>
      </Card>
    </div>
  </div>
</template>
<script setup lang="ts">
import Card from "@/components/data/Card.vue";
</script>
