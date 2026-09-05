/**
 * LUMINA Studio - Portfolio Fotografico Interattivo
 * Funzionalità: Dark/Light Mode, Gallery Filter, Lightbox modale con navigazione tastiera, Mobile Menu e Form contatti.
 */

// Dati della galleria fotografica ad alta risoluzione (immagini curate con metadati EXIF fotografici)
const galleryData = [
  {
    id: 1,
    category: 'portrait',
    title: 'Sguardo nel Tempo',
    subtitle: 'Ritratto in studio con luce morbida',
    camera: 'Sony A7R V • 85mm f/1.4 GM • 1/250s ISO 100',
    src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 2,
    category: 'landscape',
    title: 'Alba sulle Dolomiti',
    subtitle: 'Prime luci tra le vette alpine',
    camera: 'Nikon Z8 • 24-70mm f/2.8 S • 1/15s f/11 ISO 64',
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[16/10]'
  },
  {
    id: 3,
    category: 'street',
    title: 'Riflessi di Pioggia a Tokyo',
    subtitle: 'Lanterne al neon e ombre nella notte',
    camera: 'Leica Q2 • 28mm f/1.7 Summilux • 1/125s f/2.0 ISO 1600',
    src: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 4,
    category: 'architecture',
    title: 'Geometrie di Cemento e Vetro',
    subtitle: 'Prospettive minimaliste e ombre pure',
    camera: 'Fujifilm GFX 100 II • 32-64mm f/4 • 1/60s f/8 ISO 100',
    src: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 5,
    category: 'portrait',
    title: 'Silhouette al Tramonto',
    subtitle: 'Contrasto naturale in riva al mare',
    camera: 'Canon EOS R5 • 50mm f/1.2 L • 1/1000s f/1.8 ISO 200',
    src: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 6,
    category: 'landscape',
    title: 'Il Respiro delle Onde',
    subtitle: 'Costa rocciosa e lunga esposizione',
    camera: 'Sony A1 • 16-35mm f/2.8 GM II • 2.5s f/13 ISO 50 (ND1000)',
    src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[16/9]'
  },
  {
    id: 7,
    category: 'street',
    title: 'La Vita che Scorre',
    subtitle: 'Momenti autentici nel cuore di Parigi',
    camera: 'Leica M11 • 35mm f/1.4 ASPH • 1/500s f/4 ISO 400',
    src: 'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[4/3]'
  },
  {
    id: 8,
    category: 'architecture',
    title: 'Curve del Futuro',
    subtitle: 'Architettura contemporanea a Valencia',
    camera: 'Sony A7R V • 24mm f/1.4 GM • 1/400s f/5.6 ISO 100',
    src: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[3/4]'
  },
  {
    id: 9,
    category: 'events',
    title: 'La Magia del Primo Ballo',
    subtitle: 'Emozioni autentiche nel giorno più bello',
    camera: 'Canon EOS R6 Mark II • 70-200mm f/2.8 L • 1/200s f/2.8 ISO 3200',
    src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    aspect: 'aspect-[16/10]'
  }
];

// Stato dell'applicazione
let currentFilteredList = [...galleryData];
let currentLightboxIndex = 0;

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMobileMenu();
  renderGallery('all');
  initFilters();
  initLightbox();
  initContactForm();
  initNavbarScroll();
});

/* ======================================================
   1. GESTIONE TEMA DARK / LIGHT
   ====================================================== */
function initTheme() {
  const themeToggleButtons = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('lumina_theme');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  themeToggleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('lumina_theme', isDark ? 'dark' : 'light');
    });
  });

  // Ascolta cambi tema dal sistema
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('lumina_theme')) {
      if (e.matches) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  });
}

/* ======================================================
   2. NAVBAR BLUR & SCROLL DETECT
   ====================================================== */
function initNavbarScroll() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('bg-white/85', 'dark:bg-neutral-950/85', 'shadow-md', 'backdrop-blur-md');
      header.classList.remove('bg-transparent');
    } else {
      header.classList.remove('bg-white/85', 'dark:bg-neutral-950/85', 'shadow-md', 'backdrop-blur-md');
      header.classList.add('bg-transparent');
    }
  });
}

/* ======================================================
   3. MENU MOBILE DRAWER
   ====================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = mobileMenu.querySelectorAll('a');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ======================================================
   4. RENDERING GALLERIA & FILTRI
   ====================================================== */
