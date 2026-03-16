# 🛒 WearHouse E-Commerce App

A modern, full-featured E-Commerce web application built with **Angular** and **Angular Material**. It features a responsive design, multi-language support (English & Arabic), and a comprehensive admin dashboard.

---

## 🚀 Project Overview

**WearHouse** provides a seamless shopping experience for users while offering a robust management interface for administrators to handle products and categories.

### 🌟 Key Features:

- **Exceptional UX/UI**: Clean and modern interface using Angular Material and Bootstrap 5.
- **Multi-language Support (i18n)**: Full support for English and Arabic with automatic RTL/LTR layout switching.
- **Cart Management**: Add products, adjust quantities, and automatic total price calculation.
- **Wishlist/Favorites**: Save products for later viewing.
- **Order Tracking**: View order history, detailed order summaries, and a "Reorder" feature.
- **Advanced Search**: Real-time product search with keyword highlighting.
- **Admin Dashboard**: Full CRUD operations for managing products and categories.

---

## 🛠️ Tech Stack

- **Framework**: [Angular 18+](https://angular.io/)
- **UI Components**: [Angular Material](https://material.angular.io/)
- **Styling**: SCSS, Bootstrap 5, Font Awesome 6
- **Localization**: [@ngx-translate](https://github.com/ngx-translate/core)
- **State Management**: RxJS (Observables & Subjects), Angular Signals
- **Notifications**: [ngx-toastr](https://github.com/scttcper/ngx-toastr)

---

## 📂 Project Structure

The project follows Angular best practices to ensure maintainability and scalability:

```text
eCommerce/
├── features/               # External assets (translations, images)
│   ├── i18n/               # Translation files (ar.json, en.json)
│   └── images/             # Product and UI images
├── src/
│   ├── app/
│   │   ├── admin/          # Admin module (Product & Category management)
│   │   ├── public/         # Public/User module (Home, Shop, Orders)
│   │   │   ├── auth/       # Login and Registration
│   │   │   ├── cart/       # Shopping Cart
│   │   │   ├── orders/     # Order history and details
│   │   │   └── shared/     # Public-specific shared components
│   │   ├── Shared/         # Global Services, Models, and Constants
│   │   │   ├── Service/    # Global Services (Cart, Order, Products, Translation)
│   │   │   ├── Models/     # Data Interfaces
│   │   │   └── Pipes/      # Data Formatters (Price, Search Highlight)
│   │   ├── Core/           # Core Services (Dialogs, Guards)
│   │   └── app.routes.ts   # Main routing configuration
│   └── main.ts             # Application entry point
└── angular.json            # Build configuration and asset management
```

---

## ⚙️ Getting Started

### Prerequisites:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Angular CLI](https://angular.io/cli)

### Installation:

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/eCommerce.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   ng serve -o
   ```

---

## 🧑‍💻 Developer

**Ahmed Khaled** - Front-End Developer (Angular)

---

## 📝 Technical Notes

The `angular.json` is configured to use the `features` folder at the project root as an external assets directory. This approach decouples static assets like images and translation files from the application source code for better organization.
