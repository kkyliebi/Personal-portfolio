import { existsSync, readFileSync } from 'node:fs';

const routes = [
  'index.html',
  'about/index.html',
  'work/index.html',
  'archive/index.html',
  'contact/index.html',
  'work/project-01-t-rex-communication-system/index.html',
  'work/project-02-oracle-glyph-system/index.html',
  'work/project-03-ar-interactive-typography/index.html',
  'work/project-04-speculative-branding-system/index.html',
  'work/project-05-editorial-visual-communication-project/index.html',
];

const projectData = JSON.parse(readFileSync('data/projects.json', 'utf8'));
const requiredProjectFields = ['id', 'index', 'title', 'year', 'type', 'medium', 'concept', 'route', 'tags', 'previous', 'next'];
const missingRoutes = routes.filter((route) => !existsSync(route));
const workHtml = readFileSync('work/index.html', 'utf8');
const styles = readFileSync('src/styles.css', 'utf8');
const interactions = readFileSync('src/interactions.js', 'utf8');
const layoutDocs = readFileSync('docs/layout-system.md', 'utf8');

const projectsWithMissingMetadata = projectData.projects.filter((project) => {
  return requiredProjectFields.some((field) => project[field] === undefined || project[field] === '' || project[field].length === 0);
});

const missingProjects = projectData.projects.filter((project) => {
  return !workHtml.includes(`Project ${project.index}`) || !workHtml.includes(project.title) || !workHtml.includes(project.route);
});

const readingOrderMismatch = projectData.readingOrder.length !== projectData.projects.length
  || projectData.readingOrder.some((id) => !projectData.projects.some((project) => project.id === id));

const pagesWithoutHorizontalNav = routes
  .filter((route) => existsSync(route))
  .filter((route) => !readFileSync(route, 'utf8').includes('class="horizontal-nav"'));

const pagesWithoutInteractionScript = routes
  .filter((route) => existsSync(route))
  .filter((route) => !readFileSync(route, 'utf8').includes('/src/interactions.js'));

const pagesWithoutSharedNavState = routes
  .filter((route) => existsSync(route))
  .filter((route) => !readFileSync(route, 'utf8').includes('data-nav-section'));


const workMissingIndexConcepts = ['Random access project jump list', 'Filter groups', 'Narrative project index']
  .filter((label) => !workHtml.includes(label));

const missingLayoutClasses = ['.editorial-grid', '.horizontal-rail', '--type-display', '--space-md']
  .filter((token) => !styles.includes(token));

const missingInteractionCss = ['::view-transition', '.project-preview-card', '.is-previewed']
  .filter((token) => !styles.includes(token));

const missingInteractionLogic = ['startViewTransition', 'localStorage', 'sessionStorage', 'data-project-preview-strip']
  .filter((token) => !interactions.includes(token));

const missingLayoutDocs = ['CSS grid system', 'Typography scale', 'Spacing rules']
  .filter((heading) => !layoutDocs.includes(heading));

const projectPageRequirements = projectData.projects.map((project) => {
  const routePath = `${project.route.replace(/^\//, '')}index.html`;
  const html = existsSync(routePath) ? readFileSync(routePath, 'utf8') : '';
  const requiredText = [project.title, project.concept, 'Visual gallery', 'Process documentation', 'Metadata'];
  const missingText = requiredText.filter((text) => !html.includes(text));
  const missingTemplateClasses = ['visual-gallery', 'process-list', 'metadata-block', 'concept-statement']
    .filter((className) => !html.includes(className));

  return {
    routePath,
    missingText,
    missingTemplateClasses,
  };
}).filter((page) => page.missingText.length || page.missingTemplateClasses.length);


if (
  missingRoutes.length
  || missingProjects.length
  || projectsWithMissingMetadata.length
  || readingOrderMismatch
  || pagesWithoutHorizontalNav.length
  || workMissingIndexConcepts.length
  || missingLayoutClasses.length
  || missingLayoutDocs.length
  || projectPageRequirements.length
  || pagesWithoutInteractionScript.length
  || pagesWithoutSharedNavState.length
  || missingInteractionCss.length
  || missingInteractionLogic.length
) {
  console.error('Portfolio structure validation failed.');
  console.error({
    missingRoutes,
    missingProjects,
    projectsWithMissingMetadata,
    readingOrderMismatch,
    pagesWithoutHorizontalNav,
    workMissingIndexConcepts,
    missingLayoutClasses,
    missingLayoutDocs,
    projectPageRequirements,
    pagesWithoutInteractionScript,
    pagesWithoutSharedNavState,
    missingInteractionCss,
    missingInteractionLogic,
  });
  process.exit(1);
}

console.log('Portfolio structure validation passed.');
src/interactions.js
src/interactions.js
