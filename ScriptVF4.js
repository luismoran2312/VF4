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
    const offsetMargin = 110; // Ajusta si tu header tiene altura diferente

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

  // === MOSTRAR / OCULTAR FORMULARIO DE CONTACTO ===
  const btnCorreo = document.getElementById('btn-correo');
  const form = document.getElementById('formulario-contacto');

  if (btnCorreo && form) {
    btnCorreo.addEventListener('click', function (e) {
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
});

document.querySelectorAll('.btn-servicio').forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.getAttribute('data-target');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

document.querySelectorAll('.btn-servicio, .dropdown-content a').forEach(el => {
  el.addEventListener('click', e => {
    e.preventDefault();

    const targetId = el.dataset.target || el.getAttribute('href').replace('#', '');
    const target = document.getElementById(targetId);

    if (!target) return;

    // Oculta todas las secciones de detalle
    document.querySelectorAll('.detalle-servicio').forEach(sec => {
      sec.classList.add('oculto');
    });

    // Muestra la sección objetivo
    target.classList.remove('oculto');

    // Scroll suave a la sección
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const botonesServicio = document.querySelectorAll('[data-target]');
  const secciones = document.querySelectorAll('.detalle-servicio');

  function mostrarSeccion(id) {
    secciones.forEach(sec => {
      if (sec.id === id) {
        sec.classList.remove('oculto');
      } else {
        sec.classList.add('oculto');
      }
    });

    // Desplazarse a la sección visible (opcional)
    const destino = document.getElementById(id);
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  }

  botonesServicio.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-target');
      if (id) {
        mostrarSeccion(id);
      }
    });
  });
});




document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-hamburguesa');
  const navMenu = document.querySelector('nav.nav-buttons');

  menuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('show');
  });

  // Opcional: cerrar menú al hacer clic en algún enlace (útil en móvil)
  navMenu.querySelectorAll('a.btn-rounded').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('show');
    });
  });
});

document.getElementById('menu-toggle').addEventListener('click', () => {
  const nav = document.querySelector('.nav-buttons');
  nav.classList.toggle('show');
});
