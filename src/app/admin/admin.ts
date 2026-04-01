import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterModule } from '@angular/router';

import { SharedModule } from '@app/Shared';
import { IMenu } from './admin.models';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule, SharedModule, RouterLinkActive, TranslatePipe],
  templateUrl: './admin.html',
  styleUrl: './admin.scss',
})
export class Admin {
  menuItem = signal<IMenu[]>([
    { text: 'Dashboard', url: 'dashboard', icon: 'dashboard' },
    { text: 'home.pages.products', url: 'products', icon: 'inventory_2' },
    { text: 'home.pages.categories', url: 'categories', icon: 'category' },
    { text: 'home.pages.best_sellers', url: 'best-sellers', icon: 'star' },
    { text: 'Orders', url: 'orders', icon: 'local_shipping' },
    { text: 'Users', url: 'users', icon: 'group' },
    { text: 'Coupons', url: 'coupons', icon: 'sell' },
    { text: 'Audit Logs', url: 'audit-logs', icon: 'fact_check' },
  ]).asReadonly();
}
