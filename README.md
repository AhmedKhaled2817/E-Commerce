# 🛒 WearHouse | Advanced E-Commerce Ecosystem

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=for-the-badge&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-000000?style=for-the-badge&logo=vercel)](https://vercel.com/)

**WearHouse** is a high-performance, enterprise-grade E-Commerce platform built with a focus on **Scalable Architecture**, **Modern State Management**, and **Bulletproof Security**. It represents a state-of-the-art implementation of Angular 20, pushing the boundaries of what's possible in web development.

---

## 🏛️ Architectural Excellence

The project is built on a **Modular, Domain-Driven Architecture** designed for long-term maintainability and high scalability:

- **Core Module**: Singleton services, global interceptors, and application-wide configurations.
- **Shared Module**: Reusable Signal-based services, UI components, custom pipes, and models.
- **Public Domain**: Feature-rich user interface encompassing Auth, Shop, and Profile ecosystems.
- **Admin Domain**: A robust dashboard for inventory and category management.
- **Standalone APIs**: 100% migration to Standalone Components, ensuring a lightweight bundle and faster hydration.

---

## 🚀 Key Engineering Pillars

### ⚡ Reactive State Engine (Angular Signals)

Unlike traditional applications, WearHouse uses **Angular Signals** for fine-grained reactivity:

- **Zero-Detection Overhead**: Minimal change detection cycles for peak performance.
- **Global Signal Services**: Centralized state for User Profiles, Cart, and Auth, ensuring real-time UI updates across the entire app.

### 🔐 Advanced Security & Routing

- **Dual-Layer Guards**: Implementation of `AuthGuard` and `GuestGuard` using `CanActivateFn` for robust route protection.
- **Persistence Strategy**: A sophisticated `LocalStorage` wrapper that maintains session state and user preferences across browser sessions.
- **Data Integrity**: Secure data handoff between registration, login, and profile services.

### 🌍 Global Experience (i18n & RTL)

- **Bidirectional Layouts**: Full **RTL (Arabic)** and **LTR (English)** support with zero layout shift during switching.
- **Localization Engine**: Dynamic content loading powered by `@ngx-translate`.

### 📱 High-End UI/UX Design

- **Amazon-Inspired Profile**: A comprehensive account management system including Address CRUD, Security inline editing, and Payment Method visualization.
- **Modern Interactions**: Integration of **Swiper.js** for high-performance, touch-optimized testimonial sliders.
- **Responsive Engineering**: Mobile-first design that handles complex forms and interactions seamlessly on small screens.

---

## 🛠️ Tech Stack & Tooling

| Category                 | Technology                          |
| :----------------------- | :---------------------------------- |
| **Framework**            | Angular 20 (Latest)                 |
| **Language**             | TypeScript (Strict Mode)            |
| **State Management**     | Angular Signals, RxJS               |
| **Styling**              | SCSS (BEM Methodology), Bootstrap 5 |
| **UI Components**        | Angular Material 3                  |
| **Internationalization** | @ngx-translate                      |
| **Deployment**           | Vercel (CI/CD Pipeline)             |

---

## 📂 Structural Overview

```text
eCommerce/
├── features/               # Decoupled Static Assets (i18n, Images)
├── src/
│   ├── app/
│   │   ├── Core/           # Interceptors, Guards, Core Configuration
│   │   ├── Shared/         # Signal Services, Models, Utility Pipes
│   │   ├── public/         # Public Domain (Auth, Home, Profile, Shop)
│   │   └── admin/          # Management Domain (Inventory, Categories)
│   └── main.ts             # Bootstrapping with Standalone APIs
```

---

## ⚙️ Getting Started

### Installation

```bash
git clone https://github.com/AhmedKhaled2817/E-Commerce.git
cd eCommerce
npm install
```

### Development

```bash
ng serve
```

### Build & Optimization

```bash
ng build --configuration production
```

---

## 🧑‍💻 Lead Architect

**Ahmed Khaled** - Senior Front-End Developer & Angular Specialist

---

## 📝 Engineering Notes

The build process is optimized for **Vercel** with a custom configuration to handle external asset mapping. The application uses **Swiper Web Components** to minimize main-thread execution time and ensure a smooth 60fps experience.
