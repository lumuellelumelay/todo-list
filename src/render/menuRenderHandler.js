// import listInstance from './listManager.js';
import renderHandler from './renderModules.js';

const [createCardHandler, removeCardHandler] = renderHandler;

// getting the section for the render list cards

const todayHandler = (activePage) => {
  removeCardHandler();

  createCardHandler(activePage);
};

const upcomingHandler = (activePage) => {
  removeCardHandler();

  createCardHandler(activePage);
};

const overdueHandler = (activePage) => {
  removeCardHandler();

  createCardHandler(activePage);
};

const inboxHandler = (activePage) => {
  removeCardHandler();

  createCardHandler(activePage);
};

export default [todayHandler, upcomingHandler, overdueHandler, inboxHandler];
