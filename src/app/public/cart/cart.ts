import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { IbestSeller } from '../home/best-seller/models/ibest-seller';
import { Subscription } from 'rxjs';
import { CartService } from 'app/Shared/Service/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart   implements OnInit, OnDestroy  {

  private toastr=inject(ToastrService);

  cartItems:IbestSeller[]=[]
  private sub!:Subscription;
  private cartService=inject(CartService);

  selectedItemId:number| null =null;

  ngOnInit(): void {
    this.sub=this.cartService.cartItems$.subscribe({
      next:(item)=>{
        this.cartItems=item;
        if(item.length>0){
          this.toastr.success('Item added to cart successfully');
        }
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
      this.toastr.success('Item removed from cart successfully');
      this.selectedItemId=null;
    }
  }


}
