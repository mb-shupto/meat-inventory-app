const express = require('express');
const router = express.Router();
const Recall = require('../models/Recall');
const Inventory = require('../models/Inventory');

// POST route to initiate a new recall
router.post('/', async (req, res) => {
  const { batchNumber, reason } = req.body;

  try {
    // 1. Create a new recall record
    const newRecall = new Recall({
      batchNumber,
      reason,
    });
    await newRecall.save();

    // 2. Find and "flag" the associated inventory items
    // You could add a 'isRecalled: Boolean' field to the Inventory model
    const recalledItems = await Inventory.updateMany(
      { batchNumber },
      { $set: { isRecalled: true } }
    );

    res.status(201).json({
      message: 'Recall initiated successfully.',
      recall: newRecall,
      affectedItems: recalledItems.nModified,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET route to view all recall records
router.get('/', async (req, res) => {
  try {
    const recalls = await Recall.find().sort({ recallDate: -1 });
    res.json(recalls);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;