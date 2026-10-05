/**
 * ROYAL BEST PHARMACEUTICALS PVT. LTD.
 * Interactive Controller Matching Design Mockup
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileNav();
  initCatalogueCarousel();
  initStatCounters();
  initModalSystem();
  initFilterPills();
  initHeroSlider();
  init3DGlobe();
});

/* --------------------------------------------------------------------------
   0. Header Scroll Effect & Mobile Nav
   -------------------------------------------------------------------------- */
function initNavbarScroll() {
  const header = document.getElementById('mainHeader');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

function initMobileNav() {
  const toggleBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navLinksMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !toggleBtn.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
      }
    });

    // Close when clicking a regular navigation link or dropdown item on mobile
    navMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navMenu.classList.remove('active');
        }
      });
    });
  }
}

/* --------------------------------------------------------------------------
   1. Product Catalogue Carousel & Live Filter Engine (Smooth Sliding Track)
   -------------------------------------------------------------------------- */
let currentCategory = 'all';
let currentSearch = '';
let carouselIndex = 0;
let carouselAutoPlayTimer = null;

function initCatalogueCarousel() {
  const grid = document.getElementById('productCarouselGrid');
  const viewport = document.getElementById('carouselViewport');
  const searchInput = document.getElementById('catalogSearchInput');
  const clearBtn = document.getElementById('catalogClearBtn');
  const resultsCount = document.getElementById('catalogResultsCount');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  const dotsContainer = document.getElementById('carouselDotsContainer');
  const carouselWrapper = document.getElementById('carouselWrapper');

  if (!grid || typeof FEATURED_PRODUCTS === 'undefined') return;

  // Initialize category badge counts
  updateCategoryBadges();

  function updateCategoryBadges() {
    const counts = {
      all: FEATURED_PRODUCTS.length,
      apis: FEATURED_PRODUCTS.filter(p => p.category === 'apis').length,
      intermediates: FEATURED_PRODUCTS.filter(p => p.category === 'intermediates').length,
      sterile: FEATURED_PRODUCTS.filter(p => p.category === 'sterile').length,
      'culture-media': FEATURED_PRODUCTS.filter(p => p.category === 'culture-media').length
    };

    const bAll = document.getElementById('badgeAll');
    const bApis = document.getElementById('badgeApis');
    const bInter = document.getElementById('badgeInter');
    const bSterile = document.getElementById('badgeSterile');
    const bMedia = document.getElementById('badgeMedia');

    if (bAll) bAll.textContent = counts.all;
    if (bApis) bApis.textContent = counts.apis;
    if (bInter) bInter.textContent = counts.intermediates;
    if (bSterile) bSterile.textContent = counts.sterile;
    if (bMedia) bMedia.textContent = counts['culture-media'];
  }

  function getItemsPerPage() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 4;
  }

  function getFilteredProducts() {
    return FEATURED_PRODUCTS.filter((item) => {
      const matchCat = currentCategory === 'all' || item.category === currentCategory;
      const matchQuery =
        !currentSearch ||
        item.name.toLowerCase().includes(currentSearch) ||
        item.cas.toLowerCase().includes(currentSearch) ||
        item.therapeutic.toLowerCase().includes(currentSearch) ||
        item.grade.toLowerCase().includes(currentSearch);

      return matchCat && matchQuery;
    });
  }

  function updateCardDimensions() {
    if (!viewport) return;
    const itemsPerPage = getItemsPerPage();
    const gap = 20;
    const availableWidth = viewport.offsetWidth - (gap * (itemsPerPage - 1));
    const cardWidth = Math.floor(availableWidth / itemsPerPage);
    if (cardWidth > 50) {
      grid.style.setProperty('--card-w', `${cardWidth}px`);
    }
  }

  function getTotalPages(filteredCount) {
    const itemsPerPage = getItemsPerPage();
    return Math.max(1, Math.ceil(filteredCount / itemsPerPage));
  }

  function updateSlidePosition(animated = true) {
    const filtered = getFilteredProducts();
    const itemsPerPage = getItemsPerPage();
    const totalPages = getTotalPages(filtered.length);

    if (carouselIndex >= totalPages) carouselIndex = Math.max(0, totalPages - 1);

    updateCardDimensions();

    const firstCard = grid.querySelector('.product-item-card');
    if (firstCard && viewport) {
      const cardWidth = firstCard.offsetWidth;
      const gap = 20;
      const moveDistance = (cardWidth + gap) * itemsPerPage * carouselIndex;
      
      // Calculate max translation so we don't overscroll whitespace at the end
      const maxScroll = Math.max(0, grid.scrollWidth - viewport.offsetWidth);
      const targetOffset = Math.min(moveDistance, maxScroll);

      grid.style.transition = animated ? 'transform 0.55s cubic-bezier(0.25, 1, 0.5, 1)' : 'none';
      grid.style.transform = `translateX(-${targetOffset}px)`;
    } else {
      grid.style.transform = 'translateX(0px)';
    }

    // Update active dot
    if (dotsContainer) {
      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === carouselIndex);
      });
    }
  }

  function renderCarousel() {
    const filtered = getFilteredProducts();

    // Update live results count badge
    if (resultsCount) {
      resultsCount.innerHTML = `
        <span class="status-dot"></span>
        <span>Showing <strong>${filtered.length}</strong> Product${filtered.length === 1 ? '' : 's'}${currentCategory !== 'all' ? ` in ${getCategoryTitle(currentCategory)}` : ''}</span>
      `;
    }

    // Toggle clear search button
    if (clearBtn) {
      clearBtn.style.display = currentSearch ? 'flex' : 'none';
    }

    if (filtered.length === 0) {
      grid.style.transform = 'translateX(0px)';
      grid.innerHTML = `
        <div class="catalogue-empty-state" style="width: 100%;">
          <div class="empty-icon-circle">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
          <h3 class="empty-title">No matching pharmaceutical products found</h3>
          <p class="empty-desc">We couldn't find any products matching "<strong>${escapeHtml(currentSearch)}</strong>". Try searching by CAS number, generic name, or explore our full portfolio.</p>
          <button class="btn btn-gold btn-sm" onclick="resetCatalogFilters()">Reset Search &amp; View All</button>
        </div>
      `;
      if (dotsContainer) dotsContainer.innerHTML = '';
      if (prevBtn) prevBtn.style.display = 'none';
      if (nextBtn) nextBtn.style.display = 'none';
      return;
    }

    if (prevBtn) prevBtn.style.display = '';
    if (nextBtn) nextBtn.style.display = '';

    // Render ALL filtered cards into the sliding track
    grid.innerHTML = filtered.map(prod => renderProductCard(prod)).join('');

    // Attach button listeners
    grid.querySelectorAll('button[data-action="enquire"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        openQuoteModal(btn.dataset.name, btn.dataset.cas);
      });
    });

    grid.querySelectorAll('button[data-action="details"]').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const prod = FEATURED_PRODUCTS.find((p) => p.id === btn.dataset.id);
        if (prod) openProductDetailsModal(prod);
      });
    });

    // Render dynamic dots
    const totalPages = getTotalPages(filtered.length);
    if (dotsContainer) {
      let dotsHtml = '';
      for (let p = 0; p < totalPages; p++) {
        dotsHtml += `<span class="carousel-dot ${p === carouselIndex ? 'active' : ''}" data-page="${p}" aria-label="Page ${p + 1}"></span>`;
      }
      dotsContainer.innerHTML = dotsHtml;

      dotsContainer.querySelectorAll('.carousel-dot').forEach((dot) => {
        dot.addEventListener('click', () => {
          carouselIndex = parseInt(dot.dataset.page, 10);
          updateSlidePosition(true);
          restartAutoPlay();
        });
      });
    }

    // Set position without animation on initial load / filter change
    updateSlidePosition(false);
  }

  function getCategoryTitle(cat) {
    const titles = {
      apis: 'Active APIs',
      intermediates: 'Intermediates',
      sterile: 'Sterile Compounds',
      'culture-media': 'Culture Media'
    };
    return titles[cat] || cat;
  }

  function renderProductCard(prod) {
    const catClasses = {
      apis: 'pill-api',
      intermediates: 'pill-inter',
      sterile: 'pill-sterile',
      'culture-media': 'pill-media'
    };
    const pillClass = catClasses[prod.category] || 'pill-api';
    const isMedia = prod.category === 'culture-media';

    return `
      <article class="product-item-card" data-category="${prod.category}">
        <div class="product-card-top-bar">
          <span class="prod-cas-badge">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <circle cx="12" cy="12" r="3"/>
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
            </svg>
            <span>CAS: ${prod.cas}</span>
          </span>
          <span class="prod-category-pill ${pillClass}">
            ${prod.categoryLabel}
          </span>
        </div>

        <div class="product-card-head">
          <h3 class="product-item-title" title="${escapeHtml(prod.name)}">${prod.name}</h3>
          <div class="prod-therapeutic-badge" title="${escapeHtml(prod.therapeutic)}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
            </svg>
            <span>${prod.therapeutic}</span>
          </div>
        </div>

        <div class="chem-structure-canvas">
          <span class="chem-canvas-watermark">${isMedia ? 'Plating Media' : '2D Structure'}</span>
          <div class="chem-svg-wrap">
            ${prod.structureSvg}
          </div>
        </div>

        <div class="product-specs-list">
          <div class="spec-row-item">
            <span class="spec-key">Grade:</span>
            <span class="spec-val" title="${escapeHtml(prod.grade)}">${prod.grade}</span>
          </div>
          <div class="spec-row-item">
            <span class="spec-key">Purity:</span>
            <span class="spec-val spec-purity-badge">${prod.purity}</span>
          </div>
          <div class="spec-row-item">
            <span class="spec-key">Packaging:</span>
            <span class="spec-val">${prod.standardPack}</span>
          </div>
        </div>

        <div class="product-item-btns">
          <button class="btn btn-card-specs" data-action="details" data-id="${prod.id}">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/>
              <line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            <span>Specs</span>
          </button>
          <button class="btn btn-card-enquire" data-action="enquire" data-name="${escapeHtml(prod.name)}" data-cas="${escapeHtml(prod.cas)}">
            <span>Enquire RFQ</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </article>
    `;
  }

  window.resetCatalogFilters = () => {
    currentCategory = 'all';
    currentSearch = '';
    carouselIndex = 0;
    if (searchInput) searchInput.value = '';
    document.querySelectorAll('.filter-pill-btn').forEach((p) => p.classList.toggle('active', p.dataset.category === 'all'));
    renderCarousel();
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      carouselIndex = 0;
      renderCarousel();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) searchInput.value = '';
      currentSearch = '';
      carouselIndex = 0;
      renderCarousel();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      const filtered = getFilteredProducts();
      const totalPages = getTotalPages(filtered.length);
      if (totalPages > 1) {
        carouselIndex = carouselIndex > 0 ? carouselIndex - 1 : totalPages - 1;
        updateSlidePosition(true);
        restartAutoPlay();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      const filtered = getFilteredProducts();
      const totalPages = getTotalPages(filtered.length);
      if (totalPages > 1) {
        carouselIndex = (carouselIndex + 1) % totalPages;
        updateSlidePosition(true);
        restartAutoPlay();
      }
    });
  }

  // Touch Swipe & Drag Handler for Mobile/Desktop
  let startX = 0;
  let isDragging = false;

  if (viewport) {
    viewport.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      pauseAutoPlay();
    }, { passive: true });

    viewport.addEventListener('touchend', (e) => {
      if (!isDragging) return;
      isDragging = false;
      const endX = e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const filtered = getFilteredProducts();
      const totalPages = getTotalPages(filtered.length);

      if (Math.abs(diffX) > 40) {
        if (diffX > 0) {
          // Swipe left -> Next
          carouselIndex = (carouselIndex + 1) % totalPages;
        } else {
          // Swipe right -> Prev
          carouselIndex = (carouselIndex - 1 + totalPages) % totalPages;
        }
        updateSlidePosition(true);
      }
      restartAutoPlay();
    }, { passive: true });
  }

  // Filter pills click handler
  const filterPills = document.querySelectorAll('.filter-pill-btn');
  filterPills.forEach((pill) => {
    pill.addEventListener('click', () => {
      filterPills.forEach((p) => p.classList.remove('active'));
      pill.classList.add('active');
      currentCategory = pill.dataset.category || 'all';
      carouselIndex = 0;
      renderCarousel();
    });
  });

  // Auto-play helpers
  function startAutoPlay() {
    if (carouselAutoPlayTimer) clearInterval(carouselAutoPlayTimer);
    carouselAutoPlayTimer = setInterval(() => {
      const filtered = getFilteredProducts();
      const totalPages = getTotalPages(filtered.length);
      if (totalPages > 1) {
        carouselIndex = (carouselIndex + 1) % totalPages;
        updateSlidePosition(true);
      }
    }, 5500);
  }

  function pauseAutoPlay() {
    if (carouselAutoPlayTimer) {
      clearInterval(carouselAutoPlayTimer);
      carouselAutoPlayTimer = null;
    }
  }

  function restartAutoPlay() {
    pauseAutoPlay();
    startAutoPlay();
  }

  if (carouselWrapper) {
    carouselWrapper.addEventListener('mouseenter', pauseAutoPlay);
    carouselWrapper.addEventListener('mouseleave', startAutoPlay);
  }

  window.addEventListener('resize', () => {
    updateCardDimensions();
    updateSlidePosition(false);
  }, { passive: true });

  renderCarousel();
  startAutoPlay();
}

