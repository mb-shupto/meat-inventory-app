// src/components/ExpirationAlerts.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ExpirationAlerts.css'; // Assuming you have some styles for this component

const ExpirationAlerts = ({ refreshAlerts }) => {
  const [expiringItems, setExpiringItems] = useState([]);

  useEffect(() => {
    const fetchExpiringItems = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/inventory/expiring');
        setExpiringItems(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchExpiringItems();
  }, [refreshAlerts]);

  return (
    <div className="alerts-container">
      <h2>Products Nearing Expiration</h2>
      {expiringItems.length > 0 ? (
        <table className="alerts-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Batch Number</th>
              <th>Quantity</th>
              <th>Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            {expiringItems.map((item) => (
              <tr key={item._id} className="expiring-item">
                <td>{item.product.animalType} - {item.product.cutType}</td>
                <td>{item.batchNumber}</td>
                <td>{item.quantity}</td>
                <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products are nearing expiration.</p>
      )}
    </div>
  );
};

export default ExpirationAlerts;