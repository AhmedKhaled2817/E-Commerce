import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IbestSeller } from '../models/ibest-seller';
import { Router } from '@angular/router';
import { CartService } from 'app/Shared/Service/cart-service';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  @Input({required:true}) product!:IbestSeller;

  private cartService=inject(CartService);
  private router=inject(Router);

  isHovering:boolean=false;
  onMouseEnter(show:boolean):void{
    this.isHovering=show;
  }
  addToCart(product:IbestSeller){
    this.cartService.addToCart(product);
    console.log(product);
    this.router.navigate(['/public/cart']);
  }
}
