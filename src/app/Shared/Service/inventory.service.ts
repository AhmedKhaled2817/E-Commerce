import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AdminProduct } from '../Models/admin-product';
import { Products } from '../Models/products';
import { CartItem } from 'app/public/cart/cart-item';
import { AuditLogService } from './audit-log.service';

@Injectable({
  providedIn: 'root',
})
export class InventoryService {
  private readonly storageKey = 'admin_inventory';
  /** New catalog rows get this stock until admin changes it */
  readonly defaultStockForNewProduct = 50;
  private readonly lowStockThreshold = 5;
  private readonly itemsSubject = new BehaviorSubject<AdminProduct[]>(this.loadItems());
  items$ = this.itemsSubject.asObservable();

  constructor(private auditLogService: AuditLogService) {}

  /**
   * Align inventory rows with API catalog (real product ids). Adds missing products; updates title/price for display.
   */
  syncFromCatalog(products: Products[]): void {
    if (!products?.length) return;
    const current = [...this.itemsSubject.value];
    let changed = false;
    for (const p of products) {
      const idx = current.findIndex((item) => item.id === p.id);
      const status = this.toStatus(
        idx >= 0 ? current[idx].stockQuantity : this.defaultStockForNewProduct,
      );
      if (idx === -1) {
        current.push({
          id: p.id,
          name: p.title,
          price: p.price,
          stockQuantity: this.defaultStockForNewProduct,
          sold: 0,
          status,
        });
        changed = true;
      } else {
        const row = current[idx];
        if (row.name !== p.title || row.price !== p.price) {
          current[idx] = { ...row, name: p.title, price: p.price, status: this.toStatus(row.stockQuantity) };
          changed = true;
        }
      }
    }
    if (changed) {
      this.persist(current);
    }
  }

  /** Ensure a single product (e.g. product details page) has an inventory row */
  ensureProduct(product: Products): void {
    this.syncFromCatalog([product]);
  }

  getAvailableStock(productId: number): number {
    const row = this.itemsSubject.value.find((item) => item.id === productId);
    return row ? row.stockQuantity : this.defaultStockForNewProduct;
  }

  getRow(productId: number): AdminProduct | undefined {
    return this.itemsSubject.value.find((item) => item.id === productId);
  }

  /** True if cart line quantity can be at most `quantity` */
  canAddToCart(productId: number, quantity: number): boolean {
    return quantity <= this.getAvailableStock(productId);
  }

  upsert(product: Omit<AdminProduct, 'status'>): void {
    const status = this.toStatus(product.stockQuantity);
    const next: AdminProduct = { ...product, status };
    const current = this.itemsSubject.value;
    const idx = current.findIndex((item) => item.id === product.id);
    const updated = [...current];

    if (idx >= 0) {
      updated[idx] = next;
      this.auditLogService.addLog({
        actor: 'Admin',
        action: 'updated product inventory',
        entity: 'product',
        entityId: next.id.toString(),
      });
    } else {
      updated.push(next);
      this.auditLogService.addLog({
        actor: 'Admin',
        action: 'created product inventory',
        entity: 'product',
        entityId: next.id.toString(),
      });
    }

    this.persist(updated);
  }

  remove(id: number): void {
    const updated = this.itemsSubject.value.filter((item) => item.id !== id);
    this.persist(updated);
    this.auditLogService.addLog({
      actor: 'Admin',
      action: 'deleted product',
      entity: 'product',
      entityId: id.toString(),
    });
  }

  /** Decrement stock after a successful order */
  commitOrder(items: CartItem[]): boolean {
    const snapshot = [...this.itemsSubject.value];
    for (const line of items) {
      const idx = snapshot.findIndex((row) => row.id === line.id);
      const stock = idx >= 0 ? snapshot[idx].stockQuantity : this.defaultStockForNewProduct;
      if (stock < line.quantity) {
        return false;
      }
    }
    for (const line of items) {
      const idx = snapshot.findIndex((row) => row.id === line.id);
      if (idx === -1) {
        snapshot.push({
          id: line.id,
          name: line.name,
          price: typeof line.price === 'string' ? parseFloat(line.price) || 0 : Number(line.price),
          stockQuantity: this.defaultStockForNewProduct - line.quantity,
          sold: line.quantity,
          status: this.toStatus(this.defaultStockForNewProduct - line.quantity),
        });
        continue;
      }
      const row = snapshot[idx];
      const nextQty = row.stockQuantity - line.quantity;
      snapshot[idx] = {
        ...row,
        stockQuantity: nextQty,
        sold: row.sold + line.quantity,
        status: this.toStatus(nextQty),
      };
    }
    this.persist(snapshot);
    return true;
  }

  /** Put stock back when an order is cancelled */
  restoreForOrderItems(items: CartItem[]): void {
    const snapshot = [...this.itemsSubject.value];
    for (const line of items) {
      const idx = snapshot.findIndex((row) => row.id === line.id);
      if (idx === -1) continue;
      const row = snapshot[idx];
      const nextQty = row.stockQuantity + line.quantity;
      const nextSold = Math.max(0, row.sold - line.quantity);
      snapshot[idx] = {
        ...row,
        stockQuantity: nextQty,
        sold: nextSold,
        status: this.toStatus(nextQty),
      };
    }
    this.persist(snapshot);
  }

  private persist(items: AdminProduct[]): void {
    this.itemsSubject.next(items);
    localStorage.setItem(this.storageKey, JSON.stringify(items));
  }

  private loadItems(): AdminProduct[] {
    const stored = localStorage.getItem(this.storageKey);
    if (!stored) {
      return [];
    }
    return (JSON.parse(stored) as AdminProduct[]).map((item) => ({
      ...item,
      status: this.toStatus(item.stockQuantity),
    }));
  }

  private toStatus(stockQuantity: number): AdminProduct['status'] {
    if (stockQuantity <= 0) return 'out_of_stock';
    if (stockQuantity <= this.lowStockThreshold) return 'low_stock';
    return 'in_stock';
  }
}
