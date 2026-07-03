/* ============================================================
   Navbar shrink-on-scroll
   ============================================================ */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

/* ============================================================
   Hero carousel
   ============================================================ */
const heroSlidesEl = document.getElementById('heroSlides');
const heroDotsEl = document.getElementById('heroDots');
const heroEyebrow = document.getElementById('heroEyebrow');
const heroTitle = document.getElementById('heroTitle');
const heroMeta = document.getElementById('heroMeta');
const heroDesc = document.getElementById('heroDesc');

let currentSlide = 0;
let heroTimer = null;

function buildHeroSlides() {
  HERO_SLIDES.forEach((slide, i) => {
    const div = document.createElement('div');
    div.className = 'hero-slide' + (i === 0 ? ' active' : '');
    div.style.background = slide.gradient;
    heroSlidesEl.appendChild(div);

    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goToSlide(i));
    heroDotsEl.appendChild(dot);
  });
}

function renderHeroText(slide) {
  // restart the fade-up animations
  [heroEyebrow, heroTitle, heroMeta, heroDesc].forEach(el => {
    el.style.animation = 'none';
    void el.offsetWidth; // reflow to restart animation
  });
  heroEyebrow.textContent = slide.eyebrow;
  heroTitle.textContent = slide.title;
  heroMeta.textContent = slide.meta;
  heroDesc.textContent = slide.desc;
  requestAnimationFrame(() => {
    heroEyebrow.style.animation = '';
    heroTitle.style.animation = '';
    heroMeta.style.animation = '';
    heroDesc.style.animation = '';
  });
}

function goToSlide(index) {
  const slidesEls = document.querySelectorAll('.hero-slide');
  const dotEls = document.querySelectorAll('.hero-dot');
  slidesEls[currentSlide].classList.remove('active');
  dotEls[currentSlide].classList.remove('active');

  currentSlide = index;

  slidesEls[currentSlide].classList.add('active');
  dotEls[currentSlide].classList.add('active');
  renderHeroText(HERO_SLIDES[currentSlide]);
  resetHeroTimer();
}

function nextSlide() {
  goToSlide((currentSlide + 1) % HERO_SLIDES.length);
}

function resetHeroTimer() {
  clearInterval(heroTimer);
  heroTimer = setInterval(nextSlide, 6000);
}

/* ============================================================
   Content rows
   ============================================================ */
const rowsContainer = document.getElementById('rowsContainer');

function buildRows() {
  ROWS.forEach((row, rowIndex) => {
    const section = document.createElement('section');
    section.className = 'row';

    const heading = document.createElement('div');
    heading.className = 'row-heading';
    heading.innerHTML = `
      <span>${row.heading}</span>
      <span class="see-more">
        See more
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
      </span>
    `;
    section.appendChild(heading);

    const wrap = document.createElement('div');
    wrap.className = 'row-scroll-wrap';

    const leftArrow = document.createElement('button');
    leftArrow.className = 'row-arrow left';
    leftArrow.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>`;
    leftArrow.setAttribute('aria-label', 'Scroll left');

    const rightArrow = document.createElement('button');
    rightArrow.className = 'row-arrow right';
    rightArrow.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>`;
    rightArrow.setAttribute('aria-label', 'Scroll right');

    const track = document.createElement('div');
    track.className = 'row-track';

    row.items.forEach(item => {
      const card = document.createElement('div');
      card.className = 'card' + (row.progress ? ' wide' : '');

      const progressFill = row.progress ? Math.floor(Math.random() * 80) + 10 : null;

      card.innerHTML = `
        <img src="${item.img}" alt="${item.title}" loading="lazy" />
        <div class="card-overlay">
          <div class="card-play">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </div>
          <div class="card-title">${item.title}</div>
        </div>
        ${row.progress ? `<div class="progress-bar-track"><div class="progress-bar-fill" style="width:${progressFill}%"></div></div>` : ''}
      `;
      track.appendChild(card);
    });

    leftArrow.addEventListener('click', () => {
      track.scrollBy({ left: -600, behavior: 'smooth' });
    });
    rightArrow.addEventListener('click', () => {
      track.scrollBy({ left: 600, behavior: 'smooth' });
    });

    wrap.appendChild(leftArrow);
    wrap.appendChild(track);
    wrap.appendChild(rightArrow);
    section.appendChild(wrap);
    rowsContainer.appendChild(section);
  });
}

/* ============================================================
   Init
   ============================================================ */
buildHeroSlides();
renderHeroText(HERO_SLIDES[0]);
resetHeroTimer();
buildRows();

// Pause hero autoplay when tab is hidden (perf/courtesy)
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(heroTimer);
  } else {
    resetHeroTimer();
  }
});
