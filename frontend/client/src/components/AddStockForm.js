// src/components/AddStockForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddStockForm = ({ onStockAdded }) => {
  const [stockData, setStockData] = useState({
    product: '',
    quantity: '',
    storageFacility: '',
    batchNumber: '',
    expirationDate: '',
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products');
      setProducts(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setStockData({ ...stockData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/inventory', stockData);
      onStockAdded();
      setStockData({
        product: '',
        quantity: '',
        storageFacility: '',
        batchNumber: '',
        expirationDate: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Stock Batch</h2>
      <select name="product" value={stockData.product} onChange={handleChange} required>
        <option value="">-- Select Product --</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.animalType} - {product.cutType}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="quantity"
        value={stockData.quantity}
        onChange={handleChange}
        placeholder="Quantity"
        required
      />
      <input
        type="text"
        name="storageFacility"
        value={stockData.storageFacility}
        onChange={handleChange}
        placeholder="Storage Facility (e.g., Warehouse A)"
        required
      />
      <input
        type="text"
        name="batchNumber"
        value={stockData.batchNumber}
        onChange={handleChange}
        placeholder="Batch Number"
        required
      />
      <input
        type="date"
        name="expirationDate"
        value={stockData.expirationDate}
        onChange={handleChange}
        required
      />
      <button type="submit">Add Stock</button>
    </form>
  );
};

export default AddStockForm;