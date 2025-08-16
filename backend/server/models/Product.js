const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  animalType: { type: String, required: true },
  cutType: { type: String, required: true },
  processingDate: { type: Date, default: Date.now },
  storageRequirements: String,
  shelfLife: Number, // In days
  packagingDetails: String,
  unitPrice: { type: Number, required: true, min: 0 },
  supplier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Supplier'
  }
});

module.exports = mongoose.model('Product', ProductSchema);