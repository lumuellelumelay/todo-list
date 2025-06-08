import { Projects } from './project.js';

export class ProjectHandler {
  constructor() {
    this.idProject = 1;
    this.latestProject = null;
    this.createDefault();
    this.getLatestProjectId();
  }

  getStoredProjects() {
    return JSON.parse(localStorage.getItem('projects') || '[]');
  }

  storeProjectData(data) {
    const storedProjects = JSON.parse(localStorage.getItem('projects'));
    storedProjects.push(data);

    localStorage.setItem('projects', JSON.stringify(storedProjects));
  }

  addProject(title, color) {
    const project = new Projects(this.idProject, title, color);

    this.idProject++;

    this.latestProject = project;

    this.storeProjectData(project);
  }

  getInbox() {
    return this.getStoredProjects()[0];
  }

  getProject(id) {
    return this.getStoredProjects().find((project) => project.id === id);
  }

  getlatestProject() {
    return this.latestProject;
  }

  createDefault() {
    const initializedProject = localStorage.getItem('projects');
    const defaultProject = new Projects(0, 'Inbox', 'gray');

    if (!initializedProject) {
      const storedProjects = [defaultProject];

      localStorage.setItem('projects', JSON.stringify(storedProjects));
    }
  }

  // this will load the stored data from the local storage
  getLatestProjectId() {
    const largestId = Math.max(
      ...this.getStoredProjects().map((item) => item.id)
    );

    this.idProject = largestId + 1;
  }
}
