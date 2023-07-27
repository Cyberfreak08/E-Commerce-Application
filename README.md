# E-Commerce Shopping Website

This is an E-Commerce Shopping Website built with React and Express, allowing users to browse and purchase computer parts. The application has features such as product search, sorting, adding items to the cart, and making payments using Stripe integration.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

## Features

- User can browse computer parts with titles, descriptions, and prices in INR.
- User can search for products by their titles (minimum 3 characters).
- User can sort products in descending or ascending order, or by price (low to high or high to low).
- User can add products to the cart and view the cart contents.
- User can checkout and make payments using Stripe integration.
- User can view their orders and order history.
- User can access a protected profile page after login.

## Installation

1. Clone the repository: `git clone https://github.com/Cyberfreak08/E-Commerce-Application.git`
2. Install frontend dependencies: `cd shopping-cart && npm install`
3. Install backend dependencies: `cd backend && npm install`

## Usage

1. Run the frontend: `cd Frontend && npm start`
2. Run the backend: `cd Backend && npm start`
3. The application will be accessible at `http://localhost:3000`

## Technologies

- Frontend: React, Redux, Ant Design
- Backend: Express, MySQL, Sequelize
- Payment: Stripe

## API Endpoints

- `/api/items`: Get all computer parts.
- `/api/cart`: Get cart items, add items to the cart, remove items from the cart, and empty the cart.
- `/api/order`: Get user orders and checkout.

## Screenshots

![Login](/E-Commerce-Application/ScreenShots/Login.png)
![Products](/E-Commerce-Application/ScreenShots/Products.png)
![ProductModal](/E-Commerce-Application/ScreenShots/ProductModal.png)
![Cart](/E-Commerce-Application/ScreenShots/Cart.png)
![Checkout](/E-Commerce-Application/ScreenShots/Checkout.png)
![Payment](/E-Commerce-Application/ScreenShots/payment.png)
![Order Confirmation](/E-Commerce-Application/ScreenShots/ConfirmOrder.png)
![Orders](/E-Commerce-Application/ScreenShots/Orders.png)
## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
