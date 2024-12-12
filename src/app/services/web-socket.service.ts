import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket: WebSocket;
  public ticketPoolUpdates: Subject<any> = new Subject<any>();

  constructor() {
    this.socket = new WebSocket('ws://localhost:8080/ticket-pool-updates');

    this.socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      this.ticketPoolUpdates.next(message);
    };

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error: ', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  }

  closeConnection(): void {
    this.socket.close();
  }
}
