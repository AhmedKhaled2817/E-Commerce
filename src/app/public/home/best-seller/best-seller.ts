import { Component } from '@angular/core';
import { IbestSeller } from './models/ibest-seller';
import { ProductCard } from './product-card/product-card';

@Component({
  selector: 'app-best-seller',
  standalone:true,
  imports: [
    ProductCard,
  ],
  templateUrl: './best-seller.html',
  styleUrl: './best-seller.scss',
})
export class BestSeller {

 readonly products:IbestSeller[];

  constructor(){
    this.products=[
    {
    name: 'Men Casual Pants',
    imgUrl: 'images/adult.png',
    description: 'Comfort Stretch Slim Fit Pants',
    price: '$80',
    oldPrice: '$100.00'
  },
  {
    name: 'Women Flat Shoes',
    imgUrl: 'images/boots.png',
    description: 'Soft Casual Ballet Flats',
    price: '$45',
    oldPrice: '$60.00'
  },
  {
    name: 'Women Summer Top',
    imgUrl: 'images/woman-top.png',
    description: 'Short Sleeve Casual Blouse',
    price: '$32',
    oldPrice: '$50.00'
  },
  {
    name: 'Juicer Machine',
    imgUrl: '/images/juicer_machine.png',
    description: 'Stainless Steel Electric Juicer',
    price: '$120',
    oldPrice: '$150.00'
  },
    {
    name: 'Women Winter Coat Set',
    imgUrl: '/images/best-seller-5.webp',
    description: 'Elegant winter coat paired with a long-sleeve dress',
    price: '$120',
    oldPrice: '$150.00'
  },
  {
  name: 'Women Casual Dress Set',
  imgUrl: '/images/best-seller-6.webp',
  description: 'Soft beige dress combined with a knitted sweater',
  price: '$110',
  oldPrice: '$140.00'
},
{
  name: 'Women Modern Outfit',
  imgUrl: '/images/best-seller-7.webp',
  description: 'Stylish turquoise dress with matching beige top',
  price: '$115',
  oldPrice: '$145.00'
},
{
  name: 'Black Casual T-Shirt',
  imgUrl: '/images/best-seller-8.webp',
  description: 'Comfortable unisex cotton black printed T-shirt',
  price: '$45',
  oldPrice: '$60.00'
}
    ]
  }
}
