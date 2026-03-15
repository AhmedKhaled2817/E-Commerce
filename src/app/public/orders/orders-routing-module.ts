import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'my-orders',
    loadComponent: () => import('./my-orders/my-orders').then((m) => m.MyOrders),
    title: 'My Orders',
  },
  {
    path: 'order-details/:id',
    loadComponent: () => import('./order-details/order-details').then((m) => m.OrderDetails),
  },
  {
    path: '',
    redirectTo: 'my-orders',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
