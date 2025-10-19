import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaFileAlt,
  FaShoppingCart,
  FaMoneyBillWave,
  FaUpload,
  FaChartLine,
  FaUser,
  FaBell,
  FaSignOutAlt,
  FaTimes,
} from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", path: "/agent", icon: <FaHome /> },
  { name: "Clients", path: "/agent/clients", icon: <FaUsers /> },
  { name: "Purchase", path: "/agent/purchase", icon: <FaShoppingCart /> },
  { name: "SIP Setup", path: "/agent/sip", icon: <FaMoneyBillWave /> },
  { name: "Transactions", path: "/agent/transactions", icon: <FaFileAlt /> },
  { name: "Leads", path: "/agent/leads", icon: <FaChartLine /> },
  { name: "Commission", path: "/agent/commission", icon: <FaMoneyBillWave /> },
  { name: "Reports", path: "/agent/reports", icon: <FaFileAlt /> },
  { name: "KYC Upload", path: "/agent/kyc", icon: <FaUpload /> },
  { name: "Profile", path: "/agent/profile", icon: <FaUser /> },
  { name: "Notifications", path: "/agent/notifications", icon: <FaBell /> },
  
];

const Sidebar = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      navigate("/");
    }
  };

  return (
    <aside className="h-full w-64 bg-white shadow-md flex flex-col justify-between">
      <div>
        {/* Logo and Close button for mobile */}
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <div className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="Witty Wealth Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="font-bold text-lg text-blue-600">Witty Wealth</span>
          </div>
          <button className="md:hidden text-gray-600" onClick={onClose}>
            <FaTimes className="text-lg" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-2">
            {menuItems.map(({ name, path, icon }) => (
              <li key={name}>
                <NavLink
                  to={path}
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
