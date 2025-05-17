// NOTE: Testing for the render page
// Functionality:
// 1. Render the Today page when the user first time visit the page
// 2. Render the page title
// 3. Render the menu
// This file will serve as a render page handler

import menuOptionHandler from '../render/menuRenderHandler.js';

const menu = new Set(['Today', 'Pending', 'Inbox', 'Overdue']);
const [todayHandler, upcomingHandler, overdueHandler, inboxHandler] =
  menuOptionHandler;

// this will render the menu title or project name
// CHECK: import in memuController
// CHECK: import in projectController
export const renderPageHandler = (data) => {
  const parentTitleWrapper = document.querySelector('.top-section-wrapper');
  const titlePage = parentTitleWrapper.querySelector('.project-title');

  if (menu.has(data)) {
    titlePage.textContent = data;
    titlePage.dataset.name = data;

    if (data === 'Pending') {
      titlePage.textContent = 'Upcoming';
    }
    menuContentsRender(data);

    return;
  }

  if (projectDataHelper(data)) {
    titlePage.textContent = data.title;
    titlePage.dataset.name = data.title;

    projectContentsRender(data);
  }
};

const projectDataHelper = (data) => {
  const parentProjectContainer = document.querySelector(
    '.bottom-add-project-section'
  );
  const projectCards = Array.from(
    parentProjectContainer.querySelectorAll('.project-cards')
  );

  return projectCards.find((item) => {
    return String(data.id) === String(item.dataset.projectId);
  });
};

const menuContentsRender = (menuTitle) => {
  // for rendering the menu contents
  switch (menuTitle) {
    case 'Today':
      todayHandler('today');
      break;
    case 'Pending':
      upcomingHandler('pending');
      break;
    case 'Inbox':
      inboxHandler('inbox');
      break;
    case 'Overdue':
      overdueHandler('overdue');
      break;
    default:
      console.error('no menu title');
  }
};

const projectContentsRender = (data) => {
  console.log(data);
};
