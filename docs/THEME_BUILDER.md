# Theme Builder Documentation

Dokumen ini menjelaskan cara kerja `Theme Builder` di Design System Mitreka dan cara implementasi hasil temanya di aplikasi consumer.

## Scope

- `Theme Builder` adalah **tool internal** di Design System.
- `Theme Builder` **bukan komponen** yang perlu dipasang di aplikasi consumer.
- Yang dikonsumsi developer aplikasi adalah:
  - token/theme CSS hasil generate,
  - preset tema dari code (jika disediakan tim DS),
  - mode theme (`Light | System | Dark`).

## Konsep Utama

Theme disusun per mode:

- `:root[data-theme="mitrekalight"]`
- `:root[data-theme="mitrekadark"]`

Token yang diatur:

1. State Colors
- `--color-primary`, `--color-secondary`, `--color-accent`, `--color-info`, `--color-success`, `--color-warning`, `--color-error`, `--color-neutral`

2. Base Colors
- `--color-base-100`, `--color-base-200`, `--color-base-300`, `--color-base-content`

3. Layout Colors
- `--color-layout-topbar-bg`, `--color-layout-topbar-text`
- `--color-layout-sidebar-bg`, `--color-layout-sidebar-text`

4. Sidebar Decoration
- `--color-sidebar-hover-bg`, `--color-sidebar-active-bg`
- `--color-sidebar-active-text`, `--color-sidebar-active-border`
- `--color-sidebar-open-bg`, `--color-sidebar-open-text`
- `--color-sidebar-active-mark`

5. Link Colors
- `--color-link`, `--color-link-hover`, `--color-link-visited`

6. Radius
- `--radius-field-xs`, `--radius-field-sm`, `--radius-field-md`, `--radius-field-lg`, `--radius-field-xl`
- `--radius-box`

## Alur Kerja Theme Builder

1. Atur token di halaman `Theme Builder` (Light dan Dark).
2. Simpan sebagai preset internal bila perlu.
3. Klik `Copy Preset` untuk mendapatkan CSS final.
4. Review hasil visual di halaman komponen utama (Button, Input, Card, Sidebar, Topbar).
5. Serahkan CSS final ke tim developer aplikasi consumer.

## Preset dari Code

Preset resmi dari code disimpan di:

- `src/composables/codeThemePresets.ts`

Contoh preset saat ini:

- `SalesFlow` (`id: "salesflow"`)

Catatan:

- Preset code dipakai sebagai baseline resmi dari tim DS.
- Preset lokal dari builder (localStorage) hanya untuk proses eksplorasi/internal.

## Dampak ke Consumer App Lama

Jika consumer app tidak menerapkan override theme baru, tampilan existing tetap mengikuti default design system.

Perubahan visual terjadi ketika:

- developer mengaktifkan preset baru, atau
- developer menempelkan CSS hasil generate dari builder.

Risiko umum:

- komponen yang hardcoded warna/radius (tidak pakai token var) akan terlihat tidak sinkron.

## Implementasi di Aplikasi Consumer

1. Pastikan app sudah memakai CSS design system terbaru.
2. Tambahkan CSS preset (light + dark) ke stylesheet global app.
3. Pastikan switching `data-theme` berjalan:
- `mitrekalight` untuk light mode,
- `mitrekadark` untuk dark mode.
4. Uji visual minimal:
- Topbar + Sidebar,
- Button / Input / Card,
- Link states,
- komponen dengan ukuran field `xs/sm/md/lg/xl`.

## Rekomendasi Release

1. Finalisasi preset di DS (nama + token freeze).
2. QA visual di mockup dan 1 consumer app contoh.
3. Publish update DS.
4. Tim consumer tinggal mengadopsi CSS preset + mode switch.

## Do / Don't

Do:
- Gunakan token CSS var untuk warna/radius.
- Pisahkan konfigurasi light dan dark.
- Gunakan preset code untuk tema resmi lintas produk.

Don't:
- Hardcode warna/radius langsung di komponen aplikasi.
- Menjadikan `Theme Builder` sebagai dependency runtime di consumer app.
