import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-card',
  standalone:true,
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {

  @Input({required:true}) category!:{name:string,imageUrl:string};

}
