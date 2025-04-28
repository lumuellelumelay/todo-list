// NOTE: Testing for the render page
// Functionality:
// 1. Render the Today page when the user first time visit the page
// 2. Render the page title
// 3. Render the menu
// This file will serve as a render page handler

import menuOptionHandler from '../modules/menuOptionHandler.js';

const menu = ['Today', 'Upcoming', 'Completed', 'Overdue'];
const [todayHandler, upcomingHandler, overdueHandler] = menuOptionHandler;

// this will render the menu title or project name
export const renderPageHandler = (menuTitle) => {
  const parentTitleWrapper = document.querySelector('.top-section-wrapper');
  const titlePage = parentTitleWrapper.querySelector('.project-title');

  if (menu.includes(menuTitle)) {
    titlePage.textContent = menuTitle;
    titlePage.dataset.name = menuTitle;
    menuContentsRender(menuTitle);
  }
};

const menuContentsRender = (menuTitle) => {
  // for rendering the menu contents
  switch (menuTitle) {
    case 'Today':
      todayHandler();
      break;
    case 'Upcoming':
      upcomingHandler();
      break;
    case 'Completed':
      // render the completed page
      console.log('Completed');
      break;
    case 'Overdue':
      overdueHandler();
      break;
    default:
      // render the today page
      console.error('no menu title');
  }
};
