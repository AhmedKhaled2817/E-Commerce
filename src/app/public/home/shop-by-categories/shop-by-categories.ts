import { Component } from '@angular/core';
import { CategoryCard } from './category-card/category-card';

@Component({
  selector: 'app-shop-by-categories',
  imports: [
    CategoryCard,
  ],
  templateUrl: './shop-by-categories.html',
  styleUrl: './shop-by-categories.scss',
})
export class ShopByCategories {

  readonly categoriesList:Array<{name:string,imageUrl:string}>=[
    {name:'Casual Wear',imageUrl:'images/casual_wear.png'},
    {name:'Western Wear',imageUrl:'images/western_wear.png'},
    {name:'Ethnic Wear',imageUrl:'images/ethnic_wear.png'},
    {name:'Kids Wear',imageUrl:'images/kids_wear.png'},
  ]

}
