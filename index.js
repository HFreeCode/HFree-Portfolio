/* ============================================================
   index.js  —  Portfolio Interactivity
   ============================================================
   Fill in your real content in the PROJECTS section below.
   Everything else runs automatically.
   ============================================================ */


/* ─────────────────────────────────────────────────────────────
   PROJECTS
   ─────────────────────────────────────────────────────────────
   Add one object per project. For `images`, provide paths
   relative to index.html (e.g. 'images/render-main.jpg').
   The first image is the hero; the next two are thumbnails.
   Leave as empty strings and placeholders will be shown.
   ───────────────────────────────────────────────────────────── */
const projects = [
  {
    id: 1,
    title:       '[Project Title One]',
    shortDesc:   '[A one-line tagline — the concept or subject of this piece.]',
    description: '[Longer description of this project. What was the concept? What were the technical challenges? What process did you follow? What did you learn or achieve?]',
    date:        '[Month YYYY]',
    price:       '£[0.00]',
    timeSpent:   '[X] hrs',
    triangles:   '[XXX,XXX]',
    polycount:   '[XXX,XXX]',
    renderer:    '[Cycles / EEVEE]',
    software:    ['Blender', '[Other]'],
    client:      '[Client or Personal]',
    category:    '[Category]',
    images:      ['', '', ''],  // paths: main image, then up to 2 more
  },
  {
    id: 2,
    title:       '[Project Title Two]',
    shortDesc:   '[A one-line tagline — the concept or subject of this piece.]',
    description: '[Longer description of this project.]',
    date:        '[Month YYYY]',
    price:       '£[0.00]',
    timeSpent:   '[X] hrs',
    triangles:   '[XXX,XXX]',
    polycount:   '[XXX,XXX]',
    renderer:    '[Cycles / EEVEE]',
    software:    ['Blender'],
    client:      '[Client or Personal]',
    category:    '[Category]',
    images:      ['', '', ''],
  },
  {
    id: 3,
    title:       '[Project Title Three]',
    shortDesc:   '[A one-line tagline — the concept or subject of this piece.]',
    description: '[Longer description of this project.]',
    date:        '[Month YYYY]',
    price:       '£[0.00]',
    timeSpent:   '[X] hrs',
    triangles:   '[XXX,XXX]',
    polycount:   '[XXX,XXX]',
    renderer:    '[Cycles / EEVEE]',
    software:    ['Blender', '[Other]'],
    client:      '[Client or Personal]',
    category:    '[Category]',
    images:      ['', '', ''],
  },
  {
    id: 4,
    title:       '[Project Title Four]',
    shortDesc:   '[A one-line tagline — the concept or subject of this piece.]',
    description: '[Longer description of this project.]',
    date:        '[Month YYYY]',
    price:       '£[0.00]',
    timeSpent:   '[X] hrs',
    triangles:   '[XXX,XXX]',
    polycount:   '[XXX,XXX]',
    renderer:    '[Cycles / EEVEE]',
    software:    ['Blender'],
    client:      '[Client or Personal]',
    category:    '[Category]',
    images:      ['', '', ''],
  },
  {
    id: 5,
    title:       '[Project Title Five]',
    shortDesc:   '[A one-line tagline — the concept or subject of this piece.]',
    description: '[Longer description of this project.]',
    date:        '[Month YYYY]',
    price:       '£[0.00]',
    timeSpent:   '[X] hrs',
    triangles:   '[XXX,XXX]',
    polycount:   '[XXX,XXX]',
    renderer:    '[Cycles / EEVEE]',
    software:    ['Blender', '[Other]'],
    client:      '[Client or Personal]',
    category:    '[Category]',
    images:      ['', '', ''],
  },
];


/* ─────────────────────────────────────────────────────────────
   FALLING LEAVES
   ─────────────────────────────────────────────────────────────
   Draws organic leaf shapes drifting down a fixed canvas.
   Overall opacity is set in CSS: #leaf-canvas { opacity: 0.45 }
   ───────────────────────────────────────────────────────────── */
