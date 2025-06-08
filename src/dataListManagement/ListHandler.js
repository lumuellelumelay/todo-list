import projectListInstance from '../modules/projectManager.js';
import { List } from './list.js';

export class ListHandler {
  constructor() {
    this.id = this.initializeId();
  }

  initializeId() {
    const checkListId = localStorage.getItem('listId');

    if (!checkListId) {
      localStorage.setItem('listId', 1);
      return localStorage.getItem('listId');
    }

    return checkListId;
  }

  addListToProjectId(
    projectId,
    title,
    description,
    day,
    due_date,
    created_at,
    status,
    completed
  ) {
    const storageProjects = projectListInstance.getStoredProjects();
    const project = projectListInstance.getProject(projectId);

    const list = new List(
      this.id,
      title,
      description,
      day,
      due_date,
      created_at,
      status,
      completed
    );
    this.id++;
    localStorage.setItem('listId', this.id);
    project.list.push(list);

    storageProjects[projectId] = project;
    localStorage.setItem('projects', JSON.stringify(storageProjects));
  }

  getList(projectId) {
    return projectListInstance.getProject(projectId).list;
  }

  getLatestListId() {
    const storedProjects = projectListInstance.getStoredProjects();
    console.log(storedProjects.list);

    const largestId = Math.max(...storedProjects.map((item) => item.id));

    this.id = largestId + 1;
    console.log(this.id);
  }
}
