import { Component, EventEmitter, inject, Input,Output } from '@angular/core';
import { OrderSummary } from '../shared/components/order-summary/order-summary';
import { Observable } from 'rxjs';
import { CartItem } from '../cart/cart-item';
import { CartService } from 'app/Shared/Service/cart-service';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummary],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout  {
  private cartService = inject(CartService);

  @Input() items$: Observable<CartItem[]> = this.cartService.cartItems$;
  @Input() totalPrice$: Observable<number> = this.cartService.totalPrice$;
  @Input() buttonText: string = 'Checkout';
  @Output() action = new EventEmitter<void>();
  onAction(): void {
    this.action.emit();
  }

}
