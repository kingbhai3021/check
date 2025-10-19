import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Company logo
import { generateDSAId } from "../utils/dsaIdGenerator.js";

export default function DsaSignup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [generatedDSAId, setGeneratedDSAId] = useState("");

  // Generate DSA ID when component mounts
  useEffect(() => {
    try {
      const newDSAId = generateDSAId();
      setGeneratedDSAId(newDSAId);
    } catch (error) {
      console.error("Error generating DSA ID:", error);
      alert("Error generating DSA ID. Please try again.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (!generatedDSAId) {
      alert("DSA ID not generated. Please refresh the page.");
      return;
    }

    // Here you can integrate with backend API
    const signupData = {
      ...formData,
      dsaId: generatedDSAId,
      createdAt: new Date().toISOString()
    };
    
    console.log("DSA Signup Data:", signupData);
    alert(`Signup Successful! Your DSA ID is: ${generatedDSAId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] px-4">
      <div className="max-w-lg w-full bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Company Logo" className="h-12" />
        </div>

        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-4">
          DSA Signup
        </h2>

        {/* Generated DSA ID Display */}
        {generatedDSAId && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h3 className="text-sm font-semibold text-blue-800 mb-2">Your DSA ID:</h3>
            <div className="text-lg font-mono font-bold text-blue-900 bg-white px-3 py-2 rounded border">
              {generatedDSAId}
            </div>
            <p className="text-xs text-blue-600 mt-2">
              Please save this ID - you'll need it to login
            </p>
          </div>
        )}

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-lg shadow-lg hover:opacity-90 transition transform hover:scale-[1.02]"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link to="/dsa-login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
