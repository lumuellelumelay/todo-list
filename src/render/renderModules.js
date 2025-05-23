import projectListInstance from '../modules/projectManager.js';
import { CreateCard } from '../assets/listCardHandler/createCard.js';

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

// Create the render project list cards

// Create the remove render project list cards

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

export default [createCardHandler, removeCardHandler];
