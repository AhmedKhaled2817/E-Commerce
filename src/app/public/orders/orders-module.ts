import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing-module';
import { MyOrders } from './my-orders/my-orders';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    MyOrders
  ]
})
export class OrdersModule { }
