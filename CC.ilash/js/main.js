/* CC.ilash — behaviour. Content comes from js/business-data.js (window.CC_DATA). */
(function () {
  'use strict';

  var data = window.CC_DATA || {};
  var doc = document;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (sel, root) { return (root || doc).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || doc).querySelectorAll(sel)); };

  function el(tag, attrs, text) {
    var node = doc.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (text != null) node.textContent = text;
    return node;
  }

  /* ---------- Bind simple values ---------- */
  $$('[data-phone-text]').forEach(function (n) { if (data.phoneDisplay) n.textContent = data.phoneDisplay; });
  $$('[data-phone-link]').forEach(function (n) { if (data.phoneLink) n.href = data.phoneLink; });
  $$('[data-location-1]').forEach(function (n) { if (data.locationLine1) n.textContent = data.locationLine1; });
  $$('[data-location-2]').forEach(function (n) { if (data.locationLine2) n.textContent = data.locationLine2; });
  $$('[data-appt]').forEach(function (n) { if (data.appointmentNote) n.textContent = data.appointmentNote; else n.hidden = true; });
  $$('[data-maps]').forEach(function (n) { if (data.mapsUrl) n.href = data.mapsUrl; });
  $$('[data-reviews]').forEach(function (n) { if (data.reviewsUrl || data.mapsUrl) n.href = data.reviewsUrl || data.mapsUrl; });
  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });

  /* Booking buttons: external booking page if one is configured, otherwise the enquiry form */
  $$('[data-book]').forEach(function (n) {
    if (data.bookingUrl) { n.href = data.bookingUrl; n.target = '_blank'; n.rel = 'noopener'; }
  });

  /* ---------- Services ---------- */
  var serviceList = $('#service-list');
  var serviceSelect = $('#f-service');
  (data.services || []).forEach(function (s, i) {
    var li = el('li', { class: 'service reveal' });
    li.appendChild(el('span', { class: 'service-num', 'aria-hidden': 'true' }, (i < 9 ? '0' : '') + (i + 1)));
    li.appendChild(el('h3', {}, s.name));

    var body = el('div');
    body.appendChild(el('p', { class: 'service-desc' }, s.description));
    var meta = el('p', { class: 'service-meta' });
    meta.appendChild(el('span', {}, s.duration || 'Duration on enquiry'));
    if (s.price) meta.appendChild(el('span', { class: 'service-price' }, s.price));
    body.appendChild(meta);
    li.appendChild(body);

    var link = el('a', { class: 'text-link', href: '#enquire', 'data-service': s.name }, data.bookingUrl ? 'Book' : 'Enquire');
    if (data.bookingUrl) { link.href = data.bookingUrl; link.target = '_blank'; link.rel = 'noopener'; }
    link.setAttribute('aria-label', (data.bookingUrl ? 'Book ' : 'Enquire about ') + s.name);
    li.appendChild(link);
    if (serviceList) serviceList.appendChild(li);

    if (serviceSelect) serviceSelect.appendChild(el('option', { value: s.name }, s.name));
  });
  if (serviceList && !data.bookingUrl) {
    serviceList.addEventListener('click', function (e) {
      var a = e.target.closest('[data-service]');
      if (a && serviceSelect) serviceSelect.value = a.getAttribute('data-service');
    });
  }

  /* ---------- Gallery + viewer ---------- */
  var grid = $('#gallery-grid');
  var gallery = data.gallery || [];
  gallery.forEach(function (g, i) {
    var btn = el('button', { class: 'shot reveal', type: 'button', 'data-index': i, 'aria-label': 'View larger: ' + g.alt });
    btn.appendChild(el('img', { src: g.src, alt: g.alt, width: g.w, height: g.h, loading: 'lazy', decoding: 'async' }));
    if (grid) grid.appendChild(btn);
  });
  var note = $('#gallery-note');
  if (note && data.galleryIsPlaceholder) note.hidden = false;

  var viewer = $('#viewer');
  if (viewer && grid && typeof viewer.showModal === 'function') {
    var vImg = $('img', viewer);
    var vCount = $('.viewer-count', viewer);
    var current = 0;
    var show = function (i) {
      current = (i + gallery.length) % gallery.length;
      vImg.src = gallery[current].src;
      vImg.alt = gallery[current].alt;
      vCount.textContent = (current + 1) + ' / ' + gallery.length;
    };
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.shot');
      if (!b) return;
      show(Number(b.getAttribute('data-index')));
      viewer.showModal();
    });
    viewer.addEventListener('click', function (e) {
      var action = e.target.closest('[data-viewer]');
      if (action) {
        var a = action.getAttribute('data-viewer');
        if (a === 'close') viewer.close(); else show(current + (a === 'next' ? 1 : -1));
      } else if (e.target === viewer) {
        viewer.close();
      }
    });
    viewer.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') show(current + 1);
      if (e.key === 'ArrowLeft') show(current - 1);
    });
    var touchX = null;
    viewer.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive: true });
    viewer.addEventListener('touchend', function (e) {
      if (touchX === null) return;
      var dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
      touchX = null;
    });
  }

  /* ---------- Portrait ---------- */
  var portrait = $('#portrait');
  if (portrait && data.portrait) {
    portrait.textContent = '';
    portrait.appendChild(el('img', { src: data.portrait, alt: data.portraitAlt || '', loading: 'lazy' }));
  }

  /* ---------- Reviews ---------- */
  var reviewGrid = $('#review-grid');
  (data.reviews || []).forEach(function (r) {
    var fig = el('figure', { class: 'review reveal' });
    var isQuote = r.type === 'quote';
    fig.appendChild(el(isQuote ? 'blockquote' : 'div')).appendChild(el('p', {}, isQuote ? '“' + r.text + '”' : r.text));
    fig.appendChild(el('footer', {}, isQuote && r.author ? r.author + ' · Google review' : 'From Google reviews'));
    if (reviewGrid) reviewGrid.appendChild(fig);
  });
  var foot = $('#reviews-footnote');
  if (foot) foot.textContent = data.reviewsFootnote || '';

  /* ---------- Hours (today is worked out in Sydney time) ---------- */
  var today = null;
  try {
    var name = new Intl.DateTimeFormat('en-AU', { weekday: 'long', timeZone: 'Australia/Sydney' }).format(new Date());
    today = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(name);
  } catch (err) { today = new Date().getDay(); }

  ['#hours', '#hours-footer'].forEach(function (sel) {
    var dl = $(sel);
    if (!dl) return;
    (data.hours || []).forEach(function (h) {
      var row = el('div', h.day === today ? { class: 'is-today' } : {});
      row.appendChild(el('dt', {}, h.label));
      row.appendChild(el('dd', {}, h.open && h.close ? h.open + ' – ' + h.close : 'Closed'));
      dl.appendChild(row);
    });
  });

  /* ---------- Map ---------- */
  var map = $('#map-frame');
  if (map) {
    if (data.mapEmbedUrl) map.src = data.mapEmbedUrl; else map.parentNode.hidden = true;
  }

  /* ---------- Social icons: only for URLs that exist ---------- */
  var icons = {
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>',
    facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-3.5H14V7.5c0-1 .4-1.8 1.9-1.8H17.6V2.7C17 2.6 16 2.5 15 2.5c-2.7 0-4.4 1.6-4.4 4.5v2.5H7.5V13h3.1v8"/></svg>',
    tiktok: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5M14 3c.3 2.6 2 4.4 4.8 4.7"/></svg>'
  };
  var social = $('#social');
  Object.keys(data.social || {}).forEach(function (key) {
    var url = data.social[key];
    if (!url || !icons[key] || !social) return;
    var li = el('li');
    var a = el('a', { href: url, target: '_blank', rel: 'noopener', 'aria-label': (data.name || '') + ' on ' + key.charAt(0).toUpperCase() + key.slice(1) });
    a.innerHTML = icons[key];
    li.appendChild(a);
    social.appendChild(li);
  });

  /* ---------- Enquiry form ----------
     No endpoint configured → be honest and send the visitor to the phone instead. */
  var form = $('#enquiry-form');
  var status = $('#form-status');
  if (form) {
    var dateField = $('#f-date');
    if (dateField) dateField.min = new Date().toISOString().slice(0, 10);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      status.className = 'form-status';
      status.textContent = '';

      var invalid = $$('[required]', form).filter(function (f) {
        var bad = !f.value.trim();
        f.classList.toggle('is-invalid', bad);
        return bad;
      });
      if (invalid.length) {
        status.textContent = 'Please add your name and phone number.';
        invalid[0].focus();
        return;
      }

      var cfg = data.form || {};
      if (!cfg.endpoint) {
        status.className = 'form-status is-notice';
        status.innerHTML = 'Online enquiries aren\'t switched on yet, so this hasn\'t been sent. Please call <a href="' + data.phoneLink + '">' + data.phoneDisplay + '</a> to book.';
        return;
      }

      var body = new FormData(form);
      if (cfg.accessKey) body.append('access_key', cfg.accessKey);
      body.append('subject', 'New enquiry from the ' + (data.name || '') + ' website');
      var button = $('button[type="submit"]', form);
      button.disabled = true;
      status.textContent = 'Sending…';

      fetch(cfg.endpoint, { method: 'POST', body: body, headers: { Accept: 'application/json' } })
        .then(function (res) {
          if (!res.ok) throw new Error('Request failed');
          form.reset();
          status.className = 'form-status is-notice';
          status.textContent = 'Thank you. Your enquiry has been sent and we\'ll be in touch soon.';
        })
        .catch(function () {
          status.className = 'form-status is-notice';
          status.innerHTML = 'Sorry, that didn\'t send. Please call <a href="' + data.phoneLink + '">' + data.phoneDisplay + '</a> instead.';
        })
        .then(function () { button.disabled = false; });
    });
  }

  /* ---------- Header + mobile menu ---------- */
  var header = $('.site-header');
  var toggle = $('.nav-toggle');
  var nav = $('#site-nav');
  var bar = $('#book-bar');
  var contact = $('#contact');

  function setNav(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    doc.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && header.classList.contains('nav-open')) setNav(false); });

  /* Header hairline on scroll; mobile booking bar appears after the hero and steps aside at the contact section */
  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 24);
    if (!bar) return;
    var pastHero = y > window.innerHeight * 0.6;
    var atContact = contact && contact.getBoundingClientRect().top < window.innerHeight * 0.75;
    var shown = pastHero && !atContact;
    bar.classList.toggle('is-shown', shown);
    bar.setAttribute('aria-hidden', String(!shown));
    $$('a', bar).forEach(function (a) { a.tabIndex = shown ? 0 : -1; });
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (n) { io.observe(n); });
  } else {
    reveals.forEach(function (n) { n.classList.add('is-in'); });
  }
})();
