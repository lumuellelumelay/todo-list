// import listInstance from './listManager.js';
import renderHandler from './renderModules.js';

import projectListRender from './projectListRenderHandler.js';

const [
  createProjectCardsHandler,
  removeProjectCardsHandler,
  createCardHandler,
  removeCardHandler,
] = renderHandler;

// getting the section for the render list cards
const addTaskDisplayHandler = (activePage) => {
  const addTask = document.querySelector('.add-task');

  if (activePage !== 'projects') {
    addTask.classList.remove('hidden');
    return;
  }

  addTask.classList.add('hidden');
};

const removeListCardMobile = () => {
  const parentContainer = document.querySelector('.todo-list-card-container');
  const mobileContainer = parentContainer.querySelector(
    '.todo-list-card-container-mobile'
  );

  if (!mobileContainer) return;

  parentContainer.removeChild(mobileContainer);
};

const menuOption = (activePage) => {
  addTaskDisplayHandler(activePage);

  const mobileDisplay = window.innerWidth < 511;
  if (mobileDisplay) {
    projectListRender.removeEventProjectCards();
    removeListCardMobile();
  }

  removeProjectCardsHandler();

  removeCardHandler();
  createCardHandler(activePage);
};

// When the user selects the project items, it will render the project items list
// When the user change pages, it retains the project items list cards
const projectHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  createProjectCardsHandler(activePage);

  projectListRender.removeEventProjectCards();
  projectListRender.addEventProjectCards();
};

export default [menuOption, projectHandler];
