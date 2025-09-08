import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { PasswordMatchValidator } from './PasswordMatchValidator';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, MatButtonModule, NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder, 
    private readonly router : Router,
    private authService : AuthService,
    private snackBar: MatSnackBar) {

    this.registerForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: PasswordMatchValidator('password', 'confirmPassword') } )
  }

  onSubmit(){
    if(this.registerForm.valid){
      this.authService.register({
        email: this.email!.value,
        password: this.password!.value
      }).subscribe({
        next : (response) => {
          console.log(response);
          this.router.navigate(["overview"])
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
    return this.registerForm.get("email");
  }

  get password(){
    return this.registerForm.get("password");
  }
}
