import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IbestSeller } from '../models/ibest-seller';

@Component({
  selector: 'app-product-card',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {

  @Input({required:true}) product!:IbestSeller;

  isHovering:boolean=false;
  onMouseEnter(show:boolean):void{
    this.isHovering=show;
  }
}
