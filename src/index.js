import './assets/styles/styles.css';
import { MenuController } from './assets/controls/menuController.js';
import { ProjectController } from './assets/controls/projectController.js';

import { addProjects } from './dataProjectManagement/addProjects.js';
import { changeDialogState } from './assets/controls/projectOverlayController.js';

document.addEventListener('DOMContentLoaded', () => {
  changeDialogState();

  new MenuController(document.querySelector('.menu-list'));

  new ProjectController(document.querySelector('.projects-container'));

  new addProjects();
});
