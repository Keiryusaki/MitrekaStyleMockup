# Changelog - 29 Desember 2025

## 1. Help Friend dengan Bun Install Error
- Temen user clone project, error pas `bun install` karena ga bisa akses `@keiryusaki/mitreka-ui` dari GitHub Package Registry
- Solusi: Kasih guide setup `.npmrc` dengan GitHub token

---

## 2. Komponen Collapse (Baru)
- **Collapse.vue** - Halaman dokumentasi collapse
- Versi CSS-only dan Vue Component
- Variasi: default, with border, with background
- Bisa controlled (programmatic open/close)
- **Fix CSS Bug**: `.collapse { visibility: collapse; }` dari CSS utility bikin konten invisible → di-rename jadi class lain

---

## 3. Komponen Accordion (Baru)
- **Accordion.vue** - Halaman dokumentasi accordion
- Behavior: buka satu = tutup yang lain
- Variasi: default, bordered, dengan icon

---

## 4. Card Update
- Tambah variasi expand/collapse di Card.vue
- Card bisa di-toggle buka/tutup body-nya

---

## 5. Global Search di Sidebar
- Input search di atas menu Dashboard
- Filter menu berdasarkan keyword
- Realtime search saat typing

---

## 6. FloatingTOC (Table of Contents)
**Komponen baru** - navigasi floating di sisi kanan layar:
- Toggle dengan tombol `?`
- List section dari halaman
- Scroll smooth ke section yang diklik
- Dismiss klik di luar
- Posisi di atas tombol Live Chat

**Halaman yang ditambahkan FloatingTOC:**

| Halaman | Jumlah Section |
|---------|----------------|
| Buttons.vue | 6 |
| Input.vue | 5 |
| SelectOption.vue | 7 |
| Badge.vue | 6 |
| Toasts.vue | 12 |
| DataTable.vue | 11 |
| Collapse.vue | 8 |
| Accordion.vue | 8 |
| Colors.vue | 6 |
| Typography.vue | 7 |

---

## 7. Update DevGuide Page
- Tambah section Collapse & Accordion
- Fix Collapse/Accordion ga bekerja (perlu ref dan toggle function)

---

## 8. Fix Scroll Position saat Navigasi
**Problem:** Pindah halaman, posisi scroll tetap di bawah

**Solution:**
1. `router/index.ts` - Tambah `scrollBehavior` 
2. `AppLayout.vue` - Watch `route.path`, scroll `<main>` ke atas (karena yang scroll bukan window, tapi `<main>` container)

---

## Files yang Diubah/Dibuat

### File Baru:
- `src/pages/Collapse/Collapse.vue`
- `src/pages/Accordion/Accordion.vue`
- `src/components/nav/FloatingTOC.vue`

### File Update:
- `src/pages/Card/Card.vue` (expand/collapse variation)
- `src/pages/DevGuide/DevGuide.vue` (Collapse & Accordion section)
- `src/components/nav/Sidebar.vue` (global search)
- `src/router/index.ts` (scrollBehavior + routes)
- `src/layouts/AppLayout.vue` (scroll fix)

### Halaman dengan FloatingTOC + Section IDs:
- `src/pages/Buttons/Buttons.vue`
- `src/pages/Input/Input.vue`
- `src/pages/SelectOption/SelectOption.vue`
- `src/pages/Badge/Badge.vue`
- `src/pages/Toasts/Toasts.vue`
- `src/pages/DataTable/DataTable.vue`
- `src/pages/Collapse/Collapse.vue`
- `src/pages/Accordion/Accordion.vue`
- `src/pages/Colors/Colors.vue`
- `src/pages/Typography/Typography.vue`
