import { Injectable } from '@angular/core';
import { Order } from '../Models/order';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'app/public/cart/cart-item';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private orders:Order[]

  private orderSubject=new BehaviorSubject<Order[]>([]);
  orders$=this.orderSubject.asObservable();
  constructor(){
    this.orders=[];
    const storedOrders=localStorage.getItem('orders');

    if(storedOrders){
      this.orders=JSON.parse(storedOrders);
      this.orderSubject.next(this.orders);
    }

  }

  createOrder(items:CartItem[],total:number){
    const order:Order={
      id:Date.now(),
      items,
      totalPrice:total,
      date: new Date().toString(),
    }
    this.orders.push(order);
    localStorage.setItem('orders',JSON.stringify(this.orders));
    this.orderSubject.next(this.orders);
  }
}
