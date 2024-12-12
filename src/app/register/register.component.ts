import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatOption, MatSelect } from '@angular/material/select';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    NgIf,
    MatSelect,
    MatOption,
    MatCardTitle,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.registerForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
      role: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {

      const requestBody = {
        userName: this.registerForm.value.userName,
        password: this.registerForm.value.password,
        roles: this.registerForm.value.role,
      };


      this.userService.register(requestBody).subscribe(
        (response) => {
          this.snackBar.open('Registration Successful!', 'Close', { duration: 2000 });
          this.router.navigate(['/login']);
        },
        (error) => {
          this.snackBar.open('Registration failed!', 'Close', { duration: 2000 });
        }
      );
    } else {
      this.snackBar.open('Please fill all fields correctly!', 'Close', { duration: 2000 });
    }
  }
}
