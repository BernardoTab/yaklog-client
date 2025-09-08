import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [NgClass, MatTabsModule],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css'
})
export class OverviewComponent {
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];

  
  constructor(private readonly router: Router) {
    
  }
}
