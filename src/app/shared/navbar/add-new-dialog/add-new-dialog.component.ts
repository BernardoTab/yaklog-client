import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { PortfolioService } from '../services/portfolio.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finished } from 'stream';
import { mediaType } from '../models/media-type';
import { MediaItem } from '../models/media-item';
import { MediaType } from 'express';

@Component({
  selector: 'app-add-new-dialog',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButton,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatDatepickerModule],
  templateUrl: './add-new-dialog.component.html',
  styleUrl: './add-new-dialog.component.css'
})
export class AddNewDialogComponent {

  itemForm: FormGroup;
  consoles = ["Gamecube","N64","PS1","PS2","PS3","PS4","PS5"];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewDialogComponent>,
    private portfolioService: PortfolioService,
    private snackBar: MatSnackBar
  ) {
    this.itemForm = this.fb.group(
      {
        title: [undefined, Validators.required],
        genre: [undefined, Validators.required],
        destinationTab: ['backlog', Validators.required],
        finishedDate: [undefined],
        director: [undefined],
        releaseDate: [undefined],
        console: [undefined],
        numberOfSeasons: [undefined],
        author: [undefined]
      }
    )

    //When you pick Finished, finishedDate field gets a validator and clears it when de-selected
    this.itemForm.get('destinationTab')?.valueChanges.subscribe(value => {
      const finishedDate = this.itemForm.get('finishedDate');
      if (value === 'finished') {
        finishedDate?.setValidators([Validators.required]);
      } else {
        finishedDate?.clearValidators();
      }
      finishedDate?.updateValueAndValidity();
    });

    //validator adding/removing based on genre
    this.itemForm.get('genre')?.valueChanges.subscribe(value => {
      const console = this.itemForm.get('console');
      const numberOfSeasons = this.itemForm.get('numberOfSeasons');
      const author = this.itemForm.get('author');
      if (value === 'Game') {
        console?.setValidators([Validators.required]);
      } else if(value === 'Series'){
        numberOfSeasons?.setValidators([Validators.required]);
      } else if(value === 'Book'){
        author?.setValidators([Validators.required]);
      }
      else {
        console?.clearValidators();
        numberOfSeasons?.clearValidators();
        author?.clearValidators();
      }
      console?.updateValueAndValidity();
      numberOfSeasons?.updateValueAndValidity();
      author?.updateValueAndValidity();
    });
  }

  saveItem() {
    if (this.itemForm.valid) {
      const formValue = this.itemForm.value;
      const payload: MediaItem = {
        Title: formValue.title,
        MediaType: formValue.genre as mediaType,
        Finished: formValue.destinationTab === 'finished',
        FinishedDate: formValue.finishedDate ? new Date(formValue.finishedDate).toISOString() : undefined,
        ImageFilePath: undefined,

        Author: formValue.author !== null ? formValue.author : undefined ,
        Console:  formValue.console !== null ? formValue.console : undefined ,
        ReleaseDate: formValue.releaseDate ? new Date(formValue.releaseDate).toISOString() : undefined,
        Director:  formValue.director !== null ? formValue.director : undefined ,
        NumberOfSeasons:  formValue.numberOfSeasons !== null ? formValue.numberOfSeasons : undefined 
      }
      this.portfolioService.addItem(payload).subscribe({
        next : () => {
          this.snackBar.open('Media item added successfully!', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',  // top-right
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.dialogRef.close(this.itemForm.value);
        },
        error : (err) => {
          this.snackBar.open(err.error?.message || 'An error occurred', 'Close', {
            duration: 5000,
            horizontalPosition: 'right',  // top-right
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      })
      console.log(this.itemForm.value);
      this.dialogRef.close(this.itemForm.value); // pass data back
    }
  }


}