function renderGallery(filter = 'all') {
  const container = document.getElementById('gallery-container');
  if (!container) return;

  currentFilteredList = filter === 'all' 
    ? galleryData 
    : galleryData.filter(item => item.category === filter);

  container.innerHTML = '';

  currentFilteredList.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `gallery-card group relative overflow-hidden rounded-2xl cursor-pointer bg-neutral-100 dark:bg-neutral-800 ${item.aspect} shadow-sm hover:shadow-xl transition-all duration-300`;
    card.dataset.index = index;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', `Visualizza ${item.title}`);

    card.innerHTML = `
      <img 
        src="${item.src}" 
        alt="${item.title}" 
        loading="lazy" 
        class="w-full h-full object-cover object-center transform transition duration-700 ease-out"
      />
      <!-- Gradient & Info Overlay -->
      <div class="overlay absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent flex flex-col justify-end p-6 text-white pointer-events-none">
        <span class="text-xs uppercase font-semibold tracking-widest text-amber-400 mb-1">${item.category}</span>
        <h3 class="font-serif text-xl font-bold leading-tight mb-1">${item.title}</h3>
        <p class="text-xs text-neutral-300 font-light mb-2">${item.subtitle}</p>
        <div class="flex items-center text-[11px] text-neutral-400 font-mono gap-1 border-t border-white/20 pt-2">
          <svg class="w-3.5 h-3.5 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
          </svg>
          <span class="truncate">${item.camera}</span>
        </div>
      </div>
      <!-- Magnifier icon badge -->
      <div class="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7"></path>
        </svg>
      </div>
    `;

    // Eventi click e invio da tastiera
    card.addEventListener('click', () => openLightbox(index));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(index);
      }
    });

    container.appendChild(card);
  });
}

function initFilters() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      renderGallery(filter);
    });
  });
}

/* ======================================================
   5. LIGHTBOX MODALE CON SUPPORTO TOUCH & TASTIERA
   ====================================================== */
function initLightbox() {
  const lightbox = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (!lightbox) return;

  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', showPrevImage);
  nextBtn.addEventListener('click', showNextImage);

  // Clicca fuori dal box per chiudere
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox || e.target.id === 'lightbox-overlay') {
      closeLightbox();
    }
  });

  // Navigazione da tastiera
  window.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNextImage();
    if (e.key === 'ArrowLeft') showPrevImage();
  });
}

function openLightbox(index) {
  currentLightboxIndex = index;
  updateLightboxContent();
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden'; // Blocca scroll di sfondo
}

function closeLightbox() {
  const lightbox = document.getElementById('lightbox');
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function showNextImage() {
  if (currentFilteredList.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex + 1) % currentFilteredList.length;
  updateLightboxContent();
}

function showPrevImage() {
  if (currentFilteredList.length === 0) return;
  currentLightboxIndex = (currentLightboxIndex - 1 + currentFilteredList.length) % currentFilteredList.length;
  updateLightboxContent();
}

function updateLightboxContent() {
  const item = currentFilteredList[currentLightboxIndex];
  if (!item) return;

  const img = document.getElementById('lightbox-img');
  const title = document.getElementById('lightbox-title');
  const subtitle = document.getElementById('lightbox-subtitle');
  const camera = document.getElementById('lightbox-camera');
  const counter = document.getElementById('lightbox-counter');

  img.src = item.src;
  img.alt = item.title;
  title.textContent = item.title;
  subtitle.textContent = item.subtitle;
  camera.textContent = item.camera;
  counter.textContent = `${currentLightboxIndex + 1} / ${currentFilteredList.length}`;
}

/* ======================================================
   6. CONTATTI & INVIO REALE EMAIL (Web3Forms / Formspree)
   ====================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const formSuccess = document.getElementById('form-success-banner');
  const formError = document.getElementById('form-error-banner');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Controlla validità campi nativa
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Feedback animato di invio in corso
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Invio in corso...
    `;

    if (formError) formError.classList.add('hidden');

    const actionUrl = form.getAttribute('action');

    // Se l'utente ha inserito un endpoint reale (Google Apps Script o API esterna)
    if (actionUrl && actionUrl.startsWith('http')) {
      try {
        const formData = new FormData(form);
        
        // Invio compatibile con Google Apps Script e form endpoints
        const response = await fetch(actionUrl, {
          method: 'POST',
          body: formData,
          mode: 'no-cors' // Necessario per Google Apps Script per evitare blocchi CORS sui redirect
        });

        // Con no-cors il browser riceve una opaque response (status 0), considerata successo
        showSuccess();
      } catch (err) {
        if (formError) {
          formError.classList.remove('hidden');
          formError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          alert('Si è verificato un errore durante l\'invio. Riprova più tardi.');
        }
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
      }
    } else {
      // Modalità dimostrativa/fallback locale
      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        showSuccess();
      }, 1000);
    }

    function showSuccess() {
      form.reset();
      if (formSuccess) {
        formSuccess.classList.remove('hidden');
        formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => {
          formSuccess.classList.add('hidden');
        }, 8000);
      }
    }
  });
}
