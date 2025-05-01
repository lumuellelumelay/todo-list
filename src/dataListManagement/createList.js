// this file will create a list card and render it to the list container
// following path:
// user input -> get data from the form -> create list card -> post data to the list
// this file will handle the dates and the due date

import listInstance from '../modules/listManager.js';
import dateHandler from '../modules/dateManager.js';

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
      formValues['due-date'] = dateHandler.getTodayDate();
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
      created_at: dateHandler.getTodayDate(),
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
    }
    // else add to index menu (comming soon)
  }

  projectHandler(projectId) {
    if (!projectId) {
      return 0;
    }
    return Number(projectId);
  }
}
