// src/components/ProductForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductForm = ({ onProductAdded }) => {
  const [productData, setProductData] = useState({
    animalType: '',
    cutType: '',
    storageRequirements: '',
    shelfLife: '',
    packagingDetails: '',
    supplier: '',
  });
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/suppliers');
      setSuppliers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/products', productData);
      onProductAdded();
      setProductData({
        animalType: '',
        cutType: '',
        storageRequirements: '',
        shelfLife: '',
        packagingDetails: '',
        supplier: '',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add New Product</h2>
      <input
        type="text"
        name="animalType"
        value={productData.animalType}
        onChange={handleChange}
        placeholder="Animal Type (e.g., Beef)"
        required
      />
      <input
        type="text"
        name="cutType"
        value={productData.cutType}
        onChange={handleChange}
        placeholder="Cut Type (e.g., Ribeye)"
        required
      />
      {/* Supplier Dropdown */}
      <select name="supplier" value={productData.supplier} onChange={handleChange} required>
        <option value="">-- Select Supplier --</option>
        {suppliers.map((supplier) => (
          <option key={supplier._id} value={supplier._id}>
            {supplier.name}
          </option>
        ))}
      </select>
      <button type="submit">Add Product</button>
    </form>
  );
};

export default ProductForm;