function initLeaves() {
  const canvas = document.getElementById('leaf-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  const COLORS     = ['#3D6B35', '#4A7A42', '#2E5228', '#3A6B30', '#527A45', '#2C4E26'];
  const LEAF_COUNT = 22;

  // Each leaf is an object with position, speed, rotation, and sway state.
  const leaves = Array.from({ length: LEAF_COUNT }, () => ({
    x:          Math.random() * window.innerWidth,
    y:          Math.random() * window.innerHeight - window.innerHeight, // start above viewport
    size:       Math.random() * 9 + 5,          // 5–14 px
    speedY:     Math.random() * 0.55 + 0.22,    // vertical drift
    speedX:     (Math.random() - 0.5) * 0.22,   // slight horizontal drift
    rot:        Math.random() * Math.PI * 2,
    rotSpeed:   (Math.random() - 0.5) * 0.024,
    sway:       Math.random() * 0.6 + 0.2,      // sway amplitude
    swayPhase:  Math.random() * Math.PI * 2,
    swaySpeed:  Math.random() * 0.018 + 0.008,
    color:      COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha:      Math.random() * 0.45 + 0.12,
  }));

  let tick = 0;

  function drawLeaf(leaf) {
    const s = leaf.size;
    ctx.save();
    ctx.translate(leaf.x, leaf.y);
    ctx.rotate(leaf.rot);
    ctx.globalAlpha = leaf.alpha;
    ctx.fillStyle   = leaf.color;

    // Teardrop / leaf silhouette using two bezier curves
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo( s * 0.9, -s * 0.65,  s * 0.9,  s * 0.65, 0,  s);
    ctx.bezierCurveTo(-s * 0.9,  s * 0.65, -s * 0.9, -s * 0.65, 0, -s);
    ctx.fill();

    // Subtle midrib
    ctx.strokeStyle = 'rgba(0,0,0,0.10)';
    ctx.lineWidth   = 0.5;
    ctx.beginPath();
    ctx.moveTo(0, -s * 0.8);
    ctx.lineTo(0,  s * 0.8);
    ctx.stroke();

    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    tick++;

    leaves.forEach(leaf => {
      const sway = Math.sin(tick * leaf.swaySpeed + leaf.swayPhase) * leaf.sway;
      leaf.x   += leaf.speedX + sway;
      leaf.y   += leaf.speedY;
      leaf.rot += leaf.rotSpeed;

      // Wrap when below viewport
      if (leaf.y > canvas.height + leaf.size * 3) {
        leaf.y = -leaf.size * 3;
        leaf.x = Math.random() * canvas.width;
      }
      // Wrap horizontally
      if (leaf.x < -leaf.size * 3)                  leaf.x = canvas.width  + leaf.size;
      if (leaf.x >  canvas.width  + leaf.size * 3)  leaf.x = -leaf.size;

      drawLeaf(leaf);
    });

    requestAnimationFrame(animate);
  }

  animate();
}


/* ─────────────────────────────────────────────────────────────
   CAROUSEL
   ─────────────────────────────────────────────────────────────
   Builds slides from `projects`, handles arrows, dots, swipe.
   Each card shows: main image, 3 thumbnails, key meta,
   and a "View Details" button that opens the modal.
   ───────────────────────────────────────────────────────────── */
let currentSlide = 0;

function buildCarousel() {
  const track  = document.getElementById('carousel-track');
  const dotsCt = document.getElementById('carousel-dots');
  if (!track || !dotsCt) return;

  projects.forEach((project, i) => {
    /* ── card shell ── */
    const card = document.createElement('div');
    card.className = 'carousel-card';
    card.dataset.index = i;

    /* ── main image ── */
    const mainHTML = project.images[0]
      ? `<img class="carousel-main-img" id="slide-main-${i}"
              src="${project.images[0]}" alt="${project.title}" loading="lazy">`
      : `<div class="carousel-img-placeholder" id="slide-main-${i}">no image yet</div>`;

    /* ── thumbnails (up to 3) ── */
    const thumbsHTML = project.images.slice(0, 3).map((src, ti) =>
      src
        ? `<img class="carousel-thumb${ti === 0 ? ' active-thumb' : ''}"
                src="${src}" alt="${project.title} view ${ti + 1}"
                data-slide="${i}" data-thumb-index="${ti}" loading="lazy">`
        : `<div class="carousel-thumb-placeholder"></div>`
    ).join('');

    /* ── quick meta (4 facts shown on the card) ── */
    const metaHTML = [
      { label: 'Date',      value: project.date      },
      { label: 'Price',     value: project.price      },
      { label: 'Time',      value: project.timeSpent  },
      { label: 'Triangles', value: project.triangles  },
    ].map(m => `
      <div class="carousel-meta-item">
        <span class="meta-label">${m.label}</span>
        <span class="meta-value">${m.value}</span>
      </div>`).join('');

    card.innerHTML = `
      <div class="carousel-card-inner">
        <div class="carousel-card-images">
          ${mainHTML}
          <div class="carousel-thumbs">${thumbsHTML}</div>
        </div>
        <div class="carousel-card-info">
          <h3 class="carousel-title">${project.title}</h3>
          <p class="carousel-desc">${project.shortDesc}</p>
          <div class="carousel-meta-grid">${metaHTML}</div>
          <button class="carousel-open-btn" data-project-id="${project.id}">
            View Details →
          </button>
        </div>
      </div>`;

    track.appendChild(card);

    /* ── dot ── */
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('role', 'tab');
    dot.setAttribute('aria-label', `Project ${i + 1}: ${project.title}`);
    dot.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
    dot.addEventListener('click', () => goToSlide(i));
    dotsCt.appendChild(dot);
  });

  /* ── delegated click handling on the track ── */
  track.addEventListener('click', e => {
    // Thumbnail → swap main image
    const thumb = e.target.closest('.carousel-thumb');
    if (thumb) {
      e.stopPropagation();
      swapThumb(thumb);
      return;
    }
    // "View Details" button → open modal
    const openBtn = e.target.closest('.carousel-open-btn');
    if (openBtn) {
      e.stopPropagation();
      openModal(parseInt(openBtn.dataset.projectId));
      return;
    }
    // Clicking the main image area also opens modal
    const mainImg = e.target.closest('.carousel-card-images');
    if (mainImg) {
      const c = mainImg.closest('.carousel-card');
      if (c) openModal(projects[parseInt(c.dataset.index)].id);
    }
  });
}

/* Swap the main image on a carousel card when a thumbnail is clicked. */
function swapThumb(thumb) {
  const si  = parseInt(thumb.dataset.slide);
  const ti  = parseInt(thumb.dataset.thumbIndex);
  const src = projects[si]?.images[ti];
  if (!src) return;

  const card    = document.getElementById('carousel-track').children[si];
  const current = card.querySelector('#slide-main-' + si);

  if (current.tagName === 'IMG') {
    current.src = src;
  } else {
    // Replace placeholder div with real img
    const img = document.createElement('img');
    img.className = 'carousel-main-img';
    img.id        = `slide-main-${si}`;
    img.src       = src;
    img.alt       = projects[si].title;
    img.loading   = 'lazy';
    current.replaceWith(img);
  }

  // Highlight active thumb
  card.querySelectorAll('.carousel-thumb').forEach(t => t.classList.remove('active-thumb'));
  thumb.classList.add('active-thumb');
}

/* Move to a specific slide index. */
function goToSlide(index) {
  if (index === currentSlide || index < 0 || index >= projects.length) return;

  const track = document.getElementById('carousel-track');
  const dots  = document.querySelectorAll('.carousel-dot');

  dots[currentSlide].classList.remove('active');
  dots[currentSlide].setAttribute('aria-selected', 'false');

  currentSlide            = index;
  track.style.transform   = `translateX(-${currentSlide * 100}%)`;

  dots[currentSlide].classList.add('active');
  dots[currentSlide].setAttribute('aria-selected', 'true');
}

function prevSlide() { goToSlide((currentSlide - 1 + projects.length) % projects.length); }
function nextSlide() { goToSlide((currentSlide + 1) % projects.length); }

function initCarousel() {
  buildCarousel();

  const prevBtn = document.getElementById('carousel-prev');
  const nextBtn = document.getElementById('carousel-next');
  if (prevBtn) prevBtn.addEventListener('click', prevSlide);
  if (nextBtn) nextBtn.addEventListener('click', nextSlide);

  /* Keyboard nav when the carousel track wrapper is focused */
  const outer = document.getElementById('carousel-track-outer');
  if (outer) {
    outer.setAttribute('tabindex', '0');
    outer.setAttribute('aria-label', 'Project carousel. Use arrow keys to navigate.');
    outer.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { e.preventDefault(); prevSlide(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); nextSlide(); }
    });

    /* Touch / swipe support */
    let touchStartX = 0, touchStartY = 0;
    outer.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    outer.addEventListener('touchend', e => {
      const dx = touchStartX - e.changedTouches[0].clientX;
      const dy = touchStartY - e.changedTouches[0].clientY;
      // Only register horizontal swipes that are clearly intentional
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        dx > 0 ? nextSlide() : prevSlide();
      }
    }, { passive: true });
  }
}


