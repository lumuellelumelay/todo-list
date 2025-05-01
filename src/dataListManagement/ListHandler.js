import projectListInstance from '../modules/projectManager.js';
import { List } from './list.js';

export class ListHandler {
  constructor() {
    this.id = 1;
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
    const project = projectListInstance.getProject(projectId);
    project.list.push(
      new List(
        this.id,
        title,
        description,
        day,
        due_date,
        created_at,
        status,
        completed
      )
    );
    this.id++;
  }

  getList(projectId) {
    return projectListInstance.getProject(projectId).list;
  }
}
