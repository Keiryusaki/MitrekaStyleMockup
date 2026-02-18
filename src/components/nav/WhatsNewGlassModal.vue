<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="whatsnew-overlay"
        role="dialog"
        aria-modal="true"
        aria-label="What's new"
        @click.self="closeModal"
      >
        <div :class="['whatsnew-modal', modalToneClass]">
          <div class="whatsnew-hero">
            <div class="whatsnew-title-wrap">
              <div class="title-icon">
                <Icon name="sparkles" class="w-5 h-5" />
              </div>
              <p class="whatsnew-eyebrow">Release Update</p>
              <h2 class="whatsnew-title">What&apos;s New in {{ releaseVersion }}</h2>
              <p class="whatsnew-subtitle">
                Ringkasan update terbaru yang siap dipakai di project.
              </p>
            </div>
            <button class="btn btn-ghost btn-sm btn-close" @click="closeModal" aria-label="Close">
              <Icon name="x" class="w-4 h-4" />
            </button>
          </div>

          <div class="whatsnew-grid">
            <article class="glass-tile">
              <div class="tile-icon tile-icon-primary">
                <Icon name="rocket" class="w-4 h-4" />
              </div>
              <p class="tile-label">Latest Package</p>
              <p class="tile-main">@keiryusaki/mitreka-ui</p>
              <p class="tile-sub">v{{ releaseVersion }}</p>
            </article>
            <article class="glass-tile">
              <div class="tile-icon tile-icon-warn">
                <Icon name="calendar-days" class="w-4 h-4" />
              </div>
              <p class="tile-label">Starter Pack</p>
              <p class="tile-main">v{{ starterPackVersion }}</p>
              <p class="tile-sub">{{ starterPackName }}</p>
              <a :href="starterPackDownloadUrl" :download="starterPackName" class="tile-download">
                Download Zip
              </a>
            </article>
            <article class="glass-tile">
              <div class="tile-icon tile-icon-info">
                <Icon name="clipboard" class="w-4 h-4" />
              </div>
              <p class="tile-label">Total Components</p>
              <p class="tile-main">{{ totalComponents }}</p>
              <p class="tile-sub">Reusable UI blocks</p>
            </article>
            <article class="glass-tile tile-highlight">
              <div class="tile-icon tile-icon-accent">
                <Icon name="info" class="w-4 h-4" />
              </div>
              <p class="tile-label">Highlight</p>
              <p class="tile-main">AG Grid</p>
              <p class="tile-sub">Mobile pagination + layout stabilizer</p>
            </article>
          </div>

          <section class="glass-panel">
            <div class="panel-head">
              <h3>Latest Changelog</h3>
              <RouterLink to="/ChangeLog" class="btn btn-ghost btn-sm btn-view-all">View All</RouterLink>
            </div>
            <ul class="changelog-list">
              <li>Mobile pagination jadi 2 baris dan center.</li>
              <li>Page size selector tetap tampil di mobile view.</li>
              <li>Paging summary/actions dipindah ke baris kedua.</li>
            </ul>
          </section>

          <section class="whatsnew-actions">
            <button class="btn btn-primary btn-sm" @click="copyInstallCommand">
              Copy Install Command
            </button>
            <a
              :href="starterPackDownloadUrl"
              :download="starterPackName"
              class="btn btn-outline btn-sm btn-copy-starter"
            >
              Download Starter Pack
            </a>
            <button class="btn btn-outline btn-sm btn-copy-starter" @click="copyStarterPackName">
              Copy Starter Pack Name
            </button>
            <RouterLink to="/theme-builder-docs" class="btn btn-ghost btn-sm btn-theme-docs" @click="closeModal">
              Theme Builder Docs
            </RouterLink>
          </section>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";
import { RouterLink } from "vue-router";
import { useToast } from "@keiryusaki/mitreka-ui/composables";

const props = defineProps<{
  modelValue: boolean;
  releaseVersion: string;
  starterPackName: string;
  starterPackVersion: string;
  totalComponents: number;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "dismissed"): void;
}>();

const toast = useToast();
const starterPackName = computed(() => props.starterPackName);
const starterPackDownloadUrl = computed(
  () => `${import.meta.env.BASE_URL}downloads/${props.starterPackName}`
);
const isDarkTheme = ref(false);
let htmlObserver: MutationObserver | null = null;

const syncThemeMode = () => {
  const html = document.documentElement;
  isDarkTheme.value =
    html.classList.contains("dark") ||
    (html.getAttribute("data-theme") || "").toLowerCase() === "mitrekadark";
};

const modalToneClass = computed(() => {
  return isDarkTheme.value ? "tone-light" : "tone-dark";
});

const closeModal = () => {
  emit("update:modelValue", false);
  emit("dismissed");
};

const copyInstallCommand = async () => {
  const text = `npm i @keiryusaki/mitreka-ui@${props.releaseVersion}`;
  await navigator.clipboard.writeText(text);
  toast.notify({ type: "success", message: "Install command copied." });
};

const copyStarterPackName = async () => {
  await navigator.clipboard.writeText(starterPackName.value);
  toast.notify({ type: "success", message: "Starter pack filename copied." });
};

const onEsc = (e: KeyboardEvent) => {
  if (e.key === "Escape") closeModal();
};

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.addEventListener("keydown", onEsc);
      return;
    }
    document.removeEventListener("keydown", onEsc);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  document.removeEventListener("keydown", onEsc);
  htmlObserver?.disconnect();
});

onMounted(() => {
  syncThemeMode();
  htmlObserver = new MutationObserver(syncThemeMode);
  htmlObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class", "data-theme"],
  });
});
</script>

<style scoped>
.whatsnew-overlay {
  position: fixed;
  inset: 0;
  z-index: 150;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: transparent;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
}

