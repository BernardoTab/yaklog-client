import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { NgClass } from '@angular/common';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgClass,MatTabsModule, MatButton, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  tabs = [
    {name: 'To-Do', route: "/to-do"},
    {name: 'Backlog', route: "/backlog"},
    {name: 'Finished', route: "/finished"},
    {name: 'Stats', route: "/stats"}];
  activeTab = this.tabs[0].name;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }

  get email() {
    console.log(localStorage.getItem("email"))
    return localStorage.getItem("email");
  }
}
