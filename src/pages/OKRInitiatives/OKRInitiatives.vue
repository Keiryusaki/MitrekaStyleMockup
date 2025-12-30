<script setup lang="ts">
import { ref } from "vue";
import Modal from "@/components/feedback/Modal.vue";
import SelectDropdown from "@/components/controls/SelectDropdown.vue";

const filterValue = ref<string | number | null>("all");
const filterOptions = [
  { value: "all", label: "All" },
  { value: "objective", label: "Objective" },
  { value: "initiatives", label: "Initiatives" },
];

const statusValue = ref<string | number | null>(null);
const statusOptions = [
  { value: "running", label: "Running" },
  { value: "pending", label: "Pending" },
  { value: "completed", label: "Completed" },
];

const priorityValue = ref<string | number | null>(null);
const priorityOptions = [
  { value: "high", label: "High" },
  { value: "normal", label: "Normal" },
  { value: "low", label: "Low" },
];

const showModal = ref(false);

const downloadFile = async (filename: string) => {
  try {
    let fileUrl = "";
    // Cek file mana yang mau di-download
    if (filename === "OKRInitiatives.vue") {
      fileUrl = (await import("@/pages/OKRInitiatives/OKRInitiatives.vue?raw"))
        .default;
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

<template>
  <div class="space-y-8">
    <!-- Header -->
    <header>
      <h1 class="text-xl font-semibold">OKR · Objectives & Initiatives</h1>
      <p class="text-sm opacity-80">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
      </p>
    </header>

    <div class="card p-4 md:p-6 space-y-5">
      <div class="rounded-xl border p-3 sm:p-4 bg-amber-50/70 border-amber-200">
        <div class="space-y-3 sm:space-y-2 text-sm">
          <div class="flex flex-col sm:flex-row sm:gap-6">
            <div class="text-xs sm:text-sm sm:w-40 shrink-0 text-gray-600 font-medium sm:font-normal">Big Goals</div>
            <div class="font-medium break-words font-semibold">
              Mitreka Big Goals 2025-2028
            </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:gap-6">
            <div class="text-xs sm:text-sm sm:w-40 shrink-0 text-gray-600 font-medium sm:font-normal">Program Kerja</div>
            <div class="font-medium break-words font-semibold">
              OKR-2025-2ND
              <span class="text-gray-500 font-normal">
                (Juni 2025 – Desember 2025)
              </span>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row sm:gap-6">
            <div class="text-xs sm:text-sm sm:w-40 shrink-0 text-gray-600 font-medium sm:font-normal">Strategi Goals</div>
            <div class="font-medium break-words font-semibold">
              <div class="font-semibold">Healthy and Strong Finance</div>
              <div class="mt-1 text-gray-700 font-normal">
                Keuangan Perusahaan yang sehat dan kuat dalam mendukung
                operational Perusahaan dan benefit jangka panjang.
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Filter & Search Block -->
      <div class="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <!-- Search -->
        <div class="relative flex-1 min-w-0">
          <svg
            class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-70"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"
            />
          </svg>
          <input class="input input-md pl-9 w-full" placeholder="Search…" />
        </div>

        <!-- Filter -->
        <div class="shrink-0 md:w-48">
          <SelectDropdown
            v-model="filterValue"
            :options="filterOptions"
            size="sm"
            variant="outline"
          />
        </div>
      </div>

      <div class="relative rounded-xl">
        <div class="p-3 sm:p-4">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
            <div class="flex flex-wrap items-start gap-2 sm:gap-3">
              <span class="w-4 font-bold shrink-0">1</span>
              <span class="font-bold">Peningkatan Laba yang Konsisten</span>
              <span
                class="px-2 py-1 text-xs font-semibold rounded-xl bg-red-100 text-red-800"
                >SLS - Sales (Penjualan dan Digital Marketing)</span
              >
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                class="inline-flex items-center justify-center px-2 py-1 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                <span class="text-gray-600">0 Sub Objek</span>
              </button>
              <button
                class="relative group btn btn-success btn-xs"
                aria-label="Tambah Initiatives/ Activities"
                @click="showModal = true"
              >
                <Icon name="plus" />
                <span
                  class="hidden sm:block pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  role="tooltip"
                >
                  Tambah Initiatives/ Activities
                </span>
              </button>
            </div>
          </div>
          <div class="mt-4 pl-5">
            <div class="overflow-x-auto rounded-lg border border-gray-300">
              <table class="min-w-full text-sm">
                <thead class="bg-slate-100 text-left">
                  <tr class="text-slate-600">
                    <th class="px-4 py-3 w-12">No.</th>
                    <th class="px-4 py-3">Initiatives / Activities</th>
                    <th class="px-4 py-3">Target</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Priority</th>
                    <th class="px-4 py-3">Dependencies</th>
                    <th class="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-200/10">
                  <!-- Row 1 -->
                  <tr class="even:bg-blue-50/40">
                    <td class="px-4 py-4 align-top">1</td>
                    <td class="px-4 py-4 align-top">Contoh program 1</td>
                    <td class="px-4 py-4 align-top">Besok</td>
                    <td class="px-4 py-4 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                      >
                        Running
                      </span>
                    </td>
                    <td class="px-4 py-4 align-top">Normal</td>
                    <td class="px-4 py-4 align-top">
                      <div class="w-full">We depend on:</div>
                      <div class="font-bold">Product</div>
                      <div class="w-full">What we need:</div>
                      <div class="font-bold">Program</div>
                    </td>
                    <td class="px-4 py-4 align-top">
                      <div class="flex justify-end gap-2">
                        <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" title="Edit">
                          <Icon name="pencil" class="w-4 h-4" />
                        </button>
                        <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" title="Hapus">
                          <Icon name="trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="even:bg-blue-50/40">
                    <td class="px-4 py-4 align-top">2</td>
                    <td class="px-4 py-4 align-top">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </td>
                    <td class="px-4 py-4 align-top">Besok</td>
                    <td class="px-4 py-4 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                      >
                        Running
                      </span>
                    </td>
                    <td class="px-4 py-4 align-top">Normal</td>
                    <td class="px-4 py-4 align-top">
                      <div class="w-full">We depend on:</div>
                      <div class="font-bold">Product</div>
                      <div class="w-full">What we need:</div>
                      <div class="font-bold">Program</div>
                    </td>
                    <td class="px-4 py-4 align-top">
                      <div class="flex justify-end gap-2">
                        <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" title="Edit">
                          <Icon name="pencil" class="w-4 h-4" />
                        </button>
                        <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" title="Hapus">
                          <Icon name="trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="p-3 sm:p-4">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
            <div class="flex flex-wrap items-start gap-2 sm:gap-3">
              <span class="w-4 font-bold shrink-0">2</span>
              <span class="font-bold"
                >Lorem ipsum dolor sit amet consectetur adipisicing elit.</span
              >
              <span
                class="px-2 py-1 text-xs font-semibold rounded-xl bg-orange-100 text-orange-800"
                >Finance</span
              >
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                class="inline-flex items-center justify-center px-2 py-1 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                <span class="text-gray-600">0 Sub Objek</span>
              </button>
              <button
                class="relative group btn btn-success btn-xs"
                aria-label="Tambah Initiatives/ Activities"
                @click="showModal = true"
              >
                <Icon name="plus" />
                <span
                  class="hidden sm:block pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  role="tooltip"
                >
                  Tambah Initiatives/ Activities
                </span>
              </button>
            </div>
          </div>
          <div class="mt-4 pl-5">
            <div class="overflow-x-auto rounded-lg border border-gray-300">
              <table class="min-w-full text-sm">
                <thead class="bg-slate-100 text-left">
                  <tr class="text-slate-600">
                    <th class="px-4 py-3 w-12">No.</th>
                    <th class="px-4 py-3">Initiatives / Activities</th>
                    <th class="px-4 py-3">Target</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Priority</th>
                    <th class="px-4 py-3">Dependencies</th>
                    <th class="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-200/10">
                  <!-- Row 1 -->
                  <tr class="even:bg-blue-50/40">
                    <td colspan="7" class="px-4 py-4 align-top">
                      <button class="btn btn-success btn-xs">
                        <Icon name="plus" /> Initiatives
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="p-3 sm:p-4">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
            <div class="flex flex-wrap items-start gap-2 sm:gap-3">
              <span class="w-4 font-bold shrink-0">3</span>
              <span class="font-bold"
                >SDM berketuhanan, berdedikasi ke perusahaan, berkemampuan,
                kreatif, inovatif, jujur, komunikatif, berkepribadian
                mulia</span
              >
              <span
                class="px-2 py-1 text-xs font-semibold rounded-xl bg-green-100 text-green-800"
                >Humas</span
              >
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                class="inline-flex items-center justify-center px-2 py-1 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                <span class="text-gray-600">0 Sub Objek</span>
              </button>
              <button
                class="relative group btn btn-success btn-xs"
                aria-label="Tambah Initiatives/ Activities"
                @click="showModal = true"
              >
                <Icon name="plus" />
                <span
                  class="hidden sm:block pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  role="tooltip"
                >
                  Tambah Initiatives/ Activities
                </span>
              </button>
            </div>
          </div>
          <div class="mt-4 pl-5">
            <div class="overflow-x-auto rounded-lg border border-gray-300">
              <table class="min-w-full text-sm">
                <thead class="bg-slate-100 text-left">
                  <tr class="text-slate-600">
                    <th class="px-4 py-3 w-12">No.</th>
                    <th class="px-4 py-3">Initiatives / Activities</th>
                    <th class="px-4 py-3">Target</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Priority</th>
                    <th class="px-4 py-3">Dependencies</th>
                    <th class="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-200/10">
                  <!-- Row 1 -->
                  <tr class="even:bg-blue-50/40">
                    <td class="px-4 py-4 align-top">1</td>
                    <td class="px-4 py-4 align-top">Contoh program 1</td>
                    <td class="px-4 py-4 align-top">Besok</td>
                    <td class="px-4 py-4 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                      >
                        Running
                      </span>
                    </td>
                    <td class="px-4 py-4 align-top">Normal</td>
                    <td class="px-4 py-4 align-top">
                      <div class="w-full">We depend on:</div>
                      <div class="font-bold">Product</div>
                      <div class="w-full">What we need:</div>
                      <div class="font-bold">Program</div>
                    </td>
                    <td class="px-4 py-4 align-top">
                      <div class="flex justify-end gap-2">
                        <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" title="Edit">
                          <Icon name="pencil" class="w-4 h-4" />
                        </button>
                        <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" title="Hapus">
                          <Icon name="trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="even:bg-blue-50/40">
                    <td class="px-4 py-4 align-top">2</td>
                    <td class="px-4 py-4 align-top">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </td>
                    <td class="px-4 py-4 align-top">Besok</td>
                    <td class="px-4 py-4 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                      >
                        Running
                      </span>
                    </td>
                    <td class="px-4 py-4 align-top">Normal</td>
                    <td class="px-4 py-4 align-top">
                      <div class="w-full">We depend on:</div>
                      <div class="font-bold">Product</div>
                      <div class="w-full">What we need:</div>
                      <div class="font-bold">Program</div>
                    </td>
                    <td class="px-4 py-4 align-top">
                      <div class="flex justify-end gap-2">
                        <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" title="Edit">
                          <Icon name="pencil" class="w-4 h-4" />
                        </button>
                        <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" title="Hapus">
                          <Icon name="trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div class="p-3 sm:p-4">
          <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4">
            <div class="flex flex-wrap items-start gap-2 sm:gap-3">
              <span class="w-4 font-bold shrink-0">4</span>
              <span class="font-bold"
                >High performance dan effective dalam tim, Dinamis dan terus
                tumbuh lebih baik, Memahami dan dapat bekerja dalam system
                otomasi perkantoran</span
              >
              <span
                class="px-2 py-1 text-xs font-semibold rounded-xl bg-yellow-100 text-yellow-800"
                >Product</span
              >
            </div>
            <div class="flex gap-2 shrink-0">
              <button
                class="inline-flex items-center justify-center px-2 py-1 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-150"
              >
                <span class="text-gray-600">0 Sub Objek</span>
              </button>
              <button
                class="relative group btn btn-success btn-xs"
                aria-label="Tambah Initiatives/ Activities"
                @click="showModal = true"
              >
                <Icon name="plus" />
                <span
                  class="hidden sm:block pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-gray-800 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                  role="tooltip"
                >
                  Tambah Initiatives/ Activities
                </span>
              </button>
            </div>
          </div>
          <div class="mt-4 pl-5">
            <div class="overflow-x-auto rounded-lg border border-gray-300">
              <table class="min-w-full text-sm">
                <thead class="bg-slate-100 text-left">
                  <tr class="text-slate-600">
                    <th class="px-4 py-3 w-12">No.</th>
                    <th class="px-4 py-3">Initiatives / Activities</th>
                    <th class="px-4 py-3">Target</th>
                    <th class="px-4 py-3">Status</th>
                    <th class="px-4 py-3">Priority</th>
                    <th class="px-4 py-3">Dependencies</th>
                    <th class="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-200/10">
                  <!-- Row 1 -->
                  <tr class="even:bg-blue-50/40">
                    <td class="px-4 py-4 align-top">1</td>
                    <td class="px-4 py-4 align-top">Contoh program 1</td>
                    <td class="px-4 py-4 align-top">Besok</td>
                    <td class="px-4 py-4 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                      >
                        Running
                      </span>
                    </td>
                    <td class="px-4 py-4 align-top">Normal</td>
                    <td class="px-4 py-4 align-top">
                      <div class="w-full">We depend on:</div>
                      <div class="font-bold">Product</div>
                      <div class="w-full">What we need:</div>
                      <div class="font-bold">Program</div>
                    </td>
                    <td class="px-4 py-4 align-top">
                      <div class="flex justify-end gap-2">
                        <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" title="Edit">
                          <Icon name="pencil" class="w-4 h-4" />
                        </button>
                        <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" title="Hapus">
                          <Icon name="trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr class="even:bg-blue-50/40">
                    <td class="px-4 py-4 align-top">2</td>
                    <td class="px-4 py-4 align-top">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </td>
                    <td class="px-4 py-4 align-top">Besok</td>
                    <td class="px-4 py-4 align-top">
                      <span
                        class="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium bg-green-100 text-green-800"
                      >
                        Running
                      </span>
                    </td>
                    <td class="px-4 py-4 align-top">Normal</td>
                    <td class="px-4 py-4 align-top">
                      <div class="w-full">We depend on:</div>
                      <div class="font-bold">Product</div>
                      <div class="w-full">What we need:</div>
                      <div class="font-bold">Program</div>
                    </td>
                    <td class="px-4 py-4 align-top">
                      <div class="flex justify-end gap-2">
                        <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" title="Edit">
                          <Icon name="pencil" class="w-4 h-4" />
                        </button>
                        <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" title="Hapus">
                          <Icon name="trash" class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <details class="card p-6 mt-10">
      <summary class="cursor-pointer text-sm font-medium">
        HTML nya disini
      </summary>
      <div class="mt-3 rounded-xl border border-base-300 p-4">
        <a
          class="btn btn-accent btn-xs"
          href="javascript:;"
          rel="noopener"
          @click="downloadFile('OKRInitiatives.vue')"
          >OKRInitiatives.vue</a
        >
      </div>
    </details>

    <!-- Modal Tambah Initiatives/ Activities -->
    <Modal
      :open="showModal"
      title="Tambah Initiatives/ Activities"
      size="lg"
      @close="showModal = false"
      @confirm="showModal = false"
    >
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Nama Initiatives/ Activities
          </label>
          <input
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Masukkan nama..."
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Target
          </label>
          <input
            type="text"
            class="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
            placeholder="Masukkan target..."
          />
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <SelectDropdown
              v-model="statusValue"
              :options="statusOptions"
              placeholder="Pilih Status"
              variant="outline"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <SelectDropdown
              v-model="priorityValue"
              :options="priorityOptions"
              placeholder="Pilih Priority"
              variant="outline"
            />
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>
