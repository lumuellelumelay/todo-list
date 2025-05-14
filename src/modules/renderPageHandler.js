// NOTE: Testing for the render page
// Functionality:
// 1. Render the Today page when the user first time visit the page
// 2. Render the page title
// 3. Render the menu
// This file will serve as a render page handler

import menuOptionHandler from '../render/menuRenderHandler.js';

const menu = ['Today', 'Pending', 'Inbox', 'Overdue'];
const [todayHandler, upcomingHandler, overdueHandler, inboxHandler] =
  menuOptionHandler;

// this will render the menu title or project name
// CHECK: import in memuController
export const renderPageHandler = (menuTitle) => {
  const parentTitleWrapper = document.querySelector('.top-section-wrapper');
  const titlePage = parentTitleWrapper.querySelector('.project-title');

  if (menu.includes(menuTitle)) {
    titlePage.textContent = menuTitle;
    titlePage.dataset.name = menuTitle;

    if (menuTitle === 'Pending') {
      titlePage.textContent = 'Upcoming';
    }
    menuContentsRender(menuTitle);
  }
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
