🛍️ Mini-Bag-Store — Full Stack E-Commerce Application

A modern full-stack e-commerce application with authentication, cart management, checkout flow, and a clean premium UI.
Built using Node.js, Express, MongoDB, React, and integrated with DummyJSON API for product data.

🌐 Live Demo
🔹 Frontend (Vercel)

👉 https://mini-bag-store-4skj.vercel.app/

🔹 Backend (Render)

👉 https://mini-bag-store.onrender.com/

🔹 Backend Health Check

👉 https://mini-bag-store.onrender.com/api/health

✨ Features
🔐 Authentication

User Registration & Login (JWT based)

Protected Routes (Checkout, Orders)

Persistent Login using tokens

Secure password hashing with bcrypt

🛒 Product Management

Products fetched from DummyJSON API

Product listing & details page

Categories & ratings

Stable API suitable for production deployment

🛍️ Shopping Experience

Add / Remove products from cart

Cart stored in MongoDB

Quantity management

Secure checkout process

Order success confirmation

🎨 Premium UI / UX

Responsive & mobile-friendly design

Clean modern UI

Smooth transitions and hover effects

Professional e-commerce layout

🛠️ Tech Stack
Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

bcryptjs

Axios

CORS

Hosted on Render

Frontend

React 18

React Router DOM

Context API (Auth & Cart)

Axios

Vite

CSS3

Hosted on Vercel

📡 API Usage (DummyJSON)

Products are fetched from:

https://dummyjson.com/products

Example APIs

GET /api/products

GET /api/products/:id

POST /api/cart

GET /api/cart

DELETE /api/cart/:id

POST /api/checkout

📁 Project Structure
Mini-Bag-Store/
├── backend/
│   ├── models/
│   │   ├── User.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── products.js   # DummyJSON API integration
│   │   ├── cart.js
│   │   └── checkout.js
│   ├── middleware/
│   │   └── auth.js
│   ├── server.js
│   └── vercel.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
└── README.md

🚀 Local Setup (Optional)
Backend
cd backend
npm install
npm start


Create .env file:

PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Frontend
cd frontend
npm install
npm run dev

🔒 Security Highlights

Password hashing using bcrypt

JWT-based authentication

Protected backend routes

Secure checkout flow

🎯 User Flow

Browse products

View product details

Add items to cart

Login / Signup

Checkout

Order confirmation

🧠 Why DummyJSON Instead of FakeStore?

More stable for production

No Cloudflare blocking on Vercel / Render

Better structured API responses

Suitable for interviews & deployment demos

🐛 Troubleshooting

Ensure backend URL is correctly used in frontend .env

Check MongoDB Atlas IP whitelist

Verify environment variables in Render & Vercel

Use /api/health to confirm backend is running

📦 Deployment

Frontend → Vercel

Backend → Render

Database → MongoDB Atlas

👨‍💻 Author

Sohban Ahmad
Full-Stack Developer | Masai School

📝 License

This project is created for learning, assessment, and portfolio purposes.