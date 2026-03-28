import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BestSellerState, adapter } from './best-sellers.reducer';

export const selectBestSellerState = createFeatureSelector<BestSellerState>('bestSellers');

const { selectAll } = adapter.getSelectors();

export const selectAllBestSellers = createSelector(selectBestSellerState, selectAll);

export const selectBestSellersLoading = createSelector(
  selectBestSellerState,
  (state) => state.loading,
);

export const selectBestSellersError = createSelector(selectBestSellerState, (state) => state.error);
