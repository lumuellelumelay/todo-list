import projectListInstance from '../modules/projectManager.js';

export class DateHandler {
  constructor() {
    this.dateToday = new Date().toISOString().split('T')[0];
  }

  listStatus(dueDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const newDueDate = new Date(dueDate);
    newDueDate.setHours(0, 0, 0, 0);

    const todayTimestamp = today.getTime();
    const dueDateTimestamp = newDueDate.getTime();

    if (todayTimestamp === dueDateTimestamp) {
      return 'today';
    } else if (dueDateTimestamp > todayTimestamp) {
      return 'pending';
    } else {
      return 'overdue';
    }
  }

  dateDay(dateString) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    const date = new Date(dateString);

    return daysOfWeek[date.getDay()];
  }

  updateListStatus() {
    if (projectListInstance.getProjectList().length === 0) {
      return;
    }

    const statusCache = {};

    projectListInstance.getProjectList().forEach((project) => {
      project.list.forEach((list) => {
        const dueDate = list.due_date;

        if (!statusCache[dueDate]) {
          statusCache[dueDate] = this.listStatus(dueDate);
        }

        list.status = statusCache[dueDate];
      });
    });
  }

  getTodayDate() {
    return this.dateToday;
  }

  // NOTE: Create single update function
  // When the user change the date
  singeUpdateStatus(ProjectId, ListId) {
    // code here...
  }
}
