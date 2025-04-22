import { Projects } from './project.js';

export class projectList {
  constructor() {
    this.idProject = 1;
    this.projectList = [];
  }

  addProject(title, color) {
    this.projectList.push(new Projects(this.idProject, title, color));
    this.idProject++;
  }

  getProjectList() {
    return this.projectList;
  }

  getProject(id) {
    return this.projectList.find((project) => project.id === id);
  }

  getlatestProject() {
    return this.projectList[this.projectList.length - 1];
  }
}
