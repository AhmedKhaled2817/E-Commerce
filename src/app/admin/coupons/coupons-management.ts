import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CouponService } from 'app/Shared/Service/coupon.service';

@Component({
  selector: 'app-coupons-management',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Coupons</h2>
    <form [formGroup]="form" (ngSubmit)="save()" class="grid">
      <input type="text" formControlName="code" placeholder="Code" />
      <input type="number" formControlName="discountPercent" placeholder="Discount %" />
      <input type="date" formControlName="expiresAt" />
      <input type="number" formControlName="usageLimit" placeholder="Usage limit" />
      <button type="submit">Save Coupon</button>
    </form>
    <ul>
      @for (coupon of (coupons$ | async); track coupon.code) {
        <li>{{ coupon.code }} - {{ coupon.discountPercent }}% - exp: {{ coupon.expiresAt }}</li>
      } @empty {
        <li>No coupons yet.</li>
      }
    </ul>
  `,
  styles: [
    `
      .grid {
        display: grid;
        grid-template-columns: repeat(5, minmax(0, 1fr));
        gap: 8px;
        margin-bottom: 12px;
      }
      input,
      button {
        padding: 8px;
      }
    `,
  ],
})
export class CouponsManagement {
  private couponService = inject(CouponService);
  private fb = inject(FormBuilder);
  coupons$ = this.couponService.coupons$;
  form = this.fb.group({
    code: ['', [Validators.required]],
    discountPercent: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
    expiresAt: ['', [Validators.required]],
    usageLimit: [1, [Validators.required, Validators.min(1)]],
  });

  save(): void {
    if (this.form.invalid) return;
    const value = this.form.getRawValue();
    this.couponService.save({
      code: value.code ?? '',
      discountPercent: value.discountPercent ?? 0,
      expiresAt: value.expiresAt ?? '',
      usageLimit: value.usageLimit ?? 1,
      usedCount: 0,
    });
    this.form.reset({ code: '', discountPercent: 0, expiresAt: '', usageLimit: 1 });
  }
}
