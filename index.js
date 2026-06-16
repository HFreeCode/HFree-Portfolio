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
    title:       'Low Poly Roblox Dropper',
    shortDesc:   'A VERY simple low poly Roblox dropper for a Roblox Game Developer. This model was made in under 10 minutes, and is a very simple low poly model with no textures or UV unwrapping. The client only needed the model for their game, so no additional work was done. I also provided the client with a .blend file of the model, so they could make any adjustments they needed to the model for their game and additional models with varying sizes just incase.',
    date:        'June 2026',
    price:       '50R',
    timeSpent:   '10 minutes',
    polycount:   'Aprox 900',
    software:    'Blender',
    client:      'Client',
    category:    'Game Asset',
    images:      ['Files/MyWork/LowPolyRobloxDropper/Dropper Image 1.png', 'Files/MyWork/LowPolyRobloxDropper/Dropper Image 2.png', 'Files/MyWork/LowPolyRobloxDropper/Dropper Image 3.png'],  // paths: main image, then up to 2 more
  },
  {
    id: 2,
    title:       ' Medium Poly M40 Sniper Rifle',
    shortDesc:   'A medium poly M40 sniper rifle, with a scope and bullet model for a Roblox Game Developer. The model was not textured or UV unwrapped, as the client only needed the model for their game. Textures seen on image were quickly made for the purpose of this portfolio.',
    date:        'March 2026',
    price:       '£6.50',
    timeSpent:   '3 Working Hours',
    polycount:   'Approx 12,000',
    software:    'Blender',
    client:      'Client',
    category:    'Weapon',
    images:      ['Files/MyWork/MedPolyM40/Main Image.png', 'Files/MyWork/MedPolyM40/Tag.png', 'Files/MyWork/MedPolyM40/Scope Close Up.png', 'Files/MyWork/MedPolyM40/Bullet Close Up.png'],  // paths: main image, then up to 2 more
  },
  {
    id: 3,
    title:       'Medium Poly Japanese Tanto Sword',
    shortDesc:   'A detailed medium poly Japanese tanto sword model for a Roblox Game Developer. No scabbard was modelled, as the client only needed the sword for their game. Additionally, the sword had no textures or UV unwrapping, as the client only needed the model for their game. Textures seen on image were quickly made for the purpose of this portfolio.',
    date:        'April 2026',
    price:       '110R',
    timeSpent:   '1 Working Hour',
    polycount:   'Approx 9,000',
    images:      ['Files/MyWork/MedPolyTantoSword/Main Image.png', 'Files/MyWork/MedPolyTantoSword/Tag Closeup.png'],  // paths: main image, then up to 2 more
  },
  {
    id: 4,
    title:       'Medium Poly Tiger',
    shortDesc:   'A detailed medium poly tiger model for a Roblox Game Developer. The tiger was fully rigged and ready for animation, with a full skeleton and weight painting. The tiger was also fully textured and UV unwrapped which the client asked for after the model was completed and paid extra for.',
    date:        'May 2026',
    price:       '440R',
    timeSpent:   '4.5 Working Hours',
    polycount:   'Approx 9,000',
    images:      ['Files/MyWork/MedPolyTiger/Main Image 1.png', 'Files/MyWork/MedPolyTiger/Main Image 2.png', 'Files/MyWork/MedPolyTiger/Main Image 3.png'],
  },
  {
    id: 5,
    title:       'High Poly Ford Mustang',
    shortDesc:   'A detailed high poly Ford Mustang model for an Indie Game Developer. No interior was modelled, as the client only needed the exterior for their game. The model was fully textured and UV unwrapped, with a full set of materials and textures for the body, wheels, windows, and other parts. The model was also fully rigged and ready for animation.',
    date:        'June 2026',
    price:       '£35',
    timeSpent:   '30-35 Working Hours',
    polycount:   'Approx 1.1 Million',
    images:      ['Files/MyWork/HighPolyFordMustang/Main Image 1.png', 'Files/MyWork/HighPolyFordMustang/Main Image 2.png', 'Files/MyWork/HighPolyFordMustang/Front On Image.png'],
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
      { label: 'Price Charged',     value: project.price      },
      { label: 'Time',      value: project.timeSpent  },
      { label: 'Polycount',      value: project.polycount  },
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

function buildMasonry() {
  const grid = document.getElementById('masonry-grid');
  if (!grid) return;
  grid.innerHTML = '';
  projects.forEach(project => {
    const item = document.createElement('div');
    item.className = 'masonry-item';
    item.innerHTML = project.images[0]
      ? `<img src="${project.images[0]}" alt="${project.title}" loading="lazy">
         <div class="masonry-item-caption">${project.title} · ${project.date}</div>`
      : `<div class="masonry-img-placeholder" style="aspect-ratio:4/3">no image yet</div>
         <div class="masonry-item-caption">${project.title} · ${project.date}</div>`;
    grid.appendChild(item);
  });
}

function openMasonry() {
  buildMasonry();
  const section = document.getElementById('masonry-section');
  section.classList.add('open');
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
    .carousel-card-images { min-width: 0; }
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
  initMasonry();
  initTabs();
  initBlenderScreenshot();

  setTimeout(() => {
    observeReveals(document.getElementById('panel-modelling'));
  }, 450);
});