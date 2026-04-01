import { Injectable, inject } from '@angular/core';
import { IbestSeller } from 'app/public/home/best-seller/models/ibest-seller';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { priceToNumber } from '../utils/price.util';
import { CartItem } from 'app/public/cart/cart-item';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly cartKey = 'cartItems';

  private cartItem = new BehaviorSubject<CartItem[]>(this.getFromLocalStorage());

  cartItems$ = this.cartItem.asObservable();

  private inventoryService = inject(InventoryService);

  /** Returns false if not enough stock */
  addToCart(product: IbestSeller | CartItem): boolean {
    const currentItems = this.cartItem.value;
    const existingItem = currentItems.find((item) => item.id === product.id);
    const nextQty = existingItem ? existingItem.quantity + 1 : 1;
    if (!this.inventoryService.canAddToCart(product.id, nextQty)) {
      return false;
    }

    let updatedItems: CartItem[];

    if (existingItem) {
      updatedItems = currentItems.map((item) => {
        return item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item;
      });
    } else {
      updatedItems = [...currentItems, { ...product, quantity: 1 }];
    }

    this.cartItem.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
    return true;
  }
  getCartItems(): CartItem[] {
    return this.cartItem.value;
  }

  removeFromCart(id: number) {
    const currentItems = this.cartItem.value;
    const updatedItems = currentItems.filter((item) => item.id !== id);
    this.cartItem.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }

  /* Local Storage   */

  // get cart items from local storage
  private getFromLocalStorage(): CartItem[] {
    const data = localStorage.getItem(this.cartKey);
    return data ? JSON.parse(data) : [];
  }

  // save cart items to local storage
  private saveToLocalStorage(items: CartItem[]): void {
    localStorage.setItem(this.cartKey, JSON.stringify(items));
  }

  // clear cart items from local storage
  clearCart(): void {
    this.cartItem.next([]);
    this.saveToLocalStorage([]);
  }

  // get total price of cart items
  totalPrice$:Observable<number>=this.cartItems$.pipe(
    map((items)=>{
      return items.reduce((total,item)=>{
        return total+ priceToNumber(item.price)*item.quantity;
      },0)
    })
  )

  // increase quantity of cart item — returns false if stock insufficient
  increaseQuantity(id: number): boolean {
    const currentItems = this.cartItem.value;
    const existingItem = currentItems.find((item) => item.id === id);
    if (!existingItem) {
      return false;
    }
    const nextQty = existingItem.quantity + 1;
    if (!this.inventoryService.canAddToCart(id, nextQty)) {
      return false;
    }
    const updatedItems = currentItems.map((item) => {
      return item.id === existingItem.id ? { ...item, quantity: item.quantity + 1 } : item;
    });
    this.cartItem.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
    return true;
  }
  // decrease quantity of cart item
  decreaseQuantity(id:number){
    const currentItems = this.cartItem.value;
    const existingItem= currentItems.find((item)=>item.id===id);
    if(existingItem){
      const updatedItems=currentItems.map((item)=>{
        return (item.id === existingItem.id) ? {...item,quantity:item.quantity-1} : item;
      })
      // remove item if quantity is 0
      .filter((item) => item.quantity > 0);
      this.cartItem.next(updatedItems);
      this.saveToLocalStorage(updatedItems);
    }
  }

}
