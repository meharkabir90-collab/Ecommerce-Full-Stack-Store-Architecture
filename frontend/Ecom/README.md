# 🛒 Full-Stack Ecommerce Web Application

A production-oriented **Full-Stack Ecommerce Platform** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**.

This project was developed as a complete ecommerce solution with a customer-facing storefront, backend REST APIs, database-driven content, authentication, shopping cart, checkout and order management, and a dedicated admin panel for managing the platform.

The architecture is designed so that most of the application's content and ecommerce data can be managed dynamically through the backend and stored in MongoDB instead of being hardcoded in the frontend.

---

## 🚀 Project Overview

This platform provides two major interfaces:

### Customer Storefront

Customers can:

* Browse products
* Browse products by categories
* View product details
* View product images and galleries
* Select product variations such as size and color
* Add products to cart
* Update cart quantities
* Remove products from cart
* View cart totals
* Proceed through checkout
* Provide shipping information
* Place orders
* View order-related information
* Register and log in securely

### Admin Panel

Administrators can manage the ecommerce platform through a dedicated dashboard.

Admin functionality includes:

* Dashboard
* Product management
* Create products
* Edit products
* Delete products
* Product image and gallery management
* SKU management
* Product pricing
* Discount pricing
* Product categories
* Product variations
* Size and color management
* Stock management
* Featured products
* Order management
* Menu/category management
* Dynamic website content management

---

# 🏗️ Architecture

The application follows a **separated frontend/backend architecture**.

```text
                    ┌──────────────────────┐
                    │      React Store     │
                    │   Customer Frontend  │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │    Express / Node    │
                    │      Backend API     │
                    └──────────┬───────────┘
                               │
                 ┌─────────────┴─────────────┐
                 ▼                           ▼
       ┌──────────────────┐        ┌──────────────────┐
       │     MongoDB      │        │    Cloudinary    │
       │ Ecommerce Data   │        │ Product Images   │
       └──────────────────┘        └──────────────────┘

                    ▲
                    │
                    │ REST API
                    │
           ┌────────┴─────────┐
           │   Admin Panel    │
           │ Product / Order  │
           │ Content Mgmt.    │
           └──────────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

* React.js
* Vite
* React Router
* JavaScript
* CSS / CSS Modules
* Tailwind CSS
* Axios
* Lucide React
* Swiper

## Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* RESTful APIs
* JWT Authentication
* Middleware
* Multer
* Cloudinary
* Streamifier
* CORS

## Database

* MongoDB
* MongoDB Atlas
* Mongoose ODM

## Development Tools

* VS Code
* Git
* GitHub
* npm
* Postman
* Vite Development Server

---

# 🔐 Authentication & Authorization

The platform includes authentication functionality for users and administrators.

Features include:

* User registration
* User login
* JWT-based authentication
* Protected backend routes
* Authentication middleware
* Token-based API authorization
* Admin-protected functionality

Authentication allows the backend to identify users and protect resources such as carts, orders, and administrative operations.

---

# 🛍️ Product Management

The product system was designed to support real ecommerce requirements.

Products can contain:

* Product title
* Subtitle
* SKU
* Main image
* Product gallery
* Short description
* Full description
* Price
* Discount price
* Category
* Sizes
* Colors
* Stock
* Featured status

The product system also supports **product variations**, allowing customers to select options such as size and color before adding products to the cart.

---

# 🖼️ Product Image Management

Product images are handled through the backend.

The platform supports:

* Main product images
* Multiple gallery images
* Image uploads
* Cloud-based image storage
* Image URLs stored with product data

**Cloudinary** is integrated for handling product image storage and delivery.

---

# 🛒 Shopping Cart

The shopping cart is connected to the authenticated user.

Cart functionality includes:

* Add product to cart
* Add selected product variation
* Update quantity
* Remove cart item
* Clear cart
* Calculate subtotal
* Calculate total items
* Display product information
* Maintain selected variation information

The backend stores cart data in MongoDB and the frontend retrieves it through REST APIs.

---

# 📦 Order Management

The platform includes an order management system connecting the customer's checkout process with the admin panel.

Order information can include:

* Customer information
* Email
* Phone
* Shipping address
* Products
* Product variations
* SKU
* Size
* Color
* Price
* Quantity
* Item total
* Subtotal
* Shipping
* Total
* Payment method
* Payment status
* Order status

The current implementation supports **Cash on Delivery (COD)**.

---

# 💳 Checkout

The checkout workflow allows customers to:

1. Review their cart
2. Enter customer information
3. Enter shipping information
4. Review order details
5. Select payment method
6. Place the order

The backend validates and stores the resulting order in MongoDB.

---

# 👨‍💼 Admin Dashboard

A dedicated admin interface was developed for managing the ecommerce system.

The dashboard provides centralized access to administrative functionality.

Example sections include:

```text
Admin Dashboard
│
├── Dashboard
├── Products
│   ├── Product List
│   ├── Add Product
│   └── Edit Product
│
├── Orders
│
├── Categories
│
├── Menu Management
│
└── Settings
```

The admin panel communicates with the backend through REST APIs rather than directly accessing MongoDB.

---

# 🗂️ Dynamic Database-Driven Content

One of the major goals of this project was to avoid building the website as a collection of hardcoded frontend pages.

Website and ecommerce content can be stored in the database and retrieved through backend APIs.

For example:

```text
Admin Panel
     │
     ▼
