import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ProfileService } from '../../../../Shared/Service/profile.service';

@Component({
  selector: 'app-prime',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="prime-container py-5">
      <div class="container">
        <nav aria-label="breadcrumb" class="mb-4">
          <ol class="breadcrumb">
            <li class="breadcrumb-item">
              <a routerLink="/public/profile" class="text-decoration-none text-muted"
                >Your Account</a
              >
            </li>
            <li class="breadcrumb-item active">Prime Membership</li>
          </ol>
        </nav>

        <!-- Prime Hero -->
        <div class="prime-hero p-5 rounded-4 text-white mb-5 shadow-lg position-relative overflow-hidden">
          <div class="row align-items-center position-relative" style="z-index: 2;">
            <div class="col-lg-8">
              <h1 class="fw-bold mb-3 display-4">
                {{ userProfile().isPrime ? 'Enjoy Your Prime Benefits!' : 'Join WearHouse Prime' }}
              </h1>
              <p class="lead opacity-75 mb-4">
                Get free delivery, exclusive deals, and premium support on every order.
              </p>
              @if (!userProfile().isPrime) {
                <button class="btn btn-warning btn-lg px-5 fw-bold" (click)="joinPrime()">
                  Start 30-day Free Trial
                </button>
              } @else {
                <div class="d-flex gap-3">
                  <span class="badge bg-success px-3 py-2">Active Plan</span>
                  <span class="opacity-75">Next billing: April 28, 2026</span>
                </div>
              }
            </div>
            <div class="col-lg-4 d-none d-lg-block text-center">
              <mat-icon class="huge-icon text-warning">workspace_premium</mat-icon>
            </div>
          </div>
          <div class="hero-bg-accent"></div>
        </div>

        <!-- Benefits Grid -->
        <h3 class="fw-bold mb-4">Included with Prime</h3>
        <div class="row g-4">
          <div class="col-md-4">
            <div class="benefit-card p-4 border rounded-3 h-100 shadow-sm-hover">
              <div class="icon-circle bg-primary-subtle text-primary mb-3">
                <mat-icon>local_shipping</mat-icon>
              </div>
              <h5 class="fw-bold">Fast & Free Delivery</h5>
              <p class="text-muted small mb-0">Millions of items delivered to your doorstep at no extra cost.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="benefit-card p-4 border rounded-3 h-100 shadow-sm-hover">
              <div class="icon-circle bg-success-subtle text-success mb-3">
                <mat-icon>local_offer</mat-icon>
              </div>
              <h5 class="fw-bold">Exclusive Deals</h5>
              <p class="text-muted small mb-0">Access early-bird deals and special discounts only for Prime members.</p>
            </div>
          </div>
          <div class="col-md-4">
            <div class="benefit-card p-4 border rounded-3 h-100 shadow-sm-hover">
              <div class="icon-circle bg-info-subtle text-info mb-3">
                <mat-icon>headset_mic</mat-icon>
              </div>
              <h5 class="fw-bold">Priority Support</h5>
              <p class="text-muted small mb-0">Skip the queue with 24/7 priority customer service and live chat.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .prime-container {
      background: #fcfcfc;
      min-height: 80vh;
      .prime-hero {
        background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%);
        .huge-icon {
          font-size: 160px;
          width: 160px;
          height: 160px;
          opacity: 0.3;
        }
        .hero-bg-accent {
          position: absolute;
          top: -20%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          filter: blur(80px);
        }
      }
      .benefit-card {
        background: #fff;
        transition: all 0.3s ease;
        border-color: #eee !important;
        &:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.05);
          border-color: #3b82f6 !important;
        }
        .icon-circle {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          mat-icon { font-size: 24px; }
        }
      }
    }
  `]
})
export class Prime {
  private profileService = inject(ProfileService);
  userProfile = this.profileService.userProfile;

  joinPrime() {
    const updated = { ...this.userProfile(), isPrime: true };
    this.profileService.updateProfile(updated);
    alert('Welcome to WearHouse Prime!');
  }
}
