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
  ) {
    this.itemForm = this.fb.group(
      {
        name: [null, Validators.required],
        genre: [null, Validators.required],
        destinationTab: ['backlog', Validators.required],
        finishedDate: [null],
        director: [null],
        releaseDate: [null],
        console: [null],
        numberOfSeasons: [null],
        author: [null]
      }
    )

    this.itemForm.get('destinationTab')?.valueChanges.subscribe(value => {
      const finishedDate = this.itemForm.get('finishedDate');
      if (value === 'finished') {
        finishedDate?.setValidators([Validators.required]);
      } else {
        finishedDate?.clearValidators();
      }
      finishedDate?.updateValueAndValidity();
    });

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
      console.log(this.itemForm.value);
      this.dialogRef.close(this.itemForm.value); // pass data back
    }
  }


}
