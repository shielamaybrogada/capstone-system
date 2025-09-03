import React, { useState } from 'react'
import Sidebar from './sidebar'
import './settings.css'

const Settings = ({ userType = 'admin' }) => {
  const [activeMenu, setActiveMenu] = useState('Settings')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)

  // User data matching the image
  const users = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
      name: 'Enter Title...',
      dateAdded: 'September 9, 2013',
      title: 'Farmer',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=40&h=40&fit=crop&crop=face',
      name: 'Arlene McCoy',
      dateAdded: 'August 2, 2013',
      title: 'Farmer',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      name: 'Cody Fisher',
      dateAdded: 'September 24, 2017',
      title: 'Farmer',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 4,
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      name: 'Esther Howard',
      dateAdded: 'December 29, 2012',
      title: 'Farmer',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 5,
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face',
      name: 'Ronald Richards',
      dateAdded: 'May 20, 2015',
      title: 'Farmer',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 6,
      image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face',
      name: 'Albert Flores',
      dateAdded: 'May 31, 2015',
      title: 'Farmer',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 7,
      image: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=40&h=40&fit=crop&crop=face',
      name: 'Marvin McKinney',
      dateAdded: 'February 28, 2012',
      title: 'Finance',
      login: '00:00',
      logout: '00:00'
    },
    {
      id: 8,
      image: 'https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?w=40&h=40&fit=crop&crop=face',
      name: 'Floyd Miles',
      dateAdded: 'October 24, 2018',
      title: 'Admin',
      login: '00:00',
      logout: '00:00'
    }
  ]

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedUsers(users.map(user => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => 
      prev.includes(userId) 
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    )
  }

  const handleAddNew = () => {
    setShowAddModal(true)
  }

  const handleAction = (userId) => {
    console.log('Action for user:', userId)
    // Add your action logic here
  }

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userType={userType}
      />

      {/* Main Content */}
      <div className="settings-main">
        {/* Header */}
        <div className="settings-header">
          <h1 className="settings-title">Hello, Admin!</h1>
          <div className="settings-header-actions">
            <div className="settings-search-box">
              <input
                type="text"
                placeholder="Search..."
                className="settings-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="settings-search-icon">🔍</span>
            </div>
            <div className="settings-bell">🔔</div>
          </div>
        </div>

        {/* Content */}
        <div className="settings-body">
          {/* Controls */}
          <div className="settings-controls">
            <div className="settings-filter">
              <span className="filter-text">All (56)</span>
              <span className="filter-arrow">▼</span>
            </div>
            
            <button className="settings-add-btn" onClick={handleAddNew}>
              <span className="add-icon">+</span>
              ADD NEW
            </button>

            <div className="settings-menu-icon">
              ⚙️
            </div>
          </div>

          {/* Table */}
          <div className="settings-table">
            {/* Table Header */}
            <div className="settings-table-header">
              <div className="header-cell checkbox-cell">
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedUsers.length === users.length}
                />
              </div>
              <div className="header-cell image-cell">Image</div>
              <div className="header-cell name-cell">
                Title
                <span className="sort-icon">⇅</span>
              </div>
              <div className="header-cell date-cell">Date Added</div>
              <div className="header-cell title-cell">
                Title
                <span className="sort-icon">⇅</span>
              </div>
              <div className="header-cell login-cell">Login</div>
              <div className="header-cell logout-cell">Logout</div>
              <div className="header-cell action-cell">Action</div>
            </div>

            {/* Table Body */}
            <div className="settings-table-body">
              {filteredUsers.map((user) => (
                <div key={user.id} className="settings-table-row">
                  <div className="table-cell checkbox-cell">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </div>
                  <div className="table-cell image-cell">
                    <img src={user.image} alt={user.name} className="user-avatar" />
                  </div>
                  <div className="table-cell name-cell">
                    {user.name}
                  </div>
                  <div className="table-cell date-cell">
                    {user.dateAdded}
                  </div>
                  <div className="table-cell title-cell">
                    <span className={`role-badge ${user.title.toLowerCase()}`}>
                      {user.title}
                    </span>
                  </div>
                  <div className="table-cell login-cell">
                    {user.login}
                  </div>
                  <div className="table-cell logout-cell">
                    {user.logout}
                  </div>
                  <div className="table-cell action-cell">
                    <button 
                      className="action-btn"
                      onClick={() => handleAction(user.id)}
                    >
                      ⋯
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings