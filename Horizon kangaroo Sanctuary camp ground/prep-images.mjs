// One-off: turns the original photos in ./images into web-ready ones in ./assets/img
//   node prep-images.mjs
import { mkdir } from 'node:fs/promises';
import sharp from 'sharp';

const SRC = 'images';
const OUT = 'assets/img';

// [source, output name, max width]
const photos = [
  ['hsi-kangaroos-on-grass.jpg',      'roos-on-grass.jpg',  1100],
  ['anycamp-kangaroos-feeding.jpg',   'roos-feeding.jpg',   1400],
  ['google-maps-camp-kitchen.jpg',    'camp-kitchen.jpg',   1200],
  ['anycamp-view.jpg',                'view.jpg',           1000],
  ['anycamp-tent-site-view.jpg',      'tent-site.jpg',      1400],
  ['anycamp-garden-driveway.jpg',     'garden-drive.jpg',   1100],
  ['hsi-joey.jpg',                    'joey.jpg',           1200],
  ['anycamp-deck.jpg',                'deck.jpg',           1200],
  ['anycamp-sunset.jpg',              'sunset.jpg',          900],
  ['anycamp-peacock.jpg',             'peacock.jpg',         900],
  ['anycamp-fire-pit.jpg',            'fire-pit.jpg',       1200],
];

await mkdir(OUT, { recursive: true });

for (const [src, name, width] of photos) {
  const info = await sharp(`${SRC}/${src}`)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(`${OUT}/${name}`);
  console.log(`  ${name.padEnd(20)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

/* Favicon: the sun-on-the-horizon mark on a forest-green tile */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#2f3f2c"/>
  <g fill="none" stroke="#f4ede0" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">
    <path d="M10 38 H54"/>
    <path d="M20 38 a12 12 0 0 1 24 0"/>
    <path d="M32 13 v6 M15 21 l4.5 4.5 M49 21 l-4.5 4.5"/>
    <path d="M17 47 C 24 43, 30 51, 38 47 S 46 45, 48 47"/>
  </g>
</svg>`;
await sharp(Buffer.from(favicon), { density: 300 }).resize(128, 128).png().toFile(`${OUT}/favicon.png`);
console.log('  favicon.png');
