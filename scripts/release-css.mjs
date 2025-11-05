// node >=18
import {
  mkdirSync,
  cpSync,
  readFileSync,
  writeFileSync,
  existsSync,
} from "node:fs";
import { resolve } from "node:path";
import process from "node:process";

/**
 * Usage:
 *   pnpm release:css 1.1.0
 *   // atau tanpa argumen → ambil version dari package.json
 */
const argVer = process.argv[2];
const pkg = JSON.parse(readFileSync(resolve("package.json"), "utf8"));
const version = argVer || pkg.version;
if (!version) {
  console.error(
    '❌ Tidak ada versi. Kasih argumen (e.g. 1.1.0) atau set "version" di package.json.'
  );
  process.exit(1);
}

const SRC = resolve("src/assets/tailwind.css");
const OUT_DIR = resolve("public/releases/tailwind");
const OUT_FILE = resolve(OUT_DIR, `tailwind-${version}.css`);
const OUT_LATEST = resolve(OUT_DIR, "latest.css");

// 1) pastikan folder ada
mkdirSync(OUT_DIR, { recursive: true });

// 2) copy file aktif → versi & latest
cpSync(SRC, OUT_FILE);
cpSync(SRC, OUT_LATEST);
console.log(`✓ Copied tailwind.css → ${OUT_FILE}`);
console.log(`✓ Updated latest.css`);

// 3) sisipkan link asset ke changelog.json (kalau ada)
const CHANGELOG_PATH = resolve("src/pages/Changelog/changelog.json");
if (existsSync(CHANGELOG_PATH)) {
  const json = JSON.parse(readFileSync(CHANGELOG_PATH, "utf8"));
  if (!Array.isArray(json) || json.length === 0) {
    console.warn(
      "! changelog.json kosong atau bukan array; skip inject asset."
    );
  } else {
    // cari entry versi yang sama; kalau tidak ada → inject ke rilis pertama (terbaru)
    const href = `/releases/tailwind/tailwind-${version}.css`;
    const assetObj = { name: `tailwind.css (${version})`, href };
    const idx = json.findIndex((r) => r.version === version);
    if (idx >= 0) {
      json[idx].assets = [...(json[idx].assets || []), assetObj];
      console.log(`✓ Inject asset ke rilis v${version}`);
    } else {
      json[0].assets = [...(json[0].assets || []), assetObj];
      console.log(
        `! Rilis v${version} tidak ditemukan → disisipkan ke rilis pertama`
      );
    }
    writeFileSync(CHANGELOG_PATH, JSON.stringify(json, null, 2));
  }
} else {
  console.warn(
    "! src/pages/Changelog/changelog.json tidak ditemukan; skip inject asset."
  );
}

console.log("🎉 Done.");
