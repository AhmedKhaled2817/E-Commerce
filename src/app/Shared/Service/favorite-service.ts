import { inject, Injectable } from '@angular/core';
import { IbestSeller } from 'app/public/home/best-seller/models/ibest-seller';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FavoriteService {

  private readonly favKey='favoriteItems';

  private favorites=new BehaviorSubject<IbestSeller[]>(
    this.getFavoriteItems()
  );

  FavoriteItems$=this.favorites.asObservable();

  private toastr=inject(ToastrService);

  addToFavorite(product:IbestSeller):void{
    const current=this.favorites.value;
    const isExist=current.some((item)=>item.id=== product.id);
    if(isExist){
      this.toastr.info('Product already in favorites');
      return;
    }
    const updatedItems=[...current,product];
    this.favorites.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
    this.toastr.success('Added to favorites ❤️');
  }

  removeFromFavorite(id:number):void{
    const current=this.favorites.value;
    const updatedItems=current.filter((item)=>item.id!==id);
    this.favorites.next(updatedItems);
    this.saveToLocalStorage(updatedItems);
    this.toastr.success('Product removed from favorites');
  }

  // local storage
  // get favorite items from local storage
  private getFavoriteItems():IbestSeller[]{
    const item=localStorage.getItem(this.favKey);
    return item? JSON.parse(item) : [];
  }

  // set favorite items to local storage
  private saveToLocalStorage(items:IbestSeller[]):void{
    localStorage.setItem(this.favKey,JSON.stringify(items));
  }

}
