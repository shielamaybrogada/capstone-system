import React, { useState } from 'react'
import Sidebar from './sidebar'
import './costing.css'

const Costing = ({ userType = 'admin' }) => {
  const [activeMenu, setActiveMenu] = useState('Costing & Pricing')
  const [searchTerm, setSearchTerm] = useState('')

  // Financial data matching the exact image
  const financialCards = [
    {
      title: 'Total Revenue',
      amount: '$667.00',
      change: '↑ 13.00%',
      since: 'Since last month',
      icon: '↗'
    },
    {
      title: 'Net Profit',
      amount: '$667.00', 
      change: '↑ 13.00%',
      since: 'Since last month',
      icon: '↗'
    },
    {
      title: 'Expenses',
      amount: '$667.00',
      change: '↑ 13.00%', 
      since: 'Since last month',
      icon: '↗'
    },
    {
      title: 'ROI',
      amount: '$667.00',
      change: '↑ 13.00%',
      since: 'Since last month', 
      icon: '↗'
    }
  ]

  // Expense transactions data exactly as shown
  const expenseTransactions = [
    {
      date: '2025.06.06',
      product: 'Fertilizer',
      amount: '$52.50',
      status: 'Completed'
    },
    {
      date: '2025.06.05',
      product: 'Fertilizer', 
      amount: '$60.80',
      status: 'Completed'
    },
    {
      date: '2025.06.04',
      product: 'Fertilizer',
      amount: '$150.00',
      status: 'Cancelled'
    },
    {
      date: '2025.06.03',
      product: 'Fertilizer',
      amount: '$95.20',
      status: 'Completed'
    }
  ]

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <Sidebar 
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        userType={userType}
      />

      {/* Main Content */}
      <div className="costing-main">
        {/* Header */}
        <div className="costing-header">
          <h1 className="costing-title">Financial Report</h1>
          <div className="costing-header-actions">
            <div className="costing-search-box">
              <input
                type="text"
                placeholder="Search..."
                className="costing-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="costing-search-icon">🔍</span>
            </div>
            <div className="costing-bell">🔔</div>
          </div>
        </div>

        {/* Content */}
        <div className="costing-body">
          {/* Top Section */}
          <div className="costing-top">
            {/* Financial Cards */}
            <div className="costing-cards">
              {financialCards.map((card, index) => (
                <div key={index} className="costing-card">
                  <div className="costing-card-header">
                    <span className="costing-card-icon">{card.icon}</span>
                    <span className="costing-card-title">{card.title}</span>
                  </div>
                  <div className="costing-card-amount">{card.amount}</div>
                  <div className="costing-card-footer">
                    <span className="costing-card-since">{card.since}</span>
                    <span className="costing-card-change">{card.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chart */}
            <div className="costing-chart">
              <div className="costing-chart-header">
                <h3>Financial Overview</h3>
                <div className="costing-chart-controls">
                  <div className="costing-legend">
                    <div className="costing-legend-item">
                      <span className="costing-legend-dot blue"></span>
                      <span>Income</span>
                    </div>
                    <div className="costing-legend-item">
                      <span className="costing-legend-dot red"></span>
                      <span>Expenses</span>
                    </div>
                  </div>
                  <select className="costing-view-select">
                    <option>Monthly View</option>
                    <option>Weekly View</option>
                    <option>Yearly View</option>
                  </select>
                </div>
              </div>
              
              <div className="costing-chart-area">
                <div className="costing-chart-y-axis">
                  <span>4k</span>
                  <span>3k</span>
                  <span>2k</span>
                  <span>1k</span>
                  <span>0</span>
                </div>
                
                <div className="costing-chart-canvas">
                  <svg viewBox="0 0 500 250" className="costing-svg">
                    {/* Background grid */}
                    <defs>
                      <pattern id="costingGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#f5f5f5" strokeWidth="1"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#costingGrid)" />
                    
                    {/* Income line (blue) with area fill */}
                    <path
                      d="M 20 200 Q 70 180 120 160 Q 170 140 220 100 Q 270 80 320 60 Q 370 50 420 40 Q 450 35 480 30"
                      fill="none"
                      stroke="#4A90E2"
                      strokeWidth="3"
                    />
                    <path
                      d="M 20 200 Q 70 180 120 160 Q 170 140 220 100 Q 270 80 320 60 Q 370 50 420 40 Q 450 35 480 30 L 480 220 L 20 220 Z"
                      fill="rgba(74, 144, 226, 0.2)"
                    />
                    
                    {/* Expenses line (red) */}
                    <path
                      d="M 20 210 Q 70 200 120 190 Q 170 170 220 150 Q 270 140 320 130 Q 370 120 420 110 Q 450 105 480 100"
                      fill="none"
                      stroke="#E94B3C"
                      strokeWidth="3"
                    />
                    
                    {/* Data points */}
                    <circle cx="480" cy="30" r="3" fill="#4A90E2" />
                    <circle cx="480" cy="100" r="3" fill="#E94B3C" />
                  </svg>
                </div>
                
                <div className="costing-chart-x-axis">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                  <span>Jul</span>
                  <span>Aug</span>
                  <span>Sep</span>
                  <span>Oct</span>
                  <span>Nov</span>
                  <span>Dec</span>
                </div>
              </div>
            </div>
          </div>

          {/* Expense Transactions */}
          <div className="costing-transactions">
            <div className="costing-transactions-header">
              <h3>Expense Transactions</h3>
              <button className="costing-view-all">View all →</button>
            </div>
            
            <div className="costing-table">
              <div className="costing-table-header">
                <div>Date</div>
                <div>Product</div>
                <div>Amount</div>
                <div>Status</div>
              </div>
              
              <div className="costing-table-body">
                {expenseTransactions.map((transaction, index) => (
                  <div key={index} className="costing-table-row">
                    <div>{transaction.date}</div>
                    <div>{transaction.product}</div>
                    <div>{transaction.amount}</div>
                    <div>
                      <span className={`costing-status ${transaction.status.toLowerCase()}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Costing