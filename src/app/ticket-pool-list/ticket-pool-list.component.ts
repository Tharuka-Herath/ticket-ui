import {Component, OnDestroy, OnInit} from '@angular/core';
import {TicketPoolDto} from '../ticket-pool-config/ticket-pool.dto';
import {TicketPoolService} from '../services/ticket-pool.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {Subscription} from 'rxjs';
import {WebSocketService} from '../services/web-socket.service';


@Component({
  selector: 'app-ticket-pool-list',
  standalone:true,
  imports: [
    NgIf,
    MatCard,
    MatCardHeader,
    NgForOf,
    MatCardContent,
    CurrencyPipe,
    MatCardTitle
  ],
  templateUrl: './ticket-pool-list.component.html',
  styleUrl: './ticket-pool-list.component.css'
})
export class TicketPoolListComponent implements OnInit, OnDestroy {
  ticketPools: TicketPoolDto[] = [];
  private ticketPoolUpdateSubscription!: Subscription;  // Definite Assignment Assertion

  constructor(
    private ticketPoolService: TicketPoolService,
    private snackBar: MatSnackBar,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    // Initially load ticket pools from the server
    this.loadTicketPools();

    // Subscribe to ticket pool updates via WebSocket
    this.ticketPoolUpdateSubscription = this.webSocketService.ticketPoolUpdates.subscribe({
      next: (updatedPool) => {
        this.updateTicketPoolList(updatedPool); // Update the list dynamically with the WebSocket response
      },
      error: (err) => {
        console.error('Error receiving WebSocket update', err);
      }
    });
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.ticketPoolUpdateSubscription) {
      this.ticketPoolUpdateSubscription.unsubscribe();
    }
  }

  loadTicketPools(): void {
    this.ticketPoolService.getAllTicketPools().subscribe({
      next: (data) => {
        this.ticketPools = data;
        console.log('Ticket Pools loaded:', this.ticketPools);
      },
      error: (err) => {
        this.snackBar.open('Error loading ticket pools.', 'Close', {
          duration: 2000,
        });
      }
    });
  }

  updateTicketPoolList(updatedPool: any): void {
    // Check if the ticket pool already exists in the list
    const existingPoolIndex = this.ticketPools.findIndex(pool => pool.ticketPoolId === updatedPool.ticketPoolId);

    if (existingPoolIndex > -1) {
      // Update the existing ticket pool with the new data
      this.ticketPools[existingPoolIndex] = { ...this.ticketPools[existingPoolIndex], ...updatedPool };
    } else {
      // If the pool doesn't exist, add the new pool to the list
      this.ticketPools.push(updatedPool);
    }

    // Optionally, show a snackbar for the update
    this.snackBar.open(`Ticket Pool "${updatedPool.eventName}" updated!`, 'Close', {
      duration: 3000,
    });
  }
}
