import React, { useState } from "react";
import PropTypes from "prop-types";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

const AgentDashboardLayout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false); // Default closed for mobile

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform bg-white shadow-md md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar onToggleSidebar={handleToggleSidebar} agentName="Rohit Sharma" />
        <main className="flex-1 overflow-y-auto p-4">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

AgentDashboardLayout.propTypes = {
  children: PropTypes.node,
};

export default AgentDashboardLayout;
