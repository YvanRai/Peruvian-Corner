// =============================================
// PERUVIAN CORNER HAWAII — SHARED SCRIPTS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Site intro / welcome splash (homepage only) ---
  // Shows on a real reload of index.html, or on first arrival from outside the site.
  // Does NOT show when navigating here from another page of the same site (e.g. nav links).
  const siteIntro = document.getElementById('siteIntro');
  if (siteIntro) {
    const getNavigationType = () => {
      const entries = performance.getEntriesByType && performance.getEntriesByType('navigation');
      if (entries && entries.length && entries[0].type) return entries[0].type;
      if (performance.navigation) return ['navigate', 'reload', 'back_forward'][performance.navigation.type] || 'navigate';
      return 'navigate';
    };
    const isReload = getNavigationType() === 'reload';
    const cameFromSameSite = document.referrer && document.referrer.startsWith(location.origin);

    if (!isReload && cameFromSameSite) {
      siteIntro.remove();
    } else {
      const enterBtn = document.getElementById('siteIntroEnter');
      const introVideo = siteIntro.querySelector('.site-intro-video');

      document.documentElement.classList.add('intro-locked');
      enterBtn?.focus({ preventScroll: true });

      // Load only the matching orientation's video (avoids fetching both files)
      if (introVideo) {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        introVideo.src = isMobile ? 'images/Movile%20video.mp4' : 'images/PC%20video.mp4';
        introVideo.load();
        introVideo.play().catch(() => {});
      }

      const closeIntro = () => {
        siteIntro.classList.add('site-intro--closing');
        document.documentElement.classList.remove('intro-locked');
        introVideo?.pause();
        setTimeout(() => siteIntro.remove(), 900);
      };

      enterBtn?.addEventListener('click', closeIntro);
    }
  }

  // --- Mobile hamburger menu ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  // --- Dropdown menu (Menú) ---
  document.querySelectorAll('.nav-item.has-dropdown').forEach((item) => {
    const toggle = item.querySelector('.dropdown-toggle');

    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      const isOpen = item.classList.contains('open');

      // close other open dropdowns
      document.querySelectorAll('.nav-item.has-dropdown.open').forEach((other) => {
        if (other !== item) {
          other.classList.remove('open');
          other.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
        }
      });

      item.classList.toggle('open', !isOpen);
      toggle.setAttribute('aria-expanded', String(!isOpen));
    });
  });

  // close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    document.querySelectorAll('.nav-item.has-dropdown.open').forEach((item) => {
      if (!item.contains(e.target)) {
        item.classList.remove('open');
        item.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
      }
    });
  });

  // close mobile menu after clicking a link
  document.querySelectorAll('.nav-links a:not(.dropdown-toggle)').forEach((link) => {
    link.addEventListener('click', () => {
      if (navLinks && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        navToggle?.classList.remove('open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    });
  });

  // --- Nav shadow on scroll ---
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // --- Photo carousels (auto-advance + manual dot selection) ---
  document.querySelectorAll('.photo-carousel').forEach((carousel) => {
    const slides = carousel.querySelectorAll('.photo-carousel-slide');
    const dots = carousel.querySelectorAll('.photo-carousel-dot');
    if (slides.length < 2) return;

    const interval = parseInt(carousel.dataset.interval, 10) || 4500;
    let current = [...slides].findIndex((s) => s.classList.contains('active'));
    if (current < 0) current = 0;
    let timer;

    const show = (i) => {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    };
    const next = () => show((current + 1) % slides.length);
    const startAuto = () => {
      clearInterval(timer);
      timer = setInterval(next, interval);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        if (i === current) return;
        show(i);
        startAuto();
      });
    });

    startAuto();
  });

  // --- Why-us cards: staggered reveal sliding in from the right on scroll ---
  const whyCards = document.querySelectorAll('.why-card');
  if (whyCards.length) {
    const whyCardObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = [...whyCards].indexOf(card);
          setTimeout(() => card.classList.add('revealed'), index * 250);
          obs.unobserve(card);
        }
      });
    }, { threshold: 0.15 });

    whyCards.forEach((card) => whyCardObserver.observe(card));
  }

  // --- Active subnav highlight on menu page ---
  const subnavLinks = document.querySelectorAll('.subnav-link');
  const categories = document.querySelectorAll('.menu-category');

  if (subnavLinks.length && categories.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          subnavLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

    categories.forEach((cat) => observer.observe(cat));
  }

});
