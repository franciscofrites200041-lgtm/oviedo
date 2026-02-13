/* ========================================
   INMOBILIARIA OVIEDO - Main JavaScript
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initHeader();
  initMobileNav();
  initMobileSearch();
  initScrollReveal();
  initFilters();
  initPropertyCards();
  initHeroSearch();
  initPropertyDetail();
});


/* --- Page Loader --- */
function initPageLoader() {
  const loader = document.querySelector('.page-loader');
  if (!loader) return;

  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('page-loader--hidden');
      setTimeout(() => loader.remove(), 600);
    }, 400);
  });
}


/* --- Header Scroll Behavior --- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  function handleScroll() {
    const scrollY = window.scrollY;

    if (scrollY > 60) {
      header.classList.add('site-header--scrolled');
    } else {
      header.classList.remove('site-header--scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}


/* --- Mobile Navigation --- */
function initMobileNav() {
  const hamburger = document.getElementById('hamburger');
  const overlay = document.getElementById('nav-mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav-mobile-link');

  if (!hamburger || !overlay) return;

  function toggleMenu() {
    const isOpen = overlay.classList.contains('nav-mobile-overlay--open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  function openMenu() {
    overlay.classList.add('nav-mobile-overlay--open');
    hamburger.classList.add('hamburger--active');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    overlay.classList.remove('nav-mobile-overlay--open');
    hamburger.classList.remove('hamburger--active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setTimeout(closeMenu, 200);
    });
  });

  // Close on escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });
}


/* --- Mobile Search Panel --- */
function initMobileSearch() {
  const searchBtn = document.getElementById('mobile-search-btn');
  const searchPanel = document.getElementById('mobile-search-panel');
  const submitBtn = document.getElementById('mobile-search-submit');

  if (!searchBtn || !searchPanel) return;

  // Create backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'mobile-search-backdrop';
  document.body.appendChild(backdrop);

  let isOpen = false;

  function openSearch() {
    isOpen = true;
    searchPanel.classList.add('mobile-search-panel--open');
    backdrop.classList.add('mobile-search-backdrop--visible');
  }

  function closeSearch() {
    isOpen = false;
    searchPanel.classList.remove('mobile-search-panel--open');
    backdrop.classList.remove('mobile-search-backdrop--visible');
  }

  function toggleSearch() {
    if (isOpen) {
      closeSearch();
    } else {
      openSearch();
    }
  }

  searchBtn.addEventListener('click', toggleSearch);
  backdrop.addEventListener('click', closeSearch);

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isOpen) closeSearch();
  });

  // Submit scrolls to properties and closes panel
  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeSearch();
      const propertiesSection = document.getElementById('propiedades');
      if (propertiesSection) {
        propertiesSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }
}


/* --- Scroll Reveal --- */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (!reveals.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal--visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}


/* --- Filters --- */
function initFilters() {
  const toggle = document.querySelector('.filters-toggle');
  const panel = document.querySelector('.filters-panel');
  const clearBtn = document.querySelector('.btn-filter-clear');

  if (!toggle || !panel) return;

  toggle.addEventListener('click', () => {
    const isOpen = panel.classList.contains('filters-panel--open');
    panel.classList.toggle('filters-panel--open');
    toggle.classList.toggle('filters-toggle--active');
    toggle.setAttribute('aria-expanded', !isOpen);
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      panel.querySelectorAll('select').forEach(s => s.selectedIndex = 0);
      panel.querySelectorAll('input').forEach(i => i.value = '');
    });
  }
}


