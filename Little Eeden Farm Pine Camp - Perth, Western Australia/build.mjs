// Production build: writes a deploy-ready copy of the site to ./dist
//   npm install && npm run build
import { readFile, writeFile, mkdir, rm, readdir, copyFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';
import { minify as minifyHTML } from 'html-minifier-terser';
import sharp from 'sharp';

const SRC = '.';
const OUT = 'dist';
const IMG_SRC = 'assets/img';

const hash = (buf) => createHash('sha1').update(buf).digest('hex').slice(0, 8);
const kb = (n) => (n / 1024).toFixed(1) + ' KB';

await rm(OUT, { recursive: true, force: true });
await mkdir(path.join(OUT, 'assets/css'), { recursive: true });
await mkdir(path.join(OUT, 'assets/js'), { recursive: true });
await mkdir(path.join(OUT, IMG_SRC), { recursive: true });

/* ---------- Images: recompress JPEGs, squeeze PNGs ---------- */
let imgIn = 0, imgOut = 0;
for (const file of await readdir(IMG_SRC)) {
  const src = path.join(IMG_SRC, file);
  const dest = path.join(OUT, IMG_SRC, file);
  const input = await readFile(src);
  imgIn += input.length;
  const ext = path.extname(file).toLowerCase();

  if (ext === '.jpg' || ext === '.jpeg') {
    const jpg = await sharp(input).jpeg({ quality: 82, mozjpeg: true, progressive: true }).toBuffer();
    const best = jpg.length < input.length ? jpg : input;
    await writeFile(dest, best);
    imgOut += best.length;
    console.log(`  ${file.padEnd(24)} ${kb(input.length)} → ${kb(best.length)}`);
  } else if (ext === '.png') {
    const png = await sharp(input).png({ compressionLevel: 9, palette: true, quality: 90, effort: 10 }).toBuffer();
    const best = png.length < input.length ? png : input;
    await writeFile(dest, best);
    imgOut += best.length;
    console.log(`  ${file.padEnd(24)} ${kb(input.length)} → ${kb(best.length)}`);
  } else {
    await copyFile(src, dest);
  }
}

/* ---------- CSS ---------- */
const cssSrc = await readFile('assets/css/style.css', 'utf8');
const css = new CleanCSS({ level: 2 }).minify(cssSrc);
if (css.errors.length) throw new Error(css.errors.join('\n'));
const cssName = `style.${hash(css.styles)}.css`;
await writeFile(path.join(OUT, 'assets/css', cssName), css.styles);

/* ---------- JS ---------- */
const jsSrc = await readFile('assets/js/main.js', 'utf8');
const js = await minifyJS(jsSrc, { compress: true, mangle: true, format: { comments: false } });
const jsName = `main.${hash(js.code)}.js`;
await writeFile(path.join(OUT, 'assets/js', jsName), js.code);

/* ---------- HTML ---------- */
let html = await readFile('index.html', 'utf8');
html = html
  .replace('assets/css/style.css', `assets/css/${cssName}`)
  .replace('assets/js/main.js', `assets/js/${jsName}`);

const htmlOut = await minifyHTML(html, {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
  removeRedundantAttributes: true,
  sortAttributes: true,
  sortClassName: false,
});
await writeFile(path.join(OUT, 'index.html'), htmlOut);

/* ---------- Extras ---------- */
await writeFile(path.join(OUT, 'robots.txt'), 'User-agent: *\nAllow: /\n');

console.log(`
  index.html   ${kb(Buffer.byteLength(html))} → ${kb(Buffer.byteLength(htmlOut))}
  ${cssName.padEnd(12)} ${kb(Buffer.byteLength(cssSrc))} → ${kb(Buffer.byteLength(css.styles))}
  ${jsName.padEnd(12)} ${kb(Buffer.byteLength(jsSrc))} → ${kb(Buffer.byteLength(js.code))}
  images       ${kb(imgIn)} → ${kb(imgOut)}

  Built to ./${OUT}`);
