# E-Ecom-API
A high-performance E-commerce REST API built with Node.js and PostgreSQL, featuring Passport.js authentication, persistent cart logic, and role-based access control. Built as part of the Code Academy Full Stack Web Dev course. 

E-Commerce REST API 🛒
A robust backend RESTful API built with Node.js, Express, and PostgreSQL. This project was developed as part of the Codecademy Backend Engineering program to demonstrate proficiency in database design, user authentication, and complex business logic like cart-to-order processing.

🚀 Project Overview
The goal of this project was to create a functional e-commerce backbone that handles the entire lifecycle of a customer journey—from registration and product browsing to managing a persistent shopping cart and checking out.

Note: This project was built with a focus on deep-diving into backend architecture. I prioritized manual problem-solving and logic implementation over AI-generated shortcuts to ensure a fundamental understanding of how data flows through a system.

🛠️ Tech Stack
Runtime: Node.js

Framework: Express.js

Database: PostgreSQL

Authentication: Passport.js (Local Strategy)

Security: Bcrypt (Password Hashing), Express-Session

Documentation: OpenAPI / Swagger

✨ Features
User Management: Full CRUD for users with Role-Based Access Control (RBAC) ensuring Admins can manage the site while users protect their own data.

Product Catalog: Organized by categories with support for product options and filtering.

Persistent Cart: Users can add/remove items. Carts are linked to user accounts in the database, allowing for cross-device persistence.

Secure Checkout: A logic-heavy process that moves items from a cart_product junction table to an orders_product table, calculates shipping, and archives the order.

Security: Middleware-protected routes to prevent unauthorized access to sensitive user and order information.

🧠 Things I Learned
Planning for Functionality: I realized that database normalization is vital, but you must also plan for the function of the app. For example, designing the Cart and Order tables early on is essential for a smooth checkout logic.

Database Integrity: I discovered that using composite foreign keys in an ORDERS_PRODUCT table prevents a customer from ordering two of the same item (it causes an integrity error). This taught me when to use composite keys vs. unique primary keys.

The Power of Middleware: Implementing isAdmin and isOwner checks taught me how to centralize security logic to keep route files clean and dry.

Testing Strategy: Reflecting on the build, I learned that building a test suite incrementally is much faster than trying to debug a complex checkout loop at the very end.

📈 Future Improvements
Testing Suite: Implement Jest and Supertest for automated integration testing.

Price Snapshotting: Improve order tracking by storing the "Price at time of purchase." Currently, if a product price changes, it retroactively changes the value of old orders.

Logic Optimization: Refactor the checkout process to use a single SQL subquery/transaction instead of a JavaScript for loop to improve performance and data atomicity.

OAuth Integration: Expand authentication beyond Local Strategy to include Google and GitHub login via Passport.js.

Shipping API: Integrate a dynamic shipping cost calculator based on user address.

🚦 Getting Started
Prerequisites
Node.js (v18+)

PostgreSQL

Installation
Clone the repo:

Bash
git clone [https://github.com/yourusername/Ecom_API.git](https://github.com/CamRonUn/E-Ecom-API/edit/main/README.md)
Install dependencies:

Bash
npm install
Environment Variables: Create a .env file and add your DB credentials and session secret.

Database Setup: Run the provided SQL scripts to generate your tables.

Run the server:

Bash
npm start
