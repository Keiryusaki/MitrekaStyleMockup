<script setup lang="ts">
import { StatCard as BaseStatCard } from "@/lib/mitreka-ui-dist/vue";

defineProps<{ icon?: string; label: string; value: string | number }>();
</script>

<template>
  <BaseStatCard :icon="icon" :label="label" :value="value" />
</template>

