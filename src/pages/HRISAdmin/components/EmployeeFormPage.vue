<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { AgGridSurface, Avatar, Button, Card, DateTimePicker, Icon, Input, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { iconRegistry } from "@/composables/Icon";
import { calcAgRowHeight, resolveAgFontPx } from "@/composables/useAgGridRowHeight";

type StepMeta = {
  number: number;
  icon: string;
  title: string;
  description: string;
};

const props = defineProps<{
  isCreatePage: boolean;
  formPageTitle: string;
  formPageDescription: string;
  pageStep: number;
  createSteps: StepMeta[];
  pageStepMeta: StepMeta;
  pageStepValid: boolean;
  pageBackDisabled: boolean;
  pagePrimaryLabel: string;
  pageForm: Record<string, any>;
  editForm: Record<string, any>;
  genderOptions: Array<{ value: string; label: string }>;
  maritalStatusOptions: Array<{ value: string; label: string }>;
  bloodTypeOptions: Array<{ value: string; label: string }>;
  religionOptions: Array<{ value: string; label: string }>;
  jobPositionOptions: Array<{ value: string; label: string }>;
  organizationStructureOptions: Array<{ value: string; label: string }>;
  branchOptions: Array<{ value: string; label: string }>;
  jobLevelOptions: Array<{ value: string; label: string }>;
  employmentTypeOptions: Array<{ value: string; label: string }>;
  workTypeOptions: Array<{ value: string; label: string }>;
  statusOptions: Array<{ value: string; label: string }>;
  payrollScheduleOptions: Array<{ value: string; label: string }>;
  kelengkapanKeyOptions: Array<{ value: string; label: string }>;
  inviteMethodOptions: Array<{ value: string; label: string }>;
}>();

const emit = defineEmits<{
  (e: "go-list"): void;
  (e: "step-change", value: number): void;
  (e: "prev-step"): void;
  (e: "next-step"): void;
}>();

const ensureEmergencyContacts = () => {
  if (!Array.isArray(props.pageForm.emergencyContacts)) {
    props.pageForm.emergencyContacts = [];
  }
  return props.pageForm.emergencyContacts as Array<{
    name: string;
    relationship: string;
    phoneNumber: string;
    additionalPhoneNumber: string;
  }>;
};

const ensureRows = <T>(key: string, emptyFactory: () => T) => {
  if (!Array.isArray(props.pageForm[key])) props.pageForm[key] = [];
  return props.pageForm[key] as T[];
};

const addRow = (key: string, emptyFactory: () => any) => {
  ensureRows(key, emptyFactory).push(emptyFactory());
};

const removeRow = (key: string, index: number, emptyFactory: () => any) => {
  const rows = ensureRows(key, emptyFactory);
  if (index < 0 || index >= rows.length) return;
  rows.splice(index, 1);
};

const pendidikanSearch = ref("");
const sertifikasiSearch = ref("");
const kelengkapanSearch = ref("");
const referensiSearch = ref("");
const emergencySearch = ref("");

const pendidikanModalOpen = ref(false);
const sertifikasiModalOpen = ref(false);
const kelengkapanModalOpen = ref(false);
const referensiModalOpen = ref(false);
const emergencyModalOpen = ref(false);

const pendidikanEditIndex = ref<number | null>(null);
const sertifikasiEditIndex = ref<number | null>(null);
const kelengkapanEditIndex = ref<number | null>(null);
const referensiEditIndex = ref<number | null>(null);
const emergencyEditIndex = ref<number | null>(null);

const pendidikanDraft = ref({ strata: "", tahunLulus: "", institusi: "", dokumenUrl: "" });
const sertifikasiDraft = ref({ tanggalExpired: "", nama: "", dokumenUrl: "" });
const kelengkapanDraft = ref({ dokumen: "KTP", keterangan: "", dokumenUrl: "" });
const referensiDraft = ref({
  tanggalReferensi: "",
  posisiPenugasan: "",
  kerjaStart: "",
  kerjaEnd: "",
  pemberiReferensi: "",
  dokumenUrl: "",
});
const emergencyDraft = ref({ name: "", relationship: "", phoneNumber: "", additionalPhoneNumber: "" });

const defaultColDef = {
  resizable: true,
  sortable: false,
  filter: false,
  suppressHeaderMenuButton: true,
  cellStyle: { display: "flex", alignItems: "center", paddingTop: "0px", paddingBottom: "0px" },
};
const sectionGridOptions: any = {
  domLayout: "autoHeight",
  animateRows: true,
  suppressCellFocus: true,
};
const compactRowHeight = ref(24);
onMounted(() => {
  compactRowHeight.value = calcAgRowHeight(resolveAgFontPx(), "compact");
});
const themeClass = computed(() =>
  typeof document !== "undefined" && document.documentElement.classList.contains("dark")
    ? "ag-theme-quartz-dark"
    : "ag-theme-quartz",
);

const photoInputRef = ref<HTMLInputElement | null>(null);
const openPhotoPicker = () => {
  photoInputRef.value?.click();
};
const clearPhoto = () => {
  props.pageForm.photoDataUrl = "";
};
const onPhotoSelected = (event: Event) => {
  const input = event.target as HTMLInputElement | null;
  const file = input?.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    input.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    props.pageForm.photoDataUrl = typeof reader.result === "string" ? reader.result : "";
    if (input) input.value = "";
  };
  reader.readAsDataURL(file);
};
const avatarFallback = computed(() => {
  const first = String(props.pageForm.firstName || "").trim();
  const last = String(props.pageForm.lastName || "").trim();
  const full = `${first} ${last}`.trim();
  return full || "Employee";
});

