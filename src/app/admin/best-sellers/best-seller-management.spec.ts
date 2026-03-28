import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BestSellerManagement } from './best-seller-management';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ToastService } from 'app/Core/services/toast.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BestSellerActions } from 'app/Core/store/best-sellers/best-sellers.actions';
import { selectAllBestSellers, selectBestSellersLoading } from 'app/Core/store/best-sellers/best-sellers.selectors';

describe('BestSellerManagement Component', () => {
  let component: BestSellerManagement;
  let fixture: ComponentFixture<BestSellerManagement>;
  let store: MockStore;
  let toastService: jasmine.SpyObj<ToastService>;

  const mockProducts = [
    {
      id: 1,
      name: 'Product 1',
      imgUrl: 'img1.jpg',
      description: 'Desc 1',
      price: '$10',
      oldPrice: '$20',
    },
  ];

  beforeEach(async () => {
    const toastSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [BestSellerManagement, ReactiveFormsModule, MatIconModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectAllBestSellers, value: mockProducts },
            { selector: selectBestSellersLoading, value: false },
          ],
        }),
        { provide: ToastService, useValue: toastSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BestSellerManagement);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadBestSellers on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(BestSellerActions.loadBestSellers());
  });

  it('should open form on openForm', () => {
    component.openForm();
    expect(component.showForm()).toBeTrue();
    expect(component.editingId).toBeNull();
  });

  it('should open form with product data for editing', () => {
    component.openForm(mockProducts[0]);
    expect(component.showForm()).toBeTrue();
    expect(component.editingId).toBe(1);
    expect(component.productForm.value.name).toBe('Product 1');
  });

  it('should close form on closeForm', () => {
    component.openForm();
    component.closeForm();
    expect(component.showForm()).toBeFalse();
    expect(component.editingId).toBeNull();
  });

  it('should dispatch addProduct on saveProduct when not editing', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.openForm();
    component.productForm.patchValue({
      name: 'New Product',
      imgUrl: 'new.jpg',
      description: 'New Desc',
      price: '$30',
      oldPrice: '$40',
    });
    component.saveProduct();
    expect(dispatchSpy).toHaveBeenCalledWith(
      BestSellerActions.addProduct({
        product: {
          name: 'New Product',
          imgUrl: 'new.jpg',
          description: 'New Desc',
          price: '$30',
          oldPrice: '$40',
        },
      })
    );
    expect(toastService.success).toHaveBeenCalledWith('Product added successfully');
  });

  it('should dispatch updateProduct on saveProduct when editing', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    component.openForm(mockProducts[0]);
    component.productForm.patchValue({ name: 'Updated Product' });
    component.saveProduct();
    expect(dispatchSpy).toHaveBeenCalledWith(
      BestSellerActions.updateProduct({
        product: { ...mockProducts[0], name: 'Updated Product' },
      })
    );
    expect(toastService.success).toHaveBeenCalledWith('Product updated successfully');
  });

  it('should dispatch deleteProduct on deleteProduct after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const dispatchSpy = spyOn(store, 'dispatch');
    component.deleteProduct(1);
    expect(dispatchSpy).toHaveBeenCalledWith(BestSellerActions.deleteProduct({ id: 1 }));
    expect(toastService.success).toHaveBeenCalledWith('Product deleted');
  });

  it('should dispatch deleteAllProducts on deleteAll after confirmation', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const dispatchSpy = spyOn(store, 'dispatch');
    component.deleteAll();
    expect(dispatchSpy).toHaveBeenCalledWith(BestSellerActions.deleteAllProducts());
    expect(toastService.success).toHaveBeenCalledWith('All products deleted');
  });
});
