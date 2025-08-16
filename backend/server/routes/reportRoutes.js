const express = require('express');
const router = express.Router();
const Inventory = require('../models/Inventory');
const Product = require('../models/product');

// GET total inventory value report
router.get('/total-value', async (req, res) => {
  try {
    const totalValue = await Inventory.aggregate([
      // Stage 1: Join with the 'products' collection to get the unit price
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      // Stage 2: Deconstruct the productDetails array
      { $unwind: '$productDetails' },
      // Stage 3: Calculate the value for each inventory item
      {
        $project: {
          value: { $multiply: ['$quantity', '$productDetails.unitPrice'] }
        }
      },
      // Stage 4: Sum all the values
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$value' }
        }
      }
    ]);

    // Return 0 if there's no data
    res.json({ totalValue: totalValue.length > 0 ? totalValue[0].totalValue : 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET inventory by product type report
router.get('/by-type', async (req, res) => {
  try {
    const inventoryByType = await Inventory.aggregate([
      // Stage 1: Join with the 'products' collection
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      // Stage 2: Deconstruct the productDetails array
      { $unwind: '$productDetails' },
      // Stage 3: Calculate the value for each inventory item
      {
        $project: {
          value: { $multiply: ['$quantity', '$productDetails.unitPrice'] }
        }
      },
      // Stage 4: Sum all the values
      {
        $group: {
          _id: null,
          totalValue: { $sum: '$value' }
        }
      }
    ]);

    // Return 0 if there's no data
    res.json({ totalValue: totalValue.length > 0 ? totalValue[0].totalValue : 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET inventory by product type report
router.get('/by-type', async (req, res) => {
  try {
    const inventoryByType = await Inventory.aggregate([
      // Stage 1: Join with the 'products' collection
      {
        $lookup: {
          from: 'products',
          localField: 'product',
          foreignField: '_id',
          as: 'productDetails'
        }
      },
      // Stage 2: Deconstruct the productDetails array
      { $unwind: '$productDetails' },
      // Stage 3: Group by animal type and cut type and sum quantities
      {
        $group: {
          _id: {
            animalType: '$productDetails.animalType',
            cutType: '$productDetails.cutType'
          },
          totalQuantity: { $sum: '$quantity' }
        }
      }
    ]);

    res.json(inventoryByType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;