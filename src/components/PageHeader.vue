<template>
  <header class="mb-6">
    <div class="flex items-center gap-3">
      <h1 class="text-2xl font-bold text-base-content">{{ title }}</h1>
      <span 
        v-if="category" 
        class="badge text-xs uppercase tracking-wide"
        :class="badgeClass"
      >
        {{ category }}
      </span>
    </div>
    <p v-if="description" class="text-sm opacity-70 mt-1 max-w-2xl">{{ description }}</p>
  </header>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  title: string;
  description?: string;
  category?: string;
}>();

const categoryColors: Record<string, string> = {
  foundation: "badge-soft-info",
  components: "badge-soft-primary",
  patterns: "badge-soft-accent",
  guides: "badge-soft-success",
  mockup: "badge-soft-warning",
};

const badgeClass = computed(() => {
  if (!props.category) return "";
  const key = props.category.toLowerCase();
  return categoryColors[key] || "badge-soft-primary";
});
</script>
