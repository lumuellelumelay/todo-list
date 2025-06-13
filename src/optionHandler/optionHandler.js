// This module is to create the option selection for the list dialog
import projectListInstance from '../modules/projectManager.js';

export class OptionHandler {
  constructor() {
    this.wrapper = document.querySelector('.forms-user');
    this.editWrapper = document.querySelector('.edit-form-user');
    this.initialize();
  }

  initialize() {
    this.wrapper = this.wrapper.querySelector('#projectList');
    this.editWrapper = this.editWrapper.querySelector('#projectList');
  }

  createOption(projectId, title) {
    const optionFormUser = document.createElement('option');
    optionFormUser.value = projectId;
    optionFormUser.textContent = title;
    this.wrapper.append(optionFormUser);

    const optionEditFormUser = document.createElement('option');
    optionEditFormUser.value = projectId;
    optionEditFormUser.textContent = title;
    this.editWrapper.append(optionEditFormUser);
  }

  // this will update the option when the project is created
  updateOption(data) {
    const optionSelection = Array.from(
      this.wrapper.querySelectorAll('option')
    ).some((option) => option.value === String(data.id));

    if (!optionSelection) {
      this.createOption(data.id, data.title);
    }
  }

  // this handles the delete option
  // NOTE: testing
  deleteOption2() {
    const projects = projectListInstance
      .getStoredProjects()
      .map((project) => String(project.id));

    Array.from(this.wrapper.querySelectorAll('option')).forEach((option) => {
      if (option.value && !projects.includes(option.value)) {
        option.remove();
      }
    });
  }

  deleteOption(id) {
    const optionSelected = Array.from(
      this.wrapper.querySelectorAll('option')
    ).find((option) => {
      return option.value === id;
    });

    if (optionSelected) {
      optionSelected.remove();
    } else {
      return;
    }
  }
}
