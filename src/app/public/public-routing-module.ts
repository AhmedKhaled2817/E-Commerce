import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Public } from './public';
import { Home } from './home/home';
import { Cart } from './cart/cart';
import { Favorite } from './favorite/favorite';
import { ProductsComponent } from './products/products';
import { authGuard } from '../Shared/Guards/auth.guard';
import { guestGuard } from '../Shared/Guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    component: Public,
    children: [
      {
        path: 'home',
        component: Home,
      },
      {
        path: 'cart',
        component: Cart,
        canActivate: [authGuard],
      },
      {
        path: 'favorite',
        component: Favorite,
        canActivate: [authGuard],
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'profile',
        canActivate: [authGuard],
        children: [
          {
            path: '',
            loadComponent: () => import('./profile/profile').then((m) => m.Profile),
          },
          {
            path: 'addresses',
            loadComponent: () =>
              import('./profile/sub-pages/addresses/addresses').then((m) => m.Addresses),
          },
          {
            path: 'security',
            loadComponent: () =>
              import('./profile/sub-pages/security/security').then((m) => m.Security),
          },
          {
            path: 'payment',
            loadComponent: () =>
              import('./profile/sub-pages/payment-methods/payment-methods').then(
                (m) => m.PaymentMethods,
              ),
          },
          {
            path: 'contact',
            loadComponent: () =>
              import('./profile/sub-pages/contact/contact').then((m) => m.Contact),
          },
          {
            path: 'prime',
            loadComponent: () => import('./profile/sub-pages/prime/prime').then((m) => m.Prime),
          },
          {
            path: 'coupons',
            loadComponent: () =>
              import('./profile/sub-pages/coupons/coupons').then((m) => m.Coupons),
          },
        ],
      },
      {
        path: 'products/:category',
        loadComponent: () => import('./products/products').then((m) => m.ProductsComponent),
      },
      {
        path: 'product/:id',
        loadComponent: () =>
          import('./product-details/product-details').then((m) => m.ProductDetails),
      },
      {
        path: 'orders',
        canActivate: [authGuard],
        loadChildren: () =>
          import('./orders/orders-routing-module').then((m) => m.OrdersRoutingModule),
      },
      {
        path: 'checkout',
        canActivate: [authGuard],
        loadComponent: () => import('./checkout/checkout').then((m) => m.Checkout),
      },
      {
        path: 'contact',
        loadComponent: () => import('./profile/sub-pages/contact/contact').then((m) => m.Contact),
      },
      {
        path: 'auth',
        canActivate: [guestGuard],
        children: [
          {
            path: 'login',
            loadComponent: () => import('./auth/login/login').then((m) => m.Login),
          },
          {
            path: 'register',
            loadComponent: () => import('./auth/register/register').then((m) => m.Register),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/public/home',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
