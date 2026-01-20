# Foodio-Frontend

[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)]()
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)]()
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)]()
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


## Description

Foodio-Frontend is a comprehensive food delivery platform built with React, Next.js, Express, and Node.js. It comprises an admin panel for menu management and a client-side application for users to browse menus, place orders, and manage their profiles. The server-side component, built with Express and Node.js, handles user authentication, data management, and API endpoints for the frontend applications. This project leverages modern web development practices, including component-based architecture, responsive design, and RESTful APIs, to deliver a seamless user experience.

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)
- [Important Links](#important-links)
- [Footer](#footer)

## Features

- **User Authentication:** Secure registration, login, and OTP verification using JWT.
- **Menu Management:** Admin panel for adding, viewing, and managing food items.
- **Cart Management:**  Adding, updating, and removing items from the cart.
- **Address Management:** Saving, retrieving, updating, and deleting delivery addresses.
- **Responsive Design:**  Client application designed for optimal viewing across various devices.
- **Category Browsing:** Featured categories with search and filter options.
- **Offer display:**Display discounted foods.
- **Profile Management:** User profile and address management.

## Tech Stack

- **Frontend:**
    - React
    - Next.js
    - Tailwind CSS
    - Motion (Framer Motion)
    - Lucide-react
    - Axios

- **Backend:**
    - Node.js
    - Express.js
    - Mongoose
    - JSON Web Tokens (JWT)
    - Bcrypt
    - Cookie Parser
    - Cors
    - Nodemailer

- **Configuration & Build Tools:**
    - Vite
    - ESLint
    - PostCSS
    - Autoprefixer

## Installation

To set up the Foodio-Frontend project, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/AyushRaj-10/Foodio-Frontend.git
cd Foodio-Frontend
```

### 2. Install Dependencies

#### a. Client Application

```bash
cd Client
npm install
```

#### b. Admin Panel

```bash
cd Admin-Panel
npm install
```

#### c. Server Application

```bash
cd Server
npm install
```

### 3. Configure Environment Variables

Create `.env` files in both the `Client` and `Server` directories.  Add the following variables:

#### Server/.env

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address
EMAIL_PASS=your_email_password
PORT=8000
```

#### Client/.env

```
VITE_API_URL=http://localhost:8000/api
```

### 4. Run the Applications

#### a. Start the Server

```bash
cd Server
node server.js
```

#### b. Start the Client Application

```bash
cd Client
npm run dev
```

#### c. Start the Admin Panel

```bash
cd Admin-Panel
npm run dev
```

## Usage

### Use Cases

- **Ordering Food:** Users can browse available food items, add them to their cart, manage delivery addresses, and proceed to checkout.
- **Managing Menu:** Administrators can use the admin panel to add new food items, update existing ones, and manage categories.
- **User Authentication:** Secure user registration and login processes ensure that only authorized users can access their accounts and place orders.

### How to use

1.  Open your browser and navigate to `http://localhost:5173` to access the client application.
2.  To access the admin panel, open another browser tab and navigate to the port the Admin Panel uses by default if not configured differently.
3.  Register a new user account or log in with an existing one.
4.  Browse available food items, add them to your cart, and proceed to checkout.
5.  If you are an administrator, log in to the admin panel to manage food items and categories.

## Project Structure

```
Foodio-Frontend/
├── Admin-Panel/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── README.md
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── context/
│   │   │   └── AdminContext.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── pages/
│   │       └── AddMenu.jsx
│   ├── vite.config.js
├── Client/
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── README.md
│   ├── src/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── components/
│   │   │   ├── FeaturedCategories.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── GlassCard.jsx
│   │   │   ├── HeroSection.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PopularDishes.jsx
│   │   │   ├── Testimonials.jsx
│   │   │   └── WhyChooseFoodio.jsx
│   │   ├── Context/
│   │   │   ├── AppContext.jsx
│   │   │   └── CartContenxt.jsx
│   │   ├── index.css
│   │   ├── main.jsx
│   │   └── pages/
│   │       ├── Address.jsx
│   │       ├── Cart.jsx
│   │       ├── Dashboard.jsx
│   │       ├── Home.jsx
│   │       ├── Login.jsx
│   │       ├── Menu.jsx
│   │       ├── Offer.jsx
│   │       ├── Otp.jsx
│   │       └── Profile.jsx
│   ├── tailwind.config.js
│   └── vite.config.js
├── README.md
└── Server/
    ├── controllers/
    │   ├── address.js
    │   ├── cart.js
    │   ├── food.js
    │   └── user.js
    ├── middleware/
    │   └── auth.js
    ├── models/
    │   ├── address.js
    │   ├── cart.js
    │   ├── food.js
    │   └── user.js
    ├── package.json
    ├── routes/
    │   ├── address.js
    │   ├── cart.js
    │   ├── food.js
    │   └── user.js
    ├── server.js
    ├── utils/
    │   ├── dbConnection.js
    │   ├── generateToken.js
    │   └── sendEmail.js
```

## API Reference

The server application provides the following API endpoints:

### User Authentication

- `POST /api/register`: Registers a new user.
  - Request body: `{ name, email, password }`
  - Response: `{ message, step, user }`

- `POST /api/login`: Logs in an existing user.
  - Request body: `{ email, password }`
  - Response: `{ message, step, user }`

- `POST /api/verify-otp`: Verifies the OTP for user authentication.
  - Request body: `{ email, otp }`
  - Response: `{ message, token, user }`

- `POST /api/logout`: Logs out the current user.
  - Response: `{ message }`

-  `GET /api/check`: Checks if the user is authenticated.
   -  Response: `{ loggedIn, user }`

- `GET /api/getme`: Gets the current authenticated user's information.
    - Headers: `Authorization: Bearer <token>`
    - Response: `{ success, user }`

### Address Management

- `POST /api/addresses`: Creates a new address.
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ phone, address, city, state, postalCode }`
  - Response: `{ success, message, address }`

- `GET /api/addresses`: Retrieves all addresses for the current user.
  - Headers: `Authorization: Bearer <token>`
  - Response: `[ { address1 }, {address2} ]`

- `PUT /api/addresses/:id`: Updates an existing address.
  - Headers: `Authorization: Bearer <token>`
  - Request body: `{ phone, address, city, state, postalCode }`
  - Response: `{ success, message, address }`

- `DELETE /api/addresses/:id`: Deletes an existing address.
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ success, message }`

### Food Management

- `POST /api/savefood`: Saves a new food item.
  - Request body: `{ name, description, category, price, image, rating, discount }`
  - Response: `{ message, food }`

- `GET /api/getfood`: Retrieves all food items.
  - Response: `{ success, message, count, foods }`

### Cart Management

- `POST /api/cart`: Adds an item to the cart.
  - Request body: `{ user, food, quantity }`
  - Response: `{ success, message, cartItem }`

- `PUT /api/cart`: Updates the quantity of an item in the cart.
  - Request body: `{ user, food, quantity }`
  - Response: `{ success, message, cartItem }`

- `DELETE /api/cart`: Removes an item from the cart.
  - Request body: `{ user, food }`
  - Response: `{ success, message }`

- `GET /api/cart/:userId`: Retrieves the cart items for a user.
  - Response: `{ success, message, userId, cartItems }`


## Contributing

We welcome contributions to Foodio-Frontend!  To contribute, please follow these guidelines:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, concise messages.
4.  Submit a pull request to the main branch.

## License

This project is not licensed.

## Important Links

- **User's GitHub Profile**: [AyushRaj-10](https://github.com/AyushRaj-10)

## Footer

```
Foodio-Frontend - https://github.com/AyushRaj-10/Foodio-Frontend

Fork, like, star, and raise issues to contribute to the project.
```


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**
