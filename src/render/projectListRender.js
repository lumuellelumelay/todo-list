// get the project list-container class
// when the user click the project item:
// 1. get the project id
// 2. remove the list-container class
// 3. add the list cards

// export class Projects extends Component {
//     constructor(id, title, color) {
//         super(id, title, color);
//     }
// }
import projectListInstance from '../modules/projectManager.js';
import { ProjectPageRenderMobile } from './projectPageRender.js';

import renderModules from './renderModules.js';

const [
  createProjectCardsHandler,
  removeProjectCardsHandler,
  createCardHandler,
  removeCardHandler,
] = renderModules;

export class ProjectsListRender {
  constructor() {
    this.listWrapper = document.querySelector('.todo-list-card-container');
  }

  getProjectWrapper() {
    return this.listWrapper.querySelector('#projects-container');
  }

  backButtonHandler(mobileWrapper, projectPageRender) {
    const backButton = mobileWrapper.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      projectPageRender.removeProjectListWrapper();

      createProjectCardsHandler('projects');
      this.addEventProjectCards();
    });
  }

  activeProjectHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target.closest('.project-cards');

    const projectData = this.getDataActiveProject(target);

    const projectPageRender = new ProjectPageRenderMobile(projectData);

    // NOTE: testing
    projectPageRender.renderHandler();

    const mobileWrapper = projectPageRender.getMobileWrapper();
    this.backButtonHandler(mobileWrapper, projectPageRender);

    projectPageRender.activeProjectContentPage(projectData);
  };

  getDataActiveProject(activeProject) {
    const projectId = Number(activeProject.dataset.projectId);
    const selectedProject = projectListInstance.getProject(projectId);

    return selectedProject;
  }

  addEventProjectCards() {
    const projectWrapper = this.getProjectWrapper();

    const projectItems = Array.from(
      projectWrapper.querySelectorAll('.project-cards')
    );

    if (!projectItems || projectItems.length === 0) return;

    if (!this.activeProjectHandler) {
      this.activeProjectHandler = (e) => this.activeProjectHandler(e);
    }

    projectWrapper.addEventListener('click', this.activeProjectHandler);
  }

  removeEventProjectCards() {
    const projectWrapper = this.getProjectWrapper();

    if (!projectWrapper) return;

    if (this.activeProjectHandler) {
      projectWrapper.removeEventListener('click', this.activeProjectHandler);
    }
  }
}
