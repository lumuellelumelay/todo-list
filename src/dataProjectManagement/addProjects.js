import { CreateCard } from '../assets/projectCardHandler/createCard.js';
import { projectList } from './projectList.js';

const projectListInstance = new projectList();

export class addProjects {
  constructor() {
    this.formValues = {};
    this.form = this.initialize();
    this.setupEventListeners();
  }

  initialize() {
    return document.querySelector('.my-project-dialog form');
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();

    document.querySelector('#project-name').value;
    document.querySelector('input[name="color"]:checked').value;

    const formData = new FormData(this.form);
    const formValues = Object.fromEntries(formData.entries()); // form values will be example: {projectName: 'example', color: default}

    this.formValues = formValues;

    this.postFormValues();
  }

  getFormValues() {
    return this.formValues;
  }

  postFormValues() {
    projectListInstance.addProject(
      this.formValues.projectName,
      this.formValues.color
    );

    this.createProjectCard();

    this.resetFormValues();
  }

  resetFormValues() {
    this.formValues = {};
  }

  createProjectCard() {
    const { id, title, color, list } = projectListInstance.getlatestProject();

    const cardInstance = new CreateCard(id, title, color, list);

    cardInstance.renderCard();
  }
}
