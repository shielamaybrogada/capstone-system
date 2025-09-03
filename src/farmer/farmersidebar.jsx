import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './farmersidebar.css'

const FarmerSidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    navigate('/user-selection')
  }

  const handleMenuClick = (menuName) => {
    setActiveMenu && setActiveMenu(menuName)

    // Farmer routes (direct sa tamang components)
    const routes = {
      'Overview': '/farmer/overview',
      'Plants': '/farmer/plants',
      'Calendar': '/farmer/calendar',
      'Inventory': '/farmer/inventory'
    }

    const route = routes[menuName]
    if (route) navigate(route)
  }

  // Active menu detection based on current URL
  const getCurrentActiveMenu = () => {
    const path = location.pathname
    if (path.startsWith('/farmer/overview') || path.startsWith('/dashboard/farmer')) return 'Overview'
    if (path.startsWith('/farmer/plants')) return 'Plants'
    if (path.startsWith('/farmer/calendar')) return 'Calendar'
    if (path.startsWith('/farmer/inventory')) return 'Inventory'
    return activeMenu || 'Overview'
  }

  const currentActiveMenu = getCurrentActiveMenu()

  const menuItems = [
    { name: 'Overview', icon: '📊' },
    { name: 'Plants', icon: '🌱' },
    { name: 'Calendar', icon: '📅' },
    { name: 'Inventory', icon: '📦' }
  ]

  return (
    <div className="farmer-sidebar">
      {/* Sidebar Header */}
      <div className="farmer-sidebar-header">
        <div className="farmer-logo-section">
          <div className="farmer-logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="farmer-logo-text">
            <h2>AGRITRACK</h2>
            <p>Farmer</p>
          </div>
        </div>
      </div>

      {/* Nav Menu */}
      <nav className="farmer-sidebar-nav">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`farmer-nav-item ${currentActiveMenu === item.name ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.name)}
          >
            <span className="farmer-nav-icon">{item.icon}</span>
            <span className="farmer-nav-text">{item.name}</span>
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="farmer-sidebar-footer">
        <button className="farmer-logout-btn" onClick={handleLogout}>
          <span className="farmer-nav-icon">🚪</span>
          <span className="farmer-nav-text">Log out</span>
        </button>
      </div>
    </div>
  )
}

export default FarmerSidebar
