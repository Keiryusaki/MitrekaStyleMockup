<template>
  <nav class="text-sm mb-2">
    <ol class="flex items-center gap-2">
      <li><router-link to="/" class="text-primary">Home</router-link></li>
      <li v-for="(m, i) in tail" :key="i" class="flex items-center gap-2">
        <span>/</span>
        <span v-if="i < tail.length - 1">
          <router-link :to="m.path" class="text-primary">{{
            m.title
          }}</router-link>
        </span>
        <span v-else class="opacity-70">{{ m.title }}</span>
      </li>
    </ol>
  </nav>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
const tail = computed(() => {
  const segs = route.path.split("/").filter(Boolean);
  const acc: { title: string; path: string }[] = [];
  let cur = "";
  segs.forEach((s) => {
    cur += `/${s}`;
    acc.push({ title: s.charAt(0).toUpperCase() + s.slice(1), path: cur });
  });
  return acc;
});
</script>
