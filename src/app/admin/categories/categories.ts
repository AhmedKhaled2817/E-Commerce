import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from 'app/Shared/Service/category.service';
import { ProductsService } from 'app/Shared/Service/products-service';
import { StoreCategory } from 'app/Shared/Models/store-category';
import { mainCategory } from 'app/Shared/Models/products';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.scss',
})
export class Categories {
  protected categoryService = inject(CategoryService);
  private productsService = inject(ProductsService);
  private fb = inject(FormBuilder);
  private toastr = inject(ToastrService);

  mains: mainCategory[] = ['Women', 'Men', 'Kids', 'Footwear'];

  categories$ = this.categoryService.categories$;
  products$ = this.productsService.getAllProducts();

  catForm = this.fb.group({
    id: [''],
    mainCategory: ['Women' as mainCategory, Validators.required],
    subCategory: ['', Validators.required],
    displayName: ['', Validators.required],
    imageUrl: [''],
    weight: [10, [Validators.required, Validators.min(0)]],
    isActive: [true],
  });

  assignForm = this.fb.group({
    productId: [null as number | null, Validators.required],
    categoryId: ['', Validators.required],
  });

  editingId: string | null = null;

  startAdd(): void {
    this.editingId = null;
    this.catForm.reset({
      id: '',
      mainCategory: 'Women',
      subCategory: '',
      displayName: '',
      imageUrl: '',
      weight: 10,
      isActive: true,
    });
  }

  startEdit(cat: StoreCategory): void {
    this.editingId = cat.id;
    this.catForm.patchValue(cat);
  }

  saveCategory(): void {
    if (this.catForm.invalid) return;
    const v = this.catForm.getRawValue();
    const id = (v.id?.trim() || `cat-${Date.now()}`) as string;
    const main = v.mainCategory as mainCategory;
    const sub = (v.subCategory ?? '').trim();
    const displayName = (v.displayName ?? '').trim();
    if (!sub || !displayName) return;

    if (this.categoryService.hasDuplicate(main, sub, this.editingId ?? undefined)) {
      this.toastr.error('A category with this main branch and sub-category key already exists.');
      return;
    }

    this.categoryService.upsertCategory({
      id,
      mainCategory: main,
      subCategory: sub,
      displayName,
      imageUrl: (v.imageUrl ?? '').trim(),
      weight: Number(v.weight),
      isActive: !!v.isActive,
    });
    this.toastr.success('Category saved');
    this.startAdd();
  }

  delete(cat: StoreCategory): void {
    if (!confirm(`Delete category "${cat.displayName}"?`)) return;
    this.categoryService.deleteCategory(cat.id);
    if (this.editingId === cat.id) this.startAdd();
    this.toastr.success('Category removed');
  }

  assignProduct(): void {
    if (this.assignForm.invalid) return;
    const { productId, categoryId } = this.assignForm.getRawValue();
    const cat = this.categoryService.snapshotCategories().find((c) => c.id === categoryId);
    if (!cat || productId == null) return;
    this.categoryService.setProductOverride(productId, cat.mainCategory, cat.subCategory);
    this.assignForm.reset({ productId: null, categoryId: '' });
    this.toastr.success('Product category updated for the store');
  }

  clearAssignment(): void {
    const id = this.assignForm.get('productId')?.value;
    if (id == null) return;
    this.categoryService.removeProductOverride(id);
    this.toastr.info('Category override cleared for this product');
  }
}
