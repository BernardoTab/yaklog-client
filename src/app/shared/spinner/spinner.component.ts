import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule , AsyncPipe],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

  constructor(private spinnerService: SpinnerService) {}

  get isLoading$() {
    return this.spinnerService.isLoading$;
  }
}
