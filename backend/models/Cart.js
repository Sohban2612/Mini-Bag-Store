const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  productData: {
    type: mongoose.Schema.Types.Mixed,
    default: null
  }
});

const cartSchema = new mongoose.Schema({
  items: [cartItemSchema],
  sessionId: {
    type: String,
    default: 'default'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);

