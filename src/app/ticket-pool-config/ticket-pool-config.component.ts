import { Component} from '@angular/core';
import {TicketPoolDto} from './ticket-pool.dto';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TicketPoolService} from '../services/ticket-pool.service';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {NgIf} from '@angular/common';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {TicketPoolListComponent} from '../ticket-pool-list/ticket-pool-list.component';

@Component({
  selector: 'app-ticket-pool-config',
  templateUrl: './ticket-pool-config.component.html',
  styleUrls: ['./ticket-pool-config.component.css'],
  standalone: true,
  imports: [
    MatFormField,
    NgIf,
    MatInput,
    ReactiveFormsModule,
    MatButton,
    MatLabel,
    MatError
  ]
})
export class TicketPoolConfigComponent {
  ticketPoolForm: FormGroup;

  ticketPoolId!: string;

  constructor(
    private fb: FormBuilder,
    private ticketPoolService: TicketPoolService,
    private snackBar: MatSnackBar
  ) {
    this.ticketPoolForm = this.fb.group({
      eventName: ['', Validators.required],
      ticketPrice: ['', [Validators.required, Validators.min(1)]],
      maxTickets: ['', [Validators.required, Validators.min(1)]],
      vendorAddRate: ['', [Validators.required, Validators.min(1)]],
      customerRetrieveRate: ['', [Validators.required, Validators.min(1)]],
    });
  }

  onSubmit(): void {
    if (this.ticketPoolForm.invalid) {
      return;
    }

    const ticketPoolDto: TicketPoolDto = this.ticketPoolForm.value;
    this.ticketPoolService.createTicketPool(ticketPoolDto).subscribe({
      next: (createdTicketPool) => {
        this.snackBar.open('Ticket pool created successfully!', 'Close', {
          duration: 2000,
        });

        this.ticketPoolId = createdTicketPool.ticketPoolId;

        this.ticketPoolForm.reset();
      },
      error: (err) => {
        this.snackBar.open('Error creating ticket pool.', 'Close', {
          duration: 2000,
        });
      },
    });
  }
}
