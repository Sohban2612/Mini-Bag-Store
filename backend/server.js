const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/checkout', require('./routes/checkout'));

// ================= HEALTH CHECK =================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Server is running'
  });
});

// ================= DATABASE CONNECTION =================
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

module.exports = app;
