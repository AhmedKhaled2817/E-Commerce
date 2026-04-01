import { mainCategory } from './products';

/** Persisted category — subCategory is the same key used in Products & routing */
export interface StoreCategory {
  id: string;
  mainCategory: mainCategory;
  /** Must match Products.subCategory (used in filters & /products/:category) */
  subCategory: string;
  /** Shown in Shop by Categories */
  displayName: string;
  weight: number;
  imageUrl: string;
  isActive: boolean;
}

export interface ProductCategoryOverride {
  mainCategory: mainCategory;
  subCategory: string;
}

/** Passed to category cards & mega menu */
export interface ShopCategoryView {
  displayName: string;
  imageUrl: string;
  /** Route param for /public/products/:category */
  subCategory: string;
}