Backend API
     │
     ▼
MongoDB
     │
     ▼
React Frontend
```

This allows administrators to modify ecommerce data without changing frontend source code for every content update.

---

# 🔌 REST API Architecture

The backend follows a REST API architecture.

The frontend communicates with the backend using HTTP requests such as:

```text
GET
POST
PUT
DELETE
```

Example API areas include:

```text
/api/auth
/api/product
/api/cart
/api/order
/api/menu
/api/settings
```

This separation allows the frontend and admin panel to use the same backend services.

---

# 📁 Project Structure

The project follows a separated frontend/backend structure.

```text
Ecommerce-Web-Application/
│
├── Backend/
│   └── Ecommerce-backend/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       ├── config/
│       ├── utils/
│       ├── server.js
│       ├── seeder.js
│       ├── package.json
│       └── .env
│
├── React-App/
│   ├── src/
        ├── Admin/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── assets/
│   │   └── ...
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

> `.env` and `node_modules` are excluded from version control through `.gitignore`.

---

# 🔄 Application Data Flow

A typical product workflow works like this:

```text
Admin
  │
  │ Create Product
  ▼
Admin Panel
  │
  │ HTTP Request
  ▼
Express API
  │
  ▼
Product Controller
  │
  ▼
Mongoose
  │
  ▼
MongoDB
```

The customer then retrieves the product:

```text
MongoDB
   │
   ▼
Express API
   │
   ▼
React Frontend
   │
   ▼
Product Page
   │
   ▼
Select Size / Color
   │
   ▼
Add To Cart
```

---

# 🧩 Key Backend Concepts Implemented

The backend was developed using practical production-oriented concepts including:

* MVC architecture
* Controllers
* Models
* Routes
* Middleware
* Authentication middleware
* REST API design
* Service layer
* Mongoose schemas
* MongoDB relationships
* Request validation
* Error handling
* File upload handling
* Cloudinary integration
* Protected routes
* Environment variables
* CORS configuration

---

# 🎯 Project Objectives

The main objectives of this project were to build a realistic ecommerce system rather than a static frontend demo.

The project focuses on:

* Full-stack application development
* Real-world business logic
* Database-driven architecture
* REST API development
* Authentication and authorization
* Ecommerce workflows
* Admin management
* File and image management
* Scalable frontend/backend separation
* Practical MongoDB data modeling

---

# 📈 Future Improvements

Potential future improvements include:

* Online payment gateway integration
* Stripe / PayPal integration
* Advanced analytics dashboard
* Product reviews and ratings
* Wishlist
* Coupon and discount system
* Inventory alerts
* Advanced search
* Product filtering
* Recommendation system
* Email notifications
* Order tracking
* Redis caching
* Automated testing
* CI/CD
* AWS deployment
* Docker containerization
* Performance optimization

---

# 👨‍💻 Developer

Developed as a complete full-stack ecommerce application to demonstrate practical experience with the **MERN stack, REST APIs, MongoDB, authentication, admin systems, ecommerce business logic, and database-driven web applications**.
