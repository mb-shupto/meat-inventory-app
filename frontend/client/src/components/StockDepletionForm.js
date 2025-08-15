// src/components/StockDepletionForm.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockDepletionForm = ({ onStockDepleted }) => {
  const [products, setProducts] = useState([]);
  const [depletionData, setDepletionData] = useState({
    product: '',
    quantityToDeplete: 0,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setDepletionData({ ...depletionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/inventory/deplete', depletionData);
      onStockDepleted();
      setDepletionData({ product: '', quantityToDeplete: 0 });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Deplete Stock</h2>
      <select name="product" value={depletionData.product} onChange={handleChange} required>
        <option value="">-- Select Product --</option>
        {products.map((product) => (
          <option key={product._id} value={product._id}>
            {product.animalType} - {product.cutType}
          </option>
        ))}
      </select>
      <input
        type="number"
        name="quantityToDeplete"
        value={depletionData.quantityToDeplete}
        onChange={handleChange}
        placeholder="Quantity to Deplete"
        required
        min="1"
      />
      <button type="submit">Deplete</button>
    </form>
  );
};

export default StockDepletionForm;