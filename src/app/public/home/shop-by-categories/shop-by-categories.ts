import { Component, inject, OnInit } from '@angular/core';
import { CategoryCard } from './category-card/category-card';
import { ProductsService } from 'app/Shared/Service/products-service';

@Component({
  selector: 'app-shop-by-categories',
  imports: [
    CategoryCard,
  ],
  templateUrl: './shop-by-categories.html',
  styleUrl: './shop-by-categories.scss',
})
export class ShopByCategories implements OnInit {

  private productService=inject(ProductsService);
  categoriesList: Array<{name:string, imageUrl:string}>=[];
  loading:boolean=true;
  ngOnInit(): void {
    this.productService.getCategoriesWithImages().subscribe({
      next:(res)=>{
        this.categoriesList=res.map(cat=> ({
          name: cat.subCategory,
          imageUrl: cat.imageUrl,
        }))
        this.loading=false;
      },
      error:()=> this.loading=false
    })
  }

}
