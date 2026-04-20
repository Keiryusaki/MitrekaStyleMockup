# Catatan Konsistensi Live Attendance (Internal)

## Tujuan
- Menjaga konsistensi tampilan dan interaksi halaman Live Attendance di `HRISAdmin`.
- Menjadi referensi cepat saat ganti sesi kerja atau handover.

## Scope File Utama
- `src/pages/HRISAdmin/LiveAttendance.vue`
- `src/features/hris-admin/live-attendance/useLiveAttendance.ts`
- `src/features/hris-admin/live-attendance/components/tabs/*`
- `src/features/hris-admin/live-attendance/components/panels/*`

## Visual Language (Jangan Diubah Tanpa Alasan Jelas)
- Warna utama: biru brand `#004b8d` + netral slate.
- Gaya komponen: card putih, border halus, shadow lembut, radius besar (`rounded-2xl` dan sejenisnya).
- Tipografi mobile: dominan ukuran kecil padat (`text-[10px]` s.d `text-[13px]`) dengan `font-bold`/`font-black`.
- Header tab mobile konsisten: tinggi `56px`, latar biru brand, tombol back kiri, judul center.

## Layout dan Interaksi Utama
- Simulasi mobile frame adalah baseline (normal + fullscreen), bukan layout desktop.
- Navigasi bawah (4 tab) + FAB request di tengah adalah pola utama.
- Overlay mengikuti pola existing:
  - Bottom sheet request
  - Full-screen form/screen (mis. time off, calendar)
  - Drawer/panel log dan detail
- Semua overlay yang bisa drag harus konsisten:
  - `touch-action: none` di drag zone
  - Threshold close sekitar `>120px`
  - Reset state drag setiap close/open ulang
- Animasi tetap ringan dan konsisten (`slide/fade`, durasi pendek, tanpa animasi berlebihan).

## Aturan Implementasi
- Untuk fitur baru di Live Attendance:
  - Prioritaskan reuse pola card/list/button yang sudah ada.
  - Hindari memperkenalkan komponen visual "desktop style" ke alur mobile.
  - Jika tambah state overlay baru, ikuti naming dan flow state existing (`showX`, `openX`, `closeX`).
- Business logic tetap dipusatkan di composable `useLiveAttendance` bila relevan.
- Jangan ubah style token/global bila kebutuhan hanya lokal halaman ini.

## Do / Dont
- Do:
  - Pakai spacing ritmis yang sudah dipakai (`px-3/4/5`, `py-2/3/4`).
  - Jaga konsistensi ikon dan tone warna status (success/warning/error).
  - Cek perilaku di mode fullscreen dan non-fullscreen.
- Dont:
  - Jangan ganti tone warna utama tanpa instruksi eksplisit.
  - Jangan patch interaksi drag sebagian (setengah flow).
  - Jangan campur pattern modal desktop ke tab mobile.

## Checklist Review Cepat (Sebelum Commit)
1. Header/tab/nav bawah masih konsisten dengan pola live attendance.
2. Card radius, border, shadow, dan ukuran teks tidak "loncat gaya".
3. Overlay baru/lama bisa buka-tutup normal (click, escape, drag jika ada).
4. Fullscreen mode tetap rapi (z-index, spacing, tombol keluar).
5. Tidak ada state bentrok antar panel/form/screen.

## Ritual Awal Sesi (Khusus Live Attendance)
1. Baca file ini dulu.
2. Review cepat `LiveAttendance.vue` + `useLiveAttendance.ts`.
3. Konfirmasi perubahan yang diminta: visual saja, interaksi saja, atau logic + visual.
