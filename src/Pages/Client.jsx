//\Users\Admin\Desktop\wittyfrontend2\wittyfrontend2\src\components\client.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo.png';
import toast from 'react-hot-toast';

export default function Client() {
  const [loginWith, setLoginWith] = useState('accountNo');
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();

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
      const result = await login(formData.username, formData.password);
      
      if (result.success) {
        toast.success('Login successful!');
        // Navigation is handled by the AuthContext
      } else {
        toast.error(result.error || 'Login failed');
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff]">
      <div className="max-w-6xl w-full bg-white flex shadow-lg rounded-lg overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-[#f5f9ff] p-10">
          <img src={logo} alt="Logo" className="mb-4 w-32 h-auto" /> 
          <h2 className="text-2xl text-gray-700">Hi,</h2>
          <h1 className="text-3xl font-bold text-blue-700 mb-4">Welcome to <span className="text-blue-800">WITTY WEALTH Account</span></h1>
          <p className="text-gray-600 mb-4">
            The comprehensive online platform empowers you to access, record and manage your entire investment portfolio across multiple assets and products for the entire family in a single place.
          </p>
          <ul className="text-gray-700 space-y-2">
            <li>⭐ Simple</li>
            <li>⭐ 100% Online</li>
            <li>⭐ Dedicated Distributor</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="w-1/2 p-10">
          <h2 className="text-2xl font-semibold text-blue-700 mb-6">Login to your Account</h2>

          <form onSubmit={handleSubmit}>
            {/* Login Method */}
            <div className="mb-4">
              <label className="font-medium text-sm text-gray-700 mb-1 block">* Login With</label>
              <div className="flex space-x-4 text-sm">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="accountNo"
                    checked={loginWith === 'accountNo'}
                    onChange={() => setLoginWith('accountNo')}
                    className="mr-2"
                  />
                  WITTY WEALTH Account No
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="loginId"
                    checked={loginWith === 'loginId'}
                    onChange={() => setLoginWith('loginId')}
                    className="mr-2"
                  />
                  Personalized Login ID
                </label>
              </div>
            </div>

            {/* Username/Account Number */}
            <div className="mb-4">
              <label className="text-sm text-red-600 font-semibold">
                * {loginWith === 'accountNo' ? 'WITTY WEALTH Account No' : 'Personalized Login ID'}
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder={`Enter your ${loginWith === 'accountNo' ? 'Account No' : 'Login ID'}`}
                className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="text-sm text-red-600 font-semibold">* Password / PIN</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your Password / PIN"
                  className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600"
                  disabled={loading}
                >
                  {showPassword ? "🙈" : "👁"}
                </button>
              </div>
            </div>

            {/* Remember Me + Forgot */}
            <div className="flex justify-between items-center mb-6 text-sm">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" disabled={loading} />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-blue-600 hover:underline">
                Forgot password / PIN?
              </Link>
            </div>

            {/* Login Button */}
            <button 
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-md font-semibold transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-700'
              } text-white`}
            >
              {loading ? 'Logging in...' : 'LOG IN'}
            </button>
          </form>

          {/* Sign Up */}
          <p className="mt-4 text-sm text-center">
            Don't have an account? <Link to="/client-signup" className="text-blue-600 font-medium hover:underline">Sign Up</Link>
          </p>

          {/* Back to Home */}
          <p className="mt-2 text-sm text-center">
            <Link to="/" className="text-gray-600 hover:text-blue-600">← Back to Home</Link>
          </p>
        </div>
      </div>
    </div>
  );
}


