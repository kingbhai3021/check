import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png"; // Adjust the path if needed

export default function Client() {
  const [loginWith, setLoginWith] = useState("accountNo");

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f9ff] p-4">
      <div className="max-w-6xl w-full bg-white flex flex-col lg:flex-row shadow-lg rounded-lg overflow-hidden min-h-[80vh]">
        {/* Left Panel */}
        <div className="w-full lg:w-1/2 bg-[#f5f9ff] p-6 lg:p-10 flex flex-col justify-center">
          <img src={logo} alt="Logo" className="mb-4 w-28 h-auto" />
          <h2 className="text-xl lg:text-2xl text-gray-700">Hi,</h2>
          <h1 className="text-2xl lg:text-3xl font-bold text-blue-700 mb-4">
            Welcome to <span className="text-blue-800">WITTY WEALTH Account</span>
          </h1>
          <p className="text-gray-600 mb-4 text-sm lg:text-base">
            The comprehensive online platform empowers you to access, record and
            manage your entire investment portfolio across multiple assets and
            products for the entire family in a single place.
          </p>
          <ul className="text-gray-700 space-y-2 text-sm lg:text-base">
            <li>⭐ Simple</li>
            <li>⭐ 100% Online</li>
            <li>⭐ Dedicated Distributor</li>
          </ul>
        </div>

        {/* Right Panel */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10 flex flex-col justify-center">
          <h2 className="text-xl lg:text-2xl font-semibold text-blue-700 mb-6">
            Login to your Account
          </h2>

          {/* Login Method */}
          <div className="mb-4">
            <label className="font-medium text-sm text-gray-700 mb-1 block">
              * Login With
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-4 text-sm space-y-2 sm:space-y-0">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="accountNo"
                  checked={loginWith === "accountNo"}
                  onChange={() => setLoginWith("accountNo")}
                  className="mr-2"
                />
                WITTY WEALTH Account No
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="loginId"
                  checked={loginWith === "loginId"}
                  onChange={() => setLoginWith("loginId")}
                  className="mr-2"
                />
                Personalized Login ID
              </label>
            </div>
          </div>

          {/* Account Number / Login ID */}
          <div className="mb-4">
            <label className="text-sm text-blue-600 font-semibold">
              *{" "}
              {loginWith === "accountNo"
                ? "WITTY WEALTH Account No"
                : "Personalized Login ID"}
            </label>
            <input
              type="text"
              placeholder={`Enter your ${
                loginWith === "accountNo" ? "Account No" : "Login ID"
              }`}
              className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="text-sm text-blue-600 font-semibold">
              * Password / PIN
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Enter your Password / PIN"
                className="w-full px-4 py-2 border rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-3 text-gray-400 cursor-pointer">
                👁
              </span>
            </div>
          </div>

          {/* Remember Me + Forgot */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 text-sm gap-2 sm:gap-0">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password / PIN?
            </Link>

          
          </div>

          {/* Login Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold">
            LOG IN
          </button>

          {/* Sign Up */}
          <p className="mt-4 text-sm text-center">
            Don't have an account?{" "}
            <Link
              to="/client-signup"
              className="text-blue-600 font-medium hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