const searchBy = <T extends object>(rows: T[], keyword: string) => {
  const q = keyword.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
};

const pendidikanGridRows = computed(() =>
  searchBy(
    ensureRows("pendidikanRows", () => ({ strata: "", tahunLulus: "", institusi: "", dokumenUrl: "" })).map((row: any, idx: number) => ({
      ...row,
      no: idx + 1,
      __index: idx,
    })),
    pendidikanSearch.value,
  ),
);
const sertifikasiGridRows = computed(() =>
  searchBy(
    ensureRows("sertifikasiRows", () => ({ tanggalExpired: "", nama: "", dokumenUrl: "" })).map((row: any, idx: number) => ({
      ...row,
      no: idx + 1,
      __index: idx,
    })),
    sertifikasiSearch.value,
  ),
);
const kelengkapanGridRows = computed(() =>
  searchBy(
    ensureRows("kelengkapanRows", () => ({ dokumen: "KTP", keterangan: "", dokumenUrl: "" })).map((row: any, idx: number) => ({
      ...row,
      no: idx + 1,
      __index: idx,
    })),
    kelengkapanSearch.value,
  ),
);
const referensiGridRows = computed(() =>
  searchBy(
    ensureRows("referensiRows", () => ({ tanggalReferensi: "", posisiPenugasan: "", kerjaStart: "", kerjaEnd: "", pemberiReferensi: "", dokumenUrl: "" })).map((row: any, idx: number) => ({
      ...row,
      no: idx + 1,
      __index: idx,
    })),
    referensiSearch.value,
  ),
);
const emergencyGridRows = computed(() =>
  searchBy(
    ensureEmergencyContacts().map((row: any, idx: number) => ({
      ...row,
      no: idx + 1,
      __index: idx,
    })),
    emergencySearch.value,
  ),
);

