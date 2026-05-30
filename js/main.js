function scrollToAnchor(id) {
  const element = document.getElementById(id);

  if (!element) return;

  element.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });

  if (window.matchMedia('(max-width: 760px)').matches) {
    applySidebarState(true);
  }
}

/* =========================================
   SIDEBAR TOGGLE
========================================= */

function updateToggleState(collapsed) {
  const sidebarToggle = document.getElementById('sidebarToggle');

  if (!sidebarToggle) return;

  sidebarToggle.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
}

function applySidebarState(collapsed) {
  const layout = document.getElementById('layout');

  if (!layout) return;

  layout.classList.toggle('sidebar-collapsed', collapsed);
  updateToggleState(collapsed);

  localStorage.setItem(
    'mdpSidebarCollapsed',
    collapsed ? '1' : '0'
  );
}

function toggleSidebar() {
  const layout = document.getElementById('layout');

  if (!layout) return;

  const collapsed = layout.classList.contains('sidebar-collapsed');

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

const progressFill = document.getElementById('progressFill');
const sectionIndicator = document.getElementById('sectionIndicator');
const scrollTopBtn = document.getElementById('scrollTopBtn');

function onScroll() {
  const scrollTop = window.scrollY;

  const documentHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (progressFill && documentHeight > 0) {
    const progress = (scrollTop / documentHeight) * 100;
    progressFill.style.width = Math.min(progress, 100) + '%';
  }

  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle('visible', scrollTop > 400);
  }

  let activeSection = 0;

  sectionIds.forEach((id, index) => {
    const section = document.getElementById(id);

    if (!section) return;

    const rect = section.getBoundingClientRect();

    if (rect.top < 140) {
      activeSection = index;
    }
  });

  if (sectionIndicator) {
    sectionIndicator.textContent = sectionNames[activeSection];
  }

  document.querySelectorAll('.nav-item').forEach(item => {
    item.classList.remove('active');
  });

  const activeNav = document.getElementById('nav-' + sectionIds[activeSection]);

  if (activeNav) {
    activeNav.classList.add('active');
  }
}

/* =========================================
   SECTION FADE-IN
========================================= */

function initializeVisibilityObserver() {
  if (!('IntersectionObserver' in window)) {
    document.querySelectorAll('.doc-section').forEach(section => {
      section.classList.add('visible');
    });
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.03
    }
  );

  document.querySelectorAll('.doc-section').forEach(section => {
    observer.observe(section);
  });
}

/* =========================================
   DOSSIER DATA
========================================= */

const dossiers = [
  {
    title: "THE 12 TRIBES OF YASHARA'AL",
    file: "THE 12 TRIBES OF YASHARAAL.html",
    category: "TRIBES",
    description: "Interactive covenant and tribal dossier."
  },
  {
    title: "DABARAYAM (DEUTERONOMY) 28 CURSES PROOF",
    file: "DABARAYAM (Deuteronomy) 28 Curses Proof.html",
    category: "PROPHECY",
    description: "Judgment and fulfillment framework."
  },
  {
    title: "DABARAYAM (DEUTERONOMY) 28 CURSES PROOF 2006_2026",
    file: "DABARAYAM (Deuteronomy) 28 Curses Proof 2006_2026.html",
    category: "PROPHECY",
    description: "Judgment and fulfillment framework."
  },
  {
    title: "SLAVERY EFFECTS ON YASHARA'AL",
    file: "SLAVERY EFFECTS ON YASHARAAL.html",
    category: "PROPHECY",
    description: "Judgment and fulfillment framework."
  },
  {
    title: "YASHARA'AL 12 TRIBES COMPILATION",
    file: "YASHARAAL 12 TRIBES COMPILATION.html",
    category: "TRIBES",
    description: "Interactive covenant and tribal dossier."
  },
  {
    title: "STIFFNECKED PEOPLE AND OBEDIENCE UNTO YAHAWAH",
    file: "STIFFNECKED PEOPLE AND OBEDIENCE UNTO YAHAWAH.html",
    category: "JUDGMENT",
    description: "Judgment and fulfillment framework."
  }
];

/* =========================================
   LOAD DOSSIERS
========================================= */

function loadDossiers() {
  const grid = document.getElementById('dossierGrid');

  if (!grid) return;

  grid.innerHTML = '';

  dossiers.forEach(dossier => {
    const card = document.createElement('a');

    card.className = 'dossier-card';
    card.href = `dossiers/${encodeURI(dossier.file)}`;
    card.setAttribute('aria-label', `Open dossier: ${dossier.title}`);

    const kicker = document.createElement('span');
    kicker.className = 'card-kicker';
    kicker.textContent = dossier.category;

    const title = document.createElement('h2');
    title.textContent = dossier.title;

    const description = document.createElement('p');
    description.textContent = dossier.description;

    const link = document.createElement('span');
    link.className = 'card-link';
    link.textContent = 'Open Dossier →';

    card.append(kicker, title, description, link);
    grid.appendChild(card);
  });
}

/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener('DOMContentLoaded', () => {
  const storedState = localStorage.getItem('mdpSidebarCollapsed');
  const mobileDefault = window.matchMedia('(max-width: 760px)').matches;

  applySidebarState(storedState === null ? mobileDefault : storedState === '1');

  const sidebarToggle = document.getElementById('sidebarToggle');

  if (sidebarToggle) {
    sidebarToggle.addEventListener('click', toggleSidebar);
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const id = link.getAttribute('href').slice(1);

      if (!id) return;

      event.preventDefault();
      scrollToAnchor(id);
      history.replaceState(null, '', '#' + id);
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });

  initializeVisibilityObserver();
  loadDossiers();
  onScroll();

  if (location.hash) {
    const id = location.hash.replace('#', '');
    setTimeout(() => scrollToAnchor(id), 60);
  }
});

/* =========================================
   SCROLL TOP BUTTON
========================================= */

if (scrollTopBtn) {
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
