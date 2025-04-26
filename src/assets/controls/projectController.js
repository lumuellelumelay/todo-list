import projectListInstance from '../../modules/projectManager.js';

export class ProjectController {
  constructor() {
    this.projectContainer = document.querySelector('.projects-container');
    this.activeId = null;
    this.target = null;
    this.initialize();
  }

  initialize() {
    this.menuControls();
  }

  // NOTE: testing stage
  renderHelper() {
    // get the active id
    // post the active id to the projectList.js to get the active project
    // post data to render the project data to the container (render.js)
    console.log(this.activeId);
    const project = projectListInstance.getProject(this.activeId); // this will get the corresponding project
    console.log(project);
  }

  menuControls() {
    this.projectContainer.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation(); // NOTE: checking if it effects other events
      this.target = e.target.closest('.project-cards');

      if (this.target) {
        this.deactivateMenuItems();

        this.target.dataset.isActive = 'true';
        this.activeHandler(this.target);

        this.activeId = +this.target.dataset.projectId;

        this.renderHelper();
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
