// One-off: turns full-size photos in tools/originals/<folder>/ into web-ready WebP in assets/images/<folder>/
//   node tools/prep-images.mjs
// Prints each image's width/height so gallery sizes can be copied into js/business-data.js.
import { readdir, mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'tools/originals';
const OUT = 'assets/images';
const WIDE = ['salt-butter-hero', 'salt-butter-waterfront-02', 'salt-butter-waterfront-03']; // full-bleed photos get a large and a phone size

for (const folder of await readdir(SRC)) {
  await mkdir(`${OUT}/${folder}`, { recursive: true });
  for (const file of (await readdir(`${SRC}/${folder}`)).sort()) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const name = file.replace(/\.\w+$/, '');
    const meta = await sharp(`${SRC}/${folder}/${file}`).rotate().metadata();
    const portrait = meta.height > meta.width;
    const sizes = WIDE.includes(name) ? [[1920, ''], [960, '-960']] : [[portrait ? 900 : 1200, '']];
    for (const [width, suffix] of sizes) {
      let img = sharp(`${SRC}/${folder}/${file}`).rotate();
      // very tall or wide-cropped photos: trim to a sensible shape first
      if (name === 'salt-butter-waterfront-03') img = img.resize(1920, 1100, { fit: 'cover', position: 'south' });
      else if (portrait && meta.height / meta.width > 1.55) img = img.resize(meta.width, Math.round(meta.width * 1.5), { fit: 'cover' });
      const info = await sharp(await img.toBuffer()).resize({ width, withoutEnlargement: true }).webp({ quality: 76 }).toFile(`${OUT}/${folder}/${name}${suffix}.webp`);
      console.log(`  ${folder}/${(name + suffix).padEnd(36)} w: ${info.width}, h: ${info.height}   ${(info.size / 1024).toFixed(0)} KB`);
    }
  }
}

// Social share image (JPEG for the widest support), cropped from the hero
await sharp(`${SRC}/hero/salt-butter-hero.jpg`).resize(1200, 630, { fit: 'cover' }).jpeg({ quality: 80, mozjpeg: true }).toFile(`${OUT}/salt-butter-share.jpg`);

// Favicon: "S&B" ampersand mark on sage
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#5f6b4e"/>
  <text x="32" y="45" text-anchor="middle" font-family="Georgia, 'Times New Roman', serif" font-style="italic" font-size="40" fill="#f7f1e6">&amp;</text>
</svg>`;
await sharp(Buffer.from(favicon), { density: 300 }).resize(96, 96).png().toFile(`${OUT}/favicon.png`);
console.log('  salt-butter-share.jpg, favicon.png');
