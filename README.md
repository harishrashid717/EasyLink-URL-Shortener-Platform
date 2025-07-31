# 🔗 EasyLink – URL Shortener Platform

A full-stack URL shortener application with user authentication, real-time analytics, and a clean UI — built using **Node.js**, **Express.js**, **React.js**, **MySQL**, and modern libraries like **Redux Toolkit**, **TanStack Query**, and **Recharts**.

---

## 🎥 Project Demo

[![Watch the demo](https://img.youtube.com/vi/-UIGH68R2GU/0.jpg)](https://youtu.be/-UIGH68R2GU)

👉 Click the image or [watch on YouTube](https://youtu.be/-UIGH68R2GU?feature=shared)

---

## 🚀 Tech Stack

**Frontend:**  
React.js, Redux Toolkit, TanStack Query, Axios, React Router, Recharts, Bootstrap

**Backend:**  
Node.js, Express.js, JSON Web Token (JWT), bcrypt, RESTful APIs, MVC architecture

**Database:**  
MySQL (normalized schema), optimized queries, foreign key constraints

---

## 🧩 Features

### ✅ Core Functionality
- 🔗 Shorten any long URL and generate a custom short link
- 🔓 Accessible for both anonymous and registered users
- 🔁 Short URLs redirect to the original destination instantly

### 🧑‍💻 User Authentication & Security
- 🔐 Secure Registration & Login with password hashing using **bcrypt**
- 🔑 JWT-based session authentication stored in **HTTP-only cookies**
- 🚪 Logout functionality with session cleanup
- 🛡️ Protected routes for authenticated user operations

### 🗃️ CRUD Operations
- 📄 Create short URLs
- 🧾 View all your generated URLs
- ❌ Delete your own short URLs

### 📊 Advanced Analytics Dashboard (for logged-in users)
- 📈 **Click Trend** – Daily clicks visualized over time
- 🧁 **Device Breakdown** – Pie chart for devices (Desktop, Mobile, Tablet, etc.)
- 📊 **URL Creation Trend** – Bar chart showing URLs created per day
- 📅 **Date Range Filtering** – Filter analytics by specific dates
- 🔍 **Short URL-specific Insights** – View individual URL performance

---

## 🛠️ Project Architecture

### 🔧 Backend (Node.js + Express.js)
Developed RESTful APIs with MVC structure. Used JWT (stored in HTTP-only cookies) for secure user sessions and bcrypt for hashing passwords. Enabled CRUD operations on short URLs and added middleware for authentication and error handling.

### 🎨 Frontend (React.js)
Built a responsive Single Page Application using React Router. Managed global state using Redux Toolkit and handled API interactions with TanStack Query. Recharts was used to create dynamic analytics dashboards with filters and visualizations.

### 🗄️ Database (MySQL)
Designed a normalized relational schema with foreign key constraints. Wrote optimized SQL queries to power the analytics dashboard, reducing query time by **50%** and improving scalability.

---

