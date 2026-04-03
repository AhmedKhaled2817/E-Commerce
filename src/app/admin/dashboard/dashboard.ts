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
        <div class="card stat-card">
          <span class="label">Total Revenue</span>
          <span class="value">{{ '$' + vm.totalRevenue }}</span>
        </div>
        <div class="card stat-card">
          <span class="label">Orders Today</span>
          <span class="value">{{ vm.ordersToday }}</span>
        </div>
        <div class="card stat-card">
          <span class="label">Conversion Rate</span>
          <span class="value">{{ vm.conversionRate }}%</span>
        </div>
      </div>
      <div class="card">
        <h3>Top Selling Products</h3>
        @for (item of vm.topSelling; track item.id) {
          <div class="row">
            <span class="text-truncate">{{ item.name }}</span>
            <div class="bar"><div class="fill" [style.width.%]="item.percent"></div></div>
            <strong class="text-end">{{ item.sold }} sold</strong>
          </div>
        } @empty {
          <p class="text-muted">No sales data yet.</p>
        }
      </div>
    }
  `,
  styles: [
    `
      .stats {
        display: grid;
        grid-template-columns: 1fr;
        gap: 16px;
        margin-bottom: 16px;
      }
      @media (min-width: 768px) {
        .stats {
          grid-template-columns: repeat(3, 1fr);
        }
      }
      .card {
        background: #fff;
        border: 1px solid #eee;
        border-radius: 12px;
        padding: 20px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
      }
      .stat-card {
        display: flex;
        flex-direction: column;
        gap: 4px;
        .label {
          font-size: 0.85rem;
          color: #666;
          text-transform: uppercase;
          font-weight: 600;
        }
        .value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111;
        }
      }
      .row {
        display: grid;
        grid-template-columns: 1fr;
        gap: 4px;
        margin-bottom: 16px;
        @media (min-width: 576px) {
          grid-template-columns: 1.5fr 2fr auto;
          align-items: center;
          gap: 12px;
        }
      }
      .bar {
        height: 8px;
        background: #f0f0f0;
        border-radius: 999px;
        overflow: hidden;
      }
      .fill {
        height: 100%;
        background: #3f51b5;
        border-radius: 999px;
        transition: width 0.5s ease-out;
      }
      h2 {
        margin-bottom: 24px;
        font-weight: 700;
      }
      h3 {
        margin-bottom: 20px;
        font-weight: 600;
        font-size: 1.1rem;
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
      const ordersToday = orders.filter(
        (order) => new Date(order.date).toDateString() === today,
      ).length;
      const conversionRate =
        orders.length === 0 ? 0 : Number(((orders.length / 100) * 100).toFixed(2));
      const maxSold = Math.max(...items.map((item) => item.sold), 1);
      const topSelling = [...items]
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 5)
        .map((item) => ({ ...item, percent: Math.round((item.sold / maxSold) * 100) }));
      return { totalRevenue, ordersToday, conversionRate, topSelling };
    }),
  );
}
