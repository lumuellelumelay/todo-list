// this code controls the menu items styles [and possibly the backend logic]
import { renderPageHandler } from '../../modules/renderPageHandler.js';
import projectListRender from '../../render/projectListRenderHandler.js';

export class MenuController {
  constructor() {
    this.menuList = document.querySelector('.menu-list');
    // this.activeMenu = null;
    this.isMobileView = window.innerWidth < 511;
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
    const activeInboxChecker = (mobileMenuList) => {
      const activeInboxMobile = mobileMenuList[0].querySelector('a');

      if (activeInboxMobile.dataset.isActive === 'true') {
        this.menu[0].querySelector('a').dataset.isActive = 'true';
        this.menu[0].querySelector('div').dataset.iconType = 'solid';
      }
    };

    const activeInboxHandler = (mobileMenuList) => {
      this.menu[0].querySelector('a').dataset.isActive = 'true';
      this.menu[0].querySelector('div').dataset.iconType = 'solid';

      mobileMenuList[4].querySelector('a').dataset.isActive = 'false';
      mobileMenuList[4].querySelector('div').dataset.iconType = 'line';

      mobileMenuList[0].querySelector('a').dataset.isActive = 'true';
      mobileMenuList[0].querySelector('div').dataset.iconType = 'solid';
    };

    // NOTE: mobile to desktop testing
    const checkProjectPageStatus = () => {
      const mobileMenuParent = document.querySelector(
        '.mobile-menu .menu-list'
      );
      const mobileMenuList = Array.from(
        mobileMenuParent.querySelectorAll('li')
      );

      if (this.menu.length === 4) {
        console.log('CheckProject Here');
        console.log(this.menu);

        activeInboxChecker(mobileMenuList);

        const projectMobileMenu = mobileMenuList[4].querySelector('a');
        const activeProject = projectListRender.getActiveElement();

        if (projectMobileMenu.dataset.isActive === 'true' && !activeProject) {
          activeInboxHandler(mobileMenuList);

          this.renderHelper(this.menu[0].querySelector('a').dataset.name);
        }
      } else {
        console.log('Hello!!');
        console.log(mobileMenuList);

        // get the active project element on desktop
        const parentContainer = document.querySelector('.projects-container');

        const activeProject = Array.from(
          parentContainer.querySelectorAll('.project-cards')
        ).find((item) => item.dataset.isActive === 'true');

        if (activeProject) {
          activeProject.dataset.isActive = 'false';

          activeInboxHandler(mobileMenuList);

          this.renderHelper(mobileMenuList[0].querySelector('a').dataset.name);
        }
      }
    };

    const removeProjectCardsHandler = () => {
      const parentContainer = document.querySelector(
        '.todo-list-card-container'
      );

      if (!parentContainer.querySelector('#projects-container')) return;
      const projectContainer = parentContainer.querySelector(
        '#projects-container'
      );
      parentContainer.removeChild(projectContainer);
      return;
    };

    const handlerResize = () => {
      const displayWidth = window.innerWidth;
      const currentIsMobile = displayWidth < 511;

      if (this.isMobileView !== currentIsMobile) {
        this.isMobileView = currentIsMobile;
        if (currentIsMobile) {
          this.menuList = document.querySelector('.mobile-menu .menu-list');
          this.getListMenu();
          checkProjectPageStatus();
        } else {
          this.menuList = document.querySelector('.desktop-menu .menu-list');
          this.getListMenu();
          checkProjectPageStatus();
          // activeInboxChecker();
          removeProjectCardsHandler();
        }
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

  // this instance deactivates all project cards
  deactivateProjectItems() {
    Array.from(document.querySelectorAll('.project-cards')).forEach(
      (projectItems) => {
        projectItems.dataset.isActive = 'false';
      }
    );
  }
}
