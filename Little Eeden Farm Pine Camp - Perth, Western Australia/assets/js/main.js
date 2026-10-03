(function () {
  var doc = document.documentElement;
  doc.classList.add('js');

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('.site-header');

  /* Header: solid once we've scrolled off the hero photo */
  function onScroll() {
    header.classList.toggle('is-scrolled', window.scrollY > 60);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Mobile menu */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  function setNav(open) {
    header.classList.toggle('nav-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  }
  toggle.addEventListener('click', function () {
    setNav(toggle.getAttribute('aria-expanded') !== 'true');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) setNav(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && header.classList.contains('nav-open')) setNav(false);
  });

  /* Gentle reveals */
  var revealEls = document.querySelectorAll('.reveal, .reveal-img');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* Subtle parallax on the hero photo */
  var heroImg = document.querySelector('.hero-media img');
  if (heroImg && !reduceMotion) {
    var ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        heroImg.style.transform = 'translate3d(0,' + (y * -0.12) + 'px,0)';
        ticking = false;
      });
    }, { passive: true });
  }

  /* Lightbox for the photo journal */
  var box = document.querySelector('.lightbox');
  if (box && typeof box.showModal === 'function') {
    var boxImg = box.querySelector('img');
    document.querySelectorAll('.snap-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var img = btn.querySelector('img');
        boxImg.src = btn.getAttribute('data-full');
        boxImg.alt = img.alt;
        box.showModal();
      });
    });
    box.querySelector('.lightbox-close').addEventListener('click', function () { box.close(); });
    box.addEventListener('click', function (e) { if (e.target === box) box.close(); });
  } else {
    // No <dialog> support: open the photo directly instead
    document.querySelectorAll('.snap-btn').forEach(function (btn) {
      btn.addEventListener('click', function () { window.open(btn.getAttribute('data-full'), '_blank'); });
    });
  }

  /* Footer year */
  var yr = document.querySelector('[data-year]');
  if (yr) yr.textContent = new Date().getFullYear();
})();
