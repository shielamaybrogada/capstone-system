import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './login.css'

const Login = ({ userType = 'admin' }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', { ...formData, userType })
    // Add your login logic here
    // After successful login, navigate to dashboard
    navigate(`/dashboard/${userType}`)
  }

  const handleBackToUserSelection = () => {
    navigate('/user-selection')
  }

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  // Get user type specific configurations
  const getUserConfig = () => {
    const configs = {
      admin: {
        title: 'ADMIN LOGIN',
        subtitle: 'System Administrator Access',
        primaryColor: '#4CAF50',
        secondaryColor: '#388E3C'
      },
      farmer: {
        title: 'FARMER LOGIN',
        subtitle: 'Farm Management Portal',
        primaryColor: '#8BC34A',
        secondaryColor: '#689F38'
      },
      finance: {
        title: 'FINANCE LOGIN',
        subtitle: 'Financial Operations Dashboard',
        primaryColor: '#66BB6A',
        secondaryColor: '#4CAF50'
      }
    }
    return configs[userType] || configs.admin
  }

  const config = getUserConfig()

  return (
    <div className="login-page">
      {/* Background lettuce image */}
      <div className="background-image"></div>
      
      {/* Green overlay */}
      <div className="green-overlay"></div>
      
      {/* Main content */}
      <div className="login-content">
        {/* Back button */}
        <button className="back-button" onClick={handleBackToUserSelection}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M15 10H5M5 10L10 15M5 10L10 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to User Selection
        </button>

        {/* Logo */}
        <div className="logo-container">
          <div className="logo-circle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L13.5 8.5L20 7L14.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L9.5 12L4 7L10.5 8.5L12 2Z" fill="currentColor"/>
            </svg>
          </div>
        </div>
        
        {/* Title */}
        <h1 className="site-title">AGRITRACK</h1>
        
        {/* Login Form */}
        <div className="login-form-container">
          <h2 className="form-title" style={{ color: config.primaryColor }}>
            {config.title}
          </h2>
          <p className="form-subtitle">{config.subtitle}</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="input-group">
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleInputChange}
                className="form-input"
                required
              />
            </div>
            
            <div className="input-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleInputChange}
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePassword}
              >
                👁
              </button>
            </div>
            
            <button 
              type="submit" 
              className="login-button"
              style={{
                background: `linear-gradient(135deg, ${config.primaryColor}, ${config.secondaryColor})`
              }}
            >
              Login as {userType.charAt(0).toUpperCase() + userType.slice(1)}
            </button>
            
            <button type="button" className="switch-user-button" onClick={handleBackToUserSelection}>
              Switch User Type
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login