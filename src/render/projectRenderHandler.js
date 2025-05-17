import { CreateCard } from '../assets/listCardHandler/createCard.js';

const renderProjectList = (project) => {
  removeCardHandler();

  // checking if project list is empty, it will not render anything
  if (project.list.length === 0) {
    return;
  }

  renderCardHandler(project);
};

const renderCardHandler = (project) => {
  project.list.forEach((item) => {
    const listCard = new CreateCard(
      project.id,
      item.id,
      item.title,
      item.description,
      item.status,
      item.day,
      project.color,
      project.title
    );

    listCard.render();
  });
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

export default renderProjectList;
