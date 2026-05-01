document.addEventListener('DOMContentLoaded', () => {
  /* ─── 0. Theme Toggle ─── */
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    let currentTheme = localStorage.getItem('theme');
    if (!currentTheme) {
      currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    const applyTheme = (theme) => {
      document.body.setAttribute('data-theme', theme);
      themeToggle.textContent = `[ Theme: ${theme.charAt(0).toUpperCase() + theme.slice(1)} ]`;
      localStorage.setItem('theme', theme);
    };
    applyTheme(currentTheme);
    themeToggle.addEventListener('click', () => {
      currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(currentTheme);
    });
  }

  /* ─── 1. Scroll-Triggered Card Animations ─── */
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger logic
        setTimeout(() => {
          entry.target.classList.add('is-visible');
        }, index * 80); // 80ms stagger delay
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => observer.observe(el));

  /* ─── 2. Navigation State & Smooth Scroll ─── */
  const nav = document.querySelector('.nav');
  const navLinks = document.querySelectorAll('.nav__links a');
  const sections = document.querySelectorAll('section, header');

  window.addEventListener('scroll', () => {
    // Nav border toggle
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    // Active nav link
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= (sectionTop - 200)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').includes(current)) {
        link.classList.add('active');
      }
    });
  });

  /* ─── 3. Process Section Horizontal Scroll (Desktop) ─── */
  const processTrack = document.querySelector('.process-track');
  if (processTrack) {
    processTrack.addEventListener('wheel', (evt) => {
      if (window.innerWidth >= 960) {
        if (Math.abs(evt.deltaX) > Math.abs(evt.deltaY)) return; // Allow native trackpad horizontal scroll
        
        const isScrollingDown = evt.deltaY > 0;
        const canScrollRight = processTrack.scrollLeft < (processTrack.scrollWidth - processTrack.clientWidth - 1);
        const canScrollLeft = processTrack.scrollLeft > 0;

        if ((isScrollingDown && canScrollRight) || (!isScrollingDown && canScrollLeft)) {
          evt.preventDefault();
          processTrack.scrollLeft += evt.deltaY;
        }
      }
    }, { passive: false });
  }

  /* ─── 4. Back to Top Button ─── */
  const backToTopBtn = document.getElementById('backToTop');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* ─── 5. Custom Cursor ─── */
  const cursor = document.getElementById('cursor');
  
  // Only init if pointer is fine (not a touch device)
  if (window.matchMedia('(pointer: fine)').matches && cursor) {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Fast follow
    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Lag smoothing loop
    const renderCursor = () => {
      // Linear interpolation for smooth lag
      cursorX += (mouseX - cursorX) * 0.2;
      cursorY += (mouseY - cursorY) * 0.2;
      
      cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) translate(-50%, -50%)`;
      requestAnimationFrame(renderCursor);
    };
    requestAnimationFrame(renderCursor);

    // Hover state on interactable elements
    const interactables = document.querySelectorAll('a, button, .bento-card');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  }
});
