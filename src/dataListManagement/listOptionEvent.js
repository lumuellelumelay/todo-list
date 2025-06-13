import projectListInstance from '../modules/projectManager.js';
import dateHandler from '../modules/dateManager.js';

class ListOptionEvents {
  constructor() {
    this.wrapper = document.querySelector('.todo-list-card-container');
    this.deleteDialog = null;
    this.editDialog = null;

    this.selectedCardList = null;
    this.activeProjectId = null;
    this.activeListId = null;
    this.initializeDialogs();
  }

  initializeDialogs() {
    const dialogs = Array.from(document.querySelectorAll('.dialog-wrapper'));

    dialogs.forEach((dialog) => {
      if (dialog.dataset.nameDialog === 'delete-list-dialog') {
        this.deleteDialog = dialog;
      } else if (dialog.dataset.nameDialog === 'edit-list-dialog') {
        this.editDialog = dialog;
      }
    });
  }

  // this method will be called onces exported
  addDeleteEvent() {
    this.wrapper.addEventListener('click', this.handleListCardClick.bind(this));

    this.setupDialogs();
  }

  setupDialogs() {
    this.deleteDialog.addEventListener('click', (e) => {
      this.handleDeleteDialogClick(e);
    });

    this.editDialog.addEventListener('click', (e) => {
      this.handleEditDialogClick(e);
    });
  }

  handleDeleteDialogClick(e) {
    if (
      e.target.matches('.dialog-wrapper[data-name-dialog="delete-list-dialog"]')
    ) {
      e.stopPropagation();
      this.closeDeleteDialog();
      return;
    }

    if (e.target.matches('.cancel')) {
      e.stopPropagation();
      this.closeDeleteDialog();
      return;
    }

    if (e.target.matches('.submit')) {
      e.stopPropagation();
      this.handleDeleteSumbit();

      this.closeDeleteDialog();
      return;
    }
  }

  handleEditDialogClick(e) {
    if (
      e.target.matches('.dialog-wrapper[data-name-dialog="edit-list-dialog"]')
    ) {
      e.stopPropagation();
      this.closeEditDialog();
      return;
    }

    if (e.target.matches('.cancel')) {
      e.stopPropagation();
      this.closeEditDialog();
      return;
    }

    if (e.target.matches('.submit')) {
      e.preventDefault();
      e.stopPropagation();
      this.handleEditSubmit(e);

      this.closeEditDialog();
      return;
    }
  }

  handleEditSubmit(e) {
    e.preventDefault();
    const getActiveProject = projectListInstance.getProject(
      this.activeProjectId
    );

    if (!getActiveProject) return;

    const getActiveList = getActiveProject.list.find(
      (item) => item.id === this.activeListId
    );

    if (!getActiveList) return;

    const editFormData = new FormData(
      this.editDialog.querySelector('.edit-dialog form')
    );

    let formValues = Object.fromEntries(editFormData.entries());
    formValues = this.checkWhiteSpaces(formValues);
    formValues = this.dueDateHandler(formValues);

    if (!this.editObjectCheck(getActiveProject, getActiveList, formValues)) {
      const getStorageProjects = projectListInstance.getStoredProjects();

      getActiveList.title = formValues.title;
      getActiveList.description = formValues.description;
      this.handleDates(getActiveList, formValues['due-date']);

      this.updateCardList(getActiveList);

      const getListUpdate = getStorageProjects[
        getActiveProject.id
      ].list.findIndex((item) => item.id === getActiveList.id);

      getActiveProject.list.splice(getListUpdate, 1, getActiveList);

      getStorageProjects[getActiveProject.id].list = getActiveProject.list;
      localStorage.setItem('projects', JSON.stringify(getStorageProjects));
    }

    return;
  }

  updateCardList(getActiveList) {
    const parentContainer = document.querySelector('.todo-list-card-container');
    const cardLists = Array.from(
      parentContainer.querySelectorAll('.list-card')
    );

    const getActiveCardList = cardLists.find(
      (item) => item.dataset.idList === String(this.activeListId)
    );

    const title = getActiveCardList.querySelector('.list-content .title');
    title.textContent = getActiveList.title;

    const description = getActiveCardList.querySelector(
      '.list-content .description'
    );
    description.textContent = getActiveList.description;

    const date = getActiveCardList.querySelector(
      '.list-extra-description .date'
    );
    date.dataset.date = getActiveList.status;

    const dateText = date.querySelector('.due-date');
    dateText.textContent = getActiveList.day;
  }

  handleDates(getActiveList, formValuesdate) {
    if (!formValuesdate) {
      getActiveList.due_date = formValuesdate;
      return;
    }

    getActiveList.day = dateHandler.dateDay(formValuesdate);
    getActiveList.due_date = formValuesdate;
    getActiveList.status = dateHandler.listStatus(formValuesdate);
  }

  editObjectCheck(getActiveProject, getActiveList, formValues) {
    if (getActiveProject.id !== Number(formValues.project)) {
      this.moveListToNewProject(getActiveProject, getActiveList, formValues);
      this.selectedCardList.remove();
      return true;
    }

    const keys = Object.keys(formValues).filter((key) => key !== 'project');

    for (const key of keys) {
      if (getActiveList[key] !== formValues[key]) {
        return false;
      }
    }
  }

