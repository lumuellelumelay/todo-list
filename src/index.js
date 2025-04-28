import './assets/styles/styles.css';

// controller with the user click the navigation menu and render contents
import { MenuController } from './assets/controls/menuController.js';
import { ProjectController } from './assets/controls/projectController.js';

// this is for creating projects
import { CreateProjects } from './dataProjectManagement/createProjects.js';

// this is for the project overlay (dialog)
import { changeDialogState } from './assets/controls/projectOverlayController.js';

// NOTE:for testing create card list
import { CreateCard } from './assets/listCardHandler/createCard.js';
import { toggleMenu } from './assets/controls/toggleController.js';

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

  // Note: delete this after testing
  // testing for the list card creation
  const defaultTest = new CreateCard(
    '2',
    '1',
    'defaultTest',
    'Hello World! This is a test for the todo list card!',
    'overdue',
    'Monday',
    'yellow',
    'Web Designing'
  );

  defaultTest.render();

  const noDueDateTest = new CreateCard(
    '3',
    '1',
    'noDueDateTest',
    'Hello World! This is a test for the todo list card!',
    null,
    null,
    'red',
    'Web Designing'
  );

  noDueDateTest.render();

  const noProjectTest = new CreateCard(
    '4',
    '1',
    'noProjectTest',
    'Hello World! This is a test for the todo list card!',
    'overdue',
    'Monday',
    null,
    null
  );

  noProjectTest.render();

  const noDescriptionTest = new CreateCard(
    '5',
    '1',
    'noDescriptionTest',
    null,
    'overdue',
    'Monday',
    'blue',
    'Web Designing'
  );

  noDescriptionTest.render();

  const noEverythingTest = new CreateCard(
    '6',
    '1',
    'noEverythingTest',
    null,
    null,
    null,
    'yellow',
    null
  );

  noEverythingTest.render();

  const anotherDefaultTest = new CreateCard(
    '7',
    '1',
    'anotherDefaultTest',
    'Hello World! This is a test for the todo list card!',
    'pending',
    'Monday',
    'green',
    'Web Designing'
  );

  anotherDefaultTest.render();
});
