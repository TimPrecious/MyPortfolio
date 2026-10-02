// The JavaScript stays small in Phase 1: it renders repeatable content and owns the theme/nav basics.
const data = portfolioData;
const root = document.documentElement;
const themeToggle = document.querySelector('#themeToggle');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// These small bindings keep the visible copy tied to the same editable content object as the cards.
document.querySelector('#hero-title').innerHTML = `<span>${data.name.replace(' ', '<br>')}</span>`;
document.querySelector('.role-line').firstChild.textContent = `${data.role} `;
const heroTagline = document.querySelector('.hero-tagline');
if (heroTagline) heroTagline.textContent = data.tagline;
document.querySelectorAll('.about-card .body-copy').forEach((paragraph, index) => {
    paragraph.textContent = data.bio[index];
});

// Rendering from data keeps project cards and skill tags consistent and easy to edit.
document.querySelector('#projectGrid').innerHTML = data.projects.map(project => `<article class="project-card"><div class="clipping-top"><span>cut / paste / repeat</span></div><div class="project-preview"><img src="${project.image}" alt="${project.title} project preview" loading="lazy"></div><div class="project-content"><h3>${project.title}</h3><p>${project.description}</p><ul class="tag-list">${project.tags.map(tag => `<li>${tag}</li>`).join('')}</ul><div class="project-links"><a href="${project.live}">Live <i class="bx bx-right-top-arrow-circle" aria-hidden="true"></i></a><a href="${project.code}">Code <i class="bx bxl-github" aria-hidden="true"></i></a></div></div></article>`).join('');
document.querySelector('#skillGroups').innerHTML = data.skillGroups.map(group => `<div class="skill-group"><h3>${group.title}</h3><ul>${group.items.map(item => `<li><i class="bx bx-check" aria-hidden="true"></i>${item}</li>`).join('')}</ul></div>`).join('');
document.querySelector('#blogGrid').innerHTML = data.blogPosts.map(post => `<article class="blog-card"><p class="blog-date">${post.date}</p><h3>${post.title}</h3><p class="blog-excerpt">${post.excerpt}</p><ul class="tag-list">${post.tags.map(tag => `<li>${tag}</li>`).join('')}</ul><a class="blog-link" href="#contact">read the next note <i class="bx bx-right-arrow-alt" aria-hidden="true"></i></a></article>`).join('');

// The toggle stores the choice so returning visitors get the same print treatment.
function setTheme(theme) {
    root.dataset.theme = theme;
    const isDark = theme === 'dark';
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.querySelector('i').className = isDark ? 'bx bx-sun' : 'bx bx-moon';
}

// View Transitions animate the whole theme change from the control that caused it.
function changeTheme(theme, pointerX, pointerY) {
    root.style.setProperty('--theme-x', `${pointerX}px`);
    root.style.setProperty('--theme-y', `${pointerY}px`);
    const update = () => {
        setTheme(theme);
        localStorage.setItem('portfolio-zine-theme', theme);
    };
    if (document.startViewTransition && !reducedMotion.matches) {
        document.startViewTransition(update);
    } else {
        root.classList.add('theme-fading');
        update();
        window.setTimeout(() => root.classList.remove('theme-fading'), 240);
    }
}

setTheme(root.dataset.theme || 'light');
themeToggle.addEventListener('click', event => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    changeTheme(nextTheme, event.clientX, event.clientY);
});

// A compact mobile menu makes the sticky navigation usable on narrow screens.
const navToggle = document.querySelector('#navToggle'); const siteNav = document.querySelector('#siteNav');
navToggle.addEventListener('click', () => { const isOpen = siteNav.classList.toggle('is-open'); navToggle.setAttribute('aria-expanded', String(isOpen)); navToggle.querySelector('i').className = isOpen ? 'bx bx-x' : 'bx bx-menu'; });
siteNav.addEventListener('click', event => { if (event.target.matches('a')) { siteNav.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.querySelector('i').className = 'bx bx-menu'; } });

const contactForm = document.querySelector('#contactForm');
contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const formStatus = document.querySelector('#formStatus');
    submitButton.disabled = true;
    formStatus.textContent = 'Sending...';

    try {
        const response = await fetch(contactForm.action, {
            method: 'POST',
            body: new FormData(contactForm),
            headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Form submission failed');

        formStatus.textContent = 'Thanks, your note has been sent.';
        contactForm.reset();
    } catch {
        formStatus.textContent = 'Your note could not be sent. Please try again.';
    } finally {
        submitButton.disabled = false;
    }
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Reveals add visual rhythm as the reader moves down the page, without changing layout geometry.
const revealItems = document.querySelectorAll('.section-heading, .about-card, .skill-group, .blog-card, .contact-form');
revealItems.forEach((item, index) => {
    item.classList.add('reveal');
    item.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`);
});

if (!reducedMotion.matches && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.16 });
    revealItems.forEach(item => revealObserver.observe(item));
} else {
    revealItems.forEach(item => item.classList.add('is-visible'));
}

// A single animation frame keeps parallax work cheap while the browser is scrolling.
const parallaxItems = document.querySelectorAll('.hero-art .sticker, .scribble, .about-card .hand-note');
let parallaxFrame = 0;
function updateParallax() {
    parallaxFrame = 0;
    const viewportMiddle = window.innerHeight / 2;
    parallaxItems.forEach((item, index) => {
        const distance = item.getBoundingClientRect().top + item.offsetHeight / 2 - viewportMiddle;
        const speed = index % 2 ? 0.035 : -0.025;
        item.style.setProperty('--parallax-y', `${distance * speed}px`);
    });
}
if (!reducedMotion.matches) {
    window.addEventListener('scroll', () => {
        if (!parallaxFrame) parallaxFrame = window.requestAnimationFrame(updateParallax);
    }, { passive: true });
    updateParallax();
}

// Duplicating the ticker text makes its loop seamless when the CSS animation reaches the end.
const marquee = document.querySelector('.marquee-placeholder span');
if (marquee) marquee.setAttribute('aria-hidden', 'true');