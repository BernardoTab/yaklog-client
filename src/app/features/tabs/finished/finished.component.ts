import { DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { filter } from 'rxjs';

@Component({
  selector: 'app-finished',
  standalone: true,
  imports: [MatExpansionModule, DatePipe],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css'
})
export class FinishedComponent {
  readonly panelOpenState = signal(false);
  items = [
    {
      title: "Jurassic Park",
      finishedDate: new Date("2025-12-17"),
      genre: "Movie"
    },
    {
      title: "Mickey Mouse Violates Palestinian Air Space",
      finishedDate: new Date("2024-09-12"),
      genre: "Movie"
    },
    {
      title: "Dark Souls",
      finishedDate: new Date("2025-07-10"),
      genre: "Game"
    }];

  get sortedYears() {
    let itemYears = this.items.map(item => item.finishedDate.getFullYear());
    itemYears = [...itemYears].sort((a, b) => b - a);
    return [...new Set(itemYears)]; //creates a distinct list
  }

  getitemsByYear(year: number){
    let filteredItems = this.items.filter(item => item.finishedDate.getFullYear() === year);
    return filteredItems;
  }
}
