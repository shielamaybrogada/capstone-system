import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './financesidebar.css'

const FinanceSidebar = ({ activeMenu, setActiveMenu }) => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    navigate('/user-selection')
  }

  const handleMenuClick = (menuName) => {
    setActiveMenu && setActiveMenu(menuName)
    
    // Navigate to finance routes - make sure these match your App.jsx routes exactly
    const routes = {
      'Overview': '/finance/overview',
      'Inventory': '/finance/inventory',
      'Costing & Pricing': '/finance/costing-pricing', 
    }
    
    const route = routes[menuName]
    if (route) {
      navigate(route)
    }
  }

  // Determine active menu from current URL
  const getCurrentActiveMenu = () => {
    const path = location.pathname
    if (path.includes('/finance/overview')) return 'Overview'
    if (path.includes('/finance/inventory')) return 'Inventory'
    if (path.includes('/finance/costing-pricing')) return 'Costing & Pricing'
    return activeMenu || 'Overview'
  }

  const currentActiveMenu = getCurrentActiveMenu()

  const menuItems = [
    { name: 'Overview', icon: '📊' },
    { name: 'Inventory', icon: '📦' },
    { name: 'Costing & Pricing', icon: '💰' },
  ]

  return (
    <div className="finance-sidebar">
      <div className="finance-sidebar-header">
        <div className="finance-logo-section">
          <div className="finance-logo-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="finance-logo-text">
            <h2>AGRITRACK</h2>
            <p>Finance</p>
          </div>
        </div>
      </div>

      <nav className="finance-sidebar-nav">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`finance-nav-item ${currentActiveMenu === item.name ? 'active' : ''}`}
            onClick={() => handleMenuClick(item.name)}
          >
            <span className="finance-nav-icon">{item.icon}</span>
            <span className="finance-nav-text">{item.name}</span>
          </button>
        ))}
      </nav>

      <div className="finance-sidebar-footer">
        <button className="finance-logout-btn" onClick={handleLogout}>
          <span className="finance-nav-icon">🚪</span>
          <span className="finance-nav-text">Log out</span>
        </button>
      </div>
    </div>
  )
}

export default FinanceSidebar