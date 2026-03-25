import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

interface Address {
  id: number;
  fullName: string;
  street: string;
  city: string;
  phone: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-addresses',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  template: `
    <div class="addresses-container py-5">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a routerLink="/public/profile" class="text-decoration-none text-muted"
                >Your Account</a
              >
            </li>
            <li class="breadcrumb-item active">Your Addresses</li>
          </ol>
        </nav>

        <h1 class="fw-bold mb-4">Your Addresses</h1>

        <!-- Add/Edit Address Form Overlay -->
        @if (showForm()) {
          <div class="address-form-overlay mb-5 animate-fade-in">
            <div class="card border-0 shadow-sm p-4">
              <h3 class="fw-bold mb-4 border-bottom pb-2">
                {{ isEditing() ? 'Edit Address' : 'Add a New Address' }}
              </h3>
              <form (ngSubmit)="saveAddress()" #addressForm="ngForm">
                <div class="row g-3">
                  <div class="col-md-12">
                    <label class="form-label small fw-bold text-muted">Full Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="fullName"
                      [(ngModel)]="currentModel.fullName"
                      required
                    />
                  </div>
                  <div class="col-md-12">
                    <label class="form-label small fw-bold text-muted">Street Address</label>
                    <input
                      type="text"
                      class="form-control"
                      name="street"
                      [(ngModel)]="currentModel.street"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-bold text-muted">City / State</label>
                    <input
                      type="text"
                      class="form-control"
                      name="city"
                      [(ngModel)]="currentModel.city"
                      required
                    />
                  </div>
                  <div class="col-md-6">
                    <label class="form-label small fw-bold text-muted">Phone Number</label>
                    <input
                      type="text"
                      class="form-control"
                      name="phone"
                      [(ngModel)]="currentModel.phone"
                      required
                    />
                  </div>
                  <div class="col-12 mt-4">
                    <button
                      type="submit"
                      class="btn btn-warning px-4 py-2 me-2 fw-bold"
                      [disabled]="!addressForm.valid"
                    >
                      {{ isEditing() ? 'Save Changes' : 'Add Address' }}
                    </button>
                    <button
                      type="button"
                      class="btn btn-outline-secondary px-4 py-2"
                      (click)="closeForm()"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        }

        <div class="row g-4">
          <!-- Add New Address Card -->
          <div class="col-lg-4 col-md-6">
            <div
              class="add-address-card h-100 d-flex flex-column align-items-center justify-content-center p-4 border-dashed rounded-3 cursor-pointer"
              (click)="openAddModal()"
            >
              <mat-icon class="large-icon text-muted">add</mat-icon>
              <h4 class="text-muted fw-bold">Add Address</h4>
            </div>
          </div>

          <!-- Existing Address Cards -->
          @for (addr of addresses(); track addr.id) {
            <div class="col-lg-4 col-md-6">
              <div
                class="address-card h-100 p-4 border rounded-3 position-relative"
                [class.border-primary]="addr.isDefault"
              >
                @if (addr.isDefault) {
                  <span class="default-badge">Default</span>
                }
                <div class="address-details">
                  <h5 class="fw-bold mb-2">{{ addr.fullName }}</h5>
                  <p class="mb-1 text-muted">{{ addr.street }}</p>
                  <p class="mb-1 text-muted">{{ addr.city }}</p>
                  <p class="mb-3 text-muted">Phone: {{ addr.phone }}</p>
                </div>
                <div class="address-actions mt-auto border-top pt-3 d-flex gap-3">
                  <button
                    class="btn btn-link p-0 text-primary text-decoration-none small"
                    (click)="editAddress(addr)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-link p-0 text-danger text-decoration-none small"
                    (click)="removeAddress(addr.id)"
                  >
                    Remove
                  </button>
                  @if (!addr.isDefault) {
                    <button
                      class="btn btn-link p-0 text-muted text-decoration-none small"
                      (click)="setAsDefault(addr.id)"
                    >
                      Set as Default
                    </button>
                  }
                </div>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .addresses-container {
        background: #fcfcfc;
        min-height: 80vh;

        .breadcrumb {
          font-size: 0.85rem;
        }

        .border-dashed {
          border: 2px dashed #ddd;
          transition: all 0.2s;
          &:hover {
            background: #f0f0f0;
            border-color: #6c5ce7;
          }
        }

        .cursor-pointer {
          cursor: pointer;
        }

        .large-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
        }

        .address-card {
          background: #fff;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s;
          &:hover {
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
          }

          .default-badge {
            position: absolute;
            top: 0;
            right: 20px;
            background: #6c5ce7;
            color: #fff;
            padding: 2px 12px;
            border-radius: 0 0 8px 8px;
            font-size: 0.75rem;
            font-weight: 600;
          }
        }

        .btn-link {
          font-weight: 600;
          &:hover {
            opacity: 0.8;
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      }
    `,
  ],
})
export class Addresses {
  addresses = signal<Address[]>([
    {
      id: 1,
      fullName: 'Ahmed Khaled',
      street: '123 Main St, Apartment 4B',
      city: 'Cairo, Egypt',
      phone: '+20 123 456 789',
      isDefault: true,
    },
    {
      id: 2,
      fullName: 'Ahmed Khaled',
      street: '456 Secondary Rd',
      city: 'Alexandria, Egypt',
      phone: '+20 987 654 321',
      isDefault: false,
    },
  ]);

  showForm = signal(false);
  isEditing = signal(false);
  currentModel: Address = this.getEmptyModel();

  private getEmptyModel(): Address {
    return { id: 0, fullName: '', street: '', city: '', phone: '', isDefault: false };
  }

  openAddModal() {
    this.isEditing.set(false);
    this.currentModel = this.getEmptyModel();
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
  }

  editAddress(addr: Address) {
    this.isEditing.set(true);
    this.currentModel = { ...addr };
    this.showForm.set(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  saveAddress() {
    if (this.isEditing()) {
      this.addresses.update((prev) =>
        prev.map((a) => (a.id === this.currentModel.id ? this.currentModel : a)),
      );
    } else {
      const newAddress = { ...this.currentModel, id: Date.now() };
      this.addresses.update((prev) => [...prev, newAddress]);
    }
    this.closeForm();
  }

  removeAddress(id: number) {
    if (confirm('Are you sure you want to remove this address?')) {
      this.addresses.update((prev) => prev.filter((a) => a.id !== id));
    }
  }

  setAsDefault(id: number) {
    this.addresses.update((prev) =>
      prev.map((a) => ({
        ...a,
        isDefault: a.id === id,
      })),
    );
  }
}
