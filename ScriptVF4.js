document.addEventListener('DOMContentLoaded', () => {
  const isDesktop = window.innerWidth > 768;

  // === SOLO EN ESCRITORIO ===
  if (isDesktop) {
    // Activación de botones del menú según scroll
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
      if (currentActive) {
        currentActive.classList.add('active');
      }
    }

    window.addEventListener('scroll', onScroll);
    window.addEventListener('load', onScroll);

    // Mover botones flotantes al mostrar footer
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

    // Menú hamburguesa
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
  }

  // === FUNCIONALIDADES QUE SE USAN EN TODAS LAS RESOLUCIONES ===

  // Mostrar/ocultar formulario de contacto
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

  // Resaltar día actual en horario de atención
  const diaSemana = new Date().getDay();
  const elementos = document.querySelectorAll('.lista-horario li[data-dia]');

  elementos.forEach(el => {
    if (parseInt(el.getAttribute('data-dia')) === diaSemana) {
      el.classList.add('hoy');
    }
  });

  // Botones de servicio para mostrar secciones
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
      const targetId = el.dataset.target || (el.getAttribute('href')?.replace('#', ''));
      if (targetId) mostrarSeccion(targetId);
    });
  });
});
