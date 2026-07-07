document.addEventListener('DOMContentLoaded', () => {
  initI18n();
  initPreloader();
  initTypingEffect();
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initCounterAnimation();
  initSkillBars();
  initCursorGlow();
  initBackToTop();
  initActiveNavLink();
  initContactForm();
  initSmoothScroll();
});

/* ===== Preloader ===== */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 600);
    }, 800);
  });
}

/* ===== Typing Effect ===== */
function initTypingEffect() {
  const el = document.getElementById('typed-text');
  if (!el) return;

  const phrases = [
    'Desenvolvedor de Sistemas C#',
    'Especialista em ASP.NET Core',
    'Desenvolvedor de APIs REST',
    'Full Stack Developer',
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
  }

  setTimeout(type, 1000);
}

/* ===== Navbar Scroll Effect ===== */
function initNavbar() {
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

/* ===== Mobile Menu ===== */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  const icon = document.getElementById('menu-icon');
  const links = menu.querySelectorAll('a');

  toggle.addEventListener('click', () => {
    const isOpen = !menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    icon.classList.toggle('fa-bars', isOpen);
    icon.classList.toggle('fa-times', !isOpen);
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    });
  });
}

/* ===== Scroll Reveal ===== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ===== Counter Animation ===== */
function initCounterAnimation() {
  const counters = document.querySelectorAll('.stat-number');
  let animated = false;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            animateCounter(counter, target);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const statsSection = document.querySelector('.stat-card');
  if (statsSection) observer.observe(statsSection.parentElement);
}

function animateCounter(el, target) {
  const duration = 2000;
  const start = performance.now();

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target;
    }
  }

  requestAnimationFrame(update);
}

/* ===== Skill Bars Animation ===== */
function initSkillBars() {
  const skillCards = document.querySelectorAll('.skill-card');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bars = entry.target.querySelectorAll('.skill-bar');
          bars.forEach((bar, i) => {
            setTimeout(() => {
              const level = bar.dataset.level;
              bar.style.setProperty('--level', `${level}%`);
              bar.classList.add('animated');
              bar.querySelector('.fill').style.width = `${level}%`;
            }, i * 150);
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  skillCards.forEach(card => observer.observe(card));
}

/* ===== Cursor Glow ===== */
function initCursorGlow() {
  const glow = document.getElementById('cursor-glow');
  if (!glow || window.matchMedia('(max-width: 1024px)').matches) return;

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = `${glowX}px`;
    glow.style.top = `${glowY}px`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

/* ===== Back to Top ===== */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 500);
  });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ===== Active Nav Link ===== */
function initActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
  });
}

/* ===== Contact Form ===== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const mailtoLink = `mailto:drsilva321dd@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
      `Nome: ${name}\nE-mail: ${email}\n\n${message}`
    )}`;

    window.location.href = mailtoLink;

    feedback.textContent = 'Abrindo seu cliente de e-mail...';
    feedback.className = 'text-center mt-4 text-sm text-accent-green';
    feedback.classList.remove('hidden');

    setTimeout(() => {
      form.reset();
      feedback.textContent = 'Mensagem preparada! Verifique seu cliente de e-mail.';
    }, 2000);
  });
}

/* ===== Smooth Scroll ===== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}

/* ===== Timeline dot animation on scroll ===== */
const timelineDots = document.querySelectorAll('.timeline-dot');
const dotObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.background = '#6366f1';
        entry.target.style.boxShadow = '0 0 20px rgba(99, 102, 241, 0.5)';
      }
    });
  },
  { threshold: 0.5 }
);

timelineDots.forEach(dot => dotObserver.observe(dot));

/* ===== Parallax on hero blobs ===== */
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const blobs = document.querySelectorAll('#home .blur-\\[120px\\]');
  blobs.forEach((blob, i) => {
    const speed = i === 0 ? 0.3 : 0.2;
    blob.style.transform = `translateY(${scrolled * speed}px)`;
  });
});
