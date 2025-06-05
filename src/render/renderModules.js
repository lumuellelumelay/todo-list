import projectListInstance from '../modules/projectManager.js';
import { CreateCard } from '../assets/listCardHandler/createCard.js';
import { CreateProjectCard } from '../assets/projectCardHandler/createCardProject.js';

const renderCard = (data) => {
  data.forEach((item) => {
    const listCard = new CreateCard(
      item.project_id,
      item.id,
      item.title,
      item.description,
      item.status,
      item.day,
      item.color,
      item.project_title
    );

    listCard.render();
  });
};

// Creates a container for the project cards on mobile view
const createProjectContainerHandler = () => {
  const parentContainer = document.querySelector('.todo-list-card-container');

  const createProjectCardContainer = document.createElement('div');
  createProjectCardContainer.classList.add('projects-container');
  createProjectCardContainer.setAttribute('id', 'projects-container');

  parentContainer.appendChild(createProjectCardContainer);
};

// Updates the list item count for each project card on mobile view
const updateProjectItemCountMobile = () => {
  const parentContainer = document.querySelector('.todo-list-card-container');
  const projectContainer = parentContainer.querySelector('#projects-container');

  if (!projectContainer) return;

  const projectCards = Array.from(
    projectContainer.querySelectorAll('.project-cards')
  );
  const projectList = projectListInstance.getProjectList();

  projectCards.forEach((projectCards) => {
    const project = projectList.find(
      (project) => project.id === Number(projectCards.dataset.projectId)
    );

    projectCards.querySelector('.items').textContent = `${project.list.length}`;
  });
};

/**
 * Renders project cards for the 'projects' page when in mobile view.
 *
 * This function checks if the active page is 'projects' and if the
 * display is in mobile view (window width less than 511 pixels). If
 * both conditions are met, it creates a container for project cards
 * and renders each project card, excluding those with the title 'inbox'.
 * It also updates the item count for each project card.
 *
 * @param {string} activePage - The current active page.
 */
const createProjectCardsHandler = (activePage) => {
  if (activePage !== 'projects') {
    return;
  }

  const projectsList = projectListInstance.getProjectList();

  const mobileDisplay = window.innerWidth < 511;
  if (mobileDisplay) {
    createProjectContainerHandler();

    projectsList.forEach((project) => {
      if (project.title.toLowerCase() === 'inbox') return;

      const projectCard = new CreateProjectCard(
        project.id,
        project.title,
        project.color,
        project.list.length
      );

      projectCard.renderCard();
    });

    updateProjectItemCountMobile();
  }
};

/**
 * This function removes the project cards from the page when
 * the user is on mobile view and navigates to a different page.
 * The function first checks if the user is in mobile view and if
 * the project cards container exists. If the container exists, it
 * removes the container from the parent container.
 */
const removeProjectCardsHandler = () => {
  const mobileDisplay = window.innerWidth < 511;
  if (mobileDisplay) {
    const parentContainer = document.querySelector('.todo-list-card-container');
    const projectContainer = parentContainer.querySelector(
      '#projects-container'
    );

    if (!projectContainer) return;

    parentContainer.removeChild(projectContainer);
    return;
  }
};

/**
 * Filters the list of items based on the active page.
 *
 * If the active page is one of 'today', 'pending', or 'overdue',
 * it returns the items from the list that match the active page status.
 * If the active page is 'inbox', it returns the entire list of the project
 * if the project's title is 'inbox'. Otherwise, it returns an empty array.
 *
 * @param {Object} project - The project object containing project details and list.
 * @param {Array} list - An array of list items to be filtered.
 * @param {string} activePage - The active page status used as a filter criterion.
 * @returns {Array} - A filtered array of list items or the entire project list.
 */
const filterHandler = (project, list, activePage) => {
  const menu = new Set(['today', 'pending', 'overdue']);

  if (menu.has(activePage)) {
    return list.filter((item) => item.status === activePage);
  } else if (activePage === 'inbox') {
    return project.title.toLowerCase() === 'inbox' ? project.list : [];
  }

  return [];
};

/**
 * This function takes an active page parameter and renders all
 * matching list cards that matches the active page criteria.
 * It will filter the list cards based on the active page parameter
 * and then sort the list cards based on the created_at date.
 *
 * @param {string} activePage - The active page parameter.
 */
const createCardHandler = (activePage) => {
  const projectsList = projectListInstance.getProjectList();

  const allMatchingList = projectsList.flatMap((project) => {
    const matchingList = filterHandler(project, project.list, activePage);

    if (!matchingList.length) return [];

    if (matchingList.length !== 0) {
      return matchingList.map((list) => ({
        ...list,
        project_id: project.id,
        project_title: project.title,
        color: project.color,
      }));
    }
  });

  const sortedList = allMatchingList.sort(
    (a, b) => a.created_at - b.created_at
  );

  renderCard(sortedList);
};

/**
 * This function removes all rendered list cards in the
 * .todo-list-card-container class. It is used to clear the
 * rendered list cards when the user navigates to a different
 * page.
 */
const removeCardHandler = () => {
  const parent = document.querySelector('.bottom-section-content');
  const listCardContainer = parent.querySelector('.todo-list-card-container');

  if (
    Array.from(listCardContainer.querySelectorAll('.list-card')).length !== 0
  ) {
    listCardContainer.querySelectorAll('.list-card').forEach((item) => {
      item.remove();
    });
  }
};

export default [
  createProjectCardsHandler,
  removeProjectCardsHandler,
  createCardHandler,
  removeCardHandler,
];
