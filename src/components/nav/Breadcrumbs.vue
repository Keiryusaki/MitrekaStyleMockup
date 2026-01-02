<template>
  <nav v-if="!isHome" class="text-xs sm:text-sm mb-2 overflow-x-auto">
    <ol class="flex items-center gap-1 sm:gap-2 whitespace-nowrap">
      <li><router-link to="/" class="text-primary dark:text-accent hover:underline">Home</router-link></li>
      <li v-for="(m, i) in tail" :key="i" class="flex items-center gap-1 sm:gap-2">
        <span class="opacity-50">/</span>
        <span v-if="i < tail.length - 1">
          <router-link :to="m.path" class="text-primary dark:text-accent hover:underline">{{
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

const isHome = computed(() => route.path === "/");

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