const dokumenRenderer = (params: any) => {
  const value = String(params.value || "");
  if (!value) return "-";
  return `<button type="button" data-action="open-url" data-url="${encodeURIComponent(value)}" class="btn btn-info !h-[18px] !min-h-[18px] !px-1.5 !py-0 !text-[11px]">Lihat</button>`;
};
const toSvg = (name: keyof typeof iconRegistry) => (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');
const aksiRenderer = (section: string, params: any) =>
  `<div class="inline-flex items-center gap-1">
    <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="edit-${section}" data-index="${params.data?.__index ?? -1}" title="Edit">${toSvg("pencil")}</button>
    <button type="button" class="icon-btn icon-btn-solid-error icon-btn-xs" data-action="del-${section}" data-index="${params.data?.__index ?? -1}" title="Hapus">${toSvg("trash")}</button>
  </div>`;

const pendidikanColumnDefs = [
  { field: "no", headerName: "No", width: 64 },
  { field: "strata", headerName: "Strata", width: 110 },
  { field: "tahunLulus", headerName: "Tahun Lulus", width: 130 },
  { field: "institusi", headerName: "Universitas", minWidth: 260, flex: 1.2 },
  { field: "dokumenUrl", headerName: "Dokumen", width: 120, cellRenderer: dokumenRenderer },
  { headerName: "Aksi", width: 100, pinned: "right", cellRenderer: (p: any) => aksiRenderer("pendidikan", p) },
];
const sertifikasiColumnDefs = [
  { field: "no", headerName: "No", width: 64 },
  { field: "tanggalExpired", headerName: "Tanggal Expired", width: 150 },
  { field: "nama", headerName: "Sertifikat", minWidth: 260, flex: 1.2 },
  { field: "dokumenUrl", headerName: "Dokumen", width: 120, cellRenderer: dokumenRenderer },
  { headerName: "Aksi", width: 100, pinned: "right", cellRenderer: (p: any) => aksiRenderer("sertifikasi", p) },
];
const kelengkapanColumnDefs = [
  { field: "no", headerName: "No", width: 64 },
  { field: "dokumen", headerName: "Dokumen", width: 150 },
  { field: "keterangan", headerName: "Keterangan", minWidth: 250, flex: 1.1 },
  { field: "dokumenUrl", headerName: "Dokumen", width: 120, cellRenderer: dokumenRenderer },
  { headerName: "Aksi", width: 100, pinned: "right", cellRenderer: (p: any) => aksiRenderer("kelengkapan", p) },
];
const referensiColumnDefs = [
  { field: "no", headerName: "No", width: 64 },
  { field: "tanggalReferensi", headerName: "Tanggal Referensi", width: 150 },
  { field: "posisiPenugasan", headerName: "Posisi Penugasan", width: 200 },
  { field: "kerjaStart", headerName: "Kerja Start", width: 130 },
  { field: "kerjaEnd", headerName: "Kerja End", width: 130 },
  { field: "pemberiReferensi", headerName: "Pemberi Referensi", minWidth: 200, flex: 1 },
  { field: "dokumenUrl", headerName: "Dokumen", width: 120, cellRenderer: dokumenRenderer },
  { headerName: "Aksi", width: 100, pinned: "right", cellRenderer: (p: any) => aksiRenderer("referensi", p) },
];
const emergencyColumnDefs = [
  { field: "no", headerName: "No", width: 64 },
  { field: "name", headerName: "Nama", minWidth: 220, flex: 1 },
  { field: "relationship", headerName: "Relationship", minWidth: 180, flex: 0.8 },
  { field: "phoneNumber", headerName: "Telp 1", width: 160 },
  { field: "additionalPhoneNumber", headerName: "Telp 2", width: 160 },
  { headerName: "Aksi", width: 100, pinned: "right", cellRenderer: (p: any) => aksiRenderer("emergency", p) },
];

const onGridCellClicked = (section: "pendidikan" | "sertifikasi" | "kelengkapan" | "referensi" | "emergency", event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]") as HTMLElement | null;
  const action = actionEl?.getAttribute("data-action") || "";
  if (!action) return;

  if (action === "open-url") {
    const encoded = actionEl?.getAttribute("data-url") || "";
    if (encoded) window.open(decodeURIComponent(encoded), "_blank", "noopener,noreferrer");
    return;
  }

  const index = Number(actionEl?.getAttribute("data-index") || -1);
  if (!Number.isFinite(index) || index < 0) return;

  if (section === "pendidikan") {
    const rows = ensureRows("pendidikanRows", () => ({ strata: "", tahunLulus: "", institusi: "", dokumenUrl: "" }));
    if (action === "edit-pendidikan") {
      pendidikanEditIndex.value = index;
      pendidikanDraft.value = { ...rows[index] };
      pendidikanModalOpen.value = true;
      return;
    }
    if (action === "del-pendidikan") removeRow("pendidikanRows", index, () => ({ strata: "", tahunLulus: "", institusi: "", dokumenUrl: "" }));
  }
  if (section === "sertifikasi") {
    const rows = ensureRows("sertifikasiRows", () => ({ tanggalExpired: "", nama: "", dokumenUrl: "" }));
    if (action === "edit-sertifikasi") {
      sertifikasiEditIndex.value = index;
      sertifikasiDraft.value = { ...rows[index] };
      sertifikasiModalOpen.value = true;
      return;
    }
    if (action === "del-sertifikasi") removeRow("sertifikasiRows", index, () => ({ tanggalExpired: "", nama: "", dokumenUrl: "" }));
  }
  if (section === "kelengkapan") {
    const rows = ensureRows("kelengkapanRows", () => ({ dokumen: "KTP", keterangan: "", dokumenUrl: "" }));
    if (action === "edit-kelengkapan") {
      kelengkapanEditIndex.value = index;
      kelengkapanDraft.value = { ...rows[index] };
      kelengkapanModalOpen.value = true;
      return;
    }
    if (action === "del-kelengkapan") removeRow("kelengkapanRows", index, () => ({ dokumen: "KTP", keterangan: "", dokumenUrl: "" }));
  }
  if (section === "referensi") {
    const rows = ensureRows("referensiRows", () => ({ tanggalReferensi: "", posisiPenugasan: "", kerjaStart: "", kerjaEnd: "", pemberiReferensi: "", dokumenUrl: "" }));
    if (action === "edit-referensi") {
      referensiEditIndex.value = index;
      referensiDraft.value = { ...rows[index] };
      referensiModalOpen.value = true;
      return;
    }
    if (action === "del-referensi") removeRow("referensiRows", index, () => ({ tanggalReferensi: "", posisiPenugasan: "", kerjaStart: "", kerjaEnd: "", pemberiReferensi: "", dokumenUrl: "" }));
  }
  if (section === "emergency") {
    const rows = ensureEmergencyContacts();
    if (action === "edit-emergency") {
      emergencyEditIndex.value = index;
      emergencyDraft.value = { ...rows[index] };
      emergencyModalOpen.value = true;
      return;
    }
    if (action === "del-emergency") rows.splice(index, 1);
  }
};

const openAddPendidikan = () => {
  pendidikanEditIndex.value = null;
  pendidikanDraft.value = { strata: "", tahunLulus: "", institusi: "", dokumenUrl: "" };
  pendidikanModalOpen.value = true;
};
const savePendidikan = () => {
  const rows = ensureRows("pendidikanRows", () => ({ strata: "", tahunLulus: "", institusi: "", dokumenUrl: "" }));
  if (pendidikanEditIndex.value === null) rows.push({ ...pendidikanDraft.value });
  else rows[pendidikanEditIndex.value] = { ...pendidikanDraft.value };
  pendidikanModalOpen.value = false;
};

