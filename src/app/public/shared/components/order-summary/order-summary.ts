import { CommonModule} from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from 'app/public/cart/cart-item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-summary',
  imports: [
    CommonModule
  ],
  templateUrl: './order-summary.html',
  styleUrl: './order-summary.scss',
})
export class OrderSummary {

  @Input() items$!:Observable<CartItem[]>;
  @Input() totalPrice$!:Observable<number>
  @Input() buttonText:string='Checkout'
  @Output() action=new EventEmitter<void>()
  onAction():void{
    this.action.emit();
  }
}
