import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {TicketTransactionService} from '../services/ticket-transaction.service';
import {TicketTransaction} from './ticket-transaction.model';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe, DatePipe, NgIf} from '@angular/common';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-purchase-history',
  standalone:true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatTable,
    MatHeaderCell,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCellDef,
    CurrencyPipe,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    DatePipe,
    RouterLink,
    MatButton,
    MatCardTitle
  ],
  templateUrl: './purchase-history.component.html',
  styleUrl: './purchase-history.component.css'
})
export class PurchaseHistoryComponent implements OnInit {
  userId: string | null = null;
  transactions: TicketTransaction[] = [];
  displayedColumns: string[] = ['ticketId', 'ticketPoolId', 'price', 'createdAt'];  // Updated columns

  constructor(
    private route: ActivatedRoute,
    private ticketTransactionService: TicketTransactionService
  ) {}

  ngOnInit(): void {
    // Get the userId from queryParams and load the purchase history
    this.route.queryParams.subscribe((params) => {
      this.userId = params['userId'];
      if (this.userId) {
        this.loadPurchaseHistory();
      }
    });
  }

  loadPurchaseHistory(): void {
    // Call the service to fetch the purchased tickets
    if (this.userId) {
      this.ticketTransactionService.getTransactionsByUserId(this.userId).subscribe({
        next: (transactions) => {
          this.transactions = transactions; // Store fetched transactions
        },
        error: (err) => {
          console.error('Error fetching transactions:', err);
        },
      });
    }
  }
}
