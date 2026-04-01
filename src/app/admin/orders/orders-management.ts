import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { orderStatus } from 'app/Shared/Models/order';
import { OrderService } from 'app/Shared/Service/order-service';

@Component({
  selector: 'app-orders-management',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Order Management</h2>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Customer</th>
          <th>Address</th>
          <th>Payment</th>
          <th>Items</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        @for (order of (orders$ | async); track order.id) {
          <tr>
            <td>#{{ order.id }}</td>
            <td>{{ order.customerEmail || '-' }}</td>
            <td>{{ order.shippingAddress.city }} - {{ order.shippingAddress.address }}</td>
            <td>{{ order.payment }}</td>
            <td>{{ order.items.length }}</td>
            <td>
              <select [ngModel]="order.status" (ngModelChange)="onStatusChange(order.id, $event)">
                @for (status of statuses; track status) {
                  <option [value]="status">{{ status }}</option>
                }
              </select>
            </td>
          </tr>
        } @empty {
          <tr><td colspan="6">No orders yet.</td></tr>
        }
      </tbody>
    </table>
  `,
  styles: [
    `
      table {
        width: 100%;
        border-collapse: collapse;
      }
      th,
      td {
        border-bottom: 1px solid #eee;
        padding: 8px;
      }
      select {
        padding: 6px;
      }
    `,
  ],
})
export class OrdersManagement {
  private orderService = inject(OrderService);
  orders$ = this.orderService.orders$;
  statuses = Object.values(orderStatus);

  onStatusChange(id: number, status: keyof typeof orderStatus): void {
    this.orderService.updateOrderStatus(id, status);
  }
}
