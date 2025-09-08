import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgClass, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private readonly router : Router) {
    
  }

  onLoginClick(){
    this.router.navigate(['/login']);
  }

  onRegisterClick(){
    this.router.navigate(['/register']);
  }
}
