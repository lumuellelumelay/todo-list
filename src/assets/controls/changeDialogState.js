export const changeDialogState = () => {
  const overlayWrapper = Array.from(
    document.querySelectorAll('.dialog-wrapper')
  );
  projectDialog(overlayWrapper);
  addTaskDialog(overlayWrapper);
};

const projectDialog = (overlayWrapper) => {
  const wrapper = overlayWrapper.filter(
    (item) => item.dataset.nameDialog === 'my-project-dialog'
  );

  const addButton = document.querySelector('.add-button');
  const addButtonMobile = document.querySelector('.mobile-menu .add-button');
  const closeButton = wrapper[0].querySelector('.close');

  addButtonMobile.addEventListener('click', () => {
    wrapper[0].dataset.isActive = 'true';
    document.body.dataset.dialogActive = 'true';
  });

  addButton.addEventListener('click', () => {
    wrapper[0].dataset.isActive = 'true';
    document.body.dataset.dialogActive = 'true';
  });

  wrapper[0].addEventListener('click', (e) => {
    if (e.target === wrapper[0]) {
      wrapper[0].dataset.isActive = 'false';
      document.body.dataset.dialogActive = 'false';
    }
  });

  closeButton.addEventListener('click', () => {
    wrapper[0].dataset.isActive = 'false';
    document.body.dataset.dialogActive = 'false';
  });
};

const addTaskDialog = (overlayWrapper) => {
  const wrapper = overlayWrapper.filter(
    (item) => item.dataset.nameDialog === 'my-add-task-dialog'
  );

  const addButton = document.querySelector('.add-task');
  const cancelbutton = wrapper[0].querySelector('.cancel');

  addButton.addEventListener('click', () => {
    wrapper[0].dataset.isActive = 'true';
    document.body.dataset.dialogActive = 'true';
  });

  wrapper[0].addEventListener('click', (e) => {
    if (e.target === wrapper[0]) {
      wrapper[0].dataset.isActive = 'false';
      document.body.dataset.dialogActive = 'false';
    }
  });

  cancelbutton.addEventListener('click', () => {
    wrapper[0].dataset.isActive = 'false';
    document.body.dataset.dialogActive = 'false';
  });
};
