document.addEventListener('DOMContentLoaded', () => {
  const isDesktop = window.innerWidth > 768;

  // === ACTIVACIÓN DE BOTONES DEL MENÚ EN ESCRITORIO ===
  if (isDesktop) {
    const menuButtons = document.querySelectorAll('.nav-buttons a.btn-rounded');
    const sections = [];

    menuButtons.forEach(btn => {
      const href = btn.getAttribute('href');
      if (href && href.startsWith('#')) {
        const section = document.querySelector(href);
        if (section) sections.push({ btn, section });
      }
    });

    function onScroll() {
      const scrollPos = window.scrollY || window.pageYOffset;
      const offsetMargin = 110;
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
      if (currentActive) currentActive.classList.add('active');
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('load', onScroll);

    // Flotantes sobre footer
    const floatingBtns = document.querySelectorAll('.floating-btn');
    const footer = document.querySelector('footer');
    if (footer && floatingBtns.length > 0) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          floatingBtns.forEach(btn => {
            btn.style.transform = entry.isIntersecting ? 'translateY(-100px)' : 'translateY(0)';
          });
        });
      }, { threshold: 0.1 });
      observer.observe(footer);
    }
  }

  // === MENÚ HAMBURGUESA ===
  const menuBtn = document.querySelector('.menu-toggle');
  const menuNav = document.querySelector('.menu-nav');

  if (menuBtn && menuNav) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuNav.classList.toggle('visible');
      menuBtn.setAttribute('aria-expanded', (!isExpanded).toString());
    });

    menuNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuNav.classList.remove('visible');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // === FORMULARIO DE CONTACTO ===
  const btnCorreo = document.getElementById('btn-correo');
  const form = document.getElementById('formulario-contacto');
  if (btnCorreo && form) {
    btnCorreo.addEventListener('click', e => {
      e.preventDefault();
      form.classList.toggle('oculto');
      const expanded = btnCorreo.getAttribute('aria-expanded') === 'true';
      btnCorreo.setAttribute('aria-expanded', (!expanded).toString());
    });
  }

  // === HORARIO DEL DÍA ACTUAL ===
  const diaSemana = new Date().getDay();
  const elementos = document.querySelectorAll('.lista-horario li[data-dia]');
  elementos.forEach(el => {
    if (parseInt(el.getAttribute('data-dia')) === diaSemana) {
      el.classList.add('hoy');
    }
  });

  // === CARRUSEL DE SERVICIOS ===
  const botonesServicio = document.querySelectorAll('.btn-servicio');
  const carrusel = document.querySelector('.carrusel-servicios');
  const secciones = Array.from(document.querySelectorAll('.detalle-servicio'));
  const paginacion = document.querySelector('.paginacion-servicios');
  const flechaIzquierda = document.querySelector('.flecha.izquierda');
  const flechaDerecha = document.querySelector('.flecha.derecha');

  let indiceActual = 0;
  let puntos = [];

  function cambiarSeccion() {
    secciones.forEach((sec, i) => {
      sec.classList.toggle('activa', i === indiceActual);
      sec.classList.toggle('oculto', i !== indiceActual);
    });
    puntos.forEach((p, i) => {
      p.classList.toggle('activo', i === indiceActual);
    });
  }

  // Crear puntos dinámicos
  if (paginacion && secciones.length > 0) {
    secciones.forEach((_, i) => {
      const punto = document.createElement('span');
      punto.classList.add('punto');
      if (i === 0) punto.classList.add('activo');
      punto.dataset.index = i;
      paginacion.appendChild(punto);
    });
    puntos = document.querySelectorAll('.punto');

    puntos.forEach((p, i) => {
      p.addEventListener('click', () => {
        indiceActual = i;
        cambiarSeccion();
      });
    });
  }

  // Botones "Ver más"
  botonesServicio.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const targetId = btn.dataset.target;
      const idx = secciones.findIndex(sec => sec.id === targetId);
      if (idx !== -1) {
        indiceActual = idx;
        cambiarSeccion();
        carrusel.classList.remove('oculto');

        if (window.innerWidth <= 768) {
          if (menuNav) menuNav.classList.remove('visible');
          if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // Flechas
  if (flechaIzquierda && flechaDerecha) {
    flechaIzquierda.addEventListener('click', () => {
      indiceActual = (indiceActual - 1 + secciones.length) % secciones.length;
      cambiarSeccion();
    });

    flechaDerecha.addEventListener('click', () => {
      indiceActual = (indiceActual + 1) % secciones.length;
      cambiarSeccion();
    });
  }

  // Mostrar primera sección por defecto
  cambiarSeccion();

  // CLIC EN SUBMENÚ DE SERVICIOS (HEADER)
  const submenuLinks = document.querySelectorAll('.dropdown-content a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      const idx = secciones.findIndex(sec => sec.id === targetId);

      if (idx !== -1) {
        carrusel.classList.remove('oculto');
        indiceActual = idx;
        cambiarSeccion();

        // Scroll al carrusel (no solo a la sección)
        setTimeout(() => {
          carrusel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  });

  // === SUBMENÚ EN MÓVIL ===
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdown = document.querySelector('.dropdown');
  if (dropdownToggle && dropdown) {
    dropdownToggle.addEventListener('click', e => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const isOpen = dropdown.classList.contains('abierto');
        dropdown.classList.toggle('abierto', !isOpen);
        dropdownToggle.setAttribute('aria-expanded', (!isOpen).toString());
      }
    });
  }

  // === CERRAR CARRUSEL SI HACES CLIC FUERA DE SU CONTENIDO ===
  const carruselContenido = document.querySelector('.carrusel-contenido');
  if (carrusel && carruselContenido) {

    // Evitar cierre si haces clic dentro del contenido
    carruselContenido.addEventListener('click', e => {
      e.stopPropagation();
    });

    // Cerrar si haces clic fuera del contenido
    document.addEventListener('click', e => {
      if (!carrusel.classList.contains('oculto')) {
        carrusel.classList.add('oculto');
      }
    });

    // Evita que la apertura del carrusel dispare el cierre
    const botonesAbrir = document.querySelectorAll('.btn-servicio, .dropdown-content a');
    botonesAbrir.forEach(btn => {
      btn.addEventListener('click', e => {
        e.stopPropagation(); // <- esto evita el cierre inmediato
      });
    });
  }

  // === ANIMACIÓN DE HEXÁGONOS ===
  const hexagons = Array.from(document.querySelectorAll('.hexagon'));

  function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
  }

  function updateHexagons() {
    hexagons.forEach((hex, index) => {
      const size = randomBetween(150, 250);
      const height = size * 0.875;

      hex.style.width = `${size}px`;
      hex.style.height = `${height}px`;

      const opacity = 0.25 + ((size - 150) / 100) * 0.25;
      hex.style.opacity = opacity;

      const maxTop = window.innerHeight - height - 20;
      const maxLeft = window.innerWidth - size - 20;

      hex.style.top = '';
      hex.style.bottom = '';
      hex.style.left = '';
      hex.style.right = '';

      const positionType = index % 4;
      switch (positionType) {
        case 0:
          hex.style.top = `${randomBetween(5, maxTop * 0.5)}px`;
          hex.style.left = `${randomBetween(5, maxLeft * 0.5)}px`;
          break;
        case 1:
          hex.style.top = `${randomBetween(5, maxTop * 0.5)}px`;
          hex.style.right = `${randomBetween(5, maxLeft * 0.5)}px`;
          break;
        case 2:
          hex.style.bottom = `${randomBetween(5, maxTop * 0.5)}px`;
          hex.style.left = `${randomBetween(5, maxLeft * 0.5)}px`;
          break;
        case 3:
          hex.style.bottom = `${randomBetween(5, maxTop * 0.5)}px`;
          hex.style.right = `${randomBetween(5, maxLeft * 0.5)}px`;
          break;
      }

      hex.style.animationDelay = `${index * 1.5}s`;
    });
  }

  window.addEventListener('load', () => {
    updateHexagons();
    setInterval(updateHexagons, 10000);
  });

  // === CARRUSEL DECORATIVO DE ABAJO DEL HEADER ===
  const slides = document.querySelectorAll('.carrusel-decorativo .slide');
  if (slides.length > 0) {
    let slideActual = 0;

    // Inicializar con la primera visible
    slides.forEach((slide, i) => {
      slide.classList.toggle('activa', i === slideActual);
    });

    function cambiarSlideDecorativo() {
      slides[slideActual].classList.remove('activa');
      slideActual = (slideActual + 1) % slides.length;
      slides[slideActual].classList.add('activa');
    }

    setInterval(cambiarSlideDecorativo, 4000);
  }
});
