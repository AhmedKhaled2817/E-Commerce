# WearHouse — Enterprise-Grade Angular E‑Commerce & Admin Ecosystem

[![Angular](https://img.shields.io/badge/Angular-20-DD0031?style=flat&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![NgRx](https://img.shields.io/badge/NgRx-Store-BA2BD2?style=flat&logo=ngrx)](https://ngrx.io/)
[![Signals](https://img.shields.io/badge/Angular-Signals-blue?style=flat)](https://angular.dev/guide/signals)

**WearHouse** isn't just a shopping site; it's a high-performance, dual-experience ecosystem (Customer Storefront + Admin Control Center) built with **Production-Grade Architecture**.

---

## 🚀 The "Senior Developer" Perspective: What’s Under the Hood?

This project was built to demonstrate mastery over complex Angular patterns and state management strategies.

### 🧠 1. Hybrid State Management (The Best of Both Worlds)
Instead of a "one-size-fits-all" approach, I implemented a **Hybrid State Strategy**:
- **NgRx (Store/Effects/Entity)**: Used for the Admin domain. Managing "Best Sellers" via Redux ensures predictable state transitions, undo/redo potential, and complex persistence logic via Effects.
- **Angular Signals**: Used for UI-level reactivity (Profile, Loading, Language). This ensures maximum performance with granular change detection where a full Redux store would be overkill.

### 🛠️ 2. Engineering Challenges & Solutions
| Challenge | My Solution | Technical Depth |
|:--- |:--- |:--- |
| **No-Backend Persistence** | Advanced LocalStorage Wrapper | Built a domain-aware service that handles Base64 image serialization and data hydration, mimicking a real database. |
| **Dynamic Product Mapping** | Category Override Logic | Implemented a complex logic layer in `ProductsService` that merges API data with local Admin overrides without redundant HTTP calls. |
| **Global Resilience** | Multi-layer Interceptor Chain | Created a chain of interceptors for `JWT-like Auth`, `Global Error Handling`, and `Automatic Loading States`. |
| **Performance UX** | Swiper.js Web Components | Integrated Swiper.js as a Web Component to leverage the Shadow DOM, keeping the bundle lean and the UI butter-smooth. |

---

## 🏗️ Architectural Excellence

The project follows the **Core/Shared/Feature** modular pattern, ensuring a strict separation of concerns:

- **Core Layer**: Centralized singleton services, global state (NgRx), and interceptors.
- **Shared Layer**: Domain models, reusable components (Product Cards, Sliders), and utility services.
- **Feature Layer**: Lazy-loaded modules for Admin and Public experiences, ensuring a fast "Initial Payload".

---

## 👨‍💼 Admin Control Center: Professional Features
- **Inventory Control**: Real-time stock tracking with logical commit/restore rules during the order lifecycle.
- **Advanced Category Manager**: Full CRUD with priority weighting (order), visibility toggles, and sub-category mapping.
- **Professional Image System**: File upload with `FileReader` API for instant Base64 previews and persistence.
- **Audit & Logging**: Administrative action tracking for enterprise-level traceability.

---

## 🛡️ Stability & Infrastructure
- **Type Safety**: 100% TypeScript coverage with strict interfaces for all domain models.
- **Route Security**: Advanced `AuthGuard` & `RoleGuard` (RBAC) protecting management routes.
- **Error Handling**: `GlobalErrorInterceptor` with `ToastService` integration for professional user feedback.
- **Optimization**: Custom Build Budgets and Vercel-optimized SPA routing.

---

## 🚦 Getting Started
```bash
npm install
npm start
```
**Admin Credentials:** `admin@shop.com` / `Admin@123456`

---

## 👨‍💻 Author
**Ahmed Khaled**  
*Frontend Angular Developer / Frontend Architect*  
"I don't just write code; I build scalable systems."
