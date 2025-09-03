import React, { useState } from 'react';
import FarmerSidebar from './farmersidebar'; // Your existing sidebar component
import './farmerplants.css';

const FarmerPlants = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showPlantDetails, setShowPlantDetails] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeMenu, setActiveMenu] = useState('Plants');
  
  // Sample plant data with images
  const [plants, setPlants] = useState([
    {
      id: 1,
      name: 'Tomato',
      area: 'Area: Plot 1',
      status: 'Status: Seedling',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=400&h=300&fit=crop',
      sensorData: {
        temp: '25.0°C',
        humidity: '65%',
        ph: '6.8',
        ec: '1.4 μS/cm',
        nitrogen: 45,
        phosphorus: 25,
        potassium: 55
      }
    },
    {
      id: 2,
      name: 'Lettuce',
      area: 'Area: Plot 3',
      status: 'Status: Seedling',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=400&h=300&fit=crop',
      sensorData: {
        temp: '22.5°C',
        humidity: '70%',
        ph: '6.2',
        ec: '1.1 μS/cm',
        nitrogen: 40,
        phosphorus: 20,
        potassium: 45
      }
    },
    {
      id: 3,
      name: 'Cabbage',
      area: 'Area: Plot 2',
      status: 'Status: Seedling',
      image: 'https://images.unsplash.com/photo-1594282486809-4b4b7c2b6f18?w=400&h=300&fit=crop',
      sensorData: {
        temp: '20.0°C',
        humidity: '60%',
        ph: '6.5',
        ec: '1.2 μS/cm',
        nitrogen: 50,
        phosphorus: 30,
        potassium: 60
      }
    },
    {
      id: 4,
      name: 'Pechay',
      area: 'Area: Plot 1',
      status: 'Status: Seedling',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=300&fit=crop',
      sensorData: {
        temp: '23.0°C',
        humidity: '68%',
        ph: '6.0',
        ec: '1.0 μS/cm',
        nitrogen: 35,
        phosphorus: 22,
        potassium: 40
      }
    }
  ]);

  const [newPlant, setNewPlant] = useState({
    name: '',
    seedType: '',
    plot: '',
    quantity: ''
  });

  const handleAddPlant = () => {
    if (newPlant.name && newPlant.seedType && newPlant.plot && newPlant.quantity) {
      const plant = {
        id: plants.length + 1,
        name: newPlant.name,
        area: `Area: Plot ${newPlant.plot}`,
        status: 'Status: Seedling',
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop',
        sensorData: {
          temp: '24.0°C',
          humidity: '62%',
          ph: '6.5',
          ec: '1.2 μS/cm',
          nitrogen: 42,
          phosphorus: 28,
          potassium: 50
        }
      };
      setPlants([...plants, plant]);
      setNewPlant({ name: '', seedType: '', plot: '', quantity: '' });
      setShowAddModal(false);
    }
  };

  const handlePlantClick = (plant) => {
    setSelectedPlant(plant);
    setShowPlantDetails(true);
  };

  const filteredPlants = plants.filter(plant =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="fp-main-layout">
      <FarmerSidebar 
        activeMenu={activeMenu} 
        setActiveMenu={setActiveMenu} 
      />
      
      <div className="fp-container">
        {/* ✅ Fixed header alignment */}
        <div className="fp-header">
          <h1 className="fp-greeting">Hello, Farmer!</h1>
          <div className="fp-header-actions">
            <div className="fp-search-container">
              <input
                type="text"
                placeholder="Search..."
                className="fp-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="fp-search-icon">🔍</span>
            </div>
            <div className="fp-notification">
              <span className="fp-notification-icon">🔔</span>
            </div>
          </div>
        </div>

        <div className="fp-plants-section">
          <div className="fp-plants-header">
            <h2 className="fp-plants-title">Your plants</h2>
            <button
              className="fp-add-button"
              onClick={() => setShowAddModal(true)}
            >
              ADD NEW +
            </button>
          </div>

          <div className="fp-plants-grid">
            {filteredPlants.map((plant) => (
              <div
                key={plant.id}
                className="fp-plant-card"
                onClick={() => handlePlantClick(plant)}
              >
                <div className="fp-plant-image">
                  <img src={plant.image} alt={plant.name} />
                </div>
                <div className="fp-plant-info">
                  <h3 className="fp-plant-name">{plant.name}</h3>
                  <p className="fp-plant-area">{plant.area}</p>
                  <p className="fp-plant-status">{plant.status}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Plant Modal */}
        {showAddModal && (
          <div className="fp-modal-overlay">
            <div className="fp-modal">
              <div className="fp-modal-header">
                <h3>Add New Plant</h3>
                <button
                  className="fp-modal-close"
                  onClick={() => setShowAddModal(false)}
                >
                  ×
                </button>
              </div>
              <div className="fp-modal-content">
                <div className="fp-form-group">
                  <label>Plant Name</label>
                  <select
                    value={newPlant.name}
                    onChange={(e) => setNewPlant({ ...newPlant, name: e.target.value })}
                    className="fp-form-select"
                  >
                    <option value="">Select plant name</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Lettuce">Lettuce</option>
                    <option value="Cabbage">Cabbage</option>
                    <option value="Pechay">Pechay</option>
                    <option value="Carrots">Carrots</option>
                    <option value="Cucumber">Cucumber</option>
                  </select>
                </div>

                <div className="fp-form-group">
                  <label>Seed Type (from inventory)</label>
                  <select
                    value={newPlant.seedType}
                    onChange={(e) => setNewPlant({ ...newPlant, seedType: e.target.value })}
                    className="fp-form-select"
                  >
                    <option value="">Select seed type</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Organic">Organic</option>
                    <option value="Traditional">Traditional</option>
                  </select>
                </div>

                <div className="fp-form-group">
                  <label>Plot # (Suggested)</label>
                  <input
                    type="text"
                    value={newPlant.plot}
                    onChange={(e) => setNewPlant({ ...newPlant, plot: e.target.value })}
                    className="fp-form-input"
                    placeholder="Enter plot number"
                  />
                </div>

                <div className="fp-form-group">
                  <label>Quantity to Plant</label>
                  <input
                    type="number"
                    value={newPlant.quantity}
                    onChange={(e) => setNewPlant({ ...newPlant, quantity: e.target.value })}
                    className="fp-form-input"
                    placeholder="Enter quantity"
                  />
                </div>

                <div className="fp-modal-actions">
                  <button
                    className="fp-cancel-button"
                    onClick={() => setShowAddModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="fp-add-plant-button"
                    onClick={handleAddPlant}
                  >
                    Add Plant
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Plant Details Modal */}
        {showPlantDetails && selectedPlant && (
          <div className="fp-modal-overlay">
            <div className="fp-details-modal">
              <div className="fp-modal-header">
                <h3>🌱 Plant Details: {selectedPlant.name}</h3>
                <button
                  className="fp-modal-close"
                  onClick={() => setShowPlantDetails(false)}
                >
                  ×
                </button>
              </div>
              <div className="fp-details-content">
                <div className="fp-details-left">
                  <div className="fp-details-section">
                    <h4>Image</h4>
                    <div className="fp-plant-detail-image">
                      <img src={selectedPlant.image} alt={selectedPlant.name} />
                    </div>
                  </div>
                  <div className="fp-details-section">
                    <h4>Details</h4>
                    <div className="fp-plant-details-info">
                      <p><strong>Name:</strong> {selectedPlant.name}</p>
                      <p><strong>Type:</strong> {selectedPlant.name}</p>
                      <p><strong>Status:</strong> Seedling</p>
                      <p><strong>Date Planted:</strong> 4/3/2025</p>
                    </div>
                  </div>
                </div>
                
                <div className="fp-details-right">
                  <div className="fp-details-section">
                    <h4>Latest Sensor Readings</h4>
                    <div className="fp-sensor-grid">
                      <div className="fp-sensor-item temp">
                        <span className="fp-sensor-icon">🌡️</span>
                        <span className="fp-sensor-label">Temp</span>
                        <span className="fp-sensor-value">{selectedPlant.sensorData.temp}</span>
                      </div>
                      <div className="fp-sensor-item humidity">
                        <span className="fp-sensor-icon">💧</span>
                        <span className="fp-sensor-label">Humidity</span>
                        <span className="fp-sensor-value">{selectedPlant.sensorData.humidity}</span>
                      </div>
                      <div className="fp-sensor-item ph">
                        <span className="fp-sensor-icon">🧪</span>
                        <span className="fp-sensor-label">pH</span>
                        <span className="fp-sensor-value">{selectedPlant.sensorData.ph}</span>
                      </div>
                      <div className="fp-sensor-item ec">
                        <span className="fp-sensor-icon">⚡</span>
                        <span className="fp-sensor-label">EC</span>
                        <span className="fp-sensor-value">{selectedPlant.sensorData.ec}</span>
                      </div>
                    </div>
                    
                    <div className="fp-nutrients-grid">
                      <div className="fp-nutrient-item">
                        <span className="fp-nutrient-label">Nitrogen (N)</span>
                        <span className="fp-nutrient-value nitrogen">{selectedPlant.sensorData.nitrogen}</span>
                      </div>
                      <div className="fp-nutrient-item">
                        <span className="fp-nutrient-label">Phosphorus (P)</span>
                        <span className="fp-nutrient-value phosphorus">{selectedPlant.sensorData.phosphorus || '-'}</span>
                      </div>
                      <div className="fp-nutrient-item">
                        <span className="fp-nutrient-label">Potassium (K)</span>
                        <span className="fp-nutrient-value potassium">{selectedPlant.sensorData.potassium}</span>
                      </div>
                    </div>
                    
                    <p className="fp-reading-time">Reading taken: 4/21/2025, 12:00:00 AM</p>
                  </div>

                  <div className="fp-details-section">
                    <h4>📅 Plant Event History</h4>
                    <div className="fp-event-history">
                      <p>No event history found for this plant.</p>
                    </div>
                  </div>

                  <div className="fp-details-section">
                    <h4>Full Sensor History</h4>
                    <div className="fp-sensor-history">
                      <table className="fp-history-table">
                        <thead>
                          <tr>
                            <th>TIMESTAMP</th>
                            <th>TEMP</th>
                            <th>HUMID</th>
                            <th>PH</th>
                            <th>EC</th>
                            <th>N</th>
                            <th>P</th>
                            <th>K</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>4/21/2025, 12:00:00 AM</td>
                            <td>25.0</td>
                            <td>20</td>
                            <td>6.5</td>
                            <td>1.2</td>
                            <td>50</td>
                            <td>-</td>
                            <td>60</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FarmerPlants;
