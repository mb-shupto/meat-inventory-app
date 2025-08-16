// src/components/RecallForm.js

import React, { useState } from 'react';
import axios from 'axios';

const RecallForm = ({ onRecallInitiated }) => {
  const [recallData, setRecallData] = useState({
    batchNumber: '',
    reason: '',
  });

  const handleChange = (e) => {
    setRecallData({ ...recallData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/recalls', recallData);
      alert('Recall initiated successfully!');
      onRecallInitiated();
      setRecallData({ batchNumber: '', reason: '' });
    } catch (err) {
      console.error(err);
      alert('Error initiating recall.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Initiate Product Recall</h2>
      <input
        type="text"
        name="batchNumber"
        value={recallData.batchNumber}
        onChange={handleChange}
        placeholder="Batch Number to Recall"
        required
      />
      <textarea
        name="reason"
        value={recallData.reason}
        onChange={handleChange}
        placeholder="Reason for recall (e.g., contamination issue)"
        required
      />
      <button type="submit">Initiate Recall</button>
    </form>
  );
};

export default RecallForm;