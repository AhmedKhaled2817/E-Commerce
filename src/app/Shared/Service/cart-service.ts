import { Injectable} from '@angular/core';
import { IbestSeller } from 'app/public/home/best-seller/models/ibest-seller';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {


    private readonly cartKey='cartItems';

  private cartItem=new BehaviorSubject<IbestSeller[]>(this.getFromLocalStorage());

  cartItems$=this.cartItem.asObservable();


  addToCart(product:IbestSeller){
    const currentItems=this.cartItem.value;
    const updatedItems=[...currentItems,product];
    this.cartItem.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }
  getCartItems(): IbestSeller[]{
    return this.cartItem.value;
  }

  removeFromCart(id:number){
    const currentItems=this.cartItem.value;
    const updatedItems=currentItems.filter((item)=>item.id !==id);
    this.cartItem.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
  }

   /* Local Storage   */

  // get cart items from local storage

  private getFromLocalStorage():IbestSeller[]{
    const data=localStorage.getItem(this.cartKey);
    return data? JSON.parse(data) : [];
  }

  // save cart items to local storage

  private saveToLocalStorage(items:IbestSeller[]):void{
    localStorage.setItem(this.cartKey,JSON.stringify(items));
  }

  // clear cart items from local storage
  clearCart():void{
    this.cartItem.next([]);
    this.saveToLocalStorage([]);
  }

}
