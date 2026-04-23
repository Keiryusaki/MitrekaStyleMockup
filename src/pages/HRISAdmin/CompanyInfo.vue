<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { Button, Card, Icon, Input, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import { officeLocations } from "./companySettingsState";
import "leaflet/dist/leaflet.css";

const form = ref({
  companyName: "PT Mitreka Solusi Indonesia",
  hqInitial: "PUSAT",
  hqCode: "HQ-01",
  useBranchName: false,
  umkValue: "5.396.761",
  umkProvince: "DKI Jakarta",
  umkCity: "Jakarta Selatan",
  bpjsKetenagakerjaan: "15045254",
  jkkRate: "0.24%",
  kluCode: "62020",
  npwp: "12.345.678.9-101.112",
});

const provinceOptions = [
  { value: "DKI Jakarta", label: "DKI Jakarta" },
  { value: "Jawa Barat", label: "Jawa Barat" },
  { value: "Jawa Timur", label: "Jawa Timur" },
];

const cityByProvince: Record<string, Array<{ value: string; label: string }>> = {
  "DKI Jakarta": [
    { value: "Jakarta Selatan", label: "Jakarta Selatan" },
    { value: "Jakarta Pusat", label: "Jakarta Pusat" },
    { value: "Jakarta Barat", label: "Jakarta Barat" },
  ],
  "Jawa Barat": [
    { value: "Bandung", label: "Bandung" },
    { value: "Bekasi", label: "Bekasi" },
  ],
  "Jawa Timur": [
    { value: "Surabaya", label: "Surabaya" },
    { value: "Sidoarjo", label: "Sidoarjo" },
  ],
};

const cityOptions = computed(() => cityByProvince[form.value.umkProvince] ?? []);

const hqLocations = computed(() => officeLocations.value.filter((item) => item.type === "HQ"));
const activeHq = computed(() => hqLocations.value.find((item) => item.status === "Active") ?? hqLocations.value[0] ?? null);

const attendanceSummary = computed(() => {
  if (!activeHq.value) return "Belum ada HQ di master Office Locations.";
  if (activeHq.value.attendanceMode === "Flexible") return "Absensi bisa dilakukan dari lokasi fleksibel tanpa geofence ketat.";
  return `Absensi GPS aktif dengan radius ${activeHq.value.radius || 0} meter dari titik HQ.`;
});

const parseCoord = (value: string): number | null => {
  if (!value?.trim()) return null;
  const parsed = Number(value.replace(",", "."));
  return Number.isFinite(parsed) ? parsed : null;
};

const validLatLng = computed(() => {
  if (!activeHq.value) return null;
  const lat = parseCoord(activeHq.value.latitude);
  const lng = parseCoord(activeHq.value.longitude);
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
let leafletLib: any = null;
let leafletMap: any = null;
let markerLayer: any = null;
let radiusLayer: any = null;

const updateMapLayers = (coords: { lat: number; lng: number }) => {
  if (!leafletMap || !leafletLib || !activeHq.value) return;

  const radius = Number(activeHq.value.radius) > 0 ? Number(activeHq.value.radius) : 0;

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

const syncMapFromHq = () => {
  const coords = validLatLng.value;
  if (!leafletMap || !coords) return;
  updateMapLayers(coords);
  leafletMap.setView([coords.lat, coords.lng], Math.max(leafletMap.getZoom() ?? 15, 15));
};

const ensureMapReady = async () => {
  if (!mapContainerRef.value || !activeHq.value) return;
  if (!leafletLib) {
    leafletLib = await import("leaflet");
  }

  if (leafletMap) {
    leafletMap.invalidateSize();
    syncMapFromHq();
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

onBeforeUnmount(() => {
  destroyMap();
});

const saveLabel = ref("Simpan perubahan");
const handleSave = () => {
  saveLabel.value = "Tersimpan";
  window.setTimeout(() => {
    saveLabel.value = "Simpan perubahan";
  }, 1400);
};

watch(
  () => [activeHq.value?.id, activeHq.value?.latitude, activeHq.value?.longitude, activeHq.value?.radius, activeHq.value?.attendanceMode],
  async () => {
    if (!activeHq.value || activeHq.value.attendanceMode !== "GPS") {
      destroyMap();
      return;
    }
    await nextTick();
    await ensureMapReady();
    syncMapFromHq();
  },
  { immediate: true, flush: "post" },
);
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Admin"
      title="Company Settings - Info"
      description="Konfigurasi data perusahaan pusat (HQ) untuk payroll dan compliance. Titik absensi HQ mengikuti master Office Locations agar tidak terjadi duplikasi setting."
    />

    <Card padding="p-5" class="space-y-5">
      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium">Nama perusahaan</label>
          <Input v-model="form.companyName" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">HQ initial</label>
          <Input v-model="form.hqInitial" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">HQ code</label>
          <Input v-model="form.hqCode" size="sm" class="w-full" />
        </div>
      </div>

      <label class="inline-flex items-center gap-2 text-sm">
        <input v-model="form.useBranchName" type="checkbox" class="checkbox checkbox-sm" />
        Gunakan nama cabang pada slip/label karyawan
      </label>
    </Card>

    <Card padding="p-5" class="space-y-5">
      <div>
        <h2 class="text-lg font-semibold">Payroll & Tax Baseline</h2>
        <p class="text-sm text-base-content/65">Data baseline untuk default payroll di HQ.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">UMK / UMR</label>
          <Input v-model="form.umkValue" size="sm" mask="currency-idr" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">BPJS Ketenagakerjaan</label>
          <Input v-model="form.bpjsKetenagakerjaan" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Provinsi UMK</label>
          <SelectDropdown v-model="form.umkProvince" :options="provinceOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Kota UMK</label>
          <SelectDropdown v-model="form.umkCity" :options="cityOptions" size="sm" variant="outline" color="default" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">JKK rate</label>
          <Input v-model="form.jkkRate" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Kode KLU</label>
          <Input v-model="form.kluCode" size="sm" class="w-full" />
        </div>
        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium">NPWP perusahaan</label>
          <Input v-model="form.npwp" size="sm" mask="npwp" class="w-full" />
        </div>
      </div>
    </Card>

    <Card padding="p-5" class="space-y-5">
      <div class="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 class="text-lg font-semibold">HQ Attendance Point</h2>
          <p class="text-sm text-base-content/65">Sumber data diambil dari master Office Locations untuk mencegah duplikasi HQ.</p>
        </div>
        <RouterLink to="/mockup-hris-admin/company-settings/locations" class="btn btn-outline btn-sm">
          Kelola di Office Locations
        </RouterLink>
      </div>

      <div v-if="hqLocations.length" class="grid gap-4 md:grid-cols-2">
        <div class="space-y-1">
          <label class="text-sm font-medium">HQ aktif</label>
          <Input :model-value="activeHq?.name || '-'" size="sm" class="w-full" disabled />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Entity</label>
          <Input :model-value="activeHq?.linkedEntity || '-'" size="sm" class="w-full" disabled />
        </div>
        <div class="space-y-1 md:col-span-2">
          <label class="text-sm font-medium">Alamat HQ</label>
          <Input :model-value="activeHq?.address || '-'" size="sm" class="w-full" disabled />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Mode attendance</label>
          <Input :model-value="activeHq?.attendanceMode || '-'" size="sm" class="w-full" disabled />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Radius (meter)</label>
          <Input :model-value="String(activeHq?.radius ?? '-')" size="sm" class="w-full" disabled />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Latitude</label>
          <Input :model-value="activeHq?.latitude || '-'" size="sm" class="w-full" disabled />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Longitude</label>
          <Input :model-value="activeHq?.longitude || '-'" size="sm" class="w-full" disabled />
        </div>
        <div class="rounded-xl border border-base-300 bg-base-100 p-3 text-sm text-base-content/85 md:col-span-2">
          Total HQ tersimpan: <span class="font-semibold">{{ hqLocations.length }}</span>. Detail yang ditampilkan adalah HQ dengan status
          <span class="font-semibold">Active</span>.
        </div>
      </div>

      <div v-else class="rounded-xl border border-warning/40 bg-warning/10 p-4 text-sm text-base-content">
        Belum ada data HQ di Office Locations. Tambahkan lokasi dengan tipe <span class="font-semibold">HQ</span> terlebih dulu.
      </div>

      <div class="rounded-xl border border-info/30 bg-info/10 p-3 text-sm text-base-content/85">
        <div class="font-medium">Ringkasan mobile clock-in</div>
        <div class="mt-1">{{ attendanceSummary }}</div>
      </div>

      <div class="rounded-2xl border border-base-300 bg-base-100 p-4">
        <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div class="text-sm font-medium">Map HQ location (sinkron dari Office Locations)</div>
          <a :href="googleMapsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Buka Google Maps</a>
        </div>
        <div
          v-if="activeHq && activeHq.attendanceMode === 'GPS'"
          ref="mapContainerRef"
          class="h-72 w-full overflow-hidden rounded-xl border border-base-300"
        />
        <div v-else class="flex h-52 items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-50 text-sm text-base-content/60">
          Pilih HQ mode GPS geofence di halaman Office Locations untuk menampilkan map.
        </div>
        <div class="mt-2 text-xs text-base-content/70">Map di halaman ini read-only. Perubahan titik dilakukan dari menu Office Locations.</div>
      </div>

      <div class="flex justify-end">
        <Button color="primary" @click="handleSave">
          <Icon name="check" class="h-4 w-4" />
          {{ saveLabel }}
        </Button>
      </div>
    </Card>
  </div>
</template>
