import { Injectable } from '@angular/core';
import {TicketTransaction} from '../purchase-history/ticket-transaction.model';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketTransactionService {
  private apiUrl = 'http://localhost:8080/api/purchased-tickets';

  constructor(private http: HttpClient) {}

  getTransactionsByUserId(userId: string): Observable<TicketTransaction[]> {
    return this.http.get<TicketTransaction[]>(`${this.apiUrl}/${userId}`);
  }
}