const openAddSertifikasi = () => {
  sertifikasiEditIndex.value = null;
  sertifikasiDraft.value = { tanggalExpired: "", nama: "", dokumenUrl: "" };
  sertifikasiModalOpen.value = true;
};
const saveSertifikasi = () => {
  const rows = ensureRows("sertifikasiRows", () => ({ tanggalExpired: "", nama: "", dokumenUrl: "" }));
  if (sertifikasiEditIndex.value === null) rows.push({ ...sertifikasiDraft.value });
  else rows[sertifikasiEditIndex.value] = { ...sertifikasiDraft.value };
  sertifikasiModalOpen.value = false;
};

const openAddKelengkapan = () => {
  kelengkapanEditIndex.value = null;
  kelengkapanDraft.value = { dokumen: "KTP", keterangan: "", dokumenUrl: "" };
  kelengkapanModalOpen.value = true;
};
const saveKelengkapan = () => {
  const rows = ensureRows("kelengkapanRows", () => ({ dokumen: "KTP", keterangan: "", dokumenUrl: "" }));
  if (kelengkapanEditIndex.value === null) rows.push({ ...kelengkapanDraft.value });
  else rows[kelengkapanEditIndex.value] = { ...kelengkapanDraft.value };
  kelengkapanModalOpen.value = false;
};

const openAddReferensi = () => {
  referensiEditIndex.value = null;
  referensiDraft.value = { tanggalReferensi: "", posisiPenugasan: "", kerjaStart: "", kerjaEnd: "", pemberiReferensi: "", dokumenUrl: "" };
  referensiModalOpen.value = true;
};
const saveReferensi = () => {
  const rows = ensureRows("referensiRows", () => ({ tanggalReferensi: "", posisiPenugasan: "", kerjaStart: "", kerjaEnd: "", pemberiReferensi: "", dokumenUrl: "" }));
  if (referensiEditIndex.value === null) rows.push({ ...referensiDraft.value });
  else rows[referensiEditIndex.value] = { ...referensiDraft.value };
  referensiModalOpen.value = false;
};
const openAddEmergency = () => {
  emergencyEditIndex.value = null;
  emergencyDraft.value = { name: "", relationship: "", phoneNumber: "", additionalPhoneNumber: "" };
  emergencyModalOpen.value = true;
};
const saveEmergency = () => {
  const rows = ensureEmergencyContacts();
  if (emergencyEditIndex.value === null) rows.push({ ...emergencyDraft.value });
  else rows[emergencyEditIndex.value] = { ...emergencyDraft.value };
  emergencyModalOpen.value = false;
};
</script>

