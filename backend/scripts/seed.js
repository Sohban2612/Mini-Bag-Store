const mongoose = require('mongoose');
const Product = require('../models/Product');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mini-bag-store';

const products = [
  {
    name: 'Classic Leather Tote',
    description: 'A timeless leather tote bag perfect for everyday use. Made from premium genuine leather with spacious interior and sturdy handles.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'bag',
    inStock: true
  },
  {
    name: 'Vintage Crossbody Bag',
    description: 'Compact and stylish crossbody bag with adjustable strap. Features multiple compartments and a vintage-inspired design.',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
    category: 'bag',
    inStock: true
  },
  {
    name: 'Modern Backpack',
    description: 'Sleek and functional backpack with laptop compartment. Perfect for work or travel with water-resistant material.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'bag',
    inStock: true
  },
  {
    name: 'Designer Clutch',
    description: 'Elegant evening clutch with gold-tone hardware. Perfect for special occasions and formal events.',
    price: 65.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
    category: 'bag',
    inStock: true
  },
  {
    name: 'Canvas Messenger Bag',
    description: 'Durable canvas messenger bag with multiple pockets. Ideal for students and professionals who need to carry essentials.',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'bag',
    inStock: true
  },
  {
    name: 'Luxury Handbag',
    description: 'Premium handbag crafted from high-quality materials. Features elegant design with spacious interior and secure closure.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
    category: 'bag',
    inStock: true
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert new products
    await Product.insertMany(products);
    console.log(`Seeded ${products.length} products`);

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();



