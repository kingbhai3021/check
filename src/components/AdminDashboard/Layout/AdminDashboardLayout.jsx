// src/components/AdminDashboard/Layout/AdminDashboardLayout.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Topbar from "./Topbar.jsx";
import Sidebar from "./Sidebar.jsx";

export default function AdminDashboardLayout() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Check authentication on mount
  useEffect(() => {
    const checkAuth = () => {
      console.log('AdminDashboardLayout: Checking authentication...');
      const adminAuth = localStorage.getItem('adminAuth');
      const adminData = localStorage.getItem('adminData');
      
      console.log('AdminDashboardLayout: adminAuth =', adminAuth);
      console.log('AdminDashboardLayout: adminData =', adminData);
      
      if (adminAuth === 'true' && adminData) {
        try {
          const parsedData = JSON.parse(adminData);
          console.log('AdminDashboardLayout: Parsed admin data:', parsedData);
          setAdmin(parsedData);
          setIsAuthenticated(true);
          console.log('AdminDashboardLayout: Authentication successful');
        } catch (error) {
          console.error('AdminDashboardLayout: Error parsing admin data:', error);
          localStorage.removeItem('adminAuth');
          localStorage.removeItem('adminData');
          navigate('/admin/login');
        }
      } else {
        console.log('AdminDashboardLayout: No valid auth, redirecting to login');
        navigate('/admin/login');
      }
      setLoading(false);
    };

    checkAuth();
  }, [navigate]);

  // Memoize navigation callback to prevent unnecessary re-renders
  const handleSidebarToggle = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  const handleSidebarClose = useCallback(() => {
    setSidebarOpen(false);
  }, []);

  // Memoize sidebar classes to prevent unnecessary recalculations
  const sidebarClasses = useMemo(() => {
    return `fixed inset-y-0 left-0 z-40 w-64 transition-transform duration-300 transform bg-white shadow-md md:relative md:translate-x-0 ${
      sidebarOpen ? "translate-x-0" : "-translate-x-full"
    }`;
  }, [sidebarOpen]);

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div className={sidebarClasses}>
        <div className="flex flex-col h-full">
          <Sidebar onClose={handleSidebarClose} />
        </div>
      </div>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
          onClick={handleSidebarClose}
        ></div>
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Topbar */}
        <Topbar
          onToggleSidebar={handleSidebarToggle}
          adminName={admin?.wittywealth || "Admin"}
        />

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}