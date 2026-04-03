import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, fromEvent } from 'rxjs';
import { switchMap, catchError, tap, withLatestFrom, filter, map } from 'rxjs/operators';
import { BestSellerActions } from './best-sellers.actions';
import { LocalStorage } from '../../../Shared/Service/local-storage';
import { Store } from '@ngrx/store';
import { selectAllBestSellers } from './best-sellers.selectors';
import { IbestSeller } from '../../../public/home/best-seller/models/ibest-seller';

@Injectable()
export class BestSellerEffects {
  private actions$ = inject(Actions);
  private localStorage = inject(LocalStorage);
  private store = inject(Store);
  private readonly STORAGE_KEY = 'best_sellers';

  loadBestSellers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BestSellerActions.loadBestSellers),
      switchMap(() => {
        const storedData = this.localStorage.getItem(this.STORAGE_KEY);
        if (storedData && typeof storedData === 'string') {
          const products = JSON.parse(storedData) as IbestSeller[];
          return of(BestSellerActions.loadBestSellersSuccess({ products }));
        } else {
          // Default data if storage is empty
          const initialData: IbestSeller[] = [
            {
              id: 1,
              name: 'Men Casual Pants',
              imgUrl: 'images/adult.png',
              description: 'Comfort Stretch Slim Fit Pants',
              price: '$80',
              oldPrice: '$100.00',
            },
            {
              id: 2,
              name: 'Women Flat Shoes',
              imgUrl: 'images/boots.png',
              description: 'Soft Casual Ballet Flats',
              price: '$45',
              oldPrice: '$60.00',
            },
            {
              id: 3,
              name: 'Women Summer Top',
              imgUrl: 'images/woman-top.png',
              description: 'Short Sleeve Casual Blouse',
              price: '$32',
              oldPrice: '$50.00',
            },
            {
              id: 4,
              name: 'Juicer Machine',
              imgUrl: '/images/juicer_machine.png',
              description: 'Stainless Steel Electric Juicer',
              price: '$120',
              oldPrice: '$150.00',
            },
            {
              id: 5,
              name: 'Women Winter Coat Set',
              imgUrl: '/images/best-seller-5.webp',
              description: 'Elegant winter coat paired with a long-sleeve dress',
              price: '$120',
              oldPrice: '$150.00',
            },
            {
              id: 6,
              name: 'Women Casual Dress Set',
              imgUrl: '/images/best-seller-6.webp',
              description: 'Soft beige dress combined with a knitted sweater',
              price: '$110',
              oldPrice: '$140.00',
            },
            {
              id: 7,
              name: 'Women Modern Outfit',
              imgUrl: '/images/best-seller-7.webp',
              description: 'Stylish turquoise dress with matching beige top',
              price: '$115',
              oldPrice: '$145.00',
            },
            {
              id: 8,
              name: 'Black Casual T-Shirt',
              imgUrl: '/images/best-seller-8.webp',
              description: 'Comfortable unisex cotton black printed T-shirt',
              price: '$45',
              oldPrice: '$60.00',
            },
          ];
          return of(BestSellerActions.loadBestSellersSuccess({ products: initialData }));
        }
      }),
      catchError((error) => of(BestSellerActions.loadBestSellersFailure({ error: error.message }))),
    ),
  );

  /** Listen for cross-tab storage changes to keep best sellers synced */
  syncFromStorage$ = createEffect(() =>
    fromEvent<StorageEvent>(window, 'storage').pipe(
      filter((event) => event.key === this.STORAGE_KEY),
      map((event) => {
        if (event.newValue) {
          const products = JSON.parse(event.newValue) as IbestSeller[];
          return BestSellerActions.loadBestSellersSuccess({ products });
        }
        return BestSellerActions.loadBestSellersSuccess({ products: [] });
      }),
    ),
  );

  syncToStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          BestSellerActions.addProduct,
          BestSellerActions.updateProduct,
          BestSellerActions.deleteProduct,
          BestSellerActions.deleteAllProducts,
          BestSellerActions.loadBestSellersSuccess,
        ),
        withLatestFrom(this.store.select(selectAllBestSellers)),
        tap(([_, products]: [any, IbestSeller[]]) => {
          this.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(products));
        }),
      ),
    { dispatch: false },
  );
}
