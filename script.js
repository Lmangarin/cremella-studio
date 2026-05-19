/* ===========================
   Cremella Studio — Scripts
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --- Navigation: scroll shadow & active link --- */
  const nav = document.querySelector('.site-nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 10);
    updateActiveNav();
  }, { passive: true });

  function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.scrollY + 100;
    let current = '';

    sections.forEach(section => {
      if (scrollY >= section.offsetTop) current = section.id;
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  }

  /* --- Mobile hamburger --- */
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');

  hamburger?.addEventListener('click', () => {
    const open = navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', open);
    const [top, mid, bot] = hamburger.querySelectorAll('span');
    if (open) {
      top.style.transform = 'translateY(8px) rotate(45deg)';
      mid.style.opacity   = '0';
      bot.style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
      top.style.transform = '';
      mid.style.opacity   = '';
      bot.style.transform = '';
    }
  });

  // close mobile menu on nav link click
  navLinks?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      hamburger?.querySelectorAll('span').forEach(s => (s.style.transform = s.style.opacity = ''));
    });
  });

  /* --- Gallery filters --- */
  const filterBtns  = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const match = filter === 'all' || item.dataset.category === filter;
        if (match) {
          item.removeAttribute('data-hidden');
        } else {
          item.setAttribute('data-hidden', '');
        }
      });
    });
  });

  /* --- Gallery lightbox --- */
  const lightbox      = document.getElementById('lightbox');
  const lbEmoji       = document.getElementById('lb-emoji');
  const lbTitle       = document.getElementById('lb-title');
  const lbDesc        = document.getElementById('lb-desc');
  const lbTag         = document.getElementById('lb-tag');
  const lbClose       = document.getElementById('lb-close');

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      lbEmoji.textContent = item.querySelector('.gallery-thumb').textContent.trim();
      lbTitle.textContent = item.querySelector('h3').textContent;
      lbDesc.textContent  = item.querySelector('p').textContent;
      lbTag.textContent   = item.querySelector('.gallery-tag').textContent;
      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  }

  lbClose?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

  /* --- Contact form --- */
  const contactForm = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success');

  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    // Simulate form submission
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
  });

  /* --- Scroll-reveal animations --- */
  const revealEls = document.querySelectorAll(
    '.about-card, .gallery-item, .workshop-card, .contact-form'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealEls.forEach(el => {
      el.style.opacity   = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }

});
