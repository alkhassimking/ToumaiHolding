const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.join(__dirname, "..");
const publicDir = path.join(root, "public");
const logosDir = path.join(publicDir, "logos");

const sourceCandidates = [
  path.join(logosDir, "Favicon.png"),
  path.join(logosDir, "Toumai Holding.png"),
];

const source = sourceCandidates.find((p) => fs.existsSync(p));
if (!source) {
  console.error("No transparent source logo found in public/logos");
  process.exit(1);
}

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 };

async function transparentIcon(size, outPath, { padding = 0.08 } = {}) {
  const inner = Math.max(1, Math.round(size * (1 - padding * 2)));
  const logo = await sharp(source)
    .resize(inner, inner, { fit: "contain", background: TRANSPARENT })
    .ensureAlpha()
    .png()
    .toBuffer();

  const left = Math.round((size - inner) / 2);
  await sharp({
    create: {
      width: size,
      height: size,
      channels: 4,
      background: TRANSPARENT,
    },
  })
    .composite([{ input: logo, left, top: left }])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

async function writeOgImage(outPath) {
  const width = 1200;
  const height = 630;
  const logoSize = 280;
  const logo = await sharp(source)
    .resize(logoSize, logoSize, { fit: "contain", background: TRANSPARENT })
    .ensureAlpha()
    .png()
    .toBuffer();

  const svgBg = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="g" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#1a1608"/>
          <stop offset="55%" stop-color="#0a0a0a"/>
          <stop offset="100%" stop-color="#050505"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
    </svg>
  `);

  await sharp(svgBg)
    .composite([
      {
        input: logo,
        left: Math.round((width - logoSize) / 2),
        top: Math.round((height - logoSize) / 2) - 24,
      },
    ])
    .png({ compressionLevel: 9 })
    .toFile(outPath);
}

async function main() {
  const jobs = [
    [16, "favicon-16x16.png", 0.06],
    [32, "favicon-32x32.png", 0.06],
    [48, "favicon-48x48.png", 0.06],
    [64, "favicon-64x64.png", 0.06],
    [180, "apple-touch-icon.png", 0.1],
    [192, "android-chrome-192x192.png", 0.1],
    [512, "android-chrome-512x512.png", 0.1],
    [512, "logo.png", 0.08],
    [512, "maskable-icon-512.png", 0.2],
  ];

  for (const [size, name, padding] of jobs) {
    const out = path.join(publicDir, name);
    await transparentIcon(size, out, { padding });
    const meta = await sharp(out).ensureAlpha().raw().toBuffer({
      resolveWithObject: true,
    });
    let transparent = 0;
    const total = meta.info.width * meta.info.height;
    for (let i = 3; i < meta.data.length; i += 4) {
      if (meta.data[i] < 10) transparent++;
    }
    console.log(
      "wrote",
      name,
      `transparent ${(100 * transparent) / total}%`
    );
  }

  await writeOgImage(path.join(publicDir, "og-image.png"));
  console.log("wrote og-image.png");

  const png32 = await sharp(path.join(publicDir, "favicon-32x32.png"))
    .png()
    .toBuffer();
  await sharp(png32).toFile(path.join(publicDir, "favicon.ico"));

  const png64 = await sharp(path.join(publicDir, "favicon-64x64.png"))
    .png()
    .toBuffer();
  const b64 = png64.toString("base64");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" role="img" aria-label="Toumai Holding">
  <image href="data:image/png;base64,${b64}" x="0" y="0" width="64" height="64" preserveAspectRatio="xMidYMid meet"/>
</svg>`;
  await fs.promises.writeFile(path.join(publicDir, "favicon.svg"), svg);

  await sharp(path.join(publicDir, "apple-touch-icon.png"))
    .png()
    .toFile(path.join(root, "src", "app", "apple-icon.png"));
  await sharp(path.join(publicDir, "android-chrome-192x192.png"))
    .png()
    .toFile(path.join(root, "src", "app", "icon.png"));

  const stale = path.join(logosDir, "toumai-holding-logo.png");
  if (fs.existsSync(stale)) {
    fs.unlinkSync(stale);
    console.log("deleted logos/toumai-holding-logo.png");
  }

  console.log("source", path.relative(root, source));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
