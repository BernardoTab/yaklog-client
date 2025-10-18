import { DatePipe } from '@angular/common';
import { Component, signal, ViewChild } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MediaItemsService } from '../../../shared/services/media-items.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MediaItemResult } from '../../../shared/models/media-item.result';
import { FinishedMediaItemFilter } from './models/finished-media-item-filter';

@Component({
  selector: 'app-finished',
  standalone: true,
  imports: [MatExpansionModule, MatPaginatorModule, MatSelectModule, MatFormFieldModule, FormsModule, DatePipe,
    MatTableModule],
  templateUrl: './finished.component.html',
  styleUrl: './finished.component.css'
})
export class FinishedComponent {

  finishedYears: number[] = [];
  selectedYear!: number;
  totalCount!: number;
  pageSize: number = 10;

  // Columns to display
  displayedColumns: string[] = ['title', 'mediaType','finishedDate'];

  // Local data array
  mediaItems: MediaItemResult[] = [
  ];

  // DataSource for Angular Material table
  dataSource = new MatTableDataSource<any>(this.mediaItems);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private readonly mediaItemsService: MediaItemsService) {
  }

  
  ngOnInit() {
    // Step 1: Load available years
    this.mediaItemsService.getFinishedYears().subscribe(years => {
      this.finishedYears = years;
      this.selectedYear = this.finishedYears[0];

      // Step 2: Load initial media items for the first year
      this.loadMediaItems();
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  
  loadMediaItems(offset: number = 0, pageSize: number = 10) {
    const filter: FinishedMediaItemFilter = {
      finishedYear: this.selectedYear,
      offset,
      pageSize
    };

    this.mediaItemsService.getFinishedMediaInfo(filter).subscribe(res => {
      this.mediaItems = res.items;
      this.totalCount = res.totalCount;

      this.dataSource.data = this.mediaItems;
      this.paginator.length = this.totalCount;
    });
  }
  
  onPageChange(event: any) {
    this.loadMediaItems(event.pageIndex * event.pageSize, event.pageSize);
  }

  onYearChange(event: any){
    this.loadMediaItems(0, this.pageSize)
  }

}
