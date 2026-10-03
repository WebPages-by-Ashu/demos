# Website demos

Preview sites for clients, all hosted from this one repo on GitHub Pages.

Live at https://webpages-by-ashu.github.io/demos/

| Demo | URL |
| --- | --- |
| Little Eeden Farm Pine Camp | https://webpages-by-ashu.github.io/demos/little-eeden-pine-camp/ |
| Horizons Kangaroo Sanctuary & Camp Ground | https://webpages-by-ashu.github.io/demos/horizons-kangaroo-sanctuary/ |

## Adding a new client

1. Make a new folder here (any name) and build the site in it, copying `build.mjs`,
   `package.json` and `package-lock.json` from an existing demo.
2. Set `"name"` in its `package.json` to a short lowercase slug, e.g. `sunny-creek-camp`.
   That slug is the URL: `/demos/sunny-creek-camp/`. Use the same name at the top of `package-lock.json`.
3. Commit and push to `main`:

   ```
   git add .
   git commit -m "Add Sunny Creek Camp demo"
   git push
   ```

The workflow in `.github/workflows/pages.yml` builds every demo folder and publishes it a
minute or two later. The landing page listing all demos is generated automatically.

## Building locally

```
node scripts/build-all.mjs                  # installs and builds everything into ./_site
node scripts/build-all.mjs --skip-install   # reuse existing node_modules
```

## Notes

- Every demo gets a `noindex` tag at deploy time so it stays out of search results.
- The repo is public, so everything in it (including original photos in `images/`) is visible.