/* --- Property Data --- */
const properties = [
  {
    id: 1,
    type: 'Departamento',
    title: 'Luminoso Departamento en Centro',
    location: 'Ciudad, Mendoza',
    bedrooms: 2,
    bathrooms: 1,
    area: 68,
    price: 72000,
    currency: 'USD',
    operation: 'Venta',
    image: 'Home.png'
  },
  {
    id: 2,
    type: 'Casa',
    title: 'Casa con Jardin en Barrio Residencial',
    location: 'Godoy Cruz, Mendoza',
    bedrooms: 3,
    bathrooms: 2,
    area: 145,
    price: 125000,
    currency: 'USD',
    operation: 'Venta',
    image: 'Home.png'
  },
  {
    id: 3,
    type: 'Departamento',
    title: 'Monoambiente Moderno con Balcon',
    location: 'Ciudad, Mendoza',
    bedrooms: 1,
    bathrooms: 1,
    area: 38,
    price: 85000,
    currency: 'ARS',
    operation: 'Alquiler',
    image: null
  },
  {
    id: 4,
    type: 'Casa',
    title: 'Amplia Casa en Esquina con Cochera',
    location: 'Las Heras, Mendoza',
    bedrooms: 4,
    bathrooms: 2,
    area: 210,
    price: 165000,
    currency: 'USD',
    operation: 'Venta',
    image: null
  },
  {
    id: 5,
    type: 'Terreno',
    title: 'Lote en Zona de Desarrollo',
    location: 'Lujan de Cuyo, Mendoza',
    bedrooms: 0,
    bathrooms: 0,
    area: 500,
    price: 45000,
    currency: 'USD',
    operation: 'Venta',
    image: null
  },
  {
    id: 6,
    type: 'Local Comercial',
    title: 'Local Sobre Avenida Principal',
    location: 'Ciudad, Mendoza',
    bedrooms: 0,
    bathrooms: 1,
    area: 85,
    price: 150000,
    currency: 'ARS',
    operation: 'Alquiler',
    image: null
  },
  {
    id: 7,
    type: 'Departamento',
    title: 'Piso Alto con Vista Panoramica',
    location: 'Ciudad, Mendoza',
    bedrooms: 3,
    bathrooms: 2,
    area: 110,
    price: 145000,
    currency: 'USD',
    operation: 'Venta',
    image: null
  },
  {
    id: 8,
    type: 'Casa',
    title: 'Propiedad con Pileta y Quincho',
    location: 'Maipu, Mendoza',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    price: 138000,
    currency: 'USD',
    operation: 'Venta',
    image: null
  },
  {
    id: 9,
    type: 'Departamento',
    title: 'Departamento Reciclado a Nuevo',
    location: 'Godoy Cruz, Mendoza',
    bedrooms: 2,
    bathrooms: 1,
    area: 55,
    price: 95000,
    currency: 'ARS',
    operation: 'Alquiler',
    image: null
  }
];


/* --- SVG Icons --- */
const icons = {
  location: `<svg viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
  bed: `<svg viewBox="0 0 24 24" fill="none"><path d="M3 7v11m0-4h18m0 4V11a2 2 0 00-2-2H5a2 2 0 00-2 2m4-4V5a2 2 0 012-2h6a2 2 0 012 2v2"/></svg>`,
  bath: `<svg viewBox="0 0 24 24" fill="none"><path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zm2 0V6a2 2 0 012-2h1a2 2 0 012 2"/></svg>`,
  area: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 3v18"/></svg>`,
  arrow: `<svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-7-7l7 7-7 7"/></svg>`,
  image: `<svg viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15l-5-5L5 21"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5"/></svg>`
};


