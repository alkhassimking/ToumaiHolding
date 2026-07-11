const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const sourceCandidates = [
  path.join(publicDir, "logos", "Favicon.png"),
  path.join(publicDir, "logos", "Toumai Holding.png"),
  path.join(root, "src", "app", "apple-icon.png"),
];

const source = sourceCandidates.find((p) => fs.existsSync(p));
if (!source) {
  console.error("No source logo found");
  process.exit(1);
}

async function squarePng(size, outPath, { padding = 0.12, bg = "#050505" } = {}) {
  const canvas = sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: bg,
    },
  });

  const inner = Math.round(size * (1 - padding * 2));
  const logo = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();

  const left = Math.round((size - inner) / 2);
  await canvas
    .composite([{ input: logo, left, top: left }])
    .png({ compressionLevel: 9, quality: 90 })
    .toFile(outPath);
}

async function main() {
  const jobs = [
    [16, "favicon-16x16.png"],
    [32, "favicon-32x32.png"],
    [48, "favicon-48x48.png"],
    [64, "favicon-64x64.png"],
    [180, "apple-touch-icon.png"],
    [192, "android-chrome-192x192.png"],
    [512, "android-chrome-512x512.png"],
    [512, "logo.png"],
    [512, path.join("logos", "toumai-holding-logo.png")],
  ];

  for (const [size, name] of jobs) {
    const out = path.isAbsolute(name) ? name : path.join(publicDir, name);
    await fs.promises.mkdir(path.dirname(out), { recursive: true });
    await squarePng(size, out);
    console.log("wrote", path.relative(root, out));
  }

  // Maskable: more padding for safe zone
  await squarePng(512, path.join(publicDir, "maskable-icon-512.png"), {
    padding: 0.22,
  });
  console.log("wrote public/maskable-icon-512.png");

  // Clean logo for Google (white-ish safe square)
  await squarePng(512, path.join(publicDir, "logo.png"), { padding: 0.1 });

  // Multi-resolution ICO from 16/32/48
  const png16 = await sharp(path.join(publicDir, "favicon-16x16.png")).png().toBuffer();
  const png32 = await sharp(path.join(publicDir, "favicon-32x32.png")).png().toBuffer();
  const png48 = await sharp(path.join(publicDir, "favicon-48x48.png")).png().toBuffer();

  // Prefer a high-quality 32px ICO fallback (widely supported)
  await sharp(png32).resize(32, 32).toFile(path.join(publicDir, "favicon.ico"));
  console.log("wrote public/favicon.ico");

  // App router icons
  await sharp(path.join(publicDir, "apple-touch-icon.png"))
    .png()
    .toFile(path.join(root, "src", "app", "apple-icon.png"));
  await sharp(path.join(publicDir, "android-chrome-192x192.png"))
    .png()
    .toFile(path.join(root, "src", "app", "icon.png"));
  console.log("wrote src/app icons");

  // Standalone favicon SVG (no external image dependency)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" role="img" aria-label="Toumai Holding">
  <rect width="100" height="100" rx="18" fill="#050505"/>
  <image href="/logos/Favicon.png" x="12" y="12" width="76" height="76" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  await fs.promises.writeFile(path.join(publicDir, "favicon.svg"), svg);
  console.log("done from", path.relative(root, source));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
