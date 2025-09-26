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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddNewDialogComponent>,
  ) {
    this.itemForm = this.fb.group(
      {
        name: ['', Validators.required],
        genre: ['Movie', Validators.required],
        destinationTab: ['backlog', Validators.required],
        finishedDate: ['']
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
  }

  saveItem() {
    if (this.itemForm.valid) {
      this.dialogRef.close(this.itemForm.value); // pass data back
    }
  }


}
