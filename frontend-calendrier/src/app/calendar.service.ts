import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Always keep this interface! It's your "Source of Truth"
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
  private apiUrl = 'http://localhost:8080/api/holidays';

  constructor(private http: HttpClient) {}

  getHolidays(): Observable<Holiday[]> {
    return this.http.get<Holiday[]>(this.apiUrl);
  }
}