// this file will create a list card and render it to the list container
// following path:
// user input -> get data from the form -> create list card -> post data to the list
// this file will handle the dates and the due date

import projectListInstance from '../modules/projectManager.js';
import listInstance from '../modules/listManager.js';
import dateHandler from '../modules/dateManager.js';
import { CreateCard } from '../assets/listCardHandler/createCard.js';

export class CreateList {
  constructor() {
    this.form = this.initialize();
    this.setupEventListeners();
  }

  initialize() {
    return document.querySelector('.my-add-task-dialog form');
  }

  setupEventListeners() {
    this.form.addEventListener('submit', this.submitHandler.bind(this));
  }

  submitHandler(e) {
    e.preventDefault();

    const formData = new FormData(this.form);
    let formValue = Object.fromEntries(formData.entries());

    formValue = this.checkWhiteSpaces(formValue);
    formValue = this.dueDateHandler(formValue);

    this.postFormValues(formValue);
  }

  dueDateHandler(formValues) {
    if (!formValues['due-date']) {
      formValues['due-date'] = null;
    }
    return formValues;
  }

  checkWhiteSpaces(formValues) {
    const title = formValues.title;
    formValues.title = title.trim();
    return formValues;
  }

  postFormValues(formValues) {
    const data = {
      projectId: this.projectHandler(formValues.project),
      title: formValues.title,
      description: formValues.description,
      day: dateHandler.dateDay(formValues['due-date']),
      due_date: formValues['due-date'],
      created_at: dateHandler.createdAtDate(),
      status: dateHandler.listStatus(formValues['due-date']),
      completed: false,
    };

    if (data.projectId !== 0) {
      listInstance.addListToProjectId(
        data.projectId,
        data.title,
        data.description,
        data.day,
        data.due_date,
        data.created_at,
        data.status,
        data.completed
      );

      this.updateProjectItemCount(data.projectId);

      const activeElement = this.getActivePage();

      this.renderActivePage(activeElement.dataset.name);
    }

    if (projectListInstance.getProjectList()[0].id === data.projectId) {
      listInstance.addListToProjectId(
        data.projectId,
        data.title,
        data.description,
        data.day,
        data.due_date,
        data.created_at,
        data.status,
        data.completed
      );

      const activeElement = this.getActivePage();

      this.renderActivePage(activeElement.dataset.name);
    }
  }

  projectHandler(projectId) {
    if (!projectId) {
      return 0;
    }
    return Number(projectId);
  }

  updateProjectItemCount(selectedId) {
    const parent = document.querySelector('#projects-container');
    const projectCards = Array.from(parent.querySelectorAll('.project-cards'));

    const projectCard = projectCards.find((items) => {
      return items.dataset.projectId === String(selectedId);
    });

    projectCard.querySelector('.items').textContent = `${
      projectListInstance.getProject(selectedId).list.length
    }`;
  }

  getActivePage() {
    const menuChoices = Array.from(
      document.querySelectorAll('.menu-list li a')
    );
    const projectChoices = Array.from(
      document.querySelectorAll('#projects-container .project-cards')
    );

    let activeElement;
    const choices = [...menuChoices, ...projectChoices];

    choices.forEach((choice) => {
      if (choice.dataset.isActive === 'true') {
        activeElement = choice;
      }
    });

    return activeElement;
  }

  renderActivePage(dataname) {
    projectListInstance.getProjectList().forEach((project) => {
      project.list.forEach((list) => {
        if (!this.checkDuplicate(project, list)) {
          if (
            project.id === 0 &&
            project.title.toLowerCase() === dataname.toLowerCase()
          ) {
            const listCard = new CreateCard(
              project.id,
              list.id,
              list.title,
              list.description,
              list.status,
              list.day,
              project.color,
              project.title
            );
            listCard.render();
            return;
          }
          if (list.status === `${dataname.toLowerCase()}`) {
            const listCard = new CreateCard(
              project.id,
              list.id,
              list.title,
              list.description,
              list.status,
              list.day,
              project.color,
              project.title
            );
            listCard.render();
            return;
          }
        }
      });
    });
  }

  checkDuplicate(project, list) {
    const allExistingCards = Array.from(
      document.querySelectorAll('.list-card')
    );

    if (allExistingCards.length === 0) {
      return false;
    }

    return allExistingCards.some(
      (card) =>
        Number(project.id) === Number(card.dataset.projectId) &&
        Number(list.id) === Number(card.dataset.idList)
    );
  }
}
