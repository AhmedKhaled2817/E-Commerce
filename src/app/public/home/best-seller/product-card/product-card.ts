import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { IbestSeller } from '../models/ibest-seller';
import { Router } from '@angular/router';
import { CartService } from 'app/Shared/Service/cart-service';
import { FavoriteService } from 'app/Shared/Service/favorite-service';

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
  private favoriteService=inject(FavoriteService);

  isHovering:boolean=false;
  onMouseEnter(show:boolean):void{
    this.isHovering=show;
  }
  addToCart(product:IbestSeller){
    this.cartService.addToCart(product);
    console.log(product);
    this.router.navigate(['/public/cart']);
  }

  addToFavorite(product:IbestSeller):void{
    this.favoriteService.addToFavorite(product);
    this.router.navigate(['/public/favorite']);
  }

  removeFromFavorite(id:number):void{
    this.favoriteService.removeFromFavorite(id);
  }
}
