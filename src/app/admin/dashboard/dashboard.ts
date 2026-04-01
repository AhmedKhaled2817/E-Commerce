import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { InventoryService } from 'app/Shared/Service/inventory.service';
import { OrderService } from 'app/Shared/Service/order-service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Admin Dashboard</h2>
    @if (vm$ | async; as vm) {
      <div class="stats">
        <div class="card">Revenue: {{ '$' + vm.totalRevenue }}</div>
        <div class="card">Orders Today: {{ vm.ordersToday }}</div>
        <div class="card">Conversion Rate: {{ vm.conversionRate }}%</div>
      </div>
      <div class="card">
        <h3>Top Selling Products</h3>
        @for (item of vm.topSelling; track item.id) {
          <div class="row">
            <span>{{ item.name }}</span>
            <div class="bar"><div class="fill" [style.width.%]="item.percent"></div></div>
            <strong>{{ item.sold }}</strong>
          </div>
        } @empty {
          <p>No sales data yet.</p>
        }
      </div>
    }
  `,
  styles: [
    `
      .stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 12px;
      }
      .card {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 8px;
        padding: 12px;
        margin-bottom: 12px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr 2fr auto;
        gap: 8px;
        align-items: center;
        margin-bottom: 8px;
      }
      .bar {
        height: 8px;
        background: #f0f0f0;
        border-radius: 999px;
      }
      .fill {
        height: 8px;
        background: #3b82f6;
        border-radius: 999px;
      }
    `,
  ],
})
export class Dashboard {
  private orderService = inject(OrderService);
  private inventoryService = inject(InventoryService);

  vm$ = combineLatest([this.orderService.orders$, this.inventoryService.items$]).pipe(
    map(([orders, items]) => {
      const totalRevenue = orders.reduce((acc, order) => acc + order.totalPrice, 0).toFixed(2);
      const today = new Date().toDateString();
      const ordersToday = orders.filter((order) => new Date(order.date).toDateString() === today).length;
      const conversionRate = orders.length === 0 ? 0 : Number(((orders.length / 100) * 100).toFixed(2));
      const maxSold = Math.max(...items.map((item) => item.sold), 1);
      const topSelling = [...items]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5)
        .map((item) => ({ ...item, percent: Math.round((item.sold / maxSold) * 100) }));
      return { totalRevenue, ordersToday, conversionRate, topSelling };
    }),
  );
}
