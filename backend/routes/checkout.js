const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// POST /api/checkout - Create order
router.post('/', async (req, res) => {
  try {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
      return res.status(400).json({ error: 'Name, email, and address are required' });
    }

    // Get cart items
    let cart = await Cart.findOne({ sessionId: 'default' });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    // Calculate total and prepare order items from productData
    let total = 0;
    const orderItems = cart.items.map(item => {
      // Use productData if available, otherwise we need to handle it
      const product = item.productData;
      
      if (!product) {
        throw new Error(`Product data not found for item with productId: ${item.productId}`);
      }

      const price = parseFloat(product.price) || 0;
      const quantity = parseInt(item.quantity) || 1;
      const itemTotal = price * quantity;
      total += itemTotal;
      
      return {
        productId: item.productId.toString(), // Store as string since it's from FakeStore API
        name: product.name || product.title || 'Unknown Product',
        price: price,
        quantity: quantity
      };
    });

    // Validate total
    if (isNaN(total) || total <= 0) {
      return res.status(400).json({ error: 'Invalid order total. Please try again.' });
    }

    // Create order
    const order = new Order({
      items: orderItems,
      total: parseFloat(total.toFixed(2)),
      customer: {
        name,
        email,
        address
      }
    });

    await order.save();

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: error.message || 'Failed to process checkout' });
  }
});

module.exports = router;