/* ─────────────────────────────────────────────────────────────
   MODAL
   ─────────────────────────────────────────────────────────────
   Full-screen lightbox that shows all project details.
   Opens when "View Details" is clicked from the carousel
   or when a masonry card is clicked.
   ───────────────────────────────────────────────────────────── */
function openModal(projectId) {
  const project = projects.find(p => p.id === projectId);
  if (!project) return;

  /* Title */
  document.getElementById('modal-title').textContent = project.title;

  /* Main image */
  const mainWrap = document.getElementById('modal-main-img-wrap');
  mainWrap.innerHTML = project.images[0]
    ? `<img class="modal-main-img" id="modal-active-img"
            src="${project.images[0]}" alt="${project.title}">`
    : `<div class="modal-img-placeholder">no image yet</div>`;

  /* Thumbnails */
  const thumbsEl = document.getElementById('modal-thumbs');
  thumbsEl.innerHTML = '';
  project.images.forEach((src, i) => {
    if (src) {
      const img    = document.createElement('img');
      img.className = 'modal-thumb' + (i === 0 ? ' active-thumb' : '');
      img.src       = src;
      img.alt       = `${project.title} view ${i + 1}`;
      img.loading   = 'lazy';
      img.addEventListener('click', () => {
        const activeImg = document.getElementById('modal-active-img');
        if (activeImg) activeImg.src = src;
        thumbsEl.querySelectorAll('.modal-thumb').forEach(t => t.classList.remove('active-thumb'));
        img.classList.add('active-thumb');
      });
      thumbsEl.appendChild(img);
    } else {
      const ph    = document.createElement('div');
      ph.className = 'modal-thumb-placeholder';
      thumbsEl.appendChild(ph);
    }
  });

  /* Metadata grid — all the project details */
  const metaGrid   = document.getElementById('modal-meta-grid');
  const softwareStr = Array.isArray(project.software)
    ? project.software.join(', ')
    : project.software;

  metaGrid.innerHTML = [
    { label: 'Date',           value: project.date      },
    { label: 'Price Charged',  value: project.price      },
    { label: 'Time Spent',     value: project.timeSpent  },
    { label: 'Triangle Count', value: project.triangles  },
    { label: 'Polycount',      value: project.polycount  },
    { label: 'Renderer',       value: project.renderer   },
    { label: 'Software',       value: softwareStr        },
    { label: 'Client',         value: project.client     },
    { label: 'Category',       value: project.category   },
  ].map(m => `
    <div class="modal-meta-item">
      <span class="modal-meta-label">${m.label}</span>
      <span class="modal-meta-value">${m.value}</span>
    </div>`).join('');

  /* Description */
  document.getElementById('modal-desc').textContent = project.description;

  /* Open */
  document.getElementById('modal-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
  // Move focus to close button for accessibility
  setTimeout(() => document.getElementById('modal-close')?.focus(), 60);
}

function closeModal() {
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function initModal() {
  document.getElementById('modal-close')?.addEventListener('click', closeModal);

  // Click outside the modal panel closes it
  document.getElementById('modal-backdrop')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeModal();
  });
}


