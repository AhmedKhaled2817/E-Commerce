import { ShippingAddress } from './../Models/order';
import { Injectable, inject } from '@angular/core';
import { Order, orderStatus } from '../Models/order';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from 'app/public/cart/cart-item';
import { ProfileService } from './profile.service';
import { AuditLogService } from './audit-log.service';
import { InventoryService } from './inventory.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private profileService = inject(ProfileService);
  private auditLogService = inject(AuditLogService);
  private inventoryService = inject(InventoryService);

  private orders:Order[]

  private orderSubject=new BehaviorSubject<Order[]>([]);
  orders$=this.orderSubject.asObservable();
  constructor(){
    this.orders=[];
    const storedOrders=localStorage.getItem('orders') ;

    if(storedOrders){
      this.orders=JSON.parse(storedOrders) as Order[];
      this.orderSubject.next(this.orders);
    }

  }

  createOrder(items: CartItem[], total: number, ShippingAddress: ShippingAddress, payment: string): boolean {
    if (!this.inventoryService.commitOrder(items)) {
      return false;
    }
    const currentUser = this.profileService.userProfile();
    const order: Order = {
      id: Date.now(),
      items,
      totalPrice: total,
      date: new Date().toString(),
      status: orderStatus.Pending as keyof typeof orderStatus,
      shippingAddress: ShippingAddress,
      payment,
      customerEmail: currentUser.email,
    };
    this.orders.push(order);
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.orderSubject.next(this.orders);
    return true;
  }

  cancelOrder(id: number) {
    const target = this.orders.find((o) => o.id === id);
    if (target && target.status === orderStatus.Pending) {
      this.inventoryService.restoreForOrderItems(target.items);
    }
    this.orders = this.orders.map((order) => {
      if (order.id === id) {
        return { ...order, status: orderStatus.Cancelled };
      }
      return order;
    });
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.orderSubject.next(this.orders);
  }

  updateOrderStatus(id: number, status: keyof typeof orderStatus): void {
    this.orders = this.orders.map((order) => (order.id === id ? { ...order, status } : order));
    localStorage.setItem('orders', JSON.stringify(this.orders));
    this.orderSubject.next(this.orders);

    const actor = this.profileService.userProfile().name ?? 'Admin';
    this.auditLogService.addLog({
      actor,
      action: `updated order status to ${status}`,
      entity: 'order',
      entityId: id.toString(),
    });
  }

  getOrderById(id: number): Order | undefined {
    return this.orders.find((order) => order.id === id);
  }

}
