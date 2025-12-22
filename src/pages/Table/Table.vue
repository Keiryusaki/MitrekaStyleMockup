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
        <SelectDropdown
          v-model="density"
          :options="[
            { value: 'compact', label: 'Compact' },
            { value: 'cozy', label: 'Cozy' },
            { value: 'comfortable', label: 'Comfortable' },
          ]"
          size="sm"
          variant="outline"
        />

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
            <SelectDropdown
              v-model="pageSize"
              :options="[
                { value: 10, label: '10' },
                { value: 25, label: '25' },
                { value: 50, label: '50' },
                { value: 100, label: '100' },
              ]"
              size="sm"
              variant="outline"
            />
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
    <!-- Developer Guide: ALS Table -->
    <section class="card p-6 mt-10">
      <h3 class="font-semibold">Developer Guide</h3>

      <!-- Download -->
      <details open>
        <summary class="font-medium">
          Install · ALS Table (HTML templates)
        </summary>
        <div
          class="mt-3 p-4 rounded bg-base-200 border border-base-300 space-y-2"
        >
          <div class="text-sm font-medium">Download</div>
          <ul class="list-disc ml-5 space-y-2">
            <li>
              <a
                class="btn btn-accent btn-xs"
                href="javascript:;"
                rel="noopener"
                @click="downloadFile('ag-like-skin.css')"
                >ag-like-skin.css</a
              >
            </li>
          </ul>
        </div>
      </details>

      <!-- Langkah-langkah -->
      <ol
        class="list-decimal ml-6 space-y-6 marker:font-medium marker:opacity-70"
      >
        <li>
          <h4 class="font-semibold mb-2">Struktur folder</h4>
          <pre v-pre class="code"><code>src/
├─ components/
│  └─ tables/
│     └─ AlsTable.vue        // opsional: wrapper komponen
└─ styles/
└─ als-table.css          // style untuk .als-viewport, .is-selected, dll
</code></pre>
        </li>

        <li>
          <h4 class="font-semibold mb-2">Struktur HTML dasar</h4>
          <pre
            v-pre
            class="code"
          ><code>&lt;!-- wrapper wajib untuk scroll/responsive --&gt;
&lt;div class="als-viewport"&gt;
&lt;table class="als-table"&gt;
&lt;thead&gt;
  &lt;tr&gt;
    &lt;th data-col="index"&gt;No&lt;/th&gt;
    &lt;th&gt;Code&lt;/th&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Description&lt;/th&gt;
  &lt;/tr&gt;
&lt;/thead&gt;

&lt;tbody&gt;
  &lt;tr&gt;
    &lt;td data-col="index"&gt;1&lt;/td&gt;
    &lt;td&gt;PRD-001&lt;/td&gt;
    &lt;td&gt;Product A&lt;/td&gt;
    &lt;td&gt;Short description…&lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;</code></pre>
          <p class="text-xs opacity-70 mt-2">
            Gunakan atribut <code>data-col</code> untuk kolom spesial:
            <code>checkbox</code>, <code>index</code>, <code>actions</code>.
          </p>
        </li>

        <li>
          <h4 class="font-semibold mb-2">Template: Selection + Actions</h4>
          <pre v-pre class="code"><code>&lt;div class="als-viewport"&gt;
&lt;table class="als-table"&gt;
&lt;thead&gt;
  &lt;tr&gt;
    &lt;th data-col="checkbox"&gt;
      &lt;!-- checkbox select-all halaman --&gt;
      &lt;input type="checkbox" aria-label="Select all on this page" /&gt;
    &lt;/th&gt;
    &lt;th data-col="index"&gt;No&lt;/th&gt;
    &lt;th&gt;Code&lt;/th&gt;
    &lt;th&gt;Name&lt;/th&gt;
    &lt;th&gt;Description&lt;/th&gt;
    &lt;th data-col="actions"&gt;Actions&lt;/th&gt;
  &lt;/tr&gt;
&lt;/thead&gt;

