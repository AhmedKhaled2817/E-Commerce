import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IbestSeller } from '../home/best-seller/models/ibest-seller';
import { Subscription } from 'rxjs';
import { CartService } from 'app/Shared/Service/cart-service';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart   implements OnInit, OnDestroy  {


  cartItems:IbestSeller[]=[]
  private sub!:Subscription;
  private cartService=inject(CartService);

  selectedItemId:number| null =null;

  ngOnInit(): void {
    this.sub=this.cartService.cartItems$.subscribe({
      next:(item)=>{
        this.cartItems=item;
      },
      error:(error)=>{
        console.log(error.message);
      }
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDeleteModal(itemId:number){
    this.selectedItemId=itemId;
  }

  removeFromCart(){
    if(this.selectedItemId!==null) {
      this.cartService.removeFromCart(this.selectedItemId);
      this.selectedItemId=null;
    }
  }
}
