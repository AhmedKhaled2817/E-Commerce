import { mainCategory } from "app/Shared/Models/products";
import { HttpClient } from '@angular/common/http';
import { inject, Injectable} from '@angular/core';
import { environment } from 'environment/environment.products';
import { combineLatest, map, Observable, shareReplay, tap } from 'rxjs';
import { Products } from '../Models/products';
import { DummyProduct, dummyResponse } from '../Models/dummy-product';
import { InventoryService } from './inventory.service';
import { CategoryService } from './category.service';
import { ShopCategoryView } from '../Models/store-category';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {

  private readonly apiUrl=`${environment.apiUrl}/products`;

  private httpClient=inject(HttpClient);
  private inventoryService = inject(InventoryService);
  private categoryService = inject(CategoryService);

  /** Raw API mapping only — cached once */
  private readonly baseProducts$: Observable<Products[]> = this.httpClient
    .get<dummyResponse>(this.apiUrl)
    .pipe(
      map((res) => res.products.map((p) => this.mapDummyToProduct(p))),
      tap((products) => {
        const finalized = products.map((p) => this.applyProductOverride(p));
        this.inventoryService.syncFromCatalog(finalized);
      }),
      shareReplay(1),
    );

  /** Re-applies category overrides when assignments change (no extra HTTP) */
  getAllProducts(): Observable<Products[]> {
    return combineLatest([this.baseProducts$, this.categoryService.overrides$]).pipe(
      map(([base]) => base.map((p) => this.applyProductOverride(p))),
      tap((finalized) => this.categoryService.syncFromProducts(finalized)),
    );
  }

  getProductsBySubCategory(subCategory:string):Observable<Products[]>{
    return this.getAllProducts().pipe(
      map(products=> products.filter(p=>p.subCategory===subCategory))
    )
  }

  searchProducts(query:string):Observable<Products[]>{
    return this.httpClient.get<dummyResponse>(`${environment.apiUrl}/products/search?q=${query}`).pipe(
     map(res=> res.products.map(p=> this.mapDummyToProduct(p))),
     map((list) => list.map((p) => this.applyProductOverride(p))),
    )
  }

  getProductsById(id:number):Observable<Products>{
    return this.httpClient.get<DummyProduct>(`${this.apiUrl}/${id}`).pipe(
      map(p=> this.mapDummyToProduct(p)),
      map((p) => this.applyProductOverride(p)),
    )
  }

  /** Shop-by-categories slider — updates when catalog or category list changes */
  getCategoriesWithImages(): Observable<ShopCategoryView[]> {
    return combineLatest([this.getAllProducts(), this.categoryService.categories$]).pipe(
      map(([products]) => this.categoryService.buildShopCategories(products)),
      shareReplay(1),
    );
  }

  //  ==== adapter  ===

  private applyProductOverride(p: Products): Products {
    const o = this.categoryService.getProductOverride(p.id);
    if (!o) return p;
    return { ...p, mainCategory: o.mainCategory, subCategory: o.subCategory };
  }

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
