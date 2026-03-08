# 🛍️ E-CommerceApp

A modern, high-performance, and fully responsive E-Commerce web application built with **Angular 20** and **Angular Material**. This project demonstrates a clean architecture, modular design, and full internationalization support.

## 📌 1. Project Overview

E-CommerceApp is designed to provide a seamless shopping experience:
- **Client Side:** Browsing products, category filtering, advanced search, cart management, and a wishlist system.
- **Admin Side:** A dedicated dashboard to manage products, categories, and monitor platform activity.
- **Modern Tech:** Built using Angular's latest features like **Signals**, **Standalone Components**, and **Functional Interceptors**.

## 📦 2. Key Features

### 🛒 User Experience
- **Dynamic Product Catalog:** Smooth browsing with real-time search and category filtering.
- **Full Cart Management:** Add/remove items, update quantities with instant price calculation.
- **Favorites/Wishlist:** Save products for later viewing.
- **Multilingual Support:** Full RTL/LTR support for Arabic and English using `@ngx-translate`.
- **Responsive UI:** Optimized for Mobile, Tablet, and Desktop using **Bootstrap 5** and **Angular Material**.

### 🛠️ Admin Dashboard
- **Product Management:** Full CRUD operations for products.
- **Category Management:** Organize the store with custom categories.
- **Dialog-based Workflows:** Clean and intuitive management using Material Dialogs.

## 🧰 3. Technologies & Packages

- **Framework:** [Angular 20](https://angular.dev/)
- **UI Components:** [Angular Material](https://material.angular.io/)
- **Styling:** SCSS, Bootstrap 5, Font Awesome 7
- **Localization:** `@ngx-translate/core`
- **Notifications:** `ngx-toastr`
- **State Management:** Angular Signals & RxJS BehaviorSubjects

## 📁 4. Project Structure

The project follows a modular structure for better scalability:

```text
eCommerce/
├── features/               # Global assets and configurations
│   ├── i18n/               # Translation files (ar.json, en.json)
│   └── images/             # Project images and banners
├── src/
│   ├── app/
│   │   ├── Core/           # Global services (Dialog, etc.)
│   │   ├── Shared/         # Reusable Components, Models, Pipes, and Services
│   │   ├── admin/          # Admin Dashboard modules
│   │   └── public/         # User-facing modules (Home, Auth, Cart, etc.)
│   ├── environment/        # Environment-specific configurations
│   └── main.ts             # Application entry point
└── package.json            # Dependencies and scripts
```

## 🌍 5. Internationalization (i18n)

The app supports dynamic language switching between:
- 🇺🇸 **English (EN)** - Left-to-Right (LTR)
- 🇪🇬 **Arabic (AR)** - Right-to-Left (RTL)

Translations are managed in `features/i18n/`.

## 🚀 6. Getting Started

### Prerequisites
- Node.js (Latest LTS)
- Angular CLI (`npm install -g @angular/cli`)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Running the App
Run the development server:
```bash
ng serve
```
Navigate to `http://localhost:4200/`.

## 🧑‍💻 7. Author

**Ahmed Khaled**  
*Front-End Developer (Angular)*

---
*If you like this project, feel free to give it a ⭐!*
