// import listInstance from './listManager.js';
import renderHandler from './renderModules.js';

const [createCardHandler, removeCardHandler] = renderHandler;

// getting the section for the render list cards
const addTaskDisplayHandler = (activePage) => {
  const addTask = document.querySelector('.add-task');

  if (activePage !== 'projects') {
    addTask.classList.remove('hidden');
    return;
  }

  addTask.classList.add('hidden');
};

const todayHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  createCardHandler(activePage);
};

const upcomingHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  createCardHandler(activePage);
};

const overdueHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  createCardHandler(activePage);
};

const inboxHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  createCardHandler(activePage);
};

const projectHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  // NOTE: create the render project list cards
  // NOTE: create remove render porject list cards
};

export default [
  todayHandler,
  upcomingHandler,
  overdueHandler,
  inboxHandler,
  projectHandler,
];
