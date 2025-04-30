// This module is to create the option selection for the list dialog
import projectListInstance from '../modules/projectManager.js';

export class OptionHandler {
  constructor() {
    this.wrapper = document.querySelector('.forms-user');
    this.initialize();
  }

  initialize() {
    this.wrapper = this.wrapper.querySelector('#projectList');
  }

  createOption(projectId, title) {
    const option = document.createElement('option');
    option.value = projectId;
    option.textContent = title;

    this.wrapper.append(option);
  }

  // this will update the option when the project is created
  updateOption() {
    projectListInstance.getProjectList().forEach((items) => {
      const optionSelection = Array.from(
        this.wrapper.querySelectorAll('option')
      ).some((option) => option.value === String(items.id));

      if (!optionSelection) {
        this.createOption(items.id, items.title);
        // console.log(items);
      }
    });
  }

  // this handles the delete option
  // NOTE: testing
  deleteOption2() {
    const projects = projectListInstance
      .getProjectList()
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
