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
    this.activeElement = null;
  }

  postActiveElement(status) {
    this.activeElement = status;
  }

  getActiveElement() {
    return this.activeElement;
  }

  getProjectWrapper() {
    return this.listWrapper.querySelector('#projects-container');
  }

  removeAddTask(wrapper) {
    const addTask = wrapper.querySelector('.add-task');
    addTask.classList.add('hidden');
  }

  changeActiveToProject() {
    const topSelectionContent = document.querySelector('.top-section-content');
    const topSelectionWrapper = topSelectionContent.querySelector(
      '.top-section-wrapper'
    );

    this.removeAddTask(topSelectionWrapper);

    const titleContainer = topSelectionWrapper.querySelector('.title');
    const title = titleContainer.querySelector('.project-title');
    title.dataset.name = 'Projects';
    title.textContent = title.dataset.name;
  }

  backButtonHandler(mobileWrapper, projectPageRender) {
    const backButton = mobileWrapper.querySelector('.back-button');
    backButton.addEventListener('click', () => {
      projectPageRender.removeProjectListWrapper();

      this.listWrapper.removeAttribute('data-project-id');

      createProjectCardsHandler('projects');

      this.changeActiveToProject();
      this.addEventProjectCards();
    });
  }

  // NOTE: Testing
  activeProjectHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const target = e.target.closest('.project-cards');
    this.activeElement = target;

    const projectData = this.getDataActiveProject(target);

    const projectPageRender = new ProjectPageRenderMobile(projectData);

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
