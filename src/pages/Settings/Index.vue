<template>
  <div class="grid gap-4">
    <h1 class="text-xl font-semibold">Settings</h1>
    <div class="card p-0 overflow-hidden">
      <div class="border-b border-base-300 px-4 py-2 flex gap-2">
        <button
          class="btn btn-ghost btn-sm"
          :class="tab === 'general' && 'btn-soft-primary'"
          @click="tab = 'general'"
        >
          General
        </button>
        <button
          class="btn btn-ghost btn-sm"
          :class="tab === 'appearance' && 'btn-soft-primary'"
          @click="tab = 'appearance'"
        >
          Appearance
        </button>
        <button
          class="btn btn-ghost btn-sm"
          :class="tab === 'email' && 'btn-soft-primary'"
          @click="tab = 'email'"
        >
          Email
        </button>
      </div>
      <div class="p-4 md:p-6">
        <section v-if="tab === 'general'" class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm">Site name</label>
            <input class="input mt-1" placeholder="My Admin" />
          </div>
          <div>
            <label class="text-sm">Timezone</label>
            <select class="select mt-1">
              <option>UTC</option>
              <option>Asia/Jakarta</option>
            </select>
          </div>
        </section>
        <section
          v-else-if="tab === 'appearance'"
          class="grid md:grid-cols-2 gap-4"
        >
          <div>
            <label class="text-sm">Theme</label>
            <div class="mt-2 flex gap-2">
              <button class="btn" @click="ui.setTheme('mitrekalight')">
                Light
              </button>
              <button class="btn" @click="ui.setTheme('mitrekadark')">
                Dark
              </button>
            </div>
          </div>
          <div>
            <label class="text-sm">Density</label>
            <div class="mt-2 flex gap-2">
              <span class="badge badge-soft-primary">md</span>
              <span class="badge">(custom density token ready)</span>
            </div>
          </div>
        </section>
        <section v-else class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="text-sm">SMTP Host</label>
            <input class="input mt-1" placeholder="smtp.example.com" />
          </div>
          <div>
            <label class="text-sm">Port</label>
            <input class="input mt-1" placeholder="587" />
          </div>
          <div class="md:col-span-2">
            <label class="text-sm">From address</label>
            <input class="input mt-1" placeholder="no-reply@example.com" />
          </div>
          <button
            class="btn btn-primary w-max"
            @click="
              ui.notify({
                type: 'success',
                title: 'Saved',
                message: 'Email settings updated',
              })
            "
          >
            Save
          </button>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useUi } from "@/stores/ui";
const ui = useUi();
const tab = ref<"general" | "appearance" | "email">("general");
</script>
