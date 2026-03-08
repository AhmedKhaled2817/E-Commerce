import { OrderSummary } from './../shared/components/order-summary/order-summary';
import { Component,inject} from '@angular/core';
import { CartService } from 'app/Shared/Service/cart-service';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummary],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout  {
  private cartService = inject(CartService);

  items$= this.cartService.cartItems$;
  totalPrice$= this.cartService.totalPrice$;
  buttonText: string = 'Place Order';

  placeOrder(): void {
    this.cartService.clearCart();
  }
}
