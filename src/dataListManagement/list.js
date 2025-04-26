export class List {
  constructor(
    id,
    title,
    description,
    day,
    due_date,
    created_at,
    status,
    completed
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.day = day;
    this.due_date = due_date;
    this.created_at = created_at;
    this.status = status;
    this.completed = completed;
  }
}
