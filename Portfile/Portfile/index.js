 const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        navbar.style.backdropFilter = 'blur(16px)';
        navbar.style.background = 'rgba(0,0,0,0.8)';
        navbar.style.borderBottom = '1px solid rgba(255,255,255,0.05)';
      } else {
        navbar.style.backdropFilter = 'blur(0px)';
        navbar.style.background = 'transparent';
        navbar.style.borderBottom = 'none';
      }
      lastScroll = currentScroll;
    });

    // ===== Mobile Menu =====
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');
    let menuOpen = false;
    mobileToggle.addEventListener('click', () => {
      menuOpen = !menuOpen;
      mobileMenu.classList.toggle('hidden');
      menuIcon.setAttribute('icon', menuOpen ? 'lucide:x' : 'lucide:menu');
    });
    // Close on link click
    document.querySelectorAll('.mobile-nav').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuOpen = false;
        menuIcon.setAttribute('icon', 'lucide:menu');
      });
    });

    // ===== Scroll Reveal =====
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    revealElements.forEach(el => revealObserver.observe(el));

    // ===== Skill Bars Animation =====
    const skillBars = document.querySelectorAll('.skill-bar');
    const skillObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const width = bar.getAttribute('data-width');
          bar.style.width = '0%';
          bar.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
          setTimeout(() => {
            bar.style.width = width;
          }, 200);
          skillObserver.unobserve(bar);
        }
      });
    }, { threshold: 0.5 });
    skillBars.forEach(bar => {
      bar.style.width = '0%';
      skillObserver.observe(bar);
    });

    // ===== Contact Form =====
    const contactForm = document.getElementById('contactForm');
    const formToast = document.getElementById('formToast');
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Show toast
      formToast.classList.remove('hidden');
      formToast.classList.add('inline-flex');
      // Reset form
      contactForm.reset();
      // Hide toast after 5s
      setTimeout(() => {
        formToast.classList.add('hidden');
        formToast.classList.remove('inline-flex');
      }, 5000);
    });

    // ===== Active Nav Link Highlight =====
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });

    // ===== Smooth scroll for anchor links =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });