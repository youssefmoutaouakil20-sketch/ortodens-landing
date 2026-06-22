(function () {
  const header = document.getElementById('header');
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav__link');
  const reveals = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  });

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach((el) => observer.observe(el));

  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY + 120;
    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  });

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const telefono = document.getElementById('telefono').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;
    const subject = encodeURIComponent(`Consulta web - ${nombre}`);
    const body = encodeURIComponent(
      `Nombre: ${nombre}\nTeléfono: ${telefono}\nEmail: ${email}\n\nMensaje:\n${mensaje}`
    );
    window.location.href = `mailto:ortodenspoliclinicadental@gmail.com?subject=${subject}&body=${body}`;
  });
})();
