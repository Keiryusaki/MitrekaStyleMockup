<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { AgGridSurface, Button, Card, Icon, Input, Modal, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { iconRegistry } from "@/composables/Icon";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "@/lib/mitreka-ui/plugins/aggrid.css";
import "leaflet/dist/leaflet.css";

type OfficeType = "HQ" | "Branch" | "Client Site";
type AttendanceMode = "GPS" | "Flexible";
type OfficeStatus = "Active" | "Inactive";

type OfficeLocation = {
  id: number;
  name: string;
  type: OfficeType;
  linkedEntity: string;
  address: string;
  latitude: string;
  longitude: string;
  radius: number;
  attendanceMode: AttendanceMode;
  status: OfficeStatus;
};

const locations = ref<OfficeLocation[]>([
  {
    id: 1,
    name: "Mitreka HQ - Jakarta",
    type: "HQ",
    linkedEntity: "PT Mitreka Solusi Indonesia",
    address: "Jl. Mampang Prapatan Raya No.12, Jakarta Selatan",
    latitude: "-6.254561",
    longitude: "106.801883",
    radius: 120,
    attendanceMode: "GPS",
    status: "Active",
  },
  {
    id: 2,
    name: "Branch Bandung",
    type: "Branch",
    linkedEntity: "Cabang Bandung",
    address: "Jl. Ir. H. Juanda No.140, Bandung",
    latitude: "-6.902475",
    longitude: "107.618736",
    radius: 100,
    attendanceMode: "GPS",
    status: "Active",
  },
  {
    id: 3,
    name: "Client Site - PT Arunika Digital",
    type: "Client Site",
    linkedEntity: "PT Arunika Digital",
    address: "Kawasan Sudirman Business District, Jakarta Pusat",
    latitude: "-6.214821",
    longitude: "106.821021",
    radius: 80,
    attendanceMode: "GPS",
    status: "Active",
  },
  {
    id: 4,
    name: "Client Site - Global Energi Plant",
    type: "Client Site",
    linkedEntity: "PT Global Energi",
    address: "Kawasan Industri Rungkut, Surabaya",
    latitude: "-7.335941",
    longitude: "112.768845",
    radius: 150,
    attendanceMode: "Flexible",
    status: "Inactive",
  },
]);

const search = ref("");
const selectedType = ref<"all" | OfficeType>("all");
const selectedStatus = ref<"all" | OfficeStatus>("all");
const gridApi = ref<any>(null);

const locationTypeOptions = [
  { value: "all", label: "Semua tipe" },
  { value: "HQ", label: "HQ" },
  { value: "Branch", label: "Branch" },
  { value: "Client Site", label: "Client Site" },
];

const statusOptions = [
  { value: "all", label: "Semua status" },
  { value: "Active", label: "Active" },
  { value: "Inactive", label: "Inactive" },
];

const manageModalOpen = ref(false);
const editingId = ref<number | null>(null);
const form = ref<OfficeLocation>({
  id: 0,
  name: "",
  type: "Branch",
  linkedEntity: "",
  address: "",
  latitude: "",
  longitude: "",
  radius: 100,
  attendanceMode: "GPS",
  status: "Active",
});

const filteredLocations = computed(() =>
  locations.value.filter((item) => {
    if (selectedType.value !== "all" && item.type !== selectedType.value) return false;
    if (selectedStatus.value !== "all" && item.status !== selectedStatus.value) return false;
    return true;
  }),
);

const stats = computed(() => [
  { label: "Total lokasi", value: locations.value.length, icon: "map-pin" },
  { label: "Lokasi aktif", value: locations.value.filter((item) => item.status === "Active").length, icon: "check" },
  { label: "Client site", value: locations.value.filter((item) => item.type === "Client Site").length, icon: "layout" },
]);

const resetForm = () => {
  form.value = {
    id: 0,
    name: "",
    type: "Branch",
    linkedEntity: "",
    address: "",
    latitude: "",
    longitude: "",
    radius: 100,
    attendanceMode: "GPS",
    status: "Active",
  };
};

const openCreateModal = () => {
  editingId.value = null;
  resetForm();
  manageModalOpen.value = true;
};

const openEditModal = (item: OfficeLocation) => {
  editingId.value = item.id;
  form.value = { ...item };
  manageModalOpen.value = true;
};

const closeModal = () => {
  manageModalOpen.value = false;
};

const saveLocation = () => {
  const payload = { ...form.value };
  if (editingId.value === null) {
    const nextId = Math.max(...locations.value.map((item) => item.id), 0) + 1;
    locations.value = [{ ...payload, id: nextId }, ...locations.value];
  } else {
    locations.value = locations.value.map((item) => (item.id === editingId.value ? payload : item));
  }
  manageModalOpen.value = false;
};

const toggleStatusById = (id: number) => {
  locations.value = locations.value.map((item) =>
    item.id === id
      ? {
          ...item,
          status: item.status === "Active" ? "Inactive" : "Active",
        }
      : item,
  );
};

const saveDisabled = computed(() => !form.value.name.trim() || !form.value.address.trim());

const onGridReady = (params: any) => {
  gridApi.value = params.api;
  params.api.setGridOption("quickFilterText", search.value);
};

watch(search, (value) => {
  gridApi.value?.setGridOption("quickFilterText", value);
});

watch([selectedType, selectedStatus], () => {
  gridApi.value?.setGridOption("quickFilterText", search.value);
});

const parseCoord = (value: string): number | null => {
  if (!value?.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

const validLatLng = computed(() => {
  const lat = parseCoord(form.value.latitude);
  const lng = parseCoord(form.value.longitude);
  if (lat === null || lng === null) return null;
  if (lat < -90 || lat > 90 || lng < -180 || lng > 180) return null;
  return { lat, lng };
});

const googleMapsUrl = computed(() => {
  const coords = validLatLng.value;
  if (!coords) return "https://www.google.com/maps";
  return `https://www.google.com/maps?q=${coords.lat},${coords.lng}`;
});

const mapContainerRef = ref<HTMLElement | null>(null);
const geolocationError = ref("");
let leafletLib: any = null;
let leafletMap: any = null;
let markerLayer: any = null;
let radiusLayer: any = null;

const updateMapLayers = (coords: { lat: number; lng: number }) => {
  if (!leafletMap || !leafletLib) return;

  const radius = Number(form.value.radius) > 0 ? Number(form.value.radius) : 0;

  if (!markerLayer) {
    markerLayer = leafletLib.circleMarker([coords.lat, coords.lng], {
      radius: 7,
      color: "#2563eb",
      fillColor: "#3b82f6",
      fillOpacity: 0.9,
      weight: 2,
    }).addTo(leafletMap);
  } else {
    markerLayer.setLatLng([coords.lat, coords.lng]);
  }

  if (!radiusLayer) {
    radiusLayer = leafletLib.circle([coords.lat, coords.lng], {
      radius,
      color: "#2563eb",
      fillColor: "#60a5fa",
      fillOpacity: 0.18,
      weight: 1.5,
    }).addTo(leafletMap);
  } else {
    radiusLayer.setLatLng([coords.lat, coords.lng]);
    radiusLayer.setRadius(radius);
  }
};

const syncMapFromForm = () => {
  const coords = validLatLng.value;
  if (!leafletMap || !coords) return;
  updateMapLayers(coords);
  leafletMap.setView([coords.lat, coords.lng], Math.max(leafletMap.getZoom() ?? 15, 15));
};

const ensureMapReady = async () => {
  if (!mapContainerRef.value) return;
  if (!leafletLib) {
    leafletLib = await import("leaflet");
  }

  if (leafletMap) {
    leafletMap.invalidateSize();
    syncMapFromForm();
    return;
  }

  const fallback = validLatLng.value ?? { lat: -6.2, lng: 106.816666 };
  leafletMap = leafletLib.map(mapContainerRef.value).setView([fallback.lat, fallback.lng], 14);

  leafletLib
    .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: "&copy; OpenStreetMap contributors",
    })
    .addTo(leafletMap);

  leafletMap.on("click", (event: any) => {
    const lat = Number(event.latlng.lat.toFixed(6));
    const lng = Number(event.latlng.lng.toFixed(6));
    form.value.latitude = String(lat);
    form.value.longitude = String(lng);
    updateMapLayers({ lat, lng });
  });

  updateMapLayers(fallback);
};

const destroyMap = () => {
  if (!leafletMap) return;
  leafletMap.off();
  leafletMap.remove();
  leafletMap = null;
  markerLayer = null;
  radiusLayer = null;
};

const useCurrentLocation = () => {
  geolocationError.value = "";
  if (!navigator.geolocation) {
    geolocationError.value = "Browser tidak mendukung geolocation.";
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = Number(position.coords.latitude.toFixed(6));
      const lng = Number(position.coords.longitude.toFixed(6));
      form.value.latitude = String(lat);
      form.value.longitude = String(lng);
      if (leafletMap) {
        updateMapLayers({ lat, lng });
        leafletMap.setView([lat, lng], 16);
      }
    },
    () => {
      geolocationError.value = "Lokasi gagal diambil. Pastikan izin lokasi sudah diberikan.";
    },
    { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
  );
};

watch(
  manageModalOpen,
  async (open) => {
    geolocationError.value = "";
    if (!open) {
      destroyMap();
      return;
    }
    await nextTick();
    await ensureMapReady();
  },
  { flush: "post" },
);

watch(
  () => [form.value.latitude, form.value.longitude, form.value.radius],
  () => {
    syncMapFromForm();
  },
);

onBeforeUnmount(() => {
  destroyMap();
});

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");

const iconSvg = (name: keyof typeof iconRegistry) =>
  (iconRegistry[name] ?? "").replace("<svg", '<svg class="w-4 h-4"');

const locationCellRenderer = (params: any) => {
  const row = params.data as OfficeLocation | undefined;
  if (!row) return "-";
  return `
    <div class="py-1">
      <div class="font-semibold text-[13px] leading-tight">${escapeHtml(row.name)}</div>
      <div class="text-[11px] mt-1 text-base-content/70">${escapeHtml(row.address)}</div>
      <div class="text-[11px] mt-1 text-base-content/60">Lat ${escapeHtml(row.latitude)} · Lng ${escapeHtml(row.longitude)}</div>
    </div>
  `;
};

const typeCellRenderer = (params: any) => {
  const value = params.value as string;
  return `<span class="badge badge-ghost">${escapeHtml(value || "-")}</span>`;
};

const modeCellRenderer = (params: any) => {
  const value = params.value as string;
  return `<span class="badge badge-outline">${escapeHtml(value || "-")}</span>`;
};

const statusCellRenderer = (params: any) => {
  const value = params.value as OfficeStatus | undefined;
  if (value === "Active") return `<span class="badge badge-success">Active</span>`;
  return `<span class="badge badge-ghost">Inactive</span>`;
};

const actionRenderer = () =>
  `<div class="flex h-full items-center justify-end gap-2">
    <button type="button" class="icon-btn icon-btn-solid-warning icon-btn-xs" data-action="edit" title="Edit lokasi">
      ${iconSvg("pencil")}
    </button>
    <button type="button" class="icon-btn icon-btn-solid-info icon-btn-xs" data-action="toggle" title="Toggle status">
      ${iconSvg("repeat")}
    </button>
  </div>`;

const onCellClicked = (event: any) => {
  const target = event.event?.target as HTMLElement | null;
  const actionEl = target?.closest("[data-action]");
  if (!actionEl) return;

  const row = event.data as OfficeLocation | undefined;
  const action = actionEl.getAttribute("data-action");
  if (!row || !action) return;

  if (action === "edit") openEditModal(row);
  if (action === "toggle") toggleStatusById(row.id);
};

const columnDefs = [
  {
    field: "name",
    headerName: "Location",
    minWidth: 360,
    pinned: "left",
    lockPinned: true,
    cellRenderer: locationCellRenderer,
    getQuickFilterText: (params: any) => {
      const row = params.data as OfficeLocation | undefined;
      if (!row) return "";
      return `${row.name} ${row.address} ${row.linkedEntity} ${row.latitude} ${row.longitude}`;
    },
  },
  {
    field: "type",
    headerName: "Type",
    minWidth: 140,
    cellRenderer: typeCellRenderer,
  },
  {
    field: "linkedEntity",
    headerName: "Entity",
    minWidth: 220,
  },
  {
    field: "radius",
    headerName: "Radius",
    minWidth: 130,
    valueFormatter: (params: any) => `${params.value ?? 0} m`,
  },
  {
    field: "attendanceMode",
    headerName: "Mode",
    minWidth: 140,
    cellRenderer: modeCellRenderer,
  },
  {
    field: "status",
    headerName: "Status",
    minWidth: 130,
    cellRenderer: statusCellRenderer,
  },
  {
    headerName: "Action",
    colId: "actions",
    width: 120,
    pinned: "right",
    lockPinned: true,
    sortable: false,
    filter: false,
    suppressHeaderMenuButton: true,
    cellRenderer: actionRenderer,
  },
];

const defaultColDef = {
  flex: 1,
  minWidth: 120,
  resizable: true,
  sortable: true,
  filter: false,
  floatingFilter: false,
  suppressHeaderMenuButton: true,
};

const gridOptions: any = {
  animateRows: true,
  domLayout: "normal",
  suppressCellFocus: true,
  pagination: true,
  paginationPageSize: 10,
  paginationPageSizeSelector: [10, 25, 50],
  getRowHeight: () => 78,
};
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Admin"
      title="Company Settings - Office Locations"
      description="Master lokasi absensi untuk HQ, cabang, dan client site. Data ini jadi referensi validasi geofence saat mobile clock-in."
    />

    <Card padding="p-4">
      <div class="grid gap-3 md:grid-cols-3">
        <div v-for="item in stats" :key="item.label" class="rounded-xl border border-base-300 bg-base-50 p-4">
          <div class="flex items-center justify-between">
            <div class="text-sm text-base-content/65">{{ item.label }}</div>
            <Icon :name="item.icon" class="h-4 w-4 text-primary" />
          </div>
          <div class="mt-3 text-2xl font-semibold">{{ item.value }}</div>
        </div>
      </div>
    </Card>

    <Card padding="p-4" class="space-y-4">
      <div class="grid gap-3 lg:grid-cols-[minmax(0,1fr)_220px_220px_auto]">
        <Input v-model="search" size="sm" placeholder="Cari nama lokasi / cabang / client" class="w-full" />
        <SelectDropdown v-model="selectedType" :options="locationTypeOptions" size="sm" variant="outline" color="default" />
        <SelectDropdown v-model="selectedStatus" :options="statusOptions" size="sm" variant="outline" color="default" />
        <Button color="primary" size="sm" class="w-full lg:w-auto" @click="openCreateModal">
          <Icon name="plus" class="h-4 w-4" />
          Tambah lokasi
        </Button>
      </div>

      <div class="h-[clamp(360px,56dvh,68dvh)] min-h-[420px] w-full">
        <AgGridSurface
          class="agx agx-compact ag-theme-quartz h-full min-h-0 w-full"
          theme="legacy"
          density="compact"
          :auto-height-when-few-rows="false"
          :auto-row-height="false"
          normal-layout-height="100%"
          :rowData="filteredLocations"
          :columnDefs="columnDefs"
          :defaultColDef="defaultColDef"
          :gridOptions="gridOptions"
          @grid-ready="onGridReady"
          @cell-clicked="onCellClicked"
        />
      </div>
    </Card>

    <Modal
      :open="manageModalOpen"
      :title="editingId === null ? 'Tambah lokasi office' : 'Edit lokasi office'"
      size="lg"
      @close="closeModal"
    >
      <div class="space-y-4">
        <div class="grid gap-4 md:grid-cols-2">
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Nama lokasi</label>
            <Input v-model="form.name" size="sm" class="w-full" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Tipe lokasi</label>
            <SelectDropdown
              v-model="form.type"
              :options="locationTypeOptions.filter((item) => item.value !== 'all')"
              size="sm"
              variant="outline"
              color="default"
            />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Status</label>
            <SelectDropdown
              v-model="form.status"
              :options="statusOptions.filter((item) => item.value !== 'all')"
              size="sm"
              variant="outline"
              color="default"
            />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Entity terkait (cabang / client)</label>
            <Input v-model="form.linkedEntity" size="sm" class="w-full" />
          </div>
          <div class="space-y-1 md:col-span-2">
            <label class="text-sm font-medium">Alamat lengkap</label>
            <textarea v-model="form.address" class="input min-h-24 w-full py-2" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Latitude</label>
            <Input v-model="form.latitude" size="sm" class="w-full" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Longitude</label>
            <Input v-model="form.longitude" size="sm" class="w-full" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Radius (meter)</label>
            <Input v-model="form.radius" type="number" size="sm" class="w-full" />
          </div>
          <div class="space-y-1">
            <label class="text-sm font-medium">Attendance mode</label>
            <SelectDropdown
              v-model="form.attendanceMode"
              :options="[
                { value: 'GPS', label: 'GPS geofence' },
                { value: 'Flexible', label: 'Flexible' },
              ]"
              size="sm"
              variant="outline"
              color="default"
            />
          </div>

          <div class="space-y-2 md:col-span-2">
            <div class="flex flex-wrap items-center justify-between gap-2">
              <div class="text-sm font-medium">Pilih titik koordinat di map</div>
              <div class="flex items-center gap-2">
                <Button variant="outline" size="sm" color="default" @click="useCurrentLocation">
                  <Icon name="map-pin" class="h-4 w-4" />
                  Gunakan lokasi saya
                </Button>
                <a :href="googleMapsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">
                  Buka Google Maps
                </a>
              </div>
            </div>
            <div ref="mapContainerRef" class="h-72 w-full overflow-hidden rounded-xl border border-base-300" />
            <div class="text-xs text-base-content/70">Klik area map untuk set `latitude` dan `longitude`.</div>
            <div v-if="geolocationError" class="rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-warning-content">
              {{ geolocationError }}
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-info/30 bg-info/10 p-3 text-sm text-base-content/85">
          Lokasi dengan status <span class="font-semibold">Active</span> akan ikut muncul di mobile app saat proses clock-in.
        </div>
      </div>
      <template #footer>
        <div class="flex w-full justify-end gap-2">
          <Button variant="ghost" color="default" @click="closeModal">Batal</Button>
          <Button color="primary" :disabled="saveDisabled" @click="saveLocation">Simpan lokasi</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>
