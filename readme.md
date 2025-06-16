# ShopPlaza E-Commerce Web Application

## Overview

ShopPlaza is a full-stack e-commerce web application built with Node.js, Express, MongoDB (Mongoose), and EJS. It features user authentication, product browsing, dynamic cart management, order placement, flash messaging, and a responsive UI using Tailwind CSS.

---

## Features

- User registration, login, and logout with JWT authentication
- Product listing and detail pages
- Add to cart, update cart item quantity, and remove items
- Order placement and order history
- Flash messages for user feedback
- Responsive design with Tailwind CSS
- Payment simulation with QR code

---

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB

### Installation

1. Clone the repository:
   ```
   git clone <your-repo-url>
   cd ShopPlaza
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```
   MONGODB_URI=mongodb://localhost:27017/shopplaza
   JWT_KEY=your_jwt_secret
   EXPRESS_SESSION_SECRET=your_session_secret
   ```

4. Start the server:
   ```
   node app.js
   ```
   or with nodemon:
   ```
   npx nodemon app.js
   ```

---

## Project Structure

```
ShopPlaza/
│
├── app.js
├── db.js
├── .env
├── models/
│   ├── user-model.js
│   └── product-model.js
├── routes/
│   └── index.js
├── controllers/
│   └── authController.js
├── middlewares/
│   └── isLoggedIn.js
├── views/
│   ├── partials/
│   │   ├── header.ejs
│   │   └── footer.ejs
│   ├── index.ejs
│   ├── shop.ejs
│   ├── cart.ejs
│   ├── order-placed.ejs
│   └── ...
├── public/
│   └── images/
│       └── QR-pic.jpg
└── ...
```

---

## Main Routes

### Authentication

- `GET /users/register` – Show registration form
- `POST /users/register` – Register a new user
- `GET /users/login` – Show login form
- `POST /users/login` – Authenticate user
- `GET /users/logout` – Logout user

### Shop & Products

- `GET /shop` – Show all products
- `GET /product/:id` – Show single product details

### Cart

- `GET /addtocart/:productid` – Add product to cart (increments quantity if already present)
- `GET /cart` – Show user's cart
- `POST /cart/update` – Increment/decrement quantity or remove item (AJAX)
- `GET /removefromcart/:productid` – Remove product from cart

### Orders

- `POST /process-payment` – Simulate payment and place order
- `GET /orders` – Show user's order history
- `GET /order-placed` – Show order confirmation

### Miscellaneous

- `GET /` – Home/landing page
- Static files served from `/public`

---

## Flash Messages

Flash messages are used for user feedback (e.g., login errors, cart actions) and are displayed for 2 seconds using client-side JavaScript.

---

## Cart Functionality

- Cart items are stored as objects with product reference and quantity.
- Quantity can be incremented/decremented via plus/minus buttons (AJAX).
- If quantity reaches 0, the item is removed from the cart.
- Total amount and total discount are calculated and displayed.

---

## Payment Simulation

- "Pay Now" button on cart page submits a POST request to `/process-payment`.
- On success, user sees an order placed confirmation and a button to return to the shop.

---

## Static Assets

- Product images and QR code for payment are stored in `/public/images`.
- Express serves static files from the `/public` directory.

---

## Environment Variables

- `MONGODB_URI` – MongoDB connection string
- `JWT_KEY` – JWT secret key
- `EXPRESS_SESSION_SECRET` – Express session secret

---