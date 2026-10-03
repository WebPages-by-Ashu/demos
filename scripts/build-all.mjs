// Builds every client demo in this folder into ./_site for GitHub Pages.
//   node scripts/build-all.mjs            (add --skip-install to reuse existing node_modules)
//
// A demo is any top-level folder with a package.json that has a "build" script
// writing to ./dist. It is published at /<package.json "name">/.
import { readFile, writeFile, readdir, mkdir, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, '_site');
const skipInstall = process.argv.includes('--skip-install');

const esc = (s) => s.replace(/&(?!amp;|lt;|gt;|quot;|#)/g, '&amp;').replace(/</g, '&lt;');

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const demos = [];
for (const entry of await readdir(ROOT, { withFileTypes: true })) {
  if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
  const dir = path.join(ROOT, entry.name);
  const pkgPath = path.join(dir, 'package.json');
  if (!existsSync(pkgPath)) continue;
  const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
  if (!pkg.scripts?.build) continue;

  const slug = pkg.name;
  if (!/^[a-z0-9][a-z0-9-]*$/.test(slug)) throw new Error(`${entry.name}: package.json "name" must be a lowercase-and-dashes slug, got "${slug}"`);
  if (demos.some((d) => d.slug === slug)) throw new Error(`Two demos share the name "${slug}"`);

  console.log(`\n== ${entry.name}  ->  /${slug}/`);
  if (!skipInstall) execSync('npm ci --no-audit --no-fund', { cwd: dir, stdio: 'inherit' });
  execSync('npm run build', { cwd: dir, stdio: 'inherit' });

  const dest = path.join(OUT, slug);
  await cp(path.join(dir, 'dist'), dest, { recursive: true });
  await rm(path.join(dest, 'robots.txt'), { force: true });

  // Demos shouldn't show up in search results next to the client's real listing
  const indexPath = path.join(dest, 'index.html');
  let html = await readFile(indexPath, 'utf8');
  html = html.replace(/<head>/i, '<head><meta name="robots" content="noindex, nofollow">');
  await writeFile(indexPath, html);

  const title = (html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? slug).split(' · ')[0].trim();
  demos.push({ slug, title, description: pkg.description ?? '' });
}

if (!demos.length) throw new Error('No demos found');
demos.sort((a, b) => a.title.localeCompare(b.title));

/* ---------- Landing page listing every demo ---------- */
const index = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>Website demos</title>
  <style>
    :root { --paper: #f4ede0; --card: #fbf8f1; --ink: #2b2a26; --soft: #5a564c; --forest: #2f3f2c; --accent: #b35a36; }
    * { box-sizing: border-box; }
    body { margin: 0; background: var(--paper); color: var(--ink); font: 1.05rem/1.6 Georgia, "Times New Roman", serif; }
    main { width: min(100% - 32px, 720px); margin: 0 auto; padding: clamp(40px, 9vw, 96px) 0; }
    h1 { font-weight: 400; font-size: clamp(2rem, 5vw, 3rem); line-height: 1.1; margin: 0 0 .3em; color: var(--forest); }
    p { margin: 0; color: var(--soft); }
    ul { list-style: none; margin: 40px 0 0; padding: 0; display: grid; gap: 14px; }
    a { display: block; padding: 20px 22px; background: var(--card); border-left: 5px solid var(--forest); color: inherit; text-decoration: none; box-shadow: 0 12px 26px -20px rgba(43, 42, 38, .6); }
    a:hover, a:focus-visible { border-left-color: var(--accent); }
    a strong { display: block; font-weight: 400; font-size: 1.35rem; color: var(--forest); }
    a span { font-size: .95rem; color: var(--soft); }
  </style>
</head>
<body>
<main>
  <h1>Website demos</h1>
  <p>Preview builds for clients. ${demos.length} so far.</p>
  <ul>
${demos.map((d) => `    <li><a href="${d.slug}/"><strong>${esc(d.title)}</strong><span>${esc(d.description)}</span></a></li>`).join('\n')}
  </ul>
</main>
</body>
</html>
`;
await writeFile(path.join(OUT, 'index.html'), index);
await writeFile(path.join(OUT, '.nojekyll'), '');

console.log(`\nBuilt ${demos.length} demo(s) to ./_site:`);
for (const d of demos) console.log(`  /${d.slug}/  ${d.title}`);
