<script setup lang="ts">
import { onMounted } from "vue";
import data from "./changelog.json";

type ChangeType =
  | "Added"
  | "Changed"
  | "Fixed"
  | "Removed"
  | "Security"
  | "Docs"
  | "Breaking";
type Item = { type: ChangeType; text: string; href?: string };
type Asset = { name: string; href: string };
type Release = {
  version: string;
  date: string;
  label?: string;
  items: Item[];
  assets?: Asset[];
};

const releases = (data as Release[]).sort((a, b) =>
  b.version.localeCompare(a.version, "en", { numeric: true })
);

const typeColor: Record<ChangeType, string> = {
  Breaking: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  Added:
    "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  Changed:
    "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  Fixed: "bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300",
  Removed: "bg-zinc-200 text-zinc-800 dark:bg-zinc-500/15 dark:text-zinc-300",
  Security:
    "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
  Docs: "bg-teal-100 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300",
};

onMounted(() => {
  // buka rilis dari hash (mis. #v-1-1-0)
  const hash = location.hash.replace("#", "");
  if (hash.startsWith("v-")) {
    const el = document.getElementById(hash);
    el?.setAttribute("open", "");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

const withBase = (p: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${p.replace(/^\//, "")}`;
</script>

<template>
  <div class="space-y-6">
    <header>
      <h1 class="text-xl font-semibold">Changelog</h1>
      <p class="text-sm opacity-70">Riwayat perubahan + file CSS per versi</p>
    </header>

    <section class="space-y-3">
      <details
        v-for="r in releases"
        :key="r.version"
        :id="`v-${r.version.replaceAll('.', '-')}`"
        class="rounded-xl border border-base-300 bg-base-100"
      >
        <summary class="cursor-pointer px-4 py-3 flex items-center gap-2">
          <span class="font-semibold">v{{ r.version }}</span>
          <span
            class="text-xs px-1.5 py-0.5 rounded border border-base-300 text-base-content/70"
          >
            {{ r.label || "Stable" }}
          </span>
          <time class="text-xs opacity-70"
            >· {{ new Date(r.date).toLocaleDateString() }}</time
          >
          <span class="ms-auto text-xs opacity-70"
            >{{ r.items.length }} changes</span
          >
        </summary>

        <div class="px-5 pb-4">
          <!-- daftar perubahan -->
          <ul class="space-y-2">
            <li
              v-for="(it, i) in r.items"
              :key="i"
              class="flex items-start gap-3"
            >
              <span
                :class="[
                  'shrink-0 rounded px-1.5 py-0.5 text-[11px] font-medium',
                  typeColor[it.type],
                ]"
              >
                {{ it.type }}
              </span>
              <p class="text-sm leading-6">
                <template v-if="it.href">
                  <RouterLink :to="it.href" class="underline decoration-dotted">
                    {{ it.text }}
                  </RouterLink>
                </template>
                <template v-else>
                  {{ it.text }}
                </template>
              </p>
            </li>
          </ul>

          <!-- file unduhan per versi -->
          <div
            v-if="r.assets?.length"
            class="mt-3 flex flex-wrap gap-2 text-sm"
          >
            <a
              v-for="a in r.assets"
              :key="a.href"
              :href="withBase(a.href)"
              download
              class="btn btn-xs btn-accent"
            >
              Download {{ a.name }}
            </a>
          </div>
        </div>
      </details>
    </section>
  </div>
</template>

<style scoped>
/* opsional kecil */
</style>
