const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const axios = require('axios');

const FAKESTORE_API = 'https://fakestoreapi.com/products';

// Helper function to get or create cart
async function getOrCreateCart(sessionId = 'default') {
  let cart = await Cart.findOne({ sessionId });
  if (!cart) {
    cart = new Cart({ sessionId, items: [] });
    await cart.save();
  }
  return cart;
}

// Helper function to fetch product from FakeStore API
async function fetchProduct(productId) {
  try {
    const response = await axios.get(`${FAKESTORE_API}/${productId}`);
    const product = response.data;
    return {
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating
    };
  } catch (error) {
    return null;
  }
}

// POST /api/cart - Add product to cart
router.post('/', async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    
    if (!productId) {
      return res.status(400).json({ error: 'Product ID is required' });
    }

    // Fetch product from FakeStore API
    const product = await fetchProduct(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const cart = await getOrCreateCart();
    
    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.productId === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      // Store product data directly in cart item
      cart.items.push({ 
        productId, 
        quantity,
        productData: product // Store full product data
      });
    }

    await cart.save();
    
    // Format response with product data
    const formattedCart = {
      ...cart.toObject(),
      items: cart.items.map(item => ({
        ...item.toObject(),
        productId: item.productData || { _id: item.productId }
      }))
    };
    
    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/cart - Get cart items
router.get('/', async (req, res) => {
  try {
    const cart = await getOrCreateCart();
    
    // Fetch product data for items that don't have it stored
    const itemsWithProducts = await Promise.all(
      cart.items.map(async (item) => {
        if (item.productData) {
          return {
            ...item.toObject(),
            productId: item.productData
          };
        } else {
          const product = await fetchProduct(item.productId);
          return {
            ...item.toObject(),
            productId: product || { _id: item.productId }
          };
        }
      })
    );
    
    res.json({
      ...cart.toObject(),
      items: itemsWithProducts
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE /api/cart/:id - Remove product from cart
router.delete('/:id', async (req, res) => {
  try {
    const cart = await getOrCreateCart();
    cart.items = cart.items.filter(
      item => item.productId.toString() !== req.params.id
    );
    await cart.save();
    
    // Format response
    const formattedCart = {
      ...cart.toObject(),
      items: cart.items.map(item => ({
        ...item.toObject(),
        productId: item.productData || { _id: item.productId }
      }))
    };
    
    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

