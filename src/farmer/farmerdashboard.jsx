import React, { useState, useEffect } from 'react'
import FarmerSidebar from './farmersidebar'
import './farmerdashboard.css'

const FarmerDashboard = ({ userType = 'farmer' }) => {
  const [activeMenu, setActiveMenu] = useState('Overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(21)

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 60000)
    return () => clearInterval(timer)
  }, [])

  // NPK & pH data for chart
  const chartData = [
    { plant: 'Lettuce', nitrogen: 320, phosphorus: 180, potassium: 280, ph: 150 },
    { plant: 'Kale', nitrogen: 300, phosphorus: 170, potassium: 260, ph: 140 },
    { plant: 'Spinach', nitrogen: 280, phosphorus: 160, potassium: 240, ph: 130 },
    { plant: 'Cabbage', nitrogen: 350, phosphorus: 200, potassium: 300, ph: 160 }
  ]

  // Sensor data
  const sensorData = [
    { type: 'Temp', value: '28.1°C', icon: '🌡️', color: '#FF9500' },
    { type: 'Humidity', value: '20%', icon: '💧', color: '#007AFF' },
    { type: 'pH', value: '6.5', icon: '⚗️', color: '#AF52DE' },
    { type: 'EC', value: '1.2 mS/cm', icon: '⚡', color: '#34C759' }
  ]

  // Schedule data
  const scheduleToday = [
    {
      id: 1,
      time: '08:00',
      title: 'Rapat dengan Bruce Wayne',
      participants: ['👤', '👤'],
      color: '#8BC34A'
    },
    {
      id: 2,
      time: '10:00',
      title: 'Test wawasan kebangsaan di Dusun Wakanda',
      participants: ['👤', '👤'],
      color: '#8BC34A'
    }
  ]

  // Reminder tasks
  const reminderTasks = [
    {
      id: 1,
      title: 'Urus SIM di samsat Klayatan',
      time: '12:00 - 16:00',
      icon: '🗃️',
      color: '#2E5233'
    },
    {
      id: 2,
      title: 'Urus SIM di samsat Klayatan',
      time: '12:00 - 16:00',
      icon: '🗃️',
      color: '#2E5233'
    }
  ]

  // Calendar dates
  const calendarDates = [
    { date: 18, day: 'Mo' },
    { date: 19, day: 'Tu' },
    { date: 20, day: 'Wed' },
    { date: 21, day: 'Th', isToday: true },
    { date: 22, day: 'Fr' },
    { date: 23, day: 'Sa' },
    { date: 24, day: 'Su' }
  ]

  return (
    <div className="farmer-dashboard">
      {/* Farmer Sidebar */}
      <FarmerSidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
      />

      {/* Main Content */}
      <div className="farmer-main">
        {/* Header */}
        <div className="farmer-header">
          <h1 className="farmer-title">Hello, Farmer!</h1>
          <div className="farmer-header-actions">
            <div className="farmer-search-box">
              <input
                type="text"
                placeholder="Search..."
                className="farmer-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="farmer-search-icon">🔍</span>
            </div>
            <div className="farmer-bell">🔔</div>
          </div>
        </div>

        {/* Content */}
        <div className="farmer-content">
          {/* Left Section */}
          <div className="farmer-left-section">
            {/* NPK Chart */}
            <div className="farmer-chart-card">
              <div className="chart-header">
                <h3>NPK & ph Level For Each Plant</h3>
                <div className="chart-legend">
                  <div className="legend-item">
                    <span className="legend-dot nitrogen"></span>
                    <span>Nitrogen</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot phosphorus"></span>
                    <span>Phosphorus</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot potassium"></span>
                    <span>Potassium</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot ph"></span>
                    <span>pH</span>
                  </div>
                </div>
              </div>
              
              <div className="chart-container">
                <div className="chart-y-axis">
                  <span>400</span>
                  <span>300</span>
                  <span>200</span>
                  <span>100</span>
                  <span>0</span>
                </div>
                <div className="chart-bars">
                  {chartData.map((data, index) => (
                    <div key={index} className="bar-group">
                      <div className="bars">
                        <div 
                          className="bar nitrogen-bar" 
                          style={{ height: `${(data.nitrogen / 400) * 100}%` }}
                        ></div>
                        <div 
                          className="bar phosphorus-bar" 
                          style={{ height: `${(data.phosphorus / 400) * 100}%` }}
                        ></div>
                        <div 
                          className="bar potassium-bar" 
                          style={{ height: `${(data.potassium / 400) * 100}%` }}
                        ></div>
                        <div 
                          className="bar ph-bar" 
                          style={{ height: `${(data.ph / 400) * 100}%` }}
                        ></div>
                      </div>
                      <span className="bar-label">{data.plant}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sensor Data */}
            <div className="farmer-sensor-card">
              <h3>Sensor Data Monitoring</h3>
              <div className="sensor-grid">
                {sensorData.map((sensor, index) => (
                  <div key={index} className="sensor-item" style={{ backgroundColor: sensor.color + '20' }}>
                    <div className="sensor-icon" style={{ color: sensor.color }}>
                      {sensor.icon}
                    </div>
                    <div className="sensor-info">
                      <span className="sensor-type">{sensor.type}</span>
                      <span className="sensor-value">{sensor.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="farmer-right-section">
            {/* Calendar */}
            <div className="farmer-calendar-card">
              <div className="calendar-header">
                <h3>JUNE 2025</h3>
              </div>
              <div className="calendar-dates">
                {calendarDates.map((date, index) => (
                  <div 
                    key={index} 
                    className={`calendar-date ${date.isToday ? 'today' : ''} ${selectedDate === date.date ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(date.date)}
                  >
                    <span className="date-number">{date.date}</span>
                    <span className="date-day">{date.day}</span>
                  </div>
                ))}
              </div>

              {/* Schedule Today */}
              <div className="schedule-section">
                <h4>Schedule Today</h4>
                <div className="schedule-timeline">
                  <div className="timeline-hours">
                    <span>08:00</span>
                    <span>10:00</span>
                    <span>12:00</span>
                    <span>14:00</span>
                    <span>16:00</span>
                  </div>
                  <div className="schedule-items">
                    {scheduleToday.map((item) => (
                      <div 
                        key={item.id} 
                        className="schedule-item"
                        style={{ backgroundColor: item.color }}
                      >
                        <span className="schedule-title">{item.title}</span>
                        <div className="schedule-participants">
                          {item.participants.map((participant, i) => (
                            <span key={i} className="participant">{participant}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reminder */}
              <div className="reminder-section">
                <h4>Reminder</h4>
                <p className="reminder-subtitle">Dont forget schedule for tomorrow</p>
                <div className="reminder-items">
                  {reminderTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="reminder-item"
                      style={{ backgroundColor: task.color }}
                    >
                      <div className="reminder-icon">{task.icon}</div>
                      <div className="reminder-info">
                        <span className="reminder-title">{task.title}</span>
                        <span className="reminder-time">⏰ {task.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FarmerDashboard