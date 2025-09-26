import { Component } from '@angular/core';
import { NavbarComponent } from '../../../shared/navbar/navbar.component';
import { NgClass } from '@angular/common';


@Component({
  selector: 'app-to-do',
  standalone: true,
  imports: [NavbarComponent, NgClass],
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.css'
})
export class ToDoComponent {

  genres = ["Movie", "Game", "Series", "Book", "Project"]
}
