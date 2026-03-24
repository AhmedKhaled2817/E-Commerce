import { FormBuilder, ReactiveFormsModule, Validators} from '@angular/forms';
import { OrderSummary } from './../shared/components/order-summary/order-summary';
import { Component,inject} from '@angular/core';
import { CartService } from 'app/Shared/Service/cart-service';
import { OrderService } from 'app/Shared/Service/order-service';
import { combineLatest, take } from 'rxjs';
import { Router } from '@angular/router';
import { ShippingAddress } from 'app/Shared/Models/order';

@Component({
  selector: 'app-checkout',
  imports: [OrderSummary, ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout  {
  private cartService = inject(CartService);
  private orderService=inject(OrderService);
  private FormBuilder=inject(FormBuilder);
  private router=inject(Router);

  items$= this.cartService.cartItems$;
  totalPrice$= this.cartService.totalPrice$;
  buttonText: string = 'Place Order';

  placeOrder(): void {
    if(this.checkoutForm.invalid) return;

    const {payment,...addressField}=this.checkoutForm.value as any

    const shippingAddress:ShippingAddress={
      fullName:addressField.fullName,
      phone:addressField.phone,
      city:addressField.city,
      address:addressField.address,
    }

    combineLatest([
      this.cartService.cartItems$,
      this.cartService.totalPrice$,
    ]).pipe(take(1))
    .subscribe(([items,total])=>{
      this.orderService.createOrder(items,total,shippingAddress,payment);
      this.cartService.clearCart()
      this.router.navigate(['/public/orders/my-orders']);
    })
  }

  checkoutForm=this.FormBuilder.group({
    fullName:['',Validators.required],
    phone:['',Validators.required],
    city:['',Validators.required],
    address:['',Validators.required],
    payment:['cashOnDelivery',Validators.required],
    cardNumber:[''],
    expiryDate:[''],
    cvv:['']
  })

  formatCardNumber(event:Event):void{
    const input=event.target as HTMLInputElement;
    let value=input.value.replace(/\D/g,'');
    value=value.match(/.{1,4}/g)?.join(' ')?? value;
    input.value=value;
    this.checkoutForm.get('cardNumber')?.setValue(value,{emitEvent:false});
  }
  formatExpiry(event:Event):void{
    const input=event.target as HTMLInputElement;
    let value=input.value.replace(/\D/g,'');

    if(value.length>=2){
      value=value.slice(0,2)+' / '+value.slice(2)
    }
    input.value=value;
    this.checkoutForm.get('expiryDate')?.setValue(value,{emitEvent:false})
  }
}