&lt;tbody&gt;
  &lt;tr class="is-selected"&gt;
    &lt;td data-col="checkbox"&gt;
      &lt;input type="checkbox" aria-label="Select row" checked /&gt;
    &lt;/td&gt;
    &lt;td data-col="index"&gt;1&lt;/td&gt;
    &lt;td&gt;PRD-001&lt;/td&gt;
    &lt;td&gt;Product A&lt;/td&gt;
    &lt;td&gt;Short description…&lt;/td&gt;
    &lt;td data-col="actions" class="flex items-center justify-end gap-2"&gt;
      &lt;button type="button" class="btn btn-warning h-[28px] w-[28px] btn-sm" title="Edit"&gt;
        &lt;i class="icon icon-edit" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="sr-only"&gt;Edit&lt;/span&gt;
      &lt;/button&gt;
      &lt;button type="button" class="btn btn-error h-[28px] w-[28px] btn-sm" title="Hapus"&gt;
        &lt;i class="icon icon-delete" aria-hidden="true"&gt;&lt;/i&gt;
        &lt;span class="sr-only"&gt;Hapus&lt;/span&gt;
      &lt;/button&gt;
    &lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;</code></pre>
        </li>

        <li>
          <h4 class="font-semibold mb-2">Template: Empty & Loading state</h4>
          <pre v-pre class="code"><code>&lt;!-- Empty --&gt;
&lt;div class="als-viewport"&gt;
&lt;table class="als-table"&gt;
&lt;thead&gt;…&lt;/thead&gt;
&lt;tbody&gt;
  &lt;tr class="is-empty"&gt;
    &lt;td colspan="5" class="text-center py-6"&gt;Tidak ada data&lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;

&lt;!-- Loading (gunakan skeleton/placeholder) --&gt;
&lt;div class="als-viewport"&gt;
&lt;table class="als-table is-loading"&gt;
&lt;thead&gt;…&lt;/thead&gt;
&lt;tbody&gt;
  &lt;tr&gt;
    &lt;td data-col="index"&gt;—&lt;/td&gt;
    &lt;td&gt;&lt;div class="skeleton h-4 w-24"&gt;&lt;/div&gt;&lt;/td&gt;
    &lt;td&gt;&lt;div class="skeleton h-4 w-32"&gt;&lt;/div&gt;&lt;/td&gt;
    &lt;td&gt;&lt;div class="skeleton h-4 w-64"&gt;&lt;/div&gt;&lt;/td&gt;
    &lt;td data-col="actions"&gt;&nbsp;&lt;/td&gt;
  &lt;/tr&gt;
&lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;</code></pre>
        </li>

        <li>
          <h4 class="font-semibold mb-2">Vue binding (contoh minimal)</h4>
          <pre v-pre class="code"><code>&lt;script setup lang="ts"&gt;
const pagedRows = ref([
{ id: 1, no: 1, code: 'PRD-001', name: 'Product A', description: '...' },
// ...
])
const selectedIds = ref(new Set&lt;number&gt;())

const isAllPageSelected = computed(() =&gt;
pagedRows.value.length &gt; 0 &amp;&amp; pagedRows.value.every(r =&gt; selectedIds.value.has(r.id))
)
const isSomePageSelected = computed(() =&gt;
pagedRows.value.some(r =&gt; selectedIds.value.has(r.id)) &amp;&amp; !isAllPageSelected.value
)

function toggleSelectAllPage(e: Event) {
const checked = (e.target as HTMLInputElement).checked
pagedRows.value.forEach(r =&gt; checked ? selectedIds.value.add(r.id) : selectedIds.value.delete(r.id))
}
function toggleRow(id: number, e?: Event) {
const checked = e ? (e.target as HTMLInputElement).checked : !selectedIds.value.has(id)
checked ? selectedIds.value.add(id) : selectedIds.value.delete(id)
}
function onEdit(row: any) { /* open modal */ }
function onDelete(row: any) { /* confirm + call API */ }
&lt;/script&gt;

