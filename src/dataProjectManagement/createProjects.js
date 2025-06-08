// This is for creating projects. It handles the form data
// and creates the project card.
// The form data is handled with projectList.js
// and retrieve the latest project from the projectList.js
import { CreateProjectCard } from '../assets/projectCardHandler/createCardProject.js';
import projectListInstance from '../modules/projectManager.js';
import projectListRender from '../render/projectListRenderHandler.js';

import optionHandler from '../modules/optionManager.js';

export class CreateProjects {
  constructor() {
    this.formValues = {};
    this.form = this.initialize();
    this.setupEventListeners();
  }

  initialize() {
    this.renderStoredProjects();

    return document.querySelector('.my-project-dialog form');
  }

  renderStoredProjects() {
    const storedProjects = projectListInstance.getStoredProjects();

    storedProjects.forEach((item) => {
      if (item.id !== 0) {
        this.createProjectCard(item.id, item.title, item.color, item.list);
      }

      optionHandler.updateOption(item);
    });
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    const formValues = Object.fromEntries(formData.entries()); // form values will be example: {projectName: 'example', color: default}

    this.formValues = this.checkWhiteSpaces(formValues);

    this.postFormValues();
  }

  getFormValues() {
    return this.formValues;
  }

  checkWhiteSpaces(formValues) {
    const projectName = formValues.projectName;
    formValues.projectName = projectName.trim();
    return formValues;
  }

  postFormValues() {
    projectListInstance.addProject(
      this.formValues.projectName,
      this.formValues.color
    );

    this.createLatestProjectCard();

    this.closeOverlay();

    this.resetFormValues();
  }

  closeOverlay() {
    const overlayWrapper = Array.from(
      document.querySelectorAll('.dialog-wrapper')
    ).filter((item) => item.dataset.nameDialog === 'my-project-dialog');

    overlayWrapper[0].dataset.isActive = 'false';
    document.body.dataset.dialogActive = 'false';
  }

  resetFormValues() {
    this.formValues = {};
    document.querySelector('#project-name').value = '';
    document.querySelector('input[value="default"]').checked = true;
  }

  createLatestProjectCard() {
    const latestProject = projectListInstance.getlatestProject();
    const { id, title, color, list } = latestProject;
    this.createProjectCard(id, title, color, list);

    optionHandler.updateOption(latestProject);
  }

  createProjectCard(id, title, color, list) {
    const cardInstance = new CreateProjectCard(id, title, color, list);

    cardInstance.renderCard();
    this.addEventProjectCardsHandler();
  }

  getActiveMenu() {
    const menuMobileChoices = Array.from(
      document.querySelectorAll('.mobile-menu .menu-list li a')
    );

    const activeMenu = menuMobileChoices.find(
      (menu) => menu.dataset.isActive === 'true'
    );

    return activeMenu;
  }

  addEventProjectCardsHandler() {
    if (this.getActiveMenu().dataset.name !== 'Projects') return;

    // reset the event listener when adding project items
    projectListRender.removeEventProjectCards();

    projectListRender.addEventProjectCards();
  }
}
