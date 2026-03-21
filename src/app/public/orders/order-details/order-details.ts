import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order, orderStatus } from 'app/Shared/Models/order';
import { OrderService } from 'app/Shared/Service/order-service';

@Component({
  selector: 'app-order-details',
  imports: [
    CommonModule,
  ],
  templateUrl: './order-details.html',
  styleUrl: './order-details.scss',
})
export class OrderDetails  implements OnInit {

  private ActivatedRoute=inject(ActivatedRoute);
  private orderService=inject(OrderService);
  private router=inject(Router);

  order!:Order;

  currentStep:number = 0;
  progressWidth:string = '0%';
  loading:boolean=true;

  ngOnInit(): void {
      const id = Number(this.ActivatedRoute.snapshot.paramMap.get('id'));
    this.orderService.orders$.subscribe((o)=>{
     const found=o.find((order)=>order.id===id)
     if(found){
      this.order=found;
      this.currentStep=this.calculateCurrentStep();
      this.progressWidth=this.calculateProgressWidth();
     }
     this.loading=false;
    })
  }

  steps=[
    { label: 'Order Placed', icon: 'fa-cart-shopping' },
    { label: 'Processing', icon: 'fa-gear' },
    { label: 'Shipped', icon: 'fa-truck' },
    { label: 'Delivered', icon: 'fa-box' }
  ]

  calculateCurrentStep():number{
    if(!this.order.status) return 0;
    switch (this.order.status){
      case orderStatus.Pending:
          return 0;
        case orderStatus.Shipped:
          return 2;
        case orderStatus.Delivered:
          return 3
        case orderStatus.Cancelled:
          return -1
          default :
          return 0;
    }
  }

  calculateProgressWidth(): string {

  const progress = ((this.currentStep + 1) / this.steps.length) * 100;

  return progress + '%';
}
isCancelled(): boolean {
    return this.order.status === orderStatus.Cancelled;
  }

  goBack(){
    this.router.navigate(['/public/orders']);
  }
}
