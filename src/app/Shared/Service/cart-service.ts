import { Injectable } from '@angular/core';
import { IbestSeller } from 'app/public/home/best-seller/models/ibest-seller';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartItem=new BehaviorSubject<IbestSeller[]>([]);

  cartItems$=this.cartItem.asObservable();

  addToCart(product:IbestSeller){
    const currentItems=this.cartItem.value;
    this.cartItem.next([...currentItems,product]);
  }
  getCartItems(): IbestSeller[]{
    return this.cartItem.value;
  }

}
