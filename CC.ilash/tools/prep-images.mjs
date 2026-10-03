// One-off: turns full-size photos in tools/originals/ into web-ready ones in assets/images/
//   node tools/prep-images.mjs
// Prints the width/height of each gallery image so they can be copied into js/business-data.js.
import { readdir, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'tools/originals';
const OUT = 'assets/images';
await mkdir(OUT, { recursive: true });

for (const file of (await readdir(SRC)).sort()) {
  if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
  const name = file.replace(/\.\w+$/, '');
  const img = sharp(`${SRC}/${file}`).rotate();
  const meta = await img.metadata();
  const portrait = meta.height > meta.width;
  const width = name === 'hero' ? 1200 : name === 'intro' ? 1600 : portrait ? 900 : 1100;
  const info = await img.resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, progressive: true })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`  ${name.padEnd(12)} w: ${info.width}, h: ${info.height}   ${(info.size / 1024).toFixed(0)} KB`);
}

// Social share image, cropped from the hero
await sharp(`${SRC}/hero.jpg`).rotate().resize(1200, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/og.jpg`);

// Favicon: "C" monogram on charcoal
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#201d1b"/>
  <path d="M43 22.5c-2.6-3.4-6.2-5.3-10.4-5.3-8 0-13.6 6.2-13.6 14.8s5.6 14.8 13.6 14.8c4.2 0 7.8-1.9 10.4-5.3" fill="none" stroke="#f6f1ea" stroke-width="2.6" stroke-linecap="round"/>
  <circle cx="46.5" cy="44.5" r="2.4" fill="#b9958c"/>
</svg>`;
await sharp(Buffer.from(favicon), { density: 300 }).resize(96, 96).png().toFile(`${OUT}/favicon.png`);
console.log('  og.jpg, favicon.png');
