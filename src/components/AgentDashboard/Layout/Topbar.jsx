import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { FaBell, FaUserCircle, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Topbar = ({ onToggleSidebar, agentName = "Agent Name" }) => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  const notifRef = useRef(null);
  const profileRef = useRef(null);

  // Mock Notification Fetch (Replace with real API)
  useEffect(() => {
    const fetchNotifications = async () => {
      // Replace this with real API call
      const data = [
        { id: 1, message: "New lead assigned", read: false },
        { id: 2, message: "Client completed KYC", read: true },
      ];
      setNotifications(data);
    };
    fetchNotifications();
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifDropdown(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 md:px-6 sticky top-0 z-50">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={onToggleSidebar}
        className="md:hidden text-gray-600 hover:text-blue-600 focus:outline-none"
        aria-label="Toggle Sidebar"
      >
        <FaBars className="text-xl" />
      </button>

      {/* Title */}
      <div className="text-lg font-semibold text-gray-800">Agent Dashboard</div>

      {/* Icons */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifDropdown(!showNotifDropdown)}
            className="relative text-gray-600 hover:text-blue-600 focus:outline-none"
            aria-label="Notifications"
          >
            <FaBell className="text-xl" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full" />
            )}
          </button>

          {/* Dropdown */}
          {showNotifDropdown && (
            <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50 transition transform origin-top-right animate-fade-in">
              <div className="p-3 text-sm font-semibold border-b">Notifications</div>
              <ul className="max-h-60 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`px-4 py-2 text-sm border-b ${
                        n.read ? "text-gray-500" : "font-medium text-gray-800"
                      }`}
                    >
                      {n.message}
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-sm text-gray-500">No notifications</li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className="flex items-center gap-2 focus:outline-none"
          >
            <FaUserCircle className="text-2xl text-gray-600" />
            <span className="hidden sm:inline text-sm text-gray-700 font-medium">
              {agentName}
            </span>
          </button>

          {showProfileDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-50 animate-fade-in">
              <button
                onClick={() => navigate("/agent/profile")}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Profile
              </button>
              <button
                onClick={() => navigate("/agent/settings")}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="block w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

Topbar.propTypes = {
  onToggleSidebar: PropTypes.func,
  agentName: PropTypes.string,
};

export default Topbar;
