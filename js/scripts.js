// ====================
// === MOBILE MENU TOGGLE ===
// ====================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  const isActive = navMenu.classList.contains('active');
  menuToggle.setAttribute('aria-expanded', isActive);
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
    navMenu.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', false);
  }
});

// ====================
// === SMOOTH SCROLLING FOR ANCHOR LINKS ===
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      navMenu.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', false);
    }
  });
});

// ====================
// === WHATSAPP PREFILL MESSAGE ===
// ====================
document.querySelectorAll('[href*="wa.me"]').forEach(link => {
  link.href = 'https://wa.me/27815859755?text=Hi! I need a quote for...';
});

// ====================
// === ANIMATE ELEMENTS ON SCROLL ===
// ====================
const animateOnScroll = () => {
  const elements = document.querySelectorAll('.feature-card, .service-card');
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const elTop = el.getBoundingClientRect().top;
    if (elTop < windowHeight - 100 && !el.classList.contains('visible')) {
      el.classList.add('visible');
    }
  });
};

let lastScroll = 0;
const requestScrollAnimation = () => {
  const now = Date.now();
  if (now - lastScroll > 100) {
    lastScroll = now;
    animateOnScroll();
  }
  window.requestAnimationFrame(requestScrollAnimation);
};

window.addEventListener('scroll', requestScrollAnimation);
window.addEventListener('load', animateOnScroll);

// ====================
// === MOBILE DROPDOWN TOGGLE ===
// ====================
document.addEventListener('click', (e) => {
  const isDropdownToggle = e.target.closest('.dropdown > a');
  if (isDropdownToggle) {
    if (window.innerWidth < 768) {
      e.preventDefault();
      const dropdown = isDropdownToggle.parentElement;
      const isActive = dropdown.classList.toggle('active');
      isDropdownToggle.setAttribute('aria-expanded', isActive);
    }
  } else {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
      const dropdownLink = dropdown.querySelector('a');
      if (dropdownLink) dropdownLink.setAttribute('aria-expanded', 'false');
    });
  }
});

// ====================
// === INITIALIZE ACCESSIBILITY ATTRIBUTES ===
// ====================
document.querySelectorAll('.dropdown > a').forEach(anchor => {
  anchor.setAttribute('aria-expanded', 'false');
});

// ====================
// === DARK MODE TOGGLE ===
// ====================
const darkModeToggle = document.querySelector('#dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
  });

  const savedDarkMode = localStorage.getItem('darkMode') === 'true';
  if (savedDarkMode) {
    document.body.classList.add('dark-mode');
  }
}
