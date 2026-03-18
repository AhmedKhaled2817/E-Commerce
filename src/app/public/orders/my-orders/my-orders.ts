import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from 'app/Shared/Service/order-service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'app/Shared/Service/cart-service';
import { Order, orderStatus } from 'app/Shared/Models/order';
import { BehaviorSubject, combineLatest, delay, map } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders  implements  OnInit {
  private orderService = inject(OrderService);
  private cartService=inject(CartService);
  private router=inject(Router);

  orders$ = this.orderService.orders$;

  /* ==== Filtered Orders ====  */
  selectedStatus$=new BehaviorSubject<string>('All');
  activeFilter='All';
  filters = ['All',...Object.values(orderStatus)];


  // ==== Search  ====
  searchQuery$=new BehaviorSubject<string>('');
  searchValue:string='';

  // === Loading Per Item ====
  loadingCancel$=new BehaviorSubject<number| null>(null);

  // ==== Loading & Skeleton ====
  loading:boolean=true;
  skeletonItems=Array(3);
  ngOnInit(): void {
    this.orders$.pipe(delay(800)).subscribe(()=>{
      this.loading=false;
    })
  }

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
    this.loadingCancel$.next(id);

    setTimeout(()=>{
      this.orderService.cancelOrder(id);
      this.loadingCancel$.next(null);
    },700)
  }

  // ==== Filtered Orders  & Search ====
  filteredOrders$=combineLatest([this.orders$,this.selectedStatus$,this.searchQuery$]).pipe(
    map(([orders,selectedStatus,search])=>{
      let result=orders;

      // filter by status
      if(selectedStatus !=='All'){
        result=result.filter((order)=>order.status===selectedStatus)
      }

      // filter by search
      if(search.trim()){
        result=result.filter((order)=>{
          return order.id.toString().includes(search.trim())
        })
      }
      return result;
    })
  )

  setFilters(filter:string){
    this.activeFilter=filter;
    this.selectedStatus$.next(filter);
  }

  onSearch(value:string){
    this.searchValue=value;
    this.searchQuery$.next(value);
  }
}
