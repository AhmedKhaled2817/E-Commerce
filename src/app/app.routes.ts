import { Routes } from '@angular/router';

export const routes: Routes = [
  {path:'public',
    loadChildren: ()=> import('./public/public-module').then((m)=>m.PublicModule)
  },
  {
  path:'admin',
  loadComponent:()=>import('./admin').then((m)=>m.Admin),
  children:[
    {path:'categories',
    loadComponent:()=>import('./admin/categories').then((m)=>m.Categories),
    },
    {
      path:'products',
      loadComponent:()=>import('./admin/products').then((m)=>m.Products),
    }
  ]
  },
  {
    path:'',
    redirectTo:'/public',
    pathMatch:'full'
  }
];
