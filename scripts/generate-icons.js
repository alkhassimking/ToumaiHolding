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
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const left = Math.round((size - inner) / 2);
  await canvas
    .composite([{ input: logo, left, top: left }])
    .png({ compressionLevel: 9 })
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

  await squarePng(512, path.join(publicDir, "maskable-icon-512.png"), {
    padding: 0.22,
  });

  const png32 = await sharp(path.join(publicDir, "favicon-32x32.png"))
    .png()
    .toBuffer();
  await sharp(png32).resize(32, 32).toFile(path.join(publicDir, "favicon.ico"));

  const png64 = await sharp(path.join(publicDir, "favicon-64x64.png"))
    .png()
    .toBuffer();
  const b64 = png64.toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Toumai Holding">
  <rect width="64" height="64" rx="12" fill="#050505"/>
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  await fs.promises.writeFile(path.join(publicDir, "favicon.svg"), svg);

  await sharp(path.join(publicDir, "apple-touch-icon.png"))
    .png()
    .toFile(path.join(root, "src", "app", "apple-icon.png"));
  await sharp(path.join(publicDir, "android-chrome-192x192.png"))
    .png()
    .toFile(path.join(root, "src", "app", "icon.png"));

  console.log("done from", path.relative(root, source));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
