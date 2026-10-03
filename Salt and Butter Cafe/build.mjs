// Production build: writes a minified, deploy-ready copy of the site to ./dist
//   npm install && npm run build
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import CleanCSS from 'clean-css';
import { minify as minifyJS } from 'terser';
import { minify as minifyHTML } from 'html-minifier-terser';

const OUT = 'dist';
const kb = (s) => (Buffer.byteLength(s) / 1024).toFixed(1) + ' KB';

await rm(OUT, { recursive: true, force: true });
await mkdir(`${OUT}/css`, { recursive: true });
await mkdir(`${OUT}/js`, { recursive: true });
await cp('assets', `${OUT}/assets`, { recursive: true });

const cssSrc = await readFile('css/style.css', 'utf8');
const css = new CleanCSS({ level: 2 }).minify(cssSrc);
if (css.errors.length) throw new Error(css.errors.join('\n'));
await writeFile(`${OUT}/css/style.css`, css.styles);

for (const file of ['main.js', 'business-data.js']) {
  const src = await readFile(`js/${file}`, 'utf8');
  const out = await minifyJS(src, { compress: true, mangle: true, format: { comments: false } });
  await writeFile(`${OUT}/js/${file}`, out.code);
  console.log(`  js/${file.padEnd(18)} ${kb(src)} → ${kb(out.code)}`);
}

const htmlSrc = await readFile('index.html', 'utf8');
const html = await minifyHTML(htmlSrc, {
  collapseWhitespace: true,
  conservativeCollapse: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
});
await writeFile(`${OUT}/index.html`, html);

console.log(`  css/style.css         ${kb(cssSrc)} → ${kb(css.styles)}
  index.html            ${kb(htmlSrc)} → ${kb(html)}

  Built to ./${OUT}`);
