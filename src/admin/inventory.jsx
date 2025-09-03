import React, { useState } from 'react'
import Sidebar from './sidebar'
import './inventory.css'

const Inventory = ({ userType = 'admin' }) => {
  const [activeMenu, setActiveMenu] = useState('Inventory')
  const [activeTab, setActiveTab] = useState('Seed')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample inventory data
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
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userType={userType}
      />

      {/* Main Content */}
      <div className="inventory-main">
        {/* Header */}
        <div className="inventory-header">
          <div className="header-left">
            <h1>Inventory</h1>
          </div>

          <div className="header-right">
            {/* Search Bar */}
            <div className="inventory-search-container">
              <div className="inventory-search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search..."
                className="search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notification */}
            <div className="notification-btn">
              <span className="notification-icon">🔔</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="inventory-content">
          {/* Tabs */}
          <div className="tabs-container">
            <button 
              className={`tab-button ${activeTab === 'Seed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Seed')}
            >
              Seed
            </button>
            <button 
              className={`tab-button ${activeTab === 'Fertilizers' ? 'active' : ''}`}
              onClick={() => setActiveTab('Fertilizers')}
            >
              Fertilizers
            </button>
          </div>

          {/* Stats Cards */}
          <div className="inventory-stats">
            <div className="stat-card">
              <div className="stat-icon green">🌱</div>
              <div className="stat-content">
                <h3 className="stat-title">Total Seeds Items</h3>
                <p className="stat-number">{inventoryData.totalItems} Items</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon yellow">⚠️</div>
              <div className="stat-content">
                <h3 className="stat-title">Low Stock Items</h3>
                <p className="stat-number">{inventoryData.lowStockItems} Items</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon blue">📅</div>
              <div className="stat-content">
                <h3 className="stat-title">Last Inventory Update</h3>
                <p className="stat-number">{inventoryData.lastUpdate}</p>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="inventory-table-container">
            <div className="table-header">
              <div className="table-cell">ITEM</div>
              <div className="table-cell">STOCK</div>
              <div className="table-cell">PRICE / UNIT</div>
              <div className="table-cell">STATUS</div>
              <div className="table-cell">ACTION</div>
            </div>

            <div className="table-body">
              {filteredItems.map((item) => (
                <div key={item.id} className="table-row">
                  <div className="table-cell item-name">{item.item}</div>
                  <div className="table-cell stock-info">{item.stock}</div>
                  <div className="table-cell price-info">{item.price}</div>
                  <div className="table-cell">
                    <span className="status-badge sufficient">
                      ✓ {item.status}
                    </span>
                  </div>
                  <div className="table-cell">
                    <button 
                      className="edit-button"
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
          <button className="add-button" onClick={handleAddItem}>
            <span className="add-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Inventory
