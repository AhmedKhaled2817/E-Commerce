import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../../../Shared/Service/profile.service';

@Component({
  selector: 'app-security',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule, RouterModule],
  template: `
    <div class="security-container py-5">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a routerLink="/public/profile" class="text-decoration-none text-muted"
                >Your Account</a
              >
            </li>
            <li class="breadcrumb-item active">Login & Security</li>
          </ol>
        </nav>

        <h1 class="fw-bold mb-4">Login & Security</h1>

        <div class="card shadow-sm border rounded-3 overflow-hidden">
          <!-- Name Section -->
          <div
            class="security-item p-4 border-bottom d-flex justify-content-between align-items-center"
          >
            <div class="item-info">
              <h6 class="fw-bold mb-1">Name</h6>
              @if (!editingField() || editingField() !== 'name') {
                <p class="mb-0 text-muted">{{ userProfile().name }}</p>
              } @else {
                <input type="text" class="form-control" [(ngModel)]="tempName" />
              }
            </div>
            <div class="item-action">
              @if (!editingField() || editingField() !== 'name') {
                <button class="btn btn-light border px-4" (click)="startEdit('name')">Edit</button>
              } @else {
                <div class="d-flex gap-2">
                  <button class="btn btn-warning fw-bold" (click)="saveField('name')">Save</button>
                  <button class="btn btn-light border" (click)="cancelEdit()">Cancel</button>
                </div>
              }
            </div>
          </div>

          <!-- Email Section -->
          <div
            class="security-item p-4 border-bottom d-flex justify-content-between align-items-center"
          >
            <div class="item-info">
              <h6 class="fw-bold mb-1">Email</h6>
              @if (!editingField() || editingField() !== 'email') {
                <p class="mb-0 text-muted">{{ userProfile().email }}</p>
              } @else {
                <input type="email" class="form-control" [(ngModel)]="tempEmail" />
              }
            </div>
            <div class="item-action">
              @if (!editingField() || editingField() !== 'email') {
                <button class="btn btn-light border px-4" (click)="startEdit('email')">Edit</button>
              } @else {
                <div class="d-flex gap-2">
                  <button class="btn btn-warning fw-bold" (click)="saveField('email')">Save</button>
                  <button class="btn btn-light border" (click)="cancelEdit()">Cancel</button>
                </div>
              }
            </div>
          </div>

          <!-- Password Section -->
          <div class="security-item p-4 d-flex justify-content-between align-items-center">
            <div class="item-info">
              <h6 class="fw-bold mb-1">Password</h6>
              @if (editingField() !== 'password') {
                <p class="mb-0 text-muted">********</p>
              } @else {
                <div class="input-group">
                  <input
                    [type]="showPassword() ? 'text' : 'password'"
                    class="form-control"
                    [(ngModel)]="tempPassword"
                  />
                  <button
                    class="btn btn-outline-secondary"
                    type="button"
                    (click)="togglePassword()"
                  >
                    <mat-icon class="small-icon">{{
                      showPassword() ? 'visibility_off' : 'visibility'
                    }}</mat-icon>
                  </button>
                </div>
              }
            </div>
            <div class="item-action">
              @if (editingField() !== 'password') {
                <button class="btn btn-light border px-4" (click)="startEdit('password')">
                  Edit
                </button>
              } @else {
                <div class="d-flex gap-2">
                  <button class="btn btn-warning fw-bold" (click)="saveField('password')">
                    Save
                  </button>
                  <button class="btn btn-light border" (click)="cancelEdit()">Cancel</button>
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .security-container {
        background: #fcfcfc;
        min-height: 80vh;
        .breadcrumb {
          font-size: 0.85rem;
        }
        .security-item {
          background: #fff;
          &:hover {
            background: #fafafa;
          }
          .item-info {
            flex: 1;
          }
          .form-control {
            max-width: 300px;
          }
        }
      }
    `,
  ],
})
export class Security {
  private profileService = inject(ProfileService);
  userProfile = this.profileService.userProfile;

  editingField = signal<string | null>(null);
  showPassword = signal(false);
  tempName = '';
  tempEmail = '';
  tempPassword = '';

  startEdit(field: string) {
    this.editingField.set(field);
    if (field === 'name') this.tempName = this.userProfile().name;
    if (field === 'email') this.tempEmail = this.userProfile().email;
    if (field === 'password') {
      this.tempPassword = this.userProfile().password || '';
      this.showPassword.set(false);
    }
  }

  cancelEdit() {
    this.editingField.set(null);
  }

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  saveField(field: string) {
    const updated = { ...this.userProfile() };
    if (field === 'name') updated.name = this.tempName;
    if (field === 'email') updated.email = this.tempEmail;
    if (field === 'password') updated.password = this.tempPassword;
    this.profileService.updateProfile(updated);
    this.editingField.set(null);
  }
}
