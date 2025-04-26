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

document.addEventListener('DOMContentLoaded', () => {
  changeDialogState();

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
    'yellow',
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
    'yellow',
    'Web Designing'
  );

  // noDescriptionTest.render();

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
});
