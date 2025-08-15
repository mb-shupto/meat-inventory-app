// src/components/ProductList.js

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const ProductList = ({ refreshList }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');


  const fetchProducts = useCallback(async () => {
  try {
    const url = searchQuery ? `http://localhost:5000/api/products?query=${searchQuery}` : `http://localhost:5000/api/products`;
    const res = await axios.get(url); // Use the url variable here
    setProducts(res.data);
  } catch (err) {
    console.error(err);
  }
}, [searchQuery]);


    useEffect(() => {
  fetchProducts();
}, [refreshList, searchQuery, fetchProducts]); // This hook will re-run when `refreshList` changes


  return (
    <div>
      <h2>Product List</h2>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <table>
        <thead>
          <tr>
            <th>Animal Type</th>
            <th>Cut Type</th>
            <th>Processing Date</th>
            <th>Supplier</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.animalType}</td>
              <td>{product.cutType}</td>
              <td>{new Date(product.processingDate).toLocaleDateString()}</td>
              <td>{product.supplier ? product.supplier.name : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;