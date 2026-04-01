import { CommonModule} from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'app/Shared/Service/cart-service';
import { FavoriteService } from 'app/Shared/Service/favorite-service';
import { InventoryService } from 'app/Shared/Service/inventory.service';
import { ToastrService } from 'ngx-toastr';
import { IbestSeller } from '../models/ibest-seller';
import { Products } from 'app/Shared/Models/products';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  @Input({required:true}) product!: Products | IbestSeller | any ;

  private cartService=inject(CartService);
  private router=inject(Router);
  private favoriteService=inject(FavoriteService);
  protected inventoryService = inject(InventoryService);
  private toastr = inject(ToastrService);

  isHovering:boolean=false;
  onMouseEnter(show:boolean):void{
    this.isHovering=show;
  }
  addToCart(product: any){
    if (!this.cartService.addToCart(this.mapProduct(product))) {
      this.toastr.error('Not enough stock available.');
      return;
    }
    this.router.navigate(['/public/cart']);
  }

  addToFavorite(product:any):void{
    this.favoriteService.addToFavorite(this.mapProduct(product));
    console.log(product)
    this.router.navigate(['/public/favorite']);
  }

  private mapProduct(product: any):IbestSeller{
    return{
      id:product.id,
      name:product.name || product.title,
      description: product.description,
      price: typeof product.price === 'number' ? String(product.price) : product.price,
      oldPrice: product.oldPrice || null,
      imgUrl : product.imgUrl || product.images?.[0],
    }
  }

  removeFromFavorite(id:number):void{
    this.favoriteService.removeFromFavorite(id);
  }
}
