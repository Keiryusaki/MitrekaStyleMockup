import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");
const downloadsDir = path.join(rootDir, "public", "downloads");
const manifestPath = path.join(downloadsDir, "starter-pack.json");

const STARTER_PACK_RE = /^mitreka-design-system-starter-pack-v(\d+)\.(\d+)\.(\d+)\.zip$/;

function compareSemverDesc(a, b) {
  for (let i = 0; i < 3; i += 1) {
    if (a.version[i] !== b.version[i]) return b.version[i] - a.version[i];
  }
  return a.name.localeCompare(b.name);
}

async function main() {
  const entries = await fs.readdir(downloadsDir, { withFileTypes: true });
  const candidates = entries
    .filter((entry) => entry.isFile())
    .map((entry) => {
      const match = entry.name.match(STARTER_PACK_RE);
      if (!match) return null;
      return {
        name: entry.name,
        version: [Number(match[1]), Number(match[2]), Number(match[3])],
      };
    })
    .filter(Boolean)
    .sort(compareSemverDesc);

  if (candidates.length === 0) {
    throw new Error(
      `No starter pack zip found in ${downloadsDir}. Expected format: mitreka-design-system-starter-pack-vX.Y.Z.zip`
    );
  }

  const latest = candidates[0];
  const manifest = {
    latest: latest.name,
    version: latest.version.join("."),
    generatedAt: new Date().toISOString(),
  };

  await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, "utf8");
  console.log(`Starter pack manifest updated: ${manifest.latest}`);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
