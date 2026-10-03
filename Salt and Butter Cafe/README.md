# Salt and Butter Cafe

Website proposal for Salt and Butter Cafe, 1/48-56 Bundarra St, Ermington NSW 2115.

Plain HTML, CSS and vanilla JavaScript. Open `index.html` in a browser to view it.

```
index.html              the page
css/style.css           all styling
js/business-data.js     ALL business content (start here)
js/main.js              behaviour: menu tabs, gallery viewer, hours, mobile bar
assets/images/          photos by folder: hero, food, coffee, cafe, waterfront, gallery
tools/prep-images.mjs   optional: resizes photos and converts them to WebP
build.mjs               optional: minified copy for deployment
```

Almost every change below is made in **`js/business-data.js`**. Save the file and refresh.

## What is verified and what is not

| Item | Status |
| --- | --- |
| Name, address, phone, open daily 7:30 am – 3 pm | From the public Google listing, October 2026 |
| Rating 4.5 from 368 reviews, three short review excerpts | From the Google listing. No reviewer names are used |
| Outdoor seating, dine in and takeaway, wheelchair-accessible seating | From the Google listing and public directories |
| Riverside / waterfront setting | Described that way by several public listings. Confirm how the owner wants it worded |
| Menu items | Real dish names from the café's public Uber Eats listing, but only a **sample**. Confirm the full menu |
| Menu prices | **Left blank.** Delivery-app prices usually differ from in-café prices |
| Dietary tags (V, VG, GF) | None shown. Add only what the owner confirms |
| Uber Eats link ("View full menu", "Order online") | Public listing. Confirm the owner wants it linked |
| Instagram, Facebook, email, booking link | Not found. Left empty, so nothing is shown |
| Every photo | **Stock placeholders** from Pexels, not the café. Labelled "Sample photo" on the page |

## Replace images

Each photo is one file with a descriptive name. Replace the file and keep the name, and nothing else needs changing.

| Where it appears | File |
| --- | --- |
| Hero | `assets/images/hero/salt-butter-hero.webp` and `salt-butter-hero-960.webp` (phone size) |
| Introduction | `waterfront/salt-butter-waterfront-01.webp`, `food/salt-butter-brunch-01.webp` |
| "From the kitchen" strip | `food/salt-butter-brunch-02`, `-brunch-03`, `-breakfast-01`, `-pastries-01`, `coffee/salt-butter-coffee-01`, `-coffee-02` |
| Waterfront section | `waterfront/salt-butter-waterfront-02.webp` and `-02-960.webp` |
| Our cafe | `cafe/salt-butter-cafe-01.webp`, `cafe/salt-butter-cafe-02.webp` |
| Final "See you by the water" | `waterfront/salt-butter-waterfront-03.webp` and `-03-960.webp` |
| Gallery | `gallery/…` listed in `galleryImages` in `business-data.js` |
| Link preview image | `assets/images/salt-butter-share.jpg` |

The easy way: put the full-size JPGs in `tools/originals/<folder>/` using the same names (for example
`tools/originals/hero/salt-butter-hero.jpg`) and run `node tools/prep-images.mjs`. It resizes them, converts them to
WebP, makes the phone sizes and prints each image's width and height.

For the gallery, edit the `galleryImages` list: `src`, `w`, `h` (pixel size) and `alt` (a short description). Add,
remove or reorder lines freely.

When the real photos are in, set `imagesArePlaceholders: false` and the "Sample photo" labels and notices disappear.
To caption a dish in the "From the kitchen" strip, add `<figcaption>Dish name</figcaption>` inside its `<figure>` in `index.html`.

## Edit the menu

In `js/business-data.js`:

- `menuCategories` are the tabs. Each has an `id` and a `label`.
- `menuItems` are the dishes. Each has `category` (a category `id`), `name`, `description`, `price` and `tags`.
- `price: '$23'` shows a price. `price: ''` shows none.
- `tags: ['V', 'GF']` shows dietary tags, and the key appears under the menu automatically.
- Set `menuIsSample: false` once the menu is confirmed, and the "sample" notice disappears.

## Change opening hours

Edit `openingHours` in `js/business-data.js`. Times are 24-hour, for example `open: '07:30', close: '15:00'`.
For a closed day use `open: ''`. The "Open now / Closed now" line, the "Today" marker and the footer update themselves.

Also update the hours in the structured data block near the top of `index.html`, which is what Google reads.

## Add social links

Fill in `instagramUrl` and `facebookUrl`. Links appear in the Visit section and icons in the footer only when a URL is set.
`email` and `bookingUrl` work the same way.

## Add or change the phone number

Set `phone` (what is displayed) and `phoneLink` (what is dialled, for example `tel:+61296380028`).
Set `phoneLink: ''` and every Call button, including the one in the mobile bar, is hidden.

## Add Google Maps

`googleMapsUrl`, `directionsUrl`, `mapEmbedUrl` and `reviewsUrl` are already set to the café's listing.
To change the embedded map, replace `mapEmbedUrl`. Set it to `''` to remove the map.

## Add a menu PDF

Put the PDF in `assets/` and set `menuPdf: 'assets/salt-butter-menu.pdf'`. The "View full menu" button then opens the PDF
and a separate "Order online" button appears for the Uber Eats link. With no PDF, "View full menu" opens the ordering page.

## Deploy to GitHub Pages

**As part of the demos repo (current setup):** commit and push to `main`. The workflow builds this folder and publishes it at
`https://webpages-by-ashu.github.io/demos/salt-and-butter-cafe/`.

**As its own site later:** create a new repository, copy this folder's contents into it, push, then in
Settings → Pages choose "Deploy from a branch", `main`, `/ (root)`. No build step is needed.

When the final address is known, change `og:image` in `index.html` to the full URL of `assets/images/salt-butter-share.jpg`
and add a `"url"` line to the structured data block.

## Photo sources

All current photos are free-to-use stock from Pexels, kept only as placeholders for this demo. Photographers:
Vincent Fotos (hero), Mariya Eskina, F. Furkan Demirbaş, Richard L, Anna Lupa, Rais Radzi, Brett Stone, Esra Afsar,
Jakub Zerdzicki, Amar, Peter Xie, Cristianojr9, Snappr, Yelena Odintsova, Thiago Mobile, Mohamed9380, Nicola Barts,
Alexey Demidov, Helen1, N, Ebra.

For the published site, replace them with the café's own photos or images the owner has permission to use.
