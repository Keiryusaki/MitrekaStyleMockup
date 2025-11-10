<template>
  <div class="space-y-8">
    <div>
      <!-- Toolbar terpisah -->
      <div class="als-toolbar">
        <label class="als-inline">
          <input type="checkbox" v-model="striped" />
          Striped
        </label>

        <span>Density</span>
        <select v-model="density" class="als-select">
          <option value="compact">Compact</option>
          <option value="cozy">Cozy</option>
          <option value="comfortable">Comfortable</option>
        </select>

        <div class="als-toolbar__spacer"></div>

        <button class="als-btn" @click="selectNone">Clear Selection</button>
      </div>

      <!-- Card tabel (scope pakai data-als) -->
      <div
        class="als-card als-h-560"
        data-als
        :data-density="density"
        :data-striped="striped ? null : 'false'"
      >
        <div class="als-viewport">
          <table>
            <thead>
              <tr>
                <th data-col="checkbox">
                  <input
                    type="checkbox"
                    :checked="isAllPageSelected"
                    :indeterminate.prop="
                      isSomePageSelected && !isAllPageSelected
                    "
                    @change="toggleSelectAllPage"
                  />
                </th>
                <th data-col="index">No</th>
                <th>Code</th>
                <th>Name</th>
                <th>Description</th>
                <th data-col="actions">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in pagedRows"
                :key="row.id"
                :class="{ 'is-selected': selectedIds.has(row.id) }"
              >
                <td data-col="checkbox">
                  <input
                    type="checkbox"
                    :checked="selectedIds.has(row.id)"
                    @change="toggleRow(row.id)"
                  />
                </td>
                <td data-col="index">{{ row.no }}</td>
                <td>{{ row.code }}</td>
                <td>{{ row.name }}</td>
                <td>{{ row.description }}</td>
                <td
                  data-col="actions"
                  class="flex items-center justify-end gap-2"
                >
                  <!-- pakai button bawaan projectmu, tetap jalan -->
                  <button
                    type="button"
                    class="btn btn-warning h-[28px] w-[28px] btn-sm inline-flex items-center justify-center"
                    title="Edit"
                    @click="onEdit(row)"
                  >
                    <Icon name="edit" />
                  </button>
                  <button
                    type="button"
                    class="btn btn-error h-[28px] w-[28px] btn-sm inline-flex items-center justify-center"
                    title="Hapus"
                    @click="onDelete(row)"
                  >
                    <Icon name="delete" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Footer -->
        <div class="als-footer">
          <div class="als-footer__left">
            <span>Page Size:</span>
            <select v-model.number="pageSize" class="als-select">
              <option v-for="n in [10, 25, 50, 100]" :key="n" :value="n">
                {{ n }}
              </option>
            </select>
          </div>

          <div class="als-footer__center">
            <span
              >{{ pageStart + 1 }} to {{ Math.min(pageEnd, rows.length) }} of
              {{ rows.length }}</span
            >
          </div>

          <div class="als-footer__right als-pagination">
            <button class="als-btn" :disabled="page === 1" @click="page = 1">
              « First
            </button>
            <button class="als-btn" :disabled="page === 1" @click="page--">
              ‹ Prev
            </button>
            <button
              class="als-btn"
              :disabled="page === totalPages"
              @click="page++"
            >
              Next ›
            </button>
            <button
              class="als-btn"
              :disabled="page === totalPages"
              @click="page = totalPages"
            >
              Last »
            </button>
          </div>
        </div>
      </div>
    </div>

    <details class="card p-6 mt-10">
      <summary class="cursor-pointer text-sm font-medium">
        CSS nya disini
      </summary>
      <div class="mt-3 rounded-xl border border-base-300 p-4">
        <a
          class="btn btn-accent btn-xs"
          href="javascript:;"
          rel="noopener"
          @click="downloadFile('ag-like-skin.css')"
          >ag-like-skin.css</a
        >
      </div>
    </details>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import "@/pages/Table/ag-like-skin.css"; // isinya sudah versi 'als' yang tadi kita kirim

type Row = {
  id: number;
  no: number;
  code: string;
  name: string;
  description: string;
};

const baseNames = [
  ["A", "Alpha"],
  ["BB", "Bravo"],
  ["C", "Charlie"],
  ["DD", "Delta"],
  ["E", "Echo"],
  ["FF", "Foxtrot"],
  ["G", "Golf"],
  ["HH", "Hotel"],
  ["I", "India"],
  ["J", "Juliett"],
  ["K", "Kilo"],
  ["L", "Lima"],
  ["M", "Mike"],
  ["N", "November"],
  ["O", "Oscar"],
  ["P", "Papa"],
  ["Q", "Quebec"],
  ["R", "Romeo"],
  ["S", "Sierra"],
  ["T", "Tango"],
  ["U", "Uniform"],
  ["V", "Victor"],
  ["W", "Whiskey"],
  ["X", "X-ray"],
  ["Y", "Yankee"],
  ["Z", "Zulu"],
] as const;

const rows = reactive<Row[]>(
  Array.from({ length: 100 }, (_, i) => {
    const idx = i % baseNames.length;
    const [code, name] = baseNames[idx];
    return {
      id: i + 1,
      no: i + 1,
      code,
      name,
      description: `${name} description #${i + 1}`,
    };
  })
);

/* UI */
const striped = ref(true);
const density = ref<"compact" | "cozy" | "comfortable">("cozy");

/* Pagination */
const page = ref(1);
const pageSize = ref(10);
const totalPages = computed(() =>
  Math.max(1, Math.ceil(rows.length / pageSize.value))
);
const pageStart = computed(() => (page.value - 1) * pageSize.value);
const pageEnd = computed(() => pageStart.value + pageSize.value);
const pagedRows = computed(() => rows.slice(pageStart.value, pageEnd.value));
watchEffect(() => {
  if (page.value > totalPages.value) page.value = totalPages.value;
  if (page.value < 1) page.value = 1;
});

/* Selection */
const selectedIds = reactive<Set<number>>(new Set());
const toggleRow = (id: number) => {
  if (selectedIds.has(id)) selectedIds.delete(id);
  else selectedIds.add(id);
};
const currentPageIds = computed(() => pagedRows.value.map((r) => r.id));
const isAllPageSelected = computed(
  () =>
    currentPageIds.value.length > 0 &&
    currentPageIds.value.every((id) => selectedIds.has(id))
);
const isSomePageSelected = computed(() =>
  currentPageIds.value.some((id) => selectedIds.has(id))
);
const toggleSelectAllPage = () => {
  if (isAllPageSelected.value)
    currentPageIds.value.forEach((id) => selectedIds.delete(id));
  else currentPageIds.value.forEach((id) => selectedIds.add(id));
};
const selectNone = () => selectedIds.clear();

/* Actions */
const onEdit = (row: Row) => console.log("Edit", row);
const onDelete = (row: Row) => console.log("Delete", row);

const downloadFile = async (filename: string) => {
  try {
    let fileUrl = "";
    // Cek file mana yang mau di-download
    if (filename === "ag-like-skin.css") {
      fileUrl = (await import("@/pages/Table/ag-like-skin.css?raw")).default;
    } else {
      console.error("File not found");
      return;
    }

    // Buat blob lalu trigger download
    const blob = new Blob([fileUrl], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
    URL.revokeObjectURL(link.href);
  } catch (e) {
    console.error("Gagal download file:", e);
  }
};
</script>
