import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaShoppingCart,
  FaMoneyBillWave,
  FaChartLine,
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaTimes,
  FaIdBadge,
  FaBriefcase, // Employee
  FaWallet,    // Salary Management
  FaPercentage, // Commissions
  FaServicestack, // Services icon
  
} from "react-icons/fa";

const menu = [
  { name: "Dashboard", to: "/admin/dashboard", icon: <FaHome /> },
  { name: "Manage Admin", to: "/admin/dashboard/management", icon: <FaIdBadge /> },
  { name: "Manage Clients", to: "/admin/dashboard/manage-clients", icon: <FaUsers /> },
  { name: "Manage Agents", to: "/admin/dashboard/manage-agents", icon: <FaUsers /> },
  { name: "Manage DSA", to: "/admin/dashboard/manage-dsa", icon: <FaUsers /> },
  { name: "Employees", to: "/admin/dashboard/employees", icon: <FaBriefcase /> },
  { name: "Salary Management", to: "/admin/dashboard/salary-management", icon: <FaWallet /> },
  { name: "Commissions", to: "/admin/dashboard/commissions", icon: <FaPercentage /> },
  { name: "Services", to: "/admin/dashboard/services", icon: <FaServicestack /> },
  { name: "Loan Applications", to: "/admin/dashboard/loan-applications", icon: <FaMoneyBillWave /> },
  { name: "Loan Audit", to: "/admin/dashboard/loan-audit", icon: <FaFileAlt /> },
  { name: "Leads", to: "/admin/dashboard/leads-management", icon: <FaChartLine /> },
  { name: "Notifications", to: "/admin/dashboard/notifications", icon: <FaBell /> },
  { name: "Profile", to: "/admin/dashboard/profile-settings", icon: <FaUser /> },
  
];

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      // Clear admin authentication
      localStorage.removeItem('adminAuth');
      localStorage.removeItem('adminData');
      
      // Redirect to admin login
      navigate("/admin/login");
    }
  };

  return (
    <aside className="h-full w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        {/* Logo and Close button for mobile */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            
            <span className="font-bold text-lg text-blue-600">Witty Wealth</span>
          </div>
          <button className="md:hidden text-gray-600" onClick={onClose}>
            <FaTimes className="text-lg" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menu.map(({ name, to, icon }) => (
              <li key={name}>
                <NavLink
                  to={to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-2 rounded-md transition-all duration-200 ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`
                  }
                  onClick={onClose}
                >
                  <span className="text-lg">{icon}</span>
                  <span className="text-sm">{name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Logout Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-md transition-all duration-200"
        >
          <FaSignOutAlt />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
