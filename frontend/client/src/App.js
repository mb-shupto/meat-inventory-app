// src/App.js

import React, { useState } from 'react';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import AddStockForm from './components/AddStockForm';
import InventoryDashboard from './components/InventoryDashboard';
import StockDepletionForm from './components/StockDepletionForm';
import ExpirationAlerts from './components/ExpirationAlerts'; 
import RecallForm from './components/RecallForm';
import './App.css';

function App() {
  const [refreshState, setRefreshState] = useState(false);
  const [view, setView] = useState('inventory');

  const handleRefresh = () => {
    setRefreshState(!refreshState);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Meat Inventory Management</h1>
        <nav>
          <button onClick={() => setView('products')}>Products</button>
          <button onClick={() => setView('inventory')}>Inventory</button>
          <button onClick={() => setView('deplete')}>Deplete Stock</button>
          <button onClick={() => setView('alerts')}>Expiring Alerts</button>
          <button onClick={() => setView('recall')}>Recall</button> {/* <-- New Button */}
        </nav>
      </header>
      <main>
        {view === 'products' && (
          <>
            <ProductForm onProductAdded={handleRefresh} />
            <hr />
            <ProductList refreshList={refreshState} />
          </>
        )}
        {view === 'inventory' && (
          <>
            <AddStockForm onStockAdded={handleRefresh} />
            <hr />
            <InventoryDashboard refreshDashboard={refreshState} />
          </>
        )}
        {view === 'deplete' && (
          <>
            <StockDepletionForm onStockDepleted={handleRefresh} />
          </>
        )}
        {view === 'alerts' && (
          <ExpirationAlerts refreshAlerts={handleRefresh} />
        )}
        {view === 'recall' && (
          <RecallForm onRecallInitiated={handleRefresh} /> // <-- New component
        )}
      </main>
    </div>
  );
}

export default App;