  moveListToNewProject(getActiveProject, getActiveList, formValues) {
    const getStorageProjects = projectListInstance.getStoredProjects();

    const newStoredProject = projectListInstance.getProject(
      Number(formValues.project)
    );

    getActiveList.title = formValues.title;
    getActiveList.description = formValues.description;
    this.handleDates(getActiveList, formValues['due-date']);

    const index = getActiveProject.list.findIndex(
      (item) => item.id === getActiveList.id
    );
    getActiveProject.list.splice(index, 1);

    newStoredProject.list.push(getActiveList);

    getStorageProjects[getActiveProject.id].list = getActiveProject.list;
    getStorageProjects[newStoredProject.id].list = newStoredProject.list;

    localStorage.setItem('projects', JSON.stringify(getStorageProjects));

    const getIdChangeNumberList =
      formValues.project === '0' ? getActiveProject.id : newStoredProject.id;
    this.updateProjectItemCount(getIdChangeNumberList);
  }

  updateProjectItemCount(selectedId) {
    const displayWidth = window.innerWidth;
    if (displayWidth < 511) {
      return;
    }

    const parent = document.querySelector('#projects-container');
    const projectCards = Array.from(parent.querySelectorAll('.project-cards'));

    const projectCard = projectCards.find((items) => {
      return items.dataset.projectId === String(selectedId);
    });

    projectCard.querySelector('.items').textContent = `${
      projectListInstance.getProject(selectedId).list.length
    }`;
  }

  checkWhiteSpaces(formValues) {
    const title = formValues.title;
    formValues.title = title.trim();
    return formValues;
  }

  dueDateHandler(formValues) {
    if (!formValues['due-date']) {
      formValues['due-date'] = null;
    }
    return formValues;
  }

  handleDeleteSumbit() {
    let storedProjects = projectListInstance.getStoredProjects();

    const index = storedProjects[this.activeProjectId].list.findIndex(
      (item) => Number(item.id) === this.activeListId
    );

    if (index !== -1) {
      storedProjects[this.activeProjectId].list.splice(index, 1);
      console.log(storedProjects);

      localStorage.setItem('projects', JSON.stringify(storedProjects));
      this.selectedCardList.remove();
      this.updateProjectItemCount(this.activeProjectId);
    }

    return;
  }

  handleListCardClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const deleteButton = e.target.closest('.list-menu-wrapper .delete');
    const editButton = e.target.closest('.list-menu-wrapper .edit');

    if (!deleteButton && !editButton) return;

    if (deleteButton) {
      this.selectedCardList = e.target.closest('.list-card');

      const projectId = this.selectedCardList.dataset.projectId;
      const listId = deleteButton.dataset.idList;

      this.activeProjectId = +projectId;
      this.activeListId = +listId;

      this.openDeleteDialog();
    }

    if (editButton) {
      this.selectedCardList = e.target.closest('.list-card');

      const projectId = this.selectedCardList.dataset.projectId;
      const listId = editButton.dataset.idList;

      this.activeProjectId = +projectId;
      this.activeListId = +listId;
      this.openEditDialog();
    }
  };

  openDeleteDialog() {
    const deleteDialog = document.querySelector(
      '.dialog-wrapper[data-name-dialog="delete-list-dialog"]'
    );

    deleteDialog.dataset.isActive = 'true';
    document.body.dataset.dialogActive = 'true';
  }

  closeDeleteDialog() {
    const deleteDialog = document.querySelector(
      '.dialog-wrapper[data-name-dialog="delete-list-dialog"]'
    );

    deleteDialog.dataset.isActive = 'false';
    document.body.dataset.dialogActive = 'false';
  }

  openEditDialog() {
    const editDialog = document.querySelector(
      '.dialog-wrapper[data-name-dialog="edit-list-dialog"]'
    );

    const getActiveProject = projectListInstance.getProject(
      this.activeProjectId
    );
    const getActiveList = getActiveProject.list.find(
      (item) => item.id === this.activeListId
    );

    const titleInput = editDialog.querySelector('#title');
    const descriptionInput = editDialog.querySelector('#description');
    const dateInput = editDialog.querySelector('#due-date');
    const projectListOption = editDialog.querySelector('#projectList');

    if (titleInput) {
      titleInput.value = getActiveList.title;
      descriptionInput.value = getActiveList.description;
      dateInput.value = getActiveList.due_date;
      projectListOption.value = String(getActiveProject.id);
    }

    editDialog.dataset.isActive = 'true';
    document.body.dataset.dialogActive = 'true';
  }

  closeEditDialog() {
    const editDialog = document.querySelector(
      '.dialog-wrapper[data-name-dialog="edit-list-dialog"]'
    );

    editDialog.dataset.isActive = 'false';
    document.body.dataset.dialogActive = 'false';
  }
}

const listOptionEvents = new ListOptionEvents();

export default listOptionEvents;
