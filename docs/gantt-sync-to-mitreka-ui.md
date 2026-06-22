# Handoff: Sync Komponen Gantt → mitreka-ui

Catatan eksekusi untuk porting `GanttChart` dari DS source (MitrekaStyleMockup) ke package
`mitreka-ui` (v2.2.50). Dipakai untuk alur Codex (step 2–7 SOP di `catatan`).

## Tujuan & scope
- **Port**: seluruh isi `src/components/gantt/` **KECUALI `demo/`**.
  - `demo/ganttData.ts` (+ shift real-time) adalah data contoh mockup-only — **jangan** ikut ke package.
  - Halaman docs `src/pages/Gantt/Gantt.vue` juga **tidak** ikut (live-docs only).
- Komponen sudah self-contained. Satu-satunya friksi = rewire import (tabel di bawah).

## 1. Copy file (source → target)
Source: `MitrekaStyleMockup/src/components/gantt/`
Target: `mitreka-ui/src/vue/gantt/`

```
gantt/
  index.ts                 (copy apa adanya — semua export relatif, aman)
  GanttChart.vue           (REWIRE import, lihat tabel)
  types.ts                 (copy apa adanya)
  utils.ts                 (copy apa adanya)
  components/
    GanttHeader.vue        (REWIRE)
    GanttTaskRow.vue       (REWIRE)
    GanttTimeline.vue      (copy apa adanya)
    GanttDependencyLines.vue (copy apa adanya)
  composables/
    useGanttState.ts       (copy apa adanya)
```
> Jangan copy folder `demo/`.

## 2. Rewire import (5 baris, 3 file)
Hanya ada 2 alias eksternal: `@/composables/Icon` dan `@/lib/mitreka-ui-dist/vue`.
Di mitreka-ui keduanya jadi **sibling default-export SFC** di `src/vue/`, jadi:
**named import → default import** (hapus kurung kurawal) + path relatif.

| File (di target) | Sebelum | Sesudah |
|---|---|---|
| `gantt/GanttChart.vue:3` | `import { Icon } from "@/composables/Icon";` | `import Icon from "../Icon.vue";` |
| `gantt/GanttChart.vue:4` | `import { Modal, Button, SelectDropdown, SelectInput, DateTimePicker, Input, Avatar } from "@/lib/mitreka-ui-dist/vue";` | 7 baris default import dari `../` (lihat di bawah) |
| `gantt/components/GanttHeader.vue:3` | `import { Icon } from "@/composables/Icon";` | `import Icon from "../../Icon.vue";` |
| `gantt/components/GanttTaskRow.vue:2` | `import { Icon } from "@/composables/Icon";` | `import Icon from "../../Icon.vue";` |
| `gantt/components/GanttTaskRow.vue:3` | `import { Tooltip } from "@/lib/mitreka-ui-dist/vue";` | `import Tooltip from "../../Tooltip.vue";` |

Pengganti untuk `GanttChart.vue:4`:
```ts
import Modal from "../Modal.vue";
import Button from "../Button.vue";
import SelectDropdown from "../SelectDropdown.vue";
import SelectInput from "../SelectInput.vue";
import DateTimePicker from "../DateTimePicker.vue";
import Input from "../Input.vue";
import Avatar from "../Avatar.vue";
```
> Catatan path: file di `gantt/` naik **1 level** (`../`); file di `gantt/components/` naik **2 level** (`../../`). Semua target SFC (`Icon.vue`, `Modal.vue`, dst.) sudah ada di `mitreka-ui/src/vue/`.
> Tidak ada alias `@/` lain di folder gantt — sisanya `import ... from "vue"` dan relatif `./`, biarkan apa adanya.

## 3. Tambah ke barrel `mitreka-ui/src/vue/index.ts`
`gantt/index.ts` sudah mengekspor komponen + types + composable + util secara relatif, jadi cukup:
```ts
export * from "./gantt";
```
> Cek tabrakan nama saat build (mis. type generik). Tipe Gantt cukup spesifik, tapi kalau ada bentrok, ganti `export *` jadi named export eksplisit (`GanttChart`, `useGanttState`, `GanttTask`, `GanttEmployee`, `GanttChangeEvent`, `GanttValidation`, `ViewMode`, util-util).

## 4. CSS
- Style komponen Gantt **scoped di dalam SFC** (termasuk selector dark mode `:global(.dark)` / `[data-theme="mitrekadark"]`) → ikut komponen, **tidak perlu** full-sync `tailwind.css → mockup.css`.
- Class `.gantt-mode-switch` / `.gantt-mode-button` ada di halaman demo (mockup), **bukan** di komponen — tidak ikut.
- Verifikasi: komponen tetap memakai utility Tailwind + token DS (`var(--color-*)`) yang sudah ada di base CSS package. Pastikan dark mode tetap benar setelah build.

## 5. Versi, build, publish (step 3 SOP)
- Bump `mitreka-ui/package.json`: **2.2.50 → 2.3.0** (komponen baru = minor).
- `npm run build` → cek output `dist/vue/` (termasuk `GanttChart` + `gantt/*.d.ts`).
- Publish channel **beta** dulu: `npm publish --tag beta` (JANGAN langsung `latest`).

## 6. Test consumer (step 4 SOP)
- Install beta di `mitreka-consumer-test-ds`: `npm i @keiryusaki/mitreka-ui@beta`.
- Render `<GanttChart v-model:tasks=... :employees=... />`, cek interaksi (drag/resize, view modes, validasi, dark mode).

## 7. Sync balik ke mockup + switch import (step 4–5 SOP)
- Copy `mitreka-ui/dist/css` → `MitrekaStyleMockup/src/lib/mitreka-ui`.
- Copy `mitreka-ui/dist` → `MitrekaStyleMockup/src/lib/mitreka-ui-dist`.
- Ubah import Gantt di mockup dari source lokal ke package vendor dist:
  - `src/pages/Mockup/GanttWbsPlanner.vue` dan `src/pages/Gantt/Gantt.vue`:
    `import { GanttChart } from "@/components/gantt"` → `from "@/lib/mitreka-ui-dist/vue"`.
  - Tipe (`GanttTask`, dll) juga dari `@/lib/mitreka-ui-dist/vue`.
  - `demo/ganttData.ts` tetap lokal (data contoh mockup).
  - Setelah switch, `src/components/gantt/` lokal bisa dihapus (pakai SOP soft-delete) atau dibiarkan sebagai referensi — keputusan terpisah.
- Promote ke `latest` setelah QA lolos; cek konsistensi versi (package, app, what's new, changelog).

## Verifikasi akhir
- [ ] Build mitreka-ui sukses, `dist/vue` berisi GanttChart + d.ts.
- [ ] Consumer test render & interaksi OK (light + dark).
- [ ] Mockup pakai versi package (bukan source lokal) dan masih jalan.
- [ ] Versi sinkron lintas area; changelog (kalau mau diumumkan) di-update.
