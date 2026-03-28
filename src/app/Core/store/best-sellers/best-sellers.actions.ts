import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IbestSeller } from '../../../public/home/best-seller/models/ibest-seller';

export const BestSellerActions = createActionGroup({
  source: 'Best Seller Management',
  events: {
    'Load Best Sellers': emptyProps(),
    'Load Best Sellers Success': props<{ products: IbestSeller[] }>(),
    'Load Best Sellers Failure': props<{ error: string }>(),
    
    'Add Product': props<{ product: Omit<IbestSeller, 'id'> }>(),
    'Update Product': props<{ product: IbestSeller }>(),
    'Delete Product': props<{ id: number }>(),
    'Delete All Products': emptyProps(),
    
    'Sync to Storage': emptyProps(),
  }
});
