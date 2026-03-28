// ============================
// LANGUAGE SWITCHING
// ============================
const langToggle = document.getElementById('langToggle');
let currentLang = 'pl';

function setLang(lang) {
  currentLang = lang;
  document.body.setAttribute('data-lang', lang);
  document.documentElement.lang = lang;

  // Update toggle button text — shows the OTHER language
  langToggle.textContent = lang === 'pl' ? 'EN' : 'PL';
  langToggle.classList.toggle('active', lang === 'en');

  // Swap all translatable elements
  document.querySelectorAll('[data-pl][data-en]').forEach(el => {
    el.innerHTML = el.getAttribute(`data-${lang}`);
  });

  // Update page title
  document.title = lang === 'pl'
    ? 'PIOTR SIKORSKI — Scenarzysta / Copywriter'
    : 'PIOTR SIKORSKI — Screenwriter / Copywriter';
}

langToggle.addEventListener('click', () => {
  setLang(currentLang === 'pl' ? 'en' : 'pl');
});

// ============================
// CAROUSEL
// ============================
const carousel = document.getElementById('carousel');
const slides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const currentSlideEl = document.getElementById('currentSlide');
const totalSlidesEl = document.getElementById('totalSlides');

let currentIndex = 0;
const total = slides.length;

totalSlidesEl.textContent = String(total).padStart(2, '0');

function goToSlide(index) {
  if (index < 0) index = total - 1;
  if (index >= total) index = 0;
  currentIndex = index;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
  currentSlideEl.textContent = String(currentIndex + 1).padStart(2, '0');
}

prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

// Keyboard arrows
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
  if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
});

// Touch swipe
let touchStartX = 0;
const carouselWrap = document.querySelector('.carousel-wrap');

carouselWrap.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });

carouselWrap.addEventListener('touchend', (e) => {
  const diff = touchStartX - e.changedTouches[0].screenX;
  if (Math.abs(diff) > 50) {
    if (diff > 0) goToSlide(currentIndex + 1);
    else goToSlide(currentIndex - 1);
  }
}, { passive: true });

// ============================
// SCROLL REVEAL
// ============================
const revealEls = document.querySelectorAll(
  '.section-label, .section-title, .about-big, .about-quote, .spec-item, .offer-row, .project-item, .result-block, .contact-inner, .stats-strip .stat'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -30px 0px'
});

revealEls.forEach(el => observer.observe(el));

// Stagger children in grids
document.querySelectorAll('.specs-row, .results-row, .stats-strip').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.style.transitionDelay = `${i * 0.08}s`;
  });
});

// ============================
// SMOOTH NAV SCROLL
// ============================
document.querySelectorAll('#nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
