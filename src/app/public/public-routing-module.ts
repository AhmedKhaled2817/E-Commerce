import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Public } from './public';
import { Home } from './home/home';
import { Products } from './products/products';
import { Cart } from './cart/cart';

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
        path:'products',
        component:Products
      },
      {
        path:'cart',
        component:Cart
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
