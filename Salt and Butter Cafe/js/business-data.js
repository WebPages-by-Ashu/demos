/* ==========================================================================
   Salt and Butter Cafe — all business content lives in this one file.
   Change something here, save, refresh. No other file needs touching.

   VERIFIED  = taken from the café's public Google listing (checked October 2026)
   CONFIRM   = found publicly, but check with the owner before going live
   EMPTY     = not found; fill in when the owner supplies it
   ========================================================================== */

window.SB_DATA = {

  /* ---------- Business (VERIFIED) ---------- */
  businessName: 'Salt and Butter Cafe',
  shortName: 'Salt & Butter',
  tagline: 'Good food. Great coffee. By the water.',
  address: {
    line1: '1/48-56 Bundarra St',
    line2: 'Ermington NSW 2115',
    country: 'Australia'
  },
  phone: '(02) 9638 0028',          // shown on the page
  phoneLink: 'tel:+61296380028',    // what the Call buttons dial. Leave '' to switch every Call button off
  email: '',                        // EMPTY — shown in the Visit section only when filled in

  /* ---------- Opening hours (VERIFIED: open daily) ----------
     day: 0 = Sunday … 6 = Saturday. Times are 24-hour 'HH:MM'. Use open: '' for a closed day. */
  openingHours: [
    { day: 1, label: 'Monday',    open: '07:30', close: '15:00' },
    { day: 2, label: 'Tuesday',   open: '07:30', close: '15:00' },
    { day: 3, label: 'Wednesday', open: '07:30', close: '15:00' },
    { day: 4, label: 'Thursday',  open: '07:30', close: '15:00' },
    { day: 5, label: 'Friday',    open: '07:30', close: '15:00' },
    { day: 6, label: 'Saturday',  open: '07:30', close: '15:00' },
    { day: 0, label: 'Sunday',    open: '07:30', close: '15:00' }
  ],
  hoursNote: 'Hours may differ on public holidays.',

  /* ---------- Google (VERIFIED) ---------- */
  googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=Salt+and+Butter+Cafe+Ermington&query_place_id=ChIJS_zhmNelEmsRDhYkZYLC_7o',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Salt+and+Butter+Cafe%2C+1%2F48-56+Bundarra+St%2C+Ermington+NSW+2115&destination_place_id=ChIJS_zhmNelEmsRDhYkZYLC_7o',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Salt%20and%20Butter%20Cafe%2C%201%2F48-56%20Bundarra%20St%2C%20Ermington%20NSW%202115&z=15&output=embed',
  reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJS_zhmNelEmsRDhYkZYLC_7o',

  /* ---------- Links ----------
     Buttons and icons only appear for links that are filled in. */
  instagramUrl: '',   // EMPTY — no account could be verified
  facebookUrl: '',    // EMPTY
  bookingUrl: '',     // EMPTY — adds a "Book a table" button to the Visit section
  orderingUrl: 'https://www.ubereats.com/au/store/salt-and-butter-cafe-ermington/sr4CMnIZWeqQ0xWb_7mZ9w',   // CONFIRM — public Uber Eats listing

  /* ---------- Menu ----------
     menuPdf: put the PDF in assets/ and set e.g. 'assets/salt-butter-menu.pdf'.
     The "View full menu" button opens the PDF when set. While it is empty the button
     falls back to orderingUrl, and is hidden if that is empty too. */
  menuPdf: '',

  /* CONFIRM — the items below are real dish names (and, where shown, descriptions) from the café's
     public Uber Eats listing. It is a SAMPLE, not the full menu.
     Prices are left blank on purpose: delivery-app prices usually differ from in-café prices.
     Set menuIsSample to false once the owner has supplied the real menu, and the notice disappears. */
  menuIsSample: true,
  menuCategories: [
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'burgers',   label: 'Burgers & Toasties' },
    { id: 'bakery',    label: 'Bakery & Sweet' },
    { id: 'drinks',    label: 'Coffee & Drinks' }
  ],
  /* Each item: category (an id from above), name, description, price ('' hides it, e.g. '$23'),
     tags: any of 'V', 'VG', 'GF' — only add a tag the owner has confirmed. */
  menuItems: [
    { category: 'breakfast', name: 'Big Hash', description: 'Roasted potatoes with bacon, sautéed onion, baby spinach, poached egg and hollandaise, with warm sourdough.', price: '', tags: [] },
    { category: 'breakfast', name: 'Shakshuka “Egg in Hell”', description: 'Baked egg, chorizo and peperonata with warm Turkish bread.', price: '', tags: [] },
    { category: 'breakfast', name: 'Salmon Benedict', description: '', price: '', tags: [] },
    { category: 'breakfast', name: 'Egg & Bacon Roll', description: '', price: '', tags: [] },

    { category: 'burgers', name: 'Brekkie Burger', description: 'Fried egg, hash brown, halloumi, smashed avocado, oak lettuce and aioli on a brioche bun.', price: '', tags: [] },
    { category: 'burgers', name: 'BLAT', description: 'Bacon, lettuce, avocado, tomato and aioli on sourdough.', price: '', tags: [] },
    { category: 'burgers', name: 'Chicken & Pesto Toastie', description: '', price: '', tags: [] },
    { category: 'burgers', name: 'KFC Korean Fried Chicken Burger', description: '', price: '', tags: [] },
    { category: 'burgers', name: 'Salt & Butter Signature Burger', description: '', price: '', tags: [] },

    { category: 'bakery', name: 'Ham & Cheese Croissant', description: '', price: '', tags: [] },
    { category: 'bakery', name: 'Banana Bread', description: '', price: '', tags: [] },
    { category: 'bakery', name: 'Cheesecake Slice', description: '', price: '', tags: [] },

    { category: 'drinks', name: 'Coffee', description: '', price: '', tags: [] },
    { category: 'drinks', name: 'Mocha', description: '', price: '', tags: [] },
    { category: 'drinks', name: 'Matcha Strawberry', description: '', price: '', tags: [] },
    { category: 'drinks', name: 'Tropical Smoothie', description: '', price: '', tags: [] }
  ],

  /* ---------- Reviews (VERIFIED) ----------
     rating and reviewCount are from Google on the date above; update or blank them ('' / 0) to hide.
     quotes are short excerpts shown publicly on the Google listing. No reviewer names are used. */
  rating: '4.5',
  reviewCount: 368,
  reviews: [
    { text: 'Great breakfast, great coffee, great vibes and a friendly service.' },
    { text: 'Super friendly staff, good selection of food and drinks.' },
    { text: 'Crispy bacon, fresh lettuce, juicy tomato – the holy trinity.' }
  ],

  /* ---------- Photos ----------
     EVERY photo on the site is currently a temporary stock placeholder (Pexels), not Salt and Butter Cafe.
     While imagesArePlaceholders is true, a small "Sample photo" label is shown so nobody mistakes
     them for the real café. Set it to false once real photos are in. See README for file names. */
  imagesArePlaceholders: true,

  /* Gallery: w and h are the image's pixel size (stops the page jumping while photos load). */
  galleryImages: [
    { src: 'assets/images/gallery/salt-butter-gallery-food-01.webp',       w: 1200, h: 800,  alt: 'Smashed avocado and poached egg on toast' },
    { src: 'assets/images/gallery/salt-butter-gallery-waterfront-01.webp', w: 900,  h: 1350, alt: 'A calm, tree-lined stretch of river with reflections on the water' },
    { src: 'assets/images/gallery/salt-butter-gallery-coffee-01.webp',     w: 900,  h: 1125, alt: 'Coffee with latte art in a glass on a timber table' },
    { src: 'assets/images/gallery/salt-butter-gallery-cafe-01.webp',       w: 1200, h: 801,  alt: 'Outdoor tables set for brunch, with flowers in the foreground' },
    { src: 'assets/images/gallery/salt-butter-gallery-food-02.webp',       w: 900,  h: 1350, alt: 'Avocado toast topped with a poached egg' },
    { src: 'assets/images/gallery/salt-butter-gallery-coffee-02.webp',     w: 1200, h: 800,  alt: 'A cappuccino on a pale timber table' },
    { src: 'assets/images/gallery/salt-butter-gallery-waterfront-02.webp', w: 1200, h: 800,  alt: 'Umbrellas and tables beside the water, surrounded by trees' },
    { src: 'assets/images/gallery/salt-butter-gallery-food-03.webp',       w: 900,  h: 1200, alt: 'Brunch plates and two coffees on a round table, seen from above' },
    { src: 'assets/images/gallery/salt-butter-gallery-cafe-02.webp',       w: 900,  h: 1200, alt: 'Outdoor café tables under an umbrella, looking out over the water' }
  ]
};
