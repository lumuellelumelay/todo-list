import './assets/styles/styles.css';

// controller with the user click the navigation menu and render contents
import { MenuController } from './assets/controls/menuController.js';
import { ProjectController } from './assets/controls/projectController.js';

// this is for creating projects
import { CreateProjects } from './dataProjectManagement/createProjects.js';

// this is for creating lists
import { CreateList } from './dataListManagement/createList.js';

// this is for the project overlay (dialog)
import { changeDialogState } from './assets/controls/projectOverlayController.js';

// for sidebar toggle button
import { toggleMenu } from './assets/controls/toggleController.js';

// for testing
import dateHandler from './modules/dateManager.js';

const textareaAdjustHeight = () => {
  const parentContainer = document.querySelector('.my-task');
  const textarea = parentContainer.querySelector('#description');

  function adjustHeight() {
    textarea.style.height = 'auto';

    const scrollHeight = textarea.scrollHeight;
    const maxHeight = 16;

    const maxHeightPixels = maxHeight * 16;

    if (scrollHeight > maxHeightPixels) {
      textarea.style.height = `${maxHeightPixels}px`;
      textarea.style.overflowY = 'auto';
    } else {
      textarea.style.height = `${scrollHeight}px`;
      textarea.style.overflowY = 'hidden';
    }
  }

  textarea.addEventListener('input', adjustHeight);

  setTimeout(adjustHeight, 0);

  Array.from(document.querySelectorAll('.dialog-wrapper'))
    .filter((item) => item.dataset.nameDialog === 'my-task-dialog')
    .forEach((item) => {
      if (item.dataset.isActive === 'true') {
        setTimeout(adjustHeight, 0);
      }
    });
};

document.addEventListener('DOMContentLoaded', () => {
  // for textarea
  textareaAdjustHeight();

  changeDialogState();

  toggleMenu();

  new MenuController(document.querySelector('.menu-list'));
  new ProjectController();

  new CreateProjects();
  new CreateList();

  dateHandler.updateListStatus();
});
