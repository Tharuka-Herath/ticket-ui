import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatButton } from '@angular/material/button';
import {TicketPoolConfigComponent} from '../ticket-pool-config/ticket-pool-config.component';
import {TicketPoolListComponent} from '../ticket-pool-list/ticket-pool-list.component';
import {AddTicketsComponent} from '../add-tickets/add-tickets.component';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatButton,
    MatCardTitle,
    RouterModule,
    TicketPoolConfigComponent,
    TicketPoolListComponent,
    AddTicketsComponent
  ],
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  userId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
    });
  }
}
