/* ==========================================================================
   CC.ilash — all editable content lives in this one file.
   Change something here, save, refresh. No other file needs touching.

   Anything marked DEMO must be confirmed with the owner before going live.
   ========================================================================== */

window.CC_DATA = {

  /* ---------- Business (verified from the public Google listing) ---------- */
  name: 'CC.ilash',
  artist: 'Cecilia',
  phoneDisplay: '0415 835 028',
  phoneLink: 'tel:0415835028',
  locationLine1: 'Eastwood NSW 2122',
  locationLine2: 'Sydney, Australia',
  appointmentNote: 'By appointment only',

  /* ---------- Booking ----------
     Paste the online booking link here (Fresha, Square, Timely, Instagram DM link…).
     While this is empty, every "Book" button scrolls to the enquiry form instead. */
  bookingUrl: '',

  /* ---------- Google ---------- */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=CC.ilash+Eastwood+NSW+2122&query_place_id=ChIJbadK0duhEmsROnBzSlpFE2c',
  reviewsUrl: 'https://search.google.com/local/reviews?placeid=ChIJbadK0duhEmsROnBzSlpFE2c',
  mapEmbedUrl: 'https://maps.google.com/maps?q=CC.ilash%2C%20Eastwood%20NSW%202122&z=15&output=embed',

  /* ---------- Social ----------
     An icon only appears in the footer when its URL is filled in.
     The Instagram link below is the one shown on the Google listing — confirm with the owner. */
  social: {
    instagram: 'https://www.instagram.com/cc.ilash/',
    facebook: '',
    tiktok: ''
  },

  /* ---------- Opening hours (as publicly listed) ----------
     day: 0 = Sunday … 6 = Saturday. Use open: '' and close: '' for a closed day. */
  hours: [
    { day: 1, label: 'Monday',    open: '9:00 am', close: '5:00 pm' },
    { day: 2, label: 'Tuesday',   open: '9:00 am', close: '5:00 pm' },
    { day: 3, label: 'Wednesday', open: '9:00 am', close: '5:00 pm' },
    { day: 4, label: 'Thursday',  open: '9:00 am', close: '5:00 pm' },
    { day: 5, label: 'Friday',    open: '9:00 am', close: '5:00 pm' },
    { day: 6, label: 'Saturday',  open: '9:00 am', close: '3:00 pm' },
    { day: 0, label: 'Sunday',    open: '9:00 am', close: '1:00 pm' }
  ],

  /* ---------- Services — DEMO CONTENT ----------
     These names and descriptions are placeholders. Confirm the real menu with the owner.
     duration: e.g. '90 min'. Leave '' to show "Duration on enquiry".
     price:    e.g. 'from $120'. Leave '' and no price is shown at all. */
  services: [
    {
      name: 'Classic Lashes',
      description: 'One extension placed on each natural lash, for a soft, defined finish that still looks like you.',
      duration: '',
      price: ''
    },
    {
      name: 'Hybrid Lashes',
      description: 'A blend of classic and volume techniques, giving a little more texture and fullness.',
      duration: '',
      price: ''
    },
    {
      name: 'Volume Lashes',
      description: 'Lightweight fans layered for a fuller, more dramatic look, shaped to suit your eyes.',
      duration: '',
      price: ''
    },
    {
      name: 'Lash Refills',
      description: 'A maintenance appointment to refresh your set and keep it looking full between visits.',
      duration: '',
      price: ''
    }
  ],

  /* ---------- Reviews ----------
     type: 'theme'  — a summary of what public Google reviews say (shown without quote marks or a name)
     type: 'quote'  — an exact quote. Add author: 'First name' and only use with the reviewer's wording intact. */
  reviews: [
    { type: 'theme', text: 'Lashes that last much longer.' },
    { type: 'theme', text: 'Professional, clean and precise.' },
    { type: 'theme', text: 'An appointment that feels comfortable from start to finish.' },
    { type: 'theme', text: 'Cecilia knows how to achieve the style you want.' },
    { type: 'theme', text: 'Sets that complement your natural eye shape.' }
  ],
  reviewsFootnote: 'Summarised from public Google reviews of CC.ilash.',

  /* ---------- Gallery — PLACEHOLDER STOCK IMAGES ----------
     Every image below is temporary stock photography (Pexels), NOT CC.ilash client work.
     To replace: drop the real photo into assets/images/, then change src and alt here.
     Set galleryIsPlaceholder to false once real work is in, and the preview notice disappears. */
  galleryIsPlaceholder: true,
  gallery: [
    { src: 'assets/images/gallery-02.jpg', w: 900,  h: 1350, alt: 'Closed eye in warm light showing fine, even lashes' },
    { src: 'assets/images/gallery-01.jpg', w: 1100, h: 724,  alt: 'Close-up of long, softly curled lashes on a woman with blonde hair' },
    { src: 'assets/images/gallery-03.jpg', w: 1100, h: 734,  alt: 'A lash brush being run through a finished set of lashes' },
    { src: 'assets/images/gallery-05.jpg', w: 1100, h: 719,  alt: 'Hazel eye with defined lashes and a groomed brow' },
    { src: 'assets/images/gallery-04.jpg', w: 900,  h: 1350, alt: 'Soft-focus close-up of lashes on a closed eye' },
    { src: 'assets/images/gallery-07.jpg', w: 1100, h: 732,  alt: 'Closed eye and freckled skin in natural light' },
    { src: 'assets/images/gallery-06.jpg', w: 1100, h: 825,  alt: 'Black and white detail of lash extensions during application' },
    { src: 'assets/images/gallery-09.jpg', w: 1100, h: 825,  alt: 'Macro view of an eye with long upper lashes' },
    { src: 'assets/images/gallery-08.jpg', w: 900,  h: 1350, alt: 'Lash extensions being applied with fine tweezers' }
  ],

  /* ---------- Portrait of Cecilia ----------
     Leave '' to show the neutral placeholder panel. Add a path (e.g. 'assets/images/cecilia.jpg') when a real portrait is supplied. */
  portrait: '',
  portraitAlt: 'Cecilia, lash artist at CC.ilash',

  /* ---------- Enquiry form ----------
     The form does nothing until an endpoint is set — it tells the visitor to call instead.
     Formspree:  endpoint: 'https://formspree.io/f/xxxxxxxx'
     Web3Forms:  endpoint: 'https://api.web3forms.com/submit', accessKey: 'your-key' */
  form: {
    endpoint: '',
    accessKey: ''
  }
};
