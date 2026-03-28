import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-coupons',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="coupons-container py-5">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a routerLink="/public/profile" class="text-decoration-none text-muted"
                >Your Account</a
              >
            </li>
            <li class="breadcrumb-item active">Your Coupons</li>
          </ol>
        </nav>

        <h1 class="fw-bold mb-4">Your Active Coupons</h1>

        <div class="row g-4">
          <!-- Coupon 1 -->
          <div class="col-md-6">
            <div class="coupon-card d-flex border rounded-3 overflow-hidden shadow-sm">
              <div class="coupon-left bg-primary text-white p-4 d-flex flex-column align-items-center justify-content-center">
                <span class="h2 fw-bold mb-0">20%</span>
                <span class="small opacity-75 text-uppercase">OFF</span>
              </div>
              <div class="coupon-right bg-white p-4 flex-grow-1 position-relative">
                <h5 class="fw-bold mb-1">Welcome Discount</h5>
                <p class="text-muted small mb-3">Valid on all fashion items above $50.</p>
                <div class="d-flex justify-content-between align-items-center">
                  <code class="px-3 py-1 bg-light border rounded text-primary fw-bold">WELCOME20</code>
                  <span class="text-muted extra-small">Expires: 30 Mar 2026</span>
                </div>
                <div class="card-dots"></div>
              </div>
            </div>
          </div>

          <!-- Coupon 2 -->
          <div class="col-md-6">
            <div class="coupon-card d-flex border rounded-3 overflow-hidden shadow-sm opacity-75">
              <div class="coupon-left bg-success text-white p-4 d-flex flex-column align-items-center justify-content-center">
                <span class="h2 fw-bold mb-0">$10</span>
                <span class="small opacity-75 text-uppercase">CASHBACK</span>
              </div>
              <div class="coupon-right bg-white p-4 flex-grow-1 position-relative">
                <h5 class="fw-bold mb-1">First Order Special</h5>
                <p class="text-muted small mb-3">Get $10 cashback on your very first purchase.</p>
                <div class="d-flex justify-content-between align-items-center">
                  <code class="px-3 py-1 bg-light border rounded text-success fw-bold">FIRST10</code>
                  <span class="badge bg-secondary extra-small">Used</span>
                </div>
                <div class="card-dots"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .coupons-container {
      background: #fcfcfc;
      min-height: 80vh;
      .coupon-card {
        height: 140px;
        .coupon-left {
          min-width: 100px;
          border-right: 2px dashed rgba(255,255,255,0.3);
        }
        .coupon-right {
          .card-dots {
            position: absolute;
            left: -5px;
            top: 10%;
            height: 80%;
            width: 10px;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            &::before, &::after {
              content: '';
              width: 10px;
              height: 10px;
              background: #fcfcfc;
              border-radius: 50%;
              border: 1px solid #dee2e6;
            }
          }
        }
      }
      .extra-small { font-size: 0.7rem; }
    }
  `]
})
export class Coupons {}
