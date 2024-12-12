import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { UserService } from '../services/user.service';
import { Router, RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgIf } from '@angular/common';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, NgIf, MatCardContent, MatCardTitle, MatCard, MatCardHeader, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {

      this.userService.login(this.loginForm.value).subscribe(
        (response: any) => {
          if (response) {
            this.snackBar.open('Login Successful!', 'Close', { duration: 2000 });


            if (response.roles === 'VENDOR') {
              this.router.navigate(['/vendor'], { queryParams: { userId: response.userId } });
            } else if (response.roles === 'CUSTOMER') {
              this.router.navigate(['/customer'],{ queryParams: { userId: response.userId } });
            }
          }
        },
        (error) => {
          // Handle login failure
          this.snackBar.open('Invalid credentials!', 'Close', { duration: 2000 });
        }
      );
    } else {
      // Show error if form is invalid
      this.snackBar.open('Please fill all fields correctly!', 'Close', { duration: 2000 });
    }
  }
}
