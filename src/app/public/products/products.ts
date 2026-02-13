import { Component, inject, OnInit} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ProductsService } from 'app/Shared/Service/products-service';
import { Products } from 'app/Shared/Models/products';
import { ProductCard } from '../home/best-seller/product-card/product-card';

@Component({
  selector: 'app-products',
  imports: [
    ProductCard
  ],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class ProductsComponent implements OnInit{

  private activatedRoute=inject(ActivatedRoute);
  private productService=inject(ProductsService);

  products: Products[]
  constructor(){
    this.products=[];
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(params)=>{
        const subCategory=params['category'];
        this.productService.getProductsBySubCategory(subCategory).subscribe({
          next:(res)=>{
            this.products=res
          },
          error:(err)=>{
            console.log(err.message);
          }
        })
      },
      error:(
        err
      )=>{
        console.log(err.message);
      },
    })
  }
}
