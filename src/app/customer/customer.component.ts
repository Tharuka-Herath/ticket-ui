import {Component, OnInit} from '@angular/core';
import {TicketPoolListComponent} from '../ticket-pool-list/ticket-pool-list.component';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {PurchaseTicketsComponent} from '../purchase-tickets/purchase-tickets.component';

@Component({
  selector: 'app-customer',
  standalone:true,
  imports: [
    TicketPoolListComponent,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatCardTitle,
    PurchaseTicketsComponent,
    RouterLink,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent implements OnInit {
  userId: string | null = null;
  ticketPool: any = {};
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
    });


  }
}