/* --- Render Property Cards --- */
function initPropertyCards() {
  const grid = document.getElementById('properties-grid');
  if (!grid) return;

  function renderCards(data) {
    grid.innerHTML = data.map((prop, index) => `
      <a href="propiedad.html?id=${prop.id}" class="property-card reveal reveal-delay-${(index % 4) + 1}" id="property-${prop.id}">
        <div class="property-card-image">
          ${prop.image ? `
            <img src="${prop.image}" alt="${prop.title}" class="property-card-img" style="width: 100%; height: 100%; object-fit: cover;">
          ` : `
            <div class="property-card-image-placeholder">
              ${icons.image}
            </div>
          `}
          <div class="property-badge ${prop.operation === 'Venta' ? 'property-badge--sale' : 'property-badge--rent'}">
            ${prop.operation}
          </div>
        </div>
        <div class="property-card-body">
          <div class="property-card-type">${prop.type}</div>
          <h3 class="property-card-title">${prop.title}</h3>
          <div class="property-card-location">
            ${icons.location}
            ${prop.location}
          </div>
          <div class="property-card-features">
            ${prop.bedrooms > 0 ? `
              <div class="property-feature">
                ${icons.bed}
                <span>${prop.bedrooms} ${prop.bedrooms === 1 ? 'Amb.' : 'Amb.'}</span>
              </div>
            ` : ''}
            ${prop.bathrooms > 0 ? `
              <div class="property-feature">
                ${icons.bath}
                <span>${prop.bathrooms} ${prop.bathrooms === 1 ? 'Ba\u00f1o' : 'Ba\u00f1os'}</span>
              </div>
            ` : ''}
            <div class="property-feature">
              ${icons.area}
              <span>${prop.area} m&sup2;</span>
            </div>
          </div>
          <div class="property-card-footer">
            <div class="property-price">
              <span class="property-price-currency">${prop.currency}</span>
              ${formatPrice(prop.price)}
            </div>
            <div class="property-card-cta">
              Ver ${icons.arrow}
            </div>
          </div>
        </div>
      </a>
    `).join('');

    // Update count
    const countEl = document.getElementById('results-count');
    if (countEl) {
      countEl.innerHTML = `<strong>${data.length}</strong> propiedades encontradas`;
    }

    // Re-init scroll reveal for new cards
    initScrollReveal();
  }

  renderCards(properties);

  // Sort functionality
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      let sorted = [...properties];
      switch (sortSelect.value) {
        case 'price-asc':
          sorted.sort((a, b) => a.price - b.price);
          break;
        case 'price-desc':
          sorted.sort((a, b) => b.price - a.price);
          break;
        case 'area-desc':
          sorted.sort((a, b) => b.area - a.area);
          break;
        case 'recent':
        default:
          break;
      }
      renderCards(sorted);
    });
  }

  // Filter apply
  const applyBtn = document.querySelector('.btn-filter-apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', () => {
      const opFilter = document.getElementById('filter-operation')?.value;
      const typeFilter = document.getElementById('filter-type')?.value;
      const locFilter = document.getElementById('filter-location')?.value;

      let filtered = [...properties];

      if (opFilter) {
        filtered = filtered.filter(p => p.operation === opFilter);
      }
      if (typeFilter) {
        filtered = filtered.filter(p => p.type === typeFilter);
      }
      if (locFilter) {
        filtered = filtered.filter(p => p.location.includes(locFilter));
      }

      renderCards(filtered);
    });
  }
}


