<script setup lang="ts">
import { Toasts as BaseToasts } from "@keiryusaki/mitreka-ui/vue";
</script>

<template>
  <BaseToasts />
</template>

<style>
.toast-container {
  z-index: var(--z-toast) !important;
}

.toast-container.toast-pos-top-left,
.toast-container.toast-pos-top-center,
.toast-container.toast-pos-top-right {
  top: calc(var(--layout-topbar-height) + 0.75rem) !important;
}
</style>
