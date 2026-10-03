# CC.ilash

Website proposal for CC.ilash, eyelash extensions in Eastwood NSW 2122.

Plain HTML, CSS and vanilla JavaScript. Open `index.html` in a browser to view it.

```
index.html              the page
css/style.css           all styling
js/business-data.js     ALL editable content (start here)
js/main.js              behaviour: menu, gallery viewer, form, hours
assets/images/          photos, favicon, social share image
tools/prep-images.mjs   optional: resizes photos for the web
build.mjs               optional: minified copy for deployment
```

Almost every change below is made in **`js/business-data.js`**. Save the file and refresh.

## Before going live: what is still demo content

| Item | Status |
| --- | --- |
| Phone, suburb, opening hours, "by appointment only" | From the public Google listing |
| Instagram link | Shown on the Google listing as the business website. Confirm with the owner |
| Service names and descriptions | **Demo.** Confirm the real menu |
| Durations and prices | Empty. None are shown until filled in |
| All photos (hero, intro, gallery) | **Stock placeholders** from Pexels, not CC.ilash clients |
| Portrait of Cecilia | Neutral placeholder panel, no photo |
| Review lines | Summaries of themes in public Google reviews, not exact quotes |
| Booking link | Empty. Book buttons go to the enquiry form |
| Enquiry form | Not connected. It tells the visitor to call instead of pretending to send |

## 1. Replace images

1. Put the new photo in `assets/images/` (JPG, around 1100 px wide for landscape, 900 px for portrait).
2. **Gallery:** in `js/business-data.js` edit the `gallery` list. Each line has `src`, `w`, `h` (the image's pixel size) and `alt` (a short description). Add, remove or reorder lines freely.
3. Once the gallery shows real client work, set `galleryIsPlaceholder: false` to remove the "sample imagery" notice.
4. **Hero:** replace `assets/images/hero.jpg` (portrait, about 1200 × 1600). **Intro strip:** replace `assets/images/intro.jpg` (landscape).
5. **Cecilia's portrait:** add the photo to `assets/images/` and set `portrait: 'assets/images/cecilia.jpg'`.

Optional: drop full-size originals into `tools/originals/` using the same file names and run
`node tools/prep-images.mjs` to resize and compress them. It prints each image's `w` and `h`.

## 2. Change services

Edit the `services` list in `js/business-data.js`. Each service has `name`, `description`, `duration` and `price`.
The "Preferred service" dropdown in the enquiry form updates itself from the same list.

## 3. Add prices

In the same `services` list set `price`, for example `price: 'from $120'`, and `duration`, for example `duration: '90 min'`.
Leave `price: ''` and no price is shown. Leave `duration: ''` and it reads "Duration on enquiry".

## 4. Add the booking URL

Set `bookingUrl` in `js/business-data.js` to the online booking page (Fresha, Square, Timely and so on).
Every "Book" button on the site then opens that page, and the service links change from "Enquire" to "Book".
While it is empty, the buttons scroll to the enquiry form.

To make the enquiry form send, create a form at Formspree or Web3Forms and fill in `form`:

```js
form: { endpoint: 'https://formspree.io/f/xxxxxxxx', accessKey: '' }
// or
form: { endpoint: 'https://api.web3forms.com/submit', accessKey: 'your-access-key' }
```

## 5. Add social URLs

Fill in `social.instagram`, `social.facebook` or `social.tiktok`. An icon appears in the footer only for the ones that have a URL.

## 6. Deploy on GitHub Pages

**As part of the demos repo (current setup):** commit and push to `main`. The workflow builds this folder and publishes it at
`https://webpages-by-ashu.github.io/demos/cc-ilash/`.

**As its own site later:** create a new repository, copy this folder's contents into it, push, then in
Settings → Pages choose "Deploy from a branch", `main`, `/ (root)`. No build step is needed; the site runs as it is.
For a custom domain, add it under Settings → Pages and point the domain's DNS at GitHub.

When the final address is known, change `og:image` in `index.html` to the full URL of `assets/images/og.jpg`
so link previews work everywhere, and add a `"url"` line to the structured data block.

## Other things to know

- Opening hours appear in two places: `hours` in `business-data.js` (what visitors see) and the
  structured data block near the top of `index.html` (what Google reads). Change both.
- Stock photo credits (Pexels licence, free to use): Milangel Melendez (hero), N Voitkevich, Angela Roma,
  Israelzin, Ali Camacho Adarve, Ekaterina Bogdanova, Chermitove, Maria Eduarda Godoi.
