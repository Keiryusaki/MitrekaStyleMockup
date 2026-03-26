<script setup lang="ts">
import { PageHeader as BasePageHeader } from "@/lib/mitreka-ui-dist/vue";

defineProps<{
  title: string;
  description?: string;
  category?: string;
}>();
</script>

<template>
  <BasePageHeader :title="title" :description="description" :category="category" />
</template>

