# Ryet Full-Stack E-Commerce Platform

A professional, full-stack e-commerce solution developed for **Ryet**, a Chinese cycling component manufacturer. This platform bridges the gap between premium web branding and Ryet’s AliExpress-centric retail model, providing a secure, high-conversion storefront for high-performance bike parts.

---

## 🛠 Technical Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React, CSS3, JavaScript (ES6+) |
| **Backend** | Node.js, Express |
| **Database** | SQL (Relational modeling for Users, Orders, and Cart state) |
| **Auth** | Passport.js (OAuth 2.0 via Google & Local Strategy), Sessions |
| **Payments** | Stripe API Integration |
| **Security** | Bcrypt (Hashing), Helmet.js, CORS, Server-side Input Sanitization |

---

## Product Demo 
    youtube- 

## 🚀 Key Features & Implementation

### 🛡 Security-First Architecture
* **Data Integrity:** Implemented rigorous server-side input validation and sanitization to mitigate XSS and Injection vulnerabilities.
* **Header Security:** Utilizes **Helmet.js** for secure HTTP headers and **CORS** for controlled resource sharing.
* **Cryptographic Hashing:** User credentials are secured using **Bcrypt** with salted rounds.

### 🔑 Advanced Authentication
* **Hybrid Flow:** Supports both **Google OAuth 2.0** and **Local Strategy** via Passport.js.
* **Persistent Sessions:** SQL-backed session management tracks user-specific carts and order history across sessions.

### 💳 Payment & Fulfillment Integration
* **Stripe Checkout:** End-to-end payment authentication that triggers real-time SQL server updates upon successful transactions.
* **Business Logic:** Integrated "Buy Now" redirects to Ryet's official AliExpress storefront, aligning the platform with the manufacturer's established fulfillment infrastructure.

---

## 💻 Getting Started

###
