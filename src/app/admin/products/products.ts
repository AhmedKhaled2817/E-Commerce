import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { InventoryService } from 'app/Shared/Service/inventory.service';
import { ProductsService } from 'app/Shared/Service/products-service';
import { AdminProduct } from 'app/Shared/Models/admin-product';
import { Products as CatalogProduct } from 'app/Shared/Models/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private inventoryService = inject(InventoryService);
  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);

  /** Catalog from API + stock rows (same product ids customers use) */
  rows$: Observable<{ product: CatalogProduct; inv: AdminProduct }[]>;

  selected: { product: CatalogProduct; inv: AdminProduct } | null = null;

  form = this.fb.group({
    stockQuantity: [0, [Validators.required, Validators.min(0)]],
  });

  constructor() {
    this.rows$ = combineLatest([
      this.productsService.getAllProducts(),
      this.inventoryService.items$,
    ]).pipe(
      tap(([products]) => this.inventoryService.syncFromCatalog(products)),
      map(([products, inv]) => {
        const mapById = new Map(inv.map((row) => [row.id, row]));
        return products.map((product: CatalogProduct) => {
          const row = mapById.get(product.id);
          const invRow: AdminProduct =
            row ??
            ({
              id: product.id,
              name: product.title,
              price: product.price,
              stockQuantity: this.inventoryService.defaultStockForNewProduct,
              sold: 0,
              status: 'in_stock',
            } as AdminProduct);
          return { product, inv: invRow };
        });
      }),
    );
  }

  edit(row: { product: CatalogProduct; inv: AdminProduct }): void {
    this.selected = row;
    this.form.patchValue({ stockQuantity: row.inv.stockQuantity });
  }

  cancelEdit(): void {
    this.selected = null;
    this.form.reset({ stockQuantity: 0 });
  }

  save(): void {
    if (this.form.invalid || !this.selected) return;
    const stockQuantity = this.form.get('stockQuantity')!.value as number;
    const { product } = this.selected;
    const inv = this.inventoryService.getRow(product.id) ?? this.selected.inv;
    this.inventoryService.upsert({
      id: product.id,
      name: product.title,
      price: product.price,
      stockQuantity,
      sold: inv.sold,
    });
    this.cancelEdit();
  }

  remove(id: number): void {
    this.inventoryService.remove(id);
    if (this.selected?.product.id === id) {
      this.cancelEdit();
    }
  }
}
