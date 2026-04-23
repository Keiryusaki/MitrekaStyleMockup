<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from "vue";
import { Button, Card, Icon, Input, PageHeader, SelectDropdown } from "@/lib/mitreka-ui-dist/vue";
import "leaflet/dist/leaflet.css";

type AttendanceMode = "gps" | "flexible" | "disabled";

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
  attendanceMode: "gps" as AttendanceMode,
  attendanceRadius: "120",
  latitude: "-6.254561",
  longitude: "106.801883",
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

const attendanceSummary = computed(() => {
  if (form.value.attendanceMode === "disabled") return "Absensi mobile dimatikan untuk HQ.";
  if (form.value.attendanceMode === "flexible") return "Absensi bisa dilakukan dari lokasi fleksibel tanpa geofence ketat.";
  return `Absensi GPS aktif dengan radius ${form.value.attendanceRadius || "0"} meter dari titik HQ.`;
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

  const radius = Number(form.value.attendanceRadius) > 0 ? Number(form.value.attendanceRadius) : 0;

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
  () => [form.value.latitude, form.value.longitude, form.value.attendanceRadius],
  () => {
    syncMapFromForm();
  },
);

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
  () => form.value.attendanceMode,
  async (mode) => {
    if (mode !== "gps") {
      destroyMap();
      return;
    }
    await nextTick();
    await ensureMapReady();
  },
  { immediate: true, flush: "post" },
);
</script>

<template>
  <div class="flex flex-1 flex-col gap-4">
    <PageHeader
      category="Mockup HRIS Admin"
      title="Company Settings - Info"
      description="Konfigurasi data perusahaan pusat (HQ) yang menjadi referensi default untuk payroll, compliance, dan attendance location di aplikasi mobile."
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
      <div>
        <h2 class="text-lg font-semibold">HQ Attendance Point</h2>
        <p class="text-sm text-base-content/65">Dipakai sebagai lokasi absensi utama saat karyawan clock-in dari mobile app.</p>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <label class="inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-50 px-3 py-2">
          <input v-model="form.attendanceMode" value="disabled" type="radio" class="radio radio-primary radio-sm" />
          <span class="text-sm">Tidak digunakan</span>
        </label>
        <label class="inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-50 px-3 py-2">
          <input v-model="form.attendanceMode" value="flexible" type="radio" class="radio radio-primary radio-sm" />
          <span class="text-sm">Flexible location</span>
        </label>
        <label class="inline-flex items-center gap-2 rounded-xl border border-base-300 bg-base-50 px-3 py-2">
          <input v-model="form.attendanceMode" value="gps" type="radio" class="radio radio-primary radio-sm" />
          <span class="text-sm">GPS geofence</span>
        </label>
      </div>

      <div class="grid gap-4 md:grid-cols-3">
        <div class="space-y-1">
          <label class="text-sm font-medium">Radius (meter)</label>
          <Input v-model="form.attendanceRadius" size="sm" type="number" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Latitude</label>
          <Input v-model="form.latitude" size="sm" class="w-full" />
        </div>
        <div class="space-y-1">
          <label class="text-sm font-medium">Longitude</label>
          <Input v-model="form.longitude" size="sm" class="w-full" />
        </div>
      </div>

      <div class="rounded-xl border border-info/30 bg-info/10 p-3 text-sm text-base-content/85">
        <div class="font-medium">Ringkasan mobile clock-in</div>
        <div class="mt-1">{{ attendanceSummary }}</div>
      </div>

      <div class="rounded-2xl border border-base-300 bg-base-100 p-4">
        <div class="mb-2 flex flex-wrap items-center justify-between gap-2">
          <div class="text-sm font-medium">Map HQ location (interactive)</div>
          <div class="flex items-center gap-2">
            <Button variant="outline" size="sm" color="default" @click="useCurrentLocation">
              <Icon name="map-pin" class="h-4 w-4" />
              Gunakan lokasi saya
            </Button>
            <a :href="googleMapsUrl" target="_blank" rel="noopener noreferrer" class="btn btn-ghost btn-sm">Buka Google Maps</a>
          </div>
        </div>
        <div v-if="form.attendanceMode === 'gps'" ref="mapContainerRef" class="h-72 w-full overflow-hidden rounded-xl border border-base-300" />
        <div v-else class="flex h-52 items-center justify-center rounded-xl border border-dashed border-base-300 bg-base-50 text-sm text-base-content/60">
          Aktifkan mode GPS geofence untuk menggunakan map koordinat.
        </div>
        <div class="mt-2 text-xs text-base-content/70">Klik area map untuk set `latitude` dan `longitude` HQ.</div>
        <div v-if="geolocationError" class="mt-2 rounded-lg border border-warning/40 bg-warning/10 px-3 py-2 text-xs text-warning-content">
          {{ geolocationError }}
        </div>
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
