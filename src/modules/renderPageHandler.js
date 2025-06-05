// NOTE: Testing for the render page
// Functionality:
// 1. Render the Today page when the user first time visit the page
// 2. Render the page title
// 3. Render the menu
// This file will serve as a render page handler

import menuOptionHandler from '../render/menuRenderHandler.js';
import renderProjectList from '../render/projectRenderHandler.js';

const [menuOption, projectHandler] = menuOptionHandler;

const desktopMenu = new Set(['Today', 'Pending', 'Inbox', 'Overdue']);
const mobileMenu = new Set([
  'Today',
  'Pending',
  'Inbox',
  'Overdue',
  'Projects',
]);

// this will render the menu title or project name
// CHECK: import in memuController
// CHECK: import in projectController
export const renderPageHandler = (data) => {
  const parentTitleWrapper = document.querySelector('.top-section-wrapper');
  const titlePage = parentTitleWrapper.querySelector('.project-title');

  const menu = displayHandler();

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

const pageRenderToDesktop = (display) => {
  const parentWrapper = document.querySelector('.todo-list-card-container');
  const mobileListContainer = parentWrapper.querySelector(
    '.todo-list-card-container-mobile'
  );

  if (!mobileListContainer) return;

  if (display > 511) {
    mobileListContainer.remove();
  }
};

const displayHandler = () => {
  const handlerResize = () => {
    const displayWidth = window.innerWidth;

    if (displayWidth < 511) {
      return mobileMenu;
    } else {
      pageRenderToDesktop(displayWidth);
      return desktopMenu;
    }
  };

  window.addEventListener('resize', handlerResize);

  return handlerResize();
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
  const menu = menuTitle.toLowerCase();

  if (desktopMenu.has(menuTitle)) {
    menuOption(menu);
    return;
  } else {
    projectHandler(menu);
  }
};

const projectContentsRender = (data) => {
  renderProjectList(data);
};
