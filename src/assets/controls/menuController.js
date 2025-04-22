// this code controls the menu items styles [and possibly the backend logic]
export class MenuController {
  constructor(menuList) {
    this.menuList = menuList;
    this.menu = [];
    this.initialize();
  }

  initialize() {
    const list = this.menuList.querySelectorAll('li');
    this.menu = list;
    this.styleControls();
  }

  // this instance controls the menu items styles
  styleControls() {
    this.menu.forEach((menuItem) => {
      menuItem.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.closest('li');
        const isActive = target.querySelector('a').dataset.isActive;

        if (isActive === 'false') {
          this.deactivateProjectItems();

          target.querySelector('a').dataset.isActive = 'true';
          target.querySelector('div').dataset.iconType = 'solid';

          this.activeHandler(target);
        }
      });
    });
  }

  // checking the menu if any itmes is active other than the current one
  activeHandler(currentMenu) {
    this.menu.forEach((menuItem) => {
      if (menuItem !== currentMenu) {
        menuItem.querySelector('a').dataset.isActive = 'false';
        menuItem.querySelector('div').dataset.iconType = 'line';
      }
    });
  }

  deactivateProjectItems() {
    Array.from(document.querySelectorAll('.project-cards')).forEach(
      (projectItems) => {
        projectItems.dataset.isActive = 'false';
      }
    );
  }
}
