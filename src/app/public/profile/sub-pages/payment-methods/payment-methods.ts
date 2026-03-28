import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface PaymentCard {
  id: number;
  type: 'visa' | 'mastercard';
  last4: string;
  expiry: string;
  isDefault: boolean;
}

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule, FormsModule],
  template: `
    <div class="payment-container py-5">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a routerLink="/public/profile" class="text-decoration-none text-muted"
                >Your Account</a
              >
            </li>
            <li class="breadcrumb-item active">Payment Options</li>
          </ol>
        </nav>

        <h1 class="fw-bold mb-4">Your Payment Options</h1>

        <div class="row g-4">
          @for (card of cards(); track card.id) {
            <div class="col-lg-4 col-md-6">
              <div
                class="card h-100 p-4 border rounded-3 payment-card shadow-sm"
                [class.border-warning]="card.isDefault"
              >
                <div class="d-flex justify-content-between align-items-start mb-4">
                  <div class="card-type">
                    <img
                      [src]="
                        card.type === 'visa'
                          ? 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
                          : 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg'
                      "
                      [alt]="card.type"
                      height="24"
                    />
                  </div>
                  @if (card.isDefault) {
                    <span class="badge bg-warning text-dark px-2 py-1">Default</span>
                  }
                </div>
                <div class="card-number mb-2">
                  <h4 class="fw-bold">**** **** **** {{ card.last4 }}</h4>
                </div>
                <div class="card-footer-info d-flex justify-content-between text-muted small">
                  <span>Expires: {{ card.expiry }}</span>
                  <div class="actions d-flex gap-3">
                    <button
                      class="btn btn-link p-0 text-danger text-decoration-none small"
                      (click)="removeCard(card.id)"
                    >
                      Remove
                    </button>
                    @if (!card.isDefault) {
                      <button
                        class="btn btn-link p-0 text-primary text-decoration-none small"
                        (click)="setAsDefault(card.id)"
                      >
                        Default
                      </button>
                    }
                  </div>
                </div>
              </div>
            </div>
          }
          <div class="col-lg-4 col-md-6">
            <div
              class="add-card h-100 d-flex flex-column align-items-center justify-content-center p-4 border-dashed rounded-3 cursor-pointer"
              (click)="showAddForm.set(true)"
            >
              <mat-icon class="large-icon text-muted">add_card</mat-icon>
              <h5 class="text-muted fw-bold mt-2">Add Payment Method</h5>
            </div>
          </div>
        </div>

        <!-- Add Payment Method Modal/Overlay -->
        @if (showAddForm()) {
          <div class="modal-overlay animate-fade-in">
            <div class="modal-card p-4 shadow-lg border rounded-4 bg-white">
              <div class="d-flex justify-content-between align-items-center mb-4">
                <h3 class="fw-bold mb-0">Add New Card</h3>
                <button class="btn-close" (click)="showAddForm.set(false)"></button>
              </div>

              <div class="row g-3">
                <div class="col-12">
                  <label class="form-label small fw-bold text-muted">Card Type</label>
                  <select class="form-select" [(ngModel)]="newCard.type">
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                  </select>
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-muted"
                    >Card Number (Last 4 digits)</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    maxlength="4"
                    [(ngModel)]="newCard.last4"
                    placeholder="e.g. 1234"
                  />
                </div>
                <div class="col-6">
                  <label class="form-label small fw-bold text-muted">Expiry Date</label>
                  <input
                    type="text"
                    class="form-control"
                    [(ngModel)]="newCard.expiry"
                    placeholder="MM/YY"
                  />
                </div>
                <div class="col-12 mt-4">
                  <button class="btn btn-primary w-100 py-2 fw-bold" (click)="saveNewCard()">
                    Add Card
                  </button>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      .payment-container {
        background: #fcfcfc;
        min-height: 80vh;
        .breadcrumb {
          font-size: 0.85rem;
        }
        .payment-card {
          background: #fff;
          transition: transform 0.2s;
          &:hover {
            transform: translateY(-5px);
          }
        }
        .border-dashed {
          border: 2px dashed #ddd;
          &:hover {
            background: #f0f0f0;
            border-color: #6c5ce7;
          }
        }
        .cursor-pointer {
          cursor: pointer;
        }
        .large-icon {
          font-size: 40px;
          width: 40px;
          height: 40px;
        }
        .btn-link {
          font-weight: 600;
          font-size: 0.8rem;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .modal-card {
          width: 100%;
          max-width: 400px;
        }
      }
    `,
  ],
})
export class PaymentMethods {
  cards = signal<PaymentCard[]>([
    { id: 1, type: 'visa', last4: '4242', expiry: '12/26', isDefault: true },
    { id: 2, type: 'mastercard', last4: '8888', expiry: '05/25', isDefault: false },
  ]);

  showAddForm = signal(false);
  newCard: Partial<PaymentCard> = {
    type: 'visa',
    last4: '',
    expiry: '',
  };

  removeCard(id: number) {
    if (confirm('Remove this card?')) {
      this.cards.update((prev) => prev.filter((c) => c.id !== id));
    }
  }

  setAsDefault(id: number) {
    this.cards.update((prev) => prev.map((c) => ({ ...c, isDefault: c.id === id })));
  }

  saveNewCard() {
    if (this.newCard.last4 && this.newCard.expiry) {
      const card: PaymentCard = {
        id: Date.now(),
        type: this.newCard.type as 'visa' | 'mastercard',
        last4: this.newCard.last4,
        expiry: this.newCard.expiry,
        isDefault: false,
      };
      this.cards.update((prev) => [...prev, card]);
      this.showAddForm.set(false);
      this.newCard = { type: 'visa', last4: '', expiry: '' };
    }
  }
}
