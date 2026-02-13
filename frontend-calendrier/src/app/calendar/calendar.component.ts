import { Component, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { CalendarService, Holiday } from '../calendar.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  @ViewChild('calendar') calendarComponent!: FullCalendarComponent;

  months = [
    { value: 0, name: 'January' }, { value: 1, name: 'February' },
    { value: 2, name: 'March' }, { value: 3, name: 'April' },
    { value: 4, name: 'May' }, { value: 5, name: 'June' },
    { value: 6, name: 'July' }, { value: 7, name: 'August' },
    { value: 8, name: 'September' }, { value: 9, name: 'October' },
    { value: 10, name: 'November' }, { value: 11, name: 'December' }
  ];
  years = Array.from({ length: 10 }, (_, i) => 2022 + i);

  selectedMonth = new Date().getMonth();
  selectedYear = new Date().getFullYear();

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: false,
    height: 'auto',
    fixedWeekCount: false,
    nowIndicator: true, // Internal tracker for current time
    events: [],
    
    // This function runs for every day square on the calendar
    dayCellDidMount: (info) => {
      const now = new Date();
      now.setHours(0, 0, 0, 0); // Normalize to midnight for comparison
      const cellDate = info.date;
      cellDate.setHours(0, 0, 0, 0);

      if (cellDate < now) {
        // 1. It is a past date
        info.el.classList.add('past-day');
      } else if (cellDate.getTime() === now.getTime()) {
        // 2. It is exactly "Now"
        info.el.classList.add('today-day');
      }
    }
  };

  constructor(private calendarService: CalendarService) {}

  ngOnInit(): void {
    this.loadHolidays();
  }

  loadHolidays(): void {
    this.calendarService.getHolidays().subscribe({
      next: (data: Holiday[]) => {
        const formattedEvents = data
          .filter(h => h.startDate !== null)
          .map(h => {
            const endLimit = new Date(h.endDate || h.startDate);
            endLimit.setDate(endLimit.getDate() + 1);

            return {
              title: h.title, // Tracking the REAL Title from your backend
              start: h.startDate,
              end: endLimit.toISOString().split('T')[0],
              backgroundColor: h.tentative ? '#f59e0b' : '#10b981',
              borderColor: 'transparent',
              allDay: true,
              display: 'block'
            };
          });

        this.calendarOptions = { ...this.calendarOptions, events: formattedEvents };
      }
    });
  }

  goToDate(): void {
    if (!this.calendarComponent) return;
    const calendarApi = this.calendarComponent.getApi();
    calendarApi.gotoDate(new Date(this.selectedYear, this.selectedMonth, 1));
  }
}