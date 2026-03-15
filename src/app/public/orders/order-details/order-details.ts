import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'app/Shared/Models/order';
import { OrderService } from 'app/Shared/Service/order-service';

@Component({
  selector: 'app-order-details',
  imports: [
    CommonModule
  ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails  implements OnInit {

  private ActivatedRoute=inject(ActivatedRoute);
  private orderService=inject(OrderService);

  order!:Order;
  ngOnInit(): void {
      const id = Number(this.ActivatedRoute.snapshot.paramMap.get('id'));
    this.orderService.orders$.subscribe((o)=>{
     const found=o.find((order)=>order.id===id)
     if(found){
      this.order=found;
     }
    })
  }

}
