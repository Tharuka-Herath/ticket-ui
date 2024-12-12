import { Component } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {TicketPoolService} from '../services/ticket-pool.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-add-tickets',
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
  templateUrl: './add-tickets.component.html',
  styleUrl: './add-tickets.component.css'
})
export class AddTicketsComponent {
  addTicketsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private ticketPoolService: TicketPoolService,
    private snackBar: MatSnackBar
  ) {
    this.addTicketsForm = this.fb.group({
      ticketPoolId: ['', Validators.required],
      ticketsToAdd: [0, [Validators.required, Validators.min(1)]],
      userId: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.addTicketsForm.invalid) {
      return;
    }

    const { ticketPoolId, ticketsToAdd, userId } = this.addTicketsForm.value;

    // Call the service to add tickets to the pool
    this.ticketPoolService.addTicketsToPool(ticketPoolId, ticketsToAdd, userId).subscribe({
      next: (updatedTicketPool) => {
        this.snackBar.open('Tickets added successfully!', 'Close', {
          duration: 2000,
        });
        // Optionally reset the form
        this.addTicketsForm.reset();
      },
      error: (err) => {
        this.snackBar.open('Error adding tickets to the pool.', 'Close', {
          duration: 2000,
        });
      },
    });
  }

}
