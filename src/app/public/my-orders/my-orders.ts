import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { OrderService } from 'app/Shared/Service/order-service';

@Component({
  selector: 'app-my-orders',
  imports: [
    CommonModule,
  ],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders {

  private orderService=inject(OrderService);
  orders$=this.orderService.orders$;

}
