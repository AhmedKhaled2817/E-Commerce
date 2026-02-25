import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Public } from './public';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Favorite } from './favorite/favorite';
import { ProductsComponent } from './products/products';

const routes: Routes = [
  {
    path:'',
    component:Public,
    children:[
      {
        path:'home',
        component:Home
      },
      {
        path:'cart',
        component:Cart
      },
      {
        path:'favorite',
        component:Favorite,
      },
      {
        path:'products',
        component: ProductsComponent
      },
      {
        path:"products/:category",
        loadComponent:()=>import('./products/products').then((m)=>m.ProductsComponent)
      },
      {
        path:'product/:id',
        loadComponent:()=>import('./product-details/product-details').then((m)=>m.ProductDetails)
      },
      {
        path:'',
        redirectTo:'/public/home',
        pathMatch:'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