&lt;template&gt;
&lt;div class="als-viewport"&gt;
&lt;table&gt;
  &lt;thead&gt;
    &lt;tr&gt;
      &lt;th data-col="checkbox"&gt;
        &lt;input
          type="checkbox"
          :checked="isAllPageSelected"
          :indeterminate.prop="isSomePageSelected &amp;&amp; !isAllPageSelected"
          @change="toggleSelectAllPage"
          aria-label="Select all on this page"
        /&gt;
      &lt;/th&gt;
      &lt;th data-col="index"&gt;No&lt;/th&gt;
      &lt;th&gt;Code&lt;/th&gt;
      &lt;th&gt;Name&lt;/th&gt;
      &lt;th&gt;Description&lt;/th&gt;
      &lt;th data-col="actions"&gt;Actions&lt;/th&gt;
    &lt;/tr&gt;
  &lt;/thead&gt;

  &lt;tbody&gt;
    &lt;tr
      v-for="row in pagedRows"
      :key="row.id"
      :class="{ 'is-selected': selectedIds.has(row.id) }"
    &gt;
      &lt;td data-col="checkbox"&gt;
        &lt;input
          type="checkbox"
          :checked="selectedIds.has(row.id)"
          @change="(e) =&gt; toggleRow(row.id, e)"
          aria-label="Select row"
        /&gt;
      &lt;/td&gt;
      &lt;td data-col="index"&gt;{{ row.no }}&lt;/td&gt;
      &lt;td&gt;{{ row.code }}&lt;/td&gt;
      &lt;td&gt;{{ row.name }}&lt;/td&gt;
      &lt;td&gt;{{ row.description }}&lt;/td&gt;
      &lt;td data-col="actions" class="flex items-center justify-end gap-2"&gt;
        &lt;button type="button" class="btn btn-warning h-[28px] w-[28px] btn-sm" title="Edit" @click="onEdit(row)"&gt;
          &lt;Icon name="edit" /&gt;
        &lt;/button&gt;
        &lt;button type="button" class="btn btn-error h-[28px] w-[28px] btn-sm" title="Hapus" @click="onDelete(row)"&gt;
          &lt;Icon name="delete" /&gt;
        &lt;/button&gt;
      &lt;/td&gt;
    &lt;/tr&gt;
  &lt;/tbody&gt;
&lt;/table&gt;
&lt;/div&gt;
&lt;/template&gt;</code></pre>
        </li>

        <li>
          <h4 class="font-semibold mb-2">Props/Events ringkas (cheatsheet)</h4>
          <ul class="list-disc ml-5 text-sm space-y-1">
            <li>
              <b>Input (data)</b>:
              <code
                >pagedRows: Array&lt;{ id, no, code, name, description
                }&gt;</code
              >, <code>selectedIds: Set&lt;ID&gt;</code>
            </li>
            <li>
              <b>State</b>: <code>isAllPageSelected</code>,
              <code>isSomePageSelected</code>
            </li>
            <li>
              <b>Events</b>: <code>@change</code> di header-checkbox → toggle
              semua di halaman; <code>@change</code> di row-checkbox → toggle
              per id; tombol <code>Edit</code>/<code>Hapus</code>
              memanggil handler parent
            </li>
            <li>
              <b>CSS hooks</b>: <code>.als-viewport</code>,
              <code>[data-col="checkbox|index|actions"]</code>,
              <code>.is-selected</code>, <code>.is-empty</code>,
              <code>.is-loading</code>
            </li>
          </ul>
        </li>

        <li>
          <h4 class="font-semibold mb-2">Do &amp; Don’t singkat</h4>
          <ul class="list-disc ml-5 text-sm space-y-1">
            <li>
              ✅ Selalu bungkus tabel dengan
              <code>.als-viewport</code> untuk scroll.
            </li>
            <li>
              ✅ Pakai <code>data-col</code> untuk kolom spesial
              (checkbox/index/actions).
            </li>
            <li>
              ✅ Gunakan <code>:indeterminate.prop</code> untuk state “sebagian
              terpilih”.
            </li>
            <li>
              ❌ Jangan pakai <code>colspan</code> yang salah saat empty
              (samakan dengan jumlah kolom).
            </li>
            <li>❌ Jangan ubah nama kelas hook tanpa update CSS bersama.</li>
          </ul>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watchEffect } from "vue";
import "@/pages/Table/ag-like-skin.css"; // isinya sudah versi 'als' yang tadi kita kirim
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

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
<style scoped>
.code {
  display: block;
  padding: 0.75rem 1rem;
  border-radius: var(--radius-box);
  background: var(--color-base-200);
  border: 1px solid var(--color-base-300);
  overflow-x: auto;
  font-size: 12.5px;
  line-height: 1.5;
}
</style>
