const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');

// GET all inventory records with optional search
router.get('/', async (req, res) => {
  try {
    const { query } = req.query;
    let inventory;
    if (query) {
      const regex = new RegExp(query, 'i');
      inventory = await Inventory.find({
        $or: [{ batchNumber: regex }, { storageFacility: regex }]
      }).populate('product');
    } else {
      inventory = await Inventory.find().populate('product');
    }
    res.json(inventory);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET expiring inventory records
router.get('/expiring', async (req, res) => {
  try {
    const today = new Date();
    const alertDate = new Date();
    // Set a date for the alert threshold (e.g., 7 days from now)
    alertDate.setDate(today.getDate() + 7);


// Find all inventory items where the expiration date is between today and the alert threshold
    const expiringItems = await Inventory.find({
      expirationDate: {
        $gte: today,
        $lte: alertDate,
      },
    }).populate('product');

    res.json(expiringItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// CREATE a new inventory record (add a new batch)
router.post('/', async (req, res) => {
  const inventory = new Inventory({
    product: req.body.product,
    quantity: req.body.quantity,
    storageFacility: req.body.storageFacility,
    batchNumber: req.body.batchNumber,
    expirationDate: req.body.expirationDate,
  });

  try {
    const newInventory = await inventory.save();
    res.status(201).json(newInventory);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;