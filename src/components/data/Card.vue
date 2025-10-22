<template>
  <section class="card p-4 md:p-6">
    <header v-if="$slots.title" class="mb-3"><slot name="title" /></header>
    <slot />
  </section>
</template>
<script setup lang="ts"></script>
