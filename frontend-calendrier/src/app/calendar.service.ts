import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// This matches your Holiday entity
export interface Holiday {
  id: number;
  title: string;
  startDate: string;
  endDate?: string;
  tentative: boolean;
  note?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  private apiUrl = 'http://localhost:8080/api/holidays'; // your backend URL

  constructor(private http: HttpClient) {}

  // GET all holidays
  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrl);
  }
}
