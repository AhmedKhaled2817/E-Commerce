# 🛒 WearHouse | Professional E-Commerce Ecosystem

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**WearHouse** is a state-of-the-art, high-performance E-Commerce platform built with a focus on **Modular Architecture**, **Fine-Grained Reactivity**, and **Enterprise-Grade Security**. This project demonstrates the full power of modern Angular development.

---

## 🏛️ Architectural Brilliance

The project follows a **Domain-Driven & Layered Architecture**, ensuring maximum scalability and maintainability:

- **Core Layer**: Centralized logic including Global Interceptors (Error & Loading), Auth Guards, and Singleton Configurations.
- **Shared Layer**: Reactive Signal-based Services, Reusable UI Components, Models, and Utility Pipes.
- **Public Domain**: A feature-rich consumer interface (Auth, Shop, Profile Ecosystem, Home).
- **Admin Domain**: A robust management dashboard for real-time inventory and best-seller control.
- **100% Standalone**: Leveraging the latest Angular APIs for lightweight bundles and superior performance.

---

## 🚀 Key Engineering Pillars

### ⚡ Reactive State Engine (NgRx & Angular Signals)

- **Hybrid State Management**: Combines the power of **NgRx Store** for complex domain state (Admin Dashboard) with **Angular Signals** for fine-grained UI reactivity.
- **Entity Management**: Uses `@ngrx/entity` for high-performance CRUD operations and predictable state transitions.
- **Side-Effect Handling**: Robust `@ngrx/effects` layer for asynchronous persistence and global notification synchronization.
- **Persistent State**: Integrated with a sophisticated `LocalStorage` wrapper to maintain user sessions and preferences across refreshes.

### 🔐 Bulletproof Security

- **Dual-Layer Guards**: Implementation of `AuthGuard` and `GuestGuard` to manage complex access flows.
- **Global Error Interceptor**: Centralized error handling that captures and reports HTTP issues gracefully.
- **Reactive Auth Flow**: Seamless registration-to-login handoff with automatic state synchronization.

### 🌍 Global-Ready (i18n & RTL)

- **Bi-directional Engine**: Powered by `@ngx-translate` with full support for **Arabic (RTL)** and **English (LTR)**.
- **Dynamic Layouts**: Automatic UI adaptation based on the selected language with zero layout shift.

### 📱 Premium UX/UI Design

- **Amazon-Style Profile**: A comprehensive account hub including:
  - **Address CRUD**: Dynamic form overlays for managing delivery points.
  - **Security Hub**: Inline editing for credentials with real-time validation.
  - **Payment Management**: Visual card-based UI with "Add Card" dynamic modal.
  - **Prime & Coupons**: Dedicated landing pages for loyalty and discounts.
- **Interactive Components**: High-performance **Swiper.js** sliders for Categories and Testimonials.
- **Global Feedback**: Integrated **Toast Notifications** and **Blur-Effect Loading Spinners** for a smooth app-like feel.

---

## 🛠️ Tech Stack & Tooling

| Category             | Technology                                 |
| :------------------- | :----------------------------------------- |
| **Framework**        | Angular 20+ (Signals, Standalone)          |
| **State Management** | NgRx (Store, Effects, Entity), Signals     |
| **UI/UX**            | Swiper.js, Angular Material 3, Bootstrap 5 |
| **Security**         | JWT-ready Guards & HttpInterceptors        |
| **Localization**     | @ngx-translate                             |
| **Deployment**       | Vercel (Optimized CI/CD)                   |

---

## 📂 Structural Overview

```text
eCommerce/
├── features/               # Externalized Assets (i18n, images)
├── src/
│   ├── app/
│   │   ├── Core/           # Interceptors, Guards, Global Services
│   │   ├── Shared/         # Reactive Services, Models, UI Components
│   │   ├── public/         # User-facing features (Auth, Profile, Home)
│   │   └── admin/          # Management modules (Dashboard, Best Sellers)
│   └── main.ts             # Bootstrapping with Standalone APIs
```

---

## 🧑‍💻 Author & Lead Architect

**Ahmed Khaled** - Front-End Developer & Angular Specialist

---

## 📝 Engineering Notes

This project is optimized for high-traffic scenarios. It uses **Web Components (Swiper Element)** to offload heavy slider logic from the main thread and implements a custom **Build Budget** configuration to handle enterprise-level asset scaling.
