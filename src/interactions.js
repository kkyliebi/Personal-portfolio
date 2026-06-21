const PROJECTS = [
  { id: 'trex-communication-system', label: '01', title: 'T-Rex Communication System', route: '/work/project-01-t-rex-communication-system/' },
  { id: 'oracle-glyph-system', label: '02', title: 'Oracle Glyph System', route: '/work/project-02-oracle-glyph-system/' },
  { id: 'ar-interactive-typography', label: '03', title: 'AR / Interactive Typography', route: '/work/project-03-ar-interactive-typography/' },
  { id: 'speculative-branding-system', label: '04', title: 'Speculative Branding System', route: '/work/project-04-speculative-branding-system/' },
  { id: 'editorial-visual-communication-project', label: '05', title: 'Editorial / Visual Communication Project', route: '/work/project-05-editorial-visual-communication-project/' },
];

const pathname = normalizePath(window.location.pathname);
const currentProject = PROJECTS.find((project) => project.route === pathname);

function normalizePath(path) {
  if (path.endsWith('/')) return path;
  if (path.endsWith('/index.html')) return path.replace('index.html', '');
  return `${path}/`;
}

function setSharedNavigationState() {
  const section = pathname.startsWith('/work/') ? 'work' : pathname.split('/').filter(Boolean)[0] || 'home';
  document.documentElement.dataset.activeSection = section;
  document.documentElement.dataset.project = currentProject?.id || '';
  localStorage.setItem('portfolio:last-section', section);

  if (currentProject) {
    localStorage.setItem('portfolio:last-project', currentProject.id);
  }

  document.querySelectorAll('[data-nav-section]').forEach((link) => {
    const isCurrent = link.dataset.navSection === section;
    link.toggleAttribute('aria-current', isCurrent);
    link.classList.toggle('is-active', isCurrent);
  });

  document.querySelectorAll('[data-project-id]').forEach((link) => {
    const isCurrentProject = link.dataset.projectId === currentProject?.id;
    link.toggleAttribute('aria-current', isCurrentProject);
    link.classList.toggle('is-active', isCurrentProject);
  });
}

function setupProjectTransitions() {
  document.querySelectorAll('a[href^="/work/project-"]').forEach((link) => {
    link.dataset.transition = 'project';

    link.addEventListener('pointerenter', () => {
      link.classList.add('is-previewed');
    });

    link.addEventListener('pointerleave', () => {
      link.classList.remove('is-previewed');
    });

    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (link.target && link.target !== '_self') return;

      sessionStorage.setItem('portfolio:transition-from', currentProject?.id || 'index');
      sessionStorage.setItem('portfolio:transition-to', link.dataset.projectId || link.textContent.trim());

      if (!document.startViewTransition) return;
      event.preventDefault();
      document.startViewTransition(() => {
        window.location.href = link.href;
      });
    });
  });
}

function mountPreviewStrip() {
  const mount = document.querySelector('[data-project-preview-strip]');
  if (!mount) return;

  const lastProject = localStorage.getItem('portfolio:last-project');
  const list = document.createElement('ol');
  list.className = 'project-preview-strip horizontal-rail';
  list.setAttribute('aria-label', 'Project preview strip');

  PROJECTS.forEach((project) => {
    const item = document.createElement('li');
    item.className = 'project-preview-card';

    const link = document.createElement('a');
    link.href = project.route;
    link.dataset.projectId = project.id;
    link.innerHTML = `<span>${project.label}</span><strong>${project.title}</strong>`;

    if (project.id === currentProject?.id) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('is-active');
    }

    if (project.id === lastProject && project.id !== currentProject?.id) {
      link.dataset.lastVisited = 'true';
    }

    item.append(link);
    list.append(item);
  });

  mount.append(list);
}

function revealTransitionState() {
  const from = sessionStorage.getItem('portfolio:transition-from');
  const to = sessionStorage.getItem('portfolio:transition-to');
  if (!from && !to) return;

  document.documentElement.dataset.transitionFrom = from || '';
  document.documentElement.dataset.transitionTo = to || '';
  window.setTimeout(() => {
    document.documentElement.removeAttribute('data-transition-from');
    document.documentElement.removeAttribute('data-transition-to');
  }, 900);
}

mountPreviewStrip();
setSharedNavigationState();
setupProjectTransitions();
revealTransitionState();
