const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  name: String,
  price: Number,
  quantity: Number
});

const orderSchema = new mongoose.Schema({
  items: [orderItemSchema],
  total: {
    type: Number,
    required: true
  },
  customer: {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);

