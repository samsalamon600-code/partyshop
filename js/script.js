/**
 * ==========================================================================
 * CELEBRATION HUB PARTY SHOP - MAIN SCRIPT
 * Production-ready Vanilla JavaScript for Local Business Showcase
 * ==========================================================================
 */

// ==========================================================================
// 1. BUSINESS CONFIGURATION (EDIT THIS TO UPDATE THE WHOLE WEBSITE)
// ==========================================================================
const BUSINESS = {
  // Business Identity
  name: "Celebration Hub Party Shop",
  tagline: "Your Premier Local Party Supplies & Decoration Specialists",
  
  // WhatsApp Number: Enter with country code, digits only (no spaces, dashes, or +)
  // Example for India: "919876543210", USA/Canada: "12345678901", UK: "447123456789"
  whatsapp: "1234567890", 

  // Formatted display phone number
  phone: "+1 (234) 567-890",

  // Physical Store Address & Location
  address: "100 Celebration Blvd, Suite 4, Party City, PC 54321",
  landmark: "Opposite City Central Mall, Ground Floor",
  
  // Google Maps URL (for Get Directions button)
  googleMapsUrl: "https://maps.google.com/?q=100+Celebration+Blvd+Party+City",

  // Google Maps Embed Iframe URL
  googleMapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.816279742021665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ4JzU4LjYiUyAxNDTCsDU3JzEzLjQiRQ!5e0!3m2!1sen!2sus!4v1614000000000!5m2!1sen!2sus",

  // Social Media Links (leave empty "" if unavailable)
  instagram: "https://instagram.com",
  facebook: "https://facebook.com",

  // Configurable Weekly Opening Hours (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  // Format: open & close in 24hr HH:MM string for accurate calculation
  hours: [
    { dayIndex: 0, dayName: "Sunday", open: "10:00", close: "20:00", display: "10:00 AM – 8:00 PM" },
    { dayIndex: 1, dayName: "Monday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 2, dayName: "Tuesday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 3, dayName: "Wednesday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 4, dayName: "Thursday", open: "09:30", close: "21:00", display: "9:30 AM – 9:00 PM" },
    { dayIndex: 5, dayName: "Friday", open: "09:30", close: "21:30", display: "9:30 AM – 9:30 PM" },
    { dayIndex: 6, dayName: "Saturday", open: "09:00", close: "21:30", display: "9:00 AM – 9:30 PM" }
  ]
};

// ==========================================================================
// 2. DOM CONTENT INITIALIZATION
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
  console.log(`🎈 Initializing ${BUSINESS.name} website...`);

  // Bind business information to DOM elements
  initBusinessData();

  // Initialize dynamic opening hours and "Open Today" logic
  initOpeningHours();

  // Setup dynamic WhatsApp action buttons
  initWhatsAppButtons();

  // Setup navigation & sticky header
  initNavigation();

  // Setup gallery category filters & interactive lightbox
  initGalleryAndLightbox();

  // Setup scroll animations
  initScrollAnimations();

  // Floating WhatsApp tooltip timer
  initFloatingWhatsApp();
});

