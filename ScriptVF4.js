document.addEventListener('DOMContentLoaded', () => {
  // === ACTIVACIÓN DE BOTONES DEL MENÚ SEGÚN SCROLL ===
  const menuButtons = document.querySelectorAll('.nav-buttons a.btn-rounded');
  const sections = [];

  menuButtons.forEach(btn => {
    const href = btn.getAttribute('href');
    if (href && href.startsWith('#')) {
      const section = document.querySelector(href);
      if (section) {
        sections.push({ btn, section });
      }
    }
  });

  function onScroll() {
    const scrollPos = window.scrollY || window.pageYOffset;
    const offsetMargin = 110; // Ajusta según la altura de tu header

    let currentActive = null;

    for (let i = 0; i < sections.length; i++) {
      const { btn, section } = sections[i];
      const top = section.offsetTop - offsetMargin;
      const bottom = top + section.offsetHeight;

      if (scrollPos >= top && scrollPos < bottom) {
        currentActive = btn;
        break;
      }
    }

    menuButtons.forEach(btn => btn.classList.remove('active'));
    if (currentActive) {
      currentActive.classList.add('active');
    }
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);

  // === MOVER BOTONES FLOTANTES CUANDO SE MUESTRA EL FOOTER ===
  const floatingBtns = document.querySelectorAll('.floating-btn');
  const footer = document.querySelector('footer');

  if (footer && floatingBtns.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          floatingBtns.forEach(btn => btn.style.transform = 'translateY(-100px)');
        } else {
          floatingBtns.forEach(btn => btn.style.transform = 'translateY(0)');
        }
      });
    }, {
      root: null,
      threshold: 0.1
    });

    observer.observe(footer);
  }

  // === MOSTRAR / OCULTAR FORMULARIO DE CONTACTO ===
  const btnCorreo = document.getElementById('btn-correo');
  const form = document.getElementById('formulario-contacto');

  if (btnCorreo && form) {
    btnCorreo.addEventListener('click', e => {
      e.preventDefault();
      form.classList.toggle('oculto');

      // Actualiza aria-expanded para accesibilidad
      const expanded = btnCorreo.getAttribute('aria-expanded') === 'true';
      btnCorreo.setAttribute('aria-expanded', (!expanded).toString());
    });
  }

  // === RESALTAR DÍA ACTUAL EN EL HORARIO DE ATENCIÓN ===
  const diaSemana = new Date().getDay(); // 0 = Domingo, 1 = Lunes, ...
  const elementos = document.querySelectorAll('.lista-horario li[data-dia]');

  elementos.forEach(el => {
    if (parseInt(el.getAttribute('data-dia')) === diaSemana) {
      el.classList.add('hoy');
    }
  });

  // === BOTONES DE SERVICIO PARA MOSTRAR SECCIÓN Y SCROLL SUAVE ===
  const botonesServicio = document.querySelectorAll('.btn-servicio, .dropdown-content a');

  function mostrarSeccion(id) {
    const secciones = document.querySelectorAll('.detalle-servicio');
    secciones.forEach(sec => {
      if (sec.id === id) {
        sec.classList.remove('oculto');
      } else {
        sec.classList.add('oculto');
      }
    });

    const destino = document.getElementById(id);
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  }

  botonesServicio.forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();

      const targetId = el.dataset.target || (el.getAttribute('href') ? el.getAttribute('href').replace('#', '') : null);
      if (!targetId) return;

      mostrarSeccion(targetId);
    });
  });

  // === MENÚ HAMBURGUESA ===
  const menuBtn = document.querySelector('.menu-hamburguesa, .menu-toggle');
  const navMenu = document.querySelector('nav.nav-buttons, .menu-nav');

  if (menuBtn && navMenu) {
    menuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('show');
      navMenu.classList.toggle('active');
    });

    // Cerrar menú al clicar un enlace (útil en móvil)
    navMenu.querySelectorAll('a.btn-rounded, .menu-nav a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('show', 'active');
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const menuNav = document.querySelector('.menu-nav');

  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    // Alternar visibilidad
    menuNav.classList.toggle('visible');
    // Alternar aria-expanded
    menuToggle.setAttribute('aria-expanded', !isExpanded);
  });

  // Opcional: cerrar menú cuando se clickea un enlace del menú
  menuNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuNav.classList.remove('visible');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
});
