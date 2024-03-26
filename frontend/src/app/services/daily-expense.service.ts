import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DailyExpense } from '../models/daily-expense';

@Injectable({
  providedIn: 'root'
})
export class DailyExpenseService {
  public url = 'http://localhost:3000/daily-expense';
  constructor(private readonly http: HttpClient) { }

  public getAll(): Observable<DailyExpense[]> {
    return this.http.get<DailyExpense[]>(this.url);
  }

  public getById(id: number): Observable<DailyExpense> {
    return this.http.get<DailyExpense>(`${this.url}/${id}`);
  }

  public save(data: DailyExpense): Observable<void> {
    return this.http.post<void>(this.url, data);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  public update(id: number, data: DailyExpense): Observable<void> {
    return this.http.put<void>(`${this.url}/${id}`, data);
  }
}
