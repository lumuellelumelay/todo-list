import { CreateCard } from '../assets/listCardHandler/createCard.js';
import renderProjectList from './projectRenderHandler.js';

import renderModules from './renderModules.js';
const [
  createProjectCardsHandler,
  removeProjectCardsHandler,
  createCardHandler,
  removeCardHandler,
] = renderModules;

export class ProjectPageRenderMobile {
  constructor(projectData) {
    this.projectData = projectData;
    this.wrapper = this.getWrapper();
    this.wrapperMobile = null;
  }

  getWrapper() {
    return document.querySelector('.todo-list-card-container');
  }

  getMobileWrapper() {
    return this.wrapper.querySelector('.todo-list-card-container-mobile');
  }

  // creating project list card wrapper for mobile view of active project list cards
  createProjectListWrapper() {
    const projectListWrapper = document.createElement('div');
    projectListWrapper.classList.add('todo-list-card-container-mobile');

    this.wrapper.appendChild(projectListWrapper);

    this.wrapperMobile = this.wrapper.querySelector(
      '.todo-list-card-container-mobile'
    );

    removeProjectCardsHandler();
  }

  removeProjectListWrapper() {
    this.wrapperMobile.remove(
      this.wrapperMobile.querySelector('.todo-list-card-container-mobile')
    );
  }

  mobileComponent() {
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    const backButton = document.createElement('button');
    backButton.classList.add('back-button');
    backButton.textContent = '< Back'; // temporary

    this.wrapperMobile.appendChild(buttonContainer);
    buttonContainer.appendChild(backButton);
  }

  activeProjectContentPage(projectData) {
    this.createMobileProjectCardList();

    this.activeProjectChangeTitle(projectData);

    renderProjectList(projectData);
  }

  createMobileProjectCardList() {
    const mobileProjectList = document.createElement('div');
    mobileProjectList.classList.add('mobile-card-list');
    this.wrapperMobile.appendChild(mobileProjectList);
  }

  showAddTask(wrapper) {
    const addTask = wrapper.querySelector('.add-task');
    addTask.classList.remove('hidden');
  }

  activeProjectChangeTitle(projectData) {
    const topSelectionContent = document.querySelector('.top-section-content');
    const topSelectionWrapper = topSelectionContent.querySelector(
      '.top-section-wrapper'
    );

    this.showAddTask(topSelectionWrapper);

    this.wrapperMobile.setAttribute('data-project-id', projectData.id);

    const titleContainer = topSelectionWrapper.querySelector('.title');
    const title = titleContainer.querySelector('.project-title');
    title.dataset.name = projectData.title;
    title.textContent = title.dataset.name;
  }

  renderHandler() {
    this.createProjectListWrapper();
    this.mobileComponent();
  }
}
