/* ========================================
   Yellow Umbrella Co. — Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Cursor glow ----
  const glow = document.createElement('div');
  glow.className = 'cursor-glow';
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  // ---- Navigation ----
  const nav = document.getElementById('nav');
  const navMenuBtn = document.getElementById('navMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  navMenuBtn.addEventListener('click', () => {
    navMenuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenuBtn.classList.remove('active');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ---- Scroll reveal ----
  const revealElements = document.querySelectorAll('[data-reveal], .manifesto-item, .principle-card, .timeline-stage');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Timeline progress ----
  const timeline = document.getElementById('timeline');
  const timelineProgress = document.getElementById('timelineProgress');

  if (timeline && timelineProgress) {
    const timelineObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const stages = timeline.querySelectorAll('.timeline-stage');
          const totalWidth = timeline.offsetWidth;
          const progressWidth = totalWidth * 0.85;

          if (window.innerWidth > 1024) {
            timelineProgress.style.width = progressWidth + 'px';
          } else {
            timelineProgress.style.height = (timeline.offsetHeight * 0.85) + 'px';
          }

          stages.forEach((stage, i) => {
            setTimeout(() => {
              stage.classList.add('visible');
            }, 200 + i * 200);
          });
        }
      });
    }, { threshold: 0.3 });

    timelineObserver.observe(timeline);
  }

  // ---- Smooth anchor scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---- Parallax on hero elements ----
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroLines = document.querySelectorAll('.hero-line');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;

    if (scrollY < heroHeight) {
      const progress = scrollY / heroHeight;

      heroDots.forEach((dot, i) => {
        const speed = 0.3 + i * 0.1;
        dot.style.transform = `translateY(${scrollY * speed}px)`;
      });

      heroLines.forEach((line, i) => {
        const speed = 0.2 + i * 0.05;
        line.style.transform = `translateY(${scrollY * speed}px) rotate(${parseFloat(getComputedStyle(line).getPropertyValue('--rotation') || (i === 0 ? -15 : 25))}deg)`;
      });

      // Fade hero content on scroll
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) {
        heroContent.style.opacity = 1 - progress * 1.5;
        heroContent.style.transform = `translateY(${progress * 40}px)`;
      }
    }
  });

  // ---- Principle card subtle tilt on mouse ----
  document.querySelectorAll('.principle-card').forEach(card => {
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      this.style.transform = `translateY(-4px) perspective(1000px) rotateX(${y * -3}deg) rotateY(${x * 3}deg)`;
    });

    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });

  // ---- Scroll indicator fade ----
  const scrollIndicator = document.getElementById('scrollIndicator');
  if (scrollIndicator) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        scrollIndicator.style.opacity = '0';
      } else {
        scrollIndicator.style.opacity = '1';
      }
    });
  }

  // ---- Page load animation sequence ----
  setTimeout(() => {
    document.body.style.opacity = '1';
  }, 100);

});
