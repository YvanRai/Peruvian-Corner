// =============================================
// PERUVIAN CORNER HAWAII — SHARED SCRIPTS
// =============================================

document.addEventListener('DOMContentLoaded', () => {

  // --- Mobile hamburger menu ---
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('open');
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
