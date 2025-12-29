const express = require('express');
const router = express.Router();
const axios = require('axios');

const FAKESTORE_API = 'https://fakestoreapi.com/products';

// GET /api/products - Get all products from FakeStore API
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(FAKESTORE_API);
    const products = response.data.map(product => ({
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      inStock: true
    }));
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// GET /api/products/:id - Get product by ID from FakeStore API
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${FAKESTORE_API}/${req.params.id}`);
    const product = response.data;
    res.json({
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      rating: product.rating,
      inStock: true
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;

