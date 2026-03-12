document.addEventListener('DOMContentLoaded', () => {

  // Navbar: transparent over hero, solid on scroll
  const navbar = document.getElementById('navbar');
  const hero = document.querySelector('.hero');

  function checkScroll() {
    const threshold = hero ? hero.offsetHeight * 0.5 : 300;
    navbar.classList.toggle('scrolled', window.scrollY > threshold);
  }

  window.addEventListener('scroll', checkScroll, { passive: true });
  checkScroll();


  // Search tabs
  const tabs = document.querySelectorAll('.search-tab');
  const forms = document.querySelectorAll('.search-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      forms.forEach(f => f.classList.toggle('active', f.dataset.form === target));
    });
  });

  // Save/favorite toggle
  document.querySelectorAll('.card-save').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      btn.classList.toggle('saved');
      const svg = btn.querySelector('svg');
      svg.setAttribute('fill', btn.classList.contains('saved') ? 'currentColor' : 'none');
    });
  });

  // Scroll reveal with stagger per group
  const sections = document.querySelectorAll('.dest-grid, .deals-grid, .hotels-scroll, .features-grid, .stats-grid');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const children = entry.target.children;
        Array.from(children).forEach((child, i) => {
          child.style.transitionDelay = `${i * 80}ms`;
          child.classList.add('visible');
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(section => {
    Array.from(section.children).forEach(child => {
      child.classList.add('reveal');
    });
    observer.observe(section);
  });

  // Newsletter
  const form = document.querySelector('.newsletter-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');
      if (input.value.trim()) {
        const orig = btn.textContent;
        btn.textContent = 'Subscribed!';
        btn.style.background = '#16a34a';
        input.value = '';
        setTimeout(() => { btn.textContent = orig; btn.style.background = ''; }, 2500);
      }
    });
  }

  // Nav active state
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  // Typewriter
  const typewriterEl = document.getElementById('typewriter');
  if (typewriterEl) {
    const phrases = [
      'Bali',
      'Paris',
      'Tokyo',
      'Santorini',
      'Tbilisi',
      'New York',
      'Maldives',
      'Barcelona',
      'Dubai',
      'the Swiss Alps',
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let pauseTimer = 0;

    function tick() {
      const current = phrases[phraseIndex];

      if (!isDeleting) {
        typewriterEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === current.length) {
          pauseTimer = setTimeout(() => { isDeleting = true; tick(); }, 2200);
          return;
        }
        setTimeout(tick, 70 + Math.random() * 40);
      } else {
        typewriterEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          setTimeout(tick, 400);
          return;
        }
        setTimeout(tick, 35);
      }
    }

    setTimeout(tick, 600);
  }

});
