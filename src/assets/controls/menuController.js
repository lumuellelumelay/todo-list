// this code controls the menu items styles [and possibly the backend logic]
import { renderPageHandler } from '../../modules/renderPageHandler.js';

export class MenuController {
  constructor() {
    this.menuList = document.querySelector('.menu-list');
    // this.activeMenu = null;
    this.menu = [];
    this.initialize();
  }

  initialize() {
    const displayWidth = window.innerWidth;
    const activeSelector =
      displayWidth < 511
        ? '.mobile-menu .menu-list'
        : '.desktop-menu .menu-list';

    this.menuList = document.querySelector(activeSelector);

    this.displayHandler();

    this.getListMenu();
  }

  displayHandler() {
    const checkProjectPageStatus = () => {
      if (this.menu.length === 4) {
        const mobileMenuParent = document.querySelector(
          '.mobile-menu .menu-list'
        );
        const mobileMenuList = Array.from(
          mobileMenuParent.querySelectorAll('li')
        );
        const projectMobileMenu = mobileMenuList[4].querySelector('a');

        if (projectMobileMenu.dataset.isActive === 'true') {
          this.menu[0].querySelector('a').dataset.isActive = 'true';
          this.menu[0].querySelector('div').dataset.iconType = 'solid';

          mobileMenuList[4].querySelector('a').dataset.isActive = 'false';
          mobileMenuList[4].querySelector('div').dataset.iconType = 'line';

          mobileMenuList[0].querySelector('a').dataset.isActive = 'true';
          mobileMenuList[0].querySelector('div').dataset.iconType = 'solid';

          this.renderHelper(this.menu[0].querySelector('a').dataset.name);
        }
      }
    };

    const handlerResize = () => {
      const displayWidth = window.innerWidth;

      if (displayWidth < 511) {
        this.menuList = document.querySelector('.mobile-menu .menu-list');
        this.getListMenu();
      } else {
        this.menuList = document.querySelector('.desktop-menu .menu-list');
        checkProjectPageStatus();
        this.getListMenu();
      }
    };

    window.addEventListener('resize', handlerResize);
  }

  getListMenu() {
    const list = this.menuList.querySelectorAll('li');
    this.menu = list;

    this.menuControls();
  }

  // this will render the menu pages and its contents
  // NOTE: testing
  renderHelper(activeMenu) {
    if (!activeMenu) {
      console.error('no active menu');
      return;
    }

    renderPageHandler(activeMenu);
  }

  // this instance controls the menu items styles
  menuControls() {
    this.menu.forEach((menuItem) => {
      menuItem.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.closest('li');
        const isActive = target.querySelector('a').dataset.isActive;

        if (isActive === 'false') {
          this.deactivateProjectItems();

          target.querySelector('a').dataset.isActive = 'true';
          target.querySelector('div').dataset.iconType = 'solid';
          this.menuStatusChecker(target);

          this.activeHandler(target);

          this.renderHelper(target.querySelector('a').dataset.name);
        }
      });
    });
  }

  menuStatusChecker(currentMenu) {
    const websiteWidth = window.innerWidth;
    const currentMenuName = currentMenu.querySelector('a').dataset.name;
    console.log(currentMenu);

    if (websiteWidth < 511) {
      const menuListDesktopParent = document.querySelector(
        '.desktop-menu .menu-list'
      );
      const menuListDesktop = Array.from(
        menuListDesktopParent.querySelectorAll('li')
      );

      menuListDesktop.forEach((list) => {
        const listName = list.querySelector('a').dataset.name;
        if (listName === currentMenuName) {
          list.querySelector('a').dataset.isActive = 'true';
          list.querySelector('div').dataset.iconType = 'solid';
        }

        if (listName !== currentMenuName) {
          list.querySelector('a').dataset.isActive = 'false';
          list.querySelector('div').dataset.iconType = 'line';
        }
      });

      return;
    } else {
      const menuListMobileParent = document.querySelector(
        '.mobile-menu .menu-list'
      );
      const menuListMobile = Array.from(
        menuListMobileParent.querySelectorAll('li')
      );

      menuListMobile.forEach((list) => {
        const listName = list.querySelector('a').dataset.name;
        if (listName === currentMenuName) {
          list.querySelector('a').dataset.isActive = 'true';
          list.querySelector('div').dataset.iconType = 'solid';
        }

        if (listName !== currentMenuName) {
          list.querySelector('a').dataset.isActive = 'false';
          list.querySelector('div').dataset.iconType = 'line';
        }
      });

      return;
    }
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