<template>
  <div class="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
    <PageHeader
      category="Mockup HRIS Admin"
      :title="props.formPageTitle"
      :description="props.formPageDescription"
    />
    <div class="flex flex-wrap gap-2">
      <Button variant="ghost" color="default" size="sm" @click="emit('go-list')">
        Kembali ke list
      </Button>
      <div class="badge badge-soft" :class="props.isCreatePage ? 'badge-primary' : 'badge-warning'">
        Step {{ props.pageStep }} / {{ props.createSteps.length }}
      </div>
    </div>
  </div>

  <Card padding="p-4" class="space-y-5 overflow-hidden rounded-2xl">
    <div class="-mx-4 -mt-4 rounded-t-2xl border-b border-base-300 bg-base-50 px-4 pt-3">
      <div class="tabs tabs-bordered flex-wrap">
        <button
          v-for="step in props.createSteps"
          :key="`page-tab-${step.number}`"
          type="button"
          class="tab tab-bordered h-auto min-h-[unset] justify-start px-4 py-2 text-left !border-b-2 !rounded-t-lg !rounded-b-none !transition-none"
          :class="[
            props.pageStep === step.number
              ? 'tab-active !border-primary !text-primary'
              : '!border-transparent',
          ]"
          @click="emit('step-change', step.number)"
        >
          <div class="flex items-center gap-2 font-semibold">
            <Icon :name="step.icon" class="h-4 w-4 shrink-0" />
            <span>{{ step.title }}</span>
          </div>
        </button>
      </div>
    </div>

    <div v-if="props.pageStep === 1" class="space-y-6">
      <div>
        <div class="text-2xl font-semibold">Personal data</div>
        <p class="mt-1 text-sm text-base-content/60">{{ props.pageStepMeta.description }}</p>
      </div>
      <div class="rounded-2xl border border-base-300 bg-base-50 p-4">
        <div class="grid gap-4 md:grid-cols-[220px_minmax(0,1fr)]">
          <div class="space-y-3">
            <div class="text-sm font-medium">Photo profile</div>
            <div class="flex items-center gap-3">
              <Avatar
                :alt="avatarFallback"
                :fallback="avatarFallback"
                :src="props.pageForm.photoDataUrl || undefined"
                size="xl"
                color="primary"
              />
              <div class="text-xs text-base-content/60">
                JPG, PNG, WEBP.<br />Maks 2 MB.
              </div>
            </div>
            <input
              ref="photoInputRef"
              type="file"
              accept="image/png,image/jpeg,image/webp"
              class="hidden"
              @change="onPhotoSelected"
            />
            <div class="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" color="default" @click="openPhotoPicker">
                <Icon name="upload" class="h-4 w-4" />
                Upload photo
              </Button>
              <Button
                v-if="props.pageForm.photoDataUrl"
                size="sm"
                variant="ghost"
                color="default"
                @click="clearPhoto"
              >
                Hapus
              </Button>
            </div>
          </div>
          <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-1">
              <label class="text-sm font-medium">Name <span class="text-error">*</span></label>
              <Input v-model="props.pageForm.firstName" size="sm" placeholder="First name" class="w-full" />
            </div>
            <div class="space-y-1">
              <label class="text-sm font-medium opacity-0 select-none">Last name</label>
              <Input v-model="props.pageForm.lastName" size="sm" placeholder="Last name" class="w-full" />
            </div>
            <div class="space-y-1 md:col-span-2">
              <label class="text-sm font-medium">Email <span class="text-error">*</span></label>
              <Input v-model="props.pageForm.email" type="email" size="sm" placeholder="name@company.com" class="w-full" />
              <p class="text-xs text-base-content/60">This email is use for log in</p>
            </div>
          </div>
        </div>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">Phone number</label>
          <Input v-model="props.pageForm.phoneNumber" size="sm" mask="phone-id" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Additional phone number</label>
          <Input v-model="props.pageForm.additionalPhoneNumber" size="sm" mask="phone-id" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Place of birth</label>
          <Input v-model="props.pageForm.placeOfBirth" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Birthdate <span class="text-error">*</span></label>
          <DateTimePicker v-model="props.pageForm.birthDate" picker="date" size="sm" class="w-full" />
        </div>
        <div class="space-y-2">
          <label class="text-sm font-medium">Gender</label>
          <div class="flex gap-4 pt-1">
            <label v-for="item in props.genderOptions" :key="item.value" class="inline-flex items-center gap-2 text-sm">
              <input v-model="props.pageForm.gender" type="radio" :value="item.value" class="radio radio-primary radio-sm" />
              {{ item.label }}
            </label>
          </div>
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Marital status <span class="text-error">*</span></label>
          <SelectDropdown v-model="props.pageForm.maritalStatus" :options="props.maritalStatusOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Blood type</label>
          <SelectDropdown v-model="props.pageForm.bloodType" :options="props.bloodTypeOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Religion <span class="text-error">*</span></label>
          <SelectDropdown v-model="props.pageForm.religion" :options="props.religionOptions" size="sm" variant="outline" color="default" />
        </div>
      </div>

      <div class="border-t border-base-300 pt-5">
        <div class="text-2xl font-semibold">Address and identity</div>
        <p class="mt-1 text-sm text-base-content/60">Employee identity address information</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">NIK (NPWP 16 digit)</label>
          <Input v-model="props.pageForm.nik" size="sm" mask="nik" :max-digits="16" placeholder="0000 0000 0000 0000" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Passport number</label>
          <Input v-model="props.pageForm.passportNumber" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Passport expiry date</label>
          <DateTimePicker v-model="props.pageForm.passportExpiryDate" picker="date" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Postal code</label>
          <Input v-model="props.pageForm.postalCode" size="sm" class="w-full" />
        </div>
        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium">Citizen ID address</label>
          <textarea v-model="props.pageForm.citizenIdAddress" class="input min-h-28 w-full py-2" />
        </div>
        <label class="inline-flex items-center gap-2 text-sm md:col-span-2">
          <input v-model="props.pageForm.useAsResidentialAddress" type="checkbox" class="checkbox checkbox-sm" />
          Use as residential address
        </label>
        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium">Residential address</label>
          <textarea v-model="props.pageForm.residentialAddress" class="input min-h-28 w-full py-2" />
        </div>
      </div>
    </div>

    <div v-else-if="props.pageStep === 2" class="space-y-5">
      <div>
        <div class="text-2xl font-semibold">Emergency contact</div>
        <p class="mt-1 text-sm text-base-content/60">{{ props.pageStepMeta.description }}</p>
      </div>
      <div class="space-y-4">
        <Card padding="p-0" class="overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/55 px-4 py-3">
            <div class="text-sm font-semibold">Emergency Contact</div>
            <div class="flex items-center gap-2">
              <Input v-model="emergencySearch" size="sm" placeholder="Cari data..." class="w-[220px]" />
              <Button size="xs" color="success" @click="openAddEmergency">
                <Icon name="plus" class="h-4 w-4" />
                Tambah
              </Button>
            </div>
          </div>
          <div class="p-3">
            <AgGridSurface
              :class="[
                'agx',
                'agx-compact',
                'w-full',
                themeClass,
                '[&_.ag-layout-auto-height_.ag-center-cols-viewport]:!min-h-[25px]',
                '[&_.ag-layout-auto-height_.ag-center-cols-container]:!min-h-[25px]',
                '[&_.ag-overlay]:!bg-transparent',
                '[&_.ag-overlay]:!pointer-events-none',
              ]"
              theme="legacy"
              density="compact"
              :rowHeight="compactRowHeight"
              :rowData="emergencyGridRows"
              :columnDefs="emergencyColumnDefs"
              :defaultColDef="defaultColDef"
              :gridOptions="sectionGridOptions"
              :auto-height-when-few-rows="true"
              :auto-row-height="false"
              normal-layout-height="100%"
              @cell-clicked="(event: any) => onGridCellClicked('emergency', event)"
            />
          </div>
        </Card>
      </div>
    </div>

    <div v-else-if="props.pageStep === 3" class="space-y-5">
      <div>
        <div class="text-2xl font-semibold">Employment</div>
        <p class="mt-1 text-sm text-base-content/60">{{ props.pageStepMeta.description }}</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">3 Letter code <span class="text-error">*</span></label>
          <Input v-model="props.pageForm.threeLetterCode" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Struktur organisasi <span class="text-error">*</span></label>
          <SelectDropdown
            v-model="props.pageForm.organizationStructure"
            :options="props.organizationStructureOptions"
            size="sm"
            variant="outline"
            color="default"
          />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Job position <span class="text-error">*</span></label>
          <SelectDropdown v-model="props.pageForm.title" :options="props.jobPositionOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Job level <span class="text-error">*</span></label>
          <SelectDropdown v-model="props.pageForm.jobLevel" :options="props.jobLevelOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Employment status <span class="text-error">*</span></label>
          <SelectDropdown v-model="props.pageForm.employmentType" :options="props.employmentTypeOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Branch <span class="text-error">*</span></label>
          <SelectDropdown v-model="props.pageForm.branch" :options="props.branchOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Join date <span class="text-error">*</span></label>
          <DateTimePicker v-model="props.pageForm.joinDate" picker="date" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">End date</label>
          <DateTimePicker v-model="props.pageForm.endDate" picker="date" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Grade</label>
          <Input v-model="props.pageForm.grade" size="sm" class="w-full" />
        </div>
      </div>
    </div>

    <div v-else-if="props.pageStep === 4" class="space-y-5">
      <div>
        <div class="text-2xl font-semibold">Education & Experience</div>
        <p class="mt-1 text-sm text-base-content/60">{{ props.pageStepMeta.description }}</p>
      </div>
      <div class="space-y-4">
        <Card padding="p-0" class="overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/55 px-4 py-3">
            <div class="text-sm font-semibold">Pendidikan</div>
            <div class="flex items-center gap-2">
              <Input v-model="pendidikanSearch" size="sm" placeholder="Cari data..." class="w-[220px]" />
              <Button size="xs" color="success" @click="openAddPendidikan">
                <Icon name="plus" class="h-4 w-4" />
                Tambah
              </Button>
            </div>
          </div>
          <div class="p-3">
            <AgGridSurface
              :class="[
                'agx',
                'agx-compact',
                'w-full',
                themeClass,
                '[&_.ag-layout-auto-height_.ag-center-cols-viewport]:!min-h-[25px]',
                '[&_.ag-layout-auto-height_.ag-center-cols-container]:!min-h-[25px]',
                '[&_.ag-overlay]:!bg-transparent',
                '[&_.ag-overlay]:!pointer-events-none',
              ]"
              theme="legacy"
              density="compact"
              :rowHeight="compactRowHeight"
              :rowData="pendidikanGridRows"
              :columnDefs="pendidikanColumnDefs"
              :defaultColDef="defaultColDef"
              :gridOptions="sectionGridOptions"
              :auto-height-when-few-rows="true"
              :auto-row-height="false"
              normal-layout-height="100%"
              @cell-clicked="(event: any) => onGridCellClicked('pendidikan', event)"
            />
          </div>
        </Card>

        <Card padding="p-0" class="overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/55 px-4 py-3">
            <div class="text-sm font-semibold">Sertifikasi</div>
            <div class="flex items-center gap-2">
              <Input v-model="sertifikasiSearch" size="sm" placeholder="Cari data..." class="w-[220px]" />
              <Button size="xs" color="success" @click="openAddSertifikasi">
                <Icon name="plus" class="h-4 w-4" />
                Tambah
              </Button>
            </div>
          </div>
          <div class="p-3">
            <AgGridSurface
              :class="[
                'agx',
                'agx-compact',
                'w-full',
                themeClass,
                '[&_.ag-layout-auto-height_.ag-center-cols-viewport]:!min-h-[25px]',
                '[&_.ag-layout-auto-height_.ag-center-cols-container]:!min-h-[25px]',
                '[&_.ag-overlay]:!bg-transparent',
                '[&_.ag-overlay]:!pointer-events-none',
              ]"
              theme="legacy"
              density="compact"
              :rowHeight="compactRowHeight"
              :rowData="sertifikasiGridRows"
              :columnDefs="sertifikasiColumnDefs"
              :defaultColDef="defaultColDef"
              :gridOptions="sectionGridOptions"
              :auto-height-when-few-rows="true"
              :auto-row-height="false"
              normal-layout-height="100%"
              @cell-clicked="(event: any) => onGridCellClicked('sertifikasi', event)"
            />
          </div>
        </Card>

        <Card padding="p-0" class="overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/55 px-4 py-3">
            <div class="text-sm font-semibold">Kelengkapan</div>
            <div class="flex items-center gap-2">
              <Input v-model="kelengkapanSearch" size="sm" placeholder="Cari data..." class="w-[220px]" />
              <Button size="xs" color="success" @click="openAddKelengkapan">
                <Icon name="plus" class="h-4 w-4" />
                Tambah
              </Button>
            </div>
          </div>
          <div class="p-3">
            <AgGridSurface
              :class="[
                'agx',
                'agx-compact',
                'w-full',
                themeClass,
                '[&_.ag-layout-auto-height_.ag-center-cols-viewport]:!min-h-[25px]',
                '[&_.ag-layout-auto-height_.ag-center-cols-container]:!min-h-[25px]',
                '[&_.ag-overlay]:!bg-transparent',
                '[&_.ag-overlay]:!pointer-events-none',
              ]"
              theme="legacy"
              density="compact"
              :rowHeight="compactRowHeight"
              :rowData="kelengkapanGridRows"
              :columnDefs="kelengkapanColumnDefs"
              :defaultColDef="defaultColDef"
              :gridOptions="sectionGridOptions"
              :auto-height-when-few-rows="true"
              :auto-row-height="false"
              normal-layout-height="100%"
              @cell-clicked="(event: any) => onGridCellClicked('kelengkapan', event)"
            />
          </div>
        </Card>

        <Card padding="p-0" class="overflow-hidden">
          <div class="flex flex-wrap items-center justify-between gap-2 border-b border-base-300 bg-base-200/55 px-4 py-3">
            <div class="text-sm font-semibold">Referensi Asli</div>
            <div class="flex items-center gap-2">
              <Input v-model="referensiSearch" size="sm" placeholder="Cari data..." class="w-[220px]" />
              <Button size="xs" color="success" @click="openAddReferensi">
                <Icon name="plus" class="h-4 w-4" />
                Tambah
              </Button>
            </div>
          </div>
          <div class="p-3">
            <AgGridSurface
              :class="[
                'agx',
                'agx-compact',
                'w-full',
                themeClass,
                '[&_.ag-layout-auto-height_.ag-center-cols-viewport]:!min-h-[25px]',
                '[&_.ag-layout-auto-height_.ag-center-cols-container]:!min-h-[25px]',
                '[&_.ag-overlay]:!bg-transparent',
                '[&_.ag-overlay]:!pointer-events-none',
              ]"
              theme="legacy"
              density="compact"
              :rowHeight="compactRowHeight"
              :rowData="referensiGridRows"
              :columnDefs="referensiColumnDefs"
              :defaultColDef="defaultColDef"
              :gridOptions="sectionGridOptions"
              :auto-height-when-few-rows="true"
              :auto-row-height="false"
              normal-layout-height="100%"
              @cell-clicked="(event: any) => onGridCellClicked('referensi', event)"
            />
          </div>
        </Card>
      </div>
    </div>

    <div v-else class="space-y-5">
      <div>
        <div class="text-2xl font-semibold">Payroll</div>
        <p class="mt-1 text-sm text-base-content/60">{{ props.pageStepMeta.description }}</p>
      </div>
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">Bank name <span class="text-error">*</span></label>
          <Input v-model="props.pageForm.bankName" size="sm" placeholder="BCA / Mandiri / BNI" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Bank account name <span class="text-error">*</span></label>
          <Input v-model="props.pageForm.bankAccountName" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Bank account number <span class="text-error">*</span></label>
          <Input v-model="props.pageForm.bankAccountNumber" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">NPWP number</label>
          <Input v-model="props.pageForm.npwpNumber" size="sm" mask="npwp" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">BPJS Kesehatan</label>
          <Input v-model="props.pageForm.bpjsKesehatan" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">BPJS Ketenagakerjaan</label>
          <Input v-model="props.pageForm.bpjsKetenagakerjaan" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Base salary <span class="text-error">*</span></label>
          <Input v-model="props.pageForm.baseSalary" size="sm" mask="currency-idr" placeholder="15.000.000" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Payroll schedule</label>
          <SelectDropdown v-model="props.pageForm.payrollSchedule" :options="props.payrollScheduleOptions" size="sm" variant="outline" color="default" />
        </div>
      </div>
    </div>

    <div class="flex w-full items-center justify-between border-t border-base-300 pt-4">
      <Button variant="ghost" color="default" :disabled="props.pageBackDisabled" @click="emit('prev-step')">Back</Button>
      <div class="flex gap-2">
        <Button variant="ghost" color="default" @click="emit('go-list')">Cancel</Button>
        <Button color="primary" :disabled="!props.pageStepValid" @click="emit('next-step')">{{ props.pagePrimaryLabel }}</Button>
      </div>
    </div>
  </Card>

  <Modal :open="pendidikanModalOpen" :title="pendidikanEditIndex === null ? 'Tambah Pendidikan' : 'Edit Pendidikan'" size="md" hide-footer @close="pendidikanModalOpen = false">
    <div class="space-y-4">
      <div class="space-y-1">
        <label class="text-sm font-medium">Strata</label>
        <Input v-model="pendidikanDraft.strata" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Tahun Lulus</label>
        <Input v-model="pendidikanDraft.tahunLulus" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Universitas</label>
        <Input v-model="pendidikanDraft.institusi" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Dokumen URL</label>
        <Input v-model="pendidikanDraft.dokumenUrl" size="sm" placeholder="https://..." />
      </div>
      <div class="flex justify-end gap-2 border-t border-base-300 pt-4">
        <Button variant="ghost" color="default" @click="pendidikanModalOpen = false">Batal</Button>
        <Button color="primary" @click="savePendidikan">Simpan</Button>
      </div>
    </div>
  </Modal>

  <Modal :open="emergencyModalOpen" :title="emergencyEditIndex === null ? 'Tambah Emergency Contact' : 'Edit Emergency Contact'" size="md" hide-footer @close="emergencyModalOpen = false">
    <div class="space-y-4">
      <div class="space-y-1">
        <label class="text-sm font-medium">Name</label>
        <Input v-model="emergencyDraft.name" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Relationship</label>
        <Input v-model="emergencyDraft.relationship" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Phone 1</label>
        <Input v-model="emergencyDraft.phoneNumber" size="sm" mask="phone-id" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Phone 2</label>
        <Input v-model="emergencyDraft.additionalPhoneNumber" size="sm" mask="phone-id" />
      </div>
      <div class="flex justify-end gap-2 border-t border-base-300 pt-4">
        <Button variant="ghost" color="default" @click="emergencyModalOpen = false">Batal</Button>
        <Button color="primary" @click="saveEmergency">Simpan</Button>
      </div>
    </div>
  </Modal>

  <Modal :open="sertifikasiModalOpen" :title="sertifikasiEditIndex === null ? 'Tambah Sertifikasi' : 'Edit Sertifikasi'" size="md" hide-footer @close="sertifikasiModalOpen = false">
    <div class="space-y-4">
      <div class="space-y-1">
        <label class="text-sm font-medium">Tanggal Expired</label>
        <DateTimePicker v-model="sertifikasiDraft.tanggalExpired" picker="date" size="sm" class="w-full" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Nama Sertifikasi</label>
        <Input v-model="sertifikasiDraft.nama" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Dokumen URL</label>
        <Input v-model="sertifikasiDraft.dokumenUrl" size="sm" placeholder="https://..." />
      </div>
      <div class="flex justify-end gap-2 border-t border-base-300 pt-4">
        <Button variant="ghost" color="default" @click="sertifikasiModalOpen = false">Batal</Button>
        <Button color="primary" @click="saveSertifikasi">Simpan</Button>
      </div>
    </div>
  </Modal>

  <Modal :open="kelengkapanModalOpen" :title="kelengkapanEditIndex === null ? 'Tambah Kelengkapan' : 'Edit Kelengkapan'" size="md" hide-footer @close="kelengkapanModalOpen = false">
    <div class="space-y-4">
      <div class="space-y-1">
        <label class="text-sm font-medium">Dokumen</label>
        <SelectDropdown v-model="kelengkapanDraft.dokumen" :options="props.kelengkapanKeyOptions" size="sm" variant="outline" color="default" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Keterangan</label>
        <Input v-model="kelengkapanDraft.keterangan" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Dokumen URL</label>
        <Input v-model="kelengkapanDraft.dokumenUrl" size="sm" placeholder="https://..." />
      </div>
      <div class="flex justify-end gap-2 border-t border-base-300 pt-4">
        <Button variant="ghost" color="default" @click="kelengkapanModalOpen = false">Batal</Button>
        <Button color="primary" @click="saveKelengkapan">Simpan</Button>
      </div>
    </div>
  </Modal>

  <Modal :open="referensiModalOpen" :title="referensiEditIndex === null ? 'Tambah Referensi' : 'Edit Referensi'" size="md" hide-footer @close="referensiModalOpen = false">
    <div class="space-y-4">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">Tanggal Referensi</label>
          <DateTimePicker v-model="referensiDraft.tanggalReferensi" picker="date" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Posisi Penugasan</label>
          <Input v-model="referensiDraft.posisiPenugasan" size="sm" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Kerja Start</label>
          <DateTimePicker v-model="referensiDraft.kerjaStart" picker="date" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Kerja End</label>
          <DateTimePicker v-model="referensiDraft.kerjaEnd" picker="date" size="sm" class="w-full" />
        </div>
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Pemberi Referensi</label>
        <Input v-model="referensiDraft.pemberiReferensi" size="sm" />
      </div>
      <div class="space-y-1">
        <label class="text-sm font-medium">Dokumen URL</label>
        <Input v-model="referensiDraft.dokumenUrl" size="sm" placeholder="https://..." />
      </div>
      <div class="flex justify-end gap-2 border-t border-base-300 pt-4">
        <Button variant="ghost" color="default" @click="referensiModalOpen = false">Batal</Button>
        <Button color="primary" @click="saveReferensi">Simpan</Button>
      </div>
    </div>
  </Modal>
</template>

