<script setup lang="ts">
import { Button, Modal, SelectInput } from "@/lib/mitreka-ui-dist/vue";

import type { EmployeeOrgChartRow } from "./types";

type SelectOption = {
  value: string;
  label: string;
};

defineProps<{
  addTopLevelModalOpen: boolean;
  selectedTopLevelEmployeeId: string;
  addTopLevelReason: string;
  addTopLevelOptions: SelectOption[];
  addTopLevelDisabled: boolean;
  addSubordinateModalOpen: boolean;
  selectedSubordinateEmployeeId: string;
  addSubordinateReason: string;
  subordinateOptions: SelectOption[];
  addSubordinateDisabled: boolean;
  changeManagerModalOpen: boolean;
  selectedManagerNodeId: string;
  changeManagerReason: string;
  managerOptions: SelectOption[];
  changeManagerDisabled: boolean;
  selectedRow: EmployeeOrgChartRow | null;
}>();

const emit = defineEmits<{
  "update:selectedTopLevelEmployeeId": [value: string];
  "update:addTopLevelReason": [value: string];
  "update:selectedSubordinateEmployeeId": [value: string];
  "update:addSubordinateReason": [value: string];
  "update:selectedManagerNodeId": [value: string];
  "update:changeManagerReason": [value: string];
  "close:add-top-level": [];
  "save:add-top-level": [];
  "close:add-subordinate": [];
  "save:add-subordinate": [];
  "close:change-manager": [];
  "save:change-manager": [];
}>();
</script>

<template>
  <Modal :open="addTopLevelModalOpen" title="Add Top-Level Node" size="md" hide-footer @close="emit('close:add-top-level')">
    <div class="space-y-4">
      <div>
        <div class="text-sm font-medium">Select employee</div>
        <p class="mt-1 text-sm text-base-content/65">
          Pilih employee yang sudah terdaftar di directory untuk dijadikan root baru pada org chart.
        </p>
        <p class="mt-1 text-xs text-base-content/55">
          Ketik nama employee untuk menambahkan root baru tanpa perlu scroll daftar panjang.
        </p>
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium">Employee*</label>
        <SelectInput
          :model-value="selectedTopLevelEmployeeId"
          :options="addTopLevelOptions"
          size="sm"
          color="default"
          placeholder="Cari employee..."
          clearable
          @update:model-value="emit('update:selectedTopLevelEmployeeId', $event ?? '')"
        />
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium">Reason</label>
        <textarea
          :value="addTopLevelReason"
          class="input min-h-28 w-full py-2"
          placeholder="Contoh: pembentukan cluster approval baru yang berdiri sendiri."
          @input="emit('update:addTopLevelReason', ($event.target as HTMLTextAreaElement).value)"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="ghost" color="default" @click="emit('close:add-top-level')">Cancel</Button>
        <Button color="primary" :disabled="addTopLevelDisabled" @click="emit('save:add-top-level')">Add node</Button>
      </div>
    </div>
  </Modal>

  <Modal :open="addSubordinateModalOpen" title="Add Subordinate" size="md" hide-footer @close="emit('close:add-subordinate')">
    <div class="space-y-4">
      <div>
        <div class="text-sm font-medium">Parent node</div>
        <p class="mt-1 text-sm text-base-content/65">
          {{ selectedRow ? `${selectedRow.name} · ${selectedRow.title}` : "-" }}
        </p>
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium">Employee*</label>
        <SelectInput
          :model-value="selectedSubordinateEmployeeId"
          :options="subordinateOptions"
          size="sm"
          color="default"
          placeholder="Cari employee..."
          clearable
          @update:model-value="emit('update:selectedSubordinateEmployeeId', $event ?? '')"
        />
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium">Reason</label>
        <textarea
          :value="addSubordinateReason"
          class="input min-h-28 w-full py-2"
          placeholder="Contoh: penempatan bawahan baru di bawah approval lead ini."
          @input="emit('update:addSubordinateReason', ($event.target as HTMLTextAreaElement).value)"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="ghost" color="default" @click="emit('close:add-subordinate')">Cancel</Button>
        <Button color="primary" :disabled="addSubordinateDisabled" @click="emit('save:add-subordinate')">Add subordinate</Button>
      </div>
    </div>
  </Modal>

  <Modal :open="changeManagerModalOpen" title="Change Manager" size="md" hide-footer @close="emit('close:change-manager')">
    <div class="space-y-4">
      <div>
        <div class="text-sm font-medium">Employee node</div>
        <p class="mt-1 text-sm text-base-content/65">
          {{ selectedRow ? `${selectedRow.name} · ${selectedRow.title}` : "-" }}
        </p>
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium">New manager*</label>
        <SelectInput
          :model-value="selectedManagerNodeId"
          :options="managerOptions"
          size="sm"
          color="default"
          placeholder="Cari manager..."
          clearable
          @update:model-value="emit('update:selectedManagerNodeId', $event ?? '')"
        />
      </div>

      <div class="space-y-1">
        <label class="text-sm font-medium">Reason</label>
        <textarea
          :value="changeManagerReason"
          class="input min-h-28 w-full py-2"
          placeholder="Contoh: realignment struktur approval atau perpindahan reporting line."
          @input="emit('update:changeManagerReason', ($event.target as HTMLTextAreaElement).value)"
        />
      </div>

      <div class="flex justify-end gap-2">
        <Button variant="ghost" color="default" @click="emit('close:change-manager')">Cancel</Button>
        <Button color="primary" :disabled="changeManagerDisabled" @click="emit('save:change-manager')">Save manager</Button>
      </div>
    </div>
  </Modal>
</template>
