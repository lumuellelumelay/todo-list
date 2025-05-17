// import listInstance from './listManager.js';
import renderHandler from './renderModules.js';

const [createCardHandler, removeCardHandler] = renderHandler;

// getting the section for the render list cards

const todayHandler = (activePage) => {
  console.log('Today List');

  removeCardHandler();

  createCardHandler(activePage);
};

const upcomingHandler = (activePage) => {
  console.log('Upcoming List');

  removeCardHandler();

  createCardHandler(activePage);
};

const overdueHandler = (activePage) => {
  console.log('Overdue List');

  removeCardHandler();

  createCardHandler(activePage);
};

const inboxHandler = (activePage) => {
  console.log('Inbox List');

  removeCardHandler();

  createCardHandler(activePage);
};

export default [todayHandler, upcomingHandler, overdueHandler, inboxHandler];
