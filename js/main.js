function scrollToAnchor(id) {

  const element =
    document.getElementById(id);

  if (element) {

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

/* =========================================
   SIDEBAR TOGGLE
========================================= */

function applySidebarState(collapsed) {

  const layout =
    document.getElementById('layout');

  if (!layout) return;

  layout.classList.toggle(
    'sidebar-collapsed',
    collapsed
  );

  localStorage.setItem(
    'mdpSidebarCollapsed',
    collapsed ? '1' : '0'
  );
}

function toggleSidebar() {

  const layout =
    document.getElementById('layout');

  if (!layout) return;

  const collapsed =
    layout.classList.contains(
      'sidebar-collapsed'
    );

  applySidebarState(!collapsed);
}

/* =========================================
   SCROLL TRACKING
========================================= */

const sectionIds = [
  'home',
  'featured',
  'categories',
  'workflow',
  'deployment'
];

const sectionNames = [
  'HOME',
  'FEATURED',
  'CATEGORIES',
  'WORKFLOW',
  'DEPLOYMENT'
];

const progressFill =
  document.getElementById(
    'progressFill'
  );

const sectionIndicator =
  document.getElementById(
    'sectionIndicator'
  );

const scrollTopBtn =
  document.getElementById(
    'scrollTopBtn'
  );

function onScroll() {

  const scrollTop =
    window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight -
    window.innerHeight;

  /* PROGRESS BAR */

  if (
    progressFill &&
    documentHeight > 0
  ) {

    const progress =
      (scrollTop / documentHeight) * 100;

    progressFill.style.width =
      Math.min(progress, 100) + '%';
  }

  /* SCROLL TOP BUTTON */

  if (scrollTopBtn) {

    scrollTopBtn.classList.toggle(
      'visible',
      scrollTop > 400
    );
  }

  /* ACTIVE SECTION */

  let activeSection = 0;

  sectionIds.forEach((id, index) => {

    const section =
      document.getElementById(id);

    if (!section) return;

    const rect =
      section.getBoundingClientRect();

    if (rect.top < 140) {
      activeSection = index;
    }
  });

  /* UPDATE LABEL */

  if (sectionIndicator) {

    sectionIndicator.textContent =
      sectionNames[activeSection];
  }

  /* UPDATE SIDEBAR ACTIVE */

  document
    .querySelectorAll('.nav-item')
    .forEach(item => {
      item.classList.remove('active');
    });

  const activeNav =
    document.getElementById(
      'nav-' + sectionIds[activeSection]
    );

  if (activeNav) {
    activeNav.classList.add('active');
  }
}

/* =========================================
   SECTION FADE-IN
========================================= */

function initializeVisibilityObserver() {

  const observer =
    new IntersectionObserver(

      entries => {

        entries.forEach(entry => {

          if (entry.isIntersecting) {
            entry.target.classList.add(
              'visible'
            );
          }
        });

      },

      {
        threshold: 0.03
      }
    );

  document
    .querySelectorAll('.doc-section')
    .forEach(section => {
      observer.observe(section);
    });
}

/* =========================================
   DOSSIER DATA
========================================= */

const dossiers = [

  {
    title:
      "The 12 Tribes of YASHARA'AL",

    file:
      "THE 12 TRIBES OF YASHARAAL.html",

    category:
      "TRIBES",

    description:
      "Interactive covenant and tribal dossier."
  },

  {
    title:
      "DABARAYAM (Deuteronomy) 28 Curses Proof",

    file:
      "DABARAYAM (Deuteronomy) 28 Curses Proof.html",

    category:
      "PROPHECY",

    description:
      "Judgment and fulfillment framework."
  },

  {
    title:
      "DABARAYAM (Deuteronomy) 28 Curses Proof 2006_2026",

    file:
      "DABARAYAM (Deuteronomy) 28 Curses Proof 2006_2026.html",

    category:
      "PROPHECY",

    description:
      "Judgment and fulfillment framework."
  },

  {
    title:
      "SLAVERY EFFECTS ON YASHARAAL",

    file:
      "SLAVERY EFFECTS ON YASHARAAL.html",

    category:
      "PROPHECY",

    description:
      "Judgment and fulfillment framework."
  },

  {
    title:
      "YASHARAAL 12 TRIBES COMPILATION",

    file:
      "YASHARAAL 12 TRIBES COMPILATION.html",

    category:
      "TRIBES",

    description:
      "Interactive covenant and tribal dossier."
  },

  {
    title:
      "STIFFNECKED PEOPLE AND OBEDIENCE UNTO YAHAWAH",

    file:
      "STIFFNECKED PEOPLE AND OBEDIENCE UNTO YAHAWAH.html",

    category:
      "JUDGEMENT",

    description:
      "Judgment and fulfillment framework.",
  },
];

/* =========================================
   LOAD DOSSIERS
========================================= */

function loadDossiers() {

  const grid =
    document.getElementById(
      'dossierGrid'
    );

  if (!grid) return;

  grid.innerHTML = '';

  dossiers.forEach(dossier => {

    const card =
      document.createElement('a');

    card.className =
      'dossier-card';

    card.href =
      `dossiers/${dossier.file}`;

    card.innerHTML = `
      <span class="card-kicker">
        ${dossier.category}
      </span>

      <h2>
        ${dossier.title}
      </h2>

      <p>
        ${dossier.description}
      </p>

      <span class="card-link">
        Open Dossier →
      </span>
    `;

    grid.appendChild(card);
  });
}

/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
  'DOMContentLoaded',
  () => {

    /* SIDEBAR STATE */

    const storedState =
      localStorage.getItem(
        'mdpSidebarCollapsed'
      );

    applySidebarState(
      storedState === '1'
    );

    /* SIDEBAR BUTTON */

    const sidebarToggle =
      document.getElementById(
        'sidebarToggle'
      );

    if (sidebarToggle) {

      sidebarToggle.addEventListener(
        'click',
        toggleSidebar
      );
    }

    /* SCROLL EVENTS */

    window.addEventListener(
      'scroll',
      onScroll,
      { passive: true }
    );

    /* VISIBILITY */

    initializeVisibilityObserver();

    /* INITIAL SCROLL */

    onScroll();

    /* LOAD DOSSIERS */

    loadDossiers();
  }
);

/* =========================================
   SCROLL TOP BUTTON
========================================= */

if (scrollTopBtn) {

  scrollTopBtn.addEventListener(
    'click',
    () => {

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  );
}