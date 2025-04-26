// This file is for creating a list card and render it to the list container
// It handles if the following data is null or not:
// 1. description
// 2. due date
// 3. project name
export class CreateCard {
  constructor(
    projectId,
    listId,
    title,
    description,
    status,
    day,
    color,
    projectName
  ) {
    this.projectId = projectId;
    this.idList = listId;
    this.title = title;
    this.description = description;
    this.status = status;
    this.day = day;
    this.color = color;
    this.projectName = projectName;
    this.card = {};
    this.cardContainer = this.initialize();
  }

  initialize() {
    return document.querySelector('.todo-list-card-container');
  }

  defaultValuesManager() {
    const hasDate = this.day !== null;
    const hasProject = this.projectName !== null;
    const hasDescription = this.description !== null;

    return [
      {
        listCard: ['list-card'],
        listContent: ['list-content'],
        listDescription: ['list-description'],
        listLeftSection: ['list-left-section'],
        listExtraDescription: ['list-extra-description'],
        listMenuSection: ['list-menu-section'],
        listMenuWrapper: ['list-menu-wrapper'],
        edit: ['edit'],
        delete: ['delete'],
        ...(hasDate && { date: ['date'] }),
        ...(hasProject && { projectList: ['project-list'] }),
      },
      {
        title: ['title'],
        ...(hasDescription && { description: ['description'] }),
        ...(hasDate && { dueDate: ['due-date'] }),
        ...(hasProject && { project: ['project'] }),
      },
      {
        svg: hasDate
          ? ['svgDate', 'svgEdit', 'svgDelete']
          : ['svgEdit', 'svgDelete'],
        path: hasDate
          ? ['svgDatePath', 'svgEditPathOne', 'svgEditPathTwo', 'svgDeletePath']
          : ['svgEditPathOne', 'svgEditPathTwo', 'svgDeletePath'],
        rect: ['svgDeleteRectOne', 'svgDeleteRectTwo'],
        g: ['svgDeleteGroup'],
      },
    ];
  }

  createCard() {
    const [cardDivs, paragraphClass, svgElements] = this.defaultValuesManager();

    this.createCardHelper(cardDivs, 'div');
    this.createCardHelper(paragraphClass, 'p');

    Object.entries(svgElements).forEach(([elementType, elementNames]) => {
      elementNames.forEach((name) => {
        this.card[name] = document.createElementNS(
          'http://www.w3.org/2000/svg',
          elementType
        );
      });
    });

    this.card.checkbox = document.createElement('input');
  }

  createCardHelper(cardElements, element) {
    Object.entries(cardElements).forEach(([cardName, className]) => {
      this.card[cardName] = document.createElement(element);
      this.card[cardName].classList.add(className[0]);
    });
  }

  setAttributes() {
    console.log(this.card);
    this.listCardAttributes();

    this.checkboxAttribute();

    this.svgAttributes();

    this.svgPathAttributes();

    this.svgRectAttributes();

    this.dateAttributes();

    this.projectAttributes();

    this.menuAttributes();

    // for svgGroup in case: id="_01_align_center" data-name="01r"
  }

  setAttributesHelper(tagName, attributes) {
    if (Array.isArray(tagName)) {
      tagName.forEach((tag) => {
        Object.entries(attributes).forEach(([attribute, name]) => {
          this.card[tag].setAttribute(attribute, name);
        });
      });
      return;
    }

    Object.entries(attributes).forEach(([attribute, name]) => {
      this.card[tagName].setAttribute(attribute, name);
    });
  }

  listCardAttributes() {
    const listCard = {
      'data-is-checked': 'false',
      'data-project-id': `${this.projectId}`,
      'data-id-list': `${this.idList}`,
      draggable: 'true',
    };

    this.setAttributesHelper('listCard', listCard);
  }

  checkboxAttribute() {
    const checkbox = {
      type: 'checkbox',
      class: 'checkbox',
      'data-id-list': `${this.idList}`,
      'data-is-checked': 'false',
    };
    this.setAttributesHelper('checkbox', checkbox);
  }

  svgAttributes() {
    const hasDate = this.day !== null;
    const attributes = {
      viewBox: '0 0 24 24',
      width: '512',
      height: '512',
    };

    const svgElements = hasDate
      ? ['svgDate', 'svgEdit', 'svgDelete']
      : ['svgEdit', 'svgDelete'];
    // const svgElements = ['svgDate', 'svgEdit', 'svgDelete'];

    this.setAttributesHelper(svgElements, attributes);
  }

