import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Products } from 'app/Shared/Models/products';
import { CartService } from 'app/Shared/Service/cart-service';
import { FavoriteService } from 'app/Shared/Service/favorite-service';
import { ProductsService } from 'app/Shared/Service/products-service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-details',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {

  private route=inject(ActivatedRoute);
  private router=inject(Router);
  private productService=inject(ProductsService);
  private cartService=inject(CartService);
  private favService=inject(FavoriteService);

  product!:Products;
  loading:boolean=true;
  selectedImg:string='';

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params=>{
        const id=Number(params.get('id'));
        this.loading=true;
        return this.productService.getProductsById(id)
      })
    ).subscribe(p=>{
      this.product=p;
      this.selectedImg=p.images[0];
      this.loading=false;
    })
  }

  changeImg(img:string){
    this.selectedImg=img;
  }

  private mapToCartModel(p: Products) {
  return {
    id: p.id,
    name: p.title,
    description: p.description,
    imgUrl: p.images[0],
    price: p.price.toString(),
    oldPrice: (p.price * 1.5).toString(),
    quantity: 1,
    category: p.mainCategory,
    subcategory: p.subCategory,
  };
}

  addToCart(p:Products){
    const productModel=this.mapToCartModel(p)
    this.cartService.addToCart(productModel);
    this.router.navigate(['/public/cart']);
  }

  addToFav(p:Products){
    const productModel=this.mapToCartModel(p)
    this.favService.addToFavorite(productModel);
    this.router.navigate(['/public/favorites']);
  }
}
