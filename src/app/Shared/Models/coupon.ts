export interface Coupon {
  code: string;
  discountPercent: number;
  expiresAt: string;
  usageLimit: number;
  usedCount: number;
}