  svgPathAttributes() {
    if (this.day !== null) {
      this.card.svgDatePath.setAttribute(
        'd',
        'M19,2H18V1a1,1,0,0,0-2,0V2H8V1A1,1,0,0,0,6,1V2H5A5.006,5.006,0,0,0,0,7V19a5.006,5.006,0,0,0,5,5H19a5.006,5.006,0,0,0,5-5V7A5.006,5.006,0,0,0,19,2ZM2,7A3,3,0,0,1,5,4H19a3,3,0,0,1,3,3V8H2ZM19,22H5a3,3,0,0,1-3-3V10H22v9A3,3,0,0,1,19,22Z'
      );
    }
    this.card.svgEditPathOne.setAttribute(
      'd',
      'M18.656.93,6.464,13.122A4.966,4.966,0,0,0,5,16.657V18a1,1,0,0,0,1,1H7.343a4.966,4.966,0,0,0,3.535-1.464L23.07,5.344a3.125,3.125,0,0,0,0-4.414A3.194,3.194,0,0,0,18.656.93Zm3,3L9.464,16.122A3.02,3.02,0,0,1,7.343,17H7v-.343a3.02,3.02,0,0,1,.878-2.121L20.07,2.344a1.148,1.148,0,0,1,1.586,0A1.123,1.123,0,0,1,21.656,3.93Z'
    );
    this.card.svgEditPathTwo.setAttribute(
      'd',
      'M23,8.979a1,1,0,0,0-1,1V15H18a3,3,0,0,0-3,3v4H5a3,3,0,0,1-3-3V5A3,3,0,0,1,5,2h9.042a1,1,0,0,0,0-2H5A5.006,5.006,0,0,0,0,5V19a5.006,5.006,0,0,0,5,5H16.343a4.968,4.968,0,0,0,3.536-1.464l2.656-2.658A4.968,4.968,0,0,0,24,16.343V9.979A1,1,0,0,0,23,8.979ZM18.465,21.122a2.975,2.975,0,0,1-1.465.8V18a1,1,0,0,1,1-1h3.925a3.016,3.016,0,0,1-.8,1.464Z'
    );
    this.card.svgDeletePath.setAttribute(
      'd',
      'M22,4H17V2a2,2,0,0,0-2-2H9A2,2,0,0,0,7,2V4H2V6H4V21a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V6h2ZM9,2h6V4H9Zm9,19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V6H18Z'
    );
  }

  svgRectAttributes() {
    this.card.svgDeleteRectOne.setAttribute('x', '9');
    this.card.svgDeleteRectOne.setAttribute('y', '10');
    this.card.svgDeleteRectOne.setAttribute('width', '2');
    this.card.svgDeleteRectOne.setAttribute('height', '8');

    this.card.svgDeleteRectTwo.setAttribute('x', '13');
    this.card.svgDeleteRectTwo.setAttribute('y', '10');
    this.card.svgDeleteRectTwo.setAttribute('width', '2');
    this.card.svgDeleteRectTwo.setAttribute('height', '8');
  }

  dateAttributes() {
    // for date and due date
    if (this.day !== null) {
      this.card.date.setAttribute('data-date', `${this.status}`);
      this.card.dueDate.setAttribute('data-id-list', `${this.idList}`);
    }
  }

  projectAttributes() {
    // for project
    if (this.projectName !== null) {
      this.card.project.setAttribute('data-color', `${this.color}`);
      this.card.project.setAttribute('data-project-id', `${this.projectId}`);
    }
  }

  menuAttributes() {
    // for edit id
    this.card.edit.setAttribute('data-id-list', `${this.idList}`);
    this.card.edit.setAttribute('data-menu', 'edit');

    // for delete id
    this.card.delete.setAttribute('data-id-list', `${this.idList}`);
    this.card.delete.setAttribute('data-menu', 'delete');
  }

  setTextContent() {
    this.card.title.textContent = this.title;

    if (this.description !== null) {
      this.textDescriptionHelper();
    }

    if (this.day !== null) {
      this.card.dueDate.textContent = this.day;
    }

    if (this.projectName !== null) {
      this.card.project.textContent = `${this.projectName}`;
    }
  }

  textDescriptionHelper() {
    // for elipsis effect
    if (this.description.length > 60) {
      const descriptionLen = this.description.length / 2 + 5;
      this.card.description.textContent = `${this.description.slice(
        0,
        descriptionLen
      )}...`;
    } else {
      this.card.description.textContent = this.description;
    }
  }

  assembleCard() {
    this.cardContainer.append(this.card.listCard);

    this.card.listCard.append(this.card.checkbox, this.card.listContent);

    this.card.listContent.append(
      this.card.listDescription,
      this.card.listMenuSection
    );

    this.card.listDescription.append(
      this.card.listLeftSection,
      this.card.listExtraDescription
    );

    this.card.listLeftSection.append(this.card.title);
    this.addDescriptionIfNotNull();

    this.addDateIfNotNull();
    this.addProjectIfNotNull();

    this.card.listMenuSection.append(this.card.listMenuWrapper);

    this.card.listMenuWrapper.append(this.card.edit, this.card.delete);

    this.card.edit.append(this.card.svgEdit);
    this.card.svgEdit.append(
      this.card.svgEditPathOne,
      this.card.svgEditPathTwo
    );

    this.card.delete.append(this.card.svgDelete);
    this.card.svgDelete.append(this.card.svgDeleteGroup);

    this.card.svgDeleteGroup.append(
      this.card.svgDeletePath,
      this.card.svgDeleteRectOne,
      this.card.svgDeleteRectTwo
    );
  }

  addDescriptionIfNotNull() {
    if (this.description !== null) {
      this.card.listLeftSection.append(this.card.description);
    }
  }

  addDateIfNotNull() {
    if (this.day !== null) {
      this.card.listExtraDescription.append(this.card.date);

      this.card.date.append(this.card.svgDate, this.card.dueDate);
      this.card.svgDate.append(this.card.svgDatePath);
    }
  }

  addProjectIfNotNull() {
    if (this.projectName !== null) {
      this.card.listExtraDescription.append(this.card.projectList);

      this.card.projectList.append(this.card.project);
    }
  }

  render() {
    this.createCard();

    this.setAttributes();

    this.setTextContent();

    this.assembleCard();
  }
}
