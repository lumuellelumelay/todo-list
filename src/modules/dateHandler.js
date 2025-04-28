export class DateHandler {
  constructor() {
    this.dateToday = new Date();
  }

  getDay(index) {
    const daysOfWeek = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    return daysOfWeek[index];
  }

  getCreateDate() {
    return this.dateToday.toLocaleDateString();
  }

  getTodayDay() {
    const dayNumber = this.dateToday.getDay();
    return this.getDay(dayNumber);
  }
}
