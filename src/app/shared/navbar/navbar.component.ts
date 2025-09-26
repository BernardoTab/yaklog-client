import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButton } from '@angular/material/button';
import { AddNewDialogComponent } from './add-new-dialog/add-new-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MatTabsModule, MatButton, RouterModule],
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
  readonly dialog = inject(MatDialog);

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate([""]);
  }

  get email() {
    return localStorage.getItem("email");
  }

  openAddNewDialog(): void {
    const dialogRef = this.dialog.open(AddNewDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
    });
  }
}
