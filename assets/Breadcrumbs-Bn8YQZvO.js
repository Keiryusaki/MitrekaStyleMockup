const e=`<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { Breadcrumbs as BaseBreadcrumbs } from "@keiryusaki/mitreka-ui/vue";

const route = useRoute();

const isHome = computed(() => route.path === "/");

const items = computed(() => {
  const segs = route.path.split("/").filter(Boolean);
  const acc: { label: string; href: string }[] = [];
  let cur = "";
  segs.forEach((s) => {
    cur += \`/\${s}\`;
    acc.push({ label: s.charAt(0).toUpperCase() + s.slice(1), href: cur });
  });
  return acc;
});
<\/script>

<template>
  <BaseBreadcrumbs v-if="!isHome" :items="items" />
</template>
`;export{e as default};
