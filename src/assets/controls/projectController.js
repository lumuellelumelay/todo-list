export class ProjectController {
  constructor(projectContainer) {
    this.projectContainer = projectContainer;
    this.initialize();
  }

  initialize() {
    this.styleControls();
  }

  styleControls() {
    this.projectContainer.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // NOTE: checking if it effects other events
      const target = e.target.closest('.project-cards');

      if (target) {
        this.deactivateMenuItems();

        target.dataset.isActive = 'true';
        this.activeHandler(target);
      }
    });
  }

  activeHandler(currentTarget) {
    Array.from(document.querySelectorAll('.project-cards')).forEach(
      (projectItems) => {
        if (projectItems !== currentTarget) {
          projectItems.dataset.isActive = 'false';
        }
      }
    );
  }

  // this instance deactivate styles on the menu items
  deactivateMenuItems() {
    Array.from(document.querySelectorAll('.menu-list li')).forEach(
      (menuItem) => {
        menuItem.querySelector('a').dataset.isActive = 'false';
        menuItem.querySelector('div').dataset.iconType = 'line';
      }
    );
  }
}
