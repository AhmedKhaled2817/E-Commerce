# 🛍️ E-CommerceApp

A modern and fully responsive E-Commerce web application built with
**Angular** and **Angular Material**.\
The application allows users to browse products, manage their cart, add
favorites, and place orders with full multi-language support.

## 📌 1. Project Overview

E-CommerceApp provides:

-   Smooth browsing of products and categories\
-   Clean UI with Angular Material\
-   Full cart management\
-   Favorite list\
-   Multi-language support (EN / AR)\
-   Admin dashboard for managing the platform\
-   Responsive design across all devices

## 📦 2. Installed Packages

### UI & Styling

-   @angular/material
-   bootstrap@latest
-   @fortawesome/fontawesome-free

### Notifications

-   ngx-toastr

### Localization

-   @ngx-translate/core
-   @ngx-translate/http-loader

## ✨ 3. Features

### 🛒 User Features

-   Browse products by category\
-   Search products by name\
-   View detailed product info\
-   Add / remove items from cart\
-   Update cart item quantity\
-   Add / remove favorites\
-   Checkout and place orders\
-   Responsive design\
-   Toastr notifications\
-   Multi-language support

### 🛠️ Admin Features

-   Manage products (Add / Edit / Delete)\
-   Manage categories\
-   Manage user feedback\
-   Admin notifications

## 🧰 4. Technologies Used

-   Angular\
-   Angular Material\
-   TypeScript\
-   HTML5\
-   SCSS\
-   Bootstrap 5\
-   Font Awesome\
-   ngx-translate\
-   ngx-toastr

## 📁 5. Project Structure

    src/
     ├── app/
     │   ├── core/                
     │   │    ├── auth
     │   │    ├── cart
     │   │    ├── favorite
     │   │    ├── home
     │   │    ├── product
     │   │    ├── orders
     │   │    ├── profile
     │   │    ├── notification
     │   │    ├── interceptors
     │   │    ├── guards
     │   │    └── resolvers
     │   │
     │   ├── admin/               
     │   │    ├── manage-products
     │   │    ├── categories
     │   │    ├── feedback
     │   │    └── notification
     │   │
     │   ├── shared/              
     │   │    ├── components
     │   │    ├── models
     │   │    ├── enums
     │   │    ├── services
     │   │    ├── directives
     │   │    ├── pipes
     │   │    └── modules
     │   │
     │   └── layout/              
     │
     ├── assets/
     │   ├── i18n/                
     │   │     ├── en.json
     │   │     └── ar.json
     │   └── images/
     │
     └── environments/
          ├── environment.ts
          └── environment.prod.ts

## 🌍 6. Internationalization (i18n)

Using **ngx-translate**\
Supported languages:

-   **English (en)**
-   **Arabic (ar)**

With dynamic language switching.

## 🔧 7. Environment Setup

The app uses two environment files:

-   environment.ts → Development\
-   environment.prod.ts → Production

Each file contains API URLs and global configuration.

## 🚀 8. Run the Project

Install dependencies:

    npm install

Run development server:

    ng serve -o

Build for production:

    ng build --prod

## 🧑‍💻 9. Author

**Ahmed Khaled**\
Front-End Developer (Angular)

## ⭐ 10. Contributions

Pull requests are welcome for improvements or new features.


<!-- ## E-CommerceApp

# 1- project Overview
- E-CommerceApp is a web application that allows users to browse and purchase products online.
- The application is built using Angular and Angular Material.
- The application is responsive and works on all devices.


# 2-  Packages :

- ng add @angular/material
- npm install ngx-toastr --save
- npm install @ngx-translate/core
- npm install @ngx-translate/http-loader
- npm install bootstrap@latest
- npm install @fortawesome/fontawesome-free


# 3- Features
- User can browse products by category.
- User can search for products by name.
- User can view product details.
- User can add products to the cart.
- User can remove products from the cart.
- User can update the quantity of products in the cart.
- User can checkout and place an order.

# 4- Technologies Used
- Angular
- Angular Material
- TypeScript
- HTML
- Scss
- Angular Cli
- ngx-translate
- ngx-toastr
- bootstrap 5
- font-awesome

# 5- Project Structure:

## 5.1 core
 - This folder contains the core modules of the application.
- The core modules are responsible for handling the application's global state and logic.
- The core modules are contain :
  - auth  (account) 
  - cart
  - favorite
  - home Page
  - product
  - orders
  - profile
  - Notification (toastr)
  - Interceptor
  - Guards
  - Resolvers

## 5.2 Admin
 - This folder contains the admin modules of the application.
- The admin modules are responsible for handling the application's admin features.
- The admin modules are:
  - Manage products
  - Categories 
  - Feedback
  - Notification 

## 5.3 shared
 - This folder contains the shared modules of the application.
- The shared modules are responsible for handling the application's shared components, directives, and pipes.
- The shared modules are:
  - components
  - Models
  - Enums
  - Service
  - directives
  - pipes
  - Modules ( as angular matrial , ngx-translate , ngx-toastr)
  - Layout (as header , footer , sidebar)


# 6 - public:
### i18n 
- This folder contains the internationalization files of the application.
- The internationalization files are responsible for handling the application's multi-language support.
- The internationalization files are:
  - en.json
  - ar.json

### Images


# 7 - Environment
- This folder contains the environment files of the application.
- The environment files are responsible for handling the application's environment variables.
- The environment files are:
  - environment.ts
  - environment.prod.ts 


# 8- Layout
- This folder contains the layout modules of the application.
- The layout modules are responsible for handling the application's layout features.
- The layout modules are:
  - Admin layout
  - User layout
  - Public layout
  
  -->
