import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderService } from 'app/Shared/Service/order-service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'app/Shared/Service/cart-service';
import { Order } from 'app/Shared/Models/order';
import { map } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders {
  private orderService = inject(OrderService);
  private cartService=inject(CartService);
  private router=inject(Router);

  orders$ = this.orderService.orders$;

  totalOrders$=this.orders$.pipe(
    map((orders)=> orders.length)
  )

  totalSpent$=this.orders$.pipe(
    map((orders)=> orders.reduce((acc,order)=> acc+order.totalPrice,0))
  )

  Reorder(order:Order){
    order.items.forEach((item)=>{
      for(let i=0; i<item.quantity; i++){
        this.cartService.addToCart(item)
      }
    })
    this.router.navigate(['/public/cart'])
  }

  cancelOrder(id:number){
    this.orderService.cancelOrder(id);
  }
}
