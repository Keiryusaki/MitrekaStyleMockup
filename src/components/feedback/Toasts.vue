<template>
  <teleport to="body">
    <div
      class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-[min(92vw,360px)]"
    >
      <div
        v-for="t in ui.toasts"
        :key="t.id"
        class="card p-3 border-l-4"
        :class="kind(t.type)"
      >
        <div class="flex items-start gap-2">
          <div class="text-lg leading-none">{{ icon(t.type) }}</div>
          <div class="flex-1">
            <div v-if="t.title" class="font-semibold mb-0.5">{{ t.title }}</div>
            <div class="text-sm">{{ t.message }}</div>
          </div>
          <button class="btn btn-ghost btn-sm" @click="ui.dismiss(t.id)">
            ✕
          </button>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { useUi } from "@/stores/ui";
const ui = useUi();
const icon = (k: string) =>
  ((
    {
      info: "ℹ️",
      success: "✅",
      warning: "⚠️",
      error: "⛔",
      primary: "★",
    } as any
  )[k] || "•");
const kind = (k: string) =>
  ((
    {
      info: "border-info bg-info/10",
      success: "border-success bg-success/10",
      warning: "border-warning bg-warning/10",
      error: "border-error bg-error/10",
      primary: "border-primary bg-primary/10",
    } as Record<string, string>
  )[k] || "border-base-300");
</script>
