# WearHouse — Angular E‑Commerce & Admin Control Center

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)

**One codebase, two experiences:** a full **customer storefront** (browse, cart, checkout, orders, profile) and an **admin control center** (analytics, inventory, orders, users, coupons, audit trail)—wired together with **real business rules**, not demo-only CRUD.

> **For reviewers (HR / Tech Lead / Senior):** This README states clearly what is **production-style architecture** vs **browser-local simulation** so you can assess intent and depth without guessing.

---

## Why this project stands out

| Audience        | What to look at |
|----------------|-----------------|
| **HR / Hiring** | Clear feature scope, security awareness, admin + user flows, honest limitations—signals maturity. |
| **Tech Lead**   | Layered app structure, guards + interceptors, service boundaries, inventory tied to catalog IDs, audit logging. |
| **Senior Dev**  | NgRx where it fits, Signals elsewhere, standalone routes, interceptors chain, domain services (`Order`, `Inventory`, `Profile`, `Audit`). |

---

## Highlights (at a glance)

- **Angular 20** — Standalone components, lazy-loaded routes, signals in core services.
- **Role-Based Access Control (RBAC)** — Admin routes protected; customer vs admin flows separated.
- **Auth simulation (intentionally transparent)** — Login issues a **fake JWT** string; **`Authorization: Bearer`** attached via HTTP interceptor (pattern matches real apps; crypto/refresh would live on a real backend).
- **Admin = Control Center** — Dashboard-style metrics, operational modules, not only “add/edit/delete”.
- **Inventory linked to the live catalog** — Stock rows use the **same product IDs as the public API**; changes affect cart limits, checkout, and stock badges on product UI.
- **Order lifecycle** — Status workflow; **stock committed on place order**; **stock restored on cancel (Pending)**.
- **Audit log** — Administrative actions recorded for traceability (enterprise-style habit).
- **NgRx** — Used for **Best Sellers** admin slice (store, effects, persistence).
- **i18n** — `@ngx-translate` with English fallback (extendable).

---

## Architecture

```text
src/app/
├── Core/           # HTTP interceptors (error, loading, token), global wiring
├── Shared/       # Models, guards, services (orders, inventory, profile, audit, coupons, …)
├── public/       # Storefront: auth, home, products, cart, checkout, orders, profile
└── admin/        # Dashboard, inventory, orders, users, coupons, audit logs, best sellers
```

**Principles:** feature folders, singleton services `providedIn: 'root'`, guards on routes, HTTP concerns centralized in interceptors.

---

## Security & access (how it works)

| Mechanism | Implementation |
|-----------|----------------|
| Authenticated routes | `authGuard` (session + active user) |
| Guest-only routes (login/register) | `guestGuard` |
| Admin area | `authGuard` + `roleGuard` (`data.role: 'admin'`) |
| API calls | `tokenInterceptor` adds Bearer token (simulated) |

**Candid note:** Passwords and tokens are **not** production-grade; they illustrate **where** real JWT refresh, hashing, and server validation would plug in.

---

## Business & admin features

### Dashboard

- Revenue-oriented KPIs (from local order data), orders-per-day style metrics, top sellers visualization (lightweight UI), conversion placeholder—enough to show **product thinking**, not spreadsheet-only admin.

### Inventory management (store-linked)

- Synced from **catalog/API product list**; default stock for new SKUs until admin adjusts.
- **Low / out-of-stock** states drive **product detail** and **product card** behavior (disable add, messages).
- **Sold** count moves with successful orders.

### Order management

- Full line items, shipping, payment summary from stored orders.
- Admin can advance statuses (e.g. Pending → Processing → Shipped → Delivered — per your `orderStatus` model).

### User management

- List users (from registered users store), **ban / activate**, **promote / demote** admin vs customer (demo RBAC).

### Coupons

- Admin-defined codes: discount %, expiry, usage limits (stored locally; wiring to checkout can be extended).

### Audit log

- Append-only style log for sensitive admin actions (inventory, orders, users, coupons—per service usage).

---

## Customer-facing features (storefront)

- Product listing & filters, **product details** with stock-aware UI.
- Cart with quantity limits tied to **inventory**.
- Checkout → order creation → **inventory deduction**; failure if stock insufficient.
- **My orders**, cancel (with stock restore rules for pending orders), reorder attempts respect stock.
- Profile ecosystem (addresses, security, payment UI, etc.—as implemented in repo).

---

## Tech stack

| Area | Choice |
|------|--------|
| Framework | Angular 20+ |
| State | NgRx (best sellers), RxJS, Angular Signals (`ProfileService`, etc.) |
| UI | Angular Material, Bootstrap, Swiper, Font Awesome |
| HTTP | `HttpClient` + interceptors |
| i18n | ngx-translate |
| Persistence (demo) | `localStorage` via a thin wrapper |

---

## Getting started

```bash
npm install
npm start
# open http://localhost:4200
```

```bash
npm run build
```

### Try the admin experience

1. Go to `/admin` (you will be redirected to login if needed).
2. Sign in with the seeded admin account:
   - **Email:** `admin@shop.com`
   - **Password:** `Admin@123456`
3. Explore **Dashboard**, **Products (inventory)**, **Orders**, **Users**, **Coupons**, **Audit logs**.

Register a normal user via **Register** to see **customer-only** routes vs **admin** separation.

---

## Honest “production readiness” checklist

| Ready as a portfolio / code sample | Needs backend for real prod |
|-------------------------------------|-----------------------------|
| Structure, guards, interceptor patterns | Real JWT + refresh + HTTPS-only cookies |
| Domain services & separation | Database, idempotency, payments |
| Audit trail concept | Immutable server-side audit store |
| Stock rules in UI + order commit | Concurrent stock, reservations, refunds |

---

## Author

**Ahmed Khaled** — Front-End / Angular focus  

---

## License

Private / portfolio use unless otherwise specified.

---

*ملخص عربي سريع: مشروع متجر كامل مع لوحة أدمن متقدمة، صلاحيات، تدقيق، ومخزون مربوط بكتالوج المستخدم—not مجرد واجهات.*
