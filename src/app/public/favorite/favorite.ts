import { AsyncPipe, CommonModule, CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PriceNumberPipe } from 'app/Shared/pipes/price-number-pipe';
import { FavoriteService } from 'app/Shared/Service/favorite-service';

@Component({
  selector: 'app-favorite',
  imports: [
    CommonModule,
    AsyncPipe,
    CurrencyPipe,
    PriceNumberPipe
  ],
  templateUrl: './favorite.html',
  styleUrl: './favorite.scss',
})
export class Favorite {

  private readonly favoriteService=inject(FavoriteService);

  Favorite$=this.favoriteService.FavoriteItems$;

  private selectedId!:number;

  remove(id:number):void{
    this.favoriteService.removeFromFavorite(id);
  }
  onDeleteModal(id:number):void{
    this.selectedId=id;
  }
  confirmRemove():void{
    if(this.selectedId){
      this.favoriteService.removeFromFavorite(this.selectedId);
    }
  }

}
