import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path to your logo

export default function DsaLogin() {
  const [credentials, setCredentials] = useState({ dsaId: "", password: "" });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5050/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          username: credentials.dsaId, 
          password: credentials.password 
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        localStorage.setItem('dsaToken', 'authenticated');
        localStorage.setItem('dsaUser', JSON.stringify(data));
        alert(`Login successful! Welcome ${data.name || 'DSA'}`);
        // Redirect to DSA dashboard
        window.location.href = '/agent';
      } else {
        alert(data.message || 'Invalid DSA ID or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
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
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          DSA Login
        </h2>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Enter DSA ID (e.g., ww2025090444A)"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={credentials.dsaId}
            onChange={(e) =>
              setCredentials({ ...credentials, dsaId: e.target.value })
            }
            required
          />
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition transform hover:scale-[1.02]"
          >
            Login
          </button>
        </form>

        {/* Extra Links */}
        <div className="mt-4 flex justify-between text-sm text-gray-500">
          <Link to="/forgot-password" className="text-blue-600 hover:underline">
            Forgot password / PIN?
          </Link>
          <Link to="/contactsupport" className="text-blue-600 hover:underline">
            Contact Support
          </Link>
        </div>

        {/* Sign Up Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don't have a DSA ID?{" "}
          <Link to="/dsa-signup" className="text-blue-600 hover:underline">
            Create Account
          </Link>
        </p>

      </div>
    </div>
  );
}
