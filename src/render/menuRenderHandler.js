// import listInstance from './listManager.js';
import renderHandler from './renderModules.js';

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

const todayHandler = (activePage) => {
  addTaskDisplayHandler(activePage);
  removeProjectCardsHandler();

  removeCardHandler();
  createCardHandler(activePage);
};

const upcomingHandler = (activePage) => {
  addTaskDisplayHandler(activePage);
  removeProjectCardsHandler();

  removeCardHandler();
  createCardHandler(activePage);
};

const overdueHandler = (activePage) => {
  addTaskDisplayHandler(activePage);
  removeProjectCardsHandler();

  removeCardHandler();
  createCardHandler(activePage);
};

const inboxHandler = (activePage) => {
  addTaskDisplayHandler(activePage);
  removeProjectCardsHandler();

  removeCardHandler();
  createCardHandler(activePage);
};

const projectHandler = (activePage) => {
  addTaskDisplayHandler(activePage);

  removeCardHandler();
  createProjectCardsHandler(activePage);
};

export default [
  todayHandler,
  upcomingHandler,
  overdueHandler,
  inboxHandler,
  projectHandler,
];