/* --------------------------------------------------------------------------
   2. Filter Pills Event Handler (Extended for Header Dropdown filters)
   -------------------------------------------------------------------------- */
function initFilterPills() {
  const dropdownLinks = document.querySelectorAll('[data-filter]');
  const filterPills = document.querySelectorAll('.filter-pill-btn');

  dropdownLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const filter = link.dataset.filter;
      if (filter) {
        currentCategory = filter;
        filterPills.forEach((p) => p.classList.toggle('active', p.dataset.category === filter));
        const catSection = document.getElementById('catalogue');
        if (catSection) {
          catSection.scrollIntoView({ behavior: 'smooth' });
        }
        initCatalogueCarousel();
      }
    });
  });
}

/* --------------------------------------------------------------------------
   3. Statistics Counters Animation
   -------------------------------------------------------------------------- */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-val');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const targetValue = parseInt(el.getAttribute('data-target'), 10);
          const suffix = el.getAttribute('data-suffix') || '+';
          animateCounter(el, targetValue, suffix);
          obs.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  statNumbers.forEach((el) => observer.observe(el));
}

function animateCounter(element, target, suffix) {
  let start = 0;
  const duration = 1500;
  const startTime = performance.now();

  function update(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeProgress * target);

    element.textContent = `${current}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = `${target}${suffix}`;
    }
  }

  requestAnimationFrame(update);
}

/* --------------------------------------------------------------------------
   4. Modal System (Quote & CoA)
   -------------------------------------------------------------------------- */
function initModalSystem() {
  const modalOverlay = document.getElementById('inquiryModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const form = document.getElementById('modalInquiryForm');

  if (!modalOverlay) return;

  window.openQuoteModal = (productName = '', casNumber = '') => {
    const productField = document.getElementById('modalProductField');
    const title = document.getElementById('modalTitle');

    if (productField) {
      productField.value = productName ? `${productName} (CAS: ${casNumber})` : 'General Bulk Supply Inquiry';
    }
    if (title) {
      title.textContent = productName ? `Enquire: ${productName}` : 'Request a Quote / Product Enquiry';
    }

    modalOverlay.style.opacity = '1';
    modalOverlay.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
  };

  window.openProductDetailsModal = (product) => {
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.querySelector('.modal-dynamic-content');

    if (modalTitle) modalTitle.textContent = product.name;
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="background: rgba(255,255,255,0.06); padding: 14px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.12); margin-bottom: 16px;">
          <p style="font-size: 0.88rem; color: #FFF; margin-bottom: 6px;"><strong>Therapeutic Category:</strong> ${product.therapeutic}</p>
          <p style="font-size: 0.88rem; color: #FFF; margin-bottom: 6px;"><strong>Pharmacopoeial Grade:</strong> ${product.grade}</p>
          <p style="font-size: 0.85rem; color: rgba(255,255,255,0.8); line-height: 1.5;">${product.description}</p>
        </div>
      `;
    }

    const productField = document.getElementById('modalProductField');
    if (productField) {
      productField.value = `${product.name} (CAS: ${product.cas})`;
    }

    modalOverlay.style.opacity = '1';
    modalOverlay.style.visibility = 'visible';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.style.opacity = '0';
    modalOverlay.style.visibility = 'hidden';
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.querySelectorAll('[data-open-quote]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const specificProduct = btn.getAttribute('data-open-quote');
      openQuoteModal(specificProduct && specificProduct !== 'true' ? specificProduct : '');
    });
  });

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('inqName')?.value || '';
      const email = document.getElementById('inqEmail')?.value || '';
      const phone = document.getElementById('inqPhone')?.value || '';
      const product = document.getElementById('modalProductField')?.value || '';
      const msg = document.getElementById('inqMessage')?.value || '';

      const waText = encodeURIComponent(`*Royal Best Pharmaceuticals Inquiry*\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Product:* ${product}\n*Requirement:* ${msg}`);
      
      form.innerHTML = `
        <div style="text-align: center; padding: 20px 10px;">
          <div style="font-size: 2rem; color: var(--gold); margin-bottom: 10px;">✓</div>
          <h4 style="font-size: 1.3rem; font-weight: 700; color: #FFF; margin-bottom: 8px;">Enquiry Received</h4>
          <p style="font-size: 0.88rem; color: rgba(255,255,255,0.8); margin-bottom: 16px;">
            Thank you, <strong>${escapeHtml(name)}</strong>. Our commercial sourcing team will get in touch with you shortly.
          </p>
          <a href="https://wa.me/919638169289?text=${waText}" target="_blank" rel="noopener" class="btn btn-gold btn-sm">
            Chat on WhatsApp (+91 96381 69289)
          </a>
        </div>
      `;
    });
  }

  // Handle Contact Page Form if present
  const contactPageForm = document.getElementById('contactPageForm');
  if (contactPageForm) {
    contactPageForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value || '';
      const company = document.getElementById('contactCompany')?.value || '';
      const email = document.getElementById('contactEmail')?.value || '';
      const phone = document.getElementById('contactPhone')?.value || '';
      const product = document.getElementById('contactProduct')?.value || '';
      const message = document.getElementById('contactMessage')?.value || '';

      const waText = encodeURIComponent(`*Royal Best Pharmaceuticals Commercial RFQ*\n*Name:* ${name}\n*Company:* ${company}\n*Email:* ${email}\n*Phone:* ${phone}\n*Product:* ${product}\n*Details:* ${message}`);

      contactPageForm.innerHTML = `
        <div style="text-align: center; padding: 36px 16px;">
          <div style="font-size: 2.5rem; color: var(--gold); margin-bottom: 12px;">✓</div>
          <h3 style="font-size: 1.4rem; font-weight: 700; color: var(--dark-text); margin-bottom: 10px;">Commercial RFQ Submitted</h3>
          <p style="font-size: 0.92rem; color: var(--body-text); line-height: 1.6; margin-bottom: 20px;">
            Thank you, <strong>${escapeHtml(name)}</strong> (${escapeHtml(company)}). Your technical quotation request has been routed directly to our commercial desk.
          </p>
          <a href="https://wa.me/919638169289?text=${waText}" target="_blank" rel="noopener" class="btn btn-gold">
            Instant Connect on WhatsApp
          </a>
        </div>
      `;
    });
  }
}

