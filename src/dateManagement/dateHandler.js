import projectListInstance from '../modules/projectManager.js';

export class DateHandler {
  constructor() {
    this.dateToday = new Date().toISOString().split('T')[0];
  }

  listStatus(dueDate) {
    if (!dueDate) {
      return 'none';
    }

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

    if (dateString === null) {
      return 'none';
    }

    return daysOfWeek[date.getDay()];
  }

  updateListStatus() {
    if (projectListInstance.getStoredProjects().length === 0) {
      return;
    }

    const statusCache = {};

    projectListInstance.getStoredProjects().forEach((project) => {
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

  createdAtDate() {
    const date = new Date();
    return date.getTime();
  }

  // NOTE: Create single update function
  // When the user change the date
  singeUpdateStatus(ProjectId, ListId) {
    // code here...
  }
}
