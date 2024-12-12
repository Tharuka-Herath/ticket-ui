import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TicketPoolService } from '../services/ticket-pool.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-purchase-tickets',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    NgIf,
    MatButton,
    MatLabel,
    MatError
  ],
  templateUrl: './purchase-tickets.component.html',
  styleUrls: ['./purchase-tickets.component.css']
})
export class PurchaseTicketsComponent {
  purchaseTicketsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketPoolService: TicketPoolService,
    private snackBar: MatSnackBar
  ) {
    this.purchaseTicketsForm = this.fb.group({
      ticketPoolId: ['', Validators.required],
      ticketsToPurchase: [0, [Validators.required, Validators.min(1)]],
      userId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.purchaseTicketsForm.invalid) {
      return;
    }

    const { ticketPoolId, ticketsToPurchase, userId } = this.purchaseTicketsForm.value;

    // Call the service to purchase tickets from the pool
    this.ticketPoolService.purchaseTickets(ticketPoolId, ticketsToPurchase, userId).subscribe({
      next: (updatedTicketPool) => {
        this.snackBar.open('Tickets purchased successfully!', 'Close', {
          duration: 2000,
        });
        // Optionally reset the form
        this.purchaseTicketsForm.reset();
      },
      error: (err) => {
        this.snackBar.open('Error purchasing tickets from the pool.', 'Close', {
          duration: 2000,
        });
      },
    });
  }
}