/* --------------------------------------------------------------------------
   5. Dynamic 3-Slide Hero Banner Controller
   -------------------------------------------------------------------------- */
function initHeroSlider() {
  const heroWrapper = document.getElementById('hero');
  const slides = document.querySelectorAll('.hero-slide');
  const navItems = document.querySelectorAll('.hero-dot, .hero-seg-tab, .hero-nav-item');
  const prevBtn = document.getElementById('heroPrevBtn');
  const nextBtn = document.getElementById('heroNextBtn');

  if (!slides.length) return;

  let currentSlide = 0;
  let slideInterval = null;
  const slideDuration = 6000; // 6 seconds

  function goToSlide(index) {
    // Wrap index safely
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Update slide classes and manage video playback
    slides.forEach((slide, idx) => {
      const isActive = idx === currentSlide;
      slide.classList.toggle('active', isActive);

      const video = slide.querySelector('video.hero-bg-video');
      if (video) {
        if (isActive) {
          try {
            video.currentTime = 0;
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Auto-play policy handled smoothly
              });
            }
          } catch (err) {
            // Ignore playback errors
          }
        } else {
          try {
            video.pause();
          } catch (err) {}
        }
      }
    });

    // Update progress navigation items
    navItems.forEach((item, idx) => {
      item.classList.toggle('active', idx === currentSlide);
      const fillBar = item.querySelector('.dot-progress-fill, .seg-progress-bar, .nav-bar-fill');
      if (fillBar) {
        // Reset animation by removing and re-adding
        fillBar.style.animation = 'none';
        fillBar.offsetHeight; /* trigger reflow */
        if (idx === currentSlide) {
          fillBar.style.animation = `heroTimerFill ${slideDuration}ms linear forwards`;
        }
      }
    });

    // Restart timer
    startAutoPlay();
  }

  function startAutoPlay() {
    stopAutoPlay();
    slideInterval = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, slideDuration);
  }

  function stopAutoPlay() {
    if (slideInterval) {
      clearInterval(slideInterval);
      slideInterval = null;
    }
  }

  // Navigation Items click
  navItems.forEach((item) => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.getAttribute('data-slide-index'), 10);
      if (!isNaN(idx)) {
        goToSlide(idx);
      }
    });
  });

  // Arrow navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentSlide - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      goToSlide(currentSlide + 1);
    });
  }

  // Pause on hover
  if (heroWrapper) {
    heroWrapper.addEventListener('mouseenter', stopAutoPlay);
    heroWrapper.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    heroWrapper.addEventListener(
      'touchstart',
      (e) => {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    heroWrapper.addEventListener(
      'touchend',
      (e) => {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 45) {
          if (diffX > 0) goToSlide(currentSlide + 1); // Swipe left
          else goToSlide(currentSlide - 1); // Swipe right
        }
      },
      { passive: true }
    );
  }

  // Handle Tab visibility change
  document.addEventListener('visibilitychange', () => {
    const activeVideo = slides[currentSlide]?.querySelector('video.hero-bg-video');
    if (document.hidden) {
      stopAutoPlay();
      if (activeVideo) activeVideo.pause();
    } else {
      startAutoPlay();
      if (activeVideo) activeVideo.play().catch(() => {});
    }
  });

  // Initialize first slide
  goToSlide(0);
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* --------------------------------------------------------------------------
   8. Photorealistic 3D Earth Globe Engine (NASA Satellite Texture & 3D Flight Arcs)
   -------------------------------------------------------------------------- */
function init3DGlobe() {
  const canvas = document.getElementById('globeCanvas');
  const container = document.getElementById('globeCanvasContainer');
  const tooltip = document.getElementById('globeTooltip');
  const tooltipCity = document.getElementById('tooltipCity');
  const tooltipDetail = document.getElementById('tooltipDetail');
  if (!canvas || !container) return;

  // Check if Three.js is loaded
  if (typeof THREE === 'undefined') {
    console.warn('Three.js not found, falling back to 2D canvas');
    return;
  }

  let width = container.clientWidth || 480;
  let height = container.clientHeight || 480;

  // 1. Scene, Camera, Renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 215;

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  // 2. Lighting (Sunlight + Ambient + Cyan Atmosphere Rim Light)
  const ambientLight = new THREE.AmbientLight(0x6080A0, 0.95);
  scene.add(ambientLight);

  const sunLight = new THREE.DirectionalLight(0xFFF6E8, 1.6);
  sunLight.position.set(160, 90, 180);
  scene.add(sunLight);

  const rimLight = new THREE.DirectionalLight(0x38BDF8, 0.7);
  rimLight.position.set(-160, -60, -100);
  scene.add(rimLight);

  // 3. Main Earth Pivot Group with Realistic 23.5° Axial Tilt
  const earthGroup = new THREE.Group();
  earthGroup.rotation.x = 0.38; // ~22° axial tilt
  earthGroup.rotation.y = -1.55; // Initial view towards India & Middle East
  scene.add(earthGroup);

  const earthRadius = 72;
  const textureLoader = new THREE.TextureLoader();

  // 4. Photorealistic Earth Sphere (NASA Blue Marble Texture)
  const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);
  const earthTexture = textureLoader.load('assets/images/earth-blue-marble.jpg', () => {
    renderer.render(scene, camera);
  });
  earthTexture.anisotropy = 8;

  const earthMat = new THREE.MeshPhongMaterial({
    map: earthTexture,
    shininess: 18,
    specular: new THREE.Color(0x224466),
    emissive: new THREE.Color(0x020814)
  });
  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthGroup.add(earthMesh);

  // 5. Realistic Atmosphere Cloud Layer Sphere
  const cloudGeo = new THREE.SphereGeometry(earthRadius + 0.8, 64, 64);
  const cloudTexture = textureLoader.load('assets/images/earth-clouds.png', () => {
    renderer.render(scene, camera);
  });
  const cloudMat = new THREE.MeshPhongMaterial({
    map: cloudTexture,
    transparent: true,
    opacity: 0.40,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const cloudMesh = new THREE.Mesh(cloudGeo, cloudMat);
  earthGroup.add(cloudMesh);

  // 6. Atmospheric Outer Blue Glow
  const atmosGeo = new THREE.SphereGeometry(earthRadius + 5.5, 48, 48);
  const atmosMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.62 - dot(vNormal, vec3(0, 0, 1.0)), 2.5);
        gl_FragColor = vec4(0.22, 0.74, 0.97, 1.0) * intensity * 0.95;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true
  });
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
  scene.add(atmosMesh);

  // 7. Global Hub Coordinates & Detailed Country Information
  const HUBS = [
    {
      id: 'vapi',
      country: 'India',
      flag: '🇮🇳',
      city: 'Vapi, Gujarat',
      name: 'Vapi HQ, India (Plant & R&D)',
      detail: 'Primary Active API & Culture Media Manufacturing HQ',
      lat: 20.38,
      lon: 72.91,
      isOrigin: true,
      region: 'asia',
      color: 0xD2A660
    },
    {
      id: 'germany',
      country: 'Germany',
      flag: '🇩🇪',
      city: 'Frankfurt',
      name: 'Frankfurt, Germany',
      detail: 'European Regulatory (EDQM/EMA) Supply Hub',
      lat: 50.11,
      lon: 8.68,
      region: 'europe',
      color: 0x38BDF8
    },
    {
      id: 'uk',
      country: 'United Kingdom',
      flag: '🇬🇧',
      city: 'London',
      name: 'London, United Kingdom',
      detail: 'MHRA Pharmacopoeial Compliance Node',
      lat: 51.50,
      lon: -0.12,
      region: 'europe',
      color: 0x38BDF8
    },
    {
      id: 'uae',
      country: 'UAE',
      flag: '🇦🇪',
      city: 'Dubai',
      name: 'Dubai, UAE',
      detail: 'GCC & Middle East Cold-Chain Logistics Hub',
      lat: 25.20,
      lon: 55.27,
      region: 'mideast',
      color: 0xFBBF24
    },
    {
      id: 'saudi',
      country: 'Saudi Arabia',
      flag: '🇸🇦',
      city: 'Riyadh',
      name: 'Riyadh, Saudi Arabia',
      detail: 'SFDA Pharma & Diagnostic Distribution',
      lat: 24.71,
      lon: 46.67,
      region: 'mideast',
      color: 0xFBBF24
    },
    {
      id: 'singapore',
      country: 'Singapore',
      flag: '🇸🇬',
      city: 'Singapore',
      name: 'Singapore Hub',
      detail: 'Asia-Pacific BioPharma & Sterile Media Hub',
      lat: 1.35,
      lon: 103.81,
      region: 'asia',
      color: 0x34D399
    },
    {
      id: 'japan',
      country: 'Japan',
      flag: '🇯🇵',
      city: 'Tokyo',
      name: 'Tokyo, Japan',
      detail: 'PMDA Quality Validated Supply Gateway',
      lat: 35.67,
      lon: 139.65,
      region: 'asia',
      color: 0x34D399
    },
    {
      id: 'usa',
      country: 'United States',
      flag: '🇺🇸',
      city: 'New Jersey',
      name: 'New Jersey / NY, USA',
      detail: 'US-FDA DMF & Technical Assay Gateway',
      lat: 40.71,
      lon: -74.00,
      region: 'americas',
      color: 0x818CF8
    },
    {
      id: 'brazil',
      country: 'Brazil',
      flag: '🇧🇷',
      city: 'São Paulo',
      name: 'São Paulo, Brazil',
      detail: 'Latin America ANVISA Supply Center',
      lat: -23.55,
      lon: -46.63,
      region: 'americas',
      color: 0x818CF8
    },
    {
      id: 'southafrica',
      country: 'South Africa',
      flag: '🇿🇦',
      city: 'Johannesburg',
      name: 'Johannesburg, South Africa',
      detail: 'Sub-Saharan Africa Bulk Distribution Node',
      lat: -26.20,
      lon: 28.04,
      region: 'africa',
      color: 0xFB923C
    },
    {
      id: 'kenya',
      country: 'Kenya',
      flag: '🇰🇪',
      city: 'Nairobi',
      name: 'Nairobi, Kenya',
      detail: 'East Africa Health Authority Supply Terminal',
      lat: -1.29,
      lon: 36.82,
      region: 'africa',
      color: 0xFB923C
    },
    {
      id: 'australia',
      country: 'Australia',
      flag: '🇦🇺',
      city: 'Sydney',
      name: 'Sydney, Australia',
      detail: 'TGA Standard Intermediates Gateway',
      lat: -33.86,
      lon: 151.20,
      region: 'asia',
      color: 0x34D399
    }
  ];

  // Helper: Convert Lat/Lon to 3D Cartesian coordinates on sphere
  function latLonToVec3(lat, lon, r = earthRadius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    return new THREE.Vector3(
      - (r * Math.sin(phi) * Math.cos(theta)),
      (r * Math.cos(phi)),
      (r * Math.sin(phi) * Math.sin(theta))
    );
  }

  const originHub = HUBS.find(h => h.isOrigin);
  const originPos = latLonToVec3(originHub.lat, originHub.lon, earthRadius);

  // 8. Add 3D Hub Pins, Beacons & Pulse Waves
  const pulseWaves = [];
  const hubObjects = [];

  HUBS.forEach(hub => {
    const pos = latLonToVec3(hub.lat, hub.lon, earthRadius);
    hub.position = pos;

    if (hub.isOrigin) {
      // VAPI HQ - Prominent Gold Pin & Diamond Beacon
      const pinGeo = new THREE.SphereGeometry(2.4, 16, 16);
      const pinMat = new THREE.MeshBasicMaterial({ color: 0xFCD34D });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      earthGroup.add(pinMesh);

      // Vertical 3D Light Beacon
      const beamGeo = new THREE.CylinderGeometry(0.4, 0.4, 12, 8);
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xFCD34D,
        transparent: true,
        opacity: 0.85
      });
      const beamMesh = new THREE.Mesh(beamGeo, beamMat);
      beamMesh.position.copy(pos.clone().multiplyScalar(1.08));
      beamMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), pos.clone().normalize());
      earthGroup.add(beamMesh);

      // Animated Expanding Wave Ring
      const ringGeo = new THREE.RingGeometry(1.5, 2.2, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xFCD34D,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.01));
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
      earthGroup.add(ringMesh);

      pulseWaves.push({ mesh: ringMesh, maxScale: 4.5, currentScale: 1, speed: 0.045 });
      hubObjects.push({ hub: hub, mesh: pinMesh });

    } else {
      // Destination Hub Pin
      const pinGeo = new THREE.SphereGeometry(1.6, 12, 12);
      const pinMat = new THREE.MeshBasicMaterial({ color: hub.color || 0x38BDF8 });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.copy(pos);
      earthGroup.add(pinMesh);

      // Small ripple ring
      const ringGeo = new THREE.RingGeometry(1.0, 1.6, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: hub.color || 0x38BDF8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.65
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.copy(pos.clone().multiplyScalar(1.01));
      ringMesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), pos.clone().normalize());
      earthGroup.add(ringMesh);

      pulseWaves.push({ mesh: ringMesh, maxScale: 3.2, currentScale: 1 + Math.random(), speed: 0.035 });
      hubObjects.push({ hub: hub, mesh: pinMesh });
    }
  });

  // 9. Create Dynamic Country Labels in DOM Overlay
  const labelsContainer = document.getElementById('globeLabelsContainer');
  const countryBadges = [];

  if (labelsContainer) {
    labelsContainer.innerHTML = '';
    HUBS.forEach(hub => {
      const badge = document.createElement('div');
      badge.className = `globe-country-badge ${hub.isOrigin ? 'origin' : ''}`;
      badge.innerHTML = `
        <span>${hub.flag}</span>
        <span class="badge-country-name">${hub.country}</span>
        ${hub.isOrigin ? '<span class="badge-city-sub">(HQ)</span>' : ''}
      `;
      badge.addEventListener('mouseenter', () => {
        showTooltip(hub, parseFloat(badge.style.left) || 0, parseFloat(badge.style.top) || 0);
      });
      badge.addEventListener('mouseleave', () => {
        hideTooltip();
      });
      labelsContainer.appendChild(badge);
      countryBadges.push({ hub: hub, el: badge });
    });
  }

  // 10. Create 3D Elevated Supply Arcs & Traveling Light Photons
  const activeRoutes = [];

  HUBS.filter(h => !h.isOrigin).forEach((dest, idx) => {
    const destPos = latLonToVec3(dest.lat, dest.lon, earthRadius);
    const dist = originPos.distanceTo(destPos);

    // Compute elevated 3D midpoint for arc
    const mid = originPos.clone().add(destPos).multiplyScalar(0.5);
    const alt = earthRadius + Math.min(dist * 0.32 + 6, 32);
    mid.normalize().multiplyScalar(alt);

    const curve = new THREE.QuadraticBezierCurve3(originPos, mid, destPos);
    const curvePoints = curve.getPoints(50);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(curvePoints);

    // Glowing Golden Route Line
    const lineMat = new THREE.LineBasicMaterial({
      color: 0xD2A660,
      transparent: true,
      opacity: 0.65,
      linewidth: 1.5
    });
    const lineMesh = new THREE.Line(lineGeo, lineMat);
    earthGroup.add(lineMesh);

    // Traveling Photon (Glowing light bead)
    const photonGeo = new THREE.SphereGeometry(1.2, 8, 8);
    const photonMat = new THREE.MeshBasicMaterial({ color: 0xFFFBEB });
    const photonMesh = new THREE.Mesh(photonGeo, photonMat);
    earthGroup.add(photonMesh);

    activeRoutes.push({
      dest: dest,
      line: lineMesh,
      curve: curve,
      photon: photonMesh,
      progress: (idx * 0.12) % 1,
      speed: 0.005 + (idx % 3) * 0.002
    });
  });

  // 11. Animation Loop Variables
  let autoRotateSpeed = 0.0026;
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let velocityX = 0;
  let velocityY = 0;
  let activeRegion = 'all';

  function animate() {
    requestAnimationFrame(animate);

    // Clouds rotate independently slightly faster for dynamic realism
    cloudMesh.rotation.y += 0.0007;

    // Earth auto-rotation or dragging inertia
    if (!isDragging) {
      if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
        earthGroup.rotation.y += velocityX;
        earthGroup.rotation.x += velocityY;
        velocityX *= 0.92;
        velocityY *= 0.92;
        earthGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthGroup.rotation.x));
      } else {
        earthGroup.rotation.y += autoRotateSpeed;
      }
    }

    // Animate Expanding Wave Rings
    pulseWaves.forEach(p => {
      p.currentScale += p.speed;
      if (p.currentScale > p.maxScale) {
        p.currentScale = 1;
      }
      p.mesh.scale.set(p.currentScale, p.currentScale, p.currentScale);
      p.mesh.material.opacity = Math.max(0, 0.8 * (1 - (p.currentScale - 1) / (p.maxScale - 1)));
    });

    // Animate Traveling Light Photons along 3D curves
    activeRoutes.forEach(route => {
      if (activeRegion !== 'all' && route.dest.region !== activeRegion) {
        route.line.visible = false;
        route.photon.visible = false;
        return;
      }
      route.line.visible = true;
      route.photon.visible = true;

      route.progress = (route.progress + route.speed) % 1;
      const pointOnCurve = route.curve.getPoint(route.progress);
      route.photon.position.copy(pointOnCurve);
    });

    // Update Country Labels Positions & Visibility on the 3D Sphere
    countryBadges.forEach(item => {
      if (activeRegion !== 'all' && !item.hub.isOrigin && item.hub.region !== activeRegion) {
        item.el.style.display = 'none';
        return;
      }

      const worldPos = item.hub.position.clone();
      item.hub.mesh = item.hub.mesh || earthGroup;
      earthGroup.localToWorld(worldPos);

      const viewVec = worldPos.clone().sub(camera.position);
      const normalVec = worldPos.clone().normalize();
      const dot = viewVec.dot(normalVec);

      // Visible when facing front side of Earth
      if (dot < -0.15) {
        const screenPos = worldPos.project(camera);
        const sx = (screenPos.x * 0.5 + 0.5) * width;
        const sy = (-(screenPos.y * 0.5) + 0.5) * height;

        const depthAlpha = Math.pow(Math.min(1, Math.max(0, -dot * 1.5)), 1.2);

        item.el.style.display = 'inline-flex';
        item.el.style.left = `${sx}px`;
        item.el.style.top = `${sy}px`;
        item.el.style.opacity = depthAlpha.toFixed(2);
        item.el.style.transform = `translate(7px, -50%) scale(${(0.85 + depthAlpha * 0.18).toFixed(2)})`;
      } else {
        item.el.style.display = 'none';
      }
    });

    renderer.render(scene, camera);
  }

  animate();

  // 12. Interactive Drag-to-Rotate Controls
  container.addEventListener('pointerdown', (e) => {
    isDragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    velocityX = 0;
    velocityY = 0;
    try { container.setPointerCapture(e.pointerId); } catch (_) {}
  });

  container.addEventListener('pointermove', (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    if (isDragging) {
      const deltaX = e.clientX - lastX;
      const deltaY = e.clientY - lastY;
      velocityX = deltaX * 0.004;
      velocityY = deltaY * 0.004;
      earthGroup.rotation.y += velocityX;
      earthGroup.rotation.x += velocityY;
      earthGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthGroup.rotation.x));
      lastX = e.clientX;
      lastY = e.clientY;
      hideTooltip();
    } else {
      // Check City Hover using 3D screen projection
      let hovered = null;
      hubObjects.forEach(item => {
        const worldPos = item.mesh.position.clone();
        item.mesh.localToWorld(worldPos);

        const viewVec = worldPos.clone().sub(camera.position);
        const normalVec = worldPos.clone().normalize();
        const dot = viewVec.dot(normalVec);

        if (dot < 0) { // Front facing
          const screenPos = worldPos.project(camera);
          const sx = (screenPos.x * 0.5 + 0.5) * width;
          const sy = (-(screenPos.y * 0.5) + 0.5) * height;

          const dist = Math.hypot(sx - mouseX, sy - mouseY);
          if (dist < 18) {
            hovered = { hub: item.hub, x: sx, y: sy };
          }
        }
      });

      if (hovered) {
        showTooltip(hovered.hub, hovered.x, hovered.y);
      } else {
        hideTooltip();
      }
    }
  });

  function stopDrag(e) {
    if (isDragging) {
      isDragging = false;
      try { container.releasePointerCapture(e.pointerId); } catch (_) {}
    }
  }

  container.addEventListener('pointerup', stopDrag);
  container.addEventListener('pointercancel', stopDrag);
  container.addEventListener('mouseleave', () => {
    hideTooltip();
  });

  function showTooltip(hub, x, y) {
    if (!tooltip || !tooltipCity || !tooltipDetail) return;
    tooltipCity.textContent = hub.name;
    tooltipDetail.textContent = hub.detail;
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.classList.add('visible');
  }

  function hideTooltip() {
    if (tooltip) tooltip.classList.remove('visible');
  }

  // 13. Region Focus Quick Buttons
  const regionButtons = document.querySelectorAll('.globe-region-btn');
  const regionAngles = {
    all: -1.55,
    europe: -0.25,
    mideast: -0.95,
    asia: -2.35,
    americas: 1.15,
    africa: -0.65
  };

  regionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      regionButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const region = btn.getAttribute('data-region') || 'all';
      activeRegion = region;

      if (regionAngles[region] !== undefined) {
        const target = regionAngles[region];
        let startTime = performance.now();
        const startRotY = earthGroup.rotation.y;
        const duration = 850;

        function animateFocus(now) {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          earthGroup.rotation.y = startRotY + (target - (startRotY % (Math.PI * 2))) * ease;
          if (progress < 1) {
            requestAnimationFrame(animateFocus);
          }
        }
        requestAnimationFrame(animateFocus);
      }
    });
  });

  // 14. Responsive Resize Handler
  function onWindowResize() {
    width = container.clientWidth || 480;
    height = container.clientHeight || 480;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  window.addEventListener('resize', onWindowResize);
}


