document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loadingScreen');
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const menuBtn = document.getElementById('menuBtn');
  const navLinks = document.getElementById('navLinks');
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const cursorGlow = document.querySelector('.cursor-glow');
  const typedText = document.getElementById('typedText');

  const words = ['Frontend Developer', 'UI/UX Designer', 'Motion & Interaction Artist'];
  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function typeLoop() {
    const current = words[wordIndex];
    typedText.textContent = current.slice(0, charIndex);
    if (!deleting && charIndex < current.length) {
      charIndex++;
    } else if (deleting && charIndex > 0) {
      charIndex--;
    } else {
      deleting = !deleting;
      if (!deleting) wordIndex = (wordIndex + 1) % words.length;
    }
    const speed = deleting ? 40 : 90;
    setTimeout(typeLoop, speed);
  }

  function animateLoading() {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      progressBar.style.width = count + '%';
      progressText.textContent = count + '%';
      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          loadingScreen.classList.add('hidden');
          gsap.from('.hero-copy', { y: 20, opacity: 0, duration: 0.8 });
          gsap.from('.hero-visual', { y: 18, opacity: 0, duration: 0.9, delay: 0.1 });
        }, 450);
      }
    }, 22);
  }

  function setActiveLink() {
    const sections = document.querySelectorAll('main section[id]');
    const links = document.querySelectorAll('.nav-links a');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id));
        }
      });
    }, { threshold: 0.5 });
    sections.forEach(section => observer.observe(section));
  }

  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(menuBtn.classList.contains('open')));
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuBtn.classList.remove('open');
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('.project-card').forEach(card => {
        card.classList.toggle('is-hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.textContent = 'Thanks! Your message has been queued successfully.';
    formStatus.classList.add('show');
    contactForm.reset();
    setTimeout(() => formStatus.classList.remove('show'), 2600);
  });

  window.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  AOS.init({ duration: 900, once: false, offset: 80, easing: 'ease-out-cubic' });
  gsap.registerPlugin();
  setActiveLink();
  typeLoop();
  animateLoading();
});
