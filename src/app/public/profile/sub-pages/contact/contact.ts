import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <div class="contact-container py-5">
      <div class="container">
        <!-- Dynamic Breadcrumb: only show if coming from profile -->
        @if (router.url.includes('profile')) {
          <nav aria-label="breadcrumb" class="mb-4">
            <ol class="breadcrumb">
              <li class="breadcrumb-item">
                <a routerLink="/public/profile" class="text-decoration-none text-muted"
                  >Your Account</a
                >
              </li>
              <li class="breadcrumb-item active">Contact Us</li>
            </ol>
          </nav>
        }

        <h1 class="fw-bold mb-4 text-center">How can we help you?</h1>

        <div class="row g-4 mt-2">
          <!-- Help Cards -->
          <div class="col-md-4">
            <div class="help-card p-4 border rounded-3 text-center h-100 shadow-sm-hover">
              <mat-icon class="large-icon text-primary">local_shipping</mat-icon>
              <h5 class="fw-bold mt-3">Where's my order?</h5>
              <p class="text-muted small">
                Track your packages in real-time or check order history.
              </p>
              <button class="btn btn-outline-primary btn-sm" routerLink="/public/orders">
                Track Order
              </button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="help-card p-4 border rounded-3 text-center h-100 shadow-sm-hover">
              <mat-icon class="large-icon text-primary">assignment_return</mat-icon>
              <h5 class="fw-bold mt-3">Returns & Refunds</h5>
              <p class="text-muted small">
                Learn about our return policies or start a return request.
              </p>
              <button class="btn btn-outline-primary btn-sm">Start Return</button>
            </div>
          </div>
          <div class="col-md-4">
            <div class="help-card p-4 border rounded-3 text-center h-100 shadow-sm-hover">
              <mat-icon class="large-icon text-primary">chat</mat-icon>
              <h5 class="fw-bold mt-3">Chat with Us</h5>
              <p class="text-muted small">Our support team is available 24/7 for your questions.</p>
              <button class="btn btn-primary btn-sm">Start Chat</button>
            </div>
          </div>
        </div>

        <!-- FAQs Section -->
        <div class="mt-5 pt-5">
          <h3 class="fw-bold mb-4">Frequently Asked Questions</h3>
          <div class="accordion" id="faqAccordion">
            <div class="accordion-item border-0 mb-3 shadow-sm rounded-3 overflow-hidden">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq1"
                >
                  How do I cancel my order?
                </button>
              </h2>
              <div id="faq1" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  You can cancel your order within 30 minutes of purchase from the "Your Orders"
                  page.
                </div>
              </div>
            </div>
            <div class="accordion-item border-0 mb-3 shadow-sm rounded-3 overflow-hidden">
              <h2 class="accordion-header">
                <button
                  class="accordion-button collapsed fw-bold"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#faq2"
                >
                  What payment methods do you accept?
                </button>
              </h2>
              <div id="faq2" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
                <div class="accordion-body text-muted">
                  We accept Visa, Mastercard, and Cash on Delivery in select regions.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .contact-container {
        background: #fcfcfc;
        min-height: 80vh;
        .large-icon {
          font-size: 48px;
          width: 48px;
          height: 48px;
          margin-bottom: 10px;
        }
        .help-card {
          background: #fff;
          transition: all 0.3s ease;
          border-color: #eee !important;
          &:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
            border-color: #6c5ce7 !important;
          }
        }
        .accordion-item {
          background: #fff;
          .accordion-button {
            &:not(.collapsed) {
              background-color: rgba(108, 92, 231, 0.05);
              color: #6c5ce7;
            }
            &:focus {
              box-shadow: none;
            }
          }
        }
      }
    `,
  ],
})
export class Contact {
  protected readonly router = inject(Router);
}
