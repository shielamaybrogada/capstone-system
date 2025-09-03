import React, { useState } from 'react'
import FinanceSidebar from './financesidebar'
import './financeinventory.css'

const FinanceInventory = ({ userType = 'finance' }) => {
  const [activeMenu, setActiveMenu] = useState('Inventory')
  const [activeTab, setActiveTab] = useState('Seed')
  const [searchTerm, setSearchTerm] = useState('')

  // Sample inventory data for finance view
  const inventoryData = {
    totalItems: 4,
    lowStockItems: 0,
    lastUpdate: 'April 21, 2025'
  }

  const inventoryItems = [
    { id: 1, item: 'Cabbage', stock: '100 Seedlings', price: '₱0.30 / Seedlings', status: 'Sufficient', value: '₱30.00' },
    { id: 2, item: 'Cauliflower', stock: '82 Seedlings', price: '₱0.50 / Seedlings', status: 'Sufficient', value: '₱41.00' },
    { id: 3, item: 'Lettuce', stock: '77 Packs', price: '₱0.50 / Packs', status: 'Sufficient', value: '₱38.50' },
    { id: 4, item: 'Tomato', stock: '80 Seedlings', price: '₱0.50 / Seedlings', status: 'Sufficient', value: '₱40.00' }
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

  // Calculate total inventory value
  const totalInventoryValue = inventoryItems.reduce((total, item) => {
    return total + parseFloat(item.value.replace('₱', ''))
  }, 0)

  return (
    <div className="fi-dashboard-container">
      {/* Finance Sidebar Component */}
      <FinanceSidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userType={userType}
      />

      {/* Main Content */}
      <div className="fi-main">
        {/* Header */}
        <div className="fi-header">
          <div className="fi-header-left">
            <h1>Inventory Management</h1>
          </div>

          <div className="fi-header-right">
            {/* Search Bar */}
            <div className="fi-search-container">
              <div className="fi-search-icon">🔍</div>
              <input
                type="text"
                placeholder="Search..."
                className="fi-search-input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Notification */}
            <div className="fi-notification-btn">
              <span className="fi-notification-icon">🔔</span>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="fi-content">
          {/* Tabs */}
          <div className="fi-tabs-container">
            <button 
              className={`fi-tab-button ${activeTab === 'Seed' ? 'active' : ''}`}
              onClick={() => setActiveTab('Seed')}
            >
              Seed
            </button>
            <button 
              className={`fi-tab-button ${activeTab === 'Fertilizers' ? 'active' : ''}`}
              onClick={() => setActiveTab('Fertilizers')}
            >
              Fertilizers
            </button>
          </div>

          {/* Stats Cards */}
          <div className="fi-stats">
            <div className="fi-stat-card">
              <div className="fi-stat-icon green">🌱</div>
              <div className="fi-stat-content">
                <h3 className="fi-stat-title">Total Seeds Items</h3>
                <p className="fi-stat-number">{inventoryData.totalItems} Items</p>
              </div>
            </div>

            <div className="fi-stat-card">
              <div className="fi-stat-icon yellow">⚠️</div>
              <div className="fi-stat-content">
                <h3 className="fi-stat-title">Low Stock Items</h3>
                <p className="fi-stat-number">{inventoryData.lowStockItems} Items</p>
              </div>
            </div>

            <div className="fi-stat-card">
              <div className="fi-stat-icon blue">📅</div>
              <div className="fi-stat-content">
                <h3 className="fi-stat-title">Last Inventory Update</h3>
                <p className="fi-stat-number">{inventoryData.lastUpdate}</p>
              </div>
            </div>

            <div className="fi-stat-card">
              <div className="fi-stat-icon purple">💰</div>
              <div className="fi-stat-content">
                <h3 className="fi-stat-title">Total Inventory Value</h3>
                <p className="fi-stat-number">₱{totalInventoryValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          {/* Inventory Table */}
          <div className="fi-table-container">
            <div className="fi-table-header">
              <div className="fi-table-cell">ITEM</div>
              <div className="fi-table-cell">STOCK</div>
              <div className="fi-table-cell">PRICE / UNIT</div>
              <div className="fi-table-cell">TOTAL VALUE</div>
              <div className="fi-table-cell">STATUS</div>
              <div className="fi-table-cell">ACTION</div>
            </div>

            <div className="fi-table-body">
              {filteredItems.map((item) => (
                <div key={item.id} className="fi-table-row">
                  <div className="fi-table-cell fi-item-name">{item.item}</div>
                  <div className="fi-table-cell fi-stock-info">{item.stock}</div>
                  <div className="fi-table-cell fi-price-info">{item.price}</div>
                  <div className="fi-table-cell fi-value-info">{item.value}</div>
                  <div className="fi-table-cell">
                    <span className="fi-status-badge sufficient">
                      ✓ {item.status}
                    </span>
                  </div>
                  <div className="fi-table-cell">
                    <button 
                      className="fi-edit-button"
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
          <button className="fi-add-button" onClick={handleAddItem}>
            <span className="fi-add-icon">+</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default FinanceInventory