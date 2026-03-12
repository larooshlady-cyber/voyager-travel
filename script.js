document.addEventListener('DOMContentLoaded', () => {

  // Hero intro
  const hero = document.querySelector('.hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('hero-animate'));
  }

  // Navbar scroll
  const navbar = document.getElementById('navbar');
  const heroSection = document.querySelector('.hero');
  const scrollThreshold = heroSection ? heroSection.offsetHeight * 0.5 : 300;

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > scrollThreshold);
  }, { passive: true });

  // Search tabs
  document.querySelectorAll('.search-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.search-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      document.querySelectorAll('.search-form').forEach(f => {
        f.classList.toggle('active', f.dataset.form === tab.dataset.tab);
      });
    });
  });

  // Save/favorite
  document.querySelectorAll('.card-save').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('saved');
      btn.querySelector('svg').setAttribute('fill', btn.classList.contains('saved') ? 'currentColor' : 'none');
    });
  });

  // Scroll reveal
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      Array.from(entry.target.children).forEach((child, i) => {
        child.style.transitionDelay = `${i * 60}ms`;
        child.classList.add('visible');
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.dest-bento, .deals-grid, .hotels-scroll, .features-grid, .stats-grid').forEach(section => {
    Array.from(section.children).forEach(child => child.classList.add('reveal'));
    observer.observe(section);
  });

  // FAQ accordion
  function openFaq(item) {
    const panel = item.querySelector('.faq-panel');
    item.classList.add('is-open');
    item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'true');
    panel.style.maxHeight = panel.scrollHeight + 'px';
    panel.style.opacity = '1';
  }

  function closeFaq(item) {
    const panel = item.querySelector('.faq-panel');
    panel.style.maxHeight = panel.scrollHeight + 'px';
    panel.offsetHeight; // force reflow
    panel.style.maxHeight = '0';
    panel.style.opacity = '0';
    item.classList.remove('is-open');
    item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
  }

  document.querySelectorAll('[data-faq]').forEach(item => {
    item.querySelector('.faq-trigger').addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // Close all others
      document.querySelectorAll('[data-faq].is-open').forEach(other => {
        if (other !== item) closeFaq(other);
      });
      // Toggle clicked
      if (isOpen) closeFaq(item);
      else openFaq(item);
    });
  });

  // Newsletter
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (!input.value.trim()) return;
      const orig = btn.textContent;
      btn.textContent = 'Subscribed!';
      btn.style.background = '#16a34a';
      input.value = '';
      setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2500);
    });
  }

  // Typewriter
  const el = document.getElementById('typewriter');
  if (el) {
    const words = ['Bali', 'Paris', 'Tokyo', 'Santorini', 'Tbilisi', 'New York', 'Maldives', 'Barcelona', 'Dubai', 'the Swiss Alps'];
    let wi = 0, ci = 0, deleting = false;

    function tick() {
      const word = words[wi];
      el.textContent = word.substring(0, deleting ? --ci : ++ci);

      if (!deleting && ci === word.length) return setTimeout(() => { deleting = true; tick(); }, 2200);
      if (deleting && ci === 0) { deleting = false; wi = (wi + 1) % words.length; return setTimeout(tick, 400); }
      setTimeout(tick, deleting ? 35 : 70 + Math.random() * 40);
    }

    setTimeout(tick, 1800);
  }

  // Search results: filter sidebar toggle
  const filterToggle = document.getElementById('filterToggle');
  const filterClose = document.getElementById('filterClose');
  const filterOverlay = document.getElementById('filterOverlay');
  const filtersSidebar = document.getElementById('filtersSidebar');

  function toggleFilters() {
    filtersSidebar?.classList.toggle('show');
    filterOverlay?.classList.toggle('show');
  }

  filterToggle?.addEventListener('click', toggleFilters);
  filterClose?.addEventListener('click', toggleFilters);
  filterOverlay?.addEventListener('click', toggleFilters);

  // Toggle buttons (star, guest rating)
  document.querySelectorAll('.star-btn, .guest-rating-btn').forEach(btn => {
    btn.addEventListener('click', () => btn.classList.toggle('active'));
  });

  // Clear filters
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    document.querySelectorAll('.star-btn.active, .guest-rating-btn.active').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.filter-check input').forEach(c => { c.checked = false; });
  });

});
