<template>
  <div class="grid gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-xl font-semibold">Audit Logs</h1>
      <div class="flex gap-2">
        <button class="btn btn-outline" @click="downloadCsv">Export CSV</button>
      </div>
    </div>

    <div class="card p-4 grid md:grid-cols-4 gap-3">
      <div>
        <label class="text-sm">From</label>
        <input type="date" class="input mt-1" v-model="from" />
      </div>
      <div>
        <label class="text-sm">To</label>
        <input type="date" class="input mt-1" v-model="to" />
      </div>
      <div>
        <label class="text-sm">Actor</label>
        <input class="input mt-1" v-model="actor" placeholder="email or name" />
      </div>
      <div class="flex items-end">
        <button class="btn btn-primary w-full" @click="filterNow">
          Filter
        </button>
      </div>
    </div>

    <DataTable :headers="headers" :rows="filtered" :page-size="10">
      <template #cell:action="{ row }"
        ><span class="badge badge-soft-primary">{{
          row.action
        }}</span></template
      >
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import DataTable from "@/components/data/DataTable.vue";

const headers = [
  { key: "time", label: "Time" },
  { key: "actor", label: "Actor" },
  { key: "ip", label: "IP" },
  { key: "action", label: "Action" },
];

const all = ref(
  Array.from({ length: 55 }).map((_, i) => ({
    id: i + 1,
    time: new Date(Date.now() - i * 3600_000).toLocaleString(),
    actor: i % 3 === 0 ? "admin@example.com" : "user@example.com",
    ip: `10.0.0.${i % 15}`,
    action: ["login", "update", "delete", "create"][i % 4],
  }))
);

const from = ref("");
const to = ref("");
const actor = ref("");
const filtered = computed(() =>
  all.value.filter((r) => {
    const okActor = actor.value
      ? String(r.actor).toLowerCase().includes(actor.value.toLowerCase())
      : true;
    const okFrom = from.value ? new Date(r.time) >= new Date(from.value) : true;
    const okTo = to.value
      ? new Date(r.time) <= new Date(to.value + " 23:59:59")
      : true;
    return okActor && okFrom && okTo;
  })
);

function filterNow() {
  /* computed already reacts; left for symmetry */
}
function downloadCsv() {
  const rows = [
    ["time", "actor", "ip", "action"],
    ...filtered.value.map((r) => [r.time, r.actor, r.ip, r.action]),
  ];
  const csv = rows
    .map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "audit-logs.csv";
  a.click();
  URL.revokeObjectURL(url);
}
</script>
