// src/components/ReportingDashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const ReportingDashboard = () => {
  const [totalValueData, setTotalValueData] = useState(0);
  const [inventoryByTypeData, setInventoryByTypeData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const valueRes = await axios.get('http://localhost:5000/api/reports/total-value');
      setTotalValueData(valueRes.data.totalValue);

      const typeRes = await axios.get('http://localhost:5000/api/reports/by-type');
      const labels = typeRes.data.map(item => `${item._id.animalType} - ${item._id.cutType}`);
      const quantities = typeRes.data.map(item => item.totalQuantity);
      
      setInventoryByTypeData({
        labels: labels,
        datasets: [{
          label: 'Total Quantity',
          data: quantities,
          backgroundColor: [
            '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40'
          ],
        }]
      });

    } catch (err) {
      console.error(err);
    }
  };

  const doughnutData = {
    labels: ['Total Inventory Value'],
    datasets: [
      {
        data: [totalValueData, 0], // The second value is a placeholder
        backgroundColor: ['#36A2EB', '#E0E0E0'],
        hoverBackgroundColor: ['#36A2EB', '#E0E0E0']
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Inventory by Product Type' }
    }
  };

  return (
    <div>
      <h2>Reporting Dashboard</h2>
      <div>
        <h3>Total Inventory Value: ${totalValueData.toFixed(2)}</h3>
        <div style={{ width: '300px', margin: 'auto' }}>
          <Doughnut data={doughnutData} />
        </div>
      </div>
      <hr />
      <div>
        <h3>Inventory Quantities</h3>
        <Bar data={inventoryByTypeData} options={options} />
      </div>
    </div>
  );
};

export default ReportingDashboard;