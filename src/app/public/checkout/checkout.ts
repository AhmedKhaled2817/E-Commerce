import { OrderSummary } from './../shared/components/order-summary/order-summary';
import { Component,inject} from '@angular/core';
import { CartService } from 'app/Shared/Service/cart-service';
import { OrderService } from 'app/Shared/Service/order-service';
import { combineLatest, take } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummary],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout  {
  private cartService = inject(CartService);
  private orderService=inject(OrderService);
  private router=inject(Router);

  items$= this.cartService.cartItems$;
  totalPrice$= this.cartService.totalPrice$;
  buttonText: string = 'Place Order';

  placeOrder(): void {
    combineLatest([
      this.cartService.cartItems$,
      this.cartService.totalPrice$,
    ]).pipe(take(1))
    .subscribe(([items,total])=>{
      this.orderService.createOrder(items,total);
      this.cartService.clearCart()
    })
    this.router.navigate(['/public/my-orders']);
  }
}
