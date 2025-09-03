import React, { useState } from 'react';
import FinanceSidebar from './financesidebar';
import './financecosting.css';

const FinanceCosting = () => {
  const [activeMenu, setActiveMenu] = useState('Costing & Pricing');
  const [searchTerm, setSearchTerm] = useState('');
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);

  // Plant pricing data
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Tomato',
      currentPrice: 120,
      unit: 'per kilo',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
      productionCost: 45.50,
      simpleROI: 164.84,
      totalExpenses: 78.20,
      netProfit: 41.80,
      salesData: {
        thisHarvest: [12000, 15000, 13500, 16800, 18200, 17500, 19200, 16500, 18800, 20100, 18900, 21500],
        lastHarvest: [8000, 10500, 12200, 14800, 16500, 15200, 17800, 15900, 17200, 18500, 17800, 19200]
      }
    },
    {
      id: 2,
      name: 'Lettuce',
      currentPrice: 89,
      unit: 'per piece',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
      productionCost: 32.20,
      simpleROI: 176.40,
      totalExpenses: 58.90,
      netProfit: 30.10,
      salesData: {
        thisHarvest: [8500, 9200, 8800, 10200, 11500, 10800, 12200, 11000, 12800, 13500, 12900, 14200],
        lastHarvest: [6200, 7800, 8500, 9200, 10100, 9800, 11200, 10500, 11800, 12200, 11900, 12800]
      }
    },
    {
      id: 3,
      name: 'Cabbage',
      currentPrice: 145,
      unit: 'per kilo',
      image: 'https://images.unsplash.com/photo-1594282486809-4b4b7c2b6f18?w=400&h=300&fit=crop',
      productionCost: 52.80,
      simpleROI: 174.62,
      totalExpenses: 89.30,
      netProfit: 55.70,
      salesData: {
        thisHarvest: [10200, 11800, 10900, 13200, 14500, 13800, 15200, 14100, 15900, 16800, 16200, 17500],
        lastHarvest: [7800, 9200, 10100, 11500, 12800, 12100, 13800, 12900, 14200, 15100, 14800, 15900]
      }
    },
    {
      id: 4,
      name: 'Pechay',
      currentPrice: 499,
      unit: 'per bundle',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
      productionCost: 180.20,
      simpleROI: 176.85,
      totalExpenses: 298.50,
      netProfit: 200.50,
      salesData: {
        thisHarvest: [15500, 17200, 16800, 19200, 21500, 20800, 23200, 21900, 24500, 26200, 25800, 27500],
        lastHarvest: [12200, 14500, 15800, 17200, 19100, 18500, 20800, 19900, 21500, 22800, 22200, 23900]
      }
    }
  ]);

  const [modifyData, setModifyData] = useState({
    price: '',
    unit: ''
  });

  const handleEditClick = (plant) => {
    setSelectedPlant(plant);
    setModifyData({
      price: plant.currentPrice.toString(),
      unit: plant.unit
    });
    setShowModifyModal(true);
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setShowDetailModal(true);
  };

  const handleSavePrice = () => {
    if (selectedPlant && modifyData.price) {
      const updatedPlants = plants.map(plant =>
        plant.id === selectedPlant.id
          ? { 
              ...plant, 
              currentPrice: parseFloat(modifyData.price),
              unit: modifyData.unit
            }
          : plant
      );
      setPlants(updatedPlants);
      setShowModifyModal(false);
      setSelectedPlant(null);
      setModifyData({ price: '', unit: '' });
    }
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const generateChartPath = (data) => {
    const maxValue = Math.max(...data);
    const minValue = Math.min(...data);
    const range = maxValue - minValue || 1;
    
    return data.map((value, index) => {
      const x = (index / (data.length - 1)) * 400;
      const y = 100 - ((value - minValue) / range) * 80;
      return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="fco-main-layout">
      <FinanceSidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />
      
      <div className="fco-container">
        {/* Header */}
        <div className="fco-header">
          <h1 className="fco-greeting">Costing and Pricing</h1>
          <div className="fco-header-actions">
            <div className="fco-search-container">
              <input
                type="text"
                placeholder="Search..."
                className="fco-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="fd-search-icon">🔍</span>
            </div>
            <div className="fco-notification">
              <span className="fco-notification-icon">🔔</span>
            </div>
          </div>
        </div>

        {/* Plants Section */}
        <div className="fco-plants-section">
          <h2 className="fco-plants-title">Your plants</h2>
          
          <div className="fco-plants-grid">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="fco-plant-card"
                onClick={() => handlePlantClick(plant)}
              >
                <div className="fco-plant-image">
                  <img src={plant.image} alt={plant.name} />
                </div>
                <div className="fco-plant-info">
                  <h3 className="fco-plant-name">{plant.name}</h3>
                  <p className="fco-plant-price">
                    Current Selling Price: {plant.currentPrice}
                  </p>
                  <p className="fco-plant-unit">Unit: {plant.unit}</p>
                  <button
                    className="fco-edit-button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEditClick(plant);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modify Pricing Modal */}
      {showModifyModal && selectedPlant && (
        <div className="fco-modal-overlay">
          <div className="fco-modal">
            <div className="fco-modal-header">
              <h3>Modify Pricing</h3>
              <button
                className="fco-modal-close"
                onClick={() => setShowModifyModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="fco-modal-content">
              <h2 className="fco-modal-plant-name">{selectedPlant.name}</h2>
              
              <div className="fco-form-group">
                <label>Current Selling Price</label>
                <input
                  type="number"
                  value={modifyData.price}
                  onChange={(e) => setModifyData({...modifyData, price: e.target.value})}
                  className="fco-form-input"
                  placeholder="Enter price"
                />
              </div>

              <div className="fco-form-group">
                <label>Unit</label>
                <select
                  value={modifyData.unit}
                  onChange={(e) => setModifyData({...modifyData, unit: e.target.value})}
                  className="fco-form-select"
                >
                  <option value="per kilo">per kilo</option>
                  <option value="per piece">per piece</option>
                  <option value="per bundle">per bundle</option>
                  <option value="per pack">per pack</option>
                </select>
              </div>

              <div className="fco-modal-actions">
                <button
                  className="fco-cancel-button"
                  onClick={() => setShowModifyModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="fco-save-button"
                  onClick={handleSavePrice}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Plant Detail Modal */}
      {showDetailModal && selectedPlant && (
        <div className="fco-modal-overlay">
          <div className="fco-detail-modal">
            <div className="fco-modal-header">
              <h2>{selectedPlant.name}</h2>
              <button
                className="fco-modal-close"
                onClick={() => setShowDetailModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="fco-detail-content">
              <div className="fco-detail-left">
                <div className="fco-plant-detail-image">
                  <img src={selectedPlant.image} alt={selectedPlant.name} />
                </div>
              </div>
              
              <div className="fco-detail-right">
                {/* Metrics Cards */}
                <div className="fco-metrics-grid">
                  <div className="fco-metric-card">
                    <div className="fco-metric-icon production">🌱</div>
                    <div className="fco-metric-content">
                      <span className="fco-metric-label">Production Cost</span>
                      <span className="fco-metric-value">₱ {selectedPlant.productionCost.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="fco-metric-card">
                    <div className="fco-metric-icon roi">🔵</div>
                    <div className="fco-metric-content">
                      <span className="fco-metric-label">Simple ROI</span>
                      <span className="fco-metric-value">₱ {selectedPlant.simpleROI.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="fco-metric-card">
                    <div className="fco-metric-icon expenses">🔴</div>
                    <div className="fco-metric-content">
                      <span className="fco-metric-label">Total Expenses</span>
                      <span className="fco-metric-value">₱ {selectedPlant.totalExpenses.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="fco-metric-card">
                    <div className="fco-metric-icon profit">🟢</div>
                    <div className="fco-metric-content">
                      <span className="fco-metric-label">Net Profit</span>
                      <span className="fco-metric-value">₱ {selectedPlant.netProfit.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="fco-chart-section">
                  <div className="fco-chart-header">
                    <div className="fco-chart-title">
                      <span className="fco-chart-label">Sale</span>
                      <div className="fco-chart-nav">
                        <button className="fco-nav-btn">‹</button>
                        <span className="fco-year">2022</span>
                        <button className="fco-nav-btn">›</button>
                      </div>
                    </div>
                    <div className="fco-chart-period">
                      <select className="fco-period-select">
                        <option>7 days</option>
                        <option>30 days</option>
                        <option>90 days</option>
                      </select>
                    </div>
                  </div>

                  <div className="fco-chart-container">
                    <div className="fco-chart-y-axis">
                      <span>25k</span>
                      <span>20k</span>
                      <span>15k</span>
                      <span>10k</span>
                      <span>5k</span>
                    </div>
                    
                    <div className="fco-chart-area">
                      <svg viewBox="0 0 400 120" className="fco-chart-svg">
                        <defs>
                          <linearGradient id="thisHarvestGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)" />
                            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.05)" />
                          </linearGradient>
                        </defs>
                        
                        {/* This Harvest Area */}
                        <path
                          d={`${generateChartPath(selectedPlant.salesData.thisHarvest)} L 400 100 L 0 100 Z`}
                          fill="url(#thisHarvestGradient)"
                        />
                        
                        {/* This Harvest Line */}
                        <path
                          d={generateChartPath(selectedPlant.salesData.thisHarvest)}
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="2"
                        />
                        
                        {/* Last Harvest Line */}
                        <path
                          d={generateChartPath(selectedPlant.salesData.lastHarvest)}
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="2"
                          strokeDasharray="5,5"
                        />
                        
                        {/* Peak indicator */}
                        <circle cx="350" cy="20" r="4" fill="#1e40af" />
                        <text x="355" y="15" fontSize="10" fill="#1e40af" fontWeight="bold">₱4,509</text>
                      </svg>
                    </div>
                    
                    <div className="fco-chart-legend">
                      <div className="fco-legend-item">
                        <span className="fco-legend-dot this-harvest"></span>
                        <span className="fco-legend-text">This Harvest</span>
                      </div>
                      <div className="fco-legend-item">
                        <span className="fco-legend-dot last-harvest"></span>
                        <span className="fco-legend-text">Last Harvest</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FinanceCosting;
