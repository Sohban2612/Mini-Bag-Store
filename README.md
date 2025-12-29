# Premium Store - Full Stack E-Commerce Application

A premium, full-stack e-commerce application with modern authentication, product management, and a beautiful user interface. Built with Node.js, Express, MongoDB, React, and integrated with FakeStore API.

## ✨ Features

### Authentication
- **User Registration & Login**: Secure JWT-based authentication
- **Protected Routes**: Checkout and order pages require authentication
- **User Profile**: Display user information in navigation
- **Session Management**: Persistent login with token storage

### Product Management
- **FakeStore API Integration**: Fetches real products from FakeStore API
- **Product Categories**: Filter products by category
- **Product Details**: Comprehensive product information with ratings
- **Search & Browse**: Easy navigation through product catalog

### Shopping Experience
- **Shopping Cart**: Add/remove items with real-time updates
- **Cart Persistence**: Cart items saved in database
- **Checkout Process**: Secure checkout with customer information
- **Order Confirmation**: Beautiful order success page

### Premium UI/UX
- **Modern Design**: Gradient backgrounds, smooth animations
- **Responsive Layout**: Fully responsive and mobile-friendly
- **Premium Styling**: Professional MNC-style e-commerce design
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Hero Section**: Eye-catching homepage with call-to-action
- **Category Filters**: Easy product filtering by category

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database with Mongoose ODM
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Axios** - HTTP client for API calls
- **CORS** - Cross-origin resource sharing

### Frontend
- **React 18** - UI library
- **React Router DOM** - Client-side routing
- **Axios** - API communication
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with gradients and animations
- **Context API** - State management for auth and cart

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Mini-Bag-Store
```

### 2. Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```bash
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mini-bag-store
JWT_SECRET=your-super-secret-jwt-key-change-in-production
```

**Note**: For production, use a strong, random JWT_SECRET. You can generate one using:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

4. Start MongoDB (if running locally):
```bash
# On macOS with Homebrew
brew services start mongodb-community

# On Linux
sudo systemctl start mongod

# On Windows
# Start MongoDB service from Services panel
```

5. Start the backend server:
```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The backend server will run on `http://localhost:5000`

**Note**: Products are fetched from FakeStore API, so no seeding is required!

### 3. Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:3000`

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
  - Body: `{ name: string, email: string, password: string }`
- `POST /api/auth/login` - Login user
  - Body: `{ email: string, password: string }`
- `GET /api/auth/me` - Get current user (requires auth token)
  - Headers: `Authorization: Bearer <token>`

### Products
- `GET /api/products` - Get all products (from FakeStore API)
- `GET /api/products/:id` - Get product by ID (from FakeStore API)

### Cart
- `GET /api/cart` - Get cart items
- `POST /api/cart` - Add product to cart
  - Body: `{ productId: string, quantity: number }`
- `DELETE /api/cart/:id` - Remove product from cart

### Checkout
- `POST /api/checkout` - Create order (requires authentication)
  - Body: `{ name: string, email: string, address: string }`
  - Headers: `Authorization: Bearer <token>`

## 🎨 Project Structure

```
Mini-Bag-Store/
├── backend/
│   ├── models/
│   │   ├── User.js          # User model with password hashing
│   │   ├── Cart.js          # Cart model
│   │   └── Order.js         # Order model
│   ├── routes/
│   │   ├── auth.js          # Authentication routes
│   │   ├── products.js     # Product routes (FakeStore API)
│   │   ├── cart.js          # Cart routes
│   │   └── checkout.js      # Checkout routes
│   ├── middleware/
│   │   └── auth.js          # JWT authentication middleware
│   ├── server.js            # Express server setup
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx   # Navigation with auth
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx  # Authentication state
│   │   │   └── CartContext.jsx  # Cart state
│   │   ├── pages/
│   │   │   ├── Home.jsx         # Product listing with filters
│   │   │   ├── ProductDetails.jsx
│   │   │   ├── Cart.jsx
│   │   │   ├── Checkout.jsx
│   │   │   ├── OrderSuccess.jsx
│   │   │   ├── Login.jsx        # Login page
│   │   │   └── Signup.jsx       # Registration page
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## 🎯 Usage

### User Flow

1. **Browse Products**: Visit the home page to see all products from FakeStore API
2. **Filter by Category**: Use category buttons to filter products
3. **View Details**: Click on any product to see detailed information
4. **Add to Cart**: Click "Add to Cart" on product pages
5. **View Cart**: Click the cart icon in the navbar
6. **Sign Up/Login**: Create an account or login to proceed to checkout
7. **Checkout**: Fill in shipping information and place order
8. **Order Confirmation**: View order success page

### Authentication

- **Registration**: Click "Sign Up" in the navbar, fill in name, email, and password
- **Login**: Click "Login" in the navbar, enter email and password
- **Protected Routes**: Checkout and order success pages require authentication
- **Logout**: Click on your name in the navbar and select "Logout"

## 🎨 Design Features

- **Gradient Backgrounds**: Modern gradient color schemes
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Responsive Grid**: Product grid adapts to screen size
- **Premium Cards**: Beautiful product cards with overlay effects
- **Modern Forms**: Styled input fields with focus states
- **Hero Section**: Eye-catching homepage banner
- **Category Filters**: Interactive category selection

## 🔒 Security Features

- **Password Hashing**: bcryptjs for secure password storage
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Server-side and client-side route protection
- **Input Validation**: Form validation on frontend and backend

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or your Atlas connection string is correct
- Check that the MONGODB_URI in `.env` is properly formatted

### Port Already in Use
- Change the PORT in backend `.env` file if 5000 is taken
- Update the proxy in `frontend/vite.config.js` if you change the backend port

### CORS Errors
- Ensure the backend CORS middleware is properly configured
- Check that the frontend proxy settings match the backend port

### Authentication Issues
- Clear browser localStorage if experiencing token issues
- Ensure JWT_SECRET is set in backend `.env` file
- Check that Authorization header is being sent with requests

### FakeStore API Issues
- Check internet connection
- Verify FakeStore API is accessible: https://fakestoreapi.com/products
- Backend will return error if API is unavailable

## 📦 Building for Production

### Backend
The backend can be run directly with Node.js:
```bash
cd backend
npm start
```

### Frontend
Build the frontend for production:
```bash
cd frontend
npm run build
```

The production build will be in the `frontend/dist/` directory.

## 🌟 Key Highlights

- ✅ **Premium Design**: Modern, professional e-commerce UI
- ✅ **Full Authentication**: Secure user registration and login
- ✅ **FakeStore Integration**: Real products from external API
- ✅ **Responsive**: Works perfectly on all devices
- ✅ **Protected Routes**: Secure checkout process
- ✅ **Real-time Cart**: Instant cart updates
- ✅ **Smooth UX**: Animations and transitions throughout

## 📝 License

This project is created for assessment purposes.

## 👨‍💻 Author

Created as part of a full-stack e-commerce assessment with premium features.

---

**Enjoy shopping! 🛍️**
