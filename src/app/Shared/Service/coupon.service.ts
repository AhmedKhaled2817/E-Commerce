import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Coupon } from '../Models/coupon';
import { AuditLogService } from './audit-log.service';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  private readonly storageKey = 'coupons';
  private readonly couponsSubject = new BehaviorSubject<Coupon[]>(this.loadCoupons());
  coupons$ = this.couponsSubject.asObservable();

  constructor(private auditLogService: AuditLogService) {}

  save(coupon: Coupon): void {
    const current = this.couponsSubject.value;
    const idx = current.findIndex((item) => item.code === coupon.code);
    const updated = [...current];
    if (idx >= 0) {
      updated[idx] = coupon;
    } else {
      updated.push(coupon);
    }
    this.persist(updated);
    this.auditLogService.addLog({
      actor: 'Admin',
      action: 'saved coupon',
      entity: 'coupon',
      entityId: coupon.code,
    });
  }

  private loadCoupons(): Coupon[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? (JSON.parse(stored) as Coupon[]) : [];
  }

  private persist(coupons: Coupon[]): void {
    this.couponsSubject.next(coupons);
    localStorage.setItem(this.storageKey, JSON.stringify(coupons));
  }
}
