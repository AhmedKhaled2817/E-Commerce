import { OrderSummary } from './../shared/components/order-summary/order-summary';
import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'app/Shared/Service/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PriceNumberPipe } from 'app/Shared/pipes/price-number-pipe';
import { CartItem } from './cart-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,PriceNumberPipe,OrderSummary],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit, OnDestroy{
  private toastr = inject(ToastrService);

  cartItems: CartItem[] = [];
  private sub!: Subscription;
  private cartService = inject(CartService);
  private router=inject(Router);
  private previousLength:number=0;

  // Observable for cart items
  cartItems$ = this.cartService.cartItems$;
  cartTotalPrice$=this.cartService.totalPrice$;


  // Observable for total price
  totalPrice$ = this.cartService.totalPrice$;

  selectedItemId: number | null = null;

  ngOnInit(): void {
    this.sub = this.cartService.cartItems$.subscribe({
      next: (item) => {
        this.cartItems = item;
        if (item.length > this.previousLength) {
          this.toastr.success('Item added to cart successfully');
        }
        this.previousLength=item.length;
      },
      error: (error) => {
        console.log(error.message);
      },
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  openDeleteModal(itemId: number) {
    this.selectedItemId = itemId;
  }

  removeFromCart() {
    if (this.selectedItemId !== null) {
      this.cartService.removeFromCart(this.selectedItemId);
      this.toastr.success('Item removed from cart successfully');
      this.selectedItemId = null;
    }
  }

  increaseQuantity(id:number){
    if (!this.cartService.increaseQuantity(id)) {
      this.toastr.warning('Maximum available quantity reached for this item.');
    }
  }

  decreaseQuantity(id:number){
    this.cartService.decreaseQuantity(id);
  }

  //  navigate to checkout page
  navigateToCheckout(){
    this.router.navigate(['/public/checkout']);
  }

}