// ==========================================================================
// 3. BIND BUSINESS DATA TO HTML
// ==========================================================================
function initBusinessData() {
  // Update Business Names
  document.querySelectorAll('.biz-name').forEach(el => {
    el.textContent = BUSINESS.name;
  });

  // Update Addresses
  document.querySelectorAll('.biz-address').forEach(el => {
    el.textContent = BUSINESS.address;
  });

  // Update Phone Numbers and tel: links
  document.querySelectorAll('.biz-phone').forEach(el => {
    el.textContent = BUSINESS.phone;
  });

  document.querySelectorAll('.biz-phone-link').forEach(el => {
    const cleanTel = BUSINESS.phone.replace(/[^0-9+]/g, '');
    el.setAttribute('href', `tel:${cleanTel}`);
  });

  // Update WhatsApp display texts
  document.querySelectorAll('.biz-whatsapp-display').forEach(el => {
    el.textContent = BUSINESS.phone;
  });

  // Update Google Maps Links
  document.querySelectorAll('.js-maps-link').forEach(el => {
    el.setAttribute('href', BUSINESS.googleMapsUrl);
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  // Update Google Maps Iframe if provided
  const mapIframe = document.getElementById('googleMapsIframe');
  if (mapIframe && BUSINESS.googleMapsEmbed) {
    mapIframe.src = BUSINESS.googleMapsEmbed;
  }

  // Update Social Links
  const instagramLinks = document.querySelectorAll('.js-instagram-link');
  instagramLinks.forEach(link => {
    if (BUSINESS.instagram) {
      link.href = BUSINESS.instagram;
      link.style.display = 'inline-flex';
    } else {
      link.style.display = 'none';
    }
  });

  const facebookLinks = document.querySelectorAll('.js-facebook-link');
  facebookLinks.forEach(link => {
    if (BUSINESS.facebook) {
      link.href = BUSINESS.facebook;
      link.style.display = 'inline-flex';
    } else {
      link.style.display = 'none';
    }
  });
}

// ==========================================================================
// 4. OPENING HOURS & DYNAMIC "OPEN TODAY" STATUS
// ==========================================================================
function initOpeningHours() {
  const now = new Date();
  const currentDayIndex = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  const currentTimeVal = currentHour * 60 + currentMinute;

  // Find today's configured hours
  const todayConfig = BUSINESS.hours.find(h => h.dayIndex === currentDayIndex) || BUSINESS.hours[1];

  // Parse today's open and close times in minutes
  const [openH, openM] = todayConfig.open.split(':').map(Number);
  const [closeH, closeM] = todayConfig.close.split(':').map(Number);
  const openTimeVal = openH * 60 + openM;
  const closeTimeVal = closeH * 60 + closeM;

  const isOpenNow = currentTimeVal >= openTimeVal && currentTimeVal < closeTimeVal;

  // 1. Highlight today's row in the hours schedule
  const hoursRows = document.querySelectorAll('.hours-row');
  hoursRows.forEach(row => {
    const rowDay = parseInt(row.getAttribute('data-day'), 10);
    if (rowDay === currentDayIndex) {
      row.classList.add('is-today');
    } else {
      row.classList.remove('is-today');
    }
  });

  // 2. Format status badge & quick texts
  const statusBadge = document.getElementById('quickLiveStatus');
  const quickTodayHours = document.getElementById('quickTodayHours');
  const hoursLiveBadge = document.getElementById('hoursLiveBadge');
  const contactTodayHours = document.getElementById('contactTodayHours');

  if (isOpenNow) {
    if (statusBadge) {
      statusBadge.textContent = 'Open Now';
      statusBadge.className = 'badge-status status-open';
    }
    if (hoursLiveBadge) {
      hoursLiveBadge.textContent = `🟢 Open Today until ${format12h(todayConfig.close)}`;
    }
    if (contactTodayHours) {
      contactTodayHours.textContent = `Open Today until ${format12h(todayConfig.close)}`;
    }
  } else {
    if (statusBadge) {
      statusBadge.textContent = 'Closed Now';
      statusBadge.className = 'badge-status status-closed';
    }
    if (hoursLiveBadge) {
      hoursLiveBadge.textContent = `🔴 Closed Now • Opens at ${format12h(todayConfig.open)}`;
    }
    if (contactTodayHours) {
      contactTodayHours.textContent = `Closed Now • Opens at ${format12h(todayConfig.open)}`;
    }
  }

  if (quickTodayHours) {
    quickTodayHours.textContent = `Today: ${todayConfig.display}`;
  }
}

// Convert "21:00" to "9:00 PM"
function format12h(time24) {
  const [h, m] = time24.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  const mStr = m < 10 ? `0${m}` : m;
  return `${h12}:${mStr} ${period}`;
}

// ==========================================================================
// 5. DYNAMIC WHATSAPP ENQUIRY GENERATOR
// ==========================================================================
function initWhatsAppButtons() {
  const whatsappButtons = document.querySelectorAll('.js-whatsapp-btn');

  whatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();

      const type = btn.getAttribute('data-type') || 'general';
      const itemName = btn.getAttribute('data-name') || '';

      let prefilledMessage = '';

      switch (type) {
        case 'category':
          // Section 8 Requirement
          prefilledMessage = `Hi, I am interested in your ${itemName} collection. Could you please share the available options and prices?`;
          break;

        case 'product':
          // Section 9 Requirement
          prefilledMessage = `Hi, I'm interested in the ${itemName}. Could you please share the price and availability?`;
          break;

        case 'service':
          // Section 10 Requirement
          prefilledMessage = `Hi, I would like to enquire about your ${itemName} services for an upcoming event. Could you share more details?`;
          break;

        case 'theme':
          // Section 11 Requirement
          prefilledMessage = `Hi, I would like to explore your ${itemName} celebration theme decoration packages. Could you share options?`;
          break;

        case 'gallery':
          // Section 12 Requirement
          prefilledMessage = `Hi, I saw the "${itemName}" setup on your website gallery and would love to enquire about similar decoration for my celebration!`;
          break;

        case 'floating':
          // Section 18 Requirement
          prefilledMessage = `Hi, I found your party shop website and would like to know more about your products.`;
          break;

        case 'general':
        default:
          prefilledMessage = `Hi, I found your party shop website and would like to enquire about your party items and decoration services.`;
          break;
      }

      openWhatsApp(prefilledMessage);
    });
  });
}

function openWhatsApp(message) {
  const cleanNumber = BUSINESS.whatsapp.replace(/[^0-9]/g, '');
  const encodedText = encodeURIComponent(message);
  const waUrl = `https://wa.me/${cleanNumber}?text=${encodedText}`;
  window.open(waUrl, '_blank', 'noopener,noreferrer');
}

