<template>
  <div class="card p-0 overflow-hidden">
    <div class="p-2 sm:p-3 flex flex-col sm:flex-row sm:items-center gap-2 border-b border-base-300">
      <input v-model="q" class="input input-sm sm:input-md w-full sm:w-80" placeholder="Search…" />
      <slot name="toolbar" />
    </div>
    <div class="overflow-x-auto">
      <table class="table-hover w-full text-sm min-w-[600px]">
        <thead class="bg-base-200">
          <tr>
            <th v-for="h in headers" :key="h.key" class="text-left p-2 sm:p-3 whitespace-nowrap">
              {{ h.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in paged" :key="row.id" class="border-t border-base-300">
            <td v-for="h in headers" :key="h.key" class="p-2 sm:p-3">
              <slot :name="`cell:${h.key}`" :row="row">{{ row[h.key] }}</slot>
            </td>
          </tr>
          <tr v-if="!paged.length">
            <td :colspan="headers.length" class="p-6 sm:p-8 text-center opacity-70">
              No data.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="p-2 sm:p-3 border-t border-base-300 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      <div class="opacity-70 text-xs sm:text-sm">
        Showing {{ start + 1 }}–{{ end }} of {{ filtered.length }}
      </div>
      <Pagination :page="page" :pages="pages" @change="(v:number)=>page=v" />
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import Pagination from "@/components/misc/Pagination.vue";

type Header = { key: string; label: string };
const props = defineProps<{
  headers: Header[];
  rows: any[];
  pageSize?: number;
}>();
const q = ref("");
const page = ref(1);
const pageSize = computed(() => props.pageSize ?? 10);

const filtered = computed(() => {
  if (!q.value) return props.rows;
  const qq = q.value.toLowerCase();
  return props.rows.filter((r) =>
    Object.values(r).some((v) => String(v).toLowerCase().includes(qq))
  );
});
const pages = computed(() =>
  Math.max(1, Math.ceil(filtered.value.length / pageSize.value))
);
const start = computed(() => (page.value - 1) * pageSize.value);
const end = computed(() =>
  Math.min(filtered.value.length, start.value + pageSize.value)
);
const paged = computed(() => filtered.value.slice(start.value, end.value));
</script>
