const express = require('express');
const router = express.Router();
const axios = require('axios');

const FAKESTORE_API = 'https://fakestoreapi.com/products';

// ✅ Axios config to bypass Cloudflare blocking
const axiosConfig = {
  headers: {
    "User-Agent": "Mozilla/5.0",
    "Accept": "application/json"
  },
  timeout: 10000
};

// ===============================
// GET /api/products
// ===============================
router.get('/', async (req, res) => {
  try {
    const response = await axios.get(FAKESTORE_API, axiosConfig);

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

    res.status(200).json(products);
  } catch (error) {
    console.error(
      'Error fetching products:',
      error.response?.status,
      error.message
    );

    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// ===============================
// GET /api/products/:id
// ===============================
router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(
      `${FAKESTORE_API}/${req.params.id}`,
      axiosConfig
    );

    const product = response.data;

    res.status(200).json({
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
    console.error(
      'Error fetching product:',
      error.response?.status,
      error.message
    );

    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;