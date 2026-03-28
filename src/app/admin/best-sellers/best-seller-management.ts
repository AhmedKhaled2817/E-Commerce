import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BestSellerService } from 'app/Shared/Service/best-seller.service';
import { IbestSeller } from '../../public/home/best-seller/models/ibest-seller';
import { ToastService } from 'app/Core/services/toast.service';

@Component({
  selector: 'app-best-seller-management',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatIconModule],
  template: `
    <div class="admin-best-seller p-4">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 class="fw-bold mb-0">Best Seller Management</h2>
          <p class="text-muted small">
            Manage the products displayed in the "Our Best Seller" section
          </p>
        </div>
        <div class="actions d-flex gap-2">
          <button
            class="btn btn-danger btn-sm d-flex align-items-center gap-1"
            (click)="deleteAll()"
          >
            <mat-icon>delete_sweep</mat-icon>
            Delete All
          </button>
          <button
            class="btn btn-primary btn-sm d-flex align-items-center gap-1"
            (click)="openForm()"
          >
            <mat-icon>add</mat-icon>
            Add Product
          </button>
        </div>
      </div>

      <!-- Stats -->
      <div class="row g-3 mb-4">
        <div class="col-md-3">
          <div class="stat-card p-3 border rounded-3 bg-white shadow-sm">
            <span class="text-muted small text-uppercase fw-bold">Total Products</span>
            <h3 class="fw-bold mb-0">{{ products().length }}</h3>
          </div>
        </div>
      </div>

      <!-- Table -->
      <div class="table-responsive bg-white rounded-3 shadow-sm border">
        <table class="table table-hover align-middle mb-0">
          <thead class="bg-light">
            <tr>
              <th class="px-4">Product</th>
              <th>Description</th>
              <th>Price</th>
              <th>Old Price</th>
              <th class="text-end px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            @for (product of products(); track product.id) {
              <tr>
                <td class="px-4">
                  <div class="d-flex align-items-center gap-3">
                    <img
                      [src]="product.imgUrl"
                      class="rounded-2 border"
                      width="40"
                      height="40"
                      style="object-fit: cover"
                    />
                    <span class="fw-bold">{{ product.name }}</span>
                  </div>
                </td>
                <td class="text-muted small">{{ product.description }}</td>
                <td class="fw-bold text-primary">{{ product.price }}</td>
                <td class="text-muted text-decoration-line-through small">
                  {{ product.oldPrice }}
                </td>
                <td class="text-end px-4">
                  <div class="d-flex justify-content-end gap-2">
                    <button
                      class="btn btn-outline-primary btn-sm p-1 d-flex"
                      (click)="openForm(product)"
                    >
                      <mat-icon>edit</mat-icon>
                    </button>
                    <button
                      class="btn btn-outline-danger btn-sm p-1 d-flex"
                      (click)="deleteProduct(product.id)"
                    >
                      <mat-icon>delete</mat-icon>
                    </button>
                  </div>
                </td>
              </tr>
            } @empty {
              <tr>
                <td colspan="5" class="text-center py-5 text-muted">
                  <mat-icon class="large-icon opacity-25">shopping_basket</mat-icon>
                  <p class="mt-2 mb-0">No best seller products found.</p>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      <!-- Add/Edit Form Overlay -->
      @if (showForm()) {
        <div class="modal-overlay">
          <div class="modal-card p-4 bg-white rounded-4 shadow-lg animate-fade-in">
            <div class="d-flex justify-content-between align-items-center mb-4">
              <h3 class="fw-bold mb-0">{{ editingId ? 'Edit Product' : 'Add New Product' }}</h3>
              <button class="btn-close" (click)="closeForm()"></button>
            </div>

            <form [formGroup]="productForm" (ngSubmit)="saveProduct()">
              <div class="row g-3">
                <!-- Image Preview & Upload -->
                <div class="col-12 text-center mb-2">
                  <div class="image-preview-container mx-auto position-relative">
                    @if (productForm.get('imgUrl')?.value) {
                      <img
                        [src]="productForm.get('imgUrl')?.value"
                        class="preview-img rounded-3 border"
                      />
                      <button
                        type="button"
                        class="btn btn-danger btn-sm remove-img-btn"
                        (click)="productForm.get('imgUrl')?.setValue('')"
                      >
                        <mat-icon>close</mat-icon>
                      </button>
                    } @else {
                      <div
                        class="no-image d-flex flex-column align-items-center justify-content-center rounded-3 border border-dashed"
                      >
                        <mat-icon class="text-muted">add_a_photo</mat-icon>
                        <span class="text-muted extra-small">No Preview</span>
                      </div>
                    }
                  </div>
                  <input
                    type="file"
                    #fileInput
                    hidden
                    (change)="onFileSelected($event)"
                    accept="image/*"
                  />
                  <button
                    type="button"
                    class="btn btn-outline-secondary btn-sm mt-2"
                    (click)="fileInput.click()"
                  >
                    <mat-icon class="small-icon">upload</mat-icon> Upload Image
                  </button>
                </div>

                <div class="col-12">
                  <label class="form-label small fw-bold text-muted">Product Name</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="name"
                    placeholder="e.g. Women Summer Top"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-muted">Image URL (or path)</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="imgUrl"
                    placeholder="/images/example.png"
                  />
                </div>
                <div class="col-12">
                  <label class="form-label small fw-bold text-muted">Description</label>
                  <textarea
                    class="form-control"
                    formControlName="description"
                    rows="2"
                    placeholder="Brief description..."
                  ></textarea>
                </div>
                <div class="col-6">
                  <label class="form-label small fw-bold text-muted">Price</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="price"
                    placeholder="$0.00"
                  />
                </div>
                <div class="col-6">
                  <label class="form-label small fw-bold text-muted">Old Price</label>
                  <input
                    type="text"
                    class="form-control"
                    formControlName="oldPrice"
                    placeholder="$0.00"
                  />
                </div>
                <div class="col-12 mt-4">
                  <button
                    type="submit"
                    class="btn btn-primary w-100 py-2 fw-bold"
                    [disabled]="productForm.invalid"
                  >
                    {{ editingId ? 'Update Product' : 'Add Product' }}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </div>
  `,
  styles: [
    `
      .admin-best-seller {
        background: #f8f9fa;
        min-height: 100vh;

        .stat-card {
          border-color: #eee !important;
        }

        .table {
          th {
            font-weight: 600;
            font-size: 0.85rem;
            color: #666;
            border-top: none;
          }
          td {
            border-color: #f1f1f1;
          }
        }

        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .modal-card {
          width: 100%;
          max-width: 450px;
        }

        .large-icon {
          font-size: 64px;
          width: 64px;
          height: 64px;
        }

        .image-preview-container {
          width: 120px;
          height: 120px;

          .preview-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .no-image {
            width: 100%;
            height: 100%;
            background: #fcfcfc;
            border-style: dashed !important;
          }

          .remove-img-btn {
            position: absolute;
            top: -10px;
            right: -10px;
            border-radius: 50%;
            width: 24px;
            height: 24px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            mat-icon {
              font-size: 16px;
              width: 16px;
              height: 16px;
            }
          }
        }
      }

      .animate-fade-in {
        animation: fadeIn 0.3s ease-out;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(10px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `,
  ],
})
export class BestSellerManagement {
  private bestSellerService = inject(BestSellerService);
  private toastService = inject(ToastService);
  private fb = inject(FormBuilder);

  products = this.bestSellerService.bestSellers;
  showForm = signal(false);
  editingId: number | null = null;
  productForm: FormGroup;

  constructor() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required]],
      imgUrl: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required]],
      oldPrice: [''],
    });
  }

  openForm(product?: IbestSeller) {
    if (product) {
      this.editingId = product.id;
      this.productForm.patchValue(product);
    } else {
      this.editingId = null;
      this.productForm.reset();
    }
    this.showForm.set(true);
  }

  closeForm() {
    this.showForm.set(false);
    this.editingId = null;
    this.productForm.reset();
  }

  saveProduct() {
    if (this.productForm.valid) {
      const productData = this.productForm.value;
      if (this.editingId) {
        this.bestSellerService.updateProduct({ ...productData, id: this.editingId });
        this.toastService.success('Product updated successfully');
      } else {
        this.bestSellerService.addProduct(productData);
        this.toastService.success('Product added successfully');
      }
      this.closeForm();
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.productForm.patchValue({ imgUrl: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }

  deleteProduct(id: number) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.bestSellerService.deleteProduct(id);
      this.toastService.success('Product deleted');
    }
  }

  deleteAll() {
    if (confirm('WARNING: This will delete ALL best seller products. Continue?')) {
      this.bestSellerService.deleteAllProducts();
      this.toastService.success('All products deleted');
    }
  }
}
