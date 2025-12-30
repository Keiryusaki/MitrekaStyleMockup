<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Icon } from '@/composables/Icon'

export interface TOCItem {
  id: string
  label: string
}

const props = defineProps<{
  items: TOCItem[]
  title?: string
}>()

const isOpen = ref(false)
const activeId = ref<string>('')
const showScrollTop = ref(false)

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    activeId.value = id
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

function open() {
  isOpen.value = true
}

function close() {
  isOpen.value = false
}

function handleScroll() {
  showScrollTop.value = window.scrollY > 300
  
  const scrollY = window.scrollY + 120
  let currentId = ''
  
  for (const item of props.items) {
    const el = document.getElementById(item.id)
    if (el && el.offsetTop <= scrollY) {
      currentId = item.id
    }
  }
  
  if (currentId) {
    activeId.value = currentId
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <!-- Backdrop for click outside -->
  <div v-if="isOpen" class="toc-backdrop" @click="close"></div>

  <!-- Toggle Button - Always at fixed position -->
  <Transition name="trigger-fade">
    <button
      v-if="!isOpen"
      @click="open"
      class="toc-trigger"
      title="Show Table of Contents"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
      </svg>
    </button>
  </Transition>

  <!-- TOC Panel -->
  <Transition name="toc-slide">
    <div v-if="isOpen" class="toc-panel">
      <div class="toc-header">
        <span>{{ title || 'On This Page' }}</span>
        <button @click="close" class="toc-close" title="Close">
          <Icon name="x" class="w-4 h-4" />
        </button>
      </div>
      <nav class="toc-nav">
        <button
          v-for="item in items"
          :key="item.id"
          @click="scrollTo(item.id)"
          class="toc-item"
          :class="{ 'is-active': activeId === item.id }"
        >
          {{ item.label }}
        </button>
      </nav>
    </div>
  </Transition>

  <!-- Scroll to Top - Above live chat -->
  <Transition name="scroll-fade">
    <button
      v-if="showScrollTop"
      @click="scrollToTop"
      class="scroll-top-btn"
      title="Scroll to top"
    >
      <Icon name="chevron-up" class="w-5 h-5" />
    </button>
  </Transition>
</template>

<style scoped>
/* Backdrop for click outside */
.toc-backdrop {
  position: fixed;
  inset: 0;
  z-index: 34;
}

/* Trigger button - Fixed position */
.toc-trigger {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 35;
  width: 44px;
  height: 44px;
  border-radius: 12px 0 0 12px;
  background: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  border-right: none;
  box-shadow: -4px 0 12px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease, width 0.2s ease;
  color: var(--color-base-content);
}

.toc-trigger:hover {
  background: var(--color-primary);
  color: var(--color-primary-content);
  width: 52px;
}

/* Panel - Fixed position */
.toc-panel {
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  z-index: 35;
  width: 280px;
  max-height: 70vh;
  background: var(--color-base-100);
  border: 1px solid var(--color-base-300);
  border-right: none;
  border-radius: 12px 0 0 12px;
  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.toc-header {
  padding: 1rem 1.25rem;
  font-weight: 600;
  font-size: 0.9375rem;
  border-bottom: 1px solid var(--color-base-300);
  background: var(--color-base-200);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.toc-close {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-base-content);
  opacity: 0.6;
  transition: all 0.15s ease;
}

.toc-close:hover {
  background: var(--color-base-300);
  opacity: 1;
}

.toc-nav {
  flex: 1;
  overflow-y: auto;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.toc-item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 0.625rem 0.875rem;
  font-size: 0.8125rem;
  line-height: 1.4;
  color: var(--color-base-content);
  opacity: 0.75;
  border-radius: 8px;
  border: none;
  background: transparent;
  cursor: pointer;
  transition: all 0.15s ease;
}

.toc-item:hover {
  background: var(--color-base-200);
  opacity: 1;
}

.toc-item.is-active {
  background: var(--color-primary);
  color: var(--color-primary-content);
  opacity: 1;
  font-weight: 500;
}

/* Scroll to Top Button */
.scroll-top-btn {
  position: fixed;
  bottom: 6.5rem;
  right: 1.25rem;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--color-primary);
  color: var(--color-primary-content);
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 35;
  transition: all 0.2s ease;
}

.scroll-top-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

/* Transitions */
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toc-slide-enter-from,
.toc-slide-leave-to {
  opacity: 0;
  transform: translateY(-50%) translateX(100%);
}

.trigger-fade-enter-active {
  transition: opacity 0.2s ease 0.15s; /* delay to wait for panel close */
}

.trigger-fade-leave-active {
  transition: opacity 0.1s ease;
}

.trigger-fade-enter-from,
.trigger-fade-leave-to {
  opacity: 0;
}

.scroll-fade-enter-active,
.scroll-fade-leave-active {
  transition: all 0.2s ease;
}

.scroll-fade-enter-from,
.scroll-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
</style>
