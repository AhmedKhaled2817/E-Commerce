import { Component,inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'app/Shared/Service/cart-service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { PriceNumberPipe } from 'app/Shared/pipes/price-number-pipe';
import { CartItem } from './cart-item';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,PriceNumberPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit, OnDestroy{
  private toastr = inject(ToastrService);

  cartItems: CartItem[] = [];
  private sub!: Subscription;
  private cartService = inject(CartService);



  // Observable for total price
  totalPrice$ = this.cartService.totalPrice$;

  selectedItemId: number | null = null;

  ngOnInit(): void {
    this.sub = this.cartService.cartItems$.subscribe({
      next: (item) => {
        this.cartItems = item;
        if (item.length > 0) {
          this.toastr.success('Item added to cart successfully');
        }
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
    this.cartService.increaseQuantity(id);
  }

  decreaseQuantity(id:number){
    this.cartService.decreaseQuantity(id);
  }
}
