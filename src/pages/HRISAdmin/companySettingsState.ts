import { ref } from "vue";

export type OfficeType = "HQ" | "Branch" | "Client Site";
export type AttendanceMode = "GPS" | "Flexible";
export type OfficeStatus = "Active" | "Inactive";

export type OfficeLocation = {
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

export const officeLocations = ref<OfficeLocation[]>([
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
