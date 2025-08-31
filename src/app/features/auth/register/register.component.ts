import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { PasswordMatchValidator } from './PasswordMatchValidator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm : FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private readonly router : Router) {
    this.registerForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      confirmPassword: new FormControl('', [Validators.required])
    },
    { validators: PasswordMatchValidator('password', 'confirmPassword') } )
  }

  onSubmit(){
    if(this.registerForm.valid){
      alert("Valid!")
    }
    this.submitted=true;
  }

  onBack(){
    this.router.navigate(["/"]);
  }
}
