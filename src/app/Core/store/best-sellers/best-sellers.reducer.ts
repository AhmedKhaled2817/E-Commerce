import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { IbestSeller } from '../../../public/home/best-seller/models/ibest-seller';
import { BestSellerActions } from './best-sellers.actions';

export interface BestSellerState extends EntityState<IbestSeller> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<IbestSeller> = createEntityAdapter<IbestSeller>();

export const initialState: BestSellerState = adapter.getInitialState({
  loading: false,
  error: null,
});

export const bestSellerReducer = createReducer(
  initialState,
  on(BestSellerActions.loadBestSellers, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(BestSellerActions.loadBestSellersSuccess, (state, { products }) => {
    return adapter.setAll(products, { ...state, loading: false });
  }),
  on(BestSellerActions.loadBestSellersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(BestSellerActions.addProduct, (state, { product }) => {
    const newProduct = { ...product, id: Date.now() };
    return adapter.addOne(newProduct, state);
  }),
  on(BestSellerActions.updateProduct, (state, { product }) => {
    return adapter.updateOne({ id: product.id, changes: product }, state);
  }),
  on(BestSellerActions.deleteProduct, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(BestSellerActions.deleteAllProducts, (state) => {
    return adapter.removeAll(state);
  })
);

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
