const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// server/routes/productRoutes.js

// GET all products with optional search
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    let products;
    if (query) {
      // Create a case-insensitive search using a regular expression
      const regex = new RegExp(query, 'i');
      products = await Product.find({
        $or: [{ animalType: regex }, { cutType: regex }]
      }).populate('supplier');
    } else {
      products = await Product.find().populate('supplier');
    }
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ... (other product routes remain the same) ...

// CREATE a new product
router.post('/', async (req, res) => {
  const product = new Product({
    animalType: req.body.animalType,
    cutType: req.body.cutType,
    storageRequirements: req.body.storageRequirements,
    shelfLife: req.body.shelfLife,
    packagingDetails: req.body.packagingDetails,
    supplier: req.body.supplier
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// You'll add an UPDATE route here later

module.exports = router;