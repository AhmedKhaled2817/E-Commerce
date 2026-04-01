import { Routes } from '@angular/router';
import { authGuard } from './Shared/Guards/auth.guard';
import { roleGuard } from './Shared/Guards/role.guard';

export const routes: Routes = [
  {path:'public',
    loadChildren: ()=> import('./public/public-module').then((m)=>m.PublicModule)
  },
  {
  path:'admin',
  canActivate: [authGuard, roleGuard],
  data: { role: 'admin' },
  loadComponent:()=>import('./admin').then((m)=>m.Admin),
  children:[
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: 'dashboard',
      loadComponent: () => import('./admin/dashboard/dashboard').then((m) => m.Dashboard),
    },
    {path:'categories',
    loadComponent:()=>import('./admin/categories').then((m)=>m.Categories),
    },
    {
      path:'products',
      loadComponent:()=>import('./admin/products').then((m)=>m.Products),
    },
    {
      path: 'best-sellers',
      loadComponent: () => import('./admin/best-sellers/best-seller-management').then((m) => m.BestSellerManagement),
    },
    {
      path: 'orders',
      loadComponent: () => import('./admin/orders/orders-management').then((m) => m.OrdersManagement),
    },
    {
      path: 'users',
      loadComponent: () => import('./admin/users/users-management').then((m) => m.UsersManagement),
    },
    {
      path: 'coupons',
      loadComponent: () => import('./admin/coupons/coupons-management').then((m) => m.CouponsManagement),
    },
    {
      path: 'audit-logs',
      loadComponent: () => import('./admin/audit-logs/audit-logs').then((m) => m.AuditLogs),
    }
  ]
  },
  {
    path:'',
    redirectTo:'/public',
    pathMatch:'full'
  }
];
