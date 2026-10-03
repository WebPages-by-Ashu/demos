# Horizons Kangaroo Sanctuary & Camp Ground

Website for Horizons Kangaroo Sanctuary & Camp Ground, 15 Fitzroy Crescent, Agnes Water QLD 4677.

Plain HTML/CSS/JS, no framework. Open `index.html` to view.

## Build

```
npm install
npm run build
```

Writes a minified, deploy-ready copy to `dist/`.

## Structure

- `index.html` — the page
- `assets/css/style.css`, `assets/js/main.js`
- `assets/img/` — web-ready photos and favicon (made from `images/` by `node prep-images.mjs`)
- `images/` — original photos as downloaded

## Where the content came from

Business details (name, address, phone, description, 4.6 rating from 521 reviews) are from the
Google Maps listing: https://maps.app.goo.gl/joqH3PRcARfi8PDj6

Extra detail (site types, 19 ft caravan limit, no pets, water fill only, wildlife species, nearby
places) is from the owner's WikiCamps description, the Full Range Camping directory and the
Humane World for Animals (HSI) sanctuary page.

## Photos — check before going live

Only one photo could be pulled from the Google Maps listing itself. The rest are from other
public listings of the same property and were taken by other people:

- `google-maps-*` — the owner's cover photo on Google Maps
- `hsi-*` — hsi.org.au/sanctuary/horizons
- `anycamp-*` — campers' photos on anycamp.com.au

Get the owner's OK to use them, or swap in the owner's own photos, before publishing.
