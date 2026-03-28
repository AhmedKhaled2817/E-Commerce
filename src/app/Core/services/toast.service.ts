import { Component, Injectable, inject } from '@angular/core';
import { MatSnackBar, MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast-content',
  standalone: true,
  imports: [MatIconModule, CommonModule],
  template: `
    <div class="d-flex align-items-center gap-2">
      <mat-icon>{{ data.icon }}</mat-icon>
      <span>{{ data.message }}</span>
    </div>
  `,
  styles: [`
    :host { display: block; }
    mat-icon { font-size: 20px; width: 20px; height: 20px; vertical-align: middle; }
    span { line-height: 20px; }
  `]
})
class ToastContentComponent {
  data = inject<{ message: string, icon: string }>(MAT_SNACK_BAR_DATA);
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private snackBar = inject(MatSnackBar);

  success(message: string) {
    this.show(message, 'success-toast', 'check_circle');
  }

  error(message: string) {
    this.show(message, 'error-toast', 'error');
  }

  info(message: string) {
    this.show(message, 'info-toast', 'info');
  }

  private show(message: string, panelClass: string, icon: string) {
    this.snackBar.openFromComponent(ToastContentComponent, {
      data: { message, icon },
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: [panelClass]
    });
  }
}
