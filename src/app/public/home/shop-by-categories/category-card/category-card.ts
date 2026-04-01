import { Component, inject, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-card',
  standalone:true,
  imports: [],
  templateUrl: './category-card.html',
  styleUrl: './category-card.scss',
})
export class CategoryCard {

  private router = inject(Router);
  @Input({required:true}) category!: {
    displayName: string;
    imageUrl: string;
    subCategory: string;
  };

  navigateToProducts() {
    this.router.navigate(['/public/products', this.category.subCategory]);
  }

}
