(function () {
  'use strict';

  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const reveals = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieReject = document.getElementById('cookieReject');

  /* Header scroll effect */
  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Mobile menu */
  menuToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('active', isOpen);
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Cerrar menú' : 'Abrir menú');
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');

  function setActiveLink() {
    const scrollPos = window.scrollY + 120;

    sections.forEach(function (section) {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });

  /* Reveal on scroll */
  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Contact form */
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!contactForm.checkValidity()) {
        contactForm.reportValidity();
        return;
      }

      formSuccess.hidden = false;
      contactForm.reset();

      setTimeout(function () {
        formSuccess.hidden = true;
      }, 6000);
    });
  }

  /* Cookie banner */
  if (!localStorage.getItem('ortodens_cookies')) {
    cookieBanner.classList.remove('hidden');
  } else {
    cookieBanner.classList.add('hidden');
  }

  function dismissCookies(choice) {
    localStorage.setItem('ortodens_cookies', choice);
    cookieBanner.classList.add('hidden');
  }

  cookieAccept.addEventListener('click', function () {
    dismissCookies('all');
  });

  cookieReject.addEventListener('click', function () {
    dismissCookies('necessary');
  });
})();
