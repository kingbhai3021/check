import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import logo from '../../assets/logo.png';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      console.log('Attempting admin login...');
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for JWT
        body: JSON.stringify({ username: formData.username, password: formData.password }),
      });

      const data = await response.json();
      console.log('Login response:', data);

      if (response.ok) {
        if (data.redirect === 'ADMIN') {
          console.log('Admin login successful, setting localStorage...');
          
          // Set authentication state
          localStorage.setItem('adminAuth', 'true');
          localStorage.setItem('adminData', JSON.stringify(data));
          
          console.log('localStorage set, redirecting to dashboard...');
          toast.success('Admin login successful!');
          
          // Small delay to ensure state is set
          setTimeout(() => {
            console.log('Navigating to dashboard...');
            navigate('/admin/dashboard', { replace: true });
          }, 100);
        } else {
          console.log('Access denied - not admin user');
          toast.error('Access denied. Admin privileges required.');
        }
      } else {
        console.log('Login failed:', data.message);
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Company Logo" className="h-12" />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">
          Admin Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg shadow-lg transition transform hover:scale-[1.02] ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
            }`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-6 flex justify-between text-sm text-gray-500">
          <button 
            onClick={() => navigate('/forgot-password')} 
            className="text-blue-600 hover:underline"
          >
            Forgot password?
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="text-blue-600 hover:underline"
          >
            Back to Home
          </button>
        </div>

        {/* Info */}
        <div className="mt-4 text-center text-xs text-gray-400">
          <p>Admin access only. Contact system administrator for credentials.</p>
        </div>

        {/* Test Credentials */}
        <div className="mt-4 text-center text-xs text-gray-500 bg-gray-50 p-2 rounded">
          <p><strong>Test Credentials:</strong></p>
          <p>Username: admin</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
