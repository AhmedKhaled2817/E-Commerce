import { Injectable, signal, inject } from '@angular/core';
import { IbestSeller } from '../../public/home/best-seller/models/ibest-seller';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root',
})
export class BestSellerService {
  private readonly STORAGE_KEY = 'best_sellers';
  private localStorage = inject(LocalStorage);

  private _bestSellers = signal<IbestSeller[]>(this.loadInitialData());
  bestSellers = this._bestSellers.asReadonly();

  private loadInitialData(): IbestSeller[] {
    const storedData = this.localStorage.getItem(this.STORAGE_KEY) as string;
    if (storedData) {
      return JSON.parse(storedData);
    }

    const initialData: IbestSeller[] = [
      {
        name: 'Men Casual Pants',
        imgUrl: 'images/adult.png',
        description: 'Comfort Stretch Slim Fit Pants',
        price: '$80',
        oldPrice: '$100.00',
        id: 1,
      },
      {
        name: 'Women Flat Shoes',
        imgUrl: 'images/boots.png',
        description: 'Soft Casual Ballet Flats',
        price: '$45',
        oldPrice: '$60.00',
        id: 2,
      },
      {
        name: 'Women Summer Top',
        imgUrl: 'images/woman-top.png',
        description: 'Short Sleeve Casual Blouse',
        price: '$32',
        oldPrice: '$50.00',
        id: 3,
      },
      {
        name: 'Juicer Machine',
        imgUrl: '/images/juicer_machine.png',
        description: 'Stainless Steel Electric Juicer',
        price: '$120',
        oldPrice: '$150.00',
        id: 4,
      },
      {
        name: 'Women Winter Coat Set',
        imgUrl: '/images/best-seller-5.webp',
        description: 'Elegant winter coat paired with a long-sleeve dress',
        price: '$120',
        oldPrice: '$150.00',
        id: 5,
      },
      {
        name: 'Women Casual Dress Set',
        imgUrl: '/images/best-seller-6.webp',
        description: 'Soft beige dress combined with a knitted sweater',
        price: '$110',
        oldPrice: '$140.00',
        id: 6,
      },
      {
        name: 'Women Modern Outfit',
        imgUrl: '/images/best-seller-7.webp',
        description: 'Stylish turquoise dress with matching beige top',
        price: '$115',
        oldPrice: '$145.00',
        id: 7,
      },
      {
        name: 'Black Casual T-Shirt',
        imgUrl: '/images/best-seller-8.webp',
        description: 'Comfortable unisex cotton black printed T-shirt',
        price: '$45',
        oldPrice: '$60.00',
        id: 8,
      },
    ];

    this.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }

  addProduct(product: Omit<IbestSeller, 'id'>) {
    const newProduct = {
      ...product,
      id: Date.now(),
    };
    this._bestSellers.update((prev) => [...prev, newProduct]);
    this.saveToStorage();
  }

  updateProduct(updatedProduct: IbestSeller) {
    this._bestSellers.update((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)),
    );
    this.saveToStorage();
  }

  deleteProduct(id: number) {
    this._bestSellers.update((prev) => prev.filter((p) => p.id !== id));
    this.saveToStorage();
  }

  deleteAllProducts() {
    this._bestSellers.set([]);
    this.saveToStorage();
  }

  private saveToStorage() {
    this.localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this._bestSellers()));
  }
}
