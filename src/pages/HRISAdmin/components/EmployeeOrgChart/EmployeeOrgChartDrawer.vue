<script setup lang="ts">
import { Avatar, Button, Icon } from "@/lib/mitreka-ui-dist/vue";

import type { EmployeeOrgChartRow } from "./types";

defineProps<{
  open: boolean;
  selectedRow: EmployeeOrgChartRow | null;
  selectedChain: EmployeeOrgChartRow[];
  selectedDirectReports: EmployeeOrgChartRow[];
}>();

const emit = defineEmits<{
  close: [];
  "open-detail": [];
  "add-subordinate": [];
  "change-manager": [];
  "select-node": [id: number];
}>();
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="translate-x-6 opacity-0"
    enter-to-class="translate-x-0 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-x-0 opacity-100"
    leave-to-class="translate-x-6 opacity-0"
  >
    <div v-if="open && selectedRow" class="org-chart-drawer-layer" @click="emit('close')">
      <aside class="org-chart-drawer" @click.stop>
        <div class="org-chart-drawer-head">
          <div>
            <div class="text-xs uppercase tracking-[0.18em] text-base-content/45">Selected employee</div>
            <div class="mt-1 text-sm font-semibold">Hierarchy detail</div>
          </div>
          <button type="button" class="btn btn-ghost btn-sm" @click="emit('close')">
            <Icon name="x" class="h-4 w-4" />
          </button>
        </div>

        <div class="org-chart-drawer-body space-y-4">
          <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
            <div class="flex items-start gap-3">
              <Avatar :alt="selectedRow.name" :fallback="selectedRow.name" size="md" color="primary" />
              <div class="min-w-0">
                <div class="truncate text-lg font-semibold">{{ selectedRow.name }}</div>
                <div class="mt-1 text-sm text-base-content/70">{{ selectedRow.employeeCode }} · {{ selectedRow.title }}</div>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="badge badge-soft badge-primary">{{ selectedRow.department }}</span>
                  <span class="badge badge-soft badge-info">{{ selectedRow.workType }}</span>
                  <span class="badge badge-soft badge-success">{{ selectedRow.status }}</span>
                </div>
              </div>
            </div>
            <div class="mt-4 grid gap-3 text-sm">
              <div class="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
                <span class="text-base-content/60">Manager</span>
                <span class="min-w-0">{{ selectedRow.manager }}</span>
              </div>
              <div class="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
                <span class="text-base-content/60">Location</span>
                <span class="min-w-0">{{ selectedRow.location }}</span>
              </div>
              <div class="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
                <span class="text-base-content/60">Email</span>
                <span class="min-w-0 break-all">{{ selectedRow.email }}</span>
              </div>
              <div class="grid grid-cols-[110px_minmax(0,1fr)] gap-3">
                <span class="text-base-content/60">Reports</span>
                <span class="min-w-0">{{ selectedDirectReports.length }}</span>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex flex-wrap gap-2">
                <Button color="primary" size="sm" @click="emit('open-detail')">
                  <Icon name="user" class="h-4 w-4" />
                  Open detail
                </Button>
                <Button variant="outline" color="default" size="sm" @click="emit('add-subordinate')">
                  <Icon name="plus" class="h-4 w-4" />
                  Add subordinate
                </Button>
                <Button variant="outline" color="default" size="sm" @click="emit('change-manager')">
                  <Icon name="pencil" class="h-4 w-4" />
                  Change manager
                </Button>
              </div>
            </div>
          </div>

          <div class="rounded-2xl border border-base-300 p-4">
            <div class="text-sm font-semibold">Approval chain</div>
            <div v-if="selectedChain.length" class="mt-3 space-y-2">
              <div
                v-for="(item, index) in selectedChain"
                :key="`${item.id}-${index}`"
                class="rounded-xl border border-base-200 bg-base-50 px-3 py-2 text-sm"
              >
                <div class="font-medium">{{ item.name }}</div>
                <div class="text-xs text-base-content/60">{{ item.title }}</div>
              </div>
            </div>
            <p v-else class="mt-3 text-sm text-base-content/65">Approval chain akan tampil setelah node dipilih.</p>
          </div>

          <div class="rounded-2xl border border-base-300 p-4">
            <div class="text-sm font-semibold">Direct reports</div>
            <div v-if="selectedDirectReports.length" class="mt-3 space-y-2">
              <button
                v-for="item in selectedDirectReports"
                :key="item.id"
                type="button"
                class="flex w-full items-center justify-between rounded-xl border border-base-200 bg-base-50 px-3 py-2 text-left text-sm transition hover:border-primary/30 hover:bg-primary/5"
                @click="emit('select-node', item.id)"
              >
                <span class="min-w-0">
                  <span class="block truncate font-medium">{{ item.name }}</span>
                  <span class="block truncate text-xs text-base-content/60">{{ item.title }}</span>
                </span>
                <Icon name="chevron-right" class="h-4 w-4 text-base-content/45" />
              </button>
            </div>
            <p v-else class="mt-3 text-sm text-base-content/65">Belum ada bawahan langsung untuk node yang dipilih.</p>
          </div>
        </div>
      </aside>
    </div>
  </Transition>
</template>
