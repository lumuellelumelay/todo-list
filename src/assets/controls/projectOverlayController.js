export const changeDialogState = () => {
  const addButton = document.querySelector('.add-button');
  const overlayWrapper = document.querySelector('.dialog-wrapper');
  const closeButton = overlayWrapper.querySelector('.close');

  addButton.addEventListener('click', () => {
    overlayWrapper.dataset.isActive = 'true';
  });

  overlayWrapper.addEventListener('click', (e) => {
    if (e.target === overlayWrapper) {
      overlayWrapper.dataset.isActive = 'false';
    }
  });

  closeButton.addEventListener('click', () => {
    overlayWrapper.dataset.isActive = 'false';
  });
};
