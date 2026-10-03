/* Salt and Butter Cafe — behaviour. Content comes from js/business-data.js (window.SB_DATA). */
(function () {
  'use strict';

  var data = window.SB_DATA || {};
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
  function setText(sel, value) { $$(sel).forEach(function (n) { if (value) n.textContent = value; }); }
  function setLink(sel, url) {
    $$(sel).forEach(function (n) {
      if (url) { n.href = url; n.hidden = false; } else { n.hidden = true; }
    });
  }

  /* ---------- Bind simple values ---------- */
  var addr = data.address || {};
  setText('[data-name]', data.businessName);
  setText('[data-address-1]', addr.line1);
  setText('[data-address-2]', addr.line2);
  setText('[data-address-3]', addr.country);
  setText('[data-phone-text]', data.phone);
  setLink('[data-phone-link]', data.phoneLink);            // Call buttons stay hidden without a verified number
  setLink('[data-directions]', data.directionsUrl || data.googleMapsUrl);
  setLink('[data-maps]', data.googleMapsUrl);
  setLink('[data-reviews]', data.reviewsUrl || data.googleMapsUrl);
  setLink('[data-booking]', data.bookingUrl);
  $$('[data-year]').forEach(function (n) { n.textContent = new Date().getFullYear(); });
  $$('[data-sample]').forEach(function (n) { n.hidden = !data.imagesArePlaceholders; });

  /* ---------- Menu ---------- */
  var tabs = $('#menu-tabs');
  var panels = $('#menu-panels');
  var categories = data.menuCategories || [];
  var items = data.menuItems || [];
  var anyTags = false;

  function selectTab(id, focus) {
    $$('.menu-tab', tabs).forEach(function (t) {
      var on = t.getAttribute('data-id') === id;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    $$('.menu-panel', panels).forEach(function (p) {
      var on = p.getAttribute('data-id') === id;
      p.hidden = !on;
      p.classList.toggle('is-entering', on);
    });
  }

  categories.forEach(function (cat, i) {
    var list = items.filter(function (it) { return it.category === cat.id; });
    if (!list.length || !tabs || !panels) return;

    var tab = el('button', { class: 'menu-tab', type: 'button', role: 'tab', id: 'tab-' + cat.id, 'data-id': cat.id, 'aria-controls': 'panel-' + cat.id, 'aria-selected': 'false', tabindex: '-1' }, cat.label);
    tabs.appendChild(tab);

    var panel = el('div', { class: 'menu-panel', role: 'tabpanel', id: 'panel-' + cat.id, 'data-id': cat.id, 'aria-labelledby': 'tab-' + cat.id });
    panel.hidden = true;
    list.forEach(function (it) {
      var dish = el('article', { class: 'dish' });
      var top = el('div', { class: 'dish-top' });
      var h = el('h3', {}, it.name);
      (it.tags || []).forEach(function (t) { anyTags = true; h.appendChild(doc.createTextNode(' ')); h.appendChild(el('span', { class: 'tag' }, t)); });
      top.appendChild(h);
      if (it.price) {
        top.appendChild(el('span', { class: 'dish-dots', 'aria-hidden': 'true' }));
        top.appendChild(el('span', { class: 'dish-price' }, it.price));
      }
      dish.appendChild(top);
      if (it.description) dish.appendChild(el('p', {}, it.description));
      panel.appendChild(dish);
    });
    panels.appendChild(panel);
  });

  if (tabs && tabs.firstChild) {
    selectTab(tabs.firstChild.getAttribute('data-id'));
    tabs.addEventListener('click', function (e) {
      var t = e.target.closest('.menu-tab');
      if (t) selectTab(t.getAttribute('data-id'));
    });
    tabs.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      var all = $$('.menu-tab', tabs);
      var i = all.indexOf(doc.activeElement);
      var next = all[(i + (e.key === 'ArrowRight' ? 1 : -1) + all.length) % all.length];
      selectTab(next.getAttribute('data-id'), true);
    });
  }
  var menuNote = $('#menu-note');
  if (menuNote) menuNote.hidden = !data.menuIsSample;
  var tagKey = $('#tag-key');
  if (tagKey) tagKey.hidden = !anyTags;

  /* "View full menu": the PDF if there is one, otherwise the online ordering page */
  var fullMenu = $('#full-menu');
  var order = $('#order-online');
  var fullUrl = data.menuPdf || data.orderingUrl;
  if (fullMenu && fullUrl) { fullMenu.href = fullUrl; fullMenu.hidden = false; }
  if (order && data.orderingUrl && data.menuPdf) { order.href = data.orderingUrl; order.hidden = false; }

  /* ---------- Gallery + viewer ---------- */
  var grid = $('#gallery-grid');
  var gallery = data.galleryImages || [];
  gallery.forEach(function (g, i) {
    var btn = el('button', { class: 'shot reveal', type: 'button', 'data-index': i, 'aria-label': 'View larger: ' + g.alt });
    btn.appendChild(el('img', { src: g.src, alt: g.alt, width: g.w, height: g.h, loading: 'lazy', decoding: 'async' }));
    if (grid) grid.appendChild(btn);
  });

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

  /* ---------- Reviews ---------- */
  var reviewList = $('#review-list');
  (data.reviews || []).forEach(function (r) {
    var fig = el('figure', { class: 'review reveal' });
    fig.appendChild(el('blockquote', { style: 'margin:0' })).appendChild(el('p', {}, '“' + r.text + '”'));
    fig.appendChild(el('footer', {}, r.author ? r.author + ' · Google review' : 'Google review'));
    if (reviewList) reviewList.appendChild(fig);
  });
  var ratingLine = $('#rating-line');
  if (ratingLine && data.rating) {
    ratingLine.appendChild(el('strong', {}, data.rating));
    ratingLine.appendChild(doc.createTextNode('on Google' + (data.reviewCount ? ', from ' + data.reviewCount + ' reviews' : '')));
  }

  /* ---------- Opening hours (worked out in Sydney time, wherever the visitor is) ---------- */
  function fmt(hhmm) {
    var p = hhmm.split(':'), h = Number(p[0]), m = p[1];
    return ((h % 12) || 12) + (m === '00' ? '' : ':' + m) + (h < 12 ? ' am' : ' pm');
  }
  function sydneyNow() {
    try {
      var parts = new Intl.DateTimeFormat('en-AU', { timeZone: 'Australia/Sydney', weekday: 'long', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' }).formatToParts(new Date());
      var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
      return { day: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].indexOf(get('weekday')), mins: Number(get('hour')) * 60 + Number(get('minute')) };
    } catch (err) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMins = function (hhmm) { var p = hhmm.split(':'); return Number(p[0]) * 60 + Number(p[1]); };
  var hours = data.openingHours || [];
  var now = sydneyNow();

  var dl = $('#hours');
  hours.forEach(function (h) {
    var row = el('div', h.day === now.day ? { class: 'is-today' } : {});
    row.appendChild(el('dt', {}, h.label));
    row.appendChild(el('dd', {}, h.open ? fmt(h.open) + ' – ' + fmt(h.close) : 'Closed'));
    if (dl) dl.appendChild(row);
  });
  setText('#hours-note', data.hoursNote);

  function status() {
    var byDay = {};
    hours.forEach(function (h) { byDay[h.day] = h; });
    var today = byDay[now.day];
    if (today && today.open && now.mins >= toMins(today.open) && now.mins < toMins(today.close)) {
      return { open: true, text: 'Open now · until ' + fmt(today.close) };
    }
    if (today && today.open && now.mins < toMins(today.open)) return { open: false, text: 'Closed now · opens ' + fmt(today.open) };
    for (var i = 1; i <= 7; i++) {
      var next = byDay[(now.day + i) % 7];
      if (next && next.open) return { open: false, text: 'Closed now · opens ' + fmt(next.open) + (i === 1 ? ' tomorrow' : ' ' + next.label) };
    }
    return null;
  }
  var st = hours.length ? status() : null;
  ['#open-status', '#hours-status'].forEach(function (sel) {
    var n = $(sel);
    if (!n || !st) return;
    n.appendChild(el('span', { class: 'dot' + (st.open ? ' is-open' : ''), 'aria-hidden': 'true' }));
    n.appendChild(doc.createTextNode(st.text));
  });

  /* Footer summary: "Open daily" when every day matches, otherwise leave the static text */
  var summary = $('#hours-summary');
  if (summary && hours.length === 7 && hours.every(function (h) { return h.open && h.open === hours[0].open && h.close === hours[0].close; })) {
    summary.textContent = '';
    summary.appendChild(doc.createTextNode('Open daily'));
    summary.appendChild(el('br'));
    summary.appendChild(doc.createTextNode(fmt(hours[0].open) + ' – ' + fmt(hours[0].close)));
  } else if (summary && hours.length) {
    summary.textContent = 'See opening hours above';
  }

  /* ---------- Map ---------- */
  var map = $('#map-frame');
  if (map) { if (data.mapEmbedUrl) map.src = data.mapEmbedUrl; else map.parentNode.hidden = true; }

  /* ---------- Contact links + social icons: only what exists ---------- */
  var links = $('#visit-links');
  [
    [data.email ? 'mailto:' + data.email : '', data.email],
    [data.orderingUrl, 'Order online'],
    [data.instagramUrl, 'Instagram'],
    [data.facebookUrl, 'Facebook']
  ].forEach(function (pair) {
    if (!pair[0] || !links) return;
    var a = el('a', { href: pair[0] }, pair[1]);
    if (pair[0].indexOf('mailto:') !== 0) { a.target = '_blank'; a.rel = 'noopener'; }
    links.appendChild(el('li')).appendChild(a);
  });

  var icons = {
    Instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="4.5"/><circle cx="12" cy="12" r="4"/><circle cx="17.2" cy="6.8" r=".6" fill="currentColor"/></svg>',
    Facebook: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 21v-8h3l.5-3.5H14V7.500c0-1 .4-1.800 1.900-1.800h1.700V2.700c-.6-.1-1.600-.2-2.600-.2-2.700 0-4.400 1.600-4.400 4.500v2.500H7.500V13h3.100v8"/></svg>'
  };
  var social = $('#social');
  [['Instagram', data.instagramUrl], ['Facebook', data.facebookUrl]].forEach(function (s) {
    if (!s[1] || !social) return;
    var a = el('a', { href: s[1], target: '_blank', rel: 'noopener', 'aria-label': (data.businessName || '') + ' on ' + s[0] });
    a.innerHTML = icons[s[0]];
    social.appendChild(el('li')).appendChild(a);
  });

  /* ---------- Header, mobile menu, action bar ---------- */
  var header = $('.site-header');
  var toggle = $('.nav-toggle');
  var nav = $('#site-nav');
  var bar = $('#action-bar');
  var footer = $('.site-footer');

  function setNav(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    doc.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () { setNav(toggle.getAttribute('aria-expanded') !== 'true'); });
  nav.addEventListener('click', function (e) { if (e.target.closest('a')) setNav(false); });
  doc.addEventListener('keydown', function (e) { if (e.key === 'Escape' && header.classList.contains('nav-open')) setNav(false); });

  var ticking = false;
  function onScroll() {
    ticking = false;
    var y = window.scrollY;
    header.classList.toggle('is-scrolled', y > 40);
    if (!bar) return;
    var pastHero = y > window.innerHeight * 0.55;
    var atFooter = footer && footer.getBoundingClientRect().top < window.innerHeight - 40;
    bar.classList.toggle('is-shown', pastHero && !atFooter);
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
