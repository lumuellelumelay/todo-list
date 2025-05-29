import projectListInstance from '../../modules/projectManager.js';
import { renderPageHandler } from '../../modules/renderPageHandler.js';
import { CreateProjectCard } from '../projectCardHandler/createCardProject.js';

export class ProjectController {
  constructor() {
    this.projectContainer = document.querySelector('.projects-container');
    this.activeId = null;
    this.target = null;
    this.initialize();
  }

  initialize() {
    this.menuControls();

    this.displayHandler();
  }

  // NOTE: testing stage
  renderHelper() {
    // get the active id
    // post the active id to the projectList.js to get the active project
    // post data to render the project data to the container (render.js)
    const project = projectListInstance.getProject(this.activeId); // this will get the corresponding project

    renderPageHandler(project);
  }

  updateProjectItemCountDesktop() {
    const projectContainer = document.querySelector('#projects-container');

    if (!projectContainer) return;

    const projectCards = Array.from(
      projectContainer.querySelectorAll('.project-cards')
    );
    const projectList = projectListInstance.getProjectList();

    projectCards.forEach((projectCards) => {
      const project = projectList.find(
        (project) => project.id === Number(projectCards.dataset.projectId)
      );

      projectCards.querySelector(
        '.items'
      ).textContent = `${project.list.length}`;
    });
  }

  projectCardHandler(projectCards, projectList) {
    if (projectList.length > 1 && projectCards.length >= 0) {
      return true;
    }

    return false;
  }

  displayHandler() {
    const projectCardList = () => {
      const projectList = projectListInstance.getProjectList();
      const projectCards = Array.from(
        this.projectContainer.querySelectorAll('.project-cards')
      );

      if (this.projectCardHandler(projectCards, projectList)) {
        projectList.forEach((project) => {
          if (project.title.toLowerCase() === 'inbox') return;

          const existingCard = projectCards.find(
            (card) => card.dataset.projectId === String(project.id)
          );
          if (existingCard) {
            return;
          }

          const projectCard = new CreateProjectCard(
            project.id,
            project.title,
            project.color,
            project.list.length
          );

          projectCard.renderCard();
        });
      }
    };

    const handlerResize = () => {
      const displayWidth = window.innerWidth;

      if (displayWidth > 511) {
        projectCardList();
        this.updateProjectItemCountDesktop();
      }
    };

    window.addEventListener('resize', handlerResize);
  }

  menuControls() {
    this.projectContainer.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // NOTE: checking if it effects other events
      this.target = e.target.closest('.project-cards');

      if (this.target) {
        this.deactivateMenuItems();

        this.target.dataset.isActive = 'true';
        this.activeHandler(this.target);

        this.activeId = +this.target.dataset.projectId;

        this.renderHelper();
      }
    });
  }

  activeHandler(currentTarget) {
    Array.from(document.querySelectorAll('.project-cards')).forEach(
      (projectItems) => {
        if (projectItems !== currentTarget) {
          projectItems.dataset.isActive = 'false';
        }
      }
    );
  }

  // this instance deactivate styles on the menu items
  deactivateMenuItems() {
    Array.from(document.querySelectorAll('.menu-list li')).forEach(
      (menuItem) => {
        menuItem.querySelector('a').dataset.isActive = 'false';
        menuItem.querySelector('div').dataset.iconType = 'line';
      }
    );
  }
}