// ==========================================================================
// 6. STICKY NAVBAR, SCROLLSPY & MOBILE MENU
// ==========================================================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');
  const navBackdrop = document.getElementById('navBackdrop');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shrink on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('header-scrolled');
    } else {
      navbar.classList.remove('header-scrolled');
    }
  }, { passive: true });

  // Toggle mobile navigation drawer
  function toggleMobileMenu(open) {
    const isCurrentlyActive = navMenu.classList.contains('active');
    const shouldOpen = open !== undefined ? open : !isCurrentlyActive;

    if (shouldOpen) {
      navMenu.classList.add('active');
      navBackdrop.classList.add('active');
      navToggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navMenu.classList.remove('active');
      navBackdrop.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (navToggle) {
    navToggle.addEventListener('click', () => toggleMobileMenu());
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', () => toggleMobileMenu(false));
  }

  // Close mobile menu on link click & smooth scroll
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleMobileMenu(false);
    });
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
      toggleMobileMenu(false);
    }
  });

  // Scrollspy: Highlight active link based on current section in view
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

// ==========================================================================
// 7. GALLERY CATEGORY FILTERS & INTERACTIVE LIGHTBOX
// ==========================================================================
function initGalleryAndLightbox() {
  const filterTabs = document.querySelectorAll('.filter-tab');
  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const modal = document.getElementById('lightboxModal');
  const backdrop = document.getElementById('lightboxBackdrop');
  const closeBtn = document.getElementById('lightboxClose');
  const prevBtn = document.getElementById('lightboxPrev');
  const nextBtn = document.getElementById('lightboxNext');
  const lbImg = document.getElementById('lightboxImg');
  const lbTag = document.getElementById('lightboxTag');
  const lbTitle = document.getElementById('lightboxTitle');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbEnquireBtn = document.getElementById('lightboxEnquireBtn');

  let currentVisibleItems = [...galleryItems];
  let currentIndex = 0;

  // Filter functionality
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      const filterVal = tab.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCat = item.getAttribute('data-category');
        if (filterVal === 'all' || itemCat === filterVal) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });

      // Update current visible items for lightbox navigation
      currentVisibleItems = galleryItems.filter(item => !item.classList.contains('hidden'));
    });
  });

  // Open Lightbox
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      currentIndex = currentVisibleItems.indexOf(item);
      if (currentIndex === -1) currentIndex = 0;
      updateLightboxContent();
      openModal();
    });
  });

  function updateLightboxContent() {
    const activeItem = currentVisibleItems[currentIndex];
    if (!activeItem) return;

    const imgSrc = activeItem.getAttribute('data-src');
    const title = activeItem.getAttribute('data-title');
    const caption = activeItem.getAttribute('data-caption');
    const cat = activeItem.getAttribute('data-category');

    lbImg.src = imgSrc;
    lbImg.alt = title;
    lbTitle.textContent = title;
    lbCaption.textContent = caption;
    lbTag.textContent = cat.replace('-', ' ').toUpperCase();

    // Attach data for WhatsApp enquire button inside modal
    if (lbEnquireBtn) {
      lbEnquireBtn.setAttribute('data-type', 'gallery');
      lbEnquireBtn.setAttribute('data-name', title);
    }
  }

  function openModal() {
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function showNext() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    updateLightboxContent();
  }

  function showPrev() {
    if (currentVisibleItems.length === 0) return;
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    updateLightboxContent();
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

// ==========================================================================
// 8. SCROLL REVEAL ANIMATIONS
// ==========================================================================
function initScrollAnimations() {
  const animatedSelectors = [
    '.quick-info-card',
    '.category-card',
    '.product-item-card',
    '.service-card',
    '.theme-card',
    '.why-card',
    '.review-card',
    '.contact-card'
  ];

  const elementsToAnimate = document.querySelectorAll(animatedSelectors.join(', '));
  elementsToAnimate.forEach(el => el.classList.add('reveal-on-scroll'));

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -50px 0px',
      threshold: 0.1
    });

    elementsToAnimate.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    elementsToAnimate.forEach(el => el.classList.add('is-visible'));
  }
}

// ==========================================================================
// 9. FLOATING WHATSAPP BUTTON AUTO-HINT
// ==========================================================================
function initFloatingWhatsApp() {
  const tooltip = document.getElementById('whatsappTooltip');
  if (!tooltip) return;

  // Show tooltip initially after 3 seconds to catch attention, then hide after 6 seconds
  setTimeout(() => {
    tooltip.style.opacity = '1';
    tooltip.style.transform = 'translateY(0)';
  }, 3000);

  setTimeout(() => {
    tooltip.style.opacity = '';
    tooltip.style.transform = '';
  }, 9000);
}
