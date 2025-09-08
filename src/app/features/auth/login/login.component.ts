import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgClass } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MatButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  submitted = false;

  constructor(
    private fb : FormBuilder, 
    private readonly router : Router,
    private authService : AuthService,
    private snackBar: MatSnackBar) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.authService.login({
        email: this.email!.value,
        password: this.password!.value
      }).subscribe({
        next : (response) => {
          console.log(response);
          this.router.navigate(["overview"]);
        },
        error : (err) => {
          this.snackBar.open(err.error?.message || 'An error occurred', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',  // top-right
            verticalPosition: 'top'
          });
        }
      })
    }
    this.submitted=true;
  }

  onBack(){
    this.router.navigate(["/"]);
  }

  get email(){
    return this.loginForm.get("email");
  }

  get password(){
    return this.loginForm.get("password");
  }
}
