import React, { useState } from 'react'
import Sidebar from './sidebar'
import './planting.css'

const Planting = ({ userType = 'admin' }) => {
  const [activeMenu, setActiveMenu] = useState('Planting')
  const [searchTerm, setSearchTerm] = useState('')
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedPlant, setSelectedPlant] = useState(null)
  const [editFormData, setEditFormData] = useState({
    plotNumber: '',
    status: '',
    currentSellingPrice: '',
    unit: ''
  })

  // Plant data matching the image
  const [plants, setPlantsData] = useState([
    {
      id: 1,
      name: 'Tomato',
      image: 'https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=300&h=200&fit=crop',
      areaPlanted: '90 sqm',
      status: 'Seedling',
      currentSellingPrice: '120',
      unit: 'per kilo',
      editColor: '#FF6B6B',
      plotNumber: 'Plot A-1'
    },
    {
      id: 2,
      name: 'Lettuce',
      image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=200&fit=crop',
      areaPlanted: '50 sqm',
      status: 'Seedling',
      currentSellingPrice: '85',
      unit: 'per piece',
      editColor: '#4ECDC4',
      plotNumber: 'Plot B-2'
    },
    {
      id: 3,
      name: 'Cabbage',
      image: 'https://images.unsplash.com/photo-1594282486558-4d2d2f2b8df5?w=300&h=200&fit=crop',
      areaPlanted: '75 sqm',
      status: 'Seedling',
      currentSellingPrice: '145',
      unit: 'per kilo',
      editColor: '#45B7D1',
      plotNumber: 'Plot C-3'
    },
    {
      id: 4,
      name: 'Pechay',
      image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=200&fit=crop',
      areaPlanted: '40 sqm',
      status: 'Seedling',
      currentSellingPrice: '496',
      unit: 'per bundle',
      editColor: '#96CEB4',
      plotNumber: 'Plot D-4'
    }
  ])

  const plotOptions = [
    'Plot A-1', 'Plot A-2', 'Plot A-3',
    'Plot B-1', 'Plot B-2', 'Plot B-3',
    'Plot C-1', 'Plot C-2', 'Plot C-3',
    'Plot D-1', 'Plot D-2', 'Plot D-3', 'Plot D-4'
  ]

  const statusOptions = [
    'Seedling', 'Growing', 'Flowering', 'Fruiting', 'Harvesting', 'Completed'
  ]

  const unitOptions = [
    'per kilo', 'per piece', 'per bundle', 'per pack', 'per dozen'
  ]

  const handleEdit = (plant) => {
    setSelectedPlant(plant)
    setEditFormData({
      plotNumber: plant.plotNumber,
      status: plant.status,
      currentSellingPrice: plant.currentSellingPrice,
      unit: plant.unit
    })
    setShowEditModal(true)
  }

  const handleCloseModal = () => {
    setShowEditModal(false)
    setSelectedPlant(null)
    setEditFormData({
      plotNumber: '',
      status: '',
      currentSellingPrice: '',
      unit: ''
    })
  }

  const handleInputChange = (field, value) => {
    setEditFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSave = () => {
    setPlantsData(prev => prev.map(plant => 
      plant.id === selectedPlant.id 
        ? {
            ...plant,
            plotNumber: editFormData.plotNumber,
            status: editFormData.status,
            currentSellingPrice: editFormData.currentSellingPrice,
            unit: editFormData.unit
          }
        : plant
    ))
    
    console.log('Plant updated:', {
      plantId: selectedPlant.id,
      plantName: selectedPlant.name,
      updatedData: editFormData
    })
    
    handleCloseModal()
  }

  return (
    <div className="dashboard-container">
      <Sidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userType={userType}
      />

      <div className="planting-main">
        <div className="planting-header">
          <h1 className="planting-title">Hello, Admin!</h1>
          <div className="planting-header-actions">
            <div className="planting-search-box">
              <input
                type="text"
                placeholder="Search..."
                className="planting-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="planting-search-icon">🔍</span>
            </div>
            <div className="planting-bell">🔔</div>
          </div>
        </div>

        <div className="planting-body">
          <h2 className="planting-section-title">Your plants</h2>
          
          <div className="planting-cards-container">
            {plants.map((plant) => (
              <div key={plant.id} className="planting-card">
                <div className="planting-card-image">
                  <img src={plant.image} alt={plant.name} />
                </div>
                
                <div className="planting-card-content">
                  <h3 className="planting-card-name">{plant.name}</h3>
                  
                  <div className="planting-card-details">
                    <div className="planting-detail-row">
                      <span className="planting-detail-label">Area planted:</span>
                      <span className="planting-detail-value">{plant.areaPlanted}</span>
                    </div>
                    
                    <div className="planting-detail-row">
                      <span className="planting-detail-label">Status:</span>
                      <span className="planting-detail-value">{plant.status}</span>
                    </div>
                    
                    <div className="planting-detail-row">
                      <span className="planting-detail-label">Current Selling Price:</span>
                      <span className="planting-detail-value">{plant.currentSellingPrice}</span>
                    </div>
                    
                    <div className="planting-detail-row">
                      <span className="planting-detail-label">Unit:</span>
                      <span className="planting-detail-value">{plant.unit}</span>
                    </div>
                  </div>
                  
                  <button 
                    className="planting-edit-btn"
                    style={{ backgroundColor: plant.editColor }}
                    onClick={() => handleEdit(plant)}
                  >
                    EDIT
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {showEditModal && selectedPlant && (
          <div className="planting-modal-overlay" onClick={handleCloseModal}>
            <div className="planting-modal" onClick={(e) => e.stopPropagation()}>
              <div className="planting-modal-header">
                <h2 className="planting-modal-title">{selectedPlant.name}</h2>
                <button className="planting-modal-close" onClick={handleCloseModal}>
                  ✕
                </button>
              </div>
              
              <div className="planting-modal-body">
                <div className="planting-form-group">
                  <label className="planting-form-label">Plot #</label>
                  <select 
                    className="planting-form-select"
                    value={editFormData.plotNumber}
                    onChange={(e) => handleInputChange('plotNumber', e.target.value)}
                  >
                    <option value="">Select Plot</option>
                    {plotOptions.map(plot => (
                      <option key={plot} value={plot}>{plot}</option>
                    ))}
                  </select>
                </div>

                <div className="planting-form-group">
                  <label className="planting-form-label">Status</label>
                  <select 
                    className="planting-form-select"
                    value={editFormData.status}
                    onChange={(e) => handleInputChange('status', e.target.value)}
                  >
                    <option value="">Select Status</option>
                    {statusOptions.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                <div className="planting-form-group">
                  <label className="planting-form-label">Current Selling Price</label>
                  <input 
                    type="number"
                    className="planting-form-input"
                    value={editFormData.currentSellingPrice}
                    onChange={(e) => handleInputChange('currentSellingPrice', e.target.value)}
                    placeholder="Enter price"
                  />
                </div>

                <div className="planting-form-group">
                  <label className="planting-form-label">Unit</label>
                  <select 
                    className="planting-form-select"
                    value={editFormData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                  >
                    <option value="">Select Unit</option>
                    {unitOptions.map(unit => (
                      <option key={unit} value={unit}>{unit}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="planting-modal-footer">
                <button 
                  className="planting-modal-btn planting-modal-cancel"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button 
                  className="planting-modal-btn planting-modal-save"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Planting