export class CreateCard {
  constructor(projectId, projectName, colorChoice, projectList) {
    this.projectId = projectId;
    this.projectName = projectName;
    this.colorChoice = colorChoice;
    this.projectList = projectList;
    this.projectCard = {};
    this.wrapper = this.initialize();
  }

  initialize() {
    return document.querySelector('#projects-container');
  }

  createCard() {
    this.projectCard.projectCards = document.createElement('div');

    this.projectCard.projectCardsIcon = document.createElement('div');
    this.projectCard.icon = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'svg'
    );

    this.projectCard.path = document.createElementNS(
      'http://www.w3.org/2000/svg',
      'path'
    );

    this.projectCard.projectDescription = document.createElement('div');
    this.projectCard.projectTitle = document.createElement('p');
    this.projectCard.items = document.createElement('p');
  }

  setAttribute() {
    this.projectCard.projectCards.setAttribute('class', 'project-cards');
    this.projectCard.projectCards.setAttribute(
      'data-project-id',
      `${this.projectId}`
    );
    this.projectCard.projectCards.setAttribute('data-is-active', 'false');

    this.projectCard.projectCardsIcon.setAttribute(
      'class',
      'project-cards-icon'
    );
    this.projectCard.projectCardsIcon.setAttribute(
      'data-color',
      `${this.colorChoice}`
    );

    this.projectCard.icon.setAttribute('height', '48px');
    this.projectCard.icon.setAttribute('viewBox', '0 -960 960 960');
    this.projectCard.icon.setAttribute('width', '48px');

    this.projectCard.path.setAttribute(
      'd',
      'm239-160 40-159H120l15-60h159l51-202H186l15-60h159l39-159h59l-39 159h203l39-159h59l-39 159h159l-15 60H666l-51 202h159l-15 60H600l-40 159h-59l40-159H338l-40 159h-59Zm114-219h203l51-202H404l-51 202Z'
    );

    this.projectCard.projectDescription.setAttribute(
      'class',
      'project-description'
    );
    this.projectCard.projectTitle.setAttribute('class', 'project-title');
    this.projectCard.projectTitle.setAttribute(
      'data-name',
      `${this.projectName}`
    );

    this.projectCard.items.setAttribute('class', 'items');
    this.projectCard.items.setAttribute('data-list-id', `${this.projectId}`);
  }

  showValues() {
    this.projectCard.projectTitle.textContent = this.textProjectHelper();

    this.checkingProjectListLength();
  }

  textProjectHelper() {
    if (this.projectName.length > 15) {
      const titleLen = 15;
      return `${this.projectName.slice(0, titleLen)}...`;
    } else {
      return `${this.projectName}`;
    }
  }

  // NOTE: this is where the project list length will be displayed
  checkingProjectListLength() {
    if (this.projectList.length > 0) {
      this.projectCard.items.textContent = `${this.projectList.length}`;
    } else {
      this.projectCard.items.textContent = `0`;
    }
  }

  assembleCard() {
    this.wrapper.append(this.projectCard.projectCards);

    this.projectCard.projectCards.append(
      this.projectCard.projectCardsIcon,
      this.projectCard.projectDescription
    );

    this.projectCard.projectCardsIcon.append(this.projectCard.icon);

    this.projectCard.icon.appendChild(this.projectCard.path);

    this.projectCard.projectDescription.append(
      this.projectCard.projectTitle,
      this.projectCard.items
    );
  }

  renderCard() {
    this.createCard();
    this.setAttribute();
    this.showValues();
    this.assembleCard();
  }
}
