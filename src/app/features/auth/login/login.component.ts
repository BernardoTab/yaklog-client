import { Component } from '@angular/core';
import {FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm : FormGroup;
  submitted = false;

  constructor(private fb : FormBuilder, private readonly router : Router) {
    this.loginForm = fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      alert("Valid!")
    }
    this.submitted=true;
  }

  onBack(){
    this.router.navigate(["/"]);
  }
}
