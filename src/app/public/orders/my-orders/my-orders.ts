import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from 'app/Shared/Service/order-service';
import { Router, RouterModule } from '@angular/router';
import { CartService } from 'app/Shared/Service/cart-service';
import { Order, orderStatus } from 'app/Shared/Models/order';
import { BehaviorSubject, combineLatest, delay, map } from 'rxjs';

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, RouterModule],
  templateUrl: './my-orders.html',
  styleUrl: './my-orders.scss',
})
export class MyOrders implements OnInit {
  private orderService = inject(OrderService);
  private cartService = inject(CartService);
  private router = inject(Router);

  orders$ = this.orderService.orders$;

  // ===== Filter =====
  selectedStatus$ = new BehaviorSubject<string>('All');
  activeFilter = 'All';
  filters = ['All', ...Object.values(orderStatus)];

  // ===== Search =====
  searchQuery$ = new BehaviorSubject<string>('');
  searchValue = '';

  // ===== Pagination =====
  page$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(5);

  // ===== Loading =====
  loading = true;
  skeletonItems = Array(3);

  // ===== Loading Per Item =====
  loadingCancel$ = new BehaviorSubject<number | null>(null);

  protected Math = Math;

  // ===== Statistics =====
  totalOrders$ = this.orders$.pipe(map((o) => o.length));

  totalSpent$ = this.orders$.pipe(map((o) => o.reduce((acc, order) => acc + order.totalPrice, 0)));

  // ===== ViewModel Stream — Search + Filter + Pagination =====
  vm$ = combineLatest([
    this.orders$,
    this.selectedStatus$,
    this.searchQuery$,
    this.page$,
    this.pageSize$,
  ]).pipe(
    map(([orders, status, search, page, pageSize]) => {
      let result = orders;

      // 1️⃣ Filter by status
      if (status !== 'All') {
        result = result.filter((o) => o.status === status);
      }

      // 2️⃣ Filter by search
      if (search.trim()) {
        result = result.filter((o) => o.id.toString().includes(search.trim()));
      }

      // 3️⃣ Pagination
      const total = result.length;
      const totalPages = Math.ceil(total / pageSize);
      const start = (page - 1) * pageSize;
      const data = result.slice(start, start + pageSize);

      return { data, total, page, pageSize, totalPages };
    }),
  );

  // ===== Lifecycle =====
  ngOnInit(): void {
    this.orders$.pipe(delay(800)).subscribe(() => {
      this.loading = false;
    });
  }

  // ===== Actions =====
  setFilters(filter: string) {
    this.activeFilter = filter;
    this.selectedStatus$.next(filter);
    this.page$.next(1);
  }

  onSearch(value: string) {
    this.searchValue = value;
    this.searchQuery$.next(value);
    this.page$.next(1);
  }

  changePage(page: number) {
    this.page$.next(page);
  }
  nextPage() {
    this.page$.next(this.page$.value + 1);
  }
  prevPage() {
    this.page$.next(this.page$.value - 1);
  }

  getPages(total: number): number[] {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  cancelOrder(id: number) {
    this.loadingCancel$.next(id);
    setTimeout(() => {
      this.orderService.cancelOrder(id);
      this.loadingCancel$.next(null);
    }, 700);
  }

  Reorder(order: Order) {
    order.items.forEach((item) => {
      for (let i = 0; i < item.quantity; i++) {
        this.cartService.addToCart(item);
      }
    });
    this.router.navigate(['/public/cart']);
  }
}