.whatsnew-modal {
  width: min(960px, 96vw);
  max-height: min(84vh, 860px);
  overflow: auto;
  border-radius: 1rem;
  padding: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.24);
  backdrop-filter: blur(2px) saturate(50%);
  -webkit-backdrop-filter: blur(2px) saturate(50%);
}

.whatsnew-modal.tone-dark {
  background:
    radial-gradient(circle at 10% 12%, rgba(25, 127, 236, 0.16), transparent 35%),
    radial-gradient(circle at 88% 82%, rgba(255, 126, 21, 0.16), transparent 38%),
    linear-gradient(155deg, rgba(18, 24, 36, 0.72), rgba(10, 14, 22, 0.64));
  color: #f8fafc;
  border-color: rgba(255, 255, 255, 0.28);
  box-shadow:
    0 22px 60px rgba(0, 0, 0, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
}

.whatsnew-modal.tone-light {
  background:
    radial-gradient(circle at 10% 12%, rgba(14, 120, 255, 0.16), transparent 35%),
    radial-gradient(circle at 88% 82%, rgba(255, 152, 64, 0.16), transparent 38%),
    linear-gradient(155deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.64));
  color: #0f172a;
  border-color: rgba(15, 23, 42, 0.14);
  box-shadow:
    0 22px 60px rgba(15, 23, 42, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.38);
}

.whatsnew-hero {
  display: flex;
  justify-content: space-between;
  gap: 0.75rem;
  align-items: flex-start;
  margin-bottom: 0.9rem;
}

.whatsnew-eyebrow {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.09em;
  opacity: 0.72;
  margin-bottom: 0.2rem;
}

.title-icon {
  width: 2rem;
  height: 2rem;
  border-radius: 0.6rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.4rem;
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 16%, white 84%);
  border: 1px solid color-mix(in srgb, var(--color-primary) 36%, transparent);
}

.whatsnew-title {
  font-size: clamp(1.15rem, 2.1vw, 1.7rem);
  font-weight: 700;
  line-height: 1.2;
}

.whatsnew-subtitle {
  font-size: 0.92rem;
  opacity: 0.8;
  margin-top: 0.35rem;
}

.whatsnew-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.7rem;
  margin-bottom: 0.8rem;
}

.glass-tile,
.glass-panel {
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.85rem;
  backdrop-filter: blur(2px) saturate(50%);
  -webkit-backdrop-filter: blur(2px) saturate(50%);
}

.whatsnew-modal.tone-dark .glass-panel {
  border-color: rgba(255, 255, 255, 0.2);
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.05)),
    rgba(255, 255, 255, 0.04);
}

.whatsnew-modal.tone-light .glass-panel {
  border-color: rgba(15, 23, 42, 0.14);
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.44), rgba(255, 255, 255, 0.2)),
    rgba(255, 255, 255, 0.24);
}

.glass-tile {
  padding: 0.8rem;
  background: none !important;
}

.tile-icon {
  width: 1.7rem;
  height: 1.7rem;
  border-radius: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3rem;
  border: 1px solid transparent;
}

.tile-icon-primary {
  color: var(--color-primary);
  background: color-mix(in srgb, var(--color-primary) 16%, white 84%);
  border-color: color-mix(in srgb, var(--color-primary) 32%, transparent);
}

.tile-icon-warn {
  color: var(--color-warning);
  background: color-mix(in srgb, var(--color-warning) 16%, white 84%);
  border-color: color-mix(in srgb, var(--color-warning) 32%, transparent);
}

.tile-icon-info {
  color: var(--color-info);
  background: color-mix(in srgb, var(--color-info) 16%, white 84%);
  border-color: color-mix(in srgb, var(--color-info) 32%, transparent);
}

.tile-icon-accent {
  color: var(--color-accent-content);
  background: color-mix(in srgb, var(--color-accent) 26%, white 74%);
  border-color: color-mix(in srgb, var(--color-accent-content) 24%, transparent);
}

.tile-label {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  opacity: 0.85;
}

.tile-main {
  margin-top: 0.2rem;
  font-size: 1rem;
  font-weight: 700;
}

.tile-sub {
  margin-top: 0.2rem;
  font-size: 0.8rem;
  opacity: 0.88;
}

.tile-download {
  display: inline-flex;
  margin-top: 0.45rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
  color: inherit;
  opacity: 0.92;
}

.tile-download:hover {
  opacity: 1;
}

.tile-highlight {
  border-color: color-mix(in srgb, var(--color-primary) 44%, white 30%);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--color-primary) 26%, transparent);
}

.glass-panel {
  padding: 0.85rem;
}

.panel-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.45rem;
}

.panel-head h3 {
  font-size: 0.96rem;
  font-weight: 700;
}

.changelog-list {
  display: grid;
  gap: 0.3rem;
  padding-left: 1rem;
  font-size: 0.9rem;
}

.whatsnew-modal.tone-dark .btn-close,
.whatsnew-modal.tone-dark .btn-view-all,
.whatsnew-modal.tone-dark .btn-copy-starter,
.whatsnew-modal.tone-dark .btn-theme-docs {
  color: #ffffff !important;
}

.whatsnew-modal.tone-light .btn-close,
.whatsnew-modal.tone-light .btn-view-all,
.whatsnew-modal.tone-light .btn-copy-starter,
.whatsnew-modal.tone-light .btn-theme-docs {
  color: #0f172a !important;
}

.whatsnew-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin-top: 0.8rem;
}

@media (max-width: 900px) {
  .whatsnew-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .whatsnew-modal {
    width: 100%;
    max-height: 88vh;
    border-radius: 0.85rem;
    padding: 0.8rem;
  }

  .whatsnew-grid {
    grid-template-columns: 1fr;
  }
}
</style>
