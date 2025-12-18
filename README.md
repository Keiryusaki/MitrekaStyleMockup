# Mitreka Style Mockup

Demo & development environment untuk **Mitreka Design System**. Project ini digunakan untuk:
- Preview dan test komponen UI
- Develop style baru sebelum di-publish ke `@keiryusaki/mitreka-ui`
- Showcase design system untuk developer

**Live Demo:** https://keiryusaki.github.io/MitrekaStyleMockup/

## Quick Start

```bash
npm install
npm run dev
```

## Project Structure

```
MitrekaStyleMockup/
├── src/
│   ├── assets/
│   │   └── tailwind.css      # Main CSS (theme variables, custom styles)
│   ├── components/           # Demo components
│   ├── views/                # Demo pages
│   └── App.vue
├── public/
│   └── releases/             # Released CSS versions
├── scripts/
│   └── release-css.ps1       # Script untuk release CSS
└── package.json
```

## Workflow: Update Design System

### 1. Edit Style di Mockup

Edit file style di `src/assets/tailwind.css`:

```css
/* Contoh: tambah variant button baru */
.btn-gradient {
  @apply bg-gradient-to-r from-primary to-accent text-white;
}
```

Test di browser dengan `npm run dev`.

### 2. Copy Style ke mitreka-ui

Setelah style sudah fix, copy ke `mitreka-ui`:

```
MitrekaStyleMockup/src/assets/    →    mitreka-ui/src/css/
```

Mapping file:
| Mockup | mitreka-ui |
|--------|------------|
| `tailwind.css` (base section) | `src/css/base.css` |
| Button styles | `src/css/components/button.css` |
| Input styles | `src/css/components/input.css` |
| dll. | `src/css/components/*.css` |

### 3. Publish mitreka-ui

```bash
cd ../mitreka-ui

# 1. Bump version di package.json
# 2. Build
npm run build

# 3. Commit & push
git add -A
git commit -m "feat: add new button variant"
git push

# 4. Buat release di GitHub untuk trigger auto-publish
# Buka: https://github.com/Keiryusaki/mitreka-ui/releases/new
# Tag: v1.0.1 (sesuai version baru)
```

### 4. Update di Consumer Apps

```bash
npm update @keiryusaki/mitreka-ui
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build untuk production |
| `npm run preview` | Preview production build |
| `npm run type-check` | TypeScript type checking |
| `npm run release:css` | Release CSS ke folder public |

### Release CSS (Optional)

Untuk release CSS sebagai standalone file:

```powershell
npm run release:css           # Default v1.0.0
# atau
.\scripts\release-css.ps1 1.2.0
```

Output: `public/releases/tailwind/tailwind-{version}.css`

## Dependencies

- **@keiryusaki/mitreka-ui** - Mitreka UI component library (dari GitHub Packages)
- **Vue 3** - Framework
- **Tailwind CSS v4** - Utility-first CSS
- **AG Grid** - Data grid

## GitHub Packages Setup

Project ini menggunakan `@keiryusaki/mitreka-ui` dari GitHub Packages.

### Untuk development lokal:

1. Buat Personal Access Token di https://github.com/settings/tokens
   - Scope: `read:packages`

2. Setup global `.npmrc`:
```
@keiryusaki:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=YOUR_TOKEN_HERE
```

3. Install dependencies:
```bash
npm install
```

### CI/CD (GitHub Actions)

Sudah di-setup otomatis di `.github/workflows/deploy.yml` menggunakan `GITHUB_TOKEN`.

## License

MIT
