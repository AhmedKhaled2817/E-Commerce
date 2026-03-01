import { mainCategory } from "app/Shared/Models/products";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from 'environment/environment.products';
import {map,Observable, shareReplay } from 'rxjs';
import { Products } from '../Models/products';
import { DummyProduct, dummyResponse } from '../Models/dummy-product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly apiUrl=`${environment.apiUrl}/products`;

  private httpClient=inject(HttpClient);

  getAllProducts():Observable<Products[]>{
    return this.httpClient.get<dummyResponse>(this.apiUrl).pipe(
      map(res=> res.products.map(p=> this.mapDummyToProduct(p))),
      shareReplay(1)
    )
  }

  getProductsBySubCategory(subCategory:string):Observable<Products[]>{
    return this.getAllProducts().pipe(
      map(products=> products.filter(p=>p.subCategory===subCategory))
    )
  }

  searchProducts(query:string):Observable<Products[]>{
    return this.httpClient.get<dummyResponse>(`${environment.apiUrl}/products/search?q=${query}`).pipe(
     map(res=> res.products.map(p=> this.mapDummyToProduct(p)))
    )
  }

  getProductsById(id:number):Observable<Products>{
    return this.httpClient.get<DummyProduct>(`${this.apiUrl}/${id}`).pipe(
      map(p=> this.mapDummyToProduct(p))
    )
  }

  getCategoriesWithImages():Observable<{mainCategory: mainCategory, subCategory:string, imageUrl:string}[]>{

    return this.getAllProducts().pipe(
      map(products=>{
        const  grouped= new Map<string,{mainCategory: mainCategory, subCategory:string, imageUrl:string}>()
        products.forEach(products=>{
          if(!grouped.has(products.subCategory)){
            grouped.set(products.subCategory,{
              mainCategory: products.mainCategory,
              subCategory: products.subCategory,
              imageUrl: products.images[0]
            });
          }
        });

        return Array.from(grouped.values());
      }),
      shareReplay(1)
    )
  }

  //  ==== adapter  ===

  private mapDummyToProduct(p:DummyProduct):Products{

    const { mainCategory, subCategory } = this.mapCategory(p.category);

    return {
      id:p.id,
      title:p.title,
      description:p.description,
      price:p.price,
      images:p.images,
      thumbnail:p.images[0],
      mainCategory,
      subCategory,
    }
  }

  private mapCategory(category:string): { mainCategory: mainCategory, subCategory:string} {

    const  formatted=this.format(category);
    const womenCategories=['beauty','fragrances'];
    const menCategories=['furniture','home-decoration'];
    const kidsCategories=['groceries'];
    if(womenCategories.includes(category)){
      return { mainCategory: 'Women', subCategory: formatted };
    }
    if(menCategories.includes(category)){
      return { mainCategory: 'Men', subCategory: formatted };
    }
    if(kidsCategories.includes(category)){
      return { mainCategory: 'Kids', subCategory: formatted };
    }
    return { mainCategory: 'Footwear', subCategory: formatted };
  }

  private format(val:string):string{
    return val.replace(/-/g,' ').replace(/\b\w/g,(match)=> match.toUpperCase());
  }

}
