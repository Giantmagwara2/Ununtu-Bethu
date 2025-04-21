// ====================
// === MOBILE MENU TOGGLE ===
// ====================
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.querySelector('.navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
  const isActive = navbar.classList.contains('active');
  menuToggle.setAttribute('aria-expanded', isActive);
});

// ====================
// === SMOOTH SCROLLING FOR ANCHOR LINKS ===
// ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = anchor.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });

      // Close mobile menu after navigation
      navbar.classList.remove('active');
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
  // Handle dropdown toggle
  const isDropdownToggle = e.target.matches('.dropdown > a');
  if (isDropdownToggle) {
    if (window.innerWidth < 768) {
      e.preventDefault();
      const dropdown = e.target.parentElement;
      const isActive = dropdown.classList.toggle('active');
      e.target.setAttribute('aria-expanded', isActive);
    }
  } else {
    // Close all dropdowns when clicking outside
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
      dropdown.querySelector('a').setAttribute('aria-expanded', 'false');
    });
  }
});

// ====================
// === INITIALIZE ACCESSIBILITY ATTRIBUTES ===
// ====================
document.querySelectorAll('.dropdown > a').forEach(anchor => {
  anchor.setAttribute('aria-expanded', 'false');
});