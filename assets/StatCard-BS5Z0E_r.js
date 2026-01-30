const a=`<script setup lang="ts">
import { StatCard as BaseStatCard } from "@keiryusaki/mitreka-ui/vue";

defineProps<{ icon?: string; label: string; value: string | number }>();
<\/script>

<template>
  <BaseStatCard :icon="icon" :label="label" :value="value" />
</template>
`;export{a as default};
