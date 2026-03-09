<script setup lang="ts">
import { ref } from "vue";
import PageHeader from "@/components/PageHeader.vue";
import Modal from "@/components/feedback/Modal.vue";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";
import SelectInput from "@/components/controls/SelectInput.vue";
import MultiSelect from "@/components/controls/MultiSelect.vue";

const showModalCompact = ref(false);
const showModalLong = ref(false);

const selectValueBottom = ref<string | number | null>(null);
const compactInlineMultiValues = ref<Array<string | number>>([]);
const searchSelectValue = ref<string | number | null>(null);
const multiValues = ref<Array<string | number>>([]);

const manyOptions = Array.from({ length: 30 }, (_, i) => ({
  value: `opt-${i + 1}`,
  label: `Option ${i + 1} - Region ${["West", "East", "North", "South"][i % 4]}`,
}));

const peopleOptions = Array.from({ length: 24 }, (_, i) => ({
  value: `person-${i + 1}`,
  label: `Person ${i + 1} - Squad ${String.fromCharCode(65 + (i % 6))}`,
}));

const fetchPeople = async (q: string) => {
  await new Promise((resolve) => setTimeout(resolve, 180));
  const keyword = q.toLowerCase();
  return peopleOptions.filter((item) => item.label.toLowerCase().includes(keyword));
};
</script>

<template>
  <div class="space-y-6">
    <PageHeader
      category="Mockup Pages"
      title="Select Playground"
      description="Riset perilaku select di modal, termasuk auto flip/shift saat mentok viewport."
    />

    <section class="card p-4 md:p-6 space-y-4">
      <h2 class="text-base font-semibold">Test Scenarios</h2>
      <p class="text-sm opacity-80">
        Fokus riset: dropdown harus tetap terlihat walau field berada di bagian bawah modal atau viewport sempit.
      </p>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-primary" @click="showModalCompact = true">Open Compact Modal</button>
        <button class="btn btn-outline" @click="showModalLong = true">Open Long Form Modal</button>
      </div>
    </section>

    <Modal
      :open="showModalCompact"
      title="Compact Modal - Bottom Field"
      size="md"
      hide-footer
      @close="showModalCompact = false"
    >
      <div class="space-y-3">
        <p class="text-sm opacity-80">
          Konten modal ini pendek (2-3 baris). Multi select inline di paling bawah harus tetap bisa membuka dropdown ke atas jika perlu.
        </p>
        <div class="space-y-1">
          <label class="text-sm font-medium">Multi Select Inline Near Bottom</label>
          <MultiSelect
            v-model="compactInlineMultiValues"
            :options="manyOptions"
            placeholder="Choose options..."
            size="sm"
            display-mode="inline-compact"
          />
        </div>
      </div>
    </Modal>

    <Modal
      :open="showModalLong"
      title="Long Form Modal - Mixed Selects"
      size="lg"
      hide-footer
      @close="showModalLong = false"
    >
      <div class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div class="space-y-1">
            <label class="text-sm font-medium">Country / Region</label>
            <SelectDropdown
              v-model="selectValueBottom"
              :options="manyOptions"
              placeholder="Pick country/region..."
              size="sm"
              color="secondary"
              variant="outline"
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Assessor (Search)</label>
            <SelectInput
              v-model="searchSelectValue"
              :fetch-options="fetchPeople"
              :debounce-ms="250"
              placeholder="Search assessor..."
              size="sm"
            />
          </div>
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Supporting Team (Multi)</label>
          <MultiSelect
            v-model="multiValues"
            :options="peopleOptions"
            placeholder="Choose multiple members..."
            size="sm"
            display-mode="stacked"
          />
        </div>

        <div class="h-[36vh] rounded-box border border-dashed border-base-300 p-3 text-sm opacity-70">
          Spacer area untuk memaksa field terakhir berada dekat bawah viewport modal.
        </div>

        <div class="space-y-1">
          <label class="text-sm font-medium">Bottom Critical Select</label>
          <SelectDropdown
            v-model="searchSelectValue"
            :options="peopleOptions"
            placeholder="Open me near the bottom..."
            size="sm"
            color="default"
            variant="outline"
          />
        </div>
      </div>
    </Modal>
  </div>
</template>
