import { Component, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-backlog',
  standalone: true,
  imports: [MatExpansionModule],
  templateUrl: './backlog.component.html',
  styleUrl: './backlog.component.css'
})
export class BacklogComponent {
  readonly panelOpenState = signal(false);

  items = [
    {
      title: "Jurassic Park",
      genre: "Movie"
    },
    {
      title: "Indiana Jones",
      genre: "Movie"
    },
    {
      title: "Star Wars",
      genre: "Movie"
    },
    {
      title: "Titanic",
      genre: "Movie"
    },
    {
      title: "Home Alone",
      genre: "Movie"
    },
    {
      title: "Die Hard",
      genre: "Movie"
    },
    {
      title: "Pocahontas",
      genre: "Movie"
    },
    {
      title: "Toy Story",
      genre: "Movie"
    },
    {
      title: "Super Mario Galaxy",
      genre: "Game"
    },
    {
      title: "Legend of Zelda: Ocarina of Time",
      genre: "Game"
    }
  ]
  genres = ["Movies", "Games", "Series", "Books", "Projects"]

  getItemsByGenre(genre: string){
    let filteredItems = this.items.filter(item => item.genre === genre);
    return filteredItems;
  }
}
