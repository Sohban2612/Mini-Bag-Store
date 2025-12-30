const express = require('express');
const router = express.Router();
const axios = require('axios');


const DUMMY_API = 'https://dummyjson.com/products';

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
    const response = await axios.get(DUMMY_API, axiosConfig);

    // 🔁 DummyJSON gives products inside "products"
    const products = response.data.products.map(product => ({
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.thumbnail,
      category: product.category,
      rating: product.rating,
      inStock: product.stock > 0
    }));

    res.status(200).json(products);
  } catch (error) {
    console.error(
      'Error fetching products:',
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
      `${DUMMY_API}/${req.params.id}`,
      axiosConfig
    );

    const product = response.data;

    res.status(200).json({
      _id: product.id.toString(),
      name: product.title,
      description: product.description,
      price: product.price,
      image: product.thumbnail,
      category: product.category,
      rating: product.rating,
      inStock: product.stock > 0
    });

  } catch (error) {
    if (error.response?.status === 404) {
      return res.status(404).json({ error: 'Product not found' });
    }

    console.error(
      'Error fetching product:',
      error.message
    );

    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

module.exports = router;
