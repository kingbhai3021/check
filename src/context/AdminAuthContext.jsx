import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false); // Changed to false initially
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false); // Track if auth has been checked
  const navigate = useNavigate();

  // Only check auth status when explicitly needed (not on mount)
  const checkAdminAuthStatus = useCallback(async () => {
    if (authChecked) return; // Skip if already checked
    
    try {
      setLoading(true);
      // Check if there's a valid admin token in cookies
      const response = await fetch('https://wittywealth.org/api/validate', {
        credentials: 'include', // Include cookies
      });
      
      if (response.ok) {
        const adminData = await response.json();
        if (adminData.userType === 'admin') {
          setAdmin(adminData);
          setIsAuthenticated(true);
        } else {
          setAdmin(null);
          setIsAuthenticated(false);
        }
      } else {
        setAdmin(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Admin auth check failed:', error);
      setAdmin(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
      setAuthChecked(true);
    }
  }, [authChecked]);

  // Check auth status when component mounts (only for dashboard)
  useEffect(() => {
    // Only check auth if we're on a protected route
    const path = window.location.pathname;
    if (path.startsWith('/admin/dashboard')) {
      checkAdminAuthStatus();
    }
  }, [checkAdminAuthStatus]);

  const adminLogin = async (username, password) => {
    try {
      setLoading(true);
      
      const response = await fetch('https://wittywealth.org/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for JWT
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.redirect === 'ADMIN') {
          // Login successful
          setAdmin(data);
          setIsAuthenticated(true);
          setAuthChecked(true);
          toast.success('Admin login successful!');
          navigate('/admin/dashboard');
          return { success: true, data };
        } else {
          toast.error('Access denied. Admin privileges required.');
          return { success: false, error: 'Access denied. Admin privileges required.' };
        }
      } else {
        // Login failed
        toast.error(data.message || 'Login failed');
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      toast.error('Network error. Please try again.');
      return { success: false, error: 'Network error. Please try again.' };
    } finally {
      setLoading(false);
    }
  };

  const adminLogout = async () => {
    try {
      // Clear admin state
      setAdmin(null);
      setIsAuthenticated(false);
      setAuthChecked(false);
      
      // Clear cookies by calling logout endpoint (if you have one)
      // await fetch('/api/logout', { credentials: 'include' });
      
      // Redirect to admin login
      navigate('/admin/login');
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Admin logout error:', error);
    }
  };

  const value = {
    admin,
    loading,
    isAuthenticated,
    adminLogin,
    adminLogout,
    checkAdminAuthStatus,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};
