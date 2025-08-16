// server.js
require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;
// Import routes
const productRoutes = require('./routes/productRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const recallRoutes = require('./routes/recallRoutes');
const reportRoutes = require('./routes/reportRoutes');

// Use routes
app.use('/api/products', productRoutes);

// Middleware to parse JSON bodies
app.use(express.json());
app.use('/api/suppliers', supplierRoutes);
app.use('/api/inventory', inventoryRoutes); 
app.use('api/products', productRoutes);
app.use('/api/recalls', recallRoutes);
app.use('/api/reports', reportRoutes);

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected successfully!');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Basic route to confirm server is running
app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});