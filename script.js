// ---------- Theme toggle ----------
const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const THEME_KEY = 'tim-portfolio-theme';

function applyTheme(theme) {
  body.dataset.theme = theme;
  themeToggle.setAttribute('aria-pressed', theme === 'light');
  themeToggle.setAttribute('aria-label', theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme');
}

const savedTheme = localStorage.getItem(THEME_KEY);
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
applyTheme(savedTheme || (prefersLight ? 'light' : 'dark'));

themeToggle.addEventListener('click', () => {
  const next = body.dataset.theme === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

// ---------- Mobile nav ----------
const siteHeader = document.querySelector('.site-header');
const navToggle = document.getElementById('navToggle');

navToggle.addEventListener('click', () => {
  const isOpen = siteHeader.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

document.querySelectorAll('.main-nav a').forEach(link => {
  link.addEventListener('click', () => {
    siteHeader.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ---------- Contact form validation ----------
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

const validators = {
  name: value => value.trim().length > 1 || 'Enter your name.',
  email: value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || 'Enter a valid email address.',
  message: value => value.trim().length > 9 || 'Tell me a little more about the project.'
};

function setFieldError(field, message) {
  const row = field.closest('.form-row');
  const errorEl = row.querySelector('.field-error');
  if (message) {
    row.classList.add('has-error');
    errorEl.textContent = message;
  } else {
    row.classList.remove('has-error');
    errorEl.textContent = '';
  }
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formStatus.textContent = '';
  formStatus.className = 'form-status';

  let isValid = true;
  Object.entries(validators).forEach(([name, validate]) => {
    const field = form.elements[name];
    const result = validate(field.value);
    if (result !== true) {
      setFieldError(field, result);
      isValid = false;
    } else {
      setFieldError(field, null);
    }
  });

  if (!isValid) {
    formStatus.textContent = 'Please fix the highlighted fields.';
    formStatus.classList.add('error');
    return;
  }

  // NOTE: this is a static page — there's no backend to actually send the
  // message yet. Wire this up to a form service (e.g. Formspree, Getform)
  // or your own endpoint, then replace this block with the real request.
  formStatus.textContent = "Thanks — I'll get back to you soon.";
  formStatus.classList.add('success');
  form.reset();
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Feature detection: only run cursor/tilt on fine-pointer, non-reduced-motion devices ----------
const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const interactiveExtrasEnabled = canHover && !prefersReducedMotion;

// ---------- Custom cursor ----------
if (interactiveExtrasEnabled) {
  document.documentElement.classList.add('has-cursor');
  const cursorDot = document.getElementById('cursorDot');
  let cx = window.innerWidth / 2, cy = window.innerHeight / 2;

  window.addEventListener('mousemove', (e) => {
    cx = e.clientX;
    cy = e.clientY;
    cursorDot.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
  });

  document.querySelectorAll('a, button, .tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorDot.classList.add('is-hovering'));
    el.addEventListener('mouseleave', () => cursorDot.classList.remove('is-hovering'));
  });
}

// ---------- Magnetic buttons ----------
if (interactiveExtrasEnabled) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${relX * 0.25}px, ${relY * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

// ---------- Project card tilt ----------
if (interactiveExtrasEnabled) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${py * -6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0)';
    });
  });
}

// ---------- Scroll reveal (section-level, once) ----------
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('in-view'));
}

// ---------- Testimonial carousel ----------
const slides = document.querySelectorAll('.testimonial-slide');
const dotsWrap = document.getElementById('tDots');
const prevBtn = document.getElementById('tPrev');
const nextBtn = document.getElementById('tNext');
let activeSlide = 0;

if (slides.length && dotsWrap && prevBtn && nextBtn) {
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Show testimonial ${i + 1}`);
    if (i === 0) dot.classList.add('is-active');
    dot.addEventListener('click', () => goToSlide(i));
    dotsWrap.appendChild(dot);
  });

  function goToSlide(index) {
    slides[activeSlide].classList.remove('is-active');
    dotsWrap.children[activeSlide].classList.remove('is-active');
    activeSlide = (index + slides.length) % slides.length;
    slides[activeSlide].classList.add('is-active');
    dotsWrap.children[activeSlide].classList.add('is-active');
  }

  prevBtn.addEventListener('click', () => goToSlide(activeSlide - 1));
  nextBtn.addEventListener('click', () => goToSlide(activeSlide + 1));

  let autoplay = setInterval(() => goToSlide(activeSlide + 1), 6000);
  const carousel = document.querySelector('.testimonial-carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoplay));
  carousel.addEventListener('mouseleave', () => {
    autoplay = setInterval(() => goToSlide(activeSlide + 1), 6000);
  });
}
