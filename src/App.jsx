import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import User from './admin/user'
import Login from './admin/login'
import AdminDashboard from './admin/admindashboard'
import FarmerDashboard from './farmer/farmerdashboard'
import FinanceDashboard from './finance/financedashboard'
import Inventory from './admin/inventory'
import Costing from './admin/costing'
import Planting from './admin/planting'
import Settings from './admin/settings'
import FarmerPlants from './farmer/farmerplants'
import FarmerInventory from './farmer/farmerinventory'
import FarmerCalendar from './farmer/farmercalendar'
import FinanceInventory from './finance/financeinventory'
import FinanceCosting from './finance/financecosting'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default route redirects to user selection */}
          <Route path="/" element={<Navigate to="/user-selection" replace />} />
          
          {/* User selection page */}
          <Route path="/user-selection" element={<User />} />
          
          {/* Login pages for different user types */}
          <Route path="/login/admin" element={<Login userType="admin" />} />
          <Route path="/login/farmer" element={<Login userType="farmer" />} />
          <Route path="/login/finance" element={<Login userType="finance" />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard/admin" element={<AdminDashboard userType="admin" />} />
          <Route path="/dashboard/farmer" element={<FarmerDashboard userType="farmer" />} />
          <Route path="/dashboard/finance" element={<FinanceDashboard userType="finance" />} />
          
          {/* Admin routes */}
          <Route path="/overview/admin" element={<AdminDashboard userType="admin" />} />
          <Route path="/inventory/admin" element={<Inventory userType="admin" />} />
          <Route path="/costing/admin" element={<Costing userType="admin" />} />
          <Route path="/planting/admin" element={<Planting userType="admin" />} />
          <Route path="/settings/admin" element={<Settings userType="admin" />} />
          
          {/* Farmer routes */}
          <Route path="/farmer/overview" element={<FarmerDashboard userType="farmer" />} />
          <Route path="/farmer/plants" element={<FarmerPlants userType="farmer" />} />
          <Route path="/farmer/calendar" element={<FarmerCalendar userType="farmer" />} />
          <Route path="/farmer/inventory" element={<FarmerInventory userType="farmer" />} />

          {/* Finance routes */}
          <Route path="/finance/overview" element={<FinanceDashboard userType="finance" />} />
          <Route path="/finance/inventory" element={<FinanceInventory userType="finance" />} />
          <Route path="/finance/costing-pricing" element={<FinanceCosting userType="finance" />} />
          
          {/* Catch all route - redirect to user selection */}
          <Route path="*" element={<Navigate to="/user-selection" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App