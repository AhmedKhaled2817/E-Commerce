import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Products } from '../Models/products';
import { ProductCategoryOverride, ShopCategoryView, StoreCategory } from '../Models/store-category';
import type { mainCategory } from '../Models/products';

const STORAGE_CATS = 'app_store_categories';
const STORAGE_OVERRIDES = 'app_category_product_overrides';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoriesSubject = new BehaviorSubject<StoreCategory[]>(this.loadCategories());
  categories$ = this.categoriesSubject.asObservable();

  private overridesSubject = new BehaviorSubject<Record<number, ProductCategoryOverride>>(
    this.loadOverrides(),
  );
  overrides$ = this.overridesSubject.asObservable();

  constructor() {
    this.listenToStorageChanges();
  }

  private listenToStorageChanges(): void {
    fromEvent<StorageEvent>(window, 'storage')
      .pipe(
        filter((event) => event.key === STORAGE_CATS || event.key === STORAGE_OVERRIDES),
        map(() => ({
          cats: this.loadCategories(),
          overs: this.loadOverrides(),
        })),
      )
      .subscribe((next) => {
        this.categoriesSubject.next(next.cats);
        this.overridesSubject.next(next.overs);
      });
  }

  /** Merge API-derived categories into the store (new subCategories only) */
  syncFromProducts(products: Products[]): void {
    const current = [...this.categoriesSubject.value];
    let changed = false;
    const keys = new Set(current.map((c) => this.keyOf(c.mainCategory, c.subCategory)));

    for (const p of products) {
      const k = this.keyOf(p.mainCategory, p.subCategory);
      if (keys.has(k)) continue;
      keys.add(k);
      const exists = current.find(
        (c) => c.mainCategory === p.mainCategory && c.subCategory === p.subCategory,
      );
      if (!exists) {
        current.push({
          id: `seed-${k.replace(/[^a-zA-Z0-9]/g, '-')}-${Date.now()}`,
          mainCategory: p.mainCategory,
          subCategory: p.subCategory,
          displayName: p.subCategory,
          weight: 0,
          imageUrl: p.images[0] ?? '',
          isActive: true,
        });
        changed = true;
      }
    }
    if (changed) {
      this.persistCategories(current);
    }
  }

  getProductOverride(productId: number): ProductCategoryOverride | undefined {
    return this.overridesSubject.value[productId];
  }

  setProductOverride(productId: number, main: mainCategory, sub: string): void {
    const next = {
      ...this.overridesSubject.value,
      [productId]: { mainCategory: main, subCategory: sub },
    };
    this.persistOverrides(next);
  }

  removeProductOverride(productId: number): void {
    const next = { ...this.overridesSubject.value };
    delete next[productId];
    this.persistOverrides(next);
  }

  /** Same main + subCategory as another row (excluding id) */
  hasDuplicate(main: mainCategory, sub: string, excludeId?: string): boolean {
    const t = sub.trim();
    return this.categoriesSubject.value.some(
      (c) =>
        c.mainCategory === main && c.subCategory.trim() === t && (!excludeId || c.id !== excludeId),
    );
  }

  upsertCategory(cat: StoreCategory): void {
    const current = [...this.categoriesSubject.value];
    const idx = current.findIndex((c) => c.id === cat.id);
    if (idx >= 0) {
      current[idx] = cat;
    } else {
      current.push(cat);
    }
    this.persistCategories(current);
  }

  deleteCategory(id: string): void {
    const current = this.categoriesSubject.value.filter((c) => c.id !== id);
    this.persistCategories(current);
  }

  /** Sorted list for homepage — only active */
  buildShopCategories(products: Products[]): ShopCategoryView[] {
    const cats = [...this.categoriesSubject.value]
      .filter((c) => c.isActive)
      .sort((a, b) => b.weight - a.weight);

    return cats.map((c) => ({
      displayName: c.displayName,
      subCategory: c.subCategory,
      imageUrl:
        c.imageUrl ||
        products.find((p) => p.subCategory === c.subCategory && p.mainCategory === c.mainCategory)
          ?.images[0] ||
        'https://placehold.co/400x300?text=Category',
    }));
  }

  snapshotCategories(): StoreCategory[] {
    return this.categoriesSubject.value;
  }

  private keyOf(main: mainCategory, sub: string): string {
    return `${main}|${sub}`;
  }

  private loadCategories(): StoreCategory[] {
    const raw = localStorage.getItem(STORAGE_CATS);
    return raw ? (JSON.parse(raw) as StoreCategory[]) : [];
  }

  private loadOverrides(): Record<number, ProductCategoryOverride> {
    const raw = localStorage.getItem(STORAGE_OVERRIDES);
    return raw ? (JSON.parse(raw) as Record<number, ProductCategoryOverride>) : {};
  }

  private persistCategories(cats: StoreCategory[]): void {
    this.categoriesSubject.next(cats);
    localStorage.setItem(STORAGE_CATS, JSON.stringify(cats));
  }

  private persistOverrides(o: Record<number, ProductCategoryOverride>): void {
    this.overridesSubject.next(o);
    localStorage.setItem(STORAGE_OVERRIDES, JSON.stringify(o));
  }
}
