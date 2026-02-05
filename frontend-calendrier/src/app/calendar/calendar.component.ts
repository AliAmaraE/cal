import { Component, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  months = [
    { value: 0, name: 'January' },
    { value: 1, name: 'February' },
    { value: 2, name: 'March' },
    { value: 3, name: 'April' },
    { value: 4, name: 'May' },
    { value: 5, name: 'June' },
    { value: 6, name: 'July' },
    { value: 7, name: 'August' },
    { value: 8, name: 'September' },
    { value: 9, name: 'October' },
    { value: 10, name: 'November' },
    { value: 11, name: 'December' }
  ];

  years = Array.from({ length: 10 }, (_, i) => 2022 + i);

  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: false,
    events: []
  };

  goToDate() {
    if (!this.calendarComponent) return;

    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(
      new Date(this.selectedYear, this.selectedMonth, 1)
    );
  }
}
