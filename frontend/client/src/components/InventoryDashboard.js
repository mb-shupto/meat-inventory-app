// src/components/InventoryDashboard.js

import React, { useState, useEffect ,useCallback} from 'react';
import axios from 'axios';

const InventoryDashboard = ({ refreshDashboard }) => {
const [inventory, setInventory] = useState([]);
const [searchQuery, setSearchQuery] = useState('');


const fetchInventory = useCallback(async () => {
    try {
      const url = searchQuery ? `http://localhost:5000/api/inventory?query=${searchQuery}` : `http://localhost:5000/api/inventory`;
      const res = await axios.get(url);
      setInventory(res.data);
    } catch (err) {
      console.error(err);
    }
  }, [searchQuery]);

    useEffect(() => {fetchInventory();}, [refreshDashboard, searchQuery, fetchInventory]); // Re-fetch inventory when refreshDashboard or searchQuery changes

  return (
    <div>
      <h2>Current Inventory</h2>
      <input
        type="text"
        placeholder="Search inventory..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '1rem' }}
      />
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Batch Number</th>
            <th>Storage Facility</th>
            <th>Expiration Date</th>
          </tr>
        </thead>
        <tbody>
          {inventory.map((item) => (
            <tr key={item._id}>
              <td>{item.product.animalType} - {item.product.cutType}</td>
              <td>{item.quantity}</td>
              <td>{item.batchNumber}</td>
              <td>{item.storageFacility}</td>
              <td>{new Date(item.expirationDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryDashboard;