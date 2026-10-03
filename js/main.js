/* MAIN APPLICATION INITIALIZATION */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Sticky Header Navigation & Scroll Spy with rAF throttle
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  let ticking = false;

  function onScroll() {
    const scrollY = window.pageYOffset || window.scrollY || 0;

    // Sticky Header
    if (header) {
      if (scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Scroll Spy
    let current = '';
    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 140;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        current = sectionId;
      }
    });

    if (current) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(onScroll);
      ticking = true;
    }
  }, { passive: true });

  // 2. Mobile Nav Toggle & Accessibility
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  function closeMobileNav() {
    if (navMenu && mobileToggle) {
      navMenu.classList.remove('mobile-open');
      mobileToggle.classList.remove('active');
      mobileToggle.setAttribute('aria-expanded', 'false');
    }
  }

  if (mobileToggle && navMenu) {
    mobileToggle.setAttribute('aria-expanded', 'false');

    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('mobile-open');
      mobileToggle.classList.toggle('active', isOpen);
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close menu when clicking nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', closeMobileNav);
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && !header.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Close menu on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('mobile-open')) {
        closeMobileNav();
      }
    });
  }

  // 3. Toast Notification Helper
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }


  // 5. Copy Email Action (if present)
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      const email = copyEmailBtn.getAttribute('data-email') || 'souravsoni7001@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Email address copied to clipboard!');
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  }

  // 6. Contact Form Submission (if present)
  const typePills = document.querySelectorAll('.type-pill');
  let selectedType = 'Full Video Edit';

  typePills.forEach(pill => {
    pill.addEventListener('click', () => {
      typePills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      selectedType = pill.getAttribute('data-type') || 'Full Video Edit';
    });
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userName = document.getElementById('userName')?.value || 'Client';

      showToast(`Thank you, ${userName}! Your ${selectedType} inquiry has been sent.`);
      contactForm.reset();

      typePills.forEach(p => p.classList.remove('active'));
      if (typePills[0]) typePills[0].classList.add('active');
    });
  }

});
