# 🛍️ E-CommerceApp | Modern Angular E-Commerce Solution

[![Angular](https://img.shields.io/badge/Angular-20.0-DD0031?style=for-the-badge&logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Material Design](https://img.shields.io/badge/Material--UI-Angular-0081CB?style=for-the-badge&logo=angular-material)](https://material.angular.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A high-performance, enterprise-ready E-Commerce application built with **Angular 20**. This project focuses on modern web standards, featuring a fully responsive UI, seamless internationalization, and optimized state management.

---

## 📸 Visuals & UI/UX

> **Note:** Add your screenshots here to showcase the beautiful UI!

|                              Desktop View                              |                           Mobile View                           |
| :--------------------------------------------------------------------: | :-------------------------------------------------------------: |
| ![Desktop](https://via.placeholder.com/600x400?text=Desktop+Home+Page) | ![Mobile](https://via.placeholder.com/200x400?text=Mobile+View) |

---

## � Core Features

### 🛒 Customer Experience

- **⚡ High-Speed Browsing:** Optimized product loading using **Signals** for reactive UI updates.
- **🔍 Advanced Search & Filter:** Real-time search and category-based filtering.
- **🛍️ Cart Management:** Persistent shopping cart with real-time price calculations (Tax, Shipping, Total).
- **❤️ Wishlist System:** Save favorite items for later.
- **🌍 Multi-language (i18n):** Full support for **Arabic (RTL)** and **English (LTR)** with dynamic switching.
- **📱 Ultra-Responsive:** Mobile-first design using **Bootstrap 5** and **Angular Material Flex**.

### 🛠️ Administrative Power

- **📊 Management Dashboard:** Complete CRUD operations for products and categories.
- **🎨 Interactive Workflows:** Smooth user interactions via Material Dialogs and Toastr notifications.

---

## 🏗️ Technical Architecture & Best Practices

This project is built using the latest **Angular 20** features and follows industry-standard best practices:

- **Signals API:** Efficient state management for fine-grained reactivity.
- **Standalone Components:** Reduced boilerplate and improved tree-shaking.
- **Functional Interceptors:** Modern approach to handling HTTP requests/responses.
- **Adapter Pattern:** Used in `ProductsService` to map API responses to clean internal models.
- **Clean Architecture:** Strict separation of concerns between `Core`, `Shared`, and `Features`.
- **SCSS Architecture:** Modular styling with variables and mixins.

---

## 📁 Folder Structure

```text
eCommerce/
├── features/               # Global assets and configurations
│   ├── i18n/               # Translation files (JSON)
│   └── images/             # Static UI assets
├── src/
│   ├── app/
│   │   ├── Core/           # Global singleton services (Dialogs, Auth)
│   │   ├── Shared/         # Reusable Components, Pipes, Models, & Enums
│   │   ├── admin/          # Admin-only modules & views
│   │   └── public/         # Customer-facing views (Home, Auth, Cart)
│   ├── environment/        # Environment configurations (Dev/Prod)
│   └── main.ts             # Bootstrapping the application
└── package.json            # Scripts & Dependencies
```

---

## 🛠️ Installation & Setup

### Prerequisites

- **Node.js:** Latest LTS version.
- **Angular CLI:** `npm install -g @angular/cli`

### Step-by-Step Guide

1. **Clone the Repo:**
   ```bash
   git clone https://github.com/AhmedKhaled/eCommerce.git
   ```
2. **Install Dependencies:**
   ```bash
   npm install
   ```
3. **Run Development Server:**
   ```bash
   ng serve
   ```
4. **Access the App:** Open [http://localhost:4200](http://localhost:4200)

---

## 🧑‍💻 Author

**Ahmed Khaled**  
_Front-End Developer (Angular)_

- 💼 [LinkedIn](https://linkedin.com/in/yourprofile)
- 📧 [Email](mailto:ahmed.khaled@example.com)

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

_Developed with ❤️ by Ahmed Khaled_
