import React, { useState } from 'react'
import FarmerSidebar from './farmersidebar'
import './farmerinventory.css'

const FarmerInventory = ({ userType = 'farmer' }) => {
  const [activeMenu, setActiveMenu] = useState('Inventory')
  const [activeTab, setActiveTab] = useState('Seed')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample inventory data for farmers
  const inventoryData = {
    totalItems: 4,
    lowStockItems: 0,
    lastUpdate: 'April 21, 2025'
  }

  const inventoryItems = [
    { id: 1, item: 'Cabbage', stock: '100 Seedlings', price: '₱0.30 / Seedlings', status: 'Sufficient' },
    { id: 2, item: 'Cauliflower', stock: '82 Seedlings', price: '₱0.50 / Seedlings', status: 'Sufficient' },
    { id: 3, item: 'Lettuce', stock: '77 Packs', price: '₱0.50 / Packs', status: 'Sufficient' },
    { id: 4, item: 'Tomato', stock: '80 Seedlings', price: '₱0.50 / Seedlings', status: 'Sufficient' }
  ]

  const filteredItems = inventoryItems.filter(item =>
    item.item.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddItem = () => {
    console.log('Add new item clicked')
  }

  const handleEditItem = (itemId) => {
    console.log('Edit item:', itemId)
  }

  return (
    <div className="fai-dashboard-container">
      {/* Farmer Sidebar Component */}
      <FarmerSidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userType={userType}
      />

      {/* Main Content */}
      <div className="fai-main">
        {/* Header */}
        <div className="fai-header">
          <div className="fai-header-left">
            <h1>Farm Inventory</h1>
          </div>

          <div className="fai-header-right">
            {/* Search Bar */}
            <div className="fai-search-container">
              <div className="fai-search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search..."
                className="fai-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notification */}
            <div className="fai-notification-btn">
              <span className="fai-notification-icon">🔔</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="fai-content">
          {/* Tabs */}
          <div className="fai-tabs-container">
            <button 
              className={`fai-tab-button ${activeTab === 'Seed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Seed')}
            >
              Seed
            </button>
            <button 
              className={`fai-tab-button ${activeTab === 'Fertilizers' ? 'active' : ''}`}
              onClick={() => setActiveTab('Fertilizers')}
            >
              Fertilizers
            </button>
            <button 
              className={`fai-tab-button ${activeTab === 'Tools' ? 'active' : ''}`}
              onClick={() => setActiveTab('Tools')}
            >
              Farm Tools
            </button>
          </div>

          {/* Stats Cards */}
          <div className="fai-stats">
            <div className="fai-stat-card">
              <div className="fai-stat-icon green">🌱</div>
              <div className="fai-stat-content">
                <h3 className="fai-stat-title">Total Seeds Items</h3>
                <p className="fai-stat-number">{inventoryData.totalItems} Items</p>
              </div>
            </div>

            <div className="fai-stat-card">
              <div className="fai-stat-icon yellow">⚠️</div>
              <div className="fai-stat-content">
                <h3 className="fai-stat-title">Low Stock Items</h3>
                <p className="fai-stat-number">{inventoryData.lowStockItems} Items</p>
              </div>
            </div>

            <div className="fai-stat-card">
              <div className="fai-stat-icon blue">📅</div>
              <div className="fai-stat-content">
                <h3 className="fai-stat-title">Last Inventory Update</h3>
                <p className="fai-stat-number">{inventoryData.lastUpdate}</p>
              </div>
            </div>

            <div className="fai-stat-card">
              <div className="fai-stat-icon orange">🚜</div>
              <div className="fai-stat-content">
                <h3 className="fai-stat-title">Ready to Plant</h3>
                <p className="fai-stat-number">3 Varieties</p>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="fai-table-container">
            <div className="fai-table-header">
              <div className="fai-table-cell">ITEM</div>
              <div className="fai-table-cell">STOCK</div>
              <div className="fai-table-cell">PRICE / UNIT</div>
              <div className="fai-table-cell">STATUS</div>
              <div className="fai-table-cell">ACTION</div>
            </div>

            <div className="fai-table-body">
              {filteredItems.map((item) => (
                <div key={item.id} className="fai-table-row">
                  <div className="fai-table-cell fai-item-name">{item.item}</div>
                  <div className="fai-table-cell fai-stock-info">{item.stock}</div>
                  <div className="fai-table-cell fai-price-info">{item.price}</div>
                  <div className="fai-table-cell">
                    <span className="fai-status-badge sufficient">
                      ✓ {item.status}
                    </span>
                  </div>
                  <div className="fai-table-cell">
                    <button 
                      className="fai-edit-button"
                      onClick={() => handleEditItem(item.id)}
                    >
                      ✏️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Button */}
          <button className="fai-add-button" onClick={handleAddItem}>
            <span className="fai-add-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FarmerInventory