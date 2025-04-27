const desktopMenu = document.querySelector('.desktop-menu');
const desktopListWrapper = document.querySelector('.todo-list-wrapper');

export const toggleMenu = () => {
  const toggleMenuButton = document.querySelector(
    '.sidebar-menu-toggle-container'
  );

  toggleMenuButton.addEventListener('click', () => {
    if (desktopMenu.dataset.isActive === 'true') {
      desktopMenu.dataset.isActive = 'false';
      toggleMenuButton.dataset.toggleSidebar = 'close';
      desktopListWrapper.dataset.isMenuActive = 'false';
    } else {
      desktopMenu.dataset.isActive = 'true';
      toggleMenuButton.dataset.toggleSidebar = 'open';
      desktopListWrapper.dataset.isMenuActive = 'true';
    }
  });
};
