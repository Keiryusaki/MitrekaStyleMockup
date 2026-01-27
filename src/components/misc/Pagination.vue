<script setup lang="ts">
import { Pagination as BasePagination } from "@keiryusaki/mitreka-ui/vue";

defineProps<{ page: number; pages: number }>();
const emit = defineEmits<{
  (e: "change", page: number): void;
}>();
</script>

<template>
  <BasePagination :page="page" :pages="pages" @change="emit('change', $event)" />
</template>
