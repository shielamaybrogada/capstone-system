import React, { useState, useEffect } from 'react'
import Sidebar from './sidebar'
import './admindashboard.css'

const AdminDashboard = ({ userType = 'admin', user = null }) => {
  const [activeMenu, setActiveMenu] = useState('Overview')
  const [currentDateTime, setCurrentDateTime] = useState(new Date())
  const [financialData, setFinancialData] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    simpleROI: 0
  })
  const [npkData, setNpkData] = useState([])
  const [loading, setLoading] = useState(true)

  // Update date and time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date())
    }, 60000) // Update every minute

    return () => clearInterval(timer)
  }, [])

  // Fetch financial data
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Replace with your actual API endpoint
        // const response = await fetch('/api/financial-data')
        // const data = await response.json()
        
        // Simulate API call for now
        setTimeout(() => {
          setFinancialData({
            totalRevenue: 150000.50,
            totalExpenses: 98750.25,
            netProfit: 51250.25,
            simpleROI: 51.9
          })
        }, 1000)
      } catch (error) {
        console.error('Error fetching financial data:', error)
      }
    }

    fetchFinancialData()
  }, [])

  // Fetch NPK sensor data
  useEffect(() => {
    const fetchNPKData = async () => {
      try {
        // Replace with your actual NPK device API endpoint
        // const response = await fetch('/api/npk-data')
        // const data = await response.json()
        
        // Simulate NPK sensor data for now
        setTimeout(() => {
          setNpkData([
            { 
              plant: 'Lettuce', 
              nitrogen: 320, 
              phosphorus: 180, 
              potassium: 280, 
              ph: 6.5,
              sensorId: 'NPK001',
              lastUpdate: new Date().toISOString()
            },
            { 
              plant: 'Kale', 
              nitrogen: 300, 
              phosphorus: 170, 
              potassium: 260, 
              ph: 6.2,
              sensorId: 'NPK002',
              lastUpdate: new Date().toISOString()
            },
            { 
              plant: 'Spinach', 
              nitrogen: 280, 
              phosphorus: 160, 
              potassium: 240, 
              ph: 6.8,
              sensorId: 'NPK003',
              lastUpdate: new Date().toISOString()
            },
            { 
              plant: 'Cabbage', 
              nitrogen: 350, 
              phosphorus: 200, 
              potassium: 300, 
              ph: 6.4,
              sensorId: 'NPK004',
              lastUpdate: new Date().toISOString()
            }
          ])
          setLoading(false)
        }, 1500)
      } catch (error) {
        console.error('Error fetching NPK data:', error)
        setLoading(false)
      }
    }

    fetchNPKData()
    
    // Set up real-time updates for NPK data (every 30 seconds)
    const npkInterval = setInterval(fetchNPKData, 30000)
    
    return () => clearInterval(npkInterval)
  }, [])

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP',
      minimumFractionDigits: 2
    }).format(amount)
  }

  // Format date and time
  const formatDateTime = (date) => {
    const options = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options)
  }

  // Get user greeting name
  const getUserName = () => {
    if (user && user.name) {
      return user.name
    }
    if (user && user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`
    }
    if (user && user.username) {
      return user.username
    }
    return 'User' // Fallback
  }

  const statsCards = [
    {
      title: 'Total Revenue',
      amount: formatCurrency(financialData.totalRevenue),
      color: '#4CAF50',
      bgColor: '#E8F5E9',
      icon: '💰'
    },
    {
      title: 'Total Expenses',
      amount: formatCurrency(financialData.totalExpenses),
      color: '#F44336',
      bgColor: '#FFEBEE',
      icon: '💸'
    },
    {
      title: 'Net Profit',
      amount: formatCurrency(financialData.netProfit),
      color: '#4CAF50',
      bgColor: '#E8F5E9',
      icon: '📈'
    },
    {
      title: 'Simple ROI',
      amount: `${financialData.simpleROI.toFixed(1)}%`,
      color: '#2196F3',
      bgColor: '#E3F2FD',
      icon: '📊'
    }
  ]

  const tasks = [
    'Water the lettuce plants in Section A',
    'Check NPK levels in greenhouse 2',
    'Harvest ready crops in Section B',
    'Monitor temperature and humidity',
    'Fertilize new seedlings'
  ]

  // Get NPK status color based on optimal ranges
  const getNPKStatus = (plant, nutrient, value) => {
    const optimalRanges = {
      nitrogen: { min: 250, max: 400 },
      phosphorus: { min: 150, max: 250 },
      potassium: { min: 200, max: 350 },
      ph: { min: 6.0, max: 7.0 }
    }

    const range = optimalRanges[nutrient]
    if (value >= range.min && value <= range.max) {
      return '#4CAF50' // Green - optimal
    } else if (value < range.min * 0.8 || value > range.max * 1.2) {
      return '#F44336' // Red - critical
    } else {
      return '#FF9800' // Orange - warning
    }
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
      <div className="main-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-left">
            <h1>Hello, {getUserName()}!</h1>
            <p className="date-text">{formatDateTime(currentDateTime)}</p>
            <p className="time-text">{currentDateTime.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit'
            })}</p>
          </div>
          <div className="header-right">
            <div className="search-container-ad">
              <input
                type="text"
                placeholder="Search..."
                className="search-input-ad"
              />
              <div className="search-icon-ad">🔍</div>
            </div>
            <div className="notification-icon">🔔</div>
          </div>
        </div>

        {/*Content */}
        <div classname="admindashboard-body">
          <div classname="admindashboard-top"></div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          {statsCards.map((card, index) => (
            <div key={index} className="stat-card">
              <div 
                className="stat-icon" 
                style={{ 
                  backgroundColor: card.bgColor,
                  color: card.color 
                }}
              >
                {card.icon}
              </div>
              <div className="stat-content">
                <h3 className="stat-title">{card.title}</h3>
                <p className="stat-amount">{card.amount}</p>
                {loading && index < 3 && (
                  <div className="loading-indicator">Loading...</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="content-grid">
          {/* Upcoming Events/Tasks */}
          <div className="content-card tasks-card">
            <h3 className="card-title">Upcoming Events/Tasks</h3>
            <div className="tasks-list">
              {tasks.map((task, index) => (
                <div key={index} className="task-item">
                  <div className="task-checkbox"></div>
                  <span className="task-text">{task}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NPK Chart */}
          <div className="content-card chart-card">
            <div className="chart-header">
              <h3 className="card-title">
                NPK & pH Level For Each Plant
                {loading && <span className="loading-indicator"> (Loading...)</span>}
              </h3>
              <div className="chart-legend">
                <div className="legend-item">
                  <span className="legend-color nitrogen"></span>
                  <span>Nitrogen (ppm)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color phosphorus"></span>
                  <span>Phosphorus (ppm)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color potassium"></span>
                  <span>Potassium (ppm)</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color ph"></span>
                  <span>pH Level</span>
                </div>
              </div>
              <div className="last-update">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="chart-container">
              {loading ? (
                <div className="chart-loading">Loading NPK data from sensors...</div>
              ) : (
                <div className="chart-bars">
                  {npkData.map((data, index) => (
                    <div key={index} className="bar-group">
                      <div className="bars">
                        <div 
                          className="bar nitrogen-bar" 
                          style={{ 
                            height: `${(data.nitrogen / 400) * 100}%`,
                            backgroundColor: getNPKStatus(data.plant, 'nitrogen', data.nitrogen)
                          }}
                          title={`Nitrogen: ${data.nitrogen} ppm`}
                        ></div>
                        <div 
                          className="bar phosphorus-bar" 
                          style={{ 
                            height: `${(data.phosphorus / 400) * 100}%`,
                            backgroundColor: getNPKStatus(data.plant, 'phosphorus', data.phosphorus)
                          }}
                          title={`Phosphorus: ${data.phosphorus} ppm`}
                        ></div>
                        <div 
                          className="bar potassium-bar" 
                          style={{ 
                            height: `${(data.potassium / 400) * 100}%`,
                            backgroundColor: getNPKStatus(data.plant, 'potassium', data.potassium)
                          }}
                          title={`Potassium: ${data.potassium} ppm`}
                        ></div>
                        <div 
                          className="bar ph-bar" 
                          style={{ 
                            height: `${(data.ph / 10) * 100}%`,
                            backgroundColor: getNPKStatus(data.plant, 'ph', data.ph)
                          }}
                          title={`pH: ${data.ph}`}
                        ></div>
                      </div>
                      <span className="bar-label">
                        {data.plant}
                        <br />
                        <small>Sensor: {data.sensorId}</small>
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard