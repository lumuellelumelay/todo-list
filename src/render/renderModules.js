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

const filterHandler = (project, list, activePage) => {
  const menu = new Set(['today', 'pending', 'overdue']);

  if (menu.has(activePage)) {
    return list.filter((item) => item.status === activePage);
  } else if (activePage === 'inbox') {
    return project.title.toLowerCase() === 'inbox' ? project.list : [];
  }

  return [];
};

const createProjectContainerHandler = () => {
  const parentContainer = document.querySelector('.todo-list-card-container');

  const createProjectCardContainer = document.createElement('div');
  createProjectCardContainer.classList.add('projects-container');
  createProjectCardContainer.setAttribute('id', 'projects-container');

  parentContainer.appendChild(createProjectCardContainer);

  return parentContainer;
};

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

// Create the render project list cards
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

      console.log(project);
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

// Create the remove render project list cards
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
