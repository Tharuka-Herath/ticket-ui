import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import {TicketPoolDto} from '../ticket-pool-config/ticket-pool.dto';

@Injectable({
  providedIn: 'root'
})
export class TicketPoolService {
  private apiUrl = `http://localhost:8080/api/ticket-pool`;

  constructor(private http: HttpClient) {}

  createTicketPool(ticketPoolDto: TicketPoolDto): Observable<TicketPoolDto> {
    return this.http.post<TicketPoolDto>(`${this.apiUrl}/create`, ticketPoolDto);
  }

  getAllTicketPools(): Observable<TicketPoolDto[]> {
    return this.http.get<TicketPoolDto[]>(`${this.apiUrl}/all`);
  }


  addTicketsToPool(ticketPoolId: string, ticketsToAdd: number, userId: string): Observable<TicketPoolDto> {
    const params = new HttpParams()
      .set('ticketsToAdd', ticketsToAdd.toString())
      .set('userId', userId);

    return this.http.put<TicketPoolDto>(
      `${this.apiUrl}/${ticketPoolId}/addTickets`,
      {},
      { params }
    );
  }


  purchaseTickets(ticketPoolId: string, ticketsToPurchase: number, userId: string): Observable<TicketPoolDto> {
    return this.http.put<TicketPoolDto>(`${this.apiUrl}/${ticketPoolId}/purchaseTickets`, {}, {
      params: {
        ticketsToPurchase: ticketsToPurchase.toString(),
        userId: userId
      }
    });
  }

}
