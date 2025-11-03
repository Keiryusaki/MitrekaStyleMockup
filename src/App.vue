<template>
  <!-- kunci tinggi viewport & matikan scroll di body -->
  <div class="h-dvh overflow-hidden">
    <AppLayout />
    <ChatSuggest />
  </div>
</template>

<script setup lang="ts">
import AppLayout from "./layouts/AppLayout.vue";
import ChatSuggest from "@/components/ChatSuggest.vue";
</script>