/* --- Hero Search --- */
function initHeroSearch() {
  const searchBtn = document.getElementById('hero-search-btn');
  if (!searchBtn) return;

  searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    // Scroll to properties section
    const propertiesSection = document.getElementById('propiedades');
    if (propertiesSection) {
      propertiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}


/* --- Utilities --- */
function formatPrice(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}


/* --- Property Detail Page --- */
function initPropertyDetail() {
  // Check if we are on property detail page
  const titleEl = document.getElementById('detail-title');
  if (!titleEl) return;

  // Get ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));

  if (!id) return; // Keep default content if no ID

  // Find property
  const prop = properties.find(p => p.id === id);
  if (!prop) return;

  // Update DOM
  document.title = `${prop.title} | Inmobiliaria Oviedo`;

  // Breadcrumb
  const breadcrumbTitle = document.getElementById('breadcrumb-title');
  if (breadcrumbTitle) breadcrumbTitle.textContent = prop.title;

  // Header
  const badgeOp = document.getElementById('detail-badge-op');
  const badgeType = document.getElementById('detail-badge-type');
  const locationEl = document.getElementById('detail-location');

  if (badgeOp) {
    badgeOp.textContent = prop.operation;
    badgeOp.className = `detail-badge ${prop.operation === 'Venta' ? '' : 'detail-badge--rent'}`;
  }
  if (badgeType) badgeType.textContent = prop.type;
  if (titleEl) titleEl.textContent = prop.title;
  if (locationEl) {
    locationEl.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
      <span>${prop.location}</span>
    `;
  }

  // Features
  setFeature('detail-beds', prop.bedrooms, 'Amb.');
  setFeature('detail-baths', prop.bathrooms, '');
  setFeature('detail-area', prop.area + ' m²', '');
  setFeature('detail-covered', Math.floor(prop.area * 0.9) + ' m²', '');

  // Price
  const priceEl = document.getElementById('detail-price');
  if (priceEl) {
    priceEl.innerHTML = `<span>${prop.currency}</span> ${formatPrice(prop.price)}`;
  }

  // Gallery — build images array
  if (prop.image) {
    // Simulate multiple gallery views using different object-position crops
    const galleryImages = [
      { src: prop.image, position: 'center center', label: 'Principal' },
      { src: prop.image, position: 'left center', label: 'Vista izquierda' },
      { src: prop.image, position: 'right center', label: 'Vista derecha' },
      { src: prop.image, position: 'center top', label: 'Vista superior' },
    ];
    initGallery(galleryImages, prop.title);
  }
}


/* --- Gallery Carousel --- */
function initGallery(images, altText) {
  const galleryMain = document.getElementById('gallery-main');
  const galleryThumbs = document.getElementById('gallery-thumbs');
  const prevBtn = document.getElementById('gallery-prev');
  const nextBtn = document.getElementById('gallery-next');
  const counterEl = document.getElementById('gallery-counter');

  if (!galleryMain || !images.length) return;

  let currentIndex = 0;

  // Remove placeholder
  const placeholder = galleryMain.querySelector('.gallery-main-placeholder');
  if (placeholder) placeholder.remove();

  // Create main images
  images.forEach((img, i) => {
    const imgEl = document.createElement('img');
    imgEl.src = img.src;
    imgEl.alt = `${altText} - ${img.label}`;
    imgEl.className = 'gallery-main-img' + (i === 0 ? ' gallery-img--active' : '');
    imgEl.style.objectPosition = img.position;
    imgEl.draggable = false;
    // Insert before gallery-nav buttons
    galleryMain.insertBefore(imgEl, prevBtn);
  });

  // Create thumbnails
  if (galleryThumbs) {
    galleryThumbs.innerHTML = '';
    images.forEach((img, i) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb' + (i === 0 ? ' gallery-thumb--active' : '');
      thumb.innerHTML = `<img src="${img.src}" alt="${altText} - ${img.label}" style="object-position: ${img.position};" draggable="false">`;
      thumb.addEventListener('click', () => goToSlide(i));
      galleryThumbs.appendChild(thumb);
    });
  }

  // Update counter
  updateCounter();

  // Navigation handlers
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentIndex + 1);
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') goToSlide(currentIndex - 1);
    if (e.key === 'ArrowRight') goToSlide(currentIndex + 1);
  });

  function goToSlide(index) {
    // Wrap around
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    // Update main images
    const mainImages = galleryMain.querySelectorAll('.gallery-main-img');
    mainImages.forEach((img, i) => {
      img.classList.toggle('gallery-img--active', i === index);
    });

    // Update thumbnails
    if (galleryThumbs) {
      const thumbs = galleryThumbs.querySelectorAll('.gallery-thumb');
      thumbs.forEach((thumb, i) => {
        thumb.classList.toggle('gallery-thumb--active', i === index);
      });
    }

    currentIndex = index;
    updateCounter();
  }

  function updateCounter() {
    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${images.length}`;
    }
  }
}


function setFeature(id, value, fallbackLabel) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}