/* ─────────────────────────────────────────────────────────────
   MASONRY / VIEW ALL
   ─────────────────────────────────────────────────────────────
   Expands a masonry grid below the carousel when
   "View All Work" is clicked. Clicking any card in the
   grid opens that project's modal.
   ───────────────────────────────────────────────────────────── */
function buildMasonry() {
  const grid = document.getElementById('masonry-grid');
  if (!grid) return;
  grid.innerHTML = '';

  projects.forEach(project => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.setAttribute('role', 'button');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Open ${project.title}`);

    item.innerHTML = project.images[0]
      ? `<img src="${project.images[0]}" alt="${project.title}" loading="lazy">
         <div class="masonry-item-caption">${project.title} · ${project.date}</div>`
      : `<div class="masonry-img-placeholder" style="aspect-ratio:4/3">no image yet</div>
         <div class="masonry-item-caption">${project.title} · ${project.date}</div>`;

    const open = () => openModal(project.id);
    item.addEventListener('click', open);
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
    });

    grid.appendChild(item);
  });
}

function openMasonry() {
  buildMasonry();
  const section = document.getElementById('masonry-section');
  section.classList.add('open');
  // Smooth scroll to masonry grid so the user sees it
  setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}

function closeMasonry() {
  document.getElementById('masonry-section')?.classList.remove('open');
}

function initMasonry() {
  document.getElementById('view-all-btn')?.addEventListener('click', openMasonry);
  document.getElementById('masonry-close')?.addEventListener('click', closeMasonry);
}


/* ─────────────────────────────────────────────────────────────
   TABS
   ─────────────────────────────────────────────────────────────
   Switches between the three panels with animation.
   Also triggers typewriter and terminal animations on first open.
   ───────────────────────────────────────────────────────────── */
let typewriterDone   = false;
let terminalAnimated = false;

function initTabs() {
  const tabs   = document.querySelectorAll('.tab-btn');
  const panels = document.querySelectorAll('.tab-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      if (tab.classList.contains('active')) return; // already here

      /* Deactivate all */
      tabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      panels.forEach(p => p.classList.remove('active'));

      /* Activate target */
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      const panel = document.getElementById(`panel-${target}`);
      if (panel) panel.classList.add('active');

      // Wait for panelIn animation (420ms) then trigger scroll reveals
      setTimeout(() => {
        if (panel) observeReveals(panel);
      }, 450);

      /* Tab-specific animations */
      if (target === 'about' && !typewriterDone) {
        setTimeout(startTypewriter, 550);
      }

      if (target === 'software') {
        setTimeout(animateTerminal, 550);
      }
    });
  });
}


/* ─────────────────────────────────────────────────────────────
   SCROLL REVEAL
   ─────────────────────────────────────────────────────────────
   Watches .reveal elements and adds .visible when they enter
   the viewport, triggering the CSS fade-up transition.
   ───────────────────────────────────────────────────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.07 });

function observeReveals(scope = document) {
  scope.querySelectorAll('.reveal:not(.visible)').forEach(el => {
    revealObserver.observe(el);
  });
}


/* ─────────────────────────────────────────────────────────────
   TYPEWRITER
   ─────────────────────────────────────────────────────────────
   Types the bio text character by character into the
   #typewriter-text-content span. Text source is the
   data-text attribute on #about-tagline.
   ───────────────────────────────────────────────────────────── */
function startTypewriter() {
  if (typewriterDone) return;

  const tagline  = document.getElementById('about-tagline');
  const textEl   = document.getElementById('typewriter-text-content');
  if (!tagline || !textEl) return;

  const fullText = tagline.dataset.text || '';
  let i = 0;

  function tick() {
    if (i < fullText.length) {
      textEl.textContent = fullText.slice(0, ++i);
      setTimeout(tick, 26); // ~38 chars/second
    } else {
      typewriterDone = true;
    }
  }

  tick();
}


/* ─────────────────────────────────────────────────────────────
   TERMINAL ANIMATION
   ─────────────────────────────────────────────────────────────
   Staggers the .terminal-line elements into view when the
   Software Dev tab is opened. Replays each time the tab opens.
   ───────────────────────────────────────────────────────────── */
function animateTerminal() {
  const lines = document.querySelectorAll('#terminal-body .terminal-line');

  // Reset first so it re-plays if user switches tabs back and forth
  lines.forEach(l => l.classList.remove('visible'));

  lines.forEach((line, i) => {
    setTimeout(() => line.classList.add('visible'), i * 195);
  });
}


/* ─────────────────────────────────────────────────────────────
   BLENDER SCREENSHOT FALLBACK
   ─────────────────────────────────────────────────────────────
   If blender-hours.png hasn't been added yet, replaces the
   broken image with a helpful placeholder message.
   ───────────────────────────────────────────────────────────── */
function initBlenderScreenshot() {
  const img = document.getElementById('blender-screenshot-img');
  if (!img) return;

  img.addEventListener('error', () => {
    const wrap = document.getElementById('blender-screenshot-wrap');
    if (wrap) {
      wrap.innerHTML = '<p class="stat-screenshot-placeholder">Add blender&#8209;hours.png to show your stats</p>';
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   KEYBOARD
   ─────────────────────────────────────────────────────────────
   Escape closes the modal from anywhere on the page.
   ───────────────────────────────────────────────────────────── */
function initKeyboard() {
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (document.getElementById('modal-backdrop')?.classList.contains('open')) {
        closeModal();
      }
    }
  });
}


/* ─────────────────────────────────────────────────────────────
   CSS PATCH — carousel view-all row
   ─────────────────────────────────────────────────────────────
   The .carousel-view-all-row class isn't in the CSS file, so
   we inject a minimal rule here to centre the View All button.
   ───────────────────────────────────────────────────────────── */
function injectHelperStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .carousel-view-all-row {
      display: flex;
      justify-content: center;
      margin-top: 1.5rem;
    }
    .carousel-card-images {
      min-width: 0;
    }
  `;
  document.head.appendChild(style);
}


/* ─────────────────────────────────────────────────────────────
   INIT
   ─────────────────────────────────────────────────────────────
   Boot order matters: styles → leaves → carousel → modal →
   masonry → tabs → keyboard → initial reveals.
   ───────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  injectHelperStyles();
  initLeaves();
  initCarousel();
  initModal();
  initMasonry();
  initTabs();
  initKeyboard();
  initBlenderScreenshot();

  // Trigger reveals for the default active panel after the
  // page's own panelIn animation settles (~450ms).
  setTimeout(() => {
    observeReveals(document.getElementById('panel-modelling'));
  }, 450);
});